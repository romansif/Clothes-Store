<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usePhoneForm } from "@/shared/mask-forms/use.phone.form.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { userForms } from "@/shared/composables/forms/users.forms.ts";
import { useUpdateProfile } from "@/feature/profile/profile-composables/use-update-profile.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors.ts";

import BaseButton  from "@/shared/ui/button/BaseButton.vue";

const { user } = usersStore();
const { countries, selectedCountryCode } = usersStore();
const { updatePhoneAccount, updateEmailAccount } = useUpdateProfile();
const { currentCountry, currentMask, changeCountry } = usePhoneForm();
const { updateUserEmailErrors, updateUserPhoneErrors } = userFormsErrors();
const { updateUserPhone, updateUserFormPhoneMessage, updateUserEmail, updateUserFormEmailMessage } = userForms();
</script>

<template>
  <div v-if="user.role === 'Buyer'" class="flex flex-col gap-10 sm:flex-row">
    <form @keydown.enter.prevent="updatePhoneAccount" class="flex flex-col gap-3 w-full">
      <label for="">Private Phone</label>
      <div class="flex gap-3">
        <select name="" id="" v-model="selectedCountryCode" @change="changeCountry"
                class="text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
                        hover:bg-gray-50 focus:bg-gray-50 rounded-md py-5 px-3">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <IMask v-model:value=updateUserPhone.phone type="text" inputmode="numeric" :mask="currentMask.mask" :key="selectedCountryCode"
               class="w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                     transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" :placeholder="currentCountry?.placeholder"/>
      </div>
      <span v-if=updateUserPhoneErrors.phoneError class="text-red-600 text-xs">
        {{ updateUserFormPhoneMessage.phoneMessage }}
      </span>
      <div class="flex">
        <BaseButton @click.prevent="updatePhoneAccount()" name="Save Phone" variant="profileForm" />
      </div>
    </form>
    <form @keydown.enter.prevent="updateEmailAccount" class="flex flex-col gap-3 w-full">
      <label for="">Email</label>
      <input v-model=updateUserEmail.email type="text" inputmode="numeric"
             class="border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
                   transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none" placeholder="example@mail.com "/>
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