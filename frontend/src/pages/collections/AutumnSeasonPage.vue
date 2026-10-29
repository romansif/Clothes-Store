<template>
  <main class="flex flex-col mt-10">
    <SeasonsHeader />
    <Transition name="view" mode="out-in">
      <Loading v-if="isPending" />
      <ErrorState v-else-if="isError" :box="{ variant: 'season-list', state: 'error' }" />
      <div v-else-if="seasonCatalog.length" :class="['flex gap-10', seasonCatalog.length ? '' : 'justify-center']">
        <SeasonList :user="user"
                    :array="seasonCatalog"
                    season="Autumn" />
      </div>
      <EmptyState v-else :box="{ variant: 'season-list', state: 'empty' }" />
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useSeasonProductData } from "@/widgets/season-list/lib/use-season-product-data";
import { SeasonsHeader } from "@/widgets/navigation";
import { SeasonList } from "@/widgets/season-list";
import { EmptyState, ErrorState, Loading } from "@/widgets/state";

const { user } = useUserData()
const { seasonCatalog, isPending, isError } = useSeasonProductData("Autumn");
</script>

