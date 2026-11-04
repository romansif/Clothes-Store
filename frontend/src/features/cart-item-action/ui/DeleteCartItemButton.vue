<template>
  <img
    @click="toggleDeleteChoice(t('confirm.deleteCartItem'), 'DELETE_CART_ITEM', product.id)"
    :src="del"
    alt=""
    class="cursor-pointer transition duration-400 hover:scale-120"
  />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import type { Product } from "@/shared";

import del from "@/assets/icons/delete-close/delete.svg";

const props = defineProps<{
  product: Product;
}>();

const { t } = useI18n()
const { toggleDeleteChoice } = baseDeleteModal();
</script>
