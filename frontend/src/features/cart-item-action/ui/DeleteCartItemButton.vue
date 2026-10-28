<template>
  <img @click="toggleDeleteChoice(
      'Are you sure you want to delete this cart product?', 'DELETE_CART_ITEM', product.id)"
       :src="del" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
</template>


<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import type { Product } from "@/shared";

import del from "@/assets/icons/delete-close/delete.svg";

const props = defineProps<{
  product: Product;
}>()

const { toggleDeleteChoice } = baseDeleteModal();
</script>
