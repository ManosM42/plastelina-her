import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const reviews = [
  {
    name: "Strawmarry 22",
    text: "Πολύ κλασικό μαγαζί του Ηρακλείου, ωστόσο μπορείς να φας πολύ ωραίο πρωινό! Είναι στο κέντρο και κάνεις ένα ωραίο διάλειμμα από τις δουλειές σου.",
  },
  {
    name: "Alex Veziro",
    text: "Οι σαλάτες που φάγαμε με κοτόπουλο και σολομό καπνιστό ήταν νόστιμες και φτιαγμένες με καλής ποιότητας υλικά! Πολύ εξυπηρετικό και ευγενικό προσωπικό!",
  },
  {
    name: "Apostolos Bogiannos",
    text: "Νόστιμο, προσεγμένο και σε καλές μερίδες φαγητό. Ο καφές δυνατός. Lounge ατμόσφαιρα και ευγενεστατο προσωπικό.",
  },
  {
    name: "Μανώλης Γωνιανάκης",
    text: "Ένα όμορφο μέρος στην καρδιά του Ηρακλείου! Πολλές επιλογές για να δοκιμάσεις και οι τιμές αρκετά καλές! Το προτείνω ανεπιφύλακτα!",
  },
];

function Card({ name, text }: { name: string; text: string }) {
  return (
    <div
      className="flex-shrink-0 bg-card border border-taupe/40 rounded-md p-6 mx-3 hover:border-amber/60 transition-colors"
      // ✅ Narrower on mobile so cards are readable without horizontal scroll
      style={{ width: isMobile ? "280px" : "380px" }}
    >
      <div className="flex gap-1 text-amber mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="text-[14px] md:text-[15px] leading-relaxed text-charcoal/85 italic">"{text}"</p>
      <p className="mt-4 text-sm font-medium tracking-wide text-charcoal">— {name}</p>
    </div>
  );
}

export function ReviewCard() {
  const all = [...reviews, ...reviews, ...reviews];
  const trackRef = useRef<HTMLDivElement>(null);

  // ✅ Pause ticker on touch so user can read without it moving
  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div>
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: isMobile ? 14 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: isMobile ? 0.45 : 0.75, ease: "easeOut" }}
        className="text-center font-serif text-3xl md:text-5xl mb-4 tracking-wide text-white/90"
      >
        People's Voices
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto mb-12 md:mb-16 h-px w-20 origin-left"
        style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
      />

      {/* Ticker */}
      <div
        className="overflow-hidden relative"
        // ✅ Pause on touch so users can read the cards
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {/* Fade masks — narrower on mobile so cards aren't hidden too much */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-background to-transparent"
          style={{ width: isMobile ? "32px" : "96px" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-background to-transparent"
          style={{ width: isMobile ? "32px" : "96px" }}
        />

        <div
          ref={trackRef}
          className="flex py-2"
          style={{
            // ✅ Slower on mobile — less content visible so slower feels natural
            animation: `ticker ${isMobile ? "25s" : "35s"} linear infinite`,
            width: "max-content",
            // ✅ GPU composite the ticker — no layout thrashing
            willChange: "transform",
            // ✅ Pause when tab is hidden to save battery
            animationPlayState: "running",
          }}
        >
          {all.map((r, i) => (
            <Card key={i} name={r.name} text={r.text} />
          ))}
        </div>

        <style>{`
          @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          /* ✅ Pause when user prefers reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .ticker-track { animation: none !important; }
          }
          /* ✅ Pause when tab not visible — saves battery on mobile */
          @media (prefers-reduced-motion: no-preference) {
            .ticker-track { animation-play-state: running; }
          }
        `}</style>
      </div>
    </div>
  );
}