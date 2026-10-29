<template>
    <div class="font-dm-sans fixed inset-0">
        <div
            class="no-scrollbar h-full overflow-hidden overflow-y-auto bg-[#F0F0F0] px-4 py-2 shadow-md"
        >
            <div class="flex">
                <router-link
                    @click="clearProductForm"
                    :to="{ name: 'my/products' }"
                    class="ml-auto h-fit w-fit transform cursor-pointer rounded-md bg-[#3B3C36] px-10 py-2 text-start text-xs font-medium text-white transition duration-300 hover:scale-108 hover:bg-[#1d1e1b]"
                >
                    Exit
                </router-link>
            </div>
            <div class="flex justify-center">
                <main class="flex flex-col gap-5">
                    <router-view />
                </main>
            </div>
        </div>
    </div>
    <Transition name="modal">
        <Notification v-if="notify" />
    </Transition>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/use-notify.ts";
import { clearProductForm } from "@/features/product-form/lib/clear-product-form.ts";
import { Notification } from "@/shared";

const { notify } = useBaseModals();
</script>
