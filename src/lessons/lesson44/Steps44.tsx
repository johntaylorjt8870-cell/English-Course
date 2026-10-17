import type { ReactNode } from 'react';
import { Article44, En44, Glyph44, Label44, Plate44, Text44, Title44 } from './kit44';
import { STATIONS_44, section44, splitTitle44, station44, unitId44 } from './ledger44';
import { LESSON_STEP_COUNT_44, LESSON_TITLE_44 } from './data';
import {
  DetectiveSourceKey44, GrammarDetective44, PracticeSet44, ReadingChallenge44, Roadmap44, WritingMission44,
} from './labs44';
import { ChoiceLab44, Dialog44, GoalList44, ObligationBuilder44, ProhibitionSorter44, TenseMachine44, type Choice44 } from './tools44';
import { TEST_LEVELS_44 } from './testData44';

// Step-local practice banks (§2–§23). Platform-authored checks around source content.
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
  { prompt: "You mustn't smoke here. ماذا تعني؟", options: ['ليس ضروريًا', 'يُمنع التدخين هنا', 'يمكنك التدخين'], answer: 'يُمنع التدخين هنا', why: "MUSTN'T = المنع. الفعل محظور تمامًا." },
  { prompt: "You don't have to come early. ماذا تعني؟", options: ['ممنوع الحضور مبكرًا', 'ليس عليك الحضور مبكرًا', 'يجب الحضور مبكرًا'], answer: 'ليس عليك الحضور مبكرًا', why: "DON'T HAVE TO = عدم الضرورة. لست ملزمًا — وقد تفعله إن أردت." },
  { prompt: 'أي جملة تعني المنع؟', options: ["You don't have to enter.", "You mustn't enter."], answer: "You mustn't enter.", why: "MUSTN'T = منع. DON'T HAVE TO = عدم ضرورة." },
];
const PAST_ITEMS: Choice44[] = [
  { prompt: 'I ______ wake up early yesterday.', options: ['musted', 'had to', 'must'], answer: 'had to', why: 'لا نستخدم musted. الماضي: HAD TO + V1.' },
  { prompt: 'She ______ finish the project last night.', options: ['had to', 'has to', 'musts'], answer: 'had to', why: 'last night = الماضي → had to.' },
  { prompt: 'Did you ______ study last night?', options: ['had to', 'have to', 'has to'], answer: 'have to', why: 'بعد Did نستخدم have — لا had.' },
];
const FUTURE_ITEMS: Choice44[] = [
  { prompt: 'She ______ leave early tomorrow.', options: ['will has to', 'will have to', 'will musts'], answer: 'will have to', why: 'بعد will نستخدم have — لا has.' },
  { prompt: "We ______ buy new equipment. (المستقبل + النفي)", options: ["won't have to", "don't have to", "didn't have to"], answer: "won't have to", why: "نفي المستقبل: won't + have to." },
];

