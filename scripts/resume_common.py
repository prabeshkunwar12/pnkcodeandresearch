from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import yaml
from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).resolve().parent.parent
RESUME_DATA_DIR = ROOT / "resume-data"
TEMPLATE_PATH = ROOT / "resume" / "templates" / "resume_template.tex.j2"
GENERIC_OUTPUT_PATH = ROOT / "resume" / "outputs" / "generic_resume.tex"
TARGETED_OUTPUT_PATH = ROOT / "resume" / "outputs" / "targeted_resume.tex"

DEFAULT_PROJECT_PRIORITY = [
    "backend-api-express",
    "kiosk-host-dotnet",
    "game-engine-dotnet",
    "kiosk-ui-nextjs",
    "admin-portal-nextjs",
    "game-controllers-sensor-network",
    "room-devices-access-control",
    "scorecard-nextjs",
    "pos-wpf",
    "registration-tablet",
    "axe-wrapper-maui",
]

SKILL_LABELS = {
    "languages": "Languages",
    "frontend": "Frontend",
    "backend": "Backend",
    "desktop_mobile": "Desktop / Mobile",
    "database": "Database",
    "hardware_iot": "Hardware / IoT",
    "systems": "Systems",
    "tools": "Tools",
}

SKILL_GROUP_PROFILE_ORDER = {
    "backend": ["backend", "database", "systems", "languages", "tools", "frontend", "desktop_mobile", "hardware_iot"],
    "frontend": ["frontend", "languages", "tools", "backend", "systems", "desktop_mobile", "database", "hardware_iot"],
    "fullstack": ["frontend", "backend", "systems", "languages", "tools", "database", "desktop_mobile", "hardware_iot"],
    "systems": ["systems", "backend", "hardware_iot", "languages", "tools", "database", "frontend", "desktop_mobile"],
    "hardware": ["hardware_iot", "systems", "tools", "languages", "backend", "desktop_mobile", "database", "frontend"],
}

PROFILE_KEYWORDS = {
    "backend": [
        "backend",
        "api",
        "apis",
        "rest",
        "restful",
        "express",
        "node",
        "node.js",
        "java",
        "spring",
        "spring boot",
        "hibernate",
        "jpa",
        "sql",
        "database",
        "databases",
        "postgresql",
        "oracle",
        "mysql",
        "nosql",
        "mssql",
        "auth",
        "authentication",
        "authorization",
        "jwt",
        "middleware",
        "server",
        "microservice",
        "microservices",
    ],
    "frontend": [
        "frontend",
        "front-end",
        "front end",
        "react",
        "next",
        "next.js",
        "mobile",
        "react native",
        "ios",
        "android",
        "app",
        "apps",
        "push notifications",
        "camera",
        "photo",
        "responsive",
        "offline",
        "messaging",
        "typescript",
        "javascript",
        "ui",
        "ux",
        "web",
        "css",
        "html",
        "component",
        "components",
    ],
    "fullstack": [
        "full stack",
        "full-stack",
        "fullstack",
        "end-to-end",
        "cross-functional",
    ],
    "systems": [
        "systems",
        "system",
        "architecture",
        "distributed",
        "platform",
        "c++",
        "cpp",
        "linux",
        "multithreaded",
        "concurrency",
        "low latency",
        "realtime",
        "real-time",
        "runtime",
        "reliability",
        "integration",
        "orchestration",
        "game",
        "games",
        "gameplay",
        "engine",
        "security",
        "performance profiling",
        "scalable",
        "scalability",
        "performance",
    ],
    "hardware": [
        "hardware",
        "embedded",
        "iot",
        "device",
        "devices",
        "sensor",
        "sensors",
        "protocol",
        "protocols",
        "serial",
        "ethernet",
        "rs422",
        "com port",
        "arduino",
        "esp",
        "nfc",
        "controller",
        "controllers",
        "firmware",
        "wiring",
    ],
}

LATEX_REPLACEMENTS = {
    "\\": r"\textbackslash{}",
    "&": r"\&",
    "%": r"\%",
    "$": r"\$",
    "#": r"\#",
    "_": r"\_",
    "{": r"\{",
    "}": r"\}",
    "~": r"\textasciitilde{}",
    "^": r"\textasciicircum{}",
}


