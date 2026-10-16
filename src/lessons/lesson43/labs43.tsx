import { Lines43, Panel43, Tag43, Text43, useField43 } from './kit43';
import { section43 } from './ledger43';
import { practices43, type Practice43 } from './practiceData43';
import { practiceReason43 } from './practiceNotes43';
import { AttemptLab43, ChoiceLab43, Dialog43, GoalList43, ModalFamily43, TransformLab43, type Choice43, type Transform43 } from './tools43';

// ------------------------------------------------------------
// Probability Explorer — qualitative spectrum, never percentages
// ------------------------------------------------------------
type Band43 = 'مؤكد' | 'مرجح' | 'ممكن' | 'بعيد' | 'مستحيل';
const BANDS_43: Band43[] = ['مؤكد', 'مرجح', 'ممكن', 'بعيد', 'مستحيل'];
const PROBABILITY_ITEMS_43: { sentence: string; band: Band43; why: string }[] = [
  { sentence: 'The sun rises in the east.', band: 'مؤكد', why: 'حقيقة نعرفها — لا حاجة لـ MAY أو MIGHT هنا.' },
  { sentence: 'Water freezes at 0°C.', band: 'مؤكد', why: 'حقيقة علمية ثابتة.' },
  { sentence: 'It may rain tomorrow.', band: 'ممكن', why: 'توقع غير مؤكد؛ MAY تجعل عدم اليقين مرئيًا.' },
  { sentence: 'She might be at the library.', band: 'ممكن', why: 'تخمين عن مكان في الحاضر.' },
  { sentence: 'He may win the race — he trains every day.', band: 'مرجح', why: 'دليل قوي يرفع الاحتمال، لكنه ليس يقينًا.' },
  { sentence: 'We might need more time.', band: 'ممكن', why: 'احتمال وارد بلا دليل قوي بعد.' },
  { sentence: 'It may snow in the desert tonight.', band: 'بعيد', why: 'شبه مستبعد… لكنه ليس مستحيلًا.' },
  { sentence: 'Fish might fly without wings.', band: 'مستحيل', why: 'مخالف للواقع؛ لا فعل ناقص يجعله ممكنًا.' },
];
export function ProbabilityExplorer43() {
  return <Panel43 kicker="PROBABILITY EXPLORER / 01" title="مستكشف الاحتمال" tone="lab">
    <p>ضع كل جملة على طيف الاحتمال. الطيف <b>كيفي</b> — <Text43 text="لا توجد نسب مئوية ثابتة، والمصدر نفسه يرفض ربط MAY أو MIGHT بنسبة معينة."/></p>
    <div className="spectrum43" role="group" aria-label="طيف الاحتمال">
      {BANDS_43.map((band, i) => <span key={band} className={`band43 band-${i}`}>{band}</span>)}
    </div>
    <p className="label43">تذكّر: MAY وMIGHT قد يحملان نفس درجة الاحتمال في سياق واحد، وMIGHT قد يبدو أكثر تحفظًا في سياق آخر — السياق هو الحكم.</p>
    <div className="choiceGrid43">{PROBABILITY_ITEMS_43.map((item, i) => <ProbabilityItem43 key={i} item={item} id={`prob-${i}`}/>)}</div>
  </Panel43>;
}
function ProbabilityItem43({ item, id }: { item: { sentence: string; band: Band43; why: string }; id: string }) {
  const [pick, setPick] = useField43(id), [checked, setChecked] = useField43(`${id}-checked`);
  const right = pick === item.band;
  return <article className="exercise43" data-exercise-id={id}>
    <p className="formula43" dir="ltr">{item.sentence}</p>
    <div className="actions43" role="group" aria-label="اختر الشريط">
      {BANDS_43.map(band => <button key={band} type="button" aria-pressed={pick === band} onClick={() => { setPick(band); setChecked(''); }}>{band}</button>)}
    </div>
    <button className="primary43" type="button" disabled={!pick} onClick={() => setChecked('yes')}>تحقق</button>
    {checked && <div role="status" className={right ? 'feedback43' : 'feedback43 error'}>
      <b>{right ? 'موقع مناسب' : `الأقرب: ${item.band}`}</b>
      <Lines43 lines={[item.why]}/>
      {!right && <p className="label43">لا مشكلة في الاختلاف حين يتغير السياق — لكن الجملة كما هي تقترح هذا الشريط.</p>}
    </div>}
  </article>;
}

// ------------------------------------------------------------
// Modal Sentence Builder — chips onto subject + modal + V1
// ------------------------------------------------------------
const SUBJECTS43 = ['I', 'You', 'He', 'She', 'It', 'We', 'They'];
const VERBS43 = ['travel', 'visit her grandmother', 'arrive late', 'need more time', 'rain tomorrow', 'be at home'];
export function BuilderLab43() {
  const [subject, setSubject] = useField43('builder-subject');
  const [modal, setModal] = useField43('builder-modal');
  const [verb, setVerb] = useField43('builder-verb');
  const who = SUBJECTS43[Number(subject) ?? 0] ?? 'She';
  const m = modal === 'might' ? 'might' : 'may';
  const v = VERBS43[Number(verb) ?? 0] ?? 'travel';
  return <Panel43 kicker="MODAL SENTENCE BUILDER / 02" title="باني الجمل الناقصة" tone="lab">
    <p><Text43 text="ركّب الجملة: فاعل + MAY/MIGHT + فعل بصيغته الأساسية V1. لاحظ: الفعل الناقص لا يأخذ s، والفعل الرئيسي يبقى V1."/></p>
    <div className="dialRow43">
      <div className="dialGroup43"><span className="label43">الفاعل</span>
        <div className="actions43">{SUBJECTS43.map(s => <button key={s} type="button" dir="ltr" aria-pressed={who === s} onClick={() => setSubject(s)}>{s}</button>)}</div>
      </div>
      <div className="dialGroup43"><span className="label43">القناة</span>
        <div className="actions43">
          <button type="button" className={m === 'may' ? 'channelMay43' : ''} aria-pressed={m === 'may'} onClick={() => setModal('may')}>MAY</button>
          <button type="button" className={m === 'might' ? 'channelMight43' : ''} aria-pressed={m === 'might'} onClick={() => setModal('might')}>MIGHT</button>
        </div>
      </div>
      <div className="dialGroup43"><span className="label43">الفعل V1</span>
        <div className="actions43">{VERBS43.map(word => <button key={word} type="button" dir="ltr" aria-pressed={v === word} onClick={() => setVerb(word)}>{word}</button>)}</div>
      </div>
    </div>
    <div className="readout43" dir="ltr">
      <Tag43 role="subject">{who}</Tag43><Tag43 role={m === 'may' ? 'may' : 'might'}>{m}</Tag43><Tag43 role="verb">{v}</Tag43>
    </div>
    <p className="formula43" dir="ltr">{who} {m} {v}.</p>
    <p className="label43"><Text43 text={`جرّب النفي — ${who} ${m} not ${v}. — والسؤال: ${m === 'may' ? 'May' : 'Might'} ${who} ${v}?`}/></p>
  </Panel43>;
}

