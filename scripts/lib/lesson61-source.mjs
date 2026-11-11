// Parser for the user-supplied Lesson 61 document, not an implementation snapshot.
// Each parsed value retains its source line number for the independent audit and ledger.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

export const SOURCE_PATH_61 = "docs/lesson61-source.md";
export const SOURCE_SHA256_61 = "456d20ff43b48178435b07bfb01c70553a2b9d3c887d51378418bcbbe316bff8";
export const SECTION_HEADINGS_61 = [
  "القسم الأول: Reported Yes/No Questions",
  "القسم الثاني: Reported WH-Questions",
  "القسم الثالث: Reported Commands and Instructions",
  "القسم الرابع: Reported Requests",
  "القسم الخامس: Reported Suggestions",
  "القسم السادس: الفرق بين Say وAsk وTell",
  "القسم السابع: قواعد مهمة عند تحويل الأسئلة",
  "القسم الثامن: خطوات تحويل السؤال أو الأمر",
  "القسم التاسع: أمثلة شاملة محلولة",
  "القسم العاشر: حوار تطبيقي",
  "القسم الحادي عشر: قطعة قراءة تطبيقية",
  "القسم الثاني عشر: التدريبات",
  "القسم الثالث عشر: الاختبار النهائي للدرس 61",
  "القسم الرابع عشر: مهمة الكتابة",
  "القسم الخامس عشر: مهمة التحدث",
  "القسم السادس عشر: الملخص النهائي",
];
export const PRACTICE_HEADINGS_61 = [
  "التدريب الأول: تحويل أسئلة Yes/No", "التدريب الثاني: تحويل أسئلة WH",
  "التدريب الثالث: تحويل الأوامر والنواهي", "التدريب الرابع: الطلبات والنصائح والتحذيرات",
  "التدريب الخامس: اختر الإجابة الصحيحة", "التدريب السادس: اكتشف الخطأ وصححه",
  "التدريب السابع: ترجم إلى الإنجليزية", "التدريب الثامن: حوّل الفقرة كاملة",
];
export function normalizeSource61(text) {
  return String(text).normalize("NFC").toLowerCase().replace(/&amp;/g, "&")
    .replace(/[’‘]/g, "'").replace(/[“”]/g, '"')
    .replace(/[\u064b-\u065f\u0670\u0640]/g, "")
    .replace(/[\p{P}\p{S}]+/gu, " ").replace(/\s+/g, " ").trim();
}
export function readSource61(path = SOURCE_PATH_61) {
  const bytes = readFileSync(path);
  const hash = createHash("sha256").update(bytes).digest("hex");
  const lines = bytes.toString("utf8").split(/\r?\n/).map((text, i) => ({ text: text.trim(), line: i + 1 }));
  const indices = SECTION_HEADINGS_61.map((heading) => {
    const index = lines.findIndex((line) => line.text === heading);
    if (index < 0) throw new Error(`Missing source heading: ${heading}`);
    return index;
  });
  if (indices.some((index, i) => i && index <= indices[i - 1])) throw new Error("Source sections are not in order");
  const sections = [lines.slice(0, indices[0]), ...indices.map((index, i) => lines.slice(index, indices[i + 1] ?? lines.length))];
  return { hash, lines, sections };
}
const at = (lines, text) => {
  const i = lines.findIndex((line) => line.text === text);
  if (i < 0) throw new Error(`Source marker not found: ${text}`);
  return i;
};
const between = (lines, start, end) => lines.slice(at(lines, start) + 1, at(lines, end));
const nonempty = (lines) => lines.filter((line) => line.text);
function numbered(lines, pattern) {
  const result = [];
  for (const line of lines) {
    const match = line.text.match(pattern);
    if (match) result.push({ line: line.line, number: match[1], parts: [{ text: match[2], line: line.line }] });
    else if (line.text && result.length) result[result.length - 1].parts.push(line);
  }
  return result;
}
const circled = (lines) => numbered(lines, /^([①②③④⑤⑥⑦⑧])\s*(.*)$/u);
const decimal = (lines) => numbered(lines, /^(\d{1,2})\.\s+(.*)$/u);
const texts = (lines) => nonempty(lines).map((line) => line.text);

