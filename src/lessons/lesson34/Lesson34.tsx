// ============================================================
// Lesson34 — FUTURE LAUNCHPAD 🚀 منصّة الإطلاق
// غلاف نهاري ملوّن + مسار طيران + أربع مناطق + تنقل مشترك واحد.
//
// قواعد التصميم:
//   • الهوية الجديدة: Future Launchpad (بنفسجي/وردي/كهرماني) لا
//     تشبه هوية أي درس آخر، وليست إعادة تلوين قالب جاهز.
//   • كل الألوان الدلالية ثابتة: مثبت أخضر، منفي أحمر، سؤال أزرق،
//     توقع بنفسجي، وعد كهرماني، خطأ قرمزي.
//   • خريطة الرحلة في التدفق الطبيعي (sticky على الشاشات الكبيرة،
//     قابلة للفتح على الجوال) — لا عناصر fixed تتداخل مع التنقل.
//   • شريط LessonStepNav المشترك هو المكان الوحيد لزر قفل الموقع،
//     فيتداخل مع زر التالي أبدًا.
// ============================================================

import "./lesson34.css";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import LessonStepNav from "../../shared/LessonStepNav";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import {
  SECTIONS_34,
  SLIDES,
  SLIDE_COUNT_34,
  LAB_NAME_34,
  LAB_AR_34,
  LAB_MOTTO_34,
  LAB_PROMISE_34,
  PHASE_META_34,
} from "./data";
import Steps34 from "./Steps34";
import TestArea34, { Solutions34, useTestSession34 } from "./TestArea34";
import TeacherArea34 from "./TeacherArea34";
import { FOCUS34 } from "./kit34";

type Area34 = "lesson" | "test" | "solutions" | "teacher";

const AREA_META: Record<Area34, { icon: string; title: string; en: string; blurb: string }> = {
  lesson: {
    icon: "📖",
    title: "خطوات الدرس",
    en: "LAUNCH SEQUENCE",
    blurb: "40 محطة قصيرة: اقرأ بطاقة المعرفة، ثم نفّذ التفاعل في منصّة التطبيق، ثم انتقل.",
  },
  test: {
    icon: "🧪",
    title: "منطقة الاختبار",
    en: "MASTER TEST",
    blurb: "25 سؤالًا في خمسة مستويات. أجب عن الكل ثم أرسل مرة واحدة — لا تظهر أي إجابة قبل الإرسال.",
  },
  solutions: {
    icon: "🔑",
    title: "منطقة الحلول",
    en: "SOLUTION BAY",
    blurb: "مفتاح تصحيح تفصيلي لكل سؤال: الإجابة + السبب + البنية. يُفتح بعد إرسال الاختبار كاملًا.",
  },
  teacher: {
    icon: "👩‍🏫",
    title: "منطقة المعلم",
    en: "MISSION CONTROL",
    blurb: "تخطيط الحصة، ملاحظات التدريس، rubrics، الأخطاء الشائعة، و25 حلًا تفصيليًا محميًا بكلمة مرور.",
  },
};

/* حجم قراءة مريح على الحاسوب، ومقاسات لمس مريحة على الجوال. */
const STUDENT_CONTENT_34 =
  '[data-lesson="34"] main:is([data-area="l34-lesson"], [data-area="l34-test"], [data-area="l34-solutions"])';
