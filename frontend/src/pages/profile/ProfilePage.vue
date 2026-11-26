<template>
  <Transition name="view" mode="out-in">
    <div>
      <Loader v-if="isLoading" variant="user" />
      <ErrorState v-else-if="isError" variant="user" :loading="isFetching" @reload="refetch()" />
      <main v-else-if="user" :class="['font-raleway flex justify-center', user.role === 'Buyer' ? 'py-22' : 'py-30']">
        <ProfileSettings :user="user" />
      </main>
      <ProfileNotLoggedIn v-if="!user" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile";
import { ProfileSettings, ProfileNotLoggedIn } from "@/widgets/profile";
import { ErrorState, Loader } from "@/shared/ui/state";

const { user, isLoading, isFetching, isError, refetch } = useUserData();
</script>
