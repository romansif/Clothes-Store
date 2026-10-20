<template>
  <template v-if="userData">
    <main :class="['font-raleway flex justify-center',
          userData.role === 'Buyer' ? 'py-38' : 'p-45']">
      <div class="w-87.5 sm:w-150 md:w-175 lg:w-237.5 xl:w-175">
        <ProfileNotLoggedIn v-if="!userData.id" />
        <ProfileSettings v-if="userData.name"
                         :user="userData" />
      </div>
    </main>
  </template>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetUsers } from "@/features/use-profile/api/get-users.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";

import ProfileSettings from "@/widgets/ui/profile/ProfileSettings.vue";
import ProfileNotLoggedIn from "@/widgets/ui/profile/ProfileNotLoggedIn.vue";

const { userData } = userStore();
const { getUser } = useGetUsers();

onMounted(async () => {
  await getUser();
})
</script>

<style scoped>

</style>