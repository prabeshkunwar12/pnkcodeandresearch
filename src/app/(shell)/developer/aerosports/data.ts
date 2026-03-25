import type {
  ArchitectureEdge,
  ArchitectureNode,
  CapabilityBlock,
  GalleryImage,
  ImpactItem,
  SystemsCard,
  WorkCard,
} from "./types";

export const ownershipItems = [
  "End-to-end architecture (kiosk -> engine -> API -> devices)",
  "Real-time comms (UDP/TCP sockets, protocol improvements)",
  "Hardware integration (NFC, door locks, sensors, controllers)",
  "Facility launch execution + troubleshooting automation",
  "Training interns + task planning + delivery",
];

export const heroButtons = [
  {
    label: "View Projects",
    href: "/developer/aerosports#systems",
    variant: "primary" as const,
  },
  {
    label: "AeroSports Case Study",
    href: "/developer/aerosports#architecture",
    variant: "secondary" as const,
  },
];

export const platformScopeItems = [
  "8+ Game Rooms Deployed",
  "30+ Game Variants Built",
  "Full Stack: UI -> Backend -> Runtime -> Hardware",
  "Real-Time Systems with 5-10ms Device Latency",
];

export const capabilityBlocks: CapabilityBlock[] = [
  {
    title: "Realtime Game Systems",
    heading: "Low-latency, event-driven room runtime",
    description:
      "Design and execution of low-latency, event-driven game runtimes.",
    bullets: [
      "Modular .NET runtime for game logic, scoring, timers, restart flow, and room-specific variants.",
      "Latency reduced from roughly 200ms to around 5–10ms through protocol changes and communication-path optimization.",
      "Multi-threaded event handling for gameplay state, device updates, and runtime-to-host synchronization.",
    ],
    projects: [
      { label: "Game Engine", href: "/developer/projects/game-engine-dotnet" },
      {
        label: "Controllers & Sensors",
        href: "/developer/projects/game-controllers-sensor-network",
      },
      { label: "Kiosk Host", href: "/developer/projects/kiosk-host-dotnet" },
    ],
  },
  {
    title: "Platform & Backend Architecture",
    heading: "Shared API and orchestration layer across the platform",
    description:
      "Central API and system orchestration across all applications.",
    bullets: [
      "Express.js + MSSQL backend serving kiosks, POS, tablets, admin tools, and runtime services from one shared data layer.",
      "Authentication, API keys, rate limiting, retries, and middleware-based request handling for production reliability.",
      "Structured data flow between runtime, frontend, operational tools, and the facility database.",
    ],
    projects: [
      { label: "Backend API", href: "/developer/projects/backend-api-express" },
      { label: "Admin Portal", href: "/developer/projects/admin-portal" },
      { label: "Kiosk Host", href: "/developer/projects/kiosk-host-dotnet" },
    ],
  },
  {
    title: "Frontend & Interaction Systems",
    heading: "Fast UI for customer and staff workflows",
    description:
      "High-speed UI for real-world customer and staff interaction.",
    bullets: [
      "Next.js kiosk UI for scan flow, game selection, room readiness, and split-screen session UX.",
      "Real-time scorecard views with dynamic layouts for alliance, competitive, and custom game modes.",
      "Interfaces designed for quick decisions, low friction, and reliable operation in a live facility.",
    ],
    projects: [
      { label: "Kiosk UI", href: "/developer/projects/kiosk-ui-nextjs" },
      { label: "Scorecard", href: "/developer/projects/scorecard-nextjs" },
      { label: "Admin Portal", href: "/developer/projects/admin-portal" },
    ],
  },
  {
    title: "Hardware & System Integration",
    heading: "Bridging software with physical devices and room systems",
    description:
      "Bridging software with physical devices and game environments.",
    bullets: [
      "NFC, COM, Ethernet, Arduino, ESP, RS422, and controller-network integration across multiple game rooms.",
      "Automatic device detection, watchdog recovery, and room-level operational safeguards for production uptime.",
      "Wiring layouts, communication protocols, and deployment decisions that connect software with physical room behavior.",
    ],
    projects: [
      {
        label: "Room Devices",
        href: "/developer/projects/room-devices-access-control",
      },
      {
        label: "Controllers Network",
        href: "/developer/projects/game-controllers-sensor-network",
      },
      { label: "Kiosk Host", href: "/developer/projects/kiosk-host-dotnet" },
    ],
  },
] as const;

