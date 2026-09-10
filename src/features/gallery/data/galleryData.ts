// Static gallery image data for the gallery feature page.
import type { GalleryItem } from "@/types";

export type { GalleryItem };

/**
 * ============================================================================
 * HOW TO ADD MORE IMAGES:
 * ----------------------------------------------------------------------------
 * 1. Simply add a new object to the `GALLERY_ITEMS` array below.
 * 2. You can use external URLs (Unsplash, Cloudinary, AWS S3, etc.)
 *    OR local images from your project:
 *    Example:
 *      import myPhoto from "@/assets/my-photo.jpg";
 *      ...
 *      {
 *        id: "unique-id-13",
 *        src: myPhoto, // or "https://..."
 *        title: "Treatment Name",
 *        subtitle: "Short description of the result",
 *        category: "Skin Rejuvenation", // "Skin Rejuvenation" | "Hair Care" | "Aesthetics" | "Clinical"
 *        year: "2026"
 *      }
 * ============================================================================
 */

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- Hero U-Shape Feature Cards (First 7 items) ---
  {
    id: "ae-01",
    src: "/gallery/doctor-performing-procedure.webp",
    title: "Expert Hands at Work",
    subtitle: "Our dermatologist performing a supervised procedure",
    category: "Clinical",
    year: "2026",
    aspectRatio: "portrait",
    featured: true,
  },
  {
    id: "ae-02",
    src: "/gallery/hydrafacial-treatment.webp",
    title: "HydraFacial Therapy",
    subtitle: "Deep-cleansing, hydrating care for an instant glow",
    category: "Skin Rejuvenation",
    year: "2026",
    aspectRatio: "square",
  },
  {
    id: "ae-03",
    src: "/gallery/precision-laser-treatment.webp",
    title: "Precision Laser Technology",
    subtitle: "Targeted laser energy for stubborn skin concerns",
    category: "Aesthetics",
    year: "2026",
    aspectRatio: "tall",
    featured: true,
  },
  {
    id: "ae-04",
    src: "/gallery/laser-procedure-care.webp",
    title: "Safe, Supervised Laser Care",
    subtitle: "Protective eyewear and strict protocols at every step",
    category: "Clinical",
    year: "2026",
    aspectRatio: "portrait",
  },
  {
    id: "ae-05",
    src: "/gallery/ultrasonic-scrubber-facial.webp",
    title: "Ultrasonic Deep-Cleansing Facial",
    subtitle: "Sonic scrubber technology lifting impurities from pores",
    category: "Skin Rejuvenation",
    year: "2026",
    aspectRatio: "tall",
    featured: true,
  },
  {
    id: "ae-06",
    src: "/gallery/laser-facial-treatment.webp",
    title: "Comfortable Laser Sessions",
    subtitle: "Patients relax while our trained team handles the tech",
    category: "Aesthetics",
    year: "2026",
    aspectRatio: "portrait",
  },
  {
    id: "ae-07",
    src: "/gallery/laser-skin-treatment.webp",
    title: "Dermatologist-Led Treatments",
    subtitle: "Medical-grade lasers operated by experienced specialists",
    category: "Clinical",
    year: "2026",
    aspectRatio: "square",
  },

  // --- Row 2 & Extended Works (Auto-rendered in dynamic rows below Hero) ---
  {
    id: "ae-08",
    src: "/gallery/hair-transplant-procedure.webp",
    title: "Hair Restoration Procedures",
    subtitle: "Scalp preparation under Dr. Karki's close supervision",
    category: "Hair Care",
    year: "2026",
    aspectRatio: "portrait",
  },
  {
    id: "ae-09",
    src: "/gallery/laser-hair-removal.webp",
    title: "Laser Hair Removal",
    subtitle: "Long-term reduction, safe for all skin tones",
    category: "Aesthetics",
    year: "2026",
    aspectRatio: "portrait",
  },
  {
    id: "ae-10",
    src: "/gallery/fractional-laser-acne-treatment.webp",
    title: "Fractional Acne & Scar Laser",
    subtitle: "Resurfacing treatment for clearer, smoother skin",
    category: "Clinical",
    year: "2025",
    aspectRatio: "landscape",
  },
  {
    id: "ae-11",
    src: "/gallery/led-light-therapy.webp",
    title: "LED Light Therapy",
    subtitle: "Red-light phototherapy to calm and rejuvenate skin",
    category: "Skin Rejuvenation",
    year: "2026",
    aspectRatio: "landscape",
  },
  {
    id: "ae-12",
    src: "/gallery/hair-restore-injection.webp",
    title: "Regenerative Hair Treatments",
    subtitle: "Targeted hairline care to restore natural density",
    category: "Hair Care",
    year: "2026",
    aspectRatio: "landscape",
  },
  {
    id: "ae-13",
    src: "/gallery/facial-rejuvenation.webp",
    title: "Facial Rejuvenation",
    subtitle: "Nourishing medical facials tailored to your skin",
    category: "Skin Rejuvenation",
    year: "2025",
    aspectRatio: "portrait",
  },
  {
    id: "ae-14",
    src: "/gallery/chemical-peel-treatment.webp",
    title: "Chemical Peeling Session",
    subtitle: "Medical-grade peels renewing texture and tone",
    category: "Skin Rejuvenation",
    year: "2026",
    aspectRatio: "portrait",
  },
  {
    id: "ae-15",
    src: "/gallery/microneedling-treatment.webp",
    title: "Microneedling",
    subtitle: "Collagen-induction therapy for smoother skin",
    category: "Aesthetics",
    year: "2026",
    aspectRatio: "landscape",
  },
];