const READABILITY_CSS_34 = `
  @media (min-width: 768px) {
    ${STUDENT_CONTENT_34} [class~="text-[13px]"],
    ${STUDENT_CONTENT_34} [class~="text-[14px]"] { font-size: 1rem; line-height: 1.8; }
    ${STUDENT_CONTENT_34} [class~="text-[12px]"] { font-size: 0.9375rem; line-height: 1.75; }
    ${STUDENT_CONTENT_34} [class~="text-[11px]"],
    ${STUDENT_CONTENT_34} [class~="text-xs"] { font-size: 0.875rem; line-height: 1.7; }
    ${STUDENT_CONTENT_34} [class~="text-[10px]"] { font-size: 0.78rem; line-height: 1.6; }
    ${STUDENT_CONTENT_34} [class~="text-[15px]"],
    ${STUDENT_CONTENT_34} [class~="text-sm"] { font-size: 1.0625rem; line-height: 1.8; }
  }

  @media (max-width: 767px) {
    ${STUDENT_CONTENT_34} [class~="text-[13px]"],
    ${STUDENT_CONTENT_34} [class~="text-[14px]"],
    ${STUDENT_CONTENT_34} [class~="text-[15px]"],
    ${STUDENT_CONTENT_34} [class~="text-sm"] { font-size: 1rem; }
    ${STUDENT_CONTENT_34} [class~="text-[12px]"] { font-size: 0.9375rem; }
    ${STUDENT_CONTENT_34} [class~="text-[11px]"],
    ${STUDENT_CONTENT_34} [class~="text-xs"] { font-size: 0.875rem; }
    ${STUDENT_CONTENT_34} [class~="text-[10px]"] { font-size: 0.78rem; }
  }

  ${STUDENT_CONTENT_34} :is(button, label, input, select, textarea)[class~="text-[11px]"],
  ${STUDENT_CONTENT_34} :is(button, label, input, select, textarea)[class~="text-[12px]"],
  ${STUDENT_CONTENT_34} :is(button, label, input, select, textarea)[class~="text-[13px]"],
  ${STUDENT_CONTENT_34} :is(button, label, input, select, textarea)[class~="text-[14px]"],
  ${STUDENT_CONTENT_34} :is(button, label, input, select, textarea)[class~="text-[15px]"],
  ${STUDENT_CONTENT_34} :is(button, label) [class~="text-[11px]"],
  ${STUDENT_CONTENT_34} :is(button, label) [class~="text-[12px]"],
  ${STUDENT_CONTENT_34} :is(button, label) [class~="text-[13px]"],
  ${STUDENT_CONTENT_34} :is(button, label) [class~="text-[14px]"],
  ${STUDENT_CONTENT_34} :is(button, label) [class~="text-[15px]"] { font-size: 1rem; }

  [data-lesson="34"] nav [class~="text-[11px]"],
  [data-lesson="34"] nav [class~="text-[12px]"] { font-size: 0.875rem; }
  [data-lesson="34"] nav button[class~="truncate"] {
    white-space: normal;
    overflow-wrap: anywhere;
    text-overflow: clip;
  }
`;

type SlideView34Props = {
  id: string;
  title: string;
  lead?: string;
  tip?: string;
  step?: string;
  mascot: string;
  section: string;
  onGoTest: () => void;
  onGoSolutions: () => void;
};

