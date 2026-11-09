import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import FinalTest from "../../shared/finalTest";
import { LatinRuns } from "../../shared/bidi";
import {
  ADVANCED_59,
  BASIC_RULE_59,
  CAUSATIVE_59,
  DIALOGUE_59,
  DIALOGUE_QA_59,
  ERRORS_59,
  MODAL_LESSONS_59,
  OBLIGATION_59,
  OPENING59,
  PERFECT_LESSONS_59,
  PERFECT_RULE_59,
  READING_59,
  REPORT_LADDER_59,
  RULE_TABLE_59,
  SPEAKING_59,
  SUMMARY_59,
  TRANSFORM_DEMOS_59,
  TRANSFORM_STEPS_59,
  WRITING_59,
  type ModalLesson59,
} from "./content59";
import { ORIGINAL_TEST_59, PRACTICES_59 } from "./practice59";
import { TEST_59 } from "./test59";
import {
  AdvancedDrill59,
  CausativeLab59,
  ErrorDetective59,
  MeaningDetective59,
  ModalExplorer59,
  PracticeSet59,
  SlotContrast59,
  StructureBuilder59,
  TimelineLab59,
  TransformEngine59,
  V3Lab59,
} from "./labs59";
import { Attempt59, Btn59, Disclosure59, En59, Formula59, Mixed59, Scene59, VoicePair59 } from "./kit59";
import TeacherArea59 from "./TeacherArea59";
import "./lesson59.css";

/* ============================================================
   خريطة الدرس — المحطات والخطوات
   ============================================================ */

type Slide59 = { id: string; station: string; title: string; emblem: string };

const STATIONS_59 = [
  { id: "start", title: "الانطلاق" },
  { id: "control", title: "غرفة التحكّم · الأقسام 1–6" },
  { id: "obligation", title: "الالتزام · الأقسام 7–8" },
  { id: "perfect", title: "الماضي · الأقسام 9–13" },
  { id: "advanced", title: "التراكيب المتقدّمة · 14–19" },
  { id: "transform", title: "التحويل والأخطاء والحوار · 20–29" },
  { id: "practice", title: "التدريبات التسعة" },
  { id: "test", title: "الاختبارات" },
  { id: "tasks", title: "الكتابة والتحدث والملخص" },
  { id: "lab", title: "مختبرات تفاعلية" },
  { id: "close", title: "المعلم والختام" },
];

const SLIDES_59: Slide59[] = [
  { id: "cover", station: "start", title: "غرفة التحكّم", emblem: "◈" },

  // القسم الأول (1) + القسم الأول (2–6)
  { id: "s1", station: "control", title: "١ · القاعدة الأساسية: Modal + be + V3", emblem: "01" },
  { id: "s2", station: "control", title: "٢ · CAN — القدرة والإمكانية والسماح", emblem: "02" },
  { id: "s3", station: "control", title: "٣ · COULD — الإمكانية والاحتمال", emblem: "03" },
  { id: "s4", station: "control", title: "٤ · MUST — الضرورة والمنع", emblem: "04" },
  { id: "s5", station: "control", title: "٥ · SHOULD — النصيحة والتوصية", emblem: "05" },
  { id: "s6", station: "control", title: "٦ · MAY وMIGHT — الاحتمال", emblem: "06" },

  // القسم الثاني (7–8)
  { id: "s7", station: "obligation", title: "٧ · HAVE TO / HAS TO + be + V3", emblem: "07" },
  { id: "s8", station: "obligation", title: "٨ · OUGHT TO + be + V3", emblem: "08" },

  // القسم الثالث (9–13)
  { id: "s9", station: "perfect", title: "٩ · قاعدة Modal Perfect Passive", emblem: "09" },
  { id: "s10", station: "perfect", title: "١٠ · SHOULD HAVE BEEN + V3", emblem: "10" },
  { id: "s11", station: "perfect", title: "١١ · COULD HAVE BEEN + V3", emblem: "11" },
  { id: "s12", station: "perfect", title: "١٢ · MUST HAVE BEEN + V3", emblem: "12" },
  { id: "s13", station: "perfect", title: "١٣ · MAY / MIGHT HAVE BEEN + V3", emblem: "13" },

  // القسم الرابع (14–17)
  { id: "s14", station: "advanced", title: "١٤ · NEEDS TO BE + V3", emblem: "14" },
  { id: "s15", station: "advanced", title: "١٥ · BE SUPPOSED TO BE + V3", emblem: "15" },
  { id: "s16", station: "advanced", title: "١٦ · BE EXPECTED TO BE + V3", emblem: "16" },
  { id: "s17", station: "advanced", title: "١٧ · HAVE / GET SOMETHING DONE", emblem: "17" },

  // القسم الخامس (18–19)
  { id: "s18", station: "advanced", title: "١٨ · جدول القواعد الأساسية", emblem: "18" },
  { id: "s19", station: "advanced", title: "١٩ · الفروق على جملة واحدة: The report …", emblem: "19" },

  // القسم السادس (20) · السابع (21–27) · الثامن (28) · التاسع (29)
  { id: "s20", station: "transform", title: "٢٠ · خطوات التحويل المتقدّم", emblem: "20" },
  { id: "s21", station: "transform", title: "٢١–٢٧ · الأخطاء السبعة", emblem: "27" },
  { id: "s22", station: "transform", title: "٢٨ · حوار: At the Office", emblem: "28" },
  { id: "s23", station: "transform", title: "٢٩ · قراءة: Modern Technology and Safety", emblem: "29" },

  // القسم العاشر
  ...PRACTICES_59.map((group, i) => ({
    id: `p${i + 1}`,
    station: "practice",
    title: `التدريب ${i + 1} · ${group.title.replace(/^التدريب \S+[:：]?\s*/, "")}`,
    emblem: String(i + 1),
  })),

  // الاختبارات
  { id: "s24", station: "test", title: "٣٠ · الاختبار الأصلي (٢٥ سؤالًا)", emblem: "25" },
  { id: "s25", station: "test", title: "مفتاح الاختبار الأصلي الكامل", emblem: "✓" },
  { id: "final-test", station: "test", title: "Final Test · 15 سؤالًا", emblem: "▣" },
  { id: "s26", station: "test", title: "مراجعة الأسئلة الأصلية العشرة الأخرى", emblem: "10" },

  // القسم الحادي عشر
  { id: "s27", station: "tasks", title: "٣١ · مهمة الكتابة: Rules for a Safe School", emblem: "31" },
  { id: "s28", station: "tasks", title: "٣٢ · مهمة التحدث: إدارة المصنع", emblem: "32" },
  { id: "s29", station: "tasks", title: "٣٣ · الملخص النهائي والقاعدة الذهبية", emblem: "33" },

  // مختبرات تفاعلية
  { id: "explorer", station: "lab", title: "Modal Meaning Explorer", emblem: "A" },
  { id: "builder", station: "lab", title: "Grammar Structure Builder", emblem: "B" },
  { id: "timeline", station: "lab", title: "Modal Perfect Timeline", emblem: "C" },
  { id: "detective", station: "lab", title: "Meaning Detective", emblem: "D" },
  { id: "engine", station: "lab", title: "Transformation Engine", emblem: "E" },
  { id: "causative", station: "lab", title: "Causative Lab", emblem: "F" },
  { id: "errors", station: "lab", title: "Error Detection · 7 أخطاء", emblem: "G" },
  { id: "contrast", station: "lab", title: "Structure Contrast", emblem: "H" },
  { id: "drill", station: "lab", title: "Advanced Structures Drill", emblem: "I" },
  { id: "v3", station: "lab", title: "V3 Check", emblem: "J" },

  { id: "teacher", station: "close", title: "فضاء المعلم", emblem: "T" },
  { id: "progress", station: "close", title: "الختام ومسار الدرس", emblem: "→" },
];

