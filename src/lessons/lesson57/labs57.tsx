/**
 * Lesson 57 — المختبرات التفاعلية (The Voice Shift Labs)
 *
 * كل مختبر هنا يقيس مهارة واحدة من مهارات الدرس، وكلها تتبع قاعدتين:
 *   ① لا يظهر أي حكم (صح/خطأ) ولا شرح قبل ضغط زر التحقق.
 *   ② الأنماط مختلفة بقصد: اختيار · تحليل · بناء تدريجي · اكتشاف خطأ ·
 *      تحديد موضع · ترتيب · قرار بلاغي. ليست كلها اختيارًا من متعدد.
 *
 * الحالة في المكوّن الأب (Lesson57) عبر Workspace57 كي تبقى عند التنقل.
 */
import { useMemo, useState } from "react";
import { En57, Mixed57, Note57, RoleTag57, ShiftArrow57, Block57, Plus57, Rail57 } from "./kit57";
import type { Error57 } from "./content57";

/* ============================================================
   حالة المختبرات
   ============================================================ */

export type LabValue57 = { value: string; checked: boolean };
export type Workspace57 = {
  labs: Record<string, LabValue57>;
  practice: Record<string, LabValue57>;
  writing: string;
  writingChecks: Record<string, boolean>;
  speaking: Record<string, string>;
};
export const initialWorkspace57: Workspace57 = {
  labs: {},
  practice: {},
  writing: "",
  writingChecks: {},
  speaking: {},
};

type LabProps = {
  workspace: Workspace57;
  setLab: (id: string, value: string, checked?: boolean) => void;
  onDone?: () => void;
};

const verdict = (ok: boolean, right: string, wrong: string) => (
  <p className={`l57-verdict ${ok ? "is-ok" : "is-bad"}`} role="status">
    <span aria-hidden="true">{ok ? "✓" : "✕"}</span>
    <Mixed57 text={ok ? right : wrong} />
  </p>
);

function CheckButton({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children?: React.ReactNode }) {
  return (
    <button type="button" className="l57-btn l57-btn--dark" onClick={onClick} disabled={disabled}>
      {children ?? "تحقّق"}
    </button>
  );
}

/* ============================================================
   ① FocusLab — من الذي قام بالفعل؟
   ============================================================ */

export function FocusLab57() {
  const [mode, setMode] = useState<"active" | "passive">("active");
  const active = mode === "active";
  const tokens = [
    active
      ? { text: "Ali", role: "agent" as const }
      : { text: "The room", role: "receiver" as const },
    active ? { text: "cleans", role: "v3" as const } : { text: "is cleaned", role: "v3" as const },
    active ? { text: "the room.", role: "receiver" as const } : { text: "by Ali.", role: "by" as const },
  ];
  return (
    <div className="l57-lab" data-lab="focus">
      <div className="l57-toggle">
        <button type="button" aria-pressed={active} className={active ? "is-on" : ""} onClick={() => setMode("active")}>
          <span dir="ltr">ACTIVE</span>
          <em>من قام بالفعل؟</em>
        </button>
        <button type="button" aria-pressed={!active} className={!active ? "is-on" : ""} onClick={() => setMode("passive")}>
          <span dir="ltr">PASSIVE</span>
          <em>على ماذا وقع الفعل؟</em>
        </button>
      </div>

      <div className="l57-focus-stage" aria-live="polite">
        <div className="l57-focus-question">
          {active ? "من الذي قام بالفعل؟" : "على ماذا وقع الفعل؟"}
        </div>
        <div className="l57-focus-answer" dir="ltr">
          <En57>{active ? "Ali" : "the room"}</En57>
        </div>
        <Rail57 tokens={tokens} size="md" />
        <p className="l57-focus-ar">
          <Mixed57 text={active ? "علي ينظف الغرفة." : "الغرفة يتم تنظيفها بواسطة علي."} />
        </p>
      </div>

      <Note57
        tone="note"
        text={
          active
            ? "نبدأ بالفاعل لأننا نريد أن نعرف من قام بالفعل. هذه هي البؤرة في Active Voice."
            : "المعنى الأساسي لم يتغيّر، لكن البؤرة انتقلت إلى الغرفة. هذه هي فكرة Passive Voice: نُقدّم ما وقع عليه الفعل."
        }
      />
      <p className="l57-hint">
        <Mixed57 text="جرّب الزرين ذهابًا وإيابًا وراقب بطاقة الغرفة: في المبني للمجهول تصبح أول الجملة." />
      </p>
    </div>
  );
}

/* ============================================================
   ② AnalysisLab — تحديد Subject / Verb / Object
   ============================================================ */

type AnalysisTask57 = { id: string; ar: string; tokens: { text: string; role: "subject" | "verb" | "object" }[] };

export const ANALYSIS_TASKS_57: AnalysisTask57[] = [
  {
    id: "a1",
    ar: "المعلم يشرح الدرس.",
    tokens: [
      { text: "The teacher", role: "subject" },
      { text: "explains", role: "verb" },
      { text: "the lesson.", role: "object" },
    ],
  },
  {
    id: "a2",
    ar: "كسر الولد النافذة.",
    tokens: [
      { text: "The boy", role: "subject" },
      { text: "broke", role: "verb" },
      { text: "the window.", role: "object" },
    ],
  },
  {
    id: "a3",
    ar: "العمال يبنون المنازل.",
    tokens: [
      { text: "The workers", role: "subject" },
      { text: "build", role: "verb" },
      { text: "houses.", role: "object" },
    ],
  },
  {
    id: "a4",
    ar: "الشركة تنتج السيارات.",
    tokens: [
      { text: "The company", role: "subject" },
      { text: "produces", role: "verb" },
      { text: "cars.", role: "object" },
    ],
  },
];

