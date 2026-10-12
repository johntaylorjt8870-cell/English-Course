export type TestSolution36 = {
  n: number;
  level: 1 | 2 | 3 | 4 | 5;
  answer: string;
  explanation: string;
  alternatives?: string[];
  judgment: "most-natural" | "grammatical-repair" | "contextual" | "open-model";
  sourceStatus: "platform-authored-teacher-addition";
};

/**
 * Platform-authored teacher addition. Supplied source §23 contains a heading
 * and “عرض الحلول التفصيلية”, but no actual key. Every answer below is written
 * to honor context, overlap, and acceptable alternatives; open answers are
 * models, not unique required strings.
 */
export const TEST_SOLUTIONS_36: TestSolution36[] = [
  {
    n: 1, level: 1, answer: "A. will", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "In the immediate response to “I'm thirsty,” WILL is the most natural offer/decision made at the moment of speaking.",
    alternatives: ["B. am going to is grammatical in a context where getting water was already intended, but that prior plan is not supplied here. Do not describe BE GOING TO as grammatically impossible."],
  },
  {
    n: 2, level: 1, answer: "B. are going to", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The tickets have already been bought, so the museum visit is presented as a prior plan.",
    alternatives: ["A. will is grammatical as an announcement or prediction, but BE GOING TO most directly matches the stated prior arrangement."],
  },
  {
    n: 3, level: 1, answer: "B. is going to", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The speaker points to present clouds, so BE GOING TO is the typical choice when foregrounding visible evidence.",
    alternatives: ["A. will can still be grammatical if the speaker chooses to express a belief or prediction; the evidence does not ban WILL."],
  },
  {
    n: 4, level: 1, answer: "A. won't", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "WILL / WON'T is especially natural for an explicit promise made now: “I promise I won't forget your birthday.”",
    alternatives: ["B. am not going to is also grammatical and can express a firm intention or reassurance. A is the conventional promise-focused answer, but accept B when the learner explains the intention emphasis."],
  },
  {
    n: 5, level: 1, answer: "A. will", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "“I think” frames a general belief or prediction, for which WILL is a typical choice.",
    alternatives: ["B. is going to can be used if a context supplies a prior expectation or evidence; no such context is given in this item."],
  },
  {
    n: 6, level: 2, answer: "are going to build", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The decision was made last week, so BE GOING TO fits a plan formed before the speaking moment.",
    alternatives: ["“We will build…” can be grammatical in another context, but it does not foreground the stated earlier decision as directly."],
  },
  {
    n: 7, level: 2, answer: "I'll answer / I will answer", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The ringing phone is a new situation; the speaker decides to answer now, so use WILL + V1.",
  },
  {
    n: 8, level: 2, answer: "is going to hit", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The cyclist is visibly on course to hit the barrier; BE GOING TO naturally foregrounds this present evidence.",
    alternatives: ["WILL can express a belief about the same event, but BE GOING TO is the most context-sensitive choice here."],
  },
  {
    n: 9, level: 2, answer: "will return / 'll return", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The sentence explicitly introduces a promise. WILL is a natural form for the commitment; tomorrow only locates its timing.",
    alternatives: ["A promise can also be phrased with a firm prior intention, but WILL is the target form most directly cued by “I promise”."],
  },
  {
    n: 10, level: 2, answer: "will perform / 'll perform", judgment: "most-natural", sourceStatus: "platform-authored-teacher-addition",
    explanation: "“I believe” presents the statement as the speaker's prediction or belief, a typical use of WILL.",
    alternatives: ["BE GOING TO is possible if additional context foregrounds a prior expectation or evidence."],
  },
  {
    n: 11, level: 3, answer: "She will travel.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "Do not combine WILL and GOING TO. Keep one future construction; after WILL use the base verb travel.",
    alternatives: ["She is going to travel."],
  },
  {
    n: 12, level: 3, answer: "They are going to study tonight.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "After GOING TO use the base form study, not studied. The subject They correctly takes are.",
  },
  {
    n: 13, level: 3, answer: "Is he going to join us?", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "Form the BE GOING TO question by placing is before he; do not use does with this construction.",
    alternatives: ["Will he join us? is a grammatical alternative question with a different emphasis, but Is he going to join us? repairs the supplied construction directly."],
  },
  {
    n: 14, level: 3, answer: "I won't forget.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "WON'T is followed directly by the base form forget; do not add to.",
    alternatives: ["I'm not going to forget. is also grammatical if the speaker wants to emphasize intention instead."],
  },
  {
    n: 15, level: 3, answer: "Will she help?", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "Use one question construction at a time. WILL takes the subject followed by the base verb.",
    alternatives: ["Is she going to help? is also grammatically correct and asks more directly about intention or a plan. Without more context, either corrected question can be valid."],
  },
  {
    n: 16, level: 4, answer: "Both sentences are grammatical. I'll buy a new laptop. commonly presents a spontaneous decision, promise, or announcement; I'm going to buy a new laptop. commonly presents an earlier intention or plan.", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The two sentences alone do not establish when the decision was made. Learners should describe typical emphasis, not claim that either sentence is always wrong or that the meaning must be different in every context.",
    alternatives: ["Accept other accurate explanations that mention overlap, context, and speaker emphasis."],
  },
  {
    n: 17, level: 4, answer: "Going to is natural because the child appears to be falling now; the visible situation is present evidence for the prediction.", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The exclamation Look! directs attention to a present clue. BE GOING TO foregrounds it. This is a typical choice, not a prohibition against WILL.",
    alternatives: ["Accept a response that notes WILL could express a belief about the same outcome."],
  },
  {
    n: 18, level: 4, answer: "Yes. Both sentences are grammatical.", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "WILL naturally presents a prediction or belief. GOING TO may foreground reasons or evidence for the expectation. The context does not require a large difference every time.",
    alternatives: ["Full credit for any answer that accepts both and describes a possible, non-absolute difference in emphasis."],
  },
  {
    n: 19, level: 4, answer: "WILL is natural in promises because the speaker makes a commitment at the moment of speaking.", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "WILL / WON'T often performs the promise or commitment itself. This is a natural use, not a rule that makes every GOING TO promise ungrammatical.",
    alternatives: ["Accept mention of a present commitment, assurance, or the performative role of the promise."],
  },
  {
    n: 20, level: 4, answer: "No. Tomorrow identifies when the event is expected; it does not by itself reveal whether the speaker made a prior plan, is deciding now, promising, or making a prediction.", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "Both I'll visit my aunt tomorrow and I'm going to visit my aunt tomorrow are grammatical. The surrounding intention and emphasis guide the choice.",
    alternatives: ["Accept examples using another listed time phrase if the learner makes the same distinction."],
  },
  {
    n: 21, level: 5, answer: "I'll help you. / I will help you.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "A suitable sentence uses WILL for the decision to help made now. Any grammatical sentence that clearly responds to the friend's need is acceptable.",
    alternatives: ["Example: My friend needs help, so I'll help him now. Do not require this exact wording."],
  },
  {
    n: 22, level: 5, answer: "I'm going to start a design course next month.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The decision was made a week earlier, so BE GOING TO is a natural way to express the prior plan. The time phrase is not the reason for the choice.",
    alternatives: ["Accept I'm going to begin… or another accurate V1 construction that preserves the decided-earlier meaning."],
  },
  {
    n: 23, level: 5, answer: "It's going to rain.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "Dark clouds and strong wind are present clues; BE GOING TO naturally foregrounds the evidence.",
    alternatives: ["Accept a complete equivalent sentence such as Look at the clouds; it's going to rain. WILL can be acceptable if the learner explicitly frames it as a belief, not as the only required form."],
  },
  {
    n: 24, level: 5, answer: "I promise I won't forget to bring your book.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The response must be a promise not to forget to bring the book. WON'T is a natural negative promise.",
    alternatives: ["Accept I promise I will not forget… and other accurate negative commitments. Accept I'm not going to forget… when it is clearly a sincere promise/intention; do not penalize harmless contraction choices."],
  },
  {
    n: 25, level: 5, answer: "I believe robots will become more widespread in the future.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "The task asks for a belief about the future; WILL is a typical form for a general prediction.",
    alternatives: ["Accept I think robots will be more common… and other clear, grammatical belief predictions. GOING TO can be valid if the learner supplies an evidence-based or prior-expectation context."],
  },
];
