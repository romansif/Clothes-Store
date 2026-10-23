import { computed } from "vue";
import { updateCartChecked } from "@/widgets/favorite-cart-header/api/update-cart";
import type { RouteLocationNormalizedLoaded, Router } from "vue-router";

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