import { MAP_EMBED_SRC } from "@/lib/images";

export function MapEmbed({ height = 400 }: { height?: number }) {
  return (
    <iframe
      src={MAP_EMBED_SRC}
      title="Plastelina on Google Maps"
      width="100%"
      height={height}
      style={{ border: 0, borderRadius: 16 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
