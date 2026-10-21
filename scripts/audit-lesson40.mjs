// Lesson 40 source-to-step, assessment isolation, routes and direction checks.
// Run: npm run audit:lesson40
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { analyzeHtml } from "./lib/bidi-sim.mjs";
const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "node_modules", ".lesson40-audit", String(process.pid));
mkdirSync(outDir, { recursive: true });
const failures = []; let assertions = 0; const noise = [];
const ok = (condition, message) => { assertions++; if (!condition) failures.push(message); };
for (const level of ["error", "warn"]) { const old = console[level].bind(console); console[level] = (...args) => { noise.push(`${level}: ${args.join(" ")}`); old(...args); }; }
const { JSDOM } = await import("jsdom");
const dom = new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body></body></html>', { url:"http://localhost/", pretendToBeVisual:true });
const win = dom.window;
for (const key of ["window","document","navigator","Element","HTMLElement","HTMLInputElement","HTMLButtonElement","HTMLAnchorElement","HTMLSelectElement","Event","MouseEvent","KeyboardEvent","Node","getComputedStyle","MutationObserver","requestAnimationFrame","cancelAnimationFrame","SVGElement","Text","Comment","DocumentFragment"]) if (win[key] !== undefined) Object.defineProperty(globalThis,key,{value:win[key],configurable:true});
win.scrollTo = () => {}; globalThis.IS_REACT_ACT_ENVIRONMENT = true;
await esbuild.build({ absWorkingDir:root, stdin:{ resolveDir:root, loader:"tsx", contents:`
import React,{act} from 'react'; import {createRoot} from 'react-dom/client'; import {renderToString} from 'react-dom/server';
import Lesson40 from './src/lessons/lesson40/Lesson40'; import {StepView40} from './src/lessons/lesson40/Steps40';
import {TestArea40} from './src/lessons/lesson40/TestArea40'; import {SolutionsArea40} from './src/lessons/lesson40/SolutionsArea40';
import {TeacherGuide40} from './src/lessons/lesson40/TeacherGuide40'; import {SLIDES_40,STEP_COUNT_40} from './src/lessons/lesson40/data';
import * as LEDGER from './src/lessons/lesson40/ledger40'; import * as STUDENT from './src/lessons/lesson40/studentLedger40'; import * as TEST from './src/lessons/lesson40/testData40'; import * as SOL from './src/lessons/lesson40/solutionsData40';
function mount(node){const el=document.createElement('div');document.body.appendChild(el);const root=createRoot(el);act(()=>root.render(node));return {el,root:{unmount(){act(()=>root.unmount());el.remove()}}}}
export {React,act,renderToString,mount,Lesson40,StepView40,TestArea40,SolutionsArea40,TeacherGuide40,SLIDES_40,STEP_COUNT_40,LEDGER,STUDENT,TEST,SOL};`}, bundle:true, splitting:true, platform:"node",format:"esm",outdir:outDir,outExtension:{".js":".mjs"},jsx:"automatic",packages:"external",loader:{".woff2":"empty"},logLevel:"silent" });
const M = await import(pathToFileURL(join(outDir,"stdin.mjs")).href);
const {React,act,renderToString,mount,Lesson40,StepView40,TestArea40,SolutionsArea40,TeacherGuide40,SLIDES_40,STEP_COUNT_40,LEDGER,STUDENT,TEST,SOL}=M;
const src40=join(root,"src/lessons/lesson40");
ok(LEDGER.SOURCE_SECTIONS_40.length===30,"immutable ledger has cover + all 29 numbered sections");
ok(LEDGER.SOURCE_NUMBERED_COUNT_40===29,"numbered source sections count is 29");
const expectedStudentProjection=LEDGER.SOURCE_SECTIONS_40.map(section=>section.id==="s26"?{...section,units:section.units.slice(0,2)}:section);
ok(JSON.stringify(STUDENT.STUDENT_SOURCE_SECTIONS_40)===JSON.stringify(expectedStudentProjection),"browser-safe source projection exactly matches canonical source except withheld §26 answer units");
ok(STUDENT.STUDENT_SOURCE_SECTIONS_40.find(section=>section.id==="s26")?.units.length===2,"student projection includes only §26's two opening units");
ok(!JSON.stringify(STUDENT.STUDENT_SOURCE_SECTIONS_40).includes("I promise I will return your book tomorrow"),"student-safe source projection contains no final-test answer phrase");
ok(!readFileSync(join(src40,"data.ts"),"utf8").includes("./ledger40"),"eager student data does not import the canonical teacher-answer ledger");
ok(STEP_COUNT_40>=85&&STEP_COUNT_40<=110,`step count is within target (actual ${STEP_COUNT_40})`);
ok(SLIDES_40.at(-1).id==="s29-06","last step is the curriculum route/preview");
for(let i=1;i<=29;i++){const sec=LEDGER.SOURCE_SECTIONS_40[i];ok(sec?.id===`s${String(i).padStart(2,"0")}`&&sec.num===i,`section ${i} exists in source order`);}
// Atomic source coverage: every student source unit exactly once; assessment and teacher source are routed to their separate surfaces.
const mapped=new Map();
for(const slide of SLIDES_40){for(const unit of slide.unitIndexes){const key=`${slide.sourceId}:${unit}`;mapped.set(key,(mapped.get(key)||0)+1);}}
for(const sec of LEDGER.SOURCE_SECTIONS_40){
 if(sec.id==="s25"||sec.id==="s26"){
  ok(mapped.get(`${sec.id}:0`)===1&&mapped.get(`${sec.id}:1`)===1,`${sec.id} student-facing launch units mapped once`);
  for(let u=2;u<sec.units.length;u++)ok(!mapped.has(`${sec.id}:${u}`),`${sec.id} protected/body unit ${u} excluded from ordinary lesson pages`);
 } else for(let u=0;u<sec.units.length;u++)ok(mapped.get(`${sec.id}:${u}`)===1,`${sec.id} source unit ${u} maps exactly once`);
}
ok(TEST.TEST_SOURCE_UNIT_INDEXES_40.length===65&&new Set(TEST.TEST_SOURCE_UNIT_INDEXES_40).size===65,"all 65 final-test source units consumed exactly once in test data");
ok(TEST.TEST_QUESTION_COUNT_40===25,"final test has exactly 25 questions");
ok(TEST.TEST_LEVELS_40.length===5&&TEST.TEST_LEVELS_40.every(level=>level.questions.length===5),"test groups exactly five questions in each of five levels");
ok(SOL.SOLUTIONS_40.length===25,"teacher solutions cover all 25 questions");
ok(SOL.SOLUTIONS_40.every(s=>s.sourceReason.trim()&&s.platformExplanation.trim()&&s.sourceAnswer.trim()),"each final-test answer has a model, source reason and complete explanation");
ok(LEDGER.SOURCE_SECTIONS_40.find(s=>s.id==="s26").units.length===64,"complete teacher-only source §26 remains in ledger");
const { execFileSync } = await import("node:child_process");
let ledgerDiff = "";
try { ledgerDiff = execFileSync("git",["diff","--numstat","HEAD","--","src/lessons/lesson40/ledger40.ts"],{cwd:root,encoding:"utf8"}); } catch { ledgerDiff = "DIFF"; }
ok(ledgerDiff.trim()==="","original source ledger is unchanged from HEAD");

