import { useMemo, useState, type ReactNode } from "react";
import { Rich } from "../../shared/lessonKit";
import { ActionButton38, DeadlineFrame38, Feedback38, FOCUS_38, PlatformNote38 } from "./kit38";
import {
  AT_BY_ITEMS_38,
  BY_BEFORE_ITEMS_38,
  BY_MEANING_ITEMS_38,
  BY_THE_TIME_ITEMS_38,
  DETECTIVE30_ITEMS_38,
  DIALOGUE2_LINES_38,
  DIALOGUE_LINES_38,
  ERROR_ITEMS_38,
  EXERCISE27_ITEMS_38,
  FC_VS_FP_ITEMS_38,
  FILL28_ITEMS_38,
  FIRST_USE_ITEMS_38,
  FS_VS_FP_ITEMS_38,
  IQ31_ITEMS_38,
  NEGATION_MEANING_ITEMS_38,
  NEGATIVE_BUILD_38,
  OBJECTIVES_38,
  PERFECT_MAP_ITEMS_38,
  READING32_ANALYSIS_38,
  READING32_QUESTIONS_38,
  SAME_EVENT_ITEMS_38,
  SHORT_ANSWER_ITEMS_38,
  SUMMARY_MATCH_38,
  TENSE29_ITEMS_38,
  THREE_FUTURE_ITEMS_38,
  TIME_EXPRESSION_ITEMS_38,
  TIMELINE_MOMENTS_38,
  TWO_EVENTS_ITEMS_38,
  V3_ITEMS_38,
  V3_PAIRS_38,
  WH_BUILD_38,
  WRITING35_CRITERIA_38,
  WRITING35_MODEL_38,
  WRITING_MODEL_CHECK_38,
  YESNO_BUILD_38,
  type ChoiceItem38,
} from "./practiceData38";

function EnglishLine38({ children }: { children: ReactNode }) {
  return (
    <p dir="ltr" className="font-en rounded-xl border border-[#d9cbb0] bg-[#fffdf6] px-3 py-2 text-left text-[#122033]">
      {children}
    </p>
  );
}

