<template>
    <div class="mt-6 flex flex-col justify-center gap-8 rounded bg-white p-6.5 shadow-xl">
        <div class="flex w-full flex-col gap-3">
            <div class="flex items-center justify-between">
                <label class="flex gap-1 text-xs font-semibold tracking-wider">
                    QUANTITY · КОЛИЧЕСТВО
                </label>
                <div class="flex items-center justify-end gap-2 font-semibold">
                    <button
                        type="button"
                        @click="countMode = 'SAME'"
                        :class="[
                            'rounded-full px-3 py-2 text-sm tracking-widest transition duration-700',
                            countMode === 'SAME'
                                ? 'bg-black text-white'
                                : 'text-neutral-500 hover:text-black',
                        ]"
                    >
                        The same
                    </button>
                    <button
                        type="button"
                        @click="countMode = 'DIFFER'"
                        :class="[
                            'rounded-full px-3 py-2 text-sm tracking-widest transition duration-700',
                            countMode === 'DIFFER'
                                ? 'bg-black text-white'
                                : 'text-neutral-500 hover:text-black',
                        ]"
                    >
                        Different
                    </button>
                </div>
            </div>
            <div v-if="countMode === 'SAME'" class="flex">
                <UiInput
                    v-model="createProductForm.quantity"
                    @input="toggleAllVariants"
                    placeholder="product ptc."
                    class="w-75"
                    variant="createProduct"
                    :error-message="
                        createProductFormErrorMessages.quantity
                            ? createProductFormErrorMessages.quantity
                            : ''
                    "
                />
                <span class="mt-auto ml-auto text-sm font-medium text-[#A3A3A3]">
                    An equal quantity will be selected for all sizes and colors
                </span>
            </div>
            <div v-else class="pt-3">
                <table class="w-full border-collapse text-left">
                    <thead class="border-b-2">
                        <tr>
                            <th class="pb-4 font-medium">Colors</th>
                            <th
                                v-for="size in uniqueSizes(product)"
                                :key="size"
                                class="min-w-16 pb-4 text-center font-medium"
                            >
                                {{ size }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-200">
                        <tr v-for="color in uniqueColors(product)" :key="color.colorName">
                            <td :title="color.hex">
                                <div class="flex items-center gap-2">
                                    <span
                                        :style="{ background: color.hex }"
                                        class="h-10 w-10 shrink-0 rounded-full border-2 border-gray-300 shadow-sm"
                                    />
                                    <span
                                        class="text-xs font-bold whitespace-nowrap text-black uppercase"
                                    >
                                        {{ color.colorName }}
                                    </span>
                                </div>
                            </td>
                            <td
                                v-for="size in uniqueSizes(product)"
                                :key="`${color.colorName}-${size}`"
                                class="py-6 text-center"
                            >
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    :value="
                                        product.variants.find(
                                            (variant) =>
                                                variant.colorName === color.colorName &&
                                                variant.size === size,
                                        )?.count ?? 0
                                    "
                                    @input="
                                        editProductQuantity({
                                            product,
                                            color: color,
                                            size,
                                            count: ($event.target as HTMLInputElement).value,
                                        })
                                    "
                                    class="h-10 w-20 rounded-sm border-2 border-gray-300 text-center outline-none"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex w-full flex-col gap-3">
            <div class="flex items-center justify-between">
                <span class="flex gap-1 text-xs font-semibold tracking-wider">
                    SIZES · РАЗМЕРЫ
                    <span>/</span>
                    <span class="text-black uppercase">{{ pureSizesName(product) }}</span>
                </span>
                <span class="ml-auto text-xs font-medium text-[#A3A3A3]">
                    Sizes: {{ uniqueSizes(product).length }} / 6
                </span>
            </div>
            <div class="flex gap-6">
                <img
                    v-for="size in isAvailableSizes(product)"
                    :key="size?.name"
                    :src="size.url"
                    alt=""
                    :class="[size.class, 'w-15 scale-110 rounded-full transition duration-400']"
                />
            </div>
            <span v-if="moreCreateItemFormErrorMessages.sizes" class="text-xs text-red-600">
                {{ moreCreateItemFormErrorMessages.sizes }}
            </span>
        </div>
        <div class="flex w-full flex-col gap-3">
            <div class="flex items-center justify-between">
                <label class="flex gap-1 text-xs font-semibold tracking-wider">
                    COLORS · ЦВЕТА
                    <span> / </span>
                    <span class="text-black uppercase">{{ pureColorsName(product) }}</span>
                </label>
                <span class="ml-auto text-xs font-medium text-[#A3A3A3]">
                    Colors: {{ uniqueColors(product).length }} / 6
                </span>
            </div>
            <div class="flex gap-6">
                <label
                    v-for="(color, index) in pureInfoColors(product)"
                    :key="color.hex"
                    :title="color.hex"
                    :style="{ background: color.hex }"
                    class="h-15 w-15 scale-110 rounded-full border-2 border-[#A3A3A3] transition-all duration-300"
                >
                    <input
                        @change="(e) => editProductColors({ product, index, eventOrColor: e })"
                        type="color"
                        class="absolute inset-0 h-full cursor-pointer opacity-0"
                    />
                </label>
            </div>
            <span v-if="moreCreateItemFormErrorMessages.colors" class="text-xs text-red-600">
                {{ moreCreateItemFormErrorMessages.colors }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/product-helper";
import {
    useEditProductColors,
    useEditProductQuantity,
} from "@/features/product-edit-form/api/update-product";
import { productFormHelper } from "@/features/product-form/lib/product-form-helper";
import {
    createProductForm,
    createProductFormErrorMessages,
    moreCreateItemFormErrorMessages,
} from "@/entities/product-form/model/product-forms";
import { UiInput } from "@/shared/ui/input";
import type { Product } from "@/shared";

defineProps<{
    product: Product;
}>();

const { editProductColors } = useEditProductColors();
const { editProductQuantity } = useEditProductQuantity();
const { toggleAllVariants, countMode } = productFormHelper();
const {
    pureInfoColors,
    pureColorsName,
    pureSizesName,
    isAvailableSizes,
    uniqueSizes,
    uniqueColors,
} = productHelper();
</script>
