<template>
  <div class="mt-6 flex flex-col justify-center gap-8 rounded bg-white p-6.5 shadow-xl">
    <div class="flex flex-col gap-1">
      <h2 class="text-2xl font-semibold tracking-wider">{{ t("productForm.basicInfo") }}</h2>
      <span class="text-sm font-medium text-[#A3A3A3]">{{ t("productForm.basicInfoHint") }}</span>
    </div>
    <div class="mt-3 flex gap-6 border-b-2 pb-4">
      <div class="flex w-full flex-col gap-3">
        <label class="flex gap-1 text-xs font-semibold tracking-wider">
          {{ t("productForm.title") }}
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else-if="product">
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
          </template>
        </label>
        <UiInput
          v-model="createProductForm.title"
          :placeholder="t('productForm.titlePh')"
          variant="createProduct"
          :max-length="50"
          :error-message="createProductFormErrorMessages.title"
        />
      </div>
    </div>
    <div class="flex gap-6">
      <div class="flex w-full flex-col gap-3">
        <label class="flex gap-1 text-xs font-semibold tracking-wider">
          {{ t("productForm.collection") }}
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else-if="product">
            <span>/</span>
            <span class="text-black uppercase">{{ product.collection.name }}</span>
          </template>
        </label>
        <div class="relative">
          <select
            v-model="createProductForm.collections"
            :class="[baseSelectClass(createProductForm.collections), createProductFormErrorMessages.collections ? productFormErrorClass : '']"
          >
            <option
              v-for="collection in collections"
              :key="collection.name"
              :value="{
                season: collection.season,
                name: collection.name,
                condition: collection.condition,
              }"
            >
              {{
                t("productForm.collectionOption", {
                  name: collection.name,
                  season: t(collection.seasonLabel),
                  condition: t(collection.conditionLabel),
                })
              }}
            </option>
          </select>
          <span v-if="createProductForm.collections.name.length === 0" class="absolute top-1/3 left-5 text-sm text-gray-400">
            {{ t("productForm.collectionEmpty") }}
          </span>
        </div>
        <span v-if="createProductFormErrorMessages.collections" class="text-xs text-red-600">
          {{ createProductFormErrorMessages.collections }}
        </span>
      </div>
      <div class="flex w-full flex-col gap-3">
        <label class="flex gap-1 text-xs font-semibold tracking-wider">
          {{ t("productForm.category") }}
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else-if="product">
            <span>/</span>
            <span class="text-black uppercase">{{ product.category }}</span>
          </template>
        </label>
        <select
          v-model="createProductForm.category"
          :class="[baseSelectClass(createProductForm.category), createProductFormErrorMessages.category ? productFormErrorClass : '']"
        >
          <option disabled hidden value="">{{ t("productForm.categoryPh") }}</option>
          <option v-for="category in categories" :value="category.category" class="text-black">
            {{ t(category.categoryLabel) }}
          </option>
        </select>
        <span v-if="createProductFormErrorMessages.category" class="text-xs text-red-600">
          {{ createProductFormErrorMessages.category }}
        </span>
      </div>
    </div>
    <div class="flex w-full gap-6">
      <div class="flex w-full flex-col gap-3">
        <label class="flex gap-1 text-xs font-semibold tracking-wider">
          {{ t("productForm.material") }}
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else-if="product">
            <span>/</span>
            <span class="text-black uppercase">{{ product.material }}</span>
          </template>
        </label>
        <select
          v-model="createProductForm.material"
          :class="[baseSelectClass(createProductForm.material), createProductFormErrorMessages.material ? productFormErrorClass : '']"
        >
          <option disabled hidden value="">{{ t("productForm.materialPh") }}</option>
          <option v-for="material in materials" :value="material.material" class="text-black">
            {{ t(material.materialLabel) }}
          </option>
        </select>
        <span v-if="createProductFormErrorMessages.material" class="text-xs text-red-600">
          {{ createProductFormErrorMessages.material }}
        </span>
      </div>
      <div class="flex w-full flex-col gap-3">
        <label class="flex gap-1 text-xs font-semibold tracking-wider">
          {{ t("productForm.gender") }}
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else-if="product">
            <span>/</span>
            <span class="text-black uppercase">{{ product.gender }}</span>
          </template>
        </label>
        <div class="flex flex-col gap-3">
          <select
            v-model="createProductForm.gender"
            :class="[baseSelectClass(createProductForm.gender), createProductFormErrorMessages.gender ? productFormErrorClass : '']"
          >
            <option disabled hidden value="">{{ t("productForm.genderPh") }}</option>
            <option v-for="gender in genders" :value="gender.gender" class="text-black">
              {{ t(gender.genderLabel) }}
            </option>
          </select>
          <span v-if="createProductFormErrorMessages.gender" class="text-xs text-red-600">
            {{ createProductFormErrorMessages.gender }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex w-full gap-6">
      <div class="flex w-full flex-col gap-3">
        <label class="flex gap-1 text-xs font-semibold tracking-wider">
          {{ t("productForm.sku") }}
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else-if="product">
            <span>/</span>
            <span class="text-black uppercase">{{ product.sku }}</span>
          </template>
        </label>
        <IMask
          v-model:value="createProductForm.sku"
          placeholder="BLC-XS-001"
          :mask="skuMask.mask"
          :class="[skuClass, createProductFormErrorMessages.sku ? productFormErrorClass : '']"
        />
        <span v-if="createProductFormErrorMessages.sku" class="text-xs text-red-600">
          {{ createProductFormErrorMessages.sku }}
        </span>
      </div>
      <div class="flex w-full flex-col gap-3">
        <label class="flex gap-1 text-xs font-semibold tracking-wider">
          {{ t("productForm.price") }}
          <span v-if="isCreate" class="text-red-500">*</span>
          <template v-else-if="product">
            <span>/</span>
            <span class="text-black uppercase">{{ product.price }}</span>
          </template>
        </label>
        <UiInput
          v-model="createProductForm.price"
          type="number"
          placeholder="$00.00"
          variant="createProduct"
          :error-message="createProductFormErrorMessages.price"
        />
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label class="flex gap-1 text-xs font-semibold tracking-wider">
        {{ t("productForm.description") }}
        <span v-if="isCreate" class="text-red-500">*</span>
        <template v-else-if="product">
          <span>/</span>
          <span class="text-black uppercase">{{ product.description }}</span>
        </template>
      </label>
      <UiProductTextarea
        v-model="createProductForm.description"
        :placeholder="t('productForm.descriptionPh')"
        :error-message="createProductFormErrorMessages.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { IMaskComponent as IMask } from "vue-imask";
import { useProductForm } from "@/entities/product-form/lib/use-product-form";
import { productSpecific } from "@/entities/product-form/model/product-specific";
import { baseSelectClass, skuClass, productFormErrorClass } from "@/features/product-form/model/product-form.variants";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { createProductForm, createProductFormErrorMessages } from "@/entities/product-form/model/product-forms";
import { UiInput } from "@/shared/ui/input";
import { UiProductTextarea } from "@/shared/ui/product-textarea";
import type { Product } from "@/shared";

defineProps<{
  product?: Product;
}>();

const route = useRoute();

const { t } = useI18n();
const { isCreate } = useProductForm(route);
const { collections, categories, materials, genders, skuMask } = productSpecific();

refClearErrorsOnChange(createProductForm, createProductFormErrorMessages);
</script>
