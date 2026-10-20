import { computed } from "vue";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";
import type {RouteLocationNormalizedLoaded, Router} from "vue-router";

const { updateCartChecked } = useUpdateCart();

export const useCheckoutHeader = (route: RouteLocationNormalizedLoaded, router: Router) => {
    const goBack = async () => {
        if(route.name === 'information') {
            await updateCartChecked()
        }

        router.back();
    };

    const isInfo = computed(() => route.name === 'information')
    const isShipping = computed(() => route.name === 'shipping')
    const isPayment = computed(() => route.name === 'payment')

    return {
        goBack,
        isInfo,
        isShipping,
        isPayment,
    }
}