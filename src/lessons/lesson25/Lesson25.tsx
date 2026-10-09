import { mixedText } from "../../shared/lessonKit";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_NUMBERED_COUNT,
  LESSON_TITLE_25,
  LESSON_SUBTITLE_25,
  LESSON_ARABIC_TITLE_25,
  LAB_NAME_25,
  LAB_MOTTO_25,
  OPENING_LETS_GO,
  OPENING_MASTERED_TITLE,
  OPENING_MASTERED_ITEMS,
  OPENING_NOW_TITLE,
  OPENING_NOW_TENSE,
  OPENING_NOW_DESC,
  OPENING_KEY_IDEA_TITLE,
  OPENING_KEY_IDEA_A,
  OPENING_KEY_IDEA_B,
  OBJECTIVES_25,
  BIG_IDEA_IMAGINE,
  BIG_IDEA_TIME,
  BIG_IDEA_SENTENCES,
  BIG_IDEA_QUESTION,
  BIG_IDEA_EXPLAIN_1,
  BIG_IDEA_EXPLAIN_2,
  BIG_IDEA_DEFINE,
  TIME_MACHINE_TITLE,
  TIME_MACHINE_TIMELINE,
  TIME_MACHINE_TIME,
  TIME_MACHINE_BOX,
  TIME_MACHINE_POINTS,
  TIME_MACHINE_CENTRAL,
  STRUCTURE_FORMULA,
  STRUCTURE_NOTE,
  WAS_TITLE,
  WAS_USE_WITH,
  WAS_EXAMPLES,
  WERE_TITLE,
  WERE_USE_WITH,
  WERE_EXAMPLES,
  GOLDEN_MAP_TITLE,
  GOLDEN_MAP_WAS,
  GOLDEN_MAP_WERE,
  COMPARE_PRESENT_TITLE,
  COMPARE_PRESENT_LABEL,
  COMPARE_PRESENT_EXAMPLES,
  COMPARE_PAST_LABEL,
  COMPARE_PAST_EXAMPLES,
  COMPARE_NOTICE,
  COMPARE_PRESENT_FORMULA,
  COMPARE_PAST_FORMULA,
  AFFIRMATIVE_STRUCTURE,
  AFFIRMATIVE_EXAMPLES,
  USES_INTRO,
  USE1_TITLE,
  USE1_DESC,
  USE1_IMAGINE,
  USE1_EXAMPLES,
  SIGNAL_EXPRESSIONS_TITLE,
  SIGNAL_EXPRESSIONS_DESC,
  SIGNAL_EXPRESSIONS,
  SIGNAL_EXAMPLES,
  IMPORTANT_TITLE,
  IMPORTANT_TEXT,
  IMPORTANT_EXAMPLE_LABEL,
  IMPORTANT_EXAMPLE,
  IMPORTANT_EXPLAIN_1,
  IMPORTANT_EXPLAIN_2,
  USE2_TITLE,
  USE2_LABEL,
  USE2_SCENARIO,
  USE2_RESULT,
  TWO_ACTION_MODEL_TITLE,
  TWO_ACTION_A_LABEL,
  TWO_ACTION_A_EXAMPLE,
  TWO_ACTION_B_LABEL,
  TWO_ACTION_B_EXAMPLE,
  TWO_ACTION_SO,
  USE2_EXAMPLE_1,
  USE2_EXAMPLE_1_NOTE_1,
  USE2_EXAMPLE_1_NOTE_2,
  USE2_EXAMPLE_2,
  USE2_EXAMPLE_2_NOTE_1,
  USE2_EXAMPLE_2_NOTE_2,
  USE2_EXAMPLE_3,
  USE2_EXAMPLE_3_NOTE_1,
  USE2_EXAMPLE_3_NOTE_2,
  VERY_IMPORTANT_TITLE,
  VERY_IMPORTANT_1,
  VERY_IMPORTANT_2,
  VERY_IMPORTANT_3,
  VERY_IMPORTANT_4,
  USE3_TITLE,
  USE3_DESC,
  USE3_EXAMPLE_1,
  USE3_EXAMPLE_1_NOTE,
  USE3_EXAMPLE_2,
  USE3_EXAMPLE_2_NOTE,
  USE3_EXAMPLE_3,
  PARALLEL_PATTERN_TITLE,
  PARALLEL_PATTERN_A,
  PARALLEL_PATTERN_EXAMPLE,
  PARALLEL_PATTERN_NOTE,
  USE4_TITLE,
  USE4_DESC,
  USE4_STORY_LINES,
  USE4_NOTICE_LINES,
  USE4_EXPLAIN_1,
  USE4_EXPLAIN_2,
  USE4_EXPLAIN_3,
  MOVIE_CAMERA_TITLE,
  MOVIE_CAMERA_IDEA_1,
  MOVIE_CAMERA_RECORDING,
  MOVIE_CAMERA_SUDDENLY,
  MOVIE_CAMERA_DIFF,
  MOVIE_CAMERA_PAST_CONT,
  MOVIE_CAMERA_PAST_SIMPLE,
  SIGNAL_WORDS_TITLE,
  SIGNAL_WORDS_DESC,
  SIGNAL_WORDS,
  SIGNAL_REMEMBER_TITLE,
  SIGNAL_REMEMBER_1,
  SIGNAL_REMEMBER_2,
  SIGNAL_REMEMBER_EXAMPLE_1,
  SIGNAL_REMEMBER_EXAMPLE_2,
  SIGNAL_REMEMBER_MEANING,
  VS_TITLE,
  VS_DESC,
  VS_COMPARE_1_A,
  VS_COMPARE_1_B,
  VS_COMPARE_2_A,
  VS_COMPARE_2_B,
  SIDE_BY_SIDE_TITLE,
  SIDE_BY_SIDE_ITEMS,
  DECISION_QUESTION_TITLE,
  DECISION_QUESTION_1,
  DECISION_QUESTION_2,
  NEGATIVE_STRUCTURE,
  NEGATIVE_WAS_NOT_LABEL,
  NEGATIVE_WAS_NOT,
  NEGATIVE_WERE_NOT_LABEL,
  NEGATIVE_WERE_NOT,
  CONTRACTIONS_TITLE,
  CONTRACTIONS,
  CONTRACTIONS_EXAMPLES,
  NEGATIVE_COMPARE_TITLE,
  NEGATIVE_COMPARE_POS_1,
  NEGATIVE_COMPARE_NEG_1,
  NEGATIVE_COMPARE_POS_2,
  NEGATIVE_COMPARE_NEG_2,
  NEGATIVE_RULE,
  QUESTION_FORMULA,
  QUESTION_EXAMPLES,
  QUESTION_FORMULA_TITLE,
  QUESTION_STATEMENT,
  QUESTION_Q,
  QUESTION_EXPLAIN_1,
  QUESTION_EXAMPLE_2,
  SHORT_ANSWERS,
  COMMON_MISTAKE_TITLE,
  COMMON_MISTAKE_Q,
  COMMON_MISTAKE_WRONG,
  COMMON_MISTAKE_WHY_1,
  COMMON_MISTAKE_CORRECT,
  WH_TITLE,
  WH_DESC,
  WH_EXAMPLES,
  WH_STRUCTURE,
  WH_EXAMPLES_2,
  WWYD_TITLE,
  WWYD_DESC,
  WWYD_Q,
  WWYD_ANSWERS,
  WWYD_NOTICE_TITLE,
  WWYD_NOTICE_Q,
  WWYD_NOTICE_A,
  WWYD_NOTICE_WRONG,
  ING_TITLE,
  ING_DESC,
  ING_RULE1_TITLE,
  ING_RULE1,
  ING_RULE2_TITLE,
  ING_RULE2,
  ING_RULE2_NOTE,
  ING_RULE3_TITLE,
  ING_RULE3,
  ING_WHY_TITLE,
  ING_WHY,
  PRESENT_VS_PAST_TITLE,
  PRESENT_VS_PAST_DESC,
  PRESENT_VS_PAST_PAIRS,
  TIMELINE_TITLE,
  TIMELINE_PRESENT,
  TIMELINE_PAST,
  TIMELINE_STRUCTURE_TITLE,
  MASTER_PATTERN_TITLE,
  MASTER_PATTERN_PRESENT,
  MASTER_PATTERN_PAST,
  COMBINED_PATTERN_TITLE,
  COMBINED_PATTERN_DESC,
  COMBINED_PATTERN,
  COMBINED_EXAMPLES,
  COMBINED_EXPLAIN,
  REVERSE_ORDER_TITLE,
  REVERSE_ORDER_DESC,
  REVERSE_EXAMPLES,
  REVERSE_NOTE,
  WHEN_WHILE_TITLE,
  WHEN_WHILE_DESC,
  WHEN_WHILE_WHEN,
  WHEN_WHILE_WHILE,
  WHEN_WHILE_BOTH,
  TWO_CONT_TITLE,
  TWO_CONT_DESC,
  TWO_CONT_PATTERN,
  TWO_CONT_EXAMPLES,
  TWO_CONT_IMPORTANT_TITLE,
  TWO_CONT_COMPARE_A,
  TWO_CONT_COMPARE_B,
  STORY_MODE_TITLE,
  STORY_MODE_DESC,
  STORY_MODE_LINES,
  STORY_MODE_WHY,
  STORY_MODE_BACKGROUND,
  STORY_MODE_EVENTS,
  DETECTIVE_TITLE,
  DETECTIVE_SUBTITLE,
  DETECTIVE_ITEMS,
  IQ200_TITLE,
  IQ200_QUESTION,
  IQ200_OPTIONS,
  IQ200_CORRECT_INDEX,
  IQ200_WHY_TITLE,
  IQ200_WHY,
  IQ200_CORRECT_LETTER,
  EX1_TITLE,
  EX1_ITEMS,
  EX1_OPTIONS,
  EX2_TITLE,
  EX2_DESC,
  EX2_ITEMS,
  EX3_TITLE,
  EX3_DESC,
  EX3_ITEMS,
  EX4_TITLE,
  EX4_DESC,
  EX4_ITEMS,
  EX5_TITLE,
  EX5_DESC,
  EX5_ITEMS,
  EX6_TITLE,
  EX6_ITEMS,
  EX7_TITLE,
  EX7_DESC,
  EX7_ITEMS,
  EX8_TITLE,
  EX8_DESC,
  EX8_ITEMS,
  DETECTIVE2_TITLE,
  DETECTIVE2_PARAGRAPH,
  DETECTIVE2_TASK,
  DETECTIVE2_ERRORS,
  IQ200_CHALLENGE_TITLE,
  IQ200_CHALLENGE_PARAGRAPH,
  IQ200_CHALLENGE_QUESTIONS,
  IQ200_CHALLENGE_NOTE,
  FINAL_BOSS_TITLE,
  FINAL_BOSS_REQUIREMENTS_INTRO,
  FINAL_BOSS_REQUIREMENTS,
  FINAL_BOSS_OPENING,
  FINAL_BOSS_EXAMPLE_TITLE,
  FINAL_BOSS_EXAMPLE_BACKGROUND,
  FINAL_BOSS_EXAMPLE_INTERRUPTION,
  FINAL_BOSS_EXAMPLE_DEVELOPMENT,
  FINAL_BOSS_NOW,
  MASTER_SUMMARY_TITLE,
  MASTER_AFFIRMATIVE_TITLE,
  MASTER_AFFIRMATIVE_FORMULA,
  MASTER_AFFIRMATIVE_EXAMPLES,
  MASTER_NEGATIVE_TITLE,
  MASTER_NEGATIVE_FORMULA,
  MASTER_NEGATIVE_EXAMPLES,
  MASTER_QUESTION_TITLE,
  MASTER_QUESTION_FORMULA,
  MASTER_QUESTION_EXAMPLES,
  MASTER_SHORT_TITLE,
  MASTER_SHORT_EXAMPLES,
  MASTER_WH_TITLE,
  MASTER_WH_FORMULA,
  MASTER_WH_EXAMPLES,
  MASTER_USES_TITLE,
  MASTER_USES,
  MASTER_VS_TITLE,
  MASTER_VS_SIMPLE,
  MASTER_VS_CONT,
  MASTER_VS_COMBINED,
  MASTER_COMBINED_PATTERN_1,
  MASTER_COMBINED_PATTERN_2,
  MEMORY_TRICK_TITLE,
  MEMORY_TRICK_SUBTITLE,
  MEMORY_TRICK_SIMPLE_TITLE,
  MEMORY_TRICK_SIMPLE_ICON,
  MEMORY_TRICK_SIMPLE_DESC,
  MEMORY_TRICK_SIMPLE_EX,
  MEMORY_TRICK_CONT_TITLE,
  MEMORY_TRICK_CONT_ICON,
  MEMORY_TRICK_CONT_DESC,
  MEMORY_TRICK_CONT_EX,
  MEMORY_TRICK_TOGETHER_TITLE,
  MEMORY_TRICK_TOGETHER_A,
  MEMORY_TRICK_TOGETHER_B,
  MEMORY_TRICK_NOTE,
  CLOSING_TITLE,
  CLOSING_NOW_TITLE,
  CLOSING_NOW_ITEMS,
  CLOSING_POWERFUL_TITLE,
  CLOSING_POWERFUL_1,
  CLOSING_POWERFUL_1_EX,
  CLOSING_POWERFUL_2,
  CLOSING_POWERFUL_2_EX,
  NEXT_STEP_TITLE,
  type Block25,
  type Exercise25,
  type Slide25,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// Helpers — BIDI + UI
// ============================================================

function En({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}><LatinRuns text={text} marked /></span>;
}

function TextBlock({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`whitespace-pre-line ${className}`}>
      <Rich text={text} />
    </div>
  );
}

function SourceLine({
  en,
  ar,
  tone = "neutral",
}: {
  en: string;
  ar?: string;
  tone?: "neutral" | "good" | "bad" | "focus" | "warn";
}) {
  const tones: Record<string, string> = {
    neutral: "border-slate-100 bg-white text-slate-900",
    good: "border-emerald-200 bg-emerald-50 text-emerald-900",
    bad: "border-rose-200 bg-rose-50 text-rose-800",
    focus: "border-indigo-300 bg-indigo-50 text-indigo-900",
    warn: "border-amber-300 bg-amber-50 text-amber-900",
  };
  return (
    <div className={`rounded-2xl border-2 p-3 ${tones[tone]}`}>
      <div dir="ltr" className="ltr-row">
        <En className={`block text-left text-lg font-extrabold md:text-xl ${tone === "bad" ? "line-through decoration-rose-300" : ""}`}>{en}</En>
      </div>
      {ar && (
        <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
          <Rich text={ar} />
        </div>
      )}
    </div>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4">
      <span className="text-2xl">{emoji}</span>
      <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
    </div>
  );
}

