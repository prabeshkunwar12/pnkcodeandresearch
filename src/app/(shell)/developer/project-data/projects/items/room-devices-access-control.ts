import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const roomDevicesAccessControlProject: Project =
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
};
