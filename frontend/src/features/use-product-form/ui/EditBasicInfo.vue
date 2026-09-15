<template>
  <div @keydown.enter="" class="bg-white p-6.5 mt-6 flex flex-col justify-center gap-8 rounded shadow-xl">
    <div class="flex flex-col gap-1">
      <label for="" class="text-2xl font-semibold tracking-wider">
        Basic information
      </label>
      <span class="text-sm text-[#A3A3A3] font-medium">Product name, collection, and category</span>
    </div>
    <div class="flex gap-6 mt-3 border-b-2 pb-4">
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>TITLE · НАЗВАНИЕ</span>
            <span class="text-red-500">*</span>
            <span>/</span>
            <span class="text-black uppercase">{{ product.title }}</span>
            <span class="text-[#A3A3A3] ml-auto font-medium">{{ createProductForm.title.length }} / 50</span>
          </div>
        </label>
        <BaseInput v-model="createProductForm.title"
                   placeholder="title, name etc."
                   :error="createProductFormErrors.title"
                   variant="createProduct"
                   :error-message="createProductFormErrors.title ? createProductFormErrorMessages.title : ''"/>
      </div>
    </div>
    <div class="flex gap-6">
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>COLLECTION · КОЛЛЕКЦИЯ</span>
            <span class="text-red-500">*</span>
            <span>/</span>
            <span class="text-black uppercase">{{ product.collection.name }}</span>
          </div>
        </label>
        <select v-model="createProductForm.collections"
                :class="baseSelectClass(createProductForm.collections, createProductFormErrors.collections)">
          <option v-for="collection in collections" :key="collection.name" class="text-black"
                  :value="{ season: collection.season, name: collection.name, condition: collection.condition}">
            Name: {{ collection.name }} ,
            Season: {{ collection.season }} ,
            Condition: {{ collection.condition }}
          </option>
        </select>
        <span v-if="createProductFormErrors.collections" class="text-red-600 text-xs">
          {{ createProductFormErrorMessages.collections }}
        </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>CATEGORY · КАТЕГОРИЯ</span>
            <span class="text-red-500">*</span>
            <span>/</span>
            <span class="text-black uppercase">{{ product.category }}</span>
          </div>
        </label>
        <select v-model="createProductForm.category"
                :class="baseSelectClass(createProductForm.category, createProductFormErrors.category)">
          <option disabled hidden value="">
            Shirt
          </option>
          <option v-for="category in categories" class="text-black">{{ category.category }}</option>
        </select>
        <span v-if="createProductFormErrors.category" class="text-red-600 text-xs">
          {{ createProductFormErrorMessages.category }}
        </span>
      </div>
    </div>
    <div class="flex gap-6 w-full">
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>MATERIAL · МАТЕРИАЛ</span>
            <span class="text-red-500">*</span>
            <span>/</span>
            <span class="text-black uppercase">{{ product.material }}</span>
          </div>
        </label>
        <select v-model="createProductForm.material"
                :class="baseSelectClass(createProductForm.material, createProductFormErrors.material)">
          <option disabled hidden value="">
            Cotton
          </option>
          <option v-for="material in materials" class="text-black">{{ material.material }}</option>
        </select>
        <span v-if="createProductFormErrors.material" class="text-red-600 text-xs">
          {{ createProductFormErrorMessages.material }}
        </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>GENDER · ПОЛ</span>
            <span class="text-red-500">*</span>
            <span>/</span>
            <span class="text-black uppercase">{{ product.gender }}</span>
          </div>
        </label>
        <div class="flex flex-col gap-3">
          <select v-model="createProductForm.gender"
                  :class="baseSelectClass(createProductForm.gender, createProductFormErrors.gender)">
            <option disabled hidden value="">
              man, woman, kids
            </option>
            <option v-for="gender in genders" class="text-black">{{ gender.gender }}</option>
          </select>
          <span v-if="createProductFormErrors.gender" class="text-red-600 text-xs">
            {{ createProductFormErrorMessages.gender }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex gap-6 w-full">
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>SKU · АРТИКУЛ</span>
            <span class="text-red-500">*</span>
            <span>/</span>
            <span class="text-black uppercase">{{ product.sku }}</span>
          </div>
        </label>
        <IMask v-model:value="createProductForm.sku"
               placeholder="BLC-XS-001"
               :mask="skuMask.mask"
               :class="skuClass(createProductFormErrors.sku)" />
        <span v-if="createProductFormErrors.sku" class="text-red-600 text-xs">
          {{ createProductFormErrorMessages.sku }}
        </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>PRICE · ЦЕНА</span>
            <span class="text-red-500">*</span>
            <span>/</span>
            <span class="text-black uppercase">{{ product.price }}</span>
          </div>
        </label>
        <BaseInput v-model="createProductForm.price"
                   type="number"
                   placeholder="$00.00 "
                   :error="createProductFormErrors.price"
                   variant="createProduct"
                   :error-message="createProductFormErrors.price ? createProductFormErrorMessages.price : ''"/>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label for="" class="font-semibold tracking-wider text-xs">
        <div class="flex gap-1">
          <span>DESC. · ОПИСАНИЕ</span>
          <span class="text-red-500">*</span>
          <span>/</span>
          <span class="text-black uppercase">{{ product.description }}</span>
        </div>
      </label>
      <DescriptionForm />
      <span class="ml-auto text-[#A3A3A3] text-xs font-medium">{{ createProductForm.title.length }} / 100</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { productStore } from "@/features/use-main-product/model/product.store.ts";
import { baseSelectClass, skuClass } from "@/shared/const/product-form/form.classes.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";
import { createProductForm, createProductFormErrorMessages } from "@/features/use-product-form/model/product.forms.ts";
import { createProductFormErrors } from "@/features/use-product-form/model/product.error.ts";

import BaseInput from "@/shared/ui/BaseInput.vue";
import DescriptionForm from "@/shared/ui/product-form/DescriptionForm.vue";

defineProps<{
  product: Product,
}>();

const { product } = useGetProduct();
const { collections, categories, materials, genders, skuMask } = productStore();

watch(() => [
      createProductForm.value.title, createProductForm.value.collections,
      createProductForm.value.category, createProductForm.value.material, createProductForm.value.gender,
      createProductForm.value.sku, createProductForm.value.price, createProductForm.value.description],
    ([title, collection, category, material, gender, sku, price, description]) => {
      if(title){
        createProductFormErrors.value.title = false;
      }if(collection){
        createProductFormErrors.value.collections = false;
      }if(category){
        createProductFormErrors.value.category = false;
      }if(material){
        createProductFormErrors.value.material = false;
      }if(gender){
        createProductFormErrors.value.gender = false;
      }if(sku){
        createProductFormErrors.value.sku = false;
      }if(price){
        createProductFormErrors.value.price = false;
      }if(description){
        createProductFormErrors.value.description = false;}
    });
</script>


<style scoped>

</style>