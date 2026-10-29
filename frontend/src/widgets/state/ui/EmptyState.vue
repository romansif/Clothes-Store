<template>
  <section :class="stateBoxVariantClass[props.box.variant]">
    <img :src="emptyImage" alt="" >
    <div :class="stateBoxMessageClass">
      <h1 :class="stateTitleClass">{{ emptyStateMessage[props.box.variant].title }}</h1>
      <p :class="stateTextClass">{{ emptyStateMessage[props.box.variant].text }}</p>
    </div>
    <router-link :to="{ name: stateRoute[props.box.variant] }" :class="stateRouteClass[props.box.variant]">
      <UiButton :name="stateRouteMessage[props.box.variant]"
                variant="catalog" />
    </router-link>
  </section>
</template>

<script setup lang="ts">
import {
  stateBoxMessageClass,
  stateBoxVariantClass, stateRouteClass,
  stateTextClass,
  stateTitleClass
} from "@/widgets/state/model/state.variants";
import { emptyStateMessage, emptyImage, stateRouteMessage, stateRoute } from "@/widgets/state/model/state.mock";
import { UiButton } from "@/shared/ui/button";
import type { StateVariantProps } from "@/widgets/state";

const props = defineProps<{
  box: StateVariantProps
}>()
</script>
