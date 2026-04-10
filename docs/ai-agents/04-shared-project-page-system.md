# Shared Project Page System

This is the most important file for agents working on individual project pages.

## Main entry points

- route: `src/app/(shell)/developer/projects/[slug]/page.tsx`
- template: `src/app/(shell)/developer/components/ProjectPageTemplate.tsx`
- project data: `src/app/(shell)/developer/data.ts`

Each project page is mostly data-driven through `ProjectPageTemplate.tsx`.

## Core design of the shared project page

The shared project page currently combines:
- hero area
- media/gallery section
- architecture section
- markdown-driven narrative sections
- tech-used section
- related projects

The template supports project-specific variation through optional content fields in `data.ts`.

## Reusable architecture-related pieces

### `ArchitectureMap.tsx`

Purpose:
- render a visual architecture/system map from structured data

Important behavior:
- `showHeader`
- `mobileScrollableMapOnly`
- `mobileMinWidth`

Current mobile map rule:
- maps can be horizontally scrollable
- compact projects can omit forced min width
- wider projects can use `mobileMinWidth={720}`

### `ArchitectureNotesSection` inside `ProjectPageTemplate.tsx`

Current role:
- renders architecture explanation text
- if markdown has subsection structure, each subsection becomes a horizontal card
- otherwise falls back to a normal markdown card

This is currently implemented in the template, but it follows the same shared pattern logic as other extracted systems.

## Reusable subsection/content helpers

- `src/app/(shell)/developer/components/project-page-markdown.ts`

This file contains shared helpers for:
- duplicate heading stripping
- subsection parsing from markdown
- short summary generation
- stable subsection ids

These helpers are now the standard way to interpret markdown sections with `####` subtopics.

## Reusable card-row pattern

- `ProjectScrollableCardSection.tsx`

Use this when a markdown section has meaningful sub-items that should render as:
- mobile horizontal cards
- desktop rows or grids, depending on provided classes

Current uses include:
- Core Modules
- Workflow
- Architecture notes with subtopics

## Reusable expandable detail pattern

- `ProjectExpandableDetailSection.tsx`

Use this when a section should behave as:
- desktop expandable rows
- mobile modal/dialog detail view

Current uses include:
- Evolution
- Challenges

## Current markdown conventions on project pages

Markdown content often uses:
- `###` for the section heading that duplicates the outer page heading
- `####` for subsection items
- `---` as separators between subsection items

The shared markdown helpers already handle:
- stripping duplicated outer `###` headings
- splitting by `####`
- removing separator rules from subsection bodies

## Important caution

Do not assume every project section should use the advanced reusable patterns.

Use the subsection/card or expandable-detail systems only when:
- the data actually has subsection structure
- the interaction improves readability

Fallback behavior remains:
- one markdown body in one section card

## Theme and interaction expectations

Project pages already support:
- dark/light themes
- mobile-specific layouts
- gallery dialog interaction
- responsive architecture behavior

Any change should preserve:
- body scroll locking for dialogs
- no page-wide horizontal overflow
- desktop/mobile distinction where intentional
