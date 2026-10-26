import { useState, type ReactNode } from "react";
import {
  Article44,
  ChannelBadge44,
  En44,
  Feedback44,
  Glyph44,
  Plate44,
  Text44,
  useField44,
} from "./kit44";
import { SOURCE_SECTIONS_44, unitId44, type DutyChannelId44 } from "./ledger44";

export type Choice44 = {
  prompt: string;
  context?: string;
  options: string[];
  answer: string;
  why: string;
  note?: string;
  accepted?: string[];
};

const LETTERS = ["A", "B", "C", "D", "E"];
const OPTION_LETTER = /^([A-E])\.\s+/;

function Task44({
  id,
  index,
  kind,
  prompt,
  children,
  unit,
}: {
  id: string;
  index: number;
  kind: string;
  prompt: ReactNode;
  children: ReactNode;
  unit?: string;
}) {
  return (
    <article className="task44" data-exercise-id={id} data-source-unit={unit}>
      <div className="taskTop44">
        <span className="taskNo44" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <span className="taskKind44">{kind}</span>
      </div>
      <div className="taskPrompt44">{prompt}</div>
      {children}
    </article>
  );
}

function AnswerButton({
  option,
  index,
  picked,
  checked,
  accepted,
  onPick,
}: {
  option: string;
  index: number;
  picked: boolean;
  checked: boolean;
  accepted: string[];
  onPick: () => void;
}) {
  const match = option.match(OPTION_LETTER);
  const letter = match ? match[1] : LETTERS[index];
  const body = match ? option.replace(OPTION_LETTER, "") : option;
  const isRight = accepted.includes(option);
  const state = checked ? (isRight ? "right" : picked ? "wrong" : undefined) : undefined;
  return (
    <button
      type="button"
      className="answer44"
      aria-pressed={picked}
      data-state={state}
      onClick={onPick}
    >
      <span className="answerLetter44" aria-hidden="true">
        {letter}
      </span>
      <span className="answerText44">
        <Text44 text={body} />
      </span>
      {checked && isRight && <span className="answerTag44">✓ الصواب</span>}
      {checked && state === "wrong" && (
        <span className="answerTag44 answerTag44--no">✕ اختيارك</span>
      )}
    </button>
  );
}

function CheckActions({
  pick,
  checked,
  onCheck,
  onRetry,
}: {
  pick: string;
  checked: boolean;
  onCheck: () => void;
  onRetry: () => void;
}) {
  return (
    <div className="taskActions44">
      {!checked ? (
        <>
          <button
            type="button"
            className="btn44 btn44--solid"
            disabled={!pick}
            onClick={onCheck}
          >
            تحقّق من الإجابة
          </button>
          <span className="taskHint44">اختر إجابة أولًا لعرض التقييم والشرح</span>
        </>
      ) : (
        <button type="button" className="btn44 btn44--ghost" onClick={onRetry}>
          <Glyph44 name="refresh" /> جرّب مرة أخرى
        </button>
      )}
    </div>
  );
}

export function ChoiceLab44({
  items,
  kicker,
  title,
  intro,
  channel,
  id,
}: {
  items: Choice44[];
  kicker?: string;
  title?: string;
  intro?: string;
  channel?: DutyChannelId44;
  id: string;
}) {
  return (
    <Plate44 kicker={kicker} title={title} intro={intro} channel={channel}>
      <div className="tasks44 tasks44--two">
        {items.map((item, i) => (
          <ChoiceItem44 key={i} id={`${id}-${i + 1}`} item={item} index={i + 1} />
        ))}
      </div>
    </Plate44>
  );
}

function ChoiceItem44({
  item,
  id,
  index,
}: {
  item: Choice44;
  id: string;
  index: number;
}) {
  const [pick, setPick] = useField44(id);
  const [checked, setChecked] = useField44(`${id}-checked`);
  const accepted = item.accepted ?? [item.answer];
  const right = accepted.includes(pick);
  return (
    <Task44 id={id} index={index} kind="اختيار تطبيقي" prompt={<Text44 text={item.prompt} />}>
      {item.context && (
        <p className="taskContext44">
          <Text44 text={item.context} />
        </p>
      )}
      <div className="answers44" role="group" aria-label={`خيارات البند ${index}`}>
        {item.options.map((option, k) => (
          <AnswerButton
            key={option}
            option={option}
            index={k}
            picked={pick === option}
            checked={!!checked}
            accepted={accepted}
            onPick={() => {
              setPick(option);
              setChecked("");
            }}
          />
        ))}
      </div>
      <CheckActions
        pick={pick}
        checked={!!checked}
        onCheck={() => setChecked("yes")}
        onRetry={() => {
          setPick("");
          setChecked("");
        }}
      />
      {checked && (
        <Feedback44
          state={right ? "ok" : "no"}
          title={right ? "إجابة صحيحة" : "ليست الصيغة الصحيحة"}
        >
          {!right && (
            <p className="fbKey44">
              الصواب: <Text44 text={accepted[0]!} />
            </p>
          )}
          <p>
            <Text44 text={item.why} />
          </p>
          {item.note && (
            <p className="fbNote44">
              <Text44 text={item.note} />
            </p>
          )}
        </Feedback44>
      )}
    </Task44>
  );
}

