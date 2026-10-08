// ============================================================
// مكتبة تفاعلات الدرس 32 — مكوّنات قابلة لإعادة الاستخدام.
// كل مكوّن: لوحة مفاتيح كاملة · تركيز مرئي · تغذية فورية مع سبب (why) ·
// إعادة محاولة · حالة لا تعتمد على اللون وحده (✓ / ✕ / نص).
// ============================================================

import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { En, PlatformTag, Rich, type FrameAccent, type RoleStyle } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { normalizeTyped32 } from "./testData";

export const ACCENT32: FrameAccent = {
  step: "bg-emerald-700",
  badge: "bg-emerald-100 text-emerald-900",
  tip: "from-emerald-700 to-amber-600",
  shadow: "shadow-[0_16px_44px_-24px_rgba(4,120,87,0.45)]",
};

export const FOCUS32 = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 focus-visible:ring-offset-2";

/** أدوار القطع في الجملة — ألوان + تسمية عربية (اللون ليس الوسيلة الوحيدة) */
export const ROLE32: Record<string, RoleStyle> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", label: "الفاعل" },
  h: { chip: "bg-teal-100 border-teal-300 text-teal-900", label: "have / has" },
  b: { chip: "bg-amber-100 border-amber-300 text-amber-900", label: "been" },
  v: { chip: "bg-emerald-100 border-emerald-400 text-emerald-900", label: "verb-ing" },
  wh: { chip: "bg-indigo-100 border-indigo-300 text-indigo-900", label: "أداة السؤال" },
  n: { chip: "bg-rose-100 border-rose-300 text-rose-900", label: "not" },
  t: { chip: "bg-slate-200 border-slate-400 text-slate-900", label: "كلمة زمن" },
};

// ---------------------------------------------------------------
// عناصر أساسية
// ---------------------------------------------------------------

/** حاوية تجربة تفاعلية (Lab) بهوية الدرس 32 */
export function Lab32({ emoji, label, ar, seq, children }: { emoji: string; label: string; ar?: string; seq: string; children: ReactNode }) {
  return (
    <div data-en-seq={seq} className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50/70 p-3.5 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-emerald-100 bg-white px-3 py-2">
        <span className="text-xl" aria-hidden>{emoji}</span>
        <span dir="ltr" className="ltr-pair inline-flex flex-wrap items-center gap-2">
          <span dir="ltr" className="font-en text-[11px] font-black uppercase tracking-[0.16em] text-emerald-800">{label}</span>
          {ar && <span dir="rtl" className="text-sm font-bold text-slate-600"><LatinRuns text={ar} /></span>}
        </span>
      </div>
      {children}
    </div>
  );
}

/** شرح من المنصة — يُوسم دائمًا «Platform Explanation». */
export function Platform32({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-3xl border-2 border-amber-300 bg-amber-50 p-3.5">
      <div dir="ltr" className="ltr-pair flex flex-wrap items-center gap-2">
        <PlatformTag />
      </div>
      <div className="text-sm font-bold leading-relaxed text-slate-800"><Rich text={String(children ?? "")} /></div>
    </div>
  );
}

