import { computed } from "vue";
import { orderStore } from "@/shared/model/order.store";
import { checkoutSession } from "@/entities/checkout-session/model/checkout-session";

const COMMISSION_RATE = 0.08;
const EXPRESS_PRICE = 15;
const round2 = (n: number) => Math.round(n * 100) / 100;

export const orderPriceInfo = () => {
    const { items } = orderStore();

    const price = computed(() =>
        items.value.reduce((sum, item) => sum + item.price, 0
    ));

    const commissionPrice = computed(() =>
        round2(price.value * COMMISSION_RATE)
    );

    const ship = computed(() =>
        (checkoutSession.delivery === "express" ? EXPRESS_PRICE : 0)
    );

    const totalPrice = computed(() =>
        round2(price.value + commissionPrice.value + ship.value)
    );

    return {
        price,
        commissionPrice,
        ship,
        totalPrice,
    };
};
