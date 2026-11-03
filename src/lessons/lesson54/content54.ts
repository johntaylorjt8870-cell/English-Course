// ============================================================
// الدرس 54 — THIRD CONDITIONAL / الشرط الثالث
// المحتوى الكتابي الكامل كما ورد في المصدر، دون اختصار مُخلّ.
// البنية بيانات فقط؛ العرض في Lesson54.tsx على قالب الدرس الأول.
// ============================================================

export type Pair54 = { en: string; ar: string };

export type Block54 =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "formula"; text: string }
  | { kind: "en"; title?: string; lines: string[] }
  | { kind: "bullets"; items: string[]; ordered?: boolean }
  | { kind: "table"; head: string[]; rows: string[][]; caption?: string }
  | { kind: "pairs"; items: Pair54[]; title?: string }
  | { kind: "note"; text: string; emoji?: string }
  | { kind: "qa"; items: { q: string; a: string }[] };

export type Page54 = { id: string; section: string; title: string; blocks: Block54[] };

const p = (text: string): Block54 => ({ kind: "p", text });
const h = (text: string): Block54 => ({ kind: "h", text });
const formula = (text: string): Block54 => ({ kind: "formula", text });
const en = (lines: string[], title?: string): Block54 => ({ kind: "en", lines, title });
const bullets = (items: string[], ordered = false): Block54 => ({ kind: "bullets", items, ordered });
const table = (head: string[], rows: string[][], caption?: string): Block54 => ({ kind: "table", head, rows, caption });
const pairs = (items: Pair54[], title?: string): Block54 => ({ kind: "pairs", items, title });
const note = (text: string, emoji = "💡"): Block54 => ({ kind: "note", text, emoji });
const qa = (items: { q: string; a: string }[]): Block54 => ({ kind: "qa", items });

