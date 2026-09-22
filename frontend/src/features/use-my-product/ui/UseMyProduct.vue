<template>
  <div class="flex items-center ml-auto gap-10">
    <router-link :to="{ name: 'edit/product', params: { id: getProductId(product) } }">
      <img :src="pencil" alt="" class="w-7 transition duration-400 hover:scale-120 cursor-pointer">
    </router-link>
    <img @click="toggleDeleteChoice(
            'Are you sure you want to delete this product?', 'DELETE_PROUCT_ITEM', product.id
                 )" :src="del" alt="" class="w-7.5 transition duration-400 hover:scale-120 cursor-pointer">
  </div>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/widgets/lib/base-delete-modal.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import type {Product} from "@/shared/model/product.types.ts";

defineProps<{
  product: Product
}>();

import pencil from "@/assets/icons/products/pencil.svg";
import del from "@/assets/icons/delete-close/delete.svg";

const { getProductId } = useGetProduct();
const { toggleDeleteChoice } = baseDeleteModal();
</script>

<style scoped>

</style>