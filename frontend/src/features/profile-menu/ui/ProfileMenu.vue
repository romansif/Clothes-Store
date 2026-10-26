<template>
  <Menu v-if="userData" as="div"
        class="relative inline-block font-raleway">
    <MenuButton class="border border-gray-300 inline-flex w-full justify-center gap-x-1.5 rounded-xl
        px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5 transition duration-400 hover:scale-108">
      Account
    </MenuButton>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75"
                leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-2 w-46 origin-top-right divide-y
          rounded-xl bg-white border border-gray-300">
        <div class="py-1">
          <MenuItem>
            <UiButton variant="profileMenu" name="Exit Account" @click="toggleDeleteChoice(
                'Are you sure you want to log out of this account?', 'EXIT', '')" />
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem>
            <UiButton variant="profileMenu" name="Delete Account" @click="toggleDeleteChoice(
                'Are you sure you want to delete this account?', 'DELETE_ACCOUNT', '')" />
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-if="userData.role === 'Seller'">
            <router-link :to="{name: 'signUp'}">
              <UiButton variant="profileMenu" name="Become a buyer" />
            </router-link>
          </MenuItem>
          <MenuItem v-if="userData.role === 'Buyer'">
            <router-link :to="{name: 'signUp'}">
              <UiButton variant="profileMenu" name="Become a seller" />
            </router-link>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { userStore } from "@/shared/model/user.store";
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { Menu, MenuItems, MenuItem, MenuButton} from "@headlessui/vue";
import { UiButton } from "@/shared/ui/button";

const { userData } = userStore();
const { toggleDeleteChoice } = baseDeleteModal();
</script>
