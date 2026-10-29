<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-2">
            <CheckoutInput
                v-model="informationForm.firstName"
                placeholder="FirstName"
                :error-message="informationFormErrorMessages.firstName"
            />
            <CheckoutInput
                v-model="informationForm.lastName"
                placeholder="LastName"
                :error-message="informationFormErrorMessages.lastName"
            />
        </div>
        <CheckoutInput
            v-model="informationForm.email"
            placeholder="example@gmail.com"
            :error-message="informationFormErrorMessages.email"
        />
        <UiPhoneInput
            v-model="informationForm.phone"
            :select-class="informationSelectPhoneCodeClass"
            :input-class="[
                informationPhoneClass.default,
                informationFormErrorMessages.phone ? informationPhoneClass.error : '',
            ]"
            :error-message="informationFormErrorMessages.phone"
        />
    </div>
</template>

<script setup lang="ts">
import {
    informationForm,
    informationFormErrorMessages,
} from "@/entities/checkout-info-form/model/information-form";
import {
    informationPhoneClass,
    informationSelectPhoneCodeClass,
} from "@/entities/checkout-info-form/model/information-form.variants";

import CheckoutInput from "../../../shared/ui/checkout-input/CheckoutInput.vue";
import UiPhoneInput from "../../../shared/ui/phone-input/UiPhoneInput.vue";
</script>
