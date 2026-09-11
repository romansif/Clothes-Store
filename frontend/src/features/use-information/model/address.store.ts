import {ref} from "vue";
import type {UserContactInfo} from "@/features/use-information/model/address.types.ts";

const userAddresses = ref<UserContactInfo[]>([])
const userAddress = ref<UserContactInfo>({} as UserContactInfo)

const postalCode = {
    mask: '0000[00]',
    lazy: false
}

export const informationContactStore = () => {
    return {
        userAddresses,
        userAddress,
        postalCode,
    }
}