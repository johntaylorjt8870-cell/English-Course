import { createContext, Fragment, useContext, type ReactNode } from 'react';
import { Rich } from '../../shared/lessonKit';
import { splitMixedText } from '../../shared/bidi';
export const Workspace41 = createContext<{values:Record<string,string>; set:(key:string,value:string)=>void}>({values:{},set:()=>{}});
export function useField41(key:string): [string,(value:string)=>void] {
  const store=useContext(Workspace41); return [store.values[key] ?? '', value=>store.set(key,value)];
}
export function Text41({text}:{text:string}) {
  const english=/[A-Za-z]/.test(text)&&!/[\u0600-\u06ff]/.test(text);
  const segments = english ? [] : splitMixedText(text);
  // Preserve whitespace in the surrounding RTL flow rather than inside an LTR
  // isolate, where a leading space can appear at the wrong visual boundary.
  // Complex glossary/alternative groups still use the unmodified shared renderer.
  const mixed = segments.every(seg=>seg.kind==='text'||seg.kind==='en')
    ? segments.map((seg,i)=>{
        if(seg.kind==='text') return <Fragment key={i}>{seg.text}</Fragment>;
        if(seg.kind!=='en') return null;
        const [,lead,body,tail]=seg.text.match(/^([\s:،؛—–]*)([\s\S]*?)(\s*)$/)!;
        return <Fragment key={i}>{lead}<span dir="ltr" lang="en" className="font-en">{body}</span>{tail}</Fragment>;
      })
    : <Rich text={text}/>;
  return <span dir={english?'ltr':undefined} lang={english?'en':undefined} className={english?'en41':undefined}>{english?text:mixed}</span>;
}
export function Lines41({lines, prefix=''}:{lines:string[];prefix?:string}) {
  const blocks:ReactNode[]=[];
  for(let i=0;i<lines.length;i++) {
    const line=lines[i];
    if(line.includes(' | ')) {
      const start=i, rows:string[]=[];
      while(i<lines.length&&lines[i].includes(' | ')) rows.push(lines[i++]);
      i--;
      blocks.push(<div className="table41" key={start}><table><thead><tr>{rows[0].split(' | ').map((cell,j)=><th key={j}><Text41 text={cell}/></th>)}</tr></thead><tbody>{rows.slice(1).map((row,j)=><tr key={j} data-source-unit={`${prefix}-${start+j+1}`} >{row.split(' | ').map((cell,k)=><td key={k}><Text41 text={cell}/></td>)}</tr>)}</tbody></table></div>);
    } else blocks.push(<p key={i} data-source-unit={prefix?`${prefix}-${i}`:undefined} className={!/[\u0600-\u06ff]/.test(line)&&/[a-zA-Z]/.test(line)?'example41':'line41'}><Text41 text={line}/></p>);
  }
  return <div className="source41">{blocks}</div>;
}
export function Panel41({children,title,kicker}:{children:ReactNode;title?:string;kicker?:string}) {
  return <section className="panel41">{kicker&&<p className="eyebrow41"><Text41 text={kicker}/></p>}{title&&<h3><Text41 text={title}/></h3>}{children}</section>;
}
export function Tag41({role,children}:{role:'subject'|'auxiliary'|'main'|'first'|'form';children:ReactNode}) {
  return <span className={`token41 ${role}`}><span dir="ltr">{children}</span><small>{({subject:'الفاعل',auxiliary:'مساعد',main:'رئيسي',first:'المساعد الأول',form:'صيغة الفعل'})[role]}</small></span>;
}