const ROLE_LABEL_57: Record<"subject" | "verb" | "object", string> = {
  subject: "Subject · الفاعل",
  verb: "Verb · الفعل",
  object: "Object · المفعول به",
};

export function AnalysisLab57({ workspace, setLab }: LabProps) {
  const [taskIndex, setTaskIndex] = useState(0);
  const task = ANALYSIS_TASKS_57[taskIndex];
  const [role, setRole] = useState<"subject" | "verb" | "object">("subject");
  const state = workspace.labs[`analysis-${task.id}`];
  const assigned: Record<string, string> = state ? JSON.parse(state.value || "{}") : {};
  const checked = state?.checked ?? false;

  const assign = (tokenText: string) => {
    if (checked) return;
    const next = { ...assigned };
    Object.keys(next).forEach((k) => {
      if (next[k] === role) delete next[k];
    });
    next[tokenText] = role;
    setLab(`analysis-${task.id}`, JSON.stringify(next), false);
  };

  const complete = task.tokens.every((t) => assigned[t.text]);
  const allRight = task.tokens.every((t) => assigned[t.text] === t.role);

  return (
    <div className="l57-lab" data-lab="analysis">
      <div className="l57-lab-bar">
        <RoleTag57 role="subject" />
        <RoleTag57 role="verb" />
        <RoleTag57 role="object" />
      </div>
      <p className="l57-lab-line">
        <Mixed57 text="اختر الدور أولًا، ثم اضغط الكلمة التي تلعبه. السلاسل الثلاث تبقى في مكانها — أنت تُسنِد الأدوار فقط." />
      </p>

      <div className="l57-role-picker" role="group" aria-label="اختر الدور">
        {(["subject", "verb", "object"] as const).map((r) => (
          <button key={r} type="button" aria-pressed={role === r} className={role === r ? "is-on" : ""} onClick={() => setRole(r)}>
            {ROLE_LABEL_57[r]}
          </button>
        ))}
      </div>

      <div className="l57-analysis-tokens">
        {task.tokens.map((t) => {
          const picked = assigned[t.text];
          const ok = checked && picked === t.role;
          const bad = checked && picked && picked !== t.role;
          return (
            <button
              key={t.text}
              type="button"
              dir="ltr"
              disabled={checked}
              onClick={() => assign(t.text)}
              className={`l57-analysis-token ${picked ? `is-${picked}` : ""} ${ok ? "is-ok" : ""} ${bad ? "is-bad" : ""}`}
            >
              <En57>{t.text}</En57>
              <span className="l57-analysis-tag">
                {picked ? (checked ? (picked === t.role ? "✓ " : "✕ ") : "") : ""}
                {picked ? ROLE_LABEL_57[picked as "subject"] : "—"}
              </span>
            </button>
          );
        })}
      </div>

      <p className="l57-focus-ar">
        <Mixed57 text={task.ar} />
      </p>

      <div className="l57-lab-actions">
        <CheckButton disabled={!complete || checked} onClick={() => setLab(`analysis-${task.id}`, JSON.stringify(assigned), true)}>
          تحقّق من التحليل
        </CheckButton>
        <button
          type="button"
          className="l57-btn l57-btn--ghost"
          onClick={() => {
            setTaskIndex((i) => (i + 1) % ANALYSIS_TASKS_57.length);
            setRole("subject");
          }}
        >
          جملة أخرى
        </button>
      </div>

      {checked &&
        verdict(
          allRight,
          "تحليل صحيح. المفعول به الذي حددته هو ما سننقله إلى بداية الجملة المجهولة.",
          `التحليل غير مكتمل الصحة. الصحيح: ${task.tokens.map((t) => `${t.text} = ${t.role === "subject" ? "Subject" : t.role === "verb" ? "Verb" : "Object"}`).join(" · ")}`,
        )}
    </div>
  );
}

/* ============================================================
   ③ ShiftLab — مختبر التحويل (البناء التدريجي)
   ============================================================ */

export type ShiftTask57 = {
  id: string;
  active: string;
  activeAr: string;
  subject: string;
  verb: string;
  object: string;
  be: string;
  beOptions: string[];
  v3: string;
  v3Options: string[];
  agent: string;
  keepBy: boolean;
  passive: string;
  passiveAr: string;
  why: string;
};

export const SHIFT_TASKS_57: ShiftTask57[] = [
  {
    id: "s1",
    active: "Ali cleans the room.",
    activeAr: "علي ينظف الغرفة.",
    subject: "Ali",
    verb: "cleans",
    object: "The room",
    be: "is",
    beOptions: ["is", "are", "am"],
    v3: "cleaned",
    v3Options: ["clean", "cleaned", "cleaning"],
    agent: "by Ali",
    keepBy: true,
    passive: "The room is cleaned by Ali.",
    passiveAr: "الغرفة يتم تنظيفها بواسطة علي.",
    why: "The room مفرد ⇒ is. وclean فعل منتظم ⇒ V3 = cleaned. وذكر Ali مفيد هنا لأنه يوضّح الفاعل.",
  },
  {
    id: "s2",
    active: "The workers build houses.",
    activeAr: "العمال يبنون منازل.",
    subject: "The workers",
    verb: "build",
    object: "Houses",
    be: "are",
    beOptions: ["is", "are", "am"],
    v3: "built",
    v3Options: ["build", "built", "building"],
    agent: "by the workers",
    keepBy: true,
    passive: "Houses are built by the workers.",
    passiveAr: "المنازل تُبنى بواسطة العمال.",
    why: "Houses جمع ⇒ are. وbuild تصريفه الثالث built (لا builded).",
  },
  {
    id: "s3",
    active: "People speak English in many countries.",
    activeAr: "الناس يتحدثون الإنجليزية في دول كثيرة.",
    subject: "People",
    verb: "speak",
    object: "English",
    be: "is",
    beOptions: ["is", "are", "am"],
    v3: "spoken",
    v3Options: ["speak", "spoke", "spoken"],
    agent: "by people",
    keepBy: false,
    passive: "English is spoken in many countries.",
    passiveAr: "تُتحدث الإنجليزية في دول كثيرة.",
    why: "English مفرد ⇒ is، وspeak ⇒ spoken. ولا نضيف by people لأن الفاعل غير مهم؛ المهم هو انتشار اللغة.",
  },
  {
    id: "s4",
    active: "The chef cooks the meals.",
    activeAr: "الطاهي يطبخ الوجبات.",
    subject: "The chef",
    verb: "cooks",
    object: "The meals",
    be: "are",
    beOptions: ["is", "are", "am"],
    v3: "cooked",
    v3Options: ["cook", "cooked", "cooking"],
    agent: "by the chef",
    keepBy: true,
    passive: "The meals are cooked by the chef.",
    passiveAr: "الوجبات تُطبخ بواسطة الطاهي.",
    why: "The meals جمع ⇒ are، وcook ⇒ cooked.",
  },
];

