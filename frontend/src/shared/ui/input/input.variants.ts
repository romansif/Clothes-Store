import type { InputVariant } from "@/shared/ui/input";

export const inputVariantClasses: Record<InputVariant, string> = {
  auth: `bg-[#D9D9D9]/40 w-full outline-none px-4 py-5 rounded-sm font-dm-sans
        transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
  createProduct: `border border-gray-300 rounded-sm outline-none px-6 py-5 
        text-sm bg-white transition duration-400 font-dm-sans`,
  confidentialityData: `h-16 w-full border border-gray-300 rounded-xl outline-none px-4 py-4 text-sm bg-[#D9D9D9]/40
        transition duration-400 hover:bg-gray-50 appearance-none font-dm-sans`,
  editAddress: `bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white focus:bg-white
                rounded-xl outline-none px-4 py-3 text-xs w-full font-dm-sans`,
  editCard: `border border-gray-300 rounded-xl outline-none px-4 py-4 text-xs transition duration-400
        bg-gray-50 hover:bg-white appearance-none font-dm-sans placeholder:text-sm`
};

export const inputErrorClass = `border border-red-500`;
