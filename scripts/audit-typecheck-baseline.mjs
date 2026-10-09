// Build is not typechecking. Keep the failing explicit current/base comparison
// reproducible until the repository has a maintained project tsconfig.
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const base='1f879216d96edea741e4b28db8b58449bb98adaf';
const folder='node_modules/.type-baseline';
mkdirSync(folder,{recursive:true});
const archive=spawnSync('git',['archive',base,'src'],{maxBuffer:32*1024*1024});
assert.equal(archive.status,0,archive.stderr.toString());
const extract=spawnSync('tar',['-x','-C',folder],{input:archive.stdout});
assert.equal(extract.status,0,extract.stderr.toString());
const flags=['--noEmit','--jsx','react-jsx','--moduleResolution','bundler','--module','esnext','--target','es2022','--lib','es2022,dom','--allowSyntheticDefaultImports','--skipLibCheck'];
function run(entry){
 const r=spawnSync(process.execPath,['node_modules/typescript/bin/tsc',...flags,entry],{encoding:'utf8',maxBuffer:8*1024*1024});
 assert([0,1,2].includes(r.status),'TypeScript did not run: '+r.stderr);
 const diagnostics=[];
 for(const line of r.stdout.split('\n')){
  const m=/^(.*?)\((\d+),(\d+)\): error (TS\d+): (.*)$/.exec(line);
  if(m)diagnostics.push({file:m[1].replace(folder+'/',''),line:+m[2],column:+m[3],code:m[4],message:m[5]});
  else if(line.trim()&&diagnostics.length)diagnostics.at(-1).message+='\n'+line;
 }
 return {exitCode:r.status,diagnostics};
}
const current=run('src/main.tsx'),baseline=run(folder+'/src/main.tsx');
const key=d=>`${d.file}: ${d.code}: ${d.message}`;
function subtract(a,b){const rest=b.map(key);return a.filter(d=>{const i=rest.indexOf(key(d));if(i<0)return true;rest.splice(i,1);return false;});}
const added=subtract(current.diagnostics,baseline.diagnostics),removed=subtract(baseline.diagnostics,current.diagnostics);
const report={base,flags,current,baseline,added,removed,conclusion:current.diagnostics.length?'Typecheck FAILS. A zero added count is a regression comparison, not a clean typecheck.':'Current explicit typecheck passes.'};
mkdirSync('docs/audits',{recursive:true});
writeFileSync('docs/audits/typecheck-comparison.json',JSON.stringify(report,null,2)+'\n');
console.log(`Explicit tsc: current ${current.diagnostics.length} diagnostics (exit ${current.exitCode}); base ${baseline.diagnostics.length} (exit ${baseline.exitCode}); added ${added.length}, removed ${removed.length}. ${report.conclusion}`);
assert.equal(added.length,0,'New normalized TypeScript diagnostics');
