/**
 * Normalization for typed English answers in Lesson 50.
 * It unifies typography and removes punctuation, but never reorders words or
 * drops a negation. Contractions are kept so "can't have" stays distinct
 * from "can have"; every key pattern accepts both forms explicitly.
 */
export function normalizeEnglish50(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘ʼ`´]/g, "'")
    .replace(/[“”«»]/g, " ")
    .replace(/[.,!?;:،؛؟…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
