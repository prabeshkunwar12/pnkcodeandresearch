import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const axeWrapperMauiProject: Project =
{
  id: "axe-wrapper-maui",
  slug: "axe-wrapper-maui",
  company: "AeroSports",
  role: "Automation + Systems Integration",
  period: "Production system",
  name: "Axe Throwing Wrapper (MAUI Kiosk Automation)",
  shortDescription:
    "Tablet-based wrapper application that automated an externally provided axe-throwing system using NFC wristband validation, timed play access, and remote PC mirroring.",
  typeTags: ["operations", "frontend"],
  techTags: ["maui", ".net", "api"],
  content: `
### Overview

The **Axe Throwing Wrapper** is a tablet-based application built to automate an axe-throwing system provided by an external vendor.

It combines wristband validation, session timing, and remote-session automation into a customer-facing kiosk workflow.
`,
  quickFacts: [
    { label: "Stack", value: "MAUI Android tablet app" },
    { label: "Wrapper", value: "Remote game access" },
    { label: "Validation", value: "NFC wristband checks" },
    { label: "Session", value: "Timed session enforcement" },
    { label: "Integration", value: "External vendor automation" },
  ],
  mediaSectionTitle: "Axe Wrapper Screens",
  mediaSectionLayout: "coverflow",
  architecture: {
    title: "Architecture",
    description:
      "The wrapper tablet validates wristbands through the API, then launches and controls a mirrored remote session connected to the vendor-provided axe throwing PC.",
    badges: ["Tablet kiosk", "Remote wrapper", "NFC validation"],
    nodes: [
      { id: "tablet", label: "Tablet Wrapper", row: 1 },
      { id: "api", label: "Backend API", row: 2 },
      { id: "remote", label: "Remote Connection App", row: 2 },
      { id: "game-pc", label: "Axe Game PC", row: 3 },
    ],
    edges: [
      {
        from: "tablet",
        to: "api",
        label: "wristband validation",
        bidirectional: true,
      },
      { from: "tablet", to: "remote", label: "launch + automate" },
      { from: "remote", to: "game-pc", label: "mirrored control", bidirectional: true },
    ],
  },
  overviewContent: `
### Overview

The **Axe Throwing Wrapper** is a tablet-based application built to automate an axe-throwing system provided by an external vendor.

The physical axe-throwing setup came with:
- a dedicated **PC**
- a **3D sensor / camera** system that detects axe position relative to the board
- projector and display equipment
- the vendor's game software

While the game itself worked, it required staff to manually:
- remote into the game PC
- start/stop sessions
- manage the play flow

That manual process was not ideal for operations, so we built a **wrapper application** that automated access to the game through a kiosk tablet workflow.

The wrapper was built with **MAUI**, using a similar tablet-based approach to the registration system.
`,
  workflowTitle: "Player Workflow",
  workflowContent: `
### Player Workflow

The wrapper was designed to let players access the axe-throwing system through a simple kiosk flow.

#### Step 1 - Scan wristband

Players begin by scanning their wristband on the tablet using the tablet's built-in **NFC scanner**.

The wrapper validates the wristband through the **API**.

---

#### Step 2 - Select play time

After validation, players are asked to choose how long they want to play.

The available options are restricted by the amount of time remaining on the wristband.

Only valid play durations are shown.

---

#### Step 3 - Open the mirrored game

Once a time option is selected, the wrapper:
- launches the remote connection application
- fills required connection details automatically
- clicks the required buttons to connect to the correct axe game PC

This mirrors the PC game onto the tablet so players can interact with it directly.

---

#### Step 4 - Play and exit

Players can:
- choose the games available inside the axe-throwing software
- use the mirrored interface from the tablet
- exit the game through the wrapper flow

The wrapper also enforces session timing so access stays aligned with the selected play duration.
`,
  architectureNotesContent: `
### Architecture Notes

The wrapper system combines three layers:

#### 1. Android tablet wrapper (MAUI)
The tablet runs the wrapper application in kiosk-style mode.

Its responsibilities include:
- NFC wristband scanning
- time validation flow
- launching the remote session
- managing the customer-facing wrapper experience

#### 2. Backend API
The wrapper communicates with the API to:
- validate wristbands
- read remaining time
- determine allowed session durations

#### 3. Remote connection layer
Instead of building a custom screen-mirroring stack from scratch, we integrated a third-party **remote connection application**.

The wrapper:
- opens the remote connection application
- fills required fields
- clicks the right buttons automatically
- connects the customer to the correct axe-throwing PC

That remote session mirrors the game PC onto the tablet.
`,
  evolutionContent: `
### Evolution

The project began when we purchased a full axe-throwing setup from an external vendor.

The system included:
- game PCs
- camera / sensor system
- projector
- multi-port USB hardware
- axes and room equipment

We had **3 axe-throwing lanes/systems** to set up.

#### Physical setup phase

I worked with the construction team to decide:
- the structure of the axe section
- where PCs should go
- where projectors should be placed
- how wiring should be routed

After the physical skeleton was built, I connected one system and created the initial working model.

Then I worked with the vendor on calls to:
- configure the game
- make it playable
- resolve setup issues

#### Automation phase

Once the vendor system was working, the main problem left was that staff still had to manually control it by remotely accessing the PCs.

That led to the wrapper concept.

We decided to:
- use a **tablet**
- add **NFC wristband support**
- automate the remote connection flow
- turn the setup into a kiosk-like game access system

As the wrapper evolved, more features were added, including:
- auto-clicking dialogs/messages/errors to recover back to the game screen
- hiding content not intended for customers
- a help menu for players
- a timer display showing remaining play time
`,
  challengesContent: `
### Challenges

#### 1. Physical setup of the axe-throwing lanes

Before the wrapper app even existed, the physical setup itself was challenging.

We had to design the structure to make the experience:
- safe
- playable
- visually correct

This included:
- adding **metal netting** in each lane and overhead for safety
- planning projector placement
- ensuring the projector was mounted high enough that it could not be reached by someone holding an axe

Then came the actual calibration/setup of:
- projector
- board
- camera

That part required direct troubleshooting with the axe-throwing company on calls.

---

#### 2. Android/kiosk integration

The wrapper application itself was an Android app, which introduced mobile-specific challenges.

We had to work through:
- Android settings
- kiosk behavior
- app launch flow
- NFC handling
- tablet usability

---

#### 3. Remote mirroring approach

We could not find a practical way to directly mirror the game PC to Android in the way we wanted.

Building our own remote host system was outside the scope of the project.

So we made the practical decision to integrate a third-party remote connection solution into our wrapper workflow.

That turned out to be the right tradeoff:
- much faster implementation
- good enough reliability
- allowed us to automate the session without reinventing the whole remote layer
`,
  contributionContent: `
### My Contribution

I contributed to both the **physical setup** and the **software automation** side of this system.

#### Setup / integration
I helped:
- set up the axe-throwing system
- fix hardware/software issues during installation
- work with the vendor to get the game running properly
- train staff on how to use the system

#### Wrapper application
For the wrapper itself, I already had a team working on related applications.

While I was focused on the **registration system**, I handed the main wrapper implementation to one of my developers with the requirements and direction.

I supported him when needed and helped unblock issues.

One of the strongest implementation ideas on this project came from him:
- using a third-party remote host system to mirror the game screen

As the wrapper evolved, we worked together on adding practical features like:
- auto-clicking blocking popups or errors
- hiding content not meant for customers
- adding help/instruction menus
- showing remaining play time

This made the wrapper much more usable in a real customer environment.
`,
  techStack: [
    { name: "MAUI" },
    { name: ".NET", iconSrc: techStackIcons[".NET"] },
    { name: "Android" },
    { name: "NFC" },
    { name: "API" },
    { name: "Remote Access" },
  ],
  mediaKeys: ["frontend-screens/axe"],
  links: [{ label: "Case study", href: "/developer/aerosports" }],
  relatedProjectIds: ["registration-tablet", "pos-wpf", "admin-portal"],
};
