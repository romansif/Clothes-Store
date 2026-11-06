import type { OrderPosition, OrderProps } from "@/entities/order";

const baseOrderStatus = "font-medium text-sm px-4 py-0.5 rounded-xl";

export const ordersVariants = () => {
  const orderStatus = (order: OrderProps | OrderPosition) => [
    baseOrderStatus,
    {
      "bg-teal-100 text-teal-900 w-26": order.status === "Delivered",
      "bg-sky-100 text-sky-900 w-26": order.status === "En route",
      "bg-indigo-100 text-indigo-900 w-22": order.status === "Convene",
      "bg-rose-100 text-rose-900 w-26": order.status === "Cancelled",
    },
  ];

  return {
    orderStatus,
  };
};
