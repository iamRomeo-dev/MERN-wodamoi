import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test",
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
