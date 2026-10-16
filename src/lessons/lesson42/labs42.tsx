import { Lines42, Panel42, Tag42, Text42, useField42 } from './kit42';
import { AttemptLab42, ChoiceLab42, Dialog42, GoalList42, ModalFamily42, SwitchLab42, TransformLab42, type Choice42 } from './tools42';
import { practices42, type Practice42 } from './practiceData42';
import { practiceReason42 } from './practiceNotes42';
import { section42 } from './ledger42';

// ============================================================
// A. Modal Meaning Lab — one sentence, seven possible jobs
// ============================================================
const FUNCTIONS_42 = ['قدرة حالية', 'قدرة عامة في الماضي', 'طلب مهذب', 'طلب إذن', 'إمكانية عامة', 'احتمال', 'اقتراح'];
const MEANING_ITEMS: Choice42[] = [
  { prompt: 'I can ride a bicycle.', context: 'السياق: أتحدث عن مهارة أمتلكها الآن.', options: FUNCTIONS_42, answer: 'قدرة حالية', why: 'CAN + فعل مهارة في الحاضر = قدرة يمتلكها المتحدث الآن.' },
  { prompt: 'When I was six, I could ride a bicycle.', context: 'السياق: زمن ماضٍ محدد في الطفولة.', options: FUNCTIONS_42, answer: 'قدرة عامة في الماضي', why: 'COULD مع زمن ماضٍ تعبّر عن مهارة عامة كان يمتلكها الشخص.' },
  { prompt: 'Could you help me, please?', context: 'السياق: أطلب من زميلي مساعدة الآن.', options: FUNCTIONS_42, answer: 'طلب مهذب', why: 'Could you...؟ طلب في الحاضر؛ COULD هنا ليست ماضية.' },
  { prompt: 'Could I open the window, please?', context: 'السياق: أريد إذن المعلم.', options: FUNCTIONS_42, answer: 'طلب إذن', why: 'Could I...؟ تسأل عن الإذن لا عن القدرة الجسدية.' },
  { prompt: 'Learning a new language can be challenging.', context: 'السياق: حقيقة عامة عن تعلّم اللغات.', options: FUNCTIONS_42, answer: 'إمكانية عامة', why: 'لا مهارة هنا: CAN تصف شيئًا ممكن الحدوث عمومًا.' },
  { prompt: 'It could rain tomorrow.', context: 'السياق: نتحدث عن الطقس غدًا.', options: FUNCTIONS_42, answer: 'احتمال', why: 'COULD تعني أن الأمر محتمل لا مؤكد.' },
  { prompt: 'We could visit the museum tomorrow.', context: 'السياق: أطرح فكرة على صديقي.', options: FUNCTIONS_42, answer: 'اقتراح', why: 'COULD تطرح الفكرة بوصفها اقتراحًا ممكنًا.' },
  { prompt: 'Can you open the door?', context: 'السياق: الباب ثقيل وأريد أن أعرف إن كان زميلي يقوى على فتحه.', options: FUNCTIONS_42, answer: 'قدرة حالية', why: 'السؤال عن قدرة الشخص في الحاضر؛ لو كنا نطلب الفتح لكان المعنى طلبًا.' },
  { prompt: 'She can speak three languages.', context: 'السياق: أصف مهارات صديقتي.', options: FUNCTIONS_42, answer: 'قدرة حالية', why: 'مهارة حاضرة: CAN + V1.' },
  { prompt: 'Accidents can happen.', context: 'السياق: تحذير عام.', options: FUNCTIONS_42, answer: 'إمكانية عامة', why: 'CAN للتعبير عن إمكانية عامة، لا عن مهارة شخص.' },
  { prompt: 'Could you repeat the question?', context: 'السياق: لم أفهم السؤال في الصف.', options: FUNCTIONS_42, answer: 'طلب مهذب', why: 'طلب في الحاضر؛ COULD تجعله أقل مباشرة عادةً.' },
  { prompt: 'My grandfather could run very fast when he was young.', context: 'السياق: أتحدث عن شباب جدي.', options: FUNCTIONS_42, answer: 'قدرة عامة في الماضي', why: 'مهارة عامة في الماضي: COULD + V1.' },
];
export function MeaningLab42() {
  return <ChoiceLab42 id="meaning" kicker="MODAL MEANING LAB" title="جملة واحدة… ومهمات متعددة" tone="lab"
    intro="اقرأ الجملة والسياق معًا، ثم حدّد الوظيفة. المعنى لا تأتي من الكلمة وحدها، بل من الموقف." items={MEANING_ITEMS}/>;
}

