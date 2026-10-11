// ============================================================
// Steps33 — عارض خطوات الدرس 33 (26 خطوة 1:1 مع ledger33)
// كل خطوة: لوحة محتوى من المصدر + تفاعل ينتهي بقفل الإنجاز
// (data-gate-done="sN" يظهر فقط بعد نجاح محرّك التفاعل).
// لا تُعرض أي إجابة قبل المحاولة الناجحة (لا درجة ولا ✓ قبل الفعل).
// ============================================================

import { type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { SOURCE_SECTIONS_33, type SourceOrder33 } from "./ledger33";
import {
  COVER_GATES_33,
  OBJECTIVES_33,
  MAP_TENSES_33,
  BUILD_ROWS_S2,
  NORA_ROWS_S3,
  QUESTION_ROWS_S4,
  VARIANTS_S4,
  FORMS_S5,
  SHORT_ROWS_S5,
  MIX_ROWS_S6,
  SIGNAL_BUCKETS_S7,
  SIGNAL_WORDS_S7,
  SIGNAL_NOTE_S7,
  DUEL_S8,
  DUEL_S9,
  DUEL_S10,
  LIVE_NOTE_S10,
  STATIVE_VERBS_S11,
  STATIVE_PICK_S11,
  THINK_NOTE_S11,
  DETECTIVE_S12,
  TYPED_S13,
  TYPED_S14,
  DESIGN_ROWS_S14,
  BEST_ROWS_S15,
  BEST_OPTS_S15,
  STORY_S16,
  STORY_ROWS_S17,
  PARA_WRONG_S18,
  PARA_ROWS_S18,
  PARA_CORRECT_S18,
  MEANING_S19,
  LEVELS_S20,
  SOLUTION_GATE_ROWS_S21,
  WRITE_CHECK_S22,
  WRITE_MODEL_S22,
  WRITE_MIN_SENTENCES_33,
  GOLDEN_FLIPS_S23,
  GOLDEN_RULES_S23,
  COURSE_MAP_S24,
  NEXT_STOP_ROW_S24,
} from "./data";
import {
  Lab33,
  Platform33,
  Verdict33,
  NotePanel33,
  CoverGates33,
  ObjectivesChecklist33,
  TenseMap33,
  MatchRows33,
  TensePick33,
  RightPick33,
  FormsExplorer33,
  SignalSort33,
  TapFix33,
  TypedFill33,
  StativeGate33,
  VerbHunt33,
  IqBest33,
  ParaDetect33,
  FlipCards33,
  WriteMission33,
  VariantsPanel33,
  CourseMap33,
  useGate33,
  FOCUS33,
  type GateDriver33,
} from "./kit33";

/* عارض وحدات المصدر داخل اللوحة اليسرى — يحفظ ترتيب السطور */
function SourceBoard33({ id, from = 0, to }: { id: SourceOrder33; from?: number; to?: number }) {
  const sec = SOURCE_SECTIONS_33.find((s) => s.id === id)!;
  return (
    <ol className="space-y-1.5 text-[13px] leading-6 text-amber-950">
      {sec.units.slice(from, to ?? sec.units.length).map((u, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
          <span>
            <Rich text={u} />
          </span>
        </li>
      ))}
    </ol>
  );
}

function BoardTitle33({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-[12px] font-black text-amber-700">{typeof children === "string" ? <Rich text={children} /> : children}</div>;
}

function GateFlag33({ done, sid }: { done: boolean; sid: string }) {
  return done ? (
    <div
      className="mt-3 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-center text-[12px] font-black text-emerald-800"
      data-gate-done={sid}
    >
      <Rich text="✓ أتممت هذا التفاعل — تقدّم إلى الخطوة التالية" />
    </div>
  ) : (
    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-center text-[12px] font-bold text-amber-700">
      <Rich text="أكمل التفاعل أعلاه لفتح الخطوة التالية…" />
    </div>
  );
}

/* ---------- الغلاف ---------- */
function StepCover33() {
  const drv = useGate33(COVER_GATES_33.length);
  return (
    <Lab33 source="cover">
      <div data-lesson-step="cover" data-source-section="cover">
        <div className="mb-3 text-center">
          <div aria-hidden className="text-4xl">🧭</div>
          <h2 className="mt-1 text-xl font-black text-amber-900">
            <En>The Four Present Tenses</En>
          </h2>
          <p className="mt-1 text-[13px] leading-6 text-amber-800">
            المراجعة الشاملة لأزمنة الحاضر الأربعة — <En className="font-bold">Present Tenses Mastery</En> · 🔥 <En className="font-bold">IQ200</En>
          </p>
          <p className="mx-auto mt-2 max-w-xl rounded-2xl bg-white/70 px-4 py-2 text-[12px] leading-6 text-amber-900">
            <Rich text="في الدرس 30 راجعنا الماضي كاملًا، وفي الدروس 31–32 أتقنّا المضارع التام والمضارع التام المستمر. اليوم نكمل الصورة: لا زمن جديد، بل مراجعة شاملة في خريطة واحدة — وبعدها الاختبار." />
          </p>
        </div>
        <BoardTitle33><Rich text="المس بوّابات الأزمنة الأربعة لتفتح الخريطة:" /></BoardTitle33>
        <CoverGates33 gates={COVER_GATES_33} drv={drv} />
        <GateFlag33 done={drv.complete >= drv.total} sid="cover" />
      </div>
    </Lab33>
  );
}

/* ---------- الأهداف ---------- */
function StepObjectives33() {
  const drv = useGate33(OBJECTIVES_33.length);
  return (
    <Lab33 source="objectives">
      <div data-lesson-step="objectives" data-source-section="objectives">
        <BoardTitle33><Rich text="🎯 سبعة أهداف — علّم كل هدف أتقنتَه:" /></BoardTitle33>
        <ObjectivesChecklist33 items={OBJECTIVES_33} drv={drv} />
        <GateFlag33 done={drv.complete >= drv.total} sid="objectives" />
      </div>
    </Lab33>
  );
}

/* ---------- هيكل اللوحتين ---------- */
function StepShell33({
  sid,
  done,
  board,
  interaction,
}: {
  sid: string;
  done: boolean;
  board?: ReactNode;
  interaction: ReactNode;
}) {
  return (
    <Lab33 source={sid}>
      <div data-lesson-step={sid} data-source-section={sid}>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-amber-100 bg-white/70 p-3">
            <BoardTitle33>📖 من الدرس — اقرأ ثم طبّق في الخطوة التفاعلية:</BoardTitle33>
            {board ?? <SourceBoard33 id={sid as SourceOrder33} />}
          </div>
          <div>{interaction}</div>
        </div>
        <GateFlag33 done={done} sid={sid} />
        {["s13", "s14", "s22"].includes(sid) ? (
          <Platform33>تلميح المنصة: حاول في التمرين التفاعلي أولًا؛ الحلول المفصلة تُعرض تحت كل فراغ بعد محاولتك الناجحة.</Platform33>
        ) : null}
      </div>
    </Lab33>
  );
}

export default function Steps33(props: { id: string; onGoTest?: () => void; onGoSolutions?: () => void }) {
  const { id, onGoTest, onGoSolutions } = props;
  switch (id) {
    case "cover":
      return <StepCover33 />;
    case "objectives":
      return <StepObjectives33 />;
    case "s1":
      return <StepS1 />;
    case "s2":
      return <StepS2 />;
    case "s3":
      return <StepS3 />;
    case "s4":
      return <StepS4 />;
    case "s5":
      return <StepS5 />;
    case "s6":
      return <StepS6 />;
    case "s7":
      return <StepS7 />;
    case "s8":
      return <StepS8 />;
    case "s9":
      return <StepS9 />;
    case "s10":
      return <StepS10 />;
    case "s11":
      return <StepS11 />;
    case "s12":
      return <StepS12 />;
    case "s13":
      return <StepS13 />;
    case "s14":
      return <StepS14 />;
    case "s15":
      return <StepS15 />;
    case "s16":
      return <StepS16 />;
    case "s17":
      return <StepS17 />;
    case "s18":
      return <StepS18 />;
    case "s19":
      return <StepS19 />;
    case "s20":
      return <StepS20 onGoTest={onGoTest} />;
    case "s21":
      return <StepS21 onGoSolutions={onGoSolutions} />;
    case "s22":
      return <StepS22 />;
    case "s23":
      return <StepS23 />;
    case "s24":
      return <StepS24 />;
    default:
      return <div>خطوة غير معروفة: {id}</div>;
  }
}

function StepS1() {
  const drv = useGate33(MAP_TENSES_33.length);
  return (
    <StepShell33
      sid="s1"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <TenseMap33 gates={MAP_TENSES_33} drv={drv} />
          <Verdict33 tone="note"><Rich text="النموذج الذهني: الأزمنة الأربعة كلها في الحاضر — الفرق هو «زاوية النظر» لا «زمن الحدوث»." /></Verdict33>
        </>
      }
    />
  );
}

function StepS2() {
  const drv = useGate33(BUILD_ROWS_S2.length);
  return <StepShell33 sid="s2" done={drv.complete >= drv.total} interaction={<MatchRows33 rows={BUILD_ROWS_S2} drv={drv} />} />;
}

function StepS3() {
  const drv = useGate33(NORA_ROWS_S3.length);
  return (
    <StepShell33
      sid="s3"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <MatchRows33 rows={NORA_ROWS_S3} drv={drv} />
          <Verdict33 tone="note"><Rich text="لم يتغيّر الفعل ولا المكان — تغيّرت زاوية النظر فقط. هذا هو قلب الدرس كله." /></Verdict33>
        </>
      }
    />
  );
}

