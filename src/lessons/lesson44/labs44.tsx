import { Fragment, useContext, useState } from "react";
import {
  Article44,
  En44,
  Feedback44,
  Field44,
  Glyph44,
  Plate44,
  Text44,
  Workspace44,
  plain,
  useField44,
} from "./kit44";
import { SOURCE_SECTIONS_44, unitId44 } from "./ledger44";
import {
  checkPracticeAnswer44,
  normalizeEnglish44,
  practices44,
  type Practice44,
} from "./practiceData44";
import { practiceReason44 } from "./practiceNotes44";

const MARK = /^[①-⑳㉑-㉕]\s*/;

// ------------------------------------------------------------
// 1. Grammar Detective (Section 27) — 10 Attempt-Gated Repairs
// ------------------------------------------------------------
const DETECTIVE_FIXES_44: {
  correct: string;
  accepted: string[];
  why: string;
}[] = [
  {
    correct: "She must study harder.",
    accepted: ["she must study harder", "must study", "must"],
    why: "MUST فعل ناقص ثابت الصيغة لا يأخذ s مع أي فاعل.",
  },
  {
    correct: "He must finish the project.",
    accepted: ["he must finish the project", "must finish"],
    why: "بعد MUST نستخدم الفعل بصيغته الأساسية V1 مباشرة دون to.",
  },
  {
    correct: "She has to leave early.",
    accepted: ["she has to leave early", "has to leave", "has to"],
    why: "الفاعل She مفرد غائب، لذلك نستخدم has to وليس have to.",
  },
  {
    correct: "Does she have to wear a uniform?",
    accepted: ["does she have to wear a uniform", "have to wear", "does she have to"],
    why: "بعد Does يعود الفعل إلى صيغته الأساسية have to.",
  },
  {
    correct: "I didn't have to work yesterday.",
    accepted: [
      "i didn't have to work yesterday",
      "i did not have to work yesterday",
      "i didnt have to work yesterday",
      "didn't have to work",
      "didn't have to",
      "did not have to",
    ],
    why: "بعد didn't نستخدم have بصيغته الأساسية — لا had.",
  },
  {
    correct: "She will have to travel tomorrow.",
    accepted: [
      "she will have to travel tomorrow",
      "she'll have to travel tomorrow",
      "will have to travel",
      "will have to",
    ],
    why: "بعد will نستخدم have بصيغته الأساسية — لا has.",
  },
  {
    correct: "You mustn't enter this room.",
    accepted: [
      "you mustn't enter this room",
      "you must not enter this room",
      "you mustnt enter this room",
      "mustn't enter",
      "must not enter",
      "mustn't",
      "must not",
    ],
    why: "لا نقول don't must أبدًا؛ للتعبير عن المنع نستخدم mustn't (أو must not).",
  },
  {
    correct: "He doesn't have to come today.",
    accepted: [
      "he doesn't have to come today",
      "he does not have to come today",
      "he doesnt have to come today",
      "doesn't have to come",
      "doesn't have to",
      "does not have to",
    ],
    why: "بعد doesn't يعود الفعل إلى have — لا has.",
  },
  {
    correct: "Did they have to pay?",
    accepted: ["did they have to pay", "did they have to", "have to pay", "have to"],
    why: "لأن Did تحمل علامة الماضي، يعود الفعل إلى have to.",
  },
  {
    correct: "You don't have to come early tomorrow.",
    accepted: [
      "you don't have to come early tomorrow",
      "you do not have to come early tomorrow",
      "you dont have to come early tomorrow",
      "don't have to come early",
      "don't have to",
      "do not have to",
    ],
    why: "هذا خطأ في المعنى: mustn't تعني المنع، بينما المطلوب عدم الضرورة فنستخدم don't have to.",
  },
];

