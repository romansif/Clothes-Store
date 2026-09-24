<template>
  <Transition name="view">
    <ul class="font-raleway flex flex-col gap-20">
      <MyProductItem v-for="product in myProducts"
                     :user="userData"
                     :product="product"
                     :myProducts="myProducts" />
    </ul>
  </Transition>
  <Transition name="modal">
    <StackInfoModal v-if="stackInfo" />
  </Transition>
  <Transition name="modal">
    <DeleteModal v-if="deleteModal" />
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetMyProduct } from "@/features/use-my-product/api/get-my-product.ts";
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { stackInfo } from "@/features/use-my-product/lib/toggle-stack-info.ts";

import MyProductItem from "@/features/use-my-product/ui/MyProductItem.vue";
import StackInfoModal from "@/features/use-my-product/ui/StackInfoModal.vue";
import DeleteModal from "@/features/use-general-delete/ui/DeleteModal.vue";

const { userData } = userStore();
const { deleteModal } = baseDeleteModal();
const { getMyProducts, myProducts } = useGetMyProduct();

onMounted(async () => {
  await getMyProducts();
})
</script>

<style scoped>

</style>