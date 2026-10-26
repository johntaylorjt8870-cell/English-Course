import { useEffect, useState } from "react";
import { sourceSection40, type StepLabKind40 } from "./data";
import {
  EnLine40,
  LabShell40,
  PracticeRevealBox40,
  Rich40,
  matchesAcceptedAnswer40,
} from "./kit40";
import {
  ADAM_COMPARISON_QUIZ_40,
  ADAM_TIMELINE_POINTS_40,
  CURRICULUM_SYSTEMS_40,
  DECISION_MAP_QUESTIONS_40,
  DECISION_MAP_QUIZ_40,
  DEEP_UNDERSTANDING_ITEMS_40,
  DETECTIVE21_ITEMS_40,
  DIALOGUE1_CHECK_40,
  DIALOGUE1_LINES_40,
  DIALOGUE2_CHALLENGE_40,
  DIALOGUE2_LINES_40,
  EXERCISE19_ITEMS_40,
  FILL20_ITEMS_40,
  FORMULA_BUILDER_TARGETS_40,
  FORMULA_ERROR_PAIRS_40,
  FOR_SINCE_SORT_40,
  FOR_SINCE_STATIVE_QUIZ_40,
  FUTURE_CONTINUOUS_ITEMS_40,
  FUTURE_PERFECT_CONTINUOUS_ITEMS_40,
  FUTURE_PERFECT_ITEMS_40,
  GOLDEN_SUMMARY28_CARDS_40,
  GOLDEN_SUMMARY28_QUIZ_40,
  GOLDEN_TABLE_ITEMS_40,
  IQ22_ITEMS_40,
  NEXT_LESSON_40,
  OBJECTIVES_40,
  PREPARE_PERSPECTIVES_40,
  READING23_ITEMS_40,
  READING23_STATIONS_40,
  SIGNAL_WORDS_ITEMS_40,
  SIGNAL_WORDS_LIST_40,
  SITUATION_LAB_ITEMS_40,
  STORY_ANALYSIS24_ITEMS_40,
  STORY_ANALYSIS24_QUIZ_40,
  STUDY_PERSPECTIVES_40,
  STUDY_PERSPECTIVES_QUIZ_40,
  TIME_CLAUSE_CONJUNCTIONS_40,
  TIME_CLAUSE_EXPLORER_CASES_40,
  TIME_CLAUSE_QUIZ_40,
  WHEN_VS_BY_THE_TIME_PERSPECTIVES_40,
  WHEN_VS_BY_THE_TIME_QUIZ_40,
  WILL_VS_GOING_TO_SCENARIOS_40,
  WRITING27_CRITERIA_40,
  WRITING27_MODEL_40,
  WRITING27_MODEL_FORMS_40,
  type ChoiceItem40,
  type TenseChannel40,
} from "./practiceData40";

function channelClass(ch: TenseChannel40): string {
  switch (ch) {
    case "will":
      return "tcc-tone-will";
    case "going":
      return "tcc-tone-going";
    case "fc":
      return "tcc-tone-fc";
    case "fp":
      return "tcc-tone-fp";
    case "fpc":
      return "tcc-tone-fpc";
  }
}

function channelBarColor(ch: TenseChannel40): string {
  switch (ch) {
    case "will":
      return "#b9382c";
    case "going":
      return "#154399";
    case "fc":
      return "#095c54";
    case "fp":
      return "#854d0e";
    case "fpc":
      return "#541fa8";
  }
}

