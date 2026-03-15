import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";

export type ProjectLink = { label: string; href: string };
export type ProjectFact = { label: string; value: string };
export type ProjectMedia = { src: string; alt: string; caption?: string };
export type ProjectArchitectureNode = {
  id: string;
  label: string;
  row?: number;
};
export type ProjectArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
  bidirectional?: boolean;
  labelOffsetX?: number;
  labelOffsetY?: number;
};
export type ProjectArchitectureMap = {
  title?: string;
  description?: string;
  badges?: string[];
  nodes: ProjectArchitectureNode[];
  edges: ProjectArchitectureEdge[];
};

export type TechItem = {
  name: string;
  iconSrc?: string;
  lightIconSrc?: string;
  darkIconSrc?: string;
  iconSrcDark?: string;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  content: string;
  techStack: TechItem[];
  company?: string;
  period?: string;
  role?: string;
  mediaKeys?: string[];
  media?: ProjectMedia[];
  mediaSectionTitle?: string;
  mediaSectionMetrics?: string[];
  mediaSectionLayout?: "carousel" | "gallery" | "coverflow";
  links?: ProjectLink[];
  tags?: string[];
  relatedProjectIds?: string[];
  architecture?: ProjectArchitectureMap;
  quickFacts?: Array<ProjectFact | string>;
  overviewContent?: string;
  architectureNotes?: string;
  customerFlowContent?: string;
  workflowContent?: string;
  logicStructureContent?: string;
  screenTypesContent?: string;
  devicesContent?: string;
  softwareFlowContent?: string;
  responsibilitiesContent?: string;
  adminPanelContent?: string;
  evolutionContent?: string;
  evolutionTitle?: string;
  challengesContent?: string;
  reliabilityContent?: string;
  contributionContent?: string;
  stackDecisionContent?: string;
  impactContent?: string;
  architectureMap?: ProjectArchitectureMap;
};

