<template>
  <section :class="stateBoxVariantClass[props.box.variant]">
    <img :src="errorImage" alt="" >
    <div :class="stateBoxMessageClass">
      <h1 :class="stateTitleClass">{{ emptyStateMessage[props.box.variant].title }}</h1>
      <p :class="stateTextClass">{{ emptyStateMessage[props.box.variant].text }}</p>
    </div>
    <div :class="buttonBoxClass">
      <UiButton name="reload"
                variant="reload" />
      <router-link :to="{ name: stateRoute[props.box.variant] }" :class="stateRouteClass[props.box.variant]">
        <UiButton :name="stateRouteMessage[props.box.variant]"
                  variant="catalog" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  buttonBoxClass,
  stateBoxMessageClass,
  stateBoxVariantClass, stateRouteClass,
  stateTextClass,
  stateTitleClass
} from "@/widgets/state/model/state.variants";
import { emptyStateMessage, errorImage, stateRoute, stateRouteMessage } from "@/widgets/state/model/state.mock";
import { UiButton } from "@/shared/ui/button";
import type { StateVariantProps } from "@/widgets/state";

const props = defineProps<{
  box: StateVariantProps
}>()
</script>
