// ============================================================
// خطوات الدرس 32 — 🌊 THE DURATION STREAM / تيّار المدة
//
// بنية كل خطوة (ثابتة في الأربعين خطوة):
//   1) تجربة تفاعلية (Lab32) — تحاول أولًا
//   2) شارة إتمام التفاعل (Gate) — تأكيد حقيقي بلا كشف نقري
//   3) شرح المنصة (Teach32) — Platform Explanation يوضّح ما فعلته
//   4) منصة أمثلة المصدر (SourceDeck32) — كل سطر من وحدة المصدر
//      كما ورد حرفيًا: أمثلة إنجليزية + ترجمتها + الشرح + الحلول.
//
// لا تُحذف أسطر المصدر ولا تُختصر: منصة المصدر تعرضها داخل الخطوة نفسها،
// والسجل الحرفي الكامل يبقى في ledger32.ts وفهرس المعلم.
// ============================================================

import { useMemo, useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import {
  BLOCKS_S1, FLIP_S2, SUBJECTS_S3, RIBBON_S4, FOR_ROUNDS_S5, SINCE_ROUNDS_S6, FORSINCE_S7,
  HOWLONG_S8, NEG_ROUND_S9, QUESTION_ROUNDS_S10, SHORT_ROWS_S11, WH_ROWS_S12, EVIDENCE_S13,
  CANVAS_S14, LENS_S14, LENS_AXIS_32, DOORS_S15, SPEAKERS_S16, ANOTHER_S17, STILL_S18,
  PLATFORM_NOTE_S18, KEYWORDS_S19, CUE_S20, PAIRS_S21, COUNT_ROWS_S22, STATIVE_S23,
  RAIL_S24, RAIL_S25, RAIL_S26, TENSE_MAP_S24, TENSE_MAP_S25, TENSE_MAP_S26, DETECTIVE_S27,
  TYPED_S28, BIKE_S29, SCENE_S30, FIX_S31, FORSINCE_ROWS_S31, BOSS_ITEMS_S32, BOSS_GEARS_S32,
  ADAM_TEXT_S33, MAYA_S34, GOLDEN_S35, GEARS_S36, GOLDEN_DIFF_32, FOUR_PRESENT_32,
  OBJECTIVES_32, TEACH_32,
} from "./data";
import {
  FOCUS32, Lab32, Platform32, Teach32, SourceDeck32, SourceBadge32, StreamTimeline32,
  BlockBuilder32, FlipParts32, SortBuckets32, SlotPick32, PerRow32, TapFix32, TypedFill32,
  EvidenceCases32, RibbonMaker32, ExploreGrid32, StativeGate32, ReferenceRail32,
  StillRunning32, Boss32, VerbTap32, GearMap32, ObjectivesChecklist32, LensStage32,
  TenseCompare32, type Row32,
} from "./kit32";
import { deckFor32 } from "./sourceDeck32";

/** شارة إتمام التفاعل — تأكيد حقيقي بلا أي كشف لنص المصدر */
function Gate({ id, done }: { id: string; done: boolean }) {
  if (!done) return null;
  return (
    <p data-gate-done={id} role="status"
      className="rounded-2xl border-2 border-[#b6e0c4] bg-[#eaf7ee] px-3.5 py-2 text-sm font-black text-[#14532d]">
      <Rich text="✓ أتممت هذا التفاعل — تابع الشرح وأمثلة المصدر في نفس الخطوة." />
    </p>
  );
}

/**
 * غلاف الخطوة: التجربة ثم شرح المنصة ثم منصة أمثلة المصدر.
 * منصة المصدر تُشتق من دفتر المصدر نفسه، فلا يمكن أن يسقط سطر.
 */
function StepStack({ id, children }: { id: string; children: ReactNode }) {
  const blocks = useMemo(() => deckFor32(id), [id]);
  return (
    <div className="space-y-3">
      {children}
      <Teach32 items={TEACH_32[id] ?? []} />
      <SourceDeck32 blocks={blocks} />
    </div>
  );
}

/** محور النتيجة/النشاط في صورة بطاقتين — يُستعمل في الخطوات المقارنة والملخص */
function LensAxis32({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-2 ${compact ? "" : "sm:grid-cols-2"}`}>
      {GOLDEN_DIFF_32.map((g) => {
        const result = g.side === "result";
        return (
          <div key={g.tense} className={`l32-card p-3 ${result ? "l32-card-indigo" : "l32-card-aqua"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span aria-hidden className="text-lg">{result ? "🏆" : "🎥"}</span>
              <span dir="ltr" className="font-en text-sm font-black text-[#131b3f]"><En>{g.tense}</En></span>
              <span className={`l32-chip ${result ? "l32-chip-indigo" : "l32-chip-aqua"}`}><Rich text={g.ar} /></span>
            </div>
            <div dir="ltr" className="ltr-row mt-1.5"><En className="l32-deck-en">{g.en}</En></div>
            <p className="l32-deck-ar mt-0.5"><Rich text={g.enAr} /></p>
          </div>
        );
      })}
    </div>
  );
}

