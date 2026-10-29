<template>
    <main class="mt-10 flex justify-center xl:justify-between">
        <FilterProducts />
        <div class="flex flex-col">
            <MainHeader />
            <ProductList :user="user" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { ProductList } from "@/widgets/product-list";
import { MainHeader } from "@/features/products";
import { FilterProducts } from "@/widgets/product-sidebar";

const { user } = useUserData();
</script>
