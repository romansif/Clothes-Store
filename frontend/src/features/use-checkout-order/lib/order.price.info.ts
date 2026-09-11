import {computed, ref} from "vue";
import {orderStore} from "@/features/use-order/model/order.store.ts";
import { shippingForm } from "@/features/use-shipping/model/shipping.form.ts";

const { items } = orderStore();

const deliveryPrice = ref<number>(0);

export const orderPriceInfo = () => {
    const price = computed(() => {
        return items.value.reduce(
            (sum, item) => sum + item.price, 0
        );
    });

    const commissionPrice = computed(() => {
        return Math.round(items.value.reduce(
            (sum, item) => sum + item.price, 0) * 0.08
        );
    });

    const ship = computed(() => {
        if(shippingForm.value.delivery === 'express'){
            deliveryPrice.value = 15;
        }else{
            deliveryPrice.value = 0;
        }
        return deliveryPrice.value || 0;
    });

    const totalPrice = computed(() => {
        return price.value + commissionPrice.value + ship.value
    });

    return {
        price,
        commissionPrice,
        ship,
        totalPrice,
    }
}