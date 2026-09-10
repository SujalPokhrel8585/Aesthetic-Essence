const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const exts = new Set([".ts", ".tsx", ".html", ".xml", ".txt", ".js", ".mjs", ".cjs", ".json", ".md", ".css"]);

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".git" || e.name === "dist") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (exts.has(path.extname(e.name))) out.push(p);
  }
}

const SKIP = new Set([
  "scripts/audit-rebrand.cjs",
  "Details.txt",
  "dev_output.log",
  "dev_server_test.log",
]);

const allFiles = [];
walk(root, allFiles);
const files = allFiles.filter((f) => {
  const rel = path.relative(root, f).replace(/\\/g, "/"); // normalize for Windows
  return !SKIP.has(rel);
});

const patterns = [
  "lotus", "Lotus", "LOTUS",
  "9765974518", "9765 974518",
  "Boudha", "boudha", "BOUDHA",
  "Siddhartha", "siddhartha",
  "Saroj", "saroj", "Alsha", "alsha", "Bibek", "Subedi",
  "transplant", "Transplant", "TRANSPLANT",
  "hair-transplant", "cosmetic-surgery",
  "wa.me/9779765974518",
  "lotusskinandhair", "lotus.ktm", "lotusskinandhair___", "lotusskinhairclinic",
  "aeskinandhair", "aeskinhairclinic", "ae.ktm",
  "2NXCkgZ65D6Z722y9",
  "teal-", "text-teal", "border-teal", "bg-teal",
  "cyan-50", "cyan-700", "cyan-100", "cyan-200",
  "gray-900",
  "Lichen Planopilaris",
  "hair restoration",
  "Hair Restoration",
  "Hair Transplant Expert",
  "Surgical Excellence",
  "/gallery/hair-transplant-procedure",
  "Karki",
];

let total = 0;
for (const f of files) {
  let s;
  try { s = fs.readFileSync(f, "utf8"); } catch { continue; }
  const lines = s.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const p of patterns) {
      if (line.includes(p)) {
        total++;
        console.log(`${path.relative(root, f)}:${i + 1}: [${p}] ${line.trim().slice(0, 130)}`);
        break;
      }
    }
  });
}
console.log(`\nTOTAL flagged lines: ${total} across ${files.length} files scanned`);
