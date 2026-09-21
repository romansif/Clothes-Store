import { ref } from "vue";
import router from "@/app/router";
import { reviewFormModal } from "@/features/use-review-form/lib/review-form-modal.ts";
import { choiceModal } from "@/features/use-order/lib/order-modal.ts";
import { cancelChoiceForm } from "@/entities/order/model/order.forms.ts";

const notify = ref<boolean>(false);
const notifyTitle = ref<string>('');
const notifyMessage= ref<string>('');

const loading = ref<boolean>(false);

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
        reviewFormModal.value = false;

        cancelChoiceForm.value.cancelChoice = '';

        await router.push({name: `${name}`});
    };

    return {
        openNotify,
        loading,

        notify,
        notifyTitle,
        notifyMessage,
    }
}