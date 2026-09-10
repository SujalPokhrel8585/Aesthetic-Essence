import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { DOCTOR_TEAM } from "@/features/about/data";

const COUNT = DOCTOR_TEAM.length;
const AUTOPLAY_MS = 3000;
const TURN_S = 1.7; // slow, graceful page turn while auto-flipping
const TURN_EASE: [number, number, number, number] = [0.32, 0.08, 0.24, 1];

/* Single autoplay timer, reset on every spread change. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

const initialsOf = (name: string) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

const pageNum = (index: number, side: "left" | "right") =>
  String(index * 2 + (side === "left" ? 1 : 2)).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Book pages                                                          */
/* ------------------------------------------------------------------ */

function PhotoPage({ name, image }: { name: string; image?: string }) {
  if (!image) {
    /* Same treatment as the Doctors page cards for doctors without a
       verified photo: a branded monogram plate instead of a fake photo. */
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary to-[#2e9e97]">
        <span className="text-7xl font-bold tracking-widest text-white/95">
          {initialsOf(name)}
        </span>
        <span className="text-sm font-medium tracking-[0.2em] text-white/80 uppercase">
          {name}
        </span>
      </div>
    );
  }
  return (
    <img
      src={image}
      alt={`Portrait of ${name}`}
      loading="lazy"
        decoding="async"
      className="h-full w-full object-cover object-top"
    />
  );
}

function PageNumber({
  index,
  side,
  onPhoto,
}: {
  index: number;
  side: "left" | "right";
  onPhoto?: boolean;
}) {
  return (
    <span
      className={`pointer-events-none absolute bottom-3.5 text-[10px] tracking-[0.25em] ${
        side === "left" ? "left-5" : "right-5"
      } ${onPhoto ? "text-white/85" : "text-muted-foreground/80"}`}
    >
      {pageNum(index, side)}
    </span>
  );
}

