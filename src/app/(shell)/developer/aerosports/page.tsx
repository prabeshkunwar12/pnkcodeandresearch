import { ArchitectureSection } from "./components/ArchitectureSection";
import { AeroSportsProjectsSection } from "./components/AeroSportsProjectsSection";
import { BackToTop } from "./components/BackToTop";
import { GameDevelopmentSection } from "./components/GameDevelopmentSection";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { ImpactSection } from "./components/ImpactSection";
import { LeadershipSection } from "./components/LeadershipSection";

export default function AeroSportsPage() {
  return (
    <>
      <HeroSection />
      <ArchitectureSection />
      <AeroSportsProjectsSection />
      <GameDevelopmentSection />
      <LeadershipSection />
      <GallerySection />
      <ImpactSection />
      <BackToTop />
    </>
  );
}
