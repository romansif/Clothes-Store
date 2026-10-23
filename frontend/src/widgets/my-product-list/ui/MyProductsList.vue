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
import { onMounted } from "vue";
import { userStore } from "@/shared/model/user.store";
import { getMyProducts, myProducts } from "@/features/my-products/api/get-my-product";
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal";
import { MyProductItem } from "@/entities/my-product-item";
import { DeleteModal } from "@/features/use-general-delete";
import { DeleteMyProductButton } from "@/features/my-products";

const { userData } = userStore();
const { deleteModal } = baseDeleteModal();

onMounted(async () => {
  await getMyProducts();
})
</script>
