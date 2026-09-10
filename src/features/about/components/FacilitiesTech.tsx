import { Microscope } from "lucide-react";
import { FACILITIES_TECH } from "@/features/about/data/index";

export default function FacilitiesTech() {
  return (
    <section className="relative">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card/90 border border-border text-primary text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
          <Microscope className="size-3.5 text-primary" />
          <span>Our Technology &amp; Facility</span>
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          World-Class Clinical Equipment &amp; Suites
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
          We invest in FDA-approved medical technologies and sterile
          clinical suites to ensure predictable, safe, and exceptional
          results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FACILITIES_TECH.map((item, idx) => (
          <div
            key={idx}
            className="bg-card rounded-3xl overflow-hidden border border-border shadow-md shadow-zinc-900/5 hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Photo */}
            <div className="relative aspect-16/10 overflow-hidden bg-muted">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-primary/80 text-primary-foreground text-[10px] font-semibold tracking-wide backdrop-blur-xs border border-white/10">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content & 1-line Caption */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground text-[11px] font-semibold mb-3">
                  {item.specs}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
