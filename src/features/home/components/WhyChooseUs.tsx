import {
  Award,
  Users,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import { CLINIC_INFO } from "@/constants";

const STATS = [
  { icon: Clock, value: "10+ Years", label: "Clinical Experience" },
  { icon: Users, value: "100+", label: "Patients Treated" },
  {
    icon: Award,
    value: "Advanced",
    label: "Dermatology & Hair Transplant Expert",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted relative overflow-hidden" id="about">
      <div className="w-full px-4 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-soft-badge mb-3 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground shadow-sm">
            Why Choose AestheticEssence
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Expert Care Rooted in Science & Trust
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Led by specialist dermatologists in Samakhushi, Kathmandu, combining
            cutting-edge technology with personalized medical treatments.
          </p>
        </div>

        {/* Main Grid: Doctor Profile + Proof of Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Doctor Bio Card (Authority Builder) */}
          <div className="lg:col-span-7 bg-card rounded-3xl p-8 shadow-sm border border-border flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-muted shrink-0 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop"
                    alt="Dr. Saroj Karki"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-accent-foreground uppercase tracking-wider">
                    Lead Dermatologist
                  </span>
                  <h3 className="text-2xl font-bold text-foreground">
                    Dr. Saroj Karki
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    MBBS, MD (Dermatology & Venereology)
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-accent-foreground" />
                    <span>NMC Registered Specialist</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Dr. Saroj Karki is a recognized expert in advanced medical
                dermatology, trichology, and surgical hair restoration.
                Dedicated to evidence-based skincare, acne management, and
                complex conditions like Lichen Planopilaris and Melasma
                management.
              </p>

              {/* Highlights Checklist */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground shrink-0" />
                  <span>Advanced Hair Transplants</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground shrink-0" />
                  <span>Medical HydraFacial Protocols</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground shrink-0" />
                  <span>Customized Acne & Scar Healing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground shrink-0" />
                  <span>Anti-Aging & Botox Treatments</span>
                </li>
              </ul>
            </div>

            {/* Trust Metrics Bar inside card */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-foreground font-bold text-lg">
                      <Icon className="h-4 w-4 text-muted-foreground hidden sm:inline-block" />
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results / Case Study Card (Proof of Results) */}
          <div className="lg:col-span-5 bg-gray-900 text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden border border-teal-500/40">
            {/* Decorative background glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    Clinical Case Study
                  </span>
                  <h3 className="text-xl font-bold mt-1">
                    Lichen Planopilaris Care
                  </h3>
                </div>
                <span className="bg-white/10 text-teal-300 text-xs px-2.5 py-1 rounded-full font-medium">
                  Real Results
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-gray-800 aspect-video mb-6 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop"
                  alt="Before and after clinical results"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Documented case tracking a patient with scarring alopecia.
                Following personalized anti-inflammatory regimens and targeted
                clinical procedures under Dr. Karki, stable remission and
                noticeable regrowth were achieved.
              </p>
            </div>

            <a
              href={CLINIC_INFO.socials.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full rounded-full bg-white text-gray-900 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-100"
            >
              <span>Book Consultation with Dr. Karki</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
