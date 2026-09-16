import { ref } from "vue";
import router from "@/app/router";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { cancelChoiceForm } from "@/features/use-order/model/order.store.ts";

const { choiceModal } = orderStore();

const notify = ref<boolean>(false);
const notifyTitle = ref<string>('');
const notifyMessage= ref<string>('');

const loading = ref<boolean>(false);

const orderId = ref<string>('');

export const useBaseModals = () => {
    const delay = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

    const openNotify= async (title: string, message: string, name: string) => {
        notifyTitle.value = title;
        notifyMessage.value = message;

        notify.value = true;

        await delay(1500)

        notify.value = false;
        notifyTitle.value = '';
        notifyMessage.value = '';

        choiceModal.value = false;
        cancelChoiceForm.value.cancelChoice = '';

        await router.push({name: `${name}`});
    };

    const toggleOrder = (id: string) => {
        choiceModal.value = !choiceModal.value;
        orderId.value = id;
        cancelChoiceForm.value.cancelChoice = '';
    };

    return {
        openNotify,
        toggleOrder,

        choiceModal,
        orderId,

        loading,

        notify,
        notifyTitle,
        notifyMessage,
    }
}