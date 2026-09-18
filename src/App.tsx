import { useEffect, useState } from "react";
import Lesson1 from "./lessons/lesson1/Lesson1";
import Lesson2 from "./lessons/lesson2/Lesson2";
import Lesson3 from "./lessons/lesson3/Lesson3";
import Lesson4 from "./lessons/lesson4/Lesson4";
import Lesson5 from "./lessons/lesson5/Lesson5";
import Lesson6 from "./lessons/lesson6/Lesson6";
import Lesson7 from "./lessons/lesson7/Lesson7";
import Lesson8 from "./lessons/lesson8/Lesson8";
import Lesson9 from "./lessons/lesson9/Lesson9";
import Lesson10 from "./lessons/lesson10/Lesson10";
import Lesson11 from "./lessons/lesson11/Lesson11";
import Lesson12 from "./lessons/lesson12/Lesson12";
import Lesson13 from "./lessons/lesson13/Lesson13";
import Lesson14 from "./lessons/lesson14/Lesson14";
import Lesson15 from "./lessons/lesson15/Lesson15";
import Lesson16 from "./lessons/lesson16/Lesson16";
import Lesson17 from "./lessons/lesson17/Lesson17";
import Lesson18 from "./lessons/lesson18/Lesson18";
import Lesson19 from "./lessons/lesson19/Lesson19";
import Lesson20 from "./lessons/lesson20/Lesson20";
import Lesson21 from "./lessons/lesson21/Lesson21";
import Lesson22 from "./lessons/lesson22/Lesson22";
import Lesson23 from "./lessons/lesson23/Lesson23";
import Lesson24 from "./lessons/lesson24/Lesson24";
import ArenaClean from "./shared/ArenaClean";
import { SLIDES as L1_SLIDES } from "./lessons/lesson1/data";
import { SLIDES as L2_SLIDES } from "./lessons/lesson2/data";
import { SLIDES as L3_SLIDES } from "./lessons/lesson3/data";
import { SLIDES as L4_SLIDES } from "./lessons/lesson4/data";
import { SLIDES as L5_SLIDES } from "./lessons/lesson5/data";
import { SLIDES as L6_SLIDES } from "./lessons/lesson6/data";
import { SLIDES as L7_SLIDES } from "./lessons/lesson7/data";
import { SLIDES as L8_SLIDES } from "./lessons/lesson8/data";
import { SLIDES as L9_SLIDES } from "./lessons/lesson9/data";
import { SLIDES as L10_SLIDES } from "./lessons/lesson10/data";
import { SLIDES as L11_SLIDES } from "./lessons/lesson11/data";
import { SLIDES as L12_SLIDES } from "./lessons/lesson12/data";
import { SLIDES as L13_SLIDES } from "./lessons/lesson13/data";
import { SLIDES as L14_SLIDES } from "./lessons/lesson14/data";
import { SLIDES as L15_SLIDES } from "./lessons/lesson15/data";
import { SLIDES as L16_SLIDES } from "./lessons/lesson16/data";
import { SLIDES as L17_SLIDES } from "./lessons/lesson17/data";
import { SLIDES as L18_SLIDES } from "./lessons/lesson18/data";
import { SLIDES as L19_SLIDES } from "./lessons/lesson19/data";
import { SLIDES as L20_SLIDES } from "./lessons/lesson20/data";
import { SLIDES as L21_SLIDES } from "./lessons/lesson21/data";
import { SLIDES as L22_SLIDES } from "./lessons/lesson22/data";
import { SLIDES as L23_SLIDES } from "./lessons/lesson23/data";
import { SLIDES as L24_SLIDES } from "./lessons/lesson24/data";
import { Signature, SignatureGhost } from "./shared/Signature";
import SitePasswordGate from "./shared/SitePasswordGate";

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

