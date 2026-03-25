from __future__ import annotations

from typing import Any

from resume_common import (
    DEFAULT_PROJECT_PRIORITY,
    PROFILE_KEYWORDS,
    SKILL_GROUP_PROFILE_ORDER,
    build_skill_groups,
    escape_latex,
    format_date_range,
    normalize_text,
    render_project_entry,
    tokenize,
)


def extract_job_signals(job_description_text: str, rules: dict[str, Any]) -> dict[str, Any]:
    normalized = normalize_text(job_description_text)
    tokens = tokenize(job_description_text)
    profile_scores: dict[str, int] = {}
    matched_keywords: set[str] = set()

    for profile, keywords in PROFILE_KEYWORDS.items():
        score = 0
        for keyword in keywords:
            if keyword in normalized:
                score += 2 if " " in keyword or "." in keyword or "-" in keyword else 1
                matched_keywords.add(keyword)
        profile_scores[profile] = score

    tag_weights: dict[str, int] = {}
    profiles = rules.get("job_type_profiles", {})
    for profile, config in profiles.items():
        score = profile_scores.get(profile, 0)
        if score <= 0:
            continue
        for raw_tag in config.get("preferred_tags", []):
            tag = str(raw_tag)
            tag_weights[tag] = tag_weights.get(tag, 0) + score
            if tag in tokens or tag in normalized:
                tag_weights[tag] += 2
                matched_keywords.add(tag)

    sorted_profiles = [name for name, score in sorted(profile_scores.items(), key=lambda item: item[1], reverse=True) if score > 0]
    preferred_tags = [tag for tag, _ in sorted(tag_weights.items(), key=lambda item: (-item[1], item[0]))]

    return {
        "normalized": normalized,
        "tokens": tokens,
        "matched_keywords": sorted(matched_keywords),
        "profile_scores": profile_scores,
        "detected_profiles": sorted_profiles,
        "preferred_tags": preferred_tags,
        "tag_weights": tag_weights,
    }


def choose_summary_key(signals: dict[str, Any]) -> str:
    profiles = signals["detected_profiles"]
    scores = signals["profile_scores"]
    if not profiles:
        return "generic"
    top = profiles[0]
    top_score = scores.get(top, 0)
    second_score = scores.get(profiles[1], 0) if len(profiles) > 1 else 0
    if top_score >= 3 and top_score >= second_score + 1:
        return top
    return "generic"


def score_text_against_jd(text: str, signals: dict[str, Any]) -> int:
    normalized_text = normalize_text(text)
    text_tokens = tokenize(text)
    score = 0
    for tag, weight in signals["tag_weights"].items():
        if tag in normalized_text or tag in text_tokens:
            score += weight * 3
    score += len(text_tokens & signals["tokens"])
    for keyword in signals["matched_keywords"]:
        if keyword in normalized_text:
            score += 2
    return score


def score_tag_list(tags: list[str], signals: dict[str, Any]) -> int:
    score = 0
    for tag in tags:
        score += signals["tag_weights"].get(str(tag), 0) * 5
    return score


def build_targeted_experience(experience: list[dict[str, Any]], rules: dict[str, Any], signals: dict[str, Any]) -> tuple[list[dict[str, Any]], int, list[dict[str, Any]]]:
    max_items = int(rules.get("max_experience_bullets", 5))
    summary_slots = sum(1 for role in experience if role.get("summary"))
    available_bullet_slots = max(max_items - summary_slots, 0)
    flat_scored: list[dict[str, Any]] = []
    rendered: list[dict[str, Any]] = []

    for role_index, role in enumerate(experience):
        for bullet_index, bullet in enumerate(role.get("bullets", [])):
            score = score_tag_list(bullet.get("tags", []), signals) + score_text_against_jd(bullet.get("text", ""), signals)
            flat_scored.append(
                {
                    "role_index": role_index,
                    "bullet_index": bullet_index,
                    "score": score,
                    "bullet": bullet,
                }
            )

    if any(item["score"] > 0 for item in flat_scored):
        chosen = sorted(
            sorted(flat_scored, key=lambda item: item["score"], reverse=True)[:available_bullet_slots],
            key=lambda item: (item["role_index"], item["bullet_index"]),
        )
    else:
        chosen = []
        for item in sorted(flat_scored, key=lambda entry: (entry["role_index"], entry["bullet_index"])):
            if len(chosen) >= available_bullet_slots:
                break
            chosen.append(item)

    selected_lookup = {(item["role_index"], item["bullet_index"]): item for item in chosen}
    debug_bullets = sorted(flat_scored, key=lambda item: item["score"], reverse=True)[:max_items]

    for role_index, role in enumerate(experience):
        selected = [
            selected_lookup[(role_index, bullet_index)]["bullet"]
            for bullet_index, _ in enumerate(role.get("bullets", []))
            if (role_index, bullet_index) in selected_lookup
        ]
        rendered.append(
            {
                "company": escape_latex(role.get("company", "")),
                "title": escape_latex(role.get("title", "")),
                "location": escape_latex(role.get("location", "")),
                "date_range": format_date_range(role.get("start"), role.get("end")),
                "summary": escape_latex(role.get("summary", "")),
                "selected_bullets": [{"text": escape_latex(item.get("text", ""))} for item in selected],
            }
        )

    return rendered, len(chosen), debug_bullets


