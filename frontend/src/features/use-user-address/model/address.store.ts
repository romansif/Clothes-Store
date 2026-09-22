import {ref} from "vue";
import type {UserContactInfo} from "@/entities/checkout-contact-info/model/address.types.ts";

const userAddresses = ref<UserContactInfo[]>([])
const userAddress = ref<UserContactInfo | null>(null)

export const informationContactStore = () => {
    return {
        userAddresses,
        userAddress,
    }
}