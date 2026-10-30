import { computed } from "vue";

import type { ShippingInputProps } from "@/shared/ui/shipping-method";
import { shippingMethods } from "@/shared/ui/shipping-method/shipping-method.config";

export const useShippingMethod = (props: ShippingInputProps) => {
    const methods = computed(() => {
        return shippingMethods[props.method];
    });

    return {
        methods,
    };
};
