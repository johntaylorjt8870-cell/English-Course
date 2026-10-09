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
 * - القوس المفتوح "(" يجمع الإنجليزية بأول عبارة عربية فقط إذا أُغلِق القوس
 *   مباشرةً بعدها («Past Perfect (الماضي المثالي)»)؛ وإلا فالقوس يفتح جملة
 *   اعتراضية عربية كاملة تبقى في سياق RTL («when / while (الدرسان 25 و26)»).
 * - أي قوس غير متوازن داخل مقطع لاتيني يبقى خارج العازل LTR (انظر
 *   splitUnbalancedParens) حتى لا يبتعد القوس عن محتواه العربي.
 *
 * ── الزوج الدلالي «English A أم English B؟» ──
 * عندما تفصل أداة عربية (أم / أو) بين عبارتين إنجليزيتين — كما في عناوين
 * «IQ200 — had danced أم was dancing؟» و «Past Simple أم Past Perfect؟» —
 * يُعرض كل بديل في العازل الخاص به، فتتباعد البدائل في الفقرة RTL، ويمكن أن
 * يُقرأ السطر (من اليسار إلى اليمين) معكوسًا: «was dancing أم IQ200 — had danced».
 * الحل البنيوي: تُجمَع البدائل والأداة بينها في غلاف LTR واحد
 * (items + connectors) فتبقى العبارتان الإنجليزيتان متصلتين ومرتَّبتين
 * كما كُتبتا، وتظل الأداة العربية في موضعها بينهما. علامة الاستفهام العربية
 * التي تلي آخر بديلٍ (؟) تبقى داخل الغلاف في طرفه الأيمن.
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
const ENGLISH_MATERIAL = /[A-Za-z0-9 "'’.&+\/#\-=:–—→←|·?!,;\u2300-\u23FF\u2460-\u24FF\u2600-\u27BF\u3200-\u32FF«»“”]/;
const HAS_LATIN_LETTER = /[A-Za-z]/;
/** الفواصل الصريحة التي تربط الإنجليزية بعبارتها العربية. */
const PAIR_SEPARATORS = new Set(["=", ":", "–", "—", "-", "→", "←", "/", "|", "·", "(", ".", "!", "?", "،", ",", "؛", ";"]);
/** فواصل القائمة بين عبارات عربية متتالية داخل الغلاف نفسه. */
const LIST_SEPARATORS = new Set(["/", "|", "·", "،", ",", "؛"]);
/**
 * أدوات الربط العربية التي تفصل بديلين إنجليزيين: «A أم B؟» و «A أو B».
 * التطابق على كلمة الأداة وحدها بعد التشذيب — لا على أي كلمة عربية.
 */
const ALT_CONNECTORS = new Set(["أم", "أو"]);

export type MixedSegment =
  | { kind: "text"; text: string }
  | { kind: "en"; text: string }
  | {
      /**
       * «English A أم English B؟» — بدائل إنجليزية تفصلها أداة عربية.
       * الغلاف كله LTR واحد: البدائل بترتيبها المكتوب، والأداة العربية بينها.
       */
      kind: "alts";
      /** البدائل الإنجليزية بترتيبها المنطقي (عددها = عدد الأدوات + 1) */
      items: string[];
      /** الأدوات العربية بين البدائل (أم / أو) */
      connectors: string[];
      /** علامة ترقيم عربية تلي آخر بديل (؟ ! …) تبقى داخل الغلاف */
      trail: string;
      /**
       * شرح عربي يلي البديل الأخير بفاصل صريح («B — الشرح») — يبقى ملتصقًا
       * بالبديل الأخير داخل الغلاف نفسه، تمامًا كسلوك زوج «English = Arabic».
       */
      gloss?: { lead: string; arabic: string[]; between: string[]; trail: string };
    }
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
    // القوس المفتوح فاصلُ زوجٍ فقط إذا أُغلِق مباشرةً بعد العبارة العربية
    // («Past Perfect (الماضي المثالي)»). أما إن تبعَ العبارةَ العربية شيءٌ آخر
    // («when / while (الدرسان 25 و26)») فالقوس يفتح جملة اعتراضية عربية كاملة،
    // وجمعُ أول كلمةٍ منها فقط في الغلاف LTR يمزّق القوس ويفصل الأرقام عن
    // عبارتها — فتبقى الجملة كلها في سياق RTL ويُعزل الإنجليزي وحده.
    if (pair.lead.includes("(") && text[head.e] !== ")") {
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
  return mergeAlternatives(out);
}

/**
 * يجمع «English A أم English B؟» في مقطع واحد (alts) بعد التحليل الأوّلي:
 * يبحث عن التسلسل [إنجليزي] [أداة عربية: أم/أو] [إنجليزي] ثم يكرّر الأداة
 * والبديل ما دام السياق مستمرًّا (A أو B أو C)، ويضم علامة الاستفهام العربية
 * التي تلي آخر بديل داخل الغلاف نفسه.
 * لا يُجمَع أي شيء آخر: الأداة يجب أن تكون كلمة (أم/أو) وحدها بين بديلين.
 */
function mergeAlternatives(segs: MixedSegment[]): MixedSegment[] {
  const out: MixedSegment[] = [];
  /** مقاطع مسافات صِرفة تفصل الأجزاء — تُتخطّى عند الجمع (العرض يضع المسافة بنفسه). */
  const isSpace = (seg: MixedSegment | undefined) => !!seg && seg.kind === "text" && /^\s+$/.test(seg.text);
  /** البديل إما مقطع إنجليزي، أو زوج «English — Arabic» يبقى شرحه ملتصقًا بالبديل. */
  const altAt = (from: number): { item: { text: string; gloss?: Extract<MixedSegment, { kind: "pair" }> }; next: number } | null => {
    let k = from;
    while (isSpace(segs[k])) k++;
    const seg = segs[k];
    if (!seg) return null;
    if (seg.kind === "en") return { item: { text: seg.text.trim() }, next: k + 1 };
    if (seg.kind === "pair") return { item: { text: seg.en.trim(), gloss: seg }, next: k + 1 };
    return null;
  };
  const connectorAt = (from: number): { text: string; next: number } | null => {
    let k = from;
    while (isSpace(segs[k])) k++;
    const seg = segs[k];
    if (!seg || seg.kind !== "text") return null;
    const text = seg.text.trim();
    return ALT_CONNECTORS.has(text) ? { text, next: k + 1 } : null;
  };
  for (let i = 0; i < segs.length; i++) {
    const head = segs[i];
    if (head.kind !== "en") {
      out.push(head);
      continue;
    }
    const conn = connectorAt(i + 1);
    const first = conn ? altAt(conn.next) : null;
    if (!conn || !first) {
      out.push(head);
      continue;
    }
    const items = [head.text.trim()];
    const connectors = [conn.text];
    items.push(first.item.text);
    let gloss = first.item.gloss ?? null;
    let j = first.next;
    // سلسلة بدائل: «A أو B أو C» — أداة ثم بديل، مرارًا (تتوقف عند أول زوج له شرح)
    while (!gloss) {
      const nextConn = connectorAt(j);
      const nextAlt = nextConn ? altAt(nextConn.next) : null;
      if (!nextConn || !nextAlt) break;
      connectors.push(nextConn.text);
      items.push(nextAlt.item.text);
      gloss = nextAlt.item.gloss ?? null;
      j = nextAlt.next;
    }
    // علامة ترقيم عربية (أو لاتينية) تلي آخر بديل — إن لم يكن للبديل شرح ملتصق
    let trail = "";
    if (!gloss) {
      let t = j;
      while (isSpace(segs[t])) t++;
      const tail = segs[t];
      if (tail && tail.kind === "text" && /^[؟?!.،,؛;]+\s*$/.test(tail.text)) {
        trail = tail.text.trim();
        j = t + 1;
      }
    }
    out.push({ kind: "alts", items, connectors, trail, gloss: gloss ?? undefined });
    i = j - 1;
  }
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
  while (ls < enEnd && !/[A-Za-z0-9("'«“]/.test(text[ls])) ls++;
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
  const { head, tail } = splitUnbalancedParens(s);
  if (head !== "") {
    if (HAS_LATIN_LETTER.test(head) && !AR_CHAR.test(head)) out.push({ kind: "en", text: head });
    else out.push({ kind: "text", text: head });
  }
  if (tail !== "") {
    // Only the unmatched enclosure belongs to the surrounding RTL context.
    // English after it must still be segmented: (a أو an) previously left
    // `a` raw, preventing the alternatives pass from grouping both choices.
    const boundary = /^(\s*[()[\]{}])([\s\S]*)$/.exec(tail);
    if (boundary) {
      out.push({ kind: "text", text: boundary[1] });
      pushLatin(out, boundary[2]);
    } else out.push({ kind: "text", text: tail });
  }
}

/**
 * قوسٌ غير متوازن داخل مقطع لاتيني يعود إلى سياق RTL ولا يدخل العازل LTR.
 *
 * في «حدث ماضٍ واحد: Yesterday, I visited… (بلا had).» يبتلع المقطع اللاتيني
 * القوس المفتوح فيلتصق بطرف العازل الأيمن بعيدًا عن محتواه (فيظهر كأنه قوس
 * «حدث ماضٍ واحد»)، وكذلك يبتلع المقطع التالي قوس الإغلاق والنقطة. القاعدة:
 * قوسُ فتحٍ في آخر المقطع بلا إغلاق، أو قوسُ إغلاقٍ بلا فتحٍ قبله، يبقى خارج
 * العازل مع ما بعده ليعرضه المتصفح في سياقه العربي (معكوسًا في مكانه الصحيح).
 * الأقواس المتوازنة داخل المقطع («(see Lesson 5)») لا تُمَس.
 */
function splitUnbalancedParens(s: string): { head: string; tail: string } {
  const stack: { char: string; at: number }[] = [];
  const closing: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if ("([{".includes(c)) stack.push({ char: c, at: i });
    else if (closing[c]) {
      if (stack.at(-1)?.char !== closing[c]) return cutAt(s, i);
      stack.pop();
    }
  }
  if (stack.length) return cutAt(s, stack[0].at);
  return { head: s, tail: "" };
}

/** يفصل عند القوس (مع المسافة التي قبله) فيبقى القوس في بداية الجزء العربي. */
function cutAt(s: string, at: number): { head: string; tail: string } {
  let cut = at;
  while (cut > 0 && s[cut - 1] === " ") cut--;
  return { head: s.slice(0, cut), tail: s.slice(cut) };
}

/** يعرض النص المختلط: كل إنجليزية معزولة LTR، وكل زوج «English = Arabic» غلاف LTR واحد. */
export function LatinRuns({ text, marked = false }: { text: string; marked?: boolean }) {
  // Parse presentation markup before direction segmentation: punctuation and
  // multi-word phrases must share the same isolate, even across a highlight.
  const highlights: { start: number; end: number }[] = [];
  let removed = 0;
  const plain = marked ? text.replace(/\[\[(.+?)\]\]/g, (match, content: string, offset: number) => {
    highlights.push({ start: offset - removed, end: offset - removed + content.length });
    removed += match.length - content.length;
    return content;
  }) : text;
  let consumed = 0;
  const decorate = (value: string): ReactNode => {
    if (!highlights.length || !value) return value;
    const start = plain.indexOf(value, consumed);
    if (start < 0) return value;
    consumed = start + value.length;
    const pieces: ReactNode[] = [];
    let from = 0;
    for (const range of highlights) {
      const left = Math.max(start, range.start) - start;
      const right = Math.min(consumed, range.end) - start;
      if (right <= left) continue;
      pieces.push(value.slice(from, left));
      pieces.push(<span key={range.start} className="rounded-lg bg-slate-900/5 px-1 font-bold">{value.slice(left, right)}</span>);
      from = right;
    }
    pieces.push(value.slice(from));
    return pieces;
  };
  return (
    <>
      {splitMixedText(plain).map((seg, i) => {
        if (seg.kind === "text") return <Fragment key={i}>{decorate(seg.text)}</Fragment>;
        if (seg.kind === "en") {
          return (
            <span key={i} dir="ltr" className="font-en">
              {decorate(seg.text)}
            </span>
          );
        }
        if (seg.kind === "alts") {
          return (
            <span key={i} dir="ltr" className="ltr-pair">
              {seg.items.map((item, j) => (
                <Fragment key={j}>
                  {j > 0 && (
                    <Fragment>
                      {" "}
                      <span dir="rtl">{decorate(seg.connectors[j - 1])}</span>{" "}
                    </Fragment>
                  )}
                  <span dir="ltr" className="font-en">
                    {decorate(item)}
                  </span>
                </Fragment>
              ))}
              {seg.gloss && (
                <>
                  {decorate(seg.gloss.lead)}
                  {seg.gloss.arabic.map((a, j) => (
                    <Fragment key={j}>
                      {j > 0 && seg.gloss!.between[j - 1]}
                      <span dir="rtl">{decorate(a)}</span>
                    </Fragment>
                  ))}
                  {decorate(seg.gloss.trail)}
                </>
              )}
              {seg.trail && <span dir="rtl">{decorate(seg.trail)}</span>}
            </span>
          );
        }
        return (
          <span key={i} dir="ltr" className="ltr-pair">
            <span dir="ltr" className="font-en">
              {decorate(seg.en)}
            </span>
            {decorate(seg.lead)}
            {seg.arabic.map((a, j) => (
              <Fragment key={j}>
                {j > 0 && seg.between[j - 1]}
                <span dir="rtl">{decorate(a)}</span>
              </Fragment>
            ))}
            {decorate(seg.trail)}
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
  ar?: ReactNode;
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
          {typeof ar === "string" ? <LatinRuns text={ar} /> : ar}
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
