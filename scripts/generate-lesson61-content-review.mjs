// Rebuild the human-readable item ledger from the independently supplied source.
// Initial-status checks load the pre-audit PR commit; they do not infer source
// contents from the implementation snapshot. Run after audit-lesson61-source.mjs.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { readSource61, normalizeSource61 as norm, sourcePairs61, sourcePractices61, sourceExam61, sourceDialogue61, sourceReading61, sourceProcedures61, sourceWriting61, sourceSpeaking61, sourceDistinctions61, sourceBilingualTheory61, sourceWhVocabulary61, sourceSolved61 } from "./lib/lesson61-source.mjs";

const BASELINE = "6b2be0af953299ef9ea7e075d1b50b41289bb8b0";
async function loadText(text) {
  const js = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}
async function loadCurrent(path) { return loadText((await import("node:fs")).readFileSync(path, "utf8")); }
async function loadInitial(path) { return loadText(execFileSync("git", ["show", `${BASELINE}:${path}`], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 })); }
const [content, practice, oldContent, oldPractice] = await Promise.all([
  loadCurrent("src/lessons/lesson61/content61.ts"), loadCurrent("src/lessons/lesson61/practice61.ts"),
  loadInitial("src/lessons/lesson61/content61.ts"), loadInitial("src/lessons/lesson61/practice61.ts"),
]);
const source = readSource61(); const rows = []; const lines = [];
const complete = "COMPLETE", missing = "MISSING", partial = "PARTIALLY PRESERVED", altered = "ALTERED", corrected = "CORRECTED WITH DOCUMENTED REASON";
function esc(value) { return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, "<br>"); }
function add(ref, original, initial, before, after, note, final = complete) { rows.push({ ref, original, initial, before, after, note, final }); }
let cursor = 0;
function flush() {
  if (cursor === rows.length) return;
  lines.push("| المصدر / الموضع | النص أو المثال أو السؤال الأصلي | الحالة الأولية والموقع | الموقع النهائي والحفاظ / الإصلاح | الحالة النهائية |", "|---|---|---|---|---|");
  for (const row of rows.slice(cursor)) lines.push(`| ${esc(row.ref)} | ${esc(row.original)} | ${row.initial} — ${esc(row.before)} | ${esc(row.after)}<br>${esc(row.note)} | ${row.final} |`);
  cursor = rows.length;
}
function flatten(value, path = "") {
  if (typeof value === "string") return [{ path, value }];
  if (Array.isArray(value)) return value.flatMap((item, i) => flatten(item, `${path}[${i}]`));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => flatten(item, path ? `${path}.${key}` : key));
  return [];
}
function matching(value, sought) { const needle = norm(sought); return flatten(value).find((item) => needle && norm(item.value).includes(needle)); }
const same = (a, b) => norm(a ?? "") === norm(b ?? "");
const theoryScope = (module, section) => ({ THEORY_61: module.THEORY_61.map((entry) => entry.section === section ? entry : null) });
const sceneByLine = [
  [1, 42, "bridge"], [43, 83, "yes-intro"], [84, 119, "yes-rule"], [120, 169, "yes-be"], [170, 253, "yes-do"], [254, 281, "yes-perfect"], [282, 322, "yes-modals"], [323, 352, "if-whether"],
  [353, 388, "wh-intro"], [389, 430, "wh-order"], [431, 467, "wh-where"], [468, 504, "wh-what"], [505, 561, "wh-how"], [562, 615, "wh-subject"],
  [616, 698, "command"], [699, 756, "ordered-instructed"], [757, 809, "negative-command"], [810, 876, "warning-advice"], [877, 968, "request"], [969, 996, "negative-request"], [997, 1069, "suggestions"], [1070, 1199, "say-tell-ask"],
];
function sceneAt(line) { return sceneByLine.find(([a, b]) => line >= a && line <= b)?.[2] ?? "bridge"; }
function scenePath(module, scene) { const i = module.THEORY_61.findIndex((entry) => entry.id === scene); return `content61.ts:THEORY_61[${i}] / ${scene}`; }
function findPairs(value, path = "") {
  if (Array.isArray(value)) return value.flatMap((item, i) => findPairs(item, `${path}[${i}]`));
  if (!value || typeof value !== "object") return [];
  const own = [];
  if (typeof value.direct === "string" && typeof (value.reported ?? value.result) === "string") own.push({ direct: value.direct, reported: value.reported ?? value.result, ar: value.ar ?? "", directAr: value.directAr ?? "", kind: value.kind ?? "", path });
  if (typeof value.wrong === "string" && typeof value.right === "string") own.push({ direct: value.wrong, reported: value.right, ar: "", directAr: "", path });
  return [...own, ...Object.entries(value).flatMap(([key, item]) => findPairs(item, path ? `${path}.${key}` : key))];
}
function relevantContent(module, section) {
  if (section <= 6) return theoryScope(module, section);
  if (section === 7) return { ERRORS_61: module.ERRORS_61 };
  if (section === 8) return { PROCEDURES_61: module.PROCEDURES_61 };
  if (section === 9) return { SOLVED_61: module.SOLVED_61 };
  return {};
}
function pairMatch(module, pair) { return findPairs(relevantContent(module, pair.section)).find((entry) => same(entry.direct, pair.direct) && same(entry.reported, pair.reported)); }
function findBilingual(value, path = "") {
  if (Array.isArray(value)) return value.flatMap((item, i) => findBilingual(item, `${path}[${i}]`));
  if (!value || typeof value !== "object") return [];
  const own = [];
  if (typeof value.en === "string" && typeof value.ar === "string") own.push({ en: value.en, ar: value.ar, path });
  if (typeof value.direct === "string" && typeof value.directAr === "string") own.push({ en: value.direct, ar: value.directAr, path });
  if (typeof value.reported === "string" && typeof value.ar === "string") own.push({ en: value.reported, ar: value.ar, path });
  if (typeof value.text === "string") own.push({ en: value.text, ar: value.text, path });
  return [...own, ...Object.entries(value).flatMap(([key, item]) => findBilingual(item, path ? `${path}.${key}` : key))];
}
function bilingualMatch(module, item) {
  return findBilingual(theoryScope(module, item.section)).find((entry) => norm(entry.en).includes(norm(item.en)) && norm(entry.ar).includes(norm(item.ar)));
}

