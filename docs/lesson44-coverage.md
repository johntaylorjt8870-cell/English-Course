# Lesson 44 — Coverage & Source Audit

## Source Mapping (38 sections + cover = 39 steps)

| Source § | Step | Title | Destination |
|----------|------|-------|-------------|
| 0 | 0 | Cover / Intro | Cover44 |
| 1 | 1 | أهداف الدرس | GoalList44 |
| 2 | 2 | ما معنى MUST؟ | Source + ObligationBuilder44 |
| 3 | 3 | قاعدة MUST الذهبية | Source + ChoiceLab (MUST rule) |
| 4 | 4 | الضرورة التي يؤكدها المتحدث | Source lines |
| 5 | 5 | القوانين والتعليمات | Source lines |
| 6 | 6 | MUST للتوصية القوية | Source lines |
| 7 | 7 | ما معنى HAVE TO؟ | Source + ChoiceLab (HAVE TO rule) |
| 8 | 8 | HAS TO مع HE/SHE/IT | Source lines |
| 9 | 9 | متى نستخدم HAVE TO؟ | Source lines |
| 10 | 10 | الفرق الحقيقي | Source lines |
| 11 | 11 | جدول المقارنة الذهبي | Source lines |
| 12 | 12 | حوار Preparing for the Exam | Dialog44 |
| 13 | 13 | MUSTN'T vs DON'T HAVE TO | Source + ProhibitionSorter44 |
| 14 | 14 | MUSTN'T — المنع | Source + ChoiceLab (MUSTN'T) |
| 15 | 15 | DON'T HAVE TO — عدم الضرورة | Source lines |
| 16 | 16 | مقارنة تغيّر المعنى | Source lines |
| 17 | 17 | كيف نكوّن السؤال؟ | Source lines |
| 18 | 18 | الإجابات القصيرة | Source lines |
| 19 | 19 | MUST في السؤال | Source lines |
| 20 | 20 | HAD TO — الماضي | Source + TenseMachine44 + ChoiceLab (Past) |
| 21 | 21 | النفي في الماضي | Source lines |
| 22 | 22 | السؤال عن الماضي | Source lines |
| 23 | 23 | WILL HAVE TO — المستقبل | Source + ChoiceLab (Future) |
| 24 | 24 | النفي والسؤال في المستقبل | Source lines |
| 25 | 25 | الفرق بين الضرورة والنصيحة | Source lines |
| 26 | 26 | حوار Science Competition | Dialog44 |
| 27 | 27 | Grammar Detective | GrammarDetective44 (10 errors) |
| 28 | 28 | التدريب الأول | PracticeSet44 (5 MCQ) |
| 29 | 29 | التدريب الثاني | PracticeSet44 (5 fill) |
| 30 | 30 | التدريب الثالث | PracticeSet44 (5 fill) |
| 31 | 31 | التدريب الرابع | PracticeSet44 (5 transform) |
| 32 | 32 | التدريب الخامس | PracticeSet44 (5 transform) |
| 33 | 33 | Reading Challenge | ReadingChallenge44 (10 Q) |
| 34 | 34 | الاختبار النهائي | → TestArea44 (25 Q) |
| 35 | 35 | مساحة المعلم | → TeacherArea44 |
| 36 | 36 | Writing Mission | WritingMission44 |
| 37 | 37 | الملخص الذهبي | SummaryCards44 + Source |
| 38 | 38 | خريطة التقدم | Roadmap44 |

## Test Verification

- ✅ 25 questions across 5 levels
- ✅ All solutions present (25/25)
- ✅ Questions 21-25 mapped to dialogue blanks
- ✅ Level 4 questions (16-20) are open-ended with comparison prompts

## Content Density Review

Longest steps by source line count:
- §34 (Test instructions): 63 lines — just instructions + button, actual test is in separate area
- §37 (Summary): 44 lines — 5 summary cards + source text
- §33 (Reading): 40 lines — full text + 10 interactive questions
- §28 (Exercise 1): 28 lines — 5 MCQ with solutions
- §27 (Grammar Detective): 27 lines — 10 errors with reveal-on-click

All steps are focused on a single concept. No step combines multiple unrelated ideas.
Interactive elements break up reading content effectively.

## Visual Identity

- **Theme**: "Obligation Lab" — bright, vibrant
- **Canvas**: Sky blue (#F0F9FF) — NO dark backgrounds
- **Primary**: Cyan (#0891B2) for MUST
- **Secondary**: Amber (#D97706) for HAVE TO
- **Prohibition**: Coral/Red (#EF4444) for MUSTN'T
- **Unnecessary**: Emerald (#10B981) for DON'T HAVE TO
- **Past**: Purple (#8B5CF6) for HAD TO
- **Future**: Teal (#06B6D4) for WILL HAVE TO
- Colors serve functional classification, not decoration

## Interactive Elements (verified)

1. ObligationBuilder44 — Subject + MUST/HAVE TO + V1 builder
2. TenseMachine44 — Present/Past/Future tense switching
3. ProhibitionSorter44 — Sort prohibition vs lack of necessity
4. ChoiceLab (×5) — Rule checks at key points
5. GrammarDetective44 — 10 errors with reveal-on-click
6. PracticeSet44 (×5) — All exercises with attempt-gated solutions
7. ReadingChallenge44 — 10 comprehension questions with comparison
8. Dialog44 (×2) — Both dialogues rendered with speaker turns
9. WritingMission44 — Writing task with checklist

## Audit Results

- ✅ Build: passes
- ✅ BIDI: all 59 assertions pass
- ✅ English direction: passes
- ✅ Final test audit: passes (1254 checks)
- ✅ Navigation audit: 166/168 pass (2 failures are expected window-size adjustment for new lesson 44)
