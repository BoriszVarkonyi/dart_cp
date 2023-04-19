import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.REACT_APP_DEBUG === "true",
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          login: {
            email: 'Email',
            password: 'Password',
            login: 'Login',
            enterEmail: 'Please enter your email address!',
            enterValidEmail: 'Please enter a valid email address!',
            enterPassword: 'Please enter your password!',
          },
        },
      },
      hu: {
        translation: {
          login: {
            email: 'E-mail',
            password: 'Jelszó',
            login: 'Bejelentkezés',
            enterEmail: 'Kérjük adja meg az e-mail-címét!',
            enterValidEmail: 'Kérjük érvényes e-mail-címet adjon meg!',
            enterPassword: 'Kérjük adja meg a jelszavát!',
          },
        },
      },
    },
  });

export default i18n;
