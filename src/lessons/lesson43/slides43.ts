import { NUMBER_MARKS_43, section43, sectionTitle43, sectionLines43, STATIONS_43, unitsInRange43 } from "./ledger43";

export { STATIONS_43 };

export type LabKey43 =
  | "spectrum"
  | "builder"
  | "form"
  | "dial"
  | "maybeComposer"
  | "swap"
  | "negation"
  | "mustnot"
  | "permission"
  | "permissionScenarios"
  | "maybe"
  | "past"
  | "matrix"
  | "decision"
  | "detective";

export type StationId43 =
  | "start"
  | "may"
  | "might"
  | "negation"
  | "permission"
  | "maybe"
  | "past"
  | "four"
  | "dialogue"
  | "assessment"
  | "writing";

export type Slide43 = {
  id: string;
  section: number;
  kind: "cover" | "lesson" | "lab" | "practice" | "reading" | "test" | "testResult" | "teacher" | "writing" | "summary" | "next";
  station: StationId43;
  title: string;
  badge?: string;
  lead?: string;
  mascot: string;
  tone?: "violet" | "sky" | "orange" | "emerald";
  range?: [number, number];
  lab?: LabKey43;
  labPart?: 1 | 2 | 3 | 4;
  labPart?: 1 | 2 | 3 | 4;
  practice?: number;
  items?: [number, number];
  readingPart?: "passage-1" | "passage-2";
  testLevel?: number;
  testItems?: [number, number];
  writingPart?: "editor" | "criteria" | "model";
};

export const LESSON_TITLE_43 = "MAY vs MIGHT";
export const LESSON_SUBTITLE_43 = "الاحتمال والتوقعات والإذن — الدرس 43 من 120";

const LAB_META: Record<LabKey43, { title: string; badge: string; mascot: string; lead: string }> = {
  spectrum: { title: "الطيف الاحتمالي", badge: "LAB 01 · QUALITATIVE SPECTRUM", mascot: "🌌", lead: "تعبّر MAY وMIGHT عن الاحتمال، ولا تخبرنا بنسبة مئوية ثابتة." },
  builder: { title: "باني الجملة", badge: "LAB 02 · SENTENCE BUILDER", mascot: "🧱", lead: "ابنِ الجملة قطعة قطعة، والقاعدة: MAY/MIGHT + V1." },
  form: { title: "آلة الفاعل", badge: "LAB 03 · SUBJECT MACHINE", mascot: "⚙️", lead: "MAY وMIGHT ثابتتان مع جميع الضمائر، ولا نضيف s ولا es." },
  dial: { title: "قرص الاحتمال", badge: "LAB 04 · TIME READING", mascot: "🎛️", lead: "اقرأ الزمن الذي يعبر عنه الاحتمال: الحاضر أم المستقبل أم الماضي." },
  maybeComposer: { title: "مركّب MAY BE", badge: "LAB 05 · MAY + BE COMPOSER", mascot: "🔗", lead: "بعد MAY نستخدم الصيغة الأساسية من BE: be لا is ولا are." },
  swap: { title: "تبديل MAY وMIGHT", badge: "LAB 06 · INTERCHANGEABILITY", mascot: "🔁", lead: "في كثير من الجمل اليومية يمكن تبديل الصيغتين، لكن ليس دائمًا." },
  negation: { title: "MAY NOT", badge: "LAB 07 · NEGATION MEANING", mascot: "🚫", lead: "MAY NOT تعبّر عن احتمال عدم الحدوث، وقد تحمل معنى المنع في سياقات رسمية." },
  mustnot: { title: "MAY NOT أم MUST NOT", badge: "LAB 08 · PROBABILITY vs PROHIBITION", mascot: "⛔", lead: "MAY NOT احتمال، وMUST NOT منع قاطع." },
  permission: { title: "سلم اللباقة", badge: "LAB 09 · FORMALITY LADDER", mascot: "🚪", lead: "Can I < Could I < May I < Might I — بحسب الرسمية." },
  permissionScenarios: { title: "صِل الموقف بالصيغة", badge: "LAB 10 · SCENARIO MATCHING", mascot: "🤝", lead: "في كل موقف اختر الصيغة الأنسب." },
  maybe: { title: "MAYBE أم may be", badge: "LAB 11 · ADVERB vs MODAL+BE", mascot: "🔥", lead: "MAYBE كلمة واحدة، وmay be كلمتان." },
  past: { title: "احتمال الماضي", badge: "LAB 12 · PAST POSSIBILITY ANALYSER", mascot: "⏳", lead: "MAY/MIGHT + have + V3 احتمال يتعلق بالماضي." },
  matrix: { title: "مصفوفة الأفعال الأربعة", badge: "LAB 13 · FOUR-MODAL MATRIX", mascot: "🧭", lead: "كل فعل ناقص يضيف معنى مختلفًا." },
  decision: { title: "دليل القرار", badge: "LAB 14 · DECISION GUIDE", mascot: "🧠", lead: "اسأل عن المعنى أولًا، ثم اختر الفعل." },
  detective: { title: "محلّل الحوار", badge: "LAB 15 · DIALOGUE ANALYSER", mascot: "🕵️", lead: "صنّف كل استخدام لـ MAY وMIGHT في الحوار الشامل." },
};

