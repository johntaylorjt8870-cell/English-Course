import { SOURCE_SECTIONS_35 } from "./ledger35";

export const LESSON_TITLE_35 = "الدرس 35: BE GOING TO — الخطط والنوايا والتوقعات المستقبلية";
export const LESSON_SUBTITLE_35 = "Future Plans, Intentions & Predictions";
export const LESSON_LEVEL_35 = "المستوى: تأسيسي متقدم — IQ200 🚀";
export const LAB_NAME_35 = "FUTURE LAB";
export const LAB_QUESTION_35 = "How do we choose the right way to talk about the future?";

/** The thirteen restrained navigation chapters organize, but never reorder, the source. */
export const SECTIONS_35 = [
  { id: "ARRIVE", scene: "A", label: "Enter Future Lab", arabic: "البداية" },
  { id: "DISCOVER", scene: "B", label: "Discover the construction", arabic: "اكتشاف الصيغة" },
  { id: "AUXILIARY", scene: "C", label: "The auxiliary selector", arabic: "اختيار المساعد" },
  { id: "BUILD", scene: "D", label: "Build a sentence", arabic: "بناء الجملة" },
  { id: "PLANS", scene: "E", label: "Plans & intentions", arabic: "الخطط والنوايا" },
  { id: "CONVERSATION", scene: "F", label: "Conversation studio", arabic: "استوديو الحوار" },
  { id: "EVIDENCE", scene: "G", label: "Evidence & predictions", arabic: "الدليل والتوقع" },
  { id: "CONTROL", scene: "H", label: "Grammar control room", arabic: "غرفة التحكم" },
  { id: "SIMULATOR", scene: "I", label: "WILL vs BE GOING TO", arabic: "محاكي الاختيار" },
  { id: "PRACTICE", scene: "J", label: "Grammar Detective & practice", arabic: "الممارسة الموجهة" },
  { id: "READING", scene: "K", label: "Reading studio", arabic: "استوديو القراءة" },
  { id: "TEST", scene: "L", label: "Future Plans Master Test", arabic: "الاختبار والحلول" },
  { id: "MISSION", scene: "M", label: "Final Boss & golden map", arabic: "المهمة والخاتمة" },
] as const;

export type SectionId35 = (typeof SECTIONS_35)[number]["id"];

const SOURCE_TO_SCENE_35: Record<string, SectionId35> = {
  cover: "ARRIVE",
  s1: "ARRIVE",
  s2: "DISCOVER",
  s3: "DISCOVER",
  s4: "AUXILIARY",
  s5: "AUXILIARY",
  s6: "BUILD",
  s7: "BUILD",
  s8: "PLANS",
  s9: "PLANS",
  s10: "CONVERSATION",
  s11: "EVIDENCE",
  s12: "EVIDENCE",
  s13: "EVIDENCE",
  s14: "CONTROL",
  s15: "CONTROL",
  s16: "CONTROL",
  s17: "CONTROL",
  s18: "CONTROL",
  s19: "CONTROL",
  s20: "CONTROL",
  s21: "CONTROL",
  s22: "CONTROL",
  s23: "CONTROL",
  s24: "SIMULATOR",
  s25: "SIMULATOR",
  s26: "SIMULATOR",
  s27: "SIMULATOR",
  s28: "PRACTICE",
  s29: "PRACTICE",
  s30: "PRACTICE",
  s31: "PRACTICE",
  s32: "PRACTICE",
  s33: "READING",
  s34: "TEST",
  s35: "TEST",
  s36: "MISSION",
  s37: "MISSION",
  s38: "MISSION",
};

const LEADS_35: Record<string, string> = {
  cover: "The future is not one-size-fits-all. The meaning behind the sentence is the evidence.",
  s1: "Ten outcomes. One habit: notice what the speaker means before choosing a form.",
  s2: "A decision made earlier leaves a trace in the speaker’s intention.",
  s3: "Meet each part of the construction before you use it.",
  s4: "Select a subject; the auxiliary changes, but the main verb does not.",
  s6: "Assemble a real sentence one decision at a time.",
  s8: "Move along the decision timeline: intention first, speaking moment second, action later.",
  s11: "Present evidence → a reasonable prediction about what may happen next.",
  s13: "This is a useful contrast—not a wall between the two forms.",
  s24: "Typical choices are a compass, not a set of absolute boundaries.",
  s31: "Choose the form that best fits the context; then inspect the reason.",
  s33: "Read the whole school story first. Answer keys wait until you try.",
  s36: "Your paragraph is yours: the planning aid checks requirements but never writes for you.",
  s38: "The course moves on to a full comparison in Lesson 36.",
};

export type Slide35 = {
  id: string;
  sourceId: string;
  section: SectionId35;
  title: string;
  step: number;
  sourceOrder: number;
  lead?: string;
};

/** Exactly one native step per source section, in the order supplied. */
export const SLIDES_35: Slide35[] = SOURCE_SECTIONS_35.map((source, index) => ({
  id: source.id,
  sourceId: source.id,
  section: SOURCE_TO_SCENE_35[source.id],
  title: source.title,
  step: index + 1,
  sourceOrder: source.order,
  lead: LEADS_35[source.id],
}));

export const SLIDE_COUNT_35 = SLIDES_35.length;
export const SOURCE_TO_STEP_35 = Object.fromEntries(SLIDES_35.map((slide, index) => [slide.sourceId, index])) as Record<string, number>;

export function sourceSection35(id: string) {
  return SOURCE_SECTIONS_35.find((section) => section.id === id);
}

export function slidesInSection35(sectionId: SectionId35) {
  return SLIDES_35.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.section === sectionId);
}