export function GrammarDetective44() {
  const section = SOURCE_SECTIONS_44[27]!;
  const lines = section.lines;
  const { values, set } = useContext(Workspace44);
  const checkedCount = DETECTIVE_FIXES_44.filter((_, i) => values[`det-${i}`]).length;

  const resetAll = () => {
    DETECTIVE_FIXES_44.forEach((_, i) => {
      set(`det-ans-${i}`, "");
      set(`det-${i}`, "");
    });
  };

  return (
    <Plate44
      kicker="مختبر المحقق النحوي"
      title="اكتشف الأخطاء العشرة واكتب التصحيح السليم"
      channel="prohibit"
      status={`تم التحقق: ${checkedCount} / ${DETECTIVE_FIXES_44.length}`}
    >
      <p className="plateIntro44" data-source-unit={unitId44(27, 0)}>
        <Text44 text={lines[0]!} />
      </p>
      <div className="practiceMeta44" aria-live="polite">
        <span className="practiceProgress44">
          تقدم التحقيق: <bdi dir="ltr">{checkedCount} / {DETECTIVE_FIXES_44.length}</bdi>
        </span>
        <span>اكتب تصحيح كل جملة وتحقّق منه؛ بعد إتمام الجمل العشر تُفتح خلاصة التحقيق والاكتشاف الأهم.</span>
        {checkedCount > 0 && (
          <button type="button" className="btn44 btn44--ghost" onClick={resetAll}>
            <Glyph44 name="refresh" /> إعادة التحقيق كاملًا
          </button>
        )}
      </div>
      <div className="tasks44">
        {DETECTIVE_FIXES_44.map((fix, i) => (
          <DetectiveItem44
            key={i}
            id={`det-${i}`}
            ansKey={`det-ans-${i}`}
            index={i + 1}
            lineIndex={i + 1}
            sentence={lines[i + 1]!}
            fix={fix}
          />
        ))}
      </div>
    </Plate44>
  );
}

function DetectiveItem44({
  id,
  ansKey,
  index,
  lineIndex,
  sentence,
  fix,
}: {
  id: string;
  ansKey: string;
  index: number;
  lineIndex: number;
  sentence: string;
  fix: { correct: string; accepted: string[]; why: string };
}) {
  const [draft, setDraft] = useField44(ansKey);
  const [checked, setChecked] = useField44(id);
  const cleanPrompt = plain(sentence.replace(MARK, ""));
  const norm = normalizeEnglish44(draft);
  const isRight = fix.accepted.some((a) => normalizeEnglish44(a) === norm);

  return (
    <article
      className="task44"
      data-exercise-id={id}
      data-source-unit={unitId44(27, lineIndex)}
    >
      <div className="taskTop44">
        <span className="taskNo44" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <span className="taskKind44">تشخيص وتصحيح</span>
      </div>
      <div className="taskSentence44 taskSentence44--broken">
        <Text44 text={cleanPrompt} />
      </div>
      <Field44
        label="اكتب الجملة بعد التصحيح (أو المقطع المصحَّح)"
        dir="ltr"
        rows={2}
        placeholder="Type the corrected English form..."
        value={draft}
        onChange={(v) => {
          setDraft(v);
          setChecked("");
        }}
      />
      <div className="taskActions44">
        {!checked ? (
          <>
            <button
              type="button"
              className="btn44 btn44--solid"
              disabled={!draft.trim()}
              onClick={() => setChecked("yes")}
            >
              تحقّق من التصحيح
            </button>
            <span className="taskHint44">اكتب محاولتك أولًا لفتح التصحيح والتعليل</span>
          </>
        ) : (
          <button
            type="button"
            className="btn44 btn44--ghost"
            onClick={() => {
              setDraft("");
              setChecked("");
            }}
          >
            <Glyph44 name="refresh" /> جرّب مرة أخرى
          </button>
        )}
      </div>
      {checked && (
        <Feedback44
          state={isRight ? "ok" : "no"}
          title={isRight ? "تصحيح سليم" : "قارن محاولتك بالصيغة السليمة"}
        >
          <p className="fbKey44">
            <En44 text={fix.correct} />
          </p>
          <p>
            <Text44 text={fix.why} />
          </p>
        </Feedback44>
      )}
    </article>
  );
}

/** Deferred summary block for Section 27 — rendered ONLY after all 10 items are attempted. */
export function DetectiveSourceKey44() {
  const { values } = useContext(Workspace44);
  const revealed = DETECTIVE_FIXES_44.filter((_, i) => values[`det-${i}`]).length;
  if (revealed < DETECTIVE_FIXES_44.length) return null;
  return (
    <div className="sourceKey44">
      <h3 className="sourceKeyTitle44" data-source-unit={unitId44(27, 11)}>
        <Text44 text={SOURCE_SECTIONS_44[27]!.lines[11]!} />
      </h3>
      <Article44 section={27} from={12} />
    </div>
  );
}

