<template>
  <li class="mt-5 flex h-fit flex-col rounded-xl border border-gray-200 p-2 shadow-lg">
    <div class="flex flex-col gap-5">
      <div class="flex">
        <span class="text-sm font-semibold">
          {{ t("checkout.item.address") }} <span class="font-normal">{{ props.address.address }}</span>
        </span>
        <img
          @click="emit('deleteAddress', t('confirm.deleteAddress'), 'DELETE_SAVED_ADDRESS', props.address.id)"
          :src="del"
          alt=""
          class="ml-auto w-5 cursor-pointer transition duration-400 hover:scale-120"
        />
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
import type { UserContactInfo } from "@/entities/user-address";

import del from "@/assets/icons/delete-close/delete.svg";

const props = defineProps<{
  address: UserContactInfo;
}>();

const emit = defineEmits<{
  deleteAddress: [title: string, type: string, id: string];
}>();

const { t } = useI18n();
</script>
