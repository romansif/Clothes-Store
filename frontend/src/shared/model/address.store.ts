import { ref } from "vue";
import type { UserContactInfo } from "@/entities/user-address";

const userAddresses = ref<UserContactInfo[]>([])
const userAddress = ref<UserContactInfo | null>(null)

export const informationContactStore = () => {
    return {
        userAddresses,
        userAddress,
    }
}