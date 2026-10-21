import { ref } from "vue";

const notify = ref<boolean>(false);
const notifyTitle = ref<string>('');
const notifyMessage= ref<string>('');

const loading = ref<boolean>(false);

export const useBaseModals = () => {
    const delay = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

    const openNotify= async (title: string, message: string) => {
        notifyTitle.value = title;
        notifyMessage.value = message;

        notify.value = true;

        await delay(1500)

        notify.value = false;
        notifyTitle.value = '';
        notifyMessage.value = '';
    };

    return {
        openNotify,
        loading,

        notify,
        notifyTitle,
        notifyMessage,
    }
}