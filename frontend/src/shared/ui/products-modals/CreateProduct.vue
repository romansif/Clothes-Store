<script setup lang="ts">
import { watch } from "vue";
import { productsCover } from "@/shared/composables/product.cover.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { useProductsModals } from "@/shared/composables/modals/products.modals";
import { productsForms } from "@/shared/composables/forms/products.forms";
import { productsFormErrors } from "@/shared/composables/errors/errors-messages/products.errors";

import BaseInput from "@/shared/ui/base/input/BaseInput.vue";
import close from '@/app/assets/icons/delete-close/del_address_card.svg';

const { toggleSize, toggleColor } = productsCover();
const { createProductFormErrors } = productsFormErrors();
const { createProduct, onFilesSelected } = useProducts();
const { createProductForm, moreCreateItem, createProductFormMessages } = productsForms();
const { sizes, categories, materials, genders, productsPreview } = productsStore();
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
            <div class="flex gap-6">
              <div class="flex flex-col gap-3.5 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">TITLE</label>
                <BaseInput v-model="createProductForm.title" type="text" placeholder="title, name etc."
                    :error="createProductFormErrors.titleError" variant="createProduct" required
                    :error-message="createProductFormErrors.titleError ? createProductFormMessages.titleMessage : ''"/>
              </div>
              <div class="flex flex-col gap-3.5 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">CATEGORY</label>
                <select v-model="createProductForm.category" :class="[`border border-gray-300 rounded-sm outline-none
                    px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`, createProductForm.category ? 'text-black' : '',
                    createProductFormErrors.categoryError ? 'border-red-500' : '']">
                  <option disabled hidden value="">
                    shirt, shoes etc.
                  </option>
                  <option v-for="category in categories" class="text-black">{{ category.category }}</option>
                </select>
                <span v-if="createProductFormErrors.categoryError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.categoryMessage }}
                </span>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="flex flex-col gap-3.5 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">MATERIAL</label>
                <select v-model="createProductForm.material" :class="[`border border-gray-300 rounded-sm outline-none
                    px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`,  createProductForm.material ? 'text-black' : '',
                    createProductFormErrors.materialError ? 'border-red-500' : '']">
                  <option disabled value="">
                    cotton, wool etc.
                  </option>
                  <option v-for="material in materials" class="text-black">{{ material.material }}</option>
                </select>
                <span v-if="createProductFormErrors.materialError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.materialMessage }}
                </span>
              </div>
              <div class="flex flex-col gap-3.5 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">PRICE</label>
                <BaseInput v-model="createProductForm.price" type="number" placeholder="$00.00"
                    :error="createProductFormErrors.priceError" variant="createProduct" required
                    :error-message="createProductFormErrors.priceError ? createProductFormMessages.priceMessage : ''"/>
              </div>
            </div>
            <div class="flex flex-col gap-3">
              <div class="flex gap-6">
                <div class="flex flex-col gap-3.5 w-[490px]">
                  <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">
                    Gender
                  </label>
                  <div class="flex flex-col gap-3">
                    <select v-model="createProductForm.gender" :class="[`border border-gray-300 rounded-sm outline-none
                          px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`, createProductForm.gender ? 'text-black' : '',
                           createProductFormErrors.genderError ? 'border-red-500' : '']">
                      <option disabled value="">
                        man, woman, kids
                      </option>
                      <option v-for="gender in genders" class="text-black">{{ gender.gender }}</option>
                    </select>
                    <span v-if="createProductFormErrors.genderError" class="text-red-600 text-xs">
                      {{ createProductFormMessages.genderMessage }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-col gap-3.5 w-[490px]">
                  <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">
                    Quantity
                  </label>
                  <div class="flex flex-col gap-6">
                    <BaseInput v-model="createProductForm.quantity" type="number" placeholder="quantity of product"
                               :error="createProductFormErrors.quantityError" variant="createProduct" required
                               :error-message="createProductFormErrors.quantityError ? createProductFormMessages.quantityMessage : ''"/>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3.5">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">DESCRIPTION</label>
                <textarea v-model="createProductForm.description" type="text" placeholder="short desc. product"
                          :class="['h-[100px] border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white',
                  createProductFormErrors.descriptionError ? 'border-red-500' : '']" />
                <span v-if="createProductFormErrors.descriptionError" class="text-red-600 text-xs">
                {{ createProductFormMessages.descriptionMessage }}
              </span>
              </div>
              <div class="flex item-center gap-6">
                <div class="flex flex-col gap-3.5">
                  <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">
                    SIZES
                  </label>
                  <div class="flex gap-6">
                    <img v-for="size in sizes" :key="size.name" :src=size.url alt="" :class="[size.class,
                          moreCreateItem.size.includes(size.name)
                            ? 'transition duration-400 scale-120 w-[61.5px]'
                            : 'transition duration-400 hover:scale-120 w-[61.5px]']" @click="toggleSize(size.name)">
                  </div>
                  <span v-if="createProductFormErrors.sizeError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.sizeMessage }}
                  </span>
                </div>
                <div class="flex flex-col gap-3.5 w-[490px]">
                  <div class="flex items-center justify-between">
                    <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">
                      COLORS
                    </label>
                    <span class="text-xs text-[#A3A3A3]">Added: {{ moreCreateItem.color.length }} / 6</span>
                  </div>
                  <div class="flex items-center gap-6">
                    <div v-for="hex in moreCreateItem.color" :key="hex" :title="hex" :style="{ background: hex }"
                         class="w-[62px] h-[62px] transition-all duration-300 scale-115"></div>
                    <label v-if="(moreCreateItem.color?.length || 0) < 6" class="w-[62px] h-[62px] border-3 border-dashed
                      border-gray-300 bg-white flex items-center justify-center text-gray-400 cursor-pointer
                        transition-all duration-400 hover:scale-115 hover:border-black hover:text-black text-2xl font-light
                        relative overflow-hidden" title="Выбрать любой цвет"> +
                      <input @change="toggleColor" type="color" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </label>
                  </div>
                  <span v-if="createProductFormErrors.colorError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.colorMessage }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="flex flex-col items-center gap-3.5">
        <span class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
          PREVIEW
        </span>
          <div @click="openSelectProductCard(0)" class="bg-white h-[394px] w-[330px] shadow-lg transition duration-400
              hover:scale-108">
            <img v-if="productsPreview[0]" @click="openSelectProductCard(0)"
                 :src="productsPreview[0] ? productsPreview[0] : ''" alt="" class="w-[330px] h-full transition duration-400
                 hover:scale-105">
          </div>
          <div class="flex gap-7 mt-4">
            <div @click="openSelectProductCard(index)" v-for="index in 4" :key="index" class="bg-white h-[75px] w-[62px] shadow-lg
                transition duration-400 hover:scale-115">
              <img @click="openSelectProductCard(index)" :src="productsPreview[index] ? productsPreview[index] : ''" alt=""
                   class="transition duration-400 hover:scale-108">
            </div>
          </div>
          <div class="flex px-8">
            <div class="flex gap-10 mt-8">
              <button @click="createProduct" class="transition duration-400 hover:scale-108 bg-black text-white rounded
                  px-25 py-5 font-semibold text-start">
                Create
              </button>
            </div>
            <input type="file" :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*" @change="onFilesSelected" class="hidden">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>