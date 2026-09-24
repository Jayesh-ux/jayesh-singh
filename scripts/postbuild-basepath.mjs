import fs from "node:fs";
import path from "node:path";

const BASE = "/jayesh-singh";
const OUT = path.join(process.cwd(), "out");
const TARGETS = new Set([".html", ".js", ".css", ".xml", ".txt"]);

let count = 0;
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
    } else if (TARGETS.has(path.extname(entry.name))) {
      const before = fs.readFileSync(p, "utf8");
      const after = before
        .replaceAll('"/images/', `"${BASE}/images/`)
        .replaceAll("`/images/", `\`${BASE}/images/`)
        .replaceAll("url(/images/", `url(${BASE}/images/`)
        .replaceAll("\\/images\\/", `\\/${BASE.slice(1)}\\/`);
      if (after !== before) {
        fs.writeFileSync(p, after);
        count++;
      }
    }
  }
};

walk(OUT);
console.log(`Prefix basePath: rewrote ${count} files in ${OUT}`);