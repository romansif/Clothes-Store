import { computed } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const useAuthHeader = (route: RouteLocationNormalizedLoaded) => {
    const isLogin = computed(() => route.name === "signIn");
    const isRegister = computed(() => route.name === "signUp");

    return {
        isLogin,
        isRegister,
    }
}