export const systemsCards: SystemsCard[] = [
  {
    title: "Kiosk (Game Selection + Room Control)",
    desc: "Multi-screen flow for selecting games, launching sessions, controlling room state, and syncing status across signage/scoreboards. Real-time messaging to the engine + server API.",
    mainImage: "/developer/aerosports/frontend-screens/game-selection/game-selection.png",
    images: [
      {
        src: "/developer/aerosports/frontend-screens/game-selection/game-selection.png",
        alt: "Kiosk game selection screen",
        caption: "Game selection",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/how-to-play.png",
        alt: "Kiosk how to play screen",
        caption: "How to play",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/admin-password.png",
        alt: "Kiosk admin password screen",
        caption: "Admin password",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/admin-dialog.png",
        alt: "Kiosk admin dialog screen",
        caption: "Admin dialog",
      },
    ],
  },
  {
    title: "Scoreboard + Display System",
    desc: "Scoreboards, signage screens, and status displays with multi-display orchestration and reliability-first UX for public-facing screens.",
    mainImage:
      "/developer/aerosports/frontend-screens/game-selection/scorecards/competitive.png",
    images: [
      {
        src: "/developer/aerosports/frontend-screens/game-selection/scorecards/alliance.png",
        alt: "Alliance scoreboard mode",
        caption: "Alliance mode",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/scorecards/competitive.png",
        alt: "Competitive scoreboard mode",
        caption: "Competitive mode",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/scorecards/custom.png",
        alt: "Custom scoreboard mode",
        caption: "Custom mode",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/scorecards/game-selection.png",
        alt: "Scorecard game selection screen",
        caption: "Scorecard selection",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/room-identifiers/Basket.png",
        alt: "Basket room identifier",
        caption: "Basket identifier",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/room-identifiers/Climb.png",
        alt: "Climb room identifier",
        caption: "Climb identifier",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/room-identifiers/CTarget.png",
        alt: "CTarget room identifier",
        caption: "CTarget identifier",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/room-identifiers/HexaQuest.png",
        alt: "HexaQuest room identifier",
        caption: "HexaQuest identifier",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/room-identifiers/LaserEscape.png",
        alt: "LaserEscape room identifier",
        caption: "LaserEscape identifier",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/room-identifiers/PushGame.png",
        alt: "PushGame room identifier",
        caption: "PushGame identifier",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/room-identifiers/Recipe.png",
        alt: "Recipe room identifier",
        caption: "Recipe identifier",
      },
      {
        src: "/developer/aerosports/frontend-screens/game-selection/room-identifiers/TileHunt.png",
        alt: "TileHunt room identifier",
        caption: "TileHunt identifier",
      },
    ],
  },
  {
    title: "Device Control Layer",
    desc: "Integration for NFC wristband scanners, NO/NC door locks, restart controls, hardware status monitoring, and self-service troubleshooting workflows.",
    mainImage: "/developer/aerosports/USR-N540.jpeg",
    images: [
      {
        src: "/developer/aerosports/USR-N540.jpeg",
        alt: "USR-N540 controller overview",
        caption: "USR-N540 controller",
      },
      {
        src: "/developer/aerosports/USR-N510.jpeg",
        alt: "USR-N510 controller overview",
        caption: "USR-N510 controller",
      },
      {
        src: "/developer/aerosports/USR-IOT_plug.jpeg",
        alt: "USR-IOT plug controller",
        caption: "USR-IOT plug controller",
      },
      {
        src: "/developer/aerosports/doorlock.jpeg",
        alt: "Door lock hardware integration",
        caption: "Door lock integration",
      },
    ],
  },
  {
    title: "POS + Staff Tools",
    desc: "Register players, assign wristbands, manage staff actions, and reduce operational friction with internal tooling.",
    mainImage: "/developer/aerosports/frontend-screens/pos/pos-overview.png",
    images: [
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-icon.png",
        alt: "POS icon screen",
        caption: "POS icon",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-overview.png",
        alt: "POS overview dashboard",
        caption: "POS overview",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-lookup.png",
        alt: "POS lookup screen",
        caption: "POS lookup",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-lookup-modal.png",
        alt: "POS lookup modal",
        caption: "POS lookup modal",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-initialize-process-1.png",
        alt: "POS initialization process step 1",
        caption: "Initialize step 1",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-initialize-process-2-with-reset.png",
        alt: "POS initialization process step 2 with reset",
        caption: "Initialize step 2 (reset)",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-initialize-process-2-without-reset.png",
        alt: "POS initialization process step 2 without reset",
        caption: "Initialize step 2 (no reset)",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-initialize-process-3-with-reset.png",
        alt: "POS initialization process step 3 with reset",
        caption: "Initialize step 3",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-renew-process-1.png",
        alt: "POS renew process step 1",
        caption: "Renew step 1",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-renew-process-end.png",
        alt: "POS renew process end",
        caption: "Renew complete",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-renew-process-with-active-time-already.png",
        alt: "POS renew process with active time already",
        caption: "Renew active time already",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-renew-process-without-active-time.png",
        alt: "POS renew process without active time",
        caption: "Renew without active time",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/pos-renew-process-without-record.png",
        alt: "POS renew process without record",
        caption: "Renew without record",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/register-process-1.png",
        alt: "Registration process step 1",
        caption: "Registration step 1",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/register-process-new-player-1.png",
        alt: "New player registration step 1",
        caption: "New player step 1",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/register-process-new-player-2.png",
        alt: "New player registration step 2",
        caption: "New player step 2",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/register-process-new-player-3.png",
        alt: "New player registration step 3",
        caption: "New player step 3",
      },
      {
        src: "/developer/aerosports/frontend-screens/pos/register-process-new-player-4.png",
        alt: "New player registration step 4",
        caption: "New player step 4",
      },
    ],
  },
  {
    title: "Tablet Registration App",
    desc: "Customer-facing registration workflow designed for fast throughput and easy staff handoff.",
    mainImage: "/developer/aerosports/frontend-screens/registration.jpeg",
    images: [
      {
        src: "/developer/aerosports/frontend-screens/registration.jpeg",
        alt: "Tablet registration app screen",
        caption: "Registration app",
      },
    ],
  },
  {
    title: "Axe Throwing Wrapper App",
    desc: "Wrapper integration to connect a third-party axe throwing app with the wristband identity system and session flow.",
    mainImage: "/developer/aerosports/frontend-screens/axe/axe-overview.png",
    images: [
      {
        src: "/developer/aerosports/frontend-screens/axe/axe-overview.png",
        alt: "Axe wrapper overview",
        caption: "Axe overview",
      },
      {
        src: "/developer/aerosports/frontend-screens/axe/axe-process-1.png",
        alt: "Axe workflow step 1",
        caption: "Axe process 1",
      },
      {
        src: "/developer/aerosports/frontend-screens/axe/axe-process-2.png",
        alt: "Axe workflow step 2",
        caption: "Axe process 2",
      },
      {
        src: "/developer/aerosports/frontend-screens/axe/axe-process-3.png",
        alt: "Axe workflow step 3",
        caption: "Axe process 3",
      },
    ],
  },
  {
    title: "Admin + Automations",
    desc: "Admin panels for game configuration, operational controls (e.g., smoke automation for laser game), and internal documentation.",
    mainImage: "/developer/aerosports/frontend-screens/Admin.png",
    images: [
      {
        src: "/developer/aerosports/frontend-screens/Admin.png",
        alt: "Admin and automations panel",
        caption: "Admin panel",
      },
    ],
  },
];

