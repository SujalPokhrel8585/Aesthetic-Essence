// Thin async data-access wrapper for doctor roster and categories.

import { doctorData, categoryData } from "@/features/doctors/data/doctorsData";
import type { Doctor } from "@/types";

export async function getDoctors(): Promise<Doctor[]> {
  return doctorData;
}

export async function getDoctorCategories(): Promise<string[]> {
  return categoryData;
}
