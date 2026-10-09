import { execFileSync } from 'node:child_process';
import { browser } from './lib/browser.mjs';
import { build } from 'esbuild';
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const file = resolve('node_modules/.bidi-browser.mjs');
await build({ stdin: { contents: `export {LatinRuns, EnAr, splitMixedText} from './src/shared/bidi'; export {Rich, En} from './src/shared/lessonKit'; export {renderToStaticMarkup as render} from 'react-dom/server'; export {createElement as h} from 'react';`, resolveDir: process.cwd(), loader: 'tsx' }, bundle: true, jsx: 'automatic', packages: 'external', platform: 'node', format: 'esm', outfile: file });
const { LatinRuns, EnAr, En, Rich, render, h, splitMixedText } = await import(pathToFileURL(file));
rmSync(file);
const previousFile=resolve('node_modules/.bidi-before-boundary.mjs');
await build({stdin:{contents:execFileSync('git',['show','59ba597:src/shared/bidi.tsx'],{encoding:'utf8'}),resolveDir:process.cwd(),loader:'tsx'},bundle:true,jsx:'automatic',packages:'external',platform:'node',format:'esm',outfile:previousFile});
const {LatinRuns: PreviousLatinRuns}=await import(pathToFileURL(previousFile));rmSync(previousFile);
const css = readdirSync('dist/assets').filter(f => f.endsWith('.css')).map(f => readFileSync(`dist/assets/${f}`, 'utf8')).join('\n');
const b = await browser();
try {
 const page = await b.newPage({ viewport: { width: 800, height: 600 } });
 async function chars(html, width = 760) {
   await page.setContent(`<style>${css}</style><div id="line" dir="rtl" style="font-size:24px;width:${width}px">${html}</div>`);
   return page.locator('#line').evaluate(p => {
     const chars = []; const w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT); let n;
     while ((n = w.nextNode())) for (let i = 0; i < n.length; i++) {
       const r = new Range(); r.setStart(n, i); r.setEnd(n, i+1); const box = r.getBoundingClientRect();
       chars.push({ c: n.data[i], x: box.x, y: box.y });
     }
     return chars;
   });
 }
 const index = (cs, text) => cs.map(c => c.c).join('').indexOf(text);
 const punctuationCorrect = cs => { const i = index(cs, 'had.'); return i >= 0 && cs[i+3].x > cs[i+2].x; };
 const broken = await chars('نستخدم <span dir="ltr">had</span>.');
 assert.equal(punctuationCorrect(broken), false, 'negative control: orphaned period must fail geometry oracle');
 const capital=await chars(render(h(Rich,{text:'استخدام Had.'})));const hi=index(capital,'Had.');assert(capital[hi+3].x>capital[hi+2].x,'Had final period is to the right of d');
 for (const text of ['نستخدم [[had]].', 'نستخدم had.', 'نستخدم [[had]]!', 'نستخدم [[had]]?', 'نستخدم [[had]],', 'نستخدم [[had]];', 'نستخدم [[had]]:']) {
   const cs = await chars(render(h(Rich, {text}))); const i=index(cs,'had'); assert(i>=0); assert(cs[i+3].x>cs[i+2].x, text);
 }
 for (const text of ['حدث [بلا had].', 'حدث (بلا had).', 'حدث {بلا had}.']) {
   const cs=await chars(render(h(LatinRuns,{text})));const i=index(cs,'had'); const open=cs.find(c=>'[({'.includes(c.c)); const close=cs.find(c=>'])}'.includes(c.c));
   assert(open.x > cs[i].x && close.x < cs[i].x, `paired RTL enclosure: ${text}`);
 }
 for (const text of ['«had» — شرح', '“had” — شرح', '"had" — شرح']) {
   const cs=await chars(render(h(LatinRuns,{text})));const i=index(cs,'had'); assert(cs[i-1].x<cs[i].x && cs[i+3].x>cs[i+2].x, `paired English quotes: ${text}`);
 }
 for (const text of ['[[have]] / [[has]] — شرح', 'IQ200 — had danced أم was dancing؟', 'had + V3 → الفعل الثالث', 'had = الماضي', 'had: شرح']) {
   const html=render(h(Rich,{text}));const cs=await chars(html);const a=index(cs,text.startsWith('[[')?'have':text.startsWith('IQ')?'had danced':'had');const z=index(cs,text.startsWith('[[')?'has':text.startsWith('IQ')?'was dancing':text.includes('V3')?'V3':'شرح');
   if(z>=0) assert(cs[a].x<cs[z].x,text);
 }
 const evidence=[];
 const oldEnclosure=await chars(render(h(PreviousLatinRuns,{text:'اختر (a أو an).'})));
 const oldA=index(oldEnclosure,'a'),oldAn=index(oldEnclosure,'an');
 assert(oldEnclosure[oldA].x>oldEnclosure[oldAn].x,'59ba597 negative control reproduces reversed bracketed choices');
 evidence.push({category:'59ba597 negative control',text:'اختر (a أو an).',first:oldEnclosure[oldA],second:oldEnclosure[oldAn]});
 // Unmatched opening enclosure previously swallowed the first English choice.
 // These exact parser-boundary forms exercise quotes/highlights and wrapping.
 for(const width of [760,280])for(const text of ['اختر (a أو an).','اختر [a أو an].','اختر {a أو an}.','اختر ("a" أو "an").','اختر ([[a]] أو an).']){
   const cs=await chars(render(h(Rich,{text})),width),a=index(cs,'a'),z=index(cs,'an');
   assert(a>=0&&z>a);assert.equal(cs[a].y,cs[z].y);assert(cs[a].x<cs[z].x,text);
   assert(await page.locator('#line').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
   evidence.push({category:'English after unmatched enclosure',text,width,first:cs[a],second:cs[z]});
 }
 for(const [text,en,ar] of [['Subject = الفاعل','Subject','الفاعل'],['now · الآن','now','الآن'],['Present: read = ريد','Present','ريد'],['vowel + y — نحتفظ بـ y:','vowel','نحتفظ'],['الماضي على الفعل: went = الماضي','went','الماضي']]){
   const cs=await chars(render(h(Rich,{text}))),a=index(cs,en),z=cs.map(c=>c.c).join('').lastIndexOf(ar);
   assert(cs[a].x<cs[z].x,text);evidence.push({category:'whole semantic phrase instead of split siblings',text,width:760,english:cs[a],arabic:cs[z]});
 }
 writeFileSync('docs/audits/bidi-boundary-geometry.json',JSON.stringify({browser:b.version(),evidence},null,2)+'\n');
 // Previously separate flex siblings: labels and source references must
 // remain a single semantic unit, even inside an RTL shell.
 for(const [en,ar] of [['SOURCE SECTION','أهداف الدرس'],['DEMONSTRATIVE RADAR','الرادار يقرأ العدد والمسافة'],['a','قبل اسم مفرد يبدأ بصوت ساكن'],['an','قبل اسم مفرد يبدأ بصوت علة'],['TIME SENSOR','حالة خاصة: كلمة time لها وجهان'],['Countable Plural','كثير من الأشياء المعدودة.']]){
   const cs=await chars(render(h(EnAr,{en,ar})));assert(cs[index(cs,en)].x<cs[index(cs,ar)].x,'label/gloss order: '+en);
 }
 const mixedEn=await chars(render(h(En,{children:'He / She / It → is (المفرد الغائب)'})));
 assert(mixedEn[index(mixedEn,'He')].x<mixedEn[index(mixedEn,'المفرد')].x,'mixed source passed through En retains Arabic gloss');
 const joined=await chars(render(h(Rich,{text:'الأساس — was / were · القاعدة الأساسية'})));
 assert(joined[index(joined,'was')].x<joined[index(joined,'القاعدة')].x,'rail section and title grouped together');
 await chars(render(h(Rich,{text:'نستخدم [[had]] ثم had.'})));
 assert.equal(await page.locator('#line .rounded-lg').count(),1,'only the marked occurrence is highlighted');
 await chars(render(h(Rich,{text:'نستخدم [[had + V3]]، [[الشرح]] محفوظ.'})));
 assert.deepEqual(await page.locator('#line .rounded-lg').allTextContents(),['had + V3','الشرح']);
 const ar=await chars(render(h(LatinRuns,{text:'نستخدم had، ثم نشرح؟'}))); assert(ar[index(ar,'،')].x < ar[index(ar,'had')].x, 'Arabic comma stays in RTL sentence');
 assert.equal(splitMixedText('حدث [بلا had].').find(s=>s.kind==='en').text.trim(),'had');
 await chars(render(h(Rich,{text:'هذا شرح [[had + V3]] — الماضي التام. '.repeat(12)})),280);
 assert(await page.locator('#line').evaluate(el=>el.scrollWidth <= el.clientWidth+1),'mobile wrapping: no horizontal overflow');
 await chars('<span class="font-en" dir="rtl">شرح عربي</span>');
 assert.equal(await page.locator('#line span').evaluate(el=>getComputedStyle(el).direction),'rtl');
 console.log(`PASS: Chromium ${b.version()} — punctuation, brackets, quotes, alternatives, highlight boundaries, Arabic punctuation, RTL override, mobile wrapping; negative control fails as intended.`);
} finally { await b.close(); }
