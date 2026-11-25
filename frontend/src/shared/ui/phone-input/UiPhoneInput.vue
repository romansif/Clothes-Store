<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-3 sm:flex-row">
      <select v-model="selectedCountryCode" :class="props.selectClass">
        <option v-for="country in COUNTRIES" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
      <IMask
        v-model:value="model"
        :mask="currentMask.mask"
        :key="selectedCountryCode"
        :class="[props.inputClass, props.errorMessage ? PHONE_INPUT_ERROR_CLASS : '']"
        :placeholder="currentCountry?.placeholder"
        v-bind="$attrs"
      />
    </div>
    <span v-if="props.errorMessage" class="text-xs text-red-600">
      {{ props.errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneInput } from "@/shared/ui/phone-input/use-phone-input";
import { PHONE_INPUT_ERROR_CLASS } from "@/shared/ui/phone-input/phone-input.variants";
import { COUNTRIES, selectedCountryCode } from "@/shared/ui/phone-input/phone-input.values";
import type { PhoneInputProps } from "@/shared/ui/phone-input";

const props = defineProps<PhoneInputProps>();

const model = defineModel<string | number>();

const { currentCountry, currentMask } = usePhoneInput();

watch(selectedCountryCode, () => {
  model.value = "";
});
</script>