// ============================================================
// B. Sentence Builder — Subject + CAN/COULD + V1
// ============================================================
type Build42 = { prompt: string; target: string; chips: string[]; why: string };
const BUILD_ITEMS: Build42[] = [
  { prompt: 'ابنِ جملة قدرة حالية: هي تسبح.', target: 'She can swim.', chips: ['She', 'can', 'swim.', 'swims.', 'to'], why: 'بعد CAN يأتي الفعل بصيغة V1: swim وليس swims، ولا نستخدم to.' },
  { prompt: 'ابنِ جملة قدرة ماضية: كان يستطيع لعب كرة القدم.', target: 'He could play football.', chips: ['He', 'could', 'play', 'played', 'football.'], why: 'بعد COULD نستخدم V1: play وليس played.' },
  { prompt: 'ابنِ سؤالًا عن القدرة باستخدام CAN.', target: 'Can you swim?', chips: ['Can', 'you', 'swim?', 'Do', 'Does'], why: 'CAN نفسه الفعل المساعد؛ لا نضيف Do أو Does.' },
  { prompt: "ابنِ نفيًا باستخدام CAN'T.", target: "She can't drive a car.", chips: ['She', "can't", 'drive', 'drives', 'a', 'car.'], why: 'نضع not بعد can مباشرة، ويبقى الفعل الرئيسي V1: drive.' },
  { prompt: 'ابنِ طلبًا مهذبًا باستخدام COULD.', target: 'Could you help me?', chips: ['Could', 'you', 'help', 'to', 'me?'], why: 'بعد Could you يأتي الفعل مباشرة بدون to.' },
];
function diagnose(built: string) {
  if (/\b(cans|coulds)\b/.test(built)) return 'لا تضف s إلى CAN أو COULD مع أي فاعل؛ الفعل الناقص ثابت الصيغة.';
  if (/\b(can|could)\s+to\b/.test(built)) return 'لا تستخدم to بعد CAN أو COULD؛ الفعل يأتي بصيغة V1 مباشرة.';
  if (/^(do|does|did)\b/i.test(built)) return 'لا تبدأ السؤال بـ DO أو DOES أو DID مع CAN أو COULD؛ المساعد نفسه يتقدّم.';
  if (/\b(swims|plays|speaks|drives|understands|runs)\b/.test(built)) return 'بعد CAN أو COULD يبقى الفعل الرئيسي V1 دون إضافة s.';
  if (/\b(played|rode|understood|finished|swam)\b/.test(built)) return 'بعد COULD نستخدم V1 وليس تصريف الماضي.';
  if (/\b(swimming|playing|reading|driving)\b/.test(built)) return 'بعد CAN أو COULD نستخدم V1 وليس V-ing.';
  return 'راجع الترتيب: Subject + CAN/COULD + V1.';
}
export function BuilderLab42() {
  return <Panel42 kicker="SENTENCE BUILDER" title="ابنِ الجملة قطعة قطعة" tone="drill">
    <p>اضغط الكلمات بالترتيب الصحيح. إذا اخترت كلمة خاطئة سيخبرك المختبر بالقاعدة التي خالفتها.</p>
    {BUILD_ITEMS.map((item, i) => <BuilderItem42 key={i} id={`build-${i + 1}`} item={item} index={i + 1}/>)}
  </Panel42>;
}
function BuilderItem42({ item, id, index }: { item: Build42; id: string; index: number }) {
  const [built, setBuilt] = useField42(id), [checked, setChecked] = useField42(`${id}-checked`);
  const words = built ? built.split(' ') : [];
  const right = built === item.target;
  return <article className="exercise42" data-exercise-id={id}>
    <span className="label42"><bdi dir="ltr">{index}</bdi></span>
    <Lines42 lines={[item.prompt]}/>
    <p className="label42">بناؤك الحالي</p>
    <p className="buildStage42" dir="ltr" data-testid={`${id}-stage`}>{built || '—'}</p>
    <div className="actions42" role="group" aria-label="كلمات البناء">
      {item.chips.map((chip, i) => <button key={`${chip}-${i}`} type="button" dir="ltr" disabled={words.includes(chip) && item.chips.filter(c => c === chip).length === 1} onClick={() => { setBuilt(words.concat(chip).join(' ')); setChecked(''); }}>{chip}</button>)}
    </div>
    <div className="actions42">
      <button className="primary42" type="button" disabled={!words.length} onClick={() => setChecked('yes')}>تحقق من البناء</button>
      <button type="button" disabled={!words.length} onClick={() => { setBuilt(''); setChecked(''); }}>ابدأ من جديد</button>
    </div>
    {checked && <div role="status" className={right ? 'feedback42' : 'feedback42 error'}>
      <b>{right ? 'بناء صحيح' : 'هناك خلل في البناء'}</b>
      {right ? <Lines42 lines={[item.why]}/> : <Lines42 lines={[diagnose(built), `الصيغة الصحيحة: ${item.target}`]}/>}
    </div>}
  </article>;
}

