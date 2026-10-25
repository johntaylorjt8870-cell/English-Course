// ============================================================
// Lesson 36 — typed content model
//
// Every teaching block references the verbatim source ledger by
// (section, unit index). The renderer resolves the text at runtime,
// so a block can never drift from the supplied lesson, and the
// coverage audit can prove that each source unit appears exactly
// once, in source order, somewhere in the rebuilt experience.
// ============================================================

import { sourceSection36 } from "./ledger36";

export type Ref = {
  /** Source section id: `cover` or `s01`…`s26`. */
  s: string;
  /** Unit index inside that section. */
  i: number;
  /** True when the unit comes from the section's answer/analysis key. */
  r?: true;
};

export type Tone = "note" | "tip" | "warn" | "success" | "neutral";

export type ExampleItem = { en: Ref; ar?: Ref };

export type DialogueLine = { en: Ref; ar?: Ref };

export type FormulaRow = { label: Ref; formula?: Ref; examples: Ref[] };

export type FormCard = {
  form: "will" | "going";
  title: Ref;
  rows: FormulaRow[];
};

export type VerdictItem = { ok: boolean; line: Ref };

export type SituationItem = {
  label: Ref;
  context: Ref;
  cue?: Ref;
  en: Ref;
  ar?: Ref;
  note?: Ref;
};

export type AnalysisItem = { en: Ref; ar?: Ref };

/** One interactive item in a "choose the form" laboratory. */
export type ContextItem = {
  label?: Ref;
  /** Situation lines (Arabic briefing or English dialogue). */
  context: Ref[];
  /** Sentence that carries the target form. */
  sentence?: Ref;
  ar?: Ref;
  /** Source explanation, revealed after the attempt. */
  note?: Ref;
  /** Optional extra source nuance. */
  nuance?: Ref;
  choices: ContextChoice[];
  answer: string;
};

/** One item in the "decision now vs prior plan" laboratory. */
export type DecisionItem = {
  label?: Ref;
  lines: Ref[];
  cue?: Ref;
  form?: Ref;
  answer: "now" | "plan";
  note: Ref;
};

export type ContextChoice = { value: string; label: string };

export type DetectiveItem = {
  n: number;
  prompt: Ref;
  answerRefs: Ref[];
  accepted: string[];
};

export type ChooseItem = {
  n: number;
  prompt: Ref[];
  answer: Ref;
  key: string;
};

export type BlankItem = {
  n: number;
  line: Ref;
  accepted: string[];
  answerRef: Ref;
  explanation: Ref[];
};

export type ModelContext = {
  cue: Ref;
  sentence: Ref;
  task: Ref;
  models: Ref[];
};

export type Lab =
  | {
      kind: "context";
      id: string;
      prompt: string;
      items: ContextItem[];
      requireReason?: boolean;
    }
  | {
      kind: "decision";
      id: string;
      prompt: string;
      items: DecisionItem[];
    }
  | {
      kind: "lens";
      id: string;
      evidence: { sentence: Ref; ar?: Ref; why: Ref };
      general: { sentence: Ref; cue: Ref; ar?: Ref; why: Ref };
      check: { question: string; options: { value: string; label: string }[]; answer: string; feedback: string };
    }
  | { kind: "detective"; id: string; heading: Ref; items: DetectiveItem[] }
  | { kind: "choose"; id: string; items: ChooseItem[] }
  | { kind: "dialogueFill"; id: string; intro: Ref; lines: Ref[]; blanks: BlankItem[]; heading: Ref }
  | { kind: "contextWriting"; id: string; models: ModelContext[] }
  | {
      kind: "reading";
      id: string;
      questions: Ref[];
      answers: Ref;
      answerLines: Ref[];
      analysisHeading: Ref;
      analysis: Ref[];
    }
  | {
      kind: "writing";
      id: string;
      title: Ref;
      task: Ref;
      intro: Ref;
      criteria: Ref[];
      modelHeading: Ref;
      modelLines: Ref[];
      closing: Ref;
    };