// Manually reviewed Arabic paraphrases. Each anchor points to actual displayed
// text in the indicated scene; absent anchors fail generation instead of being
// automatically labelled COMPLETE. WH glosses and standalone translations get
// their own bilingual, positional rows below.
const arabicAnchors = {
  11: ["في الدرس السابق 60 تعلمنا كيفية نقل الجمل الخبرية"],
  21: ["سنكمل الموضوع بنقل الأسئلة والأوامر والتعليمات والطلبات والنصائح والتحذيرات"],
  23: ["سنكمل الموضوع بنقل الأسئلة"], 25: ["الأوامر والتعليمات"], 27: ["الطلبات والنصائح والتحذيرات"],
  31: ["لا نحتفظ بترتيب السؤال المباشر", "نحوله إلى ترتيب جملة خبرية"], 41: ["اختفت do وجاء الفاعل قبل الفعل"],
  45: ["أسئلة إجابتها نعم أو لا"], 49: ["يمكن أن تكون إجابتها Yes = نعم أو No = لا"],
  51: ["Yes = نعم"], 53: ["No = لا"],
  72: ["لا تبدأ بأداة سؤال مثل What أو Where أو Why", "تبدأ غالبًا بفعل مساعد"],
  74: ["في نقل هذه الأسئلة نستخدم if"], 82: ["الكلمتان متقاربتان في هذا التركيب"],
  118: ["تغير فعل be من المضارع البسيط إلى الماضي البسيط", "الرجوع الزمني الذي تعلمناه في الدرس 60"],
  122: ["يتغير فعل be حسب الفاعل والزمن"], 126: ["am / is / are → was / were"],
  168: ["السؤال الأصلي في الماضي", "أصبح Past Perfect عند تطبيق الرجوع الزمني"],
  172: ["هذه نقطة مهمة"],
  174: ["السؤال المباشر do أو does أو did في المضارع أو الماضي البسيط", "تختفي هذه المساعدات في التحويل الأساسي"],
  178: ["لأن الجملة التابعة خبرية لا سؤال مباشر"],
  196: ["Do حُذفت"], 198: ["you أصبحت I"], 206: ["قد تستعمل did للتوكيد في سياقات خاصة"],
  221: ["Does حُذفت"], 242: ["Did حُذفت"],
  246: ["you أصبحت he لأن المخاطَب Tom"], 250: ["لا تنتقل Do / Does / Did عادةً بوصفها أفعالًا مساعدة مستقلة"],
  252: ["نضبط الفعل الأساسي والزمن بحسب السياق"], 284: ["can → could", "عند تطبيق الرجوع الزمني المعتاد"],
  321: ["اختيار الضمير يعتمد على من قال الجملة ومن كان المخاطَب"], 336: ["يفضّل whether في هذا المثال مع or not"],
  349: ["He asked me whether or not I was coming."],
  355: ["أسئلة WH تبدأ بأداة استفهام"], 359: ["أسئلة WH تبدأ بأداة استفهام"],
  385: ["نحتفظ بالأداة نفسها عندما ننقل السؤال"], 387: ["ولا نضيف if أو whether إليها"],
  413: ["Where + do + you + live?", "ترتيب السؤال المباشر"], 417: ["where + I + lived.", "ترتيب الجملة الخبرية"],
  466: ["اختفت did وأصبحت left هي had left"], 503: ["أصبحت this هي that", "whose bag that was"],
  564: ["هذه حالة مهمة"], 566: ["في معظم الأسئلة نحتاج إلى إعادة ترتيب الكلمات"],
  568: ["أحيانًا تكون Who أو What هي الفاعل نفسه", "لا نضيف فاعلًا آخر بعدها بلا سبب"],
  584: ["لا نقول He asked who he had broken the window?"], 588: ["Who هي من قام بفعل الكسر", "لا نضيف فاعلًا آخر بعدها بلا سبب"],
  618: ["الأمر جملة يطلب فيها شخص من شخص آخر أن يفعل شيئًا"], 622: ["الأمر جملة يطلب فيها شخص من شخص آخر أن يفعل شيئًا"],
  638: ["told + object + to + infinitive"], 729: ["يقدّم شخص إرشادات لتنفيذ عمل نستخدم instructed"],
  759: ["من Don't إلى not to", "Subject + told + object + not to + base verb"],
  838: ["يمكن استعمال warned + object + about + noun"], 871: ["عند النهي عن شيء في النصيحة"],
  879: ["الأولى تنقل طلب المساعدة"], 883: ["الأمر عادةً مباشر وحازم"], 889: ["أما الطلب فأكثر تهذيبًا وغالبًا يستخدم"],
  906: ["عندما يكون المقصود طلب تنفيذ الفعل", "الثانية تنقل السؤال عن القدرة أو إمكانية المساعدة"],
  921: ["He asked me if I could help him.", "الأولى تنقل طلب المساعدة"], 925: ["الثانية تنقل السؤال عن القدرة أو إمكانية المساعدة"],
  927: ["He asked me to help him.", "الأولى تنقل طلب المساعدة"], 929: ["السياق يحدد المقصود"],
  999: ["الاقتراح لا يساوي الأمر"], 1001: ["الاقتراح فكرة، وليس أمرًا مباشرًا أو طلبًا من شخص أن ينفذ شيئًا بمفرده بالضرورة"],
  1003: ["suggested + verb-ing"], 1022: ["He suggested that we should go to the park."],
  1050: ["صيغة غير صحيحة في الإنجليزية القياسية"], 1064: ["She suggested studying.", "She advised me to study."],
  1066: ["She suggested studying.", "اقترحت الدراسة."], 1068: ["She advised me to study.", "نصحتني بالدراسة."],
  1072: ["Say تنقل الكلام أو المعلومة", "tell تذكر غالبًا الشخص المتلقي", "ask تنقل الأسئلة والطلبات"],
  1076: ["Say تنقل الكلام أو المعلومة"], 1088: ["عند ذكر الشخص الذي وُجّه إليه الكلام مع say", "نستخدم عادةً to قبل هذا الشخص"],
  1100: ["tell تذكر غالبًا الشخص المتلقي", "tell + someone + that + sentence"],
  1112: ["في الأوامر نستخدم to"], 1122: ["في النواهي نستخدم not to"],
  1134: ["لا نقول عادةً He told that he was tired"], 1138: ["لأن tell تحتاج غالبًا إلى الشخص المتلقي"],
  1146: ["ask تنقل الأسئلة والطلبات"], 1148: ["ask + if / whether + sentence"],
  1158: ["في أسئلة WH نحتفظ بأداة السؤال"], 1168: ["في الطلبات نستخدم to"],
};
const clarifiedArabic = new Map([
  [172, "التأكيد على أهمية القاعدة أُعيد في المشهد نفسه؛ كانت القاعدة موجودة."],
  [564, "أُعيد التأكيد على أهمية حالة فاعل WH؛ كانت الأمثلة موجودة."],
  [566, "أُعيد التصريح بأن معظم الأسئلة تحتاج إعادة ترتيب قبل استثناء فاعل WH؛ كان الترتيب مشروحًا في wh-order."],
  [871, "أُعيد التصريح بسياق النهي في النصيحة وصيغته؛ كان المثال وترجمته موجودين."],
  [1088, "أُعيد الربط الصريح بين ذكر المتلقي وto مع say؛ كانت الصيغة والمثال موجودين."],
  [1112, "أُعيد وسم صيغة tell الموجبة بأنها للأوامر؛ كانت الصيغة والمثال مدمجين."],
  [1122, "أُعيد وسم صيغة tell المنفية بأنها للنواهي؛ كانت الصيغة والمثال مدمجين."],
  [1158, "أُعيد وسم صيغة ask الخاصة بأسئلة WH؛ كانت الصيغة والمثال مدمجين."],
  [1168, "أُعيد وسم صيغة ask الخاصة بالطلبات؛ كانت الصيغة والمثال مدمجين."],
]);

