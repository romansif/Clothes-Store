<script setup lang="ts">
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { userForms } from "@/shared/composables/forms-composables/forms/users.forms.ts";
import { useUpdateProfile } from "@/feature/profile/profile-composables/useUpdateProfile.ts";
import { userFormsErrors } from "@/shared/composables/forms-composables/forms-errors/users.errors.ts";

import BaseButton from "@/shared/ui/button/BaseButton.vue";

const { user } = usersStore();
const { updateEmailAccount } = useUpdateProfile();
const { updateUserEmailErrors } = userFormsErrors();
const { updateUserEmail, updateUserFormEmailMessage } = userForms();

</script>

<template>
  <div v-if="user.role === 'Seller'" class="flex gap-10">
    <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-[510px]">
      <label for="">Email</label>
      <input v-model=updateUserEmail.email type="text" inputmode="numeric"
             class=" w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" placeholder="example@mail.com"/>
      <span v-if=updateUserEmailErrors.emailError class="text-red-600 text-xs">
        {{ updateUserFormEmailMessage.emailMessage }}
      </span>
      <div class="flex">
        <BaseButton @click.prevent="updateEmailAccount()" name="Save Email" variant="profileForm" />
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>