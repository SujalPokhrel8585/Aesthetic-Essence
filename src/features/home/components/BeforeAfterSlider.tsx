import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  beforeSrc: string;
  afterSrc: string;
  beforeSrcset?: string;
  afterSrcset?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPosition?: number;
}

export const BeforeAfterSlider = React.forwardRef<
  HTMLDivElement,
  BeforeAfterSliderProps
>(
  (
    {
      className,
      beforeSrc,
      afterSrc,
      beforeSrcset,
      afterSrcset,
      beforeLabel = "Before",
      afterLabel = "After",
      beforeAlt = "Before treatment",
      afterAlt = "After treatment",
      initialPosition = 50,
      ...props
    },
    forwardedRef,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState(initialPosition);
    const [isDragging, setIsDragging] = React.useState(false);

    const updatePosition = React.useCallback((clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const percent = ((clientX - rect.left) / rect.width) * 100;
      setPosition(Math.min(100, Math.max(0, percent)));
    }, []);

    const handlePointerDown = (
      e: React.PointerEvent<HTMLDivElement | HTMLButtonElement>,
    ) => {
      // Drag can start anywhere on the slider (container) or on the handle.
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      updatePosition(e.clientX);
    };

    const handlePointerMove = (
      e: React.PointerEvent<HTMLDivElement | HTMLButtonElement>,
    ) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const endDrag = (
      e: React.PointerEvent<HTMLDivElement | HTMLButtonElement>,
    ) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId))
        e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    };

    const handlePointerUp = endDrag;
    const handlePointerCancel = endDrag;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
      if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn(
          "relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-muted select-none touch-none sm:aspect-16/10",
          className,
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        {...props}
      >
        <img
          src={afterSrc}
          srcSet={afterSrcset}
          sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
          alt={afterAlt}
          draggable={false}
          className="absolute inset-0 size-full object-cover object-top"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={beforeSrc}
            srcSet={beforeSrcset}
            sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
            alt={beforeAlt}
            draggable={false}
            className="absolute inset-0 size-full object-cover object-top"
          />
        </div>

        <div
          className="absolute inset-y-0 w-0.5 bg-background"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        />

        <button
          type="button"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-9"
          style={{ left: `${position}%` }}
        >
          <ChevronLeft className="size-3.5" />
          <ChevronRight className="size-3.5" />
        </button>

        <span className="absolute bottom-3 left-3 rounded-full border border-border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="absolute right-3 bottom-3 rounded-full border border-border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>
    );
  },
);
BeforeAfterSlider.displayName = "BeforeAfterSlider";
