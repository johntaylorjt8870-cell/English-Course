// ============================================================
// kit34 — مكوّنات تفاعل الدرس 34 (THE FUTURE ENGINE)
// هوية بصرية جديدة: خلفية عاجية دافئة + أخضر مزرقّ (teal) هادئ أساسي،
// وأزرق سماوي للمعلومات المساندة، وكهرماني للتلميحات، وبنفسجي للتميّز،
// وأحمر مقيّد لحالات الخطأ الحقيقية فقط.
// القواعد المشتركة: لا كشف للإجابات قبل فعل المتعلّم، تركيز مرئي عبر FOCUS34،
// وكل الخيارات الإنجليزية تُعرض عبر LatinRuns/En.
// ============================================================

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";

export const FOCUS34 =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/* ---------- لوحة الألوان الدلالية (تُستخدم في كل المكوّنات) ---------- */
export const TONE34 = {
  /** الأساسي: تنقّل نشط وإجراءات مهمة */
  primary: "border-teal-700 bg-teal-700 text-white hover:bg-teal-800",
  primarySoft: "border-teal-200 bg-teal-50 text-teal-900",
  /** الثانوي: شروح ومعلومات مساندة */
  info: "border-sky-200 bg-sky-50 text-sky-900",
  /** الأمثلة وحالات التعلّم الناجحة */
  good: "border-emerald-200 bg-emerald-50 text-emerald-900",
  /** التلميحات وملاحظات الانتباه */
  hint: "border-amber-200 bg-amber-50 text-amber-900",
  /** تميّز IQ200 */
  accent: "border-violet-200 bg-violet-50 text-violet-900",
  /** الخطأ الحقيقي فقط */
  bad: "border-rose-200 bg-rose-50 text-rose-900",
} as const;

/* ---------- التقرير الخام إلى شجرة الخطوات ---------- */
export type GateDriver34 = {
  complete: number;
  total: number;
  onDone: (done: boolean) => void;
};

export function useGate34(total: number): GateDriver34 {
  const [done, setDone] = useState(false);
  const onDone = useCallback((d: boolean) => {
    if (d) setDone(true);
  }, []);
  return useMemo<GateDriver34>(() => ({ complete: done ? total : 0, total, onDone }), [done, total, onDone]);
}

/* ---------- الغلاف الهادئ لكل لوحة ---------- */
export function Lab34({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <div className="rounded-[1.75rem] border border-stone-200/80 bg-white/85 p-4 shadow-[0_10px_40px_-32px_rgba(28,25,23,0.45)] sm:p-6">
      {children}
      {source ? (
        <div className="mt-4 border-t border-stone-100 pt-2 text-[11px] leading-5 text-stone-500">
          📜 المصدر: <Rich text={source} />
        </div>
      ) : null}
    </div>
  );
}

export function Platform34({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 rounded-2xl border border-dashed border-stone-300 bg-stone-50/70 px-3 py-2 text-[12px] leading-6 text-stone-700">
      <span className="font-bold">🛠️ مثال تدريبي للمنصة — ليس من المصدر: </span>
      {typeof children === "string" ? <Rich text={children} /> : children}
    </div>
  );
}

export function Note34({ children }: { children: ReactNode }) {
  return (
    <div className={`mt-2 rounded-2xl border px-3 py-2 text-[13px] leading-6 ${TONE34.info}`}>
      {typeof children === "string" ? <Rich text={children} /> : children}
    </div>
  );
}

export function Hint34({ children }: { children: ReactNode }) {
  return (
    <div className={`mt-2 rounded-2xl border px-3 py-2 text-[13px] leading-6 ${TONE34.hint}`}>
      <span className="font-black">💡 تلميح: </span>
      {typeof children === "string" ? <Rich text={children} /> : children}
    </div>
  );
}

export function Verdict34({ tone, children }: { tone: "good" | "warn" | "note"; children: ReactNode }) {
  const styles =
    tone === "good" ? TONE34.good : tone === "warn" ? TONE34.bad : TONE34.info;
  return <div className={`mt-2 rounded-2xl border px-3 py-2 text-[13px] leading-6 ${styles}`}>{typeof children === "string" ? <Rich text={children} /> : children}</div>;
}

export function Progress34({ complete, total }: { complete: number; total: number }) {
  const pct = total ? Math.round((complete / total) * 100) : 0;
  return (
    <div className="mb-3 flex items-center gap-2" aria-label="التقدم في التفاعل">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-stone-200">
        <div className="h-full rounded-full bg-teal-700 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11px] font-bold tabular-nums text-stone-600" aria-live="polite">
        <Rich text={`أنجزت ${complete} من ${total}`} />
      </span>
    </div>
  );
}

