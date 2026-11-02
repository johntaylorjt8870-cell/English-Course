import { useMemo, useState } from "react";
import {
  COND_RESULT_52,
  ERROR_52,
  EXERCISES_52,
  IF_WHEN_52,
  MODAL_52,
  NEGATION_52,
  ORDER_52,
  OUTCOME_52,
  QUESTION_ORDER_52,
  UNLESS_52,
  VERB_FORM_52,
  ZERO_FIRST_52,
  type Exercise52,
  type OrderTask52,
  type QuestionOrderTask52,
} from "./practiceData52";
import {
  DIALOGUE_52,
  DIALOGUE_QUESTIONS_52,
  GOLDEN_SENTENCES_52,
  READING_52,
  READING_HUNT_52,
  READING_QUESTIONS_52,
  READING_TRANSLATION_52,
  SELF_CHECK_52,
  SPEAKING_52,
  SUMMARY_52,
  WRITING_52,
} from "./content52";
import { matchesEnglish52, normalizeEnglish52 } from "./normalize52";
import {
  Card52,
  ChoiceChip52,
  En52,
  HiddenAnswer52,
  Mixed52,
  NumBadge52,
  QA52,
  Rich52,
  SmallBtn52,
  StatusLine52,
  TONE_STYLE,
} from "./kit52";

/* ============================================================
   عناصر مشتركة
   ============================================================ */

