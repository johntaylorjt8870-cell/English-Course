// §34 — مساحة المعلم (Teacher Area): the complete final-test answer key and
// detailed explanations. NEVER imported by the student bundle or the eagerly
// loaded student lesson. Reachable only through the lazily-loaded teacher
// modules (TeacherGuide43 / SolutionsArea43 teacher view) and the grader.
//
// The content is the supplied source verbatim; @@ marks the single section
// boundary, matching the ledger's section splitting contract.
export const TEACHER_TEXT_43 = `@@34 مساحة المعلم — الحلول التفصيلية للاختبار النهائي
مفتاح تصحيح الدرس 43
يُفضّل عدم عرض هذا القسم للطالب إلا بعد انتهاء الاختبار.
حلول المستوى الأول
① A — may.
السبب: MAY فعل ناقص ثابت الصيغة.
② B — arrive.
السبب: بعد MIGHT نستخدم V1.
③ A — May.
السبب: طلب إذن مهذب.
④ B — know.
السبب: بعد MAY NOT نستخدم V1.
⑤ C — missed.
السبب: MAY HAVE + V3.
حلول المستوى الثاني
⑥ may rain.
It may rain tomorrow.
⑦ might be.
He might be tired.
⑧ may not come.
They may not come today.
⑨ might have forgotten.
She might have forgotten the meeting.
⑩ may have made.
We may have made a mistake.
حلول المستوى الثالث
⑪ She may be at home.
⑫ He might come tomorrow.
⑬ They may visit us.
⑭ She may have gone home.
⑮ Maybe he is tired.
أو:
He may be tired.
حلول المستوى الرابع
⑯ الأولى تقدم المعلومة بوصفها حقيقة، والثانية تعبّر عن احتمال.
⑰ لا. قد تبدو MIGHT أكثر تحفظًا في بعض السياقات، لكن لا توجد قاعدة ثابتة تجعلها دائمًا أضعف من MAY بنسبة محددة.
⑱ الأولى تستخدم Maybe ظرفًا مستقلًا، والثانية تستخدم may فعلًا ناقصًا يتبعه be. المعنى متقارب، لكن التركيب مختلف.
⑲ ربما نسي الموعد. الجملة تعبّر عن احتمال يتعلق بالماضي.
⑳ طلب إذن مهذب.
حلول المستوى الخامس
㉑ may.
He may be at the library.
㉒ might.
He might have missed the bus.
㉓ May.
May I ask everyone to take their seats, please?
㉔ may.
Omar may not arrive on time.
㉕ Maybe.
Maybe he has a good reason.
ملاحظة للمعلم
في أسئلة الاحتمال المفتوحة، يمكن قبول MAY أو MIGHT عندما تكون كلتاهما صحيحة في السياق.
أما الأسئلة التي تطلب تركيبًا محددًا أو وظيفة محددة، فيجب الالتزام بالمطلوب.
`;

export type TeacherSection43 = {
  num: number;
  id: string;
  title: string;
  lines: string[];
  units: { id: string; text: string }[];
};

export const TEACHER_SECTIONS_43: TeacherSection43[] = TEACHER_TEXT_43
  .split("@@")
  .filter(Boolean)
  .map((block) => {
    const [heading, ...lines] = block.trim().split("\n");
    const num = Number(heading.split(" ")[0]);
    return {
      num,
      id: `s${String(num).padStart(2, "0")}`,
      title: heading.slice(heading.indexOf(" ") + 1),
      lines,
      units: lines.map((text, index) => ({ id: `s${num}-u${index + 1}`, text })),
    };
  });

export function teacherSection43(num: number): TeacherSection43 {
  const found = TEACHER_SECTIONS_43.find((section) => section.num === num);
  if (!found) throw new Error(`Unknown teacher section ${num}`);
  return found;
}

export function section34Lines(): string[] {
  return teacherSection43(34).lines;
}