// ------------------------------------------------------------
// MAY BE composer (§7)
// ------------------------------------------------------------
const COMPLEMENTS43: [string, string][] = [['tired', 'متعبًا'], ['at home', 'في المنزل'], ['our new classmate', 'زميلنا الجديد'], ['difficult', 'صعبًا'], ['late', 'متأخرًا'], ['right', 'محقًا']];
export function MayBeComposer43() {
  const [subject, setSubject] = useField43('maybe-subject');
  const [comp, setComp] = useField43('maybe-complement');
  const who = SUBJECTS43[Number(subject) ?? 0] ?? 'She';
  const [en, ar] = COMPLEMENTS43[Number(comp) ?? 0] ?? COMPLEMENTS43[0];
  return <Panel43 kicker="MAY BE LAB / 02" title="مركّب MAY BE" tone="lab">
    <p><Text43 text="MAY BE = فعل ناقص + فعل رابط. اختر الفاعل والخبر لتركيب جملة."/></p>
    <div className="dialRow43">
      <div className="dialGroup43"><span className="label43">الفاعل</span>
        <div className="actions43">{SUBJECTS43.map(s => <button key={s} type="button" dir="ltr" aria-pressed={who === s} onClick={() => setSubject(s)}>{s}</button>)}</div>
      </div>
      <div className="dialGroup43"><span className="label43">الخبر</span>
        <div className="actions43">{COMPLEMENTS43.map(([word]) => <button key={word} type="button" dir="ltr" aria-pressed={en === word} onClick={() => setComp(String(COMPLEMENTS43.findIndex(c => c[0] === word)))}>{word}</button>)}</div>
      </div>
    </div>
    <p className="formula43" dir="ltr">{who} may be {en}.</p>
    <p className="label43">ترجمة إرشادية — إضافة المنصة: {who} قد {ar}.</p>
    <p className="label43"><Text43 text={`قارن: Maybe ${who} is ${en}. — هنا Maybe ظرف مستقل في أول الجملة.`}/></p>
  </Panel43>;
}

// ------------------------------------------------------------
// Swap Lab — MAY ↔ MIGHT interchangeability (§11)
// ------------------------------------------------------------
const SWAP_ITEMS_43: Choice43[] = [
  { prompt: 'He may be at home. بدّل MAY بـ MIGHT:', options: ['He might be at home. — صحيحة', 'He mights be at home. — صحيحة', 'He might to be at home. — صحيحة'], answer: 'He might be at home. — صحيحة', why: 'التبديل مشروع: MIGHT + V1 دون s ودون to. الجملة صحيحة بالصيغتين.' },
  { prompt: 'She might come tomorrow. بدّل MIGHT بـ MAY:', options: ['She may come tomorrow. — صحيحة', 'She mays come tomorrow. — صحيحة', 'She may comes tomorrow. — صحيحة'], answer: 'She may come tomorrow. — صحيحة', why: 'MAY ثابتة مع كل الفاعلين والفعل الرئيسي يبقى V1.' },
  { prompt: 'أي الجملتين أقوى احتمالًا: It may rain. أم It might rain.؟', options: ['MAY دائمًا أقوى', 'MIGHT دائمًا أقوى', 'لا قاعدة نسبية ثابتة — السياق هو الحكم'], answer: 'لا قاعدة نسبية ثابتة — السياق هو الحكم', why: 'المصدر يحذّر من نسب مئوية ثابتة. في سياقات كثيرة تتداخل الصيغتان، وMIGHT قد توحي بتحفظ أكبر في سياقات معينة فقط.' },
  { prompt: 'The doctor said he may recover. لو استبدلناها بـ might:', options: ['خطأ نحوي', 'صحيحة، وغالبًا تبدو أكثر تحفظًا', 'تتغير المعنى إلى منع'], answer: 'صحيحة، وغالبًا تبدو أكثر تحفظًا', why: 'التبادل مسموح؛ الأسلوب يتغير قليلًا لا القاعدة.' },
  { prompt: 'اختر ما يجيب عن سؤال المصدر: هل MIGHT أضعف من MAY دائمًا؟', options: ['نعم، دائمًا', 'لا، أبدًا', 'لا توجد قاعدة ثابتة — التداخل كبير والسياق يحدد'], answer: 'لا توجد قاعدة ثابتة — التداخل كبير والسياق يحدد', why: 'هذا هو جوهر §11: لا نسب، ولا أسبقية مطلقة.' },
];
export function SwapLab43() {
  return <ChoiceLab43 id="swap" kicker="SWAP TEST / 11" title="مختبر التبديل: MAY ↔ MIGHT" intro="في كثير من الجمل الصيغتان صحيحتان. جرّب التبديل ولاحظ أن المعنى يتغير قليلًا لا كثيرًا." items={SWAP_ITEMS_43}/>;
}