// ---------- الغلاف ----------
function Cover() {
  return (
    <StepStack id="cover">
      <div className="l32-card overflow-hidden">
        <div className="bg-[linear-gradient(120deg,#312a8f_0%,#0e7490_52%,#22d3ee_100%)] px-4 py-3.5 text-white">
          <p className="l32-en-display text-[11px] font-black uppercase tracking-[0.28em] text-[#c9f4ff]">
            <En>THE DURATION STREAM</En>
          </p>
          <p className="mt-0.5 text-[13px] font-black text-white">
            <Rich text="تيّار المدة" />
          </p>
          <p className="mt-1 font-en text-sm font-black text-white md:text-base">
            <En>Subject + have/has + been + verb-ing</En>
          </p>
        </div>
        <div className="p-3 sm:p-4">
          <StreamTimeline32 start={0.28} live label="التيّار يمتد نحو الآن"
            caption="انظر إلى التيّار: نقطة بداية في الماضي، مدة ممتدة، ثم NOW — وأحيانًا أثرٌ يبقى بعد التوقف." />
          <div className="mt-3 flex flex-wrap justify-center gap-2" dir="ltr">
            {["for", "since", "how long", "been", "V-ing", "all day"].map((w) => (
              <span key={w} className="l32-chip l32-chip-aqua font-en text-sm font-black">{w}</span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <SourceBadge32 src />
            <span className="l32-chip l32-chip-indigo"><Rich text="40 خطوة · كل خطوة وحدة مصدرية واحدة" /></span>
          </div>
        </div>
      </div>
    </StepStack>
  );
}

// ---------- الأهداف ----------
function Objectives() {
  return (
    <StepStack id="objectives">
      <Lab32 emoji="🎯" label="OBJECTIVES" ar="علّم كل هدف بعد أن تتقنه" seq="objectives">
        <ObjectivesChecklist32 items={OBJECTIVES_32.map((o) => ({ n: o.n, text: o.text }))} />
      </Lab32>
    </StepStack>
  );
}

// ---------- s1: بناء الجملة ----------
function S1() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s1">
      <Lab32 emoji="🧱" label="BUILD THE LINE" ar="ابنِ الجملة بالترتيب" seq="s1">
        <BlockBuilder32 seq="s1" formula="Subject + have/has + been + verb-ing" rounds={BLOCKS_S1} onDone={() => setDone(true)} />
        <Gate id="s1" done={done} />
      </Lab32>
    </StepStack>
  );
}

// ---------- s2: لماذا have + been + ing ----------
function S2() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s2">
      <Lab32 emoji="🔍" label="FLIP THE PARTS" ar="اكشف دور كل قطعة" seq="s2">
        <FlipParts32 seq="s2" parts={FLIP_S2} onDone={() => setDone(true)} />
        <Gate id="s2" done={done} />
      </Lab32>
    </StepStack>
  );
}

// ---------- s3: have أم has ----------
function S3() {
  const [done, setDone] = useState(false);
  const items = SUBJECTS_S3.map((s) => ({ text: s.en, bucket: s.bucket, why: `${s.en} ← ${s.bucket === 0 ? "have" : "has"}` }));
  return (
    <StepStack id="s3">
      <Lab32 emoji="👥" label="HAVE OR HAS" ar="الفاعل يحدد have أو has" seq="s3">
        <SortBuckets32 seq="s3" items={items}
          buckets={[{ label: "🌊 have — I / You / We / They", tone: "border-[#a9dcea] bg-[#f2fbfd]" }, { label: "🌊 has — He / She / It", tone: "border-[#c6c2f6] bg-[#f7f6ff]" }]}
          itemLabel="صناديق have و has" onDone={() => setDone(true)} />
        <Gate id="s3" done={done} />
      </Lab32>
    </StepStack>
  );
}

