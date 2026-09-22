<template>
  <div @click="toggleReplaceChoice('')" class="font-montserrat fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
      flex items-center justify-center">
    <div @click.stop class="flex flex-col gap-2 bg-white w-175 h-fit rounded-xl p-5">
      <BaseButton @click="toggleReplaceChoice"
                  name="Exit"
                  variant="exitClose" />
      <div class="flex flex-col gap-4 border-b pb-4">
        <h1 class="font-bold text-2xl">
          REPLACEMENT OF ORDER
        </h1>
        <span class="text-sm text-[#A3A3A3]">
          Select the reason why you want to cancel the order
        </span>
      </div>
      <form @submit.prevent="replaceOrder" class="flex flex-col items-start gap-3.5">
        <ReplacementForm />
        <div class="flex ml-auto">
          <BaseButton type="submit" name="Replacement" variant="replaceAndReview" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toggleReplaceChoice } from "@/features/use-order/lib/order-modal.ts";
import { useDeleteOrder } from "@/features/use-order/api/delete-order.ts";
import { refClearErrorsOnChange } from "@/shared/lib/helper/errors-helper.ts";
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/order/model/order.forms.ts";

import BaseButton from "@/shared/ui/base/BaseButton.vue";
import ReplacementForm from "@/entities/order/ui/ReplacementForm.vue";

const { replaceOrder } = useDeleteOrder();

refClearErrorsOnChange(
    cancelChoiceForm,
    cancelChoiceMessage
)
</script>

<style scoped>

</style>