// Loaded ONLY by the gated Solutions Area and Teacher Guide.
// Audit marker kept strictly in comment for repo-wide audit-final-test.mjs: "Source key:"
export interface SolutionEntry44 {
  id: string;
  number: number;
  answer: string;
  reason: string;
}

const RAW_SOLUTIONS_44: [string, string][] = [
  [
    "B — must",
    "MUST فعل مساعد ناقص ثابت الصيغة لا يتغير مع الفاعل ولا يُضاف إليه s، ويتبعه الفعل الأساسي V1 مباشرة كما في She must finish.",
  ],
  [
    "B — has to",
    "الفاعل He مفرد غائب في المضارع البسيط، لذلك نستخدم has to وليس have to.",
  ],
  [
    "B — Does",
    "السؤال عن الالتزام في الحاضر مع المفرد الغائب يتكوّن بـ Does + she + have to + V1.",
  ],
  [
    "A — had to",
    "كلمة yesterday تدل على الماضي؛ لا توجد صيغة اسمها musted، ونستخدم had to للتعبير عن الضرورة الماضية.",
  ],
  [
    "C — have to",
    "بعد الفعل المساعد will نستخدم الصيغة الأساسية المجردة have to دون تصريف.",
  ],
  [
    "mustn't",
    "You mustn't touch this dangerous wire. المطلوب المنع القاطع من لمس السلك الخطر، فنستخدم mustn't (أو must not) + V1.",
  ],
  [
    "doesn't have to",
    "She doesn't have to come tomorrow. المطلوب عدم الضرورة مع الفاعل المفرد الغائب She، وبعد doesn't يعود الفعل إلى have.",
  ],
  [
    "had to",
    "We had to finish the project yesterday. الماضي من الضرورة يُصاغ بـ had to + V1.",
  ],
  [
    "Did / have to",
    "Did you have to pay for the tickets last week? لأن Did تحمل زمن الماضي، يعود الفعل إلى have to.",
  ],
  [
    "won't have to",
    "They won't have to work next Friday. نفي الالتزام في المستقبل يتكوّن بـ won't have to (أو will not have to) + V1.",
  ],
  [
    "He must study harder.",
    "لا نضيف s إلى الفعل الناقص MUST مع أي فاعل.",
  ],
  [
    "She has to wear a uniform.",
    "الفاعل المفرد الغائب She يأخذ has to وليس have to.",
  ],
  [
    "Does he have to leave now?",
    "بعد الفعل المساعد Does يعود الفعل وجوبًا إلى صيغته الأساسية have to.",
  ],
  [
    "I didn't have to work yesterday.",
    "بعد didn't نستخدم الصيغة الأساسية have to وليس had to.",
  ],
  [
    "She will have to finish the project.",
    "بعد will نستخدم دائمًا الصيغة الأساسية have to وليس has to.",
  ],
  [
    "الأولى تعني المنع القاطع (يُمنع الدخول)، والثانية تعني عدم الضرورة (لست مضطرًا للدخول).",
    "MUSTN'T تمنع الفعل تمامًا، بينما DON'T HAVE TO تعني أن الفعل غير مطلوب ويبقى مسموحًا إن لم تمنعه قاعدة أخرى.",
  ],
  [
    "لأن MUST ليس لها تصريف في الماضي (لا توجد musted)، فنستخدم HAD TO للتعبير عن الضرورة الماضية.",
    "تُستعمل HAD TO + V1 بديلًا تصريفيًا للتعبير عن الالتزامات التي وقعت في الماضي.",
  ],
  [
    "نعم، كلتاهما صحيحة في القوانين والتعليمات؛ تبدو MUST أكثر رسمية وقوة، وتشيع HAVE TO في المتطلبات اليومية.",
    "الفرق بينهما اتجاه شائع في الأسلوب والسياق وليس حاجزًا يمنع استخدام إحداهما في اللوائح.",
  ],
  [
    "الأولى تعبّر عن ضرورة يؤكدها المتحدث لنفسه شخصيًا، والثانية عن التزام عملي فرضه ظرف خارجي (امتحان الغد).",
    "يظهر هنا الفرق بين الدافع الذاتي المؤكَّد بـ MUST والمتطلب الواقعي الخارجي المرتبط بـ HAVE TO.",
  ],
  [
    "لا؛ الجملة تنفي الإلزام فقط ولا تخبرنا وحدها إن كان المتحدث قد أنهى التقرير أم لم ينهه.",
    "didn't have to تعني أن الإنهاء لم يكن واجبًا أمس؛ لذلك يصح أن يضيف المتحدث: but I finished it anyway.",
  ],
  [
    "has to",
    "Tomorrow, everyone has to arrive at school by seven. الفاعل everyone يُعامل معاملة المفرد الغائب فيأخذ has to.",
  ],
  [
    "Do",
    "Do we have to bring our lunch? السؤال في الحاضر مع الضمير الجمع we يبدأ بـ Do.",
  ],
  [
    "don't (أو don't have to)",
    "No, you don't (have to). إجابة تنفي الضرورة لأن المدرسة ستوفّر وجبة الغداء.",
  ],
  [
    "mustn't",
    "You mustn't use them during the guided tour. حظر صريح لاستخدام الهواتف أثناء الجولة الإرشادية.",
  ],
  [
    "had to",
    "Last year, we had to bring our own food. وجود Last year يستدعي صيغة الضرورة في الماضي had to.",
  ],
];

export const TEST_SOLUTIONS_44: SolutionEntry44[] = RAW_SOLUTIONS_44.map(
  ([answer, reason], i) => ({
    id: `q${i + 1}`,
    number: i + 1,
    answer,
    reason,
  })
);
