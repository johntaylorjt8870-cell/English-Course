import { lazy, Suspense, useEffect, useState } from 'react';
import { Signature } from '../../shared/Signature';
import { SOURCE_SECTIONS_42, STATIONS_42, splitTitle42, LESSON_TITLE_42, LESSON_SUBTITLE_42, LESSON_STEP_COUNT_42, LESSON_IDENTITY_42 } from './data';
import { Workspace42, Text42 } from './kit42';
import { Steps42 } from './Steps42';
import { TestArea42 } from './TestArea42';
import { TeacherArea42 } from './TeacherArea42';
import { testComplete42, type TestAnswers42 } from './testData42';
import './lesson42.css';

const SolutionsArea42 = lazy(() => import('./SolutionsArea42'));
type Area42 = 'student' | 'test' | 'solutions' | 'teacher';
const LAST_STEP = LESSON_STEP_COUNT_42 - 1;

export default function Lesson42({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area42>('student');
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<TestAnswers42>({});
  const [submitted, setSubmitted] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const unlocked = submitted || teacher;
  const station = STATIONS_42.find(s => step >= s.start && step <= s.end)!;

  function navigate(index: number) {
    const next = Math.max(0, Math.min(LAST_STEP, index));
    setStep(next); setArea('student'); setMobileNav(false);
    setVisited(v => v.includes(next) ? v : [...v, next]);
  }
  useEffect(() => {
    if (!/jsdom/i.test(navigator.userAgent)) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('step-title-42')?.focus({ preventScroll: true });
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

  const labels: Record<Area42, string> = {
    student: 'التعلّم', test: 'الاختبار', solutions: unlocked ? 'الحلول' : 'الحلول · مقفلة', teacher: 'المعلم',
  };
  return <>
    <Signature/>
    <div className="lesson42" dir="rtl" data-lesson="42">
      <header className="masthead42">
        <div className="mastheadInner42">
          <a href="#/" onClick={() => onExit?.()} className="brand42">
            <span className="brandMark42" aria-hidden="true">42</span>
            <span dir="ltr">English Course<small>{LESSON_IDENTITY_42.toUpperCase()}</small></span>
          </a>
          <a href="#/lesson/41">الدرس السابق ←</a>
        </div>
      </header>
      <div className="lessonTop42">
        <div>
          <p className="eyebrow42">المستوى التأسيسي المتقدم / IQ200</p>
          <h1><Text42 text={LESSON_TITLE_42}/></h1>
          <p>{LESSON_SUBTITLE_42}</p>
        </div>
        <div className="lessonMetric42">
          <b>{visited.length}<span>/ {LESSON_STEP_COUNT_42}</span></b>
          <small>خطوات زرتها — لا تعني الإتقان</small>
          <progress aria-label="خطوات تمت زيارتها" max={LESSON_STEP_COUNT_42} value={visited.length}/>
        </div>
      </div>
      <nav className="areas42" aria-label="مناطق الدرس">
        {(['student', 'test', 'solutions', 'teacher'] as const).map((id, i) =>
          <button key={id} aria-current={area === id ? 'page' : undefined} disabled={id === 'solutions' && !unlocked} onClick={() => setArea(id)}>
            <span aria-hidden="true">0{i + 1}</span>{labels[id]}
          </button>)}
      </nav>
      <Workspace42.Provider value={{ values, set: (key, value) => setValues(v => ({ ...v, [key]: value })) }}>
        <div className={area === 'student' ? 'layout42' : 'areaLayout42'}>
          {area === 'student' && <aside className="sidebar42">
            <button className="mobileToggle42" aria-expanded={mobileNav} aria-controls="lesson42-step-nav" onClick={() => setMobileNav(!mobileNav)}>
              خريطة المختبر · الخطوة <bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_42}</bdi>
            </button>
            <div id="lesson42-step-nav" className={mobileNav ? 'navContent42 open' : 'navContent42'}>
              <p className="eyebrow42">محطات المختبر</p>
              <nav aria-label="محطات الدرس">
                {STATIONS_42.map((s, i) => <div className="station42" key={s.start}>
                  <button aria-pressed={s === station} onClick={() => navigate(s.start)}>
                    <span className="stationIndex42">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.name}<small dir="ltr">{s.en}</small></span>
                  </button>
                  {s === station && <nav aria-label={`أقسام ${s.name}`} className="sectionsNav42">
                    {SOURCE_SECTIONS_42.filter(sec => sec.num >= s.start && sec.num <= s.end).map(sec =>
                      <button key={sec.id} aria-current={sec.num === step ? 'step' : undefined} onClick={() => navigate(sec.num)}>
                        <bdi dir="ltr">{sec.num === 0 ? '◉' : sec.num}</bdi>{(()=>{const [en,ar]=splitTitle42(sec.title);return <>{en && <bdi dir="ltr" lang="en">{en}</bdi>}<Text42 text={ar}/></>;})()}
                      </button>)}
                  </nav>}
                </div>)}
              </nav>
              <p className="sidebarNote42">بدّل القناة. لاحظ السياق.<br/>← التالي · → السابق</p>
            </div>
          </aside>}
          <main id="lesson42-main">
            {area === 'student' ? <>
              <Steps42 index={step} onTest={() => setArea('test')} onTeacher={() => setArea('teacher')}/>
              <nav className="bottomNav42" aria-label="تنقل الخطوات">
                <button type="button" disabled={step === 0} onClick={() => navigate(step - 1)}>→ السابق</button>
                <span>{step + 1} / {LESSON_STEP_COUNT_42}</span>
                <button className="primary42" type="button" onClick={() => step === LAST_STEP ? setArea('test') : navigate(step + 1)}>{step === LAST_STEP ? 'ابدأ الاختبار' : 'التالي ←'}</button>
              </nav>
            </> : null}
            {area === 'test' && <TestArea42
              answers={answers}
              change={(id, value) => { if (!submitted) setAnswers(a => ({ ...a, [id]: value })); }}
              submitted={submitted}
              submit={() => { if (testComplete42(answers)) { setSubmitted(true); setArea('solutions'); } }}
              reset={() => { setAnswers({}); setSubmitted(false); setArea('test'); }}
              openSolutions={() => { if (unlocked) setArea('solutions'); }}/>}
            {area === 'solutions' && unlocked && <Suspense fallback={<p role="status">جارٍ تحميل الحلول…</p>}><SolutionsArea42 answers={answers}/></Suspense>}
            {area === 'teacher' && <TeacherArea42 unlocked={teacher} unlock={() => setTeacher(true)} lock={() => setTeacher(false)}/>}
            {area !== 'student' && <button className="back42" type="button" onClick={() => setArea('student')}>العودة إلى خطوات التعلّم</button>}
          </main>
        </div>
      </Workspace42.Provider>
      <footer className="footer42">
        <span dir="ltr">CAN · COULD</span>
        <p>لا تترجم CAN وCOULD آليًا؛ حدّد الوظيفة داخل الموقف.</p>
        <a href="#/" onClick={() => onExit?.()}>كل الدروس</a>
      </footer>
    </div>
  </>;
}
