import { Lines42, Panel42, Text42 } from './kit42';
import { section42, splitTitle42, STATIONS_42, NEXT_LESSON_42 } from './ledger42';
import {
  BuilderLab42, ContextDetective42, ErrorRepairLab42, MeaningLab42, PastSuccessLab42,
  PolitenessStudio42, ReadingChallenge42, SummaryCards42, Roadmap42, WritingMission42, PracticeSet42,
} from './labs42';
import { ChoiceLab42, Dialog42, GoalList42, ModalFamily42, SwitchLab42, TransformLab42, type Choice42, type Transform42 } from './tools42';

// ------------------------------------------------------------
// Step-local practice banks (source prompts, platform-authored feedback)
// ------------------------------------------------------------
const FORMS = ['She can swim.', 'She can swims.', 'She can to swim.'];
const RULE_ITEMS: Choice42[] = [
  { prompt: 'أي الجمل صحيحة بعد CAN؟', options: FORMS, answer: 'She can swim.', why: 'بعد CAN يأتي الفعل بصيغته الأساسية V1 دون s ودون to.' },
  { prompt: 'أكمل: He ______ football.', options: ['cans play', 'can plays', 'can play'], answer: 'can play', why: 'CAN لا تتغير مع الفاعل، والفعل الرئيسي يبقى V1.' },
  { prompt: 'أكمل: They ______ fast.', options: ['could runs', 'could run', 'could to run'], answer: 'could run', why: 'بعد COULD نستخدم V1 أيضًا.' },
];
const NO_S_ITEMS: Choice42[] = [
  { prompt: 'He ______ English.', options: ['cans speak', 'can speaks', 'can speak'], answer: 'can speak', why: 'لا cans ولا can speaks: الفعل الناقص ثابت والفعل الرئيسي V1.' },
  { prompt: 'She ______ stories.', options: ['cans write', 'can writes', 'can write'], answer: 'can write', why: 'قارن: She writes stories. / She can write stories.' },
  { prompt: 'Omar ______ difficult problems.', options: ['cans solve', 'can solves', 'can solve'], answer: 'can solve', why: 'قارن: Omar solves difficult problems. / Omar can solve difficult problems.' },
];
const ABILITY_ITEMS: Choice42[] = [
  { prompt: 'I can run fast.', options: ['قدرة جسدية', 'قدرة عقلية', 'مهارة مكتسبة', 'قدرة لغوية'], answer: 'قدرة جسدية', why: 'القدرة قد تكون جسدية أو عقلية أو مهارة مكتسبة أو قدرة لغوية.' },
  { prompt: 'She can solve complex problems.', options: ['قدرة جسدية', 'قدرة عقلية', 'مهارة مكتسبة', 'قدرة لغوية'], answer: 'قدرة عقلية', why: 'حل المشكلات المعقدة قدرة عقلية.' },
  { prompt: 'He can play chess.', options: ['قدرة جسدية', 'قدرة عقلية', 'مهارة مكتسبة', 'قدرة لغوية'], answer: 'مهارة مكتسبة', why: 'الشطرنج مهارة مكتسبة بالتدريب.' },
  { prompt: 'They can speak three languages.', options: ['قدرة جسدية', 'قدرة عقلية', 'مهارة مكتسبة', 'قدرة لغوية'], answer: 'قدرة لغوية', why: 'التحدث بثلاث لغات قدرة لغوية.' },
];
const TALENT_ITEMS: Choice42[] = [
  { prompt: 'لماذا استخدمنا CAN في جميع الإجابات؟', options: ['لأن الطلاب يتحدثون عن مهارات يستطيعون أداءها حاليًا', 'لأنهم يتحدثون عن الماضي', 'لأنهم يطلبون الإذن', 'لأنهم يقترحون أفكارًا'], answer: 'لأن الطلاب يتحدثون عن مهارات يستطيعون أداءها حاليًا', why: 'هذا سؤال الفهم في المصدر: CAN تعبّر عن القدرة الحالية.' },
];
const SHORT_ITEMS: Choice42[] = [
  { prompt: 'Can she speak English?', options: ['Yes, she do.', 'Yes, she can.', 'Yes, she is.'], answer: 'Yes, she can.', why: 'الإجابة القصيرة تستخدم CAN نفسه، وليس DO.' },
  { prompt: 'Can they help us?', options: ["No, they don't.", "No, they can't.", "No, they aren't."], answer: "No, they can't.", why: 'النفي القصير: No + الفاعل + can\'t.' },
  { prompt: 'Can your brother cook?', options: ['Yes, he does.', 'Yes, he can.', 'Yes, he cans.'], answer: 'Yes, he can.', why: 'لا نقول Yes, I do. عندما يبدأ السؤال بـ CAN.' },
];
const WH_ITEMS: Choice42[] = [
  { prompt: 'تسأل عن القدرات: What ______ you ______?', options: ['can / do', 'do / can do', 'can / to do'], answer: 'can / do', why: 'WH + CAN + Subject + V1.' },
  { prompt: 'تسأل عن المكان: ______ we find this book؟', options: ['Where can', 'Where we can', 'Where do we can'], answer: 'Where can', why: 'أداة السؤال تتصدر ثم CAN ثم الفاعل.' },
  { prompt: 'تسأل عن السبب: ______ he join the team؟', options: ["Why can't", "Why he can't", "Why doesn't he can"], answer: "Why can't", why: 'النفي داخل سؤال WH يأتي بعد CAN مباشرة.' },
  { prompt: 'سؤال بالفاعل: من يستطيع حل هذه المسألة؟', options: ['Who can solve this problem؟', 'Who does can solve this problem؟', 'Who can solves this problem؟'], answer: 'Who can solve this problem؟', why: 'Who تسأل عن الفاعل، فلا نضيف فاعلًا آخر ولا do.' },
];
const TIME_ITEMS: Choice42[] = [
  { prompt: 'I ______ swim. (الآن)', options: ['can', 'could', 'cans'], answer: 'can', why: 'القدرة الحالية بـ CAN.' },
  { prompt: 'I ______ swim when I was younger.', options: ['can', 'could', 'will can'], answer: 'could', why: 'القدرة العامة في الماضي بـ COULD.' },
  { prompt: 'She ______ read English books when she was ten.', options: ['can', 'could', 'cans'], answer: 'could', why: 'زمن ماضٍ محدد يمنح COULD معنى القدرة الماضية.' },
  { prompt: 'We ______ understand this lesson.', options: ['can', 'could', 'are can'], answer: 'can', why: 'الحاضر: CAN + V1.' },
];
const NOT_PAST_ITEMS: Choice42[] = [
  { prompt: 'Could you help me, please؟', options: ['لا، طلب في الحاضر', 'نعم، قدرة ماضية'], answer: 'لا، طلب في الحاضر', why: 'طلبات COULD تتعلق بالحاضر ولا تُترجم إلى الماضي.' },
  { prompt: 'It could rain tomorrow.', options: ['لا، احتمال مستقبلي', 'نعم، قدرة ماضية'], answer: 'لا، احتمال مستقبلي', why: 'COULD هنا تعبّر عن احتمال لا عن الماضي.' },
  { prompt: 'Could you swim when you were six؟', options: ['نعم، سؤال عن قدرة ماضية', 'لا، طلب مهذب'], answer: 'نعم، سؤال عن قدرة ماضية', why: 'السياق الماضي هو ما يمنح COULD معنى القدرة الماضية.' },
];
const QUICK_CHALLENGE: Choice42[] = [
  { prompt: '① My sister ______ play the piano now.', options: ['can', 'could', 'couldn\'t'], answer: 'can', why: 'الحل من المصدر: ① can.' },
  { prompt: '② When I was five, I ______ count to one hundred.', options: ['can', 'could', 'couldn\'t'], answer: 'could', why: 'الحل من المصدر: ② could.' },
  { prompt: '③ My grandfather ______ use a computer when he was young, but he can use one now.', options: ['can', 'could', 'couldn\'t'], answer: "couldn't", why: 'الحل من المصدر: ③ couldn\'t. لكنة الآن يستطيع.' },
];
const FUTURE_ITEMS: Choice42[] = [
  { prompt: 'أي الصيغ تعبّر عن قدرة مستقبلية؟', options: ['I will can swim.', 'I will be able to swim.', 'I can will swim.'], answer: 'I will be able to swim.', why: 'لا نجمع WILL وCAN؛ نستخدم will be able to + V1.' },
  { prompt: 'After this course, I ______ communicate more confidently.', options: ['will can', 'will be able to', 'could'], answer: 'will be able to', why: 'القدرة المستقبلية: will be able to + V1.' },
  { prompt: 'She ______ drive when she gets her licence.', options: ['will can', 'will be able to', 'could'], answer: 'will be able to', why: 'شرط مستقبلي مع قدرة مستقبلية.' },
];
const PAST_OR_REQUEST_ITEMS: Choice42[] = [
  { prompt: 'Could you swim when you were six؟', options: ['قدرة في الماضي', 'طلب مهذب في الحاضر'], answer: 'قدرة في الماضي', why: 'السؤال عن الطفولة سؤال عن قدرة ماضية.' },
  { prompt: 'Could you open the window, please؟', options: ['قدرة في الماضي', 'طلب مهذب في الحاضر'], answer: 'طلب مهذب في الحاضر', why: 'طلب حالي؛ COULD تخفّض حدة المباشرة.' },
  { prompt: 'Could you help me now؟', options: ['قدرة في الماضي', 'طلب مهذب في الحاضر'], answer: 'طلب مهذب في الحاضر', why: 'now يؤكد أن الطلب في الحاضر.' },
];
const RESPONSE_ITEMS: Choice42[] = [
  { prompt: 'سألك زميلك: Could you help me, please؟', options: ['Yes, I could.', 'Of course!', 'Yes, I can swim.'], answer: 'Of course!', why: 'نجيب عن طلب حالي بإجابة طبيعية مثل Of course! أو Sure! أو No problem.' },
  { prompt: 'Could you swim when you were five؟', options: ['Yes, I could.', 'Of course!', 'Sure!'], answer: 'Yes, I could.', why: 'سؤال عن قدرة ماضية، فالإجابة القصيرة بـ could.' },
  { prompt: 'لا تستطيع المساعدة الآن. أي إجابة مناسبة؟', options: ["I'm sorry, but I can't right now.", 'Yes, I could.', 'No problem.'], answer: "I'm sorry, but I can't right now.", why: 'رفض مهذب واضح للحاضر.' },
];
const LIBRARY_ITEMS: Choice42[] = [
  { prompt: 'Could you help me find a book؟', options: ['طلب مساعدة مهذب', 'سؤال عن القدرة', 'اقتراح'], answer: 'طلب مساعدة مهذب', why: 'تحليل الحوار في المصدر: طلب مساعدة مهذب.' },
  { prompt: 'Could you follow me, please؟', options: ['طلب مهذب', 'طلب إذن', 'احتمال'], answer: 'طلب مهذب', why: 'تحليل الحوار: طلب مهذب.' },
  { prompt: 'Can I borrow two books at the same time؟', options: ['طلب إذن', 'طلب مهذب', 'احتمال'], answer: 'طلب إذن', why: 'تحليل الحوار: طلب إذن.' },
  { prompt: 'Could I keep them for two weeks؟', options: ['طلب إذن مهذب', 'طلب مساعدة', 'اقتراح'], answer: 'طلب إذن مهذب', why: 'تحليل الحوار: طلب إذن مهذب.' },
];
const POSSIBILITY_ITEMS: Choice42[] = [
  { prompt: 'The weather can change quickly in the mountains.', options: ['إمكانية عامة', 'احتمال في موقف محدد', 'قدرة حالية'], answer: 'إمكانية عامة', why: 'CAN تصف شيئًا ممكن الحدوث عمومًا، لا مهارة.' },
  { prompt: 'This computer could make a mistake if the data is incorrect.', options: ['إمكانية عامة', 'احتمال في موقف محدد', 'قدرة ماضية'], answer: 'احتمال في موقف محدد', why: 'COULD تربط الاحتمال بموقف معين.' },
  { prompt: 'Computers can make mistakes.', options: ['إمكانية عامة', 'احتمال في موقف محدد', 'اقتراح'], answer: 'إمكانية عامة', why: 'حقيقة عامة عن الحواسيب.' },
];
const CERTAINTY_ITEMS: Choice42[] = [
  { prompt: 'It could rain tomorrow.', options: ['احتمال', 'حقيقة مؤكدة', 'قدرة'], answer: 'احتمال', why: 'COULD تعبّر عن احتمال لا عن يقين.' },
  { prompt: 'هل COULD تعني أن الأمر سيحدث بالتأكيد؟', options: ['لا', 'نعم'], answer: 'لا', why: 'إنها تعبّر عن احتمال، لا عن حقيقة مؤكدة.' },
  { prompt: 'She could be at the library.', options: ['احتمال', 'قدرة حالية', 'طلب إذن'], answer: 'احتمال', why: 'ربما تكون في المكتبة: تخمين محتمل.' },
];
const COMPARE_POSSIBILITY: Choice42[] = [
  { prompt: 'Accidents can happen.', options: ['إمكانية عامة', 'احتمال في موقف محدد'], answer: 'إمكانية عامة', why: 'المصدر: هنا نتحدث عن إمكانية عامة.' },
  { prompt: "An accident could happen if we aren't careful.", options: ['إمكانية عامة', 'احتمال في موقف محدد'], answer: 'احتمال في موقف محدد', why: 'المصدر: هنا نتحدث عن احتمال في موقف محدد.' },
];
const SUGGESTION_ITEMS: Choice42[] = [
  { prompt: 'We ______ visit the museum tomorrow. (اقتراح)', options: ['can', 'could', 'cans'], answer: 'could', why: 'could تطرح الفكرة اقتراحًا ممكنًا.' },
  { prompt: 'You ______ try a different method. (اقتراح)', options: ['can', 'could', 'coulds'], answer: 'could', why: 'اقتراح مهذب بلطف.' },
  { prompt: 'We can visit the museum tomorrow.', options: ['الزيارة ممكنة أو متاحة', 'اقتراح'], answer: 'الزيارة ممكنة أو متاحة', why: 'فرق المعنى في المصدر: can = متاحة.' },
  { prompt: 'We could visit the museum tomorrow.', options: ['الزيارة ممكنة أو متاحة', 'اقتراح'], answer: 'اقتراح', why: 'could = نطرح الزيارة اقتراحًا.' },
];
const ABLE_ITEMS: Choice42[] = [
  { prompt: 'أي الجمل صحيحة؟', options: ['I can speak English.', 'I can speaks English.', 'I can to speak English.'], answer: 'I can speak English.', why: 'CAN + V1 مباشرة.' },
  { prompt: 'أي صيغة مناسبة لقدرة مستقبلية؟', options: ['I will can drive next year.', 'I will be able to drive next year.', 'I could drive next year.'], answer: 'I will be able to drive next year.', why: 'BE ABLE TO مفيدة عندما لا نستطيع بناء الزمن بـ CAN.' },
  { prompt: 'أي صيغة تعبّر عن تطور حديث؟', options: ['I have canned solve more difficult problems recently.', 'I have been able to solve more difficult problems recently.', 'I can solve more difficult problems recently.'], answer: 'I have been able to solve more difficult problems recently.', why: 'CAN لا تُصرَّف كفعل عادي؛ BE ABLE TO تعمل في كل الأزمنة.' },
];
const ADVENTURE_ITEMS: Choice42[] = [
  { prompt: 'I can ride a bicycle.', options: ['قدرة حالية', 'قدرة في الماضي', 'اقتراح'], answer: 'قدرة حالية', why: 'تحليل الاستخدامات في المصدر.' },
  { prompt: "I can't swim very well.", options: ['عدم امتلاك قدرة كافية', 'عدم القدرة في الماضي', 'طلب إذن'], answer: 'عدم امتلاك قدرة كافية', why: 'تحليل الاستخدامات في المصدر.' },
  { prompt: "I couldn't ride a bicycle.", options: ['عدم القدرة في الماضي', 'قدرة حالية', 'احتمال'], answer: 'عدم القدرة في الماضي', why: 'تحليل الاستخدامات في المصدر.' },
  { prompt: 'Could someone help me prepare the equipment list؟', options: ['طلب مهذب', 'اقتراح', 'احتمال'], answer: 'طلب مهذب', why: 'تحليل الاستخدامات في المصدر.' },
  { prompt: 'We could divide the tasks between us.', options: ['اقتراح', 'قدرة ماضية', 'طلب إذن'], answer: 'اقتراح', why: 'تحليل الاستخدامات في المصدر.' },
  { prompt: 'Could I bring my camera؟', options: ['طلب إذن', 'طلب مهذب', 'قدرة ماضية'], answer: 'طلب إذن', why: 'تحليل الاستخدامات في المصدر.' },
  { prompt: 'It could rain.', options: ['احتمال', 'قدرة حالية', 'اقتراح'], answer: 'احتمال', why: 'تحليل الاستخدامات في المصدر.' },
];
const TRANSFORM_CAN: Transform42[] = [
  { en: 'She can drive a car.', ar: 'تستطيع قيادة السيارة.', negative: "She can't drive a car.", question: 'Can she drive a car؟', why: 'النفي: can + not + V1. السؤال: Can + الفاعل + V1. لا نستخدم DO.' },
  { en: 'They can understand the instructions.', ar: 'يستطيعون فهم التعليمات.', negative: "They can't understand the instructions.", question: 'Can they understand the instructions؟', why: 'الفعل يبقى V1 في النفي والسؤال.' },
  { en: 'My brother can play the piano.', ar: 'يستطيع أخي العزف على البيانو.', negative: "My brother can't play the piano.", question: 'Can your brother play the piano؟', why: 'في السؤال يتغير الضمير الملكي كما في تدريب المصدر.' },
  { en: 'We can finish the project today.', ar: 'نستطيع إنهاء المشروع اليوم.', negative: "We can't finish the project today.", question: 'Can we finish the project today؟', why: 'CAN ثابتة مع كل الضمائر.' },
];
const TRANSFORM_COULD: Transform42[] = [
  { en: 'He could swim when he was five.', ar: 'كان يستطيع السباحة عندما كان عمره خمس سنوات.', negative: "He couldn't swim when he was five.", question: 'Could he swim when he was five؟', why: "النفي couldn't + V1، والسؤال Could + الفاعل + V1." },
  { en: 'She could read English books when she was younger.', ar: 'كانت تستطيع قراءة الكتب الإنجليزية عندما كانت أصغر.', negative: "She couldn't read English books when she was younger.", question: 'Could she read English books when she was younger؟', why: 'قدرة عامة في الماضي.' },
  { en: 'Your grandfather could speak three languages.', ar: 'كان جدك يستطيع التحدث بثلاث لغات.', negative: "Your grandfather couldn't speak three languages.", question: 'Could your grandfather speak three languages؟', why: 'هذا سؤال تدريب المصدر §36.' },
  { en: 'They could swim when they were young.', ar: 'كانوا يستطيعون السباحة عندما كانوا صغارًا.', negative: "They couldn't swim when they were young.", question: 'Could they swim when they were young؟', why: 'COULD لا تأخذ do-support.' },
];
const PRACTICE_INTRO: Record<number, string> = {
  34: 'حدّد الوظيفة أولًا: قدرة، إذن، طلب، احتمال، أم اقتراح؟ ثم اختر CAN أو COULD.',
  35: 'أضف not بعد CAN أو COULD مباشرة، وأبقِ الفعل V1.',
  36: 'قدّم CAN أو COULD قبل الفاعل؛ لا تستخدم DO أو DOES أو DID.',
  37: 'اسأل: هل نتحدث عن مهارة عامة في الماضي أم عن نجاح في موقف محدد؟',
  38: 'صحّح كل جملة واذكر ما غيّرته ولماذا. البند 7 يخص جمع فعلين ناقصين.',
};

