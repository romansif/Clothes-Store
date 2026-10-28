import { computed } from "vue";
import { useUnCheckCartItem } from "@/widgets/favorite-cart-header/api/update-cart";
import type { RouteLocationNormalizedLoaded, Router } from "vue-router";

export const useCheckoutHeader = (route: RouteLocationNormalizedLoaded, router: Router) => {
    const { unCheckCartItem } = useUnCheckCartItem()

    const goBack = async () => {
        if(route.name === 'information') {
            await unCheckCartItem()
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