export function ShiftLab57({ workspace, setLab }: LabProps) {
  const [index, setIndex] = useState(0);
  const task = SHIFT_TASKS_57[index];
  const base = `shift-${task.id}`;
  const stage = workspace.labs[`${base}-stage`]?.value ?? "start";
  const pickObject = workspace.labs[`${base}-object`];
  const pickBe = workspace.labs[`${base}-be`];
  const pickV3 = workspace.labs[`${base}-v3`];
  const pickBy = workspace.labs[`${base}-by`];
  const checked = workspace.labs[`${base}-check`]?.checked ?? false;

  const objectRight = pickObject?.value === "object";
  const beRight = pickBe?.value === task.be;
  const v3Right = pickV3?.value === task.v3;
  const byRight = pickBy?.value === (task.keepBy ? "keep" : "drop");
  const allRight = objectRight && beRight && v3Right && byRight;

  const assembled = useMemo(() => {
    if (!checked) return null;
    return [
      { text: task.object, role: "receiver" as const },
      { text: task.be, role: "be" as const },
      { text: task.v3, role: "v3" as const },
      ...(task.keepBy ? [{ text: task.agent.replace(/^by /, ""), role: "agent" as const }] : []),
    ];
  }, [checked, task]);

  return (
    <div className="l57-lab" data-lab="shift">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          TASK {index + 1}/{SHIFT_TASKS_57.length}
        </span>
        <span className="l57-task-en" dir="ltr">
          <En57>{task.active}</En57>
        </span>
        <span className="l57-task-ar">
          <Mixed57 text={task.activeAr} />
        </span>
      </div>

      {/* الخطوة ١ — ما الذي يتصدّر الجملة؟ */}
      <fieldset className="l57-stage" disabled={checked}>
        <legend>
          <span className="l57-stage-no" aria-hidden="true">
            1
          </span>
          <Mixed57 text="ما الذي ينتقل إلى بداية الجملة الجديدة؟" />
        </legend>
        <div className="l57-options l57-options--3">
          {[
            { id: "subject", label: task.subject, tag: "Subject" },
            { id: "verb", label: task.verb, tag: "Verb" },
            { id: "object", label: task.object, tag: "Object" },
          ].map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={pickObject?.value === o.id}
              className={pickObject?.value === o.id ? "is-on" : ""}
              onClick={() => setLab(`${base}-object`, o.id, false)}
            >
              <span dir="ltr">
                <En57>{o.label}</En57>
              </span>
              <em>{o.tag}</em>
            </button>
          ))}
        </div>
      </fieldset>

      {/* الخطوة ٢ — be */}
      <fieldset className="l57-stage" disabled={checked}>
        <legend>
          <span className="l57-stage-no" aria-hidden="true">
            2
          </span>
          <Mixed57 text={`اختر فعل be المناسب للفاعل الجديد «${task.object}».`} />
        </legend>
        <div className="l57-options l57-options--3">
          {task.beOptions.map((b) => (
            <button
              key={b}
              type="button"
              dir="ltr"
              aria-pressed={pickBe?.value === b}
              className={pickBe?.value === b ? "is-on" : ""}
              onClick={() => setLab(`${base}-be`, b, false)}
            >
              <En57>{b}</En57>
            </button>
          ))}
        </div>
      </fieldset>

      {/* الخطوة ٣ — V3 */}
      <fieldset className="l57-stage" disabled={checked}>
        <legend>
          <span className="l57-stage-no" aria-hidden="true">
            3
          </span>
          <Mixed57 text={`اختر صيغة الفعل بعد be (الفعل ${task.verb}).`} />
        </legend>
        <div className="l57-options l57-options--3">
          {task.v3Options.map((v) => (
            <button
              key={v}
              type="button"
              dir="ltr"
              aria-pressed={pickV3?.value === v}
              className={pickV3?.value === v ? "is-on" : ""}
              onClick={() => setLab(`${base}-v3`, v, false)}
            >
              <En57>{v}</En57>
            </button>
          ))}
        </div>
      </fieldset>

      {/* الخطوة ٤ — by */}
      <fieldset className="l57-stage" disabled={checked}>
        <legend>
          <span className="l57-stage-no" aria-hidden="true">
            4
          </span>
          <Mixed57 text={`هل تذكر الفاعل الأصلي «${task.subject}» بعد by؟`} />
        </legend>
        <div className="l57-options l57-options--2">
          <button
            type="button"
            aria-pressed={pickBy?.value === "keep"}
            className={pickBy?.value === "keep" ? "is-on" : ""}
            onClick={() => setLab(`${base}-by`, "keep", false)}
          >
            <span>
              <Mixed57 text="أذكره" />
            </span>
            <em dir="ltr">
              <En57>{`by ${task.subject.replace(/^(The|the|My|my) /, "").toLowerCase()}`}</En57>
            </em>
          </button>
          <button
            type="button"
            aria-pressed={pickBy?.value === "drop"}
            className={pickBy?.value === "drop" ? "is-on" : ""}
            onClick={() => setLab(`${base}-by`, "drop", false)}
          >
            <span>
              <Mixed57 text="أحذفه" />
            </span>
            <em>
              <Mixed57 text="لأن الفاعل غير مهم" />
            </em>
          </button>
        </div>
      </fieldset>

      <div className="l57-lab-actions">
        <CheckButton disabled={!pickObject || !pickBe || !pickV3 || !pickBy || checked} onClick={() => setLab(`${base}-check`, "1", true)}>
          ركّب الجملة
        </CheckButton>
        <button
          type="button"
          className="l57-btn l57-btn--ghost"
          onClick={() => {
            setIndex((i) => (i + 1) % SHIFT_TASKS_57.length);
            setLab(`${base}-stage`, "next", false);
          }}
        >
          الحالة التالية
        </button>
      </div>

      {checked && assembled && (
        <div className="l57-result" role="status">
          <span className="l57-result-label">
            <Mixed57 text="الجملة التي بنيتها" />
          </span>
          <Rail57 tokens={assembled} size="md" />
          <p className="l57-result-en" dir="ltr">
            <En57>{task.passive}</En57>
          </p>
          <p className="l57-result-ar">
            <Mixed57 text={task.passiveAr} />
          </p>
          <ul className="l57-check-list">
            <li className={objectRight ? "is-ok" : "is-bad"}>
              <span aria-hidden="true">{objectRight ? "✓" : "✕"}</span> البداية: Object — <En57>{task.object}</En57>
            </li>
            <li className={beRight ? "is-ok" : "is-bad"}>
              <span aria-hidden="true">{beRight ? "✓" : "✕"}</span> فعل be: <En57>{task.be}</En57>
            </li>
            <li className={v3Right ? "is-ok" : "is-bad"}>
              <span aria-hidden="true">{v3Right ? "✓" : "✕"}</span> V3: <En57>{task.v3}</En57>
            </li>
            <li className={byRight ? "is-ok" : "is-bad"}>
              <span aria-hidden="true">{byRight ? "✓" : "✕"}</span>{" "}
              <Mixed57 text={task.keepBy ? "نذكر الفاعل الأصلي" : "نحذف الفاعل الأصلي"} />
            </li>
          </ul>
          <p className="l57-result-why">
            <Mixed57 text={task.why} />
          </p>
        </div>
      )}
      {!checked && <p className="l57-hint">
        <Mixed57 text="أكمل الخطوات الأربع ثم اضغط «ركّب الجملة». لا يظهر أي حكم قبل الضغط." />
      </p>}
    </div>
  );
}

