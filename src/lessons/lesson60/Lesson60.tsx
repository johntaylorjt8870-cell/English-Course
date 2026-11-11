import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import FinalTest from "../../shared/finalTest";
import {
  BACKSHIFT_INTRO_60,
  BACKSHIFT_TABLE_60,
  DIRECT_60,
  DIALOGUE_60,
  ERRORS_60,
  EXCEPTIONS_60,
  MODALS_60,
  OPENING60,
  PRONOUNS_60,
  QUICK_CHECK_60,
  READING_60,
  REPORTED_60,
  SAID_60,
  SOLVED_60,
  SPEAKING_60,
  STEPS_60,
  SUMMARY_60,
  TENSE_LESSONS_60,
  TIME_PLACE_60,
  TOLD_60,
  WRITING_60,
  type TenseLesson60,
} from "./content60";
import { ORIGINAL_TEST_60, ORIGINAL_TEST_SECTIONS_60, PRACTICES_60, PRACTICE_TOTALS_60 } from "./practice60";
import { TEST_60 } from "./test60";
import {
  BackshiftTimeline60,
  ChallengeStudio60,
  ErrorDetective60,
  ExceptionDetector60,
  PracticeSet60,
  PronounMapper60,
  ReportedLines60,
  SaidToldLab60,
  SpeechExplorer60,
  TimePlaceLab60,
  TransformStudio60,
} from "./labs60";
import { Attempt60, Btn60, Bubble60, Disclosure60, En60, MapTable60, Mixed60, Scene60, TransferPair60 } from "./kit60";
import TeacherArea60 from "./TeacherArea60";
import "./lesson60.css";

/* ============================================================
   خريطة الدرس — المحطات والخطوات
   ============================================================ */

type Slide60 = { id: string; station: string; title: string; emblem: string };

const STATIONS_60 = [
  { id: "start", title: "الانطلاق" },
  { id: "foundations", title: "الأساس · الموضوعات ١–٤" },
  { id: "backshift", title: "رجوع الزمن · ٥–١٢" },
  { id: "words", title: "الضمائر والزمان والمكان · ١٣–١٥" },
  { id: "exceptions", title: "الاستثناءات والخطوات · ١٦–٢٠" },
  { id: "application", title: "الأخطاء والحوار والقراءة · ٢١–٢٩" },
  { id: "practice", title: "التدريبات الثمانية · ٣٠" },
  { id: "test", title: "الاختبارات والمفتاح · ٣١–٣٥" },
  { id: "tasks", title: "الكتابة والتحدث والملخص · ٣٦–٣٩" },
  { id: "lab", title: "مختبرات استوديو النقل" },
  { id: "close", title: "المعلم والخارطة" },
];

const SLIDES_60: Slide60[] = [
  { id: "cover", station: "start", title: "استوديو نقل الحديث — الكلام المنقول", emblem: "◇" },

  { id: "s1", station: "foundations", title: "١ · الكلام المباشر Direct Speech مع أهداف الدرس", emblem: "01" },
  { id: "s2", station: "foundations", title: "٢ · الكلام المنقول Reported Speech", emblem: "02" },
  { id: "s3", station: "foundations", title: "٣ · فعل النقل SAID وحذف that", emblem: "03" },
  { id: "s4", station: "foundations", title: "٤ · فعل النقل TOLD والفرق بينهما", emblem: "04" },

  { id: "s5", station: "backshift", title: "٥ · فكرة رجوع الزمن Backshift", emblem: "05" },
  { id: "s6", station: "backshift", title: "٦ · المضارع البسيط إلى الماضي البسيط", emblem: "06" },
  { id: "s7", station: "backshift", title: "٧ · المضارع المستمر إلى الماضي المستمر", emblem: "07" },
  { id: "s8", station: "backshift", title: "٨ · المضارع التام إلى الماضي التام", emblem: "08" },
  { id: "s9", station: "backshift", title: "٩ · الماضي البسيط إلى الماضي التام", emblem: "09" },
  { id: "s10", station: "backshift", title: "١٠ · الماضي المستمر إلى الماضي التام المستمر", emblem: "10" },
  { id: "s11", station: "backshift", title: "١١ · المستقبل will إلى would", emblem: "11" },
  { id: "s12", station: "backshift", title: "١٢ · جدول Backshift الشامل وتنبيه must", emblem: "12" },

  { id: "s13", station: "words", title: "١٣ · تغيير الضمائر بحسب المتحدث", emblem: "13" },
  { id: "s14", station: "words", title: "١٤ · كلمات الزمان والمكان", emblem: "14" },
  { id: "s15", station: "words", title: "١٥ · الأفعال الناقصة في الكلام المنقول", emblem: "15" },

  { id: "s16", station: "exceptions", title: "١٦ · الحقائق العامة والثوابت العلمية", emblem: "16" },
  { id: "s17", station: "exceptions", title: "١٧ · الكلام الذي لا يزال صحيحًا", emblem: "17" },
  { id: "s18", station: "exceptions", title: "١٨ · فعل النقل في المضارع says / tells", emblem: "18" },
  { id: "s19", station: "exceptions", title: "١٩ · خطوات التحويل الثماني", emblem: "19" },
  { id: "s20", station: "exceptions", title: "٢٠ · عشرة أمثلة متنوعة محلولة", emblem: "20" },

  { id: "s21", station: "application", title: "٢١–٢٧ · الأخطاء السبعة الشائعة", emblem: "21" },
  { id: "s22", station: "application", title: "٢٨ · حوار At School مع أسئلة الفهم", emblem: "28" },
  { id: "s23", station: "application", title: "٢٩ · قراءة A School Project مع أسئلة الفهم", emblem: "29" },

  ...PRACTICES_60.map((group, i) => ({
    id: `p${i + 1}`,
    station: "practice",
    title: `التدريب ${["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن"][i]} · ${group.title}`,
    emblem: String(i + 1),
  })),

  { id: "s24", station: "test", title: "٣١–٣٤ · الاختبار الأصلي — ٢٥ سؤالًا بأربعة أقسام", emblem: "25" },
  { id: "s25", station: "test", title: "٣٥ · مفتاح الاختبار الأصلي الكامل", emblem: "✓" },
  { id: "final-test", station: "test", title: "الاختبار النهائي المشترك — 15 سؤالًا", emblem: "▣" },

  { id: "s27", station: "tasks", title: "٣٦ · مهمة الكتابة — What My Friend Told Me", emblem: "36" },
  { id: "s28", station: "tasks", title: "٣٧ · مهمة التحدث بنموذجها الصوتي", emblem: "37" },
  { id: "s29", station: "tasks", title: "٣٨ · الملخص النهائي — ست مجموعات قواعد", emblem: "38" },
  { id: "s30", station: "tasks", title: "٣٩ · اختبار الفهم السريع — عشرة أسئلة", emblem: "39" },

  { id: "explorer", station: "lab", title: "مستكشف الكلام المباشر والمنقول", emblem: "A" },
  { id: "studio", station: "lab", title: "استوديو تحويل الرسائل بالقرارات الموجهة", emblem: "B" },
  { id: "timeline", station: "lab", title: "الخط الزمني لرجوع الأزمنة", emblem: "C" },
  { id: "saidtold", station: "lab", title: "مختبر said / told", emblem: "D" },
  { id: "pronouns", station: "lab", title: "مخطّط منظور الضمائر", emblem: "E" },
  { id: "timeshift", station: "lab", title: "مستكشف إزاحة الزمان والمكان", emblem: "F" },
  { id: "detector", station: "lab", title: "كاشف الاستثناءات — اقلب أو أبقِ", emblem: "G" },
  { id: "detective", station: "lab", title: "محقّق الأخطاء السبعة", emblem: "H" },
  { id: "challenges", station: "lab", title: "تحديات التحويل الكامل", emblem: "I" },

  { id: "teacher", station: "close", title: "فضاء المعلم — المفاتيح المحمية", emblem: "T" },
  { id: "progress", station: "close", title: "الخارطة النهائية ومسار الدرس", emblem: "→" },
];

