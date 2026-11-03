import { computed, ref } from "vue";
import { notifyErrorMessages, notifyMessages } from "@/widgets/notification/model/notification-messages";
import type { NotificationProps } from "@/widgets/notification";

import success from '@/assets/icons/notification/success.svg'
import payment_success from '@/assets/icons/notification/payment-success.svg'
import error from '@/assets/icons/notification/error.svg'

const notify = ref<boolean>(false);
const notifyProps = ref<NotificationProps | null>({
    variant: "login",
    state: "success",
})

export const useBaseModals = () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const openNotify = async (props: NotificationProps) => {
        notify.value = true;
        notifyProps.value = { ...props }

        await delay(3000);

        notify.value = false;
        notifyProps.value = null
    };

    const closeNotify = () => {
        notify.value = false;
        notifyProps.value = null
    };

    const message = computed(() => {
        const props = notifyProps.value;
        if (!props) return null;

        const table = props.state === "error" ? notifyErrorMessages : notifyMessages;
        const base = table[props.variant];

        return {
            title: base.title,
            text: base.text,
            image
        };
    });

    const image = computed(() => {
        const props = notifyProps.value;
        if (!props) return null;

        const notPayment = props.state === "error" ? error : success

        const url = props.variant === "payment" ? payment_success : notPayment

        return {
            url
        }
    });

    return {
        notify,
        notifyProps,
        message,
        image,
        openNotify,
        closeNotify
    };
};
