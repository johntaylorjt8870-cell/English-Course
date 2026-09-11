import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  NOUNS,
  CAT_INFO,
  ART_INFO,
  PRONOUN_BE,
  VOWELS,
  pickAn,
  CHALLENGE_ITEMS,
  LABEL_ITEMS,
  type Slide,
  type Block,
  type Part,
  type Art,
  type Cat,
  type Exercise,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// النمط C — قطع ملوّنة كبيرة (chips)
// ============================================================

const PART_STYLE: Record<Part["role"], { chip: string; solid: string; text: string; ar: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500", text: "text-sky-700", ar: "الفاعل" },
  be: { chip: "bg-rose-100 border-rose-300 text-rose-900", solid: "bg-rose-500", text: "text-rose-700", ar: "الفعل" },
  art: { chip: "bg-amber-100 border-amber-300 text-amber-900", solid: "bg-amber-500", text: "text-amber-700", ar: "الأداة" },
  noun: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", solid: "bg-emerald-500", text: "text-emerald-700", ar: "الاسم" },
  adj: { chip: "bg-violet-100 border-violet-300 text-violet-900", solid: "bg-violet-500", text: "text-violet-700", ar: "صفة" },
};

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`ltr font-en ${className}`}>{children}</span>;
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[.+?\]\])/g);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        const m = p.match(/^\[\[(.+)\]\]$/);
        if (m) {
          return (
            <span key={i} className="ltr font-en mx-1 rounded-lg bg-slate-900/5 px-1.5 py-0.5 font-bold text-slate-800">
              {m[1]}
            </span>
          );
        }
        // عزل تلقائي لأي مقطع لاتيني خارج الأقواس — على مستوى المقطع لا الكلمة
        return <LatinRuns key={i} text={p} />;
      })}
    </span>
  );
}

function Frame({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
}: {
  mascot: string;
  step?: string;
  badge?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  tip?: string;
}) {
  return (
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.06] bg-white p-6 shadow-[0_14px_44px_-18px_rgba(15,23,42,0.22)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-3xl font-bold leading-snug text-slate-900 md:text-[2.1rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-slate-900 to-slate-700 p-4 text-white">
          <span className="text-2xl">🦉</span>
          <span className="text-base font-semibold md:text-lg">{tip}</span>
        </div>
      )}
    </section>
  );
}

/** مفتاح الألوان الثابت */
function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(Object.keys(PART_STYLE) as Part["role"][]).map((r) => (
        <span key={r} className={`flex items-center gap-1.5 rounded-full border ${PART_STYLE[r].chip} px-2.5 py-1 text-xs font-bold`}>
          <span className={`h-2.5 w-2.5 rounded-full ${PART_STYLE[r].solid}`} />
          {PART_STYLE[r].ar}
        </span>
      ))}
    </div>
  );
}

/** جملة مبنية من قطع ملوّنة */
function PartsSentence({ parts, en, ar, note }: { parts?: Part[]; en: string; ar: string; note?: string }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      {parts ? (
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
          {parts.map((p, i) => (
            <span
              key={i}
              className={`inline-flex flex-col items-center rounded-2xl border-2 px-3.5 py-2 font-en text-xl font-extrabold md:text-2xl ${PART_STYLE[p.role].chip}`}
            >
              {p.text}
              <span className="mt-0.5 text-[10px] font-bold opacity-70">{PART_STYLE[p.role].ar}</span>
            </span>
          ))}
        </div>
      ) : (
        <En className="text-2xl font-bold text-slate-800">{en}</En>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-lg text-slate-500">{ar}</span>
        {note && <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">📌 <Rich text={note} /></span>}
      </div>
    </div>
  );
}

// ============================================================
// الغلاف والأهداف
// ============================================================

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.06] bg-white p-8 text-center md:p-14 shadow-[0_14px_44px_-18px_rgba(15,23,42,0.22)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-amber-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-emerald-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">🔤</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">الدرس الرابع</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">الأسماء وأدوات التعريف</h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500">
          <span dir="ltr">
            <En>Nouns</En> + <En>a / an / the</En>
          </span>
        </p>

        <div className="pop pop-4 mt-10 grid gap-3 sm:grid-cols-3">
          {(["a", "an", "the"] as Art[]).map((a, i) => (
            <div key={a} className={`rounded-3xl border-2 ${ART_INFO[a].border} ${ART_INFO[a].soft} p-5`}>
              <div className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl ${ART_INFO[a].solid} font-en text-3xl font-extrabold text-white shadow anim-bob`} style={{ animationDelay: `${i * 0.3}s` }}>
                {a}
              </div>
              <div className="mt-3 text-sm font-bold text-slate-600">{ART_INFO[a].ar}</div>
            </div>
          ))}
        </div>

        <div className="pop pop-5 mt-8 flex justify-center">
          <PartsSentence
            en="I am a student."
            ar="أنا طالب."
            parts={[
              { text: "I", role: "s" },
              { text: "am", role: "be" },
              { text: "a", role: "art" },
              { text: "student", role: "noun" },
            ]}
          />
        </div>
        <p className="pop pop-6 mt-7 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const goals = [
    "معرفة ما هو الـ [[Noun]].",
    "التمييز بين الاسم المفرد والجمع.",
    "فهم [[a]] و [[an]].",
    "معرفة متى نستخدم [[the]].",
    "تكوين جمل مثل: [[I am a student.]] · [[She is an engineer.]] · [[He has a car.]] · [[The car is red.]]",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="بنهاية الدرس، الطالب لازم يكون قادرًا على:">
      <div className="grid gap-3">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${i + 1} flex items-start gap-4 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-500 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-lg leading-relaxed text-slate-700 md:text-xl" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// أنواع الأسماء — تبويب تفاعلي
// ============================================================

function CatsSlide({ title }: { title: string }) {
  const [cat, setCat] = useState<Cat>("person");
  const list = NOUNS.filter((n) => n.cat === cat);
  return (
    <Frame mascot="🗂️" step="2" title={title} lead="اضغط على كل نوع لعرض أمثلته:">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(CAT_INFO) as Cat[]).map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-3xl border-2 p-4 text-center transition active:scale-95 ${on ? `${CAT_INFO[c].border} ${CAT_INFO[c].soft} shadow-md` : "border-slate-200 bg-white hover:border-slate-300"}`}
            >
              <div className="text-4xl">{CAT_INFO[c].emoji}</div>
              <div className={`mt-1.5 font-bold ${on ? CAT_INFO[c].text : "text-slate-600"}`}>{CAT_INFO[c].ar}</div>
              <div className="mt-0.5 text-xs text-slate-400">{NOUNS.filter((n) => n.cat === c).length} كلمات</div>
            </button>
          );
        })}
      </div>

      <div key={cat} className="pop rounded-3xl border-2 border-slate-100 bg-slate-50/60 p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl">{CAT_INFO[cat].emoji}</span>
          <span className={`font-head text-xl font-bold ${CAT_INFO[cat].text}`}>{CAT_INFO[cat].ar}</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {list.map((n) => (
            <div key={n.en} className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 shadow-sm">
              <En className="text-xl font-bold text-slate-800">{n.en}</En>
              <span className="text-sm font-semibold text-slate-500">{n.ar}</span>
            </div>
          ))}
        </div>
      </div>
      <Note emoji="💡" text="في البداية لا نريد تعقيد الموضوع على الطالب — أربع مجموعات فقط." />
    </Frame>
  );
}

