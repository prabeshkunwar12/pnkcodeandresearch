export type ImageKind = "tech" | "company" | "media" | "other";

export type ImageAsset = {
  name: string;
  src: string;
  kind: ImageKind;
  variant?: "light" | "dark";
  alt?: string;
  caption?: string;
};

export const images: ImageAsset[] = [
  { name: "Android", src: "/tech_stack/android.svg", kind: "tech" },
  { name: "Android Studio", src: "/tech_stack/Android Studio.svg", kind: "tech" },
  { name: "Arduino", src: "/tech_stack/Arduino.svg", kind: "tech" },
  { name: "Bootstrap", src: "/tech_stack/Bootstrap.svg", kind: "tech" },
  { name: "C++", src: "/tech_stack/CPP.svg", kind: "tech" },
  { name: "C#", src: "/tech_stack/CSharp.svg", kind: "tech" },
  { name: "Dart", src: "/tech_stack/Dart.svg", kind: "tech" },
  { name: "Express", src: "/tech_stack/Express.Js.svg", kind: "tech", variant: "light" },
  { name: "Express", src: "/tech_stack/Express.JsDark.svg", kind: "tech", variant: "dark" },
  { name: "Figma", src: "/tech_stack/Figma.svg", kind: "tech" },
  { name: "Flutter", src: "/tech_stack/Flutter.svg", kind: "tech" },
  { name: "GitHub Actions", src: "/tech_stack/GitHub Actions.svg", kind: "tech" },
  { name: "GitHub", src: "/tech_stack/GitHub.svg", kind: "tech" },
  { name: "Gradle", src: "/tech_stack/Gradle.svg", kind: "tech" },
  { name: "HTML5", src: "/tech_stack/HTML5.svg", kind: "tech" },
  { name: "Hibernate", src: "/tech_stack/Hibernate.svg", kind: "tech" },
  { name: "Java", src: "/tech_stack/Java.svg", kind: "tech" },
  { name: "JavaScript", src: "/tech_stack/JavaScript.svg", kind: "tech" },
  { name: "Jupyter", src: "/tech_stack/Jupyter.svg", kind: "tech" },
  { name: "Laravel", src: "/tech_stack/Laravel.svg", kind: "tech" },
  { name: "Linux", src: "/tech_stack/Linux.svg", kind: "tech" },
  { name: "Microsoft SQL Server", src: "/tech_stack/Microsoft SQL Server.svg", kind: "tech" },
  { name: "MongoDB", src: "/tech_stack/MongoDB.svg", kind: "tech" },
  { name: "MySQL", src: "/tech_stack/MySQL.svg", kind: "tech" },
  { name: ".NET", src: "/tech_stack/NET.svg", kind: "tech" },
  { name: "NPM", src: "/tech_stack/NPM.svg", kind: "tech" },
  { name: "Next.js", src: "/tech_stack/Next.js.svg", kind: "tech", variant: "light" },
  { name: "Next.js", src: "/tech_stack/Next.jsDark.svg", kind: "tech", variant: "dark" },
  { name: "Node.js", src: "/tech_stack/Node.js.svg", kind: "tech" },
  { name: "NuGet", src: "/tech_stack/NuGet.svg", kind: "tech" },
  { name: "Postgres", src: "/tech_stack/PostgresSQL.svg", kind: "tech" },
  { name: "Postman", src: "/tech_stack/Postman.svg", kind: "tech" },
  { name: "Powershell", src: "/tech_stack/Powershell.svg", kind: "tech" },
  { name: "PuTTY", src: "/tech_stack/PuTTY.svg", kind: "tech" },
  { name: "Python", src: "/tech_stack/Python.svg", kind: "tech" },
  { name: "Raspberry Pi", src: "/tech_stack/Raspberry Pi.svg", kind: "tech" },
  { name: "React", src: "/tech_stack/React.svg", kind: "tech" },
  { name: "Zod", src: "/tech_stack/Zod.svg", kind: "tech" },
  { name: "SonarQube", src: "/tech_stack/SonarQube.svg", kind: "tech" },
  { name: "Spring", src: "/tech_stack/Spring.svg", kind: "tech" },
  { name: "Tailwind", src: "/tech_stack/Tailwind CSS.svg", kind: "tech" },
  { name: "Three.js", src: "/tech_stack/Three.js.svg", kind: "tech" },
  { name: "TypeScript", src: "/tech_stack/TypeScript.svg", kind: "tech" },
  { name: "Vercel", src: "/tech_stack/Vercel.svg", kind: "tech" },
  { name: "Visual Studio Code", src: "/tech_stack/Visual Studio Code (VS Code).svg", kind: "tech" },
  { name: "Visual Studio", src: "/tech_stack/Visual Studio.svg", kind: "tech" },
  { name: "Packt", src: "/company_logo/Packt.svg", kind: "company" },
  { name: "Google", src: "/company_logo/google.svg", kind: "company" },
  { name: "freeCodeCamp", src: "/company_logo/freeCodeCamp.svg", kind: "company" },
  { name: "HackerRank", src: "/company_logo/hackerRank.svg", kind: "company" },
  { name: "AeroSports", src: "/company_logo/aerosports.jpeg", kind: "company" },
  {
    name: "USR-N540",
    src: "/developer/aerosports/USR-N540.jpeg",
    kind: "media",
    alt: "USR-N540 controller",
    caption: "USR-N540 controller",
  },
  {
    name: "USR-N510",
    src: "/developer/aerosports/USR-N510.jpeg",
    kind: "media",
    alt: "USR-N510 controller",
    caption: "USR-N510 controller",
  },
  {
    name: "USR-IOT Plug",
    src: "/developer/aerosports/USR-IOT_plug.jpeg",
    kind: "media",
    alt: "USR-IOT plug controller",
    caption: "USR-IOT plug controller",
  },
  {
    name: "Hand Scanner",
    src: "/developer/aerosports/Handscanner.jpg",
    kind: "media",
    alt: "Hand scanner",
    caption: "Hand scanner",
  },
  {
    name: "Door Lock",
    src: "/developer/aerosports/doorlock.jpeg",
    kind: "media",
    alt: "Door lock hardware integration",
    caption: "Door lock integration",
  },
  {
    name: "Power And Controller Setup",
    src: "/developer/aerosports/PowerAndControllerSetup.jpg",
    kind: "media",
    alt: "Power and controller setup",
    caption: "Power and controller setup",
  },
  {
    name: "Power And Controller Setup 1",
    src: "/developer/aerosports/PowerAndControllerSetup1.jpg",
    kind: "media",
    alt: "Power and controller setup detail",
    caption: "Power and controller setup detail",
  },
];

