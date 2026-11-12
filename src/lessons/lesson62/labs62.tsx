import { ERRORS62 } from "./content62";
import { En62, Mixed62, Scene62, Attempt62, useMemory62, StructurePicker62, VerbCard62, type AttemptItem62 } from "./kit62";

type Decision62 = { label: string; options: string[]; correct: string | string[]; why: string };
type LabCase62 = { prompt: string; context: string; decisions: Decision62[]; answer: string; why: string; accept?: string[] };
export type Lab62 = { id: string; title: string; en: string; intro: string; cases: LabCase62[] };

const decision = (label: string, options: string[], correct: string | string[], why: string): Decision62 => ({
  label, options, correct: Array.isArray(correct) ? correct : [correct], why
});

const scenario = (prompt: string, context: string, decisions: Decision62[], answer: string, why: string, accept?: string[]): LabCase62 => ({
  prompt, context, decisions, answer, why, accept
});

export const LABS_62: Lab62[] = [
  {
    id: "verb-chooser",
    title: "مختبر اختيار الفعل المناسب",
    en: "VERB CHOICE LAB",
    intro: "لكل موقف، حدّد القصد ثم اختر فعل النقل الأنسب مع تركيبه الصحيح.",
    cases: [
      scenario(
        `He said, "I broke the window."`,
        "المتحدث يعترف بفعل شيء.",
        [
          decision("ما القصد؟", ["اعتراف", "إنكار", "وعد"], "اعتراف", "الجملة تعبر عن اعتراف بفعل."),
          decision("أي فعل نقل نستخدم؟", ["admit", "deny", "promise"], "admit", "admit للتعرف بفعل."),
          decision("ما التركيب بعد admit؟", ["V-ing", "to + verb", "that + sentence"], ["V-ing", "that + sentence"], "admit + V-ing أو admit + that."),
        ],
        "He admitted breaking the window.",
        "اعتراف → admit + V-ing.",
        ["He admitted that he had broken the window."]
      ),
      scenario(
        `She said, "I will help you."`,
        "المتحدثة تتعهد بفعل شيء في المستقبل.",
        [
          decision("ما القصد؟", ["وعد", "عرض", "رفض"], "وعد", "هي تقول إنها ستفعل شيئاً في المستقبل."),
          decision("أي فعل نقل؟", ["promise", "offer", "refuse"], "promise", "promise للتعهد المستقبلي."),
          decision("التركيب بعد promise؟", ["V-ing", "to + verb", "that + sentence"], ["to + verb", "that + sentence"], "promise + to + infinitive أو promise + that."),
        ],
        "She promised to help me.",
        "وعد → promise + to.",
        ["She promised that she would help me."]
      ),
      scenario(
        "He said, \"I won't answer.\"",
        "المتحدث يرفض القيام بفعل.",
        [
          decision("ما القصد؟", ["رفض", "عرض", "وعد"], "رفض", "الجملة تعبر عن رفض."),
          decision("الفعل المناسب؟", ["refuse", "offer", "promise"], "refuse", "refuse للرفض."),
          decision("التركيب؟", ["V-ing", "to + verb", "object + to"], "to + verb", "refuse + to + infinitive."),
        ],
        "He refused to answer.",
        "رفض → refuse + to."
      ),
      scenario(
        `She said to him, "You are lying."`,
        "المتحدثة تتهم الشخص بالكذب.",
        [
          decision("ما القصد؟", ["اتهام", "نصيحة", "اقتراح"], "اتهام", "هي تقول إنه يكذب."),
          decision("الفعل؟", ["accuse", "advise", "suggest"], "accuse", "accuse للاتهام."),
          decision("حرف الجر بعد accuse؟", ["of", "for", "to"], "of", "accuse someone of + V-ing."),
        ],
        "She accused him of lying.",
        "اتهام → accuse + object + of + V-ing."
      ),
      scenario(
        `The doctor said to me, "You should rest."`,
        "الطبيب يقدم نصيحة.",
        [
          decision("ما القصد؟", ["نصيحة", "أمر", "طلب"], "نصيحة", "الطبيب ينصح بالراحة."),
          decision("الفعل؟", ["advise", "order", "ask"], "advise", "advise للنصيحة."),
          decision("التركيب؟", ["object + to", "V-ing", "that + sentence"], ["object + to", "V-ing"], "advise + object + to أو advise + V-ing."),
        ],
        "The doctor advised me to rest.",
        "نصيحة → advise + object + to.",
        ["The doctor advised resting."]
      ),
      scenario(
        `He said, "I didn't steal the money."`,
        "المتحدث ينكر فعل شيء.",
        [
          decision("ما القصد؟", ["إنكار", "اعتراف", "وعد"], "إنكار", "هو ينفي أنه سرق."),
          decision("الفعل؟", ["deny", "admit", "promise"], "deny", "deny للإنكار."),
          decision("التركيب؟", ["V-ing", "to + verb", "that + sentence"], ["V-ing", "that + sentence"], "deny + V-ing أو deny + that."),
        ],
        "He denied stealing the money.",
        "إنكار → deny + V-ing.",
        ["He denied that he had stolen the money."]
      ),
      scenario(
        `She said, "Let's go to the cinema."`,
        "مقترح للقيام بشيء معاً.",
        [
          decision("ما القصد؟", ["اقتراح", "أمر", "وعد"], "اقتراح", "هي تقترح فكرة."),
          decision("الفعل؟", ["suggest", "order", "promise"], "suggest", "suggest للاقتراح."),
          decision("الصيغ الصحيحة؟", ["suggest + V-ing", "suggest that + should", "suggest me to"], ["suggest + V-ing", "suggest that + should"], "suggest me to غير صحيحة."),
        ],
        "She suggested going to the cinema.",
        "اقتراح → suggest + V-ing أو suggest that.",
        ["She suggested that we should go to the cinema."]
      ),
      scenario(
        `He said, "I'll carry your bags."`,
        "عرض مساعدة طوعي.",
        [
          decision("ما القصد؟", ["عرض", "وعد", "طلب"], "عرض", "هو يعرض المساعدة طواعية."),
          decision("الفعل؟", ["offer", "promise", "ask"], "offer", "offer للعرض الطوعي."),
          decision("التركيب؟", ["to + verb", "V-ing", "object + to"], ["to + verb", "object + noun"], "offer + to أو offer + object + noun."),
        ],
        "He offered to carry my bags.",
        "عرض → offer + to.",
        ["He offered me a hand."]
      ),
    ],
  },
  {
    id: "structure-detector",
    title: "كاشف التراكيب النحوية",
    en: "STRUCTURE DETECTOR",
    intro: "لكل فعل، اختر التراكيب الصحيحة التي تتبعه من الخيارات.",
    cases: [
      scenario(
        "admit",
        "فعل يأتي بعده V-ing أو that.",
        [
          decision("اختر التراكيب الصحيحة لـ admit:", ["admit + V-ing", "admit + to + verb", "admit + that", "admit + object + to"], ["admit + V-ing", "admit + that"], "admit + V-ing و admit + that كلاهما صحيح."),
        ],
        "admit + V-ing / admit + that",
        "مجموعة V-ing + that."
      ),
      scenario(
        "promise",
        "فعل يأتي بعده to + verb أو that.",
        [
          decision("اختر التراكيب الصحيحة لـ promise:", ["promise + V-ing", "promise + to + verb", "promise + that", "promise + object + to"], ["promise + to + verb", "promise + that"], "promise + to + infinitive و promise + that."),
        ],
        "promise + to / promise + that",
        "مجموعة to + that."
      ),
      scenario(
        "advise",
        "فعل يأتي بعده object + to أو V-ing.",
        [
          decision("اختر التراكيب الصحيحة لـ advise:", ["advise + V-ing", "advise + to + verb", "advise + object + to", "advise + that"], ["advise + V-ing", "advise + object + to"], "advise + V-ing و advise + object + to."),
        ],
        "advise + V-ing / advise + object + to",
        "مجموعة object + to + V-ing."
      ),
      scenario(
        "accuse",
        "فعل يأتي بعده object + of + V-ing.",
        [
          decision("اختر التركيب الصحيح لـ accuse:", ["accuse + of + V-ing", "accuse + for + V-ing", "accuse + object + of + V-ing", "accuse + object + to"], "accuse + object + of + V-ing", "accuse someone of doing something."),
        ],
        "accuse + object + of + V-ing",
        "حرف جر of إجباري مع object."
      ),
      scenario(
        "insist",
        "فعل يأتي بعده on + V-ing أو that.",
        [
          decision("اختر التراكيب الصحيحة لـ insist:", ["insist + to + verb", "insist + on + V-ing", "insist + that", "insist + object + to"], ["insist + on + V-ing", "insist + that"], "insist on + V-ing و insist that."),
        ],
        "insist on + V-ing / insist that",
        "حرف جر on إجباري مع V-ing."
      ),
      scenario(
        "apologize",
        "فعل يأتي بعده for + V-ing، مع to للشخص.",
        [
          decision("اختر التراكيب الصحيحة لـ apologize:", ["apologize + for + V-ing", "apologize + to + person + for + V-ing", "apologize + object + for", "apologize + that"], ["apologize + for + V-ing", "apologize + to + person + for + V-ing"], "apologize for، و apologize to someone for."),
        ],
        "apologize for / apologize to for",
        "حرف جر for، و to قبل الشخص."
      ),
      scenario(
        "explain",
        "فعل يأتي بعده that أو something + to + someone.",
        [
          decision("اختر التراكيب الصحيحة لـ explain:", ["explain + that", "explain + something + to + someone", "explain + someone + something", "explain + to + verb"], ["explain + that", "explain + something + to + someone"], "explain that، و explain something to someone."),
        ],
        "explain that / explain something to someone",
        "لا تقل explain me the problem."
      ),
      scenario(
        "suggest",
        "فعل يأتي بعده V-ing أو that (+ should).",
        [
          decision("اختر التراكيب الصحيحة لـ suggest:", ["suggest + V-ing", "suggest + that + should", "suggest + object + to", "suggest + to + verb"], ["suggest + V-ing", "suggest + that + should"], "suggest + V-ing و suggest that + subject + should. لا suggest me to."),
        ],
        "suggest + V-ing / suggest that + should",
        "suggest me to غير قياسية."
      ),
    ],
  },
  {
    id: "conversion-studio",
    title: "استوديو التحويل التدريجي",
    en: "CONVERSION STUDIO",
    intro: "مرّر الجملة المباشرة عبر خطوات: قصد → فعل → تركيب → نتيجة.",
    cases: [
      scenario(
        `He said, "I made a mistake."`,
        "اعتراف بخطأ.",
        [
          decision("① ما القصد؟", ["اعتراف", "وعد", "رفض"], "اعتراف", "هو يعترف بفعل شيء."),
          decision("② أي فعل؟", ["admit", "promise", "refuse"], "admit", "admit للاعتراف."),
          decision("③ أي تركيب؟", ["admit + V-ing", "admit + to", "admit + object + to"], "admit + V-ing", "admit يتبعها V-ing."),
        ],
        "He admitted making a mistake.",
        "المسار: قصد=اعتراف → فعل=admit → تركيب=V-ing.",
        ["He admitted that he had made a mistake."]
      ),
      scenario(
        `She said, "I will call you tomorrow."`,
        "وعد بفعل مستقبلي.",
        [
          decision("① القصد؟", ["وعد", "عرض", "تهديد"], "وعد", "ستتصل غداً - تعهد."),
          decision("② الفعل؟", ["promise", "offer", "threaten"], "promise", "promise للوعد."),
          decision("③ التركيب؟", ["promise + to", "promise + V-ing", "promise + object + to"], "promise + to", "promise + to + infinitive."),
        ],
        "She promised to call me the following day.",
        "القصد=وعد → promise → to + verb.",
        ["She promised that she would call me the following day."]
      ),
      scenario(
        `He said, "I won't go."`,
        "رفض للقيام بفعل.",
        [
          decision("① القصد؟", ["رفض", "قبول", "وعد"], "رفض", "won't = refusal."),
          decision("② الفعل؟", ["refuse", "agree", "promise"], "refuse", "refuse للرفض."),
          decision("③ التركيب؟", ["refuse + to", "refuse + V-ing", "refuse + object + to"], "refuse + to", "refuse + to + infinitive."),
        ],
        "He refused to go.",
        "القصد=رفض → refuse → to + verb."
      ),
      scenario(
        `She said to him, "You stole my pen."`,
        "اتهام بالسرقة.",
        [
          decision("① القصد؟", ["اتهام", "نصيحة", "شكوى"], "اتهام", "هي تتهمه بالسرقة."),
          decision("② الفعل؟", ["accuse", "advise", "complain"], "accuse", "accuse للاتهام."),
          decision("③ التركيب؟", ["accuse + of", "accuse + for", "accuse + to"], "accuse + of", "accuse + object + of + V-ing."),
        ],
        "She accused him of stealing her pen.",
        "القصد=اتهام → accuse → object + of + V-ing."
      ),
      scenario(
        `The teacher said to me, "Study harder."`,
        "نصيحة بالدراسة.",
        [
          decision("① القصد؟", ["نصيحة", "أمر", "طلب"], "نصيحة", "ينصح بالدراسة بجد."),
          decision("② الفعل؟", ["advise", "order", "ask"], "advise", "advise للنصيحة."),
          decision("③ التركيب؟", ["advise + object + to", "advise + V-ing", "advise + that"], ["advise + object + to", "advise + V-ing"], "advise + object + to أو advise + V-ing."),
        ],
        "The teacher advised me to study harder.",
        "القصد=نصيحة → advise → object + to.",
        ["The teacher advised studying harder."]
      ),
    ],
  },
  {
    id: "similar-verbs",
    title: "مفرّق الأفعال المتشابهة",
    en: "SIMILAR VERBS DISCRIMINATOR",
    intro: "أزواج أفعال قريبة في المعنى، مختلفة في التركيب أو الدلالة. ميّز بينها.",
    cases: [
      scenario(
        "admit vs deny",
        "نفس التركيب، معنى معاكس.",
        [
          decision("He _____ breaking the vase. (اعترف)", ["admitted", "denied"], "admitted", "اعترف = admitted."),
          decision("He _____ breaking the vase. (أنكر)", ["admitted", "denied"], "denied", "أنكر = denied."),
          decision("التركيب في الحالتين؟", ["V-ing", "to + verb", "that"], "V-ing", "كلاهما admit/deny + V-ing."),
        ],
        "admit = اعتراف، deny = إنكار. كلاهما + V-ing.",
        "المعنى مختلف، التركيب واحد."
      ),
      scenario(
        "suggest vs recommend",
        "كلاهما اقتراح/توصية، لكن recommend أقوى.",
        [
          decision("He _____ going to the park. (طرح فكرة)", ["suggested", "recommended"], "suggested", "suggest = طرح فكرة."),
          decision("The doctor _____ this medicine. (توصية طبية)", ["suggested", "recommended"], "recommended", "recommend = توصية بخبرة."),
          decision("تركيب suggest؟", ["V-ing", "object + to", "to + verb"], "V-ing", "suggest + V-ing / that."),
          decision("تركيب recommend؟", ["V-ing", "object + to", "to + verb"], ["V-ing", "object + to + person"], "recommend + V-ing أو recommend something to someone."),
        ],
        "suggest = طرح، recommend = توصية. suggest لا يأخذ object + to.",
        "recommend this book to him صحيح، suggest him to read خطأ."
      ),
      scenario(
        "promise vs offer vs refuse",
        "ثلاثة أفعال لـ to + verb، معاني مختلفة.",
        [
          decision("He _____ to help me. (تعهّد)", ["promised", "offered", "refused"], "promised", "promise = تعهّد."),
          decision("He _____ to help me. (عرض طوعي)", ["promised", "offered", "refused"], "offered", "offer = عرض."),
          decision("He _____ to help me. (رفض)", ["promised", "offered", "refused"], "refused", "refuse = رفض."),
        ],
        "promise/ offer/ refuse كلها + to، لكن المعنى مختلف تماماً.",
        "السياق يحدد الفعل المناسب."
      ),
      scenario(
        "advise vs encourage vs persuade",
        "كلها object + to، درجات مختلفة من القوة.",
        [
          decision("My teacher _____ me to study. (نصيحة)", ["advised", "encouraged", "persuaded"], "advised", "advise = نصيحة."),
          decision("My parents _____ me to study. (تشجيع)", ["advised", "encouraged", "persuaded"], "encouraged", "encourage = تشجيع."),
          decision("She _____ me to join. (إقناع نجح)", ["advised", "encouraged", "persuaded"], "persuaded", "persuade = إقناع ناجح."),
        ],
        "advise < encourage < persuade في قوة التأثير والنتيجة.",
        "التركيب واحد (object + to)، الدلالة مختلفة."
      ),
      scenario(
        "warn vs remind",
        "كلاهما object + (not) to، لكن warn تحذير، remind تذكير.",
        [
          decision("The teacher _____ us not to cheat. (تحذير)", ["warned", "reminded"], "warned", "warn = تحذير من خطر."),
          decision("She _____ me to call mom. (تذكير)", ["warned", "reminded"], "reminded", "remind = تذكير بفعل."),
        ],
        "warn = خطر/نتيجة سيئة، remind = قد ينسى.",
        "كلاهما + object + not to / to."
      ),
      scenario(
        "persuade vs convince",
        "persuade = فعل، convince = اقتناع/حقيقة.",
        [
          decision("She _____ me to leave. (أقنعته بالمغادرة)", ["persuaded", "convinced"], ["persuaded", "convinced"], "كلاهما يصح هنا للفعل."),
          decision("She _____ me that the plan was safe. (أقنعته بصحة فكرة)", ["persuaded", "convinced"], "convinced", "convince + that للحقائق."),
        ],
        "persuade + to للفعل، convince + that للحقيقة. لكن يتداخلان في بعض السياقات.",
        "convince يركز على تغيير المعتقد، persuade على تغيير السلوك."
      ),
      scenario(
        "accuse vs complain",
        "accuse = اتهام شخص، complain = شكوى من شيء.",
        [
          decision("She _____ him of lying. (اتهام)", ["accused", "complained"], "accused", "accuse + object + of."),
          decision("He _____ about the noise. (شكوى)", ["accused", "complained"], "complained", "complain + about."),
        ],
        "accuse → شخص + of، complain → about + شيء.",
        "حروف جر مختلفة تماماً."
      ),
    ],
  },
  {
    id: "error-detective",
    title: "محقق الأخطاء العشرة",
    en: "ERROR DETECTIVE",
    intro: "اكتشف الخطأ في كل جملة، أصلحه، ووضح السبب. راجع خطأ admit to + V-ing.",
    cases: ERRORS62.map((item, index) => {
      const isAdmitTo = index === 0; // الخطأ الأول: admit to steal
      return scenario(
        item.wrong,
        isAdmitTo
          ? "ملاحظة: admitted to breaking قد تكون صحيحة (to حرف جر)، لكن admitted to steal خطأ لأن to هنا علامة infinitive."
          : "الجملة المعروضة تحتوي على خطأ في النقل.",
        [
          decision(
            isAdmitTo ? "ما نوع الخطأ في admit؟" : "ما القاعدة التي تحتاج إلى إصلاح؟",
            isAdmitTo
              ? ["admit + V-ing صحيح", "admit + to + infinitive خطأ", "admit + that صحيح"]
              : [item.title, "لا حاجة إلى تعديل", "إضافة ترتيب سؤال مباشر"],
            isAdmitTo ? "admit + V-ing صحيح" : item.title,
            item.why
          ),
        ],
        item.right,
        item.why,
        item.alt ? [item.alt] : undefined
      );
    }),
  },
];

