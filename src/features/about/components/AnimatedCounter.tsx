import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";

/* ==========================================================================
   Animated Number Counter Component (counts from 0 to target number)
   ========================================================================== */
interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState<string>("0");

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth exponential ease-out for natural deceleration
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * value;

      if (decimals > 0) {
        setDisplayValue(current.toFixed(decimals));
      } else {
        setDisplayValue(Math.floor(current).toLocaleString());
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        if (decimals > 0) {
          setDisplayValue(value.toFixed(decimals));
        } else {
          setDisplayValue(value.toLocaleString());
        }
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
