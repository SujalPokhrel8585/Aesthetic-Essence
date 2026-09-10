// Data for the "Numbers that Reflect Our Commitment" stats section on the About page.

import { Clock, Sparkles, Star, Users, type LucideIcon } from "lucide-react";

import { CLINIC_INFO } from "@/constants/clinic";

export interface AboutStat {
  icon: LucideIcon;
  numericValue: number;
  suffix: string;
  decimals: number;
  unit: string;
  label: string;
  description: string;
  /** When set, the whole stat card links out (e.g. the Google rating). */
  href?: string;
}

export const STATS: AboutStat[] = [
  {
    icon: Clock,
    numericValue: 10,
    suffix: "+",
    decimals: 0,
    unit: "Years",
    label: "Years of Clinical Services",
    description: "Dedicated to dermatology in Samakhushi",
    href: "/doctors",
  },
  {
    icon: Users,
    numericValue: 100,
    suffix: "+",
    decimals: 0,
    unit: "Patients",
    label: "Patients Treated",
    description: "Personalized care & visible results",
    href: "/#testimonials",
  },
  {
    icon: Sparkles,
    numericValue: 10,
    suffix: "+",
    decimals: 0,
    unit: "Services",
    label: "Services Available",
    description: "Advanced skin, hair & aesthetic treatments",
    href: "/services",
  },
  {
    icon: Star,
    numericValue: 4.9,
    suffix: "",
    decimals: 1,
    unit: "Stars",
    label: "Google Reviews",
    description: "Rated by verified patients on Google",
    href: CLINIC_INFO.socials.maps,
  },
];
