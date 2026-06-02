import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin } from "lucide-react";
import { MapEmbed } from "@/components/MapEmbed";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Plastelina" },
      { name: "description", content: "Visit Plastelina in the heart of Heraklion, Crete. Opening hours, phone, email and directions." },
      { property: "og:title", content: "Contact · Plastelina" },
      { property: "og:description", content: "Find us in the heart of Heraklion, Crete." },
    ],
  }),
  component: ContactPage,
});

const hours = [
  { day: "mon", time: "9:00 – 00:00" },
  { day: "tue", time: "9:00 – 00:00" },
  { day: "wed", time: "9:00 – 00:00" },
  { day: "thu", time: "9:00 – 00:00" },
  { day: "fri", time: "9:00 – 01:00" },
  { day: "sat", time: "9:00 – 01:00" },
  { day: "sun", time: "9:00 – 01:00" },
];

function ContactPage() {
  const { t } = useTranslation();
  // JS getDay(): 0=Sun .. 6=Sat. Map to our list (mon..sun).
  const jsDay = new Date().getDay();
  const todayIdx = jsDay === 0 ? 6 : jsDay - 1;

  return (
    <main className="pt-28 pb-24 bg-cream min-h-screen">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">{t("contact.title")}</h1>
          <div className="mx-auto h-px w-16 bg-amber mt-5" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Info */}
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-amber mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("contact.phoneLabel")}</div>
                  {/* TODO: replace with real phone number */}
                  <div className="mt-1 text-charcoal text-lg">+30 2810 282916</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-amber mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("contact.emailLabel")}</div>
                  {/* TODO: confirm email */}
                  <a href="mailto:info@plastelina.gr" className="mt-1 block text-charcoal text-lg hover:text-amber">
                    info@plastelina.gr
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-amber mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("contact.addressLabel")}</div>
                  {/* TODO: add exact street address */}
                  <div className="mt-1 text-charcoal text-lg">{t("contact.address")}</div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl text-charcoal">{t("contact.hours")}</h2>
              <div className="h-px w-12 bg-amber my-4" />
              <table className="w-full">
                <tbody>
                  {hours.map((h, i) => {
                    const isToday = i === todayIdx;
                    return (
                      <tr
                        key={h.day}
                        className={`border-b border-taupe/30 ${isToday ? "bg-amber/15" : ""}`}
                      >
                        <td className={`py-3 ${isToday ? "text-amber-foreground font-medium" : "text-charcoal"}`}>
                          {t(`contact.days.${h.day}`)}
                        </td>
                        <td className={`py-3 text-right font-mono text-sm ${isToday ? "text-amber-foreground font-medium" : "text-muted-foreground"}`}>
                          {h.time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Map */}
          <div>
            <MapEmbed height={550} />
          </div>
        </div>
      </div>
    </main>
  );
}
