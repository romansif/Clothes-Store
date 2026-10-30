import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getFavoriteProducts } from "@/shared/api/get-favorite";

export const useFavoriteData = () => {
    const userId = localStorage.getItem("userId");

    const {
        data: favorite,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: computed(() => ["favorite", userId]),

        queryFn: () => {
            if (!userId) {
                throw new Error("Пользователь не зарегистрирован");
            }

            return getFavoriteProducts(userId);
        },

        enabled: computed(() => Boolean(userId)),
    });

    return {
        favorite: computed(() => favorite.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch
    };
};
