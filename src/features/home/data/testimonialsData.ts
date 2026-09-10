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
    name: "Roshani Rakse",
    text: "I recently had treatment here and it was a great experience. The staff was very welcoming, attentive, and made sure I was comfortable throughout my visit. They were polite, well-organized, and explained each step of the process clearly. The dermatologist was professional, kind, and took the time to answer all my questions. My skin has already started to show improvement. Highly recommend this clinic for both the treatment quality and the excellent service!",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/3nBAmTJJjJy9y2eE6",
    imageSrc: "/public/roshani.webp",
    avatarBg: "from-amber-400 to-yellow-600",
  },
  {
    name: "Arjun Patel",
    text: "I have been doing this skin scar removal treatment for about 4 months now, and honestly it is going really well. I can clearly see improvement in my skin, and the scars have started fading. The process has been comfortable too. I’m really happy with the results so far and glad I went for it",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/6A9qhzAJAervZaqr7",
    imageSrc: "/public/arjun-patel.webp",
    avatarBg: "from-yellow-500 to-amber-700",
  },
  {
    name: "Purnima KC",
    text: "One of the Best skin clinic I have visited.The staffs are knowledgeable, and the equipment is top-notch👌🥰Highly recommend  for anyone looking for high-quality skincare.",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/YV93VYLTC8No1nAy7",
    imageSrc: "/public/purnima.webp",
    avatarBg: "from-yellow-400 to-amber-600",
  },
  {
    name: "Manisha",
    text: "The staff are very professional and accommodating, and the clinic is very clean and aesthetically beautiful inside. Dr Shraddha is very knowledgable and I felt very comfortable with her as she explains everything very throughly. Highly recommend!",
    rating: 5,
    sourceUrl: "https://maps.app.goo.gl/Kg4RqNtTev3mGvNJ8",
    imageSrc: "manisha.webp",
    avatarBg: "from-amber-400 to-orange-600",
  },
];
