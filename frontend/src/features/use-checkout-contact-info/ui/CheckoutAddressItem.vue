<template>
  <TransitionGroup name="list">
    <li @click="useSavedAddress(address)" :key="address.id"
        :class="getSavedInfoClass(isChosenAddress)">
      <div class="flex flex-col gap-5">
        <div class="flex">
          <span class="text-sm font-semibold">
            Address: <span class="font-normal">{{ address.address }}</span>
          </span>
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
import { useAddAddress } from "@/features/use-checkout-contact-info/api/add-address.ts";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle-contact-info.ts";
import type {UserContactInfo} from "@/entities/checkout-contact-info/model/address.types.ts";

defineProps<{
  address: UserContactInfo;
}>();

const { useSavedAddress } = useAddAddress();
const { isChosenAddress } = toggleInformation();
const { getSavedInfoClass } = checkoutClasses();
</script>

<style scoped>

</style>