export type PracticeItem47 = {
  id: string;
  prompt: string;
  instruction?: string;
  options?: readonly string[];
};

const contractionOrigins = ["I would", "I had"] as const;
const ratherOrLike = ["would rather", "would like"] as const;
const functions = ["رغبة", "تفضيل", "طلب مهذب", "عرض أو دعوة"] as const;

export const PRACTICE_SETS_47: Readonly<Record<string, readonly PracticeItem47[]>> = {
  contractions: [
    { id: "c1", prompt: "I'd like some tea.", instruction: "ما أصل I'd في هذه الجملة؟", options: contractionOrigins },
    { id: "c2", prompt: "I'd finished my homework before dinner.", instruction: "ما أصل I'd هنا؟", options: contractionOrigins },
    { id: "c3", prompt: "She'd rather stay home.", instruction: "ما أصل She'd في هذه الجملة؟", options: contractionOrigins },
    { id: "c4", prompt: "They wouldn't choose that option.", instruction: "ما معنى wouldn't؟", options: ["would not", "had not", "did not"] },
  ],
  "like-vs-rather": [
    { id: "lr1", prompt: "Would you like some coffee? — I'd rather have tea.", instruction: "ما وظيفة الجملة الثانية؟", options: ["تفضيل بين خيارين", "رغبة مطلقة", "طلب مهذب"] },
    { id: "lr2", prompt: "I'd like to visit London. / I'd rather visit London.", instruction: "أي الجملتين تعبّر عن تفضيل؟", options: ["I'd like to visit London.", "I'd rather visit London."] },
    { id: "lr3", prompt: "She ___ to become an engineer.", instruction: "اختر التركيب الصحيح: الرغبة في مهنة.", options: ratherOrLike },
    { id: "lr4", prompt: "They ___ stay home than go out.", instruction: "اختر التركيب الصحيح للمقارنة بين خيارين.", options: ratherOrLike },
  ],
  "lab-restaurant": [
    { id: "lab-restaurant", prompt: "Waiter: Would you mind bringing us some extra napkins? — Not at all!", instruction: "ما معنى إجابة النادل هنا؟", options: ["لا أمانع؛ سأحضرها", "لا، ارفض طلبي", "لا أعرف الإجابة"] },
  ],
  "lab-weekend": [
    { id: "lab-weekend", prompt: "Why would Omar rather go in the afternoon?", instruction: "لماذا يفضّل عمر فترة الظهيرة؟", options: ["لأنه ينهي واجبه صباحًا", "لأن السينما مغلقة صباحًا", "لأن دانيال يعمل صباحًا"] },
  ],
  "lab-classroom": [
    { id: "lab-classroom", prompt: "Who asks about another person doing something for someone?", instruction: "أي جملة تعرض أن يقوم شخص آخر بفعل؟", options: ["Would you like Omar to help you?", "I'd rather present after Maya and Omar.", "Would anyone like to present first?"] },
  ],
  "mind-answers": [
    { id: "ma1", prompt: "Would you mind opening the window?", instruction: "اختر الإجابة التي تعني الموافقة.", options: ["No, not at all.", "Yes, please.", "No, thank you."] },
    { id: "ma2", prompt: "Would you like some tea?", instruction: "اختر الإجابة الطبيعية لقبول العرض.", options: ["Yes, please.", "No, not at all.", "Of course not."] },
    { id: "ma3", prompt: "Would you mind waiting a moment?", instruction: "اختر الإجابة المهذبة للموافقة.", options: ["Certainly.", "No, thank you.", "I'd love to."] },
  ],
  "modal-map": [
    { id: "mm1", prompt: "___ I open the window? I need your advice.", options: ["Should", "Would", "Could"] },
    { id: "mm2", prompt: "___ you like some tea?", instruction: "عرض مهذب.", options: ["Would", "Should", "Could"] },
    { id: "mm3", prompt: "___ you mind closing the door?", instruction: "طلب مهذب بصيغة السؤال عن الممانعة.", options: ["Would", "Could", "Should"] },
    { id: "mm4", prompt: "___ you rather walk or drive?", instruction: "سؤال عن التفضيل.", options: ["Would", "Do", "Should"] },
  ],
  "detective-a": [
    { id: "d1", prompt: "I would to like some tea.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d2", prompt: "She would likes a new book.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d3", prompt: "I'd like study English.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d4", prompt: "Would you like join us?", instruction: "أعد كتابة السؤال كاملًا بعد التصحيح." },
    { id: "d5", prompt: "I'd rather to stay home.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d6", prompt: "She'd rather reading than watching television.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],
  "detective-b": [
    { id: "d7", prompt: "Would you rather to walk or drive?", instruction: "أعد كتابة السؤال كاملًا بعد التصحيح." },
    { id: "d8", prompt: "I'd rather you stay here.", instruction: "المقصود تفضيل يتعلق بالحاضر أو المستقبل وفق قاعدة الفاعلين." },
    { id: "d9", prompt: "Would you mind to open the window?", instruction: "أعد كتابة السؤال كاملًا بعد التصحيح." },
    { id: "d10", prompt: "Does he would like some coffee?", instruction: "أعد كتابة السؤال كاملًا بعد التصحيح." },
    { id: "d11", prompt: "I wouldn't rather go out tonight.", instruction: "المقصود: أفضّل ألّا أخرج الليلة." },
    { id: "d12", prompt: "I'd like you help me.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],
  p31: [
    { id: "p31-1", prompt: "I'd like ______ (drink) some water.", instruction: "أكمل بالفعل المناسب." },
    { id: "p31-2", prompt: "She'd like ______ (visit) London.", instruction: "أكمل بالفعل المناسب." },
    { id: "p31-3", prompt: "We would like ______ (join) the competition.", instruction: "أكمل بالفعل المناسب." },
    { id: "p31-4", prompt: "He'd like ______ (become) a doctor.", instruction: "أكمل بالفعل المناسب." },
    { id: "p31-5", prompt: "They'd like ______ (learn) English.", instruction: "أكمل بالفعل المناسب." },
  ],
  p32: [
    { id: "p32-1", prompt: "I'd rather ______ (stay) home.", instruction: "اكتب الفعل المجرد." },
    { id: "p32-2", prompt: "She'd rather ______ (read) a book.", instruction: "اكتب الفعل المجرد." },
    { id: "p32-3", prompt: "We'd rather ______ (walk) than drive.", instruction: "اكتب الفعل المجرد." },
    { id: "p32-4", prompt: "He'd rather not ______ (go) out tonight.", instruction: "اكتب الفعل المجرد." },
    { id: "p32-5", prompt: "They'd rather ______ (study) together.", instruction: "اكتب الفعل المجرد." },
  ],
  p33: [
    { id: "p33-1", prompt: "You would like some tea.", instruction: "حوّلها إلى سؤال مهذب." },
    { id: "p33-2", prompt: "She would like to join us.", instruction: "حوّلها إلى سؤال مهذب." },
    { id: "p33-3", prompt: "They would rather stay home.", instruction: "حوّلها إلى سؤال عن التفضيل." },
    { id: "p33-4", prompt: "You would rather travel by train.", instruction: "حوّلها إلى سؤال عن التفضيل." },
    { id: "p33-5", prompt: "He would like a new notebook.", instruction: "حوّلها إلى سؤال مهذب." },
  ],
  p34: [
    { id: "p34-1", prompt: "Would you mind ______ (open) the window?", instruction: "اكتب الفعل بصيغة ing." },
    { id: "p34-2", prompt: "Would you mind ______ (help) me?", instruction: "اكتب الفعل بصيغة ing." },
    { id: "p34-3", prompt: "Would you mind ______ (wait) a moment?", instruction: "اكتب الفعل بصيغة ing." },
    { id: "p34-4", prompt: "Would you mind ______ (close) the door?", instruction: "اكتب الفعل بصيغة ing." },
    { id: "p34-5", prompt: "Would you mind ______ (explain) the question again?", instruction: "اكتب الفعل بصيغة ing." },
  ],
  p35: [
    { id: "p35-1", prompt: "I'd like some tea.", options: functions },
    { id: "p35-2", prompt: "I'd rather stay home.", options: functions },
    { id: "p35-3", prompt: "Would you mind opening the window?", options: functions },
    { id: "p35-4", prompt: "Would you like to join us?", options: functions },
    { id: "p35-5", prompt: "I'd like to learn French.", options: functions },
    { id: "p35-6", prompt: "Would you rather walk or drive?", options: functions },
  ],
};
