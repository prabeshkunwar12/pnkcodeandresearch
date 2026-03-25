from __future__ import annotations

import argparse
from pathlib import Path

from resume_common import TARGETED_OUTPUT_PATH, build_resume_context, load_yaml_data, render_template, write_output
from resume_targeting import build_targeting_result


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a targeted LaTeX resume from YAML data and a job description.")
    parser.add_argument("--jd-file", type=Path, help="Path to a text file containing the job description.")
    parser.add_argument("--jd-text", help="Raw job description text.")
    return parser.parse_args()


def load_job_description(args: argparse.Namespace) -> str:
    if args.jd_file:
        return args.jd_file.read_text(encoding="utf-8")
    if args.jd_text:
        return args.jd_text
    raise SystemExit("Provide --jd-file or --jd-text.")


def main() -> None:
    args = parse_args()
    job_description = load_job_description(args)
    data = load_yaml_data()
    result = build_targeting_result(job_description, data)

    context = build_resume_context(
        data,
        summary_key=result["summary_key"],
        experience_entries=result["experience_entries"],
        selected_projects=result["selected_projects"],
        skill_groups=result["skill_groups"],
    )
    rendered = render_template(context)
    write_output(TARGETED_OUTPUT_PATH, rendered)

    print(f"Detected profiles: {', '.join(result['signals']['detected_profiles']) or 'none'}")
    print(f"Profile scores: {result['signals']['profile_scores']}")
    print(f"Preferred tags: {result['signals']['preferred_tags']}")
    print(f"Selected projects: {', '.join(result['selected_project_ids'])}")
    print(f"Selected experience bullets: {result['selected_experience_bullets']}")
    print(f"Chosen summary pool: {result['summary_key']}")
    print("Project Scores:")
    for project_id, score in result["debug_project_scores"]:
        print(f"- {project_id}: {score}")
    print("Top Experience Bullets:")
    for item in result["debug_bullets"]:
        print(f"- {item['score']}: {item['bullet'].get('text', '')}")
    print(f"Wrote {TARGETED_OUTPUT_PATH}")


if __name__ == "__main__":
    main()
