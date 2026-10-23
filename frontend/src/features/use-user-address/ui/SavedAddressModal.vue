<template>
  <div>
    <div class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
         flex items-center justify-center"
         @click="toggleSavedAddresses">
      <div @click.stop class="flex flex-col bg-white w-222.5 h-150 rounded-xl p-5">
        <UiButton name="Exit"
                    variant="exitClose"
                    @click="toggleSavedAddresses" />
        <div class="flex flex-col gap-2 border-b py-4">
          <h1 class="font-bold text-2xl">ADDRESSES</h1>
          <div class="flex">
            <span class="text-sm text-[#A3A3A3]">
              May I see your saved delivery address.
            </span>
          </div>
        </div>
        <div v-if="userAddresses.length"
             class="flex flex-col w-full">
          <AddressesList />
        </div>
        <AddressesEmpty v-else />
      </div>
    </div>
    <Transition name="modal">
      <DeleteModal v-if="deleteModal" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal";
import { useGetAddress } from "@/features/use-user-address/api/get-address";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal";
import { informationContactStore } from "@/shared/model/address.store";

import { UiButton } from "@/shared/ui/button";
import { DeleteModal } from "@/features/use-general-delete";
import { AddressesEmpty } from "@/entities/profile";
import { AddressesList } from "@/features/use-user-address";

const { getAddresses } = useGetAddress();
const { deleteModal } = baseDeleteModal();
const { userAddresses } = informationContactStore();
const { toggleSavedAddresses } = useProfileModals();

onMounted(async () => {
  await getAddresses();
})
</script>
