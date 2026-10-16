import { Lines43, Panel43, Text43 } from './kit43';
import { section43, splitTitle43 } from './ledger43';
import {
  BuilderLab43, ContextDetective43, DecisionGuide43, ErrorRepair43, FourModalMatrix43,
  MaybeLab43, MayBeComposer43, MustNotCompare43, NegationLab43, PastPossibilityAnalyzer43,
  PermissionStudio43, PracticeSet43, ProbabilityExplorer43, ReadingChallenge43, Roadmap43,
  SummaryCards43, SwapLab43, TransformMay43, TransformMight43, WillMayCompare43, WritingMission43,
  ModalFamily43Intro,
} from './labs43';
import { ChoiceLab43, Dialog43, DialLab43, GoalList43, type Choice43 } from './tools43';

// ------------------------------------------------------------
// Step-local practice banks (source prompts, platform feedback)
// ------------------------------------------------------------
const MAY_RULE_ITEMS_43: Choice43[] = [
  { prompt: 'أي الجمل صحيحة؟', options: ['She may comes.', 'She may come.', 'She mays come.'], answer: 'She may come.', why: 'MAY ثابتة مع كل الفاعلين، والفعل الرئيسي V1.' },
  { prompt: 'أكمل: He ______ tired.', options: ['may is', 'may be', 'may are'], answer: 'may be', why: 'بعد MAY تأتي الصيغة الأساسية من BE.' },
  { prompt: 'أكمل: They ______ us tomorrow.', options: ['may visit', 'may visits', 'may to visit'], answer: 'may visit', why: 'MAY + V1 مباشرة.' },
];
const MIGHT_RULE_ITEMS_43: Choice43[] = [
  { prompt: 'أي الجمل صحيحة؟', options: ['He mights come.', 'He might come.', 'He might to come.'], answer: 'He might come.', why: 'MIGHT ثابتة والفعل الرئيسي V1 دون to.' },
  { prompt: 'أكمل: She ______ at the library.', options: ['might be', 'might is', 'might are'], answer: 'might be', why: 'MIGHT + الصيغة الأساسية من BE.' },
  { prompt: 'أكمل: We ______ more time.', options: ['might need', 'might needs', 'might to need'], answer: 'might need', why: 'MIGHT + V1 للجمع مثل المفرد.' },
];
const MAYBE_COMPOSER_43: Choice43[] = [
  { prompt: 'أكمل بجملة تبدأ بظرف Maybe:', options: ['Maybe she is right.', 'She maybe is right.', 'Maybe is she right.'], answer: 'Maybe she is right.', why: 'Maybe ظرف مستقل يتبعه جملة كاملة بفعلها.' },
  { prompt: 'أكمل بـ may be:', options: ['She may be right.', 'She may is right.', 'She may right.'], answer: 'She may be right.', why: 'may + الصيغة الأساسية من BE.' },
];
const PAST_PAIR_ITEMS_43: Choice43[] = [
  { prompt: 'He may be tired. مقابل He may have been tired.:', options: ['الأولى حاضر والثانية حالة سابقة قبل الآن', 'المعنى نفسه', 'الثانية منع'], answer: 'الأولى حاضر والثانية حالة سابقة قبل الآن', why: 'MAY HAVE BEEN + صفة: احتمال عن حالة ماضية سابقة.' },
  { prompt: 'They may have gone home. — ماذا نستنتج؟', options: ['ذهبوا بالتأكيد', 'احتمال أنهم ذهبوا — لم يتحقق بعد', 'ممنوع عليهم الذهاب'], answer: 'احتمال أنهم ذهبوا — لم يتحقق بعد', why: 'MAY HAVE + V3 تخمين لا خبر.' },
];
const FORMALITY_ITEMS_43: Choice43[] = [
  { prompt: 'لماذا نمتنع عن Might I في الحياة اليومية؟', options: ['خاطئة نحويًا', 'رسمية جدًا ومتقادمة قليلًا', 'تعني منعًا'], answer: 'رسمية جدًا ومتقادمة قليلًا', why: 'صحيحة نحويًا لكنها ليست الافتراض اليومي.' },
];
const OFFICE_ITEMS_43: Choice43[] = [
  { prompt: 'Student: Excuse me, may I come in?', options: ['طلب إذن', 'احتمال دخول', 'منع من الدخول'], answer: 'طلب إذن', why: 'تحليل المصدر: May I...? = طلب إذن.' },
  { prompt: 'Principal: Yes, you may.', options: ['منح الإذن', 'احتمال', 'التزام مستقبلي'], answer: 'منح الإذن', why: 'تحليل المصدر: Yes, you may. = منح الإذن.' },
  { prompt: 'May I join the competition even though I\'m new at this school?', options: ['طلب إذن', 'سؤال عن قدرة', 'اقتراح'], answer: 'طلب إذن', why: 'MAY I + V1 تطلب الإذن بلباقة.' },
];
const PERFECT_PAIR_ITEMS_43: Choice43[] = [
  { prompt: 'She has finished her homework.', options: ['حقيقة تامة', 'احتمال يتعلق بالماضي'], answer: 'حقيقة تامة', why: 'المصدر: Present Perfect تقدم الحدث بوصفه واقعًا.' },
  { prompt: 'She may have finished her homework.', options: ['احتمال يتعلق بالماضي', 'حقيقة تامة'], answer: 'احتمال يتعلق بالماضي', why: 'المصدر: هذه جملة تعبّر عن احتمال.' },
  { prompt: 'ما الذي غيّرته إضافة MAY في الجملة الثانية؟', options: ['موقف المتحدث من المعلومة', 'زمن الحدث', 'الفاعل'], answer: 'موقف المتحدث من المعلومة', why: 'المصدر: إذن إضافة MAY غيّرت موقف المتحدث من المعلومة.' },
  { prompt: 'في She may have finished. ما وظيفة have؟', options: ['فعل رئيسي بمعنى امتلاك', 'جزء من التركيب التام بعد الفعل الناقص'], answer: 'جزء من التركيب التام بعد الفعل الناقص', why: 'تحليل المصدر: may = فعل ناقص، have = جزء من التركيب التام، finished = V3.' },
];
const PAST_NEG_ITEMS_43: Choice43[] = [
  { prompt: 'She may not have received the message.', options: ['احتمال ألا تكون تلقت الرسالة', 'منع من استلام الرسالة'], answer: 'احتمال ألا تكون تلقت الرسالة', why: 'النفي في احتمال الماضي: may not have + V3.' },
  { prompt: 'الفرق بين She didn\'t receive the message. وShe may not have received the message.:', options: ['الأولى حقيقة والثانية احتمال', 'الأولى احتمال والثانية حقيقة', 'لا فرق'], answer: 'الأولى حقيقة والثانية احتمال', why: 'المصدر: الجملة الأولى تقدم عدم التلقي بوصفه حقيقة؛ الثانية بوصفه احتمالًا.' },
  { prompt: 'صيغة النفي في احتمال الماضي:', options: ['may not have + V3', 'may have not + V3', 'not may have + V3'], answer: 'may not have + V3', why: 'المصدر يحدد الصيغتين: may not have + V3 وmight not have + V3.' },
  { prompt: 'He might not have understood the instructions.', options: ['احتمال ألم يفهم التعليمات', 'منع من الفهم'], answer: 'احتمال ألم يفهم التعليمات', why: 'might not have + V3 تخمين سلبي يتعلق بالماضي.' },
];

