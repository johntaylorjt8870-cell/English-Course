import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { En41, Text41, Frame41, SourceLines41, NumberCards41, Note41, Tip41, Panel41 } from "./design";
import { SLIDES_41, STATIONS_41, type Slide41 } from "./slides41";
import { sectionLines41, sectionTitle41 } from "./ledger41";
import { RoleLab41, EngineLab41, BeLab41, DoLab41, HaveLab41, ChainLab41, PracticeSet41, Reading41, WritingMission41, Workspace41Provider } from "./kit41";
import { TestArea41, type TestResult41 } from "./TestArea41";
import { TeacherArea41 } from "./TeacherArea41";
import type { TestAnswers41 } from "./testData41";

const SolutionsArea41 = lazy(() => import("./SolutionsArea41"));

// ============================================================
// الغلاف — نفس بنية غلاف الدروس الأولى: تميمة كبيرة، شارة الدرس،
// عنوان عربي/إنجليزي، وصيغة مبنية من رقاقات ملوّنة.
// ============================================================
function Cover41({ slide }: { slide: Slide41 }) {
  const lines = sectionLines41(slide.section).slice(slide.range![0], slide.range![1] + 1);
  // "الإتقان الشامل … — BE / DO / HAVE": keep the Arabic heading and the Latin
  // engine list on separate lines so the separator never dangles at a wrap.
  const [titleArabic, titleLatin] = lines[0].split(/\s+—\s+/);
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-12">
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sky-100 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-violet-100 blur-3xl" aria-hidden="true" />
      <div className="relative">
        <div className="pop text-7xl anim-drift" aria-hidden="true">
          {slide.mascot}
        </div>
        <div className="pop pop-1 mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">
          <Text41 text="الدرس 41" />
          <span className="text-white/50">·</span>
          <span dir="ltr" className="font-en">IQ200</span>
        </div>
        <h1 className="pop pop-2 font-head mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          <Text41 text={titleArabic} />
          {titleLatin && (
            <span dir="ltr" className="font-en mt-2 block text-2xl font-extrabold tracking-wide text-slate-800 md:text-4xl">
              {titleLatin}
            </span>
          )}
        </h1>
        <p className="pop pop-3 mt-3 text-xl font-bold text-slate-700 md:text-2xl">
          <Text41 text={lines[1]} />
        </p>
        <p dir="ltr" className="pop pop-3 font-en mt-1 text-lg font-semibold text-violet-700">
          {lines[2]}
        </p>
        <div className="pop pop-4 mt-7 flex flex-wrap items-center justify-center gap-3" dir="ltr">
          {[
            { name: "BE", ar: "البناء والربط", tone: "bg-sky-700" },
            { name: "DO", ar: "السؤال والنفي", tone: "bg-orange-800" },
            { name: "HAVE", ar: "الأزمنة التامة", tone: "bg-emerald-800" },
          ].map((engine) => (
            <div key={engine.name} className={`rounded-2xl ${engine.tone} px-6 py-3 text-white shadow-md`}>
              <div className="font-en text-2xl font-extrabold md:text-3xl">{engine.name}</div>
              <div dir="rtl" className="text-sm font-bold">
                {engine.ar}
              </div>
            </div>
          ))}
        </div>
        <p className="pop pop-5 mt-7 text-base text-slate-500">
          للتنقل: الأسهم ← → أو الأزرار أسفل الشريحة · {SLIDES_41.length} شريحة قصيرة
        </p>
      </div>
    </section>
  );
}