lines.push(`# Lesson 61 — سجل مطابقة المصدر الأصلي`, "",
  `## المصدر والمنهج`, "",
  `المصدر المستقل هو المرفق الكامل المحفوظ دون تعديل في [lesson61-source.md](lesson61-source.md)، وبصمته \`${source.hash}\`. يحتوي على 2529 سطرًا و2528 محرف انتقال سطر، دون محرف انتقال بعد السياج الأخير؛ قُرئ حتى آخر فرق وعلامة إغلاق السياج. الحالة الأولية مأخوذة من PR عند الالتزام \`${BASELINE}\`، لا من لقطة التنفيذ. قورنت نسخة المستودع بايتًا بالمرفق، وشُغّل التدقيق أيضًا على المرفق مباشرةً بواسطة \`node scripts/audit-lesson61-source.mjs --source <مسار المرفق>\`؛ لقطة \`scripts/fixtures/lesson61-content-snapshot.json\` فحص انجراف لاحق فقط.`, "",
  `**معنى الحالات المسموح بها:** \`COMPLETE\` = الوحدة ومعناها وعمقها وترجمتها المصدرية حاضرة؛ قد تعاد صياغة الشرح العربي دون تغيير المعنى. \`MISSING\` = لم توجد الوحدة. \`PARTIALLY PRESERVED\` = وُجد الأصل لكن تفصيله أو صياغته أو بنيته لم تكن كلها ظاهرة. \`ALTERED\` = تغير بند أو مخاطَب أو عدد عن الأصل. \`CORRECTED WITH DOCUMENTED REASON\` = استُعيد نص الأصل أو أُضيف تصحيح/احتمال سياقي موضح؛ لا يعني أن الأصل حُذف. عمود البداية يصف ما كان موجودًا قبل هذه المراجعة، والأخير يصف الحالة بعد الإصلاح.`, "",
  `**طريقة الجرد:** جردت الأسطر العربية التفسيرية، والعناصر الإنجليزية المستقلة، والأزواج المصدرية، ثم كل خطوة وحوار وسؤال وترجمة ومفتاح على حدة. قد يظهر المفهوم نفسه في أكثر من صف لأن المصدر يكرره؛ عدد الصفوف ليس عدد أسئلة جديدة. أُزيل الترقيم الدائري في الواجهة فقط، ولم يُعدّل ملف المصدر. تفاصيل الفحوص والقيود في [lesson61-verification.md](lesson61-verification.md).`, "",
  `## خريطة الأقسام — ليست بديلًا عن الصفوف التفصيلية`, "",
  `| القسم والأسطر | المحتوى والوصول |`, `|---|---|`);
