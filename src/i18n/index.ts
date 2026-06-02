import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json"; // ⚠️ MUST match your filename case exactly!
import gr from "./gr.json"; // ⚠️ MUST match your filename case exactly!

const stored = typeof window !== "undefined" ? localStorage.getItem("plastelina-lang") : null;

i18n.use(initReactI18next).init({
  resources: { 
    en: { translation: en }, 
    gr: { translation: gr },
    el: { translation: gr } // 👈 Safe fallback: matches both "gr" and "el" if the app requests either!
  },
  lng: stored || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;