// ------------------------------------------------------------
// 2. Practice Sets (Sections 28–32) — Attempt-Gated Auto-Graded
// ------------------------------------------------------------
type Consumed = { item: Practice44; promptLines: number[]; optionLines: number[] };

function consumePractice(section: number): {
  rows: Consumed[];
  used: Set<number>;
  keyIndex: number;
} {
  const lines = SOURCE_SECTIONS_44[section]!.lines;
  const used = new Set<number>();
  const keyIndex = lines.findIndex((l) => l.trim() === "الحلول");
  const limit = keyIndex >= 0 ? keyIndex : lines.length;
  const norm = (t: string) => t.replace(MARK, "").trim();

  const rows = practices44(section).map((item) => {
    const promptLines: number[] = [];
    for (let i = 0; i < limit; i++) {
      if (used.has(i)) continue;
      const text = norm(lines[i]!);
      if (text.length >= 10 && item.prompt.includes(text)) {
        used.add(i);
        promptLines.push(i);
      }
    }
    const optionLines: number[] = [];
    for (const option of item.options) {
      for (let i = 0; i < limit; i++) {
        if (used.has(i)) continue;
        if (lines[i]!.trim() === option) {
          used.add(i);
          optionLines.push(i);
          break;
        }
      }
    }
    return { item, promptLines, optionLines };
  });

  return { rows, used, keyIndex };
}

export function PracticeSet44({ section }: { section: number }) {
  const sec = SOURCE_SECTIONS_44[section]!;
  const { rows, used, keyIndex } = consumePractice(section);
  const { values, set } = useContext(Workspace44);
  const checked = rows.filter(({ item }) => values[`${item.id}-check`]).length;
  const correctCount = rows.filter(
    ({ item }) =>
      values[`${item.id}-check`] &&
      checkPracticeAnswer44(item, values[item.id] ?? "")
  ).length;
  const allChecked = checked === rows.length && rows.length > 0;

  const resetSet = () => {
    rows.forEach(({ item }) => {
      set(item.id, "");
      set(`${item.id}-check`, "");
    });
  };

  return (
    <div className="practice44">
      <Article44
        section={section}
        from={0}
        to={keyIndex >= 0 ? keyIndex : sec.lines.length}
        exclude={used}
      />

      <Plate44
        kicker="منصة التدريب التطبيقي"
        title="أجب عن البنود الخمسة وتحقّق من إجابتك"
        status={`${checked} / ${rows.length} تم التحقق`}
      >
        <div className="practiceMeta44" aria-live="polite">
          <span className="practiceProgress44">
            التقدم: <bdi dir="ltr">{checked} / {rows.length}</bdi> · الإجابات الصحيحة:{" "}
            <bdi dir="ltr">{correctCount} / {rows.length}</bdi>
          </span>
          <span>تُفتح خلاصة الحلول الكاملة بعد التحقق من البنود الخمسة جميعًا.</span>
          {checked > 0 && (
            <button type="button" className="btn44 btn44--ghost" onClick={resetSet}>
              <Glyph44 name="refresh" /> إعادة التدريب
            </button>
          )}
        </div>

        <div className="tasks44">
          {rows.map(({ item, promptLines, optionLines }, i) => (
            <PracticeItem44
              key={item.id}
              item={item}
              index={i + 1}
              promptLines={promptLines}
              optionLines={optionLines}
            />
          ))}
        </div>
      </Plate44>

      {allChecked && keyIndex >= 0 && (
        <div className="sourceKey44">
          <h3 className="sourceKeyTitle44" data-source-unit={unitId44(section, keyIndex)}>
            <Text44 text={sec.lines[keyIndex]!} />
          </h3>
          <Article44 section={section} from={keyIndex + 1} />
        </div>
      )}
    </div>
  );
}

