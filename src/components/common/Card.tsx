import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ServiceItem } from "@/types";

export type { ServiceItem };

interface CardProps {
  service: ServiceItem;
}

export const Card: React.FC<CardProps> = ({ service }) => {
  const Icon = service.icon;
  const isFeatured = service.featured;

  return (
    <div
      className={`group relative rounded-3xl p-6 transition-all duration-300 border flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
        isFeatured
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground border-border hover:border-ring"
      }`}
    >
      {/* Decorative Subtle Hover Glow */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full transition-transform duration-500 group-hover:scale-125 ${
          isFeatured ? "bg-primary/10" : "bg-muted"
        }`}
      />

      {/* Icon & Optional Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
            isFeatured
              ? "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white"
              : "bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>

        {service.badge && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/25">
            {service.badge}
          </span>
        )}
      </div>

      {/* Service Details */}
      <div className="relative z-10 my-auto">
        <h3 className="text-xl font-bold tracking-tight mb-1">
          {service.title}
        </h3>
        <p
          className={`text-sm leading-relaxed line-clamp-2 ${
            isFeatured ? "text-primary-foreground/60" : "text-muted-foreground"
          }`}
        >
          {service.valueProp}
        </p>
      </div>

      {/* CTA Link */}
      <div className="relative z-10">
        <Link
          to={`/services/${service.id}`}
          className={`relative inline-flex items-center text-sm font-semibold transition-all duration-200 after:absolute after:-inset-x-2 after:-inset-y-1.5 after:content-[''] ${
            isFeatured
              ? "text-primary group-hover:text-primary/75"
              : "text-foreground group-hover:text-primary"
          }`}
        >
          Learn more
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default Card;
