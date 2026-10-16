import { Lines43, Panel43, Text43 } from './kit43';
import { section43, STATIONS_43 } from './ledger43';
import { PRACTICE_43 } from './practiceData43';
import { practiceReason43 } from './practiceNotes43';
import { COVERAGE_43, COVERAGE_ACCURACY_NOTES_43, COVERAGE_PLATFORM_ADDITIONS_43 } from './coverage43';
import SolutionsArea43 from './SolutionsArea43';

export default function TeacherGuide43() {
  return <div data-teacher-guide="43">
    <Panel43 kicker="DELIVERY GUIDE / PLATFORM-AUTHORED" title="دليل التدريس — الاحتمال وعدم اليقين والاستئذان">
      <p>هذا الدليل وكل الشرح التفصيلي إضافات المنصة. نصوص الأسئلة والمفاتيح الموسومة «حل المصدر» من المادة الموردة. استخدم جلسات متعددة عند الحاجة؛ لا تختزل التدريبات إلى عينة.</p>
      <h3>الأهداف الأصلية</h3>
      <Lines43 lines={section43(1).lines}/>
      <h3>تسلسل مقترح وفحوص فهم</h3>
      <ol className="teacherList43">
        <li>الانطلاق (10 دقائق): اعرض هوية مرصد الاحتمالات؛ اسأل: هل نعرف المستقبل يقينًا؟ ثم قدّم MAY وMIGHT بوصفهما فعلين ناقصين للاحتمال.</li>
        <li>القاعدة (15 دقيقة): ابنِ في لوحة التحكم Subject + MAY/MIGHT + V1؛ اطلب شرح سبب عدم إضافة s وعدم استخدام to وعدم إضافة DO.</li>
        <li>قناة MAY (20 دقيقة): الاحتمال الحاضر/المستقبلي، الأسئلة والنفي، جدول الضمائر، ثم MAY BE + خبر. تحقق: لماذا لا نقول She mays come؟</li>
        <li>WILL مقابل MAY (10 دقائق): WILL توقع قوي غير مضمون؛ MAY تجعل عدم اليقين مرئيًا.</li>
        <li>قناة MIGHT (20 دقيقة): التعريف والأمثلة والضمائر، ثم SwapLab: التبديل مسموح والسياق يضبط التحفظ.</li>
        <li>النفي (15 دقيقة): MAY NOT وMIGHT NOT — احتمال عدم الحدوث مقابل المنع؛ ثم MAY NOT ≠ MUST NOT.</li>
        <li>الاستئذان (20 دقيقة): MAY I + سلم اللباقة؛ نبّه أن MIGHT I رسمية/قديمة وليست الافتراض اليومي.</li>
        <li>مختبر MAYBE (15 دقيقة): صنّف الوظيفة — ظرف مستقل مقابل may be — باستخدام أمثلة §19 وأسئلة §29.</li>
        <li>احتمال الماضي (25 دقيقة): MAY HAVE / MIGHT HAVE + V3؛ قارن مع الحاضر ومع التام الخبري؛ ناقش MAY HAVE BEEN.</li>
        <li>المقارنة الكاملة (15 دقيقة): مصفوفة الأفعال الأربعة والأسئلة الستة قبل الكتابة.</li>
        <li>الحوار والتطبيق (30–45 دقيقة): وسم الاستخدامات الثمانية، ثم التدريبات §§27–32 كلها قبل مقارنتها بالحل.</li>
        <li>القراءة والكتابة (25 دقيقة): نص The Unexpected School Trip وأسئلته العشر، ثم مهمة كتابة 12–15 جملة مع قائمة التحقق.</li>
        <li>اختبار مستقل (25–35 دقيقة): 25 سؤالًا في خمسة مستويات، دون كشف مفاتيح قبل التسليم.</li>
      </ol>
    </Panel43>
    <Panel43 title="التصورات الخاطئة وخطة التصحيح">
      <Lines43 lines={[
        'لا نربط MAY أو MIGHT بنسبة مئوية ثابتة: المصدر يرفض ذلك صراحة، والطيف في المرصد كيفي فقط.',
        'MAY ليست دائمًا أقوى من MIGHT: التداخل كبير في السياقات اليومية، وMIGHT قد توحي بتحفظ أكبر في سياقات معينة.',
        'لا نضيف s إلى MAY أو MIGHT: She mays come خطأ، والصحيح She may come.',
        'بعد MAY وMIGHT يأتي V1 مباشرة: بدون to، وليس V-ing، وليس تصريف الماضي.',
        'لا نستخدم DO أو DOES أو DID مع MAY: Do you may come؟ خطأ، والصحيح May you come؟ أو Is she likely to come؟',
        'النفي يبنى بـ not بعد الفعل الناقص: may not وmight not، وليس doesn’t may.',
        'MAY NOT قد تعني احتمال عدم الحدوث أو منعًا بحسب السياق؛ MUST NOT منع قاطع دائمًا.',
        'MAYBE ظرف مستقل يحتاج جملة كاملة بعده؛ MAY BE فعل ناقص + فعل رابط يحتاج فاعلًا.',
        'MAY HAVE + V3 تخمين عن الماضي — لا خبر بأنه وقع.',
        'MIGHT I صيغة رسمية/قديمة مهذبة جدًا — لا تجعلها الافتراض اليومي لطلب الإذن.',
        'قد يقبل السياق MAY أو MIGHT معًا؛ لا تصحح طالبًا بدّل بينهما حيث يسمح السياق بذلك (§§27، 30).',
        'WILL لا تضمن حدوث الشيء دائمًا؛ MAY لا تخفي عدم اليقين بل تجعله مرئيًا.',
      ]}/>
    </Panel43>
    <Panel43 title="سلم تقييم Writing Mission — إضافة المنصة">
      <p>المجموع المقترح 20: عشر نقاط، نقطة لكل بند من بنود قائمة المهمة المستوفى فعلًا في النص؛ أربع نقاط لدقة صيغ MAY/MIGHT وMAY HAVE/MIGHT HAVE؛ ثلاث نقاط للترابط والمفردات؛ ثلاث نقاط للأصالة ووضوح المعنى وتحقيق 12–15 جملة. لا تُمنح نقطة لمجرد وجود كلمة مستهدفة.</p>
      <p className="feedback43">النثر لا يُصحَّح آليًا في المنصة؛ قارن يدويًا مع نموذج المنصة المرجعي (موسوم «إضافة المنصة»).</p>
    </Panel43>
    <Panel43 title="مفاتيح كل التدريبات — المصدر ثم شرح المنصة">
      {PRACTICE_43.map(item => <article className="exercise43" key={item.id} data-teacher-answer={item.id}>
        <h4>§{item.section} · {item.number}</h4>
        <b>الأصل</b><Lines43 lines={[item.prompt, ...item.options]}/>
        <b>حل المصدر</b><Lines43 lines={[item.sourceAnswer]}/>
        <b>السبب والخطوات — شرح المنصة</b><Lines43 lines={[practiceReason43(item.section, item.number)]}/>
      </article>)}
    </Panel43>
    <Panel43 title="مفتاح المصدر الكامل للاختبار النهائي — §34">
      <Lines43 lines={section43(34).lines} prefix="s34"/>
    </Panel43>
    <SolutionsArea43 teacher/>
    <Panel43 title="المحطات ومصفوفة التغطية">
      <div className="actions43">{STATIONS_43.map(station => <span className="label43" key={station.start}><Text43 text={`${station.name}: §§${station.start}–${station.end}`}/></span>)}</div>
      <p>{COVERAGE_43.length} مدخلًا: الغلاف والأقسام 1–37. كل سطر محفوظ كوحدة مصدر؛ بنود الممارسة والاختبار مرتبطة بمعرّف مستقل، بما فيها الأجزاء المتعددة.</p>
      {COVERAGE_43.map(row => <details key={row.id}>
        <summary><Text43 text={`${row.id} — ${row.title} · ${row.units.length} وحدات`}/></summary>
        <p><Text43 text={`${row.destination} → ${row.answerLocation}`}/></p>
        <Lines43 lines={row.items.map(item => `${item.id}: ${item.parts.join(' / ')}`)}/>
        <Lines43 lines={row.units.map(unit => unit.text)}/>
      </details>)}
    </Panel43>
    <Panel43 title="تدقيق التغطية والدقة">
      <h3>ما نُقل مباشرة من المصدر</h3>
      <Lines43 lines={COVERAGE_ACCURACY_NOTES_43}/>
      <h3>ما أضافته المنصة</h3>
      <Lines43 lines={COVERAGE_PLATFORM_ADDITIONS_43}/>
    </Panel43>
    <Panel43 title="حدود المصدر والوصول">
      <p>§34 في المصدر يحتوي مفاتيح الاختبار الـ25 كاملة، ولذلك لا يُعرض في منطقة الطالب؛ يفتح من بوابة المعلم أو بعد التسليم. لا توجد خدمة خادم: كلمة المرور بوابة تربوية وفق آلية المنصة القائمة، وليست حماية من فحص ملفات JavaScript العامة. لا تُحمّل واجهة الحلول ولا دليل المعلم في المسار العادي قبل استحقاق الوصول.</p>
      <p>الدرس 44 (MUST &amp; HAVE TO) خريطة نصية في §37 فقط، ولا يوجد له مسار أو بطاقة أو تنفيذ في هذه النسخة.</p>
    </Panel43>
  </div>;
}
