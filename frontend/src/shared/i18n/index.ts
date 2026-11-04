import { createI18n } from "vue-i18n";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

export type MessageSchema = typeof en;
export type AppLocale = "en" | "ru";

const detectLocale = (): AppLocale => {
  const saved = localStorage.getItem("locale");
  if (saved === "ru" || saved === "en") return saved;

  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
};

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: "en",
  messages: { en, ru },
});

export const setLocale = (locale: AppLocale) => {
  i18n.global.locale.value = locale;
  localStorage.setItem("locale", locale);
  document.documentElement.lang = i18n.global.locale.value;
};
