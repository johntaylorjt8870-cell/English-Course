/**
 * Safe normalization for typed English answers.
 * It never drops a negation and never reorders words; it only unifies
 * typography, expands the contractions that matter for grading, and removes
 * punctuation so an answer can be compared with anchored patterns.
 * "I'd" is deliberately kept: it may stand for "I would" or "I had", and the
 * correct reading depends on the verb that follows it.
 */
export function normalizeEnglish47(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘ʼ`]/g, "'")
    .replace(/\bwouldn't\b/g, "would not")
    .replace(/\bcan't\b/g, "cannot")
    .replace(/\bcouldn't\b/g, "could not")
    .replace(/\bshouldn't\b/g, "should not")
    .replace(/\bdon't\b/g, "do not")
    .replace(/\bdoesn't\b/g, "does not")
    .replace(/\bdidn't\b/g, "did not")
    .replace(/\bit's\b/g, "it is")
    .replace(/\bthat's\b/g, "that is")
    .replace(/\bi'm\b/g, "i am")
    .replace(/[.,!?;:،؛؟]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
