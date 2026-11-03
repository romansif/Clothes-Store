import type { ButtonVariant } from "@/shared/ui/button";

const baseButton = "rounded-full transition duration-400 transform cursor-pointer";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
    login: `${baseButton} w-full bg-black text-white px-6 py-3.5 mt-6 font-semibold text-start`,
    register: `${baseButton} w-full bg-black text-white px-6 py-3.5 mt-6 font-semibold text-start`,
    changeRegister: `${baseButton} text-center text-sm text-indigo-600 hover:text-violet-600 hover:scale-108`,
    useProduct: `${baseButton} w-full bg-[#722f37] text-white py-5 font-semibold text-center uppercase tracking-wider text-sm shadow-md hover:scale-102 hover:bg-[#5a252c]`,
    addToCart: `${baseButton} w-full bg-[#722f37] text-white font-semibold text-sm py-5 font-[Montserrat] lg:block hover:scale-108 hover:bg-[#5a252c]`,
    addToOrder: `${baseButton} w-full bg-[#722f37] text-white font-semibold py-4 mt-8 hover:scale-108 hover:bg-[#5a252c]`,
    checkOut: `${baseButton} w-full bg-[#722f37] text-white font-semibold text-start px-3 py-2 text-sm hover:bg-[#5a252c] sm:w-[300px] sm:ml-auto md:w-[365px] lg:w-[195px] xl:w-[246px]`,
    profileForm: `${baseButton} w-[230px] bg-black text-white px-6 py-3.5 font-semibold text-start hover:scale-105`,
    toggleAvatar: `${baseButton} bg-black text-white px-8 py-3.5 font-semibold text-start hover:scale-120`,
    useOrder: `${baseButton} w-fit h-fit bg-[#722f37] text-white px-10 py-2 font-medium text-xs text-start hover:scale-108 hover:bg-[#5a252c]`,
    replaceAndReview: `${baseButton} bg-[#722f37] text-white text-center py-4 px-6 font-semibold hover:scale-105 hover:bg-[#5a252c]`,
    outOfStack: `${baseButton} w-full bg-[#A3A3A3] text-white py-4 font-semibold disabled:cursor-not-allowed`,
    exitClose: `${baseButton} w-fit h-fit ml-auto bg-[#3B3C36] text-white px-10 py-2 font-medium text-xs text-start hover:scale-108 hover:bg-[#1d1e1b]`,
    cancel: `${baseButton} bg-red-600 text-white px-8 py-3.5 font-medium text-xs hover:scale-108 hover:bg-red-700`,
    confirm: `${baseButton} bg-blue-700 text-white px-8 py-3.5 font-medium text-xs hover:scale-108 hover:bg-blue-800`,
    refresh: `${baseButton} bg-red-600 text-white px-4 py-2 mt-5 hover:bg-red-700`,
    stackInfo: `${baseButton} w-fit h-fit ml-auto bg-[#3B3C36] text-white px-10 py-2 font-medium text-xs text-start hover:bg-[#1d1e1b]`,
    loadReviews: `${baseButton} w-150 border border-[#D9D9D9] p-2.5 font-semibold hover:bg-white hover:scale-105`,
    profileMenu: `${baseButton} block px-4 py-2 text-sm text-[#A3A3A3] hover:text-black hover:outline-hidden hover:scale-115`,
    reload: `${baseButton} flex gap-2 items-center w-38 px-8 py-2 text-xl text-black border border-black hover:outline-hidden hover:scale-110 hover:text-white hover:bg-black`,
    catalog: `${baseButton} w-38 py-2 text-xl text-black border border-black hover:outline-hidden hover:scale-110 hover:text-white hover:bg-black`,
    viewMyOrders: `${baseButton} w-87 py-3 font-medium text-white bg-[#722f37] border-2 border-wine hover:scale-105 hover:bg-white hover:text-wine`,
    paymentSuccess: `${baseButton} w-87 py-3 font-medium text-wine bg-white border-2 border-wine hover:scale-105 hover:bg-wine hover:text-white`,
};