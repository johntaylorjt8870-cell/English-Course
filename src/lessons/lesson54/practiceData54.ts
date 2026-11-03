// ============================================================
// الدرس 54 — ⑲ تدريبات الدرس (8 تدريبات · 58 سؤالًا)
// و ⑳ إجابات التدريبات مع الشرح (مخزّنة مع كل سؤال + عرض مجمّع)
// ============================================================

export type PracticeItem54 = {
  prompt: string;
  options?: readonly string[];
  answer: string;
  explanation?: string;
};

export type Practice54 = {
  id: string;
  title: string;
  instruction: string;
  example?: string;
  note?: string;
  items: readonly PracticeItem54[];
};

export const PRACTICE_54: readonly Practice54[] = [
  {
    id: "practice-1",
    title: "التدريب الأول: ضع الفعل في الصورة الصحيحة",
    instruction: "استخدم Past Perfect في جملة If، وwould have + V3 في النتيجة.",
    items: [
      {
        prompt: "If I (study) harder, I (pass) the exam.",
        answer: "If I had studied harder, I would have passed the exam.",
        explanation: "had studied: الماضي التام. would have passed: النتيجة الافتراضية في الماضي.",
      },
      {
        prompt: "If she (wake up) earlier, she (catch) the bus.",
        answer: "If she had woken up earlier, she would have caught the bus.",
        explanation: "had woken: V3 من wake. would have caught: V3 من catch.",
      },
      { prompt: "If they (leave) on time, they (arrive) early.", answer: "If they had left on time, they would have arrived early." },
      {
        prompt: "If he (know) the truth, he (tell) us.",
        answer: "If he had known the truth, he would have told us.",
        explanation: "known: التصريف الثالث من know. told: التصريف الثالث من tell.",
      },
      { prompt: "If we (book) the tickets, we (travel) yesterday.", answer: "If we had booked the tickets, we would have travelled yesterday." },
      { prompt: "If I (take) an umbrella, I (not get) wet.", answer: "If I had taken an umbrella, I wouldn't have got wet." },
      { prompt: "If she (practice) more, she (win) the competition.", answer: "If she had practiced more, she would have won the competition." },
      { prompt: "If they (invite) me, I (attend) the party.", answer: "If they had invited me, I would have attended the party." },
      { prompt: "If he (not forget) his keys, he (not wait) outside.", answer: "If he hadn't forgotten his keys, he wouldn't have waited outside." },
      { prompt: "If you (tell) me earlier, I (help) you.", answer: "If you had told me earlier, I would have helped you." },
    ],
  },
  {
    id: "practice-2",
    title: "التدريب الثاني: اختر الإجابة الصحيحة",
    instruction: "اختر الإجابة الصحيحة من الخيارات.",
    items: [
      {
        prompt: "If I had studied harder, I _____ the exam.",
        options: ["A. will pass", "B. would pass", "C. would have passed", "D. passed"],
        answer: "C. would have passed.",
        explanation: "لأن النتيجة في الشرط الثالث تتكون من would have + V3.",
      },
      {
        prompt: "If she had left earlier, she _____ the train.",
        options: ["A. would catch", "B. would have caught", "C. will catch", "D. catches"],
        answer: "B. would have caught.",
        explanation: "لأننا نتحدث عن نتيجة افتراضية في الماضي.",
      },
      {
        prompt: "If they _____ the invitation, they would have attended the party.",
        options: ["A. accept", "B. accepted", "C. had accepted", "D. will accept"],
        answer: "C. had accepted.",
        explanation: "لأن جملة الشرط تحتاج إلى Past Perfect.",
      },
      {
        prompt: "If he hadn't forgotten his passport, he _____ on the trip.",
        options: ["A. would have gone", "B. will go", "C. would go", "D. goes"],
        answer: "A. would have gone.",
        explanation: "لأن النتيجة تتحدث عن شيء لم يحدث في الماضي.",
      },
      {
        prompt: "What would you have done if you _____ your phone?",
        options: ["A. lose", "B. lost", "C. had lost", "D. will lose"],
        answer: "C. had lost.",
        explanation: "لأن السؤال يستخدم الشرط الثالث.",
      },
      {
        prompt: "If I had had enough money, I _____ a new laptop.",
        options: ["A. would buy", "B. will buy", "C. would have bought", "D. bought"],
        answer: "C. would have bought.",
        explanation: "لأننا نستخدم would have + V3 في النتيجة.",
      },
      {
        prompt: "If she had practiced more, she _____ the competition.",
        options: ["A. might have won", "B. might win", "C. will win", "D. wins"],
        answer: "A. might have won.",
        explanation: "لأن might have تعبر عن احتمال افتراضي في الماضي.",
      },
      {
        prompt: "If he had listened carefully, he _____ that mistake.",
        options: ["A. wouldn't make", "B. wouldn't have made", "C. won't make", "D. doesn't make"],
        answer: "B. wouldn't have made.",
        explanation: "لأننا نستخدم النفي wouldn't have + V3.",
      },
    ],
  },
  {
    id: "practice-3",
    title: "التدريب الثالث: صحح الأخطاء",
    instruction: "اكتب الجملة الصحيحة بعد إصلاح الخطأ.",
    items: [
      {
        prompt: "If I would have known, I would have helped you.",
        answer: "If I had known, I would have helped you.",
        explanation: "السبب: لا نستخدم would في جملة If.",
      },
      {
        prompt: "If she had study harder, she would have passed.",
        answer: "If she had studied harder, she would have passed.",
        explanation: "السبب: بعد had نستخدم V3، وهو studied.",
      },
      {
        prompt: "If he had arrived early, he will have met the manager.",
        answer: "If he had arrived early, he would have met the manager.",
        explanation: "السبب: نستخدم would have في النتيجة.",
      },
      {
        prompt: "If they hadn't left late, they wouldn't miss the train.",
        answer: "If they hadn't left late, they wouldn't have missed the train.",
        explanation: "السبب: الشرط والنتيجة كلاهما في الماضي الافتراضي.",
      },
      {
        prompt: "If I had had money, I would buy a car yesterday.",
        answer: "If I had had money, I would have bought a car yesterday.",
        explanation: "السبب: لأننا نتحدث عن الماضي، يجب أن تكون النتيجة would have bought.",
      },
      {
        prompt: "She would have went abroad if she had received the offer.",
        answer: "She would have gone abroad if she had received the offer.",
        explanation: "السبب: بعد have نستخدم gone وليس went.",
      },
      {
        prompt: "If we had took a taxi, we would have arrived earlier.",
        answer: "If we had taken a taxi, we would have arrived earlier.",
        explanation: "السبب: taken هو V3 من take.",
      },
      {
        prompt: "If he hadn't forget his bag, he wouldn't have returned home.",
        answer: "If he hadn't forgotten his bag, he wouldn't have returned home.",
        explanation: "السبب: forgotten هو V3 من forget.",
      },
    ],
  },
  {
    id: "practice-4",
    title: "التدريب الرابع: حوّل الجمل إلى الشرط الثالث",
    instruction: "حوّل كل جملة من جملة حقيقية إلى افتراض عن الماضي.",
    items: [
      { prompt: "I didn't study, so I failed the exam.", answer: "If I had studied, I would have passed the exam." },
      { prompt: "She missed the bus because she woke up late.", answer: "If she hadn't woken up late, she wouldn't have missed the bus." },
      { prompt: "They didn't book a hotel, so they couldn't stay there.", answer: "If they had booked a hotel, they could have stayed there." },
      { prompt: "He forgot his keys, so he waited outside.", answer: "If he hadn't forgotten his keys, he wouldn't have waited outside." },
      { prompt: "We didn't leave early, so we missed the beginning of the film.", answer: "If we had left early, we wouldn't have missed the beginning of the film." },
    ],
  },
  {
    id: "practice-5",
    title: "التدريب الخامس: Would Have أو Could Have أو Might Have",
    instruction: "اختر الأنسب حسب المعنى.",
    items: [
      {
        prompt: "If I had taken an umbrella, I _____ stayed dry.",
        answer: "If I had taken an umbrella, I would have stayed dry.",
        explanation: "لأنها نتيجة افتراضية متوقعة.",
      },
      {
        prompt: "If she had studied medicine, she _____ become a doctor.",
        answer: "If she had studied medicine, she could have become a doctor.",
        explanation: "لأن المعنى يركز على الإمكانية.",
      },
      {
        prompt: "If they had invited Ahmed, he _____ come, but we are not sure.",
        answer: "If they had invited Ahmed, he might have come, but we are not sure.",
        explanation: "لأن might تعبر عن الاحتمال.",
      },
      {
        prompt: "If we had left earlier, we _____ caught the train.",
        answer: "If we had left earlier, we could have caught the train.",
        explanation: "لأن could تعبر عن الإمكانية المتاحة.",
      },
      {
        prompt: "If I had known about the problem, I _____ helped you.",
        answer: "If I had known about the problem, I would have helped you.",
        explanation: "لأنها نتيجة افتراضية متوقعة.",
      },
    ],
  },
  {
    id: "practice-6",
    title: "التدريب السادس: حوّل إلى النفي",
    instruction: "اتبع المطلوب في كل سؤال: نفي الشرط، أو النتيجة، أو كليهما.",
    items: [
      { prompt: "If I had studied, I would have passed. — اجعل الشرط منفيًا.", answer: "If I hadn't studied, I would have passed." },
      { prompt: "If she had called me, I would have helped her. — اجعل النتيجة منفية.", answer: "If she had called me, I wouldn't have helped her." },
      { prompt: "If they had arrived early, they would have seen the manager. — اجعل الجملتين منفيتين.", answer: "If they hadn't arrived early, they wouldn't have seen the manager." },
      {
        prompt: "If he had taken a taxi, he would have arrived on time. — اجعل الشرط منفيًا.",
        answer: "If he hadn't taken a taxi, he would have arrived on time.",
        explanation: "ملاحظة: المطلوب في السؤال الرابع هو نفي الشرط فقط، لذلك بقيت النتيجة مثبتة.",
      },
    ],
  },
  {
    id: "practice-7",
    title: "التدريب السابع: حدد نوع الشرط",
    instruction: "اكتب Zero Conditional أو First Conditional أو Second Conditional أو Third Conditional.",
    items: [
      { prompt: "If you heat ice, it melts.", answer: "Zero Conditional." },
      { prompt: "If I have time tomorrow, I will visit you.", answer: "First Conditional." },
      { prompt: "If I were rich, I would travel the world.", answer: "Second Conditional." },
      { prompt: "If I had studied, I would have passed.", answer: "Third Conditional." },
      { prompt: "If she doesn't sleep well, she feels tired.", answer: "Zero Conditional." },
      { prompt: "If he called me, I would answer.", answer: "Second Conditional." },
      { prompt: "If they had left earlier, they would have caught the bus.", answer: "Third Conditional." },
      { prompt: "If it rains tomorrow, we will stay home.", answer: "First Conditional." },
      { prompt: "If I had more time, I would learn another language.", answer: "Second Conditional." },
      { prompt: "If people don't drink water, they become thirsty.", answer: "Zero Conditional." },
    ],
  },
  {
    id: "practice-8",
    title: "التدريب الثامن: ترجم إلى الإنجليزية",
    instruction: "ترجم الجمل العربية إلى الإنجليزية باستخدام الشرط الثالث.",
    items: [
      { prompt: "لو كنت قد درست بجد، لكنت قد نجحت.", answer: "If I had studied hard, I would have passed." },
      { prompt: "لو كانت قد استيقظت مبكرًا، لما فاتها القطار.", answer: "If she had woken up early, she wouldn't have missed the train." },
      { prompt: "ماذا كنت ستفعل لو فقدت جواز سفرك؟", answer: "What would you have done if you had lost your passport?" },
      { prompt: "لو كان لدينا مال أكثر، لكنا قد سافرنا إلى إيطاليا.", answer: "If we had had more money, we would have travelled to Italy." },
      { prompt: "لو كان قد أخبرني، لكنت قد ساعدته.", answer: "If he had told me, I would have helped him." },
      { prompt: "لو لم تنسَ مفاتيحها، لما انتظرت في الخارج.", answer: "If she hadn't forgotten her keys, she wouldn't have waited outside." },
      { prompt: "لو كنت قد عرفت الحقيقة، لما قلت ذلك.", answer: "If I had known the truth, I wouldn't have said that." },
      { prompt: "لو كانوا قد دعونا، فربما كنا قد حضرنا.", answer: "If they had invited us, we might have attended." },
    ],
  },
];

/** ⑳ إجابات التدريبات مع الشرح — تُعرض مجمّعة في شريحة مستقلة. */
export const PRACTICE_ANSWER_GROUPS_54 = PRACTICE_54.map((group) => ({
  id: group.id,
  title: group.title,
  answers: group.items.map((item) => ({ answer: item.answer, explanation: item.explanation })),
}));