/* ============================================================
   ④ BePickLab — am / is / are حسب الفاعل الجديد
   ============================================================ */

const BE_TASKS_57 = [
  { subject: "The room", be: "is", note: "اسم مفرد", sentence: "The room ____ cleaned every day." },
  { subject: "These books", be: "are", note: "جمع", sentence: "These books ____ sold online." },
  { subject: "English", be: "is", note: "اسم مفرد غير معدود", sentence: "English ____ spoken here." },
  { subject: "I", be: "am", note: "الضمير I", sentence: "I ____ invited to the party." },
  { subject: "The windows", be: "are", note: "جمع", sentence: "The windows ____ opened every morning." },
  { subject: "The homework", be: "is", note: "غير معدود", sentence: "The homework ____ checked by the teacher." },
];

export function BePickLab57({ workspace, setLab }: LabProps) {
  const [index, setIndex] = useState(0);
  const task = BE_TASKS_57[index];
  const state = workspace.labs[`be-${index}`];
  const checked = state?.checked ?? false;
  return (
    <div className="l57-lab" data-lab="be">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          {index + 1}/{BE_TASKS_57.length}
        </span>
        <span className="l57-task-en" dir="ltr">
          <En57>{task.sentence}</En57>
        </span>
      </div>
      <p className="l57-lab-line">
        <Mixed57 text="الفاعل الجديد هو الذي يقرر be. لا تنظر إلى الفاعل الأصلي المحذوف." />
      </p>
      <div className="l57-options l57-options--3">
        {["am", "is", "are"].map((b) => (
          <button
            key={b}
            type="button"
            dir="ltr"
            disabled={checked}
            aria-pressed={state?.value === b}
            className={state?.value === b ? "is-on" : ""}
            onClick={() => setLab(`be-${index}`, b, false)}
          >
            <En57>{b}</En57>
          </button>
        ))}
      </div>
      <div className="l57-lab-actions">
        <CheckButton disabled={!state?.value || checked} onClick={() => setLab(`be-${index}`, state!.value, true)} />
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setIndex((i) => (i + 1) % BE_TASKS_57.length)}>
          التالي
        </button>
      </div>
      {checked &&
        verdict(
          state!.value === task.be,
          `صحيح: ${task.subject} ← ${task.be}، لأن الفاعل ${task.note}.`,
          `غير صحيح: ${task.subject} يأخذ ${task.be} لأن الفاعل ${task.note}.`,
        )}
    </div>
  );
}

/* ============================================================
   ⑤ V3Lab — تحدي التصريف الثالث
   ============================================================ */

