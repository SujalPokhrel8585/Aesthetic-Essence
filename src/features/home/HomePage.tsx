import Seo from "@/components/seo/Seo";
import { seoForPath, medicalClinicSchema } from "@/constants/seo";
import { BeforeAfter } from "./components/BeforeAfter";
import DoctorBook from "./components/DoctorBook";
import Hero from "./components/Hero";
import ServicesOverview from "./components/Service";
import SignaturePackage from "./components/SignaturePackage";
import Testimonials from "./components/Testimonials";
import TrustStrip from "./components/TrustStrip";

export default function Home() {
  const seo = seoForPath("/");
  return (
    <>
      <Seo {...seo} jsonLd={[medicalClinicSchema()]} />
      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <DoctorBook />
      <Testimonials />
      <BeforeAfter />
      <SignaturePackage />
    </>
  );
}
