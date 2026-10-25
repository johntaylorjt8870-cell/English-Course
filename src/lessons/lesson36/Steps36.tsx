// ============================================================
// Lesson 36 — slide renderer
// ============================================================

import {
  ActionButton36,
  Callout36,
  Card36,
  Chip36,
  CompareTable36,
  Cue36,
  Dialogue36,
  En36,
  ExampleCard36,
  FormBadge36,
  Formulas36,
  MixedText36,
  Prose36,
  SourceText36,
  StepHead36,
  Translations36,
} from "./kit36";
import { textOf, type Block, type Ref, type Slide36 } from "./content36";
import { LESSON_TITLE_36, STEP_COUNT_36, stageOf36 } from "./deck36";
import {
  ChooseLab36,
  ContextLab36,
  ContextWritingLab36,
  DecisionLab36,
  DetectiveLab36,
  DialogueFillLab36,
  LensLab36,
  Passage36,
  ReadingLab36,
  WritingLab36,
} from "./labs36";

export default function StepView36({
  slide,
  index,
  onGoTest,
  onGoSolutions,
}: {
  slide: Slide36;
  index: number;
  onGoTest: () => void;
  onGoSolutions: () => void;
}) {
  const stage = stageOf36(slide.id);
  return (
    <div data-step-id={slide.id} data-step-index={index + 1} className="space-y-4">
      <StepHead36
        stage={{ icon: stage.icon, label: stage.label }}
        step={index + 1}
        total={STEP_COUNT_36}
        title={slide.id === "cover" ? undefined : slide.title}
        subtitle={slide.id === "cover" ? undefined : slide.subtitle}
      />
      {slide.blocks.map((block, blockIndex) => (
        <div key={`${slide.id}-${blockIndex}`} className="pop" style={{ animationDelay: `${Math.min(blockIndex, 5) * 40}ms` }}>
          <BlockView block={block} onGoTest={onGoTest} onGoSolutions={onGoSolutions} />
        </div>
      ))}
    </div>
  );
}