const V3_TASKS_57 = [
  { sentence: "The letter is ____ by Sara.", v1: "write", v2: "wrote", v3: "written", forms: ["write", "wrote", "written"], ar: "تُكتب الرسالة بواسطة سارة." },
  { sentence: "The house is ____ by the workers.", v1: "build", v2: "built", v3: "built", forms: ["build", "built", "building"], ar: "يُبنى المنزل بواسطة العمال." },
  { sentence: "English is ____ in many countries.", v1: "speak", v2: "spoke", v3: "spoken", forms: ["speak", "spoke", "spoken"], ar: "تُتحدث الإنجليزية في دول كثيرة." },
  { sentence: "The window is ____ by the boy.", v1: "break", v2: "broke", v3: "broken", forms: ["break", "broke", "broken"], ar: "تُكسر النافذة بواسطة الولد." },
  { sentence: "The homework is ____ by the students.", v1: "do", v2: "did", v3: "done", forms: ["do", "did", "done"], ar: "يُنجز الواجب بواسطة الطلاب." },
];

export function V3Lab57({ workspace, setLab }: LabProps) {
  const [index, setIndex] = useState(0);
  const task = V3_TASKS_57[index];
  const state = workspace.labs[`v3-${index}`];
  const checked = state?.checked ?? false;
  return (
    <div className="l57-lab" data-lab="v3">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          {index + 1}/{V3_TASKS_57.length}
        </span>
        <span className="l57-task-en" dir="ltr">
          <En57>{task.sentence}</En57>
        </span>
        <span className="l57-task-ar">
          <Mixed57 text={task.ar} />
        </span>
      </div>
      <div className="l57-v3-track" aria-hidden="true">
        <span>
          V1 <En57>{task.v1}</En57>
        </span>
        <span className="l57-v3-arrow">→</span>
        <span>
          V2 <En57>{task.v2}</En57>
        </span>
        <span className="l57-v3-arrow">→</span>
        <span className="is-target">
          V3 <En57>{task.v3}</En57>
        </span>
      </div>
      <div className="l57-options l57-options--3">
        {task.forms.map((f) => (
          <button
            key={f}
            type="button"
            dir="ltr"
            disabled={checked}
            aria-pressed={state?.value === f}
            className={state?.value === f ? "is-on" : ""}
            onClick={() => setLab(`v3-${index}`, f, false)}
          >
            <En57>{f}</En57>
          </button>
        ))}
      </div>
      <div className="l57-lab-actions">
        <CheckButton disabled={!state?.value || checked} onClick={() => setLab(`v3-${index}`, state!.value, true)} />
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setIndex((i) => (i + 1) % V3_TASKS_57.length)}>
          التالي
        </button>
      </div>
      {checked &&
        verdict(
          state!.value === task.v3,
          `${task.v1} ← ${task.v2} ← ${task.v3}. بعد be نستخدم V3 دائمًا.`,
          `الصحيح ${task.v3}. تذكّر السلسلة: ${task.v1} ← ${task.v2} ← ${task.v3}، وبعد be نستخدم V3 لا V1 ولا V2.`,
        )}
    </div>
  );
}

/* ============================================================
   ⑥ ErrorLab — اكتشف الخطأ ثم اختر التصحيح واقرأ السبب
   ============================================================ */

