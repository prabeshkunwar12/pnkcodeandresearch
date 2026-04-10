import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const gameControllersSensorNetworkProject: Project =
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
};