function lesson(id: string, section: number, station: StationId43, title: string, range: [number, number], extras: Partial<Slide43> = {}): Slide43 {
  // A slide must never render an empty reading panel: clamp to the section and
  // fail loudly when the range falls outside it.
  const available = sectionLines43(section).length;
  const clamped: [number, number] = [
    Math.max(0, Math.min(range[0], available - 1)),
    Math.max(0, Math.min(range[1], available - 1)),
  ];
  if (clamped[1] < clamped[0]) {
    throw new Error(`lesson slide "${id}" has an empty range for section ${section} (${JSON.stringify(range)})`);
  }
  if (clamped[0] !== range[0] || clamped[1] !== range[1]) {
    console.warn(`lesson slide "${id}" range ${JSON.stringify(range)} exceeds section ${section} (${available} lines); using ${JSON.stringify(clamped)}`);
  }
  return { id, section, station, title, range: clamped, kind: "lesson", mascot: "📘", ...extras };
}

function lab(id: string, section: number, station: StationId43, key: LabKey43): Slide43 {
  const meta = LAB_META[key];
  return {
    id,
    section,
    station,
    kind: "lab",
    lab: key,
    title: meta.title,
    badge: meta.badge,
    lead: meta.lead,
    mascot: meta.mascot,
    tone: "violet",
  };
}

const slides: Slide43[] = [];

// ============================================================
// المحطة 0 — الانطلاق (§0)
// ============================================================
slides.push({ id: "cover", section: 0, station: "start", kind: "cover", title: LESSON_TITLE_43, badge: "MAY vs MIGHT · CAN/COULD", mascot: "🚀", tone: "violet", range: [0, 3] });
slides.push(lesson("start-1", 0, "start", "انطلاق الدرس", [0, 3], { badge: "SECTION 0 · 4 UNITS", mascot: "🧭" }));

// ============================================================
// المحطة 1 — MAY (§§1–4)
// ============================================================
slides.push(lesson("may-1", 1, "may", "ما هو MAY", [0, 10], { badge: "MAY · MEANING", tone: "violet", mascot: "🌈" }));
slides.push(lesson("may-2", 1, "may", "MAY في السؤال والنفي", [11, 12], { badge: "MAY · NEGATION & QUESTION", mascot: "❓" }));
slides.push(lesson("may-3", 11, "may", "اختيار الفهم: MAY أم MIGHT", [0, 12], { badge: "MAY · CHECK", tone: "sky", mascot: "🩹" }));
for (let builderPart = 1; builderPart <= 4; builderPart += 1) {
  slides.push({
    ...lab(builderPart === 1 ? "lab-may-builder" : `lab-may-builder-${builderPart}`, 3, "may", "builder", builderPart),
    labPart: builderPart as 1 | 2 | 3 | 4,
    title: builderPart === 1 ? "باني الجملة" : `باني الجملة ${builderPart}`,
    badge: `LAB 02 · SENTENCE BUILDER ${builderPart}/4`,
  });
}
slides.push(lesson("may-4", 2, "may", "ما الذي يمكن أن يحدث", [0, 12], { badge: "§2 · THREE SENTENCES", mascot: "🌥️", tone: "sky" }));
slides.push(lesson("may-5", 2, "may", "الفعل الناقص بعد MAY", [13, 14], { badge: "§2 · BROKEN RULE", mascot: "📐", tone: "sky" }));
slides.push(lab("lab-may-spectrum", 2, "may", "spectrum", 1));
slides.push(lesson("may-6", 3, "may", "أمثلة إضافية على MAY", [0, 11], { badge: "§3 · EXAMPLES", mascot: "🗂️" }));
slides.push(lesson("may-7", 3, "may", "بناء MAY + V1", [12, 19], { badge: "§3 · FORM", tone: "violet", mascot: "🧱" }));
slides.push(lesson("may-8", 4, "may", "صياغة MAY مع الفاعل", [0, 9], { badge: "§4 · SUBJECT MATCH", mascot: "🔤" }));
slides.push(lab("lab-may-form", 4, "may", "form", 1));

