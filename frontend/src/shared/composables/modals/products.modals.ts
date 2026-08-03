import { ref } from "vue";
import { productsStore } from "../stores/products.store.ts";
import { clearProductsForms } from "@/shared/composables/clear-forms/clear.products.ts";

const notify = ref<boolean>(false)
const filterAside = ref<boolean>(false)
const createProduct = ref<boolean>(false)
const fileInput = ref<HTMLInputElement | null>(null);

const notifyTitle = ref<string>('')
const notifyMessage= ref<string>('')

const { clearProductForm } = clearProductsForms()
const { currentFile } = productsStore()

export const useProductsModals = () => {
    const openNotify= (title: string, message: string) => {
        notify.value = true;

        setTimeout(() => {
            notify.value = false;
            notifyTitle.value = '';
            notifyMessage.value = '';
        }, 1500);

        notifyTitle.value = title;
        notifyMessage.value = message;
    }

    const toggleFilterAside = () => {
        filterAside.value = !filterAside.value;
    }

    const toggleCreateProductModal = () => {
        createProduct.value = !createProduct.value;
        currentFile.value = 0;
        clearProductForm();
    }
    const openSelectProductCard = (index: number) => {
        currentFile.value = index;
        fileInput.value?.click();
    }
    return {
        openNotify,
        toggleFilterAside,
        toggleCreateProductModal,
        openSelectProductCard,

        notify,
        notifyTitle,
        notifyMessage,

        filterAside,
        createProduct,
        fileInput,
    }
}
