import { computed } from "vue";
import { shippingMethods } from "@/shared/ui/shipping-method/shipping-method.config.ts";
import type { ShippingInputProps } from "@/shared/ui/shipping-method/shipping-method.types.ts";

export const useShippingMethod = (props: ShippingInputProps) => {
    const methods = computed(() => {
        return shippingMethods[props.method];
    });

    return {
        methods,
    }
}