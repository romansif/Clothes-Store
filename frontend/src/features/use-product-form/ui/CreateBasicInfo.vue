<template>
  <form @keydown.enter="createProduct" action=""
        class="bg-white p-6.5 mt-6 flex flex-col justify-center gap-8 rounded shadow-xl">
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
            <span class="text-[#A3A3A3] ml-auto font-medium">{{ createProductForm.title.length }} / 50</span>
          </div>
        </label>
        <BaseInput v-model="createProductForm.title" type="text" placeholder="title, name etc."
                   :error="createProductFormErrors.titleError" variant="createProduct" required
                   :error-message="createProductFormErrors.titleError ? createProductFormMessages.titleMessage : ''"/>
      </div>
    </div>
    <div class="flex gap-6">
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>COLLECTION · КОЛЛЕКЦИЯ</span>
            <span class="text-red-500">*</span>
          </div>
        </label>
        <select v-model="createProductForm.collection" :class="[`w-full border border-gray-300 rounded-sm
                          outline-none px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`,
                            createProductForm.collection ? 'text-black' : '',
                            createProductFormErrors.collectionsError ? 'border-red-500' : '']">
          <option disabled hidden value="">
            Void
          </option>
          <option v-for="collection in collections" :key="collection.name" class="text-black"
                  :value="{ season: collection.season, name: collection.name, condition: collection.condition}">
            Name: {{ collection.name }} ,
            Season: {{ collection.season }} ,
            Condition: {{ collection.condition }}
          </option>
        </select>
        <span v-if="createProductFormErrors.collectionsError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.collectionsMessage }}
                  </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>CATEGORY · КАТЕГОРИЯ</span>
            <span class="text-red-500">*</span>
          </div>
        </label>
        <select v-model="createProductForm.category" :class="[`w-full border border-gray-300 rounded-sm
                          outline-none px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`,
                            createProductForm.category ? 'text-black' : '',
                            createProductFormErrors.categoryError ? 'border-red-500' : '']">
          <option disabled hidden value="">
            Shirt
          </option>
          <option v-for="category in categories" class="text-black">{{ category.category }}</option>
        </select>
        <span v-if="createProductFormErrors.categoryError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.categoryMessage }}
                  </span>
      </div>
    </div>
    <div class="flex gap-6 w-full">
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>MATERIAL · МАТЕРИАЛ</span>
            <span class="text-red-500">*</span>
          </div>
        </label>
        <select v-model="createProductForm.material" :class="[`w-full border border-gray-300 rounded-sm
                          outline-none px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`,
                            createProductForm.material ? 'text-black' : '',
                            createProductFormErrors.materialError ? 'border-red-500' : '']">
          <option disabled hidden value="">
            Cotton
          </option>
          <option v-for="material in materials" class="text-black">{{ material.material }}</option>
        </select>
        <span v-if="createProductFormErrors.materialError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.materialMessage }}
                  </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>GENDER · ПОЛ</span>
            <span class="text-red-500">*</span>
          </div>
        </label>
        <div class="flex flex-col gap-3">
          <select v-model="createProductForm.gender" :class="[`border border-gray-300 rounded-sm outline-none
                            px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`,
                              createProductForm.gender ? 'text-black' : '',
                              createProductFormErrors.genderError ? 'border-red-500' : '']">
            <option disabled hidden value="">
              man, woman, kids
            </option>
            <option v-for="gender in genders" class="text-black">{{ gender.gender }}</option>
          </select>
          <span v-if="createProductFormErrors.genderError" class="text-red-600 text-xs">
                      {{ createProductFormMessages.genderMessage }}
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
          </div>
        </label>
        <IMask v-model:value="createProductForm.sku" type="text" inputmode="numeric" placeholder="BLC-XS-001" :mask="skuMask.mask"
               :class="['uppercase border border-gray-300 rounded-sm outline-none px-6 py-5 text-sm bg-white ' +
                          'transition duration-400 font-dm-sans', createProductFormErrors.skuError ? 'border-red-500' : '']" />
        <span v-if="createProductFormErrors.skuError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.skuMessage }}
                  </span>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>PRICE · ЦЕНА</span>
            <span class="text-red-500">*</span>
          </div>
        </label>
        <BaseInput v-model="createProductForm.price" type="number" placeholder="$00.00 "
                   :error="createProductFormErrors.priceError" variant="createProduct" required
                   :error-message="createProductFormErrors.priceError ? createProductFormMessages.priceMessage : ''"/>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label for="" class="font-semibold tracking-wider text-xs">
        <div class="flex gap-1">
          <span>DESC. · ОПИСАНИЕ</span>
          <span class="text-red-500">*</span>
        </div>
      </label>
      <textarea v-model="createProductForm.description" type="text" placeholder="short desc. product"
                :class="['h-25 border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white',
                            createProductFormErrors.descriptionError ? 'border-red-500' : '']" />
      <span v-if="createProductFormErrors.descriptionError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.descriptionMessage }}
                </span>
      <span class="ml-auto text-[#A3A3A3] text-xs font-medium">{{ createProductForm.title.length }} / 100</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { productStore } from "@/features/use-all-product/model/product.store.ts";
import { useAddProduct } from "@/features/use-all-product/api/add-product.ts";
import { productForms } from "@/features/use-product-form/model/product.forms.ts";
import { productsFormErrors } from "@/features/use-product-form/lib/product.error.ts";

import BaseInput from "@/shared/ui/BaseInput.vue";

const { createProduct } = useAddProduct();
const { createProductFormErrors } = productsFormErrors();
const { createProductForm, createProductFormMessages } = productForms();
const { collections, categories, materials, genders, skuMask } = productStore();


watch(() => [
      createProductForm.value.title, createProductForm.value.collection,
      createProductForm.value.category, createProductForm.value.material, createProductForm.value.gender,
      createProductForm.value.sku, createProductForm.value.price, createProductForm.value.description],
    ([title, collection, category, material, gender, sku, price, description]) => {
      if(title){
        createProductFormErrors.value.titleError = false;
      }if(collection){
        createProductFormErrors.value.collectionsError = false;
      }if(category){
        createProductFormErrors.value.categoryError = false;
      }if(material){
        createProductFormErrors.value.materialError = false;
      }if(gender){
        createProductFormErrors.value.genderError = false;
      }if(sku){
        createProductFormErrors.value.skuError = false;
      }if(price){
        createProductFormErrors.value.priceError = false;
      }if(description){
        createProductFormErrors.value.descriptionError = false;
      }
    });
</script>


<style scoped>

</style>