// ------------------------------------------------------------
// Cover
// ------------------------------------------------------------
function Cover43() {
  const lines = section43(0).lines;
  return <section className="cover43">
    <div className="coverMain43">
      <p className="eyebrow43" dir="ltr">PROBABILITY OBSERVATORY / LESSON 43</p>
      <h2 dir="ltr">MAY &amp; MIGHT<br/><em>Certainty, uncertainty &amp; permission</em></h2>
      <Lines43 lines={[lines[1]]}/>
      <div className="coverChannels43" dir="ltr">
        <span className="coverChannel43 may">MAY<small>POSSIBILITY · PERMISSION</small></span>
        <span className="coverChannel43 might">MIGHT<small>RESERVED POSSIBILITY</small></span>
      </div>
      <p className="coverCaption43">قناتان لاحتمال واحد… وطيف كيفي بلا نسب مئوية.</p>
    </div>
    <div className="coverMoments43">
      <p className="eyebrow43">من المصدر</p>
      <Lines43 lines={lines.slice(2)} prefix="s0-cover"/>
    </div>
  </section>;
}

// ------------------------------------------------------------
// The 38 steps. Step index equals source section number, so the
// sidebar station map and the ledger share one coordinate space.
// ------------------------------------------------------------
export function Steps43({ index, onTest, onTeacher }: { index: number; onTest: () => void; onTeacher: () => void }) {
  const source = section43(index);
  const [enTitle, arTitle] = splitTitle43(source.title);
  return <article data-source-section={source.id} className="step43">
    {index === 0 ? <Cover43/> : <header className="stepHeading43">
      <span className="sectionNumber43" aria-hidden="true">{String(index).padStart(2, '0')}</span>
      <div><p className="eyebrow43">مرصد الاحتمالات / القسم {index}</p>{enTitle && <p className="eyebrow43" dir="ltr" lang="en">{enTitle}</p>}<h2 tabIndex={-1} id="step-title-43"><Text43 text={arTitle}/></h2></div>
    </header>}
    {index === 1 && <GoalList43 lines={source.lines}/>}
    {index === 2 && <><Lines43 lines={source.lines} prefix="s02"/><ProbabilityExplorer43/></>}
    {index === 3 && <><Lines43 lines={source.lines} prefix="s03"/><BuilderLab43/></>}
    {index === 4 && <><Lines43 lines={source.lines} prefix="s04"/><TransformMay43/></>}
    {index === 5 && <><Lines43 lines={source.lines} prefix="s05"/><DialLab43/></>}
    {index === 6 && <><Lines43 lines={source.lines} prefix="s06"/><WillMayCompare43/></>}
    {index === 7 && <><Lines43 lines={source.lines} prefix="s07"/><MayBeComposer43/></>}
    {index === 8 && <><Lines43 lines={source.lines} prefix="s08"/><ModalFamily43Intro/></>}
    {index === 9 && <><Lines43 lines={source.lines} prefix="s09"/><ChoiceLab43 id="might-rule" kicker="RULE CHECK" title="قاعدة MIGHT الذهبية" tone="rule" items={MIGHT_RULE_ITEMS_43}/></>}
    {index === 10 && <><Lines43 lines={source.lines} prefix="s10"/><DialLab43/></>}
    {index === 11 && <><Lines43 lines={source.lines} prefix="s11"/><SwapLab43/></>}
    {index === 12 && <><Lines43 lines={source.lines} prefix="s12"/><TransformMay43/></>}
    {index === 13 && <><Lines43 lines={source.lines} prefix="s13"/><NegationLab43/></>}
    {index === 14 && <><Lines43 lines={source.lines} prefix="s14"/><MustNotCompare43/></>}
    {index === 15 && <><Lines43 lines={source.lines} prefix="s15"/><PermissionStudio43/></>}
    {index === 16 && <><Dialog43 lines={source.lines} prefix="s16" title="In the Principal's Office"/><ChoiceLab43 id="office" kicker="DIALOGUE ANALYSIS" title="تحليل حوار المكتب" tone="dialog" items={OFFICE_ITEMS_43}/></>}
    {index === 17 && <><Lines43 lines={source.lines} prefix="s17"/><ChoiceLab43 id="formality" kicker="FORMALITY" title="درجات اللباقة" tone="compare" items={FORMALITY_ITEMS_43}/></>}
    {index === 18 && <><Lines43 lines={source.lines} prefix="s18"/><MaybeLab43/></>}
    {index === 19 && <><Lines43 lines={source.lines} prefix="s19"/><MaybeLab43/><ChoiceLab43 id="maybe-compose" kicker="COMPOSE" title="ركّب MAYBE وMAY BE" tone="drill" items={MAYBE_COMPOSER_43}/></>}
    {index === 20 && <><Lines43 lines={source.lines} prefix="s20"/><PastPossibilityAnalyzer43/></>}
    {index === 21 && <><Lines43 lines={source.lines} prefix="s21"/><PastPossibilityAnalyzer43/><ChoiceLab43 id="past-pairs" kicker="PAST PAIRS" title="حاضر أم ماضٍ؟" tone="compare" items={PAST_PAIR_ITEMS_43}/></>}
    {index === 22 && <><Lines43 lines={source.lines} prefix="s22"/><ChoiceLab43 id="perfect" kicker="MAY HAVE vs PRESENT PERFECT" title="واقع أم احتمال؟" tone="compare" items={PERFECT_PAIR_ITEMS_43}/></>}
    {index === 23 && <><Lines43 lines={source.lines} prefix="s23"/><ChoiceLab43 id="past-neg" kicker="NEGATION IN THE PAST" title="النفي في احتمال الماضي" tone="drill" items={PAST_NEG_ITEMS_43}/></>}
    {index === 24 && <><Lines43 lines={source.lines} prefix="s24"/><FourModalMatrix43/></>}
    {index === 25 && <><Lines43 lines={source.lines} prefix="s25"/><DecisionGuide43/></>}
    {index === 26 && <ContextDetective43/>}
    {index === 27 && <PracticeSet43 section={27}/>}
    {index === 28 && <PracticeSet43 section={28}/>}
    {index === 29 && <PracticeSet43 section={29}/>}
    {index === 30 && <PracticeSet43 section={30}/>}
    {index === 31 && <ErrorRepair43/>}
    {index === 32 && <ReadingChallenge43/>}
    {index === 33 && <Panel43 kicker="INDEPENDENT ASSESSMENT" title="الاختبار النهائي — 25 سؤالًا في خمسة مستويات" tone="challenge">
      <Lines43 lines={source.lines} prefix="s33"/>
      <p>حاول حل الاختبار دون الرجوع إلى الشرح. يُفتح في منطقة مستقلة؛ لا تظهر الحلول قبل تسليم كل الإجابات.</p>
      <button className="primary43" type="button" onClick={onTest}>ابدأ الاختبار النهائي</button>
    </Panel43>}
    {index === 34 && <Panel43 kicker="TEACHER SPACE" title="مساحة المعلم — الحلول التفصيلية" tone="rule">
      <Lines43 lines={source.lines} prefix="s34"/>
      <p>يقول المصدر: «يُفضّل عدم عرض هذا القسم للطالب إلا بعد الانتهاء من الاختبار.» لذلك لا تُعرض المفاتيح هنا؛ تُفتح من بوابة المعلم أو بعد تسليم الاختبار.</p>
      <button type="button" className="primary43" onClick={onTeacher}>انتقل إلى بوابة المعلم</button>
    </Panel43>}
    {index === 35 && <WritingMission43/>}
    {index === 36 && <><SummaryCards43/><Lines43 lines={source.lines} prefix="s36"/></>}
    {index === 37 && <Roadmap43/>}
  </article>;
}
