import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  PRONOUNS,
  type Slide,
  type ContentBlock,
  type Exercise,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// لوحة ألوان مرحة تتناوب بين الشرائح
const THEMES = [
  { ring: "from-rose-400 to-pink-500", soft: "bg-rose-50", bd: "border-rose-200", txt: "text-rose-600", chip: "bg-rose-100 text-rose-700" },
  { ring: "from-amber-400 to-orange-500", soft: "bg-amber-50", bd: "border-amber-200", txt: "text-amber-600", chip: "bg-amber-100 text-amber-700" },
  { ring: "from-emerald-400 to-teal-500", soft: "bg-emerald-50", bd: "border-emerald-200", txt: "text-emerald-600", chip: "bg-emerald-100 text-emerald-700" },
  { ring: "from-sky-400 to-indigo-500", soft: "bg-sky-50", bd: "border-sky-200", txt: "text-sky-600", chip: "bg-sky-100 text-sky-700" },
  { ring: "from-violet-400 to-purple-500", soft: "bg-violet-50", bd: "border-violet-200", txt: "text-violet-600", chip: "bg-violet-100 text-violet-700" },
];

function theme(i: number) {
  return THEMES[i % THEMES.length];
}

// ============================================================
// عناصر مساعدة
// ============================================================

function En({ children }: { children: React.ReactNode }) {
  return <span className="ltr font-en inline-block">{children}</span>;
}

/** يعزل المقاطع الإنجليزية داخل النص العربي تلقائيًا — يمنع انعكاس الترتيب نهائيًا */
function Mixed({ text }: { text: string }) {
  return <LatinRuns text={text} />;
}

// لصاقات مرحة تطفو في خلفية الشريحة
function Stickers({ seed }: { seed: number }) {
  const packs = [
    ["⭐", "✨", "📚"],
    ["🌟", "🎈", "✏️"],
    ["💡", "🎨", "🧠"],
    ["🚀", "🌈", "🎉"],
    ["🍭", "🐣", "🔥"],
  ];
  const p = packs[seed % packs.length];
  return (
    <>
      <div className="pointer-events-none absolute -top-3 left-6 text-4xl anim-bob select-none opacity-90" style={{ ["--r" as string]: "-12deg" }}>
        {p[0]}
      </div>
      <div className="pointer-events-none absolute top-24 -left-2 text-3xl anim-float select-none opacity-80">{p[1]}</div>
      <div className="pointer-events-none absolute bottom-6 left-10 text-4xl anim-wiggle select-none opacity-80">{p[2]}</div>
    </>
  );
}

// شارة العنوان مع الإيموجي
function Badge({ emoji, badge, t }: { emoji: string; badge: string; t: ReturnType<typeof theme> }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${t.ring} text-3xl shadow-lg anim-bob`}>
        {emoji}
      </div>
      <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${t.chip}`}>{badge}</span>
    </div>
  );
}

// ============================================================
// عرض بلوكات المحتوى
// ============================================================

