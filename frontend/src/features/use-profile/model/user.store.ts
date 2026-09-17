import { ref } from 'vue'
import { type User } from "@/features/use-profile/model/user.types.ts";

const users = ref<User[]>([])

const rawUser = localStorage.getItem("user")

const userData = ref<User | null>(
    rawUser ? JSON.parse(rawUser) : null
)
export const userStore = () => {
    return {
        users,

        userData,
    }
}