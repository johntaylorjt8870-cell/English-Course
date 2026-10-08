import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES as DATA_SLIDES,
  SOURCE_SECTIONS,
  SOURCE_LEDGER_COUNT,
  SOURCE_NUMBERED_COUNT,
  SEC,
  LESSON_TITLE_28,
  LESSON_SUBTITLE_28,
  LAB_NAME_28,
  LAB_MOTTO_28,
  EX28_CHOOSE,
  EX28_FIRST_EVENT,
  EX28_ERRORS,
  EX28_ERROR_SPOTS,
  EX28_JOHN_MARY,
  EX28_SARAH_TOM,
  EX28_DANIEL,
  ALEX_SCENE_28,
  BOSS_28,
  IQFINAL_28,
  LOGIC_NOTE_S33,
  TEST_28,
  TEST_28_SOLUTIONS,
  TEACHER_PASSWORD_28,
  TEACHER_28_OVERVIEW,
  TEACHER_28_NOTES,
  TEACHER_28_SOLUTIONS,
  TEACHER_28_RUBRIC,
  TEACHER_28_MISTAKES,
  STORY_28_REQUIREMENTS,
  STORY_28_TITLE,
  type Mcq28,
  type Slide28 as Slide28Data,
  type TestQ28,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
// LatinRuns يُستخدم عبر مكوّن Rich في shared/lessonKit لتفكيك النص المختلط عربي/لاتيني — نورده هنا للتنسيق الموحّد للجمل المختلطة
import { EnAr, LatinRuns } from "../../shared/bidi";
import {
  En,
  Rich,
  PlatformTag,
  PartsLine,
  SentenceCard,
  Frame,
  Note,
  Verdict,
  type Part,
  type RoleStyle,
  type FrameAccent,
} from "../../shared/lessonKit";
import FinalTest, { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";

// ============================================================
// 🧭 الدرس 28 — Past Perfect vs Past Simple
// 🧠 IQ200 ترتيب الأحداث في الماضي باحتراف · THE TIMELINE MASTER
//
// إعادة بناء native multi-step بمعيار الدرس 6 والدرسين 27 + 29:
// - فكرة واحدة لكل خطوة · لا جدران نصوص · التفاعل هو الشرح
// - سجل المصدر (SOURCE_SECTIONS) = مرجع التغطية والتدقيق فقط،
//   ولا يُعرض أبدًا كأسطر خام في واجهة الطالب
// - المناطق الأربع: الدرس (47 خطوة) | الاختبار (20) | الحلول | المعلم
// ============================================================

const ACCENT28: FrameAccent = {
  step: "bg-indigo-700",
  badge: "bg-indigo-100 text-indigo-800",
  tip: "from-indigo-700 to-cyan-600",
  shadow: "shadow-[0_16px_44px_-24px_rgba(67,56,202,0.45)]",
};

// ---------------- تخصيب سجل التنقّل ببيانات العرض (خطوة/تلميح) ----------------
// سجل data.ts هو المصدر الأساسي (mascot/step/lead/tip/source لكل خطوة)؛
// LEADS/TIPS أدناه مكمّلة عرضية تُملأ فقط عند غياب النص في السجل.
type Slide28 = Slide28Data;

const LEADS: Record<string, string> = {
  bridge: "الدرس 27 بنى الآلة. الدرس 28 يعلّمك متى تستخدمها.",
  objectives: "عشرة أهداف — خريطة إتقان كاملة.",
  s1: "السؤال الذي يحكم الدرس كله.",
  s2: "لا مقارنة → لا ماضٍ تام. حدث واحد يكفي بالبسيط.",
  s3: "الأقدم يأخذ had + V3 — والأحدث يبقى بسيطًا.",
  s4: "نفس الفعل، ومعنيان مختلفان تمامًا — في نقرة واحدة.",
  s5: "المعيار ليس القِدَم، بل وجود حدث ثانٍ.",
  s6: "اضبط البوصلة الزمنية: أقدم ← أول ← ثانٍ ← الآن.",
  s7: "كلمة صغيرة تغيّر ترتيب الأحداث بالكامل.",
  s8: "قبل أن نشرح — أجب بنفسك: أي حدث وقع أولًا؟",
  s9: "before توضّح الترتيب بنفسها — والتام يضيف تركيزًا لا إلزامًا.",
  s10: "لإبراز الحدث الأقدم من أول كلمة تقريبًا.",
  s11: "after نفسها تساعد على تحديد الترتيب.",
  s12: "اسأل عن العلاقة الزمنية، لا عن الكلمة، بجدية.",
  s13: "أقوى إشارة للماضي التام: اكتمل قبل نقطة ماضية.",
  s14: "تقع بين had و V3: had already + V3.",
  s15: "الحدثان قريبان جدًا… لكن الترتيب ثابت.",
  s16: "قصة واحدة بكاميرتين.",
  s17: "حدث · كان يحدث · كان قد حدث.",
  s18: "ثلاث طبقات زمنية في جملة طويلة.",
  s19: "صنّف كل فعل وظهرت الصورة كاملة.",
  s20: "أقدم؟ مستمر؟ حدثان نقطيان؟",
  s21: "go → went → gone.",
  s22: "eat → ate → eaten.",
  s23: "see → saw → seen.",
  s24: "Had + subject + V3؟",
  s25: "hadn’t + V3 — ولا did أبدًا.",
  s26: "اسأل: كم حدثًا؟ أيهما أقدم؟ ماذا نشدّد؟",
  s27: "السرد يتقدّم… ثم يرجع خطوة.",
  s28: "الماضي التام ليس «خلفًا» — بل ترتيبًا.",
  s29: "ثمانية أفعال في كهف واحد — صنّفها كلها.",
  s30: "خمس جمل — الترتيب قبل الزمن.",
  s31: "ثلاث وقائع — من حدث أولًا؟",
  s32: "خمسة أخطاء من «عيادة الأخطاء».",
  s33: "أشهر لغز ترتيب — والمصدر يقول A.",
  s34: "أي الجملتين تعني أن سارة وصلت أولًا؟",
  s35: "قبل الدخول · لحظة الدخول · بعد الدخول.",
  s36: "ليس كل ما يبدو تامًّا يحتاج had.",
  s37: "لقطة واحدة من الحياة بثلاثة ألوان.",
  s38: "قاعدة حاسمة واحدة — احفظها جيدًا.",
  s39: "اختر الجملة الصحيحة 100% — بلا ملامسات خارجية.",
  s40: "اكتب قصة بالمتطلبات العشرة — أنت كاتب زمني.",
  summary: "النظام كله في ثلاثة أسئلة.",
  golden: "القاعدة التي تختصر الدرس كله.",
  iqfinal: "جملة واحدة بأربعة أجزاء — صنّف كلها.",
  closing: "أصبحت THE TIMELINE MASTER.",
};

const TIPS: Record<string, string> = {
  s1: "رتّب الحدثين بنفسك قبل أن تنظر إلى الصيغة.",
  s4: "اسأل دائمًا: هل يوجد حدث ماضٍ ثانٍ؟",
  s5: "الأقدم مِن ماذا؟ هذا هو السؤال.",
  s12: "لا تقل: قبل = لازم تام. اسأل: ما العلاقة الزمنية؟",
  s29: "المحقق لا يُصنّف بالوهم — بل بالسياق.",
  s32: "كل الأخطاء من family had + V2 — راقب التصريف الثالث.",
  s40: "أكثر من عشرة أسطر — لا بأس. القِصَد هو الاستعمال الصحيح، لا الطول.",
};

export const SLIDES: Slide28[] = DATA_SLIDES.map((n) => ({
  ...n,
  // السجل في data.ts هو المصدر الأساسي؛ LEADS/TIPS أدناه تكميل عرضي فقط عند غياب النص
  step: n.step ?? (/^s(\d+)$/.exec(n.id)?.[1] || undefined),
  lead: n.lead ?? LEADS[n.id],
  tip: n.tip ?? TIPS[n.id],
}));

// ---------------- نظام أدوار الجملة (تشريح الأزمنة) ----------------
const R28: Record<string, RoleStyle> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", label: "الفاعل" },
  had: { chip: "bg-violet-100 border-violet-300 text-violet-900", label: "had" },
  v3: { chip: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900", label: "التصريف الثالث V3" },
  v2: { chip: "bg-orange-100 border-orange-300 text-orange-900", label: "الماضي البسيط V2" },
  was: { chip: "bg-teal-100 border-teal-300 text-teal-900", label: "was / were" },
  ing: { chip: "bg-cyan-100 border-cyan-300 text-cyan-900", label: "المستمر V-ing" },
  conn: { chip: "bg-amber-100 border-amber-300 text-amber-900", label: "أداة الربط" },
  adv: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", label: "الظرف" },
  obj: { chip: "bg-slate-100 border-slate-300 text-slate-900", label: "المفعول/التكملة" },
};
const P = (text: string, role: string): Part => ({ text, role });

// ---------------- الأزمنة الثلاثة كأدوار بصرية ----------------
type Lens28 = "event" | "progress" | "flashback";
const LENS_META: Record<Lens28, { tag: string; ar: string; chip: string; soft: string; text: string; ring: string; bar: string }> = {
  event: {
    tag: "📸 EVENT",
    ar: "ماذا حدث؟",
    chip: "bg-orange-500 text-white",
    soft: "border-orange-200 bg-orange-50",
    text: "text-orange-900",
    ring: "ring-orange-300",
    bar: "bg-orange-400",
  },
  progress: {
    tag: "🎥 IN-PROGRESS",
    ar: "ماذا كان يحدث؟",
    chip: "bg-teal-600 text-white",
    soft: "border-teal-200 bg-teal-50",
    text: "text-teal-900",
    ring: "ring-teal-300",
    bar: "bg-teal-500",
  },
  flashback: {
    tag: "⏪ FLASHBACK",
    ar: "ماذا كان قد حدث قبل ذلك؟",
    chip: "bg-violet-700 text-white",
    soft: "border-violet-200 bg-violet-50",
    text: "text-violet-900",
    ring: "ring-violet-300",
    bar: "bg-violet-500",
  },
};
const TENSES_28 = ["Past Simple", "Past Continuous", "Past Perfect"] as const;

function TenseChip({ tense }: { tense: Lens28 }) {
  const v = LENS_META[tense];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-black ${v.chip}`}>
      <En>{v.tag}</En>
      <span className="text-white/90">·</span>
      <Rich text={v.ar} />
    </span>
  );
}

// ---------------- مكونات تعليمية مشتركة ----------------

/** مختبر بصري تفاعلي — يحمل هوية data-en-seq للتدقيق. */
function Lab({
  emoji,
  label,
  ar,
  children,
  seq,
}: {
  emoji: string;
  label: string;
  ar?: string;
  children: ReactNode;
  seq?: string;
}) {
  return (
    <div
      data-en-seq={seq}
      className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-sky-50 to-amber-50/70 p-3.5 sm:p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-indigo-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <EnAr en={label} ar={ar} enClassName="text-[11px] font-black uppercase tracking-[0.16em] text-indigo-700" arClassName="text-sm font-bold text-slate-600" />
      </div>
      {children}
    </div>
  );
}

/** شرح إضافي من المنصة — يُوسم دائمًا بشارة Platform Explanation. */
function PlatformPanel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-3xl border-2 border-amber-300 bg-amber-50 p-3.5">
      <div dir="ltr" className="ltr-pair flex flex-wrap items-center gap-2">
        <PlatformTag />
        {title && (
          <div dir="rtl" className="text-sm font-black text-slate-800">
            <Rich text={title} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

/** رقعة كشف متأخرة — لا تظهر إلا بعد «تحقق من الإجابات». */
function SourceReveal({ seq, children }: { seq: string; children: ReactNode }) {
  return (
    <div data-reveal-block={seq} className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
      {children}
    </div>
  );
}

/** شريط زمني — الجملتان مع شرايين زمنية ملوّنة (يُستخدم في متحلل التسلسلات). */
function TrackBar({
  label,
  color,
  width,
}: {
  label: ReactNode;
  color: string;
  width: string;
}) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-2xl border-2 border-slate-200 bg-white p-2.5">
      <div className="text-left text-xs font-black text-slate-700">{label}</div>
      <div className="relative mt-2 h-3 overflow-visible rounded-full bg-slate-100">
        <div className={`absolute left-0 top-0 h-3 rounded-full ${color}`} style={{ width }} />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-black text-slate-400">
        <En>EARLIER PAST</En>
        <En>LATER PAST</En>
        <En>NOW</En>
      </div>
    </div>
  );
}

/** شريط صيغة إنجليزي — كل عنصر وحدة LTR مستقلة. */
function FormulaStrip({
  items,
  tone = "indigo",
}: {
  items: readonly string[];
  tone?: "indigo" | "orange" | "teal" | "amber" | "sky" | "rose" | "violet";
}) {
  const colors: Record<string, string> = {
    indigo: "border-indigo-200 bg-white text-indigo-900",
    violet: "border-violet-200 bg-white text-violet-900",
    orange: "border-orange-200 bg-white text-orange-900",
    teal: "border-teal-200 bg-white text-teal-900",
    amber: "border-amber-200 bg-white text-amber-900",
    sky: "border-sky-200 bg-white text-sky-900",
    rose: "border-rose-200 bg-white text-rose-900",
  };
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item, i) => (
        <En key={`${i}-${item}`} className={`rounded-xl border-2 px-3 py-2 text-sm font-black ${colors[tone]}`}>
          {item}
        </En>
      ))}
    </div>
  );
}

/** بطاقتا ترتيب الأحداث: أقدم أولًا ثم أحدث. */
function OrderPair({ first, second, note }: { first: string; second: string; note?: string }) {
  return (
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className={`rounded-2xl border-2 p-3 text-center ${LENS_META.flashback.soft}`}>
          <div className="font-head mx-auto grid h-8 w-8 place-items-center rounded-lg bg-violet-700 text-sm font-bold text-white">1</div>
          <En className="mt-1 block text-sm font-black text-violet-900">{first}</En>
          <div className="text-xs font-bold text-slate-500"><Rich text="الحدث الأقدم — أولًا" /></div>
        </div>
        <div className={`rounded-2xl border-2 p-3 text-center ${LENS_META.event.soft}`}>
          <div className="font-head mx-auto grid h-8 w-8 place-items-center rounded-lg bg-orange-500 text-sm font-bold text-white">2</div>
          <En className="mt-1 block text-sm font-black text-orange-900">{second}</En>
          <div className="text-xs font-bold text-slate-500"><Rich text="الحدث الأحدث — ثانيًا" /></div>
        </div>
      </div>
      {note && (
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-2.5 text-center text-sm font-bold text-emerald-900">
          <Rich text={note} />
        </div>
      )}
    </div>
  );
}

/** شريط التحقق الموحد لكل التدريبات المحايدة: حياد → تحقق من الإجابات → كشف. */
function CheckBar({
  checked,
  allAnswered,
  answered,
  total,
  score,
  onCheck,
  onReset,
  hint,
  label,
}: {
  checked: boolean;
  allAnswered: boolean;
  answered: number;
  total: number;
  score?: ReactNode;
  onCheck: () => void;
  onReset: () => void;
  hint: string;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
      <button
        type="button"
        onClick={onCheck}
        disabled={checked || !allAnswered}
        title={allAnswered ? undefined : hint}
        className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-indigo-800 disabled:opacity-30"
      >
        <Rich text={`${label ?? "تحقق من الإجابات"} (${answered}/${total})`} />
      </button>
      {checked ? (
        <>
          {score !== undefined && (
            <span className="rounded-xl bg-indigo-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={typeof score === "string" ? score : ""} />
              {typeof score !== "string" ? score : null}
            </span>
          )}
          <button type="button" onClick={onReset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
            <Rich text="↺ إعادة" />
          </button>
        </>
      ) : (
        <span className="text-xs font-bold text-slate-500">
          <Rich text={hint} />
        </span>
      )}
    </div>
  );
}

// ---------------- الغلاف وجسر المحاضرة والأهدافيات ----------------

/** Ⓒ الغلاف — هوية المعامل + الأسئلة الخمس الحاكمة. */
function CoverStep() {
  const [lens, setLens] = useState<Lens28>("event");
  const previews: Record<Lens28, { en: string; ar: string }> = {
    event: { en: "I closed the door.", ar: "أغلقتُ الباب. — حدث تام في الماضي" },
    progress: { en: "I was closing the door when the phone rang.", ar: "كنت أغلق الباب حين رن الهاتف — حدث مستمر" },
    flashback: { en: "I had closed the door before the phone rang.", ar: "كنت قد أغلقت الباب قبل أن يرن الهاتف — حدث أسبق" },
  };
  return (
    <div data-en-seq="l28-cover" className="space-y-4">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row space-y-2 rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950 p-5 text-center">
        <div className="text-4xl">🧭</div>
        <En className="block text-xs font-black uppercase tracking-[0.28em] text-cyan-300">{LAB_NAME_28}</En>
        <En className="block text-xl font-black text-white sm:text-2xl">Past Perfect vs Past Simple</En>
        <En className="block text-sm italic text-indigo-200">{LAB_MOTTO_28}</En>
      </div>
      <div className="rounded-2xl border-2 border-indigo-100 bg-white p-4 text-center">
        <div className="font-head text-lg font-bold text-slate-900">
          <Rich text={LESSON_TITLE_28} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-500">
          <Rich text={LESSON_SUBTITLE_28} />
        </div>
      </div>
      <div className="rounded-2xl border-2 border-slate-100 bg-white p-4">
        <div className="mb-2 text-center text-sm font-black text-slate-700">
          <Rich text="كاميرا الأزمنة — الم نفس اللقطة بثلاثة أزمنة:" />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {(["event", "progress", "flashback"] as Lens28[]).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={lens === t}
              onClick={() => setLens(t)}
              className={`rounded-xl px-3 py-1.5 text-sm font-black transition ${lens === t ? LENS_META[t].chip : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              <Rich text={`${t === "event" ? "📸" : t === "progress" ? "🎥" : "⏪"} ${t === "event" ? "ماضٍ بسيط" : t === "progress" ? "ماضٍ مستمر" : "ماضٍ تام"}`} />
            </button>
          ))}
        </div>
        <div className={`mt-2 rounded-2xl border-2 p-3 text-center transition ${LENS_META[lens].soft}`}>
          <En className="block text-base font-black">{previews[lens].en}</En>
          <div className="mt-1 text-sm font-bold text-slate-600">
            <Rich text={previews[lens].ar} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3">
          <div className="font-head text-2xl font-bold text-indigo-800">47</div>
          <div className="text-xs font-black text-slate-500"><Rich text="خطوة تفاعلية" /></div>
        </div>
        <div className="rounded-2xl border-2 border-amber-100 bg-amber-50 p-3">
          <div className="font-head text-2xl font-bold text-amber-700">20</div>
          <div className="text-xs font-black text-slate-500"><Rich text="سؤالًا بالاختبار" /></div>
        </div>
        <div className="rounded-2xl border-2 border-violet-100 bg-violet-50 p-3">
          <div className="font-head text-2xl font-bold text-violet-800">3</div>
          <div className="text-xs font-black text-slate-500"><Rich text="أزمنة على المسار" /></div>
        </div>
      </div>
    </div>
  );
}

