# Lesson 52 — security boundary for the answer key and teacher area

> **Summary:** the student UI does not show answers before submission, but the
> answer key is **not cryptographically protected** in this deployment. The site
> is a static client-side app (GitHub Pages), the source repository is public,
> and no server-side authentication exists. The teacher gate is a **UI gate**,
> not an authentication control. Do not describe it as protecting the key.

## 1. What the UI actually guarantees

- Before submission, `TestArea52` renders no `[data-question-feedback]`, no
  correct option, no model answer and no explanation. The answer key module is
  not part of the initial bundle graph: `TestArea52` imports it with
  `import("./testKey52")` **inside `submit()`** only.
- The teacher guide is a separate chunk, imported only after the teacher gate
  reports success. The locked state renders no guide content.
- The browser audit instruments `page.on("request")` and confirms that answering
  all 25 questions issues **zero** requests for `testKey52` or `TeacherGuide52`;
  the first key request happens only after the Submit click.
- Retake clears the result and re-locks the teacher area, so the previously
  rendered guide is removed from the React tree.

These are **presentation guarantees for honest use**, not a security boundary
against a user who wants the key.

## 2. What can be requested directly

| Resource | Can it be requested before submission? | What it exposes |
|---|---|---|
| Initial app bundle | Yes, it is the app | Questions and options only; no solutions |
| `assets/testKey52-<hash>.js` | **Yes, if its URL is known** | All 25 model answers, accepted alternatives, rejected patterns and explanations |
| `assets/TeacherGuide52-<hash>.js` | **Yes, if its URL is known** | The teacher guide component |
| `src/lessons/lesson52/testKey52.ts` on GitHub | **Yes** (public repository) | The same answers in source form |

Vite generates content-hashed filenames, but the initial `index-*.js` bundle
contains the literal chunk names for both dynamic imports (this is how the
dynamic import is resolved). In the build audited here it contains
`testKey52-*.js`, `TeacherGuide52-*.js` and their retry variants. A user can
therefore search the initial bundle for the filename, or inspect the built asset
directory/repository, with no need to submit the test first.

A direct request returns HTTP 200 and executable JavaScript because GitHub Pages
serves every file in `dist/` to anyone. Probe result on the audited build:
`GET /assets/testKey52-<hash>.js` → **HTTP 200, 8868 bytes**, containing
`TEST_SOLUTIONS_52`; `GET /assets/TeacherGuide52-<hash>.js` → **HTTP 200, 7371
bytes**. This is **obscurity, not access control**.

Even if the assets were hidden perfectly, the answers are written in
`src/lessons/lesson52/testKey52.ts` in the public repository. **No client-side
change can make them secret while the source is public.**

## 3. Teacher gate: what changed and what it is not

The previous implementation compared the typed code with a literal string in
`TeacherArea52.tsx` (and the same code was repeated in documentation and tests).
That made the gate trivially readable and gave a false impression of protection.

The gate now:

- stores only a **salted SHA-256 digest** (`lesson-52-teacher-gate-v1:<code>`),
  not the plaintext code;
- verifies asynchronously with Web Crypto (`crypto.subtle.digest`);
- fails closed when Web Crypto is unavailable (non-secure context);
- shows an explicit in-UI note that this is a client-side display gate, not
  server authentication;
- keeps the code out of the PR description, docs and committed tests. Positive
  gate tests read `LESSON52_TEACHER_PASSWORD` from the environment at run time.

This raises the cost of reading the code from the source by eye. It does **not**
protect the answer key: a digest in JavaScript can be brute-forced offline, and
the answers are reachable through the routes above. It is **UI hiding**, not
authentication.

## 4. Why a real fix is not implemented here

A real fix requires one of:

1. a server/API that authenticates the teacher and returns the key only to an
   authorized session (not GitHub Pages static hosting);
2. encrypting the key at build time with a key that never reaches the client,
   plus a server-side decryption endpoint;
3. removing the answer key from the public repository and shipping it only to a
   private, authenticated service.

All three are architectural/backend changes outside this lesson PR. The project
has a shared `TeachersSpace` component and a site password gate, but both are
plain client-side gates with the same limitation; they are **not** a shared
server authentication mechanism. This PR does not invent a new auth system and
does not touch those shared components.

## 5. Verified behaviour

- `npm run audit:lesson52` — the gate rejects wrong/blank codes; the guide only
  renders when the shell reports an unlocked state.
- `npm run audit:lesson52-browser` (with `LESSON52_TEACHER_PASSWORD` supplied
  locally, never printed) — wrong code rejected; correct code reveals exactly 25
  guide entries; retake re-locks the gate; no key/guide request before submit.
- A direct HTTP request to the built key chunk returns the key; this is expected
  and documented above, not treated as a passing security property.

**Bottom line:** the lesson is safe for normal classroom flow, but a determined
visitor can extract the answer key. The password/digest gate is cosmetic.
