import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { En42, Text42, Frame42, SourceLines42, NumberCards42, Note42, ModalCard42, Panel42 } from "./design42";
import { SLIDES_42, STATIONS_42, type Slide42 } from "./slides42";
import { sectionLines42, sectionTitle42, splitTitle42 } from "./ledger42";
import {
  BuildLab42,
  FormLab42,
  ShortLab42,
  WhLab42,
  TimeLab42,
  AbleLab42,
  PermissionLab42,
  ResponseLab42,
  PossibilityLab42,
  RepairLab42,
  MeaningLab42,
  AdventureLab42,
  PracticeSet42,
  Reading42,
  WritingMission42,
  Workspace42Provider,
} from "./kit42";
import { TestArea42, type TestResult42 } from "./TestArea42";
import { TeacherArea42 } from "./TeacherArea42";
import type { TestAnswers42 } from "./testData42";

// الحلول والمصحّح ودليل المعلم تُحمَّل عند الحاجة فقط، لا مع أسئلة الاختبار.
const SolutionsArea42 = lazy(() => import("./SolutionsArea42"));

// ============================================================
// الغلاف — نفس بنية غلاف الدروس الأولى: تميمة كبيرة، شارة الدرس،
// عنوان عربي/إنجليزي، ورقاقات الأفعال الناقصة المبنية من المصدر.
// ============================================================
function Cover42({ slide }: { slide: Slide42 }) {
  const lines = sectionLines42(slide.section).slice(slide.range![0], slide.range![1] + 1);
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-12">
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sky-100 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-violet-100 blur-3xl" aria-hidden="true" />
      <div className="relative">
        <div className="pop text-7xl anim-drift" aria-hidden="true">
          {slide.mascot}
        </div>
        <div className="pop pop-1 mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">
          <Text42 text="الدرس 42" />
          <span className="text-white/50">·</span>
          <span dir="ltr" className="font-en">IQ200</span>
        </div>
        <h1 className="pop pop-2 font-head mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          <Text42 text={lines[0]} />
          <span dir="ltr" className="font-en mt-2 block text-2xl font-extrabold tracking-wide text-slate-800 md:text-4xl">
            {lines[1]}
          </span>
        </h1>
        <p className="pop pop-3 mt-3 text-lg font-bold text-slate-500 md:text-xl">
          <Text42 text={lines[2]} />
        </p>
        <div className="pop pop-4 mt-7 flex flex-wrap items-center justify-center gap-3" dir="ltr">
          {[
            { name: "CAN", ar: "القدرة · الإمكانية · الإذن · الطلب", tone: "bg-sky-700" },
            { name: "COULD", ar: "الماضي · التهذيب · الاحتمال · الاقتراح", tone: "bg-violet-700" },
          ].map((modal) => (
            <div key={modal.name} className={`rounded-2xl ${modal.tone} px-6 py-3 text-white shadow-md`}>
              <div className="font-en text-2xl font-extrabold md:text-3xl">{modal.name}</div>
              <div dir="rtl" className="text-sm font-bold">
                {modal.ar}
              </div>
            </div>
          ))}
        </div>
        <p className="pop pop-5 mt-7 text-base text-slate-500">
          للتنقل: الأسهم ← → أو الأزرار أسفل الشريحة · {SLIDES_42.length} شريحة قصيرة
        </p>
      </div>
    </section>
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
  slide: Slide42;
  index: number;
  answers: TestAnswers42;
  changeAnswer: (key: string, value: string) => void;
  submitted: boolean;
  graded: TestResult42 | null;
  onSubmit: (result: TestResult42) => void;
  onReset: () => void;
  teacherUnlocked: boolean;
  unlockTeacher: () => void;
  lockTeacher: () => void;
}) {
  if (slide.kind === "cover") return <Cover42 slide={slide} />;

  if (slide.kind === "lab") {
    const lab = {
      build: <BuildLab42 part={slide.labPart ?? 1} />,
      form: <FormLab42 />,
      short: <ShortLab42 />,
      wh: <WhLab42 />,
      time: <TimeLab42 part={slide.labPart ?? 1} />,
      able: <AbleLab42 part={slide.labPart ?? 1} />,
      permission: <PermissionLab42 />,
      response: <ResponseLab42 />,
      possibility: <PossibilityLab42 />,
      repair: <RepairLab42 part={slide.labPart ?? 1} />,
      meaning: <MeaningLab42 />,
      adventure: <AdventureLab42 part={slide.labPart ?? 1} />,
    }[slide.lab!];
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone={slide.tone ?? "violet"}>
        {lab}
      </Frame42>
    );
  }

  if (slide.kind === "practice") {
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone={slide.tone ?? "violet"}>
        <PracticeSet42 section={slide.practice!} from={slide.items![0]} to={slide.items![1]} />
      </Frame42>
    );
  }

  if (slide.kind === "reading") {
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone="sky">
        <Reading42 part={slide.readingPart!} />
      </Frame42>
    );
  }

  if (slide.kind === "test") {
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead}>
        <TestArea42 answers={answers} change={changeAnswer} submitted={submitted} level={slide.testLevel!} itemRange={slide.testItems} onSubmit={onSubmit} />
      </Frame42>
    );
  }

  if (slide.kind === "testResult") {
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead}>
        {!submitted || !graded ? (
          <Panel42 title="لم يتم التسليم بعد">
            <p className="text-base leading-8 text-slate-700">
              <Text42 text="أكمل المستويات الخمسة ثم اضغط «تسليم الاختبار النهائي» في نهاية المستوى الخامس. لا تظهر النتيجة ولا الحلول قبل التسليم." />
            </p>
            <p className="mt-2 text-sm font-bold text-slate-500">
              <Text42 text="الإجابات المكتملة:" /> <bdi dir="ltr">{Object.values(answers).filter(Boolean).length}</bdi>
            </p>
          </Panel42>
        ) : (
          <>
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
              <p className="text-2xl font-extrabold text-emerald-900">
                <Text42 text="نتيجتك:" /> <bdi dir="ltr">{graded.score} / {graded.total}</bdi> · <bdi dir="ltr">{Math.round((graded.score / graded.total) * 100)}%</bdi>
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                <Text42
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
                  <Text42 text="إعادة الاختبار ومسح الإجابات" />
                </button>
              </div>
            </div>
            <Suspense fallback={<p role="status" className="rounded-2xl bg-white p-4 text-sm font-bold text-slate-500"><Text42 text="جارٍ تحميل الحلول…" /></p>}>
              <SolutionsArea42 answers={answers} />
            </Suspense>
          </>
        )}
      </Frame42>
    );
  }

  if (slide.kind === "teacher") {
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead}>
        <TeacherArea42 unlocked={teacherUnlocked} unlock={unlockTeacher} lock={lockTeacher} />
      </Frame42>
    );
  }

  if (slide.kind === "writing") {
    // شريحة المتابعة (قائمة المعايير) تفاعل فقط ولا تعيد عرض أسطر المصدر.
    const lines = slide.range ? sectionLines42(slide.section).slice(slide.range[0], slide.range[1] + 1) : [];
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone="emerald">
        {lines.length > 0 && <SourceLines42 lines={lines} />}
        {slide.writingPart !== "model" && <WritingMission42 part={slide.writingPart ?? "editor"} />}
        {slide.writingPart === "model" && (
          <Note42 emoji="✍️">
            <Text42 text="النموذج ثماني جمل فقط، أي أقل من الشرط المطلوب (12 إلى 15 جملة). استخدمه كإلهام جزئي، واكتب فقرتك الكاملة بنفسك ثم نفّذ التحدي الإضافي." />
          </Note42>
        )}
      </Frame42>
    );
  }

  if (slide.kind === "summary") {
    const lines = sectionLines42(slide.section).slice(slide.range![0], slide.range![1] + 1);
    const meta = {
      can: { name: "CAN", ar: "القدرة الحالية · الإمكانية العامة · الإذن · الطلب", tone: "border-sky-200 bg-sky-50 text-sky-900", emoji: "💪" },
      could: { name: "COULD", ar: "الماضي · التهذيب · الإذن · الاحتمال · الاقتراح", tone: "border-violet-200 bg-violet-50 text-violet-900", emoji: "🔮" },
      forms: { name: "FORMS", ar: "النفي · السؤال · القدرة المستقبلية", tone: "border-emerald-200 bg-emerald-50 text-emerald-900", emoji: "🧭" },
    }[slide.summaryPart ?? "can"];
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} tone="orange">
        <div className={`flex items-center justify-between rounded-2xl border-2 p-3 ${meta.tone}`}>
          <div>
            <En42 className="text-2xl font-extrabold">{meta.name}</En42>
            <p className="mt-1 text-xs font-bold">{meta.ar}</p>
          </div>
          <span className="text-2xl" aria-hidden="true">
            {meta.emoji}
          </span>
        </div>
        <SourceLines42 lines={lines} />
        {slide.id === "summary-forms" && (
          <Note42 emoji="🥇">
            <Text42 text="القاعدة الجامعة: CAN/COULD + V1 · السؤال CAN/COULD + Subject + V1? · النفي Subject + CAN'T/COULDN'T + V1 · المستقبل will be able to + V1." />
          </Note42>
        )}
        {slide.id === "summary-advanced" && (
          <Note42 emoji="🏅">
            <Text42 text="COULD للقدرة العامة في الماضي، وWAS/WERE ABLE TO لإبراز النجاح في موقف ماضٍ محدد، وcouldn't طبيعية للنفي في الحالتين." />
          </Note42>
        )}
      </Frame42>
    );
  }

  if (slide.kind === "next") {
    const lines = sectionLines42(slide.section).slice(slide.range![0], slide.range![1] + 1);
    return (
      <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} tone="emerald">
        {slide.id === "next-progress" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between text-sm font-bold text-slate-600">
              <span>التقدم الكلي</span>
              <bdi dir="ltr">42 / 120</bdi>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-violet-400 to-emerald-500" style={{ width: `${(42 / 120) * 100}%` }} />
            </div>
          </div>
        )}
        <SourceLines42 lines={lines} />
        {slide.id === "next-may" && (
          <div className="flex flex-wrap gap-2">
            <a href="#/lesson/43" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
              الدرس 43: <En42>MAY &amp; MIGHT</En42> ←
            </a>
            <a href="#/lesson/41" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600">
              مراجعة الدرس 41: الأفعال المساعدة
            </a>
          </div>
        )}
        {slide.id === "next-close" && (
          <Note42 emoji="🎓">
            <Text42 text="في الدرس 41 فهمنا كيف تعمل الأفعال المساعدة، وفي الدرس 42 استخدمناها للتعبير عن القدرة والتواصل المهذب. الدرس 43 ينقلنا إلى الحديث بثقة حتى عندما لا نكون متأكدين." />
          </Note42>
        )}
      </Frame42>
    );
  }

  // شريحة درس عادية: كل أسطر القسم المحددة تُعرض كاملة داخل الشريحة.
  const lines = sectionLines42(slide.section).slice(slide.range![0], slide.range![1] + 1);
  const numbered = lines.filter((line) => /^[①-⑩]/.test(line));
  const plain = lines.filter((line) => !/^[①-⑩]/.test(line));
  const isSteps = slide.variant === "steps";
  const [titleLatin, titleArabic] = splitTitle42(sectionTitle42(slide.section));
  return (
    <Frame42 mascot={slide.mascot} step={index + 1} badge={slide.badge} title={slide.title} lead={slide.lead} tone={slide.tone ?? "violet"}>
      <p className="text-xs font-bold text-slate-500">
        {slide.section === 0 ? (
          <Text42 text="القسم الافتتاحي · الدرس 42" />
        ) : titleLatin ? (
          <>
            <span dir="ltr" className="font-en">{titleLatin}</span>
            <span aria-hidden="true">{" \u2022 "}</span>
            <Text42 text={`القسم ${slide.section} \u2022 ${titleArabic}`} />
          </>
        ) : (
          <Text42 text={`القسم ${slide.section} \u2022 ${sectionTitle42(slide.section)}`} />
        )}
      </p>
      {(isSteps || slide.variant === "objectives") && numbered.length > 0 && (
        <NumberCards42 lines={numbered} tone={isSteps ? "sky" : "violet"} />
      )}
      <SourceLines42 lines={isSteps || slide.variant === "objectives" ? plain : lines} variant={slide.variant === "dialogue" ? "dialogue" : "auto"} />
      {slide.id === "s2-family" && (
        <div className="grid gap-3 md:grid-cols-2">
          <ModalCard42 name="CAN" ar="قدرة · إمكانية · إذن · طلب" forms="can · can't · cannot" examples={["I can swim.", "Can you help me?"]} tone="sky" />
          <ModalCard42 name="COULD" ar="ماضٍ · تهذيب · احتمال · اقتراح" forms="could · couldn't · could not" examples={["I could swim when I was six.", "It could rain tomorrow."]} tone="violet" />
        </div>
      )}
      {slide.id === "s3-formula" && (
        <Note42 emoji="🧱">
          <Text42 text="لاحظ أن القاعدة نفسها ستفسّر كل استخدامات CAN وCOULD في هذا الدرس: القدرة، والإذن، والطلب، والاحتمال، والاقتراح." />
        </Note42>
      )}
      {slide.id === "s13-more" && (
        <Note42 emoji="🧠">
          <Text42 text="هذه هي نقطة التحوّل في الدرس: من الآن فصاعدًا لا تترجم COULD آليًا إلى «كان يستطيع»؛ اسأل أولًا عن الوظيفة." />
        </Note42>
      )}
      {slide.id === "s28-rule" && (
        <Note42 emoji="📐">
          <Text42 text="الحدود مهمة: CAN شائعة في الإمكانية العامة وCOULD في احتمال موقف معين، لكن الاستخدام الحقيقي أوسع من تقسيم جامد بين الكلمتين." />
        </Note42>
      )}
    </Frame42>
  );
}