// ------------------------------------------------------------
// 1. Interactive 12-Objective Charter Tracker
// ------------------------------------------------------------
export function GoalList44({ section }: { section: number }) {
  const lines = SOURCE_SECTIONS_44[section]!.lines;
  const goals = lines
    .map((text, i) => ({ text, i }))
    .filter((x) => /^[①-⑳㉑-㉕]/.test(x.text));
  const [focusedRaw, setFocusedRaw] = useField44("goals-focused");
  const focused = new Set((focusedRaw || "").split(",").filter(Boolean));
  const toggleGoal = (num: number) => {
    const next = new Set(focused);
    const key = String(num);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setFocusedRaw([...next].join(","));
  };

  return (
    <Plate44
      kicker="ميثاق الكفاءات المستهدفة"
      title="أهداف الدرس الاثنا عشر"
      channel="charter"
      status={`محدّد للتركيز: ${focused.size} / ${goals.length}`}
    >
      <div className="goals44">
        <p className="goalsIntro44" data-source-unit={unitId44(section, 0)}>
          <Text44 text={lines[0]!} />
        </p>
        <p className="plateIntro44">
          اضغط على أي هدف لوضعه تحت دائرة التركيز الشخصي أثناء تقدمك في المحطات:
        </p>
        <ol className="goalsGrid44">
          {goals.map((goal, k) => {
            const active = focused.has(String(k + 1));
            return (
              <li
                key={goal.i}
                data-source-unit={unitId44(section, goal.i)}
                className={active ? "is-focused" : ""}
              >
                <button
                  type="button"
                  className="goalBtn44"
                  aria-pressed={active}
                  onClick={() => toggleGoal(k + 1)}
                >
                  <span className="goalNo44" aria-hidden="true">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span className="goalText44">
                    <Text44 text={goal.text.replace(/^[①-⑳㉑-㉕]\s*/, "")} />
                  </span>
                  <span className="goalPin44" aria-hidden="true">
                    {active ? "★" : "☆"}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// 2. Obligation Builder — Subject + MUST / HAVE TO + V1
// ------------------------------------------------------------
const SUBJECTS44 = ["I", "You", "He", "She", "It", "We", "They"];
const VERBS44: [string, string][] = [
  ["finish my homework", "إنهاء الواجب"],
  ["wear a uniform", "ارتداء الزي المدرسي"],
  ["listen carefully", "الاستماع بعناية"],
  ["protect the environment", "حماية البيئة"],
  ["leave early", "المغادرة مبكرًا"],
  ["study harder", "الدراسة بجد أكبر"],
];

export function ObligationBuilder44() {
  const [modal, setModal] = useField44("obl-modal");
  const [subject, setSubject] = useField44("obl-subject");
  const [verb, setVerb] = useField44("obl-verb");
  const who = SUBJECTS44[Number(subject) || 0]!;
  const [en, ar] = VERBS44[Number(verb) || 0]!;
  const channel: DutyChannelId44 = modal === "haveto" ? "haveto" : "must";
  const form =
    channel === "must"
      ? "must"
      : who === "He" || who === "She" || who === "It"
        ? "has to"
        : "have to";
  const sentence = `${who} ${form} ${en}.`;
  const whoAr =
    who === "I"
      ? "يجب عليّ"
      : who === "We"
        ? "يجب علينا"
        : who === "You"
          ? "يجب عليك"
          : who === "They"
            ? "يجب عليهم"
            : who === "She"
              ? "يجب عليها"
              : "يجب عليه";
  const translation = `${whoAr} ${ar}.`;

  return (
    <Plate44
      kicker="مختبر التركيب المباشر"
      title="ركّب جملة الإلزام وراقب سلوك الفعل"
      channel={channel}
      intro="اختر الفاعل، ثم بدّل بين MUST وHAVE TO، وراقب ثبات MUST مقابل تغيّر HAVE TO مع المفرد الغائب."
    >
      <div className="bench44">
        <div className="benchRow44" role="group" aria-label="اختر الفاعل">
          <span className="benchLabel44">الفاعل</span>
          <div className="chips44">
            {SUBJECTS44.map((s, idx) => (
              <button
                key={s}
                type="button"
                className="chip44 chip44--en font-en"
                dir="ltr"
                aria-pressed={who === s}
                onClick={() => setSubject(String(idx))}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="اختر قناة الضرورة">
          <span className="benchLabel44">القناة</span>
          <div className="chips44">
            <button
              type="button"
              className="chip44 chip44--must font-en"
              dir="ltr"
              aria-pressed={channel === "must"}
              onClick={() => setModal("must")}
            >
              MUST
            </button>
            <button
              type="button"
              className="chip44 chip44--haveto font-en"
              dir="ltr"
              aria-pressed={channel === "haveto"}
              onClick={() => setModal("haveto")}
            >
              HAVE TO / HAS TO
            </button>
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="اختر الفعل بصيغة V1">
          <span className="benchLabel44">الفعل (V1)</span>
          <div className="chips44 chips44--wide">
            {VERBS44.map(([word], i) => (
              <button
                key={word}
                type="button"
                className="chip44 chip44--en font-en"
                dir="ltr"
                aria-pressed={i === (Number(verb) || 0)}
                onClick={() => setVerb(String(i))}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="readout44" aria-live="polite">
        <div className="mb-1">
          <ChannelBadge44 channel={channel} />
        </div>
        <p className="readoutFull44">
          <En44 text={sentence} />
        </p>
        <p className="readoutTr44">{translation}</p>
        <p className="readoutNote44">
          <Text44
            text={
              channel === "must"
                ? "ملاحظة نحوية: MUST تبقى ثابتة تمامًا ويتبعها V1 مباشرة دون to أو s."
                : who === "He" || who === "She" || who === "It"
                  ? "ملاحظة نحوية: الفاعل مفرد غائب، لذلك تتحول have to إلى has to + V1."
                  : "ملاحظة نحوية: مع هذا الفاعل نستخدم have to + V1."
            }
          />
        </p>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// 3. Context Tone Switcher (Step 6: Rule vs Strong Recommendation)
// ------------------------------------------------------------
const TONE_CASES: Choice44[] = [
  {
    prompt: "You must wear safety glasses inside the lab.",
    options: ["تعليمات سلامة إلزامية", "توصية حماسية ودية"],
    answer: "تعليمات سلامة إلزامية",
    why: "السياق مختبر علوم وقواعد سلامة، لذا MUST هنا تعبّر عن إلزام رسمي.",
  },
  {
    prompt: "You must try this cake! My mother just baked it.",
    options: ["تعليمات سلامة إلزامية", "توصية حماسية ودية"],
    answer: "توصية حماسية ودية",
    why: "المتحدث يشارك حماسه ويشجع المستمع بودّ، وليست لائحة قانونية.",
  },
  {
    prompt: "Passengers must fasten their seat belts during takeoff.",
    options: ["تعليمات سلامة إلزامية", "توصية حماسية ودية"],
    answer: "تعليمات سلامة إلزامية",
    why: "قاعدة طيران رسمية واجبة الاتباع حفاظًا على السلامة.",
  },
  {
    prompt: "You must read this novel. The ending is unforgettable!",
    options: ["تعليمات سلامة إلزامية", "توصية حماسية ودية"],
    answer: "توصية حماسية ودية",
    why: "السياق إعجاب برواية رائعة؛ MUST هنا للتوصية القوية لا للأمر الإداري.",
  },
];

export function ContextToneLab44() {
  return (
    <ChoiceLab44
      id="context-tone"
      channel="must"
      kicker="مختبر السياق والنبرة"
      title="هل MUST هنا قانون إلزامي أم توصية حماسية؟"
      intro="الكلمة واحدة (MUST)، لكن السياق هو الذي يحسم وظيفتها التواصلية. صنّف الجمل الأربع:"
      items={TONE_CASES}
    />
  );
}

// ------------------------------------------------------------
// 4. Pronoun Conjugation Switchboard (Step 8: HAVE/HAS TO vs MUST)
// ------------------------------------------------------------
const PRONOUN_ROWS = [
  { subj: "I", group: "متكلم مفرد", third: false, sample: "study tonight" },
  { subj: "You", group: "مخاطب", third: false, sample: "arrive on time" },
  { subj: "He", group: "مفرد غائب", third: true, sample: "leave early" },
  { subj: "She", group: "مفرد غائب", third: true, sample: "wear a uniform" },
  { subj: "It", group: "مفرد غير عاقل", third: true, sample: "work properly" },
  { subj: "Omar", group: "اسم مفرد غائب", third: true, sample: "finish the report" },
  { subj: "We", group: "متكلمون جمع", third: false, sample: "manage our time" },
  { subj: "My parents", group: "اسم جمع", third: false, sample: "work tomorrow" },
];

export function PronounSwitchboard44() {
  const [idxRaw, setIdxRaw] = useField44("pronoun-switch");
  const idx = Number(idxRaw) || 0;
  const row = PRONOUN_ROWS[idx] ?? PRONOUN_ROWS[0]!;
  const haveForm = row.third ? "has to" : "have to";
  const wrongHave = row.third ? "have to" : "has to";

  return (
    <Plate44
      id="pronoun-lab-44"
      kicker="لوحة تصريف الفاعل"
      title="قارن سلوك HAVE TO مع سلوك MUST عند تغيير الفاعل"
      channel="haveto"
      intro="اضغط على أي ضمير أو فاعل لمقارنة الصيغتين جنبًا إلى جنب:"
    >
      <div className="chips44" role="group" aria-label="اختر الفاعل للمقارنة">
        {PRONOUN_ROWS.map((item, i) => (
          <button
            key={item.subj}
            type="button"
            dir="ltr"
            className="chip44 chip44--en font-en"
            aria-pressed={i === idx}
            onClick={() => setIdxRaw(String(i))}
          >
            {item.subj}
          </button>
        ))}
      </div>

      <div className="contrast44 mt-3" aria-live="polite">
        <figure className="contrastPane44 contrastPane44--haveto">
          <figcaption className="contrastTag44">
            <Glyph44 name="clipboard" />
            <span>{row.group} · يتغير مع المفرد الغائب</span>
          </figcaption>
          <blockquote>
            <En44 text={`${row.subj} ${haveForm} ${row.sample}.`} />
          </blockquote>
          <p className="occ-mini-trap font-en" dir="ltr">
            ✕ {row.subj} {wrongHave} {row.sample}.
          </p>
        </figure>

        <figure className="contrastPane44 contrastPane44--must">
          <figcaption className="contrastTag44">
            <Glyph44 name="scale" />
            <span>{row.group} · ثابت بلا تغيير</span>
          </figcaption>
          <blockquote>
            <En44 text={`${row.subj} must ${row.sample}.`} />
          </blockquote>
          <p className="occ-mini-trap font-en" dir="ltr">
            ✕ {row.subj} musts {row.sample}.
          </p>
        </figure>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// 5. Nuance & Overlap Explorer (Step 10: Tendency, Not Rigid Law)
// ------------------------------------------------------------
const NUANCE_SCENARIOS = [
  {
    tag: "تأكيد نابع من المتحدث",
    channel: "must" as DutyChannelId44,
    en: "I must call my grandmother tonight.",
    ar: "يجب ألا أنسى الاتصال بجدتي الليلة.",
    insight:
      "هنا لا يوجد قانون خارجي مكتوب، بل التزام شخصي يشعر المتحدث بأهميته ويؤكده لنفسه.",
  },
  {
    tag: "ظرف عملي خارجي",
    channel: "haveto" as DutyChannelId44,
    en: "I have to study tonight because my exam is tomorrow morning.",
    ar: "يجب عليّ الدراسة الليلة لأن امتحاني صباح الغد.",
    insight:
      "موعد الامتحان ظرف واقعي خارجي يفرض الدراسة الليلة، لذا تشيع HAVE TO جدًا هنا.",
  },
  {
    tag: "منطقة التداخل المشروعة",
    channel: "charter" as DutyChannelId44,
    en: "Students must wear uniforms. / Students have to wear uniforms.",
    ar: "كلتا الجملتين صحيحتان تمامًا في التعبير عن قواعد المدرسة!",
    insight:
      "الفرق بين MUST وHAVE TO اتجاه شائع وليس قانونًا مطلقًا؛ تبدو MUST أكثر رسمية في اللوائح المكتوبة، وتشيع HAVE TO عند نقل النظام في الحديث اليومي.",
  },
];

export function NuanceOverlapLab44() {
  const [activeRaw, setActiveRaw] = useField44("nuance-tab");
  const active = Number(activeRaw) || 0;
  const item = NUANCE_SCENARIOS[active] ?? NUANCE_SCENARIOS[0]!;

  return (
    <Plate44
      id="tendency-compass-44"
      kicker="بوصلة الدلالة والتداخل"
      title="اتجاه شائع لا قانون جامد: استكشف الحالات الثلاث"
      channel={item.channel}
    >
      <div className="chips44" role="tablist" aria-label="حالات استخدام MUST وHAVE TO">
        {NUANCE_SCENARIOS.map((sc, i) => (
          <button
            key={sc.tag}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-pressed={i === active}
            className="chip44"
            onClick={() => setActiveRaw(String(i))}
          >
            {sc.tag}
          </button>
        ))}
      </div>
      <div className="readout44" aria-live="polite">
        <div className="mb-1">
          <ChannelBadge44 channel={item.channel} />
        </div>
        <p className="readoutFull44">
          <En44 text={item.en} />
        </p>
        <p className="readoutTr44">{item.ar}</p>
        <p className="readoutNote44">
          <Text44 text={item.insight} />
        </p>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// 6. Prohibition vs Optionality Sorter (Step 13)
// ------------------------------------------------------------
const SORT_ITEMS44: { sentence: string; meaning: "منع" | "عدم ضرورة"; why: string }[] = [
  {
    sentence: "You mustn't smoke in the library.",
    meaning: "منع",
    why: "MUSTN'T تعبّر عن المنع القاطع؛ التدخين محظور تمامًا داخل المكتبة.",
  },
  {
    sentence: "You don't have to wear a tie.",
    meaning: "عدم ضرورة",
    why: "DON'T HAVE TO تعني أن ارتداء ربطة العنق غير إلزامي، ويمكنك ارتداؤها إن رغبت.",
  },
  {
    sentence: "Students mustn't cheat.",
    meaning: "منع",
    why: "MUSTN'T تعني الحظر التام؛ الغش ممنوع.",
  },
  {
    sentence: "You don't have to come early.",
    meaning: "عدم ضرورة",
    why: "DON'T HAVE TO تعني أنك لست مضطرًا للحضور المبكر، ولا تعني منعه.",
  },
  {
    sentence: "You mustn't touch that wire.",
    meaning: "منع",
    why: "تحذير سلامة مباشر؛ لمس السلك ممنوع لخطورته.",
  },
  {
    sentence: "She doesn't have to work on Friday.",
    meaning: "عدم ضرورة",
    why: "DOESN'T HAVE TO تعبّر عن عدم وجود التزام بالعمل يوم الجمعة.",
  },
];

export function ProhibitionSorter44() {
  return (
    <Plate44
      kicker="رادار التمييز الدلالي"
      title="صنّف الجمل: منع قاطع أم عدم ضرورة؟"
      channel="prohibit"
      intro="اقرأ كل جملة وحدّد دلالتها باستخدام المفتاحين المميّزين بالشكل والأيقونة واللفظ:"
    >
      <div className="tasks44 tasks44--two">
        {SORT_ITEMS44.map((item, i) => (
          <SortItem44 key={i} id={`sort-${i}`} item={item} index={i + 1} />
        ))}
      </div>
    </Plate44>
  );
}

function SortItem44({
  item,
  id,
  index,
}: {
  item: { sentence: string; meaning: "منع" | "عدم ضرورة"; why: string };
  id: string;
  index: number;
}) {
  const [pick, setPick] = useField44(id);
  const [checked, setChecked] = useField44(`${id}-checked`);
  const right = pick === item.meaning;
  return (
    <Task44
      id={id}
      index={index}
      kind="تصنيف دلالي"
      prompt={
        <span dir="ltr" lang="en" className="taskSentence44 font-en">
          <En44 text={item.sentence} />
        </span>
      }
    >
      <div className="poles44" role="group" aria-label={`معنى الجملة ${index}`}>
        <button
          type="button"
          className="pole44 pole44--ban"
          aria-pressed={pick === "منع"}
          onClick={() => {
            setPick("منع");
            setChecked("");
          }}
        >
          <span className="poleMark44">
            <Glyph44 name="ban" />
          </span>
          <span className="poleText44">
            <b>منع قاطع</b>
            <small dir="ltr" className="font-en">
              MUSTN&apos;T
            </small>
          </span>
        </button>
        <button
          type="button"
          className="pole44 pole44--open"
          aria-pressed={pick === "عدم ضرورة"}
          onClick={() => {
            setPick("عدم ضرورة");
            setChecked("");
          }}
        >
          <span className="poleMark44">
            <Glyph44 name="open" />
          </span>
          <span className="poleText44">
            <b>عدم ضرورة</b>
            <small dir="ltr" className="font-en">
              DON&apos;T HAVE TO
            </small>
          </span>
        </button>
      </div>
      <CheckActions
        pick={pick}
        checked={!!checked}
        onCheck={() => setChecked("yes")}
        onRetry={() => {
          setPick("");
          setChecked("");
        }}
      />
      {checked && (
        <Feedback44
          state={right ? "ok" : "no"}
          title={right ? "تصنيف دقيق" : `التصنيف الصحيح: ${item.meaning}`}
        >
          <p>
            <Text44 text={item.why} />
          </p>
        </Feedback44>
      )}
    </Task44>
  );
}

// ------------------------------------------------------------
// 7. Meaning-Shift Simulator (Step 16)
// ------------------------------------------------------------
const SHIFT_PAIRS = [
  {
    place: "مختبر المدرسة",
    banEn: "You mustn't enter the laboratory.",
    banAr: "يُمنع عليك دخول المختبر (الدخول محظور).",
    optEn: "You don't have to enter the laboratory.",
    optAr: "لست مضطرًا لدخول المختبر (الأمر اختياري).",
  },
  {
    place: "غرفة الأجهزة الدقيقة",
    banEn: "You mustn't wear shoes inside this room.",
    banAr: "يُمنع ارتداء الأحذية داخل هذه الغرفة.",
    optEn: "You don't have to wear shoes inside this room.",
    optAr: "ليس من الضروري ارتداء الأحذية داخل هذه الغرفة.",
  },
  {
    place: "دوام يوم الغد",
    banEn: "You mustn't come early tomorrow.",
    banAr: "يُمنع حضورك مبكرًا غدًا (ربما المبنى مغلق).",
    optEn: "You don't have to come early tomorrow.",
    optAr: "ليس عليك الحضور مبكرًا غدًا (ولكن لا بأس إن حضرت).",
  },
];

export function MeaningShiftSimulator44() {
  const [sceneRaw, setSceneRaw] = useField44("shift-scene");
  const [modeRaw, setModeRaw] = useField44("shift-mode");
  const sceneIdx = Number(sceneRaw) || 0;
  const isOpt = modeRaw === "optional";
  const item = SHIFT_PAIRS[sceneIdx] ?? SHIFT_PAIRS[0]!;
  const channel: DutyChannelId44 = isOpt ? "optional" : "prohibit";

  return (
    <Plate44
      id="meaning-shift-lab-44"
      kicker="محاكي انعكاس المعنى"
      title="جملة واحدة ونفيان مختلفان تمامًا"
      channel={channel}
      intro="اختر الموقف، ثم اقلب المفتاح بين MUSTN'T وDON'T HAVE TO لترى كيف ينقلب الحكم:"
    >
      <div className="bench44">
        <div className="benchRow44" role="group" aria-label="اختر الموقف">
          <span className="benchLabel44">الموقف</span>
          <div className="chips44">
            {SHIFT_PAIRS.map((s, i) => (
              <button
                key={s.place}
                type="button"
                className="chip44"
                aria-pressed={i === sceneIdx}
                onClick={() => setSceneRaw(String(i))}
              >
                {s.place}
              </button>
            ))}
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="بدّل صيغة النفي">
          <span className="benchLabel44">صيغة النفي</span>
          <div className="poles44">
            <button
              type="button"
              className="pole44 pole44--ban"
              aria-pressed={!isOpt}
              onClick={() => setModeRaw("prohibit")}
            >
              <span className="poleMark44">
                <Glyph44 name="ban" />
              </span>
              <span className="poleText44">
                <b>المنع القاطع</b>
                <small dir="ltr" className="font-en">
                  MUSTN&apos;T
                </small>
              </span>
            </button>
            <button
              type="button"
              className="pole44 pole44--open"
              aria-pressed={isOpt}
              onClick={() => setModeRaw("optional")}
            >
              <span className="poleMark44">
                <Glyph44 name="open" />
              </span>
              <span className="poleText44">
                <b>عدم الضرورة</b>
                <small dir="ltr" className="font-en">
                  DON&apos;T HAVE TO
                </small>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`readout44 ${isOpt ? "readout44--optional" : "readout44--prohibit"}`}
        aria-live="polite"
      >
        <div className="mb-1">
          <ChannelBadge44 channel={channel} />
        </div>
        <p className="readoutFull44">
          <En44 text={isOpt ? item.optEn : item.banEn} />
        </p>
        <p className="readoutTr44">{isOpt ? item.optAr : item.banAr}</p>
        <p className="readoutNote44">
          {isOpt
            ? "الحكم العملي: الفعل غير مطلوب منك، لكنه ليس محظورًا بحد ذاته."
            : "الحكم العملي: الفعل ممنوع وغير مسموح به إطلاقًا."}
        </p>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// 8. Question Builder (Step 17: DO / DOES + Subject + have to + V1?)
// ------------------------------------------------------------
const Q_SUBJECTS = [
  { en: "you", aux: "Do", aff: "You have to", arQ: "هل يجب عليك" },
  { en: "she", aux: "Does", aff: "She has to", arQ: "هل يجب عليها" },
  { en: "Omar", aux: "Does", aff: "Omar has to", arQ: "هل يجب على عمر" },
  { en: "they", aux: "Do", aff: "They have to", arQ: "هل يجب عليهم" },
];
const Q_VERBS: [string, string][] = [
  ["study tonight", "الدراسة الليلة"],
  ["wear a uniform", "ارتداء الزي المدرسي"],
  ["arrive early", "الوصول مبكرًا"],
  ["finish the project today", "إنهاء المشروع اليوم"],
];

export function QuestionBuilder44() {
  const [sRaw, setSRaw] = useField44("qb-subj");
  const [vRaw, setVRaw] = useField44("qb-verb");
  const s = Q_SUBJECTS[Number(sRaw) || 0] ?? Q_SUBJECTS[0]!;
  const [vEn, vAr] = Q_VERBS[Number(vRaw) || 0] ?? Q_VERBS[0]!;

  return (
    <Plate44
      id="question-forge-44"
      kicker="مختبر تحويل الجملة إلى سؤال"
      title="شاهد كيف يعود الفعل إلى HAVE عند دخول DOES"
      channel="haveto"
    >
      <div className="bench44">
        <div className="benchRow44" role="group" aria-label="اختر الفاعل">
          <span className="benchLabel44">الفاعل</span>
          <div className="chips44">
            {Q_SUBJECTS.map((item, i) => (
              <button
                key={item.en}
                type="button"
                dir="ltr"
                className="chip44 chip44--en font-en"
                aria-pressed={i === (Number(sRaw) || 0)}
                onClick={() => setSRaw(String(i))}
              >
                {item.en}
              </button>
            ))}
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="اختر تكملة السؤال">
          <span className="benchLabel44">التكملة</span>
          <div className="chips44 chips44--wide">
            {Q_VERBS.map(([en], i) => (
              <button
                key={en}
                type="button"
                dir="ltr"
                className="chip44 chip44--en font-en"
                aria-pressed={i === (Number(vRaw) || 0)}
                onClick={() => setVRaw(String(i))}
              >
                {en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="conj44" aria-live="polite">
        <div className="conjRow44">
          <span className="conjLabel44">الإثبات</span>
          <span className="conjText44">
            <En44 text={`${s.aff} ${vEn}.`} />
          </span>
        </div>
        <div className="conjRow44">
          <span className="conjLabel44">السؤال الصحيح</span>
          <span className="conjText44">
            <En44 text={`${s.aux} ${s.en} have to ${vEn}?`} />
          </span>
        </div>
        {s.aux === "Does" && (
          <div className="conjRow44">
            <span className="conjLabel44 text-red-800">فخ شائع ✕</span>
            <span className="conjText44 font-en text-red-800" dir="ltr">
              ✕ Does {s.en} has to {vEn}?
            </span>
          </div>
        )}
        <p className="conjTr44">
          {s.arQ} {vAr}؟
        </p>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// 9. Must-Question Reply Trap Lab (Step 19)
// ------------------------------------------------------------
const MUST_REPLY_ITEMS: Choice44[] = [
  {
    prompt: "سألك زميلك: Must I finish this report today? وأردت إخباره أن إنهاءه اليوم غير ضروري (يمكن تأجيله للغد). بماذا تجيب؟",
    options: ["No, you don't have to.", "No, you mustn't.", "Yes, you must."],
    answer: "No, you don't have to.",
    why: "لأن المقصود نفي الضرورة (عدم الإلزام)، وليس منع الزميل من إنهاء التقرير!",
  },
  {
    prompt: "متى تكون الإجابة No, you mustn't صحيحة ردًا على سؤال بـ Must I...؟",
    options: [
      "فقط عندما يكون الفعل ممنوعًا تمامًا",
      "عندما يكون الفعل اختياريًا وغير ضروري",
      "لا تصح هذه الإجابة في أي سياق",
    ],
    answer: "فقط عندما يكون الفعل ممنوعًا تمامًا",
    why: "No, you mustn't تحوّل المعنى إلى منع صريح، فلا نستخدمها إلا إذا أردنا حظر الفعل فعلًا.",
  },
];

export function MustQuestionTrapLab44() {
  return (
    <ChoiceLab44
      id="must-q-reply"
      channel="optional"
      kicker="فخ الإجابة المنفية على MUST"
      title="انتبه عند الإجابة بـ «لا» على سؤال يبدأ بـ Must!"
      items={MUST_REPLY_ITEMS}
    />
  );
}

// ------------------------------------------------------------
// 10. Tense Machine — Present / Past / Future (Step 20)
// ------------------------------------------------------------
const TENSE_VERBS44: [string, string][] = [
  ["wake up early", "الاستيقاظ مبكرًا"],
  ["finish the project", "إنهاء المشروع"],
  ["buy new equipment", "شراء معدات جديدة"],
  ["leave early", "المغادرة مبكرًا"],
];

export function TenseMachine44() {
  const [tense, setTense] = useField44("tense-tense");
  const [subjRaw, setSubjRaw] = useField44("tense-subj");
  const [verb, setVerb] = useField44("tense-verb");
  const t = (tense || "past") as "present" | "past" | "future";
  const subj = subjRaw === "She" ? "She" : "I";
  const [en, ar] = TENSE_VERBS44[Number(verb) || 0]!;

  const forms: Record<
    "present" | "past" | "future",
    { aff: string; neg: string; q: string; ch: DutyChannelId44 }
  > = {
    present: {
      aff: `${subj} ${subj === "She" ? "has to" : "have to"} ${en}.`,
      neg: `${subj} ${subj === "She" ? "doesn't" : "don't"} have to ${en}.`,
      q: `${subj === "She" ? "Does she" : "Do I"} have to ${en}?`,
      ch: "haveto",
    },
    past: {
      aff: `${subj} had to ${en}.`,
      neg: `${subj} didn't have to ${en}.`,
      q: `Did ${subj === "She" ? "she" : "I"} have to ${en}?`,
      ch: "past",
    },
    future: {
      aff: `${subj} will have to ${en}.`,
      neg: `${subj} won't have to ${en}.`,
      q: `Will ${subj === "She" ? "she" : "I"} have to ${en}?`,
      ch: "future",
    },
  };

  const labels = { present: "الحاضر", past: "الماضي", future: "المستقبل" };
  const whoAr = subj === "She" ? "عليها" : "عليّ";
  const translation =
    t === "present"
      ? `يجب ${whoAr} ${ar}.`
      : t === "past"
        ? `كان ${whoAr} ${ar}.`
        : `سيتعين ${whoAr} ${ar}.`;

  return (
    <Plate44
      kicker="آلة الأزمنة التفاعلية"
      title="تصريف HAVE TO عبر الماضي والحاضر والمستقبل"
      channel={forms[t].ch}
      intro="بدّل الزمن والفاعل والفعل، وراقب ثبات have بعد عوامل النفي والاستفهام والمستقبل:"
    >
      <div className="bench44">
        <div className="benchRow44" role="group" aria-label="اختر الزمن">
          <span className="benchLabel44">الزمن</span>
          <div className="chips44">
            {(["past", "present", "future"] as const).map((x) => (
              <button
                key={x}
                type="button"
                className="chip44 chip44--tense"
                aria-pressed={x === t}
                onClick={() => setTense(x)}
              >
                {labels[x]}
              </button>
            ))}
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="اختر الفاعل">
          <span className="benchLabel44">الفاعل</span>
          <div className="chips44">
            {(["I", "She"] as const).map((s) => (
              <button
                key={s}
                type="button"
                dir="ltr"
                className="chip44 chip44--en font-en"
                aria-pressed={subj === s}
                onClick={() => setSubjRaw(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="اختر الفعل">
          <span className="benchLabel44">الفعل (V1)</span>
          <div className="chips44 chips44--wide">
            {TENSE_VERBS44.map(([w], i) => (
              <button
                key={w}
                type="button"
                className="chip44 chip44--en font-en"
                dir="ltr"
                aria-pressed={i === (Number(verb) || 0)}
                onClick={() => setVerb(String(i))}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="conj44" aria-live="polite">
        <div className="conjRow44">
          <span className="conjLabel44">
            <Glyph44 name="check" /> الإثبات
          </span>
          <span className="conjText44">
            <En44 text={forms[t].aff} />
          </span>
        </div>
        <div className="conjRow44">
          <span className="conjLabel44">
            <Glyph44 name="open" /> النفي (عدم ضرورة)
          </span>
          <span className="conjText44">
            <En44 text={forms[t].neg} />
          </span>
        </div>
        <div className="conjRow44">
          <span className="conjLabel44">
            <Glyph44 name="arrow" /> السؤال
          </span>
          <span className="conjText44">
            <En44 text={forms[t].q} />
          </span>
        </div>
        <p className="conjTr44">{translation}</p>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// 11. DIDN'T HAVE TO Reality-Check Lab (Step 21)
// ------------------------------------------------------------
const DIDNT_NUANCE_ITEMS: Choice44[] = [
  {
    prompt: "قال صديقك: I didn't have to finish the report yesterday. هل نعرف من هذه الجملة وحدها أنه لم يُنهِ التقرير؟",
    options: [
      "لا، الجملة تنفي الإلزام فقط ولا تحسم إن كان قد أنهاه أم لا",
      "نعم، الجملة تؤكد أنه ترك التقرير دون إنهاء",
      "الجملة تعني أنه مُنع من إنهاء التقرير",
    ],
    answer: "لا، الجملة تنفي الإلزام فقط ولا تحسم إن كان قد أنهاه أم لا",
    why: "didn't have to تعني فقط أن الإنهاء لم يكن واجبًا أمس؛ لذلك يصح تمامًا قول: ...but I finished it anyway.",
  },
  {
    prompt: "اختر الصيغة النحوية السليمة لنفي الضرورة في الماضي:",
    options: [
      "She didn't have to take the bus.",
      "She didn't had to take the bus.",
      "She mustn't took the bus.",
    ],
    answer: "She didn't have to take the bus.",
    why: "بعد didn't يعود الفعل دائمًا إلى صيغته الأساسية have to + V1.",
  },
];

export function DidntHaveToNuanceLab44() {
  return (
    <ChoiceLab44
      id="didnt-nuance"
      channel="past"
      kicker="تدقيق المعنى الدقيق في الماضي"
      title="هل تعني DIDN'T HAVE TO أن الفعل لم يحدث؟"
      items={DIDNT_NUANCE_ITEMS}
    />
  );
}

// ------------------------------------------------------------
// 12. Duty vs Advice Calibrator (Step 25: MUST / HAVE TO / SHOULD)
// ------------------------------------------------------------
const STRENGTH_LEVELS = [
  {
    id: "must",
    label: "MUST — إلزام وتأكيد قوي",
    channel: "must" as DutyChannelId44,
    en: "You must wear a seat belt.",
    ar: "يجب عليك ارتداء حزام الأمان (إلزام قوي / قاعدة سلامة).",
    bar: 96,
  },
  {
    id: "haveto",
    label: "HAVE TO — ضرورة أو متطلب",
    channel: "haveto" as DutyChannelId44,
    en: "You have to wear a seat belt.",
    ar: "يجب عليك ارتداء حزام الأمان (متطلب قانوني وعملي).",
    bar: 88,
  },
  {
    id: "should",
    label: "SHOULD — نصيحة وتوجيه",
    channel: "optional" as DutyChannelId44,
    en: "You should drink more water.",
    ar: "ينبغي أن تشرب المزيد من الماء (نصيحة مفيدة لا أمر إلزامي — محور الدرس 45).",
    bar: 48,
  },
];

export function StrengthGaugeLab44() {
  const [selRaw, setSelRaw] = useField44("strength-sel");
  const idx = Number(selRaw) || 0;
  const cur = STRENGTH_LEVELS[idx] ?? STRENGTH_LEVELS[0]!;

  return (
    <Plate44
      id="strength-gauge-44"
      kicker="مقياس درجة الإلزام مقابل النصيحة"
      title="قارن بين قوّة الضرورة وهدوء النصيحة"
      channel={cur.channel}
      intro="اضغط على كل صيغة لملاحظة الفرق التمهيدي قبل التعمق في SHOULD بالدرس القادم:"
    >
      <div className="chips44" role="group" aria-label="اختر درجة الإلزام أو النصيحة">
        {STRENGTH_LEVELS.map((lv, i) => (
          <button
            key={lv.id}
            type="button"
            className="chip44"
            aria-pressed={i === idx}
            onClick={() => setSelRaw(String(i))}
          >
            <Text44 text={lv.label} />
          </button>
        ))}
      </div>
      <div className="readout44" aria-live="polite">
        <div className="occ-gauge-track" aria-hidden="true">
          <div className="occ-gauge-fill" style={{ width: `${cur.bar}%` }} />
        </div>
        <p className="readoutFull44">
          <En44 text={cur.en} />
        </p>
        <p className="readoutTr44">{cur.ar}</p>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// 13. Progressive Dialogue Explorer (Steps 12 & 26)
// ------------------------------------------------------------
const TURN44 = /^([A-Za-z][A-Za-z .']*):\s+(.+)$/;

const DIALOGUE_26_AR: Record<number, string> = {
  0: "المعلمة: مرحبًا بكم في مسابقة العلوم! قبل أن نبدأ، يجب على الجميع اتباع قواعد السلامة.",
  1: "مايا: هل يجب علينا ارتداء نظارات السلامة؟",
  2: "المعلمة: نعم، يجب ذلك. يجب عليكم ارتداؤها طوال التجربة.",
  3: "عمر: هل يجب علينا إحضار معداتنا الخاصة؟",
  4: "المعلمة: لا، لستم مضطرين لذلك. ستوفّر المدرسة كل شيء.",
  5: "دانيال: هل يمكننا استخدام هواتفنا؟",
  6: "المعلمة: لا. يُمنع عليكم استخدام الهواتف أثناء المسابقة.",
  7: "مايا: كان عليّ تجهيز مشروعي طوال الأسبوع. آمل أن يسير كل شيء على ما يرام!",
  8: "عمر: وأنا كذلك. سيتعين علينا عرض مشاريعنا أمام لجنة التحكيم.",
  9: "المعلمة: لا تقلقوا. فقط ابذلوا أفضل ما لديكم!",
};

export function Dialog44({
  section,
  title,
  englishTitle,
  quiz,
}: {
  section: number;
  title: string;
  englishTitle?: string;
  quiz?: Choice44[];
}) {
  const lines = SOURCE_SECTIONS_44[section]!.lines;
  const [showSupportAr, setShowSupportAr] = useState(false);
  const [speakerFilter, setSpeakerFilter] = useState<string>("ALL");

  const speakers: string[] = [];
  lines.forEach((line) => {
    const m = line.match(TURN44);
    if (m && !speakers.includes(m[1]!.trim())) speakers.push(m[1]!.trim());
  });

  const rows: ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const m = lines[i]!.match(TURN44);
    if (m) {
      const items: { i: number; who: string; said: string }[] = [];
      while (i < lines.length) {
        const t = lines[i]!.match(TURN44);
        if (!t) break;
        items.push({ i, who: t[1]!.trim(), said: t[2]! });
        i++;
      }
      rows.push(
        <div className="dlg44" key={key++}>
          {items.map((item) => {
            const tone = speakers.indexOf(item.who) % 2 === 0 ? "a" : "b";
            const dimmed = speakerFilter !== "ALL" && speakerFilter !== item.who;
            return (
              <div
                className={`turn44 turn44--${tone} ${dimmed ? "is-dimmed" : ""}`.trim()}
                key={item.i}
                data-source-unit={unitId44(section, item.i)}
              >
                <span className="speaker44 font-en" dir="ltr">
                  {item.who}
                </span>
                <div className="turnContent44">
                  <span className="said44">
                    <En44 text={item.said} />
                  </span>
                  {section === 26 && showSupportAr && DIALOGUE_26_AR[item.i] ? (
                    <p className="turnSupportAr44">{DIALOGUE_26_AR[item.i]}</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      );
      continue;
    }
    let j = i;
    while (j < lines.length && !lines[j]!.match(TURN44)) j++;
    rows.push(<Article44 key={key++} section={section} from={i} to={j} />);
    i = j;
  }

  return (
    <div className="grid gap-4">
      <Plate44 kicker="مستكشف الحوار التفاعلي" title={title} channel="haveto">
        {englishTitle && (
          <p className="plateEnglish44 font-en" dir="ltr" lang="en">
            {englishTitle}
          </p>
        )}
        <div className="dlgToolbar44">
          <div className="chips44" role="group" aria-label="تصفية المتحدثين">
            <button
              type="button"
              className="chip44"
              aria-pressed={speakerFilter === "ALL"}
              onClick={() => setSpeakerFilter("ALL")}
            >
              كل المتحدثين
            </button>
            {speakers.map((sp) => (
              <button
                key={sp}
                type="button"
                dir="ltr"
                className="chip44 chip44--en font-en"
                aria-pressed={speakerFilter === sp}
                onClick={() => setSpeakerFilter(sp)}
              >
                {sp}
              </button>
            ))}
          </div>
          {section === 26 && (
            <button
              type="button"
              className="btn44 btn44--ghost"
              aria-pressed={showSupportAr}
              onClick={() => setShowSupportAr((v) => !v)}
            >
              {showSupportAr ? "إخفاء الترجمة المرافقة" : "إظهار الترجمة العربية لكل سطر"}
            </button>
          )}
        </div>
        {rows}
      </Plate44>

      {quiz && quiz.length > 0 ? (
        <ChoiceLab44
          id={`dlg-quiz-${section}`}
          channel="charter"
          kicker="فحص استيعاب الحوار"
          title="تحقق من التقاطك لدلالات الصيغ داخل المحادثة"
          items={quiz}
        />
      ) : null}
    </div>
  );
}

// ------------------------------------------------------------
// 14. Interactive Golden Summary Deck (Step 37)
// ------------------------------------------------------------
const SUMMARY_CARDS: {
  id: DutyChannelId44;
  title: string;
  formula: string;
  keyRule: string;
  example: string;
}[] = [
  {
    id: "must",
    title: "MUST — الضرورة والتأكيد واللوائح",
    formula: "Subject + must + V1",
    keyRule: "ثابتة مع جميع الضمائر؛ يتبعها V1 مباشرة دون s أو to.",
    example: "Students must follow the rules.",
  },
  {
    id: "haveto",
    title: "HAVE / HAS TO — الالتزامات والمتطلبات",
    formula: "Subject + have/has to + V1",
    keyRule: "تتحول إلى has to مع المفرد الغائب، وتعود إلى have بعد do/does.",
    example: "She has to leave because her meeting starts soon.",
  },
  {
    id: "prohibit",
    title: "MUSTN'T — المنع القاطع",
    formula: "Subject + mustn't + V1",
    keyRule: "تعني أن الفعل محظور تمامًا وغير مسموح به.",
    example: "You mustn't enter.",
  },
  {
    id: "optional",
    title: "DON'T / DOESN'T HAVE TO — عدم الضرورة",
    formula: "Subject + don't/doesn't have to + V1",
    keyRule: "تعني أن الفعل غير إلزامي؛ القرار لك ما لم يمنعه قانون آخر.",
    example: "You don't have to enter.",
  },
  {
    id: "past",
    title: "HAD TO / DIDN'T HAVE TO — الماضي",
    formula: "had to + V1 | didn't have to + V1 | Did + S + have to + V1?",
    keyRule: "لا توجد صيغة musted؛ نستخدم had to للضرورة في الماضي.",
    example: "I had to work yesterday.",
  },
  {
    id: "future",
    title: "WILL / WON'T HAVE TO — المستقبل",
    formula: "will have to + V1 | won't have to + V1 | Will + S + have to + V1?",
    keyRule: "بعد will أو won't يأتي دائمًا have to بصيغته الأساسية.",
    example: "I will have to study tomorrow.",
  },
];

export function SummaryDeck44() {
  const [filter, setFilter] = useField44("summary-filter");
  const visible = filter
    ? SUMMARY_CARDS.filter((c) => c.id === filter)
    : SUMMARY_CARDS;

  return (
    <Plate44
      kicker="لوحة المراجعة السريعة للقنوات الست"
      title="بطاقات القيادة الذهبية"
      channel="charter"
      intro="صفِّ البطاقات بحسب القناة الدلالية أو اعرضها معًا قبل الانتقال إلى خريطة التقدم:"
    >
      <div className="chips44 mb-3" role="group" aria-label="تصفية بطاقات الملخص الذهبي">
        <button
          type="button"
          className="chip44"
          aria-pressed={!filter}
          onClick={() => setFilter("")}
        >
          جميع القنوات (6)
        </button>
        {SUMMARY_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            className="chip44"
            aria-pressed={filter === card.id}
            onClick={() => setFilter(card.id)}
          >
            <Text44 text={card.title.split(" — ")[0]!} />
          </button>
        ))}
      </div>

      <div className="occ-summary-grid">
        {visible.map((card) => (
          <article key={card.id} className={`occ-summary-card occ-summary-card--${card.id}`}>
            <ChannelBadge44 channel={card.id} compact />
            <h4 className="occ-summary-title">
              <Text44 text={card.title} />
            </h4>
            <p className="formula44 font-en" dir="ltr">
              {card.formula}
            </p>
            <p className="occ-summary-rule">
              <Text44 text={card.keyRule} />
            </p>
            <p className="occ-summary-ex">
              <En44 text={card.example} />
            </p>
          </article>
        ))}
      </div>
    </Plate44>
  );
}