const TEST_STEP_60 = SLIDES_60.findIndex((slide) => slide.id === "final-test");

const GOAL_MARKS = ["①", "②", "③", "④", "⑤", "⑥", "⑦"];
const SPEAKER_NAMES_60 = ["أحمد", "سارة", "علي"];

/* ============================================================
   عناصر صغيرة
   ============================================================ */

const TagList60 = ({ items, ltr = false }: { items: string[]; ltr?: boolean }) => (
  <div className={ltr ? "l60-tags l60-tags--ltr" : "l60-tags"} dir={ltr ? "ltr" : undefined}>
    {items.map((item) => (
      <span key={item}>
        <Mixed60 text={item} />
      </span>
    ))}
  </div>
);

/* ============================================================
   الغلاف
   ============================================================ */

function Cover60({ onStart, onTest }: { onStart: () => void; onTest: () => void }) {
  return (
    <div className="l60-cover" data-l60-cover>
      <div className="l60-cover-copy">
        <div className="l60-eyebrow">
          ENGLISH COURSE <span>LESSON 60 · ADVANCED</span>
        </div>
        <h1>
          REPORTED SPEECH
          <br />
          <em>THE TRANSFER STUDIO</em>
        </h1>
        <h2>الكلام المنقول — الجمل الخبرية</h2>
        <p>
          كيف تنقل ما قاله الآخرون بأسلوبك؟ هنا تسافر كل جملة من «فقاعة المتحدث» عبر بوابات التحويل — الزمن، الضمير، الزمان
          والمكان — إلى «فقاعة الراوي».
        </p>
        <div className="l60-cover-actions">
          <Btn60 variant="bright" onClick={onStart}>
            ابدأ التجربة ↗
          </Btn60>
          <Btn60 variant="ghost" onClick={onTest}>
            الاختبار النهائي · 15 سؤالًا
          </Btn60>
        </div>
        <div className="l60-cover-foot">
          <span>17 قسمًا · 39 موضوعًا</span>
          <span>ثمانية تدريبات · 59 بندًا</span>
          <span>اختبار أصلي من 25 سؤالًا + نهائي مشترك</span>
          <span>تسعة مختبرات تفاعلية</span>
        </div>
      </div>
      <div className="l60-desk" aria-hidden>
        <div className="l60-desk-row">
          <div className="l60-avatar">🗣️</div>
          <div className="l60-mini-bubble l60-mini-bubble--out">"I am tired."</div>
        </div>
        <div className="l60-desk-row">
          <div className="l60-wire" />
        </div>
        <div className="l60-desk-gates">
          <span>TENSE ↺</span>
          <span>PRONOUN ⇄</span>
          <span>TIME ⌖</span>
          <span>PLACE ⌖</span>
        </div>
        <div className="l60-desk-row">
          <div className="l60-avatar">✍️</div>
          <div className="l60-mini-bubble l60-mini-bubble--in">He said that he was tired.</div>
        </div>
        <p className="l60-desk-note">قال أحمد: «أنا متعب» ← قال أحمد إنه كان متعبًا.</p>
      </div>
    </div>
  );
}

/* ============================================================
   الموضوعان ١–٢
   ============================================================ */

