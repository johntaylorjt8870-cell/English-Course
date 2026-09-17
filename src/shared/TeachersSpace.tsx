import { useState } from "react";
import type { QuizQ } from "./quizBank";
import { LatinRuns } from "./bidi";

/**
 * فضاء المعلم — Teacher's Space (الخطوة 4)
 *
 * قسم مشترك يُعرض في نهاية كل اختبار: بوابة بكلمة مرور تعرض للمعلم
 * مفتاح نفس الاختبار الذي يراه الطالب — نفس الأسئلة، نفس الخيارات،
 * نفس الإجابات الصحيحة، ونفس الشروح القادمة من quizBank كما هي
 * (لا نسخة ثانية من الأسئلة، ولا شرح مُخترع لسؤال بلا شرح).
 *
 * تنبيه صادق: الموقع ثابت (GitHub Pages) — كلمة المرور بوابة عرض
 * في الواجهة فقط وليست حماية حقيقية لمفتاح الإجابة داخل الحزمة.
 *
 * قاعدة العزل: الواجهة العربية RTL، وكل وحدة إنجليزية (جملة السؤال،
 * الخيارات، الإجابة الصحيحة) معزولة LTR عبر dir="ltr" + font-en،
 * والنصوص العربية المختلطة عبر LatinRuns من shared/bidi.
 *
 * الحالة مستقلة تمامًا عن حالة الاختبار: الفتح/القفل لا يمسّ
 * اختيارات الطالب ولا التصحيح ولا إعادة الاختبار.
 */

const TEACHER_PASSWORD = "63971";
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function TeachersSpace({
  lesson,
  questions,
  accent = "bg-slate-900",
}: {
  lesson: number;
  questions: QuizQ[];
  accent?: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // لا يوجد اختبار لهذا الدرس — لا حاجة للمساحة أصلًا
  if (questions.length === 0) return null;

  const tryUnlock = () => {
    if (value.trim() === TEACHER_PASSWORD) {
      setUnlocked(true);
      setWrong(false);
      setValue("");
    } else {
      setWrong(true);
      setAttempts((n) => n + 1);
    }
  };

  // ---------------- مغلق: لا يظهر من المفتاح أي حرف قبل كلمة المرور ----------------
  // المفتاح لا يُرَندَر إطلاقًا هنا — لا نصوص إجابات ولا شروح في الـ DOM.
  if (!unlocked) {
    return (
      <section className="mt-10 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-200 text-xl">🧑‍🏫</span>
          <div className="min-w-0 flex-1">
            <div dir="ltr" className="font-en text-left text-lg font-extrabold text-slate-700">
              Teacher’s Space
            </div>
            <div className="text-sm font-bold text-slate-500">
              فضاء المعلم — الدرس {lesson} · مفتاح الأسئلة والإجابات
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-400 shadow-sm">🔒 مقفلة</span>
        </div>

        <form
          className="mt-4 flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            tryUnlock();
          }}
        >
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (wrong) setWrong(false);
            }}
            placeholder="كلمة المرور"
            aria-label="كلمة مرور فضاء المعلم"
            dir="ltr"
            autoComplete="off"
            className="font-en w-44 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
          />
          <button
            type="submit"
            className={`rounded-xl px-4 py-2 font-bold text-white shadow transition hover:brightness-110 active:scale-[0.98] ${accent}`}
          >
            🔓 فتح المساحة
          </button>
          <span className="text-sm font-bold text-slate-400">خاص بالمعلم فقط</span>
          {wrong && (
            <div key={attempts} className="shake w-full text-sm font-bold text-rose-600">
              ✕ كلمة المرور غير صحيحة — المساحة ما زالت مقفلة.
            </div>
          )}
        </form>
      </section>
    );
  }

  // ---------------- مفتوح: مراجعة مفتاح نفس الاختبار المعروض للطالب ----------------
  return (
    <section className="pop mt-10 rounded-3xl border-2 border-slate-300 bg-white/80 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-xl text-white ${accent}`}>
          🧑‍🏫
        </span>
        <div className="min-w-0 flex-1">
          <div dir="ltr" className="font-en text-left text-lg font-extrabold text-slate-700">
            Teacher’s Space
          </div>
          <div className="text-sm font-bold text-slate-500">
            فضاء المعلم — الدرس {lesson} · مراجعة مفتاح الاختبار نفسه
          </div>
        </div>
        <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-bold text-white shadow-sm">
          ✓ Unlocked
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        {questions.map((q, i) => (
          <div key={i} data-ts-q={i} className="rounded-2xl border-2 border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-start gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${accent}`}>
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-slate-800">
                  <LatinRuns text={q.ar} />
                </div>
                {q.en && (
                  <div dir="ltr" className="font-en mt-1 text-left text-xl font-extrabold text-slate-900">
                    {q.en}
                  </div>
                )}
              </div>
            </div>

            {/* كل الخيارات كما هي — الإجابة الصحيحة موضحة بعلامة ✓ فقط هنا في فضاء المعلم */}
            <div className="mt-3 grid gap-2 pr-11 sm:grid-cols-2">
              {q.opts.map((o, oi) => {
                const isA = oi === q.answer;
                return (
                  <div
                    key={oi}
                    dir="ltr"
                    className={`rounded-xl border-2 px-3 py-2 text-left font-en text-base font-bold ${
                      isA
                        ? "border-emerald-300 bg-emerald-50/70 text-emerald-800"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <span className={isA ? "text-emerald-600" : "text-slate-400"}>{LETTERS[oi]}) </span>
                    {o}
                    {isA && <span> ✓</span>}
                  </div>
                );
              })}
            </div>

            <div className="mt-2 pr-11 text-sm font-bold text-slate-700">
              الإجابة الصحيحة:{" "}
              <span dir="ltr" className="font-en text-emerald-700">
                {LETTERS[q.answer]}) {q.opts[q.answer]}
              </span>
            </div>
            {/* الشرح يُعرض فقط إذا وُجد في بيانات الاختبار الأصلية — لا شرح مُخترع */}
            {q.why && (
              <div className="mt-1 pr-11 text-sm font-bold text-slate-500">
                💡 <LatinRuns text={q.why} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
