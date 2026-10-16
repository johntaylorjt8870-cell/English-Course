import { createContext, Fragment, useContext, type ReactNode } from 'react';
import { Rich } from '../../shared/lessonKit';
import { splitMixedText } from '../../shared/bidi';

// The Obligation Lab — lesson-local kit. Shared mixed-BIDI
// rendering is reused unchanged; every visual token is scoped beneath
// `.lesson44` in lesson44.css.
export const Workspace44 = createContext<{values:Record<string,string>; set:(key:string,value:string)=>void}>({values:{},set:()=>{}});
export function useField44(key:string): [string,(value:string)=>void] {
  const store=useContext(Workspace44); return [store.values[key] ?? '', value=>store.set(key,value)];
}
const ALT_REGION44 = /(?:[:،؛—–\-]?\s*)?[A-Za-z0-9][A-Za-z0-9 '’.,?!:;+\-/()]*\s+(?:أو|أم)\s+(?:[A-Za-z0-9][A-Za-z0-9 '’.,?!:;+\-/()]*\s+(?:أو|أم)\s+)*[A-Za-z0-9][A-Za-z0-9 '’.,?!:;+\-/()]*(?:[؟?!.،,؛;]+)?/g;
function AltRegion44({region}:{region:string}) {
  const tokens = region.split(/\s+(أو|أم)\s+/);
  const items: string[] = []; const connectors: string[] = [];
  tokens.forEach((token, i) => { if (i % 2 === 0) items.push(token); else connectors.push(token); });
  return (
    <span dir="ltr" className="ltr-pair">
      {items.map((item, j) => (
        <Fragment key={j}>
          {j > 0 && <Fragment>{" "}<span dir="rtl">{connectors[j - 1]}</span>{" "}</Fragment>}
          <span dir="ltr" className="font-en">{item}</span>
        </Fragment>
      ))}
    </span>
  );
}
export function Text44({text}:{text:string}) {
  const english=/[A-Za-z]/.test(text)&&!/[؀-ۿ]/.test(text);
  if (english) return <span dir="ltr" lang="en" className="en44">{text}</span>;
  const nodes:ReactNode[]=[]; let last=0; let key=0;
  for (const m of text.matchAll(ALT_REGION44)) {
    const at=m.index ?? 0;
    if (at>last) nodes.push(<Fragment key={key++}>{mixed44(text.slice(last,at))}</Fragment>);
    nodes.push(<AltRegion44 key={key++} region={m[0]}/>);
    last=at+m[0].length;
  }
  if (last<text.length) nodes.push(<Fragment key={key++}>{mixed44(text.slice(last))}</Fragment>);
  return <span>{nodes}</span>;
}
function mixed44(text:string) {
  const segments = splitMixedText(text);
  const mixed = segments.every(seg=>seg.kind==='text'||seg.kind==='en')
    ? segments.map((seg,i)=>{
        if(seg.kind==='text') return <Fragment key={i}>{seg.text}</Fragment>;
        if(seg.kind!=='en') return null;
        const [,lead,body,tail]=seg.text.match(/^([\s:،؛—–]*)([\s\S]*?)(\s*)$/)!;
        return <Fragment key={i}>{lead}<span dir="ltr" lang="en" className="font-en">{body}</span>{tail}</Fragment>;
      })
    : <Rich text={text}/>;
  return <span>{mixed}</span>;
}
export function Lines44({lines, prefix=''}:{lines:string[];prefix?:string}) {
  const blocks:ReactNode[]=[];
  for(let i=0;i<lines.length;i++) {
    const line=lines[i];
    if(line.includes(' | ')) {
      const start=i, rows:string[]=[];
      while(i<lines.length&&lines[i].includes(' | ')) rows.push(lines[i++]);
      i--;
      blocks.push(<div className="table44" key={start}><table><thead><tr>{rows[0].split(' | ').map((cell,j)=><th key={j}><Text44 text={cell}/></th>)}</tr></thead><tbody>{rows.slice(1).map((row,j)=><tr key={j} data-source-unit={`${prefix}-${start+j+1}`}>{row.split(' | ').map((cell,k)=><td key={k}><Text44 text={cell}/></td>)}</tr>)}</tbody></table></div>);
    } else blocks.push(<p key={i} data-source-unit={prefix?`${prefix}-${i}`:undefined} className={!/[؀-ۿ]/.test(line)&&/[a-zA-Z]/.test(line)?'example44':'line44'}><Text44 text={line}/></p>);
  }
  return <div className="source44">{blocks}</div>;
}
export type Tone44='rule'|'example'|'compare'|'dialog'|'drill'|'challenge'|'lab'|'read'|'write'|'plain'|'prohibit'|'unnecessary';
export function Panel44({children,title,kicker,tone='plain',label}:{children:ReactNode;title?:string;kicker?:string;tone?:Tone44;label?:string}) {
  return <section className={`panel44 ${tone}`} data-tone={tone}>{label&&<span className="panelTag44">{label}</span>}{kicker&&<p className="eyebrow44"><Text44 text={kicker}/></p>}{title&&<h3><Text44 text={title}/></h3>}{children}</section>;
}
export function Tag44({role,children}:{role:'subject'|'must'|'haveto'|'hadto'|'willhaveto'|'mustnt'|'verb'|'form'|'tense'|'clue';children:ReactNode}) {
  const labels:{[key:string]:string}={subject:'الفاعل',must:'MUST',haveto:'HAVE TO',hadto:'HAD TO',willhaveto:'WILL HAVE TO',mustnt:"MUSTN'T",verb:'الفعل V1',form:'صيغة',tense:'الزمن',clue:'قرينة'};
  return <span className={`token44 ${role}`}><span dir="ltr">{children}</span><small>{labels[role]}</small></span>;
}
export function Meter44({value,max,label}:{value:number;max:number;label:string}) {
  return <span className="meter44"><bdi dir="ltr">{value} / {max}</bdi><small>{label}</small></span>;
}
