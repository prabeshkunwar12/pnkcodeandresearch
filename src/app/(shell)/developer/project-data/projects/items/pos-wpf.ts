import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const posWpfProject: Project =
{
  id: "pos-wpf",
  slug: "pos-wpf",
  name: "POS & Wristband Management (WPF)",
  company: "AeroSports",
  role: "Desktop App + Workflow Design",
  period: "Production system",
  shortDescription:
    "Staff-facing WPF application for initializing, registering, renewing, and managing NFC wristbands and player records through the backend API.",
  typeTags: ["operations", "admin"],
  techTags: ["wpf", ".net", "api", "mssql"],
  content: `
### Overview

The **POS & Wristband Management** system is a **.NET WPF desktop application** used by staff to manage NFC wristbands and player records.

It evolved from a simple initializer into a broader staff operations tool that supports registration, lookup, renewal, and editing through API-driven workflows.
`,
  quickFacts: [
    { label: "Stack", value: "WPF desktop app" },
    { label: "Workflow", value: "NFC wristband operations" },
    { label: "Surface", value: "4 core operational pages" },
    { label: "Users", value: "Staff-side player management" },
    { label: "Data", value: "API-driven database access" },
  ],
  mediaSectionTitle: "POS Screens",
  mediaSectionLayout: "coverflow",
  architecture: {
    title: "Architecture",
    description:
      "The POS runs on the staff-side PC with an NFC reader attached. It reads and writes wristband and player data through the backend API and supports multiple operational workflows for registration, lookup, renewal, and initialization.",
    badges: ["WPF desktop app", "NFC reader", "Staff operations"],
    nodes: [
      { id: "staff", label: "Staff POS", row: 1 },
      { id: "api", label: "Backend API", row: 2 },
      { id: "database", label: "Database", row: 3 },
    ],
    edges: [
      {
        from: "staff",
        to: "api",
        label: "read / write",
        bidirectional: true,
        labelOffsetY: -10,
      },
      {
        from: "api",
        to: "database",
        label: "data access",
        bidirectional: true,
        labelOffsetY: -10,
      },
    ],
  },
  overviewContent: `
### Overview

The **POS & Wristband Management** system is a **.NET WPF desktop application** used by staff to manage NFC wristbands and player records.

It was originally built for one simple purpose:
- initialize a wristband with time / game allocation
- let players complete registration themselves on the registration tablet

Over time, it evolved into a much more capable operational tool.

Today, it is used to:
- initialize wristbands
- register players directly
- renew old wristbands
- search and edit player records
- manage player details, time, and related wristband history

It communicates with the backend through the **API** and serves as one of the main staff-facing operational tools in the facility.
`,
  corePagesContent: `
### Core Pages

The POS includes **4 major pages**.

#### 1. Register

The **Register** page allows staff to create player records and bind a new wristband to them.

Staff can:
- enter the player's email (**primary key**)
- set their actual/game name
- assign time allocation to the wristband
- scan a new wristband when prompted
- bind the wristband to that player

It also supports family/group workflows:
- if a player is a minor, the parent can be registered as the primary account
- children can then be added under the same email

This made it easier to handle real family registration instead of forcing separate isolated entries.

---

#### 2. Lookup

The **Lookup** page is one of the most feature-rich parts of the application.

It allows staff to:
- view all players in the database
- search players through the search bar
- inspect their records such as:
- wristbands used
- games played
- scores
- time remaining
- edit player information:
- name
- email
- children / dependents
- child information
- add more time to a wristband if needed

This page turned the POS into more than a scanner tool - it became a practical management system for day-to-day staff operations.

---

#### 3. Renew

The **Renew** page supports returning players who already have an old wristband.

Instead of entering all the information again, staff can:
- scan the old wristband
- retrieve the linked record
- add more time directly

This makes repeat visits much faster and more convenient.

---

#### 4. Initialize

The **Initialize** page supports fast preparation when staff are busy.

In this mode, staff can:
- scan a blank wristband
- add the time allocation
- skip full player registration at the POS

The player can then complete registration later using the **registration tablet**.

This created a faster fallback workflow during peak traffic.
`,
  evolutionContent: `
### Evolution

The earliest version of the POS was much simpler.

It used to be:
- a small **WinForms** dialog
- a time dropdown
- a wristband scan action
- just enough to initialize a wristband for later registration

Players then had to complete everything on the registration tablet.

That approach became insufficient as usage patterns grew more complex.

#### Why the old flow was not enough

For events like:
- school trips
- birthday parties
- larger groups of children

the old flow created several problems:

- teachers / parents / guides had to spend too long scanning and managing players
- time started immediately after initialization
- some players would lose fair play time before they were actually ready

There were also management limitations:
- changing player info later required going through the admin panel or developers
- staff were not given enough operational control
- the old UI was limited and not well suited for growth

#### Transition to WPF

We moved the application to **WPF** and redesigned the interface using **XAML**.

This gave us:
- a cleaner UI
- easier extensibility
- better page-based workflows
- a stronger foundation for feature growth

#### Major additions after the redesign

- **Register page** for direct staff-driven player registration
- support for bulk/group registration (school / party / parent-based workflows)
- **Lookup page** for searching and editing player info
- **Renew page** for quick repeat-customer workflows
- improved popup messages, alerts, and instructions
- detection of whether the NFC reader is connected and available

This transformed the POS from a basic initializer tool into a proper staff operations system.
`,
  challengesContent: `
### Challenges

#### 1. Designing the right operational workflow

The first challenge was deciding on the architecture that would let both players and staff use the system efficiently.

We needed a workflow where:
- wristbands could be introduced into the system quickly
- staff could work fast during rush periods
- players could still complete registration later if needed

That led to the initialization-first model, which became the base for the broader registration workflow.

---

#### 2. Expanding the database and process model

As we added more features, the old data model and process assumptions were no longer enough.

We had to modify database structures to support:
- richer POS features
- group/family relationships
- editable player records
- interoperability between the POS and registration tablet

One important goal was making the **POS** and **registration system** behave consistently so either one could be used depending on the operational situation.

---

#### 3. Moving from WinForms to WPF

Another challenge was changing the application into a **WPF** system.

This required:
- learning new UI patterns
- structuring page-based flows
- redesigning the interface in XAML

One of my teammates had stronger WPF experience and suggested the shift.
He helped significantly with:
- the conversion
- feature additions
- page implementation
- UI work

That change ended up being the right decision because it made the application much easier to grow.

---

#### 4. Staff adoption and operational handoff

The new version was a major upgrade with many more features.

That also meant it could feel overwhelming for staff at first.

So the challenge was not just building it, but rolling it out properly.

We handled this by:
- preparing documentation
- creating guide videos
- explaining workflows clearly

Once the tutorial and onboarding part was handled, staff ended up liking the new system and its capabilities.
`,
  contributionContent: `
### My Contribution

I worked on the POS as part of the broader AeroSports software ecosystem and contributed to both the feature evolution and the operational workflow design.

My contribution included:
- helping define the workflow architecture for initialization, registration, renewal, and lookup
- contributing to the transition from a minimal WinForms tool into a full WPF application
- helping align POS behavior with the registration tablet system
- improving messaging, alerts, and user flow clarity
- supporting rollout, training, and staff adoption through documentation and guide materials

This project was also collaborative.

One of my teammates had stronger WPF experience and played an important role in helping complete:
- the new WPF/XAML UI
- page structure
- feature development

Together, we turned the POS from a limited initializer into a much more capable staff operations tool.
`,
  techStack: [
    { name: "WPF" },
    { name: ".NET", iconSrc: techStackIcons[".NET"] },
    { name: "C#" },
    { name: "XAML" },
    { name: "NFC" },
    { name: "API" },
  ],
  mediaKeys: ["frontend-screens/pos"],
  links: [{ label: "Case study", href: "/developer/aerosports" }],
  relatedProjectIds: [
    "registration-tablet",
    "admin-portal",
    "kiosk-host-dotnet",
  ],
};