// ============================================================
// المحطة 2 — MIGHT (§§5–11)
// ============================================================
slides.push(lesson("might-1", 5, "might", "MAY أم MIGHT في الحديث اليومي", [0, 12], { badge: "§5 · THE QUESTION", tone: "violet", mascot: "🎛️" }));
slides.push(lesson("might-2", 5, "might", "MAY أم MIGHT: كلتاهما صحيحتان", [13, 19], { badge: "§5 · BOTH ARE CORRECT", mascot: "✅", tone: "emerald" }));
slides.push(lab("lab-might-dial", 5, "might", "dial", 1));
slides.push(lesson("might-3", 6, "might", "التحفظ ودرجة الاحتمال", [0, 11], { badge: "§6 · RESERVE", mascot: "🌡️", tone: "sky" }));
slides.push(lesson("might-4", 6, "might", "لا توجد نسب مئوية ثابتة", [12, 14], { badge: "§6 · NO FIXED PERCENTAGE", tone: "orange", mascot: "🚫" }));
slides.push(lesson("might-5", 7, "might", "MAY BE مقابل قد", [0, 8], { badge: "§7 · MAY + BE", mascot: "🔗" }));
slides.push(lesson("might-6", 7, "might", "MAY + BE في الأسئلة", [9, 13], { badge: "§7 · ASK", mascot: "❓" }));
slides.push(lab("lab-might-maybe-composer", 7, "might", "maybeComposer", 1));
slides.push(lesson("might-7", 8, "might", "MAY أو MIGHT في النفي", [0, 9], { badge: "§8 · NEGATIVE FORMS", mascot: "🚫" }));
slides.push(lesson("might-8", 8, "might", "MAY NOT مقابل MIGHT NOT", [10, 16], { badge: "§8 · COMPARISON", mascot: "⚖️" }));
slides.push(lesson("might-9", 9, "might", "الجملة السلبية الكاملة", [0, 10], { badge: "§9 · FULL NEGATIVE", mascot: "📐" }));
slides.push(lesson("might-10", 9, "might", "MAY NOT وMIGHT NOT في الاستفهام", [11, 11], { badge: "§9 · QUESTION", mascot: "❓" }));
slides.push(lesson("might-11", 10, "might", "هل يمكن تبديلهما دائمًا؟", [0, 9], { badge: "§10 · SWAPPING", mascot: "🔁", tone: "sky" }));
slides.push(lesson("might-12", 10, "might", "السياق الذي يحدد الاختيار", [10, 16], { badge: "§10 · CONTEXT", mascot: "🔍" }));
slides.push(lab("lab-might-swap", 11, "might", "swap", 1));

// ============================================================
// المحطة 3 — النفي (§§12–14)
// ============================================================
slides.push(lesson("negation-1", 12, "negation", "MAY NOT في النفي", [0, 10], { badge: "§12 · NEGATION", mascot: "🚫", tone: "violet" }));
slides.push(lesson("negation-2", 12, "negation", "MAY NOT مع الاحتمال", [11, 16], { badge: "§12 · PROBABILITY", mascot: "🌥️" }));
slides.push(lab("lab-negation", 13, "negation", "negation", 1));
slides.push(lesson("negation-3", 13, "negation", "MAY NOT مقابل المنع", [0, 12], { badge: "§13 · PROHIBITION", mascot: "⛔", tone: "orange" }));
slides.push(lesson("negation-4", 13, "negation", "MAY NOT أم MUST NOT", [13, 19], { badge: "§13 · THE TEST", mascot: "⚖️", tone: "orange" }));
slides.push(lab("lab-mustnot", 14, "negation", "mustnot", 1));
slides.push(lesson("negation-5", 14, "negation", "MUST NOT للمنع القاطع", [0, 9], { badge: "§14 · MUST NOT", mascot: "🚷", tone: "emerald" }));