const sectionSummaries = [
  "الجسر من الدرس 60 وترتيب الجملة — bridge", "Yes/No: التعريف، if/whether، be، do، perfect، modals — yes-*", "WH والأدوات والفاعل — wh-*", "الأوامر والتعليمات والنهي والتحذير والنصيحة — command / warning-advice", "الطلب والقدرة والطلب المنفي — request / negative-request", "الاقتراح والتمييز عن النصيحة — suggestions", "Say / Tell / Ask والمقارنة الخماسية — say-tell-ask", "7 قواعد مع أمثلتها — errors", "4 مسارات و20 خطوة — procedures", "8 أمثلة محلولة — solved", "الحوار وترجمته و6 ملاحظات — dialogue", "A School Visit وترجمتها و7 أسئلة — reading / comprehension", "8 تدريبات: 6/6/6/6/8/8/8/1 — practice-*", "25 سؤالًا ومفتاحها الأصلي — original-*", "الكتابة، 7 متطلبات ونموذج كامل — writing", "التحدث، 5 أسئلة و3 أمثلة — speaking", "8 تراكيب و9 فروق — summary",
];
for (let i = 0; i <= 16; i++) { const section = source.sections[i]; const first = section.find((line) => line.text)?.line; const last = [...section].reverse().find((line) => line.text)?.line; lines.push(`| ${i === 0 ? "المقدمة" : i} · ${first}–${last} | ${sectionSummaries[i]} |`); }
lines.push("", `## التوضيحات والإصلاحات التعليمية المحددة`, "",
  `1. **ضمير المعلم وMay**: نموذج المصدر \`The teacher asked us whether he might use our dictionary.\` أُبقي مع ترجمته؛ \`he\` لا يثبت جنس المعلم في السؤال الإنجليزي. أضفنا \`they might\` للمفرد، وبيّنا أن \`she\` ممكن إذا عُرف الجنس وأن المقصود طلب إذن. الرجوع الزمني والضمائر مرتبطان بالسياق.`,
  `2. **نهاية حوار آدم**: غيّر التنفيذ الأول \`told the students ... their classmates\` إلى \`told him ... his classmates\` وجعل الملاحظة السادسة \`him\`. أعدنا جملة المصدر وترجمتها و\`told them\` حرفيًا. إذا ظل المعلم يخاطب آدم وحده فبديل \`told him ... his classmates\` أوضح؛ وإذا خاطب المجموعة فصيغة المصدر ممكنة. لم نفرض أحد الاحتمالين دون سياق.`,
  `3. **التدريب الثامن**: الأصل بند فقرة واحدة يتضمن 7 جمل، لا 7 أسئلة مستقلة. أصبح بندًا واحدًا ومسودة واحدة وقائمة تغطية، ويظهر نموذج المصدر بستة مقاطع وترجماته بعد المحاولة؛ لا يُدّعى التصحيح الآلي لفقرة حرة. \`if\` الأخيرة شرطية وليست أداة سؤال. يستخدم نموذج المصدر \`he\`؛ لا نفرضه خارج سياقه.`,
  `4. **المفاتيح والتفسيرات**: أُعيد اللفظ الأصلي للشروح في تدريب 5 وأسئلة الاختبار 13 و14 و21–25 وفي مواضع من تدريبات 1 و2 و6؛ كان كثير منها حاضرًا بصياغة مكافئة، لا مفقود المعنى. أُعيدت صيغتا النهي التفسيريتان وملاحظة تدريب 3 الجماعية نصيًا. بقيت الإجابات والخيارات الأصلية دون استبدال؛ تعرض مفاتيح الاختيار نقطة المصدر النهائية دون تغيير الخيار القابل للاختيار. يفحص التدقيق المستقل المفتاح المعروض والمفتاح المستخدم فعليًا للتصحيح.`,
  `5. **إجابات متعددة صحيحة**: تدريب 5 سؤال 2 يحتفظ \`A. was\` ويقبل \`B. am\` إذا بقيت الجاهزية وكان الرجوع اختياريًا؛ سؤال الاختبار 22 يحتفظ \`B. had\` ويقبل \`A. have\` عند بقاء النتيجة. تدريب 5 سؤال 4 يحتفظ \`C. not to\` ويقبل \`B. to not\`، واختبار 24 يحتفظ \`B. not to\` ويقبل \`C. to not\`: كلا موضعي النفي صحيح قياسيًا، مع بقاء مفتاح المصدر.`,
  `6. **صياغات بديلة**: تدريب 6 سؤال 7 يحتفظ \`advised her to get more rest\` ويقبل إصلاحًا أقل تغييرًا \`advised her to take more rest\`. في تدريب 2 سؤال 6 يبقى \`He asked ...\` مفتاح المصدر ويُقبل \`The man asked ...\`. كما تبقى \`ordered/warned\` بحسب الحزم والتحذير، مع قبول \`told\` عندما لا يفترض السياق هذين المعنيين.`,
  `7. **القصد والمرجع**: \`asked me to help him\` ينقل طلب الفعل؛ \`asked me if I could help him\` ينقل السؤال عن الإمكانية، ويحدد السياق المعنى. تغيير \`here/there\` و\`this/that\` و\`tomorrow/the following day\` والرجوع الزمني ليس آليًا. صيغة \`whether or not\` المتجاورة تختلف عن استعمال \`if ... or not\` في آخر الجملة.`,
  `8. **القراءة والكتابة**: في القطعة قد يلتبس \`he\` بين المرشد والطالب؛ إجابة المصدر تفهم الطالب طالبًا الإذن وتُذكر هذه القراءة صراحة. نموذج الكتابة يحفظ سؤال القاموس كما هو، مع تنبيه إلى أن فهمه طلب إذن مهذبًا سياقي واقتراح مثال طلب صريح اختياري.`,
  `9. **علامة السؤال**: تقرير المصدر الخبري ينتهي بنقطة؛ أُضيف أن الجملة الرئيسية إذا كانت سؤالًا حقيقيًا قد تنتهي بعلامة استفهام. وقد قُبلت الصيغ السياقية المذكورة دون اعتبار القوائم مصححًا دلاليًا شاملًا.`,
  `10. **تفاصيل عربية وتسميات الأمثلة**: أُعيد إبراز أهمية حذف do وحالة فاعل WH، والتصريح بأن معظم الأسئلة تحتاج إعادة ترتيب قبل استثناء الفاعل، وشرح النهي في النصيحة، واستعمال to عند ذكر المتلقي مع say. أُعيد التصريح باختلاف صيغة tell في الأوامر والنواهي وصيغة ask في WH والطلبات. كانت الأمثلة أو الصيغ ذات الصلة موجودة سابقًا. أُعيدت أيضًا تسميات الأنواع الثمانية فوق الأمثلة المحلولة وخلاصة الحوار التي تجمع الأسئلة والأوامر والنواهي.`,
  `11. **ترتيب المحاولة والحل**: كان التنفيذ يعرض نموذج كل بند بمجرد محاولته، مع أن المصدر يطلب محاولة المجموعة أولًا ومحاولة الاختبار كله قبل مفتاحه. تظهر الآن التعليمات الأصلية، وتؤجل حلول كل مجموعة حتى محاولتها كاملة، ومفاتيح اختبار الـ25 حتى محاولة جميع أسئلته. اختبار FinalTest المشترك مستقل ولا يكشف التصحيح قبل الإرسال.`, "");

