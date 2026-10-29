import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useGetUser } from "@/widgets/profile/api/get-users";

const { getUsers, getUser } = useGetUser()

export const useUsersData = () => {
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers()
    })

    return {
        users: computed(() => users.value ?? [])
    }
}

export const useUserData = () => {
    const userId = localStorage.getItem("userId");

    const { data: user, isLoading, isError } = useQuery({
        queryKey: computed(() => ['user', userId]),

        queryFn: () => {
            if (!userId) {
                throw new Error('Пользователь не зарегистрирован');
            }

            return getUser(userId);
        },

        enabled: computed(() => Boolean(userId))
    })

    return {
        user,
        isLoading,
        isError
    }
}