import {readFileSync,writeFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
const before=JSON.parse(readFileSync('docs/audits/bidi-scene-geometry-before.json','utf8')).results;
const after=JSON.parse(readFileSync('docs/audits/bidi-scene-geometry-after.json','utf8')).results;
const scenes=JSON.parse(gunzipSync(readFileSync('docs/audits/bidi-scenes-before.json.gz')).toString());
const crawl=JSON.parse(readFileSync('docs/audits/bidi-after.json','utf8'));
const key=f=>JSON.stringify([f.lesson,f.kind||f.category,f.latin,f.arabic]);
const open=new Set(crawl.findings.map(key));
const notes={
 '96ed9167e8093a85':'Native select: the inferred Verb to beArticle target concatenates mutually exclusive options. Native option glyph ranges are zero; selected-option rendering has not been certified. Do not treat zero rectangles as passing evidence.',
 '915a29c9e3a772cb':'Arabic-led negative/question clauses separated by an em dash. The oracle pairs don’t with the next clause label, not its own label. English question punctuation still needs a clause-aware regression; blindly grouping across the dash risks changing meaning.',
 '079db2a35ac08a74':'Independent cover pills, not a translated label. Row oracle conflates neighboring topic tags. Their intended order and wrapping require an explicit source-semantic contract.',
 '831dc6b412dd91e2':'Rail alternative question followed by Arabic instruction. Actual desktop punctuation/instruction wraps; rail is hidden at narrow width. No mobile geometry claim; clause boundaries and punctuation remain unresolved.',
 '1f1841687ac3c5ed':'Inferred Latin begins with the preceding Arabic sentence’s period. Actual plays starts left of its Arabic explanation. Exact oracle boundary review needed; not waived.',
 '5d2600af3fc51a3a':'Consonant + y formula: plus is outside the isolated y. Whether plus belongs to the preceding Arabic operand or the English token needs an explicit expression contract; no silent source rewrite.',
 '562538031bc27572':'The inferred . book starts at the preceding Arabic sentence’s period. The actual b is left of الاسم; oracle boundary candidate, retained without exemption.',
 'f9237450d963f0c6':'The inferred . their starts at a preceding Arabic sentence’s period. Actual their is left of its gloss; oracle boundary candidate, retained without exemption.',
 '4eb0b06b0eb57373':'Arabic ownership map contains noun + possessive suffix. Plus is not grouped with the suffix; choosing an expression boundary without source-semantic verification risks changing the map.',
 'ad2b68b306713fc6':'Independent cover topic pills; row oracle interprets English topic and Arabic topic as a translation. Needs a pill-order contract, not a blanket flex exception.',
 'b54105dc01804489':'Mixed Arabic/English pluralization title plus separate exception note. Applying English-only label direction to the whole Arabic-led title would be unsafe.',
 '60de322313989b5f':'This chip is embedded in an Arabic question, followed by في السؤال الأول؟; the suffix is not a translation of this. Preserve RTL question reading and test chip/punctuation boundaries.',
 '021f190787ad1406':'That chip is embedded in an Arabic question, followed by في السؤال الثاني؟; not a translated label. Needs RTL question-flow regression.',
 '0331e606d113e795':'These chip followed by Arabic connective مع and notebooks; not a translation. Both English tokens and question punctuation need a complete sentence test.',
 '54248a7bcad27bbd':'Those chip followed by Arabic connective مع and bicycles; not a translation. Do not reverse the whole Arabic question to satisfy a pair heuristic.',
 '1dce6f6e34d28783':'English noun phrase followed by Arabic conjunction و; the conjunction connects another phrase, not a gloss. Full question-flow contract remains open.',
 '773a481a0b1af9c6':'Possessive noun phrase followed by ولم نقل and a contrasting phrase. It is a contrast question, not English-to-Arabic translation.',
 '18a83403b0994ab2':'Recall pills and final Arabic continuation وحتى الجمل الأطول. Different roles are conflated as a bilingual label by the row oracle; no exemption added.',
 '99286d6e998604cf':'Countable pieces followed by contrast وليس information نفسها. English target and Arabic connective are not a definition pair; needs whole-statement geometry.',
 '0d4d768034b4d07e':'Correct some rice and incorrect alternative separated by وليس. Preserve contrast sequence; pairing correct answer with connective alone would misrepresent the source.',
 'db0737a7ecea1a9a':'Inferred . few includes previous Arabic sentence punctuation. Actual few is left of its explanation; retained pending exact oracle-boundary regression.',
 'd77b545c7e96f088':'Inferred . little includes previous Arabic sentence punctuation. Actual little is left of its explanation; retained pending exact oracle-boundary regression.',
 '63dd1e6803e58088':'Past Continuous / لكن / contrasting tense is a contrast sequence, not label/gloss. Complete contrast reading order needs verification.',
 '5115d4dba8ae89f4':'Progressive formula followed by و joining another pattern. Conjunction is not a gloss; full expression sequence remains unverified.'
};
const records=before.map(b=>{
 const scene=scenes.find(s=>s.lesson===b.lesson&&s.latin===b.latin&&s.arabic===b.arabic);assert(scene);
 const dom=new JSDOM(scene.html);
 let host=[...dom.window.document.querySelectorAll('[data-render-origin]')].filter(e=>e.getAttribute('data-render-origin')===scene.origin)[scene.occurrence];
 let lessonOrigin=null;
 for(let el=host;el;el=el.parentElement){const value=el.getAttribute('data-render-origin');if(value?.startsWith(`src/lessons/lesson${b.lesson}/`)){lessonOrigin=value;break;}}
 dom.window.close();
 assert(lessonOrigin,'Every case requires a lesson host as well as a shared-renderer origin');
 const remaining=open.has(key(scene));const a=after.find(r=>r.id===b.id);assert(a);
 const suffix=['99bfce27a88ed27a','502c3967f41dc6d5'].includes(b.id);
 const cause=remaining?notes[b.id]:suffix?'Shared parser trimmed the attached suffix hyphen as preceding punctuation. Preserve a leading hyphen immediately attached to a Latin token.':'Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss.';
 assert(cause,'Every original finding needs an individual classification');
 return {id:b.id,lesson:b.lesson,category:scene.kind==='para'?'pair':scene.kind,logical:b.logical,latin:b.latin,arabic:b.arabic,sourceOrigin:b.origin,lessonOrigin,currentOrigin:a.origin,severity:remaining?'Potential instructional reading-order/punctuation issue; unresolved, including heuristic candidates':'Instructional label/suffix reading-order defect',status:remaining?'OPEN — not waived':'REPAIRED — real-source geometry and original negative control pass',cause,evidence:['bidi-scene-geometry-before.json#'+b.id,'bidi-scene-geometry-after.json#'+b.id],negativeControl:remaining?'No passing repair contract; remains blocking':'Original actual App DOM fails the same character-position contract at one or both widths',viewports:[1180,390]};
});
const byLesson=Array.from({length:32},(_,i)=>({lesson:i+1,before:records.filter(r=>r.lesson===i+1).length,after:crawl.findings.filter(r=>r.lesson===i+1).length}));
const report={base:'ee70138',original:records.length,repaired:records.filter(r=>r.status.startsWith('REPAIRED')).length,open:crawl.findings.length,matchingExemptions:0,categoryBefore:Object.fromEntries(['pair','row'].map(c=>[c,records.filter(r=>r.category===c).length])),categoryAfter:Object.fromEntries(['pair','row'].map(c=>[c,crawl.findings.filter(r=>r.category===c).length])),byLesson,records};
assert.equal(report.original,48);assert.equal(report.repaired,24);assert.equal(report.open,24);
writeFileSync('docs/audits/bidi-scene-review.json',JSON.stringify(report,null,2)+'\n');
let md='# Continuation from ee70138: all 48 original BIDI findings\n\n24 repaired / 24 OPEN / zero new exceptions. Both viewports use actual App snapshots and Chromium glyph ranges. OPEN includes heuristic candidates, not automatically proven defects or waivers. The narrow rail is hidden and native option glyph ranges are not evidence of correctness.\n\n| Lesson | Before | Remaining |\n|---|---:|---:|\n';
for(const l of byLesson)md+=`| ${l.lesson} | ${l.before} | ${l.after} |\n`;
md+='\n| Original ID | Exact source origin | Status | Cause / remaining action |\n|---|---|---|---|\n';
for(const r of records)md+=`| ${r.id} | \`${r.sourceOrigin}\` | ${r.status} | ${r.cause.replaceAll('|','\\|')} |\n`;
writeFileSync('docs/audits/BIDI-SCENE-REVIEW.md',md);
console.log(JSON.stringify({original:48,repaired:report.repaired,open:report.open,categoryBefore:report.categoryBefore,categoryAfter:report.categoryAfter}));