function ChoiceList38({
  groupName,
  item,
  value,
  disabled,
  onSelect,
}: {
  groupName: string;
  item: ChoiceItem38;
  value?: string;
  disabled: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <div className={`mt-2 grid gap-2 ${item.wide ? "2xl:grid-cols-2" : "sm:grid-cols-2"}`}>
      {item.choices.map((choice) => (
        <label
          key={choice.value}
          className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm font-bold leading-6 text-[#1a2433] ${
            value === choice.value ? "border-[#1b3a5c] bg-[#e8eef5]" : "border-[#d4c4a0] bg-white hover:bg-[#f7f8f5]"
          }`}
        >
          <input
            type="radio"
            name={`${groupName}-${item.id}`}
            value={choice.value}
            checked={value === choice.value}
            disabled={disabled}
            onChange={(event) => onSelect(event.currentTarget.value)}
            className={`${FOCUS_38} mt-1 h-4 w-4 accent-[#1b3a5c]`}
          />
          {/*
            التصحيح يُعرض في كتلة مستقلة: عندما يلي الفترة الإنجليزية كلمة «الصحيح»
            يجمعهما عازل الزوج LTR فيسبق «الصحيح» العبارة الإنجليزية بصريًا وتختلّ
            قراءة السطر. الكتلة الثانية تعيد ضبط اتجاه الفقرة فتُقرأ الجملتان بترتيبهما.
          */}
          <span className="min-w-0" dir="auto">
            <span className="block">
              <Rich text={choice.label} />
            </span>
            {choice.note ? (
              <span className="mt-0.5 block">
                <Rich text={choice.note} />
              </span>
            ) : null}
          </span>
        </label>
      ))}
    </div>
  );
}

export function ChoiceLab38({
  id,
  items,
  eyebrow,
  title,
  note,
  onComplete,
  footnote,
}: {
  id: string;
  items: readonly ChoiceItem38[];
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

  const check = (item: ChoiceItem38) => {
    const next = { ...checked, [item.id]: true };
    setChecked(next);
    if (Object.keys(next).length === items.length) onComplete?.();
  };

  return (
    <section data-lab={id} className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">
        <Rich text={eyebrow} />
      </p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">{title}</h2>
      {note ? <div className="mt-3">{note}</div> : null}
      <div className="mt-3 space-y-3">
        {items.map((item, index) => {
          const isChecked = !!checked[item.id];
          const accepted = item.accepted.includes(selected[item.id] ?? "");
          return (
            <fieldset key={item.id} data-lab-item={`${id}-${item.id}`} className="rounded-2xl border border-[#d4c4a0] bg-white p-3 sm:p-4">
              <legend className="sr-only">النشاط {index + 1}</legend>
              <p className="font-bold leading-7 text-[#1a2433]">
                <Rich text={item.prompt} />
              </p>
              {item.lines?.length ? (
                <div className="mt-2 space-y-1">
                  {item.lines.map((line) => (
                    <EnglishLine38 key={line}>{line}</EnglishLine38>
                  ))}
                </div>
              ) : null}
              <ChoiceList38
                groupName={id}
                item={item}
                value={selected[item.id]}
                disabled={isChecked}
                onSelect={(value) => setSelected((current) => ({ ...current, [item.id]: value }))}
              />
              {!isChecked ? (
                <ActionButton38 className="mt-3" disabled={!selected[item.id]} onClick={() => check(item)}>
                  تحقق من اختياري
                </ActionButton38>
              ) : (
                <div className="mt-3">
                  <Feedback38
                    state={accepted ? "ok" : "review"}
                    title={accepted ? "اختيار مناسب." : "راجع المعنى: الاختيار الآخر هو الأنسب في هذا المثال."}
                  >
                    <Rich text={item.feedback} />
                    {item.nuance ? (
                      <p className="mt-1">
                        <Rich text={item.nuance} />
                      </p>
                    ) : null}
                  </Feedback38>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3d4a5c]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{items.length}</span>.
      </p>
      {complete ? <p className="text-sm font-black text-[#1c6b3c]">اكتملت المحاولة في هذا المختبر.</p> : null}
      {footnote ? <div className="mt-3">{footnote}</div> : null}
    </section>
  );
}

export function ObjectivesChecklist38({ objectives }: { objectives: readonly string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = objectives.filter((_, index) => checked[index]).length;
  return (
    <div className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
      <p className="text-sm font-black text-[#122033]">علّم الأهداف التي تراها واضحة الآن (مراجعة ذاتية):</p>
      {/*
        عمود واحد حتى أعرض الشاشات: في العمودين الضيّقين ينقسم اسم إنجليزي
        طويل مثل «Future Perfect» بين سطرين فيظهر مبعثرًا داخل الجملة العربية.
      */}
      <div className="mt-2 grid gap-2 2xl:grid-cols-2">
        {objectives.map((objective, index) => (
          <label key={objective} className="flex items-start gap-2 rounded-xl border border-[#f2ded8] bg-[#fffdf6] p-2.5 text-sm leading-6 text-[#1a2433]">
            <input
              type="checkbox"
              checked={!!checked[index]}
              onChange={(event) => {
                const value = event.currentTarget.checked;
                setChecked((current) => ({ ...current, [index]: value }));
              }}
              className={`${FOCUS_38} mt-1 h-4 w-4 shrink-0 accent-[#1b3a5c]`}
            />
            <span>
              <Rich text={objective} />
            </span>
          </label>
        ))}
      </div>
      <p aria-live="polite" className="mt-2 text-xs font-bold text-[#4a5568]">
        علّمت <span className="font-en tabular-nums">{done}</span> من <span className="font-en tabular-nums">{objectives.length}</span> هدفًا.
      </p>
    </div>
  );
}

export function DeadlineTimelineLab38({ onComplete }: { onComplete?: () => void }) {
  const [momentId, setMomentId] = useState<string>("");
  const [answered, setAnswered] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const moment = TIMELINE_MOMENTS_38.find((candidate) => candidate.id === momentId);
  const correct = answered === "friday";

  return (
    <section data-lab="timeline" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">مختبر الخط الزمني</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">انظر إلى المشروع من نقطة أبعد</h2>
      <PlatformNote38>
        خطة المصدر: اليوم الاثنين، إنهاء المشروع الأربعاء، ونقطة المرجع الجمعة. حرّك المؤشر على الأيام الثلاثة، ثم أجب.
      </PlatformNote38>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {TIMELINE_MOMENTS_38.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            data-timeline-moment={candidate.id}
            aria-pressed={momentId === candidate.id}
            onClick={() => setMomentId(candidate.id)}
            className={`${FOCUS_38} min-h-14 rounded-2xl border px-3 py-2 text-right transition-colors motion-reduce:transition-none ${
              momentId === candidate.id ? "border-[#1b3a5c] bg-[#e8eef5]" : "border-[#d4c4a0] bg-white hover:bg-[#f7f8f5]"
            }`}
          >
            <span dir="ltr" className="font-en block text-base font-black tabular-nums text-[#122033]">
              {candidate.clock}
            </span>
            <span className="mt-0.5 block text-sm font-bold text-[#1a2433]">{candidate.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full border border-[#d4c4a0] bg-[#f7f2e4]">
        <div
          className="h-full bg-[#1b3a5c] transition-[width] motion-reduce:transition-none"
          style={{ width: momentId === "monday" ? "10%" : momentId === "wednesday" ? "50%" : momentId === "friday" ? "90%" : "0%" }}
        />
      </div>
      {moment ? (
        <div className="mt-3 space-y-2" data-timeline-readout={moment.id}>
          <EnglishLine38>{moment.sentence}</EnglishLine38>
          <p className="text-sm leading-6 text-[#1a2433]">
            <Rich text={moment.arabic} />
          </p>
          <p className="rounded-xl bg-[#f7f2e4] px-3 py-2 text-sm font-bold leading-6 text-[#3d4a5c]">
            <Rich text={moment.note} />
          </p>
        </div>
      ) : (
        <p className="mt-3 rounded-xl border border-dashed border-[#d4c4a0] bg-[#f7f2e4] px-3 py-2 text-sm font-bold text-[#4a5568]">
          اختر يومًا من الأيام الثلاثة لعرض ما يحدث فيه.
        </p>
      )}
      <fieldset className="mt-4 rounded-2xl border border-[#d4c4a0] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#122033]">سؤال خط الإنجاز</legend>
        <p className="font-bold leading-7 text-[#1a2433]">
          <Rich text="أي يوم هو نقطة المرجع المستقبلية في جملة I will have finished it by Friday. ؟" />
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TIMELINE_MOMENTS_38.map((candidate) => (
            <label
              key={candidate.id}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-black ${
                answered === candidate.id ? "border-[#1b3a5c] bg-[#e8eef5]" : "border-[#d4c4a0] bg-white"
              }`}
            >
              <input
                type="radio"
                name="timeline-answer"
                value={candidate.id}
                checked={answered === candidate.id}
                disabled={checked}
                onChange={() => setAnswered(candidate.id)}
                className={`${FOCUS_38} h-4 w-4 accent-[#1b3a5c]`}
              />
              <span dir="ltr" className="font-en tabular-nums">
                {candidate.clock}
              </span>
            </label>
          ))}
        </div>
        {!checked ? (
          <ActionButton38
            className="mt-3"
            disabled={!answered}
            onClick={() => {
              setChecked(true);
              onComplete?.();
            }}
          >
            تحقق من إجابتي
          </ActionButton38>
        ) : (
          <div className="mt-3">
            <Feedback38 state={correct ? "ok" : "review"} title={correct ? "إجابة صحيحة." : "راجع نقطة المرجع."}>
              {correct
                ? "الجمعة هي نقطة المرجع المستقبلية: عندما نصل إليها سيكون إنهاء المشروع قد حدث بالفعل. Yes. I will have finished it by Friday."
                : "الاثنين هو اليوم، والأربعاء إنهاء المشروع؛ أما نقطة المرجع في جملة المصدر فهي الجمعة."}
            </Feedback38>
          </div>
        )}
      </fieldset>
    </section>
  );
}

const FORMULA_PIECES_38 = [
  { id: "subject", text: "Subject", label: "الفاعل" },
  { id: "will", text: "will", label: "المستقبل" },
  { id: "have", text: "have", label: "جزء ثابت" },
  { id: "v3", text: "V3", label: "التصريف الثالث" },
] as const;

export function FormulaOrderLab38() {
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<"idle" | "ok" | "review">("idle");
  const expected = FORMULA_PIECES_38.map((piece) => piece.id);
  const toggle = (id: string) => {
    setResult("idle");
    setPicked((current) => (current.includes(id) ? current.filter((candidate) => candidate !== id) : [...current, id]));
  };
  const check = () => setResult(picked.join("|") === expected.join("|") ? "ok" : "review");
  const built = picked.map((id) => FORMULA_PIECES_38.find((piece) => piece.id === id)?.text ?? "").join(" + ");
  return (
    <section data-lab="formula" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">ورشة بناء الصيغة</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">ابنِ الصيغة بترتيبها الصحيح</h2>
      <p className="mt-2 text-sm leading-6 text-[#3d4a5c]">
        اضغط العناصر بالترتيب الذي تُبنى به الجملة، ثم تحقّق. الترتيب هنا هو نفس ترتيب الجملة الإنجليزية.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {FORMULA_PIECES_38.map((piece) => (
          <button
            key={piece.id}
            type="button"
            data-formula-piece={piece.id}
            aria-pressed={picked.includes(piece.id)}
            onClick={() => toggle(piece.id)}
            className={`${FOCUS_38} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              picked.includes(piece.id) ? "border-[#1b3a5c] bg-[#e8eef5] text-[#122033]" : "border-[#d4c4a0] bg-white text-[#1a2433] hover:bg-[#f7f8f5]"
            }`}
          >
            <span dir="ltr" className="font-en">
              {piece.text}
            </span>
            <span className="mt-0.5 block text-[11px] font-bold text-[#4a5568]">{piece.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <ActionButton38 disabled={picked.length === 0} onClick={check}>
          تحقق من الترتيب
        </ActionButton38>
        <p dir="ltr" className="font-en rounded-xl border border-[#d9cbb0] bg-white px-3 py-2 text-left text-[#122033]">
          {built || "—"}
        </p>
      </div>
      {result !== "idle" ? (
        <div className="mt-3">
          <Feedback38 state={result === "ok" ? "ok" : "review"} title={result === "ok" ? "ترتيب صحيح." : "الترتيب غير مطابق."}>
            الصيغة الصحيحة: <span dir="ltr" className="font-en font-black">Subject + will + have + V3</span> — الفاعل، ثم will، ثم have،
            ثم التصريف الثالث. مثال: <span dir="ltr" className="font-en">She will have arrived.</span>
          </Feedback38>
        </div>
      ) : null}
    </section>
  );
}

const PARTS_38 = [
  { id: "she", text: "She", role: "الفاعل", note: "الفاعل: من يقوم بالإنجاز." },
  { id: "will", text: "will", role: "فعل مساعد للمستقبل", note: "will = فعل مساعد للتعبير عن المستقبل." },
  { id: "have", text: "have", role: "جزء ثابت من Future Perfect", note: "have = جزء ثابت؛ لا تتحول إلى has بعد will." },
  { id: "completed", text: "completed", role: "التصريف الثالث V3", note: "completed = التصريف الثالث V3." },
  { id: "experiment", text: "the experiment", role: "المفعول به", note: "the experiment = المفعول به." },
  { id: "noon", text: "by noon", role: "بحلول الظهر", note: "by noon = بحلول الظهر." },
] as const;

export function PartsLab38() {
  const [order, setOrder] = useState<string[]>([]);
  const [preferHas, setPreferHas] = useState("");
  const [checked, setChecked] = useState(false);
  const isCorrectOrder = order.length === PARTS_38.length && order.every((id, index) => id === PARTS_38[index].id);
  const tap = (id: string) => {
    if (order.includes(id)) return;
    setOrder((current) => [...current, id]);
    setChecked(false);
  };
  return (
    <section data-lab="parts" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">تشريح الجملة</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">حلّل الجملة: She will have completed the experiment by noon.</h2>
      <p className="mt-2 text-sm leading-6 text-[#3d4a5c]">
        اضغط أجزاء الجملة بالترتيب لتعيين دور كل جزء. الترتيب هو ترتيب الجملة الإنجليزية من اليسار إلى اليمين.
      </p>
      <div data-parts-strip className="mt-3 flex flex-wrap gap-2">
        {PARTS_38.map((part) => {
          const assignedIndex = order.indexOf(part.id);
          const assigned = assignedIndex >= 0;
          return (
            <button
              key={part.id}
              type="button"
              data-part={part.id}
              aria-pressed={assigned}
              onClick={() => tap(part.id)}
              className={`${FOCUS_38} min-h-12 rounded-2xl border px-3 py-2 text-base font-black transition-colors motion-reduce:transition-none ${
                assigned ? "border-[#1b3a5c] bg-[#e8eef5] text-[#122033]" : "border-[#d4c4a0] bg-white text-[#1a2433] hover:bg-[#f7f8f5]"
              }`}
            >
              <span dir="ltr" className="font-en">
                {part.text}
              </span>
              {assigned ? (
                <span className="mt-0.5 block text-[11px] font-bold text-[#1c6b3c]">
                  <span className="font-en tabular-nums">{assignedIndex + 1}</span> · {part.role}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <ActionButton38 disabled={order.length !== PARTS_38.length} onClick={() => setChecked(true)}>
          اعرض التحليل الكامل
        </ActionButton38>
        <ActionButton38 variant="ghost" onClick={() => { setOrder([]); setChecked(false); setPreferHas(""); }}>
          إعادة الضبط
        </ActionButton38>
      </div>
      {checked ? (
        <div className="mt-3 space-y-3">
          <Feedback38 state={isCorrectOrder ? "ok" : "review"} title={isCorrectOrder ? "الترتيب مطابق لتحليل المصدر." : "راجع ترتيب الأجزاء."}>
            <span dir="ltr" className="font-en">She + will + have + completed + the experiment + by noon.</span>
            <ul className="mt-2 list-disc space-y-1 ps-5">
              {PARTS_38.map((part) => (
                <li key={part.id}>
                  <span dir="ltr" className="font-en font-black">
                    {part.text}
                  </span>{" "}
                  — <Rich text={part.note} />
                </li>
              ))}
            </ul>
          </Feedback38>
          <fieldset className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <legend className="px-1 text-sm font-black text-[#122033]">لماذا have وليس has؟</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { value: "have", label: "She will have finished." },
                { value: "has", label: "She will has finished." },
              ].map((option) => (
                <label key={option.value} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 ${preferHas === option.value ? "border-[#1b3a5c] bg-[#e8eef5]" : "border-[#d4c4a0] bg-white"}`}>
                  <input type="radio" name="have-or-has" value={option.value} checked={preferHas === option.value} onChange={() => setPreferHas(option.value)} className={`${FOCUS_38} h-4 w-4 accent-[#1b3a5c]`} />
                  <span dir="ltr" className="font-en text-sm font-bold">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {preferHas === "have" ? (
              <div className="mt-2">
                <Feedback38 state="ok" title="الصحيح: have">
                  لأن will يتبعها الفعل الأساسي، لذلك have لا تتحول إلى has مع She.
                </Feedback38>
              </div>
            ) : preferHas === "has" ? (
              <div className="mt-2">
                <Feedback38 state="review" title="هذه الصيغة خطأ في المصدر (❌)">
                  المصدر: She will has finished. ❌ — والصحيح: She will have finished. ✅
                </Feedback38>
              </div>
            ) : null}
          </fieldset>
        </div>
      ) : null}
    </section>
  );
}

const PRONOUNS_38 = [
  { id: "I", subject: "I", sentence: "I will have finished." },
  { id: "You", subject: "You", sentence: "You will have finished." },
  { id: "He", subject: "He", sentence: "He will have finished." },
  { id: "She", subject: "She", sentence: "She will have finished." },
  { id: "It", subject: "It", sentence: "It will have stopped." },
  { id: "We", subject: "We", sentence: "We will have finished." },
  { id: "They", subject: "They", sentence: "They will have finished." },
] as const;

const CONJUGATION_TRAPS_38: ChoiceItem38[] = [
  {
    id: "trap-has",
    prompt: "مع She: هل نستخدم has بعد will في Future Perfect؟",
    choices: [
      { value: "no", label: "لا، الصيغة ثابتة: will have + V3." },
      { value: "yes", label: "نعم، She will has finished." },
    ],
    accepted: ["no"],
    feedback: "المصدر: have لا تتحول إلى has مع He أو She أو It لأن will يتبعها الفعل الأساسي.",
  },
  {
    id: "trap-v3",
    prompt: "أكمل: I will have ______.",
    choices: [
      { value: "a", label: "finished" },
      { value: "b", label: "finish" },
    ],
    accepted: ["a"],
    feedback: "بعد have يأتي التصريف الثالث V3: I will have finished.",
  },
  {
    id: "trap-it",
    prompt: "جملة It في جدول المصدر هي:",
    choices: [
      { value: "a", label: "It will have stopped." },
      { value: "b", label: "It will have finished." },
    ],
    accepted: ["a"],
    feedback: "جدول المصدر: It will have stopped.",
  },
];

export function ConjugationLab38({ onComplete }: { onComplete?: () => void }) {
  const [pronoun, setPronoun] = useState<string>("I");
  const current = PRONOUNS_38.find((candidate) => candidate.id === pronoun)!;
  return (
    <section data-lab="conjugation" className="space-y-4">
      <div className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">لوحة التصريف</p>
        <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">الصيغة نفسها مع كل الضمائر</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRONOUNS_38.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              data-pronoun={candidate.id}
              aria-pressed={pronoun === candidate.id}
              onClick={() => setPronoun(candidate.id)}
              className={`${FOCUS_38} min-h-11 min-w-14 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
                pronoun === candidate.id ? "border-[#1b3a5c] bg-[#1b3a5c] text-white" : "border-[#d4c4a0] bg-white text-[#1a2433] hover:bg-[#f7f8f5]"
              }`}
            >
              <span dir="ltr" className="font-en">
                {candidate.id}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-2xl border border-[#d9cbb0] bg-[#fffdf6] p-3">
          <p dir="ltr" className="font-en text-left text-lg font-black text-[#122033]">
            {current.sentence}
          </p>
          <p className="mt-1 text-sm font-bold text-[#4a5568]">
            <Rich text="نفس الصيغة تمامًا: will have + V3 — لا has بعد will." />
          </p>
        </div>
      </div>
      <ChoiceLab38
        id="conjugation-traps"
        eyebrow="تحقق من الفهم"
        title="ثلاث نقاط يخطئ فيها الطلاب"
        items={CONJUGATION_TRAPS_38}
        onComplete={onComplete}
      />
    </section>
  );
}

export function elementCheck38(answer: string, kind: "negative" | "question" | "wh"): { label: string; ok: boolean }[] {
  const text = answer.trim();
  const lower = text.toLowerCase();
  const hasHave = /\bhave\b/.test(lower);
  const negated = /\bwon't\b|\bwill not\b/.test(lower);
  const questionMark = text.endsWith("?");
  const startsWill = /^will\b/i.test(text);
  const startsWh = /^(what|where|when|why|who|how|how many|how much)\b/i.test(lower);
  const v3Hint = /\b(finished|completed|arrived|saved|written|gone|built|prepared|learned|tested|read|done)\b/.test(lower) || /\b\w+ed\b/.test(lower);
  if (kind === "negative") {
    return [
      { label: "will not أو won't", ok: negated },
      { label: "have بعد النفي", ok: hasHave },
      { label: "التصريف الثالث V3", ok: v3Hint },
    ];
  }
  if (kind === "wh") {
    return [
      { label: "أداة استفهام", ok: startsWh },
      { label: "will بعد أداة الاستفهام", ok: /\bwill\b/.test(lower) },
      { label: "have قبل V3", ok: hasHave },
      { label: "علامة السؤال (?)", ok: questionMark },
    ];
  }
  return [
    { label: "يبدأ السؤال بـ Will", ok: startsWill },
    { label: "have بعد الفاعل", ok: hasHave },
    { label: "علامة السؤال (?)", ok: questionMark },
  ];
}

export function isPureEnglishBase(text: string) {
  return /[A-Za-z]/.test(text) && !/[\u0600-\u06FF]/.test(text);
}

export function BuildLab38({
  id,
  eyebrow,
  title,
  note,
  items,
  onComplete,
  revealAfterAttempt,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: ReactNode;
  items: readonly { id: string; n: number; base: string; arabic?: string; kind: "negative" | "question" | "wh"; expected: string; sourceAnswer?: string }[];
  onComplete?: () => void;
  revealAfterAttempt?: boolean;
}) {
  const [input, setInput] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const attemptedAll = items.every((item) => checked[item.id]);

  return (
    <section data-lab={id} className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">{title}</h2>
      {note ? <div className="mt-3">{note}</div> : null}
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          const report = elementCheck38(input[item.id] ?? "", item.kind);
          const allOk = report.every((entry) => entry.ok);
          return (
            <fieldset key={item.id} data-build-item={`${id}-${item.n}`} className="rounded-2xl border border-[#d4c4a0] bg-white p-3 sm:p-4">
              <legend className="sr-only">البند {item.n}</legend>
              {isPureEnglishBase(item.base) ? (
                <p dir="ltr" className="font-en text-left text-[#122033]">
                  {item.base}
                </p>
              ) : (
                <p dir="rtl" className="text-right font-bold text-[#1a2433]">
                  <Rich text={item.base} />
                </p>
              )}
              {item.arabic ? (
                <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">
                  <Rich text={item.arabic} />
                </p>
              ) : null}
              <label className="mt-2 block">
                <span className="mb-1 block text-sm font-bold text-[#3d4a5c]">
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
                  className={`${FOCUS_38} w-full rounded-xl border border-[#d4c4a0] bg-white px-3 py-2.5 text-base text-[#1a2433]`}
                  aria-label={`إجابة البند ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton38
                  className="mt-2"
                  disabled={!(input[item.id] ?? "").trim()}
                  onClick={() => {
                    const next = { ...checked, [item.id]: true };
                    setChecked(next);
                    if (Object.keys(next).length === items.length) onComplete?.();
                  }}
                >
                  افحص العناصر
                </ActionButton38>
              ) : (
                <div className="mt-2 space-y-2">
                  <Feedback38 state={allOk ? "ok" : "review"} title={allOk ? "العناصر المطلوبة ظاهرة في إجابتك." : "راجع العناصر الناقصة، ثم قارن بمفتاح المصدر."}>
                    <ul className="mt-1 space-y-1">
                      {report.map((entry) => (
                        <li key={entry.label} className="flex items-center gap-2">
                          <span aria-hidden className={entry.ok ? "text-[#1c6b3c]" : "text-[#a41c36]"}>
                            {entry.ok ? "✓" : "✕"}
                          </span>
                          <span>{entry.label}</span>
                        </li>
                      ))}
                    </ul>
                  </Feedback38>
                  {item.sourceAnswer ? (
                    <div className="rounded-xl border border-[#b8ddc5] bg-[#f0faf2] p-3 text-sm leading-6 text-[#1c6b3c]">
                      <p className="font-black">إجابة المصدر:</p>
                      <p dir="ltr" className="font-en font-bold">
                        {item.sourceAnswer}
                      </p>
                    </div>
                  ) : (
                    <p dir="ltr" className="font-en rounded-xl border border-dashed border-[#d4c4a0] bg-[#f7f2e4] px-3 py-2 text-left text-sm font-bold text-[#4a5568]">
                      {item.expected}
                    </p>
                  )}
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3d4a5c]">
        حاولت <span className="font-en tabular-nums">{Object.values(checked).filter(Boolean).length}</span> من{" "}
        <span className="font-en tabular-nums">{items.length}</span> بندًا.
      </p>
      {attemptedAll && revealAfterAttempt ? (
        <p className="text-sm font-black text-[#1c6b3c]">ظهرت إجابات المصدر لكل بند؛ قارن صياغتك بها.</p>
      ) : null}
    </section>
  );
}

export function NegativeBuildLab38({ onComplete }: { onComplete?: () => void }) {
  const items = NEGATIVE_BUILD_38.map((item) => ({
    id: item.id,
    n: item.n,
    base: item.base,
    arabic: item.arabic,
    kind: "negative" as const,
    expected: item.negative,
    sourceAnswer: item.negative,
  }));
  return (
    <BuildLab38
      id="negative-build"
      eyebrow="ورشة النفي"
      title="حوّل كل جملة إلى النفي"
      note={
        <PlatformNote38>
          <Rich text="الصيغة: Subject + won't + have + V3 (أو will not have). اكتب نفيك ثم افحص العناصر." />
        </PlatformNote38>
      }
      items={items}
      onComplete={onComplete}
      revealAfterAttempt
    />
  );
}

export function YesNoBuildLab38({ onComplete }: { onComplete?: () => void }) {
  const items = YESNO_BUILD_38.map((item) => ({
    id: item.id,
    n: item.n,
    base: item.base,
    kind: "question" as const,
    expected: item.question,
    sourceAnswer: item.question,
  }));
  return (
    <BuildLab38
      id="yesno-build"
      eyebrow="ورشة السؤال"
      title="كوّن سؤال نعم/لا من كل جملة"
      note={
        <PlatformNote38>
          الطريقة: نضع will قبل الفاعل. القاعدة: <span dir="ltr" className="font-en font-black">Will + Subject + have + V3?</span>
        </PlatformNote38>
      }
      items={items}
      onComplete={onComplete}
      revealAfterAttempt
    />
  );
}

export function WhBuildLab38({ onComplete }: { onComplete?: () => void }) {
  const items = WH_BUILD_38.map((item) => ({
    id: item.id,
    n: item.n,
    base: item.base,
    kind: "wh" as const,
    expected: item.expected,
    sourceAnswer: item.expected,
  }));
  return (
    <BuildLab38
      id="wh-build"
      eyebrow="ورشة أسئلة Wh"
      title="ابنِ سؤال Wh من المعنى العربي"
      note={
        <PlatformNote38>
          <Rich text="القاعدة: Wh-word + will + Subject + have + V3?" />
        </PlatformNote38>
      }
      items={items}
      onComplete={onComplete}
    />
  );
}

function DialogueLab({
  id,
  eyebrow,
  title,
  lines,
  question,
  onComplete,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lines: readonly { id: string; speaker: string; en: string; ar: string; form: string; analysis: string }[];
  question: { prompt: string; options: { value: string; label: string }[]; answer: string; feedback: string };
  onComplete?: () => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const opened = Object.values(open).filter(Boolean).length;
  return (
    <section data-lab={id} className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">{title}</h2>
      <div className="mt-3 space-y-2">
        {lines.map((line, index) => {
          const isOpen = !!open[line.id];
          return (
            <article key={line.id} data-dialogue-line={line.id} className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen((current) => ({ ...current, [line.id]: true }))}
                className={`${FOCUS_38} flex min-h-11 w-full flex-wrap items-center justify-between gap-2 rounded-xl px-1 text-right`}
              >
                <span dir="ltr" className="font-en text-left text-[#122033]">
                  <span className="font-black text-[#1b3a5c]">{line.speaker}: </span>
                  {line.en}
                </span>
                <span className="shrink-0 rounded-full bg-[#f7f2e4] px-2.5 py-1 text-xs font-black text-[#4a5568]">
                  {isOpen ? "التحليل ظاهر" : `تحليل السطر ${index + 1}`}
                </span>
              </button>
              {isOpen ? (
                <div className="mt-2 space-y-1 border-t border-[#ebe3d0] pt-2 text-sm leading-6 text-[#1a2433]">
                  <p dir="rtl">
                    <Rich text={line.ar} />
                  </p>
                  <p className="rounded-xl bg-[#f0faf2] px-3 py-2 font-bold text-[#1c6b3c]">
                    <span dir="ltr" className="font-en inline-block rounded bg-white px-2">{line.form}</span> — {line.analysis}
                  </p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3d4a5c]">
        فتحت <span className="font-en tabular-nums">{opened}</span> من <span className="font-en tabular-nums">{lines.length}</span> سطرًا.
      </p>
      <fieldset className="mt-3 rounded-2xl border border-[#d4c4a0] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#122033]">سؤال فهم الحوار</legend>
        <p className="font-bold leading-7 text-[#1a2433]">{question.prompt}</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {question.options.map((option) => (
            <label key={option.value} className={`flex min-h-11 cursor-pointer items-start gap-2 rounded-xl border p-3 text-sm font-bold ${answer === option.value ? "border-[#1b3a5c] bg-[#e8eef5]" : "border-[#d4c4a0] bg-white"}`}>
              <input type="radio" name={`${id}-q`} value={option.value} checked={answer === option.value} disabled={checked} onChange={() => setAnswer(option.value)} className={`${FOCUS_38} mt-1 h-4 w-4 accent-[#1b3a5c]`} />
              <span dir="ltr" className="font-en text-left">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {!checked ? (
          <ActionButton38
            className="mt-3"
            disabled={!answer}
            onClick={() => {
              setChecked(true);
              onComplete?.();
            }}
          >
            تحقق
          </ActionButton38>
        ) : (
          <div className="mt-3">
            <Feedback38 state={answer === question.answer ? "ok" : "review"} title={answer === question.answer ? "إجابة صحيحة." : "راجع تحليل المصدر."}>
              {question.feedback}
            </Feedback38>
          </div>
        )}
      </fieldset>
    </section>
  );
}

export function DialogueLab38({ onComplete }: { onComplete?: () => void }) {
  return (
    <DialogueLab
      id="dialogue"
      eyebrow="حوار The School Exhibition"
      title="افتح كل سطر لترى تحليله"
      lines={DIALOGUE_LINES_38}
      question={{
        prompt: "أي سطر يسأل عن إنجاز مكتمل بحلول الجمعة؟",
        options: [
          { value: "d5", label: "Maya: Excellent! Will we have prepared the presentation by Friday?" },
          { value: "d3", label: "Maya: What about the sensors?" },
        ],
        answer: "d5",
        feedback: "من تحليل المصدر: will have prepared = سؤال عن إنجاز مكتمل بحلول الجمعة.",
      }}
      onComplete={onComplete}
    />
  );
}

export function Dialogue2Lab38({ onComplete }: { onComplete?: () => void }) {
  return (
    <DialogueLab
      id="dialogue2"
      eyebrow="حوار Planning a Big Event"
      title="افتح كل سطر لترى تحليله"
      lines={DIALOGUE2_LINES_38}
      question={{
        prompt: "أي سطر يستخدم Future Continuous لا Future Perfect؟",
        options: [
          { value: "e8", label: "Omar: I'll be checking the sound system." },
          { value: "e2", label: "Omar: By Thursday, we will have decorated the main hall." },
        ],
        answer: "e8",
        feedback: "من تحليل المصدر: will be checking = نشاط جارٍ خلال فترة مستقبلية.",
      }}
      onComplete={onComplete}
    />
  );
}

export function V3Lab38({ onComplete }: { onComplete?: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const attempted = V3_ITEMS_38.filter((item) => checked[item.base]).length;
  const correctCount = V3_ITEMS_38.filter((item) => checked[item.base] && (values[item.base] ?? "").trim().toLowerCase() === item.answer).length;
  return (
    <section data-lab="v3" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">ورشة التصريف الثالث</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">اكتب التصريف الثالث لكل فعل</h2>
      <PlatformNote38>
        <Rich text="الأفعال الخمسة المنتظمة والعشرة الشاذة مأخوذة من جدولي المصدر. لا تستخدم التصريف الأول V1 ولا التصريف الثاني V2 بعد will have." />
      </PlatformNote38>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {V3_ITEMS_38.map((item) => {
          const isChecked = !!checked[item.base];
          const ok = (values[item.base] ?? "").trim().toLowerCase() === item.answer;
          return (
            <div key={item.base} data-v3-item={item.base} className="min-w-0 rounded-2xl border border-[#d4c4a0] bg-white p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span dir="ltr" className={`font-en text-base font-black ${ok && isChecked ? "text-[#1c6b3c]" : "text-[#122033]"}`}>
                  {item.base}
                </span>
                <span aria-hidden className="font-en text-[#4a5568]">→</span>
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
                  aria-label={`التصريف الثالث للفعل ${item.base}`}
                  className={`${FOCUS_38} min-w-0 flex-1 rounded-lg border border-[#d4c4a0] bg-white px-3 py-2 text-base text-[#1a2433]`}
                />
                {!isChecked ? (
                  <ActionButton38
                    className="shrink-0"
                    disabled={!(values[item.base] ?? "").trim()}
                    onClick={() => {
                      const next = { ...checked, [item.base]: true };
                      setChecked(next);
                      if (Object.keys(next).length === V3_ITEMS_38.length) onComplete?.();
                    }}
                  >
                    تحقق
                  </ActionButton38>
                ) : null}
              </div>
              {!isChecked ? null : (
                <div className="mt-2">
                  <Feedback38 state={ok ? "ok" : "review"} title={ok ? "صحيح." : `الصحيح: ${item.answer}`}>
                    <Rich text={item.rule} />
                  </Feedback38>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3d4a5c]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{V3_ITEMS_38.length}</span>،
        وصحيح منها <span className="font-en tabular-nums">{correctCount}</span>.
      </p>
    </section>
  );
}

export function Exercise27Lab38({ onComplete }: { onComplete?: () => void }) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = EXERCISE27_ITEMS_38.filter((item) => checked[item.n]).length;
  const score = EXERCISE27_ITEMS_38.filter((item) => checked[item.n] && selected[item.n] === item.answer).length;
  return (
    <section data-lab="exercise27" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">التدريب الأول</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">اختر الصيغة الصحيحة (ستة أسئلة)</h2>
      <div className="mt-3 space-y-3">
        {EXERCISE27_ITEMS_38.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = selected[item.n] === item.answer;
          return (
            <fieldset key={item.n} data-practice-item={`exercise27-${item.n}`} className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
              <legend className="sr-only">السؤال {item.n}</legend>
              <p dir="ltr" className="font-en text-left text-[#122033]">
                {item.prompt}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.options.map((option) => {
                  const value = option.split(".")[0].trim();
                  return (
                    <label key={option} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${selected[item.n] === value ? "border-[#1b3a5c] bg-[#e8eef5]" : "border-[#d4c4a0] bg-white"}`}>
                      <input type="radio" name={`exercise27-${item.n}`} value={value} checked={selected[item.n] === value} disabled={isChecked} onChange={() => setSelected((current) => ({ ...current, [item.n]: value }))} className={`${FOCUS_38} h-4 w-4 accent-[#1b3a5c]`} />
                      <span dir="ltr" className="font-en">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
              {!isChecked ? (
                <ActionButton38
                  className="mt-2"
                  disabled={!selected[item.n]}
                  onClick={() => {
                    const next = { ...checked, [item.n]: true };
                    setChecked(next);
                    if (Object.keys(next).length === EXERCISE27_ITEMS_38.length) onComplete?.();
                  }}
                >
                  تحقق
                </ActionButton38>
              ) : (
                <div className="mt-2">
                  <Feedback38 state={ok ? "ok" : "review"} title={ok ? "إجابة صحيحة." : `إجابة المصدر: ${item.answer} — ${item.answerText}`}>
                    حل المصدر: <span dir="ltr" className="font-en font-black">{item.answer} — {item.answerText}</span>
                  </Feedback38>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3d4a5c]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{EXERCISE27_ITEMS_38.length}</span>،
        ومطابق للمفتاح <span className="font-en tabular-nums">{score}</span>.
      </p>
    </section>
  );
}

export function Fill28Lab38({ onComplete }: { onComplete?: () => void }) {
  const [values, setValues] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = FILL28_ITEMS_38.filter((item) => checked[item.n]).length;
  return (
    <section data-lab="fill28" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">التدريب الثاني</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">أكمل باستخدام Future Perfect</h2>
      <div className="mt-3 space-y-3">
        {FILL28_ITEMS_38.map((item) => {
          const isChecked = !!checked[item.n];
          const typed = (values[item.n] ?? "").trim().toLowerCase().replace(/will not/g, "won't");
          const ok = typed === item.answer.toLowerCase();
          return (
            <fieldset key={item.n} data-practice-item={`fill28-${item.n}`} className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
              <legend className="sr-only">البند {item.n}</legend>
              <p dir="ltr" className="font-en text-left text-[#122033]">
                {item.prompt}
              </p>
              <input
                type="text"
                dir="ltr"
                lang="en"
                value={values[item.n] ?? ""}
                disabled={isChecked}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setValues((current) => ({ ...current, [item.n]: value }));
                }}
                className={`${FOCUS_38} mt-2 w-full rounded-xl border border-[#d4c4a0] bg-white px-3 py-2.5 text-base text-[#1a2433]`}
                aria-label={`إكمال البند ${item.n}`}
              />
              {!isChecked ? (
                <ActionButton38
                  className="mt-2"
                  disabled={!(values[item.n] ?? "").trim()}
                  onClick={() => {
                    const next = { ...checked, [item.n]: true };
                    setChecked(next);
                    if (Object.keys(next).length === FILL28_ITEMS_38.length) onComplete?.();
                  }}
                >
                  تحقق
                </ActionButton38>
              ) : (
                <div className="mt-2">
                  <Feedback38 state={ok ? "ok" : "review"} title={ok ? "مطابق لمفتاح المصدر." : "إجابة المصدر:"}>
                    <span dir="ltr" className="font-en font-black">{item.answer}</span>
                  </Feedback38>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3d4a5c]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{FILL28_ITEMS_38.length}</span>.
      </p>
    </section>
  );
}

export function Tense29Lab38({
  onComplete,
  range = [0, TENSE29_ITEMS_38.length],
}: {
  onComplete?: () => void;
  /** نطاق البنود: يسمح بعرض نصف المجموعة في كل خطوة على الشاشات الصغيرة. */
  range?: [number, number];
}) {
  const items = TENSE29_ITEMS_38.slice(range[0], range[1]);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = items.filter((item) => checked[item.n]).length;
  const score = items.filter((item) => checked[item.n] && selected[item.n] === item.answer).length;
  return (
    <section data-lab="tense29" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">اختيار الزمن المستقبلي</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">اختر الزمن المستقبلي المناسب</h2>
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = selected[item.n] === item.answer;
          return (
            <fieldset key={item.n} data-practice-item={`tense29-${item.n}`} className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
              <legend className="sr-only">الموقف {item.n}</legend>
              <EnglishLine38>{item.prompt}</EnglishLine38>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { value: "future-simple", label: "Future Simple" },
                  { value: "future-continuous", label: "Future Continuous" },
                  { value: "future-perfect", label: "Future Perfect" },
                ].map((choice) => (
                  <label key={choice.value} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${selected[item.n] === choice.value ? "border-[#1b3a5c] bg-[#e8eef5]" : "border-[#d4c4a0] bg-white"}`}>
                    <input type="radio" name={`tense29-${item.n}`} value={choice.value} checked={selected[item.n] === choice.value} disabled={isChecked} onChange={() => setSelected((current) => ({ ...current, [item.n]: choice.value }))} className={`${FOCUS_38} h-4 w-4 accent-[#1b3a5c]`} />
                    <span dir="ltr" className="font-en">
                      {choice.label}
                    </span>
                  </label>
                ))}
              </div>
              {!isChecked ? (
                <ActionButton38
                  className="mt-2"
                  disabled={!selected[item.n]}
                  onClick={() => {
                    const next = { ...checked, [item.n]: true };
                    setChecked(next);
                    if (Object.keys(next).length === TENSE29_ITEMS_38.length) onComplete?.();
                  }}
                >
                  تحقق
                </ActionButton38>
              ) : (
                <div className="mt-2">
                  <Feedback38 state={ok ? "ok" : "review"} title={ok ? "إجابة مطابقة لمفتاح المصدر." : `مفتاح المصدر: ${item.answerText}`}>
                    <span dir="ltr" className="font-en block font-black">
                      {item.answerText}
                    </span>
                    <Rich text={item.why} />
                  </Feedback38>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3d4a5c]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{TENSE29_ITEMS_38.length}</span>،
        ومطابق للمفتاح <span className="font-en tabular-nums">{score}</span>.
      </p>
      <PlatformNote38>
        <Rich text="لاحظ الفرق بين السؤالين ⑥ و⑦؛ إنه من أهم الفروق في الدرس. جملة when you arrive تصف نشاطًا جاريًا، أما الجملة التي تبدأ بـ by the time فتصف إنجازًا مكتملًا." />
      </PlatformNote38>
    </section>
  );
}

export function Detective30Lab38({
  onComplete,
  range = [0, DETECTIVE30_ITEMS_38.length],
}: {
  onComplete?: () => void;
  /** نطاق البنود المعروضة: يسمح بتقسيم الاختبار على خطوتين دون تكرار. */
  range?: [number, number];
}) {
  const items = DETECTIVE30_ITEMS_38.slice(range[0], range[1]);
  const [draft, setDraft] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = items.filter((item) => checked[item.n]).length;
  return (
    <section data-lab="detective30" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">مختبر اكتشاف الأخطاء</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">
        <Rich text="Grammar Detective — اكتب التصحيح" />
      </h2>
      <PlatformNote38>
        كل جملة فيها خطأ واحد على الأقل. اكتب تصحيحك ثم اعرض تصحيح المصدر مع سبب الخطأ. لا يُطلب منك مطابقة الصياغة حرفيًا.
      </PlatformNote38>
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.n];
          return (
            <section key={item.n} data-practice-item={`detective30-${item.n}`} className="rounded-2xl border border-[#d4c4a0] bg-white p-3">
              <p dir="ltr" className="font-en text-left text-[#a41c36]">
                {`${item.n}. ${item.prompt}`}
              </p>
              <label className="mt-2 block">
                <span className="mb-1 block text-sm font-bold text-[#3d4a5c]">تصحيحك</span>
                <input
                  type="text"
                  dir="auto"
                  value={draft[item.n] ?? ""}
                  disabled={isChecked}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setDraft((current) => ({ ...current, [item.n]: value }));
                  }}
                  className={`${FOCUS_38} w-full rounded-xl border border-[#d4c4a0] bg-white px-3 py-2.5 text-base text-[#1a2433]`}
                  aria-label={`تصحيح الجملة ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton38
                  className="mt-2"
                  disabled={!(draft[item.n] ?? "").trim()}
                  onClick={() => {
                    const next = { ...checked, [item.n]: true };
                    setChecked(next);
                    if (Object.keys(next).length === DETECTIVE30_ITEMS_38.length) onComplete?.();
                  }}
                >
                  اعرض تصحيح المصدر
                </ActionButton38>
              ) : (
                <div className="mt-2">
                  <Feedback38 state="info" title="تصحيح المصدر وسبب الخطأ">
                    <span dir="ltr" className="font-en block font-black text-[#1c6b3c]">
                      {item.answer}
                    </span>
                    <Rich text={item.why} />
                  </Feedback38>
                </div>
              )}
            </section>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#3d4a5c]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{DETECTIVE30_ITEMS_38.length}</span>.
      </p>
    </section>
  );
}

export function ReadingLab38({
  onComplete,
  highlight,
  onToggleHighlight,
  showHighlight = true,
}: {
  onComplete?: () => void;
  highlight: boolean;
  onToggleHighlight: () => void;
  showHighlight?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const answered = READING32_QUESTIONS_38.filter((_, index) => (answers[index] ?? "").trim().length > 0).length;
  const canReveal = answered === READING32_QUESTIONS_38.length;
  return (
    <section data-lab="reading32" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">أسئلة الفهم</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">أجب عن أسئلة الفهم السبعة</h2>
      {showHighlight ? (
        <>
          <label className="mt-3 inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#d4c4a0] bg-white px-3 py-2 text-sm font-bold text-[#1a2433]">
            <input type="checkbox" checked={highlight} onChange={onToggleHighlight} className={`${FOCUS_38} h-4 w-4 accent-[#1b3a5c]`} />
            <span>تمييز صيغ المستقبل في النص أعلاه (بصري فقط — لا يخفي النص)</span>
          </label>
          {highlight ? (
            <p className="mt-2 text-xs font-bold text-[#4a5568]" role="status">
              التمييز مُطبَّق على نص المصدر في البطاقة أعلاه.
            </p>
          ) : null}
        </>
      ) : null}
      <div className="mt-3 space-y-2">
        {READING32_QUESTIONS_38.map((question, index) => (
          <label key={question} className="block rounded-2xl border border-[#d4c4a0] bg-white p-3">
            <span dir="ltr" className="font-en mb-1 block text-left font-bold text-[#122033]">
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
              className={`${FOCUS_38} w-full resize-y rounded-lg border border-[#d4c4a0] bg-white p-2.5 text-left text-base leading-7 text-[#1a2433]`}
              aria-label={`إجابة السؤال ${index + 1}`}
            />
          </label>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!revealed ? (
          <ActionButton38
            disabled={!canReveal}
            onClick={() => {
              setRevealed(true);
              onComplete?.();
            }}
          >
            اعرض إجابات المصدر
          </ActionButton38>
        ) : (
          <p role="status" className="rounded-xl border border-[#b8ddc5] bg-[#f0faf2] px-3 py-2 text-sm font-black text-[#1c6b3c]">
            ظهرت إجابات المصدر السبعة أسفل بطاقة القسم، مع تحليل الصيغ.
          </p>
        )}
        <p aria-live="polite" className="text-sm font-bold text-[#3d4a5c]">
          كتبت <span className="font-en tabular-nums">{answered}</span> من <span className="font-en tabular-nums">{READING32_QUESTIONS_38.length}</span> إجابة.
        </p>
      </div>
      {revealed ? (
        <div className="mt-3 space-y-2">
          <h3 className="text-sm font-black text-[#122033]">تحليل صيغ المستقبل في النص — إضافة من المنصة</h3>
          {READING32_ANALYSIS_38.map((entry) => (
            <div key={entry.line} className="rounded-xl border border-[#d4c4a0] bg-[#f7f2e4] p-3 text-sm leading-6 text-[#1a2433]">
              <p dir="ltr" className="font-en text-left text-[#122033]">
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

export function WritingLab38() {
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [modelOpen, setModelOpen] = useState(false);
  const sentenceCount = useMemo(
    () => (draft.trim() ? draft.split(/[.!?]+/).filter((part) => part.trim().length > 0).length : 0),
    [draft],
  );
  const marked = WRITING35_CRITERIA_38.filter((_, index) => checked[index]).length;
  const hasEnough = sentenceCount >= 12;
  return (
    <section data-lab="writing35" className="rounded-3xl border border-[#d4c4a0] bg-[#fffdf6] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4a5568]">مهمة الكتابة</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#1a2433]">
        <Rich text="My Achievements by the End of Next Year — فقرة من 12 إلى 15 جملة" />
      </h2>
      <PlatformNote38>
        اكتب فقرتك بالإنجليزية، ثم راجع بنود المصدر الثمانية بنفسك. لا يصدر النظام حكمًا آليًا على جودة الفقرة أو صحة تراكيبها؛ والعداد مساعد فقط.
      </PlatformNote38>
      <label className="mt-3 block">
        <span className="mb-1 block font-bold text-[#1a2433]">مسودتك باللغة الإنجليزية</span>
        <textarea
          rows={12}
          dir="ltr"
          lang="en"
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          placeholder="Write your paragraph here…"
          className={`${FOCUS_38} w-full resize-y rounded-2xl border border-[#d4c4a0] bg-white p-4 text-left text-base leading-7 text-[#122033]`}
        />
      </label>
      <p aria-live="polite" className="mt-2 rounded-xl bg-[#f7f2e4] px-3 py-2 text-sm font-bold text-[#3d4a5c]">
        عدد الجمل التقريبي: <span dir="ltr" className="font-en tabular-nums">{sentenceCount}</span> / المطلوب 12–15
      </p>
      <fieldset className="mt-3 rounded-2xl border border-[#d4c4a0] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#122033]">قائمة مراجعة ذاتية — الشروط الثمانية الأصلية</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {WRITING35_CRITERIA_38.map((criterion, index) => (
            <label key={criterion} className="flex items-start gap-2 rounded-xl border border-[#f2ded8] bg-[#fffdf6] p-3 text-sm leading-6 text-[#1a2433]">
              <input
                type="checkbox"
                checked={!!checked[index]}
                onChange={(event) => {
                  const value = event.currentTarget.checked;
                  setChecked((current) => ({ ...current, [index]: value }));
                }}
                className={`${FOCUS_38} mt-1 h-4 w-4 shrink-0 accent-[#1b3a5c]`}
              />
              <span>
                <Rich text={criterion} />
              </span>
            </label>
          ))}
        </div>
        <p aria-live="polite" className="mt-2 text-xs font-bold text-[#4a5568]">
          علّمت <span className="font-en tabular-nums">{marked}</span> من 8 — راجع كل بند بنفسك.
        </p>
      </fieldset>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!modelOpen ? (
          <ActionButton38 variant="secondary" disabled={!hasEnough} onClick={() => setModelOpen(true)}>
            اعرض نموذج المصدر بعد الكتابة
          </ActionButton38>
        ) : (
          <ActionButton38 variant="ghost" onClick={() => setModelOpen(false)}>
            إخفاء النموذج
          </ActionButton38>
        )}
        {!hasEnough ? <p className="text-sm font-bold text-[#4a5568]">اكتب 12 جملة على الأقل لإظهار النموذج.</p> : null}
      </div>
      {modelOpen ? (
        <div className="mt-3 space-y-2 rounded-2xl border border-[#b8ddc5] bg-[#f0faf2] p-3">
          <p className="text-sm font-black text-[#1c6b3c]">نموذج المصدر الإرشادي — لا تنسخه، اكتب فقرتك بأفكارك:</p>
          {WRITING35_MODEL_38.map((line) => (
            <EnglishLine38 key={line}>{line}</EnglishLine38>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function FirstUseLab38() {
  return <ChoiceLab38 id="first-use" eyebrow="الاستخدام الأول" title="إنجاز مكتمل بحلول وقت مستقبلي" items={FIRST_USE_ITEMS_38} />;
}
export function ByMeaningLab38() {
  return <ChoiceLab38 id="by-meaning" eyebrow="كلمة by" title="ماذا تعني by هنا؟" items={BY_MEANING_ITEMS_38} />;
}
export function AtByLab38() {
  return (
    <ChoiceLab38
      id="at-by"
      eyebrow="AT vs BY"
      title="مختبر المعنى"
      items={AT_BY_ITEMS_38}
      note={<PlatformNote38>هذه مقارنة تعليمية شائعة، والمعنى هو الأساس دائمًا.</PlatformNote38>}
    />
  );
}
export function TimeExpressionLab38() {
  return <ChoiceLab38 id="time-expression" eyebrow="تعبيرات زمنية" title="تعبيرات شائعة مع Future Perfect" items={TIME_EXPRESSION_ITEMS_38} />;
}
export function TwoEventsLab38() {
  return <ChoiceLab38 id="two-events" eyebrow="حدثان" title="إنجاز قبل حدث مستقبلي آخر" items={TWO_EVENTS_ITEMS_38} />;
}
export function ByTheTimeLab38() {
  return <ChoiceLab38 id="by-the-time" eyebrow="by the time" title="Present Simple بعد by the time" items={BY_THE_TIME_ITEMS_38} />;
}
export function ByBeforeLab38() {
  return <ChoiceLab38 id="by-before" eyebrow="by وbefore" title="الفرق بين الموعدين" items={BY_BEFORE_ITEMS_38} />;
}
export function NegationMeaningLab38() {
  return <ChoiceLab38 id="negation-meaning" eyebrow="معنى النفي" title="النفي مرتبط بالنقطة المستقبلية" items={NEGATION_MEANING_ITEMS_38} />;
}
export function ShortAnswerLab38() {
  return <ChoiceLab38 id="short-answers" eyebrow="الإجابات القصيرة" title="الإجابات القصيرة" items={SHORT_ANSWER_ITEMS_38} />;
}
export function FsVsFpLab38() {
  return <ChoiceLab38 id="fs-vs-fp" eyebrow="Future Simple vs Future Perfect" title="اختر بحسب التركيز" items={FS_VS_FP_ITEMS_38} />;
}
export function FcVsFpLab38() {
  return <ChoiceLab38 id="fc-vs-fp" eyebrow="Future Continuous vs Future Perfect" title="جاري أم مكتمل؟" items={FC_VS_FP_ITEMS_38} />;
}
export function ThreeFuturesLab38() {
  return <ChoiceLab38 id="three-futures" eyebrow="الأزمنة الثلاثة" title="الفعل write من ثلاث زوايا" items={THREE_FUTURE_ITEMS_38} />;
}
export function SameEventLab38() {
  return <ChoiceLab38 id="same-event" eyebrow="مختبر الزمن" title="الحدث نفسه بثلاث زوايا" items={SAME_EVENT_ITEMS_38} />;
}
export function PerfectMapLab38() {
  return <ChoiceLab38 id="perfect-map" eyebrow="الأزمنة التامة" title="حدّد النقطة المرجعية" items={PERFECT_MAP_ITEMS_38} />;
}
export function ErrorLab38() {
  return <ChoiceLab38 id="errors" eyebrow="أخطاء شائعة" title="شخّص الخطأ في كل صيغة" items={ERROR_ITEMS_38} />;
}
export function Iq31Lab38() {
  return <ChoiceLab38 id="iq31" eyebrow="IQ200" title="هل الزمنان صحيحان؟" items={IQ31_ITEMS_38} />;
}
export function V3PairsLab38() {
  return (
    <ChoiceLab38
      id="v3-pairs"
      eyebrow="أزواج التصريف"
      title="ثلاثة أفعال شاذة: أي صيغة تسمعها في الجملة الصحيحة؟"
      items={V3_PAIRS_38}
      note={<Rich text="الخطأ الشائع هو استخدام V2 بعد have: wrote وwent. الفعل الصحيح دائمًا V3." />}
    />
  );
}

export function WritingModelLab38() {
  return (
    <ChoiceLab38
      id="writing-model"
      eyebrow="النموذج الإرشادي"
      title="افحص النموذج: هل تجد فيه الشروط الثمانية؟"
      items={WRITING_MODEL_CHECK_38}
      note={<Rich text="لا تنسخ النموذج؛ استخدمه كدليل على توزيع الأزمنة داخل فقرة واحدة." />}
    />
  );
}

export function SummaryMatchLab38() {
  return <ChoiceLab38 id="summary-match" eyebrow="الملخص الذهبي" title="صِل كل استخدام بمثاله من المصدر" items={SUMMARY_MATCH_38} />;
}

export function CoverBridge38() {
  return (
    <DeadlineFrame38 title="مرصد الإنجاز المستقبلي · الدرس 38" caption="ننظر إلى نقطة مستقبلية ونرى حدثًا سيكون قد اكتمل بحلولها.">
      <h1 className="text-xl font-black leading-snug text-[#122033] sm:text-2xl">
        <Rich text="الدرس 38: Future Perfect — المستقبل التام" />
      </h1>
      <p dir="ltr" className="font-en mt-1 text-left text-lg font-black text-[#122033]">
        By Tomorrow, I Will Have Finished!
      </p>
      <p className="mt-1 text-sm font-bold text-[#3d4a5c]">إتقان التعبير عن الإنجاز قبل نقطة مستقبلية — IQ200 🚀</p>
    </DeadlineFrame38>
  );
}
