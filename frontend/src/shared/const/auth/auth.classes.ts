import { computed } from "vue";
import { loginFormErrors, registerFormErrors } from "@/features/use-auth/model/auth.errors.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";

const { getPhoneClass } = baseClasses();

export const authClasses = () => {
    const getSignUpPasswordClass = (hasError: boolean) => [
        'absolute w-7.5 top-1/4 left-58 sm:left-51', hasError ? 'top-1/6' : ''
    ];

    const selectPhoneCodeClass = () => [
        `text-sm outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
        font-dm-sans hover:bg-gray-50 rounded-md py-5 px-3 appearance-none`
    ];

    const signInRoleClass = computed(() => [
        `flex items-center gap-3 bg-[#D9D9D9]/40 outline-none px-6 py-4 rounded-sm border border-gray-300
        transition duration-400 hover:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
        loginFormErrors.value.role ? 'border border-red-500' : ''
    ]);

    const signInCodeClass = computed(() => [
        `text-center bg-[#D9D9D9]/40 w-14 outline-none px-2 py-4 rounded-sm border border-gray-300
        font-dm-sans transition duration-400 hover:bg-gray-50`,
        loginFormErrors.value.phone ? 'border border-red-500' : ''
    ]);

    const signInPhoneClass = computed(() => getPhoneClass(loginFormErrors.value.phone))
    const signUpPhoneClass = computed(() => getPhoneClass(registerFormErrors.value.phone))

    const signUpPasswordClass = computed(() => getSignUpPasswordClass(registerFormErrors.value.password))

    return {
        signInRoleClass,
        signInPhoneClass,
        signInCodeClass,

        signUpPhoneClass,
        signUpPasswordClass,

        selectPhoneCodeClass
    }
}