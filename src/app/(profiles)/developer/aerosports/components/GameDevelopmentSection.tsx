import { Card } from "@/components/ui/card";
import { gamesCards } from "../data";
import { SectionHeader } from "./SectionHeader";

export function GameDevelopmentSection() {
  return (
    <section id="games" className="mt-20 scroll-mt-28 space-y-8">
      <SectionHeader
        eyebrow="Game Development"
        title="Protocols, hardware communication, and game variants"
        description="I developed and refined the communication layer between software and room hardware, improved protocols for reliability, and built/iterated new game variants — from rule design to prototype to playtesting."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gamesCards.map((item) => (
          <Card key={item.title} variant="surface" hover className="p-5">
            <h3 className="text-base font-semibold text-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-black/60">{item.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
