// Real patient reviews scraped from the clinic's Google Maps listing.
// Each entry links back to the original Google review so visitors can verify
// it, never show an aggregate review count here, only the 4.9 rating.

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
    name: "Anisha",
    text: "I consulted AestheticEssence for my melasma treatment. The doctor examined my skin and explained a proper treatment plan, no unnecessary treatments were pushed. With regular sessions and sunscreen, my pigmentation is improving little by little. Overall a very good experience, especially the consultation.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/tsKku2SxFHZ2TtmLA",
    imageSrc: "/reviews/anisha.webp",
    avatarBg: "from-purple-400 to-fuchsia-600",
  },
  {
    name: "Shristi Balami",
    text: "I was experiencing hair fall due to tension, so I consulted the dermatologist here. The doctor understood the cause and suggested the right treatment. As the treatment continues, my hair fall is coming under control. Good consultation experience.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/7NX4oRqfdJS5ihHX8",
    avatarBg: "from-emerald-500 to-teal-600",
  },
  {
    name: "Sabina Karki",
    text: "The counseling was very good. I had a pimple problem and it has already started getting better. Highly recommend visiting.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/hBthRxQH76VkZZff8",
    avatarBg: "from-rose-400 to-pink-600",
  },
  {
    name: "Reyan Tamang",
    text: "My hair fall had been increasing for the last few months. After the consultation, the doctor clearly explained the possible causes and the treatment options. Since starting the treatment I can already feel the improvement. Overall satisfied with the service.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/ExDsB6ZKrLacC12W8",
    avatarBg: "from-amber-400 to-orange-600",
  },
];
