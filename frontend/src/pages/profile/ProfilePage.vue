<template>
  <Loading v-if="isPending" />
  <ErrorState v-else-if="isError" :box="{ variant: 'user', state: 'error' }" />
  <template v-else-if="user">
    <main :class="['font-raleway flex justify-center',
          user.role === 'Buyer' ? 'py-38' : 'p-45']">
      <div class="w-87.5 sm:w-150 md:w-175 lg:w-237.5 xl:w-175">
        <ProfileNotLoggedIn v-if="!user.id" />
        <ProfileSettings :user="user" />
      </div>
    </main>
  </template>
  <EmptyState v-else :box="{ variant: 'user', state: 'empty' }" />
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { ProfileSettings, ProfileNotLoggedIn } from "@/widgets/profile";
import { EmptyState, ErrorState, Loading } from "@/widgets/state";

const { user, isPending, isError } = useUserData()
</script>
