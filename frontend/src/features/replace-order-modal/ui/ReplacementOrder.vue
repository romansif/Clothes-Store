<template>
  <div
    class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    @click="closeReplaceOrder"
  >
    <div @click.stop class="flex h-fit w-175 flex-col gap-2 rounded-xl bg-white p-5">
      <UiButton :name="t('common.exit')" variant="exitClose" @click="closeReplaceOrder" />
      <div class="flex flex-col gap-4 border-b pb-4">
        <h1 class="text-2xl font-bold">{{ t("profile.modal.replacement") }}</h1>
        <span class="text-sm text-[#A3A3A3]">
          {{ t("profile.modal.replacementHint") }}
        </span>
      </div>
      <ReplacementForm @submit.prevent="replaceOrder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { closeReplaceOrder } from "@/entities/order-action";
import { useReplaceOrder } from "@/features/order-action";
import { refClearErrorsOnChange } from "@/shared/lib";
import { cancelChoiceForm, cancelChoiceMessage } from "@/features/order-action";
import { ReplacementForm } from "@/features/order-action";
import { UiButton } from "@/shared/ui/button";

const { t } = useI18n();
const { replaceOrder } = useReplaceOrder();

refClearErrorsOnChange(cancelChoiceForm, cancelChoiceMessage);
</script>
