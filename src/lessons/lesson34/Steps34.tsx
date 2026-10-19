// ============================================================
// Steps34 — عارض خطوات الدرس 34 (40 خطوة 1:1 مع ledger34)
// كل خطوة: لوحة محتوى من المصدر + تفاعل ينتهي بقفل الإنجاز
// (data-gate-done="sN" يظهر فقط بعد نجاح محرّك التفاعل).
// لا تُعرض أي إجابة قبل المحاولة الناجحة (لا درجة ولا ✓ قبل الفعل).
// ============================================================

import { useEffect, useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { SOURCE_SECTIONS_34, type SourceOrder34 } from "./ledger34";
import {
  COVER_FUNCTIONS_34,
  TIMELINE_COVER_34,
  OBJECTIVES_34,
  MOMENT_ROWS_S1,
  RULE_ROWS_S2,
  PRONOUN_FORMS_34,
  PRONOUN_PICK_S3,
  GOLDEN_VERBS_34,
  ERROR_PAIRS_S4,
  WILL_TRAPS_S4,
  USE_CARDS_S5,
  MOMENT_EXCHANGES_S6,
  DIALOGUE_HOME_S7,
  CHALLENGE_S7,
  PROMISE_EXAMPLES_S8,
  PROMISE_PHRASES_S8,
  PROMISE_USES_S8,
  PREDICTION_EXAMPLES_S9,
  PREDICTION_CUES_S9,
  FACT_VS_PREDICT_S10,
  IQ_FACT_ROW_S10,
  OFFER_EXAMPLES_S11,
  SHALL_EXAMPLES_S12,
  WILLINGNESS_S13,
  REFUSAL_S13,
  REFUSAL_ROWS_S13,
  CONTRACTIONS_34,
  CONTRACTION_EXAMPLES_34,
  NEG_EXAMPLES_S15,
  NEG_ERROR_PAIRS_S16,
  QUESTION_EXAMPLES_S17,
  SHORT_ROWS_S18,
  WH_WORDS_S19,
  WHO_COMPARE_S20,
  TIME_WORDS_S21,
  TIME_EXAMPLES_S21,
  CUE_WARNING_ROWS_S22,
  GOING_TO_ROWS_S23,
  GOING_TO_SITUATIONS_S23,
  PAST_ERROR_PAIRS_S24,
  IRREGULAR_CHAIN_S24,
  BE_EXAMPLES_S25,
  BE_ERROR_PAIRS_S25,
  BE_TABLE_S26,
  DIALOGUE_PROJECT_S27,
  USE_ANALYSIS_S27,
  MC_ROWS_S28,
  TRANSFORM_ROWS_S29,
  DETECTIVE_S30,
  IQ_SITUATIONS_S31,
  STORY_S32,
  STORY_HITS_S32,
  COMPREHENSION_S32,
  STORY_ANALYSIS_S32,
  TENSE_COMPARE_S33,
  TENSE_COMPARE_ROWS_S33,
  LEVELS_S34,
  SOLUTION_GATE_ROWS_S35,
  WRITE_CHECK_S36,
  WRITE_MODEL_S36,
  WRITE_MIN_SENTENCES_36,
  WRITE_MAX_SENTENCES_36,
  GOLDEN_FLIPS_S37,
  GOLDEN_USES_S37,
  GOLDEN_RULE_S37,
  COURSE_MAP_S38,
  FUTURE_ROADMAP_S38,
  NEXT_STOP_ROW_S38,
  type McRow34,
  type WillTrap34,
} from "./data";
import {
  Lab34,
  Platform34,
  Verdict34,
  Note34,
  Hint34,
  TimelineChips34,
  FunctionChips34,
  ObjectivesChecklist34,
  FormulaBoard34,
  SentenceBuilder34,
  SentenceList34,
  DialogueReader34,
  MatchRows34,
  RightPick34,
  PairPick34,
  TypedFill34,
  TapFix34,
  FlipCards34,
  DataTable34,
  WordGrid34,
  WhBoard34,
  IqSituations34,
  StoryHunt34,
  Choice34,
  TransformDrill34,
  WriteMission34,
  CourseMap34,
  useGate34,
  Progress34,
  FOCUS34,
  type GateDriver34,
} from "./kit34";

/* عارض وحدات المصدر داخل اللوح اليمنى — يحفظ ترتيب السطور */
function SourceBoard34({ id, from = 0, to }: { id: SourceOrder34; from?: number; to?: number }) {
  const sec = SOURCE_SECTIONS_34.find((s) => s.id === id)!;
  return (
    <ol className="space-y-1.5 text-[13px] leading-6 text-stone-700">
      {sec.units.slice(from, to ?? sec.units.length).map((u, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
          <span>
            <Rich text={u} />
          </span>
        </li>
      ))}
    </ol>
  );
}

/** يقطع اللوح عند أول وحدة تطابق النص — لإخفاء الحلول قبل المحاولة */
function cutAt(id: SourceOrder34, marker: string) {
  const sec = SOURCE_SECTIONS_34.find((s) => s.id === id)!;
  const idx = sec.units.findIndex((u) => u.startsWith(marker));
  return idx === -1 ? sec.units.length : idx;
}

function BoardTitle34({ children }: { children: ReactNode }) {
  return (
    <div className="l34-board-title">
      {typeof children === "string" ? <Rich text={children} /> : children}
    </div>
  );
}

function GateFlag34({ done, sid }: { done: boolean; sid: string }) {
  return (
    <div className="l34-gate" data-done={done ? "true" : "false"} data-gate-done={done ? sid : undefined}>
      {done ? (
        <>
          <span aria-hidden>🎉</span>
          <Rich text="✓ أتممت هذا التفاعل — تقدّم إلى الخطوة التالية" />
        </>
      ) : (
        <>
          <span aria-hidden>🛰️</span>
          <Rich text="أكمل التفاعل أعلاه لفتح الخطوة التالية…" />
        </>
      )}
    </div>
  );
}

/* ---------- الغلاف ---------- */
function StepCover34() {
  const drvTime = useGate34(TIMELINE_COVER_34.length);
  const drvFn = useGate34(COVER_FUNCTIONS_34.length);
  const done = drvTime.complete >= drvTime.total && drvFn.complete >= drvFn.total;
  return (
    <Lab34 source="cover">
      <div data-lesson-step="cover" data-source-section="cover" className="l34-step">
        <div className="l34-cover">
          <div className="l34-cover__intro">
            <span className="l34-cover__kicker">
              <span aria-hidden>🚀</span>
              <Rich text="محطة الإطلاق · الدرس 34" />
            </span>
            <h2 dir="ltr">
              <En>Future Simple</En>
            </h2>
            <div className="l34-cover__sub">
              المستقبل البسيط باستخدام <En className="font-bold">WILL</En> ·{" "}
              <En className="font-bold">The Future Starts Here!</En> · 🔥{" "}
              <En className="font-bold">IQ200</En>
            </div>
            <div className="l34-cover__quote">
              <Rich text="بعد أن أكملنا منظومتي الحاضر والماضي، وصلنا إلى مرحلة جديدة: التعبير عن المستقبل باللغة الإنجليزية. هدفنا ليس حفظ قاعدة واحدة فقط، بل فهم طريقة تفكير المتحدث الإنجليزي عندما يتخذ قرارًا، أو يقدم وعدًا، أو يتوقع حدوث شيء، أو يعرض المساعدة على شخص آخر." />
            </div>
            <div className="l34-cover__quote l34-cover__quote--teal">
              <Rich text="سنحافظ على أسلوبنا التعليمي: شرح متدرج، أمثلة متنوعة، مقارنة دقيقة، اكتشاف الأخطاء، تدريبات تطبيقية، وتحديات IQ200." />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5" dir="ltr">
              <span className="l34-formula-chip l34-formula-chip--subject">Subject</span>
              <span className="l34-formula-chip l34-formula-chip--op">+</span>
              <span className="l34-formula-chip l34-formula-chip--will">will</span>
              <span className="l34-formula-chip l34-formula-chip--op">+</span>
              <span className="l34-formula-chip l34-formula-chip--v1">V1</span>
              <span className="l34-formula-chip l34-formula-chip--op">+</span>
              <span className="l34-formula-chip l34-formula-chip--rest">Rest</span>
            </div>
          </div>

          <div>
            <BoardTitle34>
              <Rich text="المستوى: تأسيسي متقدم — IQ200 — والخط الزمني:" />
            </BoardTitle34>
            <TimelineChips34 moments={TIMELINE_COVER_34} drv={drvTime} />
            <div className="mt-3">
              <BoardTitle34>
                <Rich text="من أهم استخدامات will — المس كل وظيفة لتفتحها:" />
              </BoardTitle34>
              <FunctionChips34 functions={COVER_FUNCTIONS_34} drv={drvFn} />
            </div>
          </div>
        </div>
        <GateFlag34 done={done} sid="cover" />
      </div>
    </Lab34>
  );
}

/* ---------- الأهداف ---------- */
function StepObjectives34() {
  const drv = useGate34(OBJECTIVES_34.length);
  return (
    <Lab34 source="objectives">
      <div data-lesson-step="objectives" data-source-section="objectives" className="l34-step">
        <div className="l34-objectives">
          <div>
            <BoardTitle34>
              <Rich text="🎯 تسعة أهداف — علّم كل هدف أتقنتَه:" />
            </BoardTitle34>
            <p className="mb-2 text-[13px] font-bold leading-6 text-violet-800">
              <Rich text="بنهاية الدرس ستكون قادرًا على:" />
            </p>
            <ObjectivesChecklist34 items={OBJECTIVES_34} drv={drv} />
          </div>
          <aside className="l34-objectives__aside">
            <h3>
              <Rich text="🧭 كيف تستخدم هذه المنصة؟" />
            </h3>
            <p>
              <Rich text="كل محطة قصيرة: اقرأ بطاقة المعرفة، ثم نفّذ التفاعل في منصّة التطبيق. لا تنتقل حتى يظهر شريط الإنجاز الأخضر — هكذا تبني المهارة خطوة بخطوة." />
            </p>
            <p>
              <Rich text="الأهداف التسعة تغطي البناء، والوظائف الست، والنفي والسؤال، والاختصارات، وWh-questions، والمقارنة مع الصيغ الأخرى، والاختبار الشامل." />
            </p>
            <p>
              <Rich text="التقدم محفوظ داخل الجلسة عبر شريط الرحلة؛ يمكنك العودة لأي محطة من خريطة الرحلة في أي وقت." />
            </p>
          </aside>
        </div>
        <GateFlag34 done={drv.complete >= drv.total} sid="objectives" />
      </div>
    </Lab34>
  );
}

/* ---------- هيكل اللوحتين ---------- */
function StepShell34({
  sid,
  done,
  board,
  interaction,
  platform,
}: {
  sid: string;
  done: boolean;
  board?: ReactNode;
  interaction: ReactNode;
  platform?: string;
}) {
  return (
    <Lab34 source={sid}>
      <div data-lesson-step={sid} data-source-section={sid} className="l34-step">
        <div className="l34-stepgrid">
          <section className="l34-brief" data-l34-brief={sid} aria-label="بطاقة المعرفة من الدرس">
            <div className="l34-panel-head">
              <span className="l34-panel-head__label">
                <span aria-hidden>📖</span>
                <Rich text="بطاقة المعرفة" />
              </span>
              <span className="l34-panel-head__hint">
                <Rich text="من الدرس" />
              </span>
            </div>
            {board ?? <SourceBoard34 id={sid as SourceOrder34} />}
          </section>
          <section className="l34-deck" data-l34-deck={sid} aria-label="منصة التطبيق التفاعلية">
            <div className="l34-panel-head">
              <span className="l34-panel-head__label">
                <span aria-hidden>🛸</span>
                <Rich text="منصّة التطبيق" />
              </span>
              <span className="l34-panel-head__hint">
                <Rich text="جرّب ← اكتشف ← ثبّت" />
              </span>
            </div>
            {interaction}
          </section>
        </div>
        <GateFlag34 done={done} sid={sid} />
        {platform ? <Platform34>{platform}</Platform34> : null}
      </div>
    </Lab34>
  );
}

export default function Steps34(props: { id: string; onGoTest?: () => void; onGoSolutions?: () => void }) {
  const { id, onGoTest, onGoSolutions } = props;
  switch (id) {
    case "cover":
      return <StepCover34 />;
    case "objectives":
      return <StepObjectives34 />;
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
      return <StepS20 />;
    case "s21":
      return <StepS21 />;
    case "s22":
      return <StepS22 />;
    case "s23":
      return <StepS23 />;
    case "s24":
      return <StepS24 />;
    case "s25":
      return <StepS25 />;
    case "s26":
      return <StepS26 />;
    case "s27":
      return <StepS27 />;
    case "s28":
      return <StepS28 />;
    case "s29":
      return <StepS29 />;
    case "s30":
      return <StepS30 />;
    case "s31":
      return <StepS31 />;
    case "s32":
      return <StepS32 />;
    case "s33":
      return <StepS33 />;
    case "s34":
      return <StepS34 onGoTest={onGoTest} />;
    case "s35":
      return <StepS35 onGoSolutions={onGoSolutions} />;
    case "s36":
      return <StepS36 />;
    case "s37":
      return <StepS37 />;
    case "s38":
      return <StepS38 />;
    default:
      return <div>خطوة غير معروفة: {id}</div>;
  }
}

/* ---------- s1: ما المقصود بالمستقبل؟ ---------- */
function StepS1() {
  const drv = useGate34(MOMENT_ROWS_S1.length);
  return (
    <StepShell34
      sid="s1"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <MatchRows34 rows={MOMENT_ROWS_S1} drv={drv} optionDir="ltr" />
          <Note34>
            <Rich text="المستقبل هو ما سيحدث بعد لحظة الكلام — لكن اللغة الإنجليزية لا تستخدم will في جميع الجمل التي تتحدث عن المستقبل: هناك أكثر من طريقة للتعبير عن المستقبل، وسندرسها بالتدريج." />
          </Note34>
        </>
      }
    />
  );
}

