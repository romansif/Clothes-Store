<template>
  <Transition name="view">
    <ul v-horizontal-scroll class="font-raleway flex gap-5 mt-5 overflow-x-auto whitespace-nowrap no-scrollbar pt-5">
      <SeasonItem v-if="isSeasonal" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import SeasonItem from "@/entities/collection/SeasonItem.vue";

const { vHorizontalScroll } = productsCover();

import { computed } from "vue";
import { useRoute } from "vue-router";
import { productsCover } from "@/features/use-product/model/use-product.ts";

const route = useRoute();

const isSeasonal = computed(() => route.name === 'shop/seasonal-collections')
</script>

<style scoped>

</style>