/* ---------- الغلاف: الخط الزمني ── Past / Now / Future ---------- */
export function TimelineChips34({
  moments,
  drv,
}: {
  moments: { en: string; ar: string; tense: string; tag: string }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => moments.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === moments.length) drv.onDone(true);
  }, [count, moments.length, drv]);
  return (
    <div>
      <Progress34 complete={count} total={moments.length} />
      <div className="grid gap-2 sm:grid-cols-3" dir="ltr">
        {moments.map((m, i) => (
          <button
            key={m.tense}
            type="button"
            data-moment={m.tense}
            onClick={() => {
              if (open[i]) return;
              setOpen((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }}
            aria-pressed={open[i]}
            className={`${FOCUS34} rounded-2xl border-2 p-3 text-left transition ${
              open[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-stone-400">
              <En>{m.tag}</En>
            </div>
            <div className="mt-1 text-[13px] font-black text-teal-900" dir="ltr">
              <En>{m.en}</En>
            </div>
            {open[i] ? (
              <>
                <div className="mt-1 text-[12px] text-stone-700" dir="rtl">
                  <Rich text={m.ar} />
                </div>
                <div className="mt-1 text-[11px] font-bold text-teal-700" dir="ltr">
                  <En>{m.tense}</En>
                </div>
              </>
            ) : (
              <div className="mt-1 text-[11px] text-stone-400" dir="rtl">
                <Rich text="المس لكشف الترجمة والزمن…" />
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border border-stone-200 bg-stone-50/70 px-3 py-2 text-[12px] leading-6 text-stone-700" dir="ltr">
        <En>PAST ───────── NOW ───────── FUTURE</En>
        <span className="mr-2 text-stone-500" dir="rtl">
          الماضي الآن المستقبل
        </span>
      </div>
    </div>
  );
}

/* ---------- الغلاف: وظائف will الأربع ---------- */
export function FunctionChips34({
  functions,
  drv,
}: {
  functions: { n: string; title: string; ar: string }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => functions.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === functions.length) drv.onDone(true);
  }, [count, functions.length, drv]);
  return (
    <div className="grid gap-2 sm:grid-cols-2" dir="ltr">
      {functions.map((f, i) => (
        <button
          key={f.n}
          type="button"
          data-function={f.n}
          onClick={() => {
            if (open[i]) return;
            setOpen((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }}
          aria-pressed={open[i]}
          className={`${FOCUS34} rounded-2xl border-2 p-3 text-left transition ${
            open[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
          }`}
        >
          <div className="text-[13px] font-black text-teal-900">
            <span className="ml-1 text-stone-400">{f.n}</span>
            <En>{f.title}</En>
          </div>
          {open[i] ? (
            <div className="mt-1 text-[12px] leading-6 text-stone-700" dir="rtl">
              <Rich text={f.ar} />
            </div>
          ) : (
            <div className="mt-1 text-[11px] text-stone-400" dir="rtl">
              <Rich text="المس لفتح الوظيفة…" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

/* ---------- الأهداف ---------- */
export function ObjectivesChecklist34({ items, drv }: { items: { n: string; text: string }[]; drv: GateDriver34 }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const count = checked.filter(Boolean).length;
  useEffect(() => {
    if (count === items.length) drv.onDone(true);
  }, [count, items.length, drv]);
  return (
    <div>
      <Progress34 complete={count} total={items.length} />
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={it.n}>
            <button
              type="button"
              data-objective={it.n}
              onClick={() => {
                setChecked((prev) => {
                  const next = [...prev];
                  next[i] = !prev[i];
                  return next;
                });
              }}
              aria-pressed={checked[i]}
              className={`${FOCUS34} flex w-full items-start gap-2 rounded-2xl border-2 px-3 py-2 text-right transition ${
                checked[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
              }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-black ${
                  checked[i] ? "border-teal-700 bg-teal-700 text-white" : "border-stone-300 text-transparent"
                }`}
              >
                ✓
              </span>
              <span className="text-[13px] leading-6 text-stone-800">
                <span className="ml-1 font-black text-teal-700">{it.n}.</span>
                <Rich text={it.text} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- لوحة الصيغة (Subject + will + V1 + Rest) ---------- */
export function FormulaBoard34({
  title,
  parts,
  note,
  drv,
}: {
  title: string;
  parts: { text: string; role: string }[];
  note?: string;
  drv?: GateDriver34;
}) {
  const [seen, setSeen] = useState<boolean[]>(() => parts.map(() => false));
  const count = seen.filter(Boolean).length;
  useEffect(() => {
    if (drv && count === parts.length) drv.onDone(true);
  }, [count, parts.length, drv]);
  const chip = (role: string) =>
    role === "aux"
      ? "border-teal-600 bg-teal-700 text-white"
      : role === "verb"
        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
        : role === "subject"
          ? "border-sky-300 bg-sky-50 text-sky-900"
          : "border-stone-200 bg-white text-stone-700";
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-3">
      <div className="mb-2 text-[12px] font-black text-stone-600">
        <Rich text={title} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
        {parts.map((p, i) => (
          <button
            key={i}
            type="button"
            data-formula-part={i}
            onClick={() => {
              if (seen[i]) return;
              setSeen((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }}
            aria-pressed={seen[i]}
            className={`${FOCUS34} rounded-xl border-2 px-2.5 py-1.5 text-[13px] font-black transition ${chip(p.role)} ${
              seen[i] ? "ring-2 ring-teal-200" : ""
            }`}
          >
            <En>{p.text}</En>
          </button>
        ))}
      </div>
      {note ? (
        <div className="mt-2 rounded-xl bg-stone-50 px-3 py-2 text-[12px] leading-6 text-stone-700">
          <Rich text={note} />
        </div>
      ) : null}
    </div>
  );
}

/* ---------- قائمة جمل: المس الجملة لتكشف ترجمتها ---------- */
export function SentenceList34({
  items,
  drv,
  tone = "good",
}: {
  items: { en: string; ar: string }[];
  drv?: GateDriver34;
  tone?: "good" | "info";
}) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (drv && count === items.length) drv.onDone(true);
  }, [count, items.length, drv]);
  const wrap = tone === "good" ? TONE34.good : TONE34.info;
  return (
    <div>
      {drv ? <Progress34 complete={count} total={items.length} /> : null}
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i}>
            <button
              type="button"
              data-sentence={i}
              onClick={() => {
                setOpen((prev) => {
                  const next = [...prev];
                  next[i] = !prev[i];
                  return next;
                });
              }}
              aria-pressed={open[i]}
              className={`${FOCUS34} w-full rounded-2xl border-2 px-3 py-2 text-right transition ${
                open[i] ? wrap : "border-stone-200 bg-white hover:border-teal-400"
              }`}
            >
              <span className="block text-[13px] font-bold text-stone-900" dir="ltr">
                <LatinRuns text={it.en} />
              </span>
              {open[i] ? (
                <span className="mt-0.5 block text-[12px] leading-6 text-stone-700" dir="rtl">
                  <Rich text={it.ar} />
                </span>
              ) : (
                <span className="mt-0.5 block text-[11px] text-stone-400" dir="rtl">
                  <Rich text="المس لكشف الترجمة…" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- حوار: كل سطر يُكشف بالمس ---------- */
export function DialogueReader34({
  lines,
  drv,
  label,
}: {
  lines: { who: string; en: string; ar: string }[];
  drv?: GateDriver34;
  label?: string;
}) {
  const [open, setOpen] = useState<boolean[]>(() => lines.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (drv && count === lines.length) drv.onDone(true);
  }, [count, lines.length, drv]);
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-3">
      {label ? (
        <div className="mb-2 text-[12px] font-black text-stone-600">
          <Rich text={label} />
        </div>
      ) : null}
      {drv ? <Progress34 complete={count} total={lines.length} /> : null}
      <ul className="space-y-1.5">
        {lines.map((l, i) => (
          <li key={i}>
            <button
              type="button"
              data-dialogue={i}
              onClick={() => {
                setOpen((prev) => {
                  const next = [...prev];
                  next[i] = !prev[i];
                  return next;
                });
              }}
              aria-pressed={open[i]}
              className={`${FOCUS34} w-full rounded-2xl border-2 px-3 py-2 text-right transition ${
                open[i] ? "border-teal-200 bg-teal-50/60" : "border-stone-200 bg-white hover:border-teal-400"
              }`}
            >
              <span className="ml-1 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-black text-stone-600">
                <Rich text={l.who} />
              </span>
              <span className="block text-[13px] font-bold leading-6 text-stone-900" dir="ltr">
                <LatinRuns text={l.en} />
              </span>
              {open[i] ? (
                <span className="mt-0.5 block text-[12px] leading-6 text-stone-700" dir="rtl">
                  <Rich text={l.ar} />
                </span>
              ) : (
                <span className="mt-0.5 block text-[11px] text-stone-400" dir="rtl">
                  <Rich text="المس لكشف الترجمة…" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- مطابقة عامة: prompt ← options ---------- */
export function MatchRows34({
  rows,
  drv,
  optionDir = "auto",
}: {
  rows: { prompt: string; options: string[]; pick: number; why: string }[];
  drv: GateDriver34;
  optionDir?: "auto" | "ltr";
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].pick);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress34 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} data-row={i} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="mb-2 text-[13px] font-bold leading-6 text-stone-800" dir="auto">
            <LatinRuns text={row.prompt} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {row.options.map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && oi === row.pick;
              const isWrongPicked = chosen && opt !== row.options[row.pick];
              return (
                <button
                  key={oi}
                  type="button"
                  data-row={i}
                  data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    setPicks((prev) => {
                      const next = [...prev];
                      next[i] = oi;
                      return next;
                    });
                  }}
                  aria-pressed={chosen}
                  className={`${FOCUS34} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-300 bg-rose-50 text-rose-800"
                        : chosen
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
                  }`}
                >
                  <span dir={optionDir === "ltr" ? "ltr" : "auto"}>
                    <LatinRuns text={opt} />
                  </span>
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict34 tone="good">{row.why}</Verdict34> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- أيهما صحيحة؟ (خياران إنجليزيان) ---------- */
export function RightPick34({
  rows,
  drv,
}: {
  rows: { label: string; opts: string[]; correct: number; why: string }[];
  drv: GateDriver34;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].correct);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress34 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} data-row={i} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="mb-2 text-[12px] font-black text-stone-600">
            <Rich text={row.label} />
          </div>
          <div className="grid gap-1.5">
            {row.opts.map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && oi === row.correct;
              const isWrongPicked = chosen && oi !== row.correct;
              return (
                <button
                  key={oi}
                  type="button"
                  data-row={i}
                  data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    setPicks((prev) => {
                      const next = [...prev];
                      next[i] = oi;
                      return next;
                    });
                  }}
                  aria-pressed={chosen}
                  className={`${FOCUS34} rounded-xl border-2 px-3 py-2 text-right text-[13px] font-bold leading-6 transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-300 bg-rose-50 text-rose-800"
                        : chosen
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
                  }`}
                >
                  <span dir="ltr" className="block">
                    <LatinRuns text={opt} />
                  </span>
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict34 tone="good">{row.why}</Verdict34> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- أزواج ❌/✅: اختر الجملة السليمة ---------- */
export function PairPick34({
  pairs,
  drv,
  intro,
}: {
  pairs: { wrong: string; right: string; why: string }[];
  drv: GateDriver34;
  intro?: string;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => pairs.map(() => null));
  const done = picks.map((p, i) => p === 1);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === pairs.length) drv.onDone(true);
  }, [count, pairs.length, drv]);
  return (
    <div className="space-y-3">
      {intro ? (
        <div className="text-[12px] font-black text-stone-600">
          <Rich text={intro} />
        </div>
      ) : null}
      <Progress34 complete={count} total={pairs.length} />
      {pairs.map((p, i) => (
        <div key={i} data-row={i} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="grid gap-1.5 sm:grid-cols-2">
            {[p.wrong, p.right].map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && oi === 1;
              const isWrongPicked = chosen && oi === 0;
              return (
                <button
                  key={oi}
                  type="button"
                  data-row={i}
                  data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    setPicks((prev) => {
                      const next = [...prev];
                      next[i] = oi;
                      return next;
                    });
                  }}
                  aria-pressed={chosen}
                  className={`${FOCUS34} rounded-xl border-2 px-3 py-2 text-right text-[13px] font-bold leading-6 transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-300 bg-rose-50 text-rose-800"
                        : chosen
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
                  }`}
                >
                  <span aria-hidden className="ml-1 text-[11px] font-black text-stone-400">
                    {oi === 0 ? "❌" : "✅"}
                  </span>
                  <span dir="ltr">
                    <LatinRuns text={opt} />
                  </span>
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict34 tone="good">{p.why}</Verdict34> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- الفراغات المكتوبة ---------- */
export function normalizeTyped34(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.,!?؟]/g, "")
    .replace(/['’]/g, "'")
    .replace(/\s+/g, " ");
}

export function TypedFill34({
  rows,
  drv,
  idPrefix,
}: {
  rows: { n: string; before: string; after: string; accept: string[]; why: string; solution?: string }[];
  drv: GateDriver34;
  idPrefix?: string;
}) {
  const [vals, setVals] = useState<string[]>(() => rows.map(() => ""));
  const [ok, setOk] = useState<boolean[]>(() => rows.map(() => false));
  const [tried, setTried] = useState<boolean[]>(() => rows.map(() => false));
  const count = ok.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress34 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="mb-1 text-[11px] font-black text-stone-500">
            <Rich text={`الفراغ ${row.n}`} />
          </div>
          <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
            <span className="text-[13px] font-bold text-stone-900">
              <LatinRuns text={row.before} />
            </span>
            <input
              id={idPrefix ? `${idPrefix}-typed-${i}` : undefined}
              type="text"
              value={vals[i]}
              disabled={ok[i]}
              onChange={(e) => {
                const v = e.target.value;
                setVals((prev) => {
                  const next = [...prev];
                  next[i] = v;
                  return next;
                });
              }}
              className={`${FOCUS34} w-44 rounded-lg border-2 px-2 py-1 text-[13px] font-bold text-stone-900 ${
                ok[i] ? "border-emerald-500 bg-emerald-50" : tried[i] ? "border-rose-300 bg-rose-50" : "border-stone-300 bg-white"
              }`}
              aria-label={`الفراغ ${row.n}`}
            />
            <span className="text-[13px] font-bold text-stone-900">
              <LatinRuns text={row.after} />
            </span>
            {!ok[i] ? (
              <button
                type="button"
                onClick={() => {
                  const good = row.accept.some((a) => normalizeTyped34(a) === normalizeTyped34(vals[i]));
                  setTried((prev) => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                  });
                  if (good) {
                    setOk((prev) => {
                      const next = [...prev];
                      next[i] = true;
                      return next;
                    });
                  }
                }}
                className={`${FOCUS34} rounded-full border-2 border-teal-700 bg-teal-700 px-3 py-1 text-[11px] font-black text-white transition hover:bg-teal-800`}
              >
                تحقّق
              </button>
            ) : (
              <span aria-hidden className="text-emerald-600">
                ✓
              </span>
            )}
          </div>
          {ok[i] ? (
            <>
              {row.solution ? (
                <div className="mt-1 rounded-lg bg-emerald-50 px-2 py-1 text-[13px] font-black text-emerald-900" dir="ltr">
                  <LatinRuns text={row.solution} />
                </div>
              ) : null}
              <Verdict34 tone="good">{row.why}</Verdict34>
            </>
          ) : tried[i] ? (
            <Verdict34 tone="warn">ليست الصيغة المناسبة هنا — راجع القاعدة الذهبية وحاول مجددًا.</Verdict34>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- المحقق: المس الكلمة الخاطئة ثم اختر التصحيح ---------- */
export function TapFix34({
  rounds,
  drv,
}: {
  rounds: { n: string; segments: string[]; bad: number; fixOpts: string[]; fix: string; corrected: string; why: string }[];
  drv: GateDriver34;
}) {
  const [stage, setStage] = useState(0);
  const [tapped, setTapped] = useState<number | null>(null);
  const [solved, setSolved] = useState(0);
  useEffect(() => {
    if (solved === rounds.length) drv.onDone(true);
  }, [solved, rounds.length, drv]);
  const cur = rounds[stage];
  return (
    <div>
      <Progress34 complete={solved} total={rounds.length} />
      <div data-tap-stage={stage} className="rounded-2xl border border-stone-200 bg-white p-3">
        <div className="mb-2 text-[12px] font-black text-stone-600">
          <Rich text={`القضية ${cur.n} — المس الكلمة الخاطئة`} />
        </div>
        <div className="flex flex-wrap gap-1.5" dir="ltr">
          {solved > stage ? (
            <span className="rounded-lg border-2 border-emerald-500 bg-emerald-50 px-2 py-1.5 text-[13px] font-black text-emerald-900">
              <LatinRuns text={cur.corrected} />
            </span>
          ) : (
            cur.segments.map((seg, si) => {
              const isTapped = tapped === si;
              return (
                <button
                  key={si}
                  type="button"
                  data-tap-seg={si}
                  onClick={() => setTapped(si)}
                  className={`${FOCUS34} rounded-lg border-2 px-2 py-1.5 text-[13px] font-bold transition ${
                    isTapped
                      ? si === cur.bad
                        ? "border-teal-600 bg-teal-50 text-teal-900"
                        : "border-rose-300 bg-rose-50 text-rose-800"
                      : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
                  }`}
                >
                  <LatinRuns text={seg} />
                </button>
              );
            })
          )}
        </div>
        {tapped !== null && solved === stage ? (
          <div className="mt-3">
            <div className="mb-1 text-[12px] font-black text-stone-600">
              <Rich text="اختر التصحيح:" />
            </div>
            <div className="flex flex-wrap gap-1.5" dir="ltr">
              {cur.fixOpts.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  data-tap-fix={opt}
                  onClick={() => {
                    if (tapped === cur.bad && opt === cur.fix) {
                      setSolved(stage + 1);
                    }
                  }}
                  className={`${FOCUS34} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
                    solved > stage && opt === cur.fix
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : "border-stone-300 bg-white text-stone-800 hover:border-teal-500"
                  }`}
                >
                  <LatinRuns text={opt} />
                </button>
              ))}
            </div>
            {tapped !== cur.bad ? <Verdict34 tone="warn">ليست هذه الكلمة — ابحث عن الخطأ الحقيقي في الجملة.</Verdict34> : null}
          </div>
        ) : null}
        {solved > stage ? (
          <div>
            <Verdict34 tone="good">
              <LatinRuns text={cur.corrected} />
              {" — "}
              {cur.why}
            </Verdict34>
            {stage + 1 < rounds.length ? (
              <button
                type="button"
                onClick={() => {
                  setStage(stage + 1);
                  setTapped(null);
                }}
                className={`${FOCUS34} mt-2 rounded-full border-2 border-teal-700 bg-teal-700 px-4 py-1.5 text-[12px] font-black text-white transition hover:bg-teal-800`}
              >
                القضية التالية ←
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- بطاقات قابلة للقلب ---------- */
export function FlipCards34({
  cards,
  renderFace,
  renderBack,
  drv,
}: {
  cards: any[];
  renderFace: (c: any) => ReactNode;
  renderBack: (c: any) => ReactNode;
  drv: GateDriver34;
}) {
  const [flipped, setFlipped] = useState<boolean[]>(() => cards.map(() => false));
  const [touched, setTouched] = useState<boolean[]>(() => cards.map(() => false));
  const count = touched.filter(Boolean).length;
  useEffect(() => {
    if (count === cards.length) drv.onDone(true);
  }, [count, cards.length, drv]);
  return (
    <div>
      <Progress34 complete={count} total={cards.length} />
      <div className="grid gap-2 sm:grid-cols-2">
        {cards.map((c, i) => (
          <button
            key={i}
            type="button"
            data-flip-gate={c.level ?? String(i)}
            onClick={() => {
              setFlipped((prev) => {
                const f = [...prev];
                f[i] = !f[i];
                return f;
              });
              setTouched((prev) => {
                if (prev[i]) return prev;
                const t = [...prev];
                t[i] = true;
                return t;
              });
            }}
            aria-pressed={flipped[i]}
            className={`${FOCUS34} min-h-[96px] rounded-2xl border-2 p-3 text-right transition ${
              flipped[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
            }`}
          >
            {flipped[i] ? (
              <div className="text-[12px] leading-6 text-stone-800">{renderBack(c)}</div>
            ) : (
              <div className="text-[13px] font-black text-stone-900">{renderFace(c)}</div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-1 text-[11px] text-stone-400">
        <Rich text="المس كل بطاقة لقلبها — الزيارة الأولى لكل بطاقة تُحسب في التقدم." />
      </div>
    </div>
  );
}

/* ---------- جدول بيانات ثنائي اللغة (الضمائر / الاختصارات / المقارنات) ---------- */
export function DataTable34({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: { key: string; cells: string[]; rtl?: boolean[] }[];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white p-1">
      <table className="w-full min-w-[420px] border-collapse text-[12px]" dir="ltr">
        {caption ? (
          <caption className="px-2 py-1.5 text-start text-[11px] font-black text-stone-500" dir="rtl">
            <Rich text={caption} />
          </caption>
        ) : null}
        <thead>
          <tr className="bg-stone-50">
            {columns.map((c) => (
              <th key={c} scope="col" className="px-3 py-2 text-start font-black text-stone-600" dir="rtl">
                <Rich text={c} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-stone-100">
              {r.cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-3 py-2 font-bold ${r.rtl?.[ci] ? "text-stone-700" : "text-stone-900"}`}
                  dir={r.rtl?.[ci] ? "rtl" : "ltr"}
                >
                  <LatinRuns text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- شبكة كلمات: المس الكلمة لتكشف معناها ---------- */
export function WordGrid34({
  words,
  drv,
  columns = 3,
}: {
  words: { en: string; ar: string }[];
  drv: GateDriver34;
  columns?: number;
}) {
  const [open, setOpen] = useState<boolean[]>(() => words.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === words.length) drv.onDone(true);
  }, [count, words.length, drv]);
  return (
    <div>
      <Progress34 complete={count} total={words.length} />
      <div className={`grid gap-1.5 sm:grid-cols-${columns}`} dir="ltr">
        {words.map((w, i) => (
          <button
            key={w.en}
            type="button"
            data-word={w.en}
            onClick={() => {
              setOpen((prev) => {
                const next = [...prev];
                next[i] = !prev[i];
                return next;
              });
            }}
            aria-pressed={open[i]}
            className={`${FOCUS34} rounded-xl border-2 px-2.5 py-2 text-left transition ${
              open[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
            }`}
          >
            <span className="block text-[13px] font-black text-stone-900" dir="ltr">
              <En>{w.en}</En>
            </span>
            <span className="mt-0.5 block text-[12px] text-stone-600" dir="rtl">
              {open[i] ? <Rich text={w.ar} /> : <Rich text="المس لمعنى الكلمة…" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- لوحة Wh: المس الكلمة لتكشف مثالها ---------- */
export function WhBoard34({
  words,
  drv,
}: {
  words: { w: string; ar: string; ex: string; exAr: string }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => words.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === words.length) drv.onDone(true);
  }, [count, words.length, drv]);
  return (
    <div>
      <Progress34 complete={count} total={words.length} />
      <div className="grid gap-2 sm:grid-cols-2" dir="ltr">
        {words.map((w, i) => (
          <button
            key={w.w}
            type="button"
            data-wh={w.w}
            onClick={() => {
              setOpen((prev) => {
                const next = [...prev];
                next[i] = !prev[i];
                return next;
              });
            }}
            aria-pressed={open[i]}
            className={`${FOCUS34} rounded-2xl border-2 p-3 text-left transition ${
              open[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-[14px] font-black text-teal-900" dir="ltr">
                <En>{w.w}</En>
              </span>
              <span className="text-[12px] text-stone-600" dir="rtl">
                <Rich text={w.ar} />
              </span>
            </div>
            {open[i] ? (
              <>
                <div className="mt-1 text-[13px] font-bold text-stone-900" dir="ltr">
                  <LatinRuns text={w.ex} />
                </div>
                <div className="mt-0.5 text-[12px] text-stone-600" dir="rtl">
                  <Rich text={w.exAr} />
                </div>
              </>
            ) : (
              <div className="mt-1 text-[11px] text-stone-400" dir="rtl">
                <Rich text="المس لكشف المثال…" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- مواقف IQ200: اكتب ردك ثم قارن ---------- */
export function IqSituations34({
  items,
  drv,
}: {
  items: { n: string; ar: string; prompt: string; accept: string[]; model: string; reason: string }[];
  drv: GateDriver34;
}) {
  const [vals, setVals] = useState<string[]>(() => items.map(() => ""));
  const [revealed, setRevealed] = useState<boolean[]>(() => items.map(() => false));
  const [ok, setOk] = useState<boolean[]>(() => items.map(() => false));
  const [tried, setTried] = useState<boolean[]>(() => items.map(() => false));
  const count = revealed.filter(Boolean).length;
  useEffect(() => {
    if (count === items.length) drv.onDone(true);
  }, [count, items.length, drv]);
  return (
    <div className="space-y-3">
      <Progress34 complete={count} total={items.length} />
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="mb-1 text-[12px] font-black text-stone-600">
            <Rich text={it.n} />
          </div>
          <div className="mb-2 text-[13px] leading-6 text-stone-800">
            <Rich text={it.ar} />
          </div>
          <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
            <span className="text-[13px] font-bold text-stone-900">
              <LatinRuns text={it.prompt} />
            </span>
            <input
              id={`iq34-${i}`}
              type="text"
              value={vals[i]}
              disabled={revealed[i]}
              onChange={(e) => {
                const v = e.target.value;
                setVals((prev) => {
                  const next = [...prev];
                  next[i] = v;
                  return next;
                });
              }}
              className={`${FOCUS34} w-56 rounded-lg border-2 px-2 py-1 text-[13px] font-bold text-stone-900 ${
                revealed[i] ? "border-emerald-500 bg-emerald-50" : tried[i] ? "border-amber-300 bg-amber-50" : "border-stone-300 bg-white"
              }`}
              aria-label={`${it.n} — ردك`}
            />
            {!revealed[i] ? (
              <button
                type="button"
                onClick={() => {
                  const good = it.accept.some((a) => normalizeTyped34(a) === normalizeTyped34(vals[i]));
                  setTried((prev) => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                  });
                  setOk((prev) => {
                    const next = [...prev];
                    next[i] = good;
                    return next;
                  });
                }}
                className={`${FOCUS34} rounded-full border-2 border-teal-700 bg-teal-700 px-3 py-1 text-[11px] font-black text-white transition hover:bg-teal-800`}
              >
                تحقّق
              </button>
            ) : null}
          </div>
          {!revealed[i] && tried[i] ? (
            <div className="mt-2">
              {ok[i] ? (
                <Verdict34 tone="good">إجابتك مطابقة للإجابة الممكنة — يمكنك كشفها الآن.</Verdict34>
              ) : (
                <Verdict34 tone="warn">ليست الإجابة المتوقعة — راجع وظيفة will في الموقف ثم أعد المحاولة، أو اكشف الإجابة للمقارنة.</Verdict34>
              )}
              <button
                type="button"
                onClick={() => {
                  setRevealed((prev) => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                  });
                }}
                className={`${FOCUS34} mt-2 rounded-full border-2 border-stone-300 bg-white px-3 py-1 text-[11px] font-black text-stone-700 transition hover:border-teal-500`}
              >
                كشف الإجابة الممكنة من المصدر
              </button>
            </div>
          ) : null}
          {revealed[i] ? (
            <div className="mt-2 space-y-1">
              <div className={`rounded-xl border px-3 py-2 text-[13px] font-black ${TONE34.good}`} dir="ltr">
                <LatinRuns text={it.model} />
              </div>
              <Verdict34 tone="good">{it.reason}</Verdict34>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- القصة: المس العبارات الفعلية ── */
export function StoryHunt34({
  story,
  total,
  drv,
}: {
  story: { t: string; hit?: number }[];
  total: number;
  drv: GateDriver34;
}) {
  const [hits, setHits] = useState<Set<number>>(() => new Set());
  useEffect(() => {
    if (hits.size === total) drv.onDone(true);
  }, [hits.size, total, drv]);
  return (
    <div>
      <Progress34 complete={hits.size} total={total} />
      <p className="rounded-2xl border border-stone-200 bg-white p-4 text-[14px] font-medium leading-8 text-stone-800" dir="ltr">
        {story.map((seg, i) =>
          seg.hit ? (
            <button
              key={i}
              type="button"
              data-poem-tap={seg.hit}
              onClick={() => {
                if (hits.has(seg.hit!)) return;
                setHits((prev) => new Set(prev).add(seg.hit!));
              }}
              aria-pressed={hits.has(seg.hit)}
              className={`${FOCUS34} mx-0.5 rounded-md px-1 transition ${
                hits.has(seg.hit)
                  ? "bg-emerald-200 font-black text-emerald-900"
                  : "bg-teal-100/70 text-stone-900 underline decoration-dotted decoration-teal-500 underline-offset-4 hover:bg-teal-200"
              }`}
            >
              {seg.t}
            </button>
          ) : (
            <span key={i}>{seg.t} </span>
          )
        )}
      </p>
      <div className="mt-1 text-[11px] text-stone-500">
        <Rich text={`المس العبارات الفعلية بـ will الملوّنة (${total} عبارة) — العبارة المكتشفة تتحول إلى الأخضر.`} />
      </div>
    </div>
  );
}

/* ---------- اختيار واحد مع سياق قبل/بعد ---------- */
export function Choice34({
  rows,
  drv,
  idPrefix,
}: {
  rows: { n: string; before: string; after: string; options: string[]; answer: number; why: string }[];
  drv: GateDriver34;
  idPrefix?: string;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].answer);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress34 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={row.n} data-row={i} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="mb-2 text-[13px] font-bold leading-6 text-stone-800" dir="auto">
            <span className="ml-1 font-black text-teal-700">{row.n}</span>
            <LatinRuns text={row.before} />
            <span className="mx-1 inline-block min-w-16 border-b-2 border-dashed border-stone-300 text-center text-stone-400">______</span>
            <LatinRuns text={row.after} />
          </div>
          <div className="grid gap-1.5 sm:grid-cols-3">
            {row.options.map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && oi === row.answer;
              const isWrongPicked = chosen && oi !== row.answer;
              return (
                <button
                  key={oi}
                  type="button"
                  id={idPrefix ? `${idPrefix}-q${i}-opt${oi}` : undefined}
                  data-row={i}
                  data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    setPicks((prev) => {
                      const next = [...prev];
                      next[i] = oi;
                      return next;
                    });
                  }}
                  aria-pressed={chosen}
                  className={`${FOCUS34} rounded-xl border-2 px-3 py-2 text-[13px] font-bold transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-300 bg-rose-50 text-rose-800"
                        : chosen
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
                  }`}
                >
                  <span dir="ltr">
                    <LatinRuns text={opt} />
                  </span>
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict34 tone="good">{row.why}</Verdict34> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- تمرين التحويلات: اكتب النفي ثم السؤال ---------- */
export function TransformDrill34({
  rows,
  drv,
}: {
  rows: { n: string; aff: string; neg: string; q: string; negAccept: string[]; qAccept: string[] }[];
  drv: GateDriver34;
}) {
  const [neg, setNeg] = useState<string[]>(() => rows.map(() => ""));
  const [q, setQ] = useState<string[]>(() => rows.map(() => ""));
  const [okNeg, setOkNeg] = useState<boolean[]>(() => rows.map(() => false));
  const [okQ, setOkQ] = useState<boolean[]>(() => rows.map(() => false));
  const [triedNeg, setTriedNeg] = useState<boolean[]>(() => rows.map(() => false));
  const [triedQ, setTriedQ] = useState<boolean[]>(() => rows.map(() => false));
  const count = okNeg.filter(Boolean).length + okQ.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length * 2) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress34 complete={count} total={rows.length * 2} />
      {rows.map((row, i) => (
        <div key={row.n} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="mb-1 text-[12px] font-black text-stone-600">
            <Rich text={`الجملة ${row.n}`} />
          </div>
          <div className="mb-2 text-[13px] font-bold text-stone-900" dir="ltr">
            <LatinRuns text={row.aff} />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-[11px] font-black text-stone-500" dir="rtl">
                <Rich text="النفي:" />
              </div>
              <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
                <input
                  id={`tr34-neg-${i}`}
                  type="text"
                  value={neg[i]}
                  disabled={okNeg[i]}
                  onChange={(e) => {
                    const v = e.target.value;
                    setNeg((prev) => {
                      const next = [...prev];
                      next[i] = v;
                      return next;
                    });
                  }}
                  className={`${FOCUS34} w-52 rounded-lg border-2 px-2 py-1 text-[13px] font-bold text-stone-900 ${
                    okNeg[i] ? "border-emerald-500 bg-emerald-50" : triedNeg[i] ? "border-rose-300 bg-rose-50" : "border-stone-300 bg-white"
                  }`}
                  aria-label={`النفي — الجملة ${row.n}`}
                />
                {!okNeg[i] ? (
                  <button
                    type="button"
                    onClick={() => {
                      const good = row.negAccept.some((a) => normalizeTyped34(a) === normalizeTyped34(neg[i]));
                      setTriedNeg((prev) => {
                        const next = [...prev];
                        next[i] = true;
                        return next;
                      });
                      if (good) {
                        setOkNeg((prev) => {
                          const next = [...prev];
                          next[i] = true;
                          return next;
                        });
                      }
                    }}
                    className={`${FOCUS34} rounded-full border-2 border-teal-700 bg-teal-700 px-3 py-1 text-[11px] font-black text-white transition hover:bg-teal-800`}
                  >
                    تحقّق
                  </button>
                ) : (
                  <span aria-hidden className="text-emerald-600">
                    ✓
                  </span>
                )}
              </div>
              {okNeg[i] ? (
                <div className="mt-1 text-[12px] font-bold text-emerald-800" dir="ltr">
                  <LatinRuns text={row.neg} />
                </div>
              ) : null}
            </div>
            <div>
              <div className="mb-1 text-[11px] font-black text-stone-500" dir="rtl">
                <Rich text="السؤال:" />
              </div>
              <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
                <input
                  id={`tr34-q-${i}`}
                  type="text"
                  value={q[i]}
                  disabled={okQ[i]}
                  onChange={(e) => {
                    const v = e.target.value;
                    setQ((prev) => {
                      const next = [...prev];
                      next[i] = v;
                      return next;
                    });
                  }}
                  className={`${FOCUS34} w-52 rounded-lg border-2 px-2 py-1 text-[13px] font-bold text-stone-900 ${
                    okQ[i] ? "border-emerald-500 bg-emerald-50" : triedQ[i] ? "border-rose-300 bg-rose-50" : "border-stone-300 bg-white"
                  }`}
                  aria-label={`السؤال — الجملة ${row.n}`}
                />
                {!okQ[i] ? (
                  <button
                    type="button"
                    onClick={() => {
                      const good = row.qAccept.some((a) => normalizeTyped34(a) === normalizeTyped34(q[i]));
                      setTriedQ((prev) => {
                        const next = [...prev];
                        next[i] = true;
                        return next;
                      });
                      if (good) {
                        setOkQ((prev) => {
                          const next = [...prev];
                          next[i] = true;
                          return next;
                        });
                      }
                    }}
                    className={`${FOCUS34} rounded-full border-2 border-teal-700 bg-teal-700 px-3 py-1 text-[11px] font-black text-white transition hover:bg-teal-800`}
                  >
                    تحقّق
                  </button>
                ) : (
                  <span aria-hidden className="text-emerald-600">
                    ✓
                  </span>
                )}
              </div>
              {okQ[i] ? (
                <div className="mt-1 text-[12px] font-bold text-emerald-800" dir="ltr">
                  <LatinRuns text={row.q} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- مهمة الكتابة ---------- */
export function WriteMission34({
  checklist,
  model,
  min = 10,
  max = 12,
  drv,
}: {
  checklist: string[];
  model: { en: string; ar: string }[];
  min?: number;
  max?: number;
  drv: GateDriver34;
}) {
  const [checked, setChecked] = useState<boolean[]>(() => checklist.map(() => false));
  const [text, setText] = useState("");
  const sentences = (text.match(/[.!?]+/g) || []).length;
  const checkCount = checked.filter(Boolean).length;
  const ready = checkCount === checklist.length && sentences >= min && sentences <= max;
  useEffect(() => {
    if (ready) drv.onDone(true);
  }, [ready, drv]);
  return (
    <div className="space-y-3">
      <Progress34 complete={checkCount + Math.min(sentences, min)} total={checklist.length + min} />
      <div className="rounded-2xl border border-stone-200 bg-white p-3">
        <div className="mb-1 text-[12px] font-black text-stone-600">
          <Rich text="قائمة تحقق الكاتب — علّم ما حقّقته في فقرتك:" />
        </div>
        <ul className="space-y-1.5">
          {checklist.map((c, i) => (
            <li key={i}>
              <button
                type="button"
                id={`wr-${i}`}
                onClick={() => {
                  setChecked((prev) => {
                    const next = [...prev];
                    next[i] = !prev[i];
                    return next;
                  });
                }}
                aria-pressed={checked[i]}
                className={`${FOCUS34} flex w-full items-start gap-2 rounded-xl border px-3 py-1.5 text-right text-[12px] transition ${
                  checked[i] ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-black ${
                    checked[i] ? "border-emerald-600 bg-emerald-600 text-white" : "border-stone-300 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <Rich text={c} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-3">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span dir="rtl" className="text-[12px] font-black text-stone-700">
            فقرتك — <En>My Predictions and Promises</En>
            <span
              className={`mr-2 rounded-full px-2 py-0.5 text-[11px] font-black tabular-nums ${
                sentences >= min && sentences <= max ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
              }`}
            >
              الجمل: {sentences}/{min}–{max}
            </span>
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          dir="ltr"
          rows={6}
          placeholder="My Predictions and Promises — write your 10 to 12 sentences…"
          className={`${FOCUS34} w-full rounded-xl border-2 border-stone-300 bg-white px-3 py-2 text-[13px] leading-6 text-stone-900 placeholder:text-stone-400`}
          aria-label="مساحة كتابة الفقرة"
        />
        <div className="mt-1 text-[11px] text-stone-500">
          <Rich text="اكتب من 10 إلى 12 جملة بالإنجليزية، ثم علّم البنود الثمانية المتحققة في فقرتك." />
        </div>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-3">
        <div className="mb-1 text-[11px] font-black text-stone-600">
          <Rich text="مثال افتتاحي فقط (منقول من المصدر) — لا تكتفِ بتغيير كلماته:" />
        </div>
        <div className="grid gap-1" dir="ltr">
          {model.map((m, i) => (
            <div key={i} className="rounded-lg bg-white px-2 py-1 text-[12px] font-bold text-stone-900">
              <En>{m.en}</En>
              <span className="mr-2 text-[11px] font-normal text-stone-500" dir="rtl">
                {" — "}
                {m.ar}
              </span>
            </div>
          ))}
        </div>
      </div>
      {ready ? <Verdict34 tone="good">رائع! فقرتك جاهزة — تأكد أنها تتحرك بين التوقعات والوعود والقرار اللحظي والأسئلة.</Verdict34> : null}
    </div>
  );
}

/* ---------- خريطة التقدم + الطريق المستقبلي ---------- */
export function CourseMap34({
  map,
  roadmap,
  next,
}: {
  map: { system: string; done: string[] }[];
  roadmap: string[];
  next: string;
}) {
  return (
    <div className="space-y-2">
      {map.map((sys, i) => (
        <div key={i} className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3">
          <div className="mb-1.5 text-[13px] font-black text-emerald-900">
            <Rich text={sys.system} />
          </div>
          <div className="flex flex-wrap gap-1.5" dir="ltr">
            {sys.done.map((t) => (
              <span key={t} className="rounded-full border border-emerald-300 bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-900">
                <LatinRuns text={t} /> ✓
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-3">
        <div className="mb-1.5 text-[13px] font-black text-sky-900">
          <Rich text="بدأنا منظومة المستقبل:" />
        </div>
        <ol className="space-y-1">
          {roadmap.map((r, i) => (
            <li key={i} className="text-[12px] font-bold text-sky-900" dir="auto">
              <LatinRuns text={r} />
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-2xl border-2 border-dashed border-teal-500 bg-teal-50 p-3 text-[13px] font-black text-teal-900">
        🚉 <Rich text={next} />
      </div>
    </div>
  );
}
