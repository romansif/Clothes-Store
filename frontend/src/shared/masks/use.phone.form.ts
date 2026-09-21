import { computed } from "vue";
import { registerForm } from "@/entities/auth/model/auth.forms.ts";
import { informationForm } from "@/entities/checkout-contact-info/model/address.form.ts";
import { selectedCountryCode, countries} from "@/shared/lib/select-phone-form.ts";

export const usePhoneForm = () => {
    const currentCountry = computed(() => {
        return countries.find(c => c.code === selectedCountryCode.value)
    })

    const currentMask = computed(() => ({
        mask: currentCountry.value?.mask,
        lazy: false
    }))

    const changeCountry = () => {
        informationForm.value.phone = '';
        registerForm.value.phone = '';
    };

    return {
        currentCountry,
        changeCountry,
        currentMask,
    }
}