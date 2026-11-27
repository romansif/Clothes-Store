const baseOrderStatus = "font-medium text-sm px-4 py-1 rounded-xl text-center w-26";

export const orderStatusVariants = (status: string) => [
  baseOrderStatus,
  {
    "bg-teal-100 text-teal-900 border border-teal-900": status === "Delivered",
    "bg-sky-100 text-sky-900 border border-sky-900": status === "En Route",
    "bg-indigo-100 text-indigo-900 border border-indigo-900": status === "Convene",
    "bg-rose-100 text-rose-900 border border-rose-900": status === "Cancelled",
  },
];