// ============================================================
// C. Politeness Studio — permission and requests
// ============================================================
const REQUEST_OPTIONS = ['Can I...?', 'Could I...?', 'Can you...?', 'Could you...?'];
const STUDIO_ITEMS: Choice42[] = [
  { prompt: 'Can I ask a question?', context: 'الموقف: في الصف وتريد أن تسأل معلمك.', options: REQUEST_OPTIONS, answer: 'Could I...?', why: 'أنت من يتحدث ويريد الإذن، فنستخدم I لا you. وCould I...؟ عادةً أكثر تحفظًا وألطفًا من Can I...؟', note: 'Can I...؟ صحيحة أيضًا وأكثر مباشرة؛ COULD ليست أكثر تهذيبًا في كل سياق، لكنها غالبًا أقل مباشرة.' },
  { prompt: 'Can I borrow a pencil?', context: 'الموقف: تريد استعارة قلم من زميلك.', options: REQUEST_OPTIONS, answer: 'Could I...?', why: 'طلب إذن لاستعارة شيء: Could I borrow...؟ صيغة مهذبة ومعتادة.' },
  { prompt: 'Can I open the window?', context: 'الموقف: أنت داخل الصف وتريد فتح النافذة.', options: REQUEST_OPTIONS, answer: 'Could I...?', why: 'أنت من يطلب الإذن، therefore الفاعل I. Could I open the window, please؟ هي صيغة المصدر المهذبة.' },
  { prompt: 'Can you help me find a book?', context: 'الموقف: في المكتبة وتريد مساعدة أمين المكتبة.', options: REQUEST_OPTIONS, answer: 'Could you...?', why: 'أنت تطلب من شخص آخر أن يفعل شيئًا، لذلك الفاعل you. Could you help me...؟ هي صياغة المصدر في حوار المكتبة.' },
  { prompt: 'Can you repeat the question?', context: 'الموقف: لم تسمع السؤال في الصف.', options: REQUEST_OPTIONS, answer: 'Could you...?', why: 'طلب من المعلم: Could you repeat the question؟ أكثر لطفًا عادةً من Can you...؟' },
  { prompt: 'Can I keep them for two weeks?', context: 'الموقف: تريد الاحتفاظ بكتب المكتبة مدة أطول.', options: REQUEST_OPTIONS, answer: 'Could I...?', why: 'طلب إذن من أمين المكتبة: Could I keep them for two weeks؟' },
];
export function PolitenessStudio42({ id, title, kicker }: { id: string; title: string; kicker: string }) {
  return <ChoiceLab42 id={id} kicker={kicker} title={title} tone="challenge"
    intro="اختر الصيغة الأنسب للموقف. لاحظ الفرق بين I (أنت تطلب) وyou (تطلب من غيرك)، وبين CAN المباشرة وCOULD الأكثر تحفظًا." items={STUDIO_ITEMS}/>;
}