const snapshots=[]; const mappedRenders=new Map(); const bidiErrors=[];
for(let i=0;i<STEP_COUNT_40;i++){
 const slide=SLIDES_40[i];
 const html=renderToString(React.createElement(StepView40,{stepIndex:i,testSubmitted:false,teacherUnlocked:false,onOpenTest(){},onOpenSolutions(){},onOpenTeacher(){}}));
 snapshots.push(html); ok(html.includes(`data-step-id="${slide.id}"`),`${slide.id} has a purpose-built step wrapper`);
 for(const u of slide.unitIndexes){const attr=`data-source-unit="${slide.sourceId}-unit-${u}"`;ok(html.includes(attr),`${slide.id} renders its exact source unit ${u}`);mappedRenders.set(`${slide.sourceId}:${u}`,(mappedRenders.get(`${slide.sourceId}:${u}`)||0)+1);}
 if(slide.sourceId==="s25"||slide.sourceId==="s26")ok(!html.includes("will return your book tomorrow")&&!html.includes("حلول المستوى الأول"),`${slide.id} has no final answer key`);
 for(const v of analyzeHtml(html).flatMap(p=>p.violations||[]))bidiErrors.push(`${slide.id}: ${v.latin} / ${v.arabic} (${v.sig})`);
}
ok(bidiErrors.length===0,`all lesson steps pass mixed RTL/LTR scan (${bidiErrors.slice(0,3).join("; ")})`);
for(const [key,count] of mappedRenders)ok(count===1,`${key} rendered exactly once across lesson pages`);

// Source practice answer feedback is absent until a typed attempt is submitted.
for(const sourceId of ["s17","s19","s20","s21","s23"]){const pages=SLIDES_40.filter(s=>s.sourceId===sourceId);for(const slide of pages){const html=renderToString(React.createElement(StepView40,{stepIndex:SLIDES_40.indexOf(slide),testSubmitted:false,teacherUnlocked:false,onOpenTest(){},onOpenSolutions(){},onOpenTeacher(){}}));ok(!html.includes(`data-source-unit="${sourceId}-reveal-0"`),`${sourceId} ${slide.id} answer units withheld before attempt`);}}

