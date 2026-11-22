// ============================================================
// حِزم esbuild لاختبارات حدّ الأخطاء (jsdom فقط).
//
//   - حزمة وحدوية: LessonErrorBoundary + مكوّنات اختبار ترمي أخطاء.
//   - حزمة تكامل: تطبيق App الحقيقي، مع استبدال حزمة الدرس 2 عند البناء
//     بمكوّن اختبار يرمي خطأ مرة واحدة. لا يوجد أي تعديل على كود الإنتاج
//     ولا أي آلية حقن أخطاء دائمة.
//
// Fix #4: لم يعد App.tsx يستورد الدرس 2 مباشرة؛ الاستيراد انتقل إلى
// src/lessons/loaders.ts (React.lazy). لذلك يطابق الـ plugin مستورد
// loaders.ts بدل App.tsx.
// ============================================================
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import esbuild from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const outDir = join(root, "node_modules", ".error-boundary-tests");

const ASSET_LOADERS = {
  ".css": "empty",
  ".woff": "empty",
  ".woff2": "empty",
  ".png": "empty",
  ".jpg": "empty",
  ".jpeg": "empty",
  ".svg": "empty",
};

async function build(name, contents, plugins = []) {
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, `${name}-${process.pid}.mjs`);
  await esbuild.build({
    absWorkingDir: root,
    stdin: { contents, resolveDir: root, loader: "tsx", sourcefile: `${name}.tsx` },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: outFile,
    jsx: "automatic",
    packages: "external",
    loader: ASSET_LOADERS,
    logLevel: "error",
    plugins,
  });
  try {
    return await import(pathToFileURL(outFile).href);
  } finally {
    rmSync(outFile, { force: true });
  }
}

export function loadBoundaryUnitBundle() {
  const boundary = join(root, "src/shared/LessonErrorBoundary.tsx");
  const fixtures = join(root, "scripts/fixtures/error-boundary/boundaryFixtures.tsx");
  return build(
    "boundary-unit",
    `
import React from "react";
export { React };
export { createRoot } from "react-dom/client";
export { act } from "react";
export { LessonErrorBoundary } from ${JSON.stringify(boundary)};
export * from ${JSON.stringify(fixtures)};
`,
  );
}

export function loadAppWithCrashFixtureBundle() {
  const app = join(root, "src/App.tsx");
  const fixture = join(root, "scripts/fixtures/error-boundary/lessonCrashFixture.tsx");

  // استبدال حزمة الدرس 2 عند البناء فقط. المسار الحقيقي للدرس 2 يبقى كما هو
  // في مستودع الإنتاج؛ هذا الاستبدال موجود داخل حزمة اختبار مؤقتة في node_modules.
  const crashLesson2Alias = {
    name: "test-only-lesson2-crash-alias",
    setup(buildApi) {
      buildApi.onResolve({ filter: /^\.\/lesson2\/Lesson2$/ }, (args) => {
        // Fix #4: import("../lessons/loaders.ts") هو المستورد الحالي؛ قبلها كان App.tsx.
        if (!args.importer.endsWith("/src/lessons/loaders.ts")) return null;
        return { path: fixture };
      });
    },
  };

  return build(
    "app-crash",
    `
import React from "react";
export { React };
export { createRoot } from "react-dom/client";
export { act } from "react";
export { default as App } from ${JSON.stringify(app)};
export { resetLessonCrashFixture, setLessonCrashFixtureRecovered } from ${JSON.stringify(fixture)};
`,
    [crashLesson2Alias],
  );
}
