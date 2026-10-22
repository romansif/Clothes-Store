<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">NAME</label>
        <UiInput v-model=registerForm.name
                   placeholder="name"
                   :error-message="registerFormErrorMessages.name" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">SURNAME</label>
        <UiInput v-model="registerForm.surName"
                   placeholder="surname"
                   :error-message="registerFormErrorMessages.surName" />
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PRIVATE PHONE</label>
      <UiPhoneInput v-model="registerForm.phone"
                  :select-class="selectPhoneCode"
                  :input-class="registerPhoneInputVariants"
                  :error-message="registerFormErrorMessages.phone" />
    </div>
    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">EMAIL</label>
        <UiInput v-model=registerForm.email
                   type="email"
                   placeholder="example@mail.com"
                   :error-message="registerFormErrorMessages.email ? registerFormErrorMessages.email : ''" />
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="font-semibold uppercase tracking-wider text-xs text-gray-700">PASSWORD</label>
        <div class="relative">
          <UiInput v-model=registerForm.password
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
import { authStore } from "@/features/use-auth/model/auth.store";
import { showSignInPassword } from "@/shared/ui/auth-form/auth-form.variants"
import { selectPhoneCode } from "@/shared/ui/phone-input/phone-input.variants";
import { toggleAuth } from "@/features/use-auth/lib/toggle-auth";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { registerForm, registerFormErrorMessages } from "@/entities/auth/model/auth-form";
import { registerPhoneInputVariants } from "@/features/use-auth/model/register-phone-input.variants";
import { UiInput } from "@/shared/ui/input";
import { UiPhoneInput } from "@/shared/ui/phone-input";

import closed from "@/assets/icons/auth/closed.png";
import opened from "@/assets/icons/auth/opened.png";

const { showPassword } = authStore();
const { togglePassword } = toggleAuth();

refClearErrorsOnChange(
    registerForm,
    registerFormErrorMessages
)
</script>