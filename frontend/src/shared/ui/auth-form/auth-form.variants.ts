import type { AuthFormVariant } from "@/shared/ui/auth-form/auth-form.types.ts";

export const showPasswordClass: Record<AuthFormVariant, string> = {
    login: 'absolute w-7.5 top-1/5 left-57 sm:left-82',
    register: 'absolute w-7.5 top-1/5 left-57 sm:left-50'
}

export const showPasswordErrorClass = `top-1/6`

export const signInRoleClass =
    `flex items-center gap-3 bg-[#D9D9D9]/40 outline-none px-6 py-4 rounded-sm border border-gray-300 
    transition duration-400 hover:bg-gray-50 placeholder:text-xl w-full cursor-pointer`

export const signInRoleErrorClass = 'border border-red-500'