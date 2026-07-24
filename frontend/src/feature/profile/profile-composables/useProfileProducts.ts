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
        isAgreeFormError.value.agreeError = !isAgreeFormError.value.agreeError
    }

    const continueToOrder = async () => {
        if(!isAgreeFormError.value.agreeError){
            isAgreeForm.value.agreeMessage = 'You must agree to the Terms and Conditions'
        }else{
            isAgreeForm.value.agreeMessage = ''
            isAgreeFormError.value.agreeError = !isAgreeFormError.value.agreeError

            await router.push({ name: '/checkout/InformationPage' })
        }
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
