import React from "react";
import { Card } from "@/components/common/Card";
import { SERVICES_OVERVIEW } from "@/features/home/data/servicesOverviewData";

export const ServicesOverview: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Our Signature Services
        </h2>
        <p className="mt-4 text-muted-foreground text-base md:text-lg">
          Explore our medical-grade treatments designed to rejuvenate, enhance,
          and restore your natural skin and hair.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
        {SERVICES_OVERVIEW.map((service) => (
          <Card key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesOverview;
