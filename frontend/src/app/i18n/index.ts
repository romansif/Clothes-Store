import { createI18n } from "vue-i18n";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

export type MessageSchema = typeof en;
export type AppLocale = "en" | "ru";

const saved = localStorage.getItem("locale");

export const i18n = createI18n({
  legacy: false,
  locale: saved === "ru" || saved === "en" ? saved : "en",
  fallbackLocale: "en",
  messages: { en, ru },
});

export const setLocale = (locale: AppLocale) => {
  i18n.global.locale.value = locale;
  localStorage.setItem("locale", locale);
  document.documentElement.lang = locale;
};