function Section1() {
  return (
    <Scene60 n="01" kicker="FOUNDATIONS" title={DIRECT_60.title} lead={OPENING60.bridge}>
      <p>
        <Mixed60 text={OPENING60.daily} />
      </p>
      <div className="l60-block">
        <h3>أهداف الدرس</h3>
        <div className="l60-lines">
          {OPENING60.goals.map((goal) => (
            <div key={goal.n}>
              <b className="l60-golden" style={{ marginInlineEnd: "0.4rem" }}>
                {GOAL_MARKS[goal.n - 1]}
              </b>
              <Mixed60 text={goal.text} />
            </div>
          ))}
        </div>
      </div>

      <h3>ما هو الكلام المباشر؟</h3>
      <p>
        <Mixed60 text={DIRECT_60.definition} />
      </p>
      <p className="l60-warn">{DIRECT_60.quoteRule}</p>

      {DIRECT_60.examples.map((example, i) => (
        <div className="l60-block" key={example.en}>
          <Bubble60 variant="direct" who={SPEAKER_NAMES_60[i]} en={example.en} ar={example.ar} caption={example.echo} />
          <p className="l60-small" style={{ margin: "0.5rem 0 0" }}>
            نقلنا كلامه كما نطق به حرفيًا: <En60>{example.echo}</En60> — {example.echoAr}
          </p>
        </div>
      ))}
      <p className="l60-good">{DIRECT_60.close}</p>
    </Scene60>
  );
}

function Section2() {
  return (
    <Scene60 n="02" kicker="FOUNDATIONS" title={REPORTED_60.title} lead={REPORTED_60.definition}>
      {REPORTED_60.pairs.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} whoDirect={SPEAKER_NAMES_60[i]} whoReported="الراوي ينقل" />
      ))}
      <h3>مقارنة سريعة</h3>
      <MapTable60 rows={REPORTED_60.compare} head={["الكلام المباشر", "الكلام المنقول"]} />
      <p className="l60-note">{REPORTED_60.arabicNote}</p>
    </Scene60>
  );
}

/* ============================================================
   الموضوعان ٣–٤
   ============================================================ */

function Section3() {
  return (
    <Scene60 n="03" kicker="REPORTING VERB" title={SAID_60.title} lead={SAID_60.rule} en={SAID_60.structure}>
      {SAID_60.examples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} />
      ))}
      <div className="l60-block">
        <h3>{SAID_60.thatNote.title}</h3>
        <p>{SAID_60.thatNote.lead}</p>
        <div className="l60-tags" dir="ltr">
          {SAID_60.thatNote.both.map((item) => (
            <span key={item}>
              <En60>{item}</En60>
            </span>
          ))}
        </div>
        <p>
          <Mixed60 text={SAID_60.thatNote.meaning} />
        </p>
        <p className="l60-note">{SAID_60.thatNote.clarity}</p>
      </div>
    </Scene60>
  );
}

function Section4() {
  return (
    <Scene60 n="04" kicker="REPORTING VERB" title={TOLD_60.title} lead={TOLD_60.rule} en={TOLD_60.structure}>
      {TOLD_60.examples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} />
      ))}

      <h3>{TOLD_60.contrast.title}</h3>
      <div className="l60-cols">
        <div className="l60-block l60-block--ok">
          <h3>✓ نقول</h3>
          <p style={{ margin: 0 }}>
            <En60 style={{ fontWeight: 700 }}>{TOLD_60.contrast.ok1.en}</En60>
            <span className="l60-small" style={{ display: "block" }}>
              {TOLD_60.contrast.ok1.ar}
            </span>
          </p>
          <p style={{ marginTop: "0.6rem", marginBottom: 0 }}>
            <En60 style={{ fontWeight: 700 }}>{TOLD_60.contrast.ok2.en}</En60>
            <span className="l60-small" style={{ display: "block" }}>
              {TOLD_60.contrast.ok2.ar}
            </span>
          </p>
        </div>
        <div className="l60-block l60-block--bad">
          <h3>✕ ولا نقول</h3>
          <p style={{ margin: 0 }}>
            <En60 className="l60-wrongtext" style={{ fontWeight: 700 }}>
              {TOLD_60.contrast.wrong1}
            </En60>
          </p>
          <p className="l60-small">{TOLD_60.contrast.wrong1Note}</p>
          <p style={{ margin: 0 }}>
            <En60 className="l60-wrongtext" style={{ fontWeight: 700 }}>
              {TOLD_60.contrast.wrong2}
            </En60>
          </p>
          <p className="l60-small" style={{ marginBottom: 0 }}>
            {TOLD_60.contrast.wrong2Note}
          </p>
        </div>
      </div>

      <h3>مقارنة مهمة</h3>
      <MapTable60
        rows={TOLD_60.compareRows.map((row) => ({ direct: row.verb, reported: row.form }))}
        head={["الفعل", "التركيب الصحيح"]}
      />
      <h3>طريقة التذكّر</h3>
      <TagList60 items={TOLD_60.memory} />
    </Scene60>
  );
}

/* ============================================================
   الموضوع ٥ — فكرة رجوع الزمن
   ============================================================ */

function Section5() {
  return (
    <Scene60 n="05" kicker="BACKSHIFT" title={BACKSHIFT_INTRO_60.title} lead={BACKSHIFT_INTRO_60.lead}>
      <div className="l60-block">
        <h3>
          <En60>{BACKSHIFT_INTRO_60.term}</En60>
        </h3>
        <p>{BACKSHIFT_INTRO_60.termAr}</p>
      </div>
      <TransferPair60 pair={BACKSHIFT_INTRO_60.example} whoDirect="المتحدث" whoReported="الراوي ينقل" />
      <p>
        <Mixed60 text={BACKSHIFT_INTRO_60.why} />
      </p>
      <p className="l60-warn">{BACKSHIFT_INTRO_60.caution}</p>
    </Scene60>
  );
}

/* ============================================================
   الموضوعات ٦–١١ — تحويلات الأزمنة الستة
   ============================================================ */

