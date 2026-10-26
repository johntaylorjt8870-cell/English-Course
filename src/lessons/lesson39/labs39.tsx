import { useMemo, useRef, useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { PRONOUN_ROWS_39 } from "./ledger39";
import {
  ActionButton39,
  ChoiceText39,
  Feedback39,
  FOCUS_39,
  Formula39,
  Instrument39,
  PlatformNote39,
} from "./kit39";
import {
  BY_ITEMS_39,
  BY_THE_TIME_ITEMS_39,
  CONTINUATION_ITEMS_39,
  CURRICULUM_MAP_39,
  DETECTIVE32_ITEMS_39,
  DIALOGUE2_CHECK_39,
  DIALOGUE2_LINES_39,
  DIALOGUE_CHECK_39,
  DIALOGUE_LINES_39,
  DURATION_CASES_39,
  ERROR_ITEMS_39,
  EXERCISE29_ITEMS_39,
  FILL30_ITEMS_39,
  FINISHED_ITEMS_39,
  FIRST_USE_ITEMS_39,
  FOR_ITEMS_39,
  FOR_SINCE_QUESTIONS_39,
  FOR_SINCE_SORT_39,
  FP_VS_FPC_ITEMS_39,
  HOWLONG_BUILD_39,
  IQ33_ITEMS_39,
  NEGATION_MEANING_ITEMS_39,
  NEGATIVE_BUILD_39,
  OBJECTIVES_39,
  PAIRED_EXAMPLES_39,
  PERFECT_CONTINUOUS_ITEMS_39,
  READING34_ANALYSIS_39,
  READING34_CHECK_39,
  READING34_JOURNEY_39,
  READING34_QUESTIONS_39,
  SHORT_ANSWER_ITEMS_39,
  SINCE_ITEMS_39,
  STATIVE_ITEMS_39,
  STATIVE_VERBS_39,
  SUMMARY_MATCH_39,
  TENSE31_ITEMS_39,
  TIME_CLAUSE_ITEMS_39,
  TIMELINE_ELEMENTS_39,
  TIMELINE_MOMENTS_39,
  WH_ITEMS_39,
  WRITING37_CRITERIA_39,
  WRITING37_MODEL_39,
  WRITING37_MODEL_FORMS_39,
  YESNO_BUILD_39,
  type ChoiceItem39,
} from "./practiceData39";

// ============================================================
// Lesson 39 — أدوات المرصد
// كل أداة وظيفة تعليمية واحدة: تختبر فهمًا، أو تحسب مدة، أو تقارن زمنين.
// ============================================================

const norm = (value: string) =>
  value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\b(i|you|he|she|it|we|they)'ll\b/g, "$1 will")
    .replace(/\bwon't\b/g, "will not")
    .replace(/travelling/g, "traveling")
    .replace(/[.,!?;:"“”]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function EnglishLine({ children }: { children: ReactNode }) {
  return (
    <p dir="ltr" className="obs-en-line font-en">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------ بطاقة اختيار */

function ChoiceCard({
  item,
  index,
  onAttempt,
}: {
  item: ChoiceItem39;
  index: number;
  onAttempt?: () => void;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <li className="obs-card" data-choice-item={item.id}>
      <div className="obs-q-row">
        <span dir="ltr" className="obs-q-num font-en">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="obs-q">
          <Rich text={item.prompt} />
        </p>
      </div>
      {item.lines?.length ? (
        <div className="mt-1.5 space-y-1">
          {item.lines.map((line) => (
            <EnglishLine key={line}>{line}</EnglishLine>
          ))}
        </div>
      ) : null}
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {item.choices.map((choice) => (
          <label
            key={choice.value}
            className={`obs-choice ${value === choice.value ? "is-active" : ""}`}
          >
            <input
              type="radio"
              name={`${item.id}-choice`}
              value={choice.value}
              checked={value === choice.value}
              disabled={checked}
              onChange={(event) => setValue(event.currentTarget.value)}
              className={`${FOCUS_39} mt-1 h-4 w-4 shrink-0 accent-[#6fe3ee]`}
            />
            <span className="min-w-0" dir="auto">
              <ChoiceText39 text={choice.label} />
            </span>
          </label>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <ActionButton39
          variant="secondary"
          disabled={!value || checked}
          onClick={() => {
            setChecked(true);
            onAttempt?.();
          }}
        >
          تحقّق
        </ActionButton39>
        {checked ? (
          <span
            className={`obs-verdict ${item.accepted.includes(value) ? "is-ok" : "is-bad"}`}
            dir="auto"
          >
            {item.accepted.includes(value) ? "✓ إجابة صحيحة" : "✗ راجع القاعدة أدناه"}
          </span>
        ) : null}
      </div>
      {checked ? (
        <div className="mt-2 space-y-1.5">
          <Feedback39
            state={item.accepted.includes(value) ? "ok" : "review"}
            title={item.accepted.includes(value) ? "التغذية الراجعة" : "الصواب والسبب"}
          >
            <Rich text={item.feedback} />
          </Feedback39>
          {item.nuance ? (
            <p className="obs-nuance">
              <Rich text={item.nuance} />
            </p>
          ) : null}
          {item.origin === "platform" ? (
            <p className="obs-nuance">
              <En>Platform note</En> — بند إضافي من إعداد المنصة.
            </p>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export function ChoiceDeck39({
  items,
  title,
  id,
  note,
  onAttempt,
}: {
  items: readonly ChoiceItem39[];
  title: string;
  id: string;
  note?: ReactNode;
  onAttempt?: () => void;
}) {
  return (
    <Instrument39 id={id} label="DECISION PANEL" title={title} tone="cyan" note={note}>
      <ol className="space-y-2.5">
        {items.map((item, index) => (
          <ChoiceCard key={item.id} item={item} index={index} onAttempt={onAttempt} />
        ))}
      </ol>
    </Instrument39>
  );
}

/** مفاتيح مجموعات البنود المستخدمة في خريطة الخطوات. */
export const CHOICE_DECKS_39: Record<string, { title: string; items: readonly ChoiceItem39[] }> = {
  "first-use-a": { title: "first use — أمثلة المصدر الأولى", items: FIRST_USE_ITEMS_39.slice(0, 3) },
  "first-use-b": { title: "first use — مثالا المكتبة والسفر", items: FIRST_USE_ITEMS_39.slice(3) },
  continuation: { title: "هل يستمر النشاط بعد النقطة؟", items: CONTINUATION_ITEMS_39 },
  for: { title: "for + مدة زمنية", items: FOR_ITEMS_39 },
  since: { title: "since + نقطة بداية", items: SINCE_ITEMS_39 },
  "for-since-questions": { title: "How long? أم Since when?", items: FOR_SINCE_QUESTIONS_39 },
  "by-a": { title: "معنى by ونقطة القياس", items: BY_ITEMS_39.slice(0, 2) },
  "by-b": { title: "نفس by وتركيزان", items: BY_ITEMS_39.slice(2) },
  "by-the-time-items": { title: "by the time في مثالين", items: BY_THE_TIME_ITEMS_39 },
  "time-clause": { title: "الجملة الزمنية بعد by the time", items: TIME_CLAUSE_ITEMS_39 },
  "dialogue-check": { title: "فهم حوار يوم الدراسة", items: DIALOGUE_CHECK_39 },
  "fp-vs-fpc": { title: "المقارنة الذهبية", items: FP_VS_FPC_ITEMS_39 },
  paired: { title: "أمثلة متقابلة", items: PAIRED_EXAMPLES_39 },
  finished: { title: "منتهٍ أم ممتد؟", items: FINISHED_ITEMS_39 },
  "negation-meaning": { title: "معنى النفي", items: NEGATION_MEANING_ITEMS_39 },
  "short-answer": { title: "الإجابات القصيرة", items: SHORT_ANSWER_ITEMS_39 },
  wh: { title: "What · Where · Why", items: WH_ITEMS_39 },
  "perfect-continuous": { title: "الأزمنة التامة المستمرة الثلاثة", items: PERFECT_CONTINUOUS_ITEMS_39 },
  "stative-items": { title: "أفعال الحالة — صواب وخطأ", items: STATIVE_ITEMS_39 },
  "error-a": { title: "أخطاء الصيغة (1–4)", items: ERROR_ITEMS_39.slice(0, 4) },
  "error-b": { title: "أخطاء التركيب والسياق (5–7)", items: ERROR_ITEMS_39.slice(4) },
  "vocational-check": { title: "فهم حوار الماراثون", items: DIALOGUE2_CHECK_39 },
  iq33: { title: "هل الزمنان صحيحان؟", items: IQ33_ITEMS_39 },
  summary: { title: "بنية الملخص الذهبي", items: SUMMARY_MATCH_39 },
};

/* ------------------------------------------------------------ بوابة المرصد */

const BRIDGE_CASES_39 = {
  bridge: {
    question: "ما الذي نبرزه في كل جملة؟",
    options: [
      {
        id: "fp",
        label: "الإنجاز المكتمل",
        form: "will have + V3",
        sentence: "By 8:00, I will have finished my homework.",
        ar: "بحلول الساعة الثامنة، سأكون قد أنهيت واجبي.",
        focus: "عدد المهام المنجزة · اكتمال النتيجة",
        marker: "FINISHED",
      },
      {
        id: "fpc",
        label: "المدة الممتدة",
        form: "will have been + V-ing",
        sentence: "By 8:00, I will have been studying for three hours.",
        ar: "بحلول الساعة الثامنة، سأكون قد أمضيت ثلاث ساعات في الدراسة.",
        focus: "مدة النشاط حتى نقطة مستقبلية",
        marker: "HOW LONG",
      },
    ],
  },
  new: {
    question: "أي سؤال يقود إلى الزمن الجديد؟",
    options: [
      {
        id: "fp",
        label: "هل سيكون الواجب قد انتهى؟",
        form: "will have + V3",
        sentence: "By 8:00, I will have finished my homework.",
        ar: "سؤال عن اكتمال الواجب بحلول الثامنة.",
        focus: "إنجاز مكتمل",
        marker: "RESULT",
      },
      {
        id: "fpc",
        label: "كم ساعة سأكون قد أمضيت في الدراسة؟",
        form: "will have been + V-ing",
        sentence: "By 8:00, I will have been studying for three hours.",
        ar: "سؤال عن مدة النشاط عند الثامنة.",
        focus: "مدة نشاط ممتدة",
        marker: "DURATION",
      },
    ],
  },
} as const;

export function GateDeck39({ mode }: { mode: "bridge" | "new" }) {
  const data = BRIDGE_CASES_39[mode];
  const [active, setActive] = useState<"fp" | "fpc">(mode === "bridge" ? "fp" : "fpc");
  const card = data.options.find((option) => option.id === active)!;
  return (
    <Instrument39
      id="gate-panel"
      label="OBSERVATORY ENTRANCE"
      title="بوابة المرصد: زمنان لسؤالين مختلفين"
      tone="gold"
    >
      <p className="obs-nuance">
        <Rich text={data.question} />
      </p>
      <div className="obs-segment" role="group" aria-label="اختر الزمن">
        {data.options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={active === option.id}
            onClick={() => setActive(option.id)}
            className={`obs-segment-btn ${active === option.id ? "is-active" : ""}`}
          >
            <span className="block font-black">
              <Rich text={option.label} />
            </span>
            <span dir="ltr" className="obs-segment-sub font-en">
              {option.form}
            </span>
          </button>
        ))}
      </div>
      <div className="obs-readout">
        <div className="flex items-center justify-between gap-2">
          <span className="obs-readout-mark">
            <En>{card.marker}</En>
          </span>
          <span dir="ltr" className="obs-readout-form font-en">
            {card.form}
          </span>
        </div>
        <p dir="ltr" className="obs-readout-en font-en">
          {card.sentence}
        </p>
        <p className="obs-readout-ar">
          <Rich text={card.ar} />
        </p>
        <p className="obs-readout-focus">
          <Rich text={card.focus} />
        </p>
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ قائمة الأهداف */

export function BriefingDeck39() {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const count = Object.values(done).filter(Boolean).length;
  return (
    <Instrument39
      id="briefing"
      label="MISSION BRIEFING"
      title="أهداف المرصد — أشّر ما أنجزته"
      tone="teal"
      note="قائمة تتبّع شخصية؛ لا تُحتسب درجة، وتبقى في هذه الجلسة فقط."
    >
      <div className="obs-meter" aria-label={`الأهداف المؤشرة: ${count} من ${OBJECTIVES_39.length}`}>
        <div className="obs-meter-track">
          <div className="obs-meter-fill" style={{ width: `${(count / OBJECTIVES_39.length) * 100}%` }} />
        </div>
        <span dir="ltr" className="obs-meter-value font-en">
          {count}/{OBJECTIVES_39.length}
        </span>
      </div>
      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {OBJECTIVES_39.map((objective, index) => (
          <li key={objective}>
            <label className={`obs-check ${done[index] ? "is-done" : ""}`}>
              <input
                type="checkbox"
                checked={Boolean(done[index])}
                onChange={(event) => {
                  const nextChecked = event.currentTarget.checked;
                  setDone((current) => ({ ...current, [index]: nextChecked }));
                }}
                className={`${FOCUS_39} mt-1 h-4 w-4 shrink-0 accent-[#35d3b4]`}
              />
              <span className="min-w-0">
                <Rich text={objective} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ الخط الزمني */

const ROLE_LABEL_39: Record<string, string> = {
  observation: "لحظة الكلام",
  start: "بداية النشاط",
  ongoing: "نشاط ممتد",
  reference: "نقطة المرجع المستقبلية",
};

export function TimelineDeck39() {
  const [activeId, setActiveId] = useState<string>("ref-8");
  const active = TIMELINE_MOMENTS_39.find((moment) => moment.id === activeId)!;
  return (
    <Instrument39
      id="timeline"
      label="TIME AXIS"
      title="خط زمني تفاعلي: من بداية الدراسة إلى نقطة القياس"
      tone="cyan"
      note="كل نقطة على المحور دورها مختلف؛ اضغط أي نقطة لقراءة دورها."
    >
      <div className="obs-timeline" role="group" aria-label="نقاط الخط الزمني">
        <div className="obs-timeline-line" aria-hidden />
        {TIMELINE_MOMENTS_39.map((moment) => (
          <button
            key={moment.id}
            type="button"
            aria-pressed={activeId === moment.id}
            onClick={() => setActiveId(moment.id)}
            className={`obs-node obs-node--${moment.role} ${activeId === moment.id ? "is-active" : ""}`}
          >
            <span className="obs-node-dot" aria-hidden />
            <span dir="ltr" className="obs-node-clock font-en">
              {moment.clock}
            </span>
            <span className="obs-node-label">
              <Rich text={moment.label} />
            </span>
          </button>
        ))}
      </div>
      <div className="obs-readout mt-3">
        <p className="obs-readout-mark">
          <Rich text={ROLE_LABEL_39[active.role]} />
        </p>
        <p dir="ltr" className="obs-readout-en font-en">
          {active.sentence}
        </p>
        <p className="obs-readout-ar">
          <Rich text={active.arabic} />
        </p>
        <p className="obs-readout-focus">
          <Rich text={active.durationText} />
        </p>
      </div>
      <ul className="mt-2 grid gap-1 sm:grid-cols-3">
        {TIMELINE_ELEMENTS_39.map((element) => (
          <li key={element} className="obs-pill-card">
            <Rich text={element} />
          </li>
        ))}
      </ul>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ حساب المدة */

type DurationCase39 = {
  id: string;
  title: string;
  unitLabel: string;
  englishUnit: string;
  points: readonly { value: number; label: string }[];
  start: number;
  reference: number;
  sentence: string;
  context: string;
  calc: string;
  startLabel: string;
};

const DURATION_CASES_INDEX: Record<string, DurationCase39> = {
  samer: {
    id: "samer",
    title: "سامر: من الرابعة إلى الثامنة",
    unitLabel: "ساعات",
    englishUnit: "hours",
    points: [4, 5, 6, 7, 8].map((value) => ({ value, label: `${value}:00` })),
    start: 4,
    reference: 8,
    sentence: "By 8:00, Samer will have been studying English for four hours.",
    context: "بدأ سامر الدراسة عند الرابعة، ونقيس المدة عند الثامنة.",
    calc: "8 − 4 = 4 ساعات.",
    startLabel: "4:00",
  },
  noon: {
    id: "noon",
    title: "من السابعة إلى الظهر",
    unitLabel: "ساعات",
    englishUnit: "hours",
    points: [7, 8, 9, 10, 11, 12].map((value) => ({
      value,
      label: value === 12 ? "noon" : `${value}:00`,
    })),
    start: 7,
    reference: 12,
    sentence: "By noon, I will have been working for five hours.",
    context: "بدأ العمل عند السابعة صباحًا، ونقيس المدة عند الظهر.",
    calc: "12 − 7 = 5 ساعات.",
    startLabel: "7:00",
  },
  ahmad: {
    id: "ahmad",
    title: DURATION_CASES_39[0].title,
    unitLabel: DURATION_CASES_39[0].unitLabel,
    englishUnit: DURATION_CASES_39[0].englishUnit,
    points: DURATION_CASES_39[0].points,
    start: DURATION_CASES_39[0].startValue,
    reference: DURATION_CASES_39[0].referenceValue,
    sentence: DURATION_CASES_39[0].sentence,
    context: DURATION_CASES_39[0].context,
    calc: DURATION_CASES_39[0].calc,
    startLabel: DURATION_CASES_39[0].points[0].label,
  },
  layla: {
    id: "layla",
    title: DURATION_CASES_39[1].title,
    unitLabel: DURATION_CASES_39[1].unitLabel,
    englishUnit: DURATION_CASES_39[1].englishUnit,
    points: DURATION_CASES_39[1].points,
    start: DURATION_CASES_39[1].startValue,
    reference: DURATION_CASES_39[1].referenceValue,
    sentence: DURATION_CASES_39[1].sentence,
    context: DURATION_CASES_39[1].context,
    calc: DURATION_CASES_39[1].calc,
    startLabel: DURATION_CASES_39[1].points[0].label,
  },
  project: {
    id: "project",
    title: DURATION_CASES_39[2].title,
    unitLabel: DURATION_CASES_39[2].unitLabel,
    englishUnit: DURATION_CASES_39[2].englishUnit,
    points: DURATION_CASES_39[2].points,
    start: DURATION_CASES_39[2].startValue,
    reference: DURATION_CASES_39[2].referenceValue,
    sentence: DURATION_CASES_39[2].sentence,
    context: DURATION_CASES_39[2].context,
    calc: DURATION_CASES_39[2].calc,
    startLabel: DURATION_CASES_39[2].points[0].label,
  },
};

const NUMBER_WORD_39: Record<number, string> = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
};

export function DurationDeck39({ caseKey }: { caseKey: string }) {
  const data = DURATION_CASES_INDEX[caseKey] ?? DURATION_CASES_INDEX.ahmad;
  const [start, setStart] = useState(data.start);
  const [reference, setReference] = useState(data.reference);
  const [checked, setChecked] = useState(false);
  const duration = reference - start;
  const valid = duration > 0;
  const span = Math.max(...data.points.map((point) => point.value)) - Math.min(...data.points.map((point) => point.value));
  const min = Math.min(...data.points.map((point) => point.value));
  const startPct = span > 0 ? ((start - min) / span) * 100 : 0;
  const refPct = span > 0 ? ((reference - min) / span) * 100 : 100;
  const matchesSource = duration === data.reference - data.start;
  return (
    <Instrument39
      id="duration-calc"
      label="DURATION CALCULATOR"
      title={data.title}
      tone="gold"
      note={data.context}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="obs-field">
          <span>نقطة البداية</span>
          <select
            dir="ltr"
            value={start}
            onChange={(event) => {
              setStart(Number(event.currentTarget.value));
              setChecked(false);
            }}
            className={`${FOCUS_39} obs-select font-en`}
          >
            {data.points.map((point) => (
              <option key={`start-${point.value}`} value={point.value}>
                {point.label}
              </option>
            ))}
          </select>
        </label>
        <label className="obs-field">
          <span>نقطة القياس المستقبلية</span>
          <select
            dir="ltr"
            value={reference}
            onChange={(event) => {
              setReference(Number(event.currentTarget.value));
              setChecked(false);
            }}
            className={`${FOCUS_39} obs-select font-en`}
          >
            {data.points.map((point) => (
              <option key={`ref-${point.value}`} value={point.value}>
                {point.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="obs-span" aria-hidden>
        <div className="obs-span-track" />
        <span className="obs-span-marker obs-span-marker--start" style={{ right: `${startPct}%` }}>
          <span className="obs-span-flag">START</span>
        </span>
        <span className="obs-span-marker obs-span-marker--ref" style={{ right: `${refPct}%` }}>
          <span className="obs-span-flag">BY</span>
        </span>
        <span
          className="obs-span-band"
          style={{ right: `${Math.min(startPct, refPct)}%`, width: `${Math.abs(refPct - startPct)}%` }}
        />
      </div>

      <div className="obs-readout">
        <p className="obs-readout-mark">
          المدة عند نقطة القياس:{" "}
          <span className="obs-big" dir="ltr">
            {valid ? duration : "—"} <span className="font-en">{data.englishUnit}</span>
          </span>
        </p>
        <p className="obs-readout-ar">
          {valid ? (
            <Rich
              text={`${NUMBER_WORD_39[duration] ? `${NUMBER_WORD_39[duration]} ${data.englishUnit}` : `${duration}`} — ${data.calc}`}
            />
          ) : (
            "نقطة القياس يجب أن تكون بعد نقطة البداية."
          )}
        </p>
        <p dir="ltr" className="obs-readout-en font-en">
          By {referenceLabel(data, reference)}, the activity will have been running for{" "}
          {valid ? `${NUMBER_WORD_39[duration] ?? duration} ${data.englishUnit}` : "…"}.
        </p>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <ActionButton39
          variant="secondary"
          disabled={!valid}
          onClick={() => setChecked(true)}
        >
          قارن مع جملة المصدر
        </ActionButton39>
        <ActionButton39
          variant="ghost"
          onClick={() => {
            setStart(data.start);
            setReference(data.reference);
            setChecked(false);
          }}
        >
          إعادة الضبط
        </ActionButton39>
      </div>

      {checked ? (
        matchesSource ? (
          <Feedback39 state="ok" title="مطابق لحساب المصدر">
            <span dir="ltr" className="font-en block">
              {data.sentence}
            </span>
          </Feedback39>
        ) : (
          <Feedback39 state="review" title="المدة المحسوبة صحيحة، لكنها ليست الحالة الأصلية">
            <p>
              جملة المصدر تستخدم نقطة البداية <span dir="ltr" className="font-en">{data.startLabel}</span> ونقطة القياس{" "}
              <span dir="ltr" className="font-en">{referenceLabel(data, data.reference)}</span>:{" "}
              <span dir="ltr" className="font-en">{data.sentence}</span>
            </p>
          </Feedback39>
        )
      ) : null}
    </Instrument39>
  );
}

function referenceLabel(data: DurationCase39, value: number) {
  return data.points.find((point) => point.value === value)?.label ?? String(value);
}

/* ------------------------------------------------------------ بناء الصيغة */

const FORMULA_TOKENS_39: readonly { id: string; label: string; trap?: boolean }[] = [
  { id: "subject", label: "Subject" },
  { id: "will", label: "will" },
  { id: "have", label: "have" },
  { id: "been", label: "been" },
  { id: "ving", label: "V-ing" },
  { id: "has", label: "has", trap: true },
];

export function FormulaDeck39() {
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const order = ["subject", "will", "have", "been", "ving"];
  const perfect = order.every((token, index) => picked[index] === token);
  return (
    <Instrument39
      id="formula-builder"
      label="FORM CALIBRATION"
      title="ابنِ الصيغة: اضغط الأجزاء بالترتيب"
      tone="violet"
      note="اختر الأجزاء الخمسة بالترتيب الصحيح. هناك جزء دخيل واحد."
    >
      <div className="obs-build-strip" dir="ltr" aria-label="الصيغة المبنية">
        {picked.length === 0 ? (
          <span className="obs-build-empty font-en">Subject + …</span>
        ) : (
          picked.map((token, index) => (
            <span key={`${token}-${index}`} className="obs-build-token font-en">
              {FORMULA_TOKENS_39.find((item) => item.id === token)?.label}
            </span>
          ))
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {FORMULA_TOKENS_39.map((token) => (
          <button
            key={token.id}
            type="button"
            disabled={picked.includes(token.id)}
            onClick={() => {
              const next = [...picked, token.id];
              setPicked(next);
              if (token.trap) {
                setNote("has جزء دخيل: بعد will يأتي have مع جميع الضمائر، حتى مع He وShe وIt.");
                return;
              }
              const position = next.length - 1;
              if (order[position] !== token.id) {
                setNote("الترتيب غير مكتمل: الصيغة تبدأ بالفاعل ثم will ثم have ثم been ثم V-ing.");
              } else if (next.length === order.length) {
                setNote("أحسنت: هذه هي الصيغة الكاملة Subject + will + have + been + V-ing.");
              } else {
                setNote("");
              }
            }}
            className={`obs-token ${picked.includes(token.id) ? "is-used" : ""}`}
          >
            <En>{token.label}</En>
          </button>
        ))}
        <ActionButton39 variant="ghost" onClick={() => { setPicked([]); setNote(""); }}>
          مسح
        </ActionButton39>
      </div>
      <div className="mt-2">
        <Formula39 tone={perfect ? "cyan" : "gold"}>
          Subject + will + have + been + V-ing
        </Formula39>
      </div>
      {note ? (
        <Feedback39 state={perfect ? "ok" : "review"} title={perfect ? "الصيغة مكتملة" : "توجيه"}>
          {note}
        </Feedback39>
      ) : null}
    </Instrument39>
  );
}

/* ------------------------------------------------------------ تشريح الجملة */

const ANATOMY_39 = [
  { text: "She", role: "الفاعل", detail: "من يقوم بالنشاط." },
  { text: "will", role: "فعل مساعد للمستقبل", detail: "يدل على أن القياس عند نقطة مستقبلية." },
  { text: "have", role: "جزء ثابت من التركيب", detail: "يبقى have دائمًا بعد will." },
  { text: "been", role: "التصريف الثالث من be", detail: "لا تُستبدل بـ being." },
  { text: "studying", role: "الفعل study مع ing", detail: "الصيغة المستمرة للنشاط." },
  { text: "for three hours", role: "مدة النشاط", detail: "for + مدة زمنية." },
  { text: "by 9:00", role: "النقطة المستقبلية التي نقيس عندها المدة", detail: "by + الموعد الأقصى." },
] as const;

export function AnatomyDeck39() {
  const [active, setActive] = useState(0);
  const part = ANATOMY_39[active];
  return (
    <Instrument39
      id="anatomy-bench"
      label="SENTENCE ANATOMY"
      title="اضغط أي جزء لتعرف وظيفته"
      tone="teal"
    >
      <div className="obs-anatomy" dir="ltr">
        {ANATOMY_39.map((token, index) => (
          <button
            key={token.text}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`obs-anatomy-token ${active === index ? "is-active" : ""}`}
          >
            <span className="font-en">{token.text}</span>
          </button>
        ))}
      </div>
      <div className="obs-readout mt-3">
        <p className="obs-readout-mark">
          <En>{part.text}</En>
        </p>
        <p className="obs-readout-ar">
          <Rich text={part.role} />
        </p>
        <p className="obs-readout-focus">
          <Rich text={part.detail} />
        </p>
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ الضمائر */

const PRONOUN_ROWS_LOCAL_39 = PRONOUN_ROWS_39;

export function PronounsDeck39() {
  const [index, setIndex] = useState(0);
  return (
    <Instrument39
      id="pronoun-orbit"
      label="PRONOUN MATRIX"
      title="الصيغة ثابتة مع جميع الضمائر"
      tone="violet"
    >
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="اختر الضمير">
        {PRONOUN_ROWS_LOCAL_39.map(([pronoun], i) => (
          <button
            key={pronoun}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={`obs-token ${i === index ? "is-active" : ""}`}
          >
            <En>{pronoun}</En>
          </button>
        ))}
      </div>
      <div className="obs-readout mt-2">
        <p dir="ltr" className="obs-readout-en font-en">
          {PRONOUN_ROWS_LOCAL_39[index][1]}
        </p>
        <p className="obs-readout-focus">
          لا <span dir="ltr" className="font-en">has</span> مع He/She/It، ولا{" "}
          <span dir="ltr" className="font-en">being</span> بدل{" "}
          <span dir="ltr" className="font-en">been</span>.
        </p>
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ فرز for/since */

export function SorterDeck39() {
  const [picks, setPicks] = useState<Record<string, "for" | "since">>({});
  const [checked, setChecked] = useState(false);
  const correct = FOR_SINCE_SORT_39.filter((item) => picks[item.id] === item.kind).length;
  return (
    <Instrument39
      id="for-since-sorter"
      label="FOR / SINCE METER"
      title="صنّف كل بطاقة: مدة أم نقطة بداية؟"
      tone="gold"
      note="ثماني بطاقات من المصدر. اختر لكل بطاقة تصنيفها ثم تحقّق."
    >
      <ul className="grid gap-2 sm:grid-cols-2">
        {FOR_SINCE_SORT_39.map((item) => (
          <li key={item.id} className="obs-card">
            <p dir="ltr" className="obs-en-line font-en">
              {item.text}
            </p>
            <p className="obs-nuance">
              <Rich text={item.arabic} />
            </p>
            <div className="obs-segment obs-segment--small" role="group" aria-label={`تصنيف ${item.text}`}>
              {(["for", "since"] as const).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  aria-pressed={picks[item.id] === kind}
                  disabled={checked}
                  onClick={() => setPicks((current) => ({ ...current, [item.id]: kind }))}
                  className={`obs-segment-btn ${picks[item.id] === kind ? "is-active" : ""}`}
                >
                  <En>{kind}</En>
                </button>
              ))}
            </div>
            {checked ? (
              <p className={`obs-verdict ${picks[item.id] === item.kind ? "is-ok" : "is-bad"}`}>
                {picks[item.id] === item.kind ? "✓" : "✗"} الصواب:{" "}
                <span dir="ltr" className="font-en">
                  {item.kind}
                </span>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <ActionButton39
          variant="secondary"
          disabled={Object.keys(picks).length < FOR_SINCE_SORT_39.length || checked}
          onClick={() => setChecked(true)}
        >
          تحقّق من التصنيف
        </ActionButton39>
        <ActionButton39 variant="ghost" onClick={() => { setPicks({}); setChecked(false); }}>
          إعادة
        </ActionButton39>
        {checked ? (
          <span className="obs-verdict is-ok" dir="auto">
            {correct} / {FOR_SINCE_SORT_39.length} صحيحة
          </span>
        ) : null}
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ بناء النفي/السؤال */

type BuildItem39 = {
  id: string;
  n: number;
  base: string;
  arabic: string;
  target: string;
  arabicAnswer: string;
  answerLine?: string;
};

const BUILD_DECKS_39: Record<string, { title: string; label: string; items: readonly BuildItem39[]; tip: string }> = {
  negative: {
    title: "حوّل كل جملة إلى النفي",
    label: "NEGATIVE BUILDER",
    items: NEGATIVE_BUILD_39.map((item) => ({ ...item, target: item.negative })),
    tip: "الصيغة: Subject + won't + have + been + V-ing.",
  },
  yesno: {
    title: "حوّل كل جملة إلى سؤال نعم/لا",
    label: "QUESTION BUILDER",
    items: YESNO_BUILD_39.map((item) => ({ ...item, target: item.question })),
    tip: "الصيغة: Will + Subject + have + been + V-ing?",
  },
  howlong: {
    title: "اسأل عن المدة في كل جملة",
    label: "HOW LONG BUILDER",
    items: HOWLONG_BUILD_39.map((item) => ({ ...item, target: item.question, answerLine: item.answerLine })),
    tip: "الصيغة: How long + will + Subject + have + been + V-ing?",
  },
};

export function BuildDeck39({ kind }: { kind: string }) {
  const deck = BUILD_DECKS_39[kind] ?? BUILD_DECKS_39.negative;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  return (
    <Instrument39 id="build-bench" label={deck.label} title={deck.title} tone="rose" note={deck.tip}>
      <ol className="space-y-2.5">
        {deck.items.map((item) => {
          const value = answers[item.id] ?? "";
          const isChecked = Boolean(checked[item.id]);
          const ok = norm(value) === norm(item.target);
          return (
            <li key={item.id} className="obs-card">
              <EnglishLine>{item.base}</EnglishLine>
              <p className="obs-nuance mt-1">
                <Rich text={item.arabic} />
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                  dir="ltr"
                  value={value}
                  onChange={(event) => {
                    const picked = event.currentTarget.value;
                    setAnswers((current) => ({ ...current, [item.id]: picked }));
                    setChecked((current) => ({ ...current, [item.id]: false }));
                  }}
                  placeholder="اكتب الجملة هنا…"
                  aria-label={`إجابتك على البند ${item.n}`}
                  className={`${FOCUS_39} obs-input font-en`}
                />
                <ActionButton39
                  variant="secondary"
                  disabled={!value.trim()}
                  onClick={() => setChecked((current) => ({ ...current, [item.id]: true }))}
                >
                  تحقّق
                </ActionButton39>
              </div>
              {isChecked ? (
                <Feedback39 state={ok ? "ok" : "review"} title={ok ? "مطابق للصيغة المطلوبة" : "قارن بالصيغة الصحيحة"}>
                  <span dir="ltr" className="font-en block">
                    {item.target}
                  </span>
                  <span className="mt-1 block">
                    <Rich text={item.arabicAnswer} />
                  </span>
                  {item.answerLine ? (
                    <span dir="ltr" className="font-en mt-1 block">
                      {item.answerLine}
                    </span>
                  ) : null}
                </Feedback39>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="obs-nuance mt-2">
        الفحص يقارن الشكل المكتوب بالصيغة المرجعية؛ قد توجد صياغات صحيحة أخرى تستخدم{" "}
        <span dir="ltr" className="font-en">will not</span> بدل{" "}
        <span dir="ltr" className="font-en">won't</span>.
      </p>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ الحوارات */

type DialogueLine39 = {
  id: string;
  speaker: string;
  en: string;
  ar: string;
  form: string;
  analysis: string;
  origin: "source" | "platform";
  analysisOrigin: "source" | "platform";
};

export function DialogueDeck39({ which }: { which: "study-day" | "marathon" }) {
  const lines = (which === "study-day" ? DIALOGUE_LINES_39 : DIALOGUE2_LINES_39) as readonly DialogueLine39[];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const allOpen = lines.every((line) => open[line.id]);
  return (
    <Instrument39
      id="dialogue-deck"
      label={which === "study-day" ? "DIALOGUE · THE LONG STUDY DAY" : "DIALOGUE · THE MARATHON TRAINING"}
      title="اضغط أي دور لعرض ترجمته وتحليل صيغته"
      tone="violet"
      note="النص الإنجليزي والترجمة من المصدر؛ التحليل يوضّح وظيفة كل صيغة."
    >
      <ol className="space-y-1.5">
        {lines.map((line) => {
          const isOpen = Boolean(open[line.id]);
          return (
            <li key={line.id} className="obs-turn">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen((current) => ({ ...current, [line.id]: !current[line.id] }))}
                className="obs-turn-btn"
              >
                <span className="obs-turn-speaker">
                  <En>{line.speaker}</En>
                </span>
                <span dir="ltr" className="obs-turn-en font-en">
                  {line.en}
                </span>
                <span aria-hidden className="obs-turn-chevron">
                  {isOpen ? "▴" : "▾"}
                </span>
              </button>
              {isOpen ? (
                <div className="obs-turn-body">
                  <p className="obs-readout-ar">
                    <Rich text={line.ar} />
                  </p>
                  <p className="obs-turn-form">
                    <span dir="ltr" className="font-en">
                      {line.form}
                    </span>
                  </p>
                  <p className="obs-nuance">
                    <Rich text={line.analysis} />
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="mt-2">
        <ActionButton39
          variant="ghost"
          onClick={() =>
            setOpen((current) => {
              const next: Record<string, boolean> = { ...current };
              for (const line of lines) next[line.id] = !allOpen;
              return next;
            })
          }
        >
          {allOpen ? "إخفاء الترجمات" : "إظهار كل الترجمات"}
        </ActionButton39>
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ تقابل الإنجاز والمدة */

type AspectPair39 = {
  title: string;
  question: string;
  fp: { sentence: string; ar: string; focus: string };
  fpc: { sentence: string; ar: string; focus: string };
  answer: "fp" | "fpc";
  why: string;
};

const ASPECT_CASES_39: Record<string, AspectPair39> = {
  articles: {
    title: "المقالات يوم الجمعة",
    question: "كم ساعة ستكون قد أمضيت في الكتابة؟",
    fp: {
      sentence: "By Friday, I will have written five articles.",
      ar: "بحلول الجمعة، سأكون قد كتبت خمس مقالات.",
      focus: "عدد المقالات المكتملة",
    },
    fpc: {
      sentence: "By Friday, I will have been writing articles for two weeks.",
      ar: "بحلول الجمعة، سأكون قد أمضيت أسبوعين في كتابة المقالات.",
      focus: "مدة نشاط الكتابة",
    },
    answer: "fpc",
    why: "السؤال عن مدة نشاط الكتابة، لا عن عدد مكتمل.",
  },
  "articles-cont": {
    title: "هنا نهتم بالمدة",
    question: "ما الذي يبرزه By Friday, I will have been writing articles for two weeks.",
    fp: {
      sentence: "By Friday, I will have written five articles.",
      ar: "إنجاز مكتمل: خمس مقالات.",
      focus: "نتيجة يمكن عدّها",
    },
    fpc: {
      sentence: "By Friday, I will have been writing articles for two weeks.",
      ar: "مدة نشاط ممتدة حتى الجمعة.",
      focus: "مدة النشاط",
    },
    answer: "fpc",
    why: "for two weeks تذكر مدة، والصيغة المستمرة تبرز امتداد النشاط.",
  },
  "by-the-time": {
    title: "وصولك يحدد نقطة القياس",
    question: "في By the time you arrive, I will have been studying for two hours — ما الوظيفة؟",
    fp: {
      sentence: "By the time you arrive, I will have finished my homework.",
      ar: "إنجاز مكتمل قبل وصولك.",
      focus: "اكتمال الإنجاز",
    },
    fpc: {
      sentence: "By the time you arrive, I will have been studying for two hours.",
      ar: "ساعتان من الدراسة حتى لحظة وصولك.",
      focus: "مدة النشاط عند وصولك",
    },
    answer: "fpc",
    why: "المدة تُقاس عند الحدث المستقبلي الآخر (وصولك).",
  },
  reading: {
    title: "القراءة: ثلاثة كتب أم عشر ساعات؟",
    question: "أي جملة تبرز عدد الكتب المكتملة؟",
    fp: {
      sentence: "By Sunday, she will have read three books.",
      ar: "بحلول الأحد، ستكون قد قرأت ثلاثة كتب.",
      focus: "عدد الكتب المكتملة",
    },
    fpc: {
      sentence: "By Sunday, she will have been reading for ten hours.",
      ar: "بحلول الأحد، ستكون قد أمضت عشر ساعات في القراءة.",
      focus: "مدة القراءة",
    },
    answer: "fp",
    why: "العدد المكتمل (ثلاثة كتب) يبرزه Future Perfect.",
  },
  cover: {
    title: "من النتيجة إلى المدة",
    question: "أي جملة تعبّر عن مدة النشاط حتى الثامنة؟",
    fp: {
      sentence: "By 8:00, I will have finished my homework.",
      ar: "إنجاز مكتمل بحلول الثامنة.",
      focus: "النتيجة",
    },
    fpc: {
      sentence: "By 8:00, I will have been studying for three hours.",
      ar: "ثلاث ساعات من الدراسة حتى الثامنة.",
      focus: "المدة",
    },
    answer: "fpc",
    why: "for three hours مدة، والصيغة المستمرة تبرز امتدادها.",
  },
};

export function AspectDeck39({ mode }: { mode: string }) {
  const data = ASPECT_CASES_39[mode] ?? ASPECT_CASES_39.articles;
  const [choice, setChoice] = useState<"fp" | "fpc" | "">("");
  const [checked, setChecked] = useState(false);
  return (
    <Instrument39
      id="aspect-compare"
      label="RESULT / DURATION SCALE"
      title={data.title}
      tone="rose"
      note="الجملتان صحيحتان؛ الفرق في زاوية التركيز."
    >
      <div className="obs-pair">
        {(["fp", "fpc"] as const).map((key) => (
          <div key={key} className={`obs-pair-card ${key === "fp" ? "is-result" : "is-duration"}`}>
            <p className="obs-pair-tag">
              {key === "fp" ? "Future Perfect · will have + V3" : "Future Perfect Continuous · will have been + V-ing"}
            </p>
            <p dir="ltr" className="obs-readout-en font-en">
              {data[key].sentence}
            </p>
            <p className="obs-readout-ar">
              <Rich text={data[key].ar} />
            </p>
            <p className="obs-readout-focus">
              <Rich text={data[key].focus} />
            </p>
          </div>
        ))}
      </div>
      <p className="obs-q mt-2">
        <Rich text={data.question} />
      </p>
      <div className="flex flex-wrap gap-1.5">
        {(["fp", "fpc"] as const).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={choice === key}
            disabled={checked}
            onClick={() => setChoice(key)}
            className={`obs-token ${choice === key ? "is-active" : ""}`}
          >
            {key === "fp" ? "Future Perfect" : "Future Perfect Continuous"}
          </button>
        ))}
        <ActionButton39 variant="secondary" disabled={!choice || checked} onClick={() => setChecked(true)}>
          تحقّق
        </ActionButton39>
      </div>
      {checked ? (
        <Feedback39 state={choice === data.answer ? "ok" : "review"} title={choice === data.answer ? "اختيار صحيح" : "أعد النظر في زاوية التركيز"}>
          <Rich text={data.why} />
        </Feedback39>
      ) : null}
    </Instrument39>
  );
}

/* ------------------------------------------------------------ أفعال الحالة */

export function StativeDeck39() {
  const [active, setActive] = useState(0);
  const verb = STATIVE_VERBS_39[active];
  return (
    <Instrument39
      id="stative-orbit"
      label="STATIVE VERBS"
      title="ستة أفعال حالة — اضغط الفعل لترى الاستعمالين"
      tone="teal"
    >
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="أفعال الحالة">
        {STATIVE_VERBS_39.map((item, index) => (
          <button
            key={item.verb}
            type="button"
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={`obs-token ${index === active ? "is-active" : ""}`}
          >
            <En>{item.verb}</En>
            <span className="mr-1 text-[11px] opacity-80">{item.arabic}</span>
          </button>
        ))}
      </div>
      <div className="mt-2 space-y-1.5">
        <p dir="ltr" className="obs-en-line obs-en-line--ok font-en">
          ✅ {verb.good}
        </p>
        <p dir="ltr" className="obs-en-line obs-en-line--bad font-en">
          ❌ {verb.bad}
        </p>
        <p className="obs-nuance">
          <En>{verb.verb}</En> فعل حالة عندما يحمل معنى الحالة، فلا يُستخدم عادةً في صيغة{" "}
          <span dir="ltr" className="font-en">will have been + V-ing</span>.
        </p>
        <p className="obs-nuance">
          الأفعال <span dir="ltr" className="font-en">live</span> و<span dir="ltr" className="font-en">work</span> تسمح
          بالزمنين بحسب التركيز.
        </p>
        {verb.origin === "platform" ? (
          <p className="obs-nuance">هذا الزوج إضافة من المنصة على نمط مثال المصدر (know).</p>
        ) : null}
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ معمل التدريبات */

function PracticeFill({
  onAttempt,
}: {
  onAttempt?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  return (
    <>
      <ol className="space-y-2">
        {FILL30_ITEMS_39.map((item) => (
          <li key={item.n} className="obs-card">
            <p dir="ltr" className="obs-en-line font-en">
              {item.prompt}
            </p>
            <input
              dir="ltr"
              value={answers[item.n] ?? ""}
              onChange={(event) =>
                {
                  const picked = event.currentTarget.value;
                  setAnswers((current) => ({ ...current, [item.n]: picked }));
                }
              }
              placeholder="will have been …"
              aria-label={`إجابة البند ${item.n}`}
              disabled={checked}
              className={`${FOCUS_39} obs-input font-en mt-1.5`}
            />
            {checked ? (
              <p
                className={`obs-verdict ${
                  norm(answers[item.n] ?? "").includes(norm(item.answer).replace(/^will /, "")) ||
                  norm(answers[item.n] ?? "") === norm(item.answer)
                    ? "is-ok"
                    : "is-bad"
                }`}
              >
                الصيغة المرجعية:{" "}
                <span dir="ltr" className="font-en">
                  {item.answer}
                </span>
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      <ActionButton39
        variant="secondary"
        className="mt-2"
        disabled={Object.keys(answers).length < FILL30_ITEMS_39.length || checked}
        onClick={() => {
          setChecked(true);
          onAttempt?.();
        }}
      >
        اعرض الصيغ المرجعية
      </ActionButton39>
    </>
  );
}

function PracticeTense({ onAttempt }: { onAttempt?: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  return (
    <>
      <ol className="space-y-2">
        {TENSE31_ITEMS_39.map((item) => (
          <li key={item.n} className="obs-card">
            <p dir="ltr" className="obs-en-line font-en">
              {item.prompt}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {(
                [
                  ["future-perfect", "Future Perfect"],
                  ["future-perfect-continuous", "Future Perfect Continuous"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={answers[item.n] === value}
                  disabled={checked}
                  onClick={() => setAnswers((current) => ({ ...current, [item.n]: value }))}
                  className={`obs-token ${answers[item.n] === value ? "is-active" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {checked ? (
              <div className="mt-1">
                <p className={`obs-verdict ${answers[item.n] === item.answer ? "is-ok" : "is-bad"}`}>
                  {answers[item.n] === item.answer ? "✓" : "✗"}{" "}
                  <span dir="ltr" className="font-en">
                    {item.answerText}
                  </span>
                </p>
                <p className="obs-nuance">
                  <Rich text={item.why} />
                </p>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <ActionButton39
        variant="secondary"
        className="mt-2"
        disabled={Object.keys(answers).length < TENSE31_ITEMS_39.length || checked}
        onClick={() => {
          setChecked(true);
          onAttempt?.();
        }}
      >
        صحّح اختيارات الزمن
      </ActionButton39>
    </>
  );
}

function PracticeDetective({ onAttempt }: { onAttempt?: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  return (
    <>
      <ol className="space-y-2">
        {DETECTIVE32_ITEMS_39.map((item) => (
          <li key={item.n} className="obs-card">
            <p dir="ltr" className="obs-en-line obs-en-line--bad font-en">
              {item.prompt}
            </p>
            <input
              dir="ltr"
              value={answers[item.n] ?? ""}
              onChange={(event) =>
                {
                  const picked = event.currentTarget.value;
                  setAnswers((current) => ({ ...current, [item.n]: picked }));
                }
              }
              placeholder="اكتب الجملة المصححة…"
              aria-label={`تصحيح الجملة ${item.n}`}
              disabled={checked}
              className={`${FOCUS_39} obs-input font-en mt-1.5`}
            />
            {checked ? (
              <div className="mt-1">
                <p className={`obs-verdict ${norm(answers[item.n] ?? "") === norm(item.answer) ? "is-ok" : "is-bad"}`}>
                  {norm(answers[item.n] ?? "") === norm(item.answer) ? "✓ مطابق" : "✗ الصواب:"}{" "}
                  <span dir="ltr" className="font-en">
                    {item.answer}
                  </span>
                </p>
                <p className="obs-nuance">
                  <Rich text={item.why} />
                </p>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <ActionButton39
        variant="secondary"
        className="mt-2"
        disabled={Object.keys(answers).length < DETECTIVE32_ITEMS_39.length || checked}
        onClick={() => {
          setChecked(true);
          onAttempt?.();
        }}
      >
        اعرض التصحيح والسبب
      </ActionButton39>
    </>
  );
}

const PRACTICE_META_39: Record<string, { title: string; label: string; tone: "cyan" | "gold" | "violet" | "teal" | "rose"; note: string }> = {
  "exercise29-a": {
    title: "التدريب الأول — الأسئلة ①–③",
    label: "DRILL · CHOOSE THE FORM",
    tone: "cyan",
    note: "اختر الصيغة الصحيحة ثم صحّح. حلول المصدر تُفتح بعد المحاولة.",
  },
  "exercise29-b": {
    title: "التدريب الأول — الأسئلة ④–⑥",
    label: "DRILL · CHOOSE THE FORM",
    tone: "cyan",
    note: "أكمل الأسئلة الثلاثة الأخيرة، ثم قارن بمفتاح المصدر أسفل الصفحة.",
  },
  fill30: {
    title: "التدريب الثاني — أكمل باستخدام الزمن",
    label: "DRILL · COMPLETE",
    tone: "gold",
    note: "اكتب الصيغة كاملة، ثم اعرض الصيغ المرجعية من المصدر.",
  },
  tense31: {
    title: "التدريب الثالث — الإنجاز أم المدة؟",
    label: "DRILL · TENSE DECISION",
    tone: "violet",
    note: "اختر الزمن الأنسب بحسب المعنى، ثم اقرأ سبب الاختيار.",
  },
  detective32: {
    title: "Grammar Detective — صحح عشر جمل",
    label: "DRILL · REPAIR",
    tone: "rose",
    note: "اكتب تصحيحك أولًا؛ المقارنة تُظهر تصحيح المصدر وسبب الخطأ.",
  },
};

export function PracticeDeck39({ kind, onAttempt }: { kind: string; onAttempt?: () => void }) {
  const meta = PRACTICE_META_39[kind] ?? PRACTICE_META_39.fill30;
  const isExercise = kind.startsWith("exercise29");
  const slice = kind === "exercise29-a" ? EXERCISE29_ITEMS_39.slice(0, 3) : EXERCISE29_ITEMS_39.slice(3);
  return (
    <Instrument39 id="drill-lab" label={meta.label} title={meta.title} tone={meta.tone} note={meta.note}>
      {isExercise ? (
        <ExerciseSlice slice={slice} onAttempt={onAttempt} />
      ) : kind === "tense31" ? (
        <PracticeTense onAttempt={onAttempt} />
      ) : kind === "detective32" ? (
        <PracticeDetective onAttempt={onAttempt} />
      ) : (
        <PracticeFill onAttempt={onAttempt} />
      )}
    </Instrument39>
  );
}

function ExerciseSlice({
  slice,
  onAttempt,
}: {
  slice: readonly (typeof EXERCISE29_ITEMS_39)[number][];
  onAttempt?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  return (
    <>
      <ol className="space-y-2">
        {slice.map((item) => (
          <li key={item.n} className="obs-card">
            <p dir="ltr" className="obs-en-line font-en">
              {item.prompt}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {item.options.map((option) => {
                const letter = option.slice(0, 1);
                return (
                  <label key={option} className={`obs-choice obs-choice--inline ${answers[item.n] === letter ? "is-active" : ""}`}>
                    <input
                      type="radio"
                      name={`slice-${item.n}`}
                      value={letter}
                      checked={answers[item.n] === letter}
                      disabled={checked}
                      onChange={(event) =>
                        {
                  const picked = event.currentTarget.value;
                  setAnswers((current) => ({ ...current, [item.n]: picked }));
                }
                      }
                      className={`${FOCUS_39} h-4 w-4 accent-[#6fe3ee]`}
                    />
                    <span dir="ltr" className="font-en">
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
            {checked ? (
              <p className={`obs-verdict ${answers[item.n] === item.answer ? "is-ok" : "is-bad"}`}>
                {answers[item.n] === item.answer ? "✓" : "✗"} الصواب:{" "}
                <span dir="ltr" className="font-en">
                  {item.answer} — {item.answerText}
                </span>
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <ActionButton39
          variant="secondary"
          disabled={Object.keys(answers).length < slice.length || checked}
          onClick={() => {
            setChecked(true);
            onAttempt?.();
          }}
        >
          صحّح الاختيارات
        </ActionButton39>
        {checked ? (
          <span className="obs-verdict is-ok" dir="auto">
            {slice.filter((item) => answers[item.n] === item.answer).length} / {slice.length}
          </span>
        ) : null}
      </div>
    </>
  );
}

/* ------------------------------------------------------------ القراءة */

export function ReadingDeck39({
  mode,
  onAttempt,
}: {
  mode: "journey" | "questions";
  onAttempt?: () => void;
}) {
  const [stop, setStop] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  if (mode === "journey") {
    const current = READING34_JOURNEY_39[stop];
    return (
      <Instrument39
        id="reading-journey"
        label="ROUTE TRACKER"
        title="رحلة العائلة: أربع محطات على خط زمني"
        tone="gold"
        note="اضغط أي محطة لقراءة الموعد والمدة حتى تلك اللحظة."
      >
        <div className="obs-route" role="group" aria-label="محطات الرحلة">
          {READING34_JOURNEY_39.map((moment, index) => (
            <button
              key={moment.clock}
              type="button"
              aria-pressed={index === stop}
              onClick={() => setStop(index)}
              className={`obs-route-stop ${index === stop ? "is-active" : ""}`}
            >
              <span dir="ltr" className="obs-node-clock font-en">
                {moment.clock}
              </span>
              <span className="obs-node-label">
                <Rich text={moment.label} />
              </span>
              <span dir="ltr" className="obs-route-hours font-en">
                +{moment.hours}h
              </span>
            </button>
          ))}
        </div>
        <div className="obs-readout mt-2">
          <p dir="ltr" className="obs-readout-en font-en">
            {current.detail}
          </p>
          <p className="obs-readout-focus">
            <Rich text={current.label} /> — المدة منذ الانطلاق:{" "}
            <span dir="ltr" className="font-en">
              {current.hours} hours
            </span>
          </p>
        </div>
      </Instrument39>
    );
  }

  return (
    <Instrument39
      id="reading-check"
      label="COMPREHENSION"
      title="أسئلة الفهم على النص"
      tone="teal"
      note="الإجابات الصحيحة من مفتاح المصدر — لا تظهر قبل المحاولة."
    >
      <ol className="space-y-1.5">
        {READING34_QUESTIONS_39.map((question) => (
          <li key={question} dir="ltr" className="obs-en-line font-en">
            {question}
          </li>
        ))}
      </ol>
      <ul className="mt-2 space-y-2">
        {READING34_CHECK_39.map((item) => (
          <li key={item.id} className="obs-card">
            <p className="obs-q">
              <Rich text={item.prompt} />
            </p>
            <div className="mt-1.5 grid gap-1.5">
              {item.choices.map((choice) => (
                <label
                  key={choice.value}
                  className={`obs-choice ${answers[item.id] === choice.value ? "is-active" : ""}`}
                >
                  <input
                    type="radio"
                    name={`reading-${item.id}`}
                    value={choice.value}
                    checked={answers[item.id] === choice.value}
                    disabled={checked}
                    onChange={(event) =>
                      {
                        const picked = event.currentTarget.value;
                        setAnswers((current) => ({ ...current, [item.id]: picked }));
                      }
                    }
                    className={`${FOCUS_39} mt-1 h-4 w-4 accent-[#6fe3ee]`}
                  />
                  <span className="min-w-0">
                    <ChoiceText39 text={choice.label} />
                  </span>
                </label>
              ))}
            </div>
            {checked ? (
              <p className={`obs-verdict ${item.accepted.includes(answers[item.id] ?? "") ? "is-ok" : "is-bad"}`}>
                {item.accepted.includes(answers[item.id] ?? "") ? "✓" : "✗"}{" "}
                <Rich text={item.feedback} />
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <ActionButton39
          variant="secondary"
          disabled={Object.keys(answers).length < READING34_CHECK_39.length || checked}
          onClick={() => {
            setChecked(true);
            onAttempt?.();
          }}
        >
          تحقّق من الفهم
        </ActionButton39>
        <ActionButton39 variant="ghost" onClick={() => setShowAnalysis((value) => !value)}>
          {showAnalysis ? "إخفاء تحليل الصيغ" : "تحليل الصيغ في النص"}
        </ActionButton39>
      </div>
      {showAnalysis ? (
        <ul className="mt-2 space-y-1.5">
          {READING34_ANALYSIS_39.map((line) => (
            <li key={line.line} className="obs-card">
              <p dir="ltr" className="obs-en-line font-en">
                {line.line}
              </p>
              <p className="obs-nuance">
                <span dir="ltr" className="font-en">
                  {line.form}
                </span>{" "}
                — <Rich text={line.why} />
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </Instrument39>
  );
}

/* ------------------------------------------------------------ الكتابة */

export function WritingDeck39({ mode }: { mode: "brief" | "model" }) {
  const storageKey = "obs39-writing";
  const [draft, setDraft] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) ?? "";
    } catch {
      return "";
    }
  });
  const [criteria, setCriteria] = useState<Record<number, boolean>>({});
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const sentences = useMemo(
    () => draft.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length,
    [draft],
  );
  const words = useMemo(() => draft.split(/\s+/).filter(Boolean).length, [draft]);
  const save = (value: string) => {
    setDraft(value);
    try {
      sessionStorage.setItem(storageKey, value);
    } catch {
      /* الحفظ داخل الجلسة غير متاح — الكتابة تبقى في الصفحة */
    }
  };
  if (mode === "model") {
    return (
      <Instrument39
        id="writing-model"
        label="MODEL GUIDANCE"
        title="النموذج الإرشادي ووظيفة كل سطر"
        tone="gold"
        note="النموذج للقراءة فقط؛ المطلوب فقرة بأفكارك ومفرداتك."
      >
        <ol className="space-y-1.5">
          {WRITING37_MODEL_39.map((line, index) => (
            <li key={line} className="obs-card">
              <p dir="ltr" className="obs-en-line font-en">
                {line}
              </p>
              <p className="obs-nuance">
                <En>{WRITING37_MODEL_FORMS_39[index]}</En>
              </p>
            </li>
          ))}
        </ol>
      </Instrument39>
    );
  }
  return (
    <Instrument39
      id="writing-bench"
      label="MISSION LOG"
      title="My Learning Journey by Next Year"
      tone="cyan"
      note="تُحفظ المسودة في هذه الجلسة فقط. لا يوجد تصحيح آلي؛ التقييم يدوي بمعايير المعلم."
    >
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {WRITING37_CRITERIA_39.map((criterion, index) => (
          <li key={criterion}>
            <label className={`obs-check ${criteria[index] ? "is-done" : ""}`}>
              <input
                type="checkbox"
                checked={Boolean(criteria[index])}
                onChange={(event) => {
                  const nextChecked = event.currentTarget.checked;
                  setCriteria((current) => ({ ...current, [index]: nextChecked }));
                }}
                className={`${FOCUS_39} mt-1 h-4 w-4 shrink-0 accent-[#6fe3ee]`}
              />
              <span className="min-w-0">
                <Rich text={criterion} />
              </span>
            </label>
          </li>
        ))}
      </ul>
      <label className="mt-2 block">
        <span className="obs-field-label">مسودة الفقرة (12–15 جملة)</span>
        <textarea
          ref={textareaRef}
          dir="ltr"
          value={draft}
          onChange={(event) => save(event.currentTarget.value)}
          rows={9}
          placeholder="By next year, I will have been…"
          className={`${FOCUS_39} obs-textarea font-en`}
        />
      </label>
      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
        <span dir="ltr" className="obs-counter font-en">
          {sentences} sentences · {words} words
        </span>
        <span className="obs-nuance">العدّاد مساعد فقط، وليس تقييمًا لغويًا.</span>
        <ActionButton39 variant="ghost" onClick={() => save("")}>
          مسح المسودة
        </ActionButton39>
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ سلّم الأزمنة */

const LADDER_39 = [
  {
    id: "ppc",
    tense: "Present Perfect Continuous",
    form: "have/has been + V-ing",
    reference: "الحاضر",
    sentence: "I have been working for three hours.",
    ar: "لقد أمضيت ثلاث ساعات في العمل، وما زال النشاط مرتبطًا بالحاضر.",
  },
  {
    id: "pastpc",
    tense: "Past Perfect Continuous",
    form: "had been + V-ing",
    reference: "نقطة ماضية",
    sentence: "I had been working for three hours before my friend arrived.",
    ar: "كنت قد أمضيت ثلاث ساعات في العمل قبل وصول صديقي.",
  },
  {
    id: "fpc",
    tense: "Future Perfect Continuous",
    form: "will have been + V-ing",
    reference: "نقطة مستقبلية",
    sentence: "By 8:00, I will have been working for three hours.",
    ar: "بحلول الثامنة، سأكون قد أمضيت ثلاث ساعات في العمل.",
  },
] as const;

export function LadderDeck39() {
  const [active, setActive] = useState(2);
  return (
    <Instrument39
      id="tense-ladder"
      label="TENSE HARMONICS"
      title="ثلاثة أزمنة، فكرة واحدة: مدة نشاط"
      tone="violet"
      note="الفكرة المشتركة: التركيز على مدة النشاط. الاختلاف: النقطة الزمنية التي نقيس عندها."
    >
      <div className="obs-ladder" role="group" aria-label="الأزمنة التامة المستمرة">
        {LADDER_39.map((tense, index) => (
          <button
            key={tense.id}
            type="button"
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            className={`obs-ladder-step ${index === active ? "is-active" : ""}`}
          >
            <span dir="ltr" className="obs-ladder-tense font-en">
              {tense.tense}
            </span>
            <span className="obs-ladder-ref">
              <Rich text={tense.reference} />
            </span>
          </button>
        ))}
      </div>
      <div className="obs-readout mt-2">
        <p dir="ltr" className="obs-readout-en font-en">
          {LADDER_39[active].sentence}
        </p>
        <p className="obs-readout-ar">
          <Rich text={LADDER_39[active].ar} />
        </p>
        <p dir="ltr" className="obs-readout-focus font-en">
          {LADDER_39[active].form}
        </p>
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ خريطة المنهج */

export function CurriculumDeck39() {
  return (
    <Instrument39
      id="curriculum-orbit"
      label="CURRICULUM ORBIT"
      title="منظومة المستقبل المكتملة"
      tone="violet"
      note="ست صيغ درستها بالترتيب؛ كل صيغة تحل وظيفة مختلفة."
    >
      <ol className="grid gap-1.5 sm:grid-cols-2">
        {CURRICULUM_MAP_39.map((entry) => (
          <li key={entry.id} className={`obs-map-card ${entry.lesson === 39 ? "is-current" : ""}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="obs-map-form">
                <Rich text={`${entry.order} ${entry.form}`} />
              </span>
              <span className="obs-map-lesson">Lesson {entry.lesson}</span>
            </div>
            <p className="obs-map-uses">
              <Rich text={entry.expression} />
            </p>
            <p dir="auto" className="obs-map-pattern font-en">
              {entry.pattern}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <a
          href="#/lesson/40"
          className={`${FOCUS_39} obs-btn obs-btn--primary no-underline`}
        >
          المحطة القادمة: Lesson 40 ↗
        </a>
        <span className="obs-nuance">المراجعة الشاملة لأزمنة المستقبل.</span>
      </div>
    </Instrument39>
  );
}

/* ------------------------------------------------------------ بوابة المعلم */

export function TeacherGate39({
  onGoTeacher,
  onGoSolutions,
  onGoTest,
}: {
  onGoTeacher: () => void;
  onGoSolutions: () => void;
  onGoTest: () => void;
}) {
  return (
    <Instrument39
      id="teacher-gate"
      label="SIGNAL CONTROL"
      title="مساحة المعلم والحلول التفصيلية"
      tone="teal"
      note="لا تظهر إجابات الاختبار قبل التسليم؛ بوابة المعلم هي المسار الآخر."
    >
      <div className="flex flex-wrap gap-2">
        <ActionButton39 onClick={onGoTeacher}>دخول المعلم</ActionButton39>
        <ActionButton39 variant="secondary" onClick={onGoTest}>
          العودة إلى الاختبار
        </ActionButton39>
        <ActionButton39 variant="ghost" onClick={onGoSolutions}>
          منطقة الحلول (بعد التسليم)
        </ActionButton39>
      </div>
      <PlatformNote39>
        نص المصدر في هذا القسم يعرض عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» فقط، ولا يحمل مفتاحًا فعليًا. الحلول
        التفصيلية إضافة من إعداد المنصة/المعلم وفق قواعد الدرس وأمثلته.
      </PlatformNote39>
    </Instrument39>
  );
}
