// ============================================================
// خطوات الدرس 32 — جسم كل خطوة (تفاعل → اكتشاف → شرح → مصدر → تدريب → إتقان)
// كل خطوة تُغلق نص المصدر حتى تُتمّ التفاعل، والخطوات الشارحة تعرضه فورًا.
// ============================================================

import { useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import {
  BLOCKS_S1, FLIP_S2, SUBJECTS_S3, RIBBON_S4, FOR_ROUNDS_S5, SINCE_ROUNDS_S6, FORSINCE_S7,
  HOWLONG_S8, NEG_ROUND_S9, QUESTION_ROUNDS_S10, SHORT_ROWS_S11, WH_ROWS_S12, EVIDENCE_S13,
  CANVAS_S14, DOORS_S15, SPEAKERS_S16, ANOTHER_S17, STILL_S18, PLATFORM_NOTE_S18, KEYWORDS_S19,
  CUE_S20, PAIRS_S21, COUNT_ROWS_S22, STATIVE_S23, RAIL_S24, RAIL_S25, RAIL_S26, DETECTIVE_S27,
  TYPED_S28, BIKE_S29, SCENE_S30, FIX_S31, FORSINCE_ROWS_S31, BOSS_ITEMS_S32, BOSS_GEARS_S32,
  ADAM_TEXT_S33, MAYA_S34, GOLDEN_S35, GEARS_S36, OBJECTIVES_32,
} from "./data";
import {
  ACCENT32, FOCUS32, Lab32, Platform32, SourceReveal32, BlockBuilder32, FlipParts32, SortBuckets32,
  SlotPick32, PerRow32, TapFix32, TypedFill32, EvidenceCases32, RibbonMaker32, ExploreGrid32,
  StativeGate32, ReferenceRail32, StillRunning32, Boss32, VerbTap32, GearMap32, ObjectivesChecklist32,
  type Row32,
} from "./kit32";


/** يعرض الإطار المصدري بعد إتمام التفاعل — ويُغلق بالتصميم حتى يُنجز الطالب المحاولة */
function Gate({ id, done, children }: { id: string; done: boolean; children?: ReactNode }) {
  return (
    <>
      {children}
      <SourceReveal32 id={id} show={done} />
    </>
  );
}

// ---------- الغلاف ----------
function Cover() {
  return (
    <Lab32 emoji="🌿" label="THE ACTIVITY RIBBON" ar="شريط النشاط" seq="cover">
      <div className="space-y-3">
        <div className="relative h-16 overflow-hidden rounded-2xl border-2 border-emerald-200 bg-white" aria-hidden>
          <div className="l32-ribbon-flow absolute inset-y-3 start-3 end-16 rounded-full bg-gradient-to-r from-amber-300 via-emerald-400 to-emerald-700 opacity-80" />
          <span className="absolute end-3 top-1/2 -translate-y-1/2 font-en text-xs font-black text-slate-800">NOW</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2" dir="ltr">
          {["for", "since", "how long", "been", "V-ing"].map((w) => (
            <span key={w} className="font-en rounded-full border-2 border-emerald-300 bg-white px-3 py-1 text-sm font-black text-emerald-900">{w}</span>
          ))}
        </div>
      </div>
      <SourceReveal32 id="cover" show />
    </Lab32>
  );
}

// ---------- الأهداف ----------
function Objectives() {
  return (
    <Lab32 emoji="🎯" label="OBJECTIVES" ar="علّم كل هدف بعد أن تتقنه" seq="objectives">
      <ObjectivesChecklist32 items={OBJECTIVES_32.map((o) => ({ n: o.n, text: o.text }))} />
      <SourceReveal32 id="objectives" show alwaysOpen={false} />
    </Lab32>
  );
}

// ---------- s1: بناء الجملة ----------
function S1() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🧱" label="BUILD THE LINE" ar="ابنِ الجملة بالترتيب" seq="s1">
      <BlockBuilder32 seq="s1" rounds={BLOCKS_S1} onDone={() => setDone(true)} />
      <Gate id="s1" done={done} />
    </Lab32>
  );
}

