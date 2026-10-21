<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
        <BaseInput v-model=registerForm.name
                   placeholder="name"
                   :error-message="registerFormErrorMessages.name" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
        <BaseInput v-model="registerForm.surName"
                   placeholder="surname"
                   :error-message="registerFormErrorMessages.surName" />
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PRIVATE PHONE</label>
      <PhoneInput v-model="registerForm.phone"
                  :select-class="selectPhoneCode"
                  :input-class="registerPhoneInputVariants"
                  :error-message="registerFormErrorMessages.phone" />
    </div>
    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
        <BaseInput v-model=registerForm.email
                   type="email"
                   placeholder="example@mail.com"
                   :error-message="registerFormErrorMessages.email ? registerFormErrorMessages.email : ''" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
        <div class="relative">
          <BaseInput v-model=registerForm.password
                     :type="showPassword.password ? 'text' : 'password'"
                     placeholder="••••••••"
                     :error-message="registerFormErrorMessages.password ? registerFormErrorMessages.password : ''" />
          <img @click=togglePassword
               :src="showPassword.password ? opened : closed" alt=""
               :class="registerFormErrorMessages.password ? showSignInPassword.error : showSignInPassword.default">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authStore } from "@/features/use-auth/model/auth.store.ts";
import { showSignInPassword } from "@/shared/ui/auth-form/auth-form.variants.ts"
import { selectPhoneCode } from "@/shared/ui/phone-input/phone-input.variants.ts";
import { toggleAuth } from "@/features/use-auth/lib/toggle-auth.ts";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper.ts";
import { registerForm, registerFormErrorMessages } from "@/entities/auth/model/auth-form.ts";
import { registerPhoneInputVariants } from "@/features/use-auth/model/register-phone-input.variants.ts";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";
import BaseInput from "@/shared/ui/input/BaseInput.vue";
import PhoneInput from "@/shared/ui/phone-input/PhoneInput.vue";

const { showPassword } = authStore();
const { togglePassword } = toggleAuth();

refClearErrorsOnChange(
    registerForm,
    registerFormErrorMessages
)
</script>