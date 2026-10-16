import { lazy, Suspense, useEffect, useState } from 'react';
import { Signature } from '../../shared/Signature';
import { SOURCE_SECTIONS_44, STATIONS_44, LESSON_TITLE_44, LESSON_SUBTITLE_44, LESSON_STEP_COUNT_44, LESSON_IDENTITY_44 } from './data';
import { Workspace44, Text44 } from './kit44';
import { Steps44 } from './Steps44';
import { TestArea44 } from './TestArea44';
import { TeacherArea44 } from './TeacherArea44';
import { testComplete44, type TestAnswers44 } from './testData44';
import './lesson44.css';

const SolutionsArea44 = lazy(() => import('./SolutionsArea44'));
type Area44 = 'student' | 'test' | 'solutions' | 'teacher';
const LAST_STEP = LESSON_STEP_COUNT_44 - 1;

export default function Lesson44({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area44>('student');
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<TestAnswers44>({});
  const [submitted, setSubmitted] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const unlocked = submitted || teacher;
  const station = STATIONS_44.find(s => step >= s.start && step <= s.end)!;

  function navigate(index: number) {
    const next = Math.max(0, Math.min(LAST_STEP, index));
    setStep(next); setArea('student'); setMobileNav(false);
    setVisited(v => v.includes(next) ? v : [...v, next]);
  }
  useEffect(() => {
    if (!/jsdom/i.test(navigator.userAgent)) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('step-title-44')?.focus({ preventScroll: true });
    }
  }, [step, area]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (area !== 'student' || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
      if ((event.target as HTMLElement)?.closest('input,textarea,select,button,a,[contenteditable]')) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(step + 1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); navigate(step - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [area, step]);

  const labels: Record<Area44, string> = {
    student: 'التعلّم', test: 'الاختبار', solutions: unlocked ? 'الحلول' : 'الحلول · مقفلة', teacher: 'المعلم',
  };
  return <>
    <Signature/>
    <div className="lesson44" dir="rtl" data-lesson="44">
      <header className="masthead44">
        <div className="mastheadInner44">
          <a href="#/" onClick={() => onExit?.()} className="brand44">
            <span className="brandMark44" aria-hidden="true">44</span>
            <span dir="ltr">English Course<small>{LESSON_IDENTITY_44.toUpperCase()}</small></span>
          </a>
          <a href="#/lesson/43">الدرس السابق ←</a>
        </div>
      </header>
      <div className="lessonTop44">
        <div>
          <p className="eyebrow44">الضرورة والإلزام والقواعد والمسؤوليات / IQ200</p>
          <h1><Text44 text={LESSON_TITLE_44}/></h1>
          <p>{LESSON_SUBTITLE_44}</p>
        </div>
        <div className="lessonMetric44">
          <b>{visited.length}<span>/ {LESSON_STEP_COUNT_44}</span></b>
          <small>خطوات زرتها — لا تعني الإتقان</small>
          <progress aria-label="خطوات تمت زيارتها" max={LESSON_STEP_COUNT_44} value={visited.length}/>
        </div>
      </div>
      <nav className="areas44" aria-label="مناطق الدرس">
        {(['student', 'test', 'solutions', 'teacher'] as const).map((id, i) =>
          <button key={id} aria-current={area === id ? 'page' : undefined} disabled={id === 'solutions' && !unlocked} onClick={() => setArea(id)}>
            <span aria-hidden="true">0{i + 1}</span>{labels[id]}
          </button>)}
      </nav>
      <Workspace44.Provider value={{ values, set: (key, value) => setValues(v => ({ ...v, [key]: value })) }}>
        <div className={area === 'student' ? 'layout44' : 'areaLayout44'}>
          {area === 'student' && <aside className="sidebar44">
            <button className="mobileToggle44" aria-expanded={mobileNav} aria-controls="lesson44-step-nav" onClick={() => setMobileNav(!mobileNav)}>
              خريطة المختبر · الخطوة <bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_44}</bdi>
            </button>
            <div id="lesson44-step-nav" className={mobileNav ? 'navContent44 open' : 'navContent44'}>
              <p className="eyebrow44">محطات المختبر</p>
              <nav aria-label="محطات الدرس">
                {STATIONS_44.map((s, i) => <div className="station44" key={s.start}>
                  <button aria-pressed={s === station} onClick={() => navigate(s.start)}>
                    <span className="stationIndex44">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.name}<small dir="ltr">{s.en}</small></span>
                  </button>
                  {s === station && <nav aria-label={`أقسام ${s.name}`} className="sectionsNav44">
                    {SOURCE_SECTIONS_44.filter(sec => sec.num >= s.start && sec.num <= s.end).map(sec =>
                      <button key={sec.id} aria-current={sec.num === step ? 'step' : undefined} onClick={() => navigate(sec.num)}>
                        <span dir="ltr" className="ltr-pair navLabel44"><bdi dir="ltr">{sec.num === 0 ? '◉' : sec.num}</bdi><Text44 text={sec.title}/></span>
                      </button>)}
                  </nav>}
                </div>)}
              </nav>
              <p className="sidebarNote44">ما الذي يجب علينا فعله؟<br/>← التالي · → السابق</p>
            </div>
          </aside>}
          <main id="lesson44-main">
            {area === 'student' ? <>
              <Steps44 index={step} onTest={() => setArea('test')} onTeacher={() => setArea('teacher')}/>
              <nav className="bottomNav44" aria-label="تنقل الخطوات">
                <button type="button" disabled={step === 0} onClick={() => navigate(step - 1)}>→ السابق</button>
                <span>{step + 1} / {LESSON_STEP_COUNT_44}</span>
                <button className="primary44" type="button" onClick={() => step === LAST_STEP ? setArea('test') : navigate(step + 1)}>{step === LAST_STEP ? 'ابدأ الاختبار' : 'التالي ←'}</button>
              </nav>
            </> : null}
            {area === 'test' && <TestArea44
              answers={answers}
              change={(id, value) => { if (!submitted) setAnswers(a => ({ ...a, [id]: value })); }}
              submitted={submitted}
              submit={() => { if (testComplete44(answers)) { setSubmitted(true); setArea('solutions'); } }}
              reset={() => { setAnswers({}); setSubmitted(false); setArea('test'); }}
              openSolutions={() => { if (unlocked) setArea('solutions'); }}/>}
            {area === 'solutions' && unlocked && <Suspense fallback={<p role="status">جارٍ تحميل الحلول…</p>}><SolutionsArea44 answers={answers}/></Suspense>}
            {area === 'teacher' && <TeacherArea44 unlocked={teacher} unlock={() => setTeacher(true)} lock={() => setTeacher(false)}/>}
            {area !== 'student' && <button className="back44" type="button" onClick={() => setArea('student')}>العودة إلى خطوات التعلّم</button>}
          </main>
        </div>
      </Workspace44.Provider>
      <footer className="footer44">
        <span dir="ltr">MUST · HAVE TO</span>
        <p>لا تترجم MUSTN'T وDON'T HAVE TO على أنهما متشابهتان؛ الأول منع والثاني عدم ضرورة.</p>
        <a href="#/" onClick={() => onExit?.()}>كل الدروس</a>
      </footer>
    </div>
  </>;
}
