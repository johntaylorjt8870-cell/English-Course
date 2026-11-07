import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import FinalTest from "../../shared/finalTest";
import { LatinRuns } from "../../shared/bidi";
import {
  En57,
  Frame57,
  Mixed57,
  Note57,
  RoleTag57,
  AnswerCard57,
  Formula57,
  VoicePair57,
  ShiftArrow57,
  VerbGrid57,
  Block57,
  Rail57,
  Reveal57,
} from "./kit57";
import {
  ACTIVE_ANALYSIS_57,
  ACTIVE_EXAMPLES_57,
  ACTIVE_FORMULA_57,
  BE_FORMS_57,
  BE_TABLE_57,
  BY_DROP_57,
  BY_INTRO_57,
  BY_KEEP_57,
  COMMON_ERRORS_57,
  COMPARE_PAIRS_57,
  FORMULA_57,
  FORMULA_PARTS_57,
  GOALS_57,
  INTRO_NOTE_57,
  INTRANSITIVE_EXAMPLES_57,
  INTRANSITIVE_VERBS_57,
  IRREGULAR_EXAMPLES_57,
  IRREGULAR_VERBS_57,
  NEGATIVE_CONTRACTIONS_57,
  NEGATIVE_EXAMPLES_57,
  NEGATIVE_FORMULA_57,
  NEGATIVE_NOTE_57,
  PASSIVE_DEFINITION_57,
  PASSIVE_EXAMPLES_57,
  PRESENT_FORMULAS_57,
  PRESENT_PASSIVE_EXAMPLES_57,
  PRESENT_RECAP_57,
  PRONOUNS_57,
  PRONOUN_EXAMPLES_57,
  PRONOUN_WHY_57,
  QUESTION_EXAMPLES_57,
  QUESTION_FORMULA_57,
  QUESTION_NOTE_57,
  RATING_ADVICE_57,
  RATING_ROWS_57,
  READING_QA_57,
  REASONS_57,
  REASONS_PLATFORM_NOTE_57,
  REGULAR_EXAMPLES_57,
  REGULAR_VERBS_57,
  SHORT_ANSWERS_57,
  SINGULAR_PLURAL_57,
  STEP_DEMO_57,
  STEPS_57,
  SUMMARY_57,
  TRANSITIVE_NOTE_57,
  TRANSITIVE_PAIR_57,
  TRANSITIVE_RULE_57,
  TRANSLATION_NOTE_57,
  TRANSLATION_STYLES_57,
  V3_ADVICE_57,
  V3_SHOWCASE_57,
  V3_WARNING_57,
  WH_QUESTIONS_57,
} from "./content57";
import { PRACTICE_GROUPS_57 } from "./practiceData57";
import {
  AnalysisLab57,
  BePickLab57,
  ByLab57,
  CompareLab57,
  ErrorLab57,
  FocusLab57,
  NegLab57,
  QuestionLab57,
  ShiftLab57,
  TransitivityLab57,
  V3Lab57,
  initialWorkspace57,
  type Workspace57,
} from "./labs57";
import {
  Dialogue57,
  DialogueQuestions57,
  PracticeSet57,
  Reading57,
  ReadingHunt57,
  ReadingQuestions57,
  Speaking57,
  Summary57,
  Vocabulary57,
  Writing57,
} from "./Practice57";
import { TEST_57 } from "./test57";
import TeacherArea57 from "./TeacherArea57";
import "./lesson57.css";

/* ============================================================
   خريطة الدرس
   ============================================================ */

type Station57 = { id: string; title: string };
type Slide57 = { id: string; station: string; title: string; emblem: string };

const STATIONS_57: Station57[] = [
  { id: "opening", title: "الانطلاق" },
  { id: "concept", title: "المعلوم والمجهول" },
  { id: "formula", title: "القاعدة والتحويل" },
  { id: "present", title: "المضارع البسيط المجهول" },
  { id: "agent", title: "by والمفعول به" },
  { id: "grammar", title: "النفي والأسئلة" },
  { id: "traps", title: "المزالق" },
  { id: "reading", title: "الحوار والقراءة" },
  { id: "practice", title: "التدريبات" },
  { id: "closing", title: "الختام والتقييم" },
];

const SLIDES_57: Slide57[] = [
  { id: "cover", station: "opening", title: "غلاف الدرس", emblem: "⇄" },
  { id: "goals", station: "opening", title: "أهداف الدرس", emblem: "◎" },
  { id: "voice-intro", station: "opening", title: "من الذي قام بالفعل؟", emblem: "◇" },

  { id: "active-type", station: "concept", title: "Active Voice — التركيب", emblem: "◆" },
  { id: "active-analyse", station: "concept", title: "تحليل الجملة", emblem: "▤" },
  { id: "analysis-lab", station: "concept", title: "مختبر التحليل", emblem: "◎" },
  { id: "passive-concept", station: "concept", title: "Passive Voice — الفكرة", emblem: "●" },
  { id: "move-lab", station: "concept", title: "من النهاية إلى البداية", emblem: "➜" },

  { id: "formula-core", station: "formula", title: "Object + be + V3", emblem: "▮" },
  { id: "v3-shift", station: "formula", title: "التصريف الثالث V3", emblem: "▰" },
  { id: "steps", station: "formula", title: "خطوات التحويل الخمس", emblem: "⑤" },
  { id: "shift-lab", station: "formula", title: "مختبر التحويل", emblem: "⚗" },
  { id: "reasons", station: "formula", title: "لماذا المبني للمجهول؟", emblem: "◇" },
  { id: "reason-reveal", station: "formula", title: "أي سبب ينطبق؟", emblem: "◎" },

  { id: "present-rules", station: "present", title: "Present Simple Passive", emblem: "▮" },
  { id: "be-choose", station: "present", title: "اختيار am / is / are", emblem: "①" },
  { id: "be-lab", station: "present", title: "مختبر be", emblem: "◎" },
  { id: "present-examples", station: "present", title: "خمس جمل محلَّلة", emblem: "▤" },
  { id: "v3-lab", station: "present", title: "تحدي V3", emblem: "▰" },
  { id: "regular-irregular", station: "present", title: "منتظمة وغير منتظمة", emblem: "≡" },

  { id: "by-agent", station: "agent", title: "استخدام by", emblem: "◇" },
  { id: "by-drop", station: "agent", title: "متى نحذف الفاعل؟", emblem: "✂" },
  { id: "by-lab", station: "agent", title: "مختبر by", emblem: "◎" },
  { id: "pronouns", station: "agent", title: "الضمائر بعد by", emblem: "→" },
  { id: "singular-plural", station: "agent", title: "المفرد والجمع", emblem: "≟" },
  { id: "transitive", station: "agent", title: "أفعال قابلة وغير قابلة", emblem: "≠" },
  { id: "transitive-lab", station: "agent", title: "مختبر الأهلية", emblem: "◎" },

  { id: "forms", station: "grammar", title: "النفي والسؤال والجواب", emblem: "✕" },
  { id: "neg-lab", station: "grammar", title: "مختبر النفي", emblem: "⊖" },
  { id: "question-lab", station: "grammar", title: "بناء السؤال", emblem: "?" },
  { id: "compare", station: "grammar", title: "المقارنة في المعنى", emblem: "⇄" },
  { id: "compare-lab", station: "grammar", title: "مختبر التركيز", emblem: "◎" },

  { id: "errors", station: "traps", title: "ستة أخطاء شائعة", emblem: "!" },
  { id: "error-lab", station: "traps", title: "اكتشف الخطأ", emblem: "⌕" },

  { id: "dialogue", station: "reading", title: "At the School", emblem: "❝" },
  { id: "dialogue-qa", station: "reading", title: "أسئلة فهم الحوار", emblem: "?" },
  { id: "reading", station: "reading", title: "How Products Are Made", emblem: "▤" },
  { id: "vocabulary", station: "reading", title: "مفردات القطعة", emblem: "≡" },
  { id: "reading-qa", station: "reading", title: "أسئلة القراءة", emblem: "?" },
  { id: "reading-hunt", station: "reading", title: "صيد التراكيب", emblem: "⌕" },

  { id: "practice-1", station: "practice", title: "① Active أم Passive", emblem: "1" },
  { id: "practice-2", station: "practice", title: "② تحليل الأجزاء", emblem: "2" },
  { id: "practice-3", station: "practice", title: "③ حوّل إلى Passive", emblem: "3" },
  { id: "practice-4", station: "practice", title: "④ حوّل إلى Active", emblem: "4" },
  { id: "practice-5", station: "practice", title: "⑤ أكمل بـ am / is / are", emblem: "5" },
  { id: "practice-6", station: "practice", title: "⑥ أكمل بـ V3", emblem: "6" },
  { id: "practice-7", station: "practice", title: "⑦ التحويل إلى النفي", emblem: "7" },
  { id: "practice-8", station: "practice", title: "⑧ التحويل إلى سؤال", emblem: "8" },
  { id: "practice-9", station: "practice", title: "⑨ اختر الإجابة", emblem: "9" },
  { id: "practice-10", station: "practice", title: "⑩ تدريب إضافي", emblem: "10" },

  { id: "test", station: "closing", title: "الاختبار النهائي", emblem: "▣" },
  { id: "rating", station: "closing", title: "تقييم النتيجة", emblem: "▦" },
  { id: "writing", station: "closing", title: "Writing Task", emblem: "✎" },
  { id: "speaking", station: "closing", title: "Speaking Task", emblem: "❝" },
  { id: "summary", station: "closing", title: "الملخص النهائي", emblem: "✓" },
  { id: "teacher", station: "closing", title: "فضاء المعلم", emblem: "⊘" },
  { id: "progress", station: "closing", title: "موقفك في المنهج", emblem: "▣" },
];

