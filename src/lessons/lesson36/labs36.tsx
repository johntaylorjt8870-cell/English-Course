// ============================================================
// Lesson 36 — interactive laboratories
//
// Every lab asks the learner to make a meaning decision first, then
// shows the supplied explanation. Nothing is auto-graded unless the
// lesson itself supplies an answer (Grammar Detective, the guided
// practice, and the Sara/Adam dialogue), and open writing is never
// judged as a single correct string.
// ============================================================

import { useState, type ReactNode } from "react";
import {
  ActionButton36,
  Callout36,
  Card36,
  Feedback36,
  FOCUS_36,
  FormBadge36,
  MixedText36,
  SourceText36,
  normalize36,
  matches36,
  pureEnglish,
  splitSpeaker36,
} from "./kit36";
import { textOf, type BlankItem, type ContextItem, type DecisionItem, type DetectiveItem, type ModelContext, type Ref, type ChooseItem } from "./content36";

const CHOICE_STYLE = "flex min-h-11 cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2 text-sm font-bold leading-6 transition";
const SELECTED = "border-slate-900 bg-slate-900 text-white";
const UNSELECTED = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

function OptionRow({
  name,
  value,
  checked,
  label,
  disabled,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: ReactNode;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`${CHOICE_STYLE} ${checked ? SELECTED : UNSELECTED} ${disabled ? "cursor-default opacity-90" : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className={`${FOCUS_36} mt-0.5 h-4 w-4 shrink-0 accent-slate-900`}
      />
      <span className="min-w-0">{label}</span>
    </label>
  );
}

function Progress36({ done, total, label }: { done: number; total: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
        <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${(done / total) * 100}%` }} />
      </div>
      <span dir="ltr" className="font-en text-xs font-bold tabular-nums text-slate-600">
        {done}/{total}
      </span>
    </div>
  );
}

// ------------------------------------------------------------
// Decision lab — decision now vs prior plan
// ------------------------------------------------------------

