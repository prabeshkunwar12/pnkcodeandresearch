# Project Purpose

This repository serves two closely related purposes:

1. Portfolio site
2. Resume-generation and resume-targeting workflow

The portfolio side is a Next.js application that presents:
- a landing page
- a developer profile and project portfolio
- a researcher profile and quantum-computing content
- a dedicated AeroSports case-study page

The resume side is a file-based content and generation pipeline that:
- stores structured resume content in YAML
- generates a generic LaTeX resume
- generates targeted LaTeX resumes from job descriptions
- produces calibration output to inspect rule behavior

The important design idea is that the repo is not just a website.
It is a combined portfolio + structured professional-content system.

## Product shape

The portfolio is centered around two identities:

- Developer
- Researcher

The Developer side is the richer application surface. It contains:
- a hero/introduction
- capability summaries
- professional experience
- project browsing/filtering
- per-project detail pages
- a dedicated AeroSports systems case study

## What the project is not

This is not:
- a generic marketing site
- a component-library demo
- a SaaS app with backend APIs in this repo
- an integrated resume web app

The resume scripts are local tooling, not a live web feature.

## Current technical priorities visible in the code

Recent work in the repo shows strong emphasis on:
- responsive project-page UX
- shared project-page patterns
- developer portfolio storytelling
- architecture diagrams
- mobile-first gallery behavior
- reusable section interaction patterns

That means agents should treat the following as important:
- keeping shared patterns consistent
- avoiding duplicated UI logic when a reusable component already exists
- preserving theme support
- preserving mobile and desktop differences intentionally
