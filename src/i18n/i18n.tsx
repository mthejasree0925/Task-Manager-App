import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from '../locales/en.json';
import es from '../locales/es.json';

// Define the resources
const resources = {
  en: { translation: en },
  es: { translation: es },
};


const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    // getLocales() returns an array of preferred locales.
    // The first element is the most preferred locale.
    return locales[0].languageCode || 'en';
  }
  return 'en';
};

const deviceLanguage = getDeviceLanguage();

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: deviceLanguage, // Default language
    fallbackLng: 'en',   // If device language not supported
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

  

export default i18n;
