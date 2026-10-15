import { section41, NUMBER_MARKS_41 } from './ledger41';
import { Lines41, Panel41, Tag41, Text41 } from './kit41';
import { EngineExplorer41, RoleLab41, BeLab41, DoLab41, HaveLab41, ChainLab41, PracticeSet41, Reading41, Writing41, BuildTask41 } from './labs41';
import { PRACTICE_COUNTS_41 } from './practiceData41';
export function Steps41({index,onTest,onTeacher}:{index:number;onTest:()=>void;onTeacher:()=>void}) {
 const source=section41(index);
 return <article data-source-section={source.id} className="step41">
 {index===0?<section className="cover41"><div><p className="eyebrow41" dir="ltr">SENTENCE ENGINE STUDIO / LESSON 41</p><h2 dir="ltr">Small verbs.<br/><em>Extraordinary power.</em></h2><p>الإتقان الشامل للأفعال المساعدة</p><div className="coverEngines41" dir="ltr"><span>BE<small>STRUCTURE</small></span><span>DO<small>SUPPORT</small></span><span>HAVE<small>PERFECT</small></span></div><p className="coverCaption41">ثلاثة محركات. خمسة مسارات اكتشاف. فهم أعمق لكل جملة.</p></div><div className="blueprint41"><p className="eyebrow41">داخل الجملة</p><div className="sentence41" dir="ltr"><Tag41 role="subject">She</Tag41><Tag41 role="first">has</Tag41><Tag41 role="auxiliary">been</Tag41><Tag41 role="main">studying</Tag41></div><p>الفعل الرئيسي يحمل النشاط.<br/>المساعدات تمنحه البناء النحوي.</p><span className="blueprintLine41"/><p dir="ltr">HAVE + BE + V-ing</p></div></section>:<header className="stepHeading41"><span className="sectionNumber41" aria-hidden="true">{String(index).padStart(2,'0')}</span><div><p className="eyebrow41">رحلة الاكتشاف / القسم {index}</p><h2 tabIndex={-1} id="step-title-41"><Text41 text={source.title}/></h2></div></header>}
 {index===0&&<EngineExplorer41/>}
 {index===3&&<RoleLab41/>}
 {index===4&&<EngineExplorer41/>}
 {index===5&&<BeLab41/>}
 {index===11&&<DoLab41/>}
 {index===18&&<HaveLab41/>}
 {index===25&&<ChainLab41/>}
 {index===17&&<BuildTask41 id="source-mini17" prompt="Did he do the experiment? — أي الفعلين مساعد؟" options={['Did مساعد، do رئيسي','Did رئيسي، do مساعد']} answer="Did مساعد، do رئيسي" reason="Did لبناء السؤال، وdo يحمل معنى إجراء التجربة."/>}
 {index===35?<Reading41/>:index===38?<Writing41/>:index===36?<Panel41 kicker="INDEPENDENT ASSESSMENT" title="25 سؤالًا · خمسة مستويات"><p>حاول حل الاختبار دون الرجوع إلى الشرح. يُفتح في منطقة مستقلة؛ لا تظهر الحلول قبل تسليم كل الإجابات.</p><button className="primary41" onClick={onTest}>ابدأ الاختبار النهائي</button></Panel41>:index===37?<Panel41 title="مساحة المعلم — الحلول التفصيلية"><Lines41 lines={source.lines}/><p>تفتح الحلول بعد تسليم الاختبار أو فتح مساحة المعلم. §37 الأصلي لا يتضمن مفتاحًا تفصيليًا؛ أضيف المفتاح مع بيان مصدره.</p><button onClick={onTeacher}>انتقل إلى بوابة المعلم</button></Panel41>:PRACTICE_COUNTS_41[index]?<><Panel41 title="تدرّب أولًا. قارن بعد المحاولة."><Lines41 lines={source.lines.slice(0,source.lines.findIndex(line=>NUMBER_MARKS_41.includes(line[0])))}/><p>{index===29?'صحّح وفسّر. لا تظهر صيغة المصدر قبل كتابة المحاولة.':index===30?'حدد كل المساعدات والفعل الرئيسي؛ لا تنسَ السلاسل.':index===34?'حدد وظيفة الكلمة المكتوبة بحروف كبيرة. في السؤال 7 أجب عن DID وDO.':'أكمل كل بند قبل مقارنة إجابتك بحل المصدر.'}</p></Panel41><PracticeSet41 section={index}/></>:<Panel41 kicker="LESSON NOTES / شرح وأمثلة" title={index===0?source.title:undefined}><Lines41 lines={source.lines} prefix={source.id}/></Panel41>}
 {index===39&&<><EngineExplorer41/><BuildTask41 id="summary-main" prompt="I have a bicycle. → HAVE" options={['رئيسي','مساعد']} answer="رئيسي" reason="يدل على الامتلاك. لا يوجد V3 لبناء التام."/><ChainLab41/></>}
 {index===40&&<Panel41 title="راجع فهمك قبل المغادرة"><p>خريطة المنهج في المصدر: 41 / 120. هذا رقم المنهج، وليس عدّادًا آليًا لإتقانك الشخصي. لم يُضف مسار للدرس 42.</p><button className="primary41" onClick={onTest}>انتقل إلى الاختبار</button></Panel41>}
 </article>;
}
