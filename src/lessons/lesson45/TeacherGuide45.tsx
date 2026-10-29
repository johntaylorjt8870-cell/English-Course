import { En45, Text45 } from "./design45";
import { TEST_LEVELS_45, TEST_QUESTIONS_45 } from "./testData45";
import { TEST_SOLUTIONS_45 } from "./testKey45";

const solById = new Map(TEST_SOLUTIONS_45.map((s) => [s.id, s]));

export default function TeacherGuide45() {
  return (
    <div data-teacher-guide="45" className="space-y-6">
      {TEST_LEVELS_45.map((lv) => {
        const qs = TEST_QUESTIONS_45.filter((q) => q.level === lv.level);
        return (
          <section
            key={lv.level}
            className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/70 p-4 md:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <h3 className="font-head text-lg font-bold text-slate-900 md:text-xl">
                {lv.titleAr}
              </h3>
              <En45 className="text-xs font-extrabold text-violet-700">{lv.titleEn}</En45>
            </div>

            <div className="space-y-3">
              {qs.map((q) => {
                const sol = solById.get(q.id);
                if (!sol) return null;
                return (
                  <div
                    key={q.id}
                    data-teacher-q={q.number}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex flex-wrap items-start gap-3">
                      <span className="font-head grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                        {q.number}
                      </span>
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div
                          dir="ltr"
                          lang="en"
                          className="font-en text-left text-base font-extrabold text-slate-900 md:text-lg"
                        >
                          {q.prompt}
                        </div>
                        <div className="text-sm font-bold text-emerald-800">
                          الإجابة الصحيحة:{" "}
                          <Text45 text={sol.modelAnswer} className="font-extrabold text-emerald-950" />
                        </div>
                        <div className="text-xs font-bold text-violet-800">
                          <Text45 text={`المفهوم من الدرس: ${sol.concept}`} />
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-slate-600">
                          💡 <Text45 text={`السبب: ${sol.why}`} />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
