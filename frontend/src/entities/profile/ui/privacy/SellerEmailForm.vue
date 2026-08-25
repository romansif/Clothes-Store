<template>
  <div class="flex gap-10">
    <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-127.5">
      <label>Email</label>
      <BaseInput v-model=updateUserForm.email type="text" inputmode="numeric" placeholder="example@mail.com"
          :error="updateUserFormErrors.emailError" variant="confidentialityData"
          :error-message="updateUserFormErrors.emailError ? updateUserFormMessage.emailMessage : ''"/>
      <div class="flex">
        <BaseButton @click.prevent="updateEmailAccount()" name="Save Email" variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { updateEmailAccount } = profileApi();
const { updateUserFormErrors } = userFormsErrors();
const { updateUserForm, updateUserFormMessage } = userForms();

import { userForms } from "@/feature/use-profile/model/user.form.ts";
import { profileApi } from "@/feature/use-profile/api/profile.api.ts";
import { userFormsErrors } from "@/feature/use-profile/lib/users.error.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
import BaseInput from "@/shared/ui/BaseInput.vue";
</script>

<style scoped>

</style>