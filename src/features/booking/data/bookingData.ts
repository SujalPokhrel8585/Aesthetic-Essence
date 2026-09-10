// Static booking form defaults and WhatsApp configuration for appointment requests.

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDoctor: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export const WHATSAPP_NUMBER = "9779767648659";

export const BOOKING_SERVICE_OPTIONS = [
  "Hair Treatment",
  "Facial / Skin Care",
  "Anti-Aging Treatment",
  "Consultation",
  "Other",
] as const;

export const BOOKING_DOCTOR_OPTIONS = [
  "Any available doctor",
  "Dr. Shraddha Chudal",
  "Dr. Pramesh Koirala",
] as const;

export const INITIAL_FORM: BookingFormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  preferredDoctor: "Any available doctor",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};
