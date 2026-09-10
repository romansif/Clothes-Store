<template>
  <main :class="isProfileLoginClass(user)" class="font-raleway">
    <div class="w-87.5 sm:w-150 md:w-175 lg:w-237.5 xl:w-175">
      <ProfileNotLoggedIn v-if="!user.id" />
      <ProfileSettings v-if="user.id" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetUsers } from "@/features/use-auth/api/get-users.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { profileClasses } from "@/shared/const/user/profile.classes.ts";

import ProfileSettings from "@/features/use-profile/ui/ProfileSettings.vue";
import ProfileNotLoggedIn from "@/features/use-profile/ui/ProfileNotLoggedIn.vue";

const { user } = userStore();
const { getUser } = useGetUsers();
const { isProfileLoginClass } = profileClasses();

onMounted(async () => {
  await getUser();
})
</script>

<style scoped>

</style>