function Cover42() {
  const lines = section42(0).lines;
  return <section className="cover42">
    <div className="coverMain42">
      <p className="eyebrow42" dir="ltr">LANGUAGE CONTROL LAB / LESSON 42</p>
      <h2 dir="ltr">CAN &amp; COULD<br/><em>Mastering ability and polite communication</em></h2>
      <Lines42 lines={[lines[1]]}/>
      <div className="coverChannels42" dir="ltr">
        <span className="coverChannel42 can">CAN<small>ABILITY · POSSIBILITY</small></span>
        <span className="coverChannel42 could">COULD<small>PAST · POLITE · POSSIBLE</small></span>
      </div>
      <p className="coverCaption42">أربعة مواقف من يومك الدراسي… وفعلان ناقصان فقط.</p>
    </div>
    <div className="coverMoments42">
      <p className="eyebrow42">من المصدر</p>
      <Lines42 lines={lines.slice(2)} prefix="s0-cover"/>
    </div>
  </section>;
}

function SuccessCards42() {
  return <div className="successCards42">
    <div className="successCard42"><p className="eyebrow42" dir="ltr">COULD</p><p>قدرة عامة في الماضي</p><p className="formula42" dir="ltr">He could swim very well.</p></div>
    <div className="successCard42"><p className="eyebrow42" dir="ltr">WAS/WERE ABLE TO</p><p>نجاح في موقف ماضٍ محدد</p><p className="formula42" dir="ltr">He was able to swim to the shore.</p></div>
    <div className="successCard42"><p className="eyebrow42" dir="ltr">MANAGED TO</p><p>نجاح بعد صعوبة</p><p className="formula42" dir="ltr">Daniel managed to open it.</p></div>
  </div>;
}