export const developerProjects: Project[] = [
  {
    id: "kiosk-ui-nextjs",
    slug: "kiosk-ui-nextjs",
    name: "Kiosk UI (Next.js)",
    shortDescription:
      "Customer and staff-facing kiosk UI for room readiness, player scans, variant selection, and session controls.",
    content: `
### Overview

The **Kiosk UI** is the web-based frontend of the full kiosk system used in AeroSports game rooms.

It is built with **Next.js** and rendered inside the **WinForms WebView host application**. The UI is hosted centrally on the server, and each game host requests the page with its own room-specific parameters.

Its role is focused on the **customer and staff interaction layer** only. It does **not directly control hardware**, door locks, admin tools, or other device-level features. Those are handled by the **Kiosk Host** application.

The Kiosk UI is responsible for:
- showing game variants and room details
- handling player wristband scans
- guiding customers through the start flow
- showing game information and high scores
- sending session start instructions to the host app
- receiving room/game status updates from the host

---

### Architecture

The Kiosk UI communicates with two layers:

#### Kiosk Host (WinForms)

**Sends to Host**

- selected **game variant**
- scanned **player information**
- **game type** (single player, multiplayer, custom)
- any variant-specific session settings
- waiting state / session actions

**Receives from Host**

- current **game status**
- reset / refresh commands
- scanned **NFC wristband IDs**
- room-specific status or process information

#### Backend API (Express)

The UI reads:

- game room details
- available game variants
- variant descriptions
- player information
- high scores

It is a **read-focused frontend** and does **not directly write data to the database**.

---

### Customer Flow

The main customer journey was designed to be simple and visually guided.

#### Step 1 — Explore variants
Customers see a list of game variants on the **left side of the screen**.

They can:
- select a variant
- read a short description
- open a separate **How to Play** dialog for more details
- view a themed background image for the selected variant

#### Step 2 — Scan players
Customers must scan at least **1 wristband**, with a maximum of **5 players**.

The number of scanned players affects:
- difficulty
- gameplay balance
- scorecard behavior for many rooms

#### Step 3 — Wait or start
After scanning:
- if the room is occupied, they must wait until it becomes available
- if the room is ready, they can start immediately

When the session starts:
- the UI triggers a **10-second countdown**
- players enter the room
- the screen resets back to the initial state for the next group

The UI also sends a **waiting status** to the host so players already inside the room cannot immediately restart the same session from outside.

---

### Interface Design

The UI went through multiple iterations and continues to evolve.

#### Earlier versions
- fully **WinForms-based UI**
- then migrated to **Next.js inside WebView**
- initially used a **single-screen** flow
- later evolved into a **two-step process**
- then improved further into a **split-screen layout**

#### Current split-screen layout
- **Left side:** game and variant information
- **Right side:** scanned players, how-to-play, high scores, start flow

This made the interface easier to understand while keeping the main actions visible.

The screen also displays:
- **daily, monthly, and yearly high scores**
- clearer process state
- more structured interaction flow

---

### Why Next.js + WebView

Using **Next.js inside WebView** turned out to be the right architectural choice for several reasons:

- **Better frontend flexibility** than building everything directly in WinForms
- Easier to design a clean, modern, and highly customizable UI
- Centralized hosting on the server meant **all game rooms could be updated at once**
- Faster rollout of UI improvements without rebuilding each room individually
- A smoother path for continuous frontend iteration as the product evolved

This approach allowed the UI to improve rapidly while staying easy to deploy and maintain.

---

### Challenges

The main challenge was not backend complexity — it was **making the interface as user-friendly and informative as possible**.

We continuously took input from:
- staff
- customers
- real-world room usage

Key UX problems we had to solve included:

- long text descriptions were overwhelming for customers
- players needed a faster way to identify variants visually
- error messages needed to explain clearly what to do next
- the UI had to improve without introducing a steep learning curve for staff

Important improvements included:
- adding **variant images** so players could identify games faster
- moving detailed explanation into a separate **How to Play** dialog
- improving text formatting to reduce visual overload
- adding more informative process and error dialogs for cases like:
  - expired wristband
  - unregistered wristband
  - room not ready
  - players already inside the room
- keeping the overall layout consistent while making gradual UX improvements

The goal was to make the interface feel familiar, even as it continued evolving.

---

### My Contribution

I was originally hired specifically to handle the **frontend** side of the kiosk system because I already had strong experience building web interfaces with **Next.js**.

From the beginning, I was the primary person responsible for the **Kiosk UI design and implementation**, and I led most of the ongoing improvements to the interface.

At the same time, the system improved through feedback from:
- team members
- staff using the rooms daily
- customers interacting with the flow

My role was to translate those inputs into practical UI changes while keeping the experience consistent and easy to use.

---

### Impact

The Kiosk UI became a key part of making the room experience smoother for both players and staff.

It improved:
- clarity of game selection
- session readiness flow
- onboarding for first-time players
- consistency across game rooms
- speed of deploying UI updates across facilities
`,
    overviewContent: `
The **Kiosk UI** is the web-based frontend of the full kiosk system used in AeroSports game rooms.

It is built with **Next.js** and rendered inside the **WinForms WebView host application**. The UI is hosted centrally on the server, and each game host requests the page with its own room-specific parameters.

Its role is focused on the **customer and staff interaction layer** only. It does **not directly control hardware**, door locks, admin tools, or other device-level features. Those are handled by the **Kiosk Host** application.

The Kiosk UI is responsible for:
- showing game variants and room details
- handling player wristband scans
- guiding customers through the start flow
- showing game information and high scores
- sending session start instructions to the host app
- receiving room/game status updates from the host
`,
    architectureNotes: `
The Kiosk UI communicates with two layers:

#### Kiosk Host (WinForms)

**Sends to Host**

- selected **game variant**
- scanned **player information**
- **game type** (single player, multiplayer, custom)
- any variant-specific session settings
- waiting state / session actions

**Receives from Host**

- current **game status**
- reset / refresh commands
- scanned **NFC wristband IDs**
- room-specific status or process information

#### Backend API (Express)

The UI reads:

- game room details
- available game variants
- variant descriptions
- player information
- high scores

It is a **read-focused frontend** and does **not directly write data to the database**.
`,
    customerFlowContent: `
The main customer journey was designed to be simple and visually guided.

#### Step 1 - Explore variants
Customers see a list of game variants on the **left side of the screen**.

They can:
- select a variant
- read a short description
- open a separate **How to Play** dialog for more details
- view a themed background image for the selected variant

#### Step 2 - Scan players
Customers must scan at least **1 wristband**, with a maximum of **5 players**.

The number of scanned players affects:
- difficulty
- gameplay balance
- scorecard behavior for many rooms

#### Step 3 - Wait or start
After scanning:
- if the room is occupied, they must wait until it becomes available
- if the room is ready, they can start immediately

When the session starts:
- the UI triggers a **10-second countdown**
- players enter the room
- the screen resets back to the initial state for the next group

The UI also sends a **waiting status** to the host so players already inside the room cannot immediately restart the same session from outside.
`,
    evolutionContent: `
The UI went through multiple iterations and continues to evolve.

#### Earlier versions
- fully **WinForms-based UI**
- then migrated to **Next.js inside WebView**
- initially used a **single-screen** flow
- later evolved into a **two-step process**
- then improved further into a **split-screen layout**

#### Current split-screen layout
- **Left side:** game and variant information
- **Right side:** scanned players, how-to-play, high scores, start flow

This made the interface easier to understand while keeping the main actions visible.

The screen also displays:
- **daily, monthly, and yearly high scores**
- clearer process state
- more structured interaction flow
`,
    challengesContent: `
The main challenge was not backend complexity - it was **making the interface as user-friendly and informative as possible**.

We continuously took input from:
- staff
- customers
- real-world room usage

Key UX problems we had to solve included:
- long text descriptions were overwhelming for customers
- players needed a faster way to identify variants visually
- error messages needed to explain clearly what to do next
- the UI had to improve without introducing a steep learning curve for staff

Important improvements included:
- adding **variant images** so players could identify games faster
- moving detailed explanation into a separate **How to Play** dialog
- improving text formatting to reduce visual overload
- adding more informative process and error dialogs for cases like:
  - expired wristband
  - unregistered wristband
  - room not ready
  - players already inside the room
- keeping the overall layout consistent while making gradual UX improvements

The goal was to make the interface feel familiar, even as it continued evolving.
`,
    contributionContent: `
I was originally hired specifically to handle the **frontend** side of the kiosk system because I already had strong experience building web interfaces with **Next.js**.

From the beginning, I was the primary person responsible for the **Kiosk UI design and implementation**, and I led most of the ongoing improvements to the interface.

At the same time, the system improved through feedback from:
- team members
- staff using the rooms daily
- customers interacting with the flow

My role was to translate those inputs into practical UI changes while keeping the experience consistent and easy to use.
`,
    stackDecisionContent: `
Using **Next.js inside WebView** turned out to be the right architectural choice for several reasons:

- **Better frontend flexibility** than building everything directly in WinForms
- Easier to design a clean, modern, and highly customizable UI
- Centralized hosting on the server meant **all game rooms could be updated at once**
- Faster rollout of UI improvements without rebuilding each room individually
- A smoother path for continuous frontend iteration as the product evolved

This approach allowed the UI to improve rapidly while staying easy to deploy and maintain.
`,
    impactContent: `
The Kiosk UI became a key part of making the room experience smoother for both players and staff.

It improved:
- clarity of game selection
- session readiness flow
- onboarding for first-time players
- consistency across game rooms
- speed of deploying UI updates across facilities
`,
    company: "AeroSports",
    role: "Technical Lead / Full-Stack & Systems Engineering",
    quickFacts: [
      { label: "Company", value: "AeroSports" },
      { label: "Role", value: "Frontend lead inside the kiosk ecosystem" },
      { label: "Stack", value: "Next.js + WebView inside WinForms" },
      { label: "Deployment", value: "Server-hosted UI requested per room host" },
      { label: "Status", value: "Production flow used across active rooms" },
    ],
    techStack: [
      {
        name: "Next.js",
        iconSrc: techStackIcons["Next.js"],
        iconSrcDark: techStackIconsDark["Next.js"],
      },
      { name: "TypeScript", iconSrc: techStackIcons["TypeScript"] },
      { name: "JavaScript", iconSrc: techStackIcons["JavaScript"] },
      { name: "Tailwind", iconSrc: techStackIcons["Tailwind"] },
    ],
    mediaSectionTitle: "Kiosk UI in Action",
    mediaSectionLayout: "coverflow",
    mediaKeys: ["frontend-screens/game-selection"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["kiosk-host-dotnet"],
    architectureMap: {
      title: "Architecture",
      description:
        "A focused view of the Kiosk UI boundary: database data flows into the UI, and the UI exchanges commands and status with the host.",
      badges: ["Read-focused frontend", "Server-hosted UI", "WebView runtime"],
      nodes: [
        { id: "database", label: "Database", row: 1 },
        { id: "ui", label: "UI", row: 1 },
        { id: "host", label: "Host", row: 1 },
      ],
      edges: [
        { from: "database", to: "ui", label: "read data", labelOffsetY: -12 },
        {
          from: "ui",
          to: "host",
          label: "commands / status",
          bidirectional: true,
          labelOffsetY: 14,
        },
      ],
    },
  },
  {
    id: "kiosk-host-dotnet",
    slug: "kiosk-host-dotnet",
    name: "Kiosk Host & Room Control (.NET WebView)",
    shortDescription:
      "WinForms orchestration layer between the Kiosk UI, Scorecard UI, Game Engine, backend API, and room hardware.",
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
  },
  {
    id: "scorecard-nextjs",
    slug: "scorecard-nextjs",
    name: "Scorecard (Next.js Realtime Display)",
    company: "AeroSports",
    role: "Frontend / Realtime Display UI",
    period: "Production system",
    shortDescription:
      "Realtime score display rendered in a secondary WebView, designed to show game state, scores, timers, lives, and mode-specific information with minimal latency and high readability.",
    content: `
### Overview

A realtime **Next.js scorecard** rendered inside the kiosk host as a secondary WebView.

It is designed to display live game state clearly without owning any gameplay logic itself.
`,
    quickFacts: [
      "Next.js WebView app",
      "Realtime JSON-driven updates",
      "Alliance + PvP + Custom modes",
      "Hosted centrally for all rooms",
      "Thin dummy display layer",
    ],
    mediaSectionTitle: "Scorecard Screens",
    mediaSectionLayout: "coverflow",
    architecture: {
      title: "Architecture",
      description:
        "The scorecard is a lightweight hosted display layer rendered inside the kiosk runtime. It receives structured realtime data from the kiosk host, which itself relays state from the game engine.",
      badges: ["Next.js display", "WebView screen", "Realtime JSON updates"],
      nodes: [
        { id: "server", label: "Hosted Page", row: 1 },
        { id: "kiosk-host", label: "Kiosk Host", row: 2 },
        { id: "scorecard", label: "Scorecard UI", row: 2 },
        { id: "game-engine", label: "Game Engine", row: 3 },
      ],
      edges: [
        { from: "server", to: "scorecard", label: "serve UI", labelOffsetY: -12 },
        {
          from: "kiosk-host",
          to: "scorecard",
          label: "structured data",
          labelOffsetY: -10,
        },
        {
          from: "game-engine",
          to: "kiosk-host",
          label: "runtime state",
          labelOffsetX: -22,
        },
      ],
    },
    overviewContent: `
### Overview

The **Scorecard** is a **Next.js** project rendered as the **second WebView** inside the kiosk host application.

Its purpose is to give players a clear realtime view of:
- score
- lives
- timer
- active players
- level
- other game-specific information

The scorecard is intentionally designed as a **lightweight dummy structure**.
It does not own game logic. Instead, it receives structured realtime data from the **Kiosk Host**, which itself receives the runtime state from the **Game Engine**.

This thin display architecture makes the scorecard:
- easy to update
- easy to adapt to different game modes
- more reliable for realtime synchronization
`,
    workflowContent: `
### Workflow

When the **Kiosk Host** launches, the **Alliance mode** scorecard is loaded by default, except for custom games where the host can load a room-specific custom screen instead.

#### Runtime flow

1. The scorecard page is loaded inside the kiosk's secondary WebView
2. The **Kiosk Host** determines the selected game type
3. The host sends the required screen mode and initial/reset state to the scorecard
4. During gameplay, the **Game Engine** sends realtime updates to the host through socket communication
5. The host forwards structured JSON data to the scorecard
6. The scorecard updates the screen in realtime

Typical realtime updates include:
- timer
- scores
- lives
- level
- player names
- progress data
- custom instructions / visuals

This keeps the scorecard focused only on **rendering the current truth**, rather than calculating state on its own.
`,
    screenTypesContent: `
### Screen Types

The scorecard has **three major display modes**.

#### 1. Alliance Mode
Used when players are playing together as a team.

Displays shared values such as:
- team score
- lives
- timer
- level
- game progress

#### 2. Competitive Mode (PvP)
Used for player-vs-player gameplay.

In addition to common score data, it also displays:
- individual player names
- player-specific scoring
- clearer PvP comparison layout

This became important because showing generic labels like **Player 1**, **Player 2** created confusion during live gameplay.

#### 3. Custom Mode
Used for games that do not fit the standard scorecard structure.

This allows custom layouts for special game types, including:
- room-specific instructions
- custom visuals
- unique progress displays

The first major custom example was **Recipe**, where the page needed to display:
- recipe details
- instructions
- realtime game progress
in a way that was informative but not overwhelming.
`,
    evolutionContent: `
### Evolution

In the beginning, we only had **Alliance mode** game variants for the first two game rooms.

That meant one display structure was enough.

As the facility grew, the scorecard had to evolve.

#### Step 1 - Alliance only
- one shared scoreboard layout
- simple cooperative/team display

#### Step 2 - PvP support
Once **competitive / PvP** variants were introduced, we needed a different display model.

We added:
- a **game type variable**
- separate layouts for:
  - Alliance
  - Competitive

We also improved the UI multiple times so the information would be easier for players to process during gameplay.

#### Step 3 - Custom pages
When custom-format games such as **Recipe** were introduced, the standard layout no longer worked.

So we added:
- a fully custom scorecard page format
- room/game-specific layouts for unique display needs

We also improved player clarity over time.
For example:
- early PvP screens displayed players as **Player 1**, **Player 2**
- later versions sent actual **player names**, making instructions and score tracking much easier for players to follow
`,
    challengesContent: `
### Challenges

Although the scorecard is a relatively lightweight project, it was a **very important part of the room experience**.

#### 1. Readability during fast gameplay

The first challenge was purely visual:

Players should be able to **glance at the scorecard and instantly understand it**.

Because the games often require:
- quick reactions
- movement
- physical agility

the display could not be something players had to "decode."

That meant:
- careful component placement
- readable sizing
- strong hierarchy
- avoiding visual overload

#### 2. Synchronization issues in earlier versions

The scorecard was not always a pure dummy display.

Earlier versions behaved more like an independent screen process and were updated through smaller event-based signals such as:
- life lost
- start timer
- stop timer
instead of being given the full current state each time

This caused problems such as:
- timer freezing randomly
- inaccurate scores or lives
- screen not resetting between games
- a new game inheriting the previous game's values

The fix was to make the scorecard a **true dummy structure**.

Instead of partial event hints, it now receives the full current state repeatedly, such as:
- lives left
- current score
- time remaining
- active mode
- current progress

That removed most synchronization issues and made the display much more reliable.

#### 3. Correct screen switching by game type

Another challenge was making sure the correct screen type was always shown.

Sometimes, due to communication loss or data mismatch:
- a PvP game would still be showing the Alliance screen
- or the wrong screen would remain active into the next game

This made the display unhelpful and could even break the page if the data shape did not match the current screen structure.

To fix this, I processed the incoming data upfront and checked the **game type** on every update.

If the active screen did not match the current game type:
- the scorecard switched screens immediately
- even if the mismatch happened midgame

#### 4. Designing custom layouts without overwhelming players

The custom mode introduced a new challenge:
we needed entirely different page formats for games that did not fit the standard scorecard model.

For **Recipe**, for example, the screen needed to show:
- recipe information
- instructions
- progress
all at once

To make that usable, I worked with my team to design a custom layout that stayed informative without becoming overwhelming.
`,
    contributionContent: `
### My Contribution

My contribution followed the same pattern as the other AeroSports software systems.

I helped build:
- the base structure of the scorecard
- the dummy display architecture
- the UI iterations that made the page easier to read in live gameplay

Once the dummy structure was in place, the scorecard became much easier to evolve because changes were mostly about:
- improving layout
- improving clarity
- handling new data requirements

I worked with my team on:
- the first custom page for **Recipe**
- UI improvements
- better support for different game types
- refining the structure so the scorecard could stay flexible without becoming unstable

I also trained team members on how the scorecard page worked and how it could be extended safely.
`,
    techStack: [
      {
        name: "Next.js",
        iconSrc: techStackIcons["Next.js"],
        iconSrcDark: techStackIconsDark["Next.js"],
      },
      { name: "React", iconSrc: techStackIcons["React"] },
      { name: "TypeScript", iconSrc: techStackIcons["TypeScript"] },
      { name: "WebView" },
      { name: "JSON" },
      { name: "Sockets" },
    ],
    media: aerosportsMediaManifest["frontend-screens/game-selection/scorecards"].filter(
      (item) => !item.src.endsWith("/game-selection.png"),
    ),
    mediaKeys: [],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: [
      "kiosk-host-dotnet",
      "kiosk-ui-nextjs",
      "game-engine-dotnet",
    ],
  },
  {
    id: "game-engine-dotnet",
    slug: "game-engine-dotnet",
    name: "Game Engine (.NET Console Runtime)",
    company: "AeroSports",
    role: "Runtime + Game Logic Engineering",
    period: "Production system",
    shortDescription:
      "Realtime .NET runtime that launches game variants, manages controller communication, executes game logic, and coordinates restart flow with the kiosk system.",
    content: `
### Overview

A **.NET console runtime** launched by the **Kiosk Host** to run a live game session.

It manages **game logic**, **controller communication**, and **runtime state**, then streams status back to the room system.
`,
    quickFacts: [
      "30+ game variants",
      "8 game rooms",
      ".NET console runtime",
      "Socket + controller communication",
      "5-10ms optimized custom sensor latency",
    ],
    mediaSectionTitle: "Game Rooms Powered by the Engine",
    mediaSectionLayout: "coverflow",
    mediaSectionMetrics: [
      "8 Game Rooms",
      "30+ Game Variants",
      "1000+ Sensors / Devices",
      "Realtime Runtime Engine",
    ],
    media: aerosportsMediaManifest["game-rooms"]
      .filter((item) => item.src.includes("_complete"))
      .map((item) => ({
      ...item,
      caption: item.src.includes("laser")
        ? "Laser Room - 96 sensors and lasers controlled through custom Arduino protocol"
        : item.src.includes("climb")
          ? "Climb Room - sensor-based vertical challenge wall"
          : item.src.includes("recipe")
            ? "Recipe Room - multi-station cooperative puzzle game"
            : item.src.includes("tilehunt")
              ? "Tile Hunt - RS422 LED sensor puzzle grid"
              : item.src.includes("basket")
                ? "Basket Room - realtime score-driven throwing challenge"
                : item.src.includes("cybershot")
                  ? "CyberShot Room - target-driven reaction game with live scoring"
                  : item.src.includes("hexaquest")
                    ? "HexaQuest Room - multi-zone interactive puzzle runtime"
                    : item.src.includes("pushbutton")
                      ? "Push Buttons Room - fast-response multiplayer button system"
                      : undefined,
    })),
    architecture: {
      title: "Architecture",
      description:
        "The engine sits between the kiosk host and the physical controller layer, turning controller events into gameplay state and streaming runtime status back to the room system.",
      badges: [".NET console", "Realtime runtime", "Controller communication"],
      nodes: [
        { id: "kiosk-host", label: "Kiosk Host", row: 1 },
        { id: "game-engine", label: "Game Engine", row: 2 },
        { id: "game-logic", label: "Game Logic", row: 3 },
        { id: "handlers", label: "Communication Handlers", row: 3 },
        { id: "controllers", label: "Controllers / Devices", row: 4 },
      ],
      edges: [
        {
          from: "kiosk-host",
          to: "game-engine",
          label: "session + status",
          bidirectional: true,
          labelOffsetY: 12,
        },
        { from: "game-engine", to: "game-logic", label: "runtime flow", labelOffsetY: -10 },
        {
          from: "game-engine",
          to: "handlers",
          label: "device bridge",
          labelOffsetY: -10,
        },
        {
          from: "handlers",
          to: "controllers",
          label: "protocol I/O",
          bidirectional: true,
          labelOffsetX: 34,
        },
      ],
    },
    overviewContent: `
### Overview

The **Game Engine** is a **.NET console application** launched by the **Kiosk Host** with the runtime arguments required to run a session.

These arguments include:
- selected **game variant**
- **player information**
- **game room information**
- whether the run is **test** or **production**
- other room or hardware-specific runtime settings

The engine is responsible for:
- executing the **game logic**
- managing **controller communication**
- coordinating **external device behavior**
- returning realtime game state back to the kiosk system

It acts as the runtime core of each room.
`,
    workflowContent: `
### Engine Workflow

The general runtime flow is handled by **Program.cs** and **BaseGame.cs**.

#### Launch flow

1. The engine is launched by the **Kiosk Host**
2. Runtime arguments are read and stored
3. The correct **game variant class** is selected
4. The variant initializes the correct **communication handler**
5. \`BaseGame\` begins the shared gameplay lifecycle

#### Initialization

Before gameplay begins, the communication handler verifies:
- controller connectivity
- available lights and sensors
- other room-specific hardware information

If validation succeeds:
- the intro voice line is played
- the game starts with the correct:
  - level setup
  - lifelines
  - timer
  - variant-specific parameters

#### Shutdown / restart flow

When the game ends:
- communication handlers are disposed
- game threads are stopped
- sensors and lights are turned off

Then:

- if **Players Waiting** from the kiosk is **false**, the engine allows a restart flow
- players are given **10 seconds** to press the restart button
- if restart is pressed, the game starts again
- if restart is not pressed, the program ends and the console application exits
`,
    logicStructureContent: `
### Game Logic Structure

The runtime is divided into three major layers:

#### 1. Game Logic

This contains the gameplay rules and progression system.

At the core is:

- \`BaseGame\` -> shared logic for all games
- abstract game classes -> intermediate behavior for categories of rooms
- room/game-specific classes -> concrete implementations of variants

Game logic is organized by:
- **game rooms**
- **variants inside each room**

This structure allowed shared systems while still supporting unique gameplay behavior for each room.

#### 2. Communication Handlers

Communication handlers are responsible for controller/device communication.

Their role is to:
- establish the communication pipeline
- decode controller protocol messages
- translate protocol-level signals into engine-level functions
- expose usable actions/events to the game logic layer

Most handlers were built around:
- **USR-N540** (4-port controllers)
- **USR-N510** (1-port controllers)

These worked using **RS422 -> Ethernet** communication.

Some games also used:
- custom **Arduino-based controllers**

#### 3. External Device Control

The engine also coordinates room-specific external devices as part of gameplay flow, depending on the variant and room.
`,
    evolutionContent: `
### Evolution

At the beginning, the **Game Engine** was integrated directly into the **Kiosk Host** because only two rooms existed.

At that stage:
- there were only **2 game rooms**
- each room had:
  - **2 team variants**
  - **1 competitive variant**

As the facility expanded, it became obvious that both the kiosk and the runtime logic would grow into large independent systems.

So the engine was separated into its own application.

#### Early phase

- constant experimentation with game logic and game flow
- frequent bugs
- unstable runtime behavior
- heavy iteration with staff and test players

During testing, rooms could break **10-20 times per day**, often due to multithreading and runtime synchronization issues.

#### Stabilization phase

Over time we:
- fixed bugs
- better understood room behavior
- improved game flow design
- made logic more resistant to failure
- refined gameplay using feedback from staff and players

Once the first two rooms became stable and the public response was positive, the facility expanded.

That expansion changed the scale of the project significantly:

- from **6 variants**
- to **30+ game variants**
- across **8 different rooms**
- with different handlers, protocols, and devices
`,
    challengesContent: `
### Challenges

#### 1. Learning IoT devices and runtime game development

At the beginning, I was not experienced with:
- IoT devices
- controller protocols
- realtime game runtime engineering

I had to learn by building:
- researching device behavior
- understanding communication requirements
- iterating on game logic
- improving systems with each new room and controller type

The more I built, the more progress I made, and the more interesting the work became.

#### 2. Designing efficient custom controller protocols

A major challenge came when working on the **Laser** game.

The setup included:
- **96 sensors**
- **96 lasers**
- distributed across **4 Arduino Mega chips**
- each chip controlling **48 devices**

Initially, data was sent using string-based messages made of \`"0"\` and \`"1"\` values.

That meant:
- each send was effectively a **48-character message**
- messages were too large and too frequent
- latency stayed above **200ms**
- gameplay felt unplayable

To fix this:
- I converted the 48-character string payload into a **6-character hex message**
- that hex message still represented the same **48 bits**
- latency dropped to roughly **50-60ms**
- sensors could now be updated at **20+ times per second**

Then I improved it further:
- instead of sending data continuously at a fixed rate
- the controller sent updates **only when sensor state changed**

That reduced latency to roughly **5-10ms**, which made the Laser game feel smooth and playable.

#### 3. Multithreading and runtime synchronization

To run properly, the engine depends on many concurrent processes such as:
- game logic
- controller sockets
- audio
- different runtime/gameplay processes
- variant-specific actions

At key events like:
- level won / lost
- iteration won / lost
- game won / lost
- points won / lost

all of these threads needed to stay synchronized.

Early issues included:
- multiple loss events triggering at once
- multiple iterations running simultaneously
- games not ending correctly
- overlapping audio
- unstable event flow

To solve this, I gradually moved the major shared event handling into the **BaseGame** layer.

That made it easier to centralize state transitions and update threads in a coordinated way without breaking the runtime.
`,
    contributionContent: `
### My Contribution

I was one of the main contributors to the runtime foundation of the **Game Engine**.

My work included:
- researching controller protocols
- building the base structure for the game logic
- designing and improving communication handlers
- working with different devices and room types
- implementing new game variants
- stabilizing runtime behavior across multiple rooms

In the early stage, I spent a lot of time building the **base architecture** that later made scaling possible.

Once that base became stable:
- I continued building new variants
- improved device handling
- refined the communication systems
- helped expand the engine for many more room types

As the project grew, we expanded the team.
At that point, I also:
- trained new hires
- supervised their work
- helped guide improvements to the shared base code
`,
    techStack: [
      { name: ".NET", iconSrc: techStackIcons[".NET"] },
      { name: "C#" },
      { name: "Sockets" },
      { name: "RS422" },
      { name: "Ethernet" },
      { name: "Arduino", iconSrc: techStackIcons["Arduino"] },
      { name: "Multithreading" },
    ],
    mediaKeys: [],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: [
      "kiosk-host-dotnet",
      "game-controllers-sensor-network",
      "room-devices-access-control",
    ],
  },
  {
    id: "room-devices-access-control",
    slug: "room-devices-access-control",
    name: "Room Devices & Common Room Infrastructure",
    company: "AeroSports",
    role: "Hardware + Systems Integration",
    period: "Production system",
    shortDescription:
      "Shared room-level device and communication infrastructure for displays, audio, wristband scanning, restart controls, door locks, and controller connectivity across interactive game rooms.",
    content: `
### Overview

Built the shared **room device and communication layer** used across multiple interactive rooms.

It combines hardware infrastructure, protocol handling, and runtime reliability so the rest of the room software can work consistently.
`,
    quickFacts: [
      "Shared room device layer",
      "USB + COM + Ethernet integration",
      "Automatic COM reassignment",
      "Watchdog-assisted recovery",
      "Software + hardware ownership",
    ],
    mediaSectionTitle: "Room Devices & Infrastructure",
    mediaSectionLayout: "coverflow",
    architecture: {
      title: "Architecture",
      description:
        "Shared room devices connect into the kiosk PC through a reusable communication layer that is used by the kiosk host, game engine, simulators, watchdog tools, and other runtime utilities.",
      badges: ["Shared device layer", "USB + COM + Ethernet", "Runtime reliability"],
      nodes: [
        { id: "room-devices", label: "Room Devices", row: 1 },
        { id: "shared-lib", label: "Shared .NET Device Library", row: 2 },
        { id: "room-software", label: "Room Software", row: 3 },
      ],
      edges: [
        {
          from: "room-devices",
          to: "shared-lib",
          label: "device protocols",
          bidirectional: true,
          labelOffsetY: -10,
        },
        {
          from: "shared-lib",
          to: "room-software",
          label: "shared access",
          bidirectional: true,
          labelOffsetY: -10,
        },
      ],
    },
    overviewContent: `
### Overview

Except for the **kiosk PC**, **game sensors**, and **game controllers**, each room also depends on a set of shared operational devices required for the room to function properly.

These room-level devices include:

- **2 monitors** in each room
  - one for the **scorecard**
  - one for the **display screen**
- **HDMI splitter** connected to the kiosk PC
- **full surround sound system** connected via USB
- **hand scanner** connected via USB
- **Ethernet** connection from controllers or from a network switch that connects multiple controllers
- **USB connections** from custom Arduino controllers
- **SRD chip** controlling the **NO/NC door lock** through USB/COM communication

These devices are present in all rooms and are connected to the room's kiosk PC.

This project had both:
- a **software integration** side
- a **hardware / wiring / physical installation** side

The result was a reusable room infrastructure layer that allowed different rooms to share a common runtime pattern while still supporting very different game mechanics.
`,
    devicesContent: `
### Common Room Devices

Each room used a common base hardware setup on top of the room-specific controllers and game sensors.

#### Displays
- one monitor for **scorecard**
- one monitor for **display**
- both connected through an **HDMI splitter** routed into the kiosk PC

#### Audio
- a **full surround sound system** connected via USB
- replaced earlier simpler speaker setups

#### Wristband Hand Scanner
- connected via USB / COM
- contains an **Arduino-based controller**
- reads **NFC wristband UID**
- also receives color-control requests from the kiosk

#### Restart Button
- behaves similarly to the hand scanner
- sends a signal when pressed while restart is active
- also receives color requests

#### Door Lock
- controlled through an **SRD chip**
- used to operate **NO/NC door locks**
- communication and wiring were based on the chip's preprogrammed protocol and guide

#### Controller Connectivity
- Ethernet cables connected controllers directly to the room PC or to a switch
- some rooms used custom Arduino USB devices
- some rooms used multiple controllers simultaneously
`,
    softwareFlowContent: `
### Software Flow

Architecture-wise, these devices connect into the **kiosk PC** and are then accessed by multiple software systems such as:

- **Kiosk Host**
- **Game Engine**
- **Simulators**
- **Watchdog scripts**
- other room tools as required

To avoid duplicating device communication logic, we created a shared **.NET communication library** for room devices.

This library was used by multiple applications to communicate with the hardware consistently.

#### Device examples

##### SRD chip (door lock)
The SRD chip was preprogrammed and came with:
- a command guide for COM-port communication
- a wiring guide

The shared software layer sent the required serial commands to control the NO/NC lock behavior.

##### Wristband scanner
The hand scanner used an Arduino-based board we programmed to:
- read NFC wristband UID
- return scan results to the kiosk
- receive color commands from the kiosk

##### Restart button
The restart button used the same communication philosophy:
- sends button press state when active
- receives color/control requests from the host

This shared library approach made it easier to integrate the same devices into multiple parts of the system without reimplementing the protocols every time.
`,
    challengesContent: `
### Challenges

#### 1. COM port instability and automatic device identification

One of the first major problems was handling all the USB/COM-connected room devices.

Initially, we hard-coded **COM port numbers**.

That worked only temporarily, because after restarts or device changes:
- COM ports would shift
- the room would fail
- we had to manually reconfigure the ports again

To solve this, we introduced an **acknowledgement-based identification system**.

All Arduino-controlled devices (such as:
- hand scanner
- restart button
- custom game controllers)

were programmed with an acknowledgement command.

When queried, they would return their **device name**.

Then the kiosk application would:
- scan available COM ports
- send the acknowledgement command
- identify each device automatically
- assign the correct COM port dynamically

This made the room far more resilient to port reassignments after restarts.

---

#### 2. Hardware selection and physical infrastructure

Another large challenge was on the hardware side:

- finding the correct **SRD chip** for NO/NC locks
- finding an **HDMI splitter** that actually worked reliably
- choosing the right **wire thickness**
- selecting a good **surround sound system**
- routing wires cleanly through walls
- using multi-port COM expansion hardware
- selecting the correct power supplies
- extending long USB runs safely
- using **USB signal amplifiers** when needed
- handling Ethernet, HDMI, and USB extension planning

This was not just a software problem - it required practical device and infrastructure decisions for each room.

---

#### 3. Mid-session disconnects and runtime recovery

Another major issue was device disconnection during active sessions or during the day.

Problems included:
- devices disconnecting randomly
- COM port numbers changing mid-day
- runtime settings no longer matching the actual connected device

To improve reliability, we added a **watchdog** written in **PowerShell**.

It checked whether:
- devices were connected
- devices were responding
- COM ports still matched room settings

If not, it would attempt to:
- reconnect the device automatically
- update the COM port mapping
- restart the relevant device/driver
- restart the kiosk application if needed so devices could be reassigned properly

If the problem still could not be fixed automatically, the system clearly showed:
- which device was failing
- possible troubleshooting actions
`,
    evolutionContent: `
### Evolution

The room infrastructure evolved significantly as the facility expanded.

#### Early stage
Initially we only had:
- a preprogrammed hand scanner
- its existing library to read UID
- 2 screens
- simpler speakers instead of full sound systems
- no restart button
- one controller per room was enough

#### Expansion stage
In the new facility, the device layer became much richer.

We added:
- more displays and splitter complexity
- full room sound systems
- restart buttons
- automatic door locks
- more controllers per room
- room-specific infrastructure needs

Examples:

- **Climb**
  - 3 controllers
  - each with its own IP
  - connected to a network switch

- **Laser**
  - 4 Arduino controllers
  - connected through multi-port COM extension
  - signal amplifiers for long cable runs

- **Recipe**
  - 1 ESP server
  - 7 wireless client chips

We also added **automatic smoke control** in the Laser room using a smart switch integrated with server-side automation.

Over time, the system evolved from a simple scanner/display setup into a true shared room infrastructure platform.
`,
    contributionContent: `
### My Contribution

I was involved in both the **software** and **hardware** sides of this system.

#### Hardware / infrastructure
I was responsible for helping decide:
- which devices and wiring should be used
- what hardware needed to be ordered
- inventory management
- room-level wiring diagrams
- hardware layout plans for each room

I prepared those layouts and diagrams for the:
- construction team
- electrician team

#### Software integration
On the software side, I made sure the devices were integrated cleanly into the room software stack.

This included:
- reliable device communication
- automatic COM assignment logic
- protocol handling for shared room devices
- watchdog-assisted runtime reliability

I also worked with the team to add the watchdog system that helped verify whether the room was healthy and functioning correctly.
`,
    techStack: [
      { name: ".NET", iconSrc: techStackIcons[".NET"] },
      { name: "C#" },
      { name: "Arduino", iconSrc: techStackIcons["Arduino"] },
      { name: "PowerShell", iconSrc: techStackIcons["PowerShell"] },
      { name: "COM Ports" },
      { name: "Ethernet" },
      { name: "USB" },
      { name: "Wiring / Circuits" },
    ],
    mediaKeys: ["root:hardware"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: [
      "kiosk-host-dotnet",
      "game-engine-dotnet",
      "game-controllers-sensor-network",
    ],
  },
  {
    id: "game-controllers-sensor-network",
    slug: "game-controllers-sensor-network",
    name: "Game Controllers & Sensor Network",
    shortDescription:
      "Realtime controller network for LED targets and sensors using USRN540 (RS422→Ethernet) plus custom Arduino/ESP controllers for advanced rooms.",
    content: `
### Overview

Implemented and supported the **game-controller network** that connects room sensors/targets (LEDs, buttons, stations) to the game engine in realtime.

Most rooms use **preprogrammed USRN540 controllers** paired with **RS422-to-Ethernet** bridges for fast, stable signaling between physical devices and the PC network stack.

When we needed more flexibility or tighter control, we built custom controllers using **Arduino** and **ESP** boards.

---

### Standard controller backbone: USRN540 + RS422 → Ethernet

- **USRN540 (preprogrammed)** used in most rooms as the primary controller layer
- **RS422-to-Ethernet** devices bridge sensor networks onto the game PC Ethernet
- Enables reliable transport of button/sensor events into the game engine’s realtime pipeline

---

### Where custom controllers were necessary (Arduino / ESP)

Some rooms required custom logic, faster iteration, or additional orchestration that wasn’t possible with the preprogrammed backbone.

#### Laser (custom mix)
- **4 Arduino boards** total:
  - 2 dedicated to lasers
  - 2 dedicated to sensors
- plus **USRN540** handling push buttons at either side
- This hybrid approach kept core IO stable while allowing laser-specific control.

#### Recipe (ESP-based distributed system)
- **5 ESP chips** for stations
- **1 ESP** for pantry station
- **1 “server” ESP** acting as a proxy between the game engine and station ESPs
- The proxy design simplified routing and kept station communication consistent.

---

### Controller usage by game (examples)

**Single USRN540 controller** (standard backbone):
- TileHunt
- HexaQuest
- CyberShot
- Basket
- Push Buttons rooms

**Mixed controller setups**:
- Climb: 1 USRN540 + climb-specific preprogrammed controller
- Laser: Arduino Mega for lasers + USRN540 for push buttons
- Recipe: distributed ESP controllers + proxy ESP server
`,
    company: "AeroSports",
    techStack: [
      { name: "UDP / Sockets" },
      { name: "RS422" },
      { name: "Ethernet / Networking" },
      { name: "Arduino", iconSrc: techStackIcons["Arduino"] },
      { name: "ESP / ESP32" },
      { name: "C" },
      { name: "C++" },
    ],
    mediaKeys: ["root:hardware"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["game-engine-dotnet", "kiosk-host-dotnet"],
  },
  {
    id: "pos-wpf",
    slug: "pos-wpf",
    name: "POS & Wristband Management (WPF)",
    shortDescription:
      "Staff-facing POS app for registering, renewing, initializing, and looking up NFC wristbands via a token-protected backend API.",
    content: `
### Overview

A staff-facing **POS & wristband management** application built in **.NET WPF**.  
It connects to the backend to manage player sessions, wristband state, and time-based access.

The application uses an external **NFC scanner** to read wristband **UIDs**, then performs registration and account workflows through backend APIs.

---

### Core screens

#### 1) Register
- Staff enters player details (e.g., name, phone, email)
- Initializes wristbands by binding the scanned **UID** to the player profile
- Starts a session by assigning time / access as required

#### 2) Renew
- Extends time for an existing wristband (e.g., expired or running low)
- Avoids re-entering customer details — scan UID → add time → save

#### 3) Lookup
- Provides full visibility into wristband + player history:
  - time remaining
  - games played
  - scores and session details (as available)
- Allows edits to player data (name, email, phone)
- Supports adding time and correcting records

#### 4) Initialize
- Fast workflow for busy staff:
  - scan UID
  - add time
  - do not collect full customer info at POS
- Players complete full registration later using the **tablet registration app**

---

### Why it mattered
- Reduced staff workload through specialized workflows (Register vs Renew vs Initialize)
- Improved accuracy and traceability of wristband data via lookup + edit capabilities
- Enabled smoother customer throughput during peak hours
`,
    company: "AeroSports",
    techStack: [
      { name: "WPF" },
      { name: ".NET", iconSrc: techStackIcons[".NET"] },
      { name: "C#" },
      { name: "Microsoft SQL Server", iconSrc: techStackIcons["Microsoft SQL Server"] },
      { name: "NFC" },
      { name: "API" },
    ],
    mediaKeys: ["frontend-screens/pos"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["kiosk-host-dotnet", "registration-tablet"],
  },
  {
    id: "registration-tablet",
    slug: "registration-tablet",
    name: "Tablet Registration App (MAUI)",
    shortDescription:
      "Customer-facing tablet app for completing wristband registration using in-device NFC scanning and a kiosk-mode UI.",
    content: `
### Overview

A customer-facing **tablet registration** app built with **.NET MAUI**.  
It connects to the backend API and provides a friendly, guided workflow for customers to register their wristband after staff initialization.

The app runs on a tablet configured in **kiosk mode** and uses the tablet’s built-in **NFC scanner** for frictionless UID capture.

---

### What it does

- Reads wristband **UID** using the tablet’s built-in NFC
- Allows customers to enter personal details (e.g., name, email, phone as required)
- Completes registration for wristbands that were **initialized** at POS
- Submits and validates data through backend API calls

---

### Why it mattered

- Reduces staff load during peak times (customers self-register)
- Improves data accuracy with user-friendly step-by-step UI
- Creates a smooth “initialize → self-register” workflow across POS + tablet
`,
    company: "AeroSports",
    techStack: [
      { name: "MAUI" },
      { name: ".NET", iconSrc: techStackIcons[".NET"] },
      { name: "C#" },
      { name: "NFC" },
      { name: "API" },
      { name: "Android Kiosk Mode" },
      { name: "Android" },
      { name: "Android Studio", iconSrc: techStackIcons["Android Studio"] },
    ],
    mediaKeys: ["file:/developer/aerosports/frontend-screens/registration.jpeg"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["pos-wpf", "kiosk-host-dotnet"],
  },
  {
    id: "axe-wrapper-maui",
    slug: "axe-wrapper-maui",
    name: "Axe Throwing Wrapper (MAUI)",
    shortDescription:
      "MAUI wrapper that automates an external vendor axe-throwing system using wristband scanning, time-slot selection, and automatic session enforcement.",
    content: `
### Overview

A **MAUI-based wrapper application** built to automate an axe-throwing system provided by an external vendor.

Originally, sessions were intended to be manually controlled by staff.  
This wrapper mirrors the axe-throwing screen and adds automation so sessions can be driven reliably through the wristband workflow.

---

### What it does

- Mirrors the vendor axe-throwing interface inside a controlled wrapper UI
- Adds **wristband scanning** to identify the customer/session
- Queries backend API for wristband status and remaining time
- Provides **time selection** based on available remaining wristband time
  - Only shows valid time slot options that fit within the remaining balance
- Automatically enforces session timing:
  - when time expires, the wrapper **closes the game automatically**

---

### Why it mattered

- Reduced staff workload by removing manual session handling
- Ensured consistent timing enforcement across customers
- Integrated axe throwing into the same wristband + API ecosystem as other rooms
`,
    company: "AeroSports",
    techStack: [
      { name: "MAUI" },
      { name: ".NET", iconSrc: techStackIcons[".NET"] },
      { name: "C#" },
      { name: "NFC" },
      { name: "API" },
      { name: "Kiosk Mode" },
    ],
    mediaKeys: ["frontend-screens/axe"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["pos-wpf"],
  },
  {
    id: "admin-portal",
    slug: "admin-portal",
    name: "Admin Portal (Data, Analytics, Automations)",
    shortDescription:
      "Authenticated admin portal for managing game data, player records, analytics dashboards, and smart-device automations with role-based access.",
    content: `
### Overview

A centralized **Admin Portal** used by staff and developers to manage the operational side of the facility—from database administration to analytics and automation control.

The portal was designed to be **user-friendly** for day-to-day staff workflows while still powerful enough for advanced configuration.

---

### Data management (CRUD tooling)

Provides interfaces to view and modify key database entities such as:

- Games and game details
- Creating and maintaining **game variants**
- Player and wristband-related information
- Additional operational datasets required for running rooms

This removed the need to directly edit the database for common updates and reduced operational friction.

---

### Analytics dashboards

Includes an analytics section with graphs and drill-down views such as:

- Number of players over time
- Number of games played
- Games by **variant**
- Games by **room**
- Custom, facility-specific analytics views used by management

---

### Automations & smart device control

A dedicated automation area used to manage smart devices across rooms.

Capabilities included:
- Scanning available smart devices (switches/plugs)
- Manual control (turn on/off)
- Scheduling and automation rules
- Custom logic triggers (example: **laser smoke machine** turns on automatically when smoke level drops below a target threshold)

This unified previously separate automation tools into one consistent control surface.

---

### Security (authentication & authorization)

- Portal access is **authenticated**
- Staff roles have different authorization levels (role-based permissions)
- Backend API endpoints are protected with **JWT-based security**
`,
    company: "AeroSports",
    techStack: [
      { name: "Next.js" },
      {
        name: "Express",
        iconSrc: techStackIcons["Express"],
        iconSrcDark: techStackIconsDark["Express"],
      },
      { name: "Microsoft SQL Server", iconSrc: techStackIcons["Microsoft SQL Server"] },
      { name: "JWT" },
      { name: "Role-Based Access Control" },
      { name: "Charts/Analytics" },
      { name: "Smart Devices / IoT" },
    ],
    mediaKeys: ["file:/developer/aerosports/frontend-screens/Admin.png"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["kiosk-host-dotnet", "pos-wpf"],
  },
];
