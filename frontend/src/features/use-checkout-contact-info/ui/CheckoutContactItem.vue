<template>
  <TransitionGroup name="list">
    <li @click="useSavedContactInfo(address)" :key="address.id"
        :class="[getSavedClass, isChosenContactInfo ? getSavedErrorClass : '']">
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
import { useAddAddress } from "@/features/use-checkout-contact-info/api/add-address";
import { getSavedClass, getSavedErrorClass } from "@/shared/model/saved-checkout-info.variants";
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle-contact-info";
import type { UserContactInfo } from "@/entities/checkout-contact-info";

defineProps<{
  address: UserContactInfo;
}>();

const { useSavedContactInfo } = useAddAddress();
const { isChosenContactInfo  } = toggleInformation();
</script>