export function ErrorLab57({ workspace, setLab, errors }: LabProps & { errors: Error57[] }) {
  const [index, setIndex] = useState(0);
  const error = errors[index];
  const state = workspace.labs[`err-${error.id}`];
  const bad = state?.value ?? "";
  const checked = state?.checked ?? false;
  const correct = String(error.badIndex);

  return (
    <div className="l57-lab" data-lab="error">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          {index + 1}/{errors.length}
        </span>
        <span className="l57-task-ar">
          <Mixed57 text={error.title} />
        </span>
      </div>
      <p className="l57-lab-line">
        <Mixed57 text="اضغط المقطع الذي يحتوي الخطأ، ثم تحقّق. ستقرأ السبب والتصحيح بعد التحقق فقط." />
      </p>
      <div className="l57-segment-row" dir="ltr">
        {error.segments!.map((seg, i) => {
          const picked = bad === String(i);
          const isRight = checked && i === error.badIndex;
          const isWrongPick = checked && picked && i !== error.badIndex;
          return (
            <button
              key={i}
              type="button"
              disabled={checked}
              aria-pressed={picked}
              onClick={() => setLab(`err-${error.id}`, String(i), false)}
              className={`l57-segment ${picked ? "is-on" : ""} ${isRight ? "is-ok" : ""} ${isWrongPick ? "is-bad" : ""}`}
            >
              <En57>{seg}</En57>
            </button>
          );
        })}
      </div>
      <div className="l57-lab-actions">
        <CheckButton disabled={!bad || checked} onClick={() => setLab(`err-${error.id}`, bad, true)} />
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setIndex((i) => (i + 1) % errors.length)}>
          خطأ آخر
        </button>
      </div>
      {checked && (
        <div className="l57-result" role="status">
          <p className={`l57-verdict ${bad === correct ? "is-ok" : "is-bad"}`}>
            <span aria-hidden="true">{bad === correct ? "✓" : "✕"}</span>
            <Mixed57 text={bad === correct ? "أصبت موضع الخطأ." : "موضع الخطأ مختلف — قارن مع التصحيح أدناه."} />
          </p>
          <div className="l57-error-compare">
            <span className="l57-error-line is-bad" dir="ltr">
              <En57>{error.wrong}</En57>
            </span>
            <span className="l57-error-arrow" aria-hidden="true">
              ↓
            </span>
            <span className="l57-error-line is-ok" dir="ltr">
              <En57>{error.right}</En57>
            </span>
          </div>
          <p className="l57-result-why">
            <Mixed57 text={error.why} />
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ⑦ NegLab — أين يقع not؟
   ============================================================ */

const NEG_TASKS_57 = [
  {
    subject: "The room",
    be: "is",
    v3: "cleaned every day.",
    ar: "الغرفة لا يتم تنظيفها كل يوم.",
    answer: "after-be",
    result: "The room is not cleaned every day.",
  },
  {
    subject: "These products",
    be: "are",
    v3: "made in England.",
    ar: "هذه المنتجات لا تُصنع في إنجلترا.",
    answer: "after-be",
    result: "These products are not made in England.",
  },
  {
    subject: "The letters",
    be: "are",
    v3: "delivered on Sundays.",
    ar: "لا يتم تسليم الرسائل أيام الأحد.",
    answer: "after-be",
    result: "The letters are not delivered on Sundays.",
  },
];

export function NegLab57({ workspace, setLab }: LabProps) {
  const [index, setIndex] = useState(0);
  const task = NEG_TASKS_57[index];
  const state = workspace.labs[`neg-${index}`];
  const checked = state?.checked ?? false;
  const slots = [
    { id: "after-subject", label: "بعد الفاعل مباشرة" },
    { id: "after-be", label: "بعد فعل be وقبل V3" },
    { id: "after-v3", label: "بعد V3" },
  ];
  return (
    <div className="l57-lab" data-lab="neg">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          {index + 1}/{NEG_TASKS_57.length}
        </span>
        <span className="l57-task-ar">
          <Mixed57 text={task.ar} />
        </span>
      </div>
      <div className="l57-neg-sentence" dir="ltr" aria-live="polite">
        <span className="l57-neg-part">
          <En57>{task.subject}</En57>
        </span>
        {state?.value === "after-subject" && checked && <span className="l57-neg-insert">not</span>}
        <span className="l57-neg-part l57-neg-part--be">
          <En57>{task.be}</En57>
        </span>
        {state?.value === "after-be" && checked && <span className="l57-neg-insert">not</span>}
        <span className="l57-neg-part">
          <En57>{task.v3}</En57>
        </span>
        {state?.value === "after-v3" && checked && <span className="l57-neg-insert">not</span>}
      </div>
      <div className="l57-options l57-options--3">
        {slots.map((s) => (
          <button
            key={s.id}
            type="button"
            disabled={checked}
            aria-pressed={state?.value === s.id}
            className={state?.value === s.id ? "is-on" : ""}
            onClick={() => setLab(`neg-${index}`, s.id, false)}
          >
            <span>
              <Mixed57 text={s.label} />
            </span>
          </button>
        ))}
      </div>
      <div className="l57-lab-actions">
        <CheckButton disabled={!state?.value || checked} onClick={() => setLab(`neg-${index}`, state!.value, true)} />
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setIndex((i) => (i + 1) % NEG_TASKS_57.length)}>
          التالي
        </button>
      </div>
      {checked && (
        <div className="l57-result" role="status">
          <p className={`l57-verdict ${state!.value === task.answer ? "is-ok" : "is-bad"}`}>
            <span aria-hidden="true">{state!.value === task.answer ? "✓" : "✕"}</span>
            <Mixed57
              text={
                state!.value === task.answer
                  ? "صحيح: النفي يقع بين be وV3."
                  : "الموضع الصحيح هو بعد be وقبل V3 — هكذا تصبح الجملة:"
              }
            />
          </p>
          <p className="l57-result-en" dir="ltr">
            <En57>{task.result}</En57>
          </p>
          <p className="l57-result-why">
            <Mixed57 text="القاعدة: am / is / are + not + V3. الشكل «The room not is cleaned» خطأ لأنه ينسخ ترتيب النفي العربي." />
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ⑧ QuestionBuild — ترتيب السؤال
   ============================================================ */

const QUESTION_TASKS_57 = [
  { ar: "هل تُنظّف الغرفة كل يوم؟", tokens: ["Is", "the room", "cleaned", "every day?"], answer: "Is the room cleaned every day?" },
  { ar: "هل تُصنع هذه السيارات في اليابان؟", tokens: ["Are", "these cars", "made", "in Japan?"], answer: "Are these cars made in Japan?" },
  { ar: "أين يُصنع هذا المنتج؟", tokens: ["Where", "is", "this product", "made?"], answer: "Where is this product made?" },
  { ar: "متى تُنظّف الغرف؟", tokens: ["When", "are", "the rooms", "cleaned?"], answer: "When are the rooms cleaned?" },
];

export function QuestionLab57({ workspace, setLab }: LabProps) {
  const [index, setIndex] = useState(0);
  const task = QUESTION_TASKS_57[index];
  const state = workspace.labs[`q-${index}`];
  const picked: number[] = useMemo(() => (state?.value ? JSON.parse(state.value) : []), [state?.value]);
  const checked = state?.checked ?? false;
  const pickedTexts = picked.map((i) => task.tokens[i]);
  const built = pickedTexts.join(" ").replace(/\s([?.])/g, "$1");
  const ok = built === task.answer;

  return (
    <div className="l57-lab" data-lab="question">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          {index + 1}/{QUESTION_TASKS_57.length}
        </span>
        <span className="l57-task-ar">
          <Mixed57 text={task.ar} />
        </span>
      </div>
      <p className="l57-lab-line">
        <Mixed57 text="اضغط المقاطع بالترتيب الصحيح لبناء السؤال. be يأتي أولًا، ثم الفاعل، ثم V3." />
      </p>
      <div className="l57-build-slot" dir="ltr">
        {pickedTexts.length === 0 ? (
          <span className="l57-build-empty" dir="rtl">
            <Mixed57 text="ابْنِ السؤال هنا…" />
          </span>
        ) : (
          pickedTexts.map((t, i) => (
            <span key={`${t}-${i}`} className="l57-build-chip">
              <En57>{t}</En57>
            </span>
          ))
        )}
      </div>
      <div className="l57-build-bank" dir="ltr">
        {task.tokens.map((t, i) => (
          <button
            key={t}
            type="button"
            disabled={picked.includes(i) || checked}
            onClick={() => setLab(`q-${index}`, JSON.stringify([...picked, i]), false)}
            className={`l57-build-chip l57-build-chip--btn ${picked.includes(i) ? "is-used" : ""}`}
          >
            <En57>{t}</En57>
          </button>
        ))}
      </div>
      <div className="l57-lab-actions">
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setLab(`q-${index}`, "[]", false)} disabled={checked}>
          ↺ إعادة الترتيب
        </button>
        <CheckButton disabled={picked.length !== task.tokens.length || checked} onClick={() => setLab(`q-${index}`, state!.value, true)} />
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setIndex((i) => (i + 1) % QUESTION_TASKS_57.length)}>
          التالي
        </button>
      </div>
      {checked && (
        <div className="l57-result" role="status">
          <p className={`l57-verdict ${ok ? "is-ok" : "is-bad"}`}>
            <span aria-hidden="true">{ok ? "✓" : "✕"}</span>
            <Mixed57 text={ok ? "ترتيب صحيح." : "الترتيب الصحيح هو:"} />
          </p>
          <p className="l57-result-en" dir="ltr">
            <En57>{task.answer}</En57>
          </p>
          <p className="l57-result-why">
            <Mixed57 text="في السؤال ينتقل be إلى البداية (أو يأتي بعد أداة الاستفهام مباشرة)، ويبقى V3 بعد الفاعل." />
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ⑨ ByLab — نذكر by أم نحذفها؟ + ضمير المفعول به
   ============================================================ */

const BY_TASKS_57 = [
  {
    ar: "سُرقت دراجتي، ولا أحد يعرف من سرقها.",
    agent: "by someone",
    answer: "drop",
    why: "الفاعل مجهول، فلا يمكن ذكره. نحذف by someone تمامًا: My bicycle was stolen.",
  },
  {
    ar: "لوحة الموناليزيا رسمها ليوناردو دا فينشي — والمعلومة مهمة.",
    agent: "by Leonardo da Vinci",
    answer: "keep",
    why: "هوية الرسام معلومة جوهرية؛ حذفها يفقد الجملة معناها.",
  },
  {
    ar: "تُنظّف الطرق كل صباح، والمهم أن الطرق نظيفة.",
    agent: "by the cleaners",
    answer: "drop",
    why: "من ينظف غير مهم للرسالة، فنحذف by ونركّز على النتيجة: The roads are cleaned every morning.",
  },
  {
    ar: "الغرفة ينظّفها علي — نريد تحديد الفاعل.",
    agent: "by him",
    answer: "keep",
    why: "نذكر الفاعل عندما تكون هويته مهمة، وبعد by نستخدم ضمير المفعول به: by him لا by he.",
  },
];

export function ByLab57({ workspace, setLab }: LabProps) {
  const [index, setIndex] = useState(0);
  const task = BY_TASKS_57[index];
  const state = workspace.labs[`by-${index}`];
  const checked = state?.checked ?? false;
  return (
    <div className="l57-lab" data-lab="by">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          {index + 1}/{BY_TASKS_57.length}
        </span>
        <span className="l57-task-ar">
          <Mixed57 text={task.ar} />
        </span>
      </div>
      <div className="l57-agent-pill" dir="ltr">
        <Block57 text={task.agent} role="by" />
      </div>
      <div className="l57-options l57-options--2">
        <button
          type="button"
          disabled={checked}
          aria-pressed={state?.value === "keep"}
          className={state?.value === "keep" ? "is-on" : ""}
          onClick={() => setLab(`by-${index}`, "keep", false)}
        >
          <span>
            <Mixed57 text="أذكر by + الفاعل" />
          </span>
          <em dir="ltr">
            <En57>{task.agent}</En57>
          </em>
        </button>
        <button
          type="button"
          disabled={checked}
          aria-pressed={state?.value === "drop"}
          className={state?.value === "drop" ? "is-on" : ""}
          onClick={() => setLab(`by-${index}`, "drop", false)}
        >
          <span>
            <Mixed57 text="أحذف by + الفاعل" />
          </span>
          <em>
            <Mixed57 text="التركيز على الشيء أو النتيجة" />
          </em>
        </button>
      </div>
      <div className="l57-lab-actions">
        <CheckButton disabled={!state?.value || checked} onClick={() => setLab(`by-${index}`, state!.value, true)} />
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setIndex((i) => (i + 1) % BY_TASKS_57.length)}>
          التالي
        </button>
      </div>
      {checked && verdict(state!.value === task.answer, task.why, task.why)}
    </div>
  );
}

/* ============================================================
   ⑩ TransitivityLab — هل يمكن التحويل؟
   ============================================================ */

const TRANS_TASKS_57 = [
  { en: "The boy opened the door.", can: true, why: "الفعل opened متعدٍ: له مفعول به مباشر the door يمكن نقله إلى البداية ⇒ The door was opened by the boy." },
  { en: "The boy slept.", can: false, why: "الفعل slept لازم، ولا يوجد مفعول به ⇒ لا يمكن بناء Passive بالطريقة المعتادة." },
  { en: "The train arrives at 8.", can: false, why: "arrive لازم؛ at 8 ظرف زمان لا مفعول به ⇒ لا تحويل." },
  { en: "The accident happened yesterday.", can: false, why: "happen لازم ولا يأخذ مفعولًا به مباشرًا ⇒ لا تحويل." },
  { en: "The company produces cars.", can: true, why: "produce متعدٍ ومفعوله cars ⇒ Cars are produced by the company." },
  { en: "The child laughed.", can: false, why: "laugh لازم ⇒ لا يوجد مفعول به يمكن نقله." },
];

export function TransitivityLab57({ workspace, setLab }: LabProps) {
  const [index, setIndex] = useState(0);
  const task = TRANS_TASKS_57[index];
  const state = workspace.labs[`trans-${index}`];
  const checked = state?.checked ?? false;
  return (
    <div className="l57-lab" data-lab="transitivity">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          {index + 1}/{TRANS_TASKS_57.length}
        </span>
        <span className="l57-task-en" dir="ltr">
          <En57>{task.en}</En57>
        </span>
      </div>
      <div className="l57-options l57-options--2">
        <button
          type="button"
          disabled={checked}
          aria-pressed={state?.value === "yes"}
          className={state?.value === "yes" ? "is-on" : ""}
          onClick={() => setLab(`trans-${index}`, "yes", false)}
        >
          <span>
            <Mixed57 text="يمكن تحويلها إلى Passive" />
          </span>
          <em>
            <Mixed57 text="يوجد مفعول به مباشر" />
          </em>
        </button>
        <button
          type="button"
          disabled={checked}
          aria-pressed={state?.value === "no"}
          className={state?.value === "no" ? "is-on" : ""}
          onClick={() => setLab(`trans-${index}`, "no", false)}
        >
          <span>
            <Mixed57 text="لا يمكن تحويلها" />
          </span>
          <em>
            <Mixed57 text="فعل لازم بلا مفعول به" />
          </em>
        </button>
      </div>
      <div className="l57-lab-actions">
        <CheckButton disabled={!state?.value || checked} onClick={() => setLab(`trans-${index}`, state!.value, true)} />
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setIndex((i) => (i + 1) % TRANS_TASKS_57.length)}>
          جملة أخرى
        </button>
      </div>
      {checked && (
        <div className="l57-result" role="status">
          <p className={`l57-verdict ${(state!.value === "yes") === task.can ? "is-ok" : "is-bad"}`}>
            <span aria-hidden="true">{(state!.value === "yes") === task.can ? "✓" : "✕"}</span>
            <Mixed57 text={(state!.value === "yes") === task.can ? "قرار صحيح." : "راجع نوع الفعل في هذه الجملة."} />
          </p>
          <p className="l57-result-why">
            <Mixed57 text={task.why} />
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ⑪ CompareLab — أي جملة تركّز على المطلوب؟
   ============================================================ */

const COMPARE_TASKS_57 = [
  {
    focus: "التركيز على الطاهي (من قام بالفعل)",
    options: [
      { id: "a", text: "The chef cooks the meal." },
      { id: "b", text: "The meal is cooked by the chef." },
    ],
    answer: "a",
    why: "Active: الجملة تبدأ بالفاعل، فالبؤرة على الطاهي. أما Passive فيبدأ بالوجبة.",
  },
  {
    focus: "التركيز على اللص (ما وقع عليه الفعل)",
    options: [
      { id: "a", text: "The police arrest the thief." },
      { id: "b", text: "The thief is arrested by the police." },
    ],
    answer: "b",
    why: "Passive: اللص هو أول الجملة، فالبؤرة عليه. والصيغة المعلومة تُبقي البؤرة على الشرطة.",
  },
  {
    focus: "التركيز على انتشار الإنجليزية دون ذكر المتحدثين",
    options: [
      { id: "a", text: "People speak English here." },
      { id: "b", text: "English is spoken here." },
    ],
    answer: "b",
    why: "حذف by people يجعل البؤرة على اللغة نفسها وانتشارها، لا على من يتحدثها.",
  },
  {
    focus: "التركيز على السيارة (ما وقع عليه الفعل)",
    options: [
      { id: "a", text: "My father washes the car." },
      { id: "b", text: "The car is washed by my father." },
    ],
    answer: "b",
    why: "الجملة الثانية تبدأ بالسيارة، فالبؤرة على الشيء الذي وقع عليه الفعل.",
  },
];

export function CompareLab57({ workspace, setLab }: LabProps) {
  const [index, setIndex] = useState(0);
  const task = COMPARE_TASKS_57[index];
  const state = workspace.labs[`cmp-${index}`];
  const checked = state?.checked ?? false;
  return (
    <div className="l57-lab" data-lab="compare">
      <div className="l57-task-head">
        <span className="l57-task-chip" dir="ltr">
          {index + 1}/{COMPARE_TASKS_57.length}
        </span>
        <span className="l57-task-ar">
          <Mixed57 text={task.focus} />
        </span>
      </div>
      <div className="l57-options l57-options--2">
        {task.options.map((o) => (
          <button
            key={o.id}
            type="button"
            dir="ltr"
            disabled={checked}
            aria-pressed={state?.value === o.id}
            className={state?.value === o.id ? "is-on" : ""}
            onClick={() => setLab(`cmp-${index}`, o.id, false)}
          >
            <span>
              <En57>{o.text}</En57>
            </span>
            <em>{o.id === "a" ? "ACTIVE" : "PASSIVE"}</em>
          </button>
        ))}
      </div>
      <div className="l57-lab-actions">
        <CheckButton disabled={!state?.value || checked} onClick={() => setLab(`cmp-${index}`, state!.value, true)} />
        <button type="button" className="l57-btn l57-btn--ghost" onClick={() => setIndex((i) => (i + 1) % COMPARE_TASKS_57.length)}>
          التالي
        </button>
      </div>
      {checked && verdict(state!.value === task.answer, task.why, task.why)}
    </div>
  );
}

/* ============================================================
   ⑫ بقية المختبرات المساندة
   ============================================================ */

export { ShiftArrow57, Plus57 };