export function DecisionLab36({ id, prompt, items }: { id: string; prompt: string; items: DecisionItem[] }) {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <Card36 tone="warm" eyebrow="مختبر القرار" title={prompt}>
      <Progress36 done={done} total={items.length} label="تقدم مختبر القرار" />
      <div className="mt-3 space-y-3">
        {items.map((item, index) => {
          const isChecked = !!checked[index];
          const correct = picked[index] === item.answer;
          return (
            <fieldset key={`${id}-${index}`} className="rounded-2xl border border-amber-200 bg-white p-4" data-lab-item={`${id}-${index + 1}`}>
              <legend className="sr-only">الموقف {index + 1}</legend>
              {item.label ? (
                <p className="text-xs font-black text-slate-500">
                  <SourceText36 value={item.label} />
                </p>
              ) : null}
              <div className="mt-1 space-y-1.5">
                {item.lines.map((line) => (
                  <p key={`${line.s}-${line.i}`} className="text-base text-slate-800">
                    <SourceText36 value={line} />
                  </p>
                ))}
              </div>
              {item.cue ? (
                <p className="mt-2 text-xs font-bold text-slate-500">
                  <SourceText36 value={item.cue} />
                </p>
              ) : null}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {item.form ? (
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-sm font-bold text-slate-800">
                    <SourceText36 value={item.form} />
                  </span>
                ) : null}
                <span className="text-xs font-bold text-slate-400">ما وصف هذا الاستخدام؟</span>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <OptionRow name={`${id}-${index}`} value="now" checked={picked[index] === "now"} disabled={isChecked} onChange={(value) => setPicked((current) => ({ ...current, [index]: value }))} label="قرار لحظي" />
                <OptionRow name={`${id}-${index}`} value="plan" checked={picked[index] === "plan"} disabled={isChecked} onChange={(value) => setPicked((current) => ({ ...current, [index]: value }))} label="خطة أو نية مسبقة" />
              </div>
              {!isChecked ? (
                <ActionButton36 className="mt-3" disabled={!picked[index]} onClick={() => setChecked((current) => ({ ...current, [index]: true }))}>
                  تحقق من وصفي
                </ActionButton36>
              ) : (
                <div className="mt-3 space-y-2">
                  <Feedback36 state={correct ? "correct" : "review"} title={correct ? "وصف مناسب للسياق" : "راجع أصل القرار: هل وُجد قبل الكلام أم فيه؟"}>
                    <SourceText36 value={item.note} />
                  </Feedback36>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
    </Card36>
  );
}

// ------------------------------------------------------------
// Context lab — choose the form and justify the choice
// ------------------------------------------------------------

export function ContextLab36({ id, prompt, items, requireReason = false }: { id: string; prompt: string; items: ContextItem[]; requireReason?: boolean }) {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [reason, setReason] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <Card36 tone="warm" eyebrow="مختبر السياق" title={prompt}>
      <Progress36 done={done} total={items.length} label="تقدم مختبر السياق" />
      <div className="mt-3 space-y-3">
        {items.map((item, index) => {
          const isChecked = !!checked[index];
          const correct = picked[index] === item.answer;
          const ready = !!picked[index] && (!requireReason || !!reason[index]?.trim());
          return (
            <fieldset key={`${id}-${index}`} className="rounded-2xl border border-amber-200 bg-white p-4" data-lab-item={`${id}-${index + 1}`}>
              <legend className="sr-only">الموقف {index + 1}</legend>
              {item.label ? (
                <p className="text-xs font-black text-slate-500">
                  <SourceText36 value={item.label} />
                </p>
              ) : null}
              <div className="mt-1 space-y-1">
                {item.context.map((line) => (
                  <p key={`${line.s}-${line.i}`} className="text-base leading-7 text-slate-800">
                    <SourceText36 value={line} />
                  </p>
                ))}
              </div>
              {item.sentence ? (
                <p className="mt-2 rounded-xl bg-slate-900 px-3 py-2 text-base font-bold text-white">
                  <SourceText36 value={item.sentence} />
                </p>
              ) : null}
              {item.ar ? (
                <p className="mt-1 text-sm text-slate-500">
                  <SourceText36 value={item.ar} />
                </p>
              ) : null}
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {item.choices.map((choice) => (
                  <OptionRow
                    key={choice.value}
                    name={`${id}-${index}`}
                    value={choice.value}
                    checked={picked[index] === choice.value}
                    disabled={isChecked}
                    onChange={(value) => setPicked((current) => ({ ...current, [index]: value }))}
                    label={<span dir="ltr" className="font-en">{choice.label}</span>}
                  />
                ))}
              </div>
              {requireReason && !isChecked ? (
                <label className="mt-2 block">
                  <span className="mb-1 block text-xs font-bold text-slate-600">اكتب سبب اختيارك في جملة قصيرة</span>
                  <textarea
                    rows={2}
                    value={reason[index] ?? ""}
                    onChange={(event) => { const value = event.currentTarget.value; setReason((current) => ({ ...current, [index]: value })); }}
                    className={`${FOCUS_36} w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm leading-6 text-slate-800`}
                    aria-label={`سبب اختيار الموقف ${index + 1}`}
                  />
                </label>
              ) : null}
              {!isChecked ? (
                <ActionButton36 className="mt-3" disabled={!ready} onClick={() => setChecked((current) => ({ ...current, [index]: true }))}>
                  تحقق من اختياري
                </ActionButton36>
              ) : (
                <div className="mt-3 space-y-2">
                  <Feedback36 state={correct ? "correct" : "review"} title={correct ? "اختيار مناسب للسياق" : "السياق هنا يرجّح الصيغة الأخرى"}>
                    {item.note ? <p><SourceText36 value={item.note} /></p> : null}
                    {item.nuance ? <p className="mt-1"><SourceText36 value={item.nuance} /></p> : null}
                    <p className="mt-1 text-xs font-bold">الصيغتان قد تكونان صحيحتين نحويًا؛ الاختيار هنا عن التركيز الذي يفرضه الموقف.</p>
                  </Feedback36>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
    </Card36>
  );
}

// ------------------------------------------------------------
// Prediction lens — general prediction vs present evidence
// ------------------------------------------------------------

export function LensLab36({
  id,
  evidence,
  general,
  check,
}: {
  id: string;
  evidence: { sentence: Ref; ar?: Ref; why: Ref };
  general: { sentence: Ref; cue: Ref; ar?: Ref; why: Ref };
  check: { question: string; options: { value: string; label: string }[]; answer: string; feedback: string };
}) {
  const [lens, setLens] = useState<"evidence" | "general">("evidence");
  const [choice, setChoice] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <Card36 tone="warm" eyebrow="عدسة التوقع" title="توقع عام… أو توقع يبرز دليلًا حاضرًا">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className={`rounded-2xl border p-4 ${lens === "general" ? "border-sky-400 bg-sky-50" : "border-sky-200 bg-white"}`}>
          <div className="flex items-center justify-between gap-2">
            <FormBadge36 form="will" />
            <button type="button" aria-pressed={lens === "general"} onClick={() => setLens("general")} className={`${FOCUS_36} rounded-lg border border-sky-300 px-2 py-1 text-[11px] font-bold text-sky-900`}>
              عدسة الرأي
            </button>
          </div>
          <p className="mt-2 text-xs font-bold text-slate-500">
            <SourceText36 value={general.cue} />
          </p>
          <p className="mt-1 text-base font-bold text-slate-900">
            <SourceText36 value={general.sentence} />
          </p>
          {general.ar ? (
            <p className="mt-1 text-sm text-slate-500">
              <SourceText36 value={general.ar} />
            </p>
          ) : null}
          <p className="mt-2 text-xs leading-6 text-slate-600">
            <SourceText36 value={general.why} />
          </p>
        </div>
        <div className={`rounded-2xl border p-4 ${lens === "evidence" ? "border-orange-400 bg-orange-50" : "border-orange-200 bg-white"}`}>
          <div className="flex items-center justify-between gap-2">
            <FormBadge36 form="going" />
            <button type="button" aria-pressed={lens === "evidence"} onClick={() => setLens("evidence")} className={`${FOCUS_36} rounded-lg border border-orange-300 px-2 py-1 text-[11px] font-bold text-orange-900`}>
              عدسة الدليل
            </button>
          </div>
          <p className="mt-2 text-base font-bold text-slate-900">
            <SourceText36 value={evidence.sentence} />
          </p>
          {evidence.ar ? (
            <p className="mt-1 text-sm text-slate-500">
              <SourceText36 value={evidence.ar} />
            </p>
          ) : null}
          <p className="mt-2 text-xs leading-6 text-slate-600">
            <SourceText36 value={evidence.why} />
          </p>
        </div>
      </div>

      <fieldset className="mt-3 rounded-2xl border border-slate-200 bg-white p-3">
        <legend className="px-1 text-sm font-black text-slate-800">{check.question}</legend>
        <div className="mt-2 grid gap-2">
          {check.options.map((option) => (
            <OptionRow key={option.value} name={`${id}-check`} value={option.value} checked={choice === option.value} disabled={checked} onChange={setChoice} label={<MixedText36 text={option.label} />} />
          ))}
        </div>
        {!checked ? (
          <ActionButton36 className="mt-3" disabled={!choice} onClick={() => setChecked(true)}>
            تحقق من فهمي
          </ActionButton36>
        ) : (
          <div className="mt-3">
            <Feedback36 state={choice === check.answer ? "correct" : "review"} title={choice === check.answer ? "بالضبط: الدليل يرجّح، ولا يمنع" : "تذكّر: الدليل يرجّح going to عند إبرازه، لكنه لا يحوّل WILL إلى خطأ"}>
              <MixedText36 text={check.feedback} />
            </Feedback36>
          </div>
        )}
      </fieldset>
    </Card36>
  );
}

// ------------------------------------------------------------
// Grammar Detective
// ------------------------------------------------------------

export function DetectiveLab36({ id, heading, items }: { id: string; heading: Ref; items: DetectiveItem[] }) {
  const [draft, setDraft] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <Card36 tone="warm" eyebrow="ورشة التصحيح" title="صحّح بنفسك قبل رؤية الحل">
      <Progress36 done={done} total={items.length} label="تقدم ورشة التصحيح" />
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.n];
          const value = draft[item.n] ?? "";
          const exact = matches36(value, item.accepted);
          return (
            <fieldset key={item.n} className="rounded-2xl border border-amber-200 bg-white p-4" data-lab-item={`${id}-${item.n}`}>
              <legend className="sr-only">الجملة {item.n}</legend>
              <p className="text-base font-bold text-slate-900">
                <SourceText36 value={item.prompt} />
              </p>
              <label className="mt-2 block">
                <span className="mb-1 block text-xs font-bold text-slate-600">تصحيحك بالإنجليزية</span>
                <input
                  type="text"
                  dir="ltr"
                  lang="en"
                  value={value}
                  disabled={isChecked}
                  onChange={(event) => { const value = event.currentTarget.value; setDraft((current) => ({ ...current, [item.n]: value })); }}
                  className={`${FOCUS_36} font-en w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-base text-slate-900`}
                  aria-label={`تصحيح الجملة ${item.n}`}
                />
              </label>
              {!isChecked ? (
                <ActionButton36 className="mt-2" disabled={!value.trim()} onClick={() => setChecked((current) => ({ ...current, [item.n]: true }))}>
                  اعرض التصحيح المقبول
                </ActionButton36>
              ) : (
                <div className="mt-2 space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-black text-slate-500">
                    <SourceText36 value={heading} />
                  </p>
                  {item.answerRefs.map((ref) => (
                    <p key={`${ref.s}-${ref.i}`} className="text-sm font-semibold text-slate-800">
                      <SourceText36 value={ref} />
                    </p>
                  ))}
                  <p className="text-xs font-bold text-emerald-800">{exact ? "تصحيحك يطابق الحل المقبول." : "قارن صياغتك بالحل أعلاه؛ قد يكون اختلافك في التفاصيل فقط."}</p>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
    </Card36>
  );
}

// ------------------------------------------------------------
// Guided choice practice — eight contexts
// ------------------------------------------------------------

export function ChooseLab36({ id, heading, items }: { id: string; heading: Ref; items: ChooseItem[] }) {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <Card36 tone="warm" eyebrow="تدريب موجه" title="اختر الصيغة الأنسب للموقف">
      <Progress36 done={done} total={items.length} label="تقدم التدريب الموجه" />
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.n];
          const correct = picked[item.n] === item.key;
          return (
            <fieldset key={item.n} className="rounded-2xl border border-amber-200 bg-white p-4" data-lab-item={`${id}-${item.n}`}>
              <legend className="sr-only">السؤال {item.n}</legend>
              <div className="space-y-1">
                {item.prompt.map((ref) => (
                  <p key={`${ref.s}-${ref.i}`} className="text-base leading-7 text-slate-800">
                    <SourceText36 value={ref} />
                  </p>
                ))}
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <OptionRow name={`${id}-${item.n}`} value="will" checked={picked[item.n] === "will"} disabled={isChecked} onChange={(value) => setPicked((current) => ({ ...current, [item.n]: value }))} label={<span dir="ltr" className="font-en">WILL</span>} />
                <OptionRow name={`${id}-${item.n}`} value="going" checked={picked[item.n] === "going"} disabled={isChecked} onChange={(value) => setPicked((current) => ({ ...current, [item.n]: value }))} label={<span dir="ltr" className="font-en">BE GOING TO</span>} />
              </div>
              {!isChecked ? (
                <ActionButton36 className="mt-2" disabled={!picked[item.n]} onClick={() => setChecked((current) => ({ ...current, [item.n]: true }))}>
                  تحقق من الاختيار
                </ActionButton36>
              ) : (
                <div className="mt-2">
                  <Feedback36 state={correct ? "correct" : "review"} title={correct ? "اختيار مناسب" : "راجع السياق: الاختيار الآخر هو الأنسب هنا"}>
                    <span className="inline-flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-slate-500">
                        <SourceText36 value={heading} />
                      </span>
                      <SourceText36 value={item.answer} />
                    </span>
                  </Feedback36>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
    </Card36>
  );
}

// ------------------------------------------------------------
// Sara / Adam dialogue completion
// ------------------------------------------------------------

export function DialogueFillLab36({ id, intro, heading, lines, blanks }: { id: string; intro: Ref; heading: Ref; lines: Ref[]; blanks: BlankItem[] }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const blankByLine = new Map(blanks.map((blank) => [blank.line.i, blank]));
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <Card36 tone="warm" eyebrow="أكمل الحوار" title="فراغات Sara وAdam">
      <p className="text-sm text-slate-600">
        <SourceText36 value={intro} />
      </p>
      <Progress36 done={done} total={blanks.length} label="تقدم إكمال الحوار" />
      <div className="mt-3 space-y-2">
        {lines.map((line, index) => {
          const raw = textOf(line);
          const { speaker, body } = splitSpeaker36(raw);
          const blank = blankByLine.get(index);
          if (!blank) {
            return (
              <p key={`${line.s}-${line.i}`} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-7 text-slate-800" dir={pureEnglish(body) ? "ltr" : "rtl"} lang={pureEnglish(body) ? "en" : "ar"}>
                {speaker ? <span className="mr-2 inline-block rounded bg-slate-900 px-1.5 py-0.5 align-middle text-[11px] font-bold text-white">{speaker}:</span> : null}
                {speaker ? " " : null}
                <MixedText36 text={body} />
              </p>
            );
          }
          const [before, after = ""] = body.split("______");
          const isChecked = !!checked[blank.n];
          const value = answers[blank.n] ?? "";
          const exact = matches36(value, blank.accepted);
          return (
            <div key={`${line.s}-${line.i}`} className="rounded-xl border border-amber-200 bg-white px-3 py-2" data-lab-item={`${id}-${blank.n}`}>
              <div className="flex flex-wrap items-center gap-2 text-sm leading-7" dir="ltr" lang="en">
                {speaker ? <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px] font-bold text-white">{speaker}:</span> : null}
                {speaker ? " " : null}
                <span className="font-en text-slate-800">{before.trim()}</span>
                <label className="flex-1">
                  <span className="sr-only">الفراغ {blank.n}</span>
                  <input
                    type="text"
                    dir="ltr"
                    lang="en"
                    value={value}
                    disabled={isChecked}
                    onChange={(event) => { const value = event.currentTarget.value; setAnswers((current) => ({ ...current, [blank.n]: value })); }}
                    placeholder={`(blank ${blank.n})`}
                    aria-label={`الفراغ ${blank.n}`}
                    className={`${FOCUS_36} font-en w-full min-w-32 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-left text-sm text-slate-900`}
                  />
                </label>
                <span className="font-en text-slate-800">{after.trim()}</span>
              </div>
              {!isChecked ? (
                <ActionButton36 className="mt-2" disabled={!value.trim()} onClick={() => setChecked((current) => ({ ...current, [blank.n]: true }))}>
                  تحقق من الفراغ {blank.n}
                </ActionButton36>
              ) : (
                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm">
                  <p className="font-bold text-slate-900">
                    <SourceText36 value={blank.answerRef} />
                  </p>
                  {blank.explanation.map((ref) => (
                    <p key={`${ref.s}-${ref.i}`} className="mt-0.5 text-xs leading-6 text-slate-600">
                      <SourceText36 value={ref} />
                    </p>
                  ))}
                  <p className={`mt-1 text-xs font-bold ${exact ? "text-emerald-800" : "text-amber-800"}`}>{exact ? "إجابتك مطابقة للحل." : "قارن إجابتك بالحل؛ قد يكون الفرق في الاختيار أو في الصياغة."}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">
        <SourceText36 value={heading} />
      </div>
    </Card36>
  );
}

// ------------------------------------------------------------
// Context writing — change the meaning by changing the context
// ------------------------------------------------------------

export function ContextWritingLab36({ id, models }: { id: string; models: ModelContext[] }) {
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const ready = models.every((_, index) => (drafts[index] ?? "").trim().length > 0);
  return (
    <Card36 tone="warm" eyebrow="مساحة كتابة السياق" title="اكتب موقفين مختلفين">
      <div className="space-y-3">
        {models.map((model, index) => (
          <div key={`${model.sentence.s}-${model.sentence.i}`} className="rounded-2xl border border-amber-200 bg-white p-4">
            <p className="text-xs font-bold text-slate-500">
              <SourceText36 value={model.cue} />
            </p>
            <p className="mt-1 text-base font-bold text-slate-900">
              <SourceText36 value={model.sentence} />
            </p>
            <p className="mt-1 text-xs font-bold text-slate-500">
              <SourceText36 value={model.task} />
            </p>
            <label className="mt-2 block">
              <span className="sr-only">موقفك المقترح {index + 1}</span>
              <textarea
                rows={3}
                dir="auto"
                value={drafts[index] ?? ""}
                onChange={(event) => { const value = event.currentTarget.value; setDrafts((current) => ({ ...current, [index]: value })); }}
                className={`${FOCUS_36} w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm leading-7 text-slate-900`}
                aria-label={`موقفك المقترح ${index + 1}`}
              />
            </label>
            {revealed ? (
              <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm">
                {model.models.map((ref) => (
                  <p key={`${ref.s}-${ref.i}`} className="text-slate-800">
                    <SourceText36 value={ref} />
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {!revealed ? (
        <ActionButton36 disabled={!ready} onClick={() => setRevealed(true)}>
          اعرض المثالين الأصليين بعد المحاولة
        </ActionButton36>
      ) : (
        <Feedback36 state="info" title="قارن موقفيك بالمثالين">
          هل يوضح الأول قرارًا لحظيًا، والثاني خطة أو نية موجودة مسبقًا؟ قد تختلف التفاصيل ويبقى المعنى مناسبًا.
        </Feedback36>
      )}
    </Card36>
  );
}

// ------------------------------------------------------------
// Reading challenge
// ------------------------------------------------------------

export function Passage36({ title, lines }: { title: Ref; lines: Ref[] }) {
  const [highlight, setHighlight] = useState(false);
  const pattern = /\b(will|won't|'ll)\b|\b(am|is|are|'m|'re|'s)\s+going\s+to\b/gi;
  const render = (text: string) => {
    if (!highlight) return text;
    const nodes: ReactNode[] = [];
    let cursor = 0;
    for (const match of text.matchAll(pattern)) {
      const at = match.index ?? 0;
      if (at > cursor) nodes.push(text.slice(cursor, at));
      nodes.push(
        <mark key={`${at}-${match[0]}`} className="rounded bg-amber-200 px-0.5 text-slate-900">
          {match[0]}
        </mark>,
      );
      cursor = at + match[0].length;
    }
    if (cursor < text.length) nodes.push(text.slice(cursor));
    return nodes;
  };
  return (
    <Card36 title={<SourceText36 value={title} />} eyebrow="نص القراءة">
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
        <input type="checkbox" checked={highlight} onChange={(event) => setHighlight(event.currentTarget.checked)} className={`${FOCUS_36} h-4 w-4 accent-slate-900`} />
        إبراز صيغ المستقبل في النص
      </label>
      <div className="mt-3 space-y-2">
        {lines.map((line) => {
          const raw = textOf(line);
          const { speaker, body } = splitSpeaker36(raw);
          const isCue = !speaker && raw.trim().endsWith(":");
          return (
            <p
              key={`${line.s}-${line.i}`}
              dir="ltr"
              lang="en"
              className={isCue ? "text-left text-xs font-bold uppercase tracking-wide text-slate-500" : "text-left text-[15px] leading-7 text-slate-800"}
            >
              {speaker ? (
                <span className="mr-2 inline-block rounded bg-slate-900 px-1.5 py-0.5 align-middle text-[11px] font-bold text-white">{speaker}:</span>
              ) : null}
              {speaker ? " " : null}
              <span className="font-en">{isCue ? body || raw : speaker ? body : render(raw)}</span>
            </p>
          );
        })}
      </div>
    </Card36>
  );
}

export function ReadingLab36({
  id,
  questions,
  answers,
  answerLines,
  analysisHeading,
  analysis,
}: {
  id: string;
  questions: Ref[];
  answers: Ref;
  answerLines: Ref[];
  analysisHeading: Ref;
  analysis: Ref[];
}) {
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const ready = questions.every((_, index) => (drafts[index] ?? "").trim().length > 0);
  return (
    <Card36 tone="warm" eyebrow="أسئلة الفهم" title="أجب عن الأسئلة السبعة ثم اكشف الإجابات">
      <div className="space-y-3">
        {questions.map((question, index) => (
          <div key={`${question.s}-${question.i}`} className="rounded-2xl border border-amber-200 bg-white p-4" data-lab-item={`${id}-${index + 1}`}>
            <p className="text-base font-bold text-slate-900">
              <SourceText36 value={question} />
            </p>
            <label className="mt-2 block">
              <span className="mb-1 block text-xs font-bold text-slate-600">إجابتك بالإنجليزية</span>
              <textarea
                rows={2}
                dir="ltr"
                lang="en"
                value={drafts[index] ?? ""}
                onChange={(event) => { const value = event.currentTarget.value; setDrafts((current) => ({ ...current, [index]: value })); }}
                className={`${FOCUS_36} font-en w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm leading-6 text-slate-900`}
                aria-label={`إجابة السؤال ${index + 1}`}
              />
            </label>
          </div>
        ))}
      </div>
      {!revealed ? (
        <ActionButton36 disabled={!ready} onClick={() => setRevealed(true)}>
          اعرض الإجابات والتحليل النحوي
        </ActionButton36>
      ) : (
        <div className="space-y-3">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-black text-emerald-900">
              <SourceText36 value={answers} />
            </p>
            <div className="mt-1 space-y-1">
              {answerLines.map((ref) => (
                <p key={`${ref.s}-${ref.i}`} className="text-sm leading-7 text-emerald-950">
                  <SourceText36 value={ref} />
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-black text-slate-500">
              <SourceText36 value={analysisHeading} />
            </p>
            <ul className="mt-1 space-y-1">
              {analysis.map((ref) => (
                <li key={`${ref.s}-${ref.i}`} className="text-sm leading-7 text-slate-700">
                  <SourceText36 value={ref} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {!ready ? <p className="text-xs font-bold text-slate-500">أكمل الإجابات السبعة قبل كشف المفتاح.</p> : null}
    </Card36>
  );
}

// ------------------------------------------------------------
// Writing mission
// ------------------------------------------------------------

export function WritingLab36({
  title,
  task,
  intro,
  criteria,
  modelHeading,
  modelLines,
  closing,
}: {
  title: Ref;
  task: Ref;
  intro: Ref;
  criteria: Ref[];
  modelHeading: Ref;
  modelLines: Ref[];
  closing: Ref;
}) {
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const sentences = draft.trim() ? draft.split(/[.!?]+/).filter((part) => part.trim().length > 0).length : 0;
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const signals = [
    { key: "going", label: "be going to", re: /going\s+to/gi },
    { key: "will", label: "will", re: /\bwill\b/gi },
    { key: "wont", label: "won't", re: /\bwon't\b|\bwill\s+not\b/gi },
    { key: "q", label: "سؤال", re: /\?/g },
  ].map((signal) => ({ ...signal, count: (draft.match(signal.re) ?? []).length }));
  const checkedCount = Object.values(checked).filter(Boolean).length;
  return (
    <Card36 tone="warm" eyebrow="مهمة الإنتاج اللغوي" title={<SourceText36 value={title} />}>
      <p className="text-sm font-bold text-slate-700">
        <SourceText36 value={task} />
      </p>
      <p className="text-sm font-bold text-slate-500">
        <SourceText36 value={intro} />
      </p>

      <div className="mt-3 grid gap-2 rounded-2xl border border-amber-200 bg-white p-3 sm:grid-cols-2">
        {criteria.map((criterion, index) => (
          <label key={`${criterion.s}-${criterion.i}`} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
            <input
              type="checkbox"
              checked={!!checked[index]}
              onChange={(event) => {
                const value = event.currentTarget.checked;
                setChecked((current) => ({ ...current, [index]: value }));
              }}
              className={`${FOCUS_36} mt-1 h-4 w-4 shrink-0 accent-slate-900`}
            />
            <span>
              <SourceText36 value={criterion} />
            </span>
          </label>
        ))}
        <p className="sm:col-span-2 text-xs font-bold text-slate-500" aria-live="polite">
          علّمت {checkedCount} من {criteria.length} متطلبات.
        </p>
      </div>

      <label className="mt-3 block">
        <span className="mb-1 block text-sm font-bold text-slate-700">مسودتك بالإنجليزية</span>
        <textarea
          rows={10}
          dir="ltr"
          lang="en"
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          placeholder="Next month, I'm going to…"
          className={`${FOCUS_36} font-en w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left text-base leading-8 text-slate-900`}
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600" aria-live="polite">
        <span className="rounded-lg bg-slate-100 px-2 py-1">
          الجمل: <span dir="ltr" className="font-en tabular-nums">{sentences}</span> / المطلوب 12–15
        </span>
        <span className="rounded-lg bg-slate-100 px-2 py-1">
          الكلمات: <span dir="ltr" className="font-en tabular-nums">{words}</span>
        </span>
        {signals.map((signal) => (
          <span key={signal.key} className="rounded-lg bg-slate-100 px-2 py-1">
            <span className="font-en" dir="ltr">{signal.label}</span>: <span dir="ltr" className="font-en tabular-nums">{signal.count}</span>
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs font-bold text-slate-500">العدادات مساعدة للمراجعة الذاتية فقط؛ لا يصدر النظام حكمًا آليًا على كتابتك.</p>

      <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-black text-slate-500">
          <SourceText36 value={modelHeading} />
        </p>
        <div className="mt-1 space-y-1">
          {modelLines.map((ref) => (
            <p key={`${ref.s}-${ref.i}`} className="text-sm leading-7 text-slate-800">
              <SourceText36 value={ref} />
            </p>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm font-bold text-slate-600">
        <SourceText36 value={closing} />
      </p>
    </Card36>
  );
}
