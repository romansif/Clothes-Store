<template>
  <TransitionGroup name="list">
    <li :class="[getSavedClass, isChosenContactInfo ? getSavedErrorClass : '']">
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
import { getSavedClass, getSavedErrorClass } from "@/shared/model/saved-checkout-info.variants";
import { isChosenContactInfo } from "@/entities/checkout-info-item/model/information.refs";
import type { UserContactInfo } from "@/entities/checkout-info-form";

defineProps<{
  address: UserContactInfo;
}>();
</script>
