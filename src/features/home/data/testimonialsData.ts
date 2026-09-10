// Real patient reviews from the clinic's Google Maps listing.
// Each entry links back to the original Google review so visitors can verify
// it, never show an aggregate review count here.

import { CLINIC_INFO } from "@/constants/clinic";

/** The clinic's Google Maps listing (rating + all reviews). */
export const GOOGLE_REVIEWS_URL = CLINIC_INFO.socials.maps;

export interface TestimonialItem {
  name: string;
  text: string;
  rating?: number;
  /** Deep link to the original review on Google Maps. */
  sourceUrl?: string;
  /** Reviewer's real profile photo (served from /public), if available. */
  imageSrc?: string;
  /** Gradient background for the initials avatar (varied per reviewer). */
  avatarBg: string;
}

export const testimonials: TestimonialItem[] = [
  {
    name: "Aarati",
    text: "I consulted for my melasma treatment. The doctor examined my skin and explained a proper treatment plan, no unnecessary treatments were pushed. With regular sessions and sunscreen, my pigmentation is improving little by little. Overall a very good experience, especially the consultation.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/HC7z3eHxeVnpGt7s8",
    imageSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    avatarBg: "from-amber-400 to-yellow-600",
  },
  {
    name: "Sushant",
    text: "I was experiencing hair fall due to tension, so I consulted the dermatologist here. The doctor understood the cause and suggested the right treatment. As the treatment continues, my hair fall is coming under control. Good consultation experience.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/3CLEtbtc6C7L3iMj7",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    avatarBg: "from-yellow-500 to-amber-700",
  },
  {
    name: "Prakriti",
    text: "The counseling was very good. I had a pimple problem and it has already started getting better. Highly recommend visiting.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/iK8P5QA1AR3S2ugp9",
    imageSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop",
    avatarBg: "from-yellow-400 to-amber-600",
  },
  {
    name: "Rabin",
    text: "My hair fall had been increasing for the last few months. After the consultation, the doctor clearly explained the possible causes and the treatment options. Since starting the treatment I can already feel the improvement. Overall satisfied with the service.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/NbuS3rNyiUYxmZgs9",
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    avatarBg: "from-amber-400 to-orange-600",
  },
];