function ChoiceDeck40({
  title,
  statusPrefix = "التحقق",
  note,
  items,
  labId,
  onAllAttempted,
}: {
  title: string;
  statusPrefix?: string;
  note?: string;
  items: readonly ChoiceItem40[];
  labId: string;
  onAllAttempted?: (done: boolean) => void;
}) {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const answeredCount = items.filter((item) => Boolean(picked[item.id])).length;

  useEffect(() => {
    onAllAttempted?.(answeredCount === items.length && items.length > 0);
  }, [answeredCount, items.length, onAllAttempted]);

  return (
    <LabShell40
      labId={labId}
      title={title}
      status={`${statusPrefix}: ${answeredCount} / ${items.length}`}
      note={note}
    >
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const current = picked[item.id];
          const isAnswered = Boolean(current);
          const isOk = isAnswered && item.accepted.includes(current);
          return (
            <div key={item.id} className="tcc-card flex flex-col gap-2.5">
              <p className="m-0 text-sm font-extrabold leading-relaxed text-slate-900">
                <Rich40 text={item.prompt} />
              </p>
              {item.lines?.map((ln, idx) => (
                <EnLine40 key={idx}>{ln}</EnLine40>
              ))}
              <div className="flex flex-col gap-2">
                {item.choices.map((ch) => {
                  const chosen = current === ch.value;
                  const stateCls = !isAnswered
                    ? ""
                    : item.accepted.includes(ch.value)
                      ? "is-correct"
                      : chosen
                        ? "is-wrong"
                        : "";
                  const pureEn = /[A-Za-z]/.test(ch.label) && !/[\u0600-\u06FF]/.test(ch.label);
                  return (
                    <button
                      key={ch.value}
                      type="button"
                      dir={pureEn ? "ltr" : "rtl"}
                      className={`tcc-choice-btn ${chosen ? "is-selected" : ""} ${stateCls}`.trim()}
                      onClick={() => setPicked((prev) => ({ ...prev, [item.id]: ch.value }))}
                    >
                      <span className={pureEn ? "font-en font-bold" : "font-bold"}>
                        {pureEn ? ch.label : <Rich40 text={ch.label} />}
                      </span>
                      <span className="text-xs font-extrabold">
                        {isAnswered && item.accepted.includes(ch.value)
                          ? "✓"
                          : chosen && !isOk
                            ? "✕"
                            : "○"}
                      </span>
                    </button>
                  );
                })}
              </div>
              {isAnswered ? (
                <div className={`tcc-feedback ${isOk ? "is-ok" : "is-err"}`}>
                  <div>
                    <Rich40 text={item.feedback} />
                  </div>
                  {item.nuance ? (
                    <div className="mt-1.5 border-t border-current/20 pt-1.5 text-xs font-bold">
                      <Rich40 text={item.nuance} />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </LabShell40>
  );
}

/* 1. Cover Horizon Lab (Timeline Overview — Lab B) */
function CoverHorizonLab40() {
  const channels = [
    {
      id: "will" as TenseChannel40,
      label: "① WILL",
      ar: "قرار لحظي · وعد · توقع عام",
      en: "The phone is ringing. I'll answer it.",
      ticks: ["NOW ⚡ القرار الآن", "→", "المستقبل"],
      start: 4,
      width: 24,
    },
    {
      id: "going" as TenseChannel40,
      label: "② BE GOING TO",
      ar: "خطة مسبقة · دليل حاضر",
      en: "I'm going to join a programming course next month.",
      ticks: ["قبل الكلام (الخطة جاهزة)", "NOW 🧭", "الشهر القادم"],
      start: 0,
      width: 58,
    },
    {
      id: "fc" as TenseChannel40,
      label: "④ Future Continuous",
      ar: "نشاط جارٍ داخل لحظة مستقبلية",
      en: "At 8:00 tomorrow, I'll be studying.",
      ticks: ["NOW", "7:30", "🎥 At 8:00 (جارٍ)", "9:00"],
      start: 44,
      width: 34,
    },
    {
      id: "fp" as TenseChannel40,
      label: "⑤ Future Perfect",
      ar: "إنجاز مكتمل بحلول نقطة مستقبلية",
      en: "By 9:00, I'll have finished my homework.",
      ticks: ["NOW", "اكتمال العمل ✓", "🏁 By 9:00"],
      start: 76,
      width: 20,
    },
    {
      id: "fpc" as TenseChannel40,
      label: "⑥ Future Perfect Continuous",
      ar: "مدة نشاط ممتدة حتى نقطة مستقبلية",
      en: "By 9:00, I'll have been studying for three hours.",
      ticks: ["6:00 البداية", "⏳ 3 ساعات متواصلة", "By 9:00"],
      start: 18,
      width: 78,
    },
  ];
  const [activeIdx, setActiveIdx] = useState(0);
  const current = channels[activeIdx]!;

  return (
    <LabShell40
      labId="cover-horizon"
      title="رادار الأفق الزمني: المحطات الست على خط واحد"
      status={current.label}
      note="بدّل بين قنوات المستقبل لرؤية موقع كل صيغة على الخط الزمني قبل الدخول في التفاصيل. المحطة ③ في الدروس السابقة (الدرس 36) قارنت بين القناتين ① و②."
    >
      <div className="tcc-tab-row" role="tablist" aria-label="قنوات المستقبل الخمس">
        {channels.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            role="tab"
            aria-selected={activeIdx === idx}
            className={`tcc-tab-btn ${activeIdx === idx ? "is-active" : ""}`}
            onClick={() => setActiveIdx(idx)}
          >
            <Rich40 text={ch.label} />
          </button>
        ))}
      </div>

      <div className={`tcc-card border ${channelClass(current.id)}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-black">
            <Rich40 text={current.ar} />
          </span>
          <span dir="ltr" className={`font-en tcc-chip-badge ${channelClass(current.id)}`}>
            {current.label}
          </span>
        </div>
        <div className="mt-3">
          <EnLine40>{current.en}</EnLine40>
        </div>
      </div>

      <div className="tcc-timeline-stage" aria-label="الخط الزمني التفاعلي">
        <div className="text-xs font-extrabold text-slate-700 font-en">
          TEMPORAL HORIZON // {current.label.replace(/^[①②④⑤⑥]\s*/, "")}
        </div>
        <div className="tcc-timeline-rail">
          <div
            className="tcc-timeline-fill"
            style={{
              marginLeft: `${current.start}%`,
              width: `${current.width}%`,
              backgroundColor: channelBarColor(current.id),
            }}
          />
        </div>
        <div dir="rtl" className="tcc-timeline-ticks">
          {current.ticks.map((t, i) => (
            <span key={i}>
              <Rich40 text={t} />
            </span>
          ))}
        </div>
      </div>
    </LabShell40>
  );
}

/* 2. Cover Intent Matcher */
const COVER_INTENT_ITEMS: readonly ChoiceItem40[] = [
  {
    id: "ci-1",
    prompt: "ما التحول الأساسي الذي يستهدفه الدرس 40 بعد دراسة الدروس 34–39؟",
    choices: [
      { value: "control", label: "الانتقال من مرحلة معرفة القواعد المنفصلة إلى مرحلة التحكم في اختيار الصيغة بحسب المعنى" },
      { value: "memorize", label: "إعادة حفظ كل زمن بمعزل تام عن بقية الأزمنة" },
    ],
    accepted: ["control"],
    feedback: "هدف الدرس 40 هو جمع الأزمنة في منظومة واحدة والانتقال من معرفة القواعد إلى التحكم بها.",
  },
  {
    id: "ci-2",
    prompt: "عندما يريد المتحدث التحدث عن المستقبل، على ماذا يبني اختياره للصيغة؟",
    choices: [
      { value: "meaning", label: "على المعنى المراد إبرازه: قرار أو خطة أو توقع أو نشاط مستمر أو إنجاز مكتمل أو مدة ممتدة" },
      { value: "random", label: "على التبديل العشوائي بين الصيغ لتزيين الجملة" },
    ],
    accepted: ["meaning"],
    feedback: "كل صيغة مستقبلية تخدم وظيفة دلالية محددة يختارها المتحدث بوعي.",
  },
];

/* 3. Objectives Readiness Tracker */
function ObjectivesTrackerLab40({ slice }: { slice: "part1" | "part2" }) {
  const items = slice === "part1" ? OBJECTIVES_40.slice(0, 5) : OBJECTIVES_40.slice(5, 10);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <LabShell40
      labId={`objectives-${slice}`}
      title="لوحة جاهزية الإتقان الذاتية"
      status={`تم تحديد ${doneCount} / ${items.length}`}
      note="حدّد الأهداف التي تشعر بثقتك المبدئية فيها الآن، والمهارات التي ستركز على صقلها خلال محطات المركز."
    >
      <div className="flex flex-col gap-2">
        {items.map((obj, idx) => {
          const active = Boolean(checked[idx]);
          return (
            <button
              key={idx}
              type="button"
              className={`flex items-center justify-between tcc-choice-btn ${active ? "is-correct" : ""}`}
              onClick={() => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }))}
            >
              <span className="block">
                <Rich40 text={obj} />
              </span>
              <span className="block shrink-0 text-xs font-extrabold">
                {active ? "مستعد ✓" : "قيد التركيز"}
              </span>
            </button>
          );
        })}
      </div>
    </LabShell40>
  );
}

/* 4. Lab A: Six-Question Future Selector Console */
function SixQuestionConsoleLab40() {
  const [selectedId, setSelectedId] = useState<string>(DECISION_MAP_QUESTIONS_40[0].id);
  const current =
    DECISION_MAP_QUESTIONS_40.find((q) => q.id === selectedId) ?? DECISION_MAP_QUESTIONS_40[0];

  return (
    <LabShell40
      labId="six-q-console"
      title="موجّه الأسئلة الستة التفاعلي"
      status={`${current.order} → ${current.typicalForm}`}
      note="اضغط على أي سؤال من الأسئلة التشخيصية الستة لمعاينة الصيغة النموذجية والمثال التطبيقي والترجمة."
    >
      <div className="tcc-grid-2">
        {DECISION_MAP_QUESTIONS_40.map((q) => {
          const active = q.id === current.id;
          return (
            <button
              key={q.id}
              type="button"
              className={`tcc-choice-btn ${active ? "is-selected" : ""}`}
              onClick={() => setSelectedId(q.id)}
            >
              <span>
                <strong className="block text-xs text-slate-700">{q.order}</strong>
                <Rich40 text={q.question} />
              </span>
              <span className={`tcc-chip-badge ${channelClass(q.channel)}`}>
                <Rich40 text={q.typicalForm} />
              </span>
            </button>
          );
        })}
      </div>

      <div className={`tcc-card border ${channelClass(current.channel)}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-black">
            <Rich40 text={`${current.order}: ${current.question}`} />
          </span>
          <span className={`tcc-chip-badge ${channelClass(current.channel)}`}>
            <Rich40 text={`الصيغة النموذجية: ${current.typicalForm}`} />
          </span>
        </div>
        <div className="mt-3">
          <EnLine40>{current.example}</EnLine40>
        </div>
        <p className="mt-2.5 mb-1 text-sm font-extrabold text-slate-900">
          <Rich40 text={current.translation} />
        </p>
        <p className="m-0 text-xs font-bold text-slate-800">
          <Rich40 text={current.guidance} />
        </p>
      </div>
    </LabShell40>
  );
}

/* 5. Lab C: Five-Form Sentence Laboratory */
function FiveAnglesStudyLab40() {
  const [verbKey, setVerbKey] = useState<"study" | "prepare">("study");
  const [angleIdx, setAngleIdx] = useState(0);
  const dataset = verbKey === "study" ? STUDY_PERSPECTIVES_40 : PREPARE_PERSPECTIVES_40;
  const active = dataset[angleIdx] ?? dataset[0];

  return (
    <LabShell40
      labId="five-angles-study"
      title="مختبر الزوايا الخمس للحدث الواحد"
      status={`${active.num} ${active.form}`}
      note="بدّل بين الزوايا الخمس لترى كيف يغيّر المتحدث المعلومة البارزة مع ثبات الفعل الأساسي، وجرّب الفعل الإضافي prepare للتثبيت."
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="tcc-tab-row" role="group" aria-label="اختيار الفعل">
          <button
            type="button"
            className={`tcc-tab-btn ${verbKey === "study" ? "is-active" : ""}`}
            onClick={() => setVerbKey("study")}
          >
            <Rich40 text="الفعل الأساسي: study" />
          </button>
          <button
            type="button"
            className={`tcc-tab-btn ${verbKey === "prepare" ? "is-active" : ""}`}
            onClick={() => setVerbKey("prepare")}
          >
            <Rich40 text="مثال تطبيقي إضافي: prepare" />
          </button>
        </div>
      </div>

      <div className="tcc-tab-row" role="tablist" aria-label="الزوايا الخمس">
        {dataset.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={angleIdx === idx}
            className={`tcc-tab-btn ${angleIdx === idx ? "is-active" : ""}`}
            onClick={() => setAngleIdx(idx)}
          >
            <Rich40 text={`${item.num} ${item.form}`} />
          </button>
        ))}
      </div>

      <div className={`tcc-card border ${channelClass(active.channel)}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`tcc-chip-badge ${channelClass(active.channel)}`}>
            <Rich40 text={active.form} />
          </span>
          <span dir="ltr" className="font-en text-xs font-extrabold text-slate-900">
            {active.structure}
          </span>
        </div>
        <div className="mt-3">
          <EnLine40>{active.sentence}</EnLine40>
        </div>
        <p className="mt-2.5 mb-1 text-sm font-black text-slate-900">
          <Rich40 text={active.arabic} />
        </p>
        <p className="m-0 text-sm font-bold text-slate-800">
          <Rich40 text={active.emphasis} />
        </p>
      </div>
    </LabShell40>
  );
}

/* 6. Round 2 Interactive Window (Future Continuous 6:00–7:30) */
function FutureContinuousWindowLab40() {
  const probes = [
    {
      clock: "5:30 PM",
      status: "قبل بدء الدرس",
      en: "At 5:30, the online lesson hasn't started yet.",
      ar: "عند الخامسة والنصف لم يبدأ الدرس بعد.",
      inWindow: false,
    },
    {
      clock: "6:30 PM",
      status: "داخل نافذة الدرس (6:00 → 7:30)",
      en: "I'm afraid I'll be attending an online lesson at that time.",
      ar: "عند السادسة والنصف يكون الدرس جاريًا فعلًا — لذلك نختار Future Continuous.",
      inWindow: true,
    },
    {
      clock: "8:00 PM",
      status: "بعد انتهاء الدرس",
      en: "By 8:00, the online lesson will have ended.",
      ar: "عند الثامنة نكون قد تجاوزنا نهاية الدرس (7:30).",
      inWindow: false,
    },
  ] as const;
  const [probeIdx, setProbeIdx] = useState(1);
  const active = probes[probeIdx]!;

  return (
    <div className="flex flex-col gap-4">
      <LabShell40
        labId="fc-window"
        title="محاكي النافذة الزمنية الجارية (6:00–7:30)"
        status={active.clock}
        note="حرّك نقطة الاتصال الهاتفية لترى متى نقع داخل الحدث المستمر فنستخدم Future Continuous."
      >
        <div className="tcc-tab-row">
          {probes.map((p, idx) => (
            <button
              key={p.clock}
              type="button"
              className={`tcc-tab-btn ${probeIdx === idx ? "is-active" : ""}`}
              onClick={() => setProbeIdx(idx)}
            >
              <Rich40 text={`اتصال عند ${p.clock}`} />
            </button>
          ))}
        </div>

        <div className="tcc-timeline-stage">
          <div className="text-xs font-extrabold text-slate-800 font-en">
            ONLINE LESSON WINDOW: 6:00 PM ———— [6:30 PM] ———— 7:30 PM
          </div>
          <div className="tcc-timeline-rail">
            <div
              className="tcc-timeline-fill"
              style={{
                marginLeft: "25%",
                width: "50%",
                backgroundColor: active.inWindow ? "#095c54" : "#64748b",
              }}
            />
          </div>
          <div className="tcc-timeline-ticks font-en">
            <span>5:30</span>
            <span>6:00 START</span>
            <span>6:30 CALL</span>
            <span>7:30 END</span>
            <span>8:00</span>
          </div>
        </div>

        <div className={`tcc-card ${active.inWindow ? "tcc-tone-fc border" : ""}`}>
          <div className="mb-2 text-xs font-black">
            <Rich40 text={active.status} />
          </div>
          <EnLine40>{active.en}</EnLine40>
          <p className="mt-2 mb-0 text-sm font-bold">
            <Rich40 text={active.ar} />
          </p>
        </div>
      </LabShell40>

      <ChoiceDeck40
        labId="fc-window-check"
        title="سؤال التحقق السريع"
        items={[FUTURE_CONTINUOUS_ITEMS_40[0]!]}
      />
    </div>
  );
}

/* 7. Round 4 Interactive Duration Span Calculator (Sara 2:00 -> 6:00) */
function SaraDurationLab40() {
  const checkpoints = [
    {
      hour: "4:00",
      span: "two hours",
      arSpan: "ساعتان (من 2:00 إلى 4:00)",
      en: "By 4:00, Sara will have been training for two hours.",
      widthPct: 50,
    },
    {
      hour: "5:00",
      span: "three hours",
      arSpan: "ثلاث ساعات (من 2:00 إلى 5:00)",
      en: "By 5:00, Sara will have been training for three hours.",
      widthPct: 75,
    },
    {
      hour: "6:00",
      span: "four hours",
      arSpan: "أربع ساعات (من 2:00 إلى 6:00)",
      en: "By 6:00, Sara will have been training for four hours.",
      widthPct: 100,
    },
  ] as const;
  const [idx, setIdx] = useState(2);
  const current = checkpoints[idx]!;

  return (
    <div className="flex flex-col gap-4">
      <LabShell40
        labId="fpc-duration"
        title="عداد المدة الممتدة لتدريب سارة (بدأت 2:00)"
        status={`By ${current.hour} → for ${current.span}`}
        note="اختر نقطة القياس المستقبلية لترى كيف يحسب Future Perfect Continuous طول المدة المتراكمة منذ الساعة 2:00."
      >
        <div className="tcc-tab-row">
          {checkpoints.map((cp, i) => (
            <button
              key={cp.hour}
              type="button"
              className={`tcc-tab-btn ${idx === i ? "is-active" : ""}`}
              onClick={() => setIdx(i)}
            >
              <Rich40 text={`قياس عند ${cp.hour}`} />
            </button>
          ))}
        </div>

        <div className="tcc-timeline-stage">
          <div className="text-xs font-extrabold text-slate-800 font-en">
            START 2:00 PM ———— DURATION ({current.span.toUpperCase()}) ———— BY {current.hour} PM
          </div>
          <div className="tcc-timeline-rail">
            <div
              className="tcc-timeline-fill"
              style={{
                marginLeft: "0%",
                width: `${current.widthPct}%`,
                backgroundColor: "#541fa8",
              }}
            />
          </div>
          <div className="tcc-timeline-ticks font-en">
            <span>2:00 START</span>
            <span>4:00 (2h)</span>
            <span>5:00 (3h)</span>
            <span>6:00 (4h)</span>
          </div>
        </div>

        <div className="tcc-card tcc-tone-fpc border">
          <div className="mb-2 text-xs font-black">
            <Rich40 text={`المدة المحسوبة: ${current.arSpan}`} />
          </div>
          <EnLine40>{current.en}</EnLine40>
        </div>
      </LabShell40>

      <ChoiceDeck40
        labId="fpc-duration-check"
        title="سؤال التحقق السريع"
        items={[FUTURE_PERFECT_CONTINUOUS_ITEMS_40[0]!]}
      />
    </div>
  );
}

/* 8. Lab E: Adam 4:00–8:00 Three-Way Comparator */
function AdamTimelineLab40() {
  const [pointIdx, setPointIdx] = useState(0);
  const active = ADAM_TIMELINE_POINTS_40[pointIdx]!;

  return (
    <LabShell40
      labId="adam-timeline"
      title="مقارن مشروع آدم (4:00 → 8:00): ثلاث عدسات لحدث واحد"
      status={active.tense}
      note="يعمل آدم على مشروعه من الرابعة حتى الثامنة وينتهي عند الثامنة. بدّل بين العدسات الثلاث لمقارنة النشاط الجاري والإنجاز المكتمل والمدة الممتدة."
    >
      <div className="tcc-tab-row" role="tablist" aria-label="عدسات مقارنة مشروع آدم">
        {ADAM_TIMELINE_POINTS_40.map((pt, idx) => (
          <button
            key={pt.id}
            type="button"
            role="tab"
            aria-selected={pointIdx === idx}
            className={`tcc-tab-btn ${pointIdx === idx ? "is-active" : ""}`}
            onClick={() => setPointIdx(idx)}
          >
            <Rich40 text={`${pt.clock} · ${pt.tense}`} />
          </button>
        ))}
      </div>

      <div className="tcc-timeline-stage">
        <div className="text-xs font-extrabold text-slate-800 font-en">
          ADAM&apos;S PROJECT: 4:00 PM ———— 6:00 PM ———— 8:00 PM ({active.tense.toUpperCase()})
        </div>
        <div className="tcc-timeline-rail">
          <div
            className="tcc-timeline-fill"
            style={{
              marginLeft: `${active.barStartPct}%`,
              width: `${active.barWidthPct}%`,
              backgroundColor: channelBarColor(active.channel),
            }}
          />
        </div>
        <div className="tcc-timeline-ticks font-en">
          <span>4:00 START</span>
          <span>6:00 IN PROGRESS</span>
          <span>8:00 COMPLETE (4 HOURS)</span>
        </div>
      </div>

      <div className={`tcc-card border ${channelClass(active.channel)}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`tcc-chip-badge ${channelClass(active.channel)}`}>
            <Rich40 text={active.tense} />
          </span>
          <span dir="ltr" className="font-en text-xs font-extrabold">
            {active.formula}
          </span>
        </div>
        <p className="mt-2.5 mb-2 text-sm font-black">
          <Rich40 text={`السؤال الحاكم: ${active.questionAr}`} />
        </p>
        <EnLine40>{active.sentence}</EnLine40>
        <p className="mt-2.5 mb-1 text-sm font-extrabold">
          <Rich40 text={active.translation} />
        </p>
        <p className="m-0 text-xs font-bold">
          <Rich40 text={`${active.focus} — ${active.windowInfo}`} />
        </p>
      </div>
    </LabShell40>
  );
}

/* 9. Lab G: Time Clause Interactive Explorer */
function TimeClauseBuilderLab40() {
  const [caseIdx, setCaseIdx] = useState(0);
  const current = TIME_CLAUSE_EXPLORER_CASES_40[caseIdx]!;

  return (
    <LabShell40
      labId="time-clause-builder"
      title="مختبر الجمل الزمنية المستقبلية"
      status={`${caseIdx + 1} / ${TIME_CLAUSE_EXPLORER_CASES_40.length}`}
      note="استعرض أدوات الربط الزمنية الست ولاحظ كيف يبقى فعل الجملة الزمنية في Present Simple بينما تتنوع صيغة المستقبل في الجملة الرئيسية."
    >
      <div className="flex flex-wrap gap-2" dir="ltr">
        {TIME_CLAUSE_CONJUNCTIONS_40.map((conj) => (
          <span
            key={conj}
            className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 font-en text-xs font-extrabold text-slate-900"
          >
            {conj} + Present Simple
          </span>
        ))}
      </div>

      <div className="tcc-tab-row">
        {TIME_CLAUSE_EXPLORER_CASES_40.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            className={`tcc-tab-btn ${caseIdx === idx ? "is-active" : ""}`}
            onClick={() => setCaseIdx(idx)}
          >
            <Rich40 text={c.clauseType} />
          </button>
        ))}
      </div>

      <div className="tcc-card">
        <EnLine40 tone="right">{current.english}</EnLine40>
        <p className="mt-2.5 mb-2 text-sm font-black text-slate-900">
          <Rich40 text={current.arabic} />
        </p>
        <div className="tcc-grid-2">
          <div className="rounded-lg border border-slate-300 bg-white p-2.5">
            <div className="text-xs font-extrabold text-slate-700">فعل الجملة الزمنية</div>
            <div className="mt-1 text-sm font-black text-teal-900">
              <Rich40 text={current.timeClauseVerb} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-300 bg-white p-2.5">
            <div className="text-xs font-extrabold text-slate-700">فعل الجملة الرئيسية</div>
            <div className="mt-1 text-sm font-black text-blue-950">
              <Rich40 text={current.mainClauseVerb} />
            </div>
          </div>
        </div>
        <p className="mt-2.5 mb-0 text-xs font-bold text-slate-800">
          <Rich40 text={current.explanation} />
        </p>
      </div>
    </LabShell40>
  );
}

