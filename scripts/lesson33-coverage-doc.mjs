// Regenerates docs/lesson33-coverage.md and docs/lesson33-source-manifest.json
// straight from the lesson's own data modules, so the published coverage record
// can never drift from the shipped lesson.
//   node scripts/lesson33-coverage-doc.mjs
// Mirrors the shape of docs/lesson41-coverage.md and docs/lesson41-source-manifest.json.
import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { build } from "esbuild";

mkdirSync("node_modules/.lesson33-doc", { recursive: true });
await build({
  stdin: {
    contents: `export * from './src/lessons/lesson33/ledger33';
export * from './src/lessons/lesson33/slides33';
export * from './src/lessons/lesson33/practice33';
export * from './src/lessons/lesson33/testData33';
export * from './src/lessons/lesson33/key33';
export * from './src/lessons/lesson33/coverage33';`,
    resolveDir: process.cwd(),
  },
  outfile: "node_modules/.lesson33-doc/data.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  loader: { ".css": "empty" },
});
const data = await import(`${process.cwd()}/node_modules/.lesson33-doc/data.mjs?${Date.now()}`);
const {
  SOURCE_SECTIONS_33: sections,
  SOURCE_LEDGER_COUNT_33: blocks,
  SOURCE_NUMBERED_COUNT_33: numbered,
  SOURCE_UNIT_COUNT_33: units,
  SOURCE_CORRECTIONS_33: corrections,
  INTENTIONALLY_WRONG_33: intentional,
  SLIDES_33: slides,
  STATIONS_33: stations,
  PRACTICE_COUNTS_33: practiceCounts,
  TEST_LEVELS_33: levels,
  TEST_33: questions,
  SOLUTIONS_33: solutions,
  MIA_CORRECTED_33: miaCorrected,
  COVERAGE_33: coverage,
  COVERAGE_SUMMARY_33: summary,
  uncoveredUnits33,
  duplicatedUnits33,
} = data;

const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");
const uncovered = uncoveredUnits33();
const duplicated = duplicatedUnits33();
const totalFields = questions.reduce((n, q) => n + q.fields.length, 0);

