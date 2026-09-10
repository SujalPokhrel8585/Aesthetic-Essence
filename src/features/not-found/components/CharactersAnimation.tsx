import { motion, useReducedMotion } from "motion/react";
import { STICK_FIGURES } from "../data/stickFigureData";

/* ---------------------------------------------------------------
 *    Drifting stick figures, same speeds/rotations as the source,
 *    driven by motion instead of manual DOM element creation.
 * ------------------------------------------------------------- */
export function CharactersAnimation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute h-[95%] w-[99%] overflow-hidden">
      {STICK_FIGURES.map((figure, i) => {
        const base = figure.baseRotate ?? 0;

        // Static figure (no speedX): render in place, no motion at all.
        if (!figure.speedX) {
          return (
            <img
              key={i}
              src={figure.src}
              alt=""
              className="absolute h-[18%] w-[18%]"
              style={{ top: figure.top, bottom: figure.bottom, left: "8%" }}
            />
          );
        }

        return (
          <motion.img
            key={i}
            src={figure.src}
            alt=""
            className="absolute h-[18%] w-[18%]"
            style={{ top: figure.top, bottom: figure.bottom }}
            initial={{ left: "100%", rotate: base }}
            animate={{
              left: reduceMotion ? "40%" : "-20%",
              rotate:
                figure.speedRotation && !reduceMotion
                  ? [base, base - 360]
                  : base,
            }}
            transition={{
              left: {
                duration: reduceMotion ? 0 : figure.speedX / 1000,
                ease: "linear",
              },
              rotate: figure.speedRotation
                ? {
                    duration: reduceMotion ? 0 : figure.speedRotation / 1000,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: "linear",
                  }
                : { duration: 0 },
            }}
          />
        );
      })}
    </div>
  );
}
