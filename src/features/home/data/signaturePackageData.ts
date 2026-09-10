// Five-month signature rejuvenation package timeline and benefits.

import {
  Stethoscope,
  Droplets,
  Zap,
  Leaf,
  Star,
  type LucideIcon,
} from "lucide-react";

export interface TimelineStep {
  month: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SIGNATURE_PACKAGE_STEPS: TimelineStep[] = [
  {
    month: 1,
    title: "Assessment & Prep",
    description:
      "In-depth consultation, skin analysis, and preparatory treatments.",
    icon: Stethoscope,
  },
  {
    month: 2,
    title: "Deep Cleansing & Foundation",
    description:
      "HydraFacial and initial resurfacing to build a healthy skin barrier.",
    icon: Droplets,
  },
  {
    month: 3,
    title: "Targeted Correction",
    description:
      "Laser therapy or specific acne/melasma protocols for core concerns.",
    icon: Zap,
  },
  {
    month: 4,
    title: "Rejuvenation & Healing",
    description:
      "Collagen-stimulating treatments and deep hydration therapies.",
    icon: Leaf,
  },
  {
    month: 5,
    title: "Final Polish & Maintenance",
    description:
      "Final touch-ups, glowing finish, and your long-term skincare roadmap.",
    icon: Star,
  },
];

export const SIGNATURE_PACKAGE_BENEFITS: string[] = [
  "Comprehensive digital skin analysis",
  "Fully customized 5-month treatment roadmap",
  "Priority scheduling & VIP clinic access",
  "Complimentary premium home-care skincare kit",
  "Save up to 20% compared to booking individual sessions",
];
