/** Vite treats the retry query as a separate on-demand module URL. */
declare module "*?retry" {
  const moduleValue: unknown;
  export = moduleValue;
}
