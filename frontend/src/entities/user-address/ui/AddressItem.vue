<template>
  <TransitionGroup name="list" mode="out-in">
    <li :key="address.id" class="flex flex-col mt-5 border border-gray-200 rounded-xl shadow-lg p-2">
      <div class="flex flex-col gap-5">
        <div class="flex">
          <span class="text-sm font-semibold">
            Address: <span class="font-normal">{{ address.address }}</span>
          </span>
          <img @click="toggleDeleteChoice(
              'Are you sure you want to delete this saved address?', 'DELETE_SAVED_ADDRESS', address.id)"
               :src="del" alt="" class="w-5 ml-auto transition duration-400 hover:scale-120">
        </div>
        <div class="flex gap-5">
          <span class="text-sm font-semibold">
            Country: <span class="font-normal">{{ address.country }},</span>
          </span>
          <span class="text-sm font-semibold">
            City: <span class="font-normal">{{ address.city }}</span>
          </span>
        </div>
        <span v-if="address.addressName" class="text-sm font-semibold">
          Address Name: <span class="font-normal">{{ address.addressName }},</span>
        </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type {UserContactInfo} from "@/entities/checkout-contact-info/model/address.types.ts";

defineProps<{
  address: UserContactInfo
}>();

const emit = defineEmits<{
  deleteAddress: [title: string, type: string, id: string];
}>();

const toggleDeleteChoice = (title: string, type: string, id: string) => {
  emit('deleteAddress', title, type, id);
};

import del from "@/assets/icons/delete-close/del_address_card.svg";
</script>

<style scoped>

</style>