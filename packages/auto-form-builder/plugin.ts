import { App } from "vue";
import { locales } from "./locales";

export type Locale = "en" | "ar";

let currentLocale: Locale = "ar";

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
};

export const t = (key: string, ...args: any[]): string => {
  const dict = locales[currentLocale];
  const value = (dict as any)?.[key];
  if (typeof value === "function") return value(...args);
  return value || key;
};

export default {
  install(app: App, options?: { locale?: Locale }) {
    if (options?.locale) setLocale(options.locale);
    app.config.globalProperties.$t = t;
  },
};
