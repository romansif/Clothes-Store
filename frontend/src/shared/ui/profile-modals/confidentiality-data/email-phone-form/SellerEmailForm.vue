<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store";
import { userForms } from "@/shared/composables/forms/users.forms";
import { useProfile } from "@/feature/profile/composables/use.profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors";

import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import BaseInput from "@/shared/ui/base/input/BaseInput.vue";

const { user } = usersStore();
const { updateEmailAccount } = useProfile();
const { updateUserEmailErrors } = userFormsErrors();
const { updateUserEmail, updateUserFormEmailMessage } = userForms();
</script>

<template>
  <div v-if="user.role === 'Seller'" class="flex gap-10">
    <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-[510px]">
      <label>Email</label>
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