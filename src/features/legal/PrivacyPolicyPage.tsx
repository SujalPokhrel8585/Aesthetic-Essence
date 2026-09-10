import Seo from "@/components/seo/Seo";
import { seoForPath } from "@/constants/seo";
import { CLINIC_INFO } from "@/constants/clinic";

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What we collect",
    body: [
      "When you use the appointment request form on this website, we collect the details you enter: your name, phone/WhatsApp number, optional email, the treatment you are interested in, your preferred doctor, date and time, and any notes you choose to share.",
      "We do not collect or store any health records through this website. Please do not share sensitive medical documents here, bring them to your consultation instead.",
    ],
  },
  {
    title: "How your request is sent",
    body: [
      "This website does not have its own message database. When you submit the appointment or contact form, your details are pre-filled into a WhatsApp message on your own device and sent directly to the clinic's WhatsApp number. The message is handled by our front-desk team the same way a phone call or walk-in inquiry would be.",
      "If you close WhatsApp before pressing Send, your request is not delivered to us and no information is stored.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "Your details are used for one purpose only: to confirm and manage your appointment, contacting you on WhatsApp or by phone about your requested slot, treatment questions, and reminders.",
      "We do not sell, rent, or share your personal information with any third party for marketing purposes.",
    ],
  },
  {
    title: "Cookies & local storage",
    body: [
      "This site stores a single preference on your device (light or dark theme) using your browser's local storage. It contains no personal information and is never sent to us.",
      "The site embeds a Google Maps map and loads fonts from Google Fonts; these services may set their own cookies according to their policies when they load.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask us to delete your WhatsApp inquiries at any time by messaging us. You can clear the theme preference from your browser settings.",
      "If you have any questions about this policy, contact us on WhatsApp or call us.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="page-gradient-bg-alt w-full min-h-[92vh] text-foreground relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <Seo {...seoForPath("/privacy-policy")} />

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Privacy Policy
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
