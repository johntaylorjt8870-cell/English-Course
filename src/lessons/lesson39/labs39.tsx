import { useMemo, useState, type ReactNode } from "react";
import { Rich } from "../../shared/lessonKit";
import { EnAr } from "../../shared/bidi";
import { ActionButton39, DurationFrame39, Feedback39, FOCUS_39, PlatformNote39 } from "./kit39";
import {
  BY_ITEMS_39,
  BY_THE_TIME_ITEMS_39,
  CONTINUATION_ITEMS_39,
  CURRICULUM_MAP_39,
  DETECTIVE32_ITEMS_39,
  DIALOGUE2_CHECK_39,
  DIALOGUE2_LINES_39,
  DIALOGUE_CHECK_39,
  DIALOGUE_LINES_39,
  DURATION_CASES_39,
  ERROR_ITEMS_39,
  EXERCISE29_ITEMS_39,
  FILL30_ITEMS_39,
  FINISHED_ITEMS_39,
  FIRST_USE_ITEMS_39,
  FOR_ITEMS_39,
  FOR_SINCE_QUESTIONS_39,
  FOR_SINCE_SORT_39,
  FP_VS_FPC_ITEMS_39,
  HOWLONG_BUILD_39,
  IQ33_ITEMS_39,
  NEGATION_MEANING_ITEMS_39,
  NEGATIVE_BUILD_39,
  NEXT_LESSON_39,
  PAIRED_EXAMPLES_39,
  PERFECT_CONTINUOUS_ITEMS_39,
  READING34_ANALYSIS_39,
  READING34_CHECK_39,
  READING34_JOURNEY_39,
  READING34_QUESTIONS_39,
  SHORT_ANSWER_ITEMS_39,
  SINCE_ITEMS_39,
  STATIVE_ITEMS_39,
  STATIVE_VERBS_39,
  SUMMARY_MATCH_39,
  SUMMARY_USES_39,
  TENSE31_ITEMS_39,
  TIME_CLAUSE_ITEMS_39,
  TIMELINE_ELEMENTS_39,
  TIMELINE_MOMENTS_39,
  WH_ITEMS_39,
  WRITING37_CRITERIA_39,
  WRITING37_MODEL_39,
  WRITING37_MODEL_FORMS_39,
  YESNO_BUILD_39,
  type ChoiceItem39,
} from "./practiceData39";

function EnglishLine39({ children }: { children: ReactNode }) {
  return (
    <p dir="ltr" className="font-en rounded-xl border border-[#dce6e4] bg-[#fbfdfc] px-3 py-2 text-left text-[#18333b]">
      {children}
    </p>
  );
}

function ChoiceList39({
  groupName,
  item,
  value,
  disabled,
  onSelect,
}: {
  groupName: string;
  item: ChoiceItem39;
  value?: string;
  disabled: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <div className={`mt-2 grid gap-2 ${item.choices.length > 2 ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
      {item.choices.map((choice) => (
        <label
          key={choice.value}
          className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm font-bold leading-6 text-[#24343b] ${
            value === choice.value ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white hover:bg-[#f7f8f5]"
          }`}
        >
          <input
            type="radio"
            name={`${groupName}-${item.id}`}
            value={choice.value}
            checked={value === choice.value}
            disabled={disabled}
            onChange={(event) => onSelect(event.currentTarget.value)}
            className={`${FOCUS_39} mt-1 h-4 w-4 accent-[#245f62]`}
          />
          <span className="min-w-0" dir="auto">
            <Rich text={choice.label} />
          </span>
        </label>
      ))}
    </div>
  );
}

