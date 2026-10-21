import type {InputVariant} from "@/shared/ui/input/input.types.ts";

export const inputVariantClasses: Record<InputVariant, string> = {
    auth: `bg-[#D9D9D9]/40 w-full outline-none px-4 py-4 rounded-sm font-dm-sans
        transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
    createProduct: `border border-gray-300 rounded-sm outline-none px-6 py-5 
        text-sm bg-white transition duration-400 font-dm-sans`,
    confidentialityData: `w-full rounded-xl outline-none px-4 py-4 text-sm bg-[#D9D9D9]/40
        transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none font-dm-sans`,
}

export const inputErrorClass = `border border-red-500`