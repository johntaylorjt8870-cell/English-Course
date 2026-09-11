import { Fragment } from "react";

/**
 * عزل الإنجليزية على مستوى المقطع (run) — لا على مستوى الكلمة.
 *
 * القاعدة: أي مقطع لاتيني متصل (حتى لو فيه مسافات أو رموز مثل + / ← → ·)
 * يُغلَّف بعازل LTR واحد، فيُقرأ بترتيبه الصحيح دائمًا.
 * تقسيم الإنجليزية إلى كلمات معزولة يعكس الترتيب داخل الواجهة العربية (RTL)
 * فيظهر مثلًا "orange an" بدل "an orange" — وهذا ممنوع.
 *
 * المقاطع العربية (ومعها علامات ؟ ، ؛) تُترك كما هي ليعرضها المتصفح RTL.
 */

// المقاطع العربية: الحروف + علامات الترقيم العربية (؟ ، ؛) + الامتدادات
const AR = "\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF";
const ARABIC_RUN = new RegExp(`[${AR}]+`, "g");
const HAS_ARABIC = new RegExp(`[${AR}]`);
const HAS_LATIN = /[A-Za-z]/;

export function LatinRuns({ text }: { text: string }) {
  return (
    <>
      {splitKeep(text).map((r, i) =>
        r !== "" && !HAS_ARABIC.test(r) && HAS_LATIN.test(r) ? (
          <span key={i} dir="ltr" className="font-en">
            {r}
          </span>
        ) : (
          <Fragment key={i}>{r}</Fragment>
        )
      )}
    </>
  );
}

/** يقسّم النص إلى مقاطع مع إبقاء الفواصل (المقاطع العربية) ضمن النتيجة. */
function splitKeep(text: string): string[] {
  ARABIC_RUN.lastIndex = 0;
  const out: string[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = ARABIC_RUN.exec(text)) !== null) {
    out.push(text.slice(last, m.index));
    out.push(m[0]);
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}
