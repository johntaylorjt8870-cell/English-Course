/**
 * Normalization for typed English answers in Lesson 49.
 * It unifies typography and removes punctuation, but never reorders words or
 * drops a negation. Contractions are kept so "shouldn't have" stays distinct
 * from "should have", and every key pattern accepts both forms explicitly.
 */
export function normalizeEnglish49(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘ʼ`´]/g, "'")
    .replace(/[“”«»]/g, " ")
    .replace(/[.,!?;:،؛؟…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
