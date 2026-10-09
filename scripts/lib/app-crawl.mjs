import { mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { activityInstrumentation } from './activity-observation.mjs';

const req = createRequire(import.meta.url);
const esbuild = req('esbuild');
const { JSDOM } = req('jsdom');
export const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/**
 * Mount the real <App/> in jsdom with audit-only provenance attributes
 * (data-audit-owner / data-audit-control) injected at build time. No production
 * source, event or state is modified.
 */
export async function loadInstrumentedApp() {
  const dir = join(root, 'node_modules', '.activity-audit');
  mkdirSync(dir, { recursive: true });
  const outFile = join(dir, `app-${process.pid}-${Date.now()}.mjs`);
  await esbuild.build({
    absWorkingDir: root,
    plugins: [activityInstrumentation(root)],
    stdin: {
      contents: `export { default as App } from ${JSON.stringify(join(root, 'src/App.tsx'))};
export { createRoot } from "react-dom/client";
import React from "react"; export { React };
export { flushSync } from "react-dom";`,
      resolveDir: root, loader: 'tsx',
    },
    bundle: true, platform: 'node', format: 'esm', outfile: outFile, jsx: 'automatic', packages: 'external', logLevel: 'error',
  });
  const M = await import(pathToFileURL(outFile).href);
  rmSync(outFile, { force: true });
  return M;
}

const GLOBALS = ['window', 'document', 'navigator', 'HTMLElement', 'Element', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent', 'HTMLInputElement', 'HTMLTextAreaElement', 'getComputedStyle', 'localStorage', 'sessionStorage', 'requestAnimationFrame', 'cancelAnimationFrame', 'MutationObserver', 'CustomEvent', 'HashChangeEvent', 'Text', 'Comment', 'DocumentFragment', 'HTMLDivElement', 'SVGElement', 'DOMParser', 'Audio', 'HTMLAudioElement'];

/** Install the jsdom globals the App expects. Returns {dom, win, tick, findNext}. */
export function installDom() {
  const dom = new JSDOM(`<!doctype html><html dir="rtl"><body></body></html>`, { url: 'http://localhost/', pretendToBeVisual: true });
  const win = dom.window;
  for (const k of GLOBALS) if (win[k] !== undefined) Object.defineProperty(globalThis, k, { value: win[k], configurable: true });
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  const stub = (o, k, v) => { if (!o[k]) o[k] = v; };
  stub(win.Element.prototype, 'scrollTo', () => {});
  stub(win.Element.prototype, 'scrollIntoView', () => {});
  stub(win, 'scrollTo', () => {});
  stub(win, 'matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
  stub(win, 'IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
  stub(win, 'ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });
  globalThis.window.speechSynthesis = globalThis.window.speechSynthesis || { speak() {}, cancel() {}, getVoices: () => [] };
  win.localStorage.setItem('englishwithsomer-site-unlocked', 'unlocked');
  const tick = (ms = 15) => new Promise((r) => setTimeout(r, ms));
  const NEXT_RX = /التالي|التالية|Next/;
  const findNext = () => [...document.querySelectorAll('button')].find((b) => !b.disabled && NEXT_RX.test(b.textContent || '') && !/السابق/.test(b.textContent || ''));
  return { dom, win, tick, findNext };
}

/**
 * Walk every lesson, stepping forward with «التالي». `onStep` receives the live
 * document plus lesson/step context and may interact with it; the crawler
 * re-reads the DOM afterwards.
 *
 * Known reachability limit (reported, never hidden): the crawler only clicks
 * «التالي» and never answers a gate, so a lesson whose navigation requires an
 * answer stops early. `terminatedBy` records why each lesson stopped.
 */
export async function crawlLessons(M, { lessons, onStep, maxSteps = 200 }) {
  const { win, tick, findNext } = installDom();
  const stepsWalked = {};
  const crawlTermination = {};
  for (const n of lessons) {
    win.location.hash = `#/lesson/${n}`;
    document.body.innerHTML = '<div id="root"></div>';
    const host = document.getElementById('root');
    const r = M.createRoot(host);
    M.flushSync(() => r.render(M.React.createElement(M.App)));
    win.dispatchEvent(new win.HashChangeEvent('hashchange'));
    await tick(40);
    let prev = null, steps = 0, terminatedBy = 'step-cap';
    for (let i = 0; i < maxSteps; i++) {
      const html = host.innerHTML;
      if (html === prev) { terminatedBy = 'html-stable'; break; }
      prev = html; steps = i + 1;
      if (onStep) await onStep({ document, window: win, lesson: n, step: i + 1, host, flush: M.flushSync, tick });
      const b = findNext();
      if (!b) { terminatedBy = 'no-enabled-next-control'; break; }
      b.click();
      await tick(15);
      if (host.innerHTML === prev) terminatedBy = 'html-stable-after-next';
    }
    stepsWalked[n] = steps;
    crawlTermination[n] = terminatedBy;
    M.flushSync(() => r.unmount());
  }
  return { stepsWalked, crawlTermination };
}
