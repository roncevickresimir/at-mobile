import i18n from 'i18next';

import EN_US from './en_GB';
import HR_HR from './hr_HR';

export const initLocalization = async () => {
  return i18n.init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: EN_US,
      },
      hr: {
        translation: HR_HR,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path'],
    },
  });
};
