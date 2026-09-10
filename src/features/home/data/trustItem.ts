import { ShieldCheck, RefreshCcw, Stethoscope, BadgeCheck } from "lucide-react";

export const TRUST_ITEMS = [
  {
    icon: Stethoscope,
    title: "Dermatologist-supervised",
    description: "Every procedure is led by NMC-registered skin specialists",
  },
  {
    icon: RefreshCcw,
    title: "Single-use consumables",
    description: "Needles, cartridges and tips opened fresh for each patient",
  },
  {
    icon: ShieldCheck,
    title: "Sterilized equipment",
    description: "Hospital-grade sterilization protocols for all devices",
  },
  {
    icon: BadgeCheck,
    title: "FDA-approved technology",
    description: "Medical-grade lasers and products you can trust",
  },
] as const;