// ============================================================
// المحطة 4 — الإذن والطلب (§§15–17)
// ============================================================
slides.push(lesson("permission-1", 15, "permission", "MAY I — طلب الإذن", [0, 9], { badge: "§15 · ASK", mascot: "🚪", tone: "violet" }));
slides.push(lesson("permission-2", 15, "permission", "الطبقات الأربع لطلب الإذن", [10, 19], { badge: "§15 · FOUR FORMS", mascot: "🪜", tone: "violet" }));
slides.push(lab("lab-permission", 15, "permission", "permission", 1));
slides.push(lesson("permission-3", 16, "permission", "MIGHT I — الرسمية والقدم", [0, 9], { badge: "§16 · MIGHT I", mascot: "🎩", tone: "sky" }));
slides.push(lesson("permission-4", 16, "permission", "نعم MAY ولا نعم MIGHT", [10, 16], { badge: "§16 · GIVING PERMISSION", mascot: "✅", tone: "emerald" }));
slides.push(lab("lab-permission-scenarios", 17, "permission", "permissionScenarios", 1));

// ============================================================
// المحطة 5 — MAYBE وMAY BE (§§18–19)
// ============================================================
slides.push(lesson("maybe-1", 18, "maybe", "MAYBE كلمة واحدة", [0, 9], { badge: "§18 · ADVERB", mascot: "🔎", tone: "violet" }));
slides.push(lesson("maybe-2", 18, "maybe", "may be كلمتان", [10, 16], { badge: "§18 · MODAL + BE", mascot: "🔗", tone: "violet" }));
slides.push(lab("lab-maybe", 18, "maybe", "maybe", 1));
slides.push(lesson("maybe-3", 18, "maybe", "الترتيب في الجملة", [17, 20], { badge: "§18 · ORDER", mascot: "🧩" }));
slides.push(lesson("maybe-4", 19, "maybe", "MAYBE في السؤال والجواب", [0, 9], { badge: "§19 · QUESTION", mascot: "❓" }));
slides.push(lesson("maybe-5", 19, "maybe", "الأخطاء الشائعة", [10, 15], { badge: "§19 · COMMON MISTAKE", mascot: "🩹", tone: "orange" }));

// ============================================================
// المحطة 6 — الماضي (§§20–23)
// ============================================================
slides.push(lesson("past-1", 20, "past", "MAY HAVE — احتمال الماضي", [0, 13], { badge: "§20 · MAY HAVE + V3", mascot: "⏳", tone: "violet" }));
slides.push(lesson("past-2", 20, "past", "السؤال والنفي", [14, 18], { badge: "§20 · FORM", mascot: "📐" }));
slides.push(lab("lab-past", 20, "past", "past", 1));
slides.push(lesson("past-3", 21, "past", "MIGHT HAVE وMAY HAVE", [0, 10], { badge: "§21 · MIGHT HAVE", mascot: "🌥️" }));
slides.push(lesson("past-4", 21, "past", "السياقات الماضية", [11, 14], { badge: "§21 · CONTEXT", mascot: "🔍" }));
slides.push(lesson("past-5", 22, "past", "الاستخدامات المتقدمة", [0, 11], { badge: "§22 · ADVANCED", mascot: "🧠", tone: "sky" }));
slides.push(lesson("past-6", 22, "past", "الاستخدامات المتقدمة 2", [12, 15], { badge: "§22 · ADVANCED 2", mascot: "🧠", tone: "sky" }));
slides.push(lesson("past-7", 23, "past", "MAY HAVE مقابل MIGHT HAVE", [0, 9], { badge: "§23 · COMPARISON", mascot: "⚖️", tone: "emerald" }));
slides.push(lesson("past-8", 23, "past", "أمثلة وتحليل", [10, 16], { badge: "§23 · EXAMPLES", mascot: "🗂️" }));

