import { type Order } from "@/entities/order";

const baseOrderStatus = 'text-xs px-2.5 py-1 rounded-md'

export const ordersVariants = () => {
    const orderStatus = (order: Order) => [
        baseOrderStatus,
        {
            'bg-teal-50 text-teal-700 border border-teal-200 w-19.5' : order.status === 'Delivered',
            'bg-sky-50 text-sky-700 border border-sky-200 w-18.5' : order.status === 'En route',
            'bg-indigo-50 text-indigo-700 border border-indigo-200 w-18' : order.status === 'Convene',
            'bg-rose-50 text-rose-700 border border-rose-200 w-19.5' : order.status === 'Cancelled',
        }
    ];

    return {
        orderStatus,
    }
}