// ---------- s2: لماذا have + been + ing ----------
function S2() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🔍" label="FLIP THE PARTS" ar="اكشف دور كل قطعة" seq="s2">
      <FlipParts32 seq="s2" parts={FLIP_S2} onDone={() => setDone(true)} />
      <Gate id="s2" done={done} />
    </Lab32>
  );
}

// ---------- s3: have أم has ----------
function S3() {
  const [done, setDone] = useState(false);
  const items = SUBJECTS_S3.map((s) => ({ text: s.en, bucket: s.bucket, why: `${s.en} ← ${s.bucket === 0 ? "have" : "has"}` }));
  return (
    <Lab32 emoji="🪣" label="HAVE OR HAS" ar="الفاعل يحدد have أو has" seq="s3">
      <SortBuckets32 seq="s3" items={items} buckets={[{ label: "have", tone: "border-teal-400 bg-teal-50" }, { label: "has", tone: "border-emerald-500 bg-emerald-50" }]} onDone={() => setDone(true)} />
      <Gate id="s3" done={done} />
    </Lab32>
  );
}

// ---------- s4: شريط النشاط ----------
function S4() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🌿" label="THE RIBBON" ar="متى نستخدمه؟" seq="s4">
      <RibbonMaker32 seq="s4" activities={RIBBON_S4.activities} maxHours={RIBBON_S4.maxHours} onDone={() => setDone(true)} />
      <Gate id="s4" done={done} />
    </Lab32>
  );
}

// ---------- s5 / s6 / s7 / s8 ----------
function S5() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="📏" label="FOR = DURATION" ar="المسطرة: كم استمر؟" seq="s5">
      <SlotPick32 seq="s5" rounds={FOR_ROUNDS_S5} variant="ruler" onDone={() => setDone(true)} />
      <Gate id="s5" done={done} />
    </Lab32>
  );
}

function S6() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🚩" label="SINCE = START POINT" ar="العلامة: منذ متى؟" seq="s6">
      <SlotPick32 seq="s6" rounds={SINCE_ROUNDS_S6} variant="flag" onDone={() => setDone(true)} />
      <Gate id="s6" done={done} />
    </Lab32>
  );
}

function S7() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="⏳" label="FOR OR SINCE?" ar="صنّف العبارة" seq="s7">
      <SortBuckets32 seq="s7" items={FORSINCE_S7.map((f) => ({ text: f.en, bucket: f.bucket, why: f.why }))} buckets={[{ label: "for ← مدة (كم استمر؟)", tone: "border-amber-400 bg-amber-50" }, { label: "since ← نقطة بداية (منذ متى؟)", tone: "border-sky-400 bg-sky-50" }]} onDone={() => setDone(true)} />
      <Gate id="s7" done={done} />
    </Lab32>
  );
}

function S8() {
  const [qDone, setQ] = useState(false);
  const [rDone, setR] = useState(false);
  const rows: Row32[] = HOWLONG_S8.replies.map((r) => ({
    stem: r.stem,
    opts: r.options.map((o) => o.text),
    answer: r.options.findIndex((o) => o.ok),
    why: r.options.find((o) => o.ok)?.why ?? "",
  }));
  return (
    <Lab32 emoji="❓" label="HOW LONG?" ar="ابنِ السؤال ثم أجب" seq="s8">
      <BlockBuilder32 seq="s8" rounds={[HOWLONG_S8.question]} onDone={() => setQ(true)} />
      {qDone && <PerRow32 seq="s8" rows={rows} labels={["جواب ١", "جواب ٢"]} onDone={() => setR(true)} />}
      <Gate id="s8" done={qDone && rDone} />
    </Lab32>
  );
}

// ---------- s9 / s10 / s11 / s12 ----------
function S9() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🚫" label="NEGATIVE" ar="have/has + not + been + V-ing" seq="s9">
      <BlockBuilder32 seq="s9" rounds={[NEG_ROUND_S9]} onDone={() => setDone(true)} />
      <Gate id="s9" done={done} />
    </Lab32>
  );
}

