<template>
  <div class="flex flex-col gap-3 sm:flex-row">
    <select v-model="model" :class="props.selectClass">
      <option v-for="country in countries" :key="country.code" :value="country.code">
        {{ country.name }}
      </option>
    </select>
    <IMask v-model:value="model"
           :mask="currentMask.mask"
           :key="selectedCountryCode"
           :class="props.inputClass"
           :placeholder="currentCountry?.placeholder" />
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneInput } from "@/shared/ui/phone-input/use-phone-input.ts";
import { countries, selectedCountryCode } from "@/shared/ui/phone-input/phone-input.values.ts";
import type {PhoneInputProps} from "@/shared/ui/phone-input/phone-input.types.ts";

const props = defineProps<PhoneInputProps>()

const model = defineModel<string | number>();

const { currentCountry, currentMask } = usePhoneInput();
</script>