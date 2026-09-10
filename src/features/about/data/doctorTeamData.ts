// Data for the specialist team section on the About page.
// Only verified, real clinic doctors are listed here.

export interface DoctorTeamMember {
  name: string;
  role: string;
  qualifications: string;
  reg: string;
  image?: string;
  bio: string;
  specialties: string[];
}

export const DOCTOR_TEAM: DoctorTeamMember[] = [
  {
    name: "Dr. Saroj Karki",
    role: "Lead Dermatologist & Hair Transplant Surgeon",
    qualifications: "MBBS, MD (Dermatology & Venereology)",
    reg: "NMC Registered Specialist",
    image: "/doctors/dr-saroj-karki.webp",
    bio: "Dr. Karki leads the clinic's medical practice, focusing on surgical hair restoration (FUE), clinical trichology, and the medical management of conditions like melasma and acne, with a science-first approach to every treatment plan.",
    specialties: [
      "FUE Hair Transplants",
      "Clinical Trichology",
      "Melasma & Acne Care",
    ],
  },
  {
    name: "Dr. Alsha Shrestha",
    role: "Consultant Dermatologist",
    qualifications: "MBBS, MD (Dermatology)",
    reg: "NMC Registered Specialist",
    image: "/doctors/dr-alsha-shrestha.webp",
    bio: "Dr. Shrestha manages general and clinical dermatology, from acne, eczema, and pigmentation to preventive skin care, building evidence-based treatment plans around each patient's skin type and lifestyle.",
    specialties: [
      "Acne & Eczema Care",
      "Pigmentation",
      "General Dermatology",
    ],
  },
  {
    name: "Dr. Bibek Subedi",
    role: "Consultant Dermatologist & Hair Transplant Surgeon",
    qualifications: "MBBS, MD (Dermatology)",
    reg: "NMC Registered Specialist",
    image: "/doctors/dr-bibek-subedi.webp",
    bio: "Dr. Subedi specializes in hair restoration, from initial scalp assessment and graft planning to FUE surgery and long-term follow-up care, helping patients maintain natural, healthy results.",
    specialties: [
      "Hair Transplant Planning",
      "FUE Surgery",
      "Scalp Health",
    ],
  },
];
