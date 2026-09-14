<template>
  <TransitionGroup name="list">
    <li @click="useSavedContactInfo(address)" :key="address.id"
        :class="savedContactClass">
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
import { informationClasses } from "@/shared/const/checkout/information.classes.ts";
import type {UserContactInfo} from "@/features/use-checkout-contact-info/model/address.types.ts";

defineProps<{
  address: UserContactInfo
}>();

const { useSavedContactInfo } = useAddAddress();
const { savedContactClass } = informationClasses();
</script>

<style scoped>

</style>