// ------------------------------------------------------------
// Negation Lab (§12–14): probability of not happening vs prohibition
// ------------------------------------------------------------
const NEG_ITEMS_43: Choice43[] = [
  { prompt: 'You may not enter the lab.', options: ['احتمال عدم الحدوث', 'منع — يجب عدم الدخول'], answer: 'منع — يجب عدم الدخول', why: 'هنا MAY NOT تعني «غير مسموح» — منع قاطع لا احتمال.' },
  { prompt: 'She may not come today.', options: ['منع', 'احتمال ألا تأتي'], answer: 'احتمال ألا تأتي', why: 'السياق يحدد: احتمال عدم حدوث شيء لا منع.' },
  { prompt: 'He might not finish on time.', options: ['احتمال ألا ينتهي في الوقت', 'منع من الانتهاء'], answer: 'احتمال ألا ينتهي في الوقت', why: 'MIGHT NOT + V1 تحمل معنى الاحتمال السلبي.' },
  { prompt: 'Students may not use phones in class.', options: ['احتمال', 'منع — قاعدة'], answer: 'منع — قاعدة', why: 'قاعدة المدرسة: منع.' },
  { prompt: 'It might not rain tomorrow.', options: ['منع المطر', 'احتمال ألا تمطر'], answer: 'احتمال ألا تمطر', why: 'لا أحد يمنع المطر؛ الجملة تخمّن ألا يحدث.' },
  { prompt: 'ما الفرق الحاسم بين MAY NOT وMUST NOT؟', options: ['لا فرق', 'MAY NOT قد تعني احتمالًا أو إذنًا منفيًا؛ MUST NOT منع قاطع'], answer: 'MAY NOT قد تعني احتمالًا أو إذنًا منفيًا؛ MUST NOT منع قاطع', why: 'MUST NOT تحمل الوجوب والمنع؛ MAY NOT مرنة بحسب السياق.' },
];
export function NegationLab43() {
  return <ChoiceLab43 id="negation" kicker="NEGATION LAB / 12–14" title="النفي: احتمال أم منع؟" intro="MAY NOT وMIGHT NOT قد تعنيان احتمال عدم الحدوث… أو منعًا. السياق يميز." items={NEG_ITEMS_43}/>;
}

// ------------------------------------------------------------
// Permission Studio (§15–17): the formality dial
// ------------------------------------------------------------
const FORMALITY43 = [
  { form: 'Can I', level: 'غير رسمي', note: 'مباشر وشائع بين الأصدقاء.' },
  { form: 'Could I', level: 'مهذب وشائع', note: 'لباقة دون تكلّف — الخيار اليومي المفضل.' },
  { form: 'May I', level: 'رسمي مهذب', note: 'الصيغة التقليدية لطلب الإذن.' },
  { form: 'Might I', level: 'رسمي جدًا / قديم', note: 'مهذب بشدة لكنه رسمي ومتقادم قليلًا — ليس الافتراض اليومي.' },
];
const PERMISSION_SCENARIOS_43: Choice43[] = [
  { prompt: 'في الصف، تريد مغادرة المقعد.', context: 'موقف مدرسي عادي', options: ['Can I leave?', 'Could I leave, please?', 'Might I leave?'], answer: 'Could I leave, please?', why: 'اللباقة اليومية المفضلة: COULD + please. MAY مقبولة رسميًا، وMIGHT مبالغ فيها هنا.' },
  { prompt: 'تسأل صديقك عن قلم.', context: 'موقف غير رسمي', options: ['May I borrow your pen?', 'Can I borrow your pen?', 'Might I borrow your pen?'], answer: 'Can I borrow your pen?', why: 'بين الأصدقاء CAN طبيعية وغير رسمية.' },
  { prompt: 'تريد تقديم اقتراح في اجتماع رسمي.', context: 'سياق رسمي', options: ['Can I suggest…?', 'Might I suggest…?', 'Do I may suggest…?'], answer: 'Might I suggest…?', why: 'MIGHT I صيغة رسمية جدًا تناسب المناسبات الرسمية — لكنها ليست الافتراض اليومي.' },
  { prompt: 'تسأل المعلم إذنًا بمهذبة.', context: 'موقف مهذب', options: ['May I ask a question?', 'Can I ask a question?', 'May I to ask?'], answer: 'May I ask a question?', why: 'MAY I الصيغة التقليدية المهذبة لطلب الإذن.' },
  { prompt: 'أي صيغة ليست افتراضًا يوميًا للإذن؟', options: ['Can I', 'Could I', 'Might I'], answer: 'Might I', why: 'MIGHT I رسمية/قديمة ومهذبة بشدة — الحياة اليومية تفضّل CAN أو COULD أو MAY.' },
];
export function PermissionStudio43() {
  return <>
    <Panel43 kicker="PERMISSION STUDIO / 15–17" title="استوديو الاستئذان — سلم اللباقة" tone="lab">
      <p>طلبات الإذن على سلم اللباقة. لاحظ أن MIGHT I مهذبة جدًا لكنها رسمية ومتقادمة قليلًا — ليست الافتراض اليومي.</p>
      <div className="ladder43">{FORMALITY43.map(row => <div className="rung43" key={row.form} dir="ltr">
        <b>{row.form}</b><small>{row.level}</small><span>{row.note}</span></div>)}</div>
    </Panel43>
    <ChoiceLab43 id="permission" kicker="SCENARIO DIAL" title="اختر الصيغة الأنسب للموقف" tone="lab" items={PERMISSION_SCENARIOS_43}/>
  </>;
}

