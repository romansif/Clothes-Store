import { useResetCartSelection } from "@/features/cart-item-action/api/reset-cart-selection";
import { resetCheckoutSession } from "@/entities/checkout-session";
import { queryClient } from "@/shared/api/query-client";

export const closeSuccessFull = async () => {
  const { resetSelection } = useResetCartSelection();

  resetCheckoutSession();

  sessionStorage.clear();
  localStorage.removeItem("orderItems");

  await resetSelection();

  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["cart"] }),
    queryClient.invalidateQueries({ queryKey: ["products"] }),
    queryClient.invalidateQueries({ queryKey: ["orders"] }),
    queryClient.invalidateQueries({ queryKey: ["activeOrders"] }),
  ]);
};
