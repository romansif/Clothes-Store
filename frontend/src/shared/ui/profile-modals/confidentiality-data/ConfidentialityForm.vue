<script setup lang="ts">
import { ref, watch } from 'vue'
import { useProfile } from "../profile-composables/useProfile.ts";
import { userForms } from "../../../shared/composables/forms-composables/forms/users.forms.ts";
import { userFormsErrors } from "../../../shared/composables/forms-composables/forms-errors/users.errors.ts";
import { usersStore } from "../../../shared/composables/stores/users.store.ts";

import opened from '../../../app/assets/icons/auth/opened.png'
import closed from '../../../app/assets/icons/auth/closed.png'
import BaseButton  from "../../../shared/ui/button/BaseButton.vue";

const { user } = usersStore();
const {
  updatePasswordAccount,
  updateNameAccount, updateSurNameAccount,
  updatePhoneAccount, updateCompanyName,
  updatePublicPhoneAccount, updateEmailAccount,
} = useProfile();

const {
  updateUserFormPublicPhoneErrors,
  updateUserNameErrors, updateUserSurNameErrors,
  updateUserEmailErrors, updateUserPasswordErrors,
  updateUserPhoneErrors, updateUserFormCompanyNameErrors,
} = userFormsErrors();

const {
  updateUserName, updateUserFormNameMessage,
  updateUserPhone, updateUserFormPhoneMessage,
  updateUserEmail, updateUserFormEmailMessage,
  updateUserSurName, updateUserFormSurNameMessage,
  updateUserPassword, updateUserFormPasswordMessages,
  updateUserCompanyName, updateUserFormCompanyNameMessage,
  updateUserFormPublicPhone, updateUserFormPublicPhoneMessage,
} = userForms();

watch(() => [
      updateUserName.value.name, updateUserSurName.value.surName,
      updateUserPhone.value.phone, updateUserCompanyName.value.companyName,
      updateUserFormPublicPhone.value.publicPhone, updateUserEmail.value.email,
      updateUserPassword.value.oldPassword, updateUserPassword.value.newPassword],
    ([name, surName, phone, companyName, publicPhone, email, oldPassword, newPassword]) => {
      if(name){
        updateUserNameErrors.value.nameError = false
      }
      if(surName){
        updateUserSurNameErrors.value.surNameError = false
      }
      if(phone){
        updateUserPhoneErrors.value.phoneError = false
      }
      if(companyName){
        updateUserFormCompanyNameErrors.value.companyNameError = false
      }
      if(publicPhone){
        updateUserFormPublicPhoneErrors.value.publicPhoneError = false
      }
      if(email){
        updateUserEmailErrors.value.emailError = false
      }
      if(oldPassword){
        updateUserPasswordErrors.value.oldPasswordError = false
      }
      if(newPassword){
        updateUserPasswordErrors.value.newPasswordError = false
      }
    console.log(oldPassword, newPassword)
    }
)

const showOldPassword = ref(false)
const showNewPassword = ref(false)

const toggleOldPassword = () => {
  showOldPassword.value = !showOldPassword.value
}

const toggleNewPassword = () => {
  showNewPassword.value = !showNewPassword.value
}
</script>