function S10() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="❓" label="QUESTIONS" ar="have/has ← الفاعل ← been ← V-ing" seq="s10">
      <BlockBuilder32 seq="s10" rounds={QUESTION_ROUNDS_S10} onDone={() => setDone(true)} />
      <Gate id="s10" done={done} />
    </Lab32>
  );
}

function S11() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="✅" label="SHORT ANSWERS" ar="انتبه للفخ" seq="s11">
      <PerRow32 seq="s11" rows={SHORT_ROWS_S11} onDone={() => setDone(true)} />
      <Gate id="s11" done={done} />
    </Lab32>
  );
}

function S12() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = WH_ROWS_S12.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <Lab32 emoji="🔎" label="WH QUESTIONS" ar="ما أداة السؤال؟" seq="s12">
      <PerRow32 seq="s12" rows={rows} onDone={() => setDone(true)} />
      <Gate id="s12" done={done} />
    </Lab32>
  );
}

// ---------- s13 / s14 / s15 / s16 / s17 / s18 ----------
function S13() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🕵️" label="EVIDENCE SCENE" ar="الدليل الآن ← الجملة" seq="s13">
      <EvidenceCases32 seq="s13" cases={EVIDENCE_S13} onDone={() => setDone(true)} />
      <Gate id="s13" done={done} />
    </Lab32>
  );
}

function S14() {
  const [lens, setLens] = useState<"result" | "activity">("result");
  const [seen, setSeen] = useState<Set<string>>(new Set(["result"]));
  const [rowsDone, setRowsDone] = useState(false);
  const [lensDone, setLensDone] = useState(false);
  const pick = (l: "result" | "activity") => {
    setLens(l);
    const n = new Set(seen);
    n.add(l);
    setSeen(n);
    if (n.size === 2) setLensDone(true);
  };
  const cells = Array.from({ length: 8 }, (_, i) => i);
  return (
    <Lab32 emoji="🎨" label="THE CANVAS" ar="النتيجة أم النشاط؟" seq="s14">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="العدسة">
          <button type="button" aria-pressed={lens === "result"} onClick={() => pick("result")}
            className={`rounded-xl border-2 px-3.5 py-2 text-sm font-black ${lens === "result" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-800"} ${FOCUS32}`}>
            🏆 <Rich text="عدسة النتيجة" />
          </button>
          <button type="button" aria-pressed={lens === "activity"} onClick={() => pick("activity")}
            className={`rounded-xl border-2 px-3.5 py-2 text-sm font-black ${lens === "activity" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-800"} ${FOCUS32}`}>
            🖌️ <Rich text="عدسة النشاط" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1.5 rounded-2xl border-2 border-slate-300 bg-white p-3" aria-hidden>
          {cells.map((i) => {
            const painted = lens === "result" ? true : i < 5;
            return (
              <div key={i} className={`aspect-square rounded-lg border ${painted ? (lens === "result" ? "border-emerald-600 bg-emerald-500" : "l32-brush border-emerald-500 bg-emerald-300") : "border-dashed border-slate-300 bg-slate-50"} grid place-items-center text-sm`}>
                {lens === "result" && painted ? "✓" : ""}
              </div>
            );
          })}
        </div>
        <div dir="ltr" className="ltr-row rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center">
          <En className="block text-base font-black text-emerald-950">{lens === "result" ? CANVAS_S14.result.en : CANVAS_S14.activity.en}</En>
          <span dir="rtl" className="mt-1 block text-sm font-bold text-slate-700"><Rich text={lens === "result" ? CANVAS_S14.result.ar : CANVAS_S14.activity.ar} /></span>
        </div>
        <p className="text-xs font-bold text-slate-500"><Rich text={`بدّل العدستين لتكمل التجربة (${seen.size}/2)`} /></p>
      </div>
      {lensDone && (
        <PerRow32 seq="s14" labels={["١", "٢"]} onDone={() => setRowsDone(true)} rows={[
          { stem: "الجدار مكتمل الطلاء بالكامل — أي عدسة؟", opts: ["النتيجة — Present Perfect", "النشاط — Present Perfect Continuous"], answer: 0, why: "المصدر: I have painted the room — التركيز على الإنجاز." },
          { stem: "الفرشاة ما زالت تتحرك على الجدار — أي عدسة؟", opts: ["النتيجة — Present Perfect", "النشاط — Present Perfect Continuous"], answer: 1, why: "المصدر: I have been painting the room — التركيز على النشاط." },
        ]} />
      )}
      <Gate id="s14" done={lensDone && rowsDone} />
    </Lab32>
  );
}

