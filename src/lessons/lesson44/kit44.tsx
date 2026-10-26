import { createContext, Fragment, useContext, type ReactNode } from "react";
import { Rich } from "../../shared/lessonKit";
import {
  DUTY_CHANNELS_44,
  SOURCE_SECTIONS_44,
  unitId44,
  type DutyChannelId44,
} from "./ledger44";

// ============================================================
// The Obligation Command Center Kit — Lesson 44 only.
// Scoped strictly under `.obligation44` in lesson44.css.
// ============================================================

export const Workspace44 = createContext<{
  values: Record<string, string>;
  set: (key: string, value: string) => void;
}>({
  values: {},
  set: () => {},
});

export function useField44(key: string): [string, (value: string) => void] {
  const store = useContext(Workspace44);
  return [store.values[key] ?? "", (value) => store.set(key, value)];
}

// ------------------------------------------------------------
// BIDI-safe text primitives
// ------------------------------------------------------------
const ARABIC = /[\u0600-\u06FF]/;
const LATIN = /[A-Za-z]/;
export const isEnglishOnly = (text: string) => LATIN.test(text) && !ARABIC.test(text);
export const isArabicOnly = (text: string) => ARABIC.test(text) && !LATIN.test(text);

/** Mixed Arabic/English string: English runs isolated LTR via shared BIDI kit. */
export function Text44({ text, className = "" }: { text: string; className?: string }) {
  if (isEnglishOnly(text)) {
    return (
      <span dir="ltr" lang="en" className={`en44 font-en ${className}`.trim()}>
        {text}
      </span>
    );
  }
  if (!ARABIC.test(text)) {
    return <span className={className}>{text}</span>;
  }
  const labelled = text.match(/^([^:]*?):\s+([A-Za-z][\s\S]*)$/);
  if (labelled && isArabicOnly(labelled[1]!) && isEnglishOnly(labelled[2]!)) {
    return (
      <span className={className}>
        <span className="labelAr44">{labelled[1]}:</span>{" "}
        <span dir="ltr" lang="en" className="en44 font-en">
          {labelled[2]}
        </span>
      </span>
    );
  }
  return (
    <span className={className}>
      <Rich text={text} />
    </span>
  );
}

/** Step heading keeping Arabic prefix/colon RTL and trailing bilingual/English phrase isolated LTR. */
export function Title44({ text }: { text: string }) {
  const match = text.match(/^(.+?:)\s+([A-Za-z][\s\S]*)$/);
  if (!match) return <Text44 text={text} />;
  return (
    <>
      <span className="titleAr44">{match[1]}</span>{" "}
      <span className="titleEn44" dir="ltr" lang="en">
        <Text44 text={match[2]!} />
      </span>
    </>
  );
}

/** Bilingual label such as "المستوى الأول: Multiple Choice". */
export function Label44({ text }: { text: string }) {
  const match = text.match(/^(.+?):\s*([A-Za-z].*)$/);
  if (!match) return <Text44 text={text} />;
  return (
    <>
      <span className="labelAr44">
        <Text44 text={match[1]!} />
      </span>{" "}
      <span className="labelEn44 font-en" dir="ltr" lang="en">
        {match[2]}
      </span>
    </>
  );
}

// ------------------------------------------------------------
// Semantic Obligation Highlighting (never color alone)
// ------------------------------------------------------------
export type ModalKind = "must" | "haveto" | "prohibit" | "unnec" | "past" | "future";

