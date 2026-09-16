import { computed } from "vue";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle-contact-info.ts";
import { informationFormErrorMessages } from "@/features/use-checkout-contact-info/model/address.form.ts";

const { getSavedInfoClass } = checkoutClasses();
const { isChosenAddress, isChosenContactInfo  } = toggleInformation();

export const informationClasses = () => {
    const postalCodeClass = computed(() => [
        `w-full bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white
        rounded-xl outline-none px-4 py-3 text-xs font-dm-sans`,
        informationFormErrorMessages.value.postalCode ? `placeholder:text-red-500 border-red-500` : ``
    ]);

    const informationSelectPhoneCodeClass = computed(() => [
        `text-xs outline-none bg-gray-50 border border-gray-400 font-dm-sans transition duration-400 
        hover:bg-white rounded-xl px-2 py-3`
    ])

    const informationPhoneClass = computed(() => [
        `bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white 
        font-dm-sans rounded-xl outline-none px-4 py-3 text-xs w-full`,
        informationFormErrorMessages.value.phone ? `placeholder:text-red-500 border-red-500` : ``
    ]);

    const savedAddressClass = computed(() => getSavedInfoClass(isChosenAddress.value))
    const savedContactClass = computed(() => getSavedInfoClass(isChosenContactInfo.value))

    return {
        informationSelectPhoneCodeClass,
        postalCodeClass,
        informationPhoneClass,

        savedAddressClass,
        savedContactClass,
    }
}