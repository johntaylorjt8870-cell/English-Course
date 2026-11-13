import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import FinalTest from "../../shared/finalTest";
import {
  ADMIT_DENY62,
  AGREE_DECIDE_THREATEN62,
  ADVISE_ENCOURAGE_PERSUADE62,
  APOLOGIZE_ACCUSE_COMPLAIN62,
  CONVERSION62,
  DEFINITION62,
  DIALOGUE62,
  ERRORS62,
  EXPLAIN_ANNOUNCE_CLAIM62,
  INSIST_CONVINCE62,
  OPENING62,
  PROMISE_REFUSE_OFFER62,
  READING62,
  SUGGEST_RECOMMEND62,
  STRUCTURE_TABLE62,
  STRUCTURES62,
  SUMMARY62,
  WRITING62,
  SPEAKING62,
  WARN_REMIND_INVITE62,
  ORIGINAL_TEST_62,
  ORIGINAL_TEST_SECTIONS_62,
  PRACTICES_62,
  PRACTICE_TOTALS_62,
  TEST_62,
  type PracticeGroup62,
  type OriginalQuestion62,
  type ShiftPair62,
} from "./data";
import { Attempt62, Btn62, Bubble62, ConversionSteps62, Disclosure62, En62, MapTable62, MemoryProvider62, Mixed62, Scene62, ShiftChip62, StructureMatrix62, TransferPair62, VerbCard62, VerbCompare62, type AttemptItem62 } from "./kit62";
import { LABS_62, LabConsole62 } from "./labs62";
import TeacherArea62 from "./TeacherArea62";
import "./lesson62.css";

/* ============================================================
   خريطة الدرس — المحطات والخطوات
   ============================================================ */

type Slide62 = { id: string; station: string; title: string; emblem: string };

const STATIONS_62 = [
  { id: "start", title: "الانطلاق" },
  { id: "foundations", title: "الأساس · الأقسام 1–3" },
  { id: "verbs-ad", title: "Admit / Deny · 4" },
  { id: "verbs-sr", title: "Suggest / Recommend · 5" },
  { id: "verbs-pro", title: "Promise / Refuse / Offer · 6" },
  { id: "verbs-adt", title: "Agree / Decide / Threaten · 7" },
  { id: "verbs-aep", title: "Advise / Encourage / Persuade · 8" },
  { id: "verbs-wri", title: "Warn / Remind / Invite · 9" },
  { id: "verbs-aac", title: "Apologize / Accuse / Complain · 10" },
  { id: "verbs-eac", title: "Explain / Announce / Claim · 11" },
  { id: "verbs-ic", title: "Insist / Convince · 12" },
  { id: "comparison", title: "المقارنة والتركيب · 13–14" },
  { id: "errors", title: "الأخطاء والحوار · 15–16" },
  { id: "reading", title: "القراءة والتدريبات · 17–18" },
  { id: "tests", title: "الاختبارات · 19" },
  { id: "tasks", title: "الإنتاج والملخص · 20–21" },
  { id: "lab", title: "مختبرات استوديو الأفعال" },
  { id: "close", title: "المعلم والخارطة" },
];

const SLIDES_62: Slide62[] = [
  { id: "cover", station: "start", title: "استوديو اختيار الفعل — Reporting Verbs", emblem: "◇" },

  { id: "s1", station: "foundations", title: "1 · المقدمة: من said/told إلى Reporting Verbs", emblem: "01" },
  { id: "s2", station: "foundations", title: "2 · تعريف Reporting Verbs وقائمة الأفعال العشرين", emblem: "02" },
  { id: "s3", station: "foundations", title: "3 · التراكيب الستة الأساسية", emblem: "03" },

  { id: "s4", station: "verbs-ad", title: "4 · Admit و Deny: الاعتراف والإنكار", emblem: "04" },

  { id: "s5", station: "verbs-sr", title: "5 · Suggest و Recommend: الاقتراح والتوصية", emblem: "05" },

  { id: "s6", station: "verbs-pro", title: "6 · Promise و Refuse و Offer: الوعد والرفض والعرض", emblem: "06" },

  { id: "s7", station: "verbs-adt", title: "7 · Agree و Decide و Threaten: الموافقة والقرار والتهديد", emblem: "07" },

  { id: "s8", station: "verbs-aep", title: "8 · Advise و Encourage و Persuade: النصيحة والتشجيع والإقناع", emblem: "08" },

  { id: "s9", station: "verbs-wri", title: "9 · Warn و Remind و Invite: التحذير والتذكير والدعوة", emblem: "09" },

  { id: "s10", station: "verbs-aac", title: "10 · Apologize و Accuse و Complain: الاعتذار والاتهام والشكوى", emblem: "10" },

  { id: "s11", station: "verbs-eac", title: "11 · Explain و Announce و Claim: الشرح والإعلان والادعاء", emblem: "11" },

  { id: "s12", station: "verbs-ic", title: "12 · Insist و Convince: الإصرار والإقناع", emblem: "12" },

  { id: "s13", station: "comparison", title: "13 · المقارنة الشاملة للتراكيب النحوية (جدول 21 فعل)", emblem: "13" },
  { id: "s14", station: "comparison", title: "14 · التحويل التدريجي: من Direct Speech إلى Reporting Verbs", emblem: "14" },

  { id: "s15", station: "errors", title: "15 · الأخطاء الشائعة العشرة وتصحيحها مع الأسباب", emblem: "15" },
  { id: "s16", station: "errors", title: "16 · حوار تطبيقي: A Problem at School", emblem: "16" },

  { id: "s17", station: "reading", title: "17 · قطعة قراءة: A Difficult Decision + أسئلة الفهم", emblem: "17" },

  ...PRACTICES_62.map((group, i) => ({
    id: `p${i + 1}`,
    station: "reading",
    title: `التدريب ${["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن"][i]} · ${group.title}`,
    emblem: String(i + 1),
  })),

  { id: "s18", station: "tests", title: "19 · الاختبار الأصلي — 25 سؤالًا في خمسة أقسام", emblem: "25" },
  { id: "s19", station: "tests", title: "مفتاح الاختبار الأصلي الكامل", emblem: "✓" },
  { id: "final-test", station: "tests", title: "الاختبار النهائي المشترك — 15 سؤالًا", emblem: "▣" },

  { id: "s20", station: "tasks", title: "20 · مهمة الكتابة: Learning from a Mistake", emblem: "20" },
  { id: "s21", station: "tasks", title: "21 · مهمة التحدث والملخص الشامل", emblem: "21" },

  { id: "explorer", station: "lab", title: "مختبر اختيار الفعل المناسب", emblem: "A" },
  { id: "detector", station: "lab", title: "كاشف التراكيب النحوية", emblem: "B" },
  { id: "studio", station: "lab", title: "استوديو التحويل التدريجي", emblem: "C" },
  { id: "similar", station: "lab", title: "مفرّق الأفعال المتشابهة", emblem: "D" },
  { id: "detective", station: "lab", title: "محقق الأخطاء العشرة", emblem: "E" },

  { id: "teacher", station: "close", title: "فضاء المعلم — المفاتيح المحمية", emblem: "T" },
  { id: "progress", station: "close", title: "الخارطة النهائية ومسار الدرس", emblem: "→" },
];