// ---------- s4: تيّار المدة ----------
function S4() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s4">
      <Lab32 emoji="🌊" label="THE DURATION STREAM" ar="متى نستخدمه؟" seq="s4">
        <RibbonMaker32 seq="s4" activities={RIBBON_S4.activities} maxHours={RIBBON_S4.maxHours}
          model={RIBBON_S4.model} modelAr={RIBBON_S4.modelAr} onDone={() => setDone(true)} />
        <Gate id="s4" done={done} />
      </Lab32>
    </StepStack>
  );
}

// ---------- s5 / s6 / s7 / s8 ----------
function S5() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s5">
      <Lab32 emoji="📏" label="FOR = DURATION" ar="المسطرة: كم استمر؟" seq="s5">
        <SlotPick32 seq="s5" rounds={FOR_ROUNDS_S5} variant="ruler" onDone={() => setDone(true)} />
        <Gate id="s5" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S6() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s6">
      <Lab32 emoji="🚩" label="SINCE = START POINT" ar="العلامة: منذ متى؟" seq="s6">
        <SlotPick32 seq="s6" rounds={SINCE_ROUNDS_S6} variant="flag" onDone={() => setDone(true)} />
        <Gate id="s6" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S7() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s7">
      <Lab32 emoji="⚖️" label="FOR OR SINCE?" ar="صنّف العبارة" seq="s7">
        <SortBuckets32 seq="s7" items={FORSINCE_S7.map((f) => ({ text: f.en, bucket: f.bucket, why: f.why }))}
          buckets={[{ label: "📏 for ← مدة (كم استمر؟)", tone: "border-[#f0d99b] bg-[#fffdf6]" }, { label: "🚩 since ← نقطة بداية (منذ متى؟)", tone: "border-[#a9dcea] bg-[#f7fdff]" }]}
          itemLabel="ميزان for و since" onDone={() => setDone(true)} />
        <Gate id="s7" done={done} />
      </Lab32>
    </StepStack>
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
    <StepStack id="s8">
      <Lab32 emoji="❓" label="HOW LONG?" ar="ابنِ السؤال ثم أجب" seq="s8">
        <div className="space-y-3">
          <BlockBuilder32 seq="s8" rounds={[HOWLONG_S8.question]} onDone={() => setQ(true)} />
          {qDone && <PerRow32 seq="s8" rows={rows} labels={["جواب ١", "جواب ٢"]} onDone={() => setR(true)} />}
          <Gate id="s8" done={qDone && rDone} />
        </div>
      </Lab32>
    </StepStack>
  );
}

// ---------- s9 / s10 / s11 / s12 ----------
function S9() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s9">
      <Lab32 emoji="🚫" label="NEGATIVE" ar="have/has + not + been + V-ing" seq="s9">
        <BlockBuilder32 seq="s9" formula="Subject + have/has + not + been + verb-ing" rounds={[NEG_ROUND_S9]} onDone={() => setDone(true)} />
        <Gate id="s9" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S10() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s10">
      <Lab32 emoji="❔" label="QUESTIONS" ar="have/has ← الفاعل ← been ← V-ing" seq="s10">
        <BlockBuilder32 seq="s10" formula="Have/Has + subject + been + verb-ing?" rounds={QUESTION_ROUNDS_S10} onDone={() => setDone(true)} />
        <Gate id="s10" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S11() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s11">
      <Lab32 emoji="✂️" label="SHORT ANSWERS" ar="انتبه للفخ" seq="s11">
        <PerRow32 seq="s11" rows={SHORT_ROWS_S11} onDone={() => setDone(true)} />
        <Gate id="s11" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S12() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = WH_ROWS_S12.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <StepStack id="s12">
      <Lab32 emoji="🔎" label="WH QUESTIONS" ar="ما أداة السؤال؟" seq="s12">
        <PerRow32 seq="s12" rows={rows} onDone={() => setDone(true)} />
        <Gate id="s12" done={done} />
      </Lab32>
    </StepStack>
  );
}

