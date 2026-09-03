import { computed } from "vue";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { authForms } from "@/features/use-auth/model/auth.forms.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";

const { information } = checkoutForm();
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
        information.value.phone = '';
        registerForm.value.phone = '';
    };

    return {
        currentCountry,
        changeCountry,
        currentMask,
    }
}