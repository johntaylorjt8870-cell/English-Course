#!/usr/bin/env node
// ============================================================
// مُلحق حركي خفيف: بعد فشل تدقيق المتصفح في CI (خطوة smoke أو التدقيق
// الشامل)، يحوّل إخفاقات docs/runtime-audit/report.json إلى تعليقات
// (::error:: workflow commands) فتظهر في مخرجات الفحص والتعليقات — لأن
// سجلات الوظائف غير قابلة للوصول من بعض البيئات. لا يُغيّر أي نتيجة،
// ولا يُضعف أي فحص؛ للتشخيص فقط، دائمًا exit 0.
// ============================================================
import { readFileSync, existsSync } from "node:fs";

const REPORT = "docs/runtime-audit/report.json";
if (!existsSync(REPORT)) {
  console.log("::warning title=runtime-audit::report.json غير موجود — لا توجد تفاصيل إخفاق يعلنها التدقيق نفسه.");
  process.exit(0);
}
const report = JSON.parse(readFileSync(REPORT, "utf8"));
const failed = [];
for (const s of report.scenarios || []) {
  for (const assertion of s.failedAssertions || []) failed.push({ scope: `L${s.lesson}@${s.viewport}`, assertion });
}
for (const n of report.navigation || []) {
  if (!n.ok) failed.push({ scope: `nav@${n.viewport}`, assertion: `تنقل فاشل: ${n.scenario}` });
}
for (const b of report.errorBoundary || []) {
  for (const e of b.unexpectedConsoleErrors || []) failed.push({ scope: `boundary@${b.viewport}`, assertion: `console غير متوقع: ${e}` });
  for (const e of b.pageErrors || []) failed.push({ scope: `boundary@${b.viewport}`, assertion: `pageerror: ${e}` });
}
console.log(`runtime-audit failures: ${failed.length}`);
for (const f of failed.slice(0, 10)) {
  // تعليقات GitHub على مستوى الفحص: تظهر في تبويب Checks وفي تبويب Files changed.
  console.log(`::error file=docs/runtime-audit/report.json,title=runtime-audit ${f.scope}::${f.assertion}`);
}
process.exit(0);
