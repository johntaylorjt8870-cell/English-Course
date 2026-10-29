export type PracticeItem46 = {
  id: string;
  prompt: string;
  instruction?: string;
  options?: readonly string[];
};

const doors = ["mustn't", "don't have to", "needn't"] as const;
const past = ["didn't need to", "needn't have"] as const;
const meaning = ["منع", "عدم الضرورة", "فعل ماضٍ وقع دون حاجة"] as const;
const labMeaning = ["منع", "عدم الإلزام أو الحاجة", "فعل ماضٍ وقع دون حاجة"] as const;

export const PRACTICE_SETS_46: Readonly<Record<string, readonly PracticeItem46[]>> = {
  "lab-door": [
    { id: "lab-door", prompt: "A dangerous wire: You ___ touch it.", instruction: "اختر تعبير المنع.", options: doors },
  ],
  "lab-trip": [
    { id: "lab-trip", prompt: "What does ‘you mustn't use phones during the tour’ mean?", options: labMeaning },
  ],
  "lab-library": [
    { id: "lab-library", prompt: "What does ‘you don't have to return the books today’ mean?", options: labMeaning },
  ],
  "lab-airport": [
    { id: "lab-airport", prompt: "Daniel printed the passes. What does ‘needn't have printed’ tell us?", options: labMeaning },
  ],
  "lab-museum": [
    { id: "lab-museum", prompt: "Omar brought his calculator. What does ‘needn't have brought it’ mean?", options: labMeaning },
  ],
  "lab-laboratory": [
    { id: "lab-laboratory", prompt: "The lab supplies computers. You ___ bring your laptop.", instruction: "اختر تعبيرًا صحيحًا عن عدم الحاجة.", options: doors },
  ],
  "detective-a": [
    { id: "d1", prompt: "You mustn't to enter this room." },
    { id: "d2", prompt: "She doesn't has to come today." },
    { id: "d3", prompt: "He needn't to worry." },
    { id: "d4", prompt: "We didn't needed to pay." },
    { id: "d5", prompt: "She needn't have buy another ticket." },
  ],
  "detective-b": [
    { id: "d6", prompt: "You don't must touch this machine.", instruction: "المعنى المقصود هو المنع." },
    { id: "d7", prompt: "He won't has to work tomorrow." },
    { id: "d8", prompt: "She doesn't need come early." },
    { id: "d9", prompt: "I needn't have went there." },
    { id: "d10", prompt: "You mustn't bring your laptop tomorrow.", instruction: "المطلوب: ليس من الضروري أن تحضره غدًا، لا أنه ممنوع." },
  ],
  p32: [
    { id: "p32-1", prompt: "You ___ touch this dangerous wire. It is prohibited.", options: doors },
    { id: "p32-2", prompt: "You ___ bring your laptop. The school will provide one.", options: doors },
    { id: "p32-3", prompt: "Students ___ cheat in exams. It is against the rules.", options: doors },
    { id: "p32-4", prompt: "We ___ hurry. We have plenty of time.", options: doors },
    { id: "p32-5", prompt: "You ___ pay for the tickets. They're free.", options: doors },
  ],
  p33: [
    { id: "p33-1", prompt: "I bought a ticket, then discovered entry was free. I ___ bought a ticket.", options: past },
    { id: "p33-2", prompt: "There was no exam, so studying wasn't necessary. Whether I studied is unknown.", instruction: "اختر الصيغة التي لا تضيف معلومة عن وقوع الدراسة.", options: past },
    { id: "p33-3", prompt: "She cooked a large meal, but only two people came. She ___ cooked so much food.", options: past },
    { id: "p33-4", prompt: "We arrived two hours early, but the meeting was delayed. We ___ arrived so early.", options: past },
    { id: "p33-5", prompt: "The homework was cancelled. Whether we completed it is unknown.", instruction: "اختر الصيغة التي لا تدّعي إتمام الواجب.", options: past },
  ],
  p34: [
    { id: "p34-1", prompt: "Yesterday, I ___ work.", instruction: "استخدم نفي have to في الماضي." },
    { id: "p34-2", prompt: "She ___ bring her laptop last week.", instruction: "لم تكن بحاجة إلى إحضاره." },
    { id: "p34-3", prompt: "Tomorrow, we ___ come early.", instruction: "لن نكون مضطرين إلى الحضور مبكرًا." },
    { id: "p34-4", prompt: "He ___ buy another ticket next month.", instruction: "لن يحتاج إلى تذكرة أخرى." },
    { id: "p34-5", prompt: "I ___ that expensive bag.", instruction: "اشتريت الحقيبة فعلًا، لكنها لم تكن ضرورية." },
  ],
  p35: [
    { id: "p35-1", prompt: "You mustn't park here.", options: meaning },
    { id: "p35-2", prompt: "You don't have to bring your books.", options: meaning },
    { id: "p35-3", prompt: "She needn't have bought another ticket.", options: meaning },
    { id: "p35-4", prompt: "We needn't hurry.", options: meaning },
    { id: "p35-5", prompt: "Students mustn't cheat.", options: meaning },
    { id: "p35-6", prompt: "I needn't have waited so long.", options: meaning },
  ],
  p36: [
    { id: "p36-1", prompt: "You mustn't come tomorrow.", instruction: "المطلوب: ليس من الضروري أن تأتي غدًا." },
    { id: "p36-2", prompt: "She doesn't have to cheat.", instruction: "المطلوب: يُمنع عليها الغش." },
    { id: "p36-3", prompt: "I didn't need to buy a ticket.", instruction: "المطلوب: اشتريت تذكرة فعلًا، لكنها لم تكن ضرورية." },
    { id: "p36-4", prompt: "He needn't to wait.", instruction: "المطلوب: لا داعي لانتظاره." },
    { id: "p36-5", prompt: "She won't has to work tomorrow.", instruction: "المطلوب: لن تكون مضطرة إلى العمل غدًا." },
  ],
};
