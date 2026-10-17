import { lazy, Suspense, useEffect, useState } from 'react';
import { Signature } from '../../shared/Signature';
import {
  SOURCE_SECTIONS_44, STATIONS_44, LESSON_TITLE_44, LESSON_SUBTITLE_44, LESSON_STEP_COUNT_44, LESSON_IDENTITY_44,
} from './data';
import { Workspace44, Text44, Glyph44 } from './kit44';
import { Steps44 } from './Steps44';
import { TestArea44 } from './TestArea44';
import { TeacherArea44 } from './TeacherArea44';
import { testComplete44, type TestAnswers44 } from './testData44';
import { station44 } from './ledger44';
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
  const station = station44(step);
  const chapterNo = STATIONS_44.indexOf(station) + 1;

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
  const areaName: Record<Area44, string> = {
    student: `الفصل ${String(chapterNo).padStart(2, '0')} · ${station.name}`,
    test: 'منطقة الاختبار · 25 سؤالًا',
    solutions: 'الحلول التفصيلية',
    teacher: 'مساحة المعلم',
  };
  const cover = area === 'student' && step === 0;

  return <>
    <Signature />
    <div className="lesson44" dir="rtl" data-lesson="44">
      <header className="bar44">
        <div className="barInner44">
          <a href="#/" onClick={() => onExit?.()} className="brand44" aria-label="English Course — العودة إلى كل الدروس">
            <span className="brandNum44" aria-hidden="true">44</span>
            <span className="brandText44">
              <span dir="ltr">English Course</span>
              <small>{LESSON_IDENTITY_44}</small>
            </span>
          </a>
          <nav className="areas44" aria-label="مناطق الدرس">
            {(['student', 'test', 'solutions', 'teacher'] as const).map((id, i) => (
              <button key={id} type="button" aria-current={area === id ? 'page' : undefined}
                disabled={id === 'solutions' && !unlocked} onClick={() => { setArea(id); setMobileNav(false); }}>
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                {labels[id]}
                {id === 'solutions' && !unlocked && <Glyph44 name="lock" className="tabLock44" />}
              </button>
            ))}
          </nav>
          <div className="barMeta44">
            <p className="barArea44">{areaName[area]}</p>
            {area === 'student' && (
              <p className="barProgress44">
                <span className="barBar44" aria-hidden="true"><span style={{ width: `${((step + 1) / LESSON_STEP_COUNT_44) * 100}%` }} /></span>
                <bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_44}</bdi>
              </p>
            )}
          </div>
        </div>
      </header>

      <Workspace44.Provider value={{ values, set: (key, value) => setValues(v => ({ ...v, [key]: value })) }}>
        {area === 'student' ? (
          <div className={cover ? 'layout44 layout44--cover' : 'layout44'}>
            {!cover && (
              <aside className="railCol44">
                <button type="button" className="mobileToggle44" aria-expanded={mobileNav} aria-controls="lesson44-step-nav"
                  onClick={() => setMobileNav(!mobileNav)}>
                  <span>الفصول · الخطوة <bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_44}</bdi></span>
                  <Glyph44 name="rule" />
                </button>
                <div id="lesson44-step-nav" className={mobileNav ? 'rail44 navContent44 open' : 'rail44 navContent44'}>
                  <div className="railHead44">
                    <p className="kicker44">الفصول · CHAPTERS</p>
                    <p className="railProgress44"><bdi dir="ltr">{visited.length} / {LESSON_STEP_COUNT_44}</bdi> خطوة زُرتها</p>
                  </div>
                  <nav className="railNav44" aria-label="فصول الدرس">
                    {STATIONS_44.map((s, i) => {
                      const active = s === station;
                      return (
                        <div className={`chapter44 ${active ? 'is-active' : ''}`} key={s.start}>
                          <button type="button" className="chapterBtn44" aria-current={active ? 'true' : undefined}
                            data-chapter-start={s.start} data-chapter-end={s.end}
                            onClick={() => navigate(s.start)}>
                            <span className="chapterNo44" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                            <span className="chapterName44"><b>{s.name}</b><small dir="ltr">{s.en}</small></span>
                            <span className="chapterCount44" aria-hidden="true">{s.end - s.start + 1}</span>
                          </button>
                          {active && (
                            <ol className="sectionNav44">
                              {SOURCE_SECTIONS_44.filter(sec => sec.num >= s.start && sec.num <= s.end).map(sec => (
                                <li key={sec.id}>
                                  <button type="button" aria-current={sec.num === step ? 'step' : undefined} data-step={sec.num}
                                    onClick={() => navigate(sec.num)}>
                                    <span dir="ltr" className="sectionLabel44">
                                      <bdi className="sectionNo44" aria-hidden="true">{sec.num}</bdi>
                                      <Text44 text={sec.title} />
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ol>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                  <p className="railNote44">← التالي · → السابق</p>
                </div>
              </aside>
            )}
            <main id="lesson44-main" className={cover ? 'stage44 stage44--cover' : 'stage44'}>
              <Steps44 index={step} onTest={() => setArea('test')} onTeacher={() => setArea('teacher')} onNavigate={navigate} />
              <nav className="stepNav44" aria-label="تنقل الخطوات">
                <button type="button" className="btn44 btn44--ghost" disabled={step === 0} onClick={() => navigate(step - 1)}>
                  <Glyph44 name="arrow" className="flip44" /> السابق
                </button>
                <span className="stepNavMeta44">
                  <bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_44}</bdi>
                  <small>{station.name}</small>
                </span>
                <button type="button" className="btn44 btn44--solid"
                  onClick={() => step === LAST_STEP ? setArea('test') : navigate(step + 1)}>
                  {step === LAST_STEP ? 'ابدأ الاختبار' : 'التالي'} <Glyph44 name="arrow" />
                </button>
              </nav>
            </main>
          </div>
        ) : (
          <main className="area44">
            {area === 'test' && <TestArea44
              answers={answers}
              change={(id, value) => { if (!submitted) setAnswers(a => ({ ...a, [id]: value })); }}
              submitted={submitted}
              submit={() => { if (testComplete44(answers)) { setSubmitted(true); setArea('solutions'); } }}
              reset={() => { setAnswers({}); setSubmitted(false); setArea('test'); }}
              openSolutions={() => { if (unlocked) setArea('solutions'); }} />}
            {area === 'solutions' && unlocked && (
              <Suspense fallback={<p role="status" className="areaLoading44">جارٍ تحميل الحلول…</p>}>
                <SolutionsArea44 answers={answers} />
              </Suspense>
            )}
            {area === 'teacher' && <TeacherArea44 unlocked={teacher} unlock={() => setTeacher(true)} lock={() => setTeacher(false)} />}
            <button className="back44" type="button" onClick={() => setArea('student')}>
              <Glyph44 name="arrow" /> العودة إلى خطوات التعلّم
            </button>
          </main>
        )}
      </Workspace44.Provider>

      <footer className="footer44">
        <div className="footerBrand44">
          <span dir="ltr" className="footerTitle44">{LESSON_TITLE_44}</span>
          <p>{LESSON_SUBTITLE_44}</p>
        </div>
        <p className="footerNote44">القاعدة التي لا تُنسى: <b>MUSTN'T</b> منع ≠ <b>DON'T HAVE TO</b> عدم ضرورة.</p>
        <nav className="footerLinks44" aria-label="روابط الدرس">
          <a href="#/lesson/43">الدرس السابق · 43</a>
          <a href="#/" onClick={() => onExit?.()}>كل الدروس</a>
        </nav>
      </footer>
    </div>
  </>;
}
