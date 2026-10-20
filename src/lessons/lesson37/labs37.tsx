import { useMemo, useState, type ReactNode } from "react";
import { Rich } from "../../shared/lessonKit";
import { ActionButton37, CameraFrame37, Feedback37, FOCUS_37, PlatformNote37 } from "./kit37";
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
  NEGATIVE_BUILD_37,
  NEGATIVE_ERROR_ITEMS_37,
  POLITE_ITEMS_37,
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
  MOMENT_ITEMS_37,
  type ChoiceItem37,
} from "./practiceData37";

// ------------------------------------------------------------
// أدوات مشتركة للأنشطة
// ------------------------------------------------------------

function EnglishLine37({ children }: { children: ReactNode }) {
  return (
    <p dir="ltr" className="font-en rounded-xl border border-[#cde8f2] bg-[#f4fbff] px-3 py-2 text-left text-[#17384a]">
      {children}
    </p>
  );
}

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
      {item.choices.map((choice) => (
        <label
          key={choice.value}
          className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm font-bold leading-6 text-[#17384a] ${
            value === choice.value ? "border-[#007b83] bg-[#e4f8f5]" : "border-[#b8dff0] bg-white hover:bg-[#edf8ff]"
          }`}
        >
          <input
            type="radio"
            name={`${groupName}-${item.id}`}
            value={choice.value}
            checked={value === choice.value}
            disabled={disabled}
            onChange={(event) => onSelect(event.currentTarget.value)}
            className={`${FOCUS_37} mt-1 h-4 w-4 accent-[#007b83]`}
          />
          <span className="min-w-0" dir="auto">
            <Rich text={choice.label} />
          </span>
        </label>
      ))}
    </div>
  );
}

