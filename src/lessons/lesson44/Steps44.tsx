import { Lines44, Panel44, Text44 } from './kit44';
import { section44, splitTitle44 } from './ledger44';
import {
  GrammarDetective44, PracticeSet44, ReadingChallenge44, Roadmap44,
  SummaryCards44, WritingMission44,
} from './labs44';
import { ChoiceLab44, Dialog44, GoalList44, ObligationBuilder44, ProhibitionSorter44, TenseMachine44, type Choice44 } from './tools44';

// Step-local practice banks
const MUST_RULE_ITEMS: Choice44[] = [
  { prompt: 'أي الجمل صحيحة؟', options: ['She musts study.', 'She must study.', 'She must to study.'], answer: 'She must study.', why: 'MUST ثابتة والفعل V1 مباشرة — بدون s أو to.' },
  { prompt: 'أكمل: We ______ protect the environment.', options: ['must', 'musts', 'must to'], answer: 'must', why: 'MUST لا تتغير مع الفاعل — نستخدم must مع كل الضمائر.' },
  { prompt: 'أكمل: He ______ finish the report.', options: ['must', 'musts', 'must to'], answer: 'must', why: 'He لا يضيف s إلى MUST.' },
];
const HAS_TO_ITEMS: Choice44[] = [
  { prompt: 'أكمل: She ______ study tonight.', options: ['have to', 'has to', 'musts'], answer: 'has to', why: 'الفاعل She مفرد غائب → has to.' },
  { prompt: 'أكمل: They ______ wear uniforms.', options: ['has to', 'have to', 'musts'], answer: 'have to', why: 'They جمع → have to.' },
  { prompt: 'أي جملة خاطئة؟', options: ['She has to leave.', 'She have to leave.', 'She must leave.'], answer: 'She have to leave.', why: 'المفرد الغائب يأخذ has to — لا have to.' },
];
const MUSTNT_ITEMS: Choice44[] = [
  { prompt: 'You mustn\'t smoke here. ماذا تعني؟', options: ['ليس ضروريًا', 'يُمنع التدخين هنا', 'يمكنك التدخين'], answer: 'يُمنع التدخين هنا', why: "MUSTN'T = المنع. الفعل محظور تمامًا." },
  { prompt: "You don't have to come early. ماذا تعني؟", options: ['ممنوع الحضور مبكرًا', 'ليس عليك الحضور مبكرًا', 'يجب الحضور مبكرًا'], answer: 'ليس عليك الحضور مبكرًا', why: "DON'T HAVE TO = عدم الضرورة. لست ملزمًا — وقد تفعله إن أردت." },
  { prompt: 'أي جملة تعني المنع؟', options: ["You don't have to enter.", "You mustn't enter."], answer: "You mustn't enter.", why: "MUSTN'T = منع. DON'T HAVE TO = عدم ضرورة." },
];
const PAST_ITEMS: Choice44[] = [
  { prompt: 'I ______ wake up early yesterday.', options: ['musted', 'had to', 'must'], answer: 'had to', why: 'لا نستخدم musted. الماضي: HAD TO + V1.' },
  { prompt: "She ______ finish the project last night.", options: ['had to', 'has to', 'musts'], answer: 'had to', why: 'last night = الماضي → had to.' },
  { prompt: "Did you ______ study last night?", options: ['had to', 'have to', 'has to'], answer: 'have to', why: 'بعد Did نستخدم have — لا had.' },
];
const FUTURE_ITEMS: Choice44[] = [
  { prompt: 'She ______ leave early tomorrow.', options: ['will has to', 'will have to', 'will musts'], answer: 'will have to', why: 'بعد will نستخدم have — لا has.' },
  { prompt: "We ______ buy new equipment. (المستقبل + النفي)", options: ["won't have to", "don't have to", "didn't have to"], answer: "won't have to", why: "نفي المستقبل: won't + have to." },
];

// Cover
function Cover44() {
  const lines = section44(0).lines;
  return <section className="cover44">
    <div className="coverMain44">
      <p className="eyebrow44" dir="ltr">OBLIGATION LAB / LESSON 44</p>
      <h2 dir="ltr">MUST &amp; HAVE TO<br/><em>The Language of Necessity &amp; Obligation</em></h2>
      <Lines44 lines={[lines[1]]}/>
      <div className="coverSignals44" dir="ltr">
        <span className="coverSignal44 must-sig">MUST<small>STRONG NECESSITY</small></span>
        <span className="coverSignal44 haveto-sig">HAVE TO<small>EXTERNAL REQUIREMENT</small></span>
      </div>
      <p className="coverCaption44">ما الذي يجب علينا فعله؟ ولماذا يجب علينا فعله؟</p>
    </div>
    <div className="coverContext44">
      <p className="eyebrow44">من المصدر</p>
      <Lines44 lines={lines.slice(2)} prefix="s0-cover"/>
    </div>
  </section>;
}

