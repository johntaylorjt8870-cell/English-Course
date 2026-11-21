import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import {
  findRegressions,
  groupDiagnostics,
  normalizeDiagnosticFingerprint,
  parseCompilerOutput,
  validateBaselineUpdate,
} from "./check-types.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASELINE_PATH = path.join(__dirname, "ts-baseline.json");

describe("TypeScript Ratchet Check Tests (Unit & Fail-Closed Audits)", () => {
  describe("1. Fail-Closed Parsing & Integrity Checks", () => {
    it("detects and flags unparseable diagnostic lines alongside valid diagnostics", () => {
      const output = [
        "src/lessons/lesson10/Lesson10.tsx(211,30): error TS2304: Cannot find name 'IngRule'.",
        "malformed diagnostic line containing error TS9999: missing file and position",
      ].join("\n");

      const res = parseCompilerOutput(output, ROOT);

      assert.equal(res.diagnostics.length, 1, "Should parse the valid diagnostic");
      assert.equal(res.unparseableLines.length, 1, "Should catch the unparseable line");
      assert.equal(res.totalMarkers, 2, "Should count 2 total error TS markers");
      assert.equal(res.unparseableLines[0].lineIndex, 2);
      assert.match(res.unparseableLines[0].text, /error TS9999:/);

      const updateCheck = validateBaselineUpdate({
        parseResult: res,
        baseline: null,
        currentTotal: res.diagnostics.length,
        regressions: [],
      });
      assert.equal(updateCheck.canUpdate, false, "Baseline update must be blocked on unparseable line");
    });

    it("detects unexpected output lines outside diagnostic blocks", () => {
      const output = [
        "src/lessons/lesson10/Lesson10.tsx(211,30): error TS2304: Cannot find name 'IngRule'.",
        "Unexpected non-diagnostic compiler output line",
        "src/lessons/lesson24/Lesson24.tsx(5,10): error TS2322: Type 'number' is not assignable to type 'string'.",
      ].join("\n");

      const res = parseCompilerOutput(output, ROOT);

      assert.equal(res.diagnostics.length, 2, "Should parse the two valid diagnostics");
      assert.equal(res.unexpectedLines.length, 1, "Should flag the unexpected stray line");
      assert.equal(res.unexpectedLines[0].lineIndex, 2);
      assert.equal(res.unexpectedLines[0].text, "Unexpected non-diagnostic compiler output line");

      const updateCheck = validateBaselineUpdate({
        parseResult: res,
        baseline: null,
        currentTotal: res.diagnostics.length,
        regressions: [],
      });
      assert.equal(updateCheck.canUpdate, false, "Baseline update must be blocked on unexpected lines");
    });

    it("distinguishes two diagnostics sharing the same code and message prefix but different continuation lines", () => {
      const output = [
        "src/lessons/lesson24/Lesson24.tsx(10,5): error TS2345: Argument of type '{ tone: string; }' is not assignable to parameter of type '{ tone: Tone; }'.",
        "  Types of property 'tone' are incompatible.",
        "    Type 'indigo' is not assignable to type 'teal'.",
        "",
        "src/lessons/lesson24/Lesson24.tsx(20,5): error TS2345: Argument of type '{ tone: string; }' is not assignable to parameter of type '{ tone: Tone; }'.",
        "  Types of property 'tone' are incompatible.",
        "    Type 'amber' is not assignable to type 'teal'.",
      ].join("\n");

      const res = parseCompilerOutput(output, ROOT);

      assert.equal(res.diagnostics.length, 2);
      const [diag1, diag2] = res.diagnostics;

      assert.equal(diag1.code, "TS2345");
      assert.equal(diag2.code, "TS2345");
      assert.notEqual(diag1.sig, diag2.sig, "Fingerprints must be distinct when continuation lines differ");
      assert.match(diag1.sig, /Type 'indigo' is not assignable/);
      assert.match(diag2.sig, /Type 'amber' is not assignable/);
    });

    it("normalizes whitespace and line breaks without altering diagnostic fingerprint", () => {
      const outputStandard = [
        "src/test/file.tsx(10,5): error TS2322: Type 'A' is not assignable to type 'B'.",
        "  Type 'C' is not assignable to type 'D'.",
      ].join("\n");

      const outputFormattedDifferently = [
        "src/test/file.tsx(10,5): error TS2322: Type    'A' is not",
        "    assignable to type 'B'.",
        "\tType 'C'   is not assignable to type 'D'.",
      ].join("\n");

      const res1 = parseCompilerOutput(outputStandard, ROOT);
      const res2 = parseCompilerOutput(outputFormattedDifferently, ROOT);

      assert.equal(res1.diagnostics.length, 1);
      assert.equal(res2.diagnostics.length, 1);
      assert.equal(
        res1.diagnostics[0].sig,
        res2.diagnostics[0].sig,
        "Whitespace and line break variations must produce identical fingerprints"
      );
    });

    it("preserves fingerprint stability across line and column number shifts", () => {
      const originalLine = "src/lessons/lesson10/Lesson10.tsx(15,8): error TS2304: Cannot find name 'IngRule'.";
      const shiftedLine = "src/lessons/lesson10/Lesson10.tsx(842,95): error TS2304: Cannot find name 'IngRule'.";

      const res1 = parseCompilerOutput(originalLine, ROOT);
      const res2 = parseCompilerOutput(shiftedLine, ROOT);

      assert.equal(res1.diagnostics[0].sig, res2.diagnostics[0].sig, "Fingerprint must be invariant to line/col shifts");
      assert.equal(res1.diagnostics[0].sig, "TS2304: Cannot find name 'IngRule'.");
    });
  });

  describe("2. Baseline Write Safety & Failure Guards", () => {
    it("blocks baseline update when compiler fails or output contains unparseable lines", () => {
      const badParseResult = {
        diagnostics: [{ file: "a.ts", sig: "TS1: x", code: "TS1" }],
        totalMarkers: 2,
        unparseableLines: [{ lineIndex: 1, text: "error TS999: broken" }],
        unexpectedLines: [],
      };

      const result = validateBaselineUpdate({
        parseResult: badParseResult,
        baseline: null,
        currentTotal: 1,
        regressions: [],
      });

      assert.equal(result.canUpdate, false);
      assert.match(result.reason, /Unparseable diagnostic lines/);
    });

    it("blocks baseline update when compiler process fails (non-zero with no diagnostics)", () => {
      const emptyParseResult = {
        diagnostics: [],
        totalMarkers: 0,
        unparseableLines: [],
        unexpectedLines: [],
      };

      const result = validateBaselineUpdate({
        parseResult: emptyParseResult,
        baseline: null,
        currentTotal: 0,
        regressions: [],
        tscStatus: 1,
      });

      assert.equal(result.canUpdate, false);
      assert.match(result.reason, /Compiler failed to run/);
    });

    it("verifies physical ts-baseline.json file is never modified on update rejection", () => {
      assert.ok(fs.existsSync(BASELINE_PATH), "Baseline file must exist");
      const statBefore = fs.statSync(BASELINE_PATH);
      const contentBefore = fs.readFileSync(BASELINE_PATH, "utf8");

      // Verify validation rejects bad update
      const rejectedCheck = validateBaselineUpdate({
        parseResult: {
          diagnostics: [],
          totalMarkers: 1,
          unparseableLines: [{ lineIndex: 1, text: "error TS1: x" }],
          unexpectedLines: [],
        },
        baseline: JSON.parse(contentBefore),
        currentTotal: 0,
        regressions: [{ type: "NEW_FILE_WITH_ERRORS" }],
      });

      assert.equal(rejectedCheck.canUpdate, false);

      const statAfter = fs.statSync(BASELINE_PATH);
      const contentAfter = fs.readFileSync(BASELINE_PATH, "utf8");

      assert.equal(statBefore.mtimeMs, statAfter.mtimeMs, "Baseline mtime must not change");
      assert.equal(contentBefore, contentAfter, "Baseline content must remain identical");
    });
  });

  describe("3. Regression Detection & Ratchet Protection", () => {
    const mockBaseline = {
      totalErrors: 2,
      fileCount: 1,
      files: {
        "src/lessons/lesson10/Lesson10.tsx": {
          count: 2,
          diagnostics: {
            "TS2304: Cannot find name 'IngRule'.": 1,
            "TS2322: Type 'number' is not assignable to type 'string'.": 1,
          },
        },
      },
    };

    it("flags NEW_FILE_WITH_ERRORS when an untracked file introduces type errors", () => {
      const currentFiles = {
        "src/lessons/lesson10/Lesson10.tsx": {
          count: 2,
          diagnostics: {
            "TS2304: Cannot find name 'IngRule'.": 1,
            "TS2322: Type 'number' is not assignable to type 'string'.": 1,
          },
        },
        "src/App.tsx": {
          count: 1,
          diagnostics: {
            "TS2322: Type 'boolean' is not assignable to type 'string'.": 1,
          },
        },
      };

      const regressions = findRegressions(currentFiles, mockBaseline, 3);
      const newFileReg = regressions.find((r) => r.type === "NEW_FILE_WITH_ERRORS");

      assert.ok(newFileReg, "Must flag NEW_FILE_WITH_ERRORS");
      assert.equal(newFileReg.file, "src/App.tsx");
    });

    it("flags NEW_DIAGNOSTIC when an existing file introduces a new error signature", () => {
      const currentFiles = {
        "src/lessons/lesson10/Lesson10.tsx": {
          count: 2,
          diagnostics: {
            "TS2304: Cannot find name 'IngRule'.": 1,
            "TS9999: Brand new error in existing file.": 1,
          },
        },
      };

      const regressions = findRegressions(currentFiles, mockBaseline, 2);
      const newDiagReg = regressions.find((r) => r.type === "NEW_DIAGNOSTIC");

      assert.ok(newDiagReg, "Must flag NEW_DIAGNOSTIC");
      assert.equal(newDiagReg.file, "src/lessons/lesson10/Lesson10.tsx");
      assert.equal(newDiagReg.sig, "TS9999: Brand new error in existing file.");
    });

    it("flags DIAGNOSTIC_COUNT_INCREASED when an existing diagnostic frequency increases", () => {
      const currentFiles = {
        "src/lessons/lesson10/Lesson10.tsx": {
          count: 3,
          diagnostics: {
            "TS2304: Cannot find name 'IngRule'.": 2,
            "TS2322: Type 'number' is not assignable to type 'string'.": 1,
          },
        },
      };

      const regressions = findRegressions(currentFiles, mockBaseline, 3);
      const countIncReg = regressions.find((r) => r.type === "DIAGNOSTIC_COUNT_INCREASED");

      assert.ok(countIncReg, "Must flag DIAGNOSTIC_COUNT_INCREASED");
      assert.equal(countIncReg.count, 2);
      assert.equal(countIncReg.baselineCount, 1);
    });

    it("passes with zero regressions when current diagnostics exactly match the baseline", () => {
      const currentFiles = {
        "src/lessons/lesson10/Lesson10.tsx": {
          count: 2,
          diagnostics: {
            "TS2304: Cannot find name 'IngRule'.": 1,
            "TS2322: Type 'number' is not assignable to type 'string'.": 1,
          },
        },
      };

      const regressions = findRegressions(currentFiles, mockBaseline, 2);
      assert.equal(regressions.length, 0, "Exact baseline match must produce 0 regressions");
    });

    it("permits ratcheting down when legacy errors are resolved", () => {
      const currentFiles = {
        "src/lessons/lesson10/Lesson10.tsx": {
          count: 1,
          diagnostics: {
            "TS2304: Cannot find name 'IngRule'.": 1,
          },
        },
      };

      const regressions = findRegressions(currentFiles, mockBaseline, 1);
      assert.equal(regressions.length, 0, "Error reduction must produce 0 regressions");

      const updateCheck = validateBaselineUpdate({
        parseResult: { diagnostics: [{ file: "x", sig: "s", code: "c" }], totalMarkers: 1, unparseableLines: [], unexpectedLines: [] },
        baseline: mockBaseline,
        currentTotal: 1,
        regressions,
      });
      assert.equal(updateCheck.canUpdate, true, "Should allow updating baseline when errors decrease");
    });
  });
});
