<template>
  <nav class="font-raleway">
    <div class="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
      <div class="flex items-center gap-5 justify-self-start lg:gap-10">
        <router-link v-if="user?.role === 'Buyer'" :to="{ name: 'favorite' }">
          <div class="hidden md:flex">
            <img :src="liked" alt="" class="h-12 w-12 rounded-full transition duration-400 hover:scale-110" />
          </div>
        </router-link>
        <router-link v-if="user?.role === 'Buyer'" :to="{ name: 'cart' }">
          <div class="gap-1 transition duration-400 hover:scale-110 md:flex lg:flex xl:flex xl:items-center">
            <span class="hidden items-center rounded-3xl bg-black px-7 py-3 text-white md:flex">
              {{ t("nav.cart") }}
            </span>
            <img :src="cart" alt="" class="h-11.5 w-11.5 rounded-full" />
          </div>
        </router-link>
      </div>
      <div class="hidden justify-self-center font-light md:flex md:gap-5 lg:gap-10">
        <span
          :class="[
            'cursor-pointer text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black',
            route.name === 'home' ? 'scale-120 text-black' : '',
          ]"
        >
          {{ t("nav.home") }}
        </span>
        <router-link :to="{ name: 'shop/seasons-catalog' }" class="text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black">
          {{ t("nav.seasonal") }}
        </router-link>
        <router-link :to="{ name: 'shop' }" class="text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black">
          {{ t("nav.shop") }}
        </router-link>
        <router-link :to="{ name: 'shop/new-collections' }" class="text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black">
          {{ t("nav.new") }}
        </router-link>
      </div>
      <div class="flex items-center gap-3 justify-self-end md:gap-5 lg:gap-10">
        <router-link :to="{ name: 'profile' }" class="group flex items-center gap-2.5 transition duration-400 hover:scale-110">
          <img :src="user ? avatar() : profile" alt="" class="h-11 w-11 rounded-full bg-white object-cover" />
          <span v-if="user" class="font-medium">{{ user.name }}</span>
        </router-link>
        <LanguageSwitcher />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { LanguageSwitcher } from "@/widgets/navigation";
import type { User } from "@/entities/profile";

import cart from "@/assets/icons/nav/cart.png";
import liked from "@/assets/icons/nav/favorite.jpeg";
import profile from "@/assets/icons/nav/default-avatar.png";

const route = useRoute();

const { t } = useI18n();
const { avatar } = userAvatar();

const props = defineProps<{
  user: User | undefined;
}>();
</script>
