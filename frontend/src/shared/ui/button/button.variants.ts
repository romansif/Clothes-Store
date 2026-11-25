import type { ButtonVariant } from "@/shared/ui/button";

const base = "rounded-full transition duration-400 transform cursor-pointer";
const baseSquare = "rounded-xl transition duration-400 transform cursor-pointer";
const grow = "hover:scale-105";

const navy = {
  solid: "bg-[#26334d] text-white hover:bg-[#1b2438]",
  outline: "border border-[#26334d] text-[#26334d] hover:bg-[#26334d] hover:text-white",
  link: "text-[#26334d] hover:text-[#722f37]",
};

const wine = {
  solid: "bg-[#722f37] text-white hover:bg-[#5a252c]",
  outline: "border border-[#722f37] text-[#722f37] hover:bg-[#722f37] hover:text-white",
};

const gold = {
  solid: "bg-[#8c6a3f] text-white hover:bg-[#735432]",
  soft: "bg-[#f7f1e8] text-[#8c6a3f] hover:bg-[#efe3d0]",
};

const ink = {
  solid: "bg-black text-white border border-black hover:bg-white hover:text-black",
  outline: "border border-[#A3A3A3] text-black hover:bg-black hover:text-white",
  soft: "border border-[#D9D9D9] hover:bg-white hover:border-[#722f37] hover:text-[#722f37]",
  link: "text-[#A3A3A3] hover:text-[#722f37]",
  disabled: "bg-[#A3A3A3] text-white disabled:cursor-not-allowed",
};

const status = {
  danger: "bg-[#a8433b] text-white hover:bg-[#8c342e]",
  success: "bg-[#3e6b55] text-white hover:bg-[#315544]",
};

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  // navy
  login: `${base} ${navy.solid} w-full px-6 py-3.5 mt-6 font-semibold text-start`,
  register: `${base} ${navy.solid} w-full px-6 py-3.5 mt-6 font-semibold text-start`,
  changeRegister: `${base} ${navy.link} ${grow} text-center text-sm`,
  profileForm: `${base} ${navy.solid} ${grow} w-[230px] px-6 py-3.5 font-semibold text-start`,
  toggleAvatar: `${base} ${navy.solid} ${grow} px-8 py-3.5 font-semibold text-start`,
  refresh: `${base} ${navy.solid} px-4 py-2 mt-5`,
  reload: `${base} ${navy.solid} ${grow} flex gap-2 items-center w-38 px-5 py-2 text-xl`,
  catalog: `${base} ${navy.outline} ${grow} w-38 py-2 text-xl`,

  // wine
  useProduct: `${base} ${wine.solid} ${grow} w-full py-5 font-semibold text-center uppercase tracking-wider text-sm shadow-md`,
  addToCart: `${base} ${wine.solid} ${grow} w-full font-semibold text-sm py-5 font-[Montserrat] lg:block`,
  addToOrder: `${base} ${wine.solid} ${grow} w-full font-semibold py-4 mt-8`,
  checkOut: `${base} ${wine.solid} w-full font-semibold text-start px-3 py-2 text-sm sm:w-[300px] sm:ml-auto md:w-[365px] lg:w-[195px] xl:w-[246px]`,
  useOrder: `${base} ${wine.solid} ${grow} w-fit h-fit px-15 py-5 font-medium text-sm text-start`,
  replaceAndReview: `${base} ${wine.solid} ${grow} text-center py-4 px-6 font-semibold`,
  viewMyOrders: `${base} ${wine.solid} ${grow} w-87 py-3 font-medium`,
  useItemOrder: `${base} ${wine.outline} ${grow} h-fit w-35 py-3 font-medium text-sm text-center`,
  paymentSuccess: `${base} ${wine.outline} ${grow} w-87 py-3 font-medium`,
  'editAddress&Card': `${base} ${wine.solid} ${grow} w-56 py-4 ml-auto`,

  // gold
  exitClose: `${base} ${gold.solid} ${grow} w-fit h-fit ml-auto px-10 py-2 font-medium text-xs text-start`,
  stackInfo: `${base} ${gold.solid} w-fit h-fit ml-auto px-20 py-4 font-medium text-start`,

  // ink
  acceptStatus: `${baseSquare} ${ink.solid} w-full py-2.5 text-lg`,
  sellerItemDetails: `${baseSquare} ${ink.outline} w-38 py-2.5 text-lg`,
  loadReviews: `${base} ${ink.soft} ${grow} w-150 p-2.5 font-semibold`,
  profileMenu: `${base} ${ink.link} ${grow} block px-4 py-2 text-sm`,
  outOfStack: `${base} ${ink.disabled} w-full py-4 font-semibold`,

  // status
  cancel: `${base} ${status.danger} ${grow} text-center w-28 py-3.5 font-medium text-xs`,
  confirm: `${base} ${status.success} ${grow} text-center w-28 py-3.5 font-medium text-xs`,

  // особая:
  closeNotify: `absolute top-3 right-3 flex h-7 w-7 cursor-pointer items-center justify-center text-white/60 transition-colors hover:text-white`,
};