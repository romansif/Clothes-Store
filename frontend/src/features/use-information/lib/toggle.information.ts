import {ref} from "vue";

const informationId = ref<string>('');

const isSavedAddress = ref<boolean>(false);
const isChosenAddress = ref<boolean>(false);
const isChosenContactInfo = ref<boolean>(false);

export const toggleInformation = () => {
    const toggleShowContact = () => {
        isSavedAddress.value = !isSavedAddress.value;
    };

    return {
        isSavedAddress,
        isChosenAddress,
        isChosenContactInfo,
        informationId,
        toggleShowContact,
    }
}