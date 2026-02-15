import { Card } from "@/components/ui/card";
import { leadershipCards } from "../data";
import { SectionHeader } from "./SectionHeader";

export function LeadershipSection() {
  return (
    <section id="leadership" className="mt-20 scroll-mt-28 space-y-8">
      <SectionHeader
        eyebrow="Project Leadership"
        title="Leading delivery from two test rooms to a full facility launch"
        description="I joined when two rooms (TileHunt and HexaQuest) were in testing. After learning the system, I helped scale the project into a new facility built from scratch — coordinating software, hardware, and construction execution, then leading delivery and post-launch improvements."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leadershipCards.map((item) => (
          <Card key={item.title} variant="surface" hover className="p-5">
            <h3 className="text-base font-semibold text-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-black/60">{item.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
