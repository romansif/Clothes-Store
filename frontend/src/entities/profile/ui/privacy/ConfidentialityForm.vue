<template>
  <div class="flex font-medium flex-col gap-5 pt-5">
    <div class="flex flex-col gap-5">
      <div class="flex gap-10">
        <form @keydown.enter.prevent="updateNameAccount" class="flex flex-col gap-3 w-full">
          <label>Name</label>
          <BaseInput v-model=updateUserForm.name type="text" inputmode="numeric" placeholder="New Name"
              :error="updateUserFormErrors.nameError" variant="confidentialityData" required
              :error-message="updateUserFormErrors.nameError ? updateUserFormMessage.nameMessage : ''" />
          <div class="flex">
            <BaseButton @click.prevent="updateNameAccount()" name="Save Name" variant="profileForm" />
          </div>
        </form>
        <form @keydown.enter.prevent="updateSurNameAccount" class="flex flex-col gap-3 w-full">
          <label>SurName</label>
          <BaseInput v-model=updateUserForm.surName type="text" inputmode="numeric" placeholder="New SurName"
              :error="updateUserFormErrors.surNameError" variant="confidentialityData" required
              :error-message="updateUserFormErrors.surNameError ? updateUserFormMessage.surNameMessage : ''" />
          <div class="flex">
            <BaseButton @click.prevent="updateSurNameAccount()" name="Save SurName" variant="profileForm" />
          </div>
        </form>
      </div>
      <SellerForm v-if="user.role === 'Seller'" />
    </div>
    <BuyerForm v-if="user.role === 'Buyer'" />
    <div class="flex flex-col">
      <form @keydown.enter.prevent="updatePasswordAccount" class="flex flex-col gap-10 sm:flex-row">
        <div class="flex flex-col gap-3 w-full">
          <label>Old password</label>
          <div class="relative">
            <BaseInput v-model=updateUserForm.oldPassword :type="showOldPassword ? 'text' : 'password'" inputmode="numeric"
                :error="updateUserFormErrors.oldPasswordError" variant="confidentialityData" placeholder="Old Password"
                :error-message="updateUserFormErrors.oldPasswordError ? updateUserFormMessage.oldPasswordMessage : ''" />
            <img @click.prevent=toggleOldPassword :src="showOldPassword ? opened : closed" alt=""
                 :class="['absolute w-7.5 top-1/4 left-115', updateUserFormErrors.oldPasswordError ? 'top-1/6' : '']">
          </div>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label>New password</label>
          <div class="relative">
            <BaseInput v-model=updateUserForm.newPassword :type="showNewPassword ? 'text' : 'password'" inputmode="numeric"
                :error="updateUserFormErrors.newPasswordError" variant="confidentialityData" placeholder="New Password"
                :error-message="updateUserFormErrors.newPasswordError ? updateUserFormMessage.newPasswordMessage : ''"/>
            <img @click.prevent=toggleNewPassword :src="showNewPassword ? opened : closed" alt=""
                :class="['absolute w-7.5 top-1/4 left-115', updateUserFormErrors.newPasswordError ? 'top-1/8' : '']">
          </div>
        </div>
      </form>
      <div class="flex mt-3">
        <BaseButton @click.prevent="updatePasswordAccount()" name="Save Password" variant="profileForm" />
      </div>
    </div>
    <SellerEmailForm v-if="user.role === 'Seller'"/>
  </div>
</template>

<script setup lang="ts">
const { user } = userStore();
const { updateUserFormErrors } = userFormsErrors();
const { updateUserForm, updateUserFormMessage } = userForms();
const { updatePasswordAccount, updateNameAccount, updateSurNameAccount } = profileApi();

import { ref, watch } from 'vue'

import { userForms } from "@/feature/use-profile/model/user.form.ts";
import { profileApi } from "@/feature/use-profile/api/profile.api.ts";
import { userFormsErrors } from "@/feature/use-profile/lib/users.error.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

import BaseButton  from "@/shared/ui/BaseButton.vue";
import BuyerForm from "./BuyerForm.vue";
import SellerForm from "./SellerForm.vue";
import opened from '@/assets/icons/auth/opened.png'
import closed from '@/assets/icons/auth/closed.png'
import SellerEmailForm from "./SellerEmailForm.vue";
import BaseInput from "@/shared/ui/BaseInput.vue";

watch(() => [
      updateUserForm.value.name, updateUserForm.value.surName,
      updateUserForm.value.phone, updateUserForm.value.companyName,
      updateUserForm.value.publicPhone, updateUserForm.value.email,
      updateUserForm.value.oldPassword, updateUserForm.value.newPassword],
    ([name, surName, phone, companyName, publicPhone, email, oldPassword, newPassword]) => {
      if(name){
        updateUserFormErrors.value.nameError = false;
      }
      if(surName){
        updateUserFormErrors.value.surNameError = false;
      }
      if(phone){
        updateUserFormErrors.value.phoneError = false;
      }
      if(companyName){
        updateUserFormErrors.value.companyNameError = false;
      }
      if(publicPhone){
        updateUserFormErrors.value.publicPhoneError = false;
      }
      if(email){
        updateUserFormErrors.value.emailError = false;
      }
      if(oldPassword){
        updateUserFormErrors.value.oldPasswordError = false;
      }
      if(newPassword){
        updateUserFormErrors.value.newPasswordError = false;
      }
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


<style scoped>

</style>