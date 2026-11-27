<template>
  <li class="font-dm-sans mt-5 flex h-fit flex-col rounded-xl border border-gray-200 p-2 shadow-lg">
    <div class="flex flex-col gap-5">
      <div class="flex justify-between">
        <span class="text-sm font-semibold">
          {{ t("checkout.item.address") }} <span class="font-normal">{{ props.address.address }}</span>
        </span>
        <div class="flex items-center gap-2.5">
          <img
            @click="emit('updateAddress', props.address.id)"
            :src="edit"
            alt=""
            class="w-5 cursor-pointer transition duration-400 hover:scale-110"
          />
          <img
            @click="emit('deleteAddress', t('confirm.deleteAddress'), 'DELETE_SAVED_ADDRESS', props.address.id)"
            :src="del"
            alt=""
            class="w-6 cursor-pointer transition duration-400 hover:scale-110"
          />
        </div>
      </div>
      <div class="flex gap-5">
        <span class="text-sm font-semibold">
          {{ t("checkout.item.country") }} <span class="font-normal">{{ props.address.country }},</span>
        </span>
        <span class="text-sm font-semibold">
          {{ t("checkout.item.city") }} <span class="font-normal">{{ props.address.city }}</span>
        </span>
      </div>
      <span v-if="props.address.addressName" class="text-sm font-semibold">
        {{ t("checkout.item.addressName") }} <span class="font-normal">{{ props.address.addressName }},</span>
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { UserContactInfo } from "@/shared/model";

import del from "@/assets/icons/delete-close/delete.svg";
import edit from "@/assets/icons/my-products/pencil.svg";

const props = defineProps<{
  address: UserContactInfo;
}>();

const emit = defineEmits<{
  deleteAddress: [title: string, type: string, id: string];
  updateAddress: [id: string];
}>();

const { t } = useI18n();
</script>