export type Block =
  | { kind: "hero"; title: Ref; subtitle: Ref; level: Ref; lines: Ref[] }
  | { kind: "prose"; lines: Ref[] }
  | { kind: "subhead"; line: Ref }
  | { kind: "cue"; line: Ref }
  | { kind: "objectives"; lead: Ref; items: Ref[] }
  | { kind: "examples"; items: ExampleItem[] }
  | { kind: "situations"; items: SituationItem[] }
  | { kind: "dialogue"; lines: DialogueLine[]; translateHeading?: Ref }
  | { kind: "translations"; heading: Ref; lines: Ref[] }
  | { kind: "formulas"; cards: FormCard[] }
  | { kind: "table"; caption: string; rows: readonly (readonly [string, string])[] }
  | { kind: "callout"; tone: Tone; title?: string; lines: Ref[] }
  | { kind: "checklist"; items: Ref[] }
  | { kind: "chips"; lead?: Ref; items: Ref[] }
  | { kind: "verdicts"; items: VerdictItem[] }
  | { kind: "analysis"; heading: Ref; items: AnalysisItem[] }
  | { kind: "map"; groups: { heading: Ref; items: Ref[]; tone: "present" | "past" | "future" }[] }
  | { kind: "passage"; title: Ref; lines: Ref[] }
  | { kind: "launch"; tone: "test" | "solutions" | "teacher"; title: string; body: string; actionLabel: string; sourceLabel?: Ref }
  | {
      kind: "summary";
      form: "will" | "going";
      title: Ref;
      formulaLabel: Ref;
      formula: Ref;
      usesLabel: Ref;
      uses: Ref[];
      exampleLabel: Ref;
      examples: Ref[];
    }
  | { kind: "lab"; lab: Lab };

export type Slide36 = {
  id: string;
  stage: string;
  title: string;
  subtitle: string;
  sections: string[];
  blocks: Block[];
};

const cache = new Map<string, string>();

function source(id: string) {
  const section = sourceSection36(id);
  if (!section) throw new Error(`Lesson 36 content references an unknown section: ${id}`);
  return section;
}

/** Verbatim teaching unit. */
export function U(id: string, index: number): Ref {
  const unit = source(id).units[index];
  if (typeof unit !== "string") throw new Error(`Lesson 36 content references a missing unit: ${id}[${index}]`);
  return { s: id, i: index };
}

/** Verbatim unit from the section's answer/analysis key. */
export function K(id: string, index: number): Ref {
  const unit = source(id).revealUnits?.[index];
  if (typeof unit !== "string") throw new Error(`Lesson 36 content references a missing key unit: ${id}[${index}]`);
  return { s: id, i: index, r: true };
}

