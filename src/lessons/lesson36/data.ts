// Public lesson metadata. The teaching deck lives in `deck36.ts` and the
// verbatim source of truth in `ledger36.ts`.
export {
  LESSON_ARABIC_SUBTITLE_36,
  LESSON_LEVEL_36,
  LESSON_SUBTITLE_36,
  LESSON_TITLE_36,
  SLIDES_36,
  STAGES_36,
  STEP_COUNT_36,
  deckCoverage36,
  revealCoverage36,
  slide36,
  sourceSection36,
  stageOf36,
} from "./deck36";

export type { CoverageRow36, Stage36 } from "./deck36";
export type { Slide36, Ref, Block } from "./content36";

export const AREA_LABEL_36 = {
  lesson: "خطوات الدرس",
  test: "منطقة الاختبار",
  solutions: "الحلول التفصيلية",
  teacher: "منطقة المعلم",
} as const;

export type Area36 = keyof typeof AREA_LABEL_36;
