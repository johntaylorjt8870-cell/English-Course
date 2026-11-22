import { useEffect, useState } from "react";
import ArenaClean from "./shared/ArenaClean";
import LessonNumberNav from "./shared/LessonNumberNav";
import { Signature, SignatureGhost } from "./shared/Signature";
import SitePasswordGate from "./shared/SitePasswordGate";
import LazyLessonHost from "./shared/LazyLessonHost";

// ------------------------------------------------------------
// توجيه بسيط عبر الـ hash: #/lesson/1 · #/lesson/2
// ------------------------------------------------------------
function useRoute() {
  const read = () => {
    const m = window.location.hash.match(/^#\/lesson\/(\d+)/);
    return m ? Number(m[1]) : 0;
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

const goHome = () => {
  window.location.hash = "/";
};

type Card = {
  n: number;
  title: string;
  en: string;
  emoji: string;
  stats?: string;
  href?: string;
  grad: string;
  locked?: boolean;
};

// ملاحظة (Fix #4): أعداد الشرائح في stats للدروس 1–28 قيم ثابتة ملتقطة
// من `SLIDES.length` في كل data.ts وقت تنفيذ التحميل الكسول، وليست
// مستوردة ديناميكيًا — استيراد data.ts من الفهرس كان يضمّن ~1.3MB في
// الحزمة الرئيسية. إذا تغيّر عدد شرائح أحد هذه الدروس حدّث القيمة هنا.
const CARDS: Card[] = [
  {
    n: 1,
    title: "تكوين الجملة الإنجليزية",
    en: "Sentence Structure",
    emoji: "🧱",
    stats: `21 شريحة · 4 تمارين تفاعلية`,
    href: "#/lesson/1",
    grad: "from-sky-500 to-emerald-500",
  },
  {
    n: 2,
    title: "الضمائر و Verb to be",
    en: "Pronouns + am / is / are",
    emoji: "🙋",
    stats: `30 شريحة · 5 تمارين تفاعلية`,
    href: "#/lesson/2",
    grad: "from-rose-400 to-orange-400",
  },
  {
    n: 3,
    title: "الإثبات والنفي والسؤال مع Verb to be",
    en: "Affirmative · Negative · Question · Short Answers",
    emoji: "🔥",
    stats: `21 شريحة · 5 تمارين تفاعلية · آلة تحويل حيّة`,
    href: "#/lesson/3",
    grad: "from-emerald-500 to-indigo-500",
  },
  {
    n: 4,
    title: "الأسماء وأدوات التعريف",
    en: "Nouns + a / an / the",
    emoji: "🔤",
    stats: `33 شريحة · 6 تمارين · آلة الأدوات وكاشف الصوت`,
    href: "#/lesson/4",
    grad: "from-amber-500 to-emerald-500",
  },
  {
    n: 5,
    title: "الصفات والجملة الوصفية",
    en: "Adjectives + Verb to be",
    emoji: "🎨",
    stats: `32 شريحة · 8 تمارين · ورشة الجملة الوصفية`,
    href: "#/lesson/5",
    grad: "from-violet-500 to-sky-500",
  },
  {
    n: 6,
    title: "المضارع البسيط",
    en: "Present Simple",
    emoji: "⏰",
    stats: `31 شريحة · 6 تمارين · آلة التصريف وسلّم التكرار`,
    href: "#/lesson/6",
    grad: "from-teal-500 to-fuchsia-500",
  },
  {
    n: 7,
    title: "النفي والسؤال مع Do و Does",
    en: "Present Simple · Negative & Questions",
    emoji: "🎭",
    stats: `28 شريحة · 7 تمارين · آلة اختفاء الـ s`,
    href: "#/lesson/7",
    grad: "from-rose-500 to-violet-500",
  },
  {
    n: 8,
    title: "مراجعة شاملة للمضارع البسيط",
    en: "Present Simple · Full Review · IQ200",
    emoji: "🧠",
    stats: `27 شريحة · 10 مستويات · محقق لغوي وتحدي الأستاذ`,
    href: "#/lesson/8",
    grad: "from-indigo-500 to-amber-500",
  },
  {
    n: 9,
    title: "المضارع المستمر",
    en: "Present Continuous",
    emoji: "🎬",
    stats: `28 شريحة · 6 تمارين · قواعد ing وآلة المشاهد الحية`,
    href: "#/lesson/9",
    grad: "from-cyan-500 to-violet-500",
  },
  {
    n: 10,
    title: "المضارع المستمر المتقدم",
    en: "Present Continuous · Advanced Uses",
    emoji: "📘",
    stats: `33 شريحة · 9 مستويات · IQ200 وGrammar Detective`,
    href: "#/lesson/10",
    grad: "from-cyan-500 to-indigo-500",
  },
  {
    n: 11,
    title: "المضارع البسيط مقابل المستمر",
    en: "Present Simple vs Present Continuous",
    emoji: "⚖️",
    stats: `36 شريحة · 11 مستوى · IQ200 وGrammar Detective`,
    href: "#/lesson/11",
    grad: "from-indigo-500 to-cyan-500",
  },
  {
    n: 12,
    title: "الماضي البسيط",
    en: "Past Simple",
    emoji: "🕰️",
    stats: `38 شريحة · 11 مستوى · IQ200 وGrammar Detective`,
    href: "#/lesson/12",
    grad: "from-orange-500 to-rose-500",
  },
  {
    n: 13,
    title: "الماضي البسيط — النفي والأسئلة",
    en: "Past Simple — did / didn't",
    emoji: "❓",
    stats: `37 شريحة · 10 مستويات · صائد الأخطاء وIQ200`,
    href: "#/lesson/13",
    grad: "from-amber-500 to-orange-500",
  },
  {
    n: 14,
    title: "الدرس 14: Past Simple — Wh Questions والتطبيق الشامل",
    en: "Past Simple — Wh Questions + Comprehensive Application",
    emoji: "🧭",
    stats: `35 شريحة · 4 مستويات · Grammar Detective وIQ200`,
    href: "#/lesson/14",
    grad: "from-violet-500 to-fuchsia-500",
  },
  {
    n: 15,
    title: "الدرس 15: Past Simple of Verb to be — was / were",
    en: "Past Simple of Verb to be — was / were",
    emoji: "🟠",
    stats: `45 شريحة · 6 مستويات · Was/Were Control Center وGrammar Detective`,
    href: "#/lesson/15",
    grad: "from-amber-500 to-orange-500",
  },
  {
    n: 16,
    title: "الدرس 16: Possessive Adjectives — صفات الملكية",
    en: "Possessive Adjectives — my / your / his / her / its / our / their",
    emoji: "🏠",
    stats: `46 شريحة · 11 مستوى · Ownership Detective وIQ200`,
    href: "#/lesson/16",
    grad: "from-teal-500 to-emerald-500",
  },
  {
    n: 17,
    title: "الدرس 17: Possessive Pronouns — ضمائر الملكية",
    en: "Possessive Pronouns — mine / yours / his / hers / ours / theirs",
    emoji: "🔬",
    stats: `53 شريحة · 6 مستويات · Transformation Machine وWhose? Lab`,
    href: "#/lesson/17",
    grad: "from-indigo-500 to-amber-500",
  },
  {
    n: 18,
    title: "الدرس 18: Plural Nouns — جمع الأسماء",
    en: "Plural Nouns — Regular & Irregular Plurals",
    emoji: "🔢",
    stats: `26 شريحة · 8 تحديات · Transformation Machine وMonster Zone`,
    href: "#/lesson/18",
    grad: "from-teal-500 to-cyan-600",
  },
  {
    n: 19,
    title: "الدرس 19: Possessive Nouns — ملكية الأسماء",
    en: "Possessive Nouns — 's / s' / Irregular Plurals",
    emoji: "🕵️",
    stats: `29 شريحة · 7 تحديات · Apostrophe Machine وThree-System Machine`,
    href: "#/lesson/19",
    grad: "from-amber-400 to-rose-500",
  },
  {
    n: 20,
    title: "الدرس 20: Demonstratives — أسماء الإشارة",
    en: "This / That / These / Those",
    emoji: "🛰️",
    stats: `44 شريحة · 9 تحديات · Demonstrative Control Center`,
    href: "#/lesson/20",
    grad: "from-cyan-600 to-indigo-700",
  },
  {
    n: 21,
    title: "الدرس 21: There is / There are",
    en: "There is / There are",
    emoji: "🕵️",
    stats: `51 شريحة · 8 تحديات · Scene Detective Lab`,
    href: "#/lesson/21",
    grad: "from-emerald-600 to-teal-700",
  },
  {
    n: 22,
    title: "الدرس 22: Prepositions of Place",
    en: "Prepositions of Place",
    emoji: "🗺️",
    stats: `44 شريحة · 8 تحديات · The Position Lab`,
    href: "#/lesson/22",
    grad: "from-cyan-600 to-teal-700",
  },
  {
    n: 23,
    title: "الدرس 23: Countable & Uncountable Nouns",
    en: "Countable & Uncountable Nouns",
    emoji: "🧮",
    stats: `60 شريحة · 8 تدريبات · The Counting Lab`,
    href: "#/lesson/23",
    grad: "from-indigo-500 to-violet-600",
  },
  {
    n: 24,
    title: "الدرس 24: Quantifiers — أدوات الكمية",
    en: "Quantifiers",
    emoji: "🧪",
    stats: `64 قسمًا · 5 تدريبات · Quantity Lab`,
    href: "#/lesson/24",
    grad: "from-cyan-600 to-indigo-700",
  },
  {
    n: 25,
    title: "الدرس 25: Past Continuous — الماضي المستمر",
    en: "Past Continuous",
    emoji: "🎬",
    stats: `55 شريحة · 8 تمارين + IQ200 + Final Boss · THE PAST CAMERA`,
    href: "#/lesson/25",
    grad: "from-indigo-600 to-violet-700",
  },
  {
    n: 26,
    title: "الدرس 26: Past Simple vs Past Continuous",
    en: "Past Simple vs Past Continuous",
    emoji: "🎥",
    stats: `55 شريحة · 4 تمارين + IQ200 + Final Boss · THE TIME DIRECTOR`,
    href: "#/lesson/26",
    grad: "from-teal-500 to-orange-400",
  },
  {
    n: 27,
    title: "الدرس 27: Past Perfect — الماضي التام",
    en: "Past Perfect",
    emoji: "⏪",
    stats: `56 شريحة · 11 تمرينًا + اختبار 20 سؤالًا · THE FLASHBACK DIRECTOR`,
    href: "#/lesson/27",
    grad: "from-violet-600 to-indigo-500",
  },
  {
    n: 28,
    title: "الدرس 28: Past Perfect vs Past Simple",
    en: "Past Perfect vs Past Simple",
    emoji: "🧭",
    stats: `47 شريحة · 9 تحديات + اختبار 20 سؤالًا · THE TIMELINE MASTER`,
    href: "#/lesson/28",
    grad: "from-indigo-600 to-sky-500",
  },
  {
    n: 29,
    title: "الدرس 29: Past Perfect Continuous — الماضي التام المستمر",
    en: "Past Perfect Continuous",
    emoji: "⏳",
    stats: "44 قسمًا · 12 مختبرًا تفاعليًا · اختبار 20 سؤالًا · IQ200",
    href: "#/lesson/29",
    grad: "from-sky-600 to-violet-700",
  },
  {
    n: 30,
    title: "الدرس 30: مراجعة شاملة لنظام الماضي",
    en: "Past System Review — 4 Tenses",
    emoji: "🎛️",
    stats: "40 قسمًا مرقّمًا · 46 خطوة · مختبرات تفاعلية · اختبار 20 سؤالًا · IQ200",
    href: "#/lesson/30",
    grad: "from-indigo-600 to-sky-600",
  },
  {
    n: 31,
    title: "الدرس 31: Present Perfect — المضارع التام",
    en: "Present Perfect — The Present Bridge",
    emoji: "🌉",
    stats: "45 قسمًا مرقّمًا · 50 خطوة · مختبرات تفاعلية · اختبار 20 سؤالًا · IQ200",
    href: "#/lesson/31",
    grad: "from-teal-500 to-sky-600",
  },
  {
    n: 32,
    title: "الدرس 32: Present Perfect Continuous — المضارع التام المستمر",
    en: "Present Perfect Continuous — The Duration Stream",
    emoji: "🌊",
    stats: "36 قسمًا مرقّمًا · 120 صفحة قصيرة · تيّار المدة PAST→NOW · عدسة النتيجة/النشاط · اختبار 20 سؤالًا · IQ200",
    href: "#/lesson/32",
    grad: "from-cyan-500 to-indigo-600",
  },
  {
    n: 33,
    title: "الدرس 33: The Four Present Tenses",
    en: "المراجعة الشاملة لأزمنة الحاضر الأربعة — Present Tenses Mastery",
    emoji: "🧪",
    stats: "24 قسمًا مرقّمًا · 71 شريحة قصيرة · عدسة الأزمنة الأربعة · 3 مواجهات · اختبار 25 سؤالًا · IQ200",
    href: "#/lesson/33",
    grad: "from-sky-500 via-emerald-500 to-violet-600",
  },
  {
    n: 34,
    title: "الدرس 34: Future Simple — المستقبل البسيط باستخدام WILL",
    en: "Future Simple — The Future Starts Here!",
    emoji: "🚀",
    stats: "38 قسمًا مرقّمًا · 40 خطوة · Future Launchpad والوظائف الست · اختبار 25 سؤالًا · IQ200",
    href: "#/lesson/34",
    grad: "from-teal-600 to-sky-600",
  },
  {
    n: 35,
    title: "الدرس 35: BE GOING TO — الخطط والنوايا والتوقعات المستقبلية",
    en: "Future Plans, Intentions & Predictions · Future Garden Studio",
    emoji: "🌻",
    stats: "38 قسمًا مرقّمًا · 61 خطوة قصيرة · 5 مراحل · اختبار 25 سؤالًا · IQ200",
    href: "#/lesson/35",
    grad: "from-[#0f8f7d] to-[#2f7fe0]",
  },
  {
    n: 36,
    title: "الدرس 36: WILL vs BE GOING TO — القرارات والتوقعات المستقبلية",
    en: "Mastering Future Decisions & Predictions",
    emoji: "🧭",
    stats: "26 قسمًا مصدريًا · 27 خطوة طالب · مختبرات تفاعلية · اختبار 25 سؤالًا · حلول ومعلم",
    href: "#/lesson/36",
    grad: "from-[#0ea5e9] to-[#8b5cf6]",
  },
  {
    n: 37,
    title: "الدرس 37: Future Continuous — المستقبل المستمر",
    en: "What Will You Be Doing Tomorrow?",
    emoji: "🎥",
    stats: "38 قسمًا مرقّمًا · 58 خطوة قصيرة · مرصد الأفق المستقبلي · اختبار 25 سؤالًا · IQ200",
    href: "#/lesson/37",
    grad: "from-[#0ea5e9] to-[#14b8a6]",
  },
  {
    n: 38,
    title: "الدرس 38: Future Perfect — المستقبل التام",
    en: "By Tomorrow, I Will Have Finished!",
    emoji: "🔭",
    stats: "36 قسمًا مرقّمًا · 60 خطوة قصيرة · مرصد الإنجاز المستقبلي · اختبار 25 سؤالًا · IQ200",
    href: "#/lesson/38",
    grad: "from-[#1b3a5c] to-[#c9a227]",
  },
  {
    n: 39,
    title: "الدرس 39: Future Perfect Continuous — المستقبل التام المستمر",
    en: "How Long Will You Have Been Learning?",
    emoji: "⏳",
    stats: "39 قسمًا مرقّمًا · 75 خطوة · مرصد الزمن المستقبلي · for وsince وby the time · اختبار 25 سؤالًا · IQ200",
    href: "#/lesson/39",
    grad: "from-[#0b1428] to-[#35d3b4]",
  },
  {
    n: 40,
    title: "الدرس 40: Future Tenses Master Review — المراجعة الشاملة وإتقان أزمنة المستقبل",
    en: "The Future Tenses Grand Challenge 🚀",
    emoji: "🚀",
    stats: "29 قسمًا مرقّمًا · 30 خطوة · 10 مختبرات شاملة · اختبار 25 سؤالًا · IQ200",
    href: "#/lesson/40",
    grad: "from-[#17354a] to-[#245f62]",
  },
  {
    n: 41,
    title: "الدرس 41: Master Auxiliary Verbs — الإتقان الشامل للأفعال المساعدة",
    en: "The Hidden Engines of English Sentences",
    emoji: "⚙️",
    stats: "40 قسمًا · 120 شريحة قصيرة · BE / DO / HAVE · اختبار 25 سؤالًا",
    href: "#/lesson/41",
    grad: "from-sky-500 to-emerald-500",
  },
  {
    n: 42,
    title: "الدرس 42: CAN & COULD — القدرة، والإمكانية، والاستئذان، والطلبات المهذبة",
    en: "From Ability to Polite Communication",
    emoji: "🚀",
    stats: "44 قسمًا · 145 شريحة قصيرة · 17 مختبرًا تفاعليًا · اختبار 25 سؤالًا",
    href: "#/lesson/42",
    grad: "from-sky-500 to-emerald-500",
  },
  {
    n: 43,
    title: "الدرس 43: MAY & MIGHT — الاحتمال، وعدم اليقين، والاستئذان",
    en: "The Probability Observatory · Certainty, Uncertainty & Permission",
    emoji: "🔭",
    stats: "37 قسمًا · 38 خطوة · مستكشف الاحتمال وباني الجمل · اختبار 25 سؤالًا",
    href: "#/lesson/43",
    grad: "from-[#0E7C7B] to-[#B45309]",
  },
  {
    n: 44,
    title: "الدرس 44: MUST & HAVE TO — الضرورة، والإلزام، والقواعد، والمسؤوليات",
    en: "English Learning Studio · The Language of Necessity & Obligation",
    emoji: "⚖️",
    stats: "38 قسمًا · 39 خطوة · باني الجملة ومصنّف المنع · اختبار 25 سؤالًا",
    href: "#/lesson/44",
    grad: "from-[#2448D8] to-[#087F68]",
  },
  {
    n: 45,
    title: "الدرس 45: SHOULD & OUGHT TO — النصيحة والتوقعات ومراجعة الماضي",
    en: "The Art of Giving Smart Advice",
    emoji: "💡",
    stats: "42 خطوة · 11 محطة · مختبرات تفاعلية · اختبار نهائي 25 سؤالًا",
    href: "#/lesson/45",
    grad: "from-[#123F46] to-[#0F9C8E]",
  },
  {
    n: 46,
    title: "الدرس 46: MUSTN'T vs DON'T HAVE TO vs NEEDN'T — المنع وعدم الضرورة",
    en: "The Three Doors of Obligation",
    emoji: "🚪",
    stats: "39 خطوة · 18 محطة · مختبرات وتدريبات · اختبار 25 سؤالًا",
    href: "#/lesson/46",
    grad: "from-[#A53E2C] to-[#12685E]",
  },
  {
    n: 47,
    title: "الدرس 47: WOULD, WOULD LIKE & WOULD RATHER — الرغبات والتفضيلات والطلبات المهذبة",
    en: "The Art of Polite English",
    emoji: "🎟️",
    stats: "46 شريحة · 15 محطة · مختبرات وتدريبات · اختبار 25 سؤالًا",
    href: "#/lesson/47",
    grad: "from-[#8E2D54] to-[#B7791F]",
  },
  {
    n: 48,
    title: "الدرس 48: MODAL VERBS MASTER REVIEW — المراجعة الشاملة للأفعال الناقصة",
    en: "The Complete Modal Verbs Challenge — Choose the Right Meaning!",
    emoji: "🎯",
    stats: "52 شريحة · 18 محطة · Decision Map ومختبرات · اختبار 25 سؤالًا",
    href: "#/lesson/48",
    grad: "from-[#0A1C38] to-[#0E7490]",
  },
  {
    n: 49,
    title: "الدرس 49: MODAL PERFECT — الأفعال الناقصة مع HAVE + V3",
    en: "The Past Evidence File — Deduction, Regret and Missed Chances",
    emoji: "🗂️",
    stats: "52 شريحة · 22 محطة · Timeline وDetector ومختبرات · اختبار 25 سؤالًا",
    href: "#/lesson/49",
    grad: "from-[#21302F] to-[#9A6A1C]",
  },
  {
    n: 50,
    title: "الدرس 50: DEDUCTION & SPECULATION — الاستنتاج والتخمين في الحاضر والماضي",
    en: "The Deduction Lens — Evidence, Certainty and Time",
    emoji: "🔎",
    stats: "46 شريحة · 20 محطة · مقياس الثقة وعدستا الزمن ومختبرات · اختبار 25 سؤالًا",
    href: "#/lesson/50",
    grad: "from-[#1B1F3B] to-[#D97706]",
  },
  {
    n: 51,
    title: "الدرس 51: ZERO CONDITIONAL — الشرط الصفري",
    en: "The Law of Cause & Effect — General Facts and Fixed Results",
    emoji: "⚗️",
    stats: "48 شريحة · 22 محطة · مختبر السبب والنتيجة ومقياس التكرار · اختبار 25 سؤالًا",
    href: "#/lesson/51",
    grad: "from-[#0E3742] to-[#0E9F6E]",
  },
  {
    n: 52,
    title: "الدرس 52: FIRST CONDITIONAL — الشرط الأول",
    en: "Future Possibilities — If + Present Simple, Will + V1",
    emoji: "🌤️",
    stats: "64 شريحة · 21 محطة · 11 مختبرًا تفاعليًا · 6 تدريبات · اختبار 25 سؤالًا",
    href: "#/lesson/52",
    grad: "from-sky-500 to-emerald-500",
  },
  { n: 53, title: "الدرس 53: SECOND CONDITIONAL — الشرط الثاني", en: "Second Conditional — If + Past Simple, would + V1", emoji: "💭", stats: "8 تدريبات · اختبار 25 سؤالًا", href: "#/lesson/53", grad: "from-sky-500 to-emerald-500" },
  { n: 54, title: "الدرس 54: THIRD CONDITIONAL — الشرط الثالث", en: "Third Conditional — If + Past Perfect, would have + V3", emoji: "⏳", stats: "8 تدريبات · 58 سؤالًا · اختبار 25 سؤالًا", href: "#/lesson/54", grad: "from-violet-600 to-amber-500" },
  { n: 55, title: "الدرس 55: MIXED CONDITIONALS — الجمل الشرطية المختلطة", en: "Mixed Conditionals — Past and Present", emoji: "⏳", stats: "8 تدريبات · 46 سؤالًا · اختبار 25 سؤالًا", href: "#/lesson/55", grad: "from-teal-700 to-orange-600" },
  { n: 56, title: "الدرس 56: المراجعة الشاملة للجمل الشرطية", en: "Conditional Sentences Master Review", emoji: "◉", stats: "6 تدريبات · اختبار 15 سؤالًا", href: "#/lesson/56", grad: "from-teal-800 to-amber-500" },
  {
    n: 57,
    title: "الدرس 57: PASSIVE VOICE — FOUNDATIONS — المبني للمجهول: الأساسيات",
    en: "The Voice Shift Lab — Active ⇄ Passive",
    emoji: "⇄",
    stats: "54 خطوة · 10 محطات · 10 مختبرات تفاعلية · 10 تدريبات · اختبار 15 سؤالًا",
    href: "#/lesson/57",
    grad: "from-[#0d1729] to-[#b1214b]",
  },
  {
    n: 58,
    title: "الدرس 58: PASSIVE VOICE ACROSS TENSES — المبني للمجهول عبر الأزمنة",
    en: "The Tense Transformation Lab · Seven Tenses",
    emoji: "⚗",
    stats: "21 قسمًا · 9 تدريبات · 7 محطات تفاعلية · اختبار 15 سؤالًا",
    href: "#/lesson/58",
    grad: "from-[#0b2028] to-[#a1e0c4]",
  },
  {
    n: 59,
    title: "الدرس 59: ADVANCED PASSIVE — WITH MODALS AND ADVANCED STRUCTURES",
    en: "Advanced Passive — Control Room · Modals & Advanced Structures",
    emoji: "🎛️",
    stats: "11 قسمًا · 33 موضوعًا · 9 تدريبات · 10 مختبرات · اختبار أصلي 25 سؤالًا + اختبار 15 سؤالًا",
    href: "#/lesson/59",
    grad: "from-[#070f1d] to-[#ffc45c]",
  },
  {
    n: 60,
    title: "الدرس 60: REPORTED SPEECH — STATEMENTS — الكلام المنقول",
    en: "The Communication & Story Transfer Studio · Statements",
    emoji: "🗣️",
    stats: "17 قسمًا · 39 موضوعًا · 8 تدريبات · 9 مختبرات · اختبار أصلي 25 سؤالًا + اختبار 15 سؤالًا",
    href: "#/lesson/60",
    grad: "from-[#221a38] to-[#c26a1b]",
  },
  {
    n: 61,
    title: "الدرس 61: REPORTED SPEECH — QUESTIONS, COMMANDS AND REQUESTS",
    en: "Communication Control Room · Questions & Instructions",
    emoji: "📡",
    stats: "16 قسمًا · 8 تدريبات · 10 مختبرات · اختبار أصلي 25 سؤالًا + اختبار 15 سؤالًا",
    href: "#/lesson/61",
    grad: "from-[#123d2f] to-[#a4ca42]",
  },
  {
    n: 62,
    title: "الدرس 62: REPORTING VERBS — أفعال نقل الكلام المتقدمة",
    en: "The Verb Choice Studio · Precision in Reporting",
    emoji: "🎯",
    stats: "21 قسمًا · 8 تدريبات · 53 بندًا · اختبار أصلي 25 سؤالًا + اختبار 15 سؤالًا",
    href: "#/lesson/62",
    grad: "from-[#4c1d95] to-[#7c3aed]",
  },
];

function LessonCard({ c, i }: { c: Card; i: number }) {
  const inner = (
    <>
      <div className={`h-2 w-full bg-gradient-to-l ${c.grad}`} />
      <div className="p-6">
        <div className="flex items-start justify-between">
          <span className={`font-head grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c.grad} text-xl font-bold text-white shadow`}>{c.n}</span>
          <span className={`text-4xl ${c.locked ? "grayscale" : "anim-float"}`}>{c.emoji}</span>
        </div>
        <h2 className="font-head mt-5 text-2xl font-bold text-slate-900">{c.title}</h2>
        <div className="font-en mt-1 text-left text-slate-500" dir="ltr">
          {c.en}
        </div>
        {c.stats && <div className="mt-4 text-sm font-semibold text-slate-400">{c.stats}</div>}
        {c.locked ? (
          <div className="mt-6 rounded-xl bg-slate-100 px-4 py-2.5 text-center text-sm font-bold text-slate-400">سيُضاف لاحقًا</div>
        ) : (
          <div className="mt-6 rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-bold text-white transition group-hover:bg-slate-700">ابدأ الدرس ←</div>
        )}
      </div>
    </>
  );

  const cls = `pop pop-${i + 1} group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition ${
    c.locked ? "opacity-70" : "hover:-translate-y-1 hover:shadow-xl"
  }`;

  return c.locked ? (
    <div className={cls}>{inner}</div>
  ) : (
    <a href={c.href} className={cls}>
      {inner}
    </a>
  );
}

function Hub({ currentLesson }: { currentLesson: number | null }) {
  return (
    <div className="font-body relative min-h-screen bg-[#f4f6fb] text-slate-800">
      <SignatureGhost />
      <div className="lesson-content-container relative z-10 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="text-center">
          <div className="pop text-6xl anim-float">📚</div>
          <div className="pop pop-1 mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
            <span className="text-lg">🌐</span>
            <span dir="ltr" className="font-en text-sm font-extrabold tracking-wide text-slate-700">EnglishwithSomeR</span>
          </div>
          <h1 className="pop pop-2 font-head mt-3 text-4xl font-bold text-slate-900 md:text-5xl">دروس اللغة الإنجليزية</h1>
          <p className="pop pop-3 mt-3 text-lg text-slate-500">المستوى الأساسي · اختر الدرس لبدء الشرح</p>
        </header>

        {/* شريط أرقام الدروس — نافذة منزلقة تعرض 10 أرقام كحد أقصى، والسهمان يحرّكانها رقمًا واحدًا */}
        <LessonNumberNav
          items={CARDS}
          current={currentLesson}
          currentLabel="آخر درس فتحته"
          className="pop pop-3 mt-10"
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CARDS.map((c, i) => (
            <LessonCard key={c.n} c={c} i={i} />
          ))}
        </div>
      </div>
      <Signature />
    </div>
  );
}

export default function App() {
  const route = useRoute();
  // آخر درس تم فتحه في هذه الجلسة — يبقي نافذة أرقام الدروس على الدرس
  // الذي كان الطالب فيه عند عودته إلى الصفحة الرئيسية (يبدأ من 1–10 دائمًا).
  const [lastLesson, setLastLesson] = useState(() => route);
  useEffect(() => {
    if (route > 0) setLastLesson(route);
  }, [route]);
  // كل درس 1–62 يُحمَّل عند الطلب عبر React.lazy داخل LazyLessonHost
  // (انظر src/lessons/loaders.ts)؛ الفهرس لا يجلب أي درس مسبقًا.
  const isLessonRoute = route >= 1 && route <= CARDS.length;
  const page: React.ReactNode = isLessonRoute ? (
    <LazyLessonHost route={route} onExit={goHome} />
  ) : (
    <Hub currentLesson={lastLesson || null} />
  );
  // عزل الدرس وحده داخل حدّ الأخطاء (ضمن LazyLessonHost): الفهرس وبوابة
  // كلمة المرور وشارة القفل تبقى خارجه، لذلك لا يسقط الموقع كله إذا انهار
  // درس واحد أو فشل تحميل الـ chunk الخاص به.
  return (
    <SitePasswordGate>
      <ArenaClean />
      {page}
    </SitePasswordGate>
  );
}
