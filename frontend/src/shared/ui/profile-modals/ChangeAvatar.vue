<script setup lang="ts">
import { profile } from "@/shared/composables/profile";
import { useProfileModals } from "@/shared/composables/modals/profile.modals";
import { useProfile } from "@/feature/profile/composables/use.profile";

import BaseButton from "@/shared/ui/base/button/BaseButton.vue";

const { userAvatar } = profile();
const { updateAvatarAccount } = useProfile();
const { toggleAvatar, openSelectAvatar, fileInput } = useProfileModals();
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
    <div class="bg-white rounded-2xl w-112.5 shadow-xl">
      <div class="flex flex-col justify-center py-8 gap-6">
        <h2 class="text-2xl text-center font-bold">Change your avatar</h2>
        <div class="flex flex-col items-center gap-6">
          <img @click=openSelectAvatar :src=userAvatar alt="" class="w-35 rounded-full transition duration-400 hover:scale-110" />
          <div class="flex gap-12">
            <BaseButton @click="toggleAvatar" name="Confirm" variant="toggleAvatar" />
          </div>
          <input type="file" @change="updateAvatarAccount" class="hidden"
                 :ref="(el) => { fileInput = el as HTMLInputElement }" accept="image/*">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>