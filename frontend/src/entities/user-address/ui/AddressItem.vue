<template>
    <TransitionGroup name="list">
        <li
            :key="address.id"
            class="mt-5 flex h-fit flex-col rounded-xl border border-gray-200 p-2 shadow-lg"
        >
            <div class="flex flex-col gap-5">
                <div class="flex">
                    <span class="text-sm font-semibold">
                        Address: <span class="font-normal">{{ address.address }}</span>
                    </span>
                    <img
                        @click="
                            emit(
                                'deleteAddress',
                                'Are you sure you want to delete this saved address?',
                                'DELETE_SAVED_ADDRESS',
                                address.id,
                            )
                        "
                        :src="del"
                        alt=""
                        class="ml-auto w-5 transition duration-400 hover:scale-120"
                    />
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
import type { UserContactInfo } from "@/entities/user-address";

import del from "@/assets/icons/delete-close/del_address_card.svg";

defineProps<{
    address: UserContactInfo;
}>();

const emit = defineEmits<{
    deleteAddress: [title: string, type: string, id: string];
}>();
</script>
