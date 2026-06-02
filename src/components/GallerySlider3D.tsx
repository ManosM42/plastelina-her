import { useState } from "react";
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

export function GallerySlider3D() {
  const [active, setActive] = useState(0);
  const n = galleryImages.length;

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  return (
    <div className="relative">
      <div
        className="relative h-[420px] md:h-[520px] flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {galleryImages.map((src, i) => {
          let offset = i - active;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const abs = Math.abs(offset);
          if (abs > 2) return null;
          const isCenter = offset === 0;
          return (
            <motion.div
              key={i}
              animate={{
                x: offset * 240,
                rotateY: offset * -22,
                scale: isCenter ? 1 : 0.82,
                zIndex: 10 - abs,
                opacity: abs > 2 ? 0 : 1,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={src}
                alt=""
                className="w-[300px] md:w-[420px] h-[380px] md:h-[480px] object-cover rounded-md shadow-2xl"
                style={{
                  boxShadow: isCenter
                    ? "0 30px 60px -20px rgba(28,26,23,0.45)"
                    : "0 20px 40px -20px rgba(28,26,23,0.3)",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => go(-1)}
          className="h-12 w-12 rounded-full bg-amber text-charcoal flex items-center justify-center transition hover:scale-110 shadow-md"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => go(1)}
          className="h-12 w-12 rounded-full bg-amber text-charcoal flex items-center justify-center transition hover:scale-110 shadow-md"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}