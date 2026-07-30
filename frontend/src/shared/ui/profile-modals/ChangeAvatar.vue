<script setup lang="ts">
const BASE_URL = 'http://localhost:3000';

import { computed } from "vue";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { useProfileModals } from "@/shared/composables/modals/profile/profileModals.ts";
import { useUpdateProfile } from "@/feature/profile/profile-composables/useUpdateProfile.ts";

import BaseButton from "../button/BaseButton.vue";

const { user } = usersStore();
const { updateAvatarAccount } = useUpdateProfile();
const { toggleAvatar, openSelectAvatar, fileInput } = useProfileModals();

const userAvatar = computed(() => {
  if(user.value && user.value.avatarUrl){
    return `${BASE_URL}/${user.value.avatarUrl}`;
  }
})
</script>

<template>
  <section class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
    <div class="bg-white rounded-2xl w-[450px] shadow-xl">
      <div class="flex flex-col justify-center py-8 gap-6">
        <h2 class="text-2xl text-center font-bold">Change your avatar</h2>
        <div class="flex flex-col items-center gap-6">
          <img @click=openSelectAvatar :src=userAvatar alt="" class="w-35 rounded-full transition duration-400 hover:scale-110" />
          <div class="flex gap-12">
            <BaseButton @click="toggleAvatar" name="Confirm" variant="toggleAvatar" />
          </div>
          <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="updateAvatarAccount">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>