function StepS4() {
  const drv = useGate33(QUESTION_ROWS_S4.length);
  return (
    <StepShell33
      sid="s4"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <TensePick33 rows={QUESTION_ROWS_S4} drv={drv} />
          <div className="mt-3">
            <BoardTitle33><Rich text="الجملة العربية نفسها بأربع صيغ صحيحة — «أعمل على هذا المشروع»:" /></BoardTitle33>
            <VariantsPanel33 variants={VARIANTS_S4} />
          </div>
        </>
      }
    />
  );
}

function StepS5() {
  const drvForms = useGate33(FORMS_S5.length);
  const drvRows = useGate33(SHORT_ROWS_S5.length);
  const done = drvForms.complete >= drvForms.total && drvRows.complete >= drvRows.total;
  return (
    <StepShell33
      sid="s5"
      done={done}
      interaction={
        <>
          <FormsExplorer33 tables={FORMS_S5} drv={drvForms} />
          <div className="mt-3">
            <BoardTitle33><Rich text="تدرّب: اختر الإجابة القصيرة الصحيحة لكل سؤال:" /></BoardTitle33>
            <MatchRows33 rows={SHORT_ROWS_S5} drv={drvRows} />
          </div>
        </>
      }
    />
  );
}

function StepS6() {
  const drv = useGate33(MIX_ROWS_S6.length);
  return <StepShell33 sid="s6" done={drv.complete >= drv.total} interaction={<RightPick33 rows={MIX_ROWS_S6} drv={drv} />} />;
}

