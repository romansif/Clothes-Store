<template>
    <form class="flex flex-col items-start gap-3.5">
        <ReplacementInput
            v-model="cancelChoiceForm.cancelChoice"
            name="Incorrect payment method"
            :value="'Incorrect payment method'"
        />
        <ReplacementInput
            v-model="cancelChoiceForm.cancelChoice"
            name="I entered the wrong address"
            :value="'I entered the wrong address'"
        />
        <ReplacementInput
            v-model="cancelChoiceForm.cancelChoice"
            name="I no longer need this item"
            :value="'I no longer need this item'"
        />
        <ReplacementInput
            v-model="cancelChoiceForm.cancelChoice"
            name="Ordered it by mistake"
            :value="'Ordered it by mistake'"
        />
        <ReplacementInput
            v-model="cancelChoiceForm.cancelChoice"
            name="I found a better product"
            :value="'I found a better product'"
        />
        <span v-if="cancelChoiceMessage.cancelChoice" class="px-4 text-xs text-red-600">
            {{ cancelChoiceMessage.cancelChoice }}
        </span>
        <div class="ml-auto flex">
            <UiButton type="submit" name="Replacement" variant="replaceAndReview" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/order/model/order-forms";
import { UiButton } from "@/shared/ui/button";
import { ReplacementInput } from "@/shared/ui/replacement-input";
</script>
