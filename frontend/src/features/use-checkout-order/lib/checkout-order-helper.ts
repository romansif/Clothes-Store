import { orderStore } from "@/features/use-order/model/order.store.ts";

const { orders, items } = orderStore();

const orderItems = () => {
    if(!orders.value) return;

    return orders.value.flatMap(order => order.orderItems || []);
};

export const orderPreview = (id: string, type: string) => {
    if(!id || !type){
        console.log('Id или тип не найден');
        return;
    }

    const sourceList = type === 'ADD' ? items.value : orderItems();
    const order = sourceList?.find(p => p.id === id);

    if(order && order.images && order.images[0]){
        return `${import.meta.env.VITE_BASE_URL}/${order.images[0]}`;
    }

};