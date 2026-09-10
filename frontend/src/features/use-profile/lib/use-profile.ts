import { computed } from "vue";
import router from "@/app/router";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { productStore } from "@/features/use-product/model/product.store.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { checkoutErrors } from "@/features/use-checkout/lib/checkout.errors.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { favoriteStore } from "@/features/use-favorite/model/favorite.store.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";

const { cart } = cartStore();
const { user } = userStore();
const { sizes } = productStore();
const { orderItems } = orderStore();
const { favorite } = favoriteStore();
const { isAgreeForm } = checkoutForm();
const { isAgreeFormError } = checkoutErrors();

export const useProfile = () => {
    const checkedItems = computed(() => {
        return cart.value.filter(item => item.checked);
    });

    const continueToOrder = async () =>  {
        try{
            if(!isAgreeFormError.value.agreeError && !orderItems.value?.length){
                isAgreeForm.value.agreeMessage = 'You must select the items for your order, agree to the Terms and Conditions';
                return;
            }else if(!isAgreeFormError.value.agreeError) {
                isAgreeForm.value.agreeMessage = 'You must agree to the Terms and Conditions';
                return;
            }else if(!orderItems.value?.length){
                isAgreeForm.value.agreeMessage = 'You must select the items for your order';
                return ;
            }else{
                isAgreeForm.value.agreeMessage = '';
                isAgreeFormError.value.agreeMessageError = false
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
        return checkedItems.value.reduce(
            (sum, item) => sum + item.price,
            0
        );
    });

    const commissionPrice = computed(() => {
        return Math.round(price.value * 0.08);
    });

    const totalPrice = computed(() => {
        return price.value + commissionPrice.value;
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