function Block({ b, t }: { b: ContentBlock; t: ReturnType<typeof theme> }) {
  switch (b.type) {
    case "para":
      return (
        <p className="text-xl leading-relaxed text-slate-700">
          <Mixed text={b.text} />
        </p>
      );
    case "example":
      return (
        <div className={`rounded-2xl border-2 ${t.bd} ${t.soft} p-4 shadow-sm`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl">💬</span>
            <span className="ltr font-en text-2xl font-semibold text-slate-800">{b.ex.en}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 pr-1 text-lg text-slate-600">
            <span className="opacity-60">↩</span>
            <span>{b.ex.ar}</span>
          </div>
          {b.ex.note && (
            <div className={`mt-2 inline-flex items-center gap-1 rounded-full ${t.chip} px-3 py-1 text-sm font-semibold`}>
              <span>📌</span>
              <En>{b.ex.note}</En>
            </div>
          )}
        </div>
      );
    case "right":
      return (
        <div className="flex items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-lg text-white">✓</span>
          <span className="ltr font-en text-xl font-semibold text-emerald-800">{b.text}</span>
        </div>
      );
    case "wrong":
      return (
        <div className="flex items-center gap-3 rounded-2xl border-2 border-rose-200 bg-rose-50 p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-500 text-lg text-white">✕</span>
          <span className="ltr font-en text-xl font-semibold text-rose-800">{b.text}</span>
        </div>
      );
    case "rule":
      return <p className="text-xl font-bold text-slate-800">{b.text}</p>;
    case "callout":
      return (
        <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/70 p-4">
          <span className="text-3xl anim-wiggle">{b.emoji}</span>
          <span className="font-fun text-xl font-semibold text-slate-800">
            {/* اسمح للنص أن يعرض أجزاء إنجليزية بشكل صحيح */}
            {b.text}
          </span>
        </div>
      );
    case "map":
      return (
        <div className="flex flex-wrap gap-3">
          {b.pairs.map((p, i) => (
            <div key={i} className="flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="ltr font-en font-bold text-slate-800">{p.from}</span>
              <span className={`text-lg ${t.txt}`}>←</span>
              <span className="font-semibold text-slate-600">
                <Mixed text={p.to} />
              </span>
            </div>
          ))}
        </div>
      );
  }
}

// ============================================================
// شرائح خاصة
// ============================================================

function Cover() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Stickers seed={3} />
      <div className="pop mb-4 text-6xl anim-bob">📘</div>
      <div className="pop pop-1 rounded-full bg-indigo-100 px-5 py-2 text-lg font-bold text-indigo-700">الدرس الثاني</div>
      <h1 className="pop pop-2 font-fun mt-4 text-5xl font-extrabold leading-tight text-slate-800 md:text-6xl">
        الضمائر و <span className="ltr font-en text-indigo-600">Verb to be</span>
      </h1>
      <p className="pop pop-3 mt-3 text-2xl text-slate-500">
        <span dir="ltr">
          <En>Pronouns</En> + <En>am / is / are</En>
        </span>
      </p>
      <div className="pop pop-4 mt-8 flex flex-wrap justify-center gap-3">
        {PRONOUNS.map((p) => (
          <span key={p.en} className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-xl shadow-sm">
            <span className="ltr font-en font-bold text-slate-700">{p.en}</span>
          </span>
        ))}
      </div>
      <p className="pop pop-5 mt-8 text-lg text-slate-400">استخدم الأسهم ← → للتنقل بين الشرائح أثناء الشرح</p>
    </div>
  );
}