function BlockView({ block, onGoTest, onGoSolutions }: { block: Block; onGoTest: () => void; onGoSolutions: () => void }) {
  switch (block.kind) {
    case "hero":
      return <Hero36 title={block.title} subtitle={block.subtitle} level={block.level} />;
    case "prose":
      return <Prose36 lines={block.lines} />;
    case "subhead":
      return <Subhead36 line={block.line} />;
    case "cue":
      return <Cue36 line={block.line} />;
    case "objectives":
      return <Objectives36 lead={block.lead} items={block.items} />;
    case "examples":
      return (
        <div className="grid gap-2">
          {block.items.map((item) => (
            <ExampleCard36 key={`${item.en.s}-${item.en.i}`} en={item.en} ar={item.ar} />
          ))}
        </div>
      );
    case "situations":
      return (
        <div className="grid gap-3">
          {block.items.map((item) => (
            <Card36 key={`${item.label.s}-${item.label.i}`} tone="warm" title={<SourceText36 value={item.label} />}>
              <p className="text-slate-700">
                <SourceText36 value={item.context} />
              </p>
              {item.cue ? (
                <p className="mt-2 text-xs font-bold text-slate-500">
                  <SourceText36 value={item.cue} />
                </p>
              ) : null}
              <p className="mt-1 rounded-xl bg-slate-900 px-3 py-2 text-base font-bold text-white sm:text-lg">
                <SourceText36 value={item.en} />
              </p>
              {item.ar ? (
                <p className="mt-1 text-sm text-slate-500">
                  <SourceText36 value={item.ar} />
                </p>
              ) : null}
              {item.note ? (
                <p className="mt-2 text-sm font-bold text-emerald-800">
                  <SourceText36 value={item.note} />
                </p>
              ) : null}
            </Card36>
          ))}
        </div>
      );
    case "dialogue":
      return <Dialogue36 lines={block.lines} />;
    case "translations":
      return <Translations36 heading={block.heading} lines={block.lines} />;
    case "formulas":
      return <Formulas36 cards={block.cards} />;
    case "table":
      return <CompareTable36 caption={block.caption} rows={block.rows} />;
    case "callout":
      return (
        <Callout36 tone={block.tone} title={block.title}>
          <div className="space-y-1">
            {block.lines.map((line) => (
              <p key={`${line.s}-${line.i}`}>
                <SourceText36 value={line} />
              </p>
            ))}
          </div>
        </Callout36>
      );
    case "checklist":
      return <Checklist36 items={block.items} />;
    case "chips":
      return (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3">
          {block.items.map((item, index) => (
            <Chip36 key={`${item.s}-${item.i}`} tone={index % 3 === 0 ? "will" : index % 3 === 1 ? "going" : "slate"}>
              <En36 className="text-sm">{textOf(item)}</En36>
            </Chip36>
          ))}
        </div>
      );
    case "verdicts":
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={`${item.line.s}-${item.line.i}`} className={`flex items-start gap-3 rounded-2xl border p-3 ${item.ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
              <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${item.ok ? "bg-emerald-600" : "bg-rose-600"}`} aria-hidden>
                {item.ok ? "✓" : "✕"}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">{item.ok ? "صحيحة" : "خطأ"}</p>
                <p className={`text-base font-bold ${item.ok ? "text-emerald-950" : "text-rose-950"}`}>
                  <SourceText36 value={item.line} />
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    case "analysis":
      return <Analysis36 heading={block.heading} items={block.items} />;
    case "map":
      return <Map36 groups={block.groups} />;
    case "passage":
      return <Passage36 title={block.title} lines={block.lines} />;
    case "summary":
      return <Summary36 block={block} />;
    case "launch":
      return (
        <Card36 tone={block.tone === "test" ? "will" : block.tone === "solutions" ? "evidence" : "warm"} title={block.title}>
          <p className="text-slate-700">{block.body}</p>
          <ActionButton36 className="mt-2" onClick={block.tone === "test" ? onGoTest : onGoSolutions}>
            {block.sourceLabel ? <SourceText36 value={block.sourceLabel} /> : block.actionLabel}
          </ActionButton36>
        </Card36>
      );
    case "lab":
      switch (block.lab.kind) {
        case "context":
          return <ContextLab36 id={block.lab.id} prompt={block.lab.prompt} items={block.lab.items} requireReason={block.lab.requireReason} />;
        case "decision":
          return <DecisionLab36 id={block.lab.id} prompt={block.lab.prompt} items={block.lab.items} />;
        case "lens":
          return <LensLab36 id={block.lab.id} evidence={block.lab.evidence} general={block.lab.general} check={block.lab.check} />;
        case "detective":
          return <DetectiveLab36 id={block.lab.id} heading={block.lab.heading} items={block.lab.items} />;
        case "choose":
          return <ChooseLab36 id={block.lab.id} heading={block.lab.heading} items={block.lab.items} />;
        case "dialogueFill":
          return <DialogueFillLab36 id={block.lab.id} intro={block.lab.intro} heading={block.lab.heading} lines={block.lab.lines} blanks={block.lab.blanks} />;
        case "contextWriting":
          return <ContextWritingLab36 id={block.lab.id} models={block.lab.models} />;
        case "reading":
          return (
            <ReadingLab36
              id={block.lab.id}
              questions={block.lab.questions}
              answers={block.lab.answers}
              answerLines={block.lab.answerLines}
              analysisHeading={block.lab.analysisHeading}
              analysis={block.lab.analysis}
            />
          );
        case "writing":
          return (
            <WritingLab36
              title={block.lab.title}
              task={block.lab.task}
              intro={block.lab.intro}
              criteria={block.lab.criteria}
              modelHeading={block.lab.modelHeading}
              modelLines={block.lab.modelLines}
              closing={block.lab.closing}
            />
          );
      }
  }
}

function Hero36({ title, subtitle, level }: { title: Ref; subtitle: Ref; level: Ref }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] sm:p-9">
      <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-sky-100 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-orange-100 blur-3xl" aria-hidden />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">الدرس <span dir="ltr" className="font-en">36</span></span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-900">
            <SourceText36 value={level} />
          </span>
        </div>
        <h1 className="font-head mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
          <En36 className="font-head !inline text-left">{LESSON_TITLE_36}</En36>
        </h1>
        <p className="mt-2 text-lg font-bold text-slate-700 sm:text-xl">
          <SourceText36 value={title} />
        </p>
        <p className="mt-2 text-base leading-8 text-slate-600">
          <SourceText36 value={subtitle} />
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
          <FormBadge36 form="will" />
          <span className="text-sm font-black text-slate-400">vs</span>
          <FormBadge36 form="going" />
        </div>
        <p className="mt-4 text-center text-xs font-bold text-slate-600">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Subhead36({ line }: { line: Ref }) {
  return (
    <h3 className="font-head flex items-center gap-2 border-r-4 border-slate-900 pr-3 text-lg font-bold text-slate-900 sm:text-xl">
      <SourceText36 value={line} />
    </h3>
  );
}

