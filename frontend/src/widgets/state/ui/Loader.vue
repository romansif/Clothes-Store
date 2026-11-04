<template>
  <div :class="loaderSectionClass">
    <div :class="loaderBoxVariantClass[props.variant]">
      <div :class="loaderItemsClass">
        <img :src="spinner" alt="" class="h-12 w-12" />
        <p class="font-medium text-[#4b5563]">{{ t("common.loading") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { loaderBoxVariantClass, loaderItemsClass, loaderSectionClass } from "@/widgets/state/model/state.variants";
import type { PageVariant } from "@/widgets/state";

import spinner from "@/assets/icons/app/spinner.svg";

const props = defineProps<{
  variant: PageVariant;
}>();

const { t } = useI18n();
</script>
