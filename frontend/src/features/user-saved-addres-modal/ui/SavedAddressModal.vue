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
        <Loading v-if="isPending" />
        <ErrorState v-else-if="isError" :box="{ variant: 'addresses', state: 'error' }" />
        <div v-if="userAddresses.length"
             class="flex flex-col w-full">
          <AddressesList />
        </div>
        <EmptyState v-else :box="{ variant: 'addresses', state: 'empty' }" />
      </div>
    </div>
    <Transition name="modal">
      <DeleteModal v-if="deleteModal" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { useSavedAddressesData } from "@/widgets/user-address-list/lib/use-saved-address-data";
import { UiButton } from "@/shared/ui/button";
import { DeleteModal } from "@/features/general-delete";
import { AddressesList } from "@/widgets/user-address-list";
import {EmptyState, ErrorState, Loading} from "@/widgets/state";

const { deleteModal } = baseDeleteModal();
const { toggleSavedAddresses } = useProfileModals();
const { userAddresses, isPending, isError } = useSavedAddressesData()
</script>
