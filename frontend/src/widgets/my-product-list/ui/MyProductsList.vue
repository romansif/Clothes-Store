<template>
  <Transition name="view">
    <ul class="font-raleway flex flex-col gap-20">
      <MyProductItem v-for="product in myProducts"
                     :key="product.id"
                     :user="userData"
                     :product="product"
                     :myProducts="myProducts">
        <DeleteMyProductButton :product="product" />
      </MyProductItem>
    </ul>
  </Transition>
  <Transition name="modal">
    <DeleteModal v-if="deleteModal" />
  </Transition>
</template>

<script setup lang="ts">
import { userData } from "@/shared/model/user.store";
import { useMyProductsData } from "@/widgets/my-product-list/lib/use-my-products-data";
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { MyProductItem } from "@/entities/my-product-item";
import { DeleteModal } from "@/features/general-delete";
import { DeleteMyProductButton } from "@/features/delete-my-product";

const { myProducts } = useMyProductsData()
const { deleteModal } = baseDeleteModal();
</script>
