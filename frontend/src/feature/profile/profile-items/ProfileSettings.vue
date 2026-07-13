<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProfile } from "../profile-composables/useProfile.ts";

import shirt_2 from '../../../app/assets/photos/home/shirt-2.png'
import ProfileMenu from "./ProfileMenu.vue";

const router = useRouter()

const goBack = () => {
  router.back()
}

const { openAvatarModal } = useProfile()
</script>

<template>
  <div class="px-8 py-5 rounded-xl bg-white h-[200px]">
    <div class="flex">
      <div class="">
        <button @click="goBack" class="px-5.5 py-2 border border-gray-300 font-semibold rounded-xl">Back</button>
      </div>
      <div class="flex ">
        <div class="flex items-center px-20 gap-20">
          <img @click="openAvatarModal" :src="shirt_2" alt="" class="w-34 rounded-full" />
          <div class="flex flex-col gap-5">
            <div class="flex gap-2">
              <span class="font-bold text-xl">Name:</span>
              <span class="font-medium text-xl text-gray-500">UserName</span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold text-xl">Role:</span>
              <span class="font-medium text-xl text-gray-500">Buyer</span>
            </div>
          </div>
        </div>
      </div>
      <ProfileMenu />
    </div>
  </div>
</template>

<style scoped>

</style>