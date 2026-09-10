import Seo from "@/components/seo/Seo";
import { seoForPath } from "@/constants/seo";
import { CLINIC_INFO } from "@/constants/clinic";

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "About this website",
    body: [
      "This website is operated by " + CLINIC_INFO.name + ", " + CLINIC_INFO.address + ", for the purpose of providing information about our treatments and allowing patients to request appointments.",
    ],
  },
  {
    title: "Appointment requests",
    body: [
      "Submitting the appointment form is a request, not a confirmed booking. Your appointment is only confirmed once our team contacts you on WhatsApp or by phone and confirms the date and time.",
      "Please arrive on time for your appointment. If you need to reschedule or cancel, let us know as early as possible so we can offer the slot to another patient.",
    ],
  },
  {
    title: "No medical advice online",
    body: [
      "Content on this website, including treatment descriptions, benefits and FAQs, is general information for orientation only. It is not a diagnosis or a substitute for an in-person consultation with a qualified dermatologist.",
      "Treatment suitability, expected results, number of sessions and final pricing are confirmed by the doctor during your consultation.",
    ],
  },
  {
    title: "Results & pricing",
    body: [
      "Individual results vary depending on skin type, condition and adherence to the treatment plan. Photos shown on this site are representative and do not guarantee identical outcomes.",
      "Prices shown, where present, are starting prices and may change; the final cost is confirmed at the clinic before any treatment begins.",
    ],
  },
  {
    title: "Contact",
    body: [
      `For anything about these terms, message us on WhatsApp (${CLINIC_INFO.socials.whatsapp.replace("https://wa.me/", "+")}) or call ${CLINIC_INFO.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <main id="main" className="page-gradient-bg-alt w-full min-h-[92vh] text-foreground relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <Seo {...seoForPath("/terms")} />

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          {CLINIC_INFO.name}, {CLINIC_INFO.addressShort}
        </p>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section
              key={section.title}
              className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-sm"
            >
              <h2 className="text-lg sm:text-xl font-bold mb-3">
                {section.title}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-10 text-center">
          Last updated: September 2026
        </p>
      </div>
    </main>
  );
}
