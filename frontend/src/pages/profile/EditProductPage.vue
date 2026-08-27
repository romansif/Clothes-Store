<template>
  <div>
    <div class="font-dm-sans fixed inset-0 z-50">
      <div class="py-2 px-4 bg-[#F0F0F0] shadow-md overflow-hidden h-full overflow-y-auto no-scrollbar">
        <div class="flex">
          <router-link :to="{ name: 'my/products' }" class="text-start ml-auto h-fit w-fit px-10 py-2 bg-red-600 text-white
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
                <div v-for="(img, index) in pureCards(product)" :key="img" @click="openSelectProductCard(index)"
                     class="bg-white h-68.5 w-50 border border-gray-200 transition duration-400
                       hover:scale-105 cursor-pointer flex items-center justify-center overflow-hidden rounded-sm">
                  <img v-if="img" :src="img" alt="" class="h-full object-cover transition duration-400">
                  <span v-else class="text-gray-500 text-sm font-light">+</span>
                </div>
              </div>
            </div>
            <form @keydown.enter="createProduct" action="" class="flex flex-col justify-center gap-5 mt-2">
              <div class="flex items-center gap-3 pb-5.5 border-b">
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    TITLE:
                    <span class="text-black">
                      {{ product.title }}
                    </span>
                  </label>
                  <BaseInput v-model="createProductForm.title" type="text" placeholder="title, name etc."
                             :error="createProductFormErrors.titleError" variant="createProduct" required
                             :error-message="createProductFormErrors.titleError ? createProductFormMessages.titleMessage : ''"/>
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    COLLECTION:
                    <span class="text-black">
                      {{ product.collection.name }}
                    </span>
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
              </div>
              <div class="flex items-center gap-3 pb-5.5 border-b">
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    CATEGORY:
                    <span class="text-black">
                      {{ product.category }}
                    </span>
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
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    MATERIAL:
                    <span class="text-black">
                      {{ product.material }}
                    </span>
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
                    GENDER:
                    <span class="text-black">
                      {{ product.gender }}
                    </span>
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
                    QUANTITY: <span class="text-black">{{ product.quantity }}</span>
                  </label>
                  <BaseInput v-model="createProductForm.quantity" type="number" placeholder="quantity of product"
                             :error="createProductFormErrors.quantityError" variant="createProduct" required
                             :error-message="createProductFormErrors.quantityError ? createProductFormMessages.quantityMessage : ''"/>
                </div>
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    PRICE: <span class="text-black">${{ product.price }}</span>
                  </label>
                  <BaseInput v-model="createProductForm.price" type="number" placeholder="$00.00 "
                             :error="createProductFormErrors.priceError" variant="createProduct" required
                             :error-message="createProductFormErrors.priceError ? createProductFormMessages.priceMessage : ''"/>
                </div>
              </div>
              <div class="flex flex-col gap-2.5 pb-5.5 border-b">
                <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                  DESCRIPTION:
                  <span class="text-black">
                    {{ product.description }}
                  </span>
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
                      SIZES:
                      <span class="text-black">
                        {{ pureSizesName(product) }}
                      </span>
                    </label>
                  </div>
                  <div class="flex gap-6">
                    <img v-for="size in isAvailableSizes" :key="size.name" :src=size.url alt=""
                         :class="[size.class, 'w-17.5']">
                  </div>
                  <span v-if="createProductFormErrors.sizeError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.sizeMessage }}
                  </span>
                </div>
                <div class="flex flex-col gap-2.5 w-full">
                  <div class="flex items-center justify-between">
                    <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                      COLORS:
                      <span class="text-black">
                        {{ pureColorsName(product) }}
                      </span>
                    </label>
                  </div>
                  <div class="flex gap-6">
                    <label v-for="(color, index) in pureInfoColors(product)" :key="color.hex" :title="color.hex"
                           :style="{ background: color.hex }"  class="w-17.5 h-17.5">
                      <input @change="(e) => updateProductColors(product, index, e)" type="color"
                             class="h-full opacity-0 cursor-pointer" />
                    </label>
                  </div>
                  <span v-if="createProductFormErrors.colorError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.colorMessage }}
                  </span>
                </div>
              </div>
            </form>
            <div class="w-full mt-4 mb-6">
              <BaseButton @click="updateProductDesc(product.id)" name="EDIT PRODUCT" variant="useProduct" />
            </div>
            <input type="file" @change="(e) => updateProductImages(product, e)" class="hidden"
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

<script setup lang="ts">
const { loading, notify } = useBaseModals();
const { createProductFormErrors } = productsFormErrors();
const { product, collections, categories, materials, genders, activeProductImg } = productStore();
const { openSelectProductCard, fileInput } = useProductsModals();
const { createProductForm, moreCreateItem, createProductFormMessages } = productForms();
const { createProduct, updateProductImages, updateProductColors, updateProductDesc } = productApi();
const { productInfoPreview, pureCards, pureInfoColors, pureColorsName, pureSizesName, isAvailableSizes } = productsCover();

import { onMounted, watch } from "vue";
import { productsCover } from "@/features/use-product/model/use-product.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";
import { productForms } from "@/features/use-product/model/product.forms.ts";
import { productsFormErrors } from "@/features/use-product/lib/product.error.ts";

import BaseInput from "@/shared/ui/BaseInput.vue";
import Loading from "@/widgets/Loading.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import Notification from "@/shared/ui/Notification.vue";

watch(() => [
      createProductForm.value.title, createProductForm.value.collection,
      createProductForm.value.category, createProductForm.value.material,
      createProductForm.value.price, createProductForm.value.description,
      moreCreateItem.colors, moreCreateItem.sizes,
      createProductForm.value.gender, createProductForm.value.quantity
    ],

    ([title, collections, category, material, price, description, color, size, gender, quantity]) => {
      if(title){
        createProductFormErrors.value.titleError = false;
      }
      if(collections){
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
    });

onMounted(async () => {
  if(product.value && Array.isArray(product.value.images) && product.value.images[0]) {
    activeProductImg.value = productInfoPreview(product.value) ?? '';
  }
})

</script>

<style scoped>

</style>