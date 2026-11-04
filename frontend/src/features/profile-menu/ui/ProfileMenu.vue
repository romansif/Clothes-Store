<template>
  <Menu v-if="user" as="div" class="font-raleway relative inline-block">
    <MenuButton
      class="inline-flex w-full justify-center gap-x-1.5 rounded-xl border border-gray-300 px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5 transition duration-400 hover:scale-108"
    >
      {{ t("profile.account") }}
    </MenuButton>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="absolute right-0 z-10 mt-2 w-46 origin-top-right divide-y rounded-xl border border-gray-300 bg-white">
        <div class="py-1">
          <MenuItem>
            <UiButton variant="profileMenu" :name="t('profile.exitAccount')" @click="toggleDeleteChoice(t('confirm.logout'), 'EXIT', '')" />
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem>
            <UiButton
              variant="profileMenu"
              :name="t('profile.deleteAccount')"
              @click="toggleDeleteChoice(t('confirm.deleteAccount'), 'DELETE_ACCOUNT', '')"
            />
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-if="user.role === 'Seller'">
            <router-link :to="{ name: 'signUp' }">
              <UiButton variant="profileMenu" :name="t('profile.becomeBuyer')" />
            </router-link>
          </MenuItem>
          <MenuItem v-if="user.role === 'Buyer'">
            <router-link :to="{ name: 'signUp' }">
              <UiButton variant="profileMenu" :name="t('profile.becomeSeller')" />
            </router-link>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { UiButton } from "@/shared/ui/button";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/vue";
import type { User } from "@/entities/profile";

const props = defineProps<{
  user: User;
}>();

const { t } = useI18n();
const { toggleDeleteChoice } = baseDeleteModal();
</script>
