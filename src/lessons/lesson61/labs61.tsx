import { ERRORS_61 } from "./content61";
import { En61, Mixed61, Scene61, matches61, useMemory61 } from "./kit61";

type Decision61 = { label: string; options: string[]; correct: string[]; why: string };
type LabCase61 = { prompt: string; context: string; decisions: Decision61[]; answer: string; why: string; accept?: string[] };
export type Lab61 = { id: string; title: string; en: string; intro: string; cases: LabCase61[] };
const decision = (label: string, options: string[], correct: string | string[], why: string): Decision61 => ({ label, options, correct: Array.isArray(correct) ? correct : [correct], why });
const scenario = (prompt: string, context: string, decisions: Decision61[], answer: string, why: string, accept?: string[]): LabCase61 => ({ prompt, context, decisions, answer, why, accept });

export const LABS_61: Lab61[] = [
  { id: "yes-converter", title: "محوّل أسئلة نعم أو لا", en: "YES / NO CONVERTER", intro: "حدّد المساعد، واختر الرابط والترتيب والضمير والزمن، ثم ابنِ الجملة.", cases: [
    scenario('She asked me, "Do you speak English?"', "المخاطَب هو الراوي؛ انقل السؤال مع الرجوع الزمني المعتاد.", [
      decision("ما الفعل المساعد في السؤال المباشر؟", ["do", "did", "are"], "do", "do هي المساعدة وتُحذف من التركيب الأساسي المنقول."),
      decision("اختر رابطًا مناسبًا", ["if", "whether", "where"], ["if", "whether"], "if وwhether تصلحان هنا."),
      decision("ما ترتيب الجملة التابعة؟", ["I spoke", "did I speak", "spoke I"], "I spoke", "نضع الفاعل قبل الفعل."),
      decision("ما الضمير والزمن في هذا النموذج؟", ["I / spoke", "you / speak", "he / speaks"], "I / spoke", "you تشير إلى الراوي؛ speak ترجع إلى spoke في النموذج."),
    ], "She asked me if I spoke English.", "الحل يجمع الرابط والترتيب الخبري وتغيّر الضمير والزمن."),
    scenario('The teacher asked us, "Are you ready?"', "نحن الطلاب المخاطَبون.", [
      decision("ما المساعد؟", ["are", "do", "have"], "are", "are شكل من be."), decision("ما الرابط؟", ["whether", "if", "why"], ["whether", "if"], "كلا الرابطين يناسب سؤال نعم أو لا."),
      decision("ما ترتيب الكلمات؟", ["we were", "were we", "we are did"], "we were", "ترتيب خبري مع we قبل were."), decision("ما الضمير والزمن؟", ["we / were", "you / are", "he / was"], "we / were", "you تشير إلينا، وare تصبح were في النموذج."),
    ], "The teacher asked us if we were ready.", "بعد if أو whether نكتب we were وليس were we."),
  ] },
  { id: "wh-rebuilder", title: "معيد بناء أسئلة WH", en: "WH REBUILDER", intro: "احتفظ بأداة السؤال، وقرّر إن كانت هي الفاعل، ثم أعد ترتيب الجملة.", cases: [
    scenario('He asked me, "Where do you live?"', "ينقل الراوي سؤاله عن مكان سكنه.", [
      decision("ما الأداة التي تبقى؟", ["where", "if", "whether"], "where", "نحتفظ بأداة WH ولا نضيف if."), decision("ماذا يحدث لـ do؟", ["تُحذف", "تبقى قبل الفاعل", "تصبح if"], "تُحذف", "do المساعدة في السؤال المباشر تختفي في البناء الأساسي."),
      decision("من الفاعل بعد where؟", ["I", "do", "where"], "I", "هنا where ظرف مكان وليست الفاعل."),
    ], "He asked me where I lived.", "الترتيب where + I + lived."),
    scenario('He asked, "Who broke the window?"', "Who هي الشخص الذي كسر النافذة.", [
      decision("ما وظيفة Who؟", ["الفاعل", "مفعول به دائمًا", "أداة ربط Yes/No"], "الفاعل", "Who نفسها فاعل broke."),
      decision("هل نضيف فاعلًا آخر بلا سبب؟", ["لا", "نعم، he", "نعم، I"], "لا", "إضافة فاعل آخر ستغيّر البنية والمعنى."),
    ], "He asked who had broken the window.", "Who تبقى الفاعل، والفعل يتحول إلى had broken في النموذج."),
  ] },
  { id: "order-detector", title: "كاشف ترتيب السؤال", en: "ORDER DETECTOR", intro: "ابحث عن أثر ترتيب السؤال المباشر، أو أثبت أن الجملة صحيحة، ثم اكتب الصيغة الخبرية.", cases: [
    scenario("He asked me where did I live.", "افحص الترتيب بعد where.", [decision("ما موضع الخلل؟", ["did I live", "where", "لا يوجد خلل"], "did I live", "لا نستخدم did I بعد where في الجملة المنقولة.")], "He asked me where I lived.", "احذف did واجعل الفاعل قبل الفعل."),
    scenario("She asked if was I tired.", "افحص الترتيب بعد if.", [decision("ما موضع الخلل؟", ["was I", "if", "لا يوجد خلل"], "was I", "الصحيح I was في الترتيب الخبري.")], "She asked if I was tired.", "الفاعل I يسبق was."),
    scenario("He asked her what she was doing.", "قدّم الحكم، ثم اكتب الجملة كما هي إذا كانت صحيحة.", [decision("ما الحكم؟", ["لا يوجد خلل", "ترتيب سؤال مباشر", "أضيفت if إلى WH"], "لا يوجد خلل", "she قبل was؛ الترتيب خبري صحيح.")], "He asked her what she was doing.", "الجملة سليمة ولا تحتاج إلى قلب."),
  ] },
  { id: "command-studio", title: "استوديو الأمر والتعليمات", en: "COMMAND STUDIO", intro: "اختر قوة الفعل وركّب object + to + infinitive.", cases: [
    scenario('The teacher said to us, "Open your books."', "أمر عادي موجّه إلينا.", [decision("أي فعل يلائم الوصف؟", ["told", "suggested", "asked if"], "told", "told تنقل الأمر إلى الشخص."), decision("ما البنية؟", ["us to open", "us open", "if us open"], "us to open", "بعد told يأتي الشخص ثم to + الفعل الأساسي.")], "The teacher told us to open our books.", "your تصبح our لأننا المخاطَبون."),
    scenario('The officer said to the soldiers, "Move immediately!"', "القصد أمر حازم ورسمي.", [decision("أي فعل يبرز الحزم؟", ["ordered", "suggested", "asked if"], "ordered", "ordered تبرز قوة الأمر."), decision("ما البنية؟", ["the soldiers to move", "the soldiers moving", "if the soldiers move"], "the soldiers to move", "ordered + object + to + infinitive.")], "The officer ordered the soldiers to move immediately.", "نذكر الجنود ثم to move."),
    scenario('The doctor said to the patient, "Take this medicine twice a day."', "القصد تعليمات لتنفيذ العلاج؛ اختر الإشارة بحسب سياق النقل.", [decision("أي فعل يبرز التعليمات؟", ["instructed", "suggested", "asked whether"], "instructed", "instructed تبرز الإرشاد."), decision("ما البنية؟", ["the patient to take", "the patient taking", "that take"], "the patient to take", "instructed + object + to + infinitive.")], "The doctor instructed the patient to take that medicine twice a day.", "تُستخدم that إذا تغيّر مرجع الإشارة؛ ويمكن إبقاء this إذا لم يتغيّر.", ["The doctor instructed the patient to take this medicine twice a day."]),
  ] },
  { id: "negative-lab", title: "مختبر النواهي", en: "NEGATIVE COMMAND LAB", intro: "حوّل Don't إلى not to، وميّز بين النهي والتحذير من الخطر.", cases: [
    scenario('My father said to me, "Don\'t stay up late."', "نهي موجّه إلى الراوي.", [decision("ما بنية النهي؟", ["told me not to", "told me don't", "told not me"], "told me not to", "نستخدم not to قبل الفعل الأساسي.")], "My father told me not to stay up late.", "don't stay تتحول إلى not to stay."),
    scenario('The guide said to us, "Don\'t go near the edge."', "الموقف تحذير من خطر السقوط.", [decision("أي فعل ينقل التحذير؟", ["warned", "suggested", "said if"], "warned", "warned يبرز الخطر."), decision("ما الجزء المناسب؟", ["us not to go", "us don't go", "us going"], "us not to go", "warned + object + not to + base verb.")], "The guide warned us not to go near the edge.", "نذكر الشخص ثم not to."),
  ] },
  { id: "intent-detector", title: "كاشف الطلب والقدرة", en: "REQUEST VS QUESTION", intro: "الجملة نفسها قد تحمل نيتين مختلفتين؛ انقل المعنى الذي يحدده السياق.", cases: [
    scenario('He said to me, "Could you help me?"', "يسأل إن كنت قادرًا أو متاحًا للمساعدة، لا يطلب البدء بها الآن.", [decision("ما المقصود؟", ["سؤال عن الإمكانية", "طلب تنفيذ فعل", "اقتراح جماعي"], "سؤال عن الإمكانية", "if I could help تنقل السؤال عن الإمكانية.")], "He asked me if I could help him.", "هذا سؤال عن القدرة أو الإمكانية."),
    scenario('He said to me, "Could you help me?"', "يمدّ إليك صندوقًا ويطلب منك مساعدته الآن.", [decision("ما المقصود؟", ["طلب تنفيذ فعل", "سؤال عن الإمكانية فقط", "اقتراح جماعي"], "طلب تنفيذ فعل", "asked me to help تنقل الطلب نفسه.")], "He asked me to help him.", "اختيار المعنى يعتمد على السياق، لا على الكلمات وحدها."),
  ] },
  { id: "advice-suggestion", title: "مختبر النصيحة والتحذير والاقتراح", en: "INTENT ROUTER", intro: "مرّر كل موقف عبر المسار الذي يطابق قصده وتركيبه.", cases: [
    scenario('The doctor said to me, "Drink more water."', "الطبيب ينصحني.", [decision("اختر المسار", ["advised me to", "suggested me to", "asked if"], "advised me to", "النصيحة إلى شخص: advised + object + to.")], "The doctor advised me to drink more water.", "advised لا تساوي suggested في البنية."),
    scenario('The guide said to us, "Don\'t go near the edge."', "تحذير من خطر.", [decision("اختر المسار", ["warned us not to", "advised us that not", "suggested us not to"], "warned us not to", "warned + object + not to.")], "The guide warned us not to go near the edge.", "التحذير يذكر الشخص والفعل المنفي."),
    scenario('He said, "Let\'s go to the park."', "انقل الفكرة باستخدام صيغة ing.", [decision("اختر المسار", ["suggested going", "suggested us to go", "told going"], "suggested going", "suggested + verb-ing.")], "He suggested going to the park.", "الاقتراح باستخدام going."),
    scenario('He said, "Let\'s go to the park."', "انقل الاقتراح بصيغة that مع should.", [decision("اختر المسار", ["suggested that we should go", "suggested us to go", "suggested that we to go"], "suggested that we should go", "that + subject + should + base verb.")], "He suggested that we should go to the park.", "يمكن حذف should والإبقاء على الفعل الأساسي.", ["He suggested that we go to the park."]),
  ] },
  { id: "verb-control", title: "مركز Say / Tell / Ask", en: "VERB CONTROL", intro: "اختر فعل النقل وما يليه بحسب نوع الرسالة.", cases: [
    scenario('He said, "I am busy."', "خبر من دون ذكر المخاطَب.", [decision("ما فعل النقل؟", ["said", "told me to", "asked if"], "said", "said تنقل الكلام أو الخبر.")], "He said that he was busy.", "said + that + جملة خبرية.", ["He said he was busy."]),
    scenario('He said to me, "Wait."', "أمر موجّه إليّ.", [decision("ما التركيب؟", ["told me to", "said me to", "asked if"], "told me to", "told تذكر الشخص قبل to.")], "He told me to wait.", "told + me + to + wait."),
    scenario('She asked me, "Are you ready?"', "سؤال إجابته نعم أو لا.", [decision("ما التركيب؟", ["asked if", "told that", "said me"], "asked if", "ask تنقل السؤال مع if أو whether.")], "She asked me if I was ready.", "asked ثم الشخص ثم if والجملة الخبرية."),
  ] },
  { id: "conversation", title: "محوّل الحوار الكامل", en: "CONVERSATION TRANSFORMER", intro: "انقل الحوار خطوة بخطوة: صنّف كل رسالة ثم اكتب تحويلها. اعتبر سؤال العرض عن الإمكانية في هذا النموذج.", cases: [
    scenario("Teacher: Where did you go yesterday, Adam?", "المعلم يسأل آدم عن الزيارة في اليوم السابق.", [decision("نوع الرسالة؟", ["سؤال WH", "طلب", "خبر"], "سؤال WH", "Where أداة سؤال.")], "The teacher asked Adam where he had gone the previous day.", "did go → had gone؛ yesterday تشير إلى اليوم السابق."),
    scenario("Adam: I went to the science museum.", "ردّ آدم على السؤال السابق.", [decision("نوع الرسالة؟", ["خبر / رد", "نهي", "سؤال Yes/No"], "خبر / رد", "آدم يقدّم معلومة.")], "Adam replied that he had gone to the science museum.", "I تشير إلى آدم؛ went → had gone."),
    scenario("Teacher: Did you enjoy the visit?", "المعلم يسأل آدم.", [decision("نوع الرسالة؟", ["سؤال Yes/No", "سؤال WH", "اقتراح"], "سؤال Yes/No", "السؤال يبدأ بـ did وتصلح إجابته بنعم أو لا.")], "The teacher asked him if he had enjoyed the visit.", "نحذف did ونستخدم if مع had enjoyed."),
    scenario("Adam: Yes, I did.", "إجابة عن الاستمتاع بالزيارة.", [decision("نوع الرسالة؟", ["خبر / رد", "أمر", "تحذير"], "خبر / رد", "هذه إجابة مختصرة عن السؤال السابق.")], "Adam replied that he had.", "يحتفظ الرد المختصر بالفعل المساعد المناسب."),
    scenario("Teacher: What did you learn there?", "السؤال عن الشيء الذي تعلمه آدم.", [decision("نوع الرسالة؟", ["سؤال WH", "سؤال Yes/No", "نصيحة"], "سؤال WH", "What أداة السؤال.")], "The teacher asked him what he had learned there.", "نحتفظ بـ what، ونحذف did، ونكتب he had learned."),
    scenario("Adam: I learned about planets and space.", "آدم يجيب عن السؤال.", [decision("نوع الرسالة؟", ["خبر / رد", "نهي", "طلب"], "خبر / رد", "هذا رد خبري.")], "Adam replied that he had learned about planets and space.", "I → he وlearned → had learned في النموذج."),
    scenario("Teacher: Can you show us your pictures?", "في هذا النموذج يسأل عن إمكانية العرض.", [decision("نوع الرسالة؟", ["سؤال عن الإمكانية", "أمر مباشر", "اقتراح"], "سؤال عن الإمكانية", "اختار النموذج if he could؛ يمكن أن يكون طلبًا في سياق آخر.")], "The teacher asked him if he could show them his pictures.", "you → he، وus → them، وyour → his."),
    scenario("Adam: Of course.", "آدم يجيب بالإيجاب عن إمكانية عرض الصور.", [decision("نوع الرسالة؟", ["خبر / رد", "نهي", "سؤال WH"], "خبر / رد", "إنه رد مختصر بالإيجاب.")], "Adam replied that he could.", "يُفهم could من سؤال الإمكانية السابق."),
    scenario("Teacher: Please open your notebook and write three sentences about your visit.", "طلب مهذب موجّه إلى آدم.", [decision("نوع الرسالة؟", ["طلب", "سؤال Yes/No", "تحذير"], "طلب", "Please تشير هنا إلى طلب.")], "The teacher asked him to open his notebook and write three sentences about his visit.", "asked him to تنقل الطلب مع ضمائر آدم.", ["Finally, the teacher asked him to open his notebook and write three sentences about his visit."]),
    scenario("Teacher: Don't make any noise while your classmates are working.", "المعلم لا يزال يخاطب آدم، لا زملاءه.", [decision("نوع الرسالة؟", ["نهي", "اقتراح", "سؤال WH"], "نهي", "Don't تبدأ نهيًا موجّهًا إلى آدم.")], "The teacher also told him not to make any noise while his classmates were working.", "نحافظ على مخاطبة آدم: him / his classmates.", ["The teacher told him not to make any noise while his classmates were working."]),
  ] },
  { id: "error-detective", title: "محقق القواعد السبع", en: "ERROR DETECTIVE", intro: "اكتشف نوع الخطأ وأصلحه. الحالة الأخيرة تختبر علامة نهاية الجملة الخبرية.", cases: ERRORS_61.map((item, index) => scenario(item.wrong, index === 6 ? "الجملة المعروضة سؤال مباشر صحيح؛ انقله في جملة خبرية كاملة." : "الجملة المعروضة تحتوي على خطأ في النقل.", [decision(index === 6 ? "كيف تنتهي الجملة الخبرية المنقولة هنا؟" : "ما القاعدة التي تحتاج إلى إصلاح؟", index === 6 ? ["نقطة", "علامة استفهام دائمًا", "فاصلة فقط"] : [item.title, "لا حاجة إلى تعديل", "إضافة ترتيب سؤال مباشر"], index === 6 ? "نقطة" : item.title, item.why)], item.right, item.why, item.alternative ? [item.alternative] : undefined)) },
];

