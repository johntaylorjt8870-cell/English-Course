import ts from 'typescript';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

// Audit-only host attributes. No production source, events, or state is modified.
export function activityInstrumentation(root) {
  const manifest=JSON.parse(readFileSync('docs/audits/activity-inventory.json','utf8'));
  return { name:'activity-provenance', setup(build) {
    build.onLoad({filter:/src\/.*\.tsx$/},args=>{
      const file=relative(root,args.path),source=readFileSync(args.path,'utf8');
      const sites=manifest.records.filter(r=>r.source===file).flatMap(r=>r.sites.map(s=>({...s,owner:r.id})));
      const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),edits=[];
      function walk(n){if(ts.isJsxOpeningElement(n)||ts.isJsxSelfClosingElement(n)){
        const tag=n.tagName.getText(sf),line=sf.getLineAndCharacterOfPosition(n.getStart(sf)).line+1;
        const site=sites.find(s=>s.tag===tag&&s.line===line&&s.column===sf.getLineAndCharacterOfPosition(n.getStart(sf)).character+1);
        if(site&&/^[a-z]/.test(tag))edits.push({at:n.tagName.end,text:` data-audit-owner=${JSON.stringify(site.owner)} data-audit-control=${JSON.stringify(site.id)}`});
      }ts.forEachChild(n,walk)}walk(sf);
      let contents=source;for(const e of edits.sort((a,b)=>b.at-a.at))contents=contents.slice(0,e.at)+e.text+contents.slice(e.at);
      return {contents,loader:'tsx'};
    });
  }};
}
export function observeActivities(document,lesson,step){
  const main=document.querySelector('main')||document.body;
  const groups=new Map();
  for(const el of main.querySelectorAll('[data-audit-owner]')){
    if(el.closest('nav,aside,[hidden]'))continue;
    const text=(el.getAttribute('aria-label')||el.textContent||el.getAttribute('placeholder')||'').replace(/\s+/g,' ').trim();
    const task=el.closest('[data-test-q],[data-ft-q],[data-quiz-q],[data-gate]');
    const taskId=task?[...task.attributes].filter(a=>/^data-(test-q|ft-q|quiz-q|gate)$/.test(a.name)).map(a=>`${a.name}=${a.value}`).join(','):'unlabelled-task';
    const owner=el.getAttribute('data-audit-owner'),id=`L${lesson}/step-${step}/${owner}/${taskId}`;
    if(!groups.has(id))groups.set(id,{id,lesson,step,owner,taskId,title:main.querySelector('h1,h2,h3')?.textContent?.trim()||null,controls:[],feedbackTiming:'not certified by initial-state crawl',resetBehavior:'not exercised',keyboardBehavior:'not exercised',coverage:'initial rendered state only'});
    groups.get(id).controls.push({site:el.getAttribute('data-audit-control'),tag:el.tagName,type:el.getAttribute('type'),text:text.slice(0,250),disabled:!!el.disabled,ariaLabel:el.getAttribute('aria-label'),role:el.getAttribute('role'),checkAction:/تحق|تصحيح|إنهاء|إرسال|تسليم/.test(text),resetAction:/إعادة|أعد|↺/.test(text)});
  }
  return [...groups.values()];
}
