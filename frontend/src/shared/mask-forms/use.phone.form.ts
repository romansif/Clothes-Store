import { computed } from "vue";
import { usersStore } from "../composables/stores/users.store";
import { authForms } from "@/shared/composables/forms/auth.forms";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";

const { information } = checkoutForms();
const { registerBuyerForm, registerSellerForm } = authForms()
const { countries, selectedCountryCode } = usersStore();

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