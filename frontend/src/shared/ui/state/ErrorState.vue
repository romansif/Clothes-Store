<template>
  <section :class="stateSectionClass">
    <div :class="stateBoxVariantClass[props.variant]">
      <img :src="errorImage" alt="" />
      <div :class="stateBoxMessageClass">
        <h1 :class="stateTitleClass">{{ t(errorStateMessage[props.variant].title) }}</h1>
        <p :class="stateTextClass">{{ t(errorStateMessage[props.variant].text) }}</p>
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
<<<<<<<< HEAD:frontend/src/shared/ui/state/ErrorState.vue
} from "@/shared/ui/state/state.variants";
import { errorImage, errorStateMessage, stateRoute, stateRouteMessage } from "@/shared/ui/state/state-messages";
import { UiButton } from "@/shared/ui/button";
import type { PageVariant } from "@/shared/ui/state/index";
========
} from "@/shared/ui/state/model/state.variants";
import { errorImage, errorStateMessage, stateRoute, stateRouteMessage } from "@/shared/ui/state/model/state-messages";
import { UiButton } from "@/shared/ui/button";
import type { PageVariant } from "@/shared/ui/state";
>>>>>>>> origin/master:frontend/src/shared/ui/state/ui/ErrorState.vue

const props = defineProps<{
  variant: PageVariant;
  loading: boolean;
}>();

const emit = defineEmits<{
  reload: [];
}>();

const { t } = useI18n();
</script>
