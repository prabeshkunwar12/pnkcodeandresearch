# Repository Structure

## Top-level areas

### `src/`

Main Next.js application code.

Important subareas:

- `src/app/(landing)/`
  - landing page
- `src/app/(shell)/developer/`
  - main developer portfolio
  - project browser
  - project detail pages
  - AeroSports case study
- `src/app/(shell)/researcher/`
  - researcher page and quantum-computing content
- `src/components/`
  - shared UI and section components
- `src/data/`
  - images and supporting static data

### `resume-data/`

Structured resume content source of truth.

Contains:
- basics
- experience
- education
- certifications
- skills
- projects
- resume rules
- example job descriptions

### `scripts/`

Python and Node scripts used for:
- resume generation
- targeted resume generation
- calibration
- AeroSports media manifest generation

### `resume/`

Generated outputs and LaTeX template.

Contains:
- generated `.tex` outputs
- calibration JSON
- Jinja LaTeX template

## Main application entry points

### Landing

- `src/app/(landing)/page.tsx`

### Developer page

- `src/app/(shell)/developer/page.tsx`

### Shared project detail route

- `src/app/(shell)/developer/projects/[slug]/page.tsx`

### Researcher page

- `src/app/(shell)/researcher/page.tsx`

### AeroSports case study page

- `src/app/(shell)/developer/aerosports/page.tsx`

## Most important shared files for UI tasks

### Project pages

- `src/app/(shell)/developer/components/ProjectPageTemplate.tsx`
- `src/app/(shell)/developer/components/ArchitectureMap.tsx`
- `src/app/(shell)/developer/components/ProjectScrollableCardSection.tsx`
- `src/app/(shell)/developer/components/ProjectExpandableDetailSection.tsx`
- `src/app/(shell)/developer/components/project-page-markdown.ts`
- `src/components/shared/FocusGallery.tsx`

### Developer overview and project browsing

- `src/app/(shell)/developer/components/ProjectBrowserSection.tsx`
- `src/app/(shell)/developer/components/ProjectView.tsx`
- `src/app/(shell)/developer/components/DeveloperSkillsSection.tsx`
- `src/app/(shell)/developer/components/DesktopCapabilityCardsRow.tsx`
- `src/app/(shell)/developer/components/MobileCapabilityCarousel.tsx`

### Profile shell and global structure

- `src/components/profile/profile-shell.tsx`
- `src/components/profile/page-section-nav.tsx`
- `src/app/layout.tsx`
- `src/app/(shell)/layout.tsx`
- `src/app/globals.css`

## Data sources for project pages

The main developer project content lives in:

- `src/app/(shell)/developer/data.ts`

That file contains:
- project metadata
- project copy
- architecture maps
- grouped tech data
- relationships between projects

The shared project template depends heavily on this file.
