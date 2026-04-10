# Resume Pipeline

This repo also contains a structured resume-generation workflow.

## Data source of truth

- `resume-data/`

Important files:
- `basics.yaml`
- `experience.yaml`
- `education.yaml`
- `certifications.yaml`
- `skills.yaml`
- `projects.yaml`
- `resume_rules.yaml`

There is also:
- `resume-data/job_descriptions/`
  - example and local job description inputs

## Generation scripts

- `scripts/generate_resume.py`
- `scripts/tailor_resume.py`
- `scripts/calibrate_resume.py`
- `scripts/resume_common.py`
- `scripts/resume_targeting.py`

## Outputs

- `resume/outputs/generic_resume.tex`
- `resume/outputs/targeted_resume.tex`
- `resume/outputs/calibration_report.json`

## Template

- `resume/templates/resume_template.tex.j2`

## Important boundary

The resume data is not fully integrated into the live site.

That means:
- editing the portfolio UI usually does not require resume-data changes
- editing resume scripts usually does not require UI changes

## Practical rule for commits

When the user says "ignore the resume part", that generally means do not commit:
- `resume-data/**`
- `resume/outputs/**`
- temporary script artifacts

## Calibration workflow

Calibration exists to inspect how targeting rules behave across job descriptions.

Typical outputs include:
- which summary was selected
- which projects were ranked highly
- how skill ordering changed

This is a local rule-based system, not a hosted service.