// ============================================================
// D. Past ability vs specific success
// ============================================================
const SUCCESS_ITEMS: Choice42[] = [
  { prompt: 'When Omar was young, he ______ swim very well.', context: 'المطلوب: مهارة عامة كان يمتلكها.', options: ['could', 'was able to', 'managed to'], answer: 'could', why: 'القدرة العامة في الماضي تُعبَّر عنها بـ could ببساطة.' },
  { prompt: 'Yesterday, Omar fell into the water, but he ______ swim to the shore.', context: 'المطلوب: إبراز نجاح في موقف ماضٍ محدد.', options: ['could', 'was able to', 'managed to'], answer: 'was able to', why: 'في المثبت نُبرز النجاح في حدث واحد محدد بـ was/were able to أو managed to.' },
  { prompt: 'The door was stuck, but Daniel ______ open it.', context: 'المطلوب: إبراز نجاح في موقف محدد.', options: ['could', 'was able to', 'managed to'], answer: 'managed to', why: 'managed to تؤكد النجاح بعد صعوبة، وهي من صيغ النجاح في موقف محدد.' },
  { prompt: 'My grandfather ______ play the piano when he was a child.', context: 'المطلوب: مهارة عامة في الماضي.', options: ['could', 'was able to', 'managed to'], answer: 'could', why: 'مهارة عامة: could هو الخيار الطبيعي.' },
  { prompt: 'Although the exam was difficult, Maya ______ answer every question.', context: 'المطلوب: إبراز النجاح في موقف محدد.', options: ['could', 'was able to', 'managed to'], answer: 'was able to', why: 'الامتحان حدث ماضٍ واحد، والجملة تبرز النجاح فيه.' },
  { prompt: 'I ______ open the window yesterday.', context: 'المطلوب: التعبير عن عدم القدرة في موقف ماضٍ محدد.', options: ["couldn't", "wasn't able to", 'كلتاهما طبيعيتان'], answer: 'كلتاهما طبيعيتان', why: "في النفي، couldn't تعبير طبيعي عن عدم القدرة في موقف ماضٍ محدد؛ wasn't able to صحيحة أيضًا.", note: 'لهذا لا نطبّق الفرق بين could وwas able to بصورة آلية على كل الجمل.' },
];
export function PastSuccessLab42() {
  return <ChoiceLab42 id="success" kicker="PAST ABILITY vs SPECIFIC SUCCESS" title="قدرة عامة أم نجاح في موقف محدد؟" tone="compare"
    intro="القاعدة التعليمية: could للقدرة العامة في الماضي، وwas/were able to أو managed to لإبراز نجاح حدث واحد محدد في المثبت. أما couldn't فطبيعية حتى في موقف محدد." items={SUCCESS_ITEMS}/>;
}

// ============================================================
// E. Context Detective — the same words, different jobs
// ============================================================
type Detective42 = { sentence: string; rows: { context: string; options: string[]; answer: string; why: string }[] };
const DETECTIVE: Detective42[] = [
  { sentence: 'Can you open the door?', rows: [
    { context: 'الباب ثقيل وتسأل زميلك إن كان يقوى على فتحه.', options: ['سؤال عن القدرة', 'طلب', 'طلب إذن'], answer: 'سؤال عن القدرة', why: 'تريد معرفة ما إذا كان يملك القدرة؛ لذلك هو سؤال عن القدرة.' },
    { context: 'يداك مشغولتان وتطلب من زميلك أن يفتح الباب.', options: ['سؤال عن القدرة', 'طلب', 'طلب إذن'], answer: 'طلب', why: 'الجملة نفسها لكنها الآن طلب؛ السياق هو ما يحدد المعنى.' },
  ]},
  { sentence: 'Could you swim?', rows: [
    { context: 'تتحدثان عن الطفولة.', options: ['قدرة في الماضي', 'قدرة افتراضية', 'طلب مهذب'], answer: 'قدرة في الماضي', why: 'السياق الماضي يحول COULD إلى سؤال عن قدرة ماضية.' },
    { context: 'تقفان أمام نهر واسع وقد تحتاج إلى العبور.', options: ['قدرة في الماضي', 'قدرة افتراضية', 'طلب مهذب'], answer: 'قدرة افتراضية', why: 'السؤال عن قدرة في حالة مفترضة: Could you swim across this river if necessary؟' },
  ]},
  { sentence: 'Can I use your pen?', rows: [
    { context: 'تريد استخدام قلم زميلك.', options: ['طلب إذن', 'سؤال عن القدرة', 'اقتراح'], answer: 'طلب إذن', why: 'Can I...؟ تسأل عن الإذن لا عن قدرتك على حمل القلم.' },
  ]},
];
export function ContextDetective42() {
  return <Panel42 kicker="CONTEXT DETECTIVE" title="الجملة لا تكفي؛ السياق يحسم المعنى" tone="lab">
    <p>لكل جملة سياقان مختلفان. حدّد الوظيفة في كل سياق، ثم تحقق لترى كيف يتغير المعنى.</p>
    {DETECTIVE.map((item, i) => <div className="detective42" key={i}>
      <p className="formula42" dir="ltr">{item.sentence}</p>
      <ChoiceLab42 id={`detective-${i + 1}`} items={item.rows.map(row => ({ prompt: row.context, options: row.options, answer: row.answer, why: row.why }))}/>
    </div>)}
  </Panel42>;
}