const MODAL_RX =
  /(\bmustn't\b|\bmust not\b|\bdon't have to\b|\bdoesn't have to\b|\bdidn't have to\b|\bwon't have to\b|\bwill have to\b|\bhad to\b|\bhave to\b|\bhas to\b|\bmust\b)/gi;

export function modalKind(token: string): ModalKind {
  const t = token.toLowerCase().replace(/[’]/g, "'");
  if (t.startsWith("mustn") || t === "must not") return "prohibit";
  if (t === "had to") return "past";
  if (t === "will have to") return "future";
  if (
    t === "don't have to" ||
    t === "doesn't have to" ||
    t === "didn't have to" ||
    t === "won't have to"
  ) {
    return "unnec";
  }
  if (t === "have to" || t === "has to") return "haveto";
  return "must";
}

export function modalKinds(text: string): ModalKind[] {
  return [...new Set([...text.matchAll(MODAL_RX)].map((m) => modalKind(m[0])))];
}

export function En44({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(MODAL_RX)) {
    const at = match.index ?? 0;
    if (at > last) nodes.push(<Fragment key={key++}>{text.slice(last, at)}</Fragment>);
    nodes.push(
      <mark key={key++} className={`m44 m44--${modalKind(match[0])}`}>
        {match[0]}
      </mark>
    );
    last = at + match[0].length;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return (
    <span dir="ltr" lang="en" className="en44 font-en">
      {nodes}
    </span>
  );
}

// ------------------------------------------------------------
// Inline Vector Icons (Accessible, Zero External Assets)
// ------------------------------------------------------------
export type IconName =
  | "check"
  | "cross"
  | "lock"
  | "arrow"
  | "pen"
  | "book"
  | "alert"
  | "insight"
  | "rule"
  | "spark"
  | "minus"
  | "ban"
  | "circle"
  | "compass"
  | "scale"
  | "clipboard"
  | "open"
  | "rewind"
  | "forward"
  | "refresh";

const ICON_PATHS: Record<IconName, ReactNode> = {
  check: <path d="M4 12.5 9.5 18 20 6.5" />,
  cross: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  arrow: <path d="M20 12H4m6-6-6 6 6 6" />,
  pen: (
    <>
      <path d="M4 20h4L20 8l-4-4L4 16v4Z" />
      <path d="m14 6 4 4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
      <path d="M4 18.5V5.5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 3 20h18L12 4Z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
  insight: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M8.5 14.5a6 6 0 1 1 7 0c-.9.7-1.5 1.4-1.5 2.5h-4c0-1.1-.6-1.8-1.5-2.5Z" />
    </>
  ),
  rule: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h10" />
      <path d="M4 17h16" />
    </>
  ),
  spark: <path d="M12 3l2.2 6.2L20 12l-5.8 2.8L12 21l-2.2-6.2L4 12l5.8-2.8L12 3Z" />,
  minus: <path d="M5 12h14" />,
  ban: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.8 18.2 18.2 5.8" />
    </>
  ),
  circle: <circle cx="12" cy="12" r="9" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polygon points="10,10 16,8 14,14 8,16" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7 2.5 13h5L5 7Z" />
      <path d="M19 7l-2.5 6h5L19 7Z" />
      <path d="M8 21h8" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4.5h6v2.5H9z" />
      <path d="M8.5 11h7" />
      <path d="M8.5 15h5" />
    </>
  ),
  open: (
    <>
      <circle cx="12" cy="12" r="8.5" strokeDasharray="3 2.5" />
      <path d="M9 12.2 11.2 14.5 15.5 9.8" />
    </>
  ),
  rewind: (
    <>
      <path d="M11 7 5 12l6 5V7Z" />
      <path d="M19 7l-6 5 6 5V7Z" />
    </>
  ),
  forward: (
    <>
      <path d="M5 7l6 5-6 5V7Z" />
      <path d="M13 7l6 5-6 5V7Z" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.5-4.6L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.5 4.6L20 16" />
      <path d="M20 20v-4h-4" />
    </>
  ),
};

