import { useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { STEP_COUNT_39, stationOf39, type Slide39 } from "./data";
import {
  ActionButton39,
  Instrument39,
  RevealPanel39,
  SourceLine39,
  Table39,
} from "./kit39";
import {
  AnatomyDeck39,
  AspectDeck39,
  BriefingDeck39,
  BuildDeck39,
  CHOICE_DECKS_39,
  ChoiceDeck39,
  CurriculumDeck39,
  DialogueDeck39,
  DurationDeck39,
  FormulaDeck39,
  GateDeck39,
  LadderDeck39,
  PracticeDeck39,
  PronounsDeck39,
  ReadingDeck39,
  SorterDeck39,
  StativeDeck39,
  TeacherGate39,
  TimelineDeck39,
  WritingDeck39,
} from "./labs39";

// ============================================================
// خطوات الدرس 39 — خطوة واحدة، هدف واحد.
// ترتيب العرض: رأس المحطة ← أسطر الدرس ← الأداة التفاعلية ← مفتاح الحلول
// بعد المحاولة. لا تُعرض أي حلول قبل محاولة الطالب.
// ============================================================

const TONE_CLASS: Record<string, string> = {
  cyan: "obs-station--cyan",
  violet: "obs-station--violet",
  gold: "obs-station--gold",
  teal: "obs-station--teal",
  rose: "obs-station--rose",
};

function StepHeader39({ slide }: { slide: Slide39 }) {
  const station = stationOf39(slide.station);
  return (
    <header className="obs-step-head" data-step-header={slide.id}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`obs-station-chip ${TONE_CLASS[station.tone]}`}>
          <span aria-hidden>{station.icon}</span>
          <Rich text={station.title} />
          <span dir="ltr" className="font-en obs-station-en">
            {station.en}
          </span>
        </span>
        <span dir="ltr" className="obs-step-counter font-en">
          {String(slide.step).padStart(2, "0")} / {STEP_COUNT_39}
        </span>
        <span dir="ltr" className="obs-source-chip font-en">
          {slide.source.num == null ? "LESSON 39" : `§${slide.source.num}`}
        </span>
      </div>
      <h1 className="obs-step-title">
        <Rich text={slide.title} />
      </h1>
      <p className="obs-step-sub">
        <Rich text={slide.subtitle} />
      </p>
    </header>
  );
}

function SourceBlock39({ slide }: { slide: Slide39 }) {
  return (
    <section className="obs-source" data-source-section={slide.sourceId} aria-label="نص المصدر">
      <p className="obs-source-caption">
        <span className="obs-source-dot" aria-hidden /> نص المصدر
      </p>
      <div className="space-y-1.5">
        {slide.units.map((unitIndex) => (
          <SourceLine39
            key={unitIndex}
            sectionId={slide.sourceId}
            index={unitIndex}
            text={slide.source.units[unitIndex]}
          />
        ))}
      </div>
      {slide.table && slide.source.tableRows && slide.source.tableHeaders ? (
        <Table39
          headers={slide.source.tableHeaders}
          rows={slide.source.tableRows}
          label={slide.source.tableLabel ?? "جدول من المصدر"}
          idPrefix={slide.sourceId}
        />
      ) : null}
      {slide.extraTable && slide.source.extraTableRows && slide.source.extraTableHeaders ? (
        <Table39
          headers={slide.source.extraTableHeaders}
          rows={slide.source.extraTableRows}
          label={slide.source.extraTableLabel ?? "جدول إضافي"}
          idPrefix={`${slide.sourceId}-extra`}
        />
      ) : null}
    </section>
  );
}

