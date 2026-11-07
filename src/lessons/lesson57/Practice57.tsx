/**
 * Lesson 57 — التمارين، الحوار، القراءة، الكتابة، التحدث، والملخص.
 *
 * قاعدة الكشف: لا يظهر النموذج ولا السبب إلا بعد ضغط «تحقّق» أو بعد
 * محاولة فعلية (كتابة/اختيار). التصحيح فردي لكل بند، لا جماعي.
 */
import { useMemo, useState } from "react";
import { En57, Mixed57, Note57, RoleTag57, AnswerCard57, Formula57 } from "./kit57";
import type { PracticeGroup57, PracticeItem57 } from "./practiceData57";
import {
  DIALOGUE_57,
  DIALOGUE_QA_57,
  READING_57,
  READING_AR_57,
  READING_TITLE_57,
  READING_QA_57,
  SUMMARY_57,
  VOCABULARY_57,
  WRITING_TASK_57,
  SPEAKING_TASK_57,
} from "./content57";
import type { Workspace57 } from "./labs57";

export type PracticeStore = {
  workspace: Workspace57;
  setPractice: (id: string, value: string, checked?: boolean) => void;
  onTouchGroup: (id: string) => void;
};

const normalize = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["'«»“”]+|["'«»“”.!?،,؛;]+$/gu, "")
    .toLowerCase();

/* ============================================================
   بند واحد
   ============================================================ */

function ItemCard({
  item,
  group,
  store,
  index,
}: {
  item: PracticeItem57;
  group: PracticeGroup57;
  store: PracticeStore;
  index: number;
}) {
  const state = store.workspace.practice[item.id];
  const value = state?.value ?? "";
  const checked = state?.checked ?? false;
  const set = (v: string, check = false) => {
    store.setPractice(item.id, v, check);
    store.onTouchGroup(group.id);
  };

  /* ---------- تحليل الجملة ---------- */
  if (group.kind === "analyse" && item.parts) {
    const chosen = value ? JSON.parse(value) : { subject: "", verb: "", object: "" };
    const roles = [
      { key: "subject", label: "Subject · الفاعل" },
      { key: "verb", label: "Verb · الفعل" },
      { key: "object", label: "Object · المفعول به" },
    ] as const;
    const options = [item.parts.subject, item.parts.verb, item.parts.object];
    const complete = roles.every((r) => chosen[r.key]);
    const right =
      chosen.subject === item.parts.subject && chosen.verb === item.parts.verb && chosen.object === item.parts.object;
    return (
      <div className="l57-practice-card">
        <div className="l57-practice-head">
          <span className="l57-practice-no" aria-hidden="true">
            {index + 1}
          </span>
          <span dir="ltr" className="l57-practice-en">
            <En57>{item.prompt}</En57>
          </span>
        </div>
        <div className="l57-analyse-grid">
          {roles.map((r) => (
            <label key={r.key} className="l57-analyse-field">
              <span>{r.label}</span>
              <select
                dir="ltr"
                disabled={checked}
                value={chosen[r.key] ?? ""}
                onChange={(e) => set(JSON.stringify({ ...chosen, [r.key]: e.target.value }), false)}
              >
                <option value="">— اختر —</option>
                {options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <div className="l57-practice-actions">
          <button type="button" className="l57-btn l57-btn--dark" disabled={!complete || checked} onClick={() => set(value, true)}>
            تحقّق
          </button>
        </div>
        {checked && (
          <div className={`l57-practice-feedback ${right ? "is-ok" : "is-bad"}`} role="status">
            <b>{right ? "✓ تحليل صحيح." : "✕ راجع الأدوار."}</b>{" "}
            <Mixed57 text={item.answer} />
            <p>
              <Mixed57 text={item.why} />
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ---------- اختيار (صنّف / be / اختر الإجابة) ---------- */
  const isChoice = group.kind === "classify" || group.kind === "fillBe" || group.kind === "choose";
  if (isChoice && item.options) {
    const right = value === item.answer;
    return (
      <div className="l57-practice-card">
        <div className="l57-practice-head">
          <span className="l57-practice-no" aria-hidden="true">
            {index + 1}
          </span>
          <span dir="ltr" className="l57-practice-en">
            <En57>{item.prompt}</En57>
          </span>
        </div>
        <div className={`l57-options ${item.options.length === 2 ? "l57-options--2" : "l57-options--4"}`}>
          {item.options.map((o) => (
            <button
              key={o}
              type="button"
              dir={group.kind === "classify" ? "rtl" : "ltr"}
              disabled={checked}
              aria-pressed={value === o}
              className={`l57-opt ${value === o ? "is-on" : ""} ${
                checked && o === item.answer ? "is-solution" : checked && value === o ? "is-miss" : ""
              }`.trim()}
              onClick={() => set(o, false)}
            >
              <span>
                <En57>{o}</En57>
              </span>
            </button>
          ))}
        </div>
        <div className="l57-practice-actions">
          <button type="button" className="l57-btn l57-btn--dark" disabled={!value || checked} onClick={() => set(value, true)}>
            تحقّق
          </button>
        </div>
        {checked && (
          <div className={`l57-practice-feedback ${right ? "is-ok" : "is-bad"}`} role="status">
            <b>{right ? "✓ إجابة صحيحة." : `✕ الإجابة الصحيحة: ${item.answer}`}</b>
            <p>
              <Mixed57 text={item.why} />
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ---------- كتابة (تحويل / عكس / نفي / سؤال / V3) ---------- */
  const textRight = normalize(value) === normalize(item.answer);
  return (
    <div className="l57-practice-card">
      <div className="l57-practice-head">
        <span className="l57-practice-no" aria-hidden="true">
          {index + 1}
        </span>
        <span dir="ltr" className="l57-practice-en">
          <En57>{item.prompt}</En57>
        </span>
      </div>
      <div className="l57-write-row">
        <input
          type="text"
          dir="ltr"
          disabled={checked}
          value={value}
          aria-label={`إجابة البند ${index + 1}`}
          placeholder={group.kind === "fillV3" ? "V3 …" : "اكتب الجملة كاملة…"}
          onChange={(e) => set(e.target.value, false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim() && !checked) set(value, true);
          }}
        />
        <button type="button" className="l57-btn l57-btn--dark" disabled={!value.trim() || checked} onClick={() => set(value, true)}>
          تحقّق
        </button>
      </div>
      {checked && (
        <div className={`l57-practice-feedback ${textRight ? "is-ok" : "is-bad"}`} role="status">
          <b>{textRight ? "✓ مطابق للنموذج." : "النموذج:"}</b>
          <span dir="ltr" className="l57-practice-model">
            <En57>{item.answer}</En57>
          </span>
          <p>
            <Mixed57 text={item.why} />
          </p>
          {!textRight && (
            <p className="l57-practice-hint">
              <Mixed57 text="قارن إجابتك بالنموذج كلمة بكلمة؛ قد تصحّ صياغات أخرى مكافئة." />
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function PracticeSet57({ group, store }: { group: PracticeGroup57; store: PracticeStore }) {
  const done = group.items.filter((item) => store.workspace.practice[item.id]?.checked).length;
  return (
    <div className="l57-practice" data-practice-set={group.id}>
      {/* شريط تقدم المجموعة: تعليمات العنوان أعلاه، فلا نكرّرها هنا. */}
      <div className="l57-practice-top">
        <span className="l57-practice-progress" aria-hidden="true">
          <span className="l57-practice-bar" style={{ width: `${Math.round((done / group.items.length) * 100)}%` }} />
        </span>
        <span className="l57-practice-progress-label">
          <bdi dir="ltr">
            {done}/{group.items.length}
          </bdi>{" "}
          <Mixed57
            text={
              done === group.items.length ? "مكتمل ✓" : done === 0 ? "لم يبدأ بعد" : "تم التحقق"
            }
          />
        </span>
      </div>
      <div className="l57-practice-list">
        {group.items.map((item, i) => (
          <ItemCard key={item.id} item={item} group={group} store={store} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   الحوار
   ============================================================ */

export function Dialogue57() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <div className="l57-dialogue" data-dialogue="57">
      {DIALOGUE_57.map((line, i) => {
        const teacher = line.who === "Teacher";
        return (
          <div key={i} className={`l57-bubble ${teacher ? "l57-bubble--t" : "l57-bubble--s"}`}>
            <span className="l57-bubble-who">{teacher ? "المعلم" : "الطالب"}</span>
            <span className="l57-bubble-en" dir="ltr">
              <En57>{line.en}</En57>
            </span>
            <button
              type="button"
              className="l57-bubble-toggle"
              aria-expanded={!!revealed[i]}
              onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
            >
              {revealed[i] ? "أخفِ الترجمة" : "الترجمة"}
            </button>
            {revealed[i] && (
              <span className="l57-bubble-ar" dir="rtl">
                <Mixed57 text={line.ar} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function DialogueQuestions57() {
  return (
    <div className="l57-qa-list">
      {DIALOGUE_QA_57.map((qa, i) => (
        <AnswerCard57 key={qa.q} index={i + 1} question={qa.q} answer={qa.a} why={qa.why} />
      ))}
    </div>
  );
}

/* ============================================================
   القراءة
   ============================================================ */

export function Reading57() {
  const [showAr, setShowAr] = useState(false);
  return (
    <div className="l57-reading" data-reading="57">
      <div className="l57-reading-head">
        <span className="l57-reading-kicker" dir="ltr">
          READING · 57
        </span>
        <h2>
          <En57>{READING_TITLE_57}</En57>
        </h2>
        <button type="button" className="l57-btn l57-btn--ghost" aria-pressed={showAr} onClick={() => setShowAr((v) => !v)}>
          {showAr ? "أخفِ الترجمة العربية" : "أظهر الترجمة العربية"}
        </button>
      </div>
      <div className="l57-reading-body">
        {READING_57.map((p, i) => (
          <div key={i} className="l57-reading-para">
            <span className="l57-reading-no" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className="l57-reading-en" dir="ltr">
                <En57>{p}</En57>
              </p>
              {showAr && (
                <p className="l57-reading-ar" dir="rtl">
                  <Mixed57 text={READING_AR_57[i]} />
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Vocabulary57() {
  return (
    <div className="l57-vocab">
      {VOCABULARY_57.map((v) => (
        <div key={v.en} className="l57-vocab-card">
          <span dir="ltr" className="l57-vocab-en">
            <En57>{v.en}</En57>
          </span>
          <span className="l57-vocab-ar">
            <Mixed57 text={v.ar} />
          </span>
        </div>
      ))}
    </div>
  );
}

export function ReadingQuestions57() {
  return (
    <div className="l57-qa-list">
      {READING_QA_57.map((qa, i) => (
        <AnswerCard57 key={qa.q} index={i + 1} question={qa.q} answer={qa.a} why={qa.why} />
      ))}
    </div>
  );
}

/** صيد التراكيب: الطالب يكتب مثالًا من النص ثم يرى النماذج. */
export function ReadingHunt57({ onTouch }: { onTouch: () => void }) {
  const [value, setValue] = useState("");
  const [shown, setShown] = useState(false);
  return (
    <div className="l57-hunt">
      <p className="l57-lab-line">
        <Mixed57 text="ابحث في قطعة القراءة عن جملة Passive، واكتبها هنا أولًا، ثم اكشف النماذج للمقارنة." />
      </p>
      <div className="l57-write-row">
        <input
          type="text"
          dir="ltr"
          value={value}
          aria-label="مثال من قطعة القراءة"
          placeholder="Type a passive sentence from the passage…"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="button" className="l57-btn l57-btn--dark" disabled={!value.trim()} onClick={() => setShown(true)}>
          اكشف النماذج
        </button>
      </div>
      {shown && (
        <div className="l57-hunt-list" role="status" onClickCapture={onTouch}>
          {[
            "Many products are made in factories around the world.",
            "Raw materials are collected and transported to factories.",
            "Machines are operated by trained workers.",
            "The products are checked carefully before they are packed.",
            "Computers are used to control the production process.",
            "The products are sold to customers.",
            "Some products are made by hand.",
          ].map((s) => (
            <span key={s} dir="ltr" className="l57-hunt-item">
              <En57>{s}</En57>
            </span>
          ))}
          <p className="l57-hint">
            <Mixed57 text="كل الأمثلة تركيبها Object + be + V3، ولاحظ أيّها ذكر الفاعل بـ by وأيّها حذفه." />
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   الكتابة
   ============================================================ */

export function Writing57({ store }: { store: PracticeStore }) {
  const text = store.workspace.writing;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const checks = store.workspace.writingChecks;
  const passiveHits = (text.match(/\b(am|is|are)\s+(not\s+)?[a-z]+ed\b|\b(am|is|are)\s+(not\s+)?(made|built|sold|written|used|taught|checked|prepared|given|taken|done|spoken|produced|delivered|washed|opened|cleaned)\b/gi) || []).length;
  const byHits = (text.match(/\bby\s+\w+/gi) || []).length;
  return (
    <div className="l57-writing" data-writing="57">
      <div className="l57-writing-head">
        <h2 dir="ltr">
          <En57>{WRITING_TASK_57.title}</En57>
        </h2>
        <span className="l57-writing-ar">
          <Mixed57 text={WRITING_TASK_57.titleAr} />
        </span>
        <span className="l57-mini-chip">{WRITING_TASK_57.words}</span>
      </div>
      <p className="l57-lab-line">
        <Mixed57 text={WRITING_TASK_57.intro} />
      </p>
      <ol className="l57-bullets l57-bullets--ordered">
        {WRITING_TASK_57.requirements.map((r) => (
          <li key={r}>
            <span className="l57-bullet-mark" aria-hidden="true">
              ▸
            </span>
            <span>
              <Mixed57 text={r} />
            </span>
          </li>
        ))}
      </ol>

      <div className="l57-starter">
        <span className="l57-starter-tag">
          <Mixed57 text="بداية مقترحة" />
        </span>
        <p dir="ltr" className="l57-reading-en">
          <En57>{WRITING_TASK_57.starterEn}</En57>
        </p>
        <p dir="rtl" className="l57-reading-ar">
          <Mixed57 text={WRITING_TASK_57.starterAr} />
        </p>
      </div>

      <textarea
        dir="ltr"
        className="l57-writing-area"
        aria-label="مسودة فقرة الكتابة"
        placeholder="Write your paragraph here…"
        value={text}
        onChange={(e) => store.setPractice("writing-text", e.target.value)}
      />
      <div className="l57-writing-meter">
        <span dir="ltr">{words} / 100–130 words</span>
        <span>
          <Mixed57 text={`جمل Passive مرشّحة: ${passiveHits}`} />
        </span>
        <span>
          <Mixed57 text={`مواضع by: ${byHits}`} />
        </span>
      </div>

      <div className="l57-checklist">
        {WRITING_TASK_57.checklist.map((c) => (
          <label key={c.id} className={`l57-check ${checks[c.id] ? "is-on" : ""}`}>
            <input
              type="checkbox"
              checked={!!checks[c.id]}
              onChange={(e) => store.setPractice(`writing-check-${c.id}`, e.target.checked ? "1" : "")}
            />
            <span>
              <Mixed57 text={c.label} />
            </span>
          </label>
        ))}
      </div>
      <Note57
        tone="note"
        text="المراجعة الذاتية هنا لتوجيهك لا لحساب درجة. إذا وجدت جملة Active أفضل من Passive في موضع، فأبقِها Active — الاختيار يعتمد على التركيز المطلوب."
      />
    </div>
  );
}

/* ============================================================
   التحدث
   ============================================================ */

export function Speaking57({ store }: { store: PracticeStore }) {
  return (
    <div className="l57-speaking" data-speaking="57">
      <p className="l57-lab-line">
        <Mixed57 text={SPEAKING_TASK_57.intro} />
      </p>
      <div className="l57-speak-example">
        <span className="l57-speak-q" dir="ltr">
          <En57>{SPEAKING_TASK_57.example.q}</En57>
        </span>
        <span className="l57-speak-a" dir="ltr">
          <En57>{SPEAKING_TASK_57.example.a}</En57>
        </span>
        <span className="l57-speak-ar">
          <Mixed57 text={SPEAKING_TASK_57.example.ar} />
        </span>
      </div>
      <div className="l57-speak-list">
        {SPEAKING_TASK_57.questions.map((q, i) => (
          <div key={q} className="l57-speak-card">
            <span className="l57-speak-no" aria-hidden="true">
              {i + 1}
            </span>
            <span className="l57-speak-q" dir="ltr">
              <En57>{q}</En57>
            </span>
            <textarea
              dir="ltr"
              aria-label={`إجابة التحدث ${i + 1}`}
              placeholder="Answer in a full sentence…"
              value={store.workspace.speaking[`s${i}`] ?? ""}
              onChange={(e) => store.setPractice(`speak-${i}`, e.target.value)}
            />
          </div>
        ))}
      </div>
      <ul className="l57-bullets">
        {SPEAKING_TASK_57.tips.map((t) => (
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
    </div>
  );
}

/* ============================================================
   الملخص النهائي
   ============================================================ */

export function Summary57() {
  return (
    <div className="l57-summary" data-summary="57">
      {SUMMARY_57.map((s) => (
        <div key={s.title} className="l57-summary-card">
          <div className="l57-summary-head">
            <span className="l57-summary-no">{s.n}</span>
            <span className="l57-summary-title">
              <Mixed57 text={s.title} />
            </span>
          </div>
          <span className="l57-summary-formula" dir="ltr">
            <En57>{s.formula}</En57>
          </span>
          <span className="l57-summary-en" dir="ltr">
            <En57>{s.example}</En57>
          </span>
          <span className="l57-summary-ar">
            <Mixed57 text={s.ar} />
          </span>
        </div>
      ))}
      <Formula57
        parts={[
          { text: "OBJECT", role: "receiver", sub: "المفعول به" },
          { text: "be", role: "be", sub: "am / is / are" },
          { text: "V3", role: "v3", sub: "التصريف الثالث" },
        ]}
        caption="هذه هي القاعدة التي ستبني عليها كل دروس المبني للمجهول القادمة."
      />
      <div className="l57-lab-bar">
        <RoleTag57 role="receiver" />
        <RoleTag57 role="be" />
        <RoleTag57 role="v3" />
        <RoleTag57 role="by" />
      </div>
    </div>
  );
}