// ------------------------------------------------------------
// Maybe / May Be Lab (§18–19 + §29): word-function classifier
// ------------------------------------------------------------
const MAYBE_ITEMS_43: { sentence: string; kind: 'ظرف مستقل' | 'فعل ناقص + رابط'; why: string; sections: string }[] = [
  { sentence: 'Maybe we\'ll visit the museum tomorrow.', kind: 'ظرف مستقل', why: 'Maybe ظرف في أول الجملة؛ ما بعدها جملة كاملة بفعلها will visit.', sections: '§19 · §29 ①' },
  { sentence: 'She may be at home now.', kind: 'فعل ناقص + رابط', why: 'MAY فعل ناقص + BE فعل رابط: تركيب نحوي بعد الفاعل.', sections: '§19 · §29 ②' },
  { sentence: 'Maybe he is tired.', kind: 'ظرف مستقل', why: 'Maybe مستقلة؛ is الفعل الرئيسي للجملة.', sections: '§19 · §29 ③' },
  { sentence: 'This exercise may be difficult.', kind: 'فعل ناقص + رابط', why: 'may be: الفعل الناقص ثم الصيغة الأساسية من BE.', sections: '§19 · §29 ④' },
  { sentence: 'Maybe she will join us later.', kind: 'ظرف مستقل', why: 'الكلمة المستقلة تتصدر الجملة كظرف.', sections: '§19 · §29 ⑤' },
  { sentence: 'He may be our new classmate.', kind: 'فعل ناقص + رابط', why: 'may be = قد يكون: فعل ناقص + رابط.', sections: '§19 · §29 ⑥' },
];
export function MaybeLab43() {
  return <Panel43 kicker="MAYBE / MAY BE LAB / 18–19" title="مختبر MAYBE وMAY BE" tone="lab">
    <p>صنّف الوظيفة: MAYBE ظرف مستقل بمعنى «ربما»، أم MAY BE فعل ناقص + فعل رابط؟ الجمل الست هنا هي أمثلة §19 وأسئلة §29 معًا.</p>
    <div className="choiceGrid43">{MAYBE_ITEMS_43.map((item, i) => <MaybeItem43 key={i} item={item} id={`maybe-${i}`}/>)}</div>
    <p className="label43">الاختبار السريع: استبدل الكلمة بـ «ربما» منفردة — إن سلّمت الجملة فهي ظرف؛ وإن كسرتها فهي may be.</p>
  </Panel43>;
}
function MaybeItem43({ item, id }: { item: { sentence: string; kind: string; why: string; sections: string }; id: string }) {
  const [pick, setPick] = useField43(id), [checked, setChecked] = useField43(`${id}-checked`);
  const right = pick === item.kind;
  return <article className="exercise43" data-exercise-id={id}>
    <p className="formula43" dir="ltr">{item.sentence}</p>
    <div className="actions43" role="group" aria-label="صنّف الوظيفة">
      <button type="button" aria-pressed={pick === 'ظرف مستقل'} onClick={() => { setPick('ظرف مستقل'); setChecked(''); }}><Text43 text="Maybe — ظرف مستقل"/></button>
      <button type="button" aria-pressed={pick === 'فعل ناقص + رابط'} onClick={() => { setPick('فعل ناقص + رابط'); setChecked(''); }}><Text43 text="may be — فعل ناقص + رابط"/></button>
    </div>
    <button className="primary43" type="button" disabled={!pick} onClick={() => setChecked('yes')}>تحقق</button>
    {checked && <div role="status" className={right ? 'feedback43' : 'feedback43 error'}>
      <b>{right ? 'تصنيف صحيح' : `الأصح: ${item.kind}`}</b>
      <Lines43 lines={[item.why]}/>
      <p className="label43">موضعها في المصدر: <bdi dir="ltr">{item.sections}</bdi></p>
    </div>}
  </article>;
}

// ------------------------------------------------------------
// Past Possibility Analyzer (§20–23)
// ------------------------------------------------------------
const PAST_ITEMS_43: Choice43[] = [
  { prompt: 'She may have left already. فكّك التركيب:', options: ['MAY + HAVE + V3 — احتمال ماضٍ', 'MAY + V1 — احتمال حالي', 'MAY + BE + V3'], answer: 'MAY + HAVE + V3 — احتمال ماضٍ', why: 'احتمال يتعلق بالماضي: الفعل الناقص + have + V3 (left).' },
  { prompt: 'He might have forgotten the keys. ما وظيفة HAVE هنا؟', options: ['فعل رئيسي', 'علامة التام بعد الفعل الناقص', 'فعل رابط'], answer: 'علامة التام بعد الفعل الناقص', why: 'HAVE هنا تصنع الصيغة التامة بعد MIGHT، ثم يأتي V3 (forgotten).' },
  { prompt: 'الفرق بين She may go. وShe may have gone.:', options: ['لا فرق', 'الأولى احتمال مستقبلي/حالي، والثانية احتمال يتعلق بالماضي', 'الثانية نفي'], answer: 'الأولى احتمال مستقبلي/حالي، والثانية احتمال يتعلق بالماضي', why: 'HAVE + V3 ينقل الاحتمال إلى ما سبق الآن.' },
  { prompt: 'He may have been tired. مقابل He may be tired.:', options: ['المعنى نفسه', 'الأولى تتعلق بحالة سابقة قبل الآن؛ الثانية بالحاضر', 'الأولى منع'], answer: 'الأولى تتعلق بحالة سابقة قبل الآن؛ الثانية بالحاضر', why: 'MAY HAVE BEEN + V3: احتمال عن حالة ماضية سابقة؛ MAY BE + صفة: الحاضر.' },
  { prompt: 'They might not have finished yet. التركيب:', options: ['MIGHT + HAVE + NOT + V3', 'MIGHT NOT + HAVE + V3', 'MIGHT + NOT HAVE + V3'], answer: 'MIGHT NOT + HAVE + V3', why: 'النفي يوضع على الفعل الناقص مباشرة: might not have finished.' },
  { prompt: 'She may have gone home. مقابل She has gone home.:', options: ['الأولى يقين، والثانية احتمال', 'الأولى احتمال ماضٍ، والثانية حقيقة تامة', 'لا فرق'], answer: 'الأولى احتمال ماضٍ، والثانية حقيقة تامة', why: 'بدون MAY الناقص تكون الجملة التامة خبرًا مؤكدًا؛ WITH MAY مجرد احتمال.' },
];
export function PastPossibilityAnalyzer43() {
  return <>
    <Panel43 kicker="PAST POSSIBILITY / 20–23" title="محلل احتمال الماضي" tone="lab">
      <p>المسار الزمني للحظة: الحاضر ← المستقبل ← الماضي. MAY HAVE وMIGHT HAVE يقفان عند محطة «الماضي»: احتمال يتعلق بشيء سبق.</p>
      <div className="path43" dir="ltr">
        <span className="pathNode43">now — <b>is</b></span>
        <span className="pathArrow43">→</span>
        <span className="pathNode43">future — <b>may go</b></span>
        <span className="pathArrow43">←</span>
        <span className="pathNode43 on43">past — <b>may have gone</b></span>
      </div>
    </Panel43>
    <ChoiceLab43 id="past-analyzer" kicker="STRUCTURE AUDIT" title="فكّك تركيب احتمال الماضي" tone="lab" items={PAST_ITEMS_43}/>
  </>;
}

