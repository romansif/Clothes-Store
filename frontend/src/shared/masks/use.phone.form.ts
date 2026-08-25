import { computed } from "vue";
import { userStore } from "@/entities/profile/user.store.ts";
import { authForms } from "@/feature/auth/model/auth.forms.ts";
import { checkoutForm } from "@/feature/checkout/model/checkout.form.ts";

const { information } = checkoutForm();
const { registerBuyerForm, registerSellerForm } = authForms()
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
        registerBuyerForm.value.privatePhone = '';
        registerSellerForm.value.publicPhone = '';
    };

    return {
        currentCountry,
        changeCountry,
        currentMask,
    }
}