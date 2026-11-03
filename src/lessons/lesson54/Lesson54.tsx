import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./lesson54.css";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import { SlideFrame } from "../lesson1/Lesson1";
import { Bullets52, En52, Mixed52, Note52, Table52 } from "../lesson52/kit52";
import {
  COMPLETED_54,
  DIALOGUE_54,
  DIALOGUE_QA_54,
  PAGES_54,
  READING_54,
  READING_AR_54,
  READING_QA_54,
  REVIEW_54,
  REVIEW_TABLE_54,
  ROADMAP_54,
  ROADMAP_NOTES_54,
  SPEAKING_54,
  SPEAKING_MODEL_54,
  SUMMARY_54,
  SUMMARY_EXAMPLE_54,
  WRITING_MODEL_54,
  WRITING_PROMPTS_54,
  WRITING_START_54,
  type Block54,
  type Page54,
  type Pair54,
} from "./content54";
import { PRACTICE_54, PRACTICE_ANSWER_GROUPS_54, type Practice54 } from "./practiceData54";
import { TestArea54, type TestResult54 } from "./TestArea54";
import type { Solution54 } from "./testKey54";
import { usePersistent54 } from "./usePersistent54";

type Kind54 =
  | "cover" | "page" | "dialogue" | "dialogue-qa" | "reading" | "reading-ar" | "reading-qa"
  | "practice" | "answers" | "quiz" | "test-key" | "writing" | "speaking" | "review"
  | "summary" | "progress" | "roadmap" | "closing";

type Slide54 = {
  id: string;
  title: string;
  section: string;
  kind: Kind54;
  page?: Page54;
  practice?: Practice54;
};

/** شرائح الدرس 54 — كل الأقسام الـ27 موجودة، بلا اختصار للمحتوى. */
export const SLIDES_54: readonly Slide54[] = [
  { id: "cover", title: "الشرط الثالث", section: "المقدمة", kind: "cover" },
  ...PAGES_54.map((page) => ({ id: page.id, title: page.title, section: page.section, kind: "page" as const, page })),
  { id: "dialogue", title: "The Missed Flight — المحادثة التطبيقية", section: "⑰ المحادثة التطبيقية", kind: "dialogue" },
  { id: "dialogue-questions", title: "أسئلة فهم المحادثة", section: "⑰ المحادثة التطبيقية", kind: "dialogue-qa" },
  { id: "reading", title: "The Important Decision — قطعة القراءة", section: "⑱ قطعة القراءة", kind: "reading" },
  { id: "reading-arabic", title: "الترجمة العربية لقطعة القراءة", section: "⑱ قطعة القراءة", kind: "reading-ar" },
  { id: "reading-questions", title: "أسئلة فهم القراءة", section: "⑱ قطعة القراءة", kind: "reading-qa" },
  ...PRACTICE_54.map((practice) => ({ id: practice.id, title: practice.title, section: "⑲ تدريبات الدرس", kind: "practice" as const, practice })),
  { id: "answers", title: "إجابات التدريبات مع الشرح", section: "⑳ إجابات التدريبات مع الشرح", kind: "answers" },
  { id: "final-test", title: "الاختبار النهائي للدرس 54 — 25 سؤالًا", section: "㉑ الاختبار النهائي", kind: "quiz" },
  { id: "test-key", title: "مفتاح إجابة الاختبار النهائي", section: "㉒ مفتاح إجابة الاختبار النهائي", kind: "test-key" },
  { id: "writing", title: "Writing Task — If I Could Change One Thing in My Past", section: "㉓ مهمة الكتابة", kind: "writing" },
  { id: "speaking", title: "Speaking Task — أحداث ماضية مختلفة", section: "㉔ مهمة التحدث", kind: "speaking" },
  { id: "review", title: "كيف تميز بين الأنواع الأربعة بسرعة؟", section: "㉕ مراجعة مهمة", kind: "review" },
  { id: "summary", title: "الملخص النهائي للدرس 54", section: "㉖ الملخص النهائي", kind: "summary" },
  { id: "progress", title: "تقدمنا في المنهج — 54 / 120", section: "㉗ تقدّم المنهج والدرس القادم", kind: "progress" },
  { id: "roadmap", title: "الدرس القادم: 55 — MIXED CONDITIONALS", section: "㉗ تقدّم المنهج والدرس القادم", kind: "roadmap" },
  { id: "closing", title: "انتهى الدرس 54", section: "㉗ تقدّم المنهج والدرس القادم", kind: "closing" },
];

