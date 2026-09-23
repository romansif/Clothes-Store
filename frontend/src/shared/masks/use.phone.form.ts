import { computed } from "vue";
import { selectedCountryCode, countries} from "@/shared/lib/select-phone-form.ts";

export const usePhoneForm = () => {
    const currentCountry = computed(() => {
        return countries.find(c => c.code === selectedCountryCode.value)
    })

    const currentMask = computed(() => ({
        mask: currentCountry.value?.mask,
        lazy: false
    }));

    return {
        currentCountry,
        currentMask,
    }
}