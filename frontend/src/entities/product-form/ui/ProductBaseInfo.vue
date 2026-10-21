<template>
  <div class="bg-white p-6.5 mt-6 flex flex-col justify-center gap-8 rounded shadow-xl">
    <div class="flex flex-col gap-1">
      <h2 class="text-2xl font-semibold tracking-wider">
        Basic information
      </h2>
      <span class="text-sm text-[#A3A3A3] font-medium">Product name, collection, and category</span>
    </div>
    <div class="flex gap-6 mt-3 border-b-2 pb-4">
      <div class="flex flex-col gap-3 w-full">
        <label class="flex gap-1 font-semibold tracking-wider text-xs">
          TITLE · НАЗВАНИЕ
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else>
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
          </template>
        </label>
        <BaseInput v-model="createProductForm.title"
                   placeholder="title, name etc."
                   variant="createProduct"
                   :error-message="createProductFormErrorMessages.title"/>
        <span class="text-[#A3A3A3] ml-auto font-medium">{{ createProductForm.title.length }} / 50</span>
      </div>
    </div>
    <div class="flex gap-6">
      <div class="flex flex-col gap-3 w-full">
        <label class="flex gap-1 font-semibold tracking-wider text-xs">
          COLLECTION · КОЛЛЕКЦИЯ
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else>
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
          </template>
        </label>
        <div class="relative">
          <select v-model="createProductForm.collections"
                  :class="[baseSelectClass(createProductForm.collections),
                  createProductFormErrorMessages.collections ? productFormErrorClass : '']">
            <option v-for="collection in collections" :key="collection.name"
                    :value="{
                        season: collection.season,
                        name: collection.name,
                        condition: collection.condition
                    }">
              Name: {{ collection.name }},
              Season: {{ collection.season }},
              Condition: {{ collection.condition }}
            </option>
          </select>
          <span v-if="createProductForm.collections.name.length === 0"
                class="absolute top-1/3 left-5 text-sm text-gray-400">
            Void
          </span>
        </div>
        <span v-if="createProductFormErrorMessages.collections"
              class="text-red-600 text-xs">
          {{ createProductFormErrorMessages.collections }}
        </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="flex gap-1 font-semibold tracking-wider text-xs">
          CATEGORY · КАТЕГОРИЯ
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else>
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
          </template>
        </label>
        <select v-model="createProductForm.category"
                :class="[baseSelectClass(createProductForm.category),
                  createProductFormErrorMessages.category ? productFormErrorClass : '']">
          <option disabled hidden value="">
            Shirt
          </option>
          <option v-for="category in categories" class="text-black">{{ category.category }}</option>
        </select>
        <span v-if="createProductFormErrorMessages.category"
              class="text-red-600 text-xs">
          {{ createProductFormErrorMessages.category }}
        </span>
      </div>
    </div>
    <div class="flex gap-6 w-full">
      <div class="flex flex-col gap-3 w-full">
        <label class="flex gap-1 font-semibold tracking-wider text-xs">
          MATERIAL · МАТЕРИАЛ
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else>
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
          </template>
        </label>
        <select v-model="createProductForm.material"
                :class="[baseSelectClass(createProductForm.material),
                  createProductFormErrorMessages.material ? productFormErrorClass : '']">
          <option disabled hidden value="">
            Cotton
          </option>
          <option v-for="material in materials" class="text-black">{{ material.material }}</option>
        </select>
        <span v-if="createProductFormErrorMessages.material"
              class="text-red-600 text-xs">
          {{ createProductFormErrorMessages.material }}
        </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="flex gap-1 font-semibold tracking-wider text-xs">
          GENDER · ПОЛ
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else>
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
          </template>
        </label>
        <div class="flex flex-col gap-3">
          <select v-model="createProductForm.gender"
                  :class="[baseSelectClass(createProductForm.gender),
                  createProductFormErrorMessages.gender ? productFormErrorClass : '']">
            <option disabled hidden value="">
              man, woman, kids
            </option>
            <option v-for="gender in genders" class="text-black">{{ gender.gender }}</option>
          </select>
          <span v-if="createProductFormErrorMessages.gender" class="text-red-600 text-xs">
            {{ createProductFormErrorMessages.gender }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex gap-6 w-full">
      <div class="flex flex-col gap-3 w-full">
        <label class="flex gap-1 font-semibold tracking-wider text-xs">
          SKU · АРТИКУЛ
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else>
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
          </template>
        </label>
        <IMask v-model:value="createProductForm.sku"
               placeholder="BLC-XS-001"
               :mask="skuMask.mask"
               :class="[skuClass, createProductFormErrorMessages.sku ? productFormErrorClass : '']" />
        <span v-if="createProductFormErrorMessages.sku" class="text-red-600 text-xs">
          {{ createProductFormErrorMessages.sku }}
        </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label class="flex gap-1 font-semibold tracking-wider text-xs">
          PRICE · ЦЕНА
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else>
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
          </template>
        </label>
        <BaseInput v-model="createProductForm.price"
                   type="number"
                   placeholder="$00.00"
                   variant="createProduct"
                   :error-message="createProductFormErrorMessages.price"/>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label class="flex gap-1 font-semibold tracking-wider text-xs">
        DESC. · ОПИСАНИЕ
        <span v-if="isCreate" class="text-red-500">*</span>
        <template v-else>
          <span>/</span>
          <span class="text-black uppercase">{{ product.title }}</span>
        </template>
      </label>
      <UiTextarea v-model="createProductForm.description"
                  :placeholder="'short desc. of product'"
                  :error-message="createProductFormErrorMessages.description" />
      <span class="ml-auto text-[#A3A3A3] text-xs font-medium">{{ createProductForm.description.length }} / 400</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { IMaskComponent as IMask } from "vue-imask";
import { useProductForm } from "@/entities/product-form/lib/use-product-form.ts";
import { productSpecific } from "@/entities/product-form/model/product-specific.ts";
import { baseSelectClass, skuClass, productFormErrorClass } from "@/features/use-product-form/model/product-form.variants.ts";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper.ts";
import { createProductForm, createProductFormErrorMessages } from "@/entities/product-form/model/product-forms.ts";
import type { Product } from "@/shared/model/product.types.ts";

import BaseInput from "@/shared/ui/input/BaseInput.vue";
import UiTextarea from "@/shared/ui/product-textarea/UiTextarea.vue";

defineProps<{
  product: Product
}>()

const route = useRoute()

const { isCreate } = useProductForm(route)
const { collections, categories, materials, genders, skuMask } = productSpecific();

refClearErrorsOnChange(
  createProductForm,
  createProductFormErrorMessages
)
</script>
