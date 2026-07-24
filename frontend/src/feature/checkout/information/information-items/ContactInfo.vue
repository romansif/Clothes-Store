<script setup lang="ts">
import { computed } from "vue";
import { useAddProfile } from "../../../profile/profile-composables/useAddProfile.ts";
import { usersStore } from "../../../../shared/composables/stores/users.store.ts";
import { checkoutForms } from "../../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors }from "../../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";

const { addAddress } = useAddProfile();
const { userAddress } = usersStore();
const { informationErrors } = checkoutErrors();
const { information, informationMessages} = checkoutForms();

const emailPlaceholder = computed(() => {
  if(informationErrors.value.emailError){
    return informationMessages.value.emailMessage;
  }
  if(userAddress.value.email){
    return userAddress.value.email;
  }
  return informationMessages.value.emailMessage;
})

const phonePlaceholder = computed(() => {
  if(informationErrors.value.phoneError){
    return informationMessages.value.phoneMessage;
  }
  if(userAddress.value.phone){
    return userAddress.value.phone;
  }
  return informationMessages.value.phoneMessage;
})
</script>

<template>
  <form @keydown.enter="addAddress" class="flex flex-col mt-5 gap-5">
    <label class="font-medium text-xs md:text-sm">CONTACT INFO</label>
    <div class="flex flex-col gap-2">
      <input v-model="information.email" type="text" :class="['bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
                  informationErrors.emailError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
             :placeholder="emailPlaceholder"  />
      <input v-model="information.phone" type="text" :class="['bg-white border border-gray-200 rounded-xl outline-none px-4 py-3 text-xs',
                  informationErrors.phoneError ? `placeholder:text-red-600` : `placeholder:text-gray-600`]"
             :placeholder="phonePlaceholder" />
    </div>
  </form>
</template>

<style scoped>

</style>