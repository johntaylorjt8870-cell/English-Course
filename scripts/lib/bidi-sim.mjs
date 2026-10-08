// ============================================================
// Shared BIDI rendering simulator used by scripts/audit-bidi-mixed.mjs and
// scripts/test-bidi-rendering.mjs. Walks rendered HTML, builds each logical
// paragraph with real isolate controls, runs the Unicode Bidirectional
// Algorithm (bidi-js), and checks the "English = Arabic" pair oracle:
// an English run joined to an Arabic run by an explicit separator must be
// visually ordered English first (left).
// ============================================================
import { createRequire } from "node:module";
const req = createRequire(import.meta.url);
const { JSDOM } = req("jsdom");
const bidi = req("bidi-js")();

const AR = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const LAT = /[A-Za-z]/;
const SEP = new Set(["=", ":", "–", "—", "-", "→", "←", "/", "|", "·", "(", ".", "!", "?", "،", ",", "؛", ";"]);
const BLOCK = new Set(["DIV", "P", "LI", "TD", "TH", "H1", "H2", "H3", "H4", "H5", "H6", "SECTION", "ARTICLE", "HEADER", "FOOTER", "UL", "OL", "TABLE", "TR", "TBODY", "THEAD", "BUTTON", "FORM", "NAV", "ASIDE", "BLOCKQUOTE", "DT", "DD", "FIGCAPTION", "DL", "LABEL"]);

// Boxed layout (display:block/flex/grid/inline-flex) starts its own line/paragraph.
const BOX_CLASS = /(^|\s)(block|flex|grid|inline-flex|table|flex-col|w-full)(\s|$)/;
function isBoxEl(el) {
  return BOX_CLASS.test(el.getAttribute("class") || "");
}
function isFlexRow(el) {
  const c = el.getAttribute("class") || "";
  return /(^|\s)(flex|inline-flex)(\s|$)/.test(c) && !/(^|\s)flex-col(\s|$)/.test(c);
}
function isIsoEl(el) {
  const d = el.getAttribute("dir");
  const c = el.getAttribute("class") || "";
  return d === "ltr" || d === "rtl" || /(^|\s)(font-en|ltr|ltr-row)(\s|$)/.test(c);
}
function isoDir(el) {
  const d = el.getAttribute("dir");
  if (d === "rtl") return "rtl";
  if (d === "ltr") return "ltr";
  return "ltr"; // font-en / ltr classes force LTR
}

