// ============================================================
// الدرس 32 — منصة أمثلة المصدر (Source Deck)
//
// الهدف: لا يضيع سطر واحد من المصدر. كل وحدة في ledger32.ts تُصنَّف
// آليًا إلى نوع عرض مناسب (مثال إنجليزي + ترجمته، قاعدة، خريطة
// «A → B»، رسم زمني، عنوان) ثم تُعرض داخل صفحة الدرس التي تنتمي
// إليها الوحدة، بلا حذف ولا اختصار ولا إعادة صياغة.
//
// التصنيف اشتقاق runtime من SOURCE_SECTIONS (وليس ملفًا مولَّدًا)
// فلا يمكن أن ينحرف عن المصدر أبدًا. النص نفسه يُعرض حرفيًا كما هو؛
// التنسيق (لون/شارة/اتجاه) هو وحده ما تضيفه المنصة.
//
// كل كتلة تحمل `units` = فهارس أسطر المصدر التي تغطيها، لذلك يستطيع
// التدقيق الآلي أن يثبت أن مجموع ما تعرضه الصفحات = كل أسطر المصدر
// مرة واحدة بالضبط (لا سطر ناقص ولا سطر مكرر).
// ============================================================

import { SOURCE_SECTIONS } from "./ledger32";

/** علامة الصحة كما وردت في المصدر (تبقى معروضة كما هي). */
export type Mark32 = "ok" | "wrong" | "none";

/** نطاق أسطر المصدر الذي تغطيه الكتلة [من، إلى] بترقيم يبدأ من صفر. */
export type UnitRange32 = [number, number];

export type DeckBlock32 =
  | { kind: "example"; en: string; ar?: string; mark: Mark32; n?: string; units: UnitRange32 }
  | { kind: "map"; left: string; right: string; mark: Mark32; n?: string; prefix: string; units: UnitRange32 }
  | { kind: "art"; text: string; units: UnitRange32 }
  | { kind: "head"; text: string; n?: string; units: UnitRange32 }
  | { kind: "note"; text: string; mark: Mark32; n?: string; prefix: string; units: UnitRange32 };

const AR_CHAR = /[\u0600-\u06FF]/;
const LATIN_CHAR = /[A-Za-z]/;
/** أرقام المصدر الدائرية ①–⑳ وعلامات التعداد المشابهة. */
const NUM_MARK = /^([①-⑳⑴-⒳❶-➉])\s*/;
/** أسهم متتابعة وخطوط زمنية: رسم لا جملة. */
const ART_LINE = /(→\s*→|─|━|┄|╌)/;

const hasAr = (s: string) => AR_CHAR.test(s);
const hasLatin = (s: string) => LATIN_CHAR.test(s);

type Flags = { mark: Mark32; n?: string; prefix: string; text: string };

/**
 * يفصل علامة الصحة (✅/❌) ورقم البند (①) عن بقية النص.
 * `prefix` يعيد العلامات كما هي ليلصقها العرض قبل النص، فلا يتغيّر
 * أي حرف من حروف المصدر.
 */
function splitFlags(raw: string): Flags {
  let text = raw;
  let mark: Mark32 = "none";
  let prefix = "";
  const ok = /^(✅|✔️?)\s*/.exec(text);
  const bad = /^(❌|✖️?|×)\s*/.exec(text);
  if (ok) {
    mark = "ok";
    text = text.slice(ok[0].length);
    prefix = ok[0];
  } else if (bad) {
    mark = "wrong";
    text = text.slice(bad[0].length);
    prefix = bad[0];
  }
  const num = NUM_MARK.exec(text);
  let n: string | undefined;
  if (num) {
    n = num[1];
    text = text.slice(num[0].length);
    prefix += num[0];
  }
  return { mark, n, prefix, text: text.trim() };
}

/** سطر «A → B»: خريطة/مقارنة تُعرض كصفّين بدل جملة. */
function asMap(text: string): { left: string; right: string } | null {
  const i = text.indexOf("→");
  if (i < 0) return null;
  const left = text.slice(0, i).trim();
  const right = text.slice(i + 1).trim();
  if (!left || !right) return null;
  return { left, right };
}

const isArt = (text: string) => ART_LINE.test(text) && !hasAr(text);

/** عنوان/تمهيد عربي («الحلول:» «لماذا؟» «فكرته الأساسية:»). */
function isHead(text: string): boolean {
  if (!hasAr(text)) return false;
  if (/[:：]\s*$/.test(text)) return true;
  return /^(لماذا|كيف|متى|لاحظ|تذكر|انتبه|الخلاصة|القاعدة)\b/.test(text) && text.length <= 28;
}