export const PAGES_54: readonly Page54[] = [
  {
    id: "intro",
    section: "المقدمة",
    title: "أهلًا بك في الدرس الرابع والخمسين",
    blocks: [
      p("وصلنا اليوم إلى نوع مهم من الجمل الشرطية في اللغة الإنجليزية، وهو Third Conditional — الشرط الثالث."),
      h("في الدروس السابقة تعلمنا ثلاثة أشياء مختلفة:"),
      bullets([
        "Zero Conditional: الحقائق العامة والعادات.",
        "First Conditional: الاحتمالات الواقعية في المستقبل.",
        "Second Conditional: المواقف الافتراضية أو غير الواقعية في الحاضر والمستقبل.",
      ], true),
      p("أما الشرط الثالث فيأخذنا إلى الماضي."),
      p("نستخدمه عندما نتحدث عن شيء حدث أو لم يحدث في الماضي، ونتخيل ماذا كانت ستكون النتيجة لو أن الماضي كان مختلفًا."),
      h("مثال:"),
      pairs([{ en: "If I had studied harder, I would have passed the exam.", ar: "لو كنت قد درست بجد أكثر، لكنت نجحت في الامتحان." }]),
      p("المعنى هنا أن المتكلم لم يدرس بجد بما يكفي، ولذلك لم ينجح، وهو الآن يتخيل نتيجة مختلفة للماضي."),
      p("هذا النوع مهم جدًا في المحادثات والقصص والاعتذار والتعبير عن الندم والفرص الضائعة."),
      p("سنبدأ بفهم الفكرة، ثم ندرس القاعدة بالتفصيل، وننتقل إلى النفي والأسئلة، والاختصارات، واستخدام could وmight، وبعدها سنقارن الأنواع الثلاثة السابقة بالشرط الثالث."),
    ],
  },

  // ① ------------------------------------------------------------------
  {
    id: "s1a",
    section: "① ما هو Third Conditional؟",
    title: "① ما هو Third Conditional؟",
    blocks: [
      p("الشرط الثالث هو تركيب نستخدمه للحديث عن:"),
      bullets([
        "① موقف لم يحدث في الماضي، ونتخيل أنه لو حدث لكانت له نتيجة مختلفة.",
        "② شيء حدث في الماضي، ونتخيل أنه لو لم يحدث لكانت النتيجة مختلفة.",
        "③ الندم على قرار أو تصرف سابق.",
        "④ الفرص التي ضاعت أو النتائج التي لم تتحقق.",
        "⑤ تخيل ماضٍ بديل عن الماضي الحقيقي.",
      ], true),
      h("تأمل المثال:"),
      pairs([{ en: "If I had woken up earlier, I would have caught the train.", ar: "لو كنت قد استيقظت مبكرًا، لكنت لحقت بالقطار." }]),
      h("ما الذي نفهمه؟"),
      bullets([
        "المتكلم لم يستيقظ مبكرًا.",
        "لم يلحق بالقطار.",
        "هو يتخيل الآن نتيجة مختلفة لو أنه استيقظ مبكرًا.",
      ]),
      p("إذن الجملة تتحدث عن ماضٍ انتهى بالفعل، ولا نستطيع تغييره الآن."),
    ],
  },
  {
    id: "s1b",
    section: "① ما هو Third Conditional؟",
    title: "أمثلة أخرى على الماضي البديل",
    blocks: [
      h("مثال آخر:"),
      pairs([{ en: "If she had studied medicine, she would have become a doctor.", ar: "لو كانت قد درست الطب، لأصبحت طبيبة." }]),
      h("المعنى المحتمل:"),
      bullets([
        "هي لم تدرس الطب.",
        "لم تصبح طبيبة.",
        "المتكلم يتخيل ماذا كان سيحدث لو اختارت دراسة الطب.",
      ]),
      h("مثال ثالث:"),
      pairs([{ en: "If they had left earlier, they wouldn't have missed the flight.", ar: "لو كانوا قد غادروا مبكرًا، لما فاتهم موعد الرحلة." }]),
      h("المعنى:"),
      bullets([
        "لم يغادروا مبكرًا.",
        "فاتتهم الرحلة.",
        "كان يمكن أن تكون النتيجة مختلفة لو غادروا في وقت أبكر.",
      ]),
      note("الفكرة الأساسية: Third Conditional = تخيل نتيجة مختلفة لحدث انتهى في الماضي.", "🔑"),
    ],
  },

  // ② ------------------------------------------------------------------
  {
    id: "s2a",
    section: "② القاعدة الأساسية للشرط الثالث",
    title: "② القاعدة الأساسية للشرط الثالث",
    blocks: [
      p("احفظ هذه القاعدة جيدًا:"),
      formula("If + Past Perfect, would have + V3"),
      p("أي:"),
      formula("If + had + V3, would have + V3"),
      p("لدينا جزآن:"),
      bullets([
        "① جملة الشرط: If + subject + had + V3",
        "② جملة النتيجة: Subject + would have + V3",
      ], true),
      h("مثال:"),
      pairs([{ en: "If I had studied, I would have passed.", ar: "لو كنت قد درست، لكنت نجحت." }]),
      h("نقسم الجملة:"),
      bullets([
        "If: أداة الشرط.",
        "I: الفاعل.",
        "had studied: الماضي التام.",
        "I: فاعل النتيجة.",
        "would have passed: النتيجة الافتراضية في الماضي.",
      ]),
      h("مثال آخر:"),
      pairs([{ en: "If he had called me, I would have helped him.", ar: "لو كان قد اتصل بي، لكنت ساعدته." }]),
      p("الشرط: he had called me."),
      p("النتيجة: I would have helped him."),
    ],
  },
  {
    id: "s2b",
    section: "② القاعدة الأساسية للشرط الثالث",
    title: "ملاحظة مهمة جدًا: had مع جميع الضمائر",
    blocks: [
      p("في الشرط الثالث نستخدم had مع جميع الضمائر:"),
      en([
        "I had studied.",
        "You had studied.",
        "He had studied.",
        "She had studied.",
        "We had studied.",
        "They had studied.",
      ], "had + V3 مع كل الضمائر"),
      p("لا يتغير had حسب الفاعل. وهذا يسهل عليك تكوين الجملة."),
      note("بعد had نستخدم V3 دائمًا، وبعد would have نستخدم V3 أيضًا.", "📌"),
    ],
  },

  // ③ ------------------------------------------------------------------
  {
    id: "s3a",
    section: "③ مراجعة سريعة لـ V3",
    title: "③ مراجعة سريعة لـ V3 — التصريف الثالث",
    blocks: [
      p("بما أن الشرط الثالث يعتمد على V3، فمن المهم أن نتأكد من معرفتنا بالتصريف الثالث للأفعال."),
      p("تذكر أن الفعل قد يكون له ثلاثة تصريفات:"),
      bullets(["V1: الفعل الأساسي.", "V2: الماضي البسيط.", "V3: التصريف الثالث."]),
      h("أمثلة:"),
      table(
        ["V1", "V2", "V3"],
        [
          ["go", "went", "gone"],
          ["see", "saw", "seen"],
          ["eat", "ate", "eaten"],
          ["write", "wrote", "written"],
          ["speak", "spoke", "spoken"],
          ["take", "took", "taken"],
          ["give", "gave", "given"],
          ["do", "did", "done"],
          ["make", "made", "made"],
          ["buy", "bought", "bought"],
          ["know", "knew", "known"],
          ["find", "found", "found"],
          ["break", "broke", "broken"],
          ["forget", "forgot", "forgotten"],
          ["choose", "chose", "chosen"],
          ["come", "came", "come"],
          ["leave", "left", "left"],
          ["meet", "met", "met"],
          ["lose", "lost", "lost"],
          ["win", "won", "won"],
          ["study", "studied", "studied"],
          ["work", "worked", "worked"],
          ["play", "played", "played"],
          ["visit", "visited", "visited"],
        ],
        "جدول التصريفات الثلاثة — 24 فعلًا",
      ),
    ],
  },
  {
    id: "s3b",
    section: "③ مراجعة سريعة لـ V3",
    title: "V2 وV3 بين التطابق والاختلاف",
    blocks: [
      p("لاحظ أن بعض الأفعال يكون V2 وV3 فيها متطابقين، مثل:"),
      bullets(["buy – bought – bought.", "make – made – made.", "find – found – found."]),
      p("وبعضها يختلف:"),
      bullets(["go – went – gone.", "see – saw – seen.", "write – wrote – written."]),
      h("أمثلة تطبيقية"),
      pairs([
        { en: "If I had gone there, I would have seen him.", ar: "لو كنت قد ذهبت إلى هناك، لكنت رأيته." },
        { en: "If she had written the letter, he would have received it.", ar: "لو كانت قد كتبت الرسالة، لكان قد استلمها." },
        { en: "If they had chosen another hotel, they would have enjoyed the trip more.", ar: "لو كانوا قد اختاروا فندقًا آخر، لاستمتعوا بالرحلة أكثر." },
      ]),
      note("تذكر: بعد had نستخدم V3، وبعد would have نستخدم V3 أيضًا.", "🔁"),
    ],
  },

  // ④ ------------------------------------------------------------------
  {
    id: "s4",
    section: "④ الماضي الحقيقي والماضي الافتراضي",
    title: "④ فهم الفرق بين الماضي الحقيقي والماضي الافتراضي",
    blocks: [
      p("هذه نقطة أساسية لفهم الشرط الثالث."),
      h("لنأخذ موقفًا حقيقيًا:"),
      pairs([{ en: "I didn't study hard, so I failed the exam.", ar: "لم أدرس بجد، ولذلك رسبت في الامتحان." }]),
      p("هذه جملة عادية تصف ما حدث في الماضي."),
      h("الآن نحولها إلى الشرط الثالث:"),
      pairs([{ en: "If I had studied hard, I would have passed the exam.", ar: "لو كنت قد درست بجد، لكنت نجحت في الامتحان." }]),
      h("ما الذي تغير؟"),
      p("في الجملة الأولى نذكر الحقيقة:"),
      bullets(["لم أدرس بجد.", "رسبت في الامتحان."]),
      p("في الجملة الثانية نتخيل ماضيًا مختلفًا:"),
      bullets(["لو درست بجد.", "لكنت نجحت."]),
      p("إذن الشرط الثالث يسمح لنا بالتحدث عن نتيجة لم تحدث، لأنها تعتمد على شرط لم يتحقق."),
      h("مثال آخر — الحقيقة:"),
      pairs([{ en: "She didn't take an umbrella, so she got wet.", ar: "لم تأخذ مظلة، ولذلك ابتلت." }]),
      h("الافتراض:"),
      pairs([{ en: "If she had taken an umbrella, she wouldn't have got wet.", ar: "لو كانت قد أخذت مظلة، لما ابتلت." }]),
      h("مثال ثالث — الحقيقة:"),
      pairs([{ en: "They left late, so they missed the bus.", ar: "غادروا متأخرين، ولذلك فاتتهم الحافلة." }]),
      h("الافتراض:"),
      pairs([{ en: "If they had left earlier, they wouldn't have missed the bus.", ar: "لو كانوا قد غادروا مبكرًا، لما فاتتهم الحافلة." }]),
      p("هذه طريقة ممتازة لتحويل الأحداث الحقيقية إلى جمل شرطية من النوع الثالث."),
    ],
  },

  // ⑤ ------------------------------------------------------------------
  {
    id: "s5",
    section: "⑤ ترتيب جملة الشرط والنتيجة",
    title: "⑤ ترتيب جملة الشرط والنتيجة",
    blocks: [
      p("كما تعلمنا في الشرطين الأول والثاني، يمكن أن تأتي جملة If في البداية أو النهاية."),
      h("الشكل الأول: If في البداية"),
      pairs([{ en: "If I had studied harder, I would have passed.", ar: "لو كنت قد درست بجد أكثر، لكنت نجحت." }]),
      p("نضع فاصلة بعد جملة الشرط."),
      h("الشكل الثاني: If في النهاية"),
      pairs([{ en: "I would have passed if I had studied harder.", ar: "لكنت نجحت لو كنت قد درست بجد أكثر." }]),
      p("لا نحتاج عادةً إلى فاصلة قبل If عندما تأتي في نهاية الجملة."),
      h("أمثلة إضافية:"),
      pairs([
        { en: "If he had arrived earlier, he would have met the manager.", ar: "لو كان قد وصل مبكرًا، لالتقى بالمدير." },
        { en: "He would have met the manager if he had arrived earlier.", ar: "لكان قد التقى بالمدير لو وصل مبكرًا." },
        { en: "If we had booked the tickets, we would have travelled.", ar: "لو كنا قد حجزنا التذاكر، لكنا قد سافرنا." },
        { en: "We would have travelled if we had booked the tickets.", ar: "لكنا قد سافرنا لو حجزنا التذاكر." },
      ]),
      note("المعنى الأساسي لا يتغير بتغيير ترتيب الجزأين.", "🔄"),
    ],
  },

  // ⑥ ------------------------------------------------------------------
  {
    id: "s6a",
    section: "⑥ النفي في Third Conditional",
    title: "⑥ النفي في جملة الشرط",
    blocks: [
      p("يمكننا وضع النفي في جملة الشرط أو في جملة النتيجة أو في كليهما."),
      h("أولًا: النفي في جملة الشرط"),
      formula("had not + V3"),
      p("والاختصار:"),
      formula("hadn't + V3"),
      h("أمثلة:"),
      pairs([
        { en: "If I hadn't forgotten my keys, I wouldn't have waited outside.", ar: "لو لم أكن قد نسيت مفاتيحي، لما انتظرت في الخارج." },
        { en: "If she hadn't missed the bus, she would have arrived on time.", ar: "لو لم تكن قد فاتتها الحافلة، لوصلت في الوقت المحدد." },
        { en: "If they hadn't spent all their money, they would have had enough for the trip.", ar: "لو لم ينفقوا كل أموالهم، لكان لديهم ما يكفي للرحلة." },
      ]),
      p("لاحظ أن النفي بعد had يكون باستخدام V3."),
      en(["hadn't forgotten. ✅ صحيح", "hadn't forgot. ❌ خطأ"], "صحيح / خطأ"),
    ],
  },
  {
    id: "s6b",
    section: "⑥ النفي في Third Conditional",
    title: "⑥ النفي في النتيجة وفي الجزأين",
    blocks: [
      h("ثانيًا: النفي في النتيجة"),
      formula("would not have + V3"),
      p("أو:"),
      formula("wouldn't have + V3"),
      h("أمثلة:"),
      pairs([
        { en: "If I had known, I wouldn't have said that.", ar: "لو كنت قد عرفت، لما قلت ذلك." },
        { en: "If he had listened to the instructions, he wouldn't have made that mistake.", ar: "لو كان قد استمع إلى التعليمات، لما ارتكب ذلك الخطأ." },
        { en: "If we had taken a taxi, we wouldn't have been late.", ar: "لو كنا قد استقللنا سيارة أجرة، لما تأخرنا." },
      ]),
      h("ثالثًا: النفي في الجزأين"),
      pairs([
        { en: "If I hadn't studied, I wouldn't have passed.", ar: "لو لم أكن قد درست، لما نجحت." },
        { en: "If she hadn't helped me, I wouldn't have finished the project.", ar: "لو لم تساعدني، لما أنهيت المشروع." },
        { en: "If they hadn't invited us, we wouldn't have attended the party.", ar: "لو لم يدعونا، لما حضرنا الحفلة." },
      ]),
    ],
  },

  // ⑦ ------------------------------------------------------------------
  {
    id: "s7a",
    section: "⑦ الأسئلة باستخدام Third Conditional",
    title: "⑦ أسئلة What / Where / Who",
    blocks: [
      p("يمكننا تكوين أسئلة افتراضية عن الماضي باستخدام would have."),
      h("من أشهر الأسئلة:"),
      pairs([{ en: "What would you have done if...?", ar: "ماذا كنت ستفعل لو...؟" }]),
      h("أمثلة:"),
      pairs([
        { en: "What would you have done if you had lost your passport?", ar: "ماذا كنت ستفعل لو كنت قد فقدت جواز سفرك؟" },
        { en: "What would you have done if you had missed the flight?", ar: "ماذا كنت ستفعل لو فاتتك الرحلة؟" },
        { en: "What would she have done if she had failed the exam?", ar: "ماذا كانت ستفعل لو رسبت في الامتحان؟" },
        { en: "Where would they have stayed if they had arrived earlier?", ar: "أين كانوا سيقيمون لو وصلوا مبكرًا؟" },
        { en: "Who would you have called if you had needed help?", ar: "بمن كنت ستتصل لو كنت قد احتجت إلى المساعدة؟" },
      ]),
      h("انتبه إلى ترتيب السؤال"),
      formula("What + would + subject + have + V3 + if + subject + had + V3?"),
      h("مثال:"),
      pairs([{ en: "What would you have bought if you had won the competition?", ar: "ماذا كنت ستشتري لو كنت قد فزت بالمسابقة؟" }]),
    ],
  },
  {
    id: "s7b",
    section: "⑦ الأسئلة باستخدام Third Conditional",
    title: "⑦ أسئلة Would والإجابات القصيرة",
    blocks: [
      h("أسئلة تبدأ بـ Would"),
      pairs([
        { en: "Would you have helped me if I had asked you?", ar: "هل كنت ستساعدني لو كنت قد طلبت منك ذلك؟" },
        { en: "Would she have accepted the job if they had offered it?", ar: "هل كانت ستقبل الوظيفة لو كانوا قد عرضوها عليها؟" },
        { en: "Would they have come if we had invited them?", ar: "هل كانوا سيأتون لو كنا قد دعوناهم؟" },
      ]),
      h("الإجابات القصيرة:"),
      en([
        "Yes, I would have.",
        "No, I wouldn't have.",
        "Yes, she would have.",
        "No, she wouldn't have.",
      ], "الإجابات القصيرة"),
      note("في الإجابة القصيرة يبقى have بعد would ولا يُذكر الفعل بعده.", "✋"),
    ],
  },

  // ⑧ ------------------------------------------------------------------
  {
    id: "s8",
    section: "⑧ استخدام COULD HAVE",
    title: "⑧ استخدام COULD HAVE في نتيجة الشرط الثالث",
    blocks: [
      p("يمكننا استخدام could have + V3 بدل would have + V3."),
      p("نستخدم could have للتعبير عن القدرة أو الإمكانية التي كانت متاحة في الماضي، ولكنها لم تتحقق."),
      h("القاعدة:"),
      formula("If + Past Perfect, could have + V3"),
      h("أمثلة:"),
      pairs([
        { en: "If I had studied harder, I could have passed the exam.", ar: "لو كنت قد درست بجد أكثر، لكان بإمكاني النجاح في الامتحان." },
        { en: "If we had left earlier, we could have caught the train.", ar: "لو كنا قد غادرنا مبكرًا، لكان بإمكاننا اللحاق بالقطار." },
        { en: "If she had practiced more, she could have won the competition.", ar: "لو كانت قد تدربت أكثر، لكان بإمكانها الفوز بالمسابقة." },
      ]),
      h("الفرق بين WOULD HAVE وCOULD HAVE — قارن:"),
      pairs([
        { en: "If I had had enough money, I would have bought a car.", ar: "لو كان لدي مال كافٍ، لكنت قد اشتريت سيارة." },
        { en: "If I had had enough money, I could have bought a car.", ar: "لو كان لدي مال كافٍ، لكان بإمكاني شراء سيارة." },
      ]),
      p("هنا نتحدث في الجملة الأولى عن النتيجة الافتراضية التي كنا سنختارها، وفي الثانية عن الإمكانية أو القدرة التي كانت متاحة."),
      h("مثال آخر:"),
      pairs([
        { en: "If he had studied, he would have passed.", ar: "لو كان قد درس، لكان قد نجح." },
        { en: "If he had studied, he could have passed.", ar: "لو كان قد درس، لكان بإمكانه النجاح." },
      ]),
      p("الجملة الثانية تركز على إمكانية النجاح، وليس بالضرورة على الجزم بأن النجاح كان سيحدث."),
    ],
  },

  // ⑨ ------------------------------------------------------------------
  {
    id: "s9",
    section: "⑨ استخدام MIGHT HAVE",
    title: "⑨ استخدام MIGHT HAVE في نتيجة الشرط الثالث",
    blocks: [
      p("نستخدم might have + V3 عندما نريد التعبير عن احتمال افتراضي في الماضي."),
      h("القاعدة:"),
      formula("If + Past Perfect, might have + V3"),
      h("أمثلة:"),
      pairs([
        { en: "If we had invited Sara, she might have come.", ar: "لو كنا قد دعونا سارة، فربما كانت قد حضرت." },
        { en: "If he had taken the other road, he might have arrived earlier.", ar: "لو كان قد سلك الطريق الآخر، فربما كان قد وصل مبكرًا." },
        { en: "If I had applied for that job, I might have got it.", ar: "لو كنت قد تقدمت لتلك الوظيفة، فربما كنت قد حصلت عليها." },
      ]),
      h("قارن:"),
      pairs([
        { en: "If I had studied, I would have passed.", ar: "لو درست، لنجحت." },
        { en: "If I had studied, I could have passed.", ar: "لو درست، لكان بإمكاني النجاح." },
        { en: "If I had studied, I might have passed.", ar: "لو درست، فربما كنت قد نجحت." },
      ]),
      h("الاختلاف:"),
      bullets([
        "would have: نتيجة افتراضية متوقعة.",
        "could have: إمكانية أو قدرة.",
        "might have: احتمال.",
      ]),
    ],
  },

  // ⑩ ------------------------------------------------------------------
  {
    id: "s10",
    section: "⑩ SHOULD HAVE في الندم واللوم",
    title: "⑩ استخدام SHOULD HAVE في الندم واللوم",
    blocks: [
      p("هذه نقطة مهمة ترتبط بما تعلمناه في درس Modal Perfect رقم 49."),
      p("سبق أن درسنا:"),
      formula("Should have + V3"),
      p("وهو يُستخدم للتعبير عن نصيحة كان ينبغي اتباعها في الماضي، أو عن الندم واللوم."),
      h("مثال:"),
      pairs([{ en: "I should have studied harder.", ar: "كان ينبغي أن أدرس بجد أكثر." }]),
      p("يمكننا الآن ربطه بالشرط الثالث:"),
      pairs([{ en: "If I had studied harder, I would have passed the exam.", ar: "لو كنت قد درست بجد أكثر، لكنت نجحت في الامتحان." }]),
      h("لاحظ العلاقة:"),
      bullets([
        "Should have: كان ينبغي أن أفعل شيئًا.",
        "If I had...: لو أنني فعلت ذلك، لكانت النتيجة مختلفة.",
      ]),
      h("أمثلة:"),
      pairs([
        { en: "I should have left earlier.", ar: "كان ينبغي أن أغادر مبكرًا." },
        { en: "If I had left earlier, I wouldn't have missed the train.", ar: "لو كنت قد غادرت مبكرًا، لما فاتني القطار." },
        { en: "She should have checked the address.", ar: "كان ينبغي أن تتحقق من العنوان." },
        { en: "If she had checked the address, she wouldn't have gone to the wrong place.", ar: "لو كانت قد تحققت من العنوان، لما ذهبت إلى المكان الخطأ." },
      ]),
      p("إذن يمكن أن نستخدم الشرط الثالث لتوضيح النتيجة التي كانت ستحدث لو أننا اتبعنا النصيحة."),
    ],
  },

  // ⑪ ------------------------------------------------------------------
  {
    id: "s11",
    section: "⑪ استخدام HAD HAD",
    title: "⑪ استخدام HAD HAD في الشرط الثالث",
    blocks: [
      p("قد يبدو هذا التركيب غريبًا في البداية:"),
      pairs([{ en: "If I had had more money, I would have travelled.", ar: "لو كان لدي مال أكثر، لكنت قد سافرت." }]),
      h("لماذا كتبنا had مرتين؟"),
      p("لأن:"),
      bullets([
        "الأولى: had فعل مساعد لتكوين الماضي التام.",
        "الثانية: had هي V3 من الفعل have.",
      ]),
      p("إذن:"),
      formula("had + had"),
      p("الأولى فعل مساعد، والثانية الفعل الأساسي في التصريف الثالث."),
      h("أمثلة:"),
      pairs([
        { en: "If she had had more time, she would have finished the project.", ar: "لو كان لديها وقت أكثر، لأنجزت المشروع." },
        { en: "If we had had a car, we could have visited the village.", ar: "لو كانت لدينا سيارة، لاستطعنا زيارة القرية." },
        { en: "If he had had enough information, he would have made a better decision.", ar: "لو كانت لديه معلومات كافية، لاتخذ قرارًا أفضل." },
      ]),
      note("لا تخف من هذا التركيب. إنه صحيح تمامًا من الناحية النحوية.", "✅"),
    ],
  },

  // ⑫ ------------------------------------------------------------------
  {
    id: "s12",
    section: "⑫ الفرق بين IF I HAD وIF I HAD HAD",
    title: "⑫ الفرق بين IF I HAD وIF I HAD HAD",
    blocks: [
      p("هذه نقطة دقيقة ومهمة. قارن:"),
      pairs([
        { en: "If I had more money, I would buy a car.", ar: "لو كان لدي مال أكثر، لاشتريت سيارة." },
      ]),
      p("هذه Second Conditional، وتتحدث عن وضع افتراضي في الحاضر."),
      p("أما:"),
      pairs([
        { en: "If I had had more money, I would have bought a car.", ar: "لو كان لدي مال أكثر في ذلك الوقت، لكنت قد اشتريت سيارة." },
      ]),
      p("هذه Third Conditional، وتتحدث عن موقف افتراضي في الماضي."),
      h("لاحظ:"),
      bullets([
        "① If I had more money... — had هنا هي الماضي من have، والحديث افتراضي عن الحاضر.",
        "② If I had had more money... — had الأولى فعل مساعد، وhad الثانية V3 من have، والحديث عن الماضي.",
      ], true),
      h("مثال آخر:"),
      pairs([
        { en: "If I had time, I would help you.", ar: "لو كان لدي وقت، لساعدتك." },
        { en: "If I had had time, I would have helped you.", ar: "لو كان لدي وقت في ذلك الوقت، لكنت قد ساعدتك." },
      ]),
      en(["If I had time → Second Conditional", "If I had had time → Third Conditional"], "الخلاصة"),
    ],
  },

  // ⑬ ------------------------------------------------------------------
  {
    id: "s13",
    section: "⑬ Third Conditional وPast Perfect",
    title: "⑬ الفرق بين Third Conditional وPast Perfect",
    blocks: [
      p("قد تلاحظ أن الشرط الثالث يستخدم Past Perfect، وهو الزمن الذي درسناه سابقًا. لكن هناك فرق في الوظيفة."),
      h("Past Perfect:"),
      pairs([{ en: "She had left before I arrived.", ar: "كانت قد غادرت قبل أن أصل." }]),
      p("هنا نستخدم الماضي التام لتوضيح أن حدثًا وقع قبل حدث آخر في الماضي."),
      h("Third Conditional:"),
      pairs([{ en: "If she had left earlier, she would have caught the train.", ar: "لو كانت قد غادرت مبكرًا، للحقت بالقطار." }]),
      p("هنا نستخدم الماضي التام داخل جملة الشرط لنتخيل موقفًا مختلفًا في الماضي."),
      h("إذن:"),
      bullets([
        "Past Perfect: ترتيب الأحداث في الماضي.",
        "Third Conditional: افتراض نتيجة مختلفة لحدث في الماضي.",
      ]),
    ],
  },

  // ⑭ ------------------------------------------------------------------
  {
    id: "s14",
    section: "⑭ استخدام UNLESS",
    title: "⑭ استخدام UNLESS في الشرط الثالث",
    blocks: [
      p("سبق أن تعلمنا أن unless تعني if not. يمكننا استخدامها في الشرط الثالث أيضًا."),
      h("مثال:"),
      pairs([
        { en: "If you hadn't helped me, I would have failed.", ar: "لو لم تكن قد ساعدتني، لكنت قد رسبت." },
      ]),
      p("يمكننا إعادة صياغتها:"),
      pairs([
        { en: "Unless you had helped me, I would have failed.", ar: "لولا أنك ساعدتني، لكنت قد رسبت." },
      ]),
      h("مثال آخر:"),
      pairs([
        { en: "If he hadn't taken a taxi, he would have missed the flight.", ar: "لو لم يكن قد استقل سيارة أجرة، لفاته موعد الرحلة." },
        { en: "Unless he had taken a taxi, he would have missed the flight.", ar: "لولا أنه استقل سيارة أجرة، لفاته موعد الرحلة." },
      ]),
      p("لاحظ أن تركيب unless في الشرط الثالث يأتي بعده Past Perfect:"),
      formula("Unless + subject + had + V3"),
      p("ولا نضيف not بعد unless في هذا المعنى؛ لأن unless تحمل معنى النفي أصلًا."),
    ],
  },

  // ⑮ ------------------------------------------------------------------
  {
    id: "s15",
    section: "⑮ Could Have في جملة الشرط",
    title: "⑮ استخدام Could Have في جملة الشرط",
    blocks: [
      p("يمكن أن نستخدم could have + V3 في جملة الشرط عندما نتحدث عن قدرة أو إمكانية كانت متاحة في الماضي."),
      h("مثال:"),
      pairs([{ en: "If I could have stayed longer, I would have visited the museum.", ar: "لو كان بإمكاني البقاء مدة أطول، لكنت قد زرت المتحف." }]),
      h("مثال آخر:"),
      pairs([{ en: "If she could have attended the meeting, she would have explained her idea.", ar: "لو كان بإمكانها حضور الاجتماع، لكانت قد شرحت فكرتها." }]),
      p("هذا التركيب يختلف قليلًا عن القاعدة الأساسية، ويُستخدم بحسب المعنى والسياق."),
      p("في الوقت الحالي ركز على القاعدة الأساسية:"),
      formula("If + had + V3, would have + V3"),
      p("ثم تعرف على هذه الصيغة الإضافية دون أن تجعلها تربكك."),
    ],
  },

  // ⑯ ------------------------------------------------------------------
  {
    id: "s16a",
    section: "⑯ مقارنة الأنواع الأربعة للشرط",
    title: "⑯ مقارنة الأنواع الأربعة للشرط",
    blocks: [
      p("الآن أصبح لدينا أربعة أنواع من الجمل الشرطية."),
      table(
        ["النوع", "القاعدة", "الاستخدام"],
        [
          ["Zero", "If + Present, Present", "حقائق عامة"],
          ["First", "If + Present, will + V1", "احتمال مستقبلي واقعي"],
          ["Second", "If + Past, would + V1", "افتراض في الحاضر أو المستقبل"],
          ["Third", "If + Past Perfect, would have + V3", "افتراض عن الماضي"],
        ],
        "الأنواع الأربعة",
      ),
    ],
  },
  {
    id: "s16b",
    section: "⑯ مقارنة الأنواع الأربعة للشرط",
    title: "فكرة واحدة في الأنواع الأربعة",
    blocks: [
      p("لنأخذ فكرة واحدة ونستخدمها في الأنواع الأربعة."),
      h("Zero Conditional"),
      pairs([{ en: "If I don't study, I get bad grades.", ar: "إذا لم أدرس، أحصل على درجات سيئة." }]),
      p("هذه نتيجة معتادة أو عامة."),
      h("First Conditional"),
      pairs([{ en: "If I don't study tonight, I will get a bad grade tomorrow.", ar: "إذا لم أدرس الليلة، فسأحصل على درجة سيئة غدًا." }]),
      p("هذا احتمال مستقبلي."),
      h("Second Conditional"),
      pairs([{ en: "If I didn't have so much work, I would study more.", ar: "لو لم يكن لدي كل هذا العمل، لدرست أكثر." }]),
      p("هذا افتراض عن وضع الحاضر."),
      h("Third Conditional"),
      pairs([{ en: "If I hadn't studied, I would have failed the exam.", ar: "لو لم أكن قد درست، لكنت قد رسبت في الامتحان." }]),
      p("هذا افتراض عن الماضي."),
      h("الفكرة التي يجب أن تتذكرها"),
      bullets([
        "Zero: ماذا يحدث عادةً؟",
        "First: ماذا سيحدث إذا تحقق الشرط؟",
        "Second: ماذا كان سيحدث لو كان الواقع مختلفًا الآن؟",
        "Third: ماذا كان سيحدث لو كان الماضي مختلفًا؟",
      ]),
    ],
  },
];

