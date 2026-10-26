import { orderStore } from "@/shared/model/order.store";

const { orders, items } = orderStore();

export const orderItems = () => {
    if(!orders.value) return;

    return orders.value.flatMap(order => order.orderItems || []);
};

export const checkoutOrderPreview = (id: string, type: string) => {
    if(!id || !type){
        console.log('Id или тип не найден');
        return;
    }

    const sourceList = type === 'ADD' ? items.value : orderItems();
    const order = sourceList?.find(p => p.id === id);

    if(order && order.images && order.images[0]){
        return `${import.meta.env.VITE_SERVER_URL}/${order.images[0]}`;
    }
};