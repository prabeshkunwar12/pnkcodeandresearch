# Common Change Guide

This file is task-oriented.

## If asked to modify project-page content layout

Start with:
- `src/app/(shell)/developer/components/ProjectPageTemplate.tsx`
- `src/app/(shell)/developer/components/project-page-markdown.ts`

Then inspect:
- `src/app/(shell)/developer/data.ts`

Questions to answer:
- Is this a shared change or one-project change?
- Does the content already have subsection structure?
- Should this use a reusable section pattern?

## If asked to modify project-page architecture behavior

Start with:
- `src/app/(shell)/developer/components/ArchitectureMap.tsx`
- `src/app/(shell)/developer/components/ProjectPageTemplate.tsx`

Check:
- mobile width rules
- map scroll wrapper
- architecture note content structure

## If asked to modify gallery behavior

Start with:
- `src/components/shared/FocusGallery.tsx`

Check:
- modal structure
- zoom state
- drag/pan behavior
- mobile gesture behavior
- body scroll lock

## If asked to modify project browsing/cards

Start with:
- `src/app/(shell)/developer/components/ProjectBrowserSection.tsx`
- `src/app/(shell)/developer/components/ProjectView.tsx`
- `src/app/(shell)/developer/data.ts`

Check:
- sticky filter overlap
- desktop click target layering
- mobile alignment and CTA differences
- ordering/filter interactions

## If asked to modify capability/skills UI

Start with:
- `src/app/(shell)/developer/components/DeveloperSkillsSection.tsx`

Check:
- desktop expandable behavior
- mobile modal behavior
- body scroll locking
- keyword highlighting

## If asked to modify profile shell spacing

Start with:
- `src/components/profile/profile-shell.tsx`

Be careful:
- this can affect multiple app areas at once
- especially project-page mobile spacing

## If asked to commit code only

Always inspect:
- `git status --short`

Common files to leave out unless requested:
- `resume/outputs/**`
- `resume-data/job_descriptions/**`
- `scripts/__pycache__/`

## Safe validation commands commonly used in this repo

Typecheck:

```bash
pnpm exec tsc --noEmit --pretty false
```

Dev server:

```bash
pnpm dev
```

Build:

```bash
pnpm build
```
