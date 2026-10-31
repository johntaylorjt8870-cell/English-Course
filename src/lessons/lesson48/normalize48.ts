/**
 * Normalization for typed English answers in Lesson 48.
 * It unifies typography and removes punctuation, but never reorders words or
 * drops a negation. Contractions are kept so an answer such as "don't have to"
 * remains distinguishable from "mustn't", and patterns accept both forms.
 */
export function normalizeEnglish48(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘ʼ`´]/g, "'")
    .replace(/[“”«»]/g, " ")
    .replace(/[.,!?;:،؛؟…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** يجعل «I'd / she'd» مقروءة كـ «would» عند بناء الأنماط فقط. */
export function expandWould(value: string): string {
  return value.replace(/\b(i|you|he|she|we|they)'d\b/g, "$1 would");
}
