import { useState, type ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import { SOURCE_SECTIONS_35 } from "./ledger35";
import { DECISION_PRACTICE_ITEMS_35, DETECTIVE_ITEMS_35, AUXILIARY_ITEMS_35, TRANSFORMATION_ITEMS_35, FINAL_BOSS_REQUIREMENTS_35, type PracticeItem35 } from "./practiceData";
import { normalizeAnswer35 } from "./testData";
import type { Slide35 } from "./data";
import { SECTIONS_35, SLIDE_COUNT_35, SCENE_META_35 } from "./data";
import { Card35, ChoiceButton35, English35, FOCUS_35, LtrSentence35, PlatformNote35, SourcePanel35, SourceTable35, SourceUnit35 } from "./kit35";

const source = (id: string) => SOURCE_SECTIONS_35.find((section) => section.id === id)!;
function SourceRoot35({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return <div data-source-section={id} className={className}>{children}</div>;
}

function SourceList35({ id, units, offset = 0, className = "" }: { id: string; units: string[]; offset?: number; className?: string }) {
  return (
    <SourceRoot35 id={id} className={`space-y-1 ${className}`}>
      {units.map((text, index) => <SourceUnit35 key={`${id}-${offset + index}`} text={text} index={offset + index} />)}
    </SourceRoot35>
  );
}

function SourceReveal35({ id, units, revealed, offset }: { id: string; units: string[]; revealed: boolean; offset: number }) {
  return (
    <div data-answer-feedback={id} className="rounded-2xl border border-dashed border-[#d3e3da] bg-[#f7faf6] p-3">
      {revealed ? <div className="space-y-1"><div className="mb-2 rounded-full bg-[#dcebe0] px-3 py-1 text-xs font-black text-[#315d4e]">مفتاح المصدر — بعد المحاولة</div>{units.map((text, index) => <SourceUnit35 key={index} text={text} index={offset + index} />)}</div> : <p className="text-sm font-bold text-[#60716d]">🔒 مفتاح المصدر محفوظ حتى تتحقق من كل الإجابات.</p>}
    </div>
  );
}

function SceneEyebrow35({ slide }: { slide: Slide35 }) {
  const scene = SECTIONS_35.find((candidate) => candidate.id === slide.section)!;
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[.16em] text-[#f5b64a]">
      <span><span className="ml-2 inline-grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white ring-1 ring-[#2fc4ae]/40">{scene.scene}</span> {SCENE_META_35[slide.section].code}</span>
      <span className="rounded-full border border-white/20 px-2.5 py-1 text-white/75">Future Lab · Lesson 35</span>
    </div>
  );
}

function StepFrame35({ slide, children }: { slide: Slide35; children: ReactNode }) {
  const meta = SCENE_META_35[slide.section];
  return (
    <article data-step-id={slide.id} data-source-id={slide.sourceId} className="fl35-enter space-y-4">
      <header className="relative overflow-hidden rounded-3xl bg-[#0d2b46] p-4 text-white shadow-[0_18px_44px_-26px_rgba(4,20,36,.9)] ring-1 ring-white/10 sm:p-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_200px_at_88%_-30%,rgba(47,196,174,.30),transparent_60%),radial-gradient(420px_180px_at_8%_130%,rgba(245,182,74,.16),transparent_55%)]" />
        <div aria-hidden="true" className="fl35-orbit pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full border border-white/10" />
        <div aria-hidden="true" className="fl35-orbit-slow pointer-events-none absolute -top-14 -left-10 h-36 w-36 rounded-full border border-dashed border-[#2fc4ae]/30" />
        <div className="relative">
          <SceneEyebrow35 slide={slide} />
          <h2 className="mt-3 text-xl font-black leading-tight sm:text-2xl md:text-[1.75rem]"><Rich text={slide.title} /></h2>
          {slide.lead ? <p className="mt-2 max-w-3xl text-sm leading-6 text-[#dfe9f2] sm:text-base"><Rich text={slide.lead} /></p> : null}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-black">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/85">الخطوة {slide.step} من {SLIDE_COUNT_35}</span>
            {slide.sourceId !== "cover" ? <span className="rounded-full bg-[#f5b64a]/15 px-2.5 py-1 text-[#f5b64a]">المصدر §{slide.step - 1}</span> : null}
            <span className="rounded-full bg-[#2fc4ae]/15 px-2.5 py-1 text-[#8fe8d8]">{meta.icon} {meta.code}</span>
          </div>
        </div>
      </header>
      {children}
    </article>
  );
}

function ClickableSentence35() {
  const [active, setActive] = useState<number | null>(null);
  const parts = [
    { text: "I", role: "الفاعل" },
    { text: "'m", role: "اختصار am؛ المساعد المناسب لـ I" },
    { text: "going to", role: "جزء من تركيب المستقبل" },
    { text: "learn", role: "الفعل الأساسي V1" },
    { text: "programming.", role: "بقية الجملة / المفعول" },
  ];
  return (
    <Card35 eyebrow="Guided reveal" title="افحص الجملة — لا تخمّن القاعدة">
      <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-x-2 gap-y-2 rounded-2xl border border-[#d5e3e8] bg-white px-4 py-4 text-lg font-black text-[#0d2b46] sm:text-xl">
        <span className="inline-flex items-center" aria-label="Subject and contraction">
          {[0, 1].map((index) => <button key={parts[index].text} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`${FOCUS_35} rounded-lg px-1 py-1 ${active === index ? "bg-[#dcebe5] text-[#164c4a]" : "hover:bg-[#f3f5ef]"}`}><En>{parts[index].text}</En></button>)}
        </span>
        {parts.slice(2).map((part, sliceIndex) => {
          const index = sliceIndex + 2;
          return <button key={part.text} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`${FOCUS_35} rounded-lg px-1.5 py-1 ${active === index ? "bg-[#dcebe5] text-[#164c4a]" : "hover:bg-[#f3f5ef]"}`}><En>{part.text}</En></button>;
        })}
      </div>
      <div className="mt-3 min-h-12 rounded-2xl border border-[#d6e1ea] bg-[#eef4fa] p-3 text-sm font-bold leading-6 text-[#31464e]" aria-live="polite">
        {active === null ? "اختر أي جزء لترى دوره. الشرح الكامل متاح أدناه؛ لا تحتاج إلى استنتاجه وحدك." : <><span className="ml-2 rounded-full bg-[#0d2b46] px-2 py-1 text-xs text-white"><En>{parts[active].text}</En></span><Rich text={parts[active].role} /></>}
      </div>
      <SourcePanel35 id="s2" />
    </Card35>
  );
}

function AuxiliarySelector35() {
  const section = source("s4");
  const [selected, setSelected] = useState<number | null>(null);
  const subjects = section.units.slice(3, 17).filter((_, index) => index % 2 === 0);
  const forms = section.units.slice(4, 17).filter((_, index) => index % 2 === 0);
  const examples = section.units.slice(18, 25);
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Auxiliary selector" title="اختر الفاعل، ثم راقب المساعد المناسب">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {subjects.map((subject, index) => (
            <ChoiceButton35 key={subject} selected={selected === index} onClick={() => setSelected(index)}>
              <En>{subject}</En>
            </ChoiceButton35>
          ))}
        </div>
        <div className="mt-3 min-h-14 rounded-2xl border border-[#c8dcd8] bg-[#edf6f1] p-3" aria-live="polite">
          {selected === null ? <span className="text-sm font-bold text-[#62716f]">اختر أحد الضمائر لرؤية الصيغة.</span> : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#0d8f7f] px-3 py-1 text-xs font-black text-white">الفعل المساعد: <En>{forms[selected]}</En></span>
              <English35 className="text-lg font-black text-[#0d2b46]">{examples[selected]}</English35>
            </div>
          )}
        </div>
      </Card35>
      <SourceRoot35 id="s4" className="space-y-3">
        <SourceUnit35 text={section.units[0]} index={0} />
        <SourceTable35
          ariaLabel="جدول اختيار am و is و are"
          headers={[section.units[1], section.units[2]]}
          rows={Array.from({ length: 7 }, (_, index) => [section.units[3 + index * 2], section.units[4 + index * 2]] as [string, string])}
          sourceUnitOffset={1}
        />
        <div className="rounded-2xl border border-[#dce4dc] bg-white p-3">
          <div className="mb-2 text-xs font-black text-[#4a6070]">أمثلة المصدر + ثبات V1</div>
          {section.units.slice(17).map((text, index) => <SourceUnit35 key={index} text={text} index={17 + index} />)}
        </div>
      </SourceRoot35>
    </div>
  );
}