def escape_latex(value: Any) -> str:
    if value is None:
        return ""
    text = str(value)
    return "".join(LATEX_REPLACEMENTS.get(ch, ch) for ch in text)


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value.lower()).strip()


def tokenize(value: str) -> set[str]:
    return set(re.findall(r"[a-z0-9.+#-]+", normalize_text(value)))


def load_yaml_file(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle) or []


def load_yaml_data() -> dict[str, Any]:
    return {
        "basics": load_yaml_file(RESUME_DATA_DIR / "basics.yaml"),
        "education": load_yaml_file(RESUME_DATA_DIR / "education.yaml"),
        "experience": load_yaml_file(RESUME_DATA_DIR / "experience.yaml"),
        "projects": load_yaml_file(RESUME_DATA_DIR / "projects.yaml"),
        "certifications": load_yaml_file(RESUME_DATA_DIR / "certifications.yaml"),
        "skills": load_yaml_file(RESUME_DATA_DIR / "skills.yaml"),
        "resume_rules": load_yaml_file(RESUME_DATA_DIR / "resume_rules.yaml"),
    }


def build_header_line(basics: dict[str, Any]) -> str:
    entries: list[str] = []

    email = (basics.get("email") or "").strip()
    if email:
        entries.append(rf"\href{{mailto:{email}}}{{{escape_latex(email)}}}")

    location = (basics.get("location") or "").strip()
    if location:
        entries.append(escape_latex(location))

    linkedin = (basics.get("linkedin") or "").strip()
    if linkedin:
        entries.append(rf"\href{{{linkedin}}}{{LinkedIn}}")

    github = (basics.get("github") or "").strip()
    if github:
        entries.append(rf"\href{{{github}}}{{GitHub}}")

    portfolio = (basics.get("portfolio") or "").strip()
    if portfolio:
        entries.append(rf"\href{{{portfolio}}}{{Portfolio}}")

    return r" \textbar\ ".join(entries)


def select_summary(basics: dict[str, Any], summary_key: str = "generic") -> str:
    pool = basics.get("summary_pool", {})
    candidates = pool.get(summary_key, []) or pool.get("generic", [])
    if candidates:
        return escape_latex(candidates[0])
    return escape_latex(basics.get("headline", ""))


def format_date_range(start: str | None, end: str | None) -> str:
    start_value = escape_latex(start or "")
    end_value = escape_latex(end or "")
    if start_value and end_value:
        return f"{start_value} -- {end_value}"
    return start_value or end_value


def build_experience(experience: list[dict[str, Any]], rules: dict[str, Any]) -> list[dict[str, Any]]:
    max_bullets = int(rules.get("max_experience_bullets", 5))
    rendered: list[dict[str, Any]] = []

    for role in experience:
        rendered.append(
            {
                "company": escape_latex(role.get("company", "")),
                "title": escape_latex(role.get("title", "")),
                "location": escape_latex(role.get("location", "")),
                "date_range": format_date_range(role.get("start"), role.get("end")),
                "summary": escape_latex(role.get("summary", "")),
                "selected_bullets": [
                    {"text": escape_latex(item.get("text", ""))}
                    for item in (role.get("bullets", [])[:max_bullets])
                ],
            }
        )
    return rendered


def render_project_entry(project: dict[str, Any], max_project_bullets: int) -> dict[str, Any]:
    return {
        "id": project.get("id", ""),
        "title": escape_latex(project.get("title", "")),
        "company": escape_latex(project.get("company", "")),
        "category": escape_latex(project.get("category", "")),
        "tech_stack_inline": escape_latex(", ".join(project.get("tech_stack", []))),
        "links": {
            "portfolio": (project.get("links", {}) or {}).get("portfolio", ""),
        },
        "selected_resume_bullets": [
            {"text": escape_latex(item.get("text", ""))}
            for item in ((project.get("resume", {}) or {}).get("bullets", [])[:max_project_bullets])
        ],
    }


