import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider-2.jpg";
import slider3 from "@/assets/slider-3.jpg";
import slider4 from "@/assets/slider-4.jpg";
import slider5 from "@/assets/slider-5.jpg";

const heroImages = [slider1, slider2, slider3, slider4, slider5];

export function HeroSlider() {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
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
    <section className="relative h-screen w-full overflow-hidden bg-charcoal">
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={heroImages[idx]} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-32 md:pb-40 px-6 text-center text-cream">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight">
              {slides[idx].h}
            </h1>
            <p className="mt-5 text-sm md:text-base tracking-[0.2em] uppercase text-cream/85">
              {slides[idx].s}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 flex gap-2">
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`h-[2px] transition-all duration-700 ${
                i === idx ? "w-12 bg-amber" : "w-6 bg-cream/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}