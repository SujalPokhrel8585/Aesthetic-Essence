import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqsForService } from "../data/faqData";

interface FAQSectionProps {
  serviceId: string;
}

// Renders the FAQ accordion for a single service page. Looks up
// getFaqsForService(serviceId) so every service shows only its own,
// relevant questions rather than a shared generic list. Renders nothing
// if a service has no FAQ entries yet, so the page layout stays intact.
export default function FAQSection({ serviceId }: FAQSectionProps) {
  const faqs = getFaqsForService(serviceId);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20/60 shrink-0">
          <HelpCircle className="size-4.5" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-xs px-6 sm:px-8">
        <Accordion type="single" collapsible defaultValue="faq-0">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>
                <span>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
