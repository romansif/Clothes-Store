import { ref } from 'vue'
import { type User } from "@/features/use-profile/model/user.types.ts";

const users = ref<User[]>([])
const user = ref<User>({} as User)

const userData = JSON.parse(localStorage.getItem('user')!);



export const userStore = () => {
    return {
        users,
        user,

        userData,
    }
}