<template>
  <main class="flex flex-col mt-10">
    <SeasonsHeader />
    <div :class="['flex gap-10', seasonCatalog.length ? '' : 'justify-center']">
      <SeasonList :user="user"
                  :array="seasonCatalog"
                  season="Spring" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useSeasonProductData } from "@/widgets/season-list/lib/use-season-product-data";
import { SeasonsHeader } from "@/widgets/navigation";
import { SeasonList } from "@/widgets/season-list";

const { user } = useUserData()
const { seasonCatalog } = useSeasonProductData("Spring");
</script>

