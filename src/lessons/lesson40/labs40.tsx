import { useState } from "react";
import { Callout40, Chip40, EnBidi, MixedBidi, RevealPanel40, normalizeEnglishInput40 } from "./kit40";
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
  READING23_ANSWERS_40,
  READING23_QUESTIONS_40,
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
} from "./practiceData40";

/** مختبر اختيارات مصغّر مشترك مع تغذية راجعة فورية ووسم مصدر البند. */
export function ChoiceMiniLab40({
  title,
  subtitle,
  items,
  onAllAnswered,
}: {
  title: string;
  subtitle?: string;
  items: readonly ChoiceItem40[];
  onAllAnswered?: () => void;
}) {
  const [picked, setPicked] = useState<Record<string, string>>({});

  function choose(itemId: string, value: string) {
    const next = { ...picked, [itemId]: value };
    setPicked(next);
    if (onAllAnswered && items.every((item) => Boolean(next[item.id]))) {
      onAllAnswered();
    }
  }

  return (
    <div dir="rtl" className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 sm:p-5 space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Chip40
            label={`تمت الإجابة: ${items.filter((i) => Boolean(picked[i.id])).length}/${items.length}`}
            tone="teal"
          />
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
          <MixedBidi>{title}</MixedBidi>
        </h3>
        {subtitle ? (
          <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
            <MixedBidi>{subtitle}</MixedBidi>
          </p>
        ) : null}
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const current = picked[item.id];
          const isAnswered = Boolean(current);
          const isCorrect = isAnswered && item.accepted.includes(current);
          return (
            <div
              key={item.id}
              className="rounded-xl border border-[#d5d0c3] bg-[#fffdf8] p-4 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm sm:text-base font-bold text-[#24343b] leading-[1.85]">
                  <MixedBidi>{item.prompt}</MixedBidi>
                </p>
                <Chip40
                  label={item.origin === "source" ? "مبني على المصدر" : "تطبيق تفاعلي"}
                  tone={item.origin === "source" ? "teal" : "neutral"}
                />
              </div>

              {item.lines && item.lines.length > 0 ? (
                <div className="space-y-1.5">
                  {item.lines.map((line, idx) => (
                    <div
                      key={idx}
                      dir="ltr"
                      lang="en"
                      style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                      className="rounded-lg border border-[#c7d3cb] bg-[#f7f8f5] px-3 py-2 font-mono text-sm font-semibold text-[#17354a]"
                    >
                      <EnBidi>{line}</EnBidi>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.choices.map((choice) => {
                  const selected = current === choice.value;
                  const stateClass = !selected
                    ? "border-[#c7c2b4] bg-[#ffffff] text-[#24343b] hover:border-[#245f62]"
                    : item.accepted.includes(choice.value)
                      ? "border-[#28533b] bg-[#edf5ee] text-[#28533b]"
                      : "border-[#8d3832] bg-[#fbefed] text-[#8d3832]";
                  return (
                    <button
                      key={choice.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => choose(item.id, choice.value)}
                      className={`rounded-xl border px-3.5 py-2.5 text-right text-sm font-bold transition cursor-pointer ${stateClass}`}
                    >
                      <MixedBidi>{choice.label}</MixedBidi>
                    </button>
                  );
                })}
              </div>

              {isAnswered ? (
                <div
                  className={`rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-semibold leading-[1.8] ${
                    isCorrect
                      ? "border-[#8fb69a] bg-[#edf5ee] text-[#28533b]"
                      : "border-[#cf7d73] bg-[#fbefed] text-[#8d3832]"
                  }`}
                >
                  <p>
                    <MixedBidi>{isCorrect ? `✅ إجابة موفقة — ${item.feedback}` : `💡 راجع المعنى — ${item.feedback}`}</MixedBidi>
                  </p>
                  {item.nuance ? (
                    <p className="mt-1 text-[#76531e]">
                      <MixedBidi>{item.nuance}</MixedBidi>
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** §1 — قائمة مراجعة الأهداف العشرة. */
export function ObjectivesChecklistLab40() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const count = Object.values(checked).filter(Boolean).length;

  return (
    <div dir="rtl" className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
          بطاقة التتبع الذاتي لأهداف المراجعة الشاملة (10 أهداف)
        </h3>
        <Chip40 label={`حددتَ: ${count}/10`} tone="teal" />
      </div>
      <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
        علّم المهارات التي تشعر بثقتك فيها الآن، وعد إليها بعد إتمام الجولات والاختبار النهائي.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {OBJECTIVES_40.map((goal, idx) => {
          const active = Boolean(checked[idx]);
          return (
            <button
              key={idx}
              type="button"
              aria-pressed={active}
              onClick={() => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }))}
              className={`rounded-xl border px-3.5 py-2.5 text-right text-sm font-bold transition cursor-pointer ${
                active
                  ? "border-[#28533b] bg-[#edf5ee] text-[#28533b]"
                  : "border-[#d5d0c3] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
              }`}
            >
              <MixedBidi>{`${active ? "☑ " : "☐ "}${goal}`}</MixedBidi>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** §2 — الخريطة الكبرى: ستة أسئلة تقودك إلى الزمن المناسب (Experience A). */
export function DecisionMapLab40() {
  const [activeId, setActiveId] = useState<string>(DECISION_MAP_QUESTIONS_40[0].id);
  const active = DECISION_MAP_QUESTIONS_40.find((q) => q.id === activeId) ?? DECISION_MAP_QUESTIONS_40[0];

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              خريطة القرار السداسية التفاعلية (Six-Question Decision Map)
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              اختر أي سؤال من الأسئلة الستة لمعاينة مثاله وترجمته والصيغة النموذجية المرتبطة به.
            </p>
          </div>
          <Chip40 label="6 أسئلة ← 5 صيغ رئيسية" tone="teal" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {DECISION_MAP_QUESTIONS_40.map((q) => {
            const isSelected = q.id === active.id;
            return (
              <button
                key={q.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveId(q.id)}
                className={`rounded-xl border p-3 text-right transition cursor-pointer space-y-1 ${
                  isSelected
                    ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                    : "border-[#c7c2b4] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs font-extrabold">
                  <span>{q.order}</span>
                  <span
                    dir="ltr"
                    lang="en"
                    style={{ direction: "ltr", unicodeBidi: "isolate" }}
                    className={`rounded-full px-2 py-0.5 font-mono ${
                      isSelected ? "bg-[#245f62] text-[#ffffff]" : "bg-[#eef4f0] text-[#245f62]"
                    }`}
                  >
                    <EnBidi>{q.typicalForm}</EnBidi>
                  </span>
                </div>
                <p className="text-sm font-bold leading-snug">
                  <MixedBidi>{q.question}</MixedBidi>
                </p>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-extrabold text-[#17354a]">
              <MixedBidi>{`${active.order}: ${active.question}`}</MixedBidi>
            </span>
            <Chip40 label={`الصيغة النموذجية: ${active.typicalForm}`} tone="emerald" />
          </div>
          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="rounded-lg border border-[#c7d3cb] bg-[#f7f8f5] px-3.5 py-2.5 font-mono text-sm sm:text-base font-bold text-[#17354a]"
          >
            <EnBidi>{active.example}</EnBidi>
          </div>
          <p className="text-sm font-bold text-[#24343b]">
            <MixedBidi>{`الترجمة: ${active.translation}`}</MixedBidi>
          </p>
          <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
            <MixedBidi>{`الوظيفة الدلالية: ${active.category} — ${active.guidance}`}</MixedBidi>
          </p>
        </div>
      </div>

      <ChoiceMiniLab40
        title="مختبر توجيه المواقف عبر الخريطة الكبرى"
        subtitle="طبّق الأسئلة الستة لاختيار الصيغة النموذجية"
        items={DECISION_MAP_QUIZ_40}
      />
    </div>
  );
}

/** §3 — الجدول الذهبي الشامل (مختبر الفرق بين المحطات الست والصيغ الخمس). */
export function GoldenTableLab40() {
  return (
    <div dir="rtl" className="space-y-4">
      <Callout40 tone="amber" title="لماذا ندرس 6 محطات ونلخّص 5 صيغ رئيسية؟" badge="ملاحظة مصدرية دقيقة">
        <p>
          <MixedBidi>
            في الدروس 34–39 مررنا بست محطات تعليمية لأن الدرس 36 كان مخصصًا للمقارنة المباشرة بين WILL وBE GOING TO؛ أما الصيغ النحوية الرئيسية في منظومة المستقبل فهي خمس صيغ كما في الجدول أعلاه.
          </MixedBidi>
        </p>
      </Callout40>
      <ChoiceMiniLab40
        title="فحص سريع للجدول الذهبي"
        items={GOLDEN_TABLE_ITEMS_40}
      />
    </div>
  );
}

/** §4 — حدث واحد، خمس زوايا مختلفة باستخدام الفعل study (Experience B). */
export function StudyPerspectivesLab40() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const current = STUDY_PERSPECTIVES_40[selectedIdx] ?? STUDY_PERSPECTIVES_40[0];

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              مبدّل الزوايا الخمس للفعل study (One Verb, Five Perspectives)
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              بدّل بين الزوايا الخمس لترى كيف تتغير المعلومة التي نبرزها مع بقاء الحدث الأساسي (الدراسة الليلة) واحدًا.
            </p>
          </div>
          <Chip40 label={`الزاوية ${current.num} من ⑤`} tone="teal" />
        </div>

        <div className="flex flex-wrap gap-2">
          {STUDY_PERSPECTIVES_40.map((p, idx) => {
            const active = idx === selectedIdx;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedIdx(idx)}
                className={`rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                  active
                    ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                    : "border-[#c7c2b4] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
                }`}
              >
                <MixedBidi>{`${p.num} ${p.form}`}</MixedBidi>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-extrabold text-[#17354a]">
              <MixedBidi>{`${current.num} ${current.form}`}</MixedBidi>
            </span>
            <span
              dir="ltr"
              lang="en"
              style={{ direction: "ltr", unicodeBidi: "isolate" }}
              className="rounded-lg border border-[#c7d3cb] bg-[#f7f8f5] px-2.5 py-1 font-mono text-xs font-bold text-[#245f62]"
            >
              <EnBidi>{current.structure}</EnBidi>
            </span>
          </div>

          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="rounded-lg border border-[#8fb69a] bg-[#edf5ee] px-3.5 py-2.5 font-mono text-sm sm:text-base font-bold text-[#28533b]"
          >
            <EnBidi>{current.sentence}</EnBidi>
          </div>

          <p className="text-sm font-bold text-[#24343b]">
            <MixedBidi>{`المعنى العربي: ${current.arabic}`}</MixedBidi>
          </p>
          <p className="text-sm font-semibold text-[#17354a]">
            <MixedBidi>{`زاوية الإبراز: ${current.emphasis}`}</MixedBidi>
          </p>
        </div>
      </div>

      <ChoiceMiniLab40
        title="تطبيق الزوايا الخمس"
        items={STUDY_PERSPECTIVES_QUIZ_40}
      />
    </div>
  );
}

/** §5 — الجولة الأولى: WILL أم BE GOING TO؟ (Experience C). */
export function WillVsGoingToLab40() {
  return (
    <div dir="rtl" className="space-y-4">
      <Callout40 tone="teal" title="قاعدة التوازن في الجولة الأولى" badge="WILL vs BE GOING TO">
        <p>
          <MixedBidi>
            نميز نموذجيًا بين القرار اللحظي/الوعد/العرض/التوقع العام (WILL) وبين الخطة المسبقة/التوقع المبني على دليل حاضر (BE GOING TO)، مع تذكّر أن اللغتين الطبيعية تسمح أحيانًا بتداخل الصيغتين في التوقعات والإعلانات مع اختلاف درجة التركيز.
          </MixedBidi>
        </p>
      </Callout40>
      <ChoiceMiniLab40
        title="مختبر المواقف الأربعة: WILL أم BE GOING TO؟"
        subtitle="اختر الصيغة الأنسب لكل موقف من مواقف الجولة الأولى"
        items={WILL_VS_GOING_TO_SCENARIOS_40}
      />
    </div>
  );
}

/** §6 — الجولة الثانية: Future Continuous. */
export function FutureContinuousRoundLab40() {
  return (
    <ChoiceMiniLab40
      title="مختبر الجولة الثانية: النشاط الجاري والاستفسار اللطيف"
      subtitle="متى نضع الكاميرا داخل اللحظة المستقبلية؟"
      items={FUTURE_CONTINUOUS_ITEMS_40}
    />
  );
}

/** §7 — الجولة الثالثة: Future Perfect. */
export function FuturePerfectRoundLab40() {
  return (
    <ChoiceMiniLab40
      title="مختبر الجولة الثالثة: الإنجاز المكتمل بحلول نقطة مستقبلية"
      subtitle="التركيز على اكتمال النتيجة قبل أو عند الموعد المرجعي"
      items={FUTURE_PERFECT_ITEMS_40}
    />
  );
}

/** §8 — الجولة الرابعة: Future Perfect Continuous. */
export function FuturePerfectContinuousRoundLab40() {
  return (
    <ChoiceMiniLab40
      title="مختبر الجولة الرابعة: مدة النشاط الممتدة حتى نقطة مستقبلية"
      subtitle="تدريب سارة من 2:00 إلى 6:00 = 4 ساعات"
      items={FUTURE_PERFECT_CONTINUOUS_ITEMS_40}
    />
  );
}

/** §9 — المقارنة الثلاثية لمشروع آدم من 4:00 إلى 8:00 (Experience D). */
export function AdamThreeWayComparisonLab40() {
  const [selectedId, setSelectedId] = useState<string>(ADAM_TIMELINE_POINTS_40[0].id);
  const current = ADAM_TIMELINE_POINTS_40.find((p) => p.id === selectedId) ?? ADAM_TIMELINE_POINTS_40[0];

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              الخط الزمني التفاعلي لمشروع آدم (4:00 → 6:00 → 8:00)
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              يعمل آدم على مشروعه من الرابعة حتى الثامنة. اختر زاوية النظر على الخط الزمني للمقارنة بين الأزمنة الثلاثة.
            </p>
          </div>
          <Chip40 label="4:00 بداية العمل → 8:00 نهاية الساعات الأربع" tone="teal" />
        </div>

        {/* شريط الخط الزمني البصري */}
        <div className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm font-extrabold">
            <div className="rounded-lg border border-[#c7c2b4] bg-[#f5f3ed] p-2 text-[#24343b]">
              <div dir="ltr" lang="en" style={{ direction: "ltr", unicodeBidi: "isolate" }} className="font-mono text-[#17354a]">
                <EnBidi>4:00 PM</EnBidi>
              </div>
              <div>بداية عمل آدم على المشروع</div>
            </div>
            <div className="rounded-lg border border-[#95b8b1] bg-[#eef4f0] p-2 text-[#245f62]">
              <div dir="ltr" lang="en" style={{ direction: "ltr", unicodeBidi: "isolate" }} className="font-mono">
                <EnBidi>6:00 PM</EnBidi>
              </div>
              <div>منتصف العمل (نشاط جارٍ)</div>
            </div>
            <div className="rounded-lg border border-[#8fb69a] bg-[#edf5ee] p-2 text-[#28533b]">
              <div dir="ltr" lang="en" style={{ direction: "ltr", unicodeBidi: "isolate" }} className="font-mono">
                <EnBidi>8:00 PM</EnBidi>
              </div>
              <div>اكتمال النتيجة / تمام 4 ساعات</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {ADAM_TIMELINE_POINTS_40.map((point) => {
              const active = point.id === current.id;
              return (
                <button
                  key={point.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedId(point.id)}
                  className={`rounded-xl border p-3 text-right transition cursor-pointer space-y-1 ${
                    active
                      ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                      : "border-[#c7c2b4] bg-[#ffffff] text-[#24343b] hover:border-[#245f62]"
                  }`}
                >
                  <div className="text-xs font-extrabold">{point.clock}</div>
                  <div
                    dir="ltr"
                    lang="en"
                    style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                    className={`font-mono text-xs font-bold ${active ? "text-[#eef4f0]" : "text-[#245f62]"}`}
                  >
                    <EnBidi>{point.tense}</EnBidi>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-[#d5d0c3] bg-[#fdfcf8] p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-extrabold text-[#17354a]">
                <MixedBidi>{current.questionAr}</MixedBidi>
              </p>
              <Chip40 label={`${current.tense} (${current.formula})`} tone="emerald" />
            </div>
            <div
              dir="ltr"
              lang="en"
              style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
              className="rounded-lg border border-[#8fb69a] bg-[#edf5ee] px-3.5 py-2.5 font-mono text-sm sm:text-base font-bold text-[#28533b]"
            >
              <EnBidi>{current.sentence}</EnBidi>
            </div>
            <p className="text-sm font-bold text-[#24343b]">
              <MixedBidi>{current.translation}</MixedBidi>
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-[#245f62]">
              <MixedBidi>{`${current.focus} — ${current.windowInfo}`}</MixedBidi>
            </p>
          </div>
        </div>
      </div>

      <ChoiceMiniLab40
        title="تطبيق المقارنة الثلاثية على مشروع آدم"
        items={ADAM_COMPARISON_QUIZ_40}
      />
    </div>
  );
}

/** §10 — اختبار الفهم العميق (تفنيد اختصار انتهى / لم ينتهِ). */
export function DeepUnderstandingLab40() {
  return (
    <div dir="rtl" className="space-y-4">
      <Callout40 tone="coral" title="تصحيح المفهوم الشائع الخاطئ" badge="IQ200">
        <p>
          <MixedBidi>
            لا تقع في فخ الاختصار غير الدقيق: Future Perfect = انتهى، وFuture Perfect Continuous = لم ينتهِ. الفرق الصحيح هو زاوية التركيز: الإنجاز أو النتيجة مقابل المدة أو امتداد النشاط.
          </MixedBidi>
        </p>
      </Callout40>
      <ChoiceMiniLab40
        title="مختبر الفهم العميق (§10)"
        items={DEEP_UNDERSTANDING_ITEMS_40}
      />
    </div>
  );
}

/** §11 — الكلمات الزمنية: إشارات تساعدك، لكنها لا تقرر بدلًا منك. */
export function SignalWordsLab40() {
  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 space-y-3">
        <h3 className="text-base font-extrabold text-[#17354a]">الكلمات الزمنية الثماني المذكورة في §11</h3>
        <div className="flex flex-wrap gap-2">
          {SIGNAL_WORDS_LIST_40.map((word) => (
            <span
              key={word}
              dir="ltr"
              lang="en"
              style={{ direction: "ltr", unicodeBidi: "isolate" }}
              className="rounded-xl border border-[#95b8b1] bg-[#eef4f0] px-3 py-1.5 font-mono text-xs sm:text-sm font-bold text-[#17354a]"
            >
              <EnBidi>{word}</EnBidi>
            </span>
          ))}
        </div>
      </div>

      <ChoiceMiniLab40
        title="مختبر الإشارات الزمنية والتركيز الدلالي"
        subtitle="لماذا لا تفرض الكلمة الزمنية زمنًا واحدًا آليًا؟"
        items={SIGNAL_WORDS_ITEMS_40}
      />
    </div>
  );
}

/** §12 — مستكشف الجمل الزمنية المستقبلية مقابل السؤال المباشر (Experience E). */
export function TimeClausesExplorerLab40() {
  const [selectedId, setSelectedId] = useState<string>(TIME_CLAUSE_EXPLORER_CASES_40[0].id);
  const current =
    TIME_CLAUSE_EXPLORER_CASES_40.find((c) => c.id === selectedId) ?? TIME_CLAUSE_EXPLORER_CASES_40[0];

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              مستكشف الجمل الزمنية المستقبلية والسؤال المباشر
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              أدوات الربط الزمنية في §12 تأخذ Present Simple في الجملة الزمنية، بينما السؤال المباشر بـ When يأخذ will.
            </p>
          </div>
          <Chip40 label="Present Simple في جملة الشرط/الزمن" tone="teal" />
        </div>

        <div className="flex flex-wrap gap-2">
          {TIME_CLAUSE_CONJUNCTIONS_40.map((conj) => (
            <span
              key={conj}
              dir="ltr"
              lang="en"
              style={{ direction: "ltr", unicodeBidi: "isolate" }}
              className="rounded-lg border border-[#c7d3cb] bg-[#fffdf8] px-2.5 py-1 font-mono text-xs font-bold text-[#17354a]"
            >
              <EnBidi>{`${conj} + Present Simple`}</EnBidi>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {TIME_CLAUSE_EXPLORER_CASES_40.map((item) => {
            const active = item.id === current.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(item.id)}
                className={`rounded-xl border p-3 text-right transition cursor-pointer space-y-1 ${
                  active
                    ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                    : "border-[#c7c2b4] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
                }`}
              >
                <div className="text-xs font-extrabold">
                  <MixedBidi>{item.clauseType}</MixedBidi>
                </div>
                <div
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className={`font-mono text-xs font-semibold ${active ? "text-[#eef4f0]" : "text-[#17354a]"}`}
                >
                  <EnBidi>{item.english}</EnBidi>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-2.5">
          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="rounded-lg border border-[#8fb69a] bg-[#edf5ee] px-3.5 py-2.5 font-mono text-sm sm:text-base font-bold text-[#28533b]"
          >
            <EnBidi>{current.english}</EnBidi>
          </div>
          <p className="text-sm font-bold text-[#24343b]">
            <MixedBidi>{`المعنى: ${current.arabic}`}</MixedBidi>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-bold">
            <div className="rounded-lg border border-[#d5d0c3] bg-[#f5f3ed] p-2.5 text-[#17354a]">
              <MixedBidi>{`فعل الجملة الزمنية: ${current.timeClauseVerb}`}</MixedBidi>
            </div>
            <div className="rounded-lg border border-[#d5d0c3] bg-[#f5f3ed] p-2.5 text-[#245f62]">
              <MixedBidi>{`فعل الجملة الرئيسية: ${current.mainClauseVerb}`}</MixedBidi>
            </div>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
            <MixedBidi>{current.explanation}</MixedBidi>
          </p>
        </div>
      </div>

      <ChoiceMiniLab40
        title="تدريب تشخيصي على الجمل الزمنية والسؤال المباشر"
        items={TIME_CLAUSE_QUIZ_40}
      />
    </div>
  );
}

/** §13 — الفرق بين WHEN وBY THE TIME (Experience E). */
export function WhenVsByTheTimeLab40() {
  const [selectedId, setSelectedId] = useState<string>(WHEN_VS_BY_THE_TIME_PERSPECTIVES_40[0].id);
  const current =
    WHEN_VS_BY_THE_TIME_PERSPECTIVES_40.find((p) => p.id === selectedId) ?? WHEN_VS_BY_THE_TIME_PERSPECTIVES_40[0];

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
          الحدث المرجعي الواحد (you arrive) من ثلاث زوايا
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {WHEN_VS_BY_THE_TIME_PERSPECTIVES_40.map((p) => {
            const active = p.id === current.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(p.id)}
                className={`rounded-xl border p-3 text-right transition cursor-pointer space-y-1 ${
                  active
                    ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                    : "border-[#c7c2b4] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
                }`}
              >
                <div
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className="font-mono text-xs font-bold"
                >
                  <EnBidi>{p.connector}</EnBidi>
                </div>
                <div className="text-xs font-extrabold">
                  <MixedBidi>{p.tense}</MixedBidi>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-2">
          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="rounded-lg border border-[#8fb69a] bg-[#edf5ee] px-3.5 py-2.5 font-mono text-sm sm:text-base font-bold text-[#28533b]"
          >
            <EnBidi>{current.sentence}</EnBidi>
          </div>
          <p className="text-sm font-bold text-[#24343b]">
            <MixedBidi>{current.arabic}</MixedBidi>
          </p>
          <p className="text-xs sm:text-sm font-extrabold text-[#245f62]">
            <MixedBidi>{current.focus}</MixedBidi>
          </p>
        </div>
      </div>

      <ChoiceMiniLab40
        title="مختبر التمييز بين WHEN وBY THE TIME"
        items={WHEN_VS_BY_THE_TIME_QUIZ_40}
      />
    </div>
  );
}

/** §14 — FOR vs SINCE وأفعال الحالة في منظومة المستقبل (Experience F). */
export function ForSinceAndStativeLab40() {
  const [sorted, setSorted] = useState<Record<string, "for" | "since">>({});

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
            فرز تعبيرات المدة (FOR) ونقطة البداية (SINCE)
          </h3>
          <Chip40 label="FOR + مدة · SINCE + نقطة بداية" tone="teal" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FOR_SINCE_SORT_40.map((item) => {
            const picked = sorted[item.id];
            const isCorrect = picked === item.kind;
            return (
              <div key={item.id} className="rounded-xl border border-[#d5d0c3] bg-[#fffdf8] p-3.5 space-y-2">
                <div className="space-y-1">
                  <div
                    dir="ltr"
                    lang="en"
                    style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                    className="font-mono text-sm font-bold text-[#17354a]"
                  >
                    <EnBidi>{item.phrase}</EnBidi>
                  </div>
                  <p className="text-xs font-semibold text-[#43575a]">{item.meaning}</p>
                </div>
                <div className="flex gap-2">
                  {(["for", "since"] as const).map((btn) => {
                    const active = picked === btn;
                    return (
                      <button
                        key={btn}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSorted((prev) => ({ ...prev, [item.id]: btn }))}
                        className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                          !active
                            ? "border-[#c7c2b4] bg-[#ffffff] text-[#24343b]"
                            : isCorrect
                              ? "border-[#28533b] bg-[#edf5ee] text-[#28533b]"
                              : "border-[#8d3832] bg-[#fbefed] text-[#8d3832]"
                        }`}
                      >
                        {btn === "for" ? "FOR + مدة زمنية" : "SINCE + نقطة بداية"}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ChoiceMiniLab40
        title="مختبر أفعال الحالة (know) واستخدام for مع Future Perfect"
        items={FOR_SINCE_STATIVE_QUIZ_40}
      />
    </div>
  );
}

/** §15 — مختبر البناء: لا تخلط بين التركيبات (Experience G). */
export function FormulaBuilderLab40() {
  const [targetIdx, setTargetIdx] = useState<number>(0);
  const [chosenTokens, setChosenTokens] = useState<string[]>([]);
  const target = FORMULA_BUILDER_TARGETS_40[targetIdx] ?? FORMULA_BUILDER_TARGETS_40[0];

  const pool = [...target.tokens, ...target.distractors];
  const assembled = chosenTokens.join(" ");
  const expected = target.tokens.join(" ");
  const isComplete = chosenTokens.length === target.tokens.length;
  const isMatch = assembled === expected;

  function selectTarget(idx: number) {
    setTargetIdx(idx);
    setChosenTokens([]);
  }

  function addToken(tok: string) {
    if (chosenTokens.length < target.tokens.length) {
      setChosenTokens((prev) => [...prev, tok]);
    }
  }

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              باني الصيغ التفاعلي (Formula Builder — write)
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              اختر الزمن المطلوب، ثم ركّب أجزاء الفعل بالترتيب الصحيح دون خلط بين V1 وV-ing وV3.
            </p>
          </div>
          <Chip40 label={target.formula} tone="teal" />
        </div>

        <div className="flex flex-wrap gap-2">
          {FORMULA_BUILDER_TARGETS_40.map((t, idx) => {
            const active = idx === targetIdx;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectTarget(idx)}
                className={`rounded-xl border px-3 py-2 text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                  active
                    ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                    : "border-[#c7c2b4] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
                }`}
              >
                <span dir="ltr" lang="en" style={{ direction: "ltr", unicodeBidi: "isolate" }}>
                  <EnBidi>{t.tense}</EnBidi>
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-extrabold text-[#17354a]">
              <MixedBidi>{`ركّب صيغة ${target.tense} (${target.formula}):`}</MixedBidi>
            </span>
            <button
              type="button"
              onClick={() => setChosenTokens([])}
              className="rounded-lg border border-[#c7c2b4] bg-[#f5f3ed] px-3 py-1 text-xs font-extrabold text-[#24343b] hover:border-[#245f62] cursor-pointer"
            >
              إعادة ضبط التركيب
            </button>
          </div>

          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="min-h-[46px] rounded-xl border border-[#95b8b1] bg-[#f7f8f5] px-4 py-2.5 font-mono text-base font-bold text-[#17354a]"
          >
            <EnBidi>{assembled || "Click tokens below to build the verb phrase..."}</EnBidi>
          </div>

          <div className="flex flex-wrap gap-2" dir="ltr">
            {pool.map((tok, idx) => (
              <button
                key={`${tok}-${idx}`}
                type="button"
                onClick={() => addToken(tok)}
                className="rounded-xl border border-[#c7c2b4] bg-[#ffffff] px-3.5 py-2 font-mono text-sm font-bold text-[#17354a] hover:border-[#245f62] cursor-pointer"
              >
                <EnBidi>{tok}</EnBidi>
              </button>
            ))}
          </div>

          {isComplete ? (
            <div
              className={`rounded-xl border p-3 text-xs sm:text-sm font-bold ${
                isMatch
                  ? "border-[#8fb69a] bg-[#edf5ee] text-[#28533b]"
                  : "border-[#cf7d73] bg-[#fbefed] text-[#8d3832]"
              }`}
            >
              <p>
                <MixedBidi>
                  {isMatch
                    ? `✅ تركيب سليم: ${target.correctExample} — ${target.reason}`
                    : `❌ انتبه: ركّبتَ (${assembled}) والصحيح هو (${target.correctExample}). تذكّر تجنب الخطأ الشائع (${target.wrongExample}).`}
                </MixedBidi>
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-[#c8c3b4] bg-[#fffdf8] p-4 sm:p-5 space-y-3">
        <h3 className="text-base font-extrabold text-[#17354a]">الأخطاء الخمسة الواجب تجنبها ومقابلاتها الصحيحة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {FORMULA_ERROR_PAIRS_40.map((pair, idx) => (
            <div key={idx} className="rounded-xl border border-[#d5d0c3] bg-[#fdfcf8] p-3 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate" }}
                  className="font-mono text-xs sm:text-sm font-bold text-[#8d3832]"
                >
                  <EnBidi>{pair.wrong}</EnBidi>
                </span>
                <span
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate" }}
                  className="font-mono text-xs sm:text-sm font-bold text-[#28533b]"
                >
                  <EnBidi>{pair.right}</EnBidi>
                </span>
              </div>
              <p className="text-xs font-semibold text-[#43575a]">
                <MixedBidi>{pair.rule}</MixedBidi>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** §16 — الحوار الشامل الأول: The Science Competition (Experience H). */
export function Dialogue1Lab40() {
  const [showTranslations, setShowTranslations] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(true);

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              قارئ الحوار التفاعلي: The Science Competition (Maya & Daniel)
            </h3>
            <p className="text-xs font-semibold text-[#43575a]">
              النص الإنجليزي والتحليل النحوي للعبارات الست من المصدر؛ والترجمة العربية الكاملة لكل سطر إضافة تعليمية من المنصة.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={showTranslations}
              onClick={() => setShowTranslations((v) => !v)}
              className="rounded-xl border border-[#17354a] bg-[#fffdf8] px-3 py-1.5 text-xs font-extrabold text-[#17354a] cursor-pointer"
            >
              {showTranslations ? "إخفاء الترجمة العربية المساندة" : "إظهار الترجمة العربية المساندة"}
            </button>
            <button
              type="button"
              aria-pressed={showAnalysis}
              onClick={() => setShowAnalysis((v) => !v)}
              className="rounded-xl border border-[#245f62] bg-[#fffdf8] px-3 py-1.5 text-xs font-extrabold text-[#245f62] cursor-pointer"
            >
              {showAnalysis ? "إخفاء بطاقات التحليل النحوي" : "إظهار بطاقات التحليل النحوي"}
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {DIALOGUE1_LINES_40.map((turn) => (
            <div key={turn.id} className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-3.5 space-y-2">
              <div
                dir="ltr"
                lang="en"
                style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                className="font-mono text-sm sm:text-base font-bold text-[#17354a]"
              >
                <EnBidi>{`${turn.speaker}: ${turn.en}`}</EnBidi>
              </div>
              {showTranslations ? (
                <p className="text-sm font-semibold text-[#24343b]">
                  <MixedBidi>{`الترجمة (إضافة منصة): ${turn.ar}`}</MixedBidi>
                </p>
              ) : null}
              {showAnalysis ? (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#d5d0c3] bg-[#f5f3ed] px-3 py-1.5 text-xs font-bold text-[#245f62]">
                  <span>
                    <MixedBidi>{`${turn.tense} → ${turn.analysis}`}</MixedBidi>
                  </span>
                  <span>{turn.analysisOrigin === "source" ? "تحليل المصدر" : "توضيح مساند"}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <ChoiceMiniLab40
        title="فحص فهم الحوار الأول (IQ200)"
        items={DIALOGUE1_CHECK_40}
      />
    </div>
  );
}

/** §17 — الحوار الشامل الثاني: A Family Trip + التحدي السداسي (Experience H). */
export function Dialogue2Lab40({
  revealed,
  onReveal,
}: {
  revealed: boolean;
  onReveal: () => void;
}) {
  const [showTranslations, setShowTranslations] = useState(true);
  const [allAttempted, setAllAttempted] = useState(false);

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              قارئ الحوار الثاني: A Family Trip
            </h3>
            <p className="text-xs font-semibold text-[#43575a]">
              اقرأ الحوار ثم صنّف العبارات الست ①–⑥ لتفتح مفتاح الحل المصدري.
            </p>
          </div>
          <button
            type="button"
            aria-pressed={showTranslations}
            onClick={() => setShowTranslations((v) => !v)}
            className="rounded-xl border border-[#17354a] bg-[#fffdf8] px-3 py-1.5 text-xs font-extrabold text-[#17354a] cursor-pointer"
          >
            {showTranslations ? "إخفاء الترجمة العربية المساندة" : "إظهار الترجمة العربية المساندة"}
          </button>
        </div>

        <div className="space-y-2.5">
          {DIALOGUE2_LINES_40.map((turn) => (
            <div key={turn.id} className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-3.5 space-y-1.5">
              <div
                dir="ltr"
                lang="en"
                style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                className="font-mono text-sm sm:text-base font-bold text-[#17354a]"
              >
                <EnBidi>{`${turn.speaker}: ${turn.en}`}</EnBidi>
              </div>
              {showTranslations ? (
                <p className="text-sm font-semibold text-[#24343b]">
                  <MixedBidi>{`الترجمة (إضافة منصة): ${turn.ar}`}</MixedBidi>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <ChoiceMiniLab40
        title="التحدي التفاعلي: حدد لماذا استُخدم كل زمن في الحوار (①–⑥)"
        subtitle="أجب عن البنود الستة لفتح الحل المصدري الكامل"
        items={DIALOGUE2_CHALLENGE_40}
        onAllAnswered={() => setAllAttempted(true)}
      />

      <RevealPanel40
        id="s17-solution"
        label="الحل المصدري لتحدي الحوار الثاني (§17)"
        open={revealed}
        canOpen={allAttempted || revealed}
        lockedReason="صنّف البنود الستة ①–⑥ أولًا لفتح الحل المصدري."
        onToggle={onReveal}
      />
    </div>
  );
}

/** §18 — مختبر المواقف: اختر الزمن دون كلمات دالة واضحة (Experience C). */
export function SituationLab40() {
  return (
    <ChoiceMiniLab40
      title="مختبر المواقف الخمسة دون كلمات دالة جاهزة (§18)"
      subtitle="اقرأ الموقف الحياتي واختر الجملة التي تعبّر عن المعنى المقصود"
      items={SITUATION_LAB_ITEMS_40}
    />
  );
}

/** §19 — التدريب الأول: اختر الصيغة الأنسب (6 بنود + كشف الحلول بعد المحاولة). */
export function Exercise19Lab40({
  revealed,
  onReveal,
}: {
  revealed: boolean;
  onReveal: () => void;
}) {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const allAttempted = EXERCISE19_ITEMS_40.every((item) => Boolean(picked[item.n]));

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              ورشة التدريب الأول التفاعلية (6 بنود اختيار من متعدد)
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              اختر الإجابة لكل جملة من الجمل الست ①–⑥، ثم افتح قسم الحلول المصدري للمراجعة.
            </p>
          </div>
          <Chip40
            label={`تمت المحاولة: ${Object.keys(picked).length}/${EXERCISE19_ITEMS_40.length}`}
            tone="teal"
          />
        </div>

        <div className="space-y-3">
          {EXERCISE19_ITEMS_40.map((item) => {
            const current = picked[item.n];
            const isCorrect = current === item.answer;
            return (
              <div key={item.n} className="rounded-xl border border-[#d5d0c3] bg-[#fffdf8] p-4 space-y-3">
                <p className="text-sm sm:text-base font-bold text-[#17354a]">
                  <MixedBidi>{item.prompt}</MixedBidi>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.options.map((opt) => {
                    const selected = current === opt.label;
                    const cls = !selected
                      ? "border-[#c7c2b4] bg-[#ffffff] text-[#24343b] hover:border-[#245f62]"
                      : opt.label === item.answer
                        ? "border-[#28533b] bg-[#edf5ee] text-[#28533b]"
                        : "border-[#8d3832] bg-[#fbefed] text-[#8d3832]";
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setPicked((prev) => ({ ...prev, [item.n]: opt.label }))}
                        className={`rounded-xl border px-3.5 py-2.5 text-left font-mono text-sm font-bold transition cursor-pointer ${cls}`}
                        dir="ltr"
                        lang="en"
                        style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                      >
                        <EnBidi>{opt.text}</EnBidi>
                      </button>
                    );
                  })}
                </div>
                {current ? (
                  <p
                    className={`rounded-lg border px-3 py-2 text-xs sm:text-sm font-bold ${
                      isCorrect
                        ? "border-[#8fb69a] bg-[#edf5ee] text-[#28533b]"
                        : "border-[#cf7d73] bg-[#fbefed] text-[#8d3832]"
                    }`}
                  >
                    <MixedBidi>
                      {isCorrect
                        ? `✅ صحيح (${item.answer}. ${item.answerText}) — ${item.why}`
                        : `💡 الإجابة النموذجية هي ${item.answer} (${item.answerText}) — ${item.why}`}
                    </MixedBidi>
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <RevealPanel40
        id="s19-solutions"
        label="الحلول المصدرية للتدريب الأول (§19)"
        open={revealed}
        canOpen={allAttempted || revealed}
        lockedReason="أكمل محاولة البنود الستة ①–⑥ لفتح قسم الحلول المصدري."
        onToggle={onReveal}
      />
    </div>
  );
}

/** §20 — التدريب الثاني: أكمل الصيغة المناسبة (8 بنود + كشف الحلول المفصلة بعد المحاولة). */
export function Fill20Lab40({
  revealed,
  onReveal,
}: {
  revealed: boolean;
  onReveal: () => void;
}) {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const allAttempted = FILL20_ITEMS_40.every((item) => Boolean(inputs[item.n]?.trim()));

  return (
    <div dir="rtl" className="space-y-4">
      <Callout40 tone="amber" title="ملاحظتان دقيقتان قبل الإكمال (البند ② والبنود ⑥–⑧)" badge="دقة نحوية">
        <p>
          <MixedBidi>
            • في البند ② (We bought the tickets yesterday) شراء التذاكر يمنحنا يقينًا سياقيًا يدعم وجود خطة مسبقة، فتكون الصيغة المستهدفة من الصيغ الخمس هي are going to visit (مع التمييز بين الصيغة النحوية للخطة واليقين المستفاد من السياق).
          </MixedBidi>
        </p>
        <p>
          <MixedBidi>
            • في البنود ⑥ و⑦ و⑧ انتبه إلى الفرق الدقيق عند لحظة الوصول: When you arrive (نشاط جارٍ: will be preparing) مقابل By the time you arrive دون مدة (اكتمال: will have prepared) مقابل By the time you arrive + for three hours (مدة: will have been working).
          </MixedBidi>
        </p>
      </Callout40>

      <div className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
            ورشة التدريب الثاني: أكمل الفراغ بالصيغة المناسبة (①–⑧)
          </h3>
          <Chip40
            label={`تمت الكتابة: ${FILL20_ITEMS_40.filter((i) => Boolean(inputs[i.n]?.trim())).length}/${FILL20_ITEMS_40.length}`}
            tone="teal"
          />
        </div>

        <div className="space-y-3">
          {FILL20_ITEMS_40.map((item) => {
            const raw = inputs[item.n] ?? "";
            const norm = normalizeEnglishInput40(raw);
            const isMatch = item.accepted.some((acc) => normalizeEnglishInput40(acc) === norm);
            const showFeedback = Boolean(checked[item.n] && raw.trim());

            return (
              <div key={item.n} className="rounded-xl border border-[#d5d0c3] bg-[#fffdf8] p-4 space-y-2.5">
                <label
                  htmlFor={`fill20-${item.n}`}
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className="block font-mono text-sm sm:text-base font-bold text-[#17354a]"
                >
                  <EnBidi>{item.prompt}</EnBidi>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    id={`fill20-${item.n}`}
                    type="text"
                    dir="ltr"
                    lang="en"
                    value={raw}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [item.n]: e.target.value }))}
                    placeholder="اكتب صيغة الفعل بالإنجليزية..."
                    className="flex-1 min-w-[220px] rounded-xl border border-[#b9c8c0] bg-[#ffffff] px-3.5 py-2 font-mono text-sm font-bold text-[#17354a]"
                  />
                  <button
                    type="button"
                    onClick={() => setChecked((prev) => ({ ...prev, [item.n]: true }))}
                    className="rounded-xl bg-[#17354a] px-4 py-2 text-xs font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
                  >
                    تحقّق
                  </button>
                </div>
                {showFeedback ? (
                  <p
                    className={`rounded-lg border px-3 py-2 text-xs sm:text-sm font-bold ${
                      isMatch
                        ? "border-[#8fb69a] bg-[#edf5ee] text-[#28533b]"
                        : "border-[#cf7d73] bg-[#fbefed] text-[#8d3832]"
                    }`}
                  >
                    <MixedBidi>
                      {isMatch
                        ? `✅ إجابة صحيحة (${item.answer}) — ${item.why}`
                        : `💡 الصيغة النموذجية: ${item.answer} — ${item.why}`}
                    </MixedBidi>
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <RevealPanel40
        id="s20-solutions"
        label="الحلول المفصلة المصدرية للتدريب الثاني (§20)"
        open={revealed}
        canOpen={allAttempted || revealed}
        lockedReason="أكمل كتابة محاولاتك في البنود الثمانية ①–⑧ لفتح الحلول المفصلة."
        onToggle={onReveal}
      />
    </div>
  );
}

/** §21 — Grammar Detective: التحدي الشامل من 10 جمل (Experience I). */
export function Detective21Lab40({
  revealed,
  onReveal,
}: {
  revealed: boolean;
  onReveal: () => void;
}) {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const allAttempted = DETECTIVE21_ITEMS_40.every((item) => Boolean(inputs[item.n]?.trim()));

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              مختبر المحقق النحوي الشامل (Grammar Detective — 10 جمل)
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              اكتشف الخطأ في كل جملة واكتب التصحيح الكامل، ثم تحقّق لمعرفة السبب النحوي الدقيق.
            </p>
          </div>
          <Chip40
            label={`تمت المحاولة: ${DETECTIVE21_ITEMS_40.filter((i) => Boolean(inputs[i.n]?.trim())).length}/${DETECTIVE21_ITEMS_40.length}`}
            tone="coral"
          />
        </div>

        <div className="space-y-3">
          {DETECTIVE21_ITEMS_40.map((item) => {
            const raw = inputs[item.n] ?? "";
            const norm = normalizeEnglishInput40(raw);
            const variants = item.answer.split("/").map((v) => normalizeEnglishInput40(v));
            const isMatch = variants.some((v) => norm === v || (norm.length >= 8 && v.includes(norm)));
            const showFeedback = Boolean(checked[item.n] && raw.trim());

            return (
              <div key={item.n} className="rounded-xl border border-[#d5d0c3] bg-[#fffdf8] p-4 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#8d3832]">{`الجملة الخاطئة #${item.n}`}</span>
                </div>
                <div
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className="rounded-lg border border-[#cf7d73] bg-[#fbefed] px-3.5 py-2 font-mono text-sm font-bold text-[#8d3832]"
                >
                  <EnBidi>{`${item.n}. ${item.prompt} ❌`}</EnBidi>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    id={`det21-${item.n}`}
                    aria-label={`تصحيح الجملة ${item.n}`}
                    type="text"
                    dir="ltr"
                    lang="en"
                    value={raw}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [item.n]: e.target.value }))}
                    placeholder="اكتب الجملة الصحيحة هنا..."
                    className="flex-1 min-w-[240px] rounded-xl border border-[#b9c8c0] bg-[#ffffff] px-3.5 py-2 font-mono text-sm font-bold text-[#17354a]"
                  />
                  <button
                    type="button"
                    onClick={() => setChecked((prev) => ({ ...prev, [item.n]: true }))}
                    className="rounded-xl bg-[#17354a] px-4 py-2 text-xs font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
                  >
                    فحص التصحيح
                  </button>
                </div>

                {showFeedback ? (
                  <div
                    className={`rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm font-bold space-y-1 ${
                      isMatch
                        ? "border-[#8fb69a] bg-[#edf5ee] text-[#28533b]"
                        : "border-[#d4b475] bg-[#fbf6eb] text-[#76531e]"
                    }`}
                  >
                    <div
                      dir="ltr"
                      lang="en"
                      style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                      className="font-mono font-bold text-[#28533b]"
                    >
                      <EnBidi>{`✅ ${item.answer}`}</EnBidi>
                    </div>
                    <p>
                      <MixedBidi>{`السبب النحوي: ${item.why}`}</MixedBidi>
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <RevealPanel40
        id="s21-solutions"
        label="الحلول المصدرية لـ Grammar Detective (§21)"
        open={revealed}
        canOpen={allAttempted || revealed}
        lockedReason="حاول تصحيح الجمل العشر ①–⑩ أولًا لفتح الحلول المصدرية."
        onToggle={onReveal}
      />
    </div>
  );
}

/** §22 — تحدي IQ200: متى تكون أكثر من إجابة صحيحة؟ */
export function Iq22MultiAnswerLab40() {
  return (
    <ChoiceMiniLab40
      title="مختبر تعدد الإجابات الصحيحة (§22 — IQ200)"
      subtitle="متى يسمح السياق بأكثر من صيغة مستقبلية صحيحة؟"
      items={IQ22_ITEMS_40}
    />
  );
}

/** §23 — Reading Challenge: Building the Future Learning Centre (Experience H). */
export function Reading23Lab40({
  revealed,
  onReveal,
}: {
  revealed: boolean;
  onReveal: () => void;
}) {
  const [stationIdx, setStationIdx] = useState<number>(0);
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const allAttempted = READING23_QUESTIONS_40.every((_, idx) => Boolean(inputs[idx]?.trim()));
  const currentStation = READING23_STATIONS_40[stationIdx] ?? READING23_STATIONS_40[0];

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              مستكشف محطات القصة: Building the Future Learning Centre
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              تنقّل بين المحطات الست داخل القصة لترى كيف اجتمعت صيغ المستقبل في مشروع المركز التعليمي.
            </p>
          </div>
          <Chip40 label="6 محطات زمنية في النص" tone="teal" />
        </div>

        <div className="flex flex-wrap gap-2">
          {READING23_STATIONS_40.map((st, idx) => {
            const active = idx === stationIdx;
            return (
              <button
                key={st.id}
                type="button"
                aria-pressed={active}
                onClick={() => setStationIdx(idx)}
                className={`rounded-xl border px-3 py-2 text-xs font-extrabold transition cursor-pointer ${
                  active
                    ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                    : "border-[#c7c2b4] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
                }`}
              >
                <MixedBidi>{st.label}</MixedBidi>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-extrabold text-[#17354a]">
              <MixedBidi>{currentStation.label}</MixedBidi>
            </span>
            <Chip40 label={currentStation.tense} tone="emerald" />
          </div>
          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="rounded-lg border border-[#8fb69a] bg-[#edf5ee] px-3.5 py-2.5 font-mono text-sm font-bold text-[#28533b]"
          >
            <EnBidi>{currentStation.quote}</EnBidi>
          </div>
          <p className="text-sm font-semibold text-[#24343b]">
            <MixedBidi>{currentStation.meaning}</MixedBidi>
          </p>
        </div>
      </div>

      {/* أسئلة الفهم الثمانية */}
      <div className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
            ورشة أسئلة الفهم الثمانية (①–⑧)
          </h3>
          <Chip40
            label={`تمت الإجابة: ${READING23_QUESTIONS_40.filter((_, idx) => Boolean(inputs[idx]?.trim())).length}/${READING23_QUESTIONS_40.length}`}
            tone="teal"
          />
        </div>

        <div className="space-y-3">
          {READING23_QUESTIONS_40.map((q, idx) => {
            const raw = inputs[idx] ?? "";
            const showModel = Boolean(checked[idx] && raw.trim());
            return (
              <div key={idx} className="rounded-xl border border-[#d5d0c3] bg-[#fffdf8] p-4 space-y-2.5">
                <label
                  htmlFor={`read23-q-${idx}`}
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className="block font-mono text-sm sm:text-base font-bold text-[#17354a]"
                >
                  <EnBidi>{q}</EnBidi>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    id={`read23-q-${idx}`}
                    type="text"
                    dir="ltr"
                    lang="en"
                    value={raw}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [idx]: e.target.value }))}
                    placeholder="اكتب إجابتك من النص..."
                    className="flex-1 min-w-[240px] rounded-xl border border-[#b9c8c0] bg-[#ffffff] px-3.5 py-2 font-mono text-sm font-bold text-[#17354a]"
                  />
                  <button
                    type="button"
                    onClick={() => setChecked((prev) => ({ ...prev, [idx]: true }))}
                    className="rounded-xl bg-[#17354a] px-4 py-2 text-xs font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
                  >
                    قارن بإجابة المصدر
                  </button>
                </div>
                {showModel ? (
                  <div
                    dir="ltr"
                    lang="en"
                    style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                    className="rounded-lg border border-[#8fb69a] bg-[#edf5ee] px-3.5 py-2 font-mono text-xs sm:text-sm font-bold text-[#28533b]"
                  >
                    <EnBidi>{`Source Answer: ${READING23_ANSWERS_40[idx]}`}</EnBidi>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <RevealPanel40
        id="s23-solutions"
        label="الحلول المصدرية لأسئلة الفهم (§23)"
        open={revealed}
        canOpen={allAttempted || revealed}
        lockedReason="أجب عن الأسئلة الثمانية ①–⑧ أولًا لفتح الحلول المصدرية الكاملة."
        onToggle={onReveal}
      />
    </div>
  );
}

/** §24 — التحليل النحوي الكامل للقصة. */
export function StoryAnalysis24Lab40() {
  return (
    <div dir="rtl" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {STORY_ANALYSIS24_ITEMS_40.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-2">
            <div className="space-y-1">
              <div>
                <Chip40 label={item.tense} tone="teal" />
              </div>
              <p className="text-xs font-extrabold text-[#28533b]">
                <MixedBidi>{item.reason}</MixedBidi>
              </p>
            </div>
            <div
              dir="ltr"
              lang="en"
              style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
              className="rounded-lg border border-[#c7d3cb] bg-[#f7f8f5] px-3 py-2 font-mono text-sm font-bold text-[#17354a]"
            >
              <EnBidi>{item.sentence}</EnBidi>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              <MixedBidi>{item.detail}</MixedBidi>
            </p>
          </div>
        ))}
      </div>

      <ChoiceMiniLab40
        title="مختبر التحليل النحوي للقصة (§24)"
        items={STORY_ANALYSIS24_QUIZ_40}
      />
    </div>
  );
}

/** §27 — مهمة الإنتاج اللغوي الكبرى: Writing Mission (Experience J). */
export function WritingMission27Lab40() {
  const [draft, setDraft] = useState("");
  const [checkedCriteria, setCheckedCriteria] = useState<Record<number, boolean>>({});
  const [showModelInspect, setShowModelInspect] = useState(false);

  const sentences = draft
    .split(/[.?!]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const sentenceCount = sentences.length;
  const checkedCount = Object.values(checkedCriteria).filter(Boolean).length;

  return (
    <div dir="rtl" className="space-y-4">
      <Callout40 tone="teal" title="إرشاد شفاف حول تقييم مهمة الكتابة" badge="Writing Mission">
        <p>
          <MixedBidi>
            المطلوب كتابة فقرة من 15 إلى 18 جملة بعنوان My Future Learning Journey تستوفي الشروط العشرة أدناه. توفّر هذه الورشة عدّاد جمل إرشاديًا وقائمة مراجعة ذاتية وتحليلًا للنموذج الافتتاحي؛ ولا تدّعي تصحيحًا دلاليًا آليًا للفقرة الحرة.
          </MixedBidi>
        </p>
      </Callout40>

      <div className="rounded-2xl border border-[#c8c3b4] bg-[#f5f3ed] p-4 sm:p-5 space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Chip40
              label={`عدد الجمل الحالي: ${sentenceCount} (المطلوب 15–18 جملة)`}
              tone={sentenceCount >= 15 && sentenceCount <= 18 ? "emerald" : "amber"}
            />
            <Chip40 label={`الشروط المراجَعة ذاتيًا: ${checkedCount}/10`} tone="teal" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
            مساحة كتابة مسودتك: My Future Learning Journey
          </h3>
        </div>

        <textarea
          id="writing27-draft"
          aria-label="مسودة My Future Learning Journey"
          dir="ltr"
          lang="en"
          rows={8}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write your 15–18 sentences about 'My Future Learning Journey' here..."
          className="w-full rounded-xl border border-[#b9c8c0] bg-[#ffffff] p-4 font-mono text-sm sm:text-base font-semibold text-[#17354a] leading-[1.8]"
        />

        <div className="space-y-2">
          <h4 className="text-sm font-extrabold text-[#17354a]">
            قائمة المراجعة الذاتية للشروط العشرة (تأكّد من تضمينها في فقرتك):
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {WRITING27_CRITERIA_40.map((criterion, idx) => {
              const active = Boolean(checkedCriteria[idx]);
              return (
                <button
                  key={idx}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCheckedCriteria((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                  className={`rounded-xl border px-3.5 py-2.5 text-right text-xs sm:text-sm font-bold transition cursor-pointer ${
                    active
                      ? "border-[#28533b] bg-[#edf5ee] text-[#28533b]"
                      : "border-[#d5d0c3] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
                  }`}
                >
                  <MixedBidi>{`${active ? "☑ " : "☐ "}${criterion}`}</MixedBidi>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-[#ded9cb] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-extrabold text-[#17354a]">
              تحليل النموذج الافتتاحي الإرشادي (6 جمل من المصدر)
            </span>
            <button
              type="button"
              aria-expanded={showModelInspect}
              onClick={() => setShowModelInspect((v) => !v)}
              className="rounded-xl bg-[#17354a] px-4 py-2 text-xs font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
            >
              {showModelInspect ? "إخفاء تحليل جمل النموذج" : "إظهار تحليل جمل النموذج الافتتاحي"}
            </button>
          </div>

          {showModelInspect ? (
            <div className="space-y-2">
              {WRITING27_MODEL_40.map((sentence, idx) => (
                <div key={idx} className="rounded-xl border border-[#d5d0c3] bg-[#fffdf8] p-3 space-y-1">
                  <div
                    dir="ltr"
                    lang="en"
                    style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                    className="font-mono text-xs sm:text-sm font-bold text-[#17354a]"
                  >
                    <EnBidi>{sentence}</EnBidi>
                  </div>
                  <p className="text-xs font-bold text-[#245f62]">
                    <MixedBidi>{WRITING27_MODEL_FORMS_40[idx]}</MixedBidi>
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** §28 — الملخص الذهبي النهائي لمنظومة المستقبل. */
export function GoldenSummary28Lab40() {
  return (
    <div dir="rtl" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {GOLDEN_SUMMARY28_CARDS_40.map((card) => (
          <div key={card.id} className="rounded-2xl border border-[#c8c3b4] bg-[#fffdf8] p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-extrabold text-[#17354a]">
                <MixedBidi>{`${card.order} ${card.title}`}</MixedBidi>
              </span>
              <span
                dir="ltr"
                lang="en"
                style={{ direction: "ltr", unicodeBidi: "isolate" }}
                className="rounded-lg border border-[#c7d3cb] bg-[#f7f8f5] px-2.5 py-0.5 font-mono text-xs font-bold text-[#245f62]"
              >
                <EnBidi>{card.formula}</EnBidi>
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#24343b]">
              <MixedBidi>{`الاستخدام: ${card.uses}`}</MixedBidi>
            </p>
            <div
              dir="ltr"
              lang="en"
              style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
              className="rounded-lg border border-[#8fb69a] bg-[#edf5ee] px-3 py-1.5 font-mono text-xs sm:text-sm font-bold text-[#28533b]"
            >
              <EnBidi>{card.example}</EnBidi>
            </div>
          </div>
        ))}
      </div>

      <ChoiceMiniLab40
        title="تثبيت الملخص الذهبي والقاعدة الذهبية الكبرى (§28)"
        items={GOLDEN_SUMMARY28_QUIZ_40}
      />
    </div>
  );
}

/** §29 — خريطة تقدم المنهج بعد الدرس 40 + المحطة القادمة المخططة (الدرس 41). */
export function CurriculumRoadmap29Lab40() {
  const [activeSystem, setActiveSystem] = useState<string>("future");
  const system =
    CURRICULUM_SYSTEMS_40.find((s) => s.id === activeSystem) ?? CURRICULUM_SYSTEMS_40[2];

  return (
    <div dir="rtl" className="space-y-4">
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              خريطة المنهج المكتملة (15 محطة عبر 3 منظومات زمنية)
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#43575a]">
              استعرض منظومة الحاضر (①–④)، ومنظومة الماضي (⑤–⑧)، ومنظومة المستقبل المكتملة (⑨–⑮).
            </p>
          </div>
          <Chip40 label="الدرس 40 مكتمل ✅" tone="emerald" />
        </div>

        <div className="flex flex-wrap gap-2">
          {CURRICULUM_SYSTEMS_40.map((sys) => {
            const active = sys.id === system.id;
            return (
              <button
                key={sys.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveSystem(sys.id)}
                className={`rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                  active
                    ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                    : "border-[#c7c2b4] bg-[#fffdf8] text-[#24343b] hover:border-[#245f62]"
                }`}
              >
                <MixedBidi>{`${sys.title} — ${sys.en}`}</MixedBidi>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {system.stations.map((st) => (
            <div key={st.num} className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-3.5 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-extrabold text-[#17354a]">
                  <MixedBidi>{`${st.num} ${st.name} ✅`}</MixedBidi>
                </span>
                {"lesson" in st ? (
                  <Chip40 label={`الدرس ${st.lesson}`} tone="teal" />
                ) : null}
              </div>
              <div
                dir="ltr"
                lang="en"
                style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                className="font-mono text-xs font-bold text-[#245f62]"
              >
                <EnBidi>{st.pattern}</EnBidi>
              </div>
              <p className="text-xs font-semibold text-[#43575a]">
                <MixedBidi>{st.note}</MixedBidi>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* المحطة القادمة المخططة — الدرس 41 (بطاقة معلوماتية فقط دون رابط) */}
      <div
        data-next-lesson-status={NEXT_LESSON_40.status}
        className="rounded-2xl border border-[#d4b475] bg-[#fbf6eb] p-4 sm:p-5 space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-extrabold text-[#76531e]">
            <MixedBidi>{`المحطة القادمة في خطة المنهج: ${NEXT_LESSON_40.label}`}</MixedBidi>
          </h3>
          <Chip40 label="مخطَّط في المنهج — غير منفَّذ بعد" tone="amber" />
        </div>
        <p className="text-xs sm:text-sm font-semibold text-[#24343b]">
          <MixedBidi>{NEXT_LESSON_40.note}</MixedBidi>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="rounded-lg border border-[#d4b475] bg-[#fffdf8] px-3 py-2 font-mono text-xs sm:text-sm font-bold text-[#17354a]"
          >
            <EnBidi>{`Primary Auxiliaries: ${NEXT_LESSON_40.primaryAuxiliaries}`}</EnBidi>
          </div>
          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="rounded-lg border border-[#d4b475] bg-[#fffdf8] px-3 py-2 font-mono text-xs sm:text-sm font-bold text-[#17354a]"
          >
            <EnBidi>{`Modal Auxiliaries: ${NEXT_LESSON_40.modalAuxiliaries}`}</EnBidi>
          </div>
        </div>
      </div>
    </div>
  );
}
