import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { menuSections } from "@/lib/menuData";
import slider6 from "@/assets/slider-2.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu · Plastelina" },
      { name: "description", content: "Brunch, pancakes, salads, pasta, burgers, pinsa, coffee, cocktails and wine — the full Plastelina menu." },
      { property: "og:title", content: "Menu · Plastelina" },
      { property: "og:description", content: "The full all-day menu at Plastelina, Heraklion." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState(menuSections[0].key);
  const section = menuSections.find((s) => s.key === active)!;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <main className="bg-cream min-h-screen">

      {/* ── Hero header ── */}
      <section ref={heroRef} className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <motion.div
          style={{ y, backgroundImage: `url(${slider6})` }}
          className="absolute inset-[-15%] bg-cover bg-center will-change-transform"
        />
        {/* overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(10,8,5,0.65) 0%, rgba(20,14,8,0.55) 60%, rgba(10,8,5,0.70) 100%)",
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
        {/* Text */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              letterSpacing: "0.28em",
              fontSize: "0.75rem",
              color: "#c9a96e",
            }}
            className="mb-4 uppercase"
          >
            Heraklion, Crete
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-serif text-6xl md:text-7xl text-white leading-tight"
          >
            Menu
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-5 h-px w-16 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
          />
        </div>
      </section>

      {/* ── Menu content ── */}
      <div className="mx-auto max-w-6xl px-6 pb-24">

        {/* Sticky tab bar */}
        <div className="sticky top-20 z-30 -mx-6 px-6 py-4 bg-cream/95 backdrop-blur-md border-b border-border">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {menuSections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`shrink-0 px-5 py-2 rounded-full text-xs uppercase tracking-wider transition ${
                  active === s.key
                    ? "bg-amber text-charcoal"
                    : "bg-transparent text-muted-foreground hover:text-charcoal"
                }`}
              >
                {t(`menu.tabs.${s.key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Section content */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  {t(`menu.tabs.${section.key}`)}
                </h2>
                {section.note && (
                  <span className="text-sm italic text-muted-foreground">{section.note}</span>
                )}
              </div>
              <ul className="divide-y divide-taupe/40">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between py-4 gap-6"
                  >
                    <span className="text-charcoal text-[15px] md:text-base">{item.name}</span>
                    <span className="font-mono text-amber-foreground/80 text-sm md:text-base whitespace-nowrap">
                      €{item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-20 text-center text-xs italic text-muted-foreground">{t("menu.note")}</p>
      </div>
    </main>
  );
}