// ============================================================
// خمس جمل — كل جملة تكشف محركها
// ============================================================
const FIVE = [
  { aux: "—", fn: "لا يوجد فعل مساعد ظاهر: Present Simple بفعل رئيسي عادي.", tone: "border-slate-200 bg-slate-50 text-slate-700" },
  { aux: "is", fn: "BE مساعد يبني Present Continuous مع V-ing.", tone: "border-sky-200 bg-sky-50 text-sky-900" },
  { aux: "has", fn: "HAVE مساعد يبني Present Perfect مع V3.", tone: "border-emerald-200 bg-emerald-50 text-emerald-900" },
  { aux: "Does", fn: "DO مساعد يبني سؤال Present Simple، والفعل يعود V1.", tone: "border-orange-200 bg-orange-50 text-orange-900" },
  { aux: "doesn't", fn: "DO مساعد يبني النفي؛ علامة المفرد انتقلت إليه فاختفى حرف s.", tone: "border-rose-200 bg-rose-50 text-rose-900" },
];

function FiveSentences41({ slide }: { slide: Slide41 }) {
  const lines = sectionLines41(slide.section).slice(slide.range![0], slide.range![1] + 1);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Frame41 mascot={slide.mascot} badge={slide.badge} title={slide.title} lead={lines[0]} step={SLIDES_41.findIndex((s) => s.id === slide.id) + 1}>
      <div className="grid gap-2.5">
        {lines.slice(1).map((line, i) => {
          const meta = FIVE[i] ?? FIVE[0];
          const sentence = line.replace(/^[①②③④⑤]\s*/, "");
          const active = open === i;
          return (
            <div key={line}>
              <button
                type="button"
                aria-expanded={active}
                onClick={() => setOpen(active ? null : i)}
                className={`w-full rounded-2xl border-2 p-3 text-right transition ${active ? meta.tone : "border-slate-200 bg-white hover:border-violet-300"}`}
              >
                <span className="flex flex-wrap items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-900 text-sm font-bold text-white">{i + 1}</span>
                  <span dir="ltr" className="font-en text-xl font-bold text-slate-900 md:text-2xl">
                    {sentence}
                  </span>
                  <span className="mr-auto rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-600">
                    {active ? "إخفاء المحرك" : "ما المحرك هنا؟"}
                  </span>
                </span>
              </button>
              {active && (
                <p className={`mt-1 rounded-2xl px-3 py-2 text-base font-semibold ${meta.tone}`}>
                  <Text41 text={`${meta.aux === "—" ? "لا يوجد مساعد" : `المساعد: ${meta.aux}`} — ${meta.fn}`} />
                </p>
              )}
            </div>
          );
        })}
      </div>
      <Note41 emoji="🧠">
        <Text41 text="جميع الجمل تتحدث عن الفعل نفسه: study. ما يتغير هو الفعل المساعد الذي يبني الزمن أو السؤال أو النفي." />
      </Note41>
    </Frame41>
  );
}

