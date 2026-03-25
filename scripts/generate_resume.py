from __future__ import annotations

from resume_common import GENERIC_OUTPUT_PATH, build_generic_resume_context, load_yaml_data, render_template, write_output


def main() -> None:
    data = load_yaml_data()
    context = build_generic_resume_context(data)
    rendered = render_template(context)
    write_output(GENERIC_OUTPUT_PATH, rendered)
    print(f"Wrote {GENERIC_OUTPUT_PATH}")


if __name__ == "__main__":
    main()