function SentenceBuilder35() {
  const [subject, setSubject] = useState("");
  const [aux, setAux] = useState("");
  const [verb, setVerb] = useState("");
  const [rest, setRest] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const subjectAux: Record<string, string> = { I: "am", He: "is", "My sister": "is", We: "are", "The students": "are" };
  const verbs = ["organize", "learn", "visit", "start", "create"];
  const rests = ["my desk this evening", "how to cook", "the science exhibition next Saturday", "a photography course", "a school magazine"];
  const assemble = () => {
    setResult("");
    if (!subject || !aux || !verb || !rest) {
      setError("أكمل كل الأجزاء أولًا، ثم ابنِ الجملة.");
      return;
    }
    if (subjectAux[subject] !== aux) {
      setError(`تحقّق من المطابقة: ${subject} يحتاج إلى ${subjectAux[subject]}. عدّل اختيارك وحاول مجددًا.`);
      return;
    }
    setError("");
    setResult(`${subject} ${aux} going to ${verb} ${rest}.`);
  };
  const reset = () => { setSubject(""); setAux(""); setVerb(""); setRest(""); setResult(""); setError(""); };
  const selectClass = `${FOCUS_35} min-h-11 w-full rounded-xl border border-[#c8d6e0] bg-white px-3 text-sm font-bold text-[#0d2b46]`;
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Sentence builder" title="رتّب أجزاء الجملة بنفسك">
        <p className="text-sm leading-6 text-[#56686b]">اختر كل جزء بالترتيب. لن تظهر الجملة النهائية حتى تضغط «ابنِ الجملة».</p>
        <div dir="ltr" className="ltr-row mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="block text-left text-xs font-black text-[#4a6070]">Subject
            <select aria-label="Subject" className={selectClass} value={subject} onChange={(event) => { setSubject(event.target.value); setError(""); setResult(""); }}>
              <option value="">Choose…</option>{Object.keys(subjectAux).map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-left text-xs font-black text-[#4a6070]">am / is / are
            <select aria-label="am is are" className={selectClass} value={aux} onChange={(event) => { setAux(event.target.value); setError(""); setResult(""); }}>
              <option value="">Choose…</option>{["am", "is", "are"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="rounded-xl border border-[#d6e4e8] bg-[#eef5f3] px-3 py-2 text-left text-xs font-black text-[#4a6070]">going to<div className="mt-2 rounded-lg bg-white px-2 py-1 text-sm text-[#0d2b46]" dir="ltr"><En>going to</En></div></div>
          <label className="block text-left text-xs font-black text-[#4a6070]">Base verb — V1
            <select aria-label="Base verb V1" className={selectClass} value={verb} onChange={(event) => { setVerb(event.target.value); setError(""); setResult(""); }}>
              <option value="">Choose…</option>{verbs.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-left text-xs font-black text-[#4a6070]">Rest of sentence
            <select aria-label="Rest of sentence" className={selectClass} value={rest} onChange={(event) => { setRest(event.target.value); setError(""); setResult(""); }}>
              <option value="">Choose…</option>{rests.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={assemble} className={`${FOCUS_35} rounded-xl bg-[#0d8f7f] px-4 py-2.5 text-sm font-black text-white hover:bg-[#0a7466]`}>ابنِ الجملة</button>
          <button type="button" onClick={reset} className={`${FOCUS_35} rounded-xl border border-[#c8d6e0] bg-white px-4 py-2.5 text-sm font-bold text-[#4a6070] hover:bg-[#edf3f9]`}>إعادة الاختيار</button>
        </div>
        {error ? <p role="status" className="mt-3 rounded-xl border border-[#e2c695] bg-[#fbf4e7] p-3 text-sm font-bold text-[#78582d]">{error}</p> : null}
        {result ? <div aria-live="polite"><LtrSentence35 className="mt-3 text-xl"><En>{result}</En></LtrSentence35></div> : null}
      </Card35>
      <SourcePanel35 id="s6" />
    </div>
  );
}

function ContractionStudio35() {
  const section = source("s7");
  const [selected, setSelected] = useState<number | null>(null);
  const pairs = section.units.slice(1, 7).map((line) => line.split(" → ") as [string, string]);
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Contraction studio" title="اختر شكلًا كاملًا أو مختصرًا">
        <div className="grid gap-2 sm:grid-cols-2">
          {pairs.map(([full, contracted], index) => (
            <ChoiceButton35 key={full} selected={selected === index} onClick={() => setSelected(index)}>
              <span dir="ltr" className="font-en">{full}</span>
            </ChoiceButton35>
          ))}
        </div>
        {selected !== null ? (
          <div className="mt-3 grid gap-2 rounded-2xl border border-[#d4dfd6] bg-[#f0f6f2] p-3 sm:grid-cols-2" aria-live="polite">
            <LtrSentence35><En>{pairs[selected][0]}</En></LtrSentence35>
            <LtrSentence35><En>{pairs[selected][1]}</En></LtrSentence35>
          </div>
        ) : null}
      </Card35>
      <SourcePanel35 id="s7" />
    </div>
  );
}

function IntentionTimeline35() {
  const [active, setActive] = useState<number | null>(null);
  const stops = [
    { label: "A WEEK AGO", text: "ليلى قررت الانضمام إلى نادي الرسم." },
    { label: "BEFORE NOW", text: "جهزت أدواتها وسجلت اسمها." },
    { label: "NEXT MONTH", text: "I'm going to join an art club next month." },
  ];
  return (
    <Card35 eyebrow="Decision history" title="الفكرة سبقت لحظة الكلام">
      <div dir="ltr" className="ltr-row grid gap-3 md:grid-cols-3">
        {stops.map((stop, index) => (
          <button type="button" key={stop.label} onClick={() => setActive(index)} aria-pressed={active === index} className={`${FOCUS_35} rounded-2xl border-2 p-3 text-left transition ${active === index ? "border-[#0d8f7f] bg-[#eef5f0]" : "border-[#d8e2ea] bg-white hover:border-[#4d9c8b]"}`}>
            <div className="text-[10px] font-black tracking-[.14em] text-[#b57f22]">{stop.label}</div>
            <div className="mt-2 text-sm font-bold leading-6 text-[#304750]" dir={index === 2 ? "ltr" : "rtl"}>{index === 2 ? <En>{stop.text}</En> : stop.text}</div>
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-12 rounded-xl bg-[#edf3f9] p-3 text-sm font-bold text-[#4a6070]" aria-live="polite">
        {active === null ? "اختر محطة على الخط الزمني لرؤية ما حدث قبل لحظة الحديث." : <Rich text={stops[active].text} />}
      </div>
    </Card35>
  );
}

function CertaintyCheckpoint35() {
  const [choice, setChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  return (
    <Card35 eyebrow="Plan ≠ guarantee" title="هل تعني الخطة أن الحدث سيقع حتمًا؟">
      <p className="text-sm text-[#59696b]">اختر القراءة التي تعبّر عنها الجملة.</p>
      <LtrSentence35 className="mt-3"><En>I'm going to start exercising next week.</En></LtrSentence35>
      <div className="mt-3 flex flex-wrap gap-2">
        <ChoiceButton35 selected={choice === "guarantee"} onClick={() => { setChoice("guarantee"); setChecked(false); }}>ضمان مطلق</ChoiceButton35>
        <ChoiceButton35 selected={choice === "intention"} onClick={() => { setChoice("intention"); setChecked(false); }}>نية مسبقة، والنتيجة ليست مضمونة</ChoiceButton35>
      </div>
      <button type="button" disabled={!choice} onClick={() => setChecked(true)} className={`${FOCUS_35} mt-3 rounded-xl bg-[#0d2b46] px-4 py-2 text-sm font-black text-white disabled:opacity-40`}>تحقق من فهمك</button>
      {checked ? <p role="status" className="mt-3 rounded-xl border border-[#d9c49a] bg-[#fbf4e7] p-3 text-sm font-bold text-[#694e2d]">{choice === "intention" ? "صحيح: الخطة تعبّر عن نية، ولا تضمن وقوع الحدث." : "ليست ضمانًا مطلقًا؛ قد تمنع الظروف تنفيذ الخطة."}</p> : null}
    </Card35>
  );
}

function ConversationStudio35() {
  const section = source("s10");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [turn, setTurn] = useState(0);
  const dialogue = section.units.slice(1, 7);
  const arabic = section.units.slice(8, 14);
  const analysis = section.units.slice(15, 23);
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Weekend Plans · full transcript" title="استمع إلى إيقاع الخطة في الحوار">
        <SourceRoot35 id="s10" className="space-y-3">
          <SourceUnit35 text={section.units[0]} index={0} />
          <div className="mb-1 flex flex-wrap gap-2">
            <ChoiceButton35 selected={highlight === 0} onClick={() => setHighlight(0)}>Nora</ChoiceButton35>
            <ChoiceButton35 selected={highlight === 1} onClick={() => setHighlight(1)}>Adam</ChoiceButton35>
            <button type="button" onClick={() => { const next = (turn + 1) % dialogue.length; setTurn(next); setHighlight(dialogue[next].startsWith("Nora:") ? 0 : 1); }} className={`${FOCUS_35} rounded-xl border border-[#cfdce5] bg-white px-3 py-2 text-sm font-bold text-[#304750] hover:bg-[#eff6f2]`}>أبرز السطر التالي</button>
          </div>
          <div className="space-y-2" dir="ltr">
            {dialogue.map((line, index) => {
              const nora = line.startsWith("Nora:");
              const speaker = nora ? 0 : 1;
              return (
                <button type="button" key={line} data-source-unit={index + 1} onClick={() => { setHighlight(speaker); setTurn(index); }} className={`${FOCUS_35} block w-full rounded-2xl border px-3 py-3 text-left transition ${speaker === 0 ? "border-[#d7dedc] bg-white" : "border-[#c7d9d5] bg-[#edf4f1]"} ${highlight === speaker || turn === index ? "ring-2 ring-[#57ab98]" : ""}`}>
                  <En className="text-sm font-bold text-[#0d2b46]">{line}</En>
                </button>
              );
            })}
          </div>
          <div className="mt-4 border-t border-[#dfe8f0] pt-3">
            <SourceUnit35 text={section.units[7]} index={7} />
            <div className="mt-2 space-y-1">{arabic.map((line, index) => <SourceUnit35 key={index} text={line} index={8 + index} />)}</div>
          </div>
          <div className="mt-4 rounded-2xl border border-[#d6e1ea] bg-[#eef4fa] p-3">
            <SourceUnit35 text={section.units[14]} index={14} />
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="rounded-xl bg-white p-2" data-source-unit={15 + index * 2}>
                  <div dir="ltr" className="font-en text-sm font-black text-[#0d2b46]">{analysis[index * 2]}</div>
                  <div data-source-unit={16 + index * 2} className="mt-1 text-sm text-[#4a6070]">{analysis[index * 2 + 1]}</div>
                </div>
              ))}
            </div>
          </div>
        </SourceRoot35>
      </Card35>
    </div>
  );
}

function EvidenceScene35({ id }: { id: "s11" | "s12" }) {
  const section = source(id);
  const [open, setOpen] = useState<number | null>(null);
  if (id === "s11") {
    const cases = [
      { evidence: section.units[3], sentence: section.units[5], translation: section.units[6] },
      { evidence: section.units[10], sentence: section.units[12], translation: section.units[13] },
    ];
    return (
      <div className="space-y-4">
        <Card35 eyebrow="Evidence → prediction" title="انظر أولًا إلى الدليل الحاضر">
          <div className="grid gap-3 md:grid-cols-2">
            {cases.map((item, index) => (
              <button key={item.sentence} type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} className={`${FOCUS_35} rounded-2xl border-2 border-[#d6e1ea] bg-white p-3 text-right transition hover:border-[#57ab98]`}>
                <div className="text-[10px] font-black uppercase tracking-[.14em] text-[#b57f22]">Present evidence</div>
                <div className="mt-1 text-sm leading-6 text-[#344b52]">{item.evidence}</div>
                {open === index ? <div className="mt-3 border-t border-[#e5dfd4] pt-3"><div dir="ltr" className="font-en text-left font-black text-[#0d2b46]">{item.sentence}</div><div className="mt-1 text-sm text-[#4a6070]">{item.translation}</div></div> : <div className="mt-2 text-xs font-black text-[#0d8f7f]">Reveal the prediction ↓</div>}
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-[#edf3f9] px-3 py-2 text-sm font-black text-[#394f54]">Present evidence <span className="px-1 text-[#d08a24]">→</span> Reasonable prediction about the future</div>
        </Card35>
        <SourcePanel35 id="s11" />
      </div>
    );
  }
  const groups = [
    { evidence: section.units[0], translation: section.units[1], prediction: section.units[2], predictionAr: section.units[3] },
    { evidence: section.units[4], translation: section.units[5], prediction: section.units[6], predictionAr: section.units[7] },
    { evidence: section.units[8], translation: section.units[9], prediction: section.units[10], predictionAr: section.units[11] },
    { evidence: section.units[12], translation: section.units[13], prediction: section.units[14], predictionAr: section.units[15] },
  ];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Present evidence" title="اضغط على كل دليل، ثم اقرأ النتيجة المحتملة">
        <div className="grid gap-3 sm:grid-cols-2">
          {groups.map((group, index) => (
            <button type="button" key={group.prediction} onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} className={`${FOCUS_35} rounded-2xl border border-[#d6e1ea] bg-white p-3 text-right hover:border-[#57ab98]`}>
              <div className="text-xs font-black text-[#b57f22]">Evidence</div>
              <div dir="ltr" className="mt-1 text-left font-en text-sm font-black text-[#0d2b46]">{group.evidence}</div>
              <div className="mt-1 text-sm text-[#4a6070]">{group.translation}</div>
              {open === index ? <div className="mt-3 rounded-xl bg-[#eef4f0] p-2"><div dir="ltr" className="font-en text-left font-black text-[#0d8f7f]">{group.prediction}</div><div className="mt-1 text-sm text-[#4a6070]">{group.predictionAr}</div></div> : <div className="mt-2 text-xs font-black text-[#0d8f7f]">Reveal prediction</div>}
            </button>
          ))}
        </div>
      </Card35>
      <SourcePanel35 id="s12" />
    </div>
  );
}

function NuanceCheck35() {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  return (
    <Card35 eyebrow="Meaning, not a hard boundary" title="هل يصبح WILL خطأً إذا وُجد دليل؟">
      <div className="flex flex-wrap gap-2">
        <ChoiceButton35 selected={selected === "forbidden"} onClick={() => { setSelected("forbidden"); setChecked(false); }}>نعم، الدليل يمنع WILL دائمًا</ChoiceButton35>
        <ChoiceButton35 selected={selected === "overlap"} onClick={() => { setSelected("overlap"); setChecked(false); }}>لا؛ يمكن أن تتداخل الصيغتان بحسب المقصود</ChoiceButton35>
      </div>
      <button type="button" disabled={!selected} onClick={() => setChecked(true)} className={`${FOCUS_35} mt-3 rounded-xl bg-[#0d2b46] px-4 py-2 text-sm font-black text-white disabled:opacity-40`}>تحقق</button>
      {checked ? <div role="status" className="mt-3 rounded-xl border border-[#c9d8d2] bg-[#eef4f0] p-3 text-sm font-bold text-[#31524f]">{selected === "overlap" ? "صحيح: هذا تمييز تعليمي مفيد، وليس قانونًا يمنع will عند وجود دليل. يغيّر السياق وما يريد المتحدث إبرازه الاختيار." : "هذا تعميم أقوى من القاعدة. قد تتداخل الصيغتان في اللغة الطبيعية؛ السياق والتركيز هما المهمان."}</div> : null}
    </Card35>
  );
}

function NegativePosition35() {
  const [choice, setChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  return (
    <Card35 eyebrow="Negative form" title="أين نضع not؟">
      <LtrSentence35><En>She is going to attend the workshop.</En></LtrSentence35>
      <div className="mt-3 flex flex-wrap gap-2">
        <ChoiceButton35 selected={choice === "after-aux"} onClick={() => { setChoice("after-aux"); setChecked(false); }}>بعد am / is / are</ChoiceButton35>
        <ChoiceButton35 selected={choice === "before-going"} onClick={() => { setChoice("before-going"); setChecked(false); }}>قبل going to</ChoiceButton35>
      </div>
      <button type="button" disabled={!choice} onClick={() => setChecked(true)} className={`${FOCUS_35} mt-3 rounded-xl bg-[#0d2b46] px-4 py-2 text-sm font-black text-white disabled:opacity-40`}>حوّل الجملة</button>
      {checked ? <div className="mt-3 space-y-2" role="status"><LtrSentence35 className={choice === "after-aux" ? "border-[#98b9aa] bg-[#eef5f0]" : "border-[#d6e1ea]"}><En>She is not going to attend the workshop.</En></LtrSentence35><p className="text-sm font-bold text-[#4a6070]">ضع not بعد الفعل المساعد، ولا نحتاج do أو does.</p></div> : null}
    </Card35>
  );
}

function QuestionInversion35() {
  const [choice, setChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  return (
    <Card35 eyebrow="Question inversion" title="انقل المساعد إلى بداية السؤال">
      <p className="text-sm font-bold text-[#56686b]">اختر ترتيب السؤال الصحيح قبل رؤية الصيغة المحوّلة.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <ChoiceButton35 selected={choice === "aux-first"} onClick={() => { setChoice("aux-first"); setChecked(false); }}><En>Is she going to attend the workshop?</En></ChoiceButton35>
        <ChoiceButton35 selected={choice === "subject-first"} onClick={() => { setChoice("subject-first"); setChecked(false); }}><En>She is going to attend the workshop?</En></ChoiceButton35>
      </div>
      <button type="button" disabled={!choice} onClick={() => setChecked(true)} className={`${FOCUS_35} mt-3 rounded-xl bg-[#0d2b46] px-4 py-2 text-sm font-black text-white disabled:opacity-40`}>اعرض التحويل</button>
      {checked ? <div className="mt-3 rounded-xl bg-[#eef4f0] p-3"><LtrSentence35><En>Is she going to attend the workshop?</En></LtrSentence35><p className="mt-2 text-sm font-bold text-[#4a6070]">تبدأ الصيغة بـ Am/Is/Are، ثم الفاعل، ثم going to + V1.</p></div> : null}
    </Card35>
  );
}

function ShortAnswerMatcher35() {
  const [choice, setChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  return (
    <Card35 eyebrow="Short-answer matcher" title="طابق المساعد في السؤال مع الجواب القصير">
      <LtrSentence35><En>Are you going to study tonight?</En></LtrSentence35>
      <div className="mt-3 flex flex-wrap gap-2">
        <ChoiceButton35 selected={choice === "correct"} onClick={() => { setChoice("correct"); setChecked(false); }}><En>Yes, I am.</En></ChoiceButton35>
        <ChoiceButton35 selected={choice === "wrong"} onClick={() => { setChoice("wrong"); setChecked(false); }}><En>Yes, I will.</En></ChoiceButton35>
        <ChoiceButton35 selected={choice === "negative"} onClick={() => { setChoice("negative"); setChecked(false); }}><En>No, I'm not.</En></ChoiceButton35>
      </div>
      <button type="button" disabled={!choice} onClick={() => setChecked(true)} className={`${FOCUS_35} mt-3 rounded-xl bg-[#0d2b46] px-4 py-2 text-sm font-black text-white disabled:opacity-40`}>تحقق من المطابقة</button>
      {checked ? <p role="status" className="mt-3 rounded-xl border border-[#c9d8d2] bg-[#eef4f0] p-3 text-sm font-bold text-[#31524f]">مع “Are you…?” تكون الإجابة القصيرة “Yes, I am.” أو “No, I'm not.” — أما “Yes, I will.” فليست الإجابة القصيرة النحوية المباشرة المطلوبة هنا.</p> : null}
    </Card35>
  );
}

function WhoComparison35() {
  const [active, setActive] = useState<number | null>(null);
  const rows = [
    { q: "Who is going to lead the team?", answer: "Who = subject / الفاعل" },
    { q: "Who are you going to invite?", answer: "you = subject; who = person invited / المفعول" },
  ];
  return (
    <Card35 eyebrow="WHO: subject or object?" title="بدّل المنظور، ولاحظ دور WHO">
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map((row, index) => <ChoiceButton35 key={row.q} selected={active === index} onClick={() => setActive(index)}><En>{row.q}</En></ChoiceButton35>)}
      </div>
      {active !== null ? <div className="mt-3 rounded-xl bg-[#f0f6f2] p-3" aria-live="polite"><LtrSentence35><En>{rows[active].q}</En></LtrSentence35><p className="mt-2 text-sm font-bold text-[#42595c]">{rows[active].answer}</p></div> : null}
    </Card35>
  );
}

function TimeExpressions35() {
  const section = source("s21");
  const rows = section.units.slice(1, 10).map((line) => line.split(" = ") as [string, string]);
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Time map" title="تعبيرات زمنية شائعة — الوقت لا يفرض الصيغة">
        <SourceTable35 ariaLabel="التعبيرات الزمنية ومعانيها" headers={["التعبير", "المعنى"]} rows={rows} />
      </Card35>
      <SourcePanel35 id="s21" />
    </div>
  );
}

function BeInspection35() {
  const [open, setOpen] = useState(false);
  return (
    <Card35 eyebrow="GOING TO + BE" title="افتح دور be بعد going to">
      <LtrSentence35><En>I'm going to be a doctor.</En></LtrSentence35>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className={`${FOCUS_35} mt-3 rounded-xl border border-[#a9d4c7] bg-white px-4 py-2 text-sm font-black text-[#0d8f7f] hover:bg-[#edf6f1]`}>{open ? "إخفاء التحليل" : "افحص be"}</button>
      {open ? <div className="mt-3 rounded-xl border border-[#c9d8d2] bg-[#eef4f0] p-3"><p className="text-sm font-bold text-[#31524f]">be هو الفعل الأساسي V1 بعد going to. لا نكرر is أو am بعد going to.</p><LtrSentence35 className="mt-2"><En>She is going to be happy.</En></LtrSentence35></div> : null}
    </Card35>
  );
}

function ExistenceForms35() {
  const section = source("s23");
  const rows = section.units.slice(9, 17);
  return (
    <Card35 eyebrow="Future existence" title="وجود شيء واحد أو أشياء متعددة في المستقبل">
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map((line, index) => (
          <div key={index} className={`rounded-xl border p-3 ${index === 0 || index === 2 ? "border-[#c7d8d3] bg-[#eef4f0]" : "border-[#d8e2ea] bg-white"}`}>
            {index % 2 === 0 ? <div dir="ltr" className="font-en text-left text-sm font-black text-[#0d2b46]">{line}</div> : <div className="mt-1 text-sm text-[#4a6070]">{line}</div>}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#0d2b46] px-3 py-1 text-xs font-black text-white"><En>There is going to be…</En></span>
        <span className="rounded-full bg-[#0d8f7f] px-3 py-1 text-xs font-black text-white"><En>There are going to be…</En></span>
      </div>
    </Card35>
  );
}

function WillGoingToTable35() {
  const section = source("s24");
  const [selected, setSelected] = useState<number | null>(null);
  const rows: [string, string][] = Array.from({ length: 6 }, (_, index) => [section.units[3 + index * 2], section.units[4 + index * 2]] as [string, string]);
  const sourceExamples = ["قرار يُتخذ في لحظة الكلام", "نية أو خطة موجودة مسبقًا", "وعد", "عرض مساعدة لحظي", "توقع مبني على رأي عام", "توقع نبرز فيه دليلًا حاضرًا"];
  const explanation = ["قرار الآن نموذجيًا → WILL", "خطة سابقة نموذجيًا → BE GOING TO", "وعد نموذجيًا → WILL", "عرض مساعدة لحظي → WILL", "رأي/اعتقاد عام → WILL", "إبراز دليل حاضر → BE GOING TO"];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Typical uses" title="جدول المعنى — استخدامات شائعة وليست حدودًا صارمة">
        <SourceRoot35 id="s24" className="space-y-3">
          <SourceUnit35 text={section.units[0]} index={0} />
          <SourceTable35 ariaLabel="مقارنة WILL و BE GOING TO" headers={[section.units[1], section.units[2]]} rows={rows} sourceUnitOffset={1} />
          <SourceUnit35 text={section.units[15]} index={15} />
        </SourceRoot35>
        <div className="mt-4">
          <div className="mb-2 text-xs font-black text-[#4a6070]">اختر دافع المتحدث لرؤية الصيغة النموذجية</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {sourceExamples.map((label, index) => <ChoiceButton35 key={label} selected={selected === index} onClick={() => setSelected(index)}><Rich text={label} /></ChoiceButton35>)}
          </div>
          {selected !== null ? <p role="status" className="mt-3 rounded-xl border border-[#c9d8d2] bg-[#eef4f0] p-3 text-sm font-black text-[#31524f]">{explanation[selected]}</p> : null}
        </div>
      </Card35>
    </div>
  );
}

function BakerySimulator35() {
  const section = source("s25");
  const [selected, setSelected] = useState<number | null>(null);
  const scenario1 = section.units.slice(0, 10);
  const scenario2 = section.units.slice(10);
  const groups = [scenario1, scenario2];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Decision history simulator" title="نفس فعل go، لكن زمن القرار مختلف">
        <p className="text-sm leading-6 text-[#59696b]">اقرأ المشهد، ثم اختر ما إذا كان القرار وليد اللحظة أو نية سابقة. بعد اختيارك يظهر الرد الأصلي.</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {groups.map((lines, index) => (
            <button key={index} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`${FOCUS_35} rounded-2xl border-2 p-3 text-right transition ${selected === index ? "border-[#0d8f7f] bg-[#eef4f0]" : "border-[#d6e1ea] bg-white hover:border-[#57ab98]"}`}>
              <div className="text-[10px] font-black uppercase tracking-[.14em] text-[#b57f22]">{index === 0 ? "Decision now" : "Prior plan"}</div>
              {lines.filter((line) => /[A-Za-z]/.test(line)).slice(0, 2).map((line) => <div key={line} dir="ltr" className="mt-2 text-left font-en text-sm font-black text-[#0d2b46]">{line}</div>)}
              {selected === index ? <div className="mt-2 space-y-1">{lines.map((line, li) => <SourceUnit35 key={li} text={line} index={index === 0 ? li : 10 + li} />)}</div> : null}
            </button>
          ))}
        </div>
        {selected !== null ? <p className="mt-3 rounded-xl bg-[#edf3f9] p-3 text-sm font-bold text-[#4a5e60]">{selected === 0 ? "سياق طارئ وقرار فوري → الصيغة النموذجية: WILL." : "النية موجودة منذ الصباح → الصيغة النموذجية: BE GOING TO."}</p> : null}
      </Card35>
      <SourcePanel35 id="s25" />
    </div>
  );
}

function PredictionSimulator35() {
  const section = source("s26");
  const [selected, setSelected] = useState<number | null>(null);
  const cases = [
    { title: "General opinion", lines: section.units.slice(1, 6), form: "WILL — رأي أو اعتقاد عام." },
    { title: "Present evidence", lines: section.units.slice(6, 14), form: "BE GOING TO — دليل حاضر ظاهر." },
  ];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Opinion or evidence?" title="أي جزء من الموقف يوجّه التوقع؟">
        <div className="grid gap-3 sm:grid-cols-2">
          {cases.map((item, index) => (
            <ChoiceButton35 key={item.title} selected={selected === index} onClick={() => setSelected(index)} className="min-h-16"><En>{item.title}</En></ChoiceButton35>
          ))}
        </div>
        {selected !== null ? <div className="mt-3 rounded-2xl bg-[#f0f6f2] p-3"><div className="space-y-1">{cases[selected].lines.map((line, index) => <SourceUnit35 key={index} text={line} index={selected === 0 ? index + 1 : index + 6} />)}</div><p role="status" className="mt-3 font-black text-[#0d8f7f]">{cases[selected].form}</p></div> : null}
      </Card35>
      <SourcePanel35 id="s26" />
    </div>
  );
}

function MotionOrFuture35() {
  const section = source("s27");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const lines = [section.units[2], section.units[6], section.units[13], section.units[15]];
  const correct = ["movement", "future", "movement", "future"];
  const translations = [section.units[3], section.units[7], "بعد to لدينا اسم مكان.", "بعد going to لدينا الفعل الأساسي play."];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Construction or movement?" title="صنّف ما يأتي بعد to">
        <p className="text-sm leading-6 text-[#59696b]">اختَر ما إذا كانت العبارة تصف وجهة حركة أم تركيبًا مستقبليًا.</p>
        <div className="mt-3 space-y-3">
          {lines.map((line, index) => (
            <div key={line} className="rounded-2xl border border-[#d6e1ea] bg-white p-3">
              <div dir="ltr" className="font-en text-left font-black text-[#0d2b46]">{line}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <ChoiceButton35 selected={answers[index] === "movement"} onClick={() => { setAnswers((old) => ({ ...old, [index]: "movement" })); setChecked((old) => ({ ...old, [index]: false })); }}>وجهة حركة</ChoiceButton35>
                <ChoiceButton35 selected={answers[index] === "future"} onClick={() => { setAnswers((old) => ({ ...old, [index]: "future" })); setChecked((old) => ({ ...old, [index]: false })); }}>going to + V1 (مستقبل)</ChoiceButton35>
                <button type="button" disabled={!answers[index]} onClick={() => setChecked((old) => ({ ...old, [index]: true }))} className={`${FOCUS_35} rounded-xl bg-[#0d2b46] px-3 py-2 text-xs font-black text-white disabled:opacity-40`}>تحقق</button>
              </div>
              {checked[index] ? <p role="status" className={`mt-2 rounded-lg p-2 text-sm font-bold ${answers[index] === correct[index] ? "bg-[#eef4f0] text-[#31524f]" : "bg-[#fbf4e7] text-[#78582d]"}`}>{answers[index] === correct[index] ? "صحيح. " : `المعنى الأنسب هنا: ${correct[index] === "movement" ? "وجهة حركة" : "تعبير مستقبلي"}. `}{translations[index]}</p> : null}
            </div>
          ))}
        </div>
      </Card35>
      <SourcePanel35 id="s27" />
    </div>
  );
}

function PracticeLab35({
  id,
  items,
  mode,
}: {
  id: "s28" | "s29" | "s30";
  items: PracticeItem35[];
  mode: "sentence" | "word";
}) {
  const section = source(id);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const allChecked = items.every((item) => checked[item.n]);
  const allFilled = items.every((item) => (answers[item.n] ?? "").trim().length > 0);
  const acceptedFor = (item: PracticeItem35) => {
    if (id === "s30" && (item.n === 2 || item.n === 5)) {
      return [item.answer, item.answer.replace("isn't", "is not").replace("aren't", "are not")];
    }
    return [item.answer];
  };
  const checkOne = (item: PracticeItem35) => setChecked((old) => ({ ...old, [item.n]: true }));
  return (
    <SourceRoot35 id={id} className="space-y-4">
      <Card35 eyebrow="Try · then check" title={section.title}>
        <SourceUnit35 text={section.units[0]} index={0} />
        {items.map((item) => {
          const value = answers[item.n] ?? "";
          const ok = acceptedFor(item).some((answer) => normalizeAnswer35(answer) === normalizeAnswer35(value));
          return (
            <div key={item.n} className="mt-3 rounded-2xl border border-[#d6e1ea] bg-white p-3" data-practice-item={item.n}>
              <SourceUnit35 text={item.prompt} index={item.n} />
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <label className="sr-only" htmlFor={`${id}-answer-${item.n}`}>إجابتك للسؤال {item.n}</label>
                <input id={`${id}-answer-${item.n}`} type="text" dir="ltr" value={value} onChange={(event) => { setAnswers((old) => ({ ...old, [item.n]: event.target.value })); setChecked((old) => ({ ...old, [item.n]: false })); }} className={`${FOCUS_35} min-w-0 flex-1 rounded-xl border border-[#c8d6e0] bg-white px-3 py-2 text-base font-en text-[#0d2b46]`} placeholder={mode === "word" ? "am / is / are" : "Type your answer"} />
                <button type="button" disabled={!value.trim() || checked[item.n]} onClick={() => checkOne(item)} className={`${FOCUS_35} rounded-xl bg-[#0d8f7f] px-4 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40`}>تحقق</button>
              </div>
              {checked[item.n] ? (
                <div role="status" className={`mt-3 rounded-xl border p-3 ${ok ? "border-[#c9d8d2] bg-[#eef4f0]" : "border-[#e2c695] bg-[#fbf4e7]"}`}>
                  <div className={`text-sm font-black ${ok ? "text-[#31524f]" : "text-[#78582d]"}`}>{ok ? "إجابة صحيحة" : "راجع الصيغة المناسبة"}</div>
                  <div className="mt-1 text-xs font-black text-[#66777a]">الإجابة من مفتاح المصدر:</div>
                  <div dir="ltr" className="mt-1 font-en font-black text-[#0d2b46]">{item.answer}</div>
                  <div className="mt-1 text-sm leading-6 text-[#4a6070]"><PlatformTag text="تفسير تعليمي من إعداد المنصة" /> <Rich text={item.explanation} /></div>
                </div>
              ) : null}
            </div>
          );
        })}
        {allFilled && !allChecked ? <p className="mt-3 rounded-xl bg-[#edf3f9] p-3 text-sm font-bold text-[#4a6070]">تحقّق من كل بند لرؤية مفتاح المصدر كاملًا.</p> : null}
      </Card35>
      <SourceReveal35 id={id} units={section.revealUnits ?? []} revealed={allChecked} offset={section.units.length} />
    </SourceRoot35>
  );
}

function DecisionPractice35() {
  const section = source("s31");
  const [choices, setChoices] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const allChecked = DECISION_PRACTICE_ITEMS_35.every((item) => checked[item.n]);
  const choiceLabels = ["will", "be going to", "won't"];
  return (
    <SourceRoot35 id="s31" className="space-y-4">
      <Card35 eyebrow="Meaning simulator · source situations" title="اختر الأنسب في كل موقف، ثم اكشف سبب الاختيار">
        <SourceUnit35 text={section.units[0]} index={0} />
        <PlatformNote35><Rich text="هذه إجابات نموذجية بحسب القرائن التي يعطيها كل موقف؛ لا تعني أن الصيغة الأخرى مستحيلة في كل سياق." /></PlatformNote35>
        <div className="mt-3 space-y-3">
          {DECISION_PRACTICE_ITEMS_35.map((item) => {
            const choice = choices[item.n];
            const isCorrect = choice === item.family;
            const start = item.n === 1 ? 1 : item.n === 2 ? 3 : item.n === 3 ? 4 : item.n === 4 ? 5 : item.n === 5 ? 7 : item.n === 6 ? 8 : item.n === 7 ? 9 : 10;
            return (
              <div key={item.n} className="rounded-2xl border border-[#d6e1ea] bg-white p-3" data-practice-item={item.n}>
                {item.promptLines.map((line, index) => <SourceUnit35 key={index} text={line} index={start + index} />)}
                <div className="mt-2 flex flex-wrap gap-2">
                  {choiceLabels.map((label) => <ChoiceButton35 key={label} selected={choice === (label === "be going to" ? "going-to" : label === "won't" ? "wont" : "will")} onClick={() => { setChoices((old) => ({ ...old, [item.n]: label === "be going to" ? "going-to" : label === "won't" ? "wont" : "will" })); setChecked((old) => ({ ...old, [item.n]: false })); }}><En>{label}</En></ChoiceButton35>)}
                  <button type="button" disabled={!choice || checked[item.n]} onClick={() => setChecked((old) => ({ ...old, [item.n]: true }))} className={`${FOCUS_35} rounded-xl bg-[#0d2b46] px-3 py-2 text-xs font-black text-white disabled:opacity-40`}>تحقق</button>
                </div>
                {checked[item.n] ? <div role="status" className={`mt-3 rounded-xl border p-3 ${isCorrect ? "border-[#c9d8d2] bg-[#eef4f0]" : "border-[#e2c695] bg-[#fbf4e7]"}`}>
                  <div className="text-xs font-black text-[#66777a]">الإجابة النموذجية في المصدر</div>
                  <div dir="ltr" className="mt-1 font-en font-black text-[#0d2b46]">{item.answer}</div>
                  <div className="mt-2 text-sm font-bold leading-6 text-[#4a6070]"><PlatformTag text="شرح المصدر" /> <Rich text={item.explanation} /></div>
                  {!isCorrect ? <p className="mt-1 text-xs font-bold text-[#78582d]">الاختيار الذي حددته ليس الأنسب للقرينة الواردة؛ هذا لا يعني أن الصيغتين لا تتداخلان في سياقات أخرى.</p> : null}
                </div> : null}
              </div>
            );
          })}
        </div>
      </Card35>
      <SourceReveal35 id="s31" units={section.revealUnits ?? []} revealed={allChecked} offset={section.units.length} />
    </SourceRoot35>
  );
}

function BothFormsPanel35() {
  const section = source("s32");
  const [selected, setSelected] = useState<number | null>(null);
  const examples = [section.units[1], section.units[4], section.units[7]];
  const meanings = ["توقع / اعتقاد", "خطة موجودة لدى المدرسة", "إعلان عن حدث مستقبلي"];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Both can work" title="غيّر المعنى المقصود، فتتغير الصيغة المناسبة">
        <div className="grid gap-2 md:grid-cols-3">
          {examples.map((example, index) => <ChoiceButton35 key={example} selected={selected === index} onClick={() => setSelected(index)}><En>{meanings[index]}</En></ChoiceButton35>)}
        </div>
        {selected !== null ? <div className="mt-3 rounded-2xl border border-[#c2dbd2] bg-[#eef4f0] p-3" aria-live="polite"><LtrSentence35><En>{examples[selected]}</En></LtrSentence35><p className="mt-2 text-sm font-bold text-[#31524f]">{meanings[selected]}: قد تكون الجملة مناسبة في هذا السياق. الصيغتان ليستا متعارضتين في كل استعمال.</p></div> : null}
      </Card35>
      <SourcePanel35 id="s32" />
    </div>
  );
}

function ReadingStudio35() {
  const section = source("s33");
  const [answers, setAnswers] = useState<string[]>(Array(7).fill(""));
  const [revealed, setRevealed] = useState(false);
  const textUnits = section.units.slice(1, 18);
  const questionStart = 19;
  const allAnswered = answers.every((answer) => answer.trim().length > 0);
  return (
    <SourceRoot35 id="s33" className="space-y-4">
      <Card35 eyebrow="Reading canvas" title="A Big Plan for the School">
        <SourceUnit35 text={section.units[0]} index={0} />
        <div className="space-y-2">
          {textUnits.map((line, index) => {
            const speaker = line.startsWith("Maya ") || line.startsWith("Daniel ") || line.startsWith("Their teacher ");
            return <div key={index} className={`rounded-xl ${speaker ? "border-r-4 border-[#d08a24] bg-[#fbf7ee]" : ""}`}><SourceUnit35 text={line} index={index + 1} /></div>;
          })}
        </div>
      </Card35>
      <Card35 eyebrow="Comprehension · attempt before reveal" title="أجب عن الأسئلة السبعة، ثم قارن بمفتاح المصدر">
        <SourceUnit35 text={section.units[18]} index={18} />
        {section.units.slice(questionStart, questionStart + 7).map((question, index) => (
          <div key={question} className="mt-3 rounded-2xl border border-[#d6e1ea] bg-white p-3">
            <SourceUnit35 text={question} index={questionStart + index} />
            <label className="sr-only" htmlFor={`l35-reading-${index}`}>إجابتك عن السؤال {index + 1}</label>
            <textarea id={`l35-reading-${index}`} dir="auto" rows={2} disabled={revealed} value={answers[index]} onChange={(event) => setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? event.target.value : value))} className={`${FOCUS_35} mt-2 w-full resize-y rounded-xl border border-[#c8d6e0] bg-[#fdfeff] px-3 py-2 text-sm leading-6 text-[#0d2b46]`} placeholder="اكتب إجابتك هنا…" />
          </div>
        ))}
        <button type="button" disabled={!allAnswered || revealed} onClick={() => setRevealed(true)} className={`${FOCUS_35} mt-3 rounded-xl bg-[#0d8f7f] px-4 py-2.5 text-sm font-black text-white disabled:opacity-40`}>تحقق من الفهم واعرض الإجابات</button>
        {revealed ? <div className="mt-4 space-y-3" data-answer-feedback="s33">
          <div className="rounded-full bg-[#dcebe0] px-3 py-1 text-xs font-black text-[#315d4e]">الإجابات والتحليل النحوي — من المصدر</div>
          {section.revealUnits!.map((line, index) => <SourceUnit35 key={index} text={line} index={section.units.length + index} />)}
          <p className="rounded-xl bg-[#edf3f9] p-3 text-sm font-bold text-[#4a6070]">قارن المعنى في إجابتك بالمفتاح؛ لا يلزم أن تستخدم الكلمات نفسها حرفيًا.</p>
        </div> : <p className="mt-2 text-xs font-bold text-[#718080]">املأ الأسطر السبعة لتفتح الإجابات والتحليل.</p>}
      </Card35>
    </SourceRoot35>
  );
}

function FinalBossWorkspace35() {
  const [paragraph, setParagraph] = useState("");
  const [checked, setChecked] = useState<boolean[]>(Array(FINAL_BOSS_REQUIREMENTS_35.length).fill(false));
  const sentenceCount = paragraph.trim() ? (paragraph.trim().match(/[.!?]+(?=\s|$)/g) ?? []).length : 0;
  const requirementLabels = [
    "4 جمل BE GOING TO لخطط سابقة",
    "جملتان BE GOING TO لتوقع مبني على دليل",
    "جملتان WILL لتوقع أو اعتقاد",
    "جملة WILL لقرار لحظي",
    "وعد واحد باستخدام WON'T",
    "سؤال يبدأ بـ Are you going to...?",
    "سؤال يبدأ بـ What are you going to...?",
    "3 تعبيرات زمنية مختلفة على الأقل",
  ];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Final Boss · your own writing" title="My Future Plans and Predictions">
        <p className="text-sm font-bold leading-6 text-[#59696b]">اكتب فقرتك بنفسك. مساحة الكتابة فارغة عمدًا؛ لن نملأها نيابةً عنك.</p>
        <label className="sr-only" htmlFor="l35-final-boss-writing">My Future Plans and Predictions</label>
        <textarea id="l35-final-boss-writing" dir="ltr" rows={9} value={paragraph} onChange={(event) => setParagraph(event.target.value)} className={`${FOCUS_35} mt-3 w-full resize-y rounded-2xl border border-[#c8d6e0] bg-[#fdfeff] p-4 text-base leading-7 text-[#0d2b46]`} placeholder="Write your own 12–15 sentence paragraph here…" />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#66777a]">
          <span aria-live="polite">الجمل المكتوبة: {sentenceCount} / 12–15</span>
          <button type="button" onClick={() => setParagraph("")} className={`${FOCUS_35} rounded-lg border border-[#d5dfe9] bg-white px-3 py-1.5 hover:bg-[#edf3f9]`}>مسح النص</button>
        </div>
        <div className="mt-4 rounded-2xl border border-[#d6e1ea] bg-[#f0f5fa] p-3">
          <div className="mb-2 text-sm font-black text-[#0d2b46]">خطة إنجاز تفاعلية</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {requirementLabels.map((label, index) => (
              <label key={label} className="flex cursor-pointer items-start gap-2 rounded-xl border border-[#dbe4ed] bg-white p-2.5 text-sm font-bold leading-5 text-[#344b52]">
                <input type="checkbox" checked={checked[index]} onChange={(event) => setChecked((current) => current.map((value, i) => i === index ? event.target.checked : value))} className="mt-1 h-4 w-4 accent-[#0d8f7f]" />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-[#718080]">{checked.filter(Boolean).length} من 8 متطلبات محددة كمنجزة. قائمة التحقق للتخطيط الذاتي وليست تصحيحًا تلقائيًا.</p>
        </div>
      </Card35>
      <SourcePanel35 id="s36" />
    </div>
  );
}

function LessonMap35() {
  const section = source("s38");
  const present = section.units.slice(2, 6);
  const past = section.units.slice(7, 11);
  const future = section.units.slice(12, 14);
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Curriculum map" title="منظومة الحاضر، الماضي، ثم المستقبل">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { title: "منظومة الحاضر", units: present },
            { title: "منظومة الماضي", units: past },
            { title: "منظومة المستقبل", units: future },
          ].map((group) => (
            <div key={group.title} className="rounded-2xl border border-[#d6e1ea] bg-white p-3">
              <h4 className="font-black text-[#0d2b46]">{group.title}</h4>
              <ul className="mt-2 space-y-1 text-sm font-bold text-[#4a6070]">{group.units.map((unit) => <li key={unit}><Rich text={unit} /></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl border border-[#c7d8d3] bg-[#eef4f0] p-3">
          <div className="text-xs font-black uppercase tracking-[.14em] text-[#5c7772]">Next · Lesson 36</div>
          <div className="mt-1 font-black text-[#0d2b46]"><En>WILL vs BE GOING TO — Mastering Future Decisions & Predictions</En></div>
          <p className="mt-1 text-sm leading-6 text-[#42595c]">مقارنة شاملة وتطبيق في المواقف الحقيقية، مع توسيع فهم الحالات التي تصلح فيها الصيغتان واختلاف المعنى والحوار الطبيعي.</p>
        </div>
      </Card35>
      <SourcePanel35 id="s38" />
    </div>
  );
}

function LessonContent35({ id, onGoTest, onGoSolutions }: { id: string; onGoTest: () => void; onGoSolutions: () => void }) {
  switch (id) {
    case "cover": return <CoverScene35 />;
    case "s1": return <SourcePanel35 id="s1" />;
    case "s2": return <ClickableSentence35 />;
    case "s3": return <FormulaScene35 />;
    case "s4": return <AuxiliarySelector35 />;
    case "s5": return <SourcePanel35 id="s5" />;
    case "s6": return <SentenceBuilder35 />;
    case "s7": return <ContractionStudio35 />;
    case "s8": return <><IntentionTimeline35 /><SourcePanel35 id="s8" /></>;
    case "s9": return <><CertaintyCheckpoint35 /><SourcePanel35 id="s9" /></>;
    case "s10": return <ConversationStudio35 />;
    case "s11": return <EvidenceScene35 id="s11" />;
    case "s12": return <EvidenceScene35 id="s12" />;
    case "s13": return <><NuanceCheck35 /><SourcePanel35 id="s13" /></>;
    case "s14": return <><NegativePosition35 /><SourcePanel35 id="s14" /></>;
    case "s15": return <ErrorContrast35 />;
    case "s16": return <><QuestionInversion35 /><SourcePanel35 id="s16" /></>;
    case "s17": return <><ShortAnswerMatcher35 /><SourcePanel35 id="s17" /></>;
    case "s18": return <><QuestionMeaning35 /><SourcePanel35 id="s18" /></>;
    case "s19": return <SourcePanel35 id="s19" />;
    case "s20": return <><WhoComparison35 /><SourcePanel35 id="s20" /></>;
    case "s21": return <TimeExpressions35 />;
    case "s22": return <><BeInspection35 /><SourcePanel35 id="s22" /></>;
    case "s23": return <><ExistenceForms35 /><SourcePanel35 id="s23" /></>;
    case "s24": return <WillGoingToTable35 />;
    case "s25": return <BakerySimulator35 />;
    case "s26": return <PredictionSimulator35 />;
    case "s27": return <MotionOrFuture35 />;
    case "s28": return <PracticeLab35 id="s28" items={DETECTIVE_ITEMS_35} mode="sentence" />;
    case "s29": return <PracticeLab35 id="s29" items={AUXILIARY_ITEMS_35} mode="word" />;
    case "s30": return <PracticeLab35 id="s30" items={TRANSFORMATION_ITEMS_35} mode="sentence" />;
    case "s31": return <DecisionPractice35 />;
    case "s32": return <BothFormsPanel35 />;
    case "s33": return <ReadingStudio35 />;
    case "s34": return <TestOverview35 onGoTest={onGoTest} />;
    case "s35": return <SolutionsSourceNote35 onGoSolutions={onGoSolutions} />;
    case "s36": return <FinalBossWorkspace35 />;
    case "s37": return <GoldenSummary35 />;
    case "s38": return <LessonMap35 />;
    default: return <SourcePanel35 id={id} />;
  }
}

function CoverScene35() {
  const [active, setActive] = useState<number | null>(null);
  const lenses = [
    { en: "A decision made now", ar: "قرار لحظي عند الكلام", answer: "WILL" },
    { en: "An intention formed earlier", ar: "نية أو خطة موجودة مسبقًا", answer: "BE GOING TO" },
    { en: "A prediction based on evidence", ar: "توقع مبني على دليل حاضر", answer: "BE GOING TO is a typical choice; WILL may overlap in context." },
  ];
  return (
    <div className="space-y-4">
      <Card35 className="border-[#1b4160] bg-[#0d2b46] text-white" eyebrow="The central question" title={<span className="text-white">كيف نختار الطريقة الصحيحة للحديث عن المستقبل؟</span>}>
        <p className="mt-2 font-en text-base font-black text-[#f2d9a8]" dir="ltr">How do we choose the right way to talk about the future?</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {lenses.map((lens, index) => <button key={lens.en} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`${FOCUS_35} min-h-24 rounded-2xl border p-3 text-right transition ${active === index ? "border-[#f5b64a] bg-[#1d4766]" : "border-white/15 bg-white/[.04] hover:bg-white/[.08]"}`}>
            <div className="text-[10px] font-black uppercase tracking-[.12em] text-[#f5b64a]">{lens.en}</div>
            <div className="mt-2 text-sm font-bold text-white">{lens.ar}</div>
          </button>)}
        </div>
        {active !== null ? <div role="status" className="mt-3 rounded-xl border border-white/15 bg-white/[.06] p-3 text-sm font-bold leading-6 text-[#eef3f8]"><En>{lenses[active].answer}</En> <span className="mx-1 text-[#f5b64a]">·</span>{lenses[active].ar}</div> : null}
        <div className="mt-3 text-[10px] font-bold text-white/50">Future Lab framing · الإطار التمهيدي من إعداد المنصة</div>
      </Card35>
      <SourcePanel35 id="cover" />
    </div>
  );
}

function FormulaScene35() {
  const section = source("s3");
  const roles = [
    ["Subject", "الفاعل"], ["am/is/are", "الفعل المساعد المناسب للفاعل"], ["going to", "جزء من صيغة المستقبل"], ["V1", "الفعل الأساسي"],
  ];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="The construction" title="اكشف التركيب من اليسار إلى اليمين">
        <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-2">
          {roles.map(([english, arabic], index) => <span key={english} className={`rounded-xl px-3 py-2 text-sm font-black ${index === 2 ? "bg-[#0d8f7f] text-white" : "border border-[#d6e1ea] bg-white text-[#0d2b46]"}`}><En>{english}</En></span>)}
        </div>
        <LtrSentence35 className="mt-3"><En>{section.units[1]}</En></LtrSentence35>
        <PlatformNote35><Rich text="ترتيب الصيغة ثابت: الفاعل، ثم am/is/are، ثم going to، ثم الفعل الأساسي V1." /></PlatformNote35>
      </Card35>
      <SourcePanel35 id="s3" />
    </div>
  );
}

function ErrorContrast35() {
  const section = source("s15");
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Common negative errors" title="المساعد يحمل النفي؛ لا تضف do أو does">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            [section.units[0], section.units[1]],
            [section.units[2], section.units[3]],
            [section.units[4], section.units[5]],
          ].map((pair, index) => (
            <div key={index} className="space-y-2 rounded-2xl border border-[#d6e1ea] bg-white p-3">
              <div className="rounded-xl bg-[#fbefed] p-2 text-sm font-bold text-[#8d433b]"><En>{pair[0]}</En></div>
              <div className="rounded-xl bg-[#edf5ee] p-2 text-sm font-bold text-[#315d4e]"><En>{pair[1]}</En></div>
            </div>
          ))}
        </div>
        <SourcePanel35 id="s15" />
      </Card35>
    </div>
  );
}

function QuestionMeaning35() {
  const section = source("s18");
  const [active, setActive] = useState<number | null>(null);
  const questions = [section.units[1], section.units[5], section.units[9], section.units[11]];
  const meanings = ["قد يكون طلبًا أو سؤالًا عن الاستعداد.", "نسأل عن نية الشخص أو خطته.", "قد يكون طلبًا أو سؤالًا عمّا إذا كان يستطيع الاتصال.", "نسأل عن نية الاتصال."];
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Question intent" title="السؤالان صحيحان؛ ما الذي يريد المتحدث معرفته؟">
        <div className="grid gap-2 sm:grid-cols-2">
          {questions.map((question, index) => <ChoiceButton35 key={question} selected={active === index} onClick={() => setActive(index)}><En>{question}</En></ChoiceButton35>)}
        </div>
        {active !== null ? <p role="status" className="mt-3 rounded-xl bg-[#eef4f0] p-3 text-sm font-bold text-[#31524f]">{meanings[active]}</p> : null}
        <PlatformNote35>لا نضع علامة «خطأ» على أي من السؤالين؛ السياق والمقصود يحددان الاختيار.</PlatformNote35>
      </Card35>
      <SourcePanel35 id="s18" />
    </div>
  );
}

function TestOverview35({ onGoTest }: { onGoTest: () => void }) {
  const section = source("s34");
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Separate Test Area" title="Future Plans Master Test · 25 سؤالًا">
        <SourceList35 id="s34" units={section.units.slice(0, 2)} />
        <div className="mt-4 rounded-2xl border border-[#cfe0d8] bg-[#eef4f0] p-4">
          <div className="text-sm font-black text-[#0d2b46]">خمسة مستويات · 25 سؤالًا كاملًا</div>
          <p className="mt-1 text-sm leading-6 text-[#4a6070]">الاختبار منفصل عن خطوات الشرح. أجب عن الأسئلة كلها، ثم أرسلها دفعة واحدة؛ لن تظهر الدرجة أو الإجابات قبل الإرسال.</p>
          <button type="button" onClick={onGoTest} className={`${FOCUS_35} mt-3 rounded-xl bg-[#0d8f7f] px-5 py-2.5 text-sm font-black text-white hover:bg-[#0a7466]`}>افتح منطقة الاختبار</button>
        </div>
      </Card35>
    </div>
  );
}

function SolutionsSourceNote35({ onGoSolutions }: { onGoSolutions: () => void }) {
  return (
    <div className="space-y-4">
      <SourcePanel35 id="s35" />
      <Card35 eyebrow="Source note" title="تمييز المصدر عن الحلول المؤلّفة">
        <p className="text-sm leading-7 text-[#465b60]">النص المورّد في القسم 35 يقدّم عنوان الحلول التفصيلية وتعليمات فتحها، لكنه لا يتضمن إجابات الأسئلة الخمسة والعشرين أو شروحها. الإجابات النموذجية في منطقة الحلول/المعلم أُعدّت من أسئلة القسم 34 وقواعد الدرس، ولا تُنسب إلى المصدر الأصلي.</p>
        <button type="button" onClick={onGoSolutions} className={`${FOCUS_35} mt-3 rounded-xl border border-[#0d8f7f] bg-white px-4 py-2 text-sm font-black text-[#0d8f7f] hover:bg-[#eef4f0]`}>انتقل إلى منطقة الحلول</button>
      </Card35>
    </div>
  );
}

function GoldenSummary35() {
  const section = source("s37");
  return (
    <div className="space-y-4">
      <Card35 eyebrow="Golden reference" title="ثبّت الصيغ الأساسية، ثم عد إلى المعنى">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { title: "Affirmative", formula: section.units[2], example: section.units[4], tone: "border-[#c3dcd3] bg-[#eff5f0]" },
            { title: "Negative", formula: section.units[6], example: section.units[8], tone: "border-[#d5dee8] bg-[#f0f5fa]" },
            { title: "Yes/No question", formula: section.units[10], example: section.units[12], tone: "border-[#d5dee8] bg-white" },
            { title: "WH question", formula: section.units[17], example: section.units[19], tone: "border-[#c3dcd3] bg-[#eff5f0]" },
          ].map((card) => <div key={card.title} className={`rounded-2xl border p-3 ${card.tone}`}><div className="text-xs font-black uppercase tracking-[.12em] text-[#a06f1a]">{card.title}</div><div dir="ltr" className="mt-2 font-en text-sm font-black text-[#0d2b46]">{card.formula}</div><div dir="ltr" className="mt-1 font-en text-sm text-[#4a6070]">{card.example}</div></div>)}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl bg-[#0d2b46] p-3 text-white"><div className="text-xs font-black">PLAN / PRIOR INTENTION</div><div dir="ltr" className="mt-1 font-en font-bold">We're going to build a new website.</div></div>
          <div className="rounded-xl bg-[#0d8f7f] p-3 text-white"><div className="text-xs font-black">PRESENT EVIDENCE</div><div dir="ltr" className="mt-1 font-en font-bold">Look at those clouds! It's going to rain.</div></div>
        </div>
      </Card35>
      <SourcePanel35 id="s37" />
    </div>
  );
}

export default function StepView35({ slide, onGoTest, onGoSolutions }: { slide: Slide35; onGoTest: () => void; onGoSolutions: () => void }) {
  return <StepFrame35 slide={slide}><LessonContent35 id={slide.id} onGoTest={onGoTest} onGoSolutions={onGoSolutions} /></StepFrame35>;
}