// ------------------------------------------------------------
// Cover — the editorial opening
// ------------------------------------------------------------
function Cover44({ onNavigate, onTest }: { onNavigate: (step: number) => void; onTest: () => void }) {
  const s = section44(0);
  return (
    <article className="cover44" data-source-section="cover">
      <div className="coverGrid44">
        <div className="coverText44">
          <p className="kicker44">LESSON 44 · IQ200 · ENGLISH LEARNING STUDIO</p>
          <h1 className="coverTitle44" dir="ltr">{LESSON_TITLE_44.split(' & ')[0]} <span className="amp44">&amp;</span> {LESSON_TITLE_44.split(' & ')[1]}</h1>
          <p className="coverAr44" data-source-unit={unitId44(0, 0)}><Text44 text={s.lines[0]} /></p>
          <p className="coverDek44" data-source-unit={unitId44(0, 1)} dir="ltr" lang="en">
            {s.lines[1].replace(/[⚖️🚀]/gu, '').trim()}
          </p>
          <p className="coverMeta44" data-source-unit={unitId44(0, 2)}><Text44 text={s.lines[2]} /></p>
          <div className="coverActions44">
            <button type="button" className="btn44 btn44--solid" onClick={() => onNavigate(1)}>ابدأ الدرس <Glyph44 name="arrow" /></button>
            <button type="button" className="btn44 btn44--ghost" onClick={onTest}>إلى الاختبار النهائي</button>
          </div>
          <dl className="coverStats44">
            <div><dt>الخطوات</dt><dd><bdi dir="ltr">39</bdi></dd></div>
            <div><dt>الفصول</dt><dd><bdi dir="ltr">13</bdi></dd></div>
            <div><dt>أسئلة الاختبار</dt><dd><bdi dir="ltr">25</bdi></dd></div>
          </dl>
        </div>
        <aside className="coverIndex44" aria-label="فهرس فصول الدرس">
          <p className="kicker44">الفهرس · CHAPTERS</p>
          <ol>
            {STATIONS_44.map((station, i) => (
              <li key={station.start}>
                <span className="indexNo44" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="indexName44">{station.name}<small dir="ltr">{station.en}</small></span>
                <span className="indexRange44" aria-hidden="true"><bdi dir="ltr">{station.start}–{station.end}</bdi></span>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <div className="coverStory44">
        <p className="storyLead44" data-source-unit={unitId44(0, 3)}><Text44 text={s.lines[3]} /></p>
        <div className="voices44">
          {[[4, 5, 6], [7, 8, 9], [10, 11, 12]].map(([label, en, ar]) => (
            <figure className="voice44" key={label}>
              <figcaption data-source-unit={unitId44(0, label)}><Text44 text={s.lines[label]} /></figcaption>
              <blockquote data-source-unit={unitId44(0, en)}><En44 text={s.lines[en]} /></blockquote>
              <p data-source-unit={unitId44(0, ar)}><Text44 text={s.lines[ar]} /></p>
            </figure>
          ))}
        </div>
        <Article44 section={0} from={13} to={16} className="storyArticle44" />
        <div className="pivot44">
          <p className="pivotLead44" data-source-unit={unitId44(0, 16)}><Text44 text={s.lines[16]} /></p>
          <p className="pivotTitle44" data-source-unit={unitId44(0, 17)} dir="ltr" lang="en">{s.lines[17]}</p>
        </div>
        <Article44 section={0} from={18} to={21} className="storyArticle44" />
        <p className="pullQuote44" data-source-unit={unitId44(0, 21)}><Text44 text={s.lines[21]} /></p>
        <Article44 section={0} from={22} to={24} className="storyArticle44" />
        <div className="crux44">
          <p className="kicker44" dir="ltr">THE ONE CONTRAST · الفرق المحوري</p>
          <div className="cruxPair44">
            <div className="cruxPlate44 cruxPlate44--ban">
              <span className="cruxMark44"><Glyph44 name="ban" /></span>
              <span className="cruxTerm44" dir="ltr" lang="en">MUSTN'T</span>
              <span className="cruxGloss44">منع</span>
              <p className="cruxSentence44" data-source-unit={unitId44(0, 24)}><En44 text={s.lines[24]} /></p>
            </div>
            <div className="cruxPlate44 cruxPlate44--open">
              <span className="cruxMark44"><Glyph44 name="circle" /></span>
              <span className="cruxTerm44" dir="ltr" lang="en">DON'T HAVE TO</span>
              <span className="cruxGloss44">عدم ضرورة</span>
              <p className="cruxSentence44" data-source-unit={unitId44(0, 25)}><En44 text={s.lines[25]} /></p>
            </div>
          </div>
          <p className="cruxConclusion44" data-source-unit={unitId44(0, 26)}><Text44 text={s.lines[26]} /></p>
        </div>
      </div>
    </article>
  );
}

// ------------------------------------------------------------
// Step-local briefs
// ------------------------------------------------------------
function TestBrief44({ onTest }: { onTest: () => void }) {
  const s = section44(34);
  return (
    <Plate44 kicker="ASSESSMENT · الاختبار النهائي" title="خمسة مستويات · 25 سؤالًا">
      <Article44 section={34} from={0} to={2} />
      <ol className="levelList44">
        {TEST_LEVELS_44.map(level => (
          <li key={level.level}>
            <span className="levelNo44" aria-hidden="true">{String(level.level).padStart(2, '0')}</span>
            <span className="levelName44"><Label44 text={level.title} /></span>
            <span className="levelCount44"><bdi dir="ltr">{level.questions.length}</bdi> أسئلة</span>
          </li>
        ))}
      </ol>
      <p className="briefNote44">تعرض منطقة الاختبار النص الكامل للأسئلة الخمسة والعشرين. تبقى المفاتيح مغلقة حتى تسلّم كل الإجابات. {s.lines.length} سطرًا من ورقة المصدر محفوظة هناك كما وردت.</p>
      <div className="taskActions44">
        <button type="button" className="btn44 btn44--solid" onClick={onTest}>ابدأ الاختبار النهائي <Glyph44 name="arrow" /></button>
        <span className="taskHint44">لا تصحيح آلي للأسئلة التفسيرية؛ المقارنة بالمعنى</span>
      </div>
    </Plate44>
  );
}

function TeacherBrief44({ onTeacher }: { onTeacher: () => void }) {
  const s = section44(35);
  return (
    <Plate44 kicker="TEACHER SPACE · مساحة المعلم" title="المفاتيح بعد الاختبار">
      <Article44 section={35} from={0} />
      <div className="taskActions44">
        <button type="button" className="btn44 btn44--solid" onClick={onTeacher}>انتقل إلى بوابة المعلم <Glyph44 name="lock" /></button>
        <span className="taskHint44">دليل التدريس والمفاتيح خلف رمز المعلم</span>
      </div>
      <p className="sr44">{s.lines.length} أسطر مصدر في هذا القسم.</p>
    </Plate44>
  );
}

// ------------------------------------------------------------
// Steps
// ------------------------------------------------------------
export function Steps44({ index, onTest, onTeacher, onNavigate }: {
  index: number; onTest: () => void; onTeacher: () => void; onNavigate: (step: number) => void;
}) {
  if (index === 0) return <Cover44 onNavigate={onNavigate} onTest={onTest} />;
  const source = section44(index);
  const [enTitle, arTitle] = splitTitle44(source.title);
  const station = station44(index);
  const chapterNo = STATIONS_44.indexOf(station) + 1;
  const englishTitle = enTitle || (
    index === 12 ? 'Preparing for the Exam'
      : index === 26 ? 'A School Science Competition'
        : index === 33 ? 'A Day at the Science Centre'
          : index === 36 ? 'Rules and Responsibilities'
            : index === 27 ? 'Grammar Detective'
              : ''
  );
  let body: ReactNode;
  switch (index) {
    case 1: body = <GoalList44 section={1} />; break;
    case 2: body = <><Article44 section={2} /><ObligationBuilder44 /></>; break;
    case 3: body = <><Article44 section={3} /><ChoiceLab44 id="must-rule" kicker="CHECK · تحقّق من القاعدة" title="MUST: الشكل الثابت" items={MUST_RULE_ITEMS} /></>; break;
    case 7: body = <><Article44 section={7} /><ChoiceLab44 id="hasto-rule" kicker="CHECK · تحقّق من القاعدة" title="HAVE TO / HAS TO" items={HAS_TO_ITEMS} /></>; break;
    case 12: body = <Dialog44 section={12} title="حوار تطبيقي" englishTitle="Preparing for the Exam" />; break;
    case 13: body = <><Article44 section={13} /><ProhibitionSorter44 /></>; break;
    case 14: body = <><Article44 section={14} /><ChoiceLab44 id="mustnt-check" kicker="CHECK · المنع" title="MUSTN'T — ماذا تعني؟" items={MUSTNT_ITEMS} /></>; break;
    case 20: body = <><Article44 section={20} /><TenseMachine44 /><ChoiceLab44 id="past-check" kicker="CHECK · الماضي" title="HAD TO في السياق" items={PAST_ITEMS} /></>; break;
    case 23: body = <><Article44 section={23} /><ChoiceLab44 id="future-check" kicker="CHECK · المستقبل" title="WILL HAVE TO في السياق" items={FUTURE_ITEMS} /></>; break;
    case 26: body = <Dialog44 section={26} title="الحوار الشامل" englishTitle="A School Science Competition" />; break;
    case 27: body = <><GrammarDetective44 /><DetectiveSourceKey44 /></>; break;
    case 28: body = <PracticeSet44 section={28} />; break;
    case 29: body = <PracticeSet44 section={29} />; break;
    case 30: body = <PracticeSet44 section={30} />; break;
    case 31: body = <PracticeSet44 section={31} />; break;
    case 32: body = <PracticeSet44 section={32} />; break;
    case 33: body = <ReadingChallenge44 />; break;
    case 34: body = <TestBrief44 onTest={onTest} />; break;
    case 35: body = <TeacherBrief44 onTeacher={onTeacher} />; break;
    case 36: body = <WritingMission44 />; break;
    case 38: body = <Roadmap44 />; break;
    default: body = <Article44 section={index} />;
  }
  return (
    <article data-source-section={source.id} className="step44" data-chapter={chapterNo}>
      <header className="stepHead44">
        <p className="kicker44">
          الفصل {String(chapterNo).padStart(2, '0')} · {station.name}
          <span className="stepCount44">الخطوة <bdi dir="ltr">{index + 1}</bdi> من <bdi dir="ltr">{LESSON_STEP_COUNT_44}</bdi></span>
        </p>
        <div className="stepTitleRow44">
          <span className="stepFolio44" aria-hidden="true"><bdi dir="ltr">{String(index).padStart(2, '0')}</bdi></span>
          <div className="stepTitleText44">
            {englishTitle && <p className="stepEn44" dir="ltr" lang="en">{englishTitle}</p>}
            <h2 id="step-title-44" tabIndex={-1}><Title44 text={arTitle} /></h2>
          </div>
        </div>
      </header>
      {body}
    </article>
  );
}
