<template>
    <div class="flex w-full flex-col gap-6 rounded bg-white p-6.5 shadow-xl">
        <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">Image slots</h1>
            <h2 class="text-sm font-medium text-[#A3A3A3]">
                5 slots: 1 main photo + 4 additional ones. Click on a slot to select a file
            </h2>
        </div>
        <div class="flex gap-6">
            <div
                class="h-90 w-90 cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-gray-50 transition duration-400 hover:scale-105 hover:bg-gray-100"
                @click="openSelectImage(0)"
            >
                <img
                    v-if="pureCards(product)[0]"
                    :src="pureCards(product)[0]"
                    alt=""
                    class="h-90 w-90 transition duration-400"
                />
                <div v-else class="p-4 text-mauve-100">
                    <span class="rounded-full bg-black px-2 py-1.5 font-bold"> Main Photo </span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div
                    v-for="index in [1, 2, 3, 4]"
                    :key="index"
                    class="h-43.5 w-43.5 cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-gray-50 transition duration-400 hover:scale-105 hover:bg-gray-100"
                    @click="openSelectImage(index)"
                >
                    <img
                        v-if="pureCards(product)[index]"
                        :src="pureCards(product)[index]"
                        alt=""
                        class="h-43.5 w-43.5 transition duration-400"
                    />
                    <div v-else class="p-4 text-mauve-500">
                        <span
                            class="rounded-full border border-gray-400 bg-gray-100 px-2 py-1.5 font-bold"
                        >
                            Photo {{ index }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <h2 class="text-sm font-medium text-[#A3A3A3]">
                The first photo is used in the catalog
            </h2>
            <h2 class="text-sm font-medium text-[#A3A3A3]">
                Formats: JPG · PNG · WEBP Max. size: 5 MB Aspect ratio: 4:5
            </h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { productHelper, activeProductImg } from "@/shared/lib/product-helper.ts";
import type { Product } from "@/shared/model/product.types.ts";

const props = defineProps<{
    product: Product;
}>();

const { openSelectImage, pureCards, productInfoPreview } = productHelper();

onMounted(async () => {
    if (props.product && Array.isArray(props.product.images) && props.product.images[0]) {
        activeProductImg.value = productInfoPreview(props.product) ?? "";
    }
});
</script>
