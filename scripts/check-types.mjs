#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASELINE_PATH = path.join(__dirname, "ts-baseline.json");

const args = process.argv.slice(2);
const isRaw = args.includes("--raw");
const isUpdate = args.includes("--update-baseline");

// Run tsc --noEmit
const tscResult = spawnSync("npx", ["tsc", "--noEmit"], {
  cwd: ROOT,
  encoding: "utf8",
  maxBuffer: 10 * 1024 * 1024,
});

const output = (tscResult.stdout || "") + (tscResult.stderr || "");

if (isRaw) {
  process.stdout.write(output);
  process.exit(tscResult.status ?? 0);
}

// Parse errors
const lines = output.split("\n");
const errors = [];
const errorsByFile = {};
const errorsByCode = {};

for (const line of lines) {
  const match = line.match(/^([^(]+)\(([0-9]+),([0-9]+)\):\s+error\s+(TS[0-9]+):\s+(.*)$/);
  if (match) {
    const [, rawFile, lineNum, colNum, code, message] = match;
    const normFile = path.relative(ROOT, path.resolve(ROOT, rawFile)).replace(/\\/g, "/");
    const item = { file: normFile, line: Number(lineNum), col: Number(colNum), code, message };
    errors.push(item);
    errorsByFile[normFile] = (errorsByFile[normFile] || 0) + 1;
    errorsByCode[code] = (errorsByCode[code] || 0) + 1;
  }
}

const currentTotal = errors.length;
const currentFileCount = Object.keys(errorsByFile).length;

if (isUpdate) {
  const newBaseline = {
    $schema: "TypeScript legacy error baseline ratchet",
    description: "Baseline of inherited TypeScript errors before tsconfig.json was added. Regressions are strictly blocked.",
    updatedAt: new Date().toISOString(),
    totalErrors: currentTotal,
    fileCount: currentFileCount,
    files: Object.fromEntries(Object.entries(errorsByFile).sort(([a], [b]) => a.localeCompare(b))),
    errorCodes: Object.fromEntries(Object.entries(errorsByCode).sort(([a], [b]) => a.localeCompare(b))),
  };
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(newBaseline, null, 2) + "\n", "utf8");
  console.log(`✓ Baseline updated: ${currentTotal} errors in ${currentFileCount} files recorded to ${path.relative(ROOT, BASELINE_PATH)}`);
  process.exit(0);
}

// Validate against baseline
if (!fs.existsSync(BASELINE_PATH)) {
  console.error(`ERROR: Baseline file not found at ${BASELINE_PATH}`);
  console.error("Run with --update-baseline to generate it.");
  process.exit(1);
}

const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
const regressions = [];

// 1. Check for errors in unexpected files (files not in baseline)
for (const [file, count] of Object.entries(errorsByFile)) {
  if (!baseline.files[file]) {
    regressions.push({
      type: "NEW_FILE_WITH_ERRORS",
      file,
      count,
      message: `File has ${count} type error(s) but is not in the baseline. New code must be 100% type-clean.`,
    });
  } else if (count > baseline.files[file]) {
    const diff = count - baseline.files[file];
    regressions.push({
      type: "ERROR_COUNT_INCREASED",
      file,
      count,
      baselineCount: baseline.files[file],
      diff,
      message: `Error count increased from ${baseline.files[file]} to ${count} (+${diff} new error(s)).`,
    });
  }
}

// 2. Check total errors
if (currentTotal > baseline.totalErrors) {
  regressions.push({
    type: "TOTAL_ERRORS_INCREASED",
    count: currentTotal,
    baselineCount: baseline.totalErrors,
    diff: currentTotal - baseline.totalErrors,
    message: `Total type errors increased from ${baseline.totalErrors} to ${currentTotal} (+${currentTotal - baseline.totalErrors} new error(s)).`,
  });
}

// Output report
console.log("============================================================");
console.log("TypeScript Type Check (Baseline Ratchet Audit)");
console.log("============================================================");
console.log(`Current Total Errors  : ${currentTotal}`);
console.log(`Baseline Total Errors : ${baseline.totalErrors}`);
console.log(`Files with Errors     : ${currentFileCount} (baseline: ${baseline.fileCount})`);

if (regressions.length > 0) {
  console.error("\n❌ REGRESSION DETECTED: New TypeScript errors were introduced!\n");
  for (const reg of regressions) {
    if (reg.file) {
      console.error(`  • [${reg.type}] ${reg.file}: ${reg.message}`);
      // Show first 3 errors in this file for fast debugging
      const fileErrors = errors.filter((e) => e.file === reg.file).slice(0, 3);
      for (const fe of fileErrors) {
        console.error(`      Line ${fe.line}:${fe.col} [${fe.code}]: ${fe.message}`);
      }
    } else {
      console.error(`  • [${reg.type}] ${reg.message}`);
    }
  }
  console.error("\nPlease fix the newly introduced type errors before committing.");
  process.exit(1);
}

// Check for improvement (ratchet down)
if (currentTotal < baseline.totalErrors) {
  const reduction = baseline.totalErrors - currentTotal;
  console.log(`\n🎉 Improvement detected: ${reduction} legacy type error(s) resolved!`);
  console.log(`Run 'node scripts/check-types.mjs --update-baseline' to lock in this progress.`);
}

console.log("\n✓ TypeScript verification passed: 0 new errors introduced, baseline ratchet intact.\n");
process.exit(0);
