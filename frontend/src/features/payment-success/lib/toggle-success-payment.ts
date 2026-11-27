import { useResetCartSelection } from "@/features/cart-item-action";
import { resetCheckoutSession } from "@/entities/checkout-session";
import { queryClient } from "@/shared/api";

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
