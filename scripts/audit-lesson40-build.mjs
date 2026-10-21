// Production bundle check for Lesson 40's answer-key separation.
// Run after `npm run build`.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const assets = join(root, "dist", "assets");
const html = readFileSync(join(root, "dist", "index.html"), "utf8");
const jsFiles = readdirSync(assets).filter((file) => file.endsWith(".js"));
const entryName = jsFiles.find((file) => file.startsWith("index-"));
const checks = [];
const check = (condition, message) => checks.push({ condition, message });
if (!entryName) {
  console.error("FAIL audit-lesson40-build: no Vite index entry bundle found");
  process.exit(1);
}
const entry = readFileSync(join(assets, entryName), "utf8");
const keyPhrase = "I promise I will return your book tomorrow.";
const keyModules = jsFiles.filter((file) => readFileSync(join(assets, file), "utf8").includes(keyPhrase));
check(!entry.includes(keyPhrase), "initial app entry contains no exact final-test answer phrase");
check(keyModules.length > 0 && keyModules.every((file) => file !== entryName), "answer phrase exists only in deferred non-entry chunk(s)");
check(!html.includes(keyModules[0] ?? "__missing_solution_chunk__"), "HTML does not preload the answer-bearing chunk as an entry script");
check(!entry.includes("I promise I will return your book tomorrow."), "student bundle does not embed the answer as a literal");

// Guard the specific student-data boundary as well as emitted bytes.
const dataSource = readFileSync(join(root, "src/lessons/lesson40/data.ts"), "utf8");
const studentProjection = readFileSync(join(root, "src/lessons/lesson40/studentLedger40.ts"), "utf8");
check(!dataSource.includes('from "./ledger40"'), "eager lesson data imports only the answer-free source projection");
check(!studentProjection.includes(keyPhrase), "student source projection excludes the final-test answer sentence");

const failed = checks.filter((item) => !item.condition);
if (failed.length) {
  console.error(`FAIL audit-lesson40-build (${failed.length}/${checks.length} failed)`);
  for (const item of failed) if (!item.condition) console.error(` - ${item.message}`);
  process.exit(1);
}
console.log(`PASS audit-lesson40-build (${checks.length} checks; entry ${entryName}; answer-bearing chunk ${keyModules.join(", ")})`);
