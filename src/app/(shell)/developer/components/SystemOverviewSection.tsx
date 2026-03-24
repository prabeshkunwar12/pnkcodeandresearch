"use client";

import { Card } from "@/components/ui/card";
import { ArchitectureMap } from "./ArchitectureMap";
import { SectionHeader } from "./SectionHeader";
import type { ProjectArchitectureMap } from "../data";

const architecture: ProjectArchitectureMap = {
  nodes: [
    { id: "players-staff", label: "Players / Staff", row: 1 },
    { id: "kiosk-ui", label: "Kiosk UI", row: 2 },
    { id: "kiosk-host", label: "Kiosk Host", row: 3 },
    { id: "game-engine", label: "Game Engine", row: 4 },
    { id: "controllers", label: "Controllers / Devices", row: 5 },
    { id: "backend-api", label: "Backend API", row: 3 },
    { id: "database", label: "Database", row: 4 },
    { id: "admin-portal", label: "Admin Portal", row: 2 },
  ],
  edges: [
    { from: "players-staff", to: "kiosk-ui", label: "session flow", bidirectional: true },
    { from: "kiosk-ui", to: "kiosk-host", label: "room state", bidirectional: true },
    { from: "kiosk-host", to: "game-engine", label: "runtime control", bidirectional: true },
    { from: "game-engine", to: "controllers", label: "commands + state", bidirectional: true },
    { from: "kiosk-host", to: "backend-api", label: "data sync", bidirectional: true, labelOffsetX: 18 },
    { from: "backend-api", to: "database", label: "queries", bidirectional: true, labelOffsetX: 18 },
    { from: "admin-portal", to: "backend-api", label: "secure ops", bidirectional: true, labelOffsetX: -16 },
  ],
  badges: [
    "Frontend + backend",
    "Realtime runtime",
    "Controllers + IoT",
    "Operations + analytics",
  ],
};

export function SystemOverviewSection() {
  return (
    <section
      id="system-overview"
      data-page-section="true"
      data-page-section-label="System Overview"
      className="mt-16 w-full max-w-full min-w-0 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow="Platform Overview"
        title="AeroSports Platform Overview"
        description="At AeroSports, I helped build a full interactive gaming platform that connects kiosks, game engines, room hardware, controller networks, backend APIs, analytics systems, and staff operations tools into one production environment."
      />

      <Card
        variant="surface"
        className="w-full max-w-full min-w-0 rounded-[28px] p-4 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)] sm:p-6"
      >
        <ArchitectureMap architecture={architecture} />
      </Card>
    </section>
  );
}