export const systemsGalleryPreviews: GalleryImage[] = [
  {
    src: "/developer/aerosports/frontend-screens/game-selection/game-selection.png",
    alt: "Game selection kiosk overview",
    caption: "Game Selection Kiosk",
  },
  {
    src: "/developer/aerosports/frontend-screens/game-selection/how-to-play.png",
    alt: "How-to-play screen",
    caption: "How To Play Flow",
  },
  {
    src: "/developer/aerosports/frontend-screens/pos/pos-overview.png",
    alt: "POS overview",
    caption: "POS Dashboard",
  },
  {
    src: "/developer/aerosports/frontend-screens/pos/pos-lookup.png",
    alt: "POS lookup flow",
    caption: "POS Lookup",
  },
  {
    src: "/developer/aerosports/frontend-screens/pos/register-process-1.png",
    alt: "Registration process",
    caption: "Tablet Registration",
  },
  {
    src: "/developer/aerosports/frontend-screens/axe/axe-overview.png",
    alt: "Axe wrapper overview",
    caption: "Axe Wrapper",
  },
];

export const gamesCards: WorkCard[] = [
  {
    title: "UDP + Socket Handlers",
    desc: "Implemented and stabilized low-latency socket handling between game software and room controllers.",
  },
  {
    title: "Protocol Improvements",
    desc: "Refined packet flow, handling rules, and retry strategies to improve reliability under real load.",
  },
  {
    title: "Game Variant Research & Design",
    desc: "Designed and evaluated variant mechanics based on play patterns, room constraints, and throughput goals.",
  },
  {
    title: "Prototype -> Test -> Iterate",
    desc: "Shipped early playable builds, tested with users, and iterated quickly using on-floor feedback.",
  },
  {
    title: "Bug Fixing + Stability",
    desc: "Resolved runtime issues across game logic, session sync, and edge-case transitions in live operations.",
  },
  {
    title: "Hardware Work (IoT controllers, sensors, Arduino)",
    desc: "Integrated and tested sensor/controller behaviors across multiple games and room setups.",
  },
  {
    title: "Wiring + Diagrams + Efficiency Upgrades",
    desc: "Created diagrams and implementation notes to speed setup, reduce downtime, and simplify maintenance.",
  },
];

