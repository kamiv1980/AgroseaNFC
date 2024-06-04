import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {en, uk, pl, ro, bg, hu} from './translations';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback) {
    try {
      const language = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (language) {
        callback(language);
      } else {
        callback('en');
      }
    } catch (error) {
      console.log('Error reading language', error);
      callback('en');
    }
  },
  cacheUserLanguage: async function (language) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.log('Error setting language', error);
    }
  },
};

const resources = {
  en: {translation: en},
  uk: {translation: uk},
  pl: {translation: pl},
  ro: {translation: ro},
  bg: {translation: bg},
  hu: {translation: hu},
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
    react: {
      useSuspense: false, // Important: Disable suspense to prevent issues
    },
  });

export default i18n;
