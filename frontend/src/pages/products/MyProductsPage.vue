<template>
  <main class="flex mt-10">
    <MyProductList :user="user" />
  </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { MyProductList } from "@/widgets/my-product-list";

const { user } = useUserData()
</script>
