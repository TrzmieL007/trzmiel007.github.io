import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './locales/pl.json';
import en from './locales/en.json';
// @ts-ignore
import type { Resource } from 'i18next/typescript/options';
import type { SupportedLanguages } from './types';

const languages: Map<SupportedLanguages, unknown> = new Map<SupportedLanguages, unknown>([
    [ 'pl', pl ],
    [ 'en', en ],
]);

export const supportedLanguages: Array<SupportedLanguages> = Array.from(languages.keys());
const resources: Resource = Array.from(languages.entries())
    .reduce((resources, [key, translation]: [string, unknown]): Resource => {
        resources[key as string] = { translation };
        return resources;
    }, {});

i18n.use(initReactI18next).init({
    resources,
    lng: 'pl',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
})

export default i18n