const CARDS: Card[] = [
  {
    n: 1,
    title: "تكوين الجملة الإنجليزية",
    en: "Sentence Structure",
    emoji: "🧱",
    stats: `${L1_SLIDES.length} شريحة · 4 تمارين تفاعلية`,
    href: "#/lesson/1",
    grad: "from-sky-500 to-emerald-500",
  },
  {
    n: 2,
    title: "الضمائر و Verb to be",
    en: "Pronouns + am / is / are",
    emoji: "🙋",
    stats: `${L2_SLIDES.length} شريحة · 5 تمارين تفاعلية`,
    href: "#/lesson/2",
    grad: "from-rose-400 to-orange-400",
  },
  {
    n: 3,
    title: "الإثبات والنفي والسؤال مع Verb to be",
    en: "Affirmative · Negative · Question · Short Answers",
    emoji: "🔥",
    stats: `${L3_SLIDES.length} شريحة · 5 تمارين تفاعلية · آلة تحويل حيّة`,
    href: "#/lesson/3",
    grad: "from-emerald-500 to-indigo-500",
  },
  {
    n: 4,
    title: "الأسماء وأدوات التعريف",
    en: "Nouns + a / an / the",
    emoji: "🔤",
    stats: `${L4_SLIDES.length} شريحة · 6 تمارين · آلة الأدوات وكاشف الصوت`,
    href: "#/lesson/4",
    grad: "from-amber-500 to-emerald-500",
  },
  {
    n: 5,
    title: "الصفات والجملة الوصفية",
    en: "Adjectives + Verb to be",
    emoji: "🎨",
    stats: `${L5_SLIDES.length} شريحة · 8 تمارين · ورشة الجملة الوصفية`,
    href: "#/lesson/5",
    grad: "from-violet-500 to-sky-500",
  },
  {
    n: 6,
    title: "المضارع البسيط",
    en: "Present Simple",
    emoji: "⏰",
    stats: `${L6_SLIDES.length} شريحة · 6 تمارين · آلة التصريف وسلّم التكرار`,
    href: "#/lesson/6",
    grad: "from-teal-500 to-fuchsia-500",
  },
  {
    n: 7,
    title: "النفي والسؤال مع Do و Does",
    en: "Present Simple · Negative & Questions",
    emoji: "🎭",
    stats: `${L7_SLIDES.length} شريحة · 7 تمارين · آلة اختفاء الـ s`,
    href: "#/lesson/7",
    grad: "from-rose-500 to-violet-500",
  },
  {
    n: 8,
    title: "مراجعة شاملة للمضارع البسيط",
    en: "Present Simple · Full Review · IQ200",
    emoji: "🧠",
    stats: `${L8_SLIDES.length} شريحة · 10 مستويات · محقق لغوي وتحدي الأستاذ`,
    href: "#/lesson/8",
    grad: "from-indigo-500 to-amber-500",
  },
  {
    n: 9,
    title: "المضارع المستمر",
    en: "Present Continuous",
    emoji: "🎬",
    stats: `${L9_SLIDES.length} شريحة · 6 تمارين · قواعد ing وآلة المشاهد الحية`,
    href: "#/lesson/9",
    grad: "from-cyan-500 to-violet-500",
  },
  {
    n: 10,
    title: "المضارع المستمر المتقدم",
    en: "Present Continuous · Advanced Uses",
    emoji: "📘",
    stats: `${L10_SLIDES.length} شريحة · 9 مستويات · IQ200 وGrammar Detective`,
    href: "#/lesson/10",
    grad: "from-cyan-500 to-indigo-500",
  },
  {
    n: 11,
    title: "المضارع البسيط مقابل المستمر",
    en: "Present Simple vs Present Continuous",
    emoji: "⚖️",
    stats: `${L11_SLIDES.length} شريحة · 11 مستوى · IQ200 وGrammar Detective`,
    href: "#/lesson/11",
    grad: "from-indigo-500 to-cyan-500",
  },
  {
    n: 12,
    title: "الماضي البسيط",
    en: "Past Simple",
    emoji: "🕰️",
    stats: `${L12_SLIDES.length} شريحة · 11 مستوى · IQ200 وGrammar Detective`,
    href: "#/lesson/12",
    grad: "from-orange-500 to-rose-500",
  },
  {
    n: 13,
    title: "الماضي البسيط — النفي والأسئلة",
    en: "Past Simple — did / didn't",
    emoji: "❓",
    stats: `${L13_SLIDES.length} شريحة · 10 مستويات · صائد الأخطاء وIQ200`,
    href: "#/lesson/13",
    grad: "from-amber-500 to-orange-500",
  },
  {
    n: 14,
    title: "الدرس 14: Past Simple — Wh Questions والتطبيق الشامل",
    en: "Past Simple — Wh Questions + Comprehensive Application",
    emoji: "🧭",
    stats: `${L14_SLIDES.length} شريحة · 4 مستويات · Grammar Detective وIQ200`,
    href: "#/lesson/14",
    grad: "from-violet-500 to-fuchsia-500",
  },
  {
    n: 15,
    title: "الدرس 15: Past Simple of Verb to be — was / were",
    en: "Past Simple of Verb to be — was / were",
    emoji: "🟠",
    stats: `${L15_SLIDES.length} شريحة · 6 مستويات · Was/Were Control Center وGrammar Detective`,
    href: "#/lesson/15",
    grad: "from-amber-500 to-orange-500",
  },
  {
    n: 16,
    title: "الدرس 16: Possessive Adjectives — صفات الملكية",
    en: "Possessive Adjectives — my / your / his / her / its / our / their",
    emoji: "🏠",
    stats: `${L16_SLIDES.length} شريحة · 11 مستوى · Ownership Detective وIQ200`,
    href: "#/lesson/16",
    grad: "from-teal-500 to-emerald-500",
  },
  {
    n: 17,
    title: "الدرس 17: Possessive Pronouns — ضمائر الملكية",
    en: "Possessive Pronouns — mine / yours / his / hers / ours / theirs",
    emoji: "🔬",
    stats: `${L17_SLIDES.length} شريحة · 6 مستويات · Transformation Machine وWhose? Lab`,
    href: "#/lesson/17",
    grad: "from-indigo-500 to-amber-500",
  },
  {
    n: 18,
    title: "الدرس 18: Plural Nouns — جمع الأسماء",
    en: "Plural Nouns — Regular & Irregular Plurals",
    emoji: "🔢",
    stats: `${L18_SLIDES.length} شريحة · 8 تحديات · Transformation Machine وMonster Zone`,
    href: "#/lesson/18",
    grad: "from-teal-500 to-cyan-600",
  },
  {
    n: 19,
    title: "الدرس 19: Possessive Nouns — ملكية الأسماء",
    en: "Possessive Nouns — 's / s' / Irregular Plurals",
    emoji: "🕵️",
    stats: `${L19_SLIDES.length} شريحة · 7 تحديات · Apostrophe Machine وThree-System Machine`,
    href: "#/lesson/19",
    grad: "from-amber-400 to-rose-500",
  },
  {
    n: 20,
    title: "الدرس 20: Demonstratives — أسماء الإشارة",
    en: "This / That / These / Those",
    emoji: "🛰️",
    stats: `${L20_SLIDES.length} شريحة · 9 تحديات · Demonstrative Control Center`,
    href: "#/lesson/20",
    grad: "from-cyan-600 to-indigo-700",
  },
  {
    n: 21,
    title: "الدرس 21: There is / There are",
    en: "There is / There are",
    emoji: "🕵️",
    stats: `${L21_SLIDES.length} شريحة · 8 تحديات · Scene Detective Lab`,
    href: "#/lesson/21",
    grad: "from-emerald-600 to-teal-700",
  },
  {
    n: 22,
    title: "الدرس 22: Prepositions of Place",
    en: "Prepositions of Place",
    emoji: "🗺️",
    stats: `${L22_SLIDES.length} شريحة · 8 تحديات · The Position Lab`,
    href: "#/lesson/22",
    grad: "from-cyan-600 to-teal-700",
  },
  {
    n: 23,
    title: "الدرس 23: Countable & Uncountable Nouns",
    en: "Countable & Uncountable Nouns",
    emoji: "🧮",
    stats: `${L23_SLIDES.length} شريحة · 8 تدريبات · The Counting Lab`,
    href: "#/lesson/23",
    grad: "from-indigo-500 to-violet-600",
  },
  {
    n: 24,
    title: "الدرس 24: Quantifiers — أدوات الكمية",
    en: "Quantifiers",
    emoji: "🧪",
    stats: `${L24_SLIDES.length} قسمًا · 5 تدريبات · Quantity Lab`,
    href: "#/lesson/24",
    grad: "from-cyan-600 to-indigo-700",
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

function Hub() {
  return (
    <div className="font-body relative min-h-screen bg-[#f4f6fb] text-slate-800">
      <SignatureGhost />
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-14 md:py-20">
        <header className="text-center">
          <div className="pop text-6xl anim-float">📚</div>
          <div className="pop pop-1 mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
            <span className="text-lg">🌐</span>
            <span dir="ltr" className="font-en text-sm font-extrabold tracking-wide text-slate-700">EnglishwithSomeR</span>
          </div>
          <h1 className="pop pop-2 font-head mt-3 text-4xl font-bold text-slate-900 md:text-5xl">دروس اللغة الإنجليزية</h1>
          <p className="pop pop-3 mt-3 text-lg text-slate-500">المستوى الأساسي · اختر الدرس لبدء الشرح</p>
        </header>

        {/* مسار التسلسل */}
        <div className="pop pop-3 mx-auto mt-10 flex max-w-md items-center justify-center gap-2 text-sm font-bold text-slate-400">
          {CARDS.map((ci, idx) => (
            <span key={ci.n} className="flex flex-1 items-center gap-2 last:flex-none">
              <span className={`grid h-8 w-8 place-items-center rounded-full shadow-sm ${ci.locked ? "bg-white text-slate-400" : "bg-slate-900 text-white"}`}>{ci.n}</span>
              {idx < CARDS.length - 1 && <span className="h-px flex-1 bg-slate-300" />}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
  let page: React.ReactNode;
  if (route === 1) page = <Lesson1 onExit={goHome} />;
  else if (route === 2) page = <Lesson2 onExit={goHome} />;
  else if (route === 3) page = <Lesson3 onExit={goHome} />;
  else if (route === 4) page = <Lesson4 onExit={goHome} />;
  else if (route === 5) page = <Lesson5 onExit={goHome} />;
  else if (route === 6) page = <Lesson6 onExit={goHome} />;
  else if (route === 7) page = <Lesson7 onExit={goHome} />;
  else if (route === 8) page = <Lesson8 onExit={goHome} />;
  else if (route === 9) page = <Lesson9 onExit={goHome} />;
  else if (route === 10) page = <Lesson10 onExit={goHome} />;
  else if (route === 11) page = <Lesson11 onExit={goHome} />;
  else if (route === 12) page = <Lesson12 onExit={goHome} />;
  else if (route === 13) page = <Lesson13 onExit={goHome} />;
  else if (route === 14) page = <Lesson14 onExit={goHome} />;
  else if (route === 15) page = <Lesson15 onExit={goHome} />;
  else if (route === 16) page = <Lesson16 onExit={goHome} />;
  else if (route === 17) page = <Lesson17 onExit={goHome} />;
  else if (route === 18) page = <Lesson18 onExit={goHome} />;
  else if (route === 19) page = <Lesson19 onExit={goHome} />;
  else if (route === 20) page = <Lesson20 onExit={goHome} />;
  else if (route === 21) page = <Lesson21 onExit={goHome} />;
  else if (route === 22) page = <Lesson22 onExit={goHome} />;
  else if (route === 23) page = <Lesson23 onExit={goHome} />;
  else if (route === 24) page = <Lesson24 onExit={goHome} />;
  else page = <Hub />;
  return (
    <SitePasswordGate>
      <ArenaClean />
      {page}
    </SitePasswordGate>
  );
}
