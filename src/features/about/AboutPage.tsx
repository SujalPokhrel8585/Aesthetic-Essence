import Seo from "@/components/seo/Seo";
import { seoForPath } from "@/constants/seo";
import {
  AboutHero,
  OurStory,
  WhyChooseUs,
  FacilitiesTech,
  DoctorTeam,
  StatsCounter,
} from "@/features/about/components/index";

export default function AboutPage() {
  return (
    <main id="main" className="page-gradient-bg w-full text-foreground overflow-hidden relative">
      <Seo {...seoForPath("/about")} />
      {/* Ambient Background Glow Blobs */}
      <div className="ambient-blobs-container">
        <div className="ambient-blob ambient-blob-sky-lg" />
        <div className="ambient-blob ambient-blob-blue-md" />
        <div className="ambient-blob ambient-blob-emerald-md" />
        <div className="ambient-blob ambient-blob-amber-sm" />
      </div>

      <AboutHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-20 md:space-y-24">
        <OurStory />
        <WhyChooseUs />
        <FacilitiesTech />
        <DoctorTeam />
        <StatsCounter />
      </div>
    </main>
  );
}