// Arabic instructional statements in the opening and source sections 1–6.
lines.push("## الشرح العربي الأصلي: كل عبارة تعليمية وموقعها", "", "توضح كل خانة حقل التنفيذ الفعلي والنص الذي يشهد على المعنى. الصيغ غير الحرفية راجعناها يدويًا على مستوى الفكرة؛ لا يُستدل على المحتوى من اسم المشهد وحده. المفردات والترجمات المتجاورة مدرجة في الجدول الثنائي التالي.", "");
const glossLines = new Set(sourceWhVocabulary61(source).map((item) => item.line));
const oldCover = execFileSync("git", ["show", `${BASELINE}:src/lessons/lesson61/Lesson61.tsx`], { encoding: "utf8" });
const newCover = readFileSync("src/lessons/lesson61/Lesson61.tsx", "utf8");
if (![oldCover, newCover].every((jsx) => /Reported<br\s*\/>\s*<em>Questions<\/em><br\s*\/>\s*&amp; Commands/.test(jsx))) throw new Error("Original English cover title is missing");
add("0 · L7", source.lines[6].text, complete, "Lesson61.tsx:Cover61 > h1", "Lesson61.tsx:Cover61 > h1", "العنوان الإنجليزي الأصلي ظاهر مع فواصل أسطر للعرض فقط.");
const baselineFallback = {
  172: ["عندما يستخدم السؤال المباشر do أو does أو did"],
  564: ["أحيانًا تكون Who أو What هي الفاعل نفسه"], 566: ["أحيانًا تكون Who أو What هي الفاعل نفسه"],
  638: ["Subject + told + object + to + base verb"],
  871: ["My doctor advised me not to eat too much sugar.", "نصحني طبيبي بألا أتناول الكثير من السكر"],
  1088: ["say + something + to + someone", "He said to me that he was tired."],
  1112: ["tell + someone + (not) to + verb"], 1122: ["tell + someone + (not) to + verb"],
  1158: ["ask + WH-word + sentence"], 1168: ["ask + someone + to + verb"],
};
// Short meaningful notes are reviewed too; purely structural labels such as
// "مثال" and "أو" do not require standalone semantic classifications.
const shortInstructionLines = new Set([51, 53, 196, 198, 221, 242, 423, 879, 1112, 1122, 1158, 1168]);
function fieldEvidence(module, scene, matches) {
  const index = module.THEORY_61.findIndex((entry) => entry.id === scene);
  const unique = [...new Map(matches.map((entry) => [entry.path, entry])).values()];
  return unique.map((entry) => `content61.ts:THEORY_61[${index}].${entry.path} / ${scene}: «${entry.value}»`).join("<br>");
}
for (let section = 0; section <= 6; section++) {
  const values = source.sections[section];
  for (let i = 0; i < values.length; i++) {
    const line = values[i]; let text = line.text.replace(/^[①-⑳]\s*/u, "");
    if (!/[\u0600-\u06ff]/u.test(text) || (text.length < 13 && !shortInstructionLines.has(line.line)) || /^القسم\s/.test(text) || /^\d+\.\s/.test(text) || glossLines.has(line.line)) continue;
    if (/^(الترجمة:?|التحويل:?|الصحيح:?|خطأ شائع جدًا:|لاحظ التغييرات:|أهم فكرة في هذا الدرس:|قاعدة مهمة جدًا:|ملاحظة:|تذكر:|انتبه:|لماذا؟|إذن:|التركيب:|أي:|أمثلة:|مثال:|مثال آخر:|مثال أول:|مثال ثانٍ:|مثال ثالث:|لا نكتب:|لا تقل:|لاحظ:|السبب:)$/u.test(text)) continue;
    // Labelled example translations are individually attached to their pair rows below.
    const previous = [...values.slice(0, i)].reverse().find((entry) => entry.text)?.text;
    if (previous === "الترجمة:") continue;
    if (line.line === 9) {
      if (!oldCover.includes(text) || !newCover.includes(text)) throw new Error("Arabic source title is missing from Cover61");
      add(`0 · L9`, text, complete, `Lesson61.tsx:Cover61 > h2: «${text}»`, `Lesson61.tsx:Cover61 > h2: «${text}»`, "عنوان الغلاف العربي الأصلي محفوظ.");
      continue;
    }
    const scene = sceneAt(line.line); const initialScene = oldContent.THEORY_61.find((entry) => entry.id === scene); const finalScene = content.THEORY_61.find((entry) => entry.id === scene);
    const anchors = arabicAnchors[line.line] ?? [text];
    const after = anchors.map((anchor) => matching(finalScene, anchor));
    if (after.some((entry) => !entry)) throw new Error(`No reviewed final Arabic evidence for L${line.line}: ${text}`);
    let before = anchors.map((anchor) => matching(initialScene, anchor));
    const initiallyPartial = before.some((entry) => !entry);
    if (initiallyPartial) {
      const fallback = baselineFallback[line.line];
      if (!fallback) throw new Error(`No reviewed baseline Arabic evidence for L${line.line}: ${text}`);
      before = fallback.map((anchor) => matching(initialScene, anchor));
      if (before.some((entry) => !entry)) throw new Error(`Baseline fallback missing for L${line.line}`);
    }
    const changed = initiallyPartial || line.line === 321;
    const note = clarifiedArabic.get(line.line) ?? (line.line === 638 ? "فُصل تركيب المصدر عن الصيغة المكافئة الأطول الموجودة سابقًا." : line.line === 321 ? "أُضيف توضيح جنس المتحدث وصيغة they دون حذف نموذج he." : "العبارة أو معناها محفوظ؛ الدليل المعروض أعلاه يحدد اللفظ الفعلي، لا العنوان فقط.");
    add(`${section} · L${line.line}`, text, initiallyPartial ? partial : complete, fieldEvidence(oldContent, scene, before), fieldEvidence(content, scene, after), note, changed ? corrected : complete);
  }
}
flush();
lines.push("", "## الأمثلة الثنائية غير الموسومة ومفردات WH", "", "يضم كل صف اللفظ الإنجليزي وترجمته العربية المرتبطة به، بما فيها الأمثلة الخمسة للمقارنة وقائمة أدوات الاستفهام كاملة، حتى القصير منها الذي لا يظهر في جرد الأسطر الإنجليزية الطويلة.", "");
const bilingualTheory = sourceBilingualTheory61(source), whVocabulary = sourceWhVocabulary61(source);
if (bilingualTheory.length !== 28 || whVocabulary.length !== 12) throw new Error("Bilingual source inventory is incomplete");
for (const item of bilingualTheory) {
  const before = bilingualMatch(oldContent, item), after = bilingualMatch(content, item);
  if (!after) throw new Error(`Standalone bilingual example missing at source line ${item.line}`);
  add(`${item.section} · L${item.line}/${item.arLine}`, `${item.en}<br>${item.ar}`, before ? complete : missing,
    before ? `content61.ts:${before.path}` : "لم يُعثر على المثال مرتبطًا بترجمته", `content61.ts:${after.path}`,
    "العبارة وترجمتها ظاهرتان معًا؛ يحدد الحقل موضعهما الفعلي في المشهد.", before ? complete : corrected);
}
for (const item of whVocabulary) {
  const candidates = (module) => findBilingual(theoryScope(module, 2)).find((entry) => same(entry.en, item.en) && same(entry.ar, item.ar));
  const before = candidates(oldContent), after = candidates(content);
  if (!after) throw new Error(`WH vocabulary missing at source line ${item.line}`);
  add(`2 · L${item.line}`, `${item.en} = ${item.ar}`, before ? complete : missing,
    before ? `content61.ts:${before.path}` : "لم يُعثر على اللفظ مع ترجمته", `content61.ts:${after.path}`,
    "أداة السؤال وترجمتها المصدرية مقترنتان؛ يدقق اختبار المصدر ترتيبهما أيضًا.", before ? complete : corrected);
}
flush();
lines.push("", "## الصيغ والأمثلة الإنجليزية المستقلة في المقدمة والأقسام 1–6", "", "تتضمن الصفوف المفردات والصيغ والأسطر التي تتكرر ضمن الأزواج. تتبع كل حالة محتوى المصدر الفعلي لا عنوان القسم فقط.", "");
for (let section = 0; section <= 6; section++) {
  const values = source.sections[section];
  for (const line of values) {
    let text = line.text.replace(/^\d{1,2}\.\s+/, "").replace(/^[①-⑳]\s*/u, "");
    if (!/[A-Za-z]/.test(text) || /[\u0600-\u06ff]/u.test(text) || norm(text).length < 12 || /^(direct|reported) speech/u.test(norm(text)) || line.line === 7) continue;
    const before = matching(theoryScope(oldContent, section), text); const after = matching(theoryScope(content, section), text);
    if (!after) throw new Error(`No final location for source line ${line.line}: ${text}`);
    const scene = sceneAt(line.line); const addedFormula = !before;
    add(`${section} · L${line.line}`, text, addedFormula ? partial : complete, addedFormula ? `${scenePath(oldContent, scene)} (الصيغة مدمجة)` : `content61.ts:${before.path} / ${scene}`,
      `content61.ts:${after.path} / ${scene}`, addedFormula ? "فُصلت صيغة المصدر التي كانت مدمجة بصيغة مكافئة، دون حذف الشرح." : "النص الإنجليزي محفوظ؛ الترجمة المصدرية، إن وُجدت، مسجلة في صف الشرح أو الزوج.", addedFormula ? corrected : complete);
  }
}
flush();
lines.push("", "## كل زوج مباشر / منقول في المقدمة والأقسام 1–9", "", "يشمل كل صف الترجمة الموجودة في المصدر والارتباط بين طرفي المثال؛ لا يكفي وجود الجملتين في موضعين منفصلين.", "");
const solvedLabels = new Map(sourceSolved61(source).map((item) => [item.line, item]));
for (const pair of sourcePairs61(source)) {
  const before = pairMatch(oldContent, pair); const after = pairMatch(content, pair);
  if (!after) throw new Error(`Missing final pair at ${pair.line}`);
  const special = pair.direct.includes("May I use your dictionary?");
  const solved = solvedLabels.get(pair.line);
  if (solved && !same(after.kind, solved.label)) throw new Error(`Missing source concept label at ${solved.labelLine}`);
  const sourceLabelWasMissing = Boolean(solved && before && !same(before.kind, solved.label));
  const original = `${solved ? `نوع المثال: ${solved.label} · L${solved.labelLine}<br>` : ""}Direct: ${pair.direct}<br>Reported: ${pair.reported}${pair.directAr ? `<br>ترجمة المباشر: ${pair.directAr}` : ""}${pair.ar ? `<br>ترجمة المنقول: ${pair.ar}` : ""}`;
  const note = special ? "أصل he وترجمته محفوظان؛ they بديل محايد إذا لم يُعرف الجنس، وMay للاستئذان." : sourceLabelWasMissing ? "كان المثال وترجمته موجودين؛ أُعيد تصنيف المصدر الظاهر للسؤال/الأمر/النهي/الطلب/النصيحة/الاقتراح." : "المثال وطرفاه وترجمة المصدر محفوظة في البند نفسه.";
  add(`${pair.section} · L${pair.line}`, original, before ? (special || sourceLabelWasMissing ? partial : complete) : altered, before ? `content61.ts:${before.path}` : "الصياغة المصدرية لم تكن موجودة بهذا الترابط", `content61.ts:${after.path}`,
    note, special || !before || sourceLabelWasMissing ? corrected : complete);
}

