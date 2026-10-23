// Authoritative supplied text for Lesson 42 — §41 only.
//
// §41 «مساحة المعلم — الحلول التفصيلية للاختبار النهائي» carries the complete
// answer key for the 25-question final test, so it is kept OUT of the
// statically-imported student source (source42.ts). This module is imported
// only by TeacherGuide42, which is lazy-loaded behind the teacher gate, so the
// key never appears in the initial student-facing bundle.
//
// The text itself is unchanged from the supplied source; only the decorative
// separators were normalized like the rest of the lesson.
export const TEACHER_SOURCE_TEXT_42 = `@@41 مساحة المعلم — الحلول التفصيلية للاختبار النهائي
مفتاح تصحيح الدرس 42
يُفضّل عدم عرض هذا القسم للطالب إلا بعد الانتهاء من الاختبار.
حلول المستوى الأول
① A — can.
السبب: التعبير عن القدرة الحالية.
② B — could.
السبب: قدرة عامة في الماضي.
③ B — Could.
السبب: طلب مهذب.
④ A — couldn't.
السبب: عدم القدرة في الماضي.
⑤ B — be able to.
السبب: بعد will نستخدم be able to للتعبير عن القدرة المستقبلية.
حلول المستوى الثاني
⑥ can't.
She can't drive a car.
⑦ Can you play.
Can you play the piano?
⑧ could.
When my father was young, he could run very fast.
⑨ were able to.
The task was difficult, but we were able to finish it yesterday.
السبب: نجاح في موقف ماضٍ محدد.
⑩ will be able to.
Next year, I will be able to speak English more confidently.
حلول المستوى الثالث
⑪ He can swim very well.
⑫ Can you help me?
⑬ She could play the piano when she was young.
⑭ I will be able to finish the project tomorrow.
⑮ Could you repeat the question?
حلول المستوى الرابع
⑯ الأولى تعبّر عن قدرة حالية، والثانية عن قدرة عامة في الماضي.
⑰ طلب مهذب.
⑱ احتمال مستقبلي.
⑲ لأن الجملة تبرز نجاحها في حل مشكلة محددة في الماضي، وليس مجرد امتلاك قدرة عامة.
⑳ نعم. قد يكون السؤال عن القدرة إذا كنا نريد معرفة ما إذا كان الشخص يستطيع فتح الباب، وقد يكون طلبًا إذا كنا نريده أن يفتح الباب لنا. السياق هو الذي يحدد المعنى.
حلول المستوى الخامس
㉑ Can.
Can you design a simple robot?
㉒ couldn't.
But when I was younger, I couldn't understand electronic circuits.
㉓ Could.
Could you help me build a small robot, please?
㉔ could.
We could work together after school.
㉕ will be able to.
I think I will be able to build more advanced robots.
ملاحظة للمعلم
لا يكفي أن يختار الطالب CAN أو COULD اختيارًا صحيحًا؛ ينبغي أن يستطيع تفسير الوظيفة المقصودة:
هل يتحدث عن قدرة؟
أم إذن؟
أم طلب؟
أم احتمال؟
أم اقتراح؟
فهذا هو الهدف الحقيقي من الدرس.
`;

export type TeacherSourceSection42 = { num: number; id: string; title: string; lines: string[] };

export const TEACHER_SECTION_42: TeacherSourceSection42 = (() => {
  const [heading, ...lines] = TEACHER_SOURCE_TEXT_42.replace(/^@@/, "").trim().split("\n");
  const num = Number(heading.split(" ")[0]);
  return { num, id: `s${String(num).padStart(2, "0")}`, title: heading.slice(heading.indexOf(" ") + 1), lines };
})();

/** وحدات §41 — تُستخدم في تدقيق التغطية الكامل (45 قسمًا). */
export const TEACHER_UNIT_COUNT_42 = TEACHER_SECTION_42.lines.length;
