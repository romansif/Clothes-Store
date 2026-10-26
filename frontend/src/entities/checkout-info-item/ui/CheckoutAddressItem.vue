<template>
  <TransitionGroup name="list">
    <li :class="[getSavedClass, isChosenAddress ? getSavedErrorClass : '']">
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
import { getSavedClass, getSavedErrorClass } from "@/shared/model/saved-checkout-info.variants";
import { isChosenAddress } from "@/entities/checkout-info-item/model/information.refs";
import type { UserContactInfo } from "@/entities/user-address";

defineProps<{
  address: UserContactInfo;
}>();
</script>
