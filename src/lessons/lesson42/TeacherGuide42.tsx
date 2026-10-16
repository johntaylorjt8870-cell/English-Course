import { Lines42, Panel42, Text42 } from './kit42';
import { section42, STATIONS_42 } from './ledger42';
import { PRACTICE_42 } from './practiceData42';
import { practiceReason42 } from './practiceNotes42';
import { COVERAGE_42, COVERAGE_ACCURACY_NOTES_42, COVERAGE_PLATFORM_ADDITIONS_42 } from './coverage42';
import SolutionsArea42 from './SolutionsArea42';

export default function TeacherGuide42() {
  return <div data-teacher-guide="42">
    <Panel42 kicker="DELIVERY GUIDE / PLATFORM-AUTHORED" title="دليل التدريس — من القدرة إلى التواصل المهذب">
      <p>هذا الدليل وكل الشرح التفصيلي إضافات المنصة. نصوص الأسئلة والمفاتيح الموسومة «حل المصدر» من المادة الموردة. استخدم جلسات متعددة عند الحاجة؛ لا تختزل التدريبات إلى عينة.</p>
      <h3>الأهداف الأصلية</h3>
      <Lines42 lines={section42(1).lines}/>
      <h3>تسلسل مقترح وفحوص فهم</h3>
      <ol className="teacherList42">
        <li>الانطلاق (10 دقائق): اعرض المواقف الأربعة في الغلاف؛ اسأل: هل نحتاج أربعة أفعال؟ ثم قدّم CAN وCOULD بوصفهما فعلين ناقصين.</li>
        <li>القاعدة (15 دقيقة): ابنِ في لوحة التحكم Subject + CAN/COULD + V1؛ اطلب شرح سبب عدم إضافة s وعدم استخدام to وعدم إضافة DO.</li>
        <li>قناة CAN (20 دقيقة): القدرة الحالية والأنواع الأربعة للقدرة؛ درّب على النفي والسؤال والإجابات القصيرة وأسئلة WH. تحقق: لماذا لا نقول Yes, I do؟</li>
        <li>قناة COULD (20 دقيقة): القدرة العامة في الماضي، ثم أسئل الطلاب: هل COULD دائمًا ماضية؟ اعرض Could you help me؟ وIt could rain tomorrow.</li>
        <li>القدرة المحددة (20 دقيقة): قارن could وwas/were able to وmanaged to؛ نبّه إلى أن couldn't طبيعية في موقف ماضٍ محدد.</li>
        <li>الاستئذان والطلبات (25 دقيقة): شغّل Politeness Studio؛ ناقش الفرق بين I وyou وبين CAN المباشرة وCOULD الأكثر تحفظًا دون تجريد مطلق.</li>
        <li>الإمكانية والاقتراح (15 دقيقة): قارن الإمكانية العامة بالاحتمال في موقف محدد، ثم اقتراحات could.</li>
        <li>الأخطاء والمعنى (20 دقيقة): حل الأخطاء العشرة بتشخيص النوع، ثم Meaning Lab وContext Detective لإظهار أثر السياق.</li>
        <li>التدريبات §§34–38 (30–45 دقيقة): أكمل كل بند قبل مقارنته بالحل؛ اطلب تبريرًا شفهيًا لكل اختيار.</li>
        <li>القراءة والكتابة (25 دقيقة): نص The Young Inventor وأسئلته العشرة، ثم مهمة كتابة 12–15 جملة مع قائمة التحقق.</li>
        <li>اختبار مستقل (25–35 دقيقة): 25 سؤالًا في خمسة مستويات، دون كشف مفاتيح قبل التسليم.</li>
      </ol>
    </Panel42>
    <Panel42 title="التصورات الخاطئة وخطة التصحيح">
      <Lines42 lines={[
        'COULD ليست ماضية دائمًا: Could you help me now؟ طلب حالي، وIt could rain tomorrow احتمال مستقبلي.',
        'لا نضيف s إلى CAN أو COULD: She cans swim خطأ، والصحيح She can swim.',
        'بعد CAN وCOULD يأتي V1 مباشرة: بدون to، وليس V-ing، وليس تصريف الماضي.',
        'لا نستخدم DO أو DOES أو DID مع CAN أو COULD: Do you can swim؟ خطأ، والصحيح Can you swim؟',
        'النفي يبنى بـ not بعد الفعل الناقص: can\'t وcouldn\'t، وليس doesn\'t can.',
        'لا نجمع فعلين ناقصين: will can خطأ؛ نستخدم will be able to للقدرة المستقبلية.',
        'could للقدرة العامة في الماضي، وwas/were able to أو managed to لإبراز نجاح في موقف ماضٍ محدد في الجمل المثبتة.',
        'لكن couldn\'t تعبير طبيعي عن عدم القدرة في موقف ماضٍ محدد؛ لا تُطبَّق القاعدة بصورة آلية.',
        'COULD غالبًا أقل مباشرة وأكثر تحفظًا من CAN في الطلبات، لكن هذا ليس قاعدة مطلقة في كل سياق.',
        'Can you open the door؟ قد تكون سؤال قدرة أو طلبًا؛ السياق هو ما يحدد المعنى.',
      ]}/>
    </Panel42>
    <Panel42 title="سلم تقييم Writing Mission — إضافة المنصة">
      <p>المجموع المقترح 20: عشر نقاط، نقطة لكل معيار مصدر مستوفى فعلًا في النص؛ أربع نقاط لدقة الصيغ والتطابق؛ ثلاث نقاط للترابط والمفردات؛ ثلاث نقاط للأصالة ووضوح المعنى وتحقيق 12–15 جملة. لا تُمنح نقطة لمجرد وجود كلمة مستهدفة.</p>
      <Lines42 lines={section42(42).lines.slice(2, section42(42).lines.indexOf('نموذج إرشادي'))}/>
      <p className="feedback42">نموذج المصدر ثماني جمل فقط؛ لا يحقق شرط الطول ولا كل البنود العشرة. احتفظ به بوصفه إلهامًا جزئيًا ولا تقدّمه كإجابة كاملة. عدّاد الجمل تقريبي؛ راجع حدود الجمل والقواعد يدويًا.</p>
      <h3>نموذج المصدر المحفوظ</h3>
      <Lines42 lines={section42(42).lines.slice(section42(42).lines.indexOf('نموذج إرشادي') + 1, section42(42).lines.indexOf('تحدي إضافي'))}/>
    </Panel42>
    <Panel42 title="مفاتيح كل التدريبات — المصدر ثم شرح المنصة">
      {PRACTICE_42.map(item => <article className="exercise42" key={item.id} data-teacher-answer={item.id}>
        <h4>§{item.section} · {item.number}</h4>
        <b>الأصل</b><Lines42 lines={[item.prompt, ...item.options]}/>
        <b>حل المصدر</b><Lines42 lines={[item.sourceAnswer]}/>
        <b>السبب والخطوات — شرح المنصة</b><Lines42 lines={[practiceReason42(item.section, item.number)]}/>
      </article>)}
    </Panel42>
    <Panel42 title="مفتاح المصدر الكامل للاختبار النهائي — §41">
      <Lines42 lines={section42(41).lines} prefix="s41"/>
    </Panel42>
    <SolutionsArea42 teacher/>
    <Panel42 title="المحطات ومصفوفة التغطية">
      <div className="actions42">{STATIONS_42.map(station => <span className="label42" key={station.start}><Text42 text={`${station.name}: §§${station.start}–${station.end}`}/></span>)}</div>
      <p>{COVERAGE_42.length} مدخلًا: الغلاف والأقسام 1–44. كل سطر محفوظ كوحدة مصدر؛ بنود الممارسة مرتبطة بمعرّف مستقل، بما فيها الأجزاء المتعددة.</p>
      {COVERAGE_42.map(row => <details key={row.id}>
        <summary><Text42 text={`${row.id} — ${row.title} · ${row.units.length} وحدات`}/></summary>
        <p><Text42 text={`${row.destination} → ${row.answerLocation}`}/></p>
        <Lines42 lines={row.items.map(item => `${item.id}: ${item.parts.join(' / ')}`)}/>
        <Lines42 lines={row.units.map(unit => unit.text)}/>
      </details>)}
    </Panel42>
    <Panel42 title="تدقيق التغطية والدقة">
      <h3>ما نُقل مباشرة من المصدر</h3>
      <Lines42 lines={COVERAGE_ACCURACY_NOTES_42}/>
      <h3>ما أضيف من المنصة</h3>
      <Lines42 lines={COVERAGE_PLATFORM_ADDITIONS_42}/>
    </Panel42>
    <Panel42 title="حدود المصدر والوصول">
      <p>§41 في المصدر يحتوي مفاتيح الاختبار الـ25 كاملة، ولذلك لا يُعرض في منطقة الطالب؛ يفتح من بوابة المعلم أو بعد التسليم. لا توجد خدمة خادم: كلمة المرور بوابة تربوية وفق آلية المنصة القائمة، وليست حماية من فحص ملفات JavaScript العامة. لا تُحمّل واجهة الحلول ولا دليل المعلم في المسار العادي قبل استحقاق الوصول.</p>
      <p>الدرس 43 خريطة نصية في §44 فقط، ولا يوجد له مسار أو بطاقة في هذه النسخة.</p>
    </Panel42>
  </div>;
}