export const gameRoomFiles = [
  "basket_complete1.jpeg",
  "basket_complete2.jpeg",
  "climb_complete1.jpeg",
  "climb_construction1.jpeg",
  "climb_construction2.jpeg",
  "cybershot_complete1.jpeg",
  "cybershot_complete2.jpeg",
  "hexaquest_complete.jpeg",
  "hexaquest_complete1.jpeg",
  "hexaquest_complete2.jpeg",
  "laser_complete.jpeg",
  "laser_construction1.jpeg",
  "laser_construction3.jpeg",
  "laser_construction_2.jpeg",
  "pushbutton_complete1.jpeg",
  "pushbutton_complete2.jpeg",
  "pushbutton_complete3.jpeg",
  "tilehunt_complete.jpeg",
  "tilehunt_complete1.jpeg",
  "tilehunt_complete2.jpeg",
  "tilehunt_complete3.jpeg",
  "tilehunt_complete4.jpeg",
] as const;

export const roomDisplayNameMap: Record<string, string> = {
  basket: "Basket",
  climb: "Climb",
  cybershot: "CyberShot",
  hexaquest: "HexaQuest",
  laser: "Laser",
  pushbutton: "PushButton",
  tilehunt: "TileHunt",
};

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "mssql",
    title: "Database",
    subtitle: "Central production data store",
    details: [
      "Hosted on the facility server",
      "Stores player, session, game, and config data",
      "Accessed through the Express API layer",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-1 lg:row-start-1",
    href: "/developer/projects/backend-api-express",
  },
  {
    id: "api",
    title: "Backend API",
    subtitle: "Core backend for all platform systems",
    details: [
      "Serves kiosks, operations tools, and admin systems",
      "JWT + API key auth, validation, retries, and rate limiting",
      "Owns secure data flow between applications and MSSQL",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-5 lg:row-start-1",
    href: "/developer/projects/backend-api-express",
  },
  {
    id: "admin",
    title: "Admin Portal",
    subtitle: "Platform control, analytics, and documentation",
    details: [
      "Frontend for game config, player management, analytics, and device controls",
      "Uses the API for all secure reads and writes",
      "Supports internal operations and platform oversight",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-1",
    href: "/developer/projects/admin-portal-nextjs",
  },
  {
    id: "pos",
    title: "POS",
    subtitle: "Staff player and wristband workflows",
    details: [
      "Handles initialization, lookup, renewals, and registration support",
      "Reads and writes through the API",
      "Used by staff as the operational front-desk tool",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-1 lg:row-start-2",
    href: "/developer/projects/pos-wpf",
  },
  {
    id: "registration",
    title: "Registration Tablet",
    subtitle: "Self-service player onboarding",
    details: [
      "Tablet kiosk flow with MAUI wrapper and hosted Next.js UI",
      "Uses NFC wristband scanning and API-backed registration",
      "Feeds directly into the shared player/session system",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-1 lg:row-start-3",
    href: "/developer/projects/registration-tablet",
  },
  {
    id: "axeWrapper",
    title: "Axe Wrapper",
    subtitle: "Third-party gameplay wrapper with timed access",
    details: [
      "Tablet wrapper that validates wristbands through the API",
      "Launches a mirrored remote session for the vendor axe system",
      "Enforces timed play access inside the wider AeroSports platform",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-1 lg:row-start-4",
    href: "/developer/projects/axe-wrapper-maui",
  },
  {
    id: "kioskUi",
    title: "Kiosk UI",
    subtitle: "Room-facing Next.js interaction layer",
    details: [
      "Handles game selection, scan flow, high scores, and start UX",
      "Rendered inside the room host runtime",
      "Sends user intent and receives room/process state from the host",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-5 lg:row-start-2",
    href: "/developer/projects/kiosk-ui-nextjs",
  },
  {
    id: "kioskHost",
    title: "Kiosk Host",
    subtitle: "Room runtime coordinator and device owner",
    details: [
      "Owns room state, launching, scorecard updates, and room device control",
      "Communicates with the kiosk UI, game engine, API, and shared devices",
      "Handles health checks, diagnostics, and room operations",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-5 lg:row-start-3",
    dominant: true,
    href: "/developer/projects/kiosk-host-dotnet",
  },
  {
    id: "scorecard",
    title: "Scorecard",
    subtitle: "Hosted realtime display layer",
    details: [
      "Receives structured score, timer, and game data from the kiosk host",
      "Supports alliance, competitive, and custom display modes",
      "Rendered as the secondary room display",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-2",
    href: "/developer/projects/scorecard-nextjs",
  },
  {
    id: "engine",
    title: "Game Engine",
    subtitle: "Realtime gameplay runtime",
    details: [
      "Owns game rules, mode logic, scoring, timers, and runtime state",
      "Receives launch/session state from the kiosk host",
      "Controls controller networks and returns gameplay state",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-3",
    href: "/developer/projects/game-engine-dotnet",
  },
  {
    id: "sharedDevices",
    title: "Room Devices",
    subtitle: "Displays, scanner, door lock, restart, and room hardware",
    details: [
      "Shared .NET device layer for USB, COM, Ethernet, and room operations",
      "Used by the kiosk host, watchdog tools, and related room software",
      "Covers scanners, locks, displays, restart controls, and reliability workflows",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-5 lg:row-start-4",
    href: "/developer/projects/room-devices-access-control",
  },
  {
    id: "controllerNetwork",
    title: "Controllers & Sensors",
    subtitle: "USR, Arduino, ESP, and gameplay hardware",
    details: [
      "Realtime device layer for gameplay sensors, targets, lights, and custom controllers",
      "Includes USR, Arduino, ESP, COM, and Ethernet-based controller stacks",
      "Integrated directly with game runtime logic",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-4",
    href: "/developer/projects/game-controllers-sensor-network",
  },
];

export const architectureEdges: ArchitectureEdge[] = [
  { from: "mssql", to: "api", label: "SQL", direction: "bi" },
  { from: "api", to: "admin", label: "Secure requests", direction: "bi" },
  { from: "api", to: "pos", label: "Read / write", direction: "bi" },
  { from: "api", to: "registration", label: "Registration data", direction: "bi" },
  { from: "api", to: "axeWrapper", label: "Wristband validation", direction: "bi" },
  { from: "kioskHost", to: "api", label: "Config + session data", direction: "bi" },
  { from: "kioskUi", to: "kioskHost", label: "Room UI state", direction: "bi" },
  { from: "kioskHost", to: "scorecard", label: "Realtime display data", direction: "uni" },
  {
    from: "kioskHost",
    to: "engine",
    label: "Runtime state",
    direction: "bi",
  },
  {
    from: "kioskHost",
    to: "sharedDevices",
    label: "Room devices",
    direction: "bi",
  },
  { from: "engine", to: "controllerNetwork", label: "Commands + state", direction: "bi" },
  {
    from: "kioskHost",
    to: "controllerNetwork",
    label: "Diag / test",
    direction: "bi",
    variant: "dashed",
  },
];

export const leadershipCards: WorkCard[] = [
  {
    title: "Facility Built From Scratch",
    desc: "Worked with owner + location manager + construction team on layout, wiring plans, and hardware selection.",
  },
  {
    title: "Cross-team Execution",
    desc: "Coordinated with construction and helpers to keep delivery aligned with schedule and constraints.",
  },
  {
    title: "Ownership During Management Absence",
    desc: "Helped lead the project on schedule during a month-long management absence, alongside the construction lead.",
  },
  {
    title: "Hiring + Training Interns",
    desc: "Trained interns, assigned work by skill, and coordinated milestones to deliver features on time.",
  },
  {
    title: "Operational Readiness + Troubleshooting",
    desc: "Built staff-facing features for self-diagnostics, logging, and faster incident resolution.",
  },
  {
    title: "Continuous Improvements",
    desc: "Added automations, new features, and documentation as the system evolved.",
  },
];

export const leadershipGallery: GalleryImage[] = [
  {
    src: "/developer/aerosports/myself.jpeg",
    alt: "On-site leadership",
    caption: "On-Site Leadership",
  },
  {
    src: "/developer/aerosports/doorlock.jpeg",
    alt: "Hardware troubleshooting",
    caption: "Hardware Debugging",
  },
  {
    src: "/developer/aerosports/game-rooms/climb_construction1.jpeg",
    alt: "Climb room construction",
    caption: "Construction Phase",
  },
  {
    src: "/developer/aerosports/game-rooms/laser_construction1.jpeg",
    alt: "Laser room setup",
    caption: "Laser Setup",
  },
  {
    src: "/developer/aerosports/game-rooms/climb_complete1.jpeg",
    alt: "Completed climb room",
    caption: "Climb Complete",
  },
  {
    src: "/developer/aerosports/game-rooms/hexaquest_complete1.jpeg",
    alt: "Completed HexaQuest room",
    caption: "HexaQuest Complete",
  },
];

export const impactItems: ImpactItem[] = [
  {
    key: "daily-throughput",
    title: "1000+ games played per day",
    description:
      "Built for daily public use with continuous runtime reliability across active deployments.",
  },
  {
    key: "multi-site",
    title: "Deployed across 4+ locations",
    description:
      "Validated and rolled out systems on-site across AeroSports and PixelPulse facilities.",
  },
  {
    key: "multi-location-arch",
    title: "Multi-location architecture",
    description:
      "Extended backend and application flows to support cleaner scaling across facilities.",
  },
  {
    key: "controller-sims",
    title: "Controller simulators built",
    description:
      "Removed hardware dependency for many testing workflows and sped up development cycles.",
  },
  {
    key: "admin-controls",
    title: "Staff admin controls in kiosk",
    description:
      "Reduced routine dependency on developers by exposing safe recovery and control actions to staff.",
  },
  {
    key: "debuggers",
    title: "In-app debuggers for rooms",
    description:
      "Lowered downtime with room-specific diagnostics for locks, controllers, restart buttons, and displays.",
  },
  {
    key: "docs-portal",
    title: "Documentation inside admin portal",
    description:
      "Created a hardware, wiring, and troubleshooting knowledge base for managers and construction teams.",
  },
];
