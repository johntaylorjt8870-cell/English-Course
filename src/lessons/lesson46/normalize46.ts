/** Normalize typography and contractions, never erase negation or extra words. */
export function normalizeEnglish46(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/[’‘ʼ`]/g, "'")
    .replace(/\b(won'?t)\b/g, "will not")
    .replace(/\b(can'?t)\b/g, "cannot")
    .replace(/\b(don'?t)\b/g, "do not")
    .replace(/\b(doesn'?t)\b/g, "does not")
    .replace(/\b(didn'?t)\b/g, "did not")
    .replace(/\b(mustn'?t)\b/g, "must not")
    .replace(/\b(needn'?t)\b/g, "need not")
    .replace(/\b(shouldn'?t)\b/g, "should not")
    .replace(/\b(wasn'?t)\b/g, "was not")
    .replace(/\b(isn'?t)\b/g, "is not")
    .replace(/\b(it's)\b/g, "it is")
    .replace(/\b(there's)\b/g, "there is")
    .replace(/\b(aren't)\b/g, "are not")
    .replace(/\b(we're|they're)\b/g, (match) => (match === "we're" ? "we are" : "they are"))
    .replace(/[.,!?;:،؛؟]/g, " ")
    .replace(/\s+/g, " ").trim();
}