function Frame({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
  sourceHeading,
}: {
  mascot: string;
  step?: string;
  badge?: string;
  title: ReactNode;
  lead?: string;
  children: ReactNode;
  tip?: string;
  sourceHeading?: string;
}) {
  return (
    <section
      dir="rtl"
      className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(79,70,229,0.28)] md:p-9"
    >
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-indigo-700 text-lg font-bold text-white shadow-sm">
            {mixedText(step)}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-indigo-100 px-3.5 py-1.5 text-sm font-bold text-indigo-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div
          data-source-section={sourceHeading}
          className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"
        >
          <span className="rounded-md bg-white px-1.5 py-0.5 text-indigo-700">SOURCE SECTION</span>
          <Rich text={sourceHeading} />
        </div>
      )}
      <h2 className="font-head mt-3 max-w-[90%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{mixedText(title)}</h2>
      {lead && (
        <div className="mt-2 max-w-[92%] text-lg text-slate-500 md:text-xl">
          <Rich text={lead} />
        </div>
      )}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-indigo-700 to-violet-700 p-4 text-white">
          <span className="text-2xl">🔦</span>
          <span className="text-base font-semibold md:text-lg">
            <Rich text={tip} />
          </span>
        </div>
      )}
    </section>
  );
}

function LabPanel({
  emoji,
  label,
  ar,
  children,
  seq,
}: {
  emoji: string;
  label: string;
  ar?: string;
  children: ReactNode;
  seq?: string;
}) {
  return (
    <div data-en-seq={seq} className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-sky-50 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-indigo-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <En className="text-[11px] font-black uppercase tracking-[0.18em] text-indigo-700">{label}</En>
        {ar && <Rich text={ar} className="text-sm font-bold text-slate-600" />}
      </div>
      {children}
    </div>
  );
}

function FormulaStrip({
  items,
  tone = "indigo",
}: {
  items: readonly string[];
  tone?: "emerald" | "indigo" | "amber" | "rose" | "sky" | "violet";
}) {
  const colors: Record<string, string> = {
    emerald: "border-emerald-200 bg-white text-emerald-900",
    indigo: "border-indigo-200 bg-white text-indigo-900",
    amber: "border-amber-200 bg-white text-amber-900",
    rose: "border-rose-200 bg-white text-rose-900",
    sky: "border-sky-200 bg-white text-sky-900",
    violet: "border-violet-200 bg-white text-violet-900",
  };
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <En key={item} className={`rounded-xl border-2 px-3 py-2 text-sm font-black ${colors[tone]}`}>
          {item}
        </En>
      ))}
    </div>
  );
}

function Chip({ en, tone = "indigo" }: { en: string; tone?: "indigo" | "violet" | "emerald" | "rose" | "amber" | "slate" }) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-700 text-white",
    violet: "bg-violet-700 text-white",
    emerald: "bg-emerald-700 text-white",
    rose: "bg-rose-700 text-white",
    amber: "bg-amber-600 text-white",
    slate: "bg-white text-indigo-900 border-2 border-indigo-200",
  };
  return <En className={`rounded-xl px-3 py-1.5 text-base font-black ${colors[tone]}`}>{en}</En>;
}