def project_bias_score(project: dict[str, Any], signals: dict[str, Any]) -> int:
    profiles = signals["detected_profiles"]
    if not profiles:
        return 0

    top_profile = profiles[0]
    type_tags = {str(tag) for tag in project.get("type_tags", [])}
    tech_tags = {str(tag) for tag in project.get("tech_tags", [])}
    bias = 0
    if top_profile == "backend":
        if {"backend", "systems"} & type_tags:
            bias += 10
        if "backend" in type_tags and "frontend" not in type_tags:
            bias += 6
        if {"hardware", "iot"} & type_tags:
            bias -= 8
        if "frontend" in type_tags and "backend" not in type_tags:
            bias -= 3
    elif top_profile == "frontend":
        if "frontend" in type_tags:
            bias += 12
        if {"next.js", "maui"} & tech_tags:
            bias += 8
        if "backend" in type_tags and "frontend" not in type_tags:
            bias -= 10
        if {"hardware", "iot"} & type_tags:
            bias -= 12
    elif top_profile == "systems":
        if {"systems", "runtime", "backend"} & type_tags:
            bias += 10
        if {"hardware", "iot"} & type_tags:
            bias += 3
        if "frontend" in type_tags and "runtime" not in type_tags:
            bias -= 2
    elif top_profile == "hardware":
        if {"hardware", "iot"} & type_tags:
            bias += 12
        if "frontend" in type_tags and "hardware" not in type_tags:
            bias -= 8
    return bias


def project_domain_boost(project: dict[str, Any], signals: dict[str, Any]) -> int:
    normalized = signals["normalized"]
    type_tags = {str(tag) for tag in project.get("type_tags", [])}
    tech_tags = {str(tag) for tag in project.get("tech_tags", [])}
    project_text = normalize_text(
        " ".join(
            [
                str(project.get("title", "")),
                str(project.get("category", "")),
                str((project.get("portfolio", {}) or {}).get("short", "")),
                str((project.get("portfolio", {}) or {}).get("long", "")),
                " ".join(project.get("tech_stack", [])),
            ]
        )
    )

    boost = 0

    mobile_terms = ["mobile", "react native", "ios", "android", "app store", "push notifications", "camera", "photo", "offline"]
    if any(term in normalized for term in mobile_terms):
        if {"maui"} & tech_tags or any(term in project_text for term in ["android", "tablet", "mobile", "registration"]):
            boost += 260
        if "frontend" in type_tags and {"next.js", "maui"} & tech_tags:
            boost += 120
        if "backend" in type_tags and "frontend" not in type_tags:
            boost -= 120

    game_terms = ["game", "games", "gameplay", "monogame", "graphics", "rendering", "cross-platform"]
    if any(term in normalized for term in game_terms):
        if any(term in project_text for term in ["game", "gameplay", "runtime", "score", "controller", "room orchestration"]):
            boost += 220
        if "backend" in type_tags and "systems" not in type_tags:
            boost -= 80

    return boost


