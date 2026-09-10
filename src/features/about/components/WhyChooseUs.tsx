import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, Check } from "lucide-react";
import { WHY_CHOOSE_US_POINTS } from "@/features/about/data/index";

export default function WhyChooseUs() {
  return (
    <section className="relative">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card/90 border border-border text-primary text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
          <ShieldCheck className="size-3.5 text-primary" />
          <span>The AestheticEssence Advantage</span>
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why Patients Choose AestheticEssence
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
          Four foundational pillars that establish our reputation as
          Kathmandu&apos;s trusted skin and hair restoration center.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {WHY_CHOOSE_US_POINTS.map((point, idx) => {
          const Icon = point.icon;
          return (
            <div
              key={idx}
              className="bg-card rounded-3xl p-7 sm:p-8 border border-border shadow-md shadow-zinc-900/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xs group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="size-6" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${point.badgeColor}`}
                  >
                    {point.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">
                  {point.title}
                </h3>
                <p className="text-xs font-medium text-primary mb-3">
                  {point.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1 text-accent-foreground font-medium">
                  <Check className="size-3.5" /> Doctor Consulted
                </span>
                <Link
                  to="/contact"
                  className="font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
