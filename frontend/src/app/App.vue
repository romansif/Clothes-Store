<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useGetFavorite } from "@/shared/api/get-favorite.ts";
import { useGetUsers } from "@/widgets/profile/api/get-users";

const { getUser } = useGetUsers()
const { getFavoriteProducts } = useGetFavorite();

onMounted(async() => {
  await getFavoriteProducts();
  await getUser();
})
</script>

<style>
::selection {
  background-color: #3B3C36;
  color: #ffffff;
}
</style>