/* ---------- s2: القاعدة الأساسية ---------- */
function StepS2() {
  const drvForm = useGate34(4);
  const drvRows = useGate34(RULE_ROWS_S2.length);
  const done = drvForm.complete >= drvForm.total && drvRows.complete >= drvRows.total;
  return (
    <StepShell34
      sid="s2"
      done={done}
      interaction={
        <>
          <FormulaBoard34
            title="المس كل جزء من الصيغة لتفكّكه:"
            parts={[
              { text: "Subject", role: "subject" },
              { text: "+", role: "op" },
              { text: "will", role: "aux" },
              { text: "+", role: "op" },
              { text: "V1", role: "verb" },
              { text: "+", role: "op" },
              { text: "Rest", role: "rest" },
            ]}
            note="V1 = الشكل الأساسي للفعل دون إضافات. لاحظ أن الفعل بعد will لا يتغير مهما تغير الفاعل."
            drv={drvForm}
          />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="ابنِ جملتك: Subject + will + V1 + Rest" />
            </BoardTitle34>
            <SentenceBuilder34 />
          </div>
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="طابق كل جملة بمعناها العربي:" />
            </BoardTitle34>
            <MatchRows34 rows={RULE_ROWS_S2} drv={drvRows} optionDir="ltr" />
          </div>
        </>
      }
    />
  );
}

/* ---------- s3: WILL مع جميع الضمائر ---------- */
function StepS3() {
  const drvTable = useGate34(PRONOUN_FORMS_34.length);
  const drvPick = useGate34(PRONOUN_PICK_S3.length);
  const done = drvTable.complete >= drvTable.total && drvPick.complete >= drvPick.total;
  return (
    <StepShell34
      sid="s3"
      done={done}
      interaction={
        <>
          <PronounChips34 rows={PRONOUN_FORMS_34} drv={drvTable} />
          <div className="mt-3">
            <RightPick34 rows={PRONOUN_PICK_S3} drv={drvPick} />
          </div>
          <Note34>
            <Rich text="لأننا لا نضيف s إلى الفعل بعد will — والفعل بعد will لا يتغير مهما تغير الفاعل." />
          </Note34>
        </>
      }
    />
  );
}