function ItemShell({
  n,
  children,
  state,
}: {
  n: number;
  children: React.ReactNode;
  state: "idle" | "ok" | "bad";
}) {
  return (
    <div
      className={`rounded-3xl border-2 p-4 transition ${
        state === "ok"
          ? "border-emerald-300 bg-emerald-50/60"
          : state === "bad"
            ? "border-rose-300 bg-rose-50/40"
            : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex flex-wrap items-start gap-3">
        <NumBadge52 n={n} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function VerdictLine({ ok, children }: { ok: boolean; children?: React.ReactNode }) {
  return (
    <StatusLine52 tone={ok ? "ok" : "bad"}>
      <span>{ok ? "✓" : "✕"}</span>
      <span>{ok ? "إجابة صحيحة" : "إجابة غير صحيحة — راجع القاعدة"}</span>
      {children}
    </StatusLine52>
  );
}

function WhyLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
      <span className="text-slate-400">التوضيح: </span>
      {children}
    </div>
  );
}

function LabIntro({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-500">
      <span>{count} حالات — لا تظهر الإجابة قبل اختيارك أو كتابتك.</span>
      <span aria-hidden="true">🎯</span>
    </div>
  );
}

/* ============================================================
   1) تحديد الشرط والنتيجة
   ============================================================ */
function CondResultItemView({ index, item }: { index: number; item: (typeof COND_RESULT_52)[number] }) {
  const [roles, setRoles] = useState<("C" | "R" | undefined)[]>(() => item.clauses.map(() => undefined));
  const [checked, setChecked] = useState(false);
  const complete = roles.every(Boolean);
  const allRight = checked && roles.every((role, i) => role === item.clauses[i].role);

  const cycle = (i: number) => {
    setChecked(false);
    setRoles((previous) => {
      const current = previous[i];
      const next = current === undefined ? "C" : current === "C" ? "R" : undefined;
      const copy = [...previous];
      copy[i] = next;
      return copy;
    });
  };

  return (
    <ItemShell n={index + 1} state={checked ? (allRight ? "ok" : "bad") : "idle"}>
      <div className="grid gap-2 sm:grid-cols-2">
        {item.clauses.map((clause, i) => {
          const role = roles[i];
          const style = role ? TONE_STYLE[role] : null;
          return (
            <button
              key={i}
              type="button"
              onClick={() => cycle(i)}
              className={`rounded-2xl border-2 px-4 py-3 text-left transition active:scale-[0.99] ${
                style ? `${style.border} ${style.soft}` : "border-dashed border-slate-300 bg-white hover:border-slate-400"
              }`}
            >
              <En52 className="text-lg font-bold text-slate-800">{clause.text}</En52>
              <div className={`mt-1 text-xs font-bold ${style ? style.text : "text-slate-400"}`}>
                {role ? (role === "C" ? "CONDITION · الشرط" : "RESULT · النتيجة") : "اضغط لتحديد الوظيفة"}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <SmallBtn52 dark onClick={() => setChecked(true)} disabled={!complete}>
          تحقق ✓
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setRoles(item.clauses.map((clause) => clause.role));
            setChecked(true);
          }}
        >
          الحل 💡
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setRoles(item.clauses.map(() => undefined));
            setChecked(false);
          }}
        >
          ↺
        </SmallBtn52>
      </div>
      {checked && (
        <div className="mt-3">
          <VerdictLine ok={allRight} />
          <WhyLine>
            <Mixed52 text={item.why} />
          </WhyLine>
        </div>
      )}
    </ItemShell>
  );
}

export function CondResultLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={COND_RESULT_52.length} />
      {COND_RESULT_52.map((item, index) => (
        <CondResultItemView key={item.id} index={index} item={item} />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

/* ============================================================
   2) ورشة التصريف
   ============================================================ */
export function VerbFormLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={VERB_FORM_52.length} />
      {VERB_FORM_52.map((item, index) => (
        <VerbFormItem key={item.id} index={index} item={item} />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

function VerbFormItem({ index, item }: { index: number; item: (typeof VERB_FORM_52)[number] }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [solved, setSolved] = useState(false);
  const ok = checked && matchesEnglish52(value, item.accept);

  return (
    <ItemShell n={index + 1} state={checked ? (ok ? "ok" : "bad") : solved ? "ok" : "idle"}>
      <div className="flex flex-wrap items-center gap-2 text-lg font-semibold text-slate-700">
        <Mixed52 text={item.before} />
        <input
          dir="ltr"
          lang="en"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setChecked(false);
            setSolved(false);
          }}
          placeholder="…"
          aria-label={`إجابة ${index + 1}`}
          className="font-en w-36 rounded-xl border-2 border-slate-300 bg-white px-3 py-1 text-slate-800 outline-none transition focus:border-sky-400"
        />
        <Mixed52 text={item.after} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <SmallBtn52 dark onClick={() => setChecked(true)} disabled={!value.trim()}>
          تحقق ✓
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setValue(item.model);
            setSolved(true);
            setChecked(false);
          }}
        >
          الحل 💡
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setValue("");
            setChecked(false);
            setSolved(false);
          }}
        >
          ↺
        </SmallBtn52>
      </div>
      {checked && (
        <div className="mt-3">
          <VerdictLine ok={ok} />
          <WhyLine>
            <Mixed52 text={item.why} />
          </WhyLine>
        </div>
      )}
      {solved && !checked && (
        <div className="mt-3">
          <WhyLine>
            الصيغة الصحيحة: <En52 className="font-bold">{item.model}</En52> — <Mixed52 text={item.why} />
          </WhyLine>
        </div>
      )}
    </ItemShell>
  );
}

/* ============================================================
   3) إعادة بناء الجمل والأسئلة
   ============================================================ */
function OrderItemView({ index, task }: { index: number; task: OrderTask52 | QuestionOrderTask52 }) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const complete = placed.length === task.scrambled.length;
  const words = placed.map((i) => task.scrambled[i]);
  const correct = complete && words.join(" ") === task.correct.join(" ");
  const wrong = complete && !correct;
  const shown = revealed ? task.correct : words;
  const done = correct || revealed;

  return (
    <ItemShell n={index + 1} state={done ? "ok" : wrong ? "bad" : "idle"}>
      <div dir="ltr" className="flex flex-wrap gap-2">
        {task.scrambled.map((word, i) => (
          <button
            key={i}
            type="button"
            disabled={placed.includes(i) || revealed}
            onClick={() => setPlaced((previous) => [...previous, i])}
            className="font-en rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-xl font-bold text-slate-800 shadow-sm transition hover:border-slate-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25"
          >
            {word}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {!done && (
          <SmallBtn52 onClick={() => setRevealed(true)}>الحل 💡</SmallBtn52>
        )}
        <SmallBtn52
          onClick={() => {
            setPlaced([]);
            setRevealed(false);
          }}
        >
          ↺
        </SmallBtn52>
      </div>

      <div
        key={wrong ? "w" + placed.join() : "ok"}
        dir="ltr"
        className={`mt-3 flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-3 ${
          done ? "border-emerald-300 bg-white" : wrong ? "shake border-rose-300 bg-white" : "border-slate-300 bg-slate-50"
        }`}
      >
        {shown.length === 0 && (
          <span dir="rtl" className="w-full text-center text-slate-400">
            اضغط على الكلمات بالترتيب الصحيح
          </span>
        )}
        {shown.map((word, i) => {
          const commaAt = task.correct.findIndex((token) => token.endsWith(","));
          const tone = i <= commaAt && commaAt >= 0 ? "C" : "R";
          return (
            <button
              key={i}
              type="button"
              onClick={() => !revealed && setPlaced((previous) => previous.filter((_, j) => j !== i))}
              className={`font-en rounded-xl border-2 px-4 py-2 text-xl font-bold shadow-sm transition ${
                done ? TONE_STYLE[tone].chip : wrong ? "border-rose-300 bg-rose-50 text-rose-800" : "border-slate-300 bg-white text-slate-800"
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {done && (
        <div className="mt-2">
          <VerdictLine ok />
          <WhyLine>
            <En52>{task.correct.join(" ")}</En52> — <Mixed52 text={task.ar} /> — <Mixed52 text={task.why} />
          </WhyLine>
        </div>
      )}
      {wrong && (
        <div className="mt-2">
          <StatusLine52 tone="bad">✕ الترتيب غير صحيح — اضغط على كلمة لإرجاعها وحاول مجددًا</StatusLine52>
        </div>
      )}
    </ItemShell>
  );
}

export function OrderLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={ORDER_52.length} />
      {ORDER_52.map((task, index) => (
        <OrderItemView key={task.id} index={index} task={task} />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

export function QuestionOrderLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={QUESTION_ORDER_52.length} />
      {QUESTION_ORDER_52.map((task, index) => (
        <OrderItemView key={task.id} index={index} task={task} />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

/* ============================================================
   4) باني النفي / المودال / IF-WHEN / الموقف
   ============================================================ */
function OptionItem({
  index,
  prompt,
  options,
  answer,
  why,
  full,
}: {
  index: number;
  prompt: React.ReactNode;
  options: string[];
  answer: number;
  why: string;
  full?: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const ok = checked && picked === answer;

  return (
    <ItemShell n={index + 1} state={checked ? (ok ? "ok" : "bad") : "idle"}>
      <div className="text-lg font-semibold text-slate-700">{prompt}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option, i) => (
          <ChoiceChip52
            key={option}
            active={picked === i}
            tone={picked === i ? "C" : "R"}
            disabled={checked && ok}
            onClick={() => {
              setPicked(i);
              setChecked(false);
            }}
          >
            {option}
          </ChoiceChip52>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <SmallBtn52 dark onClick={() => setChecked(true)} disabled={picked === null}>
          تحقق ✓
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setPicked(answer);
            setChecked(true);
          }}
        >
          الحل 💡
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setPicked(null);
            setChecked(false);
          }}
        >
          ↺
        </SmallBtn52>
      </div>
      {checked && (
        <div className="mt-3">
          <VerdictLine ok={ok} />
          {full && (
            <div className="mt-1 text-sm font-semibold text-slate-600">
              <En52>{full}</En52>
            </div>
          )}
          <WhyLine>
            <Mixed52 text={why} />
          </WhyLine>
        </div>
      )}
    </ItemShell>
  );
}

export function NegationLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={NEGATION_52.length} />
      {NEGATION_52.map((item, index) => (
        <OptionItem
          key={item.id}
          index={index}
          prompt={
            <span>
              <Mixed52 text={item.before} /> <span className="mx-1 rounded-lg bg-slate-100 px-2 py-0.5 text-slate-400">____</span>{" "}
              <Mixed52 text={item.after} />
            </span>
          }
          options={item.options}
          answer={item.answer}
          why={item.why}
          full={`${item.before} ${item.options[item.answer]}${item.after}`}
        />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

export function ModalLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={MODAL_52.length} />
      {MODAL_52.map((item, index) => (
        <OptionItem
          key={item.id}
          index={index}
          prompt={<En52 className="text-lg">{item.prompt}</En52>}
          options={item.options}
          answer={item.answer}
          why={item.why}
        />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

export function IfWhenLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={IF_WHEN_52.length} />
      {IF_WHEN_52.map((item, index) => (
        <IfWhenItem key={item.id} index={index} item={item} />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

function IfWhenItem({ index, item }: { index: number; item: (typeof IF_WHEN_52)[number] }) {
  const [picked, setPicked] = useState<"IF" | "WHEN" | null>(null);
  const [checked, setChecked] = useState(false);
  const ok = checked && picked === item.answer;
  return (
    <ItemShell n={index + 1} state={checked ? (ok ? "ok" : "bad") : "idle"}>
      <div className="text-sm font-bold text-slate-500">{item.context}</div>
      <div className="mt-1 text-xl font-semibold text-slate-800">
        <En52>{item.sentence}</En52>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {(["IF", "WHEN"] as const).map((option) => (
          <ChoiceChip52
            key={option}
            active={picked === option}
            tone="C"
            onClick={() => {
              setPicked(option);
              setChecked(false);
            }}
          >
            {option}
          </ChoiceChip52>
        ))}
        <SmallBtn52 dark onClick={() => setChecked(true)} disabled={!picked}>
          تحقق ✓
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setPicked(item.answer);
            setChecked(true);
          }}
        >
          الحل 💡
        </SmallBtn52>
      </div>
      {checked && (
        <div className="mt-3">
          <VerdictLine ok={ok} />
          <WhyLine>
            <Mixed52 text={item.why} />
          </WhyLine>
        </div>
      )}
    </ItemShell>
  );
}

export function OutcomeLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={OUTCOME_52.length} />
      {OUTCOME_52.map((item, index) => (
        <OptionItem
          key={item.id}
          index={index}
          prompt={<En52 className="text-lg">{item.prompt}</En52>}
          options={item.options}
          answer={item.answer}
          why={item.why}
          full={`${item.prompt} ${item.options[item.answer]}`}
        />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

/* ============================================================
   5) Zero أم First
   ============================================================ */
export function ZeroFirstLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={ZERO_FIRST_52.length} />
      {ZERO_FIRST_52.map((item, index) => (
        <ClassifyItem key={item.id} index={index} sentence={item.sentence} answer={item.answer} why={item.why} />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

function ClassifyItem({
  index,
  sentence,
  answer,
  why,
}: {
  index: number;
  sentence: string;
  answer: "Zero" | "First";
  why: string;
}) {
  const [picked, setPicked] = useState<"Zero" | "First" | null>(null);
  const [checked, setChecked] = useState(false);
  const ok = checked && picked === answer;
  return (
    <ItemShell n={index + 1} state={checked ? (ok ? "ok" : "bad") : "idle"}>
      <En52 className="text-lg font-bold text-slate-800">{sentence}</En52>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {(["Zero", "First"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setPicked(option);
              setChecked(false);
            }}
            aria-pressed={picked === option}
            className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition ${
              picked === option ? "border-transparent bg-slate-900 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {option} Conditional
          </button>
        ))}
        <SmallBtn52 dark onClick={() => setChecked(true)} disabled={!picked}>
          تحقق ✓
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setPicked(answer);
            setChecked(true);
          }}
        >
          الحل 💡
        </SmallBtn52>
      </div>
      {checked && (
        <div className="mt-3">
          <VerdictLine ok={ok} />
          <WhyLine>
            <Mixed52 text={why} />
          </WhyLine>
        </div>
      )}
    </ItemShell>
  );
}

/* ============================================================
   6) تصحيح الأخطاء / Unless — إجابة مكتوبة
   ============================================================ */
function TypedItem({
  index,
  prompt,
  accept,
  model,
  why,
  placeholder,
}: {
  index: number;
  prompt: React.ReactNode;
  accept: string[];
  model: string;
  why: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [solved, setSolved] = useState(false);
  const ok = checked && matchesEnglish52(value, accept);
  return (
    <ItemShell n={index + 1} state={checked ? (ok ? "ok" : "bad") : solved ? "ok" : "idle"}>
      <div className="text-lg font-semibold text-slate-700">{prompt}</div>
      <input
        dir="ltr"
        lang="en"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setChecked(false);
          setSolved(false);
        }}
        placeholder={placeholder ?? "Write the full sentence…"}
        aria-label={`إجابة ${index + 1}`}
        className="font-en mt-3 w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-sky-400"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <SmallBtn52 dark onClick={() => setChecked(true)} disabled={!value.trim()}>
          تحقق ✓
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setValue(model);
            setSolved(true);
            setChecked(false);
          }}
        >
          الحل 💡
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setValue("");
            setChecked(false);
            setSolved(false);
          }}
        >
          ↺
        </SmallBtn52>
      </div>
      {checked && (
        <div className="mt-3">
          <VerdictLine ok={ok} />
          <WhyLine>
            <Mixed52 text={why} />
            {!ok && (
              <>
                {" "}
                — الإجابة النموذجية: <En52 className="font-bold">{model}</En52>
              </>
            )}
          </WhyLine>
        </div>
      )}
      {solved && !checked && (
        <div className="mt-3">
          <WhyLine>
            الإجابة النموذجية: <En52 className="font-bold">{model}</En52> — <Mixed52 text={why} />
          </WhyLine>
        </div>
      )}
    </ItemShell>
  );
}

export function ErrorLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={ERROR_52.length} />
      {ERROR_52.map((item, index) => (
        <TypedItem
          key={item.id}
          index={index}
          prompt={
            <span>
              صحح الخطأ: <En52 className="text-rose-700">{item.wrong}</En52>
            </span>
          }
          accept={item.accept}
          model={item.model}
          why={item.why}
        />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

export function UnlessLab({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={UNLESS_52.length} />
      {UNLESS_52.map((item, index) => (
        <TypedItem
          key={item.id}
          index={index}
          prompt={
            <span>
              أعد الصياغة باستخدام <En52 className="font-bold">Unless</En52>: <En52 className="text-slate-800">{item.ifNot}</En52>
            </span>
          }
          accept={item.accept}
          model={item.model}
          why={item.why}
        />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

function TouchButton({ onTouch }: { onTouch?: () => void }) {
  if (!onTouch) return null;
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onTouch}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
      >
        احسب تقدمي في هذا المختبر
      </button>
    </div>
  );
}

/* ============================================================
   التدريبات الستة
   ============================================================ */
export function ExerciseView({ exercise, onTouch }: { exercise: Exercise52; onTouch?: () => void }) {
  return (
    <div className="grid gap-3" data-exercise={exercise.type}>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-base font-semibold text-slate-600">
        <Mixed52 text={exercise.instruction} />
      </div>
      {exercise.type === "gap" &&
        exercise.items.map((item, index) => (
          <GapExerciseItem key={item.id} index={index} item={item} />
        ))}
      {exercise.type === "choice" &&
        exercise.items.map((item, index) => (
          <ExerciseChoiceItem key={item.id} index={index} item={item} />
        ))}
      {exercise.type === "correct" &&
        exercise.items.map((item, index) => (
          <TypedItem
            key={item.id}
            index={index}
            prompt={
              <span>
                صحح: <En52 className="text-rose-700">{item.wrong}</En52>
              </span>
            }
            accept={item.accepts}
            model={item.model}
            why={item.why}
          />
        ))}
      {exercise.type === "classify" &&
        exercise.items.map((item, index) => (
          <ClassifyItem key={item.id} index={index} sentence={item.sentence} answer={item.answer} why={item.why} />
        ))}
      {exercise.type === "unless" &&
        exercise.items.map((item, index) => (
          <TypedItem
            key={item.id}
            index={index}
            prompt={
              <span>
                <En52 className="text-slate-800">{item.ifNot}</En52>
              </span>
            }
            accept={item.accepts}
            model={item.model}
            why={item.why}
          />
        ))}
      {exercise.type === "translate" &&
        exercise.items.map((item, index) => (
          <TypedItem
            key={item.id}
            index={index}
            prompt={<span className="font-head text-lg text-slate-800">{item.ar}</span>}
            accept={item.accepts}
            model={item.model}
            why={item.why}
            placeholder="Write the English translation…"
          />
        ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

function GapExerciseItem({ index, item }: { index: number; item: Extract<Exercise52, { type: "gap" }>["items"][number] }) {
  const [values, setValues] = useState(["", ""]);
  const [checked, setChecked] = useState(false);
  const [solved, setSolved] = useState(false);
  const ok = checked && values.every((value, i) => matchesEnglish52(value, item.accepts[i]));

  const input = (i: number) => (
    <input
      dir="ltr"
      lang="en"
      value={solved ? item.model[i] : values[i]}
      onChange={(event) => {
        setValues((previous) => previous.map((value, index) => (index === i ? event.target.value : value)));
        setChecked(false);
        setSolved(false);
      }}
      aria-label={`الفراغ ${i + 1} في السؤال ${index + 1}`}
      className="font-en w-36 rounded-xl border-2 border-slate-300 bg-white px-3 py-1 text-slate-800 outline-none transition focus:border-sky-400"
    />
  );

  return (
    <ItemShell n={index + 1} state={checked ? (ok ? "ok" : "bad") : solved ? "ok" : "idle"}>
      <p className="mb-2 text-sm font-semibold text-slate-500">
        الفعل المطلوب: <En52 className="rounded-md bg-slate-100 px-1.5 py-0.5 font-bold text-slate-700">{item.cue}</En52>
      </p>
      <div className="flex flex-wrap items-center gap-2 text-lg font-semibold text-slate-700">
        <Mixed52 text={item.before} />
        {input(0)}
        <Mixed52 text={item.mid} />
        {input(1)}
        <Mixed52 text={item.after} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <SmallBtn52 dark onClick={() => setChecked(true)} disabled={!values.every((value) => value.trim())}>
          تحقق ✓
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setValues(item.model);
            setSolved(true);
            setChecked(false);
          }}
        >
          الحل 💡
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setValues(["", ""]);
            setChecked(false);
            setSolved(false);
          }}
        >
          ↺
        </SmallBtn52>
      </div>
      {(checked || solved) && (
        <WhyLine>
          {item.model[0]} + {item.model[1]} — <Mixed52 text={item.why} />
        </WhyLine>
      )}
      {checked && <VerdictLine ok={ok} />}
    </ItemShell>
  );
}

function ExerciseChoiceItem({ index, item }: { index: number; item: Extract<Exercise52, { type: "choice" }>["items"][number] }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const ok = checked && picked === item.answer;
  return (
    <ItemShell n={index + 1} state={checked ? (ok ? "ok" : "bad") : "idle"}>
      <En52 className="text-lg font-bold text-slate-800">{item.sentence}</En52>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {item.options.map((option, i) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setPicked(i);
              setChecked(false);
            }}
            aria-pressed={picked === i}
            className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition ${
              picked === i ? "border-transparent bg-slate-900 text-white shadow" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            <span className="ml-1 font-black text-slate-400">{String.fromCharCode(65 + i)}.</span> <En52>{option}</En52>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <SmallBtn52 dark onClick={() => setChecked(true)} disabled={picked === null}>
          تحقق ✓
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setPicked(item.answer);
            setChecked(true);
          }}
        >
          الحل 💡
        </SmallBtn52>
        <SmallBtn52
          onClick={() => {
            setPicked(null);
            setChecked(false);
          }}
        >
          ↺
        </SmallBtn52>
      </div>
      {checked && (
        <div className="mt-3">
          <VerdictLine ok={ok} />
          <WhyLine>
            <Mixed52 text={item.why} />
          </WhyLine>
        </div>
      )}
    </ItemShell>
  );
}

/* ============================================================
   إجابات التدريبات (شريحتا المراجعة)
   ============================================================ */
type ExerciseItem52 = Exercise52["items"][number];

function solutionRow(exercise: Exercise52, index: number): { prompt: string; model: string; why: string } {
  const item = exercise.items[index] as ExerciseItem52;
  switch (exercise.type) {
    case "gap": {
      const row = item as Extract<Exercise52, { type: "gap" }>["items"][number];
      return {
        prompt: `${row.before} (…) ${row.mid} (…) ${row.after}`,
        model: row.model.join(" · "),
        why: row.why,
      };
    }
    case "choice": {
      const row = item as Extract<Exercise52, { type: "choice" }>["items"][number];
      return {
        prompt: row.sentence,
        model: `${String.fromCharCode(65 + row.answer)}. ${row.options[row.answer]}`,
        why: row.why,
      };
    }
    case "correct": {
      const row = item as Extract<Exercise52, { type: "correct" }>["items"][number];
      return { prompt: row.wrong, model: row.model, why: row.why };
    }
    case "classify": {
      const row = item as Extract<Exercise52, { type: "classify" }>["items"][number];
      return { prompt: row.sentence, model: `${row.answer} Conditional`, why: row.why };
    }
    case "unless": {
      const row = item as Extract<Exercise52, { type: "unless" }>["items"][number];
      return { prompt: row.ifNot, model: row.model, why: row.why };
    }
    case "translate": {
      const row = item as Extract<Exercise52, { type: "translate" }>["items"][number];
      return { prompt: row.ar, model: row.model, why: row.why };
    }
  }
}

export function SolutionsGuide({ part }: { part: 1 | 2 }) {
  const exercises = part === 1 ? EXERCISES_52.slice(0, 3) : EXERCISES_52.slice(3);
  return (
    <div className="grid gap-5" data-solutions-part={part}>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
        هذه الإجابات للمراجعة بعد المحاولة. استخدم «تحقق» و«الحل» داخل كل تدريب أولًا، ثم قارن هنا.
      </div>
      {exercises.map((exercise) => (
        <Card52 key={exercise.badge}>
          <h3 className="font-head mb-1 text-xl font-bold text-slate-900">{exercise.title}</h3>
          <p className="mb-3 text-sm text-slate-500">{exercise.subtitle}</p>
          <ol className="grid gap-3">
            {exercise.items.map((_, index) => {
              const row = solutionRow(exercise, index);
              return (
                <li key={index} className="rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">
                      <Mixed52 text={row.prompt} />
                    </span>
                  </div>
                  <div className="mt-2 text-base font-bold text-emerald-800">
                    <En52>{row.model}</En52>
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    <Mixed52 text={row.why} />
                  </div>
                </li>
              );
            })}
          </ol>
        </Card52>
      ))}
    </div>
  );
}

/* ============================================================
   الحوار والقراءة
   ============================================================ */
export function DialogueView() {
  return (
    <div className="grid gap-3">
      {DIALOGUE_52.map((line, index) => {
        const adam = line.speaker === "Adam";
        return (
          <div key={index} className={`flex gap-3 ${adam ? "" : "flex-row-reverse"}`}>
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${
                adam ? "bg-sky-500" : "bg-emerald-500"
              }`}
              aria-hidden="true"
            >
              {line.speaker.slice(0, 1)}
            </span>
            <div
              className={`max-w-[85%] rounded-2xl border-2 p-3 ${
                adam ? "border-sky-200 bg-sky-50" : "border-emerald-200 bg-emerald-50"
              }`}
            >
              <div className={`text-xs font-bold ${adam ? "text-sky-700" : "text-emerald-700"}`}>{line.speaker}</div>
              <En52 className="mt-1 block text-lg font-bold text-slate-800">{line.en}</En52>
              <div className="mt-1 text-sm text-slate-500">{line.ar}</div>
            </div>
          </div>
        );
      })}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600">
        لاحظ في المحادثة: <En52>will</En52> في النتيجة، و<En52>might</En52> للاحتمال، و<En52>can</En52> للإمكانية،
        والفعل الأمر <En52>bring</En52> في نتيجة الشرط.
      </div>
    </div>
  );
}

export function QuestionsView({ items }: { items: { q: string; a: string; ar?: string }[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <QA52 key={index} q={item.q} a={item.a} ar={item.ar} />
      ))}
    </div>
  );
}

export function ReadingTextView() {
  return (
    <div className="grid gap-3">
      {READING_52.map((paragraph, index) => (
        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-xs font-bold text-white">
              {index + 1}
            </span>
            <p dir="ltr" lang="en" className="font-en text-lg leading-relaxed text-slate-800">
              {paragraph.en}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TranslationView() {
  return (
    <div className="grid gap-3">
      {READING_TRANSLATION_52.map((paragraph, index) => (
        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-400">الفقرة {index + 1}</div>
          <p dir="ltr" lang="en" className="font-en mt-2 text-base font-semibold text-slate-700">
            {paragraph.en}
          </p>
          <p className="mt-2 text-lg leading-relaxed text-slate-800">{paragraph.ar}</p>
        </div>
      ))}
    </div>
  );
}

export function ReadingHunt({ onTouch }: { onTouch?: () => void }) {
  return (
    <div className="grid gap-3">
      <LabIntro count={READING_HUNT_52.length} />
      {READING_HUNT_52.map((item, index) => (
        <TypedItem
          key={index}
          index={index}
          prompt={
            <span>
              <span className="font-bold text-slate-800">{item.prompt}</span>
              <span className="mt-1 block text-sm font-normal text-slate-500">{item.hint}</span>
            </span>
          }
          accept={item.accept}
          model={item.model}
          why={item.why}
        />
      ))}
      <TouchButton onTouch={onTouch} />
    </div>
  );
}

/* ============================================================
   الكتابة والتحدث
   ============================================================ */
function countSentences52(text: string): number {
  return text
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean).length;
}

function countFirstConditionals52(text: string): number {
  const matches = text.match(/\bif\b[^.!?]*\b(?:will|can|may|might|should|must)\b/gi) ?? [];
  const imperatives = text.match(/\bif\b[^.!?]*,\s*(?:call|tell|bring|take|let|answer|send|ask|try|study|practice|practise)\b/gi) ?? [];
  return matches.length + imperatives.length;
}

export function WritingView({
  value,
  onChange,
  onTouch,
}: {
  value: string;
  onChange: (value: string) => void;
  onTouch?: () => void;
}) {
  const text = value;
  const [checked, setChecked] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const sentences = useMemo(() => countSentences52(text), [text]);
  const conditionals = useMemo(() => countFirstConditionals52(text), [text]);
  const sentenceOk = sentences >= 8 && sentences <= 12;
  const conditionalOk = conditionals >= 5;

  return (
    <div className="grid gap-4">
      <Card52>
        <h3 className="font-head text-xl font-bold text-slate-900">التعليمات</h3>
        <ul className="mt-2 grid gap-1 text-slate-600">
          {WRITING_52.instructions.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-violet-600">•</span> {item}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          {WRITING_52.ideas.map((idea) => (
            <span key={idea} className="rounded-full bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
              {idea}
            </span>
          ))}
        </div>
      </Card52>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <label htmlFor="writing52" className="text-sm font-bold text-slate-600">
          اكتب فقرتك هنا (بالإنجليزية)
        </label>
        <textarea
          id="writing52"
          dir="ltr"
          lang="en"
          value={text}
          onChange={(event) => {
            onChange(event.target.value);
            setChecked(false);
          }}
          rows={7}
          placeholder="If I pass all my exams, I will..."
          className="font-en mt-2 w-full rounded-2xl border-2 border-slate-300 bg-white p-4 text-slate-800 outline-none transition focus:border-sky-400"
        />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className={`rounded-xl border-2 px-3 py-2 text-sm font-bold ${sentenceOk ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
            الجمل: <bdi dir="ltr">{sentences}</bdi> / المطلوب 8–12
          </div>
          <div className={`rounded-xl border-2 px-3 py-2 text-sm font-bold ${conditionalOk ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
            جمل الشرط الأول: <bdi dir="ltr">{conditionals}</bdi> / المطلوب 5 على الأقل
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <SmallBtn52
            dark
            onClick={() => {
              setChecked(true);
              onTouch?.();
            }}
          >
            تحقق من الشروط ✓
          </SmallBtn52>
          <SmallBtn52 onClick={() => setModelOpen((value) => !value)}>{modelOpen ? "إخفاء النموذج" : "اعرض النموذج الاسترشادي"}</SmallBtn52>
        </div>
        {checked && (
          <div className="mt-3">
            <StatusLine52 tone={sentenceOk && conditionalOk ? "ok" : "bad"}>
              {sentenceOk && conditionalOk
                ? "✓ الفقرة تستوفي عدد الجمل وعدد جمل الشرط الأول."
                : "✕ راجع عدد الجمل (8–12) وعدد جمل الشرط الأول (5 على الأقل)."}
            </StatusLine52>
          </div>
        )}
        {modelOpen && (
          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="text-xs font-bold text-amber-800">نموذج استرشادي — لا تنسخه، اكتب فقرتك بنفسك</div>
            <pre dir="ltr" className="font-en mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
              {WRITING_52.model}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export function SpeakingView({ onTouch }: { onTouch?: () => void }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  return (
    <div className="grid gap-4">
      <Card52>
        <h3 className="font-head text-xl font-bold text-slate-900">{SPEAKING_52.title}</h3>
        <ul className="mt-2 grid gap-1 text-slate-600">
          {SPEAKING_52.instructions.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-emerald-600">•</span> {item}
            </li>
          ))}
        </ul>
      </Card52>
      <div className="grid gap-3">
        {SPEAKING_52.questions.map((question, index) => (
          <div key={question} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <NumBadge52 n={index + 1} />
              <En52 className="text-lg font-bold text-slate-800">{question}</En52>
              <button
                type="button"
                onClick={() => {
                  setDone((previous) => {
                    const next = new Set(previous);
                    if (next.has(index)) next.delete(index);
                    else next.add(index);
                    return next;
                  });
                  onTouch?.();
                }}
                aria-pressed={done.has(index)}
                className={`mr-auto rounded-xl px-3 py-1.5 text-sm font-bold transition ${
                  done.has(index) ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {done.has(index) ? "✓ أجبت" : "أجبت بصوت مرتفع"}
              </button>
            </div>
            <div className="mt-2 pr-12">
              <En52 className="text-sm text-slate-500">{SPEAKING_52.starters[index]}</En52>
            </div>
          </div>
        ))}
      </div>
      <Card52>
        <div className="text-sm font-bold text-slate-500">مثال</div>
        <div className="mt-1">
          <En52 className="font-bold text-slate-800">{SPEAKING_52.example.q}</En52>
        </div>
        <HiddenAnswer52 button="أظهر الإجابة النموذجية" answer={SPEAKING_52.example.a} />
      </Card52>
      <StatusLine52 tone={done.size === SPEAKING_52.questions.length ? "ok" : "info"}>
        أجبت عن <bdi dir="ltr">{done.size} / {SPEAKING_52.questions.length}</bdi> سؤالًا بصوت مرتفع.
      </StatusLine52>
    </div>
  );
}

/* ============================================================
   الملخص والمراجعة
   ============================================================ */
export function SummaryView() {
  return (
    <div className="grid gap-3">
      <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5">
        <div className="text-sm font-bold text-sky-700">أهم قاعدة يجب ألا تنساها</div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <En52 className="text-xl font-extrabold text-slate-900">If I study, I will pass.</En52>
          <span className="text-slate-400">✓</span>
          <En52 className="text-base font-bold text-rose-700 line-through decoration-rose-300">If I will study, I will pass.</En52>
          <span className="text-rose-500">✕</span>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {SUMMARY_52.map((point, index) => (
          <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-600 text-xs font-bold text-white">
              {index + 1}
            </span>
            <Rich52 text={point} className="text-slate-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewView() {
  return (
    <div className="grid gap-4">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5">
        <div className="text-sm font-bold text-slate-400">القاعدة في سطر واحد</div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="rounded-2xl bg-sky-500 px-4 py-2 font-en text-lg font-extrabold text-white">IF + PRESENT SIMPLE</span>
          <span className="text-2xl font-bold text-slate-300">→</span>
          <span className="rounded-2xl bg-emerald-500 px-4 py-2 font-en text-lg font-extrabold text-white">WILL + V1</span>
        </div>
      </div>
      <div className="grid gap-2">
        {GOLDEN_SENTENCES_52.map((sentence) => (
          <div key={sentence.en} className="flex flex-wrap items-baseline gap-2 rounded-2xl border border-slate-200 bg-white p-3">
            <span className="text-emerald-600">✓</span>
            <En52 className="text-lg font-bold text-slate-800">{sentence.en}</En52>
            <span className="text-slate-500">{sentence.ar}</span>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-slate-900 p-4 text-white">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🦉</span>
          <p className="font-semibold">
            راجع الفرق بين Zero وFirst، وتذكّر أن Unless = If ... not، وأن When وAs soon as وBefore وAfter وUntil تتبعها
            المضارع البسيط عند الحديث عن المستقبل.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SelfCheckView({ onTouch }: { onTouch?: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  return (
    <div className="grid gap-3">
      {SELF_CHECK_52.map((item, index) => (
        <button
          key={item}
          type="button"
          onClick={() => {
            setChecked((previous) => {
              const next = new Set(previous);
              if (next.has(index)) next.delete(index);
              else next.add(index);
              return next;
            });
            onTouch?.();
          }}
          aria-pressed={checked.has(index)}
          className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-right transition ${
            checked.has(index) ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-400"
          }`}
        >
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold ${
              checked.has(index) ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
            }`}
          >
            {checked.has(index) ? "✓" : index + 1}
          </span>
          <span className="text-base font-semibold text-slate-700">{item}</span>
        </button>
      ))}
      <StatusLine52 tone={checked.size === SELF_CHECK_52.length ? "ok" : "info"}>
        <bdi dir="ltr">{checked.size} / {SELF_CHECK_52.length}</bdi> مهارة تحققت منها بنفسك.
      </StatusLine52>
    </div>
  );
}

/* Export helpers for audits. */
export const PRACTICE_MODEL_52 = {
  writing: WRITING_52.model,
  normalization: normalizeEnglish52("If I study, I will pass."),
};