function StepS7() {
  const drv = useGate33(SIGNAL_WORDS_S7.length);
  return (
    <StepShell33
      sid="s7"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <SignalSort33 buckets={SIGNAL_BUCKETS_S7} words={SIGNAL_WORDS_S7} drv={drv} />
          <NotePanel33 note={SIGNAL_NOTE_S7} />
        </>
      }
    />
  );
}

function StepS8() {
  const drv = useGate33(DUEL_S8.length);
  return (
    <StepShell33
      sid="s8"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <RightPick33 rows={DUEL_S8} drv={drv} />
          <Verdict33 tone="note"><Rich text="الخلاصة: البسيط للروتين والحقيقة، والمستمر لهذه اللحظة وهذه الفترة المؤقتة." /></Verdict33>
        </>
      }
    />
  );
}

function StepS9() {
  const drv = useGate33(DUEL_S9.length);
  return (
    <StepShell33
      sid="s9"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <RightPick33 rows={DUEL_S9} drv={drv} />
          <Verdict33 tone="note"><Rich text="غيّر السؤال يتغيّر الزمن: ماذا الآن؟ ← مستمر · منذ متى؟ ← تام مستمر." /></Verdict33>
        </>
      }
    />
  );
}

function StepS10() {
  const drv = useGate33(DUEL_S10.length);
  return (
    <StepShell33
      sid="s10"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <RightPick33 rows={DUEL_S10} drv={drv} />
          <NotePanel33 note={LIVE_NOTE_S10} />
        </>
      }
    />
  );
}