function InfoPage({
  doctor,
  index,
  onInteract,
}: {
  doctor: (typeof DOCTOR_TEAM)[number];
  index: number;
  onInteract: (event: React.MouseEvent) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-card px-7 py-6 sm:px-10 sm:py-8">
      <p className="text-center text-[9px] font-medium tracking-[0.3em] text-muted-foreground/70 uppercase">
        AestheticEssence · Skin &amp; Hair Clinic
      </p>

      <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
        {doctor.role}
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground lg:text-[28px]">
        {doctor.name}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {doctor.qualifications}
      </p>
      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground/90">
        <ShieldCheck className="size-3.5 text-accent-foreground" />
        {doctor.reg}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {doctor.bio}
      </p>

      <p className="mt-5 text-[11px] font-semibold tracking-[0.16em] text-foreground/70 uppercase">
        Areas of Expertise
      </p>
      <ul className="mt-2.5 space-y-2">
        {doctor.specialties.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-sm text-foreground/90"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5" onClick={onInteract}>
        <Link
          to={`/book?doctor=${encodeURIComponent(doctor.name)}`}
          className="book-cta-pulse inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Book Consultation
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <PageNumber index={index} side="right" />
    </div>
  );
}

/* Shading applied to a leaf face while the page is in the air. */
function LeafShade({
  fromSpine,
  opacity,
}: {
  fromSpine: "left" | "right";
  opacity: number[];
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${
        fromSpine === "left"
          ? "bg-gradient-to-r from-black/10 via-black/25 to-black/40"
          : "bg-gradient-to-l from-black/10 via-black/25 to-black/40"
      }`}
      initial={{ opacity: opacity[0] }}
      animate={{ opacity }}
      transition={{ duration: TURN_S, ease: "linear" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

interface TurnState {
  dir: "next" | "prev";
  from: number;
  to: number;
}

export default function DoctorBook() {
  const reducedMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 767px)");

  const [current, setCurrent] = useState(0);
  const [turning, setTurning] = useState<TurnState | null>(null);
  const [paused, setPaused] = useState(false);
  const turningRef = useRef(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    turningRef.current = turning !== null;
  }, [turning]);

  const turn = useCallback(
    (dir: "next" | "prev") => {
      if (turningRef.current) return;
      const to = (current + (dir === "next" ? 1 : -1) + COUNT) % COUNT;
      if (reducedMotion) {
        setCurrent(to);
        return;
      }
      setTurning({ dir, from: current, to });
    },
    [current, reducedMotion],
  );

  /* The completing leaf is the one rendered for this exact turn, so its
     completion handler can read the turn data from the render scope. */
  const completeTurn = (finished: TurnState) => {
    setCurrent(finished.to);
    setTurning((state) => (state === finished ? null : state));
  };

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => {
      if (!turningRef.current) turn("next");
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, turn]);

  /* During a forward turn the next info page already sits under the leaf;
     during a backward turn the next photo page sits under it. */
  const leftDoctor =
    turning && turning.dir === "prev" ? DOCTOR_TEAM[turning.to] : DOCTOR_TEAM[current];
  const rightDoctor =
    turning && turning.dir === "next" ? DOCTOR_TEAM[turning.to] : DOCTOR_TEAM[current];
  const underPhoto = turning ? DOCTOR_TEAM[turning.to] : DOCTOR_TEAM[current];

  const leafOrigin =
    turning?.dir === "next" ? "left center" : "right center";

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      turn("next");
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      turn("prev");
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    turn(delta < 0 ? "next" : "prev");
  };

  const stopPropagation = (event: React.MouseEvent) => event.stopPropagation();

  /* ---------------------------------------------------------------- */

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="bg-soft-badge mb-3 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider text-foreground uppercase shadow-sm">
            Our Specialists
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Meet Our Doctors
          </h2>
        </div>

        {/* Book scene */}
        <div
          className="mt-12 flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:mt-14"
          role="group"
          aria-roledescription="carousel"
          aria-label="Doctor profiles book"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {/* Book with cover mat + stacked page edges */}
          <div
            className="relative w-[min(920px,92vw)] rounded-xl bg-secondary p-2 shadow-[0_35px_70px_-30px_rgba(18,49,45,0.45)] md:p-2.5"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* page thickness */}
            <div className="absolute inset-x-3 -bottom-1.5 h-1.5 rounded-b-md bg-card" aria-hidden />
            <div className="absolute inset-x-5 -bottom-3 h-1.5 rounded-b-md bg-card/80" aria-hidden />

            <div className="relative flex flex-col overflow-hidden rounded-lg bg-card [perspective:2200px] md:h-[560px] md:flex-row">
              {/* LEFT PAGE, doctor portrait (click = turn back) */}
              <div
                onClick={() => turn("prev")}
                className="relative h-[360px] w-full overflow-hidden md:h-full md:w-1/2"
              >
                {isCompact ? (
                  <PhotoPage name={underPhoto.name} image={underPhoto.image} />
                ) : (
                  <PhotoPage name={leftDoctor.name} image={leftDoctor.image} />
                )}
                {!isCompact && (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/15 to-transparent"
                    />
                    <PageNumber
                      index={turning?.dir === "prev" ? turning.to : current}
                      side="left"
                      onPhoto
                    />
                  </>
                )}
              </div>

              {/* RIGHT PAGE, doctor information (click = turn forward) */}
              <div
                onClick={() => turn("next")}
                className="relative w-full flex-1 overflow-hidden md:h-full md:w-1/2"
              >
                {isCompact ? (
                  <motion.div
                    key={current}
                    className="h-full"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.35 }}
                  >
                    <InfoPage
                      doctor={DOCTOR_TEAM[current]}
                      index={current}
                      onInteract={stopPropagation}
                    />
                  </motion.div>
                ) : (
                  <>
                    <InfoPage
                      doctor={rightDoctor}
                      index={turning?.dir === "next" ? turning.to : current}
                      onInteract={stopPropagation}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/15 to-transparent"
                    />
                  </>
                )}
              </div>

              {/* Spine, desktop only; on mobile the pages stack vertically
                  so a center line would cut straight through the content */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-foreground/15 md:block"
              />

              {/* Turning leaf, desktop: full physical page turn */}
              {turning && !isCompact && (
                <motion.div
                  className={`absolute top-0 z-20 h-full w-1/2 shadow-[0_20px_45px_-18px_rgba(18,49,45,0.5)] [transform-style:preserve-3d] ${
                    turning.dir === "next" ? "left-1/2" : "right-1/2"
                  }`}
                  style={{ transformOrigin: leafOrigin }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: turning.dir === "next" ? -180 : 180 }}
                  transition={{ duration: TURN_S, ease: TURN_EASE }}
                  onAnimationComplete={() => turning && completeTurn(turning)}
                >
                  {turning.dir === "next" ? (
                    <>
                      <div className="absolute inset-0 overflow-hidden bg-card [backface-visibility:hidden]">
                        <InfoPage
                          doctor={DOCTOR_TEAM[turning.from]}
                          index={turning.from}
                          onInteract={stopPropagation}
                        />
                        <LeafShade fromSpine="left" opacity={[0, 0.55]} />
                      </div>
                      <div className="absolute inset-0 overflow-hidden bg-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <PhotoPage
                          name={DOCTOR_TEAM[turning.to].name}
                          image={DOCTOR_TEAM[turning.to].image}
                        />
                        <LeafShade fromSpine="right" opacity={[0.55, 0.08]} />
                        <PageNumber index={turning.to} side="left" onPhoto />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 overflow-hidden bg-card [backface-visibility:hidden]">
                        <PhotoPage
                          name={DOCTOR_TEAM[turning.from].name}
                          image={DOCTOR_TEAM[turning.from].image}
                        />
                        <LeafShade fromSpine="right" opacity={[0, 0.55]} />
                        <PageNumber index={turning.from} side="left" onPhoto />
                      </div>
                      <div className="absolute inset-0 overflow-hidden bg-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <InfoPage
                          doctor={DOCTOR_TEAM[turning.to]}
                          index={turning.to}
                          onInteract={stopPropagation}
                        />
                        <LeafShade fromSpine="left" opacity={[0.55, 0.08]} />
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* Turning leaf, mobile: simplified page lift */}
              {turning && isCompact && (
                <motion.div
                  className="absolute top-0 z-20 h-[360px] w-full shadow-[0_20px_45px_-18px_rgba(18,49,45,0.5)]"
                  style={{ transformOrigin: leafOrigin }}
                  initial={{ rotateY: 0, opacity: 1 }}
                  animate={
                    turning.dir === "next"
                      ? { rotateY: -70, x: "-7%", opacity: 0 }
                      : { rotateY: 70, x: "7%", opacity: 0 }
                  }
                  transition={{ duration: 1.1, ease: TURN_EASE }}
                  onAnimationComplete={() => turning && completeTurn(turning)}
                >
                  <PhotoPage
                    name={DOCTOR_TEAM[turning.from].name}
                    image={DOCTOR_TEAM[turning.from].image}
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Manual navigation */}
          <div aria-live="polite">
            <div className="mt-9 flex items-center gap-6">
              <button
                type="button"
                onClick={() => turn("prev")}
                aria-label="Previous doctor profile"
                className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ChevronLeft className="size-5" />
              </button>
              <p className="w-20 text-center text-xs font-medium tracking-[0.3em] text-muted-foreground tabular-nums">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(COUNT).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => turn("next")}
                aria-label="Next doctor profile"
                className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground/80">
              {DOCTOR_TEAM[current].name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