function TenseSlide({ lesson }: { lesson: TenseLesson60 }) {
  const marks = ["٠٦", "٠٧", "٠٨", "٠٩", "١٠", "١١"];
  return (
    <Scene60
      n={String(lesson.n).padStart(2, "0")}
      kicker="BACKSHIFT LESSON"
      title={lesson.title}
      en={lesson.en}
    >
      <h3>القاعدة</h3>
      <MapTable60
        rows={[{ direct: lesson.ruleFrom, reported: lesson.ruleTo }]}
        head={[`في المباشر · الموضوع ${marks[lesson.n - 6]}`, "في المنقول"]}
      />
      {lesson.examples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} />
      ))}
      {lesson.note && <p className="l60-note">{lesson.note}</p>}
    </Scene60>
  );
}

/* ============================================================
   الموضوع ١٢ — الجدول الشامل وتنبيه must
   ============================================================ */

function Section12() {
  const warning = BACKSHIFT_TABLE_60.mustWarning;
  return (
    <Scene60 n="12" kicker="BACKSHIFT" title={BACKSHIFT_TABLE_60.title} lead={BACKSHIFT_TABLE_60.lead}>
      <MapTable60
        rows={BACKSHIFT_TABLE_60.rows.map((row) => ({ direct: row.from, reported: row.to, note: row.note }))}
        head={["في الكلام المباشر", "في الكلام المنقول", "ملاحظة"]}
      />
      <h3>صيغة مختصرة للحفظ</h3>
      <div className="l60-tags" dir="ltr">
        {BACKSHIFT_TABLE_60.shorthand.map((item) => (
          <span key={item}>
            <En60>{item}</En60>
          </span>
        ))}
      </div>
      <div className="l60-block l60-block--bad">
        <h3 style={{ color: "#9c3a2b" }}>{warning.title}</h3>
        <p>{warning.lead}</p>
        <h4>الالتزام والضرورة</h4>
        <TransferPair60 pair={warning.obligation} whoDirect="المتحدث" whoReported="الراوي" compact />
        <h4>الاستنتاج القوي</h4>
        <p className="l60-note">{warning.deductionLead}</p>
        <TransferPair60 pair={warning.deduction} whoDirect="المتحدث" whoReported="الراوي" compact />
      </div>
    </Scene60>
  );
}

/* ============================================================
   الموضوعات ١٣–١٥
   ============================================================ */

function Section13() {
  return (
    <Scene60 n="13" kicker="PRONOUNS" title={PRONOUNS_60.title} lead={PRONOUNS_60.lead}>
      <h3>المثال الموجّه</h3>
      <TransferPair60 pair={PRONOUNS_60.anchor} whoDirect="أحمد" whoReported="الراوي ينقل" />
      <h3>الجدول الإرشادي</h3>
      <MapTable60 rows={PRONOUNS_60.table} head={["في المباشر", "في المنقول", "ملاحظة"]} />
      <p className="l60-warn">{PRONOUNS_60.warning}</p>
      <h3>خمسة أمثلة سياقية</h3>
      {PRONOUNS_60.examples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} />
      ))}
    </Scene60>
  );
}

function Section14() {
  return (
    <Scene60 n="14" kicker="TIME & PLACE" title={TIME_PLACE_60.title} lead={TIME_PLACE_60.lead}>
      <p className="l60-note">
        <Mixed60 text={TIME_PLACE_60.scenario} />
      </p>
      <h3>كلمات الزمان</h3>
      <MapTable60 rows={TIME_PLACE_60.timeRows} head={["في المباشر", "في المنقول"]} />
      {TIME_PLACE_60.timeExamples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} compact />
      ))}
      <h3>كلمات المكان والحركة</h3>
      <MapTable60 rows={TIME_PLACE_60.placeRows} head={["في المباشر", "في المنقول", "ملاحظة"]} />
      {TIME_PLACE_60.placeExamples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} compact />
      ))}
      <p className="l60-warn">{TIME_PLACE_60.note}</p>
    </Scene60>
  );
}

function Section15() {
  return (
    <Scene60 n="15" kicker="MODALS" title={MODALS_60.title} lead={MODALS_60.lead}>
      <MapTable60 rows={MODALS_60.rows} head={["في المباشر", "في المنقول", "ملاحظة"]} />
      {MODALS_60.examples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} />
      ))}
    </Scene60>
  );
}

/* ============================================================
   الموضوعات ١٦–٢٠
   ============================================================ */

function Section16() {
  const facts = EXCEPTIONS_60.facts;
  return (
    <Scene60 n="16" kicker="EXCEPTIONS" title={facts.title} lead={facts.lead}>
      <TransferPair60 pair={facts.anchor} whoDirect="المعلم" whoReported="الراوي ينقل" />
      <h3>ثلاثة أدلة إضافية</h3>
      {facts.examples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} compact />
      ))}
      <p className="l60-good">القاعدة: حقيقة علمية أو عامة ثابتة ← يبقى الزمن في المضارع حتى مع said في الماضي.</p>
    </Scene60>
  );
}

function Section17() {
  const stillTrue = EXCEPTIONS_60.stillTrue;
  return (
    <Scene60 n="17" kicker="EXCEPTIONS" title={stillTrue.title} lead={stillTrue.lead}>
      <Bubble60 variant="direct" who="سارة" en={stillTrue.anchor.direct} ar={stillTrue.anchor.directAr} />
      <p className="l60-note">{stillTrue.anchor.condition}</p>
      <Bubble60 variant="reported" who="الراوي ينقل — المضارع يبقى" en={stillTrue.anchor.reported} ar={stillTrue.anchor.reportedAr} />
      <p className="l60-good">
        وصحيح أيضًا: <En60>{stillTrue.anchor.also}</En60>
      </p>
      <p className="l60-note">{stillTrue.anchor.choiceNote}</p>
      <h3>مثال ثانٍ</h3>
      <TransferPair60 pair={stillTrue.second} whoDirect="علي" whoReported="الراوي ينقل" />
    </Scene60>
  );
}

