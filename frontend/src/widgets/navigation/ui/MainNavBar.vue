<template>
    <nav class="font-raleway">
        <div class="flex items-center justify-between md:justify-between">
            <div class="flex items-center gap-5 lg:gap-10">
                <div
                    class="hidden font-light sm:hidden md:flex md:gap-5 lg:flex lg:gap-10 xl:flex xl:gap-10"
                >
                    <router-link
                        :to="{ name: 'home' }"
                        :class="[routeClass, isHome ? selectRouteClass : '']"
                    >
                        Home
                    </router-link>
                    <router-link
                        :to="{ name: 'shop/seasons-catalog' }"
                        :class="[routeClass, isSeasonCollections ? selectRouteClass : '']"
                    >
                        Seasonal
                    </router-link>
                    <router-link
                        :to="{ name: 'shop' }"
                        :class="[routeClass, isProducts ? selectRouteClass : '']"
                    >
                        Shop
                    </router-link>
                    <router-link
                        :to="{ name: 'shop/new-collections' }"
                        :class="[routeClass, isNewCollections ? selectRouteClass : '']"
                    >
                        New
                    </router-link>
                </div>
                <router-link v-if="!isProfile" :to="{ name: 'shop' }">
                    <div class="flex md:hidden">
                        <img
                            :src="right_long_arrow"
                            alt=""
                            class="w-18 rotate-180 transition duration-400 hover:scale-110"
                        />
                    </div>
                </router-link>
            </div>
            <div
                class="flex items-center gap-3 sm:flex sm:gap-3 md:flex md:gap-5 lg:flex lg:gap-10 xl:flex xl:gap-10"
            >
                <router-link v-if="user?.role === 'Buyer'" :to="{ name: 'favorite' }">
                    <div class="hidden sm:hidden md:flex lg:flex xl:flex">
                        <img
                            :src="liked"
                            alt=""
                            class="w-11 rounded-full transition duration-400 hover:scale-110"
                        />
                    </div>
                </router-link>
                <router-link
                    v-if="isProfile"
                    :to="{ name: 'profile' }"
                    class="group flex items-center gap-2.5 transition duration-400 hover:scale-110"
                >
                    <img
                        :src="user ? avatar() : profile"
                        alt=""
                        class="h-11 w-11 rounded-full bg-white object-cover"
                    />

                    <span v-if="user" class="font-medium">{{ user.name }}</span>
                </router-link>
                <router-link v-if="user?.role === 'Buyer'" :to="{ name: 'cart' }">
                    <div
                        class="gap-1 transition duration-400 hover:scale-110 md:flex lg:flex xl:flex xl:items-center"
                    >
                        <span
                            class="hidden items-center rounded-3xl bg-black px-7 py-2.5 text-white md:flex"
                        >
                            Cart
                        </span>
                        <div class="relative">
                            <img :src="cart" alt="" class="h-11 w-11 rounded-full" />
                            <div
                                v-if="unreadCount > 0 && isCart"
                                class="absolute bottom-7 left-7 rounded-full bg-black px-3 py-0.5"
                            >
                                <span class="font-dm-sans text-white">{{ unreadCount }}</span>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useMainNavBar } from "@/widgets/navigation/lib/use-main-nav-bar";
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import { routeClass, selectRouteClass } from "@/widgets/navigation/model/route.variants";

import cart from "@/assets/icons/nav/cart.png";
import liked from "@/assets/icons/nav/favorite.jpeg";
import profile from "@/assets/icons/nav/default-avatar.png";
import right_long_arrow from "@/assets/icons/arrows/right-long-arrow.png";

const route = useRoute();

const { user } = useUserData();
const { avatar } = userAvatar();
const { unreadCount } = cartStore();
const { isHome, isCart, isProducts, isNewCollections, isSeasonCollections, isProfile } =
    useMainNavBar(route);
</script>
