<template>
  <div class="flex flex-col gap-3">
    <div
      :class="[
        SHIPPING_METHOD_VARIANTS.default,
        model === methods.method ? SHIPPING_METHOD_VARIANTS.checked : '',
        errorMessage ? SHIPPING_METHOD_VARIANTS.error : '',
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
            {{ t(methods.title) }}
          </span>
          <span class="text-xs text-gray-500">
            {{ t(methods.text) }}
          </span>
        </div>
      </div>
      <span class="text-sm">
        {{ t(methods.price) }}
      </span>
    </div>
    <span v-if="errorMessage" class="text-xs text-red-500">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useShippingMethod } from "@/shared/ui/shipping-method/use-shipping-method";
import { SHIPPING_METHOD_VARIANTS } from "@/shared/ui/shipping-method/shipping-method.variants";
import type { ShippingInputProps } from "@/shared/ui/shipping-method";

const props = defineProps<ShippingInputProps>();

const model = defineModel<string | number>();

const { t } = useI18n();
const { methods } = useShippingMethod(props);
</script>
