<template>
  <div
    class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    @click="closeReplaceItem()"
  >
    <div @click.stop class="flex h-fit w-175 flex-col gap-2 rounded-xl bg-white p-5">
      <UiButton :name="t('common.exit')" variant="exitClose" @click="closeReplaceItem()" />
      <div class="flex flex-col gap-4 border-b pb-4">
        <h1 class="text-2xl font-bold">{{ t("profile.modal.replacement") }}</h1>
        <span class="text-sm text-[#A3A3A3]">
          {{ t("profile.modal.replacementHint") }}
        </span>
      </div>
      <ReplacementForm @submit.prevent="replaceItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { useReplaceOrderItem } from "@/features/order-action/api/replace-order";
import { closeReplaceItem } from "@/entities/order-action/lib/order-modal";
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/replacement-form/model/order-forms";
import { ReplacementForm } from "@/entities/replacement-form";
import { UiButton } from "@/shared/ui/button";

const { t } = useI18n();
const { replaceItem } = useReplaceOrderItem();

refClearErrorsOnChange(cancelChoiceForm, cancelChoiceMessage);
</script>
