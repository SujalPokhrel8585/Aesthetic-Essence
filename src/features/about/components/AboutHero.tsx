import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="pt-12 pb-10 sm:pt-16 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/90 border border-border text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs"
        >
          <Sparkles className="size-3.5 text-primary" />
          <span>About AestheticEssence Skin &amp; Hair Clinic</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 font-sans"
        >
          Where Medical Science Meets Natural Radiance
        </motion.h1>

        {/* 1-line intro */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed max-w-3xl mx-auto"
        >
          AestheticEssence Skin and Hair Clinic is a leading provider of personalized
          skincare and haircare solutions. Our team of expert dermatologists use
          the latest technology and techniques to provide effective and
          long-lasting treatments to our clients. We believe that every
          individual's skin and hair are unique, and we work closely with our
          clients to understand their needs and provide customized solutions
          that are tailored to their specific requirements. At AestheticEssence Skin and
          Hair Clinic, we are committed to helping our clients look and feel
          their best.
        </motion.p>
      </div>
    </section>
  );
}
