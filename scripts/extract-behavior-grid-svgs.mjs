import fs from "fs";

const transcriptPath =
  "C:/Users/Novigo/.cursor/projects/c-iungo-website/agent-transcripts/4b58a4f8-f842-4f8f-adc3-dafc5eb6c996/4b58a4f8-f842-4f8f-adc3-dafc5eb6c996.jsonl";

const content = fs.readFileSync(transcriptPath, "utf8");

const patterns = [
  /viewBox="0 0 395 288"/g,
  /viewBox="0 0 395 289"/g,
  /viewBox="0 0 395 301"/g,
];

for (const pattern of patterns) {
  const matches = [...content.matchAll(pattern)];
  console.log(pattern.source, "count:", matches.length);
}

function extractSvgAt(index) {
  const start = content.indexOf("<svg", index);
  if (start === -1) return null;
  const end = content.indexOf("</svg>", start) + 6;
  return content.slice(start, end);
}

// Find all 395-width SVGs
const indices = [];
let searchFrom = 0;
while (true) {
  const idx = content.indexOf('viewBox="0 0 395', searchFrom);
  if (idx === -1) break;
  indices.push(idx);
  searchFrom = idx + 1;
}

console.log("\nAll 395 viewBox indices:", indices.length);
indices.forEach((idx, i) => {
  const svg = extractSvgAt(idx - 50);
  const header = svg?.slice(0, 120);
  console.log(i, "at", idx, "len", svg?.length, header);
});