const enText = (text: string) => <span dir="ltr" lang="en" className="font-en inline-block text-left">{text}</span>;
const hasArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

/** سطر إنجليزي معزول LTR، أو سطر عربي/مختلط عبر محرك الاتجاه المشترك. */
function EnLine({ text }: { text: string }) {
  if (hasArabic(text)) return <div dir="auto"><Mixed52 text={text} /></div>;
  return <div dir="ltr" lang="en" className="font-en text-left">{text}</div>;
}

function PairCards54({ items, title }: { items: readonly Pair54[]; title?: string }) {
  return <div className="grid gap-3">
    {title && <div className="text-sm font-bold text-slate-500"><Mixed52 text={title} /></div>}
    {items.map((item, i) => <div key={i} className="l54-pair">
      <div dir="ltr" lang="en" className="font-en">{item.en}</div>
      <p className="mt-2 text-lg text-slate-500">{item.ar}</p>
    </div>)}
  </div>;
}

/** أسئلة الفهم: إجابة الطالب تُحفظ، ولا يظهر الحل قبل المحاولة. */
function QABlock({ items, storageId }: { items: readonly { q: string; a: string }[]; storageId: string }) {
  const [responses, setResponses] = usePersistent54<Record<number, string>>(`qa:${storageId}`, {});
  const [revealed, setRevealed] = usePersistent54<Record<number, boolean>>(`qa-reveal:${storageId}`, {});
  return <div className="space-y-3">{items.map((item, i) => <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <p dir="ltr" lang="en" className="font-en text-left text-lg font-bold">{i + 1}. {item.q}</p>
    <input aria-label={`إجابة سؤال الفهم ${i + 1}`} dir="ltr" lang="en" value={responses[i] ?? ""} onChange={(e) => setResponses({ ...responses, [i]: e.target.value })} className="font-en mt-3 w-full min-w-0 rounded-xl border-2 border-slate-200 p-3 text-left" />
    <button type="button" disabled={!responses[i]?.trim()} onClick={() => setRevealed({ ...revealed, [i]: true })} className="mt-3 rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white disabled:opacity-40">راجع الإجابة</button>
    {revealed[i] && <div dir="ltr" lang="en" className="font-en l54-answer mt-3">{item.a}</div>}
  </div>)}</div>;
}

function BlockView({ block, storageId }: { block: Block54; storageId: string }) {
  switch (block.kind) {
    case "p": return <p className="text-xl leading-relaxed text-slate-700"><Mixed52 text={block.text} /></p>;
    case "h": return <h3 className="font-head text-xl font-bold text-slate-900"><Mixed52 text={block.text} /></h3>;
    case "formula": return <div dir="ltr" lang="en" data-formula="54" className="font-en l54-formula">{block.text}</div>;
    case "en": return <div className="l54-enblock">
      {block.title && <div className="mb-2 text-sm font-bold text-slate-500"><Mixed52 text={block.title} /></div>}
      {block.lines.map((line, i) => <EnLine key={i} text={line} />)}
    </div>;
    case "bullets": return <Bullets52 items={[...block.items]} ordered={block.ordered} />;
    case "table": return <Table52 head={[...block.head]} rows={block.rows.map((row) => [...row])} caption={block.caption} />;
    case "pairs": return <PairCards54 items={block.items} title={block.title} />;
    case "note": return <Note52 emoji={block.emoji ?? "💡"} text={block.text} />;
    case "qa": return <QABlock items={block.items} storageId={storageId} />;
  }
}

/** كل شريحة محتوى تستخدم SlideFrame الأصلي من الدرس الأول. */
function Frame54({ title, lead, index, children }: { title: string; lead?: string; index: number; children: React.ReactNode }) {
  return <div className="l54-frame"><SlideFrame mascot="⏳" step={index} title={title} lead={lead}>{children}</SlideFrame></div>;
}

