const BASE_URL = `http://localhost:3000`

import { computed } from "vue";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

const { user } = usersStore();
const { cart, favorite } = productsStore();

export const useProfile = {
    userAvatar: computed(() => {
        if(user.value && user.value.avatarUrl){
            return `${BASE_URL}/${user.value.avatarUrl}`
        }
    }),

    cartCount: computed(() => {
        return cart.value.length;
    }),

    favoritesCount: computed(() => {
        return favorite.value.length;
    }),
}