<template>
    <Transition name="view" mode="out-in">
      <div>
        <Loader v-if="isLoading" variant="user" />
        <ErrorState v-else-if="isError" variant="user" :loading="isFetching" @reload="refetch()" />
        <main
            v-else-if="user"
            :class="['font-raleway flex justify-center', user.role === 'Buyer' ? 'py-28' : 'py-46']"
        >
          <ProfileSettings :user="user" />
        </main>
        <ProfileNotLoggedIn v-if="!user" />
      </div>
    </Transition>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { ProfileSettings, ProfileNotLoggedIn } from "@/widgets/profile";
import { ErrorState, Loader } from "@/widgets/state";

const { user, isLoading, isFetching, isError, refetch } = useUserData();
</script>