// ---------- s13 / s14 / s15 / s16 / s17 / s18 ----------
function S13() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s13">
      <Lab32 emoji="👣" label="THE TRAIL OF TRACES" ar="الدليل الآن ← السياق ← الجملة" seq="s13">
        <EvidenceCases32 seq="s13" cases={EVIDENCE_S13} onDone={() => setDone(true)} />
        <Gate id="s13" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S14() {
  const [lensDone, setLensDone] = useState(false);
  const [rowsDone, setRowsDone] = useState(false);
  return (
    <StepStack id="s14">
      <Lab32 emoji="🎨" label="RESULT vs ACTIVITY" ar="العدستان على المشهد نفسه" seq="s14">
        <div className="space-y-3">
          <LensStage32 seq="s14" pairs={LENS_S14} axis={LENS_AXIS_32} onBothSeen={() => setLensDone(true)} />
          <div className="l32-card l32-card-indigo p-3">
            <p className="mb-1.5 text-xs font-black text-[#312a8f]"><Rich text="مثال المصدر المؤسِّس (§14) — نفس الغرفة، عدستان:" /></p>
            <div dir="ltr" className="ltr-row space-y-1">
              <p><En className="text-base font-black text-[#312a8f]">{CANVAS_S14.result.en}</En></p>
              <p><En className="text-base font-black text-[#0b5f77]">{CANVAS_S14.activity.en}</En></p>
            </div>
            <p className="mt-1 text-sm font-bold text-[#3c4670]"><Rich text={`${CANVAS_S14.result.ar} · أما الثانية: ${CANVAS_S14.activity.ar}`} /></p>
          </div>
          {lensDone && (
            <PerRow32 seq="s14" labels={["١", "٢"]} onDone={() => setRowsDone(true)} rows={[
              { stem: "الجدار مكتمل الطلاء بالكامل — أي عدسة؟", opts: ["النتيجة — Present Perfect", "النشاط — Present Perfect Continuous"], answer: 0, why: "المصدر: I have painted the room — التركيز على الإنجاز." },
              { stem: "الفرشاة ما زالت تتحرك على الجدار — أي عدسة؟", opts: ["النتيجة — Present Perfect", "النشاط — Present Perfect Continuous"], answer: 1, why: "المصدر: I have been painting the room — التركيز على النشاط." },
            ]} />
          )}
          <Gate id="s14" done={lensDone && rowsDone} />
        </div>
      </Lab32>
    </StepStack>
  );
}

function S15() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s15">
      <Lab32 emoji="🚪" label="TWO DOORS" ar="بابان: النتيجة ← PP · النشاط ← PPC" seq="s15">
        <div className="space-y-3">
          <LensAxis32 compact />
          <SortBuckets32 seq="s15" items={DOORS_S15}
            buckets={[{ label: "🏆 النتيجة ← Present Perfect", tone: "border-[#c6c2f6] bg-[#f7f6ff]" }, { label: "🎥 النشاط / المدة ← Present Perfect Continuous", tone: "border-[#a9dcea] bg-[#f2fbfd]" }]}
            itemLabel="بابا الزمن" onDone={() => setDone(true)} />
          <Gate id="s15" done={done} />
        </div>
      </Lab32>
    </StepStack>
  );
}

function S16() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = SPEAKERS_S16.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <StepStack id="s16">
      <Lab32 emoji="🗣️" label="TWO SPEAKERS" ar="أي زاوية تقصدها الجملة؟" seq="s16">
        <PerRow32 seq="s16" rows={rows} labels={["A", "B"]} onDone={() => setDone(true)} />
        <Gate id="s16" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S17() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = ANOTHER_S17.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <StepStack id="s17">
      <Lab32 emoji="🖼️" label="ANOTHER EXAMPLE" ar="لوحات وبعد الظهر" seq="s17">
        <PerRow32 seq="s17" rows={rows} onDone={() => setDone(true)} />
        <Gate id="s17" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S18() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s18">
      <Lab32 emoji="🏃" label="SAME SENTENCE" ar="الواقع يتغيّر، والجملة لا" seq="s18">
        <StillRunning32 seq="s18" en={STILL_S18.en} states={STILL_S18.states} note={PLATFORM_NOTE_S18} onDone={() => setDone(true)} />
        <Gate id="s18" done={done} />
      </Lab32>
    </StepStack>
  );
}