function Objectives36({ lead, items }: { lead: Ref; items: Ref[] }) {
  return (
    <Card36 title={<SourceText36 value={lead} />} eyebrow="ما ستتقنه في هذا الدرس">
      <ol className="grid gap-2 sm:grid-cols-2">
        {items.map((item, index) => (
          <li key={`${item.s}-${item.i}`} className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-7 text-slate-700 shadow-sm">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-600 text-[11px] font-bold text-white" aria-hidden>
              {index + 1}
            </span>
            <span className="min-w-0">
              <SourceText36 value={item} />
            </span>
          </li>
        ))}
      </ol>
    </Card36>
  );
}

function Checklist36({ items }: { items: Ref[] }) {
  return (
    <ul className="grid gap-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2">
      {items.map((item) => (
        <li key={`${item.s}-${item.i}`} className="flex items-start gap-2 text-sm leading-7 text-slate-700">
          <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-slate-900 text-[9px] font-bold text-white" aria-hidden>
            ✓
          </span>
          <span>
            <SourceText36 value={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Analysis36({ heading, items }: { heading: Ref; items: { en: Ref; ar?: Ref }[] }) {
  return (
    <Card36 eyebrow="تحليل الاستخدام" title={<SourceText36 value={heading} />}>
      <ul className="grid gap-2">
        {items.map((item) => {
          const raw = textOf(item.en);
          const [quote, ...rest] = raw.split("→");
          const explanation = rest.join("→").trim();
          return (
            <li key={`${item.en.s}-${item.en.i}`} className="flex flex-wrap items-start gap-2 rounded-2xl border border-slate-200 bg-white p-3">
              <span className="rounded-lg bg-slate-900 px-2 py-1 text-sm font-bold text-white">
                <En36 className="text-left">{quote.trim()}</En36>
              </span>
              {explanation ? (
                <>
                  {" "}
                  <span aria-hidden className="pt-1 text-sm font-black text-slate-400">→</span>
                  {" "}
                  <span className="min-w-0 flex-1 text-sm leading-7 text-slate-700">
                    <MixedText36 text={explanation} />
                  </span>
                </>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Card36>
  );
}

function Map36({ groups }: { groups: { heading: Ref; items: Ref[]; tone: "present" | "past" | "future" }[] }) {
  const tone = {
    present: ["border-sky-200 bg-sky-50", "text-sky-900"],
    past: ["border-amber-200 bg-amber-50", "text-amber-900"],
    future: ["border-emerald-200 bg-emerald-50", "text-emerald-900"],
  } as const;
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {groups.map((group) => (
        <section key={`${group.heading.s}-${group.heading.i}`} className={`rounded-2xl border p-4 ${tone[group.tone][0]}`}>
          <h3 className={`text-sm font-black ${tone[group.tone][1]}`}>
            <SourceText36 value={group.heading} />
          </h3>
          <ul className="mt-2 space-y-1.5">
            {group.items.map((item) => (
              <li key={`${item.s}-${item.i}`} className="text-sm leading-7 text-slate-700">
                <SourceText36 value={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Summary36({ block }: { block: Extract<Block, { kind: "summary" }> }) {
  return (
    <Card36 tone={block.form === "will" ? "will" : "going"} title={<SourceText36 value={block.title} />} eyebrow="الملخص الذهبي">
      <p className="text-xs font-black text-slate-500">
        <SourceText36 value={block.formulaLabel} />
      </p>
      <p className="mt-1 overflow-x-auto rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white">
        <En36 className="text-left tracking-wide">{textOf(block.formula)}</En36>
      </p>
      <p className="mt-3 text-xs font-black text-slate-500">
        <SourceText36 value={block.usesLabel} />
      </p>
      <ul className="mt-1 grid gap-1 sm:grid-cols-2">
        {block.uses.map((ref) => (
          <li key={`${ref.s}-${ref.i}`} className="rounded-xl bg-white px-2.5 py-1.5 text-sm text-slate-700">
            <SourceText36 value={ref} />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs font-black text-slate-500">
        <SourceText36 value={block.exampleLabel} />
      </p>
      <div className="mt-1 space-y-1">
        {block.examples.map((ref) => (
          <p key={`${ref.s}-${ref.i}`} className="text-base font-bold text-slate-900">
            <SourceText36 value={ref} />
          </p>
        ))}
      </div>
    </Card36>
  );
}
