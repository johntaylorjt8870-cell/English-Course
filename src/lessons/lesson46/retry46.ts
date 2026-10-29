/**
 * ESM loaders can cache a failed fetch. If the browser reports the failed
 * same-origin module URL (or records it in Resource Timing), retry that exact
 * built URL with a fresh query string. Never accept a different origin/module.
 * The statically bundled retry entry is still available when no URL is exposed.
 */
export function retryModuleUrl46(error: unknown, moduleName: "testKey46" | "TeacherGuide46", attempt: number): string | null {
  if (typeof window === "undefined") return null;
  const message = error instanceof Error ? error.message : String(error ?? "");
  const urls = message.match(/https?:\/\/[^\s'"<>]+/g) ?? [];
  const resources = typeof performance !== "undefined" ? performance.getEntriesByType("resource").map((entry) => entry.name).reverse() : [];
  for (const candidate of [...urls, ...resources]) {
    try {
      const url = new URL(candidate.replace(/[)\]},;]+$/, ""), window.location.href);
      const file = url.pathname.split("/").pop() ?? "";
      if (url.origin !== window.location.origin || !file.startsWith(moduleName)) continue;
      url.searchParams.set("lesson46Retry", `${Date.now()}-${attempt}`);
      return url.href;
    } catch { /* An unrelated resource or error string, not a module URL. */ }
  }
  return null;
}