// ⑰ المحادثة -------------------------------------------------------------
export const DIALOGUE_54: readonly Pair54[] = [
  { en: "Alex: Why didn't you come to the meeting yesterday?", ar: "لماذا لم تأتِ إلى الاجتماع أمس؟" },
  { en: "Sam: I missed the train, so I arrived too late.", ar: "فاتني القطار، ولذلك وصلت متأخرًا جدًا." },
  { en: "Alex: What happened?", ar: "ماذا حدث؟" },
  { en: "Sam: I woke up late. If I had woken up earlier, I would have caught the train.", ar: "استيقظت متأخرًا. لو كنت قد استيقظت مبكرًا، للحقت بالقطار." },
  { en: "Alex: That's unfortunate. Why didn't you take a taxi?", ar: "هذا مؤسف. لماذا لم تستقل سيارة أجرة؟" },
  { en: "Sam: I didn't have enough money. If I had had more money, I could have taken a taxi.", ar: "لم يكن لدي مال كافٍ. لو كان لدي مال أكثر، لكان بإمكاني استئجار سيارة أجرة." },
  { en: "Alex: Did you call the manager?", ar: "هل اتصلت بالمدير؟" },
  { en: "Sam: No, I forgot. If I had remembered to call him, he might have waited for me.", ar: "لا، لقد نسيت. لو كنت قد تذكرت الاتصال به، فربما كان قد انتظرني." },
  { en: "Alex: You should have called him.", ar: "كان ينبغي أن تتصل به." },
  { en: "Sam: I know. If I had called him, things might have been different.", ar: "أعرف. لو كنت قد اتصلت به، فربما كانت الأمور مختلفة." },
];

