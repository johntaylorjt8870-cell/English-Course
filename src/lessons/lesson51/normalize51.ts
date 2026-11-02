/**
 * Normalization for typed English answers in Lesson 51.
 * It unifies typography and removes punctuation, but never reorders words or
 * drops a negation. Contractions are kept so "doesn't study" stays distinct
 * from "does study"; every key pattern accepts both contracted and full forms.
 */
export function normalizeEnglish51(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘ʼ`´]/g, "'")
    .replace(/[“”«»]/g, " ")
    .replace(/[.,!?;:،؛؟…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
