import { type Order } from "@/features/use-order/model/order.types.ts";
import { reviewForm } from "@/features/use-order/model/order.forms.ts";

export const ordersClasses = () => {
    const orderStatus = (order: Order) => [
        {
            'bg-teal-50 text-teal-700 border border-teal-200 w-19.5' : order.status === 'Delivered',
            'bg-sky-50 text-sky-700 border border-sky-200 w-18.5' : order.status === 'En route',
            'bg-indigo-50 text-indigo-700 border border-indigo-200 w-18' : order.status === 'Convene',
            'bg-rose-50 text-rose-700 border border-rose-200 w-19.5' : order.status === 'Cancelled',
        }
    ];

    const ratingStar = (rating: number) => [
        'w-12 transition duration-400',
        rating <= reviewForm.value.rating ? 'scale-145' : reviewForm.value.rating === rating - 0.5 ? 'scale-145' : 'hover:scale-120'
    ]

    return {
        orderStatus,
        ratingStar
    }
}