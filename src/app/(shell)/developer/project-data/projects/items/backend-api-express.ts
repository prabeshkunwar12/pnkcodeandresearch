import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const backendApiExpressProject: Project =
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
};
