// ============================================================
// kit33 — مكوّنات تفاعل الدرس 33 (THE PRESENT COMPASS)
// القواعد المشتركة: لا كشف للإجابات قبل فعل المتعلّم، Slate ثابت،
// تركيز مرئي عبر FOCUS33، وكل الخيارات الإنجليزية تُعرض عبر LatinRuns.
// ============================================================

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import {
  TENSE_OPTIONS_33,
  type MatchRow33,
  type RightRow33,
  type Typed33,
  type Detective33,
  type TensePickRow33,
  type StorySeg33,
  type PhraseRow33,
  type BestRow33,
  type TenseGate33,
  type FormTable33,
} from "./data";

export const FOCUS33 =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/* ---------- التقرير الخام إلى شجرة الخطوات ---------- */
export type GateDriver33 = {
  complete: number;
  total: number;
  onDone: (done: boolean) => void;
};

export function useGate33(total: number): GateDriver33 {
  const [done, setDone] = useState(false);
  const onDone = useCallback((d: boolean) => {
    if (d) setDone(true);
  }, []);
  return useMemo<GateDriver33>(
    () => ({ complete: done ? total : 0, total, onDone }),
    [done, total, onDone]
  );
}

/* ---------- الخلفية العلمية ---------- */
export function Lab33({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-gradient-to-b from-amber-50/80 via-white to-rose-50/50 p-4 sm:p-6">
      {children}
      {source ? (
        <div className="mt-4 border-t border-amber-100 pt-2 text-[11px] leading-5 text-amber-700/80">
          📜 المصدر: <Rich text={source} />
        </div>
      ) : null}
    </div>
  );
}

export function Platform33({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 px-3 py-2 text-[12px] leading-6 text-amber-900">
      <span className="font-bold">🛠️ مثال تدريبي للمنصة — ليس من المصدر: </span>
      {typeof children === "string" ? <Rich text={children} /> : children}
    </div>
  );
}

export function Verdict33({ tone, children }: { tone: "good" | "warn" | "note"; children: ReactNode }) {
  const styles =
    tone === "good"
      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
      : tone === "warn"
        ? "border-rose-300 bg-rose-50 text-rose-900"
        : "border-amber-300 bg-amber-50 text-amber-900";
  return <div className={`mt-2 rounded-xl border px-3 py-2 text-[13px] leading-6 ${styles}`}>{typeof children === "string" ? <Rich text={children} /> : children}</div>;
}

export function Progress33({ complete, total }: { complete: number; total: number }) {
  const pct = total ? Math.round((complete / total) * 100) : 0;
  return (
    <div className="mb-3 flex items-center gap-2" aria-label="التقدم في التفاعل">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-amber-100">
        <div className="h-full rounded-full bg-gradient-to-l from-amber-600 to-rose-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11px] font-bold tabular-nums text-amber-800" aria-live="polite">
        <Rich text={`أنجزت ${complete} من ${total}`} />
      </span>
    </div>
  );
}

/* ---------- الغلاف: بوّابات الأزمنة ---------- */
export function CoverGates33({
  gates,
  drv,
}: {
  gates: { tense: string; formula: string; ar: string }[];
  drv: GateDriver33;
}) {
  const [open, setOpen] = useState<boolean[]>(() => gates.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === gates.length) drv.onDone(true);
  }, [count, gates.length, drv]);
  return (
    <div className="grid gap-2 sm:grid-cols-2" dir="ltr">
      {gates.map((g, i) => (
        <button
          key={g.tense}
          type="button"
          data-cover-gate={g.tense}
          onClick={() => {
            if (open[i]) return;
            const next = [...open];
            next[i] = true;
            setOpen(next);
          }}
          className={`${FOCUS33} rounded-2xl border-2 p-3 text-left transition ${
            open[i] ? "border-amber-500 bg-amber-50" : "border-amber-200 bg-white hover:border-amber-400"
          }`}
          aria-pressed={open[i]}
        >
          <div className="text-[13px] font-black text-amber-900">
            <En>{g.tense}</En>
          </div>
          {open[i] ? (
            <div className="mt-1 space-y-0.5">
              <div className="text-[12px] font-bold text-amber-700">
                <En>{g.formula}</En>
              </div>
              <div className="text-[12px] text-amber-800" dir="rtl">
                <Rich text={g.ar} />
              </div>
            </div>
          ) : (
            <div className="mt-1 text-[11px] text-amber-400" dir="rtl">
              <Rich text="المس لفتح البوّابة…" />
            </div>
          )}
        </button>
      ))}
      <div className="col-span-full">
        <Progress33 complete={count} total={gates.length} />
      </div>
    </div>
  );
}

