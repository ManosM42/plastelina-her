import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 26;
const FRAME_PATH = (i: number) =>
  `/frames/Pancakes_and_berries_floating_202606021744 (online-video-cutter.com)_${String(i).padStart(3, "0")}.jpg`;

export function FramedAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameObj = useRef({ current: 0 });
  const heading1Ref = useRef<HTMLDivElement>(null);
  const heading2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !container || !sticky) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ─── Draw ──────────────────────────────────────────────────────────────
    function drawFrame(index: number) {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
      const img = imagesRef.current[clamped];
      if (!img?.complete || !img.naturalWidth) return;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const scale = Math.max(
        canvas!.width / img.naturalWidth,
        canvas!.height / img.naturalHeight
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas!.width - w) / 2;
      const y = (canvas!.height - h) / 2;
      ctx!.drawImage(img, x, y, w, h);
    }

    // ─── Resize ────────────────────────────────────────────────────────────
    function setSize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      drawFrame(frameObj.current.current);
    }

    // ─── Load ──────────────────────────────────────────────────────────────
    async function loadFrames() {
      // Draw frame 0 the moment it loads to kill the white flash
      const firstImg = new Image();
      firstImg.src = FRAME_PATH(1);
      await new Promise<void>((resolve) => {
        firstImg.onload = () => {
          imagesRef.current[0] = firstImg;
          setSize();
          resolve();
        };
        firstImg.onerror = () => resolve();
      });

      // Load the rest in parallel
      const rest = Array.from({ length: TOTAL_FRAMES - 1 }, (_, i) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = FRAME_PATH(i + 2);
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.warn(`Failed to load: ${img.src}`);
            resolve(img);
          };
        })
      );

      const restImages = await Promise.all(rest);
      imagesRef.current = [firstImg, ...restImages];

      // Only init ScrollTrigger AFTER all frames + DOM are fully ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initScrollTrigger();
        });
      });
    }

    // ─── ScrollTrigger ─────────────────────────────────────────────────────
    function initScrollTrigger() {
      // Kill any stale instances
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.refresh();

      // Frame scrub
      gsap.to(frameObj.current, {
        current: TOTAL_FRAMES - 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${window.innerHeight * 4}`,
          pin: sticky,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,            // ← prevents the white-flash on pin entry
          onUpdate: (self) => {
            const frame = Math.round(self.progress * (TOTAL_FRAMES - 1));
            frameObj.current.current = frame;
            drawFrame(frame);
          },
        },
      });

      // Heading 1 — slide in from left
gsap.fromTo(
  heading1Ref.current,
  { opacity: 0, x: -120 },
  {
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: container,
      start: "28% top",
      end: "38% top",
      scrub: true,
    },
  }
);
// Heading 1 — fade out left
gsap.to(heading1Ref.current, {
  opacity: 0,
  x: -80,
  scrollTrigger: {
    trigger: container,
    start: "52% top",
    end: "58% top",
    scrub: true,
  },
});

// Heading 2 — slide in from left
gsap.fromTo(
  heading2Ref.current,
  { opacity: 0, x: -120 },
  {
    opacity: 1,
    x: 0,
    scrollTrigger: {
      trigger: container,
      start: "62% top",
      end: "72% top",
      scrub: true,
    },
  }
);
// Heading 2 — fade out left
gsap.to(heading2Ref.current, {
  opacity: 0,
  x: -80,
  scrollTrigger: {
    trigger: container,
    start: "88% top",
    end: "95% top",
    scrub: true,
  },
});
    }

    // ─── Init ──────────────────────────────────────────────────────────────
    loadFrames();
    window.addEventListener("resize", setSize);

    return () => {
      window.removeEventListener("resize", setSize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    // Container must have explicit height for GSAP to measure correctly
    <div ref={containerRef} style={{ height: `${window.innerHeight * 5}px` }}>
      <div
        ref={stickyRef}
        style={{
          position: "relative",       // ← needed so absolute children stack correctly
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />

        {/* Dark vignette overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none",
          }}
        />
{/* Heading 1 — upper left, ~1/3 of animation */}
<div
  ref={heading1Ref}
  style={{
    opacity: 0,
    position: "absolute",
    top: "28%",
    left: "6vw",
    color: "#fff",
    pointerEvents: "none",
    lineHeight: 1.05,
  }}
>
  <span style={{
    display: "block",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 700,
    fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textShadow: "0 4px 32px rgba(0,0,0,0.55)",
  }}>
    Fresh
  </span>
  <span style={{
    display: "block",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "clamp(1.4rem, 3.8vw, 3.1rem)",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    textShadow: "0 4px 32px rgba(0,0,0,0.55)",
    marginTop: "0.15em",
    color: "#f5d98b",
  }}>
    Ingredients
  </span>
  <span style={{
    display: "block",
    width: "4rem",
    height: "2px",
    background: "#f5d98b",
    marginTop: "0.7em",
    borderRadius: "2px",
  }} />
</div>

{/* Heading 2 — lower left, ~2/3 of animation */}
<div
  ref={heading2Ref}
  style={{
    opacity: 0,
    position: "absolute",
    top: "48%",
    left: "6vw",
    color: "#fff",
    pointerEvents: "none",
    lineHeight: 1.05,
  }}
>
  <span style={{
    display: "block",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 700,
    fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textShadow: "0 4px 32px rgba(0,0,0,0.55)",
  }}>
    Handcrafted
  </span>
  <span style={{
    display: "block",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "clamp(1.4rem, 3.8vw, 3.1rem)",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    textShadow: "0 4px 32px rgba(0,0,0,0.55)",
    marginTop: "0.15em",
    color: "#f5d98b",
  }}>
    Dishes
  </span>
  <span style={{
    display: "block",
    width: "4rem",
    height: "2px",
    background: "#f5d98b",
    marginTop: "0.7em",
    borderRadius: "2px",
  }} />
</div>
      </div>
    </div>
  );
}