import Seo from "@/components/seo/Seo";
import { seoForPath } from "@/constants/seo";
import GallerySection from "./components/GallerySection";

export default function GalleryPage() {
  return (
    <main id="main" className="w-full min-h-screen bg-background">
      <Seo {...seoForPath("/gallery")} />
      <GallerySection />
    </main>
  );
}

export { GallerySection };
