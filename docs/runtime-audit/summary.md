# Fix #3 — Runtime Browser Audit (all lessons)

**تاريخ التوليد:** 2026-11-22T22:29:12.919Z
**خط الأساس:** `879253a6434febc082ff8af6f1bcd0988a30c0fc`

## النطاق

| البند | القيمة |
| --- | --- |
| الدروس المتوقعة | 62 |
| الدروس التي فُتحت فعلًا | **62** (1–62) |
| المقاسات | 1440×900 · 375×812 |
| سناريوهات الدرس | **124** (desktop-1440x900=62, mobile-375x812=62) |
| فحوص مجمّعة | 2018 (نجح 2018 · فشل 0) |
| سناريوهات بها إخفاق | 0 |
| متصفح | Chromium (@sparticuz/chromium via playwright-core), headless |
| الهدف | dist/ production bundle served over static HTTP under /English-Course/ |

## التصنيف

- **إخفاقات جديدة من هذا العمل:** 0
- **إخفاقات قائمة سابقًا:** 0
- **إخفاقات بيئية فقط (خطوط خارجية):** 62 درسًا — لا تُحسب إخفاقًا تطبيقيًا.
- **إخفاقات بنية التدقيق:** 0

## التنقل وقفل الموقع

| المقاس | السناريو | النتيجة |
| --- | --- | --- |
| desktop-1440x900 | hub->lesson | ✓ |
| desktop-1440x900 | lesson->hub | ✓ |
| desktop-1440x900 | lesson1->next | ✓ |
| desktop-1440x900 | step-next | ✓ |
| desktop-1440x900 | site-lock | ✓ |
| mobile-375x812 | hub->lesson | ✓ |
| mobile-375x812 | lesson->hub | ✓ |
| mobile-375x812 | lesson1->next | ✓ |
| mobile-375x812 | step-next | ✓ |
| mobile-375x812 | site-lock | ✓ |

## حدّ الأخطاء والتعافي

- **desktop-1440x900:** أخطاء حقن مصنّفة=2 · console غير متوقعة=0 · pageerrors=0
- **mobile-375x812:** أخطاء حقن مصنّفة=2 · console غير متوقعة=0 · pageerrors=0

## الإخفاقات التفصيلية

لا توجد إخفاقات في الدروس المفحوصة.

## إخفاقات تدقيقات قائمة (خط الأساس، موثّقة)

- `nav-lock-browser-lesson44-selector`: audit:navigation-lock-browser ينتظر المحدد `.lesson44 .stepNav44` غير الموجود في المصدر (الدرس 44 يستخدم obligation44 وLesson1Shell). موثّق في src/lessons/lesson55/coverage.md.

## الملفات

- تقرير JSON: `docs/runtime-audit/report.json`
- ملخص: `docs/runtime-audit/summary.md`
- لقطات الإخفاق: `docs/runtime-audit/screenshots/` (تُنشأ فقط عند الإخفاق)

