import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {browser} from './lib/browser.mjs';
const input=process.argv[2]||'node_modules/bidi-scenes-before.json';
const output=process.argv[3]||'docs/audits/bidi-scene-geometry-before.json';
const scenes=JSON.parse(input.endsWith('.gz')?gunzipSync(readFileSync(input)).toString():readFileSync(input,'utf8'));
const css=readdirSync('dist/assets').filter(f=>f.endsWith('.css')).map(f=>readFileSync('dist/assets/'+f,'utf8')).join('\n');
const b=await browser(),results=[];
try{
 const page=await b.newPage();
 for(const scene of scenes){
  assert(scene.origin,'Every finding must have an actual rendered origin: '+scene.logical);
  const measurements=[];
  for(const width of [1180,390]){
   await page.setViewportSize({width,height:900});
   await page.setContent(`<style>${css}\n*,*::before,*::after{animation:none!important;transition:none!important}.pop{opacity:1!important;transform:none!important}</style><div dir="rtl">${scene.html}</div>`);
   const target=page.locator(`[data-render-origin=${JSON.stringify(scene.origin)}]`).nth(scene.occurrence);
   assert.equal(await target.count(),1);
   measurements.push(await target.evaluate((el,{latin,arabic,width})=>{
    const chars=[],walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
    while(node=walker.nextNode())for(let i=0;i<node.length;i++){const range=new Range();range.setStart(node,i);range.setEnd(node,i+1);const r=range.getBoundingClientRect();chars.push({c:node.data[i],x:r.x,y:r.y,w:r.width,h:r.height});}
    const normalized=chars.filter(c=>!/\s/.test(c.c));const text=normalized.map(c=>c.c).join('');
    function sample(needle){const n=needle.replace(/\s/g,''),at=text.indexOf(n);if(at<0)return null;const cs=normalized.slice(at,at+n.length);return {text:needle,chars:cs,visible:cs.some(c=>c.w>0&&c.h>0)};}
    const en=sample(latin),ar=sample(arabic),style=getComputedStyle(el);
    return {width,text:el.textContent,direction:style.direction,display:style.display,elementRects:el.getClientRects().length,english:en,arabic:ar,sameLine:en&&ar?Math.min(en.chars[0].y+en.chars[0].h,ar.chars[0].y+ar.chars[0].h)>Math.max(en.chars[0].y,ar.chars[0].y):null,englishFirstLeft:en&&ar?en.chars[0].x<ar.chars[0].x:null};
   },{latin:scene.latin,arabic:scene.arabic,width}));
  }
  results.push({id:createHash('sha256').update(JSON.stringify([scene.lesson,scene.kind,scene.latin,scene.arabic])).digest('hex').slice(0,16),lesson:scene.lesson,step:scene.step,origin:scene.origin,signature:scene.sig,logical:scene.logical,latin:scene.latin,arabic:scene.arabic,renderedElement:scene.element,measurements});
 }
 writeFileSync(output,JSON.stringify({browser:b.version(),scope:'Actual rendered App step snapshots with production CSS; animations frozen at their final state. Coordinates alone do not decide source semantics or certify every interaction state.',results},null,2)+'\n');
 console.log(`Measured ${results.length}/${scenes.length} actual finding scenes at desktop and narrow widths.`);
}finally{await b.close();}
