import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { AppLocale } from "@/shared/i18n";

export const languages: { code: AppLocale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

const GAP = "0.5rem";
const PAD = "0.5rem";

export const useSwitcher = () => {
  const { locale } = useI18n();

  const activeIndex = computed(() =>
    Math.max(
      0,
      languages.findIndex((l) => l.code === locale.value),
    ),
  );

  const indicatorStyle = computed(() => ({
    width: `calc((100% - ${PAD} - ${GAP} * ${languages.length - 1}) / ${languages.length})`,
    transform: `translateX(calc(${activeIndex.value} * (100% + ${GAP})))`,
  }));

  return {
    locale,
    indicatorStyle,
  };
};
