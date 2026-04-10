import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { techStackIcons, techStackIconsDark } from "@/data/images";
import type { Project } from "../../types";

export const scorecardNextjsProject: Project =
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
};
