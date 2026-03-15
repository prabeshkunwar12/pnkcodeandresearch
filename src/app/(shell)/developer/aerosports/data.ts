import type {
  ArchitectureEdge,
  ArchitectureNode,
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
    label: "Explore Systems",
    href: "/developer/aerosports#systems",
    variant: "primary" as const,
  },
  {
    label: "Game Development",
    href: "/developer/aerosports#games",
    variant: "secondary" as const,
  },
  {
    label: "Project Leadership",
    href: "/developer/aerosports#leadership",
    variant: "tertiary" as const,
  },
];

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
    title: "On-prem MSSQL Database",
    subtitle: "Local server database for room operations",
    details: ["Hosted on local server", "Port forwarded", "Queried by API only"],
    desktopClassName: "lg:col-span-3 lg:col-start-1 lg:row-start-1",
  },
  {
    id: "api",
    title: "Express.js API",
    subtitle: "Token-protected internal API",
    details: [
      "Used by all apps on private network",
      "Token-based authorization",
      "Bridges data between clients and MSSQL",
    ],
    desktopClassName: "lg:col-span-5 lg:col-start-4 lg:row-start-1",
  },
  {
    id: "admin",
    title: "Admin Page",
    subtitle: "Ops controls and configuration tools",
    details: ["Uses API for controls", "Internal access only"],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-2",
  },
  {
    id: "pos",
    title: "POS",
    subtitle: "Staff checkout and player management",
    details: ["Reads/writes player sessions", "Token-auth API calls"],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-1",
  },
  {
    id: "registration",
    title: "Registration",
    subtitle: "Customer onboarding workflow app",
    details: ["Fast player registration", "Hands off data to POS via API"],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-3",
  },
  {
    id: "kiosk",
    title: "Kiosk App (per room PC)",
    subtitle: "3-screen kiosk + device health checks",
    details: [
      "3-screen system: Kiosk + Scoreboard + Display",
      "Fetches game/player data from API",
      "Submits scores to API after each game",
      "Startup hardware health checks + guided errors",
      "Status dialog: send commands (lock/unlock, test devices)",
      "Admin menu: force stop, restart app, reboot/shutdown PC",
    ],
    desktopClassName: "lg:col-span-5 lg:col-start-4 lg:row-start-2 lg:row-span-2",
    dominant: true,
  },
  {
    id: "engine",
    title: "Game Engine",
    subtitle: "Runtime controlled by kiosk only",
    details: ["No direct API access", "Receives launch args and session state"],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-4",
  },
  {
    id: "handlers",
    title: "Device/Protocol Handlers",
    subtitle: "UDP + COM protocol adapter layer",
    details: [
      "UDP handler",
      "COM port handler",
      "Controller-specific protocol implementations",
    ],
    desktopClassName: "lg:col-span-4 lg:col-start-9 lg:row-start-5",
  },
  {
    id: "comHardware",
    title: "Room Hardware (COM)",
    subtitle: "Scanner, restart button, speakers, COM devices",
    details: [
      "Wristband scanner",
      "Restart button",
      "Speakers",
      "Game-specific COM hardware",
    ],
    desktopClassName: "lg:col-span-3 lg:col-start-1 lg:row-start-4",
  },
  {
    id: "iot",
    title: "IoT Controllers",
    subtitle: "UDP/Ethernet IP:Port sockets",
    details: [
      "Some preprogrammed controllers",
      "Some custom protocol implementations",
      "Bi-directional UDP communication",
    ],
    desktopClassName: "lg:col-span-5 lg:col-start-4 lg:row-start-4",
  },
  {
    id: "sensors",
    title: "Light Sensors / Targets",
    subtitle: "Player-triggered events to controllers",
    details: [
      "Interactive targets emit events",
      "Signals relay through controller layer",
    ],
    desktopClassName: "lg:col-span-5 lg:col-start-4 lg:row-start-5",
  },
];

export const architectureEdges: ArchitectureEdge[] = [
  { from: "mssql", to: "api", label: "SQL", direction: "bi" },
  { from: "api", to: "pos", label: "Token HTTP", direction: "bi" },
  { from: "api", to: "admin", label: "Token HTTP", direction: "bi" },
  { from: "api", to: "registration", label: "Token HTTP", direction: "bi" },
  { from: "kiosk", to: "api", label: "Token HTTP", direction: "bi" },
  {
    from: "kiosk",
    to: "engine",
    label: "Launch / Session",
    direction: "bi",
  },
  {
    from: "engine",
    to: "handlers",
    label: "Protocol Interface",
    direction: "bi",
  },
  {
    from: "kiosk",
    to: "comHardware",
    label: "COM",
    direction: "bi",
  },
  {
    from: "engine",
    to: "comHardware",
    label: "COM",
    direction: "bi",
  },
  { from: "handlers", to: "iot", label: "UDP / COM", direction: "bi" },
  { from: "iot", to: "sensors", label: "Events", direction: "bi" },
  {
    from: "kiosk",
    to: "iot",
    label: "Diag / Test",
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
    stat: "Daily throughput at scale",
    details: [
      "The platform supports 1000+ games played per day across active deployments.",
      "Designed for reliability under continuous public use.",
    ],
  },
  {
    key: "multi-site",
    title: "Deployed across 4+ locations",
    stat: "Multi-site rollout",
    details: [
      "St. Catharines (AeroSports): all 8 rooms deployed",
      "Windsor (AeroSports): HexaQuest + TileHunt deployed",
      "Vaughan (PixelPulse): all 8 rooms + additional rooms in deployment",
      "London (AeroSports): TileHunt deployed",
      "I was directly involved in deploying and validating these systems on-site.",
    ],
  },
  {
    key: "multi-location-arch",
    title: "Multi-location architecture",
    stat: "Backend + apps updated",
    details: [
      "Added multi-location support in the backend and propagated it across the system architecture.",
      "Enabled cleaner operations and scaling across facilities.",
    ],
  },
  {
    key: "controller-sims",
    title: "Controller simulators",
    stat: "Faster development cycles",
    details: [
      "Built simulators for all controller types to run and test game flows directly on a PC.",
      "Reduced development/testing time by removing hardware dependency for many workflows.",
    ],
  },
  {
    key: "admin-controls",
    title: "Staff admin controls in kiosk",
    stat: "Less dependency on devs",
    details: [
      "Added elevated admin actions for staff: force stop games, restart kiosk, reboot/shutdown PCs, and other recovery actions.",
      "Reduced reliance on developers/technicians for routine operational issues.",
    ],
  },
  {
    key: "debuggers",
    title: "In-app troubleshooting & debuggers",
    stat: "Lower downtime",
    details: [
      "Created room-specific debuggers to test connected devices: door locks, controllers, restart button, screen switching, and more.",
      "Enabled quick verification and faster issue isolation in the field.",
    ],
  },
  {
    key: "docs-portal",
    title: "Documentation inside admin portal",
    stat: "Hardware + wiring knowledge base",
    details: [
      "Added internal documentation covering hardware details, wiring/circuits, suggestions, and troubleshooting tips.",
      "Helped managers and construction teams access required information without waiting on developers.",
    ],
  },
];
