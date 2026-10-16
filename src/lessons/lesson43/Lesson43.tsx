import { lazy, Suspense, useEffect, useState } from 'react';
import { Signature } from '../../shared/Signature';
import { SOURCE_SECTIONS_43, STATIONS_43, LESSON_TITLE_43, LESSON_SUBTITLE_43, LESSON_STEP_COUNT_43, LESSON_IDENTITY_43 } from './data';
import { Workspace43, Text43 } from './kit43';
import { Steps43 } from './Steps43';
import { TestArea43 } from './TestArea43';
import { TeacherArea43 } from './TeacherArea43';
import { testComplete43, type TestAnswers43 } from './testData43';
import './lesson43.css';

const SolutionsArea43 = lazy(() => import('./SolutionsArea43'));
type Area43 = 'student' | 'test' | 'solutions' | 'teacher';
const LAST_STEP = LESSON_STEP_COUNT_43 - 1;

export default function Lesson43({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area43>('student');
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<TestAnswers43>({});
  const [submitted, setSubmitted] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const unlocked = submitted || teacher;
  const station = STATIONS_43.find(s => step >= s.start && step <= s.end)!;

  function navigate(index: number) {
    const next = Math.max(0, Math.min(LAST_STEP, index));
    setStep(next); setArea('student'); setMobileNav(false);
    setVisited(v => v.includes(next) ? v : [...v, next]);
  }
  useEffect(() => {
    if (!/jsdom/i.test(navigator.userAgent)) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('step-title-43')?.focus({ preventScroll: true });
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

  const labels: Record<Area43, string> = {
    student: 'التعلّم', test: 'الاختبار', solutions: unlocked ? 'الحلول' : 'الحلول · مقفلة', teacher: 'المعلم',
  };
  return <>
    <Signature/>
    <div className="lesson43" dir="rtl" data-lesson="43">
      <header className="masthead43">
        <div className="mastheadInner43">
          <a href="#/" onClick={() => onExit?.()} className="brand43">
            <span className="brandMark43" aria-hidden="true">43</span>
            <span dir="ltr">English Course<small>{LESSON_IDENTITY_43.toUpperCase()}</small></span>
          </a>
          <a href="#/lesson/42">الدرس السابق ←</a>
        </div>
      </header>
      <div className="lessonTop43">
        <div>
          <p className="eyebrow43">الاحتمال وعدم اليقين والاستئذان / IQ200</p>
          <h1><Text43 text={LESSON_TITLE_43}/></h1>
          <p>{LESSON_SUBTITLE_43}</p>
        </div>
        <div className="lessonMetric43">
          <b>{visited.length}<span>/ {LESSON_STEP_COUNT_43}</span></b>
          <small>خطوات زرتها — لا تعني الإتقان</small>
          <progress aria-label="خطوات تمت زيارتها" max={LESSON_STEP_COUNT_43} value={visited.length}/>
        </div>
      </div>
      <nav className="areas43" aria-label="مناطق الدرس">
        {(['student', 'test', 'solutions', 'teacher'] as const).map((id, i) =>
          <button key={id} aria-current={area === id ? 'page' : undefined} disabled={id === 'solutions' && !unlocked} onClick={() => setArea(id)}>
            <span aria-hidden="true">0{i + 1}</span>{labels[id]}
          </button>)}
      </nav>
      <Workspace43.Provider value={{ values, set: (key, value) => setValues(v => ({ ...v, [key]: value })) }}>
        <div className={area === 'student' ? 'layout43' : 'areaLayout43'}>
          {area === 'student' && <aside className="sidebar43">
            <button className="mobileToggle43" aria-expanded={mobileNav} aria-controls="lesson43-step-nav" onClick={() => setMobileNav(!mobileNav)}>
              خريطة المرصد · الخطوة <bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_43}</bdi>
            </button>
            <div id="lesson43-step-nav" className={mobileNav ? 'navContent43 open' : 'navContent43'}>
              <p className="eyebrow43">محطات المرصد</p>
              <nav aria-label="محطات الدرس">
                {STATIONS_43.map((s, i) => <div className="station43" key={s.start}>
                  <button aria-pressed={s === station} onClick={() => navigate(s.start)}>
                    <span className="stationIndex43">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.name}<small dir="ltr">{s.en}</small></span>
                  </button>
                  {s === station && <nav aria-label={`أقسام ${s.name}`} className="sectionsNav43">
                    {SOURCE_SECTIONS_43.filter(sec => sec.num >= s.start && sec.num <= s.end).map(sec =>
                      <button key={sec.id} aria-current={sec.num === step ? 'step' : undefined} onClick={() => navigate(sec.num)}>
                        <span dir="ltr" className="ltr-pair navLabel43"><bdi dir="ltr">{sec.num === 0 ? '◉' : sec.num}</bdi><Text43 text={sec.title}/></span>
                      </button>)}
                  </nav>}
                </div>)}
              </nav>
              <p className="sidebarNote43">بدّل القناة. لاحظ السياق.<br/>← التالي · → السابق</p>
            </div>
          </aside>}
          <main id="lesson43-main">
            {area === 'student' ? <>
              <Steps43 index={step} onTest={() => setArea('test')} onTeacher={() => setArea('teacher')}/>
              <nav className="bottomNav43" aria-label="تنقل الخطوات">
                <button type="button" disabled={step === 0} onClick={() => navigate(step - 1)}>→ السابق</button>
                <span>{step + 1} / {LESSON_STEP_COUNT_43}</span>
                <button className="primary43" type="button" onClick={() => step === LAST_STEP ? setArea('test') : navigate(step + 1)}>{step === LAST_STEP ? 'ابدأ الاختبار' : 'التالي ←'}</button>
              </nav>
            </> : null}
            {area === 'test' && <TestArea43
              answers={answers}
              change={(id, value) => { if (!submitted) setAnswers(a => ({ ...a, [id]: value })); }}
              submitted={submitted}
              submit={() => { if (testComplete43(answers)) { setSubmitted(true); setArea('solutions'); } }}
              reset={() => { setAnswers({}); setSubmitted(false); setArea('test'); }}
              openSolutions={() => { if (unlocked) setArea('solutions'); }}/>}
            {area === 'solutions' && unlocked && <Suspense fallback={<p role="status">جارٍ تحميل الحلول…</p>}><SolutionsArea43 answers={answers}/></Suspense>}
            {area === 'teacher' && <TeacherArea43 unlocked={teacher} unlock={() => setTeacher(true)} lock={() => setTeacher(false)}/>}
            {area !== 'student' && <button className="back43" type="button" onClick={() => setArea('student')}>العودة إلى خطوات التعلّم</button>}
          </main>
        </div>
      </Workspace43.Provider>
      <footer className="footer43">
        <span dir="ltr">MAY · MIGHT</span>
        <p>لا تترجم MAY وMIGHT آليًا؛ حدّد الوظيفة داخل الموقف.</p>
        <a href="#/" onClick={() => onExit?.()}>كل الدروس</a>
      </footer>
    </div>
  </>;
}
