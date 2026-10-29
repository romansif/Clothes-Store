import { computed } from "vue";
import { shippingMethods } from "@/shared/ui/shipping-method/shipping-method.config";
import type { ShippingInputProps } from "@/shared/ui/shipping-method";

export const useShippingMethod = (props: ShippingInputProps) => {
    const methods = computed(() => {
        return shippingMethods[props.method];
    });

    return {
        methods,
    };
};
