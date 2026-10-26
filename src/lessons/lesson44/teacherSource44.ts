// Complete §35 Teacher Answer Key & Pedagogical Notes for Lesson 44.
// Lazy-loaded ONLY by TeacherGuide44 (never imported by the eager student bundle).
export const TEACHER_TEXT_44 = `@@35 مساحة المعلم — الحلول التفصيلية للاختبار النهائي
مفتاح تصحيح الدرس 44
يُفضّل عدم عرض هذا القسم للطالب إلا بعد انتهاء الاختبار.
حلول المستوى الأول
① B — must.
السبب: MUST فعل مساعد ناقص ثابت الصيغة يتبعه V1 مباشرة دون s أو to.
② B — has to.
السبب: الفاعل He مفرد غائب في المضارع البسيط، لذلك نستخدم has to.
③ B — Does.
السبب: السؤال عن الالتزام مع المفرد الغائب She يتكوّن بـ Does + Subject + have to + V1.
④ A — had to.
السبب: مع yesterday نعبّر عن الضرورة في الماضي بـ had to، ولا توجد صيغة اسمها musted.
⑤ C — have to.
السبب: بعد will يعود الفعل إلى صيغته الأساسية have to.
حلول المستوى الثاني
⑥ mustn't / must not.
You mustn't touch this dangerous wire.
⑦ doesn't have to / does not have to.
She doesn't have to come tomorrow.
⑧ had to.
We had to finish the project yesterday.
⑨ Did / have to.
Did you have to pay for the tickets last week?
⑩ won't have to / will not have to.
They won't have to work next Friday.
حلول المستوى الثالث
⑪ He must study harder.
⑫ She has to wear a uniform.
⑬ Does he have to leave now?
⑭ I didn't have to work yesterday.
⑮ She will have to finish the project.
حلول المستوى الرابع
⑯ الجملة الأولى (You mustn't enter) تعبّر عن المنع القاطع من الدخول، أما الجملة الثانية (You don't have to enter) فتعبّر عن عدم الضرورة، أي أنك غير ملزم بالدخول.
⑰ لأن MUST فعل ناقص ليس له تصريف في الماضي، فنستخدم HAD TO + V1 للتعبير عن ضرورة وقعت في الماضي.
⑱ نعم، كلتاهما صحيحة في القوانين والتعليمات؛ تبدو MUST أكثر رسمية وقوة في صياغة اللوائح، بينما تشيع HAVE TO في وصف المتطلبات والأنظمة اليومية.
⑲ الجملة الأولى تعبّر عن ضرورة يؤكدها المتحدث لنفسه بدافع شخصي، والثانية تعبّر عن التزام عملي ناتج عن ظرف خارجي محدد (امتحان الغد).
⑳ لا، الجملة تعني فقط أن إنهاء التقرير لم يكن إلزاميًا أمس، ولا تحسم وحدها إن كان المتحدث قد أنهاه فعلًا أم لم ينهه.
حلول المستوى الخامس
㉑ has to.
Tomorrow, everyone has to arrive at school by seven.
㉒ Do.
Do we have to bring our lunch?
㉓ don't (أو don't have to).
No, you don't.
㉔ mustn't.
You mustn't use them during the guided tour.
㉕ had to.
Last year, we had to bring our own food.
ملاحظة للمعلم
يُقبل في أسئلة الإكمال والتصحيح كلٌّ من الصيغة المختصرة (مثل mustn't / doesn't have to / didn't have to / won't have to) والصيغة الكاملة (must not / does not have to / did not have to / will not have to) ما دام المعنى والتركيب النحوي سليمين.
`;

export type TeacherSection44 = {
  num: number;
  id: string;
  title: string;
  lines: string[];
  units: { id: string; text: string }[];
};

export const TEACHER_SECTIONS_44: TeacherSection44[] = TEACHER_TEXT_44.split("@@")
  .filter(Boolean)
  .map((block) => {
    const [heading, ...lines] = block.trim().split("\n");
    const spaceAt = heading.indexOf(" ");
    const num = Number(heading.slice(0, spaceAt));
    return {
      num,
      id: `s${String(num).padStart(2, "0")}`,
      title: heading.slice(spaceAt + 1),
      lines,
      units: lines.map((text, idx) => ({ id: `t${num}-u${idx + 1}`, text })),
    };
  });

export function teacherSection44(num = 35): TeacherSection44 {
  const found = TEACHER_SECTIONS_44.find((s) => s.num === num);
  if (!found) throw new Error(`Unknown Lesson 44 teacher section: ${num}`);
  return found;
}
