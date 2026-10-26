import { computed } from "vue";
import router from "@/app/router";
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import { orderStore } from "@/shared/model/order.store";
import { isAgreeFormError, isAgreeFormErrorMessage } from "@/entities/product-info/model/add-to-cart-form";
import type { CartItem } from "@/entities/cart-item";

const { cart } = cartStore();
const { orderItems } = orderStore();

export const useCartOrderInfo = () => {
    const checkedItems = computed(() => {
        return cart.value.filter((item: CartItem) => item.checked);
    });

    const price = computed(() => {
        return checkedItems.value.reduce(
            (sum: number, item: CartItem) => sum + item.price,
            0
        );
    });

    const commissionPrice = computed(() => {
        return Math.round(price.value * 0.08);
    });

    const totalPrice = computed(() => {
        return price.value + commissionPrice.value;
    });

    const toggleAgree= () => {
        isAgreeFormError.value.agree = !isAgreeFormError.value.agree;
    };

    const continueToOrder = async () =>  {
        try{
            if(!isAgreeFormError.value.agree && !orderItems.value?.length){
                isAgreeFormErrorMessage.value.agree = 'You must select the items for your order, agree to the Terms and Conditions';
                return;
            }else if(!isAgreeFormError.value.agree) {
                isAgreeFormErrorMessage.value.agree = 'You must agree to the Terms and Conditions';
                return;
            }else if(!orderItems.value?.length){
                isAgreeFormErrorMessage.value.agree = 'You must select the items for your order';
                return ;
            }else{
                isAgreeFormErrorMessage.value.agree = '';
                isAgreeFormError.value.agreeMessage = false
                await router.push({ name: 'information' });
            }
        }catch(err){
            console.error(`Failed to go the create order:`, err);
        }
    };

    return {
        price,
        commissionPrice,
        totalPrice,
        toggleAgree,
        continueToOrder,
    }
}