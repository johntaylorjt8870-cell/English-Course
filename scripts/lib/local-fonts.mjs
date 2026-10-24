// ============================================================
// خطوط التدقيق البصري — تُقدَّم محليًا للمتصفح أثناء الفحص فقط.
//
// السبب: الشبكة الرملية لا تصل إلى fonts.googleapis.com، وصور
// الشاشة بخطوط بديلة لا تصلح للحكم على التصميم. هنا نبني CSS
// بـ@font-face يشير إلى ملفات @fontsource المحلية (data URI)،
// فتظهر الشاشات بخطوط المشروع الحقيقية: Changa للعناوين،
// Rubik للنص واللاتينية، وNoto Color Emoji للرموز التعبيرية.
//
// أداة تطوير فقط (scripts/) ولا تدخل حزمة التطبيق.
// ============================================================

import { existsSync, readdirSync, readFileSync } from "node:fs";

const RUBIK = "node_modules/@fontsource/rubik/files";
const CHANGA = "node_modules/@fontsource/changa/files";
const EMOJI_DIR = "node_modules/@fontsource/noto-color-emoji/files";

const ARABIC_RANGE =
  "U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+08A0-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FEFF";
const LATIN_RANGE =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";

const dataUri = (path) => `data:font/woff2;base64,${readFileSync(path).toString("base64")}`;

function face(family, path, weight, range) {
  if (!existsSync(path)) return "";
  return `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};font-display:block;src:url(${dataUri(
    path,
  )}) format("woff2")${range ? `;unicode-range:${range}` : ""}}`;
}

/**
 * CSS جاهز للحقن قبل تحميل أي صفحة.
 * يعيد null إذا لم تكن ملفات الخطوط المحلية مثبّتة (تدقيق بخطوط بديلة).
 */
export function localFontCss() {
  if (!existsSync(RUBIK)) return null;
  const blocks = [];

  for (const w of [400, 500, 600, 700, 800]) {
    blocks.push(face("Rubik", `${RUBIK}/rubik-arabic-${w}-normal.woff2`, w, ARABIC_RANGE));
    blocks.push(face("Rubik", `${RUBIK}/rubik-latin-${w}-normal.woff2`, w, LATIN_RANGE));
  }
  for (const w of [500, 600, 700, 800]) {
    blocks.push(face("Changa", `${CHANGA}/changa-arabic-${w}-normal.woff2`, w, ARABIC_RANGE));
    blocks.push(face("Changa", `${CHANGA}/changa-latin-${w}-normal.woff2`, w, LATIN_RANGE));
  }

  if (existsSync(EMOJI_DIR)) {
    for (const file of readdirSync(EMOJI_DIR).filter((f) => /-400-normal\.woff2$/.test(f))) {
      blocks.push(face("Noto Color Emoji", `${EMOJI_DIR}/${file}`, 400));
    }
    // خريطة الخط: العربية/اللاتينية من Rubik، والرموز من Noto Color Emoji
    const EMOJI_FAMILY = '"Noto Color Emoji"';
    blocks.push(
      `.lesson32 .font-head, .lesson32 h1, .lesson32 h2, .lesson32 h3 { font-family: "Changa", "Rubik", ${EMOJI_FAMILY}, sans-serif !important; }`,
      `.lesson32, .lesson32 .font-body, .lesson32 .l32-deck-ar, .lesson32 .l32-teach li { font-family: "Rubik", ${EMOJI_FAMILY}, sans-serif !important; }`,
      `.lesson32 .font-en, .lesson32 .l32-en-display, .lesson32 .l32-deck-en { font-family: "Rubik", ${EMOJI_FAMILY}, sans-serif !important; }`,
      `body, body * { font-family: "Rubik", ${EMOJI_FAMILY}, sans-serif; }`,
      `html, body { font-synthesis: none; }`,
    );
  }

  return blocks.filter(Boolean).join("\n");
}

export default localFontCss;
