import ts from 'typescript';
import {readFileSync} from 'node:fs';
import {relative} from 'node:path';

// Audit-only host provenance. No production markup, state, or event is changed.
export function renderOriginInstrumentation(root) {
 return {name:'render-origin',setup(build){build.onLoad({filter:/src\/.*\.tsx$/},args=>{
  const source=readFileSync(args.path,'utf8'),file=relative(root,args.path);
  const sf=ts.createSourceFile(file,source,99,true,ts.ScriptKind.TSX),edits=[];
  function walk(n){if((ts.isJsxOpeningElement(n)||ts.isJsxSelfClosingElement(n))&&/^[a-z]/.test(n.tagName.getText(sf))){
   let owner='<module>';for(let p=n.parent;p;p=p.parent){if(ts.isFunctionDeclaration(p)&&p.name){owner=p.name.text;break;}}
   const pos=sf.getLineAndCharacterOfPosition(n.getStart(sf));
   edits.push({at:n.tagName.end,text:` data-render-origin=${JSON.stringify(`${file}#${owner}:${pos.line+1}:${pos.character+1}`)}`});
  }ts.forEachChild(n,walk)}walk(sf);
  let contents=source;for(const e of edits.sort((a,b)=>b.at-a.at))contents=contents.slice(0,e.at)+e.text+contents.slice(e.at);
  return {contents,loader:'tsx'};
 });}};
}
