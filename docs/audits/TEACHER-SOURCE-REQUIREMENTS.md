# Teacher provenance — exact source required per unresolved record

All **74** original records remain **UNRESOLVED** (0 closed). Original textbook media tracked in this repository: **0** file(s). Accepted formats: `pdf`, `png`, `jpg`, `jpeg`, `webp`, `tiff`, `heic`, `docx`, committed under the per-lesson path shown below so `git ls-files` reports them.

Identifiers that must be matched once the source arrives: **142**. Records that identify no textbook item at all (and therefore cannot be mapped, only identified first): **53**.

No page number, printed question number or question↔answer mapping is inferred anywhere in this file.

## Verification procedure applied to every record

- 1. Wording — transcribe the printed item text from the supplied scan and compare it character-for-character with the transcribed segment or canonical prompt recorded for that identifier.
- 2. Numbering — confirm the printed item number equals the reference number recorded for that identifier; record it in printedQuestionNumber.
- 3. Page metadata — transcribe the printed page number verbatim into sourcePage. Never derive it from a section index, lesson number or exercise ordinal.
- 4. Answer correspondence — compare the answer key’s entry for each printed number with the canonical answer the app shows, including option order and any negation.
- 5. Reasoning — if the key supplies reasoning, compare it with the explanation shown in the teacher space; if it does not, keep the platform text explicitly labelled “Platform Explanation” and record that the original reasoning is unavailable.
- 6. Closure — set verificationResult to RESOLVED only when steps 1–5 pass for every identifier of that record, and attach the supplied file path with its sha256. A record with no identifiers cannot be closed at all.

## Per-record requirement

