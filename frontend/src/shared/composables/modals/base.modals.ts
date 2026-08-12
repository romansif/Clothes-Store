import { ref } from "vue";
import router from "@/app/router";

const notify = ref<boolean>(false);
const notifyTitle = ref<string>('');
const notifyMessage= ref<string>('');

const loading = ref<boolean>(false);

const choiceModal = ref<boolean>(false);
const cancelChoice = ref<string>('');
const orderId = ref<string>('');


export const useBaseModals = () => {
    const delay = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

    const openNotify= async (title: string, message: string, name: string) => {
        notifyTitle.value = title;
        notifyMessage.value = message;

        notify.value = true;

        await delay(700)

        notify.value = false;
        notifyTitle.value = '';
        notifyMessage.value = '';

        choiceModal.value = false;
        cancelChoice.value = '';

        await router.push({name: `${name}`});
    };

    const toggleOrder = (id: string) => {
        choiceModal.value = !choiceModal.value;
        orderId.value = id;
        cancelChoice.value = '';
    };

    return {
        openNotify,
        toggleOrder,

        cancelChoice,
        choiceModal,
        orderId,
        loading,
        notify,
        notifyTitle,
        notifyMessage,
    }
}