/* 10. WHEN vs BY THE TIME Lens Switcher */
function WhenVsByTheTimeLab40() {
  const [lensIdx, setLensIdx] = useState(0);
  const current = WHEN_VS_BY_THE_TIME_PERSPECTIVES_40[lensIdx]!;

  return (
    <div className="flex flex-col gap-4">
      <LabShell40
        labId="when-vs-bythetime"
        title="عدسة الحدث المرجعي الواحد: وصولك (you arrive)"
        status={current.tense}
        note="الحدث المرجعي ثابت (وصولك)، لكن أداة الربط وصيغة المستقبل تغيّران ما نراه حول لحظة الوصول."
      >
        <div className="tcc-tab-row">
          {WHEN_VS_BY_THE_TIME_PERSPECTIVES_40.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`tcc-tab-btn ${lensIdx === idx ? "is-active" : ""}`}
              onClick={() => setLensIdx(idx)}
            >
              <Rich40 text={`${item.connector} → ${item.tense}`} />
            </button>
          ))}
        </div>

        <div className={`tcc-card border ${channelClass(current.channel)}`}>
          <EnLine40>{current.sentence}</EnLine40>
          <p className="mt-2.5 mb-1 text-sm font-black">
            <Rich40 text={current.arabic} />
          </p>
          <p className="m-0 text-xs font-bold">
            <Rich40 text={current.focus} />
          </p>
        </div>
      </LabShell40>

      <ChoiceDeck40
        labId="when-vs-bythetime-quiz"
        title="اختبر التمييز بين WHEN وBY THE TIME"
        items={WHEN_VS_BY_THE_TIME_QUIZ_40}
      />
    </div>
  );
}

