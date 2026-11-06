<template>
  <section :class="stateSectionClass">
    <div :class="stateBoxVariantClass[props.variant]">
      <img :src="emptyImage" alt="" />
      <div :class="stateBoxMessageClass">
        <h1 :class="stateTitleClass">{{ t(emptyStateMessage[props.variant].title) }}</h1>
        <p :class="stateTextClass">{{ t(emptyStateMessage[props.variant].text) }}</p>
      </div>
      <div :class="buttonBoxClass">
        <UiButton :name="t('common.reload')" variant="reload" @click="emit('reload')">
          <span :class="{ 'animate-[spin_0.5s_linear_infinite]': props.loading }">↻</span>
          <span>{{ t("common.reload") }}</span>
        </UiButton>
        <router-link
          v-if="stateRoute[props.variant]"
          :to="{ name: stateRoute[props.variant] }"
          :class="stateRouteClass[props.variant]"
        >
          <UiButton :name="t(stateRouteMessage[props.variant])" variant="catalog" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import {
  buttonBoxClass,
  stateBoxMessageClass,
  stateBoxVariantClass,
  stateRouteClass,
  stateSectionClass,
  stateTextClass,
  stateTitleClass,
} from "@/widgets/state/model/state.variants";
import { stateRoute, emptyStateMessage, emptyImage, stateRouteMessage } from "@/widgets/state/model/state-messages";
import type { PageVariant } from "@/widgets/state";
import { UiButton } from "@/shared/ui/button";

const props = defineProps<{
  variant: PageVariant;
  loading: boolean;
}>();

const emit = defineEmits<{
  reload: [];
}>();

const { t } = useI18n();
</script>