// ============================================================
// الدرس 42
// ============================================================
export default function Lesson42({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [answers, setAnswers] = useState<TestAnswers42>({});
  const [submitted, setSubmitted] = useState(false);
  const [graded, setGraded] = useState<TestResult42 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const total = SLIDES_42.length;
  const slide = SLIDES_42[index];
  const station = STATIONS_42.find((s) => s.id === slide.station)!;
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
      document.getElementById("l42-title")?.focus({ preventScroll: true });
    }
  }, [index]);

  const rail = (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-500 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-xl font-bold text-slate-900">
          الدرس 42 <span className="text-slate-300">·</span> <En42>CAN &amp; COULD</En42>
        </div>
        <En42 className="text-xs font-semibold text-slate-500">Ability · Possibility · Permission</En42>
      </div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label="محطات الدرس">
        {STATIONS_42.map((stationItem) => {
          const stationSlides = SLIDES_42.map((s, i) => ({ s, i })).filter(({ s }) => s.station === stationItem.id);
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
                <span className="truncate"><Text42 text={stationItem.name} /></span>
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
                      <span className="truncate"><Text42 text={s.title} /></span>
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
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800" data-lesson="42">
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
                {/* الاسم والعنوان يخلطان العربية باللاتينية، فيمرّان عبر العازل المشترك. */}
                <Text42 text={station.name} /> <span aria-hidden="true">{"\u2022"}</span> <Text42 text={slide.title} className="text-slate-800" />
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              <bdi dir="ltr">{index + 1} / {total}</bdi>
            </span>
          </header>

          <main ref={mainRef} id="l42-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <Workspace42Provider>
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
                    const target = SLIDES_42.findIndex((item) => item.id === "test-result");
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
            </Workspace42Provider>
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