// The 39 steps
export function Steps44({ index, onTest, onTeacher }: { index: number; onTest: () => void; onTeacher: () => void }) {
  const source = section44(index);
  const [enTitle, arTitle] = splitTitle44(source.title);
  return <article data-source-section={source.id} className="step44">
    {index === 0 ? <Cover44/> : <header className="stepHeading44">
      <span className="sectionNumber44" aria-hidden="true">{String(index).padStart(2, '0')}</span>
      <div><p className="eyebrow44">مختبر الضرورة / القسم {index}</p>{enTitle && <p className="eyebrow44" dir="ltr" lang="en">{enTitle}</p>}<h2 tabIndex={-1} id="step-title-44"><Text44 text={arTitle}/></h2></div>
    </header>}
    {index === 1 && <GoalList44 lines={source.lines}/>}
    {index === 2 && <><Lines44 lines={source.lines} prefix="s02"/><ObligationBuilder44/></>}
    {index === 3 && <><Lines44 lines={source.lines} prefix="s03"/><ChoiceLab44 id="must-rule" kicker="RULE CHECK" title="قاعدة MUST الذهبية" tone="rule" items={MUST_RULE_ITEMS}/></>}
    {index === 4 && <Lines44 lines={source.lines} prefix="s04"/>}
    {index === 5 && <Lines44 lines={source.lines} prefix="s05"/>}
    {index === 6 && <Lines44 lines={source.lines} prefix="s06"/>}
    {index === 7 && <><Lines44 lines={source.lines} prefix="s07"/><ChoiceLab44 id="hasto-rule" kicker="HAVE TO CHECK" title="قاعدة HAVE TO" tone="rule" items={HAS_TO_ITEMS}/></>}
    {index === 8 && <Lines44 lines={source.lines} prefix="s08"/>}
    {index === 9 && <Lines44 lines={source.lines} prefix="s09"/>}
    {index === 10 && <Lines44 lines={source.lines} prefix="s10"/>}
    {index === 11 && <Lines44 lines={source.lines} prefix="s11"/>}
    {index === 12 && <Dialog44 lines={source.lines} prefix="s12" title="Preparing for the Exam"/>}
    {index === 13 && <><Lines44 lines={source.lines} prefix="s13"/><ProhibitionSorter44/></>}
    {index === 14 && <><Lines44 lines={source.lines} prefix="s14"/><ChoiceLab44 id="mustnt-check" kicker="PROHIBITION" title="MUSTN'T — المنع" tone="prohibit" items={MUSTNT_ITEMS}/></>}
    {index === 15 && <Lines44 lines={source.lines} prefix="s15"/>}
    {index === 16 && <Lines44 lines={source.lines} prefix="s16"/>}
    {index === 17 && <Lines44 lines={source.lines} prefix="s17"/>}
    {index === 18 && <Lines44 lines={source.lines} prefix="s18"/>}
    {index === 19 && <Lines44 lines={source.lines} prefix="s19"/>}
    {index === 20 && <><Lines44 lines={source.lines} prefix="s20"/><TenseMachine44/><ChoiceLab44 id="past-check" kicker="PAST CHECK" title="الضرورة في الماضي" tone="drill" items={PAST_ITEMS}/></>}
    {index === 21 && <Lines44 lines={source.lines} prefix="s21"/>}
    {index === 22 && <Lines44 lines={source.lines} prefix="s22"/>}
    {index === 23 && <><Lines44 lines={source.lines} prefix="s23"/><ChoiceLab44 id="future-check" kicker="FUTURE CHECK" title="الضرورة في المستقبل" tone="drill" items={FUTURE_ITEMS}/></>}
    {index === 24 && <Lines44 lines={source.lines} prefix="s24"/>}
    {index === 25 && <Lines44 lines={source.lines} prefix="s25"/>}
    {index === 26 && <Dialog44 lines={source.lines} prefix="s26" title="A School Science Competition"/>}
    {index === 27 && <GrammarDetective44/>}
    {index === 28 && <PracticeSet44 section={28}/>}
    {index === 29 && <PracticeSet44 section={29}/>}
    {index === 30 && <PracticeSet44 section={30}/>}
    {index === 31 && <PracticeSet44 section={31}/>}
    {index === 32 && <PracticeSet44 section={32}/>}
    {index === 33 && <ReadingChallenge44/>}
    {index === 34 && <Panel44 kicker="INDEPENDENT ASSESSMENT" title="الاختبار النهائي — 25 سؤالًا في خمسة مستويات" tone="challenge">
      <Lines44 lines={source.lines} prefix="s34"/>
      <p>حاول حل الاختبار دون الرجوع إلى الشرح. يُفتح في منطقة مستقلة؛ لا تظهر الحلول قبل تسليم كل الإجابات.</p>
      <button className="primary44" type="button" onClick={onTest}>ابدأ الاختبار النهائي</button>
    </Panel44>}
    {index === 35 && <Panel44 kicker="TEACHER SPACE" title="مساحة المعلم — الحلول التفصيلية" tone="rule">
      <Lines44 lines={source.lines} prefix="s35"/>
      <p>يقول المصدر: «هذا القسم مخصص للتصحيح بعد انتهاء الطالب من الاختبار.» لا تُعرض المفاتيح هنا؛ تُفتح من بوابة المعلم أو بعد تسليم الاختبار.</p>
      <button type="button" className="primary44" onClick={onTeacher}>انتقل إلى بوابة المعلم</button>
    </Panel44>}
    {index === 36 && <WritingMission44/>}
    {index === 37 && <><SummaryCards44/><Lines44 lines={source.lines} prefix="s37"/></>}
    {index === 38 && <Roadmap44/>}
  </article>;
}