| Original ID | Lesson | Scope | Supply | Identifiers to match | Closure blocked because |
|---|---:|---|---|---:|---|
| L1-textbook-key | 1 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson01/L1-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson01/L1-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L2-textbook-key | 2 | Lesson-level record with 29 mapped canonical questions but no identified textbook items. | `docs/sources/lesson02/L2-textbook-key-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson02/L2-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson02/L2-textbook-key-mapping.json` | 29 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the 29 canonical questions are mapped to lesson data but to no textbook item, page or printed number; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L3-textbook-key | 3 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson03/L3-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson03/L3-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L4-textbook-key | 4 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson04/L4-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson04/L4-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L5-textbook-key | 5 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson05/L5-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson05/L5-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L6-textbook-key | 6 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson06/L6-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson06/L6-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L7-textbook-key | 7 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson07/L7-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson07/L7-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L8-textbook-key | 8 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson08/L8-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson08/L8-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L9-textbook-key | 9 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson09/L9-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson09/L9-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L10-textbook-key | 10 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson10/L10-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson10/L10-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L11-textbook-key | 11 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson11/L11-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson11/L11-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L12-textbook-key | 12 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson12/L12-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson12/L12-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L13-textbook-key | 13 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson13/L13-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson13/L13-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L14-textbook-key | 14 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson14/L14-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson14/L14-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L15-textbook-key | 15 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson15/L15-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson15/L15-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L16-textbook-key | 16 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson16/L16-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson16/L16-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L17-textbook-key | 17 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson17/L17-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson17/L17-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L18-textbook-key | 18 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson18/L18-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson18/L18-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L19-textbook-key | 19 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson19/L19-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson19/L19-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L20-textbook-key | 20 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson20/L20-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson20/L20-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L21-textbook-key | 21 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson21/L21-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson21/L21-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L22-textbook-key | 22 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson22/L22-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson22/L22-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L23-textbook-key | 23 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson23/L23-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson23/L23-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L24-textbook-key | 24 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson24/L24-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson24/L24-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L25-textbook-key | 25 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson25/L25-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson25/L25-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L26-textbook-key | 26 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson26/L26-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson26/L26-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-1 | 27 | Item-level record for the teacher answer group «㉚ تدريب 1 — اختر الفعل الصحيح» — 5 numbered answers. | `docs/sources/lesson27/l27-source-1-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 5 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 5 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-2 | 27 | Item-level record for the teacher answer group «㉛ تدريب 2 — had أو have؟» — 4 numbered answers. | `docs/sources/lesson27/l27-source-2-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 4 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 4 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-3 | 27 | Item-level record for the teacher answer group «㉜ تدريب 3 — Past Simple أم Past Perfect؟» — 5 numbered answers. | `docs/sources/lesson27/l27-source-3-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 5 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 5 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-4 | 27 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson27/l27-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-5 | 27 | Item-level record for the teacher answer group «㉞ اكتشف الخطأ» — 5 numbered answers. | `docs/sources/lesson27/l27-source-5-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 5 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 5 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-6 | 27 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson27/l27-source-6-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-7 | 27 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson27/l27-source-7-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-8 | 27 | Item-level record for the teacher answer group «㊷ Boss Battle» — 2 numbered answers. | `docs/sources/lesson27/l27-source-8-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 2 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 2 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-9 | 27 | Item-level record for the teacher answer group «㊸ الاختبار النهائي المورّد (10 أسئلة)» — 10 numbered answers. | `docs/sources/lesson27/l27-source-9-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-9-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 10 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 10 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l27-source-10 | 27 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson27/l27-source-10-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson27/l27-source-10-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l28-source-1 | 28 | Item-level record for the teacher answer group «㉚ تمرين 1 — اختر» — 5 numbered answers. | `docs/sources/lesson28/l28-source-1-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson28/l28-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 5 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 5 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l28-source-2 | 28 | Item-level record for the teacher answer group «㉛ تمرين 2 — حدد الحدث الأول» — 3 numbered answers. | `docs/sources/lesson28/l28-source-2-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson28/l28-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 3 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 3 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l28-source-3 | 28 | Item-level record for the teacher answer group «㉜ تمرين 3 — صحح الأخطاء» — 5 numbered answers. | `docs/sources/lesson28/l28-source-3-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson28/l28-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 5 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 5 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l28-source-4 | 28 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson28/l28-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson28/l28-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l28-source-5 | 28 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson28/l28-source-5-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson28/l28-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l28-source-6 | 28 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson28/l28-source-6-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson28/l28-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l28-source-7 | 28 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson28/l28-source-7-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson28/l28-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l28-source-8 | 28 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson28/l28-source-8-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson28/l28-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| L29-textbook-key | 29 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson29/L29-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson29/L29-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-1 | 30 | Item-level record for the teacher answer group «㉕ اختبار 1 — اختر الزمن» — 5 numbered answers. | `docs/sources/lesson30/l30-source-1-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 5 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 5 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-2 | 30 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson30/l30-source-2-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-3 | 30 | Item-level record for the teacher answer group «㉜ اختبار 3 — صحح الأخطاء» — 6 numbered answers. | `docs/sources/lesson30/l30-source-3-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 6 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 6 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-4 | 30 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson30/l30-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-5 | 30 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson30/l30-source-5-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-6 | 30 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson30/l30-source-6-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-7 | 30 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson30/l30-source-7-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-8 | 30 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson30/l30-source-8-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l30-source-9 | 30 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson30/l30-source-9-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson30/l30-source-9-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-1 | 31 | Item-level record for the teacher answer group «㉟ المحقق — الحلول الثمانية» — 8 numbered answers. | `docs/sources/lesson31/l31-source-1-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 8 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 8 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-2 | 31 | Item-level record for the teacher answer group «㊱ الاختيار الذكي — الحلول الثمانية» — 8 numbered answers. | `docs/sources/lesson31/l31-source-2-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 8 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 8 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-3 | 31 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson31/l31-source-3-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-4 | 31 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson31/l31-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-5 | 31 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson31/l31-source-5-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-6 | 31 | Item-level record for the teacher answer group «㊶ for / since — الحلول الخمسة» — 5 numbered answers. | `docs/sources/lesson31/l31-source-6-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 5 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 5 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-7 | 31 | Item-level record for the teacher answer group «㊷ التحدي النهائي — إجابات نموذجية (للقياس لا للنسخ)» — 7 numbered answers. | `docs/sources/lesson31/l31-source-7-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 7 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 7 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-8 | 31 | Item-level record for the teacher answer group «㊸ Final Boss — أربع جمل، أربعة معانٍ» — 4 numbered answers. | `docs/sources/lesson31/l31-source-8-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 4 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 4 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l31-source-9 | 31 | Item-level record for the teacher answer group «مختبرات الدرس التفاعلية — حلول مختصرة» — 4 numbered answers. | `docs/sources/lesson31/l31-source-9-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson31/l31-source-9-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 4 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 4 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-1 | 32 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson32/l32-source-1-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-2 | 32 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson32/l32-source-2-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-3 | 32 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson32/l32-source-3-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-4 | 32 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson32/l32-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-5 | 32 | Item-level record for the teacher answer group «§27 · Grammar Detective (المصدر — 8 أخطاء)» — 8 numbered answers. | `docs/sources/lesson32/l32-source-5-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 8 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 8 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-6 | 32 | Item-level record for the teacher answer group «§28 · تحدي الاختيار (المصدر)» — 6 numbered answers. | `docs/sources/lesson32/l32-source-6-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 6 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 6 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-7 | 32 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson32/l32-source-7-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-8 | 32 | Item-level record for the teacher answer group «§32 · Boss Challenge (المصدر — 8 جمل)» — 8 numbered answers. | `docs/sources/lesson32/l32-source-8-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 8 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; 8 numbered answers are transcribed but never compared against a printed key; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-9 | 32 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson32/l32-source-9-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-9-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-10 | 32 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson32/l32-source-10-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-10-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |
| l32-source-11 | 32 | Lesson-level record that does not identify any textbook exercise or question. | `docs/sources/lesson32/l32-source-11-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`<br>`docs/sources/lesson32/l32-source-11-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>` | 0 | verificationResult is UNRESOLVED; no original textbook media file is tracked in this repository; the record identifies no textbook item, so no mapping can be attempted — identification is required first; sourcePage is null and printedQuestionNumber is null; both may only be filled from a supplied scan |

## What each supplied file must show

### L1-textbook-key (Lesson 1)

