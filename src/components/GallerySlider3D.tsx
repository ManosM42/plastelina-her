import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider-2.jpg";
import slider3 from "@/assets/slider-3.jpg";
import slider4 from "@/assets/slider-4.jpg";
import slider5 from "@/assets/slider-5.jpg";
import slider6 from "@/assets/slider-6.jpg";
import slider7 from "@/assets/slider-7.jpg";
import slider8 from "@/assets/slider-8.jpg";
import slider9 from "@/assets/slider-9.jpg";
import slider10 from "@/assets/slider-10.jpg";

const galleryImages = [
  slider1, slider2, slider3, slider4, slider5,
  slider6, slider7, slider8, slider9, slider10,
];

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function GallerySlider3D() {
  const [active, setActive] = useState(0);
  const n = galleryImages.length;

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  // ✅ Touch swipe support
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div className="relative">
      <div
        className="relative flex items-center justify-center overflow-hidden"
        // ✅ shorter on mobile so side cards don't clip weirdly
        style={{
          height: isMobile ? "300px" : "520px",
          perspective: isMobile ? "800px" : "1400px",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {galleryImages.map((src, i) => {
          let offset = i - active;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const abs = Math.abs(offset);

          // ✅ On mobile only show center + 1 side each — 3D effect on small screens is messy
          if (isMobile && abs > 1) return null;
          if (!isMobile && abs > 2) return null;

          const isCenter = offset === 0;

          return (
            <motion.div
              key={i}
              animate={{
                // ✅ Tighter spacing on mobile
                x: isMobile ? offset * 140 : offset * 240,
                rotateY: isMobile ? offset * -12 : offset * -22,
                scale: isCenter ? 1 : isMobile ? 0.88 : 0.82,
                zIndex: 10 - abs,
                opacity: abs > (isMobile ? 1 : 2) ? 0 : 1,
              }}
              transition={{
                duration: isMobile ? 0.45 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              // ✅ Tap side cards to navigate directly
              onClick={() => {
                if (!isCenter) go(offset > 0 ? 1 : -1);
              }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="object-cover rounded-md shadow-2xl"
                style={{
                  // ✅ Smaller images on mobile
                  width: isMobile ? "220px" : "420px",
                  height: isMobile ? "270px" : "480px",
                  boxShadow: isCenter
                    ? "0 30px 60px -20px rgba(28,26,23,0.45)"
                    : "0 20px 40px -20px rgba(28,26,23,0.3)",
                  // ✅ Dim side cards so center is clearly the focus
                  filter: isCenter ? "none" : "brightness(0.65)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
        <button
          onClick={() => go(-1)}
          // ✅ Larger tap target on mobile
          className="h-12 w-12 md:h-12 md:w-12 rounded-full bg-amber text-charcoal flex items-center justify-center shadow-md active:scale-95 transition-transform"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>

        {/* ✅ Dot indicators so user knows position */}
        <div className="flex gap-1.5 items-center">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-4 h-1.5 bg-amber"
                  : "w-1.5 h-1.5 bg-cream/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          className="h-12 w-12 md:h-12 md:w-12 rounded-full bg-amber text-charcoal flex items-center justify-center shadow-md active:scale-95 transition-transform"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}