import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { En33, Text33, Lens33, TONE33, FOCUS33, PlatformTag33, Note33, TENSES_33, tenseById33, type TenseId33 } from "./design33";
import {
  MENTAL_MODEL_33,
  WORK_FORMS_33,
  NORA_ROWS_33,
  PROJECT_OPTIONS_33,
  SHORT_ANSWERS_33,
  AUX_PAIRS_33,
  SIGNAL_WORDS_33,
  SIGNAL_AMBIGUOUS_33,
  DUEL1_CHALLENGE_33,
  QUESTION_MATCH_33,
  QUESTION_MATCH_EXTRA_33,
  FOCUS_ROWS_33,
  FOCUS_LIVED_33,
  STATIVE_VERBS_33,
  THINK_SPLIT_33,
  DETECTIVE_33,
  ALL_PRACTICE_33,
  BOTH_CORRECT_33,
  STORY_PARAGRAPHS_33,
  STORY_TITLE_33,
  STORY_PHRASES_33,
  STORY_ROWS_33,
  STORY_ANALYSIS_HEAD_33,
  PARAGRAPH_SENTENCES_33,
  PARAGRAPH_RIGHT_SENTENCES_33,
  PARAGRAPH_SPOTS_33,
  SITUATIONS_33,
  GOLDEN_SENTENCES_33,
  GOLDEN_QUESTIONS_33,
  PROGRESS_PRESENT_33,
  PROGRESS_PAST_33,
  WRITING_CRITERIA_33,
  WRITING_MIN_SENTENCES_33,
  WRITING_MAX_SENTENCES_33,
  STORY_LEAD_33,
  normalize33,
  DUEL1_PAIRS_33,
  CIRCLED_33,
} from "./practice33";

// ============================================================
// مساحة عمل مشتركة بين الشرائح: تسجّل محاولات الطالب حتى تعمل البوابات
// (كشف الحل بعد المحاولة) عبر الشرائح المختلفة دون تكرار المحتوى.
// ============================================================
type Workspace33Value = {
  attempted: Record<string, boolean>;
  responses: Record<string, string>;
  mark: (id: string, response?: string) => void;
  isDone: (id: string) => boolean;
  doneCount: (ids: string[]) => number;
  reset: () => void;
};

const WorkspaceContext33 = createContext<Workspace33Value>({
  attempted: {},
  responses: {},
  mark: () => {},
  isDone: () => false,
  doneCount: () => 0,
  reset: () => {},
});

export function Workspace33Provider({ children }: { children: ReactNode }) {
  const [attempted, setAttempted] = useState<Record<string, boolean>>({});
  const [responses, setResponses] = useState<Record<string, string>>({});
  const value = useMemo<Workspace33Value>(
    () => ({
      attempted,
      responses,
      mark: (id, response) => {
        setAttempted((current) => ({ ...current, [id]: true }));
        if (response !== undefined) setResponses((current) => ({ ...current, [id]: response }));
      },
      isDone: (id) => Boolean(attempted[id]),
      doneCount: (ids) => ids.filter((id) => attempted[id]).length,
      reset: () => {
        setAttempted({});
        setResponses({});
      },
    }),
    [attempted, responses],
  );
  return <WorkspaceContext33.Provider value={value}>{children}</WorkspaceContext33.Provider>;
}

export function useWorkspace33() {
  return useContext(WorkspaceContext33);
}