export const DIALOGUE_QA_54: readonly { q: string; a: string }[] = [
  { q: "Why did Sam miss the meeting?", a: "Because he missed the train and arrived too late." },
  { q: "What would have happened if Sam had woken up earlier?", a: "He would have caught the train." },
  { q: "Why couldn't Sam take a taxi?", a: "Because he didn't have enough money." },
  { q: "What could Sam have done if he had had more money?", a: "He could have taken a taxi." },
  { q: "What might the manager have done if Sam had called him?", a: "He might have waited for him." },
  { q: "What does Alex think Sam should have done?", a: "He thinks Sam should have called the manager." },
];

// ⑱ القراءة --------------------------------------------------------------
export const READING_54: readonly string[] = [
  "The Important Decision",
  "Last year, Nora had an opportunity to study abroad. She received an offer from a university in another country, but she was afraid of leaving her family and friends.",
  "She decided not to accept the offer. A few months later, she began to regret her decision.",
  `She thought, "If I had accepted the offer, I would have studied at a wonderful university. I would have met students from different countries, and I might have learned a new language."`,
  `Her brother told her that she shouldn't be too hard on herself. He said, "If you had asked me for advice, I would have encouraged you to accept the offer. But you can still look for other opportunities."`,
  "Nora realized that she had learned an important lesson. If she had thought more carefully before making her decision, she might have chosen differently.",
  "Now she is preparing to apply to another university. She knows that she cannot change the past, but she can make better decisions in the future.",
];

