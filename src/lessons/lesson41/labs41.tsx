import { Panel41, Text41, Lines41, Tag41, useField41 } from './kit41';
import { practices41, type Practice41 } from './practiceData41';
import { practiceReason41 } from './practiceNotes41';
import { section41 } from './ledger41';

const ENGINES = [
 {name:'BE',role:'البناء والربط',forms:'am · is · are · was · were · be · been · being', main:'She is happy.', auxiliary:'She is studying.', question:'Is she studying?',negative:"She isn't studying.", rule:'يربط الفاعل بوصف، أو يبني الاستمرار مع V-ing والمبني للمجهول مع V3.'},
 {name:'DO',role:'السؤال والنفي والتأكيد',forms:'do · does · did · done · doing',main:'I do my homework.',auxiliary:'Do you do your homework?',question:'Does she study?',negative:"She doesn't study.",rule:'DO المساعد يحمل الزمن والتطابق، ويبقى الفعل الرئيسي V1. في السؤال المزدوج: Do الأولى مساعد وdo الثانية رئيسي.'},
 {name:'HAVE',role:'الأزمنة التامة',forms:'have · has · had · having',main:'I have a bicycle.',auxiliary:'I have bought a bicycle.',question:'Has she finished?',negative:"She hasn't finished.",rule:'HAVE المساعد يبني التام مع V3؛ HAVE الرئيسي قد يدل على الامتلاك أو نشاط مثل have breakfast.'},
];
export function EngineExplorer41() {
 const [selected,set]=useField41('engine');const engine=ENGINES[Number(selected)||0];
 return <Panel41 kicker="ENGINE EXPLORER / 01" title="اختر المحرك. اكتشف ما يغيّره."><div className="engineTabs41" role="group" aria-label="اختيار المحرك">{ENGINES.map((e,i)=><button key={e.name} aria-pressed={engine.name===e.name} onClick={()=>set(String(i))}><b dir="ltr">{e.name}</b><span>{e.role}</span></button>)}</div><div className="engineDetail41"><div><p className="eyebrow41">عائلة الصيغ</p><p dir="ltr" className="formula41">{engine.forms}</p><p><Text41 text={engine.rule}/></p></div><div className="contrast41"><div><span className="label41">فعل رئيسي</span><Lines41 lines={[engine.main]}/></div><div><span className="label41">فعل مساعد</span><Lines41 lines={[engine.auxiliary]}/></div></div><div className="contrast41"><Lines41 lines={[engine.question]}/><Lines41 lines={[engine.negative]}/></div></div></Panel41>;
}
const CLASSIFY = [
 ['She is happy.','is','رئيسي','يربط الفاعل بالوصف happy؛ لا يساعد فعلًا آخر.'],
 ['She is studying.','is','مساعد','يساعد studying لبناء الاستمرار: BE + V-ing.'],
 ['I have a bicycle.','have','رئيسي','معنى الامتلاك؛ bicycle اسم وليس V3.'],
 ['I have bought a bicycle.','have','مساعد','يبني التام مع bought، الفعل الرئيسي بصيغة V3.'],
 ['I do my homework.','do','رئيسي','معنى إنجاز الواجب؛ ليس سؤالًا أو نفيًا.'],
 ['Do you do your homework?','Do (الأولى)','مساعد','الأولى تبني السؤال؛ الثانية do فعل رئيسي بمعنى ينجز.'],
 ['Do you do your homework?','do (الثانية)','رئيسي','الثانية تحمل معنى النشاط؛ الأولى Do هي المساعد.'],
 ['Did he do the experiment?','Did / do','مساعد / رئيسي','Did يحمل الماضي والسؤال، وdo الرئيسي يعود إلى V1.'],
];
export function RoleLab41() { return <Panel41 kicker="ROLE LAB" title="رئيسي أم مساعد؟ لا تحكم من شكل الكلمة.">{CLASSIFY.map((row,i)=><RoleItem41 key={i} row={row} index={i}/>)}</Panel41>; }
function RoleItem41({row,index}:{row:string[];index:number}) {
 const [choice,set]=useField41(`role-${index}`);
 return <div className="exercise41"><Lines41 lines={[row[0]]}/><p><Text41 text={`وظيفة ${row[1]}`}/></p><div className="actions41">{(index===7?['مساعد / رئيسي','رئيسي / مساعد']:['رئيسي','مساعد']).map(option=><button key={option} aria-pressed={choice===option} onClick={()=>set(option)}>{option}</button>)}</div>{choice&&<p role="status" className={choice===row[2]?'feedback41':'feedback41 error'}><Text41 text={`${choice===row[2]?'صحيح':'راجع الوظيفة'} — ${row[2]}: ${row[3]}`}/></p>}</div>;
}
export function BuildTask41({id,prompt,options,answer,reason}:{id:string;prompt:string;options:string[];answer:string;reason:string}) {
 const [choice,set]=useField41(id),[checked,check]=useField41(`${id}-checked`);
 return <div className="exercise41"><Lines41 lines={[prompt]}/><label className="field41">اختر الصيغة<select value={choice} onChange={e=>{set(e.target.value);check('');}}><option value="">اختر…</option>{options.map(option=><option key={option} value={option}>{option}</option>)}</select></label><button disabled={!choice} onClick={()=>check('yes')}>تحقق من البناء</button>{checked&&<div role="status" className={choice===answer?'feedback41':'feedback41 error'}><b>{choice===answer?'بناء صحيح':'جرّب تطبيق القاعدة'}</b><Lines41 lines={[answer,reason]}/></div>}</div>;
}
export function BeLab41() { return <Panel41 kicker="BE / STRUCTURE LAB" title="ابنِ الحالة والاستمرار والمبني للمجهول">
 <BuildTask41 id="be-form" prompt="I ______ ready." options={['am','is','are']} answer="am" reason="مع I في الحاضر نستخدم am؛ ready وصف، فـ BE هنا فعل رابط رئيسي."/>
 <BuildTask41 id="be-cont" prompt="She is ______." options={['study','studying','studied']} answer="studying" reason="BE + V-ing يبني المستمر. She is study غير صحيحة لهذا المعنى."/>
 <BuildTask41 id="be-question" prompt="She is happy. → سؤال" options={['Is she happy?','Does she is happy?']} answer="Is she happy?" reason="الفعل الرابط BE يتقدم على الفاعل دون do-support."/>
 <BuildTask41 id="be-negative" prompt="He is ready. → نفي" options={["He isn't ready.","He doesn't is ready."]} answer="He isn't ready." reason="نضع not بعد BE مباشرة؛ لا نضيف does."/>
 <BuildTask41 id="be-passive" prompt="The bridge was built by the workers. → وظيفة was" options={['مساعد للمبني للمجهول','رئيسي بمعنى الامتلاك']} answer="مساعد للمبني للمجهول" reason="was + built (V3): BE يساعد في بناء المبني للمجهول؛ built هو الفعل الرئيسي."/>
 </Panel41>; }
