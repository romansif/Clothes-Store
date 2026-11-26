import { ref } from "vue";
import { useProfileModals } from "@/shared/lib";

export const editAddressModal = ref<boolean>(false)
export const address_id = ref<string>('')

export const openEditAddress = (id: string) => {
    const { savedAddresses } = useProfileModals();

    editAddressModal.value = true
    savedAddresses.value = false
    address_id.value = id
}

export const closeEditAddress = () => {
    const { savedAddresses } = useProfileModals();
    editAddressModal.value = false
    savedAddresses.value = true
}