import { computed } from "vue";

import { COUNTRIES, selectedCountryCode } from "@/shared/ui/phone-input/phone-input.values";

export const usePhoneInput = () => {
  const currentCountry = computed(() => {
    return COUNTRIES.find((c) => c.code === selectedCountryCode.value);
  });

  const currentMask = computed(() => ({
    mask: currentCountry.value?.mask,
    lazy: false,
  }));

  return {
    currentCountry,
    currentMask,
  };
};
