<template>
  <nav class="font-raleway bg-white p-4 md:p-5 lg:p-6">
    <div class="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
      <div class="flex items-center gap-5 justify-self-start lg:gap-10">
        <router-link v-if="props.user?.role === 'Buyer'" :to="{ path: `/shop/my-favorite/${props.user.id}` }">
          <div class="hidden md:flex">
            <img :src="liked" alt="" class="h-12 w-12 rounded-full transition duration-400 hover:scale-110" />
          </div>
        </router-link>
        <router-link v-if="props.user?.role === 'Buyer'" :to="{ path: `/shop/my-cart/${props.user.id}` }">
          <div class="gap-1 transition duration-400 hover:scale-110 md:flex lg:flex xl:flex xl:items-center">
            <span class="hidden items-center rounded-3xl bg-black px-7 py-3 text-white md:flex">
              {{ t("nav.cart") }}
            </span>
            <img :src="cart" alt="" class="h-11.5 w-11.5 rounded-full" />
          </div>
        </router-link>
      </div>
      <div class="hidden justify-self-center font-light md:flex md:gap-5 lg:gap-10">
        <router-link :to="{ name: 'home' }" :class="isHome ? selectRouteClass : routeClass">
          {{ t("nav.home") }}
        </router-link>
        <router-link
          :to="{ name: 'shop/seasons-catalog' }"
          :class="isSeasonCollections ? selectRouteClass : routeClass"
        >
          {{ t("nav.seasonal") }}
        </router-link>
        <router-link :to="{ name: 'shop' }" :class="isProducts ? selectRouteClass : routeClass">
          {{ t("nav.shop") }}
        </router-link>
        <router-link :to="{ name: 'shop/new-collections' }" :class="isNewCollections ? selectRouteClass : routeClass">
          {{ t("nav.new") }}
        </router-link>
      </div>
      <div class="flex items-center gap-3 justify-self-end md:gap-5 lg:gap-10">
        <router-link v-if="props.user"
                     :to="{ path: `/profile/${props.user.id}` }"
          class="group flex items-center gap-2.5 transition duration-400 hover:scale-110"
        >
          <img :src="props.user ? avatar() : profile" alt="" class="h-11 w-11 rounded-full bg-white object-cover" />
          <span v-if="props.user" class="font-medium text-[#722f37]">{{ props.user.name }}</span>
        </router-link>
        <LanguageSwitcher class="w-40" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { routeClass, selectRouteClass } from "../model/route.variants";
import { useMainNavBar } from "@/widgets/navigation/lib/use-main-nav-bar";
import { LanguageSwitcher } from "@/widgets/navigation";
import type { User } from "@/entities/profile";

import cart from "@/assets/icons/nav/cart.png";
import liked from "@/assets/icons/nav/favorite.jpeg";
import profile from "@/assets/icons/nav/default-avatar.png";

const route = useRoute();

const { t } = useI18n();
const { avatar } = userAvatar();
const { isHome, isProducts, isNewCollections, isSeasonCollections } = useMainNavBar(route);

const props = defineProps<{
  user: User | undefined;
}>();
</script>