const errorHeadings = [1202, 1213, 1224, 1232, 1240, 1248, 1260, 1270];
flush();
lines.push("", "## القواعد السبع والخطوات الأربع والأمثلة الثمانية", "");
for (let i = 0; i < 7; i++) {
  const raw = source.lines.filter((line) => line.line >= errorHeadings[i] && line.line < errorHeadings[i + 1] && line.text).map((line) => line.text).join(" / ");
  add(`7.${i + 1} · L${errorHeadings[i]}`, raw, complete, `content61.ts:ERRORS_61[${i}]`, `content61.ts:ERRORS_61[${i}]`, i === 6 ? "صيغة المصدر ونقطتها محفوظتان؛ أُضيف استثناء السؤال الرئيسي الحقيقي." : "الخطأ والتصحيح والسبب محفوظة؛ أضيف شرح حيث لم يذكر المصدر سببًا مفصلًا.", i === 6 ? corrected : complete);
}
for (const [i, proc] of sourceProcedures61(source).entries()) {
  add(`8.${i + 1} · L${proc.title.line}`, `المباشر: ${proc.direct.text}<br>النتيجة: ${proc.result.text}<br>الترجمة: ${proc.translation.text}`, complete, `content61.ts:PROCEDURES_61[${i}]`, `content61.ts:PROCEDURES_61[${i}]`, "الأصل والنتيجة والترجمة محفوظة.");
  for (const [j, step] of proc.steps.entries()) add(`8.${i + 1}.${j + 1} · L${step.line}`, step.parts.map((line) => line.text).join(" / "), complete, `content61.ts:PROCEDURES_61[${i}].steps[${j}]`, `content61.ts:PROCEDURES_61[${i}].steps[${j}]`, "خطوة المصدر ومعناها محفوظان؛ دمج بعض الشرح في السطر نفسه.");
}
// Section 9's eight worked examples are individually present in the 65 pair rows.

flush();
lines.push("", "## الحوار: كل دور وترجمة وملاحظة", "");
const dialogue = sourceDialogue61(source);
for (const key of ["direct", "reported"]) for (const [i, item] of dialogue[key].entries()) {
  const special = key === "reported" && i === 8;
  add(`10 · ${key} ${i + 1} · L${item.line}/${item.arLine}`, `${item.en}<br>${item.ar}`, special ? altered : complete, `content61.ts:DIALOGUE_61.${key}[${i}]`, `content61.ts:DIALOGUE_61.${key}[${i}]`, special ? "أُعيد students / their وترجمة المصدر؛ أضيف him / his كبديل إذا كان المخاطَب آدم وحده." : "الدور الأصلي وترجمته محفوظان بالترتيب.", special ? corrected : complete);
}
for (const [i, item] of dialogue.notes.entries()) add(`10 · ملاحظة ${i + 1} · L${item.line}`, item.text, i === 5 ? altered : complete, `content61.ts:DIALOGUE_61.notes[${i}]`, `content61.ts:DIALOGUE_61.notes[${i}]`, i === 5 ? "أعيد told them من المصدر، مع بيان البديل السياقي told him." : "طرفا التحويل الأصليان محفوظان.", i === 5 ? corrected : complete);
const dialogueConclusion = source.sections[10].find((line) => line.text.startsWith("هذا الحوار يجمع"));
if (!dialogueConclusion || !norm(content.DIALOGUE_61.context).includes(norm(dialogueConclusion.text))) throw new Error("Missing dialogue conclusion");
add(`10 · L${dialogueConclusion.line}`, dialogueConclusion.text, partial, "DIALOGUE_61.direct / reported: الأنواع ممثلة دون الجملة الختامية الصريحة", "content61.ts:DIALOGUE_61.context", "أُعيدت خلاصة المصدر التي تجمع الأسئلة والأوامر والنواهي في موقف واحد.", corrected);

flush();
lines.push("", "## القراءة: كل فقرة وسؤال وجواب مع الترجمات", "");
const reading = sourceReading61(source);
add(`11 · العنوان · L${reading.title.line}/${reading.titleAr.line}`, `${reading.title.text}<br>${reading.titleAr.text}`, complete, "content61.ts:READING_61.title / titleAr", "content61.ts:READING_61.title / titleAr", "عنوان القطعة باللغتين محفوظ.");
for (const [i, item] of reading.paragraphs.entries()) add(`11 · فقرة ${i + 1} · L${item.line}/${item.arLine}`, `${item.en}<br>${item.ar}`, complete, `content61.ts:READING_61.paragraphs[${i}]`, `content61.ts:READING_61.paragraphs[${i}]`, i === 4 ? "النص والترجمة محفوظان؛ أُوضح احتمال التباس he وتفسير طلب الطالب للإذن." : "الفقرة وترجمتها محفوظتان.", i === 4 ? corrected : complete);
for (const [i, item] of reading.questions.entries()) add(`11 · سؤال ${i + 1} · L${item.line}/${item.answerLine}`, `${item.q}<br>${item.qar}<br>${item.a}<br>${item.aar}`, complete, `content61.ts:READING_61.questions[${i}]`, `content61.ts:READING_61.questions[${i}]`, "السؤال والجواب وترجمتاهما محفوظة؛ الجواب محجوب حتى المحاولة.");

