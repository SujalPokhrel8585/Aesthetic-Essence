import { Sparkles } from "lucide-react";
import Seo from "@/components/seo/Seo";
import { seoForPath } from "@/constants/seo";
import { ContactInfo, ContactForm } from "@/features/contact/components";

export default function ContactPage() {
  return (
    <main id="main" className="page-gradient-bg-alt w-full min-h-[92vh] text-foreground overflow-hidden relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <Seo {...seoForPath("/contact")} />
      <div className="ambient-blobs-container">
        <div className="ambient-blob ambient-blob-sky-top" />
        <div className="ambient-blob ambient-blob-blue-top" />
        <div className="ambient-blob ambient-blob-amber-bottom" />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-border text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="size-3.5 text-primary" />
            <span>Support &amp; Community</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-foreground leading-tight mb-4">
            Let&apos;s Start a Conversation
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            Have a question about AestheticEssence, want to book a personalized treatment
            session, or need clinical advice? Our team is here to help you get
            connected.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <ContactInfo />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
