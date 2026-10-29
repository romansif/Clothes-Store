<template>
    <div class="flex flex-col gap-3">
        <div
            :class="[
                shippingMethod.default,
                model === methods.method ? shippingMethod.checked : '',
                errorMessage ? shippingMethod.error : '',
            ]"
        >
            <div class="flex items-center gap-3">
                <input
                    v-model="model"
                    :value="methods.method"
                    type="radio"
                    class="h-4 w-4 accent-black"
                    name="shipping-method"
                />
                <div class="flex flex-col gap-1">
                    <span class="font-semibold">
                        {{ methods.title }}
                    </span>
                    <span class="text-xs text-gray-500">
                        {{ methods.text }}
                    </span>
                </div>
            </div>
            <span class="text-sm">
                {{ methods.price }}
            </span>
        </div>
        <span v-if="errorMessage" class="text-xs text-red-500">
            {{ errorMessage }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { useShippingMethod } from "@/shared/ui/shipping-method/use-shipping-method";
import { shippingMethod } from "@/shared/ui/shipping-method/shipping-method.variants";
import type { ShippingInputProps } from "@/shared/ui/shipping-method";

const props = defineProps<ShippingInputProps>();

const model = defineModel<string | number>();

const { methods } = useShippingMethod(props);
</script>

<style scoped></style>
