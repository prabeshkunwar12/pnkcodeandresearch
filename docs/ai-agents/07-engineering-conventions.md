# Engineering Conventions

This file records conventions that are already visible in the codebase.

## 1. Desktop and mobile are intentionally different

A recurring pattern in this repo:
- desktop gets richer layouts
- mobile gets simpler, more focused interaction

Examples:
- capability systems
- project pages
- gallery viewer
- project browsing

Do not "normalize" desktop and mobile into the same UI unless explicitly asked.

## 2. Shared patterns should be extracted when reused

Recent examples:
- `ArchitectureMap.tsx`
- `ProjectScrollableCardSection.tsx`
- `ProjectExpandableDetailSection.tsx`
- `project-page-markdown.ts`

If a section pattern is reused across multiple project pages, prefer extraction over copy-paste.

## 3. Theme support matters

Most UI work in this repo expects:
- explicit light-mode readability
- explicit dark-mode readability
- ambient background treatment that does not break text contrast

Do not assume default Tailwind colors are enough.
Check both themes logically when changing:
- surface backgrounds
- text colors
- overlay controls
- dialog UI

## 4. Avoid fake interactivity

The codebase already distinguishes between:
- informational surfaces
- clickable cards
- modal controls
- links

If something is not interactive, it should not look like a button.
If something is interactive, its click target should be unambiguous.

## 5. Shared project-page content is markdown-driven

Much of the project-page narrative content is authored as markdown strings in:
- `src/app/(shell)/developer/data.ts`

When changing presentation:
- prefer transforming the markdown structure via shared helpers
- avoid editing every project by hand unless the content itself is wrong

## 6. Mobile horizontal scrolling must be scoped

This is a repeated requirement across the repo:
- no page-wide horizontal overflow
- only the local track/map/rail should scroll

Apply horizontal scroll to the smallest valid wrapper.

## 7. Dialogs must lock background scroll

This matters for:
- gallery viewer
- mobile detail modals
- filter dialogs

If a modal is introduced or edited, verify body scroll behavior logically.

## 8. The repo contains dirty working-tree risk

Resume outputs and local job-description files often change outside UI work.

Before staging/committing:
- check `git status`
- stage only intended files
- avoid accidentally including resume outputs unless requested
