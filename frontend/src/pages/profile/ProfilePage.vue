<template>
    <Transition name="view" mode="out-in">
        <Loader v-if="isLoading" variant="user" />
        <ErrorState v-else-if="isError" variant="user" :loading="isFetching" @reload="refetch()" />
        <main
            v-else-if="user"
            :class="['font-raleway flex justify-center', user.role === 'Buyer' ? 'py-28' : 'py-46']"
        >
            <div class="w-87.5 sm:w-150 md:w-175 lg:w-237.5 xl:w-175">
                <ProfileNotLoggedIn v-if="!user" />
                <ProfileSettings :user="user" />
            </div>
        </main>
    </Transition>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { ProfileSettings, ProfileNotLoggedIn } from "@/widgets/profile";
import { ErrorState, Loader } from "@/widgets/state";

const { user, isLoading, isFetching, isError, refetch } = useUserData();
</script>