function Objectives() {
  const goals = [
    "معرفة الضمائر الشخصية الأساسية.",
    "معرفة الفرق بين: I / You / He / She / It / We / They",
    "فهم معنى Verb to be.",
    "معرفة متى نستخدم: am / is / are",
    "تكوين جمل صحيحة باستخدامها.",
  ];
  return (
    <div className="relative">
      <Stickers seed={0} />
      <Badge emoji="🎯" badge="أهداف الدرس" t={theme(2)} />
      <h2 className="font-fun mt-5 text-3xl font-extrabold text-slate-800">في نهاية الدرس سيكون الطالب قادرًا على:</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${i + 1} flex items-start gap-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-4`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-lg font-bold text-white">
              {i + 1}
            </span>
            <span className="text-xl leading-relaxed text-slate-700">{g}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentSlide({ s, idx }: { s: Extract<Slide, { kind: "content" }>; idx: number }) {
  const t = theme(idx);
  return (
    <div className="relative">
      <Stickers seed={idx} />
      <Badge emoji={s.emoji} badge={s.badge} t={t} />
      <h2 className="font-fun mt-5 text-4xl font-extrabold text-slate-800">{s.title}</h2>
      {s.intro && <p className="mt-2 text-xl text-slate-500">{s.intro}</p>}
      <div className="mt-6 space-y-4">
        {s.blocks.map((b, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
            <Block b={b} t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PronounGrid({ idx }: { idx: number }) {
  const t = theme(idx);
  return (
    <div className="relative">
      <Stickers seed={idx} />
      <Badge emoji="🎴" badge="القائمة" t={t} />
      <h2 className="font-fun mt-5 text-4xl font-extrabold text-slate-800">الضمائر الأساسية السبعة</h2>
      <p className="mt-2 text-xl text-slate-500">كل بطاقة تحمل الضمير ومعناه والـ Verb to be الخاص به</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRONOUNS.map((p, i) => {
          const ct = theme(i);
          return (
            <div
              key={p.en}
              className={`pop pop-${Math.min(i + 1, 6)} group relative overflow-hidden rounded-3xl border-2 ${ct.bd} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <span className="ltr font-en text-4xl font-extrabold text-slate-800">{p.en}</span>
                <span className="text-4xl transition group-hover:scale-125">{p.emoji}</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-600">{p.ar}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-slate-400">{p.hint}</span>
                <span className={`ltr font-en rounded-full px-3 py-1 text-sm font-bold ${ct.chip}`}>{p.be}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VerbTable({ idx }: { idx: number }) {
  const t = theme(idx);
  const groups: { be: string; color: string; items: { en: string; ar: string; emoji: string }[] }[] = [
    { be: "am", color: "from-rose-400 to-pink-500", items: PRONOUNS.filter((p) => p.be === "am").map((p) => ({ en: p.en, ar: p.ar, emoji: p.emoji })) },
    { be: "is", color: "from-amber-400 to-orange-500", items: PRONOUNS.filter((p) => p.be === "is").map((p) => ({ en: p.en, ar: p.ar, emoji: p.emoji })) },
    { be: "are", color: "from-sky-400 to-indigo-500", items: PRONOUNS.filter((p) => p.be === "are").map((p) => ({ en: p.en, ar: p.ar, emoji: p.emoji })) },
  ];
  return (
    <div className="relative">
      <Stickers seed={idx} />
      <Badge emoji="🧠" badge="الأهم" t={t} />
      <h2 className="font-fun mt-5 text-4xl font-extrabold text-slate-800">
        <En>Verb to be</En> مع الضمائر
      </h2>
      <p className="mt-2 text-xl text-slate-500">احفظ هذا الجدول جيدًا — كلمة واحدة لكل مجموعة</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {groups.map((g, i) => (
          <div key={g.be} className={`pop pop-${i + 1} rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm`}>
            <div className={`grid place-items-center rounded-2xl bg-gradient-to-br ${g.color} py-4 text-4xl font-extrabold text-white shadow-inner`}>
              <span className="ltr font-en">{g.be}</span>
            </div>
            <div className="mt-4 space-y-2">
              {g.items.map((it) => (
                <div key={it.en} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-2xl">{it.emoji}</span>
                  <span className="ltr font-en text-xl font-bold text-slate-800">{it.en}</span>
                  <span className="mr-auto text-slate-500">{it.ar}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/60 p-4">
        <span className="text-3xl anim-wiggle">🎵</span>
        <span className="font-fun text-xl font-semibold text-slate-800">
          كرّرها كأنها نشيد: <En>I am · You are · He is · She is · It is · We are · They are</En>
        </span>
      </div>
    </div>
  );
}

// ============================================================
// شرائح التمارين التفاعلية
// ============================================================

function ExerciseSlide({ ex, idx }: { ex: Exercise; idx: number }) {
  const t = theme(idx);
  return (
    <div className="relative">
      <Stickers seed={idx} />
      <Badge emoji={ex.emoji} badge={ex.badge} t={t} />
      <h2 className="font-fun mt-5 text-4xl font-extrabold text-slate-800">{ex.title}</h2>
      <p className="mt-2 text-xl text-slate-500">{ex.subtitle}</p>
      <div className="mt-6">
        {ex.type === "mc" && <MC ex={ex} t={t} />}
        {ex.type === "fill" && <Fill ex={ex} t={t} />}
        {ex.type === "fix" && <Fix ex={ex} />}
        {ex.type === "transform" && <Transform ex={ex} t={t} />}
      </div>
    </div>
  );
}

function MC({ ex, t }: { ex: Extract<Exercise, { type: "mc" }>; t: ReturnType<typeof theme> }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-4">
      {ex.questions.map((q, qi) => {
        const chosen = picked[qi];
        return (
          <div key={qi} className="rounded-2xl border-2 border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${t.chip} font-bold`}>{qi + 1}</span>
              <span className="ltr font-en text-xl font-semibold text-slate-800">{q.prompt}</span>
              <span className="mr-1 font-semibold text-slate-500">
                <En>{q.sub}</En>
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = oi === q.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-slate-300";
                if (chosen !== undefined) {
                  if (isCorrect) cls = "border-emerald-400 bg-emerald-50 text-emerald-700";
                  else if (isChosen) cls = "border-rose-400 bg-rose-50 text-rose-700";
                  else cls = "border-slate-200 bg-white text-slate-400";
                }
                return (
                  <button
                    key={oi}
                    onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                    className={`ltr font-en rounded-xl border-2 px-5 py-2 text-lg font-bold transition ${cls}`}
                  >
                    {opt}
                    {chosen !== undefined && isCorrect && " ✓"}
                    {chosen !== undefined && isChosen && !isCorrect && " ✕"}
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

function Fill({ ex, t }: { ex: Extract<Exercise, { type: "fill" }>; t: ReturnType<typeof theme> }) {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {ex.questions.map((q, qi) => {
        const chosen = picked[qi];
        const correct = chosen === q.answer;
        return (
          <div key={qi} className="rounded-2xl border-2 border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xl">
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${t.chip} text-sm font-bold`}>{qi + 1}</span>
              <span className="ltr font-en font-semibold text-slate-800">
                {q.before}{" "}
                <span
                  className={`mx-1 inline-block min-w-16 rounded-lg border-2 border-dashed px-2 text-center ${
                    chosen ? (correct ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-rose-400 bg-rose-50 text-rose-700") : "border-slate-300 text-slate-300"
                  }`}
                >
                  {chosen || "…"}
                </span>{" "}
                {q.after}
              </span>
            </div>
            <div className="mt-2 pr-9 text-sm text-slate-400">{q.ar}</div>
            <div className="mt-3 flex flex-wrap gap-2 pr-9">
              {ex.options.map((opt) => {
                const isChosen = chosen === opt;
                const isAnswer = opt === q.answer;
                let cls = "border-slate-200 bg-white text-slate-600 hover:border-slate-300";
                if (chosen) {
                  if (isAnswer) cls = "border-emerald-400 bg-emerald-50 text-emerald-700";
                  else if (isChosen) cls = "border-rose-400 bg-rose-50 text-rose-700";
                  else cls = "border-slate-200 bg-white text-slate-300";
                }
                return (
                  <button
                    key={opt}
                    onClick={() => setPicked((p) => ({ ...p, [qi]: opt }))}
                    className={`ltr font-en rounded-lg border-2 px-4 py-1.5 font-bold transition ${cls}`}
                  >
                    {opt}
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

function Fix({ ex }: { ex: Extract<Exercise, { type: "fix" }> }) {
  const [shown, setShown] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {ex.questions.map((q, qi) => {
        const open = shown[qi];
        return (
          <div key={qi} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-4 shadow-sm">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-100 font-bold text-rose-700">{qi + 1}</span>
            <span className="ltr font-en text-xl font-semibold text-rose-600 line-through decoration-rose-300">{q.wrong}</span>
            {open ? (
              <span className="ltr font-en text-xl font-bold text-emerald-700">→ {q.correct} ✓</span>
            ) : (
              <button
                onClick={() => setShown((s) => ({ ...s, [qi]: true }))}
                className="mr-auto rounded-xl bg-emerald-500 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-emerald-600"
              >
                أظهر التصحيح
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Transform({ ex, t }: { ex: Extract<Exercise, { type: "transform" }>; t: ReturnType<typeof theme> }) {
  const [shown, setShown] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {ex.questions.map((q, qi) => {
        const open = shown[qi];
        return (
          <div key={qi} className="rounded-2xl border-2 border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${t.chip} font-bold`}>{qi + 1}</span>
              <span className="ltr font-en text-xl font-semibold text-slate-800">{q.given}</span>
              <span className={`rounded-full ${t.chip} px-3 py-1 text-sm font-semibold`}>{q.hint}</span>
            </div>
            <div className="mt-3 pr-11">
              {open ? (
                <span className="ltr font-en text-xl font-bold text-emerald-700">→ {q.answer} ✓</span>
              ) : (
                <button
                  onClick={() => setShown((s) => ({ ...s, [qi]: true }))}
                  className="rounded-xl bg-indigo-500 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-indigo-600"
                >
                  اكشف الإجابة
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Summary() {
  return (
    <div className="relative">
      <Stickers seed={4} />
      <Badge emoji="🧠" badge="ملخص الدرس 2" t={theme(4)} />
      <h2 className="font-fun mt-5 text-4xl font-extrabold text-slate-800">أهم ما يجب أن تتذكره</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/60 p-5">
          <h3 className="font-fun mb-3 text-2xl font-bold text-indigo-700">🗝️ الجدول الذهبي</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRONOUNS.map((p) => (
              <div key={p.en} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                <span className="ltr font-en font-bold text-slate-800">{p.en}</span>
                <span className="text-slate-400">←</span>
                <span className="ltr font-en font-bold text-indigo-600">{p.be}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-5">
          <h3 className="font-fun mb-3 text-2xl font-bold text-emerald-700">⭐ قاعدة الدرس</h3>
          <div className="space-y-3">
            {[
              { ar: "أنا طالب", wrong: "I student.", right: "I am a student." },
              { ar: "هو سعيد", wrong: "He happy.", right: "He is happy." },
              { ar: "هم طلاب", wrong: "They students.", right: "They are students." },
            ].map((r, i) => (
              <div key={i} className="rounded-xl bg-white p-3 shadow-sm">
                <div className="mb-1 font-semibold text-slate-600">{r.ar}</div>
                <div className="ltr font-en font-bold text-rose-500 line-through decoration-rose-300">{r.wrong} ✕</div>
                <div className="ltr font-en font-bold text-emerald-600">{r.right} ✓</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4 rounded-2xl bg-gradient-to-l from-indigo-500 to-violet-600 p-5 text-white shadow-lg">
        <span className="text-4xl anim-bob">🏆</span>
        <span className="font-fun text-2xl font-bold">
          <En>Verb to be</En> ليس ثانويًا — إنه أساس تكوين الجملة الإنجليزية. أحسنت!
        </span>
      </div>
    </div>
  );
}

function QuizSlide() {
  return (
    <div className="relative">
      <Stickers seed={2} />
      <Badge emoji="📝" badge="الاختبار النهائي" t={theme(3)} />
      <h2 className="font-fun mt-5 text-4xl font-extrabold text-slate-800">الاختبار النهائي</h2>
      <p className="mt-2 text-xl text-slate-500">12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت أنك أتقنت الضمائر و Verb to be.</p>
      <div className="mt-6">
        <FinalQuiz lesson={2} accent="bg-indigo-600" />
      </div>
    </div>
  );
}

// ============================================================
// جهاز عرض الشريحة
// ============================================================

function SlideView({ s, idx }: { s: Slide; idx: number }) {
  switch (s.kind) {
    case "cover":
      return <Cover />;
    case "objectives":
      return <Objectives />;
    case "content":
      return <ContentSlide s={s} idx={idx} />;
    case "pronounGrid":
      return <PronounGrid idx={idx} />;
    case "verbTable":
      return <VerbTable idx={idx} />;
    case "exercise":
      return <ExerciseSlide ex={s.ex} idx={idx} />;
    case "quiz":
      return <QuizSlide />;
    case "summary":
      return <Summary />;
  }
}

function slideTitle(s: Slide): string {
  switch (s.kind) {
    case "cover":
      return "الغلاف";
    case "objectives":
      return "الأهداف";
    case "content":
      return s.title;
    case "pronounGrid":
      return "الضمائر السبعة";
    case "verbTable":
      return "جدول Verb to be";
    case "exercise":
      return s.ex.title;
    case "quiz":
      return "الاختبار النهائي";
    case "summary":
      return "الملخص";
  }
}

function slideEmoji(s: Slide): string {
  switch (s.kind) {
    case "cover":
      return "📘";
    case "objectives":
      return "🎯";
    case "content":
      return s.emoji;
    case "pronounGrid":
      return "🎴";
    case "verbTable":
      return "🧠";
    case "exercise":
      return s.ex.emoji;
    case "quiz":
      return "📝";
    case "summary":
      return "🏁";
  }
}

// ============================================================
// التطبيق الرئيسي
// ============================================================

export default function Lesson2({ onExit }: { onExit: () => void }) {
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
      // في العربية السهم الأيسر ينقلنا للأمام بصريًا؛ نجعل الاثنين يعملان بوضوح
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

  const progress = ((i + 1) / total) * 100;

  return (
    <div className="paper-dots relative flex min-h-screen flex-col" style={{ background: "linear-gradient(160deg,#fffaf1,#fdf3e6 60%,#faeede)" }}>
      {/* علامة مائية باهتة في الخلفية */}
      <SignatureGhost />

      {/* التوقيع البارز في الأعلى */}
      <Signature />

      {/* الشريط العلوي */}
      <header className="relative z-20 flex items-center gap-3 border-b border-amber-200/60 bg-white/70 px-4 py-3 backdrop-blur-md md:px-8">
        <button
          onClick={onExit}
          title="العودة إلى قائمة الدروس"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
        >
          →
        </button>
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl shadow-md">📘</div>
        <div className="min-w-0">
          <div className="font-fun truncate text-lg font-extrabold text-slate-800 md:text-xl">
            الدرس 2 · الضمائر و <span className="ltr font-en text-indigo-600">Verb to be</span>
          </div>
          <div className="truncate text-xs text-slate-400">{slideTitle(SLIDES[i])}</div>
        </div>
        <button
          onClick={() => setMenu(true)}
          className="mr-auto flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
        >
          <span className="text-lg">🗂️</span> فهرس الدرس
        </button>
      </header>

      {/* شريط التقدّم */}
      <div className="relative z-20 h-1.5 w-full bg-amber-100">
        <div className="h-full bg-gradient-to-l from-indigo-500 to-violet-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* منطقة الشريحة */}
      <main className="relative z-10 flex flex-1 items-start justify-center px-3 py-6 md:px-8 md:py-10">
        <div key={i} className="pop w-full max-w-4xl rounded-[2rem] border-2 border-white bg-white/85 p-6 shadow-xl shadow-amber-200/40 backdrop-blur-sm md:p-10">
          <SlideView s={SLIDES[i]} idx={i} />
        </div>
      </main>

      {/* الشريط السفلي للتنقل */}
      <footer className="relative z-20 flex items-center justify-between gap-3 border-t border-amber-200/60 bg-white/70 px-4 py-3 backdrop-blur-md md:px-8">
        <button
          onClick={go.prev}
          disabled={i === 0}
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 font-bold text-white shadow transition enabled:hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span>→</span> السابق
        </button>

        <div className="hidden items-center gap-1.5 sm:flex">
          {SLIDES.map((_, di) => (
            <button
              key={di}
              onClick={() => setI(di)}
              className={`h-2.5 rounded-full transition-all ${di === i ? "w-7 bg-indigo-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
              aria-label={`الشريحة ${di + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-bold text-slate-500">
            {i + 1} / {total}
          </span>
          <button
            onClick={go.next}
            disabled={i === total - 1}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-l from-indigo-500 to-violet-600 px-5 py-2.5 font-bold text-white shadow transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
          >
            التالي <span>←</span>
          </button>
        </div>
      </footer>



      {/* الفهرس */}
      {menu && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div
            className="relative z-10 mr-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h3 className="font-fun text-2xl font-extrabold text-slate-800">🗂️ فهرس الدرس</h3>
              <button onClick={() => setMenu(false)} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-xl text-slate-600 hover:bg-slate-200">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid gap-2">
                {SLIDES.map((s, di) => (
                  <button
                    key={di}
                    onClick={() => {
                      setI(di);
                      setMenu(false);
                    }}
                    className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-right transition ${
                      di === i ? "border-indigo-400 bg-indigo-50" : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-2xl">{slideEmoji(s)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold text-slate-800">{slideTitle(s)}</span>
                      <span className="text-xs text-slate-400">الشريحة {di + 1}</span>
                    </span>
                    {di === i && <span className="text-indigo-500">●</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
