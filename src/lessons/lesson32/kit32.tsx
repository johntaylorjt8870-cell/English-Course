// ============================================================
// مكتبة تفاعلات الدرس 32 — 🌊 THE DURATION STREAM / تيّار المدة
//
// كل مكوّن: لوحة مفاتيح كاملة · تركيز مرئي · تغذية فورية مع سبب (why) ·
// إعادة محاولة · حالة لا تعتمد على اللون وحده (✓ / ✕ / نص / أيقونة).
//
// الدلالات اللونية ثابتة في كل المكوّنات (انظر lesson32.css):
//   أزرق مائي = تيّار النشاط · نيلي = النتيجة/الحاضر التام ·
//   مرجاني = الآن والأثر الظاهر · ذهبي = المدة (for / since).
//
// مكوّنات المصدر: SourceBadge32 + SourceDeck32 يعرضان كل سطر من دفتر
// المصدر داخل خطوته، كبطاقات مصمّمة (لا لوحة تُفتح بالضغط).
// ============================================================

import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { En, PlatformTag, Rich, type FrameAccent, type RoleStyle } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { normalizeTyped32 } from "./testData";
import type { DeckBlock32 } from "./sourceDeck32";

export const ACCENT32: FrameAccent = {
  step: "bg-slate-900",
  badge: "bg-indigo-100 text-indigo-800",
  tip: "from-slate-900 to-slate-800",
  shadow: "shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)]",
};

export const FOCUS32 = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 focus-visible:ring-offset-2";

/**
 * إطار الصفحة — نفس مفردات الدرس 1 والدرس 41:
 * بطاقة بيضاء واحدة، تميمة متحركة، رقاقة رقم الخطوة، شارة القسم،
 * عنوان Changa، سطر تمهيدي رمادي، ثم المحتوى، وأخيرًا شريط الـ🦉.
 */
export function Frame32({
  mascot,
  step,
  badge,
  title,
  lead,
  tip,
  section,
  children,
}: {
  mascot: string;
  step?: number | string;
  badge?: string;
  title: ReactNode;
  lead?: ReactNode;
  tip?: ReactNode;
  /** القسم المصري المعروض في هذه الصفحة (للتدقيق وشارة المصدر) */
  section?: string;
  children: ReactNode;
}) {
  return (
    <section
      data-source-section={section}
      className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-8"
    >
      <div aria-hidden className="anim-drift pointer-events-none absolute left-5 top-4 select-none text-4xl md:left-7 md:top-5 md:text-5xl">
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step !== undefined && (
          <span className="font-head grid h-11 min-w-11 place-items-center rounded-2xl bg-slate-900 px-2 text-lg font-bold leading-none text-white shadow">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-indigo-100 px-3.5 py-1 text-xs font-bold text-indigo-800 md:text-sm">{badge}</span>
        )}

      </div>
      <h2 tabIndex={-1} className="font-head mt-3 max-w-[88%] text-2xl font-bold leading-snug text-slate-900 outline-none md:text-3xl">
        {typeof title === "string" ? <Rich text={title} /> : title}
      </h2>
      {lead && (
        <p className="mt-1.5 max-w-[92%] text-base text-slate-500 md:text-lg">
          {typeof lead === "string" ? <Rich text={lead} /> : lead}
        </p>
      )}
      <div className="mt-5 space-y-3">{children}</div>
      {tip && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-900 p-3.5 text-white">
          <span aria-hidden className="text-xl">🦉</span>
          <div className="text-sm font-semibold leading-relaxed md:text-base">
            {typeof tip === "string" ? <Rich text={tip} /> : tip}
          </div>
        </div>
      )}
    </section>
  );
}

/** أدوار القطع في الجملة — ألوان + تسمية عربية (اللون ليس الوسيلة الوحيدة) */
export const ROLE32: Record<string, RoleStyle> = {
  s: { chip: "l32-role-s", label: "الفاعل" },
  h: { chip: "l32-role-h", label: "have / has" },
  b: { chip: "l32-role-b", label: "been" },
  v: { chip: "l32-role-v", label: "verb-ing" },
  wh: { chip: "l32-role-wh", label: "أداة السؤال" },
  n: { chip: "l32-role-n", label: "not" },
  t: { chip: "l32-role-t", label: "كلمة زمن" },
};

const ROLE_CLASS = (role: string) => ROLE32[role]?.chip ?? "l32-role-s";

// ---------------------------------------------------------------
// عناصر أساسية
// ---------------------------------------------------------------

/** حاوية تجربة تفاعلية (Lab) — بطاقة بيضاء بطرف علوي هادئ كما في الدرس 41 */
export function Lab32({ emoji, label, ar, seq, children }: { emoji: string; label: string; ar?: string; seq: string; children: ReactNode }) {
  return (
    <div data-en-seq={seq} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_10px_40px_-18px_rgba(30,27,75,0.18)]">
      <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-lg shadow-sm">{emoji}</span>
        <span dir="ltr" className="ltr-pair inline-flex min-w-0 flex-wrap items-baseline gap-2">
          <span dir="ltr" className="l32-en-display text-[10px] font-black uppercase text-indigo-700">{label}</span>
          {ar && (
            <span dir="rtl" className="text-sm font-bold text-slate-600">
              <LatinRuns text={ar} />
            </span>
          )}
        </span>
      </div>
      <div className="p-3.5 sm:p-4">{children}</div>
    </div>
  );
}

/** شرح من المنصة — يُوسم دائمًا «Platform Explanation». */
export function Platform32({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3.5">
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <PlatformTag />
      </div>
      <div className="text-sm font-semibold leading-relaxed text-slate-800 md:text-base">
        <Rich text={String(children ?? "")} />
      </div>
    </div>
  );
}