export function ChoiceLab39({
  id,
  items,
  eyebrow,
  title,
  note,
  onComplete,
  footnote,
}: {
  id: string;
  items: readonly ChoiceItem39[];
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

  const check = (item: ChoiceItem39) => {
    const next = { ...checked, [item.id]: true };
    setChecked(next);
    if (Object.keys(next).length === items.length) onComplete?.();
  };

  return (
    <section data-lab={id} className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">
        <Rich text={eyebrow} />
      </p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">{title}</h2>
      {note ? <div className="mt-3">{note}</div> : null}
      <div className="mt-3 space-y-3">
        {items.map((item, index) => {
          const isChecked = !!checked[item.id];
          const accepted = item.accepted.includes(selected[item.id] ?? "");
          return (
            <fieldset key={item.id} data-lab-item={`${id}-${item.id}`} className="rounded-2xl border border-[#d8d2c5] bg-white p-3 sm:p-4">
              <legend className="sr-only">النشاط {index + 1}</legend>
              <p className="font-bold leading-7 text-[#24343b]">
                <Rich text={item.prompt} />
              </p>
              {item.lines?.length ? (
                <div className="mt-2 space-y-1">
                  {item.lines.map((line) => (
                    <EnglishLine39 key={line}>{line}</EnglishLine39>
                  ))}
                </div>
              ) : null}
              <ChoiceList39
                groupName={id}
                item={item}
                value={selected[item.id]}
                disabled={isChecked}
                onSelect={(value) => setSelected((current) => ({ ...current, [item.id]: value }))}
              />
              {!isChecked ? (
                <ActionButton39 className="mt-3" disabled={!selected[item.id]} onClick={() => check(item)}>
                  تحقق من اختياري
                </ActionButton39>
              ) : (
                <div className="mt-3">
                  <Feedback39
                    state={accepted ? "ok" : "review"}
                    title={accepted ? "اختيار مناسب." : "راجع المعنى: الاختيار الآخر هو الأنسب في هذا المثال."}
                  >
                    <Rich text={item.feedback} />
                    {item.nuance ? (
                      <p className="mt-1">
                        <Rich text={item.nuance} />
                      </p>
                    ) : null}
                    {item.origin === "platform" ? (
                      <p className="mt-1 text-xs font-black text-[#53676a]">
                        <Rich text="هذا البند إضافة تعليمية من المنصة حول نص المصدر." />
                      </p>
                    ) : null}
                  </Feedback39>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#43575a]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من <span className="font-en tabular-nums">{items.length}</span>.
      </p>
      {complete ? <p className="text-sm font-black text-[#28533b]">اكتملت المحاولة في هذا المختبر.</p> : null}
      {footnote ? <div className="mt-3">{footnote}</div> : null}
    </section>
  );
}

export function ObjectivesChecklist39({ objectives }: { objectives: readonly string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = objectives.filter((_, index) => checked[index]).length;
  return (
    <div className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
      <p className="text-sm font-black text-[#17354a]">علّم الأهداف التي تراها واضحة الآن (مراجعة ذاتية):</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {objectives.map((objective, index) => (
          <label key={objective} className="flex items-start gap-2 rounded-xl border border-[#e0e3dc] bg-[#fdfcf8] p-2.5 text-sm leading-6 text-[#24343b]">
            <input
              type="checkbox"
              checked={!!checked[index]}
              onChange={(event) => {
                const value = event.currentTarget.checked;
                setChecked((current) => ({ ...current, [index]: value }));
              }}
              className={`${FOCUS_39} mt-1 h-4 w-4 shrink-0 accent-[#245f62]`}
            />
            <span>
              <Rich text={objective} />
            </span>
          </label>
        ))}
      </div>
      <p aria-live="polite" className="mt-2 text-xs font-bold text-[#53676a]">
        علّمت <span className="font-en tabular-nums">{done}</span> من <span className="font-en tabular-nums">{objectives.length}</span> هدفًا.
      </p>
    </div>
  );
}

/** §2 — الخط الزمني للمدة: ست نقاط، وقراءة مدة لكل نقطة، وسؤال نقطة المرجع. */
export function DurationTimelineLab39() {
  const [momentId, setMomentId] = useState<string>("");
  const [answered, setAnswered] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const moment = TIMELINE_MOMENTS_39.find((candidate) => candidate.id === momentId);
  const correct = answered === "ref-8";

  return (
    <section data-lab="timeline" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§2 · duration timeline</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="قِس مدة دراسة سامر على الخط الزمني" />
      </h2>
      <PlatformNote39>
        <Rich text="مشهد المصدر: البداية 4:00، ونقطة المرجع المستقبلية 8:00. انقر أي نقطة لترى المدة المتراكمة عندها، ثم أجب عن السؤال." />
      </PlatformNote39>
      <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {TIMELINE_MOMENTS_39.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            data-timeline-moment={candidate.id}
            aria-pressed={momentId === candidate.id}
            onClick={() => setMomentId(candidate.id)}
            className={`${FOCUS_39} min-h-14 rounded-2xl border px-3 py-2 text-right transition-colors motion-reduce:transition-none ${
              momentId === candidate.id ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white hover:bg-[#f7f8f5]"
            }`}
          >
            <span dir="ltr" className="font-en block text-base font-black tabular-nums text-[#17354a]">
              {candidate.clock}
            </span>
            <span className="mt-0.5 block text-sm font-bold leading-5 text-[#24343b]">{candidate.label}</span>
          </button>
        ))}
      </div>
      {moment ? (
        <div data-timeline-readout={moment.id} className="mt-3 rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3">
          <p dir="ltr" className="font-en text-left text-base font-black text-[#18333b]">
            {moment.durationText}
          </p>
          <p dir="ltr" className="font-en mt-1 text-left text-[#18333b]">
            {moment.sentence}
          </p>
          <p className="mt-1 text-sm leading-6 text-[#28533b]">
            <Rich text={moment.arabic} />
          </p>
        </div>
      ) : (
        <p className="mt-3 rounded-2xl border border-dashed border-[#c9d6d0] bg-[#f7faf8] p-3 text-sm font-bold text-[#53676a]">
          اختر نقطة على الخط الزمني لعرض المدة المتراكمة عندها.
        </p>
      )}
      <ul className="mt-3 space-y-1 rounded-2xl border border-[#d8d2c5] bg-white p-3 text-sm leading-6 text-[#24343b]">
        {TIMELINE_ELEMENTS_39.map((element) => (
          <li key={element}>
            <Rich text={element} />
          </li>
        ))}
      </ul>
      <fieldset className="mt-3 rounded-2xl border border-[#d8d2c5] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#17354a]">
          <Rich text="عند أي نقطة نقيس مدة النشاط في مثال المصدر؟" />
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {TIMELINE_MOMENTS_39.map((candidate) => (
            <label
              key={`answer-${candidate.id}`}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${
                answered === candidate.id ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white"
              }`}
            >
              <input
                type="radio"
                name="timeline-answer"
                value={candidate.id}
                checked={answered === candidate.id}
                disabled={checked}
                onChange={() => setAnswered(candidate.id)}
                className={`${FOCUS_39} h-4 w-4 accent-[#245f62]`}
              />
              <span dir="ltr" className="font-en tabular-nums">
                {candidate.clock}
              </span>
            </label>
          ))}
        </div>
        {!checked ? (
          <ActionButton39 className="mt-3" disabled={!answered} onClick={() => setChecked(true)}>
            تحقق من إجابتي
          </ActionButton39>
        ) : (
          <div className="mt-3">
            <Feedback39 state={correct ? "ok" : "review"} title={correct ? "إجابة صحيحة." : "راجع الخط الزمني: نقيس المدة عند النقطة الأخيرة."}>
              <Rich text="نقطة المرجع المستقبلية هي 8:00؛ وعندها تبلغ مدة الدراسة أربع ساعات: 4:00 → 8:00 = 4 ساعات." />
            </Feedback39>
          </div>
        )}
      </fieldset>
    </section>
  );
}

/** §3 — بانِي الصيغة الأساسية. */
export function FormulaOrderLab39() {
  const pieces = [
    { id: "subject", label: "Subject", arabic: "الفاعل" },
    { id: "will", label: "will", arabic: "فعل مساعد للمستقبل" },
    { id: "have", label: "have", arabic: "جزء ثابت من التركيب" },
    { id: "been", label: "been", arabic: "التصريف الثالث من be" },
    { id: "ving", label: "V-ing", arabic: "الفعل مع ing" },
  ];
  const correctOrder = pieces.map((piece) => piece.id);
  const [placed, setPlaced] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const remaining = pieces.filter((piece) => !placed.includes(piece.id));
  const ordered = placed.join("|") === correctOrder.join("|");

  return (
    <section data-lab="formula" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§3 · formula builder</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="رتّب عناصر الصيغة الأساسية" />
      </h2>
      <div dir="ltr" className="mt-3 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-[#c9d6d0] bg-white p-3">
        {placed.length === 0 ? (
          <span className="font-en text-sm font-bold text-[#53676a]">Subject + will + have + been + V-ing</span>
        ) : (
          placed.map((id, index) => {
            const piece = pieces.find((candidate) => candidate.id === id);
            return (
              <span key={id} className="font-en inline-flex items-center gap-2 rounded-xl border border-[#b9cfc6] bg-[#fbfdfc] px-3 py-2 text-base font-black text-[#18333b]">
                {piece?.label}
                <button
                  type="button"
                  data-formula-remove={id}
                  onClick={() => setPlaced((current) => current.filter((_, position) => position !== index))}
                  className={`${FOCUS_39} rounded-full border border-[#d8d2c5] bg-white px-2 text-xs font-black text-[#53676a]`}
                  aria-label={`إزالة ${piece?.label}`}
                >
                  ×
                </button>
              </span>
            );
          })
        )}
      </div>
      <div dir="ltr" className="mt-3 flex flex-wrap gap-2">
        {remaining.map((piece) => (
          <button
            key={piece.id}
            type="button"
            data-formula-piece={piece.id}
            disabled={checked}
            onClick={() => setPlaced((current) => [...current, piece.id])}
            className={`${FOCUS_39} min-h-11 rounded-xl border border-[#cfd8d2] bg-white px-3 py-2 text-sm font-black text-[#17354a] transition-colors hover:bg-[#eef4f0] motion-reduce:transition-none disabled:cursor-not-allowed disabled:bg-[#f5f5f2] disabled:text-[#596965]`}
          >
            <span dir="ltr" className="font-en">
              {piece.label}
            </span>
            <span className="mt-0.5 block text-xs font-bold text-[#43575a]">{piece.arabic}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {!checked ? (
          <>
            <ActionButton39 disabled={placed.length !== pieces.length} onClick={() => setChecked(true)}>
              تحقق من الترتيب
            </ActionButton39>
            <ActionButton39 variant="ghost" disabled={placed.length === 0} onClick={() => setPlaced([])}>
              إعادة الترتيب
            </ActionButton39>
          </>
        ) : (
          <ActionButton39
            variant="ghost"
            onClick={() => {
              setPlaced([]);
              setChecked(false);
            }}
          >
            حاول مرة أخرى
          </ActionButton39>
        )}
      </div>
      {checked ? (
        <div className="mt-3">
          <Feedback39 state={ordered ? "ok" : "review"} title={ordered ? "ترتيب صحيح." : "الترتيب يحتاج مراجعة."}>
            <span dir="ltr" className="font-en block font-black">
              Subject + will + have + been + V-ing
            </span>
            <Rich text="have تبقى كما هي بعد will مع جميع الضمائر، وbeen لا تتحول إلى being." />
          </Feedback39>
        </div>
      ) : null}
    </section>
  );
}

/** §4 — تشريح الجملة إلى أدوارها السبعة + فحص have/has. */
export function PartsLab39() {
  const parts = [
    { id: "she", text: "She", role: "الفاعل" },
    { id: "will", text: "will", role: "فعل مساعد للمستقبل" },
    { id: "have", text: "have", role: "جزء ثابت من التركيب" },
    { id: "been", text: "been", role: "التصريف الثالث من be" },
    { id: "studying", text: "studying", role: "الفعل study مع ing" },
    { id: "for", text: "for three hours", role: "مدة النشاط" },
    { id: "by", text: "by 9:00", role: "النقطة المستقبلية التي نقيس عندها المدة" },
  ];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const openedCount = parts.filter((part) => open[part.id]).length;

  return (
    <section data-lab="parts" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§4 · structural analysis</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="اضغط كل جزء لترى دوره في التركيب" />
      </h2>
      <EnglishLine39>She will have been studying for three hours by 9:00.</EnglishLine39>
      <div dir="ltr" className="mt-3 flex flex-wrap gap-2">
        {parts.map((part) => (
          <button
            key={part.id}
            type="button"
            data-part={part.id}
            aria-expanded={!!open[part.id]}
            onClick={() => setOpen((current) => ({ ...current, [part.id]: !current[part.id] }))}
            className={`${FOCUS_39} min-h-12 rounded-2xl border-2 px-3 py-2 text-left transition-colors motion-reduce:transition-none ${
              open[part.id] ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white hover:bg-[#f7f8f5]"
            }`}
          >
            <span dir="ltr" className="font-en block text-base font-black text-[#17354a]">
              {part.text}
            </span>
            {open[part.id] ? (
              <span dir="rtl" className="mt-1 block text-xs font-bold leading-5 text-[#28533b]">
                {part.role}
              </span>
            ) : (
              <span className="mt-1 block text-xs font-bold text-[#53676a]">اضغط لعرض الدور</span>
            )}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-2 text-sm font-bold text-[#43575a]">
        فتحت <span className="font-en tabular-nums">{openedCount}</span> من <span className="font-en tabular-nums">{parts.length}</span> أدوار.
      </p>
      <fieldset className="mt-3 rounded-2xl border border-[#d8d2c5] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#17354a]">
          <Rich text="انتبه — أي الجملتين صحيحة؟" />
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            { value: "has", label: "She will has been studying." },
            { value: "have", label: "She will have been studying." },
          ].map((choice) => (
            <label
              key={choice.value}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${
                answer === choice.value ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white"
              }`}
            >
              <input
                type="radio"
                name="parts-have-has"
                value={choice.value}
                checked={answer === choice.value}
                disabled={checked}
                onChange={() => setAnswer(choice.value)}
                className={`${FOCUS_39} h-4 w-4 accent-[#245f62]`}
              />
              <span dir="ltr" className="font-en text-left">
                {choice.label}
              </span>
            </label>
          ))}
        </div>
        {!checked ? (
          <ActionButton39 className="mt-3" disabled={!answer} onClick={() => setChecked(true)}>
            تحقق من اختياري
          </ActionButton39>
        ) : (
          <div className="mt-3">
            <Feedback39 state={answer === "have" ? "ok" : "review"} title={answer === "have" ? "اختيار مناسب." : "راجع القاعدة."}>
              <Rich text="لأن will يتبعها الفعل الأساسي have، وليس has — وهذه القاعدة ثابتة مع He وShe وIt أيضًا." />
            </Feedback39>
          </div>
        )}
      </fieldset>
    </section>
  );
}

/** §5 — لوحة التصريف مع الضمائر السبعة. */
export function ConjugationLab39() {
  const rows = [
    { pronoun: "I", sentence: "I will have been studying." },
    { pronoun: "You", sentence: "You will have been studying." },
    { pronoun: "He", sentence: "He will have been studying." },
    { pronoun: "She", sentence: "She will have been studying." },
    { pronoun: "It", sentence: "It will have been working." },
    { pronoun: "We", sentence: "We will have been studying." },
    { pronoun: "They", sentence: "They will have been studying." },
  ];
  const [active, setActive] = useState("He");
  const current = rows.find((row) => row.pronoun === active) ?? rows[0];
  return (
    <section data-lab="conjugation" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§5 · conjugation console</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="اختر ضميرًا لترى أن الصيغة لا تتغير" />
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {rows.map((row) => (
          <button
            key={row.pronoun}
            type="button"
            data-pronoun={row.pronoun}
            aria-pressed={active === row.pronoun}
            onClick={() => setActive(row.pronoun)}
            className={`${FOCUS_39} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              active === row.pronoun ? "border-[#245f62] bg-[#245f62] text-white" : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#eef4f0]"
            }`}
          >
            <span dir="ltr" className="font-en">
              {row.pronoun}
            </span>
          </button>
        ))}
      </div>
      <div data-conjugation-readout={current.pronoun} className="mt-3 rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3">
        <p dir="ltr" className="font-en text-left text-lg font-black text-[#18333b]">
          {current.sentence}
        </p>
        <p className="mt-1 text-sm leading-6 text-[#28533b]">
          <Rich text="الصيغة ثابتة مع جميع الضمائر: will have been + V-ing — لا has مع He/She/It، ولا being بدل been." />
        </p>
      </div>
    </section>
  );
}

/** §10 — لوحة فرز for / since. */
export function ForSinceSortLab39({ onComplete }: { onComplete?: () => void }) {
  const [assigned, setAssigned] = useState<Record<string, "for" | "since">>({});
  const [checked, setChecked] = useState(false);
  const allAssigned = FOR_SINCE_SORT_39.every((item) => assigned[item.id]);
  const correctCount = FOR_SINCE_SORT_39.filter((item) => assigned[item.id] === item.kind).length;
  const allCorrect = correctCount === FOR_SINCE_SORT_39.length;

  return (
    <section data-lab="for-since-sort" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§10 · sorting board</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="افرز التعبيرات الثمانية بين FOR (مدة) وSINCE (نقطة بداية)" />
      </h2>
      <div className="mt-3 space-y-2">
        {FOR_SINCE_SORT_39.map((item) => {
          const isRight = assigned[item.id] === item.kind;
          return (
            <div
              key={item.id}
              data-sort-item={item.id}
              className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl border p-3 ${
                checked ? (isRight ? "border-[#b8d6c0] bg-[#edf5ee]" : "border-[#e3d6b6] bg-[#fbf6eb]") : "border-[#d8d2c5] bg-white"
              }`}
            >
              <span className="min-w-0">
                <span dir="ltr" className="font-en block text-base font-black text-[#18333b]">
                  {item.text}
                </span>
                <span className="mt-0.5 block text-xs font-bold text-[#43575a]">{item.arabic}</span>
              </span>
              <span className="flex gap-2">
                {(["for", "since"] as const).map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    data-sort-value={kind}
                    aria-pressed={assigned[item.id] === kind}
                    disabled={checked}
                    onClick={() => setAssigned((current) => ({ ...current, [item.id]: kind }))}
                    className={`${FOCUS_39} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none disabled:cursor-not-allowed ${
                      assigned[item.id] === kind
                        ? "border-[#245f62] bg-[#245f62] text-white"
                        : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#eef4f0] disabled:bg-[#f5f5f2] disabled:text-[#596965]"
                    }`}
                  >
                    <span dir="ltr" className="font-en uppercase">
                      {kind}
                    </span>
                  </button>
                ))}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!checked ? (
          <ActionButton39
            disabled={!allAssigned}
            onClick={() => {
              setChecked(true);
              if (allAssigned) onComplete?.();
            }}
          >
            تحقق من الفرز
          </ActionButton39>
        ) : (
          <ActionButton39
            variant="ghost"
            onClick={() => {
              setChecked(false);
              setAssigned({});
            }}
          >
            إعادة الفرز
          </ActionButton39>
        )}
        <p aria-live="polite" className="text-sm font-bold text-[#43575a]">
          فرزت <span className="font-en tabular-nums">{Object.keys(assigned).length}</span> من{" "}
          <span className="font-en tabular-nums">{FOR_SINCE_SORT_39.length}</span>.
        </p>
      </div>
      {checked ? (
        <div className="mt-3">
          <Feedback39 state={allCorrect ? "ok" : "review"} title={allCorrect ? "الفرز صحيح بالكامل." : `أصبت في ${correctCount} من ${FOR_SINCE_SORT_39.length}.`}>
            <Rich text="for + مدة زمنية تجيب عن How long?، وsince + نقطة بداية تجيب عن Since when?" />
          </Feedback39>
        </div>
      ) : null}
    </section>
  );
}

/** §11 — مختبر حساب المدة: اختيار البداية ونقطة المرجع ثم حساب الفرق. */
export function DurationCalcLab39() {
  const [start, setStart] = useState<Record<string, number>>({});
  const [reference, setReference] = useState<Record<string, number>>({});
  const [computed, setComputed] = useState<Record<string, boolean>>({});

  return (
    <section data-lab="duration-calc" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§11 · duration calculation lab</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="اختر نقطة البداية ونقطة المرجع، ثم احسب المدة" />
      </h2>
      <PlatformNote39>
        <Rich text="المدة = نقطة المرجع − نقطة البداية. يظهر الحساب مع الجملة المصدرية، فلا يُعرض رقم لا يتفق مع نص المصدر." />
      </PlatformNote39>
      <div className="mt-3 space-y-3">
        {DURATION_CASES_39.map((item) => {
          const chosenStart = start[item.id];
          const chosenReference = reference[item.id];
          const isComputed = !!computed[item.id];
          const duration = chosenStart != null && chosenReference != null ? chosenReference - chosenStart : null;
          const matches = duration === item.duration;
          return (
            <section key={item.id} data-duration-case={item.id} className="rounded-2xl border border-[#d8d2c5] bg-white p-3 sm:p-4">
              <h3 className="text-base font-black text-[#17354a]">
                <Rich text={item.title} />
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#43575a]">
                <Rich text={item.context} />
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(["start", "reference"] as const).map((slot) => (
                  <div key={slot}>
                    <p className="mb-1 text-sm font-black text-[#24343b]">
                      {slot === "start" ? "نقطة البداية" : "نقطة المرجع المستقبلية"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.points.map((point) => {
                        const value = slot === "start" ? chosenStart : chosenReference;
                        const setValue = slot === "start" ? setStart : setReference;
                        const selectedValue = value;
                        return (
                          <button
                            key={`${item.id}-${slot}-${point.value}`}
                            type="button"
                            data-duration-point={slot}
                            data-duration-value={point.value}
                            aria-pressed={selectedValue === point.value}
                            disabled={isComputed}
                            onClick={() => setValue((current) => ({ ...current, [item.id]: point.value }))}
                            className={`${FOCUS_39} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none disabled:cursor-not-allowed ${
                              selectedValue === point.value
                                ? "border-[#245f62] bg-[#eef4f0] text-[#17354a]"
                                : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#f7f8f5] disabled:bg-[#f5f5f2] disabled:text-[#596965]"
                            }`}
                          >
                            <span dir="ltr" className="font-en tabular-nums">
                              {point.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {!isComputed ? (
                <ActionButton39
                  className="mt-3"
                  disabled={chosenStart == null || chosenReference == null}
                  onClick={() => setComputed((current) => ({ ...current, [item.id]: true }))}
                >
                  احسب المدة
                </ActionButton39>
              ) : (
                <div className="mt-3">
                  <Feedback39
                    state={matches ? "ok" : "review"}
                    title={matches ? "المدة مطابقة لحساب المصدر." : "هذه المدة لا تطابق مثال المصدر — راجع النقطتين."}
                  >
                    <p className="font-black">
                      المدة المحسوبة:{" "}
                      <span dir="ltr" className="font-en tabular-nums">
                        {duration}
                      </span>{" "}
                      {item.unitLabel}
                    </p>
                    {matches ? (
                      <>
                        <p dir="ltr" className="font-en mt-1 block font-black text-[#18333b]">
                          {item.sentence}
                        </p>
                        <p className="mt-1">
                          <Rich text={item.calc} />
                        </p>
                      </>
                    ) : (
                      <p className="mt-1">
                        <Rich text="مثال المصدر يبدأ من نقطة ويقيس عند أخرى؛ اختر النقطتين المذكورتين في النص." />
                      </p>
                    )}
                  </Feedback39>
                </div>
              )}
            </section>
          );
        })}
      </div>
      <p className="mt-3 rounded-2xl border border-[#e3d6b6] bg-[#fbf6eb] p-3 text-sm leading-6 text-[#76531e]">
        <Rich text="ملاحظة: نفترض في المثال أن المقارنة تتم بين التاريخ نفسه من الشهرين." />
      </p>
    </section>
  );
}

/** فحص عناصر الصياغة في مختبرات البناء (§19 و§21 و§23). */
export function elementCheck39(answer: string, kind: "negative" | "question" | "howlong"): { label: string; ok: boolean }[] {
  const text = answer.trim();
  const lower = text.toLowerCase();
  const hasHaveBeen = /\bhave\s+been\b/.test(lower);
  const negated = /\bwon't\b|\bwill not\b/.test(lower);
  const ving = /\b\w+ing\b/.test(lower);
  const questionMark = text.endsWith("?");
  const startsWill = /^will\b/i.test(text);
  const startsHowLongWill = /^how\s+long\s+will\b/i.test(lower);
  if (kind === "negative") {
    return [
      { label: "won't أو will not", ok: negated },
      { label: "have been بعد النفي", ok: hasHaveBeen },
      { label: "الفعل مع ing بعد been", ok: ving },
      { label: "لا يوجد has أو being", ok: !/\bhas\b|\bbeing\b/.test(lower) },
    ];
  }
  if (kind === "howlong") {
    return [
      { label: "يبدأ السؤال بـ How long will", ok: startsHowLongWill },
      { label: "الفاعل بعد will (وليس قبلها)", ok: !/^how\s+long\s+\w+\s+will/i.test(lower) },
      { label: "have been بعد الفاعل", ok: hasHaveBeen },
      { label: "الفعل مع ing بعد been", ok: ving },
      { label: "علامة السؤال (?)", ok: questionMark },
    ];
  }
  return [
    { label: "يبدأ السؤال بـ Will", ok: startsWill },
    { label: "الفاعل بعد will", ok: /^will\s+[A-Za-z']+\s+have\b/i.test(text) },
    { label: "have been بعد الفاعل", ok: hasHaveBeen },
    { label: "الفعل مع ing بعد been", ok: ving },
    { label: "علامة السؤال (?)", ok: questionMark },
  ];
}

export function BuildLab39({
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
  title: ReactNode;
  note?: ReactNode;
  items: readonly { id: string; n: number; base: string; arabic?: string; kind: "negative" | "question" | "howlong"; expected: string; sourceAnswer?: string; extraAnswer?: string }[];
  onComplete?: () => void;
  revealAfterAttempt?: boolean;
}) {
  const [input, setInput] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const attemptedAll = items.every((item) => checked[item.id]);

  return (
    <section data-lab={id} className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">
        <Rich text={eyebrow} />
      </p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">{title}</h2>
      {note ? <div className="mt-3">{note}</div> : null}
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          const report = elementCheck39(input[item.id] ?? "", item.kind);
          const allOk = report.every((entry) => entry.ok);
          return (
            <fieldset key={item.id} data-build-item={`${id}-${item.n}`} className="rounded-2xl border border-[#d8d2c5] bg-white p-3 sm:p-4">
              <legend className="sr-only">البند {item.n}</legend>
              <p dir="ltr" className="font-en text-left text-[#18333b]">
                {item.base}
              </p>
              {item.arabic ? (
                <p className="mt-1 text-sm leading-6 text-[#43575a]">
                  <Rich text={item.arabic} />
                </p>
              ) : null}
              <label className="mt-2 block">
                <span className="mb-1 block text-sm font-bold text-[#43575a]">
                  {item.kind === "negative" ? "اكتب صيغة النفي" : item.kind === "howlong" ? "اكتب السؤال عن المدة" : "اكتب السؤال"}
                </span>
                <input
                  type="text"
                  dir="ltr"
                  lang="en"
                  value={input[item.id] ?? ""}
                  disabled={isChecked}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setInput((current) => ({ ...current, [item.id]: value }));
                  }}
                  className={`${FOCUS_39} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-left text-base text-[#24343b]`}
                  aria-label={`إجابة البند ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton39
                  className="mt-2"
                  disabled={!(input[item.id] ?? "").trim()}
                  onClick={() => {
                    const next = { ...checked, [item.id]: true };
                    setChecked(next);
                    if (Object.keys(next).length === items.length) onComplete?.();
                  }}
                >
                  افحص العناصر
                </ActionButton39>
              ) : (
                <div className="mt-2 space-y-2">
                  <Feedback39 state={allOk ? "ok" : "review"} title={allOk ? "العناصر المطلوبة ظاهرة في إجابتك." : "راجع العناصر الناقصة، ثم قارن بمفتاح المصدر."}>
                    <ul className="mt-1 space-y-1">
                      {report.map((entry) => (
                        <li key={entry.label} className="flex items-center gap-2">
                          <span aria-hidden className={entry.ok ? "text-[#28533b]" : "text-[#8d3832]"}>
                            {entry.ok ? "✓" : "✕"}
                          </span>
                          <span>{entry.label}</span>
                        </li>
                      ))}
                    </ul>
                  </Feedback39>
                  {item.sourceAnswer ? (
                    <div className="rounded-xl border border-[#b8d6c0] bg-[#edf5ee] p-3 text-sm leading-6 text-[#28533b]">
                      <p className="font-black">إجابة المصدر:</p>
                      <p dir="ltr" className="font-en font-bold">
                        {item.sourceAnswer}
                      </p>
                      {item.extraAnswer ? (
                        <>
                          <p className="mt-1 font-black">جواب السؤال في المصدر:</p>
                          <p dir="ltr" className="font-en font-bold">
                            {item.extraAnswer}
                          </p>
                        </>
                      ) : null}
                    </div>
                  ) : (
                    <p dir="ltr" className="font-en rounded-xl border border-dashed border-[#c9d6d0] bg-[#f7faf8] px-3 py-2 text-left text-sm font-bold text-[#53676a]">
                      {item.expected}
                    </p>
                  )}
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#43575a]">
        حاولت <span className="font-en tabular-nums">{Object.values(checked).filter(Boolean).length}</span> من{" "}
        <span className="font-en tabular-nums">{items.length}</span> بندًا.
      </p>
      {attemptedAll && revealAfterAttempt ? (
        <p className="text-sm font-black text-[#28533b]">ظهرت إجابات المصدر لكل بند؛ قارن صياغتك بها.</p>
      ) : null}
    </section>
  );
}

export function NegativeBuildLab39({ onComplete }: { onComplete?: () => void }) {
  const items = NEGATIVE_BUILD_39.map((item) => ({
    id: item.id,
    n: item.n,
    base: item.base,
    arabic: item.arabic,
    kind: "negative" as const,
    expected: item.negative,
    sourceAnswer: item.negative,
  }));
  return (
    <BuildLab39
      id="negative-build"
      eyebrow="§19 · negative builder"
      title="حوّل كل جملة إلى النفي"
      note={
        <PlatformNote39>
          <Rich text="الصيغة: Subject + won't + have + been + V-ing — لاحظ أن have وbeen ثابتتان بعد النفي." />
        </PlatformNote39>
      }
      items={items}
      onComplete={onComplete}
      revealAfterAttempt
    />
  );
}

export function YesNoBuildLab39({ onComplete }: { onComplete?: () => void }) {
  const items = YESNO_BUILD_39.map((item) => ({
    id: item.id,
    n: item.n,
    base: item.base,
    arabic: item.arabic,
    kind: "question" as const,
    expected: item.question,
    sourceAnswer: item.question,
  }));
  return (
    <BuildLab39
      id="yesno-build"
      eyebrow="§21 · question builder"
      title="كوّن سؤال نعم/لا من كل جملة"
      note={
        <PlatformNote39>
          الطريقة: نضع will قبل الفاعل. القاعدة:{" "}
          <span dir="ltr" className="font-en font-black">
            Will + Subject + have + been + V-ing?
          </span>
        </PlatformNote39>
      }
      items={items}
      onComplete={onComplete}
      revealAfterAttempt
    />
  );
}

export function HowLongBuildLab39({ onComplete }: { onComplete?: () => void }) {
  const items = HOWLONG_BUILD_39.map((item) => ({
    id: item.id,
    n: item.n,
    base: item.base,
    arabic: item.arabic,
    kind: "howlong" as const,
    expected: item.question,
    sourceAnswer: item.question,
    extraAnswer: item.answerLine,
  }));
  return (
    <BuildLab39
      id="howlong-build"
      eyebrow="§23 · How long builder"
      title="اسأل عن المدة باستخدام How long"
      note={
        <PlatformNote39>
          <Rich text="القاعدة: How long + will + Subject + have + been + V-ing? — انتبه إلى أن will تأتي قبل الفاعل، وهذا ما يفحصه المختبر." />
        </PlatformNote39>
      }
      items={items}
      onComplete={onComplete}
      revealAfterAttempt
    />
  );
}

function DialogueLab({
  id,
  eyebrow,
  title,
  lines,
  checks,
  checkTitle,
  onComplete,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lines: readonly {
    id: string;
    speaker: string;
    en: string;
    ar: string;
    form: string;
    analysis: string;
    origin: "source" | "platform";
    analysisOrigin: "source" | "platform";
  }[];
  checks: readonly ChoiceItem39[];
  checkTitle: string;
  onComplete?: () => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const opened = Object.values(open).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <section data-lab={id} className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">{eyebrow}</p>
        <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">{title}</h2>
        <div className="mt-3 space-y-2">
          {lines.map((line, index) => {
            const isOpen = !!open[line.id];
            return (
              <article key={line.id} data-dialogue-line={line.id} className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    const next = { ...open, [line.id]: true };
                    setOpen(next);
                    if (Object.values(next).filter(Boolean).length === lines.length) onComplete?.();
                  }}
                  className={`${FOCUS_39} flex min-h-11 w-full flex-wrap items-center justify-between gap-2 rounded-xl px-1 text-right`}
                >
                  <span dir="ltr" className="font-en min-w-0 text-left text-[#18333b]">
                    <span className="font-black text-[#245f62]">{line.speaker}: </span>
                    {line.en}
                  </span>
                  <span className="shrink-0 rounded-full bg-[#f3f5f2] px-2.5 py-1 text-xs font-black text-[#53676a]">
                    {isOpen ? "التحليل ظاهر" : `تحليل السطر ${index + 1}`}
                  </span>
                </button>
                {isOpen ? (
                  <div className="mt-2 space-y-1 border-t border-[#e3e0d7] pt-2 text-sm leading-6 text-[#24343b]">
                    <p dir="rtl">
                      <Rich text={line.ar} />
                    </p>
                    <p className="rounded-xl bg-[#edf5ee] px-3 py-2 font-bold text-[#28533b]">
                      <EnAr
                        en={<span className="inline-block rounded bg-white px-2">{line.form}</span>}
                        sep="—"
                        ar={line.analysis}
                      />
                    </p>
                    <p className="text-xs font-black text-[#53676a]">
                      {line.origin === "platform"
                        ? "الترجمة العربية لهذا السطر إضافة من المنصة؛ نص الحوار الإنجليزي من المصدر."
                        : "الترجمة العربية لهذا السطر من نص المصدر."}{" "}
                      {line.analysisOrigin === "platform" ? "التحليل إضافة من المنصة." : "التحليل من فقرة التحليل في المصدر."}
                    </p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
        <p aria-live="polite" className="mt-3 text-sm font-bold text-[#43575a]">
          فتحت <span className="font-en tabular-nums">{opened}</span> من <span className="font-en tabular-nums">{lines.length}</span> سطرًا.
        </p>
      </section>
      <ChoiceLab39 id={`${id}-check`} items={checks} eyebrow={`${eyebrow} · comprehension`} title={checkTitle} />
    </div>
  );
}

export function DialogueLab39({ onComplete }: { onComplete?: () => void }) {
  return (
    <DialogueLab
      id="dialogue"
      eyebrow="§15 · The Long Study Day"
      title="افتح كل سطر لترى تحليله"
      lines={DIALOGUE_LINES_39}
      checks={DIALOGUE_CHECK_39}
      checkTitle="أسئلة فهم الحوار"
      onComplete={onComplete}
    />
  );
}

export function Dialogue2Lab39({ onComplete }: { onComplete?: () => void }) {
  return (
    <DialogueLab
      id="dialogue2"
      eyebrow="§28 · The Marathon Training"
      title="افتح كل سطر لترى تحليله"
      lines={DIALOGUE2_LINES_39}
      checks={DIALOGUE2_CHECK_39}
      checkTitle="أسئلة فهم الحوار وحساب المدة"
      onComplete={onComplete}
    />
  );
}

/** §26 — لوحة أفعال الحالة مع مختبر الحكم. */
export function StativeLab39() {
  const [active, setActive] = useState("");
  const verb = STATIVE_VERBS_39.find((candidate) => candidate.verb === active);
  return (
    <div className="space-y-4">
      <section data-lab="stative" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§26 · stative verbs</p>
        <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
          <Rich text="اضغط كل فعل حالة لترى معناه والصيغة المعتادة معه" />
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATIVE_VERBS_39.map((item) => (
            <button
              key={item.verb}
              type="button"
              data-stative-verb={item.verb}
              aria-pressed={active === item.verb}
              onClick={() => setActive(item.verb)}
              className={`${FOCUS_39} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
                active === item.verb ? "border-[#245f62] bg-[#245f62] text-white" : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#eef4f0]"
              }`}
            >
              <span dir="ltr" className="font-en">
                {item.verb}
              </span>
            </button>
          ))}
        </div>
        {verb ? (
          <div data-stative-readout={verb.verb} className="mt-3 space-y-2 rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3">
            <p className="text-sm font-black text-[#17354a]">
              <Rich text={`${verb.verb} = ${verb.arabic} — فعل حالة في هذا المعنى.`} />
            </p>
            <p dir="ltr" className="font-en text-left font-black text-[#28533b]">
              ✅ {verb.good}
            </p>
            <p dir="ltr" className="font-en text-left font-black text-[#8d3832]">
              ❌ {verb.bad}
            </p>
            <p className="text-sm leading-6 text-[#28533b]">
              <Rich text="لأن أفعال الحالة لا تُستخدم في الصيغ المستمرة في الاستعمال المعتاد، نختار Future Perfect بدل Future Perfect Continuous." />
            </p>
            {verb.origin === "platform" ? (
              <p className="text-xs font-black text-[#53676a]">
                الفعل <span dir="ltr" className="font-en">{verb.verb}</span> وارد في قائمة المصدر؛ زوجا الجمل أعلاه من إعداد المنصة على مثال
                المصدر مع know.
              </p>
            ) : (
              <p className="text-xs font-black text-[#53676a]">مثال المصدر نفسه الوارد في §26.</p>
            )}
          </div>
        ) : (
          <p className="mt-3 rounded-2xl border border-dashed border-[#c9d6d0] bg-[#f7faf8] p-3 text-sm font-bold text-[#53676a]">
            اختر فعلًا من القائمة لعرض الصيغة المعتادة معه.
          </p>
        )}
      </section>
      <ChoiceLab39 id="stative-judgement" items={STATIVE_ITEMS_39} eyebrow="§26 · judgement lab" title="أي الجملتين هي الاستعمال المعتاد؟" />
    </div>
  );
}

/** §29 — التدريب الأول: اختيار الصيغة الصحيحة (ستة أسئلة) مع مفتاح المصدر بعد المحاولة. */
export function Exercise29Lab39({ onComplete }: { onComplete?: () => void }) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = EXERCISE29_ITEMS_39.filter((item) => checked[item.n]).length;
  const score = EXERCISE29_ITEMS_39.filter((item) => checked[item.n] && selected[item.n] === item.answer).length;
  return (
    <section data-lab="exercise29" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§29 · guided practice</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">اختر الصيغة الصحيحة (ستة أسئلة)</h2>
      <div className="mt-3 space-y-3">
        {EXERCISE29_ITEMS_39.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = selected[item.n] === item.answer;
          return (
            <fieldset key={item.n} data-practice-item={`exercise29-${item.n}`} className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
              <legend className="sr-only">السؤال {item.n}</legend>
              <p dir="ltr" className="font-en text-left text-[#18333b]">
                {item.prompt}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.options.map((option) => {
                  const value = option.split(".")[0].trim();
                  return (
                    <label
                      key={option}
                      className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${
                        selected[item.n] === value ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`exercise29-${item.n}`}
                        value={value}
                        checked={selected[item.n] === value}
                        disabled={isChecked}
                        onChange={() => setSelected((current) => ({ ...current, [item.n]: value }))}
                        className={`${FOCUS_39} h-4 w-4 accent-[#245f62]`}
                      />
                      <span dir="ltr" className="font-en">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
              {!isChecked ? (
                <ActionButton39
                  className="mt-2"
                  disabled={!selected[item.n]}
                  onClick={() => {
                    const next = { ...checked, [item.n]: true };
                    setChecked(next);
                    if (Object.keys(next).length === EXERCISE29_ITEMS_39.length) onComplete?.();
                  }}
                >
                  تحقق
                </ActionButton39>
              ) : (
                <div className="mt-2">
                  <Feedback39 state={ok ? "ok" : "review"} title={ok ? "إجابة صحيحة." : `إجابة المصدر: ${item.answer} — ${item.answerText}`}>
                    حل المصدر:{" "}
                    <span dir="ltr" className="font-en font-black">
                      {item.answer} — {item.answerText}
                    </span>
                  </Feedback39>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#43575a]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من{" "}
        <span className="font-en tabular-nums">{EXERCISE29_ITEMS_39.length}</span>، ومطابق للمفتاح{" "}
        <span className="font-en tabular-nums">{score}</span>.
      </p>
    </section>
  );
}

/** §30 — التدريب الثاني: إكمال الجمل بالصيغة المطلوبة. */
export function Fill30Lab39({ onComplete }: { onComplete?: () => void }) {
  const [values, setValues] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = FILL30_ITEMS_39.filter((item) => checked[item.n]).length;
  const normalize = (text: string) => text.trim().toLowerCase().replace(/\s+/g, " ").replace(/will not/g, "won't");
  return (
    <section data-lab="fill30" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§30 · completion drill</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">أكمل باستخدام Future Perfect Continuous</h2>
      <PlatformNote39>
        <Rich text="اكتب الصيغة كاملة (will have been + V-ing). تُقبل صياغتا won't وwill not، ولا تُقبل الإجابة ناقصة مثل been studying فقط." />
      </PlatformNote39>
      <div className="mt-3 space-y-3">
        {FILL30_ITEMS_39.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = normalize(values[item.n] ?? "") === normalize(item.answer);
          return (
            <fieldset key={item.n} data-practice-item={`fill30-${item.n}`} className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
              <legend className="sr-only">البند {item.n}</legend>
              <p dir="ltr" className="font-en text-left text-[#18333b]">
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
                className={`${FOCUS_39} mt-2 w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-left text-base text-[#24343b]`}
                aria-label={`إكمال البند ${item.n}`}
              />
              {!isChecked ? (
                <ActionButton39
                  className="mt-2"
                  disabled={!(values[item.n] ?? "").trim()}
                  onClick={() => {
                    const next = { ...checked, [item.n]: true };
                    setChecked(next);
                    if (Object.keys(next).length === FILL30_ITEMS_39.length) onComplete?.();
                  }}
                >
                  تحقق
                </ActionButton39>
              ) : (
                <div className="mt-2">
                  <Feedback39 state={ok ? "ok" : "review"} title={ok ? "مطابق لمفتاح المصدر." : "إجابة المصدر:"}>
                    <span dir="ltr" className="font-en font-black">
                      {item.answer}
                    </span>
                  </Feedback39>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#43575a]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من{" "}
        <span className="font-en tabular-nums">{FILL30_ITEMS_39.length}</span>.
      </p>
    </section>
  );
}

/** §31 — التدريب الثالث: Future Perfect أم Future Perfect Continuous؟ */
export function Tense31Lab39({ onComplete }: { onComplete?: () => void }) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = TENSE31_ITEMS_39.filter((item) => checked[item.n]).length;
  const score = TENSE31_ITEMS_39.filter((item) => checked[item.n] && selected[item.n] === item.answer).length;
  return (
    <section data-lab="tense31" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§31 · tense choice</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="Future Perfect أم Future Perfect Continuous؟" />
      </h2>
      <PlatformNote39>
        <Rich text="لاحظ أن البنود تأتي في أزواج (①/②، ③/④، ⑥/⑤، ⑦/⑧): الجملة نفسها بفعل واحد، والفرق هو وجود مدة النشاط أو عدّ الإنجازات." />
      </PlatformNote39>
      <div className="mt-3 space-y-3">
        {TENSE31_ITEMS_39.map((item) => {
          const isChecked = !!checked[item.n];
          const ok = selected[item.n] === item.answer;
          return (
            <fieldset key={item.n} data-practice-item={`tense31-${item.n}`} className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
              <legend className="sr-only">الموقف {item.n}</legend>
              <EnglishLine39>{item.prompt}</EnglishLine39>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { value: "future-perfect", label: "Future Perfect" },
                  { value: "future-perfect-continuous", label: "Future Perfect Continuous" },
                ].map((choice) => (
                  <label
                    key={choice.value}
                    className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold ${
                      selected[item.n] === choice.value ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`tense31-${item.n}`}
                      value={choice.value}
                      checked={selected[item.n] === choice.value}
                      disabled={isChecked}
                      onChange={() => setSelected((current) => ({ ...current, [item.n]: choice.value }))}
                      className={`${FOCUS_39} h-4 w-4 accent-[#245f62]`}
                    />
                    <span dir="ltr" className="font-en">
                      {choice.label}
                    </span>
                  </label>
                ))}
              </div>
              {!isChecked ? (
                <ActionButton39
                  className="mt-2"
                  disabled={!selected[item.n]}
                  onClick={() => {
                    const next = { ...checked, [item.n]: true };
                    setChecked(next);
                    if (Object.keys(next).length === TENSE31_ITEMS_39.length) onComplete?.();
                  }}
                >
                  تحقق
                </ActionButton39>
              ) : (
                <div className="mt-2">
                  <Feedback39 state={ok ? "ok" : "review"} title={ok ? "إجابة مطابقة لمفتاح المصدر." : `مفتاح المصدر: ${item.answerText}`}>
                    <span dir="ltr" className="font-en block font-black">
                      {item.answerText}
                    </span>
                    <Rich text={item.why} />
                  </Feedback39>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#43575a]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من{" "}
        <span className="font-en tabular-nums">{TENSE31_ITEMS_39.length}</span>، ومطابق للمفتاح{" "}
        <span className="font-en tabular-nums">{score}</span>.
      </p>
      <PlatformNote39>
        <Rich text="تذكير مهم: لا نقول إن Future Perfect يعني أن العمل انتهى وأن Future Perfect Continuous يعني أنه لم ينتهِ؛ الفرق هو زاوية التركيز: إنجاز مكتمل مقابل مدة نشاط." />
      </PlatformNote39>
    </section>
  );
}

/** §32 — Grammar Detective: اكتب التصحيح ثم اعرض تصحيح المصدر وسبب الخطأ. */
export function Detective32Lab39({ onComplete }: { onComplete?: () => void }) {
  const [draft, setDraft] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const attempted = DETECTIVE32_ITEMS_39.filter((item) => checked[item.n]).length;
  return (
    <section data-lab="detective32" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§32 · error workshop</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="Grammar Detective — اكتشف الأخطاء واكتب التصحيح" />
      </h2>
      <PlatformNote39>
        كل جملة فيها خطأ واحد على الأقل. اكتب تصحيحك ثم اعرض تصحيح المصدر مع سبب الخطأ. لا يُطلب منك مطابقة الصياغة حرفيًا.
      </PlatformNote39>
      <div className="mt-3 space-y-3">
        {DETECTIVE32_ITEMS_39.map((item) => {
          const isChecked = !!checked[item.n];
          return (
            <section key={item.n} data-practice-item={`detective32-${item.n}`} className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
              <p dir="ltr" className="font-en text-left text-[#8d3832]">
                {`${item.n}. ${item.prompt}`}
              </p>
              <label className="mt-2 block">
                <span className="mb-1 block text-sm font-bold text-[#43575a]">تصحيحك</span>
                <input
                  type="text"
                  dir="ltr"
                  lang="en"
                  value={draft[item.n] ?? ""}
                  disabled={isChecked}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setDraft((current) => ({ ...current, [item.n]: value }));
                  }}
                  className={`${FOCUS_39} w-full rounded-xl border border-[#bfcac4] bg-white px-3 py-2.5 text-left text-base text-[#24343b]`}
                  aria-label={`تصحيح الجملة ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton39
                  className="mt-2"
                  disabled={!(draft[item.n] ?? "").trim()}
                  onClick={() => {
                    const next = { ...checked, [item.n]: true };
                    setChecked(next);
                    if (Object.keys(next).length === DETECTIVE32_ITEMS_39.length) onComplete?.();
                  }}
                >
                  اعرض تصحيح المصدر
                </ActionButton39>
              ) : (
                <div className="mt-2">
                  <Feedback39 state="info" title="تصحيح المصدر وسبب الخطأ">
                    <span dir="ltr" className="font-en block font-black text-[#28533b]">
                      {item.answer}
                    </span>
                    <Rich text={item.why} />
                  </Feedback39>
                </div>
              )}
            </section>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm font-bold text-[#43575a]">
        حاولت <span className="font-en tabular-nums">{attempted}</span> من{" "}
        <span className="font-en tabular-nums">{DETECTIVE32_ITEMS_39.length}</span>.
      </p>
    </section>
  );
}

/** §34 — مختبر القراءة: ساعة الرحلة + سبعة أسئلة + تحليل الصيغ بعد كشف إجابات المصدر. */
export function ReadingLab39({
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
  const [point, setPoint] = useState<number | null>(null);
  const answered = READING34_QUESTIONS_39.filter((_, index) => (answers[index] ?? "").trim().length > 0).length;
  const canReveal = answered === READING34_QUESTIONS_39.length;
  const active = point == null ? null : READING34_JOURNEY_39[point];
  return (
    <section data-lab="reading34" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§34 · comprehension</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">أجب عن أسئلة الفهم السبعة</h2>
      <div className="mt-3 rounded-2xl border border-[#d8d2c5] bg-white p-3">
        <p className="text-sm font-black text-[#17354a]">ساعة الرحلة — تحقّق من حساب المدة بنفسك</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {READING34_JOURNEY_39.map((stop, index) => (
            <button
              key={stop.clock}
              type="button"
              data-journey-point={index}
              aria-pressed={point === index}
              onClick={() => setPoint(index)}
              className={`${FOCUS_39} min-h-14 rounded-2xl border px-3 py-2 text-right transition-colors motion-reduce:transition-none ${
                point === index ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white hover:bg-[#f7f8f5]"
              }`}
            >
              <span dir="ltr" className="font-en block text-base font-black tabular-nums text-[#17354a]">
                {stop.clock}
              </span>
              <span className="mt-0.5 block text-sm font-bold leading-5 text-[#24343b]">{stop.label}</span>
            </button>
          ))}
        </div>
        {active ? (
          <div className="mt-2 rounded-xl border border-[#b8d6c0] bg-[#edf5ee] p-3">
            <p dir="ltr" className="font-en text-left text-[#18333b]">
              {active.detail}
            </p>
            <p className="mt-1 text-sm font-black text-[#28533b]">
              المدة المنقضية منذ الانطلاق: <span className="font-en tabular-nums">{active.hours}</span> ساعة.
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm font-bold text-[#53676a]">اختر محطة لعرض ما يحدث فيها والمدة المنقضية منذ السادسة صباحًا.</p>
        )}
      </div>
      <label className="mt-3 inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#d8d2c5] bg-white px-3 py-2 text-sm font-bold text-[#24343b]">
        <input type="checkbox" checked={highlight} onChange={onToggleHighlight} className={`${FOCUS_39} h-4 w-4 accent-[#245f62]`} />
        <span>تمييز صيغ المستقبل في النص أعلاه (بصري فقط — لا يخفي النص)</span>
      </label>
      {highlight ? (
        <p className="mt-2 text-xs font-bold text-[#53676a]" role="status">
          التمييز مُطبَّق على نص المصدر في البطاقة أعلاه.
        </p>
      ) : null}
      <div className="mt-3 space-y-2">
        {READING34_QUESTIONS_39.map((question, index) => (
          <label key={question} className="block rounded-2xl border border-[#d8d2c5] bg-white p-3">
            <span dir="ltr" className="font-en mb-1 block text-left font-bold text-[#18333b]">
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
              className={`${FOCUS_39} w-full resize-y rounded-lg border border-[#bfcac4] bg-white p-2.5 text-left text-base leading-7 text-[#24343b]`}
              aria-label={`إجابة السؤال ${index + 1}`}
            />
          </label>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!revealed ? (
          <ActionButton39
            disabled={!canReveal}
            onClick={() => {
              setRevealed(true);
              onComplete?.();
            }}
          >
            اعرض إجابات المصدر
          </ActionButton39>
        ) : (
          <p role="status" className="rounded-xl border border-[#b8d6c0] bg-[#edf5ee] px-3 py-2 text-sm font-black text-[#28533b]">
            ظهرت إجابات المصدر السبعة أسفل بطاقة القسم، مع تحليل الصيغ هنا.
          </p>
        )}
        <p aria-live="polite" className="text-sm font-bold text-[#43575a]">
          كتبت <span className="font-en tabular-nums">{answered}</span> من{" "}
          <span className="font-en tabular-nums">{READING34_QUESTIONS_39.length}</span> إجابة.
        </p>
      </div>
      {revealed ? (
        <div className="mt-3 space-y-2">
          <h3 className="text-sm font-black text-[#17354a]">تحليل صيغ المستقبل في النص — إضافة من المنصة</h3>
          {READING34_ANALYSIS_39.map((entry) => (
            <div key={entry.line} className="rounded-xl border border-[#dce3dd] bg-[#f7faf8] p-3 text-sm leading-6 text-[#24343b]">
              <p dir="ltr" className="font-en text-left text-[#18333b]">
                {entry.line}
              </p>
              <p className="mt-1">
                <span dir="ltr" className="font-en block w-fit rounded bg-white px-2 font-black">
                  {entry.form}
                </span>
                <Rich text={entry.why} />
              </p>
            </div>
          ))}
          <p className="rounded-xl border border-[#e3d6b6] bg-[#fbf6eb] p-3 text-sm leading-6 text-[#76531e]">
            <Rich text="ملاحظة فيدلية: النص يتضمن جملتين بصيغة Future Perfect Continuous (جملة الظهر وجملة الوصول إلى الفندق)، بينما يسمّي مفتاح المصدر للسؤال ⑦ جملة الظهر فقط. نعرض المعلومتين معًا دون تعديل نص المصدر." />
          </p>
        </div>
      ) : null}
    </section>
  );
}

/** §37 — مهمة الإنتاج اللغوي: مساحة كتابة + قائمة الشروط الثمانية + نموذج المصدر. */
export function WritingLab39() {
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [modelOpen, setModelOpen] = useState(false);
  const sentenceCount = useMemo(
    () => (draft.trim() ? draft.split(/[.!?]+/).filter((part) => part.trim().length > 0).length : 0),
    [draft],
  );
  const marked = WRITING37_CRITERIA_39.filter((_, index) => checked[index]).length;
  const hasEnough = sentenceCount >= 12;
  return (
    <section data-lab="writing37" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§37 · Writing Mission</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">
        <Rich text="My Learning Journey by Next Year — فقرة من 12 إلى 15 جملة" />
      </h2>
      <PlatformNote39>
        اكتب فقرتك بالإنجليزية، ثم راجع شروط المصدر الثمانية بنفسك. لا يصدر النظام حكمًا آليًا على جودة الفقرة أو صحة تراكيبها؛ والعداد مساعد
        فقط.
      </PlatformNote39>
      <label className="mt-3 block">
        <span className="mb-1 block font-bold text-[#24343b]">مسودتك باللغة الإنجليزية</span>
        <textarea
          rows={12}
          dir="ltr"
          lang="en"
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          placeholder="Write your paragraph here…"
          className={`${FOCUS_39} w-full resize-y rounded-2xl border border-[#bfcac4] bg-white p-4 text-left text-base leading-7 text-[#18333b]`}
        />
      </label>
      <p aria-live="polite" className="mt-2 rounded-xl bg-[#f3f5f2] px-3 py-2 text-sm font-bold text-[#43575a]">
        عدد الجمل التقريبي: <span dir="ltr" className="font-en tabular-nums">{sentenceCount}</span> / المطلوب 12–15
      </p>
      <fieldset className="mt-3 rounded-2xl border border-[#d8d2c5] bg-white p-3">
        <legend className="px-1 text-sm font-black text-[#17354a]">قائمة مراجعة ذاتية — الشروط الثمانية الأصلية</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {WRITING37_CRITERIA_39.map((criterion, index) => (
            <label key={criterion} className="flex items-start gap-2 rounded-xl border border-[#e0e3dc] bg-[#fdfcf8] p-3 text-sm leading-6 text-[#24343b]">
              <input
                type="checkbox"
                checked={!!checked[index]}
                onChange={(event) => {
                  const value = event.currentTarget.checked;
                  setChecked((current) => ({ ...current, [index]: value }));
                }}
                className={`${FOCUS_39} mt-1 h-4 w-4 shrink-0 accent-[#245f62]`}
              />
              <span>
                <Rich text={criterion} />
              </span>
            </label>
          ))}
        </div>
        <p aria-live="polite" className="mt-2 text-xs font-bold text-[#53676a]">
          علّمت <span className="font-en tabular-nums">{marked}</span> من {WRITING37_CRITERIA_39.length} — راجع كل بند بنفسك.
        </p>
      </fieldset>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {!modelOpen ? (
          <ActionButton39 variant="secondary" disabled={!hasEnough} onClick={() => setModelOpen(true)}>
            اعرض نموذج المصدر بعد الكتابة
          </ActionButton39>
        ) : (
          <ActionButton39 variant="ghost" onClick={() => setModelOpen(false)}>
            إخفاء النموذج
          </ActionButton39>
        )}
        {!hasEnough ? <p className="text-sm font-bold text-[#53676a]">اكتب 12 جملة على الأقل لإظهار النموذج.</p> : null}
      </div>
      {modelOpen ? (
        <div className="mt-3 space-y-2 rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3">
          <p className="text-sm font-black text-[#28533b]">نموذج المصدر الإرشادي — لا تنسخه، اكتب فقرتك بأفكارك:</p>
          {WRITING37_MODEL_39.map((line, index) => (
            <div key={line} className="rounded-xl border border-[#dce6e4] bg-white px-3 py-2">
              <EnglishLine39>{line}</EnglishLine39>
              <p className="mt-1 text-xs font-black text-[#53676a]">
                <Rich text={`الصيغة في هذا السطر: ${WRITING37_MODEL_FORMS_39[index]} — إضافة من المنصة لدعم المراجعة الذاتية.`} />
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/** §39 — خريطة تقدم المنهج: الصيغ الست المكتملة + المحطة القادمة (مخططة فقط). */
export function CurriculumMapLab39() {
  const [active, setActive] = useState("");
  const current = CURRICULUM_MAP_39.find((item) => item.id === active);
  return (
    <section data-lab="curriculum-map" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">§39 · curriculum map</p>
      <h2 className="mt-1 text-lg font-black leading-snug text-[#24343b]">منظومة المستقبل الأساسية — الصيغ الست</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CURRICULUM_MAP_39.map((item) => (
          <button
            key={item.id}
            type="button"
            data-curriculum-form={item.id}
            aria-pressed={active === item.id}
            onClick={() => setActive(item.id)}
            className={`${FOCUS_39} min-h-16 rounded-2xl border px-3 py-2 text-right transition-colors motion-reduce:transition-none ${
              active === item.id ? "border-[#245f62] bg-[#eef4f0]" : "border-[#d8d2c5] bg-white hover:bg-[#f7f8f5]"
            }`}
          >
            <span className="block text-xs font-black text-[#53676a]">
              {item.order} · الدرس <span className="font-en tabular-nums">{item.lesson}</span>
            </span>
            <span dir="ltr" className="font-en mt-0.5 block text-left text-sm font-black text-[#17354a]">
              {item.form}
            </span>
            <span className="mt-0.5 block text-xs font-bold leading-5 text-[#24343b]">{item.expression}</span>
          </button>
        ))}
      </div>
      {current ? (
        <div data-curriculum-readout={current.id} className="mt-3 rounded-2xl border border-[#b8d6c0] bg-[#edf5ee] p-3">
          <p dir="ltr" className="font-en text-left text-base font-black text-[#18333b]">
            {current.pattern}
          </p>
          <p className="mt-1 text-sm font-bold leading-6 text-[#28533b]">
            {current.expression} — درس منفَّذ في هذا المستودع (الدرس <span className="font-en tabular-nums">{current.lesson}</span>).
          </p>
        </div>
      ) : (
        <p className="mt-3 rounded-2xl border border-dashed border-[#c9d6d0] bg-[#f7faf8] p-3 text-sm font-bold text-[#53676a]">
          اختر صيغة لعرض تركيبها ووظيفتها.
        </p>
      )}
      <div data-next-lesson={NEXT_LESSON_39.status} className="mt-3 rounded-2xl border border-[#e3d6b6] bg-[#fbf6eb] p-3">
        <p className="text-sm font-black text-[#76531e]">
          <Rich text={NEXT_LESSON_39.label} />
        </p>
        <p className="mt-1 text-sm leading-6 text-[#6a4d16]">
          <Rich text={NEXT_LESSON_39.note} />
        </p>
      </div>
    </section>
  );
}

export function FirstUseLab39() {
  return <ChoiceLab39 id="first-use" eyebrow="§6 · الاستخدام الأول" title="نشاط يستمر حتى نقطة مستقبلية" items={FIRST_USE_ITEMS_39} />;
}
export function ContinuationLab39() {
  return <ChoiceLab39 id="continuation" eyebrow="§7 · بعد النقطة المستقبلية" title="هل يجب أن يستمر النشاط بعدها؟" items={CONTINUATION_ITEMS_39} />;
}
export function ForLab39() {
  return <ChoiceLab39 id="for" eyebrow="§8 · FOR" title="للتعبير عن المدة" items={FOR_ITEMS_39} />;
}
export function SinceLab39() {
  return <ChoiceLab39 id="since" eyebrow="§9 · SINCE" title="للتعبير عن نقطة البداية" items={SINCE_ITEMS_39} />;
}
export function ForSinceQuestionsLab39() {
  return <ChoiceLab39 id="for-since-questions" eyebrow="§10 · المقارنة الذهبية" title="ماذا تجيب for وsince؟" items={FOR_SINCE_QUESTIONS_39} />;
}
export function ByLab39() {
  return <ChoiceLab39 id="by" eyebrow="§12 · BY" title="النقطة المستقبلية المرجعية" items={BY_ITEMS_39} />;
}
export function ByTheTimeLab39() {
  return <ChoiceLab39 id="by-the-time" eyebrow="§13 · by the time" title="Present Simple بعد by the time" items={BY_THE_TIME_ITEMS_39} />;
}
export function TimeClauseLab39() {
  return (
    <ChoiceLab39
      id="time-clause"
      eyebrow="§14 · لا will بعد by the time"
      title="مختبر الجملة الزمنية"
      items={TIME_CLAUSE_ITEMS_39}
      note={
        <PlatformNote39>
          <Rich text="القاعدة هنا تخص الجمل الزمنية المستقبلية (when / by the time / before / after / until). في السرد الماضي نستخدم صيغ الماضي نفسها، فلا تُعمَّم القاعدة على كل جملة فيها when." />
        </PlatformNote39>
      }
    />
  );
}
export function FpVsFpcLab39() {
  return <ChoiceLab39 id="fp-vs-fpc" eyebrow="§16 · Future Perfect vs FPC" title="اكتمال الإنجاز أم مدة النشاط؟" items={FP_VS_FPC_ITEMS_39} />;
}
export function PairedExamplesLab39() {
  return <ChoiceLab39 id="paired-examples" eyebrow="§17 · أمثلة متقابلة" title="النتيجة مقابل المدة" items={PAIRED_EXAMPLES_39} />;
}
export function FinishedLab39() {
  return (
    <ChoiceLab39
      id="finished"
      eyebrow="§18 · هل انتهى العمل؟"
      title="ما الذي يخبرنا به الزمن فعلًا؟"
      items={FINISHED_ITEMS_39}
      note={
        <PlatformNote39>
          <Rich text="لا نعلّم أن Future Perfect يعني توقف العمل وأن Future Perfect Continuous يعني استمراره؛ الفرق زاوية التركيز: الإنجاز المكتمل مقابل مدة النشاط الممتدة حتى النقطة." />
        </PlatformNote39>
      }
    />
  );
}
export function NegationMeaningLab39() {
  return <ChoiceLab39 id="negation-meaning" eyebrow="§20 · معنى النفي" title="النفي مرتبط بالنقطة المستقبلية" items={NEGATION_MEANING_ITEMS_39} />;
}
export function ShortAnswerLab39() {
  return <ChoiceLab39 id="short-answers" eyebrow="§22 · short answers" title="الإجابات القصيرة" items={SHORT_ANSWER_ITEMS_39} />;
}
export function WhLab39() {
  return <ChoiceLab39 id="wh-questions" eyebrow="§24 · أسئلة Wh الأخرى" title="What وWhere وWho مع الصيغة" items={WH_ITEMS_39} />;
}
export function PerfectContinuousLab39() {
  return <ChoiceLab39 id="perfect-continuous" eyebrow="§25 · الأزمنة التامة المستمرة الثلاثة" title="حدّد النقطة المرجعية" items={PERFECT_CONTINUOUS_ITEMS_39} />;
}
export function ErrorLab39() {
  return <ChoiceLab39 id="errors" eyebrow="§27 · أخطاء شائعة جدًا" title="شخّص الخطأ في كل صيغة" items={ERROR_ITEMS_39} />;
}
export function Iq33Lab39() {
  return <ChoiceLab39 id="iq33" eyebrow="§33 · IQ200" title="هل الزمنان صحيحان؟" items={IQ33_ITEMS_39} />;
}
export function ReadingCheckLab39() {
  return <ChoiceLab39 id="reading34-check" eyebrow="§34 · تحقّق من الحساب" title="ساعة الرحلة مقابل مفتاح المصدر" items={READING34_CHECK_39} />;
}
export function SummaryMatchLab39() {
  return (
    <div className="space-y-4">
      <ChoiceLab39 id="summary-match" eyebrow="§38 · الملخص الذهبي" title="صِل كل قاعدة بمثالها من المصدر" items={SUMMARY_MATCH_39} />
      <section data-lab="summary-uses" className="rounded-3xl border border-[#d8d2c5] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
        <h2 className="text-lg font-black leading-snug text-[#24343b]">أهم الاستخدامات الثلاثة</h2>
        <ul className="mt-2 space-y-1">
          {SUMMARY_USES_39.map((use) => (
            <li key={use} className="rounded-xl border border-[#d8d2c5] bg-white px-3 py-2 text-sm leading-6 text-[#24343b]">
              <Rich text={use} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function CoverBridge39() {
  return (
    <DurationFrame39 title="Duration Lab · الدرس 39" caption="ننظر من نقطة مستقبلية إلى مدة نشاط سيكون ممتدًا حتى تلك النقطة.">
      <h1 className="text-xl font-black leading-snug text-[#17354a] sm:text-2xl">
        <Rich text="الدرس 39: Future Perfect Continuous — المستقبل التام المستمر" />
      </h1>
      <p dir="ltr" className="font-en mt-1 text-left text-lg font-black text-[#18333b]">
        How Long Will You Have Been Learning?
      </p>
      <p className="mt-1 text-sm font-bold text-[#43575a]">إتقان التعبير عن مدة النشاط حتى نقطة مستقبلية — IQ200 🚀</p>
    </DurationFrame39>
  );
}
