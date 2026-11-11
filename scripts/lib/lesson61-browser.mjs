import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

export async function browser61() {
  const work = "node_modules/.lesson61-browser";
  mkdirSync(work, { recursive: true });
  if (!existsSync(`${work}/lib`)) {
    writeFileSync(`${work}/al2023.tar`, brotliDecompressSync(readFileSync("node_modules/@sparticuz/chromium/bin/al2023.tar.br")));
    execFileSync("tar", ["-xf", `${work}/al2023.tar`, "-C", work]);
  }
  process.env.LD_LIBRARY_PATH = `${process.cwd()}/${work}/lib:${process.env.LD_LIBRARY_PATH || ""}`;
  const dist = join(process.cwd(), "dist");
  if (!existsSync(join(dist, "index.html"))) throw new Error("Build the production app first: npm run build");
  const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png" };
  const server = createServer((req, res) => {
    const raw = (req.url || "/").split("?")[0];
    const rel = raw.startsWith("/English-Course/") ? raw.slice(16) : raw.replace(/^\/+/, "");
    const path = normalize(join(dist, rel || "index.html"));
    const file = path.startsWith(dist) && existsSync(path) && statSync(path).isFile() ? path : join(dist, "index.html");
    res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const browser = await playwright.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true });
  return { browser, base: `http://127.0.0.1:${server.address().port}/English-Course/`, close: async () => { await browser.close(); await new Promise((resolve) => server.close(resolve)); } };
}
export async function prepare61(page) {
  await page.addInitScript(() => localStorage.setItem("englishwithsomer-site-unlocked", "unlocked"));
}
export async function go61(page, id) {
  let button = page.locator(`button[data-step-nav="${id}"]:visible`);
  if (!(await button.count())) {
    await page.getByRole("button", { name: "فهرس الدرس" }).click();
    button = page.locator(`button[data-step-nav="${id}"]:visible`);
  }
  await button.first().click();
  await page.locator(`#l61-main [data-area="${id}"]`).waitFor();
}