function Section18() {
  const present = EXCEPTIONS_60.presentVerb;
  return (
    <Scene60 n="18" kicker="EXCEPTIONS" title={present.title} lead={present.lead}>
      {present.examples.map((pair, i) => (
        <TransferPair60 key={pair.direct} pair={pair} index={i + 1} />
      ))}
      <p className="l60-good">
        <Mixed60 text={present.contrast} />
      </p>
    </Scene60>
  );
}

function Section19() {
  return (
    <Scene60 n="19" kicker="METHOD" title={STEPS_60.title} lead={STEPS_60.lead}>
      <ol className="l60-steps">
        {STEPS_60.steps.map((step, i) => (
          <li key={step} className="l60-step">
            <b>{i + 1}</b>
            <span>
              <Mixed60 text={step} />
            </span>
          </li>
        ))}
      </ol>
      <div className="l60-block">
        <h3>تطبيق كامل على جملة واحدة</h3>
        <p>
          الجملة الأصلية: <En60>{STEPS_60.worked.direct}</En60>
          <span className="l60-small" style={{ display: "block" }}>
            {STEPS_60.worked.directAr}
          </span>
        </p>
        <div className="l60-stage-list">
          {STEPS_60.worked.stages.map((stage) => (
            <div className="l60-stage" key={stage.label}>
              <h4>{stage.label}</h4>
              <p className="l60-stage-note">
                <En60>{stage.value}</En60>
                <span className="l60-stage-arrow">⟶</span>
                <En60 style={{ fontWeight: 700 }}>{stage.becomes}</En60>
              </p>
              <p className="l60-small" style={{ margin: 0 }}>
                <Mixed60 text={stage.note} />
              </p>
            </div>
          ))}
        </div>
        <p className="l60-good" style={{ marginTop: "0.9rem" }}>
          النتيجة النهائية: <En60 style={{ fontWeight: 700 }}>{STEPS_60.worked.result}</En60>
          <span style={{ display: "block" }}>{STEPS_60.worked.resultAr}</span>
        </p>
        <div className="l60-tags" dir="ltr">
          {STEPS_60.worked.summary.map((item) => (
            <span key={item}>
              <En60>{item}</En60>
            </span>
          ))}
        </div>
        <p>{STEPS_60.worked.closing}</p>
      </div>
    </Scene60>
  );
}

function Section20() {
  return (
    <Scene60 n="20" kicker="SOLVED" title="٢٠ · عشرة أمثلة متنوعة محلولة" lead="عشر جمل خبرية منقولة تغطي كل الأزمنة والأفعال الناقصة والحقائق الثابتة.">
      {SOLVED_60.map((item) => (
        <div className="l60-block" key={item.label}>
          <div className="l60-tags" style={{ marginBottom: "0.5rem" }}>
            <span className="l60-golden">{item.label}</span>
            <span>
              <En60>{item.tense}</En60>
            </span>
          </div>
          <div className="l60-transfer l60-transfer--compact">
            <div className="l60-transfer-grid">
              <Bubble60 variant="direct" who="المتحدث الأصلي" en={item.direct} />
              <div className="l60-path" aria-hidden>
                <span className="l60-path-arrow">⟶</span>
              </div>
              <Bubble60 variant="reported" who="الراوي ينقل" en={item.reported} ar={item.ar} />
            </div>
          </div>
        </div>
      ))}
    </Scene60>
  );
}

/* ============================================================
   الموضوعات ٢١–٢٩
   ============================================================ */

function Section21() {
  return (
    <Scene60 n="21" kicker="ERRORS" title="٢١–٢٧ · الأخطاء السبعة الشائعة" lead="الخطأ ثم التصحيح ثم التفسير — وبعض الأخطاء لها بديل صحيح مقبول.">
      {ERRORS_60.map((error) => (
        <div className="l60-error-row" key={error.n}>
          <b className="l60-golden">{error.title}</b>
          <p className="l60-wrongtext" style={{ margin: "0.35rem 0 0" }}>
            ✕ <En60>{error.wrong}</En60>
          </p>
          <p className="l60-righttext" style={{ margin: "0.2rem 0 0" }}>
            ✓ <En60>{error.right}</En60>
          </p>
          {error.rightAlt && (
            <p className="l60-righttext" style={{ margin: "0.2rem 0 0" }}>
              ✓ أو: <En60>{error.rightAlt}</En60>
            </p>
          )}
          <p className="l60-note" style={{ marginTop: "0.4rem" }}>
            <Mixed60 text={error.why} />
          </p>
          {error.note && (
            <p className="l60-small" style={{ margin: "0.25rem 0 0" }}>
              {error.note}
            </p>
          )}
        </div>
      ))}
    </Scene60>
  );
}

function Section22() {
  return (
    <Scene60 n="28" kicker="DIALOGUE" title={DIALOGUE_60.title} lead="حوار بين منى وسارة في المدرسة — ثم نسخة منقولة بصيغة الراوي.">
      {DIALOGUE_60.turns.map((turn, i) => (
        <div className="l60-block" key={turn.en}>
          <b className="l60-golden" style={{ marginInlineEnd: "0.35rem" }}>
            {i + 1} ـ
          </b>
          <Bubble60 variant="direct" who={turn.who} en={turn.en} ar={turn.ar} />
        </div>
      ))}
      <h3>{DIALOGUE_60.reportedTitle}</h3>
      <ReportedLines60 intro={DIALOGUE_60.reportedIntro} lines={DIALOGUE_60.reported} />
      <h3>أسئلة الفهم</h3>
      {DIALOGUE_60.qa.map((qa, i) => (
        <Disclosure60
          key={qa.q}
          summary={
            <span>
              {i + 1} ـ <En60>{qa.q}</En60>
            </span>
          }
        >
          <p>
            <En60>{qa.a}</En60>
            <span className="l60-small" style={{ display: "block" }}>
              {qa.ar}
            </span>
          </p>
        </Disclosure60>
      ))}
    </Scene60>
  );
}