// Build paragraphs. Each paragraph: {base, parts:[{t, iso?:'ltr'|'rtl'|null, seg}]}
function collect(root) {
  const paras = [];
  const rows = [];
  const walkRow = (el, baseDir) => {
    const hostEl = el.tagName.toLowerCase() + "." + String(el.getAttribute("class") || "").split(" ").slice(0, 3).join(".");
    const rtl = (el.getAttribute("dir") || baseDir) === "rtl";
    const idxs = [];
    const kinds = new Map(); // paragraph index -> "el" | "text"
    const psig = new Map(); // paragraph index -> child signature
    const len = new Map(); // paragraph index -> child text length
    const wide = new Map(); // paragraph index -> child is full-width (own line)
    const skipPair = new Map(); // paragraph index -> child is an interactive control or a multi-part LTR block
    const cid = new Map(); // paragraph index -> direct child identity
    const csig = (c) => (c.nodeType === 1 ? c.tagName.toLowerCase() + "." + String(c.getAttribute("class") || "").split(" ").slice(0, 3).join(".") : "#text");
    for (const ch of el.childNodes) {
      if (ch.nodeType === 1) {
        const before = paras.length;
        walk(ch, ch.getAttribute("dir") || baseDir);
        const ctrl = /^(BUTTON|INPUT|SELECT|TEXTAREA)$/.test(ch.tagName) || !!ch.querySelector?.("button,input,select,textarea") || (ch.getAttribute("dir") === "ltr" && ch.children.length > 1);
        for (let k = before; k < paras.length; k++) { idxs.push(k); kinds.set(k, "el"); skipPair.set(k, ctrl); wide.set(k, /(^|\s)(w-full|basis-full)(\s|$)/.test(ch.getAttribute?.("class") || "")); psig.set(k, csig(ch)); cid.set(k, ch); len.set(k, (ch.textContent || "").trim().length); }
      } else if (ch.nodeType === 3 && ch.textContent.trim()) {
        kinds.set(paras.length, "text"); psig.set(paras.length, "#text"); cid.set(paras.length, ch); len.set(paras.length, ch.textContent.trim().length);
        idxs.push(paras.length);
        paras.push({ base: baseDir, parts: [{ t: ch.textContent, iso: null }] });
      }
    }
    const sigs = el.childNodes ? [...el.childNodes].filter((c) => c.nodeType === 1 || (c.nodeType === 3 && c.textContent.trim())).map((c) => (c.nodeType === 1 ? c.tagName.toLowerCase() + "." + String(c.getAttribute("class") || "").split(" ").slice(0, 3).join(".") : "#text")) : [];
    rows.push({ rtl, idxs, kinds, psig, len, cid, skipPair, wide, host: hostEl, sigs: sigs.filter((_, k) => true) });
  };
  const walk = (el, baseDir) => {
    let cur = null;
    const flush = () => { if (cur && cur.parts.length) paras.push(cur); cur = null; };
    const ensure = () => { if (!cur) cur = { base: baseDir, parts: [], host: el }; return cur; };
    const inline = (node, inIso) => {
      for (const ch of node.childNodes) {
        if (ch.nodeType === 3) {
          ensure().parts.push({ t: ch.textContent, iso: inIso });
        } else if (ch.nodeType === 1) {
          const tag = ch.tagName;
          const dirAttr = ch.getAttribute("dir");
          const nb = dirAttr ? dirAttr : baseDir;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "SVG") continue;
          if (isFlexRow(ch) && !inIso) {
            flush();
            walkRow(ch, nb);
          } else if ((BLOCK.has(tag) || isBoxEl(ch)) && !inIso) {
            flush();
            walk(ch, nb);
          } else if (isIsoEl(ch)) {
            const dir = isoDir(ch);
            const p = ensure();
            p.parts.push({ t: "", open: dir });
            inline(ch, dir);
            p.parts.push({ t: "", close: true });
          } else {
            inline(ch, inIso);
          }
        }
      }
    };
    inline(el, null);
    flush();
  };
  walk(root, "rtl");
  return { paras, rows };
}

// Logical stripped string + per-char segment id + isolate map.
function linearize(p) {
  let s = "";
  const seg = [];
  let segId = 0;
  let stack = [];
  let lastKind = null;
  const pushChar = (c, kind) => {
    if (kind !== lastKind) segId++;
    lastKind = kind;
    s += c;
    seg.push(segId);
  };
  // Generate control-string too
  let ctl = "";
  const ctlOf = (c) => ctl; // placeholder
  for (const part of p.parts) {
    if (part.open) {
      segId++; lastKind = null;
      stack.push(part.open);
      ctl += part.open === "rtl" ? "\u2067" : "\u2066";
      continue;
    }
    if (part.close) {
      segId++; lastKind = null;
      stack.pop();
      ctl += "\u2069";
      continue;
    }
    for (const c of part.t) {
      const kind = c === " " ? "sp" : AR.test(c) ? "ar" : LAT.test(c) ? "lat" : "ot" + stack.length;
      if (kind !== lastKind) segId++;
      lastKind = kind;
      s += c;
      seg.push(segId);
      ctl += c;
    }
  }
  return { s, seg, ctl };
}

// Visual order of logical chars (indices into s), via UBA with real isolates.
function visualOrder(p) {
  // Rebuild control string with isolate markers inserted at exact positions.
  let full = "";
  const map = []; // map full index -> s index or -1
  let si = 0;
  for (const part of p.parts) {
    if (part.open) { full += part.open === "rtl" ? "\u2067" : "\u2066"; map.push(-1); continue; }
    if (part.close) { full += "\u2069"; map.push(-1); continue; }
    for (let ci = 0; ci < part.t.length; ci++) { full += part.t[ci]; map.push(si++); }
  }
  const lv = bidi.getEmbeddingLevels(full, p.base);
  const idx = bidi.getReorderedIndices(full, lv);
  const order = [];
  for (const i of idx) if (map[i] >= 0) order.push(map[i]);
  return order; // s-indices, visual left→right
}

