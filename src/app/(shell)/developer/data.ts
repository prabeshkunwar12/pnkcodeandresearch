import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";

export type ProjectLink = { label: string; href: string };
export type ProjectFact = { label: string; value: string };
export type ProjectMedia = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
};
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
  featured?: boolean;
  techStack: TechItem[];
  company?: string;
  period?: string;
  role?: string;
  mediaKeys?: string[];
  media?: ProjectMedia[];
  cardBackgroundImage?: ProjectMedia;
  mediaSectionTitle?: string;
  mediaSectionMetrics?: string[];
  mediaSectionLayout?: "carousel" | "gallery" | "coverflow";
  links?: ProjectLink[];
  tags?: string[];
  typeTags?: string[];
  techTags?: string[];
  relatedProjectIds?: string[];
  architecture?: ProjectArchitectureMap;
  quickFacts?: ProjectFact[];
  overviewContent?: string;
  modulesContent?: string;
  middlewareContent?: string;
  architectureNotes?: string;
  architectureNotesContent?: string;
  customerFlowContent?: string;
  playerFlowContent?: string;
  workflowContent?: string;
  workflowTitle?: string;
  logicStructureContent?: string;
  screenTypesContent?: string;
  devicesContent?: string;
  softwareFlowContent?: string;
  controllerTypesContent?: string;
  deviceFlowContent?: string;
  corePagesContent?: string;
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
    featured: true,
    shortDescription:
      "Customer and staff-facing kiosk UI for room readiness, player scans, variant selection, and session controls.",
    typeTags: ["frontend", "runtime"],
    techTags: ["next.js", ".net", "api"],
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
    typeTags: ["frontend", "runtime"],
    techTags: ["next.js", "api"],
    content: `
### Overview

A realtime **Next.js scorecard** rendered inside the kiosk host as a secondary WebView.

It is designed to display live game state clearly without owning any gameplay logic itself.
`,
    quickFacts: [
      { label: "Stack", value: "Next.js + WebView" },
      { label: "Runtime", value: "Realtime JSON updates" },
      { label: "Modes", value: "Alliance + PvP + Custom" },
      { label: "Deployment", value: "Hosted centrally for all rooms" },
      { label: "Role", value: "Thin display layer" },
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
    featured: true,
    company: "AeroSports",
    role: "Runtime + Game Logic Engineering",
    period: "Production system",
    shortDescription:
      "Realtime .NET runtime that launches game variants, manages controller communication, executes game logic, and coordinates restart flow with the kiosk system.",
    typeTags: ["runtime", "systems"],
    techTags: [".net", "arduino"],
    content: `
### Overview

A **.NET console runtime** launched by the **Kiosk Host** to run a live game session.

It manages **game logic**, **controller communication**, and **runtime state**, then streams status back to the room system.
`,
    quickFacts: [
      { label: "Variants", value: "30+ game variants" },
      { label: "Rooms", value: "8 game rooms" },
      { label: "Runtime", value: ".NET console runtime" },
      { label: "Communication", value: "Socket + controller network" },
      { label: "Latency", value: "5-10ms optimized sensor paths" },
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
    workflowTitle: "Engine Workflow",
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
    typeTags: ["hardware", "iot", "systems"],
    techTags: [".net", "arduino", "api"],
    content: `
### Overview

Built the shared **room device and communication layer** used across multiple interactive rooms.

It combines hardware infrastructure, protocol handling, and runtime reliability so the rest of the room software can work consistently.
`,
    quickFacts: [
      { label: "Scope", value: "Shared room device layer" },
      { label: "Connectivity", value: "USB + COM + Ethernet" },
      { label: "Recovery", value: "Automatic COM reassignment" },
      { label: "Resilience", value: "Watchdog-assisted recovery" },
      { label: "Ownership", value: "Software + hardware integration" },
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
    featured: true,
    company: "AeroSports",
    role: "Controller Protocols + Hardware Integration",
    period: "Production system",
    shortDescription:
      "Realtime controller and sensor network powering gameplay interactions across rooms, from USR RS422-over-Ethernet systems to custom Arduino and ESP-based controller stacks.",
    typeTags: ["hardware", "iot", "systems"],
    techTags: ["arduino", "api"],
    content: `
### Overview

This project covers the **gameplay-specific controller and sensor layer** used across the facility.

These systems translate engine commands into real room behavior and return player interaction state back into the runtime.
`,
    quickFacts: [
      { label: "Backbone", value: "USR-N510 / USR-N540" },
      { label: "Network", value: "RS422 to Ethernet controller chain" },
      { label: "Controllers", value: "Custom Arduino + ESP" },
      { label: "Telemetry", value: "Realtime sensor state updates" },
      { label: "Engineering", value: "Protocol + hardware layout design" },
    ],
    mediaSectionTitle: "Controllers, Sensors & Gameplay Devices",
    mediaSectionLayout: "coverflow",
    architecture: {
      title: "Architecture",
      description:
        "Gameplay controllers sit between the game engine and the physical room devices, translating runtime commands into light and sensor behavior and returning interaction data back into the software runtime.",
      badges: ["Realtime controllers", "USR + Arduino + ESP", "Gameplay hardware"],
      nodes: [
        { id: "game-engine", label: "Game Engine", row: 1 },
        { id: "controllers", label: "Controllers", row: 2 },
        { id: "sensors", label: "Sensors / Targets", row: 3 },
      ],
      edges: [
        {
          from: "game-engine",
          to: "controllers",
          label: "commands + state",
          bidirectional: true,
          labelOffsetY: -10,
        },
        {
          from: "controllers",
          to: "sensors",
          label: "lights / sensors",
          bidirectional: true,
          labelOffsetY: -10,
        },
      ],
    },
    overviewContent: `
### Overview

This project covers the **gameplay-specific controller and sensor layer** used across the facility.

Unlike the shared room infrastructure devices, these controllers and sensors are directly tied to **gameplay interaction**.

They include:
- **USR-N510** and **USR-N540** controller systems
- room-specific controllers such as **Climb controllers**
- custom **Arduino Mega** controllers for Laser
- **ESP-based controller systems** for Recipe
- multiple forms of **light sensors / interactive targets**

This layer is responsible for translating runtime commands from the game engine into physical room behavior and returning player interaction state back into the software runtime.
`,
    controllerTypesContent: `
### Controller Types

#### USR Controller Backbone

For most games, we use the following controller families:

- **USR-N510**
  - 1-port controller
  - used for games with fewer light sensors
  - examples: **HexaQuest**, **Basket**

- **USR-N540**
  - 4-port controller
  - used for larger sensor networks
  - examples: **TileHunt**, **CTarget**, **PushButtons**

These were configured using **RS422 -> Ethernet** protocol.

Although the controller itself has one IP address, each port can use its own dedicated socket ports for sending and receiving.

The controllers send light sensor state updates roughly **20 times per second** in **hex format**.

Each port controls its own **separate sensor sequence**, which is important because:
- signal intensity stays more stable
- the data stays in a manageable size
- processing remains efficient

USR controllers also expose a built-in **web interface** that allows:
- checking signal quality
- changing IP addresses
- changing socket ports
- reviewing controller settings

---

#### Sensor / Target Types

The connected targets vary by room and gameplay style.

Examples include:
- **floor tiles** for TileHunt
- **wall tiles** that register ball hits in Hexa
- **laser-sensor LEDs** on the wall for CTarget
- push buttons and other room-specific target devices

The light sensors themselves include built-in **RGB LEDs**:
- controllers send color information to the targets
- sensors send active/inactive state back to the controller

---

#### Climb Controller Setup

Climb uses a separate controller system for its main wall interactions.

It includes:
- separate controller/receiver hardware
- 4 separate ports handling 4 different sequences

In addition, Climb also uses:
- floor tiles
- a USR-based floor tile controller layer

That means the room can involve:
- 3 controllers
- plus the PC
- all connected through a switch

---

#### Laser Controller Setup

Laser Escape uses a custom controller stack.

It includes:
- **4 Arduino Mega controllers**
- each handles **48 devices**
- total:
  - **96 lasers**
  - **96 sensors**

Split:
- 2 controllers for lasers
- 2 controllers for sensors

These communicate to the PC via **COM ports**.

Laser also includes:
- push buttons controlled by a **USR controller**

---

#### Recipe Controller Setup

Recipe does not use traditional light sensors.

Instead:
- each station has an **NFC scanner**
- a plate is scanned to interact with the station

The room is controlled through:
- a **proxy/server ESP**
- connected to the kiosk through COM
- and connected wirelessly to **7 client ESP chips**
`,
    deviceFlowContent: `
### Device Flow

At a high level, the controller flow works like this:

- the **Game Engine** sends commands to the controllers
- controllers perform actions on the physical devices
- player interaction is detected by the devices
- controllers send that interaction state back to the engine

Communication style depends on the controller family:

#### Socket-based controllers
Used by:
- USR controller systems
- Climb controller systems

These communicate with the PC using socket communication over Ethernet.

#### COM-based controllers
Used by:
- Arduino-based systems
- many custom controller devices

These communicate through COM ports.

This made the controller layer flexible enough to support:
- standard reusable controller setups
- room-specific custom hardware where needed
`,
    evolutionContent: `
### Evolution

#### Early stage

Initially, we were only using **USR controllers**.

That gave us a stable foundation for:
- light sensor interaction
- color control
- basic room communication

#### Climb expansion

The next major step was **Climb**, which introduced:
- a separate controller protocol
- a controller/receiver setup
- floor tile integration using the existing USR system

This hybrid setup expanded what kinds of room mechanics we could support.

#### Laser expansion

A major shift came with **Laser Escape**, where we built our **own controllers and protocol**.

The hardware stack included:
- MOSFET-based device control
- 8 MOSFET groups controlling laser/sensor outputs
- Ethernet-style wiring into Arduino Mega controllers
- 2 laser controllers + 2 sensor controllers
- multi-port USB/COM expansion into the PC

This was the first time we fully moved beyond the preprogrammed USR model into our own controller and protocol design.

#### Recipe expansion

Recipe introduced another new direction:
- no standard light sensor logic
- distributed **ESP controller network**
- a proxy/server ESP communicating with multiple wireless station clients

Each expansion pushed the controller network beyond a single standard pattern and made the system more flexible.
`,
    challengesContent: `
### Challenges

#### 1. Understanding USR controllers and socket communication

The first challenge was understanding the USR controller model and how to use socket communication effectively in practice.

Although I already knew the basics of networking and sockets, this project made it much more applied.

Important things to learn included:
- daisy-chain wiring
- per-port socket behavior
- controller protocols
- communication handler design
- deciding sequence layouts
- signal quality and power distribution
- choosing an optimized number of devices per sequence

All of these were new in this context, but connected naturally with the things I already knew.

---

#### 2. Working with different sensor types and layouts

Another challenge was adapting different types of physical targets into a common controller model.

Even though games looked very different physically, their device communication could often be mapped back into reusable patterns.

That meant the challenge became:
- understanding LED/sensor power requirements
- understanding gameplay needs
- choosing the most optimized physical layout

I documented these layouts for the games using the USR controller system and provided them to the construction and electrician teams.

---

#### 3. Reverse engineering the Climb controller protocol

Climb was a major challenge because I was not given protocol documentation.

I only had:
- the original application that could control the LED sensors
- packet data to inspect

So I used:
- the application
- packet decoders

to reverse engineer the protocol and build the communication handler.

That was not easy, especially because I had not done packet decoding before, but it was also one of the most interesting parts of the project.

---

#### 4. Choosing the right floor detection approach for Climb

Another challenge in Climb was deciding how to detect whether players had fallen off the ledge.

The choice was between:
- motion sensors
- lasers

We explored motion sensors for a while, but that required building a completely new system from scratch in both hardware and software.

For lasers, we already had a system, but at that time it was not reliable enough.

The final solution came from our construction manager:
- use **floor tiles**

This gave us several advantages:
- visually better room design
- easier installation
- reuse of the already working USR controller system

Later, integrating floor tiles into Climb also enabled us to create more interesting games, and Climb became the most played room in the facility.

---

#### 5. Designing the Laser protocol and wiring topology

Laser was a major challenge.

At first, we had controller ideas that split the system differently:
- each controller handling **24 lasers + 24 sensors**

That could work logically, but the physical wiring was terrible:
- lasers and sensors were separated by about **10 ft**
- wiring would have required large numbers of long Ethernet runs
- installation complexity became too high

So we changed to a better split:
- 2 controllers for lasers
- 2 controllers for sensors

That simplified wiring, but introduced a new challenge:
- the laser controller and its corresponding sensor controller had to stay synchronized

Once we redesigned the protocol using a more efficient **hex communication model**, the system became fast and stable enough to work well, with **less than 10ms delay**.
`,
    contributionContent: `
### My Contribution

I worked on both the **software protocol side** and the **physical hardware design side** of this controller network.

My contribution included:
- learning and implementing USR controller communication
- building communication handlers
- designing controller layouts and sequence structures
- documenting room layouts for installation teams
- reverse engineering the Climb protocol
- designing and improving the custom controller protocol for Laser
- helping expand the system from standard preprogrammed controllers into fully custom controller stacks

This project involved a lot of research, experimentation, and iteration, but it became one of the most interesting parts of the facility because it connected physical gameplay directly to the software runtime.
`,
    techStack: [
      { name: "Sockets" },
      { name: "RS422" },
      { name: "Ethernet" },
      { name: "Arduino", iconSrc: techStackIcons["Arduino"] },
      { name: "ESP" },
      { name: "C++" },
      { name: "Hex Protocols" },
      { name: "COM Ports" },
    ],
    mediaKeys: ["root:hardware"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: [
      "game-engine-dotnet",
      "room-devices-access-control",
      "kiosk-host-dotnet",
    ],
  },
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
  },
  {
    id: "registration-tablet",
    slug: "registration-tablet",
    name: "Registration Tablet System (MAUI + Next.js)",
    company: "AeroSports",
    role: "Full Implementation",
    period: "Production system",
    shortDescription:
      "Self-service player registration system using MAUI kiosk tablets and a hosted Next.js interface with NFC wristband scanning.",
    typeTags: ["frontend", "operations"],
    techTags: ["maui", "next.js", "api"],
    content: `
### Overview

The **Registration Tablet System** allows players to register their NFC wristbands themselves using tablets placed in the facility.

It combines a **MAUI Android wrapper** with a hosted **Next.js registration UI** to create a kiosk-style self-service flow.
`,
    quickFacts: [
      { label: "Form Factor", value: "Tablet kiosk system" },
      { label: "Runtime", value: "MAUI Android wrapper" },
      { label: "UI", value: "Next.js hosted interface" },
      { label: "Hardware", value: "NFC wristband registration" },
      { label: "Experience", value: "Self-service onboarding flow" },
    ],
    mediaSectionTitle: "Registration Tablet UI",
    mediaSectionLayout: "coverflow",
    architecture: {
      title: "Architecture",
      description:
        "The registration system runs on Android tablets using a MAUI wrapper that exposes NFC functionality while displaying a hosted Next.js interface in kiosk mode.",
      badges: ["Tablet kiosk", "MAUI + Next.js", "NFC registration"],
      nodes: [
        { id: "tablet", label: "Tablet (MAUI App)", row: 1 },
        { id: "webui", label: "Next.js Registration UI", row: 2 },
        { id: "api", label: "Backend API", row: 3 },
        { id: "database", label: "Database", row: 4 },
      ],
      edges: [
        { from: "tablet", to: "webui", label: "webview display", bidirectional: true },
        { from: "webui", to: "api", label: "data requests", bidirectional: true },
        { from: "api", to: "database", label: "data access", bidirectional: true },
      ],
    },
    overviewContent: `
### Overview

The **Registration Tablet System** allows players to register their NFC wristbands themselves using tablets placed in the facility.

It combines two components:

- a **MAUI Android application** running on the tablet
- a **Next.js web application** that provides the UI

The MAUI app runs in **kiosk mode** and displays the hosted Next.js page inside a webview.

Its primary role is to:
- expose the **tablet NFC reader**
- pass scanned wristband IDs to the web interface

The **Next.js application** handles the player interaction and communicates with the backend API to store and retrieve player information.

This system allows customers to register themselves without requiring staff intervention.
`,
    playerFlowContent: `
### Player Registration Flow

The registration UI is designed to be simple enough for players to complete themselves.

#### Step 1 - Enter email

Players begin by entering their **email address**.

This email acts as the **primary key** for the player group.

---

#### Step 2 - Detect existing or new account

The system checks if the email already exists.

If the email is **new**:
- players enter their details
- they can also add **children** under the same account

If the email already exists:
- the page displays all players associated with that email.

---

#### Step 3 - Select player

Each player entry has a **scan button** beside their name.

Players select the correct profile.

---

#### Step 4 - Scan wristband

After selecting the player profile:

- the user taps the **scan button**
- the tablet waits for an NFC scan
- the wristband is scanned on the tablet

The MAUI application reads the NFC tag and passes the UID to the web interface.

---

#### Step 5 - Wristband registration

The wristband is then linked to the selected player profile through the API.

After registration, the player is ready to use the wristband for gameplay.
`,
    evolutionContent: `
### Evolution

The first version of this system was not tablet-based.

It was a **WinForms desktop application** that used a **WebForms UI**.

While functional, it had several limitations:

- the UI felt outdated
- the experience was not optimized for touch interaction
- the physical setup was not ideal for customer-facing use

To improve the experience, we redesigned the system around **tablets**.

The new architecture included:

- **MAUI Android application**
- **Next.js hosted UI**

The tablet runs the MAUI application in **kiosk mode**, while the Next.js page provides the interactive interface.

This made the system easier to update because the UI could be changed centrally on the server without reinstalling the tablet applications.
`,
    challengesContent: `
### Challenges

#### 1. First Android application for the facility

This was one of the first Android applications used in the facility.

While MAUI development felt similar to WPF, there was still an adjustment period working with mobile-specific behaviors.

---

#### 2. Converting tablets into kiosk systems

Turning tablets into proper kiosk devices was more difficult than expected.

We had to:

- research how to configure Android devices into kiosk mode
- apply several Android-specific configuration commands
- prevent users from exiting the application

Once we successfully configured the first tablet, we documented every step so the same process could be repeated on additional devices.

---

#### 3. Device setup and installation

Installing and configuring the application on each tablet was also time-consuming.

Each device required:

- kiosk configuration
- application installation
- NFC testing
- network configuration

Proper documentation became essential so the process could be repeated quickly if devices needed to be reset or replaced.

---

#### 4. Evaluating mobile development frameworks

At one point we questioned whether **MAUI** was the best framework for the job.

However, research showed that **mobile development itself is generally time-consuming regardless of the framework**, and the complexity we experienced was mostly due to the mobile ecosystem rather than MAUI specifically.
`,
    contributionContent: `
### My Contribution

I was fully responsible for this system.

I chose to take ownership of the project because:

- I had already worked on the previous desktop version
- I did not want other team members to spend time dealing with the mobile setup challenges

My responsibilities included:

- designing the tablet-based architecture
- building the **MAUI Android wrapper**
- developing the **Next.js registration UI**
- integrating NFC scanning with the web interface
- configuring tablets into kiosk devices
- documenting installation and setup procedures

The web portion of this system was also the **first web application I built for the company**, which later led to me being hired to build more web-based systems for the platform.
`,
    techStack: [
      { name: "MAUI" },
      { name: "Next.js", iconSrc: techStackIcons["Next.js"] },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Android" },
      { name: "NFC" },
      { name: "API" },
      { name: ".NET", iconSrc: techStackIcons[".NET"] },
    ],
    mediaKeys: ["file:/developer/aerosports/frontend-screens/registration.jpeg"],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: ["pos-wpf", "admin-portal", "kiosk-host-dotnet"],
  },
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
  },
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
  },
  {
    id: "backend-api-express",
    slug: "backend-api-express",
    name: "Backend API (Express.js Core System)",
    featured: true,
    company: "AeroSports",
    role: "Backend System Design + Development",
    period: "Production system",
    shortDescription:
      "Central Express.js backend powering all AeroSports applications with MSSQL, authentication, API keys, rate limiting, and fault-tolerant request handling.",
    typeTags: ["backend", "systems"],
    techTags: ["express", "mssql", "api"],
    content: `
### Overview

The **Backend API** is the backbone of the entire AeroSports platform.

It is the central service layer connecting all client systems to the database while enforcing security, validation, and reliability.
`,
    quickFacts: [
      { label: "Stack", value: "Express.js backend" },
      { label: "Database", value: "MSSQL" },
      { label: "Auth", value: "JWT + API keys" },
      { label: "Reliability", value: "Rate limiting + retries" },
      { label: "Role", value: "Platform-wide data backbone" },
    ],
    architecture: {
      title: "Architecture",
      description:
        "The backend API acts as the central data and control layer, connecting all AeroSports applications to the MSSQL database while enforcing security, validation, and reliability through middleware.",
      badges: ["Core system", "Central API", "Fault-tolerant"],
      nodes: [
        { id: "clients", label: "AeroSports Systems", row: 1 },
        { id: "api", label: "Express API", row: 2 },
        { id: "database", label: "MSSQL Database", row: 3 },
      ],
      edges: [
        { from: "clients", to: "api", label: "requests", bidirectional: true },
        { from: "api", to: "database", label: "queries", bidirectional: true },
      ],
    },
    overviewContent: `
### Overview

The **Backend API** is the backbone of the entire AeroSports platform.

It is built using **Express.js** and connects all systems to a centralized **MSSQL database** hosted on the server.

Every major system depends on it, including:
- Kiosk systems
- Game engine
- Scorecard
- POS
- Registration tablets
- Admin portal

It is responsible for:
- data access
- authentication and authorization
- request validation
- system reliability
- performance optimization

As the system scaled, the backend evolved from a simple data provider into a **robust, secure, and fault-tolerant core system**.
`,
    middlewareContent: `
### Request Flow & Middleware

All requests pass through a structured middleware pipeline before reaching business logic.

#### 1. Request Validation

Every request is validated to ensure:
- proper structure
- required fields
- valid parameters

---

#### 2. Authentication

Two authentication methods are supported:

**JWT Tokens**
- used for user-based systems (e.g., admin portal)
- verifies logged-in users

**API Keys**
- used for machines (kiosk, POS, tablets)
- avoids requiring user login on physical devices
- each machine has its own API key stored in the database

---

#### 3. Authorization

After authentication, requests are checked for:
- role-based access
- permission level
- allowed actions

Additionally:
- **location/IP restrictions** are applied for sensitive operations

---

#### 4. Rate Limiting

Each API key or token is monitored to:
- prevent excessive requests
- avoid system overload
- maintain stability across all connected systems

---

#### 5. Retry Mechanism

A retry middleware ensures reliability:

- failed requests are retried automatically
- retries occur within a configured time window
- prevents temporary failures from breaking the system

---

#### 6. Business Logic Execution

Only after passing all middleware layers does the request:
- interact with controllers
- execute logic
- query/update the database

This layered design ensures:
- security
- stability
- predictable behavior across all systems
`,
    evolutionContent: `
### Evolution

#### Phase 1 - Basic data provider

The backend initially:
- sent game data to machines
- received player data and scores

At this stage:
- no authentication
- no middleware
- minimal structure

---

#### Phase 2 - Performance and stability improvements

As usage increased, we faced:
- slow API responses
- blocking requests
- system-wide freezes

We:
- optimized database queries
- restructured tables and relationships
- modularized code into controllers and services

---

#### Phase 3 - Reliability enhancements

We introduced:
- retry middleware
- better error handling
- structured responses

This reduced:
- request failures
- system hangs
- inconsistent data issues

---

#### Phase 4 - Security layer

As the system expanded, security became critical.

We added:
- JWT authentication
- API key system for machines
- authorization checks
- IP/location restrictions

---

#### Phase 5 - Scalability features

To support multiple systems running simultaneously:

We added:
- rate limiting
- better request handling
- improved middleware pipeline

At this stage, the API became a **fully structured backend system** supporting all platform components.
`,
    challengesContent: `
### Challenges

#### 1. Performance bottlenecks

Initially, the API was slow and inefficient.

Some requests:
- blocked others
- caused system-wide freezes

We solved this by:
- optimizing queries
- improving database structure
- restructuring request handling

---

#### 2. Unreliable requests

Requests sometimes:
- got lost
- never returned responses
- caused calling systems to freeze

We introduced:
- retry middleware
- better error handling
- structured responses

We also updated client systems to:
- handle failures gracefully

---

#### 3. Data inconsistency

Even valid requests sometimes returned inconsistent data.

This required:
- standardizing response structures
- improving validation
- ensuring consistent data formatting

---

#### 4. Security implementation

Adding authentication and authorization was challenging because:

- many systems were machines, not users
- traditional login systems wouldn't work

Solution:
- JWT for users
- API keys for machines

This hybrid approach allowed:
- security without breaking system usability

---

#### 5. Keeping system flexible while scaling

As new features were added:
- API changes affected all connected systems

Maintaining backward compatibility and stability across:
- kiosks
- tablets
- admin portal

was a continuous challenge
`,
    contributionContent: `
### My Contribution

I built the backend system from scratch and evolved it into a reliable core platform.

My contributions included:

- designing and implementing the Express.js API
- structuring database access and relationships
- optimizing performance and fixing blocking issues
- designing and implementing middleware architecture
- adding retry mechanisms for reliability
- implementing authentication and authorization (JWT + API keys)
- introducing rate limiting and security layers

As the team grew:
- I delegated feature development
- provided requirements and design direction
- reviewed implementations and ensured consistency

This project represents my work in turning a simple backend into a **scalable, secure, and fault-tolerant system** that supports the entire platform.
`,
    techStack: [
      { name: "Node.js" },
      {
        name: "Express.js",
        iconSrc: techStackIcons["Express"],
        iconSrcDark: techStackIconsDark["Express"],
      },
      { name: "MSSQL" },
      { name: "JWT" },
      { name: "REST API" },
      { name: "Middleware" },
    ],
    links: [{ label: "Case study", href: "/developer/aerosports" }],
    relatedProjectIds: [
      "admin-portal",
      "kiosk-host-dotnet",
      "game-engine-dotnet",
      "pos-wpf",
    ],
  },
];
