<template>
  <template v-if="userData">
    <main :class="['font-raleway flex justify-center',
          userData.role === 'Buyer' ? 'py-38' : 'p-45']">
      <div class="w-87.5 sm:w-150 md:w-175 lg:w-237.5 xl:w-175">
        <ProfileNotLoggedIn v-if="!userData.id" />
        <ProfileSettings />
      </div>
    </main>
  </template>
</template>

<script setup lang="ts">
import { userData } from "@/shared/model/user.store";
import { ProfileSettings, ProfileNotLoggedIn } from "@/widgets/profile";
</script>
