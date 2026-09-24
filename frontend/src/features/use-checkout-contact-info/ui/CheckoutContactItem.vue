<template>
  <TransitionGroup name="list">
    <li @click="useSavedContactInfo(address)" :key="address.id"
        :class="getSavedInfoClass(isChosenContactInfo)">
      <div class="flex flex-col gap-5">
          <span class="text-sm font-semibold">
            Phone: <span class="font-normal">{{ address.phone }},</span>
          </span>
          <span class="text-sm font-semibold">
            Email: <span class="font-normal">{{ address.email }}</span>
          </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useAddAddress } from "@/features/use-checkout-contact-info/api/add-address.ts";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";
import type {UserContactInfo} from "@/entities/checkout-contact-info/model/address.types.ts";
import {toggleInformation} from "@/features/use-checkout-contact-info/lib/toggle-contact-info.ts";

defineProps<{
  address: UserContactInfo;
}>();

const { useSavedContactInfo } = useAddAddress();
const { getSavedInfoClass } = checkoutClasses();
const { isChosenContactInfo  } = toggleInformation();
</script>

<style scoped>

</style>