- **identification of the textbook items this record refers to** → `docs/sources/lesson01/L1-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson01/L1-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L2-textbook-key (Lesson 2)

- **textbook exercise page(s) behind the Lesson 2 teacher area** → `docs/sources/lesson02/L2-textbook-key-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise(s) whose answers the Lesson 2 teacher area reproduces
  - the printed question and sub-question numbers for all 29 mapped items
  - the printed page number(s)
- **teacher answer key page(s)** → `docs/sources/lesson02/L2-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each of the 29 printed items
  - the printed page number(s)
- **explicit source-to-canonical mapping** → `docs/sources/lesson02/L2-textbook-key-mapping.json`
  - for each canonical id below: the printed question number, the printed page number, and the original wording
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (29):
  - `l02-pronoun-choice/q1` — Khalil is a student.
  - `l02-pronoun-choice/q2` — Sara is happy.
  - `l02-pronoun-choice/q3` — Khalil and Adam are friends.
  - `l02-pronoun-choice/q4` — Sara and I are students.
  - `l02-pronoun-choice/q5` — The book is new.
  - `l02-be-choice/q1` — I … happy.
  - `l02-be-choice/q2` — He … a teacher.
  - `l02-be-choice/q3` — She … tired.
  - `l02-be-choice/q4` — We … students.
  - `l02-be-choice/q5` — They … friends.
  - `l02-be-choice/q6` — You … ready.
  - `l02-be-choice/q7` — It … small.
  - `l02-correction-reveal/q1` — I is happy.
  - `l02-correction-reveal/q2` — He are a student.
  - `l02-correction-reveal/q3` — They is students.
  - `l02-correction-reveal/q4` — She am tired.
  - `l02-correction-reveal/q5` — We is friends.
  - `l02-be-completion/q1` — I … a student.
  - `l02-be-completion/q2` — Khalil … happy.
  - `l02-be-completion/q3` — Sara … a teacher.
  - `l02-be-completion/q4` — We … friends.
  - `l02-be-completion/q5` — They … ready.
  - `l02-be-completion/q6` — The car … fast.
  - `l02-be-completion/q7` — You … smart.
  - `l02-pronoun-reveal/q1` — Mahmoud is a student.
  - `l02-pronoun-reveal/q2` — Mia is happy.
  - `l02-pronoun-reveal/q3` — Mahmoud and Khalil are friends.
  - `l02-pronoun-reveal/q4` — Mia and I are students.
  - `l02-pronoun-reveal/q5` — The dog is small.

### L3-textbook-key (Lesson 3)

- **identification of the textbook items this record refers to** → `docs/sources/lesson03/L3-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson03/L3-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L4-textbook-key (Lesson 4)

- **identification of the textbook items this record refers to** → `docs/sources/lesson04/L4-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson04/L4-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L5-textbook-key (Lesson 5)

- **identification of the textbook items this record refers to** → `docs/sources/lesson05/L5-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson05/L5-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L6-textbook-key (Lesson 6)

- **identification of the textbook items this record refers to** → `docs/sources/lesson06/L6-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson06/L6-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L7-textbook-key (Lesson 7)

- **identification of the textbook items this record refers to** → `docs/sources/lesson07/L7-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson07/L7-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L8-textbook-key (Lesson 8)

- **identification of the textbook items this record refers to** → `docs/sources/lesson08/L8-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson08/L8-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L9-textbook-key (Lesson 9)

- **identification of the textbook items this record refers to** → `docs/sources/lesson09/L9-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson09/L9-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L10-textbook-key (Lesson 10)

- **identification of the textbook items this record refers to** → `docs/sources/lesson10/L10-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson10/L10-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L11-textbook-key (Lesson 11)

- **identification of the textbook items this record refers to** → `docs/sources/lesson11/L11-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson11/L11-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L12-textbook-key (Lesson 12)

- **identification of the textbook items this record refers to** → `docs/sources/lesson12/L12-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson12/L12-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L13-textbook-key (Lesson 13)

- **identification of the textbook items this record refers to** → `docs/sources/lesson13/L13-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson13/L13-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L14-textbook-key (Lesson 14)

- **identification of the textbook items this record refers to** → `docs/sources/lesson14/L14-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson14/L14-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L15-textbook-key (Lesson 15)

- **identification of the textbook items this record refers to** → `docs/sources/lesson15/L15-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson15/L15-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L16-textbook-key (Lesson 16)

- **identification of the textbook items this record refers to** → `docs/sources/lesson16/L16-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson16/L16-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L17-textbook-key (Lesson 17)

- **identification of the textbook items this record refers to** → `docs/sources/lesson17/L17-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson17/L17-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L18-textbook-key (Lesson 18)

- **identification of the textbook items this record refers to** → `docs/sources/lesson18/L18-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson18/L18-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L19-textbook-key (Lesson 19)

- **identification of the textbook items this record refers to** → `docs/sources/lesson19/L19-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson19/L19-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L20-textbook-key (Lesson 20)

- **identification of the textbook items this record refers to** → `docs/sources/lesson20/L20-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson20/L20-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L21-textbook-key (Lesson 21)

- **identification of the textbook items this record refers to** → `docs/sources/lesson21/L21-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson21/L21-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L22-textbook-key (Lesson 22)