function S15() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🚪" label="TWO DOORS" ar="بابان: النتيجة ← PP · النشاط ← PPC" seq="s15">
      <SortBuckets32 seq="s15" items={DOORS_S15} buckets={[{ label: "🚪 النتيجة ← Present Perfect", tone: "border-teal-400 bg-teal-50" }, { label: "🚪 النشاط / المدة ← Present Perfect Continuous", tone: "border-emerald-500 bg-emerald-50" }]} onDone={() => setDone(true)} />
      <Gate id="s15" done={done} />
    </Lab32>
  );
}

function S16() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = SPEAKERS_S16.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <Lab32 emoji="🗣️" label="TWO SPEAKERS" ar="أي زاوية تقصدها الجملة؟" seq="s16">
      <PerRow32 seq="s16" rows={rows} labels={["A", "B"]} onDone={() => setDone(true)} />
      <Gate id="s16" done={done} />
    </Lab32>
  );
}

function S17() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = ANOTHER_S17.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <Lab32 emoji="🖼️" label="ANOTHER EXAMPLE" ar="لوحات وبعد الظهر" seq="s17">
      <PerRow32 seq="s17" rows={rows} onDone={() => setDone(true)} />
      <Gate id="s17" done={done} />
    </Lab32>
  );
}

function S18() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🏃" label="SAME SENTENCE" ar="الواقع يتغيّر، والجملة لا" seq="s18">
      <StillRunning32 seq="s18" en={STILL_S18.en} states={STILL_S18.states} note={PLATFORM_NOTE_S18} onDone={() => setDone(true)} />
      <Gate id="s18" done={done} />
    </Lab32>
  );
}

// ---------- s19 / s20 / s21 / s22 / s23 ----------
function S19() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🔑" label="KEYWORDS" ar="اكشف الكلمات" seq="s19">
      <ExploreGrid32 seq="s19" items={KEYWORDS_S19} onDone={() => setDone(true)} />
      <Gate id="s19" done={done} />
    </Lab32>
  );
}

function S20() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = CUE_S20.map((c) => ({
    stem: `${c.en}  (${c.word})`,
    opts: ["Present Perfect", "Present Perfect Continuous"],
    answer: c.tense === "PP" ? 0 : 1,
    why: c.tense === "PP"
      ? "الكلمة وحدها لا تكفي: هنا الإنجاز واضح ← Present Perfect (المصدر §20)."
      : "الكلمة وحدها لا تكفي: هنا النشاط الممتد ← Present Perfect Continuous (المصدر §20).",
  }));
  return (
    <Lab32 emoji="🧭" label="CUE WORDS" ar="الكلمة وحدها لا تكفي" seq="s20">
      <PerRow32 seq="s20" rows={rows} onDone={() => setDone(true)} />
      <Gate id="s20" done={done} />
    </Lab32>
  );
}

function S21() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = PAIRS_S21.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <Lab32 emoji="🧩" label="PAIRS" ar="أي جملة تقصد هذا التركيز؟" seq="s21">
      <PerRow32 seq="s21" rows={rows} onDone={() => setDone(true)} />
      <Gate id="s21" done={done} />
    </Lab32>
  );
}

function S22() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = COUNT_ROWS_S22.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <Lab32 emoji="🔢" label="COUNT OR ACTIVITY" ar="عدد مكتمل أم نشاط ومدة؟" seq="s22">
      <PerRow32 seq="s22" rows={rows} onDone={() => setDone(true)} />
      <Gate id="s22" done={done} />
    </Lab32>
  );
}

function S23() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🚧" label="THE STATIVE GATE" ar="بوابة الأفعال الحالية" seq="s23">
      <StativeGate32 seq="s23" verbs={STATIVE_S23} onDone={() => setDone(true)} />
      <Gate id="s23" done={done} />
    </Lab32>
  );
}

