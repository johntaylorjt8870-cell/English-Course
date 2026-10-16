// Optional real Chromium verification. Provision with:
// npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Run with the existing Vite server: node scripts/audit-lesson42-browser.mjs
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';
const work='node_modules/.lesson42-browser';mkdirSync(work,{recursive:true});
// The sandbox lacks NSS/NSPR. Use the libraries bundled by the npm Chromium package.
writeFileSync(`${work}/al2023.tar`,brotliDecompressSync(readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')));
execFileSync('tar',['-xf',`${work}/al2023.tar`,'-C',work]);
process.env.LD_LIBRARY_PATH=`${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH||''}`;
const browser=await playwright.launch({args:chromium.args,executablePath:await chromium.executablePath(),headless:true});
let checks=0;const failures=[],screenshots=[],errors=[],contrasts=[];
const ok=(condition,message)=>{checks++;if(!condition)failures.push(message);};
const output='docs/lesson42-visual';mkdirSync(output,{recursive:true});
const requests=[], externalNetworkErrors=[];const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'){const url=m.location().url||'';if(url.startsWith('https://fonts.googleapis.com')||url.startsWith('https://fonts.gstatic.com'))externalNetworkErrors.push({url,message:m.text()});else errors.push(m.text()+' '+url);}});page.on('request',r=>requests.push(r.url()));
await page.addInitScript(()=>localStorage.setItem('englishwithsomer-site-unlocked','unlocked'));
const base=process.env.LESSON42_URL||'http://127.0.0.1:5173/English-Course/#/lesson/42';
async function shot(name){const path=`${output}/${name}.png`;await page.screenshot({path,fullPage:false});screenshots.push(path);}
const stationStarts=[0,6,12,17,20,22,26,30,34,40];
async function openNav(){const button=page.locator('.mobileToggle42');if(await button.isVisible()&&await button.getAttribute('aria-expanded')!=='true')await button.click();}
async function step(number){const station=stationStarts.findLastIndex(start=>number>=start);await openNav();await page.locator('.station42 > button').nth(station).click();await openNav();await page.locator('.sectionsNav42 button').nth(number-stationStarts[station]).click();await page.locator(`[data-source-section="${number?'s'+String(number).padStart(2,'0'):'cover'}"]`).first().waitFor();}
async function rendered(label){
 const result=await page.locator('.lesson42').evaluate(root=>{
  const rgb=color=>(color.match(/[\d.]+/g)||[]).map(Number);
  const lum=color=>{const a=color.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return a[0]*.2126+a[1]*.7152+a[2]*.0722;};
  const issues=[];let tested=0,min=100;
  for(const el of root.querySelectorAll('*')){
   if(!el.getClientRects().length||getComputedStyle(el).visibility==='hidden'||el.tagName==='OPTION')continue;
   if(![...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&!el.matches('input,textarea,select'))continue;
   const style=getComputedStyle(el),fg=rgb(style.color);let node=el,bg;
   while(node){const color=rgb(getComputedStyle(node).backgroundColor);if(color.length>=3&&(color[3]===undefined||color[3]>=.99)){bg=color;break;}node=node.parentElement;}
   bg??=[255,255,255];const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);tested++;min=Math.min(min,ratio);
   if(ratio<4.5)issues.push({text:(el.textContent||el.getAttribute('aria-label')||el.tagName).slice(0,90),ratio,fg:style.color,bg});
  }
  const refs=[...root.querySelectorAll('[aria-labelledby],[aria-describedby],[aria-controls]')].flatMap(el=>['aria-labelledby','aria-describedby','aria-controls'].flatMap(attr=>(el.getAttribute(attr)||'').split(/\s+/).filter(Boolean))).filter(id=>!document.getElementById(id));
  return {width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,tested,min,issues,refs};
 });
 contrasts.push({label,...result});ok(result.scroll<=result.width,`${label}: no page overflow (${result.scroll}/${result.width})`);ok(result.issues.length===0,`${label}: contrast ${JSON.stringify(result.issues.slice(0,4))}`);ok(result.refs.length===0,`${label}: ARIA targets resolve`);
}
try{
 await page.goto(base);await page.locator('.cover42').waitFor();await rendered('desktop-cover');await shot('desktop-cover');
 ok(await page.locator('.areas42 button').nth(2).isDisabled(),'initial solutions locked');
 ok(!requests.some(u=>/solutionsData42|SolutionsArea42|TeacherGuide42/.test(u)),'initial keys and teacher guide not requested');
 await step(0);await page.locator('.dialGroup42').nth(1).getByRole('button',{name:'COULD',exact:true}).click();ok((await page.locator('.formula42').first().textContent()).startsWith('I could'),'control panel switches channel');
 await step(3);const rule=page.locator('[data-exercise-id="rule-1"]');await rule.getByRole('group',{name:'اختر الإجابة'}).getByRole('button').first().click();await rule.locator('.primary42').click();ok(await rule.locator('[role=status]').count()===1,'meaning lab answers with feedback');
 await step(4);const build=page.locator('[data-exercise-id="build-1"]');await build.getByRole('button',{name:'She',exact:true}).click();await build.locator('.primary42').click();ok(await build.locator('.feedback42.error').count()===1,'sentence builder names the broken rule');
 await step(8);await page.locator('[data-exercise-id="neg-can"] select').selectOption({index:1});await page.locator('[data-exercise-id="neg-can"]').getByRole('button',{name:'كوّن النفي'}).click();ok((await page.locator('[data-exercise-id="neg-can"] .formula42').textContent()).includes("can't"),'negative transformation inverts modal');
 await step(17);const success=page.locator('[data-exercise-id="success-2"]');await success.getByRole('button',{name:'was able to'}).click();await success.locator('.primary42').click();ok((await success.locator('[role=status]').textContent()).includes('محدد'),'past ability vs specific success explains the contrast');
 await step(20);const studio=page.locator('[data-exercise-id="studio-permission-1"]');await studio.getByRole('button',{name:'Could I...?'}).click();await studio.locator('.primary42').click();ok((await studio.locator('[role=status]').textContent()).includes('I'),'politeness studio justifies the choice');
 await step(21);const detective=page.locator('[data-exercise-id="detective-1-1"]');await detective.getByRole('button').first().click();await detective.locator('.primary42').click();ok(await detective.locator('[role=status]').count()===1,'context detective checks the function');
 await step(31);const repair=page.locator('[data-exercise-id="repair-1"]');ok(await repair.locator('[role=status]').count()===0,'repair key absent before attempt');await repair.locator('select').selectOption('إضافة s إلى CAN/COULD');await repair.locator('textarea').fill('She can swim.');await repair.locator('.primary42').click();ok((await repair.locator('[role=status]').textContent()).includes('She can swim.'),'error repair reveals the source key after the attempt');
 await step(34);const p34=page.locator('[data-practice-id="p34-1"]');ok(await p34.locator('[role=status]').count()===0,'practice key absent before attempt');await p34.locator('textarea').fill('can');await p34.locator('.primary42').click();ok(await p34.locator('[role=status]').count()===1,'practice comparison follows attempt');
 await step(38);const p38=page.locator('[data-practice-id="p38-7"]');ok(await p38.locator('textarea').count()===2,'detective repair wants correction and reason');await p38.locator('textarea').nth(0).fill('I will be able to finish the project tomorrow.');ok(await p38.locator('.primary42').isDisabled(),'repair still needs the reason');await p38.locator('textarea').nth(1).fill('will can → will be able to');await p38.locator('.primary42').click();ok(await p38.locator('[role=status]').count()===1,'detective repair comparison follows attempt');
 await step(39);ok((await page.locator('.step42').textContent()).includes('The Young Inventor'),'reading challenge renders');const p39=page.locator('[data-practice-id="p39-1"]');await p39.locator('textarea').fill('He is thirteen years old.');await p39.locator('.primary42').click();ok(await p39.locator('[role=status]').count()===1,'comprehension comparison follows attempt');
 await step(42);await page.locator('textarea').first().fill(Array(12).fill('I can swim and I could run fast.').join(' '));ok((await page.locator('[role=status]').first().textContent()).includes('12 /'),'sentence counter responds');ok(await page.locator('.checklist42 li').count()===10,'ten writing criteria');await page.getByRole('button',{name:'النموذج الإرشادي — مرجع منفصل'}).click();ok((await page.locator('.reference42').textContent()).includes('ثماني جمل'),'model limitation explicit');
 // Full student flow: every source step remains reachable, including all exercises.
 for(let n=0;n<=44;n++){await step(n);await rendered(`desktop-step-${n}`);}
 ok(!requests.some(u=>/solutionsData42|SolutionsArea42|TeacherGuide42/.test(u)),'all ordinary student steps keep final keys/teacher guide unloaded');
 await page.locator('.areas42 button').nth(1).click();ok(await page.locator('[data-question-id]').count()===25,'exactly 25 displayed final questions');ok(await page.locator('[data-test-level]').count()===5,'five levels');ok(await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).isDisabled(),'incomplete submission disabled');await rendered('desktop-test');await shot('desktop-test');
 for(const q of await page.locator('[data-question-id]').all()){const radios=q.locator('input[type=radio]');if(await radios.count())await radios.first().check();else for(const input of await q.locator('textarea').all())await input.fill('My attempt');}
 await page.locator('[data-question-id=q7] textarea').nth(1).fill('');ok(await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).isDisabled(),'Q7 second field required in browser');await page.locator('[data-question-id=q7] textarea').nth(1).fill('play');
 ok(!requests.some(u=>/solutionsData42|SolutionsArea42|TeacherGuide42/.test(u)),'completed but unsubmitted test still does not load keys');
 await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).click();await page.locator('[data-area=solutions]').waitFor();ok(await page.locator('[data-area=solutions] > .panel42').count()===26,'all 25 detailed solutions displayed');await rendered('desktop-solutions');await shot('desktop-solutions');
 await page.locator('.areas42 button').nth(1).click();await page.getByRole('button',{name:'إعادة الاختبار ومسح الإجابات'}).click();ok(await page.locator('.areas42 button').nth(2).isDisabled(),'reset relocks solutions');ok(await page.locator('input[type=radio]:checked').count()===0,'reset clears MCQ state');ok(await page.locator('textarea').evaluateAll(nodes=>nodes.every(n=>n.value==='')),'reset clears all text fields');
 await page.locator('.areas42 button').nth(3).click();await page.getByLabel('رمز المعلم').fill('wrong');await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();ok(await page.getByRole('alert').count()===1,'wrong teacher password rejected');ok(!requests.some(u=>/TeacherGuide42/.test(u)),'teacher guide not loaded after failed password');await rendered('desktop-teacher-locked');await shot('desktop-teacher-locked');
 const password=readFileSync('src/lessons/lesson40/TeacherArea40.tsx','utf8').match(/TEACHER_PASSWORD_40 = "([^"]+)"/)[1];await page.getByLabel('رمز المعلم').fill(password);await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();await page.locator('[data-teacher-guide]').waitFor();ok(await page.locator('[data-teacher-answer]').count()===43,'teacher has every practice key');await rendered('desktop-teacher');await shot('desktop-teacher');await page.getByRole('button',{name:'قفل مساحة المعلم'}).click();ok(await page.locator('[data-teacher-guide]').count()===0,'teacher relock unmounts guide');ok(await page.locator('.areas42 button').nth(2).isDisabled(),'teacher relock removes unsubmitted solutions access');
 await page.locator('.areas42 button').nth(0).click();await page.setViewportSize({width:375,height:812});
 for(let n=0;n<=44;n++){await step(n);await rendered(`mobile-step-${n}`);if([0,4,8,17,21,31,38,39,42,44].includes(n))await shot(`mobile-step-${n}`);}
 await page.locator('.areas42 button').nth(1).click();await rendered('mobile-test');await shot('mobile-test');
 await page.locator('.areas42 button').nth(3).click();await rendered('mobile-teacher-gate');await shot('mobile-teacher-gate');
 await page.getByLabel('رمز المعلم').fill(password);await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();await page.locator('[data-teacher-guide]').waitFor();await rendered('mobile-teacher-guide');await shot('mobile-teacher-guide');await page.locator('.areas42 button').nth(2).click();await page.locator('[data-area=solutions]').waitFor();await rendered('mobile-solutions');await shot('mobile-solutions');
 ok(errors.length===0,`no browser console/page errors: ${errors.join('; ')}`);
}finally{
 const report={browser:await browser.version(),url:base,viewports:[{width:1280,height:900},{width:375,height:812}],checks,failures,errors,externalNetworkErrors,screenshots,renderedChecks:contrasts};
 writeFileSync(`${output}/verification.json`,JSON.stringify(report,null,2)+'\n');await browser.close();
}
console.log(`Real Chromium Lesson 42: ${checks} checks, ${failures.length} failures.`);if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
