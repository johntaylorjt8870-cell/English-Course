import { Fragment, useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  BUILDER,
  ROLE_INFO,
  PRONOUNS_PREVIEW,
  sent,
  type Slide,
  type Block,
  type Exercise,
  type Role,
  type Sentence,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// ألوان الأدوار — ثابتة في كل الدرس (أزرق = فاعل، برتقالي = فعل، أخضر = مفعول به)
// ============================================================
const ROLE_STYLE: Record<Role, { chip: string; solid: string; text: string; border: string; soft: string; dot: string }> = {
  S: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500 text-white", text: "text-sky-700", border: "border-sky-300", soft: "bg-sky-50", dot: "bg-sky-500" },
  V: { chip: "bg-orange-100 border-orange-300 text-orange-900", solid: "bg-orange-500 text-white", text: "text-orange-700", border: "border-orange-300", soft: "bg-orange-50", dot: "bg-orange-500" },
  O: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", solid: "bg-emerald-500 text-white", text: "text-emerald-700", border: "border-emerald-300", soft: "bg-emerald-50", dot: "bg-emerald-500" },
};
const NEUTRAL = "bg-white border-slate-200 text-slate-800";

// ============================================================
// عناصر أساسية
// ============================================================

/** نص عربي يحتوي على مقاطع إنجليزية بين [[ ]] تُعرض بشكل معزول وصحيح */
function Rich({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[.+?\]\])/g);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        const m = p.match(/^\[\[(.+)\]\]$/);
        if (m) {
          return (
            <span key={i} dir="ltr" className="font-en mx-1 rounded-md bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-800">
              {m[1]}
            </span>
          );
        }
        return <LatinRuns key={i} text={p} />;
      })}
    </span>
  );
}

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="ltr" className={`font-en inline-block ${className}`}>
      {children}
    </span>
  );
}

function Mixed({ text }: { text: string }) {
  return <LatinRuns text={text} />;
}

/** قطعة بناء واحدة: كلمة إنجليزية + (اختياريًا) دورها */
function WordBlock({
  text,
  role,
  reveal = true,
  label = true,
  size = "md",
}: {
  text: string;
  role?: Role;
  reveal?: boolean;
  label?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const colored = role && reveal;
  const st = colored ? ROLE_STYLE[role] : null;
  const sz = size === "lg" ? "px-5 py-3 text-3xl" : size === "sm" ? "px-3 py-1.5 text-lg" : "px-4 py-2 text-2xl";
  return (
    <span className={`inline-flex flex-col items-center rounded-2xl border-2 ${st ? st.chip : NEUTRAL} ${sz} font-bold leading-tight shadow-sm transition-all`}>
      <span dir="ltr" className="font-en">
        {text}
      </span>
      {colored && label && (
        <span className={`mt-1 text-[11px] font-semibold ${st!.text}`}>
          <span dir="ltr" className="font-en">
            {ROLE_INFO[role].en}
          </span>
          {" · "}
          {ROLE_INFO[role].ar}
        </span>
      )}
    </span>
  );
}

/** جملة كاملة مبنية من قطع */
function SentenceBlocks({ s, reveal = true, size = "md", label = true }: { s: Sentence; reveal?: boolean; size?: "sm" | "md" | "lg"; label?: boolean }) {
  return (
    <div>
      <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="svo-tokens" className="ltr-row flex flex-wrap items-start gap-2">
        {s.tokens.map((t, i) => (
          <WordBlock key={i} text={t.text} role={t.role} reveal={reveal} size={size} label={label} />
        ))}
        <span className="font-en pt-1 text-3xl font-bold text-slate-300">.</span>
      </div>
      <div className="mt-2 text-lg text-slate-500">{s.ar}</div>
    </div>
  );
}

function SentenceCard({ s, hide }: { s: Sentence; hide?: boolean }) {
  const [show, setShow] = useState(!hide);
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SentenceBlocks s={s} reveal={show} />
        {hide && (
          <button
            onClick={() => setShow((v) => !v)}
            className={`rounded-xl px-4 py-2 text-sm font-bold shadow-sm transition ${show ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-slate-700"}`}
          >
            {show ? "إخفاء الأجزاء" : "🔍 اكشف الأجزاء"}
          </button>
        )}
      </div>
    </div>
  );
}