// ============================================================
// 0. الافتتاح — ربط مع الدروس السابقة
// ============================================================
function OpeningRecall() {
  return (
    <LabPanel emoji="🔗" label="CONNECTION TO LESSONS 1–24" ar="نقطة الربط مع كل ما سبق" seq="l25-opening">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={OPENING_LETS_GO} />
      </div>
      <div className="mt-2 text-center text-base font-bold text-slate-700">
        <Rich text={OPENING_MASTERED_TITLE} />
      </div>
      <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {OPENING_MASTERED_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-xl border-2 border-white bg-white/80 p-2 text-sm font-bold text-slate-700">
            <span className="text-indigo-600">◀</span>
            <En className="text-sm font-bold text-slate-800">{item}</En>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-base font-bold text-slate-700">
        <Rich text={OPENING_NOW_TITLE} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-indigo-300 bg-white p-4 text-center">
        <div className="text-lg font-black text-indigo-900 md:text-xl">
          <En className="text-xl font-black text-indigo-900">{OPENING_NOW_TENSE}</En>
        </div>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={OPENING_NOW_DESC} />
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
        <div className="text-base font-black text-amber-900">
          <Rich text={OPENING_KEY_IDEA_TITLE} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          <En className="rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-black text-white">{OPENING_KEY_IDEA_A}</En>
          <En className="rounded-xl bg-indigo-700 px-3 py-1.5 text-sm font-black text-white">{OPENING_KEY_IDEA_B}</En>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 1. Big Idea
// ============================================================
function BigIdea() {
  return (
    <LabPanel emoji="🧠" label="THE BIG IDEA" ar="ننظر إلى الفعل وهو يحدث" seq="l25-bigidea">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={BIG_IDEA_IMAGINE} />
      </div>
      <div className="mt-1 text-center text-xl font-black text-indigo-900">
        <Rich text={BIG_IDEA_TIME} />
      </div>
      <div className="mt-3 grid gap-2">
        {BIG_IDEA_SENTENCES.map((s) => (
          <SourceLine key={s} en={s} tone="focus" />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-base font-bold text-slate-700">
          <Rich text={BIG_IDEA_QUESTION} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={BIG_IDEA_EXPLAIN_1} />
        </div>
        <div className="mt-1 text-base font-black text-indigo-900">
          <Rich text={BIG_IDEA_EXPLAIN_2} />
        </div>
        <En className="mt-2 block rounded-xl bg-indigo-700 px-4 py-2 text-center text-lg font-black text-white">{BIG_IDEA_DEFINE}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 2. Time Machine — interactive
// ============================================================
function TimeMachineLab() {
  const [active, setActive] = useState("7:00 PM");
  const times = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];
  return (
    <LabPanel emoji="⏳" label="TIME MACHINE" ar="اسحب نافذة الزمن لترى الفعل من الداخل" seq="l25-timemachine">
      <div className="text-center text-base font-black text-indigo-900">
        <Rich text={TIME_MACHINE_TITLE} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex justify-center">
        <En className="rounded-lg bg-slate-900 px-3 py-1 text-sm font-black text-white">{TIME_MACHINE_TIMELINE}</En>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {times.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 px-4 py-2 text-sm font-black transition ${active === t ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-4">
        <div className="flex flex-col items-center">
          <div className="text-sm font-bold text-slate-500">
            <Rich text="PAST" />
          </div>
          <div className="mt-1 h-1 w-full max-w-md rounded-full bg-slate-200" />
          <div className="relative mt-2 flex w-full max-w-md justify-between">
            <span className="text-xs font-bold text-slate-400">6:00</span>
            <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
              <div className="h-6 w-0.5 bg-indigo-500" />
              <En className={`rounded-lg px-2 py-0.5 text-xs font-black ${active === "7:00 PM" ? "bg-indigo-700 text-white" : "bg-slate-100 text-slate-600"}`}>{active}</En>
              <div className={`mt-1 rounded-xl border-2 px-3 py-2 text-sm font-black ${active === "7:00 PM" ? "border-indigo-500 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
                <En>{TIME_MACHINE_BOX}</En>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">NOW</span>
          </div>
          <div className="mt-16 grid gap-1.5">
            {TIME_MACHINE_POINTS.map((p) => (
              <div key={p} className="flex items-center gap-2 rounded-xl bg-indigo-50 p-2 text-sm font-bold text-indigo-900">
                <span className="text-indigo-600">●</span>
                <Rich text={p} />
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm font-black text-indigo-900">
            <Rich text={TIME_MACHINE_CENTRAL} />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 3. Structure
// ============================================================
function StructureLab() {
  const [lit, setLit] = useState(0);
  const parts = ["Subject", "was/were", "verb-ing"];
  return (
    <LabPanel emoji="⭐" label="THE STRUCTURE" ar="الصيغة الكاملة" seq="l25-structure">
      <div dir="ltr" className="ltr-row flex flex-wrap justify-center gap-2">
        {parts.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => setLit(i)}
            className={`rounded-2xl border-2 px-4 py-3 text-lg font-black transition ${lit === i ? "border-indigo-500 bg-indigo-700 text-white shadow" : "border-slate-200 bg-white text-slate-700"}`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="mt-3 flex justify-center">
        <En className="rounded-2xl bg-slate-900 px-5 py-3 text-xl font-black text-white">{STRUCTURE_FORMULA}</En>
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={STRUCTURE_NOTE} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        <div className={`rounded-xl border-2 p-2 text-center ${lit === 0 ? "border-indigo-400 bg-white" : "border-slate-100 bg-white/60"}`}>
          <En className="text-xs font-black uppercase tracking-wide text-indigo-700">Subject</En>
          <div className="text-sm font-bold text-slate-700">I / He / She / It / You / We / They</div>
        </div>
        <div className={`rounded-xl border-2 p-2 text-center ${lit === 1 ? "border-indigo-400 bg-white" : "border-slate-100 bg-white/60"}`}>
          <En className="text-xs font-black uppercase tracking-wide text-indigo-700">was / were</En>
          <div className="text-sm font-bold text-slate-700">was = I/He/She/It · were = You/We/They</div>
        </div>
        <div className={`rounded-xl border-2 p-2 text-center ${lit === 2 ? "border-indigo-400 bg-white" : "border-slate-100 bg-white/60"}`}>
          <En className="text-xs font-black uppercase tracking-wide text-indigo-700">verb-ing</En>
          <div className="text-sm font-bold text-slate-700">studying / sleeping / reading</div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// WAS Panel
// ============================================================
function WasPanel() {
  const [active, setActive] = useState(0);
  const subs = WAS_USE_WITH;
  return (
    <LabPanel emoji="🔵" label="WAS CONTROL PANEL" ar="اختر الفاعل وشاهد was" seq="l25-was">
      <div className="text-center text-base font-black text-indigo-900">
        <Rich text="Use was with:" />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {subs.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${active === i ? "border-sky-500 bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        {WAS_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} tone="focus" />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 text-center">
        <En className="text-lg font-black text-sky-900">{subs[active]} → was</En>
        <div className="mt-1 text-sm font-bold text-slate-600">مثال: <En className="font-black text-sky-900">{WAS_EXAMPLES[active % WAS_EXAMPLES.length].en}</En></div>
      </div>
    </LabPanel>
  );
}

function WerePanel() {
  const [active, setActive] = useState(0);
  const subs = WERE_USE_WITH;
  return (
    <LabPanel emoji="🟢" label="WERE CONTROL PANEL" ar="اختر الفاعل وشاهد were" seq="l25-were">
      <div className="text-center text-base font-black text-emerald-900">
        <Rich text="Use were with:" />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {subs.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${active === i ? "border-emerald-500 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        {WERE_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} tone="good" />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center">
        <En className="text-lg font-black text-emerald-900">{subs[active]} → were</En>
        <div className="mt-1 text-sm font-bold text-slate-600">مثال: <En className="font-black text-emerald-900">{WERE_EXAMPLES[active % WERE_EXAMPLES.length].en}</En></div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Golden Map Interactive
// ============================================================
function GoldenMapLab() {
  const [pick, setPick] = useState<string | null>(null);
  const pronouns = ["I", "He", "She", "It", "You", "We", "They"];
  const isWas = (p: string) => ["I", "He", "She", "It"].includes(p);
  return (
    <LabPanel emoji="🧠" label="GOLDEN MAP" ar="خريطة WAS / WERE التفاعلية" seq="l25-golden">
      <div className="text-center text-base font-black text-indigo-900">
        <Rich text={GOLDEN_MAP_TITLE} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
        {pronouns.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPick(p)}
            className={`rounded-xl border-2 p-2 text-center transition ${pick === p ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"}`}
          >
            <En className="block text-lg font-black">{p}</En>
            <En className={`mt-1 block rounded px-1 py-0.5 text-xs font-black ${pick === p ? "bg-white/20 text-white" : isWas(p) ? "bg-sky-100 text-sky-800" : "bg-emerald-100 text-emerald-800"}`}>{isWas(p) ? "was" : "were"}</En>
          </button>
        ))}
      </div>
      {pick && (
        <div className="mt-3 rounded-2xl border-2 border-indigo-300 bg-white p-3 text-center">
          <En className="text-2xl font-black text-indigo-900">{pick} → {isWas(pick) ? "was" : "were"}</En>
          <div className="mt-1 text-sm font-bold text-slate-600"><LatinRuns text={"ثم أضف verb-ing: "} /><En className="font-black text-indigo-900">{pick} {isWas(pick) ? "was" : "were"} reading</En></div>
        </div>
      )}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
          <div className="text-center text-sm font-black text-sky-800">I / He / She / It → was</div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
            {GOLDEN_MAP_WAS.map((row) => (
              <En key={row.en} className="rounded-lg bg-sky-50 px-2.5 py-1 text-sm font-black text-sky-800">{row.en}</En>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
          <div className="text-center text-sm font-black text-emerald-800">You / We / They → were</div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
            {GOLDEN_MAP_WERE.map((row) => (
              <En key={row.en} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">{row.en}</En>
            ))}
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Present Past Compare — time shift
// ============================================================
function PresentPastCompare() {
  const [mode, setMode] = useState<"present" | "past">("present");
  return (
    <LabPanel emoji="🔥" label="PRESENT → PAST TIME SHIFT" ar="حرّك الزمن وشاهد التحويل" seq="l25-present-past-compare">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={COMPARE_PRESENT_TITLE} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("present")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${mode === "present" ? "border-sky-500 bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          <En>Present: am/is/are</En>
        </button>
        <button
          type="button"
          onClick={() => setMode("past")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${mode === "past" ? "border-violet-500 bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          <En>Past: was/were</En>
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        <div className={`rounded-2xl border-2 p-3 transition ${mode === "present" ? "border-sky-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"}`}>
          <div className="text-center text-sm font-bold text-slate-600">
            <Rich text={COMPARE_PRESENT_LABEL} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {COMPARE_PRESENT_EXAMPLES.map((line) => (
              <En key={line} className="rounded-xl border-2 border-sky-300 bg-sky-50 px-3 py-2 text-base font-black text-sky-900">{line}</En>
            ))}
          </div>
          <div className="mt-2 flex justify-center">
            <En className="rounded-xl bg-sky-700 px-3 py-1.5 text-sm font-black text-white">{COMPARE_PRESENT_FORMULA}</En>
          </div>
        </div>
        <div className={`rounded-2xl border-2 p-3 transition ${mode === "past" ? "border-violet-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"}`}>
          <div className="text-center text-sm font-bold text-slate-600">
            <Rich text={COMPARE_PAST_LABEL} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
            {COMPARE_PAST_EXAMPLES.map((line) => (
              <En key={line} className="rounded-xl border-2 border-violet-300 bg-violet-50 px-3 py-2 text-base font-black text-violet-800">{line}</En>
            ))}
          </div>
          <div className="mt-2 flex justify-center">
            <En className="rounded-xl bg-violet-700 px-3 py-1.5 text-sm font-black text-white">{COMPARE_PAST_FORMULA}</En>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-slate-200 bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={COMPARE_NOTICE} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          <En className="rounded-xl bg-sky-600 px-3 py-1.5 text-sm font-black text-white">{COMPARE_PRESENT_FORMULA}</En>
          <span className="text-slate-400">→</span>
          <En className="rounded-xl bg-violet-700 px-3 py-1.5 text-sm font-black text-white">{COMPARE_PAST_FORMULA}</En>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Affirmative
// ============================================================
function AffirmativeLab() {
  return (
    <LabPanel emoji="⭐" label="AFFIRMATIVE SENTENCES" ar="6 جمل من المصدر مع الترجمة" seq="l25-affirmative">
      <div dir="ltr" className="ltr-row flex justify-center">
        <En className="rounded-2xl bg-slate-900 px-5 py-3 text-lg font-black text-white">{AFFIRMATIVE_STRUCTURE}</En>
      </div>
      <div className="mt-3 grid gap-2">
        {AFFIRMATIVE_EXAMPLES.map((row) => (
          <SourceLine key={row.en} en={row.en} ar={row.ar} tone="focus" />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// Use 1
// ============================================================
function Use1Lab() {
  return (
    <LabPanel emoji="🕒" label="USE 1 — SPECIFIC TIME" ar="الاستخدام الأهم" seq="l25-use1">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={USE1_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={USE1_DESC} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-sm font-bold text-slate-700">
          <Rich text={USE1_IMAGINE} />
        </div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-2">
          {USE1_EXAMPLES.map((line) => (
            <En key={line} className="rounded-xl border-2 border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-900">{line}</En>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

function SignalExpressionsLab() {
  return (
    <LabPanel emoji="⭐" label="SIGNAL EXPRESSIONS" ar="العبارات الإشارية" seq="l25-signal-expressions">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={SIGNAL_EXPRESSIONS_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={SIGNAL_EXPRESSIONS_DESC} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
        {SIGNAL_EXPRESSIONS.map((line) => (
          <En key={line} className="rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 text-sm font-black text-indigo-900">{line}</En>
        ))}
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">أمثلة:</div>
      <div className="mt-1 grid gap-2">
        {SIGNAL_EXAMPLES.map((line) => (
          <SourceLine key={line} en={line} tone="focus" />
        ))}
      </div>
    </LabPanel>
  );
}

function ImportantNoteLab() {
  return (
    <LabPanel emoji="🧠" label="IMPORTANT NOTE" ar="لا يحتاج دائمًا لساعة" seq="l25-important">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={IMPORTANT_TITLE} />
      </div>
      <div className="mt-1 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-semibold leading-relaxed text-slate-700">
        <Rich text={IMPORTANT_TEXT} />
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={IMPORTANT_EXAMPLE_LABEL} />
      </div>
      <SourceLine en={IMPORTANT_EXAMPLE} tone="focus" />
      <div className="mt-2 rounded-2xl border-2 border-indigo-100 bg-white p-3 text-center">
        <div className="text-sm font-bold text-slate-700">
          <Rich text={IMPORTANT_EXPLAIN_1} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-700">
          <Rich text={IMPORTANT_EXPLAIN_2} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Use 2 — Interruption Lab
// ============================================================
function Use2Lab() {
  const examples = [
    { long: "I was walking home", short: "it started to rain", full: "I was walking home when it started to rain." },
    { long: "She was cooking dinner", short: "the phone rang", full: "She was cooking dinner when the phone rang." },
    { long: "We were playing football", short: "the lights went out", full: "We were playing football when the lights went out." },
    { long: "He was taking a shower", short: "someone knocked on the door", full: "He was taking a shower when someone knocked on the door." },
  ];
  const [active, setActive] = useState(0);
  const ex = examples[active];
  return (
    <LabPanel emoji="⚡" label="USE 2 — INTERRUPTION LAB" ar="فعل مستمر + حدث قاطع" seq="l25-use2">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={USE2_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={USE2_LABEL} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
        <div className="grid gap-1.5">
          {USE2_SCENARIO.map((line) => (
            <div key={line} className="rounded-xl bg-indigo-50 p-2 text-center text-sm font-bold text-indigo-900">
              <Rich text={line} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-center">
          <En className="rounded-xl bg-indigo-700 px-3 py-1.5 text-sm font-black text-white">{USE2_RESULT}</En>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {examples.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 px-3 py-1.5 text-xs font-black transition ${active === i ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center">
          <En className="rounded-xl bg-amber-500 px-3 py-1.5 text-sm font-black text-white">LONG ACTION</En>
          <En className="mt-2 block text-base font-black text-slate-900">{ex.long}...</En>
        </div>
        <div className="my-2 flex justify-center">
          <span className="text-xl">↓</span>
        </div>
        <div className="text-center">
          <En className="rounded-xl bg-rose-600 px-3 py-1.5 text-sm font-black text-white">SHORT EVENT</En>
          <En className="mt-2 block text-base font-black text-slate-900">...when {ex.short}.</En>
        </div>
        <div className="mt-3 flex justify-center">
          <En className="rounded-xl border-2 border-indigo-300 bg-indigo-50 px-3 py-2 text-base font-black text-indigo-900">{ex.full}</En>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <span className="rounded-lg bg-amber-100 px-2 py-1 text-xs font-bold text-amber-900">ongoing action</span>
          <span className="rounded-lg bg-rose-100 px-2 py-1 text-xs font-bold text-rose-800">event</span>
        </div>
      </div>
    </LabPanel>
  );
}

function TwoActionModelLab() {
  return (
    <LabPanel emoji="🧠" label="TWO-ACTION MODEL" ar="نموذج الحدثين" seq="l25-two-action">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={TWO_ACTION_MODEL_TITLE} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3 text-center">
          <div className="text-sm font-bold text-amber-900">
            <Rich text={TWO_ACTION_A_LABEL} />
          </div>
          <En className="mt-1 block text-lg font-black text-amber-900">{TWO_ACTION_A_EXAMPLE}</En>
        </div>
        <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-3 text-center">
          <div className="text-sm font-bold text-rose-800">
            <Rich text={TWO_ACTION_B_LABEL} />
          </div>
          <En className="mt-1 block text-lg font-black text-rose-800">{TWO_ACTION_B_EXAMPLE}</En>
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <En className="rounded-2xl bg-slate-900 px-4 py-2 text-lg font-black text-white">{TWO_ACTION_SO}</En>
      </div>
      <div className="mt-3 space-y-2">
        <SourceLine en={USE2_EXAMPLE_1} tone="focus" />
        <div className="grid gap-1 sm:grid-cols-2">
          <div className="rounded-xl bg-amber-50 p-2 text-center text-xs font-bold text-amber-900">
            <Rich text={USE2_EXAMPLE_1_NOTE_1} />
          </div>
          <div className="rounded-xl bg-rose-50 p-2 text-center text-xs font-bold text-rose-800">
            <Rich text={USE2_EXAMPLE_1_NOTE_2} />
          </div>
        </div>
        <SourceLine en={USE2_EXAMPLE_2} tone="focus" />
        <div className="grid gap-1 sm:grid-cols-2">
          <div className="rounded-xl bg-amber-50 p-2 text-center text-xs font-bold text-amber-900">
            <Rich text={USE2_EXAMPLE_2_NOTE_1} />
          </div>
          <div className="rounded-xl bg-rose-50 p-2 text-center text-xs font-bold text-rose-800">
            <Rich text={USE2_EXAMPLE_2_NOTE_2} />
          </div>
        </div>
        <SourceLine en={USE2_EXAMPLE_3} tone="focus" />
        <div className="grid gap-1 sm:grid-cols-2">
          <div className="rounded-xl bg-amber-50 p-2 text-center text-xs font-bold text-amber-900">
            <Rich text={USE2_EXAMPLE_3_NOTE_1} />
          </div>
          <div className="rounded-xl bg-rose-50 p-2 text-center text-xs font-bold text-rose-800">
            <Rich text={USE2_EXAMPLE_3_NOTE_2} />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

function VeryImportantLab() {
  return (
    <LabPanel emoji="🚨" label="VERY IMPORTANT" ar="ليس طويلًا مقابل قصير بالضرورة" seq="l25-very-important">
      <div className="text-center text-lg font-black text-rose-800">
        <Rich text={VERY_IMPORTANT_TITLE} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-semibold leading-relaxed text-slate-700">
        <Rich text={VERY_IMPORTANT_1} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
        <div className="text-sm font-bold text-indigo-900">
          <Rich text={VERY_IMPORTANT_2} />
        </div>
        <div className="mt-2 space-y-1">
          <En className="block rounded-xl bg-white px-3 py-2 text-base font-black text-indigo-900">{VERY_IMPORTANT_3}</En>
          <En className="block rounded-xl bg-white px-3 py-2 text-base font-black text-slate-900">{VERY_IMPORTANT_4}</En>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Use 3
// ============================================================
function Use3Lab() {
  const [mode, setMode] = useState<"single" | "parallel">("single");
  return (
    <LabPanel emoji="↔️" label="USE 3 — SIMULTANEOUS ACTIONS" ar="حدثان في نفس الوقت مع while" seq="l25-use3">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={USE3_TITLE} />
      </div>
      <div className="mt-1 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-semibold leading-relaxed text-slate-700">
        <Rich text={USE3_DESC} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("single")}
          className={`rounded-xl border-2 px-3 py-1.5 text-xs font-black transition ${mode === "single" ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          ongoing + ongoing
        </button>
        <button
          type="button"
          onClick={() => setMode("parallel")}
          className={`rounded-xl border-2 px-3 py-1.5 text-xs font-black transition ${mode === "parallel" ? "border-emerald-500 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          two tracks
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        <div className={`rounded-2xl border-2 p-3 transition ${mode === "single" ? "border-indigo-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"}`}>
          <SourceLine en={USE3_EXAMPLE_1} tone="focus" />
          <div className="mt-1 text-center text-xs font-bold text-slate-600">
            <Rich text={USE3_EXAMPLE_1_NOTE} />
          </div>
        </div>
        <div className={`rounded-2xl border-2 p-3 transition ${mode === "single" ? "border-indigo-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"}`}>
          <SourceLine en={USE3_EXAMPLE_2} tone="focus" />
          <div className="mt-1 text-center text-xs font-bold text-slate-600">
            <Rich text={USE3_EXAMPLE_2_NOTE} />
          </div>
        </div>
        <SourceLine en={USE3_EXAMPLE_3} tone="focus" />
      </div>
      <div className="mt-3 rounded-2xl border-2 border-indigo-100 bg-white p-3">
        <div className="flex justify-center gap-2">
          <En className="rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-black text-white">Track A: I was studying</En>
          <En className="rounded-lg bg-sky-600 px-2.5 py-1 text-xs font-black text-white">Track B: my sister was watching TV</En>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-amber-400 to-sky-500" />
        </div>
        <div className="mt-1 text-center text-xs font-bold text-slate-500">Both timelines remain active simultaneously ↔️</div>
      </div>
    </LabPanel>
  );
}

function ParallelPatternLab() {
  return (
    <LabPanel emoji="🧠" label="PARALLEL ACTION PATTERN" ar="النمط المتوازي" seq="l25-parallel">
      <div className="text-center text-base font-black text-indigo-900">
        <Rich text={PARALLEL_PATTERN_TITLE} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap items-center justify-center gap-2">
        <En className="rounded-xl bg-amber-500 px-3 py-1.5 text-sm font-black text-white">{PARALLEL_PATTERN_A}</En>
        <En className="rounded-xl bg-indigo-700 px-3 py-1.5 text-sm font-black text-white">while</En>
        <En className="rounded-xl bg-sky-600 px-3 py-1.5 text-sm font-black text-white">{PARALLEL_PATTERN_A}</En>
      </div>
      <div className="mt-3 flex justify-center">
        <En className="rounded-xl border-2 border-indigo-300 bg-white px-3 py-2 text-base font-black text-indigo-900">{PARALLEL_PATTERN_EXAMPLE}</En>
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={PARALLEL_PATTERN_NOTE} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// Use 4 — Story Setting
// ============================================================
function Use4Lab() {
  const [focus, setFocus] = useState<"background" | "event">("background");
  return (
    <LabPanel emoji="🎬" label="USE 4 — STORY BACKGROUND" ar="الخلفية مقابل الحدث" seq="l25-use4">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={USE4_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-700">
        <Rich text={USE4_DESC} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setFocus("background")}
          className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${focus === "background" ? "border-amber-500 bg-amber-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          🎥 Background
        </button>
        <button
          type="button"
          onClick={() => setFocus("event")}
          className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${focus === "event" ? "border-rose-500 bg-rose-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          📸 Event
        </button>
      </div>
      <div className="mt-3 space-y-2">
        {USE4_STORY_LINES.map((line, i) => {
          const isEvent = i === USE4_STORY_LINES.length - 1;
          const dim = (focus === "background" && isEvent) || (focus === "event" && !isEvent);
          return (
            <div key={line} className={`rounded-2xl border-2 p-3 transition ${dim ? "border-slate-100 bg-white/60 opacity-50" : isEvent ? "border-rose-300 bg-rose-50" : "border-amber-300 bg-amber-50"}`}>
              <En className={`block text-left text-base font-black ${isEvent ? "text-rose-800" : "text-amber-900"}`}>{line}</En>
            </div>
          );
        })}
      </div>
      <div className={`mt-2 rounded-xl px-3 py-2 text-xs font-bold ${focus === "background" ? "bg-amber-100 text-amber-900" : "bg-rose-100 text-rose-800"}`}>
        {focus === "background" ? (
          <Rich text="Past Continuous creates the background: was blowing / was falling / were running" />
        ) : (
          <Rich text="Past Simple introduces the important event: came" />
        )}
      </div>
      <div className="mt-3 space-y-1">
        <div dir="ltr" className="ltr-row flex flex-wrap justify-center gap-1.5">
          {USE4_NOTICE_LINES.map((line) => (
            <En key={line} className="rounded-lg bg-white px-2.5 py-1 text-xs font-black text-indigo-900">{line}</En>
          ))}
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={USE4_EXPLAIN_1} />
        </div>
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={USE4_EXPLAIN_2} />
        </div>
        <div className="mt-1 text-center text-xs font-bold text-slate-500">
          <Rich text={USE4_EXPLAIN_3} />
        </div>
      </div>
    </LabPanel>
  );
}

function MovieCameraLab() {
  const [mode, setMode] = useState<"recording" | "click">("recording");
  return (
    <LabPanel emoji="🎥" label="MOVIE-CAMERA IDEA" ar="كاميرا الفيلم: الخلفية مقابل الحدث" seq="l25-movie">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={MOVIE_CAMERA_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-700">
        <Rich text={MOVIE_CAMERA_IDEA_1} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("recording")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${mode === "recording" ? "border-amber-500 bg-amber-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          🎥 RECORDING
        </button>
        <button
          type="button"
          onClick={() => setMode("click")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${mode === "click" ? "border-rose-500 bg-rose-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          📸 CLICK
        </button>
      </div>
      <div className="mt-3 space-y-2">
        <div className={`rounded-2xl border-2 p-3 transition ${mode === "recording" ? "border-amber-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-60"}`}>
          <div className="text-center text-xs font-black uppercase tracking-wide text-amber-700">🎥 RECORDING — Past Continuous</div>
          <div dir="ltr" className="ltr-row mt-1.5 grid gap-1.5">
            {MOVIE_CAMERA_RECORDING.map((line) => (
              <En key={line} className="rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-black text-amber-900">{line}</En>
            ))}
          </div>
        </div>
        <div className={`rounded-2xl border-2 p-3 transition ${mode === "click" ? "border-rose-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-60"}`}>
          <div className="text-center text-xs font-black uppercase tracking-wide text-rose-700">📸 CLICK — Past Simple</div>
          <En className="mt-1 block text-center text-base font-black text-rose-800">{MOVIE_CAMERA_SUDDENLY}</En>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-sm font-black text-slate-800">
          <Rich text={MOVIE_CAMERA_DIFF} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={MOVIE_CAMERA_PAST_CONT} />
        </div>
        <div className="text-sm font-bold text-slate-600">
          <Rich text={MOVIE_CAMERA_PAST_SIMPLE} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Signal Words
// ============================================================
function SignalWordsLab() {
  return (
    <LabPanel emoji="⭐" label="SIGNAL WORDS" ar="الكلمات الإشارية مع الترجمة" seq="l25-signal-words">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={SIGNAL_WORDS_DESC} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {SIGNAL_WORDS.map((row) => (
          <div key={row.en} className="flex items-center justify-between rounded-2xl border-2 border-white bg-white p-3">
            <En className="rounded-lg bg-indigo-700 px-2.5 py-1 text-sm font-black text-white">{row.en}</En>
            <span className="text-sm font-bold text-slate-600">= <LatinRuns text={row.ar ?? ""} /></span>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

function SignalRememberLab() {
  return (
    <LabPanel emoji="🚨" label="BUT REMEMBER" ar="الكلمات الإشارية مجرد أدلة" seq="l25-signal-remember">
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3 text-center">
        <div className="text-sm font-bold text-amber-900">
          <Rich text={SIGNAL_REMEMBER_1} />
        </div>
        <div className="mt-1 text-sm font-bold text-amber-900">
          <Rich text={SIGNAL_REMEMBER_2} />
        </div>
      </div>
      <div className="mt-2 grid gap-2">
        <SourceLine en={SIGNAL_REMEMBER_EXAMPLE_1} tone="good" />
        <SourceLine en={SIGNAL_REMEMBER_EXAMPLE_2} tone="focus" />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-black text-indigo-900">
        <Rich text={SIGNAL_REMEMBER_MEANING} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// Past Simple vs Past Continuous
// ============================================================
function VsCompareLab() {
  return (
    <LabPanel emoji="🧠" label="PAST SIMPLE vs PAST CONTINUOUS" ar="مقارنة مباشرة" seq="l25-vs">
      <div className="text-center text-base font-black text-indigo-900">
        <Rich text={VS_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={VS_DESC} />
      </div>
      <div className="mt-3 space-y-3">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <En className="block text-left text-base font-black text-slate-900">{VS_COMPARE_1_A}</En>
          <div className="mt-1 h-px bg-slate-100" />
          <En className="mt-1 block text-left text-base font-black text-indigo-900">{VS_COMPARE_1_B}</En>
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <En className="block text-left text-base font-black text-slate-900">{VS_COMPARE_2_A}</En>
          <div className="mt-1 h-px bg-slate-100" />
          <En className="mt-1 block text-left text-base font-black text-indigo-900">{VS_COMPARE_2_B}</En>
        </div>
      </div>
    </LabPanel>
  );
}

function SideBySideLab() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="⚔️" label="SIDE-BY-SIDE" ar="جنبًا إلى جنب — حدث مكتمل مقابل حدث قيد التقدم" seq="l25-side">
      <div className="text-center text-base font-black text-indigo-900">
        <Rich text={SIDE_BY_SIDE_TITLE} />
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {SIDE_BY_SIDE_ITEMS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-2 w-8 rounded-full transition ${active === i ? "bg-indigo-700" : "bg-slate-200"}`}
            aria-label={`Pair ${i + 1}`}
          />
        ))}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-3">
          <div className="text-center text-xs font-black uppercase tracking-wide text-slate-600">Past Simple — completed event</div>
          <En className="mt-2 block rounded-xl bg-white px-3 py-2 text-center text-base font-black text-slate-900">{SIDE_BY_SIDE_ITEMS[active].past}</En>
        </div>
        <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50 p-3">
          <div className="text-center text-xs font-black uppercase tracking-wide text-indigo-700">Past Continuous — in progress</div>
          <En className="mt-2 block rounded-xl bg-white px-3 py-2 text-center text-base font-black text-indigo-900">{SIDE_BY_SIDE_ITEMS[active].cont}</En>
        </div>
      </div>
      <div className="mt-2 grid gap-2">
        {SIDE_BY_SIDE_ITEMS.map((pair, i) => (
          <div key={pair.past} className={`rounded-xl border-2 p-2 text-sm ${active === i ? "border-indigo-300 bg-white" : "border-slate-100 bg-white/60 opacity-70"}`}>
            <div dir="ltr" className="ltr-row flex flex-wrap gap-2">
              <En className="rounded bg-slate-100 px-2 py-1 text-xs font-black text-slate-700">{pair.past}</En>
              <span className="text-slate-400">↔</span>
              <En className="rounded bg-indigo-100 px-2 py-1 text-xs font-black text-indigo-800">{pair.cont}</En>
            </div>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

function DecisionQuestionLab() {
  const [q, setQ] = useState<"event" | "progress" | null>(null);
  return (
    <LabPanel emoji="🧠" label="DECISION QUESTION" ar="سؤال يحدد الزمن" seq="l25-decision">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={DECISION_QUESTION_TITLE} />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setQ("event")}
          className={`rounded-2xl border-2 p-3 text-center transition ${q === "event" ? "border-slate-400 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"}`}
        >
          <Rich text={DECISION_QUESTION_1} />
        </button>
        <button
          type="button"
          onClick={() => setQ("progress")}
          className={`rounded-2xl border-2 p-3 text-center transition ${q === "progress" ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-700"}`}
        >
          <Rich text={DECISION_QUESTION_2} />
        </button>
      </div>
      {q && (
        <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
          <En className={`rounded-xl px-4 py-2 text-lg font-black ${q === "event" ? "bg-slate-900 text-white" : "bg-indigo-700 text-white"}`}>{q === "event" ? "Past Simple" : "Past Continuous"}</En>
          <div className="mt-1 text-sm font-bold text-slate-600">{q === "event" ? "I watched a movie last night." : "I was watching a movie at 9:00 last night."}</div>
        </div>
      )}
    </LabPanel>
  );
}

// ============================================================
// Negative
// ============================================================
function NegativeLab() {
  return (
    <LabPanel emoji="⭐" label="NEGATIVE FORM" ar="صيغة النفي" seq="l25-negative">
      <div dir="ltr" className="ltr-row flex justify-center">
        <En className="rounded-2xl bg-slate-900 px-4 py-2 text-lg font-black text-white">{NEGATIVE_STRUCTURE}</En>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
          <div className="text-center text-sm font-black text-sky-800">{NEGATIVE_WAS_NOT_LABEL}</div>
          <div dir="ltr" className="ltr-row mt-1 grid gap-1.5">
            {NEGATIVE_WAS_NOT.map((line) => (
              <En key={line} className="rounded-lg bg-sky-50 px-2.5 py-1 text-sm font-black text-sky-900">{line}</En>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
          <div className="text-center text-sm font-black text-emerald-800">{NEGATIVE_WERE_NOT_LABEL}</div>
          <div dir="ltr" className="ltr-row mt-1 grid gap-1.5">
            {NEGATIVE_WERE_NOT.map((line) => (
              <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">{line}</En>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-indigo-100 bg-white p-3">
        <div className="text-center text-sm font-black text-indigo-900">
          <Rich text={NEGATIVE_RULE} />
        </div>
      </div>
    </LabPanel>
  );
}

function ContractionsLab() {
  return (
    <LabPanel emoji="🔥" label="CONTRACTIONS" ar="الاختصارات" seq="l25-contractions">
      <div className="text-center text-base font-black text-indigo-900">
        <Rich text={CONTRACTIONS_TITLE} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {CONTRACTIONS.map((line) => (
          <En key={line} className="rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-black text-white">{line}</En>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {CONTRACTIONS_EXAMPLES.map((line) => (
          <En key={line} className="rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 text-sm font-black text-indigo-900">{line}</En>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center">
          <div className="text-sm font-bold text-slate-600">Positive:</div>
          <En className="mt-1 block text-base font-black text-emerald-800">{NEGATIVE_COMPARE_POS_1}</En>
          <En className="mt-1 block text-base font-black text-emerald-800">{NEGATIVE_COMPARE_POS_2}</En>
        </div>
        <div className="rounded-2xl border-2 border-rose-200 bg-white p-3 text-center">
          <div className="text-sm font-bold text-slate-600">Negative:</div>
          <En className="mt-1 block text-base font-black text-rose-700">{NEGATIVE_COMPARE_NEG_1}</En>
          <En className="mt-1 block text-base font-black text-rose-700">{NEGATIVE_COMPARE_NEG_2}</En>
        </div>
      </div>
      <div className="mt-2 text-center text-sm font-black text-indigo-900">
        <Rich text={NEGATIVE_RULE} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// Questions
// ============================================================
function QuestionsLab() {
  const [flip, setFlip] = useState(false);
  return (
    <LabPanel emoji="⭐" label="QUESTIONS" ar="الأسئلة — قلب الترتيب" seq="l25-questions">
      <div dir="ltr" className="ltr-row flex justify-center">
        <En className="rounded-2xl bg-indigo-700 px-4 py-2 text-lg font-black text-white">{QUESTION_FORMULA}</En>
      </div>
      <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {QUESTION_EXAMPLES.map((line) => (
          <En key={line} className="rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 text-base font-black text-indigo-900">{line}</En>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-black text-slate-700">
          <Rich text={QUESTION_FORMULA_TITLE} />
        </div>
        <div className="mt-2 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setFlip(!flip)}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-black text-white"
          >
            {flip ? "Show Question →" : "Statement → Question"}
          </button>
          <div dir="ltr" className="ltr-row flex flex-wrap items-center justify-center gap-2">
            <En className={`rounded-xl border-2 px-3 py-2 text-base font-black ${!flip ? "border-indigo-300 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-400"}`}>{QUESTION_STATEMENT}</En>
            <span className="text-xl">→</span>
            <En className={`rounded-xl border-2 px-3 py-2 text-base font-black ${flip ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-400"}`}>{QUESTION_Q}</En>
          </div>
          <div className="text-sm font-bold text-slate-600">
            <Rich text={QUESTION_EXPLAIN_1} />
          </div>
          <En className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-800">{QUESTION_EXAMPLE_2}</En>
        </div>
      </div>
    </LabPanel>
  );
}

function ShortAnswersLab() {
  const [active, setActive] = useState(0);
  const qa = SHORT_ANSWERS[active];
  return (
    <LabPanel emoji="⭐" label="SHORT ANSWERS" ar="الإجابات القصيرة" seq="l25-short">
      <div className="flex flex-wrap justify-center gap-2">
        {SHORT_ANSWERS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-2 w-8 rounded-full transition ${active === i ? "bg-indigo-700" : "bg-slate-200"}`}
          />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <En className="block text-center text-lg font-black text-indigo-900">{qa.q}</En>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl bg-emerald-50 p-2 text-center">
            <En className="text-sm font-black text-emerald-800">{qa.yes}</En>
          </div>
          <div className="rounded-xl bg-rose-50 p-2 text-center">
            <En className="text-sm font-black text-rose-700">{qa.no}</En>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
        <div className="text-center text-sm font-black text-rose-800">
          <Rich text={COMMON_MISTAKE_TITLE} />
        </div>
        <En className="mt-1 block text-center text-lg font-black text-rose-700">{COMMON_MISTAKE_Q}</En>
        <div className="mt-1 flex flex-wrap justify-center gap-2">
          <En className="rounded-xl border-2 border-rose-300 bg-white px-3 py-1.5 text-sm font-black text-rose-700 line-through">{COMMON_MISTAKE_WRONG}</En>
          <En className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-black text-white">{COMMON_MISTAKE_CORRECT}</En>
        </div>
        <div className="mt-1 text-center text-xs font-bold text-slate-600">
          <Rich text={COMMON_MISTAKE_WHY_1} />
        </div>
      </div>
      <div className="mt-2 grid gap-2">
        {SHORT_ANSWERS.map((item) => (
          <div key={item.q} className="rounded-xl border-2 border-slate-100 bg-white p-2">
            <En className="block text-left text-sm font-black text-slate-900">{item.q}</En>
            <div dir="ltr" className="ltr-row mt-1 flex gap-2">
              <En className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-black text-emerald-800">{item.yes}</En>
              <En className="rounded bg-rose-50 px-2 py-0.5 text-xs font-black text-rose-700">{item.no}</En>
            </div>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// Wh-Questions
// ============================================================
function WhQuestionsLab() {
  return (
    <LabPanel emoji="⭐" label="WH-QUESTIONS" ar="أسئلة Wh مع الماضي المستمر" seq="l25-wh">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={WH_DESC} />
      </div>
      <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
        {["What", "Where", "When", "Why", "Who", "How"].map((w) => (
          <En key={w} className="rounded-lg bg-indigo-700 px-2.5 py-1 text-sm font-black text-white">{w}</En>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        {WH_EXAMPLES.map((row) => (
          <SourceLine key={row.en} en={row.en} ar={row.ar} tone="focus" />
        ))}
      </div>
      <div className="mt-3 flex justify-center">
        <En className="rounded-2xl bg-slate-900 px-4 py-2 text-base font-black text-white">{WH_STRUCTURE}</En>
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {WH_EXAMPLES_2.map((line) => (
          <En key={line} className="rounded-xl border-2 border-violet-200 bg-white px-3 py-2 text-sm font-black text-violet-900">{line}</En>
        ))}
      </div>
    </LabPanel>
  );
}

function WhatWereDoingLab() {
  const [ans, setAns] = useState(0);
  return (
    <LabPanel emoji="⭐" label="WHAT WERE YOU DOING?" ar="سؤال مفيد للغاية" seq="l25-wwyd">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={WWYD_DESC} />
      </div>
      <En className="mt-2 block rounded-2xl bg-indigo-700 px-4 py-3 text-center text-lg font-black text-white">{WWYD_Q}</En>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">Possible answers:</div>
      <div className="mt-1 flex flex-wrap justify-center gap-2">
        {WWYD_ANSWERS.map((a, i) => (
          <button
            key={a}
            type="button"
            onClick={() => setAns(i)}
            dir="ltr"
            className={`ltr-row rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${ans === i ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-700"}`}
          >
            {a}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-sm font-bold text-slate-600">
          <Rich text={WWYD_NOTICE_TITLE} />
        </div>
        <En className="mt-1 block text-lg font-black text-indigo-900">{WWYD_NOTICE_Q}</En>
        <En className="mt-1 block rounded-xl bg-emerald-50 px-3 py-1.5 text-base font-black text-emerald-800">{WWYD_NOTICE_A}</En>
        <div className="mt-1 rounded-xl bg-rose-50 p-2 text-center text-xs font-bold text-rose-700">
          <Rich text={WWYD_NOTICE_WRONG} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// -ING Lab
// ============================================================
function IngLab() {
  const [rule, setRule] = useState<1 | 2 | 3>(1);
  const verbsRule1 = ING_RULE1;
  const verbsRule2 = ING_RULE2;
  const verbsRule3 = ING_RULE3;
  return (
    <LabPanel emoji="⭐" label="THE -ING LAB" ar="معمل -ING التفاعلي" seq="l25-ing">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={ING_DESC} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {[1, 2, 3].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRule(r as 1 | 2 | 3)}
            className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${rule === r ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
          >
            Rule {r}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-3">
        <div className={`rounded-2xl border-2 p-3 transition ${rule === 1 ? "border-indigo-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"}`}>
          <div className="text-center text-sm font-black text-indigo-900">
            <Rich text={ING_RULE1_TITLE} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
            {verbsRule1.map((line) => (
              <En key={line} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-black text-emerald-800">{line}</En>
            ))}
          </div>
        </div>
        <div className={`rounded-2xl border-2 p-3 transition ${rule === 2 ? "border-violet-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"}`}>
          <div className="text-center text-sm font-black text-violet-900">
            <Rich text={ING_RULE2_TITLE} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
            {verbsRule2.map((line) => (
              <En key={line} className="rounded-lg bg-violet-50 px-2.5 py-1 text-sm font-black text-violet-800">{line}</En>
            ))}
          </div>
          <div className="mt-1 text-center text-xs font-bold text-slate-500">
            <Rich text={ING_RULE2_NOTE} />
          </div>
        </div>
        <div className={`rounded-2xl border-2 p-3 transition ${rule === 3 ? "border-amber-300 bg-white shadow" : "border-slate-200 bg-white/60 opacity-70"}`}>
          <div className="text-center text-sm font-black text-amber-900">
            <Rich text={ING_RULE3_TITLE} />
          </div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
            {verbsRule3.map((line) => (
              <En key={line} className="rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-black text-amber-900">{line}</En>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-sm font-black text-slate-700">
          <Rich text={ING_WHY_TITLE} />
        </div>
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={ING_WHY} />
        </div>
      </div>
      {/* Interactive: choose verb */}
      <div className="mt-3 rounded-2xl border-2 border-indigo-100 bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">اختر فعلًا وشاهد التحويل:</div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {[
            ["play", "playing"],
            ["make", "making"],
            ["run", "running"],
          ].map(([base, ing]) => (
            <div key={base} className="rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-center">
              <En className="text-sm font-black text-slate-800">{base} → {ing}</En>
            </div>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Present vs Past Timeline
// ============================================================
function PresentPastTimeline() {
  return (
    <LabPanel emoji="🕒" label="TIMELINE — PRESENT vs PAST" ar="الزمن الماضي مقابل الحاضر" seq="l25-timeline">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={PRESENT_VS_PAST_DESC} />
      </div>
      <div className="mt-2 grid gap-2">
        {PRESENT_VS_PAST_PAIRS.map((pair) => (
          <div key={pair.present} className="grid gap-2 sm:grid-cols-2">
            <En className="rounded-xl border-2 border-sky-300 bg-sky-50 px-3 py-2 text-center text-sm font-black text-sky-900">{pair.present}</En>
            <En className="rounded-xl border-2 border-violet-300 bg-violet-50 px-3 py-2 text-center text-sm font-black text-violet-800">{pair.past}</En>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-black text-slate-700">
          <Rich text={TIMELINE_TITLE} />
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <div className="rounded-xl bg-sky-600 px-3 py-2 text-center text-sm font-black text-white">
            <En>{TIMELINE_PRESENT}</En>
          </div>
          <div className="rounded-xl bg-violet-700 px-3 py-2 text-center text-sm font-black text-white">
            <En>{TIMELINE_PAST}</En>
          </div>
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={TIMELINE_STRUCTURE_TITLE} />
        </div>
      </div>
      <div className="mt-2 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center">
        <div className="text-sm font-black text-indigo-900">
          <Rich text={MASTER_PATTERN_TITLE} />
        </div>
        <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
          <En className="rounded-xl bg-sky-600 px-3 py-1.5 text-sm font-black text-white">{MASTER_PATTERN_PRESENT}</En>
          <span>→</span>
          <En className="rounded-xl bg-violet-700 px-3 py-1.5 text-sm font-black text-white">{MASTER_PATTERN_PAST}</En>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Past Simple + Past Continuous (when)
// ============================================================
function CombinedPatternLab() {
  const [order, setOrder] = useState<"contWhenSimple" | "simpleWhileCont">("contWhenSimple");
  return (
    <LabPanel emoji="⭐" label="PAST SIMPLE + PAST CONTINUOUS" ar="الماضي المستمر + when + الماضي البسيط" seq="l25-combined">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={COMBINED_PATTERN_DESC} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex justify-center">
        <En className="rounded-2xl bg-slate-900 px-4 py-2 text-lg font-black text-white">{COMBINED_PATTERN}</En>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setOrder("contWhenSimple")}
          className={`rounded-xl border-2 px-3 py-1.5 text-xs font-black transition ${order === "contWhenSimple" ? "border-indigo-500 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          <En>Past Cont + when + Past Simple</En>
        </button>
        <button
          type="button"
          onClick={() => setOrder("simpleWhileCont")}
          className={`rounded-xl border-2 px-3 py-1.5 text-xs font-black transition ${order === "simpleWhileCont" ? "border-violet-500 bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          <En>Past Simple + while + Past Cont</En>
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        {(order === "contWhenSimple" ? COMBINED_EXAMPLES : REVERSE_EXAMPLES).map((line) => (
          <SourceLine key={line} en={line} tone="focus" />
        ))}
      </div>
      {order === "contWhenSimple" && (
        <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-bold text-slate-700">
          <Rich text={COMBINED_EXPLAIN} />
        </div>
      )}
      {order === "simpleWhileCont" && (
        <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-bold text-slate-700">
            <Rich text={REVERSE_ORDER_TITLE} />
          </div>
          <div className="mt-1 text-center text-sm font-bold text-slate-600">
            <Rich text={REVERSE_ORDER_DESC} />
          </div>
          <div className="mt-1 text-center text-sm font-bold text-slate-700">
            <Rich text={REVERSE_NOTE} />
          </div>
        </div>
      )}
    </LabPanel>
  );
}

function WhenWhileLab() {
  const [mode, setMode] = useState<"when" | "while">("when");
  return (
    <LabPanel emoji="🧠" label="WHEN vs WHILE SWITCH" ar="بدّل بين when و while" seq="l25-whenwhile">
      <div className="text-center text-lg font-black text-indigo-900">
        <Rich text={WHEN_WHILE_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-700">
        <Rich text={WHEN_WHILE_DESC} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("when")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${mode === "when" ? "border-amber-500 bg-amber-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          <En>when</En>
        </button>
        <button
          type="button"
          onClick={() => setMode("while")}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${mode === "while" ? "border-sky-500 bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}
        >
          <En>while</En>
        </button>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        {mode === "when" ? (
          <En className="block text-center text-base font-black text-amber-900">{WHEN_WHILE_WHEN}</En>
        ) : (
          <En className="block text-center text-base font-black text-sky-900">{WHEN_WHILE_WHILE}</En>
        )}
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={WHEN_WHILE_BOTH} />
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <En className={`rounded-xl px-3 py-1.5 text-sm font-black ${mode === "when" ? "bg-amber-500 text-white" : "bg-white border-2 border-amber-200 text-amber-900"}`}>I was studying when my friend called.</En>
          <En className={`rounded-xl px-3 py-1.5 text-sm font-black ${mode === "while" ? "bg-sky-600 text-white" : "bg-white border-2 border-sky-200 text-sky-900"}`}>My friend called while I was studying.</En>
        </div>
      </div>
    </LabPanel>
  );
}

function TwoContWhileLab() {
  return (
    <LabPanel emoji="⭐" label="TWO CONTINUOUS WITH WHILE" ar="فعلان مستمران مع while" seq="l25-two-cont">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={TWO_CONT_DESC} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex justify-center">
        <En className="rounded-2xl bg-slate-900 px-4 py-2 text-base font-black text-white">{TWO_CONT_PATTERN}</En>
      </div>
      <div className="mt-3 grid gap-2">
        {TWO_CONT_EXAMPLES.map((line) => (
          <SourceLine key={line} en={line} tone="focus" />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-indigo-100 bg-white p-3">
        <div className="text-center text-sm font-black text-indigo-900">
          <Rich text={TWO_CONT_IMPORTANT_TITLE} />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text="Compare:" />
        </div>
        <div className="mt-1 grid gap-2">
          <div className="rounded-xl bg-amber-50 p-2 text-center text-xs font-bold text-amber-900">
            <En>{TWO_CONT_COMPARE_A}</En>
          </div>
          <div className="rounded-xl bg-sky-50 p-2 text-center text-xs font-bold text-sky-900">
            <En>{TWO_CONT_COMPARE_B}</En>
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Story Mode
// ============================================================
function StoryModeLab() {
  const [step, setStep] = useState(0);
  const bgLines = STORY_MODE_LINES.slice(0, 5);
  const eventLines = STORY_MODE_LINES.slice(5);
  return (
    <LabPanel emoji="🎬" label="STORY MODE" ar="فيلم قصير — الخلفية والحدث" seq="l25-storymode">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={STORY_MODE_DESC} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600"
        >
          ← Prev
        </button>
        <span className="rounded-xl bg-indigo-700 px-3 py-1.5 text-sm font-black text-white">{step + 1} / {STORY_MODE_LINES.length}</span>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(STORY_MODE_LINES.length - 1, s + 1))}
          className="rounded-xl bg-indigo-700 px-3 py-1.5 text-sm font-black text-white"
        >
          Next →
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        {STORY_MODE_LINES.map((line, i) => {
          const active = i === step;
          const isBg = i < 5;
          return (
            <div key={line} className={`rounded-2xl border-2 p-3 transition ${active ? (isBg ? "border-amber-400 bg-amber-50 shadow" : "border-rose-400 bg-rose-50 shadow") : "border-white bg-white opacity-60"}`}>
              <En className={`block text-left text-base font-black ${isBg ? "text-amber-900" : "text-rose-800"}`}>{line}</En>
              <div className="mt-1 text-xs font-bold text-slate-500">{isBg ? "🎥 Background (Past Continuous)" : "📸 Event (Past Simple)"}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-sm font-bold text-slate-700">
          <Rich text={STORY_MODE_WHY} />
        </div>
        <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
          {bgLines.slice(1).map((line) => (
            <En key={line} className="rounded-lg bg-amber-100 px-2 py-1 text-xs font-black text-amber-900">{line}</En>
          ))}
        </div>
        <div className="mt-1 text-sm font-black text-amber-900">
          <Rich text={STORY_MODE_BACKGROUND} />
        </div>
        <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-1.5">
          {eventLines.map((line) => (
            <En key={line} className="rounded-lg bg-rose-100 px-2 py-1 text-xs font-black text-rose-800">{line}</En>
          ))}
        </div>
        <div className="mt-1 text-sm font-black text-rose-800">
          <Rich text={STORY_MODE_EVENTS} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Grammar Detective 8
// ============================================================
function DetectiveLab() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const toggle = (n: number) => setRevealed((s) => {
    const next = new Set(s);
    if (next.has(n)) next.delete(n);
    else next.add(n);
    return next;
  });
  return (
    <LabPanel emoji="🕵️" label="GRAMMAR DETECTIVE" ar="8 أخطاء — اكتشف وصحح" seq="l25-detective">
      <div className="text-center text-lg font-black text-rose-800">
        <Rich text={DETECTIVE_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={DETECTIVE_SUBTITLE} />
      </div>
      <div className="mt-3 grid gap-2">
        {DETECTIVE_ITEMS.map((item) => {
          const on = revealed.has(item.n);
          return (
            <div key={item.n} className={`rounded-2xl border-2 p-3 transition ${on ? "border-emerald-300 bg-white shadow" : "border-slate-200 bg-white"}`}>
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-rose-600 text-xs font-black text-white">{item.n}</span>
                <En className="flex-1 text-left text-sm font-black text-rose-700 line-through">{item.wrong} ❌</En>
                <button
                  type="button"
                  onClick={() => toggle(item.n)}
                  className={`rounded-lg px-2 py-1 text-xs font-black transition ${on ? "bg-slate-900 text-white" : "bg-indigo-100 text-indigo-700"}`}
                >
                  {on ? "Hide" : "Reveal"}
                </button>
              </div>
              {on && (
                <div dir="ltr" className="ltr-row mt-2">
                  <En className="block rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-left text-sm font-black text-emerald-800">{item.correct} ✅</En>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// IQ200
// ============================================================
function IQ200Lab() {
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = pick === IQ200_CORRECT_INDEX;
  return (
    <LabPanel emoji="🚀" label="IQ200" ar="اختر الجملة الصحيحة" seq="l25-iq200">
      <div className="text-center text-lg font-black text-fuchsia-900">
        <Rich text={IQ200_TITLE} />
      </div>
      <div className="mt-1 text-center text-sm font-bold text-slate-600">
        <Rich text={IQ200_QUESTION} />
      </div>
      <div className="mt-2 grid gap-2">
        {IQ200_OPTIONS.map((opt, i) => {
          const isPick = pick === i;
          const isCorrect = i === IQ200_CORRECT_INDEX;
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-fuchsia-300";
          if (checked) {
            if (isCorrect) cls = "border-emerald-300 bg-emerald-50 text-emerald-800";
            else if (isPick) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-100 bg-white text-slate-400";
          } else if (isPick) {
            cls = "border-fuchsia-500 bg-fuchsia-600 text-white";
          }
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setPick(i)}
              disabled={checked}
              dir="ltr"
              className={`ltr-row rounded-xl border-2 p-3 text-left transition ${cls}`}
            >
              <span className="font-black text-sm">{String.fromCharCode(65 + i)}.</span>
              <En className="ml-2 text-sm font-black">{opt}</En>
            </button>
          );
        })}
      </div>
      {!checked ? (
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={pick === null}
          className="mt-3 w-full rounded-xl bg-fuchsia-700 px-4 py-2.5 text-sm font-black text-white disabled:opacity-30"
        >
          تحقق من الإجابة
        </button>
      ) : (
        <div className={`mt-3 rounded-2xl border-2 p-3 text-center ${correct ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"}`}>
          <div className={`text-base font-black ${correct ? "text-emerald-800" : "text-rose-700"}`}>{correct ? "✓ Correct! A." : `✕ Correct is ${IQ200_CORRECT_LETTER}.`}</div>
          <div className="mt-1 text-sm font-bold text-slate-700">
            <Rich text={IQ200_WHY_TITLE} />
          </div>
          <div className="mt-1 text-sm font-bold text-slate-600">
            <Rich text={IQ200_WHY} />
          </div>
          <button
            type="button"
            onClick={() => {
              setPick(null);
              setChecked(false);
            }}
            className="mt-2 rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-slate-600"
          >
            ↺ إعادة
          </button>
        </div>
      )}
    </LabPanel>
  );
}

// ============================================================
// Exercises — generic Drill component (neutral → check)
// ============================================================

function Drill({
  seq,
  intro,
  options,
  items,
  accent,
}: {
  seq: string;
  intro: string;
  options: readonly string[];
  items: { n: number | string; stem: string; answer: number | string; why?: string }[];
  accent: "indigo" | "sky" | "emerald" | "violet" | "rose" | "fuchsia";
}) {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const accents: Record<string, string> = {
    indigo: "bg-indigo-700",
    sky: "bg-sky-700",
    emerald: "bg-emerald-700",
    violet: "bg-violet-700",
    rose: "bg-rose-700",
    fuchsia: "bg-fuchsia-700",
  };
  const answered = items.reduce((n, _item, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === items.length;
  const score = items.reduce((sum, item, i) => {
    const ans = typeof item.answer === "string" ? options.indexOf(item.answer) : (item.answer as number);
    return sum + (pick[i] === ans ? 1 : 0);
  }, 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq={seq}>
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <div className="text-base font-bold text-slate-700">
          <Rich text={intro} />
        </div>
      </div>
      {items.map((item, i) => {
        const choice = pick[i];
        const picked = choice !== undefined;
        const correctIdx = typeof item.answer === "string" ? options.indexOf(item.answer) : (item.answer as number);
        const right = picked && choice === correctIdx;
        let card = "border-slate-200 bg-white";
        if (checked) {
          card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        } else if (picked) {
          card = "border-slate-300 bg-slate-50/70";
        }
        return (
          <div key={String(item.n)} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${accents[accent]}`}>
                {item.n}
              </span>
              <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900 md:text-lg">{item.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {options.map((option, oi) => {
                const isA = oi === correctIdx;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition active:scale-[0.98] disabled:cursor-default ${cls}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className={`mt-2 pr-11 text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                {!picked ? "⚠ لم تختر إجابة لهذا السؤال. " : right ? "✓ صحيح! " : "✕ "}
                {item.why ? <Rich text={item.why} /> : null}
                {!right && picked ? (
                  <span>
                    {" "}
                    الصحيح: <En className="font-black">{options[correctIdx]}</En>
                  </span>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "أجب عن كل الفقرات أولًا"}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow transition enabled:hover:brightness-110 disabled:opacity-30 ${accents[accent]}`}
              >
                تحقق من الإجابات ({answered}/{items.length})
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className={`grid h-12 w-12 place-items-center rounded-2xl text-lg font-extrabold text-white ${accents[accent]}`}>
                {Math.round((score / items.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">نتيجتك: {score} / {items.length}</div>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ أعد التدريب
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Special drill for Ex2: verb → answer string display after check includes both options? We'll use Drill with custom rendering for free text? But spec says 10 -ING items with options reading/reading? Actually ex2 is add -ING with blanks; we can make multiple choice with 2-3 options including correct.
// For fidelity, we create custom Ex2 component with text input simulation via choice buttons.

function Ex1() {
  return (
    <Drill
      seq="l25-ex1"
      intro="Complete with WAS or WERE:"
      options={EX1_OPTIONS as unknown as string[]}
      items={EX1_ITEMS.map((it) => ({ n: it.n, stem: it.stem, answer: EX1_OPTIONS.indexOf(it.answer as "was" | "were"), why: `${it.stem.replace("___", it.answer)}` }))}
      accent="indigo"
    />
  );
}

function Ex2() {
  // Provide options per verb? We'll show 3 options each: correct + 2 distractors
  const [pick, setPick] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const getOptions = (verb: string, answer: string): string[] => {
    // generate distractors based on rule
    const map: Record<string, string[]> = {
      read: ["reading", "readen", "readiing"],
      play: ["playing", "playen", "playying"],
      make: ["making", "makeing", "makking"],
      write: ["writing", "writeing", "writting"],
      run: ["running", "runing", "runnin"],
      sit: ["sitting", "siting", "siiting"],
      swim: ["swimming", "swiming", "swimmming"],
      dance: ["dancing", "danceing", "dancingg"],
      take: ["taking", "takeing", "takking"],
      stop: ["stopping", "stoping", "stoppingg"],
    };
    return map[verb] || [answer, answer + "x", answer + "y"];
  };
  const answered = EX2_ITEMS.reduce((n, _, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === EX2_ITEMS.length;
  const score = EX2_ITEMS.reduce((s, it, i) => s + (pick[i] === it.answer ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-ex2">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <div className="text-base font-bold text-slate-700">
          <Rich text={`${EX2_DESC} — ${EX2_TITLE}`} />
        </div>
      </div>
      {EX2_ITEMS.map((it, i) => {
        const options = getOptions(it.verb, it.answer);
        const choice = pick[i];
        const right = choice === it.answer;
        const picked = choice !== undefined;
        let card = "border-slate-200 bg-white";
        if (checked) {
          card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        } else if (picked) {
          card = "border-slate-300 bg-slate-50/70";
        }
        return (
          <div key={it.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sky-700 text-sm font-bold text-white">{it.n}</span>
              <En className="text-left text-lg font-extrabold text-slate-900">{it.verb} → ______</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {options.map((opt) => {
                const isPick = choice === opt;
                const isCorrect = opt === it.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-sky-400";
                if (checked) {
                  if (isCorrect) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: opt }))}
                    disabled={checked}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className={`mt-2 pr-11 text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                {!picked ? "⚠ لم تختر إجابة." : right ? "✓ صحيح! " : `✕ الصحيح: ${it.answer}`}
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                className="rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30"
              >
                تحقق من الإجابات ({answered}/{EX2_ITEMS.length})
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-700 text-lg font-extrabold text-white">
                {Math.round((score / EX2_ITEMS.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">نتيجتك: {score} / {EX2_ITEMS.length}</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ أعد التدريب
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Ex3() {
  // Negative: show sentence + input options? We'll use Drill with yes/no? Actually create Drill where options are affirmative vs negative? Better show 2 options: correct negative vs distractor
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const optionsFor = (i: number) => {
    const item = EX3_ITEMS[i];
    const correct = item.answer.split(" / ")[0];
    const wrong = item.sentence; // keep as wrong
    // shuffle but keep correct first? We'll make options [correct, wrong withoutn't] but ensure difference
    const altWrong = correct.replace("n't", " not") + "x"; // placeholder to ensure choice
    return [correct, wrong];
  };
  const answered = EX3_ITEMS.reduce((n, _, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === EX3_ITEMS.length;
  const score = EX3_ITEMS.reduce((s, _, i) => s + (pick[i] === 0 ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-ex3">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <Rich text={EX3_DESC} className="text-base font-bold text-slate-700" />
      </div>
      {EX3_ITEMS.map((it, i) => {
        const opts = optionsFor(i);
        const choice = pick[i];
        const right = choice === 0;
        const picked = choice !== undefined;
        let card = "border-slate-200 bg-white";
        if (checked) card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        else if (picked) card = "border-slate-300 bg-slate-50/70";
        return (
          <div key={it.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-700 text-sm font-bold text-white">{it.n}</span>
              <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900">{it.sentence}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {opts.map((opt, oi) => {
                const isCorrect = oi === 0;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-emerald-400";
                if (checked) {
                  if (isCorrect) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) cls = "border-transparent bg-slate-900 text-white";
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-3 py-2 text-sm font-black transition ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className={`mt-2 pr-11 text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                {!picked ? "⚠ لم تختر." : right ? "✓ صحيح!" : `✕ الصحيح: ${opts[0]}`}
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30"
              >
                تحقق من الإجابات ({answered}/{EX3_ITEMS.length})
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-700 text-lg font-extrabold text-white">
                {Math.round((score / EX3_ITEMS.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">نتيجتك: {score} / {EX3_ITEMS.length}</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Ex4() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const optionsFor = (i: number) => {
    const it = EX4_ITEMS[i];
    return [it.answer, it.sentence];
  };
  const answered = EX4_ITEMS.reduce((n, _, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === EX4_ITEMS.length;
  const score = EX4_ITEMS.reduce((s, _, i) => s + (pick[i] === 0 ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-ex4">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <Rich text={EX4_DESC} className="text-base font-bold text-slate-700" />
      </div>
      {EX4_ITEMS.map((it, i) => {
        const opts = optionsFor(i);
        const choice = pick[i];
        const right = choice === 0;
        const picked = choice !== undefined;
        let card = "border-slate-200 bg-white";
        if (checked) card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        else if (picked) card = "border-slate-300 bg-slate-50/70";
        return (
          <div key={it.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-700 text-sm font-bold text-white">{it.n}</span>
              <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900">{it.sentence}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {opts.map((opt, oi) => {
                const isCorrect = oi === 0;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-violet-400";
                if (checked) {
                  if (isCorrect) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) cls = "border-transparent bg-slate-900 text-white";
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-3 py-2 text-sm font-black transition ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className={`mt-2 pr-11 text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                {!picked ? "⚠ لم تختر." : right ? "✓ صحيح!" : `✕ الصحيح: ${opts[0]}`}
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                className="rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30"
              >
                تحقق من الإجابات ({answered}/{EX4_ITEMS.length})
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-700 text-lg font-extrabold text-white">
                {Math.round((score / EX4_ITEMS.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">نتيجتك: {score} / {EX4_ITEMS.length}</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Ex5() {
  return (
    <Drill
      seq="l25-ex5"
      intro={`${EX5_DESC} — ${EX5_TITLE}`}
      options={["Past Simple", "Past Continuous"]}
      items={EX5_ITEMS.map((it) => ({
        n: it.n,
        stem: `${it.stem} (${it.opts.join(" / ")})`,
        answer: it.opts[it.answer] === it.opts[0] ? 0 : 1, // but we map to label? Actually we need to show options as the two verbs? For clarity use opts directly
        why: it.why,
      }))}
      accent="indigo"
    />
  );
}

// Fix Ex5 to use actual opts per item: We'll create custom version
function Ex5Fixed() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = EX5_ITEMS.reduce((n, _, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === EX5_ITEMS.length;
  const score = EX5_ITEMS.reduce((s, it, i) => s + (pick[i] === it.answer ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-ex5">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <Rich text={`${EX5_DESC}`} className="text-base font-bold text-slate-700" />
      </div>
      {EX5_ITEMS.map((it, i) => {
        const choice = pick[i];
        const right = choice === it.answer;
        const picked = choice !== undefined;
        let card = "border-slate-200 bg-white";
        if (checked) card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        else if (picked) card = "border-slate-300 bg-slate-50/70";
        return (
          <div key={it.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">{it.n}</span>
              <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900">{it.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {it.opts.map((opt, oi) => {
                const isCorrect = oi === it.answer;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (isCorrect) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) cls = "border-transparent bg-slate-900 text-white";
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className={`mt-2 pr-11 text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                {!picked ? "⚠ لم تختر." : right ? "✓ صحيح! " : "✕ "}
                <Rich text={it.why} />
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button type="button" onClick={() => setChecked(true)} disabled={!allAnswered} className="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30">
                تحقق من الإجابات ({answered}/{EX5_ITEMS.length})
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-700 text-lg font-extrabold text-white">
                {Math.round((score / EX5_ITEMS.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">نتيجتك: {score} / {EX5_ITEMS.length}</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Ex6() {
  const [pick, setPick] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const answered = EX6_ITEMS.reduce((n, _, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === EX6_ITEMS.length;
  const score = EX6_ITEMS.reduce((s, it, i) => s + (pick[i] === it.answer ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-ex6">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <Rich text="اختر الجملة الأفضل لكل حالة — A أم B؟" className="text-base font-bold text-slate-700" />
      </div>
      {EX6_ITEMS.map((it, i) => {
        const choice = pick[i];
        const right = choice === it.answer;
        const picked = choice !== undefined;
        let card = "border-slate-200 bg-white";
        if (checked) card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        else if (picked) card = "border-slate-300 bg-slate-50/70";
        return (
          <div key={it.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">{it.n}</span>
              <div className="min-w-0 flex-1">
                <En className="block text-left text-base font-extrabold text-slate-900">A. {it.a}</En>
                <En className="mt-1 block text-left text-base font-extrabold text-slate-900">B. {it.b}</En>
              </div>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {["A", "B"].map((opt) => {
                const isCorrect = opt === it.answer;
                const isPick = choice === opt;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (isCorrect) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) cls = "border-transparent bg-slate-900 text-white";
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: opt }))}
                    disabled={checked}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-5 py-2 text-base font-black transition ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className={`mt-2 pr-11 text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                {!picked ? "⚠ لم تختر." : right ? "✓ صحيح! " : `✕ الصحيح: ${it.answer}. `}
                <Rich text={it.explain} />
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button type="button" onClick={() => setChecked(true)} disabled={!allAnswered} className="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30">
                تحقق من الإجابات ({answered}/{EX6_ITEMS.length})
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-700 text-lg font-extrabold text-white">
                {Math.round((score / EX6_ITEMS.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">نتيجتك: {score} / {EX6_ITEMS.length}</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Ex7() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const optionsFor = (i: number) => {
    const it = EX7_ITEMS[i];
    // provide 2 options: correct vs scrambled
    return [it.answer, it.scrambled];
  };
  const answered = EX7_ITEMS.reduce((n, _, i) => n + (pick[i] !== undefined ? 1 : 0), 0);
  const allAnswered = answered === EX7_ITEMS.length;
  const score = EX7_ITEMS.reduce((s, _, i) => s + (pick[i] === 0 ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-ex7">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <Rich text={EX7_DESC} className="text-base font-bold text-slate-700" />
      </div>
      {EX7_ITEMS.map((it, i) => {
        const opts = optionsFor(i);
        const choice = pick[i];
        const right = choice === 0;
        const picked = choice !== undefined;
        let card = "border-slate-200 bg-white";
        if (checked) card = !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
        else if (picked) card = "border-slate-300 bg-slate-50/70";
        return (
          <div key={it.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-700 text-sm font-bold text-white">{it.n}</span>
              <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900">{it.scrambled}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {opts.map((opt, oi) => {
                const isCorrect = oi === 0;
                const isPick = choice === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-emerald-400";
                if (checked) {
                  if (isCorrect) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) cls = "border-transparent bg-slate-900 text-white";
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-3 py-2 text-sm font-black transition ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className={`mt-2 pr-11 text-sm font-bold ${!picked ? "text-slate-500" : right ? "text-emerald-700" : "text-rose-700"}`}>
                {!picked ? "⚠ لم تختر." : right ? "✓ صحيح!" : `✕ الصحيح: ${opts[0]}`}
              </div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button type="button" onClick={() => setChecked(true)} disabled={!allAnswered} className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30">
                تحقق من الإجابات ({answered}/{EX7_ITEMS.length})
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-700 text-lg font-extrabold text-white">
                {Math.round((score / EX7_ITEMS.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">نتيجتك: {score} / {EX7_ITEMS.length}</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Ex8() {
  const [text, setText] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const allAnswered = EX8_ITEMS.every((it) => (text[it.n] || "").trim().length > 1);
  const reset = () => {
    setText({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-ex8">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <Rich text={`${EX8_DESC} — أكمل الفراغ بما يناسبك، ثم قارن مع النماذج.`} className="text-base font-bold text-slate-700" />
      </div>
      {EX8_ITEMS.map((it) => (
        <div key={it.n} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">{it.n}</span>
            <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900">{it.stem}</En>
          </div>
          <textarea
            dir="ltr"
            value={text[it.n] || ""}
            onChange={(e) => setText((p) => ({ ...p, [it.n]: e.target.value }))}
            rows={1}
            placeholder="اكتب إكمالك هنا..."
            className="font-en mt-2 w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-2 text-left text-sm font-bold text-slate-800 outline-none focus:border-indigo-400"
          />
        </div>
      ))}
      <div className="rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">أمثلة مقترحة (ليست وحيدة):</div>
        <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
          {[
            "I was studying.",
            "my family was having dinner.",
            "I was sleeping.",
            "my brother was playing.",
            "the phone rang.",
            "the lights went out.",
            "my father was watching TV.",
          ].map((line) => (
            <En key={line} className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-black text-indigo-900">{line}</En>
          ))}
        </div>
      </div>
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "أكمل كل الفراغات أولًا"}
                className="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30"
              >
                تحقق من الإكمال ({Object.keys(text).filter((k) => (text[Number(k)] || "").trim().length > 1).length}/{EX8_ITEMS.length})
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">✓ أحسنت — قارن إكمالك مع الأمثلة أعلاه. كل إكمال صحيح نحويًا مقبول.</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Detective Level 2
// ============================================================
function Detective2() {
  const [pick, setPick] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState(false);
  const answered = Object.keys(pick).length === DETECTIVE2_ERRORS.length;
  const score = DETECTIVE2_ERRORS.reduce((s, it, i) => s + (pick[i] ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-detective2">
      <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4 text-center">
        <En className="block text-left text-base font-extrabold text-slate-900">{DETECTIVE2_PARAGRAPH}</En>
        <div className="mt-2 text-sm font-bold text-slate-700">
          <Rich text={DETECTIVE2_TASK} />
        </div>
        <div className="mt-1 flex flex-wrap justify-center gap-2">
          {["Was or were?", "Verb-ing?", "Past Simple?", "Past Continuous?"].map((tag) => (
            <span key={tag} className="rounded-lg bg-white px-2.5 py-1 text-xs font-black text-rose-800">{tag}</span>
          ))}
        </div>
      </div>
      {DETECTIVE2_ERRORS.map((err, i) => {
        const sel = pick[i] || false;
        const picked = pick[i] !== undefined;
        let card = "border-slate-200 bg-white";
        if (checked) card = sel ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white opacity-60";
        else if (picked) card = "border-amber-300 bg-amber-50/60";
        return (
          <div key={err.n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">{err.n}</span>
              <div className="min-w-0 flex-1">
                <En className="block text-left text-base font-black text-rose-700 line-through">{err.wrong} ❌</En>
                <En className="mt-1 block text-left text-base font-black text-emerald-800">{err.correct} ✅</En>
              </div>
              <button
                type="button"
                onClick={() => setPick((p) => ({ ...p, [i]: !p[i] }))}
                className={`rounded-xl border-2 px-3 py-1.5 text-xs font-black transition ${sel ? "border-emerald-500 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}
              >
                {sel ? "✓ Marked" : "Mark"}
              </button>
            </div>
            {checked && sel && (
              <div className="mt-2 pr-11 text-sm font-bold text-emerald-700">
                <Rich text={err.why} />
              </div>
            )}
            {checked && !sel && (
              <div className="mt-2 pr-11 text-sm font-bold text-slate-500">لم تُعلّم هذا الخطأ — راجع الشرح.</div>
            )}
          </div>
        );
      })}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button type="button" onClick={() => setChecked(true)} disabled={!answered} className="rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30">
                تحقق من الإجابات
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-700 text-lg font-extrabold text-white">
                {Math.round((score / DETECTIVE2_ERRORS.length) * 100)}%
              </div>
              <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">Found: {score} / {DETECTIVE2_ERRORS.length}</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// IQ200 Challenge (Maya)
// ============================================================
function IQ200Challenge() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const answered = IQ200_CHALLENGE_QUESTIONS.every((q) => (answers[q.n] || "").trim().length > 2);
  const reset = () => {
    setAnswers({});
    setChecked(false);
    setShow(false);
  };
  return (
    <div className="space-y-3" data-en-seq="l25-iq200challenge">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-4">
        <En className="block text-left text-base font-extrabold text-slate-900">{IQ200_CHALLENGE_PARAGRAPH}</En>
        <div className="mt-2 text-sm font-bold text-fuchsia-900">
          <Rich text={IQ200_CHALLENGE_NOTE} />
        </div>
      </div>
      {IQ200_CHALLENGE_QUESTIONS.map((q) => (
        <div key={q.n} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-700 text-sm font-bold text-white">{q.n}</span>
            <En className="min-w-0 flex-1 text-left text-base font-extrabold text-slate-900">{q.q}</En>
          </div>
          <textarea
            dir="ltr"
            value={answers[q.n] || ""}
            onChange={(e) => setAnswers((p) => ({ ...p, [q.n]: e.target.value }))}
            rows={1}
            placeholder="Your answer..."
            className="font-en mt-2 w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-2 text-left text-sm font-bold text-slate-800 outline-none focus:border-fuchsia-400"
          />
          {checked && (
            <div dir="ltr" className="ltr-row mt-2">
              <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-sm font-black text-emerald-800">{q.a} ✅</En>
            </div>
          )}
        </div>
      ))}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-3 shadow-xl backdrop-blur">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!answered}
                className="rounded-xl bg-fuchsia-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-30"
              >
                تحقق من الإجابات
              </button>
              <button type="button" onClick={() => setShow(!show)} className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600">
                {show ? "Hide paragraph" : "Show paragraph"}
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">✓ Review your answers with the models above.</div>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                ↺ إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Final Boss
// ============================================================
function FinalBoss() {
  const [text, setText] = useState("");
  const [req, setReq] = useState<Set<number>>(new Set());
  const sentenceCount = (text.match(/[.?!]+/g) || []).length;
  const pastContCount = (text.match(/\b(was|were)\b\s+\w+ing/gi) || []).length;
  const pastSimpleCount = (text.match(/\b(went|stopped|looked|heard|ran|started|saw|called|rang|went out|came|stood|turned)\b/gi) || []).length;
  const hasWhen = /\bwhen\b/i.test(text);
  const hasWhile = /\bwhile\b/i.test(text);
  return (
    <div className="space-y-4" data-en-seq="l25-finalboss">
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="text-center text-lg font-black text-amber-900">
          <Rich text={FINAL_BOSS_TITLE} />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={FINAL_BOSS_REQUIREMENTS_INTRO} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {FINAL_BOSS_REQUIREMENTS.map((reqText, i) => {
            const on = req.has(i);
            return (
              <button
                key={reqText}
                type="button"
                onClick={() =>
                  setReq((s) => {
                    const next = new Set(s);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    return next;
                  })
                }
                className={`flex items-center gap-2 rounded-2xl border-2 p-2.5 text-right transition ${on ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${on ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {on ? "✓" : ""}
                </span>
                <span className="text-sm font-bold text-slate-800">{reqText}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-2 rounded-xl bg-slate-50 p-2.5 text-center text-sm font-bold text-slate-600">متطلبات محددة: {req.size} / {FINAL_BOSS_REQUIREMENTS.length}</div>
        <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs font-bold">
          <span className={`rounded-full px-2 py-1 ${pastContCount >= 4 ? "bg-emerald-600 text-white" : "bg-white text-slate-600"}`}>Past Cont: {pastContCount} / 4</span>
          <span className={`rounded-full px-2 py-1 ${pastSimpleCount >= 4 ? "bg-emerald-600 text-white" : "bg-white text-slate-600"}`}>Past Simple verbs: {pastSimpleCount} / 4</span>
          <span className={`rounded-full px-2 py-1 ${hasWhen ? "bg-emerald-600 text-white" : "bg-white text-slate-600"}`}>when {hasWhen ? "✓" : "✗"}</span>
          <span className={`rounded-full px-2 py-1 ${hasWhile ? "bg-emerald-600 text-white" : "bg-white text-slate-600"}`}>while {hasWhile ? "✓" : "✗"}</span>
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          Suggested opening: <En className="rounded bg-white px-2 py-1 text-xs font-black text-amber-900">{FINAL_BOSS_OPENING}</En>
        </div>
        <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-bold text-slate-700">
            <Rich text={FINAL_BOSS_EXAMPLE_TITLE} />
          </div>
          <div className="mt-1 grid gap-1">
            {FINAL_BOSS_EXAMPLE_BACKGROUND.map((line) => (
              <En key={line} className="block rounded-lg bg-amber-50 px-2.5 py-1 text-left text-sm font-black text-amber-900">{line}</En>
            ))}
            {FINAL_BOSS_EXAMPLE_INTERRUPTION.map((line) => (
              <En key={line} className="block rounded-lg bg-rose-50 px-2.5 py-1 text-left text-sm font-black text-rose-800">{line}</En>
            ))}
            {FINAL_BOSS_EXAMPLE_DEVELOPMENT.map((line) => (
              <En key={line} className="block rounded-lg bg-slate-100 px-2.5 py-1 text-left text-sm font-black text-slate-700">{line}</En>
            ))}
          </div>
          <div className="mt-2 text-center text-sm font-bold text-slate-600">
            <Rich text={FINAL_BOSS_NOW} />
          </div>
        </div>
      </div>
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <div className="text-center text-sm font-bold text-slate-700">اكتب قصتك (8–10 جمل) هنا:</div>
        <textarea
          dir="ltr"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Last Saturday evening, something strange happened...\nIt was a cold evening. The rain was falling..."
          className="font-en mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-left text-base font-bold text-slate-800 outline-none focus:border-amber-400"
        />
        <div className="mt-2 flex flex-wrap justify-between gap-2 rounded-xl bg-slate-50 p-2.5 text-center text-sm font-bold text-slate-600">
          <span>Sentences: {sentenceCount} / 8–10</span>
          <span className={pastContCount >= 4 ? "text-emerald-700" : "text-slate-500"}>was/were + ing: {pastContCount} / 4</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Cover
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-indigo-300/40 bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
      <div className="flex flex-wrap items-center gap-4">
        <div className="anim-float grid h-24 w-24 place-items-center rounded-3xl bg-white/15 text-5xl ring-4 ring-white/25">🎬</div>
        <div>
          <div dir="ltr" className="inline-flex items-center rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5">
            <En className="text-[11px] font-black uppercase tracking-[0.22em] text-indigo-200">{LAB_NAME_25}</En>
          </div>
          <h1 className="font-head mt-3 text-3xl font-bold md:text-4xl">
            <Rich text={LESSON_TITLE_25} />
          </h1>
          <En className="mt-1 block text-xl font-bold text-indigo-200">{LESSON_SUBTITLE_25}</En>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-lg font-bold text-indigo-50">
        <Rich text={LESSON_ARABIC_TITLE_25} />
      </div>
      <div className="mt-4 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-indigo-50">
        <Rich text="نحوّل Past Simple المكتمل (📸 CLICK) إلى Past Continuous المستمر (🎥 RECORDING)، ونتعلم كيف نبني الخلفية، وكيف نقاطع فعلًا مستمرًا بحدث، وكيف نصف حدثين متوازيين، وكيف نروي قصة متكاملة." />
      </div>
      <div dir="ltr" className="ltr-row mt-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/10 p-4">
        {["I was studying.", "She was cooking when the phone rang.", "While I was studying, my brother was playing.", "The wind was blowing."].map((line) => (
          <En key={line} className="rounded-xl bg-white/20 px-3 py-2 text-sm font-black">{line}</En>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <En className="rounded-xl bg-white/15 px-3 py-1.5 text-sm font-black">📸 CLICK = Past Simple</En>
        <En className="rounded-xl bg-white/15 px-3 py-1.5 text-sm font-black">🎥 RECORDING = Past Continuous</En>
      </div>
      <div className="mt-5 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-indigo-100">
        <Rich text={LAB_MOTTO_25} />
      </div>
    </div>
  );
}

function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[1]} title="أهداف الدرس" lead="بنهاية الدرس يجب أن تتقن:">
      <div className="grid gap-2">
        {OBJECTIVES_25.map((objective) => (
          <div key={objective.n} className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">{objective.n}</span>
              <div className="min-w-0 flex-1">
                <En className="block text-left text-sm font-black text-slate-900">{objective.text}</En>
                <div className="mt-1 text-sm font-bold text-slate-600">
                  <Rich text={objective.ar} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// Master Summary
// ============================================================
function MasterSummary() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[51]} title="الملخص الرئيسي — Master Summary">
      <div data-en-seq="l25-master" className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/50 p-4">
            <div className="text-center text-sm font-black text-emerald-800">{MASTER_AFFIRMATIVE_TITLE}</div>
            <En className="mt-1 block rounded-xl bg-slate-900 px-3 py-1.5 text-center text-sm font-black text-white">{MASTER_AFFIRMATIVE_FORMULA}</En>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
              {MASTER_AFFIRMATIVE_EXAMPLES.map((line) => (
                <En key={line} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-emerald-800">{line}</En>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/50 p-4">
            <div className="text-center text-sm font-black text-rose-800">{MASTER_NEGATIVE_TITLE}</div>
            <En className="mt-1 block rounded-xl bg-slate-900 px-3 py-1.5 text-center text-sm font-black text-white">{MASTER_NEGATIVE_FORMULA}</En>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
              {MASTER_NEGATIVE_EXAMPLES.map((line) => (
                <En key={line} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-rose-800">{line}</En>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/50 p-4">
            <div className="text-center text-sm font-black text-indigo-800">{MASTER_QUESTION_TITLE}</div>
            <En className="mt-1 block rounded-xl bg-indigo-700 px-3 py-1.5 text-center text-sm font-black text-white">{MASTER_QUESTION_FORMULA}</En>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
              {MASTER_QUESTION_EXAMPLES.map((line) => (
                <En key={line} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-indigo-800">{line}</En>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border-2 border-violet-200 bg-violet-50/50 p-4">
            <div className="text-center text-sm font-black text-violet-800">{MASTER_WH_TITLE}</div>
            <En className="mt-1 block rounded-xl bg-violet-700 px-3 py-1.5 text-center text-sm font-black text-white">{MASTER_WH_FORMULA}</En>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
              {MASTER_WH_EXAMPLES.map((line) => (
                <En key={line} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-violet-800">{line}</En>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
          <div className="text-sm font-black text-slate-700">{MASTER_SHORT_TITLE}</div>
          <div dir="ltr" className="ltr-row mt-1.5 flex flex-wrap justify-center gap-1.5">
            {MASTER_SHORT_EXAMPLES.map((line) => (
              <En key={line} className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-black text-slate-800">{line}</En>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
          <div className="text-center text-lg font-black text-indigo-900">{MASTER_USES_TITLE}</div>
          <div className="mt-2 grid gap-2">
            {MASTER_USES.map((use, i) => (
              <div key={use} className="flex items-start gap-2 rounded-xl bg-indigo-50 p-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-indigo-700 text-xs font-black text-white">{i + 1}</span>
                <En className="text-sm font-bold text-slate-800">{use}</En>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="text-center text-lg font-black text-slate-900">{MASTER_VS_TITLE}</div>
          <En className="mt-1 block rounded-xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-800">{MASTER_VS_SIMPLE}</En>
          <En className="mt-1 block rounded-xl bg-indigo-50 px-3 py-2 text-center text-sm font-black text-indigo-900">{MASTER_VS_CONT}</En>
          <En className="mt-1 block rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-black text-amber-900">{MASTER_VS_COMBINED}</En>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
            <En className="rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-black text-white">{MASTER_COMBINED_PATTERN_1}</En>
            <En className="rounded-xl bg-violet-700 px-3 py-1.5 text-sm font-black text-white">{MASTER_COMBINED_PATTERN_2}</En>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function MemoryTrick() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[52]} title="حيلة الذاكرة IQ200 — Memory Trick">
      <div data-en-seq="l25-memory" className="space-y-4">
        <div className="text-center text-lg font-black text-indigo-900">
          <Rich text={MEMORY_TRICK_SUBTITLE} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-slate-300 bg-slate-50 p-4 text-center">
            <div className="text-sm font-black uppercase tracking-wide text-slate-600">{MEMORY_TRICK_SIMPLE_TITLE}</div>
            <En className="mt-1 block text-3xl">{MEMORY_TRICK_SIMPLE_ICON}</En>
            <div className="mt-1 text-sm font-bold text-slate-600">
              <Rich text={MEMORY_TRICK_SIMPLE_DESC} />
            </div>
            <En className="mt-2 block rounded-xl bg-white px-3 py-2 text-base font-black text-slate-900">{MEMORY_TRICK_SIMPLE_EX}</En>
          </div>
          <div className="rounded-3xl border-2 border-indigo-300 bg-indigo-50 p-4 text-center">
            <div className="text-sm font-black uppercase tracking-wide text-indigo-700">{MEMORY_TRICK_CONT_TITLE}</div>
            <En className="mt-1 block text-3xl">{MEMORY_TRICK_CONT_ICON}</En>
            <div className="mt-1 text-sm font-bold text-slate-600">
              <Rich text={MEMORY_TRICK_CONT_DESC} />
            </div>
            <En className="mt-2 block rounded-xl bg-white px-3 py-2 text-base font-black text-indigo-900">{MEMORY_TRICK_CONT_EX}</En>
          </div>
        </div>
        <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4 text-center">
          <div className="text-sm font-black uppercase tracking-wide text-amber-800">{MEMORY_TRICK_TOGETHER_TITLE}</div>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <En className="rounded-xl bg-white px-3 py-2 text-base font-black text-indigo-900">{MEMORY_TRICK_TOGETHER_A}</En>
            <En className="rounded-xl bg-white px-3 py-2 text-base font-black text-rose-800">{MEMORY_TRICK_TOGETHER_B}</En>
          </div>
          <div className="mt-2 flex justify-center gap-2">
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-black text-white">🎥 RECORDING</span>
            <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-black text-white">📸 CLICK</span>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-indigo-100 bg-white p-3 text-center text-sm font-bold text-slate-700">
          <Rich text={MEMORY_TRICK_NOTE} />
        </div>
      </div>
    </Frame>
  );
}

function Roadmap() {
  const nodes = [
    { n: "23", en: "Countable & Uncountable", here: false },
    { n: "24", en: "Quantifiers", here: false },
    { n: "25", en: "Past Continuous", here: true },
    { n: "26", en: "Past Continuous vs Past Simple (Advanced)", here: false },
  ];
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[53]} title="أين وصلنا في المنهج؟">
      <div data-en-seq="l25-roadmap" className="grid gap-2 sm:grid-cols-2">
        {nodes.map((nd) => (
          <div
            key={nd.n}
            className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${nd.here ? "border-indigo-400 bg-indigo-100 shadow" : "border-slate-100 bg-white"}`}
          >
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${nd.here ? "bg-indigo-700" : "bg-slate-500"}`}>
              {nd.n}
            </span>
            <En className={`text-left text-sm font-bold ${nd.here ? "text-indigo-950" : "text-slate-700"}`}>{nd.en}</En>
            {nd.here && <span className="mr-auto text-xs font-black text-indigo-700">← نحن هنا</span>}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5 text-center">
        <En className="block text-center text-lg font-black text-indigo-900">{NEXT_STEP_TITLE}</En>
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-indigo-300/40 bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 25.</h2>
      <div className="mt-4 space-y-2 text-lg leading-relaxed text-indigo-50">
        <div className="font-bold">
          <Rich text={CLOSING_NOW_TITLE} />
        </div>
        {CLOSING_NOW_ITEMS.map((line) => (
          <En key={line} className="block rounded-lg bg-white/15 px-3 py-1.5 text-left text-base font-black">{line}</En>
        ))}
        <div className="mt-2 font-bold">
          <Rich text={CLOSING_POWERFUL_TITLE} />
        </div>
        <En className="block rounded-lg bg-white/15 px-3 py-1.5 text-left text-base font-black">{CLOSING_POWERFUL_1}</En>
        <En className="block rounded-lg bg-white/15 px-3 py-1.5 text-left text-sm font-black">{CLOSING_POWERFUL_1_EX}</En>
        <En className="block rounded-lg bg-white/15 px-3 py-1.5 text-left text-base font-black">{CLOSING_POWERFUL_2}</En>
        <En className="block rounded-lg bg-white/15 px-3 py-1.5 text-left text-sm font-black">{CLOSING_POWERFUL_2_EX}</En>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-center">
        <Rich text={NEXT_STEP_TITLE} className="font-bold text-indigo-50" />
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-indigo-800 transition hover:bg-indigo-50">
          ← جميع الدروس
        </button>
      </div>
    </div>
  );
}

// ============================================================
// BlockView & ExerciseView
// ============================================================
function ExerciseView({ exercise }: { exercise: Exercise25 }) {
  switch (exercise.type) {
    case "ex1":
      return <Ex1 />;
    case "ex2":
      return <Ex2 />;
    case "ex3":
      return <Ex3 />;
    case "ex4":
      return <Ex4 />;
    case "ex5":
      return <Ex5Fixed />;
    case "ex6":
      return <Ex6 />;
    case "ex7":
      return <Ex7 />;
    case "ex8":
      return <Ex8 />;
    case "detective2":
      return <Detective2 />;
    case "iq200Challenge":
      return <IQ200Challenge />;
    case "finalBoss":
      return <FinalBoss />;
  }
}

function BlockView({ block }: { block: Block25 }) {
  switch (block.type) {
    case "text":
      return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english":
      return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "mixed":
      return (
        <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-3">
          <Rich text={block.text} className="text-base font-bold text-slate-800 md:text-lg" />
        </div>
      );
    case "note":
      return <Note emoji={block.emoji} text={block.text} />;
    case "formulaStrip":
      return <FormulaStrip items={block.items} tone={block.tone ?? "indigo"} />;
    case "openingRecall":
      return <OpeningRecall />;
    case "bigIdea":
      return <BigIdea />;
    case "timeMachine":
      return <TimeMachineLab />;
    case "structure":
      return <StructureLab />;
    case "wasPanel":
      return <WasPanel />;
    case "werePanel":
      return <WerePanel />;
    case "goldenMap":
      return <GoldenMapLab />;
    case "presentPastCompare":
      return <PresentPastCompare />;
    case "affirmative":
      return <AffirmativeLab />;
    case "use1":
      return <Use1Lab />;
    case "signalExpressions":
      return <SignalExpressionsLab />;
    case "importantNote":
      return <ImportantNoteLab />;
    case "use2":
      return <Use2Lab />;
    case "twoActionModel":
      return <TwoActionModelLab />;
    case "veryImportant":
      return <VeryImportantLab />;
    case "use3":
      return <Use3Lab />;
    case "parallelPattern":
      return <ParallelPatternLab />;
    case "use4":
      return <Use4Lab />;
    case "movieCamera":
      return <MovieCameraLab />;
    case "signalWords":
      return <SignalWordsLab />;
    case "signalRemember":
      return <SignalRememberLab />;
    case "vsCompare":
      return <VsCompareLab />;
    case "sideBySide":
      return <SideBySideLab />;
    case "decisionQuestion":
      return <DecisionQuestionLab />;
    case "negative":
      return <NegativeLab />;
    case "contractions":
      return <ContractionsLab />;
    case "questions":
      return <QuestionsLab />;
    case "shortAnswers":
      return <ShortAnswersLab />;
    case "whQuestions":
      return <WhQuestionsLab />;
    case "whatWereDoing":
      return <WhatWereDoingLab />;
    case "ingLab":
      return <IngLab />;
    case "presentPastTimeline":
      return <PresentPastTimeline />;
    case "combinedPattern":
      return <CombinedPatternLab />;
    case "whenWhile":
      return <WhenWhileLab />;
    case "twoContWhile":
      return <TwoContWhileLab />;
    case "storyMode":
      return <StoryModeLab />;
    case "detective":
      return <DetectiveLab />;
    case "iq200":
      return <IQ200Lab />;
  }
}

function sourceHeadingFor(slide: Slide25): string | undefined {
  return slide.sourceIndex === undefined ? undefined : SOURCE_SECTIONS[slide.sourceIndex];
}

export function SlideView25({ s, onExit }: { s: Slide25; onExit: () => void }) {
  switch (s.kind) {
    case "cover":
      return <Cover />;
    case "objectives":
      return <Objectives />;
    case "lesson":
      return (
        <Frame mascot={s.mascot} step={s.step} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.lead} tip={s.tip}>
          {s.blocks.map((block, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
              <BlockView block={block} />
            </div>
          ))}
        </Frame>
      );
    case "ex":
      return (
        <Frame mascot={s.mascot} badge={s.badge} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.subtitle}>
          <ExerciseView exercise={s.ex} />
        </Frame>
      );
    case "masterSummary":
      return <MasterSummary />;
    case "memoryTrick":
      return <MemoryTrick />;
    case "quiz":
      return (
        <Frame
          mascot={s.mascot}
          badge="الاختبار النهائي"
          title={<Rich text={s.title} />}
          lead="أسئلة جديدة تقيس: Past Continuous، was/were، -ing، النفي والأسئلة، when/while، والأخطاء الشائعة."
        >
          <FinalQuiz lesson={25} accent="bg-indigo-700" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide25): string {
  if (slide.kind === "cover") return "الغلاف";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  البداية: "text-slate-500",
  "التركيب — WAS / WERE": "text-sky-700",
  "الاستخدامات الأربعة": "text-indigo-700",
  "الكلمات الإشارية والمقارنة": "text-amber-700",
  "النفي والأسئلة": "text-emerald-700",
  "WH و -ING": "text-violet-700",
  "الربط بين الأزمنة": "text-cyan-700",
  "القصة والمحقق": "text-rose-700",
  التدريبات: "text-orange-700",
  "التحديات النهائية": "text-pink-700",
  الخاتمة: "text-slate-600",
};

function Rail({
  index,
  setIndex,
  onExit,
  onClose,
}: {
  index: number;
  setIndex: (next: number) => void;
  onExit: () => void;
  onClose?: () => void;
}) {
  const groups = useMemo(() => {
    const out: { section: string; indexes: number[] }[] = [];
    SLIDES.forEach((slide, i) => {
      const last = out[out.length - 1];
      if (last?.section === slide.section) last.indexes.push(i);
      else out.push({ section: slide.section, indexes: [i] });
    });
    return out;
  }, []);
  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">
          <Rich text="الدرس 25 · Past Continuous" />
        </div>
        <En className="text-xs font-semibold text-indigo-700">🎬 {LAB_NAME_25}</En>
        <div className="mt-2 rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-700">
          {SOURCE_NUMBERED_COUNT} قسمًا من المصدر · {SLIDES.length} شريحة
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] font-black text-white">📸 CLICK</span>
          <span className="rounded-full bg-indigo-700 px-2 py-1 text-[10px] font-black text-white">🎥 RECORDING</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] ?? "text-slate-400"}`}>
              <Rich text={group.section} />
            </div>
            {group.indexes.map((i) => {
              const active = index === i;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-indigo-700 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>{i + 1}</span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[i])}</span>
                  <span className="mr-auto text-base">{SLIDES[i].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

export default function Lesson25({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(
    () => ({
      next: () => setIndex((value) => Math.min(value + 1, total - 1)),
      prev: () => setIndex((value) => Math.max(value - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") navigation.next();
      if (event.key === "ArrowRight") navigation.prev();
      if (event.key === " ") {
        event.preventDefault();
        navigation.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, menu]);

  useEffect(() => {
    document.getElementById("l25-main")?.scrollTo({ top: 0 });
  }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f5f4fd] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          <Rail index={index} setIndex={setIndex} onExit={onExit} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                <Rich text={`${slide.section} · `} />
                <span className="text-slate-800">
                  <Rich text={slideTitle(slide)} />
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-indigo-700 via-violet-600 to-sky-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {index + 1} / {total}
            </span>
          </header>
          <main id="l25-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={index} className="pop mx-auto max-w-4xl">
              <SlideView25 s={slide} onExit={onExit} />
            </div>
          </main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button
                onClick={navigation.prev}
                disabled={index === 0}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
              >
                → السابق
              </button>
              <span className="h-6 w-px bg-slate-200" />
              <button
                onClick={navigation.next}
                disabled={index === total - 1}
                className="rounded-full bg-indigo-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
              >
                التالي ←
              </button>
            </div>
          </div>
        </div>
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <Rail index={index} setIndex={setIndex} onExit={onExit} onClose={() => setMenu(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
