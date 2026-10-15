// Optional real Chromium verification. Provision with:
// npm install --no-save --package-lock=false playwright-core @sparticuz/chromium
// Run with the existing Vite server: node scripts/audit-lesson41-browser.mjs
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';
const work='node_modules/.lesson41-browser';mkdirSync(work,{recursive:true});
// The sandbox lacks NSS/NSPR. Use the libraries bundled by the npm Chromium package.
writeFileSync(`${work}/al2023.tar`,brotliDecompressSync(readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')));
execFileSync('tar',['-xf',`${work}/al2023.tar`,'-C',work]);
process.env.LD_LIBRARY_PATH=`${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH||''}`;
const browser=await playwright.launch({args:chromium.args,executablePath:await chromium.executablePath(),headless:true});
let checks=0;const failures=[],screenshots=[],errors=[],contrasts=[];
const ok=(condition,message)=>{checks++;if(!condition)failures.push(message);};
const output='docs/lesson41-visual';mkdirSync(output,{recursive:true});
const requests=[], externalNetworkErrors=[];const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'){const url=m.location().url||'';if(url.startsWith('https://fonts.googleapis.com')||url.startsWith('https://fonts.gstatic.com'))externalNetworkErrors.push({url,message:m.text()});else errors.push(m.text()+' '+url);}});page.on('request',r=>requests.push(r.url()));
await page.addInitScript(()=>localStorage.setItem('englishwithsomer-site-unlocked','unlocked'));
const base=process.env.LESSON41_URL||'http://127.0.0.1:5173/English-Course/#/lesson/41';
async function shot(name){const path=`${output}/${name}.png`;await page.screenshot({path,fullPage:false});screenshots.push(path);}
const stationStarts=[0,5,11,18,24,30,36];
async function openNav(){const button=page.locator('.mobileToggle41');if(await button.isVisible()&&await button.getAttribute('aria-expanded')!=='true')await button.click();}
async function step(number){const station=stationStarts.findLastIndex(start=>number>=start);await openNav();await page.locator('.station41 > button').nth(station).click();await openNav();await page.locator('.sectionsNav41 button').nth(number-stationStarts[station]).click();await page.locator(`[data-source-section="${number?'s'+String(number).padStart(2,'0'):'cover'}"]`).first().waitFor();}
async function rendered(label){
 const result=await page.locator('.lesson41').evaluate(root=>{
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
 await page.goto(base);await page.locator('.cover41').waitFor();await rendered('desktop-cover');await shot('desktop-cover');
 ok(await page.locator('.areas41 button').nth(2).isDisabled(),'initial solutions locked');
 ok(!requests.some(u=>/solutionsData41|SolutionsArea41|TeacherGuide41/.test(u)),'initial keys and teacher guide not requested');
 await page.locator('.engineTabs41 button').nth(2).click();ok((await page.locator('.engineDetail41').textContent()).includes('I have bought a bicycle.'),'engine selection updates context');
 await page.keyboard.press('Tab');await page.locator('.engineTabs41 button').nth(2).focus();ok(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle!=='none'),'visible keyboard focus');await shot('desktop-selected-focus');
 await page.locator('.engineTabs41 button').nth(0).hover();await rendered('desktop-hover');const box=await page.locator('.engineTabs41 button').nth(0).boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await rendered('desktop-active');await page.mouse.up();
 await step(3);await page.locator('.exercise41').first().getByRole('button',{name:'مساعد',exact:true}).click();ok(await page.locator('.feedback41.error').count()===1,'role error feedback');await rendered('desktop-role-error');
 await page.locator('.exercise41').first().getByRole('button',{name:'رئيسي',exact:true}).click();ok((await page.locator('.feedback41').first().textContent()).includes('صحيح'),'role success feedback');
 for(const n of [5,11,18,25]){
  await step(n);await rendered(`desktop-station-${n}`);await shot(`desktop-station-${n}`);
  if(n===5||n===11){const card=page.locator('.exercise41').first();await card.locator('select').selectOption({index:1});await card.getByRole('button').click();ok(await card.locator('[role=status]').count()===1,`builder ${n} responds`);await rendered(`desktop-builder-${n}-feedback`);}
  if(n===18){await page.getByRole('button',{name:'Future Perfect',exact:true}).click();await page.getByLabel('أضف الاستمرار').check();ok((await page.locator('.formula41').textContent()).includes('She will have been studying.'),'perfect continuous composition');ok((await page.locator('.token41.first').textContent()).startsWith('will'),'only will labelled first');}
  if(n===25){await page.locator('.field41 select').selectOption('2');await page.getByRole('button',{name:'will',exact:true}).click();await page.getByRole('button',{name:'كوّن سؤالًا'}).click();ok((await page.locator('.feedback41').last().textContent()).includes('Will she have been studying?'),'first auxiliary question');await page.getByRole('button',{name:'كوّن نفيًا'}).click();ok((await page.locator('.feedback41').last().textContent()).includes("She won't have been studying."),'first auxiliary negative');await page.locator('.field41 select').selectOption('3');await page.getByRole('button',{name:'لا يوجد',exact:true}).click();await page.getByRole('button',{name:'كوّن سؤالًا'}).click();ok((await page.locator('.feedback41').last().textContent()).includes('Does she study?'),'no auxiliary do-support');}
 }
 await step(29);const errorCard=page.locator('[data-practice-id="p29-1"]');ok(await errorCard.locator('.feedback41').count()===0,'error answer absent before attempt');ok(await errorCard.getByRole('button').isDisabled(),'repair requires input');await errorCard.locator('textarea').nth(0).fill('Does she study English?');ok(await errorCard.getByRole('button').isDisabled(),'repair also requires reason');await errorCard.locator('textarea').nth(1).fill('studies → study: does carries agreement');await errorCard.getByRole('button').click();ok(await errorCard.locator('.feedback41').count()===1,'repair feedback follows attempt');await rendered('desktop-error-detective');await shot('desktop-error-detective');
 await step(35);ok(await page.locator('[data-practice-id]').count()===10,'ten reading questions');ok((await page.locator('.source41').first().textContent()).includes('She hopes her classmates will enjoy it.'),'complete reading ending');await page.getByRole('checkbox').check();await rendered('desktop-reading');await shot('desktop-reading');
 await step(38);await page.locator('textarea').fill(Array(12).fill('I am a student.').join(' '));ok((await page.locator('[role=status]').textContent()).includes('12 /'),'sentence counter responds');ok(await page.getByRole('checkbox').count()===10,'ten writing criteria');await page.getByRole('button',{name:'النموذج الإرشادي — مرجع منفصل'}).click();ok((await page.locator('.reference41').textContent()).includes('ثماني جمل'),'model limitation explicit');await rendered('desktop-writing');await shot('desktop-writing');
 // Full student flow: every source step remains reachable, including all exercises.
 for(let n=0;n<=40;n++){await step(n);await rendered(`desktop-step-${n}`);}
 ok(!requests.some(u=>/solutionsData41|SolutionsArea41|TeacherGuide41/.test(u)),'all ordinary student steps keep final keys/teacher guide unloaded');
 await page.locator('.areas41 button').nth(1).click();ok(await page.locator('[data-question-id]').count()===25,'exactly 25 displayed final questions');ok(await page.locator('[data-test-level]').count()===5,'five levels');ok(await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).isDisabled(),'incomplete submission disabled');await rendered('desktop-test');await shot('desktop-test');
 for(const q of await page.locator('[data-question-id]').all()){const radios=q.locator('input[type=radio]');if(await radios.count())await radios.first().check();else for(const input of await q.locator('textarea').all())await input.fill('My attempt');}
 await page.locator('[data-question-id=q8] textarea').nth(1).fill('');ok(await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).isDisabled(),'Q8 second field required in browser');await page.locator('[data-question-id=q8] textarea').nth(1).fill('watching');
 ok(!requests.some(u=>/solutionsData41|SolutionsArea41|TeacherGuide41/.test(u)),'completed but unsubmitted test still does not load keys');
 await page.getByRole('button',{name:'تسليم الاختبار النهائي'}).click();await page.locator('[data-area=solutions]').waitFor();ok(await page.locator('[data-area=solutions] > .panel41').count()===26,'all 25 detailed solutions displayed');await rendered('desktop-solutions');await shot('desktop-solutions');
 await page.locator('.areas41 button').nth(1).click();await page.getByRole('button',{name:'إعادة الاختبار ومسح الإجابات'}).click();ok(await page.locator('.areas41 button').nth(2).isDisabled(),'reset relocks solutions');ok(await page.locator('input[type=radio]:checked').count()===0,'reset clears MCQ state');ok(await page.locator('textarea').evaluateAll(nodes=>nodes.every(n=>n.value==='')),'reset clears all text fields');
 await page.locator('.areas41 button').nth(3).click();await page.getByLabel('رمز المعلم').fill('wrong');await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();ok(await page.getByRole('alert').count()===1,'wrong teacher password rejected');ok(!requests.some(u=>/TeacherGuide41/.test(u)),'teacher guide not loaded after failed password');await rendered('desktop-teacher-locked');await shot('desktop-teacher-locked');
 const password=readFileSync('src/lessons/lesson40/TeacherArea40.tsx','utf8').match(/TEACHER_PASSWORD_40 = "([^"]+)"/)[1];await page.getByLabel('رمز المعلم').fill(password);await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();await page.locator('[data-teacher-guide]').waitFor();ok(await page.locator('[data-teacher-answer]').count()===66,'teacher has every practice key');await rendered('desktop-teacher');await shot('desktop-teacher');await page.getByRole('button',{name:'قفل مساحة المعلم'}).click();ok(await page.locator('[data-teacher-guide]').count()===0,'teacher relock unmounts guide');ok(await page.locator('.areas41 button').nth(2).isDisabled(),'teacher relock removes unsubmitted solutions access');
 await page.locator('.areas41 button').nth(0).click();await page.setViewportSize({width:375,height:812});
 for(let n=0;n<=40;n++){await step(n);await rendered(`mobile-step-${n}`);if([0,5,11,18,25,29,35,38,39].includes(n))await shot(`mobile-step-${n}`);}
 await page.locator('.areas41 button').nth(1).click();await rendered('mobile-test');await shot('mobile-test');
 await page.locator('.areas41 button').nth(3).click();await rendered('mobile-teacher-gate');await shot('mobile-teacher-gate');
 await page.getByLabel('رمز المعلم').fill(password);await page.getByRole('button',{name:'فتح مساحة المعلم'}).click();await page.locator('[data-teacher-guide]').waitFor();await rendered('mobile-teacher-guide');await shot('mobile-teacher-guide');await page.locator('.areas41 button').nth(2).click();await page.locator('[data-area=solutions]').waitFor();await rendered('mobile-solutions');await shot('mobile-solutions');
 ok(errors.length===0,`no browser console/page errors: ${errors.join('; ')}`);
}finally{
 const report={browser:await browser.version(),url:base,viewports:[{width:1280,height:900},{width:375,height:812}],checks,failures,errors,externalNetworkErrors,screenshots,renderedChecks:contrasts};
 writeFileSync(`${output}/verification.json`,JSON.stringify(report,null,2)+'\n');await browser.close();
}
console.log(`Real Chromium Lesson 41: ${checks} checks, ${failures.length} failures.`);if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