// ---------- s19 / s20 / s21 / s22 / s23 ----------
function S19() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s19">
      <Lab32 emoji="🔑" label="KEYWORDS" ar="اكشف الكلمات" seq="s19">
        <ExploreGrid32 seq="s19" items={KEYWORDS_S19} onDone={() => setDone(true)} />
        <Gate id="s19" done={done} />
      </Lab32>
    </StepStack>
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
    <StepStack id="s20">
      <Lab32 emoji="⚠️" label="CUE WORDS" ar="الكلمة وحدها لا تكفي" seq="s20">
        <PerRow32 seq="s20" rows={rows} onDone={() => setDone(true)} />
        <Gate id="s20" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S21() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = PAIRS_S21.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <StepStack id="s21">
      <Lab32 emoji="🧩" label="PAIRS" ar="أي جملة تقصد هذا التركيز؟" seq="s21">
        <PerRow32 seq="s21" rows={rows} onDone={() => setDone(true)} />
        <Gate id="s21" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S22() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = COUNT_ROWS_S22.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <StepStack id="s22">
      <Lab32 emoji="🔢" label="COUNT OR ACTIVITY" ar="عدد مكتمل أم نشاط ومدة؟" seq="s22">
        <div className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="l32-card l32-card-indigo p-3">
              <p className="l32-h text-sm"><Rich text="🏆 عدد مكتمل" /></p>
              <div dir="ltr" className="ltr-row mt-1"><En className="text-base font-bold text-[#312a8f]">five emails</En></div>
              <p className="mt-0.5 text-xs font-bold text-[#46507f]"><Rich text="← Present Perfect" /></p>
            </div>
            <div className="l32-card l32-card-aqua p-3">
              <p className="l32-h text-sm"><Rich text="🎥 نشاط ومدة" /></p>
              <div dir="ltr" className="ltr-row mt-1"><En className="text-base font-bold text-[#0b5f77]">all morning</En></div>
              <p className="mt-0.5 text-xs font-bold text-[#46507f]"><Rich text="← Present Perfect Continuous" /></p>
            </div>
          </div>
          <PerRow32 seq="s22" rows={rows} onDone={() => setDone(true)} />
          <Gate id="s22" done={done} />
        </div>
      </Lab32>
    </StepStack>
  );
}

function S23() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s23">
      <Lab32 emoji="🚧" label="THE STATIVE GATE" ar="بوابة الأفعال الحالية" seq="s23">
        <StativeGate32 seq="s23" verbs={STATIVE_S23} onDone={() => setDone(true)} />
        <Gate id="s23" done={done} />
      </Lab32>
    </StepStack>
  );
}

// ---------- s24 / s25 / s26 (نقطة المرجع) ----------
function S24() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s24">
      <Lab32 emoji="🕰️" label="REFERENCE POINT" ar="مقارنة مع Past Continuous" seq="s24">
        <ReferenceRail32 seq="s24" snaps={RAIL_S24} compare={TENSE_MAP_S24} onDone={() => setDone(true)} />
        <Gate id="s24" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S25() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s25">
      <Lab32 emoji="📞" label="REFERENCE POINT" ar="مقارنة مع Past Perfect Continuous" seq="s25">
        <ReferenceRail32 seq="s25" snaps={RAIL_S25} compare={TENSE_MAP_S25} onDone={() => setDone(true)} />
        <Gate id="s25" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S26() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s26">
      <Lab32 emoji="🗺️" label="THE BIG TIMELINE" ar="الخريطة الزمنية الكبرى" seq="s26">
        <ReferenceRail32 seq="s26" snaps={RAIL_S26} compare={TENSE_MAP_S26} onDone={() => setDone(true)} />
        <Gate id="s26" done={done} />
      </Lab32>
      <div className="l32-card p-3">
        <p className="l32-h mb-2 text-sm"><Rich text="🧭 الأزمنة الثلاثة بلا خلط — الفرق الوحيد هو موضع نقطة المرجع:" /></p>
        <TenseCompare32 rows={TENSE_MAP_S26} />
      </div>
    </StepStack>
  );
}

