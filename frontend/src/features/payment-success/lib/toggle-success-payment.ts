import { queryClient } from "@/shared/api/query-client";
import { resetCheckoutSession } from "@/entities/checkout-session";
import { useResetCartSelection } from "@/features/cart-item-action/api/reset-cart-selection";

export const closeSuccessFull = async () => {
    await queryClient.invalidateQueries({ queryKey: ["cart"] })
    const { resetSelection } = useResetCartSelection();

    resetCheckoutSession();

    sessionStorage.clear()
    localStorage.removeItem("orderItems");

    await resetSelection()
}