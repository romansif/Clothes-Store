import type { InformationFormVariant } from "@/entities/checkout-info-form";

export const POSTAL_CODE_CLASS: Record<InformationFormVariant, string> = {
  default: `w-full bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white
        rounded-xl outline-none px-4 py-3 text-xs font-dm-sans`,
  error: `placeholder:text-red-500 border-red-500`,
};

export const INFORMATION_SELECT_PHONE_CLASS = `text-xs outline-none bg-gray-50 border border-gray-400 font-dm-sans 
    transition duration-400 hover:bg-white rounded-xl px-2 py-3`;

export const INFORMATION_PHONE_CLASS: Record<InformationFormVariant, string> = {
  default: `bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white 
        font-dm-sans rounded-xl outline-none px-4 py-3 text-xs w-full`,
  error: `placeholder:text-red-500 border-red-500`,
};