def build_selected_projects(projects: list[dict[str, Any]], rules: dict[str, Any]) -> list[dict[str, Any]]:
    max_projects = int(rules.get("max_projects", 4))
    max_project_bullets = int(rules.get("max_project_bullets_per_project", 2))
    priority = {project_id: index for index, project_id in enumerate(DEFAULT_PROJECT_PRIORITY)}

    selected = sorted(
        projects,
        key=lambda item: (priority.get(item.get("id", ""), 10_000), item.get("title", "")),
    )[:max_projects]

    return [render_project_entry(project, max_project_bullets) for project in selected]


def build_skill_groups(skills: dict[str, list[str]], ordered_keys: list[str] | None = None) -> list[dict[str, str]]:
    keys = ordered_keys or list(SKILL_LABELS.keys())
    groups: list[dict[str, str]] = []
    for key in keys:
        label = SKILL_LABELS.get(key)
        items = skills.get(key, [])
        if not label or not items:
            continue
        groups.append(
            {
                "label": escape_latex(label),
                "items_inline": escape_latex(", ".join(items)),
            }
        )
    return groups


def build_education_block(education: list[dict[str, Any]]) -> str:
    blocks: list[str] = []
    for item in education:
        lines = []
        institution = item.get("institution")
        if institution:
            lines.append(rf"\textbf{{{escape_latex(institution)}}} \par")
        field_bits = [bit for bit in [item.get("degree"), item.get("field")] if bit]
        if field_bits:
            lines.append(f"{escape_latex(', '.join(field_bits))} \\par")
        years = format_date_range(item.get("start_year"), item.get("end_year"))
        if years:
            lines.append(f"{years} \\par")
        honors = item.get("honors", [])
        if honors:
            lines.append(escape_latex("; ".join(honors)))
        blocks.append("\n".join(lines))
    return "\n\n".join(blocks)


def build_certifications(certifications: list[dict[str, Any]]) -> list[dict[str, str]]:
    rendered: list[dict[str, str]] = []
    for cert in certifications:
        title = escape_latex(cert.get("title", ""))
        issuer = escape_latex(cert.get("issuer", ""))
        issued = escape_latex(cert.get("issued", ""))
        inner = rf"\textbf{{{title}}}"
        if issuer:
            inner += f" --- {issuer}"
        if issued:
            inner += f", {issued}"
        url = cert.get("url")
        rendered_line = rf"\href{{{url}}}{{{inner}}}" if url else inner
        rendered.append({"rendered_line": rendered_line})
    return rendered


def build_resume_context(
    data: dict[str, Any],
    *,
    summary_key: str = "generic",
    experience_entries: list[dict[str, Any]] | None = None,
    selected_projects: list[dict[str, Any]] | None = None,
    skill_groups: list[dict[str, str]] | None = None,
) -> dict[str, Any]:
    basics = data["basics"]
    rules = data["resume_rules"]
    return {
        "basics": {
            "name": escape_latex(basics.get("name", "")),
            "headline": escape_latex(basics.get("headline", "")),
        },
        "summary_key": summary_key,
        "header_line": build_header_line(basics),
        "summary": select_summary(basics, summary_key),
        "education_block": build_education_block(data["education"]),
        "experience": experience_entries if experience_entries is not None else build_experience(data["experience"], rules),
        "selected_projects": selected_projects if selected_projects is not None else build_selected_projects(data["projects"], rules),
        "skill_groups": skill_groups if skill_groups is not None else build_skill_groups(data["skills"]),
        "certifications": build_certifications(data["certifications"]),
        "resume_rules": rules,
    }


def build_generic_resume_context(data: dict[str, Any]) -> dict[str, Any]:
    return build_resume_context(data)


def render_template(context: dict[str, Any]) -> str:
    environment = Environment(
        loader=FileSystemLoader(str(TEMPLATE_PATH.parent)),
        autoescape=False,
        block_start_string="((%",
        block_end_string="%))",
        variable_start_string="((",
        variable_end_string="))",
        comment_start_string="((#",
        comment_end_string="#))",
        trim_blocks=True,
        lstrip_blocks=True,
    )
    template = environment.get_template(TEMPLATE_PATH.name)
    return template.render(**context)


def write_output(path: Path, rendered: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(rendered, encoding="utf-8")
