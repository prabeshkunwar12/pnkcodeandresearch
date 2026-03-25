# Scripts

Resume scripts use the YAML data in `resume-data/` and the shared LaTeX template in `resume/templates/resume_template.tex.j2`.

Outputs:

- Generic output: `resume/outputs/generic_resume.tex`
- Targeted output: `resume/outputs/targeted_resume.tex`
- Calibration report: `resume/outputs/calibration_report.json`

Usage:

- `python3 scripts/generate_resume.py`
- `python3 scripts/tailor_resume.py --jd-file job_description.txt`
- `python3 scripts/tailor_resume.py --jd-text "We are hiring a backend engineer with experience in APIs, SQL, and authentication..."`
- `python3 scripts/calibrate_resume.py`
- `python3 scripts/calibrate_resume.py --jd-file resume-data/job_descriptions/backend_example_1.txt`
- `python3 scripts/calibrate_resume.py --json`

`tailor_resume.py` generates one targeted LaTeX resume from a pasted or file-based job description.

`calibrate_resume.py` runs the same rule-based targeting logic across one or more job description fixtures so scoring, summary choice, project ranking, and skill ordering can be inspected and tuned.

This workflow is file-based only. PDF generation, UI integration, and portfolio integration are not included here.
