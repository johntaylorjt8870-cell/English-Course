import {
  LESSON_40_META,
  SLIDES_40,
  STATION_BY_ID_40,
  STEP_COUNT_40,
  type StepSlide40,
} from "./data";
import { Rich40, SourceBriefing40 } from "./kit40";
import { StepLabRenderer40 } from "./labs40";

export function StepView40({
  slide: slideProp,
  stepIndex,
  onSelectStep,
  onOpenTest,
  onOpenSolutions,
  onOpenTeacher,
  testSubmitted,
  teacherUnlocked,
}: {
  slide?: StepSlide40;
  stepIndex: number;
  onSelectStep: (idx: number) => void;
  onOpenTest: () => void;
  onOpenSolutions: () => void;
  onOpenTeacher: () => void;
  testSubmitted: boolean;
  teacherUnlocked: boolean;
}) {
  const slide = slideProp ?? SLIDES_40[stepIndex];
  const station = STATION_BY_ID_40[slide.station];

  return (
    <article
      className="tcc-step"
      data-step-id={slide.id}
      data-source-section={slide.sectionId}
    >
      {slide.id === "cover-01" ? (
        <section className="tcc-hero" aria-label="بطاقة تعريف الدرس 40">
          <div className="tcc-hero-grid">
            <div>
              <span className="tcc-hero-kicker">
                <span>⚡</span>
                <span>الدرس {LESSON_40_META.lessonNumber} · تأسيسي متقدم</span>
                <span>·</span>
                <span dir="ltr" className="font-en">IQ200</span>
              </span>
              <h2 dir="ltr" className="tcc-hero-en font-en text-left">
                {LESSON_40_META.titleEn} · {LESSON_40_META.subtitleEn}
              </h2>
              <p className="tcc-hero-ar">
                <Rich40 text={LESSON_40_META.titleAr} />
              </p>
              <p className="tcc-hero-sub">
                <Rich40
                  text={`${LESSON_40_META.themeAr} — ${LESSON_40_META.themeEn} · دمج الدروس 34–39 في منظومة قرار وتواصل واحدة.`}
                />
              </p>
            </div>

            <div className="tcc-channel-strip" aria-label="قنوات المستقبل الخمس">
              <div className="flex items-center justify-between tcc-channel-pill">
                <span>قرار لحظي · وعد · توقع</span>
                <span dir="ltr" className="font-en font-black text-red-900">
                  WILL
                </span>
              </div>
              <div className="flex items-center justify-between tcc-channel-pill">
                <span>خطة مسبقة · دليل حاضر</span>
                <span dir="ltr" className="font-en font-black text-blue-950">
                  BE GOING TO
                </span>
              </div>
              <div className="flex items-center justify-between tcc-channel-pill">
                <span>نشاط جارٍ في لحظة مستقبلية</span>
                <span dir="ltr" className="font-en font-black text-teal-950">
                  Future Continuous
                </span>
              </div>
              <div className="flex items-center justify-between tcc-channel-pill">
                <span>إنجاز مكتمل بحلول نقطة مرجعية</span>
                <span dir="ltr" className="font-en font-black text-amber-950">
                  Future Perfect
                </span>
              </div>
              <div className="flex items-center justify-between tcc-channel-pill">
                <span>مدة ممتدة حتى نقطة مستقبلية</span>
                <span dir="ltr" className="font-en font-black text-purple-950">
                  Future Perfect Continuous
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <header className="tcc-head">
        <div className="tcc-spectrum-bar" aria-hidden="true" />
        <div className="tcc-head-top">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tcc-station-tag">
              <Rich40 text={station.title} />
            </span>
            <span dir="ltr" className="tcc-coord font-en">
              CMD // {String(slide.stepNumber).padStart(2, "0")} / {STEP_COUNT_40}
            </span>
          </div>

          <div className="flex items-center gap-2 tcc-step-jump">
            <label htmlFor="lesson40-step-select">انتقال سريع:</label>
            <select
              id="lesson40-step-select"
              className="block tcc-step-select"
              value={stepIndex}
              onChange={(e) => onSelectStep(Number(e.target.value))}
            >
              {SLIDES_40.map((s, idx) => (
                <option key={s.id} value={idx}>
                  {s.stepNumber} — {s.rail}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h1 className="tcc-title">
          <Rich40 text={slide.title} />
        </h1>
        <p className="tcc-purpose">
          <Rich40 text={slide.purpose} />
        </p>
      </header>

      <SourceBriefing40
        section={slide.source}
        unitIndexes={slide.unitIndexes}
        includeTable={slide.includeTable}
      />

      <StepLabRenderer40
        key={slide.id}
        lab={slide.lab}
        onOpenTest={onOpenTest}
        onOpenSolutions={onOpenSolutions}
        onOpenTeacher={onOpenTeacher}
        testSubmitted={testSubmitted}
        teacherUnlocked={teacherUnlocked}
      />
    </article>
  );
}
