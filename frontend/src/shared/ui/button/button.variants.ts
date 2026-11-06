import type { ButtonVariant } from "@/shared/ui/button";

const baseButton = "rounded-full transition duration-400 transform cursor-pointer";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  login: `${baseButton} w-full bg-[#26334d] text-white px-6 py-3.5 mt-6 font-semibold text-start hover:bg-[#1b2438]`,
  register: `${baseButton} w-full bg-[#26334d] text-white px-6 py-3.5 mt-6 font-semibold text-start hover:bg-[#1b2438]`,
  changeRegister: `${baseButton} text-center text-sm text-[#26334d] hover:text-[#722f37] hover:scale-108`,
  useProduct: `${baseButton} w-full bg-[#722f37] text-white py-5 font-semibold text-center uppercase tracking-wider text-sm shadow-md hover:scale-102 hover:bg-[#5a252c]`,
  addToCart: `${baseButton} w-full bg-[#722f37] text-white font-semibold text-sm py-5 font-[Montserrat] lg:block hover:scale-108 hover:bg-[#5a252c]`,
  addToOrder: `${baseButton} w-full bg-[#722f37] text-white font-semibold py-4 mt-8 hover:scale-108 hover:bg-[#5a252c]`,
  checkOut: `${baseButton} w-full bg-[#722f37] text-white font-semibold text-start px-3 py-2 text-sm hover:bg-[#5a252c] sm:w-[300px] sm:ml-auto md:w-[365px] lg:w-[195px] xl:w-[246px]`,
  profileForm: `${baseButton} w-[230px] bg-[#26334d] text-white px-6 py-3.5 font-semibold text-start hover:scale-105 hover:bg-[#1b2438]`,
  toggleAvatar: `${baseButton} bg-[#26334d] text-white px-8 py-3.5 font-semibold text-start hover:scale-120 hover:bg-[#1b2438]`,
  useItemOrder: `${baseButton} h-fit border border-[#722f37] text-[#722f37] w-35 py-3 font-medium text-sm text-center hover:scale-108 hover:bg-[#722f37] hover:text-white`,
  useOrder: `${baseButton} w-fit h-fit bg-[#722f37] text-white px-15 py-5 font-medium text-sm text-start hover:scale-108 hover:bg-[#5a252c]`,
  replaceAndReview: `${baseButton} bg-[#722f37] text-white text-center py-4 px-6 font-semibold hover:scale-105 hover:bg-[#5a252c]`,
  outOfStack: `${baseButton} w-full bg-[#A3A3A3] text-white py-4 font-semibold disabled:cursor-not-allowed`,
  exitClose: `${baseButton} w-fit h-fit ml-auto bg-[#8c6a3f] text-white px-10 py-2 font-medium text-xs text-start hover:scale-108 hover:bg-[#735432]`,
  cancel: `${baseButton} bg-[#a8433b] text-white px-8 py-3.5 font-medium text-xs hover:scale-108 hover:bg-[#8c342e]`,
  confirm: `${baseButton} bg-[#3e6b55] text-white px-4 py-3.5 font-medium text-xs hover:scale-108 hover:bg-[#315544]`,
  refresh: `${baseButton} bg-[#26334d] text-white px-4 py-2 mt-5 hover:bg-[#1b2438]`,
  stackInfo: `${baseButton} w-fit h-fit ml-auto bg-[#8c6a3f] text-white px-20 py-4 font-medium  text-start hover:bg-[#735432]`,
  loadReviews: `${baseButton} w-150 border border-[#D9D9D9] p-2.5 font-semibold hover:bg-white hover:scale-105 hover:border-[#722f37] hover:text-[#722f37]`,
  profileMenu: `${baseButton} block px-4 py-2 text-sm text-[#A3A3A3] hover:text-[#722f37] hover:outline-hidden hover:scale-115`,
  reload: `${baseButton} flex gap-2 items-center w-38 px-5 py-2 text-xl bg-[#26334d] text-white border border-[#26334d] hover:outline-hidden hover:scale-110 hover:text-[#26334d] hover:bg-white`,
  catalog: `${baseButton} w-38 py-2 text-xl text-[#26334d] border border-[#26334d] hover:outline-hidden hover:scale-110 hover:text-white hover:bg-[#26334d]`,
  viewMyOrders: `${baseButton} w-87 py-3 font-medium text-white bg-[#722f37] border-2 border-[#722f37] hover:scale-105 hover:bg-white hover:text-[#722f37]`,
  paymentSuccess: `${baseButton} w-87 py-3 font-medium text-[#722f37] bg-white border-2 border-[#722f37] hover:scale-105 hover:bg-[#722f37] hover:text-white`,
  closeNotify: `absolute top-3 right-3 flex h-7 w-7 cursor-pointer items-center justify-center text-white/60 transition-colors hover:text-white`,
};
