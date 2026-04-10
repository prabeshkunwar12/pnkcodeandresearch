import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const registrationTabletProject: Project =
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
};
