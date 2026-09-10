// Data for the specialist team section on the About page.
// Only verified, real clinic doctors are listed here.

export interface DoctorTeamMember {
  name: string;
  role: string;
  qualifications: string;
  reg: string;
  image?: string;
  /** Public Instagram profile shown on the team card. */
  instagram?: string;
  bio: string;
  specialties: string[];
}

export const DOCTOR_TEAM: DoctorTeamMember[] = [
  {
    name: "Dr. Shraddha Chudal",
    role: "Consultant Dermatologist",
    qualifications: "MBBS, MD (Dermatology)",
    reg: "NMC Registered Specialist",
    instagram: "https://www.instagram.com/dr.shraddhachudal",
    bio: "Dr. Chudal manages general and clinical dermatology — from acne, pigmentation and melasma to hair fall and anti-aging care — building evidence-based treatment plans around each patient's skin type and lifestyle.",
    specialties: [
      "Melasma & Pigmentation",
      "Acne & Scar Care",
      "General Dermatology",
    ],
  },
  {
    name: "Dr. Pramesh Koirala",
    role: "Consultant Dermatologist",
    qualifications: "MBBS, MD (Dermatology)",
    reg: "NMC Registered Specialist",
    instagram: "https://www.instagram.com/drprameshkoirala",
    bio: "Dr. Koirala focuses on medical and aesthetic dermatology — laser hair reduction, PRP & GFC regenerative therapy, scar revision, and minor surgical procedures — with safety and natural results as the priority.",
    specialties: [
      "PRP & GFC Therapy",
      "Laser Procedures",
      "Scar Revision",
    ],
  },
];
