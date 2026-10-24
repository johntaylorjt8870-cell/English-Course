// Shared checks for editorial source/provenance copy in rendered student UI.
// Inspect rendered text and accessible names—not repository files or data-* trace metadata.

const EDITORIAL_SOURCE_RULES = [
  { id: "arabic-source-reference", pattern: /(?:المصدر|المصادر|مصدر)/iu },
  { id: "english-source-reference", pattern: /\bsource\b/iu },
  { id: "ledger-reference", pattern: /\bledger\b/iu },
  {
    id: "source-or-ledger-filename",
    pattern: /(?:source|ledger)[\p{L}\p{N}_.-]*\.(?:tsx?|jsx?|mjs|cjs|md|json)(?=$|[^\p{L}\p{N}])/iu,
  },
  {
    id: "numbered-arabic-internal-section",
    pattern: /(?:^|[^\p{L}])(?:القسم|قسم)\s*(?:رقم\s*)?[#:]?\s*[0-9٠-٩]+/u,
  },
  {
    id: "numbered-english-internal-section",
    pattern: /(?:^|[^\p{L}])(?:section|part|division)\s*(?:#|no\.?\s*)?\s*[0-9٠-٩]+/iu,
  },
  { id: "numbered-section-symbol", pattern: /§\s*[0-9٠-٩]+/u },
];

function cleanCopy(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

/**
 * Collect strings a learner can read or hear from a rendered DOM subtree.
 * `data-*` trace IDs are intentionally not read; they are internal metadata.
 */
export function collectStudentFacingCopy(root) {
  if (!root) return [];
  const normalizeCopy = (value) => String(value ?? "")
    .normalize("NFKC")
    .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
  const attributes = [
    "aria-label", "aria-description", "aria-valuetext", "title", "alt",
    "placeholder", "data-tooltip", "data-hint",
  ];
  const doc = root.ownerDocument ?? root;
  const view = doc.defaultView;
  const showText = view?.NodeFilter?.SHOW_TEXT ?? 4;
  const values = [];
  const walker = doc.createTreeWalker(root, showText);
  let node = walker.nextNode();
  while (node) {
    const text = normalizeCopy(node.nodeValue);
    if (text) values.push(text);
    node = walker.nextNode();
  }

  const elements = [];
  if (root.nodeType === 1) elements.push(root);
  elements.push(...(root.querySelectorAll?.("*") ?? []));
  for (const element of elements) {
    for (const attribute of attributes) {
      const value = normalizeCopy(element.getAttribute?.(attribute));
      if (value) values.push(value);
    }
  }
  return values;
}

/** Return one entry per distinct rendered string that exposes editorial source structure. */
export function findEditorialSourceLabels(copy) {
  const distinct = new Map();
  for (const raw of Array.isArray(copy) ? copy : [copy]) {
    const text = cleanCopy(raw);
    if (!text) continue;
    const rules = EDITORIAL_SOURCE_RULES.filter(({ pattern }) => pattern.test(text)).map(({ id }) => id);
    if (rules.length === 0) continue;
    const existing = distinct.get(text);
    if (existing) {
      existing.rules = [...new Set([...existing.rules, ...rules])];
    } else {
      distinct.set(text, { text, rules });
    }
  }
  return [...distinct.values()];
}

/** Scan rendered DOM directly, useful to both jsdom and browser-backed audits. */
export function auditRenderedStudentCopy(root) {
  return findEditorialSourceLabels(collectStudentFacingCopy(root));
}
