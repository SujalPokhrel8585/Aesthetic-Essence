import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CalendarCheck, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Doctor } from "@/types";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group/card relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
    >
      {/* Collapsed to a calendar icon; hovering anywhere on the card (or the
          pill itself) opens it into "Book with Dr. X" and deep-links to the
          booking form with the doctor picked. */}
      <Link
        to={`/book?doctor=${encodeURIComponent(doctor.name)}`}
        aria-label={`Book with ${doctor.name}`}
        className="group/book absolute top-4 right-4 z-10 flex max-w-9 items-center overflow-hidden rounded-full bg-background/70 py-2 pr-2.5 pl-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover/card:max-w-64 group-hover/card:bg-primary group-hover/card:text-primary-foreground hover:max-w-64 hover:bg-primary hover:text-primary-foreground"
      >
        <CalendarCheck className="size-4 shrink-0" />
        <span className="ml-0 whitespace-nowrap text-xs font-semibold opacity-0 transition-all duration-300 group-hover/card:ml-2 group-hover/card:opacity-100 group-hover/book:ml-2 group-hover/book:opacity-100">
          Book with {doctor.name}
        </span>
      </Link>

      <div className="mb-4 aspect-[3/4] overflow-hidden rounded-lg">
        {doctor.imageUrl ? (
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-[#2e9e97]">
            <span className="text-4xl font-bold tracking-wide text-white">
              {doctor.name
                .replace("Dr. ", "")
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")}
            </span>
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold">{doctor.name}</h2>
      <p className="text-sm text-muted-foreground">
        {doctor.specialty}
        {doctor.yearsExperience ? ` · ${doctor.yearsExperience} yrs exp.` : ""}
      </p>

      {typeof doctor.rating === "number" && (
        <div className="my-3 flex items-center gap-2">
          <span className="text-lg font-bold">{doctor.rating.toFixed(1)}</span>
          <div className="flex text-muted-foreground">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4",
                  i < Math.round(doctor.rating!)
                    ? "text-primary"
                    : "text-muted-foreground/50",
                )}
                fill={i < Math.round(doctor.rating!) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground uppercase">
            ({doctor.reviews} reviews)
          </span>
        </div>
      )}

      <p className="grow text-sm text-muted-foreground">{doctor.bio}</p>

      <Link
        to={`/book?doctor=${encodeURIComponent(doctor.name)}`}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
      >
        <CalendarCheck className="size-4" />
        Book with {doctor.name}
      </Link>
    </motion.div>
  );
}
