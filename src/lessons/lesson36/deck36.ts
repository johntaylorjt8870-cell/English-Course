// ============================================================
// Lesson 36 — assembled deck and navigation stages
//
// The deck covers every supplied teaching unit exactly once and in
// source order. `deckCoverage36` is the machine-checkable proof used
// by the audit script and by the teacher coverage map.
// ============================================================

import { SOURCE_SECTIONS_36, sourceSection36 } from "./ledger36";
import { refsOfSlide, type Ref, type Slide36 } from "./content36";
import { DECK_A_36 } from "./deckA36";
import { DECK_B_36 } from "./deckB36";
import { DECK_C_36 } from "./deckC36";

export const LESSON_TITLE_36 = "WILL vs BE GOING TO";
export const LESSON_SUBTITLE_36 = "Mastering Future Decisions & Predictions";
export const LESSON_ARABIC_SUBTITLE_36 = "إتقان التعبير عن المستقبل — المقارنة الشاملة والتطبيق العملي";
export const LESSON_LEVEL_36 = "تأسيسي متقدم — IQ200";

export type Stage36 = {
  id: string;
  icon: string;
  label: string;
  en: string;
  stepIds: string[];
};

export const STAGES_36: Stage36[] = [
  { id: "start", icon: "🌟", label: "الانطلاق", en: "Opening", stepIds: ["cover", "s01"] },
  { id: "golden", icon: "🧠", label: "السؤال الذهبي والخريطة", en: "The golden question", stepIds: ["s02a", "s02b", "s03"] },
  { id: "decision", icon: "⚡", label: "القرار مقابل الخطة", en: "Decision vs plan", stepIds: ["s04a", "s04b", "s05a", "s05b"] },
  { id: "prediction", icon: "🔮", label: "التوقع والدليل", en: "Prediction & evidence", stepIds: ["s06a", "s06b", "s07"] },
  { id: "functions", icon: "🤝", label: "الوعود والأسئلة", en: "Promises & questions", stepIds: ["s08", "s09a", "s09b", "s10"] },
  { id: "form", icon: "⚙️", label: "البناء والصيغ", en: "Form review", stepIds: ["s11a", "s11b", "s12", "s13"] },
  { id: "dialogue", icon: "🎭", label: "الحوار والتداخل", en: "Dialogue & overlap", stepIds: ["s14a", "s14b", "s15"] },
  { id: "practice", icon: "🔬", label: "المختبرات والتدريب", en: "Labs & practice", stepIds: ["s16", "s17", "s18", "s19", "s20"] },
  { id: "assessment", icon: "📖", label: "القراءة والتقييم", en: "Reading & assessment", stepIds: ["s21a", "s21b", "s22", "s23"] },
  { id: "wrap", icon: "✍️", label: "الكتابة والختام", en: "Writing & wrap-up", stepIds: ["s24", "s25a", "s25b", "s26"] },
];

export const SLIDES_36: Slide36[] = [...DECK_A_36, ...DECK_B_36, ...DECK_C_36];
export const STEP_COUNT_36 = SLIDES_36.length;

const SLIDE_IDS = new Set(SLIDES_36.map((slide) => slide.id));
const missingStageSlides = SLIDES_36.filter((slide) => !STAGES_36.some((stage) => stage.stepIds.includes(slide.id)));
const unknownStageSteps = STAGES_36.flatMap((stage) => stage.stepIds.filter((id) => !SLIDE_IDS.has(id)));
if (missingStageSlides.length || unknownStageSteps.length) {
  throw new Error(
    `Lesson 36 stage map is out of sync. Unstaged slides: ${missingStageSlides.map((slide) => slide.id).join(", ") || "none"}; unknown steps: ${unknownStageSteps.join(", ") || "none"}.`,
  );
}

export function stageOf36(slideId: string): Stage36 {
  const stage = STAGES_36.find((candidate) => candidate.stepIds.includes(slideId));
  if (!stage) throw new Error(`Lesson 36 has no stage for slide ${slideId}`);
  return stage;
}

export function slide36(id: string) {
  return SLIDES_36.find((candidate) => candidate.id === id);
}

export type CoverageRow36 = {
  section: string;
  title: string;
  numeric: number | null;
  expected: number;
  covered: number[];
  missing: number[];
  duplicates: number[];
  outOfOrder: boolean;
  slides: string[];
};

/** Structural proof that the rebuilt deck covers the source exactly once, in order. */
export function deckCoverage36(): CoverageRow36[] {
  const rows: CoverageRow36[] = [];
  for (const section of SOURCE_SECTIONS_36) {
    const hits: { index: number; slideId: string }[] = [];
    for (const slide of SLIDES_36) {
      for (const ref of refsOfSlide(slide)) {
        if (ref.s === section.id && !ref.r) hits.push({ index: ref.i, slideId: slide.id });
      }
    }
    const covered = hits.map((hit) => hit.index);
    const unique = new Set(covered);
    const duplicates = [...unique].filter((index) => covered.filter((value) => value === index).length > 1);
    const missing = section.units.map((_, index) => index).filter((index) => !unique.has(index));
    const ordered = [...unique].every((value, position, list) => position === 0 || list[position - 1] < value);
    rows.push({
      section: section.id,
      title: section.title,
      numeric: section.num ?? null,
      expected: section.units.length,
      covered,
      missing,
      duplicates,
      outOfOrder: !ordered,
      slides: [...new Set(hits.map((hit) => hit.slideId))],
    });
  }
  return rows;
}

/** Reveal units (answer keys / analyses) that the interactive panels must expose after an attempt. */
export function revealCoverage36(): { section: string; expected: number; covered: number[]; missing: number[] }[] {
  return SOURCE_SECTIONS_36.filter((section) => section.revealUnits?.length).map((section) => {
    const covered = SLIDES_36.flatMap((slide) => refsOfSlide(slide))
      .filter((ref) => ref.s === section.id && ref.r)
      .map((ref) => ref.i);
    const unique = new Set(covered);
    return {
      section: section.id,
      expected: section.revealUnits!.length,
      covered,
      missing: section.revealUnits!.map((_, index) => index).filter((index) => !unique.has(index)),
    };
  });
}

/** Source units intentionally rendered outside the slide deck (formal test questions). */
export const TEST_UNIT_EXCEPTIONS_36 = { section: "s22", from: 2 } as const;

export function refKey(ref: Ref) {
  return `${ref.s}:${ref.i}${ref.r ? "r" : ""}`;
}

export { sourceSection36 };