const STEP_COUNT_57 = SLIDES_57.length;
const TEST_STEP_57 = SLIDES_57.findIndex((s) => s.id === "test");

/* ============================================================
   الغلاف
   ============================================================ */

function Cover57({ onStart, onTest }: { onStart: () => void; onTest: () => void }) {
  return (
    <section className="l57-cover" data-step-id="cover" aria-labelledby="l57-title">
      <div className="l57-cover-main">
        <div className="l57-cover-kicker">
          <span className="l57-cover-chip">الدرس 57 · 120</span>
          <span className="l57-cover-chip">بداية وحدة جديدة</span>
          <span className="l57-cover-chip l57-cover-chip--lab">THE VOICE SHIFT LAB</span>
        </div>
        <h1 id="l57-title" tabIndex={-1}>
          مختبر <em>تحويل الجملة</em>
        </h1>
        <p className="l57-cover-sub">
          <Mixed57 text="ماذا يحدث حين ينتقل المفعول به من نهاية الجملة إلى بدايتها؟ هنا تبدأ حكاية المبني للمجهول." />
        </p>
        <div className="l57-cover-title">
          <span>PASSIVE VOICE — FOUNDATIONS</span>
          <em>المبني للمجهول · الأساسيات</em>
        </div>
        <div className="l57-cover-flow">
          <span className="l57-cover-pill l57-cover-pill--active">ACTIVE · من قام بالفعل</span>
          <span className="l57-cover-arrow">⇄</span>
          <span className="l57-cover-pill l57-cover-pill--passive">PASSIVE · على ماذا وقع الفعل</span>
        </div>
        <div className="l57-cover-actions">
          <button type="button" className="l57-btn l57-btn--dark" onClick={onStart}>
            ادخل المختبر ←
          </button>
          <button type="button" className="l57-btn l57-btn--outline" onClick={onTest}>
            الاختبار النهائي ↗
          </button>
        </div>
        <div className="l57-cover-foot">
          <span>{STEP_COUNT_57} خطوة</span>
          <span>{STATIONS_57.length} محطات</span>
          <span>10 مختبرات تفاعلية</span>
          <span>اختبار 15 سؤالًا</span>
        </div>
      </div>
      <aside className="l57-board" aria-label="معاينة مسار التحويل">
        <div className="l57-board-head">
          <span>SHIFT TRACK · 57</span>
          <span aria-hidden="true">⇄</span>
        </div>
        <Rail57
          size="sm"
          tokens={[
            { text: "Ali", role: "agent" },
            { text: "cleans", role: "v3" },
            { text: "the room.", role: "receiver" },
          ]}
        />
        <ShiftArrow57 />
        <Rail57
          size="sm"
          tokens={[
            { text: "The room", role: "receiver" },
            { text: "is cleaned", role: "be" },
            { text: "by Ali.", role: "by" },
          ]}
        />
        <p className="l57-board-hint">Object first → be → V3 → (by + agent)</p>
      </aside>
    </section>
  );
}

/* ============================================================
   محتوى الخطوات
   ============================================================ */

type BodyProps = {
  slide: Slide57;
  index: number;
  station: string;
  workspace: Workspace57;
  setLab: (id: string, value: string, checked?: boolean) => void;
  setPractice: (id: string, value: string, checked?: boolean) => void;
  onTouchGroup: (id: string) => void;
  onStart: () => void;
  onTest: () => void;
  onExit?: () => void;
};

function Progress57() {
  return (
    <div className="l57-progress">
      <div className="l57-progress-hero">
        <span className="l57-mini-chip">الدرس 57 مكتمل</span>
        <span className="l57-progress-big" dir="ltr">
          57 / 120
        </span>
        <span className="l57-next-sub">
          <Mixed57 text="47.5% من المنهج · 63 درسًا متبقيًا" />
        </span>
        <div className="l57-progress-track" aria-hidden="true">
          <div style={{ width: "47.5%" }} />
        </div>
      </div>
      <div className="l57-next">
        <div className="l57-next-head">
          <span className="l57-next-no">58</span>
          <div>
            <h3>الدرس القادم — Passive Voice: Tenses</h3>
            <span className="l57-next-sub">
              <Mixed57 text="المبني للمجهول في بقية الأزمنة: الماضي البسيط was/were + V3، والمضارع المستمر، والمضارع التام." />
            </span>
          </div>
        </div>
        <ul className="l57-bullets">
          {[
            "was / were + V3 في الماضي البسيط المجهول.",
            "is / are being + V3 في المضارع المستمر المجهول.",
            "has / have been + V3 في المضارع التام المجهول.",
            "كيف نختار صيغة be الصحيحة عندما يتغيّر الزمن.",
          ].map((t) => (
            <li key={t}>
              <span className="l57-bullet-mark" aria-hidden="true">
                ▸
              </span>
              <span>
                <Mixed57 text={t} />
              </span>
            </li>
          ))}
        </ul>
        <p className="l57-hint">
          <a className="l57-next-link" href="#/lesson/58">انتقل إلى الدرس 58 — Passive Voice Across Tenses ↗</a>
        </p>
      </div>
    </div>
  );
}

function Rating57() {
  return (
    <div className="l57-rating" data-rating="57">
      <Note57
        tone="note"
        text="هذا المقياس يخص الاختبار الأصلي ذا الخمسة والعشرين سؤالًا. الاختبار التفاعلي في هذا الدرس 15 سؤالًا مختارة من الأسئلة الأصلية، والتمرين العاشر في «تدريب إضافي» يعرض الأسئلة الخمسة والعشرين كلها بنصوصها — احسب نتيجتك على 25."
      />
      {RATING_ROWS_57.map((row) => (
        <div key={row.range} className="l57-rating-row">
          <span className="l57-rating-range">{row.range}</span>
          <span className="l57-rating-label">
            <Mixed57 text={row.label} />
          </span>
        </div>
      ))}
      <Note57 tone="warn" title="نصيحة تصحيح" text={RATING_ADVICE_57} />
    </div>
  );
}

