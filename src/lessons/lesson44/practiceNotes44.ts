// Platform-authored explanations for each practice answer.
export function practiceReason44(section: number, number: number): string {
  const key = `${section}-${number}`;
  const reasons: Record<string, string> = {
    '28-1': 'المتحدث يؤكد لنفسه أهمية التحسن — ضرورة شخصية تستخدم MUST.',
    '28-2': 'الفاعل She مفرد غائب، لذلك نستخدم has to وليس have to.',
    '28-3': 'MUST ثابتة الصيغة مع كل الفاعلين. لا نضيف s.',
    '28-4': 'My father مفرد غائب، لذلك has to.',
    '28-5': 'تعليمات إلزامية تستخدم MUST. لا نستخدم musts.',
    '29-1': "المعنى العربي 'يُمنع' = MUSTN'T (المنع).",
    '29-2': "المعنى العربي 'لست مضطرًا' = DON'T HAVE TO (عدم الضرورة).",
    '29-3': "الغش ممنوع = MUSTN'T.",
    '29-4': "التذاكر مجانية، إذًا الدفع غير ضروري = DON'T HAVE TO.",
    '29-5': "لا يُسمح = MUSTN'T (منع).",
    '30-1': 'Yesterday = الماضي. نستخدم had to.',
    '30-2': "last weekend = الماضي + النفي. didn't have to.",
    '30-3': 'yesterday = السؤال في الماضي. Did + subject + have to.',
    '30-4': 'Tomorrow = المستقبل. will have to.',
    '30-5': "next week = المستقبل + النفي. won't have to.",
    '31-1': 'She = مفرد غائب. Does + she + have to + V1.',
    '31-2': 'They = جمع. Do + they + have to + V1.',
    '31-3': 'yesterday = الماضي. Did + Omar + have to + V1.',
    '31-4': 'will have to → Will + we + have to + V1.',
    '31-5': 'MUST في السؤال: Must you...? أو الأكثر شيوعًا: Do you have to...?',
    '32-1': "ليس من الضروري = doesn't have to (حاضر + مفرد غائب).",
    '32-2': "لم يكن ضروريًا = didn't have to (ماضٍ).",
    '32-3': "لن يكون ضروريًا = won't have to (مستقبل).",
    '32-4': "الدخول ممنوع = mustn't (منع).",
    '32-5': "غير ضروري = don't have to (جمع).",
  };
  return reasons[key] ?? 'راجع المصدر والشرح في الدرس.';
}
