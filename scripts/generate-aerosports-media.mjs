import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public", "developer", "aerosports");
const outputFile = path.join(
  projectRoot,
  "src",
  "data",
  "aerosportsMediaManifest.ts",
);

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

const toPosix = (value) => value.split(path.sep).join("/");

const titleCase = (value) =>
  value
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const prioritizeKeywords = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("main") || lower.includes("display")) return -1;
  return 0;
};

const sortFiles = (files) =>
  [...files].sort((a, b) => {
    const weight = prioritizeKeywords(a.name) - prioritizeKeywords(b.name);
    if (weight !== 0) return weight;
    return collator.compare(a.name, b.name);
  });

const manifest = {};
const rootHardware = [];

const addEntry = (key, items) => {
  if (!items.length) return;
  manifest[key] = items;
};

const buildItems = (entries, relPath) =>
  entries.map((entry) => {
    const relFile = relPath ? `${relPath}/${entry.name}` : entry.name;
    const src = `/developer/aerosports/${toPosix(relFile)}`;
    return { src, alt: titleCase(entry.name) };
  });

const walk = (dir, relPath = "") => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.filter(
    (entry) =>
      entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()),
  );
  const sortedFiles = sortFiles(files);

  if (sortedFiles.length) {
    const key = relPath ? toPosix(relPath) : "root";
    addEntry(key, buildItems(sortedFiles, relPath));

    sortedFiles.forEach((file) => {
      const relFile = relPath ? `${relPath}/${file.name}` : file.name;
      const src = `/developer/aerosports/${toPosix(relFile)}`;
      addEntry(`file:${src}`, [{ src, alt: titleCase(file.name) }]);

      if (
        !relPath &&
        /(controller|doorlock|door-lock|scanner|wiring)/i.test(file.name)
      ) {
        rootHardware.push({ src, alt: titleCase(file.name) });
      }
    });
  }

  entries
    .filter((entry) => entry.isDirectory())
    .forEach((entry) => {
      const childRel = relPath ? `${relPath}/${entry.name}` : entry.name;
      walk(path.join(dir, entry.name), childRel);
    });
};

walk(publicRoot);

addEntry("root:hardware", rootHardware);

const output = `export type MediaItem = { src: string; alt: string };
export type MediaManifest = Record<string, MediaItem[]>;

export const aerosportsMediaManifest: MediaManifest = ${JSON.stringify(
  manifest,
  null,
  2,
)};
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output, "utf8");

console.log(
  `AeroSports media manifest generated (${Object.keys(manifest).length} groups).`,
);