/** ترجمة عربية تلي مثالًا إنجليزيًا: عربية صِرفة بلا «:» في آخرها. */
function isTranslation(text: string): boolean {
  return hasAr(text) && !hasLatin(text) && !/[:：]\s*$/.test(text);
}

/**
 * يبني منصة العرض لوحدة مصدرية واحدة: كل سطر كما هو، مع نوعه فقط.
 * الترجمة العربية تُربط بالمثال الإنجليزي الذي يسبقها مباشرةً.
 */
export function deckFor32(id: string): DeckBlock32[] {
  const section = SOURCE_SECTIONS.find((s) => s.id === id);
  if (!section) return [];
  const out: DeckBlock32[] = [];
  const units = section.units;

  for (let i = 0; i < units.length; i++) {
    const raw = units[i];
    const { mark, n, prefix, text } = splitFlags(raw);
    if (!text) continue;

    if (isArt(text)) {
      out.push({ kind: "art", text: raw.trim(), units: [i, i] });
      continue;
    }

    // مثال إنجليزي صِرف → نربط به الترجمة العربية التالية إن وُجدت
    if (!hasAr(text) && hasLatin(text)) {
      const map = asMap(text);
      if (map) {
        out.push({ kind: "map", left: map.left, right: map.right, mark, n, prefix, units: [i, i] });
        continue;
      }
      let ar: string | undefined;
      const next = units[i + 1];
      if (next) {
        const nf = splitFlags(next);
        if (isTranslation(nf.text)) {
          ar = next.trim();
          i += 1;
        }
      }
      out.push({ kind: "example", en: raw.trim(), ar, mark, n, units: [ar ? i - 1 : i, i] });
      continue;
    }

    // سطر عربي أو مختلط
    const map = asMap(text);
    if (map && (hasLatin(map.left) || hasLatin(map.right))) {
      out.push({ kind: "map", left: map.left, right: map.right, mark, n, prefix, units: [i, i] });
      continue;
    }
    if (isHead(text) && mark === "none" && !n) {
      out.push({ kind: "head", text: raw.trim(), n, units: [i, i] });
      continue;
    }
    out.push({ kind: "note", text: raw.trim(), mark, n, prefix, units: [i, i] });
  }
  return out;
}

/** ذاكرة صغيرة: بناء الكتل مرة واحدة لكل قسم (الصفحات تُعاد بناؤها كثيرًا). */
const BLOCK_CACHE = new Map<string, DeckBlock32[]>();

/** كتل القسم مع مراجع أسطر المصدر (نفس ترتيب المصدر). */
export function deckBlocks32(id: string): DeckBlock32[] {
  const hit = BLOCK_CACHE.get(id);
  if (hit) return hit;
  const built = deckFor32(id);
  BLOCK_CACHE.set(id, built);
  return built;
}

/**
 * شرائح الصفحة: من الكتلة `from` إلى الكتلة `to` (ضمنا).
 * النطاق يُقصّ على حدود القسم فلا يمكن لصفحة أن «تسرق» كتل قسم آخر.
 */
export function deckRange32(id: string, range?: [number, number]): DeckBlock32[] {
  const blocks = deckBlocks32(id);
  if (!range) return blocks;
  const from = Math.max(0, Math.min(range[0], blocks.length - 1));
  const to = Math.max(from, Math.min(range[1], blocks.length - 1));
  return blocks.slice(from, to + 1);
}

/** هل يغطي هذا النطاق كل أسطر القسم؟ (يُستخدم في التدقيق) */
export function rangeCoversUnits32(id: string, range?: [number, number]): UnitRange32[] {
  return deckRange32(id, range).map((b) => b.units);
}

/** عدّادات سريعة (لتقرير التغطية والتدقيق). */
export function deckStats32(id: string) {
  const blocks = deckFor32(id);
  const count = (k: DeckBlock32["kind"]) => blocks.filter((b) => b.kind === k).length;
  return {
    blocks: blocks.length,
    examples: count("example"),
    maps: count("map"),
    notes: count("note"),
    heads: count("head"),
    arts: count("art"),
    withArabic: blocks.filter((b) => b.kind === "example" && b.ar).length,
  };
}

/** كل وحدات المصدر كما هي (للتحقق من التغطية الكاملة). */
export function deckUnits32(id: string): string[] {
  return SOURCE_SECTIONS.find((s) => s.id === id)?.units ?? [];
}

export const DECK_SECTIONS_32: { id: string; title: string; units: number }[] = SOURCE_SECTIONS.map((s) => ({
  id: s.id,
  title: s.title,
  units: s.units.length,
}));

export const DECK_UNIT_TOTAL_32 = SOURCE_SECTIONS.reduce((n, s) => n + s.units.length, 0);
