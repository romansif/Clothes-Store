<template>
  <div>
    <div
      class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      @click="toggleConfidentialityData"
    >
      <div @click.stop class="flex h-full w-full flex-col bg-white p-5">
        <div class="flex flex-col gap-2 border-b pb-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold">{{ t("profile.modal.confidentiality") }}</h1>
            <UiButton :name="t('common.exit')" variant="exitClose" @click="toggleConfidentialityData" />
          </div>
          <span class="text-sm text-[#A3A3A3]">{{ t("profile.modal.confidentialityHint") }}</span>
        </div>
        <div class="grid gap-10 py-10 lg:grid-cols-[3fr_7fr]">
          <div class="font-dm-sans flex flex-col gap-10 text-lg font-semibold">
            <button @click="toggleAvatar">
              <img
                :src="user ? avatar() : profile"
                alt=""
                class="h-full w-full rounded-4xl bg-white object-cover transition duration-300 group-hover:scale-110"
              />
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
import { useUserData } from "@/shared/lib";
import { useProfileModals } from "@/shared/lib";
import { toggleAvatar } from "@/features/profile-change-avatar";
import { userAvatar } from "@/shared/lib";
import { UiButton } from "@/shared/ui/button";
import { ConfidentialityData } from "@/entities/profile";
import { UpdateProfileForm } from "@/features/change-user-data-form";
import profile from "@/assets/icons/nav/default-avatar.png";

const { t } = useI18n();
const { user } = useUserData();
const { avatar } = userAvatar();
const { toggleConfidentialityData } = useProfileModals();
</script>