function PracticeItem44({
  item,
  index,
  promptLines,
  optionLines,
}: {
  item: Practice44;
  index: number;
  promptLines: number[];
  optionLines: number[];
}) {
  const [answer, setAnswer] = useField44(item.id);
  const [checked, setChecked] = useField44(`${item.id}-check`);
  const reason = practiceReason44(item.section, item.number);
  const promptUnits = promptLines.map((i) => unitId44(item.section, i)).join(" ");
  const keyLetter = item.sourceAnswer.match(/^([A-E])\b/)?.[1] ?? "";
  const letterOf = (value: string) => value.match(/^([A-E])\./)?.[1] ?? "";
  const right = checkPracticeAnswer44(item, answer);

  if (item.options.length > 0) {
    return (
      <article
        className="task44"
        data-exercise-id={item.id}
        data-source-unit={promptUnits || undefined}
      >
        <div className="taskTop44">
          <span className="taskNo44" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
          <span className="taskKind44">اختر الإجابة الأنسب</span>
        </div>
        <div className="taskPrompt44">
          <Text44 text={item.prompt} />
        </div>
        <div className="answers44" role="group" aria-label={`خيارات البند ${index}`}>
          {item.options.map((option, k) => {
            const unit =
              optionLines[k] !== undefined
                ? unitId44(item.section, optionLines[k]!)
                : undefined;
            const picked = answer === option;
            const isRight = keyLetter !== "" && letterOf(option) === keyLetter;
            return (
              <button
                key={option}
                type="button"
                className="answer44"
                aria-pressed={picked}
                data-source-unit={unit}
                data-state={
                  checked ? (isRight ? "right" : picked ? "wrong" : undefined) : undefined
                }
                onClick={() => {
                  setAnswer(option);
                  setChecked("");
                }}
              >
                <span className="answerLetter44" aria-hidden="true">
                  {option.match(/^([A-E])\./)?.[1] ?? ["A", "B", "C"][k]}
                </span>
                <span className="answerText44 font-en" dir="ltr" lang="en">
                  {option.replace(/^[A-E]\.\s*/, "")}
                </span>
                {checked && isRight && <span className="answerTag44">✓ الصواب</span>}
                {checked && picked && !isRight && (
                  <span className="answerTag44 answerTag44--no">✕ اختيارك</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="taskActions44">
          {!checked ? (
            <>
              <button
                type="button"
                className="btn44 btn44--solid"
                disabled={!answer}
                onClick={() => setChecked("yes")}
              >
                تحقّق
              </button>
              <span className="taskHint44">اختر إجابة ثم اضغط تحقق</span>
            </>
          ) : (
            <button
              type="button"
              className="btn44 btn44--ghost"
              onClick={() => {
                setAnswer("");
                setChecked("");
              }}
            >
              <Glyph44 name="refresh" /> جرّب مرة أخرى
            </button>
          )}
        </div>
        {checked && (
          <Feedback44
            state={right ? "ok" : "no"}
            title={right ? "إجابة صحيحة" : "راجع الاختيار"}
          >
            <p className="fbKey44">
              الإجابة النموذجية:{" "}
              <span dir="ltr" className="font-en">
                {item.sourceAnswer}
              </span>
            </p>
            <p>
              <Text44 text={reason} />
            </p>
          </Feedback44>
        )}
      </article>
    );
  }

  return (
    <article
      className="task44"
      data-exercise-id={item.id}
      data-source-unit={promptUnits || undefined}
    >
      <div className="taskTop44">
        <span className="taskNo44" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <span className="taskKind44">{item.parts[0] ?? "أكمل / حوّل"}</span>
      </div>
      <div className="taskPrompt44">
        <Text44 text={item.prompt} />
      </div>
      <Field44
        label="إجابتك بالإنجليزية"
        dir="ltr"
        value={answer}
        placeholder="Write your English answer..."
        onChange={(v) => {
          setAnswer(v);
          setChecked("");
        }}
        rows={2}
      />
      <div className="taskActions44">
        {!checked ? (
          <>
            <button
              type="button"
              className="btn44 btn44--solid"
              disabled={!answer.trim()}
              onClick={() => setChecked("yes")}
            >
              تحقّق من الإجابة
            </button>
            <span className="taskHint44">اكتب إجابتك أولًا لعرض التصحيح</span>
          </>
        ) : (
          <button
            type="button"
            className="btn44 btn44--ghost"
            onClick={() => {
              setAnswer("");
              setChecked("");
            }}
          >
            <Glyph44 name="refresh" /> امسح وحاول مرة أخرى
          </button>
        )}
      </div>
      {checked && (
        <Feedback44
          state={right ? "ok" : "no"}
          title={right ? "إجابة سليمة" : "قارن محاولتك بالإجابة النموذجية"}
        >
          <p className="fbKey44">
            <Text44 text={item.sourceAnswer} />
          </p>
          <p>
            <Text44 text={reason} />
          </p>
        </Feedback44>
      )}
    </article>
  );
}

// ------------------------------------------------------------
// 3. Reading Challenge (Section 33) — Story + 10 Comprehension Qs
// ------------------------------------------------------------
const READING_ITEMS_44: {
  answer: string;
  keywords: RegExp[];
  explainAr: string;
}[] = [
  {
    answer: "They are visiting a science centre.",
    keywords: [/science\s+cent(re|er)/i],
    explainAr: "ورد في مطلع القصة: Maya and her classmates are visiting a science centre.",
  },
  {
    answer: "Everyone must stay with the group.",
    keywords: [/stay\s+with\s+the\s+group/i],
    explainAr: "أول قاعدة ذكرتها المعلمة: Everyone must stay with the group.",
  },
  {
    answer: "They mustn't touch the equipment without permission.",
    keywords: [/equipment/i],
    explainAr: "حذّرتهم المعلمة من لمس المعدات (the equipment) دون إذن المرشد.",
  },
  {
    answer: "No, they don't.",
    keywords: [/\bno\b/i, /don'?t\s+have\s+to/i],
    explainAr: "أجابت المعلمة: No, you don't have to لأن المركز يوفّر أوراق العمل.",
  },
  {
    answer: "Because she doesn't have to carry a heavy bag today.",
    keywords: [/heavy\s+bag/i, /bag/i],
    explainAr: "فرحت مايا لأنها اضطرت لحمل حقيبة ثقيلة أمس ولن تضطر لحملها اليوم.",
  },
  {
    answer: "They must listen carefully.",
    keywords: [/listen\s+carefully/i, /\blisten\b/i],
    explainAr: "أوضح المرشد: You must listen carefully during the demonstrations.",
  },
  {
    answer: "No, they don't.",
    keywords: [/\bno\b/i, /can\s+ask\s+questions/i, /don'?t\s+have\s+to/i],
    explainAr: "قال المرشد إنهم غير ملزمين بالصمت طوال الوقت ويمكنهم طرح الأسئلة.",
  },
  {
    answer: "They will have to work in small teams to design a simple machine.",
    keywords: [/small\s+teams/i, /design\s+a\s+simple\s+machine/i, /simple\s+machine/i],
    explainAr: "مفاجأة الغد: العمل في فرق صغيرة لتصميم آلة بسيطة.",
  },
  {
    answer: "A strong personal determination.",
    keywords: [
      /determination/i,
      /personal/i,
      /speaker/i,
      /تأكيد/,
      /تصميم/,
      /عزم/,
      /شخصي/,
    ],
    explainAr: "جملة دانيال I must do my best تعبّر عن عزم وتأكيد شخصي قوي من المتحدث.",
  },
  {
    answer: "I had to carry a heavy bag yesterday.",
    keywords: [/had\s+to\s+carry/i, /heavy\s+bag\s+yesterday/i],
    explainAr: "جملة مايا I had to carry a heavy bag yesterday هي مثال الضرورة في الماضي.",
  },
];

const READING_QUESTION_LINES_44 = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

export function ReadingChallenge44() {
  const sec = SOURCE_SECTIONS_44[33]!;
  const [highlightModals, setHighlightModals] = useState(true);
  const { values, set } = useContext(Workspace44);
  const done = READING_ITEMS_44.filter((_, i) => values[`read-${i}-check`]).length;

  const resetReading = () => {
    READING_ITEMS_44.forEach((_, i) => {
      set(`read-${i}`, "");
      set(`read-${i}-check`, "");
    });
  };

  return (
    <div className="reading44">
      <article className="reader44" aria-labelledby="reader-title-44">
        <div className="readerTop44">
          <p className="kicker44">تحدي القراءة السياقي</p>
          <button
            type="button"
            className="btn44 btn44--ghost"
            aria-pressed={highlightModals}
            onClick={() => setHighlightModals((v) => !v)}
          >
            {highlightModals ? "إيقاف تمييز صيغ الإلزام" : "تمييز صيغ الإلزام داخل النص"}
          </button>
        </div>
        <h3
          className="readerTitle44 font-en"
          id="reader-title-44"
          data-source-unit={unitId44(33, 0)}
          dir="ltr"
          lang="en"
        >
          {sec.lines[0]}
        </h3>
        <div className="readerBody44">
          {sec.lines.slice(1, 17).map((line, k) => (
            <p
              key={k}
              data-source-unit={unitId44(33, k + 1)}
              dir="ltr"
              lang="en"
              className={
                line.startsWith('"')
                  ? "readerLine44 readerLine44--quote font-en"
                  : "readerLine44 font-en"
              }
            >
              {highlightModals ? <En44 text={line} /> : line}
            </p>
          ))}
        </div>
      </article>

      <section className="questions44" aria-labelledby="reader-questions-44">
        <div className="practiceMeta44" aria-live="polite">
          <h3
            className="questionsTitle44"
            id="reader-questions-44"
            data-source-unit={unitId44(33, 17)}
          >
            <Text44 text={sec.lines[17]!} />
          </h3>
          <span className="practiceProgress44">
            تمت مراجعة: <bdi dir="ltr">{done} / {READING_ITEMS_44.length}</bdi>
          </span>
          {done > 0 && (
            <button type="button" className="btn44 btn44--ghost" onClick={resetReading}>
              <Glyph44 name="refresh" /> إعادة المحاولة
            </button>
          )}
        </div>

        <div className="qGrid44">
          {READING_ITEMS_44.map((item, i) => (
            <ReadingItem44
              key={i}
              id={`read-${i}`}
              index={i + 1}
              question={sec.lines[READING_QUESTION_LINES_44[i]!]!}
              item={item}
            />
          ))}
        </div>

        {done === READING_ITEMS_44.length && (
          <div className="sourceKey44">
            <h3 className="sourceKeyTitle44" data-source-unit={unitId44(33, 28)}>
              <Text44 text={sec.lines[28]!} />
            </h3>
            <Article44 section={33} from={29} to={39} />
          </div>
        )}
      </section>
    </div>
  );
}

function ReadingItem44({
  id,
  index,
  question,
  item,
}: {
  id: string;
  index: number;
  question: string;
  item: { answer: string; keywords: RegExp[]; explainAr: string };
}) {
  const [text, setText] = useField44(id);
  const [checked, setChecked] = useField44(`${id}-check`);
  const cleanQ = question.replace(MARK, "");
  const matched = item.keywords.some((rx) => rx.test(text.trim()));

  return (
    <article
      className="qCard44"
      data-exercise-id={id}
      data-source-unit={unitId44(33, READING_QUESTION_LINES_44[index - 1]!)}
    >
      <div className="qTop44">
        <span className="qNo44" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="qText44">
        <Text44 text={cleanQ} />
      </div>
      <label className="field44 field44--tight">
        <span className="fieldLabel44">إجابتك</span>
        <textarea
          rows={2}
          dir="auto"
          value={text}
          placeholder="اكتب إجابتك انطلاقًا من القصة..."
          onChange={(e) => {
            setText(e.target.value);
            setChecked("");
          }}
        />
      </label>
      <div className="taskActions44">
        {!checked ? (
          <button
            type="button"
            className="btn44 btn44--solid"
            disabled={!text.trim()}
            onClick={() => setChecked("yes")}
          >
            تحقّق وقارن بالحل
          </button>
        ) : (
          <button
            type="button"
            className="btn44 btn44--ghost"
            onClick={() => {
              setText("");
              setChecked("");
            }}
          >
            <Glyph44 name="refresh" /> مسح وإعادة
          </button>
        )}
      </div>
      {checked && (
        <Feedback44
          state={matched ? "ok" : "info"}
          title={matched ? "أحسنت — التقطت الفكرة الصحيحة" : "قارن إجابتك بالجواب النموذجي"}
        >
          <p className="fbKey44 font-en" dir="ltr" lang="en">
            {item.answer}
          </p>
          <p>
            <Text44 text={item.explainAr} />
          </p>
        </Feedback44>
      )}
    </article>
  );
}

// ------------------------------------------------------------
// 4. Writing Mission (Section 36) — Live Pattern Detector + Checklist
// ------------------------------------------------------------
const WRITING_REQUIREMENTS_44: {
  label: string;
  detect: (draft: string) => boolean;
}[] = [
  {
    label: "ثلاث جمل باستخدام MUST",
    detect: (d) => (d.match(/\bmust\b(?!\s*not\b|n't\b)/gi) ?? []).length >= 3,
  },
  {
    label: "ثلاث جمل باستخدام HAVE TO أو HAS TO",
    detect: (d) =>
      (
        d.match(
          /(?<!\b(?:don't|doesn't|didn't|won't|will|do|does|did|not)\s+(?:[a-z]+\s+)?)(\bhave to\b|\bhas to\b)/gi
        ) ?? []
      ).length >= 3 || (d.match(/\b(have to|has to)\b/gi) ?? []).length >= 3,
  },
  {
    label: "جملتان باستخدام MUSTN'T",
    detect: (d) => (d.match(/\b(mustn't|must not)\b/gi) ?? []).length >= 2,
  },
  {
    label: "جملتان باستخدام DON'T HAVE TO أو DOESN'T HAVE TO",
    detect: (d) =>
      (d.match(/\b(don't|do not|doesn't|does not)\s+have to\b/gi) ?? []).length >= 2,
  },
  {
    label: "جملة باستخدام HAD TO",
    detect: (d) => /\bhad to\b/i.test(d),
  },
  {
    label: "جملة باستخدام DIDN'T HAVE TO",
    detect: (d) => /\b(didn't|did not)\s+have to\b/i.test(d),
  },
  {
    label: "جملة باستخدام WILL HAVE TO",
    detect: (d) => /\b(will|'ll)\s+have to\b/i.test(d),
  },
  {
    label: "سؤال باستخدام DO/DOES + HAVE TO",
    detect: (d) => /\b(do|does)\s+[a-z]+\s+have to\b[^.?]*\?/i.test(d),
  },
];

export function WritingMission44() {
  const sec = SOURCE_SECTIONS_44[36]!;
  const [draft, setDraft] = useField44("writing-draft");
  const [bonusNotes, setBonusNotes] = useField44("writing-bonus");
  const { values } = useContext(Workspace44);

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const sentenceCount = draft.trim()
    ? (draft.match(/[.!?]+/g) ?? []).length
    : 0;
  const manualDone = WRITING_REQUIREMENTS_44.filter(
    (_, i) => values[`write-check-${i}`]
  ).length;
  const autoDetected = WRITING_REQUIREMENTS_44.filter((r) =>
    r.detect(draft.replace(/[’]/g, "'"))
  ).length;

  return (
    <div className="writing44">
      <Plate44
        kicker="مهمة الإنتاج الكتابي"
        title="My School Rules and Responsibilities"
        channel="charter"
      >
        <Article44 section={36} from={0} to={12} />
      </Plate44>

      <Plate44
        kicker="نموذج تطبيقي متكامل"
        title="اقرأ الفقرة الإرشادية ولاحظ توزيع الصيغ"
        channel="must"
      >
        <div className="model44">
          <p className="modelText44 font-en" dir="ltr" lang="en">
            {sec.lines.slice(12, 21).map((line, k) => (
              <Fragment key={k}>
                <span data-source-unit={unitId44(36, k + 12)}>
                  <En44 text={line} />
                </span>{" "}
              </Fragment>
            ))}
          </p>
        </div>
        <Article44 section={36} from={21} />
      </Plate44>

      <Plate44
        kicker="مرسم الكتابة والتدقيق الذاتي"
        title="اكتب فقرتك الخاصة (12–15 جملة)"
        channel="future"
        status={`${sentenceCount} جمل · ${wordCount} كلمة`}
      >
        <Field44
          label="مسودة فقرتك الإنجليزية (تُحفظ تلقائيًا أثناء التنقل داخل الدرس)"
          dir="ltr"
          rows={7}
          placeholder="At my school, students must ... Do we have to ...?"
          value={draft}
          onChange={setDraft}
        />

        <div className="practiceMeta44" aria-live="polite">
          <span>
            رصد الصيغ التلقائي:{" "}
            <bdi dir="ltr">
              {autoDetected} / {WRITING_REQUIREMENTS_44.length}
            </bdi>
          </span>
          <span>
            تأكيد المراجعة الذاتية:{" "}
            <bdi dir="ltr">
              {manualDone} / {WRITING_REQUIREMENTS_44.length}
            </bdi>
          </span>
        </div>

        <ul className="checklist44">
          {WRITING_REQUIREMENTS_44.map((req, i) => {
            const detected = req.detect(draft.replace(/[’]/g, "'"));
            return (
              <WritingCheckRow44
                key={i}
                index={i}
                label={req.label}
                detected={detected}
              />
            );
          })}
        </ul>

        <div className="mt-4">
          <Field44
            label="مساحة التحدي الإضافي: فسّر اختيارك لثلاث جمل إثبات وجملتي نفي"
            dir="auto"
            rows={3}
            placeholder="اكتب ملاحظاتك التفسيرية حول الفرق بين MUST وHAVE TO وبين المنع وعدم الضرورة في جملك..."
            value={bonusNotes}
            onChange={setBonusNotes}
          />
        </div>
      </Plate44>
    </div>
  );
}

function WritingCheckRow44({
  index,
  label,
  detected,
}: {
  index: number;
  label: string;
  detected: boolean;
}) {
  const [value, setValue] = useField44(`write-check-${index}`);
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => setValue(e.target.checked ? "yes" : "")}
        />
        <span className="checkMark44" aria-hidden="true">
          <Glyph44 name="check" />
        </span>
        <span className="flex-1">
          <Text44 text={label} />
        </span>
        {detected && <span className="answerTag44">رُصدت في مسودتك ✓</span>}
      </label>
    </li>
  );
}

// ------------------------------------------------------------
// 5. Curriculum Roadmap (Section 38) — 44 / 120 + Lesson 45 Preview
// ------------------------------------------------------------
export function Roadmap44({ onOpenTest }: { onOpenTest?: () => void }) {
  return (
    <div className="roadmap44">
      <div className="progressPlate44">
        <div className="progressHead44">
          <div>
            <p className="kicker44">خريطة التقدم في المنهج الشامل</p>
            <p className="progressTr44">44 درسًا مكتملًا · 76 درسًا متبقيًا</p>
          </div>
          <p className="progressNum44 font-en" aria-hidden="true">
            <bdi dir="ltr">44 / 120</bdi>
          </p>
        </div>
        <div className="ticks44" role="img" aria-label="التقدم 44 من أصل 120 درسًا">
          {Array.from({ length: 120 }, (_, i) => (
            <span
              key={i}
              className={
                i < 43
                  ? "tick44 is-done"
                  : i === 43
                    ? "tick44 is-done is-current"
                    : "tick44"
              }
            />
          ))}
        </div>
      </div>

      <Plate44
        kicker="تفاصيل المحطة الحالية والقادمة"
        title="من لغة الضرورة والإلزام إلى لغة النصيحة المتوازنة"
        channel="future"
      >
        <Article44 section={38} />
      </Plate44>

      <div className="nextLesson44">
        <p className="kicker44">المحطة القادمة قيد الإعداد</p>
        <p className="nextTitle44 font-en" dir="ltr" lang="en">
          Lesson 45 — SHOULD &amp; OUGHT TO
        </p>
        <p className="nextSub44 font-en" dir="ltr" lang="en">
          Advice, Recommendations &amp; Expectations
        </p>
        {onOpenTest && (
          <div className="taskActions44 mt-3">
            <button type="button" className="btn44 btn44--solid" onClick={onOpenTest}>
              الانتقال إلى الاختبار النهائي الشامل (25 سؤالًا) <Glyph44 name="arrow" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
