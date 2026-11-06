<template>
  <div>
    <div class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
         @click="toggleConfidentialityData">
      <div @click.stop class="flex h-full w-full flex-col bg-white p-5">
        <div class="flex flex-col gap-2 border-b pb-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold">{{ t("profile.modal.confidentiality") }}</h1>
            <UiButton :name="t('common.exit')" variant="exitClose" @click="toggleConfidentialityData" />
          </div>
          <span class="text-sm text-[#A3A3A3]">{{ t("profile.modal.confidentialityHint") }}</span>
        </div>
        <div class="grid gap-10 lg:grid-cols-[3fr_7fr] py-10">
          <div class="flex flex-col gap-10 font-dm-sans text-lg font-semibold">
            <button @click="toggleAvatar">
              <img :src="user ? avatar() : profile" alt=""
                   class="h-full w-full bg-white object-cover rounded-4xl transition duration-300 group-hover:scale-110" />
            </button>
            <ConfidentialityData :user="user" />
          </div>
          <div class="flex flex-col gap-15 font-medium">
            <UpdateProfileForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { toggleAvatar } from "@/features/profile-change-avatar/lib/use-profile-modal";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { UiButton } from "@/shared/ui/button";
import { ConfidentialityData } from "@/entities/profile";
import { UpdateProfileForm } from "@/features/change-user-data-form";
import profile from "@/assets/icons/nav/default-avatar.png";

const { t } = useI18n();
const { user } = useUserData();
const { avatar } = userAvatar();
const { toggleConfidentialityData } = useProfileModals();
</script>
