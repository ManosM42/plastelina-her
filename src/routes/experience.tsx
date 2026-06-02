import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

// ── slider assets ──────────────────────────────────────────────
import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider-2.jpg";
import slider3 from "@/assets/slider-3.jpg";
import slider4 from "@/assets/slider-4.jpg";
import slider5 from "@/assets/slider-5.jpg";
import slider6 from "@/assets/slider-6.jpg";
import slider7 from "@/assets/slider-7.jpg";
import slider8 from "@/assets/slider-8.jpg";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience · Plastelina" },
      { name: "description", content: "More than a café — a feeling. The story, the space and the atmosphere of Plastelina in Heraklion." },
      { property: "og:title", content: "Experience · Plastelina" },
      { property: "og:description", content: "13 years of crafted moments in the heart of Heraklion." },
    ],
  }),
  component: ExperiencePage,
});

/* ─── Reusable parallax section (same pattern as index.tsx) ── */
function ParallaxSection({
  img,
  children,
  className = "",
  overlayOpacity = 0.55,
  speed = 0.18,
}: {
  img: string;
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, backgroundImage: `url(${img})` }}
        className="absolute inset-[-15%] bg-cover bg-center will-change-transform"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg,
            rgba(10,8,5,${overlayOpacity + 0.1}) 0%,
            rgba(20,14,8,${overlayOpacity}) 60%,
            rgba(10,8,5,${overlayOpacity + 0.15}) 100%)`,
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function GoldDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="mx-auto mb-12 h-px w-20 origin-left"
      style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
    />
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
function ExperiencePage() {
  const { t } = useTranslation();

  return (
    <main>

      {/* ── 1. HERO — slider-1 ───────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: "easeOut" }}
          style={{ backgroundImage: `url(${slider1})` }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
        <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                letterSpacing: "0.25em",
                fontSize: "0.8rem",
                color: "#c9a96e",
              }}
              className="mb-4 uppercase"
            >
              Heraklion, Crete · Since 2011
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="font-serif text-5xl md:text-7xl text-white max-w-4xl leading-tight"
            >
              {t("experience.heroTitle")}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT — slider-2 bg + slider-2 photo ─────────── */}
      <ParallaxSection img={slider2} overlayOpacity={0.62} className="py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <h2
              className="font-serif text-4xl md:text-5xl text-white leading-snug"
            >
              {t("experience.aboutTitle")}
            </h2>
            <div className="h-px w-16 my-6" style={{ background: "linear-gradient(90deg, #c9a96e, transparent)" }} />
            <p className="text-[17px] leading-[1.9] text-white/75">{t("experience.aboutText")}</p>
          </motion.div>
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2)" }}
          >
            <motion.img
              src={slider2}
              alt=""
              className="w-full h-[480px] object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ── 3. PHOTO GRID — slider-3 bg ──────────────────────── */}
      <ParallaxSection img={slider3} overlayOpacity={0.58} speed={0.14} className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center font-serif text-4xl text-white mb-4"
          >
            {t("gallery.title")}
          </motion.h2>
          <GoldDivider />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[slider1, slider2, slider3, slider4, slider5, slider6].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
                className="overflow-hidden rounded-2xl group"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  {/* gold shimmer border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(201,169,110,0.5)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ── 4. ATMOSPHERE STATS — slider-4 bg ───────────────── */}
      <ParallaxSection img={slider4} overlayOpacity={0.68} speed={0.12} className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="font-serif text-4xl md:text-5xl text-white"
          >
            {t("experience.atmosphereTitle")}
          </motion.h2>
          <GoldDivider />

          <div className="grid md:grid-cols-3 gap-12 mt-4">
            {["stat1", "stat2", "stat3"].map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.15 }}
                className="group"
              >
                <div
                  className="font-serif text-6xl mb-3"
                  style={{
                    background: "linear-gradient(135deg, #e8c87a 0%, #c9a96e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t(`experience.${k}.value`)}
                </div>
                <div className="text-sm tracking-[0.2em] uppercase text-white/60">
                  {t(`experience.${k}.label`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ── 5. FULL-BLEED CINEMATIC — slider-5 ──────────────── */}
      <ParallaxSection img={slider5} overlayOpacity={0.45} speed={0.2} className="py-40 md:py-52">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-serif text-3xl md:text-4xl text-white/90 leading-relaxed italic"
          >
            "A place where every cup tells a story and every evening turns into a memory."
          </motion.blockquote>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto mt-8 h-px w-16 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
          />
        </div>
      </ParallaxSection>

      {/* ── 6. EXTRA FEATURE — slider-6 bg + slider-6 photo ─── */}
      <ParallaxSection img={slider6} overlayOpacity={0.60} speed={0.15} className="py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="order-2 md:order-1 overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2)" }}
          >
            <motion.img
              src={slider6}
              alt=""
              className="w-full h-[420px] object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7 }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="order-1 md:order-2"
          >
            <h2 className="font-serif text-4xl text-white leading-snug mb-6">
              {t("experience.aboutTitle")}
            </h2>
            <div className="h-px w-12 mb-6" style={{ background: "linear-gradient(90deg, #c9a96e, transparent)" }} />
            <p className="text-white/70 text-[17px] leading-[1.9]">{t("experience.aboutText")}</p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ── 7. WIDE MOOD SHOT — slider-7 ────────────────────── */}
      <ParallaxSection img={slider7} overlayOpacity={0.42} speed={0.22} className="py-44 md:py-56">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="uppercase text-xs text-white/50 mb-6 tracking-[0.3em]"
          >
            Heraklion · Crete
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl text-white leading-tight"
          >
            {t("experience.atmosphereTitle")}
          </motion.h2>
        </div>
      </ParallaxSection>

      {/* ── 8. CLOSING CTA — slider-8 ───────────────────────── */}
      <ParallaxSection img={slider8} overlayOpacity={0.65} speed={0.1} className="py-28 md:py-36">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl text-white mb-6"
          >
            Come &amp; Find Us
          </motion.h2>
          <GoldDivider />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-lg mb-10"
          >
            Open every day · 08:00 – 02:00 · Heraklion, Crete
          </motion.p>
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-medium tracking-[0.15em] uppercase"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #a8823f)",
              color: "#1a1208",
              boxShadow: "0 4px 24px rgba(201,169,110,0.35)",
            }}
            whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(201,169,110,0.55)" }}
          >
            Get in Touch
          </motion.a>
        </div>
      </ParallaxSection>

    </main>
  );
}