// ============================================================
// مفرد / جمع
// ============================================================

function PluralToggle() {
  const [idx, setIdx] = useState(0);
  const [pl, setPl] = useState(false);
  const n = NOUNS[idx];
  return (
    <div className="rounded-3xl border-2 border-slate-900/[0.06] bg-slate-50 p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {NOUNS.slice(4, 14).map((x) => {
          const on = NOUNS.indexOf(x) === idx;
          return (
            <button
              key={x.en}
              onClick={() => {
                setIdx(NOUNS.indexOf(x));
                setPl(false);
              }}
              className={`rounded-xl border-2 px-3 py-1.5 font-en font-bold transition active:scale-95 ${on ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
            >
              {x.en}
            </button>
          );
        })}
      </div>

      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setPl((v) => !v)}
          className="relative flex h-12 w-64 items-center rounded-full border-2 border-slate-300 bg-white p-1 shadow-sm transition"
        >
          <span className={`absolute top-1 h-8 w-1/2 rounded-full bg-slate-900 transition-all duration-300 ${pl ? "right-1" : "right-[calc(50%-0.25rem)]"}`} />
          <span className={`relative z-10 flex-1 text-center text-xs font-bold transition ${!pl ? "text-white" : "text-slate-500"}`}>Singular · مفرد</span>
          <span className={`relative z-10 flex-1 text-center text-xs font-bold transition ${pl ? "text-white" : "text-slate-500"}`}>Plural · جمع</span>
        </button>
      </div>

      <div key={`${idx}-${pl}`} className="pop grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5 text-center">
          <div className="text-xs font-bold text-emerald-600">Singular = مفرد (واحد فقط)</div>
          <En className="mt-2 block text-3xl font-extrabold text-emerald-800">{pickAn(n.en)} {n.en}</En>
          <div className="text-slate-600">{n.ar} واحد</div>
        </div>
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5 text-center">
          <div className="text-xs font-bold text-sky-600">Plural = جمع (أكثر من واحد)</div>
          <En className="mt-2 block text-3xl font-extrabold text-sky-800">{n.plural}</En>
          <div className="text-slate-600">{n.pluralAr}</div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-500">
        {pl ? "في الجمع لا نستخدم a / an" : "المفرد القابل للعد يحتاج a / an"}
      </div>
    </div>
  );
}

// ============================================================
// كاشف الصوت (a / an)
// ============================================================

function VowelLab() {
  const [word, setWord] = useState("apple");
  const clean = word.trim().toLowerCase();
  const first = clean[0] ?? "";
  const isVowel = VOWELS.includes(first);
  const art = clean ? (isVowel ? "an" : "a") : null;
  const fromList = NOUNS.find((n) => n.en === clean);

  return (
    <div className="rounded-3xl border-2 border-dashed border-sky-300 bg-sky-50/70 p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">🎧</span>
        <span className="font-head text-xl font-bold text-slate-800">كاشف الصوت — اكتب أي كلمة</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {["apple", "egg", "orange", "engineer", "actor", "book", "car", "student", "pen", "teacher"].map((w) => (
          <button
            key={w}
            onClick={() => setWord(w)}
            className={`rounded-xl border-2 px-3 py-1.5 font-en font-bold transition active:scale-95 ${word === w ? "border-transparent bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
          >
            {w}
          </button>
        ))}
      </div>
      <input
        dir="ltr"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="type a word…"
        className="font-en mt-3 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-xl font-bold text-slate-800 outline-none transition focus:border-sky-400"
      />

      {art && (
        <div key={clean} className="pop mt-4">
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white p-4">
            <span className="font-head text-lg font-bold text-slate-500">أول حرف:</span>
            <span className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl font-extrabold text-white ${isVowel ? "bg-sky-500" : "bg-violet-500"}`}>{first}</span>
            <span className={`rounded-full px-3 py-1 text-sm font-bold ${isVowel ? "bg-sky-100 text-sky-700" : "bg-violet-100 text-violet-700"}`}>
              {isVowel ? "صوت علة ⟵ نستخدم an" : "صوت ساكن ⟵ نستخدم a"}
            </span>
          </div>
          <div dir="ltr" className="mt-3 flex items-center justify-center gap-2">
            <span className={`font-en rounded-2xl ${isVowel ? "bg-sky-500" : "bg-violet-500"} px-4 py-2.5 text-3xl font-extrabold text-white shadow tada`}>{art}</span>
            <span className="font-en rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-3xl font-extrabold text-slate-800">{clean}</span>
          </div>
          {fromList && <div className="mt-2 text-center text-lg text-slate-500">{fromList.ar}</div>}
        </div>
      )}
    </div>
  );
}

// ============================================================
// a ثم the — قصة تفاعلية
// ============================================================

function AThenThe({ noun, ar, adj, adjAr }: { noun: string; ar: string; adj: string; adjAr: string }) {
  const [step, setStep] = useState(0);
  const art = pickAn(noun);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/60 p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className={`rounded-2xl border-2 p-4 transition ${step >= 1 ? "border-violet-300 bg-white" : "border-slate-200 bg-white/50"}`}>
          <div className="mb-1 text-xs font-bold text-violet-600">① أول مرة نذكره</div>
          <En className="text-2xl font-extrabold text-slate-800">I see {art} {noun}.</En>
          <div className="text-slate-500">أنا أرى {ar}ًا.</div>
        </div>
        <div className={`rounded-2xl border-2 p-4 transition ${step >= 2 ? "border-amber-300 bg-white" : "border-slate-200 bg-white/50"}`}>
          <div className="mb-1 text-xs font-bold text-amber-600">② أصبح معروفًا</div>
          <En className="text-2xl font-extrabold text-slate-800">
            The {noun} is {adj}.
          </En>
          <div className="text-slate-500">ال{ar} {adjAr}.</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button onClick={() => setStep((s) => Math.min(2, s + 1))} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
          {step === 0 ? "▶ ابدأ القصة" : step === 1 ? "التالي ↓" : "↺ أعد"}
        </button>
        {step === 2 ? (
          <button onClick={() => setStep(0)} className="rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-800">
            ✓ {art} ← ثم ← the
          </button>
        ) : (
          <span className="text-sm text-slate-400">اضغط لمشاهدة كيف ننتقل من a إلى the</span>
        )}
      </div>
      {step === 2 && (
        <div className="tada mt-3 rounded-2xl bg-amber-50 p-3 text-center text-sm font-bold text-amber-800">
          أول ذكر ← {art} {noun} · ثم عند الحديث عنه مرة أخرى ← the {noun}
        </div>
      )}
    </div>
  );
}

// ============================================================
// آلة الأدوات
// ============================================================

type MMode = "aff" | "neg" | "q";

/** صيغة النصب للجمع بعد «ليسوا»: معلمون ← معلمين · بنات ← بناتٍ · طلاب ← طلابًا */
function accPl(pluralAr: string): string {
  if (pluralAr.endsWith("ون")) return pluralAr.slice(0, -2) + "ين";
  if (pluralAr.endsWith("ات")) return pluralAr + "ٍ";
  return pluralAr + "ًا";
}

function Machine() {
  const [si, setSi] = useState(0);
  const [ni, setNi] = useState(1); // student → "I am a student."
  const [mode, setMode] = useState<MMode>("aff");

  const s = PRONOUN_BE[si];
  const n = NOUNS[ni];
  // مع الفاعل الجمع (We / They) نستخدم الاسم الجمع بدون a / an — مثل تمرين البناء
  const plural = s.plural;
  const art = pickAn(n.en);
  const nounEn = plural ? n.plural : n.en;
  const nounAr = plural ? n.pluralAr : n.ar;

  const pieces: Part[] =
    mode === "q"
      ? [
          { text: cap(s.be), role: "be" },
          { text: s.en === "I" ? "I" : s.en.toLowerCase(), role: "s" },
          ...(plural ? [] : [{ text: art, role: "art" } as Part]),
          { text: nounEn, role: "noun" },
        ]
      : [
          { text: s.en, role: "s" },
          { text: s.be, role: "be" },
          ...(mode === "neg" ? [{ text: "not", role: "be" } as Part] : []),
          ...(plural ? [] : [{ text: art, role: "art" } as Part]),
          { text: nounEn, role: "noun" },
        ];

  const ending = mode === "q" ? "?" : ".";
  const arBase = `${s.ar} ${nounAr}`;
  const arText =
    mode === "neg"
      ? plural
        ? `${s.ar} ليسوا ${accPl(nounAr)}.`
        : `${s.ar} ليس ${nounAr}ًا.`
      : mode === "q"
        ? `هل ${s.ar} ${nounAr}؟`
        : `${arBase}.`;

  return (
    <div className="rounded-3xl border-2 border-slate-900/[0.06] bg-slate-50 p-5">
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-sky-700">① الفاعل</div>
          <div className="flex flex-wrap gap-1.5">
            {PRONOUN_BE.map((x, i) => (
              <button key={x.en} onClick={() => setSi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en text-lg font-bold transition active:scale-95 ${i === si ? "border-transparent bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 lg:col-span-2">
          <div className="mb-2 text-sm font-bold text-emerald-700">② الاسم (Noun)</div>
          <div className="flex flex-wrap gap-1.5">
            {NOUNS.map((x, i) => (
              <button key={x.en} onClick={() => setNi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en text-base font-bold transition active:scale-95 ${i === ni ? "border-transparent bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-slate-500">③ الشكل:</span>
        {([
          ["aff", "✅ إثبات"],
          ["neg", "🚫 نفي"],
          ["q", "❓ سؤال"],
        ] as [MMode, string][]).map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-xl border-2 px-3.5 py-1.5 text-sm font-bold transition active:scale-95 ${mode === m ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => {
            setSi(Math.floor(Math.random() * PRONOUN_BE.length));
            setNi(Math.floor(Math.random() * NOUNS.length));
            setMode("aff");
          }}
          className="mr-auto rounded-xl bg-amber-500 px-3.5 py-1.5 text-sm font-bold text-white transition hover:bg-amber-600"
        >
          🎲 عشوائي
        </button>
      </div>

      <div key={`${si}-${ni}-${mode}`} className="pop mt-4 rounded-3xl border-2 border-slate-200 bg-white p-5">
        <div dir="ltr" className="flex flex-wrap items-end justify-center gap-2">
          {pieces.map((p, i) => (
            <span key={i} className={`inline-flex flex-col items-center rounded-2xl border-2 px-4 py-2.5 font-en text-2xl font-extrabold md:text-3xl ${PART_STYLE[p.role].chip}`}>
              {p.text}
              <span className="mt-0.5 text-[10px] font-bold opacity-70">{PART_STYLE[p.role].ar}</span>
            </span>
          ))}
          <span className="font-en pb-2 text-3xl font-bold text-slate-300">{ending}</span>
        </div>
        <div className="mt-3 text-center text-xl font-bold text-slate-700">{arText}</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
            {plural ? (
              <>{n.plural} ← جمع {n.en} — بدون a / an</>
            ) : (
              <>{n.en} تبدأ بصوت {n.vowel ? "علة" : "ساكن"} ← {art}</>
            )}
          </span>
          {mode === "q" && <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">قلبنا الترتيب كما في الدرس 3</span>}
          {mode === "neg" && <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">أضفنا not بعد {s.be}</span>}
        </div>
      </div>
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ============================================================
// عناصر عرض بسيطة
// ============================================================

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
      <span className="text-2xl">{emoji}</span>
      <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
    </div>
  );
}

function Term({ en, ar, desc }: { en: string; ar: string; desc?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
      <En className="text-4xl font-extrabold text-emerald-700">{en}</En>
      <span className="text-3xl font-bold text-slate-300">=</span>
      <span className="font-head text-3xl font-bold text-slate-800">{ar}</span>
      {desc && <span className="basis-full text-lg text-slate-600">{desc}</span>}
    </div>
  );
}

function ArtBlock({ a, examples }: { a: Art; examples?: string[] }) {
  const info = ART_INFO[a];
  return (
    <div className={`rounded-3xl border-2 ${info.border} ${info.soft} p-5`}>
      <div className="flex flex-wrap items-center gap-4">
        <span className={`grid h-20 w-20 place-items-center rounded-3xl ${info.solid} font-en text-4xl font-extrabold text-white shadow anim-bob`}>{a}</span>
        <div>
          <div className="font-head text-xl font-bold text-slate-800">{info.ar}</div>
          <div className="text-sm font-semibold text-slate-500">{info.emoji} {info.desc}</div>
        </div>
      </div>
      {examples && (
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {examples.map((e) => (
            <div key={e} dir="ltr" className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
              <En className={`text-lg font-extrabold ${info.text}`}>{a}</En>
              <En className="text-lg font-bold text-slate-800">{e}</En>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WordList({ words, note }: { words: { en: string; ar: string }[]; note?: string }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/60 p-5">
      {note && <div className="mb-3 text-sm font-bold text-slate-500">{note}</div>}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {words.map((w) => (
          <div key={w.en} className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 shadow-sm">
            <En className="text-lg font-bold text-slate-800">{w.en}</En>
            <span className="text-sm font-semibold text-slate-500">{w.ar}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Compare({ pairs }: { pairs: { right: string; wrong: string }[] }) {
  return (
    <div className="grid gap-2">
      {pairs.map((p, i) => (
        <div key={i} className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-white">✓</span>
            <En className="text-lg font-extrabold text-emerald-800">{p.right}</En>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border-2 border-rose-200 bg-rose-50 px-3 py-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-500 text-xs font-bold text-white">✕</span>
            <En className="text-lg font-bold text-rose-700 line-through decoration-rose-300">{p.wrong}</En>
          </div>
        </div>
      ))}
    </div>
  );
}

function Verdict({ ok, en, ar, why }: { ok: boolean; en: string; ar?: string; why?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-3xl border-2 p-4 ${ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-bold text-white ${ok ? "bg-emerald-500" : "bg-rose-500"}`}>{ok ? "✓" : "✕"}</span>
      <En className={`text-xl font-bold ${ok ? "text-emerald-900" : "text-rose-800 line-through decoration-rose-300"}`}>{en}</En>
      {ar && <span className="text-base text-slate-500">{ar}</span>}
      {why && <span className={`rounded-full px-3 py-1 text-xs font-bold ${ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{why}</span>}
    </div>
  );
}

function Pieces() {
  const all = [
    { en: "Subject", ar: "الفاعل", c: "bg-sky-500" },
    { en: "Verb", ar: "الفعل", c: "bg-rose-500" },
    { en: "Object", ar: "المفعول به", c: "bg-orange-500" },
    { en: "Noun", ar: "الاسم", c: "bg-emerald-500" },
    { en: "Pronoun", ar: "الضمير", c: "bg-teal-500" },
    { en: "Verb to be", ar: "am / is / are", c: "bg-pink-500" },
    { en: "Article", ar: "a / an / the", c: "bg-amber-500" },
  ];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-900 p-5 text-white">
      <div className="mb-3 font-head text-lg font-bold">🧠 ماذا تعلمنا حتى الآن؟</div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((p) => (
          <div key={p.en} className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2">
            <span className={`h-3 w-3 rounded-full ${p.c}`} />
            <En className="font-bold">{p.en}</En>
            <span className="mr-auto text-sm text-slate-300">{p.ar}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm text-slate-300">وهذه القطع ستبدأ بالتركيب مع بعضها في الدروس القادمة.</div>
    </div>
  );
}

function Steps({ rows }: { rows: { s: string; be: string; nounEn: string; nounAr: string }[] }) {
  return (
    <div className="grid gap-2">
      {rows.map((r, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2 rounded-3xl border-2 border-slate-100 bg-white p-3.5">
          <span dir="ltr" style={{ direction: "ltr" }} className="ltr-row inline-flex flex-wrap items-center gap-2">
            <En className="rounded-xl bg-sky-100 px-3 py-1.5 text-xl font-extrabold text-sky-900">{r.s}</En>
            <En className="rounded-xl bg-rose-100 px-3 py-1.5 text-xl font-extrabold text-rose-900">{r.be}</En>
            <En className="rounded-xl bg-amber-100 px-3 py-1.5 text-xl font-extrabold text-amber-900">{r.nounEn.split(" ")[0]}</En>
            <En className="rounded-xl bg-emerald-100 px-3 py-1.5 text-xl font-extrabold text-emerald-900">{r.nounEn.split(" ")[1]}</En>
          </span>
          <span className="text-slate-400">=</span>
          <span className="text-slate-600">{r.nounAr}</span>
        </div>
      ))}
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "text":
      return <Rich text={b.text} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />;
    case "term":
      return <Term {...b} />;
    case "art":
      return <ArtBlock a={b.a} examples={b.examples} />;
    case "artsRow":
      return <div className="grid gap-3 sm:grid-cols-3">{b.arts.map((a) => <ArtBlock key={a} a={a} />)}</div>;
    case "wordList":
      return <WordList words={b.words} note={b.note} />;
    case "nounChips":
      return null;
    case "pluralToggle":
      return <PluralToggle />;
    case "compare":
      return <Compare pairs={b.pairs} />;
    case "verdict":
      return <Verdict {...b} />;
    case "sentence":
      return <PartsSentence parts={b.parts} en={b.en} ar={b.ar} note={b.note} />;
    case "note":
      return <Note emoji={b.emoji} text={b.text} />;
    case "aThenThe":
      return <AThenThe {...b} />;
    case "vowelLab":
      return <VowelLab />;
    case "machine":
      return <Machine />;
    case "pieces":
      return <Pieces />;
    case "steps":
      return <Steps rows={b.rows} />;
  }
}

// ============================================================
// الجدول والملخص
// ============================================================

function TableSlide({ title }: { title: string }) {
  return (
    <Frame mascot="📋" step="📋" title={title} tip="احفظ هذا الجدول — يلخّص الدرس كله.">
      <div className="grid gap-3">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <En className="text-2xl font-extrabold text-emerald-700">Noun</En>
            <span className="text-lg text-slate-600">= اسم شخص أو مكان أو شيء أو حيوان</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-5">
            <div className="text-xs font-bold text-slate-400">Singular = مفرد</div>
            <div className="mt-2 space-y-1">
              {["book", "student", "car"].map((w) => (
                <En key={w} className="block text-lg font-bold text-slate-700">{w}</En>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-5">
            <div className="text-xs font-bold text-slate-400">Plural = جمع</div>
            <div className="mt-2 space-y-1">
              {["books", "students", "cars"].map((w) => (
                <En key={w} className="block text-lg font-bold text-slate-700">{w}</En>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {(["a", "an", "the"] as Art[]).map((a) => (
            <div key={a} className={`rounded-3xl border-2 ${ART_INFO[a].border} ${ART_INFO[a].soft} p-4`}>
              <div className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${ART_INFO[a].solid} font-en text-2xl font-extrabold text-white`}>{a}</div>
              <div className="mt-2 text-center text-sm font-bold text-slate-600">{ART_INFO[a].ar}</div>
              <div className="mt-2 space-y-1 text-center">
                {(a === "a" ? ["a book", "a student"] : a === "an" ? ["an apple", "an engineer"] : ["a dog → the dog", "a car → the car"]).map((e) => (
                  <En key={e} className={`block text-sm font-bold ${ART_INFO[a].text}`}>{e}</En>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function SummarySlide({ title }: { title: string }) {
  return (
    <Frame mascot="🧠" step="🧠" title={title} lead="كل ما أخذناه اليوم في لمحة واحدة.">
      <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/60 p-5">
        <Legend />
      </div>
      <PartsSentence
        en="I am a student."
        ar="أنا طالب."
        parts={[
          { text: "I", role: "s" },
          { text: "am", role: "be" },
          { text: "a", role: "art" },
          { text: "student", role: "noun" },
        ]}
      />
      <PartsSentence
        en="She is an engineer."
        ar="هي مهندسة."
        parts={[
          { text: "She", role: "s" },
          { text: "is", role: "be" },
          { text: "an", role: "art" },
          { text: "engineer", role: "noun" },
        ]}
      />
      <PartsSentence
        en="He is a teacher."
        ar="هو معلّم."
        parts={[
          { text: "He", role: "s" },
          { text: "is", role: "be" },
          { text: "a", role: "art" },
          { text: "teacher", role: "noun" },
        ]}
      />
      <Note emoji="⭐" text="بعد [[I am / He is / She is / It is]] إذا جاء اسم مفرد فتذكّر: [[a / an + Noun]]" />
    </Frame>
  );
}

// ============================================================
// التمارين
// ============================================================

function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{n}</span>;
}

function NounSort({ ex }: { ex: Extract<Exercise, { type: "nounSort" }> }) {
  const [pick, setPick] = useState<Record<number, boolean>>({});
  const [check, setCheck] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const shown = check[i];
        const right = c === it.isNoun;
        return (
          <div key={it.en} className={`rounded-3xl border-2 p-3.5 transition ${shown ? (right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-2xl font-extrabold text-slate-800">{it.en}</En>
              <div className="mr-auto flex gap-1.5">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => {
                      setPick((p) => ({ ...p, [i]: v }));
                      setCheck((c2) => ({ ...c2, [i]: true }));
                    }}
                    className={`rounded-xl border-2 px-3.5 py-1.5 text-sm font-bold transition active:scale-95 ${
                      c === v ? (v ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {v ? "Noun" : "Not Noun"}
                  </button>
                ))}
              </div>
            </div>
            {shown && (
              <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>
                {right ? "✓ صحيح — " : "✕ الصحيح: "}
                {it.isNoun ? "Noun" : `Not Noun (${it.kindAr})`} · {it.ar}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AAnEx({ ex }: { ex: Extract<Exercise, { type: "aAn" }> }) {
  const [pick, setPick] = useState<Record<number, string>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === (it.vowel ? "an" : "a");
        return (
          <div key={it.word} className={`rounded-3xl border-2 p-3.5 text-center transition ${c ? (right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center justify-center gap-2">
              <Nub n={i + 1} />
              <span dir="ltr" className="flex items-center gap-2">
              <span
                className={`inline-grid h-11 min-w-14 place-items-center rounded-xl border-2 border-dashed px-3 font-en text-xl font-extrabold ${
                  c ? (right ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"
                }`}
              >
                {c ?? "___"}
              </span>
              <En className="text-xl font-bold text-slate-800">{it.word}</En>
              </span>
            </div>
            <div className="mt-1.5 text-xs text-slate-400">{it.ar}</div>
            <div className="mt-2 flex justify-center gap-1.5">
              {["a", "an"].map((a) => (
                <button
                  key={a}
                  onClick={() => setPick((p) => ({ ...p, [i]: a }))}
                  className={`rounded-lg border-2 px-4 py-1 font-en text-lg font-extrabold transition active:scale-95 ${
                    c === a ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            {c && !right && <div className="mt-1.5 text-xs font-bold text-rose-600">✕ يبدأ بصوت {it.vowel ? "علة" : "ساكن"}</div>}
          </div>
        );
      })}
    </div>
  );
}

function FixEx({ ex }: { ex: Extract<Exercise, { type: "fix" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{i + 1}</span>
          <En className="text-xl font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
          {show[i] ? (
            <div className="tada flex flex-wrap items-center gap-2">
              <En className="text-xl font-extrabold text-emerald-700">→ {it.correct}</En>
              {it.why && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{it.why}</span>}
            </div>
          ) : (
            <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-emerald-700">
              الحل 💡
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function BestEx({ ex }: { ex: Extract<Exercise, { type: "best" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => {
        const c = pick[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (c === it.answer ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="mb-2.5 flex items-center gap-2">
              <Nub n={i + 1} />
              <span className="font-bold text-slate-600">اختر الجملة الصحيحة:</span>
            </div>
            <div className="grid gap-2 pr-11">
              {it.opts.map((o, oi) => {
                const isA = oi === it.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-slate-400";
                if (c !== undefined) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (c === oi) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                }
                return (
                  <button key={oi} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-2.5 text-right transition active:scale-[0.98] ${cls}`}>
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/25 font-en text-sm font-bold">{String.fromCharCode(65 + oi)}</span>
                    <En className="text-lg font-bold">{o}</En>
                    {c !== undefined && isA && <span className="mr-auto text-sm font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ATheEx({ ex }: { ex: Extract<Exercise, { type: "aThe" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-start gap-3">
              <Nub n={i + 1} />
              <div>
                <En className="text-xl font-bold leading-relaxed text-slate-800">{it.story}</En>
                <div className="text-sm text-slate-500">{it.ar}</div>
              </div>
            </div>
            <div className="mt-3 grid gap-2 pr-11 sm:grid-cols-3">
              {it.opts.map((pair, oi) => {
                const isA = oi === it.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-slate-400";
                if (c !== undefined) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (c === oi) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                }
                return (
                  <button key={oi} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-2xl border-2 px-4 py-2 font-en text-lg font-bold transition active:scale-95 ${cls}`}>
                    {pair[0]} / {pair[1]}
                  </button>
                );
              })}
            </div>
            {c !== undefined && right && <div className="tada mt-2 pr-11 text-sm font-bold text-emerald-700">✓ أحسنت! أول ذكر ← a · ثم ← the</div>}
          </div>
        );
      })}
    </div>
  );
}

function BuildEx({ ex }: { ex: Extract<Exercise, { type: "build" }> }) {
  const [pick, setPick] = useState<Record<number, string>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const need: string | null = it.noun === it.noun + "s" ? null : it.s === "They" ? null : pickAn(it.noun);
        const right = c === need;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2.5">
              <Nub n={i + 1} />
              <div dir="ltr" className="flex flex-wrap items-center gap-2">
                <En className="rounded-xl bg-sky-100 px-3 py-1.5 text-xl font-extrabold text-sky-900">{it.s}</En>
                <En className="rounded-xl bg-rose-100 px-3 py-1.5 text-xl font-extrabold text-rose-900">{it.be}</En>
                <span
                  className={`inline-grid h-10 min-w-16 place-items-center rounded-xl border-2 border-dashed px-3 font-en text-xl font-extrabold ${
                    c ? (right ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"
                  }`}
                >
                  {c ?? "___"}
                </span>
                <En className="rounded-xl bg-emerald-100 px-3 py-1.5 text-xl font-extrabold text-emerald-900">{it.noun}</En>
              </div>
              <div className="mr-auto flex gap-1.5">
                {["a", "an", "—"].map((o) => (
                  <button
                    key={o}
                    onClick={() => setPick((p) => ({ ...p, [i]: o }))}
                    className={`rounded-lg border-2 px-3.5 py-1 font-en text-lg font-bold transition active:scale-95 ${
                      c === o ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-1.5 pr-11 text-xs text-slate-400">
              {it.sAr} · {it.nounAr}
            </div>
            {right && (
              <div className="tada mt-2 pr-11">
                <En className="text-xl font-extrabold text-emerald-700">
                  {it.s} {it.be} {need ? `${need} ${it.noun}` : it.noun}.
                </En>
              </div>
            )}
            {c && !right && (
              <div className="mt-2 pr-11 text-sm font-bold text-rose-600">
                ✕ الصحيح: {it.s} {it.be} {need ? `${need} ${it.noun}` : it.noun}.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// التحدي النهائي
// ============================================================

function Challenge() {
  const [arts, setArts] = useState<Record<number, string>>({});
  const [labels, setLabels] = useState<Record<number, string>>({});

  const artOk = (i: number, v: string) => {
    const need = CHALLENGE_ITEMS[i].art;
    if (need === null) return v === "—";
    return v === need;
  };

  return (
    <Frame mascot="🔥" badge="IQ200" title="التحدي النهائي · IQ200" lead="أكمل الجمل بالأداة الصحيحة، ثم حدّد أجزاء الجملة الأخيرة.">
      <div className="grid gap-2.5">
        {CHALLENGE_ITEMS.map((it, i) => {
          const c = arts[i];
          const right = c !== undefined && artOk(i, c);
          return (
            <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
              <div className="flex flex-wrap items-center gap-2">
                <Nub n={i + 1} />
                <En className="text-xl font-bold text-slate-800">
                  {it.s} {it.be} {c ? (
                    <span className={`font-extrabold ${right ? "text-emerald-700" : "text-rose-600"}`}>{c === "—" ? "" : c}</span>
                  ) : (
                    <span className="text-slate-300">___</span>
                  )} {it.noun}.
                </En>
                <span className="text-xs text-slate-400">{it.nounAr}</span>
                <div className="mr-auto flex gap-1.5">
                  {["a", "an", "the", "—"].map((o) => (
                    <button
                      key={o}
                      onClick={() => setArts((p) => ({ ...p, [i]: o }))}
                      className={`rounded-lg border-2 px-3 py-1 font-en text-base font-bold transition active:scale-95 ${
                        c === o ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              {c !== undefined && (
                <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>
                  {right ? "✓" : `✕ الصحيح: ${it.art ?? "بدون أداة (جمع)"}`} · {it.nounAr}
                  {it.art === "an" && " (تبدأ بصوت علة)"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5">
        <div className="mb-2 font-head text-xl font-bold text-slate-800">حدّد أجزاء الجملة:</div>
        <PartsSentence
          en="She is not an engineer."
          ar="هي ليست مهندسة."
          parts={[
            { text: "She", role: "s" },
            { text: "is", role: "be" },
            { text: "not", role: "be" },
            { text: "an", role: "art" },
            { text: "engineer", role: "noun" },
          ]}
        />
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {LABEL_ITEMS.map((p, i) => (
            <div key={p.text} className="rounded-2xl bg-white p-3 text-center shadow-sm">
              <En className="text-lg font-extrabold text-slate-800">{p.text}</En>
              <select
                value={labels[i] ?? ""}
                onChange={(e) => setLabels((l) => ({ ...l, [i]: e.target.value }))}
                className="mt-2 w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-2 py-1 text-sm font-bold text-slate-700 outline-none focus:border-indigo-400"
              >
                <option value="">اختر…</option>
                <option value="s">Subject · الفاعل</option>
                <option value="be">Verb to be</option>
                <option value="art">Article · الأداة</option>
                <option value="noun">Noun · الاسم</option>
              </select>
              {labels[i] && (
                <div className={`mt-1.5 text-xs font-bold ${labels[i] === p.role ? "text-emerald-600" : "text-rose-600"}`}>
                  {labels[i] === p.role ? "✓ صحيح" : "✕ حاول مرة أخرى"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-14">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">🏆</div>
        <div className="pop pop-1 mt-3 text-sm font-bold text-slate-400">⭐ قاعدة اليوم</div>
        <h2 className="pop pop-2 font-head mt-2 text-3xl font-bold md:text-4xl">عندما يأتي اسم مفرد بعد Verb to be</h2>
        <p className="pop pop-3 mt-3 text-lg text-slate-300">تذكّر دائمًا: a / an + Noun</p>
        <div className="pop pop-4 mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { be: "I am", art: "a", noun: "student" },
            { be: "She is", art: "an", noun: "engineer" },
            { be: "He is", art: "a", noun: "teacher" },
          ].map((s) => (
            <div key={s.noun} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div dir="ltr" className="flex flex-wrap items-center justify-center gap-1.5">
                <En className="text-lg font-bold text-sky-300">{s.be}</En>
                <En className={`rounded-lg px-2 py-0.5 text-lg font-extrabold ${s.art === "a" ? "bg-violet-500" : "bg-sky-500"}`}>{s.art}</En>
                <En className="text-lg font-bold text-emerald-300">{s.noun}</En>
              </div>
            </div>
          ))}
        </div>
        <div className="pop pop-5 mt-9 flex flex-wrap justify-center gap-3">
          <button onClick={onExit} className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">
            جميع الدروس
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// موجّه العرض
// ============================================================

function SlideView({ s, onExit }: { s: Slide; onExit: () => void }) {
  switch (s.kind) {
    case "cover":
      return <Cover />;
    case "objectives":
      return <Objectives />;
    case "cats":
      return <CatsSlide title={s.title} />;
    case "lesson":
      return (
        <Frame mascot={s.mascot} step={s.step} title={s.title} lead={s.lead} tip={s.tip}>
          {s.blocks.map((b, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
              <BlockView b={b} />
            </div>
          ))}
        </Frame>
      );
    case "table":
      return <TableSlide title={s.title} />;
    case "summary":
      return <SummarySlide title={s.title} />;
    case "challenge":
      return <Challenge />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت أنك أتقنت a و an و the.">
          <FinalQuiz lesson={4} accent="bg-amber-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
    case "ex": {
      const ex = s.ex;
      return (
        <Frame mascot={s.mascot} badge={s.badge} title={s.title} lead={s.subtitle}>
          {ex.type === "nounSort" && <NounSort ex={ex} />}
          {ex.type === "aAn" && <AAnEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "best" && <BestEx ex={ex} />}
          {ex.type === "aThe" && <ATheEx ex={ex} />}
          {ex.type === "build" && <BuildEx ex={ex} />}
        </Frame>
      );
    }
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
// الشريط الجانبي
// ============================================================

const SECTION_C: Record<string, string> = {
  البداية: "text-slate-400",
  الاسم: "text-emerald-600",
  الأدوات: "text-violet-600",
  "أداة التعريف": "text-amber-600",
  الربط: "text-rose-600",
  الورشة: "text-sky-600",
  التمارين: "text-indigo-600",
  الخاتمة: "text-slate-600",
};

function Rail({ i, setI, onExit, onClose }: { i: number; setI: (n: number) => void; onExit: () => void; onClose?: () => void }) {
  const groups = useMemo(() => {
    const g: { sec: string; idxs: number[] }[] = [];
    SLIDES.forEach((s, idx) => {
      const last = g[g.length - 1];
      if (last && last.sec === s.section) last.idxs.push(idx);
      else g.push({ sec: s.section, idxs: [idx] });
    });
    return g;
  }, []);

  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 4 · الأسماء والأدوات</div>
        <En className="text-xs font-semibold text-slate-400">Nouns + a / an / the</En>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((g) => (
          <div key={g.sec} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_C[g.sec] || "text-slate-400"}`}>{g.sec}</div>
            {g.idxs.map((idx) => {
              const on = idx === i;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setI(idx);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${on ? "bg-white/20" : "bg-slate-100"}`}>{idx + 1}</span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[idx])}</span>
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
// الدرس 4 — النمط C
// ============================================================

export default function Lesson4({ onExit }: { onExit: () => void }) {
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
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "SELECT")) return;
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

  useEffect(() => {
    document.getElementById("l4-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#fbf7f0] text-slate-800">
      <Signature />

      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />

        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          <Rail i={i} setI={setI} onExit={onExit} />
        </div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                {slide.section} · <span className="text-slate-800">{slideTitle(slide)}</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full rounded-full bg-gradient-to-l from-emerald-500 via-amber-400 to-violet-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {i + 1} / {total}
            </span>
          </header>

          <main id="l4-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={i} className="pop mx-auto max-w-4xl">
              <SlideView s={slide} onExit={onExit} />
            </div>
          </main>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.06] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={go.prev} disabled={i === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">
                → السابق
              </button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-30">
                التالي ←
              </button>
            </div>
          </div>
        </div>
      </div>

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