type LabRecord61 = { picks: Record<number, string>; value: string; checked: boolean };
type LabState61 = { current: number; records: Record<number, LabRecord61> };
const EMPTY_RECORD: LabRecord61 = { picks: {}, value: "", checked: false };
export function LabConsole61({ lab }: { lab: Lab61 }) {
  const [state, setState] = useMemory61<LabState61>(`lab:${lab.id}`, { current: 0, records: {} });
  const current = Math.min(state.current, lab.cases.length - 1);
  const task = lab.cases[current];
  const record = state.records[current] ?? EMPTY_RECORD;
  const complete = task.decisions.every((_, i) => Boolean(record.picks[i])) && Boolean(record.value.trim());
  const allDecisionsRight = task.decisions.every((d, i) => d.correct.includes(record.picks[i]));
  const right = allDecisionsRight && matches61(record.value, task.answer, task.accept);
  const completed = Object.values(state.records).filter((r) => r.checked).length;
  const save = (next: LabRecord61) => setState({ ...state, records: { ...state.records, [current]: next } });
  return <Scene61 kicker={lab.en} title={lab.title} lead={lab.intro}>
    <div className="l61-lab" data-l61-lab={lab.id}>
      <div className="l61-lab-status"><div><span className="l61-live-dot" /> <b dir="ltr">ACTIVE MODULE</b></div><span>حالات تم التحقق منها: <bdi dir="ltr">{completed} / {lab.cases.length}</bdi></span></div>
      <div className="l61-case-tabs" role="group" aria-label="حالات المختبر">{lab.cases.map((_, i) => <button type="button" key={i} aria-label={`الحالة ${i + 1}`} aria-current={i === current ? "step" : undefined} className={`${i === current ? "is-active " : ""}${state.records[i]?.checked ? "is-done" : ""}`} onClick={() => setState({ ...state, current: i })}>{i + 1}</button>)}</div>
      <div className="l61-lab-grid"><div className="l61-lab-signal"><div className="l61-signal-label" dir="ltr">INCOMING / {String(current + 1).padStart(2, "0")}</div><p dir="ltr"><En61>{task.prompt}</En61></p><div className="l61-signal-context"><Mixed61 text={task.context} /></div></div>
        <div className="l61-lab-decisions">{task.decisions.map((d, i) => <fieldset key={i} className="l61-decision"><legend><span dir="ltr">{String(i + 1).padStart(2, "0")}</span> <Mixed61 text={d.label} /></legend><div className="l61-decision-options">{d.options.map((option) => <button type="button" key={option} aria-pressed={record.picks[i] === option} className={record.picks[i] === option ? "is-selected" : ""} onClick={() => save({ ...record, picks: { ...record.picks, [i]: option }, checked: false })}><Mixed61 text={option} /></button>)}</div></fieldset>)}
          <label className="l61-input-label"><span>ابنِ الجملة المنقولة أو المصححة</span><input type="text" dir="ltr" lang="en" value={record.value} placeholder="Write the complete sentence..." onChange={(event) => save({ ...record, value: event.target.value, checked: false })} /></label>
          <div className="l61-actions"><button type="button" className="l61-button" disabled={!complete} onClick={() => save({ ...record, checked: true })}>تحقّق من المسار</button>{record.checked && <button type="button" className="l61-button l61-button--quiet" onClick={() => save(EMPTY_RECORD)}>إعادة المحاولة</button>}{current < lab.cases.length - 1 && <button type="button" className="l61-button l61-button--quiet" onClick={() => setState({ ...state, current: current + 1 })}>الحالة التالية ←</button>}</div>
          {record.checked && <div className={`l61-feedback ${right ? "is-right" : "is-wrong"}`} role="status" data-l61-lab-feedback><strong>{right ? "المسار صحيح" : "راجع قراراتك أو صياغتك"}</strong><ul>{task.decisions.map((d, i) => <li key={i}><b>{d.correct.includes(record.picks[i]) ? "صحيح" : "راجع"}:</b> <Mixed61 text={d.why} /></li>)}</ul><div>النموذج: <En61>{task.answer}</En61></div><div><Mixed61 text={task.why} /></div>{!matches61(record.value, task.answer, task.accept) && <small>المطابقة آلية مع النماذج المحددة؛ قد تصح صياغات أخرى بحسب السياق.</small>}</div>}
        </div>
      </div>
    </div>
  </Scene61>;
}
