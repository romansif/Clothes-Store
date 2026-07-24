<script setup lang="ts">
const BASE_URL = 'http://localhost:3000';

import { computed } from "vue";
import { useProfileModals } from "../../composables/modals/profile/profileModals.ts";
import { useAddProfile } from "../../../feature/profile/profile-composables/useAddProfile.ts";
import { usersStore } from "../../composables/stores/users.store.ts";

const { user } = usersStore();
const { updateAvatarAccount } = useAddProfile();
const { toggleAvatar, openSelectAvatar, fileInput } = useProfileModals();

const userAvatar = computed(() => {
  if(user.value && user.value.avatarUrl){
    return `${BASE_URL}/${user.value.avatarUrl}`
  }
})
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
    <div class="bg-white rounded-2xl w-[450px] shadow-xl">
      <div class="flex flex-col justify-center py-8 gap-6">
        <h2 class="text-2xl text-center font-bold">Change your avatar</h2>
        <div class="flex flex-col items-center gap-6">
          <img @click=openSelectAvatar :src=userAvatar alt="" class="w-35 rounded-full" />
          <div class="flex gap-12">
            <button @click=toggleAvatar class="bg-black text-white rounded px-8 py-3.5 font-semibold text-start">
              Confirm
            </button>
          </div>
          <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="updateAvatarAccount">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>