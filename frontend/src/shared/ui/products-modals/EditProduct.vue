<script setup lang="ts">
import {onMounted, watch} from "vue";
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { useProductsModals } from "@/shared/composables/modals/products.modals";
import { productsForms } from "@/shared/composables/forms/products.forms";
import { productsFormErrors } from "@/shared/composables/errors/errors-messages/products.errors";

import BaseInput from "@/shared/ui/base/input/BaseInput.vue";
import close from '@/app/assets/icons/delete-close/del_address_card.svg';
import Loading from "@/shared/ui/base/base-modals/Loading.vue";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";

const { loading, notify } = useBaseModals();
const { createProductFormErrors } = productsFormErrors();
const { product, categories, materials, genders, activeProductImg } = productsStore();
const { toggleEditProductModal, openSelectProductCard, fileInput } = useProductsModals();
const { createProductForm, moreCreateItem, createProductFormMessages } = productsForms();
const { createProduct, updateProductImages, updateProductColors, updateProductDesc } = useProducts();
const { productInfoPreview, pureCards, pureInfoColors, pureColorsName, pureSizesName, isAvailableSizes } = productsCover();

watch(() => [
      createProductForm.value.title, createProductForm.value.collections,
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
    activeProductImg.value = productInfoPreview.value(product.value) ?? '';
  }
})

</script>

<template>
  <div>
    <div class="font-[Montserrat] fixed inset-0 z-50">
      <div class="py-2 px-4 bg-[#F0F0F0] shadow-md overflow-hidden h-full overflow-y-auto no-scrollbar">
        <img @click="toggleEditProductModal()" :src="close" alt=""
             class="w-10 ml-auto transition duration-400 hover:scale-120">
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
              <div class="flex flex-col gap-2 w-full pb-5.5 border-b">
                <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                  COLLECTIONS:
                  <span class="text-black">
                    {{ product.collections }}
                  </span>
                </label>
                <BaseInput v-model="createProductForm.collections" type="text" placeholder="new, ikyk etc."
                    :error="createProductFormErrors.collectionsError" variant="createProduct" required
                    :error-message="createProductFormErrors.collectionsError ? createProductFormMessages.collectionsMessage : ''"/>
              </div>
              <div class="flex flex-col gap-2.5 w-full pb-5.5 border-b">
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
              <div class="flex flex-col gap-2.5 w-full pb-5.5 border-b">
                <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                  CATEGORY:
                  <span class="text-black">
                    {{ product.category }}
                  </span>
                </label>
                <div class="flex items-center gap-6">
                  <select v-model="createProductForm.category" :class="[`w-40 border border-gray-300 rounded-sm
                          outline-none px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`,
                            createProductForm.category ? 'text-black' : '',
                            createProductFormErrors.categoryError ? 'border-red-500' : '']">
                    <option disabled hidden value="">
                      Shirt
                    </option>
                    <option v-for="category in categories" class="text-black">{{ category.category }}</option>
                  </select>
                  <BaseInput class="w-full" v-model="createProductForm.category" type="text"
                       placeholder="shirt, shoes etc.." :error="createProductFormErrors.categoryError"
                       variant="createProduct" required :error-message="''"/>
                </div>
                <span v-if="createProductFormErrors.categoryError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.categoryMessage }}
                </span>
              </div>
              <div class="flex flex-col gap-2.5 w-full pb-5.5 border-b">
                <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                  MATERIAL:
                  <span class="text-black">
                    {{ product.material }}
                  </span>
                </label>
                <div class="flex gap-6">
                  <select v-model="createProductForm.material" :class="[`w-40 border border-gray-300 rounded-sm
                          outline-none px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]`,
                            createProductForm.material ? 'text-black' : '',
                            createProductFormErrors.materialError ? 'border-red-500' : '']">
                    <option disabled hidden value="">
                      Cotton
                    </option>
                    <option v-for="material in materials" class="text-black">{{ material.material }}</option>
                  </select>
                  <BaseInput class="w-full" v-model="createProductForm.material" type="text" placeholder="cotton, wool etc."
                       :error="createProductFormErrors.materialError" variant="createProduct"
                       :error-message="''" required/>
                </div>
                <span v-if="createProductFormErrors.materialError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.materialMessage }}
                </span>
              </div>
              <div class="flex flex-col gap-2.5 w-full pb-5.5 border-b">
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
              <div class="flex gap-6 w-full pb-5.5 border-b">
                <div class="flex flex-col gap-2.5 w-full">
                  <label for="" class="font-semibold uppercase tracking-wider text-sm text-[#A3A3A3]">
                    QUANTITY:
                    <span class="text-black">
                      {{ product.quantity }}
                    </span>
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
                    <img v-for="size in (isAvailableSizes as any)" :key="size.name" :src=size.url alt=""
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

<style scoped>

</style>