/** Ⓑ الجسر — من الدرس 27: بنيتَ الآلة، والآن تتقنُ الترتيب. */
function BridgeStep() {
  const qs = [
    { q: "لماذا had + V3 في The train had left؟", a: "لأن حدث two events في الماضي: مغادرة القطار أولًا ثم وصولي", chip: "⏪ FLASHBACK", tone: "violet" as const },
    { q: "ما الفرق بين arrived و had arrived؟", a: "arrived = حدث في الماضي · had arrived = حدث أقدم من حدث آخر", chip: "HAD", tone: "indigo" as const },
    { q: "هل نحتاج دائمًا إلى Past Perfect؟", a: "لا — فقط عندما نريد إبراز الترتيب الزمني بين حدثين", chip: "⚖️", tone: "orange" as const },
    { q: "متى يكون Past Simple كافيًا وحده؟", a: "عندما لا يوجد حدث ماضٍ آخر في الجملة", chip: "📸 EVENT", tone: "orange" as const },
    { q: "كيف يرتب العقل الأحداث قبل بناء الجملة؟", a: "يقرر: أيهما أقدم؟ أيهما أحدث؟ ثم يختار الزمن الملائم", chip: "🧠", tone: "indigo" as const },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div data-en-seq="l28-bridge" className="space-y-3">
      <Note emoji="🔗" text="الدرس 27 بنى آلة الزمن: شكل الأزمنة وبناؤها. الدرس 28 يبني قرار الزمن: أيهما يصحّ هنا؟ ولماذا؟" />
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/70 p-3">
        <div className="mb-1 text-sm font-black text-indigo-900">
          <Rich text="الصيغة حاضرة من الدرس 27: " />
        </div>
        <FormulaStrip items={["had", "+", "V3"]} tone="violet" />
        <div className="mt-1.5 text-center text-xs font-bold text-slate-500">
          <Rich text="والآن السؤال: لماذا؟ ومتى؟ وقبل أي شيء آخر — هل يوجد حدثان أم حدث واحد؟" />
        </div>
      </div>
      <div className="text-sm font-black text-slate-800">
        <Rich text="🧠 الأسئلة الخمس التي ستحكم قرارك في هذا الدرس — المس أي سؤال لكشف أثره:" />
      </div>
      <div className="space-y-1.5">
        {qs.map((qa, i) => (
          <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white">
            <button
              type="button"
              aria-pressed={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-start text-sm font-bold text-slate-700 transition hover:bg-indigo-50/50"
            >
              <span className="font-head grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-700 text-xs font-bold text-white">{i + 1}</span>
              <span className="flex-1"><Rich text={qa.q} /></span>
              <span className={`text-xs transition ${open === i ? "rotate-180" : ""}`}>▼</span>
            </button>
            {open === i && (
              <div className="mx-2 mb-2 rounded-xl border-2 border-indigo-100 bg-indigo-50/60 p-2.5">
                <div className="text-sm font-bold text-slate-700">
                  <Rich text={qa.a} />
                </div>
                <div className="mt-1">
                  <En className={`rounded-lg border-2 px-2 py-0.5 text-[11px] font-black ${qa.tone === "violet" ? "border-violet-200 bg-white text-violet-800" : qa.tone === "orange" ? "border-orange-200 bg-white text-orange-800" : "border-indigo-200 bg-white text-indigo-800"}`}>{qa.chip}</En>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <PlatformPanel title="كيف نظّمنا الدرس؟">
        <div className="rounded-xl bg-white/70 p-2.5 text-sm font-bold text-slate-700">
          <Rich text="مسارك: القرار (بسيط أم تام؟) ← كلمات الترتيب ← الأزمنة الثلاثة ← الأخطاء ← التفكير الزمني ← تدريبات ← مستوى متقدم ← تحديات نهائية. كل خطوة فكرة واحدة تلمسها بيدك." />
        </div>
      </PlatformPanel>
    </div>
  );
}

/** Ⓞ الأهداف — قائمة تفاعلية: المس كل هدف عند فهمه. */
function ObjectivesStep() {
  const goals = [
    "التمييز بوضوح بين Past Simple و Past Perfect",
    "فهم استخدام Past Perfect للحدث الأقدم",
    "استخدام before و after و by the time بثقة",
    "تمييز already / just / never في الماضي التام",
    "ترتيب الحدثين منطقيًا قبل اختيار الزمن",
    "إدخال Past Continuous بوصفه حدثًا مستمرًّا",
    "قراءة الجملة بذهن المحقق الزمني",
    "تجنب الخلط بين V2 داخل had + V3",
    "تلخيص قاعدة زمنية واحدة من أي جملة صعبة",
    "تصميم جمل متقنة تجمع أكثر من زمن في سياق واحد",
  ];
  const [done, setDone] = useState<boolean[]>(() => goals.map(() => false));
  const count = done.filter(Boolean).length;
  return (
    <div data-en-seq="l28-objectives" className="space-y-3">
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-3">
        <div className="flex items-center justify-between text-sm font-black text-slate-700">
          <Rich text="🎯 خريطة الإتقان — 10 أهداف" />
          <span className="font-head rounded-lg bg-indigo-700 px-2 py-0.5 text-xs font-bold text-white">{count} / 10</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-700 to-cyan-600 transition-all" style={{ width: `${count * 10}%` }} />
        </div>
      </div>
      <div className="space-y-1.5">
        {goals.map((g, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={done[i]}
            onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
            className={`flex w-full items-center gap-2 rounded-xl border-2 px-3 py-2 text-start text-sm font-bold transition ${done[i] ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-100 bg-white text-slate-700 hover:border-indigo-200"}`}
          >
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${done[i] ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
              {done[i] ? "✓" : i + 1}
            </span>
            <Rich text={g} />
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-bold text-slate-500">
        <Rich text={count >= 10 ? "🚀 كل الأهداف واضحة — انطلق للخطوة الأولى!" : "المس أي هدف لتعلم أنه واصل معك في هذا الدرس."} />
      </div>
    </div>
  );
}

// ---------------- القسم ١: القرار — بسيط أم تام؟ (s1–s8) ----------------

/** ① The First Question — المختبر الأول: أيهما حدث أولًا؟ */
function S1_FirstQuestion() {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <SentenceCard roles={R28} parts={[P("The train", "s"), P("had left", "had"), P("before", "conn"), P("I", "s"), P("arrived", "v2")]} ar="غادر القطار قبل أن أصل." />
      <PartsLine roles={R28} parts={[P("The train", "s"), P("had", "had"), P("left", "v3")]} title="الحدث الأقدم" />
      <PartsLine roles={R28} parts={[P("I", "s"), P("arrived", "v2")]} title="الحدث الأحدث" />
      <Lab seq="l28-first-question" emoji="🧭" label="FIRST QUESTION LAB" ar="مختبر السؤال الأول">
        <div className="text-center text-sm font-black text-slate-800">
          <Rich text="في الجملة أعلاه: أي حدث حدث أولًا؟ المس الحدث الأقدم:" />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[{ en: "The train left", note: "القطار غادر" }, { en: "I arrived", note: "أنا وصلت" }].map((ev, i) => {
            const ok = i === 0;
            return (
              <button
                key={ev.en}
                type="button"
                aria-pressed={pick === i}
                onClick={() => setPick(i)}
                className={`rounded-2xl border-2 p-3 text-center transition ${pick === null ? "border-slate-200 bg-white hover:border-indigo-300" : pick === i ? (ok ? "border-emerald-400 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-100 bg-slate-50 opacity-50"}`}
              >
                <span className="font-head mx-auto grid h-7 w-7 place-items-center rounded-lg bg-violet-700 text-xs font-bold text-white">{i === 0 ? "1" : "2"}</span>
                <En className="mt-1 block text-sm font-black text-slate-800">{ev.en}</En>
                <span className="text-xs font-bold text-slate-500"><Rich text={ev.note} /></span>
                {pick === i && (
                  <div className={`mt-1 text-xs font-black ${ok ? "text-emerald-700" : "text-rose-700"}`}>
                    <Rich text={ok ? "✓ أحسنت — had left تدل على أنه الأقدم" : "✕ انتبه: had left تدل على الأقدم، لا على الحدث الثاني"} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Lab>
      {pick !== null && (
        <Verdict
          ok
          en="The train had left before I arrived."
          why="حدثان في الماضي: مغادرة القطار كانت قبل وصولي. الأقدم يأخذ had + V3 (Past Perfect)، والأحدث يأخذ الماضي البسيط (Past Simple)."
        />
      )}
    </div>
  );
}

/** ② Past Simple — جملة حدث واحد: البسيط كافٍ. */
function S2_OneEvent() {
  const [n, setN] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <SentenceCard roles={R28} parts={[P("I", "s"), P("visited", "v2"), P("my uncle", "obj"), P("yesterday", "adv")]} ar="زرت عمي بالأمس." />
      <Note emoji="💡" text="لا يوجد حدث ماضٍ آخر في الجملة — حدث واحد فقط في الماضي." />
      <Lab seq="l28-past-simple" emoji="📸" label="ONE EVENT CHECK" ar="كم حدثًا توجد في الجملة؟">
        <div className="flex justify-center gap-2">
          {[1, 2].map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={n === v}
              onClick={() => setN(v)}
              className={`font-head grid h-12 w-12 place-items-center rounded-2xl border-2 text-xl font-bold transition ${n === null ? "border-slate-200 bg-white hover:border-indigo-300" : n === v ? (v === 1 ? "border-emerald-400 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-100 bg-slate-50 opacity-40"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </Lab>
      {n !== null && (
        <Verdict
          ok={n === 1}
          en="I visited my uncle yesterday. → Past Simple ✓"
          why={n === 1 ? "حدث واحد فقط في الماضي — الماضي البسيط كافٍ تمامًا هنا. لا حاجة إلى Past Perfect." : "تأمّل الجملة جيدًا: visited حدث واحد فقط. لا يوجد حدث ثانٍ نرتّبه معه."}
        />
      )}
    </div>
  );
}

/** ③ Past Perfect — الأقدم يأخذ had + V3. */
function S3_OlderEvent() {
  const [order, setOrder] = useState<"ok" | "wrong" | null>(null);
  return (
    <div className="space-y-3">
      <OrderPair first="visited my uncle" second="went to the museum" note="زرت عمي أولًا، ثم ذهبت إلى المتحف بعد ذلك." />
      <SentenceCard roles={R28} parts={[P("I", "s"), P("had visited", "had"), P("my uncle", "obj"), P("before", "conn"), P("I", "s"), P("went", "v2"), P("to the museum", "obj")]} ar="كنت قد زُرتُ عمي قبل أن أذهب إلى المتحف." />
      <Lab seq="l28-past-perfect" emoji="⏪" label="ROLE SWAP" ar="لو أردنا عكس الأزمنة؟">
        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" aria-pressed={order === "ok"} onClick={() => setOrder("ok")} className={`rounded-2xl border-2 p-2.5 text-sm transition ${order === "ok" ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white hover:border-indigo-300"}`}>
            <En className="block font-black text-slate-800">had visited ← went</En>
            <span className="text-xs font-bold text-slate-500"><Rich text="الأقدم PP، ثم PS" /></span>
          </button>
          <button type="button" aria-pressed={order === "wrong"} onClick={() => setOrder("wrong")} className={`rounded-2xl border-2 p-2.5 text-sm transition ${order === "wrong" ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white hover:border-indigo-300"}`}>
            <En className="block font-black text-slate-800">visited ← had went</En>
            <span className="text-xs font-bold text-slate-500"><Rich text="ترتيب مقلوب" /></span>
          </button>
        </div>
      </Lab>
      {order && (
        <Verdict
          ok={order === "ok"}
          en={order === "ok" ? "I had visited my uncle before I went to the museum. ✓" : "✕ الترتيب خاطئ نحويًا وزمنيًا"}
          why={order === "ok" ? "كان الحدث الأول: زيارة العم — لذلك أخذ had + visited. ذهابًا إلى المتحف كان ثانيًا — لذلك أخذ went. الأقدم يأخذ Past Perfect." : "لا يجوز وضع الحدث الأقدم في Past Simple والحدث الأحدث في Past Perfect — هذا يعكس الزمن. وHad went خطأ ثانٍ كما ستتعلم في قسم الأخطاء."}
        />
      )}
    </div>
  );
}

/** ④ Compare Directly — المقارنة المباشرة بمفتاح واحد. */
function S4_Compare() {
  const [two, setTwo] = useState<boolean>(false);
  return (
    <div className="space-y-3">
      <Lab seq="l28-compare-direct" emoji="🔑" label="COMPARE DIRECTLY" ar="قارن مباشرة بنقرة واحدة">
        <div className="text-center text-sm font-black text-slate-800">
          <Rich text="نبدأ من الجملة الأولى، ثم نضيف الحدث الثاني:" />
        </div>
        <div className="mt-2 space-y-2">
          <div className={`rounded-2xl border-2 p-3 text-center transition ${two ? "border-orange-200 bg-orange-50/70" : "border-emerald-300 bg-emerald-50"}`}>
            <En className="block text-base font-black text-slate-800">I lost my key.</En>
            <div className="text-xs font-bold text-slate-500"><Rich text="فقدت مفتاحي. — حدث واحد → Past Simple ✓" /></div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              aria-pressed={two}
              onClick={() => setTwo((v) => !v)}
              className={`rounded-xl px-5 py-2 text-sm font-black text-white transition ${two ? "bg-violet-700" : "bg-indigo-700 hover:bg-indigo-800"}`}
            >
              <Rich text={two ? "↺ عودة لجملة الحدث الواحد" : "➕ أضف الحدث الثاني: get home"} />
            </button>
          </div>
          {two && (
            <>
              <div className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-3 text-center">
                <En className="block text-base font-black text-violet-900">I had lost my key before I arrived home.</En>
                <div className="text-xs font-bold text-slate-500"><Rich text="كان مفتاحي قد ضاع قبل أن أصل إلى المنزل. — حدثان!" /></div>
              </div>
              <OrderPair first="lost my key" second="got home" />
            </>
          )}
        </div>
        <div className="mt-2 rounded-xl bg-white p-2 text-center text-xs font-bold text-slate-600">
          <Rich text={two ? "الآن وُلدت الجملة الثانية بفضل الحدث الثاني — وهذا هو الفرق كله." : "اضغط الزر وشاهد اللحظة التي يولد فيها Past Perfect."} />
        </div>
      </Lab>
    </div>
  );
}

/** ⑤ The Old Myth — خرافة «القديم جدًّا» تسقط. */
function S5_OldMyth() {
  const [myth, setMyth] = useState<boolean | null>(null);
  return (
    <div className="space-y-3">
      <Lab seq="l28-old-myth" emoji="🏺" label="THE OLD MYTH LAB" ar="مختبر أسطورة القِدَم">
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
          <div className="text-sm font-black text-rose-800">
            <Rich text="الفكرة الخاطئة: " />
          </div>
          <div className="text-sm font-bold text-rose-700">
            <Rich text="نستخدم Past Perfect فقط لأن الحدث قديم جدًّا." />
          </div>
        </div>
        <div className="mt-2 text-center text-sm font-black text-slate-800">
          <Rich text="اجب: هل القِدَم وحده سبب كافٍ؟" />
        </div>
        <div className="mt-1.5 flex justify-center gap-2">
          <button type="button" aria-pressed={myth === true} onClick={() => setMyth(true)} className={`rounded-xl border-2 px-5 py-2 text-sm font-black transition ${myth === true ? "border-rose-400 bg-rose-50 text-rose-800" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"}`}>
            <Rich text="نعم، يكفي ❌" />
          </button>
          <button type="button" aria-pressed={myth === false} onClick={() => setMyth(false)} className={`rounded-xl border-2 px-5 py-2 text-sm font-black transition ${myth === false ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"}`}>
            <Rich text="لا، ليس وحده ✅" />
          </button>
        </div>
      </Lab>
      {myth !== null && (
        <>
          <Verdict
            ok={!myth}
            en="Yesterday, I had visited my grandmother. ❌"
            why={myth ? "انظر الجملة أمامك: أمس (قريب!) وحتى مع ذلك لو قلنا had visited وحده لخطأنا. القِدَم ليس هو المعيار." : "صحيح! هذه الجملة خطأ: ذهبنا أمس فقط — حدث واحد — فلا معنى لـ Past Perfect هنا رغم أنها ماضية."}
          />
          {!myth && (
            <Verdict ok en="Yesterday, I visited my grandmother. ✅" why="حدث واحد في الماضي القريب أو البعيد — Past Simple كافٍ. المعيار هو وجود حدث ماضٍ آخر تقارنه." />
          )}
        </>
      )}
    </div>
  );
}

/** ⑥ The Real Timeline — المسار الزمني الحقيقي. */
function S6_Timeline() {
  const [lens, setLens] = useState<Lens28 | null>(null);
  const events = [
    { en: "woke up", ar: "استيقظ", color: "bg-cyan-500", top: "top-[58%]", role: "event" as Lens28 },
    { en: "left home", ar: "غادر المنزل", color: "bg-orange-500", top: "top-[73%]", role: "event" as Lens28 },
    { en: "arrived at the station", ar: "وصل المحطة", color: "bg-amber-500", top: "top-[86%]", role: "event" as Lens28 },
    { en: "the train had left", ar: "القطار كان قد غادر", color: "bg-violet-600", top: "top-[28%]", role: "flashback" as Lens28 },
  ];
  return (
    <Lab seq="l28-timeline-shop" emoji="🛤️" label="THE REAL TIMELINE" ar="المسار الزمني الحقيقي">
      <div className="grid items-stretch gap-3 sm:grid-cols-[110px_1fr]">
        <div className="relative rounded-3xl border-2 border-indigo-100 bg-gradient-to-b from-slate-50 to-indigo-50/60" style={{ minHeight: 240 }}>
          <div className="absolute left-1/2 top-3 bottom-3 w-1.5 -translate-x-1/2 rounded-full bg-slate-200" />
          <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-lg bg-slate-500 px-1 py-0.5 text-[10px] font-black text-white"><En>EARLIER PAST</En></div>
          <div className="absolute left-1/2 bottom-3 -translate-x-1/2 rounded-lg bg-indigo-700 px-1.5 py-0.5 text-[10px] font-black text-white"><En>NOW</En></div>
          {events.map((ev, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={lens === ev.role && i === 3}
              onClick={() => setLens(ev.role)}
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border-2 px-2 py-1 text-[11px] font-black text-white shadow-sm transition hover:scale-105 ${ev.color} ${ev.top} ${lens && ev.role !== lens ? "opacity-40" : ""}`}
            >
              <En>{ev.en}</En>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {lens === "flashback" ? (
            <>
              <div className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-3 text-center">
                <En className="block text-base font-black text-violet-900">When I arrived at the station, the train had left.</En>
                <div className="text-sm font-bold text-slate-600">عندما وصلت إلى المحطة، كان القطار قد غادر.</div>
              </div>
              <OrderPair first="the train left ⏪ had left" second="I arrived 📸 arrived" note="غادر القطار أولًا، ووصلت أنا ثانيًا." />
            </>
          ) : (
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-4 text-center text-sm font-bold text-slate-500">
              <Rich text="👈 المس النقطة الأعلى على المسار: القطار مغادرًا — ما العلاقة الزمنية بينه وبين وصولي؟" />
            </div>
          )}
          <FormulaStrip items={["الماضي الأقدم", "←", "الحدث الأول", "←", "الحدث الثاني", "←", "الآن"]} tone="indigo" />
        </div>
      </div>
    </Lab>
  );
}

/** ⑦ Switch the Camera — كلمة had تقلب الترتيب كله. */
function S7_Camera() {
  const [sw, setSw] = useState<1 | 2>(1);
  const s = sw === 1
    ? { en: "When I saw Daniel, Maya had left.", ar: "عندما رأيت دانيال، كانت مايا قد غادرت.", first: "Maya left", firstT: "had left — Past Perfect", second: "I saw Daniel", secondT: "saw — Past Simple", ord: "Maya left بعدها الظهور: غادرت مايا قبل أن أرى دانيال." }
    : { en: "When I saw Daniel, Maya left.", ar: "عندما رأيت دانيال، غادرت مايا.", first: "I saw Daniel", firstT: "saw — Past Simple (ترتيبي عادي)", second: "Maya left", secondT: "left — Past Simple (ترتيبي عادي)", ord: "Saw وبعدها Maya left — أعني أن الترتيب يتبع ظهور الجملة: رأيت ثم غادرت." };
  return (
    <div className="space-y-3">
      <Lab seq="l28-maya-switch" emoji="🔀" label="SWITCH THE CAMERA" ar="بدّل الكاميرا">
        <div className="flex justify-center gap-2">
          <button type="button" aria-pressed={sw === 1} onClick={() => setSw(1)} className={`rounded-xl px-4 py-2 text-sm font-black transition ${sw === 1 ? "bg-indigo-700 text-white" : "bg-white text-slate-600 border-2 border-slate-200"}`}>
            <Rich text="① had left" />
          </button>
          <button type="button" aria-pressed={sw === 2} onClick={() => setSw(2)} className={`rounded-xl px-4 py-2 text-sm font-black transition ${sw === 2 ? "bg-orange-500 text-white" : "bg-white text-slate-600 border-2 border-slate-200"}`}>
            <Rich text="② left" />
          </button>
        </div>
        <div className={`mt-2 rounded-2xl border-2 p-3 text-center transition ${sw === 1 ? LENS_META.flashback.soft : LENS_META.event.soft}`}>
          <En className="block text-base font-black">{s.en}</En>
          <div className="text-sm font-bold text-slate-600"><Rich text={s.ar} /></div>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-violet-200 bg-white p-2.5 text-center">
            <div className="text-[11px] font-black text-violet-700"><En>FIRST</En></div>
            <En className="block text-sm font-black text-slate-800">{s.first}</En>
            <div className="text-xs font-bold text-slate-500"><Rich text={s.firstT} /></div>
          </div>
          <div className="rounded-2xl border-2 border-orange-200 bg-white p-2.5 text-center">
            <div className="text-[11px] font-black text-orange-700"><En>SECOND</En></div>
            <En className="block text-sm font-black text-slate-800">{s.second}</En>
            <div className="text-xs font-bold text-slate-500"><Rich text={s.secondT} /></div>
          </div>
        </div>
        <div className="mt-2 rounded-xl bg-white p-2 text-center text-xs font-bold text-slate-600">
          <Rich text={s.ord} />
        </div>
      </Lab>
      {sw === 1 ? (
        <Note emoji="💡" text="القياس: رأيت ثانية. مايا غادرت أولًا. كلمة واحدة صغيرة — had — قلبت ترتيب الحدثين كلهما." />
      ) : (
        <Note emoji="💡" text="بدون had، تعني الجملة بترتيبها العادي في الظهور: رأيت دانيال ثم غادرت مايا." />
      )}
    </div>
  );
}

/** ⑧ The Order Necklace — عقد الترتيب: ابنِ الآلة الزمنية بيدك. */
function S8_Necklace() {
  const beads: { id: string; en: string; ar: string; tone: "sky" | "violet" | "orange" }[] = [
    { id: "saw", en: "I saw my friend Sara", ar: "رأيت صديقتي سارة", tone: "sky" },
    { id: "lost", en: "had lost her necklace", ar: "كانت قد أضاعت عقدها", tone: "violet" },
    { id: "cried", en: "she was crying", ar: "كانت تبكي", tone: "orange" },
  ];
  const [picked, setPicked] = useState<string[]>([]);
  const built = picked.join(" → ");
  const correctOrders = useMemo(
    () => new Set([
      "lost → cried → saw",
      "lost → saw → cried",
    ]),
    []
  );
  const complete = picked.length === 3;
  const isOk = complete && correctOrders.has(built);
  return (
    <div className="space-y-3">
      <SentenceCard roles={R28} parts={[P("When", "conn"), P("I", "s"), P("saw", "v2"), P("my friend Sara", "obj"), P(", she was crying because", "conn"), P("she", "s"), P("had lost", "had"), P("her necklace", "obj")]} ar="عندما رأيتُ صديقتي سارة، كانت تبكي لأنها كانت قد أضاعت عقدها." />
      <Lab seq="l28-necklace" emoji="📿" label="THE ORDER NECKLACE" ar="عقد الترتيب — رتّب الحبات">
        <div className="text-center text-sm font-black text-slate-800">
          <Rich text="أي حدث وقع قبل أي؟ المس الحبات بالترتيب من الأقدم إلى الأحدث:" />
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {beads.map((b) => {
            const idx = picked.indexOf(b.id);
            const tones = { sky: "bg-sky-200 text-sky-900 border-sky-400", violet: "bg-violet-200 text-violet-900 border-violet-400", orange: "bg-orange-200 text-orange-900 border-orange-400" };
            return (
              <button
                key={b.id}
                type="button"
                aria-pressed={idx >= 0}
                onClick={() => setPicked((p) => (idx >= 0 ? p.filter((x) => x !== b.id) : p.length < 3 ? [...p, b.id] : p))}
                className={`rounded-xl border-2 px-3 py-2 text-sm font-black transition ${idx >= 0 ? `${tones[b.tone]} ring-2 ring-indigo-400` : tones[b.tone]} ${idx < 0 && picked.length === 3 ? "opacity-40" : ""}`}
              >
                {idx >= 0 && <span className="font-head me-1 inline-grid h-5 w-5 place-items-center rounded-md bg-white/70 text-[10px]">{idx + 1}</span>}
                <En>{b.en}</En>
                <span className="ms-1.5 text-[11px] font-bold opacity-70"><Rich text={b.ar} /></span>
              </button>
            );
          })}
        </div>
        {complete && (
          <div className={`mt-2 rounded-2xl border-2 p-3 text-center ${isOk ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"}`}>
            <div className={`text-sm font-black ${isOk ? "text-emerald-800" : "text-rose-800"}`}>
              <Rich text={isOk ? "✓ الآلة الزمنية صحيحة!" : "✕ راجع: هل رأيتُ سارة قبل أن تضيع العقد؟"} />
            </div>
            <div className="mt-1 text-xs font-bold text-slate-600">
              <Rich text="١) أضاعت العقد (الأقدم — had lost ⏪) · ٢) كانت تبكي (مستمر — was crying 🎥) · ٣) رأيتها (لقطة تامة — saw 📸)" />
            </div>
          </div>
        )}
        <div className="mt-2 flex justify-center gap-2">
          <button type="button" onClick={() => setPicked([])} className="rounded-xl bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-600 transition hover:bg-slate-200">
            <Rich text="↺ مسح الترتيب" />
          </button>
        </div>
      </Lab>
    </div>
  );
}

/** ⑨ Before Is Not Always — قبل ليست إجبارية دائمًا. */
function S9_BeforeNotAlways() {
  const [a, setA] = useState<1 | 2>(1);
  return (
    <div className="space-y-3">
      <Lab seq="l28-before-lab" emoji="🆓" label="BEFORE FREEDOM LAB" ar="حرية before">
        <div className="grid gap-2 sm:grid-cols-2">
          {[1, 2].map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={a === v}
              onClick={() => setA(v)}
              className={`rounded-2xl border-2 p-3 text-center transition ${a === v ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300" : "border-slate-200 bg-white hover:border-indigo-200"}`}
            >
              <span className="text-xs font-black text-slate-400">{`الجملة ${v}`}</span>
              <En className="mt-1 block text-sm font-black text-slate-800">
                {v === 1 ? "I had eaten dinner before I watched TV." : "I ate dinner before I watched TV."}
              </En>
              <span className="mt-1 block text-xs font-bold text-emerald-700"><Rich text="✓ صحيحة" /></span>
            </button>
          ))}
        </div>
      </Lab>
      <Note emoji="💡" text="تناولت العشاء قبل أن أشاهد التلفاز. — الجملتان ممكنتان!" />
      <Verdict ok en="before نفسها توضّح الترتيب" why="عندما نوجد قبل، يعرف المستمع أيهما جاء أولًا حتى لو استخدمنا Past Simple لهما. لكن Past Perfect شائع وواضح أكثر في الكتابة." />
    </div>
  );
}

/** ⑩ Why We Need Past Perfect — لماذا نحتاجه حقًّا؟ */
function S10_WhyPerfect() {
  const [mode, setMode] = useState<"s" | "p" | null>(null);
  return (
    <div className="space-y-3">
      <Lab seq="l28-why-perfect" emoji="❔" label="WHY PERFECT LAB" ar="قارن وقرر">
        <div className="grid gap-2">
          {[
            { id: "s" as const, en: "The students left before the teacher arrived.", ar: "غادر الطلاب قبل أن يصل المعلم. (بسيط + قبل → مفهوم، لكن الترتيب ضمني)" },
            { id: "p" as const, en: "When the teacher arrived, the students had left.", ar: "عندما وصل المعلم، كان الطلاب قد غادروا. (تام → الأقدم مُعلَّم صراحة!)" },
          ].map((it) => (
            <button
              key={it.id}
              type="button"
              aria-pressed={mode === it.id}
              onClick={() => setMode(it.id)}
              className={`rounded-2xl border-2 p-3 text-start transition ${mode === it.id ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-200"}`}
            >
              <En className="block text-sm font-black text-slate-800">{it.en}</En>
              <div className="mt-0.5 text-xs font-bold text-slate-500"><Rich text={it.ar} /></div>
            </button>
          ))}
        </div>
      </Lab>
      <Note emoji="💡" text="نستخدمه لإبراز أن حدثًا واحدًا كان قبل الآخر بوضوح، ونستخدمه في القصص والشرح والتسلسل الزمني." />
      {mode !== null && (
        <Verdict
          ok
          en={mode === "p" ? "had left ← أقوى إشارة للترتيب ✓" : "left ← يعتمد على before لتوضيح الترتيب ✓"}
          why={mode === "p" ? "Past Perfect يفتّح وعيّك مباشرة إلى أن هذا الحدث هو الأقدم — حتى بدون قبل." : "قبل تنقذ الترتيب حتى مع البسيط — كما تعلّمنا في الخطوة السابقة."}
        />
      )}
    </div>
  );
}

/** ⑪ After the Perfect — بعد التام: الجملتان صحيحتان. */
function S11_AfterAfter() {
  const [choice, setChoice] = useState<1 | 2>(1);
  return (
    <div className="space-y-3">
      <Lab seq="l28-after-lab" emoji="🏁" label="AFTER THE PERFECT" ar="بعد حلول بعد">
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { id: 1 as const, en: "After I had finished my homework, I played a game.", ar: "بعد أن فرغت من واجبي المنزلي، لعبت لعبة. ✓" },
            { id: 2 as const, en: "After I finished my homework, I played a game.", ar: "بعد أن فرغت من واجبي المنزلي، لعبت لعبة. ✓" },
          ].map((it) => (
            <button
              key={it.id}
              type="button"
              aria-pressed={choice === it.id}
              onClick={() => setChoice(it.id)}
              className={`rounded-2xl border-2 p-3 text-center transition ${choice === it.id ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300" : "border-slate-200 bg-white hover:border-indigo-200"}`}
            >
              <En className="block text-sm font-black text-slate-800">{it.en}</En>
              <span className="mt-1 block text-xs font-bold text-emerald-700"><Rich text={it.ar} /></span>
            </button>
          ))}
        </div>
      </Lab>
      <Note emoji="💡" text="الجملتان صحيحتان تمامًا. بعد نفسها تساعد على تحديد الترتيب — لهذا بعد المرنة من أقوى أدواتك الزمنية." />
    </div>
  );
}

/** ⑫ No Magic Words — لا كلمات سحرية. */
function S12_NoMagic() {
  const [bust, setBust] = useState<0 | 1 | 2 | null>(null);
  return (
    <div className="space-y-3">
      <Lab seq="l28-rule-lab" emoji="🪄" label="NO MAGIC WORDS" ar="لا كلمات سحرية">
        <div className="text-center text-sm font-black text-slate-800">
          <Rich text="المس أي «قاعدة» لكسرها إن كانت زائفة:" />
        </div>
        <div className="mt-2 space-y-1.5">
          {[
            { id: 0 as const, claim: "before = لازم Past Perfect", ok: false, why: "قبل توضّح الترتيب وحدها — Past Simple ممكن معها (وقد رأينا: I ate dinner before I watched TV. ✓)" },
            { id: 1 as const, claim: "after = لازم Past Perfect", ok: false, why: "بعد أيضًا توضّح الترتيب وحدها — After I finished… ✓" },
            { id: 2 as const, claim: "لا تسأل عن الكلمة، اسأل: ما علاقة الحدثين؟", ok: true, why: "نعم! العلاقة الزمنية بين الأحداث — لا الكلمة وحدها — هي التي تختار الزمن." },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={bust === c.id}
              onClick={() => setBust(c.id)}
              className={`w-full rounded-2xl border-2 p-3 text-start text-sm font-black transition ${bust === c.id ? (c.ok ? "border-emerald-400 bg-emerald-50 text-emerald-900" : "border-rose-400 bg-rose-50 text-rose-900") : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{bust === c.id ? (c.ok ? "✅" : "💥") : "🪄"}</span>
                <Rich text={c.claim} />
              </div>
              {bust === c.id && <div className="mt-1 text-xs font-bold opacity-90"><Rich text={c.why} /></div>}
            </button>
          ))}
        </div>
      </Lab>
      <Note emoji="💡" text="قبل وبعد ليستا كلمات سحرية تفرضان الزمن — الفارق الحقيقي هو العلاقة الزمنية بين الأحداث." />
    </div>
  );
}

/** ⑬ By the Time — بحلول الوقت. */
function S13_ByTime() {
  const [scene, setScene] = useState<0 | 1>(0);
  const scenes = [
    { en: "By the time we arrived at the cinema, the movie had already started.", ar: "بحلول وصولنا إلى السينما، كان الفيلم قد بدأ مسبقًا.", older: "started the movie", newer: "we arrived", adj: "already = مسبقًا/أيضًا بالفعل" },
    { en: "By the time the firemen came, the fire had destroyed most of the house.", ar: "بحلول وصول رجال الإطفاء، كان الحريق قد دمّر معظم المنزل.", older: "the fire destroyed", newer: "the firemen came", adj: "تدمير مسبق — حدث سابق وقضى قبل الوصول" },
  ];
  return (
    <div className="space-y-3">
      <Lab seq="l28-bytime" emoji="⏰" label="BY THE TIME LAB" ar="مختبر بحلول الوقت">
        <div className="flex justify-center gap-2">
          {scenes.map((_, i) => (
            <button key={i} type="button" aria-pressed={scene === i} onClick={() => setScene(i as 0 | 1)} className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-black transition ${scene === i ? "bg-indigo-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}>
              {String.fromCharCode(65 + i)}
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-indigo-300 bg-indigo-50 p-3 text-center">
          <En className="block text-base font-black text-indigo-900">{scenes[scene].en}</En>
          <div className="mt-1 text-sm font-bold text-slate-600"><Rich text={scenes[scene].ar} /></div>
        </div>
        <OrderPair first={scenes[scene].older} second={scenes[scene].newer} />
        <div className="rounded-xl bg-white p-2 text-center text-xs font-bold text-slate-600">
          <Rich text={scenes[scene].adj} />
        </div>
      </Lab>
    </div>
  );
}

/** ⑭ Already in the Perfect — already تعني مسبقًا. */
function S14_Already() {
  const [adv, setAdv] = useState<"already" | "just" | "never" | null>(null);
  const meta = {
    already: { en: "had already finished — كان قد انتهى مسبقًا", why: "already = مسبقًا. يتموضع بين had والتصريف الثالث." },
    just: { en: "had just finished — للتو انتهى", why: "just = للتو. أيضًا بين had وV3." },
    never: { en: "had never finished — لم يكن قد أنهى مطلقًا", why: "never = مطلقًا. تنفي الاكتمال قبل نقطة الزمن." },
  } as const;
  return (
    <div className="space-y-3">
      <Lab seq="l28-already" emoji="✅" label="ALREADY LAB" ar="المسرع الزمني">
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
          <En className="block text-base font-black text-indigo-900">The teacher asked him to explain the rule, but he had already finished the exercise.</En>
          <div className="mt-1 text-sm font-bold text-slate-600">طلب منه المعلم أن يشرح القاعدة، لكنه كان قد أنهى التمرين مسبقًا.</div>
        </div>
        <OrderPair first="finished the exercise ⏪" second="the teacher asked 📸" />
        <div className="mt-1 text-center text-sm font-black text-slate-800">
          <Rich text="بدّل الظرف وشاهد أثره على المعنى:" />
        </div>
        <div className="flex justify-center gap-2">
          {(["already", "just", "never"] as const).map((k) => (
            <button key={k} type="button" aria-pressed={adv === k} onClick={() => setAdv(k)} className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${adv === k ? "border-indigo-400 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200"}`}>
              <En>{k}</En>
            </button>
          ))}
        </div>
        {adv && (
          <div className="mt-1 rounded-xl bg-white p-2 text-center text-xs font-bold text-slate-700">
            <En className="font-black text-indigo-800">{meta[adv].en}</En>
            <div><Rich text={meta[adv].why} /></div>
          </div>
        )}
      </Lab>
      <Note emoji="💡" text="already ليست للحاضر التام فقط — تعمل داخل Past Perfect أيضًا." />
    </div>
  );
}

/** ⑮ Just in the Perfect — just تعني للتو. */
function S15_Just() {
  const [near, setNear] = useState<boolean | null>(null);
  return (
    <div className="space-y-3">
      <Lab seq="l28-just" emoji="⚡" label="JUST LAB" ar="للتو — القرب الزمني">
        <div className="rounded-2xl border-2 border-cyan-200 bg-cyan-50 p-3 text-center">
          <En className="block text-base font-black text-cyan-900">When I saw my grandmother, she had just arrived from the airport.</En>
          <div className="mt-1 text-sm font-bold text-slate-600">عندما رأيت جدتي، كانت قد وصلت للتو من المطار.</div>
        </div>
        <OrderPair first="arrived from the airport ⏪ للتو" second="I saw my grandmother 📸" />
        <div className="mt-1 text-center text-sm font-black text-slate-800">
          <Rich text="هل يشير just إلى حدث وقع «قبل الحدث الثاني بقليل»؟" />
        </div>
        <div className="flex justify-center gap-2">
          {[true, false].map((v) => (
            <button key={String(v)} type="button" aria-pressed={near === v} onClick={() => setNear(v)} className={`rounded-xl border-2 px-5 py-2 text-sm font-black transition ${near === v ? (v ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-rose-300 bg-rose-50 text-rose-800") : "border-slate-200 bg-white text-slate-600"}`}>
              <Rich text={v ? "نعم — قرب زمني ✓" : "لا — قبل كثير"} />
            </button>
          ))}
        </div>
        {near !== null && (
          <div className={`mt-1 rounded-xl p-2 text-center text-xs font-bold ${near ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-200" : "bg-rose-50 text-rose-800 border-2 border-rose-200"}`}>
            <Rich text={near ? "✓ تمامًا — had just arrived تعني أن وصولها كان قبل ثوانٍ أو دقائق من رؤيتي." : "✕ just = للتو — هي كلمة قرب زمني، لا بعد زمني."} />
          </div>
        )}
      </Lab>
    </div>
  );
}

// ---------------- القسم ٢: ثلاثة أزمنة على المسرح ذاته (s16–s20) ----------------

/** ⑯ PS + PP Together — شريكا الجملة. */
function S16_PsPlusPp() {
  const examples = [
    { en: "I washed the dishes because I had promised the cook.", ar: "غسلت الأطباق لأنني كنت قد وعدت الطبّاخ.", parts: [[["I", "s"], ["washed", "v2"], ["the dishes", "obj"], ["because", "conn"], ["I", "s"], ["had promised", "had"], ["the cook", "obj"]]] as string[][][], order: ["promised the cook ⏪", "washed the dishes 📸"] },
    { en: "He couldn't enter the house because he had forgotten the key.", ar: "لم يستطع دخول المنزل لأنه كان قد نسي المفتاح.", parts: [[["He", "s"], ["couldn't", "v2"], ["enter", "v2"], ["the house", "obj"], ["because", "conn"], ["he", "s"], ["had forgotten", "had"], ["the key", "obj"]]] as string[][][], order: ["forgotten the key ⏪", "couldn't enter 📸"] },
  ];
  const [ex, setEx] = useState(0);
  return (
    <div className="space-y-3">
      <Lab seq="l28-ps-plus-pp" emoji="🤝" label="PARTNERS LAB" ar="الشريكان معًا">
        <div className="flex justify-center gap-2">
          {examples.map((_, i) => (
            <button key={i} type="button" aria-pressed={ex === i} onClick={() => setEx(i)} className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-black transition ${ex === i ? "bg-indigo-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </Lab>
      <SentenceCard roles={R28} parts={examples[ex].parts[0].map(([t, r]) => P(t, r))} ar={examples[ex].ar} />
      <div className="grid gap-1.5 sm:grid-cols-2">
        <TrackBar label={<En>{examples[ex].order[0].split("⏪")[0].trim()}</En>} color="bg-violet-500" width="38%" />
        <TrackBar label={<En>{examples[ex].order[1].split("📸")[0].trim()}</En>} color="bg-orange-400" width="74%" />
      </div>
      <OrderPair first={examples[ex].order[0]} second={examples[ex].order[1]} />
      <Note emoji="💡" text="في الجملتين يعمل Past Simple للحدث الثاني (اللحظة) وPast Perfect للسبب الأقدم — بفضل because ترتبطان سببيًّا زمنيًّا." />
    </div>
  );
}

/** ⑰ Three Tenses One Scene — مسرح واحد ثلاث أزمنة. */
function S17_ThreeTensesIntro() {
  const rows: { lens: Lens28; en: string; ar: string }[] = [
    { lens: "event", en: "Past Simple — finished action", ar: "ماذا حدث؟ — حدث تام وانتهى" },
    { lens: "progress", en: "Past Continuous — ongoing action", ar: "ماذا كان يحدث؟ — مشهد مستمر" },
    { lens: "flashback", en: "Past Perfect — earlier action", ar: "ماذا كان قد حدث قبل ذلك؟ — فلاش باك أقدم" },
  ];
  const [lens, setLens] = useState<Lens28>("event");
  return (
    <Lab seq="l28-three-tense" emoji="🎭" label="THREE QUESTIONS" ar="ثلاثة أسئلة = ثلاثة أزمنة">
      <div className="flex justify-center gap-2">
        {(["event", "progress", "flashback"] as Lens28[]).map((t) => (
          <button key={t} type="button" aria-pressed={lens === t} onClick={() => setLens(t)} className={`rounded-xl px-3 py-1.5 text-sm font-black transition ${lens === t ? LENS_META[t].chip : "bg-white text-slate-600 border-2 border-slate-200"}`}>
            <TenseChip tense={t} />
          </button>
        ))}
      </div>
      <div className={`mt-2 rounded-2xl border-2 p-3 text-center ${LENS_META[lens].soft}`}>
        <En className="block text-base font-black">{rows.find((r) => r.lens === lens)!.en}</En>
        <div className="text-sm font-bold text-slate-600"><Rich text={rows.find((r) => r.lens === lens)!.ar} /></div>
      </div>
      <div className="rounded-xl bg-white p-2 text-center text-xs font-bold text-slate-600">
        <Rich text="اسأل الأسئلة الثلاثة بالترتيب عن أي مشهد ماضٍ: ماذا حدث؟ ← ماذا كان يحدث؟ ← ماذا كان قد حدث قبل ذلك؟ أزمنتك الثلاثة ستكتشف نفسها." />
      </div>
    </Lab>
  );
}

/** ⑱ The Wallet Scene — مشهد المحفظة بطبقاته الثلاث. */
function S18_WalletLayers() {
  const scene = [
    { en: "The children were playing in the yard.", ar: "كان الأولاد يلعبون في الساحة.", lens: "progress" as Lens28, note: "لقطة مستمرة — Past Continuous: were playing" },
    { en: "They found their old friend in the garden.", ar: "وجدوا صديقهم القديم في الحديقة.", lens: "event" as Lens28, note: "حدث تام وانتهى — Past Simple: found" },
    { en: "Someone had dropped a wallet in the grass.", ar: "كان أحدهم قد أسقط محفظة على العشب.", lens: "flashback" as Lens28, note: "حدث أقدم — Past Perfect: had dropped" },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <Lab seq="l28-wallet-layers" emoji="👛" label="THE WALLET SCENE" ar="مشهد المحفظة">
        <div className="space-y-1.5">
          {scene.map((s, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white">
              <button
                type="button"
                aria-pressed={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center gap-2 px-3 py-2.5"
              >
                <span className={`rounded-lg px-2 py-1 text-[10px] font-black ${LENS_META[s.lens].chip}`}>{LENS_META[s.lens].tag}</span>
                <En className="flex-1 text-sm font-black text-slate-800">{s.en}</En>
                <span className={`text-xs transition ${open === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              {open === i && (
                <div className={`mx-2 mb-2 rounded-xl border-2 p-2.5 ${LENS_META[s.lens].soft}`}>
                  <div className="text-sm font-bold"><Rich text={s.ar} /></div>
                  <div className="mt-0.5 text-xs font-bold text-slate-500"><Rich text={s.note} /></div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-xl bg-indigo-50 p-2 text-center text-xs font-bold text-indigo-900">
          <Rich text="مشهد واحد لكن ثلاثة أزمنة: 🎥 مستمر خلفية · 📸 تام قصير · ⏪ تام أقدم مسبق — ترتيب زمني متعدد الطبقات." />
        </div>
      </Lab>
    </div>
  );
}

/** ⑲ The Station — المحطة بثلاث كاميرات. */
function S19_Station() {
  const shots = [
    { en: "When the passengers arrived at the station, the train was standing there.", ar: "عندما وصل المسافرون إلى المحطة، كان القطار واقفًا هناك.", lens: "progress" as Lens28 },
    { en: "The rain had stopped, but the sky was still gray.", ar: "كان المطر قد توقف، لكن السماء كانت ما تزال رمادية.", lens: "flashback" as Lens28 },
    { en: "I took my ticket and hurried to the platform.", ar: "أخذت تذكرتي وأسرعت إلى الرصيف.", lens: "event" as Lens28 },
  ];
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <Lab seq="l28-station" emoji="🚉" label="THE STATION" ar="مشهد المحطة — ثلاث لقطات">
        <div className="space-y-1.5">
          {shots.map((s, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={pick === i}
              onClick={() => setPick(i)}
              className={`w-full rounded-2xl border-2 p-2.5 text-start transition ${pick === i ? `border-2 ${LENS_META[s.lens].ring} ${LENS_META[s.lens].soft}` : "border-slate-100 bg-white hover:border-indigo-200"}`}
            >
              <En className="block text-sm font-black text-slate-800">{s.en}</En>
              {pick === i && (
                <div className="mt-1 text-xs font-bold text-slate-600"><Rich text={s.ar} /></div>
              )}
            </button>
          ))}
        </div>
      </Lab>
      {pick !== null && (
        <div className={`rounded-2xl border-2 p-2.5 ${LENS_META[shots[pick].lens].soft}`}>
          <TenseChip tense={shots[pick].lens} />
          {pick === 0 && <div className="mt-1 text-xs font-bold text-slate-600"><Rich text="🎥 واقفًا = مشهد ضمن الحدث الأكبر — Past Continuous." /></div>}
          {pick === 1 && <div className="mt-1 text-xs font-bold text-slate-600"><Rich text="⏪ توقف المطر قبل أن تصل الكاميرا — Past Perfect داخل سرد مستمر." /></div>}
          {pick === 2 && <div className="mt-1 text-xs font-bold text-slate-600"><Rich text="📸 took و hurried لقطتان متتاليتان — Past Simple + Past Simple." /></div>}
        </div>
      )}
    </div>
  );
}

/** ⑳ The Time Machine — آلة الزمن: ثلاث بطاقات وجملة إيما. */
function S20_TimeMachine() {
  const bags = [
    { q: "ماذا حدث؟", en: "Emma entered the kitchen.", ar: "دخلت إيما إلى المطبخ.", lens: "event" as Lens28, t: "Past Simple" },
    { q: "ماذا كان يحدث؟", en: "Her brother was making breakfast.", ar: "كان أخوها يصنع الفطور.", lens: "progress" as Lens28, t: "Past Continuous" },
    { q: "ماذا كان قد حدث قبل ذلك؟", en: "He had already prepared the coffee.", ar: "كان قد جهّز القهوة مسبقًا.", lens: "flashback" as Lens28, t: "Past Perfect" },
  ];
  const [eye, setEye] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <Lab seq="l28-time-machine" emoji="🕰️" label="THE TIME MACHINE" ar="آلة الزمن — المطبخ">
        <div className="grid gap-1.5 sm:grid-cols-3">
          {bags.map((b, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={eye === i}
              onClick={() => setEye(eye === i ? null : i)}
              className={`rounded-2xl border-2 p-2.5 text-center transition ${eye === i ? `${LENS_META[b.lens].soft} ring-2 ${LENS_META[b.lens].ring}` : "border-slate-100 bg-white hover:border-indigo-200"}`}
            >
              <div className={`mx-auto w-fit rounded-lg px-2 py-0.5 text-[10px] font-black ${LENS_META[b.lens].chip}`}>{LENS_META[b.lens].tag}</div>
              <div className="mt-1 text-sm font-black text-slate-800"><Rich text={b.q} /></div>
              <En className="mt-1 block text-[11px] font-bold text-slate-500">{b.t}</En>
            </button>
          ))}
        </div>
        {eye !== null && (
          <div className={`mt-2 rounded-2xl border-2 p-3 text-center ${LENS_META[bags[eye].lens].soft}`}>
            <En className="block text-base font-black">{bags[eye].en}</En>
            <div className="text-sm font-bold text-slate-600"><Rich text={bags[eye].ar} /></div>
          </div>
        )}
        <div className="mt-2 rounded-xl bg-white p-2 text-center">
          <En className="block text-sm font-black text-indigo-900">Emma entered the kitchen. Her brother was making breakfast. She realized that he had already prepared the coffee.</En>
          <div className="mt-0.5 text-xs font-bold text-slate-500"><Rich text="دخلت إيما المطبخ → أخوها مستمر في صنع الفطور → أدركت أنه جهّز القهوة (أقدم). مشهد واحد مكتمل!" /></div>
        </div>
      </Lab>
    </div>
  );
}

// ---------------- القسم ٣: عيادة الأخطاء (s21–s25) ----------------

/** بطاقة خطأ واحدة: جملة خاطئة يُنقر موضع الخطأ فيها + تصحيح + سلسلة التصريفات. */
function ErrorClinic({
  seq,
  title,
  wrong,
  segments,
  wrongIdx,
  fixed,
  reason,
  chain,
  extra,
}: {
  seq: string;
  title: string;
  wrong: string;
  segments: string[];
  wrongIdx: number;
  fixed: string;
  reason: string;
  chain?: string[];
  extra?: ReactNode;
}) {
  const [hit, setHit] = useState<number | null>(null);
  const solved = hit === wrongIdx;
  return (
    <div className="space-y-3">
      <Lab seq={seq} emoji="🩺" label="ERROR CLINIC" ar={title}>
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
          <div className="text-center text-sm font-black text-rose-800"><Rich text="الجملة الخاطئة — المس موضع الخطأ:" /></div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {segments.map((seg, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={hit === i}
                onClick={() => setHit(i)}
                className={`rounded-lg border-2 px-2 py-1.5 text-sm font-black transition ${hit === null ? "border-rose-100 bg-white text-rose-900 shadow-sm hover:border-indigo-300" : hit === i ? (solved ? "border-emerald-400 bg-emerald-50 text-emerald-900" : "border-slate-300 bg-slate-100 text-slate-500 line-through") : "border-rose-100 bg-white/70 text-rose-900/60"}`}
              >
                <En>{seg}</En>
              </button>
            ))}
            <span className="self-center text-lg">❌</span>
          </div>
          {hit !== null && !solved && (
            <div className="mt-2 text-center text-xs font-bold text-rose-600">
              <Rich text="ليست هنا — ابحث عن الفعل داخل had." />
            </div>
          )}
        </div>
        {solved && (
          <>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3">
              <En className="text-base font-black text-emerald-900">{fixed}</En>
              <span className="text-lg">✅</span>
            </div>
            {chain && (
              <div className="mt-2">
                <FormulaStrip items={chain} tone="indigo" />
              </div>
            )}
            <div className="mt-2 rounded-xl bg-white p-2 text-center text-xs font-bold text-slate-600">
              <Rich text={reason} />
            </div>
          </>
        )}
      </Lab>
      {extra}
    </div>
  );
}

/** ㉑ خطأ went داخل had. */
function S21_ErrWent() {
  return (
    <ErrorClinic
      seq="l28-err-went"
      title="I had went. / She had went."
      wrong="I had went."
      segments={["I", "had", "went", "."]}
      wrongIdx={2}
      fixed="I had gone."
      reason="مع had يجب أن يأتي بعده التصريف الثالث: go → went → gone. استخدام التصريف الثاني went بعد had خطأ شائع!"
      chain={["had", "+", "V3", "·", "go", "→", "went", "→", "gone"]}
    />
  );
}

/** ㉒ خطأ ate داخل had. */
function S22_ErrAte() {
  return (
    <ErrorClinic
      seq="l28-err-ate"
      title="She had ate."
      wrong="She had ate."
      segments={["She", "had", "ate", "."]}
      wrongIdx={2}
      fixed="She had eaten."
      reason="مع had يأتي التصريف الثالث — eaten، لا ate. تصريفات eat: eat → ate → eaten."
      chain={["eat", "→", "ate", "→", "eaten", "·", "had", "+", "eaten"]}
    />
  );
}

/** ㉓ خطأ saw داخل had. */
function S23_ErrSaw() {
  return (
    <ErrorClinic
      seq="l28-err-saw"
      title="They had saw the movie."
      wrong="They had saw the movie."
      segments={["They", "had", "saw", "the movie", "."]}
      wrongIdx={2}
      fixed="They had seen the movie."
      reason="had + سمعت/رأيت؟ الصورة الصحيحة: had + seen. التصريف الثالث لـ see هو seen."
      chain={["see", "→", "saw", "→", "seen", "·", "had", "+", "seen"]}
    />
  );
}

/** ㉔ خطأ Did you had. */
function S24_ErrDid() {
  return (
    <ErrorClinic
      seq="l28-err-did"
      title="Did you had finished?"
      wrong="Did you had finished?"
      segments={["Did", "you", "had", "finished", "?"]}
      wrongIdx={2}
      fixed="Had you finished?"
      reason="ترتيب السؤال مع Past Perfect يقدّم had قبل الفاعل: Had you finished? لا تخلط Did مع had — خطآن في سؤال واحد!"
      chain={["Had", "+", "subject", "+", "V3", "؟"]}
    />
  );
}

/** ㉕ خطأ didn't had. */
function S25_ErrDidnt() {
  return (
    <ErrorClinic
      seq="l28-err-didnt"
      title="He didn't had finished."
      wrong="He didn't had finished."
      segments={["He", "didn't", "had", "finished", "."]}
      wrongIdx={2}
      fixed="He hadn't finished."
      reason="النفي مع Past Perfect: hadn't + التصريف الثالث. لا لماذا ولا إيجاد — had نفسه يجمع النفي: had → hadn't."
      chain={["hadn't", "+", "V3", "·", "No", "didn't", "!"]}
    />
  );
}

// ---------------- القسم ٤: التفكير الزمني — مثل IQ (s26–s29) ----------------

/** ㉖ Think Like IQ — ثلاث حالات في مسرح واحد. */
function S26_Cases3() {
  const cases = [
    {
      id: "A",
      en: "The children were tired because they had played all day.",
      ar: "كان الأولاد متعبين لأنهم كانوا قد لعبوا طوال اليوم.",
      timeline: [["played all day ⏪ (السبب الأقدم)", "were tired 📸 (النتيجة)"]] as string[][],
      verdict: "اللعب قبل التعب — had played للفلاش باك، were tired للنتيجة.",
      lens: "flashback" as Lens28,
    },
    {
      id: "B",
      en: 'When the teacher said "quiz", I realized that I had not studied well.',
      ar: 'عندما قال المعلم "اختبار"، أدركت أنني لم أكن قد استعدّيت جيدًا.',
      timeline: [["had not studied ⏪", "said 📸", "realized 📸"]] as string[][],
      verdict: "عدم الاستعداد أقدم — realized أنك تتذكر السابق.",
      lens: "flashback" as Lens28,
    },
    {
      id: "C",
      en: "The baby was crying because he was hungry.",
      ar: "كان الطفل يبكي لأنه كان جائعًا.",
      timeline: [["was crying 🎥", "was hungry 🎥"]] as string[][],
      verdict: "الفعلان مستمران في اللحظة نفسها — لا حاجة إلى الماضي التام هنا.",
      lens: "progress" as Lens28,
    },
  ];
  const [c, setC] = useState(0);
  return (
    <div className="space-y-3">
      <Lab seq="l28-cases3" emoji="🧠" label="THINK LIKE IQ" ar="فكر مثل IQ — ثلاث حالات">
        <div className="flex justify-center gap-2">
          {cases.map((_, i) => (
            <button key={i} type="button" aria-pressed={c === i} onClick={() => setC(i)} className={`rounded-xl px-4 py-2 text-sm font-black transition ${c === i ? "bg-indigo-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}>
              {String.fromCharCode(65 + i)}
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
          <En className="block text-base font-black text-indigo-950">{cases[c].en}</En>
          <div className="mt-1 text-sm font-bold text-slate-600"><Rich text={cases[c].ar} /></div>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          {cases[c].timeline[0].map((step, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-400">←</span>}
              <span className="rounded-xl border-2 border-indigo-200 bg-white px-2.5 py-1 text-xs font-black text-indigo-900"><Rich text={step} /></span>
            </span>
          ))}
        </div>
        <div className="mt-2 rounded-xl bg-white p-2 text-center text-xs font-bold text-slate-700">
          <Rich text={cases[c].verdict} />
        </div>
      </Lab>
      <Note emoji="💡" text="اسأل ثلاثة أسئلة: كم حدثًا؟ أيهما أقدم؟ ماذا نريد أن نشدّد؟ أجبت الثلاثة → تُبنى الجملة بلا تردد." />
    </div>
  );
}

/** ㉗ Sequence + Backref — تسلسل ثم فلاش باك داخل الجملة نفسها. */
function S27_SeqBackref() {
  const [seg, setSeg] = useState<number | null>(null);
  const segs = [
    { en: "I ate dinner,", ar: "تناولت العشاء،", t: "Past Simple — حدث", lens: "event" as Lens28 },
    { en: "watched TV,", ar: "شاهدت التلفاز،", t: "Past Simple — حدث متتالٍ", lens: "event" as Lens28 },
    { en: "and remembered that I had forgotten my notebook.", ar: "وتذكرت أنني نسيت دفتري.", t: "Past Simple للتذكر + Past Perfect للحدث الأقدم (had forgotten)", lens: "flashback" as Lens28 },
  ];
  return (
    <div className="space-y-3">
      <Lab seq="l28-sequence-backref" emoji="🧵" label="SEQUENCE + BACKREF" ar="تسلسل ثم استرجاع">
        <div className="space-y-1.5">
          {segs.map((s, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={seg === i}
              onClick={() => setSeg(i)}
              className={`w-full rounded-2xl border-2 p-2.5 text-start transition ${seg === i ? `${LENS_META[s.lens].soft} ring-2 ${LENS_META[s.lens].ring}` : "border-slate-100 bg-white hover:border-indigo-200"}`}
            >
              <div className="flex items-center gap-2">
                <span className={`rounded-lg px-2 py-0.5 text-[10px] font-black ${LENS_META[s.lens].chip}`}>{LENS_META[s.lens].tag}</span>
                <En className="text-sm font-black text-slate-800">{s.en}</En>
              </div>
              {seg === i && (
                <div className="mt-1 text-xs font-bold text-slate-600">
                  <Rich text={`${s.ar} ← ${s.t}`} />
                </div>
              )}
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-xl bg-indigo-50 p-2 text-center text-xs font-bold text-indigo-900">
          <Rich text="تناولت العشاء، شاهدت التلفاز، ثم تذكرت أنني نسيت دفتري — تسلسل Past Simple + فلاش باك Past Perfect في جملة واحدة." />
        </div>
      </Lab>
    </div>
  );
}

/** ㉘ The Step Back — الخطوة إلى الوراء تعني التام؟ لا — تعني الترتيب! */
function S28_StepBack() {
  const [ans, setAns] = useState<boolean | null>(null);
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <div className="text-center text-sm font-black text-indigo-900">
          <Rich text="كم مرة قلنا الحقيقة هذه؟ المس لتذكر:" />
        </div>
        <FormulaStrip items={["Past Perfect", "=", "not", '"a step backward"', "but", "ordered time"]} tone="violet" />
        <Note emoji="💡" text="ليس خطوة نحو الوراء في الزمن «لذاتها» — بل لأن الجملة لدينا فيها two events نرتّب بينهما." />
      </div>
      <Lab seq="l28-step-back" emoji="🔙" label="THE STEP BACK" ar="اختبر الفكرة">
        <div className="text-center text-sm font-black text-slate-800">
          <Rich text="الجملة: I slept yesterday at 10. هل نحتاج Past Perfect؟" />
        </div>
        <div className="flex justify-center gap-2">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              type="button"
              aria-pressed={ans === v}
              onClick={() => setAns(v)}
              className={`rounded-xl border-2 px-5 py-2 text-sm font-black transition ${ans === v ? (v ? "border-rose-400 bg-rose-50 text-rose-800" : "border-emerald-400 bg-emerald-50 text-emerald-800") : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200"}`}
            >
              <Rich text={v ? "نعم — حدث قديم" : "لا — حدث واحد فقط"} />
            </button>
          ))}
        </div>
        {ans !== null && (
          <div className={`mt-2 rounded-xl border-2 p-2.5 text-center text-sm font-bold ${ans ? "border-rose-200 bg-rose-50 text-rose-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>
            <Rich text={ans ? "✕ نمت بالأمس — حدث واحد! لا فرق زمني بينه وبين حدث ثانٍ، إذن slept كافٍ." : "✓ بالضبط — I slept yesterday at 10. لا حدث آخر → Past Simple. القِدَم ليس مقياسًا!" } />
          </div>
        )}
      </Lab>
    </div>
  );
}

/** ㉙ The Cave Detective — محقق الكهف: ثمانية أفعال، صنّفها. */
function S29_CaveDetective() {
  const verbs: { v: string; t: Lens28; note: string }[] = [
    { v: "walked", t: "event", note: "مشوا — حدث تام قصير" },
    { v: "were walking", t: "progress", note: "كانوا ما يزالون يمشون — مشهد مستمر" },
    { v: "found", t: "event", note: "وجدوا — لقطة تامة" },
    { v: "left", t: "event", note: "(الجواب) ترك — لقطة تامة في القصة" },
    { v: "had never seen", t: "flashback", note: "لم يروا شيئًا كان قبل الوصول — فلاش باك + never" },
    { v: "sat", t: "event", note: "جلسوا — لقطة تامة" },
    { v: "were thinking", t: "progress", note: "كانوا يفكرون — مستمر أثناء الجلوس" },
    { v: "had fallen", t: "flashback", note: "كان قد سقط قبل أن يجدوه — فلاش باك" },
  ];
  const [ans, setAns] = useState<(Lens28 | null)[]>(() => verbs.map(() => null));
  const done = ans.every((a) => a !== null);
  const correct = verbs.filter((v, i) => ans[i] === v.t).length;
  return (
    <Lab seq="l28-cave-detective" emoji="🕵️" label="THE CAVE DETECTIVE" ar="محقق الكهف — صنّف الأفعال">
      <div className="rounded-2xl border-2 border-slate-100 bg-white p-3">
        <En className="block text-center text-sm font-black text-slate-800">My friend and I walked to the cave yesterday. When we arrived, we found a strange box. It had fallen near the rocks. We sat down and were thinking about it. I had never seen anything like it before.</En>
        <div className="mt-1 text-center text-xs font-bold text-slate-500">
          <Rich text="مشيت أنا وصديقي إلى الكهف أمس. عندما وصلنا، وجدنا صندوقًا غريبًا. كان قد سقط قرب الصخور. جلسنا وكنا نفكر فيه. لم أكن قد رأيت شيئًا مثله من قبل." />
        </div>
      </div>
      <div className="mt-2 space-y-1.5">
        {verbs.map((vb, i) => (
          <div key={vb.v} className={`rounded-2xl border-2 p-2 transition ${ans[i] === null ? "border-slate-100 bg-white" : ans[i] === vb.t ? "border-emerald-200 bg-emerald-50/60" : "border-rose-200 bg-rose-50/60"}`}>
            <div className="flex flex-wrap items-center gap-1.5">
              <En className="me-1 font-black text-indigo-900">{vb.v}</En>
              {(["event", "progress", "flashback"] as Lens28[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={ans[i] === t}
                  onClick={() => setAns((a) => a.map((x, j) => (j === i ? t : x)))}
                  className={`rounded-lg px-2 py-0.5 text-[11px] font-black transition ${ans[i] === t ? LENS_META[t].chip : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                >
                  <Rich text={t === "event" ? "📸 بسيط" : t === "progress" ? "🎥 مستمر" : "⏪ تام"} />
                </button>
              ))}
              {ans[i] !== null && (
                <span className={`text-[11px] font-black ${ans[i] === vb.t ? "text-emerald-700" : "text-rose-700"}`}>
                  <Rich text={ans[i] === vb.t ? `✓ ${vb.note}` : `✕ الصواب: ${vb.note}`} />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {done && (
        <div className={`mt-2 rounded-2xl border-2 p-3 text-center text-sm font-black ${correct >= 7 ? "border-emerald-300 bg-emerald-50 text-emerald-800" : correct >= 5 ? "border-amber-300 bg-amber-50 text-amber-800" : "border-rose-300 bg-rose-50 text-rose-700"}`}>
          <Rich text={correct >= 7 ? `🕵️ عقل محقق: ${correct}/8 — المسار الزمني واضح في رأسك!` : correct >= 5 ? `${correct}/8 — جيّد، راجع الألوان في المشهد.` : `${correct}/8 — أعد قراءة المشهد ببطء: الحدث التام ثم المستمر ثم الأقدم.`} />
        </div>
      )}
    </Lab>
  );
}

// ---------------- تدريبات المصدر (s30–s35) ----------------

/** صف اختيار فوري: خياران (أو أكثر) مع سبب مباشر — لا يشبه الاختبار النهائي. */
function InstantRow({
  n,
  stem,
  opts,
  answerIdx,
  why,
  onDone,
}: {
  n: number;
  stem: string;
  opts: string[];
  answerIdx: number;
  why: string;
  onDone: (ok: boolean) => void;
}) {
  const [pick, setPick] = useState<number | null>(null);
  const answered = pick !== null;
  const right = answered && pick === answerIdx;
  const stemSplit = stem.split("______");
  return (
    <div className={`rounded-2xl border-2 p-3 transition ${answered ? (right ? "border-emerald-300 bg-emerald-50/70" : "border-rose-300 bg-rose-50/70") : "border-slate-100 bg-white"}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className={`font-head grid h-7 w-7 place-items-center rounded-lg text-sm font-bold ${answered ? (right ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "bg-indigo-700 text-white"}`}>
          {answered ? (right ? "✓" : "✕") : n}
        </span>
        <En className="text-sm font-black text-slate-800">
          {stemSplit[0]}
          <span className={`mx-1 inline-block min-w-16 rounded-lg border-2 px-1 text-center ${answered ? (right ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-rose-300 bg-rose-100 text-rose-800") : "border-dashed border-indigo-300 bg-indigo-50 text-indigo-500"}`}>
            {answered ? opts[pick!] : "؟"}
          </span>
          {stemSplit[1] ?? ""}
        </En>
      </div>
      <div className="ms-9 flex flex-wrap gap-2">
        {opts.map((opt, i) => (
          <button
            key={opt + i}
            type="button"
            aria-pressed={pick === i}
            onClick={() => { if (answered) return; setPick(i); onDone(i === answerIdx); }}
            className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${answered ? (i === answerIdx ? "border-emerald-300 bg-emerald-50 text-emerald-900" : pick === i ? "border-rose-300 bg-rose-50 text-rose-700 line-through" : "border-slate-100 bg-white text-slate-400") : pick === i ? "border-indigo-400 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"}`}
          >
            <En>{opt}</En>
          </button>
        ))}
      </div>
      {answered && (
        <div className={`ms-9 mt-1.5 text-xs font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>
          <Rich text={why} />
        </div>
      )}
    </div>
  );
}

/** ㉚ تمرين القاعدة GOLDEN RULE: اختر الزمن المناسب. */
function S30_ExChoose() {
  const [done, setDone] = useState<boolean[]>(() => EX28_CHOOSE.map(() => false));
  const [ok, setOk] = useState(0);
  const all = done.every(Boolean);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 px-3 py-2 text-sm font-black text-amber-800">
        <span>⚖️</span>
        <Rich text="ضع الحدثين في عقلك قبل اختيار الزمن — التغذية الراجعة فورية هنا لأن هذا تدريب، وليس اختبارًا." />
      </div>
      {EX28_CHOOSE.map((q: Mcq28, i: number) => (
        <InstantRow
          key={q.n}
          n={q.n}
          stem={q.stem}
          opts={[q.opts[0], q.opts[1]]}
          answerIdx={q.answer}
          why={q.why}
          onDone={(isOk) => { setDone((d) => d.map((v, j) => (j === i ? true : v))); setOk((o) => o + (isOk ? 1 : 0)); }}
        />
      ))}
      {all && (
        <SourceReveal seq="ex30">
          <div className="text-sm font-black text-emerald-900">
            <Rich text={`🏁 انتهيت: ${ok}/5 صحيحة — إجابات المصدر الرسمية:`} />
          </div>
          <div className="grid gap-1">
            {EX28_CHOOSE.map((q) => (
              <div key={q.n} className="rounded-xl bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-700">
                <En className="font-black text-emerald-800">{q.answer}</En>
                <span className="mx-1">–</span>
                <En>{q.stem.replace("______", q.answer)}</En>
              </div>
            ))}
          </div>
        </SourceReveal>
      )}
      {!all && <div className="text-center text-xs font-bold text-slate-400"><Rich text={`أجبت عن ${done.filter(Boolean).length} من 5 — أكمل لكشف الإجابات الرسمية.`} /></div>}
    </div>
  );
}

/** ㉛ تمرين الحدث الأول — من وقع قبل من؟ */
function S31_ExFirstEvent() {
  const [picks, setPicks] = useState<(0 | 1 | null)[]>(() => EX28_FIRST_EVENT.map(() => null));
  const all = picks.every((p) => p !== null);
  const shuffledFor = (q: (typeof EX28_FIRST_EVENT)[number]): [string, string] => (q.n % 2 === 0 ? [q.earlier, q.later] : [q.later, q.earlier]);
  const score = EX28_FIRST_EVENT.filter((q, i) => picks[i] !== null && shuffledFor(q)[picks[i]!] === q.earlier).length;
  // ترتيب عرض الخيارين يتناوب بين البنود حتى لا يكون موضع الزر علامة مساعدة
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 px-3 py-2 text-sm font-black text-amber-800">
        <span>🕰️</span>
        <Rich text="المس الحدث الذي وقع أولًا — الترتيب قبل الزمن." />
      </div>
      {EX28_FIRST_EVENT.map((q, i) => {
        const pick = picks[i];
        const shuffled = shuffledFor(q);
        return (
          <div key={q.n} className="rounded-2xl border-2 border-slate-100 bg-white p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-head grid h-7 w-7 place-items-center rounded-lg bg-indigo-700 text-sm font-bold text-white">{q.n}</span>
              <En className="text-sm font-black text-slate-800">{q.sentence}</En>
              <span className="ms-auto rounded-lg bg-indigo-50 px-2 py-0.5 text-[11px] font-black text-indigo-700">
                <Rich text="الحدث الأول؟" />
              </span>
            </div>
            <div className="ms-9 flex flex-wrap gap-2">
              {shuffled.map((cand, j) => {
                const chosen = pick !== null && shuffled[pick] === cand;
                const isEarlier = cand === q.earlier;
                return (
                  <button
                    key={cand}
                    type="button"
                    aria-pressed={chosen}
                    onClick={() => { if (pick === null) setPicks((p) => p.map((x, k) => (k === i ? (j as 0 | 1) : x))); }}
                    className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${pick === null ? "border-slate-200 bg-white text-slate-700 hover:border-indigo-300" : chosen ? (isEarlier ? "border-emerald-400 bg-emerald-50 text-emerald-900" : "border-rose-300 bg-rose-50 text-rose-700") : isEarlier ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-100 bg-white text-slate-400"}`}
                  >
                    <En>{cand}</En>
                    {pick !== null && isEarlier && <span className="ms-1 text-emerald-700">①</span>}
                  </button>
                );
              })}
            </div>
            {pick !== null && (
              <div className="ms-9 mt-1.5 text-xs font-bold text-slate-600">
                <Rich text={shuffled[pick] === q.earlier ? `✓ أحسنت: ${q.earlier} وقع أولًا، ثم ${q.later}.` : `✕ الأقدم هو ${q.earlier} — ثم ${q.later}.`} />
              </div>
            )}
          </div>
        );
      })}
      {all && (
        <SourceReveal seq="ex31">
          <div className="text-sm font-black text-emerald-900"><Rich text={`🏁 ${score}/3 — الترتيبات الرسمية:`} /></div>
          {EX28_FIRST_EVENT.map((q) => (
            <div key={q.n} className="rounded-xl bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-700">
              <En className="font-black">{q.sentence}</En>
              <div className="mt-0.5 text-xs">
                <span className="font-black text-emerald-800"><En>{q.earlier}</En></span>
                <span className="mx-1 text-slate-400">←</span>
                <span className="font-black text-amber-800"><En>{q.later}</En></span>
              </div>
            </div>
          ))}
        </SourceReveal>
      )}
    </div>
  );
}

/** ㉜ تمرين اكتشف الخطأ — خمس جمل، المس الكلمة الخاطئة (feedback فوري مع التصريفات). */
function S32_ExErrors() {
  const [picks, setPicks] = useState<(number | null)[]>(() => EX28_ERROR_SPOTS.map(() => null));
  const all = picks.every((p) => p !== null);
  const score = EX28_ERROR_SPOTS.filter((s, i) => picks[i] === s.answer).length;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 px-3 py-2 text-sm font-black text-amber-800">
        <span>🔍</span>
        <Rich text="كل الأخطاء الخمسة من «عيادة الأخطاء»: المس الكلمة التي تخالف قاعدة had + V3." />
      </div>
      {EX28_ERROR_SPOTS.map((spot, i) => (
        <div key={i} className={`rounded-2xl border-2 p-3 transition ${picks[i] === null ? "border-slate-100 bg-white" : picks[i] === spot.answer ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"}`}>
          <div className="mb-1.5 flex items-center gap-2 text-sm font-black text-slate-700">
            <span className="font-head grid h-7 w-7 place-items-center rounded-lg bg-indigo-700 text-sm font-bold text-white">{i + 1}</span>
            <Rich text="المس الخطأ:" />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row ms-9 flex flex-wrap gap-1.5">
            {spot.segs.map((seg, si) => (
              <button
                key={si}
                type="button"
                aria-pressed={picks[i] === si}
                onClick={() => { if (picks[i] === null) setPicks((p) => p.map((x, k) => (k === i ? si : x))); }}
                className={`rounded-lg border-2 px-2.5 py-1.5 text-sm font-black transition ${picks[i] === null ? "border-slate-200 bg-white text-slate-800 hover:border-indigo-300 shadow-sm" : picks[i] === si ? (si === spot.answer ? "border-emerald-400 bg-emerald-50 text-emerald-900" : "border-rose-300 bg-rose-50 text-rose-700") : si === spot.answer && picks[i] !== spot.answer ? "border-emerald-300 bg-emerald-50/70 text-emerald-800" : "border-slate-100 bg-white text-slate-400"}`}
              >
                <En>{seg}</En>
              </button>
            ))}
          </div>
          {picks[i] !== null && (
            <div className="ms-9 mt-1.5 text-xs font-bold text-slate-600">
              <Rich text={picks[i] === spot.answer ? `✓ التصحيح: ${EX28_ERRORS[i].fixed}.` : `✕ الخطأ في «${spot.segs[spot.answer]}» — التصحيح: ${EX28_ERRORS[i].fixed}.`} />
            </div>
          )}
        </div>
      ))}
      {all && (
        <SourceReveal seq="ex32">
          <div className="text-sm font-black text-emerald-900">
            <Rich text={`🏁 ${score}/5 — الحصيلة مع التصحيح:`} />
          </div>
          <div className="grid gap-1">
            {EX28_ERRORS.map((e) => (
              <div key={e.n} className="rounded-xl bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-700">
                <En className="text-rose-700 line-through decoration-2">{e.wrong}</En>
                <span className="mx-2 text-slate-400">←</span>
                <En className="font-black text-emerald-800">{e.fixed} ✅</En>
              </div>
            ))}
          </div>
        </SourceReveal>
      )}
    </div>
  );
}

/** ㉝ John & Mary — لغز الترتيب الشهير (حياد → تحقق → كشف + ملاحظة المنطق). */
function S33_ExJohnMary() {
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const okIdx = checked ? EX28_JOHN_MARY.sourceAnswer : -1;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
        <div className="text-sm font-black text-indigo-900">
          <Rich text={EX28_JOHN_MARY.question} />
        </div>
        <div className="mt-1 grid gap-1 text-xs font-bold text-slate-500">
          <En className="block">When John arrived, Mary had left.</En>
          <En className="block">When Mary arrived, John had left.</En>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {EX28_JOHN_MARY.options.map((opt, i) => {
          const cls = checked
            ? i === okIdx
              ? "border-emerald-400 bg-emerald-50"
              : pick === i
                ? "border-rose-300 bg-rose-50"
                : "border-slate-100 bg-white opacity-60"
            : pick === i
              ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300"
              : "border-slate-200 bg-white hover:border-indigo-200";
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={pick === i}
              onClick={() => !checked && setPick(i)}
              className={`rounded-2xl border-2 p-3 text-center transition ${cls}`}
            >
              <span className="text-lg font-black">{EX28_JOHN_MARY.letters[i]}</span>
              <En className="block text-sm font-black text-slate-800">{opt}</En>
              {checked && i === okIdx && <span className="text-emerald-700">✓</span>}
              {checked && pick === i && i !== okIdx && <span className="text-rose-700">✕</span>}
            </button>
          );
        })}
      </div>
      <CheckBar
        checked={checked}
        allAnswered={pick !== null}
        answered={pick === null ? 0 : 1}
        total={1}
        score={<Rich text={checked && pick === okIdx ? "صح ✓" : "خطأ ✕"} />}
        onCheck={() => setChecked(true)}
        onReset={() => { setPick(null); setChecked(false); }}
        hint="اختر A أو B ثم اضغط تحقق."
      />
      {checked && (
        <SourceReveal seq="ex33">
          <div className="rounded-xl bg-white/80 p-2.5">
            <div className="text-center">
              <En className="font-head text-2xl font-bold text-emerald-800">A</En>
            </div>
            {/* شرح الإجابة كما وَرَد في المصدر — حرفيًا */}
            <div className="mt-1 grid gap-1 rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
              <div><Rich text="لأن:" /></div>
              <div><Rich text="Mary had left → Mary left أولًا." /></div>
              <div><Rich text="John arrived → بعد ذلك." /></div>
              <div><Rich text="إذن John لم يصل أولًا." /></div>
            </div>
            <div className="mt-1 grid gap-1 text-sm font-bold text-slate-700">
              <div><Rich text={`• ${EX28_JOHN_MARY.readings[0]}`} /></div>
              <div><Rich text={`• ${EX28_JOHN_MARY.readings[1]}`} /></div>
            </div>
          </div>
          <PlatformPanel title="Source Logic Note — ملاحظة منطقية من المنصة">
            <div className="space-y-1 text-sm font-bold text-amber-900">
              <Rich text={LOGIC_NOTE_S33.clarification} />
            </div>
          </PlatformPanel>
        </SourceReveal>
      )}
    </div>
  );
}

/** ㉞ Sarah & Tom — أيهما تعني أن سارة وصلت أولًا؟ */
function S34_ExSarahTom() {
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const okIdx = checked ? EX28_SARAH_TOM.answer : -1;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
        <div className="text-sm font-black text-indigo-900">
          <Rich text={EX28_SARAH_TOM.question} />
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {EX28_SARAH_TOM.options.map((opt, i) => {
          const cls = checked
            ? i === okIdx
              ? "border-emerald-400 bg-emerald-50"
              : pick === i
                ? "border-rose-300 bg-rose-50"
                : "border-slate-100 bg-white opacity-60"
            : pick === i
              ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300"
              : "border-slate-200 bg-white hover:border-indigo-200";
          return (
            <button key={opt} type="button" aria-pressed={pick === i} onClick={() => !checked && setPick(i)} className={`rounded-2xl border-2 p-3 text-center transition ${cls}`}>
              <span className="text-lg font-black">{EX28_SARAH_TOM.letters[i]}</span>
              <En className="block text-sm font-black text-slate-800">{opt}</En>
              {checked && i === okIdx && <span className="text-emerald-700">✓</span>}
              {checked && pick === i && i !== okIdx && <span className="text-rose-700">✕</span>}
            </button>
          );
        })}
      </div>
      <CheckBar
        checked={checked}
        allAnswered={pick !== null}
        answered={pick === null ? 0 : 1}
        total={1}
        score={<Rich text={checked && pick === okIdx ? "صح ✓" : "خطأ ✕"} />}
        onCheck={() => setChecked(true)}
        onReset={() => { setPick(null); setChecked(false); }}
        hint="اختر A أو B ثم اضغط تحقق."
      />
      {checked && (
        <SourceReveal seq="ex34">
          <div className="rounded-xl bg-white/80 p-2.5">
            <div className="text-center">
              <En className="font-head text-2xl font-bold text-emerald-800">B</En>
            </div>
            <div className="mt-1 grid gap-1 text-sm font-bold text-slate-700">
              {EX28_SARAH_TOM.readings.map((r) => (
                <div key={r}><Rich text={`• ${r}`} /></div>
              ))}
              <div className="text-emerald-800"><Rich text={EX28_SARAH_TOM.why} /></div>
            </div>
          </div>
        </SourceReveal>
      )}
    </div>
  );
}

/** ㉟ تمرين Daniel بثلاثة أسئلة. */
// توزيع الأزمنة الصحيح لأفعال قصة Daniel — مشتق مباشرة من الجملة المصدرية
const DANIEL_ANSWERS: Record<string, (typeof TENSES_28)[number]> = {
  "had completed": "Past Perfect",
  entered: "Past Simple",
  "were discussing": "Past Continuous",
  joined: "Past Simple",
};
function S35_ExDaniel() {
  const [picks, setPicks] = useState<(string | null)[]>(() => EX28_DANIEL.verbs.map(() => null));
  const [checked, setChecked] = useState(false);
  const all = picks.every((p) => p !== null);
  const score = EX28_DANIEL.verbs.filter((v, i) => picks[i] === DANIEL_ANSWERS[v]).length;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
        <En className="block text-sm font-black leading-relaxed text-indigo-950 sm:text-base">{EX28_DANIEL.story}</En>
      </div>
      <div className="text-center text-sm font-black text-slate-800"><Rich text="صنّف كل فعلٍ من الأفعال الأربعة حسب زمنه:" /></div>
      {EX28_DANIEL.verbs.map((v, i) => {
        const correct = DANIEL_ANSWERS[v];
        return (
          <div key={v} className={`rounded-2xl border-2 p-3 transition ${picks[i] === null ? "border-slate-100 bg-white" : checked ? (picks[i] === correct ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-indigo-100 bg-white"}`}>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-head grid h-7 w-7 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">{i + 1}</span>
              <En className="font-black text-slate-800">{v}</En>
              {checked && <span className={`ms-auto text-sm font-black ${picks[i] === correct ? "text-emerald-700" : "text-rose-700"}`}>{picks[i] === correct ? "✓" : "✕"}</span>}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TENSES_28.map((t) => {
                const cls = checked
                  ? t === correct
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                    : picks[i] === t
                      ? "border-rose-300 bg-rose-50 text-rose-700"
                      : "border-slate-100 bg-white text-slate-400"
                  : picks[i] === t
                    ? "border-indigo-400 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200";
                return (
                  <button key={t} type="button" aria-pressed={picks[i] === t} onClick={() => !checked && setPicks((p) => p.map((x, k) => (k === i ? t : x)))} className={`rounded-xl border-2 px-2.5 py-1.5 text-xs font-black transition ${cls}`}>
                    <En>{t}</En>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <CheckBar
        checked={checked}
        allAnswered={all}
        answered={picks.filter((p) => p !== null).length}
        total={EX28_DANIEL.verbs.length}
        score={<Rich text={`النتيجة: ${score} / ${EX28_DANIEL.verbs.length}`} />}
        onCheck={() => setChecked(true)}
        onReset={() => { setPicks(EX28_DANIEL.verbs.map(() => null)); setChecked(false); }}
        hint="صنّف الأفعال الأربعة ثم اضغط تحقق."
      />
      {checked && (
        <SourceReveal seq="ex35">
          <div className="grid gap-1">
            <div className="rounded-xl bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-700">
              <En className="font-black text-violet-800">had completed — Past Perfect</En>
              <div className="text-xs"><Rich text="المرحلة الأولى اكتملت قبل دخول Daniel → الحدث الأقدم ⏪" /></div>
            </div>
            <div className="rounded-xl bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-700">
              <En className="font-black text-teal-800">were discussing — Past Continuous</En>
              <div className="text-xs"><Rich text="النقاش كان جاريًا لحظة الدخول → الخلفية المستمرة 🎥" /></div>
            </div>
            <div className="rounded-xl bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-700">
              <En className="font-black text-orange-800">entered — Past Simple</En>
              <div className="text-xs"><Rich text="الدخول حدث نقطي قصير قطع النقاش 📸" /></div>
            </div>
            <div className="rounded-xl bg-white/80 px-3 py-1.5 text-sm font-bold text-slate-700">
              <En className="font-black text-orange-800">joined — Past Simple</En>
              <div className="text-xs"><Rich text="الانضمام حدث تالٍ مكتمل — تسلسل طبيعي 📸" /></div>
            </div>
          </div>
          <div className="rounded-xl bg-white/80 px-3 py-2 text-center text-xs font-bold text-indigo-800">
            <Rich text="الأسئلة الثلاثة المصدرية: ما قبل الدخول؟ had completed · ما الذي كان جاريًا؟ were discussing · ما الذي جاء بعد؟ joined" />
          </div>
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- المستوى المتقدم (s36–s38) ----------------

/** ㊱ The Logic Test — اللحدث الأقدم يُبنى باحتراف بالتام. */
function S36_LogicTest() {
  const [verdict, setVerdict] = useState<boolean | null>(null);
  return (
    <div className="space-y-3">
      <Lab seq="l28-logic-test" emoji="⚖️" label="THE LOGIC TEST" ar="المفصل المنطقي">
        <FormulaStrip
          items={["Past Simple", "=", "الحدث اللاحق", "·", "Past Perfect", "=", "الحدث الأقدم"]}
          tone="indigo"
        />
        <div className="mt-2 text-center text-sm font-black text-slate-800">
          <Rich text="جملة: When she arrived, the meeting ended. — كيف نقرؤها زمنيًا؟" />
        </div>
        <div className="flex justify-center gap-2">
          <button type="button" aria-pressed={verdict === true} onClick={() => setVerdict(true)} className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${verdict === true ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-600"}`}>
            <Rich text="تتابع: وصلت أولًا ثم انتهى الاجتماع ✓" />
          </button>
          <button type="button" aria-pressed={verdict === false} onClick={() => setVerdict(false)} className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${verdict === false ? "border-rose-300 bg-rose-50 text-rose-800" : "border-slate-200 bg-white text-slate-600"}`}>
            <Rich text="انتهى الاجتماع قبل وصولها؟" />
          </button>
        </div>
        {verdict !== null && (
          <div className={`mt-2 rounded-xl border-2 p-2.5 text-center text-sm font-bold ${verdict ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}>
            <Rich text={verdict ? "✓ arrived → ended: تتابع حدثين (بسيط + بسيط). ولو أردنا أن يكون الانتهاء قبل الوصول، لكتبناها هكذا: When she arrived, the meeting had ended." : "✕ بلا had لا يكون الانتهاء قبل الوصول — الترتيب يتبع ظهور الجملة: وصلت ثم انتهى."} />
          </div>
        )}
      </Lab>
      <Note emoji="💡" text="عندما يقف زمنان داخل جملة واحدة: الماضي البسيط للحدث اللاحق، والماضي التام للحدث الأقدم — الفارق منطقي قبل أن يكون صيغة." />
    </div>
  );
}

/** ㊲ مشهد Alex — لقطة واحدة من الحياة بالألوان الثلاثة. */
// عدسة كل فعل في مشهد Alex — مشتقة من حقل tense في بيانات ㊲
const ALEX_LENS: Record<string, Lens28> = {
  "Past Simple": "event",
  "Past Continuous": "progress",
  "Past Perfect": "flashback",
};
function S37_AlexScene() {
  const [ans, setAns] = useState<(Lens28 | null)[]>(() => ALEX_SCENE_28.verbs.map(() => null));
  const done = ans.every((a) => a !== null);
  const correct = ALEX_SCENE_28.verbs.filter((v, i) => ans[i] === ALEX_LENS[v.tense]).length;
  const tenseAr = (t: string) => (t === "Past Perfect" ? "تام" : t === "Past Continuous" ? "مستمر" : "بسيط");
  return (
    <div className="space-y-3">
      <Lab seq="l28-alex-scene" emoji="🎬" label="ALEX SCENE" ar="مشهد واحد — ثمانية أفعال بثلاثة أزمنة">
        <div className="rounded-2xl border-2 border-slate-100 bg-white p-3">
          <En className="block text-sm font-black leading-6 text-slate-800">{ALEX_SCENE_28.text}</En>
        </div>
        <div className="mt-2 space-y-1.5">
          {ALEX_SCENE_28.verbs.map((vb, i) => {
            const gold = ALEX_LENS[vb.tense];
            return (
              <div key={`${i}-${vb.verb}`} className={`rounded-2xl border-2 p-2 transition ${ans[i] === null ? "border-slate-100 bg-white" : ans[i] === gold ? "border-emerald-200 bg-emerald-50/60" : "border-rose-200 bg-rose-50/60"}`}>
                <div className="flex flex-wrap items-center gap-1.5">
                  <En className="me-1 font-black text-indigo-900">{vb.verb}</En>
                  {(["event", "progress", "flashback"] as Lens28[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={ans[i] === t}
                      onClick={() => setAns((a) => a.map((x, j) => (j === i ? t : x)))}
                      className={`rounded-lg px-2 py-0.5 text-[11px] font-black transition ${ans[i] === t ? LENS_META[t].chip : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                    >
                      <Rich text={t === "event" ? "📸 بسيط" : t === "progress" ? "🎥 مستمر" : "⏪ تام"} />
                    </button>
                  ))}
                  {ans[i] !== null && (
                    <span className={`text-[11px] font-black ${ans[i] === gold ? "text-emerald-700" : "text-rose-700"}`}>
                      <Rich text={ans[i] === gold ? "✓" : `✕ ${tenseAr(vb.tense)}`} />
                    </span>
                  )}
                </div>
                {ans[i] !== null && ans[i] === gold && (
                  <div className="mt-1 text-[11px] font-bold text-slate-500"><Rich text={vb.role} /></div>
                )}
              </div>
            );
          })}
        </div>
        {done && (
          <div className={`mt-2 rounded-2xl border-2 p-3 text-center text-sm font-black ${correct >= 7 ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-amber-300 bg-amber-50 text-amber-800"}`}>
            <Rich text={`🎬 ${correct} / 8 — ${correct >= 7 ? "تفكيك متقن للمشهد!" : "قيد المراجعة — تذكّر: خلفية أم حدث؟"}`} />
          </div>
        )}
      </Lab>
      <PlatformPanel title="التفكيك الكامل للمشهد — توزيع الأزمنة">
        <div className="grid gap-1.5 text-xs font-bold text-amber-900">
          <div className="rounded-xl bg-white/70 px-3 py-1.5">
            <Rich text="📸 Past Simple (3): " />
            <EnAr en={ALEX_SCENE_28.verbs.filter((v) => v.tense === "Past Simple").map((v) => v.verb).join(" · ")} ar=" — محرّكات القصة النقطية." />
          </div>
          <div className="rounded-xl bg-white/70 px-3 py-1.5">
            <Rich text="🎥 Past Continuous (3): " />
            <EnAr en={ALEX_SCENE_28.verbs.filter((v) => v.tense === "Past Continuous").map((v) => v.verb).join(" · ")} ar=" — الخلفية الحيّة لحظة الدخول." />
          </div>
          <div className="rounded-xl bg-white/70 px-3 py-1.5">
            <Rich text="⏪ Past Perfect (2): " />
            <EnAr en={ALEX_SCENE_28.verbs.filter((v) => v.tense === "Past Perfect").map((v) => v.verb).join(" · ")} ar=" — ما سبق لحظة الإدراك: الباب فُتح قبل أن يدرك Alex ذلك، والعائلة لم تتركه مفتوحًا قط قبلها." />
          </div>
        </div>
      </PlatformPanel>
    </div>
  );
}

/** ㊳ قاعدة واحدة حاسمة. */
function S38_MeaningRule() {
  const [flip, setFlip] = useState(false);
  return (
    <div className="space-y-3">
      <Lab seq="l28-meaning-rule" emoji="📏" label="ONE DECISIVE RULE" ar="قاعدة حاسمة واحدة">
        <button
          type="button"
          aria-pressed={flip}
          onClick={() => setFlip((v) => !v)}
          className={`w-full rounded-3xl border-2 p-4 text-center transition ${flip ? "border-emerald-300 bg-emerald-50" : "border-indigo-300 bg-gradient-to-br from-indigo-950 to-violet-900"}`}
        >
          <div className="text-3xl">{flip ? "🧭" : "🪙"}</div>
          <div className={`mt-1 text-sm font-black ${flip ? "text-emerald-900" : "text-white"}`}>
            <Rich text={flip ? "حُفظت؟ حرّك البطاقة مرة أخرى للتأكد." : "القاعدة الذهبية — المس البطاقة لقلبها"} />
          </div>
          <div className={`mt-2 rounded-2xl p-3 ${flip ? "bg-white" : "bg-white/10"}`}>
            <div className={`text-base font-black ${flip ? "text-emerald-800" : "text-cyan-200"}`}>
              <Rich text={flip ? "→ past perfect = حدثان في الماضي + أحدهما قبل الآخر بوضوح" : "إذا رأيت حدثين ماضيين…"} />
            </div>
            {flip && (
              <div className="mt-2 space-y-1 text-sm font-bold text-slate-700">
                <En className="block">Their light was on ← حالة؟ مستمر/ثابت</En>
                <En className="block">had left ← غادروا وحدهم أقدم من الآن</En>
                <En className="block">wanted to travel ← رغبة بسيطة في الماضي</En>
              </div>
            )}
          </div>
        </button>
      </Lab>
      <Note emoji="💡" text="من حياتك اليومية نفسها: Their light was on. They had left. I wanted to travel. — العلاقة مع الحقيقة الزمنية تصنع الزمن، لا الكلمة المفردة." />
    </div>
  );
}

// ---------------- التحديات النهائية (s39–s40) ----------------

/** ㊴ BOSS FIGHT — الهجاء الزمني المطلق: أي جملة صحيحة ١٠٠٪؟ */
function S39_ExBoss() {
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const okIdx = checked ? BOSS_28.answer : -1;
  return (
    <Lab seq="l28-ex-boss" emoji="⚔️" label="BOSS FIGHT" ar="إثبات المدى الزمني">
      <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center text-sm font-black text-violet-900">
        <Rich text={BOSS_28.meaning} />
      </div>
      <div className="mt-2 space-y-1.5">
        {BOSS_28.opts.map((opt, i) => (
          <button
            key={opt}
            type="button"
            aria-pressed={pick === i}
            onClick={() => !checked && setPick(i)}
            className={`w-full rounded-2xl border-2 p-3 text-start transition ${checked ? (i === okIdx ? "border-emerald-400 bg-emerald-50" : pick === i ? "border-rose-300 bg-rose-50" : "border-slate-100 bg-white opacity-60") : pick === i ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300" : "border-slate-200 bg-white hover:border-indigo-200"}`}
          >
            <div className="flex items-center gap-2 font-black">
              <span className="font-head grid h-7 w-7 place-items-center rounded-lg bg-violet-700 text-sm font-bold text-white">{String.fromCharCode(65 + i)}</span>
              <En className="flex-1 text-sm">{opt}</En>
              {checked && i === okIdx && <span className="text-emerald-700">✓</span>}
              {checked && pick === i && i !== okIdx && <span className="text-rose-700">✕</span>}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-2">
        <CheckBar
          checked={checked}
          allAnswered={pick !== null}
          answered={pick === null ? 0 : 1}
          total={1}
          score={<Rich text={checked && pick === okIdx ? "أصبت صلبًا ✓" : "خطأ — راجع"} />}
          onCheck={() => setChecked(true)}
          onReset={() => { setPick(null); setChecked(false); }}
          hint="اختر الجملة الصحيحة 100% ثم اضغط تحقق."
          label="⚔️ تحقق من الإجابات"
        />
      </div>
      {checked && (
        <SourceReveal seq="ex39">
          <div className="rounded-xl bg-white/80 p-2.5 text-sm font-bold text-slate-700">
            {/* تحليل الإجابة كما وَرَد في المصدر — حرفيًا */}
            <div className="text-center font-head text-base font-bold text-emerald-800"><Rich text="B ✅" /></div>
            <div className="mt-1 text-xs font-black text-slate-500"><Rich text="لماذا؟" /></div>
            <div className="mt-1 grid gap-1">
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex justify-between gap-2 rounded-lg bg-teal-50 px-3 py-1.5"><En className="font-black">I was running</En><span className="text-xs font-bold text-teal-800">→ النشاط كان مستمرًا.</span></div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex justify-between gap-2 rounded-lg bg-orange-50 px-3 py-1.5"><En className="font-black">I saw</En><span className="text-xs font-bold text-orange-800">→ حدث وقع أثناء ذلك.</span></div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex justify-between gap-2 rounded-lg bg-sky-50 px-3 py-1.5"><En className="font-black">I realized</En><span className="text-xs font-bold text-sky-800">→ حدث ذهني.</span></div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex justify-between gap-2 rounded-lg bg-violet-50 px-3 py-1.5"><En className="font-black">I had seen</En><span className="text-xs font-bold text-violet-800">→ رؤية الكلب حدثت قبل لحظة الإدراك.</span></div>
            </div>
            <div className="mt-2 grid gap-1 rounded-xl bg-slate-50 px-3 py-2 text-xs">
              <En className="text-rose-700">A: ran ← لا خلفية مستمرة، وI saw this dog before يساوي زمن رؤيتها الآن — لا تعبير عن الحدث الأقدم ❌</En>
              <En className="text-rose-700">C: had run في أول الجملة يعني أن الركض هو الأقدم — والمعنى المطلوب العكس، وwas seeing لحالة إدراكية غير سليمة ❌</En>
            </div>
          </div>
        </SourceReveal>
      )}
    </Lab>
  );
}

/** ㊵ كاتب IQ200 — اكتب قصة بالمتطلبات العشرة. */
function S40_ExStory() {
  const [text, setText] = useState("");
  const lower = text.toLowerCase();
  const checks = [
    { v: "PAST SIMPLE (ثلاثة أفعال تامة)", ok: /(walked|saw|ran|went|opened|closed|made|found|ate|played|wrote|read|took|put|went|said|told|hurt|felt|knew|spoke)/.test(lower) },
    { v: "PAST CONTINUOUS (was/were + V-ing)", ok: /(was|were)\s+\w+ing\b/.test(lower) },
    { v: "PAST PERFECT (had + V3)", ok: /\bhad\s+\w+(ed|en|t|ne)\b/.test(lower) },
    { v: "already", ok: /\balready\b/.test(lower) },
    { v: "just", ok: /\bjust\b/.test(lower) },
    { v: "by the time", ok: /by the time/.test(lower) },
    { v: "بعد بعد (after) على الأقل مرة", ok: /\bafter\b/.test(lower) },
    { v: "قبل (before) على الأقل مرة", ok: /\bbefore\b/.test(lower) },
    { v: "مفاجأة صغيرة", ok: /(suddenly|surprise|amazed|strange|wow|حقيقة)/.test(lower) || lower.includes("couldn't believe") },
    { v: "نهاية منطقية", ok: /(finally|in the end|at last|ended|conclusion|ولهذا)/.test(lower) || text.trim().length > 160 },
  ];
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <Lab seq="l28-ex-story" emoji="✍️" label="IQ200 WRITER" ar="كاتب القصة الزمني">
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/70 p-3">
        <div className="text-sm font-black text-indigo-900"><Rich text={STORY_28_TITLE} /></div>
        <ul className="mt-1 space-y-0.5">
          {STORY_28_REQUIREMENTS.map((r) => (
            <li key={r} className="text-xs font-bold text-slate-600"><Rich text={`• ${r}`} /></li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        <textarea
          dir="ltr"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your story here… (اكتب قصتك هنا)"
          className="font-en w-full rounded-2xl border-2 border-indigo-200 bg-white p-3 text-left text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-400"
        />
        <div className="mt-1 flex items-center justify-between text-xs font-bold text-slate-500">
          <span><Rich text={`عدد الكلمات: ${words}`} /></span>
          <button type="button" onClick={() => setText("")} className="rounded-lg bg-slate-100 px-3 py-1 font-black text-slate-500 transition hover:bg-slate-200">
            <Rich text="↺ مسح" />
          </button>
        </div>
      </div>
      <div className="mt-2 grid gap-1 sm:grid-cols-2">
        {checks.map((c, i) => (
          <div key={c.v} className={`flex items-center gap-2 rounded-xl border-2 px-2.5 py-1.5 text-xs font-black transition ${c.ok ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-100 bg-white text-slate-500"}`}>
            <span className={`grid h-5 w-5 place-items-center rounded-md text-[10px] ${c.ok ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>{c.ok ? "✓" : i + 1}</span>
            <Rich text={c.v} />
          </div>
        ))}
      </div>
      {checks.every((c) => c.ok) && (
        <div className="mt-2 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3 text-center text-sm font-black text-emerald-800">
          <Rich text="🏆 قصة مكتملة الشروط — أنت كاتبٌ زمني حقيقي!" />
        </div>
      )}
    </Lab>
  );
}

// ---------------- الخاتمة ----------------

/** الملخص — جدول الأزمنة الثلاثة النهائي. */
function SummaryStep() {
  const rows = [
    {
      q: "ماذا حدث؟",
      en: "I played a game.",
      ar: "لعبت لعبة.",
      chip: "Past Simple",
      role: "حدث تام في الماضي — pointed وانتهى",
      tone: LENS_META.event,
    },
    {
      q: "ماذا كان يحدث؟",
      en: "She was fixing the car.",
      ar: "كانت تصلح السيارة.",
      chip: "Past Continuous",
      role: "حدث مستمر في الماضي — خلفية مشهدية",
      tone: LENS_META.progress,
    },
    {
      q: "ماذا كان قد حدث قبل ذلك؟",
      en: "They had left before the call.",
      ar: "كانوا قد غادروا قبل الاتصال.",
      chip: "Past Perfect",
      role: "حدث أقدم من حدث آخر — فلاش باك",
      tone: LENS_META.flashback,
    },
  ];
  return (
    <div data-en-seq="l28-summary" className="space-y-3">
      <div className="text-center text-sm font-black text-slate-800">
        <Rich text="🧭 الخلاصة في ثلاثة أسئلة — النظام الذي يحكم اختيارك:" />
      </div>
      {rows.map((r) => (
        <div key={r.en} className={`rounded-2xl border-2 p-3 ${r.tone.soft}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span dir="ltr" className="ltr-pair inline-flex flex-wrap items-center gap-2"><span className={`rounded-xl px-2.5 py-1 text-xs font-black ${r.tone.chip}`}><En>{r.chip}</En></span><span dir="rtl"><span className="font-black text-slate-800"><Rich text={r.q} /></span></span></span>
          </div>
          <En className="mt-1.5 block text-sm font-black text-slate-800">{r.en}</En>
          <div className="text-xs font-bold text-slate-500"><Rich text={r.ar} /></div>
          <div className="mt-1 rounded-lg bg-white/70 px-2 py-1 text-xs font-bold text-slate-600"><Rich text={r.role} /></div>
        </div>
      ))}
      <Note emoji="💡" text="وفي الأمثلة الأخيرة: I washed the dishes because I had promised the cook. / He couldn't enter the house because he had forgotten the key. — شريكا الجملة الآن صديقان قديمان." />
    </div>
  );
}

/** القاعدة الذهبية النهائية. */
function GoldenStep() {
  const [seq, setSeq] = useState<(string | null)[]>([null, null, null]);
  const slots = ["الأقدم", "اللاحق", "التتابع"] as const;
  const options: { k: string; en: string; tone: string }[] = [
    { k: "pp", en: "⏪ had + V3", tone: "bg-violet-700" },
    { k: "ps2", en: "📸 PS + PS", tone: "bg-orange-500" },
    { k: "pc", en: "🎥 كان يحدث", tone: "bg-teal-600" },
  ];
  const want: (string | null)[] = ["pp", "ps2", "pc"];
  const setAt = (slot: number, k: string) => setSeq((s) => s.map((v, i) => (i === slot ? (s[slot] === k ? null : k) : v)));
  const solved = seq.every((v, i) => v === want[i]);
  return (
    <div data-en-seq="l28-golden" className="space-y-3">
      <div className="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
        <div className="text-center font-head text-lg font-bold text-violet-900">
          <Rich text="📜 THE GOLDEN RULE — القاعدة الذهبية" />
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text="أكمل سلسلة القاعدة: عند عرض الأحداث بترتيب زمني، المس في كل خانة الأداة الصحيحة." />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[0, 1, 2].map((slot) => (
            <div key={slot} className={`rounded-2xl border-2 p-2.5 text-center ${seq[slot] === want[slot] ? "border-emerald-300 bg-emerald-50" : "border-dashed border-violet-300 bg-white"}`}>
              <div className="text-[11px] font-black text-violet-700">{["الحدث الأقدم", "الأحدث / التتابع", "المشهد المستمر"][slot]}</div>
              <div className="mt-1.5 flex flex-wrap justify-center gap-1">
                {options.map((o) => (
                  <button
                    key={o.k}
                    type="button"
                    aria-pressed={seq[slot] === o.k}
                    onClick={() => setAt(slot, o.k)}
                    className={`rounded-lg px-2 py-1 text-[11px] font-black transition ${seq[slot] === o.k ? `${o.tone} text-white` : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    <Rich text={o.en} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {solved && (
          <div className="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3 text-center">
            <En className="block text-sm font-black text-emerald-900">had + V3 → Past Simple + Past Simple → was/were + V-ing</En>
            <div className="text-xs font-bold text-emerald-700"><Rich text="⚜️ القاعدة سليمة — استحققت قالبًا منظمويًا." /></div>
          </div>
        )}
      </div>
      <Note emoji="💡" text="حدثان في الماضي + ترتيب واضح ← Past Perfect & Past Simple + عند الحاجة، Past Continuous يبقى اللقطة الخلفية." />
    </div>
  );
}

/** ⚡ نهائي: صنّف أجزاء جملة المطار الكاملة وفق بيانات ㊶-style (IQFINAL_28). */
const IQ_TENSES = ["Past Simple", "Past Continuous", "Past Perfect"] as const;
function IqFinalStep() {
  const [ans, setAns] = useState<(string | null)[]>(() => IQFINAL_28.parts.map(() => null));
  const [checked, setChecked] = useState(false);
  const allAnswered = ans.every((a) => a !== null);
  const score = IQFINAL_28.parts.filter((p, i) => ans[i] === p.tense).length;
  const done = checked && score === IQFINAL_28.parts.length;
  return (
    <Lab seq="l28-ex-iqfinal" emoji="🧠" label="IQ200 FINAL CHALLENGE" ar="مشهد المطار — أربعة أجزاء، ثلاثة أزمنة">
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
        <div className="mb-1 text-sm font-black text-indigo-900"><Rich text="مشهد واحد في المطار — صنّف زمن كل جزء:" /></div>
        <En className="block text-sm font-black leading-relaxed text-indigo-800">{IQFINAL_28.sentence}</En>
      </div>
      <div className="mt-2 space-y-1.5">
        {IQFINAL_28.parts.map((p, i) => (
          <div key={p.text} className={`rounded-2xl border-2 p-2.5 ${ans[i] === null ? "border-slate-100 bg-white" : checked ? (ans[i] === p.tense ? "border-emerald-200 bg-emerald-50/60" : "border-rose-200 bg-rose-50/60") : "border-indigo-100 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-head grid h-7 w-7 place-items-center rounded-lg bg-indigo-700 text-xs font-bold text-white">{i + 1}</span>
              <div className="flex-1">
                <En className="block text-sm font-black text-slate-800">{p.text}</En>
                <div className="text-[11px] font-bold text-slate-400"><Rich text={p.role} /></div>
              </div>
              {checked && (
                <span className={`text-sm font-black ${ans[i] === p.tense ? "text-emerald-700" : "text-rose-700"}`}>{ans[i] === p.tense ? "✓" : "✕"}</span>
              )}
            </div>
            <div className="ms-9 mt-1.5 flex flex-wrap gap-1.5">
              {IQ_TENSES.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={ans[i] === t}
                  onClick={() => !checked && setAns((a) => a.map((x, k) => (k === i ? t : x)))}
                  className={`rounded-lg border-2 px-2.5 py-1 text-[11px] font-black transition ${checked ? (t === p.tense ? "border-emerald-400 bg-emerald-50 text-emerald-900" : ans[i] === t ? "border-rose-300 bg-rose-50 text-rose-700" : "border-slate-100 bg-white text-slate-400") : ans[i] === t ? "border-indigo-400 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200"}`}
                >
                  <En>{t}</En>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <CheckBar
          checked={checked}
          allAnswered={allAnswered}
          answered={ans.filter((a) => a !== null).length}
          total={4}
          score={<Rich text={`النتيجة: ${score} / 4`} />}
          onCheck={() => setChecked(true)}
          onReset={() => { setAns(IQFINAL_28.parts.map(() => null)); setChecked(false); }}
          hint="صنّف الأجزاء الأربعة ثم اضغط تحقق."
          label="🧠 تحقق من الإجابات"
        />
      </div>
      {checked && (
        <SourceReveal seq="iqfinal">
          {/* الحل النهائي كما وَرَد في المصدر — حرفيًا: أربعة أجزاء بعلامات ①–④ */}
          <div className="grid gap-1">
            {IQFINAL_28.parts.map((p, i) => (
              <div key={p.text} className="flex flex-wrap items-center gap-2 rounded-xl bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700">
                <span className="font-head grid h-6 w-6 place-items-center rounded-lg bg-indigo-700 text-[11px] font-bold text-white">{["①", "②", "③", "④"][i]}</span>
                <En className="font-black">{p.text}</En>
                <span className="mx-1 text-slate-400">←</span>
                <En className={p.tense === "Past Perfect" ? "font-black text-violet-800" : p.tense === "Past Continuous" ? "font-black text-teal-800" : "font-black text-orange-800"}>→ {p.tense}</En>
              </div>
            ))}
          </div>
          {/* الصورة الكاملة */}
          <div className="rounded-xl bg-white/80 px-3 py-2">
            <div className="text-center text-xs font-black text-indigo-900"><Rich text="وهنا أصبحت الصورة كاملة:" /></div>
            <div className="mt-1 grid gap-1 text-xs font-bold text-slate-700">
              <div className="flex flex-wrap items-center gap-1.5"><span>⏪</span><Rich text="حدث أقدم:" /><En className="font-black">The plane had taken off.</En></div>
              <div className="flex flex-wrap items-center gap-1.5"><span>📸</span><Rich text="حدث الوصول:" /><En className="font-black">I arrived.</En></div>
              <div className="flex flex-wrap items-center gap-1.5"><span>🎥</span><Rich text="خلفية مستمرة:" /><En className="font-black">People were running.</En></div>
              <div className="flex flex-wrap items-center gap-1.5"><span>🎥</span><Rich text="خلفية مستمرة:" /><En className="font-black">An employee was talking.</En></div>
            </div>
            <div className="mt-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-center text-xs font-black text-emerald-800">
              <Rich text="وهذه هي النقلة من حفظ الأزمنة إلى التحكم الحقيقي بها." />
            </div>
          </div>
        </SourceReveal>
      )}
      {done && (
        <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-2.5 text-center text-sm font-black text-emerald-800">
          <Rich text="🧠🎖️ إتقان كامل ٤/٤ — عقلك يرتّب المسار الزمني وحده." />
        </div>
      )}
    </Lab>
  );
}

/** الخاتمة — شهادة إتقان THE TIMELINE MASTER. */
function ClosingStep({ onGoTest }: { onGoTest?: () => void }) {
  return (
    <div data-en-seq="l28-closing" className="space-y-4">
      <div data-source-section={`الخاتمة — ${LESSON_TITLE_28}`} dir="ltr" style={{ direction: "ltr" }} className="ltr-row space-y-3 rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-950 via-emerald-900 to-cyan-950 p-6 text-center">
        <div className="text-5xl">🏆</div>
        <En className="block text-xs font-black uppercase tracking-[0.28em] text-emerald-300">MISSION COMPLETE</En>
        <En className="block text-2xl font-black text-white">YOU ARE NOW</En>
        <En className="block font-head text-3xl font-bold text-amber-300">THE TIMELINE MASTER</En>
        <div className="mx-auto max-w-md rounded-2xl bg-white/10 p-3">
          <En className="block text-sm font-bold text-emerald-100">had + V3 · earlier past · ordered events</En>
        </div>
      </div>
      <div className="rounded-2xl border-2 border-indigo-100 bg-white p-4 text-center">
        <div className="font-head text-lg font-bold text-slate-900">
          <Rich text="أنهيت ٤٧ خطوة — صرتَ تميّز الأقدم من الأحدث بلا تردد" />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-500">
          <Rich text="الاختبار الآن: ٢٠ سؤالًا من كتابة المنصة الأصلية — بأنواع تعجبك. النتيجة تُحسب فقط بعد الإنهاء." />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {onGoTest && (
            <button type="button" onClick={onGoTest} className="rounded-xl bg-indigo-700 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-indigo-800 active:scale-[0.98]">
              <Rich text="🚀 ابدأ الاختبار النهائي (20 سؤالًا)" />
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {[
          { t: "الأقدم", en: "had + V3", c: "bg-violet-700" },
          { t: "الأحدث", en: "V2 البسيط", c: "bg-orange-500" },
          { t: "المستمر", en: "was/were + ing", c: "bg-teal-600" },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border-2 border-slate-100 bg-white p-3 text-center">
            <span className={`mx-auto w-fit rounded-xl px-3 py-1.5 text-sm font-black text-white ${x.c}`}><En>{x.en}</En></span>
            <div className="mt-1.5 text-xs font-black text-slate-600"><Rich text={x.t} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- مبدّل المحتوى حسب الشريحة ----------------

function SlideBody({ s, onGoTest }: { s: Slide28; onGoTest?: () => void }) {
  switch (s.id) {
    case "cover": return <CoverStep />;
    case "bridge": return <BridgeStep />;
    case "objectives": return <ObjectivesStep />;
    case "s1": return <S1_FirstQuestion />;
    case "s2": return <S2_OneEvent />;
    case "s3": return <S3_OlderEvent />;
    case "s4": return <S4_Compare />;
    case "s5": return <S5_OldMyth />;
    case "s6": return <S6_Timeline />;
    case "s7": return <S7_Camera />;
    case "s8": return <S8_Necklace />;
    case "s9": return <S9_BeforeNotAlways />;
    case "s10": return <S10_WhyPerfect />;
    case "s11": return <S11_AfterAfter />;
    case "s12": return <S12_NoMagic />;
    case "s13": return <S13_ByTime />;
    case "s14": return <S14_Already />;
    case "s15": return <S15_Just />;
    case "s16": return <S16_PsPlusPp />;
    case "s17": return <S17_ThreeTensesIntro />;
    case "s18": return <S18_WalletLayers />;
    case "s19": return <S19_Station />;
    case "s20": return <S20_TimeMachine />;
    case "s21": return <S21_ErrWent />;
    case "s22": return <S22_ErrAte />;
    case "s23": return <S23_ErrSaw />;
    case "s24": return <S24_ErrDid />;
    case "s25": return <S25_ErrDidnt />;
    case "s26": return <S26_Cases3 />;
    case "s27": return <S27_SeqBackref />;
    case "s28": return <S28_StepBack />;
    case "s29": return <S29_CaveDetective />;
    case "s30": return <S30_ExChoose />;
    case "s31": return <S31_ExFirstEvent />;
    case "s32": return <S32_ExErrors />;
    case "s33": return <S33_ExJohnMary />;
    case "s34": return <S34_ExSarahTom />;
    case "s35": return <S35_ExDaniel />;
    case "s36": return <S36_LogicTest />;
    case "s37": return <S37_AlexScene />;
    case "s38": return <S38_MeaningRule />;
    case "s39": return <S39_ExBoss />;
    case "s40": return <S40_ExStory />;
    case "summary": return <SummaryStep />;
    case "golden": return <GoldenStep />;
    case "iqfinal": return <IqFinalStep />;
    case "closing": return <ClosingStep onGoTest={onGoTest} />;
    default: return null;
  }
}

/** عنوان المصدر الموسوم على كل شريحة — المنصة تُبقيه قابلًا للتدقيق بلا عرض خام. */
function sourceTitleFor(s: Slide28): string {
  return s.source.map((id) => SOURCE_SECTIONS[SEC[id as keyof typeof SEC]].title).join(" • ");
}

/** عارض الشريحة الواحدة — إطار موحّد + جسم سياقي لكل خطوة. */
export function SlideView28({ s, onGoTest }: { s: Slide28; onGoTest?: () => void }) {
  return (
    <Frame
      mascot={s.mascot}
      step={s.step}
      badge={s.section}
      title={<Rich text={s.title} />}
      lead={s.lead ? <Rich text={s.lead} /> : undefined}
      tip={s.tip}
      accent={ACCENT28}
      sourceTag={sourceTitleFor(s)}
    >
      <SlideBody s={s} onGoTest={onGoTest} />
    </Frame>
  );
}

// ============================ الاختبار النهائي — 20 سؤالًا ============================

type TestAnswer = number | number[] | boolean | Record<number, number> | null;

const TYPE_LABEL: Record<TestQ28["type"], string> = {
  single: "اختيار واحد",
  tf: "صح أم خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "مطابقة",
  spot: "حدد الخطأ",
};

function answerMatches(q: TestQ28, a: TestAnswer): boolean {
  if (a === null) return false;
  switch (q.type) {
    case "single": return a === q.answer;
    case "tf": return a === q.answer;
    case "multi": {
      const arr = [...(a as number[])].sort();
      const gold = [...q.answer].sort();
      return arr.length === gold.length && arr.every((v, i) => v === gold[i]);
    }
    case "order": {
      const idxs = a as number[];
      return Array.isArray(idxs) && q.answer.every((txt, i) => q.items[(idxs as number[])[i]] === txt);
    }
    case "match": {
      const rec = a as Record<number, number>;
      return q.answer.every((r, l) => rec[l] === r);
    }
    case "spot": return a === q.answer;
    default: return false;
  }
}

/** بطاقة سؤال واحدة — محايدة قبل الإنهاء، ملوّنة بعده. */
function TestCard({
  q,
  value,
  setValue,
  checked,
}: {
  q: TestQ28;
  value: TestAnswer;
  setValue: (v: TestAnswer) => void;
  checked: boolean;
}) {
  const [tempOrder, setTempOrder] = useState<number[]>([]);
  const [matchLeft, setMatchLeft] = useState<number | null>(null);
  const ok = checked && answerMatches(q, value);
  const bad = checked && !ok;

  let body: ReactNode = null;
  if (q.type === "single") {
    body = (
      <div className="grid gap-1.5">
        {q.opts.map((o, i) => {
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-300";
          if (!checked && value === i) cls = "border-indigo-400 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200";
          if (checked) {
            if (i === q.answer) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (value === i) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-100 bg-white text-slate-400";
          }
          return (
            <button key={o} type="button" aria-pressed={value === i} onClick={() => !checked && setValue(i)} className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-start text-sm font-bold transition ${cls}`}>
              <En className="font-black">{o}</En>
              {checked && i === q.answer && <span className="ms-auto text-emerald-700">✓</span>}
              {checked && value === i && i !== q.answer && <span className="ms-auto text-rose-700">✕</span>}
            </button>
          );
        })}
      </div>
    );
  } else if (q.type === "tf") {
    body = (
      <div className="flex flex-wrap justify-center gap-2">
        {([true, false] as const).map((v) => {
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-300";
          if (!checked && value === v) cls = "border-indigo-400 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200";
          if (checked) {
            if (v === q.answer) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (value === v) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-100 bg-white text-slate-400";
          }
          return (
            <button key={String(v)} type="button" aria-pressed={value === v} onClick={() => !checked && setValue(v)} className={`rounded-xl border-2 px-5 py-2.5 text-sm font-black transition ${cls}`}>
              <Rich text={v ? "✔ صح" : "✘ خطأ"} />
            </button>
          );
        })}
      </div>
    );
  } else if (q.type === "multi") {
    const arr = (value as number[] | null) ?? [];
    body = (
      <div className="grid gap-1.5">
        {q.opts.map((o, i) => {
          const on = arr.includes(i);
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-300";
          if (!checked && on) cls = "border-indigo-400 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200";
          if (checked) {
            if (q.answer.includes(i)) cls = "border-emerald-300 bg-emerald-50/70 text-emerald-900";
            else if (on) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-100 bg-white text-slate-400";
          }
          return (
            <button key={o + i} type="button" aria-pressed={on} onClick={() => !checked && setValue(on ? arr.filter((x) => x !== i) : [...arr, i])} className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-start text-sm font-bold transition ${cls}`}>
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 text-[10px] font-black ${on ? "border-indigo-500 bg-indigo-500 text-white" : checked && q.answer.includes(i) ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent"}`}>✓</span>
              <En className="font-black">{o}</En>
            </button>
          );
        })}
      </div>
    );
  } else if (q.type === "order") {
    const cur = (value as number[] | null) ?? tempOrder;
    body = (
      <div className="space-y-2">
        <div className="flex flex-wrap justify-center gap-1.5">
          {q.items.map((it, idx) => {
            const pos = cur.indexOf(idx);
            let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 shadow-sm";
            if (!checked && pos >= 0) cls = "border-indigo-400 bg-indigo-50 text-indigo-900";
            if (checked) {
              let clsChk = "border-emerald-300 bg-emerald-50 text-emerald-900";
              if (pos < 0 || q.items[q.answer.indexOf(it)] !== it || q.answer[pos] !== it) clsChk = "border-slate-200 bg-white text-slate-500";
              cls = clsChk;
            }
            return (
              <button
                key={it}
                type="button"
                aria-pressed={pos >= 0}
                onClick={() => {
                  if (checked) return;
                  const next = pos >= 0 ? cur.filter((x) => x !== idx) : [...cur, idx];
                  setTempOrder(next);
                  setValue(next.length === q.items.length ? next : null);
                }}
                className={`rounded-xl border-2 px-3 py-2 text-sm font-black transition ${cls}`}
              >
                {pos >= 0 && <span className="font-head me-1.5 inline-grid h-5 w-5 place-items-center rounded-md bg-indigo-700 text-[10px] font-bold text-white">{pos + 1}</span>}
                <En>{it}</En>
              </button>
            );
          })}
        </div>
        <div className="text-center text-xs font-bold text-slate-400"><Rich text="المس الفقرات بالترتيب من الأقدم (١) إلى الأحدث (٣)" /></div>
        {checked && (
          <div className={`rounded-xl p-2 text-center text-xs font-black ${ok ? "border-2 border-emerald-200 bg-emerald-50 text-emerald-800" : "border-2 border-rose-200 bg-rose-50 text-rose-700"}`}>
            <Rich text={ok ? `✓ الترتيب صحيح: ${q.answer.join(" ← ")}` : `✕ الترتيب الصحيح: ${q.answer.map((t, k) => `${k + 1}. ${t}`).join(" · ")}`} />
          </div>
        )}
      </div>
    );
  } else if (q.type === "match") {
    const rec = (value as Record<number, number> | null) ?? {};
    // العمود الأيمن يُعرض مُداحًا حتى لا تكون الأماكن الأصلية هي الحل (نفس منهجية الدرس 29)
    const len = q.right.length;
    const rightOrder = Array.from({ length: len }, (_, i) => (i + 1) % len);
    body = (
      <div className="space-y-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="space-y-1.5">
            {q.left.map((l, i) => (
              <button
                key={l}
                type="button"
                aria-pressed={matchLeft === i}
                onClick={() => !checked && setMatchLeft(matchLeft === i ? null : i)}
                className={`w-full rounded-xl border-2 px-3 py-2 text-sm font-black transition ${matchLeft === i ? "border-indigo-400 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200" : rec[i] !== undefined ? "border-emerald-200 bg-emerald-50/60 text-slate-800" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200"}`}
              >
                <span className="font-head me-1.5 inline-grid h-6 w-6 place-items-center rounded-lg bg-indigo-700 text-xs font-bold text-white">{i + 1}</span>
                <En>{l}</En>
                {rec[i] !== undefined && <span className="ms-2 text-xs font-bold text-emerald-700"><En>→ {q.right[rec[i]]}</En></span>}
              </button>
            ))}
          </div>
          <div className="space-y-1.5">
            {rightOrder.map((j) => (
              <button
                key={q.right[j]}
                type="button"
                disabled={matchLeft === null || checked}
                onClick={() => {
                  if (matchLeft === null) return;
                  setValue({ ...rec, [matchLeft]: j });
                  setMatchLeft(null);
                }}
                className={`w-full rounded-xl border-2 px-3 py-2 text-sm font-black transition ${matchLeft === null ? "border-slate-100 bg-slate-50 text-slate-400" : "border-amber-200 bg-white text-slate-700 hover:border-amber-400 active:scale-[0.98]"}`}
              >
                <Rich text={q.right[j]} />
              </button>
            ))}
          </div>
        </div>
        <div className="text-center text-xs font-bold text-slate-400"><Rich text="المس عنصرًا من اليسار ثم ما يناظره من اليمين" /></div>
        {checked && (
          <div className={`rounded-xl p-2 text-center text-xs font-black ${ok ? "border-2 border-emerald-200 bg-emerald-50 text-emerald-800" : "border-2 border-rose-200 bg-rose-50 text-rose-700"}`}>
            <Rich text={ok ? "✓ مطابقة كاملة صحيحة" : `✕ الصحيح: ${q.left.map((l, i) => `${l} → ${q.right[q.answer[i]]}`).join(" · ")}`} />
          </div>
        )}
      </div>
    );
  } else if (q.type === "spot") {
    body = (
      <div className="space-y-2">
        <div className="flex flex-wrap justify-center gap-1.5">
          {q.segments.map((seg, i) => {
            let cls = "border-slate-200 bg-white text-slate-800 hover:border-indigo-300 shadow-sm";
            if (!checked && value === i) cls = "border-indigo-400 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200";
            if (checked) {
              if (i === q.answer) cls = "border-rose-400 bg-rose-50 text-rose-800";
              else if (value === i) cls = "border-amber-300 bg-amber-50 text-amber-800";
              else cls = "border-slate-100 bg-white text-slate-400";
            }
            return (
              <button key={seg + i} type="button" aria-pressed={value === i} onClick={() => !checked && setValue(i)} className={`rounded-xl border-2 px-3 py-2 text-sm font-black transition ${cls}`}>
                <En>{seg}</En>
              </button>
            );
          })}
        </div>
        {checked && (
          <div className={`rounded-xl p-2 text-center text-xs font-black ${ok ? "border-2 border-emerald-200 bg-emerald-50 text-emerald-800" : "border-2 border-rose-200 bg-rose-50 text-rose-700"}`}>
            <En>{ok ? `✓ أصبت — التصحيح: ${(q as Extract<TestQ28, { type: "spot" }>).fix}` : `✕ الخطأ في «${q.segments[(q as Extract<TestQ28, { type: "spot" }>).answer]}» ← الصحيح: ${(q as Extract<TestQ28, { type: "spot" }>).fix}`}</En>
          </div>
        )}
      </div>
    );
  }

  return (
    <div data-test-q={q.n} className={`space-y-3 rounded-3xl border-2 bg-white p-4 transition ${ok ? "border-emerald-300" : bad ? "border-rose-200" : value === null ? "border-slate-100" : "border-indigo-200"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`font-head grid h-9 w-9 shrink-0 place-items-center rounded-2xl text-base font-bold ${checked ? (ok ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : value === null ? "bg-slate-100 text-slate-500" : "bg-indigo-700 text-white"}`}>
          {checked ? (ok ? "✓" : "✕") : q.n}
        </span>
        {q.en && <En className="text-base font-black text-slate-900">{q.en}</En>}
        <span className="text-sm font-bold text-slate-600"><Rich text={q.ar} /></span>
        <span className="ms-auto rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-black text-indigo-700"><Rich text={TYPE_LABEL[q.type]} /></span>
      </div>
      {body}
      {checked && (
        <div className={`rounded-xl px-3 py-2 text-xs font-bold ${ok ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>
          <Rich text={`💡 ${q.why}`} />
          {q.trap && (
            <div className="mt-1 text-[11px] font-bold opacity-90"><Rich text={`🪤 الفخ: ${q.trap}`} /></div>
          )}
        </div>
      )}
    </div>
  );
}

/** منطقة الاختبار — محايد حتى تُجيب عن الكل، ثم «إنهاء الاختبار» يظهر الدرجة. */
export function TestArea28({ onCheckedChange, onShowSolutions }: { onCheckedChange?: (checked: boolean) => void; onShowSolutions?: () => void }) {
  const [answers, setAnswers] = useState<TestAnswer[]>(() => TEST_28.map(() => null));
  const [checked, setChecked] = useState(false);
  const answered = answers.filter((a) => a !== null).length;
  const all = answered === TEST_28.length;
  const score = checked ? TEST_28.filter((q, i) => answerMatches(q, answers[i])).length : 0;

  const setAt = (i: number, v: TestAnswer) => setAnswers((a) => a.map((x, j) => (j === i ? v : x)));

  const submit = () => {
    if (!all) return;
    setChecked(true);
    onCheckedChange?.(true);
    document.getElementById("l28-main")?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const reset = () => {
    setAnswers(TEST_28.map(() => null));
    setChecked(false);
    onCheckedChange?.(false);
    document.getElementById("l28-main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div data-area="l28-test" className="space-y-3">
      <div className="rounded-3xl border-2 border-amber-200 bg-gradient-to-l from-amber-50 to-orange-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl">🦉</span>
          <div className="min-w-0 flex-1">
            <div className="font-head text-lg font-bold text-amber-900"><Rich text="الاختبار النهائي — الدرس 28" /></div>
            <div className="text-sm font-bold text-amber-700">
              <Rich text={checked ? "تم الاحتساب — راجع الأخطاء والصواب بالألوان، والفخ تحت كل سؤال." : "٢٠ سؤالًا أصليًّا بستة أنواع: اختيار واحد · صح/خطأ · اختيار متعدد · ترتيب · مطابقة · حدد الخطأ. لا تغذية راجعة أثناء الحل — الدرجة بعد الإنهاء فقط."} />
            </div>
          </div>
          <div className={`font-head rounded-2xl border-2 px-3 py-1.5 text-sm font-bold ${checked ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-amber-300 bg-white text-amber-800"}`}>
            <Rich text={checked ? `نتيجتك: ${score} / 20` : `أجبت عن: ${answered} / 20`} />
          </div>
        </div>
        {!checked && (
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-amber-100">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all" style={{ width: `${(answered / TEST_28.length) * 100}%` }} />
          </div>
        )}
      </div>

      {TEST_28.map((q, i) => (
        <TestCard key={q.n} q={q} value={answers[i]} setValue={(v) => setAt(i, v)} checked={checked} />
      ))}

      <div className="sticky bottom-3 z-10 flex flex-wrap items-center gap-2 rounded-3xl border-2 border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur">
        {checked ? (
          <>
            <span className={`font-head rounded-2xl px-4 py-2.5 text-base font-bold ${score >= 16 ? "bg-emerald-600 text-white" : score >= 12 ? "bg-amber-500 text-white" : "bg-rose-600 text-white"}`}>
              <Rich text={`النتيجة النهائية: ${score} / 20`} />
            </span>
            <button type="button" onClick={reset} className="rounded-2xl bg-slate-800 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-900">
              <Rich text="🔄 إعادة الاختبار" />
            </button>
            {onShowSolutions && (
              <button type="button" onClick={onShowSolutions} className="rounded-2xl border-2 border-emerald-300 bg-white px-4 py-2.5 text-sm font-black text-emerald-800 transition hover:bg-emerald-50">
                <Rich text="📖 افتح الحلول" />
              </button>
            )}
            <span className="text-xs font-bold text-slate-500">
              <Rich text={score >= 16 ? "🏆 إتقان مسارات الزمن — تستحق لقب THE TIMELINE MASTER!" : score >= 12 ? "قريب جدًّا — راجع البطاقات الحمراء ثم أعد المحاولة." : "عُد إلى الخطوات ثم حاول مجددًا — الترتيب أولًا ثم الزمن."} />
            </span>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={submit}
              disabled={!all}
              className="rounded-2xl bg-indigo-700 px-6 py-2.5 text-sm font-black text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
            >
              <Rich text={`✅ إنهاء الاختبار (${answered}/20)`} />
            </button>
            {!all && (
              <span className="text-xs font-bold text-slate-500">
                <Rich text={`بقي ${TEST_28.length - answered} سؤالًا — يتفعّل الزر عند اكتمال الإجابات.`} />
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================ حلول الاختبار ============================

/** حلول الاختبار — تُفتح فقط بعد إنهاء المحاولة. كل حل: الإجابة + لماذا تُصادق + الفخ. */
export function Solutions28({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest?: () => void; onGoTeacher?: () => void }) {
  if (!unlocked) {
    return (
      <div data-area="l28-solutions" className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <div className="text-4xl">🔒</div>
        <div className="mt-2 font-head text-xl font-bold text-slate-700"><Rich text="الحلول مقفلة" /></div>
        <div className="mt-1 text-sm font-bold text-slate-500">
          <Rich text="تتاح حلول الاختبار العشرين بعد إنهاء محاولتك الأولى — حتى تكون المقارنة مفيدة حقًا." />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {onGoTest && (
            <button type="button" onClick={onGoTest} className="rounded-2xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-800">
              <Rich text="🦉 انتقل إلى الاختبار" />
            </button>
          )}
          {onGoTeacher && (
            <button type="button" onClick={onGoTeacher} className="rounded-2xl border-2 border-slate-300 bg-white px-5 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50">
              <Rich text="🧑‍🏫 منطقة المعلم" />
            </button>
          )}
        </div>
      </div>
    );
  }
  return (
    <div data-area="l28-solutions" className="space-y-3">
      <div className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-l from-emerald-50 to-teal-50 p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔓</span>
          <div>
            <div className="font-head text-lg font-bold text-emerald-900"><Rich text="حلول الاختبار النهائي — 20 سؤالًا" /></div>
            <div className="text-sm font-bold text-emerald-700"><Rich text="لكل سؤال: الإجابة الصحيحة + لماذا تتثبت + الفخ الذي كان يستدرجك." /></div>
          </div>
        </div>
      </div>
      {TEST_28_SOLUTIONS.map((sol) => (
        <div key={sol.n} className="rounded-3xl border-2 border-slate-100 bg-white p-4">
          <div className="flex flex-wrap items-start gap-2">
            <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-base font-bold text-white">{sol.n}</span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-slate-800"><Rich text={sol.ar} /></div>
              {sol.en && <En className="mt-0.5 block text-sm font-black text-indigo-900">{sol.en}</En>}
            </div>
          </div>
          <div className="ms-11 mt-2 space-y-1.5">
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/70 px-3 py-2 text-sm font-black text-emerald-900">
              <Rich text="✅ الإجابة الصحيحة: " /><En>{sol.answer}</En>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600">
              <Rich text={`💡 لماذا تتثبت؟ ${sol.explanation}`} />
            </div>
            {sol.trap && (
              <div className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-800">
                <Rich text={`🪤 الفخ: ${sol.trap}`} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================ منطقة المعلم ============================

function TeacherGate({ ok, setOk }: { ok: boolean; setOk: (v: boolean) => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  if (ok) return null;
  return (
    <div data-area="l28-teacher" className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <div className="text-4xl">🧑‍🏫</div>
      <div className="mt-2 font-head text-xl font-bold text-slate-700"><Rich text="منطقة المعلم بكلمة مرور" /></div>
      <div className="mt-1 text-sm font-bold text-slate-500"><Rich text="لافتة للمعلم فقط — ملاحظات التدريس وحلول تمارين المصدر بالتفصيل." /></div>
      <form
        className="mx-auto mt-3 flex max-w-xs flex-col items-stretch gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (pw.trim() === TEACHER_PASSWORD_28) setOk(true);
          else setErr(true);
        }}
      >
        <input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false); }}
          placeholder="كلمة المرور"
          className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-center font-bold text-slate-800 outline-none placeholder:text-slate-300 focus:border-indigo-400"
        />
        <button type="submit" className="rounded-2xl bg-slate-800 px-4 py-2.5 text-sm font-black text-white transition hover:bg-slate-900">
          <Rich text="🔑 دخول المعلم" />
        </button>
        {err && <div className="rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700"><Rich text="✕ كلمة مرور غير صحيحة — جرّب مرة أخرى." /></div>}
      </form>
    </div>
  );
}

/** منطقة المعلم — محتوى تعليمي شكّل وحلول نشاطات المصدر + روبريك القصة. */
export function TeacherArea28({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange?: (ok: boolean) => void; onGoSolutions?: () => void }) {
  const ok = unlocked;
  const setOk = (v: boolean) => onUnlockChange?.(v);
  if (!ok) return <TeacherGate ok={ok} setOk={setOk} />;
  return (
    <div data-area="l28-teacher" className="space-y-3">
      {/* مفتاح الاختبار النهائي — داخل منطقة المعلم المفتوحة بكلمة المرور */}
      <FinalTestAnswerKey lesson={28} questions={FINAL_TESTS[28]} accent="bg-indigo-700" />
      <div className="rounded-3xl border-2 border-sky-200 bg-gradient-to-l from-sky-50 to-indigo-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl">🧑‍🏫</span>
          <div className="min-w-0 flex-1">
            <div className="font-head text-lg font-bold text-sky-900"><Rich text="منطقة المعلم — الدرس 28" /></div>
            <div className="text-sm font-bold text-sky-700"><Rich text="Past Perfect vs Past Simple — ترتيب الأحداث في الماضي بالمعنى لا بالحفظ" /></div>
          </div>
          <button type="button" onClick={() => setOk(false)} className="rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-black text-white">
            <Rich text="قفل 🔒" />
          </button>
        </div>
        {onGoSolutions && (
          <button type="button" onClick={onGoSolutions} className="mt-2 rounded-xl border-2 border-sky-200 bg-white px-3 py-1.5 text-xs font-black text-sky-800 transition hover:bg-sky-50">
            <Rich text="📖 اذهب إلى صفحة حلول الاختبار" />
          </button>
        )}
      </div>

      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <div className="font-head text-base font-bold text-slate-900"><Rich text={`🗺️ ${TEACHER_28_OVERVIEW.title}`} /></div>
        <div className="mt-2 space-y-2">
          <div className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-900"><Rich text={`الموضوع: ${TEACHER_28_OVERVIEW.theme}`} /></div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700"><Rich text={`المهارة الجوهرية: ${TEACHER_28_OVERVIEW.coreSkill}`} /></div>
          <div className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-bold text-violet-900"><Rich text={`العلاقة بالدرس 27: ${TEACHER_28_OVERVIEW.lesson27Link}`} /></div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-slate-50 bg-slate-50/60 p-3">
            <div className="text-xs font-black text-slate-500"><Rich text="أهداف الدرس العشرة" /></div>
            <ol className="mt-1 list-decimal ps-4 text-xs font-bold text-slate-700">
              {TEACHER_28_OVERVIEW.objectives.map((o) => <li key={o}><Rich text={o} /></li>)}
            </ol>
          </div>
          <div className="rounded-2xl border-2 border-slate-50 bg-slate-50/60 p-3">
            <div className="text-xs font-black text-slate-500"><Rich text="النواة الزمنية" /></div>
            <ul className="mt-1 space-y-1 text-xs font-bold text-slate-700">
              {TEACHER_28_OVERVIEW.core.map((c) => <li key={c}><Rich text={`• ${c}`} /></li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <div className="font-head text-base font-bold text-slate-900"><Rich text="🧑‍🏫 ملاحظات التدريس" /></div>
        <div className="mt-2 space-y-2">
          {TEACHER_28_NOTES.map((n) => (
            <div key={n.head} className="rounded-2xl border-2 border-slate-50 bg-slate-50/60 p-3">
              <div className="text-sm font-black text-indigo-800"><Rich text={n.head} /></div>
              <ul className="mt-1 space-y-0.5 text-xs font-bold text-slate-600">
                {n.lines.map((l) => <li key={l}><Rich text={`• ${l}`} /></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <div className="font-head text-base font-bold text-slate-900"><Rich text="📝 حلول تمارين المصدر بالتفصيل (للمعلم)" /></div>
        <div className="mt-2 space-y-2">
          {TEACHER_28_SOLUTIONS.map((s) => (
            <div key={s.head} className="rounded-2xl border-2 border-slate-50 bg-slate-50/60 p-3">
              <div className="text-sm font-black text-emerald-800"><Rich text={s.head} /></div>
              <ul className="mt-1 space-y-0.5 text-xs font-bold text-slate-600">
                {s.lines.map((l) => <li key={l}><Rich text={`• ${l}`} /></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <div className="font-head text-base font-bold text-slate-900"><Rich text={`📏 ${TEACHER_28_RUBRIC.head}`} /></div>
        <ul className="mt-2 space-y-1 text-sm font-bold text-slate-700">
          {TEACHER_28_RUBRIC.lines.map((r) => <li key={r} className="rounded-xl bg-amber-50 px-3 py-1.5"><Rich text={`• ${r}`} /></li>)}
        </ul>
      </div>

      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <div className="font-head text-base font-bold text-slate-900"><Rich text="🩺 الأخطاء الجسيمة (تدريب سريع للمعلم على التشخيص)" /></div>
        <div className="mt-2 space-y-1.5">
          {TEACHER_28_MISTAKES.map((m) => (
            <div key={m.head} className="rounded-2xl border-2 border-rose-50 bg-rose-50/50 p-3">
              <div className="text-sm font-black text-rose-700"><Rich text={m.head} /></div>
              <ul className="mt-1 space-y-0.5 text-xs font-bold text-slate-600">
                {m.lines.map((l) => <li key={l}><Rich text={`• ${l}`} /></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================ الهيكل الرئيسي — 4 مناطق ============================

export type Area28 = "lesson" | "test" | "solutions" | "teacher";

const AREAS: { id: Area28; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📚", ar: "الدرس" },
  { id: "test", emoji: "📝", ar: "منطقة الاختبارات" },
  { id: "solutions", emoji: "📖", ar: "حلول الاختبارات" },
  { id: "teacher", emoji: "🧑‍🏫", ar: "منطقة المعلم" },
];

const SECTION_COLORS: Record<string, string> = {
  البداية: "text-slate-500",
  "القرار: بسيط أم تام؟": "text-indigo-700",
  "كلمات الترتيب": "text-teal-700",
  "ثلاثة أزمنة": "text-cyan-700",
  "الأخطاء الشائعة": "text-rose-700",
  "التفكير الزمني": "text-amber-700",
  التدريبات: "text-fuchsia-700",
  "المستوى المتقدم": "text-purple-700",
  "التحديات النهائية": "text-red-700",
  الخاتمة: "text-slate-500",
};

function slideTitle(slide: Slide28): string {
  if (slide.id === "cover") return "الغلاف";
  return slide.title;
}

function Rail({
  index, setIndex, onExit, onClose, area, setArea,
}: {
  index: number;
  setIndex: (i: number) => void;
  onExit: () => void;
  onClose?: () => void;
  area: Area28;
  setArea: (a: Area28) => void;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, number[]>();
    SLIDES.forEach((s, i) => {
      const list = map.get(s.section) ?? [];
      list.push(i);
      map.set(s.section, list);
    });
    return [...map.entries()].map(([section, indexes]) => ({ section, indexes }));
  }, []);
  return (
    <aside className="flex h-full flex-col bg-white/90">
      <div className="border-b border-indigo-100 p-4">
        <button onClick={onExit} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
          ← جميع الدروس
        </button>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => { setArea(a.id); onClose?.(); }}
              aria-pressed={area === a.id}
              className={`rounded-xl border-2 px-2 py-2 text-xs font-black transition ${area === a.id ? "border-indigo-600 bg-indigo-700 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}
            >
              {a.emoji} {a.ar}
            </button>
          ))}
        </div>
        <En className="mt-2 block text-center text-xs font-semibold text-indigo-700">🧭 {LAB_NAME_28}</En>
        <div className="mt-2 rounded-lg bg-indigo-50 px-2 py-1 text-center text-[11px] font-bold text-indigo-800">
          {SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا · {SOURCE_LEDGER_COUNT} قسمًا في السجل · {SLIDES.length} خطوة
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label="lesson slides">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] ?? "text-slate-400"}`}>
              <Rich text={group.section} />
            </div>
            {group.indexes.map((i) => {
              const active = index === i && area === "lesson";
              return (
                <button
                  key={i}
                  onClick={() => {
                    setArea("lesson");
                    setIndex(i);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${
                    active ? "bg-indigo-700 text-white shadow" : "text-slate-600 hover:bg-indigo-50"
                  }`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>
                    {i + 1}
                  </span>
                  <span className="truncate font-semibold"><LatinRuns text={slideTitle(SLIDES[i])} /></span>
                  <span className="mr-auto text-base">{SLIDES[i].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-indigo-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

export default function Lesson28({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area28>("lesson");
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [testChecked, setTestChecked] = useState(false);
  const [teacherOk, setTeacherOk] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(
    () => ({
      next: () => setIndex((value) => Math.min(value + 1, total - 1)),
      prev: () => setIndex((value) => Math.max(value - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu || area !== "lesson") return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") navigation.next();
      if (event.key === "ArrowRight") navigation.prev();
      if (event.key === " ") {
        event.preventDefault();
        navigation.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, menu, area]);

  useEffect(() => {
    document.getElementById("l28-main")?.scrollTo({ top: 0 });
  }, [index, area]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  const solutionsUnlocked = testChecked || teacherOk;
  return (
    <div dir="rtl" className="font-body relative flex h-screen flex-col overflow-hidden bg-[#f3f6ff] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-indigo-100 bg-white/85 backdrop-blur lg:block">
          <Rail index={index} setIndex={setIndex} onExit={onExit} area={area} setArea={setArea} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-indigo-100 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {AREAS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setArea(a.id)}
                    aria-pressed={area === a.id}
                    className={`rounded-full px-3 py-1.5 text-xs font-black transition md:text-sm ${area === a.id ? "bg-indigo-700 text-white shadow" : "bg-white text-slate-500 shadow-sm hover:bg-indigo-50"}`}
                  >
                    {a.emoji} {a.ar}
                  </button>
                ))}
              </div>
              {area === "lesson" && (
                <>
                  <div className="mt-1.5 truncate text-sm font-bold text-slate-500">
                    <Rich text={`${slide.section} · `} />
                    <span className="text-slate-800">
                      <Rich text={slideTitle(slide)} />
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-indigo-100/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-indigo-700 via-sky-500 to-amber-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>
            {area === "lesson" && (
              <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
                {index + 1} / {total}
              </span>
            )}
          </header>
          <main id="l28-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div className="pop mx-auto max-w-4xl" hidden={area !== "lesson"}>
              <SlideView28 key={index} s={slide} onGoTest={() => setArea("test")} />
              {/* 🏁 الاختبار النهائي — طبقة نهاية الدرس (تظهر مع الخطوة الأخيرة فقط) */}
              {index === total - 1 && (
                <div className="mt-4">
                  <FinalTest
                    lesson={28}
                    questions={FINAL_TESTS[28]}
                    accent="bg-indigo-700"
                    onGoTeacher={() => setArea("teacher")}
                  />
                </div>
              )}
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "test"}>
              <TestArea28 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "solutions"}>
              <Solutions28 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "teacher"}>
              <TeacherArea28 unlocked={teacherOk} onUnlockChange={setTeacherOk} onGoSolutions={() => setArea("solutions")} />
            </div>
          </main>
          {area === "lesson" && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
              <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-indigo-900/[0.06] bg-white/95 p-1.5 shadow-xl backdrop-blur">
                <button
                  onClick={navigation.prev}
                  disabled={index === 0}
                  className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
                >
                  → السابق
                </button>
                <span className="h-6 w-px bg-slate-200" />
                <button
                  onClick={navigation.next}
                  disabled={index === total - 1}
                  className="rounded-full bg-indigo-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
                >
                  التالي ←
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <Rail index={index} setIndex={setIndex} onExit={onExit} onClose={() => setMenu(false)} area={area} setArea={setArea} />
          </div>
        </div>
      )}
    </div>
  );
}
