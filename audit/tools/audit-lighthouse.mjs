/**
 * Mediana de 3 execuções Lighthouse por página.
 * Executar a partir de audit/tools: node audit-lighthouse.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

import { AUDIT_BASE_URL as BASE_URL } from "./audit.shared.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const OUT = join(ROOT, "audit", "review");
const RUNS = 3;

const PAGES = [
  { id: "home", path: "/" },
  { id: "convert", path: "/produtos/convert" },
  { id: "contact", path: "/solicitar-demonstracao" },
];

mkdirSync(OUT, { recursive: true });

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

async function runOnce(url, chrome) {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance"],
    formFactor: "desktop",
    screenEmulation: { disabled: true },
  });

  const audits = result.lhr.audits;
  return {
    performance: Math.round((result.lhr.categories.performance?.score ?? 0) * 100),
    lcpMs: audits["largest-contentful-paint"]?.numericValue ?? null,
    lcpElement:
      audits["largest-contentful-paint-element"]?.details?.items?.[0]?.node
        ?.snippet ?? null,
    tbtMs: audits["total-blocking-time"]?.numericValue ?? null,
    cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
    fcpMs: audits["first-contentful-paint"]?.numericValue ?? null,
    bootup: audits["bootup-time"]?.details?.items?.slice(0, 5) ?? [],
    unusedJs: audits["unused-javascript"]?.details?.items?.slice(0, 5) ?? [],
  };
}

let chrome;

try {
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
  });

  const report = {
    environment: {
      baseUrl: BASE_URL,
      runsPerPage: RUNS,
      formFactor: "desktop",
      screenEmulation: "disabled",
      throttling: "Lighthouse simulated (RTT 150ms, throughput 1.6Mbps down)",
      cache: "Lighthouse clears storage between runs",
      note: "Medições locais de laboratório — não representam RUM.",
    },
    pages: {},
  };

  for (const page of PAGES) {
    const url = `${BASE_URL}${page.path}`;
    const runs = [];

    for (let i = 0; i < RUNS; i += 1) {
      runs.push(await runOnce(url, chrome));
    }

    report.pages[page.id] = {
      url,
      runs,
      median: {
        performance: median(runs.map((run) => run.performance)),
        lcpMs: median(runs.map((run) => run.lcpMs ?? 0)),
        tbtMs: median(runs.map((run) => run.tbtMs ?? 0)),
        cls: median(runs.map((run) => run.cls ?? 0)),
        fcpMs: median(runs.map((run) => run.fcpMs ?? 0)),
      },
      lcpElementSamples: [
        ...new Set(runs.map((run) => run.lcpElement).filter(Boolean)),
      ],
      bootupSamples: runs[0]?.bootup ?? [],
      unusedJsSamples: runs[0]?.unusedJs ?? [],
    };
  }

  writeFileSync(
    join(OUT, "lighthouse-median.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  if (chrome) {
    try {
      await chrome.kill();
    } catch {
      // No Windows o Chrome às vezes ainda segura a pasta temporária.
    }
  }

  if (process.exitCode === 1) {
    process.exit(1);
  }
}