export const READING_AR_54: readonly string[] = [
  "في العام الماضي، حصلت نورا على فرصة للدراسة في الخارج. تلقت عرضًا من جامعة في بلد آخر، لكنها كانت خائفة من الابتعاد عن عائلتها وأصدقائها.",
  "قررت عدم قبول العرض. وبعد بضعة أشهر، بدأت تشعر بالندم على قرارها.",
  "فكرت قائلة: «لو كنت قد قبلت العرض، لدرست في جامعة رائعة. ولكنت التقيت طلابًا من بلدان مختلفة، وربما كنت قد تعلمت لغة جديدة».",
  "أخبرها أخوها أنه لا ينبغي أن تكون قاسية جدًا على نفسها. وقال لها: «لو كنت قد طلبت مني النصيحة، لكنت شجعتك على قبول العرض. لكن لا يزال بإمكانك البحث عن فرص أخرى».",
  "أدركت نورا أنها تعلمت درسًا مهمًا. فلو كانت قد فكرت بعناية أكبر قبل اتخاذ قرارها، فربما كانت قد اختارت بطريقة مختلفة.",
  "والآن تستعد للتقدم إلى جامعة أخرى. إنها تعرف أنها لا تستطيع تغيير الماضي، لكنها تستطيع اتخاذ قرارات أفضل في المستقبل.",
];