def build_targeted_projects(projects: list[dict[str, Any]], rules: dict[str, Any], signals: dict[str, Any]) -> tuple[list[dict[str, Any]], list[str], list[tuple[str, int]]]:
    max_projects = int(rules.get("max_projects", 4))
    max_project_bullets = int(rules.get("max_project_bullets_per_project", 2))
    generic_priority = {project_id: index for index, project_id in enumerate(DEFAULT_PROJECT_PRIORITY)}
    scored_projects = []

    for project in projects:
        score = 0
        score += score_tag_list(project.get("type_tags", []), signals) * 2
        score += score_tag_list(project.get("tech_tags", []), signals) * 4
        score += score_text_against_jd(" ".join(project.get("tech_stack", [])), signals) * 3
        score += score_text_against_jd((project.get("portfolio", {}) or {}).get("short", ""), signals) * 2
        score += score_text_against_jd((project.get("portfolio", {}) or {}).get("long", ""), signals) * 2
        score += score_text_against_jd(project.get("category", ""), signals)
        score += score_text_against_jd(project.get("title", ""), signals)
        for bullet in (project.get("resume", {}) or {}).get("bullets", []):
            score += score_tag_list(bullet.get("tags", []), signals) * 3
            score += score_text_against_jd(bullet.get("text", ""), signals) * 2
        score += project_bias_score(project, signals)
        score += project_domain_boost(project, signals)
        scored_projects.append((score, generic_priority.get(project.get("id", ""), 10_000), project))

    debug_scores = [(item[2].get("id", ""), item[0]) for item in sorted(scored_projects, key=lambda item: (-item[0], item[1]))]
    scored_only = [score for score, _, _ in scored_projects if score > 0]
    max_score = max(scored_only, default=0)
    threshold = max_score * 0.35 if max_score > 0 else 0

    if max_score > 0:
        eligible = [item for item in scored_projects if item[0] >= threshold]
        if eligible:
            selected_projects = [
                item[2]
                for item in sorted(eligible, key=lambda item: (-item[0], item[1], item[2].get("title", "")))[:max_projects]
            ]
        else:
            selected_projects = [item[2] for item in sorted(scored_projects, key=lambda item: (item[1], item[2].get("title", "")))[:max_projects]]
    else:
        selected_projects = [item[2] for item in sorted(scored_projects, key=lambda item: (item[1], item[2].get("title", "")))[:max_projects]]

    rendered = []
    for project in selected_projects:
        entry = render_project_entry(project, max_project_bullets)
        bullets = (project.get("resume", {}) or {}).get("bullets", [])
        scored_bullets = []
        for index, bullet in enumerate(bullets):
            score = score_tag_list(bullet.get("tags", []), signals) + score_text_against_jd(bullet.get("text", ""), signals)
            scored_bullets.append((score, index, bullet))
        if any(score > 0 for score, _, _ in scored_bullets):
            selected = sorted(sorted(scored_bullets, key=lambda item: item[0], reverse=True)[:max_project_bullets], key=lambda item: item[1])
        else:
            selected = [(0, index, bullet) for index, bullet in enumerate(bullets[:max_project_bullets])]
        entry["selected_resume_bullets"] = [{"text": escape_latex(item[2].get("text", ""))} for item in selected]
        rendered.append(entry)

    return rendered, [project.get("id", "") for project in selected_projects], debug_scores


def reorder_skill_groups(skills: dict[str, list[str]], signals: dict[str, Any]) -> list[dict[str, str]]:
    profiles = signals["detected_profiles"]
    if not profiles:
        return build_skill_groups(skills)

    ordered_keys: list[str] = []
    seen: set[str] = set()
    primary_profiles = profiles[:1]
    secondary_profiles = profiles[1:]
    for profile in primary_profiles:
        for key in SKILL_GROUP_PROFILE_ORDER.get(profile, []):
            if key not in seen:
                ordered_keys.append(key)
                seen.add(key)
    for profile in secondary_profiles:
        for key in SKILL_GROUP_PROFILE_ORDER.get(profile, []):
            if key not in seen:
                ordered_keys.append(key)
                seen.add(key)
    for key in skills.keys():
        if key not in seen:
            ordered_keys.append(key)
            seen.add(key)
    return build_skill_groups(skills, ordered_keys)


def build_targeting_result(job_description: str, data: dict[str, Any]) -> dict[str, Any]:
    rules = data["resume_rules"]
    signals = extract_job_signals(job_description, rules)
    summary_key = choose_summary_key(signals)
    experience_entries, selected_experience_bullets, debug_bullets = build_targeted_experience(data["experience"], rules, signals)
    selected_projects, selected_project_ids, debug_project_scores = build_targeted_projects(data["projects"], rules, signals)
    skill_groups = reorder_skill_groups(data["skills"], signals)

    return {
        "signals": signals,
        "summary_key": summary_key,
        "experience_entries": experience_entries,
        "selected_experience_bullets": selected_experience_bullets,
        "debug_bullets": debug_bullets,
        "selected_projects": selected_projects,
        "selected_project_ids": selected_project_ids,
        "debug_project_scores": debug_project_scores,
        "skill_groups": skill_groups,
    }