const testHtml=renderToString(React.createElement(TestArea40,{answers:{},onChangeAnswer(){},submitted:false,onSubmit(){},onReset(){},onOpenSolutions(){},onBackToStudent(){}}));
ok((testHtml.match(/data-test-question=/g)||[]).length===1,"test DOM presents exactly one active question at a time");
ok(TEST.TEST_LEVELS_40.flatMap(level=>level.questions).length===25,"test navigation bank contains all 25 questions across its five levels");
ok(!testHtml.includes("حلول المستوى الأول")&&!testHtml.includes("will return your book tomorrow")&&!testHtml.includes("sourceAnswer"),"test DOM does not expose final answers or keys");
ok(!readFileSync(join(src40,"TestArea40.tsx"),"utf8").includes("solutionsData40"),"TestArea40 has no solutions import");
ok(!readFileSync(join(src40,"testData40.ts"),"utf8").includes("sourceAnswer"),"test question bank contains no answer-key field");
const solHtml=renderToString(React.createElement(SolutionsArea40,{answers:{q1:"A"},onBackToTest(){},onBackToStudent(){}}));
ok((solHtml.match(/data-solution-item=/g)||[]).length===25,"solutions surface renders 25 detailed solution cards after authorization/unlock");
ok(solHtml.includes("data-score-summary")&&solHtml.includes(" / <!-- -->20"),"solution feedback calculates only the 20 objective/model-match items");
ok(solHtml.includes("لا تُرفض آليًا")&&SOL.SOLUTIONS_40.filter(item=>item.level===4).length===5,"five conceptual answers are explicitly routed for human review, not auto-rejected");
for(let u=0;u<64;u++)ok(solHtml.includes(`data-source-unit="s26-unit-${u}"`),`gated solution surface renders §26 source unit ${u}`);
const teacherHtml=renderToString(React.createElement(TeacherGuide40,{onJumpToStep(){},onOpenTest(){},onOpenSolutions(){}}));
ok(teacherHtml.includes('data-source-section="s26"'),"teacher guide includes complete source §26");
ok(teacherHtml.includes("data-conceptual-rubric")&&teacherHtml.includes("درجتان لكل سؤال"),"teacher guide includes the conceptual assessment rubric");

const lesson=mount(React.createElement(Lesson40));
ok(!!lesson.el.querySelector(".tc-step[data-step-id='cover-01']"),"Lesson40 starts at the command-lab cover");
ok(!!lesson.el.querySelector("#lesson40-step-select"),"direct step navigation is keyboard-operable native select");
ok(!![...lesson.el.querySelectorAll("nav button")].find(b=>b.textContent.includes("منطقة الحلول")&&b.disabled),"solution navigation is locked before submission/unlock");
ok(!lesson.el.querySelector("#lesson40-solutions"),"solution module is not mounted in initial student DOM");
act(()=>lesson.el.querySelector("#lesson40-step-select").dispatchEvent(new win.Event("change",{bubbles:true}))); // harmless no-op; native route below
lesson.root.unmount();

const app=readFileSync(join(root,"src/App.tsx"),"utf8");
ok(app.includes('import Lesson40 from "./lessons/lesson40/Lesson40"')&&app.includes("route === 40")&&app.includes('href: "#/lesson/40"'),"Lesson 40 is registered in the hub and router");
ok(app.includes("#/lesson/41")&&app.includes("route === 41"),"existing Lesson 41 route is present in application router");
ok(readFileSync(join(src40,"Steps40.tsx"),"utf8").includes('href="#/lesson/41"'),"Lesson 40 final step points to the real Lesson 41 route");
ok(existsSync(join(root,"docs/lesson40-coverage.md")),"Lesson 40 coverage ledger exists");
for(let i=1;i<=29;i++)ok(readFileSync(join(root,"docs/lesson40-coverage.md"),"utf8").includes(`§${i}`),`coverage ledger cites source section ${i}`);
ok(!/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/.test(readFileSync(join(src40,"Steps40.tsx"),"utf8")),"step implementation has no raw bidi controls");
ok(readFileSync(join(src40,"lesson40.css"),"utf8").includes("prefers-reduced-motion"),"lesson-local motion honors reduced-motion preference");

rmSync(outDir,{recursive:true,force:true});
if(noise.length) failures.push(`React/JSDOM warnings: ${noise.slice(0,4).join(" | ")}`);
if(failures.length){console.error(`FAIL audit-lesson40 (${failures.length}/${assertions} failures)`);for(const f of failures.slice(0,60))console.error(" -",f);process.exit(1);}
console.log(`PASS audit-lesson40 (${assertions} assertions; ${STEP_COUNT_40} learning steps; 29 source sections; 25 assessment questions; 25 complete teacher solutions)`);
