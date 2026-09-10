// Static trust metrics used on the home page's Why Choose Us section.

import { Award, Users, Clock, type LucideIcon } from "lucide-react";

export interface TrustStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export const STATS: TrustStat[] = [
  { icon: Clock, value: "10+ Years", label: "Clinical Experience" },
  { icon: Users, value: "100+", label: "Patients Treated" },
  {
    icon: Award,
    value: "Advanced",
    label: "Dermatology & Hair Transplant Expert",
  },
];