// ============================================================
// جسم الشريحة حسب نوعها
// ============================================================
function SlideBody({
  slide,
  index,
  answers,
  changeAnswer,
  submitted,
  graded,
  onSubmit,
  onReset,
  teacherUnlocked,
  unlockTeacher,
  lockTeacher,
}: {
  slide: Slide41;
  index: number;
  answers: TestAnswers41;
  changeAnswer: (key: string, value: string) => void;
  submitted: boolean;
  graded: TestResult41 | null;
  onSubmit: (result: TestResult41) => void;
  onReset: () => void;
  teacherUnlocked: boolean;
  unlockTeacher: () => void;
  lockTeacher: () => void;
}) {
  if (slide.kind === "cover") return <Cover41 slide={slide} />;
  if (slide.kind === "five") return <FiveSentences41 slide={slide} />;

  if (slide.kind === "lab") {
    const lab = {
      roles: <RoleLab41 />,
      engines: <EngineLab41 />,
      be: <BeLab41 />,
      do: <DoLab41 />,
      have: <HaveLab41 />,
      chain: <ChainLab41 />,
    }[slide.lab!];
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone={slide.tone ?? "violet"}>
        {lab}
      </Frame41>
    );
  }

  if (slide.kind === "practice") {
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone={slide.tone ?? "violet"}>
        <PracticeSet41 section={slide.practice!} from={slide.items![0]} to={slide.items![1]} />
      </Frame41>
    );
  }

  if (slide.kind === "reading") {
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone="sky">
        <Reading41 part={slide.readingPart!} />
      </Frame41>
    );
  }

  if (slide.kind === "test") {
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead}>
        <TestArea41 answers={answers} change={changeAnswer} submitted={submitted} level={slide.testLevel!} itemRange={slide.testItems} onSubmit={onSubmit} />
      </Frame41>
    );
  }

  if (slide.kind === "testResult") {
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead}>
        {!submitted || !graded ? (
          <Panel41 title="لم يتم التسليم بعد">
            <p className="text-base leading-8 text-slate-700">
              <Text41 text="أكمل المستويات الخمسة ثم اضغط «تسليم الاختبار النهائي» في نهاية المستوى الخامس. لا تظهر النتيجة ولا الحلول قبل التسليم." />
            </p>
            <p className="mt-2 text-sm font-bold text-slate-500">
              <Text41 text="الإجابات المكتملة:" /> <bdi dir="ltr">{Object.values(answers).filter(Boolean).length}</bdi>
            </p>
          </Panel41>
        ) : (
          <>
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
              <p className="text-2xl font-extrabold text-emerald-900">
                <Text41 text="نتيجتك:" /> <bdi dir="ltr">{graded.score} / {graded.total}</bdi> · <bdi dir="ltr">{Math.round((graded.score / graded.total) * 100)}%</bdi>
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                <Text41
                  text={
                    graded.score === graded.total
                      ? "علامة كاملة. راجع الحلول لتثبيت سبب كل إجابة."
                      : graded.score >= 20
                        ? "نتيجة قوية. راجع الأسئلة غير الصحيحة فقط."
                        : "راجع الشرائح المرتبطة بالأسئلة غير الصحيحة ثم أعد الاختبار."
                  }
                />
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={onReset} className="rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-900">
                  <Text41 text="إعادة الاختبار ومسح الإجابات" />
                </button>
              </div>
            </div>
            <Suspense fallback={<p role="status" className="rounded-2xl bg-white p-4 text-sm font-bold text-slate-500"><Text41 text="جارٍ تحميل الحلول…" /></p>}>
              <SolutionsArea41 answers={answers} />
            </Suspense>
          </>
        )}
      </Frame41>
    );
  }

  if (slide.kind === "teacher") {
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead}>
        <TeacherArea41 unlocked={teacherUnlocked} unlock={unlockTeacher} lock={lockTeacher} />
      </Frame41>
    );
  }

  if (slide.kind === "writing") {
    const lines = sectionLines41(slide.section).slice(slide.range![0], slide.range![1] + 1);
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone="emerald">
        <SourceLines41 lines={lines} />
        {slide.writingPart !== "model" && <WritingMission41 part={slide.writingPart ?? "editor"} />}
        {slide.writingPart === "model" && (
          <Note41 emoji="✍️">
            <Text41 text="النموذج ثماني جمل فقط، ولا يتضمن DID للتأكيد ولا السؤالين المطلوبين. استخدمه كإلهام جزئي، واكتب فقرتك الكاملة بنفسك." />
          </Note41>
        )}
      </Frame41>
    );
  }

  if (slide.kind === "summary") {
    const lines = sectionLines41(slide.section).slice(slide.range![0], slide.range![1] + 1);
    const meta = {
      be: { name: "BE", ar: "الربط · الاستمرار · المبني للمجهول", tone: "border-sky-200 bg-sky-50 text-sky-900", emoji: "🏗️" },
      do: { name: "DO", ar: "السؤال · النفي · التأكيد", tone: "border-orange-200 bg-orange-50 text-orange-900", emoji: "❓" },
      have: { name: "HAVE", ar: "الأزمنة التامة · الامتلاك", tone: "border-emerald-200 bg-emerald-50 text-emerald-900", emoji: "⏳" },
    }[slide.summaryPart ?? "be"];
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} tone="orange">
        <div className={`flex items-center justify-between rounded-2xl border-2 p-3 ${meta.tone}`}>
          <div>
            <En41 className="text-2xl font-extrabold">{meta.name}</En41>
            <p className="mt-1 text-xs font-bold">{meta.ar}</p>
          </div>
          <span className="text-2xl" aria-hidden="true">
            {meta.emoji}
          </span>
        </div>
        <SourceLines41 lines={lines} />
        {slide.summaryPart === "have" && (
          <Note41 emoji="🥇">
            <Text41 text="القاعدة الأهم: استخدم المساعد الأول عند السؤال والنفي، وأضف DO/DOES/DID فقط عندما لا يوجد مساعد ظاهر." />
          </Note41>
        )}
      </Frame41>
    );
  }

  if (slide.kind === "next") {
    const lines = sectionLines41(slide.section).slice(slide.range![0], slide.range![1] + 1);
    return (
      <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} tone="emerald">
        {slide.id === "next-progress" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between text-sm font-bold text-slate-600">
              <span>التقدم الكلي</span>
              <bdi dir="ltr">41 / 120</bdi>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-violet-400 to-emerald-500" style={{ width: `${(41 / 120) * 100}%` }} />
            </div>
          </div>
        )}
        <SourceLines41 lines={lines} />
        {slide.id === "next-can" && (
          <div className="flex flex-wrap gap-2">
            <a href="#/lesson/42" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
              الدرس 42: <En41>CAN &amp; COULD</En41> ←
            </a>
            <a href="#/lesson/41" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600">
              إعادة الدرس من البداية
            </a>
          </div>
        )}
        {slide.id === "next-close" && (
          <Note41 emoji="🎓">
            <Text41 text="راجع خريطة التقدم، ثم انتقل إلى الدرس القادم لتبدأ استخدام محركات الجملة في التعبير عن القدرة والإمكانية." />
          </Note41>
        )}
      </Frame41>
    );
  }

  // شريحة درس عادية: كل أسطر القسم المحددة تُعرض كاملة داخل الشريحة.
  const lines = sectionLines41(slide.section).slice(slide.range![0], slide.range![1] + 1);
  const numbered = lines.filter((line) => /^[①-⑩]/.test(line));
  const plain = lines.filter((line) => !/^[①-⑩]/.test(line));
  const isSteps = slide.variant === "steps";
  return (
    <Frame41 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone={slide.tone ?? "violet"}>
      <p className="text-xs font-bold text-slate-500">
        <Text41 text={`القسم ${slide.section === 0 ? "الافتتاحي" : slide.section} · ${sectionTitle41(slide.section)}`} />
      </p>
      {(isSteps || slide.variant === "objectives") && numbered.length > 0 && (
        <NumberCards41 lines={numbered} tone={isSteps ? "sky" : "violet"} />
      )}
      <SourceLines41 lines={isSteps || slide.variant === "objectives" ? plain : lines} variant={slide.variant === "dialogue" ? "dialogue" : "auto"} />
      {slide.section === 8 && (
        <Tip41>
          <Text41 text="تذكّر: BE لا تكفي وحدها؛ لا بد أن يأتي الفعل الرئيسي بصيغة V-ing لتكوين الزمن المستمر." />
        </Tip41>
      )}
      {slide.section === 15 && (
        <Tip41>
          <Text41 text="قبل إضافة DO، اسأل: هل يوجد فعل مساعد مناسب في الجملة أصلًا؟ إن وجد، استخدمه ولا تضف DO." />
        </Tip41>
      )}
    </Frame41>
  );
}

