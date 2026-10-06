import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SOURCE_SECTIONS, TEST_29, TEST_29_SOLUTIONS, OBJECTIVES_29, TEACHER_PASSWORD_29 } from "./data";
import { LatinRuns } from "../../shared/bidi";
import { Signature, SignatureGhost } from "../../shared/Signature";

type Area = "lesson" | "test" | "solutions" | "teacher";
type Slide = { title: string; section: string; indexes: number[]; mascot: string };

// One native course step per numbered source section. The closing summary and the
// four-tense recap share one step, keeping the complete lesson at 48 navigable steps.
const slides: Slide[] = [
  { title: SOURCE_SECTIONS[0].title, section: "OPENING", indexes: [0], mascot: "🚀" },
  { title: SOURCE_SECTIONS[1].title, section: "OPENING", indexes: [1], mascot: "🎯" },
  ...SOURCE_SECTIONS.slice(2, 46).map((s, i) => ({ title: s.title, section: "SOURCE · " + (s.num ? `SECTION ${s.num}` : "LESSON"), indexes: [i + 2], mascot: ["🧠", "🕰️", "⭐", "🔥", "⏱️", "🎥", "🧪", "🏆"][i % 8] })),
  { title: "🏆 الملخص النهائي + ⚔️ الفرق النهائي بين الأزمنة الأربعة", section: "CLOSING", indexes: [46, 47], mascot: "🏆" },
  { title: SOURCE_SECTIONS[48].title, section: "FINAL CHALLENGE", indexes: [48], mascot: "⚔️" },
];

