<template>
  <div>
    <div @click="toggleSavedAddresses" class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                  flex items-center justify-center">
      <div @click.stop class="flex flex-col bg-white w-222.5 h-150 rounded-xl p-5">
        <BaseButton @click="toggleSavedAddresses" name="Exit" variant="exitClose"/>
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">ADDRESSES</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              May I see your saved delivery address.
            </span>
          </div>
        </div>
        <div v-if="userAddresses.length" class="flex flex-col w-full pr-5">
          <AddressesList />
        </div>
        <AddressesEmpty v-else />
      </div>
    </div>
    <Transition name="notify">
      <DeleteModal v-if="deleteModal" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { useGetAddress } from "@/features/use-user-address/api/get-address.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";

import BaseButton from "@/shared/ui/base/BaseButton.vue";
import DeleteModal from "@/features/use-general-delete/ui/DeleteModal.vue";
import AddressesEmpty from "@/entities/profile/ui/AddressesEmpty.vue";
import AddressesList from "@/features/use-user-address/ui/AddressesList.vue";

const { getAddresses } = useGetAddress();
const { deleteModal } = baseDeleteModal();
const { userAddresses } = informationContactStore();
const { toggleSavedAddresses } = useProfileModals();

onMounted(async () => {
  await getAddresses();
})
</script>

<style scoped>

</style>