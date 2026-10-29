<template>
    <div
        class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        @click="toggleReplaceChoice('')"
    >
        <div @click.stop class="flex h-fit w-175 flex-col gap-2 rounded-xl bg-white p-5">
            <UiButton name="Exit" variant="exitClose" @click="toggleReplaceChoice" />
            <div class="flex flex-col gap-4 border-b pb-4">
                <h1 class="text-2xl font-bold">REPLACEMENT OF ORDER</h1>
                <span class="text-sm text-[#A3A3A3]">
                    Select the reason why you want to cancel the order
                </span>
            </div>
            <ReplacementForm @submit.prevent="replaceOrder" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { toggleReplaceChoice } from "@/entities/order-action/lib/order-modal";
import { useReplaceOrder } from "@/features/order-action/api/delete-order";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/order/model/order-forms";
import { UiButton } from "@/shared/ui/button";
import { ReplacementForm } from "@/entities/order";

const { replaceOrder } = useReplaceOrder();

refClearErrorsOnChange(cancelChoiceForm, cancelChoiceMessage);
</script>
