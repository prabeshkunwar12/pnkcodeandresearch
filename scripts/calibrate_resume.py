from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from resume_common import ROOT, load_yaml_data, TARGETED_OUTPUT_PATH
from resume_targeting import build_targeting_result

JOB_DESCRIPTION_DIR = ROOT / "resume-data" / "job_descriptions"
CALIBRATION_REPORT_PATH = ROOT / "resume" / "outputs" / "calibration_report.json"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run resume-targeting calibration against one or more job descriptions.")
    parser.add_argument("--jd-file", type=Path, help="Process only one job description file.")
    parser.add_argument("--json", action="store_true", help="Also write calibration_report.json.")
    return parser.parse_args()


def collect_job_description_files(single_file: Path | None) -> list[Path]:
    if single_file:
        return [single_file]
    return sorted(JOB_DESCRIPTION_DIR.glob("*.txt"))


def build_report_entry(jd_file: Path, result: dict[str, Any]) -> dict[str, Any]:
    return {
        "jd_file": str(jd_file),
        "detected_profiles": result["signals"]["detected_profiles"],
        "profile_scores": result["signals"]["profile_scores"],
        "preferred_tags": result["signals"]["preferred_tags"],
        "selected_summary_key": result["summary_key"],
        "selected_projects": result["selected_project_ids"],
        "project_scores": [
            {"project_id": project_id, "score": score}
            for project_id, score in result["debug_project_scores"]
        ],
        "selected_experience_bullets": [
            {"score": item["score"], "text": item["bullet"].get("text", "")}
            for item in result["debug_bullets"]
        ],
        "ordered_skill_groups": [group["label"] for group in result["skill_groups"]],
    }


def print_report(jd_file: Path, result: dict[str, Any]) -> None:
    print(f"\n== {jd_file.name} ==")
    print(f"Detected profiles: {', '.join(result['signals']['detected_profiles']) or 'none'}")
    print(f"Profile scores: {result['signals']['profile_scores']}")
    print(f"Selected summary: {result['summary_key']}")
    print(f"Selected projects: {', '.join(result['selected_project_ids'])}")
    print(f"Skill order: {', '.join(group['label'] for group in result['skill_groups'])}")
    print("Top experience bullets:")
    for item in result["debug_bullets"][:5]:
        text = item["bullet"].get("text", "")
        preview = text if len(text) <= 120 else f"{text[:117]}..."
        print(f"- [{item['score']}] {preview}")
    print("Project scores:")
    for project_id, score in result["debug_project_scores"]:
        print(f"- {project_id}: {score}")


def main() -> None:
    args = parse_args()
    data = load_yaml_data()
    jd_files = collect_job_description_files(args.jd_file)
    report: list[dict[str, Any]] = []

    for jd_file in jd_files:
        job_description = jd_file.read_text(encoding="utf-8")
        result = build_targeting_result(job_description, data)
        print_report(jd_file, result)
        report.append(build_report_entry(jd_file, result))

    if args.json:
        CALIBRATION_REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
        CALIBRATION_REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(f"\nWrote {CALIBRATION_REPORT_PATH}")


if __name__ == "__main__":
    main()
