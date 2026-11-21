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

// -------------------------------------------------------------
// 1. Run tsc --noEmit safely and guard process execution
// -------------------------------------------------------------
let tscResult;
try {
  tscResult = spawnSync("npx", ["tsc", "--noEmit"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
} catch (err) {
  console.error(`❌ FATAL: Unhandled exception when spawning tsc: ${err.message}`);
  process.exit(1);
}

if (tscResult.error) {
  console.error(`❌ FATAL: Failed to execute TypeScript compiler (tsc): ${tscResult.error.message}`);
  process.exit(1);
}

if (tscResult.status === null) {
  console.error(`❌ FATAL: TypeScript compiler process was terminated by signal: ${tscResult.signal}`);
  process.exit(1);
}

const output = (tscResult.stdout || "") + (tscResult.stderr || "");

if (isRaw) {
  process.stdout.write(output);
  process.exit(tscResult.status);
}

// -------------------------------------------------------------
// 2. Parse diagnostics & validate compiler execution integrity
// -------------------------------------------------------------
const lines = output.split("\n");
const currentFiles = {};
const currentErrorCodes = {};
let currentTotal = 0;
const parsedErrors = [];

for (const line of lines) {
  const match = line.match(/^([^(]+)\(([0-9]+),([0-9]+)\):\s+error\s+(TS[0-9]+):\s+(.*)$/);
  if (match) {
    currentTotal++;
    const [, rawFile, lineNum, colNum, code, msg] = match;
    const normFile = path.relative(ROOT, path.resolve(ROOT, rawFile.trim())).replace(/\\/g, "/");
    const sig = `${code}: ${msg.trim()}`;

    if (!currentFiles[normFile]) {
      currentFiles[normFile] = { count: 0, diagnostics: {} };
    }
    currentFiles[normFile].count++;
    currentFiles[normFile].diagnostics[sig] = (currentFiles[normFile].diagnostics[sig] || 0) + 1;
    currentErrorCodes[code] = (currentErrorCodes[code] || 0) + 1;

    parsedErrors.push({
      file: normFile,
      line: Number(lineNum),
      col: Number(colNum),
      code,
      message: msg.trim(),
      sig,
    });
  }
}

// Ensure non-zero exit code produced parseable diagnostics
if (tscResult.status !== 0 && currentTotal === 0) {
  console.error(`❌ FATAL: TypeScript compiler exited with error code (${tscResult.status}) but no diagnostics could be parsed.`);
  console.error("Raw compiler output was:\n" + output.trim());
  process.exit(1);
}

// Ensure zero exit code did not silently swallow parsed diagnostics
if (tscResult.status === 0 && currentTotal > 0) {
  console.error(`❌ FATAL: TypeScript compiler exited with status 0 but ${currentTotal} diagnostics were parsed.`);
  process.exit(1);
}

// Check for fatal configuration / setup diagnostics (TS5xxx)
const configErrors = parsedErrors.filter((e) => e.code.startsWith("TS5"));
if (configErrors.length > 0) {
  console.error("❌ FATAL: TypeScript compiler configuration error detected:");
  for (const ce of configErrors) {
    console.error(`  • [${ce.code}] ${ce.file}: ${ce.message}`);
  }
  process.exit(1);
}

// -------------------------------------------------------------
// 3. Baseline verification and regression detection
// -------------------------------------------------------------
if (!fs.existsSync(BASELINE_PATH)) {
  if (!isUpdate) {
    console.error(`❌ ERROR: Baseline file not found at ${BASELINE_PATH}`);
    console.error("Run with --update-baseline to generate it.");
    process.exit(1);
  }
}

let baseline = null;
if (fs.existsSync(BASELINE_PATH)) {
  try {
    baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  } catch (err) {
    console.error(`❌ FATAL: Failed to parse baseline JSON file at ${BASELINE_PATH}: ${err.message}`);
    process.exit(1);
  }
}

const regressions = [];

if (baseline) {
  // Check A: New files with errors
  for (const [file, currentData] of Object.entries(currentFiles)) {
    const baseData = baseline.files[file];
    if (!baseData) {
      regressions.push({
        type: "NEW_FILE_WITH_ERRORS",
        file,
        count: currentData.count,
        message: `File has ${currentData.count} type error(s) but is not in the baseline. New code must be 100% type-clean.`,
      });
      continue;
    }

    // Check B: Diagnostic identity comparison (stable semantic fingerprint)
    for (const [sig, currentSigCount] of Object.entries(currentData.diagnostics)) {
      const baseSigCount = baseData.diagnostics ? baseData.diagnostics[sig] || 0 : 0;
      if (baseSigCount === 0) {
        regressions.push({
          type: "NEW_DIAGNOSTIC",
          file,
          sig,
          count: currentSigCount,
          message: `New diagnostic introduced: '${sig}' (not present in baseline for this file).`,
        });
      } else if (currentSigCount > baseSigCount) {
        const diff = currentSigCount - baseSigCount;
        regressions.push({
          type: "DIAGNOSTIC_COUNT_INCREASED",
          file,
          sig,
          count: currentSigCount,
          baselineCount: baseSigCount,
          message: `Diagnostic '${sig}' count increased from ${baseSigCount} to ${currentSigCount} (+${diff}).`,
        });
      }
    }

    // Check C: File error count increased
    if (currentData.count > baseData.count) {
      const diff = currentData.count - baseData.count;
      regressions.push({
        type: "FILE_ERROR_COUNT_INCREASED",
        file,
        count: currentData.count,
        baselineCount: baseData.count,
        message: `Total error count in file increased from ${baseData.count} to ${currentData.count} (+${diff}).`,
      });
    }
  }

  // Check D: Total error count increased
  if (currentTotal > baseline.totalErrors) {
    const diff = currentTotal - baseline.totalErrors;
    regressions.push({
      type: "TOTAL_ERRORS_INCREASED",
      count: currentTotal,
      baselineCount: baseline.totalErrors,
      message: `Total type errors increased from ${baseline.totalErrors} to ${currentTotal} (+${diff} new error(s)).`,
    });
  }
}

// -------------------------------------------------------------
// 4. Handle --update-baseline with strict regression guard
// -------------------------------------------------------------
if (isUpdate) {
  if (baseline && regressions.length > 0) {
    console.error("❌ REJECTED: Cannot update baseline when regressions exist!");
    for (const reg of regressions) {
      console.error(`  • [${reg.type}] ${reg.file || "General"}: ${reg.message}`);
    }
    console.error("\nRefusing to write baseline. Fix the regressions before updating.");
    process.exit(1);
  }

  if (baseline && currentTotal > baseline.totalErrors) {
    console.error(`❌ REJECTED: Total errors (${currentTotal}) exceeds previous baseline (${baseline.totalErrors}).`);
    process.exit(1);
  }

  if (baseline && currentTotal === baseline.totalErrors && Object.keys(currentFiles).length === baseline.fileCount) {
    console.log(`✓ Baseline is already up-to-date (${currentTotal} errors in ${baseline.fileCount} files). No changes written.`);
    process.exit(0);
  }

  const newBaseline = {
    $schema: "TypeScript legacy error baseline ratchet",
    description: "Baseline of inherited TypeScript errors before tsconfig.json was added. Regressions are strictly blocked.",
    updatedAt: new Date().toISOString(),
    totalErrors: currentTotal,
    fileCount: Object.keys(currentFiles).length,
    files: Object.fromEntries(
      Object.entries(currentFiles)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([f, data]) => [
          f,
          {
            count: data.count,
            diagnostics: Object.fromEntries(Object.entries(data.diagnostics).sort(([a], [b]) => a.localeCompare(b))),
          },
        ])
    ),
    errorCodes: Object.fromEntries(Object.entries(currentErrorCodes).sort(([a], [b]) => a.localeCompare(b))),
  };

  fs.writeFileSync(BASELINE_PATH, JSON.stringify(newBaseline, null, 2) + "\n", "utf8");

  if (!baseline) {
    console.log(`✓ Initial baseline created: ${currentTotal} errors in ${newBaseline.fileCount} files recorded to ${path.relative(ROOT, BASELINE_PATH)}`);
  } else {
    const diff = baseline.totalErrors - currentTotal;
    console.log(`✓ Baseline successfully ratcheted down: reduced from ${baseline.totalErrors} to ${currentTotal} errors (-${diff} resolved).`);
  }
  process.exit(0);
}

// -------------------------------------------------------------
// 5. Output Verification Report
// -------------------------------------------------------------
console.log("============================================================");
console.log("TypeScript Type Check (Baseline Ratchet Audit)");
console.log("============================================================");
console.log(`Current Total Errors  : ${currentTotal}`);
console.log(`Baseline Total Errors : ${baseline ? baseline.totalErrors : "N/A"}`);
console.log(`Files with Errors     : ${Object.keys(currentFiles).length} (baseline: ${baseline ? baseline.fileCount : "N/A"})`);

if (regressions.length > 0) {
  console.error("\n❌ REGRESSION DETECTED: New TypeScript diagnostics or counts were introduced!\n");
  for (const reg of regressions) {
    if (reg.file) {
      console.error(`  • [${reg.type}] ${reg.file}: ${reg.message}`);
    } else {
      console.error(`  • [${reg.type}] ${reg.message}`);
    }
  }
  console.error("\nPlease fix the newly introduced type errors before committing.");
  process.exit(1);
}

if (baseline && currentTotal < baseline.totalErrors) {
  const reduction = baseline.totalErrors - currentTotal;
  console.log(`\n🎉 Improvement detected: ${reduction} legacy type error(s) resolved!`);
  console.log(`Run 'node scripts/check-types.mjs --update-baseline' to lock in this progress.`);
}

console.log("\n✓ TypeScript verification passed: 0 regressions, all diagnostics match baseline ratchet.\n");
process.exit(0);
