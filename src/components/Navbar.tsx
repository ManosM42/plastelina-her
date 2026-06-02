import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/menu", key: "nav.menu" },
  { to: "/experience", key: "nav.experience" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Close menu and lock/unlock body scroll
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleLang = () => {
    const next = i18n.language === "en" ? "gr" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("plastelina-lang", next);
  };

  const solid = scrolled || !isHome || open;

  return (
    <>
      {/* ✅ Fonts now loaded from index.html — removed duplicate <link> tags here */}
      <style>{`
        .brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.35rem;
          letter-spacing: 0.18em;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          transition: background-image 0.4s ease;
        }
        /* ✅ Slightly smaller on very small screens */
        @media (max-width: 360px) {
          .brand-name { font-size: 1.15rem; letter-spacing: 0.12em; }
          .brand-sub  { font-size: 0.52rem; letter-spacing: 0.18em; }
        }
        .brand-name.solid {
          background-image: linear-gradient(135deg, #a8823f 0%, #c9a96e 50%, #a8823f 100%);
        }
        .brand-name.light {
          background-image: linear-gradient(135deg, #e8c87a 0%, #f0d898 50%, #c9a96e 100%);
        }
        .brand-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          margin-top: 2px;
          transition: color 0.4s ease;
        }
        .brand-sub.solid { color: rgba(80,60,30,0.65); }
        .brand-sub.light { color: rgba(255,245,220,0.6); }
      `}</style>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        {/* ✅ Reduced height on mobile (h-16 vs h-20) */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">

          {/* ── Logo + Brand ── */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <img
              src={logo}
              alt="Plastelina"
              // ✅ Smaller logo on mobile
              className="h-9 md:h-12 w-auto rounded-full transition-transform duration-500 group-hover:scale-105"
              style={{
                boxShadow: solid
                  ? "0 0 0 1.5px rgba(201,169,110,0.35)"
                  : "0 0 0 1.5px rgba(201,169,110,0.5)",
              }}
            />
            <div className="flex flex-col leading-none select-none">
              <span className={`brand-name ${solid ? "solid" : "light"}`}>
                PLASTELINA
              </span>
              <span className={`brand-sub ${solid ? "solid" : "light"}`}>
                coffee &amp; cocktail crafts
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm tracking-wide uppercase transition-colors ${
                  solid ? "text-charcoal" : "text-cream"
                } hover:text-amber relative`}
                activeProps={{ className: "text-amber" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {({ isActive }) => (
                  <>
                    <span>{t(item.key)}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px]"
                        style={{ background: "linear-gradient(90deg, #c9a96e, #a8823f)" }}
                      />
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleLang}
              className={`hidden md:inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium tracking-wider transition ${
                solid
                  ? "border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream"
                  : "border-cream/40 text-cream hover:bg-cream hover:text-charcoal"
              }`}
            >
              {i18n.language === "en" ? "EN  ·  ΕΛ" : "ΕΛ  ·  EN"}
            </button>

            {/* ✅ Larger tap target for hamburger */}
            <button
              className={`md:hidden p-2 rounded-md transition-colors active:bg-black/10 ${
                solid ? "text-charcoal" : "text-cream"
              }`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-cream border-t border-border"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    // ✅ Bigger tap targets (py-4) and active:bg for touch feedback
                    className="py-4 text-charcoal text-base font-medium hover:text-amber active:bg-taupe/10 rounded-md px-2 transition-colors"
                    activeProps={{ className: "text-amber" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {t(item.key)}
                  </Link>
                ))}

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <button
                    onClick={toggleLang}
                    className="rounded-full border border-charcoal/20 px-4 py-2 text-xs tracking-wider active:bg-taupe/10 transition-colors"
                  >
                    {i18n.language === "en" ? "EN  ·  ΕΛ" : "ΕΛ  ·  EN"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}