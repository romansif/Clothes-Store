<template>
  <main class="flex flex-col gap-8 px-12 xl:mt-20">
    <FavoriteCartHeader />
    <FavoriteList :user="user" />
  </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile";
import { FavoriteCartHeader } from "@/widgets/favorite-cart-header";
import { FavoriteList } from "@/widgets/favorite-list";

const { user } = useUserData();
</script>