export function DoLab41() {return <Panel41 kicker="DO / QUESTION BUILDER" title="انقل الزمن إلى DO. أعد الفعل إلى V1.">
 <BuildTask41 id="do-question" prompt="She studies. → سؤال" options={['Does she study?','Does she studies?']} answer="Does she study?" reason="does تحمل علامة المضارع مع she، فيعود studies إلى study."/>
 <BuildTask41 id="do-past" prompt="He visited. → سؤال" options={['Did he visit?','Did he visited?']} answer="Did he visit?" reason="did تحمل الماضي؛ visit هو V1."/>
 <BuildTask41 id="do-neg" prompt="She likes coffee. → نفي" options={["She doesn't likes coffee.","She doesn't like coffee."]} answer="She doesn't like coffee." reason="بعد doesn't نستخدم V1، لا نكرر علامة المفرد."/>
 <BuildTask41 id="do-emphasis" prompt="تأكيد إنهاء الواجب" options={['He did finished his homework.','He did finish his homework.']} answer="He did finish his homework." reason="did هنا للتأكيد، لكنها ما زالت تتطلب V1 finish."/>
 <BuildTask41 id="do-double" prompt="Did he do the experiment?" options={['Did مساعد؛ do رئيسي','Did رئيسي؛ do مساعد']} answer="Did مساعد؛ do رئيسي" reason="الأولى لبناء السؤال في الماضي؛ الثانية تحمل معنى إجراء التجربة."/>
 </Panel41>;}