- **identification of the textbook items this record refers to** → `docs/sources/lesson22/L22-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson22/L22-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L23-textbook-key (Lesson 23)

- **identification of the textbook items this record refers to** → `docs/sources/lesson23/L23-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson23/L23-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L24-textbook-key (Lesson 24)

- **identification of the textbook items this record refers to** → `docs/sources/lesson24/L24-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson24/L24-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L25-textbook-key (Lesson 25)

- **identification of the textbook items this record refers to** → `docs/sources/lesson25/L25-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson25/L25-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L26-textbook-key (Lesson 26)

- **identification of the textbook items this record refers to** → `docs/sources/lesson26/L26-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson26/L26-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l27-source-1 (Lesson 27)

- **textbook exercise page** → `docs/sources/lesson27/l27-source-1-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉚ تدريب 1 — اختر الفعل الصحيح»
  - every printed item number 1, 2, 3, 4, 5
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson27/l27-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number 1, 2, 3, 4, 5
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (5):
  - `l27-source-1-1` ↔ printed number 1 — 1. started — فعل منتظم: V3 = started.
  - `l27-source-1-2` ↔ printed number 2 — 2. eaten — eat → ate → eaten.
  - `l27-source-1-3` ↔ printed number 3 — 3. gone — go → went → gone.
  - `l27-source-1-4` ↔ printed number 4 — 4. written — write → wrote → written.
  - `l27-source-1-5` ↔ printed number 5 — 5. seen — see → saw → seen.

### l27-source-2 (Lesson 27)

