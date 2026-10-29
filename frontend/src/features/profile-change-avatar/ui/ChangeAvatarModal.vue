<template>
  <div class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
       flex items-center justify-center"
       @click="toggleAvatar">
    <div @click.stop class="bg-white rounded-2xl w-112.5 shadow-xl">
      <div class="flex flex-col justify-center py-8 gap-6">
        <h2 class="text-2xl text-center font-bold">Click on the avatar to change</h2>
        <div class="flex flex-col items-center gap-6">
          <img v-if="user" :src="avatar()" alt=""
               class="w-35 rounded-full transition duration-400 hover:scale-110"
               @click="openSelectAvatar" />
          <div class="flex gap-12">
            <UiButton name="Confirm"
                        variant="toggleAvatar"
                        @click="toggleAvatar" />
          </div>
          <input type="file" @change="(e) => changeAvatar(e)"
                 class="hidden"
                 :ref="(el) => { fileInput = el as HTMLInputElement }" accept="image/*">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { openSelectAvatar, toggleAvatar} from "@/features/profile-change-avatar/lib/use-profile-modal";
import { useChangeAvatar } from "@/features/profile-change-avatar/api/update-avatar";
import { fileInput } from "@/shared/lib/product-helper";
import { UiButton } from "@/shared/ui/button";

const { user } = useUserData()
const { avatar } = userAvatar()
const { changeAvatar } = useChangeAvatar()
</script>