// ---------- s24 / s25 / s26 (نقطة المرجع) ----------
function S24() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🕰️" label="REFERENCE POINT" ar="مقارنة مع Past Continuous" seq="s24">
      <ReferenceRail32 seq="s24" snaps={RAIL_S24} onDone={() => setDone(true)} />
      <Gate id="s24" done={done} />
    </Lab32>
  );
}

function S25() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🕰️" label="REFERENCE POINT" ar="مقارنة مع Past Perfect Continuous" seq="s25">
      <ReferenceRail32 seq="s25" snaps={RAIL_S25} onDone={() => setDone(true)} />
      <Gate id="s25" done={done} />
    </Lab32>
  );
}

function S26() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🗺️" label="THE BIG TIMELINE" ar="الخريطة الزمنية الكبرى" seq="s26">
      <ReferenceRail32 seq="s26" snaps={RAIL_S26} onDone={() => setDone(true)} />
      <Gate id="s26" done={done} />
    </Lab32>
  );
}

// ---------- s27 / s28 / s29 / s30 / s31 ----------
function S27() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🕵️" label="GRAMMAR DETECTIVE" ar="صيد الأخطاء ثم الإصلاح" seq="s27">
      <TapFix32 seq="s27" items={DETECTIVE_S27} onDone={() => setDone(true)} />
      <Gate id="s27" done={done} />
    </Lab32>
  );
}

function S28() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🎯" label="CHOICE CHALLENGE" ar="اكتب الزمن الصحيح" seq="s28">
      <TypedFill32 seq="s28" items={TYPED_S28.map((t) => ({ prompt: t.prompt, hint: t.hint, accept: t.accept, why: t.why }))} onDone={() => setDone(true)} />
      <Gate id="s28" done={done} />
    </Lab32>
  );
}

function S29() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = BIKE_S29.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <Lab32 emoji="🚲" label="SAME VERB, DIFFERENT MEANING" ar="هل انتهى الأمر؟" seq="s29">
      <PerRow32 seq="s29" rows={rows} onDone={() => setDone(true)} />
      <Gate id="s29" done={done} />
    </Lab32>
  );
}

function S30() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🎬" label="MEANING SCENE" ar="تحدي المعنى" seq="s30">
      <EvidenceCases32 seq="s30" cases={SCENE_S30} onDone={() => setDone(true)} />
      <Gate id="s30" done={done} />
    </Lab32>
  );
}

function S31() {
  const [aDone, setA] = useState(false);
  const [bDone, setB] = useState(false);
  const rows: Row32[] = FORSINCE_ROWS_S31.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <Lab32 emoji="🔧" label="FIX IT" ar="since مع المدة ← for" seq="s31">
      <TapFix32 seq="s31" items={[FIX_S31]} onDone={() => setA(true)} />
      <PerRow32 seq="s31" rows={rows} onDone={() => setB(true)} />
      <Gate id="s31" done={aDone && bDone} />
    </Lab32>
  );
}

// ---------- s32 / s33 / s34 / s35 / s36 ----------
function S32() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🐉" label="BOSS CHALLENGE" ar="اختر الزمن لكل ضربة" seq="s32">
      <Boss32 seq="s32" items={BOSS_ITEMS_S32} gears={BOSS_GEARS_S32} onDone={() => setDone(true)} />
      <Gate id="s32" done={done} />
    </Lab32>
  );
}

function S33() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="📖" label="FINAL IQ200 · ADAM" ar="لوّن الزمن لكل عبارة" seq="s33">
      <VerbTap32 seq="s33" parts={ADAM_TEXT_S33.parts} answers={ADAM_TEXT_S33.answers} why={ADAM_TEXT_S33.why} onDone={() => setDone(true)} />
      <Gate id="s33" done={done} />
    </Lab32>
  );
}

function S34() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🏁" label="FINAL BOSS · MAYA" ar="اكتب كل فعل بالزمن الصحيح" seq="s34">
      <TypedFill32 seq="s34" items={MAYA_S34.map((m) => ({ prompt: m.prompt, accept: m.accept, why: m.why }))} onDone={() => setDone(true)} />
      <Gate id="s34" done={done} />
    </Lab32>
  );
}

