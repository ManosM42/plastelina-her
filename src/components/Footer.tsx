import { Instagram, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.jpg";

function TripAdvisorIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zM7.5 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm9 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM12 8c-1.38 0-2.632.37-3.7.97L9.44 10.1A3.978 3.978 0 0 1 12 9.5c.98 0 1.876.342 2.56.9l1.14-1.13A6.47 6.47 0 0 0 12 8zm-4.5 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4.5 3c-1.105 0-2.132.327-2.988.878l.663.748A3.494 3.494 0 0 1 12 15.5c.84 0 1.614.276 2.235.738l.663-.748A4.494 4.494 0 0 0 12 14.5z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();

  const socials = [
    {
      href: "https://www.instagram.com/plastelina_her/?hl=el",
      label: "Instagram",
      icon: <Instagram size={22} />,
    },
    {
      href: "https://www.facebook.com/plastelina.gr/?locale=el_GR",
      label: "Facebook",
      icon: <Facebook size={22} />,
    },
    {
      href: "https://www.tripadvisor.com.gr/Restaurant_Review-g189417-d12280191-Reviews-Plastelina-Heraklion_Crete.html",
      label: "TripAdvisor",
      icon: <TripAdvisorIcon size={22} />,
    },
  ];

  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16 flex flex-col items-center text-center gap-6">

        <img
          src={logo}
          alt="Plastelina"
          className="h-14 md:h-16 w-auto rounded-full"
          style={{
            boxShadow: "0 0 0 1.5px rgba(201,169,110,0.35)",
            opacity: 0.9,
          }}
        />

        <p className="text-sm tracking-wide text-cream/75 max-w-xs md:max-w-none">
          {t("footer.tagline")}
        </p>

        <div className="flex items-center gap-2">
          {socials.map(({ href, label, icon }) => (
            
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-11 h-11 rounded-full text-cream/60 hover:text-amber active:scale-95 transition-all duration-200"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {icon}
            </a>
          ))}
        </div>

        <div
          className="w-16 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)" }}
        />

        <p className="text-xs text-cream/40">
          © {new Date().getFullYear()} Plastelina. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}