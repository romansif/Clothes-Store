<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { useCheckout } from "../../composables/use.checkout.ts";
import { useAddCheckout } from "../../composables/use.add.checkout.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms.ts";
import { checkoutErrors }from "@/shared/composables/errors/errors-messages/checkout.errors.ts";
import CheckoutInput from "@/shared/ui/base/CheckoutInput.vue";

const { postalCode } = usersStore();
const { addAddress } = useAddCheckout();
const { information } = checkoutForms();
const { informationErrors } = checkoutErrors();
const { firstNamePlaceholder, lastNamePlaceholder, countryPlaceholder, statePlaceholder,
  cityPlaceholder, addressPlaceholder, postalCodePlaceholder } = useCheckout();
</script>

<template>
  <form @keydown.enter="addAddress" class="flex flex-col mt-5 gap-5">
    <label class="font-medium text-xs md:text-sm">SHIPPING ADDRESS</label>
    <div class="flex flex-col gap-3">
      <input v-model="information.addressName" class="bg-[#D9D9D9]/40 border border-gray-300 transition duration-400
              hover:bg-gray-50 focus:bg-gray-50 rounded-xl outline-none px-4 py-3 text-xs placeholder:text-gray-600 w-full"
             type="text" placeholder="Address Name is optional" />
      <div class="flex gap-2">
        <CheckoutInput v-model="information.firstName" type="text" :placeholder="firstNamePlaceholder"
            :error="informationErrors.firstNameError" variant="checkoutInfo" />
        <CheckoutInput v-model="information.lastName" type="text" :placeholder="lastNamePlaceholder"
            :error="informationErrors.lastNameError" variant="checkoutInfo" />
      </div>
      <div class="flex flex-col gap-3">
        <CheckoutInput v-model="information.country" type="text" :placeholder="countryPlaceholder"
            :error="informationErrors.countryError" variant="checkoutInfo" />
        <CheckoutInput v-model="information.stateRegion" type="text" :placeholder="statePlaceholder"
            :error="informationErrors.stateRegionError" variant="checkoutInfo" />
        <CheckoutInput v-model="information.address" type="text" :placeholder="addressPlaceholder"
            :error="informationErrors.addressError" variant="checkoutInfo" />
      </div>
      <div class="flex gap-2">
        <div class="flex flex-col w-full">
          <CheckoutInput v-model="information.city" type="text" :placeholder="cityPlaceholder"
              :error="informationErrors.cityError" variant="checkoutInfo" />
        </div>
        <div class="flex flex-col w-full">
          <IMask v-model.value="information.postalCode" type="text" :mask="postalCode.mask"
                 :class="[`w-full bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                  rounded-xl outline-none px-4 py-3 text-xs`,
            informationErrors.postalCodeError ? `placeholder:text-red-500 border-red-400` : `placeholder:text-gray-600`]"
                 :placeholder="postalCodePlaceholder" />
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>