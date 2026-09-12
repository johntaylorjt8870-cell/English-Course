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
import { Signature, SignatureGhost } from "./shared/Signature";

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
            <span dir="ltr" className="font-en text-sm font-extrabold tracking-wide text-slate-700">englishwithsommer</span>
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
  else page = <Hub />;
  return (
    <>
      <ArenaClean />
      {page}
    </>
  );
}
