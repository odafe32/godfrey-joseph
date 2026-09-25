import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors, fonts } from "@/utils/colors";

/* -------------------------------------------------------------------------- */
/*  Preloader — full-bleed editorial splash. Ink frame, paper content panel,  */
/*  dashed gold side-rail, corner marks, and a huge condensed percentage      */
/*  counter bottom-right. Cycles short brand labels bottom-left while it      */
/*  counts. Frame peels away on completion.                                   */
/* -------------------------------------------------------------------------- */

interface PreloaderProps {
  /** Called once the exit animation has fully finished. */
  onComplete?: () => void;
  /** Called when the exit animation begins (mount page content here). */
  onReveal?: () => void;
  /** Total duration of the count-up, in ms. */
  duration?: number;
  /** Labels cycled bottom-left while loading. */
  labels?: string[];
  /** Array of image URLs to preload before the preloader completes. */
  imagesToPreload?: string[];
}

const DEFAULT_LABELS = [
  "BUILDING RELIABLE SYSTEMS",
  "TURNING IDEAS INTO PRODUCTS",
  "DESIGNING FOR SCALE",
  "ENGINEERING WITH CLARITY",
];

export function Preloader({
  onComplete,
  onReveal,
  duration = 1700,
  labels = DEFAULT_LABELS,
  imagesToPreload = [],
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [labelIndex, setLabelIndex] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    let isDurationComplete = false;
    let areImagesLoaded = imagesToPreload.length === 0;

    const checkComplete = () => {
      if (isDurationComplete && areImagesLoaded) {
        window.setTimeout(() => setDone(true), 350);
      }
    };

    if (imagesToPreload.length > 0) {
      let loadedCount = 0;
      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imagesToPreload.length) {
            areImagesLoaded = true;
            checkComplete();
          }
        };
        img.onerror = () => {
          loadedCount++; // Count errors too so we don't hang
          if (loadedCount === imagesToPreload.length) {
            areImagesLoaded = true;
            checkComplete();
          }
        };
        img.src = src;
      });
    }

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        isDurationComplete = true;
        checkComplete();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, imagesToPreload]);

  useEffect(() => {
    if (done) onReveal?.();
  }, [done, onReveal]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLabelIndex((i) => (i + 1) % labels.length);
    }, 650);
    return () => window.clearInterval(id);
  }, [labels.length]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 } }}
          className="fixed inset-0 z-[9999]"
          style={{ background: colors.ink }}
        >
          {/* Corner marks */}
          <span
            className="absolute top-6 left-6 font-mono text-lg leading-none select-none"
            style={{ color: colors.goldSoft }}
          >
            −
          </span>
          <span
            className="absolute top-6 right-6 font-mono text-lg leading-none select-none"
            style={{ color: colors.goldSoft }}
          >
            +
          </span>
          <span
            className="absolute bottom-6 left-6 font-mono text-lg leading-none select-none"
            style={{ color: colors.goldSoft }}
          >
            +
          </span>
          <span
            className="absolute bottom-6 right-6 font-mono text-lg leading-none select-none"
            style={{ color: colors.goldSoft }}
          >
            +
          </span>

          {/* Dashed left rail */}
          <div className="absolute left-6 top-16 bottom-20 hidden sm:flex flex-col justify-between items-start py-2">
            {Array.from({ length: 11 }).map((_, i) => (
              <span
                key={i}
                className="font-mono text-sm leading-none select-none"
                style={{ color: i === 5 ? colors.gold : colors.sky }}
              >
                {i === 5 ? "***" : "−"}
              </span>
            ))}
          </div>

          {/* Bottom-right chevrons */}
          <motion.span
            className="absolute bottom-16 right-6 font-mono text-lg tracking-tighter leading-none select-none"
            style={{ color: colors.goldSoft }}
            animate={{ x: [0, -6, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            {"<<<<<"}
          </motion.span>

          {/* Paper content panel */}
          <motion.div
            initial={{ clipPath: "inset(0 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
            }}
            className="absolute inset-x-6 sm:inset-x-16 top-16 bottom-20 overflow-hidden"
            style={{ background: colors.paper }}
          >
            {/* Brand mark + name, top-left of panel */}
            <div className="absolute left-6 sm:left-10 top-6 sm:top-10 flex items-center gap-3">
              <img
                src="/logo-mono.png"
                alt="Godfrey Joseph"
                className="h-9 sm:h-11 w-auto object-contain"
              />
              <div className="leading-tight">
                <p
                  className="font-serif text-[15px] sm:text-[17px] tracking-[-0.01em]"
                  style={{ color: colors.ink }}
                >
                  Godfrey Joseph
                </p>
                <p
                  className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em]"
                  style={{ color: colors.gold }}
                >
                  Full-Stack Software Engineer
                </p>
              </div>
            </div>

            {/* Cycling label stack, bottom-left of panel */}
            <div className="absolute left-6 sm:left-10 bottom-10 font-mono text-[11px] sm:text-xs tracking-[0.02em] space-y-1">
              {labels.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="transition-opacity duration-300"
                    style={{
                      opacity: i === labelIndex ? 1 : 0,
                      color: colors.gold,
                    }}
                  >
                    {"<"}
                  </span>
                  <span
                    className="uppercase transition-opacity duration-300"
                    style={{
                      opacity: i === labelIndex ? 1 : 0.35,
                      color: colors.ink,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Giant percentage, bottom-right of panel */}
            <div
              className="absolute bottom-4 right-4 sm:bottom-2 sm:right-6 leading-[0.78] select-none tabular-nums"
              style={{
                fontFamily: fonts.serif,
                fontSize: "clamp(72px, 16vw, 190px)",
                letterSpacing: "-0.02em",
                color: colors.ink,
                fontWeight: 600,
              }}
            >
              {String(progress).padStart(3, "0")}
              <span className="text-[0.5em] align-top" style={{ color: colors.gold }}>
                %
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