function Goals57() {
  return (
    <div className="l57-goals">
      <ol className="l57-bullets l57-bullets--ordered">
        {GOALS_57.map((goal) => (
          <li key={goal}>
            <span className="l57-bullet-mark" aria-hidden="true">
              ▸
            </span>
            <span>
              <Mixed57 text={goal} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** شريحة الأسباب: يختار الطالب السبب، ثم يرى الأمثلة بعد التحقق. */
function ReasonReveal57() {
  const [picked, setPicked] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const reason = REASONS_57.find((r) => r.id === picked);
  return (
    <div className="l57-lab" data-lab="reason">
      <p className="l57-lab-line">
        <Mixed57 text="اقرأ الموقف، ثم اختر السبب الأقرب. تظهر الأمثلة بعد التحقق فقط." />
      </p>
      <div className="l57-note l57-note--note">
        <span className="l57-note-glyph" aria-hidden="true">
          ?
        </span>
        <div>
          <p>
            <Mixed57 text="«The documents were delivered yesterday» — ما الذي يجعل المتكلم يختار المبني للمجهول هنا؟" />
          </p>
        </div>
      </div>
      <div className="l57-options l57-options--2">
        {REASONS_57.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={picked === r.id}
            disabled={checked}
            className={picked === r.id ? "is-on" : ""}
            onClick={() => setPicked(r.id)}
          >
            <span>
              <Mixed57 text={r.title.replace("① ", "").replace("② ", "").replace("③ ", "").replace("④ ", "").replace("⑤ ", "")} />
            </span>
          </button>
        ))}
      </div>
      <div className="l57-lab-actions">
        <button type="button" className="l57-btn l57-btn--dark" disabled={!picked || checked} onClick={() => setChecked(true)}>
          تحقّق
        </button>
        {checked && (
          <button
            type="button"
            className="l57-btn l57-btn--ghost"
            onClick={() => {
              setPicked("");
              setChecked(false);
            }}
          >
            ↺ جرّب من جديد
          </button>
        )}
      </div>
      {checked && (
        <div className="l57-result" role="status">
          <p className={`l57-verdict ${picked === "result" ? "is-ok" : "is-bad"}`}>
            <span aria-hidden="true">{picked === "result" ? "✓" : "✕"}</span>
            <Mixed57
              text={
                picked === "result"
                  ? "صحيح: التركيز على النتيجة — ما صار إليه الشيء، لا من قام بالتسليم."
                  : "الأنسب هنا هو التركيز على النتيجة (③): الحدث والنتيجة أهم من الشخص الذي سلّم."
              }
            />
          </p>
          {reason && (
            <div className="l57-result-why">
              <Mixed57 text={reason.body} />
              <ul className="l57-bullets" style={{ marginTop: "0.4rem" }}>
                {reason.items.map((i) => (
                  <li key={i.en} dir="ltr">
                    <span className="l57-bullet-mark" aria-hidden="true">
                      ▸
                    </span>
                    <span>
                      <En57>{i.en}</En57>
                    </span>
                    <span dir="rtl" style={{ marginInlineStart: "0.4rem", color: "var(--l57-muted)", fontSize: "0.8rem" }}>
                      <Mixed57 text={i.ar} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Body57({ slide, index, station, workspace, setLab, setPractice, onTouchGroup, onStart, onTest, onExit }: BodyProps) {
  const store = { workspace, setPractice, onTouchGroup };

  const wrap = (title: string, lead: string, children: React.ReactNode, extras: { tip?: string; tone?: "neutral" | "active" | "passive" | "lab" | "test" } = {}) => (
    <Frame57
      step={index + 1}
      phase={station}
      title={title}
      lead={lead}
      emblem={slide.emblem}
      tone={extras.tone}
      tip={extras.tip}
      slideId={slide.id}
    >
      {children}
    </Frame57>
  );

  if (slide.id === "cover") return <Cover57 onStart={onStart} onTest={onTest} />;

  switch (slide.id) {
    case "goals":
      return wrap(
        "أهداف الدرس",
        "سبعة أهداف قابلة للقياس. في نهاية هذا الدرس ستستطيع بناء جملة مجهولة بنفسك — لا التعرف عليها فقط.",
        <Goals57 />,
        { tip: "الهدف العملي: أن تحوّل جملة في المضارع البسيط دون تفكير طويل، وأن تشرح لماذا اخترت is أو are." },
      );

    case "voice-intro":
      return wrap(
        "من الذي قام بالفعل؟",
        "قبل أي قاعدة: جملة واحدة، وبؤرتان. بدّل بينهما ولاحظ ما الذي ينتقل إلى المقدمة.",
        <>
          <FocusLab57 />
          <Note57 text={INTRO_NOTE_57} />
        </>,
        { tone: "active" },
      );

    case "active-type":
      return wrap(
        "Active Voice — التركيب الأساسي",
        "Subject + Verb + Object: نبدأ بالشخص أو الشيء الذي يقوم بالفعل.",
        <>
          <Formula57
            parts={[
              { text: "SUBJECT", role: "agent", sub: "الفاعل" },
              { text: "VERB", role: "v3", sub: "الفعل" },
              { text: "OBJECT", role: "receiver", sub: "المفعول به" },
            ]}
            caption="هذا هو الترتيب الطبيعي للجملة في المبني للمعلوم."
          />
          <div className="l57-result">
            <span className="l57-result-label">
              <Mixed57 text="مثال محلَّل" />
            </span>
            <Rail57
              tokens={[
                { text: ACTIVE_ANALYSIS_57.subject, role: "agent" },
                { text: ACTIVE_ANALYSIS_57.verb, role: "v3" },
                { text: ACTIVE_ANALYSIS_57.object + ".", role: "receiver" },
              ]}
            />
            <div className="l57-lab-bar">
              <span className="l57-role l57-chip--agent">
                <span aria-hidden="true">◆</span>
                <En57>SUBJECT</En57>
                <span className="l57-role-ar">{ACTIVE_ANALYSIS_57.subjectAr}</span>
              </span>
              <span className="l57-role l57-chip--v3">
                <span aria-hidden="true">▰</span>
                <En57>VERB</En57>
                <span className="l57-role-ar">{ACTIVE_ANALYSIS_57.verbAr}</span>
              </span>
              <span className="l57-role l57-chip--receiver">
                <span aria-hidden="true">●</span>
                <En57>OBJECT</En57>
                <span className="l57-role-ar">{ACTIVE_ANALYSIS_57.objectAr}</span>
              </span>
            </div>
            <p className="l57-result-ar">
              <Mixed57 text={ACTIVE_ANALYSIS_57.ar} />
            </p>
          </div>
        </>,
        { tone: "active" },
      );

    case "active-analyse":
      return wrap(
        "أمثلة إضافية — كل جملة محلَّلة",
        "في كل هذه الأمثلة نبدأ بالشخص أو الشيء الذي قام بالفعل.",
        <>
          {ACTIVE_EXAMPLES_57.map((ex) => (
            <Reveal57 key={ex.en} label={`حلّل: ${ex.en}`} hiddenLabel={`أخفِ: ${ex.en}`}>
              <div className="l57-result">
                <Rail57
                  tokens={[
                    { text: ex.subject, role: "agent" },
                    { text: ex.verb, role: "v3" },
                    { text: ex.object + ".", role: "receiver" },
                  ]}
                  size="sm"
                />
                <p className="l57-result-ar">
                  <Mixed57 text={ex.ar} />
                </p>
                {ex.note && (
                  <p className="l57-result-why">
                    <Mixed57 text={ex.note} />
                  </p>
                )}
              </div>
            </Reveal57>
          ))}
          <Note57
            tone="note"
            text="جملة واحدة هنا فاعلها Someone — فاعل حقيقي لكنه غامض. هذه بالضبط إحدى حالات المبني للمجهول."
          />
        </>,
        { tone: "active" },
      );

    case "analysis-lab":
      return wrap(
        "مختبر التحليل",
        "أسند الأدوار بنفسك. هذا التحليل هو نصف طريق التحويل، ومنه ستعرف أي كلمة ستنتقل إلى بداية الجملة المجهولة.",
        <AnalysisLab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab", tip: "قاعدة سهلة: اسأل «من؟» ← الفاعل، «ماذا حدث؟» ← الفعل، «على من أو على ماذا؟» ← المفعول به." },
      );

    case "passive-concept":
      return wrap(
        "Passive Voice — الفكرة",
        PASSIVE_DEFINITION_57,
        <>
          {PASSIVE_EXAMPLES_57.map((p) => (
            <div key={p.passive.en} className="l57-result">
              <VoicePair57 active={p.active.en} activeAr={p.active.ar} passive={p.passive.en} passiveAr={p.passive.ar} align="grid" />
              <Rail57
                size="sm"
                tokens={[
                  { text: "The lesson", role: "receiver" },
                  { text: "is", role: "be" },
                  { text: "explained", role: "v3" },
                  { text: "by the teacher.", role: "by" },
                ]}
              />
              <div className="l57-lab-bar">
                <span className="l57-role l57-chip--receiver">
                  ● <En57>MOVED</En57>
                  <span className="l57-role-ar">
                    <Mixed57 text={p.moved} />
                  </span>
                </span>
                <span className="l57-role l57-chip--be">
                  ▮ <En57>BE</En57>
                  <span className="l57-role-ar">
                    <Mixed57 text={p.be} />
                  </span>
                </span>
                <span className="l57-role l57-chip--v3">
                  ▰ <En57>V3</En57>
                  <span className="l57-role-ar">
                    <Mixed57 text={p.v3} />
                  </span>
                </span>
                <span className="l57-role l57-chip--by">
                  ◇ <En57>BY</En57>
                  <span className="l57-role-ar">
                    <Mixed57 text={p.agent} />
                  </span>
                </span>
              </div>
              <p className="l57-result-why">
                <Mixed57 text={p.why} />
              </p>
            </div>
          ))}
        </>,
        { tone: "passive" },
      );

    case "move-lab":
      return wrap(
        "من النهاية إلى البداية",
        "شاهد الحركة نفسها: المفعول به يغادر ذيل الجملة ويحتلّ صدرها، والفاعل يتراجع بعد by.",
        <>
          <div className="l57-result">
            <span className="l57-result-label">BEFORE — Active</span>
            <Rail57
              size="lg"
              tokens={[
                { text: "The chef", role: "agent" },
                { text: "prepares", role: "v3" },
                { text: "the food.", role: "receiver" },
              ]}
            />
            <div className="l57-pair-mid">
              <ShiftArrow57 label="MOVE OBJECT" sub="انقل المفعول إلى البداية" />
            </div>
            <span className="l57-result-label">AFTER — Passive</span>
            <Rail57
              size="lg"
              tokens={[
                { text: "The food", role: "receiver" },
                { text: "is prepared", role: "be" },
                { text: "by the chef.", role: "by" },
              ]}
            />
            <p className="l57-result-ar">
              <Mixed57 text="الطعام يتم تحضيره بواسطة الطاهي." />
            </p>
          </div>
          <Note57
            tone="good"
            title="لاحظ الثلاثة معًا"
            text="① المفعول به في المقدمة ② فعل be قبل الفعل الأساسي ③ الفعل الأساسي في صيغة V3. غياب أحدها يكسر الجملة."
          />
        </>,
        { tone: "passive" },
      );

    case "formula-core":
      return wrap(
        "القاعدة الأساسية: Object + be + V3",
        "هذه أهم قاعدة في الدرس. ثلاثة أجزاء فقط، لكن لكل جزء وظيفة لا تُهمَل.",
        <>
          <Formula57
            parts={[
              { text: "OBJECT", role: "receiver", sub: "المفعول به" },
              { text: "be", role: "be", sub: "am / is / are" },
              { text: "V3", role: "v3", sub: "التصريف الثالث" },
            ]}
            caption="V3 = Past Participle = التصريف الثالث للفعل."
          />
          {FORMULA_PARTS_57.map((p) => (
            <div key={p.part} className="l57-result">
              <span className="l57-result-label" dir="ltr">
                <En57>{p.part}</En57> · <Mixed57 text={p.ar} />
              </span>
              <p className="l57-result-why">
                <Mixed57 text={p.body} />
              </p>
              <p className="l57-result-en" dir="ltr">
                <En57>{p.exampleEn}</En57>
              </p>
              <p className="l57-result-ar">
                <Mixed57 text={p.exampleAr} />
              </p>
            </div>
          ))}
          <Note57
            tone="note"
            text={`أشكال be هي: ${BE_FORMS_57.join(" · ")}. في درس اليوم نركّز على am / is / are في المضارع البسيط، وبقية الأشكال تأتي بالتفصيل في الدرس القادم.`}
          />
        </>,
        { tone: "passive" },
      );

    case "v3-shift":
      return wrap(
        "الجزء الثالث: V3",
        "بعد be نضع التصريف الثالث. لا V1 مثل write، ولا V2 مثل wrote.",
        <>
          {V3_SHOWCASE_57.map((v) => (
            <div key={v.v1} className="l57-v3-track">
              <span>
                V1 <En57>{v.v1}</En57>
              </span>
              <span className="l57-v3-arrow">→</span>
              <span>
                V2 <En57>{v.v2}</En57>
              </span>
              <span className="l57-v3-arrow">→</span>
              <span className="is-target">
                V3 <En57>{v.v3}</En57>
              </span>
              <span className="l57-v3-arrow">→</span>
              <span dir="ltr" className="is-target">
                <En57>{v.passive}</En57>
              </span>
            </div>
          ))}
          <Note57 tone="warn" title="انتبه" text={V3_WARNING_57} />
        </>,
        { tone: "lab" },
      );

    case "steps":
      return wrap(
        "كيف نحوّل الجملة؟ خمس خطوات",
        "المهارة الأساسية في الدرس. اتبع الخطوات بالترتيب على كل مثال.",
        <>
          <div className="l57-steps">
            {STEPS_57.map((s) => (
              <div key={s.n} className="l57-step-row">
                <span className="l57-step-bullet">{s.n}</span>
                <div>
                  <span className="l57-step-tag" dir="ltr">
                    {s.tag}
                  </span>
                  <p>
                    <Mixed57 text={s.text} />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="l57-result">
            <span className="l57-result-label">
              <Mixed57 text="تطبيق الخطوات على مثال" />
            </span>
            <p className="l57-result-en" dir="ltr">
              <En57>{STEP_DEMO_57.active.en}</En57>
            </p>
            <p className="l57-result-ar">
              <Mixed57 text={STEP_DEMO_57.active.ar} />
            </p>
            <ul className="l57-bullets">
              <li>
                <span className="l57-bullet-mark">1</span>
                <span>
                  <Mixed57 text={`الفاعل: ${STEP_DEMO_57.subject}`} />
                </span>
              </li>
              <li>
                <span className="l57-bullet-mark">2</span>
                <span>
                  <Mixed57 text={`المفعول به: ${STEP_DEMO_57.object}`} />
                </span>
              </li>
              <li>
                <span className="l57-bullet-mark">3</span>
                <span>
                  <Mixed57 text={`نقل المفعول إلى البداية: ${STEP_DEMO_57.object} …`} />
                </span>
              </li>
              <li>
                <span className="l57-bullet-mark">4</span>
                <span>
                  <Mixed57 text={`الزمن ${STEP_DEMO_57.tense} والفاعل الجديد جمع: ${STEP_DEMO_57.newSubjectNote}`} />
                </span>
              </li>
              <li>
                <span className="l57-bullet-mark">5</span>
                <span>
                  <Mixed57 text="نحوّل الفعل إلى V3 ونضيف by + الفاعل الأصلي عند الحاجة." />
                </span>
              </li>
            </ul>
            <Rail57
              tokens={[
                { text: "The reports", role: "receiver" },
                { text: "are", role: "be" },
                { text: "checked", role: "v3" },
                { text: "by the manager.", role: "by" },
              ]}
            />
            <p className="l57-result-ar">
              <Mixed57 text={STEP_DEMO_57.final.ar} />
            </p>
          </div>
        </>,
        { tone: "lab", tip: "الترتيب مهم: المفعول ← be ← V3. من يعكس الخطوتين يحصل على جملة لا تُقرأ." },
      );

    case "shift-lab":
      return wrap(
        "مختبر التحويل",
        "بنِ الجملة بنفسك خطوة بخطوة: ما الذي يتصدّر؟ أي be؟ أي V3؟ وهل underاج to by؟",
        <ShiftLab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab" },
      );

    case "reasons":
      return wrap(
        "لماذا نستخدم المبني للمجهول؟",
        "قد تسأل: لماذا لا نستخدم Active دائمًا؟ لأن التركيز على الشيء الذي وقع عليه الفعل قد يكون أهم من معرفة من قام به.",
        <>
          {REASONS_57.map((r) => (
            <div key={r.id} className="l57-result">
              <span className="l57-result-label">
                <Mixed57 text={r.title} />
              </span>
              <p className="l57-result-why">
                <Mixed57 text={r.body} />
              </p>
              <ul className="l57-bullets">
                {r.items.map((i) => (
                  <li key={i.en}>
                    <span className="l57-bullet-mark" aria-hidden="true">
                      ▸
                    </span>
                    <span dir="ltr">
                      <En57>{i.en}</En57>
                    </span>
                    <span dir="rtl" className="l57-vocab-ar">
                      <Mixed57 text={i.ar} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Note57 tone="note" title="ملاحظة على صيغة الأمثلة" text={REASONS_PLATFORM_NOTE_57} />
        </>,
        { tone: "passive" },
      );

    case "reason-reveal":
      return wrap(
        "أي سبب ينطبق؟",
        "اختر السبب الذي يفسّر اختيار المبني للمجهول في هذا الموقف.",
        <ReasonReveal57 />,
        { tone: "lab" },
      );

    case "present-rules":
      return wrap(
        "Passive Voice في Present Simple",
        "نبدأ بالمضارع البسيط لأنه أسهل نقطة للانطلاق.",
        <>
          <div className="l57-result">
            <span className="l57-result-label">ACTIVE</span>
            <p className="l57-result-en" dir="ltr">
              <En57>{PRESENT_FORMULAS_57.active}</En57>
            </p>
            <span className="l57-result-label">PASSIVE</span>
            <p className="l57-result-en" dir="ltr">
              <En57>{PRESENT_FORMULAS_57.passive}</En57>
            </p>
          </div>
          <ul className="l57-bullets">
            {PRESENT_RECAP_57.map((t) => (
              <li key={t}>
                <span className="l57-bullet-mark" aria-hidden="true">
                  ▸
                </span>
                <span>
                  <Mixed57 text={t} />
                </span>
              </li>
            ))}
          </ul>
          <div className="l57-matrix">
            {BE_TABLE_57.map((row) => (
              <div key={row.subject} className="l57-matrix-row">
                <span dir="ltr" className="l57-matrix-subject">
                  <En57>{row.subject}</En57>
                </span>
                <span className={`l57-matrix-be ${row.be === "am" ? "is-am" : row.be === "is" ? "is-is" : "is-are"}`} dir="ltr">
                  <En57>{row.be}</En57>
                </span>
                <span className="l57-matrix-ar">
                  <Mixed57 text={row.ar} />
                </span>
              </div>
            ))}
          </div>
        </>,
        { tone: "passive", tip: "اختر am / is / are حسب الشيء الذي أصبح في بداية الجملة — لا حسب الفاعل الأصلي." },
      );

    case "be-choose":
      return wrap(
        "اختيار am / is / are",
        "القرار كله يعتمد على الفاعل الجديد. جرّب المختبر أدناه.",
        <BePickLab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab" },
      );

    case "be-lab":
      return wrap(
        "خمس جمل محلَّلة",
        "لماذا is في الأولى وare في الثانية؟ تابع الجدول.",
        <>
          {PRESENT_PASSIVE_EXAMPLES_57.map((ex) => (
            <div key={ex.passive} className="l57-result">
              <div className="l57-lab-bar">
                <span className="l57-role l57-chip--agent">
                  ◆ <En57>ACTIVE</En57>
                </span>
              </div>
              <p className="l57-result-en" dir="ltr">
                <En57>{ex.active}</En57>
              </p>
              <div className="l57-lab-bar">
                <span className="l57-role l57-chip--receiver">
                  ● <En57>PASSIVE</En57>
                </span>
              </div>
              <p className="l57-result-en" dir="ltr">
                <En57>{ex.passive}</En57>
              </p>
              <p className="l57-result-ar">
                <Mixed57 text={ex.activeAr} /> · <Mixed57 text={ex.passiveAr} />
              </p>
              <p className="l57-result-why">
                <b dir="ltr">
                  <En57>{ex.be}</En57>
                </b>{" "}
                <Mixed57 text={ex.why} />
              </p>
            </div>
          ))}
        </>,
        { tone: "passive" },
      );

    case "v3-lab":
      return wrap(
        "تحدي اختيار V3",
        "سلسلة التصريف أمامك. اختر الصيغة الصحيحة فقط — لا تختار V1 ولا V2.",
        <V3Lab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab", tip: V3_ADVICE_57 },
      );

    case "regular-irregular":
      return wrap(
        "الأفعال المنتظمة وغير المنتظمة",
        "بعض الأفعال تضيف ed، وبعضها يجب حفظه. كلاهما يعمل بعد be بالطريقة نفسها.",
        <>
          <div className="l57-result">
            <span className="l57-result-label">
              <Mixed57 text="أولًا: الأفعال المنتظمة — غالبًا نضيف ed" />
            </span>
            <VerbGrid57 rows={REGULAR_VERBS_57} />
            <ul className="l57-bullets" style={{ marginTop: "0.5rem" }}>
              {REGULAR_EXAMPLES_57.map((e) => (
                <li key={e.en}>
                  <span className="l57-bullet-mark">▸</span>
                  <span dir="ltr">
                    <En57>{e.en}</En57>
                  </span>
                  <span className="l57-vocab-ar">
                    <Mixed57 text={e.ar} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="l57-result">
            <span className="l57-result-label">
              <Mixed57 text="ثانيًا: الأفعال غير المنتظمة — لا تتبع قاعدة ثابتة" />
            </span>
            <VerbGrid57 rows={IRREGULAR_VERBS_57} />
            <ul className="l57-bullets" style={{ marginTop: "0.5rem" }}>
              {IRREGULAR_EXAMPLES_57.map((e) => (
                <li key={e.en}>
                  <span className="l57-bullet-mark">▸</span>
                  <span dir="ltr">
                    <En57>{e.en}</En57>
                  </span>
                  <span className="l57-vocab-ar">
                    <Mixed57 text={e.ar} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Note57 tone="warn" title="نصيحة مهمة" text={V3_ADVICE_57} />
        </>,
        { tone: "lab" },
      );

    case "by-agent":
      return wrap(
        "استخدام by في المبني للمجهول",
        "هل يجب أن نذكر دائمًا من قام بالفعل؟ لا. يمكننا ذكره بـ by + الفاعل، ويمكننا حذفه.",
        <>
          <VoicePair57
            active={BY_INTRO_57.active.en}
            activeAr={BY_INTRO_57.active.ar}
            passive={BY_INTRO_57.passive.en}
            passiveAr={BY_INTRO_57.passive.ar}
            align="grid"
          />
          <div className="l57-result">
            <span className="l57-result-label">
              <Mixed57 text="بدون فاعل أصلي" />
            </span>
            <p className="l57-result-en" dir="ltr">
              <En57>{BY_INTRO_57.withoutAgent.en}</En57>
            </p>
            <p className="l57-result-ar">
              <Mixed57 text={BY_INTRO_57.withoutAgent.ar} />
            </p>
            <p className="l57-result-why">
              <Mixed57 text={BY_INTRO_57.note} />
            </p>
          </div>
          <Note57 tone="note" title="متى نذكر by؟" text="نذكره عندما تكون هوية الفاعل مهمة." />
          {BY_KEEP_57.map((k) => (
            <div key={k.en} className="l57-result">
              <p className="l57-result-en" dir="ltr">
                <En57>{k.en}</En57>
              </p>
              <p className="l57-result-ar">
                <Mixed57 text={k.ar} />
              </p>
              <p className="l57-result-why">
                <Mixed57 text={k.why} />
              </p>
            </div>
          ))}
        </>,
        { tone: "passive" },
      );

    case "by-drop":
      return wrap(
        "متى نحذف by + Agent؟",
        "أربع حالات نحذف فيها الفاعل الأصلي بلا خسارة معنى.",
        <div className="l57-summary">
          {BY_DROP_57.map((d) => (
            <div key={d.n} className="l57-summary-card">
              <div className="l57-summary-head">
                <span className="l57-summary-no">{d.n}</span>
                <span className="l57-summary-title">
                  <Mixed57 text={d.title} />
                </span>
              </div>
              <span className="l57-summary-en" dir="ltr">
                <En57>{d.en}</En57>
              </span>
              <span className="l57-summary-ar">
                <Mixed57 text={d.ar} />
              </span>
              <span className="l57-summary-ar">
                <Mixed57 text={d.why} />
              </span>
            </div>
          ))}
        </div>,
        { tone: "passive", tip: "غياب by ليس خطأً في المبني للمجهول — الغالب أن غياب be هو الخطأ." },
      );

    case "by-lab":
      return wrap(
        "مختبر by",
        "قرار بلاغي: هل تضيف by أم تحذفها؟ برّر اختيارك بعد التحقق.",
        <ByLab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab" },
      );

    case "pronouns":
      return wrap(
        "تحويل الضمائر بعد by",
        "عندما نذكر الفاعل الأصلي بعد by، يصبح ضمير مفعول به.",
        <>
          <div className="l57-matrix">
            {PRONOUNS_57.map((p) => (
              <div key={p.subject} className="l57-matrix-row">
                <span dir="ltr" className="l57-matrix-subject">
                  <En57>{p.subject}</En57>
                </span>
                <span className="l57-matrix-arrow" aria-hidden="true">
                  →
                </span>
                <span dir="ltr" className="l57-matrix-be is-are">
                  <En57>{p.object}</En57>
                </span>
                <span className="l57-matrix-ar">
                  <Mixed57 text={p.ar} />
                </span>
              </div>
            ))}
          </div>
          {PRONOUN_EXAMPLES_57.map((p) => (
            <div key={p.passive} className="l57-result">
              <VoicePair57 active={p.active} activeAr={p.activeAr} passive={p.passive} passiveAr={p.passiveAr} />
              <p className="l57-result-why">
                <Mixed57 text={p.note} />
              </p>
            </div>
          ))}
          <Note57 tone="warn" title="لماذا؟" text={PRONOUN_WHY_57} />
        </>,
        { tone: "passive" },
      );

    case "singular-plural":
      return wrap(
        "المفعول به: مفرد أم جمع؟",
        "هذه نقطة تسبّب أخطاء كثيرة. قارن الجملتين.",
        <>
          {[SINGULAR_PLURAL_57.singular, SINGULAR_PLURAL_57.plural].map((c) => (
            <div key={c.passive} className="l57-result">
              <p className="l57-result-en" dir="ltr">
                <En57>{c.active}</En57>
              </p>
              <p className="l57-result-ar">
                <Mixed57 text={c.activeAr} />
              </p>
              <Rail57
                size="sm"
                tokens={[
                  { text: c.passive.split(" ").slice(0, 2).join(" "), role: "receiver" },
                  { text: c.passive.split(" ")[2], role: "be" },
                  { text: c.passive.split(" ").slice(3).join(" "), role: "v3" },
                ]}
              />
              <p className="l57-result-en" dir="ltr">
                <En57>{c.passive}</En57>
              </p>
              <p className="l57-result-ar">
                <Mixed57 text={c.passiveAr} />
              </p>
              <p className="l57-result-why">
                <Mixed57 text={c.why} />
              </p>
            </div>
          ))}
          <Note57 tone="note" text={SINGULAR_PLURAL_57.note} />
        </>,
        { tone: "passive" },
      );

    case "transitive":
      return wrap(
        "هل يمكن تحويل كل جملة؟ لا",
        TRANSITIVE_RULE_57,
        <>
          <div className="l57-result">
            <span className="l57-result-label">
              <Mixed57 text="أفعال لا تأخذ مفعولًا به مباشرًا في هذه الاستخدامات" />
            </span>
            <div className="l57-vocab">
              {INTRANSITIVE_VERBS_57.map((v) => (
                <div key={v.v} className="l57-vocab-card">
                  <span className="l57-vocab-en" dir="ltr">
                    <En57>{v.v}</En57>
                  </span>
                  <span className="l57-vocab-ar">
                    <Mixed57 text={v.ar} />
                  </span>
                </div>
              ))}
            </div>
            <ul className="l57-bullets" style={{ marginTop: "0.5rem" }}>
              {INTRANSITIVE_EXAMPLES_57.map((e) => (
                <li key={e.en}>
                  <span className="l57-bullet-mark">▸</span>
                  <span dir="ltr">
                    <En57>{e.en}</En57>
                  </span>
                  <span className="l57-vocab-ar">
                    <Mixed57 text={e.ar} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="l57-pair l57-pair--grid">
            <div className="l57-pair-card l57-pair-card--active">
              <span className="l57-pair-tag">✓ CAN</span>
              <span className="l57-pair-en">
                <En57>{TRANSITIVE_PAIR_57.can.en}</En57>
              </span>
              <span className="l57-pair-ar">
                <Mixed57 text={TRANSITIVE_PAIR_57.can.ar} />
              </span>
              <span className="l57-pair-en" dir="ltr">
                <En57>{TRANSITIVE_PAIR_57.can.passive}</En57>
              </span>
              <span className="l57-pair-ar">
                <Mixed57 text={TRANSITIVE_PAIR_57.can.passiveAr} />
              </span>
            </div>
            <div className="l57-pair-mid" aria-hidden="true">
              <span className="l57-pair-mid-glyph">≠</span>
            </div>
            <div className="l57-pair-card l57-pair-card--passive">
              <span className="l57-pair-tag">✕ CANNOT</span>
              <span className="l57-pair-en">
                <En57>{TRANSITIVE_PAIR_57.cannot.en}</En57>
              </span>
              <span className="l57-pair-ar">
                <Mixed57 text={TRANSITIVE_PAIR_57.cannot.ar} />
              </span>
              <span className="l57-pair-ar">
                <Mixed57 text={TRANSITIVE_PAIR_57.cannot.why} />
              </span>
            </div>
          </div>
          <Note57 tone="warn" title="دقّة في الحكم" text={TRANSITIVE_NOTE_57} />
        </>,
        { tone: "passive" },
      );

    case "transitive-lab":
      return wrap(
        "مختبر الأهلية",
        "هل يمكن تحويل كل جملة؟ ابحث عن المفعول به المباشر قبل أن تقرر.",
        <TransitivityLab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab" },
      );

    case "forms":
      return wrap(
        "النفي والسؤال والجواب القصير",
        "الثلاثة تعمل بنفس المادة: be + V3، مع إضافة not أو نقل be إلى المقدمة.",
        <>
          <div className="l57-result">
            <span className="l57-result-label">NEGATIVE</span>
            <p className="l57-result-en" dir="ltr">
              <En57>{NEGATIVE_FORMULA_57}</En57>
            </p>
            <ul className="l57-bullets" style={{ marginTop: "0.4rem" }}>
              {NEGATIVE_EXAMPLES_57.map((n) => (
                <li key={n.en}>
                  <span className="l57-bullet-mark">✕</span>
                  <span dir="ltr">
                    <En57>{n.en}</En57>
                  </span>
                  <span className="l57-vocab-ar">
                    <Mixed57 text={n.ar} />
                  </span>
                </li>
              ))}
            </ul>
            <ul className="l57-bullets" style={{ marginTop: "0.4rem" }}>
              {NEGATIVE_CONTRACTIONS_57.map((n) => (
                <li key={n.en}>
                  <span className="l57-bullet-mark">▸</span>
                  <span dir="ltr">
                    <En57>{n.en}</En57>
                  </span>
                  <span className="l57-vocab-ar">
                    <Mixed57 text={`${n.short} — ${n.ar}`} />
                  </span>
                </li>
              ))}
            </ul>
            <Note57 tone="warn" title="موضع not" text={NEGATIVE_NOTE_57} />
          </div>

          <div className="l57-result">
            <span className="l57-result-label">QUESTION</span>
            <p className="l57-result-en" dir="ltr">
              <En57>{QUESTION_FORMULA_57}</En57>
            </p>
            <ul className="l57-bullets" style={{ marginTop: "0.4rem" }}>
              {QUESTION_EXAMPLES_57.map((q) => (
                <li key={q.en}>
                  <span className="l57-bullet-mark">?</span>
                  <span dir="ltr">
                    <En57>{q.en}</En57>
                  </span>
                  <span className="l57-vocab-ar">
                    <Mixed57 text={q.ar} />
                  </span>
                </li>
              ))}
            </ul>
            <div className="l57-qa-list" style={{ marginTop: "0.5rem" }}>
              {SHORT_ANSWERS_57.map((s) => (
                <div key={s.q} className="l57-qa">
                  <div className="l57-qa-head">
                    <span className="l57-qa-q" dir="ltr">
                      <En57>{s.q}</En57>
                    </span>
                  </div>
                  <div className="l57-qa-body">
                    <p className="l57-qa-a">
                      <En57>{s.yes}</En57> / <En57>{s.no}</En57>
                    </p>
                    <p className="l57-qa-why">
                      <Mixed57 text={s.qAr} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="l57-result">
            <span className="l57-result-label">
              <Mixed57 text="أسئلة باستخدام أدوات الاستفهام" />
            </span>
            <ul className="l57-bullets">
              {WH_QUESTIONS_57.map((w) => (
                <li key={w.en}>
                  <span className="l57-bullet-mark">▸</span>
                  <span dir="ltr">
                    <En57>{w.en}</En57>
                  </span>
                  <span className="l57-vocab-ar">
                    <Mixed57 text={w.ar} />
                  </span>
                </li>
              ))}
            </ul>
            <Note57 tone="note" text={QUESTION_NOTE_57} />
          </div>
        </>,
        { tip: "في السؤال ينتقل be أولًا؛ في النفي يبقى be ويأتي not بعده. V3 لا يتحرّك في الحالتين." },
      );

    case "neg-lab":
      return wrap(
        "مختبر النفي",
        "أين يقع not؟ اضغط الموضع الذي تظنه صحيحًا ثم تحقّق.",
        <NegLab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab" },
      );

    case "question-lab":
      return wrap(
        "بناء السؤال",
        "رتّب المقاطع لتكوين سؤال صحيح في المبني للمجهول.",
        <QuestionLab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab" },
      );

    case "compare":
      return wrap(
        "الفرق بين Active وPassive في المعنى والتركيز",
        "المعنى قد يبقى نفسه، لكن البؤرة تنتقل. هذه المقارنة تعلّمك الاختيار لا الصيغة فقط.",
        <>
          <div className="l57-compare">
            {COMPARE_PAIRS_57.map((pair) => (
              <div key={pair.active} className="l57-compare-row">
                <span dir="ltr" className="l57-compare-en">
                  <En57>{pair.active}</En57>
                </span>
                <span aria-hidden="true" className="l57-compare-arrow">
                  ⇄
                </span>
                <span dir="ltr" className="l57-compare-en is-passive">
                  <En57>{pair.passive}</En57>
                </span>
                <span className="l57-compare-focus">
                  <Mixed57 text={pair.focus} />
                </span>
              </div>
            ))}
          </div>
          <Note57 tone="note" title="عند الترجمة" text={TRANSLATION_NOTE_57} />
          <div className="l57-vocab">
            {TRANSLATION_STYLES_57.map((t) => (
              <div key={t.style + t.ar} className="l57-vocab-card">
                <span className="l57-vocab-en">{t.style}</span>
                <span className="l57-vocab-ar">
                  <Mixed57 text={`${t.ar} — ${t.example}`} />
                </span>
              </div>
            ))}
          </div>
        </>,
        { tone: "neutral" },
      );

    case "compare-lab":
      return wrap(
        "مختبر التركيز",
        "اقرأ المطلوب، ثم اختر الجملة التي تؤدي هذا التركيز.",
        <CompareLab57 workspace={workspace} setLab={setLab} />,
        { tone: "lab", tip: "المبني للمجهول ليس «أفضل» من المعلوم؛ الأفضل هو ما يخدم تركيزك في السياق." },
      );

    case "errors":
      return wrap(
        "ستة أخطاء شائعة",
        "كل خطأ هنا يعالج نقطة تعليمية محددة. اضغط «أظهر التصحيح» بعد أن تحاول بنفسك.",
        <>
          {COMMON_ERRORS_57.map((e) => (
            <div key={e.id} className="l57-result">
              <span className="l57-result-label">
                <Mixed57 text={e.title} />
              </span>
              <div className="l57-error-compare">
                <span className="l57-error-line is-bad">
                  <En57>{e.wrong}</En57>
                </span>
                <span className="l57-error-arrow" aria-hidden="true">
                  ↓
                </span>
                <span className="l57-error-line is-ok">
                  <En57>{e.right}</En57>
                </span>
              </div>
              <Reveal57 label="لماذا؟" hiddenLabel="أخفِ السبب">
                <p className="l57-result-why">
                  <Mixed57 text={e.why} />
                </p>
              </Reveal57>
            </div>
          ))}
        </>,
        { tone: "passive" },
      );

    case "error-lab":
      return wrap(
        "اكتشف الخطأ",
        "اضغط المقطع الخاطئ، ثم تحقّق. ستقرأ التصحيح والسبب.",
        <ErrorLab57 workspace={workspace} setLab={setLab} errors={COMMON_ERRORS_57} />,
        { tone: "lab" },
      );

    case "dialogue":
      return wrap(
        "حوار تطبيقي: At the School",
        "حوار في المدرسة يستخدم المبني للمجهول في الأسئلة والأجوبة. اضغط «الترجمة» عند الحاجة.",
        <Dialogue57 />,
        { tone: "passive" },
      );

    case "dialogue-qa":
      return wrap(
        "أسئلة فهم الحوار",
        "أجب أولًا بصوتك، ثم اكشف الجواب والتفسير.",
        <DialogueQuestions57 />,
        { tone: "neutral" },
      );

    case "reading":
      return wrap(
        "قراءة: How Products Are Made",
        "كيف تُصنع المنتجات؟ لاحظ كيف يملأ المبني للمجهول النص كله.",
        <Reading57 />,
        { tone: "passive", tip: "اقرأ الجملة وحدّد: أين be؟ أين V3؟ وهل ذُكر الفاعل بـ by أم حُذف؟" },
      );

    case "vocabulary":
      return wrap(
        "شرح المفردات",
        "ستة عشر مصطلحًا من قطعة القراءة.",
        <Vocabulary57 />,
        { tone: "neutral" },
      );

    case "reading-qa":
      return wrap(
        "أسئلة القراءة",
        "سبعة أسئلة على النص، مع الإجابة والتفسير.",
        <ReadingQuestions57 />,
        { tone: "neutral" },
      );

    case "reading-hunt":
      return wrap(
        "صيد التراكيب",
        "ابحث في النص عن جملة Passive واكتبها، ثم اكشف النماذج.",
        <ReadingHunt57 onTouch={() => onTouchGroup("reading-hunt")} />,
        { tone: "lab" },
      );

    case "practice-1":
    case "practice-2":
    case "practice-3":
    case "practice-4":
    case "practice-5":
    case "practice-6":
    case "practice-7":
    case "practice-8":
    case "practice-9":
    case "practice-10": {
      const n = Number(slide.id.replace("practice-", ""));
      const group = PRACTICE_GROUPS_57[n - 1];
      return wrap(
        group.title,
        group.instruction,
        <PracticeSet57 group={group} store={store} />,
        { tone: "lab", tip: "التحقق فردي لكل بند. المحاولة أولًا، ثم النموذج — هذا ترتيب التعلّم الصحيح." },
      );
    }

    case "test":
      return wrap(
        "الاختبار النهائي — 15 سؤالًا",
        "لا تظهر أي علامة صح أو خطأ ولا درجة ولا شرح قبل ضغط «تصحيح الاختبار». أعد الاختبار كما تشاء، وتنقّل بين الخطوات دون أن تفقد إجاباتك.",
        <div className="l57-test-slot">
          <Note57
            tone="note"
            title="قبل أن تبدأ"
            text="الاختبار أدناه مباشرة. إجاباتك محفوظة طوال الجلسة حتى لو انتقلت إلى خطوة أخرى وعدت، ولا يُكشف أي تصحيح قبل التسليم."
          />
        </div>,
        { tone: "test" },
      );

    case "rating":
      return wrap("تقييم النتيجة", "ما الذي تعنيه درجتك في الاختبار الأصلي؟", <Rating57 />, { tone: "neutral" });

    case "writing":
      return wrap(
        "Writing Task",
        "مهمة كتابة موجهة بخمسة شروط، مع عدّاد كلمات وقائمة تحقق.",
        <Writing57 store={store} />,
        { tone: "neutral" },
      );

    case "speaking":
      return wrap(
        "Speaking Task",
        "أجب عن كل سؤال بجمل كاملة، واستخدم المبني للمجهول في كل إجابة.",
        <Speaking57 store={store} />,
        { tone: "neutral" },
      );

    case "summary":
      return wrap(
        "الملخص النهائي للدرس 57",
        "سبع نقاط تجمع الدرس كله قبل أن تنتقل إلى الدرس القادم.",
        <Summary57 />,
        { tone: "passive" },
      );

    case "teacher":
      return wrap(
        "فضاء المعلم",
        "دليل التدريس ومفتاح الاختبار والتمارين — محمي بكلمة مرور المعلم.",
        <TeacherArea57 />,
        { tone: "neutral" },
      );

    case "progress":
      return wrap(
        "موقفك في المنهج",
        "أين أنت الآن، وما الذي ينتظرك في الدرس القادم؟",
        <Progress57 />,
        { tone: "neutral" },
      );

    default:
      return wrap(slide.title, "", <Note57 text="هذه الخطوة قيد الإعداد." />);
  }
}

/* ============================================================
   الدرس 57
   ============================================================ */

export default function Lesson57({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [workspace, setWorkspace] = useState<Workspace57>(initialWorkspace57);
  const mainRef = useRef<HTMLElement | null>(null);

  const goToStep = useCallback((target: number) => {
    const nextStep = Math.max(0, Math.min(STEP_COUNT_57 - 1, target));
    setStep(nextStep);
    setVisited((prev) => (prev.has(nextStep) ? prev : new Set(prev).add(nextStep)));
    setMenuOpen(false);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);

  const previous = useCallback(() => goToStep(step - 1), [goToStep, step]);
  const next = useCallback(() => goToStep(step + 1), [goToStep, step]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        return;
      }
      if (menuOpen || target?.isContentEditable) return;
      if (target && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(target.tagName)) return;
      if (event.key === "ArrowLeft" || event.key === " ") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        previous();
      } else if (event.key === "Home") {
        event.preventDefault();
        goToStep(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToStep(STEP_COUNT_57 - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, next, previous]);

  /** تحديث قيمة مختبر — ثمّ التحقق يمرّر checked=true */
  const setLab = useCallback((id: string, value: string, checked = false) => {
    setWorkspace((prev) => ({
      ...prev,
      labs: { ...prev.labs, [id]: { value, checked: checked ? true : prev.labs[id]?.checked ?? false } },
    }));
  }, []);

  const setPractice = useCallback((id: string, value: string, checked = false) => {
    setWorkspace((prev) => {
      if (id === "writing-text") return { ...prev, writing: value };
      if (id.startsWith("writing-check-")) {
        const key = id.replace("writing-check-", "");
        return { ...prev, writingChecks: { ...prev.writingChecks, [key]: value === "1" } };
      }
      if (id.startsWith("speak-")) {
        const key = `s${id.replace("speak-", "")}`;
        return { ...prev, speaking: { ...prev.speaking, [key]: value } };
      }
      return {
        ...prev,
        practice: { ...prev.practice, [id]: { value, checked: checked ? true : prev.practice[id]?.checked ?? false } },
      };
    });
  }, []);

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_57.map((station) => ({
        section: station.title,
        items: SLIDES_57.flatMap((slide, index) =>
          slide.station === station.id
            ? [
                {
                  index,
                  title: <Mixed57 text={slide.title} />,
                  mascot: <span aria-hidden="true">{slide.emblem}</span>,
                  navId: slide.id,
                },
              ]
            : [],
        ),
      })).filter((g) => g.items.length > 0),
    [],
  );

  const slide = SLIDES_57[step] ?? SLIDES_57[0];
  const station = STATIONS_57.find((s) => s.id === slide.station)?.title ?? "";

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson57"
      rootDir="rtl"
      rootDataLesson={57}
      railAriaLabel="فهرس خطوات الدرس 57"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={
        <span>
          الدرس 57 <En57 className="text-sm">· PASSIVE</En57>
        </span>
      }
      railSubtitle={
        <span className="text-xs font-semibold text-slate-400">
          <Mixed57 text={`${visited.size} / ${STEP_COUNT_57} خطوة زرتها`} />
        </span>
      }
      groups={groups}
      activeIndex={step}
      onSelectStep={goToStep}
      onExit={onExit}
      isMenuOpen={menuOpen}
      onMenuOpenChange={setMenuOpen}
      headerContent={<Mixed57 text={`${station} · ${slide.title}`} />}
      progress={((step + 1) / STEP_COUNT_57) * 100}
      counter={
        <bdi dir="ltr">
          {step + 1} / {STEP_COUNT_57}
        </bdi>
      }
      counterDir="ltr"
      contentKey={step}
      contentArea={slide.id}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === STEP_COUNT_57 - 1}
      mainRef={mainRef}
      mainId="l57-main"
      mainAfter={
        // الاختبار النهائي يبقى مُركَّبًا دائمًا (وهو مخفي خارج خطوته) حتى
        // تحفظ إجاباته أثناء التنقل — سلوك نظام المشترك نفسه، بلا نظام جديد.
        <div hidden={slide.id !== "test"} className="lesson-content-container mt-4" data-l57-test="57">
          <FinalTest lesson={57} questions={TEST_57} accent="bg-slate-900" />
        </div>
      }
    >
      <Body57
        slide={slide}
        index={step}
        station={station}
        workspace={workspace}
        setLab={setLab}
        setPractice={setPractice}
        onTouchGroup={() => undefined}
        onStart={() => goToStep(1)}
        onTest={() => goToStep(TEST_STEP_57)}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}

// تصدير خريطة الدرس للتدقيق الآلي (بدون أي محتوى للطالب)
export const LESSON_57_STEP_COUNT = STEP_COUNT_57;
export const LESSON_57_SLIDES = SLIDES_57;
export const LESSON_57_STATIONS = STATIONS_57;