flush();
lines.push("", "## التدريبات: كل بند أصلي وخياره وحله وشرحه", "", "العدد الأصلي 48 سؤالًا وبند فقرة واحد. البدائل العلمية الإضافية لا تحل محل المفتاح المصدر. حلول المجموعات 1–7 لا تظهر قبل محاولة جميع بنود المجموعة.", "");
const practices = sourcePractices61(source);
const practiceIntro = source.sections[12].find((line) => line.text.includes("حاول حل كل مجموعة قبل قراءة الحلول"));
if (!practiceIntro || !newCover.includes("حاول حل كل مجموعة قبل قراءة الحلول")) throw new Error("Source group-attempt instruction is missing");
add(`12 · L${practiceIntro.line}`, practiceIntro.text, altered, "Lesson61.tsx:Practice61 / Attempt61: كان نموذج البند يظهر بعد محاولة البند وحده", "Lesson61.tsx:Practice61 وParagraphPractice61؛ kit61.tsx:Attempt61", "أُعيدت تعليمات محاولة المجموعة وأصبحت الشروح محجوبة حتى اكتمال محاولتها؛ الفقرة مهمة واحدة.", corrected);
for (const [i, group] of practices.entries()) {
  if (!group.instruction) continue;
  const before = oldPractice.PRACTICES_61[i].instruction, after = practice.PRACTICES_61[i].instruction;
  if (!norm(after).includes(norm(group.instruction.text))) throw new Error(`Final practice instruction missing at line ${group.instruction.line}`);
  const paragraphRepair = i === 7 && norm(before).includes(norm("حوّل جميع جمل الفقرة إلى الكلام المنقول"));
  if (!paragraphRepair && !norm(before).includes(norm(group.instruction.text))) throw new Error(`Initial practice instruction missing at line ${group.instruction.line}`);
  add(`12 · تعليمات ${i + 1} · L${group.instruction.line}`, group.instruction.text, paragraphRepair ? partial : complete,
    `practice61.ts:PRACTICES_61[${i}].instruction: «${before}»`, `practice61.ts:PRACTICES_61[${i}].instruction: «${after}»`,
    paragraphRepair ? "كانت التعليمات معادَة الصياغة مع افتراض he وكانت المهمة مجزأة؛ أُعيد لفظ المصدر ومهمة فقرة واحدة." : "تعليمات المصدر محفوظة في المجموعة؛ قد يضاف توضيح دون تغيير المطلوب.", paragraphRepair ? corrected : complete);
}
for (let g = 0; g < 7; g++) for (let i = 0; i < practices[g].questions.length; i++) {
  const q = practices[g].questions[i], a = practices[g].answers[i];
  const original = `المطلوب: ${q.parts.map((p) => p.text).join(" / ")}<br>الحل والشرح: ${a.parts.map((p) => p.text).join(" / ")}`;
  let init = complete, final = complete, note = "المطلوب والحل والشرح/الترجمة الموجودة في المصدر محفوظة؛ قد تضاف بدائل مشروطة بالسياق.";
  if (g === 4) { init = partial; final = corrected; note = "أُعيد شرح المصدر بصيغته، مع إبقاء المفتاح. في السؤالين 2 و4 قُبل بديل صحيح سياقيًا/نحويًا."; }
  if ((g === 0 && [0, 1, 3, 5].includes(i)) || (g === 1 && [1, 4].includes(i)) || (g === 5 && i === 6)) { init = partial; final = corrected; note = "أُعيدت تفاصيل المصدر النصية للشرح، مع توضيح تغيّر المرجع أو البديل عند الحاجة."; }
  if (g === 2 && i === 5) { init = partial; final = corrected; note = "أُعيدت الملاحظة الجماعية الأصلية عن ordered / warned بعد اكتمال المجموعة."; }
  add(`12 · ${g + 1}.${i + 1} · L${q.line}/${a.line}`, original, init, `practice61.ts:PRACTICES_61[${g}].items[${i}]`, `practice61.ts:PRACTICES_61[${g}].items[${i}]`, note, final);
}
const para = practices[7];
add(`12 · 8 · L${para.promptLine}`, `الفقرة الكاملة: ${para.prompt}<br>الحل الكامل: ${para.model.map((p) => `${p.en} / ${p.ar}`).join("<br>")}`, altered, "practice61.ts:PRACTICES_61[7]: فقرة مع 7 محاولات منفصلة", "practice61.ts:PRACTICES_61[7].items[0] + model؛ Lesson61.tsx:ParagraphPractice61", "أُعيدت مهمة فقرة واحدة. القائمة تغطي الجمل السبع بلا تقديمها كبنود بديلة؛ الحل والترجمة بعد المحاولة.", corrected);
for (const [i, line] of para.model.entries()) add(`12 · 8 / نموذج ${i + 1} · L${line.line}/${line.arLine}`, `${line.en}<br>${line.ar}`, complete, `practice61.ts:PRACTICES_61[7].model[${i}]`, `practice61.ts:PRACTICES_61[7].model[${i}]`, "السطر وترجمته محفوظان في نموذج الفقرة الوحيد.");

flush();
lines.push("", "## الاختبار الأصلي: الأسئلة الـ25 والخيارات والمفاتيح والشروح", "", "كل صف مرتبط برقمه ومفتاحه الأصلي، ويختلف عن FinalTest المشترك ذي 15 سؤالًا. تُحجب مفاتيح اختبار الطالب الأصلي حتى محاولة الأسئلة الـ25.", "");
const exam = sourceExam61(source);
const examIntro = source.sections[13].find((line) => line.text.includes("حاول حل الاختبار أولًا دون النظر إلى مفتاح الإجابة"));
if (!examIntro) throw new Error("Original test instruction is missing from source");
add(`13 · L${examIntro.line}`, examIntro.text, altered, "Lesson61.tsx:OriginalTest61 / OriginalKey61: كان مفتاح كل سؤال يظهر بعد محاولته", "Lesson61.tsx:OriginalTest61 / OriginalKey61", "أصبح المفتاح والتصحيح محجوبين حتى محاولة جميع الأسئلة الـ25، امتثالًا للتعليمات الأصلية.", corrected);
for (let i = 0; i < 25; i++) {
  const q = exam.questions[i], a = exam.answers[i];
  const clean = (parts) => parts.map((part) => part.text).filter((text) => !text.startsWith("القسم "));
  const original = `السؤال والخيارات: ${clean(q.parts).join(" / ")}<br>المفتاح والسبب: ${clean(a.parts).join(" / ")}`;
  const wasPartial = [13, 14, 21, 22, 23, 24, 25].includes(i + 1);
  const context = i + 1 === 22 ? "الأصل B. had؛ قُبل A. have إذا بقيت النتيجة حاضرة." : i + 1 === 24 ? "الأصل B. not to؛ قُبل C. to not لأنه صحيح نحويًا." : [13, 14].includes(i + 1) ? "أُعيد شرح المصدر؛ يبقى told بديلًا عندما لا يتحدد القصد." : "السؤال والخيارات والمفتاح والشرح الأصلي محفوظة بالترتيب.";
  add(`13 · ${i + 1} · L${q.line}/${a.line}`, original, wasPartial ? partial : complete, `practice61.ts:ORIGINAL_TEST_61[${i}]`, `practice61.ts:ORIGINAL_TEST_61[${i}]`, context, wasPartial ? corrected : complete);
}