// ============================================================
// المحطة 7 — الأفعال الأربعة (§§24–25)
// ============================================================
slides.push(lesson("four-1", 24, "four", "المصفوفة الكاملة", [0, 14], { badge: "§24 · FULL MATRIX", mascot: "🧭", tone: "violet" }));
slides.push(lesson("four-2", 24, "four", "MAY وMIGHT في المصفوفة", [15, 17], { badge: "§24 · MAY & MIGHT", mascot: "🌈", tone: "violet" }));
slides.push(lab("lab-matrix", 24, "four", "matrix", 1));
slides.push(lesson("four-3", 25, "four", "دليل القرار", [0, 11], { badge: "§25 · DECISION", mascot: "🧠", tone: "sky" }));
slides.push(lesson("four-4", 25, "four", "الاختيار بين الأفعال الأربعة", [12, 18], { badge: "§25 · CHOICE", mascot: "🎯", tone: "sky" }));
slides.push(lab("lab-decision", 25, "four", "decision", 1));

// ============================================================
// المحطة 8 — الحوار الشامل (§§26–31)
// ============================================================
slides.push(lesson("dialogue-1", 26, "dialogue", "حوار شامل: The Missing Science Project", [0, 9], { badge: "§26 · DIALOGUE 1", mascot: "🗣️", tone: "violet" }));
slides.push(lesson("dialogue-2", 26, "dialogue", "تحليل الحوار 1", [10, 17], { badge: "§26 · ANALYSIS 1", mascot: "🔎", tone: "sky" }));
slides.push(lesson("dialogue-3", 26, "dialogue", "تحليل الحوار 2", [18, 24], { badge: "§26 · ANALYSIS 2", mascot: "🔎", tone: "sky" }));
slides.push(lesson("dialogue-4", 26, "dialogue", "تحليل الحوار 3", [25, 32], { badge: "§26 · ANALYSIS 3", mascot: "🔎", tone: "sky" }));
slides.push(lab("lab-detective", 26, "dialogue", "detective", 1));
slides.push(lesson("dialogue-5", 27, "dialogue", "التطبيق: MAY أو MIGHT", [0, 14], { badge: "§27 · CHOOSE", mascot: "🎯", tone: "violet" }));
slides.push({
  id: "practice-27", section: 27, station: "dialogue", kind: "practice", practice: 27, items: [1, 3],
  title: "تدريب: MAY أو MIGHT", badge: "PRACTICE · §27 · 1/2", mascot: "🎯", tone: "violet",
});
slides.push({
  id: "practice-27b", section: 27, station: "dialogue", kind: "practice", practice: 27, items: [4, 6],
  title: "تدريب: MAY أو MIGHT 2", badge: "PRACTICE · §27 · 2/2", mascot: "🎯", tone: "violet",
});
slides.push(lesson("dialogue-6", 28, "dialogue", "اختيار الصيغة الصحيحة", [0, 11], { badge: "§28 · CHOOSE FORM", mascot: "📌" }));
slides.push({
  id: "practice-28", section: 28, station: "dialogue", kind: "practice", practice: 28, items: [1, 3],
  title: "تدريب: اختر الصيغة", badge: "PRACTICE · §28 · 3 ITEMS", mascot: "📌", tone: "violet",
});
slides.push(lesson("dialogue-7", 28, "dialogue", "تحليل الاختيارات", [12, 15], { badge: "§28 · REASON", mascot: "🧠" }));
slides.push({
  id: "practice-28b", section: 28, station: "dialogue", kind: "practice", practice: 28, items: [4, 6],
  title: "تدريب: اختر الصيغة 2", badge: "PRACTICE · §28 · 3 ITEMS", mascot: "📌", tone: "violet",
});
slides.push(lesson("dialogue-8", 29, "dialogue", "أكمل MAY أو MIGHT", [0, 11], { badge: "§29 · COMPLETE", mascot: "✍️" }));
slides.push({
  id: "practice-29", section: 29, station: "dialogue", kind: "practice", practice: 29, items: [1, 3],
  title: "تدريب: أكمل", badge: "PRACTICE · §29 · 3 ITEMS", mascot: "✍️", tone: "violet",
});
slides.push(lesson("dialogue-9", 29, "dialogue", "أكمل MAY أو MIGHT 2", [12, 13], { badge: "§29 · COMPLETE 2", mascot: "✍️" }));
slides.push({
  id: "practice-29b", section: 29, station: "dialogue", kind: "practice", practice: 29, items: [4, 6],
  title: "تدريب: أكمل 2", badge: "PRACTICE · §29 · 3 ITEMS", mascot: "✍️", tone: "violet",
});
slides.push(lesson("dialogue-10", 30, "dialogue", "أعد كتابة الجملة", [0, 11], { badge: "§30 · REWRITE", mascot: "🔁" }));
slides.push({
  id: "practice-30", section: 30, station: "dialogue", kind: "practice", practice: 30, items: [1, 3],
  title: "تدريب: أعد الكتابة", badge: "PRACTICE · §30 · 1/2", mascot: "🔁", tone: "violet",
});
slides.push({
  id: "practice-30b", section: 30, station: "dialogue", kind: "practice", practice: 30, items: [4, 5],
  title: "تدريب: أعد الكتابة 2", badge: "PRACTICE · §30 · 2/2", mascot: "🔁", tone: "violet",
});
slides.push(lesson("dialogue-11", 31, "dialogue", "صحّح الأخطاء", [0, 11], { badge: "§31 · CORRECT", mascot: "🩹" }));
slides.push({
  id: "practice-31", section: 31, station: "dialogue", kind: "practice", practice: 31, items: [1, 3],
  title: "تدريب: صحّح الأخطاء", badge: "PRACTICE · §31 · 1/4", mascot: "🩹", tone: "orange",
});
slides.push({
  id: "practice-31b", section: 31, station: "dialogue", kind: "practice", practice: 31, items: [4, 6],
  title: "تدريب: صحّح الأخطاء 2", badge: "PRACTICE · §31 · 2/4", mascot: "🩹", tone: "orange",
});
slides.push({
  id: "practice-31c", section: 31, station: "dialogue", kind: "practice", practice: 31, items: [7, 9],
  title: "تدريب: صحّح الأخطاء 3", badge: "PRACTICE · §31 · 3/4", mascot: "🩹", tone: "orange",
});
slides.push({
  id: "practice-31d", section: 31, station: "dialogue", kind: "practice", practice: 31, items: [10, 10],
  title: "تدريب: صحّح الأخطاء 4", badge: "PRACTICE · §31 · 4/4", mascot: "🩹", tone: "orange",
});

