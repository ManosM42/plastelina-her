import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Coffee, Cake, Wine, MapPin, Clock, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { HeroSlider } from "@/components/HeroSlider";
import { GallerySlider3D } from "@/components/GallerySlider3D";
import { ReviewCard } from "@/components/ReviewCard";
import { MapEmbed } from "@/components/MapEmbed";
import brunchImg from "@/assets/brunch.jpg";
import sweetsImg from "@/assets/sweets.jpg";
import cocktailsImg from "@/assets/cocktails.jpg";
import slider3Img from "@/assets/slider-3.jpg";
import slider5Img from "@/assets/slider-5.jpg";
import { FramedAnimation } from "@/components/FramedAnimation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plastelina · Coffee & Cocktail Crafts — Heraklion, Crete" },
      {
        name: "description",
        content:
          "All-day coffee bar and restaurant in the heart of Heraklion. Brunch, crafted cocktails and warm hospitality since 2011.",
      },
      { property: "og:title", content: "Plastelina · Coffee & Cocktail Crafts" },
      { property: "og:description", content: "Brunch · Coffee · Cocktails · Heraklion since 2011." },
    ],
  }),
  component: Home,
});

/* ─── Detect mobile once ───────────────────────────────────── */
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

/* ─── Parallax wrapper ─────────────────────────────────────── */
function ParallaxSection({
  img,
  children,
  className = "",
  overlayOpacity = 0.52,
}: {
  img: string;
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
  speed?: number; // kept for API compat, unused now
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // ✅ Disable parallax on mobile — biggest perf killer
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile || shouldReduceMotion ? ["0%", "0%"] : ["-12%", "12%"]
  );
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background — GPU composited */}
      <motion.div
        style={{
          y,
          backgroundImage: `url(${img})`,
          willChange: isMobile ? "auto" : "transform", // ✅ don't waste GPU on mobile
        }}
        className="absolute inset-[-15%] bg-cover bg-center"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, rgba(10,8,5,${overlayOpacity + 0.1}) 0%, rgba(20,14,8,${overlayOpacity}) 60%, rgba(10,8,5,${overlayOpacity + 0.15}) 100%)`,
        }}
      />

      {/* Grain — skip on mobile, not visible and wastes paint */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}

/* ─── Section divider ──────────────────────────────────────── */
function GoldDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="mx-auto mb-16 h-px w-20 origin-left"
      style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
    />
  );
}

/* ─── Section heading ──────────────────────────────────────── */
function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: isMobile ? 14 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: isMobile ? 0.45 : 0.75, ease: "easeOut" }}
      className={`text-center font-serif text-3xl md:text-5xl mb-4 tracking-wide ${
        light ? "text-white/90" : "text-charcoal"
      }`}
    >
      {children}
    </motion.h2>
  );
}

/* ─── Home ─────────────────────────────────────────────────── */
function Home() {
  const { t } = useTranslation();

  return (
    <main>
      {/* ── Hero ── */}
      <HeroSlider />

      {/* ── Framed Animation ── */}
      <FramedAnimation />

      {/* ── Gallery ── */}
      <ParallaxSection img={slider3Img} overlayOpacity={0.58} className="py-20 md:py-36">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading light>{t("gallery.title")}</SectionHeading>
          <GoldDivider />
          <GallerySlider3D />
        </div>
      </ParallaxSection>

      {/* ── Highlights ── */}
      <ParallaxSection img={slider3Img} overlayOpacity={0.64} className="py-20 md:py-36">
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <SectionHeading light>{t("highlights.title")}</SectionHeading>
          <GoldDivider />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {[
              { Icon: Coffee, k: "brunch" as const, img: brunchImg },
              { Icon: Cake, k: "sweets" as const, img: sweetsImg },
              { Icon: Wine, k: "cocktails" as const, img: cocktailsImg },
            ].map(({ Icon, k, img }, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: isMobile ? 16 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: isMobile ? 0 : i * 0.18 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ minHeight: isMobile ? "280px" : "360px" }}
              >
                <img
                  src={img}
                  alt={k}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  // ✅ native img instead of motion.img — no JS animation overhead
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(201,169,110,0.55)" }}
                />
                <div
                  className="relative z-10 flex flex-col items-center justify-end h-full p-8 md:p-10"
                  style={{ minHeight: isMobile ? "280px" : "360px" }}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.4}
                    style={{ color: "#c9a96e", marginBottom: "1rem" }}
                  />
                  <h3 className="font-serif text-xl md:text-2xl text-white tracking-wide">
                    {t(`highlights.${k}.name`)}
                  </h3>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">
                    {t(`highlights.${k}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: isMobile ? 0 : 0.4 }}
          >
            <Link
              to="/menu"
              className="inline-flex mt-12 md:mt-14 items-center gap-2 px-8 md:px-10 py-4 rounded-full text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #c9a96e, #a8823f)",
                color: "#1a1208",
                boxShadow: "0 4px 24px rgba(201,169,110,0.35)",
              }}
              onMouseEnter={(e) => {
                if (isMobile) return;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(201,169,110,0.55)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                if (isMobile) return;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(201,169,110,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {t("highlights.cta")}
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ── Reviews ── */}
      <ParallaxSection img={slider5Img} overlayOpacity={0.62} className="py-20 md:py-36">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <ReviewCard />
        </div>
      </ParallaxSection>

      {/* ── Find Us ── */}
      <ParallaxSection img={slider5Img} overlayOpacity={0.70} className="py-20 md:py-36">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading light>{t("findus.title")}</SectionHeading>
          <GoldDivider />

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10">
            {[
              { Icon: MapPin, label: "Heraklion, Crete" },
              { Icon: Clock, label: "08:00 – 02:00" },
              { Icon: Phone, label: "+30 2810 000 000" },
            ].map(({ Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: isMobile ? 0 : i * 0.12 }}
                className="flex items-center gap-2 text-white/80 text-sm tracking-wide"
              >
                <Icon size={15} style={{ color: "#c9a96e" }} strokeWidth={1.5} />
                {label}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,169,110,0.2)" }}
          >
            <MapEmbed height={420} />
          </motion.div>
        </div>
      </ParallaxSection>
    </main>
  );
}