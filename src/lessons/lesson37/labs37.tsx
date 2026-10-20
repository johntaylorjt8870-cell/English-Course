import { useMemo, useState, type ReactNode } from "react";
import { Rich } from "../../shared/lessonKit";
import { ActionButton37, Feedback37, FOCUS_37, PlatformNote37 } from "./kit37";
import {
  ADVANCED33_ITEMS_37,
  CAMERA_POSITIONS_37,
  CONTINUOUS_SELECT_37,
  DETECTIVE30_ITEMS_37,
  DIALOGUE_LINES_37,
  EXERCISE28_ITEMS_37,
  ING_ITEMS_37,
  IQ200_ITEMS_37,
  MEANING_LAB_37,
  MOMENT_ITEMS_37,
  NEGATIVE_BUILD_37,
  NEGATIVE_ERROR_ITEMS_37,
  READING32_ANALYSIS_37,
  READING32_QUESTIONS_37,
  ROUTINE_ITEMS_37,
  SHORT_ANSWER_ITEMS_37,
  STATE_VERB_ITEMS_37,
  TIME_EXPRESSION_ITEMS_37,
  TIMELINE_MOMENTS_37,
  TRANSFORM29_ITEMS_37,
  TWO_EVENTS_ITEMS_37,
  WHEN_ITEMS_37,
  WHILE_ITEMS_37,
  WHO_ROLE_ITEMS_37,
  WRITING36_CRITERIA_37,
  WRITING36_MODEL_37,
  YESNO_BUILD_37,
  type ChoiceItem37,
} from "./practiceData37";

/* ------------------------------------------------------------------
   Future Horizon · Bright Time Observatory — أنشطة الطالب
   لوحة الألوان: سماوي #0369a1 · تركواز #0f766e · كهربائي #1d4ed8
   مرجاني #c2410c · شمسي #92400e · بنفسجي #6d28d9
   ------------------------------------------------------------------ */

const LAB_SHELL =
  "rounded-3xl border border-[#bae6fd] bg-white p-4 shadow-[0_10px_28px_-20px_rgba(3,105,161,0.35)] sm:p-5";
const INNER = "rounded-2xl border border-[#bae6fd] bg-[#f8fbff] p-3.5";
const ITEM = "rounded-2xl border border-[#bae6fd] bg-white p-3.5 shadow-sm";
const EYEBROW = "text-xs font-black uppercase tracking-[.14em] text-[#0369a1]";
const EN_LINE =
  "font-en rounded-xl border border-[#bae6fd] bg-[#f0f9ff] px-3.5 py-2.5 text-left text-base font-semibold leading-7 text-[#0f172a]";
const META = "text-sm font-bold leading-6 text-[#334155]";

/** نصف مصفوفة نشاط: يسمح بتقسيم تدريب طويل على خطوتين مريحتين. */
function half37<T>(items: readonly T[], half: 1 | 2): T[] {
  const mid = Math.ceil(items.length / 2);
  return half === 1 ? items.slice(0, mid) : items.slice(mid);
}

function EnglishLine37({ children }: { children: ReactNode }) {
  return (
    <p dir="ltr" className={EN_LINE}>
      {children}
    </p>
  );
}

