import { ArchitectureSection } from "./components/ArchitectureSection";
import { BackToTop } from "./components/BackToTop";
import { GameDevelopmentSection } from "./components/GameDevelopmentSection";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { ImpactSection } from "./components/ImpactSection";
import { LeadershipSection } from "./components/LeadershipSection";
import { SystemsSection } from "./components/SystemsSection";

export default function AeroSportsPage() {
  return (
    <>
      <HeroSection />
      <ArchitectureSection />
      <SystemsSection />
      <GameDevelopmentSection />
      <LeadershipSection />
      <GallerySection />
      <ImpactSection />
      <BackToTop />
    </>
  );
}