function Section23() {
  const paraTitles = ["الفقرة الأولى", "الفقرة الثانية", "الفقرة الثالثة", "الفقرة الرابعة", "الفقرة الخامسة"];
  return (
    <Scene60 n="29" kicker="READING" title={`${READING_60.title} — ${READING_60.titleAr}`} lead="اقرأ الفقرة الإنجليزية، ولكل فقرة ترجمتها العربية تحتها مباشرة.">
      {READING_60.paragraphs.map((paragraph, i) => (
        <div className="l60-block" key={paragraph}>
          <b className="l60-golden">{paraTitles[i]}</b>
          <p style={{ margin: "0.35rem 0 0" }}>
            <En60>{paragraph}</En60>
          </p>
          <p className="l60-small" style={{ margin: "0.45rem 0 0" }}>
            {READING_60.translation[i]}
          </p>
        </div>
      ))}
      <div className="l60-block">
        <h3>مفردات الفقرة</h3>
        <div className="l60-gloss">
          {READING_60.gloss.map((g) => (
            <span key={g.en}>
              <En60>{g.en}</En60> = {g.ar}
            </span>
          ))}
        </div>
      </div>
      <h3>أسئلة الفهم</h3>
      {READING_60.qa.map((qa, i) => (
        <Disclosure60
          key={qa.q}
          summary={
            <span>
              {i + 1} ـ <En60>{qa.q}</En60>
            </span>
          }
        >
          <p>
            <En60>{qa.a}</En60>
            <span className="l60-small" style={{ display: "block" }}>
              {qa.ar}
            </span>
          </p>
        </Disclosure60>
      ))}
    </Scene60>
  );
}

/* ============================================================
   الاختبار الأصلي ومفتاحه (الموضوعات ٣١–٣٥)
   ============================================================ */

function OriginalTestSection60() {
  return (
    <Scene60
      n="31"
      kicker="ORIGINAL TEST"
      title="الاختبار الأصلي — ٢٥ سؤالًا في أربعة أقسام"
      lead="اختبار الدرس كما ورد في المصدر: اختر، حوّل، صحّح، أكمل. اكتب أو اختر إجابتك ثم تحقّق — لا يظهر النموذج والشرح إلا بعد التحقق."
    >
      {ORIGINAL_TEST_SECTIONS_60.map((section, si) => (
        <div className="l60-block" key={section}>
          <h3>
            {["٣١", "٣٢", "٣٣", "٣٤"][si]} · {section}
          </h3>
          <div className="l60-practice-list">
            {ORIGINAL_TEST_60.filter((item) => item.section === section).map((item) => (
              <Attempt60 key={item.n} item={item} index={item.n} />
            ))}
          </div>
        </div>
      ))}
    </Scene60>
  );
}

