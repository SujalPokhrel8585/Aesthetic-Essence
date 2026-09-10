// Shared TypeScript interface definitions for doctors and medical staff.

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  category: string;
  yearsExperience?: number;
  /** Optional, real clinic staff may not have confirmed photos; initials avatar is rendered when absent. */
  imageUrl?: string;
  rating?: number;
  reviews?: number;
  bio: string;
}