export const techStackIcons: Record<string, string> = images
  .filter((item) => item.kind === "tech" && item.variant !== "dark")
  .reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.src;
    return acc;
  }, {});

export const techStackIconsDark: Record<string, string> = images
  .filter((item) => item.kind === "tech" && item.variant === "dark")
  .reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.src;
    return acc;
  }, {});

export const companyLogos: Record<string, string> = images
  .filter((item) => item.kind === "company")
  .reduce<Record<string, string>>((acc, item) => {
    acc[item.name] = item.src;
    return acc;
  }, {});

export const mediaAssetsBySrc: Record<string, ImageAsset> = images
  .filter((item) => item.kind === "media")
  .reduce<Record<string, ImageAsset>>((acc, item) => {
    acc[item.src] = item;
    return acc;
  }, {});

export function getImageSrc(kind: ImageKind, name: string) {
  return images.find((item) => item.kind === kind && item.name === name)?.src;
}

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/c\+\+/g, "cplusplus")
    .replace(/c#/g, "csharp")
    .replace(/\.net/g, "dotnet")
    .replace(/[^a-z0-9]/g, "");

const techLightImages = images.filter(
  (item) => item.kind === "tech" && item.variant !== "dark",
);
const techDarkImages = images.filter(
  (item) => item.kind === "tech" && item.variant === "dark",
);

const techLightByName = new Map(
  techLightImages.map((item) => [normalizeKey(item.name), item.src]),
);
const techDarkByName = new Map(
  techDarkImages.map((item) => [normalizeKey(item.name), item.src]),
);

const techLightByFile = new Map(
  techLightImages.map((item) => [
    normalizeKey(item.src.split("/").pop() ?? ""),
    item.src,
  ]),
);
const techDarkByFile = new Map(
  techDarkImages.map((item) => [
    normalizeKey(item.src.split("/").pop() ?? ""),
    item.src,
  ]),
);

type ThemeIconBuckets = { light: string[]; dark: string[] };

const techIconBuckets = new Map<string, ThemeIconBuckets>();

const normalizeAssetName = (value: string) => normalizeKey(value.replace(/\.[^./]+$/, ""));

const inferVariantFromPath = (path: string): "light" | "dark" => {
  const filename = (path.split("/").pop() ?? "").toLowerCase();
  if (filename.includes("dark")) return "dark";
  if (filename.includes("light")) return "light";
  return "light";
};

const pushIcon = (key: string, variant: "light" | "dark", src: string) => {
  if (!key) return;

  const bucket = techIconBuckets.get(key) ?? { light: [], dark: [] };
  if (variant === "dark") {
    if (!bucket.dark.includes(src)) bucket.dark.push(src);
  } else if (!bucket.light.includes(src)) {
    bucket.light.push(src);
  }

  techIconBuckets.set(key, bucket);
};

for (const item of images.filter((asset) => asset.kind === "tech")) {
  const variant = item.variant ?? inferVariantFromPath(item.src);
  const fileName = (item.src.split("/").pop() ?? "").replace(/\.[^./]+$/, "");

  const keys = [
    normalizeKey(item.name),
    normalizeAssetName(fileName),
    normalizeAssetName(fileName.replace(/(dark|light)$/, "")),
  ];

  for (const key of keys) {
    pushIcon(key, variant, item.src);
  }
}

const getIconFromBucket = (bucket: ThemeIconBuckets | undefined, variant: "light" | "dark") => {
  const list = variant === "dark" ? bucket?.dark : bucket?.light;
  if (!list?.length) return undefined;
  return [...list].sort((a, b) => a.length - b.length)[0];
};

const techAliases: Record<string, string[]> = {
  c: ["c", "clang", "c_lang"],
  cplusplus: ["cpp", "cplusplus", "c++"],
  cpp: ["cpp", "cplusplus", "c++"],
  csharp: ["csharp", "c#"],
  dotnet: [".net", "dotnet", "net"],
  nextjs: ["nextjs", "next", "next.js"],
  react: ["react"],
  typescript: ["typescript", "ts"],
  javascript: ["javascript", "js"],
  arduino: ["arduino"],
  raspberrypi: ["raspberrypi", "rpi", "raspberry pi"],
  sqlserver: ["sqlserver", "mssql", "sql server", "microsoft sql server"],
};

const findShortest = (paths: string[]) =>
  paths.sort((a, b) => a.length - b.length)[0];

const resolveFromMaps = (key: string, map: Map<string, string>) => {
  if (map.has(key)) return map.get(key) ?? null;
  return null;
};

export type ResolvedTechIcon = {
  iconSrc?: string;
  iconSrcDark?: string;
  lightIconSrc?: string;
  darkIconSrc?: string;
};

export function resolveTechIcon(name: string): ResolvedTechIcon {
  const normalized = normalizeKey(name);
  if (!normalized) return {};

  const directBucket = techIconBuckets.get(normalized);
  const directLight = getIconFromBucket(directBucket, "light");
  const directDark = getIconFromBucket(directBucket, "dark");

  if (directLight || directDark) {
    return {
      iconSrc: directLight ?? directDark,
      iconSrcDark: directDark,
      lightIconSrc: directLight,
      darkIconSrc: directDark,
    };
  }

  const aliasCandidates = techAliases[normalized] ?? [];
  for (const alias of aliasCandidates) {
    const aliasKey = normalizeKey(alias);
    const aliasBucket = techIconBuckets.get(aliasKey);
    const aliasLight = getIconFromBucket(aliasBucket, "light");
    const aliasDark = getIconFromBucket(aliasBucket, "dark");
    if (aliasLight || aliasDark) {
      return {
        iconSrc: aliasLight ?? aliasDark,
        iconSrcDark: aliasDark ?? undefined,
        lightIconSrc: aliasLight,
        darkIconSrc: aliasDark,
      };
    }
  }

  const partialMatchesDark: string[] = [];

  const partialMatches: string[] = [];
  for (const [key, src] of techLightByFile.entries()) {
    if (key.includes(normalized) || normalized.includes(key)) {
      partialMatches.push(src);
    }
  }
  for (const [key, src] of techLightByName.entries()) {
    if (key.includes(normalized) || normalized.includes(key)) {
      partialMatches.push(src);
    }
  }
  for (const [key, src] of techDarkByName.entries()) {
    if (key.includes(normalized) || normalized.includes(key)) {
      partialMatchesDark.push(src);
    }
  }
  for (const [key, src] of techDarkByFile.entries()) {
    if (key.includes(normalized) || normalized.includes(key)) {
      partialMatchesDark.push(src);
    }
  }

  if (partialMatches.length) {
    const pick = findShortest(partialMatches);
    const matchKey =
      normalizeKey(pick.split("/").pop() ?? "") || normalizeKey(pick);
    const dark =
      resolveFromMaps(matchKey, techDarkByFile) ??
      resolveFromMaps(matchKey, techDarkByName);
    return {
      iconSrc: pick,
      iconSrcDark: dark ?? undefined,
      lightIconSrc: pick,
      darkIconSrc: dark ?? undefined,
    };
  }

  if (partialMatchesDark.length) {
    const pick = findShortest(partialMatchesDark);
    const matchKey =
      normalizeKey(pick.split("/").pop() ?? "") || normalizeKey(pick);
    const light =
      resolveFromMaps(matchKey, techLightByFile) ??
      resolveFromMaps(matchKey, techLightByName);
    return {
      iconSrc: light ?? pick,
      iconSrcDark: pick,
      lightIconSrc: light ?? undefined,
      darkIconSrc: pick,
    };
  }

  return {};
}
