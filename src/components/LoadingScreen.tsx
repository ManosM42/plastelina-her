import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

export function LoadingScreen() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("plastelina-loaded");
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("plastelina-loaded", "1");
      setShow(false);
    }, 2000);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
        >
          <motion.img
            src={logo}
            alt="Plastelina"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: [0, 1, 1, 0.9] }}
            transition={{ duration: 1.8, times: [0, 0.3, 0.7, 1] }}
            className="h-32 w-auto md:h-40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
