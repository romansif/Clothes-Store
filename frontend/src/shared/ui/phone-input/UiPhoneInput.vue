<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-3 sm:flex-row">
      <select v-model="selectedCountryCode" :class="props.selectClass">
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
      <IMask v-model:value="model"
             :mask="currentMask.mask"
             :key="selectedCountryCode"
             :class="props.inputClass"
             :placeholder="currentCountry?.placeholder"
             v-bind="$attrs" />
    </div>
    <span v-if="props.errorMessage" class="text-red-600 text-xs">
      {{ props.errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneInput } from "@/shared/ui/phone-input/use-phone-input";
import { countries, selectedCountryCode } from "@/shared/ui/phone-input/phone-input.values";
import type { PhoneInputProps } from "@/shared/ui/phone-input";

const props = defineProps<PhoneInputProps>()

const model = defineModel<string | number>();

const { currentCountry, currentMask } = usePhoneInput();
</script>