// ------------------------------------------------------------
// State types for labs
// ------------------------------------------------------------
type LabRecord62 = { picks: Record<number, string>; value: string; checked: boolean };
type LabState62 = { current: number; records: Record<number, LabRecord62> };
const EMPTY_RECORD_62: LabRecord62 = { picks: {}, value: "", checked: false };

// ------------------------------------------------------------
// Lab Console Component
// ------------------------------------------------------------
import { useEffect } from "react";
import { matches62, normalize62 } from "./kit62";

export function LabConsole62({ lab }: { lab: Lab62 }) {
  const [state, setState] = useMemory62<LabState62>(`lab62:${lab.id}`, { current: 0, records: {} });
  const current = Math.min(state.current, lab.cases.length - 1);
  const task = lab.cases[current];
  const record = state.records[current] ?? EMPTY_RECORD_62;
  const complete = task.decisions.every((_, i) => Boolean(record.picks[i])) && Boolean(record.value.trim());
  const allDecisionsRight = task.decisions.every((d, i) => {
    const pick = record.picks[i];
    return pick && d.correct.includes(pick);
  });
  const right = allDecisionsRight && matches62(record.value, task.answer, task.accept);
  const completed = Object.values(state.records).filter((r) => r.checked).length;

  const save = (next: LabRecord62) => setState({ ...state, records: { ...state.records, [current]: next } });

  return (
    <Scene62 kicker={lab.en} title={lab.title} lead={lab.intro}>
      <div className="l62-lab" data-l62-lab={lab.id}>
        <div className="l62-lab-status">
          <div><span className="l62-live-dot" /> <b dir="ltr">ACTIVE MODULE</b></div>
          <span>حالات تم التحقق منها: <bdi dir="ltr">{completed} / {lab.cases.length}</bdi></span>
        </div>
        <div className="l62-case-tabs" role="group" aria-label="حالات المختبر">
          {lab.cases.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`الحالة ${i + 1}`}
              aria-current={i === current ? "step" : undefined}
              className={`${i === current ? "is-active " : ""}${state.records[i]?.checked ? "is-done" : ""}`}
              onClick={() => setState({ ...state, current: i })}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="l62-lab-grid">
          <div className="l62-lab-signal">
            <div className="l62-signal-label" dir="ltr">INCOMING / {String(current + 1).padStart(2, "0")}</div>
            <p dir="ltr"><En62>{task.prompt}</En62></p>
            <div className="l62-signal-context"><Mixed62 text={task.context} /></div>
          </div>
          <div className="l62-lab-decisions">
            {task.decisions.map((d, i) => (
              <fieldset key={i} className="l62-decision">
                <legend><span dir="ltr">{String(i + 1).padStart(2, "0")}</span> <Mixed62 text={d.label} /></legend>
                <div className="l62-decision-options">
                  {d.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={record.picks[i] === option}
                      className={record.picks[i] === option ? "is-selected" : ""}
                      onClick={() => save({ ...record, picks: { ...record.picks, [i]: option }, checked: false })}
                    >
                      <Mixed62 text={option} />
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
            <label className="l62-input-label">
              <span>ابنِ الجملة المنقولة أو المصححة</span>
              <input
                type="text"
                dir="ltr"
                lang="en"
                value={record.value}
                placeholder="Write the complete sentence..."
                onChange={(event) => save({ ...record, value: event.target.value, checked: false })}
              />
            </label>
            <div className="l62-actions">
              <button type="button" className="l62-btn l62-btn--bright" disabled={!complete} onClick={() => save({ ...record, checked: true })}>تحقّق من المسار</button>
              {record.checked && <button type="button" className="l62-btn l62-btn--soft" onClick={() => save(EMPTY_RECORD_62)}>إعادة المحاولة</button>}
              {current < lab.cases.length - 1 && <button type="button" className="l62-btn l62-btn--soft" onClick={() => setState({ ...state, current: current + 1 })}>الحالة التالية ←</button>}
            </div>
            {record.checked && (
              <div className={`l62-feedback ${right ? "is-right" : "is-wrong"}`} role="status" data-l62-lab-feedback>
                <strong>{right ? "المسار صحيح" : "راجع قراراتك أو صياغتك"}</strong>
                <ul>
                  {task.decisions.map((d, i) => (
                    <li key={i}>
                      <b>{d.correct.includes(record.picks[i]) ? "✓ صحيح" : "✕ راجع"}:</b> <Mixed62 text={d.why} />
                    </li>
                  ))}
                </ul>
                <div>النموذج: <En62>{task.answer}</En62></div>
                <div><Mixed62 text={task.why} /></div>
                {!matches62(record.value, task.answer, task.accept) && (
                  <small>المطابقة آلية مع النماذج المحددة؛ قد تصح صياغات أخرى بحسب السياق.</small>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Scene62>
  );
}