export function HaveLab41() {
 const [tense,setTense]=useField41('perfect-tense'),[continuous,setContinuous]=useField41('perfect-continuous');
 const tenseIndex=Number(tense)||0, prefix=['She has','She had','She will have'][tenseIndex];
 return <Panel41 kicker="HAVE / PERFECT ENGINE" title="محركان يعملان معًا"><div className="actions41">{['Present Perfect','Past Perfect','Future Perfect'].map((t,i)=><button key={t} aria-pressed={i===tenseIndex} onClick={()=>setTense(String(i))}><Text41 text={t}/></button>)}</div><label className="check41"><input type="checkbox" checked={continuous==='yes'} onChange={e=>setContinuous(e.target.checked?'yes':'')}/>أضف الاستمرار</label><div className="sentence41" dir="ltr"><Tag41 role="subject">She</Tag41><Tag41 role="first">{tenseIndex===2?'will':prefix.slice(4)}</Tag41>{tenseIndex===2&&<Tag41 role="auxiliary">have</Tag41>}{continuous&&<Tag41 role="auxiliary">been</Tag41>}<Tag41 role="main">{continuous?'studying':'finished'}</Tag41><Tag41 role="form">{continuous?'V-ing':'V3'}</Tag41></div><p className="formula41" dir="ltr">{prefix} {continuous?'been studying':'finished'}.</p><p><Text41 text="في المستقبل: will هو المساعد الأول وhave مساعد التام. في المستمر been صيغة BE، تليها V-ing. هذا البناء إضافة تفاعلية من المنصة."/></p>
 <BuildTask41 id="have-finished" prompt="She has finished. → سؤال" options={['Has she finished?','Does she have finished?']} answer="Has she finished?" reason="has مساعد التام؛ ننقله قبل الفاعل دون does."/>
 <BuildTask41 id="have-bike" prompt="She has a bicycle. → سؤال" options={['Does she have a bicycle?','Has she been a bicycle?']} answer="Does she have a bicycle?" reason="have رئيسي للامتلاك؛ نستخدم does + V1 في الصيغة الشائعة التي يدرسها المصدر."/>
 <BuildTask41 id="have-arrive" prompt="They have arrived. → سؤال" options={['Have they arrived?','Do they have arrived?']} answer="Have they arrived?" reason="have مساعد في التام؛ arrived هو V3."/>
 <BuildTask41 id="have-car" prompt="They have a car. → سؤال" options={['Do they have a car?','Are they have a car?']} answer="Do they have a car?" reason="have الرئيسي للامتلاك يأخذ do-support هنا. Have you got a car? بديل شائع، خصوصًا في البريطانية، وليس خطأ."/>
 </Panel41>;
}
const CHAINS=[
 ['She is studying.','is','Is she studying?',"She isn't studying."],
 ['She has been studying.','has','Has she been studying?',"She hasn't been studying."],
 ['She will have been studying.','will','Will she have been studying?',"She won't have been studying."],
 ['She studies.','لا يوجد','Does she study?',"She doesn't study."],
];
export function ChainLab41() {
 const [selected,setSelected]=useField41('chain-index'),[pick,setPick]=useField41('chain-pick'),[mode,setMode]=useField41('chain-mode');
 const row=CHAINS[Number(selected)||0], words=row[0].replace('.','').split(' ');
 return <Panel41 kicker="FIRST AUXILIARY / CONTROL ROOM" title="ابدأ بالأول. احتفظ ببقية السلسلة."><label className="field41">اختر الجملة<select value={selected||'0'} onChange={e=>{setSelected(e.target.value);setPick('');setMode('');}}>{CHAINS.map((r,i)=><option key={i} value={i}>{r[0]}</option>)}</select></label><p>اختر المساعد الأول — أو «لا يوجد»:</p><div className="actions41" dir="ltr">{[...words,'لا يوجد'].map((word,i)=><button key={i} aria-pressed={pick===word} onClick={()=>{setPick(word);setMode('');}}><Text41 text={word}/></button>)}</div>{pick&&<p role="status" className={pick===row[1]?'feedback41':'feedback41 error'}>{pick===row[1]?'صحيح. اختر التحويل التالي.':'هذه ليست نقطة البداية. ابحث عن المساعد الأول، وليس الفعل الرئيسي.'}</p>}<div className="actions41"><button disabled={pick!==row[1]} onClick={()=>setMode('question')}>كوّن سؤالًا</button><button disabled={pick!==row[1]} onClick={()=>setMode('negative')}>كوّن نفيًا</button></div>{mode&&<div className="feedback41"><Lines41 lines={[row[mode==='question'?2:3],row[1]==='لا يوجد'?'لا يوجد مساعد: نضيف does ونُعيد studies إلى V1 study.':'نحرّك المساعد الأول للسؤال أو نضيف not بعده للنفي. لا نحرّك كل السلسلة.']}/></div>}</Panel41>;
}
export function PracticeCard41({item}:{item:Practice41}) {
 const [response,setResponse]=useField41(item.id),[extra,setExtra]=useField41(`${item.id}-extra`),[attempt,setAttempt]=useField41(`${item.id}-attempt`);
 const two=item.parts.length>1;
 return <article className="exercise41" data-practice-id={item.id}><span className="label41">{item.number} / §{item.section}</span><Lines41 lines={[item.prompt]}/>{item.section===29&&<p>حدد الجزء غير المناسب، ثم أصلح الجملة واشرح السبب. البند 7 تفضيل استعمال لا خطأ مطلق.</p>}
 <label className="field41">{item.section===29?'التصحيح':item.parts[0]==='auxiliaries'?'الفعل المساعد أو السلسلة':item.parts[0]==='DID'?'وظيفة DID':'إجابتك'}{item.options.length?<select value={response} onChange={e=>{setResponse(e.target.value);setAttempt('');}}><option value="">اختر…</option>{item.options.map(option=><option key={option} value={option}>{option}</option>)}</select>:<textarea rows={2} dir="auto" value={response} onChange={e=>{setResponse(e.target.value);setAttempt('');}}/>}</label>
 {two&&<label className="field41">{item.section===29?'الجزء الذي غيّرته وسبب التغيير':item.parts[1]==='DO'?'وظيفة DO':'الفعل الرئيسي'}<textarea rows={2} dir="auto" value={extra} onChange={e=>{setExtra(e.target.value);setAttempt('');}}/></label>}
 <button disabled={!response.trim()||(two&&!extra.trim())} onClick={()=>setAttempt('yes')}>قارن محاولتك بالحل</button>{attempt&&<div className="feedback41" role="status"><b>حل المصدر — للمقارنة الذاتية، ليس تصحيحًا آليًا</b><Lines41 lines={[item.sourceAnswer]}/><p className="label41">شرح المنصة</p><Lines41 lines={[practiceReason41(item.section,item.number)]}/></div>}</article>;
}
export function PracticeSet41({section}:{section:number}) {return <div className="practiceGrid41">{practices41(section).map(item=><PracticeCard41 key={item.id} item={item}/>)}</div>;}
export function Reading41() {
 const [highlight,setHighlight]=useField41('reading-highlight');
 const lines=section41(35).lines.slice(0,section41(35).lines.indexOf('أسئلة الفهم'));
 return <><Panel41 title="A Week of Learning"><label className="check41"><input type="checkbox" checked={!!highlight} onChange={e=>setHighlight(e.target.checked?'yes':'')}/>إظهار أمثلة الوظائف بعد القراءة</label><Lines41 lines={lines} prefix="s35-reading"/>{highlight&&<div className="feedback41"><p>إضافة تحليلية — النص أعلاه لم يتغير</p><div className="sentence41" dir="ltr"><Tag41 role="auxiliary">is</Tag41><Tag41 role="main">preparing</Tag41><Tag41 role="auxiliary">has</Tag41><Tag41 role="main">collected</Tag41><Tag41 role="auxiliary">do — emphasis</Tag41><Tag41 role="main">need</Tag41><Tag41 role="main">does her homework</Tag41></div><p><Text41 text="is + preparing = استمرار؛ has + collected = تام؛ do + need = تأكيد؛ does her homework فعل رئيسي. is في Maya is a student رابط رئيسي."/></p></div>}</Panel41><PracticeSet41 section={35}/></>;
}
export function Writing41() {
 const [text,setText]=useField41('writing'),[model,setModel]=useField41('writing-model');
 const lines=section41(38).lines, start=lines.indexOf('نموذج إرشادي');
 const count=(text.match(/[^.!?\n]+[.!?]+(?=\s|$)/g)||[]).length;
 return <Panel41 title="My School Life and My Future Goals"><Lines41 lines={lines.slice(0,3)}/><label className="field41">فقرتك الخاصة<textarea rows={12} dir="ltr" lang="en" value={text} onChange={e=>setText(e.target.value)}/></label><p role="status">الجمل المكتملة بعلامة ترقيم: <bdi dir="ltr">{count} / 12–15</bdi>. عدّ تقريبي؛ ليس حكمًا على صحة القواعد.</p><div className="checklist41">{lines.slice(3,start).map((line,i)=><WritingCheck41 key={i} text={line} index={i}/>)}</div><button aria-expanded={!!model} onClick={()=>setModel(model?'':'yes')}>النموذج الإرشادي — مرجع منفصل</button>{model&&<div className="reference41"><p><b>نموذج المصدر الجزئي</b></p><p>ملاحظة المنصة: ثماني جمل فقط، لا يحقق كل الشروط؛ لا يحتوي أسئلة ولا DID للتأكيد. ليس نموذج تسليم كاملًا.</p><Lines41 lines={lines.slice(start+1)}/></div>}</Panel41>;
}
function WritingCheck41({text,index}:{text:string;index:number}) {const [checked,set]=useField41(`writing-check-${index}`);return <label className="check41"><input type="checkbox" checked={!!checked} onChange={e=>set(e.target.checked?'yes':'')}/><Text41 text={text}/></label>;}