const TEST_STEP_62 = SLIDES_62.findIndex((slide) => slide.id === "final-test");

const GOAL_MARKS = ["①", "②", "③", "④", "⑤", "⑥", "⑦"];
const SPEAKER_NAMES_62 = ["أحمد", "سارة", "علي"];

/* ============================================================
   عناصر صغيرة
   ============================================================ */

const TagList62 = ({ items, ltr = false }: { items: string[]; ltr?: boolean }) => (
  <div className={ltr ? "l62-tags l62-tags--ltr" : "l62-tags"} dir={ltr ? "ltr" : undefined}>
    {items.map((item) => (
      <span key={item}><Mixed62 text={item} /></span>
    ))}
  </div>
);

/* ============================================================
   الغلاف — هوية بصرية مستقلة للدرس 62
   ============================================================ */

function Cover62({ onStart, onTest }: { onStart: () => void; onTest: () => void }) {
  return (
    <div className="l62-cover" data-l62-cover>
      <div className="l62-cover-copy">
        <div className="l62-eyebrow">
          ENGLISH COURSE <span>LESSON 62 · ADVANCED</span>
        </div>
        <h1>
          REPORTING VERBS
          <br />
          <em>THE VERB CHOICE STUDIO</em>
        </h1>
        <h2>أفعال نقل الكلام المتقدمة — دقة الاختيار</h2>
        <p>
          لا تكتفِ بـ said و told و asked. هنا تتعلم اختيار الفعل الذي ينقل القصد بدقة:
          اعتراف، إنكار، وعد، رفض، عرض، نصيحة، تشجيع، إقناع، تحذير، اتهام، اعتذار، إصرار، ادعاء...
        </p>
        <div className="l62-cover-actions">
          <Btn62 variant="bright" onClick={onStart}>
            ابدأ التجربة ↗
          </Btn62>
          <Btn62 variant="ghost" onClick={onTest}>
            الاختبار النهائي · 15 سؤالًا
          </Btn62>
        </div>
        <div className="l62-cover-foot">
          <span>21 قسمًا · 8 تدريبات · 53 بندًا</span>
          <span>اختبار أصلي 25 سؤالًا + نهائي مشترك 15</span>
          <span>5 مختبرات تفاعلية</span>
          <span>مهمة كتابة + تحدث + ملخص</span>
        </div>
      </div>
      <div className="l62-desk" aria-hidden>
        <div className="l62-desk-row">
          <div className="l62-avatar">🗣️</div>
          <div className="l62-mini-bubble l62-mini-bubble--out">"I broke it."</div>
        </div>
        <div className="l62-desk-gates">
          <span className="l62-gate admit">admit<br /><small>+ V-ing</small></span>
          <span className="l62-gate deny">deny<br /><small>+ V-ing</small></span>
          <span className="l62-gate promise">promise<br /><small>+ to</small></span>
          <span className="l62-gate refuse">refuse<br /><small>+ to</small></span>
          <span className="l62-gate suggest">suggest<br /><small>+ V-ing</small></span>
          <span className="l62-gate advise">advise<br /><small>+ obj + to</small></span>
        </div>
        <div className="l62-desk-row">
          <div className="l62-avatar">✍️</div>
          <div className="l62-mini-bubble l62-mini-bubble--in">He admitted breaking it.</div>
        </div>
        <p className="l62-desk-note">القصد: اعتراف → الفعل: admit → التركيب: V-ing → النتيجة: دقة في النقل</p>
      </div>
    </div>
  );
}

/* ============================================================
   الموضوع 1: المقدمة
   ============================================================ */

function Section1() {
  return (
    <Scene62 n="01" kicker="FOUNDATIONS" title={OPENING62.bridge} lead={OPENING62.daily}>
      <h3>أهداف الدرس</h3>
      <div className="l62-lines">
        {OPENING62.goals.map((goal) => (
          <div key={goal}>
            <b className="l62-golden" style={{ marginInlineEnd: "0.4rem" }}>{GOAL_MARKS[OPENING62.goals.indexOf(goal)]}</b>
            <Mixed62 text={goal} />
          </div>
        ))}
      </div>

      <h3>مقارنة: said vs admitted vs denied</h3>
      {OPENING62.compare.map((pair, i) => (
        <TransferPair62 key={pair.direct} pair={pair} index={i + 1} whoDirect={SPEAKER_NAMES_62[i]} whoReported="الراوي ينقل" />
      ))}
      <p className="l62-good">لاحظ: الموضوع واحد (أخذ المال)، لكن فعل النقل يغيّر المعنى تماماً.</p>
    </Scene62>
  );
}

/* ============================================================
   الموضوع 2: تعريف Reporting Verbs وقائمة الأفعال
   ============================================================ */

