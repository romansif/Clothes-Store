<script setup lang="ts">
import { Menu, MenuItems, MenuItem, MenuButton} from "@headlessui/vue";
import { useAuth } from "../../auth/auth-composables/useAuth.ts";
import { useDeleteProfile } from "../profile-composables/useDeleteProfile.ts";
import { usersStore } from "../../../shared/composables/stores/users.store.ts";

const { logout } = useAuth();
const { user } = usersStore();
const { deleteAccount } = useDeleteProfile();
</script>

<template>
  <Menu as="div" class="relative inline-block ml-auto">
    <MenuButton class="border border-gray-300 inline-flex w-full justify-center gap-x-1.5 rounded-xl
        px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5 ">
      Account
    </MenuButton>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75"
                leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-2 w-46 origin-top-right divide-y
          rounded-xl bg-white border border-gray-300">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button @click=logout :class="[active ? 'bg-white/5 text-black outline-hidden' : 'text-[#A3A3A3]',
                'block px-4 py-2 text-sm']">
              Exit Account
            </button>
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button @click=deleteAccount :class="[active ? 'bg-white/5 text-black outline-hidden' : 'text-[#A3A3A3]',
                'block px-4 py-2 text-sm']">
              Delete Account
            </button>
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }" v-if="user.role === 'Seller'">
            <router-link :to="{name: '/auth/Register'}">
              <button :class="[active ? 'bg-white/5 text-black outline-hidden' : 'text-[#A3A3A3]',
                  'block px-4 py-2 text-sm']">
                Become a buyer
              </button>
            </router-link>
          </MenuItem>
          <MenuItem v-slot="{ active }" v-if="user.role === 'Buyer'">
            <router-link :to="{name: '/auth/Register'}">
              <button :class="[active ? 'bg-white/5 text-black outline-hidden' : 'text-[#A3A3A3]',
                  'block px-4 py-2 text-sm']">
                Become a seller
              </button>
            </router-link>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style scoped>

</style>