<script setup lang="ts">
import { userForms } from "@/shared/composables/forms/users.forms";
import { useProfile } from "@/feature/profile/profile-actions/use.profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors";

import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { updateEmailAccount } = useProfile();
const { updateUserFormErrors } = userFormsErrors();
const { updateUserForm, updateUserFormMessage } = userForms();
</script>

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

<style scoped>

</style>