<template>
    <main class="font-raleway mt-45 md:mt-65 lg:mt-95 xl:mt-25">
        <div class="flex flex-col">
            <div class="flex flex-col text-5xl font-extrabold">
                <span>NEW</span>
                <span>THIS WEEK</span>
            </div>
            <div class="mt-5 flex flex-col">
                <div class="mb-3 flex w-full border-b border-gray-300 pb-3">
                    <router-link
                        :to="{ name: 'shop/new-collections' }"
                        class="ml-auto cursor-pointer text-[#A3A3A3] transition duration-400 hover:scale-120 hover:text-black"
                    >
                        See All
                    </router-link>
                </div>
                <WeekList :user="user" />
            </div>
        </div>
        <div class="mt-10 flex flex-col lg:mt-25">
            <div class="mb-8 flex flex-col text-5xl font-extrabold">
                <span>XIV</span>
                <span>COLLECTIONS</span>
                <span class="font-dm-sans">25-26</span>
            </div>
            <FilterGender />
            <div class="flex flex-col">
                <YearList :user="user" />
            </div>
        </div>
        <div class="mt-25 flex flex-col">
            <div class="flex justify-center">
                <div class="flex flex-col items-center">
                    <h1 class="w-75 text-center text-5xl md:w-full">
                        Our Approach to fashion design
                    </h1>
                    <i class="mt-13 w-75 text-center font-extralight text-[#A3A3A3] md:w-135">
                        At elegant vogue , we blend creativity with craftsmanship to create fashion
                        that transcends trends and stands the test of time each design is
                        meticulously crafted, ensuring the highest quality exquisite finish
                    </i>
                </div>
            </div>
            <div class="mt-20 flex justify-center lg:mt-20 lg:flex">
                <ul
                    class="no-scrollbar flex flex-col gap-10 overflow-x-auto whitespace-nowrap lg:flex lg:flex-row xl:gap-20"
                >
                    <li class="flex w-50 shrink-0 flex-col md:w-75 lg:w-75">
                        <img :src="photo_1" alt="" />
                    </li>
                    <li class="mt-0 flex w-50 shrink-0 flex-col md:w-75 lg:mt-20 lg:w-75">
                        <img :src="photo_2" alt="" />
                    </li>
                    <li class="flex w-50 shrink-0 flex-col md:w-75 lg:w-75">
                        <img :src="photo_3" alt="" />
                    </li>
                </ul>
            </div>
        </div>
        <Transition name="modal">
            <Notification v-if="notify" />
        </Transition>
    </main>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useBaseModals } from "@/shared/lib/use-notify";
import { WeekList } from "@/widgets/week-list";
import { YearList } from "@/widgets/year-list";
import { FilterGender } from "@/widgets/home";
import { Notification } from "@/shared";

import photo_1 from "@/assets/photos/8.png";
import photo_2 from "@/assets/photos/9.png";
import photo_3 from "@/assets/photos/pants.png";

const { user } = useUserData();
const { notify } = useBaseModals();
</script>
