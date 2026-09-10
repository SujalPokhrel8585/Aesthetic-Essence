import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
} from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Play,
  Star,
  Quote,
  Camera,
  Plus,
} from "lucide-react";
import { GALLERY_ITEMS } from "@/services/galleryService";
import type { GalleryItem } from "@/types";
import { GOOGLE_REVIEWS_URL, testimonials } from "@/features/home/data/testimonialsData";

export type { GalleryItem };

/* ==========================================================================
   Props Interface
   ========================================================================== */

export interface GallerySectionProps {
  title?: string;
  highlightText?: string;
  description?: string;
  badgeText?: string;
  items?: GalleryItem[];
  className?: string;
  enableFilters?: boolean;
  enableLightbox?: boolean;
}

/* ==========================================================================
   Main Component: GallerySection
   ========================================================================== */

export const GallerySection: React.FC<GallerySectionProps> = ({
  title = "Transforming Skin & Hair",
  highlightText = "With Expert Care",
  description = "A curated chronicle of real treatments and visible transformations, crafted by the dermatology specialists at AestheticEssence Skin and Hair Clinic.",
  badgeText = "AestheticEssence Portfolio • 2026",
  items = GALLERY_ITEMS,
  className = "",
  enableFilters = true,
  enableLightbox = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showBottomNav, setShowBottomNav] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(15);
  const extendedSectionRef = useRef<HTMLDivElement>(null);

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  // Filter items based on active tab
  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // First 7 items form the signature Hero U-shape
  const heroItems = items.slice(0, 7);
  // Any items beyond the first 7 flow into subsequent dynamic rows
  const extendedItems = (activeCategory === "All" ? items.slice(7) : filteredItems).slice(0, visibleCount);

  // Scroll Listener: Trigger Floating Bottom Nav ONLY when Second Section reaches top of viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!extendedSectionRef.current) return;
      const rect = extendedSectionRef.current.getBoundingClientRect();
      // Appears when the top of the second section touches or passes the top of the viewport (<= 120px)
      const isSecondSectionActive = rect.top <= 120 && rect.bottom >= 150;
      setShowBottomNav(isSecondSectionActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lightbox Keyboard Navigation
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredItems.findIndex(
          (item) => item.id === selectedItem.id
        );
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setSelectedItem(filteredItems[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredItems.findIndex(
          (item) => item.id === selectedItem.id
        );
        const prevIndex =
          (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedItem(filteredItems[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, filteredItems]);

  const handleCardClick = (item: GalleryItem) => {
    if (enableLightbox) setSelectedItem(item);
  };

  const handleScrollToSecondSection = () => {
    extendedSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    // Smoothly scroll / maintain focus on the second section when selecting category
    extendedSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={`page-gradient-bg-alt w-full relative overflow-hidden text-foreground pb-20 ${className}`}>
      {/* 1. Ambient Background Glow Blobs */}
      <div className="ambient-blobs-container">
        <div className="ambient-blob ambient-blob-gallery-sky" />
        <div className="ambient-blob ambient-blob-gallery-purple" />
        <div className="ambient-blob ambient-blob-gallery-amber" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 md:pt-16">
        {/* ==========================================================================
            COMPONENT 1: HERO HEADER (With Video Rotating Badge & Avatar Social Proof)
            ========================================================================== */}
        <GalleryHeader
          title={title}
          highlightText={highlightText}
          description={description}
          badgeText={badgeText}
          onOpenVideo={() => setShowVideoModal(true)}
        />

        {/* ==========================================================================
            COMPONENT 2: SIGNATURE HERO U-SHAPED 5-COLUMN COMPOSITION (FIRST SECTION)
            ========================================================================== */}
        <div className="w-full">
          {heroItems.length >= 7 && (
            <HeroUComposition
              items={heroItems}
              onCardClick={handleCardClick}
              onViewMoreClick={handleScrollToSecondSection}
            />
          )}
        </div>

        {/* ==========================================================================
            COMPONENT 3: SECOND SECTION (EXTENDED GALLERY ROWS - Linked to Nav)
            ========================================================================== */}
        <div
          ref={extendedSectionRef}
          id="extended-gallery-section"
          className="mt-24 pt-16 border-t border-border scroll-mt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="size-3 text-primary" />
                <span>Exhibition Archive</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                Explore All Clinical & Aesthetic Works
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              Browse our verified portfolio of skin rejuvenation, hair restoration, and transformative medical artistry.
            </p>
          </div>

          {/* Dynamic Masonry Rows for all second section images */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {extendedItems.map((item) => (
              <div key={item.id} className="break-inside-avoid w-full">
                <GalleryCard
                  item={item}
                  heightClass={
                    item.aspectRatio === "tall"
                      ? "h-[460px]"
                      : item.aspectRatio === "square"
                      ? "h-[320px]"
                      : "h-[370px]"
                  }
                  roundedClass="rounded-[2.2rem]"
                  onClick={() => handleCardClick(item)}
                />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < (activeCategory === "All" ? items.length - 7 : filteredItems.length) && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-card hover:bg-primary text-foreground hover:text-primary-foreground border border-border shadow-sm hover:shadow-md transition-all duration-300 font-medium text-sm cursor-pointer"
              >
                <Plus className="size-4" />
                <span>Load More Works</span>
              </button>
            </div>
          )}
        </div>

        {/* ==========================================================================
            COMPONENT 4: EDITORIAL TESTIMONIAL & INDEX FOOTER
            ========================================================================== */}
        <EditorialFooter items={items} onSelectItem={handleCardClick} />
      </div>

      {/* ==========================================================================
          COMPONENT 5: FLOATING BOTTOM GLASS NAVIGATION (Appears when 2nd section touches top)
          ========================================================================== */}
      {enableFilters && (
        <FloatingBottomNav
          show={showBottomNav}
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}

      {/* ==========================================================================
          COMPONENT 6: LIGHTBOX & VIDEO MODALS
          ========================================================================== */}
      <LightboxModal
        selectedItem={selectedItem}
        filteredItems={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelectIndex={(item) => setSelectedItem(item)}
      />

      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </section>
  );
};

/* ==========================================================================
   Subcomponent A: GalleryHeader
   ========================================================================== */

interface GalleryHeaderProps {
  title: string;
  highlightText: string;
  description: string;
  badgeText: string;
  onOpenVideo: () => void;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  title,
  highlightText,
  description,
  badgeText,
  onOpenVideo,
}) => {
  return (
    <div className="relative max-w-5xl mx-auto mb-10 md:mb-16">
      {/* 1. Rotating Video Badge on Left */}
      <div className="hidden lg:flex absolute -left-12 xl:-left-20 top-2 items-center justify-center">
        <div
          onClick={onOpenVideo}
          className="relative size-24 xl:size-28 flex items-center justify-center cursor-pointer group select-none"
        >
          <svg
            viewBox="0 0 100 100"
            className="size-full animate-spin [animation-duration:16s] fill-zinc-700 text-[9.5px] font-mono tracking-[0.22em] uppercase"
          >
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                • Learn about us • through this video •
              </textPath>
            </text>
          </svg>

          <div className="absolute size-10 rounded-full bg-card/90 shadow-md border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Play className="size-4 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* 2. Patient Social Proof Avatar Stack on Right, real Google
          reviewers (photo where available, initials + brand color otherwise) */}
      <div className="hidden lg:flex absolute -right-8 xl:-right-16 top-4 items-center gap-3 bg-card/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border shadow-xs">
        <div className="flex -space-x-2 overflow-hidden">
          {testimonials.map((t) => (
            t.imageSrc ? (
              <img
                key={t.name}
                className="inline-block size-7 rounded-full ring-2 ring-white object-cover"
                src={t.imageSrc}
                alt={`Google reviewer ${t.name}`}
                loading="lazy"
        decoding="async"
              />
            ) : (
              <span
                key={t.name}
                aria-hidden="true"
                className={`inline-flex size-7 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarBg} text-[9px] font-bold text-white ring-2 ring-white`}
              >
                {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
            )
          ))}
        </div>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-foreground transition-colors hover:text-primary"
        >
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span>4.9</span>
          <span className="text-muted-foreground font-normal">on Google</span>
        </a>
      </div>

      {/* 3. Center Main Headline */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-border text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
          <Sparkles className="size-3.5 text-primary" />
          <span>{badgeText}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-foreground leading-[1.08] mb-4">
          {title} <br className="hidden sm:block" />
          <span className="font-serif italic font-normal text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {highlightText}
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

/* ==========================================================================
   Subcomponent B: HeroUComposition (With View More Downward Button)
   ========================================================================== */

interface HeroUCompositionProps {
  items: GalleryItem[];
  onCardClick: (item: GalleryItem) => void;
  onViewMoreClick: () => void;
}

const HeroUComposition: React.FC<HeroUCompositionProps> = ({
  items,
  onCardClick,
  onViewMoreClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-6 items-start">
      {/* Column 1 (Left Wing - Starts High) */}
      <div className="flex flex-col gap-5 xl:gap-6">
        <GalleryCard
          item={items[0]}
          heightClass="h-[340px] xl:h-[370px]"
          roundedClass="rounded-[2.2rem] rounded-tl-[3.5rem]"
          onClick={() => onCardClick(items[0])}
        />
        <GalleryCard
          item={items[1]}
          heightClass="h-[210px] xl:h-[230px]"
          roundedClass="rounded-[2.2rem]"
          onClick={() => onCardClick(items[1])}
        />
      </div>

      {/* Column 2 (Mid-Left - Tall) */}
      <div className="flex flex-col gap-5 xl:gap-6 sm:mt-6 lg:mt-10">
        <GalleryCard
          item={items[2]}
          heightClass="h-[570px] xl:h-[620px]"
          roundedClass="rounded-[2.5rem]"
          onClick={() => onCardClick(items[2])}
        />
      </div>

      {/* Column 3 (Center - Dipped Down with AestheticEssence Mandala Badge & View More Button) */}
      <div className="flex flex-col items-center gap-4 lg:mt-24">
        {/* Decorative AestheticEssence Flower Icon */}
        <div className="size-9 rounded-full bg-cyan-100/90 border border-cyan-200/80 flex items-center justify-center text-cyan-700 shadow-xs animate-bounce [animation-duration:3s]">
          <Sparkles className="size-4 text-cyan-700" />
        </div>

        {/* Center Card */}
        <GalleryCard
          item={items[3]}
          heightClass="h-[310px] xl:h-[340px]"
          roundedClass="rounded-[2.5rem]"
          onClick={() => onCardClick(items[3])}
        />

        {/* View More Downward Button */}
        <button
          onClick={onViewMoreClick}
          className="w-full py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary text-primary-foreground font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 cursor-pointer group"
        >
          <span>View More</span>
          <ArrowDown className="size-4 transform group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Column 4 (Mid-Right - Tall) */}
      <div className="flex flex-col gap-5 xl:gap-6 sm:mt-6 lg:mt-10">
        <GalleryCard
          item={items[4]}
          heightClass="h-[570px] xl:h-[620px]"
          roundedClass="rounded-[2.5rem] rounded-tr-[3.5rem]"
          onClick={() => onCardClick(items[4])}
        />
      </div>

      {/* Column 5 (Right Wing - Starts High) */}
      <div className="flex flex-col gap-5 xl:gap-6">
        <GalleryCard
          item={items[5]}
          heightClass="h-[340px] xl:h-[370px]"
          roundedClass="rounded-[2.2rem] rounded-tr-[3.5rem]"
          onClick={() => onCardClick(items[5])}
        />
        <GalleryCard
          item={items[6]}
          heightClass="h-[210px] xl:h-[230px]"
          roundedClass="rounded-[2.2rem]"
          onClick={() => onCardClick(items[6])}
        />
      </div>
    </div>
  );
};

/* ==========================================================================
   Subcomponent C: GalleryCard (Reusable Image Card)
   ========================================================================== */

interface GalleryCardProps {
  item: GalleryItem;
  heightClass?: string;
  roundedClass?: string;
  onClick: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  heightClass = "h-[360px]",
  roundedClass = "rounded-[2.2rem]",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative w-full ${heightClass} ${roundedClass} overflow-hidden bg-muted shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer`}
    >
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-108"
      />

      {/* Scrim Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category Pill Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 text-[11px] font-medium tracking-wide text-foreground bg-card/90 backdrop-blur-md rounded-full shadow-xs group-hover:bg-card transition-colors">
          {item.category}
        </span>
      </div>

      {/* Expand Icon */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
        <div className="p-2 rounded-full bg-card/90 text-foreground shadow-sm hover:bg-primary hover:text-white transition-colors">
          <Maximize2 className="size-3.5" />
        </div>
      </div>

      {/* Card Details on Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-10 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white font-medium text-base tracking-tight leading-snug">
          {item.title}
        </p>
        {item.subtitle && (
          <p className="text-zinc-200 text-xs line-clamp-1 mt-1 font-light">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   Subcomponent D: EditorialFooter
   ========================================================================== */

interface EditorialFooterProps {
  items: GalleryItem[];
  onSelectItem: (item: GalleryItem) => void;
}

const EditorialFooter: React.FC<EditorialFooterProps> = ({
  items,
  onSelectItem,
}) => {
  return (
    <div
      id="full-explore-grid"
      className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-foreground"
    >
      <div className="flex items-start gap-4 max-w-lg">
        <Quote className="size-8 text-muted-foreground/80 shrink-0 mt-1" />
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed font-normal">
            “Highly responsive. Very good doctor and staff. They respond very
            well, patiently explain skincare, and it&apos;s affordable too.”
          </p>
          <a
            href="https://maps.app.goo.gl/KaF23qQH6VQW4Jj3A"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 font-serif italic text-lg text-cyan-700 font-semibold tracking-wide underline-offset-2 hover:underline dark:text-teal-300"
          >
            anayaskincare1992 &bull; Verified Client
            <ArrowUpRight className="size-4 shrink-0" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:w-auto gap-8 sm:gap-14">
        <div>
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            01 / Lifestyle & Aesthetics
          </span>
          <h3 className="font-bold text-base sm:text-lg text-foreground mt-1">
            Set Up Your Aesthetic Care With AestheticEssence
          </h3>
        </div>

        <button
          onClick={() => {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            onSelectItem(randomItem);
          }}
          className="size-12 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground flex items-center justify-center shrink-0 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
          aria-label="Next story"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   Subcomponent E: FloatingBottomNav (Linked to Second Section)
   ========================================================================== */

interface FloatingBottomNavProps {
  show: boolean;
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({
  show,
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="fixed bottom-6 inset-x-0 mx-auto w-fit max-w-[92vw] z-40 pointer-events-auto"
        >
          <div className="flex items-center gap-1.5 p-2 bg-card/75 backdrop-blur-xl border border-white/70 shadow-2xl shadow-black/15 rounded-full ring-1 ring-black/5 overflow-x-auto no-scrollbar">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-black/20 scale-102"
                      : "text-foreground hover:text-foreground hover:bg-card/70"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ==========================================================================
   Subcomponent F: LightboxModal
   ========================================================================== */

interface LightboxModalProps {
  selectedItem: GalleryItem | null;
  filteredItems: GalleryItem[];
  onClose: () => void;
  onSelectIndex: (item: GalleryItem) => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({
  selectedItem,
  filteredItems,
  onClose,
  onSelectIndex,
}) => {
  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative max-w-5xl w-full bg-card rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-border max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            <div className="relative flex-1 bg-zinc-950 flex items-center justify-center min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden group">
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="w-full h-full object-contain max-h-[72vh]"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredItems.findIndex(
                    (item) => item.id === selectedItem.id
                  );
                  const prevIndex =
                    (currentIndex - 1 + filteredItems.length) %
                    filteredItems.length;
                  onSelectIndex(filteredItems[prevIndex]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-foreground backdrop-blur-md transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5 text-white hover:text-foreground" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredItems.findIndex(
                    (item) => item.id === selectedItem.id
                  );
                  const nextIndex =
                    (currentIndex + 1) % filteredItems.length;
                  onSelectIndex(filteredItems[nextIndex]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-foreground backdrop-blur-md transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="size-5 text-white hover:text-foreground" />
              </button>
            </div>

            <div className="w-full lg:w-88 p-6 sm:p-8 flex flex-col justify-between bg-card">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                    {selectedItem.category}
                  </span>
                  {selectedItem.year && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {selectedItem.year}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {selectedItem.title}
                </h3>

                {selectedItem.subtitle && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {selectedItem.subtitle}
                  </p>
                )}

                <div className="space-y-2.5 pt-4 border-t border-border text-xs text-muted-foreground">
                  <div className="flex justify-between py-1">
                    <span>Category</span>
                    <span className="font-medium text-foreground">
                      {selectedItem.category}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Standard</span>
                    <span className="font-medium text-foreground">
                      Clinical Verified
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Center</span>
                    <span className="font-medium text-foreground">
                      AestheticEssence Clinic KTM
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <Camera className="size-3.5 text-primary" />
                  <span>
                    {filteredItems.findIndex((i) => i.id === selectedItem.id) +
                      1}{" "}
                    / {filteredItems.length}
                  </span>
                </div>

                <a
                  href={selectedItem.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/75 transition-colors"
                >
                  <span>Full Resolution</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ==========================================================================
   Subcomponent G: VideoModal
   ========================================================================== */

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            className="relative max-w-3xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-foreground transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="aspect-video w-full flex items-center justify-center bg-zinc-900 text-white p-8 text-center">
              <div>
                <div className="size-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Play className="size-6 fill-white ml-0.5" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  AestheticEssence Clinic Cinematic Story
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Experience our state-of-the-art facility in Samakhushi, Kathmandu
                  and our team of specialist dermatologists.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GallerySection;