function OriginalKeySection60() {
  return (
    <Scene60
      n="35"
      kicker="ORIGINAL KEY"
      title="مفتاح الاختبار الأصلي الكامل — الأسئلة ١ إلى ٢٥"
      lead="الإجابات النموذجية للاختبار الأصلي مع الشرح، وأي صيغة بديلة صحيحة مذكورة داخل الشرح نفسه."
    >
      <ol className="l60-lines" style={{ paddingInlineStart: 0, listStyle: "none" }}>
        {ORIGINAL_TEST_60.map((item) => (
          <li className="l60-block" key={item.n}>
            <b className="l60-golden" style={{ marginInlineEnd: "0.35rem" }}>
              {item.n} ـ
            </b>
            <En60 style={{ fontWeight: 700 }}>{item.answer}</En60>
            <p style={{ margin: "0.3rem 0 0" }}>
              <Mixed60 text={item.why} />
            </p>
            {item.ar && (
              <p className="l60-small" style={{ margin: "0.25rem 0 0" }}>
                {item.ar}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Scene60>
  );
}

/* ============================================================
   الموضوعات ٣٦–٣٩
   ============================================================ */

function Section27() {
  return (
    <Scene60 n="36" kicker="WRITING" title={`${WRITING_60.titleAr}`} en={WRITING_60.title} lead={WRITING_60.instruction}>
      <div className="l60-block">
        <h3>تراكيب جاهزة من الدرس</h3>
        <div className="l60-tags" dir="ltr">
          {WRITING_60.structures.map((item) => (
            <span key={item}>
              <En60>{item}</En60>
            </span>
          ))}
        </div>
      </div>
      <Disclosure60 summary="النموذج الكامل — اكشفه بعد أن تحاول الكتابة بنفسك">
        <div className="l60-writing">
          {WRITING_60.model.map((paragraph, i) => (
            <div key={paragraph}>
              <p>
                <En60>{paragraph}</En60>
              </p>
              <p className="l60-small">{WRITING_60.modelAr[i]}</p>
            </div>
          ))}
        </div>
      </Disclosure60>
    </Scene60>
  );
}

function Section28() {
  return (
    <Scene60 n="37" kicker="SPEAKING" title={SPEAKING_60.title} lead={SPEAKING_60.intro}>
      <div className="l60-block">
        <h3>السؤال</h3>
        <p style={{ margin: 0 }}>
          <En60 style={{ fontWeight: 700, fontSize: "1.1rem" }}>{SPEAKING_60.prompt}</En60>
          <span className="l60-small" style={{ display: "block" }}>
            {SPEAKING_60.promptAr}
          </span>
        </p>
      </div>
      <Disclosure60 summary="النموذج الصوتي للإجابة — ثم اقرأه بصوت مرتفع">
        <div className="l60-model">
          {SPEAKING_60.model.map((line) => (
            <p key={line.en}>
              <En60>{line.en}</En60>
              <span className="l60-small" style={{ display: "block" }}>
                {line.ar}
              </span>
            </p>
          ))}
        </div>
      </Disclosure60>
      <div className="l60-block">
        <h3>{SPEAKING_60.extraTitle}</h3>
        <p>
          <Mixed60 text={SPEAKING_60.extra} />
        </p>
      </div>
    </Scene60>
  );
}

function Section29() {
  return (
    <Scene60 n="38" kicker="SUMMARY" title={SUMMARY_60.title} lead="خلاصة الدرس في ست مجموعات: التمييز، فعلا النقل، الأزمنة، الضمائر، الزمان والمكان، والاستثناءات.">
      <div className="l60-summary-grid">
        {SUMMARY_60.groups.map((group) => (
          <div className="l60-block" key={group.title}>
            <h3>{group.title}</h3>
            {"lines" in group && group.lines ? (
              <div className="l60-lines">
                {group.lines.map((line) => (
                  <div key={line.en}>
                    <En60 style={{ fontWeight: 700 }}>{line.en}</En60>
                    <span style={{ marginInlineStart: "0.4rem" }}>
                      <Mixed60 text={line.ar} />
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
            {"chips" in group && group.chips ? (
              <div className="l60-tags" dir="ltr">
                {group.chips.map((chip) => (
                  <span key={chip}>
                    <En60>{chip}</En60>
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Scene60>
  );
}

function Section30() {
  return (
    <Scene60 n="39" kicker="QUICK CHECK" title={QUICK_CHECK_60.title} lead={QUICK_CHECK_60.lead}>
      {QUICK_CHECK_60.items.map((item, i) => (
        <Disclosure60
          key={item.q}
          summary={
            <span>
              {i + 1} ـ <Mixed60 text={item.q} />
            </span>
          }
        >
          <p>
            <Mixed60 text={item.a} />
          </p>
        </Disclosure60>
      ))}
      <p className="l60-good">{QUICK_CHECK_60.closing}</p>
    </Scene60>
  );
}

/* ============================================================
   الخارطة النهائية
   ============================================================ */

function ProgressScene60({ onExit }: { onExit?: () => void }) {
  return (
    <Scene60 n="→" kicker="COURSE PATH" title="من الفقاعة المباشرة إلى فقاعة الراوي">
      <div className="l60-progress">
        <p className="l60-lead">
          بدأ الدرس بتمييز الكلام المباشر عن المنقول، ثم أتقنّا <En60>said / told</En60>، وركّبنا قاعدة{" "}
          <En60>Backshift</En60> عبر الأزمنة الستة والأفعال الناقصة، ثم الضمائر وكلمات الزمان والمكان.
        </p>
        <p className="l60-lead">
          بعدها ثبّتّا الاستثناءات الثلاثة، وتدرّبنا على ثمانية تدريبات مصدرية كاملة، واختبار أصلي من ٢٥ سؤالًا، واختبار
          نهائي مشترك من ١٥ سؤالًا — ولم يُحذف من المصدر أي سؤال أو مثال أو ترجمة.
        </p>
        <div className="l60-tags" dir="ltr">
          <span>
            <En60>said + (that)</En60>
          </span>
          <span>
            <En60>told + person + (that)</En60>
          </span>
          <span>
            <En60>am → was · will → would · must → had to</En60>
          </span>
        </div>
        <div className="l60-tags" dir="ltr">
          <span>
            <En60>I → he / she · you → بحسب السياق</En60>
          </span>
          <span>
            <En60>now → then · tomorrow → the following day · here → there</En60>
          </span>
        </div>
        <p>
          <a className="l60-prev-link" href="#/lesson/59">
            الدرس 59 — <En60>Advanced Passive</En60>
          </a>
        </p>
        <p className="l60-endnote">
          تابع إلى الدرس التالي لتتعلم نقل الأسئلة والأوامر والطلبات والتعليمات.
          {" "}<a className="l60-prev-link" href="#/lesson/61">الدرس 61 — <En60>Reported Questions &amp; Commands</En60></a>
        </p>
        <div className="l60-actions">
          <Btn60 onClick={() => (window.location.hash = "/lesson/59")}>← الدرس السابق · 59</Btn60>
          <Btn60 onClick={() => (window.location.hash = "/lesson/61")}>الدرس التالي · 61 →</Btn60>
          {onExit && (
            <Btn60 variant="soft" onClick={onExit}>
              العودة إلى فهرس الدروس
            </Btn60>
          )}
        </div>
      </div>
    </Scene60>
  );
}

/* ============================================================
   الهيكل الرئيسي
   ============================================================ */

function Body60({
  slide,
  onStart,
  onTest,
  onExit,
}: {
  slide: Slide60;
  onStart: () => void;
  onTest: () => void;
  onExit?: () => void;
}) {
  const id = slide.id;
  if (id === "cover") return <Cover60 onStart={onStart} onTest={onTest} />;
  if (id === "teacher") return <TeacherArea60 />;
  if (id === "progress") return <ProgressScene60 onExit={onExit} />;
  if (id === "s1") return <Section1 />;
  if (id === "s2") return <Section2 />;
  if (id === "s3") return <Section3 />;
  if (id === "s4") return <Section4 />;
  if (id === "s5") return <Section5 />;
  if (id === "s6") return <TenseSlide lesson={TENSE_LESSONS_60[0]} />;
  if (id === "s7") return <TenseSlide lesson={TENSE_LESSONS_60[1]} />;
  if (id === "s8") return <TenseSlide lesson={TENSE_LESSONS_60[2]} />;
  if (id === "s9") return <TenseSlide lesson={TENSE_LESSONS_60[3]} />;
  if (id === "s10") return <TenseSlide lesson={TENSE_LESSONS_60[4]} />;
  if (id === "s11") return <TenseSlide lesson={TENSE_LESSONS_60[5]} />;
  if (id === "s12") return <Section12 />;
  if (id === "s13") return <Section13 />;
  if (id === "s14") return <Section14 />;
  if (id === "s15") return <Section15 />;
  if (id === "s16") return <Section16 />;
  if (id === "s17") return <Section17 />;
  if (id === "s18") return <Section18 />;
  if (id === "s19") return <Section19 />;
  if (id === "s20") return <Section20 />;
  if (id === "s21") return <Section21 />;
  if (id === "s22") return <Section22 />;
  if (id === "s23") return <Section23 />;
  if (/^p\d+$/.test(id)) {
    const index = Number(id.slice(1)) - 1;
    const group = PRACTICES_60[index];
    if (group) {
      return (
        <Scene60
          n={`EX ${index + 1}`}
          kicker="PRACTICE"
          title={group.title}
          subtitle="اكتب أو اختر، ثم تحقّق — لا يظهر النموذج ولا الشرح قبل التحقق."
        >
          <PracticeSet60 group={group} />
        </Scene60>
      );
    }
  }
  if (id === "s24") return <OriginalTestSection60 />;
  if (id === "s25") return <OriginalKeySection60 />;
  if (id === "final-test") {
    return (
      <Scene60
        n="15"
        kicker="FINAL TEST"
        title="الاختبار النهائي المشترك — 15 سؤالًا"
        lead="لا تظهر صحّة أي إجابة ولا الدرجة ولا الشرح قبل الضغط على «تصحيح الاختبار». يمكنك تغيير اختياراتك بحرّية حتى التسليم."
      >
        <div className="l60-note">
          الأسئلة الخمسة والعشرون الأصلية محفوظة كاملة في محطة «الاختبار الأصلي» ومفتاحها في المحطة التي تليها — فلم يُحذف
          أي سؤال من المصدر.
        </div>
      </Scene60>
    );
  }
  if (id === "s27") return <Section27 />;
  if (id === "s28") return <Section28 />;
  if (id === "s29") return <Section29 />;
  if (id === "s30") return <Section30 />;
  if (id === "explorer") return <SpeechExplorer60 />;
  if (id === "studio") return <TransformStudio60 />;
  if (id === "timeline") return <BackshiftTimeline60 />;
  if (id === "saidtold") return <SaidToldLab60 />;
  if (id === "pronouns") return <PronounMapper60 />;
  if (id === "timeshift") return <TimePlaceLab60 />;
  if (id === "detector") return <ExceptionDetector60 />;
  if (id === "detective") return <ErrorDetective60 />;
  if (id === "challenges") return <ChallengeStudio60 />;
  return null;
}

export default function Lesson60({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menu, setMenu] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const main = useRef<HTMLElement | null>(null);
  const total = SLIDES_60.length;

  const go = useCallback(
    (target: number) => {
      const next = Math.max(0, Math.min(total - 1, target));
      setStep(next);
      setVisited((prev) => (prev.has(next) ? prev : new Set(prev).add(next)));
      setMenu(false);
      if (main.current) main.current.scrollTop = 0;
    },
    [total],
  );

  const next = useCallback(() => go(step + 1), [go, step]);
  const previous = useCallback(() => go(step - 1), [go, step]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        previous();
      }
      if (event.key === " ") {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, next, previous]);

  /**
   * وسم المحطة نص واحد داخل غلاف واحد؛ Mixed60 يعزل المدى الرقمي والمقاطع
   * الإنجليزية، فلا ينعكس ترتيب العنوان في عمود الفهرس RTL.
   */
  const stationLabel = (title: string) => (
    <span className="l60-rail-title">
      <Mixed60 text={title} />
    </span>
  );

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_60.map((station) => ({
        section: stationLabel(station.title),
        items: SLIDES_60.flatMap((slide, index) =>
          slide.station === station.id
            ? [
                {
                  index,
                  title: stationLabel(slide.title),
                  mascot: <span aria-hidden="true">{slide.emblem}</span>,
                  navId: slide.id,
                },
              ]
            : [],
        ),
      })).filter((group) => group.items.length > 0),
    [],
  );

  const slide = SLIDES_60[step];

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson60"
      rootDir="rtl"
      rootDataLesson={60}
      rootDataShell="transfer-studio"
      railAriaLabel="فهرس خطوات الدرس 60"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={
        <span>
          الدرس 60 <En60 className="text-sm">· REPORTED SPEECH</En60>
        </span>
      }
      railSubtitle={
        <span className="l60-rail-meta">
          {visited.size} / {total} محطة زرتها
        </span>
      }
      groups={groups}
      activeIndex={step}
      onSelectStep={go}
      onExit={onExit}
      isMenuOpen={menu}
      onMenuOpenChange={setMenu}
      headerContent={<Mixed60 className="l60-header-title" text={slide.title} />}
      progress={((step + 1) / total) * 100}
      counter={
        <bdi dir="ltr">
          {step + 1} / {total}
        </bdi>
      }
      counterDir="ltr"
      contentKey={step}
      contentArea={slide.id}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === total - 1}
      mainRef={main}
      mainId="l60-main"
      mainAfter={
        <div hidden={slide.id !== "final-test"} className="lesson-content-container" data-l60-final-test>
          <FinalTest lesson={60} questions={TEST_60} accent="bg-[#221a38]" onGoTeacher={() => go(SLIDES_60.findIndex((s) => s.id === "teacher"))} />
        </div>
      }
    >
      <div className="l60-main">
        <Body60 slide={slide} onStart={() => go(1)} onTest={() => go(TEST_STEP_60)} onExit={onExit} />
      </div>
    </Lesson1Shell>
  );
}

export const LESSON_60_SLIDES = SLIDES_60;
export const LESSON_60_STATIONS = STATIONS_60;
export const LESSON_60_STEP_COUNT = SLIDES_60.length;
export const LESSON_60_SOURCE_SECTION_COUNT = 17;
export const LESSON_60_SOURCE_TOPIC_COUNT = 39;
export const LESSON_60_PRACTICE_COUNT = PRACTICE_TOTALS_60;
export const LESSON_60_ORIGINAL_TEST_COUNT = ORIGINAL_TEST_60.length;
export const LESSON_60_FINAL_TEST_COUNT = TEST_60.length;
