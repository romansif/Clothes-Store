import { useOrderData } from "@/widgets/order-list/lib/use-order-data";
import { orderStore } from "@/shared/model/order.store";

const { items } = orderStore();

export const orderItems = () => {
    const { orders } = useOrderData();
    if (!orders.value) return;

    return orders.value.flatMap((order) => order.orderItems || []);
};

export const checkoutOrderPreview = (id: string, type: string) => {
    if (!id || !type) {
        throw new Error("Id или тип не найден");
    }

    const sourceList = type === "ADD" ? items.value : orderItems();
    const order = sourceList?.find((p) => p.id === id);

    if (order && order.images && order.images[0]) {
        return `${import.meta.env.VITE_SERVER_URL}/${order.images[0]}`;
    }
};
