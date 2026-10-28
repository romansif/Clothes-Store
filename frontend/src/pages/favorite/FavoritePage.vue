<template>
  <main class="flex flex-col gap-8 t-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <FavoriteList :user="user" />
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { FavoriteCartHeader } from "@/widgets/favorite-cart-header";
import { FavoriteList } from "@/widgets/favorite-list";

const { user } = useUserData()
</script>
