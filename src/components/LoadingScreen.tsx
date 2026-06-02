import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";

export function LoadingScreen() {
  const routerState = useRouterState();
  const [show, setShow] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setShow(true);
    setKey((k) => k + 1);
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, [routerState.location.pathname]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .loader-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 2.4rem;
          letter-spacing: 0.22em;
          background-image: linear-gradient(135deg, #a8823f 0%, #c9a96e 50%, #a8823f 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .loader-brand-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          color: rgba(80, 60, 30, 0.55);
          margin-top: 4px;
        }
        .loader-line {
          height: 1px;
          width: 0%;
          background: linear-gradient(90deg, transparent, #c9a96e, transparent);
          animation: loader-expand 1.6s ease forwards;
        }
        @keyframes loader-expand {
          0%   { width: 0%; opacity: 0; }
          20%  { opacity: 1; }
          100% { width: 100%; opacity: 0.7; }
        }
      `}</style>

      <AnimatePresence>
        {show && (
          <motion.div
            key={key}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
          >
            <motion.img
              src={logo}
              alt="Plastelina"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-20 w-auto rounded-full mb-6"
              style={{ boxShadow: "0 0 0 1.5px rgba(201,169,110,0.4)" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col items-center leading-none select-none"
            >
              <span className="loader-brand-name">PLASTELINA</span>
              <span className="loader-brand-sub">coffee &amp; cocktail crafts</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 w-36 overflow-hidden"
            >
              <div className="loader-line" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}