function Section2() {
  return (
    <Scene62 n="02" kicker="VERBS LIST" title={DEFINITION62.title} lead={DEFINITION62.definition}>
      <h3>العشرون فعلاً للنقل المتقدم</h3>
      <div className="l62-verbs-grid">
        {DEFINITION62.verbs.map((v) => (
          <div key={v.n} className="l62-verb-item">
            <span className="l62-verb-num">{v.n}</span>
            <En62>{v.en}</En62>
            <span className="l62-verb-ar">{v.ar}</span>
          </div>
        ))}
      </div>

      <h3>لماذا نحتاج إلى Reporting Verbs؟</h3>
      {DEFINITION62.why.map((w, i) => (
        <div key={i} className="l62-block">
          <p><b>{w.situation}</b></p>
          <TransferPair62
            pair={{
              direct: w.said,
              directAr: "",
              reported: w.reported,
              reportedAr: w.ar,
            }}
            whoDirect="المتحدث"
            whoReported="الراوي ينقل"
            compact
          />
        </div>
      ))}
    </Scene62>
  );
}

/* ============================================================
   الموضوع 3: التراكيب الستة الأساسية
   ============================================================ */

function Section3() {
  const matrixItems = STRUCTURES62.structures.map((s, i) => ({
    id: `struct-${i + 1}`,
    name: s.name,
    pattern: s.pattern,
    verbs: s.verbs,
    examples: s.examples ?? (s.example ? [s.example] : []),
    color: ["#7c3aed", "#2563eb", "#059669", "#dc2626", "#ea580c", "#db2777"][i],
  }));

  return (
    <Scene62 n="03" kicker="SIX STRUCTURES" title={STRUCTURES62.intro} lead="ستة تراكيب نحوية تحدد ماذا يأتي بعد كل فعل نقل.">
      <StructureMatrix62 items={matrixItems} />

      <h3>ملاحظات مهمة</h3>
      <ul className="l62-notes">
        {STRUCTURES62.structures.map((s) => (
          s.note && <li key={s.name}><Mixed62 text={s.note} /></li>
        ))}
      </ul>
    </Scene62>
  );
}

/* ============================================================
   الموضوع 4: Admit و Deny
   ============================================================ */

function Section4() {
  return (
    <Scene62 n="04" kicker="ADMIT / DENY" title={ADMIT_DENY62.admit.title} lead={ADMIT_DENY62.admit.intro}>
      <h3>التركيب الأول: Admit + V-ing</h3>
      <TransferPair62 pair={ADMIT_DENY62.admit.struct1} whoDirect="المتحدث" whoReported="الراوين ينقل" />
      <p className="l62-warn">{ADMIT_DENY62.admit.struct1.note}</p>

      <h3>التركيب الثاني: Admit + that + sentence</h3>
      <TransferPair62 pair={ADMIT_DENY62.admit.struct2.example} whoDirect="المتحدث" whoReported="الراوي ينقل" />
      <p className="l62-note">{ADMIT_DENY62.admit.struct2.note}</p>

      <h3>أمثلة إضافية على Admit</h3>
      {ADMIT_DENY62.admit.examples.map((ex, i) => (
        <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} whoDirect="" whoReported="مثال" compact />
      ))}

      <h3>Deny = ينكر</h3>
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Deny + V-ing</h4>
          <TransferPair62 pair={ADMIT_DENY62.deny.struct1} whoDirect="المتحدث" whoReported="الراوي" compact />
        </div>
        <div className="l62-block">
          <h4>Deny + that + sentence</h4>
          <TransferPair62 pair={ADMIT_DENY62.deny.struct2.example} whoDirect="المتحدث" whoReported="الراوي" compact />
        </div>
      </div>

      <h3>أمثلة إضافية على Deny</h3>
      {ADMIT_DENY62.deny.examples.map((ex, i) => (
        <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} whoDirect="" whoReported="مثال" compact />
      ))}

      {ADMIT_DENY62.deny.note && <p className="l62-note">{ADMIT_DENY62.deny.note}</p>}

      <h3>مقارنة: Admit vs Deny</h3>
      <MapTable62
        rows={ADMIT_DENY62.comparison.map((c) => ({ direct: c.example, reported: c.ar, note: c.meaning }))}
        head={["الفعل", "مثال", "المعنى"]}
      />
    </Scene62>
  );
}

/* ============================================================
   الموضوع 5: Suggest و Recommend
   ============================================================ */