function LabHeader({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return (
    <header className="mb-3">
      <p className={EYEBROW}>
        <Rich text={eyebrow} />
      </p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#0f172a] sm:text-xl">{title}</h2>
    </header>
  );
}

function Counter37({ done, total, label }: { done: number; total: number; label: string }) {
  return (
    <p aria-live="polite" className="mt-3 text-sm font-bold text-[#334155]">
      {label} <span dir="ltr" className="font-en font-black tabular-nums">{done}</span> من{" "}
      <span dir="ltr" className="font-en font-black tabular-nums">{total}</span>.
    </p>
  );
}

/* ============================================================
   1) ChoiceLab37 — مختبر اختيار عام بتغذية راجعة بعد المحاولة
   ============================================================ */

function ChoiceList37({
  groupName,
  item,
  value,
  disabled,
  onSelect,
}: {
  groupName: string;
  item: ChoiceItem37;
  value?: string;
  disabled: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mt-2 grid gap-2 sm:grid-cols-2">
      {item.choices.map((choice) => {
        const active = value === choice.value;
        return (
          <label
            key={choice.value}
            className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm font-bold leading-6 text-[#0f172a] transition-colors motion-reduce:transition-none ${
              active ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white hover:bg-[#f0f9ff]"
            } ${disabled ? "cursor-default" : ""}`}
          >
            <input
              type="radio"
              name={`${groupName}-${item.id}`}
              value={choice.value}
              checked={active}
              disabled={disabled}
              onChange={(event) => onSelect(event.currentTarget.value)}
              className={`${FOCUS_37} mt-1 h-4 w-4 shrink-0 accent-[#0f766e]`}
            />
            <span className="min-w-0" dir="auto">
              <Rich text={choice.label} />
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function ChoiceLab37({
  id,
  items,
  eyebrow,
  title,
  note,
  onComplete,
  footnote,
}: {
  id: string;
  items: readonly ChoiceItem37[];
  eyebrow: string;
  title: ReactNode;
  note?: ReactNode;
  onComplete?: () => void;
  footnote?: ReactNode;
}) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const attempted = items.filter((item) => checked[item.id]).length;
  const complete = attempted === items.length;

  const check = (item: ChoiceItem37) => {
    setChecked((current) => {
      const next = { ...current, [item.id]: true };
      if (Object.keys(next).length === items.length) onComplete?.();
      return next;
    });
  };

  return (
    <section data-lab={id} className={LAB_SHELL}>
      <LabHeader eyebrow={eyebrow} title={title} />
      {note ? <div className="mb-3">{note}</div> : null}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isChecked = !!checked[item.id];
          const accepted = item.accepted.includes(selected[item.id] ?? "");
          return (
            <fieldset
              key={item.id}
              data-lab-item={`${id}-${item.id}`}
              className={ITEM}
            >
              <legend className="sr-only">النشاط {index + 1}</legend>
              <p className="text-base font-bold leading-8 text-[#0f172a]">
                <Rich text={item.prompt} />
              </p>
              {item.lines?.length ? (
                <div className="mt-2 space-y-1.5">
                  {item.lines.map((line) => (
                    <EnglishLine37 key={line}>{line}</EnglishLine37>
                  ))}
                </div>
              ) : null}
              <ChoiceList37
                groupName={id}
                item={item}
                value={selected[item.id]}
                disabled={isChecked}
                onSelect={(value) => setSelected((current) => ({ ...current, [item.id]: value }))}
              />
              {!isChecked ? (
                <ActionButton37 className="mt-3" disabled={!selected[item.id]} onClick={() => check(item)}>
                  تحقق من اختياري
                </ActionButton37>
              ) : (
                <div className="mt-3">
                  <Feedback37
                    state={accepted ? "ok" : "review"}
                    title={accepted ? "اختيار مناسب." : "راجع المعنى: الاختيار الآخر هو الأنسب في هذا المثال."}
                  >
                    <Rich text={item.feedback} />
                    {item.nuance ? (
                      <p className="mt-1">
                        <Rich text={item.nuance} />
                      </p>
                    ) : null}
                  </Feedback37>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <Counter37 done={attempted} total={items.length} label="حاولت" />
      {complete ? (
        <p className="mt-1 text-sm font-black text-[#115e59]">اكتملت المحاولة في هذا المختبر.</p>
      ) : null}
      {footnote ? <div className="mt-3">{footnote}</div> : null}
    </section>
  );
}

/* ============================================================
   2) §2 — مرصد اللحظة المستقبلية (خط زمني تفاعلي)
   ============================================================ */

export function FutureMomentLab37({ onComplete }: { onComplete?: () => void }) {
  const [momentId, setMomentId] = useState<string>("");
  const [answered, setAnswered] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const moment = TIMELINE_MOMENTS_37.find((candidate) => candidate.id === momentId);
  const correct = answered === "seven";
  const width = momentId === "six" ? "12%" : momentId === "seven" ? "50%" : momentId === "nine" ? "88%" : "0%";

  return (
    <section data-lab="timeline" className={LAB_SHELL}>
      <LabHeader eyebrow="§2 · الخط الزمني التفاعلي" title="ضع كاميرا الدرس على لحظة مستقبلية" />
      <PlatformNote37>
        خطة المصدر: دراسة من الساعة السادسة حتى التاسعة مساءً. حرّك المؤشر على اللحظات الثلاث، ثم أجب عن سؤال الكاميرا.
      </PlatformNote37>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {TIMELINE_MOMENTS_37.map((candidate) => {
          const active = momentId === candidate.id;
          return (
            <button
              key={candidate.id}
              type="button"
              data-timeline-moment={candidate.id}
              aria-pressed={active}
              onClick={() => setMomentId(candidate.id)}
              className={`${FOCUS_37} min-h-16 rounded-2xl border px-3 py-2.5 text-right transition-colors motion-reduce:transition-none ${
                active ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white hover:bg-[#f0f9ff]"
              }`}
            >
              <span dir="ltr" className="font-en block text-lg font-black tabular-nums text-[#0c4a6e]">
                {candidate.clock}
              </span>
              <span className="mt-0.5 block text-sm font-bold text-[#1e293b]">{candidate.label}</span>
            </button>
          );
        })}
      </div>

      <div dir="ltr" className="fh37-timeline mt-3">
        <div className="fh37-timeline__beam">
          <div className="fh37-timeline__active" style={{ width }} />
        </div>
        <div className="mt-1.5 flex justify-between">
          <span className="text-xs font-black tracking-wide text-[#334155]">PAST</span>
          <span className="text-xs font-black tracking-wide text-[#0c4a6e]">NOW</span>
          <span className="text-xs font-black tracking-wide text-[#334155]">FUTURE</span>
        </div>
      </div>

      {moment ? (
        <div className="mt-3 space-y-2" data-timeline-readout={moment.id}>
          <EnglishLine37>{moment.sentence}</EnglishLine37>
          <p className={META}>
            <Rich text={moment.arabic} />
          </p>
          <p className="rounded-xl bg-[#e0f2fe] px-3.5 py-2 text-sm font-bold leading-6 text-[#0c4a6e]">
            <Rich text={moment.note} />
          </p>
        </div>
      ) : (
        <p className="mt-3 rounded-xl border border-dashed border-[#7dd3fc] bg-[#f8fbff] px-3.5 py-2.5 text-sm font-bold text-[#0c4a6e]">
          اختر لحظة من اللحظات الثلاث لعرض ما يحدث فيها.
        </p>
      )}

      <fieldset className="mt-4 rounded-2xl border border-[#bae6fd] bg-[#f8fbff] p-3.5">
        <legend className="px-1 text-sm font-black text-[#0c4a6e]">سؤال الكاميرا</legend>
        <p className="font-bold leading-7 text-[#0f172a]">
          <Rich text="أي لحظة تصف الجملة I will be studying. ؟" />
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TIMELINE_MOMENTS_37.map((candidate) => (
            <label
              key={candidate.id}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${
                answered === candidate.id ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white"
              }`}
            >
              <input
                type="radio"
                name="timeline-answer"
                value={candidate.id}
                checked={answered === candidate.id}
                disabled={checked}
                onChange={() => setAnswered(candidate.id)}
                className={`${FOCUS_37} h-4 w-4 accent-[#0f766e]`}
              />
              <span dir="ltr" className="font-en font-black text-[#0c4a6e]">{candidate.clock}</span>
            </label>
          ))}
        </div>
        {!checked ? (
          <ActionButton37
            className="mt-3"
            disabled={!answered}
            onClick={() => {
              setChecked(true);
              setMomentId((current) => current || answered);
              onComplete?.();
            }}
          >
            تحقق من إجابتي
          </ActionButton37>
        ) : (
          <div className="mt-3">
            <Feedback37
              state={correct ? "ok" : "review"}
              title={correct ? "إجابة صحيحة." : "راجع موقع الكاميرا: النشاط الجاري يقع بين البداية والنهاية."}
            >
              الجملة تصف اللحظة الوسطى (7:00) حيث الدراسة جارية، لا لحظة البداية (6:00) ولا النهاية (9:00).
            </Feedback37>
          </div>
        )}
      </fieldset>
    </section>
  );
}

/* ============================================================
   3) §3 — بانِي الصيغة (ترتيب العناصر)
   ============================================================ */

const FORMULA_PIECES_37 = [
  { id: "ving", label: "V-ing", role: "الفعل + ing" },
  { id: "subject", label: "Subject", role: "الفاعل" },
  { id: "be", label: "be", role: "الفعل المساعد الأساسي" },
  { id: "will", label: "will", role: "المساعد المستقبلي" },
] as const;

const FORMULA_ORDER_37 = ["subject", "will", "be", "ving"];

export function FormulaOrderLab37({ onComplete }: { onComplete?: () => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const correct = picked.join("-") === FORMULA_ORDER_37.join("-");

  return (
    <section data-lab="formula-order" className={LAB_SHELL}>
      <LabHeader eyebrow="§3 · ورشة بناء الصيغة" title="رتّب أجزاء الجملة من اليمين إلى اليسار" />
      <PlatformNote37>
        انقر القطع بالترتيب الذي تبني به الجملة الإنجليزية: من الفاعل حتى الفعل مع <span dir="ltr" className="font-en font-black">-ing</span>.
      </PlatformNote37>

      <div className="mt-3 min-h-16 rounded-2xl border-2 border-dashed border-[#7dd3fc] bg-[#f8fbff] p-3">
        {picked.length === 0 ? (
          <p className="text-sm font-bold text-[#0c4a6e]">لم تختر أي قطعة بعد.</p>
        ) : (
          <div dir="ltr" className="flex flex-wrap items-center gap-2">
            {picked.map((id, index) => {
              const piece = FORMULA_PIECES_37.find((entry) => entry.id === id)!;
              return (
                <span key={`${id}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden className="font-black text-[#0369a1]">+</span> : null}
                  <span className="fh37-token fh37-token--will font-en text-sm">{piece.label}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      <ul className="mt-3 grid gap-1.5 text-sm leading-6 text-[#334155] sm:grid-cols-2">
        {[
          "القطعة الأولى: الفاعل الذي يقوم بالنشاط.",
          "القطعة الثانية: المساعد المستقبلي.",
          "القطعة الثالثة: الشكل الأساسي من الفعل المساعد.",
          "القطعة الرابعة: الفعل مضافًا إليه ing.",
        ].map((line) => (
          <li key={line} className="rounded-lg bg-[#f8fbff] px-3 py-1.5">{line}</li>
        ))}
      </ul>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {FORMULA_PIECES_37.map((piece) => {
          const used = picked.filter((entry) => entry === piece.id).length;
          return (
            <button
              key={piece.id}
              type="button"
              data-formula-piece={piece.id}
              disabled={checked || used > 0}
              onClick={() => setPicked((current) => [...current, piece.id])}
              aria-label={`${piece.label} — ${piece.role}`}
              className={`${FOCUS_37} flex min-h-14 items-center justify-center rounded-xl border px-3 py-2 transition-colors motion-reduce:transition-none ${
                used > 0
                  ? "border-[#cbd5e1] bg-[#f1f5f9] text-[#475569]"
                  : "border-[#7dd3fc] bg-white hover:bg-[#e0f2fe]"
              }`}
            >
              <span dir="ltr" className="font-en text-base font-black text-[#0c4a6e]">{piece.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {!checked ? (
          <ActionButton37
            disabled={picked.length !== FORMULA_PIECES_37.length}
            onClick={() => {
              setChecked(true);
              onComplete?.();
            }}
          >
            تحقق من الترتيب
          </ActionButton37>
        ) : (
          <ActionButton37
            variant="secondary"
            onClick={() => {
              setPicked([]);
              setChecked(false);
            }}
          >
            إعادة الترتيب
          </ActionButton37>
        )}
      </div>

      {checked ? (
        <div className="mt-3">
          <Feedback37
            state={correct ? "ok" : "review"}
            title={correct ? "ترتيب صحيح." : "الترتيب غير مكتمل — أعد المحاولة."}
          >
            الصيغة الثابتة: <span dir="ltr" className="font-en font-black">Subject + will + be + V-ing</span> — لا تتغير مع الضمائر.
          </Feedback37>
        </div>
      ) : null}
    </section>
  );
}

/* ============================================================
   4) §4 — تشريح الجملة ووظيفة كل عنصر
   ============================================================ */

const PARTS_SCENE_37 = [
  { role: "الفاعل", word: "She", note: "من يقوم بالنشاط." },
  { role: "فعل مساعد للمستقبل", word: "will", note: "يحدد الإطار الزمني المستقبلي." },
  { role: "الشكل الأساسي من be", word: "be", note: "لا يتغير مع الفاعل، ولا يصبح is/am/are بعد will." },
  { role: "الفعل + ing", word: "preparing", note: "النشاط الجاري نفسه (prepare → preparing)." },
  { role: "بقية الجملة", word: "dinner", note: "المفعول أو التكملة." },
] as const;

export function PartsLab37({ onComplete }: { onComplete?: () => void }) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = answer === "be";

  return (
    <section data-lab="parts" className={LAB_SHELL}>
      <LabHeader eyebrow="§4 · تشريح نحوي" title="لماذا be وليس is؟" />
      <div className="mt-2 overflow-hidden rounded-2xl border border-[#bae6fd]">
        <table dir="ltr" aria-label="تحليل جملة She will be preparing dinner" className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#0c4a6e] text-white">
              <th scope="col" className="px-3 py-2 text-sm font-black">Word</th>
              <th scope="col" className="px-3 py-2 text-sm font-black">Role</th>
            </tr>
          </thead>
          <tbody>
            {PARTS_SCENE_37.map((part, index) => (
              <tr key={part.word} className={index % 2 === 0 ? "bg-white" : "bg-[#f0f9ff]"}>
                <th scope="row" className="border-t border-[#bae6fd] px-3 py-2 text-left">
                  <span className="font-en text-base font-black text-[#0c4a6e]">{part.word}</span>
                </th>
                <td className="border-t border-[#bae6fd] px-3 py-2 text-sm font-bold text-[#1e293b]">
                  {part.role} — {part.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <fieldset className="mt-3 rounded-2xl border border-[#bae6fd] bg-[#f8fbff] p-3.5">
        <legend className="px-1 text-sm font-black text-[#0c4a6e]">تحقق سريع</legend>
        <p className="font-bold leading-7 text-[#0f172a]">
          <Rich text="She will ___ preparing dinner. — أي صيغة من be تضع في الفراغ؟" />
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["is", "be", "being"].map((option) => (
            <label
              key={option}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold ${
                answer === option ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white"
              }`}
            >
              <input
                type="radio"
                name="parts-be"
                value={option}
                checked={answer === option}
                disabled={checked}
                onChange={() => setAnswer(option)}
                className={`${FOCUS_37} h-4 w-4 accent-[#0f766e]`}
              />
              <span dir="ltr" className="font-en font-black text-[#0c4a6e]">{option}</span>
            </label>
          ))}
        </div>
        {!checked ? (
          <ActionButton37
            className="mt-3"
            disabled={!answer}
            onClick={() => {
              setChecked(true);
              onComplete?.();
            }}
          >
            تحقق
          </ActionButton37>
        ) : (
          <div className="mt-3">
            <Feedback37
              state={correct ? "ok" : "review"}
              title={correct ? "صحيح: be هي الشكل الأساسي." : "الصحيح هو be."}
            >
              لأن <span dir="ltr" className="font-en font-black">will</span> يجب أن يتبعها الفعل الأساسي V1، والشكل الأساسي من{" "}
              <span dir="ltr" className="font-en font-black">am/is/are</span> هو{" "}
              <span dir="ltr" className="font-en font-black">be</span>. لذلك:{" "}
              <span dir="ltr" className="font-en font-black">She will be preparing dinner. ✅</span> مقابل{" "}
              <span dir="ltr" className="font-en font-black">She will is preparing dinner. ❌</span>
            </Feedback37>
          </div>
        )}
      </fieldset>
    </section>
  );
}

/* ============================================================
   5) §5 — لوحة التصريف السبعة
   ============================================================ */

const PRONOUN_SENTENCES_37: Record<string, string> = {
  I: "I will be studying.",
  You: "You will be studying.",
  He: "He will be studying.",
  She: "She will be studying.",
  It: "It will be working.",
  We: "We will be studying.",
  They: "They will be studying.",
};

export function ConjugationLab37() {
  const [pronoun, setPronoun] = useState("I");
  return (
    <section data-lab="conjugation" className={LAB_SHELL}>
      <LabHeader eyebrow="§5 · لوحة التصريف" title="اختر الضمير لترى أن الصيغة لا تتغير" />
      <div className="mt-2 flex flex-wrap gap-2">
        {Object.keys(PRONOUN_SENTENCES_37).map((entry) => (
          <button
            key={entry}
            type="button"
            data-pronoun={entry}
            aria-pressed={pronoun === entry}
            onClick={() => setPronoun(entry)}
            className={`${FOCUS_37} min-h-11 min-w-14 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              pronoun === entry
                ? "border-[#0f766e] bg-[#0f766e] text-white"
                : "border-[#7dd3fc] bg-white text-[#0c4a6e] hover:bg-[#e0f2fe]"
            }`}
          >
            <span dir="ltr" className="font-en">{entry}</span>
          </button>
        ))}
      </div>
      <p dir="ltr" data-pronoun-readout={pronoun} className="font-en mt-3 rounded-2xl border border-[#5eead4] bg-[#f0fdfa] px-4 py-3 text-left text-lg font-black text-[#115e59]">
        {PRONOUN_SENTENCES_37[pronoun]}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {[
          { icon: "🚫", text: "لا نضيف s مع He أو She أو It." },
          { icon: "🚫", text: "لا نستخدم am/is/are بعد will." },
          { icon: "✅", text: "الصيغة ثابتة: will be + V-ing." },
        ].map((entry) => (
          <p key={entry.text} className="rounded-xl border border-[#bae6fd] bg-[#f8fbff] px-3 py-2 text-sm font-bold leading-6 text-[#1e293b]">
            <span aria-hidden>{entry.icon}</span> <Rich text={entry.text} />
          </p>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   6) §7 — كاميرا الماضي والحاضر والمستقبل
   ============================================================ */

export function CameraLab37() {
  const [position, setPosition] = useState("future");
  const current = CAMERA_POSITIONS_37.find((entry) => entry.id === position) ?? CAMERA_POSITIONS_37[2];
  return (
    <section data-lab="camera" className={LAB_SHELL}>
      <LabHeader eyebrow="§7 · كاميرا الخط الزمني" title="حرّك الكاميرا وشاهد كيف تتغير الصيغة" />
      <div className="mt-2 flex flex-wrap gap-2">
        {CAMERA_POSITIONS_37.map((entry) => (
          <button
            key={entry.id}
            type="button"
            data-camera-position={entry.id}
            aria-pressed={position === entry.id}
            onClick={() => setPosition(entry.id)}
            className={`${FOCUS_37} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              position === entry.id
                ? "border-[#1d4ed8] bg-[#1d4ed8] text-white"
                : "border-[#7dd3fc] bg-white text-[#0c4a6e] hover:bg-[#e0f2fe]"
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <div data-camera-readout={current.id} className="mt-3 space-y-2">
        <p dir="ltr" className="font-en rounded-xl border border-[#bae6fd] bg-[#f0f9ff] px-3.5 py-2 text-left text-sm font-black text-[#0c4a6e]">
          {current.time}
        </p>
        <EnglishLine37>{current.sentence}</EnglishLine37>
        <p className={META}>
          <Rich text={current.arabic} />
        </p>
        <p dir="ltr" className="font-en rounded-xl bg-[#e0f2fe] px-3.5 py-2 text-left text-sm font-black text-[#0c4a6e]">
          {current.form}
        </p>
        <p className="rounded-xl bg-[#e0f2fe] px-3.5 py-2 text-sm font-bold leading-6 text-[#0c4a6e]">
          <Rich text={current.note} />
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   7) §14 — الحوار التفاعلي
   ============================================================ */

export function DialogueLab37({ onComplete }: { onComplete?: () => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const opened = Object.values(open).filter(Boolean).length;

  return (
    <section data-lab="dialogue" className={LAB_SHELL}>
      <LabHeader eyebrow="§14 · Tomorrow’s Schedule" title="افتح كل سطر لترى ترجمته وتحليله" />
      <div className="mt-3 space-y-2">
        {DIALOGUE_LINES_37.map((line, index) => {
          const isOpen = !!open[line.id];
          return (
            <article key={line.id} data-dialogue-line={line.id} className={ITEM}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen((current) => ({ ...current, [line.id]: true }))}
                className={`${FOCUS_37} flex min-h-11 w-full flex-wrap items-center justify-between gap-2 rounded-xl px-1 text-right`}
              >
                <span dir="ltr" className="font-en min-w-0 text-left text-[#0f172a]">
                  <span className="font-black text-[#0369a1]">{line.speaker}: </span>
                  {line.en}
                </span>
                <span className="shrink-0 rounded-full bg-[#e0f2fe] px-2.5 py-1 text-xs font-black text-[#0c4a6e]">
                  {isOpen ? "مفتوح" : `تحليل السطر ${index + 1}`}
                </span>
              </button>
              {isOpen ? (
                <div className="mt-2 space-y-1.5 border-t border-[#bae6fd] pt-2 text-sm leading-6">
                  <p dir="rtl" className="text-[#1e293b]">
                    <Rich text={line.ar} />
                  </p>
                  <p className="rounded-xl bg-[#f0fdfa] px-3 py-2 font-bold text-[#115e59]">
                    <span dir="ltr" className="font-en inline-block rounded bg-white px-2 text-[#115e59]">{line.form}</span>{" "}
                    — {line.analysis}
                  </p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
      <Counter37 done={opened} total={DIALOGUE_LINES_37.length} label="فتحت" />

      <fieldset className="mt-3 rounded-2xl border border-[#bae6fd] bg-[#f8fbff] p-3.5">
        <legend className="px-1 text-sm font-black text-[#0c4a6e]">سؤال فهم الحوار</legend>
        <p className="font-bold leading-7 text-[#0f172a]">أي سطر يسأل عن نشاط سيكون جاريًا؟</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            { value: "d1", label: "Lena: Can I call you tomorrow at 9:00?" },
            { value: "d5", label: "Lena: Will you be studying all morning?" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex min-h-11 cursor-pointer items-start gap-2 rounded-xl border p-3 text-sm font-bold ${
                answer === option.value ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white"
              }`}
            >
              <input
                type="radio"
                name="dialogue-question"
                value={option.value}
                checked={answer === option.value}
                disabled={checked}
                onChange={() => setAnswer(option.value)}
                className={`${FOCUS_37} mt-1 h-4 w-4 accent-[#0f766e]`}
              />
              <span dir="ltr" className="font-en text-left">{option.label}</span>
            </label>
          ))}
        </div>
        {!checked ? (
          <ActionButton37
            className="mt-3"
            disabled={!answer}
            onClick={() => {
              setChecked(true);
              onComplete?.();
            }}
          >
            تحقق
          </ActionButton37>
        ) : (
          <div className="mt-3">
            <Feedback37 state={answer === "d5" ? "ok" : "review"} title={answer === "d5" ? "إجابة صحيحة." : "راجع معنى السؤالين."}>
              السؤال عن نشاط سيكون جاريًا هو:{" "}
              <span dir="ltr" className="font-en font-black">Will you be studying all morning?</span> — ومن تحليل المصدر: «سؤال عن نشاط سيكون جاريًا».
            </Feedback37>
          </div>
        )}
      </fieldset>
    </section>
  );
}

/* ============================================================
   8) بواني النفي والسؤال (BuildLab37)
   ============================================================ */

function isPureEnglishBase37(text: string) {
  return /[A-Za-z]/.test(text) && !/[\u0600-\u06FF]/.test(text);
}

export type ElementCheck37 = { label: string; ok: boolean };

export function elementCheck37(answer: string, kind: "negative" | "question" | "wh"): ElementCheck37[] {
  const text = answer.trim();
  const lower = text.toLowerCase();
  const hasBe = /\bbe\b/.test(lower) || /\bbeing\b/.test(lower);
  const ingWord = lower.match(/\b[a-z]+ing\b/);
  const hasIng = !!ingWord && !["being", "during", "morning", "evening", "something", "nothing"].includes(ingWord[0]);
  const negated = /\bwon't\b|\bwill not\b/.test(lower);
  const questionMark = text.endsWith("?");
  const startsWill = /^will\b/i.test(text);
  const startsWh = /^(what|where|when|why|who|how|how long)\b/i.test(lower);
  if (kind === "negative") {
    return [
      { label: "الفاعل في البداية", ok: text.length > 0 },
      { label: "will not أو won't", ok: negated },
      { label: "be بعد النفي", ok: hasBe },
      { label: "الفعل بصيغة -ing", ok: hasIng },
    ];
  }
  if (kind === "wh") {
    return [
      { label: "أداة استفهام (What / Where / When / Why / Who / How)", ok: startsWh },
      { label: "will بعد أداة الاستفهام", ok: /\bwill\b/.test(lower) },
      { label: "be قبل الفعل", ok: hasBe },
      { label: "الفعل بصيغة -ing", ok: hasIng },
      { label: "علامة السؤال (?)", ok: questionMark },
    ];
  }
  return [
    { label: "يبدأ السؤال بـ Will", ok: startsWill },
    { label: "الفاعل بعد will", ok: startsWill && text.length > 4 },
    { label: "be بعد الفاعل", ok: hasBe },
    { label: "الفعل بصيغة -ing", ok: hasIng },
    { label: "علامة السؤال (?)", ok: questionMark },
  ];
}

type BuildItem37 = {
  id: string;
  n: number;
  base: string;
  arabic?: string;
  kind: "negative" | "question" | "wh";
  expected: string;
  sourceAnswer?: string;
};

export function BuildLab37({
  id,
  eyebrow,
  title,
  note,
  items,
  onComplete,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: ReactNode;
  items: readonly BuildItem37[];
  onComplete?: () => void;
}) {
  const [input, setInput] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const attempted = items.filter((item) => checked[item.id]).length;

  return (
    <section data-lab={id} className={LAB_SHELL}>
      <LabHeader eyebrow={eyebrow} title={title} />
      {note ? <div className="mb-3">{note}</div> : null}
      <div className="space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          const report = elementCheck37(input[item.id] ?? "", item.kind);
          const allOk = report.every((entry) => entry.ok);
          return (
            <fieldset key={item.id} data-build-item={`${id}-${item.n}`} className={ITEM}>
              <legend className="sr-only">البند {item.n}</legend>
              {isPureEnglishBase37(item.base) ? (
                <p dir="ltr" className="font-en rounded-xl border border-[#bae6fd] bg-[#f0f9ff] px-3.5 py-2 text-left text-base font-semibold text-[#0f172a]">
                  {item.base}
                </p>
              ) : (
                <p dir="rtl" className="rounded-xl border border-[#bae6fd] bg-[#f0f9ff] px-3.5 py-2 text-right font-bold text-[#0f172a]">
                  <Rich text={item.base} />
                </p>
              )}
              {item.arabic ? (
                <p className="mt-1.5 text-sm leading-6 text-[#334155]">
                  <Rich text={item.arabic} />
                </p>
              ) : null}
              <label className="mt-2 block">
                <span className="mb-1 block text-sm font-bold text-[#334155]">
                  {item.kind === "negative" ? "اكتب صيغة النفي" : item.kind === "wh" ? "اكتب سؤال Wh" : "اكتب السؤال"}
                </span>
                <input
                  type="text"
                  dir="auto"
                  value={input[item.id] ?? ""}
                  disabled={isChecked}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setInput((current) => ({ ...current, [item.id]: value }));
                  }}
                  className={`${FOCUS_37} w-full rounded-xl border border-[#7dd3fc] bg-white px-3 py-2.5 text-base text-[#0f172a]`}
                  aria-label={`إجابة البند ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!(input[item.id] ?? "").trim()}
                  onClick={() => {
                    setChecked((current) => {
                      const next = { ...current, [item.id]: true };
                      if (Object.keys(next).length === items.length) onComplete?.();
                      return next;
                    });
                  }}
                >
                  افحص العناصر
                </ActionButton37>
              ) : (
                <div className="mt-2 space-y-2">
                  <Feedback37
                    state={allOk ? "ok" : "review"}
                    title={allOk ? "العناصر المطلوبة ظاهرة في إجابتك." : "راجع العناصر الناقصة، ثم قارن بمفتاح المصدر."}
                  >
                    <ul className="mt-1 space-y-1">
                      {report.map((entry) => (
                        <li key={entry.label} className="flex items-center gap-2">
                          <span aria-hidden className={entry.ok ? "font-black text-[#115e59]" : "font-black text-[#9f1239]"}>
                            {entry.ok ? "✓" : "✕"}
                          </span>
                          <span>{entry.label}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs leading-5">
                      هذا فحص بنيوي للعناصر لا حكم على صحة إجابتك كاملة؛ قد تكون إجابتك مقبولة بصياغة مختلفة.
                    </p>
                  </Feedback37>
                  <div className="rounded-xl border border-[#5eead4] bg-[#f0fdfa] p-3 text-sm leading-6 text-[#115e59]">
                    <p className="font-black">إجابة المصدر:</p>
                    <p dir="ltr" className="font-en font-bold">{item.sourceAnswer ?? item.expected}</p>
                  </div>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <Counter37 done={attempted} total={items.length} label="حاولت" />
      {attempted === items.length ? (
        <p className="mt-1 text-sm font-black text-[#115e59]">ظهرت إجابات المصدر لكل بند؛ قارن صياغتك بها.</p>
      ) : null}
    </section>
  );
}

export function NegativeBuildLab37({ onComplete, half }: { onComplete?: () => void; half?: 1 | 2 }) {
  const source = half ? half37(NEGATIVE_BUILD_37, half) : NEGATIVE_BUILD_37;
  return (
    <BuildLab37
      id="negative-build"
      eyebrow="§18 · بانِي النفي"
      title="حوّل كل جملة إلى النفي"
      note={
        <PlatformNote37>
          <Rich text="الصيغة: Subject + won't + be + V-ing (أو will not be). اكتب نفيك ثم افحص العناصر، وسترى صيغة المصدر للمقارنة." />
        </PlatformNote37>
      }
      items={source.map((item) => ({
        id: item.id,
        n: item.n,
        base: item.base,
        arabic: item.arabic,
        kind: "negative" as const,
        expected: item.negative,
        sourceAnswer: `${item.negative}  ·  ${item.alt}`,
      }))}
      onComplete={onComplete}
    />
  );
}

export function YesNoBuildLab37({ onComplete, half }: { onComplete?: () => void; half?: 1 | 2 }) {
  const source = half ? half37(YESNO_BUILD_37, half) : YESNO_BUILD_37;
  return (
    <BuildLab37
      id="yesno-build"
      eyebrow="§20 · بانِي السؤال"
      title="كوّن سؤال نعم/لا من كل جملة"
      note={
        <PlatformNote37>
          الطريقة: نضع <span dir="ltr" className="font-en font-black">will</span> قبل الفاعل. القاعدة:{" "}
          <span dir="ltr" className="font-en font-black">Will + Subject + be + V-ing?</span>
        </PlatformNote37>
      }
      items={source.map((item) => ({
        id: item.id,
        n: item.n,
        base: item.base,
        kind: "question" as const,
        expected: item.question,
        sourceAnswer: item.question,
      }))}
      onComplete={onComplete}
    />
  );
}

export function WhBuildLab37({ onComplete, half }: { onComplete?: () => void; half?: 1 | 2 }) {
  const all: BuildItem37[] = [
    { id: "what-afternoon", n: 1, base: "ماذا ستكون تفعل غدًا بعد الظهر؟", kind: "wh", expected: "What will you be doing tomorrow afternoon?" },
    { id: "where-staying", n: 2, base: "أين سيكونون يقيمون الأسبوع القادم؟", kind: "wh", expected: "Where will they be staying next week?" },
    { id: "when-working", n: 3, base: "متى ستكون تعمل؟", kind: "wh", expected: "When will she be working?" },
    { id: "why-alone", n: 4, base: "لماذا سيكون مسافرًا بمفرده؟", kind: "wh", expected: "Why will he be travelling alone?" },
    { id: "who-meeting", n: 5, base: "من ستقابل غدًا؟", kind: "wh", expected: "Who will you be meeting tomorrow?" },
    { id: "how-long", n: 6, base: "كم من الوقت سيقيمون؟", kind: "wh", expected: "How long will they be staying?" },
  ];
  const items = half ? half37(all, half) : all;
  return (
    <BuildLab37
      id="wh-build"
      eyebrow="§22 · بانِي أسئلة Wh"
      title="ابنِ سؤال Wh من المعنى العربي"
      note={
        <PlatformNote37>
          <Rich text="القاعدة: Wh-word + will + Subject + be + V-ing? اكتب السؤال الإنجليزي من المعنى، ثم افحص عناصره." />
        </PlatformNote37>
      }
      items={items}
      onComplete={onComplete}
    />
  );
}

/* ============================================================
   9) §24 — ورشة -ing
   ============================================================ */

export function IngLab37({ onComplete }: { onComplete?: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const attempted = ING_ITEMS_37.filter((item) => checked[item.base]).length;
  const correctCount = ING_ITEMS_37.filter(
    (item) => checked[item.base] && (values[item.base] ?? "").trim().toLowerCase() === item.answer,
  ).length;

  return (
    <section data-lab="ing" className={LAB_SHELL}>
      <LabHeader eyebrow="§24 · ورشة -ing" title="اكتب الصيغة الصحيحة لكل فعل" />
      <PlatformNote37>
        اكتب صيغة -ing ثم تحقق. القواعد الأربع كما في المصدر: الإضافة المباشرة، وحذف e الصامتة، ومضاعفة الحرف الأخير في أفعال معينة،
        وتحوّل ie إلى ying.
      </PlatformNote37>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {ING_ITEMS_37.map((item) => {
          const isChecked = !!checked[item.base];
          const ok = (values[item.base] ?? "").trim().toLowerCase() === item.answer;
          return (
            <div key={item.base} data-ing-item={item.base} className={ITEM}>
              <div className="flex min-w-0 items-center gap-2">
                <span dir="ltr" className={`font-en shrink-0 text-base font-black ${isChecked && ok ? "text-[#115e59]" : "text-[#0c4a6e]"}`}>
                  {item.base}
                </span>
                <span aria-hidden className="shrink-0 font-black text-[#0369a1]">→</span>
                <input
                  type="text"
                  dir="ltr"
                  lang="en"
                  value={values[item.base] ?? ""}
                  disabled={isChecked}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setValues((current) => ({ ...current, [item.base]: value }));
                  }}
                  aria-label={`صيغة ing للفعل ${item.base}`}
                  className={`${FOCUS_37} min-w-0 flex-1 rounded-lg border border-[#7dd3fc] bg-white px-3 py-2 text-base text-[#0f172a]`}
                />
              </div>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!(values[item.base] ?? "").trim()}
                  onClick={() => {
                    setChecked((current) => {
                      const next = { ...current, [item.base]: true };
                      if (Object.keys(next).length === ING_ITEMS_37.length) onComplete?.();
                      return next;
                    });
                  }}
                >
                  تحقق
                </ActionButton37>
              ) : (
                <div className="mt-2">
                  <Feedback37 state={ok ? "ok" : "review"} title={ok ? "صحيح." : `الصحيح: ${item.answer}`}>
                    <Rich text={item.rule} />
                  </Feedback37>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#334155]">
        حاولت <span dir="ltr" className="font-en font-black tabular-nums">{attempted}</span> من{" "}
        <span dir="ltr" className="font-en font-black tabular-nums">{ING_ITEMS_37.length}</span>، وصحيح منها{" "}
        <span dir="ltr" className="font-en font-black tabular-nums">{correctCount}</span>.
      </p>
      <div className="mt-3">
        <PlatformNote37>
          ملاحظة دقة من المنصة: قاعدة مضاعفة الحرف الأخير تحتاج شرطًا إضافيًا — المقطع الأخير يجب أن يكون مُشدَّدًا وينتهي (ساكن + متحرك +
          ساكن)، لذلك: <span dir="ltr" className="font-en font-black">begin → beginning</span> و
          <span dir="ltr" className="font-en font-black">run → running</span>، أما{" "}
          <span dir="ltr" className="font-en font-black">visit → visiting</span> و
          <span dir="ltr" className="font-en font-black">open → opening</span> فلا مضاعفة فيهما. و
          <span dir="ltr" className="font-en font-black">travel → travelling</span> بالكتابة البريطانية هي المستخدمة في أمثلة هذا الدرس.
        </PlatformNote37>
      </div>
    </section>
  );
}

/* ============================================================
   10) §28 — التدريب التأسيسي
   ============================================================ */

export function Exercise28Lab37({ onComplete }: { onComplete?: () => void }) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = EXERCISE28_ITEMS_37.filter((item) => checked[item.n]).length;
  const score = EXERCISE28_ITEMS_37.filter((item) => checked[item.n] && selected[item.n] === item.answer).length;

  return (
    <section data-lab="exercise28" className={LAB_SHELL}>
      <LabHeader eyebrow="§28 · تدريب تأسيسي" title="اختر الصيغة الصحيحة (ستة أسئلة)" />
      <div className="space-y-3">
        {EXERCISE28_ITEMS_37.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = selected[item.n] === item.answer;
          return (
            <fieldset key={item.n} data-practice-item={`exercise28-${item.n}`} className={ITEM}>
              <legend className="sr-only">السؤال {item.n}</legend>
              <p dir="ltr" className="font-en text-left text-base font-semibold text-[#0f172a]">
                {item.prompt}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.options.map((option) => {
                  const value = option.split(".")[0].trim();
                  return (
                    <label
                      key={option}
                      className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${
                        selected[item.n] === value ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`exercise28-${item.n}`}
                        value={value}
                        checked={selected[item.n] === value}
                        disabled={isChecked}
                        onChange={() => setSelected((current) => ({ ...current, [item.n]: value }))}
                        className={`${FOCUS_37} h-4 w-4 accent-[#0f766e]`}
                      />
                      <span dir="ltr" className="font-en text-[#0f172a]">{option}</span>
                    </label>
                  );
                })}
              </div>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!selected[item.n]}
                  onClick={() => {
                    setChecked((current) => {
                      const next = { ...current, [item.n]: true };
                      if (Object.keys(next).length === EXERCISE28_ITEMS_37.length) onComplete?.();
                      return next;
                    });
                  }}
                >
                  تحقق
                </ActionButton37>
              ) : (
                <div className="mt-2">
                  <Feedback37
                    state={ok ? "ok" : "review"}
                    title={ok ? "إجابة صحيحة." : `إجابة المصدر: ${item.answer} — ${item.answerText}`}
                  >
                    حل المصدر: <span dir="ltr" className="font-en font-black">{item.answer} — {item.answerText}</span>
                  </Feedback37>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#334155]">
        حاولت <span dir="ltr" className="font-en font-black tabular-nums">{attempted}</span> من{" "}
        <span dir="ltr" className="font-en font-black tabular-nums">{EXERCISE28_ITEMS_37.length}</span>، ومطابق للمفتاح{" "}
        <span dir="ltr" className="font-en font-black tabular-nums">{score}</span>.
      </p>
    </section>
  );
}

/* ============================================================
   11) §29 — تدريب التحويلات
   ============================================================ */

export function Transform29Lab37({ onComplete, half }: { onComplete?: () => void; half?: 1 | 2 }) {
  const source = half ? half37(TRANSFORM29_ITEMS_37, half) : TRANSFORM29_ITEMS_37;
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const total = source.length * 2;
  const attempted = Object.values(checked).filter(Boolean).length;

  return (
    <section data-lab="transform29" className={LAB_SHELL}>
      <LabHeader eyebrow="§29 · تدريب التحويلات" title="حوّل كل جملة إلى النفي ثم إلى السؤال" />
      <PlatformNote37>
        المثال في المصدر: <span dir="ltr" className="font-en font-black">She will be reading at 8:00.</span> ← النفي:{" "}
        <span dir="ltr" className="font-en font-black">She won’t be reading at 8:00.</span> — السؤال:{" "}
        <span dir="ltr" className="font-en font-black">Will she be reading at 8:00?</span>
      </PlatformNote37>
      <div className="mt-3 space-y-3">
        {source.map((item) => (
          <fieldset key={item.n} data-practice-item={`transform29-${item.n}`} className={ITEM}>
            <legend className="sr-only">البند {item.n}</legend>
            <p dir="ltr" className="font-en text-left text-base font-semibold text-[#0f172a]">{item.base}</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(["negative", "question"] as const).map((kind) => {
                const key = `${item.n}-${kind}`;
                const isChecked = !!checked[key];
                const report = elementCheck37(values[key] ?? "", kind === "negative" ? "negative" : "question");
                const allOk = report.every((entry) => entry.ok);
                return (
                  <div key={key} className="rounded-xl border border-[#bae6fd] bg-[#f8fbff] p-2.5">
                    <span className="mb-1 block text-sm font-bold text-[#334155]">
                      {kind === "negative" ? "النفي" : "السؤال"}
                    </span>
                    <input
                      type="text"
                      dir="auto"
                      value={values[key] ?? ""}
                      disabled={isChecked}
                      onChange={(event) => {
                        const value = event.currentTarget.value;
                        setValues((current) => ({ ...current, [key]: value }));
                      }}
                      aria-label={`${kind === "negative" ? "نفي" : "سؤال"} البند ${item.n}`}
                      className={`${FOCUS_37} w-full rounded-lg border border-[#7dd3fc] bg-white px-3 py-2 text-base text-[#0f172a]`}
                    />
                    {!isChecked ? (
                      <ActionButton37
                        className="mt-2"
                        disabled={!(values[key] ?? "").trim()}
                        onClick={() => {
                          setChecked((current) => {
                            const next = { ...current, [key]: true };
                            if (Object.keys(next).length === total) onComplete?.();
                            return next;
                          });
                        }}
                      >
                        افحص العناصر
                      </ActionButton37>
                    ) : (
                      <div className="mt-2">
                        <Feedback37 state={allOk ? "ok" : "review"} title={allOk ? "العناصر ظاهرة." : "أكمل العناصر الناقصة."}>
                          <span dir="ltr" className="font-en block font-black text-[#115e59]">
                            {kind === "negative" ? item.negative : item.question}
                          </span>
                          <span className="text-xs">إجابة المصدر لهذا البند.</span>
                        </Feedback37>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <Counter37 done={attempted} total={total} label="حاولت" />
    </section>
  );
}

/* ============================================================
   12) §30 — Grammar Detective (يدعم التقسيم إلى جزأين)
   ============================================================ */

export function Detective30Lab37({
  onComplete,
  items: subset,
}: {
  onComplete?: () => void;
  items?: readonly (typeof DETECTIVE30_ITEMS_37)[number][];
}) {
  const items = subset ?? DETECTIVE30_ITEMS_37;
  const [draft, setDraft] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = items.filter((item) => checked[item.n]).length;

  return (
    <section data-lab="detective30" className={LAB_SHELL}>
      <LabHeader eyebrow="§30 · ورشة اكتشاف الأخطاء" title={<Rich text="Grammar Detective — اكتب التصحيح" />} />
      <PlatformNote37>
        كل جملة فيها خطأ واحد على الأقل. اكتب تصحيحك ثم اعرض تصحيح المصدر مع سبب الخطأ. لا يُطلب منك مطابقة الصياغة حرفيًا.
      </PlatformNote37>
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.n];
          return (
            <section key={item.n} data-practice-item={`detective30-${item.n}`} className={ITEM}>
              <p dir="ltr" className="font-en rounded-xl border border-[#fda4af] bg-[#ffe4e6] px-3.5 py-2 text-left font-bold text-[#9f1239]">
                {`${item.n}. ${item.prompt}`}
              </p>
              <label className="mt-2 block">
                <span className="mb-1 block text-sm font-bold text-[#334155]">تصحيحك</span>
                <input
                  type="text"
                  dir="auto"
                  value={draft[item.n] ?? ""}
                  disabled={isChecked}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setDraft((current) => ({ ...current, [item.n]: value }));
                  }}
                  className={`${FOCUS_37} w-full rounded-xl border border-[#7dd3fc] bg-white px-3 py-2.5 text-base text-[#0f172a]`}
                  aria-label={`تصحيح الجملة ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!(draft[item.n] ?? "").trim()}
                  onClick={() => {
                    setChecked((current) => {
                      const next = { ...current, [item.n]: true };
                      if (Object.keys(next).length === items.length) onComplete?.();
                      return next;
                    });
                  }}
                >
                  اعرض تصحيح المصدر
                </ActionButton37>
              ) : (
                <div className="mt-2">
                  <Feedback37 state="info" title="تصحيح المصدر وسبب الخطأ">
                    <span dir="ltr" className="font-en block font-black text-[#115e59]">{item.answer}</span>
                    <span>
                      <Rich text={item.why} />
                    </span>
                  </Feedback37>
                </div>
              )}
            </section>
          );
        })}
      </div>
      <Counter37 done={attempted} total={items.length} label="حاولت" />
    </section>
  );
}

/* ============================================================
   13) §31 — IQ200
   ============================================================ */

export function IQ200Lab37({ onComplete, half }: { onComplete?: () => void; half?: 1 | 2 }) {
  const source = half ? half37(IQ200_ITEMS_37, half) : IQ200_ITEMS_37;
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = source.filter((item) => checked[item.n]).length;
  const score = source.filter((item) => checked[item.n] && selected[item.n] === item.answer).length;

  return (
    <section data-lab="iq200" className={LAB_SHELL}>
      <LabHeader eyebrow="§31 · تحدي IQ200" title="اختر الزمن المناسب بحسب المعنى" />
      <div className="space-y-3">
        {source.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = selected[item.n] === item.answer;
          return (
            <fieldset key={item.n} data-practice-item={`iq200-${item.n}`} className={ITEM}>
              <legend className="sr-only">الموقف {item.n}</legend>
              <div className="space-y-1.5">
                {item.lines.map((line) => (
                  <EnglishLine37 key={line}>{line}</EnglishLine37>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { value: "will", label: "will" },
                  { value: "going-to", label: "BE GOING TO" },
                  { value: "future-continuous", label: "will be + V-ing" },
                ].map((choice) => (
                  <label
                    key={choice.value}
                    className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${
                      selected[item.n] === choice.value ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`iq200-${item.n}`}
                      value={choice.value}
                      checked={selected[item.n] === choice.value}
                      disabled={isChecked}
                      onChange={() => setSelected((current) => ({ ...current, [item.n]: choice.value }))}
                      className={`${FOCUS_37} h-4 w-4 accent-[#0f766e]`}
                    />
                    <span dir="ltr" className="font-en text-[#0f172a]">{choice.label}</span>
                  </label>
                ))}
              </div>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!selected[item.n]}
                  onClick={() => {
                    setChecked((current) => {
                      const next = { ...current, [item.n]: true };
                      if (Object.keys(next).length === source.length) onComplete?.();
                      return next;
                    });
                  }}
                >
                  تحقق
                </ActionButton37>
              ) : (
                <div className="mt-2">
                  <Feedback37 state={ok ? "ok" : "review"} title={ok ? "إجابة مطابقة لمفتاح المصدر." : `مفتاح المصدر: ${item.answerText}`}>
                    <span dir="ltr" className="font-en block font-black text-[#115e59]">{item.answerText}</span>
                    <Rich text={item.why} />
                  </Feedback37>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#334155]">
        حاولت <span dir="ltr" className="font-en font-black tabular-nums">{attempted}</span> من{" "}
        <span dir="ltr" className="font-en font-black tabular-nums">{source.length}</span>، ومطابق للمفتاح{" "}
        <span dir="ltr" className="font-en font-black tabular-nums">{score}</span>.
      </p>
    </section>
  );
}

/* ============================================================
   14) §32 — Reading Challenge
   ============================================================ */

export function ReadingAnalysis37() {
  return (
    <div className="mt-3 space-y-2">
      <h3 className="text-sm font-black text-[#0c4a6e]">تحليل صيغ المستقبل في النص — إضافة من المنصة</h3>
      {READING32_ANALYSIS_37.map((entry) => (
        <div key={entry.line} className="rounded-xl border border-[#bae6fd] bg-[#f8fbff] p-3 text-sm leading-6 text-[#1e293b]">
          <p dir="ltr" className="font-en text-left font-semibold text-[#0f172a]">{entry.line}</p>
          <p className="mt-1">
            <span dir="ltr" className="font-en block w-fit rounded bg-white px-2 font-black text-[#0c4a6e]">{entry.form}</span>
            <Rich text={entry.why} />
          </p>
        </div>
      ))}
    </div>
  );
}

export function ReadingLab37({
  onComplete,
  highlight,
  onToggleHighlight,
}: {
  onComplete?: () => void;
  highlight: boolean;
  onToggleHighlight: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const answered = READING32_QUESTIONS_37.filter((_, index) => (answers[index] ?? "").trim().length > 0).length;
  const canReveal = answered === READING32_QUESTIONS_37.length;

  return (
    <section data-lab="reading32" className={LAB_SHELL}>
      <LabHeader eyebrow="§32 · أسئلة الفهم" title="أجب عن أسئلة الفهم الثمانية" />
      <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#bae6fd] bg-white px-3 py-2 text-sm font-bold text-[#1e293b]">
        <input
          type="checkbox"
          checked={highlight}
          onChange={onToggleHighlight}
          className={`${FOCUS_37} h-4 w-4 accent-[#0f766e]`}
        />
        <span>تمييز صيغ المستقبل في النص أعلاه (بصري فقط — لا يخفي النص)</span>
      </label>
      {highlight ? (
        <p className="mt-2 text-xs font-bold text-[#0c4a6e]" role="status">
          التمييز مُطبَّق على نص المصدر في البطاقة أعلاه.
        </p>
      ) : null}
      <div className="mt-3 space-y-2">
        {READING32_QUESTIONS_37.map((question, index) => (
          <label key={question} className={ITEM}>
            <span dir="ltr" className="font-en mb-1 block text-left font-bold text-[#0f172a]">{question}</span>
            <textarea
              rows={2}
              dir="ltr"
              lang="en"
              value={answers[index] ?? ""}
              disabled={revealed}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setAnswers((current) => ({ ...current, [index]: value }));
              }}
              className={`${FOCUS_37} w-full resize-y rounded-lg border border-[#7dd3fc] bg-white p-2.5 text-left text-base leading-7 text-[#0f172a]`}
              aria-label={`إجابة السؤال ${index + 1}`}
            />
          </label>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!revealed ? (
          <ActionButton37
            disabled={!canReveal}
            onClick={() => {
              setRevealed(true);
              onComplete?.();
            }}
          >
            اعرض إجابات المصدر
          </ActionButton37>
        ) : (
          <p role="status" className="rounded-xl border border-[#5eead4] bg-[#f0fdfa] px-3 py-2 text-sm font-black text-[#115e59]">
            ظهرت إجابات المصدر الثمانية أسفل بطاقة القسم، مع تحليل الصيغ.
          </p>
        )}
        <p aria-live="polite" className="text-sm font-bold text-[#334155]">
          كتبت <span dir="ltr" className="font-en font-black tabular-nums">{answered}</span> من{" "}
          <span dir="ltr" className="font-en font-black tabular-nums">{READING32_QUESTIONS_37.length}</span> إجابة.
        </p>
      </div>
      {revealed ? <ReadingAnalysis37 /> : null}
    </section>
  );
}

/* ============================================================
   15) §36 — ورشة الكتابة
   ============================================================ */

export function WritingLab37() {
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [modelOpen, setModelOpen] = useState(false);
  const sentenceCount = useMemo(
    () => (draft.trim() ? draft.split(/[.!?]+/).filter((part) => part.trim().length > 0).length : 0),
    [draft],
  );
  const marked = WRITING36_CRITERIA_37.filter((_, index) => checked[index]).length;
  const hasEnough = sentenceCount >= 12;

  return (
    <section data-lab="writing36" className={LAB_SHELL}>
      <LabHeader eyebrow="§36 · Writing Mission" title={<Rich text="My Life at This Time Tomorrow — فقرة من 12 إلى 15 جملة" />} />
      <PlatformNote37>
        اكتب فقرتك بالإنجليزية، ثم راجع بنود المصدر الثمانية بنفسك. لا يصدر النظام حكمًا آليًا على جودة الفقرة أو صحة تراكيبها؛ والعداد مساعد فقط.
      </PlatformNote37>
      <label className="mt-3 block">
        <span className="mb-1 block font-bold text-[#0f172a]">مسودتك باللغة الإنجليزية</span>
        <textarea
          rows={10}
          dir="ltr"
          lang="en"
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          placeholder="Write your paragraph here…"
          className={`${FOCUS_37} w-full resize-y rounded-2xl border border-[#7dd3fc] bg-white p-4 text-left text-base leading-7 text-[#0f172a]`}
        />
      </label>
      <p aria-live="polite" className="mt-2 rounded-xl bg-[#e0f2fe] px-3 py-2 text-sm font-bold text-[#0c4a6e]">
        عدد الجمل التقريبي: <span dir="ltr" className="font-en font-black tabular-nums">{sentenceCount}</span> / المطلوب 12–15
      </p>
      <fieldset className="mt-3 rounded-2xl border border-[#bae6fd] bg-[#f8fbff] p-3">
        <legend className="px-1 text-sm font-black text-[#0c4a6e]">قائمة مراجعة ذاتية — الشروط الثمانية الأصلية</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {WRITING36_CRITERIA_37.map((criterion, index) => (
            <label key={criterion} className="flex items-start gap-2 rounded-xl border border-[#bae6fd] bg-white p-3 text-sm leading-6 text-[#1e293b]">
              <input
                type="checkbox"
                checked={!!checked[index]}
                onChange={(event) => {
                  const value = event.currentTarget.checked;
                  setChecked((current) => ({ ...current, [index]: value }));
                }}
                className={`${FOCUS_37} mt-1 h-4 w-4 shrink-0 accent-[#0f766e]`}
              />
              <span>
                <Rich text={criterion} />
              </span>
            </label>
          ))}
        </div>
        <p aria-live="polite" className="mt-2 text-xs font-bold text-[#334155]">
          علّمت <span dir="ltr" className="font-en tabular-nums">{marked}</span> من 8 — راجع كل بند بنفسك.
        </p>
      </fieldset>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!modelOpen ? (
          <ActionButton37 variant="secondary" disabled={!hasEnough} onClick={() => setModelOpen(true)}>
            اعرض نموذج المصدر بعد الكتابة
          </ActionButton37>
        ) : (
          <ActionButton37 variant="ghost" onClick={() => setModelOpen(false)}>
            إخفاء النموذج
          </ActionButton37>
        )}
        {!hasEnough ? <p className="text-sm font-bold text-[#334155]">اكتب 12 جملة على الأقل لإظهار النموذج.</p> : null}
      </div>
      {modelOpen ? (
        <div className="mt-3 space-y-2 rounded-2xl border border-[#5eead4] bg-[#f0fdfa] p-3">
          <p className="text-sm font-black text-[#115e59]">نموذج المصدر الإرشادي — لا تنسخه، اكتب فقرتك بأفكارك:</p>
          {WRITING36_MODEL_37.map((line) => (
            <EnglishLine37 key={line}>{line}</EnglishLine37>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/* ============================================================
   16) §1 — قائمة الأهداف
   ============================================================ */

export function ObjectivesChecklist37({ objectives }: { objectives: readonly string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = objectives.filter((_, index) => checked[index]).length;
  return (
    <div className={INNER}>
      <p className="text-sm font-black text-[#0c4a6e]">علّم الأهداف التي تراها واضحة الآن (مراجعة ذاتية):</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {objectives.map((objective, index) => (
          <label key={objective} className="flex items-start gap-2 rounded-xl border border-[#bae6fd] bg-white p-2.5 text-sm leading-6 text-[#1e293b]">
            <input
              type="checkbox"
              checked={!!checked[index]}
              onChange={(event) => {
                const value = event.currentTarget.checked;
                setChecked((current) => ({ ...current, [index]: value }));
              }}
              className={`${FOCUS_37} mt-1 h-4 w-4 shrink-0 accent-[#0f766e]`}
            />
            <span>
              <Rich text={objective} />
            </span>
          </label>
        ))}
      </div>
      <p aria-live="polite" className="mt-2 text-xs font-bold text-[#334155]">
        علّمت <span dir="ltr" className="font-en tabular-nums">{done}</span> من{" "}
        <span dir="ltr" className="font-en tabular-nums">{objectives.length}</span> هدفًا.
      </p>
    </div>
  );
}

/* ============================================================
   17) §37 و§38 — لوحات الربط
   ============================================================ */

const SUMMARY_MATCH_37: ChoiceItem37[] = [
  {
    id: "summary-1",
    prompt: "أي مثال ينتمي إلى الاستخدام الأول: نشاط سيكون جاريًا في لحظة مستقبلية محددة؟",
    choices: [
      { value: "a", label: "At 9:00 tomorrow, I will be taking my exam." },
      { value: "b", label: "When you arrive, I will be waiting." },
    ],
    accepted: ["a"],
    feedback: "① نشاط سيكون جاريًا في لحظة مستقبلية محددة — At 9:00 tomorrow, I will be taking my exam.",
  },
  {
    id: "summary-2",
    prompt: "أي مثال ينتمي إلى الاستخدام الثاني: نشاط مستمر عند وقوع حدث مستقبلي آخر؟",
    choices: [
      { value: "a", label: "When you arrive, I will be waiting." },
      { value: "b", label: "The workers will be repairing the road all weekend." },
    ],
    accepted: ["a"],
    feedback: "② نشاط سيكون مستمرًا عند وقوع حدث مستقبلي آخر.",
  },
  {
    id: "summary-3",
    prompt: "أي مثال ينتمي إلى الاستخدام الثالث: وصف نشاط متوقع خلال فترة أو ضمن برنامج؟",
    choices: [
      { value: "a", label: "Will you be using the computer tonight?" },
      { value: "b", label: "The workers will be repairing the road all weekend." },
    ],
    accepted: ["b"],
    feedback: "③ وصف نشاط متوقع خلال فترة أو ضمن برنامج مستقبلي.",
  },
  {
    id: "summary-4",
    prompt: "أي مثال ينتمي إلى الاستخدام الرابع: السؤال بصورة طبيعية عن الخطط؟",
    choices: [
      { value: "a", label: "Will you be using the computer tonight?" },
      { value: "b", label: "At 9:00 tomorrow, I will be taking my exam." },
    ],
    accepted: ["a"],
    feedback: "④ السؤال بصورة طبيعية عن خطط الشخص أو نشاطه المتوقع.",
  },
];

export function SummaryMatchLab37() {
  return (
    <ChoiceLab37
      id="summary-match"
      eyebrow="§37 · راجع الملخص بأمثلته"
      title="صِل كل استخدام بمثاله من المصدر"
      items={SUMMARY_MATCH_37}
      note={
        <PlatformNote37>
          هذه الأربعة هي «أهم الاستخدامات» كما وردت في الملخص الذهبي للدرس 37، مع أمثلتها الأصلية.
        </PlatformNote37>
      }
    />
  );
}

const CURRICULUM_PREVIEW_37: ChoiceItem37[] = [
  {
    id: "preview-1",
    prompt: "في مثال التمهيد للدرس 38: By 8:00 tomorrow, I will have finished my homework. — ماذا يعبّر عنه؟",
    choices: [
      { value: "a", label: "فعل سيكون قد اكتمل قبل نقطة معينة في المستقبل." },
      { value: "b", label: "نشاط سيكون جاريًا عند لحظة مستقبلية." },
    ],
    accepted: ["a"],
    feedback: "الدرس 38: Future Perfect — المستقبل التام: فعل سيكون قد اكتمل قبل نقطة معينة في المستقبل.",
  },
  {
    id: "preview-2",
    prompt: "قارن: I will finish my homework. / I will be doing my homework. / I will have finished my homework. — ما المشترك بينها؟",
    choices: [
      { value: "a", label: "ثلاث جمل تتحدث عن المستقبل، لكن كل واحدة تنظر إلى الحدث من زاوية مختلفة." },
      { value: "b", label: "جميعها تنظر إلى الحدث من الزاوية نفسها." },
    ],
    accepted: ["a"],
    feedback: "هذا نص المصدر في خريطة المنهج: ثلاث جمل تتحدث عن المستقبل، لكن كل واحدة تنظر إلى الحدث من زاوية مختلفة.",
  },
  {
    id: "preview-3",
    prompt: "أي زمن أكملناه في هذا الدرس؟",
    choices: [
      { value: "a", label: "⑫ Future Continuous: الدرس 37 مكتمل." },
      { value: "b", label: "⑬ Future Perfect: الدرس 38 مكتمل." },
    ],
    accepted: ["a"],
    feedback: "خريطة المنهج: ⑫ Future Continuous: الدرس 37 مكتمل — والمحطة القادمة الدرس 38: Future Perfect.",
  },
];

export function CurriculumPreviewLab37() {
  return (
    <ChoiceLab37
      id="curriculum-preview"
      eyebrow="§38 · تمهيد الدرس القادم"
      title="محطة قادمة: Future Perfect"
      items={CURRICULUM_PREVIEW_37}
      note={
        <PlatformNote37>
          الأسئلة أدناه مبنية حرفيًا على نص الخريطة والمثال التمهيدي في §38، للتحقق من فهم موقع درسنا في المنهج.
        </PlatformNote37>
      }
    />
  );
}

/* ============================================================
   18) مكوّنات مختصرة تُستخدم في خطوات متعددة
   ============================================================ */

export function MeaningLab37({ sectionId, onComplete }: { sectionId: keyof typeof MEANING_LAB_37; onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id={`meaning-${sectionId}`}
      eyebrow={`§${String(sectionId).replace("s", "")} · مختبر المعنى`}
      title="اختر الزمن بحسب ما يقدّمه المتحدث"
      note={
        <PlatformNote37>
          الأمثلة من المصدر نفسه. الفرق بين الأزمنة فرق في التركيز الذي يقدّمه المتحدث، لا في صحة الجملة النحوية.
        </PlatformNote37>
      }
      items={MEANING_LAB_37[sectionId]}
      onComplete={onComplete}
    />
  );
}

export function MomentLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="moment"
      eyebrow="§6 · الاستخدام الأول"
      title="نشاط سيكون جاريًا في لحظة مستقبلية محددة"
      note={
        <PlatformNote37>
          المسألة ليست وجود كلمة زمنية، بل: هل ننظر إلى نشاط جارٍ داخل لحظة مستقبلية؟ اختر الجملة التي تفعل ذلك.
        </PlatformNote37>
      }
      items={MOMENT_ITEMS_37}
      onComplete={onComplete}
    />
  );
}

export function TimeExpressionLab37() {
  return (
    <ChoiceLab37
      id="time-expression"
      eyebrow="§8 · التعبيرات الزمنية"
      title="مطابقة التعبير الزمني بمعناه"
      items={TIME_EXPRESSION_ITEMS_37}
      note={
        <PlatformNote37>
          التعبيرات السبعة: <span dir="ltr" className="font-en">at 8:00 tomorrow</span> ·{" "}
          <span dir="ltr" className="font-en">this time tomorrow</span> ·{" "}
          <span dir="ltr" className="font-en">at this time next week</span> ·{" "}
          <span dir="ltr" className="font-en">tomorrow morning</span> ·{" "}
          <span dir="ltr" className="font-en">all afternoon tomorrow</span> ·{" "}
          <span dir="ltr" className="font-en">from 6:00 to 9:00 tomorrow</span> ·{" "}
          <span dir="ltr" className="font-en">when you arrive</span>.
        </PlatformNote37>
      }
    />
  );
}

export function TwoEventsLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="two-events"
      eyebrow="§11 · حدثان في المستقبل"
      title="نشاط مستمر أثناء وقوع حدث مستقبلي آخر"
      items={TWO_EVENTS_ITEMS_37}
      onComplete={onComplete}
    />
  );
}

export function WhenClauseLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="when-clause"
      eyebrow="§12 · when: جملة زمنية أم سؤال"
      title="ميّز بين الحالتين"
      items={WHEN_ITEMS_37}
      onComplete={onComplete}
      footnote={
        <PlatformNote37>
          القاعدة العملية: في الجملة الزمنية المستقبلية التي تبدأ بـ <span dir="ltr" className="font-en font-black">when</span> نستخدم Present
          Simple، أما حين تكون <span dir="ltr" className="font-en font-black">when</span> أداة سؤال مباشر أو في سؤال غير مباشر فيبقى{" "}
          <span dir="ltr" className="font-en font-black">will</span> صحيحًا.
        </PlatformNote37>
      }
    />
  );
}

export function WhileLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37 id="while" eyebrow="§13 · while" title="اربط نشاطين معًا" items={WHILE_ITEMS_37} onComplete={onComplete} />
  );
}

export function RoutineLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="routine"
      eyebrow="§15 · مجريات متوقعة"
      title="نشاط متوقع ضمن برنامج أو سير الأمور المعتاد"
      items={ROUTINE_ITEMS_37}
      onComplete={onComplete}
    />
  );
}

export function NegativeErrorsLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="negative-errors"
      eyebrow="§19 · أخطاء النفي"
      title="شخّص الخطأ في كل صيغة"
      items={NEGATIVE_ERROR_ITEMS_37}
      onComplete={onComplete}
      footnote={
        <PlatformNote37>
          <Rich text="القاعدة من المصدر: won't + be + V-ing — لا تحذف be، ولا تستبدلها بـ am/is/are." />
        </PlatformNote37>
      }
    />
  );
}

export function ShortAnswerLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="short-answers"
      eyebrow="§21 · الإجابات القصيرة"
      title="اختر الإجابة القصيرة الصحيحة"
      items={SHORT_ANSWER_ITEMS_37}
      onComplete={onComplete}
    />
  );
}

export function WhoRoleLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="who-role"
      eyebrow="§23 · وظيفة who"
      title="Who فاعل أم مفعول به؟"
      items={WHO_ROLE_ITEMS_37}
      onComplete={onComplete}
    />
  );
}

export function StateVerbLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="state-verbs"
      eyebrow="§25 · أفعال الحالة"
      title="متى تصح الصيغة المستمرة؟"
      items={STATE_VERB_ITEMS_37}
      onComplete={onComplete}
      footnote={
        <PlatformNote37>
          القاعدة الدقيقة: أفعال مثل <span dir="ltr" className="font-en">know / believe / understand / want / need / own</span> لا تُستخدم
          عادةً في الصيغ المستمرة عندما تحتفظ بمعنى الحالة؛ وقد تصح الصيغة المستمرة إذا تغيّر المعنى إلى نشاط أو استعمال مختلف.
        </PlatformNote37>
      }
    />
  );
}

export function ContinuousSelectLab37({ onComplete, half }: { onComplete?: () => void; half?: 1 | 2 }) {
  const items = half ? half37(CONTINUOUS_SELECT_37, half) : CONTINUOUS_SELECT_37;
  return (
    <ChoiceLab37
      id={`continuous-select${half ? `-${half}` : ""}`}
      eyebrow="§26 · الأزمنة المستمرة الثلاثة"
      title="حدّد النقطة المرجعية لكل نشاط"
      items={items}
      onComplete={onComplete}
    />
  );
}

export function AdvancedChallengeLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="advanced-33"
      eyebrow="§33 · تحدي متقدم"
      title="هل الزمنان صحيحان؟"
      items={ADVANCED33_ITEMS_37}
      onComplete={onComplete}
    />
  );
}
