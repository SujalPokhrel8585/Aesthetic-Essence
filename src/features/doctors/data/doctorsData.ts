// Static doctor roster and filter categories for the doctors page.
// Only verified, real clinic doctors are listed here.

import type { Doctor } from "@/types";

export const doctorData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Saroj Karki",
    specialty: "Lead Dermatologist & Hair Transplant Surgeon",
    category: "Hair Restoration",
    imageUrl: "/doctors/dr-saroj-karki.webp",
    bio: "MBBS, MD (Dermatology & Venereology), NMC-registered specialist. Leads surgical hair restoration (FUE), clinical trichology, and medical care for melasma and acne.",
  },
  {
    id: 2,
    name: "Dr. Alsha Shrestha",
    specialty: "Consultant Dermatologist",
    category: "Clinical Dermatology",
    imageUrl: "/doctors/dr-alsha-shrestha.webp",
    bio: "Consultant dermatologist managing general and clinical dermatology, acne, eczema, pigmentation, and preventive skin care with evidence-based treatment plans.",
  },
  {
    id: 3,
    name: "Dr. Bibek Subedi",
    specialty: "Consultant Dermatologist & Hair Transplant Surgeon",
    category: "Hair Restoration",
    imageUrl: "/doctors/dr-bibek-subedi.webp",
    bio: "Consultant dermatologist and hair transplant surgeon focused on hair restoration planning, FUE surgery, and long-term scalp and hair health.",
  },
];

export const categoryData = ["Clinical Dermatology", "Hair Restoration"];