/** Resolve a reference to its exact source text. */
export function textOf(ref: Ref): string {
  const key = `${ref.s}:${ref.i}:${ref.r ? "r" : "u"}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  const section = source(ref.s);
  const value = ref.r ? section.revealUnits?.[ref.i] : section.units[ref.i];
  if (typeof value !== "string") throw new Error(`Lesson 36 cannot resolve ${key}`);
  cache.set(key, value);
  return value;
}

export function refsOfBlock(block: Block): Ref[] {
  switch (block.kind) {
    case "hero":
      return [block.title, block.subtitle, block.level, ...block.lines];
    case "prose":
      return block.lines;
    case "subhead":
    case "cue":
      return [block.line];
    case "objectives":
      return [block.lead, ...block.items];
    case "examples":
      return block.items.flatMap((item) => (item.ar ? [item.en, item.ar] : [item.en]));
    case "situations":
      return block.items.flatMap((item) =>
        [item.label, item.context, ...(item.cue ? [item.cue] : []), item.en, ...(item.ar ? [item.ar] : []), ...(item.note ? [item.note] : [])],
      );
    case "dialogue":
      // Source order lists the English turns, then their Arabic translations;
      // the card renders each translation under its turn without changing the
      // source sequence.
      return [...block.lines.map((line) => line.en), ...block.lines.flatMap((line) => (line.ar ? [line.ar] : []))];
    case "translations":
      return [block.heading, ...block.lines];
    case "formulas":
      return block.cards.flatMap((card) => [card.title, ...card.rows.flatMap((row) => [row.label, ...(row.formula ? [row.formula] : []), ...row.examples])]);
    case "table":
      return [];
    case "callout":
      return block.lines;
    case "checklist":
      return block.items;
    case "chips":
      return [...(block.lead ? [block.lead] : []), ...block.items];
    case "verdicts":
      return block.items.map((item) => item.line);
    case "analysis":
      return [block.heading, ...block.items.flatMap((item) => (item.ar ? [item.en, item.ar] : [item.en]))];
    case "map":
      return block.groups.flatMap((group) => [group.heading, ...group.items]);
    case "passage":
      return [block.title, ...block.lines];
    case "launch":
      return block.sourceLabel ? [block.sourceLabel] : [];
    case "summary":
      return [block.title, block.formulaLabel, block.formula, block.usesLabel, ...block.uses, block.exampleLabel, ...block.examples];
    case "lab":
      return refsOfLab(block.lab);
  }
}

function refsOfLab(lab: Lab): Ref[] {
  switch (lab.kind) {
    case "context":
      return lab.items.flatMap((item) =>
        // Items stay in source order even when a cue precedes its sentence.
        sortRefs([
          ...(item.label ? [item.label] : []),
          ...item.context,
          ...(item.sentence ? [item.sentence] : []),
          ...(item.ar ? [item.ar] : []),
          ...(item.note ? [item.note] : []),
          ...(item.nuance ? [item.nuance] : []),
        ]),
      );
    case "decision":
      return lab.items.flatMap((item) =>
        sortRefs([
          ...(item.label ? [item.label] : []),
          ...item.lines,
          ...(item.cue ? [item.cue] : []),
          ...(item.form ? [item.form] : []),
          item.note,
        ]),
      );
    case "lens":
      return [lab.evidence.sentence, ...(lab.evidence.ar ? [lab.evidence.ar] : []), lab.evidence.why, lab.general.cue, lab.general.sentence, ...(lab.general.ar ? [lab.general.ar] : []), lab.general.why];
    case "detective":
      return [lab.heading, ...lab.items.flatMap((item) => [item.prompt, ...item.answerRefs])];
    case "choose":
      return [lab.heading, ...lab.items.flatMap((item) => [...item.prompt, item.answer])];
    case "dialogueFill":
      return [lab.intro, ...lab.lines, lab.heading, ...lab.blanks.flatMap((blank) => [blank.answerRef, ...blank.explanation])];
    case "contextWriting":
      return lab.models.flatMap((model) => [model.cue, model.sentence, model.task, ...model.models]);
    case "reading":
      return [...lab.questions, lab.answers, ...lab.answerLines, lab.analysisHeading, ...lab.analysis];
    case "writing":
      return [lab.title, lab.task, lab.intro, ...lab.criteria, lab.modelHeading, ...lab.modelLines, lab.closing];
  }
}

function sortRefs(refs: Ref[]): Ref[] {
  return [...refs].sort((a, b) => (a.s === b.s ? a.i - b.i : 0));
}

export function refsOfSlide(slide: Slide36): Ref[] {
  return slide.blocks.flatMap(refsOfBlock);
}

/** Slide metadata, kept React-free so audits can import it directly. */
export type SlideSpec36 = Omit<Slide36, "blocks">;

export const slide = (id: string, stage: string, title: string, subtitle: string, sections: string[]): SlideSpec36 => ({
  id,
  stage,
  title,
  subtitle,
  sections,
});