// ============================================================
// عناصر تفاعل صغيرة مشتركة
// ============================================================
export function Counter33({ done, total, label }: { done: number; total: number; label: string }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3" data-counter={label}>
      <div className="flex items-center justify-between text-sm font-bold text-slate-600">
        <Text33 text={label} />
        <bdi dir="ltr">
          {done} / {total}
        </bdi>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
        <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-amber-400 to-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ChoiceChip({
  active,
  onClick,
  children,
  tone = "slate",
  disabled,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  tone?: keyof typeof TONE33;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={ariaLabel}
      data-active={active ? "true" : undefined}
      className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition disabled:opacity-40 ${FOCUS33} ${
        active ? `${TONE33[tone].solid} text-white border-transparent` : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
      }`}
    >
      {children}
    </button>
  );
}

function TensePicker({ value, onChange, disabled }: { value: TenseId33 | ""; onChange: (tense: TenseId33) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="اختر الزمن">
      {TENSES_33.map((tense) => (
        <ChoiceChip key={tense.id} active={value === tense.id} tone={tense.tone} disabled={disabled} onClick={() => onChange(tense.id)}>
          <span aria-hidden="true">{tense.emoji}</span> <En33 className="text-xs font-extrabold">{tense.en}</En33>
        </ChoiceChip>
      ))}
    </div>
  );
}

function VerdictCard({ correct, children }: { correct: boolean; children: ReactNode }) {
  return (
    <div className={`rounded-2xl border-2 p-3 ${correct ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`} data-verdict={correct ? "correct" : "review"}>
      <p className={`text-sm font-extrabold ${correct ? "text-emerald-900" : "text-rose-900"}`}>{correct ? "✓ إجابة صحيحة" : "✕ تحتاج مراجعة"}</p>
      <div className="mt-1 text-sm font-semibold text-slate-700">{children}</div>
    </div>
  );
}

// ============================================================
// بطاقة تدريب/محقّق مقترنة بالمحاولة: لا يظهر الحل قبل الضغط.
// ============================================================
type AttemptItem33 = {
  fields: { key: string; label: string }[];
  answer: string[];
  accept?: string[][];
  tense?: TenseId33 | null;
  reason: string;
  alternatives?: { answer: string; note: string }[];
  provenance: "source" | "platform";
  errorNote?: string;
};

function matchesAttempt33(item: AttemptItem33, responses: string[]): boolean {
  return item.fields.every((field, i) => {
    const value = normalize33(responses[i] ?? "");
    if (!value) return false;
    const pool = [item.answer[i], ...(item.accept?.[i] ?? [])].filter(Boolean).map((entry) => normalize33(entry as string));
    return pool.includes(value);
  });
}

function AttemptCard({ item, prompt, storeId, tag, mark }: { item: AttemptItem33; prompt: ReactNode; storeId: string; tag?: ReactNode; mark?: string }) {
  const workspace = useWorkspace33();
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<boolean | null>(null);
  const filled = item.fields.every((f) => Boolean(values[f.key]?.trim()));
  const done = workspace.isDone(storeId);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4" data-attempt={storeId} data-attempt-done={done ? "true" : undefined}>
      <div className="space-y-1">{prompt}</div>
      {tag && <div className="mt-2">{tag}</div>}

      {!done && (
        <>
          <div className={`mt-3 grid gap-2 ${item.fields.length > 1 ? "md:grid-cols-2" : ""}`.trim()}>
            {item.fields.map((f) => (
              <label key={f.key} className="block text-sm font-bold text-slate-600">
                <Text33 text={f.label} />
                <textarea
                  dir="auto"
                  rows={2}
                  value={values[f.key] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [f.key]: event.target.value }))}
                  className="font-en mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-base font-medium text-slate-800 outline-none transition focus:border-violet-400 focus:bg-white"
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            disabled={!filled}
            onClick={() => {
              setResult(matchesAttempt33(item, item.fields.map((f) => values[f.key] ?? "")));
              workspace.mark(storeId, item.fields.map((f) => values[f.key] ?? "").join(" / "));
            }}
            className={`mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
          >
            <Text33 text="قارن إجابتي بالحل" />
          </button>
          {!filled && (
            <p className="mt-2 text-xs font-semibold text-slate-500">
              <Text33 text="املأ كل الفراغات لتفعيل المقارنة." />
            </p>
          )}
          {result !== null && <div className="mt-3">{result ? <VerdictCard correct>حلّك مطابق.</VerdictCard> : <VerdictCard correct={false}>راجع الحل أدناه.</VerdictCard>}</div>}
        </>
      )}

      {done && (
        <div className="mt-3 space-y-2" data-solution="true">
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
            <p className="text-xs font-extrabold text-emerald-800">
              <Text33 text="الحل" />
            </p>
            <p dir="auto" className="font-en mt-1 text-base font-bold text-emerald-900">
              {mark && <span aria-hidden="true">{mark} </span>}
              {item.answer.join(" / ")}
            </p>
            {item.tense && (
              <p className="mt-2">
                <Lens33 tense={item.tense} />
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <p className="text-xs font-extrabold text-violet-700">
              <Text33 text="لماذا؟" /> {item.provenance === "platform" && <PlatformTag33 />}
            </p>
            <p className="mt-1 text-base leading-8 text-slate-700">
              <Text33 text={item.reason} />
            </p>
          </div>
          {item.errorNote && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3">
              <p className="text-xs font-extrabold text-rose-800">
                <Text33 text="تفسير الخطأ" />
              </p>
              <p className="mt-1 text-base leading-8 text-rose-900">
                <Text33 text={item.errorNote} />
              </p>
            </div>
          )}
          {item.alternatives?.map((alt) => (
            <div key={alt.answer} className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-extrabold text-amber-900">
                <Text33 text="بديل صحيح أيضًا:" /> <En33 className="text-xs">{alt.answer}</En33>
              </p>
              <p className="mt-1 text-sm leading-7 text-amber-900">
                <Text33 text={alt.note} />
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

// ============================================================
// §1c — النموذج الذهني: أربع بطاقات تُقلَب
// ============================================================
export function ModelFlip33() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const opened = MENTAL_MODEL_33.filter((row) => open[row.en]).length;
  const revealAll = () => setOpen(Object.fromEntries(MENTAL_MODEL_33.map((row) => [row.en, true])));
  return (
    <div className="space-y-3" data-lab="model-flip">
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-[12rem] flex-1">
          <Counter33 done={opened} total={MENTAL_MODEL_33.length} label="المعادلات المكشوفة" />
        </div>
        <button
          type="button"
          onClick={revealAll}
          disabled={opened === MENTAL_MODEL_33.length}
          className={`rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="اكشف المعادلات كلها" />
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {MENTAL_MODEL_33.map((row) => {
          const meta = tenseById33(row.tense);
          return (
            <button
              type="button"
              key={row.en}
              onClick={() => setOpen((current) => ({ ...current, [row.en]: !current[row.en] }))}
              aria-expanded={Boolean(open[row.en])}
              data-model-card={meta.id}
              className={`rounded-3xl border-2 p-4 text-right transition ${FOCUS33} ${open[row.en] ? TONE33[meta.tone].soft : "border-slate-200 bg-white hover:border-slate-400"}`}
            >
              <En33 className="text-xl font-extrabold">{row.en}</En33>
              <p className="mt-1 text-lg font-bold text-slate-800">
                <Text33 text={open[row.en] ? `= ${row.ar}` : "= ……"} />
              </p>
              <p className="mt-2 text-xs font-bold opacity-70">
                <Text33 text={open[row.en] ? meta.formula : "اقلب البطاقة لتكشف المعنى"} />
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// §2b — طابق جملة work مع صيغتها
// ============================================================
export function FormMatch33() {
  const [picked, setPicked] = useState<Record<string, TenseId33 | "">>({});
  const [checked, setChecked] = useState(false);
  const all = WORK_FORMS_33.every((row) => picked[row.en]);
  const score = WORK_FORMS_33.filter((row) => picked[row.en] === row.tense).length;
  return (
    <div className="space-y-3" data-lab="form-match">
      {WORK_FORMS_33.map((row) => (
        <div key={row.en} className="rounded-2xl border border-slate-200 bg-white p-3">
          <p dir="ltr" className="font-en text-xl font-extrabold text-slate-900">
            {row.en}
          </p>
          <div className="mt-2">
            <TensePicker
              value={picked[row.en] ?? ""}
              disabled={checked}
              onChange={(tense) => setPicked((current) => ({ ...current, [row.en]: tense }))}
            />
          </div>
          {checked && (
            <p className={`mt-2 text-sm font-bold ${picked[row.en] === row.tense ? "text-emerald-700" : "text-rose-700"}`}>
              <Text33 text={picked[row.en] === row.tense ? "✓ مطابقة صحيحة" : `✕ الزمن الصحيح: ${tenseById33(row.tense).en}`} />
            </p>
          )}
        </div>
      ))}
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من المطابقة" />
        </button>
      ) : (
        <Note33 emoji="🧱">
          <Text33 text={`نتيجتك ${score} من ${WORK_FORMS_33.length}. الجمل الأربع صحيحة، لكنها لا تحمل المعنى نفسه.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §3c — فرز جمل نورا على زوايا النظر
// ============================================================
export function NoraSort33() {
  const [picked, setPicked] = useState<Record<string, TenseId33 | "">>({});
  const [checked, setChecked] = useState(false);
  const all = NORA_ROWS_33.every((row) => picked[row.id]);
  const score = NORA_ROWS_33.filter((row) => picked[row.id] === row.tense).length;
  return (
    <div className="space-y-3" data-lab="nora-sort">
      {NORA_ROWS_33.map((row) => (
        <div key={row.id} className="rounded-2xl border border-slate-200 bg-white p-3">
          <p dir="ltr" className="font-en text-lg font-extrabold text-slate-900">
            {row.en}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            <Text33 text={row.ar} />
          </p>
          <div className="mt-2">
            <TensePicker value={picked[row.id] ?? ""} disabled={checked} onChange={(tense) => setPicked((current) => ({ ...current, [row.id]: tense }))} />
          </div>
          {checked && (
            <div className="mt-2">
              {picked[row.id] === row.tense ? (
                <p className="text-sm font-bold text-emerald-700">
                  <Text33 text={`✓ ${row.angle}`} />
                </p>
              ) : (
                <p className="text-sm font-bold text-rose-700">
                  <Text33 text={`✕ الزاوية الصحيحة: ${row.angle}`} />
                </p>
              )}
            </div>
          )}
        </div>
      ))}
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من الفرز" />
        </button>
      ) : (
        <Note33 emoji="🔬">
          <Text33 text={`نتيجتك ${score} من ${NORA_ROWS_33.length}. لم يتغيّر الفعل الأساسي، تغيّرت زاوية النظر فقط.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §4c — طابق السياق مع الجملة الإنجليزية
// ============================================================
export function ContextMatch33() {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const all = PROJECT_OPTIONS_33.every((row) => picked[row.en]);
  const score = PROJECT_OPTIONS_33.filter((row) => picked[row.en] === row.tense).length;
  return (
    <div className="space-y-3" data-lab="context-match">
      {PROJECT_OPTIONS_33.map((row) => (
        <div key={row.en} className="rounded-2xl border border-slate-200 bg-white p-3">
          <p className="text-xs font-extrabold text-slate-500">
            <Text33 text={row.before} />
          </p>
          <p dir="ltr" className="font-en mt-1 text-lg font-extrabold text-slate-900">
            {row.en}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            <Text33 text={row.ar} />
          </p>
          <div className="mt-2">
            <TensePicker value={(picked[row.en] as TenseId33) ?? ""} disabled={checked} onChange={(tense) => setPicked((current) => ({ ...current, [row.en]: tense }))} />
          </div>
          {checked && (
            <p className={`mt-2 text-sm font-bold ${picked[row.en] === row.tense ? "text-emerald-700" : "text-rose-700"}`}>
              <Text33 text={picked[row.en] === row.tense ? `✓ السياق الحاسم: ${row.context}` : `✕ السياق الحاسم: ${row.context}`} />
            </p>
          )}
        </div>
      ))}
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من السياق" />
        </button>
      ) : (
        <Note33 emoji="🧭">
          <Text33 text={`نتيجتك ${score} من ${PROJECT_OPTIONS_33.length}. السياق هو الذي يحدد الزمن، لا شكل الجملة العربية.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §5d — الإجابات القصيرة
// ============================================================
export function ShortAnswers33() {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const all = SHORT_ANSWERS_33.every((row) => picked[row.id]);
  const score = SHORT_ANSWERS_33.filter((row) => picked[row.id] === "yes").length;
  return (
    <div className="space-y-3" data-lab="short-answers">
      <p className="text-sm font-bold text-slate-600">
        <Text33 text="لكل سؤال اختر الإجابة القصيرة الصحيحة، ثم تحقّق لترى صيغتَي نعم ولا معًا." />
      </p>
      {SHORT_ANSWERS_33.map((row) => {
        const meta = tenseById33(row.tense);
        const open = checked || picked[row.id] === "yes";
        return (
          <div key={row.id} className={`rounded-2xl border-2 p-3 ${TONE33[meta.tone].soft}`}>
            <p dir="ltr" className="font-en text-lg font-extrabold">
              {row.question}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <ChoiceChip active={picked[row.id] === "yes"} tone={meta.tone} disabled={checked} onClick={() => setPicked((c) => ({ ...c, [row.id]: "yes" }))}>
                <En33 className="text-xs">{row.yes}</En33>
              </ChoiceChip>
              <ChoiceChip active={picked[row.id] === "no"} tone={meta.tone} disabled={checked} onClick={() => setPicked((c) => ({ ...c, [row.id]: "no" }))}>
                <En33 className="text-xs">{row.no}</En33>
              </ChoiceChip>
            </div>
            {open && (
              <p className="mt-2 text-sm font-semibold">
                <Text33 text="الإجابتان القصيرتان:" /> <En33 className="text-sm">{row.yes}</En33> · <En33 className="text-sm">{row.no}</En33>
              </p>
            )}
            {checked && (
              <p className="mt-1 text-xs font-bold opacity-80">
                <En33 className="text-xs">{row.remember}</En33>
              </p>
            )}
          </div>
        );
      })}
      {!checked && (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="اعرض الصيغتين لكل زمن" />
        </button>
      )}
      {checked && (
        <Note33 emoji="⚙️">
          <Text33 text={`اخترتَ الإجابة الأولى في ${score} من ${SHORT_ANSWERS_33.length} أسئلة. الإجابة القصيرة تعيد الفعل المساعد نفسه الذي في السؤال.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §6a — أيهما مبنيّة بناءً سليمًا؟
// ============================================================
export function PickCorrect33() {
  const [picked, setPicked] = useState<Record<string, "a" | "b" | "">>({});
  const [checked, setChecked] = useState(false);
  const all = AUX_PAIRS_33.every((row) => picked[row.id]);
  const score = AUX_PAIRS_33.filter((row) => (picked[row.id] === "a") === !row.aWrong).length;
  return (
    <div className="space-y-3" data-lab="pick-correct">
      {AUX_PAIRS_33.map((row) => {
        const rightIsA = !row.aWrong;
        const correct = picked[row.id] === (rightIsA ? "a" : "b");
        return (
          <div key={row.id} className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="grid gap-2 md:grid-cols-2">
              {(["a", "b"] as const).map((side) => {
                const text = side === "a" ? row.a : row.b;
                const wrong = side === "a" ? row.aWrong : row.bWrong;
                const active = picked[row.id] === side;
                const reveal = checked;
                return (
                  <button
                    type="button"
                    key={side}
                    disabled={checked}
                    aria-pressed={active}
                    onClick={() => setPicked((current) => ({ ...current, [row.id]: side }))}
                    data-pick={`${row.id}-${side}`}
                    className={`rounded-2xl border-2 px-3 py-2 text-right transition ${FOCUS33} ${
                      reveal
                        ? wrong
                          ? "border-rose-300 bg-rose-50"
                          : "border-emerald-300 bg-emerald-50"
                        : active
                          ? "border-violet-400 bg-violet-50"
                          : "border-slate-200 bg-slate-50 hover:border-slate-400"
                    }`}
                  >
                    <span dir="ltr" className={`font-en block text-base font-bold md:text-lg ${reveal && wrong ? "text-rose-900 line-through decoration-rose-300" : "text-slate-900"}`}>
                      {text.replace(/[✅❌]/g, "").trim()}
                    </span>
                    {reveal && (
                      <span className={`mt-1 block text-xs font-extrabold ${wrong ? "text-rose-700" : "text-emerald-700"}`}>{wrong ? "✕ بناء غير سليم" : "✓ بناء سليم"}</span>
                    )}
                  </button>
                );
              })}
            </div>
            {checked && (
              <p className={`mt-2 text-sm font-semibold ${correct ? "text-emerald-700" : "text-rose-700"}`}>
                <Text33 text={row.why} />
              </p>
            )}
          </div>
        );
      })}
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="اكشف البناء السليم" />
        </button>
      ) : (
        <Note33 emoji="🚨" tone="rose">
          <Text33 text={`نتيجتك ${score} من ${AUX_PAIRS_33.length}. كل زمن يمتلك بنية خاصة به، فلا تجمع أجزاء زمنين في جملة واحدة.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §7b — فرز الكلمات الدالة على الأزمنة الأربعة
// ============================================================
export function SignalSort33() {
  const [picked, setPicked] = useState<Record<string, TenseId33 | "">>({});
  const [checked, setChecked] = useState(false);
  const all = SIGNAL_WORDS_33.every((row) => picked[row.en]);
  const score = SIGNAL_WORDS_33.filter((row) => picked[row.en] === row.tense).length;
  return (
    <div className="space-y-3" data-lab="signal-sort">
      <p className="text-sm font-bold text-slate-600">
        <Text33 text={`صنّف ${SIGNAL_WORDS_33.length} كلمة أو تعبيرًا على الزمن الذي ترتبط به عادةً.`} />
      </p>
      <div className="grid gap-2 md:grid-cols-2">
        {SIGNAL_WORDS_33.map((row) => (
          <div key={row.en} className="rounded-2xl border border-slate-200 bg-white p-3">
            <p dir="ltr" className="font-en text-lg font-extrabold text-slate-900">
              {row.en}
            </p>
            <div className="mt-2">
              <TensePicker value={picked[row.en] ?? ""} disabled={checked} onChange={(tense) => setPicked((current) => ({ ...current, [row.en]: tense }))} />
            </div>
            {checked && (
              <p className={`mt-2 text-xs font-bold ${picked[row.en] === row.tense ? "text-emerald-700" : "text-rose-700"}`}>
                <Text33 text={picked[row.en] === row.tense ? "✓ تصنيف صحيح" : `✕ ترتبط عادةً بـ ${tenseById33(row.tense).en}`} />
              </p>
            )}
          </div>
        ))}
      </div>
      {SIGNAL_AMBIGUOUS_33.length > 0 && (
        <Note33 emoji="⚖️">
          <Text33 text={`الكلمة ${SIGNAL_AMBIGUOUS_33.join(" و")} مستثناة من الفرز لأنها واردة في الجدول مع زمنين مختلفين، وهذا دليل إضافي على أن الكلمة الدالة ليست قاعدة مطلقة.`} />
        </Note33>
      )}
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من التصنيف" />
        </button>
      ) : (
        <Note33 emoji="⏰">
          <Text33 text={`نتيجتك ${score} من ${SIGNAL_WORDS_33.length}. لا تختَر الزمن من الكلمة الدالة وحدها.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §8c — تحدّي المواجهة الأولى
// ============================================================
export function DuelChoose33() {
  const [picked, setPicked] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const correct = DUEL1_CHALLENGE_33.options.find((option) => option.id === picked)?.correct ?? false;
  return (
    <div className="space-y-3" data-lab="duel-choose">
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <p className="text-sm font-bold text-slate-600">
          <Text33 text={DUEL1_CHALLENGE_33.lead} />
        </p>
        <p className="mt-1 text-base font-semibold text-slate-800">
          <Text33 text={DUEL1_CHALLENGE_33.question} />
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {DUEL1_CHALLENGE_33.options.map((option) => (
          <button
            type="button"
            key={option.id}
            disabled={checked}
            aria-pressed={picked === option.id}
            onClick={() => setPicked(option.id)}
            data-duel-option={option.id}
            className={`rounded-2xl border-2 p-3 text-right transition ${FOCUS33} ${
              checked
                ? option.correct
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-rose-300 bg-rose-50"
                : picked === option.id
                  ? "border-sky-400 bg-sky-50"
                  : "border-slate-200 bg-white hover:border-slate-400"
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{option.id}</span>
            <span dir="ltr" className="font-en mt-2 block text-lg font-extrabold text-slate-900">
              {option.text}
            </span>
          </button>
        ))}
      </div>
      {!checked ? (
        <button
          type="button"
          disabled={!picked}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من الاختيار" />
        </button>
      ) : (
        <div className="space-y-2">
          <VerdictCard correct={correct}>
            <Text33 text={`${DUEL1_CHALLENGE_33.answerLabel} ${DUEL1_CHALLENGE_33.answer}`} />
          </VerdictCard>
          <Note33 emoji="🔁" tone="sky">
            <Text33 text={DUEL1_CHALLENGE_33.because} />
          </Note33>
        </div>
      )}
    </div>
  );
}

// ============================================================
// §9b — طابق الجملة بالسؤال الذي تجيب عنه
// ============================================================
export function QuestionMatch33() {
  const rows = [...QUESTION_MATCH_33, ...QUESTION_MATCH_EXTRA_33.map((row) => ({ ...row, question: "" }))];
  const questions = QUESTION_MATCH_33.map((row) => row.question);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const answerable = QUESTION_MATCH_33;
  const all = answerable.every((row) => picked[row.id]);
  const score = answerable.filter((row) => picked[row.id] === row.question).length;
  return (
    <div className="space-y-3" data-lab="question-match">
      {rows.map((row) => {
        const meta = tenseById33(row.tense);
        const target = QUESTION_MATCH_33.find((item) => item.id === row.id);
        return (
          <div key={row.id} className={`rounded-2xl border-2 p-3 ${TONE33[meta.tone].soft}`}>
            <p dir="ltr" className="font-en text-lg font-extrabold">
              {row.en}
            </p>
            <p className="mt-1 text-sm font-semibold opacity-80">
              <Text33 text={row.ar} />
            </p>
            {target ? (
              <div className="mt-2 space-y-2">
                {questions.map((question) => (
                  <label key={question} className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/70 px-3 py-1.5 text-sm font-bold">
                    <input
                      type="radio"
                      name={`qm-${row.id}`}
                      checked={picked[row.id] === question}
                      disabled={checked}
                      onChange={() => setPicked((current) => ({ ...current, [row.id]: question }))}
                    />
                    <Text33 text={question} />
                  </label>
                ))}
                {checked && (
                  <p className={`text-sm font-bold ${picked[row.id] === target.question ? "text-emerald-800" : "text-rose-800"}`}>
                    <Text33 text={picked[row.id] === target.question ? "✓ مطابقة صحيحة" : `✕ السؤال الصحيح: ${target.question}`} />
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-2 text-xs font-bold opacity-75">
                <Lens33 tense={row.tense} />
              </p>
            )}
          </div>
        );
      })}
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من المطابقة" />
        </button>
      ) : (
        <Note33 emoji="⚔️" tone="amber">
          <Text33 text={`نتيجتك ${score} من ${answerable.length}. المضارع المستمر يجيب عن «ماذا تفعل الآن؟»، والمضارع التام المستمر يجيب عن «منذ متى؟».`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §10b — عدسة التركيز: العدد أم المدة؟
// ============================================================
export function FocusLens33() {
  const [picked, setPicked] = useState<Record<string, "count" | "duration" | "">>({});
  const [checked, setChecked] = useState(false);
  const [livedVerdict, setLivedVerdict] = useState("");
  const all = FOCUS_ROWS_33.every((row) => picked[row.id]) && Boolean(livedVerdict);
  const score = FOCUS_ROWS_33.filter((row) => picked[row.id] === row.lens).length;
  return (
    <div className="space-y-3" data-lab="focus-lens">
      {FOCUS_ROWS_33.map((row) => {
        const meta = tenseById33(row.tense);
        return (
          <div key={row.id} className={`rounded-2xl border-2 p-3 ${TONE33[meta.tone].soft}`}>
            <p dir="ltr" className="font-en text-lg font-extrabold">
              {row.en}
            </p>
            <p className="mt-1 text-sm font-semibold opacity-85">
              <Text33 text={row.ar} />
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <ChoiceChip active={picked[row.id] === "count"} tone={meta.tone} disabled={checked} onClick={() => setPicked((c) => ({ ...c, [row.id]: "count" }))}>
                <Text33 text="الإنجاز والعدد" />
              </ChoiceChip>
              <ChoiceChip active={picked[row.id] === "duration"} tone={meta.tone} disabled={checked} onClick={() => setPicked((c) => ({ ...c, [row.id]: "duration" }))}>
                <Text33 text="النشاط والمدة" />
              </ChoiceChip>
            </div>
            {checked && (
              <p className={`mt-2 text-sm font-bold ${picked[row.id] === row.lens ? "text-emerald-800" : "text-rose-800"}`}>
                <Text33 text={row.focus} />
              </p>
            )}
          </div>
        );
      })}

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <p className="text-sm font-bold text-slate-700">
          <Text33 text={FOCUS_LIVED_33.lead} />
        </p>
        <div className="mt-2 space-y-1">
          <p dir="ltr" className="font-en text-lg font-extrabold text-slate-900">
            {FOCUS_LIVED_33.a}
          </p>
          <p dir="ltr" className="font-en text-lg font-extrabold text-slate-900">
            {FOCUS_LIVED_33.b}
          </p>
        </div>
        <p className="mt-2 text-sm font-bold text-slate-600">
          <Text33 text="احكم على الجملتين:" />
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            { id: "both", label: "كلتاهما صحيحتان وقد تدلان على أن الشخص ما زال يعيش هنا" },
            { id: "first", label: "الأولى فقط صحيحة" },
            { id: "second", label: "الثانية فقط صحيحة" },
          ].map((option) => (
            <ChoiceChip key={option.id} active={livedVerdict === option.id} tone="emerald" disabled={checked} onClick={() => setLivedVerdict(option.id)}>
              <Text33 text={option.label} />
            </ChoiceChip>
          ))}
        </div>
        {checked && (
          <div className="mt-3 space-y-2">
            <VerdictCard correct={livedVerdict === "both"}>
              <Text33 text={FOCUS_LIVED_33.both} />
            </VerdictCard>
            <p className="text-sm font-semibold text-slate-700">
              <Text33 text={FOCUS_LIVED_33.head} />
            </p>
            <p className="text-sm font-semibold text-slate-700">
              <Text33 text={FOCUS_LIVED_33.aFocus} />
            </p>
            <p className="text-sm font-semibold text-slate-700">
              <Text33 text={FOCUS_LIVED_33.bFocus} />
            </p>
          </div>
        )}
      </div>

      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="اكشف عدسة التركيز" />
        </button>
      ) : (
        <Note33 emoji="🎯" tone="emerald">
          <Text33 text={`نتيجتك ${score} من ${FOCUS_ROWS_33.length}. ${FOCUS_LIVED_33.conclusion}`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §11a — بوابة أفعال الحالة
// ============================================================
export function StativeGate33() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const opened = STATIVE_VERBS_33.filter((verb) => open[verb.en]).length;
  return (
    <div className="space-y-3" data-lab="stative-gate">
      <Counter33 done={opened} total={STATIVE_VERBS_33.length} label="أفعال الحالة المفتوحة" />
      <div className="grid gap-2 md:grid-cols-2">
        {STATIVE_VERBS_33.map((verb) => (
          <button
            type="button"
            key={verb.en}
            onClick={() => setOpen((current) => ({ ...current, [verb.en]: !current[verb.en] }))}
            aria-expanded={Boolean(open[verb.en])}
            data-stative={verb.en}
            className={`rounded-2xl border-2 p-3 text-right transition ${FOCUS33} ${open[verb.en] ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white hover:border-violet-300"}`}
          >
            <En33 className="text-xl font-extrabold text-violet-900">{verb.en}</En33>
            <p className="mt-1 text-sm font-bold text-slate-700">
              <Text33 text={`= ${verb.ar}`} />
            </p>
            {open[verb.en] && (
              <p dir="ltr" className="font-en mt-1 text-xs font-bold text-rose-700">
                ✕ {verb.en.replace(/e$/, "")}ing / been {verb.en.replace(/e$/, "")}ing
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// §11c — think: رأي أم عملية تفكير؟
// ============================================================
export function ThinkSplit33() {
  const [mode, setMode] = useState<"opinion" | "process">("opinion");
  return (
    <div className="space-y-3" data-lab="think-split">
      <div className="flex flex-wrap gap-2" role="group" aria-label="معنى الفعل think">
        <ChoiceChip active={mode === "opinion"} tone="sky" onClick={() => setMode("opinion")}>
          <Text33 text={THINK_SPLIT_33.opinion.label} />
        </ChoiceChip>
        <ChoiceChip active={mode === "process"} tone="amber" onClick={() => setMode("process")}>
          <Text33 text={THINK_SPLIT_33.process.label} />
        </ChoiceChip>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {(["opinion", "process"] as const).map((key) => {
          const row = THINK_SPLIT_33[key];
          const meta = tenseById33(row.tense);
          return (
            <div key={key} className={`rounded-3xl border-2 p-4 transition ${mode === key ? TONE33[meta.tone].soft : "border-slate-200 bg-white opacity-80"}`} data-think={key} data-active={mode === key ? "true" : undefined}>
              <p dir="ltr" className="font-en text-xl font-extrabold">
                {row.en}
              </p>
              <p className="mt-1 text-base font-semibold">
                <Text33 text={row.ar} />
              </p>
              <p className="mt-2 text-sm font-bold">
                <Text33 text={row.label} />
              </p>
              <p className="mt-2">
                <Lens33 tense={row.tense} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// §5 — لوحة البناء: الإثبات · النفي · السؤال · الإجابة القصيرة
// ============================================================
const FORM_BLOCKS_33 = [
  { key: "positive", offset: 1, emoji: "➕", tone: "emerald" as const },
  { key: "negative", offset: 3, emoji: "➖", tone: "rose" as const },
  { key: "question", offset: 5, emoji: "❓", tone: "sky" as const },
  { key: "short", offset: 7, emoji: "💬", tone: "violet" as const },
];

export function FormsPanel33({ tense, lines }: { tense: TenseId33; lines: string[] }) {
  const meta = tenseById33(tense);
  return (
    <div className={`space-y-3 rounded-3xl border-2 p-4 ${TONE33[meta.tone].soft}`} data-forms={meta.id}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-head text-lg font-bold">
          <Text33 text={lines[0]} />
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Lens33 tense={tense} />
          <En33 className="text-base font-extrabold">{meta.formula}</En33>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {FORM_BLOCKS_33.map((block) => (
          <div key={block.key} className="rounded-2xl border border-white/80 bg-white/80 p-3">
            <p className="text-xs font-extrabold text-slate-500">
              <span aria-hidden="true">{block.emoji} </span>
              <Text33 text={lines[block.offset]} />
            </p>
            <p dir="ltr" className="font-en mt-1 text-lg font-extrabold text-slate-900">
              {lines[block.offset + 1]}
            </p>
            {block.key === "short" && (
              <p dir="ltr" className="font-en mt-1 text-base font-bold text-slate-700">
                {lines[block.offset + 2]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-white bg-white/70 p-3">
        <p className="text-xs font-extrabold text-slate-500">
          <Text33 text={lines[10]} />
        </p>
        <p className="mt-1 text-base font-bold text-slate-800">
          <En33 className="text-base">{lines[11]}</En33>
        </p>
      </div>
    </div>
  );
}

// ============================================================
// §8 — مواجهة زوجية: الوضع المستقر مقابل الوضع المؤقت
// ============================================================
export function DuelPairs33({ pair }: { pair: "first" | "second" }) {
  const data = DUEL1_PAIRS_33[pair];
  const cards = [
    { ...data.stable, label: "الوضع المستقر" },
    { ...data.temporary, label: "الوضع المؤقت" },
  ];
  return (
    <div className="space-y-3" data-duel-pair={pair}>
      <p className="text-base font-semibold text-slate-600">
        <Text33 text={data.lead} />
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {cards.map((card) => {
          const meta = tenseById33(card.tense);
          return (
            <div key={card.label} className={`rounded-3xl border-2 p-4 ${TONE33[meta.tone].soft}`}>
              <p className="text-xs font-extrabold opacity-70">
                <Text33 text={card.label} />
              </p>
              <p dir="ltr" className="font-en mt-1 text-xl font-extrabold">
                {card.en}
              </p>
              <p className="mt-1 text-base font-semibold">
                <Text33 text={card.ar} />
              </p>
              <p className="mt-2 text-sm font-bold">
                <Text33 text={card.why} />
              </p>
              <p className="mt-2">
                <Lens33 tense={card.tense} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// §12 — المحقق الأول: ثماني جمل
// ============================================================
export function DetectiveSet33({ from, to, keyHead }: { from: number; to: number; keyHead?: string }) {
  const items = DETECTIVE_33.filter((item) => item.number >= from && item.number <= to);
  const workspace = useWorkspace33();
  const done = workspace.doneCount(items.map((item) => item.id));
  return (
    <div className="space-y-3" data-lab="detective-1">
      <Counter33 done={done} total={DETECTIVE_33.length} label="جمل المحقق المصحَّحة" />
      {keyHead && done > 0 && (
        <p className="font-head text-lg font-bold text-emerald-800">
          <Text33 text={keyHead} />
        </p>
      )}
      {items.map((item) => (
        <AttemptCard
          key={item.id}
          storeId={item.id}
          mark={CIRCLED_33[item.number - 1]}
          item={{
            fields: [{ key: "answer", label: "الجملة بعد التصحيح" }],
            answer: [item.right],
            tense: item.tense,
            reason: item.note,
            provenance: item.provenance,
          }}
          prompt={
            <p dir="ltr" className="font-en text-lg font-extrabold text-rose-900">
              {item.number}. {item.wrong}
            </p>
          }
        />
      ))}
    </div>
  );
}

// ============================================================
// §13 / §14 — التدريبان
// ============================================================
export function PracticeSet33({ section, from, to }: { section: string; from: number; to: number }) {
  const items = ALL_PRACTICE_33.filter((item) => item.section === section && item.number >= from && item.number <= to);
  const workspace = useWorkspace33();
  const done = workspace.doneCount(items.map((item) => item.id));
  const total = ALL_PRACTICE_33.filter((item) => item.section === section).length;
  return (
    <div className="space-y-3" data-lab={`practice-${section}`}>
      <Counter33 done={done} total={total} label="البنود المكتملة" />
      {items.map((item) => (
        <AttemptCard
          key={item.id}
          storeId={item.id}
          item={item}
          prompt={
            <p dir="ltr" className="font-en text-lg font-bold leading-8 text-slate-900">
              {item.number}. {item.prompt}
            </p>
          }
          tag={item.provenance === "platform" ? <PlatformTag33 text="Key prepared for the platform" /> : undefined}
        />
      ))}
    </div>
  );
}

// ============================================================
// §15 — إجابتان صحيحتان
// ============================================================
export function BothCorrect33() {
  const [verdicts, setVerdicts] = useState<Record<string, "correct" | "wrong" | "">>({});
  const [checked, setChecked] = useState(false);
  const all = BOTH_CORRECT_33.options.every((option) => verdicts[option.id]);
  return (
    <div className="space-y-3" data-lab="both-correct">
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        {BOTH_CORRECT_33.lead.map((line) => (
          <p key={line} className="text-sm font-semibold text-slate-600">
            <Text33 text={line} />
          </p>
        ))}
      </div>
      <p dir="ltr" className="font-en rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xl font-extrabold text-slate-900">
        {BOTH_CORRECT_33.prompt}
      </p>
      <div className="grid gap-2 md:grid-cols-2">
        {BOTH_CORRECT_33.options.map((option) => {
          const meta = tenseById33(option.tense);
          return (
            <div key={option.id} className={`rounded-3xl border-2 p-3 ${TONE33[meta.tone].soft}`}>
              <p className="text-xs font-extrabold opacity-70">{option.id}</p>
              <p dir="ltr" className="font-en mt-1 text-lg font-extrabold">
                {option.text}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <ChoiceChip active={verdicts[option.id] === "correct"} tone={meta.tone} disabled={checked} onClick={() => setVerdicts((c) => ({ ...c, [option.id]: "correct" }))}>
                  <Text33 text="صحيحة" />
                </ChoiceChip>
                <ChoiceChip active={verdicts[option.id] === "wrong"} tone="rose" disabled={checked} onClick={() => setVerdicts((c) => ({ ...c, [option.id]: "wrong" }))}>
                  <Text33 text="خاطئة" />
                </ChoiceChip>
              </div>
              {checked && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-extrabold text-emerald-800">
                    <Text33 text="✓ صحيحة" />
                  </p>
                  <p dir="ltr" className="font-en text-sm font-bold">
                    {BOTH_CORRECT_33.full[BOTH_CORRECT_33.options.indexOf(option)]}
                  </p>
                  <p className="text-sm font-semibold">
                    <Text33 text={option.focus} />
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من الحكمين" />
        </button>
      ) : (
        <Note33 emoji="🧠" tone="violet">
          <Text33 text={BOTH_CORRECT_33.verdict} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §16 — قارئ القصة وكشف العبارات الفعلية
// ============================================================
export function highlightPhrases33(paragraph: string): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = paragraph;
  let guard = 0;
  while (rest.length > 0 && guard < 200) {
    guard += 1;
    let best = -1;
    let bestPhrase = "";
    for (const phrase of STORY_PHRASES_33) {
      const at = rest.indexOf(phrase);
      if (at >= 0 && (best < 0 || at < best)) {
        best = at;
        bestPhrase = phrase;
      }
    }
    if (best < 0) {
      out.push(rest);
      break;
    }
    if (best > 0) out.push(rest.slice(0, best));
    out.push(
      <mark key={`${bestPhrase}-${best}-${guard}`} data-story-phrase={bestPhrase} className="rounded bg-amber-100 px-1 font-extrabold text-amber-900">
        {bestPhrase}
      </mark>,
    );
    rest = rest.slice(best + bestPhrase.length);
  }
  return out;
}

export function StoryReader33({ part, highlight }: { part: "story-a" | "story-b"; highlight: boolean }) {
  const paragraphs = part === "story-a" ? STORY_PARAGRAPHS_33.slice(0, 3) : STORY_PARAGRAPHS_33.slice(3);
  return (
    <div className="space-y-3" data-reading={part}>
      {part === "story-a" && (
        <>
          <p className="text-base font-semibold text-slate-600">
            <Text33 text={STORY_LEAD_33} />
          </p>
          <p dir="ltr" className="font-head text-2xl font-extrabold text-slate-900">
            {STORY_TITLE_33}
          </p>
        </>
      )}
      {paragraphs.map((paragraph) => (
        <p key={paragraph} dir="ltr" lang="en" className="font-en rounded-2xl border border-slate-200 bg-white p-4 text-lg leading-9 text-slate-800">
          {highlight ? highlightPhrases33(paragraph) : paragraph}
        </p>
      ))}
    </div>
  );
}

export function StoryHighlight33() {
  const [on, setOn] = useState(false);
  return (
    <div className="space-y-3" data-lab="story-highlight">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${FOCUS33} ${on ? "bg-slate-200 text-slate-800" : "bg-slate-900 text-white hover:bg-slate-700"}`}
      >
        <Text33 text={on ? "إخفاء العبارات الفعلية" : `إظهار العبارات الفعلية (${STORY_PHRASES_33.length})`} />
      </button>
      <StoryReader33 part="story-b" highlight={on} />
    </div>
  );
}

// ============================================================
// §17 — تحليل القصة
// ============================================================
export function AnalysisSet33({ from, to }: { from: number; to: number }) {
  const rows = STORY_ROWS_33.filter((row) => row.number >= from && row.number <= to);
  const showHead = from === 1;
  const [picked, setPicked] = useState<Record<string, TenseId33 | "">>({});
  const [checked, setChecked] = useState(false);
  const all = rows.every((row) => picked[row.id]);
  const score = rows.filter((row) => picked[row.id] === row.tense).length;
  return (
    <div className="space-y-3" data-lab="story-analysis">
      {showHead && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-900 px-3 py-2 text-xs font-bold text-white">
          {STORY_ANALYSIS_HEAD_33.split(" | ").map((cell) => (
            <span key={cell} className="rounded-lg bg-white/15 px-2 py-1">
              <Text33 text={cell} />
            </span>
          ))}
        </div>
      )}
      {rows.map((row) => {
        const meta = tenseById33(row.tense);
        return (
          <div key={row.id} className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{row.number}</span>
              <p dir="ltr" className="font-en text-lg font-extrabold text-slate-900">
                {row.phrase}
              </p>
            </div>
            <div className="mt-2">
              <TensePicker value={picked[row.id] ?? ""} disabled={checked} onChange={(tense) => setPicked((current) => ({ ...current, [row.id]: tense }))} />
            </div>
            {checked && (
              <div className={`mt-2 rounded-xl border-2 p-2 ${TONE33[meta.tone].soft}`}>
                <p className={`text-sm font-bold ${picked[row.id] === row.tense ? "text-emerald-800" : "text-rose-800"}`}>
                  <Text33 text={picked[row.id] === row.tense ? "✓ تحليل صحيح" : `✕ الزمن الصحيح: ${meta.en}`} />
                </p>
                <p className="mt-1 text-sm font-semibold">
                  <Text33 text={`السبب: ${row.reason}`} />
                </p>
              </div>
            )}
          </div>
        );
      })}
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من التحليل" />
        </button>
      ) : (
        <Note33 emoji="🔍">
          <Text33 text={`نتيجتك ${score} من ${rows.length}. القصة الواحدة تجمع الأزمنة الأربعة بصورة طبيعية جدًا.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §18 — محقق الفقرة: أحد عشر موضعًا
// ============================================================
export function ParagraphDetective33({ stage }: { stage: "work" | "fixed" | "why-first" | "why-last" }) {
  const workspace = useWorkspace33();
  const ids = PARAGRAPH_SPOTS_33.map((spot) => spot.id);
  const done = workspace.doneCount(ids);
  const complete = done === PARAGRAPH_SPOTS_33.length;

  if (stage === "fixed") {
    return (
      <div className="space-y-3" data-paragraph="fixed">
        {!complete ? (
          <Note33 emoji="🔐" tone="rose">
            <Text33 text={`الفقرة المصححة مقفلة حتى تكمل مواضع الإصلاح (${done} من ${PARAGRAPH_SPOTS_33.length}). عد إلى الشريحة السابقة وأصلح كل موضع.`} />
          </Note33>
        ) : (
          <>
            <Counter33 done={done} total={PARAGRAPH_SPOTS_33.length} label="مواضع الإصلاح المكتملة" />
            <div className="space-y-2 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
              {PARAGRAPH_RIGHT_SENTENCES_33.map((sentence) => (
                <p key={sentence} dir="ltr" lang="en" className="font-en text-lg leading-9 text-emerald-900">
                  {sentence}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  if (stage === "why-first" || stage === "why-last") {
    const spots = stage === "why-first" ? PARAGRAPH_SPOTS_33.slice(0, 6) : PARAGRAPH_SPOTS_33.slice(6);
    return (
      <div className="space-y-2" data-paragraph={stage}>
        {!complete ? (
          <Note33 emoji="🔐" tone="rose">
            <Text33 text={`التفسيرات مقفلة حتى تكمل مواضع الإصلاح (${done} من ${PARAGRAPH_SPOTS_33.length}).`} />
          </Note33>
        ) : (
          spots.map((spot) => (
            <div key={spot.id} className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{spot.number}</span>
                {spot.tense && <Lens33 tense={spot.tense} />}
              </div>
              <p dir="ltr" className="font-en mt-2 text-base font-bold text-rose-900 line-through decoration-rose-300">
                {spot.wrong}
              </p>
              <p dir="ltr" className="font-en mt-1 text-base font-extrabold text-emerald-900">
                {spot.right}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                <Text33 text={spot.reason} />
              </p>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3" data-paragraph="work">
      <div className="space-y-2 rounded-3xl border-2 border-slate-200 bg-slate-50 p-4">
        {PARAGRAPH_SENTENCES_33.map((sentence) => (
          <p key={sentence} dir="ltr" lang="en" className="font-en text-lg leading-9 text-slate-800">
            {sentence}
          </p>
        ))}
      </div>
      <Counter33 done={done} total={PARAGRAPH_SPOTS_33.length} label="مواضع الإصلاح المكتملة" />
      {PARAGRAPH_SPOTS_33.map((spot) => (
        <AttemptCard
          key={spot.id}
          storeId={spot.id}
          item={{
            fields: [{ key: "answer", label: "اكتب المقطع بعد تصحيحه" }],
            answer: [spot.right],
            accept: [[spot.right.replace(/\.$/, "")]],
            tense: spot.tense,
            reason: spot.reason,
            provenance: "source",
          }}
          prompt={
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{spot.number}</span>
                <span className="text-xs font-bold text-slate-500">
                  <Text33 text="المقطع الخاطئ:" />
                </span>
              </div>
              <p dir="ltr" className="font-en text-base font-bold text-rose-900">
                {spot.wrong}
              </p>
            </>
          }
        />
      ))}
    </div>
  );
}

// ============================================================
// §19 — طابق الموقف مع الجملة
// ============================================================
export function SituationMatch33({ from = 1, to = 2 }: { from?: number; to?: number }) {
  const first = SITUATIONS_33.filter((row) => row.number >= from && row.number <= to);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const all = first.every((row) => picked[row.id]);
  const score = first.filter((row) => picked[row.id] === row.en).length;
  const sentences = SITUATIONS_33.map((row) => row.en);
  return (
    <div className="space-y-3" data-lab="situation-match">
      {first.map((row) => {
        const meta = tenseById33(row.tense);
        return (
          <div key={row.id} className={`rounded-2xl border-2 p-3 ${TONE33[meta.tone].soft}`}>
            <p className="text-xs font-extrabold opacity-70">
              <Text33 text={row.head} />
            </p>
            <p className="mt-1 text-base font-semibold">
              <Text33 text={row.context} />
            </p>
            <div className="mt-2 space-y-1">
              {sentences.map((sentence) => (
                <label key={sentence} className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/70 px-3 py-1.5">
                  <input
                    type="radio"
                    name={`sit-${row.id}`}
                    checked={picked[row.id] === sentence}
                    disabled={checked}
                    onChange={() => setPicked((current) => ({ ...current, [row.id]: sentence }))}
                  />
                  <En33 className="text-sm font-bold">{sentence}</En33>
                </label>
              ))}
            </div>
            {checked && (
              <p className={`mt-2 text-sm font-bold ${picked[row.id] === row.en ? "text-emerald-800" : "text-rose-800"}`}>
                <Text33 text={`${picked[row.id] === row.en ? "✓" : "✕"} ${row.reason}`} />
              </p>
            )}
          </div>
        );
      })}
      {!checked ? (
        <button
          type="button"
          disabled={!all}
          onClick={() => setChecked(true)}
          className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="تحقّق من المطابقة" />
        </button>
      ) : (
        <Note33 emoji="🚀" tone="violet">
          <Text33 text={`نتيجتك ${score} من ${first.length}. اختر الزمن الأنسب، ثم فسّر السبب بنفسك قبل الانتقال.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §22 — محرّر مهمة الكتابة
// ============================================================
export function WritingEditor33() {
  const [text, setText] = useState("");
  const [ticked, setTicked] = useState<Record<number, boolean>>({});
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const inRange = sentences.length >= WRITING_MIN_SENTENCES_33 && sentences.length <= WRITING_MAX_SENTENCES_33;
  const tickedCount = WRITING_CRITERIA_33.filter((_, i) => ticked[i]).length;
  return (
    <div className="space-y-3" data-lab="writing-editor">
      <div className="grid gap-2 md:grid-cols-2">
        {WRITING_CRITERIA_33.map((criterion, i) => (
          <label key={criterion} className={`flex items-start gap-2 rounded-2xl border-2 p-3 transition ${ticked[i] ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <input type="checkbox" checked={Boolean(ticked[i])} onChange={() => setTicked((current) => ({ ...current, [i]: !current[i] }))} className="mt-1" />
            <span className="text-sm font-semibold text-slate-700">
              <Text33 text={criterion} />
            </span>
          </label>
        ))}
      </div>
      <Counter33 done={tickedCount} total={WRITING_CRITERIA_33.length} label="الشروط المستوفاة" />
      <label className="block text-sm font-bold text-slate-700">
        <Text33 text="اكتب فقرتك هنا" />
        <textarea
          dir="ltr"
          rows={8}
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="font-en mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-base leading-8 text-slate-800 outline-none focus:border-violet-400 focus:bg-white"
        />
      </label>
      <p className={`text-sm font-bold ${inRange ? "text-emerald-700" : "text-slate-600"}`}>
        <Text33 text="عدد الجمل:" /> <bdi dir="ltr">{sentences.length}</bdi>
        <Text33 text={inRange ? ` — ضمن المطلوب (${WRITING_MIN_SENTENCES_33}–${WRITING_MAX_SENTENCES_33}).` : ` — المطلوب ${WRITING_MIN_SENTENCES_33} إلى ${WRITING_MAX_SENTENCES_33} جملة.`} />
      </p>
    </div>
  );
}

// ============================================================
// §23a — أربع بطاقات تُقلَب
// ============================================================
export function GoldenFlip33() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const opened = GOLDEN_SENTENCES_33.filter((row) => open[row.en]).length;
  const revealAll = () => setOpen(Object.fromEntries(GOLDEN_SENTENCES_33.map((row) => [row.en, true])));
  return (
    <div className="space-y-3" data-lab="golden-flip">
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-[12rem] flex-1">
          <Counter33 done={opened} total={GOLDEN_SENTENCES_33.length} label="البطاقات المكشوفة" />
        </div>
        <button
          type="button"
          onClick={revealAll}
          disabled={opened === GOLDEN_SENTENCES_33.length}
          className={`rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40 ${FOCUS33}`}
        >
          <Text33 text="اكشف المعاني كلها" />
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {GOLDEN_SENTENCES_33.map((row) => {
          const meta = tenseById33(row.tense);
          return (
            <button
              type="button"
              key={row.en}
              onClick={() => setOpen((current) => ({ ...current, [row.en]: !current[row.en] }))}
              aria-expanded={Boolean(open[row.en])}
              data-golden-card={meta.id}
              className={`rounded-3xl border-2 p-4 text-right transition ${FOCUS33} ${open[row.en] ? TONE33[meta.tone].soft : "border-slate-200 bg-white hover:border-slate-400"}`}
            >
              <span dir="ltr" className="font-en block text-xl font-extrabold text-slate-900">
                <span aria-hidden="true">{CIRCLED_33[row.number - 1]} </span>
                {row.en}
              </span>
              <span className="mt-2 block text-base font-bold">
                <Text33 text={open[row.en] ? row.meaning : "……"} />
              </span>
              {open[row.en] && (
                <span className="mt-2 block">
                  <Lens33 tense={row.tense} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// §23c — القاعدة الذهبية: ماذا يريد المتحدث إبرازه؟
// ============================================================
export function GoldenRule33() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="space-y-3" data-lab="golden-rule">
      <div className="grid gap-2 md:grid-cols-2">
        {GOLDEN_QUESTIONS_33.map((question, i) => {
          const meta = TENSES_33[i];
          return (
            <button
              type="button"
              key={question}
              onClick={() => setPicked(i)}
              aria-pressed={picked === i}
              data-golden-question={meta.id}
              className={`rounded-2xl border-2 p-3 text-right transition ${FOCUS33} ${picked === i ? TONE33[meta.tone].soft : "border-slate-200 bg-white hover:border-slate-400"}`}
            >
              <Text33 text={question} />
              {picked === i && (
                <span className="mt-2 block">
                  <Lens33 tense={meta.id} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <Note33 emoji="🥇">
          <Text33 text={`حين تريد إبراز «${GOLDEN_QUESTIONS_33[picked].replace(/[؟?]$/, "")}» فاستخدم ${TENSES_33[picked].en}. القاعدة الذهبية: اسأل أولًا عمّا يريد المتحدث إبرازه، لا عن الكلمة الدالة.`} />
        </Note33>
      )}
    </div>
  );
}

// ============================================================
// §24a — خريطة التقدم
// ============================================================
export function ProgressMap33() {
  const [opened, setOpened] = useState<"present" | "past" | null>("present");
  return (
    <div className="space-y-3" data-lab="progress-map">
      <div className="grid gap-3 md:grid-cols-2">
        {[
          { key: "present" as const, head: PROGRESS_PRESENT_33.head, items: PROGRESS_PRESENT_33.items, tone: "emerald" as const },
          { key: "past" as const, head: PROGRESS_PAST_33.head, items: PROGRESS_PAST_33.items, tone: "sky" as const },
        ].map((system) => (
          <button
            type="button"
            key={system.key}
            onClick={() => setOpened(system.key)}
            aria-expanded={opened === system.key}
            data-progress-system={system.key}
            className={`rounded-3xl border-2 p-4 text-right transition ${FOCUS33} ${opened === system.key ? TONE33[system.tone].soft : "border-slate-200 bg-white hover:border-slate-400"}`}
          >
            <Text33 text={system.head} />
            <span className={`mt-2 flex flex-wrap gap-2 ${opened === system.key ? "" : "opacity-70"}`} dir="ltr">
              {system.items.map((item, i) => (
                <span key={item} className="inline-flex items-center gap-2">
                  {system.key === "past" && i > 0 && (
                    <span aria-hidden="true" className="font-en text-sm font-bold opacity-50">
                      /
                    </span>
                  )}
                  <span className="rounded-xl border border-white/70 bg-white/70 px-2.5 py-1 font-en text-sm font-bold">{item}</span>
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
