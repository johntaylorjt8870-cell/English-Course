import { Rich } from "../../shared/lessonKit";
import { SLIDES_35, SLIDE_COUNT_35, STAGES_35, type Step35 } from "./data";
import StageA35 from "./stepsA35";
import StageB35 from "./stepsB35";
import StageC35 from "./stepsC35";
import StageD35 from "./stepsD35";
import StageE35 from "./stepsE35";

export default function StepView35({
  slide,
  index,
  onGoTest,
  onGoSolutions,
}: {
  slide: Step35;
  index: number;
  onGoTest: () => void;
  onGoSolutions: () => void;
}) {
  const stage = STAGES_35.find((candidate) => candidate.id === slide.stage)!;
  const pct = Math.round(((index + 1) / SLIDE_COUNT_35) * 100);
  return (
    <div className="fg35-rise" data-step-id={slide.id} key={slide.id}>
      <header className="fg35-stephead">
        <div className="fg35-stephead__meta">
          <span className="fg35-pill fg35-pill--stage">
            <span aria-hidden>{stage.icon}</span>
            <Rich text={`المرحلة ${stage.id} · ${stage.ar}`} />
          </span>
          <span className="fg35-pill">
            <Rich text={`الخطوة ${index + 1} من ${SLIDE_COUNT_35}`} />
          </span>
        </div>
        <h2><Rich text={slide.title} /></h2>
        {slide.lead ? <p className="fg35-stephead__lead"><Rich text={slide.lead} /></p> : null}
        <div className="fg35-track" aria-label={`تقدم الدرس: ${pct}%`}>
          <div className="fg35-track__bar"><span style={{ width: `${pct}%` }} /></div>
          <span className="fg35-track__num" dir="ltr">{index + 1}/{SLIDE_COUNT_35}</span>
        </div>
      </header>

      {slide.stage === "A" ? <StageA35 id={slide.id} /> : null}
      {slide.stage === "B" ? <StageB35 id={slide.id} /> : null}
      {slide.stage === "C" ? <StageC35 id={slide.id} /> : null}
      {slide.stage === "D" ? <StageD35 id={slide.id} /> : null}
      {slide.stage === "E" ? <StageE35 id={slide.id} onGoTest={onGoTest} onGoSolutions={onGoSolutions} /> : null}
    </div>
  );
}

export { SLIDES_35 };