// Standalone examples whose original translations appear on the next nonempty
// line, rather than after an explicit «الترجمة» label. The bounded source ranges
// deliberately exclude teaching prose and include the five-sentence comparison.
export function sourceBilingualTheory61(source) {
  const ranges = [[0, 14, 19], [1, 57, 70], [3, 626, 636], [3, 840, 841], [3, 873, 875],
    [4, 886, 887], [4, 903, 904], [6, 1084, 1176], [6, 1180, 1198]];
  const result = [];
  for (const [section, from, to] of ranges) {
    const lines = nonempty(source.sections[section].filter((line) => line.line >= from && line.line <= to));
    for (let i = 0; i < lines.length - 1; i++) {
      const en = lines[i], ar = lines[i + 1];
      if (/[A-Za-z]/.test(en.text) && !/[\u0600-\u06ff]/u.test(en.text) && /[\u0600-\u06ff]/u.test(ar.text) && !/[A-Za-z]/.test(ar.text) && !/:$/u.test(ar.text)) {
        result.push({ section, line: en.line, arLine: ar.line, en: en.text.replace(/^[①-⑳]\s*/u, ""), ar: ar.text });
      }
    }
  }
  return result;
}

export function sourceWhVocabulary61(source) {
  const lines = source.sections[2];
  const end = at(lines, "عندما ننقل هذا النوع من الأسئلة، نحتفظ بأداة السؤال نفسها.");
  return lines.slice(0, end).flatMap((line) => {
    const match = line.text.match(/^([A-Za-z][A-Za-z ]+?)\s*=\s*(.+)$/u);
    return match ? [{ line: line.line, en: match[1], ar: match[2] }] : [];
  });
}

export function sourcePairs61(source) {
  const pairs = [];
  for (let section = 0; section <= 9; section++) {
    const lines = source.sections[section];
    for (let i = 0; i < lines.length; i++) {
      if (!/^(?:[①-⑳]\s*)?Direct(?: Speech)?:$/u.test(lines[i].text)) continue;
      let directIndex = i + 1;
      while (directIndex < lines.length && !lines[directIndex].text) directIndex++;
      let reportIndex = directIndex + 1;
      while (reportIndex < lines.length && !/^(?:[①-⑳]\s*)?(?:Direct|Reported)(?: Speech)?:$/u.test(lines[reportIndex].text)) reportIndex++;
      if (reportIndex >= lines.length || !lines[reportIndex].text.includes("Reported")) continue;
      let reportedIndex = reportIndex + 1;
      while (reportedIndex < lines.length && !lines[reportedIndex].text) reportedIndex++;
      let end = reportedIndex + 1;
      while (end < lines.length && !/^(?:[①-⑳]\s*)?(?:Direct|Reported)(?: Speech)?:$/u.test(lines[end].text) && !/^\d+\.\s/u.test(lines[end].text)) end++;
      const getTranslation = (from, to) => {
        const marker = lines.slice(from, to).findIndex((line) => line.text === "الترجمة:");
        if (marker < 0) return "";
        return nonempty(lines.slice(from + marker + 1, to))[0]?.text || "";
      };
      pairs.push({ section, line: lines[i].line, direct: lines[directIndex].text, reported: lines[reportedIndex].text,
        directAr: getTranslation(directIndex + 1, reportIndex), ar: getTranslation(reportedIndex + 1, end) });
    }
  }
  return pairs;
}

export function sourceSolved61(source) {
  const labels = source.sections[9].filter((line) => /^[①-⑳]\s*[^:]+:$/u.test(line.text));
  return sourcePairs61(source).filter((pair) => pair.section === 9).map((pair) => {
    const label = labels.filter((line) => line.line < pair.line).at(-1);
    if (!label) throw new Error(`Solved example at ${pair.line} has no source concept label`);
    return { ...pair, label: label.text.replace(/^[①-⑳]\s*/u, "").replace(/:$/u, ""), labelLine: label.line };
  });
}

