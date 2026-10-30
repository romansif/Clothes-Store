<template>
    <section :class="stateBoxVariantClass[props.variant]">
        <img :src="errorImage" alt="" />
        <div :class="stateBoxMessageClass">
            <h1 :class="stateTitleClass">{{ errorStateMessage[props.variant].title }}</h1>
            <p :class="stateTextClass">{{ errorStateMessage[props.variant].text }}</p>
        </div>
        <div :class="buttonBoxClass">
            <UiButton name="reload" variant="reload" @click="emit('reload')">
              <span :class="{ 'animate-[spin_0.5s_linear_infinite]': props.loading }">↻</span>
              <span>reload</span>
            </UiButton>
            <router-link
                v-if="stateRoute[props.variant]"
                :to="{ name: stateRoute[props.variant] }"
                :class="stateRouteClass[props.variant]"
            >
                <UiButton :name="stateRouteMessage[props.variant]" variant="catalog" />
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import {
    buttonBoxClass,
    stateBoxMessageClass,
    stateBoxVariantClass,
    stateRouteClass,
    stateTextClass,
    stateTitleClass,
} from "@/widgets/state/model/state.variants";
import {
    errorImage,
    errorStateMessage,
    stateRoute,
    stateRouteMessage,
} from "@/widgets/state/model/state.mock";
import { UiButton } from "@/shared/ui/button";
import type { PageVariant } from "@/widgets/state";

const props = defineProps<{
    variant: PageVariant;
    loading: boolean
}>();

const emit = defineEmits<{
  reload: [];
}>();
</script>
