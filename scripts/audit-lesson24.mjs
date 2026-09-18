import { createRequire } from 'node:module';
import { readFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require=createRequire(import.meta.url); const esbuild=require('esbuild');
const root=join(dirname(fileURLToPath(import.meta.url)),'..'); const out=join(root,'scripts','.lesson24-audit.mjs'); const fail=[]; let checks=0;
const ok=(x,m)=>{checks++; if(!x){fail.push(m); console.error('✕ '+m)} else console.log('✓ '+m)};
await esbuild.build({absWorkingDir:root,stdin:{contents:`import React from 'react'; import {renderToString} from 'react-dom/server'; import Lesson24 from ${JSON.stringify(join(root,'src/lessons/lesson24/Lesson24.tsx'))}; import {SOURCE_SECTIONS,TRAINING1,TRAINING2,TRAINING3,TRAINING4,TRAINING5,DETECTIVE,IQ200,MEANING,MINI_TEST} from ${JSON.stringify(join(root,'src/lessons/lesson24/data.ts'))}; export {React,renderToString,Lesson24,SOURCE_SECTIONS,TRAINING1,TRAINING2,TRAINING3,TRAINING4,TRAINING5,DETECTIVE,IQ200,MEANING,MINI_TEST};`,resolveDir:root,loader:'tsx'},bundle:true,platform:'node',format:'esm',outfile:out,jsx:'automatic',packages:'external',logLevel:'silent'});
try {const m=await import(pathToFileURL(out).href); const html=m.renderToString(m.React.createElement(m.Lesson24,{onExit:()=>{}})); const plain=html.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&');
 ok(html.length>50000,'Lesson 24 SSR renders substantial student-facing output'); ok(html.includes('dir="rtl"'),'Arabic shell is RTL'); ok((html.match(/data-source-section=/g)||[]).length===m.SOURCE_SECTIONS.length,`all ${m.SOURCE_SECTIONS.length} source markers render`); ok(!html.includes(String.fromCodePoint(0x1f1ec,0x1f1e7)),'no GB flag branding'); ok(html.includes('تحقق من الإجابات'),'neutral check interactions render');
 for(const [name,arr] of [['Training 1',m.TRAINING1],['Training 2',m.TRAINING2],['Training 3',m.TRAINING3],['Training 4',m.TRAINING4],['Training 5',m.TRAINING5],['Grammar Detective',m.DETECTIVE],['IQ200',m.IQ200],['Meaning Challenge',m.MEANING]]) {ok(arr.every(x=>plain.includes(x)),`${name}: all ${arr.length} supplied items reach rendered output`)}
 ok(m.MINI_TEST.length===8 && m.MINI_TEST.every(x=>plain.includes(x[0])), 'mini final test: all 8 questions render');
 for(const s of ['many books','much water','a few books','few books','a little water','little water','some books','some water','any books','any water','a lot of books','a lot of water','lots of books','lots of water','How many apples do you need?','How much water do you drink?','There are many books.','There is much water.','three times']) ok(plain.includes(s),`BIDI/source phrase renders: ${s}`);
 ok(plain.includes('There are a lot of students in the classroom.'),'intentionally correct detective sentence preserved'); ok(plain.includes('12 customers')&&plain.includes('3 tables')&&plain.includes('2 chefs'),'Final Boss requirements render'); ok(plain.includes('Past Continuous'),'roadmap renders');
 // --- Render-level source ledger: every unit's full body + title must reach the rendered UI ---
 const norm=(x)=>String(x).replace(/[\s\u200b\u200c\u2060]/g,'');
 const plainN=norm(plain);
 for(const s of m.SOURCE_SECTIONS){ok(plainN.includes(norm(s.title)),`render-level ledger: title of unit "${s.id}" reaches UI`);ok(plainN.includes(norm(s.body)),`render-level ledger: full body of unit "${s.id}" reaches UI`)}
 const markers=[...html.matchAll(/data-source-section="(\d+)"/g)].map((x)=>x[1]);
 ok(markers.length===m.SOURCE_SECTIONS.length&&new Set(markers).size===m.SOURCE_SECTIONS.length&&m.SOURCE_SECTIONS.every((_,i)=>markers.includes(String(i+1))),`render-level ledger: markers 01..${m.SOURCE_SECTIONS.length} each present exactly once`);
} catch(e){ok(false,e.stack||String(e))} finally {rmSync(out,{force:true})} if(fail.length){console.error(`Lesson 24 audit FAILED (${fail.length}/${checks})`);process.exit(1)} console.log(`Lesson 24 audit passed (${checks} assertions): ${checks} checks, ${fail.length} failures.`);