/* 11. Lab F: FOR vs SINCE Interactive Sorter */
function ForSinceSorterLab40() {
  const [picks, setPicks] = useState<Record<string, "for" | "since">>({});
  const total = FOR_SINCE_SORT_40.length;
  const correctCount = FOR_SINCE_SORT_40.filter((item) => picks[item.id] === item.kind).length;
  const answeredCount = Object.keys(picks).length;

  return (
    <LabShell40
      labId="for-since-sorter"
      title="مصنّف FOR للمدة مقابل SINCE لنقطة البداية"
      status={`الإجابات الصحيحة: ${correctCount} / ${total} (${answeredCount} مُصنفة)`}
      note="اختر الأداة المناسبة لكل عبارة زمنية لتركيب جملة مستقبلية دقيقة."
    >
      <div className="tcc-grid-2">
        {FOR_SINCE_SORT_40.map((item) => {
          const chosen = picks[item.id];
          const isOk = chosen === item.kind;
          return (
            <div key={item.id} className="tcc-card flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <span dir="ltr" className="font-en text-base font-black text-slate-900">
                  ______ {item.phrase}
                </span>
                {chosen ? (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold ${
                      isOk ? "bg-emerald-900 text-white" : "bg-red-900 text-white"
                    }`}
                  >
                    {isOk ? "صحيح ✓" : "راجع الاختيار"}
                  </span>
                ) : null}
              </div>

              <div className="flex gap-2" dir="ltr">
                {(["for", "since"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`tcc-choice-btn font-en justify-center ${
                      chosen === opt
                        ? opt === item.kind
                          ? "is-correct"
                          : "is-wrong"
                        : ""
                    }`}
                    onClick={() => setPicks((prev) => ({ ...prev, [item.id]: opt }))}
                  >
                    {opt.toUpperCase()}
                  </button>
                ))}
              </div>

              {chosen ? (
                <div className={`tcc-feedback ${isOk ? "is-ok" : "is-err"}`}>
                  <div dir="ltr" className="font-en font-extrabold">
                    {item.fullPhrase}
                  </div>
                  <div className="mt-1 text-xs">
                    <Rich40 text={item.meaning} />
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </LabShell40>
  );
}

/* 12. Lab H: Formula Builder Workbench */
function FormulaBuilderLab40() {
  const [targetIdx, setTargetIdx] = useState(0);
  const [built, setBuilt] = useState<string[]>([]);
  const target = FORMULA_BUILDER_TARGETS_40[targetIdx]!;

  const bank = [...target.tokens, ...target.distractors];
  const expectedPhrase = target.tokens.join(" ");
  const builtPhrase = built.join(" ");
  const isCompleteMatch = builtPhrase === expectedPhrase;
  const hasWrongPrefix =
    built.length > 0 &&
    !target.tokens.slice(0, built.length).every((tok, idx) => tok === built[idx]);

  const switchTarget = (idx: number) => {
    setTargetIdx(idx);
    setBuilt([]);
  };

  return (
    <LabShell40
      labId="formula-builder"
      title="ورشة تركيب الصيغ الخمس للفعل write"
      status={target.tense}
      note="اضغط على القطع النحوية بالترتيب الصحيح لبناء الصيغة المطلوبة وتجنّب القطع المضللة مثل wrote أو being."
    >
      <div className="tcc-tab-row">
        {FORMULA_BUILDER_TARGETS_40.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            className={`tcc-tab-btn ${targetIdx === idx ? "is-active" : ""}`}
            onClick={() => switchTarget(idx)}
          >
            <Rich40 text={t.tense} />
          </button>
        ))}
      </div>

      <div className="tcc-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-black text-slate-900">
            <Rich40 text={`ابنِ الصيغة الموافقة للقالب: ${target.formula}`} />
          </span>
          <span className="text-xs font-extrabold text-red-900">
            <Rich40 text={`احذر الخطأ: ${target.wrongExample}`} />
          </span>
        </div>

        <div className="mt-3 tcc-token-slot" aria-label="منطقة تجميع الصيغة">
          <span className="font-en text-sm font-bold text-slate-600">I / She</span>
          {built.length === 0 ? (
            <span className="font-en text-sm font-semibold text-slate-600">
              [ click tokens below to assemble ]
            </span>
          ) : (
            built.map((tok, i) => (
              <button
                key={`${tok}-${i}`}
                type="button"
                className="tcc-token-chip is-built font-en"
                onClick={() => setBuilt((prev) => prev.filter((_, idx) => idx !== i))}
                title="Remove token"
              >
                {tok} ✕
              </button>
            ))
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2" dir="ltr">
          {bank.map((tok) => (
            <button
              key={tok}
              type="button"
              className="tcc-token-chip font-en"
              onClick={() => setBuilt((prev) => [...prev, tok])}
            >
              + {tok}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="tcc-btn-secondary"
            onClick={() => setBuilt((prev) => prev.slice(0, -1))}
            disabled={built.length === 0}
          >
            تراجع خطوة
          </button>
          <button
            type="button"
            className="tcc-btn-secondary"
            onClick={() => setBuilt([])}
            disabled={built.length === 0}
          >
            إعادة الضبط
          </button>
        </div>

        {isCompleteMatch ? (
          <div className="mt-3 tcc-feedback is-ok">
            <div dir="ltr" className="font-en font-black">
              ✓ {target.correctExample}
            </div>
            <div className="mt-1">
              <Rich40 text={target.reason} />
            </div>
          </div>
        ) : hasWrongPrefix ? (
          <div className="mt-3 tcc-feedback is-err">
            <Rich40 text={`ترتيب غير سليم (${builtPhrase}) — راجع القالب ${target.formula} واضغط على القطعة الخاطئة لإزالتها.`} />
          </div>
        ) : null}
      </div>
    </LabShell40>
  );
}

/* 13. Formula Trap Repair Lab */
function FormulaTrapRepairLab40() {
  const [repaired, setRepaired] = useState<Record<number, boolean>>({});
  const repairedCount = Object.values(repaired).filter(Boolean).length;

  return (
    <LabShell40
      labId="formula-trap-repair"
      title="رادار إصلاح الأخطاء التركيبية الخمسة"
      status={`تم تصويب ${repairedCount} / ${FORMULA_ERROR_PAIRS_40.length}`}
      note="اضغط على كل تركيب خاطئ لتبديله بالتركيب القياسي ومراجعة القاعدة الحاكمة له."
    >
      <div className="flex flex-col gap-2.5">
        {FORMULA_ERROR_PAIRS_40.map((pair, idx) => {
          const fixed = Boolean(repaired[idx]);
          return (
            <div key={idx} className="tcc-card flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <EnLine40 tone={fixed ? "right" : "wrong"}>
                    {fixed ? pair.right : pair.wrong}
                  </EnLine40>
                </div>
                <button
                  type="button"
                  className={fixed ? "tcc-btn-secondary" : "tcc-btn-primary"}
                  onClick={() => setRepaired((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                >
                  {fixed ? "إظهار الخطأ للمقارنة" : "تصويب التركيب الآن"}
                </button>
              </div>
              {fixed ? (
                <div className="text-xs font-extrabold text-emerald-950">
                  <Rich40 text={`القاعدة البنيوية: ${pair.rule}`} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </LabShell40>
  );
}

/* 14. Lab I: Dialogue 1 & 2 Investigators */
function DialogueScienceInspector40() {
  const [showAr, setShowAr] = useState(true);
  const [selectedId, setSelectedId] = useState<string>(DIALOGUE1_LINES_40[1]!.id);
  const current =
    DIALOGUE1_LINES_40.find((l) => l.id === selectedId) ?? DIALOGUE1_LINES_40[0]!;

  return (
    <LabShell40
      labId="dialogue-science"
      title="محلل حوار مسابقة العلوم سطرًا بسطر"
      status={current.speaker}
      note="اضغط على أي مداخلة في الحوار لكشف الزمن المستخدم ودوره الدلالي في سياق المشروع."
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-extrabold text-slate-700">
          اختر سطرًا من الحوار لتحليله:
        </span>
        <button
          type="button"
          className="tcc-btn-secondary"
          onClick={() => setShowAr((v) => !v)}
        >
          {showAr ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {DIALOGUE1_LINES_40.map((line) => {
          const active = line.id === current.id;
          return (
            <button
              key={line.id}
              type="button"
              className={`tcc-choice-btn flex-col items-stretch ${active ? "is-selected" : ""}`}
              onClick={() => setSelectedId(line.id)}
            >
              <div dir="ltr" className="font-en text-left text-sm font-extrabold text-slate-900">
                <span className="text-blue-950">{line.speaker}:</span> {line.en}
              </div>
              {showAr ? (
                <div className="mt-1 text-right text-xs font-bold text-slate-700">
                  <Rich40 text={line.ar} />
                </div>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="tcc-feedback is-info">
        <div className="font-black">
          <Rich40 text={`الصيغة المرصودة: ${current.tense}`} />
        </div>
        <div className="mt-1">
          <Rich40 text={`سبب الاختيار: ${current.analysis}`} />
        </div>
      </div>
    </LabShell40>
  );
}

function DialogueTripReader40() {
  const [showAr, setShowAr] = useState(true);
  return (
    <LabShell40
      labId="dialogue-trip-read"
      title="قارئ حوار رحلة العائلة التفاعلي"
      status="8 مداخلات مترابطة"
      note="اقرأ مداخلات الأب والأم والابنة والابن ولاحظ تسلسل الخطط والأدلة الحاضرة والقرارات اللحظية والمدد."
    >
      <div className="flex justify-end">
        <button
          type="button"
          className="tcc-btn-secondary"
          onClick={() => setShowAr((v) => !v)}
        >
          {showAr ? "إخفاء الترجمة المساندة" : "إظهار الترجمة المساندة"}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {DIALOGUE2_LINES_40.map((line) => (
          <div key={line.id} className="tcc-card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-extrabold text-slate-900">
                <Rich40 text={line.tense} />
              </span>
              <span dir="ltr" className="font-en text-xs font-black text-blue-950">
                {line.speaker}
              </span>
            </div>
            <div className="mt-2">
              <EnLine40>{line.en}</EnLine40>
            </div>
            {showAr ? (
              <p className="mt-2 mb-0 text-xs font-bold text-slate-800">
                <Rich40 text={line.ar} />
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </LabShell40>
  );
}

function DialogueTripClassifyLab40() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <ChoiceDeck40
        labId="dialogue-trip-classify"
        title="تحدي تصنيف الجمل الست في حوار رحلة العائلة"
        note="أكمل تصنيف البنود الستة لفتح بطاقة الحلول النموذجية الكاملة للمراجعة الذاتية."
        items={DIALOGUE2_CHALLENGE_40}
        onAllAttempted={setDone}
      />
      <PracticeRevealBox40
        section={sourceSection40("s17")}
        unlocked={done}
        title="الحل النموذجي لتحدي حوار رحلة العائلة"
      />
    </div>
  );
}

/* 15. Lab K: Exercise 19 MCQ Practice */
function Exercise19Lab40({ full }: { full: boolean }) {
  const subset = full ? EXERCISE19_ITEMS_40 : EXERCISE19_ITEMS_40.slice(0, 3);
  const [picked, setPicked] = useState<Record<number, string>>({});
  const answeredCount = subset.filter((it) => Boolean(picked[it.n])).length;
  const allDone = full && answeredCount === EXERCISE19_ITEMS_40.length;

  return (
    <div className="flex flex-col gap-4">
      <LabShell40
        labId={full ? "practice19-full" : "practice19-part1"}
        title={full ? "التدريب الأول الكامل (البنود 1–6)" : "التدريب الأول التمهيدي (البنود 1–3)"}
        status={`تمت الإجابة عن ${answeredCount} / ${subset.length}`}
        note={
          full
            ? "أجب عن جميع البنود الستة لفتح بطاقة الحلول الكاملة ومطابقة اختياراتك."
            : "اختر الإجابة الأنسب لكل موقف للحصول على تفسير فوري."
        }
      >
        <div className="flex flex-col gap-3.5">
          {subset.map((item) => {
            const current = picked[item.n];
            const isOk = current === item.answer;
            return (
              <div key={item.n} className="tcc-card flex flex-col gap-2.5">
                <EnLine40>{item.prompt}</EnLine40>
                <div className="tcc-grid-3" dir="ltr">
                  {item.options.map((opt) => {
                    const chosen = current === opt.label;
                    const cls = !current
                      ? ""
                      : opt.label === item.answer
                        ? "is-correct"
                        : chosen
                          ? "is-wrong"
                          : "";
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        dir="ltr"
                        className={`tcc-choice-btn font-en ${chosen ? "is-selected" : ""} ${cls}`.trim()}
                        onClick={() => setPicked((prev) => ({ ...prev, [item.n]: opt.label }))}
                      >
                        <span>{opt.text}</span>
                        <span>{current && opt.label === item.answer ? "✓" : ""}</span>
                      </button>
                    );
                  })}
                </div>
                {current ? (
                  <div className={`tcc-feedback ${isOk ? "is-ok" : "is-err"}`}>
                    <Rich40
                      text={`${isOk ? "إجابة صحيحة" : `الصواب هو ${item.answer} (${item.answerText})`} — ${item.why}`}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </LabShell40>

      {full ? (
        <PracticeRevealBox40
          section={sourceSection40("s19")}
          unlocked={allDone}
          title="حلول التدريب الأول الكاملة"
        />
      ) : null}
    </div>
  );
}

/* 16. Lab K: Exercise 20 Fill-in-the-Blanks */
function Fill20Lab40() {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const checkedCount = FILL20_ITEMS_40.filter((it) => Boolean(checked[it.n])).length;
  const allChecked = checkedCount === FILL20_ITEMS_40.length;

  return (
    <div className="flex flex-col gap-4">
      <LabShell40
        labId="practice20-fill"
        title="مختبر إكمال الصيغ الفعلية الثماني"
        status={`تم فحص ${checkedCount} / ${FILL20_ITEMS_40.length}`}
        note="اكتب صيغة الفعل المناسبة (تُقبل الصيغ الكاملة والمختصرة والبدائل السياقية السليمة)، ثم اضغط «تحقق» لكل جملة لفتح الحلول المفصلة."
      >
        <div className="flex flex-col gap-3.5">
          {FILL20_ITEMS_40.map((item) => {
            const val = inputs[item.n] ?? "";
            const isChecked = Boolean(checked[item.n]);
            const isOk = isChecked && matchesAcceptedAnswer40(val, item.accepted);
            return (
              <div key={item.n} className="tcc-card flex flex-col gap-2.5">
                <EnLine40>{item.prompt}</EnLine40>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    aria-label={`Blank ${item.n}`}
                    placeholder="Type the future verb form..."
                    className="tcc-input font-en flex-1 min-w-[14rem]"
                    value={val}
                    onChange={(e) => {
                      const next = e.target.value;
                      setInputs((prev) => ({ ...prev, [item.n]: next }));
                      setChecked((prev) => ({ ...prev, [item.n]: false }));
                    }}
                  />
                  <button
                    type="button"
                    className="tcc-btn-primary"
                    disabled={!val.trim()}
                    onClick={() => setChecked((prev) => ({ ...prev, [item.n]: true }))}
                  >
                    تحقق
                  </button>
                </div>
                {isChecked ? (
                  <div className={`tcc-feedback ${isOk ? "is-ok" : "is-err"}`}>
                    <div>
                      <Rich40
                        text={
                          isOk
                            ? `إجابة سليمة! الصيغة النموذجية: ${item.answer}`
                            : `الصيغة النموذجية هي: ${item.answer}`
                        }
                      />
                    </div>
                    <div className="mt-1 text-xs">
                      <Rich40 text={item.why} />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </LabShell40>

      <PracticeRevealBox40
        section={sourceSection40("s20")}
        unlocked={allChecked}
        title="الحلول المفصلة للتدريب الثاني"
      />
    </div>
  );
}

/* 17. Lab K: Detective 21 Error Correction */
function Detective21Lab40() {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const checkedCount = DETECTIVE21_ITEMS_40.filter((it) => Boolean(checked[it.n])).length;
  const allChecked = checkedCount === DETECTIVE21_ITEMS_40.length;

  return (
    <div className="flex flex-col gap-4">
      <LabShell40
        labId="detective21-repair"
        title="محقق القواعد: صحح الجمل العشر"
        status={`تم تصحيح وفحص ${checkedCount} / ${DETECTIVE21_ITEMS_40.length}`}
        note="أعد كتابة الجملة صحيحة أو اكتب الجزء المصحح ثم اضغط «فحص التصحيح». فحص البنود العشرة يفتح بطاقة المراجعة الكاملة."
      >
        <div className="flex flex-col gap-3.5">
          {DETECTIVE21_ITEMS_40.map((item) => {
            const val = inputs[item.n] ?? "";
            const isChecked = Boolean(checked[item.n]);
            const isOk = isChecked && matchesAcceptedAnswer40(val, item.accepted);
            return (
              <div key={item.n} className="tcc-card flex flex-col gap-2.5">
                <EnLine40 tone="wrong">{item.prompt}</EnLine40>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    aria-label={`Correction ${item.n}`}
                    placeholder="Write the corrected sentence or verb phrase..."
                    className="tcc-input font-en flex-1 min-w-[14rem]"
                    value={val}
                    onChange={(e) => {
                      const next = e.target.value;
                      setInputs((prev) => ({ ...prev, [item.n]: next }));
                      setChecked((prev) => ({ ...prev, [item.n]: false }));
                    }}
                  />
                  <button
                    type="button"
                    className="tcc-btn-primary"
                    disabled={!val.trim()}
                    onClick={() => setChecked((prev) => ({ ...prev, [item.n]: true }))}
                  >
                    فحص التصحيح
                  </button>
                </div>
                {isChecked ? (
                  <div className={`tcc-feedback ${isOk ? "is-ok" : "is-err"}`}>
                    <div dir="ltr" className="font-en font-extrabold">
                      ✓ {item.answer}
                    </div>
                    <div className="mt-1 text-xs">
                      <Rich40 text={item.why} />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </LabShell40>

      <PracticeRevealBox40
        section={sourceSection40("s21")}
        unlocked={allChecked}
        title="حلول Grammar Detective الكاملة"
      />
    </div>
  );
}

/* 18. Lab L: Reading Passage Lens & Comprehension */
function ReadingPassageLensLab40() {
  const [stIdx, setStIdx] = useState(0);
  const current = READING23_STATIONS_40[stIdx]!;

  return (
    <LabShell40
      labId="reading23-passage"
      title="عدسة تتبع الأزمنة داخل قصة مركز التعلم المستقبلي"
      status={current.tense}
      note="تنقّل بين المحطات الزمنية الست داخل القصة لملاحظة كيف تخدم كل صيغة حدثًا محددًا في المشروع."
    >
      <div className="tcc-tab-row">
        {READING23_STATIONS_40.map((st, idx) => (
          <button
            key={st.id}
            type="button"
            className={`tcc-tab-btn ${stIdx === idx ? "is-active" : ""}`}
            onClick={() => setStIdx(idx)}
          >
            <Rich40 text={st.label} />
          </button>
        ))}
      </div>

      <div className={`tcc-card border ${channelClass(current.channel)}`}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-black">
            <Rich40 text={current.label} />
          </span>
          <span dir="ltr" className={`font-en tcc-chip-badge ${channelClass(current.channel)}`}>
            {current.tense}
          </span>
        </div>
        <EnLine40>{current.quote}</EnLine40>
        <p className="mt-2.5 mb-0 text-sm font-bold">
          <Rich40 text={current.meaning} />
        </p>
      </div>
    </LabShell40>
  );
}

function ReadingQuestionsLab40() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <ChoiceDeck40
        labId="reading23-questions"
        title="اختبر فهمك التفصيلي للنص (الأسئلة 1–8)"
        note="أجب عن الأسئلة الثمانية بالاعتماد على النص لفتح بطاقة الحلول النموذجية."
        items={READING23_ITEMS_40}
        onAllAttempted={setDone}
      />
      <PracticeRevealBox40
        section={sourceSection40("s23")}
        unlocked={done}
        title="حلول أسئلة الفهم الثمانية"
      />
    </div>
  );
}

function StoryAnalysisInspector40() {
  const [idx, setIdx] = useState(0);
  const current = STORY_ANALYSIS24_ITEMS_40[idx]!;
  return (
    <LabShell40
      labId="story24-analysis"
      title="مختبر تحليل جمل القصة الست"
      status={`${idx + 1} / ${STORY_ANALYSIS24_ITEMS_40.length}`}
      note="اختر كل جملة محورية من القصة لمراجعة الصيغة النحوية والسبب الدلالي لاختيارها."
    >
      <div className="tcc-tab-row">
        {STORY_ANALYSIS24_ITEMS_40.map((it, i) => (
          <button
            key={it.id}
            type="button"
            className={`tcc-tab-btn ${idx === i ? "is-active" : ""}`}
            onClick={() => setIdx(i)}
          >
            <Rich40 text={`${i + 1}. ${it.tense}`} />
          </button>
        ))}
      </div>
      <div className={`tcc-card border ${channelClass(current.channel)}`}>
        <EnLine40>{current.sentence}</EnLine40>
        <p className="mt-2.5 mb-1 text-sm font-black">
          <Rich40 text={`الوظيفة الدلالية: ${current.reason}`} />
        </p>
        <p className="m-0 text-xs font-bold">
          <Rich40 text={current.detail} />
        </p>
      </div>
    </LabShell40>
  );
}

/* 19. Exam & Solutions Gateway Labs */
function ExamGatewayLab40({
  onOpenTest,
  testSubmitted,
}: {
  onOpenTest: () => void;
  testSubmitted: boolean;
}) {
  const levels = [
    "المستوى الأول (1–5): اختر الإجابة الصحيحة",
    "المستوى الثاني (6–10): أكمل الجمل بالصيغة المناسبة",
    "المستوى الثالث (11–15): صحح الخطأ",
    "المستوى الرابع (16–20): التمييز العميق وتفسير المعنى",
    "المستوى الخامس (21–25): فقرة The Big School Project المترابطة",
  ];
  return (
    <LabShell40
      labId="exam25-gateway"
      title="منصة إطلاق الاختبار النهائي الشامل (25 سؤالًا)"
      status={testSubmitted ? "تم تسليم محاولة" : "جاهز للبدء"}
      note="يُقدَّم الاختبار في مساحة مستقلة خالية من أي تلميحات أو مفاتيح إجابة قبل التسليم الفعلي."
    >
      <div className="flex flex-col gap-2">
        {levels.map((lv, i) => (
          <div key={i} className="tcc-card py-2.5 text-sm font-bold text-slate-900">
            <Rich40 text={lv} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="tcc-btn-primary" onClick={onOpenTest}>
          {testSubmitted ? "مراجعة محاولتك المسلمة في منطقة الاختبار" : "ابدأ الاختبار الشامل الآن (25 سؤالًا)"}
        </button>
      </div>
    </LabShell40>
  );
}

function SolutionsGatewayLab40({
  testSubmitted,
  teacherUnlocked,
  onOpenTest,
  onOpenSolutions,
  onOpenTeacher,
}: {
  testSubmitted: boolean;
  teacherUnlocked: boolean;
  onOpenTest: () => void;
  onOpenSolutions: () => void;
  onOpenTeacher: () => void;
}) {
  const unlocked = testSubmitted || teacherUnlocked;
  return (
    <LabShell40
      labId="solutions26-gateway"
      title="حالة الحلول التفصيلية للاختبار النهائي"
      status={unlocked ? "مفتوحة للمراجعة" : "محجوبة حتى تسليم الاختبار"}
      note="حرصًا على مصداقية التقييم الذاتي، تظل الحلول التفصيلية للأسئلة الخمسة والعشرين محجوبة حتى تسلّم محاولتك كاملة."
    >
      <div className="flex flex-wrap gap-2.5">
        {unlocked ? (
          <button type="button" className="tcc-btn-primary" onClick={onOpenSolutions}>
            فتح الحلول التفصيلية الآن
          </button>
        ) : (
          <button type="button" className="tcc-btn-primary" onClick={onOpenTest}>
            انتقل إلى منطقة الاختبار أولًا
          </button>
        )}
        <button type="button" className="tcc-btn-secondary" onClick={onOpenTeacher}>
          مساحة المعلم
        </button>
      </div>
    </LabShell40>
  );
}

/* 20. Lab M: Writing Mission Planner & Studio */
function WritingPlannerLab40() {
  const [planned, setPlanned] = useState<Record<number, boolean>>({});
  const count = Object.values(planned).filter(Boolean).length;
  return (
    <LabShell40
      labId="writing27-planner"
      title="مخطط الشروط العشرة لفقرة My Future Learning Journey"
      status={`تم تجهيز ${count} / ${WRITING27_CRITERIA_40.length}`}
      note="راجع الشروط العشرة وحدد كيف ستوزع جملك (15–18 جملة) قبل الانتقال إلى استوديو الكتابة في الخطوة التالية."
    >
      <div className="flex flex-col gap-2">
        {WRITING27_CRITERIA_40.map((cr, idx) => {
          const on = Boolean(planned[idx]);
          return (
            <button
              key={idx}
              type="button"
              className={`flex items-center justify-between tcc-choice-btn ${on ? "is-correct" : ""}`}
              onClick={() => setPlanned((prev) => ({ ...prev, [idx]: !prev[idx] }))}
            >
              <span className="block">
                <Rich40 text={cr} />
              </span>
              <span className="block shrink-0 text-xs font-extrabold">{on ? "مخطط ✓" : "أضف للخطة"}</span>
            </button>
          );
        })}
      </div>
    </LabShell40>
  );
}

function countEnglishSentences40(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const parts = trimmed
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => /[A-Za-z]{2,}/.test(s));
  return parts.length;
}

function detectWritingHints40(text: string): boolean[] {
  const lower = text.toLowerCase();
  const fpcMatches = lower.match(/\b(?:will|'ll)\s+have\s+been\s+[a-z]+ing\b/g) ?? [];
  const fpMatches =
    lower
      .replace(/\b(?:will|'ll)\s+have\s+been\s+[a-z]+ing\b/g, "")
      .match(/\b(?:will|'ll)\s+have\s+[a-z]+\b/g) ?? [];
  const fcMatches = lower.match(/\b(?:will|'ll)\s+be\s+[a-z]+ing\b/g) ?? [];
  const goingMatches = lower.match(/\b(?:am|'m|is|'s|are|'re)\s+(?:not\s+)?going\s+to\s+[a-z]+\b/g) ?? [];
  const bareWillMatches =
    lower
      .replace(/\b(?:will|'ll)\s+have\b/g, "")
      .replace(/\b(?:will|'ll)\s+be\s+[a-z]+ing\b/g, "")
      .match(/\b(?:will|'ll|won't)\s+(?:not\s+)?[a-z]+\b/g) ?? [];
  const hasNegative = /\b(?:won't|will not|am not|isn't|is not|aren't|are not|don't|doesn't)\b/.test(
    lower
  );
  const hasWillYouBe = /\bwill\s+you\s+be\s+[a-z]+ing\b/.test(lower);
  const hasHowLongFpc = /\bhow\s+long\s+will\s+you\s+have\s+been\s+[a-z]+ing\b/.test(lower);
  const hasByTheTime = /\bby\s+the\s+time\b/.test(lower);
  const timeSignals = [
    /\bnext\s+(?:year|month|week|summer|october|june|friday|monday)\b/,
    /\btomorrow\b/,
    /\bat\s+(?:this\s+time|\d{1,2}(?::\d{2})?)\b/,
    /\bby\s+(?:the\s+end|the\s+time|next|noon|midnight|friday|\d{1,2})\b/,
    /\bfor\s+(?:a\s+long\s+time|[a-z0-9]+\s+(?:hours?|months?|years?|weeks?))\b/,
    /\bsince\s+[a-z0-9]+\b/,
    /\bwhen\b/,
    /\bbefore\b/,
    /\bafter\b/,
    /\bas\s+soon\s+as\b/,
  ].filter((rx) => rx.test(lower)).length;

  return [
    bareWillMatches.length >= 2,
    goingMatches.length >= 2,
    fcMatches.length >= 3,
    fpMatches.length >= 3,
    fpcMatches.length >= 3,
    hasNegative,
    hasWillYouBe,
    hasHowLongFpc,
    hasByTheTime,
    timeSignals >= 4,
  ];
}

function WritingStudioLab40() {
  const STORAGE_KEY = "l40-writing-mission-draft";
  const [draft, setDraft] = useState<string>(() => {
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [selfChecks, setSelfChecks] = useState<Record<number, boolean>>({});
  const [showModelNotes, setShowModelNotes] = useState(false);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, draft);
    } catch {
      // sessionStorage optional
    }
  }, [draft]);

  const sentenceCount = countEnglishSentences40(draft);
  const hints = detectWritingHints40(draft);
  const autoMet = hints.filter(Boolean).length;
  const inRange = sentenceCount >= 15 && sentenceCount <= 18;

  return (
    <LabShell40
      labId="writing27-studio"
      title="استوديو الكتابة الذاتية: My Future Learning Journey"
      status={`عدد الجمل: ${sentenceCount} (المطلوب 15–18) · مؤشرات البنية: ${autoMet} / 10`}
      note="اكتب فقرتك الخاصة باللغة الإنجليزية دون نسخ النموذج الإرشادي. تساعدك المؤشرات الآلية على رصد البنى النحوية الظاهرة، بينما تتطلب جودة المعنى والترابط مراجعة ذاتية أو مراجعة المعلم."
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-extrabold ${
            inRange ? "bg-emerald-900 text-white" : "bg-amber-900 text-white"
          }`}
        >
          {inRange
            ? `الطول مثالي (${sentenceCount} جملة ضمن نطاق 15–18) ✓`
            : `عدد الجمل الحالي: ${sentenceCount} — استهدف من 15 إلى 18 جملة`}
        </span>
        <button
          type="button"
          className="tcc-btn-secondary"
          onClick={() => setShowModelNotes((v) => !v)}
        >
          {showModelNotes ? "إخفاء تحليل النموذج الإرشادي" : "تحليل صيغ النموذج الإرشادي"}
        </button>
      </div>

      {showModelNotes ? (
        <div className="tcc-card flex flex-col gap-2">
          <div className="text-xs font-black text-slate-900">
            تحليل الجمل الست في النموذج الإرشادي (للاستلهام لا للنسخ):
          </div>
          {WRITING27_MODEL_40.map((sentence, idx) => (
            <div key={idx} className="rounded-lg border border-slate-200 bg-white p-2.5">
              <EnLine40>{sentence}</EnLine40>
              <div className="mt-1.5 text-xs font-bold text-slate-800">
                <Rich40 text={WRITING27_MODEL_FORMS_40[idx] ?? ""} />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <textarea
        dir="ltr"
        rows={9}
        aria-label="My Future Learning Journey paragraph"
        placeholder="Write your 15–18 sentence paragraph titled 'My Future Learning Journey' here..."
        className="tcc-input font-en leading-relaxed"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        <div className="text-xs font-black text-slate-900">
          قائمة المراجعة الذاتية للشروط العشرة:
        </div>
        {WRITING27_CRITERIA_40.map((cr, idx) => {
          const manual = Boolean(selfChecks[idx]);
          const auto = Boolean(hints[idx]);
          return (
            <button
              key={idx}
              type="button"
              className={`flex items-center justify-between tcc-choice-btn ${manual || auto ? "is-correct" : ""}`}
              onClick={() => setSelfChecks((prev) => ({ ...prev, [idx]: !prev[idx] }))}
            >
              <span className="block">
                <Rich40 text={cr} />
              </span>
              <span className="block shrink-0 text-xs font-extrabold">
                {auto ? "رُصد بنيويًا ✓" : manual ? "تمت مراجعته ✓" : "قيد الإنجاز"}
              </span>
            </button>
          );
        })}
      </div>
    </LabShell40>
  );
}

/* 21. Golden Summary & Curriculum Roadmap Labs */
function SummaryCardsLab40({ slice }: { slice: "part1" | "part2" }) {
  const cards =
    slice === "part1"
      ? GOLDEN_SUMMARY28_CARDS_40.slice(0, 3)
      : GOLDEN_SUMMARY28_CARDS_40.slice(3, 5);
  const [idx, setIdx] = useState(0);
  const active = cards[idx] ?? cards[0]!;

  return (
    <LabShell40
      labId={`summary28-${slice}`}
      title="بطاقات المراجعة السريعة للصيغ المستقبلية"
      status={`${active.order} ${active.title}`}
      note="استعرض القالب النحوي والاستخدام النموذجي والمثال المرجعي لكل صيغة."
    >
      <div className="tcc-tab-row">
        {cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className={`tcc-tab-btn ${idx === i ? "is-active" : ""}`}
            onClick={() => setIdx(i)}
          >
            <Rich40 text={`${c.order} ${c.title}`} />
          </button>
        ))}
      </div>
      <div className={`tcc-card border ${channelClass(active.channel)}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`tcc-chip-badge ${channelClass(active.channel)}`}>
            <Rich40 text={active.title} />
          </span>
          <span dir="ltr" className="font-en text-xs font-extrabold">
            {active.formula}
          </span>
        </div>
        <p className="mt-2.5 mb-2 text-sm font-bold">
          <Rich40 text={`الاستخدام: ${active.uses}`} />
        </p>
        <EnLine40>{active.example}</EnLine40>
      </div>
    </LabShell40>
  );
}

function CurriculumSystemsLab40() {
  const [sysIdx, setSysIdx] = useState(2);
  const system = CURRICULUM_SYSTEMS_40[sysIdx]!;

  return (
    <LabShell40
      labId="roadmap29-tenses"
      title="خريطة المنظومات الزمنية الثلاث المكتملة (15 محطة)"
      status={system.title}
      note="استعرض محطات الحاضر والماضي والمستقبل التي اكتملت بإنجاز الدرس 40."
    >
      <div className="tcc-tab-row">
        {CURRICULUM_SYSTEMS_40.map((sys, idx) => (
          <button
            key={sys.id}
            type="button"
            className={`tcc-tab-btn ${sysIdx === idx ? "is-active" : ""}`}
            onClick={() => setSysIdx(idx)}
          >
            <Rich40 text={sys.title} />
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {system.stations.map((st) => (
          <div key={st.num} className="tcc-card flex flex-col gap-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-black text-slate-900">
                <Rich40 text={`${st.num} ${st.name}`} />
              </span>
              <span className="text-xs font-extrabold text-teal-900">
                <Rich40 text={st.pattern} />
              </span>
            </div>
            <p className="m-0 text-xs font-bold text-slate-700">
              <Rich40 text={st.note} />
            </p>
          </div>
        ))}
      </div>
    </LabShell40>
  );
}

function NextLessonBridgeLab40() {
  const [qIdx, setQIdx] = useState(0);
  const active = NEXT_LESSON_40.previewQuestions[qIdx]!;

  return (
    <LabShell40
      labId="roadmap29-lesson41"
      title="جسر الانطلاق نحو الدرس 41: الأفعال المساعدة"
      status={active.aux}
      note="قارن بين الأسئلة الأربعة لترى لماذا يتغير الفعل المساعد بتغير البنية النحوية والمعنى، ثم انتقل مباشرة إلى الدرس 41."
    >
      <div className="tcc-tab-row" dir="ltr">
        {NEXT_LESSON_40.previewQuestions.map((item, idx) => (
          <button
            key={item.q}
            type="button"
            dir="ltr"
            className={`tcc-tab-btn font-en ${qIdx === idx ? "is-active" : ""}`}
            onClick={() => setQIdx(idx)}
          >
            {item.q}
          </button>
        ))}
      </div>

      <div className="tcc-card">
        <EnLine40>{active.q}</EnLine40>
        <p className="mt-2.5 mb-0 text-sm font-bold text-slate-900">
          <Rich40 text={`الأداة الفاعلة (${active.aux}): ${active.role}`} />
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-300 bg-slate-900 p-4 text-white">
        <div>
          <div className="text-sm font-black">
            <Rich40 text={NEXT_LESSON_40.label} />
          </div>
          <div className="mt-1 text-xs font-bold text-slate-200">
            <Rich40 text={`الأفعال المساعدة الأساسية (${NEXT_LESSON_40.primaryAuxiliaries}) والأفعال الناقصة متاحة الآن في المحطة التالية.`} />
          </div>
        </div>
        <a
          href={NEXT_LESSON_40.href}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-black text-slate-950 no-underline hover:bg-emerald-100"
        >
          الانتقال إلى الدرس 41 ←
        </a>
      </div>
    </LabShell40>
  );
}

/* Master Lab Dispatcher for all 54 steps */
export function StepLabRenderer40({
  lab,
  onOpenTest,
  onOpenSolutions,
  onOpenTeacher,
  testSubmitted,
  teacherUnlocked,
}: {
  lab: StepLabKind40;
  onOpenTest: () => void;
  onOpenSolutions: () => void;
  onOpenTeacher: () => void;
  testSubmitted: boolean;
  teacherUnlocked: boolean;
}) {
  switch (lab) {
    case "cover-horizon":
      return <CoverHorizonLab40 />;
    case "cover-intent":
      return (
        <ChoiceDeck40
          labId="cover-intent"
          title="بوصلة الانطلاق: كيف نفكر في أزمنة المستقبل؟"
          items={COVER_INTENT_ITEMS}
        />
      );
    case "objectives-part1":
      return <ObjectivesTrackerLab40 slice="part1" />;
    case "objectives-part2":
      return <ObjectivesTrackerLab40 slice="part2" />;
    case "six-q-console":
      return <SixQuestionConsoleLab40 />;
    case "six-q-router":
      return (
        <ChoiceDeck40
          labId="six-q-router"
          title="موجّه المواقف عبر الأسئلة التشخيصية الستة"
          items={DECISION_MAP_QUIZ_40}
        />
      );
    case "golden-table-lab":
      return (
        <ChoiceDeck40
          labId="golden-table-lab"
          title="فحص إتقان الجدول الذهبي الشامل"
          items={GOLDEN_TABLE_ITEMS_40}
        />
      );
    case "five-angles-study":
      return <FiveAnglesStudyLab40 />;
    case "five-angles-shift":
      return (
        <ChoiceDeck40
          labId="five-angles-shift"
          title="تحدي التمييز بين زوايا الحدث الخمس"
          items={STUDY_PERSPECTIVES_QUIZ_40}
        />
      );
    case "will-going-decisions":
      return (
        <ChoiceDeck40
          labId="will-going-decisions"
          title="مختبر القرار اللحظي مقابل الخطة المسبقة"
          items={WILL_VS_GOING_TO_SCENARIOS_40.slice(0, 2)}
        />
      );
    case "will-going-overlap":
      return (
        <ChoiceDeck40
          labId="will-going-overlap"
          title="مختبر التوقعات ومنطقة التداخل الطبيعي"
          note="تذكّر: تتداخل will وgoing to في بعض التوقعات العامة، بينما تبرز BE GOING TO الدليل الحاضر المرئي الآن."
          items={WILL_VS_GOING_TO_SCENARIOS_40.slice(2, 4)}
        />
      );
    case "fc-window":
      return <FutureContinuousWindowLab40 />;
    case "fc-polite":
      return (
        <ChoiceDeck40
          labId="fc-polite"
          title="تطبيقات الاستمرار المستقبلي والسؤال المهذب"
          items={[FUTURE_CONTINUOUS_ITEMS_40[1]!]}
        />
      );
    case "fp-deadline":
      return (
        <ChoiceDeck40
          labId="fp-deadline"
          title="مختبر الاكتمال قبل الموعد النهائي (By Friday)"
          items={[FUTURE_PERFECT_ITEMS_40[0]!]}
        />
      );
    case "fp-checkpoint":
      return (
        <ChoiceDeck40
          labId="fp-checkpoint"
          title="نقطة المرجع المستقبلي واكتمال التجهيز"
          items={[FUTURE_PERFECT_ITEMS_40[1]!]}
        />
      );
    case "fpc-duration":
      return <SaraDurationLab40 />;
    case "fpc-anchors":
      return (
        <ChoiceDeck40
          labId="fpc-anchors"
          title="السؤال الحاكم لقياس المدة الممتدة"
          items={[FUTURE_PERFECT_CONTINUOUS_ITEMS_40[1]!]}
        />
      );
    case "adam-timeline":
      return <AdamTimelineLab40 />;
    case "adam-matcher":
      return (
        <ChoiceDeck40
          labId="adam-matcher"
          title="طابق السؤال المقصود بالصيغة الدقيقة في مشروع آدم"
          items={ADAM_COMPARISON_QUIZ_40}
        />
      );
    case "deep-mythbuster":
      return (
        <ChoiceDeck40
          labId="deep-mythbuster"
          title="فحص الفهم العميق: هل تعني المدة عدم الاكتمال؟"
          items={[DEEP_UNDERSTANDING_ITEMS_40[0]!]}
        />
      );
    case "deep-focus":
      return (
        <ChoiceDeck40
          labId="deep-focus"
          title="تثبيت المعيار الفاصل: النتيجة مقابل المدة"
          items={[DEEP_UNDERSTANDING_ITEMS_40[1]!]}
        />
      );
    case "signals-nuance":
      return (
        <div className="flex flex-col gap-4">
          <LabShell40
            labId="signals-nuance-strip"
            title="لوحة الإشارات الزمنية الثماني"
            status="إشارات مساعدة لا قوالب جامدة"
            note="تأمل الإشارات الزمنية التالية ثم اختبر لماذا لا تفرض by Friday صيغة وحيدة."
          >
            <div className="flex flex-wrap gap-2" dir="ltr">
              {SIGNAL_WORDS_LIST_40.map((sig) => (
                <span
                  key={sig}
                  className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 font-en text-xs font-extrabold text-slate-900"
                >
                  {sig}
                </span>
              ))}
            </div>
          </LabShell40>
          <ChoiceDeck40
            labId="signals-nuance"
            title="اختبر مرونة الصيغ مع by Friday"
            items={[SIGNAL_WORDS_ITEMS_40[0]!]}
          />
        </div>
      );
    case "signals-dual":
      return (
        <ChoiceDeck40
          labId="signals-dual"
          title="اختبر مرونة الصيغ مع for ten years"
          items={[SIGNAL_WORDS_ITEMS_40[1]!]}
        />
      );
    case "time-clause-builder":
      return <TimeClauseBuilderLab40 />;
    case "time-clause-vs-question":
      return (
        <ChoiceDeck40
          labId="time-clause-vs-question"
          title="ميّز بين الجملة الزمنية التابعة والسؤال المباشر بـ When"
          items={TIME_CLAUSE_QUIZ_40}
        />
      );
    case "when-vs-bythetime":
      return <WhenVsByTheTimeLab40 />;
    case "for-since-sorter":
      return <ForSinceSorterLab40 />;
    case "know-stative":
      return (
        <ChoiceDeck40
          labId="know-stative"
          title="اختبر استخدام FOR مع أفعال الحالة مثل know"
          items={FOR_SINCE_STATIVE_QUIZ_40}
        />
      );
    case "formula-builder":
      return <FormulaBuilderLab40 />;
    case "formula-trap-repair":
      return <FormulaTrapRepairLab40 />;
    case "dialogue-science":
      return <DialogueScienceInspector40 />;
    case "dialogue-science-roles":
      return (
        <ChoiceDeck40
          labId="dialogue-science-roles"
          title="فحص الدوافع الدلالية في حوار مسابقة العلوم"
          items={DIALOGUE1_CHECK_40}
        />
      );
    case "dialogue-trip-read":
      return <DialogueTripReader40 />;
    case "dialogue-trip-classify":
      return <DialogueTripClassifyLab40 />;
    case "scenarios-1-3":
      return (
        <ChoiceDeck40
          labId="scenarios-1-3"
          title="مختبر الاستدلال السياقي (المواقف 1–3)"
          items={SITUATION_LAB_ITEMS_40.slice(0, 3)}
        />
      );
    case "scenarios-4-5":
      return (
        <ChoiceDeck40
          labId="scenarios-4-5"
          title="مختبر الاستدلال السياقي (الموقفان 4–5)"
          items={SITUATION_LAB_ITEMS_40.slice(3, 5)}
        />
      );
    case "practice19-part1":
      return <Exercise19Lab40 full={false} />;
    case "practice19-full":
      return <Exercise19Lab40 full={true} />;
    case "practice20-fill":
      return <Fill20Lab40 />;
    case "detective21-repair":
      return <Detective21Lab40 />;
    case "iq22-multivalid":
      return (
        <ChoiceDeck40
          labId="iq22-multivalid"
          title="مختبر تعدد الإجابات الصحيحة باختلاف زاوية التركيز"
          items={IQ22_ITEMS_40}
        />
      );
    case "reading23-passage":
      return <ReadingPassageLensLab40 />;
    case "reading23-questions":
      return <ReadingQuestionsLab40 />;
    case "story24-analysis":
      return <StoryAnalysisInspector40 />;
    case "story24-intent":
      return (
        <ChoiceDeck40
          labId="story24-intent"
          title="اختبر مهارة السؤال عن قصد الكاتب"
          items={STORY_ANALYSIS24_QUIZ_40}
        />
      );
    case "exam25-gateway":
      return <ExamGatewayLab40 onOpenTest={onOpenTest} testSubmitted={testSubmitted} />;
    case "solutions26-gateway":
      return (
        <SolutionsGatewayLab40
          testSubmitted={testSubmitted}
          teacherUnlocked={teacherUnlocked}
          onOpenTest={onOpenTest}
          onOpenSolutions={onOpenSolutions}
          onOpenTeacher={onOpenTeacher}
        />
      );
    case "writing27-planner":
      return <WritingPlannerLab40 />;
    case "writing27-studio":
      return <WritingStudioLab40 />;
    case "summary28-part1":
      return <SummaryCardsLab40 slice="part1" />;
    case "summary28-part2":
      return <SummaryCardsLab40 slice="part2" />;
    case "summary28-rule":
      return (
        <ChoiceDeck40
          labId="summary28-rule"
          title="فحص إتقان القاعدة الذهبية الكبرى"
          items={GOLDEN_SUMMARY28_QUIZ_40}
        />
      );
    case "roadmap29-tenses":
      return <CurriculumSystemsLab40 />;
    case "roadmap29-lesson41":
      return <NextLessonBridgeLab40 />;
  }
}
