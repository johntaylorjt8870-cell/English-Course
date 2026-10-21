import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { brotliDecompressSync } from "node:zlib";
import chromium from "@sparticuz/chromium";
import { chromium as pw } from "playwright-core";
import * as esbuild from "esbuild";
const root=process.cwd(), work="node_modules/.browser40";fs.mkdirSync(work,{recursive:true});
try{fs.writeFileSync(`${work}/al2023.tar`,brotliDecompressSync(fs.readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));execFileSync("tar",["-xf",`${work}/al2023.tar`,"-C",work]);}catch{}
process.env.LD_LIBRARY_PATH=`${root}/${work}/lib:${process.env.LD_LIBRARY_PATH||""}`;
await esbuild.build({stdin:{contents:"export * from './src/lessons/lesson40/data';",resolveDir:root},bundle:true,format:"esm",platform:"node",outfile:`${work}/data.mjs`,logLevel:"silent"});
const {SLIDES_40}=await import(`../${work}/data.mjs`);
const out="docs/lesson40-visual";fs.mkdirSync(out,{recursive:true});
const browser=await pw.launch({args:chromium.args,executablePath:await chromium.executablePath(),headless:true});
const report={date:new Date().toISOString(),steps:SLIDES_40.length,viewports:[],checks:[],errors:[],answerModuleNetwork:[]};
const check=(ok,message)=>{report.checks.push({pass:!!ok,message});if(!ok)console.error("FAIL",message);};
const screenshotIds=new Set(["cover-01","s02-01","s09-01","s16-01","s17-02","s23-02","s25-01","s29-06"]);
for(const size of [{width:1280,height:800},{width:1920,height:1080}]){
 const page=await browser.newPage({viewport:size});page.on("pageerror",e=>report.errors.push(`${size.width}: ${e.message}`));
 const requests=[];let loadStage="lesson-learning";page.on("request",r=>{requests.push(r.url());if(/solutionsData40|TeacherGuide40|SolutionsArea40/.test(r.url()))report.answerModuleNetwork.push({viewport:size.width,stage:loadStage,url:r.url()});});
 await page.addInitScript(()=>localStorage.setItem("englishwithsomer-site-unlocked","unlocked"));
 await page.goto("http://127.0.0.1:4173/English-Course/#/lesson/40",{waitUntil:"networkidle"});
 const gate=page.locator("input[type=password]");if(await gate.count()){await gate.first().fill("somer173");await page.locator("button[type=submit]").first().click();}
 await page.locator(".tc-step[data-step-id='cover-01']").waitFor();
 await page.keyboard.press("ArrowLeft");check(await page.locator(".tc-step").getAttribute("data-step-id")==="cover-02",`${size.width}: ArrowLeft advances through lesson steps`);
 await page.keyboard.press("ArrowRight");check(await page.locator(".tc-step").getAttribute("data-step-id")==="cover-01",`${size.width}: ArrowRight returns to previous lesson step`);
 const rows=[];
 for(let i=0;i<SLIDES_40.length;i++){
  await page.locator("#lesson40-step-select").selectOption(String(i));
  const current=page.locator(`.tc-step[data-step-id="${SLIDES_40[i].id}"]`);await current.waitFor();
  const metrics=await current.evaluate(el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);const source=[...el.querySelectorAll("[data-source-unit]")];const controls=[...el.querySelectorAll("button,a,input,select")].filter(x=>x.getBoundingClientRect().width>0);let overlap=false;for(let a=0;a<controls.length;a++)for(let b=a+1;b<controls.length;b++){if(controls[a].contains(controls[b])||controls[b].contains(controls[a]))continue;const x=controls[a].getBoundingClientRect(),y=controls[b].getBoundingClientRect();if(Math.min(x.right,y.right)-Math.max(x.left,y.left)>2&&Math.min(x.bottom,y.bottom)-Math.max(x.top,y.top)>2)overlap=true;}return{height:r.height,width:r.width,dir:s.direction,font:source.length?Math.min(...source.map(x=>parseFloat(getComputedStyle(x).fontSize))):16,overflow:document.documentElement.scrollWidth>innerWidth,overlap,unreachable:controls.some(x=>{const b=x.getBoundingClientRect();return b.width>0&&(b.right<0||b.left>innerWidth)})};});
  rows.push({id:SLIDES_40[i].id,...metrics,expandedHeight:metrics.height});
  if(screenshotIds.has(SLIDES_40[i].id))await page.screenshot({path:`${out}/${size.width}-${SLIDES_40[i].id}.png`,fullPage:true});
  check(metrics.height<=1200,`${size.width} ${SLIDES_40[i].id}: initial height ≤1200px (${metrics.height})`);
  check(metrics.font>=15,`${size.width} ${SLIDES_40[i].id}: source text ≥15px (${metrics.font})`);
  check(!metrics.overflow,`${size.width} ${SLIDES_40[i].id}: no horizontal page overflow`);
  check(!metrics.overlap,`${size.width} ${SLIDES_40[i].id}: no overlapping controls`);
  check(metrics.dir==="rtl"&&!metrics.unreachable,`${size.width} ${SLIDES_40[i].id}: RTL and all controls reachable`);
  if(SLIDES_40[i].sourceId==="s02"&&SLIDES_40[i].id.endsWith("-01")){await page.getByRole("button",{name:/هل أقدم وعدًا/}).click();check(await page.locator(".tc-readout").innerText().then(t=>t.includes("WILL")),"six-question decision console opens a meaningful route");}
  if(SLIDES_40[i].sourceId==="s04"&&SLIDES_40[i].id.endsWith("-01")){await page.getByRole("button",{name:/FUTURE PERFECT CONTINUOUS/}).click();check((await page.locator(".tc-caption").innerText()).includes("مدة"),"five-form timeline selector changes meaning label");}
  const attempt=page.locator(`#attempt-${SLIDES_40[i].sourceId}`);
  if(await attempt.count()){
   check(await page.locator(".tc-answer").count()===0,`${SLIDES_40[i].sourceId} ${SLIDES_40[i].id}: source answer hidden before attempt`);
   await attempt.fill("My answer attempt");await page.getByRole("button",{name:"تحقق من المحاولة واعرض الشرح"}).click();
   const revealStart=SLIDES_40[i].sourceId==="s21"&&SLIDES_40[i].id.endsWith("-02")?6:SLIDES_40[i].sourceId==="s23"&&SLIDES_40[i].id.endsWith("-05")?4:0;
   check(await page.locator(`.tc-answer [data-source-unit="${SLIDES_40[i].sourceId}-reveal-${revealStart}"]`).count()===1,`${SLIDES_40[i].sourceId} ${SLIDES_40[i].id}: source answer appears after attempt`);
   rows.at(-1).expandedHeight=await current.evaluate(el=>el.getBoundingClientRect().height);
  }
  if(SLIDES_40[i].sourceId==="s12"&&SLIDES_40[i].id.endsWith("-01")){await page.getByRole("button",{name:/When you arrive/}).click();check((await page.locator(".tc-feedback").innerText()).includes("Present Simple"),"temporal clause repair feedback");rows.at(-1).expandedHeight=await current.evaluate(el=>el.getBoundingClientRect().height);}
  if(rows.at(-1).expandedHeight>1200)check(false,`${size.width} ${SLIDES_40[i].id}: expanded practice height >1200 (${rows.at(-1).expandedHeight})`);
 }
 const sorted=rows.map(r=>r.height).sort((a,b)=>a-b);const pct=p=>sorted[Math.min(sorted.length-1,Math.ceil(p*sorted.length)-1)];
 report.viewports.push({width:size.width,height:size.height,stepCount:rows.length,median:pct(.5),p90:pct(.9),maximum:Math.max(...sorted),above1200:rows.filter(r=>r.height>1200).map(r=>r.id),expandedPractice:rows.filter(r=>r.expandedHeight!==r.height).map(r=>({id:r.id,initial:r.height,expanded:r.expandedHeight})),overflowSteps:rows.filter(r=>r.overflow).map(r=>r.id),overlapSteps:rows.filter(r=>r.overlap).map(r=>r.id),unreachableSteps:rows.filter(r=>r.unreachable).map(r=>r.id),steps:rows});
 check(!requests.some(url=>/solutionsData40|TeacherGuide40|SolutionsArea40/.test(url)),`${size.width}: no protected answer/teacher chunks requested while learning`);
 // Verify test progress and one-at-a-time assessment.
 await page.locator("nav button").filter({hasText:"منطقة الاختبار المستقلة"}).click();await page.locator("#lesson40-test").waitFor();
 check(await page.locator("[data-test-question]").count()===1,`${size.width}: test presents one question at a time`);
 await page.locator("[data-test-question='1'] button").first().focus();await page.keyboard.press("Enter");check(await page.locator("[data-test-question='1']").count()===1,"keyboard can select an answer without correctness feedback");
 for(let q=2;q<=25;q++){await page.getByRole("button",{name:"السؤال التالي ←"}).click();check(await page.locator(`[data-test-question="${q}"]`).count()===1,`${size.width}: question navigation reaches Q${q}`);}
 check(await page.getByLabel("تقدم إجابات الاختبار").getAttribute("max")==="25",`${size.width}: accessible 25-question progress control`);
 check(await page.locator(".tc40 [role=alert]").count()===0,"no premature correctness/alert in test");
 await page.screenshot({path:`${out}/${size.width}-test-q25.png`,fullPage:true});
 loadStage="post-test-submission";await page.getByRole("button",{name:/تسليم الاختبار النهائي/}).click();await page.locator("#lesson40-solutions").waitFor({timeout:20000});
 check(await page.locator("[data-solution-item]").count()===25,`${size.width}: submit unlocks all 25 solution cards`);
 check((await page.locator("[data-score-summary]").innerText()).includes("1 / 20")&&(await page.locator("[data-score-summary]").innerText()).includes("5 أسئلة مفاهيمية"),`${size.width}: score feedback is model-match only and leaves five conceptual items for human review`);
 await page.screenshot({path:`${out}/${size.width}-solutions-unlocked.png`,fullPage:true});
 await page.locator("nav button").filter({hasText:"مساحة المعلم"}).click();
 await page.locator("#teacher40-password").fill("wrong");await page.locator("form").getByRole("button").click();
 check(await page.getByText(/الرمز غير صحيح/).count()===1,`${size.width}: wrong teacher password rejected`);
 loadStage="teacher-password-accepted";await page.locator("#teacher40-password").fill("somer173");await page.locator("form").getByRole("button").click();await page.getByText("دليل المعلم الشامل ومفاتيح الحلول وسجل التغطية — الدرس 40").waitFor({timeout:20000});
  check(await page.locator("text=الجواب:").count()>=25,`${size.width}: authorized teacher guide loads all final solutions`);
 await page.screenshot({path:`${out}/${size.width}-teacher-open.png`,fullPage:true});
}
check(report.errors.length===0,`no browser runtime errors (${report.errors.join("; ")})`);
report.answerModuleNetwork.sort((a,b)=>a.viewport-b.viewport);
fs.writeFileSync(`${out}/height-audit.json`,JSON.stringify(report,null,2));
fs.writeFileSync(`${out}/height-audit.md`, `# Lesson 40 browser verification\n\nReal Chromium, complete step walk at 1280×800 and 1920×1080. Checks: ${report.checks.filter(c=>c.pass).length} passed / ${report.checks.filter(c=>!c.pass).length} failed.\n\n| Viewport | Steps | Median initial | p90 initial | Max initial | >1200px | Expanded practice max | Overflow / unreachable |\n|---|---:|---:|---:|---:|---:|---:|---|\n${report.viewports.map(v=>`| ${v.width}×${v.height} | ${v.stepCount} | ${v.median.toFixed(1)}px | ${v.p90.toFixed(1)}px | ${v.maximum.toFixed(1)}px | ${v.above1200.join(", ")||"none"} | ${Math.max(...v.expandedPractice.map(x=>x.expanded),0).toFixed(1)}px | ${v.overflowSteps.length}/${v.unreachableSteps.length} |`).join("\n")}\n\nExpanded practice details and step-level records: [height-audit.json](height-audit.json). Screenshot set is representative, not every step.\n`);
await browser.close();
const failed=report.checks.filter(c=>!c.pass);console.log(`Browser audit: ${report.checks.length-failed.length} passed, ${failed.length} failed; ${SLIDES_40.length} steps at both laptop viewports.`);if(failed.length){for(const f of failed.slice(0,30))console.error("-",f.message);process.exitCode=1;}
