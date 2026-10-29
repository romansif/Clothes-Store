<template>
    <div>
        <div
            class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] py-14"
            @click="toggleConfidentialityData"
        >
            <div @click.stop class="flex h-full w-275 flex-col rounded-xl bg-white p-5">
                <div class="flex flex-col gap-2 border-b pb-4">
                    <div class="flex items-center">
                        <h1 class="text-2xl font-bold">CONFIDENTIALITY DATA</h1>
                        <UiButton
                            name="Exit"
                            variant="exitClose"
                            @click="toggleConfidentialityData"
                        />
                    </div>
                    <span class="text-sm text-[#A3A3A3]"
                        >You can view or change your confidential data.</span
                    >
                </div>
                <div class="no-scrollbar flex h-150 flex-col overflow-y-auto">
                    <div class="font-dm-sans flex gap-10 text-lg font-semibold">
                        <ConfidentialityData :user="user" />
                    </div>
                    <div class="flex flex-col gap-5 pt-5 font-medium">
                        <UpdateProfileForm />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { UiButton } from "@/shared/ui/button";
import { ConfidentialityData } from "@/entities/profile";
import { UpdateProfileForm } from "@/features/change-user-data-form";

const { user } = useUserData();
const { toggleConfidentialityData } = useProfileModals();
</script>
