import { computed } from "vue";
import { loginFormErrorMessages, registerFormErrorMessages } from "@/entities/auth/model/auth.forms.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";

const { getPhoneClass } = baseClasses();

export const authClasses = () => {
    const getSignUpPasswordClass = (hasError: string) => [
        'absolute w-7.5 top-1/4 left-58 sm:left-51', hasError ? 'top-1/6' : ''
    ];

    const selectPhoneCodeClass = () => [
        `text-sm outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
        font-dm-sans hover:bg-gray-50 rounded-md py-5 px-3 appearance-none`
    ];

    const signInRoleClass = computed(() => [
        `flex items-center gap-3 bg-[#D9D9D9]/40 outline-none px-6 py-4 rounded-sm border border-gray-300
        transition duration-400 hover:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
        loginFormErrorMessages.value.role ? 'border border-red-500' : ''
    ]);

    const signInCodeClass = computed(() => [
        `text-center bg-[#D9D9D9]/40 w-14 outline-none px-2 py-4 rounded-sm border border-gray-300
        font-dm-sans transition duration-400 hover:bg-gray-50`,
        loginFormErrorMessages.value.phone ? 'border border-red-500' : ''
    ]);

    const signInPhoneClass = computed(() => getPhoneClass(loginFormErrorMessages.value.phone))
    const signUpPhoneClass = computed(() => getPhoneClass(registerFormErrorMessages.value.phone))

    const signUpPasswordClass = computed(() => getSignUpPasswordClass(registerFormErrorMessages.value.password))

    return {
        signInRoleClass,
        signInPhoneClass,
        signInCodeClass,

        signUpPhoneClass,
        signUpPasswordClass,

        selectPhoneCodeClass
    }
}