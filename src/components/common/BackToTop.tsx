import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the top section
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50
            size-11
            flex items-center justify-center
            rounded-full
            bg-primary
            border border-primary
            text-primary-foreground
            hover:bg-primary/90
            hover:border-primary
            hover:text-primary-foreground
            hover:shadow-lg
            active:scale-95
            transition-all duration-200
            cursor-pointer
          "
        >
          <ArrowUp className="size-4.5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
