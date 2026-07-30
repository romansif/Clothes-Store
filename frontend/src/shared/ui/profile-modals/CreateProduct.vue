<script setup lang="ts">
import { watch } from "vue";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useProductsModals } from "@/shared/composables/modals/products/productsModals.ts";
import { useAddProducts } from "@/feature/products/composables/useAddProducts.ts";
import { productsForms } from "@/shared/composables/forms-composables/forms/products.forms.ts";
import { productsFormErrors } from "@/shared/composables/forms-composables/forms-errors/products.errors.ts";

const { createProductFormErrors } = productsFormErrors();
const { createProduct, onFilesSelected } = useAddProducts();
const { createProductForm, moreCreateItem, createProductFormMessages } = productsForms();
const { colors, sizes, categories, materials, genders, productsPreview } = productsStore();
const { toggleCreateProductModal, openSelectProductCard, fileInput } = useProductsModals();

const toggleColor = (colorName: string) => {
  const index = moreCreateItem.color.indexOf(colorName);
  if (!Array.isArray(moreCreateItem.color)) {
    moreCreateItem.color = [];
  }
  if(index === -1){
    if(moreCreateItem.color.length >= 6){
      return;
    }
    moreCreateItem.color.push(colorName);
  }else{
    moreCreateItem.color.splice(index, 1);
  }
}

const toggleSize = (sizeName: string) => {
  const index = moreCreateItem.size.indexOf(sizeName);
  if (!Array.isArray(moreCreateItem.size)) {
    moreCreateItem.size = [];
  }
  if(index === -1){
      moreCreateItem.size.push(sizeName);
  }else{
    moreCreateItem.size.splice(index, 1);
  }
}

watch(() => [
      createProductForm.value.title, createProductForm.value.category,
      createProductForm.value.material, createProductForm.value.price,
      createProductForm.value.description,
      moreCreateItem.color, moreCreateItem.size],
    ([title, category, material, price, description, color, size]) => {
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
})
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 flex items-center justify-center">
    <div class="py-4 px-5 bg-[#F0F0F0] shadow-md overflow-hidden w-full h-full">
      <h1 class="font-semibold text-[#A3A3A3] text-2xl">
        CREATING A COVER FOR A NEW PRODUCT
      </h1>
      <div class="flex gap-30 mt-4">
        <form @keydown.enter="createProduct" action="" class="w-[1000px] mt-2">
          <div class="flex flex-col gap-4">
            <div class="flex gap-5">
              <div class="flex flex-col gap-2 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">TITLE</label>
                <input v-model="createProductForm.title" type="text" class="border border-gray-200 rounded-sm outline-none
                  px-6 py-5 text-sm bg-white" placeholder="title, name etc.">
                <span v-if="createProductFormErrors.titleError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.titleMessage }}
                </span>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">CATEGORY</label>
                <select v-model="createProductForm.category" type="text" class="border border-gray-200 rounded-sm outline-none
                  px-4 py-5 text-sm bg-white">
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
                <select v-model="createProductForm.material" type="text" class="border border-gray-200 rounded-sm outline-none
                  px-4 py-5 text-sm bg-white">
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
                <input v-model="createProductForm.price" type="number" class="border border-gray-200 rounded-sm outline-none
                  px-6 py-5 text-sm bg-white" placeholder="$00.00">
                <span v-if="createProductFormErrors.priceError" class="text-red-600 text-xs">
                  {{ createProductFormMessages.priceMessage }}
                </span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="" class="font-semibold uppercase tracking-wider text-xs text-[#A3A3A3]">DESCRIPTION</label>
              <textarea v-model="createProductForm.description" type="text" class="h-[100px] border border-gray-200 rounded-sm
                outline-none px-6 py-5 text-sm bg-white" placeholder="short desc. product" />
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
                    <select v-model="createProductForm.gender" type="number" class="border border-gray-200 rounded-sm outline-none
                          px-4 py-5 text-sm bg-white">
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
                    <input v-model="createProductForm.quantity" type="number" class="w-full border border-gray-200 rounded-sm outline-none
                          px-6 py-5 text-sm bg-white" placeholder="quantity of product">
                    <span v-if="createProductFormErrors.quantityError" class="text-red-600 text-xs">
                        {{ createProductFormMessages.quantityMessage }}
                      </span>
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
                          ? 'scale-120 border-black w-[60px] h-[60px]'
                          : 'hover:scale-110 w-[60px]']" @click="toggleSize(size.name)">
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
                      ? 'scale-120 border-3 border-black w-[62px] h-[62px]'
                      : 'hover:scale-110 w-[62px] h-[62px]']" @click="toggleColor(color.name)"></div>
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
          <div @click="openSelectProductCard(0)" class="bg-white h-[394px] w-[330px]">
            <img v-if="productsPreview[0]" @click="openSelectProductCard(0)"
                 :src="productsPreview[0] ? productsPreview[0] : ''" alt="" class="w-[330px] h-full">
          </div>
          <div class="flex gap-7 mt-4">
            <div @click="openSelectProductCard(index)" v-for="index in 4" :key="index" class="bg-white h-[75px] w-[62px]">
              <img @click="openSelectProductCard(index)" :src="productsPreview[index] ? productsPreview[index] : ''" alt="" >
            </div>
          </div>
          <button @click="openSelectProductCard(0)" class="mt-4 bg-black text-white rounded px-10 py-3.5
            font-semibold text-start">
            Upload Product Photo
          </button>
        </div>
      </div>
      <div class="flex">
        <div class="flex gap-10 mt-3">
          <button @click="toggleCreateProductModal" class="bg-black text-white rounded px-20 py-5 font-semibold text-start">
            Close
          </button>
          <button @click="createProduct" class="bg-black text-white rounded px-20 py-5 font-semibold text-start">
            Create
          </button>
        </div>
        <input type="file" ref="fileInput" multiple accept="image/*" @change="onFilesSelected" class="hidden">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>