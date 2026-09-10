import { computed } from "vue";
import { checkoutErrors } from "@/features/use-checkout/lib/checkout.errors.ts";
import { useCheckout } from "@/features/use-checkout/lib/use-checkout.ts";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";

const { informationErrors } = checkoutErrors();
const { isChosenAddress, isChosenContactInfo } = useCheckout();
const { getSavedInfoClass } = checkoutClasses();

export const informationClasses = () => {
    const addressNameClass = () => [
        `bg-gray-50 border border-gray-400 font-dm-sans transition duration-400
        hover:bg-white rounded-xl outline-none px-4 py-3 text-xs w-full`
    ];

    const postalCodeClass = computed(() => [
        `w-full bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white
        rounded-xl outline-none px-4 py-3 text-xs font-dm-sans`,
        informationErrors.value.postalCodeError ? `placeholder:text-red-500 border-red-500` : ``
    ]);

    const informationSelectPhoneCodeClass = computed(() => [
        `text-xs outline-none bg-gray-50 border border-gray-400 font-dm-sans transition duration-400 
        hover:bg-white rounded-xl px-2 py-3`
    ])

    const informationPhoneClass = computed(() => [
        `bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white 
        font-dm-sans rounded-xl outline-none px-4 py-3 text-xs w-full`,
        informationErrors.value.phoneError ? `placeholder:text-red-500 border-red-500` : ``
    ]);

    const savedAddressClass = computed(() => getSavedInfoClass(isChosenAddress.value))
    const savedContactClass = computed(() => getSavedInfoClass(isChosenContactInfo.value))

    return {
        informationSelectPhoneCodeClass,
        postalCodeClass,
        informationPhoneClass,

        savedAddressClass,
        savedContactClass,

        addressNameClass
    }
}