// ============================================================
// الدرس 41
// ============================================================
export default function Lesson41({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [answers, setAnswers] = useState<TestAnswers41>({});
  const [submitted, setSubmitted] = useState(false);
  const [graded, setGraded] = useState<TestResult41 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const total = SLIDES_41.length;
  const slide = SLIDES_41[index];
  const station = STATIONS_41.find((s) => s.id === slide.station)!;
  const progress = ((index + 1) / total) * 100;

  const go = useMemo(
    () => ({
      next: () => setIndex((v) => Math.min(v + 1, total - 1)),
      prev: () => setIndex((v) => Math.max(v - 1, 0)),
    }),
    [total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (target?.isContentEditable) return;
      if (event.key === "ArrowLeft") go.next();
      if (event.key === "ArrowRight") go.prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, menu]);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    if (!/jsdom/i.test(navigator.userAgent)) {
      document.getElementById("l41-title")?.focus({ preventScroll: true });
    }
  }, [index]);

  const rail = (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-500 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-xl font-bold text-slate-900">
          الدرس 41 <span className="text-slate-300">·</span> <En41>Master Auxiliary Verbs</En41>
        </div>
        <En41 className="text-xs font-semibold text-slate-500">BE / DO / HAVE</En41>
      </div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label="محطات الدرس">
        {STATIONS_41.map((stationItem) => {
          const stationSlides = SLIDES_41.map((s, i) => ({ s, i })).filter(({ s }) => s.station === stationItem.id);
          const active = slide.station === stationItem.id;
          const first = stationSlides[0].i;
          return (
            <div key={stationItem.id} className="mb-2">
              <button
                onClick={() => {
                  setIndex(first);
                  setMenu(false);
                }}
                aria-expanded={active}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${active ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <span aria-hidden="true">{stationItem.emoji}</span>
                <span className="truncate">{stationItem.name}</span>
                <span className={`mr-auto text-xs ${active ? "text-white/80" : "text-slate-500"}`}>{stationSlides.length}</span>
              </button>
              {active && (
                <div className="mt-1 space-y-1 pr-2">
                  {stationSlides.map(({ s, i }) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setIndex(i);
                        setMenu(false);
                      }}
                      aria-current={i === index ? "step" : undefined}
                      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-right text-xs font-semibold transition ${
                        i === index ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <span className={`grid h-5 w-6 shrink-0 place-items-center rounded ${i === index ? "bg-white/20" : "bg-slate-100"}`}>{i + 1}</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="border-t border-slate-100 p-4 text-xs text-slate-500">التنقل: الأسهم ← → · {total} شريحة</div>
    </aside>
  );

  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800" data-lesson="41">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">{rail}</div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس الدرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                {station.name} · <span className="text-slate-800">{slide.title}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              <bdi dir="ltr">{index + 1} / {total}</bdi>
            </span>
          </header>

          <main ref={mainRef} id="l41-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <Workspace41Provider>
              <div key={slide.id} className="pop mx-auto max-w-4xl">
                <SlideBody
                  slide={slide}
                  index={index}
                  answers={answers}
                  changeAnswer={(key, value) => {
                    if (!submitted) setAnswers((current) => ({ ...current, [key]: value }));
                  }}
                  submitted={submitted}
                  graded={graded}
                  onSubmit={(result) => {
                    setGraded(result);
                    setSubmitted(true);
                    const target = SLIDES_41.findIndex((item) => item.id === "test-result");
                    if (target >= 0) setIndex(target);
                  }}
                  onReset={() => {
                    setAnswers({});
                    setSubmitted(false);
                    setGraded(null);
                  }}
                  teacherUnlocked={teacherUnlocked}
                  unlockTeacher={() => setTeacherUnlocked(true)}
                  lockTeacher={() => setTeacherUnlocked(false)}
                />
              </div>
            </Workspace41Provider>
          </main>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button
                onClick={go.prev}
                disabled={index === 0}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
              >
                → السابق
              </button>
              <span className="h-6 w-px bg-slate-200" />
              <button
                onClick={go.next}
                disabled={index === total - 1}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-30"
              >
                التالي ←
              </button>
            </div>
          </div>
        </div>
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            {rail}
          </div>
        </div>
      )}
    </div>
  );
}