export function Glyph44({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      className={`glyph44 ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/** Semantic Duty Channel Badge — combines vector icon, border geometry, English code, and Arabic meaning. */
export function ChannelBadge44({
  channel,
  compact = false,
}: {
  channel: DutyChannelId44;
  compact?: boolean;
}) {
  const meta = DUTY_CHANNELS_44[channel];
  return (
    <span className={`occ-channel-badge occ-channel-badge--${channel}`}>
      <Glyph44 name={meta.icon} />
      {compact ? (
        <span dir="ltr" lang="en" className="font-en occ-channel-code">
          {meta.codeEn}
        </span>
      ) : (
        <Text44 text={`${meta.codeEn} — ${meta.labelAr}`} />
      )}
    </span>
  );
}

// ------------------------------------------------------------
// Structured Lesson Briefing Renderer (1:1 unit preservation)
// ------------------------------------------------------------
type Slice = { i: number; text: string };
type NoteTone = "amber" | "violet" | "cobalt" | "coral";
type Block =
  | { kind: "table"; rows: Slice[] }
  | { kind: "example"; en: Slice; ar?: Slice }
  | { kind: "contrast"; panes: { line: Slice; kind: ModalKind }[] }
  | { kind: "solo"; line: Slice }
  | { kind: "term"; line: Slice }
  | { kind: "formula"; line: Slice }
  | { kind: "definition"; line: Slice }
  | { kind: "verdicts"; rows: Slice[] }
  | { kind: "list"; items: Slice[] }
  | { kind: "bullets"; items: Slice[] }
  | { kind: "lead"; line: Slice }
  | { kind: "subhead"; line: Slice }
  | { kind: "body"; line: Slice }
  | { kind: "note"; head: Slice; tone: NoteTone; icon: IconName; blocks: Block[] };

const SUBHEADS = new Set([
  "التحليل",
  "تحليل الحوار",
  "الفرق بين السياقين",
  "المعنى",
  "الفكرة",
  "الترجمة",
  "نموذج إرشادي",
  "تحدي إضافي",
  "التقدم الكلي",
  "النفي",
  "الماضي",
  "المستقبل",
  "السؤال",
  "مقارنة شاملة",
  "مثال من الحياة اليومية",
]);
const PLAIN_LEADS = new Set(["المثال الأول", "المثال الثاني", "المثال الثالث", "مثال آخر"]);
const NOTES: Record<string, { tone: NoteTone; icon: IconName }> = {
  انتبه: { tone: "amber", icon: "alert" },
  لاحظ: { tone: "amber", icon: "alert" },
  ملاحظة: { tone: "violet", icon: "insight" },
  "ملاحظة مهمة": { tone: "violet", icon: "insight" },
  "نقطة دقيقة": { tone: "violet", icon: "insight" },
  "اكتشاف مهم": { tone: "violet", icon: "insight" },
  "أهم اكتشاف": { tone: "violet", icon: "insight" },
  "فرق مهم في الإجابة": { tone: "violet", icon: "insight" },
  "الخطأ الشائع": { tone: "coral", icon: "cross" },
  "القاعدة الذهبية": { tone: "cobalt", icon: "rule" },
  "القاعدة الذهبية الكبرى": { tone: "cobalt", icon: "rule" },
};

const CONTRAST_LABEL: Record<ModalKind, { label: string; icon: IconName }> = {
  must: { label: "إلزام قوي · MUST", icon: "scale" },
  haveto: { label: "متطلب واقعي · HAVE TO", icon: "clipboard" },
  prohibit: { label: "منع قاطع · MUSTN'T", icon: "ban" },
  unnec: { label: "عدم ضرورة · DON'T HAVE TO", icon: "open" },
  past: { label: "ماضٍ · HAD TO", icon: "rewind" },
  future: { label: "مستقبل · WILL HAVE TO", icon: "forward" },
};

const CLEAN_TAIL = /[✅❌✓✗]+\s*$/;
const MARK = /^[①-⑳㉑-㉕]\s*/;
const hasGood = (t: string) => /[✅✓]/.test(t);
const hasBad = (t: string) => /[❌✗]/.test(t);
export const plain = (t: string) => t.replace(CLEAN_TAIL, "").trim();
const isTable = (t: string) => t.includes(" | ");
const isVerdict = (t: string) => hasGood(t) || hasBad(t);
const isNumbered = (t: string) => /^[①-⑳㉑-㉕]/.test(t);
const isBullet = (t: string) => /^-\s+/.test(t);
const isFormula = (t: string) =>
  !ARABIC.test(t) && /\s\+\s/.test(t) && /^[A-Za-z]/.test(t) && t.length < 72;

const GLOSS_STOP =
  /^(الحلول|أمثلة|انتبه|ملاحظة|الترجمة|تحليل|السبب|الإجابات|السؤال|لكن|وليس|صحيح|خطأ|تعني|المطلوب|فرق|إلا|أهم|كل جملة|الجملتان|كلتاهما|ليستا|الأولى|الثانية|إذا|أما|سنتعلم|ولا يُفضَّل|أسئلة|توصية|تعليمات|قاعدة|قواعد|نقطة|اشرح|تحدي)/;
const TERM_SHAPE = /^[A-Z][A-Za-z'’& ]{2,22}\.?$/;
const isExampleSentence = (t: string) =>
  isEnglishOnly(t) &&
  t.length >= 18 &&
  /\s/.test(t) &&
  !TERM_SHAPE.test(t) &&
  !/[✅❌✓✗]/.test(t) &&
  !t.includes("—") &&
  /[.!?"”]$/.test(t);
const isTranslation = (t: string) =>
  isArabicOnly(t) &&
  t.length >= 12 &&
  t.length <= 120 &&
  t.trim().split(/\s+/).length >= 3 &&
  !/[:：]$/.test(t) &&
  !/^[①-⑳㉑-㉕]/.test(t) &&
  !GLOSS_STOP.test(t.trim());
const isDefinition = (t: string) => t.includes(" = ") && LATIN.test(t) && ARABIC.test(t);
const isLead = (t: string) =>
  !LATIN.test(t) && ((/[:：]\s*$/.test(t) && t.length <= 42) || PLAIN_LEADS.has(t.trim()));
const noteFor = (t: string) => NOTES[t.trim()];
const isContrastLine = (t: string) =>
  isEnglishOnly(t) && t.length <= 78 && !isVerdict(t) && !isFormula(t) && /[.!?]$/.test(t.trim());
const isSubhead = (t: string) => !LATIN.test(t) && SUBHEADS.has(t.trim());

function parseRange(lines: string[], from: number, to: number, exclude?: Set<number>): Block[] {
  const blocks: Block[] = [];
  let i = from;
  const push = (block: Block) => blocks.push(block);
  while (i < to) {
    if (exclude?.has(i)) {
      i++;
      continue;
    }
    const text = lines[i]!;
    if (text.trim() === "") {
      i++;
      continue;
    }
    if (isTable(text)) {
      const rows: Slice[] = [];
      while (i < to && isTable(lines[i]!) && !exclude?.has(i)) {
        rows.push({ i, text: lines[i]! });
        i++;
      }
      push({ kind: "table", rows });
      continue;
    }
    if (isNumbered(text)) {
      const items: Slice[] = [];
      while (i < to && isNumbered(lines[i]!) && !exclude?.has(i) && !isVerdict(lines[i]!)) {
        items.push({ i, text: lines[i]! });
        i++;
      }
      push({ kind: "list", items });
      continue;
    }
    if (isVerdict(text)) {
      const rows: Slice[] = [];
      while (i < to && isVerdict(lines[i]!) && !exclude?.has(i)) {
        rows.push({ i, text: lines[i]! });
        i++;
      }
      push({ kind: "verdicts", rows });
      continue;
    }
    if (isBullet(text)) {
      const items: Slice[] = [];
      while (i < to && isBullet(lines[i]!) && !exclude?.has(i)) {
        items.push({ i, text: lines[i]! });
        i++;
      }
      push({ kind: "bullets", items });
      continue;
    }
    if (isFormula(text)) {
      push({ kind: "formula", line: { i, text } });
      i++;
      continue;
    }
    if (isDefinition(text)) {
      push({ kind: "definition", line: { i, text } });
      i++;
      continue;
    }
    const next = lines[i + 1];
    if (
      isContrastLine(text) &&
      next !== undefined &&
      isContrastLine(next) &&
      !exclude?.has(i + 1) &&
      modalKinds(text).length === 1 &&
      modalKinds(next).length === 1 &&
      modalKinds(text)[0] !== modalKinds(next)[0]
    ) {
      push({
        kind: "contrast",
        panes: [
          { line: { i, text }, kind: modalKinds(text)[0]! },
          { line: { i: i + 1, text: next }, kind: modalKinds(next)[0]! },
        ],
      });
      i += 2;
      continue;
    }
    if (isExampleSentence(text) && next !== undefined && isTranslation(next) && !exclude?.has(i + 1)) {
      push({ kind: "example", en: { i, text }, ar: { i: i + 1, text: next } });
      i += 2;
      continue;
    }
    if (isEnglishOnly(text) && TERM_SHAPE.test(text)) {
      push({ kind: "term", line: { i, text } });
      i++;
      continue;
    }
    if (isEnglishOnly(text)) {
      push({ kind: "solo", line: { i, text } });
      i++;
      continue;
    }
    if (isLead(text)) {
      push({ kind: "lead", line: { i, text } });
      i++;
      continue;
    }
    const note = noteFor(text);
    if (note && !LATIN.test(text)) {
      push({ kind: "note", head: { i, text }, tone: note.tone, icon: note.icon, blocks: [] });
      i++;
      continue;
    }
    if (isSubhead(text)) {
      push({ kind: "subhead", line: { i, text } });
      i++;
      continue;
    }
    push({ kind: "body", line: { i, text } });
    i++;
  }

  const grouped: Block[] = [];
  for (let k = 0; k < blocks.length; k++) {
    const block = blocks[k]!;
    if (block.kind !== "note") {
      grouped.push(block);
      continue;
    }
    const inner: Block[] = [];
    let j = k + 1;
    while (j < blocks.length && blocks[j]!.kind !== "subhead" && blocks[j]!.kind !== "note") {
      inner.push(blocks[j]!);
      j++;
    }
    grouped.push({ ...block, blocks: inner });
    k = j - 1;
  }
  return grouped;
}

function BlockView({ block, section }: { block: Block; section: number }) {
  const uid = (i: number) => unitId44(section, i);
  switch (block.kind) {
    case "table": {
      const header = block.rows[0]!;
      const cells = (row: Slice) => row.text.split(" | ").map((c) => c.trim());
      const compare = cells(header).map((c) => c.toUpperCase()).join("|") === "MUST|HAVE TO";
      return (
        <div className={`tableWrap44 ${compare ? "tableWrap44--compare" : ""}`.trim()}>
          <table>
            <thead>
              <tr data-source-unit={uid(header.i)}>
                {cells(header).map((c, k) => (
                  <th key={k} scope="col">
                    <Text44 text={c} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.slice(1).map((row) => (
                <tr key={row.i} data-source-unit={uid(row.i)}>
                  {cells(row).map((c, k) => (
                    <td key={k}>
                      <Text44 text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "example":
      return (
        <figure className="ex44">
          <blockquote data-source-unit={uid(block.en.i)}>
            <En44 text={block.en.text} />
          </blockquote>
          {block.ar && (
            <figcaption data-source-unit={uid(block.ar.i)}>
              <Text44 text={block.ar.text} />
            </figcaption>
          )}
        </figure>
      );
    case "contrast":
      return (
        <div className="contrast44">
          {block.panes.map((pane) => {
            const meta = CONTRAST_LABEL[pane.kind];
            return (
              <figure
                key={pane.line.i}
                className={`contrastPane44 contrastPane44--${pane.kind}`}
                data-source-unit={uid(pane.line.i)}
              >
                <figcaption className="contrastTag44">
                  <Glyph44 name={meta.icon} />
                  <Text44 text={meta.label} />
                </figcaption>
                <blockquote>
                  <En44 text={pane.line.text} />
                </blockquote>
              </figure>
            );
          })}
        </div>
      );
    case "solo":
      return (
        <p className="solo44" data-source-unit={uid(block.line.i)}>
          <En44 text={block.line.text} />
        </p>
      );
    case "term":
      return (
        <p className="term44" data-source-unit={uid(block.line.i)}>
          <En44 text={block.line.text} />
        </p>
      );
    case "formula":
      return (
        <p className="formula44 font-en" data-source-unit={uid(block.line.i)} dir="ltr">
          <En44 text={block.line.text} />
        </p>
      );
    case "definition": {
      const parts = block.line.text.split(/\s+=\s+/);
      return (
        <p className="def44" dir="ltr" data-source-unit={uid(block.line.i)}>
          {parts.map((part, k) => (
            <Fragment key={k}>
              {k > 0 && (
                <span className="eq44" aria-hidden="true">
                  =
                </span>
              )}
              <span className={isEnglishOnly(part) ? "defPart44" : "defGloss44"}>
                {isEnglishOnly(part) ? <En44 text={part} /> : <Text44 text={part} />}
              </span>
            </Fragment>
          ))}
        </p>
      );
    }
    case "verdicts":
      return (
        <ul className="verdicts44">
          {block.rows.map((row) => {
            const bad = hasBad(row.text);
            return (
              <li
                key={row.i}
                data-source-unit={uid(row.i)}
                dir="ltr"
                className={bad ? "is-bad" : "is-good"}
              >
                <span className="verdictMark44">
                  <Glyph44 name={bad ? "cross" : "check"} />
                </span>
                <span dir="ltr" lang="en" className="verdictText44 font-en">
                  {plain(row.text)}
                </span>
                <span className="verdictBadge44">{bad ? "خطأ نحوي" : "صيغة سليمة"}</span>
              </li>
            );
          })}
        </ul>
      );
    case "list":
      return (
        <ol className="numlist44">
          {block.items.map((item) => (
            <li key={item.i} data-source-unit={uid(item.i)}>
              <Text44 text={item.text.replace(MARK, "")} />
            </li>
          ))}
        </ol>
      );
    case "bullets":
      return (
        <ul className="bullets44">
          {block.items.map((item) => (
            <li key={item.i} data-source-unit={uid(item.i)}>
              <Text44 text={item.text.replace(/^-\s+/, "")} />
            </li>
          ))}
        </ul>
      );
    case "lead":
      return (
        <p className="lead44" data-source-unit={uid(block.line.i)}>
          <Text44 text={block.line.text} />
        </p>
      );
    case "subhead":
      return (
        <h3 className="subhead44" data-source-unit={uid(block.line.i)}>
          <Text44 text={block.line.text} />
        </h3>
      );
    case "note":
      return (
        <aside className={`note44 note44--${block.tone}`}>
          <p className="noteHead44" data-source-unit={uid(block.head.i)}>
            <Glyph44 name={block.icon} />
            <Text44 text={block.head.text} />
          </p>
          <div className="noteBody44">
            {block.blocks.map((inner, k) => (
              <BlockView key={k} block={inner} section={section} />
            ))}
          </div>
        </aside>
      );
    case "body":
    default:
      return (
        <p className="body44" data-source-unit={uid(block.line.i)}>
          <Text44 text={block.line.text} />
        </p>
      );
  }
}

export function Article44({
  section,
  from = 0,
  to,
  exclude,
  className = "",
}: {
  section: number;
  from?: number;
  to?: number;
  exclude?: Set<number>;
  className?: string;
}) {
  const lines = SOURCE_SECTIONS_44[section]!.lines;
  const blocks = parseRange(lines, from, to ?? lines.length, exclude);
  return (
    <div className={`article44 ${className}`.trim()}>
      {blocks.map((b, k) => (
        <BlockView key={k} block={b} section={section} />
      ))}
    </div>
  );
}

export function Line44({
  section,
  index,
  className = "",
}: {
  section: number;
  index: number;
  className?: string;
}) {
  const line = SOURCE_SECTIONS_44[section]!.lines[index]!;
  return (
    <p className={className} data-source-unit={unitId44(section, index)}>
      <Text44 text={line} />
    </p>
  );
}

// ------------------------------------------------------------
// Interactive Command Console Plate & Feedback
// ------------------------------------------------------------
export function Plate44({
  kicker,
  title,
  intro,
  channel,
  status,
  children,
  id,
}: {
  kicker?: string;
  title?: string;
  intro?: string;
  channel?: DutyChannelId44;
  status?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      className={`plate44 ${channel ? `plate44--${channel}` : ""}`.trim()}
      id={id}
    >
      {(kicker || title || intro || status) && (
        <header className="plateHead44">
          <div className="plateHeadTop44">
            {kicker ? (
              <p className="kicker44">
                <Text44 text={kicker} />
              </p>
            ) : (
              <span />
            )}
            {status ? <span className="plateStatus44">{status}</span> : null}
          </div>
          {title && (
            <h3 className="plateTitle44">
              <Text44 text={title} />
            </h3>
          )}
          {intro && (
            <p className="plateIntro44">
              <Text44 text={intro} />
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

export function Field44({
  label,
  value,
  onChange,
  rows = 2,
  hint,
  placeholder,
  disabled = false,
  dir = "auto",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
  dir?: "ltr" | "rtl" | "auto";
}) {
  return (
    <label className="field44">
      <span className="fieldLabel44">
        <Text44 text={label} />
      </span>
      <textarea
        rows={rows}
        dir={dir}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && (
        <span className="fieldHint44">
          <Text44 text={hint} />
        </span>
      )}
    </label>
  );
}

export function Feedback44({
  state,
  title,
  children,
}: {
  state: "ok" | "no" | "info";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`fb44 fb44--${state}`} role="status">
      <p className="fbTitle44">
        <Glyph44 name={state === "ok" ? "check" : state === "no" ? "cross" : "insight"} />
        <Text44 text={title} />
      </p>
      <div className="fbBody44">{children}</div>
    </div>
  );
}