flush();
lines.push("", "## الكتابة والتحدث والملخص: كل متطلب ومثال وتمييز", "");
const writing = sourceWriting61(source), speaking = sourceSpeaking61(source);
add(`14 · L${writing.instruction.line}`, writing.instruction.text, complete, "content61.ts:WRITING_61.instruction", "content61.ts:WRITING_61.instruction", "التكليف من 8 إلى 12 جملة عن موقف مدرسي محفوظ.");
for (const [i, req] of writing.requirements.entries()) add(`14 · متطلب ${i + 1} · L${req.line}`, req.parts[0].text, complete, `content61.ts:WRITING_61.requirements[${i}]`, `content61.ts:WRITING_61.requirements[${i}]`, "المتطلب الأصلي محفوظ في قائمة المتعلم.");
add(`14 · عنوان النموذج · L${writing.title.line}/${writing.titleAr.line}`, `${writing.title.text}<br>${writing.titleAr.text}`, complete, "content61.ts:WRITING_61.title / titleAr", "content61.ts:WRITING_61.title / titleAr", "عنوان نموذج الكتابة محفوظ باللغتين.");
for (const [i, item] of writing.model.entries()) add(`14 · نموذج ${i + 1} · L${item.line}/${item.arLine}`, `${item.en}<br>${item.ar}`, complete, `content61.ts:WRITING_61.model[${i}]`, `content61.ts:WRITING_61.model[${i}]`, i === 2 ? "النص والترجمة محفوظان؛ أضيف تنبيه للسياق المطلوب لاعتبار سؤال القاموس طلب إذن." : "نص النموذج وترجمته محفوظان.", i === 2 ? corrected : complete);
for (const [i, instruction] of speaking.instructions.entries()) {
  if (![oldContent, content].every((module) => norm(module.SPEAKING_61.instruction).includes(norm(instruction.text)))) throw new Error(`Speaking instruction missing at line ${instruction.line}`);
  add(`15 · تعليمات ${i + 1} · L${instruction.line}`, instruction.text, complete, "content61.ts:SPEAKING_61.instruction", "content61.ts:SPEAKING_61.instruction", "الموقف والمطلوب الشفهي ثم تحويل الإجابات محفوظة في التكليف.");
}
for (const [i, item] of speaking.questions.entries()) add(`15 · سؤال ${i + 1} · L${item.line}`, `${item.en}<br>${item.ar}`, complete, `content61.ts:SPEAKING_61.questions[${i}]`, `content61.ts:SPEAKING_61.questions[${i}]`, "السؤال وترجمته محفوظان.");
for (const [i, item] of speaking.pairs.entries()) add(`15 · مثال ${i + 1} · L${item.line}`, `${item.direct}<br>${item.reported}`, complete, `content61.ts:SPEAKING_61.pairs[${i}]`, `content61.ts:SPEAKING_61.pairs[${i}]`, "المثال المباشر والمنقول محفوظ؛ لم يضع المصدر ترجمة لهذه الأزواج.");
const summarySource = source.sections[16]; const summaryIndices = summarySource.flatMap((line, i) => /^\d+\.\s/.test(line.text) ? [i] : []);
for (let i = 0; i < 8; i++) {
  const part = summarySource.slice(summaryIndices[i], summaryIndices[i + 1]);
  add(`16 · تركيب ${i + 1} · L${part[0].line}`, part.filter((line) => line.text).map((line) => line.text).join(" / "), complete, `content61.ts:SUMMARY_61[${i}]`, `content61.ts:SUMMARY_61[${i}]`, "التركيب ومثال المصدر وشرحه محفوظة.");
}
for (const [i, item] of sourceDistinctions61(source).entries()) add(`16 · فرق ${i + 1} · L${item.line}`, item.text, partial, "content61.ts:SUMMARY_61[8].note (فروق مدمجة)", `content61.ts:SUMMARY_DISTINCTIONS_61[${i}]`, "كان المعنى مضمنًا في فقرة واحدة؛ أصبح فرق المصدر ظاهرًا مستقلًا.", corrected);

// Flush the last category; every row carries its initial and final status.
flush();
const counts = (key) => rows.reduce((out, row) => { out[row[key]] = (out[row[key]] || 0) + 1; return out; }, {});
const beforeCounts = counts("initial"), finalCounts = counts("final");
lines.push("", `## إجمالي صفوف السجل وحالة التغطية`, "", `عدد صفوف الوحدات والتكرارات المصدرية: **${rows.length}**. الحالة الأولية: ${Object.entries(beforeCounts).map(([key, n]) => `\`${key}\`: ${n}`).join("؛ ")}. الحالة النهائية: ${Object.entries(finalCounts).map(([key, n]) => `\`${key}\`: ${n}`).join("؛ ")}. لا توجد صفوف نهائية بحالة \`MISSING\` أو \`PARTIALLY PRESERVED\` أو \`ALTERED\` بحسب هذه المراجعة. تصنيف الصفوف يتضمن تكرار المصدر، ولا يستبدل أعداد البنود التعليمية الفريدة.`, "", `الجرد الفريد: **16 قسمًا**؛ 7 قواعد؛ 4 إجراءات / 20 خطوة؛ 8 أمثلة شاملة؛ 9 أدوار مباشرة + 9 منقولة + 6 ملاحظات؛ 7 فقرات قراءة و7 أسئلة مع أجوبتها وترجماتها؛ **6، 6، 6، 6، 8، 8، 8، وفقرة واحدة**؛ **25** سؤالًا أصليًا مع 25 شرحًا؛ مهمة كتابة من 8–12 جملة و7 متطلبات ونموذج كامل وترجمة؛ 5 أسئلة تحدث مترجمة و3 أمثلة؛ 8 تراكيب و9 فروق. الاختبار المشترك مستقل ويحتوي 15 سؤالًا.`, "");
writeFileSync("docs/lesson61-content-review.md", lines.join("\n"));
console.log(`Wrote docs/lesson61-content-review.md: ${rows.length} ledger rows; initial ${JSON.stringify(beforeCounts)}; final ${JSON.stringify(finalCounts)}.`);