/**
 * مختبر اختيار عام: كل بند يقيس المعنى أو الصيغة، وتظهر التغذية الراجعة
 * بعد محاولة البند نفسه فقط. لا يُحكم على بديل ممكن في سياق آخر بأنه خطأ نحوي.
 */
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
  title: string;
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
    <section data-lab={id} className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">
        <Rich text={eyebrow} />
      </p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">{title}</h2>
      {note ? <div className="mt-3">{note}</div> : null}
      <div className="mt-3 space-y-3">
        {items.map((item, index) => {
          const isChecked = !!checked[item.id];
          const accepted = item.accepted.includes(selected[item.id] ?? "");
          return (
            <fieldset key={item.id} data-lab-item={`${id}-${item.id}`} className="rounded-2xl border border-[#b8dff0] bg-white p-3 sm:p-4">
              <legend className="sr-only">النشاط {index + 1}</legend>
              <p className="font-bold leading-7 text-[#17384a]">
                <Rich text={item.prompt} />
              </p>
              {item.lines?.length ? (
                <div className="mt-2 space-y-1">
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
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3e5d70]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{items.length}</span>.
      </p>
      {complete ? <p className="text-sm font-black text-[#1f613d]">اكتملت المحاولة في هذا المختبر.</p> : null}
      {footnote ? <div className="mt-3">{footnote}</div> : null}
    </section>
  );
}

// ------------------------------------------------------------
// §2 — مختبر اللحظة المستقبلية (خط زمني تفاعلي)
// ------------------------------------------------------------

export function FutureMomentLab37({ onComplete }: { onComplete?: () => void }) {
  const [momentId, setMomentId] = useState<string>("");
  const [answered, setAnswered] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const moment = TIMELINE_MOMENTS_37.find((candidate) => candidate.id === momentId);
  const correct = answered === "seven";

  return (
    <section data-lab="timeline" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§2 · interactive timeline</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">ضع كاميرا الدرس على لحظة مستقبلية</h2>
      <PlatformNote37>
        خطة المصدر: دراسة من الساعة السادسة حتى التاسعة مساءً. حرّك المؤشر على اللحظات الثلاث، ثم أجب عن سؤال الكاميرا.
      </PlatformNote37>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {TIMELINE_MOMENTS_37.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            data-timeline-moment={candidate.id}
            aria-pressed={momentId === candidate.id}
            onClick={() => setMomentId(candidate.id)}
            className={`${FOCUS_37} min-h-14 rounded-2xl border px-3 py-2 text-right transition-colors motion-reduce:transition-none ${
              momentId === candidate.id ? "border-[#007b83] bg-[#e4f8f5]" : "border-[#b8dff0] bg-white hover:bg-[#edf8ff]"
            }`}
          >
            <span dir="ltr" className="font-en block text-base font-black tabular-nums text-[#084765]">
              {candidate.clock}
            </span>
            <span className="mt-0.5 block text-sm font-bold text-[#17384a]">{candidate.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full border border-[#b8dff0] bg-[#eff9fd]">
        <div
          className="h-full bg-[#007b83] transition-[width] motion-reduce:transition-none"
          style={{ width: momentId === "six" ? "10%" : momentId === "seven" ? "50%" : momentId === "nine" ? "90%" : "0%" }}
        />
      </div>
      {moment ? (
        <div className="mt-3 space-y-2" data-timeline-readout={moment.id}>
          <EnglishLine37>{moment.sentence}</EnglishLine37>
          <p className="text-sm leading-6 text-[#17384a]">
            <Rich text={moment.arabic} />
          </p>
          <p className="rounded-xl bg-[#eff9fd] px-3 py-2 text-sm font-bold leading-6 text-[#3e5d70]">
            <Rich text={moment.note} />
          </p>
        </div>
      ) : (
        <p className="mt-3 rounded-xl border border-dashed border-[#9ed7df] bg-[#eff9fd] px-3 py-2 text-sm font-bold text-[#4b6a7d]">
          اختر لحظة من اللحظات الثلاث لعرض ما يحدث فيها.
        </p>
      )}
      <fieldset className="mt-4 rounded-2xl border border-[#b8dff0] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#084765]">سؤال الكاميرا</legend>
        <p className="font-bold leading-7 text-[#17384a]">
          <Rich text="أي لحظة تصف الجملة I will be studying. ؟" />
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TIMELINE_MOMENTS_37.map((candidate) => (
            <label
              key={candidate.id}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-black ${
                answered === candidate.id ? "border-[#007b83] bg-[#e4f8f5]" : "border-[#b8dff0] bg-white"
              }`}
            >
              <input
                type="radio"
                name="timeline-answer"
                value={candidate.id}
                checked={answered === candidate.id}
                disabled={checked}
                onChange={() => setAnswered(candidate.id)}
                className={`${FOCUS_37} h-4 w-4 accent-[#007b83]`}
              />
              <span dir="ltr" className="font-en tabular-nums">
                {candidate.clock}
              </span>
            </label>
          ))}
        </div>
        {!checked ? (
          <ActionButton37
            className="mt-3"
            disabled={!answered}
            onClick={() => {
              setChecked(true);
              onComplete?.();
            }}
          >
            تحقق من إجابتي
          </ActionButton37>
        ) : (
          <div className="mt-3">
            <Feedback37 state={correct ? "ok" : "review"} title={correct ? "إجابة صحيحة." : "راجع موقع الكاميرا."}>
              {correct
                ? "عند السابعة يكون نشاط الدراسة في منتصفه، وهذه اللحظة التي تصفها الجملة: At 7:00 tomorrow, I will be studying."
                : "السادسة بداية الدراسة والتاسعة نهايتها؛ أما اللحظة التي يكون النشاط فيها جاريًا فهي السابعة: At 7:00 tomorrow, I will be studying."}
            </Feedback37>
          </div>
        )}
      </fieldset>
    </section>
  );
}

// ------------------------------------------------------------
// §3 — تركيب الصيغة بالترتيب
// ------------------------------------------------------------

const FORMULA_PIECES_37 = [
  { id: "subject", text: "Subject", label: "الفاعل" },
  { id: "will", text: "will", label: "المستقبل" },
  { id: "be", text: "be", label: "الشكل الأساسي" },
  { id: "ving", text: "V-ing", label: "الفعل مع ing" },
] as const;

export function FormulaOrderLab37() {
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<"idle" | "ok" | "review">("idle");
  const expected = FORMULA_PIECES_37.map((piece) => piece.id);
  const toggle = (id: string) => {
    setResult("idle");
    setPicked((current) => (current.includes(id) ? current.filter((candidate) => candidate !== id) : [...current, id]));
  };
  const check = () => setResult(picked.join("|") === expected.join("|") ? "ok" : "review");
  const built = picked.map((id) => FORMULA_PIECES_37.find((piece) => piece.id === id)?.text ?? "").join(" + ");
  return (
    <section data-lab="formula" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§3 · formula builder</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">ابنِ الصيغة بترتيبها الصحيح</h2>
      <p className="mt-2 text-sm leading-6 text-[#3e5d70]">
        اضغط العناصر بالترتيب الذي تُبنى به الجملة، ثم تحقّق. الترتيب هنا هو نفس ترتيب الجملة الإنجليزية.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {FORMULA_PIECES_37.map((piece) => (
          <button
            key={piece.id}
            type="button"
            data-formula-piece={piece.id}
            aria-pressed={picked.includes(piece.id)}
            onClick={() => toggle(piece.id)}
            className={`${FOCUS_37} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              picked.includes(piece.id) ? "border-[#007b83] bg-[#e4f8f5] text-[#084765]" : "border-[#b8dff0] bg-white text-[#17384a] hover:bg-[#edf8ff]"
            }`}
          >
            <span dir="ltr" className="font-en">
              {piece.text}
            </span>
            <span className="mt-0.5 block text-[11px] font-bold text-[#4b6a7d]">{piece.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <ActionButton37 disabled={picked.length === 0} onClick={check}>
          تحقق من الترتيب
        </ActionButton37>
        <p dir="ltr" className="font-en rounded-xl border border-[#cde8f2] bg-white px-3 py-2 text-left text-[#17384a]">
          {built || "—"}
        </p>
      </div>
      {result !== "idle" ? (
        <div className="mt-3">
          <Feedback37 state={result === "ok" ? "ok" : "review"} title={result === "ok" ? "ترتيب صحيح." : "الترتيب غير مطابق."}>
            الصيغة الصحيحة: <span dir="ltr" className="font-en font-black">Subject + will + be + V-ing</span> — الفاعل، ثم will، ثم be،
            ثم الفعل مع ing. مثال: <span dir="ltr" className="font-en">She will be preparing dinner.</span>
          </Feedback37>
        </div>
      ) : null}
    </section>
  );
}

// ------------------------------------------------------------
// §4 — تشريح الجملة وتحديد الأدوار
// ------------------------------------------------------------

const PARTS_37 = [
  { id: "she", text: "She", role: "الفاعل", note: "الفاعل: من يقوم بالنشاط." },
  { id: "will", text: "will", role: "فعل مساعد للمستقبل", note: "will = فعل مساعد للتعبير عن المستقبل." },
  { id: "be", text: "be", role: "الشكل الأساسي من be", note: "be = الشكل الأساسي من الفعل be؛ لا is بعد will." },
  { id: "preparing", text: "preparing", role: "الفعل مع ing", note: "preparing = الفعل prepare مع ing." },
  { id: "dinner", text: "dinner", role: "بقية الجملة", note: "dinner = بقية الجملة." },
] as const;

export function PartsLab37() {
  const [order, setOrder] = useState<string[]>([]);
  const [preferIs, setPreferIs] = useState("");
  const [checked, setChecked] = useState(false);
  const isCorrectOrder = order.length === PARTS_37.length && order.every((id, index) => id === PARTS_37[index].id);
  const tap = (id: string) => {
    if (order.includes(id)) return;
    setOrder((current) => [...current, id]);
    setChecked(false);
  };
  return (
    <section data-lab="parts" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§4 · sentence dissection</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">حلّل الجملة: She will be preparing dinner.</h2>
      <p className="mt-2 text-sm leading-6 text-[#3e5d70]">
        اضغط أجزاء الجملة بالترتيب لتعيين دور كل جزء. الترتيب هو ترتيب الجملة الإنجليزية من اليسار إلى اليمين.
      </p>
      <div data-parts-strip className="mt-3 flex flex-wrap gap-2">
        {PARTS_37.map((part) => {
          const assignedIndex = order.indexOf(part.id);
          const assigned = assignedIndex >= 0;
          return (
            <button
              key={part.id}
              type="button"
              data-part={part.id}
              aria-pressed={assigned}
              onClick={() => tap(part.id)}
              className={`${FOCUS_37} min-h-12 rounded-2xl border px-3 py-2 text-base font-black transition-colors motion-reduce:transition-none ${
                assigned ? "border-[#007b83] bg-[#e4f8f5] text-[#084765]" : "border-[#b8dff0] bg-white text-[#17384a] hover:bg-[#edf8ff]"
              }`}
            >
              <span dir="ltr" className="font-en">
                {part.text}
              </span>
              {assigned ? (
                <span className="mt-0.5 block text-[11px] font-bold text-[#1f613d]">
                  <span className="font-en tabular-nums">{assignedIndex + 1}</span> · {part.role}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <ActionButton37 disabled={order.length !== PARTS_37.length} onClick={() => setChecked(true)}>
          اعرض التحليل الكامل
        </ActionButton37>
        <ActionButton37 variant="ghost" onClick={() => { setOrder([]); setChecked(false); setPreferIs(""); }}>
          إعادة الضبط
        </ActionButton37>
      </div>
      {checked ? (
        <div className="mt-3 space-y-3">
          <Feedback37 state={isCorrectOrder ? "ok" : "review"} title={isCorrectOrder ? "الترتيب مطابق لتحليل المصدر." : "راجع ترتيب الأجزاء."}>
            <span dir="ltr" className="font-en">She + will + be + preparing + dinner.</span>
            <ul className="mt-2 list-disc space-y-1 ps-5">
              {(isCorrectOrder ? PARTS_37 : PARTS_37.slice().sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))).map((part) => (
                <li key={part.id}>
                  <span dir="ltr" className="font-en font-black">
                    {part.text}
                  </span>{" "}
                  — <Rich text={part.note} />
                </li>
              ))}
            </ul>
          </Feedback37>
          <fieldset className="rounded-2xl border border-[#b8dff0] bg-white p-3">
            <legend className="px-1 text-sm font-black text-[#084765]">لماذا be وليس is؟</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { value: "be", label: "She will be preparing dinner." },
                { value: "is", label: "She will is preparing dinner." },
              ].map((option) => (
                <label key={option.value} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 ${preferIs === option.value ? "border-[#007b83] bg-[#e4f8f5]" : "border-[#b8dff0] bg-white"}`}>
                  <input type="radio" name="be-or-is" value={option.value} checked={preferIs === option.value} onChange={() => setPreferIs(option.value)} className={`${FOCUS_37} h-4 w-4 accent-[#007b83]`} />
                  <span dir="ltr" className="font-en text-sm font-bold">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {preferIs === "be" ? (
              <div className="mt-2">
                <Feedback37 state="ok" title="الصحيح: be">
                  لأن will يجب أن يتبعها الفعل الأساسي V1، والشكل الأساسي من am/is/are هو be.
                </Feedback37>
              </div>
            ) : preferIs === "is" ? (
              <div className="mt-2">
                <Feedback37 state="review" title="هذه الصيغة خطأ في المصدر (❌)">
                  المصدر: She will is preparing dinner. ❌ — والصحيح: She will be preparing dinner. ✅
                </Feedback37>
              </div>
            ) : null}
          </fieldset>
        </div>
      ) : null}
    </section>
  );
}

// ------------------------------------------------------------
// §5 — التصريف مع الضمائر
// ------------------------------------------------------------

const PRONOUNS_37 = [
  { id: "I", subject: "I", sentence: "I will be studying." },
  { id: "You", subject: "You", sentence: "You will be studying." },
  { id: "He", subject: "He", sentence: "He will be studying." },
  { id: "She", subject: "She", sentence: "She will be studying." },
  { id: "It", subject: "It", sentence: "It will be working." },
  { id: "We", subject: "We", sentence: "We will be studying." },
  { id: "They", subject: "They", sentence: "They will be studying." },
] as const;

const CONJUGATION_TRAPS_37: ChoiceItem37[] = [
  {
    id: "trap-s",
    prompt: "مع He وShe وIt: هل نضيف s إلى الفعل في Future Continuous؟",
    choices: [
      { value: "no", label: "لا، الصيغة ثابتة: will be + V-ing." },
      { value: "yes", label: "نعم، نضيف s مثل المضارع البسيط." },
    ],
    accepted: ["no"],
    feedback: "المصدر: لا نضيف s مع He أو She أو It. الصيغة ثابتة will be + V-ing.",
  },
  {
    id: "trap-aux",
    prompt: "هل نستخدم am/is/are بعد will؟",
    choices: [
      { value: "no", label: "لا، نستخدم be مع جميع الضمائر." },
      { value: "yes", label: "نعم، بحسب الضمير." },
    ],
    accepted: ["no"],
    feedback: "المصدر: لا نستخدم am/is/are بعد will؛ الشكل الأساسي هو be.",
  },
  {
    id: "trap-he",
    prompt: "أكمل: He ______ sleeping at midnight.",
    choices: [
      { value: "a", label: "will be" },
      { value: "b", label: "will is" },
    ],
    accepted: ["a"],
    feedback: "الصيغة الثابتة مع جميع الضمائر: will be + V-ing — He will be sleeping.",
  },
];

export function ConjugationLab37({ onComplete }: { onComplete?: () => void }) {
  const [pronoun, setPronoun] = useState<string>("I");
  const current = PRONOUNS_37.find((candidate) => candidate.id === pronoun)!;
  return (
    <section data-lab="conjugation" className="space-y-4">
      <div className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§5 · conjugation console</p>
        <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">الصيغة نفسها مع كل الضمائر</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRONOUNS_37.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              data-pronoun={candidate.id}
              aria-pressed={pronoun === candidate.id}
              onClick={() => setPronoun(candidate.id)}
              className={`${FOCUS_37} min-h-11 min-w-14 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
                pronoun === candidate.id ? "border-[#007b83] bg-[#007b83] text-white" : "border-[#b8dff0] bg-white text-[#17384a] hover:bg-[#edf8ff]"
              }`}
            >
              <span dir="ltr" className="font-en">
                {candidate.id}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-2xl border border-[#cde8f2] bg-[#f4fbff] p-3">
          <p dir="ltr" className="font-en text-left text-lg font-black text-[#17384a]">
            {current.sentence}
          </p>
          <p className="mt-1 text-sm font-bold text-[#4b6a7d]">
            <Rich text="نفس الصيغة تمامًا: will be + V-ing — لا s ولا am/is/are." />
          </p>
        </div>
      </div>
      <ChoiceLab37
        id="conjugation-traps"
        eyebrow="§5 · تحقق من الفهم"
        title="ثلاث نقاط يخطئ فيها الطلاب"
        items={CONJUGATION_TRAPS_37}
        onComplete={onComplete}
      />
    </section>
  );
}

// ------------------------------------------------------------
// §7 — الكاميرا على الخط الزمني
// ------------------------------------------------------------

export function CameraLab37() {
  const [position, setPosition] = useState<string>("past");
  const current = CAMERA_POSITIONS_37.find((candidate) => candidate.id === position)!;
  return (
    <CameraFrame37 title="Future Camera · خط الزمن" caption="انقل الكاميرا بين الماضي والحاضر والمستقبل لتقرأ ما تصوّره في كل موقع.">
      <div className="flex flex-wrap gap-2">
        {CAMERA_POSITIONS_37.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            data-camera-position={candidate.id}
            aria-pressed={position === candidate.id}
            onClick={() => setPosition(candidate.id)}
            className={`${FOCUS_37} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              position === candidate.id ? "border-[#007b83] bg-[#007b83] text-white" : "border-[#b8dff0] bg-white text-[#17384a] hover:bg-[#edf8ff]"
            }`}
          >
            {candidate.label}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-2" data-camera-readout={current.id}>
        <p dir="ltr" className="font-en rounded-xl border border-[#cde8f2] bg-white px-3 py-2 text-left text-[#17384a]">
          {current.time}: {current.sentence}
        </p>
        <p className="text-sm leading-6 text-[#17384a]">
          <Rich text={current.arabic} />
        </p>
        <p className="text-sm font-bold text-[#3e5d70]">
          <span dir="ltr" className="font-en block w-fit rounded bg-[#eff9fd] px-2">{current.form}</span>
          <Rich text={current.note} />
        </p>
      </div>
    </CameraFrame37>
  );
}

// ------------------------------------------------------------
// §14 — تحليل الحوار سطرًا بسطر
// ------------------------------------------------------------

export function DialogueLab37({ onComplete }: { onComplete?: () => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const opened = Object.values(open).filter(Boolean).length;
  const openLine = (id: string) => {
    setOpen((current) => ({ ...current, [id]: true }));
  };
  const allOpened = opened === DIALOGUE_LINES_37.length;
  return (
    <section data-lab="dialogue" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§14 · Tomorrow&apos;s Schedule</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">افتح كل سطر لترى تحليله</h2>
      <div className="mt-3 space-y-2">
        {DIALOGUE_LINES_37.map((line, index) => {
          const isOpen = !!open[line.id];
          return (
            <article key={line.id} data-dialogue-line={line.id} className="rounded-2xl border border-[#b8dff0] bg-white p-3">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => openLine(line.id)}
                className={`${FOCUS_37} flex min-h-11 w-full flex-wrap items-center justify-between gap-2 rounded-xl px-1 text-right`}
              >
                <span dir="ltr" className="font-en text-left text-[#17384a]">
                  <span className="font-black text-[#007b83]">{line.speaker}: </span>
                  {line.en}
                </span>
                <span className="shrink-0 rounded-full bg-[#eff9fd] px-2.5 py-1 text-xs font-black text-[#4b6a7d]">
                  {isOpen ? "التحليل ظاهر" : `تحليل السطر ${index + 1}`}
                </span>
              </button>
              {isOpen ? (
                <div className="mt-2 space-y-1 border-t border-[#cde8f2] pt-2 text-sm leading-6 text-[#17384a]">
                  <p dir="rtl">
                    <Rich text={line.ar} />
                  </p>
                  <p className="rounded-xl bg-[#e4f8f5] px-3 py-2 font-bold text-[#1f613d]">
                    <span dir="ltr" className="font-en inline-block rounded bg-white px-2">{line.form}</span> — {line.analysis}
                  </p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3e5d70]">
        فتحت <span className="font-en tabular-nums">{opened}</span> من <span className="font-en tabular-nums">{DIALOGUE_LINES_37.length}</span> سطرًا.
      </p>
      <fieldset className="mt-3 rounded-2xl border border-[#b8dff0] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#084765]">سؤال فهم الحوار</legend>
        <p className="font-bold leading-7 text-[#17384a]">أي سطر يسأل عن نشاط سيكون جاريًا؟</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            { value: "d1", label: "Lena: Can I call you tomorrow at 9:00?" },
            { value: "d5", label: "Lena: Will you be studying all morning?" },
          ].map((option) => (
            <label key={option.value} className={`flex min-h-11 cursor-pointer items-start gap-2 rounded-xl border p-3 text-sm font-bold ${answer === option.value ? "border-[#007b83] bg-[#e4f8f5]" : "border-[#b8dff0] bg-white"}`}>
              <input type="radio" name="dialogue-question" value={option.value} checked={answer === option.value} disabled={checked} onChange={() => setAnswer(option.value)} className={`${FOCUS_37} mt-1 h-4 w-4 accent-[#007b83]`} />
              <span dir="ltr" className="font-en text-left">
                {option.label}
              </span>
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
              السؤال عن نشاط سيكون جاريًا هو: <span dir="ltr" className="font-en">Will you be studying all morning?</span> — ومن تحليل المصدر: «سؤال عن نشاط سيكون جاريًا».
            </Feedback37>
          </div>
        )}
      </fieldset>
      {allOpened ? <p className="mt-2 text-sm font-black text-[#1f613d]">تحليلات المصدر السبعة ظاهرة الآن.</p> : null}
    </section>
  );
}

// ------------------------------------------------------------
// §18 و§20 و§22 و§29 — بناء النفي والسؤال
// ------------------------------------------------------------

/** جملة الأساس إنجليزية صِرفة تُعرض LTR؛ وإلا فالمطلوب عربي ويُعرض RTL. */
export function isPureEnglishBase(text: string) {
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
      { label: "الفاعل في البداية", ok: text.length > 0 && !negated ? true : text.length > 0 },
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

export function BuildLab37({
  id,
  eyebrow,
  title,
  note,
  items,
  onComplete,
  revealAfterAttempt,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: ReactNode;
  items: readonly { id: string; n: number; base: string; arabic?: string; kind: "negative" | "question" | "wh"; expected: string; sourceAnswer?: string; sourceOnly?: boolean }[];
  onComplete?: () => void;
  revealAfterAttempt?: boolean;
  children?: ReactNode;
}) {
  const [input, setInput] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [shown, setShown] = useState<Record<string, boolean>>({});
  const attemptedAll = items.every((item) => checked[item.id]);
  const setValue = (key: string, value: string) => setInput((current) => ({ ...current, [key]: value }));

  return (
    <section data-lab={id} className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">{title}</h2>
      {note ? <div className="mt-3">{note}</div> : null}
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          const report = elementCheck37(input[item.id] ?? "", item.kind);
          const allOk = report.every((entry) => entry.ok);
          return (
            <fieldset key={item.id} data-build-item={`${id}-${item.n}`} className="rounded-2xl border border-[#b8dff0] bg-white p-3 sm:p-4">
              <legend className="sr-only">البند {item.n}</legend>
              {isPureEnglishBase(item.base) ? (
                <p dir="ltr" className="font-en text-left text-[#17384a]">
                  {item.base}
                </p>
              ) : (
                <p dir="rtl" className="text-right font-bold text-[#17384a]">
                  <Rich text={item.base} />
                </p>
              )}
              {item.arabic ? (
                <p className="mt-1 text-sm leading-6 text-[#3e5d70]">
                  <Rich text={item.arabic} />
                </p>
              ) : null}
              <label className="mt-2 block">
                <span className="mb-1 block text-sm font-bold text-[#3e5d70]">
                  {item.kind === "negative" ? "اكتب صيغة النفي" : item.kind === "wh" ? "اكتب سؤال Wh" : "اكتب السؤال"}
                </span>
                <input
                  type="text"
                  dir="auto"
                  value={input[item.id] ?? ""}
                  disabled={item.sourceOnly ? false : isChecked}
                  onChange={(event) => setValue(item.id, event.currentTarget.value)}
                  className={`${FOCUS_37} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base text-[#17384a]`}
                  aria-label={`إجابة البند ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!(input[item.id] ?? "").trim()}
                  onClick={() => {
                    setChecked((current) => ({ ...current, [item.id]: true }));
                    setShown((current) => ({ ...current, [item.id]: true }));
                  }}
                >
                  افحص العناصر
                </ActionButton37>
              ) : (
                <div className="mt-2 space-y-2">
                  <Feedback37 state={allOk ? "ok" : "review"} title={allOk ? "العناصر المطلوبة ظاهرة في إجابتك." : "راجع العناصر الناقصة، ثم قارن بمفتاح المصدر."}>
                    <ul className="mt-1 space-y-1">
                      {report.map((entry) => (
                        <li key={entry.label} className="flex items-center gap-2">
                          <span aria-hidden className={entry.ok ? "text-[#1f613d]" : "text-[#943c31]"}>
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
                  {item.sourceAnswer && shown[item.id] ? (
                    <div className="rounded-xl border border-[#8fdcd4] bg-[#e4f8f5] p-3 text-sm leading-6 text-[#1f613d]">
                      <p className="font-black">إجابة المصدر:</p>
                      <p dir="ltr" className="font-en font-bold">
                        {item.sourceAnswer}
                      </p>
                      <p dir="ltr" className="font-en font-bold">
                        {item.expected}
                      </p>
                    </div>
                  ) : (
                    <p dir="ltr" className="font-en rounded-xl border border-dashed border-[#9ed7df] bg-[#eff9fd] px-3 py-2 text-left text-sm font-bold text-[#4b6a7d]">
                      {item.expected}
                    </p>
                  )}
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      {children}
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3e5d70]">
        حاولت <span className="font-en tabular-nums">{Object.values(checked).filter(Boolean).length}</span> من{" "}
        <span className="font-en tabular-nums">{items.length}</span> بندًا.
      </p>
      {attemptedAll && revealAfterAttempt ? (
        <p className="text-sm font-black text-[#1f613d]">ظهرت إجابات المصدر لكل بند؛ قارن صياغتك بها.</p>
      ) : null}
      {attemptedAll ? (
        <div className="mt-2">
          <ActionButton37 variant="secondary" onClick={() => onComplete?.()}>
            تمّت المحاولة
          </ActionButton37>
        </div>
      ) : null}
    </section>
  );
}

export function NegativeBuildLab37({ onComplete }: { onComplete?: () => void }) {
  const items = NEGATIVE_BUILD_37.map((item) => ({
    id: item.id,
    n: item.n,
    base: item.base,
    arabic: item.arabic,
    kind: "negative" as const,
    expected: item.negative,
    sourceAnswer: item.negative,
  }));
  return (
    <BuildLab37
      id="negative-build"
      eyebrow="§18 · negative builder"
      title="حوّل كل جملة إلى النفي"
      note={
        <PlatformNote37>
          <Rich text="الصيغة: Subject + won't + be + V-ing (أو will not be). اكتب نفيك ثم افحص العناصر، وسترى صيغة المصدر للمقارنة." />
        </PlatformNote37>
      }
      items={items}
      onComplete={onComplete}
      revealAfterAttempt
    />
  );
}

export function YesNoBuildLab37({ onComplete }: { onComplete?: () => void }) {
  const items = YESNO_BUILD_37.map((item) => ({
    id: item.id,
    n: item.n,
    base: item.base,
    kind: "question" as const,
    expected: item.question,
    sourceAnswer: item.question,
  }));
  return (
    <BuildLab37
      id="yesno-build"
      eyebrow="§20 · question builder"
      title="كوّن سؤال نعم/لا من كل جملة"
      note={
        <PlatformNote37>
          الطريقة: نضع will قبل الفاعل. القاعدة: <span dir="ltr" className="font-en font-black">Will + Subject + be + V-ing?</span>
        </PlatformNote37>
      }
      items={items}
      onComplete={onComplete}
      revealAfterAttempt
    />
  );
}

export function WhBuildLab37({ onComplete }: { onComplete?: () => void }) {
  // المطلوب هنا هو إعادة بناء السؤال الإنجليزي من معناه العربي، وإجابة المصدر
  // لا تظهر إلا بعد المحاولة (الجدول في بطاقة القسم يبقى مرجعًا كاملًا).
  const items = [
    { id: "what-afternoon", n: 1, base: "ماذا ستكون تفعل غدًا بعد الظهر؟", kind: "wh" as const, expected: "What will you be doing tomorrow afternoon?" },
    { id: "where-staying", n: 2, base: "أين سيكونون يقيمون الأسبوع القادم؟", kind: "wh" as const, expected: "Where will they be staying next week?" },
    { id: "when-working", n: 3, base: "متى ستكون تعمل؟", kind: "wh" as const, expected: "When will she be working?" },
    { id: "why-alone", n: 4, base: "لماذا سيكون مسافرًا بمفرده؟", kind: "wh" as const, expected: "Why will he be travelling alone?" },
    { id: "who-meeting", n: 5, base: "من ستقابل غدًا؟", kind: "wh" as const, expected: "Who will you be meeting tomorrow?" },
    { id: "how-long", n: 6, base: "كم من الوقت سيقيمون؟", kind: "wh" as const, expected: "How long will they be staying?" },
  ];
  return (
    <BuildLab37
      id="wh-build"
      eyebrow="§22 · Wh question builder"
      title="ابنِ سؤال Wh من المعنى العربي"
      note={
        <PlatformNote37>
          <Rich text="القاعدة: Wh-word + will + Subject + be + V-ing? اكتب السؤال الإنجليزي من المعنى، ثم افحص عناصره وقارِن بما في بطاقة القسم." />
        </PlatformNote37>
      }
      items={items}
      onComplete={onComplete}
    />
  );
}

// ------------------------------------------------------------
// §24 — قواعد ing
// ------------------------------------------------------------

export function IngLab37({ onComplete }: { onComplete?: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const attempted = ING_ITEMS_37.filter((item) => checked[item.base]).length;
  const correctCount = ING_ITEMS_37.filter((item) => checked[item.base] && (values[item.base] ?? "").trim().toLowerCase() === item.answer).length;
  return (
    <section data-lab="ing" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§24 · -ing workshop</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">اكتب الصيغة الصحيحة لكل فعل</h2>
      <PlatformNote37>
        اكتب صيغة -ing ثم تحقق. القواعد الأربع كما في المصدر: الإضافة المباشرة، وحذف e الصامتة، ومضاعفة الحرف الأخير في أفعال معينة،
        وتحوّل ie إلى ying.
      </PlatformNote37>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {ING_ITEMS_37.map((item) => {
          const isChecked = !!checked[item.base];
          const ok = (values[item.base] ?? "").trim().toLowerCase() === item.answer;
          return (
            <div key={item.base} data-ing-item={item.base} className="rounded-2xl border border-[#b8dff0] bg-white p-3">
              <div className="flex items-center gap-2">
                <span dir="ltr" className={`font-en text-base font-black ${ok && isChecked ? "text-[#1f613d]" : "text-[#084765]"}`}>
                  {item.base}
                </span>
                <span aria-hidden className="font-en text-[#4b6a7d]">→</span>
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
                  className={`${FOCUS_37} min-w-0 flex-1 rounded-lg border border-[#bfcac4] bg-white px-3 py-2 text-base text-[#17384a]`}
                />
              </div>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!(values[item.base] ?? "").trim()}
                  onClick={() => {
                    setChecked((current) => ({ ...current, [item.base]: true }));
                    if (Object.keys(checked).length + 1 === ING_ITEMS_37.length) onComplete?.();
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
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3e5d70]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{ING_ITEMS_37.length}</span>،
        وصحيح منها <span className="font-en tabular-nums">{correctCount}</span>.
      </p>
      <PlatformNote37>
        ملاحظة دقة من المنصة: قاعدة مضاعفة الحرف الأخير تحتاج شرطًا إضافيًا — المقطع الأخير يجب أن يكون مُشدَّدًا وينتهي (ساكن + متحرك + ساكن)،
        لذلك: begin → beginning وrun → running، أما visit → visiting وopen → opening فلا مضاعفة فيهما. و«travel → travelling» بالكتابة
        البريطانية هي المستخدمة في أمثلة هذا الدرس.
      </PlatformNote37>
    </section>
  );
}

// ------------------------------------------------------------
// §28 — التدريب التأسيسي (6 أسئلة)
// ------------------------------------------------------------

export function Exercise28Lab37({ onComplete }: { onComplete?: () => void }) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = EXERCISE28_ITEMS_37.filter((item) => checked[item.n]).length;
  const score = EXERCISE28_ITEMS_37.filter((item) => checked[item.n] && selected[item.n] === item.answer).length;
  return (
    <section data-lab="exercise28" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§28 · guided practice</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">اختر الصيغة الصحيحة (ستة أسئلة)</h2>
      <div className="mt-3 space-y-3">
        {EXERCISE28_ITEMS_37.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = selected[item.n] === item.answer;
          return (
            <fieldset key={item.n} data-practice-item={`exercise28-${item.n}`} className="rounded-2xl border border-[#b8dff0] bg-white p-3">
              <legend className="sr-only">السؤال {item.n}</legend>
              <p dir="ltr" className="font-en text-left text-[#17384a]">
                {item.prompt}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.options.map((option) => {
                  const value = option.split(".")[0].trim();
                  return (
                    <label key={option} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${selected[item.n] === value ? "border-[#007b83] bg-[#e4f8f5]" : "border-[#b8dff0] bg-white"}`}>
                      <input type="radio" name={`exercise28-${item.n}`} value={value} checked={selected[item.n] === value} disabled={isChecked} onChange={() => setSelected((current) => ({ ...current, [item.n]: value }))} className={`${FOCUS_37} h-4 w-4 accent-[#007b83]`} />
                      <span dir="ltr" className="font-en">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!selected[item.n]}
                  onClick={() => {
                    setChecked((current) => ({ ...current, [item.n]: true }));
                    if (Object.keys(checked).length + 1 === EXERCISE28_ITEMS_37.length) onComplete?.();
                  }}
                >
                  تحقق
                </ActionButton37>
              ) : (
                <div className="mt-2">
                  <Feedback37 state={ok ? "ok" : "review"} title={ok ? "إجابة صحيحة." : `إجابة المصدر: ${item.answer} — ${item.answerText}`}>
                    حل المصدر: <span dir="ltr" className="font-en font-black">{item.answer} — {item.answerText}</span>
                  </Feedback37>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3e5d70]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{EXERCISE28_ITEMS_37.length}</span>،
        ومطابق للمفتاح <span className="font-en tabular-nums">{score}</span>.
      </p>
    </section>
  );
}

// ------------------------------------------------------------
// §29 — تدريب التحويلات (نفي + سؤال)
// ------------------------------------------------------------

export function Transform29Lab37({ onComplete }: { onComplete?: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const total = TRANSFORM29_ITEMS_37.length * 2;
  const attempted = Object.values(checked).filter(Boolean).length;
  return (
    <section data-lab="transform29" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§29 · transformation drill</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">حوّل كل جملة إلى النفي ثم إلى السؤال</h2>
      <PlatformNote37>
        المثال في المصدر: She will be reading at 8:00. ← النفي: She won&apos;t be reading at 8:00. — السؤال: Will she be reading at 8:00?
      </PlatformNote37>
      <div className="mt-3 space-y-3">
        {TRANSFORM29_ITEMS_37.map((item) => (
          <fieldset key={item.n} data-practice-item={`transform29-${item.n}`} className="rounded-2xl border border-[#b8dff0] bg-white p-3">
            <legend className="sr-only">البند {item.n}</legend>
            <p dir="ltr" className="font-en text-left text-[#17384a]">
              {item.base}
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(["negative", "question"] as const).map((kind) => {
                const key = `${item.n}-${kind}`;
                const isChecked = !!checked[key];
                const report = elementCheck37(values[key] ?? "", kind === "negative" ? "negative" : "question");
                const allOk = report.every((entry) => entry.ok);
                return (
                  <div key={key} className="rounded-xl border border-[#cde8f2] bg-[#ffffff] p-2.5">
                    <span className="mb-1 block text-sm font-bold text-[#3e5d70]">{kind === "negative" ? "النفي" : "السؤال"}</span>
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
                      className={`${FOCUS_37} w-full rounded-lg border border-[#bfcac4] bg-white px-3 py-2 text-base text-[#17384a]`}
                    />
                    {!isChecked ? (
                      <ActionButton37
                        className="mt-2"
                        disabled={!(values[key] ?? "").trim()}
                        onClick={() => {
                          const next = { ...checked, [key]: true };
                          setChecked(next);
                          if (Object.keys(next).length === total) onComplete?.();
                        }}
                      >
                        افحص العناصر
                      </ActionButton37>
                    ) : (
                      <div className="mt-2">
                        <Feedback37 state={allOk ? "ok" : "review"} title={allOk ? "العناصر ظاهرة." : "أكمل العناصر الناقصة."}>
                          <span dir="ltr" className="font-en block font-black text-[#1f613d]">
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
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3e5d70]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{total}</span> صيغة.
      </p>
    </section>
  );
}

// ------------------------------------------------------------
// §30 — Grammar Detective
// ------------------------------------------------------------

export function Detective30Lab37({ onComplete }: { onComplete?: () => void }) {
  const [draft, setDraft] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = DETECTIVE30_ITEMS_37.filter((item) => checked[item.n]).length;
  return (
    <section data-lab="detective30" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§30 · error workshop</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">
        <Rich text="Grammar Detective — اكتب التصحيح" />
      </h2>
      <PlatformNote37>
        كل جملة فيها خطأ واحد على الأقل. اكتب تصحيحك ثم اعرض تصحيح المصدر مع سبب الخطأ. لا يُطلب منك مطابقة الصياغة حرفيًا.
      </PlatformNote37>
      <div className="mt-3 space-y-3">
        {DETECTIVE30_ITEMS_37.map((item) => {
          const isChecked = !!checked[item.n];
          return (
            <section key={item.n} data-practice-item={`detective30-${item.n}`} className="rounded-2xl border border-[#b8dff0] bg-white p-3">
              <p dir="ltr" className="font-en text-left text-[#943c31]">
                {`${item.n}. ${item.prompt}`}
              </p>
              <label className="mt-2 block">
                <span className="mb-1 block text-sm font-bold text-[#3e5d70]">تصحيحك</span>
                <input
                  type="text"
                  dir="auto"
                  value={draft[item.n] ?? ""}
                  disabled={isChecked}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setDraft((current) => ({ ...current, [item.n]: value }));
                  }}
                  className={`${FOCUS_37} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-base text-[#17384a]`}
                  aria-label={`تصحيح الجملة ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!(draft[item.n] ?? "").trim()}
                  onClick={() => {
                    setChecked((current) => ({ ...current, [item.n]: true }));
                    if (Object.keys(checked).length + 1 === DETECTIVE30_ITEMS_37.length) onComplete?.();
                  }}
                >
                  اعرض تصحيح المصدر
                </ActionButton37>
              ) : (
                <div className="mt-2">
                  <Feedback37 state="info" title="تصحيح المصدر وسبب الخطأ">
                    <span dir="ltr" className="font-en block font-black text-[#1f613d]">
                      {item.answer}
                    </span>
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
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3e5d70]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{DETECTIVE30_ITEMS_37.length}</span>.
      </p>
      {attempted === DETECTIVE30_ITEMS_37.length ? <p className="mt-1 text-sm font-black text-[#1f613d]">يظهر الآن مفتاح المصدر الكامل أسفل بطاقة القسم.</p> : null}
    </section>
  );
}

// ------------------------------------------------------------
// §31 — IQ200
// ------------------------------------------------------------

export function IQ200Lab37({ onComplete }: { onComplete?: () => void }) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = IQ200_ITEMS_37.filter((item) => checked[item.n]).length;
  const score = IQ200_ITEMS_37.filter((item) => checked[item.n] && selected[item.n] === item.answer).length;
  return (
    <section data-lab="iq200" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§31 · IQ200 meaning lab</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">اختر الزمن المناسب بحسب المعنى</h2>
      <div className="mt-3 space-y-3">
        {IQ200_ITEMS_37.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = selected[item.n] === item.answer;
          return (
            <fieldset key={item.n} data-practice-item={`iq200-${item.n}`} className="rounded-2xl border border-[#b8dff0] bg-white p-3">
              <legend className="sr-only">الموقف {item.n}</legend>
              <div className="space-y-1">
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
                  <label key={choice.value} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${selected[item.n] === choice.value ? "border-[#007b83] bg-[#e4f8f5]" : "border-[#b8dff0] bg-white"}`}>
                    <input type="radio" name={`iq200-${item.n}`} value={choice.value} checked={selected[item.n] === choice.value} disabled={isChecked} onChange={() => setSelected((current) => ({ ...current, [item.n]: choice.value }))} className={`${FOCUS_37} h-4 w-4 accent-[#007b83]`} />
                    <span dir="ltr" className="font-en">
                      {choice.label}
                    </span>
                  </label>
                ))}
              </div>
              {!isChecked ? (
                <ActionButton37
                  className="mt-2"
                  disabled={!selected[item.n]}
                  onClick={() => {
                    setChecked((current) => ({ ...current, [item.n]: true }));
                    if (Object.keys(checked).length + 1 === IQ200_ITEMS_37.length) onComplete?.();
                  }}
                >
                  تحقق
                </ActionButton37>
              ) : (
                <div className="mt-2">
                  <Feedback37 state={ok ? "ok" : "review"} title={ok ? "إجابة مطابقة لمفتاح المصدر." : `مفتاح المصدر: ${item.answerText}`}>
                    <span dir="ltr" className="font-en block font-black">
                      {item.answerText}
                    </span>
                    <Rich text={item.why} />
                  </Feedback37>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3e5d70]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{IQ200_ITEMS_37.length}</span>،
        ومطابق للمفتاح <span className="font-en tabular-nums">{score}</span>.
      </p>
    </section>
  );
}

// ------------------------------------------------------------
// §32 — Reading Challenge
// ------------------------------------------------------------

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
    <section data-lab="reading32" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§32 · comprehension</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">أجب عن أسئلة الفهم الثمانية</h2>
      <label className="mt-3 inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#b8dff0] bg-white px-3 py-2 text-sm font-bold text-[#17384a]">
        <input type="checkbox" checked={highlight} onChange={onToggleHighlight} className={`${FOCUS_37} h-4 w-4 accent-[#007b83]`} />
        <span>تمييز صيغ المستقبل في النص أعلاه (بصري فقط — لا يخفي النص)</span>
      </label>
      {highlight ? (
        <p className="mt-2 text-xs font-bold text-[#4b6a7d]" role="status">
          التمييز مُطبَّق على نص المصدر في البطاقة أعلاه.
        </p>
      ) : null}
      <div className="mt-3 space-y-2">
        {READING32_QUESTIONS_37.map((question, index) => (
          <label key={question} className="block rounded-2xl border border-[#b8dff0] bg-white p-3">
            <span dir="ltr" className="font-en mb-1 block text-left font-bold text-[#17384a]">
              {question}
            </span>
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
              className={`${FOCUS_37} w-full resize-y rounded-lg border border-[#bfcac4] bg-white p-2.5 text-left text-base leading-7 text-[#17384a]`}
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
          <p role="status" className="rounded-xl border border-[#8fdcd4] bg-[#e4f8f5] px-3 py-2 text-sm font-black text-[#1f613d]">
            ظهرت إجابات المصدر الثمانية أسفل بطاقة القسم، مع تحليل الصيغ.
          </p>
        )}
        <p aria-live="polite" className="text-sm font-bold text-[#3e5d70]">
          كتبت <span className="font-en tabular-nums">{answered}</span> من <span className="font-en tabular-nums">{READING32_QUESTIONS_37.length}</span> إجابة.
        </p>
      </div>
      {revealed ? (
        <div className="mt-3 space-y-2">
          <h3 className="text-sm font-black text-[#084765]">تحليل صيغ المستقبل في النص — إضافة من المنصة</h3>
          {READING32_ANALYSIS_37.map((entry) => (
            <div key={entry.line} className="rounded-xl border border-[#dce3dd] bg-[#eff9fd] p-3 text-sm leading-6 text-[#17384a]">
              <p dir="ltr" className="font-en text-left text-[#17384a]">
                {entry.line}
              </p>
              <p className="mt-1">
                <span dir="ltr" className="font-en block w-fit rounded bg-white px-2 font-black">{entry.form}</span>
                <Rich text={entry.why} />
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

// ------------------------------------------------------------
// §36 — ورشة الكتابة
// ------------------------------------------------------------

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
    <section data-lab="writing36" className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">§36 · Writing Mission</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#17384a]">
        <Rich text="My Life at This Time Tomorrow — فقرة من 12 إلى 15 جملة" />
      </h2>
      <PlatformNote37>
        اكتب فقرتك بالإنجليزية، ثم راجع بنود المصدر الثمانية بنفسك. لا يصدر النظام حكمًا آليًا على جودة الفقرة أو صحة تراكيبها؛ والعداد مساعد فقط.
      </PlatformNote37>
      <label className="mt-3 block">
        <span className="mb-1 block font-bold text-[#17384a]">مسودتك باللغة الإنجليزية</span>
        <textarea
          rows={12}
          dir="ltr"
          lang="en"
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          placeholder="Write your paragraph here…"
          className={`${FOCUS_37} w-full resize-y rounded-2xl border border-[#bfcac4] bg-white p-4 text-left text-base leading-7 text-[#17384a]`}
        />
      </label>
      <p aria-live="polite" className="mt-2 rounded-xl bg-[#eff9fd] px-3 py-2 text-sm font-bold text-[#3e5d70]">
        عدد الجمل التقريبي: <span dir="ltr" className="font-en tabular-nums">{sentenceCount}</span> / المطلوب 12–15
      </p>
      <fieldset className="mt-3 rounded-2xl border border-[#b8dff0] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#084765]">قائمة مراجعة ذاتية — الشروط الثمانية الأصلية</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {WRITING36_CRITERIA_37.map((criterion, index) => (
            <label key={criterion} className="flex items-start gap-2 rounded-xl border border-[#e0e3dc] bg-[#ffffff] p-3 text-sm leading-6 text-[#17384a]">
              <input
                type="checkbox"
                checked={!!checked[index]}
                onChange={(event) => {
                  const value = event.currentTarget.checked;
                  setChecked((current) => ({ ...current, [index]: value }));
                }}
                className={`${FOCUS_37} mt-1 h-4 w-4 shrink-0 accent-[#007b83]`}
              />
              <span>
                <Rich text={criterion} />
              </span>
            </label>
          ))}
        </div>
        <p aria-live="polite" className="mt-2 text-xs font-bold text-[#4b6a7d]">
          علّمت <span className="font-en tabular-nums">{marked}</span> من 8 — راجع كل بند بنفسك.
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
        {!hasEnough ? <p className="text-sm font-bold text-[#4b6a7d]">اكتب 12 جملة على الأقل لإظهار النموذج.</p> : null}
      </div>
      {modelOpen ? (
        <div className="mt-3 space-y-2 rounded-2xl border border-[#8fdcd4] bg-[#e4f8f5] p-3">
          <p className="text-sm font-black text-[#1f613d]">نموذج المصدر الإرشادي — لا تنسخه، اكتب فقرتك بأفكارك:</p>
          {WRITING36_MODEL_37.map((line) => (
            <EnglishLine37 key={line}>{line}</EnglishLine37>
          ))}
        </div>
      ) : null}
    </section>
  );
}

// ------------------------------------------------------------
// §1 — قائمة الأهداف (مراجعة ذاتية)
// ------------------------------------------------------------

export function ObjectivesChecklist37({ objectives }: { objectives: readonly string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = objectives.filter((_, index) => checked[index]).length;
  return (
    <div className="rounded-2xl border border-[#b8dff0] bg-white p-3">
      <p className="text-sm font-black text-[#084765]">علّم الأهداف التي تراها واضحة الآن (مراجعة ذاتية):</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {objectives.map((objective, index) => (
          <label key={objective} className="flex items-start gap-2 rounded-xl border border-[#e0e3dc] bg-[#ffffff] p-2.5 text-sm leading-6 text-[#17384a]">
            <input
              type="checkbox"
              checked={!!checked[index]}
              onChange={(event) => {
                const value = event.currentTarget.checked;
                setChecked((current) => ({ ...current, [index]: value }));
              }}
              className={`${FOCUS_37} mt-1 h-4 w-4 shrink-0 accent-[#007b83]`}
            />
            <span>
              <Rich text={objective} />
            </span>
          </label>
        ))}
      </div>
      <p aria-live="polite" className="mt-2 text-xs font-bold text-[#4b6a7d]">
        علّمت <span className="font-en tabular-nums">{done}</span> من <span className="font-en tabular-nums">{objectives.length}</span> هدفًا.
      </p>
    </div>
  );
}

// ------------------------------------------------------------
// §37 و§38 — لوحات مرجعية مع تحقق سريع
// ------------------------------------------------------------

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

// ------------------------------------------------------------
// مكوّنات مبسّطة تُستخدم في خطوات متعددة
// ------------------------------------------------------------

export function MeaningLab37({ sectionId, onComplete }: { sectionId: keyof typeof MEANING_LAB_37; onComplete?: () => void }) {
  const items = MEANING_LAB_37[sectionId];
  return (
    <ChoiceLab37
      id={`meaning-${sectionId}`}
      eyebrow={`§${sectionId.replace("s", "")} · meaning lab`}
      title="اختر الزمن بحسب ما يقدّمه المتحدث"
      note={
        <PlatformNote37>
          الأمثلة من المصدر نفسه. الفرق بين الأزمنة فرق في التركيز الذي يقدّمه المتحدث، لا في صحة الجملة النحوية.
        </PlatformNote37>
      }
      items={items}
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
      eyebrow="§8 · time expressions"
      title="التعبيرات الزمنية الشائعة"
      items={TIME_EXPRESSION_ITEMS_37}
      note={
        <PlatformNote37>
          التعبيرات المذكورة في المصدر: at 8:00 tomorrow · this time tomorrow · at this time next week · tomorrow morning · all afternoon
          tomorrow · from 6:00 to 9:00 tomorrow · when you arrive.
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
          القاعدة العملية: في الجملة الزمنية المستقبلية التي تبدأ بـ when نستخدم Present Simple، أما حين تكون when أداة سؤال مباشر أو في
          سؤال غير مباشر فيبقى will صحيحًا.
        </PlatformNote37>
      }
    />
  );
}

export function WhileLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="while"
      eyebrow="§13 · while"
      title="اربط نشاطين معًا"
      items={WHILE_ITEMS_37}
      onComplete={onComplete}
    />
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

/** §16 و§17: تُدار البنود في خطوات الدرس (كل قسم ببنوده)، لذا لا مكوّن مجمّع هنا. */

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
          <Rich text="القاعدة من المصدر: won&apos;t + be + V-ing — لا تحذف be، ولا تستبدلها بـ am/is/are." />
        </PlatformNote37>
      }
    />
  );
}

export function ShortAnswerLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="short-answers"
      eyebrow="§21 · short answers"
      title="الإجابات القصيرة"
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
          القاعدة الدقيقة: أفعال مثل know / believe / understand / want / need / own لا تُستخدم عادةً في الصيغ المستمرة عندما تحتفظ بمعنى
          الحالة؛ وقد تصح الصيغة المستمرة إذا تغيّر المعنى إلى نشاط أو استعمال مختلف.
        </PlatformNote37>
      }
    />
  );
}

export function ContinuousSelectLab37({ onComplete }: { onComplete?: () => void }) {
  return (
    <ChoiceLab37
      id="continuous-select"
      eyebrow="§26 · الأزمنة المستمرة الثلاثة"
      title="حدّد النقطة المرجعية لكل نشاط"
      items={CONTINUOUS_SELECT_37}
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
