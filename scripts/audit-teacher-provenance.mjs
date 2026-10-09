import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import ts from 'typescript';
const coverage=JSON.parse(readFileSync('docs/audits/teacher-source-coverage.json','utf8'));
const original=JSON.parse(execFileSync('git',['show','ee70138:docs/audits/teacher-source-coverage.json'],{encoding:'utf8'}));
const tracked=execFileSync('git',['ls-files'],{encoding:'utf8'}).trim().split('\n');
const media=tracked.filter(f=>/\.(pdf|png|jpe?g|webp|tiff?|heic|docx)$/i.test(f));
const digest=f=>createHash('sha256').update(readFileSync(f)).digest('hex');
const evidenceCache=new Map();
function evidence(n){
 if(evidenceCache.has(n))return evidenceCache.get(n);
 const files=tracked.filter(f=>(f.startsWith(`src/lessons/lesson${n}/`)&&/\.ts$/.test(f))||new RegExp(`^docs/lesson${n}(?:-|\\.)`).test(f));
 const out=files.map(file=>{
  const text=readFileSync(file,'utf8');const sf=ts.createSourceFile(file,text,99,true);
  const exports=[],pageMetadata=[];
  function walk(x){
   if(ts.isVariableStatement(x)&&x.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword))for(const d of x.declarationList.declarations)exports.push(d.name.getText(sf));
   if(ts.isPropertyAssignment(x)&&/^(page|sourcePage|printedQuestionNumber|originalQuestionNumber)$/.test(x.name.getText(sf)))pageMetadata.push({line:sf.getLineAndCharacterOfPosition(x.pos).line+1,field:x.name.getText(sf),value:x.initializer.getText(sf)});
   ts.forEachChild(x,walk);
  }
  if(file.endsWith('.ts'))walk(sf);
  return {file,sha256:digest(file),kind:/ledger|source\.md$/.test(file)?'repository transcription/derived source ledger; not an original scan':'canonical lesson data or coverage documentation',exports,pageMetadata};
 });evidenceCache.set(n,out);return out;
}
assert.deepEqual(coverage.gaps.map(g=>g.id).sort(),original.gaps.map(g=>g.id).sort(),'Original gap identity must be reconciled, not dropped');
const rows=coverage.gaps.map(g=>{
 const lesson=coverage.lessons.find(l=>l.lesson===g.lesson);
 const group=lesson?.groups.find(x=>x.id===g.id);
 const files=evidence(g.lesson);
 const locations=[];
 if(group)for(const e of files.filter(e=>e.file.endsWith('.ts'))){
  const text=readFileSync(e.file,'utf8'),sf=ts.createSourceFile(e.file,text,99,true);
  function walk(x){if(ts.isStringLiteral(x)&&x.text===group.reference)locations.push({file:e.file,line:sf.getLineAndCharacterOfPosition(x.getStart(sf)).line+1,text:x.text});ts.forEachChild(x,walk)}walk(sf);
 }
 return {
  originalId:g.id,lesson:g.lesson,sourceItem:group?.reference||'Original record covers the lesson, not identified textbook question IDs',
  canonicalLocations:locations,evidence:files,
  knownReferenceNumbers:group?.items.map(q=>({referenceNumber:q.number,id:q.id,segments:q.segments}))||[],
  knownCanonicalQuestions:g.items||[],
  originalQuestionText:group?.originalQuestionText??null,sourcePage:null,
  verificationResult:'UNRESOLVED',
  reason:group?'The teacher answer-group heading and numbered answer segments are present, but their identity/wording against the original textbook question is not evidenced by a scan or an explicit source-question mapping.':g.lesson===2?'29 canonical question objects are mapped and navigable; no original textbook scan/page/printed-number evidence is supplied.':'This original gap does not identify a textbook exercise or question. Canonical lesson data exists, but treating all its examples/exercises as identified textbook items would invent provenance.',
  missing:group?['Original question/sub-question wording linked to this exact reference','Source evidence for printed numbering','Page citation if present on the source']:g.lesson===2?['Original source corresponding to each listed canonical question','Printed question/sub-question identifiers','Page citation if present on the source']:['Identity and original wording of the textbook items represented by this lesson-level gap','Original source pages/images or a reliable text transcription with item mapping','Correspondence to each teacher solution and its reasoning'],
  solutionCoverage:group?{originalLinesPreserved:group.originalLines.length,numberedReferences:group.items.length,finalAnswerAgainstOriginal:'not verified',reasoningAgainstOriginal:'not verified',navigation:'Existing authenticated exercise selector and numbered-reference selector'}:g.lesson===2?{canonicalQuestionsNavigable:29,finalAnswerAgainstCanonical:'29/29 verified by audit-lesson2-activities',finalAnswerAgainstOriginal:'0/29 verified',reasoning:'Added reasoning labeled Platform Explanation; original-source reasoning unavailable',navigation:'Existing authenticated Lesson 2 source-question selector'}:{navigation:'No confidently identified textbook item to link; existing assessment keys are not a substitute'},
  remainingAction:'Supply or identify the original source for this exact record, compare every number/value/question and solution, then add explicit source-to-solution links. Do not infer page numbers from section indices.'
 };
});
// Discovery does not auto-close source verification. Future reviewed closures must
// retain the original rows and supply independent question/solution evidence.
const unresolved=rows.filter(r=>r.verificationResult==='UNRESOLVED').length;
const closed=rows.length-unresolved;
const report={base:'ee70138',scope:'Every original open provenance record; canonical retrieval is not original textbook provenance',trackedMedia:media.map(file=>({file,sha256:digest(file)})),sourceEvidenceNote:'Repository transcriptions and generated coverage documents are listed separately from independent source media. A missing page number is never manufactured.',originalRecords:original.gaps.length,closed,unresolved,rows};
const output='docs/audits/teacher-provenance.json',serialized=JSON.stringify(report,null,2)+'\n';
if(process.argv.includes('--write')){
 writeFileSync(output,serialized);
 let md='# Teacher provenance closure table\n\nAll '+rows.length+' original gap IDs are retained. **0 closed / '+rows.length+' unresolved**. Original PDF/image/document assets found among tracked repository files: **'+media.length+'**. Canonical data and derived ledgers are not independent proof of original textbook identity.\n\n| Original ID | Lesson | Source item | Evidence inspected | Result / missing evidence | Next action |\n|---|---:|---|---|---|---|\n';
 const escape=x=>x.replaceAll('|','\\|').replaceAll('\n',' ');
 for(const r of rows)md+=`| ${r.originalId} | ${r.lesson} | ${escape(r.sourceItem)} | ${r.evidence.map(e=>'`'+e.file+'`').join('<br>')} | UNRESOLVED: ${escape(r.reason)} | ${escape(r.missing.join('; '))} |\n`;
 writeFileSync('docs/audits/TEACHER-PROVENANCE.md',md);
}else assert.equal(readFileSync(output,'utf8'),serialized,'Provenance evidence/gap drift requires a reviewed update');
console.log(`Teacher provenance: ${rows.length}/${original.gaps.length} original records itemized; 0 closed, ${rows.length} unresolved; ${media.length} tracked original-media candidates. Canonical mappings do not close provenance gaps.`);
if(process.argv.includes('--require-closed'))assert.equal(unresolved,0,'Original teacher-source provenance remains unresolved; retain all original IDs');