export const READING_QA_54: readonly { q: string; a: string }[] = [
  { q: "What opportunity did Nora receive last year?", a: "She received an offer to study abroad." },
  { q: "Why didn't she accept the offer?", a: "Because she was afraid of leaving her family and friends." },
  { q: "What would she have done if she had accepted the offer?", a: "She would have studied at a wonderful university and met students from different countries." },
  { q: "What might she have learned?", a: "She might have learned a new language." },
  { q: "What would her brother have done if she had asked him for advice?", a: "He would have encouraged her to accept the offer." },
  { q: "What lesson did Nora learn?", a: "She learned that she should think carefully before making important decisions." },
  { q: "Can Nora change the past?", a: "No, she cannot change the past." },
  { q: "What is she preparing to do now?", a: "She is preparing to apply to another university." },
];

// ㉓ الكتابة --------------------------------------------------------------
export const WRITING_PROMPTS_54: readonly string[] = [
  "① شيء كنت تتمنى أن تفعله بشكل مختلف.",
  "② فرصة لم تستغلها.",
  "③ قرار كنت ستتخذه بطريقة مختلفة.",
  "④ نصيحة لم تستمع إليها.",
  "⑤ موقف كنت ستتجنبه لو كنت أكثر حذرًا.",
  "⑥ شخص كنت ستساعده لو عرفت أنه يحتاج إلى المساعدة.",
];

