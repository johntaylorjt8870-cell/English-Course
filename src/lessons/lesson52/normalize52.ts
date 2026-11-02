/**
 * Normalization for typed English answers in Lesson 52.
 * Unifies typography, lowercases and removes punctuation, but never reorders
 * words or drops a negation. Contractions are kept so "doesn't study" stays
 * distinct from "does study"; every accepted answer lists both contracted and
 * full forms where both are correct.
 */
export function normalizeEnglish52(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘ʼ`´]/g, "'")
    .replace(/[“”«»]/g, " ")
    .replace(/[.,!?;:،؛؟…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Does the typed answer equal any accepted form after normalization? */
export function matchesEnglish52(value: string, accept: readonly string[]): boolean {
  const answer = normalizeEnglish52(value);
  if (!answer) return false;
  return accept.some((item) => normalizeEnglish52(item) === answer);
}
