import { Plus } from "lucide-react";

import { BeforeAfterSlider } from "./BeforeAfterSlider";

// Dermatology treatment progress photos (Unsplash, free stock)
const before =
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop";
const after =
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop";

export const BeforeAfter = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center md:px-8">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
          <Plus className="size-3.5" />
          Before And After Results
        </span>

        <h2 className="text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl">
          See The Difference Expert
          <br />
          Dermatology Care Can Make
        </h2>

        <div className="mt-10">
          <BeforeAfterSlider
            beforeSrc={before}
            afterSrc={after}
            beforeAlt="Skin before dermatology treatment at AestheticEssence Clinic"
            afterAlt="Skin after dermatology treatment at AestheticEssence Clinic"
            className="aspect-3/4 sm:aspect-3/4 mx-auto w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};