/* ---------- الأهداف ---------- */
export function ObjectivesChecklist33({ items, drv }: { items: { n: string; text: string }[]; drv: GateDriver33 }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const count = checked.filter(Boolean).length;
  useEffect(() => {
    if (count === items.length) drv.onDone(true);
  }, [count, items.length, drv]);
  return (
    <div>
      <Progress33 complete={count} total={items.length} />
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={it.n}>
            <button
              type="button"
              data-objective={it.n}
              onClick={() => {
                const next = [...checked];
                next[i] = !next[i];
                setChecked(next);
              }}
              className={`${FOCUS33} flex w-full items-start gap-2 rounded-xl border-2 px-3 py-2 text-right transition ${
                checked[i] ? "border-amber-500 bg-amber-50" : "border-amber-200 bg-white hover:border-amber-400"
              }`}
              aria-pressed={checked[i]}
            >
              <span aria-hidden className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-black ${checked[i] ? "border-amber-600 bg-amber-600 text-white" : "border-amber-300 text-transparent"}`}>
                ✓
              </span>
              <span className="text-[13px] leading-6">
                <span className="mr-1 font-black text-amber-700">{it.n}.</span>
                <Rich text={it.text} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- s1: خريطة الأزمنة الأربعة ---------- */
export function TenseMap33({ gates, drv }: { gates: TenseGate33[]; drv: GateDriver33 }) {
  const [open, setOpen] = useState<boolean[]>(() => gates.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === gates.length) drv.onDone(true);
  }, [count, gates.length, drv]);
  return (
    <div>
      <Progress33 complete={count} total={gates.length} />
      <div className="grid gap-2">
        {gates.map((g, i) => (
          <button
            data-tense-gate={g.tense}
            key={g.tense}
            type="button"
            onClick={() => {
              if (open[i]) return;
              const next = [...open];
              next[i] = true;
              setOpen(next);
            }}
            className={`${FOCUS33} w-full rounded-2xl border-2 p-3 text-right transition ${
              open[i] ? "border-amber-500 bg-amber-50/70" : "border-amber-200 bg-white hover:border-amber-400"
            }`}
            aria-pressed={open[i]}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span dir="rtl" className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800"><Rich text={g.arTense} /></span>
              <span className="text-[13px] font-black text-amber-900" dir="ltr">
                <En>{g.tense}</En>
              </span>
            </div>
            {open[i] ? (
              <div className="mt-2 space-y-1">
                <div className="rounded-lg bg-white/80 px-2 py-1 text-[13px] font-bold text-emerald-900" dir="ltr">
                  <En>{g.ex}</En>
                </div>
                <div className="text-[12px] leading-6 text-amber-900"><Rich text={g.exAr} /></div>
                <div className="text-[12px] leading-6 text-amber-700">
                  <span className="font-black">الزاوية: </span>
                  <Rich text={g.angle} />
                </div>
              </div>
            ) : (
              <div className="mt-1 text-[11px] text-amber-400"><Rich text="المس لكشف المثال وزاوية النظر…" /></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- مطابقة: خيارات عربية (s2, s3, s14-part, s21, s24) ---------- */
export function MatchRows33({ rows, drv }: { rows: MatchRow33[]; drv: GateDriver33 }) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].pick);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress33 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} data-row={i} className="rounded-2xl border border-amber-200 bg-white p-3">
          <div className="mb-2 text-[13px] font-bold leading-6 text-amber-950" dir="auto">
            <LatinRuns text={row.prompt} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {row.options.map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && oi === row.pick;
              const isWrongPicked = chosen && oi !== row.pick;
              return (
                <button
                  key={oi}
                  type="button"
                  data-row={i} data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    const next = [...picks];
                    next[i] = oi;
                    setPicks(next);
                  }}
                  className={`${FOCUS33} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : chosen
                          ? "border-amber-500 bg-amber-50 text-amber-900"
                          : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                  }`}
                  aria-pressed={chosen}
                >
                  <span dir="auto">
                    <LatinRuns text={opt} />
                  </span>
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict33 tone="good">{row.why}</Verdict33> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- اختيار الزمن من 4 أسماء (s4, s17) ---------- */
export function TensePick33({
  rows,
  renderPrompt,
  drv,
}: {
  rows: (TensePickRow33 | PhraseRow33)[];
  renderPrompt?: (row: any, i: number) => ReactNode;
  drv: GateDriver33;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].pick);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress33 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-amber-200 bg-white p-3">
          <div className="mb-2 text-[13px] font-bold leading-6 text-amber-950">
            {renderPrompt ? renderPrompt(row, i) : (
              <span dir="auto">
                <LatinRuns text={(row as any).prompt ?? (row as any).phrase} />
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TENSE_OPTIONS_33.map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && oi === row.pick;
              const isWrongPicked = chosen && oi !== row.pick;
              return (
                <button
                  key={oi}
                  type="button"
                  data-row={i} data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    const next = [...picks];
                    next[i] = oi;
                    setPicks(next);
                  }}
                  className={`${FOCUS33} rounded-full border-2 px-2.5 py-1 text-[11px] font-bold transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : chosen
                          ? "border-amber-500 bg-amber-50 text-amber-900"
                          : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                  }`}
                  aria-pressed={chosen}
                >
                  <span dir="ltr">
                    <LatinRuns text={opt} />
                  </span>
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict33 tone="good">{row.why}</Verdict33> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- الجملة السليمة من بين خيارات إنجليزية (s6, s8, s9, s10, s11, s19) ---------- */
export function RightPick33({ rows, drv }: { rows: RightRow33[]; drv: GateDriver33 }) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].correct);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress33 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-amber-200 bg-white p-3">
          <div className="mb-2 text-[12px] font-black text-amber-800">
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
                  data-row={i} data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    const next = [...picks];
                    next[i] = oi;
                    setPicks(next);
                  }}
                  className={`${FOCUS33} rounded-xl border-2 px-3 py-2 text-left text-[13px] font-bold leading-6 transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : chosen
                          ? "border-amber-500 bg-amber-50 text-amber-900"
                          : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                  }`}
                  aria-pressed={chosen}
                >
                  <span dir="ltr" className="block">
                    <LatinRuns text={opt} />
                  </span>
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict33 tone="good">{row.why}</Verdict33> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- استكشاف الجداول الأربعة (s5 أولًا) ---------- */
export function FormsExplorer33({ tables, drv }: { tables: FormTable33[]; drv: GateDriver33 }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() => tables.map((_, i) => i === 0));
  const count = seen.filter(Boolean).length;
  useEffect(() => {
    if (count === tables.length) drv.onDone(true);
  }, [count, tables.length, drv]);
  const t = tables[active];
  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-3">
      <Progress33 complete={count} total={tables.length} />
      <div className="mb-2 flex flex-wrap gap-1.5" role="tablist" aria-label="جداول الأزمنة الأربعة">
        {tables.map((tb, i) => (
          <button
            key={tb.tense}
            type="button"
            role="tab"
            data-form-tab={tb.tense}
            aria-selected={active === i}
            onClick={() => {
              setActive(i);
              if (!seen[i]) {
                const next = [...seen];
                next[i] = true;
                setSeen(next);
              }
            }}
            className={`${FOCUS33} rounded-full border-2 px-2.5 py-1 text-[11px] font-bold transition ${
              active === i ? "border-amber-600 bg-amber-600 text-white" : seen[i] ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
            }`}
          >
            <span dir="ltr">
              <En>{tb.tense.replace("Present ", "P. ")}</En>
            </span>
            {seen[i] ? " ✓" : ""}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-[12px]" dir="ltr">
          <tbody>
            {(
              [
                ["تأكيد (+)", t.aff],
                ["نفي (−)", t.neg],
                ["سؤال (?)", t.q],
                ["جواب قصير", t.short],
              ] as const
            ).map(([lbl, val]) => (
              <tr key={lbl} className="border-b border-amber-100 last:border-0">
                <th scope="row" className="w-24 whitespace-nowrap px-2 py-2 text-right font-black text-amber-700" dir="rtl">
                  <Rich text={lbl} />
                </th>
                <td className="px-2 py-2 text-left font-bold text-emerald-900">
                  <En>{val}</En>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-[12px] leading-6 text-amber-900">
        <Rich text={t.note} />
      </div>
      <div className="mt-1 text-[11px] text-amber-500"><Rich text="استكشف الجداول الأربعة كلها لفتح القفل (العلامة ✓ تظهر فوق كل جدول رأيته)." /></div>
    </div>
  );
}

/* ---------- فرز الكلمات الدالة (s7) ---------- */
export function SignalSort33({
  buckets,
  words,
  drv,
}: {
  buckets: string[];
  words: { en: string; bucket: number; why: string }[];
  drv: GateDriver33;
}) {
  const [locks, setLocks] = useState<boolean[]>(() => words.map(() => false));
  const [wrong, setWrong] = useState<(number | null)[]>(() => words.map(() => null));
  const [picked, setPicked] = useState<number | null>(null);
  const count = locks.filter(Boolean).length;
  useEffect(() => {
    if (count === words.length) drv.onDone(true);
  }, [count, words.length, drv]);
  return (
    <div>
      <Progress33 complete={count} total={words.length} />
      <div className="mb-3 flex flex-wrap gap-1.5">
        {words.map((w, wi) => {
          if (locks[wi]) return null;
          const active = picked === wi;
          return (
            <button
              key={wi}
              type="button"
              data-signal-chip={wi}
              onClick={() => setPicked(active ? null : wi)}
              className={`${FOCUS33} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
                active ? "border-amber-600 bg-amber-600 text-white" : "border-amber-300 bg-white text-amber-900 hover:border-amber-500"
              }`}
              aria-pressed={active}
            >
              <span dir="ltr">
                <LatinRuns text={w.en} />
              </span>
            </button>
          );
        })}
        {picked === null && count < words.length ? (
          <span className="px-1 py-1.5 text-[11px] text-amber-500"><Rich text="اختر كلمة دالة ثم المس دلو الزمن…" /></span>
        ) : null}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {buckets.map((b, bi) => (
          <button
            key={bi}
            type="button"
            data-signal-bucket={bi}
            onClick={() => {
              if (picked === null || locks[picked]) return;
              if (bi === words[picked].bucket) {
                const lk = [...locks];
                lk[picked] = true;
                setLocks(lk);
              } else {
                const wr = [...wrong];
                wr[picked] = bi;
                setWrong(wr);
              }
              setPicked(null);
            }}
            className={`${FOCUS33} min-h-[72px] rounded-2xl border-2 border-dashed p-2 text-right transition ${
              picked === null ? "border-amber-200 bg-amber-50/40" : "border-amber-500 bg-amber-50 hover:border-amber-600"
            }`}
          >
            <div className="mb-1 text-[11px] font-black text-amber-800" dir="ltr">
              <En>{b}</En>
            </div>
            <div className="flex flex-wrap gap-1" dir="ltr">
              {words.map((w, wi) =>
                locks[wi] && w.bucket === bi ? (
                  <span key={wi} className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-900">
                    {w.en}
                  </span>
                ) : !locks[wi] && wrong[wi] === bi ? (
                  <span key={wi} className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-600">
                    {w.en} ✗
                  </span>
                ) : null
              )}
            </div>
          </button>
        ))}
      </div>
      {count > 0 ? (
        <div className="mt-2 space-y-1">
          {words.map((w, wi) =>
            locks[wi] ? (
              <div key={wi} className="text-[11px] leading-5 text-amber-800">
                <En>{w.en}</En> ← <Rich text={w.why} />
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
}

/* ---------- محقق اللمس (s12) ---------- */
export function TapFix33({ rounds, drv }: { rounds: Detective33[]; drv: GateDriver33 }) {
  const [stage, setStage] = useState(0);
  const [tapped, setTapped] = useState<number | null>(null);
  const [solved, setSolved] = useState(0);
  useEffect(() => {
    if (solved === rounds.length) drv.onDone(true);
  }, [solved, rounds.length, drv]);
  const cur = rounds[stage];
  return (
    <div>
      <Progress33 complete={solved} total={rounds.length} />
      <div data-tap-stage={stage} className="rounded-2xl border border-amber-200 bg-white p-3">
        <div className="mb-2 text-[12px] font-black text-amber-800"><Rich text={`القضية ${cur.n} — المس الكلمة الخاطئة`} /></div>
        <div className="flex flex-wrap gap-1.5" dir="ltr">
          {cur.segments.map((seg, si) => {
            const isTapped = tapped === si;
            const solvedRow = solved > stage;
            const showBad = solvedRow && si === cur.bad;
            const showFix = solvedRow && si === cur.bad;
            return (
              <button
                key={si}
                type="button"
                data-tap-seg={si}
                disabled={solvedRow}
                onClick={() => setTapped(si)}
                className={`${FOCUS33} rounded-lg border-2 px-2 py-1.5 text-[13px] font-bold transition ${
                  showBad
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : isTapped
                      ? si === cur.bad
                        ? "border-amber-500 bg-amber-100 text-amber-900"
                        : "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                }`}
              >
                <LatinRuns text={showFix ? cur.fix : seg} />
              </button>
            );
          })}
        </div>
        {tapped !== null && solved === stage ? (
          <div className="mt-3">
            <div className="mb-1 text-[12px] font-black text-amber-800"><Rich text="اختر التصحيح:" /></div>
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
                  className={`${FOCUS33} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold ${
                    solved > stage && opt === cur.fix
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : "border-amber-300 bg-white text-amber-900 hover:border-amber-500"
                  }`}
                >
                  <LatinRuns text={opt} />
                </button>
              ))}
            </div>
            {tapped !== cur.bad ? <Verdict33 tone="warn">ليست هذه الكلمة — ابحث عن الخطأ الحقيقي في الجملة.</Verdict33> : null}
          </div>
        ) : null}
        {solved > stage ? (
          <div>
            <Verdict33 tone="good">
              <LatinRuns text={[...cur.segments.slice(0, cur.bad), cur.fix, ...cur.segments.slice(cur.bad + 1)].join(" ")} />
              {" — "}
              {cur.why}
            </Verdict33>
            {stage + 1 < rounds.length ? (
              <button
                type="button"
                onClick={() => {
                  setStage(stage + 1);
                  setTapped(null);
                }}
                className={`${FOCUS33} mt-2 rounded-full border-2 border-amber-500 bg-amber-600 px-4 py-1.5 text-[12px] font-black text-white hover:bg-amber-700`}
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

/* ---------- الفراغات المكتوبة (s13, s14) ---------- */
export function normalizeTyped33(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.,!?؟]/g, "")
    .replace(/\s+/g, " ");
}

export function TypedFill33({ rows, drv, idPrefix }: { rows: Typed33[]; drv: GateDriver33; idPrefix?: string }) {
  const [vals, setVals] = useState<string[]>(() => rows.map(() => ""));
  const [ok, setOk] = useState<boolean[]>(() => rows.map(() => false));
  const [tried, setTried] = useState<boolean[]>(() => rows.map(() => false));
  const count = ok.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress33 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-amber-200 bg-white p-3">
          <div className="mb-1 text-[11px] font-black text-amber-700"><Rich text={`الفراغ ${row.n} — الفعل: `} /><En>({row.word})</En></div>
          <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
            <span className="text-[13px] font-bold text-amber-950">
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
              className={`${FOCUS33} w-40 rounded-lg border-2 px-2 py-1 text-[13px] font-bold text-amber-950 ${
                ok[i] ? "border-emerald-500 bg-emerald-50" : tried[i] ? "border-rose-300 bg-rose-50" : "border-amber-300 bg-white"
              }`}
              aria-label={`الفراغ ${row.n}`}
            />
            <span className="text-[13px] font-bold text-amber-950">
              <LatinRuns text={row.after} />
            </span>
            {!ok[i] ? (
              <button
                type="button"
                onClick={() => {
                  const good = row.accept.some((a) => normalizeTyped33(a) === normalizeTyped33(vals[i]));
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
                className={`${FOCUS33} rounded-full border-2 border-amber-500 bg-amber-600 px-3 py-1 text-[11px] font-black text-white hover:bg-amber-700`}
              >
                تحقّق
              </button>
            ) : (
              <span aria-hidden className="text-emerald-600">✓</span>
            )}
          </div>
          {ok[i] ? <Verdict33 tone="good">{row.why}</Verdict33> : tried[i] ? <Verdict33 tone="warn">ليست الصيغة المناسبة هنا — راجع الكلمة الدالة في الجملة وحاول مجددًا.</Verdict33> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- أفعال الحالة (s11) ---------- */
export function StativeGate33({ verbs, drv }: { verbs: { verb: string; ar: string }[]; drv: GateDriver33 }) {
  const [known, setKnown] = useState<boolean[]>(() => verbs.map(() => false));
  const count = known.filter(Boolean).length;
  useEffect(() => {
    if (count === verbs.length) drv.onDone(true);
  }, [count, verbs.length, drv]);
  return (
    <div>
      <Progress33 complete={count} total={verbs.length} />
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3" dir="ltr">
        {verbs.map((v, i) => (
          <button
            key={v.verb}
            type="button"
            data-gate={i}
            onClick={() => {
              if (known[i]) return;
              const next = [...known];
              next[i] = true;
              setKnown(next);
            }}
            className={`${FOCUS33} rounded-xl border-2 px-2 py-2 text-left transition ${
              known[i] ? "border-emerald-500 bg-emerald-50" : "border-amber-200 bg-white hover:border-amber-400"
            }`}
            aria-pressed={known[i]}
          >
            <div className="text-[13px] font-black text-amber-900">
              <En>{v.verb}</En>
            </div>
            <div className="text-[11px] text-amber-800" dir="rtl">
              <Rich text={v.ar} />
            </div>
            <div className="text-[10px] font-bold text-amber-500" dir="rtl">
              <Rich text="فعل حالة — بلا مستمر ✓" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- اصطياد العبارات الفعلية في القصة (s16) ---------- */
export function VerbHunt33({ story, total, drv }: { story: StorySeg33[]; total: number; drv: GateDriver33 }) {
  const [hits, setHits] = useState<Set<number>>(() => new Set());
  useEffect(() => {
    if (hits.size === total) drv.onDone(true);
  }, [hits.size, total, drv]);
  return (
    <div>
      <Progress33 complete={hits.size} total={total} />
      <p className="rounded-2xl border border-amber-200 bg-white p-4 text-[14px] font-medium leading-8 text-amber-950" dir="ltr">
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
              className={`${FOCUS33} mx-0.5 rounded-md px-1 transition ${
                hits.has(seg.hit)
                  ? "bg-emerald-200 font-black text-emerald-900"
                  : "bg-amber-100/70 text-amber-950 underline decoration-dotted decoration-amber-400 underline-offset-4 hover:bg-amber-200"
              }`}
              aria-pressed={hits.has(seg.hit)}
            >
              {seg.t}
            </button>
          ) : (
            <span key={i}>{seg.t} </span>
          )
        )}
      </p>
      <div className="mt-1 text-[11px] text-amber-600"><Rich text={`المس العبارات الفعلية الملوّنة (${total} عبارة) — العبارة المكتشفة تتحول إلى الأخضر.`} /></div>
    </div>
  );
}

/* ---------- إجابتان صحيحتان؟ (s15) ---------- */
export function IqBest33({ rows, options, drv }: { rows: BestRow33[]; options: string[]; drv: GateDriver33 }) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].pick);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-3">
      <Progress33 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-amber-200 bg-white p-3">
          <div className="mb-1 text-[12px] font-bold text-amber-900"><Rich text={`المعنى المطلوب: ${row.ar}`} /></div>
          <div className="mb-2 grid gap-1" dir="ltr">
            <div className="rounded-lg bg-amber-50 px-2 py-1 text-[13px] font-bold text-amber-950">
              <En>{row.a}</En>
            </div>
            <div className="rounded-lg bg-amber-50 px-2 py-1 text-[13px] font-bold text-amber-950">
              <En>{row.b}</En>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {options.map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && oi === row.pick;
              const isWrongPicked = chosen && oi !== row.pick;
              return (
                <button
                  key={oi}
                  type="button"
                  data-row={i} data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    const next = [...picks];
                    next[i] = oi;
                    setPicks(next);
                  }}
                  className={`${FOCUS33} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : chosen
                          ? "border-amber-500 bg-amber-50 text-amber-900"
                          : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                  }`}
                  aria-pressed={chosen}
                >
                  <Rich text={opt} />
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict33 tone="good">{row.why}</Verdict33> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- محقق الفقرة (s18) ---------- */
export function ParaDetect33({
  para,
  rows,
  corrected,
  drv,
}: {
  para: string;
  rows: { n: string; wrong: string; opts: string[]; fix: string; why: string }[];
  corrected: string;
  drv: GateDriver33;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p !== null && rows[i].opts[p as number] === rows[i].fix);
  const count = done.filter(Boolean).length;
  const all = count === rows.length;
  useEffect(() => {
    if (all) drv.onDone(true);
  }, [all, drv]);
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-3">
        <div className="mb-1 text-[11px] font-black text-amber-700"><Rich text="فقرة Emma كما وردت — العنوان يقول «عشرة أخطاء» والعدّ الدقيق أحد عشر موضعًا:" /></div>
        <p className="text-[13px] leading-7 text-amber-950" dir="ltr">
          <LatinRuns text={para} />
        </p>
      </div>
      <Progress33 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-amber-200 bg-white p-3">
          <div className="mb-2 flex flex-wrap items-baseline gap-2">
            <span className="text-[12px] font-black text-amber-800"><Rich text={`الموضع ${row.n}`} /></span>
            <span className="rounded-lg bg-rose-50 px-2 py-0.5 text-[12px] font-bold text-rose-700 line-through" dir="ltr">
              <LatinRuns text={row.wrong} />
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5" dir="ltr">
            {row.opts.map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && opt === row.fix;
              const isWrongPicked = chosen && opt !== row.fix;
              return (
                <button
                  key={oi}
                  type="button"
                  data-row={i} data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    const next = [...picks];
                    next[i] = oi;
                    setPicks(next);
                  }}
                  className={`${FOCUS33} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                  }`}
                  aria-pressed={chosen}
                >
                  <LatinRuns text={opt} />
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict33 tone="good">{row.why}</Verdict33> : null}
        </div>
      ))}
      {all ? (
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-4">
          <div className="mb-1 text-[12px] font-black text-emerald-800"><Rich text="✓ الفقرة بعد التصحيح (كما في حل المصدر):" /></div>
          <p className="text-[13px] font-bold leading-7 text-emerald-950" dir="ltr">
            <LatinRuns text={corrected} />
          </p>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- بطاقات قابلة للقلب (s20, s23) ---------- */
export function FlipCards33({
  cards,
  renderFace,
  renderBack,
  drv,
}: {
  cards: any[];
  renderFace: (c: any) => ReactNode;
  renderBack: (c: any) => ReactNode;
  drv: GateDriver33;
}) {
  const [flipped, setFlipped] = useState<boolean[]>(() => cards.map(() => false));
  const [touched, setTouched] = useState<boolean[]>(() => cards.map(() => false));
  const count = touched.filter(Boolean).length;
  useEffect(() => {
    if (count === cards.length) drv.onDone(true);
  }, [count, cards.length, drv]);
  return (
    <div>
      <Progress33 complete={count} total={cards.length} />
      <div className="grid gap-2 sm:grid-cols-2">
        {cards.map((c, i) => (
          <button
            key={i}
            type="button"
            data-flip-gate={c.level ?? String(i)}
            onClick={() => {
              const f = [...flipped];
              f[i] = !f[i];
              setFlipped(f);
              if (!touched[i]) {
                const t = [...touched];
                t[i] = true;
                setTouched(t);
              }
            }}
            className={`${FOCUS33} min-h-[96px] rounded-2xl border-2 p-3 text-right transition ${
              flipped[i] ? "border-amber-500 bg-amber-50" : "border-amber-200 bg-white hover:border-amber-400"
            }`}
            aria-pressed={flipped[i]}
          >
            {flipped[i] ? (
              <div className="text-[12px] leading-6 text-amber-900">{renderBack(c)}</div>
            ) : (
              <div className="text-[13px] font-black text-amber-900">{renderFace(c)}</div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-1 text-[11px] text-amber-500"><Rich text="المس كل بطاقة لقلبها — الزيارة الأولى لكل بطاقة تُحسب في التقدم." /></div>
    </div>
  );
}

/* ---------- مهمة الكتابة (s22) ---------- */
export function WriteMission33({
  checklist,
  model,
  min = 8,
  drv,
}: {
  checklist: string[];
  model: { en: string; ar: string }[];
  min?: number;
  drv: GateDriver33;
}) {
  const [checked, setChecked] = useState<boolean[]>(() => checklist.map(() => false));
  const [text, setText] = useState("");
  const sentences = (text.match(/[.!?]+/g) || []).length;
  const checkCount = checked.filter(Boolean).length;
  const ready = checkCount === checklist.length && sentences >= min;
  useEffect(() => {
    if (ready) drv.onDone(true);
  }, [ready, drv]);
  return (
    <div className="space-y-3">
      <Progress33 complete={checkCount + Math.min(sentences, min)} total={checklist.length + min} />
      <div className="rounded-2xl border border-amber-200 bg-white p-3">
        <div className="mb-1 text-[12px] font-black text-amber-800">قائمة تحقق الكاتب — علّم ما حقّقته في فقرتك:</div>
        <ul className="space-y-1.5">
          {checklist.map((c, i) => (
            <li key={i}>
              <button
                type="button"
                id={`wr-${i}`}
                onClick={() => {
                  const next = [...checked];
                  next[i] = !next[i];
                  setChecked(next);
                }}
                className={`${FOCUS33} flex w-full items-start gap-2 rounded-xl border px-3 py-1.5 text-right text-[12px] transition ${
                  checked[i] ? "border-emerald-400 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"
                }`}
                aria-pressed={checked[i]}
              >
                <span aria-hidden className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-black ${checked[i] ? "border-emerald-600 bg-emerald-600 text-white" : "border-amber-300 text-transparent"}`}>✓</span>
                <Rich text={c} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-white p-3">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span dir="rtl" className="text-[12px] font-black text-amber-800">
            فقرتك — <En>My Learning Journey</En>
            <span className={`mr-2 rounded-full px-2 py-0.5 text-[11px] font-black tabular-nums ${sentences >= min ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
              الجمل: {sentences}/{min}
            </span>
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          dir="ltr"
          rows={6}
          placeholder="My Learning Journey — write your 10 sentences…"
          className={`${FOCUS33} w-full rounded-xl border-2 border-amber-300 bg-white px-3 py-2 text-[13px] leading-6 text-amber-950 placeholder:text-amber-300`}
          aria-label="مساحة كتابة الفقرة"
        />
        <div className="mt-1 text-[11px] text-amber-500"><Rich text="اكتب عشر جمل بالإنجليزية على الأقل، ثم علّم البنود الستة المتحققة في فقرتك." /></div>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3">
        <div className="mb-1 text-[11px] font-black text-amber-700">مثال توجيهي (من إنشاء التمارين في المصدر) — لاحظ ترتيب الزوايا:</div>
        <div className="grid gap-1" dir="ltr">
          {model.map((m, i) => (
            <div key={i} className="rounded-lg bg-white px-2 py-1 text-[12px] font-bold text-amber-950">
              <En>{m.en}</En>
              <span className="mr-2 text-[11px] font-normal text-amber-600" dir="rtl">
                {" — "}
                {m.ar}
              </span>
            </div>
          ))}
        </div>
      </div>
      {ready ? <Verdict33 tone="good">رائع! فقرتك جاهزة — تأكد أنها تتحرك بين الزوايا الأربع: عادة ← جارٍ الآن ← إنجاز ← امتداد.</Verdict33> : null}
    </div>
  );
}

/* ---------- رفوف العرض الثابتة ---------- */
export function VariantsPanel33({ variants }: { variants: { ar: string; en: string }[] }) {
  return (
    <div className="mt-3 space-y-1.5">
      {variants.map((v, i) => (
        <div key={i} className="flex flex-wrap items-baseline gap-2 rounded-xl border border-amber-100 bg-white px-3 py-2">
          <span className="text-[12px] font-bold text-amber-900"><Rich text={v.ar} /></span>
          <span className="text-amber-400">←</span>
          <span className="text-[13px] font-bold text-emerald-900" dir="ltr">
            <En>{v.en}</En>
          </span>
        </div>
      ))}
      <div className="mt-1 rounded-lg bg-amber-50 px-3 py-2 text-[12px] leading-6 text-amber-900">
        <Rich text="السياق هو الذي يحدد الزمن، وليس شكل الجملة العربية وحده." />
      </div>
    </div>
  );
}

export function NotePanel33({ note }: { note: string }) {
  return (
    <div className="mt-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-[13px] leading-7 text-amber-950">
      <span className="font-black">📌 ملاحظة: </span>
      <Rich text={note} />
    </div>
  );
}

export function CourseMap33({ map }: { map: { system: string; done: string[] }[] }) {
  return (
    <div className="space-y-2">
      {map.map((sys, i) => (
        <div key={i} className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3">
          <div className="mb-1.5 text-[13px] font-black text-emerald-900"><Rich text={sys.system} /></div>
          <div className="flex flex-wrap gap-1.5" dir="ltr">
            {sys.done.map((t) => (
              <span key={t} className="rounded-full border border-emerald-300 bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-900">
                <LatinRuns text={t} /> ✓
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-3 text-[13px] font-black text-amber-900">
        🚉 المحطة القادمة: الدرس 34 — <LatinRuns text="Future Simple WILL" />
      </div>
    </div>
  );
}
