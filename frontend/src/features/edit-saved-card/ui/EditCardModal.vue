<template>
  <div>
    <div
        class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        @click="closeEditCard"
    >
      <div @click.stop class="flex h-fit w-100 flex-col rounded-xl bg-white p-5">
        <UiButton :name="t('common.exit')"
                  variant="exitClose"
                  @click="closeEditCard" />
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="text-2xl font-bold">{{ t("profile.modal.editCard") }}</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              {{ t("profile.modal.editCardHint") }}
            </span>
          </div>
        </div>
        <EditCardForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { closeEditCard } from "@/features/edit-saved-card/lib/toggle-edit-card";
import { UiButton } from "@/shared/ui/button";
import { EditCardForm } from "@/features/edit-saved-card";

const { t } = useI18n()
</script>

