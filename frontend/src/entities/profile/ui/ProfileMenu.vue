<template>
  <Menu as="div" class="relative inline-block">
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
          <MenuItem v-slot="{ active }">
            <button @click="toggleDeleteChoice('Are you sure you want to log out of this account?', 'EXIT', '')"
                    :class="['transition duration-400 cursor-pointer', active ?
                    'bg-white/5 text-black outline-hidden scale-110' :
                    'text-[#A3A3A3]',
                'block px-4 py-2 text-sm']">
              Exit Account
            </button>
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button @click="toggleDeleteChoice('Are you sure you want to delete this account?', 'DELETE_ACCOUNT', '')"
                    :class="['transition duration-400 cursor-pointer', active ?
                    'bg-white/5 text-black outline-hidden scale-110' :
                    'text-[#A3A3A3]',
                'block px-4 py-2 text-sm']">
              Delete Account
            </button>
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }" v-if="user.role === 'Seller'">
            <router-link :to="{name: 'signUp'}">
              <button :class="['transition duration-400 cursor-pointer', active ? 'bg-white/5 text-black outline-hidden scale-110' : 'text-[#A3A3A3]',
                  'block px-4 py-2 text-sm']">
                Become a buyer
              </button>
            </router-link>
          </MenuItem>
          <MenuItem v-slot="{ active }" v-if="user.role === 'Buyer'">
            <router-link :to="{name: 'signUp'}">
              <button :class="['transition duration-400 cursor-pointer', active ? 'bg-white/5 text-black outline-hidden scale-110' : 'text-[#A3A3A3]',
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

<script setup lang="ts">
const { user } = userStore();
const { toggleDeleteChoice } = useProfileModals();

import { userStore } from "@/entities/profile/model/user.store.ts";
import { Menu, MenuItems, MenuItem, MenuButton} from "@headlessui/vue";
import { useProfileModals } from "@/feature/use-profile/lib/profile.modal.ts";
</script>

<style scoped>

</style>