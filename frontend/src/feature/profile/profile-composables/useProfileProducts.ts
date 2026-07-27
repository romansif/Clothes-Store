import { computed } from "vue";
import router from "../../../app/router";
import { checkoutErrors } from "../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";
import { productsStore } from "../../../shared/composables/stores/products.store.ts";
import { checkoutForms } from "../../../shared/composables/forms-composables/forms/checkout.forms.ts";

const { isAgreeForm } = checkoutForms();
const { isAgreeFormError } = checkoutErrors();
const { orderItems, colors, sizes } = productsStore();

export const useProfileProducts = () => {
    const toggleAgree = () => {
        isAgreeFormError.value.agreeError = !isAgreeFormError.value.agreeError;
    }

    const colorClass = (colorName: string) => {
        const target = colors.find(c => c.name === colorName)
        return target ? target.color : 'bg-transparent'
    }

    const sizeUrl = (sizeName: string) => {
        const target = sizes.find(s => s.name === sizeName)
        return target ? target.url : 'bg-transparent'
    }

    const sizeClass = (sizeName: string) => {
        const target = sizes.find(s => s.name === sizeName)
        return target ? target.class : 'bg-transparent'
    }

    const price = computed(() => {
        return orderItems.value.reduce((sum, item) => sum + item.price, 0);
    })

    const totalPrice = computed(() => {
        return orderItems.value.reduce((sum, item) => sum + item.price + commissionPrice.value, 0);
    })

    const commissionPrice = computed(() => {
        return Math.round(orderItems.value.reduce((sum, item) => sum + item.price + 5, 0) * 0.03)
    })

    const continueToOrder = async () => {
        try{
            if(!isAgreeFormError.value.agreeError || !orderItems.value?.length) {
                isAgreeForm.value.agreeMessage = 'You must agree to the Terms and Conditions';
                return
            }else{
                isAgreeForm.value.agreeMessage = '';
                isAgreeFormError.value.agreeError = false;

                await router.push({ name: '/checkout/InformationPage' });
            }
        }catch(error){
            console.log(error)
        }
    }

    return{
        toggleAgree,
        continueToOrder,

        colorClass,
        sizeClass,
        sizeUrl,

        price,
        totalPrice,
        commissionPrice,
    }
}