// ------------------------------------------------------------
// Four-Modal Matrix (§24) and the six questions (§25)
// ------------------------------------------------------------
const FOUR_MODAL_ITEMS_43: Choice43[] = [
  { prompt: 'مهارة عامة: I ______ swim.', options: ['can', 'may', 'might'], answer: 'can', why: 'CAN للقدرة والإمكانية العامة.' },
  { prompt: 'إمكانية عامة: Accidents ______ happen.', options: ['may', 'can', 'might'], answer: 'can', why: 'CAN للاحتمال العام الذي يحدث أحيانًا.' },
  { prompt: 'احتمال في موقف محدد: It ______ rain tonight.', options: ['can', 'may', 'must'], answer: 'may', why: 'MAY أو MIGHT أو COULD للاحتمال في موقف محدد — لا CAN هنا.' },
  { prompt: 'طلب إذن مهذب: ______ I come in?', options: ['Can', 'May', 'Must'], answer: 'May', why: 'MAY I الصيغة التقليدية المهذبة؛ CAN I غير رسمية.' },
  { prompt: 'احتمال ماضٍ: She ______ have missed the train.', options: ['may', 'can', 'is able to'], answer: 'may', why: 'MAY HAVE / MIGHT HAVE / COULD HAVE للاحتمال الماضٍ.' },
  { prompt: 'اقتراح لبق: You ______ try a different method.', options: ['could', 'may', 'might'], answer: 'could', why: 'COULD للاقتراحات بلطف.' },
];
const SIX_QUESTIONS_43: Choice43[] = [
  { prompt: '① متى أستخدم MAY ومتى MIGHT؟', options: ['MAY دائمًا أقوى فاستخدمها أولًا', 'كلاهما صحيح في سياقات كثيرة؛ اختر بحسب درجة التحفظ التي تريدها', 'MIGHT للماضي فقط'], answer: 'كلاهما صحيح في سياقات كثيرة؛ اختر بحسب درجة التحفظ التي تريدها', why: 'التبادل مسموح في كثير من السياقات؛ MIGHT قد توحي بتحفظ أكبر أحيانًا.' },
  { prompt: '② هل MIGHT أضعف من MAY دائمًا؟', options: ['نعم', 'لا — لا توجد قاعدة نسبية ثابتة', 'نعم في الرسمي فقط'], answer: 'لا — لا توجد قاعدة نسبية ثابتة', why: 'المصدر يحذّر من النسب المئوية؛ السياق هو الحكم.' },
  { prompt: '③ متى أستخدم MAY HAVE؟', options: ['للاحتمال المتعلق بالماضي', 'للإذن', 'للمستقبل البعيد'], answer: 'للاحتمال المتعلق بالماضي', why: 'MAY HAVE + V3 تخمّن شيئًا ربما حدث.' },
  { prompt: '④ كيف أطلب الإذن بأدب؟', options: ['May I…؟', 'May I to…؟', 'May I cans…؟'], answer: 'May I…؟', why: 'MAY + الفاعل + V1؛ الصيغة التقليدية المهذبة.' },
  { prompt: '⑤ ما الفرق بين MAYBE وMAY BE؟', options: ['لا فرق', 'Maybe ظرف مستقل؛ may be = فعل ناقص + فعل رابط', 'Maybe فعل وmay be ظرف'], answer: 'Maybe ظرف مستقل؛ may be = فعل ناقص + فعل رابط', why: 'Maybe تكفي وحدها في أول الجملة؛ may be تحتاج فاعلًا وخبرًا.' },
  { prompt: '⑥ هل MAY NOT تعني دائمًا المنع؟', options: ['نعم دائمًا', 'لا — قد تعني احتمال عدم الحدوث؛ MUST NOT هو المنع القاطع', 'نعم في الرسمي فقط'], answer: 'لا — قد تعني احتمال عدم الحدوث؛ MUST NOT هو المنع القاطع', why: 'السياق يميز بين الاحتمال السلبي والمنع.' },
];
export function FourModalMatrix43() {
  return <ChoiceLab43 id="four-modals" kicker="THE FOUR MODALS / 24" title="مصفوفة الأفعال الناقصة الأربعة" intro="CAN · COULD · MAY · MIGHT — لكلٍّ موطنه الدلالي الأمثل، لكن الحدود تتداخل." tone="compare" items={FOUR_MODAL_ITEMS_43}/>;
}
export function DecisionGuide43() {
  return <ChoiceLab43 id="six-questions" kicker="SIX DECISIONS / 25" title="ستة أسئلة قبل أن تكتب" intro="قبل أن تكتب جملة بـ MAY أو MIGHT، اجب عن سؤالك الأقرب." tone="rule" items={SIX_QUESTIONS_43}/>;
}