/** تغذية راجعة فورية: ✓ أو ✕ مع نص وسبب (why) — بدون لون وحده */
export function Verdict32({ ok, text, why }: { ok: boolean; text?: string; why?: string }) {
  return (
    <div role="status" aria-live="polite" className={`flex flex-wrap items-center gap-2 rounded-2xl border-2 p-2.5 text-sm font-bold ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-800"}`}>
      <span aria-hidden className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-black text-white ${ok ? "bg-emerald-600" : "bg-rose-500"}`}>{ok ? "✓" : "✕"}</span>
      {text && <span className="min-w-0 flex-1"><Rich text={text} /></span>}
      {why && (
        <span className="w-full rounded-xl bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
          <span className="ms-1 inline-block"><PlatformTag /></span> <Rich text={why} />
        </span>
      )}
    </div>
  );
}

/** شريط تقدم داخل التفاعل */
export function Progress32({ done, total, label }: { done: number; total: number; label: string }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-xs font-black text-emerald-900"><Rich text={`${label} ${done}/${total}`} /></span>
      <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={label} className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-emerald-100">
        <div className="h-2 rounded-full bg-emerald-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** جملة إنجليزية مع فراغ «___» (LTR). قبل الملء: فراغ بارز؛ بعده: الجملة كاملة بلا فواصل زائدة */
function StemLine({ parts, filled }: { parts: string[]; filled: string | null }) {
  const sentence = parts.map((p) => (p === "___" ? (filled ?? "___") : p)).join(" ").replace(/ ([.?,!])/g, "$1");
  if (filled) {
    return (
      <div dir="ltr" className="ltr-row text-base font-bold text-slate-800 md:text-lg">
        <En>{sentence}</En>
      </div>
    );
  }
  return (
    <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-1.5 text-base font-bold text-slate-800 md:text-lg">
      {parts.map((p, i) => (p === "___" ? <span key={i} className="inline-block min-w-[6rem] rounded-xl border-2 border-dashed border-emerald-400 bg-white px-3 py-1 text-center text-sm text-emerald-700">?</span> : <En key={i}>{p}</En>))}
    </div>
  );
}

// ---------------------------------------------------------------
// 1) بناء الجملة من القطع بالترتيب — BlockBuilder32
// ---------------------------------------------------------------
type Tok = { text: string; role: string };
export function BlockBuilder32({ seq, rounds, onDone }: { seq: string; rounds: { tokens: Tok[]; ar: string }[]; onDone?: () => void }) {
  const [r, setR] = useState(0);
  const [built, setBuilt] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; why?: string } | null>(null);
  const [finished, setFinished] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const round = rounds[r];
  const trayOrder = useMemo(() => {
    const idx = round.tokens.map((_, i) => i);
    const k = Math.max(1, Math.floor(idx.length / 2));
    return [...idx.slice(k), ...idx.slice(0, k)];
  }, [round]);
  const tray = trayOrder.filter((i) => !built.includes(i));
  const complete = built.length === round.tokens.length;

  const tap = (i: number) => {
    if (complete) return;
    const expectedPos = built.length;
    if (i === expectedPos) {
      setBuilt([...built, i]);
      setMsg({ ok: true, text: `✓ ${round.tokens[i].text}` });
      if (built.length + 1 === round.tokens.length) setFinished(true);
    } else {
      const want = round.tokens[expectedPos];
      setMsg({ ok: false, text: "هذه القطعة في مكان آخر. الترتيب الصحيح:", why: `القطعة التالية: ${ROLE32[want.role]?.label ?? ""} (${want.text})` });
    }
  };
  const next = () => {
    if (r + 1 < rounds.length) {
      setR(r + 1);
      setBuilt([]);
      setFinished(false);
      setMsg(null);
    } else {
      setAllDone(true);
      onDone?.();
    }
  };
  const reset = () => { setBuilt([]); setFinished(false); setMsg(null); };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-black text-emerald-900"><Rich text={`الجملة ${r + 1} من ${rounds.length}`} /></span>
        <span className="text-xs font-bold text-slate-500"><Rich text={`المعنى: ${round.ar}`} /></span>
      </div>
      <div dir="ltr" className="ltr-row min-h-[3.25rem] rounded-2xl border-2 border-dashed border-emerald-300 bg-white p-2">
        {built.length === 0 ? (
          <span className="block p-2 text-center text-sm font-bold text-slate-400"><Rich text="المس القطع بالترتيب لتبني الجملة…" /></span>
        ) : (
          <div className="flex flex-wrap items-end gap-1.5">
            {built.map((i, p) => (
              <span key={p} className={`inline-flex items-center rounded-xl border-2 px-2.5 py-1.5 font-en text-base font-extrabold ${ROLE32[round.tokens[i].role]?.chip ?? ""}`}>{round.tokens[i].text}</span>
            ))}
          </div>
        )}
      </div>
      {!complete && (
        <div className="flex flex-wrap gap-2" aria-label="قطع الجملة">
          {tray.map((i) => (
            <button key={i} type="button" onClick={() => tap(i)} data-block-token={i} dir="ltr"
              className={`font-en rounded-xl border-2 px-3 py-2 text-base font-extrabold transition active:scale-95 ${ROLE32[round.tokens[i].role]?.chip ?? "bg-white border-slate-300"} ${FOCUS32}`}>
              {round.tokens[i].text}
            </button>
          ))}
        </div>
      )}
      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}
      <div className="flex flex-wrap items-center gap-2">
        {!finished && built.length > 0 && <button type="button" onClick={reset} className={`rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600 hover:bg-slate-200 ${FOCUS32}`}>↺ إعادة الترتيب</button>}
        {finished && !allDone && (
          <button type="button" onClick={next} className={`rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white hover:bg-emerald-800 ${FOCUS32}`}>
            {r + 1 < rounds.length ? "الجملة التالية ←" : "✓ إنهاء التمرين"}
          </button>
        )}
        {allDone && <span className="text-sm font-black text-emerald-800"><Rich text="✓ أحسنت — أتممت التمرين" /></span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 2) بطاقات الأجزاء — FlipParts32 (المس = اكشف الدور)
// ---------------------------------------------------------------
export function FlipParts32({ seq, parts, onDone }: { seq: string; parts: { text: string; role: string; back: string }[]; onDone?: () => void }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    const n = new Set(open);
    n.add(i);
    setOpen(n);
    if (n.size === parts.length) onDone?.();
  };
  return (
    <div className="space-y-3">
      <Progress32 done={open.size} total={parts.length} label="الأجزاء المكشوفة" />
      <div dir="ltr" className="ltr-row grid gap-2.5 sm:grid-cols-2">
        {parts.map((p, i) => {
          const seen = open.has(i);
          return (
            <button key={i} type="button" onClick={() => toggle(i)} aria-expanded={seen} data-flip={i}
              className={`group rounded-2xl border-2 p-3 text-start transition active:scale-[0.99] ${ROLE32[p.role]?.chip ?? "border-slate-200 bg-white"} ${FOCUS32}`}>
              <span className="block font-en text-lg font-black">{p.text}</span>
              {seen ? (
                <span dir="rtl" className="mt-1.5 block rounded-xl bg-white/80 px-2.5 py-1.5 text-sm font-bold text-slate-800"><Rich text={p.back} /></span>
              ) : (
                <span dir="rtl" className="mt-1.5 block text-xs font-bold opacity-70"><Rich text="المس لتكشف دورها ↻" /></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 3) فرز في أبواب/أكياس — SortBuckets32 (سحب وإفلات + لوحة مفاتيح)
// ---------------------------------------------------------------
export function SortBuckets32({ seq, items, buckets, onDone, itemLabel }: {
  seq: string;
  items: { text: string; bucket: number; why: string }[];
  buckets: { label: string; tone: string }[];
  onDone?: () => void;
  itemLabel?: string;
}) {
  const [placed, setPlaced] = useState<Record<number, number>>({});
  const [sel, setSel] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; why?: string } | null>(null);
  const doneRef = useRef(false);
  const remaining = items.map((_, i) => i).filter((i) => placed[i] === undefined);

  const place = (i: number, b: number) => {
    if (placed[i] !== undefined) return;
    const it = items[i];
    if (it.bucket === b) {
      const next = { ...placed, [i]: b };
      setPlaced(next);
      setSel(null);
      setMsg({ ok: true, text: `✓ ${it.text}`, why: it.why });
      if (Object.keys(next).length === items.length && !doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
    } else {
      setMsg({ ok: false, text: `✕ ${it.text} — ليس هذا الباب.`, why: it.why });
    }
  };

  const onBucketKey = (e: KeyboardEvent, b: number) => {
    if ((e.key === "Enter" || e.key === " ") && sel !== null) {
      e.preventDefault();
      place(sel, b);
    }
  };

  return (
    <div className="space-y-3">
      <Progress32 done={Object.keys(placed).length} total={items.length} label="المصنّف" />
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label={itemLabel ?? "الأبواب"}>
        {buckets.map((bk, b) => {
          const inside = items.map((it, i) => ({ it, i })).filter(({ i }) => placed[i] === b);
          return (
            <div key={b} data-bucket={b}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const i = Number(e.dataTransfer.getData("text/plain")); if (!Number.isNaN(i)) place(i, b); }}
              className={`min-h-[7rem] rounded-2xl border-2 border-dashed p-2.5 ${bk.tone}`}>
              <button type="button" onClick={() => sel !== null && place(sel, b)} onKeyDown={(e) => onBucketKey(e, b)}
                aria-label={`ضع العنصر المحدد في: ${bk.label}`}
                className={`w-full rounded-xl bg-white/80 px-2 py-1.5 text-start text-sm font-black text-slate-800 ${FOCUS32}`}>
                <Rich text={bk.label} />
                {sel !== null && <span className="ms-2 text-xs font-bold text-emerald-700">← ضع هنا</span>}
              </button>
              <div dir="ltr" className="mt-2 flex flex-wrap gap-1.5">
                {inside.map(({ it, i }) => (
                  <span key={i} className="font-en rounded-lg bg-white px-2 py-1 text-sm font-extrabold text-emerald-900 shadow-sm">✓ {it.text}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2" aria-label="عناصر للفرز">
        {remaining.map((i) => {
          const isSel = sel === i;
          return (
            <button key={i} type="button" draggable data-sort-item={i} dir="ltr" aria-pressed={isSel}
              onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
              onClick={() => setSel(isSel ? null : i)}
              className={`font-en cursor-grab rounded-xl border-2 px-3 py-2 text-base font-extrabold transition active:scale-95 ${isSel ? "border-emerald-600 bg-emerald-600 text-white ring-2 ring-emerald-300" : "border-emerald-200 bg-white text-slate-800 hover:border-emerald-400"} ${FOCUS32}`}>
              {items[i].text}
            </button>
          );
        })}
      </div>
      <p className="text-xs font-bold text-slate-500"><Rich text="اسحب العنصر إلى الباب، أو اختره بالنقر ثم انقر الباب. (لوحة المفاتيح: Enter)" /></p>
      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}
    </div>
  );
}

// ---------------------------------------------------------------
// 4) ملء الفراغ باختيار — SlotPick32 (جولات)
// ---------------------------------------------------------------
export type SlotOpt32 = { text: string; ok: boolean; why: string };
export type SlotRound32 = { stem: string[]; options: SlotOpt32[] };
export function SlotPick32({ seq, rounds, variant = "ruler", onDone }: { seq: string; rounds: SlotRound32[]; variant?: "ruler" | "flag"; onDone?: () => void }) {
  const [r, setR] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; why: string } | null>(null);
  const [filled, setFilled] = useState<string | null>(null);
  const [allDone, setAllDone] = useState(false);
  const round = rounds[r];
  const pick = (o: SlotOpt32) => {
    if (filled) return;
    if (o.ok) {
      setFilled(o.text);
      setMsg({ ok: true, text: `✓ ${o.text}`, why: o.why });
    } else {
      setMsg({ ok: false, text: `✕ ${o.text}`, why: o.why });
    }
  };
  const next = () => {
    if (r + 1 < rounds.length) {
      setR(r + 1);
      setFilled(null);
      setMsg(null);
    } else {
      setAllDone(true);
      onDone?.();
    }
  };
  const ruler = variant === "ruler";
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-black text-emerald-900">
        <span><Rich text={`الجولة ${r + 1} من ${rounds.length}`} /></span>
        <span aria-hidden>{ruler ? "📏 مسطرة المدة" : "🚩 نقطة البداية"}</span>
      </div>
      <div className={`rounded-2xl border-2 p-3 ${ruler ? "border-amber-300 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_23px,rgba(180,83,9,0.18)_23px,rgba(180,83,9,0.18)_24px)] bg-amber-50/60" : "border-sky-300 bg-[linear-gradient(90deg,transparent_0,transparent_calc(100%-2px),rgba(3,105,161,0.25)_calc(100%-2px))] bg-sky-50/60"}`}>
        <StemLine parts={round.stem} filled={filled} />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="الخيارات">
        {round.options.map((o, i) => (
          <button key={i} type="button" onClick={() => pick(o)} disabled={!!filled} data-slot-opt={i} dir="ltr"
            className={`font-en rounded-xl border-2 px-3.5 py-2 text-base font-extrabold transition active:scale-[0.98] ${filled ? (o.ok && filled === o.text ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-400") : "border-slate-200 bg-white text-slate-800 hover:border-emerald-400"} ${FOCUS32}`}>
            {o.text}
          </button>
        ))}
      </div>
      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}
      {filled && !allDone && (
        <button type="button" onClick={next} className={`rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white hover:bg-emerald-800 ${FOCUS32}`}>
          {r + 1 < rounds.length ? "الجولة التالية ←" : "✓ إنهاء التمرين"}
        </button>
      )}
      {allDone && <p className="text-sm font-black text-emerald-800"><Rich text="✓ أحسنت — أتممت التمرين" /></p>}
    </div>
  );
}

