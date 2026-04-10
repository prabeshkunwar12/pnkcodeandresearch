import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const kioskHostDotnetProject: Project =
{
  id: "kiosk-host-dotnet",
  slug: "kiosk-host-dotnet",
  name: "Kiosk Host & Room Control (.NET WebView)",
  featured: true,
  shortDescription:
    "WinForms orchestration layer between the Kiosk UI, Scorecard UI, Game Engine, backend API, and room hardware.",
  typeTags: ["runtime", "operations"],
  techTags: [".net", "api", "mssql"],
  content: `
### Overview

The **Kiosk Host & Room Control** application is one of the core software systems used in the facility.

Built in **.NET WinForms**, it acts as the orchestration layer between the **Kiosk UI**, **Scorecard UI**, **Game Engine**, **backend API**, and the physical **room hardware**.

This software does **not directly interact with customers**.
Customer interactions happen through the **Kiosk UI**, while the host application manages the runtime behavior behind the scenes.

Its responsibilities can be grouped into four major areas:

- **Display control**
- **Game Engine launch and runtime control**
- **Room device control**
- **Backend/API coordination**

Originally, this logic was tightly integrated with the **Game Engine** as one large application. As both systems grew, they were separated into two dedicated software layers because they served very different purposes.

---

### Architecture

The Kiosk Host acts as the central runtime coordinator for the room.

It displays two web applications through **WebView**:

- **Kiosk UI**
- **Scorecard**

It communicates with both and also maintains communication with:

- **Game Engine**
- **Backend API**
- **Room Hardware**

#### Core flow

- **Kiosk UI** sends selected game settings to the host:
- game variant
- player information
- game type (single player, multiplayer, custom)
- room/session actions

- **Host** launches the **Game Engine** with the required arguments

- **Game Engine** continuously sends realtime status back to the host through **socket communication**

- **Host** distributes that data to:
- **Kiosk UI**
- **Scorecard**
- **Backend API** (when needed)

- **Host** also handles the final **score submission to the API** once a game ends

#### Scorecard communication

The **Scorecard** is a separate web application displayed through WebView.

The host sends it:

- game type
- scores
- player information
- game progress
- game timer
- other realtime session data

Player info comes from the **Kiosk UI**, while most realtime session/gameplay data comes from the **Game Engine**.

---

### Core Responsibilities

#### 1. Display Control

The host manages room display configurations including:

- **1-screen setup** -> Kiosk only
- **2-screen setup** -> Kiosk + Scorecard
- **3-screen setup** -> Kiosk + Scorecard + Display screen

This made the host responsible for multi-display orchestration and routing the right content to the right monitor.

#### 2. Game Engine Launch & Runtime Control

The host receives game/session instructions from the Kiosk UI and launches the correct **Game Engine** instance with all required arguments, such as:

- selected variant
- number of players
- game type
- room-specific hardware settings
- test vs actual run

After launch, it continuously exchanges runtime data with the engine and redistributes that information to the UI layers.

#### 3. Room Device Control

The host provides direct control over room hardware such as:

- wristband scanner
- door lock
- restart button
- game controllers
- screens
- room-specific devices

For example, the host communicates with the **wristband scanner** by:

- receiving scanned UID values
- sending color signals
- starting/stopping scan mode
- sending acknowledgement signals

This hardware control layer is one of the reasons the host remained a native **WinForms** application instead of moving fully into the web layer.

#### 4. Backend / API Coordination

The host is also responsible for coordinating backend-facing runtime operations, including:

- relaying data to UI layers
- handling score submission after game completion
- keeping session/runtime information synchronized

It acts as a bridge between the realtime room runtime and the broader backend system.

---

### Admin Panel & Hardware Control

The **Admin Panel** was intentionally built in **WinForms**, not inside the Kiosk UI.

That decision gave us much deeper control over:

- Windows OS behavior
- hardware access
- room diagnostics
- recovery workflows

To open the admin features, staff perform a hidden **screen pattern gesture**, then enter a password.

Once authenticated, they can access advanced tools such as:

- simulate player scan
- lock / unlock door
- restart app
- restart PC
- check hardware status
- view warnings and alerts
- test LEDs
- verify sensors
- switch scorecard/display monitors if monitors were assigned incorrectly

The host also includes a dedicated **hardware status / control screen** for staff and developers to monitor room devices and troubleshoot issues directly.

---

### Evolution

The Kiosk Host evolved significantly over time.

#### Early version

- integrated directly with the **Game Engine**
- only scanned players
- launched the game

#### Later improvements

- separated from the Game Engine into its own system
- added **multi-screen support**
- added hardware controls
- added hidden **admin panel**
- continuously expanded staff tools and diagnostics

As the facility grew, the host evolved from a simple launch utility into a full room orchestration runtime.

---

### Challenges

This was one of the most complex room applications because it sat between many systems at once.

#### Kiosk mode + auto launch

One of the earliest challenges was making the system behave like a proper **kiosk appliance** on Windows.

We solved this using **PowerShell scripts** for startup behavior and room runtime control.

These scripts were later expanded for several other operational needs too.

#### Multi-screen management

Supporting **2 screens** was relatively straightforward.

Supporting **3 screens** was harder.

The biggest issue came from:

- HDMI splitters with no reliable identification
- identical monitors for scorecard and display screen

Because the monitors could appear swapped, we tried several detection approaches, but none were fully reliable.

The practical solution was to add a **Switch Screen** option in the admin panel.

That let staff/devs correct the mapping manually, and once saved, the setup would usually remain stable for some time.

#### Admin actions that mattered operationally

Every admin menu option existed because of a real operational problem.

Examples:

- **Restart App**
In kiosk mode, restarting the app otherwise required using the physical power button. This button made recovery much easier.

- **Close App**
Closes the app and reopens **Explorer**, which had otherwise been disabled for kiosk mode.

- **Update**
Pulls the latest build from Git while preserving room-specific settings and files, so we did not have to reconfigure each room on every update.

- **Simulate Scan**
Useful for developers when NFC cards were unavailable or when scanners were not usable during certain updates. Also useful for staff demos or temporary scan issues.

---

### Reliability & Operations

To improve stability, we also added **watchdog behavior** using PowerShell.

The watchdog checked:

- whether the host application was running
- whether hardware was responding correctly

If problems were detected, it could:

- restart the app
- restart hardware drivers
- attempt to restore room functionality automatically

This made the room software more resilient in real operating conditions.

---

### My Contribution

I have been involved in this project from the beginning, alongside the other AeroSports software systems.

My contribution included:

- helping build the host application from its earlier versions
- separating it from the Game Engine
- adding the admin panel
- implementing/loading screens and runtime workflows
- building and improving hardware control features
- contributing to PowerShell-based operational tooling

This was a collaborative project, and my teammates helped implement several features across the system.

I reviewed their work as part of the development process, and some of the best reliability ideas - especially the **watchdog** and several of the **kiosk scripts** - came from the team and worked out very well in practice.
`,
  company: "AeroSports",
  role: "Technical Lead / Full-Stack & Systems Engineering",
  quickFacts: [
    { label: "Company", value: "AeroSports" },
    { label: "Role", value: "Runtime orchestration + hardware coordination" },
    { label: "Stack", value: ".NET WinForms + WebView + sockets + hardware IO" },
    { label: "Deployment", value: "Room PC runtime coordinating displays, engine, API, and devices" },
    { label: "Status", value: "Production host runtime across active rooms" },
  ],
  overviewContent: `
The **Kiosk Host & Room Control** application is one of the core software systems used in the facility.

Built in **.NET WinForms**, it acts as the orchestration layer between the **Kiosk UI**, **Scorecard UI**, **Game Engine**, **backend API**, and the physical **room hardware**.

This software does **not directly interact with customers**.
Customer interactions happen through the **Kiosk UI**, while the host application manages the runtime behavior behind the scenes.

Its responsibilities can be grouped into four major areas:

- **Display control**
- **Game Engine launch and runtime control**
- **Room device control**
- **Backend/API coordination**

Originally, this logic was tightly integrated with the **Game Engine** as one large application. As both systems grew, they were separated into two dedicated software layers because they served very different purposes.
`,
  architectureNotes: `
The Kiosk Host acts as the central runtime coordinator for the room.

It displays two web applications through **WebView**:

- **Kiosk UI**
- **Scorecard**

It communicates with both and also maintains communication with:

- **Game Engine**
- **Backend API**
- **Room Hardware**

#### Core flow

- **Kiosk UI** sends selected game settings to the host:
- game variant
- player information
- game type (single player, multiplayer, custom)
- room/session actions

- **Host** launches the **Game Engine** with the required arguments

- **Game Engine** continuously sends realtime status back to the host through **socket communication**

- **Host** distributes that data to:
- **Kiosk UI**
- **Scorecard**
- **Backend API** (when needed)

- **Host** also handles the final **score submission to the API** once a game ends

#### Scorecard communication

The **Scorecard** is a separate web application displayed through WebView.

The host sends it:

- game type
- scores
- player information
- game progress
- game timer
- other realtime session data

Player info comes from the **Kiosk UI**, while most realtime session/gameplay data comes from the **Game Engine**.
`,
  responsibilitiesContent: `
#### 1. Display Control

The host manages room display configurations including:

- **1-screen setup** -> Kiosk only
- **2-screen setup** -> Kiosk + Scorecard
- **3-screen setup** -> Kiosk + Scorecard + Display screen

This made the host responsible for multi-display orchestration and routing the right content to the right monitor.

#### 2. Game Engine Launch & Runtime Control

The host receives game/session instructions from the Kiosk UI and launches the correct **Game Engine** instance with all required arguments, such as:

- selected variant
- number of players
- game type
- room-specific hardware settings
- test vs actual run

After launch, it continuously exchanges runtime data with the engine and redistributes that information to the UI layers.

#### 3. Room Device Control

The host provides direct control over room hardware such as:

- wristband scanner
- door lock
- restart button
- game controllers
- screens
- room-specific devices

For example, the host communicates with the **wristband scanner** by:

- receiving scanned UID values
- sending color signals
- starting/stopping scan mode
- sending acknowledgement signals

This hardware control layer is one of the reasons the host remained a native **WinForms** application instead of moving fully into the web layer.

#### 4. Backend / API Coordination

The host is also responsible for coordinating backend-facing runtime operations, including:

- relaying data to UI layers
- handling score submission after game completion
- keeping session/runtime information synchronized

It acts as a bridge between the realtime room runtime and the broader backend system.
`,
  adminPanelContent: `
The **Admin Panel** was intentionally built in **WinForms**, not inside the Kiosk UI.

That decision gave us much deeper control over:

- Windows OS behavior
- hardware access
- room diagnostics
- recovery workflows

To open the admin features, staff perform a hidden **screen pattern gesture**, then enter a password.

Once authenticated, they can access advanced tools such as:

- simulate player scan
- lock / unlock door
- restart app
- restart PC
- check hardware status
- view warnings and alerts
- test LEDs
- verify sensors
- switch scorecard/display monitors if monitors were assigned incorrectly

The host also includes a dedicated **hardware status / control screen** for staff and developers to monitor room devices and troubleshoot issues directly.
`,
  evolutionTitle: "Evolution",
  evolutionContent: `
The Kiosk Host evolved significantly over time.

#### Early version

- integrated directly with the **Game Engine**
- only scanned players
- launched the game

#### Later improvements

- separated from the Game Engine into its own system
- added **multi-screen support**
- added hardware controls
- added hidden **admin panel**
- continuously expanded staff tools and diagnostics

As the facility grew, the host evolved from a simple launch utility into a full room orchestration runtime.
`,
  challengesContent: `
This was one of the most complex room applications because it sat between many systems at once.

#### Kiosk mode + auto launch

One of the earliest challenges was making the system behave like a proper **kiosk appliance** on Windows.

We solved this using **PowerShell scripts** for startup behavior and room runtime control.

These scripts were later expanded for several other operational needs too.

#### Multi-screen management

Supporting **2 screens** was relatively straightforward.

Supporting **3 screens** was harder.

The biggest issue came from:

- HDMI splitters with no reliable identification
- identical monitors for scorecard and display screen

Because the monitors could appear swapped, we tried several detection approaches, but none were fully reliable.

The practical solution was to add a **Switch Screen** option in the admin panel.

That let staff/devs correct the mapping manually, and once saved, the setup would usually remain stable for some time.

#### Admin actions that mattered operationally

Every admin menu option existed because of a real operational problem.

Examples:

- **Restart App**
In kiosk mode, restarting the app otherwise required using the physical power button. This button made recovery much easier.

- **Close App**
Closes the app and reopens **Explorer**, which had otherwise been disabled for kiosk mode.

- **Update**
Pulls the latest build from Git while preserving room-specific settings and files, so we did not have to reconfigure each room on every update.

- **Simulate Scan**
Useful for developers when NFC cards were unavailable or when scanners were not usable during certain updates. Also useful for staff demos or temporary scan issues.
`,
  reliabilityContent: `
To improve stability, we also added **watchdog behavior** using PowerShell.

The watchdog checked:

- whether the host application was running
- whether hardware was responding correctly

If problems were detected, it could:

- restart the app
- restart hardware drivers
- attempt to restore room functionality automatically

This made the room software more resilient in real operating conditions.

#### Operational tooling

- **Restart App** simplified recovery inside kiosk mode
- **Close App** restored **Explorer** when kiosk mode needed to be exited
- **Update** pulled the latest build while preserving room-specific settings and files
- **Simulate Scan** supported developer workflows, staff demos, and temporary scanner issues
- **PowerShell scripts** handled startup behavior, auto-launch, and watchdog recovery
`,
  contributionContent: `
I have been involved in this project from the beginning, alongside the other AeroSports software systems.

My contribution included:

- helping build the host application from its earlier versions
- separating it from the Game Engine
- adding the admin panel
- implementing/loading screens and runtime workflows
- building and improving hardware control features
- contributing to PowerShell-based operational tooling

This was a collaborative project, and my teammates helped implement several features across the system.

I reviewed their work as part of the development process, and some of the best reliability ideas - especially the **watchdog** and several of the **kiosk scripts** - came from the team and worked out very well in practice.
`,
  architectureMap: {
    title: "Architecture",
    description:
      "The host sits in the middle of the room runtime, coordinating display layers, realtime engine traffic, API submission, and direct device control.",
    badges: ["WinForms runtime", "WebView display host", "Hardware orchestration"],
    nodes: [
      { id: "kiosk-ui", label: "Kiosk UI", row: 1 },
      { id: "scorecard", label: "Scorecard", row: 1 },
      { id: "kiosk-host", label: "Kiosk Host", row: 2 },
      { id: "game-engine", label: "Game Engine", row: 3 },
      { id: "backend-api", label: "Backend API", row: 3 },
      { id: "room-hardware", label: "Room Hardware", row: 4 },
    ],
    edges: [
      {
        from: "kiosk-ui",
        to: "kiosk-host",
        label: "session control",
        bidirectional: true,
        labelOffsetX: -22,
        labelOffsetY: 14,
      },
      {
        from: "kiosk-host",
        to: "scorecard",
        label: "display relay",
        labelOffsetX: 22,
        labelOffsetY: 14,
      },
      {
        from: "kiosk-host",
        to: "game-engine",
        label: "launch + runtime",
        bidirectional: true,
        labelOffsetX: -26,
        labelOffsetY: -10,
      },
      {
        from: "kiosk-host",
        to: "room-hardware",
        label: "device control",
        bidirectional: true,
        labelOffsetX: 56,
        labelOffsetY: 4,
      },
      {
        from: "kiosk-host",
        to: "backend-api",
        label: "score submission",
        labelOffsetX: 28,
        labelOffsetY: -10,
      },
    ],
  },
  techStack: [
    { name: ".NET", iconSrc: techStackIcons[".NET"] },
    { name: "C#", iconSrc: techStackIcons["C#"] },
    { name: "WebView2" },
    { name: "COM Ports" },
    { name: "UDP" },
    { name: "Sockets" },
  ],
  mediaSectionTitle: "Kiosk Host Screens & Controls",
  mediaSectionLayout: "coverflow",
  mediaKeys: [
    "root:hardware",
    "file:/developer/aerosports/frontend-screens/game-selection/admin-dialog.png",
    "file:/developer/aerosports/frontend-screens/game-selection/admin-password.png",
  ],
  links: [{ label: "Case study", href: "/developer/aerosports" }],
  relatedProjectIds: ["kiosk-ui-nextjs", "scorecard-nextjs"],
};
