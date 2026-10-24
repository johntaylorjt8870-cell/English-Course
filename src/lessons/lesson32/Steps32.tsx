// ============================================================
// الدرس 32 — جسم الصفحة (Page Body)
//
// كل صفحة تعرض شيئًا واحدًا:
//   • صفحة تفاعل (lab): تمرين حقيقي واحد + شرح قصير من المنصة.
//   • صفحة مصدر (src): نطاق محدد من أسطر المصدر، كما وردت حرفيًا.
//
// لا تُعاد صياغة المصدر هنا. النص يأتي من ledger32 عبر sourceDeck32،
// والتفاعلات تستخدم بيانات المصدر نفسها من data.ts.
//
// كل تفاعل يُنهي نفسه يضع شارة `data-gate-done` (تأكيد إتمام حقيقي)،
// والتدقيق الآلي يستعملها للتأكد من أن التفاعل يعمل فعلًا.
// ============================================================

import { useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import {
  BLOCKS_S1, FLIP_S2, SUBJECTS_S3, RIBBON_S4, FOR_ROUNDS_S5, SINCE_ROUNDS_S6, FORSINCE_S7,
  HOWLONG_S8, NEG_ROUND_S9, QUESTION_ROUNDS_S10, SHORT_ROWS_S11, WH_ROWS_S12, EVIDENCE_S13,
  CANVAS_S14, LENS_S14, LENS_AXIS_32, DOORS_S15, SPEAKERS_S16, ANOTHER_S17, STILL_S18,
  PLATFORM_NOTE_S18, KEYWORDS_S19, CUE_S20, PAIRS_S21, COUNT_ROWS_S22, STATIVE_S23,
  RAIL_S24, RAIL_S25, RAIL_S26, TENSE_MAP_S26, DETECTIVE_S27, TYPED_S28, BIKE_S29, SCENE_S30,
  FIX_S31, FORSINCE_ROWS_S31, BOSS_ITEMS_S32, BOSS_GEARS_S32, ADAM_TEXT_S33, MAYA_S34,
  GOLDEN_S35, GEARS_S36, GOLDEN_DIFF_32, FOUR_PRESENT_32, OBJECTIVES_32, TEACH_32,
} from "./data";
import {
  FOCUS32, Lab32, Platform32, Teach32, SourceDeck32, SourceBadge32, StreamTimeline32,
  BlockBuilder32, FlipParts32, SortBuckets32, SlotPick32, PerRow32, TapFix32, TypedFill32,
  EvidenceCases32, RibbonMaker32, ExploreGrid32, StativeGate32, ReferenceRail32,
  StillRunning32, Boss32, VerbTap32, GearMap32, ObjectivesChecklist32, LensStage32,
  TenseCompare32, type Row32,
} from "./kit32";
import { deckRange32 } from "./sourceDeck32";
import type { Page32 } from "./pages32";

/** شارة إتمام التفاعل — تأكيد حقيقي، بلا أي كشف لنص المصدر. */
function Gate({ id, done, label = "أتممت هذا التفاعل" }: { id: string; done: boolean; label?: string }) {
  if (!done) return null;
  return (
    <p
      data-gate-done={id}
      role="status"
      className="flex items-center gap-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-bold text-emerald-900"
    >
      <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-600 text-xs font-black text-white">
        ✓
      </span>
      <Rich text={`${label} — يمكنك الآن قراءة أمثلة المصدر في الصفحة التالية.`} />
    </p>
  );
}

/** شرح المنصة المختصر أعلى التفاعل (لا يستبدل شرح المصدر). */
function TeachBlock({ sec }: { sec: string }) {
  const items = TEACH_32[sec] ?? [];
  if (items.length === 0) return null;
  return <Teach32 items={items} />;
}

/** محور النتيجة/النشاط — بطاقتان ثابتتان في الدرس كله. */
function LensAxis32({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-2.5 ${compact ? "" : "sm:grid-cols-2"}`}>
      {GOLDEN_DIFF_32.map((g) => {
        const result = g.side === "result";
        return (
          <div
            key={g.tense}
            className={`rounded-2xl border-2 p-3.5 ${result ? "border-indigo-200 bg-indigo-50/60" : "border-cyan-200 bg-cyan-50/60"}`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span aria-hidden className="text-lg">{result ? "🏆" : "🎥"}</span>
              <span dir="ltr" className="font-en text-sm font-extrabold text-slate-900"><En>{g.tense}</En></span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${result ? "bg-indigo-100 text-indigo-800" : "bg-cyan-100 text-cyan-800"}`}>
                <Rich text={g.ar} />
              </span>
            </div>
            <div dir="ltr" className="mt-2">
              <En className="text-lg font-extrabold text-slate-900">{g.en}</En>
            </div>
            <p className="mt-0.5 text-sm font-semibold text-slate-600"><Rich text={g.enAr} /></p>
          </div>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------
// صفحات المصدر
// ------------------------------------------------------------

function CoverPage({ page, onGoTest }: { page: Page32; onGoTest: () => void }) {
  return (
    <div className="space-y-3">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-8">
        <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-cyan-100 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-violet-100 blur-3xl" />
        <div className="relative">
          <div aria-hidden className="text-5xl anim-drift">🌊</div>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-bold text-white">
            <Rich text="الدرس 32" />
            <span className="text-white/40">·</span>
            <span dir="ltr" className="font-en">IQ200</span>
          </div>
          <h1 className="font-head mt-3 text-2xl font-bold leading-tight text-slate-900 md:text-4xl">
            <span dir="ltr" className="font-en block">Present Perfect Continuous</span>
            <span className="mt-1 block text-xl md:text-2xl">المضارع التام المستمر</span>
          </h1>
          <p dir="ltr" className="font-en mt-2 text-sm font-bold text-cyan-800 md:text-base">
            Subject + have/has + been + verb-ing
          </p>
          <div className="mt-4 grid gap-2 text-right sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 px-3 py-2">
              <p className="text-[13px] font-bold text-indigo-900">🏆 النتيجة / الإنجاز</p>
              <p dir="ltr" className="font-en mt-0.5 text-sm font-extrabold text-slate-900">I have painted the room.</p>
            </div>
            <div className="rounded-2xl border-2 border-cyan-200 bg-cyan-50/60 px-3 py-2">
              <p className="text-[13px] font-bold text-cyan-900">🎥 النشاط / المدة</p>
              <p dir="ltr" className="font-en mt-0.5 text-sm font-extrabold text-slate-900">I have been painting the room.</p>
            </div>
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500">
            للتنقل: الأسهم ← → أو الأزرار أسفل الشريحة · صفحة قصيرة واحدة لكل فكرة
          </p>
        </div>
      </section>

      <div className="rounded-3xl border border-slate-200 bg-white p-3.5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <SourceBadge32 src />
          <span className="text-[11px] font-bold text-slate-500"><Rich text="عنوان الدرس كما ورد في المصدر" /></span>
        </div>
        <SourceDeck32 blocks={deckRange32("cover", page.deck)} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { n: "٣٦", t: "قسمًا مرقّمًا", e: "📚" },
          { n: "٥٨٧", t: "سطرًا مصدريًا", e: "📜" },
          { n: "١٦", t: "تمرينًا تفاعليًا", e: "🎯" },
        ].map((s) => (
          <div key={s.t} className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center">
            <div aria-hidden className="text-base">{s.e}</div>
            <div className="font-head text-xl font-black text-slate-900">{s.n}</div>
            <div className="text-[11px] font-bold text-slate-500"><Rich text={s.t} /></div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-white">
        <p className="text-[13px] font-semibold"><Rich text="جاهز؟ ابدأ من أهداف الدرس، ثم جرّب كل تفاعل قبل قراءة أمثلته." /></p>
        <button type="button" onClick={onGoTest} className={`rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/20 ${FOCUS32}`}>
          🧪 <Rich text="اختبار الدرس" />
        </button>
      </div>
    </div>
  );
}

function DeckPage({ page, onGoTest }: { page: Page32; onGoTest: () => void }) {
  if (page.sec === "cover") return <CoverPage page={page} onGoTest={onGoTest} />;
  const blocks = deckRange32(page.sec, page.deck);
  return (
    <div className="space-y-3">
      <SourceDeck32 blocks={blocks} />
      {page.sec === "objectives" && (
        <Platform32>{"الأهداف التسعة هي خريطة الدرس: كل هدف يقابله قسم واحد على الأقل، وكل قسم ينتهي بتفاعل يثبته."}</Platform32>
      )}
      {page.cta === "test" && (
        <div data-lesson-test-cta="20" className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/60 p-4">
          <p className="font-head text-lg font-bold text-slate-900">
            <Rich text="تقييم الدرس — ٢٠ سؤالًا (منفصل عن الاختبار النهائي)" />
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            <Rich text="اختبار قصير على محتوى الدرس 32 وحده، منفصل واختياري — وليس الاختبار النهائي للدورة. الاختبار النهائي (١٥ سؤالًا) يظهر أسفل هذه الصفحة. لا تُكشف الإجابات والشرح إلا بعد الإرسال." />
          </p>
          <button
            type="button"
            onClick={onGoTest}
            className={`mt-3 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 ${FOCUS32}`}
          >
            🧪 <Rich text="ابدأ تقييم الدرس — ٢٠ سؤالًا" />
          </button>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------
// صفحات التفاعل
// ------------------------------------------------------------

function LabShell({
  page,
  emoji,
  label,
  ar,
  children,
}: {
  page: Page32;
  emoji: string;
  label: string;
  ar: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <Lab32 emoji={emoji} label={label} ar={ar} seq={page.id}>
        {children}
      </Lab32>
      <TeachBlock sec={page.sec} />
    </div>
  );
}

function LabPage({ page }: { page: Page32 }) {
  const [done, setDone] = useState(false);
  const finish = () => setDone(true);
  const gate = <Gate id={page.id} done={done} />;

  switch (page.lab) {
    case "objectives":
      return (
        <LabShell page={page} emoji="🎯" label="OBJECTIVES" ar="علّم كل هدف بعد أن تتقنه">
          <ObjectivesChecklist32 items={OBJECTIVES_32.map((o) => ({ n: o.n, text: o.text }))} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "build":
      return (
        <LabShell page={page} emoji="🧱" label="BUILD THE SENTENCE" ar="ابنِ الجملة بالترتيب">
          <BlockBuilder32 seq={page.id} formula="Subject + have/has + been + verb-ing" rounds={BLOCKS_S1} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "flip":
      return (
        <LabShell page={page} emoji="🔍" label="FLIP THE PARTS" ar="اكشف دور كل قطعة">
          <FlipParts32 seq={page.id} parts={FLIP_S2} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "have": {
      const items = SUBJECTS_S3.map((s) => ({
        text: s.en,
        bucket: s.bucket,
        why: `${s.en} ← ${s.bucket === 0 ? "have" : "has"}`,
      }));
      return (
        <LabShell page={page} emoji="👥" label="HAVE OR HAS" ar="الفاعل يحدد have أو has">
          <SortBuckets32
            seq={page.id}
            items={items}
            buckets={[
              { label: "have — I / You / We / They", tone: "border-cyan-200 bg-cyan-50" },
              { label: "has — He / She / It", tone: "border-indigo-200 bg-indigo-50" },
            ]}
            itemLabel="صندوقا have و has"
            onDone={finish}
          />
          {gate}
        </LabShell>
      );
    }

    case "stream":
      return (
        <LabShell page={page} emoji="🌊" label="THE DURATION STREAM" ar="متى نستخدمه؟">
          <RibbonMaker32
            seq={page.id}
            activities={RIBBON_S4.activities}
            maxHours={RIBBON_S4.maxHours}
            model={RIBBON_S4.model}
            modelAr={RIBBON_S4.modelAr}
            onDone={finish}
          />
          {gate}
        </LabShell>
      );

    case "for":
      return (
        <LabShell page={page} emoji="📏" label="FOR = DURATION" ar="المسطرة: كم استمر؟">
          <SlotPick32 seq={page.id} rounds={FOR_ROUNDS_S5} variant="ruler" onDone={finish} />
          {gate}
        </LabShell>
      );

    case "since":
      return (
        <LabShell page={page} emoji="🚩" label="SINCE = START POINT" ar="العلامة: منذ متى؟">
          <SlotPick32 seq={page.id} rounds={SINCE_ROUNDS_S6} variant="flag" onDone={finish} />
          {gate}
        </LabShell>
      );

    case "forsince":
      return (
        <LabShell page={page} emoji="⚖️" label="FOR OR SINCE?" ar="صنّف العبارة">
          <SortBuckets32
            seq={page.id}
            items={FORSINCE_S7.map((f) => ({ text: f.en, bucket: f.bucket, why: f.why }))}
            buckets={[
              { label: "for ← مدة (كم استمر؟)", tone: "border-amber-200 bg-amber-50" },
              { label: "since ← نقطة بداية (منذ متى؟)", tone: "border-cyan-200 bg-cyan-50" },
            ]}
            itemLabel="ميزان for و since"
            onDone={finish}
          />
          {gate}
        </LabShell>
      );

    case "howlong": {
      const rows: Row32[] = HOWLONG_S8.replies.map((r) => ({
        stem: r.stem,
        opts: r.options.map((o) => o.text),
        answer: r.options.findIndex((o) => o.ok),
        why: r.options.find((o) => o.ok)?.why ?? "",
      }));
      const [qDone, setQ] = useState(false);
      return (
        <LabShell page={page} emoji="❓" label="HOW LONG?" ar="ابنِ السؤال ثم أجب">
          <div className="space-y-3">
            <BlockBuilder32 seq={`${page.id}-q`} rounds={[HOWLONG_S8.question]} onDone={() => setQ(true)} />
            {qDone && <PerRow32 seq={`${page.id}-r`} rows={rows} labels={["جواب ١", "جواب ٢"]} onDone={finish} />}
            {gate}
          </div>
        </LabShell>
      );
    }

    case "neg":
      return (
        <LabShell page={page} emoji="🚫" label="NEGATIVE" ar="have/has + not + been + verb-ing">
          <BlockBuilder32 seq={page.id} formula="Subject + have/has + not + been + verb-ing" rounds={[NEG_ROUND_S9]} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "questions":
      return (
        <LabShell page={page} emoji="❔" label="QUESTIONS" ar="have/has ← الفاعل ← been ← V-ing">
          <BlockBuilder32 seq={page.id} formula="Have/Has + subject + been + verb-ing?" rounds={QUESTION_ROUNDS_S10} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "short":
      return (
        <LabShell page={page} emoji="✂️" label="SHORT ANSWERS" ar="انتبه للفخ">
          <PerRow32 seq={page.id} rows={SHORT_ROWS_S11} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "wh": {
      const rows: Row32[] = WH_ROWS_S12.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
      return (
        <LabShell page={page} emoji="🔎" label="WH QUESTIONS" ar="ما أداة السؤال؟">
          <PerRow32 seq={page.id} rows={rows} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "evidence":
      return (
        <LabShell page={page} emoji="👣" label="THE TRAIL OF TRACES" ar="الدليل الآن ← السياق ← الجملة">
          <EvidenceCases32 seq={page.id} cases={EVIDENCE_S13} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "lens": {
      const [lensDone, setLensDone] = useState(false);
      const [rowsDone, setRowsDone] = useState(false);
      return (
        <LabShell page={page} emoji="🎨" label="RESULT vs ACTIVITY" ar="عدستان على الغرفة نفسها">
          <div className="space-y-3">
            <LensStage32 seq={page.id} pairs={LENS_S14} axis={LENS_AXIS_32} onBothSeen={() => setLensDone(true)} />
            {lensDone && (
              <PerRow32
                seq={`${page.id}-rows`}
                labels={["١", "٢"]}
                onDone={() => setRowsDone(true)}
                rows={[
                  {
                    stem: "الجدار مكتمل الطلاء بالكامل — أي عدسة؟",
                    opts: ["النتيجة — Present Perfect", "النشاط — Present Perfect Continuous"],
                    answer: 0,
                    why: "المصدر قسم 14: I have painted the room — التركيز على الإنجاز.",
                  },
                  {
                    stem: "الفرشاة ما زالت تتحرك على الجدار — أي عدسة؟",
                    opts: ["النتيجة — Present Perfect", "النشاط — Present Perfect Continuous"],
                    answer: 1,
                    why: "المصدر قسم 14: I have been painting the room — التركيز على النشاط.",
                  },
                ]}
              />
            )}
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-3">
              <p className="text-xs font-bold text-indigo-900">
                <Rich text="مثال المصدر المؤسِّس (قسم 14) — نفس الغرفة، عدستان:" />
              </p>
              <div dir="ltr" className="mt-1 space-y-0.5">
                <p><En className="text-base font-extrabold text-indigo-900">{CANVAS_S14.result.en}</En></p>
                <p><En className="text-base font-extrabold text-cyan-900">{CANVAS_S14.activity.en}</En></p>
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                <Rich text={`${CANVAS_S14.result.ar} · أما الثانية: ${CANVAS_S14.activity.ar}`} />
              </p>
            </div>
            <Gate id={page.id} done={lensDone && rowsDone} />
          </div>
        </LabShell>
      );
    }

    case "doors":
      return (
        <LabShell page={page} emoji="🚪" label="TWO DOORS" ar="النتيجة أم النشاط؟">
          <div className="space-y-3">
            <LensAxis32 compact />
            <SortBuckets32
              seq={page.id}
              items={DOORS_S15}
              buckets={[
                { label: "النتيجة ← Present Perfect", tone: "border-indigo-200 bg-indigo-50" },
                { label: "النشاط / المدة ← Present Perfect Continuous", tone: "border-cyan-200 bg-cyan-50" },
              ]}
              itemLabel="بابا الزمن"
              onDone={finish}
            />
            {gate}
          </div>
        </LabShell>
      );

    case "speakers": {
      const rows: Row32[] = SPEAKERS_S16.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
      return (
        <LabShell page={page} emoji="🗣️" label="TWO SPEAKERS" ar="أي زاوية تقصدها الجملة؟">
          <PerRow32 seq={page.id} rows={rows} labels={["A", "B"]} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "another": {
      const rows: Row32[] = ANOTHER_S17.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
      return (
        <LabShell page={page} emoji="🖼️" label="ANOTHER EXAMPLE" ar="لوحات وبعد الظهر">
          <PerRow32 seq={page.id} rows={rows} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "still":
      return (
        <LabShell page={page} emoji="🏃" label="SAME SENTENCE" ar="الواقع يتغيّر، والجملة لا">
          <StillRunning32 seq={page.id} en={STILL_S18.en} states={STILL_S18.states} note={PLATFORM_NOTE_S18} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "keywords":
      return (
        <LabShell page={page} emoji="🔑" label="KEYWORDS" ar="افتح كل كلمة">
          <ExploreGrid32 seq={page.id} items={KEYWORDS_S19} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "cue": {
      const rows: Row32[] = CUE_S20.map((c) => ({
        stem: `${c.en}  (${c.word})`,
        opts: ["Present Perfect", "Present Perfect Continuous"],
        answer: c.tense === "PP" ? 0 : 1,
        why:
          c.tense === "PP"
            ? "الكلمة وحدها لا تكفي: هنا الإنجاز واضح ← Present Perfect (المصدر قسم 20)."
            : "الكلمة وحدها لا تكفي: هنا النشاط الممتد ← Present Perfect Continuous (المصدر قسم 20).",
      }));
      return (
        <LabShell page={page} emoji="⚠️" label="CUE WORDS" ar="الكلمة وحدها لا تكفي">
          <PerRow32 seq={page.id} rows={rows} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "pairs": {
      const rows: Row32[] = PAIRS_S21.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
      return (
        <LabShell page={page} emoji="🧩" label="PAIRS" ar="أي جملة تقصد هذا التركيز؟">
          <PerRow32 seq={page.id} rows={rows} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "count": {
      const rows: Row32[] = COUNT_ROWS_S22.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
      return (
        <LabShell page={page} emoji="🔢" label="COUNT OR ACTIVITY" ar="عدد مكتمل أم نشاط ومدة؟">
          <div className="space-y-3">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-3">
                <p className="text-sm font-bold text-indigo-900"><Rich text="🏆 عدد مكتمل" /></p>
                <div dir="ltr" className="mt-1"><En className="text-base font-extrabold text-indigo-900">five emails</En></div>
                <p className="mt-0.5 text-xs font-bold text-slate-600">← Present Perfect</p>
              </div>
              <div className="rounded-2xl border-2 border-cyan-200 bg-cyan-50/60 p-3">
                <p className="text-sm font-bold text-cyan-900"><Rich text="🎥 نشاط ومدة" /></p>
                <div dir="ltr" className="mt-1"><En className="text-base font-extrabold text-cyan-900">all morning</En></div>
                <p className="mt-0.5 text-xs font-bold text-slate-600">← Present Perfect Continuous</p>
              </div>
            </div>
            <PerRow32 seq={page.id} rows={rows} onDone={finish} />
            {gate}
          </div>
        </LabShell>
      );
    }

    case "stative":
      return (
        <LabShell page={page} emoji="🚧" label="THE STATIVE GATE" ar="بوابة أفعال الحالة">
          <StativeGate32 seq={page.id} verbs={STATIVE_S23} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "rail24":
      return (
        <LabShell page={page} emoji="🕰️" label="REFERENCE POINT" ar="مقارنة مع Past Continuous">
          <ReferenceRail32 seq={page.id} snaps={RAIL_S24} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "rail25":
      return (
        <LabShell page={page} emoji="📞" label="REFERENCE POINT" ar="مقارنة مع Past Perfect Continuous">
          <ReferenceRail32 seq={page.id} snaps={RAIL_S25} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "rail26":
      return (
        <LabShell page={page} emoji="🗺️" label="THE BIG TIMELINE" ar="الخريطة الزمنية الكبرى">
          <div className="space-y-3">
            <ReferenceRail32 seq={page.id} snaps={RAIL_S26} onDone={finish} />
            <TenseCompare32 rows={TENSE_MAP_S26} />
            {gate}
          </div>
        </LabShell>
      );

    case "detective": {
      const [from, to] = page.part ?? [0, DETECTIVE_S27.length];
      const items = DETECTIVE_S27.slice(from, to);
      return (
        <LabShell page={page} emoji="🕵️" label="GRAMMAR DETECTIVE" ar="صيد الخطأ ثم الإصلاح">
          <TapFix32 seq={page.id} items={items} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "typed": {
      const [from, to] = page.part ?? [0, TYPED_S28.length];
      const items = TYPED_S28.slice(from, to).map((t) => ({
        prompt: t.prompt,
        hint: t.hint,
        accept: t.accept,
        why: t.why,
      }));
      return (
        <LabShell page={page} emoji="🎯" label="CHOICE CHALLENGE" ar="اكتب الزمن الصحيح">
          <TypedFill32 seq={page.id} items={items} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "bike": {
      const rows: Row32[] = BIKE_S29.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
      return (
        <LabShell page={page} emoji="🚲" label="SAME VERB, DIFFERENT MEANING" ar="هل انتهى الأمر؟">
          <PerRow32 seq={page.id} rows={rows} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "scene":
      return (
        <LabShell page={page} emoji="🎬" label="MEANING SCENE" ar="أثر النشاط أم النتيجة؟">
          <EvidenceCases32 seq={page.id} cases={SCENE_S30} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "fix": {
      const [aDone, setA] = useState(false);
      const [bDone, setB] = useState(false);
      const rows: Row32[] = FORSINCE_ROWS_S31.map((r) => ({ stem: r.stem, opts: r.opts, answer: r.answer, why: r.why }));
      return (
        <LabShell page={page} emoji="🔧" label="FIX IT" ar="since مع المدة ← for">
          <div className="space-y-3">
            <TapFix32 seq={`${page.id}-fix`} items={[FIX_S31]} onDone={() => setA(true)} />
            <PerRow32 seq={`${page.id}-rows`} rows={rows} onDone={() => setB(true)} />
            <Gate id={page.id} done={aDone && bDone} />
          </div>
        </LabShell>
      );
    }

    case "boss": {
      const [from, to] = page.part ?? [0, BOSS_ITEMS_S32.length];
      const items = BOSS_ITEMS_S32.slice(from, to);
      return (
        <LabShell page={page} emoji="🐉" label="BOSS CHALLENGE" ar="اختر الزمن لكل ضربة">
          <Boss32 seq={page.id} items={items} gears={BOSS_GEARS_S32} onDone={finish} />
          {gate}
        </LabShell>
      );
    }

    case "adam":
      return (
        <LabShell page={page} emoji="📖" label="FINAL IQ200 · ADAM" ar="لوّن الزمن لكل عبارة">
          <VerbTap32 seq={page.id} parts={ADAM_TEXT_S33.parts} answers={ADAM_TEXT_S33.answers} why={ADAM_TEXT_S33.why} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "maya":
      return (
        <LabShell page={page} emoji="🏁" label="FINAL BOSS · MAYA" ar="اكتب كل فعل بالزمن الصحيح">
          <TypedFill32
            seq={page.id}
            items={MAYA_S34.map((m) => ({ prompt: m.prompt, accept: m.accept, why: m.why }))}
            onDone={finish}
          />
          {gate}
        </LabShell>
      );

    case "golden":
      return (
        <LabShell page={page} emoji="🥇" label="GOLDEN RULE" ar="الشكل ← النمط ← الفرز">
          <div className="space-y-3">
            <LensAxis32 />
            <SortBuckets32
              seq={page.id}
              items={GOLDEN_S35}
              buckets={[
                { label: "have/has + V3 ← نتيجة / إنجاز", tone: "border-indigo-200 bg-indigo-50" },
                { label: "have/has + been + V-ing ← نشاط / مدة", tone: "border-cyan-200 bg-cyan-50" },
              ]}
              itemLabel="نمطا الحاضر التام"
              onDone={finish}
            />
            {gate}
          </div>
        </LabShell>
      );

    case "gears":
      return (
        <LabShell page={page} emoji="🗺️" label="THE MAP" ar="أربعة تروس للحاضر">
          <GearMap32 seq={page.id} gears={GEARS_S36} onDone={finish} />
          {gate}
        </LabShell>
      );

    case "present-gears":
      return <SummaryPage page={page} />;

    default:
      return null;
  }
}

/** الملخص: الصيغة + محور النتيجة/النشاط + تروس الحاضر الأربعة (تفاعل حقيقي). */
function SummaryPage({ page }: { page: Page32 }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const toggle = (i: number) => {
    const next = new Set(open);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setOpen(next);
    if (next.size === FOUR_PRESENT_32.length) setDone(true);
  };
  return (
    <div className="space-y-3">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/50 p-4 text-center">
        <p className="font-head text-sm font-bold text-indigo-900"><Rich text="الصيغة" /></p>
        <div dir="ltr" className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          <span className="rounded-xl border-2 border-slate-300 bg-white px-3 py-1.5">
            <span className="font-en text-base font-extrabold text-slate-900">Subject</span>
            <span className="mt-0.5 block text-[11px] font-bold text-slate-500">الفاعل</span>
          </span>
          <span aria-hidden className="font-en text-lg font-black text-slate-300">+</span>
          <span className="rounded-xl border-2 border-indigo-300 bg-indigo-50 px-3 py-1.5">
            <span className="font-en text-base font-extrabold text-indigo-900">have/has</span>
            <span className="mt-0.5 block text-[11px] font-bold text-indigo-700">الرابط بالحاضر</span>
          </span>
          <span aria-hidden className="font-en text-lg font-black text-slate-300">+</span>
          <span className="rounded-xl border-2 border-violet-300 bg-violet-50 px-3 py-1.5">
            <span className="font-en text-base font-extrabold text-violet-900">been</span>
            <span className="mt-0.5 block text-[11px] font-bold text-violet-700">V3 من be</span>
          </span>
          <span aria-hidden className="font-en text-lg font-black text-slate-300">+</span>
          <span className="rounded-xl border-2 border-cyan-300 bg-cyan-50 px-3 py-1.5">
            <span className="font-en text-base font-extrabold text-cyan-900">verb-ing</span>
            <span className="mt-0.5 block text-[11px] font-bold text-cyan-700">الاستمرار</span>
          </span>
        </div>
      </div>

      <LensAxis32 />

      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <p className="font-head mb-2 text-sm font-bold text-slate-900">
          <Rich text="منظومة الحاضر الأربع — المس كل ترس لتقارن جملة المصدر:" />
        </p>
        <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="تروس الحاضر">
          {FOUR_PRESENT_32.map((g, i) => (
            <button
              key={g.tense}
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={open.has(i)}
              className={`rounded-2xl border-2 p-3 text-right transition ${
                open.has(i) ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-200"
              } ${FOCUS32}`}
            >
              <span aria-hidden className="text-xl">{g.icon}</span>
              <En className="mt-1 block text-sm font-extrabold text-slate-900">{g.tense}</En>
              <span className="mt-0.5 block text-xs font-bold text-slate-600"><Rich text={g.ar} /></span>
              {open.has(i) && (
                <span dir="ltr" className="mt-1.5 block rounded-lg bg-white px-2 py-1">
                  <En className="text-xs font-bold text-slate-800">{g.en}</En>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Gate id={page.id} done={done} label="فتحت التروس الأربعة" />
      <Platform32>
        {"ملخص المنصة: النتيجة ← Present Perfect · النشاط والمدة ← Present Perfect Continuous · for = مدة · since = نقطة بداية · والزمن يتحدد بزاوية النظر لا بكلمة واحدة."}
      </Platform32>
      <TeachBlock sec={page.sec} />
    </div>
  );
}

/** جسم الصفحة: تفاعل أو نص مصدر — لا الاثنان معًا. */
export function StepBody32({ page, onGoTest }: { page: Page32; onGoTest: () => void }) {
  if (page.lab) return <LabPage page={page} />;
  return <DeckPage page={page} onGoTest={onGoTest} />;
}

/** عنوان الصفحة المختصر للشريط الجانبي. */
export function navLabel32(title: string): string {
  return title.length > 46 ? `${title.slice(0, 44)}…` : title;
}

/** بيانات وصفية للتدقيق: معرّفات الصفحات التي تحمل تفاعلًا. */
export const LAB_PAGE_IDS_32 = (pages: Page32[]) => pages.filter((p) => p.lab).map((p) => p.id);
