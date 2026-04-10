import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const adminPortalProject: Project =
{
  id: "admin-portal",
  slug: "admin-portal",
  name: "Admin Portal (Platform Control & Analytics)",
  featured: true,
  company: "AeroSports",
  role: "Platform Development + System Design",
  period: "Production system",
  shortDescription:
    "Centralized web platform for managing games, players, analytics, smart devices, and documentation with authentication and role-based access control.",
  typeTags: ["frontend", "backend", "operations", "admin"],
  techTags: ["next.js", "express", "mssql", "api"],
  content: `
### Overview

The **Admin Portal** is a centralized platform used to manage games, players, analytics, smart devices, and internal documentation across the facility.

It grew from a simple developer tool into the operational control center of the platform.
`,
  quickFacts: [
    { label: "Stack", value: "Next.js admin platform" },
    { label: "Security", value: "JWT + role-based access" },
    { label: "Control", value: "Game + player + config management" },
    { label: "Automation", value: "Smart device operations" },
    { label: "Insights", value: "Analytics dashboards" },
  ],
  mediaSectionTitle: "Admin Portal Screens",
  mediaSectionLayout: "coverflow",
  architecture: {
    title: "Architecture",
    description:
      "The admin portal is a frontend application hosted on the server that interacts with a secured backend API. All database operations, authentication, and smart device control are handled through the API.",
    badges: ["Platform control", "JWT secured", "API-driven"],
    nodes: [
      { id: "admin-ui", label: "Admin Portal (Next.js)", row: 1 },
      { id: "api", label: "Backend API", row: 2 },
      { id: "database", label: "Database", row: 3 },
      { id: "devices", label: "Smart Devices", row: 3 },
    ],
    edges: [
      { from: "admin-ui", to: "api", label: "secure requests", bidirectional: true },
      { from: "api", to: "database", label: "data access", bidirectional: true },
      { from: "api", to: "devices", label: "device control", bidirectional: true },
    ],
  },
  overviewContent: `
### Overview

The **Admin Portal** is a centralized web platform used to manage almost every operational aspect of the facility.

It started as a simple internal tool for developers to:
- modify game settings
- update game variants
- avoid directly working with the database

Over time, it evolved into a full platform that supports:

- game configuration
- player data management
- analytics and reporting
- smart device control and automation
- internal documentation and troubleshooting guides

It is built using **Next.js** and communicates with the backend through a secured API.
`,
  modulesContent: `
### Core Modules

The admin portal eventually became a multi-module system.

#### 1. Game Management

Allows developers/admins to:
- create new games and variants
- modify game descriptions
- adjust time, levels, and difficulty
- update game-specific configurations

This removed the need to directly modify database tables.

---

#### 2. Player Management

Includes a full player table with the ability to:
- view player records
- update player details
- manage wristband-related data

---

#### 3. Config Management

Stores system-level configurations such as:
- game parameters
- feature flags
- environment-related settings

---

#### 4. Smart Device Control

Once smart switches and automation were introduced, we added:

- control of smart devices from the portal
- scheduling and automation settings
- manual override capabilities

Important note:
All device logic is handled in the **API**, not the frontend.

The admin portal only:
- updates settings
- triggers API actions

---

#### 5. Analytics Dashboard

Later, analytics became one of the most valuable parts of the portal.

It allowed:
- tracking number of players
- analyzing game performance
- monitoring usage trends

This removed the need to run SQL queries manually and made insights accessible to managers and owners.

---

#### 6. Documentation & Manuals

I added a dedicated documentation section that includes:

- game room details
- device explanations
- troubleshooting steps
- FAQs

This turned the portal into a **knowledge base** for staff and developers.
`,
  workflowContent: `
### Workflow

#### Authentication

When a user opens the portal:

1. User enters username and password
2. Request is sent to the API
3. API validates:
 - credentials
 - request origin (IP / CORS checks)

If valid:
- API returns a **JWT token**
- user is logged in

---

#### Authorization

Access is role-based.

- **Developers / Admins**
- full access
- game configuration
- device control
- system settings

- **Staff / Managers**
- limited access
- player management
- documentation
- selected device controls

Users only see the sections they are authorized to access.

---

#### Data flow

- Admin UI sends requests to API
- API processes:
- authentication
- authorization
- database operations
- device actions
- Response is returned to the UI

This keeps all sensitive logic out of the frontend.
`,
  evolutionContent: `
### Evolution

#### Phase 1 - Developer tool

The portal started as a simple internal tool for developers.

It allowed:
- editing game tables
- modifying configurations
- creating new game variants quickly

At this stage:
- no authentication
- no polished UI
- only used by developers

---

#### Phase 2 - Expanding data control

We added:
- player tables
- configuration tables

The portal became more useful for managing data across the system.

---

#### Phase 3 - Smart device integration

When smart switches and automation were introduced:

- we added device control features
- extended the database schema
- connected automation logic through the API

---

#### Phase 4 - Multi-user platform

We wanted managers and staff to use the portal.

This required:
- authentication and authorization
- role-based UI
- a complete UI redesign

Instead of patching the old system, we rebuilt it as a new project while keeping previous features.

---

#### Phase 5 - Analytics and documentation

The final major upgrades included:

- analytics dashboards
- performance tracking
- documentation and manuals section

At this point, the portal had evolved into a full operational platform.
`,
  challengesContent: `
### Challenges

#### 1. Tight coupling with API and database

This project needed strong alignment with the backend.

Any change in:
- database schema
- API endpoints

required updates in the portal.

Maintaining consistency across all layers was critical.

---

#### 2. Smart device integration

Integrating smart device control into a frontend-driven system was tricky.

Initially, handling device logic directly in the frontend was:
- unsafe
- difficult to maintain

The solution was to move all device logic into the **API** and let the portal:
- send requests
- update settings

This separation improved security and maintainability.

---

#### 3. Authentication and authorization redesign

Adding authentication and authorization into an existing system was complex.

We decided to:
- rebuild the project
- implement JWT-based authentication
- add middleware in the API for token validation
- design role-based access control

---

#### 4. Analytics implementation

Adding analytics was both challenging and rewarding.

We needed to:
- aggregate data correctly
- present it clearly
- make it useful for non-technical users

This replaced manual SQL queries with visual insights.
`,
  contributionContent: `
### My Contribution

This project evolved alongside the entire AeroSports system, and I played a major role throughout its lifecycle.

My contributions included:

- building and evolving the initial developer tool
- designing workflows for game and configuration management
- guiding the transition into a multi-user platform
- working with the team to rebuild the portal with authentication and improved UI
- integrating smart device control through API design decisions
- adding a full documentation section with system knowledge, guides, and troubleshooting
- supporting analytics integration and making the platform useful for managers and owners

This project reflects both my technical work and my role in shaping the system as it scaled.
`,
  techStack: [
    { name: "Next.js" },
    { name: "React" },
    { name: "TypeScript" },
    { name: "JWT" },
    { name: "API" },
    { name: "Charts / Analytics" },
  ],
  mediaKeys: ["frontend-screens/admin_portal"],
  links: [{ label: "Case study", href: "/developer/aerosports" }],
  relatedProjectIds: ["pos-wpf", "registration-tablet", "kiosk-host-dotnet"],
};
