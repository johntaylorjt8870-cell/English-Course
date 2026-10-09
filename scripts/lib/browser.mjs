import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

// Browser and its Linux libraries are npm dependencies: no external browser CDN.
export async function browser() {
  const dir = resolve('node_modules/.browser-libs');
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/libs.tar`, brotliDecompressSync(readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')));
  execFileSync('tar', ['xf', `${dir}/libs.tar`, '-C', dir]);
  return playwright.launch({
    executablePath: process.env.CHROMIUM_PATH || await chromium.executablePath(),
    args: chromium.args,
    headless: true,
    env: { ...process.env, LD_LIBRARY_PATH: `${dir}/lib:${process.env.LD_LIBRARY_PATH || ''}` },
  });
}
