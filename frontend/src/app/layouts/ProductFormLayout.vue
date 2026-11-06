<template>
  <div class="font-dm-sans fixed inset-0">
    <div class="no-scrollbar h-full overflow-hidden overflow-y-auto bg-[#F0F0F0] p-4 shadow-md">
      <div class="flex">
        <router-link
          @click="clearProductForm"
          :to="{ path: `/my/products/${user?.id}` }"
          class="fixed right-4 h-fit w-fit transform cursor-pointer rounded-md bg-[#3B3C36] px-10 py-2 text-start text-xs font-medium text-white transition duration-300 hover:scale-108 hover:bg-[#1d1e1b]"
        >
          {{ t("common.exit") }}
        </router-link>
      </div>
      <div class="flex justify-center">
        <main class="flex flex-col gap-5">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { clearProductForm } from "@/features/product-form/lib/clear-product-form.ts";

const { t } = useI18n();
const { user } = useUserData()
</script>
