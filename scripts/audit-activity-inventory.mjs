// Exhaustive source-site census, deliberately distinct from behavioral certification.
// A changed/new handler, native input, disclosure, or delegated event prop fails
// the checked-in manifest comparison. --require-verified additionally fails on
// any activity whose complete behavioral contract has not been reviewed.
import ts from 'typescript';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const files = dir => readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):/\.tsx?$/.test(e.name)?[join(dir,e.name)]:[]);
const manifest='docs/audits/activity-inventory.json';
const records=[];
for(const file of files('src').filter(f=>f.endsWith('.tsx')).sort()){
 const source=readFileSync(file,'utf8'),sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const lesson=Number(/lesson(\d+)\//.exec(file)?.[1])||null;
 const owners=new Map();
 function owner(node){
  for(let p=node;p;p=p.parent){
   if(ts.isFunctionDeclaration(p)&&p.name)return p.name.text;
   if(ts.isVariableDeclaration(p)&&ts.isIdentifier(p.name)&&/^[A-Z]/.test(p.name.text))return p.name.text;
  }return '<module>';
 }
 function walk(node){
  if(ts.isJsxOpeningElement(node)||ts.isJsxSelfClosingElement(node)){
   const tag=node.tagName.getText(sf),attrs=node.attributes.properties.filter(ts.isJsxAttribute);
   const events=attrs.filter(a=>/^on[A-Z]/.test(a.name.text));
   if(events.length||['input','select','textarea','details','form','button'].includes(tag)){
    const name=owner(node),key=`${file}#${name}`;
    if(!owners.has(key))owners.set(key,{id:key,lesson,component:name,source:file,kind:lesson?'lesson-control-template':'shared-or-shell-template',sites:[],feedbackTiming:'UNVERIFIED',resetBehavior:'UNVERIFIED',behavioralCoverage:'UNVERIFIED',reviewStatus:'open'});
    const parent=ts.isJsxElement(node.parent)?node.parent:null;
    const body=parent?parent.children.map(c=>c.getText(sf)).join(' ').replace(/\s+/g,' ').trim():'';
    const bindings=[];
    for(let p=node.parent;p;p=p.parent){if(ts.isCallExpression(p)&&ts.isPropertyAccessExpression(p.expression)&&p.expression.name.text==='map')bindings.push(p.expression.expression.getText(sf));if(ts.isFunctionDeclaration(p))break;}
    const attr=a=>attrs.find(x=>x.name.text===a)?.initializer?.getText(sf)||null;
    const handlers=events.map(a=>({event:a.name.text,expression:a.initializer?.getText(sf)||''}));
    const normalized=node.getText(sf).replace(/\s+/g,' ').trim();
    const fingerprint=createHash('sha256').update(normalized+'\n'+body).digest('hex').slice(0,16);
    owners.get(key).sites.push({id:`${key}/${owners.get(key).sites.length+1}`,tag,type:attr('type'),line:sf.getLineAndCharacterOfPosition(node.getStart(sf)).line+1,column:sf.getLineAndCharacterOfPosition(node.getStart(sf)).character+1,handlers,labelEvidence:body.slice(0,450),ariaLabel:attr('aria-label'),dataBindings:bindings,
     nativeKeyboard:['button','input','select','textarea','details'].includes(tag),keyboardHandler:events.some(a=>/^onKey/.test(a.name.text)),
     checkEvidence:/تحق|تصحيح|إرسال|إنهاء|تسليم|check|submit/i.test(body+' '+JSON.stringify(handlers)),
     resetEvidence:/إعادة|أعد|↺|reset|restart/i.test(body+' '+JSON.stringify(handlers)),fingerprint});
   }
  }
  ts.forEachChild(node,walk);
 }
 walk(sf);records.push(...owners.values());
}
const sourceDigest=createHash('sha256');
for(const file of files('src').sort())sourceDigest.update(file+'\0'+readFileSync(file,'utf8')+'\0');
const report={sourceDataFingerprint:sourceDigest.digest('hex'),scope:'All JSX interactive control definitions in src/**/*.tsx, including delegated props and source bindings. A template is NOT every runtime data-bound activity instance. No behavioral claim follows from discovery.',records};
mkdirSync('docs/audits',{recursive:true});
const json=JSON.stringify(report,null,2)+'\n';
if(process.argv.includes('--write')){
 writeFileSync(manifest,json);
 const lines=['# Interactive control census','',report.scope,'','All contracts below remain explicitly open until reviewed and exercised. Native keyboard support is a property of a control, not certification of its whole task.','', '| Lesson | Component / activity template | Source sites | Check evidence | Reset evidence | Behavioral review |','|---|---|---:|---|---|---|',...records.map(r=>`| ${r.lesson||'shared/shell'} | \`${r.id}\` | ${r.sites.length} | ${r.sites.some(s=>s.checkEvidence)?'present in source':'not established'} | ${r.sites.some(s=>s.resetEvidence)?'present in source':'not established'} | OPEN |`)];
 writeFileSync('docs/audits/ACTIVITY-INVENTORY.md',lines.join('\n')+'\n');
}else{
 assert.equal(readFileSync(manifest,'utf8'),json,'Interactive source census drift. Review new/changed sites and regenerate the manifest; do not silently omit them.');
}
const total=records.reduce((n,r)=>n+r.sites.length,0);
console.log(`Activity census: ${records.length} component templates / ${total} source control sites across all 32 lessons and shared shells. All are accounted for in the manifest; runtime-instance enumeration and behavioral certification remain OPEN.`);
if(process.argv.includes('--require-verified'))assert.equal(records.filter(r=>r.reviewStatus!=='verified').length,0,'Not all discovered activity contracts are verified');
