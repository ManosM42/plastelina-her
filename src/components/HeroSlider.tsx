import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider-2.jpg";
import slider3 from "@/assets/slider-3.jpg";
import slider4 from "@/assets/slider-4.jpg";
import slider5 from "@/assets/slider-5.jpg";

const heroImages = [slider1, slider2, slider3, slider4, slider5];

// ✅ Preload all hero images so first slide never flashes blank
heroImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function HeroSlider() {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  // ✅ Fixed typo: "hero.slide5  .sub" → "hero.slide5.sub"
  const slides = [
    { h: t("hero.slide1.heading"), s: t("hero.slide1.sub") },
    { h: t("hero.slide2.heading"), s: t("hero.slide2.sub") },
    { h: t("hero.slide3.heading"), s: t("hero.slide3.sub") },
    { h: t("hero.slide4.heading"), s: t("hero.slide4.sub") },
    { h: t("hero.slide5.heading"), s: t("hero.slide5.sub") },
  ];

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-charcoal"
      // ✅ 100dvh accounts for mobile browser address bar
      style={{ height: "100dvh" }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // ✅ Shorter transition on mobile — feels snappier, less GPU work
          transition={{ duration: isMobile ? 0.8 : 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ willChange: "opacity" }} // ✅ only composite opacity, not transform
        >
          <img
            src={heroImages[idx]}
            alt=""
            className="h-full w-full object-cover"
            // ✅ first image eager, rest lazy
            loading={idx === 0 ? "eager" : "lazy"}
            // ✅ hint browser to decode off main thread
            decoding="async"
            // ✅ tells browser this is a large above-fold image
            fetchPriority={idx === 0 ? "high" : "auto"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        </motion.div>
      </AnimatePresence>

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24 md:pb-40 px-5 md:px-6 text-center text-cream">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: isMobile ? 14 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? -6 : -10 }}
            transition={{ duration: isMobile ? 0.5 : 0.9, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* ✅ Smaller base size so long text doesn't overflow on mobile */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight">
              {slides[idx].h}
            </h1>
            <p className="mt-4 text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase text-cream/85">
              {slides[idx].s}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-8 md:bottom-10 flex gap-2 items-center">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              // ✅ Tappable dots instead of dead spans
              className={`h-[2px] transition-all duration-700 ${
                i === idx ? "w-10 bg-amber" : "w-5 bg-cream/40"
              }`}
              style={{ minWidth: "20px", minHeight: "20px", padding: 0, background: "none" }}
            >
              <span
                className={`block h-[2px] transition-all duration-700 ${
                  i === idx ? "w-10 bg-amber" : "w-5 bg-cream/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}