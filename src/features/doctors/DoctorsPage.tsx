import { Sparkles } from "lucide-react";

import Seo from "@/components/seo/Seo";
import { seoForPath, physiciansSchema } from "@/constants/seo";
import { DoctorsSection } from "@/features/doctors/components";
import { doctorData, categoryData } from "@/features/doctors/data/doctorsData";

export default function DoctorsPage() {
  return (
    <main id="main" className="page-gradient-bg relative flex flex-grow items-center overflow-hidden pt-10 px-4 py-12 text-foreground sm:px-6 md:py-20 lg:px-8">
      <Seo {...seoForPath("/doctors")} jsonLd={[physiciansSchema()]} />
      {/* Ambient Background Glow Blobs */}
      <div className="ambient-blobs-container">
        <div className="ambient-blob ambient-blob-blue-top" />
        <div className="ambient-blob ambient-blob-blue-top" />
        <div className="ambient-blob ambient-blob-sky-bottom" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* HERO HEADER */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase shadow-xs">
            <Sparkles className="size-3.5 text-primary" />
            <span>Our Care Team</span>
          </div>

          <h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
            Meet Our Specialists
          </h1>

          <p className="text-base leading-relaxed font-normal text-muted-foreground sm:text-lg">
            NMC-registered dermatologists dedicated to your skin and hair
            health, from medical care to advanced hair restoration.
          </p>
        </div>

        {/* DOCTOR GRID PANEL */}
        <div className="rounded-3xl border border-border bg-card p-4 shadow-lg shadow-black/5 sm:p-8">
          <DoctorsSection
            doctors={doctorData}
            categories={categoryData}
            title=""
          />
        </div>
      </div>
    </main>
  );
}
