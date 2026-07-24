<script setup lang="ts">
import { onMounted } from "vue";
import { useGetProducts } from "../composables/getProducts.ts";

import MyProductsList from "./MyProductsList.vue";
import NavBar from "../../navigation/NavBar.vue";

const { getMyProducts } = useGetProducts();

onMounted(async () => {
  await getMyProducts();
})
</script>

<template>
  <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
    <div class="flex justify-center items-center mt-10">
      <MyProductsList />
    </div>
  </div>
</template>

<style scoped>

</style>