// ---------- s27 / s28 / s29 / s30 / s31 ----------
function S27() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s27">
      <Lab32 emoji="🕵️" label="GRAMMAR DETECTIVE" ar="ثمانية ملفات: صيد الخطأ ثم الإصلاح" seq="s27">
        <TapFix32 seq="s27" items={DETECTIVE_S27} onDone={() => setDone(true)} />
        <Gate id="s27" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S28() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s28">
      <Lab32 emoji="🎯" label="CHOICE CHALLENGE" ar="اكتب الزمن الصحيح" seq="s28">
        <TypedFill32 seq="s28" items={TYPED_S28.map((t) => ({ prompt: t.prompt, hint: t.hint, accept: t.accept, why: t.why }))} onDone={() => setDone(true)} />
        <Gate id="s28" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S29() {
  const [done, setDone] = useState(false);
  const rows: Row32[] = BIKE_S29.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <StepStack id="s29">
      <Lab32 emoji="🚲" label="SAME VERB, DIFFERENT MEANING" ar="هل انتهى الأمر؟" seq="s29">
        <PerRow32 seq="s29" rows={rows} onDone={() => setDone(true)} />
        <Gate id="s29" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S30() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s30">
      <Lab32 emoji="🎬" label="MEANING SCENE" ar="تحدي المعنى: أثر النشاط أم النتيجة؟" seq="s30">
        <EvidenceCases32 seq="s30" cases={SCENE_S30} onDone={() => setDone(true)} />
        <Gate id="s30" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S31() {
  const [aDone, setA] = useState(false);
  const [bDone, setB] = useState(false);
  const rows: Row32[] = FORSINCE_ROWS_S31.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
  return (
    <StepStack id="s31">
      <Lab32 emoji="🔧" label="FIX IT" ar="since مع المدة ← for" seq="s31">
        <div className="space-y-3">
          <TapFix32 seq="s31" items={[FIX_S31]} onDone={() => setA(true)} />
          <PerRow32 seq="s31" rows={rows} onDone={() => setB(true)} />
          <Gate id="s31" done={aDone && bDone} />
        </div>
      </Lab32>
    </StepStack>
  );
}

// ---------- s32 / s33 / s34 / s35 / s36 ----------
function S32() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s32">
      <Lab32 emoji="🐉" label="BOSS CHALLENGE" ar="اختر الزمن لكل ضربة" seq="s32">
        <Boss32 seq="s32" items={BOSS_ITEMS_S32} gears={BOSS_GEARS_S32} onDone={() => setDone(true)} />
        <Gate id="s32" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S33() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s33">
      <Lab32 emoji="📖" label="FINAL IQ200 · ADAM" ar="لوّن الزمن لكل عبارة" seq="s33">
        <VerbTap32 seq="s33" parts={ADAM_TEXT_S33.parts} answers={ADAM_TEXT_S33.answers} why={ADAM_TEXT_S33.why} onDone={() => setDone(true)} />
        <Gate id="s33" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S34() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s34">
      <Lab32 emoji="🏁" label="FINAL BOSS · MAYA" ar="اكتب كل فعل بالزمن الصحيح" seq="s34">
        <TypedFill32 seq="s34" items={MAYA_S34.map((m) => ({ prompt: m.prompt, accept: m.accept, why: m.why }))} onDone={() => setDone(true)} />
        <Gate id="s34" done={done} />
      </Lab32>
    </StepStack>
  );
}

function S35() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s35">
      <Lab32 emoji="🥇" label="GOLDEN RULE" ar="الشكل ← النمط ← الفرز" seq="s35">
        <div className="space-y-3">
          <LensAxis32 />
          <SortBuckets32 seq="s35" items={GOLDEN_S35}
            buckets={[{ label: "🏆 have/has + V3 ← نتيجة / إنجاز", tone: "border-[#c6c2f6] bg-[#f7f6ff]" }, { label: "🎥 have/has + been + V-ing ← نشاط / مدة", tone: "border-[#a9dcea] bg-[#f2fbfd]" }]}
            itemLabel="نمطا الحاضر التام" onDone={() => setDone(true)} />
          <Gate id="s35" done={done} />
        </div>
      </Lab32>
    </StepStack>
  );
}