// ============================================================
// F. Error Repair — diagnose, then fix
// ============================================================
type Repair42 = { wrong: string; answer: string; diagnosis: string; reason: string };
const REPAIR_ITEMS: Repair42[] = [
  { wrong: 'She cans swim.', answer: 'She can swim.', diagnosis: 'إضافة s إلى CAN/COULD', reason: 'CAN فعل ناقص ثابت الصيغة: لا cans ولا coulds.' },
  { wrong: 'He can speaks English.', answer: 'He can speak English.', diagnosis: 'تصريف الفعل الرئيسي', reason: 'بعد CAN يبقى الفعل الرئيسي V1: speak.' },
  { wrong: 'I can to play chess.', answer: 'I can play chess.', diagnosis: 'استخدام to بعد الفعل الناقص', reason: 'لا نضع to بعد CAN أو COULD.' },
  { wrong: 'Do you can drive?', answer: 'Can you drive?', diagnosis: 'إضافة DO/DOES/DID', reason: 'CAN هو المساعد نفسه؛ لا حاجة إلى do-support.' },
  { wrong: "She doesn't can swim.", answer: "She can't swim.", diagnosis: 'إضافة DO/DOES/DID', reason: 'النفي يُبنى بـ not بعد can: can\'t.' },
  { wrong: 'He could played football.', answer: 'He could play football.', diagnosis: 'تصريف الفعل الرئيسي', reason: 'بعد COULD نستخدم V1: play.' },
  { wrong: 'I will can speak English.', answer: 'I will be able to speak English.', diagnosis: 'جمع فعلين ناقصين', reason: 'لا نجمع will وcan؛ نستخدم will be able to للقدرة المستقبلية.' },
  { wrong: 'Could you to help me?', answer: 'Could you help me?', diagnosis: 'استخدام to بعد الفعل الناقص', reason: 'بعد Could you يأتي الفعل مباشرة بدون to.' },
  { wrong: "She couldn't understands the lesson.", answer: "She couldn't understand the lesson.", diagnosis: 'تصريف الفعل الرئيسي', reason: 'بعد couldn\'t يبقى الفعل V1: understand.' },
  { wrong: 'Can she swimming?', answer: 'Can she swim?', diagnosis: 'استخدام V-ing بدل V1', reason: 'بعد CAN نستخدم V1: swim وليس swimming.' },
];
const DIAGNOSES = ['إضافة s إلى CAN/COULD', 'استخدام to بعد الفعل الناقص', 'إضافة DO/DOES/DID', 'تصريف الفعل الرئيسي', 'جمع فعلين ناقصين', 'استخدام V-ing بدل V1', 'لا يوجد خطأ'];
export function ErrorRepairLab42() {
  return <Panel42 kicker="ERROR REPAIR LAB" title="شخّص الخطأ أولًا، ثم أصلح الجملة" tone="challenge">
    <p>اختر نوع الخطأ من القائمة، واكتب الجملة الصحيحة، ثم قارن بحل المصدر.</p>
    {REPAIR_ITEMS.map((item, i) => <RepairItem42 key={i} id={`repair-${i + 1}`} item={item} index={i + 1}/>)}
  </Panel42>;
}
function RepairItem42({ item, id, index }: { item: Repair42; id: string; index: number }) {
  const [diagnosis, setDiagnosis] = useField42(`${id}-diagnosis`);
  const [fix, setFix] = useField42(id);
  const [attempt, setAttempt] = useField42(`${id}-attempt`);
  const right = diagnosis === item.diagnosis;
  return <article className="exercise42" data-exercise-id={id}>
    <span className="label42"><bdi dir="ltr">{index}</bdi></span>
    <p className="formula42 wrong42" dir="ltr">{item.wrong}</p>
    <label className="field42">نوع الخطأ
      <select value={diagnosis} onChange={e => { setDiagnosis(e.target.value); setAttempt(''); }}>
        <option value="">اختر…</option>
        {DIAGNOSES.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
    <label className="field42">الجملة بعد التصحيح
      <textarea rows={2} dir="auto" value={fix} onChange={e => { setFix(e.target.value); setAttempt(''); }}/>
    </label>
    <button className="primary42" type="button" disabled={!diagnosis || !fix.trim()} onClick={() => setAttempt('yes')}>قارن تشخيصك بالحل</button>
    {attempt && <div className="feedback42" role="status">
      <b>{right ? 'تشخيص صحيح' : 'التشخيص غير مطابق'}</b>
      <Lines42 lines={[`النوع: ${item.diagnosis}`, `التصحيح: ${item.answer}`, item.reason]}/>
      {!right && <p className="label42">قارن اختيارك بالنوع الصحيح أعلاه، ثم عدّل الجملة.</p>}
    </div>}
  </article>;
}

// ============================================================
// G. Reading Challenge — The Young Inventor
// ============================================================
export function ReadingChallenge42() {
  const [analysis, setAnalysis] = useField42('reading-analysis');
  const lines = section42(39).lines;
  const text = lines.slice(0, lines.indexOf('أسئلة الفهم'));
  return <>
    <Panel42 kicker="READING CHALLENGE" title="The Young Inventor" tone="read">
      <Lines42 lines={text} prefix="s39-reading"/>
      <label className="check42"><input type="checkbox" checked={!!analysis} onChange={e => setAnalysis(e.target.checked ? 'yes' : '')}/>أظهر تحليل الوظائف بعد القراءة — إضافة المنصة</label>
      {analysis && <div className="feedback42">
        <p>النص لم يتغير؛ هذا التحليل إضافة تعليمية.</p>
        <div className="readout42" dir="ltr">
          <Tag42 role="could">couldn't understand</Tag42>
          <Tag42 role="could">could build</Tag42>
          <Tag42 role="can">can design</Tag42>
          <Tag42 role="able">was able to repair</Tag42>
          <Tag42 role="future">will be able to</Tag42>
        </div>
        <Lines42 lines={[
          'couldn\'t + understand: عدم القدرة في الماضي.',
          'could + build: قدرة عامة في الماضي.',
          'can + design: قدرة حالية.',
          'was able to + repair: نجاح في موقف ماضٍ محدد.',
          'will be able to + work: قدرة مستقبلية.',
        ]}/>
      </div>}
    </Panel42>
    <Panel42 title="أسئلة الفهم العشرة" tone="drill">
      <p>أجب عن كل سؤال، ثم قارن إجابتك بحل المصدر وشرح المنصة.</p>
      <PracticeSet42 section={39}/>
    </Panel42>
  </>;
}

// ============================================================
// H. Writing Mission
// ============================================================
export function WritingMission42() {
  const [text, setText] = useField42('writing');
  const [model, setModel] = useField42('writing-model');
  const lines = section42(42).lines;
  const requirements = lines.slice(lines.indexOf('يجب أن تتضمن:') + 1, lines.indexOf('نموذج إرشادي'));
  const modelLines = lines.slice(lines.indexOf('نموذج إرشادي') + 1, lines.indexOf('تحدي إضافي'));
  const sentences = (text.match(/[^.!?\n]+[.!?]+(?=\s|$)/g) || []).length;
  const canCount = (text.match(/\bcan\b/gi) || []).length;
  const couldCount = (text.match(/\bcould\b/gi) || []).length;
  return <Panel42 kicker="WRITING MISSION" title="My Abilities: Past, Present & Future" tone="write">
    <Lines42 lines={lines.slice(0, 3)}/>
    <label className="field42">فقرتك الخاصة<bdi dir="ltr"> (English)</bdi>
      <textarea rows={12} dir="ltr" lang="en" value={text} onChange={e => setText(e.target.value)}/>
    </label>
    <p role="status" className="counter42">الجمل المكتملة بعلامة ترقيم: <bdi dir="ltr">{sentences} / 12–15</bdi> · كلمات CAN: <bdi dir="ltr">{canCount}</bdi> · كلمات COULD: <bdi dir="ltr">{couldCount}</bdi>. عدّ آلي تقريبي؛ ليس تقييمًا لقواعد كتابتك.</p>
    <p className="label42">قائمة التحقق الذاتية — علّم كل شرط تحقّقه فعلًا في فقرتك:</p>
    <ul className="checklist42">{requirements.map((line, i) => <li key={i}><WritingCheck42 text={line} index={i}/></li>)}</ul>
    <button type="button" aria-expanded={!!model} onClick={() => setModel(model ? '' : 'yes')}>النموذج الإرشادي — مرجع منفصل</button>
    {model && <div className="reference42">
      <p><b>نموذج المصدر</b></p>
      <p className="label42">ملاحظة المنصة: النموذج ثماني جمل فقط، ولا يحقق شرط 12–15 جملة ولا كل البنود العشرة؛ اعرضه بوصفه إلهامًا جزئيًا لا إجابة كاملة.</p>
      <Lines42 lines={modelLines}/>
    </div>}
    <p className="label42">تحدي إضافي من المصدر: حوّل ثلاث جمل من فقرتك إلى أسئلة، وثلاث جمل أخرى إلى النفي.</p>
  </Panel42>;
}
function WritingCheck42({ text, index }: { text: string; index: number }) {
  const [checked, setChecked] = useField42(`writing-check-${index}`);
  return <label className="check42"><input type="checkbox" checked={!!checked} onChange={e => setChecked(e.target.checked ? 'yes' : '')}/><Text42 text={text}/></label>;
}

// ============================================================
// Practice cards for §§34–38 (attempt-bound source keys)
// ============================================================
export function PracticeSet42({ section }: { section: number }) {
  return <div className="practiceGrid42">{practices42(section).map(item => <PracticeCard42 key={item.id} item={item}/>)}</div>;
}
const FIELD_LABELS: Record<number, [string, string]> = {
  34: ['CAN أم COULD؟', 'سبب الاختيار'],
  35: ['الجملة بعد النفي', ''],
  36: ['الجملة بعد السؤال', ''],
  37: ['اختر الصيغة', 'سبب الاختيار'],
  38: ['التصحيح', 'ما الذي غيّرته ولماذا؟'],
  39: ['إجابتك', ''],
};
const PRACTICE_NOTES: Record<number, string> = {
  34: 'حدّد الوظيفة أولًا: قدرة، إذن، طلب، احتمال، أم اقتراح؟',
  35: 'أضف not بعد CAN أو COULD مباشرة، وأبقِ الفعل V1.',
  36: 'قدّم CAN أو COULD قبل الفاعل؛ لا تستخدم DO.',
  37: 'اسأل: هل نتحدث عن مهارة عامة أم عن نجاح في موقف محدد؟',
  38: 'صحّح وفسّر. البند 7 يخص جمع فعلين ناقصين.',
  39: 'اعتمد على النص نفسه في إجابتك.',
};
export function PracticeCard42({ item }: { item: Practice42 }) {
  const [response, setResponse] = useField42(item.id);
  const [extra, setExtra] = useField42(`${item.id}-extra`);
  const [attempt, setAttempt] = useField42(`${item.id}-attempt`);
  const two = item.parts.length > 1;
  const [first, second] = FIELD_LABELS[item.section];
  const options = item.options.length > 0;
  return <article className="exercise42" data-practice-id={item.id}>
    <span className="label42"><bdi dir="ltr">{item.number}</bdi> · §<bdi dir="ltr">{item.section}</bdi></span>
    <Lines42 lines={[item.prompt]}/>
    <p className="label42"><Text42 text={PRACTICE_NOTES[item.section]}/></p>
    <label className="field42"><Text42 text={first}/>
      {options
        ? <select value={response} onChange={e => { setResponse(e.target.value); setAttempt(''); }}><option value="">اختر…</option>{item.options.map(option => <option key={option} value={option}>{option}</option>)}</select>
        : <textarea rows={2} dir="auto" value={response} onChange={e => { setResponse(e.target.value); setAttempt(''); }}/>}
    </label>
    {two && <label className="field42">{second}
      <textarea rows={2} dir="auto" value={extra} onChange={e => { setExtra(e.target.value); setAttempt(''); }}/>
    </label>}
    <button className="primary42" type="button" disabled={!response.trim() || (two && !extra.trim())} onClick={() => setAttempt('yes')}>قارن محاولتك بالحل</button>
    {attempt && <div className="feedback42" role="status">
      <b>حل المصدر — للمقارنة الذاتية، وليس تصحيحًا آليًا</b>
      <Lines42 lines={[item.sourceAnswer]}/>
      <p className="label42">شرح المنصة</p>
      <Lines42 lines={[practiceReason42(item.section, item.number)]}/>
    </div>}
  </article>;
}

// ============================================================
// Golden summary + roadmap
// ============================================================
export function SummaryCards42() {
  return <div className="summary42">
    <div className="summaryCard42 can">
      <p className="eyebrow42" dir="ltr">CAN</p>
      <p className="formula42" dir="ltr">Subject + can + V1</p>
      <Lines42 lines={['القدرة الحالية: I can swim.', 'الإمكانية العامة: Accidents can happen.', 'طلب الإذن: Can I use your pen?', 'تقديم الطلبات: Can you help me?']}/>
    </div>
    <div className="summaryCard42 could">
      <p className="eyebrow42" dir="ltr">COULD</p>
      <p className="formula42" dir="ltr">Subject + could + V1</p>
      <Lines42 lines={['القدرة العامة في الماضي: I could swim when I was six.', 'الطلب المهذب: Could you help me, please?', 'طلب الإذن المهذب: Could I ask a question?', 'الاحتمال: It could rain tomorrow.', 'الاقتراح: We could visit the museum.']}/>
    </div>
    <div className="summaryCard42 forms">
      <p className="eyebrow42">الصيغ</p>
      <Lines42 lines={['النفي: cannot / can\'t — could not / couldn\'t', 'السؤال: Can + Subject + V1؟', 'Could + Subject + V1؟', 'القدرة المستقبلية: will be able to + V1', 'I will be able to drive next year.']}/>
    </div>
    <div className="summaryCard42 advanced">
      <p className="eyebrow42">الفرق المتقدم</p>
      <Lines42 lines={['COULD = قدرة عامة في الماضي.', 'WAS/WERE ABLE TO = مناسبة لإبراز النجاح في موقف ماضٍ محدد.', 'لا تترجم CAN وCOULD بصورة آلية؛ حدّد الوظيفة داخل الموقف.']}/>
    </div>
  </div>;
}

export function Roadmap42() {
  const [next, setNext] = useField42('roadmap-next');
  return <Panel42 kicker="COURSE MAP" title="خريطة التقدم والمحطة القادمة" tone="lab">
    <div className="progress42">
      <span className="progressValue42" dir="ltr">42 / 120</span>
      <span className="progressBar42"><span className="progressFill42" style={{ width: '35%' }}/></span>
      <span className="label42">42 درسًا مكتملًا — 78 درسًا متبقيًا (أرقام المنهج، لا عدّاد إتقان شخصي)</span>
    </div>
    <p className="label42">المحطة القادمة في المنهج — غير منفّذة في هذا التطبيق:</p>
    <div className="nextStation42">
      <span className="familyChip42" dir="ltr">Lesson 43 — MAY & MIGHT</span>
      <span className="label42">Possibility, Probability & Permission</span>
    </div>
    <button type="button" aria-expanded={!!next} onClick={() => setNext(next ? '' : 'yes')}>ماذا سنتعلم في الدرس 43؟</button>
    {next && <Lines42 lines={section42(44).lines.slice(4)}/>}
  </Panel42>;
}

// ------------------------------------------------------------
// Re-exported for Steps42 / Lesson42 convenience
// ------------------------------------------------------------
export { AttemptLab42, ChoiceLab42, Dialog42, GoalList42, ModalFamily42, SwitchLab42, TransformLab42 };