function Formula({ roles, example, big }: { roles: Role[]; example?: string[]; big?: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5">
      <div dir="ltr" data-en-seq="svo-roles" className="flex flex-wrap items-center justify-center gap-3">
        {roles.map((r, i) => (
          <Fragment key={r}>
            {i > 0 && <span className="text-3xl font-bold text-slate-300">+</span>}
            <div className={`flex flex-col items-center rounded-2xl ${ROLE_STYLE[r].solid} ${big ? "px-8 py-4" : "px-6 py-3"} shadow-md`}>
              <span dir="ltr" className={`font-en font-extrabold ${big ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                {ROLE_INFO[r].en}
              </span>
              <span className={`font-semibold opacity-90 ${big ? "text-base" : "text-sm"}`}>{ROLE_INFO[r].ar}</span>
            </div>
          </Fragment>
        ))}
      </div>
      {example && (
        <div dir="ltr" className="mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-dashed border-slate-200 pt-4">
          {example.map((w, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="text-2xl font-bold text-slate-300">+</span>}
              <WordBlock text={w} role={roles[i]} label={false} />
            </Fragment>
          ))}
          <span className="font-en text-2xl font-bold text-slate-300">.</span>
        </div>
      )}
    </div>
  );
}

function RolesRow({ roles, withQ }: { roles: Role[]; withQ?: boolean }) {
  return (
    <div dir="ltr" data-en-seq="svo-cards" className={`grid gap-3 ${roles.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {roles.map((r) => (
        <div key={r} dir="rtl" className={`rounded-3xl border-2 ${ROLE_STYLE[r].border} ${ROLE_STYLE[r].soft} p-4`}>
          <div className="flex items-center justify-between">
            <En className={`text-2xl font-extrabold ${ROLE_STYLE[r].text}`}>{ROLE_INFO[r].en}</En>
            <span className="text-2xl">{ROLE_INFO[r].emoji}</span>
          </div>
          <div className="mt-1 text-xl font-bold text-slate-700">= {ROLE_INFO[r].ar}</div>
          {withQ && <div className="mt-1 text-sm text-slate-500">{ROLE_INFO[r].q}</div>}
        </div>
      ))}
    </div>
  );
}

function Term({ en, ar, desc, role }: { en: string; ar: string; desc?: string; role?: Role }) {
  const st = role ? ROLE_STYLE[role] : null;
  return (
    <div className={`flex flex-wrap items-center gap-4 rounded-3xl border-2 p-5 ${st ? `${st.border} ${st.soft}` : "border-violet-200 bg-violet-50"}`}>
      <En className={`text-4xl font-extrabold ${st ? st.text : "text-violet-700"}`}>{en}</En>
      <span className="text-3xl font-bold text-slate-300">=</span>
      <span className="font-head text-3xl font-bold text-slate-800">{ar}</span>
      {desc && <span className="basis-full text-lg text-slate-600">{desc}</span>}
    </div>
  );
}

function Plain({ en, ar }: { en: string; ar: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <En className="text-3xl font-bold text-slate-800">{en}</En>
      <span className="text-lg text-slate-500">{ar}</span>
    </div>
  );
}

function QA({ sentence, q, a, role }: { sentence: string; q: string; a: string; role: Role }) {
  const [open, setOpen] = useState(false);
  const st = ROLE_STYLE[role];
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <En className="text-2xl font-bold text-slate-800">{sentence}</En>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-base font-semibold text-slate-600">❓ {q}</span>
        {open ? (
          <span className={`tada flex items-center gap-2 rounded-2xl border-2 ${st.border} ${st.soft} px-3 py-1.5`}>
            <En className={`text-xl font-extrabold ${st.text}`}>{a}</En>
            <span className="text-slate-400">=</span>
            <En className={`text-sm font-bold ${st.text}`}>{ROLE_INFO[role].en}</En>
            <span dir="rtl" className="text-sm text-slate-500">
              ({ROLE_INFO[role].ar})
            </span>
          </span>
        ) : (
          <button onClick={() => setOpen(true)} className="mr-auto rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-slate-700">
            أظهر الجواب
          </button>
        )}
      </div>
    </div>
  );
}

function Verdict({ ok, en, ar }: { ok: boolean; en: string; ar?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 rounded-3xl border-2 p-4 ${ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg font-bold text-white ${ok ? "bg-emerald-500" : "bg-rose-500"}`}>
        {ok ? "✓" : "✕"}
      </span>
      <En className={`text-2xl font-bold ${ok ? "text-emerald-800" : "text-rose-800 line-through decoration-rose-300"}`}>{en}</En>
      {ar && <span className="text-base text-slate-500">{ar}</span>}
    </div>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-4">
      <span className="text-3xl">{emoji}</span>
      <Rich text={text} className="text-lg font-semibold text-slate-800" />
    </div>
  );
}

function Patterns() {
  const cards: { label: string; roles: Role[]; s: Sentence }[] = [
    { label: "النمط الأول", roles: ["S", "V"], s: sent("I:S sleep:V", "أنا أنام.") },
    { label: "النمط الثاني", roles: ["S", "V", "O"], s: sent("I:S eat:V apples:O", "أنا آكل التفاح.") },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((c) => (
        <div key={c.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 text-sm font-bold text-slate-400">{c.label}</div>
          <div dir="ltr" className="flex flex-wrap items-center gap-2">
            {c.roles.map((r, i) => (
              <Fragment key={r}>
                {i > 0 && <span className="text-xl font-bold text-slate-300">+</span>}
                <span className={`rounded-xl px-3 py-1.5 font-en text-lg font-bold ${ROLE_STYLE[r].solid}`}>{ROLE_INFO[r].en}</span>
              </Fragment>
            ))}
          </div>
          <div className="mt-4">
            <SentenceBlocks s={c.s} size="sm" label={false} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Steps() {
  const steps: { n: string; t: string; r: Role; ex: string }[] = [
    { n: "①", t: "اختر الفاعل", r: "S", ex: "I" },
    { n: "②", t: "اختر الفعل", r: "V", ex: "eat" },
    { n: "③", t: "اختر المفعول به", r: "O", ex: "apples" },
  ];
  return (
    <div dir="ltr" className="grid gap-3 sm:grid-cols-3">
      {steps.map((s) => (
        <div key={s.r} dir="rtl" className={`rounded-3xl border-2 ${ROLE_STYLE[s.r].border} ${ROLE_STYLE[s.r].soft} p-4 text-center`}>
          <div className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${ROLE_STYLE[s.r].solid} text-2xl font-bold shadow`}>{s.n}</div>
          <div className="mt-2 text-lg font-bold text-slate-800">{s.t}</div>
          <div className="mt-2">
            <WordBlock text={s.ex} role={s.r} label={false} size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Build({ rows }: { rows: { s: string; v: string; o: string; ar: string }[] }) {
  return (
    <div className="grid gap-3">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div dir="ltr" className="flex flex-wrap items-center gap-2">
            <WordBlock text={row.s} role="S" label={false} size="sm" />
            <span className="text-xl font-bold text-slate-300">+</span>
            <WordBlock text={row.v} role="V" label={false} size="sm" />
            <span className="text-xl font-bold text-slate-300">+</span>
            <WordBlock text={row.o} role="O" label={false} size="sm" />
          </div>
          <span className="text-2xl font-bold text-slate-300">=</span>
          <div>
            <En className="text-2xl font-extrabold text-slate-800">
              {row.s} {row.v} {row.o}.
            </En>
            <div className="text-slate-500">{row.ar}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "text":
      return <Rich text={b.text} className="block text-xl leading-relaxed text-slate-700" />;
    case "term":
      return <Term {...b} />;
    case "roles":
      return <RolesRow roles={b.roles} withQ={b.withQ} />;
    case "formula":
      return <Formula roles={b.roles} example={b.example} big={b.big} />;
    case "plain":
      return <Plain en={b.en} ar={b.ar} />;
    case "sentence":
      return <SentenceCard s={b.s} hide={b.hide} />;
    case "qa":
      return <QA {...b} />;
    case "ok":
      return <Verdict ok en={b.en} ar={b.ar} />;
    case "bad":
      return <Verdict ok={false} en={b.en} ar={b.ar} />;
    case "note":
      return <Note emoji={b.emoji} text={b.text} />;
    case "patterns":
      return <Patterns />;
    case "steps":
      return <Steps />;
    case "build":
      return <Build rows={b.rows} />;
  }
}

// ============================================================
// إطار الشريحة
// ============================================================

function SlideFrame({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
}: {
  mascot: string;
  step?: number | string;
  badge?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  tip?: string;
}) {
  return (
    <section className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-10">
      <div className="pointer-events-none absolute left-6 top-5 select-none text-5xl anim-drift md:text-6xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-3">
        {step !== undefined && (
          <span className="font-head grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-xl font-bold text-white shadow">{step}</span>
        )}
        {badge && <span className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-bold text-violet-700">{badge}</span>}
      </div>
      <h2 className="font-head mt-4 max-w-[85%] text-3xl font-bold leading-snug text-slate-900 md:text-4xl">
        {typeof title === "string" ? <Mixed text={title} /> : title}
      </h2>
      {lead && <p className="mt-2 max-w-[85%] text-xl text-slate-500">{typeof lead === "string" ? <Mixed text={lead} /> : lead}</p>}
      <div className="mt-7 space-y-4">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-900 p-4 text-white">
          <span className="text-3xl">🦉</span>
          <span className="text-lg font-semibold">
            <Mixed text={tip} />
          </span>
        </div>
      )}
    </section>
  );
}

// ============================================================
// شرائح خاصة
// ============================================================

function Cover({ mascot }: { mascot: string }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-14">
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sky-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-orange-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">{mascot}</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">الدرس الأول</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">تكوين الجملة الإنجليزية</h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500">
          <span dir="ltr">
            <En>Sentence Structure</En>
          </span>
        </p>
        <div className="pop pop-4 mt-8 flex justify-center">
          <Formula roles={["S", "V", "O"]} />
        </div>
        <p className="pop pop-5 mt-8 text-base text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives({ mascot }: { mascot: string }) {
  return (
    <SlideFrame mascot={mascot} badge="أهداف الدرس" title="في نهاية الدرس سيكون الطالب قادرًا على:">
      <div className="grid gap-3">
        {[
          { n: 1, node: <Rich text="فهم معنى كلمة [[Sentence]]" /> },
          { n: 2, node: <span>معرفة أن الجملة الإنجليزية تحتاج إلى ترتيب محدد</span> },
          { n: 3, node: <span>معرفة الفرق بين الفاعل والفعل والمفعول به:</span> },
        ].map((g, i) => (
          <div key={g.n} className={`pop pop-${i + 1} flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-xl text-slate-700`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 font-bold text-white">{g.n}</span>
            {g.node}
          </div>
        ))}
        <div className="pop pop-4 pr-2">
          <RolesRow roles={["S", "V", "O"]} />
        </div>
        <div className="pop pop-5 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-xl text-slate-700">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 font-bold text-white">4</span>
          <span>تكوين جمل إنجليزية بسيطة بنفسه.</span>
        </div>
      </div>
    </SlideFrame>
  );
}

function BuilderSlide({ mascot, title }: { mascot: string; title: string }) {
  const [s, setS] = useState<number | null>(null);
  const [v, setV] = useState<number | null>(null);
  const [o, setO] = useState<number | null>(null); // -1 = بدون مفعول به

  const subj = s !== null ? BUILDER.subjects[s] : null;
  const verb = v !== null ? BUILDER.verbs[v] : null;
  const obj = o !== null && o >= 0 ? BUILDER.objects[o] : null;
  const third = subj ? subj.conj === "He" || subj.conj === "She" : false;
  const verbForm = (vb: (typeof BUILDER.verbs)[number]) => (third ? vb.s : vb.base);

  const sentence: Sentence | null =
    subj && verb
      ? {
          tokens: [
            { text: subj.en, role: "S" },
            { text: verbForm(verb), role: "V" },
            ...(obj ? [{ text: obj.en, role: "O" as Role }] : []),
          ],
          ar: `${subj.ar} ${verb.ar[subj.conj]}${obj ? " " + obj.ar : ""}.`,
        }
      : null;

  const random = () => {
    setS(Math.floor(Math.random() * BUILDER.subjects.length));
    setV(Math.floor(Math.random() * BUILDER.verbs.length));
    setO(Math.floor(Math.random() * BUILDER.objects.length));
  };
  const reset = () => {
    setS(null);
    setV(null);
    setO(null);
  };

  const col = (role: Role, head: string, children: React.ReactNode) => (
    <div className={`rounded-3xl border-2 ${ROLE_STYLE[role].border} ${ROLE_STYLE[role].soft} p-4`}>
      <div dir="rtl" className="mb-3 flex items-center justify-between">
        <En className={`text-xl font-extrabold ${ROLE_STYLE[role].text}`}>{ROLE_INFO[role].en}</En>
        <span className="text-sm font-bold text-slate-500">{head}</span>
      </div>
      <div dir="ltr" className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );

  const chip = (active: boolean, role: Role, onClick: () => void, text: string, key: string | number) => (
    <button
      key={key}
      dir="ltr"
      onClick={onClick}
      className={`rounded-xl border-2 px-3 py-1.5 font-en text-lg font-bold transition active:scale-95 ${
        active ? `${ROLE_STYLE[role].solid} border-transparent shadow` : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
      }`}
    >
      {text}
    </button>
  );

  return (
    <SlideFrame mascot={mascot} step={10} title={title} lead="اختر قطعة من كل عمود وشاهد الجملة تتكوّن أمامك.">
      <div dir="ltr" className="grid gap-4 md:grid-cols-3">
        {col("S", "① اختر الفاعل", BUILDER.subjects.map((x, i) => chip(s === i, "S", () => setS(i), x.en, x.en)))}
        {col("V", "② اختر الفعل", BUILDER.verbs.map((x, i) => chip(v === i, "V", () => setV(i), verbForm(x), x.base)))}
        {col("O", "③ اختر المفعول به", [
          ...BUILDER.objects.map((x, i) => chip(o === i, "O", () => setO(i), x.en, x.en)),
          <button
            key="none"
            onClick={() => setO(-1)}
            className={`rounded-xl border-2 border-dashed px-3 py-1.5 text-sm font-bold transition ${o === -1 ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white text-slate-500 hover:border-slate-400"}`}
          >
            بدون مفعول به
          </button>,
        ])}
      </div>

      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-5">
        {sentence ? (
          <div key={sentence.ar} className="pop">
            <SentenceBlocks s={sentence} size="lg" />
          </div>
        ) : (
          <div className="py-6 text-center text-xl text-slate-400">اختر فاعلًا وفعلًا لتظهر الجملة هنا ✨</div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={random} className="rounded-xl bg-violet-600 px-4 py-2 font-bold text-white shadow transition hover:bg-violet-700">
          🎲 جملة عشوائية
        </button>
        <button onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-600 transition hover:bg-slate-200">
          ↺ مسح
        </button>
      </div>
    </SlideFrame>
  );
}

function PronounsSlide({ mascot, title }: { mascot: string; title: string }) {
  return (
    <SlideFrame mascot={mascot} step={11} title={title} lead="قبل أن ندخل في الأزمنة، من المهم أن يرى الطالب الضمائر الأساسية من الآن.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PRONOUNS_PREVIEW.map((p, i) => (
          <div key={p.en} className={`pop pop-${Math.min(i + 1, 6)} flex items-center gap-3 rounded-2xl border-2 border-sky-200 bg-sky-50 p-3`}>
            <span className="text-3xl">{p.emoji}</span>
            <div>
              <En className="text-2xl font-extrabold text-sky-800">{p.en}</En>
              <div className="text-sm font-semibold text-slate-600">{p.ar}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <span className="text-lg text-slate-600">سنأخذ الضمائر بالتفصيل في الدرس القادم.</span>
        <a href="#/lesson/2" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
          الدرس 2: الضمائر و <En>Verb to be</En> ←
        </a>
      </div>
    </SlideFrame>
  );
}

function SummarySlide({ mascot, title }: { mascot: string; title: string }) {
  return (
    <SlideFrame mascot={mascot} badge="ملخص" title={title} lead="احفظ هذه الكلمات الثلاث والترتيب الأساسي:">
      <RolesRow roles={["S", "V", "O"]} withQ />
      <Formula roles={["S", "V", "O"]} example={["Khalil", "plays", "football"]} big />
      <SentenceCard s={sent("Khalil:S plays:V football:O", "خليل يلعب كرة القدم.")} />
      <div className="grid gap-3 md:grid-cols-[auto_1fr] md:items-center">
        <div className="font-head text-xl font-bold text-slate-700">وأحيانًا بدون مفعول به:</div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <SentenceBlocks s={sent("Khalil:S sleeps:V", "خليل ينام.")} size="sm" />
        </div>
      </div>
    </SlideFrame>
  );
}

function Closing({ mascot, title, onExit }: { mascot: string; title: string; onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-center text-white shadow-xl md:p-14">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">{mascot}</div>
        <div className="pop pop-1 mt-3 text-sm font-bold text-slate-400">⭐ {title}</div>
        <h2 className="pop pop-2 font-head mt-2 text-3xl font-bold md:text-5xl">لا تحفظ الإنجليزية ككلمات منفردة</h2>
        <p className="pop pop-3 mt-3 text-xl text-slate-300">تعلّم كيف تبني الجملة:</p>
        <div dir="ltr" className="pop pop-4 mt-8 flex flex-wrap items-center justify-center gap-3">
          {(["S", "V", "O"] as Role[]).map((r, i) => (
            <Fragment key={r}>
              {i > 0 && <span className="text-3xl text-slate-500">→</span>}
              <div className={`rounded-2xl ${ROLE_STYLE[r].solid} px-6 py-3 shadow-lg`}>
                <div dir="ltr" className="font-en text-2xl font-extrabold md:text-3xl">
                  {ROLE_INFO[r].en}
                </div>
                <div className="text-sm opacity-90">{ROLE_INFO[r].ar}</div>
              </div>
            </Fragment>
          ))}
        </div>
        <p className="pop pop-5 mt-6 text-lg text-slate-300">فاعل ← فعل ← مفعول به</p>
        <div className="pop pop-6 mt-10 flex flex-wrap justify-center gap-3">
          <a href="#/lesson/2" className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">
            الدرس التالي: الضمائر و <En>Verb to be</En> ←
          </a>
          <button onClick={onExit} className="rounded-xl border border-white/30 px-5 py-2.5 font-bold text-white transition hover:bg-white/10">
            جميع الدروس
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// التمارين التفاعلية
// ============================================================

function NumBadge({ n }: { n: number }) {
  return <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{n}</span>;
}

function SmallBtn({ onClick, children, dark }: { onClick: () => void; children: React.ReactNode; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-3.5 py-1.5 text-sm font-bold shadow-sm transition ${dark ? "bg-slate-900 text-white hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
    >
      {children}
    </button>
  );
}

function TagItem({ n, s, roles }: { n: number; s: Sentence; roles: Role[] }) {
  const [picked, setPicked] = useState<(Role | undefined)[]>(() => s.tokens.map(() => undefined));
  const [checked, setChecked] = useState(false);

  const cycle = (i: number) => {
    setChecked(false);
    setPicked((p) => {
      const cur = p[i];
      const idx = cur ? roles.indexOf(cur) : -1;
      const next = idx + 1 >= roles.length ? undefined : roles[idx + 1];
      const copy = [...p];
      copy[i] = next;
      return copy;
    });
  };
  const allRight = checked && picked.every((r, i) => r === s.tokens[i].role);

  return (
    <div className={`rounded-3xl border-2 p-4 transition ${allRight ? "border-emerald-300 bg-emerald-50/60" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <NumBadge n={n} />
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-start gap-2">
          {s.tokens.map((t, i) => {
            const r = picked[i];
            const st = r ? ROLE_STYLE[r] : null;
            const right = checked && r === t.role;
            const wrong = checked && r !== t.role;
            return (
              <button
                key={i}
                onClick={() => cycle(i)}
                className={`relative flex flex-col items-center rounded-2xl border-2 px-4 py-2 text-2xl font-bold shadow-sm transition active:scale-95 ${st ? st.chip : "border-dashed border-slate-300 bg-white text-slate-800"} ${
                  wrong ? "ring-2 ring-rose-400" : right ? "ring-2 ring-emerald-400" : ""
                }`}
              >
                <span dir="ltr" className="font-en">
                  {t.text}
                </span>
                <span className={`mt-1 text-[11px] font-semibold ${st ? st.text : "text-slate-400"}`}>
                  {r ? (
                    <>
                      <span dir="ltr" className="font-en">
                        {ROLE_INFO[r].en}
                      </span>
                      {" · "}
                      {ROLE_INFO[r].ar}
                    </>
                  ) : (
                    "اضغط لتحديد الدور"
                  )}
                </span>
                {checked && (
                  <span className={`absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full text-xs text-white ${right ? "bg-emerald-500" : "bg-rose-500"}`}>
                    {right ? "✓" : "✕"}
                  </span>
                )}
              </button>
            );
          })}
          <span className="font-en pt-1 text-2xl font-bold text-slate-300">.</span>
        </div>
        <div className="mr-auto flex flex-wrap gap-2">
          <SmallBtn dark onClick={() => setChecked(true)}>
            تحقق ✓
          </SmallBtn>
          <SmallBtn
            onClick={() => {
              setPicked(s.tokens.map((t) => t.role));
              setChecked(true);
            }}
          >
            الحل 💡
          </SmallBtn>
          <SmallBtn
            onClick={() => {
              setPicked(s.tokens.map(() => undefined));
              setChecked(false);
            }}
          >
            ↺
          </SmallBtn>
        </div>
      </div>
      {allRight && (
        <div className="tada mt-3 flex items-center gap-2 font-bold text-emerald-700">
          <span className="text-xl">🎉</span> ممتاز! <span className="font-normal text-slate-500">{s.ar}</span>
        </div>
      )}
    </div>
  );
}

function OrderItem({ n, item }: { n: number; item: { scrambled: string[]; correct: string[]; ar: string } }) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  const complete = placed.length === item.scrambled.length;
  const words = placed.map((i) => item.scrambled[i]);
  const correct = complete && words.join(" ") === item.correct.join(" ");
  const wrong = complete && !correct;
  const shown = revealed ? item.correct : words;
  const done = correct || revealed;

  return (
    <div className={`rounded-3xl border-2 p-4 transition ${done ? "border-emerald-300 bg-emerald-50/60" : wrong ? "border-rose-300 bg-rose-50/40" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <NumBadge n={n} />
        <div dir="ltr" className="flex flex-wrap gap-2">
          {item.scrambled.map((w, i) => (
            <button
              key={i}
              disabled={placed.includes(i) || revealed}
              onClick={() => setPlaced((p) => [...p, i])}
              className="rounded-xl border-2 border-slate-300 bg-white px-4 py-2 font-en text-xl font-bold text-slate-800 shadow-sm transition hover:border-slate-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25"
            >
              {w}
            </button>
          ))}
        </div>
        <div className="mr-auto flex gap-2">
          {!done && <SmallBtn onClick={() => setRevealed(true)}>الحل 💡</SmallBtn>}
          <SmallBtn
            onClick={() => {
              setPlaced([]);
              setRevealed(false);
            }}
          >
            ↺
          </SmallBtn>
        </div>
      </div>

      <div
        key={wrong ? "w" + placed.join() : "ok"}
        dir="ltr"
        style={{ direction: "ltr" }}
        className={`ltr-row mt-3 flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-3 ${done ? "border-emerald-300 bg-white" : wrong ? "shake border-rose-300 bg-white" : "border-slate-300 bg-slate-50"}`}
      >
        {shown.length === 0 && (
          <span dir="rtl" className="w-full text-center text-slate-400">
            اضغط على الكلمات بالترتيب الصحيح
          </span>
        )}
        {shown.map((w, i) => (
          <button
            key={i}
            onClick={() => !revealed && setPlaced((p) => p.filter((_, j) => j !== i))}
            className={`rounded-xl border-2 px-4 py-2 font-en text-xl font-bold shadow-sm transition ${done ? ROLE_STYLE[(["S", "V", "O"] as Role[])[i]].chip : wrong ? "border-rose-300 bg-rose-50 text-rose-800" : "border-slate-300 bg-white text-slate-800"}`}
          >
            {w}
          </button>
        ))}
        {shown.length > 0 && <span className="font-en text-2xl font-bold text-slate-300">.</span>}
      </div>

      {done && (
        <div className="tada mt-2 flex flex-wrap items-center gap-3 font-bold text-emerald-700">
          <span className="text-xl">🎉</span>
          <En>{item.correct.join(" ")}.</En>
          <span className="font-normal text-slate-500">{item.ar}</span>
        </div>
      )}
      {wrong && <div className="mt-2 font-bold text-rose-600">✕ الترتيب غير صحيح — اضغط على كلمة لإرجاعها وحاول مجددًا</div>}
    </div>
  );
}

function ComposeItem({ n, item }: { n: number; item: Extract<Exercise, { type: "compose" }>["items"][number] }) {
  const [picked, setPicked] = useState<{ en: string; ar: string } | null>(null);
  const [custom, setCustom] = useState("");
  const active = custom.trim() ? custom.trim() : picked?.en ?? "";
  const ar = custom.trim() ? null : picked?.ar ?? null;

  return (
    <div className={`rounded-3xl border-2 p-4 transition ${active ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <NumBadge n={n} />
        <div dir="ltr" className="flex flex-wrap items-center gap-2">
          <WordBlock text={item.s} role="S" label={false} />
          <span className="text-xl font-bold text-slate-300">+</span>
          <WordBlock text={item.v} role="V" label={false} />
          <span className="text-xl font-bold text-slate-300">+</span>
          <span
            dir="ltr"
            className={`inline-flex min-w-28 items-center justify-center rounded-2xl border-2 px-4 py-2 font-en text-2xl font-bold transition ${
              active ? ROLE_STYLE.O.chip : "border-dashed border-emerald-300 text-emerald-300"
            }`}
          >
            {active || "…"}
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 pr-12">
        <span className="text-sm font-semibold text-slate-500">اختر مفعولًا به:</span>
        {item.objects.map((o) => (
          <button
            key={o.en}
            dir="ltr"
            onClick={() => {
              setPicked(o);
              setCustom("");
            }}
            className={`rounded-xl border-2 px-3 py-1 font-en font-bold transition ${picked?.en === o.en && !custom.trim() ? ROLE_STYLE.O.chip : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"}`}
          >
            {o.en}
          </button>
        ))}
        <input
          dir="ltr"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="or type your own…"
          className="font-en w-44 rounded-xl border-2 border-slate-200 bg-white px-3 py-1 text-slate-700 outline-none transition focus:border-emerald-400"
        />
      </div>
      {active && (
        <div key={active} className="pop mt-3 flex flex-wrap items-center gap-3 pr-12">
          <span className="text-xl">🎉</span>
          <En className="text-2xl font-extrabold text-slate-800">
            {item.s} {item.v} {active}.
          </En>
          {ar && (
            <span className="text-slate-500">
              {item.sAr} {item.vAr} {ar}.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function ExerciseSlide({ s }: { s: Extract<Slide, { kind: "exercise" }> }) {
  const ex = s.ex;
  return (
    <SlideFrame mascot={s.mascot} badge={s.badge} title={s.title} lead={s.subtitle}>
      {ex.type === "tag" && (
        <>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>الألوان:</span>
            {ex.roles.map((r) => (
              <span key={r} className={`flex items-center gap-1.5 rounded-full border ${ROLE_STYLE[r].border} ${ROLE_STYLE[r].soft} px-2.5 py-0.5 font-semibold`}>
                <span className={`h-2.5 w-2.5 rounded-full ${ROLE_STYLE[r].dot}`} />
                <En>{ROLE_INFO[r].en}</En> = {ROLE_INFO[r].ar}
              </span>
            ))}
          </div>
          <div className="grid gap-3">
            {ex.items.map((it, i) => (
              <TagItem key={i} n={i + 1} s={it} roles={ex.roles} />
            ))}
          </div>
        </>
      )}
      {ex.type === "order" && (
        <div className="grid gap-3">
          {ex.items.map((it, i) => (
            <OrderItem key={i} n={i + 1} item={it} />
          ))}
        </div>
      )}
      {ex.type === "compose" && (
        <div className="grid gap-3">
          {ex.items.map((it, i) => (
            <ComposeItem key={i} n={i + 1} item={it} />
          ))}
        </div>
      )}
    </SlideFrame>
  );
}

// ============================================================
// عرض الشريحة حسب نوعها
// ============================================================

function SlideView({ s, onExit }: { s: Slide; onExit: () => void }) {
  switch (s.kind) {
    case "cover":
      return <Cover mascot={s.mascot} />;
    case "objectives":
      return <Objectives mascot={s.mascot} />;
    case "lesson":
      return (
        <SlideFrame mascot={s.mascot} step={s.step} title={s.title} lead={s.lead} tip={s.tip}>
          {s.blocks.map((b, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
              <BlockView b={b} />
            </div>
          ))}
        </SlideFrame>
      );
    case "builder":
      return <BuilderSlide mascot={s.mascot} title={s.title} />;
    case "pronouns":
      return <PronounsSlide mascot={s.mascot} title={s.title} />;
    case "summary":
      return <SummarySlide mascot={s.mascot} title={s.title} />;
    case "exercise":
      return <ExerciseSlide s={s} />;
    case "quiz":
      return (
        <SlideFrame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت أنك أتقنت تكوين الجملة.">
          <FinalQuiz lesson={1} accent="bg-slate-900" />
        </SlideFrame>
      );
    case "closing":
      return <Closing mascot={s.mascot} title={s.title} onExit={onExit} />;
  }
}

function slideTitle(s: Slide): string {
  switch (s.kind) {
    case "cover":
      return "الغلاف";
    case "objectives":
      return "أهداف الدرس";
    default:
      return s.title;
  }
}

// ============================================================
// الشريط الجانبي (مسار الدرس)
// ============================================================

function Rail({ i, setI, onExit, onClose }: { i: number; setI: (n: number) => void; onExit: () => void; onClose?: () => void }) {
  const groups = useMemo(() => {
    const g: { section: string; idxs: number[] }[] = [];
    SLIDES.forEach((s, idx) => {
      const last = g[g.length - 1];
      if (last && last.section === s.section) last.idxs.push(idx);
      else g.push({ section: s.section, idxs: [idx] });
    });
    return g;
  }, []);

  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-xl font-bold text-slate-900">الدرس 1 · تكوين الجملة</div>
        <En className="text-xs font-semibold text-slate-400">Sentence Structure</En>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((g) => (
          <div key={g.section} className="mb-3">
            <div className="px-3 py-1 text-xs font-bold text-slate-400">{g.section}</div>
            {g.idxs.map((idx) => {
              const active = idx === i;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setI(idx);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/20" : "bg-slate-100"}`}>{idx + 1}</span>
                  <span className="truncate font-semibold">
                    <Mixed text={slideTitle(SLIDES[idx])} />
                  </span>
                  <span className="mr-auto text-base">{SLIDES[idx].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

// ============================================================
// الدرس 1 — النمط B
// ============================================================

export default function Lesson1({ onExit }: { onExit: () => void }) {
  const [i, setI] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;

  const go = useMemo(
    () => ({
      next: () => setI((v) => Math.min(v + 1, total - 1)),
      prev: () => setI((v) => Math.max(v - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menu) return;
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === "INPUT") return;
      if (e.key === "ArrowLeft") go.next();
      if (e.key === "ArrowRight") go.prev();
      if (e.key === " ") {
        e.preventDefault();
        go.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, menu]);

  // إعادة التمرير لأعلى عند تغيير الشريحة
  useEffect(() => {
    document.getElementById("l1-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800">
      {/* التوقيع البارز في الأعلى */}
      <Signature />

      <div className="relative flex min-h-0 flex-1">
      <SignatureGhost />

      {/* الشريط الجانبي — سطح المكتب */}
      <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
        <Rail i={i} setI={setI} onExit={onExit} />
      </div>

      {/* المنطقة الرئيسية */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
          <button
            onClick={() => setMenu(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm lg:hidden"
            aria-label="فهرس الدرس"
          >
            ☰
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-slate-500">
              {slide.section} ·{" "}
              <span className="text-slate-800">
                <Mixed text={slideTitle(slide)} />
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
            {i + 1} / {total}
          </span>
        </header>

        <main id="l1-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
          <div key={i} className="pop mx-auto max-w-4xl">
            <SlideView s={slide} onExit={onExit} />
          </div>
        </main>

        {/* أزرار التنقل العائمة */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur">
            <button
              onClick={go.prev}
              disabled={i === 0}
              className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
            >
              → السابق
            </button>
            <span className="h-6 w-px bg-slate-200" />
            <button
              onClick={go.next}
              disabled={i === total - 1}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-30"
            >
              التالي ←
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* الفهرس على الشاشات الصغيرة */}
      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <Rail i={i} setI={setI} onExit={onExit} onClose={() => setMenu(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
