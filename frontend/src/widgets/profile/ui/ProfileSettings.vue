<template>
    <div v-if="props.user" class="flex flex-col rounded-xl bg-white shadow-2xl">
        <div class="flex p-5">
            <div class="flex items-center gap-10">
                <img
                    :src="avatar()"
                    alt=""
                    class="w-25 rounded-full transition duration-400 hover:scale-108"
                    @click="toggleAvatar"
                />
                <div class="flex flex-col gap-4 text-xl font-semibold">
                    <div class="font-dm-sans flex gap-2">
                        <span>Name:</span>
                        <span>
                            {{ props.user.name }}
                        </span>
                    </div>
                    <div v-if="!props.user.surName" class="flex gap-2">
                        <span class="text-sm font-medium opacity-50"> Surname not provided </span>
                    </div>
                    <div v-else class="font-dm-sans flex gap-2">
                        <span>Surname:</span>
                        <span>
                            {{ props.user.surName }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="ml-auto flex gap-2">
                <ProfileMenu :user="user" />
            </div>
        </div>
        <div class="flex flex-col border-t border-gray-300 font-medium">
            <OpenProfileModals :user="props.user" />
        </div>
    </div>
    <ProfileModals />
</template>

<script setup lang="ts">
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { toggleAvatar } from "@/features/profile-change-avatar/lib/use-profile-modal";
import { OpenProfileModals } from "@/widgets/profile";
import { ProfileModals } from "@/widgets/profile";
import { ProfileMenu } from "@/features/profile-menu";
import type { User } from "@/entities/profile";

const props = defineProps<{
    user: User;
}>();

const { avatar } = userAvatar();
</script>