// ============================================================
// المحطة 9 — القراءة والإتقان (§§32–34)
// ============================================================
slides.push(lesson("assessment-1", 32, "assessment", "القراءة: The Unexpected School Trip", [0, 9], { badge: "§32 · READING 1/2", mascot: "📖", tone: "sky" }));
slides.push({
  id: "reading-passage-1", section: 32, station: "assessment", kind: "reading", readingPart: "passage-1",
  title: "القراءة: 1/2", badge: "§32 · READING", mascot: "📖", tone: "sky",
});
slides.push(lesson("assessment-2", 32, "assessment", "القراءة: الجزء الثاني", [10, 19], { badge: "§32 · READING 2/2", mascot: "📖", tone: "sky" }));
slides.push({
  id: "reading-passage-2", section: 32, station: "assessment", kind: "reading", readingPart: "passage-2",
  title: "القراءة: 2/2", badge: "§32 · READING", mascot: "📖", tone: "sky",
});
slides.push({
  id: "practice-32", section: 32, station: "assessment", kind: "practice", practice: 32, items: [1, 3],
  title: "تدريب: أسئلة الفهم", badge: "PRACTICE · §32 · 1/4", mascot: "🔎", tone: "sky",
});
slides.push({
  id: "practice-32b", section: 32, station: "assessment", kind: "practice", practice: 32, items: [4, 6],
  title: "تدريب: أسئلة الفهم 2", badge: "PRACTICE · §32 · 2/4", mascot: "🔎", tone: "sky",
});
slides.push({
  id: "practice-32c", section: 32, station: "assessment", kind: "practice", practice: 32, items: [7, 9],
  title: "تدريب: أسئلة الفهم 3", badge: "PRACTICE · §32 · 3/4", mascot: "🔎", tone: "sky",
});
slides.push({
  id: "practice-32d", section: 32, station: "assessment", kind: "practice", practice: 32, items: [10, 10],
  title: "تدريب: أسئلة الفهم 4", badge: "PRACTICE · §32 · 4/4", mascot: "🔎", tone: "sky",
});
slides.push(lesson("assessment-3", 33, "assessment", "أسئلة الاختبار", [0, 4], { badge: "§33 · EXAM INTRO", mascot: "🏆", tone: "orange" }));
slides.push({ id: "test-l1", section: 33, station: "assessment", kind: "test", testLevel: 1, testItems: [1, 2], title: "المستوى الأول: Multiple Choice", badge: "TEST · LEVEL 1 · 1/3", mascot: "🎯", tone: "violet" });
slides.push({ id: "test-l1b", section: 33, station: "assessment", kind: "test", testLevel: 1, testItems: [3, 4], title: "المستوى الأول: Multiple Choice", badge: "TEST · LEVEL 1 · 2/3", mascot: "🎯", tone: "violet" });
slides.push({ id: "test-l1c", section: 33, station: "assessment", kind: "test", testLevel: 1, testItems: [5, 5], title: "المستوى الأول: Multiple Choice", badge: "TEST · LEVEL 1 · 3/3", mascot: "🎯", tone: "violet" });
slides.push({ id: "test-l2a", section: 33, station: "assessment", kind: "test", testLevel: 2, testItems: [6, 7], title: "المستوى الثاني: Complete the Sentences", badge: "TEST · LEVEL 2 · 1/4", mascot: "✍️", tone: "violet" });
slides.push({ id: "test-l2b", section: 33, station: "assessment", kind: "test", testLevel: 2, testItems: [8, 8], title: "المستوى الثاني: Complete the Sentences", badge: "TEST · LEVEL 2 · 2/4", mascot: "✍️", tone: "violet" });
slides.push({ id: "test-l2c", section: 33, station: "assessment", kind: "test", testLevel: 2, testItems: [9, 9], title: "المستوى الثاني: Complete the Sentences", badge: "TEST · LEVEL 2 · 3/4", mascot: "✍️", tone: "violet" });
slides.push({ id: "test-l2d", section: 33, station: "assessment", kind: "test", testLevel: 2, testItems: [10, 10], title: "المستوى الثاني: Complete the Sentences", badge: "TEST · LEVEL 2 · 4/4", mascot: "✍️", tone: "violet" });
slides.push({ id: "test-l3a", section: 33, station: "assessment", kind: "test", testLevel: 3, testItems: [11, 12], title: "المستوى الثالث: Correct the Mistakes", badge: "TEST · LEVEL 3 · 1/3", mascot: "🩹", tone: "orange" });
slides.push({ id: "test-l3b", section: 33, station: "assessment", kind: "test", testLevel: 3, testItems: [13, 14], title: "المستوى الثالث: Correct the Mistakes", badge: "TEST · LEVEL 3 · 2/3", mascot: "🩹", tone: "orange" });
slides.push({ id: "test-l3c", section: 33, station: "assessment", kind: "test", testLevel: 3, testItems: [15, 15], title: "المستوى الثالث: Correct the Mistakes", badge: "TEST · LEVEL 3 · 3/3", mascot: "🩹", tone: "orange" });
slides.push({ id: "test-l4a", section: 33, station: "assessment", kind: "test", testLevel: 4, testItems: [16, 17], title: "المستوى الرابع: Understand the Meaning", badge: "TEST · LEVEL 4 · 1/3", mascot: "🧠", tone: "sky" });
slides.push({ id: "test-l4b", section: 33, station: "assessment", kind: "test", testLevel: 4, testItems: [18, 19], title: "المستوى الرابع: Understand the Meaning", badge: "TEST · LEVEL 4 · 2/3", mascot: "🧠", tone: "sky" });
slides.push({ id: "test-l4c", section: 33, station: "assessment", kind: "test", testLevel: 4, testItems: [20, 20], title: "المستوى الرابع: Understand the Meaning", badge: "TEST · LEVEL 4 · 3/3", mascot: "🧠", tone: "sky" });
slides.push({ id: "test-l5a", section: 33, station: "assessment", kind: "test", testLevel: 5, testItems: [21, 21], title: "المستوى الخامس: Final IQ200 Boss", badge: "TEST · LEVEL 5 · 1/5", mascot: "👑", tone: "orange" });
slides.push({ id: "test-l5b", section: 33, station: "assessment", kind: "test", testLevel: 5, testItems: [22, 22], title: "المستوى الخامس: Final IQ200 Boss", badge: "TEST · LEVEL 5 · 2/5", mascot: "👑", tone: "orange" });
slides.push({ id: "test-l5c", section: 33, station: "assessment", kind: "test", testLevel: 5, testItems: [23, 23], title: "المستوى الخامس: Final IQ200 Boss", badge: "TEST · LEVEL 5 · 3/5", mascot: "👑", tone: "orange" });
slides.push({ id: "test-l5d", section: 33, station: "assessment", kind: "test", testLevel: 5, testItems: [24, 24], title: "المستوى الخامس: Final IQ200 Boss", badge: "TEST · LEVEL 5 · 4/5", mascot: "👑", tone: "orange" });
slides.push({ id: "test-l5e", section: 33, station: "assessment", kind: "test", testLevel: 5, testItems: [25, 25], title: "المستوى الخامس: Final IQ200 Boss", badge: "TEST · LEVEL 5 · 5/5", mascot: "👑", tone: "orange" });
slides.push({
  id: "test-result", section: 33, station: "assessment", kind: "testResult",
  title: "نتيجة الاختبار", badge: "TEST · RESULT", mascot: "🏅", tone: "emerald",
});
slides.push({
  id: "teacher", section: 34, station: "assessment", kind: "teacher",
  title: "دليل المعلم", badge: "TEACHER GUIDE · KEY §34", mascot: "🗝️", tone: "violet",
});