export const WRITING_START_54: readonly string[] = [
  "If I could change one thing in my past, I would...",
  "If I had studied harder, I would have...",
  "If I had listened to the advice, I might have...",
  "If I had planned my time better, I could have...",
];

export const WRITING_MODEL_54 =
  "If I Could Change One Thing in My Past. If I could change one thing in my past, I would make better use of my time. If I had organized my schedule better, I would have finished many tasks earlier. If I had studied English every day, I could have improved faster. If I had listened to some advice, I might have avoided a few mistakes. If I had asked more questions, I would have understood some lessons better. If I had taken more opportunities, I might have learned new skills. I cannot change the past, but I can learn from it and make better decisions in the future.";

// ㉔ التحدث ---------------------------------------------------------------
export const SPEAKING_54: readonly string[] = [
  "What would you have done if you had won a big prize last year?",
  "What would you have changed if you could change one decision in your past?",
  "What would you have done if you had missed an important exam?",
  "Who would you have helped if you had had more money?",
  "What could you have achieved if you had studied harder?",
  "What might have happened if you had moved to another country?",
  "What would you have done if you had known about an important opportunity earlier?",
];

export const SPEAKING_MODEL_54 =
  "If I had won a big prize last year, I would have saved some of the money. I could have used the rest to help my family. I might have travelled to another country.";