function analyzeParagraph(p) {
  const { s, seg } = linearize(p);
  if (!s.trim()) return null;
  const order = visualOrder(p);
  const vis = new Array(s.length);
  order.forEach((si, pos) => (vis[si] = pos));
  const visual = order.map((i) => s[i]).join("");
  const violations = [];
  const hostSig = (p.host && p.host.tagName ? p.host.tagName.toLowerCase() + "." + String(p.host.getAttribute && p.host.getAttribute("class") || "").split(" ").slice(0, 3).join(".") : "");
  // Find Arabic runs and the Latin run immediately before them, separated only by
  // explicit separators (no bare space) — "English = Arabic" pairs.
  const arRuns = [];
  for (let i = 0; i < s.length; ) {
    if (AR.test(s[i])) {
      let j = i;
      while (j + 1 < s.length && (AR.test(s[j + 1]) || (s[j + 1] === " " && j + 2 < s.length && AR.test(s[j + 2])))) j++;
      arRuns.push([i, j]);
      i = j + 1;
    } else i++;
  }
  let pairs = 0;
  for (const [as, ae] of arRuns) {
    let q = as - 1;
    let sawSep = false;
    let sepSeen = false;
    while (q >= 0 && s[q] === " ") q--;
    if (q >= 0 && SEP.has(s[q])) {
      // A "(" only joins English to Arabic when the Arabic run is closed by ")"
      // right away — «Past Perfect (الماضي المثالي)». Otherwise the paren opens a
      // whole Arabic clause («when / while (الدرسان 25 و26)») that belongs to the
      // RTL flow, and LatinRuns leaves the English isolated on its own. Mirrors
      // the rule in src/shared/bidi.tsx (splitMixedText).
      if (s[q] === "(" && s[ae + 1] !== ")") continue;
      sawSep = true;
      q--;
      while (q >= 0 && s[q] === " ") q--;
    }
    // Only explicit separators right before the Arabic (no bare-space pair).
    if (!sawSep) continue;
    // Latin run ending at q
    let ls = q;
    while (ls - 1 >= 0 && /[A-Za-z0-9 '’.&+\/#-]/.test(s[ls - 1]) && !AR.test(s[ls - 1])) ls--;
    while (ls <= q && s[ls] === " ") ls++;
    if (ls > q || !/[A-Za-z]/.test(s.slice(ls, q + 1))) continue;
    pairs++;
    const lpos = []; for (let k = ls; k <= q; k++) lpos.push(vis[k]);
    const apos = []; for (let k = as; k <= ae; k++) apos.push(vis[k]);
    const okOrder = Math.max(...lpos) < Math.min(...apos);
    if (!okOrder) violations.push({ latin: s.slice(ls, q + 1).trim(), arabic: s.slice(as, ae + 1), sig: "para:" + hostSig });
  }
  // Alternative oracle: «English A أم English B؟» — the Arabic connector (أم/أو)
  // must stay visually between the two English alternatives, and both
  // alternatives keep their written (left→right) order inside the group.
  const ALT_CONNECTORS = new Set(["أم", "أو"]);
  for (const [as, ae] of arRuns) {
    const connector = s.slice(as, ae + 1).trim();
    if (!ALT_CONNECTORS.has(connector)) continue;
    // Latin run right before the connector (spaces only in between).
    let q = as - 1;
    while (q >= 0 && s[q] === " ") q--;
    const le = q;
    while (q >= 0 && !AR.test(s[q]) && /[A-Za-z0-9 '’.&+\/#-]/.test(s[q])) q--;
    const ls = q + 1;
    if (le < ls || !/[A-Za-z]/.test(s.slice(ls, le + 1))) continue;
    // Latin run right after the connector (spaces only in between).
    let r = ae + 1;
    while (r < s.length && s[r] === " ") r++;
    let re = r;
    while (re < s.length && !AR.test(s[re]) && /[A-Za-z0-9 '’.&+\/#-]/.test(s[re])) re++;
    if (re <= r || !/[A-Za-z]/.test(s.slice(r, re))) continue;
    // Visual positions of the run, boundary spaces excluded: at an isolate edge
    // the UBA parks a separating space at the far side of the line, so counting
    // it would report a reversal even when both alternatives are correctly
    // ordered (e.g. «✓ before أو after مرة واحدة على الأقل.»).
    const posOf = (a, b) => {
      const out = [];
      for (let k = a; k < b; k++) if (s[k] !== " ") out.push(vis[k]);
      return out;
    };
    const before = posOf(ls, le + 1);
    const mid = posOf(as, ae + 1);
    const after = posOf(r, re);
    if (!before.length || !mid.length || !after.length) continue;
    const okOrder = Math.max(...before) < Math.min(...mid) && Math.max(...mid) < Math.min(...after);
    if (!okOrder) violations.push({ latin: s.slice(ls, re).trim(), arabic: connector, sig: "alts:" + hostSig });
  }
  return { logical: s.replace(/\s+/g, " ").trim(), visual: visual.replace(/\s+/g, " ").trim(), pairs, violations };
}

const lastLetter = (t) => t.replace(/\s+$/, "").slice(-1);
const firstLetter = (t) => t.replace(/^\s+/, "").charAt(0);
let SHARED = null;
export function analyzeHtml(html) {
  if (!SHARED) SHARED = new JSDOM(`<!doctype html><body></body>`);
  const body = SHARED.window.document.body;
  body.innerHTML = html;
  const { paras, rows } = collect(body);
  const out = [];
  const perPara = new Map();
  for (const p of paras) {
    const r = analyzeParagraph(p);
    if (r) out.push(r);
    perPara.set(p, r);
  }
  // Flex rows: in an RTL row the first item sits at the right, so an English
  // item followed by an Arabic item renders Arabic-first.
  for (const row of rows) {
    if (!row.rtl) continue;
    const items = row.idxs.map((k) => paras[k]);
    // In an LTR flex row the logical order is the visual order: no reversal possible.
    if (!row.rtl) return out;
    for (let i = 0; i + 1 < items.length; i++) {
      // Only element-to-element boundaries are semantic units (chip/card + its
      // translation). Bare text runs inside one sentence flow read correctly RTL.
      if (row.kinds.get(row.idxs[i]) !== "el" || row.kinds.get(row.idxs[i + 1]) !== "el") continue;
      // Pairs inside one child are judged by that child's own analysis, not by the row.
      if (row.cid.get(row.idxs[i]) === row.cid.get(row.idxs[i + 1])) continue;
      // Buttons/controls and multi-part LTR blocks are not label/gloss items.
      if (row.skipPair.get(row.idxs[i]) || row.skipPair.get(row.idxs[i + 1])) continue;
      // Full-width items start their own line in a wrapping flex row: no same-line pair.
      if (row.wide.get(row.idxs[i]) || row.wide.get(row.idxs[i + 1])) continue;
      // Column blocks (rail + main, cards) are layout, not inline label/gloss pairs.
      if (row.len.get(row.idxs[i]) > 80 || row.len.get(row.idxs[i + 1]) > 80) continue;
      const a = items[i].parts.map((x) => x.t || "").join("");
      const b = items[i + 1].parts.map((x) => x.t || "").join("");
      const la = lastLetter(a), fb = firstLetter(b);
      if (/[A-Za-z]/.test(la) && /[A-Za-z]/.test(a) && AR.test(fb)) {
        out.push({ logical: a.trim() + " | " + b.trim(), visual: "(row)", pairs: 1, violations: [{ latin: a.trim(), arabic: b.trim(), sig: "row:" + (row.psig.get(row.idxs[i]) || "?") + " >> " + (row.psig.get(row.idxs[i + 1]) || "?") + " in " + (row.host || "") }] });
      }
    }
  }
  return out;
}
