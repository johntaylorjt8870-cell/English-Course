import { Fragment, type ReactNode } from "react";

/**
 * عزل الإنجليزية على مستوى المقطع (run) — لا على مستوى الكلمة.
 *
 * القاعدة: أي مقطع لاتيني متصل (حتى لو فيه مسافات أو رموز مثل + / ← → ·)
 * يُغلَّف بعازل LTR واحد، فيُقرأ بترتيبه الصحيح دائمًا.
 * تقسيم الإنجليزية إلى كلمات معزولة يعكس الترتيب داخل الواجهة العربية (RTL)
 * فيظهر مثلًا "orange an" بدل "an orange" — وهذا ممنوع.
 *
 * المقاطع العربية (ومعها علامات ؟ ، ؛) تُترك كما هي ليعرضها المتصفح RTL.
 *
 * ── الزوج الدلالي «English = Arabic» ──
 * في الفقرة RTL يتموضع أول عنصر منطقيًا في أقصى اليمين، لذلك تظهر العبارة
 * "already = بالفعل" معكوسة بصريًا: "بالفعل already =". الحل البنيوي: أي مقطع
 * إنجليزي يتبعه فاصل صريح (= : – — → ( . ! ? ...) ثم عبارة عربية يُجمَع مع
 * العبارة العربية في غلاف LTR واحد، فيُقرأ دائمًا: English = Arabic.
 * - الفاصل بين مقطعين عربيين (/ ، ,) يبقى داخل الغلاف LTR بترتيبه المنطقي.
 * - المسافة وحدها ليست فاصلًا: "had والفعل" داخل جملة عربية تُقرأ صحيحة
 *   كما هي، فلا تُجمَع.
 * لا تُدرج أي محارف تحكم يونيكود داخل بيانات الدروس: كل شيء يحدث هنا.
 */

const AR_CLASS = "\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF";
const AR_CHAR = new RegExp(`[${AR_CLASS}]`);
/** مقطع عربي متصل: حروف عربية مع مسافات داخلية بين الكلمات العربية. */
const AR_RUN = new RegExp(`[${AR_CLASS}](?:[${AR_CLASS} ]*[${AR_CLASS}])?`, "g");
/**
 * مادة المقطع الإنجليزي المتصل (بما فيه المسافات والفواصل والرموز المعتادة).
 * الأقواس تُعالَج بعدّ التوازن في tryPair لأن القوس المفتوح الخارجي لا يُضم.
 */
