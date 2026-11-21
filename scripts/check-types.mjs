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
// Helper: Normalize multi-line diagnostic fingerprint
// Captures header + all continuation lines into a stable semantic signature,
// completely independent of line numbers, column numbers, or line-wrapping differences.
// -------------------------------------------------------------
export function normalizeDiagnosticFingerprint(code, parts) {
  const normalizedText = parts
    .map((p) => p.trim())
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return `${code}: ${normalizedText}`;
}

// -------------------------------------------------------------
// Helper: Fail-Closed Parser for TypeScript compiler output
// Ensures EVERY single diagnostic is parsed. Any unparseable line
// or unexpected output triggers an immediate fail-closed rejection.
// -------------------------------------------------------------
export function parseCompilerOutput(rawOutput, rootDir = ROOT) {
  const lines = rawOutput.split("\n");
  const headerRegex = /^([^(]+)\(([0-9]+),([0-9]+)\):\s+error\s+(TS[0-9]+):\s*(.*)$/;
  const markerRegex = /\berror\s+TS[0-9]+:/g;

  const allMarkers = rawOutput.match(markerRegex) || [];
  const diagnostics = [];
  const unparseableLines = [];
  const unexpectedLines = [];
  let current = null;

  function finalizeCurrent() {
    if (!current) return;
    const sig = normalizeDiagnosticFingerprint(current.code, current.parts);
    diagnostics.push({
      file: current.file,
      line: current.line,
      col: current.col,
      code: current.code,
      sig,
      message: current.parts.join(" ").replace(/\s+/g, " ").trim(),
    });
    current = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.replace(/\r$/, "");

    // Check if line contains a TypeScript error marker
    if (/\berror\s+TS[0-9]+:/.test(line)) {
      const match = line.match(headerRegex);
      if (match) {
        finalizeCurrent();
        const [, rawFile, lineNum, colNum, code, msg] = match;
        const normFile = path.relative(rootDir, path.resolve(rootDir, rawFile.trim())).replace(/\\/g, "/");
        current = {
          file: normFile,
          line: Number(lineNum),
          col: Number(colNum),
          code,
          parts: msg.trim() ? [msg.trim()] : [],
        };
      } else {
        // Line has 'error TS...' marker but did not match expected header regex
        finalizeCurrent();
        unparseableLines.push({ lineIndex: i + 1, text: line });
      }
    } else if (current) {
      // Line follows an active diagnostic: continuation line or blank separator
      if (line.startsWith("  ") || line.startsWith("\t")) {
        const trimmed = line.trim();
        if (trimmed) {
          current.parts.push(trimmed);
        }
      } else if (line.trim().length === 0) {
        finalizeCurrent();
      } else {
        // Non-indented, non-blank line while expecting continuation
        finalizeCurrent();
        unexpectedLines.push({ lineIndex: i + 1, text: line });
      }
    } else {
      // Outside any diagnostic block
      if (line.trim().length > 0) {
        unexpectedLines.push({ lineIndex: i + 1, text: line });
      }
    }
  }

  finalizeCurrent();

  return {
    diagnostics,
    totalMarkers: allMarkers.length,
    unparseableLines,
    unexpectedLines,
  };
}

// -------------------------------------------------------------
// CLI Execution
// -------------------------------------------------------------
const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

export function runCli() {
  // 1. Run tsc --noEmit safely and guard process execution
  let tscResult;
  try {
    tscResult = spawnSync("npx", ["tsc", "--noEmit"], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 25 * 1024 * 1024,
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

  const rawOutput = (tscResult.stdout || "") + (tscResult.stderr || "");

  if (isRaw) {
    process.stdout.write(rawOutput);
    process.exit(tscResult.status ?? 1);
  }

  // 2. Fail-Closed Parsing & Integrity Validation
  const parseResult = parseCompilerOutput(rawOutput, ROOT);

  // Fail-closed rule A: Reject any unparseable line containing 'error TS...'
  if (parseResult.unparseableLines.length > 0) {
    console.error("❌ FATAL: Unparseable TypeScript diagnostic line(s) detected in compiler output:");
    for (const ul of parseResult.unparseableLines) {
      console.error(`  • Line ${ul.lineIndex}: ${ul.text}`);
    }
    console.error("\nFailing closed: Parsing integrity could not be verified.");
    process.exit(1);
  }

  // Fail-closed rule B: Parsed count MUST match all 'error TS...' occurrences in raw stream
  if (parseResult.diagnostics.length !== parseResult.totalMarkers) {
    console.error(`❌ FATAL: Diagnostic count mismatch: found ${parseResult.totalMarkers} 'error TS...' marker(s) in output, but parsed ${parseResult.diagnostics.length} diagnostic(s).`);
    console.error("Failing closed: Some diagnostics were dropped or malformed.");
    process.exit(1);
  }

  // Fail-closed rule C: Reject unexpected lines that make parsing integrity uncertain
  if (parseResult.unexpectedLines.length > 0) {
    console.error("❌ FATAL: Unexpected unparsed output line(s) detected outside diagnostic blocks:");
    for (const un of parseResult.unexpectedLines) {
      console.error(`  • Line ${un.lineIndex}: ${un.text}`);
    }
    console.error("\nFailing closed: Unknown compiler output encountered.");
    process.exit(1);
  }

  // Fail-closed rule D: Ensure non-zero exit code produced parseable diagnostics
  if (tscResult.status !== 0 && parseResult.diagnostics.length === 0) {
    console.error(`❌ FATAL: TypeScript compiler exited with error code (${tscResult.status}) but no diagnostics could be parsed.`);
    console.error("Raw compiler output was:\n" + rawOutput.trim());
    process.exit(1);
  }

  // Fail-closed rule E: Ensure zero exit code did not silently swallow parsed diagnostics
  if (tscResult.status === 0 && parseResult.diagnostics.length > 0) {
    console.error(`❌ FATAL: TypeScript compiler exited with status 0 but ${parseResult.diagnostics.length} diagnostics were parsed.`);
    process.exit(1);
  }

  // Fail-closed rule F: Check for fatal configuration / setup diagnostics (TS5xxx)
  const configErrors = parseResult.diagnostics.filter((e) => e.code.startsWith("TS5"));
  if (configErrors.length > 0) {
    console.error("❌ FATAL: TypeScript compiler configuration error detected:");
    for (const ce of configErrors) {
      console.error(`  • [${ce.code}] ${ce.file}: ${ce.message}`);
    }
    process.exit(1);
  }

  // Group current diagnostics by file and fingerprint
  const currentFiles = {};
  const currentErrorCodes = {};
  const currentTotal = parseResult.diagnostics.length;

  for (const d of parseResult.diagnostics) {
    if (!currentFiles[d.file]) {
      currentFiles[d.file] = { count: 0, diagnostics: {} };
    }
    currentFiles[d.file].count++;
    currentFiles[d.file].diagnostics[d.sig] = (currentFiles[d.file].diagnostics[d.sig] || 0) + 1;
    currentErrorCodes[d.code] = (currentErrorCodes[d.code] || 0) + 1;
  }

  // 3. Baseline Verification and Regression Detection
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

      // Check B: Complete Diagnostic Identity Comparison (Header + Continuation lines)
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

  // 4. Handle --update-baseline with Strict Fail-Closed Guard
  if (isUpdate) {
    // Reject if any parse or execution issues occurred
    if (parseResult.unparseableLines.length > 0 || parseResult.unexpectedLines.length > 0) {
      console.error("❌ REJECTED: Cannot update baseline when compiler output is not 100% reliably parseable.");
      process.exit(1);
    }

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
      let identical = true;
      for (const [file, currentData] of Object.entries(currentFiles)) {
        const baseData = baseline.files[file];
        if (!baseData || baseData.count !== currentData.count) {
          identical = false;
          break;
        }
        for (const [sig, count] of Object.entries(currentData.diagnostics)) {
          if (!baseData.diagnostics || baseData.diagnostics[sig] !== count) {
            identical = false;
            break;
          }
        }
        if (!identical) break;
      }
      if (identical) {
        console.log(`✓ Baseline is already up-to-date (${currentTotal} errors in ${baseline.fileCount} files). No changes written.`);
        process.exit(0);
      }
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

  // 5. Output Verification Report
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
}

if (isDirectRun) {
  runCli();
}
