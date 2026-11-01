/**
 * Browsers cache a failed dynamic import for the life of the page. When the
 * failure message or Resource Timing exposes the same-origin module URL, retry
 * that exact URL with a fresh query string. Never accept another origin or a
 * different module.
 */
export function retryModuleUrl51(
  error: unknown,
  moduleName: "testKey51" | "TeacherGuide51",
  attempt: number
): string | null {
  if (typeof window === "undefined") return null;
  const message = error instanceof Error ? error.message : String(error ?? "");
  const urls = message.match(/https?:\/\/[^\s'"<>]+/g) ?? [];
  const resources =
    typeof performance !== "undefined"
      ? performance
          .getEntriesByType("resource")
          .map((entry) => entry.name)
          .reverse()
      : [];
  for (const candidate of [...urls, ...resources]) {
    try {
      const url = new URL(candidate.replace(/[)\]}>,;]+$/, ""), window.location.href);
      const file = url.pathname.split("/").pop() ?? "";
      if (url.origin !== window.location.origin || !file.startsWith(moduleName)) continue;
      url.searchParams.set("lesson51Retry", `${Date.now()}-${attempt}`);
      return url.href;
    } catch {
      /* An unrelated resource or error string, not a module URL. */
    }
  }
  return null;
}
