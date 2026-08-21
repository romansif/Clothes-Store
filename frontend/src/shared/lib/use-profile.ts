import { computed } from "vue";
import router from "@/app/router";
import { usersStore } from "@/feature/profile/model/users.store.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
import { checkoutForms } from "@/feature/checkout/model/checkout.forms.ts";
import { checkoutErrors } from "@/feature/checkout/lib/checkout.errors.ts";
import { cartStore } from "@/feature/cart/model/cart.store.ts";
import { favoriteStore } from "@/feature/favorite/model/favorite.store.ts";
import { orderStore } from "@/feature/orders/model/order.store.ts";

const { cart } = cartStore();
const { user } = usersStore();
const { sizes } = productStore();
const { orderItems } = orderStore();
const { favorite } = favoriteStore();
const { isAgreeForm } = checkoutForms();
const { isAgreeFormError } = checkoutErrors();

export const useProfile = () => {
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

    const sizeUrl = (sizeName: string) => {
        const target = sizes.value.find(s => s.name === sizeName);
        return target ? target.url : 'bg-transparent';
    };

    const sizeClass = (sizeName: string) => {
        const target = sizes.value.find(s => s.name === sizeName);
        return target ? target.class : 'bg-transparent';
    };

    const toggleAgree= () => {
        isAgreeFormError.value.agreeError = !isAgreeFormError.value.agreeError;
    };

    const userAvatar = computed(() => {
        if(!user.value || !user.value.avatarUrl){
           return '@/app/assets/photos/default-avatar.png'
        }

        const url = user.value.avatarUrl;

        if(url.startsWith('http://') || url.startsWith('https://')){
            return url;
        }

        return `${import.meta.env.VITE_BASE_URL}/${user.value.avatarUrl}`
    });

    const cartCount = computed(() => {
        return cart.value.length;
    });

    const favoritesCount = computed(() => {
        return favorite.value.length;
    });

    const price = computed(() => {
        return orderItems.value.reduce(
            (sum, item) => sum + item.price, 0);
    });

    const commissionPrice = computed(() => {
        return Math.round(orderItems.value.reduce(
            (sum, item) => sum + item.price, 0) * 0.08
        );
    });

    const totalPrice = computed(() => {
        return orderItems.value.reduce(
            (sum, item) => sum + item.price + commissionPrice.value, 0
        );
    });


    return{
        continueToOrder,
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