export function sourcePractices61(source) {
  const lines = source.sections[12];
  const indices = PRACTICE_HEADINGS_61.map((heading) => at(lines, heading));
  const groups = indices.map((start, i) => lines.slice(start, indices[i + 1] ?? lines.length));
  const parsed = groups.slice(0, 7).map((group) => {
    const split = group.findIndex((line) => ["الحلول مع الشرح", "الحلول", "الإجابات"].includes(line.text));
    if (split < 0) throw new Error(`Practice solution marker missing: ${group[0].text}`);
    const firstQuestion = group.findIndex((line) => /^[①-⑳]/u.test(line.text));
    if (firstQuestion < 0 || firstQuestion >= split) throw new Error(`Practice question missing: ${group[0].text}`);
    const instruction = nonempty(group.slice(1, firstQuestion))[0] ?? null;
    return { title: group[0], instruction, questions: circled(group.slice(1, split)), answers: circled(group.slice(split + 1)) };
  });
  const paragraph = groups[7];
  const prompt = texts(between(paragraph, "الفقرة المباشرة", "المطلوب")).join(" ");
  const instruction = nonempty(between(paragraph, "المطلوب", "الحل النموذجي"))[0] ?? null;
  const en = nonempty(between(paragraph, "الحل النموذجي", "الترجمة"));
  const ar = nonempty(paragraph.slice(at(paragraph, "الترجمة") + 1));
  parsed.push({ title: paragraph[0], instruction, prompt, promptLine: paragraph[at(paragraph, "الفقرة المباشرة") + 2]?.line, model: en.map((line, i) => ({ en: line.text, ar: ar[i]?.text, line: line.line, arLine: ar[i]?.line })) });
  return parsed;
}
export function sourceExam61(source) {
  const section = source.sections[13];
  const split = at(section, "مفتاح إجابة الاختبار النهائي");
  return { questions: decimal(section.slice(0, split)), answers: decimal(section.slice(split + 1)) };
}
export function sourceDialogue61(source) {
  const section = source.sections[10];
  const direct = nonempty(between(section, "الحوار المباشر", "الترجمة العربية"));
  const directAr = nonempty(between(section, "الترجمة العربية", "تحويل الحوار إلى الكلام المنقول"));
  const retold = nonempty(between(section, "تحويل الحوار إلى الكلام المنقول", "ملاحظات على الحوار"));
  const notes = circled(section.slice(at(section, "ملاحظات على الحوار") + 1));
  return { direct: direct.map((line, i) => ({ en: line.text, ar: directAr[i]?.text, line: line.line, arLine: directAr[i]?.line })),
    reported: retold.filter((_, i) => i % 2 === 0).map((line, i) => ({ en: line.text, ar: retold[i * 2 + 1]?.text, line: line.line, arLine: retold[i * 2 + 1]?.line })),
    notes: notes.map((entry) => ({ text: entry.parts[0].text, line: entry.line })) };
}
export function sourceReading61(source) {
  const section = source.sections[11];
  const en = nonempty(between(section, "A School Visit", "الترجمة العربية"));
  const ar = nonempty(between(section, "زيارة مدرسية", "أسئلة الفهم"));
  const questions = circled(between(section, "أسئلة الفهم", "الإجابات"));
  const answers = circled(section.slice(at(section, "الإجابات") + 1));
  return { title: section[at(section, "A School Visit")], titleAr: section[at(section, "زيارة مدرسية")],
    paragraphs: en.map((line, i) => ({ en: line.text, ar: ar[i]?.text, line: line.line, arLine: ar[i]?.line })),
    questions: questions.map((entry, i) => ({ q: entry.parts[0]?.text, qar: entry.parts[1]?.text, a: answers[i]?.parts[0]?.text, aar: answers[i]?.parts[1]?.text, line: entry.line, answerLine: answers[i]?.line })) };
}
export function sourceErrors61(source) {
  const section = source.sections[7];
  const starts = section.flatMap((line, i) => /^\d+\.\s/u.test(line.text) ? [i] : []);
  return starts.map((start, i) => {
    const part = section.slice(start, starts[i + 1] ?? section.length);
    const after = (marker) => nonempty(part.slice(at(part, marker) + 1))[0];
    const direct = i === 6 ? after("Direct:") : after("خطأ:");
    const reported = i === 6 ? after("Reported:") : after("صحيح:");
    const altIndex = part.findIndex((line) => line.text === "أو:");
    const reasonIndex = part.findIndex((line) => line.text === "السبب:");
    return { title: part[0], direct, reported,
      alternative: altIndex >= 0 ? nonempty(part.slice(altIndex + 1))[0] : undefined,
      reason: reasonIndex >= 0 ? nonempty(part.slice(reasonIndex + 1))[0] : undefined };
  });
}

