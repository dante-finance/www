import { default as i18n, InitOptions } from 'i18next';

import { initReactI18next } from 'react-i18next';

export const i18nInitOptions: InitOptions = {
  debug: process.env.NODE_ENV === 'development',

  // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
  // if you're using a language detector, do not define the lng option
  lng: 'en',

  fallbackLng: false,
  ns: [],
  defaultNS: '',

  partialBundledLanguages: true,

  interpolation: {
    escapeValue: false, // react already safes from xss
    format(value: string, format?: string /* , lng */): string {
      if (format === 'uppercase') return value.toUpperCase();
      if (format === 'lowercase') return value.toLowerCase();
      return value;
    },
  },
};

i18n
  .use({
    type: 'backend',
    read(
      language: string,
      namespace: string,
      callback: (errorValue: unknown, translations: unknown) => void,
    ) {
      import(`./locales/${language}/${namespace}.json`)
        .then((res) => {
          callback(null, res);
        })
        .catch((error) => {
          callback(error, null);
        });
    },
  })
  .use(initReactI18next); // passes i18n down to react-i18next

export { i18n };