function InstrumentView39({
  slide,
  onAttempt,
  onGoTest,
  onGoSolutions,
  onGoTeacher,
}: {
  slide: Slide39;
  onAttempt: () => void;
  onGoTest: () => void;
  onGoSolutions: () => void;
  onGoTeacher: () => void;
}): ReactNode {
  const key = slide.instrumentKey ?? "";
  switch (slide.instrument) {
    case "gate":
      return <GateDeck39 mode={key === "bridge" ? "bridge" : "new"} />;
    case "briefing":
      return <BriefingDeck39 />;
    case "timeline":
      return <TimelineDeck39 />;
    case "duration":
      return <DurationDeck39 caseKey={key} />;
    case "formula":
      return <FormulaDeck39 />;
    case "anatomy":
      return <AnatomyDeck39 />;
    case "pronouns":
      return <PronounsDeck39 />;
    case "sorter":
      return <SorterDeck39 />;
    case "build":
      return <BuildDeck39 kind={key} />;
    case "dialogue":
      return <DialogueDeck39 which={key === "marathon" ? "marathon" : "study-day"} />;
    case "aspect":
      return <AspectDeck39 mode={key} />;
    case "stative":
      return <StativeDeck39 />;
    case "practice":
      return <PracticeDeck39 kind={key} onAttempt={onAttempt} />;
    case "reading":
      return (
        <ReadingDeck39
          mode={key === "journey" ? "journey" : "questions"}
          onAttempt={onAttempt}
        />
      );
    case "writing":
      return <WritingDeck39 mode={key === "model" ? "model" : "brief"} />;
    case "ladder":
      return <LadderDeck39 />;
    case "curriculum":
      return <CurriculumDeck39 />;
    case "teacher-gate":
      return (
        <TeacherGate39 onGoTeacher={onGoTeacher} onGoSolutions={onGoSolutions} onGoTest={onGoTest} />
      );
    case "choice": {
      const deck = CHOICE_DECKS_39[key];
      if (!deck) return null;
      return (
        <ChoiceDeck39
          id={`choice-${key}`}
          title={deck.title}
          items={deck.items}
          onAttempt={onAttempt}
        />
      );
    }
    default:
      return null;
  }
}

export default function StepView39({
  slide,
  onGoTest,
  onGoSolutions,
  onGoTeacher,
}: {
  slide: Slide39;
  onGoTest: () => void;
  onGoSolutions: () => void;
  onGoTeacher: () => void;
}) {
  const [attempted, setAttempted] = useState(false);
  const hasReveal = slide.reveal.length > 0;
  return (
    <article className="obs-step" data-step-id={slide.id} data-station={slide.station}>
      <StepHeader39 slide={slide} />
      <SourceBlock39 slide={slide} />
      {slide.instrument !== "none" ? (
        <div className="obs-instrument-slot">
          <InstrumentView39
            slide={slide}
            onAttempt={() => setAttempted(true)}
            onGoTest={onGoTest}
            onGoSolutions={onGoSolutions}
            onGoTeacher={onGoTeacher}
          />
        </div>
      ) : null}

      {hasReveal ? (
        attempted ? (
          <RevealPanel39 section={slide.source} indexes={slide.reveal} />
        ) : (
          <Instrument39
            id="reveal-gate"
            label="ANSWER GATE"
            title="حلول المصدر مقفلة حتى المحاولة"
            tone="gold"
            note="حاول في الأداة أعلاه أولًا؛ بعد التحقق تُفتح حلول المصدر تلقائيًا."
          >
            <p className="obs-nuance" aria-live="polite">
              لم تُعرض أي إجابة من مفتاح المصدر بعد.
            </p>
          </Instrument39>
        )
      ) : null}

      {slide.sourceId === "s35" ? (
        <div className="obs-cta">
          <div>
            <p className="obs-cta-title">الاختبار الرسمي: 25 سؤالًا · خمسة مستويات</p>
            <p className="obs-cta-sub">
              لا تظهر الدرجة ولا التصحيح ولا التفسيرات قبل التسليم النهائي.
            </p>
          </div>
          <ActionButton39 onClick={onGoTest}>ابدأ الاختبار النهائي</ActionButton39>
        </div>
      ) : null}

      {slide.sourceId === "s36" ? (
        <div className="obs-cta">
          <div>
            <p className="obs-cta-title">هذه المساحة للمعلم</p>
            <p className="obs-cta-sub">
              الحلول التفصيلية للاختبار تُفتح بدخول المعلم أو بعد تسليم الطالب.
            </p>
          </div>
          <ActionButton39 variant="secondary" onClick={onGoSolutions}>
            منطقة الحلول
          </ActionButton39>
        </div>
      ) : null}
    </article>
  );
}

/** تُستخدم في الاختبار:عنوان مستوى من المصدر بلا تكرار نص السؤال. */
export function LevelTitle39({ text }: { text: string }) {
  return (
    <h3 className="obs-panel-title">
      <En>{text}</En>
    </h3>
  );
}
