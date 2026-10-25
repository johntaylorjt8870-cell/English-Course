// ============================================================
// الدرس 33 — الواجهة العامة لثوابت الدرس.
// كل المحتوى التعليمي يعيش في وحداته المختصة:
//   source33   نص المادة حرفيًا
//   ledger33   سجل المصدر (الكتل والوحدات والتوثيق)
//   slides33   ترتيب الشرائح والمحطات
//   design33   هوية «مختبر أزمنة الحاضر الأربعة»
//   practice33 بنود التفاعل المقترنة بالمحاولة
//   testData33 أسئلة الاختبار (بلا مفاتيح)
//   key33      مفتاح التصحيح (يُحمَّل عند التسليم أو في منطقة المعلم)
// هذا الملف يجمع ما تحتاجه الصدفة (shell) فقط.
// ============================================================

export { LESSON_TITLE_33, LESSON_SUBTITLE_33, LAB_NAME_33, LAB_MOTTO_33, STATIONS_33 } from "./slides33";
export { SLIDES_33 as SLIDES, SLIDE_COUNT_33 } from "./slides33";
export { SOURCE_NUMBERED_COUNT_33, SOURCE_LEDGER_COUNT_33, SOURCE_UNIT_COUNT_33 } from "./ledger33";
export { TENSES_33 } from "./design33";

export const LESSON_META_33 = { number: 33, en: "The Four Present Tenses", emoji: "🧪" };

export type Area33 = "lesson" | "test" | "solutions" | "teacher";

/** المناطق الأربع — الأسماء نفسها التي يعتمد عليها تدقيق التنقّل والقفل. */
export const AREAS_33: { id: Area33; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📖", ar: "خطوات الدرس" },
  { id: "test", emoji: "🧪", ar: "منطقة الاختبار" },
  { id: "solutions", emoji: "🔑", ar: "منطقة الحلول" },
  { id: "teacher", emoji: "🧑‍🏫", ar: "منطقة المعلم" },
];
