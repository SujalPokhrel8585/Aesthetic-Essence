import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { getPerfTier } from "@/lib/deviceCapability";
/* ---------------------------------------------------------------
 *    Circle wipe, 300 white circles that grow and drift left,
 *    painting over the black screen. Genuine canvas particle work,
 *    so it stays a canvas effect rather than 300 DOM nodes; just
 *    properly scoped to a hook with setup/cleanup instead of the
 *    source's module-level refs.
 * ------------------------------------------------------------- */
export function CircleWipe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const skipAnimation = reduceMotion || getPerfTier() === "low";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId = 0;
    let timer = 0;
    let circles: { x: number; y: number; size: number }[] = [];

    const initCircles = () => {
      circles = [];
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * (canvas.width * 1.8) + canvas.width * 1.2;
        const y = Math.random() * (canvas.height * 1.2) - canvas.height * 0.2;
        circles.push({ x, y, size: canvas.width / 1000 });
      }
    };

    const step = () => {
      const distanceX = canvas.width / 960;
      const growth = canvas.width / 12000;

      circles.forEach((c) => {
        if (timer < 780) {
          c.x -= distanceX;
          c.size += growth;
        } else if (timer < 6000) {
          c.x -= distanceX * 0.02;
          c.size += growth * 0.2;
        }
      });
    };

    const paint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#e9e2d4"; // dim, warm off-white so the page never reads as stark white
      circles.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const draw = () => {
      timer++;
      step();
      paint();
      if (timer < 6000) {
        frameId = requestAnimationFrame(draw);
      }
    };

    const setup = () => {
      cancelAnimationFrame(frameId);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initCircles();

      if (skipAnimation) {
        // Skip straight to the settled, mostly-covered state.
        timer = 780;
        step();
        paint();
        return;
      }

      timer = 0;
      draw();
    };

    setup();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(frameId);
    };
  }, [skipAnimation]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}