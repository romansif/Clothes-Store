<template>
  <div>
    <div
      class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      @click="closeEditAddress"
    >
      <div @click.stop class="flex h-fit w-200 flex-col rounded-xl bg-white p-5">
        <UiButton :name="t('common.exit')" variant="exitClose" @click="closeEditAddress" />
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="text-2xl font-bold">{{ t("profile.modal.editAddress") }}</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              {{ t("profile.modal.editAddressHint") }}
            </span>
          </div>
        </div>
        <EditAddressForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { closeEditAddress } from "@/features/edit-saved-address";
import { UiButton } from "@/shared/ui/button";
import { EditAddressForm } from "@/features/edit-saved-address";

const { t } = useI18n();
</script>
