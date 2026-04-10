# Researcher and Landing Areas

This repository is not developer-only.
Agents should know the other top-level app areas even when not editing them.

## Landing page

Entry:
- `src/app/(landing)/page.tsx`

Supporting files:
- `src/app/(landing)/layout.tsx`
- `src/app/(landing)/focus-preview-card.tsx`
- `src/app/(landing)/landing-reveal-section.tsx`

The landing page establishes visual ideas reused elsewhere:
- gradient-based section separation
- reveal motion
- profile switching

When users reference "landing page style", they usually mean:
- section-level gradient resets
- open, non-card-heavy composition
- polished reveal behavior

## Researcher page

Entry:
- `src/app/(shell)/researcher/page.tsx`

Quantum content:
- `src/app/(shell)/researcher/quantum-computing/`

The researcher area is structurally separate from the developer project-page system.

Do not assume:
- project-page components should be reused there
- developer page conventions should override researcher content layout

## Shared shell

Both developer and researcher pages live under:
- `src/app/(shell)/layout.tsx`

Common shell behavior is influenced by:
- `src/components/profile/profile-shell.tsx`
- `src/components/profile/profile-nav.tsx`
- `src/components/profile/page-section-nav.tsx`

Changes to shell-level spacing or mobile behavior can affect:
- developer pages
- researcher pages
- project detail pages

Be careful with shell adjustments.
