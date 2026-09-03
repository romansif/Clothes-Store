<template>
  <div>
    <div class="font-dm-sans fixed inset-0 z-50">
      <div class="py-2 px-4 bg-[#F0F0F0] shadow-md overflow-hidden h-full overflow-y-auto no-scrollbar">
        <div class="flex">
          <router-link :to="{ name: 'profile' }" class="text-start ml-auto h-fit w-fit px-10 py-2 bg-red-600 text-white
              font-medium text-xs rounded-md cursor-pointer transition duration-300 transform hover:scale-108 hover:bg-red-500">
            Exit
          </router-link>
        </div>
        <div class="flex justify-center">
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-6 bg-white w-full p-6.5 rounded">
              <div class="flex flex-col gap-1">
                <h1 class="text-2xl font-semibold">Image slots</h1>
                <h2 class="text-sm text-[#A3A3A3] font-medium">
                  5 slots: 1 main photo + 4 additional ones. Click on a slot to select a file
                </h2>
              </div>
              <div class="flex gap-6">
                <div @click="openSelectProductCard(1)" class="bg-gray-50 h-90 w-90 border border-gray-300 transition duration-400 hover:scale-105
                          hover:bg-gray-100 cursor-pointer overflow-hidden rounded-lg">
                  <img v-if="productsPreview[1]" :src="productsPreview[1]" alt=""
                       class="h-90 w-90 transition duration-400">
                  <div v-else class="p-4 text-mauve-100">
                    <span class="bg-black font-bold px-2 py-1.5 rounded-full">
                      Main Photo
                    </span>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div v-for="index in [2, 3, 4, 5]" :key="index" @click="openSelectProductCard(index)"
                       class="bg-gray-50 h-43.5 w-43.5 border border-gray-300 transition duration-400 hover:scale-105
                       hover:bg-gray-100 cursor-pointer overflow-hidden rounded-lg">
                    <img v-if="productsPreview[index]" :src="productsPreview[index]" alt=""
                         class="h-43.5 w-43.5 transition duration-400">
                    <div v-else class="p-4 text-mauve-500">
                      <span class="bg-gray-100 font-bold px-2 py-1.5 rounded-full border border-gray-400">
                        Photo {{ index }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <h2 class="text-sm text-[#A3A3A3] font-medium">The first photo is used in the catalog</h2>
                <h2 class="text-sm text-[#A3A3A3] font-medium">Formats: JPG · PNG · WEBP Max. size: 5 MB Aspect ratio: 4:5</h2>
              </div>
            </div>
            <form @keydown.enter="createProduct" action="" class="bg-white p-6.5 mt-6 flex flex-col justify-center gap-8 rounded">
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
                         class="uppercase border border-gray-300 rounded-sm outline-none px-6 py-5 text-sm bg-white transition duration-400 font-dm-sans" />
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
            <div class="bg-white p-6.5 mt-6 flex flex-col justify-center gap-8 rounded">
              <div class="flex flex-col gap-3 w-full">
                <div class="flex items-center justify-between">
                  <label for="" class="font-semibold tracking-wider text-xs">
                    <div class="flex gap-1">
                      <span>QUANTITY · КОЛИЧЕСТВО</span>
                      <span class="text-red-500">*</span>
                    </div>
                  </label>
                  <div class="flex gap-2 justify-end items-center font-semibold">
                    <button type="button" @click="countMode = 'SAME'"
                            :class="['transition duration-700 rounded-full px-3 py-2 text-sm tracking-widest',
                            countMode === 'SAME' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black']">
                      The same
                    </button>
                    <button type="button" @click="countMode = 'DIFFER'"
                            :class="['transition duration-700 rounded-full px-3 py-2 text-sm tracking-widest',
                            countMode === 'DIFFER' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black']">
                      Different
                    </button>
                  </div>
                </div>
<!--                <div v-if="countMode === 'SAME'" class="flex">-->
<!--                  <BaseInput v-model="createProductForm.quantity" @input="toggleAllVariants(createProductForm.quantity)"-->
<!--                             type="number" placeholder="product ptc." class="w-75"-->
<!--                             :error="createProductFormErrors.quantityError" variant="createProduct" required-->
<!--                             :error-message="createProductFormErrors.quantityError ? createProductFormMessages.quantityMessage : ''"/>-->
<!--                  <span class="ml-auto mt-auto text-sm text-[#A3A3A3] font-medium">-->
<!--                    An equal quantity will be selected for all sizes and colors-->
<!--                  </span>-->
<!--                </div>-->
                <div class="pt-3">
                  <table class="w-full text-left border-collapse">
                    <thead class="border-b-2">
                    <tr class="">
                      <th class="font-medium pb-4">Colors</th>
                      <th v-for="size in moreCreateItem.sizes" :key="size"
                          class="text-center font-medium min-w-16 pb-4">
                        {{ size }}
                      </th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-200">
                    <tr v-for="color in moreCreateItem.colors" :key="color.hex">
                      <td :title="color.hex">
                        <div class="flex items-center gap-2">
                          <span :style="{ background: color.hex }"
                                class="w-10 h-10 shrink-0 rounded-full border-2 border-gray-300 shadow-sm"></span>
                          <span class="text-xs font-bold text-black uppercase whitespace-nowrap">
                            {{ color.colorName }}
                          </span>
                        </div>
                      </td>
                      <td v-for="size in moreCreateItem.sizes" :key="size" class="py-6 text-center">
                        <input v-model="toggleQuantity(color.hex, color.colorName, size).count"
                               type="number" min="0" step="1" placeholder="0" :aria-label="`${color.colorName}, размер ${size}`"
                               class="w-20 h-10 outline-none border-2 border-gray-300 rounded-sm text-center" />
                      </td>
                    </tr>
                    <tr v-if="!moreCreateItem.colors?.length && !moreCreateItem.sizes?.length">
                      <td :colspan="(moreCreateItem.sizes?.length || 0) + 1" class="py-8 text-center text-[#A3A3A3]">
                        Select sizes and colors to populate the stock levels.
                      </td>
                    </tr>
                    <tr v-else-if="!moreCreateItem.colors?.length">
                      <td :colspan="(moreCreateItem.sizes?.length || 0) + 1" class="py-8 text-center text-[#A3A3A3]">
                        Select colors to populate the stock levels.
                      </td>
                    </tr>
                    <tr v-else-if="!moreCreateItem.sizes?.length">
                      <td :colspan="(moreCreateItem.sizes?.length || 0) + 1" class="py-8 text-center text-[#A3A3A3]">
                        Select sizes to populate the stock levels.
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="flex flex-col gap-3 w-full">
                <div class="flex items-center justify-between">
                  <label for="" class="font-semibold tracking-wider text-xs">
                    <div class="flex gap-1">
                      <span>SIZES · РАЗМЕРЫ</span>
                      <span class="text-red-500">*</span>
                    </div>
                  </label>
                  <span class="ml-auto text-[#A3A3A3] text-xs font-medium">
                    Sizes: {{ moreCreateItem.sizes.length }} / 6
                  </span>
                </div>
                <div class="flex gap-6">
                  <img v-for="size in sizes" :key="size.name" :src=size.url alt="" @click="toggleSize(size.name)"
                       :class="[size.class, moreCreateItem.sizes.includes(size.name)
                              ? 'transition duration-400 scale-110 w-15 rounded-full'
                              : 'transition duration-400 hover:scale-110 w-15 rounded-full']">
                </div>
                <span v-if="createProductFormErrors.sizeError" class="text-red-600 text-xs">
                    {{ createProductFormMessages.sizeMessage }}
                  </span>
              </div>
              <div class="flex flex-col gap-3 w-full">
                <div class="flex items-center justify-between">
                  <label for="" class="font-semibold tracking-wider text-xs">
                    <div class="flex gap-1">
                      <span>COLORS · ЦВЕТА</span>
                      <span class="text-red-500">*</span>
                    </div>
                  </label>
                  <span class="ml-auto text-[#A3A3A3] text-xs font-medium">
                    Colors: {{ moreCreateItem.colors.length }} / 6
                  </span>
                </div>
                <div class="flex gap-6">
                  <div v-for="color in moreCreateItem.colors" :key="color.hex" :title="color.hex"
                       :style="{ background: color.hex }" @click="toggleColor(color.hex, $event)"
                       class="w-15 h-15 border-2 border-[#A3A3A3] rounded-full transition-all duration-300 scale-110"></div>
                  <label v-if="moreCreateItem.colors?.length < 6" title="Выбрать любой цвет"
                         class="w-16 h-16 border-2 rounded-full border-dashed border-gray-300 bg-white
                           flex items-center justify-center text-gray-400 cursor-pointer transition-all duration-400
                           hover:scale-108 hover:border-black hover:text-black text-2xl font-light relative overflow-hidden">+
                    <input @change="toggleColor(($event.target as HTMLInputElement).value, $event)" type="color"
                           class="absolute inset-0 h-full opacity-0 cursor-pointer" />
                  </label>
                </div>
                <span v-if="createProductFormErrors.colorError" class="text-red-600 text-xs">
                      {{ createProductFormMessages.colorMessage }}
                  </span>
              </div>
            </div>
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

<script setup lang="ts">
const { loading, notify } = useBaseModals();
const { createProductFormErrors } = productsFormErrors();
const { createProduct, onFilesSelected } = useAddProduct();
const { openSelectProductCard, fileInput } = useProductsModals();
const { toggleQuantity, toggleSize, toggleColor } = productsCover();
const { createProductForm, moreCreateItem, createProductFormMessages } = productForms();
const { collections, categories, materials, genders, sizes, productsPreview, countMode, skuMask } = productStore();

import { watch } from "vue";
import { IMaskComponent as IMask } from "vue-imask";
import { productsCover } from "@/features/use-product/model/use-product.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { useAddProduct } from "@/features/use-product/api/add-product.ts";
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
      createProductForm.value.sku, moreCreateItem.colors, moreCreateItem.sizes,
      createProductForm.value.gender, moreCreateItem.quantity
    ],

    ([title, collection, category, material, price, description, sku, color, size, gender, quantity]) => {
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
      if(sku){
        createProductFormErrors.value.skuError = false;
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

<style scoped>

</style>