<template>
  <div class="flex font-medium flex-col gap-8 pt-5 overflow-y-auto no-scrollbar">
    <div class="flex flex-col gap-4">
      <div class="flex gap-10">
        <div class="flex flex-col gap-3 w-full">
          <label for="">Name</label>
          <input v-model=updateUserName.name type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
              outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="New Name" />
          <span v-if=updateUserNameErrors.nameError class="text-red-600 text-xs">
            {{ updateUserFormNameMessage.nameMessage }}
          </span>
          <div class="flex">
            <BaseButton @click="updateNameAccount()" name="Save Name" variant="profileForm" />
          </div>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label for="">SurName</label>
          <input v-model=updateUserSurName.surName type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
              outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="New SurName" />
          <span v-if=updateUserSurNameErrors.surNameError class="text-red-600 text-xs">
            {{ updateUserFormSurNameMessage.surNameMessage }}
          </span>
          <div class="flex">
            <BaseButton @click="updateSurNameAccount()" name="Save Name" variant="profileForm" />
          </div>
        </div>
      </div>
      <div v-if="user.role === 'Buyer'" class="flex flex-col gap-10 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label for="">Phone</label>
          <input v-model=updateUserPhone.phone type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
              outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="+000 (00) 000-00-00" />
          <span v-if=updateUserPhoneErrors.phoneError class="text-red-600 text-xs">
            {{ updateUserFormPhoneMessage.phoneMessage }}
          </span>
          <div class="flex">
            <BaseButton @click="updatePhoneAccount()" name="Save Name" variant="profileForm" />
          </div>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label for="">Email</label>
          <input v-model=updateUserEmail.email type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
              outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="example@mail.com" />
          <span v-if=updateUserEmailErrors.emailError class="text-red-600 text-xs">
            {{ updateUserFormEmailMessage.emailMessage }}
          </span>
          <div class="flex">
            <BaseButton @click="updateEmailAccount()" name="Save Name" variant="profileForm" />
          </div>
        </div>
      </div>
      <div v-if="user.role === 'Seller'" class="flex flex-col gap-10 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label for="">Company Name</label>
          <input v-model=updateUserCompanyName.companyName type="text" inputmode="numeric" class="border border-gray-200
              rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="New Company Name" />
          <span v-if=updateUserFormCompanyNameErrors.companyNameError class="text-red-600 text-xs">
            {{ updateUserFormCompanyNameMessage.companyNameMessage }}
          </span>
          <div class="flex">
            <BaseButton @click="updateCompanyName()" name="Save Name" variant="profileForm" />
          </div>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label for="">Public Phone</label>
          <input v-model=updateUserFormPublicPhone.publicPhone type="text" inputmode="numeric" class="border border-gray-200
              rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="+000 (00) 000-00-00" />
          <span v-if=updateUserFormPublicPhoneErrors.publicPhoneError class="text-red-600 text-xs">
            {{ updateUserFormPublicPhoneMessage.publicPhoneMessage }}</span>
          <div class="flex">
            <BaseButton @click="updatePublicPhoneAccount()" name="Save Name" variant="profileForm" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-col gap-10 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label>Old password</label>
          <div class="relative">
            <input v-model=updateUserPassword.oldPassword :type="showOldPassword ? 'text' : 'password'" inputmode="numeric"
                class="w-full border border-gray-200 rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none"
                placeholder="Old Password" />
            <img @click=toggleOldPassword :src="showOldPassword ? opened : closed" alt=""
                class="absolute w-[30px] top-1/5 left-115">
          </div>
          <span v-if=updateUserPasswordErrors.oldPasswordError class="text-red-600 text-xs">
            {{ updateUserFormPasswordMessages.oldPasswordMessage }}
          </span>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label>New password</label>
          <div class="relative">
            <input v-model=updateUserPassword.newPassword :type="showNewPassword ? 'text' : 'password'" inputmode="numeric"
                class="w-full border border-gray-200 rounded-xl outline-none px-4 py-3 text-sm bg-white appearance-none"
                placeholder="New Password" />
            <img @click=toggleNewPassword :src="showNewPassword ? opened : closed" alt=""
                class="absolute w-[30px] top-1/5 left-115">
          </div>
          <span v-if=updateUserPasswordErrors.newPasswordError class="text-red-600 text-xs">
            {{ updateUserFormPasswordMessages.newPasswordMessage }}
          </span>
        </div>
      </div>
      <div class="flex mt-3">
        <BaseButton @click="updatePasswordAccount()" name="Save Name" variant="profileForm" />
      </div>
    </div>
    <div v-if="user.role === 'Buyer'" class="flex flex-col gap-3">
      <span>Saved Cards</span>
      <span class="text-gray-500 text-xs">You don't have any saved cards for quick payment yet.</span>
    </div>
    <div v-if="user.role === 'Seller'" class="flex gap-10">
      <div class="flex flex-col gap-3 w-full">
        <label for="">Email</label>
        <input v-model=updateUserEmail.email type="text" inputmode="numeric" class="border border-gray-200 rounded-xl
            outline-none px-4 py-3 text-sm bg-white appearance-none" placeholder="example@mail.com" />
        <span v-if=updateUserEmailErrors.emailError class="text-red-600 text-xs">
          {{ updateUserFormEmailMessage.emailMessage }}
        </span>
        <div class="flex">
          <BaseButton @click="updateEmailAccount()" name="Save Name" variant="profileForm" />
        </div>
      </div>
<!--      <div class="flex flex-col gap-7 w-full ">-->
<!--        <span>Saved Cards</span>-->
<!--        <span class="text-[#A3A3A3] text-xs">-->
<!--          You don't have any saved cards for quick payment yet.-->
<!--        </span>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style scoped>

</style>