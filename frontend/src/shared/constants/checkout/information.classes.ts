import { computed } from "vue";
import { checkoutErrors } from "@/feature/checkout/lib/checkout.errors.ts";
import { useCheckout } from "@/feature/checkout/model/use-checkout.ts";
import { checkoutClasses } from "@/shared/constants/checkout/checkout.classes.ts";

const { informationErrors } = checkoutErrors();
const { isChosenAddress, isChosenContactInfo } = useCheckout();
const { getSavedInfoClass } = checkoutClasses();

export const informationClasses = () => {
    const addressNameClass = () => [
        `bg-[#D9D9D9]/40 border border-gray-300 transition duration-400
        hover:bg-gray-50 rounded-xl outline-none px-4 py-3 text-xs placeholder:text-gray-600 w-full`
    ];

    const postalCodeClass = computed(() => [
        `w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50
        rounded-xl outline-none px-4 py-3 text-xs`,
        informationErrors.value.postalCodeError ? `placeholder:text-red-500 border-red-400` : `placeholder:text-gray-600`
    ]);

    const informationSelectPhoneCodeClass = computed(() => [
        `text-xs outline-none bg-[#D9D9D9]/40 border
        border-gray-300 transition duration-400 hover:bg-gray-50 rounded-xl px-2 py-3`
    ])

    const informationPhoneClass = computed(() => [
        `bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs w-full`,
        informationErrors.value.phoneError ? `placeholder:text-red-500 border-red-400` : `placeholder:text-gray-600`
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