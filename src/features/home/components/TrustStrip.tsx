import {TRUST_ITEMS} from "../data/trustItem";
import tornPaper from "@/assets/torn-paper.webp";
import tornPaperDark from "@/assets/torn-paper-dark.webp";

/** Slim reassurance strip under the hero: hygiene, safety and credibility. */
export default function TrustStrip() {
  return (
    <section
      aria-label="Safety and hygiene standards"
      className="border-y border-border bg-card/60 py-12 container-fluid"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="size-9 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Icon className="size-4.5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Torn paper transition into next section (light / dark variants) */}
      <img
        src={tornPaper}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="torn-paper-edge py-4 sm:py-8 md:py-12"
      />
      <img
        src={tornPaperDark}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="torn-paper-edge-dark py-4 sm:py-8 md:py-12"
      />
    </section>
  );
}
