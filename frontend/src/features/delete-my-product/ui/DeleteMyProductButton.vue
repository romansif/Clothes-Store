<template>
    <img
        @click="
            toggleDeleteChoice(
                'Are you sure you want to delete this product?',
                'DELETE_PROUCT_ITEM',
                product.id,
            )
        "
        :src="del"
        alt=""
        class="w-7.5 cursor-pointer transition duration-400 hover:scale-120"
    />
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import type { Product } from "@/shared";

import del from "@/assets/icons/delete-close/delete.svg";

defineProps<{
    product: Product;
}>();

const { toggleDeleteChoice } = baseDeleteModal();
</script>
