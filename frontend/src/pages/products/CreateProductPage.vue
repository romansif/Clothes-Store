<script setup lang="ts">
import { watch } from "vue";
import { productsCover } from "@/shared/lib/product-cover.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
import { productsApi } from "@/feature/products/api/products.api.ts";
import { useProductsModals } from "@/feature/products/lib/products.modals.ts";
import { productForms } from "@/feature/products/model/product.forms.ts";
import { productsFormErrors } from "@/feature/products/lib/products.errors.ts";

import BaseInput from "@/shared/ui/BaseInput.vue";
import Loading from "@/shared/ui/Loading.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import Notification from "@/shared/ui/Notification.vue";

const { loading, notify } = useBaseModals();
const { toggleSize, toggleColor } = productsCover();
const { createProductFormErrors } = productsFormErrors();
const { createProduct, onFilesSelected } = productsApi();
const { collections, categories, materials, genders, sizes, productsPreview } = productStore();
const { createProductForm, moreCreateItem, createProductFormMessages } = productForms();
const { openSelectProductCard, fileInput } = useProductsModals();

watch(() => [
      createProductForm.value.title, createProductForm.value.collection,
      createProductForm.value.category, createProductForm.value.material,
      createProductForm.value.price, createProductForm.value.description,
      moreCreateItem.colors, moreCreateItem.sizes,
      createProductForm.value.gender, createProductForm.value.quantity
    ],

    ([title, collection, category, material, price, description, color, size, gender, quantity]) => {
      if(title){
        createProductFormErrors.value.titleError = false;
      }
      if(collection){
        createProductFormErrors.value.collectionsError = false;
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
  <div>
    <div class="font-[Montserrat] fixed inset-0 z-50">
      <div class="py-2 px-4 bg-[#F0F0F0] shadow-md overflow-hidden h-full overflow-y-auto no-scrollbar">
        <div class="flex">
          <router-link :to="{ name: 'profile' }" class="text-start ml-auto h-fit w-fit px-10 py-2 bg-red-600 text-white
              font-medium text-xs rounded-md cursor-pointer transition duration-300 transform hover:scale-108 hover:bg-red-500">
            Exit
          </router-link>
        </div>
        <div class="flex justify-center">
          <div class="flex flex-col gap-5">
            <div class="flex flex-col items-center gap-2.5 w-full pb-6.5 border-b">
              <span class="text-start font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                  PRODUCT IMAGES PREVIEW
              </span>
              <div class="flex gap-7 w-full">
                <div v-for="index in 5" :key="index" @click="openSelectProductCard(index)"
                     class="bg-white h-68.5 w-50 border border-gray-200 transition duration-400
                        hover:scale-105 cursor-pointer flex items-center justify-center overflow-hidden rounded-sm">
                  <img v-if="productsPreview[index]" :src="productsPreview[index]" alt=""
                       class="h-full object-cover transition duration-400">
                  <span v-else class="text-gray-500 text-sm font-light">+</span>
                </div>
              </div>
            </div>
            <form @keydown.enter="createProduct" action="" class="flex flex-col justify-center gap-5 mt-2">
              <div class="flex gap-3 pb-5.5 border-b">
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    TITLE
                  </label>
                  <BaseInput v-model="createProductForm.title" type="text" placeholder="title, name etc."
                             :error="createProductFormErrors.titleError" variant="createProduct" required
                             :error-message="createProductFormErrors.titleError ? createProductFormMessages.titleMessage : ''"/>
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    COLLECTIONS
                  </label>
                  <select v-model="createProductForm.collection" :class="[`w-full border border-gray-300 rounded-sm
                          outline-none px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`,
                            createProductForm.collection ? 'text-black' : '',
                            createProductFormErrors.collectionsError ? 'border-red-500' : '']">
                    <option disabled hidden value="">
                      Void
                    </option>
                    <option v-for="collection in collections" class="text-black">{{ collection.collection }}</option>
                  </select>
                  <span v-if="createProductFormErrors.collectionsError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.collectionsMessage }}
                  </span>
                </div>
              </div>
              <div class="flex gap-3 pb-5.5 border-b">
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">CATEGORY</label>
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
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    MATERIAL
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
              </div>
              <div class="flex gap-3 w-full pb-5.5 border-b">
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    GENDER
                  </label>
                  <div class="flex flex-col gap-2.5">
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
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    QUANTITY
                  </label>
                  <BaseInput v-model="createProductForm.quantity" type="number" placeholder="quantity of product"
                             :error="createProductFormErrors.quantityError" variant="createProduct" required
                             :error-message="createProductFormErrors.quantityError ? createProductFormMessages.quantityMessage : ''"/>
                </div>
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    PRICE
                  </label>
                  <BaseInput v-model="createProductForm.price" type="number" placeholder="$00.00 "
                             :error="createProductFormErrors.priceError" variant="createProduct" required
                             :error-message="createProductFormErrors.priceError ? createProductFormMessages.priceMessage : ''"/>
                </div>
              </div>
              <div class="flex flex-col gap-2.5 pb-5.5 border-b">
                <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                  DESCRIPTION
                </label>
                <textarea v-model="createProductForm.description" type="text" placeholder="short desc. product"
                          :class="['h-25 border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white',
                            createProductFormErrors.descriptionError ? 'border-red-500' : '']" />
                <span v-if="createProductFormErrors.descriptionError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.descriptionMessage }}
                </span>
              </div>
              <div class="flex items-center gap-6 w-full">
                <div class="flex flex-col gap-2.5 w-full">
                  <div class="flex items-center justify-between">
                    <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                      SIZES
                    </label>
                    <span class="text-xs text-[#A3A3A3]">Sizes: {{ moreCreateItem.sizes.length }} / 6</span>
                  </div>
                  <div class="flex gap-6">
                    <img v-for="size in sizes" :key="size.name" :src=size.url alt="" @click="toggleSize(size.name)"
                         :class="[size.class, moreCreateItem.sizes.includes(size.name)
                              ? 'transition duration-400 scale-108 w-17.5'
                              : 'transition duration-400 hover:scale-108 w-17.5']">
                  </div>
                  <span v-if="createProductFormErrors.sizeError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.sizeMessage }}
                  </span>
                </div>
                <div class="flex flex-col gap-2.5 w-full">
                  <div class="flex items-center justify-between">
                    <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                      COLORS
                    </label>
                    <span class="text-xs text-[#A3A3A3]">Colors: {{ moreCreateItem.colors.length }} / 6</span>
                  </div>
                  <div class="flex gap-6">
                    <div v-for="color in moreCreateItem.colors" :key="color.hex" :title="color.hex" :style="{ background: color.hex }"
                         @click="toggleColor" class="w-17.5 h-17.5 transition-all duration-300 scale-108"></div>
                    <label v-if="(moreCreateItem.colors?.length || 0) < 6" class="h-17.5 w-17.5 border-3
                           border-dashed border-gray-300 bg-white flex items-center justify-center text-gray-400
                             cursor-pointer transition-all duration-400 hover:scale-108 hover:border-black
                               hover:text-black text-2xl font-light relative overflow-hidden" title="Выбрать любой цвет"> +
                      <input @change="toggleColor" type="color" class="absolute inset-0  h-full opacity-0 cursor-pointer" />
                    </label>
                  </div>
                  <span v-if="createProductFormErrors.colorError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.colorMessage }}
                  </span>
                </div>
              </div>
            </form>
            <div class="w-full mt-4 mb-6">
              <BaseButton @click="createProduct" name="CREATE PRODUCT" variant="useProduct" />
            </div>
            <input type="file" @change="onFilesSelected" class="hidden"
                   :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="loading" />
    <Transition name="notify">
      <Notification v-if="notify"/>
    </Transition>
  </div>
</template>

<style scoped>

</style>