function S36() {
  const [done, setDone] = useState(false);
  return (
    <StepStack id="s36">
      <Lab32 emoji="🗺️" label="THE MAP" ar="أربعة تروس للحاضر" seq="s36">
        <GearMap32 seq="s36" gears={GEARS_S36} onDone={() => setDone(true)} />
        <Gate id="s36" done={done} />
      </Lab32>
    </StepStack>
  );
}

// ---------- الملخص والخاتمة ----------
function Summary() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    const n = new Set(open);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    setOpen(n);
  };
  return (
    <StepStack id="summary">
      <Lab32 emoji="📋" label="SUMMARY" ar="ملخص الدرس 32" seq="summary">
        <div className="space-y-3">
          <div className="l32-card l32-card-indigo p-3 text-center">
            <p className="l32-h text-sm"><Rich text="الصيغة" /></p>
            <div dir="ltr" className="ltr-row mt-1 flex flex-wrap items-center justify-center gap-1.5">
              <span className="l32-slot l32-role-s"><span className="font-en">Subject</span><span className="l32-slot-label" dir="rtl">الفاعل</span></span>
              <span aria-hidden className="font-en text-lg font-black text-[#312a8f]">+</span>
              <span className="l32-slot l32-role-h"><span className="font-en">have/has</span><span className="l32-slot-label" dir="rtl">الرابط بالحاضر</span></span>
              <span aria-hidden className="font-en text-lg font-black text-[#312a8f]">+</span>
              <span className="l32-slot l32-role-b"><span className="font-en">been</span><span className="l32-slot-label" dir="rtl">V3 من be</span></span>
              <span aria-hidden className="font-en text-lg font-black text-[#312a8f]">+</span>
              <span className="l32-slot l32-role-v"><span className="font-en">verb-ing</span><span className="l32-slot-label" dir="rtl">الاستمرار</span></span>
            </div>
          </div>

          <LensAxis32 />

          <div className="l32-card p-3">
            <p className="l32-h mb-2 text-sm"><Rich text="🔥 منظومة الحاضر الأربع — المس كل ترس لتقارن جملة المصدر:" /></p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="أزمنة الحاضر الأربعة في الملخص">
              {FOUR_PRESENT_32.map((g, i) => (
                <button key={g.tense} type="button" onClick={() => toggle(i)} aria-expanded={open.has(i)}
                  className={`l32-tap l32-tap-card ${open.has(i) ? "l32-tap-aqua" : ""} ${FOCUS32}`}>
                  <span aria-hidden className="text-xl">{g.icon}</span>
                  <En className="mt-1 block text-sm font-black">{g.tense}</En>
                  <span className="mt-0.5 block text-xs font-bold text-[#46507f]"><Rich text={g.ar} /></span>
                  {open.has(i) && <span dir="ltr" className="mt-1 block font-en text-xs font-bold text-[#0b5f77]"><En>{g.en}</En></span>}
                </button>
              ))}
            </div>
          </div>

          <Platform32>{"ملخص المنصة: النتيجة ← Present Perfect · النشاط والمدة ← Present Perfect Continuous · for = مدة · since = نقطة بداية · والزمن يتحدد بزاوية النظر لا بكلمة واحدة."}</Platform32>
        </div>
      </Lab32>
    </StepStack>
  );
}

function Closing({ onGoTest }: { onGoTest: () => void }) {
  return (
    <StepStack id="closing">
      <Lab32 emoji="🚀" label="NEXT STEP" ar="الخطوة التالية" seq="closing">
        <div className="space-y-3">
          <StreamTimeline32 start={0.05} live={false} label="الدرس انتهى — والأثر باقٍ"
            traces={["🧠 قاعدة الذهب", "🎥🏆 أربعة أزمنة للحاضر", "📍 نقطة المرجع"]}
            caption="تيّار الدرس وصل إلى NOW: الصيغة، المدة، الأثر، والمقارنة." />
          <p className="text-sm font-bold text-[#3c4670]"><Rich text="أنت الآن جاهز لاختبار الدرس 32: 20 سؤالًا جديدًا. تُكشف الإجابات بعد الإرسال فقط." /></p>
          <button type="button" onClick={onGoTest}
            className={`l32-tap l32-tap-primary px-5 py-3 text-base ${FOCUS32}`}>
            🧪 <Rich text="ابدأ اختبار الدرس 32" />
          </button>
        </div>
      </Lab32>
    </StepStack>
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
