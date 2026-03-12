import { techStackIcons, techStackIconsDark } from "@/data/images";

export type ProjectLink = { label: string; href: string };
export type ProjectFact = { label: string; value: string };
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
  links?: ProjectLink[];
  tags?: string[];
  relatedProjectIds?: string[];
  architecture?: { label: string; value: string }[];
  quickFacts?: ProjectFact[];
  overviewContent?: string;
  architectureNotes?: string;
  customerFlowContent?: string;
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
    name: "Scorecard / Scoreboard (Next.js WebView)",
    shortDescription:
      "Dedicated Next.js scorecard app rendered via WebView on the secondary display with live score updates.",
    content: `
### Overview

A dedicated **Next.js scorecard** rendered via WebView on the secondary display.

Receives runtime arguments from the Kiosk host such as **scorecard type**, **player names**, session metadata, and **realtime score updates**.

### What It Does

- WebView-rendered Next.js scoreboard for 2-screen and 3-screen room setups
- Supports multiple scorecard modes (Alliance, PvP, Custom)
- Realtime score updates driven by Kiosk host relay
- Designed for clear, readable spectator view
`,
    company: "AeroSports",
    techStack: [
      {
        name: "Next.js",
        iconSrc: techStackIcons["Next.js"],
        iconSrcDark: techStackIconsDark["Next.js"],
      },
      { name: "React", iconSrc: techStackIcons["React"] },
      { name: "TypeScript", iconSrc: techStackIcons["TypeScript"] },
      { name: "WebView2" },
    ],
    mediaKeys: [
      "frontend-screens/game-selection/scorecards",
      "frontend-screens/game-selection/room-identifiers",
    ],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["kiosk-host-dotnet", "kiosk-ui-nextjs"],
  },
  {
    id: "game-engine-dotnet",
    slug: "game-engine-dotnet",
    name: "Game Engine (.NET Console)",
    shortDescription:
      "Runtime engine launched by the kiosk to run game variants, process realtime controller data, and execute game logic.",
    content: `
### Overview

A **.NET console runtime** instantiated by the Kiosk Host with session arguments (player count, selected game variant, test vs live run, and game-specific hardware/controller configuration).

Implements a protocol/handler layer for room hardware—primarily **UDP controllers** connected via Ethernet—used by each game variant.

Establishes a realtime socket pipeline with controller devices using fixed send/receive ports on controller IPs.

Supports multi-controller setups on the same subnet (via network switch) where each controller is addressed by its unique IP (differing last octet).

Also supports Arduino-based controllers over **COM ports** for specific games.

Processes inbound events in realtime, applies game logic/state, and emits continuous status updates back to the Kiosk app.

### What It Does

- Launched by Kiosk with session args (players, variant, test/live, hardware config)
- Hardware abstraction layer: controller-specific protocol handlers
- Primarily UDP over Ethernet (IP + send/receive ports), with multi-controller support
- COM port support for Arduino-based controllers where needed
- Realtime event processing + game logic/state execution
- Streams live game status back to the Kiosk app
`,
    company: "AeroSports",
    role: "Runtime + Game Logic",
    techStack: [
      { name: ".NET", iconSrc: techStackIcons[".NET"] },
      { name: "UDP" },
      { name: "Sockets" },
      { name: "Ethernet" },
      { name: "COM Ports" },
    ],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["kiosk-host-dotnet"],
  },
  {
    id: "room-devices-access-control",
    slug: "room-devices-access-control",
    name: "Room Devices & Access Control",
    shortDescription:
      "Room-level device control for scanning players, starting sessions, and managing access: NFC wristbands, restart button, and NO/NC door locks.",
    content: `
### Overview

Built the **room-level device layer** that enables reliable session flow and access control inside interactive rooms.

This includes **NFC wristband scanning**, a physical **restart button**, and **NO/NC door lock control**—all integrated with the kiosk host application for staff workflows and safe game operation.

---

### What it does

- **Wristband scanner (Arduino)** reads NFC UID and transmits it to the kiosk app
- **Restart button** allows players to replay the **same game variant** once the game has ended (fast restart flow).
- **Door lock control (NO/NC)** supports room access management during gameplay and resets
- Hardware signals are designed to be predictable, testable, and serviceable

---

### Protocol + reliability focus

- Designed wiring and circuits for **stable power**, **fast response**, and clean layouts
- Labeled power + communication wiring to speed up troubleshooting
- Created manuals/diagrams so the same builds can be reproduced and maintained across facilities
`,
    company: "AeroSports",
    techStack: [
      { name: "Arduino", iconSrc: techStackIcons["Arduino"] },
      { name: "Serial / COM" },
      { name: "NFC" },
      { name: ".NET", iconSrc: techStackIcons[".NET"] },
      { name: "Electronics / Wiring" },
    ],
    mediaKeys: ["root:hardware"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["kiosk-host-dotnet"],
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
