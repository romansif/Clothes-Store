import type { OrderPosition, OrderProps, SellerOrderItem } from "@/entities/order";

const baseOrderStatus = "font-medium text-sm px-4 py-0.5 rounded-xl text-center w-26";

export const orderStatus = (order: OrderProps | OrderPosition | SellerOrderItem) => [
    baseOrderStatus,
    {
      "bg-teal-100 text-teal-900": order.status === "Delivered",
      "bg-sky-100 text-sky-900": order.status === "En route",
      "bg-indigo-100 text-indigo-900": order.status === "Convene",
      "bg-rose-100 text-rose-900": order.status === "Cancelled",
    },
];


