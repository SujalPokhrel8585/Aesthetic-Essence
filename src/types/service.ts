// Shared TypeScript interface definitions for services and treatments.

import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  navId: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  duration: string;
  /** Starting price hint shown on service pages, e.g. "From NPR 2,500". */
  price?: string;
  icon: LucideIcon;
  badge?: string;
  featured: boolean;
  image: string;
  category: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  valueProp: string;
  icon: LucideIcon;
  badge?: string;
  featured?: boolean;
}

export interface TreatmentGroup {
  id: string;
  label: string;
}
