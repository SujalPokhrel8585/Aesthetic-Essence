import Seo from "@/components/seo/Seo";
import {
  CharactersAnimation,
  CircleWipe,
  MessageDisplay,
} from "./components/index";

export default function NotFoundPage() {
  return (
    <main
      id="main"
      className="relative flex h-screen w-full items-center justify-center overflow-x-hidden bg-black"
    >
      <Seo
        title="Page Not Found | AestheticEssence Skin & Hair Clinic"
        description="The page you are looking for could not be found. Visit AestheticEssence Skin & Hair Clinic in Samakhushi, Kathmandu."
        path="/404"
      />
      <MessageDisplay />
      <CharactersAnimation />
      <CircleWipe />
    </main>
  );
}