const ENGLISH_MATERIAL = /[A-Za-z0-9 '’.&+\/#\-=:–—→←|·?!,;\u2300-\u23FF\u2460-\u24FF\u2600-\u27BF\u3200-\u32FF«»“”]/;
const HAS_LATIN_LETTER = /[A-Za-z]/;
/** الفواصل الصريحة التي تربط الإنجليزية بعبارتها العربية. */
const PAIR_SEPARATORS = new Set(["=", ":", "–", "—", "-", "→", "←", "/", "|", "·", "(", ".", "!", "?", "،", ",", "؛", ";"]);
/** فواصل القائمة بين عبارات عربية متتالية داخل الغلاف نفسه. */
const LIST_SEPARATORS = new Set(["/", "|", "·", "،", ",", "؛"]);

export type MixedSegment =
  | { kind: "text"; text: string }
  | { kind: "en"; text: string }
  | {
      kind: "pair";
      /** العبارة الإنجليزية (تبقى LTR معزولة) */
      en: string;
      /** الفاصل بين الإنجليزية وأول عبارة عربية، مثل " = " */
      lead: string;
      /** العبارات العربية بترتيبها المنطقي */
      arabic: string[];
      /** الفواصل بين العبارات العربية (طولها arabic.length - 1) */
      between: string[];
      /** علامة ترقيم لاتينية تلي آخر عبارة عربية (مثل ".") */
      trail: string;
    };

/**
 * يحلّل النص إلى مقاطع: نصّ عادي، إنجليزية معزولة، أو زوج «English = Arabic».
 * دالة نقية (بلا React) لتسهيل الاختبار والتدقيق.
 */
export function splitMixedText(text: string): MixedSegment[] {
  const runs: { s: number; e: number }[] = [];
  for (const m of text.matchAll(AR_RUN)) runs.push({ s: m.index ?? 0, e: (m.index ?? 0) + m[0].length });

  const out: MixedSegment[] = [];
  let cursor = 0;
  let ri = 0;
  while (ri < runs.length) {
    const head = runs[ri];
    const pair = tryPair(text, head.s, cursor);
    if (!pair) {
      ri++;
      continue;
    }
    // ما قبل الزوج: نص عادي (مع عزل أي إنجليزية منفردة فيه)
    out.push(...plainSegments(text.slice(cursor, pair.enStart)));
    const arabic: string[] = [text.slice(head.s, head.e)];
    const between: string[] = [];
    let last = head;
    ri++;
    // سلسلة قائمة: «عربي / عربي» داخل الغلاف نفسه
    for (;;) {
      let k = last.e;
      while (k < text.length && text[k] === " ") k++;
      if (!(k < text.length && LIST_SEPARATORS.has(text[k]))) break;
      let m = k + 1;
      while (m < text.length && text[m] === " ") m++;
      const next = runs[ri];
      if (!next || next.s !== m) break;
      between.push(text.slice(last.e, next.s));
      arabic.push(text.slice(next.s, next.e));
      last = next;
      ri++;
    }
    // علامات الإغلاق تبقى داخل الغلاف: ")" إن كان الفاصل قوسًا مفتوحًا، ثم . ! ?
    let trailEnd = last.e;
    let trail = "";
    let closedParen = false;
    for (let t = 0; t < 2 && trailEnd < text.length; t++) {
      const c = text[trailEnd];
      if (c === "." || c === "!" || c === "?") trail += c;
      else if (c === ")" && pair.lead.includes("(") && !closedParen) {
        trail += c;
        closedParen = true;
      } else break;
      trailEnd++;
    }
    out.push({ kind: "pair", en: pair.en, lead: pair.lead, arabic, between, trail });
    cursor = trailEnd;
  }
  out.push(...plainSegments(text.slice(cursor)));
  return out;
}

/**
 * يحاول تكوين زوج «English <sep> Arabic» يبدأ عند المقطع العربي [s, …).
 * يمشي إلى الخلف عبر المادة الإنجليزية (مع الفواصل وأقواس متوازنة) فيضم
 * ما قبل الفاصل: مثل «V3 = Past Participle» كوحدة واحدة.
 * يعيد null إذا لم يكن هناك فاصل صريح أو إنجليزية قبله.
 */
function tryPair(text: string, s: number, floor: number) {
  let enEnd = s;
  while (enEnd > floor && text[enEnd - 1] === " ") enEnd--;
  if (!(enEnd > floor && PAIR_SEPARATORS.has(text[enEnd - 1]))) return null;
  const sepAt = enEnd - 1;
  enEnd = sepAt;
  while (enEnd > floor && text[enEnd - 1] === " ") enEnd--;

  let ls = enEnd;
  let depth = 0;
  while (ls > floor) {
    const c = text[ls - 1];
    if (c === ")") depth++;
    else if (c === "(") {
      if (depth === 0) break;
      depth--;
    } else if (!ENGLISH_MATERIAL.test(c)) break;
    ls--;
  }
  // لا تُضم علامات الترقيم والمسافات البادئة إلى العبارة الإنجليزية
  while (ls < enEnd && !/[A-Za-z0-9(]/.test(text[ls])) ls++;
  const en = text.slice(ls, enEnd);
  if (!HAS_LATIN_LETTER.test(en) || AR_CHAR.test(en)) return null;
  return { en, enStart: ls, lead: text.slice(enEnd, s) };
}

/** نص بين الأزواج: مقاطع إنجليزية منفردة تُعزل، والباقي يبقى كما هو. */
function plainSegments(chunk: string): MixedSegment[] {
  const out: MixedSegment[] = [];
  let last = 0;
  for (const m of chunk.matchAll(AR_RUN)) {
    const at = m.index ?? 0;
    pushLatin(out, chunk.slice(last, at));
    out.push({ kind: "text", text: m[0] });
    last = at + m[0].length;
  }
  pushLatin(out, chunk.slice(last));
  return out;
}

function pushLatin(out: MixedSegment[], s: string) {
  if (s === "") return;
  if (HAS_LATIN_LETTER.test(s) && !AR_CHAR.test(s)) out.push({ kind: "en", text: s });
  else out.push({ kind: "text", text: s });
}

/** يعرض النص المختلط: كل إنجليزية معزولة LTR، وكل زوج «English = Arabic» غلاف LTR واحد. */
export function LatinRuns({ text }: { text: string }) {
  return (
    <>
      {splitMixedText(text).map((seg, i) => {
        if (seg.kind === "text") return <Fragment key={i}>{seg.text}</Fragment>;
        if (seg.kind === "en") {
          return (
            <span key={i} dir="ltr" className="font-en">
              {seg.text}
            </span>
          );
        }
        return (
          <span key={i} dir="ltr" className="ltr-pair">
            <span dir="ltr" className="font-en">
              {seg.en}
            </span>
            {seg.lead}
            {seg.arabic.map((a, j) => (
              <Fragment key={j}>
                {j > 0 && seg.between[j - 1]}
                <span dir="rtl">{a}</span>
              </Fragment>
            ))}
            {seg.trail}
          </span>
        );
      })}
    </>
  );
}

/**
 * زوج «English + عربي» كوحدة LTR واحدة داخل صف مرن RTL.
 * في الصف المرن تُرتَّب العناصر من اليمين، فيظهر "عربي English" بدل "English عربي".
 * هذا المكوّن يجمع الإنجليزية والعربية داخل غلاف LTR واحد، فتبقى الإنجليزية يسارًا.
 * الاستخدام: للعنوان/الوسم الإنجليزي المتبوع بشرح عربي داخل سطر أو صف مرن.
 */
export function EnAr({
  en,
  ar,
  sep,
  className = "",
  enClassName = "",
  arClassName = "",
}: {
  en: ReactNode;
  ar?: string;
  /** فاصل اختياري بين الإنجليزية والعربية (مثل «—» أو «·») يبقى داخل المجموعة LTR. */
  sep?: string;
  className?: string;
  enClassName?: string;
  arClassName?: string;
}) {
  return (
    <span dir="ltr" className={`ltr-pair inline-flex flex-wrap items-center gap-2 ${className}`}>
      <span dir="ltr" className={`font-en ${enClassName}`}>
        {en}
      </span>
      {sep && <span>{sep}</span>}
      {ar && (
        <span dir="rtl" className={arClassName}>
          <LatinRuns text={ar} />
        </span>
      )}
    </span>
  );
}

/** نص عربي صِرف داخل غلاف RTL صريح — يُستخدم داخل أي غلاف LTR. */
export function Ar({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="rtl" className={className}>
      {children}
    </span>
  );
}