function Section5() {
  return (
    <Scene62 n="05" kicker="SUGGEST / RECOMMEND" title={SUGGEST_RECOMMEND62.suggest.title} lead={SUGGEST_RECOMMEND62.suggest.intro}>
      <h3>Suggest = يقترح</h3>
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Suggest + V-ing</h4>
          {SUGGEST_RECOMMEND62.suggest.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>
        <div className="l62-block">
          <h4>Suggest + that + should</h4>
          {SUGGEST_RECOMMEND62.suggest.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <p className="l62-note">{SUGGEST_RECOMMEND62.suggest.struct2.note}</p>
        </div>
        <div className="l62-block">
          <h4>Suggest + noun</h4>
          {SUGGEST_RECOMMEND62.suggest.struct3.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>
      </div>

      <div className="l62-block l62-block--bad">
        <h4>✕ خطأ شائع</h4>
        <p><En62 className="l62-wrongtext">{SUGGEST_RECOMMEND62.suggest.error.wrong}</En62></p>
        <p>{SUGGEST_RECOMMEND62.suggest.error.note}</p>
        <h4>✓ الصيغ الصحيحة</h4>
        {SUGGEST_RECOMMEND62.suggest.error.correct.map((c, i) => (
          <p key={i}><En62>{c}</En62></p>
        ))}
      </div>

      <h3>Recommend = يوصي / ينصح</h3>
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Recommend + V-ing</h4>
          {SUGGEST_RECOMMEND62.recommend.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>
        <div className="l62-block">
          <h4>Recommend + that + should</h4>
          {SUGGEST_RECOMMEND62.recommend.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <p className="l62-note">{SUGGEST_RECOMMEND62.recommend.struct2.note}</p>
        </div>
        <div className="l62-block">
          <h4>Recommend + noun / object + to + person</h4>
          {SUGGEST_RECOMMEND62.recommend.struct3.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <TransferPair62 pair={SUGGEST_RECOMMEND62.recommend.struct4.example} whoDirect="" whoReported="مثال" compact />
          <p className="l62-note">{SUGGEST_RECOMMEND62.recommend.struct4.note}</p>
        </div>
      </div>

      <h3>الفرق بين Suggest و Recommend</h3>
      <VerbCompare62
        left={{
          verb: "suggest",
          meaning: "طرح فكرة أو احتمال",
          structure: "suggest + V-ing / that",
          example: SUGGEST_RECOMMEND62.comparison.suggest,
          color: "#7c3aed",
        }}
        right={{
          verb: "recommend",
          meaning: "توصية مبنية على خبرة/رأي",
          structure: "recommend + V-ing / that / object + to + person",
          example: SUGGEST_RECOMMEND62.comparison.recommend,
          color: "#2563eb",
        }}
      />
    </Scene62>
  );
}

/* ============================================================
   الموضوع 6: Promise, Refuse, Offer
   ============================================================ */

function Section6() {
  return (
    <Scene62 n="06" kicker="PROMISE / REFUSE / OFFER" title="الوعد والرفض والعرض" lead="هذه الأفعال الثلاثة مهمة جداً في المحادثات اليومية وتأتي كلها مع to + infinitive.">
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Promise = يعد</h4>
          {PROMISE_REFUSE_OFFER62.promise.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <h4>Promise + that</h4>
          {PROMISE_REFUSE_OFFER62.promise.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <p className="l62-note">{PROMISE_REFUSE_OFFER62.promise.struct2.note}</p>
          <h4>Promise + object + that</h4>
          {PROMISE_REFUSE_OFFER62.promise.struct3.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>

        <div className="l62-block">
          <h4>Refuse = يرفض</h4>
          {PROMISE_REFUSE_OFFER62.refuse.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <h4>في الكلام المنقول</h4>
          {PROMISE_REFUSE_OFFER62.refuse.reported.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: ex.direct, directAr: "", reported: ex.reported, reportedAr: ex.ar }} compact />
          ))}
        </div>

        <div className="l62-block">
          <h4>Offer = يعرض</h4>
          {PROMISE_REFUSE_OFFER62.offer.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <h4>Offer + object + noun</h4>
          {PROMISE_REFUSE_OFFER62.offer.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <h4>مثال شامل</h4>
          <TransferPair62 pair={PROMISE_REFUSE_OFFER62.offer.comprehensive} whoDirect="Tom" whoReported="الراوي" />
        </div>
      </div>

      <h3>مقارنة الثلاثية</h3>
      <MapTable62
        rows={PROMISE_REFUSE_OFFER62.comparison.map((c) => ({ direct: c.en, reported: c.ar, note: c.meaning }))}
        head={["الفعل", "مثال", "المعنى"]}
      />
    </Scene62>
  );
}

/* ============================================================
   الموضوع 7: Agree, Decide, Threaten
   ============================================================ */

function Section7() {
  return (
    <Scene62 n="07" kicker="AGREE / DECIDE / THREATEN" title="الموافقة والقرار والتهديد" lead="ثلاثة أفعال تأتي مع to + infinitive (مع تراكيب إضافية لـ agree و decide).">
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Agree = يوافق</h4>
          {AGREE_DECIDE_THREATEN62.agree.structs.map((s, i) => (
            <div key={i}>
              <h5>{s.name}</h5>
              {s.examples.map((ex, j) => (
                <TransferPair62 key={j} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
              ))}
            </div>
          ))}
        </div>
        <div className="l62-block">
          <h4>Decide = يقرر</h4>
          {AGREE_DECIDE_THREATEN62.decide.structs.map((s, i) => (
            <div key={i}>
              <h5>{s.name}</h5>
              {s.examples.map((ex, j) => (
                <TransferPair62 key={j} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
              ))}
            </div>
          ))}
        </div>
        <div className="l62-block">
          <h4>Threaten = يهدد</h4>
          {AGREE_DECIDE_THREATEN62.threaten.structs.map((s, i) => (
            <div key={i}>
              <h5>{s.name}</h5>
              {s.examples.map((ex, j) => (
                <TransferPair62 key={j} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
              ))}
            </div>
          ))}
          <p className="l62-note">{AGREE_DECIDE_THREATEN62.threaten.note}</p>
        </div>
      </div>
    </Scene62>
  );
}

/* ============================================================
   الموضوع 8: Advise, Encourage, Persuade
   ============================================================ */

function Section8() {
  return (
    <Scene62 n="08" kicker="ADVISE / ENCOURAGE / PERSUADE" title="النصيحة والتشجيع والإقناع" lead="هذه الأفعال تشترك في التركيب: Verb + object + to + infinitive، لكن معانيها مختلفة.">
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Advise = ينصح</h4>
          {ADVISE_ENCOURAGE_PERSUADE62.advise.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <h4>النفي: Advise + object + not to</h4>
          {ADVISE_ENCOURAGE_PERSUADE62.advise.negative.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <h4>Advise + V-ing</h4>
          <TransferPair62 pair={ADVISE_ENCOURAGE_PERSUADE62.advise.struct2.example} compact />
          <p className="l62-note">{ADVISE_ENCOURAGE_PERSUADE62.advise.struct2.note}</p>
        </div>

        <div className="l62-block">
          <h4>Encourage = يشجع</h4>
          {ADVISE_ENCOURAGE_PERSUADE62.encourage.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>

        <div className="l62-block">
          <h4>Persuade = يقنع</h4>
          {ADVISE_ENCOURAGE_PERSUADE62.persuade.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>
      </div>

      <h3>مقارنة الثلاثية</h3>
      <MapTable62
        rows={ADVISE_ENCOURAGE_PERSUADE62.comparison.map((c) => ({ direct: c.en, reported: c.ar, note: c.verb }))}
        head={["الفعل", "مثال", "الترجمة"]}
      />
    </Scene62>
  );
}

/* ============================================================
   الموضوع 9: Warn, Remind, Invite
   ============================================================ */

function Section9() {
  return (
    <Scene62 n="09" kicker="WARN / REMIND / INVITE" title="التحذير والتذكير والدعوة" lead="أفعال تأتي مع تراكيب متنوعة تتضمن حروف جر.">
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Warn = يحذر</h4>
          {WARN_REMIND_INVITE62.warn.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {WARN_REMIND_INVITE62.warn.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {WARN_REMIND_INVITE62.warn.struct3.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>

        <div className="l62-block">
          <h4>Remind = يذكر</h4>
          {WARN_REMIND_INVITE62.remind.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {WARN_REMIND_INVITE62.remind.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {WARN_REMIND_INVITE62.remind.struct3.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {WARN_REMIND_INVITE62.remind.struct4.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>

        <div className="l62-block">
          <h4>Invite = يدعو</h4>
          {WARN_REMIND_INVITE62.invite.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {WARN_REMIND_INVITE62.invite.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>
      </div>
    </Scene62>
  );
}

/* ============================================================
   الموضوع 10: Apologize, Accuse, Complain
   ============================================================ */

function Section10() {
  return (
    <Scene62 n="10" kicker="APOLOGIZE / ACCUSE / COMPLAIN" title="الاعتذار والاتهام والشكوى" lead="أفعال تحتاج إلى حروف جر محددة: for, of, about.">
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Apologize = يعتذر</h4>
          {APOLOGIZE_ACCUSE_COMPLAIN62.apologize.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <p className="l62-note">{APOLOGIZE_ACCUSE_COMPLAIN62.apologize.struct1.note}</p>
          {APOLOGIZE_ACCUSE_COMPLAIN62.apologize.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <h4>في الكلام المنقول</h4>
          <TransferPair62 pair={APOLOGIZE_ACCUSE_COMPLAIN62.apologize.reported} whoDirect="He" whoReported="الراوي" />
        </div>

        <div className="l62-block">
          <h4>Accuse = يتهم</h4>
          <p className="l62-warn">{APOLOGIZE_ACCUSE_COMPLAIN62.accuse.struct.note}</p>
          {APOLOGIZE_ACCUSE_COMPLAIN62.accuse.struct.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <h4>مثال كامل</h4>
          <TransferPair62 pair={APOLOGIZE_ACCUSE_COMPLAIN62.accuse.reported} whoDirect="She" whoReported="الراوي" />
        </div>

        <div className="l62-block">
          <h4>Complain = يشتكي</h4>
          {APOLOGIZE_ACCUSE_COMPLAIN62.complain.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {APOLOGIZE_ACCUSE_COMPLAIN62.complain.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {APOLOGIZE_ACCUSE_COMPLAIN62.complain.struct3.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>
      </div>

      <h3>ملخص حروف الجر</h3>
      <TagList62 ltr items={["apologize for + V-ing", "apologize to someone for + V-ing", "accuse someone of + V-ing", "complain about + noun", "complain that + sentence", "complain to someone about + noun"]} />
    </Scene62>
  );
}

/* ============================================================
   الموضوع 11: Explain, Announce, Claim
   ============================================================ */

function Section11() {
  return (
    <Scene62 n="11" kicker="EXPLAIN / ANNOUNCE / CLAIM" title="الشرح والإعلان والادعاء" lead="أفعال للتواصل الرسمي والمعلومات.">
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Explain = يشرح</h4>
          {EXPLAIN_ANNOUNCE_CLAIM62.explain.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <p className="l62-warn">{EXPLAIN_ANNOUNCE_CLAIM62.explain.struct2.note}</p>
          {EXPLAIN_ANNOUNCE_CLAIM62.explain.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>

        <div className="l62-block">
          <h4>Announce = يعلن</h4>
          {EXPLAIN_ANNOUNCE_CLAIM62.announce.struct.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <TransferPair62 pair={EXPLAIN_ANNOUNCE_CLAIM62.announce.noun.example} compact />
        </div>

        <div className="l62-block">
          <h4>Claim = يدّعي</h4>
          {EXPLAIN_ANNOUNCE_CLAIM62.claim.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {EXPLAIN_ANNOUNCE_CLAIM62.claim.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <p className="l62-note">{EXPLAIN_ANNOUNCE_CLAIM62.claim.struct2.note}</p>
        </div>
      </div>
    </Scene62>
  );
}

/* ============================================================
   الموضوع 12: Insist و Convince
   ============================================================ */

function Section12() {
  return (
    <Scene62 n="12" kicker="INSIST / CONVINCE" title="الإصرار والإقناع" lead="فعلان لهما تراكيب متعددة ودلالات دقيقة.">
      <div className="l62-cols">
        <div className="l62-block">
          <h4>Insist = يصر</h4>
          {INSIST_CONVINCE62.insist.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {INSIST_CONVINCE62.insist.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          <p className="l62-note">{INSIST_CONVINCE62.insist.struct2.note}</p>
        </div>

        <div className="l62-block">
          <h4>Convince = يقنع</h4>
          {INSIST_CONVINCE62.convince.struct1.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
          {INSIST_CONVINCE62.convince.struct2.examples.map((ex, i) => (
            <TransferPair62 key={i} pair={{ direct: "", directAr: "", reported: ex.en, reportedAr: ex.ar }} compact />
          ))}
        </div>
      </div>

      <h3>الفرق بين Persuade و Convince</h3>
      <VerbCompare62
        left={{
          verb: "persuade",
          meaning: "إقناع شخص بأن يفعل شيئاً (فعل)",
          structure: "persuade + object + to + verb",
          example: INSIST_CONVINCE62.comparison.overlap[0],
          color: "#7c3aed",
        }}
        right={{
          verb: "convince",
          meaning: "إقناع شخص بأن شيئاً صحيحاً (حقيقة/معتقد)",
          structure: "convince + object + that / to",
          example: INSIST_CONVINCE62.comparison.overlap[1],
          color: "#2563eb",
        }}
      />
      <p className="l62-note">{INSIST_CONVINCE62.comparison.persuade.ar}</p>
      <p className="l62-note">{INSIST_CONVINCE62.comparison.convince.ar}</p>
    </Scene62>
  );
}

/* ============================================================
   الموضوع 13: المقارنة الشاملة للتراكيب النحوية
   ============================================================ */

function Section13() {
  return (
    <Scene62 n="13" kicker="STRUCTURE TABLE" title={STRUCTURE_TABLE62.title} lead={STRUCTURE_TABLE62.intro}>
      <MapTable62
        rows={STRUCTURE_TABLE62.rows.map((r) => ({ direct: r.verb, reported: r.structure, note: r.example }))}
        head={["الفعل", "التركيب الأساسي", "مثال"]}
      />
      <p className="l62-good">{STRUCTURE_TABLE62.advice}</p>
    </Scene62>
  );
}

/* ============================================================
   الموضوع 14: التحويل التدريجي
   ============================================================ */

function Section14() {
  return (
    <Scene62 n="14" kicker="CONVERSION" title={CONVERSION62.title} lead={CONVERSION62.intro}>
      <h3>الخطوات الثلاث</h3>
      <ol className="l62-steps">
        {CONVERSION62.steps.map((step, i) => (
          <li key={i}><Mixed62 text={step} /></li>
        ))}
      </ol>

      {CONVERSION62.examples.map((ex) => (
        <div key={ex.n} className="l62-block l62-conversion-example">
          <h4>{ex.title}</h4>
          <p><En62>{ex.direct}</En62> <span className="l62-small">{ex.directAr}</span></p>
          <ConversionSteps62 steps={[
            { n: 1, label: ex.step1, detail: ex.step1, color: "#7c3aed" },
            { n: 2, label: ex.step2, detail: ex.step2, color: "#2563eb" },
            { n: 3, label: ex.step3, detail: ex.step3, color: "#059669" },
          ]} />
          <p className="l62-good"><En62>{ex.result}</En62> <span>{ex.resultAr}</span></p>
          {ex.alt && <p className="l62-note">بديل صحيح: <En62>{ex.alt}</En62></p>}
        </div>
      ))}
    </Scene62>
  );
}

/* ============================================================
   الموضوع 15: الأخطاء الشائعة العشرة
   ============================================================ */

function Section15() {
  return (
    <Scene62 n="15" kicker="COMMON ERRORS" title="الأخطاء الشائعة العشرة وتصحيحها" lead="الخطأ ثم التصحيح ثم التفسير — وبعض الأخطاء لها بديل صحيح مقبول.">
      {ERRORS62.map((error) => (
        <div className="l62-error-row" key={error.n}>
          <b className="l62-golden">{error.title}</b>
          <p className="l62-wrongtext" style={{ margin: "0.35rem 0 0" }}>
            ✕ <En62>{error.wrong}</En62>
          </p>
          <p className="l62-righttext" style={{ margin: "0.2rem 0 0" }}>
            ✓ <En62>{error.right}</En62>
          </p>
          {error.alt && (
            <p className="l62-righttext" style={{ margin: "0.2rem 0 0" }}>
              ✓ أو: <En62>{error.alt}</En62>
            </p>
          )}
          <p className="l62-note" style={{ marginTop: "0.4rem" }}>
            <Mixed62 text={error.why} />
          </p>
        </div>
      ))}
    </Scene62>
  );
}

/* ============================================================
   الموضوع 16: حوار تطبيقي
   ============================================================ */

function Section16() {
  return (
    <Scene62 n="16" kicker="DIALOGUE" title={DIALOGUE62.title} lead="حوار بين المعلم وآدم في المدرسة — ثم نسخة منقولة بصيغة الراوي.">
      {DIALOGUE62.direct.map((turn, i) => (
        <div className="l62-block" key={turn.en}>
          <b className="l62-golden" style={{ marginInlineEnd: "0.35rem" }}>{i + 1} ـ</b>
          <Bubble62 variant="direct" who={turn.who} en={turn.en} ar={turn.ar} />
        </div>
      ))}

      <h3>الحوار بالكلام المنقول (باستخدام Reporting Verbs)</h3>
      {DIALOGUE62.reported.map((line, i) => (
        <div className="l62-block" key={i}>
          <b className="l62-golden" style={{ marginInlineEnd: "0.35rem" }}>{i + 1} ـ</b>
          <p><En62>{line.en}</En62></p>
          <p className="l62-small">{line.ar}</p>
        </div>
      ))}

      <h3>ملاحظات على الحوار</h3>
      <ol className="l62-lines">
        {DIALOGUE62.notes.map((note, i) => (
          <li key={i}><Mixed62 text={note} /></li>
        ))}
      </ol>
    </Scene62>
  );
}

/* ============================================================
   الموضوع 17: قطعة قراءة + أسئلة الفهم
   ============================================================ */

function Section17() {
  return (
    <Scene62 n="17" kicker="READING" title={`${READING62.title} — ${READING62.titleAr}`} lead="اقرأ الفقرة الإنجليزية، ولكل فقرة ترجمتها العربية تحتها مباشرة.">
      {READING62.paragraphs.map((paragraph, i) => (
        <div className="l62-block" key={i}>
          <b className="l62-golden">{["الفقرة الأولى", "الفقرة الثانية", "الفقرة الثالثة", "الفقرة الرابعة", "الفقرة الخامسة", "الفقرة السادسة"][i]}</b>
          <p style={{ margin: "0.35rem 0 0" }}><En62>{paragraph.en}</En62></p>
          <p className="l62-small" style={{ margin: "0.45rem 0 0" }}>{paragraph.ar}</p>
        </div>
      ))}

      <div className="l62-block">
        <h3>أسئلة الفهم</h3>
        {READING62.questions.map((qa, i) => (
          <Disclosure62 key={qa.q} summary={<span>{i + 1} ـ <En62>{qa.q}</En62></span>}>
            <p><En62>{qa.a}</En62> <span className="l62-small" style={{ display: "block" }}>{qa.aar}</span></p>
          </Disclosure62>
        ))}
      </div>
    </Scene62>
  );
}

/* ============================================================
   التدريبات الثمانية
   ============================================================ */

function PracticeSection({ group, index }: { group: PracticeGroup62; index: number }) {
  return (
    <Scene62
      n={`EX ${index + 1}`}
      kicker="PRACTICE"
      title={group.title}
      subtitle="اكتب أو اختر، ثم تحقّق — لا يظهر النموذج ولا الشرح قبل التحقق."
    >
      <div className="l62-attempts">
        {group.items.map((item, i) => (
          <Attempt62 key={i} item={item} index={i + 1} accept={item.accept} />
        ))}
      </div>
    </Scene62>
  );
}

/* ============================================================
   الاختبار الأصلي ومفتاحه
   ============================================================ */

function OriginalTestSection62() {
  return (
    <Scene62
      n="19"
      kicker="ORIGINAL TEST"
      title="الاختبار الأصلي — 25 سؤالًا في خمسة أقسام"
      lead="اختبار الدرس كما ورد في المصدر: اختر، حوّل، صحّح، أكمل. اكتب أو اختر إجابتك ثم تحقّق — لا يظهر النموذج والشرح إلا بعد التحقق."
    >
      {ORIGINAL_TEST_SECTIONS_62.map((section, si) => (
        <div className="l62-block" key={section}>
          <h3>{["أ", "ب", "ج", "د", "ه"][si]} · {section}</h3>
          <div className="l62-practice-list">
            {ORIGINAL_TEST_62.filter((item) => item.section === section).map((item) => (
              <Attempt62 key={item.n} item={item} index={item.n} accept={item.alt ? [item.alt] : undefined} />
            ))}
          </div>
        </div>
      ))}
    </Scene62>
  );
}

function OriginalKeySection62() {
  return (
    <Scene62
      n="✓"
      kicker="ORIGINAL KEY"
      title="مفتاح الاختبار الأصلي الكامل — الأسئلة 1 إلى 25"
      lead="الإجابات النموذجية للاختبار الأصلي مع الشرح، وأي صيغة بديلة صحيحة مذكورة داخل الشرح نفسه."
    >
      <ol className="l62-lines" style={{ paddingInlineStart: 0, listStyle: "none" }}>
        {ORIGINAL_TEST_62.map((item) => (
          <li className="l62-block" key={item.n}>
            <b className="l62-golden" style={{ marginInlineEnd: "0.35rem" }}>{item.n} ـ</b>
            <En62 style={{ fontWeight: 700 }}>{item.answer}</En62>
            <p style={{ margin: "0.3rem 0 0" }}><Mixed62 text={item.why} /></p>
            {item.ar && <p className="l62-small" style={{ margin: "0.25rem 0 0" }}>{item.ar}</p>}
          </li>
        ))}
      </ol>
    </Scene62>
  );
}

/* ============================================================
   مهمة الكتابة والتحدث والملخص
   ============================================================ */

function Section20() {
  return (
    <Scene62 n="20" kicker="WRITING" title={WRITING62.title} lead={WRITING62.instruction}>
      <div className="l62-block">
        <h3>الأفعال المطلوبة (10 على الأقل)</h3>
        <div className="l62-tags" dir="ltr">
          {WRITING62.requiredVerbs.map((v) => <span key={v}><En62>{v}</En62></span>)}
        </div>
      </div>
      <Disclosure62 summary="النموذج الكامل — اكشفه بعد أن تحاول الكتابة بنفسك">
        <div className="l62-writing">
          {WRITING62.model.map((paragraph, i) => (
            <div key={i}>
              <p><En62>{paragraph.en}</En62></p>
              <p className="l62-small">{paragraph.ar}</p>
            </div>
          ))}
        </div>
      </Disclosure62>
    </Scene62>
  );
}

function Section21() {
  return (
    <Scene62 n="21" kicker="SPEAKING + SUMMARY" title="مهمة التحدث والملخص الشامل" lead={SPEAKING62.instruction}>
      <div className="l62-block">
        <h3>مواقف للتحدث</h3>
        {SPEAKING62.situations.map((s, i) => (
          <div key={i} className="l62-speaking-item">
            <p><En62>{s.en}</En62></p>
            <p className="l62-small">{s.ar}</p>
          </div>
        ))}
        <p className="l62-note">{SPEAKING62.practice}</p>
      </div>

      <h3 className="l62-subhead">الملخص الشامل — أهم القواعد</h3>
      <div className="l62-summary-grid">
        {SUMMARY62.groups.map((group) => (
          <div key={group.title} className="l62-block">
            <h4>{group.title}</h4>
            <div className="l62-lines">
              {group.items.map((item) => (
                <div key={item.pattern}>
                  <En62 style={{ fontWeight: 700 }}>{item.pattern}</En62>
                  <span style={{ marginInlineStart: "0.4rem" }}><En62>{item.example}</En62></span>
                  <span style={{ display: "block", marginTop: "0.2rem" }}>{item.ar}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Scene62>
  );
}

/* ============================================================
   الخارطة النهائية
   ============================================================ */

function ProgressScene62({ onExit }: { onExit?: () => void }) {
  return (
    <Scene62 n="→" kicker="COURSE PATH" title="من القصد إلى الفعل الدقيق">
      <div className="l62-progress">
        <p className="l62-lead">
          بدأ الدرس بفهم أن كل Reporting Verb يحمل قصداً محدداً: اعتراف، إنكار، وعد، رفض، عرض، نصيحة،
          تشجيع، إقناع، تحذير، تذكير، دعوة، اعتذار، اتهام، شكوى، شرح، إعلان، ادعاء، إصرار، إقناع.
        </p>
        <p className="l62-lead">
          أتقنّا التراكيب الستة، وميّزنا بين الأفعال المتشابهة (admit/deny, suggest/recommend,
          promise/offer/refuse, advise/encourage/persuade, warn/remind, accuse/complain,
          persuade/convince)، وصحّحنا الأخطاء العشرة الشائعة.
        </p>
        <div className="l62-tags" dir="ltr">
          <span><En62>admit/deny + V-ing</En62></span>
          <span><En62>suggest/recommend + V-ing / that</En62></span>
          <span><En62>promise/offer/refuse + to</En62></span>
          <span><En62>advise/encourage/persuade + obj + to</En62></span>
          <span><En62>warn/remind + obj + (not) to</En62></span>
          <span><En62>apologize for / accuse of / complain about</En62></span>
          <span><En62>insist on / convince that</En62></span>
        </div>
        <p><a className="l62-prev-link" href="#/lesson/61">الدرس 61 — Reported Questions & Commands</a></p>
        <p className="l62-endnote">هذا الدرس يكمل منظومة الكلام المنقل: الجمل الخبرية (60) → الأسئلة والأوامر (61) → أفعال النقل الدقيقة (62).</p>
        <div className="l62-actions">
          <Btn62 onClick={() => (window.location.hash = "/lesson/61")}>← الدرس السابق · 61</Btn62>
          <Btn62 onClick={() => (window.location.hash = "/")}>فهرس الدروس</Btn62>
          {onExit && <Btn62 variant="soft" onClick={onExit}>العودة إلى فهرس الدروس</Btn62>}
        </div>
      </div>
    </Scene62>
  );
}

/* ============================================================
   الهيكل الرئيسي
   ============================================================ */

function Body62({
  slide,
  onStart,
  onTest,
  onExit,
}: {
  slide: Slide62;
  onStart: () => void;
  onTest: () => void;
  onExit?: () => void;
}) {
  const id = slide.id;
  if (id === "cover") return <Cover62 onStart={onStart} onTest={onTest} />;
  if (id === "teacher") return <TeacherArea62 />;
  if (id === "progress") return <ProgressScene62 onExit={onExit} />;
  if (id === "s1") return <Section1 />;
  if (id === "s2") return <Section2 />;
  if (id === "s3") return <Section3 />;
  if (id === "s4") return <Section4 />;
  if (id === "s5") return <Section5 />;
  if (id === "s6") return <Section6 />;
  if (id === "s7") return <Section7 />;
  if (id === "s8") return <Section8 />;
  if (id === "s9") return <Section9 />;
  if (id === "s10") return <Section10 />;
  if (id === "s11") return <Section11 />;
  if (id === "s12") return <Section12 />;
  if (id === "s13") return <Section13 />;
  if (id === "s14") return <Section14 />;
  if (id === "s15") return <Section15 />;
  if (id === "s16") return <Section16 />;
  if (id === "s17") return <Section17 />;
  if (/^p\d+$/.test(id)) {
    const index = Number(id.slice(1)) - 1;
    const group = PRACTICES_62[index];
    if (group) return <PracticeSection group={group} index={index} />;
  }
  if (id === "s18") return <OriginalTestSection62 />;
  if (id === "s19") return <OriginalKeySection62 />;
  if (id === "final-test") {
    return (
      <Scene62
        n="15"
        kicker="FINAL TEST"
        title="الاختبار النهائي المشترك — 15 سؤالًا"
        lead="لا تظهر صحّة أي إجابة ولا الدرجة ولا الشرح قبل الضغط على «تصحيح الاختبار». يمكنك تغيير اختياراتك بحرية حتى التسليم."
      >
        <div className="l62-note">
          الاختبار الأصلي ذو الخمسة والعشرين سؤالًا محفوظ كاملًا في محطة «الاختبار الأصلي» ومفتاحها في المحطة التي تليها — فلم يُحذف أي سؤال من المصدر.
        </div>
      </Scene62>
    );
  }
  if (id === "s20") return <Section20 />;
  if (id === "s21") return <Section21 />;
  if (id === "explorer") return <LabConsole62 lab={LABS_62[0]} />;
  if (id === "detector") return <LabConsole62 lab={LABS_62[1]} />;
  if (id === "studio") return <LabConsole62 lab={LABS_62[2]} />;
  if (id === "similar") return <LabConsole62 lab={LABS_62[3]} />;
  if (id === "detective") return <LabConsole62 lab={LABS_62[4]} />;
  return null;
}

export default function Lesson62({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menu, setMenu] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const main = useRef<HTMLElement | null>(null);
  const total = SLIDES_62.length;

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

  const stationLabel = (title: string) => <span className="l62-rail-title"><Mixed62 text={title} /></span>;

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_62.map((station) => ({
        section: stationLabel(station.title),
        items: SLIDES_62.flatMap((slide, index) =>
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

  const slide = SLIDES_62[step];

  return (
    <MemoryProvider62>
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson62"
      rootDir="rtl"
      rootDataLesson={62}
      rootDataShell="verb-choice-studio"
      railAriaLabel="فهرس خطوات الدرس 62"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={<span>الدرس 62 <En62 className="text-sm">· REPORTING VERBS</En62></span>}
      railSubtitle={<span className="l62-rail-meta">{visited.size} / {total} محطة زرتها</span>}
      groups={groups}
      activeIndex={step}
      onSelectStep={go}
      onExit={onExit}
      isMenuOpen={menu}
      onMenuOpenChange={setMenu}
      headerContent={<Mixed62 className="l62-header-title" text={slide.title} />}
      progress={((step + 1) / total) * 100}
      counter={<bdi dir="ltr">{step + 1} / {total}</bdi>}
      counterDir="ltr"
      contentKey={step}
      contentArea={slide.id}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === total - 1}
      mainRef={main}
      mainId="l62-main"
      mainAfter={
        <div hidden={slide.id !== "final-test"} className="lesson-content-container" data-l62-final-test>
          <FinalTest lesson={62} questions={TEST_62} accent="bg-[#4c1d95]" onGoTeacher={() => go(SLIDES_62.findIndex((s) => s.id === "teacher"))} />
        </div>
      }
    >
      <div className="l62-main">
        <Body62 slide={slide} onStart={() => go(1)} onTest={() => go(TEST_STEP_62)} onExit={onExit} />
      </div>
    </Lesson1Shell>
    </MemoryProvider62>
  );
}

export const LESSON_62_SLIDES = SLIDES_62;
export const LESSON_62_STATIONS = STATIONS_62;
export const LESSON_62_STEP_COUNT = SLIDES_62.length;
export const LESSON_62_SOURCE_SECTION_COUNT = 21;
export const LESSON_62_PRACTICE_COUNT = PRACTICE_TOTALS_62;
export const LESSON_62_ORIGINAL_TEST_COUNT = ORIGINAL_TEST_62.length;
export const LESSON_62_FINAL_TEST_COUNT = TEST_62.length;
export const LESSON_62_LAB_COUNT = LABS_62.length;