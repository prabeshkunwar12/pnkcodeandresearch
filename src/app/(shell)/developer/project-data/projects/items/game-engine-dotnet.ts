import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const gameEngineDotnetProject: Project =
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
};
