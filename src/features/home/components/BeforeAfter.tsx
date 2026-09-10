import { Plus } from "lucide-react";

import { BeforeAfterSlider } from "./BeforeAfterSlider";

import before from "/results/hair-transplant-before.webp";
import after from "/results/hair-transplant-after.webp";
import before400 from "/results/hair-transplant-before-400w.webp";
import before800 from "/results/hair-transplant-before-800w.webp";
import before1200 from "/results/hair-transplant-before-1200w.webp";
import after400 from "/results/hair-transplant-after-400w.webp";
import after800 from "/results/hair-transplant-after-800w.webp";
import after1200 from "/results/hair-transplant-after-1200w.webp";

const beforeSrcset = `${before400} 400w, ${before800} 800w, ${before1200} 1200w`;
const afterSrcset = `${after400} 400w, ${after800} 800w, ${after1200} 1200w`;

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
            beforeSrcset={beforeSrcset}
            afterSrcset={afterSrcset}
            beforeAlt="Patient hairline before hair transplant at AestheticEssence Clinic"
            afterAlt="Patient hairline after hair transplant at AestheticEssence Clinic"
            className="aspect-3/4 sm:aspect-3/4 mx-auto w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};
