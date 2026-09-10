import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";
import type { Doctor } from "@/types";
import { DoctorCard } from "./DoctorCard";

interface DoctorsSectionProps {
  doctors: Doctor[];
  categories: string[];
  /** Section heading. Pass "" to hide it, e.g. when a page-level hero already shows one. */
  title?: string;
}

export const DoctorsSection = ({
  doctors,
  categories,
  title = "Meet Our Dermatologists",
}: DoctorsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDoctors =
    activeCategory === "All"
      ? doctors
      : doctors.filter((doctor) => doctor.category === activeCategory);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        {title && (
          <h2 className="mb-4 text-4xl text-foreground sm:mb-0">{title}</h2>
        )}
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