function PracticeStep42({ section }: { section: number }) {
  const lines = section42(section).lines;
  const cut = lines.findIndex(line => line.startsWith('الحلول'));
  return <>
    <Panel42 kicker="PRACTICE / محاولة أولًا" title={section42(section).title} tone="drill">
      <Lines42 lines={lines.slice(0, cut)} prefix={`s${section}-prompt`}/>
      <p><Text42 text={PRACTICE_INTRO[section]}/></p>
    </Panel42>
    <PracticeSet42 section={section}/>
  </>;
}

export function Steps42({ index, onTest, onTeacher }: { index: number; onTest: () => void; onTeacher: () => void }) {
  const source = section42(index);
  // Source headings such as «CAN vs COULD — مقارنة القدرة» carry an English
  // label and an Arabic title. They render as two isolated lines so the mixed
  // pair never shares one RTL paragraph (shared BIDI contract).
  const [enTitle, arTitle] = splitTitle42(source.title);
  return <article data-source-section={source.id} className="step42">
    {index === 0 ? <Cover42/> : <header className="stepHeading42">
      <span className="sectionNumber42" aria-hidden="true">{String(index).padStart(2, '0')}</span>
      <div><p className="eyebrow42">مختبر التحكم باللغة / القسم {index}</p>{enTitle && <p className="eyebrow42" dir="ltr" lang="en">{enTitle}</p>}<h2 tabIndex={-1} id="step-title-42"><Text42 text={arTitle}/></h2></div>
    </header>}
    {index === 0 && <SwitchLab42/>}
    {index === 1 && <GoalList42 lines={source.lines}/>}
    {index === 2 && <><Lines42 lines={source.lines} prefix="s02"/><Panel42 kicker="MODAL FAMILY" title="عائلة الأفعال الناقصة" tone="rule"><p>الفعلان المظللان هما محطتنا اليوم.</p><ModalFamily42 words={['can', 'could', 'may', 'might', 'must', 'should', 'would']}/></Panel42></>}
    {index === 3 && <><Lines42 lines={source.lines} prefix="s03"/><ChoiceLab42 id="rule" kicker="RULE CHECK" title="القاعدة الذهبية: CAN/COULD + V1" tone="rule" items={RULE_ITEMS}/></>}
    {index === 4 && <><Lines42 lines={source.lines} prefix="s04"/><BuilderLab42/></>}
    {index === 5 && <><Lines42 lines={source.lines} prefix="s05"/><ChoiceLab42 id="nos" kicker="NO S RULE" title="لماذا لا نضيف S؟" tone="rule" items={NO_S_ITEMS}/></>}
    {index === 6 && <><Lines42 lines={source.lines} prefix="s06"/><ChoiceLab42 id="ability" kicker="ABILITY TYPES" title="القدرة ليست قوة جسدية فقط" tone="lab" items={ABILITY_ITEMS}/></>}
    {index === 7 && <><Dialog42 lines={source.lines} prefix="s07"/><ChoiceLab42 id="talent" kicker="COMPREHENSION" title="سؤال الفهم" tone="dialog" items={TALENT_ITEMS}/></>}
    {index === 8 && <><Lines42 lines={source.lines} prefix="s08"/><TransformLab42 id="neg-can" items={TRANSFORM_CAN} title="من الإثبات إلى النفي — CAN"/></>}
    {index === 9 && <><Lines42 lines={source.lines} prefix="s09"/><TransformLab42 id="q-can" items={TRANSFORM_CAN} title="من الإثبات إلى السؤال — CAN"/></>}
    {index === 10 && <><Lines42 lines={source.lines} prefix="s10"/><ChoiceLab42 id="short" kicker="SHORT ANSWERS" title="الإجابات القصيرة" tone="drill" items={SHORT_ITEMS}/></>}
    {index === 11 && <><Lines42 lines={source.lines} prefix="s11"/><ChoiceLab42 id="wh" kicker="WH QUESTIONS" title="WH + CAN + Subject + V1" tone="drill" items={WH_ITEMS}/></>}
    {index === 12 && <><Lines42 lines={source.lines} prefix="s12"/><ChoiceLab42 id="time" kicker="TIME SWITCH" title="CAN للحاضر · COULD لماضي عام" tone="compare" items={TIME_ITEMS}/></>}
    {index === 13 && <><Lines42 lines={source.lines} prefix="s13"/><ChoiceLab42 id="notpast" kicker="NOT ALWAYS PAST" title="هل نتحدث عن الماضي؟" tone="challenge" items={NOT_PAST_ITEMS}/></>}
    {index === 14 && <><Lines42 lines={source.lines} prefix="s14"/><TransformLab42 id="neg-could" items={TRANSFORM_COULD} title="من الإثبات إلى النفي — COULD"/></>}
    {index === 15 && <><Lines42 lines={source.lines} prefix="s15"/><TransformLab42 id="q-could" items={TRANSFORM_COULD} title="من الإثبات إلى السؤال — COULD"/></>}
    {index === 16 && <><Lines42 lines={source.lines} prefix="s16"/><ChoiceLab42 id="quick" kicker="QUICK CHALLENGE" title="تحدي سريع من المصدر" tone="challenge" items={QUICK_CHALLENGE}/></>}
    {index === 17 && <><Lines42 lines={source.lines} prefix="s17"/><PastSuccessLab42/></>}
    {index === 18 && <><Lines42 lines={source.lines} prefix="s18"/><SuccessCards42/></>}
    {index === 19 && <><Lines42 lines={source.lines} prefix="s19"/><ChoiceLab42 id="future" kicker="FUTURE ABILITY" title="will be able to + V1" tone="rule" items={FUTURE_ITEMS}/></>}
    {index === 20 && <><Lines42 lines={source.lines} prefix="s20"/><PolitenessStudio42 id="studio-permission" kicker="POLITENESS STUDIO / PERMISSION" title="استوديو اللباقة — طلب الإذن"/></>}
    {index === 21 && <><Dialog42 lines={source.lines} prefix="s21"/><ContextDetective42/></>}
    {index === 22 && <><Lines42 lines={source.lines} prefix="s22"/><PolitenessStudio42 id="studio-request" kicker="POLITENESS STUDIO / REQUESTS" title="استوديو اللباقة — تقديم الطلبات"/></>}
    {index === 23 && <><Lines42 lines={source.lines} prefix="s23"/><ChoiceLab42 id="pastrequest" kicker="PAST OR REQUEST" title="قدرة ماضية أم طلب حالي؟" tone="compare" items={PAST_OR_REQUEST_ITEMS}/></>}
    {index === 24 && <><Lines42 lines={source.lines} prefix="s24"/><ChoiceLab42 id="response" kicker="NATURAL RESPONSES" title="الإجابة الطبيعية على الطلب" tone="dialog" items={RESPONSE_ITEMS}/></>}
    {index === 25 && <><Dialog42 lines={source.lines} prefix="s25"/><ChoiceLab42 id="library" kicker="DIALOGUE ANALYSIS" title="حلّل استخدامات CAN وCOULD في الحوار" tone="dialog" items={LIBRARY_ITEMS}/></>}
    {index === 26 && <><Lines42 lines={source.lines} prefix="s26"/><ChoiceLab42 id="possibility" kicker="GENERAL POSSIBILITY" title="CAN للإمكانية العامة" tone="lab" items={POSSIBILITY_ITEMS}/></>}
    {index === 27 && <><Lines42 lines={source.lines} prefix="s27"/><ChoiceLab42 id="certainty" kicker="POSSIBILITY" title="COULD للاحتمال لا لليقين" tone="lab" items={CERTAINTY_ITEMS}/></>}
    {index === 28 && <><Lines42 lines={source.lines} prefix="s28"/><ChoiceLab42 id="comparepos" kicker="CAN vs COULD" title="الإمكانية العامة والاحتمال في موقف محدد" tone="compare" items={COMPARE_POSSIBILITY}/></>}
    {index === 29 && <><Lines42 lines={source.lines} prefix="s29"/><ChoiceLab42 id="suggest" kicker="SUGGESTIONS" title="COULD لتقديم الاقتراحات" tone="lab" items={SUGGESTION_ITEMS}/></>}
    {index === 30 && <><Lines42 lines={source.lines} prefix="s30"/><ChoiceLab42 id="able" kicker="CAN vs BE ABLE TO" title="متى نحتاج BE ABLE TO؟" tone="rule" items={ABLE_ITEMS}/></>}
    {index === 31 && <><Lines42 lines={source.lines} prefix="s31"/><ErrorRepairLab42/></>}
    {index === 32 && <><Lines42 lines={source.lines} prefix="s32"/><MeaningLab42/><ContextDetective42/></>}
    {index === 33 && <><Dialog42 lines={source.lines} prefix="s33"/><ChoiceLab42 id="adventure" kicker="FUNCTION AUDIT" title="وظيفة كل استخدام في الحوار الشامل" tone="challenge" items={ADVENTURE_ITEMS}/></>}
    {index === 34 && <PracticeStep42 section={34}/>}
    {index === 35 && <PracticeStep42 section={35}/>}
    {index === 36 && <PracticeStep42 section={36}/>}
    {index === 37 && <PracticeStep42 section={37}/>}
    {index === 38 && <PracticeStep42 section={38}/>}
    {index === 39 && <ReadingChallenge42/>}
    {index === 40 && <Panel42 kicker="INDEPENDENT ASSESSMENT" title="25 سؤالًا · خمسة مستويات" tone="challenge"><p>حاول حل الاختبار دون الرجوع إلى الشرح. يُفتح في منطقة مستقلة؛ لا تظهر الحلول قبل تسليم كل الإجابات.</p><button className="primary42" type="button" onClick={onTest}>ابدأ الاختبار النهائي</button></Panel42>}
    {index === 41 && <Panel42 kicker="TEACHER SPACE" title="مساحة المعلم — الحلول التفصيلية" tone="rule"><p>القسم 41 في المصدر هو مفتاح التصحيح الكامل للأسئلة الـ25، مع سبب كل مفتاح وملاحظة للمعلم.</p><p>يقول المصدر: «يُفضّل عدم عرض هذا القسم للطالب إلا بعد الانتهاء من الاختبار.» لذلك لا تُعرض المفاتيح هنا؛ تُفتح من بوابة المعلم أو بعد تسليم الاختبار.</p><button type="button" onClick={onTeacher}>انتقل إلى بوابة المعلم</button></Panel42>}
    {index === 42 && <WritingMission42/>}
    {index === 43 && <><SummaryCards42/><Lines42 lines={source.lines} prefix="s43"/></>}
    {index === 44 && <><Roadmap42/><Lines42 lines={source.lines.slice(0, 4)} prefix="s44-top"/></>}
  </article>;
}
