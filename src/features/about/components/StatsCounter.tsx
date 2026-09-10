import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import { STATS } from "@/features/about/data/index";
import AnimatedCounter from "./AnimatedCounter";

/* Internal stat links navigate with the router; external ones stay <a>. */
const MotionLink = motion.create(Link);

export default function StatsCounter() {
  return (
    <section className="relative">
      <div className="bg-muted text-foreground rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl border border-border">
        {/* Background Decorative Glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20/60 text-xs font-semibold uppercase tracking-wider mb-3">
              <Award className="size-3.5" /> Proven Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Numbers that Reflect Our Commitment
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Over a decade of dedicated clinical practice and
              transformative patient journeys in Kathmandu.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              const isExternal = Boolean(stat.href && !stat.href.startsWith("/"));
              const CardTag = stat.href
                ? isExternal
                  ? motion.a
                  : MotionLink
                : motion.div;
              return (
                <CardTag
                  key={idx}
                  {...(isExternal
                    ? { href: stat.href, target: "_blank", rel: "noopener noreferrer" }
                    : { to: stat.href })}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`bg-card backdrop-blur-xs border border-border rounded-2xl p-5 sm:p-6 text-center hover:shadow-md transition-all shadow-sm ${
                    stat.href ? "cursor-pointer hover:border-primary/40" : ""
                  }`}
                >
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                    <Icon
                      className={`size-5 ${isExternal ? "fill-amber-400 text-amber-400" : ""}`}
                    />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-1 tabular-nums">
                    <AnimatedCounter
                      value={stat.numericValue}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      duration={2.2}
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-primary mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {stat.description}
                  </div>
                </CardTag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
