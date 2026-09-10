import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, CalendarCheck } from "lucide-react";
import {
  SIGNATURE_PACKAGE_STEPS,
  SIGNATURE_PACKAGE_BENEFITS,
  type TimelineStep,
} from "@/features/home/data/signaturePackageData";

interface StepItemProps {
  step: TimelineStep;
  isLast: boolean;
  active: boolean;
  lineActive: boolean;
  delay: number;
}

const StepItem: React.FC<StepItemProps> = ({
  step,
  isLast,
  active,
  lineActive,
  delay,
}) => {
  const Icon = step.icon;

  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div
          className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-full border-2 shrink-0 transition-all duration-500 ease-out ${
            active
              ? "scale-110 border-primary bg-primary text-primary-foreground"
              : "scale-90 border-border bg-card text-muted-foreground"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        {!isLast && (
          <div className="w-1 flex-1 my-1 bg-border relative overflow-hidden rounded-full">
            <motion.div
              initial={false}
              animate={{ scaleY: lineActive ? 1 : 0 }}
              transition={{ duration: 0.4, delay, ease: "easeOut" }}
              className="absolute inset-0 bg-primary origin-top rounded-full"
            />
          </div>
        )}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : 16 }}
        transition={{ duration: 0.45, delay, ease: "easeOut" }}
        className={isLast ? "pb-0" : "pb-8"}
      >
        <h3 className="text-lg font-semibold text-foreground pt-2.5">
          <span className="text-primary mr-2 text-sm font-bold">
            M{step.month}
          </span>
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
};

export const SignaturePackage: React.FC = () => {
  const [activeCount, setActiveCount] = useState(0);
  const [benefitsActiveCount, setBenefitsActiveCount] = useState(0);
  const [ctaAttention, setCtaAttention] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const TOTAL_STEPS = SIGNATURE_PACKAGE_STEPS.length;
  const TOTAL_BENEFITS = SIGNATURE_PACKAGE_BENEFITS.length;

  // Scroll progress: 0 when the timeline top enters at 85% of the viewport,
  // 1 when its bottom reaches the 70% line. M(k) lights up at k/5 of that
  // range, so the steps light up sequentially while scrolling down and
  // reverse back when scrolling up. Used on all screen sizes.
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;

      const stepEl = listRef.current;
      if (stepEl) {
        const top = stepEl.getBoundingClientRect().top;
        const start = vh * 0.85;
        const total = start - (vh * 0.7 - stepEl.getBoundingClientRect().height);
        const v = Math.min(1, Math.max(0, (start - top) / total));
        setActiveCount(
          v <= 0.02 ? 0 : Math.min(TOTAL_STEPS, Math.floor(v * TOTAL_STEPS) + 1),
        );
      }

      const benEl = benefitsRef.current;
      if (benEl) {
        const top = benEl.getBoundingClientRect().top;
        const start = vh * 0.85;
        const total = start - (vh * 0.7 - benEl.getBoundingClientRect().height);
        const v = Math.min(1, Math.max(0, (start - top) / total));
        setBenefitsActiveCount(
          v <= 0.02
            ? 0
            : Math.min(TOTAL_BENEFITS, Math.floor(v * TOTAL_BENEFITS) + 1),
        );
      }

      // "Secure Your Spot" pulse: only once every step and benefit has lit
      // up, and only while the button is actually on screen.
      const ctaEl = ctaRef.current;
      if (ctaEl) {
        const r = ctaEl.getBoundingClientRect();
        const inView = r.top < vh * 0.92 && r.bottom > 0;
        setCtaAttention(
          inView && activeCount >= TOTAL_STEPS && benefitsActiveCount >= TOTAL_BENEFITS,
        );
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [TOTAL_STEPS, TOTAL_BENEFITS, activeCount, benefitsActiveCount]);

  return (
    <section className="py-20 px-4 md:px-8 bg-card max-w-7xl mx-auto">
      <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-border">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 p-8 md:p-12 lg:p-16 text-foreground">
          <div className="mb-10 lg:mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-4 border border-primary/20">
              Flagship Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              The Complete 5-Month <br />
              <span className="text-primary">Rejuvenation Package</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A transformative, step-by-step journey designed by our experts
              to visibly restore, renew, and enhance your natural skin and
              hair health.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            <div ref={listRef}>
              {SIGNATURE_PACKAGE_STEPS.map((step, index) => (
                <StepItem
                  key={index}
                  step={step}
                  isLast={index === SIGNATURE_PACKAGE_STEPS.length - 1}
                  active={index < activeCount}
                  lineActive={index + 1 < activeCount}
                  delay={0}
                />
              ))}
            </div>

            <div className="flex flex-col lg:pl-10">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Package Benefits
              </h3>

              <ul ref={benefitsRef} className="space-y-4 mb-10">
                {SIGNATURE_PACKAGE_BENEFITS.map((benefit, idx) => {
                  const active = idx < benefitsActiveCount;
                  return (
                    <li key={idx} className="flex items-start gap-3">
                      {/* Same fill treatment as the timeline circles: the
                          disc fills with primary as it activates, but the
                          tick stays visible in both themes. */}
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ease-out ${
                          active
                            ? "scale-110 border-primary bg-primary text-primary-foreground"
                            : "scale-90 border-border bg-card text-muted-foreground/60"
                        }`}
                      >
                        <Check className="w-4.5 h-4.5" strokeWidth={3} />
                      </div>
                      <motion.span
                        initial={false}
                        animate={{
                          opacity: active ? 1 : 0.35,
                          x: active ? 0 : 12,
                        }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="inline-block text-foreground leading-relaxed"
                      >
                        {benefit}
                      </motion.span>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-8 border-t border-border">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                    Start Your Journey
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    Book a Consultation
                  </p>
                </div>

                <Link
                  ref={ctaRef}
                  to="/book"
                  className={`w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:-translate-y-1 ${
                    ctaAttention ? "secure-cta-attention" : ""
                  }`}
                >
                  <CalendarCheck className="w-5 h-5" />
                  Secure Your Spot
                </Link>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  *Consultation fee goes towards your package cost. Space is
                  limited.
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignaturePackage;
