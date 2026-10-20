import type { AuthFormVariant } from "@/shared/ui/auth/auth-form.types.ts";

export const showSignInPassword: Record<AuthFormVariant, string> = {
    default: 'absolute w-7.5 top-1/4 left-58 sm:left-50',
    error: 'top-1/6'
}

export const signInRole: Record<AuthFormVariant, string> = {
    default: `flex items-center gap-3 bg-[#D9D9D9]/40 outline-none px-6 py-4 rounded-sm border border-gray-300 
        transition duration-400 hover:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
    error: 'border border-red-500'
}