// ------------------------------------------------------------
// Context Detective (§26): tag every use in the dialogue
// ------------------------------------------------------------
const DETECTIVE_USES_43 = ['احتمال في الحاضر', 'سؤال عن احتمال يتعلق بالماضي', 'ظرف بمعنى ربما', 'احتمال في الماضي', 'طلب إذن', 'منح الإذن'];
const DETECTIVE_ITEMS_43: Choice43[] = [
  { prompt: '① Omar: It may be in the classroom.', context: 'حدّد الوظيفة', options: DETECTIVE_USES_43, answer: 'احتمال في الحاضر', why: 'تحليل المصدر: It may be = احتمال في الحاضر.' },
  { prompt: '② Daniel: Or it might be in the laboratory.', context: 'حدّد الوظيفة', options: DETECTIVE_USES_43, answer: 'احتمال في الحاضر', why: 'تحليل المصدر: It might be = احتمال في الحاضر.' },
  { prompt: '③ Maya: Could someone have moved it?', context: 'حدّد الوظيفة', options: DETECTIVE_USES_43, answer: 'سؤال عن احتمال يتعلق بالماضي', why: 'تحليل المصدر: سؤال عن احتمال يتعلق بالماضي (could have + V3).' },
  { prompt: '④ Omar: Maybe.', context: 'حدّد الوظيفة', options: DETECTIVE_USES_43, answer: 'ظرف بمعنى ربما', why: 'تحليل المصدر: Maybe = ظرف بمعنى ربما.' },
  { prompt: '⑤ Omar: The cleaner may have put it in the storage room.', context: 'حدّد الوظيفة', options: DETECTIVE_USES_43, answer: 'احتمال في الماضي', why: 'تحليل المصدر: may have put = احتمال في الماضي.' },
  { prompt: '⑥ Daniel: We might have left it near the computers yesterday.', context: 'حدّد الوظيفة', options: DETECTIVE_USES_43, answer: 'احتمال في الماضي', why: 'تحليل المصدر: might have left = احتمال في الماضي.' },
  { prompt: '⑦ Maya: May I check the laboratory first?', context: 'حدّد الوظيفة', options: DETECTIVE_USES_43, answer: 'طلب إذن', why: 'تحليل المصدر: May I check...? = طلب إذن.' },
  { prompt: '⑧ Teacher: Of course, you may.', context: 'حدّد الوظيفة', options: DETECTIVE_USES_43, answer: 'منح الإذن', why: 'تحليل المصدر: you may = منح الإذن.' },
];

export function ContextDetective43() {
  return <>
    <Dialog43 lines={section43(26).lines} prefix="s26-dialog" title="The Missing Science Project"/>
    <ChoiceLab43 id="detective" kicker="CONTEXT DETECTIVE / 26" title="المحقق اللغوي — وسم كل استخدام" intro="للحوار إحدى عشرة دورًا ويحلل المصدر ثمانية استخدامات فيه. وسّم وظيفة التعبير في كل دور من الأدوار المُحلَّلة." tone="dialog" items={DETECTIVE_ITEMS_43}/>
  </>;
}

// ------------------------------------------------------------
// Practice sets (§§27–32): attempt-gated, source keys
// ------------------------------------------------------------
export function PracticeSet43({ section }: { section: number }) {
  const items = practices43(section);
  const choices = items.filter(item => item.parts[0] === 'choice');
  const responses = items.filter(item => item.parts[0] !== 'choice');
  return <>
    {choices.length > 0 && <ChoiceLab43 id={`practice-${section}`} kicker={`PRACTICE / §${section}`} title={`تدريب §${section}`} tone="drill"
      items={choices.map(item => {
        // Multiple-choice keys carry the letter («A — may. …»); the chosen
        // option is the one whose label starts with that letter.
        const letter = item.sourceAnswer.match(/^\s*([ABC])\b/)?.[1];
        const byLetter = letter ? item.options.find(o => o.startsWith(`${letter}.`)) : undefined;
        return { prompt: item.prompt, context: item.note, options: item.options,
          answer: byLetter ?? item.sourceAnswer, accepted: item.accepted ?? (byLetter ? [byLetter] : undefined), why: item.sourceAnswer };
      })}/>}
    {responses.length > 0 && <AttemptLab43 id={`practice-${section}`} kicker={`PRACTICE / §${section}`} tone="drill"
      fieldLabel="اكتب إجابتك" sourceLabel="مفتاح المصدر" extra={responses.every(item => item.parts[0] === 'response')}
      items={responses.map(item => ({ prompt: item.prompt, source: item.sourceAnswer, reason: practiceReason43(item.section, item.number) }))}/>}
  </>;
}

// ------------------------------------------------------------
// Error Repair (§31) — attempt-gated repairs
// ------------------------------------------------------------
const ERROR_ITEMS_43 = practices43(31).map(item => ({
  prompt: item.prompt, source: item.sourceAnswer,
  reason: practiceReason43(31, item.number),
}));
export function ErrorRepair43() {
  return <AttemptLab43 id="error-repair" kicker="ERROR REPAIR / 31" title="كاشف الأخطاء — صحّح الجمل العشر" intro="كل جملة فيها خطأ واحد يتعلق بـ MAY أو MIGHT ثم صحّحها واذكر ما غيّرته ولماذا." fieldLabel="جملتك بعد الإصلاح" sourceLabel="الحل من المصدر" extra items={ERROR_ITEMS_43}/>;
}