/** لوحة شرح المنصة لكل خطوة (نقاط قصيرة) — لا تستبدل شرح المصدر */
export function Teach32({ items, head = "شرح المنصة" }: { items: string[]; head?: string }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm" data-teach-panel>
      <div className="ltr-pair mb-2 flex flex-wrap items-center gap-2" dir="ltr">
        <PlatformTag />
        <span dir="rtl" className="font-head text-sm font-bold text-slate-900">
          <Rich text={head} />
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-600">
            <span aria-hidden className="mt-1 shrink-0 text-[10px] text-indigo-600">◆</span>
            <span className="min-w-0"><Rich text={t} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** تغذية راجعة فورية: ✓ أو ✕ مع نص وسبب (why) — بدون لون وحده */
export function Verdict32({ ok, text, why }: { ok: boolean; text?: string; why?: string }) {
  return (
    <div role="status" aria-live="polite"
      className={`flex flex-wrap items-center gap-2 rounded-2xl border-2 p-2.5 text-sm font-bold ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
      <span aria-hidden className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-black text-white ${ok ? "bg-emerald-600" : "bg-rose-600"}`}>{ok ? "✓" : "✕"}</span>
      {text && <span className="min-w-0 flex-1"><Rich text={text} /></span>}
      {why && (
        <span className="w-full rounded-xl bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
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
      <span className="shrink-0 text-xs font-black text-cyan-800"><Rich text={`${label} ${done}/${total}`} /></span>
      <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={label}
        className="l32-progress-track h-2.5 min-w-0 flex-1 overflow-hidden rounded-full">
        <div className="l32-progress-fill h-full rounded-full transition-all" style={{ width: `${pct}%` } as CSSProperties} />
      </div>
      <span aria-hidden className="font-en shrink-0 text-[11px] font-black text-slate-600">{pct}%</span>
    </div>
  );
}

/** جملة إنجليزية مع فراغ «___» (LTR). قبل الملء: فراغ بارز؛ بعده: الجملة كاملة */
export function StemLine({ parts, filled }: { parts: string[]; filled: string | null }) {
  const sentence = parts.map((p) => (p === "___" ? (filled ?? "___") : p)).join(" ").replace(/ ([.?,!])/g, "$1");
  if (filled) {
    return (
      <div dir="ltr" className="ltr-row text-base font-bold text-slate-900 md:text-lg">
        <En>{sentence}</En>
      </div>
    );
  }
  return (
    <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-1.5 text-base font-bold text-slate-900 md:text-lg">
      {parts.map((p, i) => (p === "___"
        ? <span key={i} className="l32-slot l32-role-empty min-w-[6rem] text-base">?</span>
        : <En key={i}>{p}</En>))}
    </div>
  );
}

// ---------------------------------------------------------------
// 0) وسام الفيدلية + منصة أمثلة المصدر
// ---------------------------------------------------------------

/**
 * وسم فيدلية واحد: يفرّق سطر المصدر الحرفي عن مثال تدريبي أنشأته المنصة.
 * وسام ساكن (لا يُفتح بالضغط) — النص نفسه معروض دائمًا.
 */
export function SourceBadge32({ src }: { src: boolean }) {
  return (
    <span className={src ? "l32-badge-src" : "l32-badge-plat"}>
      <Rich text={src ? "📜 من المصدر" : "🛠️ مثال تدريبي للمنصة — ليس من المصدر"} />
    </span>
  );
}

const AR_CHAR32 = /[\u0600-\u06FF]/;

/** هل السطر قصير بما يسمح بعرضه كرقاقة بدل صف كامل؟ */
function isCompactBlock(block: DeckBlock32): boolean {
  if (block.kind === "example") {
    return !block.ar && block.en.trim().split(/\s+/).length <= 3 && !block.en.includes("→");
  }
  if (block.kind === "map") {
    return block.left.split(/\s+/).length <= 4 && block.right.split(/\s+/).length <= 4;
  }
  return false;
}

/** رقاقة مصدر قصيرة — النص كما هو، مع سهم الخريطة إن وُجد. */
function DeckChip32({ block }: { block: DeckBlock32 }) {
  if (block.kind === "map") {
    const arabicRight = AR_CHAR32.test(block.right);
    return (
      <span className="l32-deck-chip" data-kind="map">
        {block.prefix.trim() && <span aria-hidden className="me-1 font-bold text-indigo-700">{block.prefix.trim()}</span>}
        <span dir="ltr" className="font-en font-bold text-slate-800">{block.left}</span>
        <span aria-hidden className={`mx-1 font-bold ${arabicRight ? "text-cyan-700" : "text-indigo-600"}`}>→</span>
        <span className={arabicRight ? "font-bold text-cyan-900" : "font-en font-bold text-indigo-800"} dir={arabicRight ? "rtl" : "ltr"}>
          {block.right}
        </span>
      </span>
    );
  }
  if (block.kind !== "example") return null;
  const wrong = block.mark === "wrong";
  const ok = block.mark === "ok";
  return (
    <span className="l32-deck-chip" data-kind={wrong ? "wrong" : ok ? "fix" : "en"}>
      <span dir="ltr" className="font-en font-bold text-slate-800">{block.en}</span>
      {wrong && <span aria-hidden className="ms-1 text-rose-600">❌</span>}
      {ok && <span aria-hidden className="ms-1 text-emerald-600">✅</span>}
    </span>
  );
}

/** سطر واحد من منصة المصدر — يُعرض كما ورد حرفيًا داخل بطاقة مصمّمة. */
function DeckRow32({ block }: { block: DeckBlock32 }) {
  if (block.kind === "art") {
    return (
      <div className="l32-deck-item" data-kind="art">
        <div dir="ltr" className="ltr-row overflow-x-auto whitespace-nowrap font-en text-sm font-bold tracking-wide text-slate-700">
          <En>{block.text}</En>
        </div>
      </div>
    );
  }
  if (block.kind === "head") {
    return (
      <div className="l32-deck-item" data-kind="head">
        <p className="l32-h text-sm"><Rich text={block.text} /></p>
      </div>
    );
  }
  if (block.kind === "map") {
    const raw = `${block.prefix}${block.left} → ${block.right}`;
    const tone = AR_CHAR32.test(block.right) ? "bg-cyan-700" : "bg-indigo-700";
    return (
      <div className="l32-deck-item" data-kind="map">
        <div className="flex flex-wrap items-center gap-2">
          <span aria-hidden className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone}`} />
          <span className="min-w-0 flex-1"><Rich text={raw} className="l32-deck-ar font-bold text-slate-900" /></span>
        </div>
      </div>
    );
  }
  if (block.kind === "example") {
    const kind = block.mark === "wrong" ? "wrong" : block.mark === "ok" ? "fix" : "en";
    return (
      <div className="l32-deck-item" data-kind={kind}>
        <div dir="ltr" className="ltr-row min-w-0">
          <span className="l32-deck-en"><En>{block.en}</En></span>
        </div>
        {block.ar && <p className="l32-deck-ar mt-1"><Rich text={block.ar} /></p>}
      </div>
    );
  }
  const noteKind = block.mark === "wrong" ? "wrong" : block.mark === "ok" ? "fix" : "note";
  return (
    <div className="l32-deck-item" data-kind={noteKind}>
      <p className="l32-deck-ar">
        <Rich text={block.text} />
      </p>
    </div>
  );
}

/**
 * يجمع الأسطر القصيرة المتتابعة في مجموعة واحدة تُعرض كرقاقات،
 * ويترك الأسطر الطويلة (مثال + ترجمة، قاعدة، رسم) في صفوفها الكاملة.
 */
function groupBlocks(blocks: DeckBlock32[]): DeckBlock32[][] {
  const groups: DeckBlock32[][] = [];
  let run: DeckBlock32[] = [];
  for (const b of blocks) {
    if (isCompactBlock(b)) {
      run.push(b);
      continue;
    }
    if (run.length) {
      groups.push(run);
      run = [];
    }
    groups.push([b]);
  }
  if (run.length) groups.push(run);
  return groups;
}

/**
 * منصة أمثلة المصدر للخطوة: كل أسطر الوحدة المصدرية كما وردت،
 * مصنّفة إلى مثال (إنجليزي + ترجمته) / قاعدة / خريطة / رسم زمني.
 * عرض ساكن دائمًا — لا شيء يُخفى ولا شيء يُفتح بالضغط.
 */
export function SourceDeck32({ blocks, sectionTitle }: { blocks: DeckBlock32[]; sectionTitle?: string }) {
  const examples = blocks.filter((b) => b.kind === "example").length;
  const translated = blocks.filter((b) => b.kind === "example" && b.ar).length;
  if (blocks.length === 0) return null;
  return (
    <section className="l32-deck" aria-label="أمثلة المصدر وشرحها لهذه الخطوة">
      <div className="l32-deck-head">
        <span className="l32-kicker">📚 نص المصدر — كما ورد حرفيًا</span>
        <span className="l32-chip">
          <Rich text={`${blocks.length} سطرًا مصدريًا${examples > 0 ? ` · ${examples} مثالًا إنجليزيًا` : ""}${translated > 0 ? ` · ${translated} منها بترجمة عربية` : ""}`} />
        </span>
        {sectionTitle && <span className="l32-chip l32-chip-indigo"><Rich text={sectionTitle} /></span>}
      </div>
      <div className="space-y-1.5" data-deck-count={blocks.length}>
        {groupBlocks(blocks).map((group, gi) =>
          group.length > 1 || isCompactBlock(group[0]) ? (
            <div key={gi} className="flex flex-wrap items-center gap-1.5">
              {group.map((b, i) => <DeckChip32 key={i} block={b} />)}
            </div>
          ) : (
            <DeckRow32 key={gi} block={group[0]} />
          ),
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// 0ب) تيّار المدة — الخط الزمني الممتد (PAST ─── NOW)
// ---------------------------------------------------------------
export function StreamTimeline32({ start = 0.35, span, live, label, traces = [], caption }: {
  /** موضع نقطة البداية (0 = أقصى الماضي · 1 = NOW) */
  start?: number;
  /** طول التيّار كنسبة من المسار — الافتراضي: من البداية حتى NOW */
  span?: number;
  /** هل التيّار ما زال جاريًا الآن؟ */
  live: boolean;
  label?: string;
  /** آثار ظاهرة عند التوقف */
  traces?: string[];
  caption?: string;
}) {
  const from = Math.max(0.02, Math.min(0.9, start));
  const width = Math.max(0.08, Math.min(1 - from, span ?? 1 - from));
  return (
    <div className="l32-stream">
      <div dir="ltr" className="ltr-row">
        <div className="l32-stream-track" role="img"
          aria-label={`خط الزمن: نشاط بدأ ${Math.round((1 - from) * 100)}٪ قبل الآن و${live ? "ما زال مستمرًا حتى NOW" : "توقف قبل قليل وأثره باقٍ"}`}>
          <div className="l32-stream-flow" data-live={live ? "true" : "false"}
            style={{ left: `${from * 100}%`, width: `${width * 100}%` } as CSSProperties} />
          {!live && <div className="l32-stream-stopped" style={{ left: `calc(${(from + width) * 100}% - 2px)` } as CSSProperties} aria-hidden />}
          <div className="l32-stream-pin" style={{ left: `${from * 100}%` } as CSSProperties} aria-hidden>📍</div>
          <div className="l32-stream-now" style={{ right: "0px" } as CSSProperties} aria-hidden />
          <div className="l32-stream-nowlabel" style={{ right: "2px" } as CSSProperties} aria-hidden>NOW</div>
        </div>
        <div className="l32-stream-axis">
          <span>PAST</span>
          {label && <span dir="rtl" className="text-[11px] tracking-normal"><LatinRuns text={label} /></span>}
          <span className="l32-now-word">NOW</span>
        </div>
      </div>
      {caption && <p className="mt-1.5 text-xs font-bold text-slate-600"><Rich text={caption} /></p>}
      {traces.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="l32-chip l32-chip-coral"><Rich text="🔎 الأثر الآن:" /></span>
          {traces.map((t) => <span key={t} className="l32-trace"><Rich text={t} /></span>)}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// 1) بناء الجملة من القطع بالترتيب — BlockBuilder32
// ---------------------------------------------------------------
type Tok = { text: string; role: string };
export function BlockBuilder32({ seq, rounds, formula, onDone }: {
  seq: string; rounds: { tokens: Tok[]; ar: string }[]; formula?: string; onDone?: () => void;
}) {
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
      {formula && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50/60 px-3 py-2">
          <span className="l32-chip l32-chip-indigo"><Rich text="الصيغة" /></span>
          <span dir="ltr" className="ltr-row font-en text-sm font-black tracking-wide text-indigo-800 md:text-base"><En>{formula}</En></span>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-black text-cyan-800"><Rich text={`الجملة ${r + 1} من ${rounds.length}`} /></span>
        <span className="text-xs font-bold text-slate-600"><Rich text={`المعنى: ${round.ar}`} /></span>
      </div>

      {/* سكك الأدوار: فراغ لكل قطعة مع اسم دورها — يعلّم الترتيب بصريًا */}
      <div dir="ltr" className="ltr-row flex flex-wrap items-end gap-1.5 rounded-2xl border-2 border-dashed border-cyan-200 bg-cyan-50/60 p-2.5">
        {round.tokens.map((t, i) => {
          const placed = built.includes(i);
          return (
            <span key={i} className={`l32-slot ${placed ? ROLE_CLASS(t.role) : "l32-role-empty"}`}>
              <span className="font-en">{placed ? t.text : "···"}</span>
              <span className="l32-slot-label" dir="rtl"><Rich text={ROLE32[t.role]?.label ?? ""} /></span>
            </span>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2.5">
        <p className="mb-2 text-xs font-black text-slate-600"><Rich text="قطع الجملة — المسها بالترتيب:" /></p>
        {complete ? (
          <p className="text-center text-sm font-black text-cyan-800"><Rich text="✓ اكتملت الجملة" /></p>
        ) : (
          <div className="flex flex-wrap gap-2" aria-label="قطع الجملة">
            {tray.map((i) => (
              <button key={i} type="button" onClick={() => tap(i)} data-block-token={i} dir="ltr"
                className={`l32-tap min-h-[46px] px-3.5 font-en text-base font-extrabold ${ROLE_CLASS(round.tokens[i].role)} ${FOCUS32}`}>
                {round.tokens[i].text}
              </button>
            ))}
          </div>
        )}
      </div>

      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}
      <div className="flex flex-wrap items-center gap-2">
        {!finished && built.length > 0 && (
          <button type="button" onClick={reset} className={`l32-tap l32-tap-soft ${FOCUS32}`}>↺ <Rich text="إعادة الترتيب" /></button>
        )}
        {finished && !allDone && (
          <button type="button" onClick={next} className={`l32-tap l32-tap-primary ${FOCUS32}`}>
            {r + 1 < rounds.length ? "الجملة التالية ←" : "✓ إنهاء التمرين"}
          </button>
        )}
        {allDone && <span className="l32-chip l32-chip-ok"><Rich text="✓ أحسنت — أتممت التمرين" /></span>}
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
              className={`group rounded-2xl border-2 p-3 text-start transition active:scale-[0.99] ${ROLE_CLASS(p.role)} ${seen ? "" : "border-dashed"} ${FOCUS32}`}>
              <span className="block font-en text-lg font-black">{p.text}</span>
              {seen ? (
                <span dir="rtl" className="mt-1.5 block rounded-xl bg-white/85 px-2.5 py-1.5 text-sm font-bold text-slate-900"><Rich text={p.back} /></span>
              ) : (
                <span dir="rtl" className="mt-1.5 block text-xs font-bold opacity-80"><Rich text="المس لتكشف دورها ↻" /></span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs font-bold text-slate-500"><Rich text="كل قطعة لها وظيفة واحدة: الرابط بالحاضر، أو الاستمرار، أو الفاعل." /></p>
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
      <Progress32 done={Object.keys(placed).length} total={items.length} label="المصنَّف" />
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
                className={`l32-tap l32-tap-bare w-full text-sm font-black text-slate-900 ${FOCUS32}`}>
                <Rich text={bk.label} />
                {sel !== null && <span className="ms-2 text-xs font-bold text-cyan-800">← ضع هنا</span>}
              </button>
              <div dir="ltr" className="mt-2 flex flex-wrap gap-1.5">
                {inside.map(({ it, i }) => (
                  <span key={i} className="font-en rounded-lg bg-white px-2 py-1 text-sm font-extrabold text-emerald-900 shadow-sm ring-1 ring-emerald-200">✓ {it.text}</span>
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
              className={`l32-tap cursor-grab px-3 font-en text-base font-extrabold ${isSel ? "l32-tap-primary" : ""} ${FOCUS32}`}>
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
// 4) ملء الفراغ باختيار — SlotPick32 (جولات for / since)
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
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-black text-amber-800">
        <span><Rich text={`الجولة ${r + 1} من ${rounds.length}`} /></span>
        <span className="l32-chip l32-chip-gold">{ruler ? "📏 for — مسطرة المدة" : "🚩 since — علامة البداية"}</span>
      </div>

      {/* التيّار نفسه: for يقيس طول المسافة · since يضع علامة على نقطة الانطلاق */}
      <StreamTimeline32
        start={ruler ? 0.22 : 0.42}
        live
        label={ruler ? "المدة = طول التيّار" : "البداية = نقطة الانطلاق"}
        caption={ruler
          ? "for تقيس كم امتد التيّار: المسافة كلها بين البداية وNOW."
          : "since تضع علامة على اللحظة التي انطلق منها التيّار."}
      />

      <div className={`rounded-2xl border-2 p-3 ${ruler ? "border-amber-200 bg-amber-50" : "border-cyan-200 bg-cyan-50/60"}`}>
        <StemLine parts={round.stem} filled={filled} />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="الخيارات">
        {round.options.map((o, i) => (
          <button key={i} type="button" onClick={() => pick(o)} disabled={!!filled} data-slot-opt={i} dir="ltr"
            className={`l32-tap px-3.5 font-en text-base font-extrabold ${filled ? (o.ok && filled === o.text ? "l32-tap-ok" : "l32-tap-mute") : ""} ${FOCUS32}`}>
            {o.text}
          </button>
        ))}
      </div>
      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}
      {filled && !allDone && (
        <button type="button" onClick={next} className={`l32-tap l32-tap-primary ${FOCUS32}`}>
          {r + 1 < rounds.length ? "الجولة التالية ←" : "✓ إنهاء التمرين"}
        </button>
      )}
      {allDone && <p className="l32-chip l32-chip-ok"><Rich text="✓ أحسنت — أتممت التمرين" /></p>}
    </div>
  );
}

// ---------------------------------------------------------------
// 5) صفوف اختيار — PerRow32
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
          <div key={ri} data-row-card={ri}
            className={`rounded-2xl border-2 p-3 transition-colors ${st.ok ? "border-emerald-200 bg-emerald-50/60" : st.picked !== null ? "border-rose-200 bg-rose-50/60" : "border-slate-200 bg-white"}`}>
            <div className="flex items-start gap-2">
              {labels?.[ri] && <span className="shrink-0 rounded-lg bg-indigo-700 px-2 py-0.5 text-xs font-black text-white">{labels[ri]}</span>}
              <div className="min-w-0 flex-1 text-base font-bold text-slate-900 md:text-lg">
                <Rich text={row.stem} />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`الخيارات: ${row.stem}`}>
              {row.opts.map((o, oi) => {
                const isPicked = st.picked === oi;
                const cls = st.ok && oi === row.answer
                  ? "l32-tap-ok"
                  : isPicked && !st.ok
                    ? "l32-tap-err"
                    : "";
                return (
                  <button key={oi} type="button" onClick={() => pick(ri, oi)} disabled={st.ok} aria-pressed={isPicked} data-row={ri} data-row-opt={oi}
                    className={`l32-tap justify-start px-3 text-start text-sm font-bold ${cls} ${FOCUS32}`}>
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
// 6) صيد الخطأ ثم الإصلاح — TapFix32 (Grammar Detective)
// ---------------------------------------------------------------
export type Fix32 = { segments: string[]; bad: number[]; fixOpts: string[]; fix: string; why: string; n?: number };
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
      <p className="l32-chip l32-chip-coral"><Rich text="🕵️ لا يظهر الحل قبل المحاولة: المس الجزء الخاطئ أولًا." /></p>
      {items.map((it, ii) => {
        const isFixed = fixed[ii] !== undefined;
        return (
          <div key={ii}
            className={`rounded-2xl border-2 p-3 transition-colors ${isFixed ? "border-emerald-200 bg-emerald-50/60" : sel[ii] ? "border-rose-200 bg-rose-50/50" : "border-slate-200 bg-white"}`}>
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="l32-chip l32-chip-indigo"><Rich text={`الملف ${it.n ?? ii + 1}`} /></span>
              <span className="text-xs font-black text-slate-500"><Rich text={isFixed ? "✅ مُغلق — تم الإصلاح" : sel[ii] ? "🔎 اختر الإصلاح" : "🔍 ابحث عن الخطأ"} /></span>
            </div>
            <div dir="ltr" className="ltr-row flex flex-wrap gap-1.5" role="group" aria-label={`كلمات الجملة ${ii + 1}`}>
              {it.segments.map((s, si) => {
                const isBad = it.bad.includes(si) && !isFixed;
                const active = sel[ii] && isBad;
                return (
                  <button key={si} type="button" onClick={() => tapSeg(ii, si)} disabled={isFixed} data-fix-seg={`${ii}-${si}`}
                    className={`l32-tap px-2.5 font-en text-base font-bold ${active ? "l32-tap-err" : isFixed ? "l32-tap-done" : ""} ${FOCUS32}`}>
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
                      className={`l32-tap l32-tap-aqua px-3 font-en text-sm font-extrabold ${FOCUS32}`}>{o}</button>
                  ))}
                </div>
              </div>
            )}
            {isFixed && (
              <div dir="ltr" className="ltr-row mt-2 rounded-xl border border-emerald-200 bg-white p-2 font-en text-base font-extrabold text-emerald-900">
                <En>{`✓ ${corrected(it, fixed[ii])}`}</En>
              </div>
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
          <div key={i}
            className={`rounded-2xl border-2 p-3 transition-colors ${st === "ok" ? "border-emerald-200 bg-emerald-50/60" : st === "no" ? "border-rose-200 bg-rose-50/60" : "border-slate-200 bg-white"}`}>
            <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-700 font-en text-xs font-black text-white">{i + 1}</span>
              <En className="text-base font-bold text-slate-900 md:text-lg">{it.prompt}</En>
              {it.hint && <En className="text-sm font-bold text-amber-800">{it.hint}</En>}
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
                className={`font-en min-w-[12rem] flex-1 rounded-xl border-2 bg-white px-3 py-2.5 text-base font-bold text-slate-900 outline-none transition-colors focus:border-cyan-700 disabled:bg-emerald-50/60 ${st === "ok" ? "border-emerald-200" : st === "no" ? "border-rose-200" : "border-slate-200"}`}
              />
              <button type="button" onClick={() => check(i)} disabled={!vals[i].trim() || st === "ok"}
                className={`l32-tap l32-tap-primary disabled:opacity-40 ${FOCUS32}`}>
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
// 8) لوحة المعنى: دليل ← سياق ← سبب — EvidenceCases32
// ---------------------------------------------------------------
export type Case32 = {
  scene: string; title: string; clues: string[];
  evidence?: string; evidenceAr?: string; context?: string; reason?: string;
  options: { text: string; ok: boolean; why: string; ar?: string }[];
};
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
  const pick = (o: Case32["options"][number]) => {
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
  const solvedNow = msg?.ok && solved.includes(c);
  const solvedOpt = cur.options.find((o) => o.ok);
  return (
    <div className="space-y-3">
      <Progress32 done={solved.length} total={cases.length} label="المشاهد المفسَّرة" />

      {/* المشهد: الدليل المرئي الآن */}
      <div className="l32-card l32-card-coral p-3">
        <div className="flex items-start gap-3">
          <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-rose-200 bg-white text-3xl">{cur.scene}</span>
          <div className="min-w-0 flex-1">
            <p className="l32-h text-sm"><Rich text={`المشهد ${c + 1}: ${cur.title}`} /></p>
            {cur.evidence && <p className="mt-1 text-sm font-bold text-slate-600"><Rich text={cur.evidence} /></p>}
            {cur.evidenceAr && <p className="mt-0.5 text-sm text-slate-500"><Rich text={cur.evidenceAr} /></p>}
          </div>
        </div>
        <div className="mt-2.5">
          <p className="mb-1.5 text-xs font-black text-rose-800"><Rich text="١) اجمع الأدلة الظاهرة الآن:" /></p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="الأدلة">
            {cur.clues.map((cl, i) => (
              <button key={i} type="button" onClick={() => tapClue(i)} aria-pressed={isClue(i)} data-clue={i}
                className={`l32-tap px-3 text-sm font-bold ${isClue(i) ? "l32-tap-gold" : "l32-tap-dashed"} ${FOCUS32}`}>
                {isClue(i) ? "✓ " : "🔍 "}<Rich text={cl} />
              </button>
            ))}
          </div>
          {!allClues && <p className="mt-2 text-xs font-bold text-slate-500"><Rich text="المس كل الأدلة لتفعيل الاختيارات." /></p>}
        </div>
      </div>

      {/* السياق: ماذا يعني هذا الأثر؟ */}
      {allClues && (
        <div className="l32-card l32-card-gold p-3">
          <p className="mb-1 text-xs font-black text-amber-800"><Rich text="٢) السياق:" /></p>
          <p className="text-sm font-bold text-slate-600"><Rich text={cur.context ?? "الأثر ظاهر الآن، والنشاط امتد إلى قريب من هذه اللحظة."} /></p>
        </div>
      )}

      {/* الجملة التي تفسّر الأدلة */}
      {allClues && !isDone && solved.length === c && (
        <div className="space-y-2">
          <p className="text-xs font-black text-cyan-800"><Rich text="٣) أي جملة تفسّر هذه الأدلة؟" /></p>
          <div className="flex flex-col gap-2" role="group" aria-label="الجمل المقترحة">
            {cur.options.map((o, i) => (
              <button key={i} type="button" onClick={() => pick(o)} data-case-opt={i} dir="ltr"
                className={`l32-tap justify-start px-3.5 font-en text-base font-bold ${FOCUS32}`}>
                {o.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}

      {/* السبب: لماذا تفسّر هذه الجملة الأثر؟ */}
      {solvedNow && solvedOpt && (
        <div className="l32-card l32-card-aqua p-3">
          <p className="mb-1 text-xs font-black text-cyan-800"><Rich text="٤) السبب:" /></p>
          <div dir="ltr" className="ltr-row"><span className="l32-deck-en"><En>{solvedOpt.text}</En></span></div>
          {solvedOpt.ar && <p className="l32-deck-ar mt-1"><Rich text={solvedOpt.ar} /></p>}
          <p className="mt-1 text-sm font-semibold text-slate-600"><Rich text={cur.reason ?? solvedOpt.why} /></p>
          <div className="mt-1.5"><SourceBadge32 src /></div>
        </div>
      )}

      {msg?.ok && !isDone && (
        <button type="button" onClick={nextCase} className={`l32-tap l32-tap-primary ${FOCUS32}`}>المشهد التالي ←</button>
      )}
      {isDone && <p className="l32-chip l32-chip-ok"><Rich text="✓ فسّرت كل المشاهد" /></p>}
    </div>
  );
}

// ---------------------------------------------------------------
// 9) تيّار المدة التفاعلي — RibbonMaker32 (المدة + النشاط + الاستمرار)
// ---------------------------------------------------------------
export function RibbonMaker32({ seq, activities, maxHours, model, modelAr, onDone }: {
  seq: string;
  activities: { key: string; en: string; ar: string; emoji?: string; traces?: string[] }[];
  maxHours: number;
  model?: string;
  modelAr?: string;
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
  const start = 1 - hours / Math.max(1, maxHours);
  return (
    <div className="space-y-3">
      <div className="l32-card p-3">
        <StreamTimeline32
          start={start}
          live={still}
          label={`المدة: ${hours} ${hours === 1 ? "ساعة" : "ساعات"}`}
          traces={still ? [] : (activities[act].traces ?? [])}
          caption={still
            ? "التيّار جارٍ: النشاط بدأ في الماضي وما زال مستمرًا حتى NOW."
            : "التيّار توقف قبل اللحظة الحالية، لكن أثره ما زال ظاهرًا الآن."}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="l32-card l32-card-gold block p-3">
          <span className="text-xs font-black text-amber-800"><Rich text={`📏 المدة: ${hours} ${hours === 1 ? "ساعة" : "ساعات"} — حرّكها لترى التيّار يطول أو يقصر`} /></span>
          <input type="range" min={1} max={maxHours} step={1} value={hours} data-keynav-lock
            aria-label="المدة بالساعات" aria-valuetext={`${hours} hours`}
            onChange={(e) => { setHours(Number(e.target.value)); mark("h"); }}
            className="l32-range mt-2 w-full" />
        </label>
        <div className="l32-card p-3">
          <span className="text-xs font-black text-slate-600"><Rich text="🏃 النشاط" /></span>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="النشاط">
            {activities.map((a, i) => (
              <button key={a.key} type="button" role="radio" aria-checked={act === i} onClick={() => { setAct(i); mark("a"); }}
                className={`l32-tap px-3 font-en text-sm font-extrabold ${FOCUS32}`}>
                {a.emoji && <span aria-hidden>{a.emoji}</span>} {a.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" aria-pressed={still} onClick={() => { setStill(!still); mark("s"); }}
          className={`l32-tap px-3.5 text-sm font-black ${still ? "l32-tap-primary" : "l32-tap-gold"} ${FOCUS32}`}>
          {still ? "🏃 ما زال مستمرًا الآن" : "🛑 توقف قبل قليل، والأثر باقٍ"}
        </button>
        <span className="text-xs font-bold text-slate-500"><Rich text="الجملة واحدة في الحالتين — الواقع يتغيّر، والجملة لا تتغيّر (المصدر §18)." /></span>
      </div>

      <div className="l32-card l32-card-aqua p-3">
        <p className="mb-1 text-xs font-black text-cyan-800"><Rich text="الجملة التي يصنعها التيّار:" /></p>
        <div dir="ltr" className="ltr-row text-center">
          <En className="l32-deck-en text-cyan-900">{sentence}</En>
        </div>
        <p className="mt-1 text-center text-sm font-bold text-slate-600"><Rich text={`أنا ${activities[act].ar} منذ ${hours} ${hours === 1 ? "ساعة" : "ساعات"}.`} /></p>
        {model && (
          <div className="mt-2 rounded-xl border border-cyan-200 bg-white/80 p-2 text-center">
            <div dir="ltr" className="ltr-row"><En className="text-sm font-black text-cyan-800">{model}</En></div>
            {modelAr && <p className="mt-0.5 text-xs font-bold text-slate-600"><Rich text={modelAr} /></p>}
          </div>
        )}
      </div>
      <Progress32 done={Object.values(touched).filter(Boolean).length} total={3} label="جرّب الأدوات" />
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
              className={`rounded-2xl border-2 p-3 text-start transition active:scale-[0.99] ${seen ? "border-cyan-200 bg-cyan-50" : "border-dashed border-slate-200 bg-white hover:border-cyan-300"} ${FOCUS32}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <En className="text-base font-black text-slate-900">{it.en}</En>
                <span className="text-xs font-bold text-slate-600"><Rich text={it.ar} /></span>
              </div>
              {seen ? (
                <span className="mt-2 block space-y-1">
                  <En className="block text-sm font-bold text-cyan-800">{it.ex}</En>
                  {it.exAr && <span className="block text-xs font-semibold text-slate-600"><Rich text={it.exAr} /></span>}
                  <span className="mt-1 inline-block"><SourceBadge32 src={it.src} /></span>
                </span>
              ) : (
                <span className="mt-2 block text-xs font-bold text-slate-500"><Rich text="المس لعرض المثال ↻" /></span>
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
      <div className="flex flex-wrap items-center gap-2">
        <span aria-hidden className="text-2xl">🚧</span>
        <p className="text-xs font-black text-slate-600"><Rich text="بوابة -ing: مرّر كل فعل وشاهد هل يُفتح له التيّار." /></p>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="أفعال الحالة">
        {verbs.map((v, i) => (
          <button key={v.verb} type="button" onClick={() => test(i)} aria-pressed={cur === i} data-gate={i} dir="ltr"
            className={`l32-tap px-3 font-en text-sm font-extrabold ${tested.has(i) ? "l32-tap-soft" : ""} ${FOCUS32}`}>
            {v.verb}
          </button>
        ))}
      </div>
      {cur !== null && (
        <div className="grid gap-2 sm:grid-cols-2" role="status" aria-live="polite">
          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
            <div className="text-xs font-black text-rose-900"><Rich text="✕ البوابة مغلقة" /></div>
            <div dir="ltr" className="ltr-row mt-1"><En className="text-base font-bold text-rose-900 line-through decoration-[#f2bcbc]">{`I have been ${verbs[cur].ing} for years.`}</En></div>
          </div>
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
            <div className="text-xs font-black text-emerald-900"><Rich text="✓ المرور الصحيح" /></div>
            <div dir="ltr" className="ltr-row mt-1"><En className="text-base font-bold text-emerald-900">{`I have ${verbs[cur].v3} him for years.`}</En></div>
          </div>
        </div>
      )}
      {cur !== null && <p className="text-xs font-bold text-slate-600"><Rich text="المصدر يقول «عادةً» — هذه قاعدة الاستعمال الشائعة، ليست تحريمًا مطلقًا (انظر ملاحظة المعلم)." /></p>}
    </div>
  );
}

// ---------------------------------------------------------------
// 12) مقارنة الأزمنة بنقطة المرجع — TenseCompare32
// ---------------------------------------------------------------
export type TenseRow32Kit = { tense: string; form: string; ref: string; en: string; ar: string };
export function TenseCompare32({ rows, activeTense }: { rows: TenseRow32Kit[]; activeTense?: string }) {
  return (
    <div className="space-y-2" role="group" aria-label="مقارنة الأزمنة بنقطة المرجع">
      {rows.map((r) => {
        const on = activeTense === r.tense;
        return (
          <div key={r.tense}
            className={`rounded-2xl border-2 p-3 transition-colors ${on ? "border-cyan-700 bg-cyan-50 shadow-[0_10px_24px_-20px_rgba(11,95,119,1)]" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span dir="ltr" className="font-en text-sm font-black text-indigo-800"><En>{r.tense}</En></span>
              <span className="l32-chip l32-chip-aqua" dir="ltr"><span className="font-en">{r.form}</span></span>
              <span className="l32-chip l32-chip-gold"><Rich text={`📍 ${r.ref}`} /></span>
            </div>
            <div dir="ltr" className="ltr-row mt-1.5"><En className="text-base font-bold text-slate-900">{r.en}</En></div>
            <p className="mt-0.5 text-sm font-semibold text-slate-600"><Rich text={r.ar} /></p>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------
// 13) نقطة المرجع — ReferenceRail32 (شريط زمني بمؤشر قابل للسحب)
// ---------------------------------------------------------------
export type Snap32 = { key: string; at: number; label: string; tense: string; en: string; ar: string };
export function ReferenceRail32({ seq, snaps, compare, onDone }: { seq: string; snaps: Snap32[]; compare?: TenseRow32Kit[]; onDone?: () => void }) {
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
    const f = rect.width === 0 ? 0 : Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    let best = 0;
    ordered.forEach((s, i) => { if (Math.abs(s.at - f) < Math.abs(ordered[best].at - f)) best = i; });
    return best;
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); e.stopPropagation(); go(Math.max(0, idx - 1)); }
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); e.stopPropagation(); go(Math.min(ordered.length - 1, idx + 1)); }
  };
  const cur = ordered[idx];
  const refAtNow = cur.at >= 0.999;
  /** التيّار يمتد من نقطة بدايته حتى نقطة المرجع نفسها */
  const railStart = Math.max(0.08, cur.at - 0.42);
  const railSpan = Math.max(0.16, Math.min(0.9, cur.at - railStart));
  return (
    <div className="space-y-3">
      <Progress32 done={visited.size} total={ordered.length} label="نقاط المرجع المستكشفة" />
      <div data-keynav-lock className="l32-card p-3 sm:p-4">
        <div
          ref={trackRef}
          dir="ltr"
          className="ltr-row relative h-20 select-none"
          onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); go(nearest(e.clientX)); }}
          onPointerMove={(e) => { if (e.buttons === 1) { const n = nearest(e.clientX); if (n !== idx) go(n); } }}
        >
          <span dir="ltr" className="font-en absolute start-0 top-0 text-[11px] font-black tracking-widest text-slate-500">PAST</span>
          <span dir="ltr" className="font-en absolute end-0 top-0 text-[11px] font-black tracking-widest text-rose-800">NOW</span>
          <div className="absolute inset-x-0 top-9 h-2.5 rounded-full bg-[linear-gradient(90deg,#c6c2f6,#67cfe6_55%,#ef4d74)]" aria-hidden />
          {ordered.map((s, i) => (
            <button key={s.key} type="button" onClick={() => go(i)} aria-label={`نقطة المرجع: ${s.label}`} data-snap={s.key}
              aria-current={i === idx ? "true" : undefined}
              className={`l32-snap-btn ${FOCUS32}`}
              style={{ insetInlineStart: `${s.at * 100}%` } as CSSProperties}>
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
            className={`l32-rail-knob absolute top-5 h-11 w-11 -translate-x-1/2 rounded-full border-4 border-white bg-cyan-700 shadow-[0_10px_22px_-12px_rgba(11,95,119,1)] transition-[inset-inline-start] duration-300 ${FOCUS32}`}
            style={{ insetInlineStart: `${cur.at * 100}%` } as CSSProperties}
          />
        </div>

        {/* التيّار ينتهي عند نقطة المرجع: هكذا يتغيّر الزمن */}
        <StreamTimeline32 start={railStart} span={railSpan} live={refAtNow}
          label={refAtNow ? "المرجع = NOW" : "المرجع = نقطة في الماضي"} />

        <div className="mt-2 grid gap-2 sm:grid-cols-[auto_1fr] sm:items-center">
          <span className="w-fit rounded-xl bg-indigo-700 px-3 py-1.5 font-en text-sm font-black text-white"><En>{cur.tense}</En></span>
          <div>
            <div dir="ltr" className="ltr-row"><En className="text-base font-black text-slate-900">{cur.en}</En></div>
            <p className="mt-0.5 text-sm font-semibold text-slate-600"><Rich text={cur.ar} /></p>
          </div>
        </div>
      </div>
      <p className="text-xs font-bold text-slate-500"><Rich text="اسحب المؤشر، أو انقر النقطة، أو استعمل الأسهم (←/→) على المؤشر." /></p>
      {compare && compare.length > 0 && <TenseCompare32 rows={compare} activeTense={cur.tense} />}
    </div>
  );
}

// ---------------------------------------------------------------
// 14) هل ما زال يركض؟ — StillRunning32
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
            className={`l32-tap l32-tap-card ${cur === s.key ? "l32-tap-primary" : ""} ${FOCUS32}`}>
            <span className="block text-sm font-black"><Rich text={s.label} /></span>
            <span className={`mt-1 block text-xs font-bold ${cur === s.key ? "text-white" : "text-slate-500"}`}><Rich text={s.ar} /></span>
          </button>
        ))}
      </div>

      <div className="l32-card p-3">
        <StreamTimeline32 start={0.3} live={running}
          label={running ? "التيّار جارٍ الآن" : "توقف قبل دقيقة"}
          traces={running ? [] : ["😮‍💨 ما زال يلهث", "💦 العرق ظاهر"]}
          caption="الجملة لم تتغيّر بين الحالتين — الذي تغيّر هو الواقع وحده." />
      </div>

      <div className="l32-card l32-card-aqua flex flex-wrap items-center justify-around gap-3 p-3">
        <span aria-hidden className={`text-5xl ${running ? "l32-bob" : ""}`}>{running ? "🏃" : "🧍"}</span>
        <div className="min-w-0 text-center">
          <div dir="ltr" className="ltr-row"><En className="l32-deck-en text-cyan-900">{en}</En></div>
          <span className="mt-1 block text-xs font-bold text-cyan-800"><Rich text={states[0].breath ? "🫁 يلهث في الحالتين — الأثر ظاهر" : ""} /></span>
        </div>
      </div>
      <Platform32>{note}</Platform32>
      <Progress32 done={seen.size} total={states.length} label="الحالتان المستكشفتان" />
    </div>
  );
}

// ---------------------------------------------------------------
// 15) معركة الزعيم — Boss32
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
      <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
        <div className="flex items-center justify-between text-xs font-black text-rose-800">
          <span><Rich text="🐉 صحة الزعيم" /></span>
          <span dir="ltr" className="font-en">{hp}%</span>
        </div>
        <div role="progressbar" aria-label="صحة الزعيم" aria-valuemin={0} aria-valuemax={100} aria-valuenow={hp}
          className="mt-1.5 h-3 overflow-hidden rounded-full bg-white ring-1 ring-rose-200">
          <div className="h-3 rounded-full bg-[linear-gradient(90deg,#ef4d74,#f5b301)] transition-all duration-500" style={{ width: `${hp}%` } as CSSProperties} />
        </div>
      </div>
      {items.map((it, i) => {
        const done = solved[i];
        return (
          <div key={i}
            className={`rounded-2xl border-2 p-3 transition-colors ${done ? "border-emerald-200 bg-emerald-50/60" : wrong[i] ? "border-rose-200 bg-rose-50/60" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="l32-chip l32-chip-indigo"><Rich text={`⚔️ الضربة ${i + 1}`} /></span>
              <span dir="ltr"><En className="text-base font-bold text-slate-900">{it.en}</En></span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`اختر الزمن للضربة ${i + 1}`}>
              {gears.map((g, gi) => (
                <button key={g} type="button" disabled={!!done} onClick={() => hit(i, gi)} data-gear={gi} dir="ltr"
                  className={`l32-tap px-3 font-en text-sm font-extrabold ${done ? (gi === it.answer ? "l32-tap-ok" : "opacity-50") : ""} ${FOCUS32}`}>
                  {g}
                </button>
              ))}
            </div>
            {done && <div className="mt-2"><Verdict32 ok text={`💥 ${it.verb}`} why={it.why} /></div>}
            {!done && wrong[i] && <div className="mt-2"><Verdict32 ok={false} text="🛡️ الزعيم صدّ الهجوم — جرّب زمنًا آخر." why={it.why} /></div>}
          </div>
        );
      })}
      {Object.keys(solved).length === items.length && <p className="l32-chip l32-chip-ok"><Rich text="🏆 هُزم الزعيم — أتممت التحدي" /></p>}
    </div>
  );
}

// ---------------------------------------------------------------
// 16) تحليل الفقرة — VerbTap32
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
      <div dir="ltr" className="ltr-row rounded-2xl border-2 border-slate-200 bg-white p-4 text-base leading-loose text-slate-900 md:text-lg">
        {parts.map((p, i) => p.k === undefined ? (
          <En key={i}>{p.t}</En>
        ) : (
          <button key={i} type="button" onClick={() => setActive(p.k!)} aria-pressed={active === p.k} disabled={picked[p.k!] !== undefined}
            className={`mx-0.5 rounded-lg border-2 px-1.5 font-en font-black transition ${picked[p.k!] !== undefined ? "border-emerald-200 bg-emerald-50 text-emerald-900" : active === p.k ? "border-amber-400 bg-amber-50 text-amber-800" : "border-dashed border-amber-200 bg-white text-slate-900 hover:bg-amber-50"} ${FOCUS32}`}>
            {p.t}
          </button>
        ))}
      </div>
      {active !== null && picked[active] === undefined && (
        <div className="space-y-2">
          <p className="text-xs font-black text-amber-800"><Rich text={`ما زمن العبارة: «${phraseLabel(active).trim()}»؟`} /></p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="اختيار الزمن">
            {["Present Perfect", "Present Perfect Continuous"].map((opt) => (
              <button key={opt} type="button" onClick={() => choose(active, opt)} data-tense-opt={opt} dir="ltr"
                className={`l32-tap px-3 font-en text-sm font-extrabold ${FOCUS32}`}>{opt}</button>
            ))}
          </div>
        </div>
      )}
      {msg && <Verdict32 ok={msg.ok} text={msg.text} why={msg.why} />}
    </div>
  );
}

// ---------------------------------------------------------------
// 17) الخريطة — GearMap32 (أربعة تروس تُفعَّل بالنقر)
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
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="تروس الحاضر">
        {gears.map((x) => (
          <button key={x.key} type="button" onClick={() => pick(x.key)} aria-pressed={cur === x.key}
            className={`l32-tap l32-tap-card ${cur === x.key ? "l32-tap-primary" : seen.has(x.key) ? "l32-tap-aqua" : ""} ${FOCUS32}`}>
            <span className="block text-xl" aria-hidden>{x.emoji}</span>
            <En className="mt-1 block text-sm font-black">{x.tag}</En>
          </button>
        ))}
      </div>
      <div className="l32-card l32-card-aqua p-3">
        <div dir="ltr" className="ltr-row"><En className="l32-deck-en text-cyan-900">{g.en}</En></div>
        <p className="mt-1 text-sm font-semibold text-slate-600"><Rich text={g.ar} /></p>
        <div className="mt-1.5"><SourceBadge32 src /></div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 18) قائمة الأهداف — ObjectivesChecklist32
// ---------------------------------------------------------------
export function ObjectivesChecklist32({ items, onDone }: { items: { n: string; text: string }[]; onDone?: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const fired = useRef(false);
  const toggle = (i: number) => {
    const n = new Set(checked);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    setChecked(n);
    if (n.size === items.length && !fired.current) {
      fired.current = true;
      onDone?.();
    }
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
                className={`l32-tap l32-tap-card w-full gap-2 ${on ? "l32-tap-done" : ""} ${FOCUS32}`}>
                <span aria-hidden className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-black ${on ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>{on ? "✓" : o.n}</span>
                <span className="min-w-0 flex-1 text-sm font-bold"><Rich text={o.text} /></span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------
// 19) محور النتيجة مقابل النشاط — LensStage32 (المقارنة الكبرى)
// ---------------------------------------------------------------
export type LensSide32Kit = { en: string; ar: string; see: string };
export type LensPair32Kit = {
  key: string; emoji: string; topic: string; ref: string; src: boolean;
  result: LensSide32Kit; activity: LensSide32Kit;
};
export function LensStage32({ seq, pairs, axis, onBothSeen }: {
  seq: string;
  pairs: LensPair32Kit[];
  axis: { result: { tag: string; icon: string; ar: string }; activity: { tag: string; icon: string; ar: string } };
  onBothSeen?: () => void;
}) {
  const [lens, setLens] = useState<"result" | "activity">("result");
  const [p, setP] = useState(0);
  const [seenLenses, setSeenLenses] = useState<Set<string>>(new Set(["result"]));
  const [seenPairs, setSeenPairs] = useState<Set<number>>(new Set([0]));
  const fired = useRef(false);
  const pair = pairs[p];
  const side = lens === "result" ? pair.result : pair.activity;
  const ax = lens === "result" ? axis.result : axis.activity;

  const pickLens = (l: "result" | "activity") => {
    setLens(l);
    const n = new Set(seenLenses);
    n.add(l);
    setSeenLenses(n);
    if (n.size === 2 && !fired.current) {
      fired.current = true;
      onBothSeen?.();
    }
  };
  const move = (d: number) => {
    const n = (p + d + pairs.length) % pairs.length;
    setP(n);
    const s = new Set(seenPairs);
    s.add(n);
    setSeenPairs(s);
  };

  return (
    <div className="space-y-3">
      {/* العدستان */}
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="اختيار العدسة">
        <button type="button" aria-pressed={lens === "result"} onClick={() => pickLens("result")}
          className={`l32-lens flex min-h-[52px] flex-1 items-center gap-2 px-3 py-2 text-start sm:max-w-[16rem] ${FOCUS32}`}
          data-lens="result">
          <span aria-hidden className="text-xl">{axis.result.icon}</span>
          <span className="min-w-0">
            <span className="block text-sm font-black"><Rich text="عدسة النتيجة" /></span>
            <span dir="ltr" className="block font-en text-[11px] font-bold text-indigo-800">{axis.result.tag}</span>
          </span>
        </button>
        <span className="l32-vs" aria-hidden>VS</span>
        <button type="button" aria-pressed={lens === "activity"} onClick={() => pickLens("activity")}
          className={`l32-lens flex min-h-[52px] flex-1 items-center gap-2 px-3 py-2 text-start sm:max-w-[16rem] ${FOCUS32}`}
          data-lens="activity">
          <span aria-hidden className="text-xl">{axis.activity.icon}</span>
          <span className="min-w-0">
            <span className="block text-sm font-black"><Rich text="عدسة النشاط" /></span>
            <span dir="ltr" className="block font-en text-[11px] font-bold text-cyan-800">{axis.activity.tag}</span>
          </span>
        </button>
      </div>

      {/* المسرح: المشهد نفسه تحت العدستين */}
      <div className="l32-card p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="l32-chip l32-chip-indigo"><Rich text={`${pair.emoji} ${pair.topic}`} /></span>
          <span className="l32-chip"><Rich text={`مثال ${p + 1} من ${pairs.length} · ${pair.ref}`} /></span>
        </div>
        <div className="l32-scene" data-mode={lens === "result" ? "done" : "active"} aria-hidden>
          <span className="l32-scene-clock">{lens === "result" ? "🏁 ended" : "⏳ in progress"}</span>
          <div className="l32-scene-wall" />
          <span className="l32-scene-brush" style={{ insetInlineStart: "18%" } as CSSProperties}>🖌️</span>
          <span className="l32-scene-drop" style={{ insetInlineStart: "34%" } as CSSProperties} />
          <span className="l32-scene-drop" style={{ insetInlineStart: "52%", animationDelay: "0.7s" } as CSSProperties} />
          <span className="l32-scene-drop" style={{ insetInlineStart: "70%", animationDelay: "1.3s" } as CSSProperties} />
        </div>

        <div className={`mt-3 rounded-2xl border-2 p-3 ${lens === "result" ? "border-indigo-200 bg-indigo-50" : "border-cyan-200 bg-cyan-50/60"}`}>
          <div dir="ltr" className="ltr-row text-center">
            <En className="l32-en-display text-lg font-black text-slate-900 md:text-2xl">{side.en}</En>
          </div>
          <p className="mt-1 text-center text-sm font-bold text-slate-600 md:text-base"><Rich text={side.ar} /></p>
          <p className="mt-2 text-center text-xs font-bold text-slate-600 md:text-sm">
            <Rich text={`${lens === "result" ? "🏆 ما تراه: " : "🎥 ما تراه: "}${side.see}`} />
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <SourceBadge32 src={pair.src} />
            <span className="l32-chip"><Rich text={ax.ar} /></span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => move(-1)} className={`l32-tap px-3 text-sm ${FOCUS32}`}>→ <Rich text="المثال السابق" /></button>
          <div className="flex items-center gap-1" aria-hidden>
            {pairs.map((_, i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${i === p ? "bg-cyan-700" : seenPairs.has(i) ? "bg-cyan-200" : "bg-slate-200"}`} />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} className={`l32-tap px-3 text-sm ${FOCUS32}`}>← <Rich text="المثال التالي" /></button>
        </div>
        <p className="mt-2 text-center text-xs font-bold text-slate-500">
          <Rich text={`بدّل العدستين (${seenLenses.size}/2) وتنقّل بين أمثلة المصدر (${seenPairs.size}/${pairs.length}).`} />
        </p>
      </div>
    </div>
  );
}
