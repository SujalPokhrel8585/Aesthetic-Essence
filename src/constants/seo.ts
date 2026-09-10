// Per-route SEO metadata. The <Seo /> component applies these to the document
// head (title, description, canonical, Open Graph) on every navigation.

import { CLINIC_INFO } from "@/constants/clinic";
import {
  CLINIC_OPEN_HOUR,
  CLINIC_CLOSE_HOUR,
} from "@/lib/clinicStatus";
import { doctorData } from "@/features/doctors/data/doctorsData";
import type { Service } from "@/types";

export interface SeoMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const BRAND = CLINIC_INFO.name;
const LOCATION = "Samakhushi, Kathmandu";

export const STATIC_SEO: Record<string, SeoMeta> = {
  "/": {
    title: `${BRAND} | Dermatologist & Skin Clinic in ${LOCATION}`,
    description:
      "Advanced skin & hair clinic in Samakhushi, Kathmandu. HydraFacial, acne & scar treatment, laser hair removal, Botox, melasma care and hair transplant by NMC-registered dermatologists. Book on WhatsApp.",
    path: "/",
    ogImage: "/clinic/front-desk.webp",
  },
  "/services": {
    title: `Skin & Hair Treatments in Kathmandu | ${BRAND}`,
    description:
      "Medical-grade dermatology treatments in Samakhushi, Kathmandu, HydraFacial from NPR 2,500, acne & scar care, laser hair removal, Botox & fillers, melasma treatment and FUE hair transplant.",
    path: "/services",
  },
  "/doctors": {
    title: `Our Dermatologists | ${BRAND}`,
    description:
      "Meet our NMC-registered dermatologists in Samakhushi, Kathmandu, Dr. Saroj Karki (MD Dermatology & hair transplant surgeon), Dr. Alsha Shrestha and Dr. Bibek Subedi.",
    path: "/doctors",
  },
  "/about": {
    title: `About ${BRAND} | Skin & Hair Clinic in ${LOCATION}`,
    description:
      "Learn about AestheticEssence Skin & Hair Clinic, a dermatologist-led skin and hair clinic in Samakhushi, Kathmandu offering safe, evidence-based treatments with sterilized, single-use consumables.",
    path: "/about",
  },
  "/gallery": {
    title: `Clinic Gallery | ${BRAND}`,
    description:
      "Inside AestheticEssence Skin & Hair Clinic, Samakhushi, real photos of our dermatology treatments, laser care, HydraFacial sessions and hair restoration procedures.",
    path: "/gallery",
  },
  "/contact": {
    title: `Contact & Location | ${BRAND}`,
    description:
      "Visit us at Siddhartha Bank Building, 2nd Floor, Samakhushi, Kathmandu. Call +977 9765974518 or message us on WhatsApp, we typically respond within 24 hours.",
    path: "/contact",
  },
  "/book": {
    title: `Book an Appointment | ${BRAND}`,
    description:
      "Book a dermatology appointment in Samakhushi, Kathmandu. Choose your treatment, doctor, date and time, we confirm your slot on WhatsApp within a few hours.",
    path: "/book",
  },
  "/privacy-policy": {
    title: `Privacy Policy | ${BRAND}`,
    description:
      "How AestheticEssence Skin & Hair Clinic handles the personal information you share through our website and WhatsApp appointment requests.",
    path: "/privacy-policy",
  },
  "/terms": {
    title: `Terms of Service | ${BRAND}`,
    description:
      "Terms of use for the AestheticEssence Skin & Hair Clinic website and the appointment request service it provides.",
    path: "/terms",
  },
};

export function seoForPath(path: string): SeoMeta {
  return STATIC_SEO[path] ?? STATIC_SEO["/"];
}

export function serviceSeo(service: Service): SeoMeta {
  return {
    title: `${service.title} in Kathmandu | ${BRAND}`,
    description: `${service.tagline}. ${service.description} Performed by NMC-registered dermatologists at ${BRAND}, ${LOCATION}. Book on WhatsApp.`,
    path: `/services/${service.id}`,
    ogImage: service.image.startsWith("http") ? undefined : service.image,
  };
}

// ── JSON-LD schema builders ──

export function medicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: CLINIC_INFO.name,
    url: CLINIC_INFO.siteUrl,
    image: `${CLINIC_INFO.siteUrl}/logo.png`,
    telephone: `+977${CLINIC_INFO.phoneRaw}`,
    priceRange: "NPR 2,500+",
    medicalSpecialty: "Dermatology",
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC_INFO.addressStreet,
      addressLocality: CLINIC_INFO.addressLocality,
      addressRegion: "Bagmati",
      addressCountry: CLINIC_INFO.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC_INFO.geo.lat,
      longitude: CLINIC_INFO.geo.lng,
    },
    hasMap: CLINIC_INFO.socials.maps,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: `${String(CLINIC_OPEN_HOUR).padStart(2, "0")}:00`,
      closes: `${String(CLINIC_CLOSE_HOUR).padStart(2, "0")}:00`,
    },
    sameAs: [
      CLINIC_INFO.socials.facebook,
      CLINIC_INFO.socials.instagram,
      CLINIC_INFO.socials.tiktok,
    ],
  };
}

export function physiciansSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": doctorData.map((doctor) => ({
      "@type": "Physician",
      name: doctor.name,
      jobTitle: doctor.specialty,
      description: doctor.bio,
      image: `${CLINIC_INFO.siteUrl}${doctor.imageUrl}`,
      url: `${CLINIC_INFO.siteUrl}/doctors`,
      medicalSpecialty: "Dermatology",
      worksFor: {
        "@type": "MedicalClinic",
        name: CLINIC_INFO.name,
        telephone: `+977${CLINIC_INFO.phoneRaw}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: CLINIC_INFO.addressStreet,
          addressLocality: CLINIC_INFO.addressLocality,
          addressCountry: CLINIC_INFO.addressCountry,
        },
      },
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.description,
    procedureType: "https://schema.org/TherapeuticProcedure",
    bodyLocation: service.category === "Hair Restoration" ? "Scalp" : "Skin",
    howPerformed: `In-clinic treatment at ${CLINIC_INFO.name}, ${CLINIC_INFO.address}. Typical session: ${service.duration}.`,
    provider: {
      "@type": "MedicalClinic",
      name: CLINIC_INFO.name,
      telephone: `+977${CLINIC_INFO.phoneRaw}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: CLINIC_INFO.addressStreet,
        addressLocality: CLINIC_INFO.addressLocality,
        addressCountry: CLINIC_INFO.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CLINIC_INFO.geo.lat,
        longitude: CLINIC_INFO.geo.lng,
      },
    },
  };
}