/* موقع الإطلاق: مسار منصّة، صاروخ، وثلاث محطات وظيفية. */
function LaunchDiagram34() {
  return (
    <svg viewBox="0 0 460 330" role="img" aria-label="منصّة إطلاق: مسار متقطع من الآن إلى المستقبل، والصاروخ يعمل بوقود will + V1">
      <defs>
        <linearGradient id="l34-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="52%" stopColor="#fce7f3" />
          <stop offset="100%" stopColor="#ede9fe" />
        </linearGradient>
        <linearGradient id="l34-trail" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="52%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="l34-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="62%" stopColor="#f5f3ff" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
        <linearGradient id="l34-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="58%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="460" height="330" rx="34" fill="url(#l34-sky)" />
      <circle cx="366" cy="74" r="46" fill="#fde68a" opacity="0.75" />
      <circle cx="366" cy="74" r="27" fill="#fbbf24" opacity="0.6" />
      <circle cx="86" cy="66" r="4" fill="#7c3aed" opacity="0.55" />
      <circle cx="122" cy="42" r="2.6" fill="#db2777" opacity="0.6" />
      <circle cx="310" cy="140" r="3" fill="#0891b2" opacity="0.6" />
      <circle cx="60" cy="150" r="2.4" fill="#f59e0b" opacity="0.8" />

      <path d="M62 268 C 138 254, 196 214, 252 172 S 356 92, 404 62" fill="none" stroke="#c4b5fd" strokeWidth="15" strokeLinecap="round" opacity="0.45" />
      <path d="M62 268 C 138 254, 196 214, 252 172 S 356 92, 404 62" fill="none" stroke="url(#l34-trail)" strokeWidth="3.4" strokeDasharray="2 10" strokeLinecap="round" />

      <ellipse cx="96" cy="286" rx="58" ry="13" fill="#c4b5fd" opacity="0.4" />
      <rect x="58" y="272" width="76" height="10" rx="5" fill="#a78bfa" opacity="0.7" />

      <circle cx="62" cy="268" r="15" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2.5" />
      <circle cx="62" cy="268" r="5" fill="#7c3aed" />
      <text x="84" y="273" fill="#4c1d95" fontSize="12" fontWeight="800" fontFamily="Fredoka, Tajawal, sans-serif">NOW</text>

      <circle cx="252" cy="172" r="21" fill="#fff7ed" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="280" y="168" fill="#9a3412" fontSize="11" fontWeight="800" fontFamily="Fredoka, Tajawal, sans-serif">WILL + V1</text>
      <text x="280" y="182" fill="#c2410c" fontSize="8.5" fontWeight="700" fontFamily="Fredoka, Tajawal, sans-serif">the launch engine</text>

      <circle cx="404" cy="62" r="23" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
      <circle cx="404" cy="62" r="9" fill="#34d399" opacity="0.6" />
      <text x="356" y="30" fill="#047857" fontSize="11" fontWeight="800" fontFamily="Fredoka, Tajawal, sans-serif">FUTURE</text>

      <g transform="rotate(27 292 188)">
        <ellipse cx="292" cy="196" rx="17" ry="34" fill="url(#l34-body)" stroke="#7c3aed" strokeWidth="2" />
        <path d="M292 150 C 303 163, 309 178, 307 192 L 277 192 C 275 178, 281 163, 292 150 Z" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="292" cy="178" r="8" fill="#bae6fd" stroke="#0891b2" strokeWidth="2" />
        <path d="M276 184 L 260 202 L 279 197 Z" fill="#db2777" />
        <path d="M308 184 L 324 202 L 305 197 Z" fill="#db2777" />
        <path d="M282 209 L 302 209 L 292 232 Z" fill="url(#l34-flame)" />
        <path d="M284 213 L 300 213 L 292 226 Z" fill="#fef3c7" />
      </g>

      <g fontFamily="Fredoka, Tajawal, sans-serif" fontSize="9.5" fontWeight="700">
        <rect x="30" y="292" width="102" height="22" rx="11" fill="#ffffff" stroke="#fcd34d" />
        <text x="41" y="307" fill="#92400e">I'll decide</text>
        <rect x="140" y="292" width="112" height="22" rx="11" fill="#ffffff" stroke="#f9a8d4" />
        <text x="151" y="307" fill="#9d174d">I promise</text>
        <rect x="260" y="292" width="106" height="22" rx="11" fill="#ffffff" stroke="#c4b5fd" />
        <text x="271" y="307" fill="#5b21b6">I think…</text>
      </g>
    </svg>
  );
}

