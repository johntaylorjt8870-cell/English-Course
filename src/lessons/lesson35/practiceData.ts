import { SOURCE_SECTIONS_35 } from "./ledger35";

const source = (id: string) => SOURCE_SECTIONS_35.find((section) => section.id === id)!;

export type PracticeItem35 = {
  n: number;
  prompt: string;
  answer: string;
  explanation: string;
};

const detectiveExplanations = [
  "مع She نستخدم is، ثم يأتي الفعل الأساسي study بصيغة V1.",
  "الفاعل They جمع، لذلك نستخدم are going to.",
  "بعد going to نستخدم buy بصيغته الأساسية، لا buys.",
  "في سؤال Yes/No نضع المساعد قبل الفاعل: Is she…?",
  "الفعل بعد going to هو study بصيغة V1، وليس studying.",
  "لوصف الحالة نحتاج الفعل الأساسي be بعد going to: going to be ready.",
  "لا نستخدم do أو does هنا؛ نضع is قبل he لتكوين السؤال.",
  "بعد going to نستخدم visit بصيغته الأساسية، لا visited.",
];

export const DETECTIVE_ITEMS_35: PracticeItem35[] = source("s28").units.slice(1).map((prompt, index) => ({
  n: index + 1,
  prompt,
  answer: source("s28").revealUnits![index + 1],
  explanation: detectiveExplanations[index],
}));

export const AUXILIARY_ITEMS_35: PracticeItem35[] = source("s29").units.slice(1).map((prompt, index) => ({
  n: index + 1,
  prompt,
  answer: source("s29").revealUnits![index + 1],
  explanation: [
    "مع I نستخدم am.",
    "مع She نستخدم is.",
    "الفاعل They جمع، لذلك نستخدم are.",
    "مع We نستخدم are.",
    "The weather مفرد، لذلك نستخدم is.",
    "مع You نستخدم are.",
    "My cousins جمع، لذلك نستخدم are.",
    "The teacher مفرد، لذلك نستخدم is.",
  ][index],
}));

export const TRANSFORMATION_ITEMS_35: PracticeItem35[] = source("s30").units.slice(1).map((prompt, index) => ({
  n: index + 1,
  prompt,
  answer: source("s30").revealUnits![index + 1],
  explanation: [
    "مع I نستخدم am going to، ثم الفعل الأساسي start.",
    "نفي الجملة مع He هو isn't going to، ثم الفعل الأساسي sell.",
    "في سؤال Yes/No نضع are قبل you: Are you going to join…?",
    "مع The children نستخدم are، ويبقى الفعل الأساسي make بصيغة V1.",
    "نضع not بعد are، ويبقى الفعل الأساسي cancel بصيغة V1.",
    "في سؤال Yes/No نضع is قبل Sara: Is Sara going to study…?",
  ][index],
}));

const decisionSource = source("s31");
const decisionKeys = decisionSource.revealUnits!;
const decisionPromptGroups = [
  decisionSource.units.slice(1, 3),
  decisionSource.units.slice(3, 4),
  decisionSource.units.slice(4, 5),
  decisionSource.units.slice(5, 7),
  decisionSource.units.slice(7, 8),
  decisionSource.units.slice(8, 9),
  decisionSource.units.slice(9, 10),
  decisionSource.units.slice(10, 11),
];
export type DecisionPracticeItem35 = {
  n: number;
  promptLines: string[];
  answer: string;
  explanation: string;
  family: "will" | "going-to" | "wont";
};
export const DECISION_PRACTICE_ITEMS_35: DecisionPracticeItem35[] = decisionPromptGroups.map((promptLines, index) => {
  const answer = decisionKeys[1 + index * 2];
  return {
    n: index + 1,
    promptLines,
    answer,
    explanation: decisionKeys[2 + index * 2],
    family: answer === "won't" ? "wont" : answer.includes("going to") ? "going-to" : "will",
  };
});

export const READING_QUESTIONS_35 = source("s33").units.slice(19, 26);
export const READING_ANSWERS_35 = source("s33").revealUnits!.slice(1, 8);
export const READING_ANALYSIS_35 = source("s33").revealUnits!.slice(9);

export const FINAL_BOSS_REQUIREMENTS_35 = source("s36").units.slice(4, 12);
export const FINAL_BOSS_MODEL_35 = source("s36").units.slice(13, 17);

export const GRAMMAR_DETECTIVE_COUNT_35 = DETECTIVE_ITEMS_35.length;
export const AUXILIARY_DRILL_COUNT_35 = AUXILIARY_ITEMS_35.length;
export const TRANSFORMATION_DRILL_COUNT_35 = TRANSFORMATION_ITEMS_35.length;
export const WILL_GOING_TO_DRILL_COUNT_35 = DECISION_PRACTICE_ITEMS_35.length;
