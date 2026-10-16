import { createContext, Fragment, useContext, type ReactNode } from 'react';
import { Rich } from '../../shared/lessonKit';
import { splitMixedText } from '../../shared/bidi';

// Language Control Lab — lesson-local kit. Shared mixed-BIDI rendering is reused
// unchanged; every visual token is scoped beneath `.lesson42` in lesson42.css.
export const Workspace42 = createContext<{values:Record<string,string>; set:(key:string,value:string)=>void}>({values:{},set:()=>{}});
export function useField42(key:string): [string,(value:string)=>void] {
  const store=useContext(Workspace42); return [store.values[key] ?? '', value=>store.set(key,value)];
}
export function Text42({text}:{text:string}) {
  const english=/[A-Za-z]/.test(text)&&!/[\u0600-\u06ff]/.test(text);
  const segments = english ? [] : splitMixedText(text);
  // Boundary whitespace stays in the surrounding RTL flow instead of inside the
  // LTR isolate, where a leading space can land at the wrong visual edge.
  const mixed = segments.every(seg=>seg.kind==='text'||seg.kind==='en')
    ? segments.map((seg,i)=>{
        if(seg.kind==='text') return <Fragment key={i}>{seg.text}</Fragment>;
        if(seg.kind!=='en') return null;
        const [,lead,body,tail]=seg.text.match(/^([\s:،؛—–]*)([\s\S]*?)(\s*)$/)!;
        return <Fragment key={i}>{lead}<span dir="ltr" lang="en" className="font-en">{body}</span>{tail}</Fragment>;
      })
    : <Rich text={text}/>;
  return <span dir={english?'ltr':undefined} lang={english?'en':undefined} className={english?'en42':undefined}>{english?text:mixed}</span>;
}
export function Lines42({lines, prefix=''}:{lines:string[];prefix?:string}) {
  const blocks:ReactNode[]=[];
  for(let i=0;i<lines.length;i++) {
    const line=lines[i];
    if(line.includes(' | ')) {
      const start=i, rows:string[]=[];
      while(i<lines.length&&lines[i].includes(' | ')) rows.push(lines[i++]);
      i--;
      blocks.push(<div className="table42" key={start}><table><thead><tr>{rows[0].split(' | ').map((cell,j)=><th key={j}><Text42 text={cell}/></th>)}</tr></thead><tbody>{rows.slice(1).map((row,j)=><tr key={j} data-source-unit={`${prefix}-${start+j+1}`} >{row.split(' | ').map((cell,k)=><td key={k}><Text42 text={cell}/></td>)}</tr>)}</tbody></table></div>);
    } else blocks.push(<p key={i} data-source-unit={prefix?`${prefix}-${i}`:undefined} className={!/[\u0600-\u06ff]/.test(line)&&/[a-zA-Z]/.test(line)?'example42':'line42'}><Text42 text={line}/></p>);
  }
  return <div className="source42">{blocks}</div>;
}
export type Tone42='rule'|'example'|'compare'|'dialog'|'drill'|'challenge'|'lab'|'read'|'write'|'plain';
export function Panel42({children,title,kicker,tone='plain',label}:{children:ReactNode;title?:string;kicker?:string;tone?:Tone42;label?:string}) {
  return <section className={`panel42 ${tone}`} data-tone={tone}>{label&&<span className="panelTag42">{label}</span>}{kicker&&<p className="eyebrow42"><Text42 text={kicker}/></p>}{title&&<h3><Text42 text={title}/></h3>}{children}</section>;
}
// Sentence roles: the modal channel is the lesson's own vocabulary.
export function Tag42({role,children}:{role:'subject'|'can'|'could'|'verb'|'form'|'future'|'able';children:ReactNode}) {
  const labels:{[key:string]:string}={subject:'الفاعل',can:'CAN',could:'COULD',verb:'الفعل V1',form:'صيغة',future:'مستقبل',able:'نجاح ماضٍ محدد'};
  return <span className={`token42 ${role}`}><span dir="ltr">{children}</span><small>{labels[role]}</small></span>;
}
export function Meter42({value,max,label}:{value:number;max:number;label:string}) {
  return <span className="meter42"><bdi dir="ltr">{value} / {max}</bdi><small>{label}</small></span>;
}