function En({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>{children}</span>;
}
function Rich({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}><LatinRuns text={text} /></span>;
}
function PlatformExplanation({ children }: { children: ReactNode }) {
  return <aside className="rounded-2xl border-2 border-slate-200 bg-slate-900 p-4 text-sm font-semibold leading-relaxed text-white"><div className="mb-1 text-xs font-black uppercase tracking-wide text-amber-300">🛠️ Platform Explanation</div>{children}</aside>;
}
function Frame({ children, title, source }: { children: ReactNode; title: string; source?: string }) {
  return <section dir="rtl" className="relative overflow-hidden rounded-[1.75rem] border-2 border-violet-900/[0.07] bg-white p-5 shadow-[0_16px_44px_-24px_rgba(124,58,237,0.45)] md:p-8">
    <div className="absolute -left-1 top-3 text-4xl opacity-20" aria-hidden>⏳</div>
    {source && <div data-source-section={source} className="mb-3 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-900"><span className="rounded bg-white px-1">SOURCE SECTION</span> <Rich text={source} /></div>}
    <h2 className="font-head text-2xl font-black leading-snug text-slate-900 md:text-3xl"><Rich text={title} /></h2>
    <div className="mt-5 space-y-3">{children}</div>
  </section>;
}
function Lines({ lines }: { lines: string[] }) {
  return <div className="space-y-2">{lines.map((line, i) => <div key={i} className={/[A-Za-z]/.test(line) && !/[ء-ي]/.test(line) ? "rounded-xl border border-sky-100 bg-sky-50/60 p-3 text-left font-en leading-relaxed" : "rounded-xl border border-slate-100 bg-white p-3 leading-relaxed"}><Rich text={line} /></div>)}</div>;
}

function TimelineLab() {
  const [chosen, setChosen] = useState("");
  const options = ["past event", "activity at a past moment", "completed before", "duration before a past point"];
  return <Frame title="Four-Tense Timeline Lab"><p>Place the viewpoint on the timeline, then choose the tense.</p><div className="grid gap-2 sm:grid-cols-2">{options.map((x) => <button key={x} onClick={() => setChosen(x)} className={`rounded-xl border-2 p-3 text-left font-en ${chosen === x ? "border-violet-600 bg-violet-100" : "border-slate-200"}`}>{x}</button>)}</div>{chosen && <PlatformExplanation><En>{chosen}</En> is the viewpoint. Past Perfect Continuous adds activity or duration before a past reference point.</PlatformExplanation>}</Frame>;
}
function FormulaBuilder() {
  const [parts, setParts] = useState<string[]>([]);
  const add = (part: string) => setParts((p) => p.includes(part) ? p : [...p, part]);
  return <Frame title="Formula Builder"><p>Build the affirmative form in order.</p><div className="flex flex-wrap gap-2">{["Subject", "had", "been", "verb-ing"].map((x) => <button key={x} onClick={() => add(x)} className="rounded-xl border-2 border-indigo-200 bg-indigo-50 px-4 py-2 font-en font-bold">{x}</button>)}</div><div className="rounded-xl bg-slate-900 p-4 text-center font-en text-lg text-white">{parts.join(" + ") || "Choose the parts"}</div>{parts.join("+") === "Subject+had+been+verb-ing" && <PlatformExplanation>Correct: <En>Subject + had been + verb-ing</En>. <En>had</En> never changes.</PlatformExplanation>}</Frame>;
}
function ForSinceLab() {
  const items = [["two hours", "for"], ["Monday", "since"], ["three years", "for"], ["2020", "since"], ["7:30", "since"]];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  return <Frame title="FOR vs SINCE Lab"><p><En>for</En> asks how long; <En>since</En> asks from what starting point.</p>{items.map(([word, answer]) => <label key={word} className="flex items-center justify-between gap-3 rounded-xl border p-3"><En>{word}</En><select aria-label={`Classify ${word}`} value={answers[word] || ""} onChange={(e) => setAnswers({ ...answers, [word]: e.target.value })}><option value="">Choose</option><option>for</option><option>since</option></select>{answers[word] && <span role="status">{answers[word] === answer ? "✓" : "Try again"}</span>}</label>)}</Frame>;
}
function Comparator() {
  const [value, setValue] = useState("");
  return <Frame title="Four-Tense Comparator"><div className="grid gap-2 sm:grid-cols-2">{[["I studied.", "past event"], ["I was studying.", "activity at a past moment"], ["I had studied.", "completed before another past event"], ["I had been studying for three years before I moved.", "activity or duration before another past point"]].map(([sentence, meaning]) => <button key={sentence} onClick={() => setValue(meaning)} className="rounded-xl border-2 border-teal-200 p-3 text-left"><En>{sentence}</En><small className="mt-1 block">{meaning}</small></button>)}</div>{value && <PlatformExplanation>Viewpoint selected: <En>{value}</En>.</PlatformExplanation>}</Frame>;
}
function ResultDurationLab() {
  const [value, setValue] = useState("");
  return <Frame title="Result vs Duration Lab"><div className="grid gap-2 md:grid-cols-2">{[["I had repaired the bicycle.", "completion / result"], ["I had been repairing the bicycle for two hours.", "activity / duration"]].map(([s, m]) => <button key={s} onClick={() => setValue(m)} className="rounded-xl border-2 border-amber-200 p-4 text-left"><En>{s}</En><b className="mt-2 block">{m}</b></button>)}</div>{value && <PlatformExplanation>Useful distinction, not an absolute rule. Meaning and viewpoint decide.</PlatformExplanation>}</Frame>;
}
function StativeTrap() {
  const [picked, setPicked] = useState("");
  return <Frame title="Stative Verb Trap"><p>Choose the natural sentence.</p>{["I had known him for years.", "I had been knowing him for years."].map((x, i) => <button key={x} onClick={() => setPicked(x)} className="mr-2 rounded-xl border-2 border-rose-200 p-3 text-left font-en">{x} {picked === x && (i === 0 ? "✓" : "— try again")}</button>)}<PlatformExplanation><En>know</En> is normally stative here: <En>I had known him for years.</En></PlatformExplanation></Frame>;
}
function SourceExercise({ kind }: { kind: "exercise" | "story" | "boss" | "final" }) {
  const [value, setValue] = useState("");
  const prompts = { exercise: ["She had been study for two hours.", "She had been studying for two hours."], story: ["Mia arrived", "students had been working", "teacher had already checked"], boss: ["had rained", "had been raining"], final: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"] };
  const choices = prompts[kind];
  return <Frame title={kind === "boss" ? "Boss Battle" : kind === "final" ? "Final IQ200 Challenge" : kind === "story" ? "Mia Story Timeline" : "Interactive Source Exercise"}><p>Select the best analysis or correction.</p><div className="flex flex-wrap gap-2">{choices.map((x) => <button key={x} onClick={() => setValue(x)} className="rounded-xl border-2 border-orange-200 bg-orange-50 p-3 text-left font-en">{x}</button>)}</div>{value && <PlatformExplanation>Your choice: <En>{value}</En>. Check activity, completion, reference point, and duration before deciding.</PlatformExplanation>}</Frame>;
}
function LabFor({ index }: { index: number }) {
  if (index === 3) return <FormulaBuilder />;
  if (index === 4 || index === 11) return <TimelineLab />;
  if (index === 12) return <ForSinceLab />;
  if (index === 16) return <ResultDurationLab />;
  if (index === 19) return <StativeTrap />;
  if (index === 30) return <Comparator />;
  if (index >= 36 && index <= 39) return <SourceExercise kind="exercise" />;
  if (index === 41 || index === 42) return <SourceExercise kind="story" />;
  if (index === 43) return <SourceExercise kind="boss" />;
  if (index === 48) return <SourceExercise kind="final" />;
  return null;
}
function SlideView({ slide }: { slide: Slide }) {
  return <div className="space-y-5">{slide.indexes.map((sourceIndex) => { const source = SOURCE_SECTIONS[sourceIndex]; return <Frame key={sourceIndex} title={source.title} source={source.title}><Lines lines={source.units} />{sourceIndex === 0 && <PlatformExplanation>Welcome to the native multi-step lesson. Use the step rail, progress bar, Previous, and Next controls.</PlatformExplanation>}{LabFor({ index: sourceIndex })}</Frame>; })}</div>;
}

function TestArea({ onComplete }: { onComplete: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const answerFor = (q: typeof TEST_29[number]) => Array.isArray(q[3]) ? (q[3] as number[]).map((n) => n + 1).join(",") : String((q[3] as number) + 1);
  const submit = () => { let result = 0; TEST_29.forEach((q, i) => { if (answers[i] === answerFor(q)) result++; }); setScore(result); setSubmitted(true); onComplete(); };
  return <Frame title="📝 Test Area — 20 Questions"><p>Answer all questions. No correctness feedback or score appears before submission.</p><div className="space-y-4">{TEST_29.map((q, i) => <div key={i} className="rounded-2xl border p-4"><h3 className="font-bold">{i + 1}. <Rich text={String(q[1])} /></h3>{q[0] === "order" || q[0] === "multi" || q[0] === "match" ? <input aria-label={`Answer ${i + 1}`} value={answers[i] || ""} onChange={(e) => setAnswers({ ...answers, [i]: e.target.value.replace(/\s/g, "") })} placeholder="Enter option numbers" className="mt-2 w-full rounded border p-2" /> : <div className="mt-2 grid gap-2 sm:grid-cols-2">{(q[2] as string[]).map((option, j) => <button key={j} aria-pressed={answers[i] === String(j + 1)} onClick={() => setAnswers({ ...answers, [i]: String(j + 1) })} className={`rounded-xl border-2 p-3 text-left ${answers[i] === String(j + 1) ? "border-violet-600 bg-violet-700 text-white" : "border-slate-200"}`}><Rich text={`${j + 1}. ${option}`} /></button>)}</div>}{submitted && <div className="mt-2 text-sm font-bold">{answers[i] === answerFor(q) ? "✓ Correct" : "Review Test Solutions"}</div>}</div>)}</div><div className="flex flex-wrap gap-3"><span>{Object.keys(answers).length}/20 answered</span><button disabled={Object.keys(answers).length < 20 || submitted} onClick={submit} className="rounded-xl bg-violet-700 px-5 py-3 font-bold text-white disabled:opacity-40">Submit Test</button>{submitted && <><strong>Score: {score}/20</strong><button onClick={() => { setAnswers({}); setSubmitted(false); setScore(0); }} className="rounded-xl border px-4 py-2">Reset</button></>}</div></Frame>;
}
function Solutions({ unlocked, onTeacher }: { unlocked: boolean; onTeacher: () => void }) {
  return <Frame title="✅ Test Solutions — 20 detailed solutions">{!unlocked ? <p>Submit the Test Area or unlock the Teacher Area to reveal solutions.</p> : <div className="space-y-3">{TEST_29_SOLUTIONS.map((s, i) => <article key={i} className="rounded-xl border p-4"><h3 className="font-bold">{i + 1}. Correct answer: <En>{s.answer}</En></h3><p>{s.explanation}</p><p className="text-sm text-rose-700">Common trap: {s.trap}</p></article>)}</div>}<button onClick={onTeacher} className="mt-4 rounded-xl border px-4 py-2">Teacher Area</button></Frame>;
}
function Teacher({ unlocked, setUnlocked, onSolutions }: { unlocked: boolean; setUnlocked: (v: boolean) => void; onSolutions: () => void }) {
  const [password, setPassword] = useState("");
  if (!unlocked) return <Frame title="👨‍🏫 Teacher Area"><p>Protected teacher content.</p><input type="password" aria-label="Teacher password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded border p-2" /><button onClick={() => password === TEACHER_PASSWORD_29 && setUnlocked(true)} className="ml-2 rounded bg-slate-900 px-4 py-2 text-white">Unlock Teacher Area</button></Frame>;
  return <Frame title="👨‍🏫 Teacher Area — Past Perfect Continuous"><div className="space-y-3"><p><b>Overview:</b> Lesson 29 extends the four-tense timeline from event to activity and duration before a past reference point.</p><h3 className="font-bold">Objectives</h3><Lines lines={OBJECTIVES_29} /><h3 className="font-bold">Prerequisites and teaching notes</h3><Lines lines={["Review Past Simple, Past Continuous, and Past Perfect before teaching the new viewpoint.", "Do not teach that Past Perfect Continuous must continue until the second event.", "Do not teach for = always Past Perfect Continuous; stative verbs can use Past Perfect: I had known him for years.", "Use meaning, chronology, visible effect, activity, duration, for, since, and the full four-tense comparison.", "Support exercises ㊱–㊳, the Mia story, Boss Battle ㊸, and the final challenge ㊹."]} /><button onClick={onSolutions} className="rounded-xl bg-violet-700 px-4 py-2 font-bold text-white">Open Test Solutions</button></div></Frame>;
}
function Rail({ index, setIndex, area, setArea, onExit, close }: { index: number; setIndex: (n: number) => void; area: Area; setArea: (a: Area) => void; onExit: () => void; close?: () => void }) {
  return <aside className="flex h-full flex-col bg-white/95"><div className="border-b border-violet-100 p-4"><button onClick={onExit} className="w-full rounded-xl bg-slate-900 px-3 py-2 font-bold text-white">← جميع الدروس</button><div className="mt-2 grid grid-cols-2 gap-1">{([["lesson", "📚 الدرس"], ["test", "📝 الاختبار"], ["solutions", "✅ الحلول"], ["teacher", "👨‍🏫 المعلم"]] as [Area, string][]).map(([id, label]) => <button key={id} onClick={() => { setArea(id); close?.(); }} className={`rounded-xl px-2 py-2 text-xs font-bold ${area === id ? "bg-violet-700 text-white" : "bg-slate-100"}`}>{label}</button>)}</div><div className="mt-2 rounded bg-violet-50 p-2 text-center text-xs font-bold">48 خطوة · 44 قسمًا · اختبار 20 سؤالًا</div></div><nav className="flex-1 overflow-y-auto p-3" aria-label="Lesson 29 steps">{slides.map((s, i) => <button key={i} onClick={() => { setIndex(i); setArea("lesson"); close?.(); }} className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-right text-sm ${area === "lesson" && index === i ? "bg-violet-700 text-white" : "hover:bg-violet-50"}`}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-xs">{i + 1}</span><span className="truncate">{s.title}</span><span className="mr-auto">{s.mascot}</span></button>)}</nav><div className="border-t p-3 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div></aside>;
}
export default function Lesson29({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area>("lesson"); const [index, setIndex] = useState(0); const [menu, setMenu] = useState(false); const [testDone, setTestDone] = useState(false); const [teacherOk, setTeacherOk] = useState(false);
  const total = slides.length; const progress = ((index + 1) / total) * 100;
  const nav = useMemo(() => ({ next: () => setIndex((n) => Math.min(total - 1, n + 1)), prev: () => setIndex((n) => Math.max(0, n - 1)) }), [total]);
  useEffect(() => { const key = (e: KeyboardEvent) => { if (menu || area !== "lesson") return; if (["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes((e.target as HTMLElement)?.tagName)) return; if (e.key === "ArrowLeft" || e.key === " ") { e.preventDefault(); nav.next(); } if (e.key === "ArrowRight") nav.prev(); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [menu, area, nav]);
  const unlocked = testDone || teacherOk;
  return <div dir="rtl" className="font-body relative flex h-screen flex-col overflow-hidden bg-[#f6f3ff] text-slate-800"><Signature /><div className="relative flex min-h-0 flex-1"><SignatureGhost /><div className="hidden w-72 shrink-0 border-l border-violet-100 bg-white/85 lg:block"><Rail index={index} setIndex={setIndex} area={area} setArea={setArea} onExit={onExit} /></div><div className="relative flex min-w-0 flex-1 flex-col"><header className="flex items-center gap-3 px-4 pt-3 lg:px-10"><button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-violet-100 bg-white lg:hidden" aria-label="فتح فهرس">☰</button><div className="min-w-0 flex-1"><div className="text-sm font-bold text-violet-700">الدرس 29 · Past Perfect Continuous</div>{area === "lesson" && <><div className="mt-1 truncate text-sm font-bold text-slate-500">{slides[index].section} · <Rich text={slides[index].title} /></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-violet-100"><div className="h-full rounded-full bg-gradient-to-l from-violet-700 via-indigo-500 to-amber-400 transition-all" style={{ width: `${progress}%` }} /></div></>}</div>{area === "lesson" && <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold shadow-sm">{index + 1} / {total}</span>}</header><main className="flex-1 overflow-y-auto px-3 pb-28 pt-4 md:px-6 lg:px-10"><div data-area="student-lesson" className="mx-auto max-w-4xl" hidden={area !== "lesson"}><SlideView slide={slides[index]} /></div><div data-area="lesson29-test" className="mx-auto max-w-4xl" hidden={area !== "test"}><TestArea onComplete={() => setTestDone(true)} /></div><div data-area="lesson29-solutions" className="mx-auto max-w-4xl" hidden={area !== "solutions"}><Solutions unlocked={unlocked} onTeacher={() => setArea("teacher")} /></div><div data-area="lesson29-teacher" className="mx-auto max-w-4xl" hidden={area !== "teacher"}><Teacher unlocked={teacherOk} setUnlocked={setTeacherOk} onSolutions={() => setArea("solutions")} /></div></main>{area === "lesson" && <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"><div className="pointer-events-auto flex gap-2 rounded-full bg-white/95 p-2 shadow-xl"><button onClick={nav.prev} disabled={index === 0} className="rounded-full px-4 py-2 font-bold disabled:opacity-30">→ السابق</button><button onClick={nav.next} disabled={index === total - 1} className="rounded-full bg-violet-700 px-5 py-2 font-bold text-white disabled:opacity-30">التالي ←</button></div></div>}</div></div>{menu && <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMenu(false)}><div className="absolute inset-0 bg-slate-900/40" /><div className="relative h-full w-80 max-w-[85vw] bg-white" onClick={(e) => e.stopPropagation()}><Rail index={index} setIndex={setIndex} area={area} setArea={setArea} onExit={onExit} close={() => setMenu(false)} /></div></div>}</div>;
}
export { TestArea, Solutions, Teacher, slides };
