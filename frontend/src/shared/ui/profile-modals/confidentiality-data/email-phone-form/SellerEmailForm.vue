<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { userForms } from "@/shared/composables/forms/users.forms.ts";
import { useUpdateProfile } from "@/feature/profile/profile-composables/use.update.profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors.ts";

import BaseButton from "@/shared/ui/base/BaseButton.vue";
import BaseInput from "@/shared/ui/base/BaseInput.vue";

const { user } = usersStore();
const { updateEmailAccount } = useUpdateProfile();
const { updateUserEmailErrors } = userFormsErrors();
const { updateUserEmail, updateUserFormEmailMessage } = userForms();
</script>

<template>
  <div v-if="user.role === 'Seller'" class="flex gap-10">
    <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-[510px]">
      <label for="">Email</label>
      <BaseInput v-model=updateUserEmail.email type="text" inputmode="numeric" placeholder="example@mail.com"
          :error="updateUserEmailErrors.emailError" variant="confidentialityData"
          :error-message="updateUserEmailErrors.emailError ? updateUserFormEmailMessage.emailMessage : ''"/>
      <div class="flex">
        <BaseButton @click.prevent="updateEmailAccount()" name="Save Email" variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>