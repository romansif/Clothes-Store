<template>
    <main class="mt-10 flex flex-col">
        <SeasonsHeader />
        <Transition name="view" mode="out-in">
            <Loader v-if="isLoading" variant="season-list" />
            <ErrorState v-else-if="isError" variant="season-list" :loading="isFetching" @reload="refetch()" />
            <div
                v-else-if="seasonCatalog.length"
                :class="['flex gap-10', seasonCatalog.length ? '' : 'justify-center']"
            >
                <SeasonList :user="user" :array="seasonCatalog" season="Autumn" />
            </div>
            <EmptyState v-else variant="season-list" :loading="isFetching" @reload="refetch()" />
        </Transition>
    </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useSeasonProductData } from "@/widgets/season-list/lib/use-season-product-data";
import { SeasonsHeader } from "@/widgets/navigation";
import { SeasonList } from "@/widgets/season-list";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";

const { user } = useUserData();
const { seasonCatalog, isLoading, isFetching, isError, refetch } = useSeasonProductData("Autumn");
</script>
