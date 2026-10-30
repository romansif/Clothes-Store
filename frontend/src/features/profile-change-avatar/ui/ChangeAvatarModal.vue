<template>
    <div
        class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        @click="toggleAvatar"
    >
        <div @click.stop class="w-112.5 rounded-2xl bg-white shadow-xl">
            <div class="flex flex-col justify-center gap-6 py-8">
                <h2 class="text-center text-2xl font-bold">Click on the avatar to change</h2>
                <div class="flex flex-col items-center gap-6">
                    <img
                        :src="avatar()"
                        alt=""
                        class="h-25 w-25 rounded-full bg-white object-cover transition duration-300 group-hover:scale-110"
                        @click="openSelectAvatar"
                    />
                    <div class="flex gap-12">
                        <UiButton name="Confirm" variant="toggleAvatar" @click="toggleAvatar" />
                    </div>
                    <input
                        type="file"
                        @change="(e) => changeAvatar(e)"
                        class="hidden"
                        :ref="
                            (el) => {
                                fileInput = el as HTMLInputElement;
                            }
                        "
                        accept="image/*"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import {
    openSelectAvatar,
    toggleAvatar,
} from "@/features/profile-change-avatar/lib/use-profile-modal";
import { useChangeAvatar } from "@/features/profile-change-avatar/api/update-avatar";
import { fileInput } from "@/shared/lib/product-helper";
import { UiButton } from "@/shared/ui/button";

const { avatar } = userAvatar();
const { changeAvatar } = useChangeAvatar();
</script>
