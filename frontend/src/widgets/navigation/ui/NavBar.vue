<template>
    <nav class="font-raleway">
        <div class="flex items-center justify-between md:justify-between">
            <div class="flex items-center gap-5 lg:gap-10">
                <img
                    :src="catalog"
                    alt=""
                    class="w-7.5 cursor-pointer"
                    @click="toggleFilterAside"
                />
                <div
                    class="hidden font-light sm:hidden md:flex md:gap-5 lg:flex lg:gap-10 xl:flex xl:gap-10"
                >
                    <span
                        :class="[
                            'cursor-pointer text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black',
                            route.name === 'home' ? 'scale-120 text-black' : '',
                        ]"
                    >
                        Home
                    </span>
                    <router-link
                        :to="{ name: 'shop/seasons-catalog' }"
                        class="text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black"
                    >
                        Seasonal
                    </router-link>
                    <router-link
                        :to="{ name: 'shop' }"
                        class="text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black"
                    >
                        Shop
                    </router-link>
                    <router-link
                        :to="{ name: 'shop/new-collections' }"
                        class="text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black"
                    >
                        New
                    </router-link>
                </div>
            </div>
            <div
                class="flex gap-3 sm:flex sm:gap-3 md:flex md:gap-5 lg:flex lg:gap-10 xl:flex xl:gap-10"
            >
                <router-link
                    v-if="user?.role === 'Buyer'"
                    :to="{ name: 'favorite' }"
                    class="w-10 h-10 transition duration-400 hover:scale-110"
                >
                    <div class="hidden sm:hidden md:flex lg:flex xl:flex">
                        <img :src="liked" alt="" class="w-10 h-10 rounded-full" />
                    </div>
                </router-link>
                <router-link :to="{ name: 'profile' }"
                             class="flex items-center gap-2.5 group">
                  <img :src="user ? avatar() : profile" alt=""
                       class="w-10 h-10 rounded-full object-cover bg-white
                        transition duration-300 group-hover:scale-110"/>
                  <span v-if="user" class="font-medium">{{ user.name }}</span>
                </router-link>
                <router-link v-if="user?.role === 'Buyer'"
                             :to="{ name: 'cart' }"
                             class="transition duration-400 hover:scale-110">
                    <div class="gap-1 md:flex lg:flex xl:flex xl:items-center">
                        <span
                            class="hidden items-center rounded-4xl bg-black px-7 py-3.5 text-white md:flex"
                        >
                            Cart
                        </span>
                        <img :src="cart" alt="" class="w-12.5 rounded-full" />
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { toggleFilterAside } from "@/features/products/lib/product-modal";
import type { User } from "@/entities/profile";

import cart from "@/assets/icons/nav/cart.png";
import liked from "@/assets/icons/nav/favorite.jpeg";
import profile from "@/assets/icons/nav/default-avatar.png";
import catalog from "@/assets/icons/nav/catalog.svg";

const route = useRoute();
const { avatar } = userAvatar()

const props = defineProps<{
  user: User | undefined
}>()
</script>