function StepS11() {
  const drvGate = useGate33(STATIVE_VERBS_S11.length);
  const drvRows = useGate33(STATIVE_PICK_S11.length);
  const done = drvGate.complete >= drvGate.total && drvRows.complete >= drvRows.total;
  return (
    <StepShell33
      sid="s11"
      done={done}
      interaction={
        <>
          <StativeGate33 verbs={STATIVE_VERBS_S11} drv={drvGate} />
          <div className="mt-3">
            <BoardTitle33><Rich text="اختر الصيغة السليمة لفعل الحالة:" /></BoardTitle33>
            <RightPick33 rows={STATIVE_PICK_S11} drv={drvRows} />
          </div>
          <NotePanel33 note={THINK_NOTE_S11} />
        </>
      }
    />
  );
}

function StepS12() {
  const drv = useGate33(DETECTIVE_S12.length);
  return <StepShell33 sid="s12" done={drv.complete >= drv.total} interaction={<TapFix33 rounds={DETECTIVE_S12} drv={drv} />} />;
}

function StepS13() {
  const drv = useGate33(TYPED_S13.length);
  return (
    <StepShell33
      sid="s13"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <TypedFill33 rows={TYPED_S13} drv={drv} idPrefix="s13" />
          <Platform33>الحلول المفصلة هنا حلول مشتقة وفق قواعد المصدر (المصدر يعد بها ولا يسردها نصًا) — تُعرض تحت كل فراغ بعد محاولتك الناجحة: حاول أولًا ثم قارن.</Platform33>
        </>
      }
    />
  );
}

function StepS14() {
  const drvTyped = useGate33(TYPED_S14.length);
  const drvRows = useGate33(DESIGN_ROWS_S14.length);
  const done = drvTyped.complete >= drvTyped.total && drvRows.complete >= drvRows.total;
  return (
    <StepShell33
      sid="s14"
      done={done}
      interaction={
        <>
          <TypedFill33 rows={TYPED_S14} drv={drvTyped} idPrefix="s14" />
          <div className="mt-3">
            <MatchRows33 rows={DESIGN_ROWS_S14} drv={drvRows} />
          </div>
        </>
      }
    />
  );
}

function StepS15() {
  const drv = useGate33(BEST_ROWS_S15.length);
  return <StepShell33 sid="s15" done={drv.complete >= drv.total} interaction={<IqBest33 rows={BEST_ROWS_S15} options={BEST_OPTS_S15} drv={drv} />} />;
}

function StepS16() {
  const drv = useGate33(11);
  return <StepShell33 sid="s16" done={drv.complete >= drv.total} interaction={<VerbHunt33 story={STORY_S16} total={11} drv={drv} />} />;
}

function StepS17() {
  const drv = useGate33(STORY_ROWS_S17.length);
  return (
    <StepShell33
      sid="s17"
      done={drv.complete >= drv.total}
      interaction={
        <TensePick33
          rows={STORY_ROWS_S17}
          drv={drv}
          renderPrompt={(row) => (
            <span className="rounded-lg bg-amber-100 px-2 py-0.5 text-amber-950" dir="ltr">
              <En>{(row as { phrase: string }).phrase}</En>
            </span>
          )}
        />
      }
    />
  );
}

function StepS18() {
  const drv = useGate33(PARA_ROWS_S18.length);
  const units = SOURCE_SECTIONS_33.find((x) => x.id === "s18")!.units;
  const correctedIdx = units.findIndex((u) => u.startsWith("الفقرة بعد التصحيح"));
  return (
    <StepShell33
      sid="s18"
      done={drv.complete >= drv.total}
      board={
        <>
          <SourceBoard33 id="s18" to={correctedIdx} />
          <BoardTitle33>من المصدر — ملاحظة العدّ محفوظة كما وردت:</BoardTitle33>
          <SourceBoard33 id="s18" from={units.length - 1} />
          <Platform33>الفقرة المصححة نفسها تُكشف في التفاعل بعد تصحيح المواضع كلها — حاول أولًا.</Platform33>
        </>
      }
      interaction={<ParaDetect33 para={PARA_WRONG_S18} rows={PARA_ROWS_S18} corrected={PARA_CORRECT_S18} drv={drv} />}
    />
  );
}

function StepS19() {
  const drv = useGate33(MEANING_S19.length);
  return (
    <StepShell33
      sid="s19"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <RightPick33 rows={MEANING_S19} drv={drv} />
          <Verdict33 tone="note"><Rich text="نفس الشخص، نفس المجال، أربع جمل صحيحة — الزمن يقرره ما تريد أن تقوله." /></Verdict33>
        </>
      }
    />
  );
}