- **textbook exercise page** → `docs/sources/lesson27/l27-source-2-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉛ تدريب 2 — had أو have؟»
  - every printed item number 1, 2, 3, 4
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson27/l27-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number 1, 2, 3, 4
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (4):
  - `l27-source-2-1` ↔ printed number 1 — 1. had — قبل نقطة ماضية (before I arrived).
  - `l27-source-2-2` ↔ printed number 2 — 2. have — مرتبطة بالحاضر (now).
  - `l27-source-2-3` ↔ printed number 3 — 3. had — قبل نقطة ماضية (before we called).
  - `l27-source-2-4` ↔ printed number 4 — 4. have — تجربة مرتبطة بالحاضر.

### l27-source-3 (Lesson 27)

- **textbook exercise page** → `docs/sources/lesson27/l27-source-3-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉜ تدريب 3 — Past Simple أم Past Perfect؟»
  - every printed item number 1, 2, 3, 4, 5
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson27/l27-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number 1, 2, 3, 4, 5
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (5):
  - `l27-source-3-1` ↔ printed number 1 — 1. had left — بمعنى: القطار غادر قبل وصولي (السياق معروض للط
  - `l27-source-3-2` ↔ printed number 2 — 2. finished — تتابع مع and then والترتيب واضح.
  - `l27-source-3-3` ↔ printed number 3 — 3. had closed — by the time تعلن الأسبقية.
  - `l27-source-3-4` ↔ printed number 4 — 4. visited — حدث واحد بلا مقارنة.
  - `l27-source-3-5` ↔ printed number 5 — 5. had finished — بمعنى: أنهوا العمل قبل الدخول (السياق معرو

### l27-source-4 (Lesson 27)

- **identification of the textbook items this record refers to** → `docs/sources/lesson27/l27-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson27/l27-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l27-source-5 (Lesson 27)

- **textbook exercise page** → `docs/sources/lesson27/l27-source-5-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉞ اكتشف الخطأ»
  - every printed item number ①, ②, ③, ④, ⑤
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson27/l27-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (5):
  - `l27-source-5-%E2%91%A0` ↔ printed number ① — ① had went ← had gone (V3 بعد had).
  - `l27-source-5-%E2%91%A1` ↔ printed number ② — ② had ate ← had eaten.
  - `l27-source-5-%E2%91%A2` ↔ printed number ③ — ③ Did he had finished? ← Had he finished? (مساعد واحد).
  - `l27-source-5-%E2%91%A3` ↔ printed number ④ — ④ hadn't saw ← hadn't seen (V3 بعد hadn't).
  - `l27-source-5-%E2%91%A4` ↔ printed number ⑤ — ⑤ had left already ← had already left (موضع already).

### l27-source-6 (Lesson 27)

- **identification of the textbook items this record refers to** → `docs/sources/lesson27/l27-source-6-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson27/l27-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l27-source-7 (Lesson 27)

- **identification of the textbook items this record refers to** → `docs/sources/lesson27/l27-source-7-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson27/l27-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l27-source-8 (Lesson 27)

- **textbook exercise page** → `docs/sources/lesson27/l27-source-8-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㊷ Boss Battle»
  - every printed item number المعركة 1, المعركة 2
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson27/l27-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number المعركة 1, المعركة 2
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (2):
  - `l27-source-8-%D8%A7%D9%84%D9%85%D8%B9%D8%B1%D9%83%D8%A9%201` ↔ printed number المعركة 1 — المعركة 1: B — was sleeping (النوم مستمر لحظة الدخول).
  - `l27-source-8-%D8%A7%D9%84%D9%85%D8%B9%D8%B1%D9%83%D8%A9%202` ↔ printed number المعركة 2 — المعركة 2: B — had left (المغادرة قبل الوصول).

### l27-source-9 (Lesson 27)

- **textbook exercise page** → `docs/sources/lesson27/l27-source-9-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㊸ الاختبار النهائي المورّد (10 أسئلة)»
  - every printed item number 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson27/l27-source-9-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (10):
  - `l27-source-9-1` ↔ printed number 1 — 1. had started — البدء سبق الوصول.
  - `l27-source-9-2` ↔ printed number 2 — 2. found — V3 بعد had. (تصحيح typo المصدر: الخيار C أصبح fou
  - `l27-source-9-3` ↔ printed number 3 — 3. were eating — بمعنى: العشاء مستمر لحظة الاتصال (السياق مع
  - `l27-source-9-4` ↔ printed number 4 — 4. had lost — الفقد سبق المنع.
  - `l27-source-9-5` ↔ printed number 5 — 5. had left — by the time تعلن الأسبقية.
  - `l27-source-9-6` ↔ printed number 6 — 6. visited — حدث واحد.
  - `l27-source-9-7` ↔ printed number 7 — 7. read — Had + V3 (تصريف read ثابت).
  - `l27-source-9-8` ↔ printed number 8 — 8. seen — V3 بعد hadn't.
  - `l27-source-9-9` ↔ printed number 9 — 9. was watching — توازٍ مع was cooking.
  - `l27-source-9-10` ↔ printed number 10 — 10. gone — had already + V3.

### l27-source-10 (Lesson 27)

- **identification of the textbook items this record refers to** → `docs/sources/lesson27/l27-source-10-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson27/l27-source-10-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l28-source-1 (Lesson 28)

- **textbook exercise page** → `docs/sources/lesson28/l28-source-1-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉚ تمرين 1 — اختر»
  - every printed item number ①, ②, ③, ④, ⑤
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson28/l28-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (5):
  - `l28-source-1-%E2%91%A0` ↔ printed number ① — ① had started — الاجتماع بدأ قبل الوصول.
  - `l28-source-1-%E2%91%A1` ↔ printed number ② — ② had finished — إنهاء الواجب سبق الخروج.
  - `l28-source-1-%E2%91%A2` ↔ printed number ③ — ③ visited — حدث واحد محدد بالأمس بلا مقارنة.
  - `l28-source-1-%E2%91%A3` ↔ printed number ④ — ④ had gone — by the time تعلن الأسبقية.
  - `l28-source-1-%E2%91%A4` ↔ printed number ⑤ — ⑤ were playing — اللعب كان مستمرًا لحظة بدء المطر.

### l28-source-2 (Lesson 28)

- **textbook exercise page** → `docs/sources/lesson28/l28-source-2-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉛ تمرين 2 — حدد الحدث الأول»
  - every printed item number 1, 2, 3
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson28/l28-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number 1, 2, 3
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (3):
  - `l28-source-2-1` ↔ printed number 1 — 1. Tom ate lunch أقدم، وI arrived أحدث.
  - `l28-source-2-2` ↔ printed number 2 — 2. I finished my work أقدم، وSara called أحدث.
  - `l28-source-2-3` ↔ printed number 3 — 3. The thief escaped أقدم، وThe police arrived أحدث.

### l28-source-3 (Lesson 28)

- **textbook exercise page** → `docs/sources/lesson28/l28-source-3-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉜ تمرين 3 — صحح الأخطاء»
  - every printed item number ①, ②, ③, ④, ⑤
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson28/l28-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (5):
  - `l28-source-3-%E2%91%A0` ↔ printed number ① — ① had went ← had gone (go → went → gone).
  - `l28-source-3-%E2%91%A1` ↔ printed number ② — ② had ate ← had eaten (eat → ate → eaten).
  - `l28-source-3-%E2%91%A2` ↔ printed number ③ — ③ had saw ← had seen (see → saw → seen).
  - `l28-source-3-%E2%91%A3` ↔ printed number ④ — ④ Did he had left? ← Had he left? (مساعد واحد: Had + subject
  - `l28-source-3-%E2%91%A4` ↔ printed number ⑤ — ⑤ didn't had finished ← hadn't finished (أو had not finished

### l28-source-4 (Lesson 28)

- **identification of the textbook items this record refers to** → `docs/sources/lesson28/l28-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson28/l28-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l28-source-5 (Lesson 28)

- **identification of the textbook items this record refers to** → `docs/sources/lesson28/l28-source-5-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson28/l28-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l28-source-6 (Lesson 28)

- **identification of the textbook items this record refers to** → `docs/sources/lesson28/l28-source-6-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson28/l28-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l28-source-7 (Lesson 28)

- **identification of the textbook items this record refers to** → `docs/sources/lesson28/l28-source-7-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson28/l28-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l28-source-8 (Lesson 28)

- **identification of the textbook items this record refers to** → `docs/sources/lesson28/l28-source-8-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson28/l28-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### L29-textbook-key (Lesson 29)

- **identification of the textbook items this record refers to** → `docs/sources/lesson29/L29-textbook-key-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson29/L29-textbook-key-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l30-source-1 (Lesson 30)

- **textbook exercise page** → `docs/sources/lesson30/l30-source-1-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉕ اختبار 1 — اختر الزمن»
  - every printed item number ①, ②, ③, ④, ⑤
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson30/l30-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (5):
  - `l30-source-1-%E2%91%A0` ↔ printed number ① — ① B — was talking: نشاط مستمر لحظة الدخول.
  - `l30-source-1-%E2%91%A1` ↔ printed number ② — ② A — had left: المغادرة اكتملت قبل الوصول (before I arrived
  - `l30-source-1-%E2%91%A2` ↔ printed number ③ — ③ A — had been running: نشاط ممتد سبّب الإنهاك.
  - `l30-source-1-%E2%91%A3` ↔ printed number ④ — ④ B — finished: حدث ماضٍ واحد مع yesterday بلا مقارنة.
  - `l30-source-1-%E2%91%A4` ↔ printed number ⑤ — ⑤ C — was watching: ساعة محددة + نشاط مستمر عندها.

### l30-source-2 (Lesson 30)

- **identification of the textbook items this record refers to** → `docs/sources/lesson30/l30-source-2-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson30/l30-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l30-source-3 (Lesson 30)

- **textbook exercise page** → `docs/sources/lesson30/l30-source-3-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉜ اختبار 3 — صحح الأخطاء»
  - every printed item number ①, ②, ③, ④, ⑤, ⑥
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson30/l30-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤, ⑥
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (6):
  - `l30-source-3-%E2%91%A0` ↔ printed number ① — ① I had been studying for three hours — بعد had been يأتي ve
  - `l30-source-3-%E2%91%A1` ↔ printed number ② — ② I had been waiting for two hours when he arrived — مع ملاح
  - `l30-source-3-%E2%91%A2` ↔ printed number ③ — ③ When we arrived, the movie had already started — موضع alre
  - `l30-source-3-%E2%91%A3` ↔ printed number ④ — ④ He had gone home before I called — V3 بعد had.
  - `l30-source-3-%E2%91%A4` ↔ printed number ⑤ — ⑤ They had known each other for ten years — know فعل حالة.
  - `l30-source-3-%E2%91%A5` ↔ printed number ⑥ — ⑥ Had you finished your work? — مساعد واحد فقط، لا did مع ha

### l30-source-4 (Lesson 30)

- **identification of the textbook items this record refers to** → `docs/sources/lesson30/l30-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson30/l30-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l30-source-5 (Lesson 30)

- **identification of the textbook items this record refers to** → `docs/sources/lesson30/l30-source-5-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson30/l30-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l30-source-6 (Lesson 30)

- **identification of the textbook items this record refers to** → `docs/sources/lesson30/l30-source-6-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson30/l30-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l30-source-7 (Lesson 30)

- **identification of the textbook items this record refers to** → `docs/sources/lesson30/l30-source-7-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson30/l30-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l30-source-8 (Lesson 30)

- **identification of the textbook items this record refers to** → `docs/sources/lesson30/l30-source-8-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson30/l30-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l30-source-9 (Lesson 30)

- **identification of the textbook items this record refers to** → `docs/sources/lesson30/l30-source-9-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson30/l30-source-9-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l31-source-1 (Lesson 31)

- **textbook exercise page** → `docs/sources/lesson31/l31-source-1-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㉟ المحقق — الحلول الثمانية»
  - every printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson31/l31-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (8):
  - `l31-source-1-%E2%91%A0` ↔ printed number ① — ① She has gone to school. (V3 بعد has)
  - `l31-source-1-%E2%91%A1` ↔ printed number ② — ② I saw him yesterday. (وقت ماضٍ محدد ومنتهٍ)
  - `l31-source-1-%E2%91%A2` ↔ printed number ③ — ③ Have you eaten breakfast? (لا did مع Present Perfect)
  - `l31-source-1-%E2%91%A3` ↔ printed number ④ — ④ He has never visited Paris. (لا نفي مزدوج)
  - `l31-source-1-%E2%91%A4` ↔ printed number ⑤ — ⑤ They have finished the project. (They → have)
  - `l31-source-1-%E2%91%A5` ↔ printed number ⑥ — ⑥ Has she arrived? (She → Has في السؤال)
  - `l31-source-1-%E2%91%A6` ↔ printed number ⑦ — ⑦ I have lived here for five years. (مدة → for)
  - `l31-source-1-%E2%91%A7` ↔ printed number ⑧ — ⑧ She has worked here since 2022. (نقطة بداية → since)

### l31-source-2 (Lesson 31)

- **textbook exercise page** → `docs/sources/lesson31/l31-source-2-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㊱ الاختيار الذكي — الحلول الثمانية»
  - every printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson31/l31-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (8):
  - `l31-source-2-%E2%91%A0` ↔ printed number ① — ① finished · 
  - `l31-source-2-%E2%91%A1` ↔ printed number ② — ② have finished · 
  - `l31-source-2-%E2%91%A2` ↔ printed number ③ — ③ traveled · 
  - `l31-source-2-%E2%91%A3` ↔ printed number ④ — ④ has traveled
  - `l31-source-2-%E2%91%A4` ↔ printed number ⑤ — ⑤ solved · 
  - `l31-source-2-%E2%91%A5` ↔ printed number ⑥ — ⑥ have solved · 
  - `l31-source-2-%E2%91%A6` ↔ printed number ⑦ — ⑦ lost · 
  - `l31-source-2-%E2%91%A7` ↔ printed number ⑧ — ⑧ has lost

### l31-source-3 (Lesson 31)

- **identification of the textbook items this record refers to** → `docs/sources/lesson31/l31-source-3-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson31/l31-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l31-source-4 (Lesson 31)

- **identification of the textbook items this record refers to** → `docs/sources/lesson31/l31-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson31/l31-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l31-source-5 (Lesson 31)

- **identification of the textbook items this record refers to** → `docs/sources/lesson31/l31-source-5-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson31/l31-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l31-source-6 (Lesson 31)

- **textbook exercise page** → `docs/sources/lesson31/l31-source-6-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㊶ for / since — الحلول الخمسة»
  - every printed item number ①, ②, ③, ④, ⑤
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson31/l31-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (5):
  - `l31-source-6-%E2%91%A0` ↔ printed number ① — ① since 2020 · 
  - `l31-source-6-%E2%91%A1` ↔ printed number ② — ② for four years · 
  - `l31-source-6-%E2%91%A2` ↔ printed number ③ — ③ since childhood · 
  - `l31-source-6-%E2%91%A3` ↔ printed number ④ — ④ for six months · 
  - `l31-source-6-%E2%91%A4` ↔ printed number ⑤ — ⑤ since 2018

### l31-source-7 (Lesson 31)

- **textbook exercise page** → `docs/sources/lesson31/l31-source-7-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㊷ التحدي النهائي — إجابات نموذجية (للقياس لا للنسخ)»
  - every printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson31/l31-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (7):
  - `l31-source-7-%E2%91%A0` ↔ printed number ① — ① I have never ridden a horse. · 
  - `l31-source-7-%E2%91%A1` ↔ printed number ② — ② I have already finished my homework. · 
  - `l31-source-7-%E2%91%A2` ↔ printed number ③ — ③ I have just arrived.
  - `l31-source-7-%E2%91%A3` ↔ printed number ④ — ④ I haven't eaten yet. · 
  - `l31-source-7-%E2%91%A4` ↔ printed number ⑤ — ⑤ Have you ever visited Turkey? · 
  - `l31-source-7-%E2%91%A5` ↔ printed number ⑥ — ⑥ I have lived in this city for six years.
  - `l31-source-7-%E2%91%A6` ↔ printed number ⑦ — ⑦ I have studied English since 2019.

### l31-source-8 (Lesson 31)

- **textbook exercise page** → `docs/sources/lesson31/l31-source-8-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «㊸ Final Boss — أربع جمل، أربعة معانٍ»
  - every printed item number ①, ②, ③, ④
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson31/l31-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (4):
  - `l31-source-8-%E2%91%A0` ↔ printed number ① — ① I ate the cake. → Past Simple — أكلت الكعكة. حدث ماضٍ.
  - `l31-source-8-%E2%91%A1` ↔ printed number ② — ② I was eating the cake. → Past Continuous — الفعل كان جاريً
  - `l31-source-8-%E2%91%A2` ↔ printed number ③ — ③ I had eaten the cake before they arrived. → Past Perfect —
  - `l31-source-8-%E2%91%A3` ↔ printed number ④ — ④ I have eaten the cake. → Present Perfect — هناك علاقة بالح

### l31-source-9 (Lesson 31)

- **textbook exercise page** → `docs/sources/lesson31/l31-source-9-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «مختبرات الدرس التفاعلية — حلول مختصرة»
  - every printed item number ③, ④, ⑤, ⑰
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson31/l31-source-9-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ③, ④, ⑤, ⑰
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (4):
  - `l31-source-9-%E2%91%A2` ↔ printed number ③ — ③ have/has: I/You/We/They → have · He/She/It → has.
  - `l31-source-9-%E2%91%A3` ↔ printed number ④ — ④ V3: gone · eaten · seen · written · taken · broken · finis
  - `l31-source-9-%E2%91%A4` ↔ printed number ⑤ — ⑤ المثبتة: cleaned · opened · built · forgotten · finished ·
  - `l31-source-9-%E2%91%B0` ↔ printed number ⑰ — ⑰ on the periods: today/this week/this year = فترات مفتوحة ·

### l32-source-1 (Lesson 32)

- **identification of the textbook items this record refers to** → `docs/sources/lesson32/l32-source-1-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson32/l32-source-1-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l32-source-2 (Lesson 32)

- **identification of the textbook items this record refers to** → `docs/sources/lesson32/l32-source-2-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson32/l32-source-2-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l32-source-3 (Lesson 32)

- **identification of the textbook items this record refers to** → `docs/sources/lesson32/l32-source-3-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson32/l32-source-3-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l32-source-4 (Lesson 32)

- **identification of the textbook items this record refers to** → `docs/sources/lesson32/l32-source-4-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson32/l32-source-4-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l32-source-5 (Lesson 32)

- **textbook exercise page** → `docs/sources/lesson32/l32-source-5-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «§27 · Grammar Detective (المصدر — 8 أخطاء)»
  - every printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson32/l32-source-5-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (8):
  - `l32-source-5-%E2%91%A0` ↔ printed number ① — ① She has been studying for two hours. 
  - `l32-source-5-%E2%91%A1` ↔ printed number ② — ② I have been working for three hours. 
  - `l32-source-5-%E2%91%A2` ↔ printed number ③ — ③ He has known her for years. 
  - `l32-source-5-%E2%91%A3` ↔ printed number ④ — ④ Have you been waiting long? 
  - `l32-source-5-%E2%91%A4` ↔ printed number ⑤ — ⑤ They have been playing all afternoon. 
  - `l32-source-5-%E2%91%A5` ↔ printed number ⑥ — ⑥ She hasn't been sleeping well. 
  - `l32-source-5-%E2%91%A6` ↔ printed number ⑦ — ⑦ How long has he been working here? 
  - `l32-source-5-%E2%91%A7` ↔ printed number ⑧ — ⑧ I have written five emails.

### l32-source-6 (Lesson 32)

- **textbook exercise page** → `docs/sources/lesson32/l32-source-6-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «§28 · تحدي الاختيار (المصدر)»
  - every printed item number ①, ②, ③, ④, ⑤, ⑥
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson32/l32-source-6-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤, ⑥
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (6):
  - `l32-source-6-%E2%91%A0` ↔ printed number ① — ① have read · 
  - `l32-source-6-%E2%91%A1` ↔ printed number ② — ② have been reading · 
  - `l32-source-6-%E2%91%A2` ↔ printed number ③ — ③ has made · 
  - `l32-source-6-%E2%91%A3` ↔ printed number ④ — ④ has been making · 
  - `l32-source-6-%E2%91%A4` ↔ printed number ⑤ — ⑤ have cleaned · 
  - `l32-source-6-%E2%91%A5` ↔ printed number ⑥ — ⑥ have been cleaning.

### l32-source-7 (Lesson 32)

- **identification of the textbook items this record refers to** → `docs/sources/lesson32/l32-source-7-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson32/l32-source-7-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l32-source-8 (Lesson 32)

- **textbook exercise page** → `docs/sources/lesson32/l32-source-8-exercise.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading «§32 · Boss Challenge (المصدر — 8 جمل)»
  - every printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧
  - the printed page number
  - the full wording of each item, legible enough to compare character-for-character
- **teacher answer key page** → `docs/sources/lesson32/l32-source-8-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each printed item number ①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧
  - the printed page number of the key
  - any printed reasoning/solution text, if the key supplies one
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.
- Identifiers to compare (8):
  - `l32-source-8-%E2%91%A0` ↔ printed number ① — ① play — Present Simple · 
  - `l32-source-8-%E2%91%A1` ↔ printed number ② — ② are playing — Present Continuous · 
  - `l32-source-8-%E2%91%A2` ↔ printed number ③ — ③ have read — Present Perfect · 
  - `l32-source-8-%E2%91%A3` ↔ printed number ④ — ④ have been studying — Present Perfect Continuous · 
  - `l32-source-8-%E2%91%A4` ↔ printed number ⑤ — ⑤ studies — Present Simple · 
  - `l32-source-8-%E2%91%A5` ↔ printed number ⑥ — ⑥ is studying — Present Continuous · 
  - `l32-source-8-%E2%91%A6` ↔ printed number ⑦ — ⑦ has been studying — Present Perfect Continuous · 
  - `l32-source-8-%E2%91%A7` ↔ printed number ⑧ — ⑧ has read — Present Perfect.

### l32-source-9 (Lesson 32)

- **identification of the textbook items this record refers to** → `docs/sources/lesson32/l32-source-9-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson32/l32-source-9-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l32-source-10 (Lesson 32)

- **identification of the textbook items this record refers to** → `docs/sources/lesson32/l32-source-10-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson32/l32-source-10-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

### l32-source-11 (Lesson 32)

- **identification of the textbook items this record refers to** → `docs/sources/lesson32/l32-source-11-identification.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - the printed exercise heading(s) and item number(s) this lesson-level record is meant to cover
  - the printed page number(s)
  - enough of the surrounding page to confirm the edition and exercise
- **teacher answer key page(s) for those items** → `docs/sources/lesson32/l32-source-11-key.<pdf|png|jpg|jpeg|webp|tiff|heic|docx>`
  - an answer entry for each identified printed item number
  - the printed page number of the key
- ⚠ There is nothing to map yet: the record names a lesson, not an item. Supplying a page number or a question list for it would invent provenance, so the first requirement is identification, not comparison.
- Page metadata: transcribe the printed page into `sourcePage` (currently `null`). Transcribe the printed page number verbatim from the supplied scan. It must never be derived from a section index, a lesson number, an exercise ordinal (㉚ etc.) or the order of records in this file.