function S35() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🥇" label="GOLDEN RULE" ar="النمط ← الفرز" seq="s35">
      <SortBuckets32 seq="s35" items={GOLDEN_S35} buckets={[{ label: "have/has + V3 ← نتيجة / إنجاز", tone: "border-teal-400 bg-teal-50" }, { label: "have/has + been + V-ing ← نشاط / مدة", tone: "border-emerald-500 bg-emerald-50" }]} onDone={() => setDone(true)} />
      <Gate id="s35" done={done} />
    </Lab32>
  );
}

function S36() {
  const [done, setDone] = useState(false);
  return (
    <Lab32 emoji="🗺️" label="THE MAP" ar="أربعة تروس للحاضر" seq="s36">
      <GearMap32 seq="s36" gears={GEARS_S36} onDone={() => setDone(true)} />
      <Gate id="s36" done={done} />
    </Lab32>
  );
}

// ---------- الملخص والخاتمة ----------
function Summary() {
  return (
    <Lab32 emoji="📋" label="SUMMARY" ar="ملخص الدرس 32" seq="summary">
      <Platform32>{"ملخص المنصة: النتيجة ← Present Perfect · النشاط والمدة ← Present Perfect Continuous · for = مدة · since = نقطة بداية · الزمن يتحدد بزاوية النظر."}</Platform32>
      <SourceReveal32 id="summary" show alwaysOpen />
    </Lab32>
  );
}

function Closing({ onGoTest }: { onGoTest: () => void }) {
  return (
    <Lab32 emoji="🏁" label="NEXT STEP" ar="الخطوة التالية" seq="closing">
      <div className="space-y-3">
        <p className="text-sm font-bold text-slate-700"><Rich text="أنت الآن جاهز لاختبار الدرس 32: 20 سؤالًا جديدًا. تُكشف الإجابات بعد الإرسال فقط." /></p>
        <button type="button" onClick={onGoTest}
          className={`rounded-2xl bg-emerald-700 px-5 py-3 text-base font-black text-white shadow hover:bg-emerald-800 ${FOCUS32}`}>
          🧪 <Rich text="ابدأ اختبار الدرس 32" />
        </button>
      </div>
      <SourceReveal32 id="closing" show alwaysOpen />
    </Lab32>
  );
}

/** جسم الخطوة حسب معرّف الوحدة (ledger id) — كل خطوة لها جسم واحد */
export function StepBody32({ id, onGoTest }: { id: string; onGoTest: () => void }) {
  switch (id) {
    case "cover": return <Cover />;
    case "objectives": return <Objectives />;
    case "s1": return <S1 />;
    case "s2": return <S2 />;
    case "s3": return <S3 />;
    case "s4": return <S4 />;
    case "s5": return <S5 />;
    case "s6": return <S6 />;
    case "s7": return <S7 />;
    case "s8": return <S8 />;
    case "s9": return <S9 />;
    case "s10": return <S10 />;
    case "s11": return <S11 />;
    case "s12": return <S12 />;
    case "s13": return <S13 />;
    case "s14": return <S14 />;
    case "s15": return <S15 />;
    case "s16": return <S16 />;
    case "s17": return <S17 />;
    case "s18": return <S18 />;
    case "s19": return <S19 />;
    case "s20": return <S20 />;
    case "s21": return <S21 />;
    case "s22": return <S22 />;
    case "s23": return <S23 />;
    case "s24": return <S24 />;
    case "s25": return <S25 />;
    case "s26": return <S26 />;
    case "s27": return <S27 />;
    case "s28": return <S28 />;
    case "s29": return <S29 />;
    case "s30": return <S30 />;
    case "s31": return <S31 />;
    case "s32": return <S32 />;
    case "s33": return <S33 />;
    case "s34": return <S34 />;
    case "s35": return <S35 />;
    case "s36": return <S36 />;
    case "summary": return <Summary />;
    case "closing": return <Closing onGoTest={onGoTest} />;
    default: return null;
  }
}