function StepS20({ onGoTest }: { onGoTest?: () => void }) {
  const drv = useGate33(LEVELS_S20.length);
  return (
    <StepShell33
      sid="s20"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <FlipCards33
            cards={LEVELS_S20}
            drv={drv}
            renderFace={(c: { level: string; title: string; range: string }) => (
              <span>
                المستوى {c.level} — {c.title}
                <span className="mt-1 block text-[11px] font-normal text-amber-600">{c.range}</span>
              </span>
            )}
            renderBack={(c: { back: string }) => <Rich text={c.back} />}
          />
          {onGoTest ? (
            <button
              type="button"
              onClick={onGoTest}
              className={`${FOCUS33} mt-4 w-full rounded-2xl border-2 border-amber-600 bg-amber-600 px-4 py-3 text-[15px] font-black text-white shadow-lg shadow-amber-200 hover:bg-amber-700`}
            >
              🧪 الذهاب إلى الاختبار — Present Tenses Master Test (25 سؤالًا)
            </button>
          ) : null}
        </>
      }
    />
  );
}

function StepS21({ onGoSolutions }: { onGoSolutions?: () => void }) {
  const drv = useGate33(SOLUTION_GATE_ROWS_S21.length);
  return (
    <StepShell33
      sid="s21"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <div className="mb-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
            <div aria-hidden className="text-3xl">🔐</div>
            <div className="mt-1 text-[14px] font-black text-amber-900"><Rich text="الحلول مقفلة حتى إرسال الاختبار" /></div>
            <div className="mt-1 text-[12px] leading-6 text-amber-800">
              <Rich text="مفتاح تصحيح «الاختبار النهائي» التفصيلي يعيش في منطقة الحلول — ولا يُفتح إلا بعد إرسال إجاباتك الخمس والعشرين دفعة واحدة." />
            </div>
            {onGoSolutions ? (
              <button
                type="button"
                onClick={onGoSolutions}
                className={`${FOCUS33} mt-3 rounded-full border-2 border-amber-600 bg-white px-4 py-2 text-[13px] font-black text-amber-800 hover:bg-amber-100`}
              >
                🗝️ فتح منطقة الحلول
              </button>
            ) : null}
          </div>
          <MatchRows33 rows={SOLUTION_GATE_ROWS_S21} drv={drv} />
        </>
      }
    />
  );
}

function StepS22() {
  const drv = useGate33(WRITE_CHECK_S22.length + 8);
  return (
    <StepShell33
      sid="s22"
      done={drv.complete >= drv.total}
      interaction={<WriteMission33 checklist={WRITE_CHECK_S22} model={WRITE_MODEL_S22} min={WRITE_MIN_SENTENCES_33} drv={drv} />}
    />
  );
}

function StepS23() {
  const drv = useGate33(GOLDEN_FLIPS_S23.length);
  return (
    <StepShell33
      sid="s23"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <FlipCards33
            cards={GOLDEN_FLIPS_S23}
            drv={drv}
            renderFace={(c: { face: string }) => <span>🃏 {c.face}</span>}
            renderBack={(c: { back: string }) => (
              <span dir="auto">
                <Rich text={c.back} />
              </span>
            )}
          />
          <div className="mt-3 rounded-2xl border border-amber-200 bg-white p-3">
            <BoardTitle33><Rich text="⭐ القواعد الذهبية:" /></BoardTitle33>
            <ul className="space-y-1.5">
              {GOLDEN_RULES_S23.map((r, i) => (
                <li key={i} className="flex gap-2 text-[12px] leading-6 text-amber-950">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <Rich text={r} />
                </li>
              ))}
            </ul>
          </div>
        </>
      }
    />
  );
}

function StepS24() {
  const drv = useGate33(NEXT_STOP_ROW_S24.length);
  return (
    <StepShell33
      sid="s24"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <CourseMap33 map={COURSE_MAP_S24} />
          <div className="mt-3">
            <MatchRows33 rows={NEXT_STOP_ROW_S24} drv={drv} />
          </div>
          <Verdict33 tone="good">أنجزت منظومة الحاضر كاملة — ثمانية أزمنة أصبحت تحت يدك. هيّا إلى الاختبار النهائي لتثبيت المهارة، ثم نفتح باب المستقبل في الدرس 34.</Verdict33>
        </>
      }
    />
  );
}