// ------------------------------------------------------------
// Reading Challenge (§32) — passage + 10 attempt-gated questions
// ------------------------------------------------------------
export function ReadingChallenge43() {
  const source = section43(32);
  const qStart = source.lines.indexOf('أسئلة الفهم');
  const passage = source.lines.slice(0, qStart);
  return <>
    <Panel43 kicker="READING CHALLENGE / 32" title="The Unexpected School Trip" tone="read">
      <Lines43 lines={passage} prefix="s32-passage"/>
    </Panel43>
    <AttemptLab43 id="reading" kicker="READING QUESTIONS" title="أسئلة الفهم العشر" intro="أجب عن كل سؤال بجملة أو كلمة، ثم قارن بمفتاح المصدر." fieldLabel="إجابتك" sourceLabel="إجابة المصدر" items={practices43(32).map(item => ({
      prompt: item.prompt, source: item.sourceAnswer, reason: practiceReason43(32, item.number),
    }))}/>
  </>;
}

// ------------------------------------------------------------
// Writing Mission (§35) — 10-item mission checklist
// ------------------------------------------------------------
const WRITING_CHECKS_43 = [
  'كتبت 12–15 جملة',
  'استخدمت MAY للاحتمال المستقبلي مرة على الأقل',
  'استخدمت MIGHT مرة على الأقل',
  'استخدمت MAY HAVE أو MIGHT HAVE لاحتمال ماضٍ',
  'استخدمت MAY I في طلب إذن',
  'استخدمت MAYBE كظرف مستقل',
  'استخدمت MAY BE (فعل ناقص + فعل رابط)',
  'استخدمت MAY NOT للاحتمال بعدم حدوث شيء',
  'استخدمت MIGHT NOT مرة على الأقل',
  'التحدي: صنّفت كل جملة إلى احتمال / إذن / ظرف',
];
export function WritingMission43() {
  const [done, setDone] = useField43('writing-done');
  const count = WRITING_CHECKS_43.filter((_, i) => done?.includes(`w${i}`)).length;
  return <Panel43 kicker="WRITING MISSION / 35" title="مهمة الكتابة — A Day of Possibilities" tone="write">
    <Lines43 lines={section43(35).lines} prefix="s35"/>
    <p className="label43">قائمة المهمة — عشرة بنود (المتطلبات الثمانية + الطول + تحدي التصنيف):</p>
    <ul className="checklist43">{WRITING_CHECKS_43.map((label, i) => <li key={i}>
      <label>
        <input type="checkbox" checked={Boolean(done?.includes(`w${i}`))} onChange={e => setDone(e.target.checked ? `${done ?? ''} w${i}` : (done ?? '').replace(` w${i}`, '').replace(`w${i}`, '').trim())}/>
        <span><Text43 text={label}/></span>
      </label>
    </li>)}</ul>
    <p role="status"><b>الإنجاز:</b> <bdi dir="ltr">{count} / {WRITING_CHECKS_43.length}</bdi></p>
    <p className="label43">نموذج إرشادي — إضافة المنصة (غير منسوب للمصدر): <bdi dir="ltr" className="font-en">It may rain tomorrow, so we might stay home. Maybe we will visit the museum instead. I may have forgotten my umbrella — I might be late. May I ask a question? She may be our new teacher. The game may not be cancelled. They might not come. He may have been tired yesterday. We may need more time. It might be fun!</bdi></p>
    <p className="label43">ملاحظة المنصة: النثر لا يُصحَّح آليًا هنا — قارن نموذجك بمفتاح المعلم في منطقة الحلول بعد الاختبار.</p>
  </Panel43>;
}

// ------------------------------------------------------------
// Summary (§36) and Roadmap (§37)
// ------------------------------------------------------------
export function SummaryCards43() {
  const rules = [
    ['MAY + V1', 'احتمال حاضر/مستقبلي وإذن مهذب'],
    ['MIGHT + V1', 'احتمال، غالبًا بتحفظ أكبر — لا قاعدة نسبية ثابتة'],
    ['MAY NOT / MIGHT NOT + V1', 'احتمال عدم حدوث شيء — أو منع بـ MAY NOT في سياقات محددة'],
    ['MAY HAVE / MIGHT HAVE + V3', 'احتمال يتعلق بالماضي'],
    ['MAYBE', 'ظرف مستقل بمعنى «ربما»'],
    ['MAY BE', 'فعل ناقص + فعل رابط'],
    ['MAY I…?', 'طلب إذن مهذب'],
    ['MIGHT I…?', 'رسمي جدًا/قديم — ليس الافتراض اليومي'],
    ['MAY NOT ≠ MUST NOT', 'الأولى احتمال أو إذن منفي؛ الثانية منع قاطع'],
    ['لا نسب مئوية', 'قوة الاحتمال يحددها السياق لا الفعل الناقص وحده'],
  ];
  return <Panel43 kicker="GOLDEN RULES / 36" title="الملخص الذهبي" tone="rule">
    <div className="summaryGrid43">{rules.map(([en, ar]) => <div className="summaryCard43" key={en}>
      <p dir="ltr" className="formula43">{en}</p><p>{ar}</p></div>)}</div>
    <p className="label43"><Text43 text="لخّص بصوتك: اشرح لزميلك لماذا لا نربط MAY وMIGHT بنسبة مئوية ثابتة."/></p>
  </Panel43>;
}
export function Roadmap43() {
  return <Panel43 kicker="ROADMAP / 37" title="خريطة الطريق" tone="challenge">
    <Lines43 lines={section43(37).lines} prefix="s37"/>
    <p className="label43">المحطة القادمة في خريطة المنهج — غير منفّذة في هذا التطبيق:</p>
    <div className="nextStation43" dir="ltr">
      <span className="familyChip43">Lesson 44 — MUST &amp; HAVE TO</span>
      <span className="nextName43">Necessity, Obligation &amp; Rules</span>
    </div>
    <p>الدرس التالي مخطط فقط ولم يُنفَّذ بعد في هذه النسخة — لا توجد له صفحة أو مسار بعد.</p>
  </Panel43>;
}

