<script setup lang="ts">
import { onMounted } from "vue";
import { useGetProducts } from "../composables/getProducts.ts";
import { useProfileModals } from "@/shared/composables/modals/profile/profileModals.ts";

import ChoiceModal from "@/shared/ui/ChoiceModal.vue";
import NavBar from "../../navigation/NavBar.vue";
import MyProductsList from "./MyProductsList.vue";

const { getMyProducts } = useGetProducts();
const { deleteChoice } = useProfileModals();

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
  <Transition>
    <ChoiceModal v-if="deleteChoice"/>
  </Transition>
</template>

<style scoped>
/* мы объясним, что делают эти классы дальше! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>