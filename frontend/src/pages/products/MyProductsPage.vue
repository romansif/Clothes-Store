<template>
  <main class="flex flex-col">
    <MyProductList :user="user" />
  </main>
  <Transition name="modal">
    <DeleteModal v-if="deleteModal" />
  </Transition>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile";
import { baseDeleteModal } from "@/features/general-delete";
import { MyProductList } from "@/widgets/my-product-list";
import { DeleteModal } from "@/features/general-delete";

const { user } = useUserData();
const { deleteModal } = baseDeleteModal();
</script>
