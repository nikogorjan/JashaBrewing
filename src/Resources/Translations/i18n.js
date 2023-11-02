import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Default language (English)
    backend: {
      loadPath: './{{lng}}.json', // Relative path to your translation files in the same folder
    },
  });

export default i18n;