export function SlideView34(p: SlideView34Props) {
  const index = Math.max(0, SLIDES.findIndex((s) => s.id === p.id));
  const phase = SECTIONS_34.find((s) => s.id === p.section);
  const phaseMeta = PHASE_META_34.find((s) => s.id === p.section);
  const pct = Math.round(((index + 1) / SLIDE_COUNT_34) * 100);

  return (
    <div className="l34-rise" data-l34-step-view={p.id}>
      <header className="l34-stephead" id="l34-step-anchor" data-phase={p.section} data-l34-step-header={p.id}>
        <div className="l34-stephead__grid">
          <div className="min-w-0">
            <div className="l34-stephead__meta">
              <span className="l34-stephead__badge">
                {phaseMeta ? <LatinRuns text={`STAGE ${String(index + 1).padStart(2, "0")} · ${phaseMeta.en}`} /> : <Rich text={phase?.label ?? p.section} />}
              </span>
              <span className="l34-stephead__count">
                <Rich text={`المحطة ${index + 1} من ${SLIDE_COUNT_34}`} />
              </span>
              <span className="l34-stephead__badge">
                <Rich text={phase?.label ?? p.section} />
              </span>
              {p.step ? (
                <span className="l34-stephead__badge">
                  <Rich text={p.step} />
                </span>
              ) : null}
            </div>
            <h2>
              <Rich text={p.title} />
            </h2>
            {p.lead ? (
              <p className="l34-stephead__lead">
                <Rich text={p.lead} />
              </p>
            ) : null}
          </div>
          <div className="l34-stephead__mascot" aria-hidden>
            {p.mascot}
          </div>
        </div>
        <div className="l34-stephead__track" aria-label={`تقدم المحطة ${index + 1} من ${SLIDE_COUNT_34}`}>
          <div>
            <span style={{ width: `${pct}%` }} />
          </div>
          <b>{pct}%</b>
        </div>
      </header>

      <Steps34 id={p.id} onGoTest={p.onGoTest} onGoSolutions={p.onGoSolutions} />

      {p.tip ? (
        <div className="l34-tip">
          <span className="l34-tip__icon" aria-hidden>
            💡
          </span>
          <div>
            <Rich text={p.tip} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MissionHero34({ mode, area, index }: { mode: "full" | "compact" | "area"; area: Area34; index: number }) {
  const meta = AREA_META[area];
  const isFull = mode === "full";
  const isArea = mode === "area";
  const currentPhase = PHASE_META_34.find((s) => s.id === SLIDES[index]?.section);

  return (
    <section className={`l34-hero ${mode === "compact" ? "l34-hero--compact" : ""} ${isArea ? "l34-hero--area" : ""}`} data-l34-hero={mode}>
      <div className="l34-hero__copy">
        <span className="l34-eyebrow">
          <span aria-hidden>🚀</span>
          <En>{isArea ? `LESSON 34 · ${meta.en}` : "LESSON 34 · FUTURE LAUNCHPAD"}</En>
        </span>

        {isArea ? (
          <h1>
            {meta.icon} <Rich text={meta.title} />
            <span className="l34-hero__en">
              <En>{meta.en}</En>
            </span>
          </h1>
        ) : (
          <h1>
            {isFull ? <Rich text="المستقبل يبدأ هنا" /> : <Rich text={LAB_AR_34} />}
            <span className="l34-hero__en">
              <En>{isFull ? "Future Simple with WILL" : LAB_NAME_34}</En>
            </span>
          </h1>
        )}

        <p className="l34-hero__lead">
          {isArea ? (
            <Rich text={meta.blurb} />
          ) : isFull ? (
            <Rich text="اربط القرار اللحظي، والوعد، والتوقع، وعرض المساعدة بمحرك واحد: Subject + will + V1. كل محطة قصيرة، وكل تفاعل يثبّت قاعدة قبل التالي." />
          ) : (
            <Rich text={LAB_PROMISE_34} />
          )}
        </p>

        {!isArea ? (
          <div className="l34-hero__formula" dir="ltr" aria-label="صيغة المستقبل البسيط">
            <span className="l34-formula-chip l34-formula-chip--subject">Subject</span>
            <span className="l34-formula-chip l34-formula-chip--op">+</span>
            <span className="l34-formula-chip l34-formula-chip--will">will</span>
            <span className="l34-formula-chip l34-formula-chip--op">+</span>
            <span className="l34-formula-chip l34-formula-chip--v1">V1</span>
            <span className="l34-formula-chip l34-formula-chip--op">+</span>
            <span className="l34-formula-chip l34-formula-chip--rest">Rest</span>
          </div>
        ) : null}

        <div className="l34-hero__stats">
          {isArea ? (
            area === "test" ? (
              <>
                <span className="l34-stat">
                  <b>25</b>
                  <Rich text="سؤالًا" />
                </span>
                <span className="l34-stat">
                  <b>5</b>
                  <Rich text="مستويات" />
                </span>
                <span className="l34-stat">
                  <b>0</b>
                  <Rich text="إجابة قبل الإرسال" />
                </span>
              </>
            ) : area === "solutions" ? (
              <>
                <span className="l34-stat">
                  <b>25</b>
                  <Rich text="حلًا تفصيليًا" />
                </span>
                <span className="l34-stat">
                  <b>5</b>
                  <Rich text="مستويات" />
                </span>
                <span className="l34-stat">
                  <b>🔐</b>
                  <Rich text="بعد الإرسال" />
                </span>
              </>
            ) : (
              <>
                <span className="l34-stat">
                  <b>25</b>
                  <Rich text="حلًا تفصيليًا" />
                </span>
                <span className="l34-stat">
                  <b>7</b>
                  <Rich text="أخطاء شائعة" />
                </span>
                <span className="l34-stat">
                  <b>29</b>
                  <Rich text="خطأ مصدري مقصود" />
                </span>
              </>
            )
          ) : (
            <>
              <span className="l34-stat">
                <b dir="ltr">{index + 1} / {SLIDE_COUNT_34}</b>
                <Rich text="محطة" />
              </span>
              <span className="l34-stat">
                <b>8</b>
                <Rich text="مراحل طيران" />
              </span>
              <span className="l34-stat">
                <b>25</b>
                <Rich text="سؤال اختبار" />
              </span>
              <span className="l34-stat">
                <b>5</b>
                <Rich text="مستويات" />
              </span>
              {currentPhase ? (
                <span className="l34-stat">
                  <b>◉</b>
                  <Rich text={`المرحلة: ${currentPhase.n}`} />
                </span>
              ) : null}
            </>
          )}
        </div>

        {!isArea && !isFull ? (
          <div className="mt-2 text-[10px] font-bold text-violet-400">
            <En>{LAB_MOTTO_34}</En>
          </div>
        ) : null}
      </div>

      {isFull ? (
        <div className="l34-launch">
          <LaunchDiagram34 />
          <div className="l34-launch__caption">
            <Rich text="ثلاث بوابات للانطلاق — والمحرّك واحد: will + V1" />
          </div>
        </div>
      ) : (
        <div className="l34-hero__badge" aria-hidden>
          {isArea ? meta.icon : "🛰️"}
        </div>
      )}
    </section>
  );
}

function Legend34() {
  return (
    <div className="l34-rail__legend">
      <div className="l34-rail__legend-title">
        <Rich text="🎨 دليل الألوان" />
      </div>
      <div className="l34-legend">
        <span className="l34-legend__item" data-kind="affirmative">
          <Rich text="مثبت" />
        </span>
        <span className="l34-legend__item" data-kind="negative">
          <Rich text="منفي" />
        </span>
        <span className="l34-legend__item" data-kind="question">
          <Rich text="سؤال" />
        </span>
        <span className="l34-legend__item" data-kind="prediction">
          <Rich text="توقع" />
        </span>
        <span className="l34-legend__item" data-kind="promise">
          <Rich text="وعد" />
        </span>
        <span className="l34-legend__item" data-kind="decision">
          <Rich text="قرار / عرض" />
        </span>
        <span className="l34-legend__item" data-kind="mistake">
          <Rich text="خطأ شائع" />
        </span>
      </div>
    </div>
  );
}

function Rail34({
  index,
  currentSection,
  openMap,
  setOpenMap,
  setIndex,
  pct,
}: {
  index: number;
  currentSection: string;
  openMap: Record<string, boolean>;
  setOpenMap: Dispatch<SetStateAction<Record<string, boolean>>>;
  setIndex: (i: number) => void;
  pct: number;
}) {
  return (
    <nav aria-label="خطوات الدرس 34">
      <div className="l34-rail__head">
        <span className="l34-rail__title">
          <span aria-hidden>🧭</span>
          <Rich text="خريطة الرحلة" />
        </span>
        <span className="l34-rail__count" dir="ltr">
          {index + 1} / {SLIDE_COUNT_34}
        </span>
      </div>
      <div className="l34-rail__meter" aria-hidden>
        <span style={{ width: `${pct}%` }} />
      </div>

      {SECTIONS_34.map((sec) => {
        const slidesIn = SLIDES.map((s, i) => ({ s, i })).filter((x) => x.s.section === sec.id);
        const firstIdx = slidesIn[0]?.i ?? 0;
        const open = !!openMap[sec.id];
        const activeSec = currentSection === sec.id;
        const phaseMeta = PHASE_META_34.find((x) => x.id === sec.id);
        return (
          <div key={sec.id} className="l34-phase">
            <button
              type="button"
              aria-expanded={open}
              data-active={activeSec ? "true" : "false"}
              onClick={() => {
                setOpenMap((m) => ({ ...m, [sec.id]: !m[sec.id] }));
                if (!open) setIndex(firstIdx);
              }}
              className={`l34-phase__toggle ${FOCUS34}`}
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span aria-hidden>{sec.label.split(" ")[0]}</span>
                <span className="min-w-0 overflow-wrap-anywhere text-right">
                  <Rich text={sec.label.replace(/^\S+\s*/, "")} />
                  {phaseMeta ? (
                    <span className="mt-0.5 block text-[9px] font-bold" dir="ltr">
                      {phaseMeta.en}
                    </span>
                  ) : null}
                </span>
              </span>
              <span aria-hidden className="l34-phase__chev">
                {open ? "▾" : "▸"}
              </span>
            </button>
            {open ? (
              <ol className="l34-phase__steps">
                {slidesIn.map(({ s, i }) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-current={i === index ? "step" : undefined}
                      onClick={() => setIndex(i)}
                      className={FOCUS34}
                    >
                      <span className="l34-phase__step-text">
                        <Rich text={s.title} />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        );
      })}

      <Legend34 />
    </nav>
  );
}

function StageMap34({
  currentSection,
  index,
  setIndex,
}: {
  currentSection: string;
  index: number;
  setIndex: (i: number) => void;
}) {
  return (
    <nav className="l34-stagebar" aria-label="مراحل رحلة الدرس 34">
      {SECTIONS_34.map((sec, i) => {
        const firstIdx = SLIDES.findIndex((s) => s.section === sec.id);
        const active = currentSection === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            className={`l34-stage ${FOCUS34}`}
            aria-current={active ? "step" : undefined}
            data-done={firstIdx <= index ? "true" : "false"}
            onClick={() => setIndex(Math.max(0, firstIdx))}
          >
            <span className="l34-stage__dot" aria-hidden>
              {i + 1}
            </span>
            <span className="min-w-0">
              <Rich text={sec.label} />
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function MobileMapFab34({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="l34-fab fixed bottom-3 left-3 z-30 lg:hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="l34-map"
        className={`l34-fab__btn ${FOCUS34}`}
      >
        <span aria-hidden>🧭</span>
        <Rich text="الخطوات" />
      </button>
    </div>
  );
}

function BackToLesson34({ onBack }: { onBack: () => void }) {
  return (
    <button type="button" onClick={onBack} className={`l34-back ${FOCUS34}`}>
      <span aria-hidden>←</span>
      <Rich text="العودة إلى خطوات الدرس" />
    </button>
  );
}

export default function Lesson34(_props: { onExit?: () => void }) {
  const { onExit } = _props;
  const [area, setArea] = useState<Area34>("lesson");
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const testSession = useTestSession34();
  const testSubmitted = testSession.submitted;
  const [index, setIndex] = useState(0);
  const [mapOpen, setMapOpen] = useState(false);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SECTIONS_34.map((s, i) => [s.id, i === 0])),
  );

  const step = SLIDES[index];
  const currentSection = step.section;
  const isLast = index === SLIDE_COUNT_34 - 1;
  const pct = Math.round(((index + 1) / SLIDE_COUNT_34) * 100);

  useEffect(() => {
    setOpenMap((m) => ({ ...m, [currentSection]: true }));
  }, [currentSection]);

  useEffect(() => {
    if (area !== "lesson" || index === 0) return;
    const anchor = document.getElementById("l34-step-anchor");
    if (anchor && typeof anchor.scrollIntoView === "function") {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [area, index]);

  const rail = (
    <Rail34
      index={index}
      currentSection={currentSection}
      openMap={openMap}
      setOpenMap={setOpenMap}
      setIndex={(i) => {
        setArea("lesson");
        setIndex(i);
      }}
      pct={pct}
    />
  );

  const tabs = (
    <nav className="l34-areas" aria-label="مناطق الدرس 34">
      {(Object.keys(AREA_META) as Area34[]).map((key) => {
        const meta = AREA_META[key];
        const active = area === key;
        return (
          <button
            key={key}
            type="button"
            data-area-tab={key}
            aria-pressed={active}
            onClick={() => setArea(key)}
            className={`l34-area-btn ${FOCUS34}`}
          >
            <span aria-hidden>{meta.icon}</span>
            <Rich text={meta.title} />
            {key === "solutions" && !testSubmitted ? (
              <span className="l34-area-btn__lock" aria-hidden>
                🔐
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );

  const lessonNav = (
    <LessonStepNav
      onPrev={() => setIndex((i) => Math.max(0, i - 1))}
      onNext={() => setIndex((i) => Math.min(SLIDE_COUNT_34 - 1, i + 1))}
      prevDisabled={index === 0}
      showNext={!isLast}
      ariaLabel="التنقل بين خطوات الدرس 34"
      className="l34-stepnav"
      prevClassName="l34-stepnav__btn"
      nextClassName="l34-stepnav__btn l34-stepnav__btn--next"
    >
      <span className="l34-stepnav__chip">
        <Rich text={`المحطة ${index + 1} من ${SLIDE_COUNT_34}`} />
        <b aria-hidden>·</b>
        <Rich text={SECTIONS_34.find((s) => s.id === currentSection)?.label ?? ""} />
      </span>
    </LessonStepNav>
  );

  const areaNav = (
    <LessonStepNav
      onPrev={() => setArea("lesson")}
      onNext={() => setArea("lesson")}
      showNext={false}
      prevLabel={
        <>
          <span aria-hidden>←</span> <Rich text="العودة إلى خطوات الدرس" />
        </>
      }
      ariaLabel="التنقل في منطقة الدرس 34"
      className="l34-stepnav"
      prevClassName="l34-stepnav__btn"
    />
  );

  const lessonMain = (
    <div className="l34-rise" key={step.id}>
      <SlideView34
        id={step.id}
        title={step.title}
        lead={step.lead}
        tip={step.tip}
        step={step.step}
        mascot={step.mascot}
        section={step.section}
        onGoTest={() => setArea("test")}
        onGoSolutions={() => setArea("solutions")}
      />

      {isLast ? (
        <div className="mt-4">
          <FinalTest lesson={34} questions={FINAL_TESTS[34]} accent="bg-violet-700" onGoTeacher={() => setArea("teacher")} />
        </div>
      ) : null}

      {lessonNav}
    </div>
  );

  const areaMain = () => {
    const meta = AREA_META[area];
    return (
      <div className="l34-rise">
        <div className="l34-area-bar">
          <BackToLesson34 onBack={() => setArea("lesson")} />
          <span className="l34-eyebrow">
            <span aria-hidden>{meta.icon}</span>
            <En>{meta.en}</En>
          </span>
        </div>

        <div className="mt-2">
          {area === "test" ? (
            <TestArea34
              session={testSession}
              onRestart={() => testSession.setSubmitted(false)}
              onSubmitted={() => testSession.setSubmitted(true)}
            />
          ) : area === "solutions" ? (
            <Solutions34 unlocked={testSubmitted} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
          ) : (
            <TeacherArea34 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
          )}
        </div>

        {areaNav}
      </div>
    );
  };

  return (
    <div dir="rtl" className="l34-app" data-lesson="34" data-l34-shell="future-launchpad">
      <style>{READABILITY_CSS_34}</style>
      <div className="l34-frame">
        <header className="l34-topbar">
          <div className="l34-brand">
            <span className="l34-brand__mark" aria-hidden>
              🚀
            </span>
            <span className="l34-brand__text">
              <span className="l34-brand__en">
                <En>{LAB_NAME_34}</En>
              </span>
              <span className="l34-brand__ar">
                <Rich text={`${LAB_AR_34} · الدرس 34`} />
              </span>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {onExit ? (
              <button type="button" onClick={onExit} className={`l34-back ${FOCUS34}`}>
                <span aria-hidden>🏠</span>
                <Rich text="الرئيسية" />
              </button>
            ) : null}
            {tabs}
          </div>
        </header>

        <MissionHero34 mode={area === "lesson" ? (index === 0 ? "full" : "compact") : "area"} area={area} index={index} />

        {area === "lesson" ? (
          <>
            <StageMap34 currentSection={currentSection} index={index} setIndex={setIndex} />

            <div className="l34-shell">
              <aside id="l34-map" className="l34-rail" data-open={mapOpen ? "true" : "false"}>
                <button
                  type="button"
                  className={`l34-map-toggle ${FOCUS34}`}
                  aria-expanded={mapOpen}
                  onClick={() => setMapOpen((v) => !v)}
                >
                  <span>
                    <Rich text="🧭 خريطة الرحلة" />
                  </span>
                  <span className="tabular-nums" dir="ltr">
                    {index + 1} / {SLIDE_COUNT_34}
                  </span>
                </button>
                <div className="l34-map-body">{rail}</div>
              </aside>

              <main id="l34-main" className="l34-main" data-area="l34-lesson">
                {lessonMain}
              </main>
            </div>
            <MobileMapFab34
              open={mapOpen}
              onToggle={() => {
                setMapOpen((v) => {
                  const next = !v;
                  if (next) {
                    window.setTimeout(() => document.getElementById("l34-map")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
                  }
                  return next;
                });
              }}
            />
          </>
        ) : (
          <main
            id="l34-main"
            className="l34-main mt-3"
            data-area={area === "test" ? "l34-test" : area === "solutions" ? "l34-solutions" : "l34-teacher"}
          >
            {areaMain()}
          </main>
        )}
      </div>
    </div>
  );
}
