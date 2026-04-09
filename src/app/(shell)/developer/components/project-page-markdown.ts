export type MarkdownSubsection = {
  id: string;
  title: string;
  body: string;
};

export function parseMarkdownSubsections(
  content: string,
  sectionTitle?: string,
): { intro: string; items: MarkdownSubsection[] } {
  const normalizedContent = stripDuplicateLeadingHeading(content, sectionTitle).trim();
  const lines = normalizedContent.replace(/\r\n/g, "\n").split("\n");
  const items: MarkdownSubsection[] = [];
  const introLines: string[] = [];
  let currentTitle: string | null = null;
  let currentLines: string[] = [];

  const pushCurrent = () => {
    if (!currentTitle) return;
    items.push({
      id: toSectionId(currentTitle),
      title: currentTitle,
      body: cleanSubsectionBody(currentLines.join("\n")),
    });
    currentTitle = null;
    currentLines = [];
  };

  for (const line of lines) {
    const match = line.match(/^####\s+(.+)$/);
    if (match) {
      pushCurrent();
      currentTitle = match[1].trim();
      continue;
    }

    if (currentTitle) {
      currentLines.push(line);
    } else {
      introLines.push(line);
    }
  }

  pushCurrent();

  return {
    intro: introLines.join("\n").trim(),
    items,
  };
}

export function stripDuplicateLeadingHeading(content: string, sectionTitle?: string) {
  if (!sectionTitle) return content;

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let index = 0;

  while (index < lines.length && !lines[index].trim()) index += 1;
  const firstLine = lines[index]?.trim() ?? "";

  if (!firstLine.startsWith("### ")) return content;

  const heading = normalizeSectionLabel(firstLine.replace(/^###\s+/, ""));
  const outer = normalizeSectionLabel(sectionTitle);

  if (heading !== outer && canonicalSectionLabel(heading) !== canonicalSectionLabel(outer)) {
    return content;
  }

  index += 1;
  while (index < lines.length && !lines[index].trim()) index += 1;
  return lines.slice(index).join("\n");
}

export function getMarkdownSummary(content: string) {
  const cleaned = content
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("-") && !line.startsWith("1."))
    .join(" ")
    .replace(/[*_`#>-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.length > 150 ? `${cleaned.slice(0, 147).trimEnd()}...` : cleaned;
}

function cleanSubsectionBody(content: string) {
  return content
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => !line.trim().match(/^---+$/))
    .join("\n")
    .trim();
}

function normalizeSectionLabel(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function canonicalSectionLabel(value: string) {
  return value.replace(/\binterface\b/g, "").replace(/\s+/g, " ").trim();
}

export function toSectionId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