const TEST_STEP_59 = SLIDES_59.findIndex((slide) => slide.id === "final-test");

/* ============================================================
   عناصر صغيرة
   ============================================================ */

const TagList59 = ({ items }: { items: string[] }) => (
  <div className="l59-tags">
    {items.map((item) => (
      <span key={item}>
        <En59>{item}</En59>
      </span>
    ))}
  </div>
);

function ModalSection59({ lesson }: { lesson: ModalLesson59 }) {
  const [usage, setUsage] = useState(0);
  return (
    <Scene59
      n={String(lesson.n)}
      kicker="MODAL CONTROL"
      title={lesson.arName}
      en={`${lesson.modal} + be + V3`}
      lead={lesson.use}
    >
      <Formula59
        parts={[
          { kind: "modal", text: lesson.modal.toLowerCase().replace(" / ", " / ") },
          { kind: "be", text: "be" },
          { kind: "v3", text: "V3" },
        ]}
        tail="."
      />

      {lesson.usages && lesson.usages.length > 0 && (
        <div className="l59-usage">
          <div className="l59-usage-tabs" role="tablist" aria-label={`استخدامات ${lesson.modal}`}>
            {lesson.usages.map((item, i) => (
              <button key={item.label} type="button" role="tab" aria-pressed={i === usage} onClick={() => setUsage(i)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="l59-usage-body" role="status" aria-live="polite">
            <h4>{lesson.usages[usage].label}</h4>
            <p className="l59-small">{lesson.usages[usage].note}</p>
            <div className="l59-lines">
              {lesson.usages[usage].examples.map((line) => (
                <div key={line.en}>
                  <En59>{line.en}</En59>
                  <span style={{ display: "block" }}>{line.ar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {lesson.pairs.length > 0 && (
        <div className="l59-pairs">
          {lesson.pairs.map((pair, i) => (
            <VoicePair59 key={pair.active} index={i + 1} {...pair} />
          ))}
        </div>
      )}

      <div className="l59-cols">
        <div className="l59-block l59-block--neg">
          <h3>النفي</h3>
          <Formula59 parts={[{ kind: "modal", text: lesson.negative.formula }]} />
          {lesson.negative.note && <p className="l59-warn">{lesson.negative.note}</p>}
          <div className="l59-lines">
            {lesson.negative.examples.map((line) => (
              <div key={line.en}>
                <En59>{line.en}</En59>
                <span style={{ display: "block" }}>{line.ar}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="l59-block l59-block--q">
          <h3>السؤال</h3>
          <Formula59 parts={[{ kind: "extra", text: lesson.question.formula }]} />
          {lesson.question.note && <p className="l59-small">{lesson.question.note}</p>}
          <div className="l59-lines">
            {lesson.question.examples.map((line) => (
              <div key={line.en}>
                <En59>{line.en}</En59>
                <span style={{ display: "block" }}>{line.ar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lesson.compare && (
        <div className="l59-block">
          <h3>{lesson.compare.title}</h3>
          <div className="l59-lines">
            {lesson.compare.rows.map((row) => (
              <div key={row.en}>
                <En59>{row.en}</En59> — {row.ar}
              </div>
            ))}
          </div>
          {lesson.compare.note && <p className="l59-note">{lesson.compare.note}</p>}
        </div>
      )}

      {lesson.warning && <p className="l59-warn">{lesson.warning}</p>}
    </Scene59>
  );
}

/* ============================================================
   محتوى كل خطوة
   ============================================================ */

function Cover59({ onStart, onTest }: { onStart: () => void; onTest: () => void }) {
  return (
    <div className="l59-cover" data-l59-cover>
      <div className="l59-cover-copy">
        <div className="l59-eyebrow">
          ENGLISH COURSE <span>LESSON 59 / 120</span> · ADVANCED
        </div>
        <h1>
          ADVANCED PASSIVE
          <br />
          <em>CONTROL ROOM</em>
        </h1>
        <h2>المبني للمجهول المتقدّم مع الأفعال الناقصة والتراكيب المتقدّمة</h2>
        <p>
          ثمانية أفعال ناقصة، وخمسة تراكيب متقدّمة، وفارق واحد يغيّر كل شيء: <En59>be</En59> للحاضر و
          <En59>have been</En59> للماضي.
        </p>
        <div className="l59-cover-path" aria-hidden>
          <div>
            <small>SUBJECT</small>
            <En59>The report</En59>
          </div>
          <div>
            <small>MODAL</small>
            <En59>must</En59>
          </div>
          <div>
            <small>BE / HAVE BEEN</small>
            <En59>have been</En59>
          </div>
          <div>
            <small>V3</small>
            <En59>completed</En59>
          </div>
        </div>
        <div className="l59-cover-actions">
          <Btn59 variant="bright" onClick={onStart}>
            ابدأ التجربة ↗
          </Btn59>
          <Btn59 variant="ghost" onClick={onTest}>
            الاختبار النهائي · 15 سؤالًا
          </Btn59>
        </div>
        <div className="l59-cover-foot">
          <span>11 قسمًا · 33 موضوعًا</span>
          <span>9 تدريبات · 76 سؤالًا</span>
          <span>اختبار أصلي 25 سؤالًا</span>
          <span>10 مختبرات تفاعلية</span>
        </div>
      </div>
      <div className="l59-console" aria-hidden>
        <div className="l59-console-dial">
          <span>CAN</span>
          <span>MUST</span>
          <span>SHOULD</span>
          <span>MAY</span>
          <b>
            be
            <br />
            + V3
          </b>
        </div>
        <div className="l59-console-rack">
          {["could", "may", "might", "have to", "ought to", "should have been", "must have been", "needs to be", "is expected to be"].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <Scene59
      n="01"
      kicker="BASE RULE"
      title="القاعدة الأساسية"
      en="Modal Verb + be + V3"
      subtitle="الفعل الناقص + be + التصريف الثالث للفعل الأساسي."
      lead={BASIC_RULE_59.stableBe}
    >
      <Formula59
        parts={[
          { kind: "modal", text: "Modal" },
          { kind: "be", text: "be" },
          { kind: "v3", text: "V3" },
        ]}
        tail="."
      />
      <div className="l59-cols">
        <div className="l59-block l59-block--neg">
          <h3>✕ لا نقول</h3>
          <div className="l59-tags">
            {BASIC_RULE_59.wrong.map((item) => (
              <span key={item} className="is-bad">
                <En59>{item}</En59>
              </span>
            ))}
          </div>
        </div>
        <div className="l59-block" style={{ borderColor: "#b7e3cb", background: "#eaf8f1" }}>
          <h3>✓ نقول</h3>
          <div className="l59-tags">
            {BASIC_RULE_59.correct.map((item) => (
              <span key={item} className="is-good">
                <En59>{item}</En59>
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="l59-note">{BASIC_RULE_59.why}</p>
      <h3 style={{ fontSize: "1.05rem" }}>أمثلة أولية</h3>
      <div className="l59-pairs">
        {BASIC_RULE_59.pairs.map((pair, i) => (
          <VoicePair59 key={pair.active} index={i + 1} {...pair} />
        ))}
      </div>
      <p className="l59-good">{BASIC_RULE_59.note}</p>
    </Scene59>
  );
}

function Section9() {
  return (
    <Scene59 n="09" kicker="MODAL PERFECT PASSIVE" title="قاعدة Modal Perfect Passive" lead={PERFECT_RULE_59.bridge} console>
      <Formula59
        parts={[
          { kind: "modal", text: "Modal" },
          { kind: "past", text: "have been" },
          { kind: "v3", text: "V3" },
        ]}
        tail="."
      />
      <div className="l59-cols">
        <div className="l59-block">
          <small className="l59-kicker">{PERFECT_RULE_59.present.label}</small>
          <En59 style={{ fontWeight: 700, fontSize: "1.1rem" }}>{PERFECT_RULE_59.present.form}</En59>
          <span>{PERFECT_RULE_59.present.ar}</span>
        </div>
        <div className="l59-block">
          <small className="l59-kicker">{PERFECT_RULE_59.past.label}</small>
          <En59 style={{ fontWeight: 700, fontSize: "1.1rem" }}>{PERFECT_RULE_59.past.form}</En59>
          <span>{PERFECT_RULE_59.past.ar}</span>
        </div>
      </div>
      <p className="l59-note">{PERFECT_RULE_59.why}</p>
    </Scene59>
  );
}

function obligationSection(id: string) {
  const data = OBLIGATION_59.find((item) => item.id === id);
  if (!data) return null;
  return (
    <Scene59
      n={String(data.n).padStart(2, "0")}
      kicker="OBLIGATION"
      title={data.arName}
      en={data.formula}
      lead={data.intro}
    >
      <div className="l59-pairs">
        {data.pairs.map((pair, i) => (
          <VoicePair59 key={pair.active} index={i + 1} {...pair} />
        ))}
      </div>
      {data.agreement && (
        <div className="l59-block">
          <h3>{data.agreement.title}</h3>
          <div className="l59-lines">
            {data.agreement.rows.map((row) => (
              <div key={row.en}>
                <En59>{row.en}</En59> — {row.ar}
              </div>
            ))}
          </div>
          <p className="l59-small">{data.agreement.note}</p>
        </div>
      )}
      <div className="l59-cols">
        <div className="l59-block l59-block--neg">
          <h3>النفي</h3>
          <En59 style={{ fontWeight: 700 }}>{data.negative.formula}</En59>
          {data.negative.note && <p className="l59-warn">{data.negative.note}</p>}
          <div className="l59-lines">
            {data.negative.examples.map((line) => (
              <div key={line.en}>
                <En59>{line.en}</En59>
                <span style={{ display: "block" }}>{line.ar}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="l59-block l59-block--q">
          <h3>السؤال</h3>
          <En59 style={{ fontWeight: 700 }}>{data.question.formula}</En59>
          {data.question.note && <p className="l59-small">{data.question.note}</p>}
          <div className="l59-lines">
            {data.question.examples.map((line) => (
              <div key={line.en}>
                <En59>{line.en}</En59>
                <span style={{ display: "block" }}>{line.ar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {data.warning && <p className="l59-warn">{data.warning}</p>}
    </Scene59>
  );
}

function PerfectSection({ id }: { id: string }) {
  const data = PERFECT_LESSONS_59.find((item) => item.id === id);
  if (!data) return null;
  return (
    <Scene59
      n={String(data.n).padStart(2, "0")}
      kicker="PAST MEANING"
      title={data.arName}
      en={data.formula}
      lead={data.use}
      console
    >
      <div className="l59-timebar" aria-hidden>
        <span>NOW</span>
        <i />
        <span>PAST</span>
      </div>
      {data.pairs && data.pairs.length > 0 && (
        <div className="l59-pairs">
          {data.pairs.map((pair, i) => (
            <VoicePair59 key={pair.active} index={i + 1} {...pair} />
          ))}
        </div>
      )}
      {data.lines && data.lines.length > 0 && (
        <div className="l59-pairs">
          {data.lines.map((line, i) => (
            <article className="l59-pair" key={line.en}>
              <div className="l59-pair-top">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <small>PASSIVE · PAST</small>
              </div>
              <En59 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{line.en}</En59>
              <p>{line.ar}</p>
            </article>
          ))}
        </div>
      )}
      {data.contrast && (
        <div className="l59-block">
          <h3>{data.contrast.title}</h3>
          <div className="l59-timeline">
            {data.contrast.rows.map((row) => (
              <div className="l59-timeline-row" key={row.en}>
                <div>
                  <En59 style={{ fontWeight: 700 }}>{row.en}</En59>
                  <small style={{ display: "block" }}>{row.ar}</small>
                </div>
                <div>
                  <span className={`l59-pill ${row.tag === "PAST" || row.tag === "DEDUCTION" ? "l59-pill--past" : "l59-pill--now"}`}>
                    {row.tag ?? ""}
                  </span>
                  <small style={{ display: "block" }}>{row.note}</small>
                </div>
                <div />
              </div>
            ))}
          </div>
          {data.contrast.note && <p className="l59-note">{data.contrast.note}</p>}
        </div>
      )}
      <div className="l59-cols">
        <div className="l59-block l59-block--neg">
          <h3>النفي</h3>
          <En59 style={{ fontWeight: 700 }}>{data.negative.formula}</En59>
          {data.negative.note && <p className="l59-warn">{data.negative.note}</p>}
          <div className="l59-lines">
            {data.negative.examples.map((line) => (
              <div key={line.en}>
                <En59>{line.en}</En59>
                <span style={{ display: "block" }}>{line.ar}</span>
              </div>
            ))}
          </div>
        </div>
        {data.question && (
          <div className="l59-block l59-block--q">
            <h3>السؤال</h3>
            <En59 style={{ fontWeight: 700 }}>{data.question.formula}</En59>
            {data.question.note && <p className="l59-small">{data.question.note}</p>}
            <div className="l59-lines">
              {data.question.examples.map((line) => (
                <div key={line.en}>
                  <En59>{line.en}</En59>
                  <span style={{ display: "block" }}>{line.ar}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Scene59>
  );
}

function AdvancedSection({ id }: { id: string }) {
  const data = ADVANCED_59.find((item) => item.id === id);
  if (!data) return null;
  return (
    <Scene59
      n={String(data.n)}
      kicker={`ADVANCED STRUCTURE · ${data.title}`}
      title={data.arName}
      en={data.formula}
      lead={data.intro}
    >
      <div className="l59-lines">
        {(data.lines ?? []).map((line) => (
          <div key={line.en}>
            <En59 style={{ fontWeight: 700 }}>{line.en}</En59>
            <span style={{ display: "block" }}>{line.ar}</span>
          </div>
        ))}
      </div>
      {data.contrast && (
        <div className="l59-block">
          <h3>{data.contrast.title}</h3>
          <div className="l59-timeline">
            {data.contrast.rows.map((row) => (
              <div className="l59-timeline-row" key={row.en}>
                <div>
                  <En59 style={{ fontWeight: 700 }}>{row.en}</En59>
                  <small style={{ display: "block" }}>{row.ar}</small>
                </div>
                <div>
                  <span className="l59-pill l59-pill--mean">{row.tag ?? ""}</span>
                  <small style={{ display: "block" }}>{row.note}</small>
                </div>
                <div />
              </div>
            ))}
          </div>
          {data.contrast.note && <p className="l59-note">{data.contrast.note}</p>}
        </div>
      )}
      <div className="l59-cols">
        {data.negative && (
          <div className="l59-block l59-block--neg">
            <h3>النفي</h3>
            <En59 style={{ fontWeight: 700 }}>{data.negative.formula}</En59>
            <div className="l59-lines">
              {data.negative.examples.map((line) => (
                <div key={line.en}>
                  <En59>{line.en}</En59>
                  <span style={{ display: "block" }}>{line.ar}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.question && (
          <div className="l59-block l59-block--q">
            <h3>السؤال</h3>
            <En59 style={{ fontWeight: 700 }}>{data.question.formula}</En59>
            <div className="l59-lines">
              {data.question.examples.map((line) => (
                <div key={line.en}>
                  <En59>{line.en}</En59>
                  <span style={{ display: "block" }}>{line.ar}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {data.note && <p className="l59-good">{data.note}</p>}
    </Scene59>
  );
}

function CausativeSection() {
  return (
    <Scene59
      n="17"
      kicker="CAUSATIVE"
      title="رتّب أن يفعلها غيرك — Causative"
      en={CAUSATIVE_59.formula}
      subtitle={CAUSATIVE_59.title}
      lead={CAUSATIVE_59.ar}
    >
      <div className="l59-lines">
        {CAUSATIVE_59.lines.map((line) => (
          <div key={line.en}>
            <En59 style={{ fontWeight: 700 }}>{line.en}</En59>
            <span style={{ display: "block" }}>{line.ar}</span>
          </div>
        ))}
      </div>
      <div className="l59-block">
        <h3>{CAUSATIVE_59.contrast.title}</h3>
        <div className="l59-timeline">
          {CAUSATIVE_59.contrast.rows.map((row) => (
            <div className="l59-timeline-row" key={row.en}>
              <div>
                <En59 style={{ fontWeight: 700 }}>{row.en}</En59>
                <small style={{ display: "block" }}>{row.ar}</small>
              </div>
              <div>
                <span className="l59-pill l59-pill--mean">{row.tag ?? ""}</span>
                <small style={{ display: "block" }}>{row.note}</small>
              </div>
              <div />
            </div>
          ))}
        </div>
        <p className="l59-note">{CAUSATIVE_59.contrast.note}</p>
      </div>
      <h3 style={{ fontSize: "1.05rem" }}>أمثلة إضافية</h3>
      <div className="l59-lines">
        {CAUSATIVE_59.extra.map((line) => (
          <div key={line.en}>
            <En59 style={{ fontWeight: 700 }}>{line.en}</En59>
            <span style={{ display: "block" }}>{line.ar}</span>
          </div>
        ))}
      </div>
      <p className="l59-good">{CAUSATIVE_59.note}</p>
    </Scene59>
  );
}

function RuleTableSection() {
  return (
    <Scene59 n="18" kicker="MASTER TABLE" title="جدول القواعد الأساسية" subtitle="خمسة عشر تركيبًا — المعنى أولًا، ثم الصيغة، ثم المثال.">
      <div className="l59-table">
        <div className="l59-table-head">
          <span>المعنى</span>
          <span>التركيب</span>
          <span>المثال</span>
        </div>
        {RULE_TABLE_59.map((row) => (
          <div className="l59-table-row" key={row.form}>
            <span>{row.meaning}</span>
            <span className="l59-formula" dir="ltr">
              <En59>{row.form}</En59>
            </span>
            <En59>{row.example}</En59>
          </div>
        ))}
      </div>
    </Scene59>
  );
}

function ReportLadderSection() {
  return (
    <Scene59
      n="19"
      kicker="MEANING SPECTRUM"
      title="الفروق على جملة واحدة"
      en="The report …"
      subtitle="نفس الجملة، سبعة تراكيب، سبعة معانٍ."
      lead="لأن تغيير الفعل الناقص وحده يمكن أن يغيّر معنى الجملة بالكامل."
    >
      <div className="l59-ladder">
        {REPORT_LADDER_59.map((row, i) => (
          <div
            className="l59-ladder-row"
            key={row.en}
            style={{ ["--tone" as string]: row.tone.includes("past") || row.tone === "deduction" ? "#c99a2e" : "#16a8bd" }}
          >
            <i>{String(i + 1).padStart(2, "0")}</i>
            <En59 style={{ fontWeight: 700 }}>{row.en}</En59>
            <small>
              {row.ar} · {row.label}
            </small>
          </div>
        ))}
      </div>
    </Scene59>
  );
}

function TransformSection() {
  const [demo, setDemo] = useState(0);
  const task = TRANSFORM_DEMOS_59[demo];
  const [stage, setStage] = useState(0);
  return (
    <Scene59
      n="20"
      kicker="TRANSFORMATION"
      title="خطوات التحويل المتقدّم"
      subtitle="ثماني خطوات ثابتة، ونفس الترتيب في كل جملة."
    >
      <div className="l59-lines">
        {TRANSFORM_STEPS_59.map((step, i) => (
          <div key={step}>
            <b style={{ marginInlineEnd: "0.4rem" }}>{i + 1}.</b>
            {step}
          </div>
        ))}
      </div>

      <div className="l59-block">
        <div className="l59-engine-nav" role="group" aria-label="أمثلة التحويل">
          {TRANSFORM_DEMOS_59.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={i === demo}
              onClick={() => {
                setDemo(i);
                setStage(0);
              }}
            >
              <En59>{item.modal}</En59> · {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <small className="l59-tagline">ACTIVE SENTENCE</small>
        <En59 style={{ fontWeight: 700, fontSize: "1.05rem" }}>{task.active}</En59>
        <p className="l59-small">{task.activeAr}</p>
        <div className="l59-tags">
          <span>
            الفاعل: <En59>{task.subject}</En59>
          </span>
          <span>
            الفعل الناقص: <En59>{task.modal}</En59>
          </span>
          <span>
            الفعل الأساسي: <En59>{task.base}</En59>
          </span>
          <span>
            المفعول به: <En59>{task.object}</En59>
          </span>
        </div>
        <div className="l59-engine-stages">
          {task.stages.slice(0, stage).map((row, i) => (
            <div className={`l59-engine-stage${i === stage - 1 ? " is-latest" : ""}`} key={row.label}>
              <i>{i + 1}</i>
              <div>
                <En59>{row.value}</En59>
                <small>{row.label}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="l59-actions">
          <Btn59 onClick={() => setStage((s) => Math.min(task.stages.length, s + 1))} disabled={stage >= task.stages.length}>
            {stage === 0 ? "ابدأ" : "الخطوة التالية →"}
          </Btn59>
          <Btn59 variant="soft" onClick={() => setStage(0)} disabled={stage === 0}>
            ↺ من البداية
          </Btn59>
        </div>
        {stage >= task.stages.length && (
          <div className="l59-lab-result is-right" role="status">
            <b>✓ النتيجة</b>
            <En59 style={{ fontWeight: 700 }}>{task.passive}</En59>
            <span>{task.passiveAr}</span>
            <span>{task.why}</span>
          </div>
        )}
      </div>
    </Scene59>
  );
}

function ErrorsSection() {
  return (
    <Scene59
      n="21–27"
      kicker="COMMON MISTAKES"
      title="الأخطاء السبعة"
      subtitle="كل خطأ يقابله تصحيح وسبب واضح."
      lead="هذه الأخطاء السبعة هي التي تفصل بين تركيب مقبول وتركيب مكسور. اقرأها أولًا، ثم جرّب كاشف الأخطاء التفاعلي في محطة الأخطاء."
    >
      <div className="l59-error-list">
        {ERRORS_59.map((error) => (
          <div className="l59-error-row" key={error.n}>
            <small style={{ font: "700 0.62rem L59Latin, sans-serif", letterSpacing: "0.1em", color: "#94a6bc" }}>
              MISTAKE {String(error.n - 20).padStart(2, "0")}
            </small>
            <b style={{ fontSize: "0.98rem", color: "#16283e" }}>{error.title}</b>
            <En59 className="l59-wrongtext">{error.wrong}</En59>
            <En59 className="l59-righttext">{error.right}</En59>
            <small>{error.why}</small>
          </div>
        ))}
      </div>
    </Scene59>
  );
}

function DialogueSection() {
  return (
    <Scene59 n="28" kicker="DIALOGUE" title="في المكتب — At the Office" en="DIALOGUE · AT THE OFFICE" subtitle="حوار تطبيقي على تراكيب الدرس داخل بيئة عمل واحدة.">
      <div className="l59-dialogue">
        {DIALOGUE_59.map((line, i) => (
          <div className={`l59-line${line.who === "Assistant" ? " is-right" : ""}`} key={`${line.en}-${i}`}>
            <b>{line.who}</b>
            <div>
              <En59 style={{ fontWeight: 700 }}>{line.en}</En59>
              <p>{line.ar}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: "1.05rem" }}>أسئلة الحوار وإجاباتها</h3>
      <div className="l59-practice-list">
        {DIALOGUE_QA_59.map((item, i) => (
          <Attempt59
            key={item.q}
            index={i + 1}
            item={{ prompt: item.q, answer: item.a, why: "الإجابة مستندة إلى الحوار أعلاه.", ar: item.ar }}
          />
        ))}
      </div>
    </Scene59>
  );
}

function ReadingSection() {
  return (
    <Scene59 n="29" kicker="READING" title="Modern Technology and Safety" subtitle="التكنولوجيا الحديثة والسلامة">
      <div className="l59-article">
        <div className="l59-article-head">
          <small style={{ font: "700 0.66rem L59Latin, sans-serif", letterSpacing: "0.12em", color: "#8fd0de" }}>
            FACTORY SAFETY FILE
          </small>
          <h2>{READING_59.title}</h2>
          <p>{READING_59.titleAr}</p>
        </div>
        <div className="l59-article-body">
          {READING_59.paragraphs.map((paragraph, i) => (
            <p key={i}>
              <En59>{paragraph}</En59>
            </p>
          ))}
        </div>
        <div className="l59-gloss">
          {READING_59.gloss.map((item) => (
            <span key={item.en}>
              <En59>{item.en}</En59> = {item.ar}
            </span>
          ))}
        </div>
        <Disclosure59 summary="افتح الترجمة العربية الكاملة">
          {READING_59.translation.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Disclosure59>
      </div>
      <h3 style={{ fontSize: "1.05rem" }}>أسئلة الفهم والإجابات</h3>
      <div className="l59-practice-list">
        {READING_59.qa.map((item, i) => (
          <Attempt59 key={item.q} index={i + 1} item={{ prompt: item.q, answer: item.a, why: item.ar }} />
        ))}
      </div>
    </Scene59>
  );
}

function WritingSection() {
  return (
    <Scene59
      n="31"
      kicker="WRITING TASK"
      title={WRITING_59.titleAr}
      en={WRITING_59.title}
      lead={WRITING_59.instruction}
    >
      <div className="l59-tags">
        {WRITING_59.structures.map((item) => (
          <span key={item}>
            <En59>{item}</En59>
          </span>
        ))}
      </div>
      <div className="l59-model">
        <h3>{WRITING_59.title}</h3>
        {WRITING_59.model.map((line) => (
          <En59 key={line} style={{ fontWeight: 700, display: "block" }}>
            {line}
          </En59>
        ))}
      </div>
      <Disclosure59 summary="الترجمة العربية للنموذج">
        {WRITING_59.modelAr.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </Disclosure59>
      <div className="l59-writing">
        <label htmlFor="l59-writing-area">مسودة كتابتك</label>
        <textarea
          id="l59-writing-area"
          dir="ltr"
          lang="en"
          rows={8}
          placeholder="Write 10–12 sentences using must be · should be · can be · must not be · needs to be · should have been…"
        />
        <p className="l59-small">
          اكتب الفقرة كاملة، ثم راجعها بنفسك: هل كل جملة تحتوي V3؟ وهل اخترت <En59>be</En59> أو{" "}
          <En59>have been</En59> بحسب الزمن؟
        </p>
      </div>
    </Scene59>
  );
}

function SpeakingSection() {
  return (
    <Scene59 n="32" kicker="SPEAKING TASK" title="مهمة التحدث — إدارة المصنع" lead={SPEAKING_59.intro}>
      <div className="l59-speaking">
        {SPEAKING_59.lines.map((line, i) => (
          <Disclosure59 key={line.en} summary={`الجملة ${i + 1} · ${line.en}`}>
            <p>{line.ar}</p>
          </Disclosure59>
        ))}
      </div>
      <p className="l59-good">{SPEAKING_59.task}</p>
    </Scene59>
  );
}

function SummarySection({ onExit }: { onExit?: () => void }) {
  return (
    <Scene59
      n="33"
      kicker="FINAL SUMMARY"
      title="الملخص النهائي للدرس 59"
      en="Modal + be + V3 · Modal + have been + V3"
      subtitle="كل القواعد، الفروق المهمة، والقاعدة الذهبية."
      console
    >
      <h3 style={{ fontSize: "1.02rem", color: "#ffd48a" }}>أولًا: مع الأفعال الناقصة في الحاضر أو المستقبل</h3>
      <div className="l59-summary-grid">
        {SUMMARY_59.present.map((form, i) => (
          <article key={form}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <En59 style={{ fontWeight: 700 }}>{form}</En59>
          </article>
        ))}
      </div>
      <h3 style={{ fontSize: "1.02rem", color: "#ffd48a" }}>ثانيًا: مع الأفعال الناقصة في الماضي</h3>
      <div className="l59-summary-grid">
        {SUMMARY_59.past.map((form, i) => (
          <article key={form}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <En59 style={{ fontWeight: 700 }}>{form}</En59>
          </article>
        ))}
      </div>
      <h3 style={{ fontSize: "1.02rem", color: "#ffd48a" }}>ثالثًا: التراكيب المتقدّمة</h3>
      <div className="l59-summary-grid">
        {SUMMARY_59.advanced.map((form, i) => (
          <article key={form}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <En59 style={{ fontWeight: 700 }}>{form}</En59>
          </article>
        ))}
      </div>
      <h3 style={{ fontSize: "1.02rem", color: "#ffd48a" }}>أهم الفروق التي ينبغي ألّا تنساها</h3>
      <div className="l59-lines">
        {SUMMARY_59.differences.map((row) => (
          <div key={row.en}>
            <En59 style={{ fontWeight: 700 }}>{row.en}</En59> = {row.ar}
          </div>
        ))}
      </div>
      <div className="l59-golden">
        <div className="l59-kicker" style={{ color: "#8fd0de" }}>
          <span>★</span>GOLDEN RULE
        </div>
        <p style={{ fontWeight: 700, color: "#fff" }}>
          في المبني للمجهول مع Modal: <En59>{SUMMARY_59.golden.present}</En59>
        </p>
        <p style={{ fontWeight: 700, color: "#fff" }}>
          وفي المبني للمجهول مع Modal Perfect: <En59>{SUMMARY_59.golden.past}</En59>
        </p>
        <p>{SUMMARY_59.golden.last}</p>
        {onExit && (
          <div className="l59-actions">
            <Btn59 variant="bright" onClick={onExit}>
              العودة إلى فهرس الدروس
            </Btn59>
          </div>
        )}
      </div>
    </Scene59>
  );
}

function OriginalTestSection() {
  const sections = [...new Set(ORIGINAL_TEST_59.map((q) => q.section))];
  return (
    <Scene59
      n="30"
      kicker="ORIGINAL TEST · 25 QUESTIONS"
      title="الاختبار الأصلي الكامل — ٢٥ سؤالًا"
      lead="حاول الإجابة عن كل سؤال، ثم تحقّق لكل سؤال على حدة. مفتاح الإجابة الكامل متاح في محطة مستقلة أيضًا."
    >
      <div className="l59-original">
        {sections.map((section) => (
          <div className="l59-original-group" key={section}>
            <div className="l59-group-title">{section}</div>
            {ORIGINAL_TEST_59.filter((q) => q.section === section).map((q) => (
              <Attempt59
                key={q.n}
                index={q.n}
                item={{ prompt: q.prompt, options: q.options, answer: q.answer, why: q.why, ar: q.ar }}
              />
            ))}
          </div>
        ))}
      </div>
    </Scene59>
  );
}

function OriginalKeySection() {
  return (
    <Scene59
      n="KEY"
      kicker="ANSWER KEY"
      title="مفتاح الاختبار الأصلي"
      lead="كل إجابة في بطاقة مغلقة: افتحها بعد محاولتك لتقرأ الإجابة والسبب. الترتيب نفسه المستخدم في الاختبار."
    >
      <div className="l59-key">
        {ORIGINAL_TEST_59.map((q) => (
          <details key={q.n}>
            <summary>
              السؤال {q.n} · {q.section}
            </summary>
            <p>
              <Mixed59 text={q.prompt} />
            </p>
            <En59 style={{ fontWeight: 700 }}>{q.answer}</En59>
            <p>{q.why}</p>
          </details>
        ))}
      </div>
    </Scene59>
  );
}

function OriginalExtraChallenge() {
  const extra = [1, 2, 3, 6, 7, 9, 10, 12, 20, 22];
  const items = ORIGINAL_TEST_59.filter((q) => extra.includes(q.n));
  return (
    <Scene59
      n="10"
      kicker="EXTRA REVIEW"
      title="مراجعة الأسئلة الأصلية العشرة المتبقية"
      lead="الاختبار التفاعلي المشترك يستخدم خمسة عشر سؤالًا فقط لتغطية الدرس. هذه عشرة أسئلة أصلية أخرى من الاختبار الأصلي نفسه، معاد طرحها هنا كي لا يضيع أي سؤال من المصدر."
    >
      <div className="l59-original">
        {items.map((q) => (
          <Attempt59 key={`extra-${q.n}`} index={q.n} item={{ prompt: q.prompt, options: q.options, answer: q.answer, why: q.why, ar: q.ar }} />
        ))}
      </div>
    </Scene59>
  );
}

/* ============================================================
   الهيكل الرئيسي
   ============================================================ */

function Body59({
  slide,
  onStart,
  onTest,
  onExit,
}: {
  slide: Slide59;
  onStart: () => void;
  onTest: () => void;
  onExit?: () => void;
}) {
  const id = slide.id;
  if (id === "cover") return <Cover59 onStart={onStart} onTest={onTest} />;
  if (id === "teacher") return <TeacherArea59 />;
  if (id === "progress") {
    return (
      <Scene59 n="→" kicker="COURSE PATH" title="من الأساس إلى التحكّم الكامل في المعنى" console>
        <div className="l59-progress">
          {/* كل تركيب إنجليزي في عنصره المعزول، والفقرات العربية تخلو من الخلط
              حتى لا يقلب اتجاه السطر ترتيب العبارات الطويلة في العرض الداكن. */}
          <p className="l59-lead">
            الدرس 57 قدّم صيغة المبني للمجهول الأساسية، والدرس 58 مدّها عبر الأزمنة السبعة.
          </p>
          <p className="l59-lead">
            الدرس 59 يضيف الفعل الناقص قبل <En59>be</En59>، ويضيف <En59>have been</En59> للماضي، ثم التراكيب
            المتقدّمة الآتية.
          </p>
          {/* قائمة التراكيب في كتلة LTR مستقلة: فصلها بعلامة «·» داخل فقرة عربية
              كان يعكس ترتيب العناصر نفسها. */}
          <div className="l59-tags l59-tags--ltr" dir="ltr">
            <span>
              <En59>needs to be + V3</En59>
            </span>
            <span>
              <En59>is supposed to be + V3</En59>
            </span>
            <span>
              <En59>is expected to be + V3</En59>
            </span>
            <span>
              <En59>have / get something done</En59>
            </span>
          </div>
          <div className="l59-tags">
            <span>
              <En59>Modal + be + V3</En59>
            </span>
            <span>
              <En59>Modal + have been + V3</En59>
            </span>
            <span>
              <En59>have / get + object + V3</En59>
            </span>
          </div>
          <p>
            <a className="l59-prev-link" href="#/lesson/58">
              الدرس 58 — <En59>Passive Voice Across Tenses</En59>
            </a>
          </p>
          <p className="l59-endnote">
            الدرس التالي متاح الآن:{" "}
            <a className="l59-prev-link" href="#/lesson/60">
              الدرس 60 — <En59>Reported Speech — Statements</En59>
            </a>
            .
          </p>
          <div className="l59-actions">
            <Btn59 onClick={() => (window.location.hash = "/lesson/58")}>← الدرس السابق · 58</Btn59>
            <Btn59 onClick={() => (window.location.hash = "/lesson/60")}>الدرس التالي · 60 →</Btn59>
            {onExit && (
              <Btn59 variant="soft" onClick={onExit}>
                العودة إلى فهرس الدروس
              </Btn59>
            )}
          </div>
        </div>
      </Scene59>
    );
  }
  if (id === "s1") return <Section1 />;
  if (id === "s2") return <ModalSection59 lesson={MODAL_LESSONS_59[0]} />;
  if (id === "s3") return <ModalSection59 lesson={MODAL_LESSONS_59[1]} />;
  if (id === "s4") return <ModalSection59 lesson={MODAL_LESSONS_59[2]} />;
  if (id === "s5") return <ModalSection59 lesson={MODAL_LESSONS_59[3]} />;
  if (id === "s6") return <ModalSection59 lesson={MODAL_LESSONS_59[4]} />;
  if (id === "s7") return obligationSection("have-to");
  if (id === "s8") return obligationSection("ought-to");
  if (id === "s9") return <Section9 />;
  if (id === "s10") return <PerfectSection id="should-have-been" />;
  if (id === "s11") return <PerfectSection id="could-have-been" />;
  if (id === "s12") return <PerfectSection id="must-have-been" />;
  if (id === "s13") return <PerfectSection id="may-have-been" />;
  if (id === "s14") return <AdvancedSection id="needs-to-be" />;
  if (id === "s15") return <AdvancedSection id="supposed-to-be" />;
  if (id === "s16") return <AdvancedSection id="expected-to-be" />;
  if (id === "s17") return <CausativeSection />;
  if (id === "s18") return <RuleTableSection />;
  if (id === "s19") return <ReportLadderSection />;
  if (id === "s20") return <TransformSection />;
  if (id === "s21") return <ErrorsSection />;
  if (id === "s22") return <DialogueSection />;
  if (id === "s23") return <ReadingSection />;
  if (id.startsWith("p") && id.length <= 3) {
    const index = Number(id.slice(1)) - 1;
    const group = PRACTICES_59[index];
    if (group) {
      return (
        <Scene59 n={`EX ${index + 1}`} kicker="PRACTICE" title={group.title} subtitle="اكتب أو اختر، ثم تحقّق — لا يظهر الحل قبل التحقق.">
          <PracticeSet59 group={group} />
        </Scene59>
      );
    }
  }
  if (id === "s24") return <OriginalTestSection />;
  if (id === "s25") return <OriginalKeySection />;
  if (id === "s26") return <OriginalExtraChallenge />;
  if (id === "s27") return <WritingSection />;
  if (id === "s28") return <SpeakingSection />;
  if (id === "s29") return <SummarySection onExit={onExit} />;
  if (id === "explorer") return <ModalExplorer59 />;
  if (id === "builder") return <StructureBuilder59 />;
  if (id === "timeline") return <TimelineLab59 />;
  if (id === "detective") return <MeaningDetective59 />;
  if (id === "engine") return <TransformEngine59 />;
  if (id === "causative") return <CausativeLab59 />;
  if (id === "errors") return <ErrorDetective59 />;
  if (id === "contrast") return <SlotContrast59 />;
  if (id === "drill") return <AdvancedDrill59 />;
  if (id === "v3") return <V3Lab59 />;
  if (id === "final-test") {
    return (
      <Scene59 n="15" kicker="FINAL TEST" title="الاختبار النهائي المشترك — 15 سؤالًا" lead="لا تظهر صحّة أي إجابة ولا الدرجة ولا الشرح قبل الضغط على «تصحيح الاختبار». يمكنك تغيير اختياراتك بحرّية حتى التسليم.">
        <div className="l59-note">
          الأسئلة الخمسة والعشرون الأصلية محفوظة كاملة في محطة «الاختبار الأصلي» وفي مفتاحه، والعشرة المتبقية
          متاحة في محطة المراجعة الإضافية — فلم يُحذف أي سؤال من المصدر.
        </div>
      </Scene59>
    );
  }
  return null;
}

export default function Lesson59({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menu, setMenu] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const main = useRef<HTMLElement | null>(null);
  const total = SLIDES_59.length;

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
   * وسم المحطة يبقى نصًا واحدًا داخل غلاف واحد. لا تقسيم للعنوان ولا عناصر
   * متجاورة: تقسيمه إلى أجزاء يجعل كل جزء صندوقًا مستقلًا في قائمة RTL،
   * فيقفز المقطع الإنجليزي إلى سطر آخر ويُفقد سياق العنوان. الاتجاه يُضبط في
   * CSS بـ unicode-bidi: plaintext فيتبع أول حرف قوي في العنوان نفسه.
   */
  /**
   * وسم المحطة كنص واحد داخل غلاف واحد. المدى الرقمي («١–٦») يعالجه Mixed59
   * بعزله LTR، فلم يبقَ ما يستدعي تقسيم العنوان إلى عناصر متجاورة — والتقسيم
   * كان يفسد ترتيب السطور داخل عمود الفهرس.
   */
  const stationLabel = (title: string) => (
    <span className="l59-rail-title">
      <Mixed59 text={title} />
    </span>
  );

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_59.map((station) => ({
        section: stationLabel(station.title),
        items: SLIDES_59.flatMap((slide, index) =>
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

  const slide = SLIDES_59[step];

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson59"
      rootDir="rtl"
      rootDataLesson={59}
      railAriaLabel="فهرس خطوات الدرس 59"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={
        <span>
          الدرس 59 <En59 className="text-sm">· ADVANCED PASSIVE</En59>
        </span>
      }
      railSubtitle={
        <span className="l59-rail-meta">
          {visited.size} / {total} محطة زرتها
        </span>
      }
      groups={groups}
      activeIndex={step}
      onSelectStep={go}
      onExit={onExit}
      isMenuOpen={menu}
      onMenuOpenChange={setMenu}
      // العنوان فقط هنا: اسم الدرس الإنجليزي حاضر دائمًا في الشريط الجانبي
      // («الدرس 59 · ADVANCED PASSIVE»)، فتكراره في الترويسة كان يزاحم العنوان
      // ويقلبه في السطور الضيقة.
      headerContent={<Mixed59 className="l59-header-title" text={slide.title} />}
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
      mainId="l59-main"
      mainAfter={
        <div hidden={slide.id !== "final-test"} className="lesson-content-container" data-l59-final-test>
          <FinalTest lesson={59} questions={TEST_59} accent="bg-[#10203a]" onGoTeacher={() => go(SLIDES_59.findIndex((s) => s.id === "teacher"))} />
        </div>
      }
    >
      <div className="l59-main">
        <Body59 slide={slide} onStart={() => go(1)} onTest={() => go(TEST_STEP_59)} onExit={onExit} />
      </div>
    </Lesson1Shell>
  );
}

export const LESSON_59_SLIDES = SLIDES_59;
export const LESSON_59_STATIONS = STATIONS_59;
export const LESSON_59_STEP_COUNT = SLIDES_59.length;
export const LESSON_59_SOURCE_SECTION_COUNT = 11;
export const LESSON_59_SOURCE_TOPIC_COUNT = 33;
export const LESSON_59_PRACTICE_COUNT = PRACTICES_59.reduce((n, group) => n + group.items.length, 0);
export const LESSON_59_ORIGINAL_TEST_COUNT = ORIGINAL_TEST_59.length;
export const LESSON_59_FINAL_TEST_COUNT = TEST_59.length;

export type { ReactNode };