function PageView({ page, index }: { page: Page54; index: number }) {
  return <div data-lesson-slide={page.id}><Frame54 title={page.title} lead={page.section} index={index}>
    <div className="space-y-4">{page.blocks.map((block, i) => <BlockView key={i} block={block} storageId={page.id} />)}</div>
  </Frame54></div>;
}

function PracticeView({ practice }: { practice: Practice54 }) {
  const [responses, setResponses] = usePersistent54<Record<number, string>>(`practice:${practice.id}`, {});
  const [revealed, setRevealed] = usePersistent54<Record<number, boolean>>(`practice-reveal:${practice.id}`, {});
  return <div className="space-y-4">
    <p className="text-xl text-slate-600"><Mixed52 text={practice.instruction} /></p>
    {practice.example && <div dir="ltr" lang="en" className="font-en l54-enblock">{practice.example}</div>}
    {practice.items.map((item, i) => {
      const arabic = hasArabic(item.prompt);
      return <div key={i} data-practice-item={i + 1} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p dir={arabic ? "rtl" : "ltr"} lang={arabic ? "ar" : "en"} className={`text-lg font-bold ${arabic ? "" : "font-en text-left"}`}><Mixed52 text={`${i + 1}. ${item.prompt}`} /></p>
        {item.options ? <div dir="ltr" className="mt-3 grid gap-2 sm:grid-cols-2">{item.options.map((option) => <button type="button" key={option} aria-pressed={responses[i] === option} onClick={() => setResponses({ ...responses, [i]: option })} className={`font-en rounded-xl border-2 p-3 text-left font-bold ${responses[i] === option ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"}`}>{option}</button>)}</div>
          : <input aria-label={`إجابة التدريب ${i + 1}`} dir="ltr" lang="en" value={responses[i] ?? ""} onChange={(e) => setResponses({ ...responses, [i]: e.target.value })} className="font-en mt-3 w-full min-w-0 rounded-xl border-2 border-slate-200 p-3 text-left" />}
        <button type="button" disabled={!responses[i]?.trim()} onClick={() => setRevealed({ ...revealed, [i]: true })} className="mt-3 rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white disabled:opacity-40">راجع الإجابة</button>
        {revealed[i] && <div className="mt-3 rounded-2xl bg-emerald-50 p-4">
          <div dir="ltr" lang="en" className="font-en l54-answer">{item.answer}</div>
          {item.explanation && <p className="mt-2 text-slate-700"><Mixed52 text={item.explanation} /></p>}
        </div>}
      </div>;
    })}
    {practice.note && <p className="rounded-2xl bg-amber-50 p-4 text-slate-700">{practice.note}</p>}
  </div>;
}

