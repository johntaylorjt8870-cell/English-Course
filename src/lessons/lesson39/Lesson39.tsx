import { lazy, Suspense, useEffect, useState } from "react";
import StepView39 from "./Steps39";
import TestArea39 from "./TestArea39";
import TeacherArea39 from "./TeacherArea39";
import { Rich } from "../../shared/lessonKit";
import { SLIDES_39, CHAPTERS_39, STEP_COUNT_39 } from "./data";
import "./lesson39.css";
const SolutionsArea39 = lazy(() => import("./SolutionsArea39"));
type Area = "student" | "test" | "solutions" | "teacher";
export default function Lesson39({ onExit }: { onExit?: () => void }) {
  const [index, setIndex] = useState(0),
    [area, setArea] = useState<Area>("student");
  const [testSubmitted, setSubmitted] = useState(false),
    [teacherUnlocked, setTeacher] = useState(false);
  const slide = SLIDES_39[index],
    unlocked = testSubmitted || teacherUnlocked;
  const move = (n: number) => {
    setIndex(Math.max(0, Math.min(STEP_COUNT_39 - 1, n)));
    setArea("student");
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [index, area]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (
        area !== "student" ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        (e.target as HTMLElement)?.closest("input,textarea,select,button,a")
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => Math.min(STEP_COUNT_39 - 1, i + 1));
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [area]);
  return (
    <div dir="rtl" data-lesson="39" className="tg39">
      <header className="tg-top">
        <div dir="ltr" className="tg-brand">
          <b>39</b>
          <span>
            TIME GRID<small>FUTURE PERFECT CONTINUOUS</small>
          </span>
        </div>
        <p>المستقبل التام المستمر · كم ستكون مدة النشاط؟</p>
        <button onClick={onExit}>المنهج ↗</button>
      </header>
      <div className="tg-layout">
        <aside className="tg-rail">
          <p className="tg-rail-title">
            مسار التعلم{" "}
            <span dir="ltr">
              {index + 1} / {STEP_COUNT_39}
            </span>
          </p>
          <progress
            value={index + 1}
            max={STEP_COUNT_39}
            aria-label="تقدم الدرس"
          />
          <nav aria-label="محتويات الدرس 39">
            {CHAPTERS_39.map((ch) => (
              <section key={ch.id}>
                <button
                  className={
                    slide.section === ch.id ? "tg-chapter active" : "tg-chapter"
                  }
                  onClick={() =>
                    move(SLIDES_39.findIndex((s) => s.section === ch.id))
                  }
                >
                  <Rich text={ch.label} />
                </button>
                {slide.section === ch.id ? (
                  <ol>
                    {SLIDES_39.map((s, i) =>
                      s.section === ch.id ? (
                        <li key={s.id}>
                          <button
                            data-step-nav={s.id}
                            aria-current={i === index ? "step" : undefined}
                            onClick={() => move(i)}
                          >
                            <span className="tg-nav-label">
                              <Rich
                                text={`${i + 1} · ${s.title.replace(/^.*?\d+\. /, "")}`}
                              />
                            </span>
                          </button>
                        </li>
                      ) : null,
                    )}
                  </ol>
                ) : null}
              </section>
            ))}
          </nav>
        </aside>
        <main id="lesson39-main">
          <nav className="tg-areas" aria-label="مناطق الدرس">
            {(
              [
                ["student", "التعلم"],
                ["test", "اختبار · 25"],
                ["solutions", "الحلول"],
                ["teacher", "مساحة المعلم"],
              ] as const
            ).map(([a, t]) => (
              <button
                key={a}
                aria-pressed={area === a}
                onClick={() => setArea(a)}
              >
                {t}
                {a === "solutions" && !unlocked ? " 🔒" : ""}
              </button>
            ))}
          </nav>
          {area === "student" ? (
            <>
              <div className="tg-legend">
                <span>● النشاط الممتد</span>
                <span>↔ المدة</span>
                <span>◆ المرجع المستقبلي</span>
              </div>
              <StepView39
                key={slide.id}
                slide={slide}
                onGoTest={() => setArea("test")}
                onGoSolutions={() => setArea("solutions")}
              />
              <footer className="tg-footer">
                <button disabled={!index} onClick={() => move(index - 1)}>
                  → السابق
                </button>
                <label>
                  الخطوة{" "}
                  <select
                    aria-label="انتقل إلى الخطوة"
                    value={index}
                    onChange={(e) => move(Number(e.target.value))}
                  >
                    {SLIDES_39.map((s, i) => (
                      <option key={s.id} value={i}>
                        {i + 1} · القسم {s.source.num ?? "تمهيد"} · الجزء{" "}
                        {s.id.split("-").at(-1)}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  disabled={index === STEP_COUNT_39 - 1}
                  onClick={() => move(index + 1)}
                >
                  التالي ←
                </button>
              </footer>
            </>
          ) : null}
          <div hidden={area !== "test"}>
            <TestArea39
              onSubmitted={() => setSubmitted(true)}
              onGoSolutions={() => setArea("solutions")}
            />
          </div>
          {area === "solutions" ? (
            unlocked ? (
              <Suspense fallback={<p>جارٍ تحميل الحلول…</p>}>
                <SolutionsArea39
                  unlocked
                  onGoTest={() => setArea("test")}
                  onGoTeacher={() => setArea("teacher")}
                />
              </Suspense>
            ) : (
              <section className="tg-step">
                <h2>الحلول مقفلة</h2>
                <p>أكمل الأسئلة وأرسل الاختبار، أو ادخل إلى مساحة المعلم.</p>
                <button onClick={() => setArea("test")}>فتح الاختبار</button>
              </section>
            )
          ) : null}
          {area === "teacher" ? (
            <TeacherArea39
              unlocked={teacherUnlocked}
              onUnlockChange={setTeacher}
              onGoSolutions={() => setArea("solutions")}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}
