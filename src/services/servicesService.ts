// Thin async data-access wrapper for services and treatment listings.

import { SERVICES } from "@/features/services/data/servicesData";
import type { Service } from "@/types";

export { SERVICES };

export async function getServices(): Promise<Service[]> {
  return SERVICES;
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  return SERVICES.find((service) => service.id === id);
}
