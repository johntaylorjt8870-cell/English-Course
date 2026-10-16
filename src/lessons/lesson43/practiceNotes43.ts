// Platform-authored reasoning for every practice item. Source keys stay
// in practiceData43; these notes explain the rule behind each key.
export function practiceReason43(section: number, number: number): string {
  const table: Record<number, Record<number, string>> = {
    27: {
      1: 'الجملة عن احتمال مستقبلي؛ MAY وMIGHT قابلتان للتبادل هنا. الهدف من التدريب: فهم المعنى لا التخمين بين «احتمال قوي» و«احتمال ضعيف» — لا توجد نسب مئوية ثابتة.',
      2: 'الاحتمال في الحاضر يقبل الصيغتين: She may be at home now. / She might be at home now. السياق لا يفرض تحفظًا أكبر.',
      3: 'We may need more information. وWe might need more information. كلتاهما صحيحة؛ المصدر يقرر ذلك صراحة في §11.',
      4: 'الاحتمال في المستقبل (الوصول متأخرًا) يقبل الصيغتين بحسب درجة التحفظ التي يريدها المتحدث.',
      5: 'This plan may work. وThis plan might work. كلتاهما صحيحة — زوج §11 الخامس والسادس.',
      6: 'زيارة قادمة مقترحة لا مؤكدة؛ الصيغتان صحيحتان والاختيار أسلوبي لا آلي.',
    },
    28: {
      1: 'MAY فعل ناقص ثابت الصيغة: لا mays مع أي فاعل، ويبقى الفعل الرئيسي V1 (be).',
      2: 'بعد MIGHT نستخدم V1 مباشرة: arrive دون s ودون to ودون ing.',
      3: 'طلب الإذن يبدأ بالفعل الناقص نفسه: May I ask a question؟ لا نستخدم Do أو Does مع MAY.',
      4: 'بعد MAY NOT يبقى الفعل الرئيسي بصيغته الأساسية V1: come.',
      5: 'احتمال الماضي: MAY HAVE + V3 — missed هي صيغة V3 من miss.',
      6: 'احتمال الماضي: MIGHT HAVE + V3 — lost هي صيغة V3 من lose.',
    },
    29: {
      1: '«ربما» في بداية الجملة كلمة مستقلة ظرفية: Maybe we\'ll visit the museum tomorrow.',
      2: 'الفاعل أولًا ثم الفعل الناقص ثم الصيغة الأساسية من BE: She may be at home now.',
      3: 'الكلمة المستقلة Maybe تتصدر الجملة التي تقدمها كظرف.',
      4: 'تركيب MAY + BE بعد الفاعل: This exercise may be difficult.',
      5: 'Maybe ظرف مستقل؛ ما بعدها جملة كاملة بفعلها الخاص.',
      6: 'may فعل ناقص + be فعل رابط: He may be our new classmate.',
    },
    30: {
      1: 'Perhaps تعني «ربما»؛ إعادة الصياغة بـ may have + V3 تطرح الاحتمال نفسه بصيغة تتعلق بالماضي: He may have lost his phone.',
      2: 'النموذج يستخدم MIGHT HAVE: They might have missed the train. MAY مقبولة أيضًا حين يسمح السياق بذلك.',
      3: 'Maya may have misunderstood the instructions — الفاعل اسم علم يبقى كما هو بعد MAY HAVE.',
      4: 'النموذج يستخدم MIGHT HAVE: We might have made a mistake. التبديل إلى MAY صحيح نحويًا في هذا السياق.',
      5: 'The teacher may have changed the timetable — التركيب التام بعد MAY لا يعني أن الحدث وقع مؤكدًا.',
    },
    31: {
      1: 'MAY لا تأخذ s مع أي فاعل: She may come tomorrow. — لا She mays come.',
      2: 'بعد MIGHT يأتي الفعل بصيغته الأساسية V1: He might come late. — لا comes.',
      3: 'لا نضع to بعد MAY: They may visit us. — لا They may to visit us.',
      4: 'بعد MAY نستخدم الصيغة الأساسية من BE: She may be tired. — لا She may is tired.',
      5: 'Maybe ظرف يحتاج جملة كاملة بفعل رئيسي: Maybe she is tired. — أو البديل النحوي She may be tired.',
      6: 'بعد HAVE نستخدم V3: gone وليس went. He may have gone home.',
      7: 'بعد HAVE نستخدم V3: forgotten وليس forgot. They might have forgotten the meeting.',
      8: 'May she come? صياغة ممكنة نحويًا في سياقات معينة، لكن في الاستعمال اليومي يُفضَّل غالبًا إعادة صياغة السؤال بحسب المعنى، مثل: Is she likely to come? — لا تُفرض إعادة صياغة واحدة على جميع السياقات.',
      9: 'النفي يوضع بعد MIGHT مباشرة قبل الفعل: She might not come. — لا She might not comes.',
      10: 'لا نجمع فعلين ناقصين في جملة واحدة: I may travel tomorrow. — لا I may will travel.',
    },
    32: {
      1: 'النص يقول: The students are preparing for a school trip to a science museum — الوجهة هي المتحف العلمي.',
      2: 'the weather forecast is uncertain — التوقع غير مؤكد، ولهذا تلجأ الشخصيات إلى MAY وMIGHT.',
      3: 'It may rain tomorrow تعبّر عن احتمال مستقبلي لا عن واقع مؤكد.',
      4: 'It might be sunny تعبّر هي الأخرى عن احتمال مستقبلي؛ الجملة التالية تؤكد: We can\'t be sure.',
      5: 'I may have left it at home — Daniel يعتقد احتمالًا يتعلق بالماضي (may have + V3).',
      6: 'Daniel checks again. You\'re right! It was there. — دفتره كان في حقيبته الأخرى.',
      7: 'Maybe في القصة ظرف بمعنى «ربما» — كلمة واحدة مستقلة.',
      8: 'May I remind everyone…؟ طريقة مهذبة ورسمية نسبيًا لتقديم تذكير — طلب إذن بأسلوب لبق.',
      9: 'Omar يقترح المظلات لأن المطر احتمال وارد: It may rain tomorrow.',
      10: 'The weather can change quickly — إمكانية عامة عن الطقس، لا احتمالًا في موقف محدد.',
    },
  };
  return table[section]?.[number] ?? 'راجع القاعدة في خطوة المصدر المقابلة.';
}
