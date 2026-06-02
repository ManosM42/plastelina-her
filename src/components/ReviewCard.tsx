import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="flex-shrink-0 w-[320px] md:w-[380px] bg-card border border-taupe/40 rounded-md p-7 mx-4 hover:border-amber/60 transition-colors">
      <div className="flex gap-1 text-amber mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="text-[15px] leading-relaxed text-charcoal/85 italic">"{text}"</p>
      <p className="mt-5 text-sm font-medium tracking-wide text-charcoal">— {name}</p>
    </div>
  );
}

export function ReviewCard() {
  const all = [...reviews, ...reviews, ...reviews];

  return (
    <div>
      {/* ── Heading — matches SectionHeading light + GoldDivider ── */}
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="text-center font-serif text-4xl md:text-5xl mb-4 tracking-wide text-white/90"
      >
        People's Voices
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto mb-16 h-px w-20 origin-left"
        style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
      />

      {/* ── Ticker ── */}
      <div className="overflow-hidden relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          className="flex py-2"
          style={{
            animation: "ticker 35s linear infinite",
            width: "max-content",
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
        `}</style>
      </div>
    </div>
  );
}