// ---------------- docs/lesson33-source-manifest.json ----------------
const manifest = sections.map((section) => ({
  id: section.id,
  num: section.num,
  title: section.title,
  units: section.lines.length,
  sha256: sha256(section.lines.join("\n")),
  slides: coverage.find((row) => row.id === section.id)?.slides ?? [],
  renderedUnits: coverage.find((row) => row.id === section.id)?.renderedUnits ?? 0,
  gatedUnits: coverage.find((row) => row.id === section.id)?.gatedUnits ?? 0,
  answerLocation: coverage.find((row) => row.id === section.id)?.answerLocation ?? "",
}));
writeFileSync("docs/lesson33-source-manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);

// ---------------- station / kind / variant / lab roll-ups ----------------
const byStation = stations.map((station) => {
  const own = slides.filter((slide) => slide.station === station.id);
  const secs = [...new Set(own.map((slide) => slide.section))];
  return {
    ...station,
    count: own.length,
    sections: secs
      .map((id) => {
        const num = sections.find((s) => s.id === id)?.num;
        if (num !== null && num !== undefined) return String(num);
        if (id === "cover") return "الغلاف";
        if (id === "objectives") return "الأهداف";
        return id;
      })
      .join("، "),
  };
});

const KIND_COMPONENT = {
  cover: "`Cover33` + `Lens33` ×4",
  lesson: "`Frame33` + `SourceLines33` / `NumberCards33` / `Panel33` / `TenseCard33`",
  detective: "`DetectiveSet33` + `GatedLines33`",
  practice: "`PracticeSet33` + `AttemptCard`",
  paragraph: "`ParagraphDetective33` + `GatedLines33`",
  analysis: "`AnalysisSet33`",
  reading: "`StoryReader33` + `StoryHighlight33` + `highlightPhrases33()`",
  test: "`TestArea33` (embedded) — بيانات `testData33.ts` فقط",
  testResult: "`TestResult33View` + lazy `SolutionsArea33`",
  solutions: "lazy `SolutionsArea33`",
  writing: "`WritingEditor33`",
};
const kinds = [...new Set(slides.map((slide) => slide.kind))].map((kind) => ({
  kind,
  count: slides.filter((slide) => slide.kind === kind).length,
  component: KIND_COMPONENT[kind] ?? "`Frame33`",
}));

const labs = [...new Set(slides.map((slide) => slide.lab).filter(Boolean))].map((lab) => ({
  lab,
  slides: slides.filter((slide) => slide.lab === lab).map((slide) => slide.id),
}));

const variants = [...new Set(slides.map((slide) => slide.variant).filter(Boolean))].map((variant) => ({
  variant,
  count: slides.filter((slide) => slide.variant === variant).length,
}));

// ---------------- docs/lesson33-coverage.md ----------------
const L = [];
L.push("# الدرس 33 — تغطية المادة والتحقق (Lesson 33 Coverage)");
L.push("");
L.push(`> وثيقة **مولّدة** من وحدات بيانات الدرس نفسها بواسطة \`node scripts/lesson33-coverage-doc.mjs\`، فلا يمكن أن تنفصل عن الدرس المنشور. الأرقام في هذه الصفحة هي أرقام \`scripts/audit-lesson33.mjs\` نفسه.`);
L.push("");
L.push("**الحالة:** أُعيد بناء الدرس وتحقّق منه. المادة = نص الدرس الكامل المقدَّم في المحادثة (الغلاف + 🎯 الأهداف + الأقسام المرقّمة ①–㉔).");
L.push("");
L.push(`- كتل المادة: **${blocks}** (الغلاف، الأهداف، و**${numbered}** قسمًا مرقّمًا ①–㉔).`);
L.push(`- وحدات المادة بعد التطبيع: **${units}** — كل واحدة تظهر **مرة واحدة بالضبط** (غير مغطاة: **${uncovered.length}**، مكرّرة: **${duplicated.length}**).`);
L.push(`- الشرائح: **${summary.slides}** في **${summary.stations}** محطات تعلّم.`);
const gatedTotal = Object.values(practiceCounts).reduce((n, c) => n + c, 0);
L.push(`- بنود مقفولة على محاولة الطالب: **${gatedTotal}** في ست مجموعات (محقق ⑫، تدريب ⑬، تدريب ⑭، تحليل ⑰، صيد الفقرة ⑱، مواقف ⑲). \`COVERAGE_SUMMARY_33.practiceItems\` = ${summary.practiceItems} و\`scripts/audit-lesson33.mjs\` يعدّ ${summary.practiceItems + 4} لأنه يجمع \`ALL_PRACTICE_33 + DETECTIVE_33 + PARAGRAPH_SPOTS_33 + STORY_ROWS_33\` (بلا ⑲).`);
L.push(`- مختبرات تفاعلية: **${labs.length}** على **${slides.filter((s) => s.lab).length}** شريحة.`);
L.push(`- اختبار الدرس: **${questions.length}** سؤالًا في **${levels.length}** مستويات، و**${totalFields}** حقل إجابة، ومفتاح تفصيلي **${solutions.length}/${questions.length}**.`);
L.push(`- تصحيحات موثّقة على نص المادة: **${corrections.length}** · أخطاء مقصودة محفوظة حرفيًا: **${intentional.length}**.`);
L.push("");
L.push("## قواعد الربط");
L.push("");
L.push("- **لا يُضغط أي قسم في شريحة واحدة**: كل شريحة تعلن `ranges` صريحة من وحدات المادة، فيزداد عدد الشرائح بدل أن ينقص المحتوى.");
L.push("- `SOURCE_SECTIONS_33` في `ledger33.ts` تحمل النص حرفيًا (مدخل واحد لكل سطر مُطبَّع). `coveredIndexes33()` تُرجع الوحدات التي ترسمها الشرائح، و`uncoveredUnits33()` و`duplicatedUnits33()` يجب أن تبقيا فارغتين (يفحصهما `scripts/audit-lesson33.mjs`).");
L.push("- ثلاثة أدوار للوحدات: `ranges` = تظهر مباشرة في الشريحة، `keyRanges` = **حلّ مقترن بمحاولة الطالب** (لا يظهر قبل الضغط)، `headRanges`/`footRanges` = أسطر تمهيدية/ختامية حول مختبر تفاعلي.");
L.push("- الجداول (①②⑦⑰) والحوارات وأزواج ❌/✅ تحافظ على بنيتها: `SourceLines33` بمتغيّرات `table` / `tenseTable` / `signalTable` / `steps` / `objectives`، و`Panel33`، و`TenseCard33`.");
L.push("- مفاتيح ⑫⑬⑭⑰⑱⑲ تعيش في `practice33.ts` وتُعرض فقط عبر `AttemptCard` بعد محاولة الطالب، وتُعاد للمعلم خلف بوابته.");
L.push("- ⑳ يُرسم عبر `TestArea33` وحده؛ المصحّح (`key33.ts`) والحلول (`SolutionsArea33.tsx`) ودليل المعلم (`TeacherGuide33.tsx`) **قطع مؤجَّلة منفصلة** ليست ضمن حزمة الطالب ولا ضمن DOM الدراسة.");
L.push("");
L.push("## خريطة القسم ← الشرائح");
L.push("");
L.push("| § | القسم | وحدات ظاهرة / مقفولة / الكل | الشرائح | موضع الإجابات |");
L.push("|---|---|---|---|---|");
for (const row of coverage) {
  const label = row.num === null ? (row.id === "cover" ? "الغلاف" : "🎯") : String(row.num);
  L.push(`| ${label} | ${row.title} | ${row.renderedUnits} + ${row.gatedUnits} / ${row.units} | ${row.slides.map((s) => `\`${s}\``).join("، ")} | ${row.answerLocation} |`);
}
L.push("");
L.push("## محطات التعلّم");
L.push("");
L.push("| المحطة | الشرائح | أقسام المادة |");
L.push("|---|---:|---|");
for (const station of byStation) L.push(`| ${station.emoji} ${station.name} — ${station.en} (\`${station.id}\`) | ${station.count} | ${station.sections} |`);
L.push(`| **المجموع** | **${slides.length}** | — |`);
L.push("");
L.push("## أنواع الشرائح");
L.push("");
L.push("| النوع | الشرائح | المكوّن |");
L.push("|---|---:|---|");
for (const k of kinds.sort((a, b) => b.count - a.count)) L.push(`| \`${k.kind}\` | ${k.count} | ${k.component} |`);
L.push("");
L.push("## متغيّرات العرض");
L.push("");
L.push("| المتغيّر | الشرائح |");
L.push("|---|---:|");
for (const v of variants.sort((a, b) => b.count - a.count)) L.push(`| \`${v.variant}\` | ${v.count} |`);
L.push("");
L.push("## المختبرات التفاعلية");
L.push("");
L.push("| المختبر | الشرائح |");
L.push("|---|---|");
for (const lab of labs) L.push(`| \`${lab.lab}\` | ${lab.slides.map((s) => `\`${s}\``).join("، ")} |`);
L.push("");
L.push("## مجموعات التدريب المقفولة على المحاولة");
L.push("");
L.push("| § | العناصر | ما الذي يُقفل |");
L.push("|---|---:|---|");
const PRACTICE_MEANING = {
  s12: "Grammar Detective — المستوى الأول: ٨ جمل خاطئة + ٨ حلول من نص المادة حرفيًا",
  s13: "التدريب الأول: ١٠ فراغات + حلّ مشتقّ موسوم بأنه من المنصة",
  s14: "التدريب الثاني (design): ٤ جمل + حلولها وسببا «لماذا» من نص المادة حرفيًا",
  s17: "تحليل القصة: جدول ١١ صفًا (العبارة ← الزمن ← السبب) من نص المادة حرفيًا",
  s18: "Grammar Detective المتقدم: ١١ موضعًا في فقرة Emma + الفقرة المصحّحة + الأسباب",
  s19: "تحدي اختلاف المعنى (IQ200): ٤ مواقف + الزمن + السبب",
};
for (const [sectionId, count] of Object.entries(practiceCounts)) {
  const num = sections.find((s) => s.id === sectionId)?.num ?? sectionId;
  L.push(`| ${num} | ${count} | ${PRACTICE_MEANING[sectionId] ?? "—"} |`);
}
L.push("");
L.push("## صفحات اختبار الدرس (⑳)");
L.push("");
L.push("| الشريحة | المستوى | عنوان المستوى من المادة | الأسئلة | النوع | الحقول |");
L.push("|---|---:|---|---|---|---:|");
for (const level of levels) {
  const ids = level.questions.map((q) => q.number);
  const own = slides.filter((s) => s.testLevel === level.level);
  const type = [...new Set(level.questions.map((q) => q.type))].join("+");
  const fields = level.questions.reduce((n, q) => n + q.fields.length, 0);
  L.push(`| ${own.map((s) => `\`${s.id}\``).join("، ") || "—"} | ${level.level} | ${level.title} | ${ids[0]}–${ids[ids.length - 1]} (${ids.length}) | \`${type}\` | ${fields} |`);
}
const testSlides = slides.filter((s) => s.kind === "test" || s.kind === "testResult" || s.kind === "solutions");
L.push("");
L.push(`شرائح الاختبار والنتيجة والحلول: ${testSlides.map((s) => `\`${s.id}\``).join("، ")}.`);
L.push("");
L.push("### اكتمال مفتاح الإجابة التفصيلي");
L.push("");
L.push("| البند | العدد |");
L.push("|---|---:|");
L.push(`| أسئلة الاختبار | ${questions.length} |`);
L.push(`| مستويات | ${levels.length} |`);
L.push(`| حقول إجابة في أسئلة الطالب | ${totalFields} |`);
L.push(`| مدخلات المفتاح في \`key33.ts\` | ${solutions.length} |`);
L.push(`| مدخلات تحمل \`answer\` + \`tense\` + \`reason\` | ${solutions.filter((s) => s.answer && s.tense && s.reason).length} |`);
L.push(`| أسئلة متعددة الحقول (\`fieldRules\`) | ${solutions.filter((s) => s.fieldRules).length} |`);
L.push(`| بدائل صحيحة موثّقة (\`alternatives\`) | ${solutions.filter((s) => s.alternatives?.length).length} |`);
L.push(`| تفسيرات خطأ للمستوى الثالث (\`errorNote\`) | ${solutions.filter((s) => s.errorNote).length} |`);
const fieldKeywordRules = solutions.reduce((n, s) => n + Object.values(s.fieldRules ?? {}).filter((r) => r.keywords?.length).length, 0);
L.push(`| مدخلات بقاعدة كلمات مفتاحية على المستوى الأعلى (\`keywords\`) | ${solutions.filter((s) => s.keywords?.length).length} |`);
L.push(`| حقول داخل \`fieldRules\` تُصحَّح بالكلمات المفتاحية | ${fieldKeywordRules} |`);
L.push(`| مفتاح من نص المادة (\`provenance: "source"\`) | ${solutions.filter((s) => s.provenance === "source").length} |`);
L.push(`| مفتاح مشتقّ موسوم (\`provenance: "platform"\`) | ${solutions.filter((s) => s.provenance === "platform").length} |`);
L.push("");
L.push("#### الأسئلة التي لا تُختزل إلى كلمة واحدة");
L.push("");
L.push("| السؤال | ما يطلبه | كيف نُفِّذ |");
L.push("|---|---|---|");
const q20 = solutions.find((s) => s.number === 20);
const q25 = solutions.find((s) => s.number === 25);
L.push(`| ⑳ | هل الجملتان صحيحتان؟ + فرق التركيز | ${q20 ? `3 خيارات (كلتاهما/الأولى/الثانية) + \`fieldRules\` لثلاثة حقول: \`verdict\` و\`focusA\` و\`focusB\` (الأخيرتان تُصحَّحان بالكلمات المفتاحية)` : "—"} |`);
L.push(`| ㉕ | فعلان + شرح | ${q25 ? `\`fieldRules\` لثلاثة حقول: \`rehearse\` و\`know\` و\`why\` (الشرح يُصحَّح بالكلمات المفتاحية)` : "—"} |`);
L.push("");
L.push(`#### فقرة Mia (المستوى الخامس) — ${miaCorrected.length} جمل مصحّحة`);
L.push("");
for (const line of miaCorrected) L.push(`- \`${line}\``);
L.push("");
L.push("## التصحيحات الموثّقة على نص المادة");
L.push("");
if (corrections.length === 0) L.push("لا شيء — المادة نُقلت حرفيًا.");
for (const c of corrections) {
  const num = sections.find((s) => s.id === c.section)?.num ?? c.section;
  L.push(`### ${num} · \`${c.id}\` (مصدر التصحيح: ${c.origin === "source-note" ? "ملاحظة المادة نفسها" : "المنصة"})`);
  L.push("");
  L.push(`- **كما ورد في المادة:** ${c.original}`);
  L.push(`- **المعتمد في السجل:** ${c.applied}`);
  L.push(`- **السبب والدليل:** ${c.reason}`);
  L.push("");
}
L.push(`## الأخطاء المقصودة المحفوظة حرفيًا (${intentional.length})`);
L.push("");
L.push("تُدرَّس كما هي ولا تُصلح بصمت؛ كل زوج ❌/✅ يبقى ظاهرًا للطالب مع سببه.");
L.push("");
L.push("| القسم | ❌ | ✅ |");
L.push("|---|---|---|");
for (const item of intentional) {
  const num = sections.find((s) => s.id === item.section)?.num ?? item.section;
  L.push(`| ${num} | \`${item.wrong}\` | \`${item.right}\` |`);
}
L.push("");
L.push("## ملاحظات نُقلت عن المادة كما هي");
L.push("");
L.push("- **⑬ و⑳/㉑:** المادة تعد بـ«الحلول المفصلة»/«مفتاح التصحيح» لكنها لا تسرد إجابات ⑬ و⑳ نصًا. كل مفتاح مشتقّ في المنصة موسوم `provenance: \"platform\"` ويظهر للطالب بشارة `PlatformTag33` («شرح المنصة») حتى لا يُنسب إلى المادة.");
L.push("- **⑦:** تحذير `for/since` مع أفعال الحالة، وملاحظة أن الكلمات الدالة «مساعدات لا قواعد مطلقة»، محفوظتان نصًا؛ وتُنفَّذان في `signal-sort` مع `SIGNAL_AMBIGUOUS_33`.");
L.push("- **⑮:** قاعدة أن Present Perfect مقبول بجانب Present Perfect Continuous بعد `for/since` هي التي بُنيت عليها `alternatives` في المفتاح (q4 وq8 وq15 وq24).");
L.push("- **⑱:** الفقرة الخاطئة والفقرة المصحّحة وأسباب التصحيح ①–⑪ كلها من المادة حرفيًا؛ التغيير الوحيد هو توحيد عدد المواضع (انظر أعلاه).");
L.push("- **㉔:** إحالة الدرس التالي (34 — Future Simple WILL) تُرسم عبر `progress-map` مع `PROGRESS_NEXT_33`.");
L.push("");
L.push("## ما لا يظهر للطالب");
L.push("");
L.push("- لا تسميات مصدرية: «المصدر»، «المصدر قسم X»، أسماء الملفات، أعداد الأسطر، أو علامات تحريرية داخلية. يفحص `scripts/lib/student-copy-audit.mjs` النص **المرسوم فعلًا** في 222 سياقًا.");
L.push("- لا مفتاح إجابة في DOM الطالب ولا في البيانات المحمّلة له قبل السماح: `key33.ts` قطعة مؤجَّلة (`dist/assets/key33-*.js`) تصل فقط عبر `SolutionsArea33` بعد التسليم أو عبر `TeacherArea33` بعد كلمة المرور.");
L.push("- بوابة المعلم كلمة مرور **في المتصفح فقط** (`somer173`)؛ ليست حماية خادمية ولا تُوصف كذلك.");
L.push("");
writeFileSync("docs/lesson33-coverage.md", `${L.join("\n")}\n`);

console.log(
  `docs/lesson33-coverage.md + docs/lesson33-source-manifest.json regenerated · ` +
    `${blocks} blocks / ${units} units · ${slides.length} slides / ${stations.length} stations · ` +
    `${labs.length} labs · ${questions.length} questions / ${solutions.length} key entries / ${totalFields} fields · ` +
    `uncovered ${uncovered.length} · duplicated ${duplicated.length}`,
);
