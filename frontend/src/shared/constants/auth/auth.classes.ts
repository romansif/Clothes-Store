import { computed } from "vue";
import { authFormsErrors } from "@/features/use-auth/lib/auth.errors.ts";
import { baseClasses } from "@/shared/constants/base.classes.ts";

const { getPhoneClass } = baseClasses();
const { loginFormErrors, registerFormErrors } = authFormsErrors();

export const authClasses = () => {
    const getSignUpPasswordClass = (hasError: boolean) => [
        'absolute w-7.5 top-1/4 left-57 sm:left-51.5', hasError ? 'top-1/9' : ''
    ];

    const selectPhoneCodeClass = () => [
        `text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
        hover:bg-gray-50 rounded-md py-5 px-3`
    ];

    const signInRoleClass = computed(() => [
        `flex items-center gap-3 bg-[#D9D9D9]/40 outline-none px-6 py-4 rounded-sm border border-gray-300
        transition duration-400 hover:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
        loginFormErrors.value.roleError ? 'border border-red-500' : ''
    ]);

    const signInCodeClass = computed(() => [
        `text-center bg-[#D9D9D9]/40 w-14 outline-none px-2 py-4 rounded-sm border border-gray-300
        transition duration-400 hover:bg-gray-50`,
        loginFormErrors.value.phoneError ? 'border border-red-500' : ''
    ]);

    const signInPhoneClass = computed(() => getPhoneClass(loginFormErrors.value.phoneError))

    const signUpBuyerPhoneClass = computed(() => getPhoneClass(registerFormErrors.value.privatePhoneError))
    const signUpSellerPhoneClass = computed(() => getPhoneClass(registerFormErrors.value.publicPhoneError))

    const signUpPasswordClass = computed(() => getSignUpPasswordClass(registerFormErrors.value.passwordError))

    return {
        signInRoleClass,
        signInPhoneClass,
        signInCodeClass,

        signUpBuyerPhoneClass,
        signUpSellerPhoneClass,

        signUpPasswordClass,

        selectPhoneCodeClass
    }
}