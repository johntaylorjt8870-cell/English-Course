import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { Plugin } from "vite";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = resolve(here, "../lessonCrashFixture.tsx");

/**
 * استبدال اختبار فقط: حين يستورد App.tsx الدرس 2، تُستخدم حزمة اختبار ترمي
 * خطأ. الدرس الحقيقي يبقى كما هو في المستودع وفي dist.
 */
function crashLesson2Alias(): Plugin {
  return {
    name: "test-only-lesson2-crash-alias",
    enforce: "pre",
    resolveId(source, importer) {
      if (
        source === "./lessons/lesson2/Lesson2" &&
        importer &&
        importer.replaceAll("\\", "/").endsWith("/src/App.tsx")
      ) {
        return fixture;
      }
      return null;
    },
  };
}

export default defineConfig({
  root: here,
  base: "/",
  plugins: [crashLesson2Alias(), react(), tailwindcss()],
  build: {
    outDir: resolve(here, "../../../../node_modules/.error-boundary-browser/dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 20000,
    sourcemap: false,
  },
});
