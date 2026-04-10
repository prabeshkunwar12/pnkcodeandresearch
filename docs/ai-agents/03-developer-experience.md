# Developer Experience Area

This file covers the main developer portfolio page, not the per-project pages.

## Primary entry

- `src/app/(shell)/developer/page.tsx`

This page assembles the major developer sections and orchestrates page-level layout.

## Important sections

### Hero

Purpose:
- introduce the developer profile
- show high-level capabilities
- connect into the project browser

Related components:
- `DesktopCapabilityCardsRow.tsx`
- `MobileCapabilityCarousel.tsx`

The hero intentionally behaves differently by breakpoint.
Do not assume desktop and mobile should match.

### Technical Capabilities

Primary component:
- `DeveloperSkillsSection.tsx`

This section uses a dual interaction model:
- desktop: structured expandable / master-detail-like patterns
- mobile: modal-driven detail view

This component has already been iterated heavily.
Before changing it, inspect current interaction expectations carefully.

### Professional Experience

Primary component:
- `ProfessionalExperienceSection.tsx`

Recent styling includes ambient background treatment similar to project cards.

### Project Browser

Primary component:
- `ProjectBrowserSection.tsx`

Supporting card component:
- `ProjectView.tsx`

This system handles:
- project ordering
- filter state
- desktop and mobile filter presentation
- sticky filter behavior
- card click behavior

When editing this area, watch for:
- sticky header overlap
- filter state sync
- desktop full-card click behavior
- mobile button and modal behavior

## Important developer-page data

- `src/app/(shell)/developer/data.ts`
- `src/app/(shell)/developer/project-utils.ts`

These files control:
- project definitions
- tags
- related project mapping
- project ordering behavior

## Developer page design principles already established

The current codebase favors:
- strong desktop/mobile differentiation
- themed ambient visuals
- reusable shared card surfaces
- system-oriented storytelling rather than generic portfolio grids

Avoid regressing the page into:
- generic card matrices
- duplicated hero-style blocks
- interactions that look clickable but are not