// ------------------------------------------------------------
// Transform consoles for MAY and MIGHT (§§3–5, 8–10)
// ------------------------------------------------------------
const TRANSFORM_MAY: Transform43[] = [
  { en: 'She may come tomorrow.', ar: 'قد تأتي غدًا.', negative: 'She may not come tomorrow.', question: 'May she come tomorrow?', why: 'النفي: may + not + V1. السؤال: May + الفاعل + V1 — دون DO.' },
  { en: 'It may rain tomorrow.', ar: 'قد تمطر غدًا.', negative: 'It may not rain tomorrow.', question: 'May it rain tomorrow?', why: 'الفعل الرئيسي يبقى V1 في النفي والسؤال.' },
  { en: 'We may need more information.', ar: 'قد نحتاج معلومات إضافية.', negative: 'We may not need more information.', question: 'May we need more information?', why: 'MAY ثابتة مع كل الفاعلين.' },
  { en: 'He may be at home now.', ar: 'قد يكون في المنزل الآن.', negative: 'He may not be at home now.', question: 'May he be at home now?', why: 'بعد MAY تأتي الصيغة الأساسية من BE.' },
];
const TRANSFORM_MIGHT: Transform43[] = [
  { en: 'He might come late.', ar: 'قد يأتي متأخرًا.', negative: 'He might not come late.', question: 'Might he come late?', why: 'النفي: might + not + V1. السؤال: Might + الفاعل + V1.' },
  { en: 'She might be tired.', ar: 'قد تكون متعبة.', negative: 'She might not be tired.', question: 'Might she be tired?', why: 'MIGHT لا تأخذ s مع أي فاعل.' },
  { en: 'They might visit us tomorrow.', ar: 'قد يزورونا غدًا.', negative: 'They might not visit us tomorrow.', question: 'Might they visit us tomorrow?', why: 'الفعل الرئيسي V1 بلا to.' },
  { en: 'This plan might work.', ar: 'قد تنجح الخطة.', negative: 'This plan might not work.', question: 'Might this plan work?', why: 'الفاعل العادي لا يغيّر الفعل الناقص.' },
];
export function TransformMay43() { return <TransformLab43 id="transform-may" items={TRANSFORM_MAY} title="من الإثبات إلى النفي والسؤال — MAY" kicker="TRANSFORM CONSOLE / 04"/>; }
export function TransformMight43() { return <TransformLab43 id="transform-might" items={TRANSFORM_MIGHT} title="من الإثبات إلى النفي والسؤال — MIGHT" kicker="TRANSFORM CONSOLE / 10"/>; }

export function ModalFamily43Intro() {
  return <Panel43 kicker="MODAL FAMILY" title="عائلة الأفعال الناقصة" tone="rule">
    <p>الفعلان المظللان هما محطتنا اليوم:</p>
    <ModalFamily43 words={['can', 'could', 'may', 'might', 'must', 'should', 'would']} focus={['may', 'might']}/>
  </Panel43>;
}

// ------------------------------------------------------------
// WILL vs MAY (§6) — WILL is not a promise machine
// ------------------------------------------------------------
const WILL_MAY_ITEMS_43: Choice43[] = [
  { prompt: 'It will rain tomorrow. — ماذا يقول المتحدث؟', options: ['يقين تام', 'توقع قوي لكن ليس ضمانًا', 'منع'], answer: 'توقع قوي لكن ليس ضمانًا', why: 'المصدر: WILL لا تضمن دائمًا حدوث الشيء.' },
  { prompt: 'It may rain tomorrow. — ماذا تُظهر MAY؟', options: ['عدم اليقين', 'يقينًا', 'منعًا'], answer: 'عدم اليقين', why: 'MAY تجعل عدم اليقين مرئيًا بدل إخفائه.' },
  { prompt: 'أيهما يجعل التوقع أكثر تحفظًا؟', options: ['WILL', 'MAY أو MIGHT', 'MUST'], answer: 'MAY أو MIGHT', why: 'الفعل الناقص الاحتمالي يخفيض اليقين المُعلَن.' },
];
export function WillMayCompare43() {
  return <ChoiceLab43 id="will-may" kicker="WILL vs MAY / 06" title="WILL ليست آلة ضمان" tone="compare" items={WILL_MAY_ITEMS_43}/>;
}

// ------------------------------------------------------------
// MAY NOT vs MUST NOT (§14)
// ------------------------------------------------------------
const MUST_NOT_ITEMS_43: Choice43[] = [
  { prompt: 'You may not enter. — المعنى الأقرب هنا:', options: ['غير مسموح لك بالدخول', 'ربما لا تدخل'], answer: 'غير مسموح لك بالدخول', why: 'في سياق الإذن: MAY NOT = منع.' },
  { prompt: 'He may not come. — المعنى:', options: ['ربما لا يأتي', 'ممنوع عليه المجيء'], answer: 'ربما لا يأتي', why: 'في سياق الاحتمال: MAY NOT = احتمال عدم الحدوث.' },
  { prompt: 'You must not smoke here. — المعنى:', options: ['منع قاطع', 'احتمال عدم التدخين'], answer: 'منع قاطع', why: 'MUST NOT دائمًا تحمل الوجوب والمنع.' },
  { prompt: 'ما الذي يميز MAY NOT عن MUST NOT؟', options: ['لا فرق', 'MAY NOT مرنة (احتمال أو إذن منفي)؛ MUST NOT منع قاطع', 'MUST NOT احتمال'], answer: 'MAY NOT مرنة (احتمال أو إذن منفي)؛ MUST NOT منع قاطع', why: 'احتفظ بهذا التمييز: السياق يفسر MAY NOT، وMUST NOT لا تحتمل اللبس.' },
];
export function MustNotCompare43() {
  return <ChoiceLab43 id="must-not" kicker="MAY NOT vs MUST NOT / 14" title="النفي: مرونة أم قاطعية؟" tone="compare" items={MUST_NOT_ITEMS_43}/>;
}
