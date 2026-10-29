<template>
    <div
        @click="toggleDeleteChoice('', '', '')"
        class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    >
        <div
            @click.stop
            class="flex h-50 w-100 items-center justify-center rounded-md bg-white py-2 text-lg"
        >
            <div class="flex flex-col items-center gap-8">
                <h1 class="w-60 text-center font-medium">{{ deleteMessage }}</h1>
                <div class="flex gap-10">
                    <UiButton name="Cancel" variant="cancel" @click="toggleDeleteChoice" />
                    <UiButton name="Confirm" variant="confirm" @click="generalDelete" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { UiButton } from "@/shared/ui/button";

const { toggleDeleteChoice, generalDelete, deleteMessage } = baseDeleteModal();
</script>