export function sourceProcedures61(source) {
  const section = source.sections[8];
  const headings = ["أولًا: تحويل سؤال Yes/No", "ثانيًا: تحويل سؤال WH", "ثالثًا: تحويل أمر", "رابعًا: تحويل نهي"];
  const indices = headings.map((heading) => at(section, heading));
  return indices.map((start, i) => {
    const part = section.slice(start, indices[i + 1] ?? section.length);
    const direct = nonempty(part.slice(at(part, "Direct:") + 1))[0];
    const result = nonempty(part.slice(at(part, "النتيجة:") + 1))[0];
    const translation = nonempty(part.slice(at(part, "الترجمة:") + 1))[0];
    const steps = circled(between(part, "الخطوات:", "النتيجة:"));
    return { title: part[0], direct, result, translation, steps };
  });
}
export function sourceWriting61(source) {
  const section = source.sections[14];
  const requirements = circled(between(section, "يجب أن تتضمن الفقرة:", "نموذج كتابة"));
  const en = nonempty(between(section, "A Day at School", "الترجمة"));
  const ar = nonempty(section.slice(at(section, "يوم في المدرسة") + 1));
  return { instruction: section.find((line) => line.text.startsWith("اكتب فقرة من")), requirements,
    title: section[at(section, "A Day at School")], titleAr: section[at(section, "يوم في المدرسة")],
    model: en.map((line, i) => ({ en: line.text, ar: ar[i]?.text, line: line.line, arLine: ar[i]?.line })) };
}
export function sourceSpeaking61(source) {
  const section = source.sections[15];
  const split = at(section, "ثم حوّل إجاباتك إلى الكلام المنقول.");
  const questions = circled(section.slice(0, split));
  const pairs = [];
  for (let i = split; i < section.length; i++) {
    if (section[i].text !== "إجابة مباشرة:") continue;
    const direct = nonempty(section.slice(i + 1))[0];
    const remaining = section.slice(i + 1); const marker = at(remaining, "الكلام المنقول:");
    const reported = nonempty(remaining.slice(marker + 1))[0];
    pairs.push({ direct: direct.text, reported: reported.text, line: direct.line });
  }
  const instructions = ["تخيل أنك تتحدث مع صديقك عن زيارة قمت بها إلى متحف.", "أجب شفهيًا عن الأسئلة التالية:", "ثم حوّل إجاباتك إلى الكلام المنقول."].map((text) => section[at(section, text)]);
  return { instructions, questions: questions.map((entry) => ({ en: entry.parts[0]?.text, ar: entry.parts[1]?.text, line: entry.line })), pairs };
}
export function sourceSummary61(source) {
  const section = source.sections[16];
  const starts = section.flatMap((line, i) => /^\d+\.\s/u.test(line.text) ? [i] : []);
  return starts.slice(0, 8).map((start, i) => {
    const part = section.slice(start, starts[i + 1]);
    const exampleIndex = at(part, "مثال:");
    const example = nonempty(part.slice(exampleIndex + 1));
    return { title: part[0], formulas: nonempty(part.slice(1, exampleIndex)).filter((line) => /[A-Za-z]/.test(line.text) && !/[\u0600-\u06ff]/u.test(line.text)), direct: example[0], reported: example[1] };
  });
}
export function sourceDistinctions61(source) {
  return source.sections[16].filter((line) => line.text.startsWith("- ")).map((line) => ({ text: line.text.slice(2), line: line.line }));
}
