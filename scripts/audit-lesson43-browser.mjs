// Optional real Chromium verification. Provision with:
// npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Run with the existing Vite server: node scripts/audit-lesson43-browser.mjs
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';
const work='node_modules/.lesson43-browser';mkdirSync(work,{recursive:true});
// The sandbox lacks NSS/NSPR. Use the libraries bundled by the npm Chromium package.
writeFileSync(`${work}/al2023.tar`,brotliDecompressSync(readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')));
execFileSync('tar',['-xf',`${work}/al2023.tar`,'-C',work]);
process.env.LD_LIBRARY_PATH=`${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH||''}`;
const browser=await playwright.launch({args:chromium.args,executablePath:await chromium.executablePath(),headless:true});
let checks=0;const failures=[],screenshots=[],errors=[],externalNetworkErrors=[];const contrasts=[];
const ok=(condition,message)=>{checks++;if(!condition)failures.push(message);};
const output='docs/lesson43-visual';mkdirSync(output,{recursive:true});
const requests=[],lazyRequests=[];const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
// The sandbox cannot reach Google Fonts; a pending font request stalls
// document.fonts.ready and therefore every screenshot. Abort the requests
// so pages render with system fallbacks (contrast/overflow/ARIA checks are
// font-metric independent). Lesson 42's audit records the same network gap
// under externalNetworkErrors.
await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'){const url=m.location().url||'';if(url.startsWith('https://fonts.googleapis.com')||url.startsWith('https://fonts.gstatic.com'))externalNetworkErrors.push({url,message:m.text()});else errors.push(m.text()+' '+url);}});page.on('request',r=>{requests.push(r.url());if(/solutionsData43|SolutionsArea43|TeacherGuide43/.test(r.url()))lazyRequests.push(r.url());});
await page.addInitScript(()=>localStorage.setItem('englishwithsomer-site-unlocked','unlocked'));
const base=process.env.LESSON43_URL||'http://127.0.0.1:5173/English-Course/#/lesson/43';
async function shot(name){const path=`${output}/${name}.png`;const started=Date.now();console.log(`  [shot] ${name}`);await page.screenshot({path,fullPage:false,timeout:90000,animations:'disabled'});console.log(`  [shot] ${name} done in ${((Date.now()-started)/1000).toFixed(1)}s`);screenshots.push(path);}
const stationStarts=[0,5,8,12,15,18,20,24,26,32,35];
async function openNav(){const button=page.locator('.mobileToggle43');if(await button.isVisible()&&await button.getAttribute('aria-expanded')!=='true')await button.click();}
async function step(number){const station=stationStarts.findLastIndex(start=>number>=start);await openNav();await page.locator('.station43 > button').nth(station).click();await openNav();await page.locator('.sectionsNav43 button').nth(number-stationStarts[station]).click();await page.locator(`[data-source-section="${number?'s'+String(number).padStart(2,'0'):'cover'}"]`).first().waitFor();}
async function rendered(label){
 const result=await page.locator('.lesson43').evaluate(root=>{
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
 await page.goto(base);await page.locator('.cover43').waitFor();await rendered('desktop-cover');await shot('desktop-cover');
 ok(await page.locator('.areas43 button').nth(2).isDisabled(),'initial solutions locked');
 ok(lazyRequests.length===0,'initial keys and teacher guide not requested');
 await step(5);await page.locator('.dialGroup43').nth(1).getByRole('button',{name:'MIGHT',exact:true}).click();ok((await page.locator('.formula43').first().textContent()).startsWith('I might'),'control panel switches MAY→MIGHT');
 await step(2);const prob=page.locator('[data-exercise-id="prob-0"]');await prob.getByRole('group',{name:'اختر الشريط'}).getByRole('button').first().click();await prob.locator('.primary43').click();ok(await prob.locator('[role=status]').count()===1,'probability explorer answers with feedback');ok(await prob.locator('.feedback43.error').count()===0,'the certain fact lands on the certain band');
 await step(3);const build=page.locator('.readout43');await page.locator('.dialGroup43').nth(0).getByRole('button',{name:'She',exact:true}).click();ok((await build.textContent()).includes('She'),'sentence builder shows the subject chip');ok((await page.locator('.formula43').first().textContent()).startsWith('She may'),'builder assembles subject + MAY + V1');
 await step(4);await page.locator('[data-exercise-id="transform-may"] select').selectOption({index:1});await page.locator('[data-exercise-id="transform-may"]').getByRole('button',{name:'كوّن النفي'}).click();ok((await page.locator('[data-exercise-id="transform-may"] .formula43').textContent()).includes('may not'),'negative transformation keeps the modal');
 await step(11);const swap=page.locator('[data-exercise-id="swap-5"]');await swap.getByRole('button').nth(2).click();await swap.locator('.primary43').click();ok(await swap.locator('.feedback43.error').count()===0,'swap lab rejects fixed percentage rankings');
 await step(15);const studio=page.locator('[data-exercise-id="permission-1"]');await studio.getByRole('button',{name:'Could I leave, please?'}).click();await studio.locator('.primary43').click();ok((await studio.locator('[role=status]').textContent()).includes('COULD'),'permission studio justifies the everyday polite choice');
 await step(18);const maybe=page.locator('[data-exercise-id="maybe-0"]');ok(await maybe.locator('[role=status]').count()===0,'maybe/may be key hidden before the attempt');await maybe.getByRole('button',{name:/Maybe — ظرف مستقل/}).click();await maybe.locator('.primary43').click();ok(await maybe.locator('.feedback43.error').count()===0,'standalone adverb classified correctly');
 await step(20);const past=page.locator('[data-exercise-id="past-analyzer-1"]');await past.getByRole('button').first().click();await past.locator('.primary43').click();ok((await past.locator('[role=status]').textContent()).includes('V3'),'past possibility decomposes to modal + have + V3');
 await step(26);ok(await page.locator('.turn43').count()===11,'comprehensive dialogue renders eleven turns');const detective=page.locator('[data-exercise-id="detective-1"]');await detective.getByRole('button').first().click();await detective.locator('.primary43').click();ok(await detective.locator('[role=status]').count()===1,'context detective checks the chosen function');
 await step(27);const both=page.locator('[data-exercise-id="practice-27-1"]');await both.getByRole('button',{name:'MAY',exact:true}).click();await both.locator('.primary43').click();ok(await both.locator('.feedback43.error').count()===0,'MAY accepted where the source allows both');await both.getByRole('button',{name:'MIGHT',exact:true}).click();await both.locator('.primary43').click();ok(await both.locator('.feedback43.error').count()===0,'MIGHT accepted where the source allows both');
 await step(31);const repair=page.locator('[data-exercise-id="error-repair-1"]');ok(await repair.locator('[role=status]').count()===0,'repair key absent before attempt');await repair.locator('textarea').nth(0).fill('She may come tomorrow.');ok(await repair.locator('.primary43').isDisabled(),'repair still wants the reason');await repair.locator('textarea').nth(1).fill('removed the s from may');await repair.locator('.primary43').click();ok((await repair.locator('[role=status]').textContent()).includes('She may come tomorrow.'),'error repair reveals the source key after the attempt');
 await step(32);ok((await page.locator('.step43').textContent()).includes('The Unexpected School Trip'),'reading challenge renders');const reading=page.locator('[data-exercise-id="reading-1"]');ok(await reading.locator('[role=status]').count()===0,'comprehension answer hidden before the attempt');await reading.locator('textarea').fill('a science museum');await reading.locator('.primary43').click();ok(await reading.locator('[role=status]').count()===1,'comprehension comparison follows attempt');
 await step(35);ok(await page.locator('.checklist43 li').count()===10,'ten writing criteria');await page.locator('.checklist43 input[type=checkbox]').first().click();ok((await page.locator('[role=status]').first().textContent()).includes('1 / 10'),'writing checklist counts completed items honestly');
 // Full student flow: every source step remains reachable, including all exercises.
 for(let n=0;n<=37;n++){await step(n);await rendered(`desktop-step-${n}`);}
 ok(lazyRequests.length===0,'all ordinary student steps keep final keys/teacher guide unloaded');
 await page.locator('.areas43 button').nth(1).click();ok(await page.locator('[data-question-id]').count()===25,'exactly 25 displayed final questions');ok(await page.locator('[data-test-level]').count()===5,'five levels');ok(await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).isDisabled(),'incomplete submission disabled');await rendered('desktop-test');await shot('desktop-test');
 for(const q of await page.locator('[data-question-id]').all()){const radios=q.locator('input[type=radio]');if(await radios.count())await radios.first().check();else for(const input of await q.locator('textarea').all())await input.fill('My attempt');}
 await page.locator('[data-question-id=q9] textarea').nth(1).fill('');ok(await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).isDisabled(),'Q9 middle field (HAVE) required in browser');await page.locator('[data-question-id=q9] textarea').nth(1).fill('have');
 ok(lazyRequests.length===0,'completed but unsubmitted test still does not load keys');
 await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).click();await page.locator('[data-area=solutions]').waitFor();ok(await page.locator('[data-area=solutions] > .panel43').count()===26,'all 25 detailed solutions displayed');ok((await page.locator('[data-area=solutions]').textContent()).includes('A — may'),'first detailed key shown after submission');await rendered('desktop-solutions');await shot('desktop-solutions');
 await page.locator('.areas43 button').nth(1).click();await page.getByRole('button',{name:'إعادة الاختبار ومسح الإجابات'}).click();ok(await page.locator('.areas43 button').nth(2).isDisabled(),'reset relocks');ok(await page.locator('input[type=radio]:checked').count()===0,'reset clears MCQ state');ok(await page.locator('textarea').evaluateAll(nodes=>nodes.every(n=>n.value==='')),'reset clears all text fields');
 await page.locator('.areas43 button').nth(3).click();const lazyBeforeTeacherGate=lazyRequests.length;await page.getByLabel('رمز المعلم').fill('wrong');await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();ok(await page.getByRole('alert').count()===1,'wrong teacher password rejected');ok(lazyRequests.length===lazyBeforeTeacherGate,'teacher guide not loaded after failed password');await rendered('desktop-teacher-locked');await shot('desktop-teacher-locked');
 const password=readFileSync('src/lessons/lesson40/TeacherArea40.tsx','utf8').match(/TEACHER_PASSWORD_40 = "([^"]+)"/)[1];await page.getByLabel('رمز المعلم').fill(password);await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();await page.locator('[data-teacher-guide]').waitFor();ok(await page.locator('[data-teacher-answer]').count()===43,'teacher has every practice key');await rendered('desktop-teacher');await shot('desktop-teacher');await page.getByRole('button',{name:'قفل مساحة المعلم'}).click();ok(await page.locator('[data-teacher-guide]').count()===0,'teacher relock unmounts guide');ok(await page.locator('.areas43 button').nth(2).isDisabled(),'teacher relock removes unsubmitted solutions access');
 await page.locator('.areas43 button').nth(0).click();await page.setViewportSize({width:375,height:812});
 for(let n=0;n<=37;n++){await step(n);await rendered(`mobile-step-${n}`);if([0,2,5,11,15,18,20,26,31,32,35,37].includes(n))await shot(`mobile-step-${n}`);}
 await page.locator('.areas43 button').nth(1).click();await rendered('mobile-test');await shot('mobile-test');
 await page.locator('.areas43 button').nth(3).click();await rendered('mobile-teacher-gate');await shot('mobile-teacher-gate');
 await page.getByLabel('رمز المعلم').fill(password);await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();await page.locator('[data-teacher-guide]').waitFor();await rendered('mobile-teacher-guide');await shot('mobile-teacher-guide');await page.locator('.areas43 button').nth(2).click();await page.locator('[data-area=solutions]').waitFor();await rendered('mobile-solutions');await shot('mobile-solutions');
 ok(errors.length===0,`no browser console/page errors: ${errors.join('; ')}`);
}finally{
 const report={browser:await browser.version(),url:base,viewports:[{width:1280,height:900},{width:375,height:812}],checks,failures,errors,externalNetworkErrors,lazyRequests,screenshots,renderedChecks:contrasts};
 writeFileSync(`${output}/verification.json`,JSON.stringify(report,null,2)+'\n');await browser.close();
}
console.log(`Real Chromium Lesson 43: ${checks} checks, ${failures.length} failures.`);if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
