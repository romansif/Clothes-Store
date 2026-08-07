import { computed } from "vue";
import router from "@/app/router";
import { usersStore } from "@/shared/composables/stores/users.store";
import { productsStore } from "@/shared/composables/stores/products.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { checkoutErrors } from "@/shared/composables/errors/errors-messages/checkout.errors";

const { user } = usersStore();
const { isAgreeForm } = checkoutForms();
const { isAgreeFormError } = checkoutErrors();
const { cart, favorite, orderItems, colors, sizes } = productsStore();

export const profile = () => {
    const continueToOrder = async () =>  {
        try{
            if(!isAgreeFormError.value.agreeError || !orderItems.value?.length) {
                isAgreeForm.value.agreeMessage = 'You must agree to the Terms and Conditions';
                return;
            }else{
                isAgreeForm.value.agreeMessage = '';
                isAgreeFormError.value.agreeError = false;

                await router.push({ name: 'information' });
            }
        }catch(err){
            console.error(`Failed to go the create order:`, err);
        }
    };

    const colorClass = (colorName: string) => {
        const target = colors.find(c => c.name === colorName);
        return target ? target.color : 'bg-transparent';
    };

    const sizeUrl = (sizeName: string) => {
        const target = sizes.find(s => s.name === sizeName);
        return target ? target.url : 'bg-transparent';
    };

    const sizeClass = (sizeName: string) => {
        const target = sizes.find(s => s.name === sizeName);
        return target ? target.class : 'bg-transparent';
    };

    const toggleAgree= () => {
        isAgreeFormError.value.agreeError = !isAgreeFormError.value.agreeError;
    };

    const userAvatar = computed(() => {
        if(user.value && user.value.avatarUrl){
            return `${import.meta.env.VITE_BASE_URL}/${user.value.avatarUrl}`
        }
    });

    const cartCount = computed(() => {
        return cart.value.length;
    });

    const favoritesCount = computed(() => {
        return favorite.value.length;
    });

    const price = computed(() => {
        return orderItems.value.reduce(
            (sum, item) => sum + item.price, 0
        );
    });

    const totalPrice = computed(() => {
        return orderItems.value.reduce(
            (sum, item) => sum + item.price + commissionPrice.value, 0
        );
    });

    const commissionPrice = computed(() => {
        return Math.round(orderItems.value.reduce(
            (sum, item) => sum + item.price, 0) * 0.08
        );

    });

    return{
        continueToOrder,
        colorClass,
        sizeUrl,
        sizeClass,

        userAvatar,
        cartCount,
        favoritesCount,
        toggleAgree,
        price,
        totalPrice,
        commissionPrice,
    }
}