/** ⑳ إجابات التدريبات مع الشرح — كاملة في شريحة مرجعية واحدة. */
function AnswersView() {
  return <div className="space-y-6">
    <p className="text-xl text-slate-600">حان وقت التطبيق: اقرأ كل سؤال بعناية، وحاول الإجابة بنفسك قبل مراجعة الحلول. إليك إجابات التدريبات الثمانية مع الشرح.</p>
    {PRACTICE_ANSWER_GROUPS_54.map((group) => <section key={group.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-head mb-3 text-xl font-bold text-slate-900"><Mixed52 text={`إجابات ${group.title}`} /></h3>
      <div className="space-y-3">{group.answers.map((entry, i) => <div key={i}>
        <div dir="ltr" lang="en" className="font-en l54-answer">{i + 1}. {entry.answer}</div>
        {entry.explanation && <p className="mt-2 text-slate-700"><Mixed52 text={entry.explanation} /></p>}
      </div>)}</div>
    </section>)}
  </div>;
}

/** ㉒ مفتاح الاختبار — لا يُحمّل ولا يُعرض قبل تسليم الاختبار. */
function TestKeyView({ unlocked }: { unlocked: boolean }) {
  const [solutions, setSolutions] = useState<readonly Solution54[] | null>(null);
  useEffect(() => {
    if (!unlocked) return;
    let alive = true;
    import("./testKey54").then((m) => { if (alive) setSolutions(m.TEST_SOLUTIONS_54); }).catch(() => {});
    return () => { alive = false; };
  }, [unlocked]);
  if (!unlocked) return <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-lg font-semibold text-amber-900">سلّم الاختبار النهائي في الشريحة السابقة أولًا ليظهر مفتاح الإجابة مع أسباب كل إجابة. المفتاح لا يُعرض قبل التسليم.</div>;
  if (!solutions) return <p className="text-lg text-slate-600">جارٍ تحميل مفتاح الإجابة...</p>;
  return <div className="space-y-3">{solutions.map((solution, i) => <div key={solution.id} className="rounded-2xl border border-slate-200 bg-white p-4">
    <div dir="ltr" lang="en" className="font-en l54-answer">{i + 1}. {solution.model}</div>
    <p className="mt-2 text-slate-700">{solution.why}</p>
  </div>)}</div>;
}

function Writing54() {
  const [value, setValue] = usePersistent54<string>("writing", "");
  const [show, setShow] = useState(false);
  return <div className="space-y-4">
    <p className="text-xl text-slate-700">اكتب فقرة باللغة الإنجليزية من 10 إلى 14 جملة بعنوان {enText("If I Could Change One Thing in My Past")} — إذا استطعت تغيير شيء واحد في ماضيّ. يجب أن تستخدم Third Conditional في ست جمل على الأقل.</p>
    <p className="text-lg text-slate-600">يمكنك التحدث عن:</p>
    <Bullets52 items={[...WRITING_PROMPTS_54]} />
    <h3 className="font-head text-xl font-bold">بداية مقترحة</h3>
    <div dir="ltr" lang="en" className="font-en l54-enblock">{WRITING_START_54.map((line) => <div key={line}>{line}</div>)}</div>
    <textarea aria-label="فقرة الكتابة" dir="ltr" lang="en" value={value} onChange={(e) => setValue(e.target.value)} className="font-en min-h-40 w-full rounded-2xl border-2 border-slate-200 p-4 text-left" />
    <button type="button" disabled={!value.trim()} onClick={() => setShow(!show)} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white disabled:opacity-40">{show ? "إخفاء النموذج" : "راجع النموذج الاسترشادي"}</button>
    {show && <div className="rounded-3xl border border-slate-200 p-5">
      <h3 dir="ltr" lang="en" className="font-en text-left font-bold">If I Could Change One Thing in My Past</h3>
      <p dir="ltr" lang="en" className="font-en mt-2 text-left">{WRITING_MODEL_54}</p>
      <p className="mt-3 text-sm text-slate-600">هذا نموذج استرشادي من سبع جمل؛ في مهمتك اكتب 10 إلى 14 جملة كما طُلب.</p>
    </div>}
  </div>;
}

function Speaking54() {
  return <div className="space-y-4">
    <p className="text-xl text-slate-700">تخيل أنك تتحدث مع صديق عن أحداث ماضية كنت تتمنى أن تحدث بطريقة مختلفة. أجب باللغة الإنجليزية عن الأسئلة التالية:</p>
    <div className="grid gap-3">{SPEAKING_54.map((q, i) => <div key={q} className="rounded-2xl border border-slate-200 p-4">
      <p dir="ltr" lang="en" className="font-en text-left text-lg font-semibold">{i + 1}. {q}</p>
    </div>)}</div>
    <div className="rounded-3xl bg-violet-50 p-5">
      <p className="font-bold">مثال على إجابة كاملة</p>
      <p dir="ltr" lang="en" className="font-en mt-2 text-left">Question: {SPEAKING_54[0]}</p>
      <p dir="ltr" lang="en" className="font-en mt-2 text-left">Answer: {SPEAKING_MODEL_54}</p>
    </div>
    <p className="text-lg text-slate-600">حاول أن تستخدم would have وcould have وmight have في إجاباتك، وأن تشرح السبب وراء كل إجابة.</p>
  </div>;
}

function Review54() {
  return <div className="space-y-4">
    <p className="text-xl text-slate-700">تخيل أن لدينا فكرة واحدة وهي الدراسة والنجاح.</p>
    <PairCards54 items={REVIEW_54} />
    <h3 className="font-head text-xl font-bold">احفظ هذا الجدول:</h3>
    <Table52 head={[...REVIEW_TABLE_54.head]} rows={REVIEW_TABLE_54.rows.map((row) => [...row])} />
  </div>;
}

function Summary54() {
  return <div className="space-y-4">
    <p className="text-xl text-slate-700">راجع القواعد التالية جيدًا:</p>
    <Bullets52 items={[...SUMMARY_54]} ordered />
    <h3 className="font-head text-xl font-bold">أهم مثال يجب أن تتذكره:</h3>
    <PairCards54 items={[SUMMARY_EXAMPLE_54]} />
  </div>;
}

function Progress54({ result }: { result: TestResult54 | null }) {
  return <div className="grid gap-4">
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
      <div className="text-sm font-bold text-slate-500">منهج اللغة الإنجليزية</div>
      <div dir="ltr" className="font-head mt-2 text-5xl font-bold">54 / 120</div>
      <div dir="ltr" className="mt-1 text-2xl font-bold text-violet-600">45%</div>
      <div className="mx-auto mt-4 h-3 w-full max-w-md overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-gradient-to-l from-violet-600 via-amber-400 to-emerald-500" style={{ width: `${(54 / 120) * 100}%` }} /></div>
      <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-3">54 درسًا مكتملًا</div><div className="rounded-2xl bg-slate-50 p-3">66 درسًا متبقيًا</div></div>
      <p className="mt-4 text-sm text-slate-500">{result ? "اختبار هذه الجلسة مُسلّم." : "موضع المنهج 54؛ الاختبار في هذه الجلسة لم يُسلّم بعد."}</p>
    </div>
    <p className="text-lg font-bold text-slate-700">الدروس الأخيرة التي أكملناها:</p>
    <Bullets52 items={[...COMPLETED_54]} />
  </div>;
}

function Roadmap54() {
  return <div className="space-y-4">
    <h3 className="font-head text-2xl font-bold">الدرس القادم: 55 — {enText("MIXED CONDITIONALS")}</h3>
    {ROADMAP_NOTES_54.map((text) => <p key={text} className="text-xl text-slate-700"><Mixed52 text={text} /></p>)}
    <PairCards54 items={ROADMAP_54} title="مثال تمهيدي" />
    <Bullets52 items={["الشرط يتحدث عن الماضي: had studied.", "النتيجة تتحدث عن الحاضر: would be.", "وهذا هو جوهر Mixed Conditionals."]} />
    <a href="#/lesson/55" className="l54-next inline-block rounded-full px-5 py-2 text-sm font-bold">الدرس 55 — {enText("MIXED CONDITIONALS")} ←</a>
    <p className="text-sm text-slate-500">قد لا يكون الدرس التالي متاحًا بعد.</p>
  </div>;
}

function Cover54() {
  return <section className="l54-cover relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-14">
    <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-violet-200 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-amber-100 blur-3xl" />
    <div className="relative">
      <div className="pop text-7xl anim-drift">⏳</div>
      <div className="pop pop-1 l54-chip mt-4 inline-block rounded-full px-5 py-2 text-base font-bold">الدرس 54 من 120</div>
      <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">الشرط الثالث</h1>
      <p className="pop pop-3 mt-2 text-2xl text-slate-500"><span dir="ltr"><En52>THIRD CONDITIONAL</En52></span></p>
      <div className="pop pop-4 mt-8 flex justify-center"><div dir="ltr" lang="en" data-formula="54" className="font-en l54-formula max-w-2xl">If + had + V3, would have + V3</div></div>
      <p className="pop pop-5 mt-8 text-base text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
    </div>
  </section>;
}

function Closing54({ onExit }: { onExit?: () => void }) {
  return <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-center text-white shadow-xl md:p-14">
    <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
    <div className="relative">
      <div className="pop text-7xl anim-drift">🏆</div>
      <div className="pop pop-1 mt-3 text-sm font-bold text-slate-400">⭐ إتمام الدرس 54</div>
      <h2 className="pop pop-2 font-head mt-2 text-3xl font-bold md:text-5xl">الشرط الثالث جاهز للاستخدام</h2>
      <p className="pop pop-3 mt-3 text-xl text-slate-300">تذكّر القاعدة الأساسية دائمًا:</p>
      <div className="pop pop-4 mt-8 flex flex-wrap items-center justify-center gap-3"><div dir="ltr" className="font-en rounded-2xl bg-violet-600 px-6 py-3 text-2xl font-extrabold">IF + HAD + V3</div><span className="text-3xl text-slate-500">→</span><div dir="ltr" className="font-en rounded-2xl bg-amber-500 px-6 py-3 text-2xl font-extrabold">WOULD HAVE + V3</div></div>
      <div className="pop pop-6 mt-10 flex flex-wrap justify-center gap-3"><a href="#/lesson/55" className="l54-next rounded-xl px-5 py-2.5 font-bold">الدرس التالي: 55 — {enText("MIXED CONDITIONALS")} ←</a><button type="button" onClick={onExit} className="rounded-xl border border-white/30 px-5 py-2.5 font-bold">جميع الدروس</button></div>
      <p className="mt-4 text-sm text-slate-400">انتهى الدرس 54.</p>
    </div>
  </section>;
}

export default function Lesson54({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menu, setMenu] = useState(false);
  const [answers, setAnswers] = usePersistent54<Record<string, string>>("test-answers", {});
  const [submitted, setSubmitted] = usePersistent54<boolean>("test-submitted", false);
  const [result, setResult] = useState<TestResult54 | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  // إعادة بناء نتيجة الاختبار بعد إعادة تحميل الصفحة: الإجابات محفوظة محليًا،
  // أما المفتاح فيُستورد ديناميكيًا فقط إذا كان الاختبار مُسلّمًا.
  useEffect(() => {
    if (!submitted || result) return;
    let alive = true;
    import("./testKey54").then((m) => { if (alive) setResult(m.gradeTest54(answers)); }).catch(() => {});
    return () => { alive = false; };
  }, [submitted, result, answers]);

  const go = useCallback((n: number) => {
    setStep(Math.max(0, Math.min(SLIDES_54.length - 1, n)));
    setMenu(false);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === "Escape" && menu) { setMenu(false); return; }
      if (menu || target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;
      if (event.key === "ArrowLeft" || (event.key === " " && target?.tagName !== "BUTTON")) { event.preventDefault(); go(step + 1); }
      else if (event.key === "ArrowRight") { event.preventDefault(); go(step - 1); }
      else if (event.key === "Home") { event.preventDefault(); go(0); }
      else if (event.key === "End") { event.preventDefault(); go(SLIDES_54.length - 1); }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [go, step, menu]);

  const groups = useMemo<Lesson1ShellGroup[]>(() => {
    const sections = [...new Set(SLIDES_54.map((s) => s.section))];
    return sections.map((section) => ({
      section,
      items: SLIDES_54.flatMap((s, index) => s.section === section ? [{ index, title: <Mixed52 text={s.title} />, navId: s.id }] : []),
    }));
  }, []);

  const slide = SLIDES_54[step];
  const frame = (title: string, lead: string, children: React.ReactNode) => <Frame54 title={title} lead={lead} index={step + 1}>{children}</Frame54>;
  let body: React.ReactNode;

  switch (slide.kind) {
    case "cover": body = <Cover54 />; break;
    case "page": body = slide.page ? <PageView page={slide.page} index={step + 1} /> : null; break;
    case "dialogue": body = frame(slide.title, "⑰ المحادثة التطبيقية", <div className="space-y-4">
      <p className="text-xl text-slate-700">اقرأ المحادثة التالية، ولاحظ استخدام الشرط الثالث للتعبير عن الندم والنتائج الماضية.</p>
      <PairCards54 items={DIALOGUE_54} />
    </div>); break;
    case "dialogue-qa": body = frame(slide.title, "⑰ أسئلة الفهم", <div className="space-y-4"><h3 className="font-head text-xl font-bold">أسئلة الفهم</h3><QABlock items={DIALOGUE_QA_54} storageId="dialogue-qa" /></div>); break;
    case "reading": body = frame(slide.title, "⑱ قطعة القراءة", <div className="space-y-4">
      <p className="text-xl text-slate-700">اقرأ القطعة التالية بتركيز، وحاول أن تلاحظ كيف يصف الكاتب أحداثًا ماضية ويتخيل نتائج مختلفة.</p>
      <div dir="ltr" lang="en" className="font-en space-y-3 text-left">{READING_54.map((paragraph, i) => i === 0
        ? <h3 key={i} className="font-en text-2xl font-bold">{paragraph}</h3>
        : <p key={i} className="text-lg leading-relaxed">{paragraph}</p>)}</div>
    </div>); break;
    case "reading-ar": body = frame(slide.title, "⑱ الترجمة العربية", <div className="space-y-4"><h3 className="font-head text-xl font-bold">الترجمة العربية</h3>{READING_AR_54.map((paragraph, i) => <p key={i} className="text-xl leading-relaxed text-slate-700">{paragraph}</p>)}</div>); break;
    case "reading-qa": body = frame(slide.title, "⑱ أسئلة الفهم", <div className="space-y-4"><h3 className="font-head text-xl font-bold">أسئلة الفهم</h3><QABlock items={READING_QA_54} storageId="reading-qa" /></div>); break;
    case "practice": body = slide.practice ? frame(slide.title, "⑲ تدريبات الدرس", <PracticeView practice={slide.practice} />) : null; break;
    case "answers": body = frame(slide.title, "⑳ إجابات التدريبات مع الشرح", <AnswersView />); break;
    case "quiz": body = frame(slide.title, "㉑ الاختبار النهائي — 25 سؤالًا", <TestArea54 answers={answers} onAnswersChange={setAnswers} result={result} onResult={(r) => { setResult(r); setSubmitted(Boolean(r)); }} />); break;
    case "test-key": body = frame(slide.title, "㉒ مفتاح إجابة الاختبار النهائي", <TestKeyView unlocked={Boolean(result)} />); break;
    case "writing": body = frame(slide.title, "㉓ مهمة الكتابة", <Writing54 />); break;
    case "speaking": body = frame(slide.title, "㉔ مهمة التحدث", <Speaking54 />); break;
    case "review": body = frame(slide.title, "㉕ مراجعة مهمة", <Review54 />); break;
    case "summary": body = frame(slide.title, "㉖ الملخص النهائي", <Summary54 />); break;
    case "progress": body = frame(slide.title, "㉗ تقدمنا في المنهج", <Progress54 result={result} />); break;
    case "roadmap": body = frame(slide.title, "㉗ الدرس القادم", <Roadmap54 />); break;
    case "closing": body = <Closing54 onExit={onExit} />; break;
  }

  return <Lesson1Shell
    rootClassName="lesson54 style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800"
    rootDir="rtl"
    rootDataLesson={54}
    railTitle="الدرس 54 · الشرط الثالث"
    railSubtitle={<En52 className="text-xs font-semibold text-slate-400">THIRD CONDITIONAL</En52>}
    groups={groups}
    activeIndex={step}
    onSelectStep={go}
    onExit={onExit}
    isMenuOpen={menu}
    onMenuOpenChange={setMenu}
    markActiveStep
    itemTitleClassName="line-clamp-2 leading-snug"
    railAriaLabel="فهرس درس الشرط الثالث"
    navAriaLabel="التنقل بين شرائح الدرس"
    headerContent={<Mixed52 text={`${slide.section} · ${slide.title}`} />}
    progress={((step + 1) / SLIDES_54.length) * 100}
    counter={<bdi dir="ltr">{step + 1} / {SLIDES_54.length}</bdi>}
    counterDir="ltr"
    mainId="l54-main"
    mainRef={mainRef}
    contentKey={step}
    contentArea={slide.id}
    onPrev={() => go(step - 1)}
    onNext={() => go(step + 1)}
    prevDisabled={step === 0}
    nextDisabled={step === SLIDES_54.length - 1}
  >{body}</Lesson1Shell>;
}