function PronounChips34({
  rows,
  drv,
}: {
  rows: { p: string; form: string }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => rows.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-3">
      <div className="mb-2 text-[12px] font-black text-stone-600">
        <Rich text="المس كل ضمير لتفتح صيغته — لا تحتاج إلى حفظ تصريف مختلف مع كل ضمير:" />
      </div>
      <Progress34 complete={count} total={rows.length} />
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3" dir="ltr">
        {rows.map((r, i) => (
          <button
            key={r.p}
            type="button"
            data-pronoun={r.p}
            onClick={() => {
              if (open[i]) return;
              setOpen((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }}
            aria-pressed={open[i]}
            className={`${FOCUS34} rounded-xl border-2 px-2.5 py-2 text-left transition ${
              open[i] ? "border-emerald-400 bg-emerald-50" : "border-stone-200 bg-white hover:border-teal-400"
            }`}
          >
            <span className="block text-[13px] font-black text-stone-900" dir="ltr">
              <LatinRuns text={r.p} />
            </span>
            <span aria-hidden className="mx-1 text-stone-400">
              →
            </span>
            <span className={`text-[13px] font-black ${open[i] ? "text-emerald-800" : "text-stone-300"}`} dir="ltr">
              <LatinRuns text={open[i] ? r.form : "will …"} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- s4: مصائد V1 بعد will/won't (إضافة من إعداد المنصة) ---------- */
function WillTraps34({ rows, drv }: { rows: WillTrap34[]; drv: GateDriver34 }) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const solved = picks.map((pick, i) => pick !== null && rows[i].options[pick].ok);
  const count = solved.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-3">
      <div className="mb-2 text-[12px] font-black text-stone-600">
        <Rich text="🪤 ثلاث مصائد شائعة — اختر الجملة الصحيحة، وسترى لماذا الخطأ خطأ:" />
      </div>
      <Progress34 complete={count} total={rows.length} />
      <div className="space-y-2">
        {rows.map((row, i) => {
          const pick = picks[i];
          const solvedRow = solved[i];
          return (
            <div key={row.n} data-trap-row={i} className="rounded-xl border border-stone-200 p-2.5">
              <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-[11px] font-black text-stone-500">
                <span aria-hidden>{row.n}</span>
                <Rich text={row.label} />
              </div>
              <div className="grid gap-1.5 sm:grid-cols-3" dir="ltr">
                {row.options.map((option, oi) => {
                  const chosen = pick === oi;
                  const good = solvedRow && option.ok;
                  const bad = chosen && !option.ok;
                  return (
                    <button
                      key={oi}
                      type="button"
                      data-trap-row={i}
                      data-trap-opt={oi}
                      disabled={solvedRow}
                      onClick={() =>
                        setPicks((prev) => {
                          const next = [...prev];
                          next[i] = oi;
                          return next;
                        })
                      }
                      aria-pressed={chosen}
                      className={`${FOCUS34} rounded-lg border-2 px-2.5 py-2 text-left text-[12px] font-bold leading-6 transition ${
                        good
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : bad
                            ? "border-rose-300 bg-rose-50 text-rose-800"
                            : "border-stone-200 bg-white text-stone-800 hover:border-emerald-400"
                      }`}
                    >
                      <LatinRuns text={option.text} />
                    </button>
                  );
                })}
              </div>
              {pick !== null && !row.options[pick].ok ? (
                <div className="mt-1.5 rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-bold leading-5 text-rose-800">
                  ✕ <Rich text={row.options[pick].note ?? "ليست الصيغة الأساسية."} />
                </div>
              ) : null}
              {solvedRow ? (
                <div className="mt-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-bold leading-5 text-emerald-900">
                  ✓ <span dir="ltr"><LatinRuns text={row.fix} /></span> — <Rich text={row.why} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- s4: القاعدة الذهبية الأولى ---------- */
function StepS4() {
  const drvVerbs = useGate34(GOLDEN_VERBS_34.length);
  const drvPairs = useGate34(ERROR_PAIRS_S4.length);
  const drvTraps = useGate34(WILL_TRAPS_S4.length);
  const done =
    drvVerbs.complete >= drvVerbs.total &&
    drvPairs.complete >= drvPairs.total &&
    drvTraps.complete >= drvTraps.total;
  return (
    <StepShell34
      sid="s4"
      done={done}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="بعد WILL يأتي الفعل بصيغته الأساسية دائمًا — المس كل فعل:" />
            </div>
            <Progress34 complete={drvVerbs.complete} total={drvVerbs.total} />
            <VerbChips34 verbs={GOLDEN_VERBS_34} drv={drvVerbs} />
          </div>
          <div className="mt-3">
            <PairPick34
              pairs={ERROR_PAIRS_S4}
              drv={drvPairs}
              intro="الأخطاء الشائعة — اختر الجملة الصحيحة في كل زوج:"
            />
          </div>
          <div className="mt-3">
            <WillTraps34 rows={WILL_TRAPS_S4} drv={drvTraps} />
          </div>
          <Hint34>
            <Rich text="انتبه خصوصًا إلى الخطأ الأخير: لا نضع to بين will والفعل الأساسي." />
          </Hint34>
        </>
      }
    />
  );
}

function VerbChips34({ verbs, drv }: { verbs: { v1: string; will: string }[]; drv: GateDriver34 }) {
  const [open, setOpen] = useState<boolean[]>(() => verbs.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === verbs.length) drv.onDone(true);
  }, [count, verbs.length, drv]);
  return (
    <div className="flex flex-wrap gap-1.5" dir="ltr">
      {verbs.map((v, i) => (
        <button
          key={v.v1}
          type="button"
          data-verb={v.v1}
          onClick={() => {
            if (open[i]) return;
            setOpen((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }}
          aria-pressed={open[i]}
          className={`${FOCUS34} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
            open[i] ? "border-emerald-400 bg-emerald-50 text-emerald-900" : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
          }`}
        >
          <span dir="ltr">
            <LatinRuns text={v.v1} />
          </span>
          <span aria-hidden className="mx-1 text-stone-400">
            →
          </span>
          {open[i] ? (
            <span dir="ltr">
              <LatinRuns text={v.will} />
            </span>
          ) : (
            <span className="text-stone-400">will …</span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ---------- s5: ما وظيفة WILL؟ ---------- */
function StepS5() {
  const drv = useGate34(USE_CARDS_S5.length);
  return (
    <StepShell34
      sid="s5"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="من أهم استخداماتها — المس كل استخدام لتكشف مثاله:" />
            </div>
            <Progress34 complete={drv.complete} total={drv.total} />
            <div className="grid gap-2 sm:grid-cols-2">
              {USE_CARDS_S5.map((u, i) => (
                <UseCard34 key={u.n} card={u} index={i} drv={drv} />
              ))}
            </div>
          </div>
          <Note34>
            <Rich text="قد تظن أن will تعني فقط حرف السين في العربية: سأذهب. / سأدرس. / سأكتب. — لكن وظيفتها أوسع من ذلك، وسنتعلم كل استخدام بصورة مستقلة." />
          </Note34>
        </>
      }
    />
  );
}

function UseCard34({
  card,
  index,
  drv,
}: {
  card: { n: string; title: string; ar: string; ex: string; exAr: string };
  index: number;
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      data-use={card.n}
      onClick={() => {
        if (open) return;
        setOpen(true);
        drv.onDone(index === 5 ? true : false);
      }}
      aria-pressed={open}
      className={`${FOCUS34} rounded-2xl border-2 p-3 text-right transition ${
        open ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
      }`}
    >
      <div className="text-[13px] font-black text-stone-900">
        <span className="ml-1 text-stone-400">{card.n}</span>
        <Rich text={card.title} />
      </div>
      {open ? (
        <>
          <div className="mt-1 text-[13px] font-bold text-emerald-900" dir="ltr">
            <LatinRuns text={card.ex} />
          </div>
          <div className="mt-0.5 text-[12px] text-stone-600" dir="rtl">
            <Rich text={card.exAr} />
          </div>
        </>
      ) : (
        <div className="mt-1 text-[11px] text-stone-400" dir="rtl">
          <Rich text="المس لكشف المثال…" />
        </div>
      )}
    </button>
  );
}

/* ---------- s6: القرار اللحظي ---------- */
function StepS6() {
  const drv = useGate34(MOMENT_EXCHANGES_S6.length);
  return (
    <StepShell34
      sid="s6"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="هذا أحد أهم استخدامات will — المس كل موقف لتكشف القرار:" />
            </div>
            <Progress34 complete={drv.complete} total={drv.total} />
            <ExchangeList34 items={MOMENT_EXCHANGES_S6} drv={drv} />
          </div>
          <Verdict34 tone="note">
            <Rich text="لاحظ النمط: حدث أو موقف جديد ← قرار الآن ← " />
            <En>WILL</En>
          </Verdict34>
        </>
      }
    />
  );
}

function ExchangeList34({
  items,
  drv,
}: {
  items: { a: string; aAr: string; b: string; bAr: string; note?: string }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === items.length) drv.onDone(true);
  }, [count, items.length, drv]);
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i}>
          <button
            type="button"
            data-exchange={i}
            onClick={() => {
              if (open[i]) return;
              setOpen((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }}
            aria-pressed={open[i]}
            className={`${FOCUS34} w-full rounded-2xl border-2 px-3 py-2 text-right transition ${
              open[i] ? "border-teal-200 bg-teal-50/60" : "border-stone-200 bg-white hover:border-teal-400"
            }`}
          >
            <span className="block text-[13px] leading-6 text-stone-800" dir="auto">
              <LatinRuns text={it.a} />
            </span>
            {open[i] ? (
              <>
                <span className="mt-1 block text-[13px] font-bold text-emerald-900" dir="ltr">
                  <LatinRuns text={it.b} />
                </span>
                <span className="mt-0.5 block text-[12px] text-stone-600" dir="rtl">
                  <Rich text={it.bAr} />
                </span>
                {it.note ? (
                  <span className="mt-0.5 block text-[11px] leading-5 text-stone-500" dir="rtl">
                    <Rich text={it.note} />
                  </span>
                ) : null}
              </>
            ) : (
              <span className="mt-0.5 block text-[11px] text-stone-400" dir="rtl">
                <Rich text="المس لكشف القرار…" />
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---------- s7: حوار At Home ---------- */
function StepS7() {
  const drvDialogue = useGate34(DIALOGUE_HOME_S7.length);
  const drvChallenge = useGate34(1);
  const done = drvDialogue.complete >= drvDialogue.total && drvChallenge.complete >= drvChallenge.total;
  const cut = cutAt("s7", "الحل:");
  return (
    <StepShell34
      sid="s7"
      done={done}
      board={<SourceBoard34 id="s7" to={cut} />}
      interaction={
        <>
          <DialogueReader34 lines={DIALOGUE_HOME_S7} drv={drvDialogue} label="اقرأ الحوار — المس كل سطر لكشف ترجمته:" />
          <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-1 text-[12px] font-black text-stone-600">
              <Rich text="تحدٍّ صغير — أكمل الرد المناسب:" />
            </div>
            <div className="mb-2 text-[13px] leading-6 text-stone-800" dir="ltr">
              <LatinRuns text="A: I can't carry these heavy bags." />
            </div>
            <TypedFill34
              idPrefix="s7"
              drv={drvChallenge}
              rows={[
                {
                  n: "B",
                  before: CHALLENGE_S7.before,
                  after: CHALLENGE_S7.after,
                  accept: CHALLENGE_S7.accept,
                  solution: CHALLENGE_S7.solution,
                  why: "لأن عمر اتخذ قرارات استجابةً للموقف الحالي — والقرار اللحظي يستخدم will.",
                },
              ]}
            />
          </div>
          <Note34>
            <Rich text="لماذا استخدمنا will؟ لأن عمر اتخذ قرارات استجابةً للموقف الحالي." />
          </Note34>
        </>
      }
      platform="قسم المصدر يسرد حل هذا التحدي بعد الأسئلة — ويُكشف داخل التفاعل بعد محاولتك الناجحة وحدها."
    />
  );
}

/* ---------- s8: الوعود ---------- */
function StepS8() {
  const drvEx = useGate34(PROMISE_EXAMPLES_S8.length);
  const drvPh = useGate34(PROMISE_PHRASES_S8.length);
  const done = drvEx.complete >= drvEx.total && drvPh.complete >= drvPh.total;
  return (
    <StepShell34
      sid="s8"
      done={done}
      interaction={
        <>
          <SentenceList34 items={PROMISE_EXAMPLES_S8} drv={drvEx} />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="تعبيرات شائعة — المس كل عبارة لتكشف معناها:" />
            </BoardTitle34>
            <SentenceList34 items={PROMISE_PHRASES_S8} drv={drvPh} tone="info" />
          </div>
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="أمثلة:" />
            </BoardTitle34>
            <SentenceList34 items={PROMISE_USES_S8} />
          </div>
          <Note34>
            <Rich text="لاحظ: الوعد قد يكون مثبتًا أو منفيًا." />
          </Note34>
        </>
      }
    />
  );
}

/* ---------- s9: التوقعات ---------- */
function StepS9() {
  const drvEx = useGate34(PREDICTION_EXAMPLES_S9.length);
  const drvCues = useGate34(PREDICTION_CUES_S9.length);
  const done = drvEx.complete >= drvEx.total && drvCues.complete >= drvCues.total;
  return (
    <StepShell34
      sid="s9"
      done={done}
      interaction={
        <>
          <SentenceList34 items={PREDICTION_EXAMPLES_S9} drv={drvEx} />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="تعبيرات شائعة مع التوقعات — المس كل تعبير:" />
            </BoardTitle34>
            <CueChips34 cues={PREDICTION_CUES_S9} drv={drvCues} />
          </div>
          <Hint34>
            <Rich text="لكن لا تحفظها على أنها كلمات تفرض will دائمًا؛ المعنى والسياق هما الأساس." />
          </Hint34>
        </>
      }
    />
  );
}

function CueChips34({ cues, drv }: { cues: string[]; drv: GateDriver34 }) {
  const [open, setOpen] = useState<boolean[]>(() => cues.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === cues.length) drv.onDone(true);
  }, [count, cues.length, drv]);
  return (
    <div>
      <Progress34 complete={count} total={cues.length} />
      <div className="flex flex-wrap gap-1.5" dir="ltr">
        {cues.map((c, i) => (
          <button
            key={c}
            type="button"
            data-cue={c}
            onClick={() => {
              if (open[i]) return;
              setOpen((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }}
            aria-pressed={open[i]}
            className={`${FOCUS34} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
              open[i] ? "border-violet-400 bg-violet-50 text-violet-900" : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
            }`}
          >
            <LatinRuns text={c} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- s10: الفرق بين الحقيقة والتوقع ---------- */
function StepS10() {
  const drvRows = useGate34(FACT_VS_PREDICT_S10.length);
  const drvIq = useGate34(1);
  const done = drvRows.complete >= drvRows.total && drvIq.complete >= drvIq.total;
  const cut = cutAt("s10", "الإجابة:");
  return (
    <StepShell34
      sid="s10"
      done={done}
      board={<SourceBoard34 id="s10" to={cut} />}
      interaction={
        <>
          <SentenceList34 items={FACT_VS_PREDICT_S10} drv={drvRows} tone="info" />
          <div className="mt-3 rounded-2xl border border-violet-200 bg-violet-50/70 p-3">
            <div className="mb-1 text-[12px] font-black text-violet-900">
              <Rich text="سؤال IQ200:" />
            </div>
            <MatchRows34 rows={[IQ_FACT_ROW_S10]} drv={drvIq} optionDir="ltr" />
          </div>
        </>
      }
      platform="قسم المصدر يسرد إجابة سؤال IQ200 بعد السؤال — تُكشف داخل التفاعل بعد اختيارك الصحيح فقط."
    />
  );
}

/* ---------- s11: عرض المساعدة ---------- */
function StepS11() {
  const drv = useGate34(OFFER_EXAMPLES_S11.length);
  return (
    <StepShell34
      sid="s11"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <SentenceList34 items={OFFER_EXAMPLES_S11} drv={drv} />
          <Note34>
            <Rich text="لاحظ أن هذه الجمل تجمع بين القرار اللحظي وعرض المساعدة." />
          </Note34>
        </>
      }
    />
  );
}

/* ---------- s12: Shall I...? ---------- */
function StepS12() {
  const drv = useGate34(SHALL_EXAMPLES_S12.length);
  return (
    <StepShell34
      sid="s12"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="هناك صيغة مفيدة يجب أن تتعرف عليها:" />
            </div>
            <div className="mb-2 rounded-xl bg-teal-700 px-3 py-2 text-center text-[15px] font-black text-white" dir="ltr">
              <En>Shall I + V1...?</En>
            </div>
            <SentenceList34 items={SHALL_EXAMPLES_S12} drv={drv} />
          </div>
          <Note34>
            <Rich text="تستخدم لعرض القيام بشيء، خصوصًا في الإنجليزية البريطانية أو الأسلوب الأكثر رسمية. لا تحتاج الآن إلى دراسة shall بصورة موسعة، لكن من المهم أن تتعرف عليها عندما تراها في حوار." />
          </Note34>
        </>
      }
    />
  );
}

/* ---------- s13: الاستعداد والرفض ---------- */
function StepS13() {
  const drvEx = useGate34(WILLINGNESS_S13.length + REFUSAL_S13.length);
  const drvRows = useGate34(REFUSAL_ROWS_S13.length);
  const done = drvEx.complete >= drvEx.total && drvRows.complete >= drvRows.total;
  return (
    <StepShell34
      sid="s13"
      done={done}
      interaction={
        <>
          <BoardTitle34>
            <Rich text="يمكن أن تعبّر will عن استعداد الشخص لفعل شيء — والأمثلة الأخرى بـ won't:" />
          </BoardTitle34>
          <SentenceList34 items={[...WILLINGNESS_S13, ...REFUSAL_S13]} drv={drvEx} />
          <div className="mt-3">
            <MatchRows34 rows={REFUSAL_ROWS_S13} drv={drvRows} optionDir="ltr" />
          </div>
          <Hint34>
            <Rich text="هذه نقطة متقدمة: won't لا تعني دائمًا مجرد «لن يحدث في المستقبل» — فقد تحمل معنى عدم الاستعداد أو عدم الاستجابة، حسب السياق." />
          </Hint34>
        </>
      }
    />
  );
}

/* ---------- s14: الاختصارات ---------- */
function StepS14() {
  const drvTable = useGate34(CONTRACTIONS_34.length);
  const drvEx = useGate34(CONTRACTION_EXAMPLES_34.length);
  const done = drvTable.complete >= drvTable.total && drvEx.complete >= drvEx.total;
  return (
    <StepShell34
      sid="s14"
      done={done}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="في المحادثات اليومية نستخدم اختصارات will بكثرة — المس كل صف:" />
            </div>
            <Progress34 complete={drvTable.complete} total={drvTable.total} />
            <ContractionGrid34 rows={CONTRACTIONS_34} drv={drvTable} />
          </div>
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="أمثلة — المس كل جملة لكشف ترجمتها:" />
            </BoardTitle34>
            <SentenceList34 items={CONTRACTION_EXAMPLES_34} drv={drvEx} />
          </div>
          <Note34>
            <Rich text="ملاحظة: الاختصار لا يغير المعنى الأساسي للجملة:" />
            <span className="mt-1 block" dir="ltr">
              <LatinRuns text="I will help you. / I'll help you." />
            </span>
            <Rich text="الجملتان تحملان المعنى نفسه." />
          </Note34>
        </>
      }
    />
  );
}

function ContractionGrid34({ rows, drv }: { rows: { full: string; short: string }[]; drv: GateDriver34 }) {
  const [open, setOpen] = useState<boolean[]>(() => rows.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3" dir="ltr">
      {rows.map((r, i) => (
        <button
          key={r.full}
          type="button"
          data-contraction={r.short}
          onClick={() => {
            if (open[i]) return;
            setOpen((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }}
          aria-pressed={open[i]}
          className={`${FOCUS34} rounded-xl border-2 px-2.5 py-2 text-left transition ${
            open[i] ? "border-emerald-400 bg-emerald-50" : "border-stone-200 bg-white hover:border-teal-400"
          }`}
        >
          <span className="block text-[13px] font-black text-stone-900" dir="ltr">
            <LatinRuns text={r.full} />
          </span>
          <span aria-hidden className="mx-1 text-stone-400">
            →
          </span>
          <span className={`text-[13px] font-black ${open[i] ? "text-emerald-800" : "text-stone-300"}`} dir="ltr">
            <LatinRuns text={r.short} />
          </span>
        </button>
      ))}
    </div>
  );
}

/* ---------- s15: النفي ---------- */
function StepS15() {
  const drvForm = useGate34(4);
  const drvEx = useGate34(NEG_EXAMPLES_S15.length);
  const done = drvForm.complete >= drvForm.total && drvEx.complete >= drvEx.total;
  return (
    <StepShell34
      sid="s15"
      done={done}
      interaction={
        <>
          <FormulaBoard34
            title="المس كل جزء من صيغة النفي:"
            parts={[
              { text: "Subject", role: "subject" },
              { text: "+", role: "op" },
              { text: "will not", role: "aux" },
              { text: "+", role: "op" },
              { text: "V1", role: "verb" },
            ]}
            note="الاختصار: will not = won't"
            drv={drvForm}
          />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="أمثلة — المس كل جملة لكشف ترجمتها:" />
            </BoardTitle34>
            <SentenceList34 items={NEG_EXAMPLES_S15} drv={drvEx} />
          </div>
          <Note34>
            <Rich text="will نفسها فعل مساعد، لذلك لا نحتاج do أو does لتكوين النفي." />
          </Note34>
        </>
      }
    />
  );
}

/* ---------- s16: أخطاء النفي الشائعة ---------- */
function StepS16() {
  const drv = useGate34(NEG_ERROR_PAIRS_S16.length);
  return (
    <StepShell34
      sid="s16"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <PairPick34 pairs={NEG_ERROR_PAIRS_S16} drv={drv} intro="اختر الجملة السليمة في كل زوج:" />
          <Note34>
            <Rich text="السبب: will نفسها فعل مساعد، لذلك لا نحتاج do أو does لتكوين النفي." />
          </Note34>
        </>
      }
    />
  );
}

/* ---------- s17: تكوين السؤال ---------- */
function StepS17() {
  const drvForm = useGate34(5);
  const drvEx = useGate34(QUESTION_EXAMPLES_S17.length);
  const done = drvForm.complete >= drvForm.total && drvEx.complete >= drvEx.total;
  return (
    <StepShell34
      sid="s17"
      done={done}
      interaction={
        <>
          <FormulaBoard34
            title="المس كل جزء من صيغة السؤال:"
            parts={[
              { text: "Will", role: "aux" },
              { text: "+", role: "op" },
              { text: "Subject", role: "subject" },
              { text: "+", role: "op" },
              { text: "V1", role: "verb" },
              { text: "+", role: "op" },
              { text: "Rest", role: "rest" },
              { text: "?", role: "op" },
            ]}
            note="في الجملة المثبتة: She will join us. — عند تكوين السؤال نضع will قبل الفاعل: Will she join us?"
            drv={drvForm}
          />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="أمثلة — المس كل سؤال لكشف ترجمته:" />
            </BoardTitle34>
            <SentenceList34 items={QUESTION_EXAMPLES_S17} drv={drvEx} />
          </div>
        </>
      }
    />
  );
}

/* ---------- s18: الإجابات القصيرة ---------- */
function StepS18() {
  const drv = useGate34(SHORT_ROWS_S18.length);
  return (
    <StepShell34
      sid="s18"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <MatchRows34 rows={SHORT_ROWS_S18} drv={drv} optionDir="ltr" />
          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-3">
            <div className="mb-1 text-[12px] font-black text-amber-900">
              <Rich text="انتبه:" />
            </div>
            <div className="grid gap-1" dir="ltr">
              <div className="rounded-lg bg-white px-2 py-1 text-[13px] font-bold text-emerald-800">
                <LatinRuns text="Yes, I will. ✅" />
              </div>
              <div className="rounded-lg bg-white px-2 py-1 text-[13px] font-bold text-rose-800">
                <LatinRuns text="Yes, I do. ❌" />
              </div>
              <div className="rounded-lg bg-white px-2 py-1 text-[13px] font-bold text-emerald-800">
                <LatinRuns text="No, she won't. ✅" />
              </div>
              <div className="rounded-lg bg-white px-2 py-1 text-[13px] font-bold text-rose-800">
                <LatinRuns text="No, she doesn't. ❌" />
              </div>
            </div>
            <div className="mt-1 text-[12px] leading-6 text-amber-900">
              <Rich text="لأن السؤال بدأ بـ will." />
            </div>
          </div>
        </>
      }
    />
  );
}

/* ---------- s19: أسئلة Wh ---------- */
function StepS19() {
  const drv = useGate34(WH_WORDS_S19.length);
  return (
    <StepShell34
      sid="s19"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <WhBoard34 words={WH_WORDS_S19} drv={drv} />
          <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-3 text-center">
            <div className="text-[15px] font-black text-teal-900" dir="ltr">
              <En>Wh-word + will + Subject + V1?</En>
            </div>
            <div className="mt-1 text-[12px] text-stone-500">
              <Rich text="القاعدة العامة" />
            </div>
          </div>
        </>
      }
    />
  );
}

/* ---------- s20: عندما تكون WHO هي الفاعل ---------- */
function StepS20() {
  const drv = useGate34(WHO_COMPARE_S20.length);
  return (
    <StepShell34
      sid="s20"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="قارن — المس كل سؤال لكشف تحليل الفاعل:" />
            </div>
            <Progress34 complete={drv.complete} total={drv.total} />
            <div className="grid gap-2 sm:grid-cols-2">
              {WHO_COMPARE_S20.map((w, i) => (
                <WhoCard34 key={w.en} item={w} index={i} drv={drv} />
              ))}
            </div>
          </div>
          <Note34>
            <Rich text="لاحظ اختلاف المعنى رغم استخدام will في الجملتين." />
          </Note34>
        </>
      }
    />
  );
}

function WhoCard34({
  item,
  index,
  drv,
}: {
  item: { en: string; ar: string; who: string };
  index: number;
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      data-who={item.en}
      onClick={() => {
        if (open) return;
        setOpen(true);
        drv.onDone(index === 1 ? true : false);
      }}
      aria-pressed={open}
      className={`${FOCUS34} rounded-2xl border-2 p-3 text-right transition ${
        open ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
      }`}
    >
      <span className="block text-[13px] font-black text-stone-900" dir="ltr">
        <LatinRuns text={item.en} />
      </span>
      {open ? (
        <>
          <span className="mt-0.5 block text-[12px] text-stone-600" dir="rtl">
            <Rich text={item.ar} />
          </span>
          <span className="mt-1 block rounded-lg bg-sky-50 px-2 py-1 text-[12px] leading-6 text-sky-900" dir="rtl">
            <Rich text={item.who} />
          </span>
        </>
      ) : (
        <span className="mt-0.5 block text-[11px] text-stone-400" dir="rtl">
          <Rich text="المس لكشف التحليل…" />
        </span>
      )}
    </button>
  );
}

/* ---------- s21: الكلمات والتعبيرات الزمنية ---------- */
function StepS21() {
  const drvWords = useGate34(TIME_WORDS_S21.length);
  const drvEx = useGate34(TIME_EXAMPLES_S21.length);
  const done = drvWords.complete >= drvWords.total && drvEx.complete >= drvEx.total;
  return (
    <StepShell34
      sid="s21"
      done={done}
      interaction={
        <>
          <WordGrid34 words={TIME_WORDS_S21} drv={drvWords} />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="أمثلة — المس كل جملة لكشف ترجمتها:" />
            </BoardTitle34>
            <SentenceList34 items={TIME_EXAMPLES_S21} drv={drvEx} />
          </div>
        </>
      }
    />
  );
}

/* ---------- s22: لا تجعل الكلمات الدالة تتحكم بك ---------- */
function StepS22() {
  const drv = useGate34(CUE_WARNING_ROWS_S22.length);
  return (
    <StepShell34
      sid="s22"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[13px] leading-6 text-stone-800" dir="auto">
              <LatinRuns text="I am meeting my teacher tomorrow." />
            </div>
            <SentenceList34
              items={[{ en: "I am meeting my teacher tomorrow.", ar: "هذه جملة صحيحة، وتستخدم Present Continuous للتعبير عن ترتيب مستقبلي." }]}
            />
          </div>
          <div className="mt-3">
            <MatchRows34 rows={CUE_WARNING_ROWS_S22} drv={drv} optionDir="ltr" />
          </div>
          <Hint34>
            <Rich text="إذن: الكلمة الزمنية تخبرنا متى سيحدث الشيء — لكن اختيار الصيغة يعتمد أيضًا على نوع المعنى الذي نريد التعبير عنه." />
          </Hint34>
        </>
      }
    />
  );
}

/* ---------- s23: WILL vs BE GOING TO ---------- */
function StepS23() {
  const drvSit = useGate34(GOING_TO_SITUATIONS_S23.length);
  const drvRows = useGate34(GOING_TO_ROWS_S23.length);
  const done = drvSit.complete >= drvSit.total && drvRows.complete >= drvRows.total;
  return (
    <StepShell34
      sid="s23"
      done={done}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="المقارنة ستكون موضوعًا مهمًا في الدرس القادم — المس كل موقف:" />
            </div>
            <Progress34 complete={drvSit.complete} total={drvSit.total} />
            <SituationCards34 items={GOING_TO_SITUATIONS_S23} drv={drvSit} />
          </div>
          <div className="mt-3">
            <MatchRows34 rows={GOING_TO_ROWS_S23} drv={drvRows} optionDir="ltr" />
          </div>
          <Hint34>
            <Rich text="مهم: هذه فروق تعليمية شائعة وليست حدودًا مطلقة بين الصيغتين. توجد سياقات يمكن فيها استخدام أكثر من صيغة، وسنفهم ذلك بالتفصيل في الدرس 35." />
          </Hint34>
        </>
      }
    />
  );
}

function SituationCards34({
  items,
  drv,
}: {
  items: { ar: string; en: string; form: string; why: string }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === items.length) drv.onDone(true);
  }, [count, items.length, drv]);
  return (
      <div className="grid gap-2 sm:grid-cols-2">
      {items.map((s, i) => (
        <button
          key={s.en}
          type="button"
          data-going={i}
          data-going-form={s.form}
          onClick={() => {
            if (open[i]) return;
            setOpen((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }}
          aria-pressed={open[i]}
          className={`${FOCUS34} rounded-2xl border-2 p-3 text-right transition ${
            open[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
          }`}
        >
          <span className="block text-[12px] leading-6 text-stone-700" dir="auto">
            <LatinRuns text={s.ar} />
          </span>
          {open[i] ? (
            <>
              <span className="mt-1 block text-[13px] font-black text-emerald-900" dir="ltr">
                <LatinRuns text={s.en} />
              </span>
              <span className="mt-1 block rounded-lg bg-sky-50 px-2 py-1 text-[12px] leading-6 text-sky-900" dir="rtl">
                <Rich text={s.why} />
              </span>
            </>
          ) : (
            <span className="mt-0.5 block text-[11px] text-stone-400" dir="rtl">
              <Rich text="المس لكشف الصيغة المناسبة…" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ---------- s24: خطأ شائع: WILL مع الزمن الماضي ---------- */
function StepS24() {
  const drvPairs = useGate34(PAST_ERROR_PAIRS_S24.length);
  const drvChain = useGate34(IRREGULAR_CHAIN_S24.length);
  const done = drvPairs.complete >= drvPairs.total && drvChain.complete >= drvChain.total;
  return (
    <StepShell34
      sid="s24"
      done={done}
      interaction={
        <>
          <PairPick34 pairs={PAST_ERROR_PAIRS_S24} drv={drvPairs} intro="اختر الجملة الصحيحة في كل زوج:" />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="حتى الأفعال الشاذة تعود إلى V1 بعد will — المس السلسلة:" />
            </BoardTitle34>
            <IrregularChain34 items={IRREGULAR_CHAIN_S24} drv={drvChain} />
          </div>
        </>
      }
    />
  );
}

function IrregularChain34({
  items,
  drv,
}: {
  items: { v1: string; v2: string; v3: string; right: string; wrong: string[] }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === items.length) drv.onDone(true);
  }, [count, items.length, drv]);
  return (
    <div className="space-y-2">
      {items.map((c, i) => (
        <button
          key={c.v1}
          type="button"
          data-chain={c.v1}
          onClick={() => {
            if (open[i]) return;
            setOpen((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }}
          aria-pressed={open[i]}
          className={`${FOCUS34} w-full rounded-2xl border-2 p-3 text-right transition ${
            open[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
          }`}
        >
          <span className="block text-[13px] font-black text-stone-900" dir="ltr">
            <LatinRuns text={`${c.v1} → ${c.v2} → ${c.v3}`} />
          </span>
          {open[i] ? (
            <span className="mt-1 flex flex-wrap items-center gap-2" dir="ltr">
              <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[13px] font-bold text-emerald-800">
                <LatinRuns text={c.right} />
              </span>
              {c.wrong.map((w) => (
                <span key={w} className="rounded-lg bg-rose-50 px-2 py-1 text-[13px] font-bold text-rose-800 line-through">
                  <LatinRuns text={w} />
                </span>
              ))}
            </span>
          ) : (
            <span className="mt-0.5 block text-[11px] text-stone-400" dir="rtl">
              <Rich text="المس لكشف الصيغة الصحيحة بعد will…" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ---------- s25: WILL + BE ---------- */
function StepS25() {
  const drvEx = useGate34(BE_EXAMPLES_S25.length);
  const drvPairs = useGate34(BE_ERROR_PAIRS_S25.length);
  const done = drvEx.complete >= drvEx.total && drvPairs.complete >= drvPairs.total;
  return (
    <StepShell34
      sid="s25"
      done={done}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="عندما نريد وصف حالة مستقبلية، نستخدم:" />
            </div>
            <div className="mb-2 rounded-xl bg-teal-700 px-3 py-2 text-center text-[15px] font-black text-white" dir="ltr">
              <En>will be</En>
            </div>
            <SentenceList34 items={BE_EXAMPLES_S25} drv={drvEx} />
          </div>
          <div className="mt-3">
            <PairPick34 pairs={BE_ERROR_PAIRS_S25} drv={drvPairs} intro="لا تقل / ولا تقل — اختر الجملة الصحيحة:" />
          </div>
          <Note34>
            <Rich text="السبب: بعد will نستخدم الشكل الأساسي be، وليس am أو is أو are." />
          </Note34>
        </>
      }
    />
  );
}

/* ---------- s26: المقارنة مع Verb to be ---------- */
function StepS26() {
  const drv = useGate34(BE_TABLE_S26.length);
  return (
    <StepShell34
      sid="s26"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="المس كل صف لتقارن الحاضر والماضي والمستقبل:" />
            </div>
            <Progress34 complete={drv.complete} total={drv.total} />
            <BeTable34 rows={BE_TABLE_S26} drv={drv} />
          </div>
          <Note34>
            <Rich text="لاحظ كيف أصبحت الصيغة واحدة مع جميع الضمائر: will be — وهذا يجعل بناء المستقبل أبسط من بعض الأزمنة السابقة." />
          </Note34>
        </>
      }
    />
  );
}

function BeTable34({
  rows,
  drv,
}: {
  rows: { pronoun: string; present: string; past: string; future: string }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => rows.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {rows.map((r, i) => (
        <button
          key={r.pronoun}
          type="button"
          data-be-row={r.pronoun}
          onClick={() => {
            if (open[i]) return;
            setOpen((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }}
          aria-pressed={open[i]}
          className={`${FOCUS34} rounded-2xl border-2 p-3 text-right transition ${
            open[i] ? "border-teal-600 bg-teal-50" : "border-stone-200 bg-white hover:border-teal-400"
          }`}
        >
          <span className="block text-[13px] font-black text-stone-900" dir="ltr">
            <En>{r.pronoun}</En>
          </span>
          {open[i] ? (
            <span className="mt-1 grid gap-1" dir="ltr">
              <span className="rounded-lg bg-stone-50 px-2 py-1 text-[12px] font-bold text-stone-700">
                <LatinRuns text={r.present} />
              </span>
              <span className="rounded-lg bg-stone-50 px-2 py-1 text-[12px] font-bold text-stone-700">
                <LatinRuns text={r.past} />
              </span>
              <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[12px] font-bold text-emerald-800">
                <LatinRuns text={r.future} />
              </span>
            </span>
          ) : (
            <span className="mt-0.5 block text-[11px] text-stone-400" dir="rtl">
              <Rich text="المس لمقارنة الأزمنة الثلاثة…" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ---------- s27: حوار The School Project ---------- */
function StepS27() {
  const drvDialogue = useGate34(DIALOGUE_PROJECT_S27.length);
  const drvAnalysis = useGate34(USE_ANALYSIS_S27.length);
  const done = drvDialogue.complete >= drvDialogue.total && drvAnalysis.complete >= drvAnalysis.total;
  return (
    <StepShell34
      sid="s27"
      done={done}
      interaction={
        <>
          <DialogueReader34 lines={DIALOGUE_PROJECT_S27} drv={drvDialogue} label="اقرأ الحوار التالي — المس كل سطر لكشف ترجمته:" />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="حلّل الاستخدامات — حدّد وظيفة will في كل عبارة:" />
            </BoardTitle34>
            <AnalysisRows34 rows={USE_ANALYSIS_S27} drv={drvAnalysis} />
          </div>
        </>
      }
    />
  );
}

function AnalysisRows34({
  rows,
  drv,
}: {
  rows: { phrase: string; options: string[]; pick: number; why: string }[];
  drv: GateDriver34;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].pick);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-2">
      <Progress34 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={row.phrase} data-row={i} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="mb-2 rounded-lg bg-teal-50 px-2 py-1 text-[13px] font-black text-teal-900" dir="ltr">
            <LatinRuns text={row.phrase} />
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
                  data-row={i}
                  data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    setPicks((prev) => {
                      const next = [...prev];
                      next[i] = oi;
                      return next;
                    });
                  }}
                  aria-pressed={chosen}
                  className={`${FOCUS34} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-300 bg-rose-50 text-rose-800"
                        : chosen
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
                  }`}
                >
                  <Rich text={opt} />
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict34 tone="good">{row.why}</Verdict34> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- s28: تمرين تأسيسي ---------- */
function StepS28() {
  const drv = useGate34(MC_ROWS_S28.length);
  const cut = cutAt("s28", "الإجابات:");
  return (
    <StepShell34
      sid="s28"
      done={drv.complete >= drv.total}
      board={<SourceBoard34 id="s28" to={cut} />}
      interaction={<Choice34 rows={MC_ROWS_S28} drv={drv} idPrefix="s28" />}
      platform="قسم المصدر يسرد إجابات التمرين وتفسيره المشترك بعد الأسئلة — تُكشف داخل التفاعل بعد اختيارك الصحيح فقط."
    />
  );
}

/* ---------- s29: تمرين التحويلات ---------- */
function StepS29() {
  const drv = useGate34(TRANSFORM_ROWS_S29.length * 2);
  const cut = cutAt("s29", "الحلول التفصيلية");
  return (
    <StepShell34
      sid="s29"
      done={drv.complete >= drv.total}
      board={<SourceBoard34 id="s29" to={cut} />}
      interaction={<TransformDrill34 rows={TRANSFORM_ROWS_S29} drv={drv} />}
      platform="الحلول التفصيلية مذكورة في المصدر بعد الجمل الخمس — تُعرض تحت كل فراغ بعد محاولتك الناجحة. لاحظ في الجملة الرابعة أننا استخدمنا be ولم نستخدم is."
    />
  );
}

/* ---------- s30: Grammar Detective ---------- */
function StepS30() {
  const drv = useGate34(DETECTIVE_S30.length);
  const cut = cutAt("s30", "الحلول");
  return (
    <StepShell34
      sid="s30"
      done={drv.complete >= drv.total}
      board={<SourceBoard34 id="s30" to={cut} />}
      interaction={<TapFix34 rounds={DETECTIVE_S30} drv={drv} />}
      platform="الحلول مذكورة في المصدر بعد الجمل العشر — تظهر داخل التفاعل بعد تصحيح كل قضية."
    />
  );
}

/* ---------- s31: IQ200 — اختر WILL بحسب الموقف ---------- */
function StepS31() {
  const drv = useGate34(IQ_SITUATIONS_S31.length);
  const cut = cutAt("s31", "الحل:");
  return (
    <StepShell34
      sid="s31"
      done={drv.complete >= drv.total}
      board={<SourceBoard34 id="s31" to={cut} />}
      interaction={<IqSituations34 items={IQ_SITUATIONS_S31} drv={drv} />}
      platform="الحلول وإجاباتها الممكنة مذكورة في المصدر بعد كل موقف — اكتب ردك أولًا ثم قارن."
    />
  );
}

/* ---------- s32: Reading Challenge ---------- */
function StepS32() {
  const drvStory = useGate34(STORY_HITS_S32);
  const drvQs = useGate34(COMPREHENSION_S32.length);
  const done = drvStory.complete >= drvStory.total && drvQs.complete >= drvQs.total;
  const cut = cutAt("s32", "الحلول");
  return (
    <StepShell34
      sid="s32"
      done={done}
      board={
        <>
          <SourceBoard34 id="s32" to={cut} />
          <Platform34>حلول أسئلة الفهم والتحليل النحوي مذكوران في المصدر بعد الأسئلة — تُعرض بعد محاولتك.</Platform34>
        </>
      }
      interaction={
        <>
          <StoryHunt34 story={STORY_S32} total={STORY_HITS_S32} drv={drvStory} />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="أسئلة الفهم — اختر الإجابة الصحيحة:" />
            </BoardTitle34>
            <ReadingQuiz34 rows={COMPREHENSION_S32} drv={drvQs} />
          </div>
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="التحليل النحوي — بعد إجاباتك:" />
            </BoardTitle34>
            <SentenceList34 items={STORY_ANALYSIS_S32} />
          </div>
        </>
      }
    />
  );
}

function ReadingQuiz34({
  rows,
  drv,
}: {
  rows: { n: string; q: string; options: string[]; answer: number; why: string }[];
  drv: GateDriver34;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => rows.map(() => null));
  const done = picks.map((p, i) => p === rows[i].answer);
  const count = done.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-2">
      <Progress34 complete={count} total={rows.length} />
      {rows.map((row, i) => (
        <div key={row.n} data-row={i} className="rounded-2xl border border-stone-200 bg-white p-3">
          <div className="mb-2 text-[13px] font-bold leading-6 text-stone-800" dir="auto">
            <span className="ml-1 font-black text-teal-700">{row.n}</span>
            <LatinRuns text={row.q} />
          </div>
          <div className="grid gap-1.5">
            {row.options.map((opt, oi) => {
              const chosen = picks[i] === oi;
              const solved = done[i];
              const isRight = solved && oi === row.answer;
              const isWrongPicked = chosen && oi !== row.answer;
              return (
                <button
                  key={oi}
                  type="button"
                  data-row={i}
                  data-row-opt={oi}
                  disabled={solved}
                  onClick={() => {
                    setPicks((prev) => {
                      const next = [...prev];
                      next[i] = oi;
                      return next;
                    });
                  }}
                  aria-pressed={chosen}
                  className={`${FOCUS34} rounded-xl border-2 px-3 py-2 text-right text-[13px] font-bold leading-6 transition ${
                    isRight
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isWrongPicked
                        ? "border-rose-300 bg-rose-50 text-rose-800"
                        : chosen
                          ? "border-teal-600 bg-teal-50 text-teal-900"
                          : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
                  }`}
                >
                  <span dir="ltr" className="block">
                    <LatinRuns text={opt} />
                  </span>
                </button>
              );
            })}
          </div>
          {done[i] ? <Verdict34 tone="good">{row.why}</Verdict34> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- s33: مقارنة الأزمنة ---------- */
function StepS33() {
  const drvTable = useGate34(TENSE_COMPARE_S33.length);
  const drvRows = useGate34(TENSE_COMPARE_ROWS_S33.length);
  const done = drvTable.complete >= drvTable.total && drvRows.complete >= drvRows.total;
  return (
    <StepShell34
      sid="s33"
      done={done}
      interaction={
        <>
          <div className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="mb-2 text-[12px] font-black text-stone-600">
              <Rich text="أكمل الجدول ذهنيًا باستخدام الفعل solve — المس كل صف:" />
            </div>
            <Progress34 complete={drvTable.complete} total={drvTable.total} />
            <TenseTable34 rows={TENSE_COMPARE_S33} drv={drvTable} />
          </div>
          <div className="mt-3">
            <MatchRows34 rows={TENSE_COMPARE_ROWS_S33} drv={drvRows} optionDir="ltr" />
          </div>
          <Note34>
            <Rich text="لاحظ أن اختيار الزمن يعتمد على المعنى الذي نريد نقله. الجملة الأخيرة لا تعني أن المشكلة حُلّت فعلًا — بل تعبّر عن شيء مستقبلي." />
          </Note34>
        </>
      }
    />
  );
}

function TenseTable34({
  rows,
  drv,
}: {
  rows: { tense: string; sentence: string }[];
  drv: GateDriver34;
}) {
  const [open, setOpen] = useState<boolean[]>(() => rows.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === rows.length) drv.onDone(true);
  }, [count, rows.length, drv]);
  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => (
        <button
          key={r.tense}
          type="button"
          data-tense-row={r.tense}
          onClick={() => {
            if (open[i]) return;
            setOpen((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }}
          aria-pressed={open[i]}
          className={`${FOCUS34} w-full rounded-xl border-2 px-3 py-2 text-right transition ${
            open[i] ? "border-emerald-300 bg-emerald-50" : "border-stone-200 bg-white hover:border-teal-400"
          }`}
        >
          <span className="block text-[12px] font-black text-stone-600" dir="ltr">
            <LatinRuns text={r.tense} />
          </span>
          {open[i] ? (
            <span className="block text-[13px] font-bold text-emerald-900" dir="ltr">
              <LatinRuns text={r.sentence} />
            </span>
          ) : (
            <span className="block text-[11px] text-stone-400" dir="rtl">
              <Rich text="المس لكشف الجملة…" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ---------- s34: الاختبار النهائي ---------- */
function StepS34({ onGoTest }: { onGoTest?: () => void }) {
  const drv = useGate34(LEVELS_S34.length);
  return (
    <StepShell34
      sid="s34"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <FlipCards34
            cards={LEVELS_S34}
            drv={drv}
            renderFace={(c: { level: string; title: string; range: string }) => (
              <span>
                المستوى {c.level} — <Rich text={c.title} />
                <span className="mt-1 block text-[11px] font-normal text-stone-500">{c.range}</span>
              </span>
            )}
            renderBack={(c: { back: string }) => (
              <span dir="auto">
                <Rich text={c.back} />
              </span>
            )}
          />
          {onGoTest ? (
            <button
              type="button"
              onClick={onGoTest}
              className={`${FOCUS34} l34-submit mt-4 w-full`}
            >
              🧪 الذهاب إلى الاختبار — Future Simple Master Test (25 سؤالًا)
            </button>
          ) : null}
        </>
      }
    />
  );
}

/* ---------- s35: مساحة الحلول ---------- */
function StepS35({ onGoSolutions }: { onGoSolutions?: () => void }) {
  const drv = useGate34(SOLUTION_GATE_ROWS_S35.length);
  return (
    <StepShell34
      sid="s35"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <div className="l34-locked mb-3">
            <div aria-hidden className="text-3xl">
              🔐
            </div>
            <div className="mt-1 text-[14px] font-black text-stone-800">
              <Rich text="الحلول مقفلة حتى إرسال الاختبار" />
            </div>
            <div className="mt-1 text-[12px] leading-6 text-stone-600">
              <Rich text="مفتاح تصحيح «الاختبار النهائي» التفصيلي يعيش في منطقة الحلول — ولا يُفتح إلا بعد إرسال إجاباتك الخمس والعشرين دفعة واحدة." />
            </div>
            {onGoSolutions ? (
              <button
                type="button"
                onClick={onGoSolutions}
                className={`${FOCUS34} l34-back mt-3`}
              >
                🗝️ فتح منطقة الحلول
              </button>
            ) : null}
          </div>
          <MatchRows34 rows={SOLUTION_GATE_ROWS_S35} drv={drv} optionDir="ltr" />
        </>
      }
    />
  );
}

/* ---------- s36: Final Boss ---------- */
function StepS36() {
  const drv = useGate34(WRITE_CHECK_S36.length + WRITE_MIN_SENTENCES_36);
  return (
    <StepShell34
      sid="s36"
      done={drv.complete >= drv.total}
      interaction={
        <WriteMission34
          checklist={WRITE_CHECK_S36}
          model={WRITE_MODEL_S36}
          min={WRITE_MIN_SENTENCES_36}
          max={WRITE_MAX_SENTENCES_36}
          drv={drv}
        />
      }
      platform="المثال الافتتاحي منقول حرفيًا من المصدر («مثال افتتاحي فقط») — أكمل بأفكارك الخاصة، ولا تكتفِ بتغيير كلمات المثال."
    />
  );
}

/* ---------- s37: الملخص الذهبي ---------- */
function StepS37() {
  const drvFlips = useGate34(GOLDEN_FLIPS_S37.length);
  const drvUses = useGate34(GOLDEN_USES_S37.length);
  const done = drvFlips.complete >= drvFlips.total && drvUses.complete >= drvUses.total;
  return (
    <StepShell34
      sid="s37"
      done={done}
      interaction={
        <>
          <FlipCards34
            cards={GOLDEN_FLIPS_S37}
            drv={drvFlips}
            renderFace={(c: { face: string }) => (
              <span dir="ltr" className="block">
                <LatinRuns text={c.face} />
              </span>
            )}
            renderBack={(c: { back: string }) => (
              <span dir="auto">
                <Rich text={c.back} />
              </span>
            )}
          />
          <div className="mt-3">
            <BoardTitle34>
              <Rich text="أهم استخدامات will — المس كل استخدام:" />
            </BoardTitle34>
            <Chips34 items={GOLDEN_USES_S37} drv={drvUses} />
          </div>
          <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-7 text-amber-900">
            <span className="font-black">⭐ القاعدة الذهبية: </span>
            <Rich text={GOLDEN_RULE_S37} />
          </div>
        </>
      }
    />
  );
}

function Chips34({ items, drv }: { items: string[]; drv: GateDriver34 }) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => false));
  const count = open.filter(Boolean).length;
  useEffect(() => {
    if (count === items.length) drv.onDone(true);
  }, [count, items.length, drv]);
  return (
    <div>
      <Progress34 complete={count} total={items.length} />
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <button
            key={it}
            type="button"
            data-use-chip={i}
            onClick={() => {
              if (open[i]) return;
              setOpen((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }}
            aria-pressed={open[i]}
            className={`${FOCUS34} rounded-full border-2 px-3 py-1.5 text-[12px] font-bold transition ${
              open[i] ? "border-teal-600 bg-teal-50 text-teal-900" : "border-stone-200 bg-white text-stone-800 hover:border-teal-400"
            }`}
          >
            <Rich text={it} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- s38: خريطة تقدم المنهج ---------- */
function StepS38() {
  const drv = useGate34(1);
  return (
    <StepShell34
      sid="s38"
      done={drv.complete >= drv.total}
      interaction={
        <>
          <CourseMap34
            map={COURSE_MAP_S38}
            roadmap={FUTURE_ROADMAP_S38}
            next="الدرس القادم 35: BE GOING TO — الخطط والنوايا والتوقعات المبنية على أدلة."
          />
          <div className="mt-3">
            <MatchRows34 rows={[NEXT_STOP_ROW_S38]} drv={drv} optionDir="ltr" />
          </div>
          <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-teal-50 px-4 py-3 text-[13px] leading-7 text-teal-900">
            <span className="font-black">🔥 تذكّر: </span>
            <Rich text="إتقان الإنجليزية لا يعني أن تحفظ أكبر عدد من القواعد، بل أن تفهم لماذا اختار المتحدث هذه الصيغة تحديدًا دون غيرها." />
          </div>
        </>
      }
    />
  );
}
