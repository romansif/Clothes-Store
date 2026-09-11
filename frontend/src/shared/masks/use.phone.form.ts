import { computed } from "vue";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { authForms } from "@/features/use-auth/model/auth.forms.ts";
import { informationForm } from "@/features/use-information/model/address.form.ts";

const { registerForm } = authForms()
const { countries, selectedCountryCode } = userStore();

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