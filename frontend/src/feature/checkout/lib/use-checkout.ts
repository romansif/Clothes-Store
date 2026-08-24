import router  from "@/app/router";
import { computed, ref } from "vue";
import { checkoutForm } from "@/feature/checkout/model/checkout.form.ts";
import { cartApi } from "@/feature/cart/api/cart.api.ts";
import { checkoutErrors } from "@/feature/checkout/lib/checkout.errors.ts";
import { orderStore } from "@/feature/order/model/order.store.ts";
import { checkoutStore } from "@/feature/checkout/model/checkout.store.ts";

const { items } = orderStore();
const { shipping } = checkoutForm();
const { updateCartChecked } = cartApi();
const { deliveryPrice, paymentMethod } = checkoutStore();
const { paymentErrors } = checkoutErrors();

const isDebitCard = ref<boolean>(false);

const isSavedAddress = ref<boolean>(false);

const isChosenAddress = ref<boolean>(false);
const isChosenContactInfo = ref<boolean>(false);

const informationId = ref<string>('');

const isSavedPayment = ref<boolean>(false);

const isChosenPayment = ref<boolean>(false);

const paymentId = ref<string>('');

export const useCheckout = () => {
    const openCardForm = (method: string) => {
        isDebitCard.value = true;
        paymentMethod.value = method;
        paymentErrors.value.paymentMethodError = false
    };

    const closeCardForm = (method: string) => {
        isDebitCard.value = false;
        paymentMethod.value = method
    };

    const toggleShowContact = () => {
        isSavedAddress.value = !isSavedAddress.value;
    };

    const toggleShowPayment = () => {
        isSavedPayment.value = !isSavedPayment.value;
    };

    const goBack = async () => {
        router.back();
        await updateCartChecked()
    };

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
        if(shipping.value.delivery === 'express'){
            deliveryPrice.value = 15;
        }else{
            deliveryPrice.value = 0;
        }
        return deliveryPrice.value || 0;
    });

    const totalPrice = computed(() => {
        return price.value + commissionPrice.value + ship.value
    });


    return{
        openCardForm,
        closeCardForm,

        toggleShowContact,
        toggleShowPayment,
        goBack,

        isDebitCard,

        isSavedAddress,
        isChosenAddress,
        isChosenContactInfo,
        informationId,

        isSavedPayment,
        isChosenPayment,
        paymentId,

        price,
        commissionPrice,
        ship,
        totalPrice
    }
}