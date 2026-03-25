import { ArchitectureSection } from "./components/ArchitectureSection";
import { AeroSportsProjectsSection } from "./components/AeroSportsProjectsSection";
import { BackToTop } from "./components/BackToTop";
import { CoreStrengthsSection } from "./components/CoreStrengthsSection";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { ImpactSection } from "./components/ImpactSection";

export default function AeroSportsPage() {
  return (
    <>
      <HeroSection />
      <ArchitectureSection />
      <AeroSportsProjectsSection />
      <CoreStrengthsSection />
      <GallerySection />
      <ImpactSection />
      <BackToTop />
    </>
  );
}