// ============================================================
// المحطة 10 — مهمة الكتابة (§§35–37)
// ============================================================
slides.push(lesson("writing-1", 35, "writing", "مهمة الكتابة", [0, 11], { badge: "§35 · WRITING", mascot: "✍️", tone: "emerald" }));
slides.push({
  id: "writing-editor", section: 35, station: "writing", kind: "writing", writingPart: "editor",
  title: "مساحة الكتابة", badge: "WRITING · 12–15 SENTENCES", mascot: "✍️", tone: "emerald",
});
slides.push(lesson("writing-2", 35, "writing", "معايير التقييم", [12, 15], { badge: "§35 · RUBRIC", mascot: "📋", tone: "emerald" }));
slides.push({
  id: "writing-criteria", section: 35, station: "writing", kind: "writing", writingPart: "criteria",
  title: "مراجعة المعايير", badge: "WRITING · CHECKLIST", mascot: "✅", tone: "emerald",
});
slides.push(lesson("writing-3", 35, "writing", "التحدي الإضافي", [16, 19], { badge: "§35 · CHALLENGE", mascot: "🔥", tone: "orange" }));
slides.push({
  id: "writing-model", section: 35, station: "writing", kind: "writing", writingPart: "model",
  title: "الفقرة النموذجية", badge: "WRITING · MODEL", mascot: "📝", tone: "sky",
});
slides.push(lesson("summary-golden", 36, "writing", "الملخص الذهني", [0, 13], { badge: "§36 · GOLDEN SUMMARY 1/2", mascot: "🥇", tone: "orange" }));
slides.push(lesson("summary-golden-b", 36, "writing", "الملخص الذهني 2", [14, 27], { badge: "§36 · GOLDEN SUMMARY 2/2", mascot: "🥇", tone: "orange" }));
slides.push(lesson("next-roadmap", 37, "writing", "الدرس التالي وخارطة التقدم", [0, 15], { badge: "§37 · NEXT", mascot: "🗺️", tone: "emerald" }));

export const SLIDES_43 = slides;

export function slidesForStation43(station: StationId43 | number): number[] {
  if (typeof station === "number") {
    const id = STATIONS_43[station]?.id ?? STATIONS_43[0].id;
    return SLIDES_43.map((s, i) => ({ s, i })).filter(({ s }) => s.station === id).map(({ i }) => i);
  }
  return SLIDES_43.map((s, i) => ({ s, i })).filter(({ s }) => s.station === station).map(({ i }) => i);
}
