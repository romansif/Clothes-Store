<template>
  <Transition name="view">
    <ul class="font-raleway flex flex-col gap-20">
      <MyProductItem v-for="product in myProducts"
                     :key="product.id"
                     :user="user"
                     :product="product"
                     :myProducts="myProducts"
                     :favorite="favorite">
        <DeleteMyProductButton :product="product" />
      </MyProductItem>
    </ul>
  </Transition>
  <Transition name="modal">
    <DeleteModal v-if="deleteModal" />
  </Transition>
</template>

<script setup lang="ts">
import { useMyProductsData } from "@/widgets/my-product-list/lib/use-my-products-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { MyProductItem } from "@/entities/my-product-item";
import { DeleteModal } from "@/features/general-delete";
import { DeleteMyProductButton } from "@/features/delete-my-product";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData()
const { myProducts } = useMyProductsData()
const { deleteModal } = baseDeleteModal();

const props = defineProps<{
  user: User | undefined
}>()
</script>
