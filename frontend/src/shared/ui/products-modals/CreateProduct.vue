<script setup lang="ts">
import { watch } from "vue";
import { useProducts } from "@/shared/composables/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useAddProducts } from "@/feature/products/composables/use.add.products.ts";
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";
import { productsForms } from "@/shared/composables/forms/products.forms.ts";
import { productsFormErrors } from "@/shared/composables/errors/errors-messages/products.errors.ts";

import BaseInput from "@/shared/ui/base/BaseInput.vue";
import close from '@/app/assets/icons/del_address_card.svg';

const { createProductFormErrors } = productsFormErrors();
const { createProduct, onFilesSelected } = useAddProducts();
const { createProductForm, moreCreateItem, createProductFormMessages } = productsForms();
const { colors, sizes, categories, materials, genders, productsPreview } = productsStore();
const { toggleCreateProductModal, openSelectProductCard, fileInput } = useProductsModals();

watch(() => [
      createProductForm.value.title, createProductForm.value.category,
      createProductForm.value.material, createProductForm.value.price,
      createProductForm.value.description,
      moreCreateItem.color, moreCreateItem.size,
      createProductForm.value.gender, createProductForm.value.quantity
  ],

  ([title, category, material, price, description, color, size, gender, quantity]) => {
    if(title){
      createProductFormErrors.value.titleError = false;
    }
    if(category){
      createProductFormErrors.value.categoryError = false;
    }
    if(material){
      createProductFormErrors.value.materialError = false;
    }
    if(price){
      createProductFormErrors.value.priceError = false;
    }
    if(description){
      createProductFormErrors.value.descriptionError = false;
    }
    if(color){
      createProductFormErrors.value.colorError = false;
    }
    if(size){
      createProductFormErrors.value.sizeError = false;
    }
    if(gender){
      createProductFormErrors.value.genderError = false;
    }
    if(quantity){
      createProductFormErrors.value.quantityError = false;
    }
})
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 flex items-center justify-center">
    <div class="py-2 px-2.5 bg-[#F0F0F0] shadow-md overflow-hidden w-full h-full">
      <img @click="toggleCreateProductModal" :src="close" alt="" class="w-[40px] ml-auto transition duration-400 hover:scale-120">
      <div class="flex gap-30 py-2 px-8 mt-4">
        <form @keydown.enter="createProduct" action="" class="w-[1000px] mt-2">
          <div class="flex flex-col gap-4">
            <div class="flex gap-5">
              <div class="flex flex-col gap-2 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">TITLE</label>
                <BaseInput v-model="createProductForm.title" type="text" placeholder="title, name etc."
                    :error="createProductFormErrors.titleError" variant="createProduct" required
                    :error-message="createProductFormErrors.titleError ? createProductFormMessages.titleMessage : ''"/>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">CATEGORY</label>
                <select v-model="createProductForm.category" :class="[`border border-gray-200 rounded-sm outline-none
                    px-4 py-5 text-sm bg-white`, createProductFormErrors.categoryError ? 'border-red-500' : '']">
                  <option disabled hidden value="">
                    Chose category
                  </option>
                  <option v-for="category in categories">{{ category.category }}</option>
                </select>
                <span v-if="createProductFormErrors.categoryError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.categoryMessage }}
                </span>
              </div>
            </div>
            <div class="flex gap-5">
              <div class="flex flex-col gap-2 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">MATERIAL</label>
                <select v-model="createProductForm.material" :class="[`border border-gray-200 rounded-sm outline-none
                    px-4 py-5 text-sm bg-white`, createProductFormErrors.materialError ? 'border-red-500' : '']">
                  <option disabled value="">
                    Chose material
                  </option>
                  <option v-for="material in materials">{{ material.material }}</option>
                </select>
                <span v-if="createProductFormErrors.materialError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.materialMessage }}
                </span>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">PRICE</label>
                <BaseInput v-model="createProductForm.price" type="number" placeholder="$00.00"
                    :error="createProductFormErrors.priceError" variant="createProduct" required
                    :error-message="createProductFormErrors.priceError ? createProductFormMessages.priceMessage : ''"/>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">DESCRIPTION</label>
              <textarea v-model="createProductForm.description" type="text" placeholder="short desc. product"
                  :class="['h-[100px] border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white',
                  createProductFormErrors.descriptionError ? 'border-red-500' : '']" />
              <span v-if="createProductFormErrors.descriptionError" class="text-red-600 text-xs">
                {{ createProductFormMessages.descriptionMessage }}
              </span>
            </div>
            <div class="flex gap-6">
              <div class="flex gap-3">
                <div class="flex flex-col gap-3 w-[240px]">
                  <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">
                    Gender
                  </label>
                  <div class="flex flex-col gap-5">
                    <select v-model="createProductForm.gender" :class="[`border border-gray-200 rounded-sm outline-none
                          px-4 py-5 text-sm bg-white`, createProductFormErrors.genderError ? 'border-red-500' : '']">
                      <option disabled value="">
                        Chose gender
                      </option>
                      <option v-for="gender in genders">{{ gender.gender }}</option>
                    </select>
                    <span v-if="createProductFormErrors.genderError" class="text-red-600 text-xs">
                        {{ createProductFormMessages.genderMessage }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-col gap-3 w-[240px]">
                  <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">
                    Quantity
                  </label>
                  <div class="flex flex-col gap-5">
                    <BaseInput v-model="createProductForm.quantity" type="number" placeholder="quantity of product"
                        :error="createProductFormErrors.quantityError" variant="createProduct" required
                        :error-message="createProductFormErrors.quantityError ? createProductFormMessages.quantityMessage : ''"/>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">
                  SIZE
                </label>
                <div class="flex gap-6">
                  <img v-for="size in sizes" :key="size.name" :src=size.url alt="" :class="[size.class,
                        moreCreateItem.size.includes(size.name)
                          ? 'transition duration-400 scale-120 border-black w-[60px] h-[60px]'
                          : 'transition duration-400 hover:scale-120 w-[60px]']" @click="useProducts.toggleSize(size.name)">
                </div>
                <span v-if="createProductFormErrors.sizeError" class="text-red-600 text-xs">
                      {{ createProductFormMessages.sizeMessage }}
                  </span>
              </div>
            </div>
            <div class="flex flex-col gap-3">
              <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">
                COLOR
              </label>
              <div class="grid grid-cols-12 gap-6">
                <div v-for="color in colors" :key="color.name" :class="[color.color,
                     moreCreateItem.color.includes(color.name)
                      ? 'transition duration-400 scale-120 border-3 border-black w-[62px] h-[62px]'
                      : 'transition duration-400 hover:scale-120 w-[62px] h-[62px]']" @click="useProducts.toggleColor(color.name)"></div>
              </div>
              <span v-if="createProductFormErrors.colorError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.colorMessage }}
              </span>
            </div>
          </div>
        </form>
        <div class="flex flex-col items-center gap-2">
        <span class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
          PREVIEW
        </span>
          <div @click="openSelectProductCard(0)" class="bg-white h-[394px] w-[330px] transition duration-400 hover:scale-108">
            <img v-if="productsPreview[0]" @click="openSelectProductCard(0)"
                 :src="productsPreview[0] ? productsPreview[0] : ''" alt="" class="w-[330px] h-full transition duration-400 hover:scale-105">
          </div>
          <div class="flex gap-7 mt-4">
            <div @click="openSelectProductCard(index)" v-for="index in 4" :key="index" class="bg-white h-[75px] w-[62px] transition duration-400 hover:scale-115">
              <img @click="openSelectProductCard(index)" :src="productsPreview[index] ? productsPreview[index] : ''" alt="" class="transition duration-400 hover:scale-108">
            </div>
          </div>
          <div class="flex px-8">
            <div class="flex gap-10 mt-8">
              <button @click="createProduct" class="transition duration-400 hover:scale-108 bg-black text-white rounded px-25 py-5 font-semibold text-start">
                Create
              </button>
            </div>
            <input type="file" ref="fileInput" multiple accept="image/*" @change="onFilesSelected" class="hidden">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>