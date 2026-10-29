<template>
    <div class="mt-6 flex flex-col justify-center gap-8 rounded bg-white p-6.5 shadow-xl">
        <div class="flex w-full flex-col gap-3">
            <div class="flex items-center justify-between">
                <label class="flex gap-1 text-xs font-semibold tracking-wider">
                    QUANTITY · КОЛИЧЕСТВО
                    <span class="text-red-500">*</span>
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
                        <tr class="">
                            <th class="pb-4 font-medium">Colors</th>
                            <th
                                v-for="size in moreCreateItemForm.sizes"
                                :key="size"
                                class="min-w-16 pb-4 text-center font-medium"
                            >
                                {{ size }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-200">
                        <tr v-for="color in moreCreateItemForm.colors" :key="color.hex">
                            <td :title="color.hex">
                                <div class="flex items-center gap-2">
                                    <span
                                        :style="{ background: color.hex }"
                                        class="h-10 w-10 shrink-0 rounded-full border-2 border-gray-300 shadow-sm"
                                    ></span>
                                    <span
                                        class="text-xs font-bold whitespace-nowrap text-black uppercase"
                                    >
                                        {{ color.colorName }}
                                    </span>
                                </div>
                            </td>
                            <td
                                v-for="size in moreCreateItemForm.sizes"
                                :key="size"
                                class="py-6 text-center"
                            >
                                <input
                                    v-model="toggleQuantity(color.hex, color.colorName, size).count"
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder="0"
                                    :aria-label="`${color.colorName}, размер ${size}`"
                                    class="h-10 w-20 rounded-sm border-2 border-gray-300 text-center outline-none"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center">
                    <span
                        v-if="
                            !moreCreateItemForm.colors?.length && !moreCreateItemForm.sizes?.length
                        "
                        class="py-8 text-center text-[#A3A3A3]"
                    >
                        Select sizes and colors to populate the stock levels.
                    </span>
                    <span
                        v-else-if="!moreCreateItemForm.colors?.length"
                        class="py-8 text-center text-[#A3A3A3]"
                    >
                        Select colors to populate the stock levels.
                    </span>
                    <span
                        v-else-if="!moreCreateItemForm.sizes?.length"
                        class="py-8 text-center text-[#A3A3A3]"
                    >
                        Select sizes to populate the stock levels.
                    </span>
                </div>
                <span v-if="moreCreateItemFormErrorMessages.variants" class="text-xs text-red-600">
                    {{ moreCreateItemFormErrorMessages.variants }}
                </span>
            </div>
        </div>
        <div class="flex w-full flex-col gap-3">
            <div class="flex items-center justify-between">
                <span class="flex gap-1 text-xs font-semibold tracking-wider">
                    SIZES · РАЗМЕРЫ
                    <span class="text-red-500">*</span>
                </span>
                <span class="ml-auto text-xs font-medium text-[#A3A3A3]">
                    Sizes: {{ moreCreateItemForm.sizes.length }} / 6
                </span>
            </div>
            <div class="flex gap-6">
                <img
                    v-for="size in sizes"
                    :key="size.name"
                    :src="size.url"
                    alt=""
                    :class="[
                        size.class,
                        moreCreateItemForm.sizes.includes(size.name)
                            ? 'w-15 scale-110 rounded-full transition duration-400'
                            : 'w-15 rounded-full transition duration-400 hover:scale-110',
                    ]"
                    @click="toggleSize(size.name)"
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
                    <span class="text-red-500">*</span>
                </label>
                <span class="ml-auto text-xs font-medium text-[#A3A3A3]">
                    Colors: {{ moreCreateItemForm.colors.length }} / 6
                </span>
            </div>
            <div class="flex gap-6">
                <div
                    v-for="color in moreCreateItemForm.colors"
                    :key="color.hex"
                    class="h-15 w-15 scale-110 rounded-full border-2 border-[#A3A3A3] transition-all duration-300"
                    :title="color.hex"
                    :style="{ background: color.hex }"
                    @click="toggleColor(color.hex, $event)"
                ></div>
                <label
                    v-if="moreCreateItemForm.colors?.length < 6"
                    title="Выбрать любой цвет"
                    class="relative flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-white text-2xl font-light text-gray-400 transition-all duration-400 hover:scale-108 hover:border-black hover:text-black"
                    >+
                    <input
                        @change="toggleColor(($event.target as HTMLInputElement).value, $event)"
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
import { sizes } from "@/shared/model/product-sizes";
import { productFormHelper } from "@/features/product-form/lib/product-form-helper";
import { reactiveClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { UiInput } from "@/shared/ui/input";
import {
    createProductForm,
    moreCreateItemForm,
    createProductFormErrorMessages,
    moreCreateItemFormErrorMessages,
} from "@/entities/product-form/model/product-forms";

const { toggleAllVariants, toggleQuantity, toggleSize, toggleColor, countMode } =
    productFormHelper();

reactiveClearErrorsOnChange(moreCreateItemForm, moreCreateItemFormErrorMessages);
</script>
