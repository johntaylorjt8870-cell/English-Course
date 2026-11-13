import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = readFileSync("src/lessons/lesson62/content62.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const content62 = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

const colors = ["#7c3aed", "#2563eb", "#059669", "#dc2626", "#ea580c", "#db2777"];
const structures = content62.STRUCTURES62?.structures;
if (!Array.isArray(structures) || structures.length !== 6) {
  throw new Error("STRUCTURES62 must provide all six structures passed to StructureMatrix62");
}

// Keep this projection aligned with Section3 in Lesson62.tsx. In particular,
// verbs are passed through unchanged and therefore must exist in the source data.
const matrixItems = structures.map((structure, index) => {
  if (!structure || typeof structure !== "object") {
    throw new Error(`StructureMatrix62 source item ${index + 1} must be an object`);
  }
  return {
    id: `struct-${index + 1}`,
    name: structure.name,
    pattern: structure.pattern,
    verbs: structure.verbs,
    examples: "examples" in structure ? structure.examples : [structure.example],
    color: colors[index],
  };
});

function validateStructureMatrixItems(items) {
  if (!Array.isArray(items) || items.length !== 6) {
    throw new Error("StructureMatrix62 must receive exactly six structure items");
  }

  for (const [index, item] of items.entries()) {
    const label = `StructureMatrix62 item ${index + 1}`;
    if (!item || typeof item !== "object") throw new Error(`${label} must be an object`);
    for (const field of ["id", "name", "pattern", "color"]) {
      if (typeof item[field] !== "string" || item[field].trim() === "") {
        throw new Error(`${label}: ${field} must be a non-empty string`);
      }
    }
    if (!Array.isArray(item.verbs) || item.verbs.length === 0 || item.verbs.some((verb) => typeof verb !== "string" || verb.trim() === "")) {
      throw new Error(`${label}: verbs must be a non-empty array of non-empty strings`);
    }
    if (!Array.isArray(item.examples) || item.examples.length === 0) {
      throw new Error(`${label}: examples must be a non-empty array`);
    }
    for (const [exampleIndex, example] of item.examples.entries()) {
      if (!example || typeof example.en !== "string" || example.en.trim() === "" || typeof example.ar !== "string" || example.ar.trim() === "") {
        throw new Error(`${label}: example ${exampleIndex + 1} must provide non-empty en and ar strings`);
      }
    }
  }
}

validateStructureMatrixItems(matrixItems);
assert.deepEqual(
  matrixItems[5].verbs,
  ["apologize", "accuse", "complain", "insist"],
  "The sixth structure's verbs must stay aligned with Lesson 62's preposition-pattern summary",
);

// Prove the regression check fails on the exact omission that previously crashed
// StructureMatrix62, rather than merely passing the current fixture.
const withoutVerbs = matrixItems.map((item, index) => index === 5 ? { ...item, verbs: undefined } : item);
assert.throws(
  () => validateStructureMatrixItems(withoutVerbs),
  /StructureMatrix62 item 6: verbs must be a non-empty array of non-empty strings/,
);

console.log(`PASS: all ${matrixItems.length} StructureMatrix62 items have required data; missing verbs are rejected before build.`);