// ㉕ المراجعة -------------------------------------------------------------
export const REVIEW_54: readonly Pair54[] = [
  { en: "If I don't study, I get bad grades.", ar: "إذا لم أدرس، أحصل على درجات سيئة. — نتيجة عامة أو معتادة." },
  { en: "If I don't study tonight, I will get bad grades tomorrow.", ar: "إذا لم أدرس الليلة، فسأحصل على درجات سيئة غدًا. — احتمال مستقبلي واقعي." },
  { en: "If I didn't have so much homework, I would study more.", ar: "لو لم يكن لدي كل هذا الواجب، لدرست أكثر. — افتراض عن الحاضر أو المستقبل." },
  { en: "If I hadn't studied, I would have failed the exam.", ar: "لو لم أكن قد درست، لكنت قد رسبت في الامتحان. — افتراض عن الماضي." },
];

export const REVIEW_TABLE_54 = {
  head: ["النوع", "جملة If", "النتيجة"],
  rows: [
    ["Zero", "Present Simple", "Present Simple"],
    ["First", "Present Simple", "will + V1"],
    ["Second", "Past Simple", "would + V1"],
    ["Third", "Past Perfect", "would have + V3"],
  ],
};

// ㉖ الملخص ---------------------------------------------------------------
export const SUMMARY_54: readonly string[] = [
  "① القاعدة الأساسية: If + had + V3, would have + V3",
  "② نستخدم Third Conditional للتحدث عن مواقف ماضية لم تحدث، ونتخيل نتائج مختلفة لها.",
  "③ بعد had نستخدم V3.",
  "④ بعد would have نستخدم V3.",
  "⑤ يمكن استخدام hadn't لنفي الشرط.",
  "⑥ يمكن استخدام wouldn't have لنفي النتيجة.",
  "⑦ نستخدم could have للتعبير عن القدرة أو الإمكانية التي كانت متاحة في الماضي.",
  "⑧ نستخدم might have للتعبير عن احتمال افتراضي في الماضي.",
  "⑨ يمكن استخدام unless بدل if not.",
  "⑩ التركيب had had صحيح؛ لأن had الأولى فعل مساعد، والثانية التصريف الثالث من have.",
  "⑪ يمكن استخدام الشرط الثالث للتعبير عن الندم والفرص الضائعة والنتائج التي لم تحدث.",
  "⑫ يجب التمييز بين Past Perfect الذي يوضح ترتيب الأحداث الماضية، وThird Conditional الذي يتخيل نتيجة مختلفة للماضي.",
];

export const SUMMARY_EXAMPLE_54: Pair54 = {
  en: "If I had studied harder, I would have passed the exam.",
  ar: "لو كنت قد درست بجد أكثر، لكنت نجحت في الامتحان.",
};

// ㉗ التقدم والدرس القادم --------------------------------------------------
export const COMPLETED_54: readonly string[] = [
  "الدرس 49: Modal Perfect.",
  "الدرس 50: Deduction & Speculation.",
  "الدرس 51: Zero Conditional.",
  "الدرس 52: First Conditional.",
  "الدرس 53: Second Conditional.",
  "الدرس 54: Third Conditional.",
];

export const ROADMAP_54: readonly Pair54[] = [
  { en: "If I had studied medicine, I would be a doctor now.", ar: "لو كنت قد درست الطب، لكنت طبيبًا الآن." },
];

export const ROADMAP_NOTES_54: readonly string[] = [
  "في الدرس القادم سندرس الشرط المختلط، وهو مستوى أكثر تقدمًا.",
  "سنتعلم كيف نربط بين شرط في الماضي ونتيجة في الحاضر، أو بين حالة في الحاضر ونتيجة افتراضية في الماضي.",
  "الشرط يتحدث عن الماضي: had studied. والنتيجة تتحدث عن الحاضر: would be. وهذا هو جوهر Mixed Conditionals.",
];
