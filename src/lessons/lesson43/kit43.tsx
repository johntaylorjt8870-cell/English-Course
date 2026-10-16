import { createContext, Fragment, useContext, type ReactNode } from 'react';
import { Rich } from '../../shared/lessonKit';
import { splitMixedText } from '../../shared/bidi';

// The Probability Observatory — lesson-local kit. Shared mixed-BIDI
// rendering is reused unchanged; every visual token is scoped beneath
// `.lesson43` in lesson43.css.
export const Workspace43 = createContext<{values:Record<string,string>; set:(key:string,value:string)=>void}>({values:{},set:()=>{}});
export function useField43(key:string): [string,(value:string)=>void] {
  const store=useContext(Workspace43); return [store.values[key] ?? '', value=>store.set(key,value)];
}
// «English A أو/أم English» regions are grouped into ONE LTR unit before the
// shared parser runs, because a sentence period directly before the connector
// («It may rain. أم It might rain.؟») would otherwise be read as an
// «English = Arabic» gloss separator and split the alternatives apart.
// An optional leading separator («: » after an Arabic intro) is kept inside
// the unit so the whole pair stays visually ordered English-first.
const ALT_REGION43 = /(?:[:،؛—–\-]?\s*)?[A-Za-z0-9][A-Za-z0-9 '’.,?!:;+\-/()]*\s+(?:أو|أم)\s+(?:[A-Za-z0-9][A-Za-z0-9 '’.,?!:;+\-/()]*\s+(?:أو|أم)\s+)*[A-Za-z0-9][A-Za-z0-9 '’.,?!:;+\-/()]*(?:[؟?!.،,؛;]+)?/g;
function AltRegion43({region}:{region:string}) {
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
export function Text43({text}:{text:string}) {
  const english=/[A-Za-z]/.test(text)&&!/[؀-ۿ]/.test(text);
  if (english) return <span dir="ltr" lang="en" className="en43">{text}</span>;
  const nodes:ReactNode[]=[]; let last=0; let key=0;
  for (const m of text.matchAll(ALT_REGION43)) {
    const at=m.index ?? 0;
    if (at>last) nodes.push(<Fragment key={key++}>{mixed43(text.slice(last,at))}</Fragment>);
    nodes.push(<AltRegion43 key={key++} region={m[0]}/>);
    last=at+m[0].length;
  }
  if (last<text.length) nodes.push(<Fragment key={key++}>{mixed43(text.slice(last))}</Fragment>);
  return <span>{nodes}</span>;
}
function mixed43(text:string) {
  const segments = splitMixedText(text);
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
  return <span>{mixed}</span>;
}
export function Lines43({lines, prefix=''}:{lines:string[];prefix?:string}) {
  const blocks:ReactNode[]=[];
  for(let i=0;i<lines.length;i++) {
    const line=lines[i];
    if(line.includes(' | ')) {
      const start=i, rows:string[]=[];
      while(i<lines.length&&lines[i].includes(' | ')) rows.push(lines[i++]);
      i--;
      blocks.push(<div className="table43" key={start}><table><thead><tr>{rows[0].split(' | ').map((cell,j)=><th key={j}><Text43 text={cell}/></th>)}</tr></thead><tbody>{rows.slice(1).map((row,j)=><tr key={j} data-source-unit={`${prefix}-${start+j+1}`} >{row.split(' | ').map((cell,k)=><td key={k}><Text43 text={cell}/></td>)}</tr>)}</tbody></table></div>);
    } else blocks.push(<p key={i} data-source-unit={prefix?`${prefix}-${i}`:undefined} className={!/[؀-ۿ]/.test(line)&&/[a-zA-Z]/.test(line)?'example43':'line43'}><Text43 text={line}/></p>);
  }
  return <div className="source43">{blocks}</div>;
}
export type Tone43='rule'|'example'|'compare'|'dialog'|'drill'|'challenge'|'lab'|'read'|'write'|'plain';
export function Panel43({children,title,kicker,tone='plain',label}:{children:ReactNode;title?:string;kicker?:string;tone?:Tone43;label?:string}) {
  return <section className={`panel43 ${tone}`} data-tone={tone}>{label&&<span className="panelTag43">{label}</span>}{kicker&&<p className="eyebrow43"><Text43 text={kicker}/></p>}{title&&<h3><Text43 text={title}/></h3>}{children}</section>;
}
// Sentence roles: the probability channel is the lesson's own vocabulary.
export function Tag43({role,children}:{role:'subject'|'may'|'might'|'verb'|'be'|'have'|'v3'|'form'|'tense'|'clue';children:ReactNode}) {
  const labels:{[key:string]:string}={subject:'الفاعل',may:'MAY',might:'MIGHT',verb:'الفعل V1',be:'BE',have:'HAVE',v3:'V3',form:'صيغة',tense:'الزمن',clue:'قرينة'};
  return <span className={`token43 ${role}`}><span dir="ltr">{children}</span><small>{labels[role]}</small></span>;
}
export function Meter43({value,max,label}:{value:number;max:number;label:string}) {
  return <span className="meter43"><bdi dir="ltr">{value} / {max}</bdi><small>{label}</small></span>;
}