// ---------------------------------------------------------------
// 5) صفوف اختيار — PerRow32 (زوج/زاوية/صح-خطأ بصيغة اختيار واحد)
// ---------------------------------------------------------------
export type Row32 = { stem: string; opts: string[]; answer: number; why: string };
export function PerRow32({ seq, rows, onDone, labels }: { seq: string; rows: Row32[]; onDone?: () => void; labels?: string[] }) {
  const [state, setState] = useState<{ picked: number | null; ok: boolean }[]>(() => rows.map(() => ({ picked: null, ok: false })));
  const solved = state.filter((s) => s.ok).length;
  const fired = useRef(false);
  const pick = (ri: number, oi: number) => {
    if (state[ri].ok) return;
    const ok = oi === rows[ri].answer;
    const next = state.map((s, i) => (i === ri ? { picked: oi, ok } : s));
    setState(next);
    if (next.every((s) => s.ok) && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  };
  return (
    <div className="space-y-3">
      <Progress32 done={solved} total={rows.length} label="الصفوف المحلولة" />
      {rows.map((row, ri) => {
        const st = state[ri];
        return (
          <div key={ri} className={`rounded-2xl border-2 p-3 ${st.ok ? "border-emerald-300 bg-emerald-50/50" : st.picked !== null ? "border-rose-200 bg-rose-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex items-start gap-2">
              {labels?.[ri] && <span className="shrink-0 rounded-lg bg-emerald-700 px-2 py-0.5 text-xs font-black text-white">{labels[ri]}</span>}
              <div className="min-w-0 flex-1 text-base font-bold text-slate-800 md:text-lg">
                <Rich text={row.stem} />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`الخيارات: ${row.stem}`}>
              {row.opts.map((o, oi) => {
                const isPicked = st.picked === oi;
                const cls = st.ok && oi === row.answer
                  ? "border-emerald-500 bg-emerald-600 text-white"
                  : isPicked && !st.ok
                    ? "border-rose-400 bg-rose-100 text-rose-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400";
                return (
                  <button key={oi} type="button" onClick={() => pick(ri, oi)} disabled={st.ok} aria-pressed={isPicked} data-row={ri} data-row-opt={oi}
                    className={`rounded-xl border-2 px-3 py-1.5 text-start text-sm font-bold transition active:scale-[0.98] ${cls} ${FOCUS32}`}>
                    <Rich text={o} />
                  </button>
                );
              })}
            </div>
            {st.picked !== null && (
              <div className="mt-2">
                <Verdict32 ok={st.ok} text={st.ok ? "صحيح" : "ليس هذا — حاول مرة أخرى"} why={row.why} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------
// 6) صيد الخطأ ثم الإصلاح — TapFix32 (المس الجزء الخاطئ ثم اختر الإصلاح)
// ---------------------------------------------------------------
export type Fix32 = { segments: string[]; bad: number[]; fixOpts: string[]; fix: string; why: string };
export function TapFix32({ seq, items, onDone }: { seq: string; items: Fix32[]; onDone?: () => void }) {
  const [sel, setSel] = useState<Record<number, boolean>>({});
  const [fixed, setFixed] = useState<Record<number, string>>({});
  const [msg, setMsg] = useState<{ item: number; ok: boolean; text: string; why: string } | null>(null);
  const fired = useRef(false);
  const count = Object.keys(fixed).length;

  const tapSeg = (ii: number, si: number) => {
    if (fixed[ii] !== undefined) return;
    const it = items[ii];
    if (it.bad.includes(si)) {
      setSel({ ...sel, [ii]: true });
      setMsg(null);
    } else {
      setMsg({ item: ii, ok: false, text: "هذه القطعة صحيحة — ابحث عن الجزء الخاطئ.", why: "انظر إلى الكلمة بعد been، وإلى الفاعل وhave/has." });
    }
  };
  const chooseFix = (ii: number, opt: string) => {
    const it = items[ii];
    if (opt === it.fix) {
      const nextFixed = { ...fixed, [ii]: opt };
      setFixed(nextFixed);
      setSel({ ...sel, [ii]: false });
      setMsg({ item: ii, ok: true, text: "✓ تم الإصلاح", why: it.why });
      if (Object.keys(nextFixed).length === items.length && !fired.current) {
        fired.current = true;
        onDone?.();
      }
    } else {
      setMsg({ item: ii, ok: false, text: `✕ «${opt}» ليس الإصلاح الصحيح — جرّب مرة أخرى.`, why: it.why });
    }
  };
  const corrected = (it: Fix32, opt: string) => {
    const lo = Math.min(...it.bad);
    const hi = Math.max(...it.bad);
    return [...it.segments.slice(0, lo), opt, ...it.segments.slice(hi + 1)].join(" ");
  };
  return (
    <div className="space-y-3">
      <Progress32 done={count} total={items.length} label="الملفات المحلولة" />
      {items.map((it, ii) => {
        const isFixed = fixed[ii] !== undefined;
        return (
          <div key={ii} className={`rounded-2xl border-2 p-3 ${isFixed ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white"}`}>
            <div className="mb-1.5 text-xs font-black text-slate-500"><Rich text={`الملف ${ii + 1}`} /></div>
            <div dir="ltr" className="ltr-row flex flex-wrap gap-1.5" role="group" aria-label={`كلمات الجملة ${ii + 1}`}>
              {it.segments.map((s, si) => {
                const isBad = it.bad.includes(si) && !isFixed;
                const active = sel[ii] && isBad;
                return (
                  <button key={si} type="button" onClick={() => tapSeg(ii, si)} disabled={isFixed} data-fix-seg={`${ii}-${si}`}
                    className={`font-en rounded-lg border-2 px-2.5 py-1.5 text-base font-bold transition active:scale-95 ${active ? "border-rose-500 bg-rose-600 text-white" : isFixed ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-slate-50 text-slate-800 hover:border-rose-300"} ${FOCUS32}`}>
                    {s}
                  </button>
                );
              })}
            </div>
            {sel[ii] && !isFixed && (
              <div className="mt-2 space-y-2">
                <p className="text-xs font-black text-rose-700"><Rich text="اختر الإصلاح:" /></p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="خيارات الإصلاح">
                  {it.fixOpts.map((o) => (
                    <button key={o} type="button" onClick={() => chooseFix(ii, o)} data-fix-opt={o} dir="ltr"
                      className={`font-en rounded-xl border-2 border-sky-300 bg-white px-3 py-1.5 text-sm font-extrabold text-sky-900 hover:bg-sky-50 ${FOCUS32}`}>{o}</button>
                  ))}
                </div>
              </div>
            )}
            {isFixed && (
              <div dir="ltr" className="ltr-row mt-2 rounded-xl bg-white p-2 font-en text-base font-extrabold text-emerald-900">✓ {corrected(it, fixed[ii])}</div>
            )}
            {msg && msg.item === ii && <div className="mt-2"><Verdict32 ok={msg.ok} text={msg.text} why={msg.why} /></div>}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------
// 7) كتابة الصيغة — TypedFill32
// ---------------------------------------------------------------
export type Typed32 = { prompt: string; hint?: string; accept: string[]; why: string };
export function TypedFill32({ seq, items, onDone }: { seq: string; items: Typed32[]; onDone?: () => void }) {
  const [vals, setVals] = useState<string[]>(() => items.map(() => ""));
  const [status, setStatus] = useState<("idle" | "ok" | "no")[]>(() => items.map(() => "idle"));
  const fired = useRef(false);
  const solved = status.filter((s) => s === "ok").length;
  const check = (i: number) => {
    const got = normalizeTyped32(vals[i]);
    const ok = items[i].accept.some((a) => normalizeTyped32(a) === got);
    const next = status.map((s, k) => (k === i ? (ok ? "ok" : "no") : s)) as ("idle" | "ok" | "no")[];
    setStatus(next);
    if (next.every((s) => s === "ok") && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  };
  return (
    <div className="space-y-3">
      <Progress32 done={solved} total={items.length} label="الإجابات الصحيحة" />
      {items.map((it, i) => {
        const st = status[i];
        return (
          <div key={i} className={`rounded-2xl border-2 p-3 ${st === "ok" ? "border-emerald-300 bg-emerald-50/50" : st === "no" ? "border-rose-200 bg-rose-50/40" : "border-slate-200 bg-white"}`}>
            <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-2">
              <En className="text-base font-bold text-slate-800 md:text-lg">{it.prompt}</En>
              {it.hint && <En className="text-sm font-bold text-slate-500">{it.hint}</En>}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor={`${seq}-typed-${i}`}>الإجابة للجملة {i + 1}</label>
              <input
                id={`${seq}-typed-${i}`}
                dir="ltr"
                value={vals[i]}
                disabled={st === "ok"}
                onChange={(e) => { const v = [...vals]; v[i] = e.target.value; setVals(v); if (st !== "idle") setStatus(status.map((s, k) => (k === i ? "idle" : s)) as ("idle" | "ok" | "no")[]); }}
                onKeyDown={(e) => { if (e.key === "Enter" && vals[i].trim()) check(i); }}
                placeholder="اكتب الإجابة بالإنجليزية"
                className={`font-en min-w-0 flex-1 rounded-xl border-2 bg-white px-3 py-2 text-base font-bold outline-none focus:border-emerald-500 ${st === "ok" ? "border-emerald-400" : st === "no" ? "border-rose-300" : "border-slate-200"}`}
              />
              <button type="button" onClick={() => check(i)} disabled={!vals[i].trim() || st === "ok"}
                className={`rounded-xl bg-emerald-700 px-3.5 py-2 text-sm font-black text-white transition enabled:hover:bg-emerald-800 disabled:opacity-40 ${FOCUS32}`}>
                تحقّق
              </button>
            </div>
            {st === "ok" && <div className="mt-2"><Verdict32 ok text="صحيح" why={it.why} /></div>}
            {st === "no" && <div className="mt-2"><Verdict32 ok={false} text="ليس تمامًا — راجع الزمن ثم أعد المحاولة." why={it.why} /></div>}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------
// 8) أدلة مرئية ← الجملة التي تفسّرها — EvidenceCases32
// ---------------------------------------------------------------
export type Case32 = { scene: string; title: string; clues: string[]; options: SlotOpt32[] };
export function EvidenceCases32({ seq, cases, onDone }: { seq: string; cases: Case32[]; onDone?: () => void }) {
  const [c, setC] = useState(0);
  const [clues, setClues] = useState<Record<string, boolean>>({});
  const [solved, setSolved] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; why: string } | null>(null);
  const fired = useRef(false);
  const cur = cases[c];
  const clueKey = (i: number) => `${c}-${i}`;
  const allClues = cur.clues.every((_, i) => !!clues[clueKey(i)]);
  const tapClue = (i: number) => setClues({ ...clues, [clueKey(i)]: true });
  const isClue = (i: number) => !!clues[clueKey(i)];
  const pick = (o: SlotOpt32) => {
    if (!allClues) return;
    if (o.ok) {
      const nextSolved = [...solved, c];
      setSolved(nextSolved);
      setMsg({ ok: true, text: `✓ ${o.text}`, why: o.why });
      if (nextSolved.length === cases.length && !fired.current) {
        fired.current = true;
        onDone?.();
      }
    } else {
      setMsg({ ok: false, text: `✕ ${o.text} — لا يفسّر الأدلة.`, why: o.why });
    }
  };
  const nextCase = () => { setC(c + 1); setMsg(null); };
  const isDone = solved.length === cases.length;
  return (
    <div className="space-y-3">
      <Progress32 done={solved.length} total={cases.length} label="المشاهد المفسَّرة" />
      <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
        <div className="flex items-start gap-3">
          <span aria-hidden className="text-4xl">{cur.scene}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-slate-700"><Rich text={`المشهد ${c + 1}: ${cur.title}`} /></p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="الأدلة">
              {cur.clues.map((cl, i) => (
                <button key={i} type="button" onClick={() => tapClue(i)} aria-pressed={isClue(i)} data-clue={i}
                  className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition ${isClue(i) ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-dashed border-slate-300 bg-slate-50 text-slate-700 hover:border-emerald-400"} ${FOCUS32}`}>
                  {isClue(i) ? "✓ " : "🔍 "}<Rich text={cl} />
                </button>
              ))}
            </div>
            {!allClues && <p className="mt-2 text-xs font-bold text-slate-500"><Rich text="المس كل الأدلة لتفعيل الاختيارات." /></p>}
          </div>
        </div>
      </div>
      {allClues && !isDone && solved.length === c && (
        <div className="space-y-2">
          <p className="text-xs font-black text-emerald-900"><Rich text="أي جملة تفسّر هذه الأدلة؟" /></p>
          <div className="flex flex-col gap-2" role="group" aria-label="الجمل المقترحة">
            {cur.options.map((o, i) => (
              <button key={i} type="button" onClick={() => pick(o)} data-case-opt={i} dir="ltr"
                className={`font-en rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2 text-start text-base font-bold text-slate-800 transition hover:border-emerald-400 ${FOCUS32}`}>
                {o.text}
              </button>
            ))}
          </div>
        </div>
      )}
      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}
      {msg?.ok && !isDone && (
        <button type="button" onClick={nextCase} className={`rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white hover:bg-emerald-800 ${FOCUS32}`}>المشهد التالي ←</button>
      )}
      {isDone && <p className="text-sm font-black text-emerald-800"><Rich text="✓ فسّرت كل المشاهد" /></p>}
    </div>
  );
}

// ---------------------------------------------------------------
// 9) شريط النشاط — RibbonMaker32 (المدة + النشاط + هل ما زال مستمرًا؟)
// ---------------------------------------------------------------
export function RibbonMaker32({ seq, activities, maxHours, onDone }: {
  seq: string;
  activities: { key: string; en: string; ar: string }[];
  maxHours: number;
  onDone?: () => void;
}) {
  const [hours, setHours] = useState(3);
  const [act, setAct] = useState(0);
  const [still, setStill] = useState(true);
  const [touched, setTouched] = useState<{ h: boolean; a: boolean; s: boolean }>({ h: false, a: false, s: false });
  const fired = useRef(false);
  const sentence = `I have been ${activities[act].en} for ${hours} ${hours === 1 ? "hour" : "hours"}.`;
  const mark = (k: "h" | "a" | "s") => {
    const next = { ...touched, [k]: true };
    setTouched(next);
    if (next.h && next.a && next.s && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  };
  const width = `${Math.round((hours / maxHours) * 100)}%`;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
        <div className="relative h-14 overflow-hidden rounded-xl bg-slate-50" aria-hidden>
          <div className="absolute inset-y-0 left-0 flex items-center rounded-l-xl bg-gradient-to-r from-amber-300 via-emerald-400 to-emerald-600 transition-all duration-500" style={{ width, minWidth: "2.5rem" } as CSSProperties}>
            <span className="l32-ribbon-flow absolute inset-0 opacity-40" />
          </div>
          <div className="absolute inset-y-0 end-0 flex items-center px-2 text-xs font-black text-slate-700">
            <span dir="ltr" className="font-en">NOW</span>
          </div>
          <div className="absolute inset-y-0 start-0 flex items-center px-2 text-xs font-black text-slate-700">
            <span dir="ltr" className="font-en">PAST</span>
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-slate-600"><Rich text="الشريط = النشاط الذي بدأ في الماضي وامتد إلى NOW. طوله يمثل المدة." /></p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block rounded-2xl border-2 border-slate-200 bg-white p-3">
          <span className="text-xs font-black text-slate-700"><Rich text={`المدة: ${hours} ${hours === 1 ? "ساعة" : "ساعات"}`} /></span>
          <input type="range" min={1} max={maxHours} step={1} value={hours} data-keynav-lock
            aria-label="المدة بالساعات" aria-valuetext={`${hours} hours`}
            onChange={(e) => { setHours(Number(e.target.value)); mark("h"); }}
            className="mt-2 w-full accent-emerald-600" />
        </label>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <span className="text-xs font-black text-slate-700"><Rich text="النشاط" /></span>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="النشاط">
            {activities.map((a, i) => (
              <button key={a.key} type="button" role="radio" aria-checked={act === i} onClick={() => { setAct(i); mark("a"); }}
                className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-extrabold transition ${act === i ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"} ${FOCUS32}`}>
                {a.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" aria-pressed={still} onClick={() => { setStill(!still); mark("s"); }}
          className={`rounded-xl border-2 px-3.5 py-2 text-sm font-black transition ${still ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-700"} ${FOCUS32}`}>
          {still ? "🏃 ما زال مستمرًا الآن" : "🛑 توقف قبل قليل، والأثر باقٍ"}
        </button>
        <span className="text-xs font-bold text-slate-500"><Rich text="الجملة واحدة في الحالتين — الواقع يتغيّر، والجملة لا تتغيّر (المصدر §18)." /></span>
      </div>

      <div dir="ltr" className="ltr-row rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3 text-center">
        <En className="text-lg font-black text-emerald-950 md:text-xl" >{sentence}</En>
      </div>
      <Progress32 done={Object.values(touched).filter(Boolean).length} total={3} label="جرّب الأزرار" />
    </div>
  );
}

// ---------------------------------------------------------------
// 10) استكشاف بطاقات — ExploreGrid32
// ---------------------------------------------------------------
export type Explore32 = { en: string; ar: string; ex: string; exAr: string; src: boolean };
export function ExploreGrid32({ seq, items, onDone }: { seq: string; items: Explore32[]; onDone?: () => void }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const fired = useRef(false);
  const toggle = (i: number) => {
    const n = new Set(open);
    n.add(i);
    setOpen(n);
    if (n.size === items.length && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  };
  return (
    <div className="space-y-3">
      <Progress32 done={open.size} total={items.length} label="الكلمات المكتشفة" />
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="الكلمات">
        {items.map((it, i) => {
          const seen = open.has(i);
          return (
            <button key={i} type="button" onClick={() => toggle(i)} aria-expanded={seen} data-explore={i}
              className={`rounded-2xl border-2 p-3 text-start transition active:scale-[0.99] ${seen ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-300"} ${FOCUS32}`}>
              <div className="flex items-center justify-between gap-2">
                <En className="text-base font-black text-slate-900">{it.en}</En>
                <span className="text-xs font-bold text-slate-500"><Rich text={it.ar} /></span>
              </div>
              {seen ? (
                <div className="mt-2 space-y-1">
                  <En className="block text-sm font-bold text-emerald-900">{it.ex}</En>
                  {it.exAr && <span className="block text-xs font-semibold text-slate-600"><Rich text={it.exAr} /></span>}
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-black ${it.src ? "bg-slate-100 text-slate-700" : "bg-amber-100 text-amber-900"}`}>
                    <Rich text={it.src ? "📜 من المصدر" : "🛠️ مثال تدريبي للمنصة — ليس من المصدر"} />
                  </span>
                </div>
              ) : (
                <span className="mt-2 block text-xs font-bold text-slate-400"><Rich text="المس لعرض المثال ↻" /></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 11) بوابة الأفعال — StativeGate32 (هل يعبر الفعل بوابة -ing؟)
// ---------------------------------------------------------------
export function StativeGate32({ seq, verbs, onDone }: { seq: string; verbs: { verb: string; ing: string; v3: string }[]; onDone?: () => void }) {
  const [tested, setTested] = useState<Set<number>>(new Set());
  const [cur, setCur] = useState<number | null>(null);
  const fired = useRef(false);
  const test = (i: number) => {
    setCur(i);
    const n = new Set(tested);
    n.add(i);
    setTested(n);
    if (n.size === verbs.length && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  };
  return (
    <div className="space-y-3">
      <Progress32 done={tested.size} total={verbs.length} label="الأفعال المختبرة" />
      <div className="flex flex-wrap gap-2" role="group" aria-label="أفعال الحالة">
        {verbs.map((v, i) => (
          <button key={v.verb} type="button" onClick={() => test(i)} aria-pressed={cur === i} data-gate={i} dir="ltr"
            className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-extrabold transition ${tested.has(i) ? "border-slate-300 bg-slate-100 text-slate-700" : "border-emerald-200 bg-white text-slate-800 hover:border-emerald-400"} ${FOCUS32}`}>
            {v.verb}
          </button>
        ))}
      </div>
      {cur !== null && (
        <div className="grid gap-2 sm:grid-cols-2" role="status" aria-live="polite">
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-3">
            <div className="text-xs font-black text-rose-800">✕ البوابة مغلقة</div>
            <En className="mt-1 block text-base font-bold text-rose-900 line-through decoration-rose-300">{`I have been ${verbs[cur].ing} for years.`}</En>
          </div>
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3">
            <div className="text-xs font-black text-emerald-800">✓ المرور الصحيح</div>
            <En className="mt-1 block text-base font-bold text-emerald-900">{`I have ${verbs[cur].v3} him for years.`}</En>
          </div>
        </div>
      )}
      {cur !== null && <p className="text-xs font-bold text-slate-600"><Rich text="المصدر يقول «عادةً» — هذه قاعدة الاستعمال الشائعة، ليست تحريمًا مطلقًا (انظر ملاحظة المعلم)." /></p>}
    </div>
  );
}

// ---------------------------------------------------------------
// 12) نقطة المرجع — ReferenceRail32 (شريط زمني بمؤشر قابل للسحب)
// ---------------------------------------------------------------
export type Snap32 = { key: string; at: number; label: string; tense: string; en: string; ar: string };
export function ReferenceRail32({ seq, snaps, onDone }: { seq: string; snaps: Snap32[]; onDone?: () => void }) {
  const ordered = useMemo(() => [...snaps].sort((a, b) => a.at - b.at), [snaps]);
  const [idx, setIdx] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);
  const go = (i: number) => {
    setIdx(i);
    const n = new Set(visited);
    n.add(i);
    setVisited(n);
    if (n.size === ordered.length && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  };
  const nearest = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return idx;
    const rect = el.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    let best = 0;
    ordered.forEach((s, i) => { if (Math.abs(s.at - f) < Math.abs(ordered[best].at - f)) best = i; });
    return best;
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); e.stopPropagation(); go(Math.max(0, idx - 1)); }
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); e.stopPropagation(); go(Math.min(ordered.length - 1, idx + 1)); }
  };
  const cur = ordered[idx];
  return (
    <div className="space-y-3">
      <Progress32 done={visited.size} total={ordered.length} label="نقاط المرجع المستكشفة" />
      <div data-keynav-lock className="rounded-2xl border-2 border-emerald-200 bg-white p-4">
        <div
          ref={trackRef}
          className="relative h-16 select-none"
          onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); go(nearest(e.clientX)); }}
          onPointerMove={(e) => { if (e.buttons === 1) { const n = nearest(e.clientX); if (n !== idx) go(n); } }}
        >
          <div className="absolute inset-x-0 top-7 h-2 rounded-full bg-gradient-to-r from-violet-300 via-amber-300 to-emerald-500" aria-hidden />
          <span dir="ltr" className="font-en absolute start-0 top-0 text-xs font-black text-slate-500">PAST</span>
          <span dir="ltr" className="font-en absolute end-0 top-0 text-xs font-black text-emerald-800">NOW</span>
          {ordered.map((s, i) => (
            <button key={s.key} type="button" onClick={() => go(i)} aria-label={`نقطة المرجع: ${s.label}`} data-snap={s.key}
              className={`absolute top-5 -translate-x-1/2 rounded-full border-2 border-white bg-white px-1.5 py-0.5 text-[11px] font-black shadow ${FOCUS32} ${i === idx ? "text-emerald-900" : "text-slate-500"}`}
              style={{ insetInlineStart: `${s.at * 100}%` }}>
              <span dir="ltr" className="font-en">{s.label.length > 14 ? "•" : s.label}</span>
            </button>
          ))}
          <div
            role="slider"
            tabIndex={0}
            aria-label="مؤشر نقطة المرجع"
            aria-valuemin={0}
            aria-valuemax={ordered.length - 1}
            aria-valuenow={idx}
            aria-valuetext={`${cur.label} — ${cur.tense}`}
            onKeyDown={onKey}
            className={`absolute top-3 h-10 w-10 -translate-x-1/2 rounded-full border-4 border-emerald-600 bg-emerald-500 shadow-lg transition-[inset-inline-start] duration-300 ${FOCUS32}`}
            style={{ insetInlineStart: `${cur.at * 100}%` }}
          />
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-[auto_1fr] sm:items-center">
          <span className="w-fit rounded-xl bg-emerald-700 px-3 py-1.5 text-sm font-black text-white">{cur.tense}</span>
          <div dir="ltr" className="ltr-row text-sm font-bold text-slate-800">
            <En className="block font-black">{cur.en}</En>
            <span dir="rtl" className="mt-0.5 block text-xs font-semibold text-slate-600"><Rich text={cur.ar} /></span>
          </div>
        </div>
      </div>
      <p className="text-xs font-bold text-slate-500"><Rich text="اسحب المؤشر، أو انقر النقطة، أو استعمل الأسهم (←/→) على المؤشر." /></p>
    </div>
  );
}

// ---------------------------------------------------------------
// 13) هل ما زال يركض؟ — StillRunning32
// ---------------------------------------------------------------
export function StillRunning32({ seq, en, states, note, onDone }: {
  seq: string;
  en: string;
  states: { key: string; label: string; ar: string; breath: boolean }[];
  note: string;
  onDone?: () => void;
}) {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [cur, setCur] = useState(states[0].key);
  const fired = useRef(false);
  const pick = (k: string) => {
    setCur(k);
    const n = new Set(seen);
    n.add(k);
    setSeen(n);
    if (n.size === states.length && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  };
  const running = cur === "still";
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="حالة الشخص">
        {states.map((s) => (
          <button key={s.key} type="button" onClick={() => pick(s.key)} aria-pressed={cur === s.key}
            className={`rounded-2xl border-2 p-3 text-start transition ${cur === s.key ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-emerald-400"} ${FOCUS32}`}>
            <span className="block text-sm font-black"><Rich text={s.label} /></span>
            <span className={`mt-1 block text-xs font-bold ${cur === s.key ? "text-emerald-50" : "text-slate-500"}`}><Rich text={s.ar} /></span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-around rounded-2xl border-2 border-emerald-200 bg-white p-4">
        <span aria-hidden className={`text-5xl ${running ? "l32-run" : ""}`}>{running ? "🏃" : "🧍"}</span>
        <div className="text-center">
          <En className="block text-lg font-black text-slate-900">{en}</En>
          <span className="mt-1 block text-xs font-bold text-emerald-800"><Rich text={states[0].breath ? "🫁 يلهث في الحالتين — الأثر ظاهر" : ""} /></span>
        </div>
      </div>
      <Platform32>{note}</Platform32>
    </div>
  );
}

// ---------------------------------------------------------------
// 14) معركة الزعيم — Boss32
// ---------------------------------------------------------------
export type BossItem32 = { en: string; answer: number; verb: string; why: string };
export function Boss32({ seq, items, gears, onDone }: { seq: string; items: BossItem32[]; gears: readonly string[]; onDone?: () => void }) {
  const [solved, setSolved] = useState<Record<number, { verb: string }>>({});
  const [wrong, setWrong] = useState<Record<number, boolean>>({});
  const fired = useRef(false);
  const hp = Math.round(((items.length - Object.keys(solved).length) / items.length) * 100);
  const hit = (i: number, g: number) => {
    if (solved[i]) return;
    if (g === items[i].answer) {
      const next = { ...solved, [i]: { verb: items[i].verb } };
      setSolved(next);
      setWrong({ ...wrong, [i]: false });
      if (Object.keys(next).length === items.length && !fired.current) {
        fired.current = true;
        onDone?.();
      }
    } else {
      setWrong({ ...wrong, [i]: true });
    }
  };
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-3">
        <div className="flex items-center justify-between text-xs font-black text-rose-900">
          <span><Rich text="🐉 صحة الزعيم" /></span>
          <span dir="ltr" className="font-en">{hp}%</span>
        </div>
        <div role="progressbar" aria-label="صحة الزعيم" aria-valuemin={0} aria-valuemax={100} aria-valuenow={hp} className="mt-1.5 h-3 overflow-hidden rounded-full bg-white">
          <div className="h-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500" style={{ width: `${hp}%` }} />
        </div>
      </div>
      {items.map((it, i) => {
        const done = solved[i];
        return (
          <div key={i} className={`rounded-2xl border-2 p-3 ${done ? "border-emerald-300 bg-emerald-50/50" : wrong[i] ? "border-rose-200 bg-rose-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-slate-500"><Rich text={`الضربة ${i + 1}`} /></span>
              <En className="text-base font-bold text-slate-800">{it.en}</En>
            </div>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`اختر الزمن للضربة ${i + 1}`}>
              {gears.map((g, gi) => (
                <button key={g} type="button" disabled={!!done} onClick={() => hit(i, gi)} data-gear={gi} dir="ltr"
                  className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-extrabold transition active:scale-95 ${done ? (gi === it.answer ? "border-emerald-500 bg-emerald-600 text-white" : "border-slate-200 bg-slate-50 text-slate-400") : "border-slate-300 bg-white text-slate-800 hover:border-amber-400"} ${FOCUS32}`}>
                  {g}
                </button>
              ))}
            </div>
            {done && <div className="mt-2"><Verdict32 ok text={`💥 ${it.verb}`} why={it.why} /></div>}
            {!done && wrong[i] && <div className="mt-2"><Verdict32 ok={false} text="🛡️ الزعيم صدّ الهجوم — جرّب زمنًا آخر." why={it.why} /></div>}
          </div>
        );
      })}
      {Object.keys(solved).length === items.length && <p className="text-sm font-black text-emerald-800"><Rich text="🏆 هُزم الزعيم — أتممت التحدي" /></p>}
    </div>
  );
}

// ---------------------------------------------------------------
// 15) تحليل الفقرة — VerbTap32
// ---------------------------------------------------------------
export function VerbTap32({ seq, parts, answers, why, onDone }: {
  seq: string;
  parts: { t: string; k?: number }[];
  answers: readonly string[];
  why: string[];
  onDone?: () => void;
}) {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [active, setActive] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; why: string } | null>(null);
  const fired = useRef(false);
  const choose = (k: number, opt: string) => {
    const ok = opt === answers[k];
    if (ok) {
      const next = { ...picked, [k]: opt };
      setPicked(next);
      setActive(null);
      setMsg({ ok: true, text: `✓ ${answers[k]}`, why: why[k] });
      if (Object.keys(next).length === answers.length && !fired.current) {
        fired.current = true;
        onDone?.();
      }
    } else {
      setMsg({ ok: false, text: `✕ ليس ${opt} لهذه العبارة — جرّب زمنًا آخر.`, why: why[k] });
    }
  };
  const phraseLabel = (k: number) => parts.find((p) => p.k === k)?.t ?? "";
  return (
    <div className="space-y-3">
      <Progress32 done={Object.keys(picked).length} total={answers.length} label="العبارات المحللة" />
      <div dir="ltr" className="ltr-row rounded-2xl border-2 border-slate-200 bg-white p-4 text-base leading-loose text-slate-800 md:text-lg">
        {parts.map((p, i) => p.k === undefined ? (
          <En key={i}>{p.t}</En>
        ) : (
          <button key={i} type="button" onClick={() => setActive(p.k!)} aria-pressed={active === p.k} disabled={picked[p.k!] !== undefined}
            className={`font-en mx-0.5 rounded-lg border-2 px-1.5 font-black transition ${picked[p.k!] !== undefined ? "border-emerald-400 bg-emerald-50 text-emerald-900" : active === p.k ? "border-amber-500 bg-amber-100 text-amber-900" : "border-dashed border-amber-400 bg-white text-slate-900 hover:bg-amber-50"} ${FOCUS32}`}>
            {p.t}
          </button>
        ))}
      </div>
      {active !== null && picked[active] === undefined && (
        <div className="space-y-2">
          <p className="text-xs font-black text-amber-900"><Rich text={`ما زمن العبارة: «${phraseLabel(active).trim()}»؟`} /></p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="اختيار الزمن">
            {["Present Perfect", "Present Perfect Continuous"].map((opt) => (
              <button key={opt} type="button" onClick={() => choose(active, opt)} data-tense-opt={opt} dir="ltr"
                className={`font-en rounded-xl border-2 border-slate-300 bg-white px-3 py-1.5 text-sm font-extrabold text-slate-800 hover:border-amber-500 ${FOCUS32}`}>{opt}</button>
            ))}
          </div>
        </div>
      )}
      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}
    </div>
  );
}

// ---------------------------------------------------------------
// 16) الخريطة — GearMap32 (أربعة تروس تُفعَّل بالنقر)
// ---------------------------------------------------------------
export function GearMap32({ seq, gears, onDone }: { seq: string; gears: { key: string; tag: string; emoji: string; en: string; ar: string }[]; onDone?: () => void }) {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [cur, setCur] = useState(gears[0].key);
  const fired = useRef(false);
  const pick = (k: string) => {
    setCur(k);
    const n = new Set(seen);
    n.add(k);
    setSeen(n);
    if (n.size === gears.length && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  };
  const g = gears.find((x) => x.key === cur) ?? gears[0];
  return (
    <div className="space-y-3">
      <Progress32 done={seen.size} total={gears.length} label="التروس المفعّلة" />
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="تروس الحاضر">
        {gears.map((x) => (
          <button key={x.key} type="button" onClick={() => pick(x.key)} aria-pressed={cur === x.key}
            className={`rounded-2xl border-2 p-3 text-start transition ${cur === x.key ? "border-emerald-600 bg-emerald-600 text-white" : seen.has(x.key) ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-800 hover:border-emerald-400"} ${FOCUS32}`}>
            <span className="block text-xl" aria-hidden>{x.emoji}</span>
            <En className="mt-1 block text-sm font-black">{x.tag}</En>
          </button>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
        <En className="block text-base font-black text-slate-900">{g.en}</En>
        <span className="mt-1 block text-sm font-semibold text-slate-600"><Rich text={g.ar} /></span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 17) قائمة الأهداف — ObjectivesChecklist32
// ---------------------------------------------------------------
export function ObjectivesChecklist32({ items }: { items: { n: string; text: string }[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    const n = new Set(checked);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    setChecked(n);
  };
  return (
    <div className="space-y-3">
      <Progress32 done={checked.size} total={items.length} label="الأهداف المُتقنة" />
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((o, i) => {
          const on = checked.has(i);
          return (
            <li key={i}>
              <button type="button" onClick={() => toggle(i)} aria-pressed={on}
                className={`flex w-full items-start gap-2 rounded-2xl border-2 p-3 text-start transition ${on ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-300"} ${FOCUS32}`}>
                <span aria-hidden className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-black ${on ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>{on ? "✓" : o.n}</span>
                <span className="min-w-0 flex-1 text-sm font-bold text-slate-800"><Rich text={o.text} /></span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
