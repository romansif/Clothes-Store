import { ref } from "vue";
import { productsStore } from "../stores/products.store";
import { clearProductsForms } from "@/shared/composables/clear-forms/clear.products";

const filterAside = ref<boolean>(false);
const createProduct = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);

const { clearProductForm } = clearProductsForms();
const { currentFile } = productsStore();

export const useProductsModals = () => {
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
    };

    return {
        toggleFilterAside,
        toggleCreateProductModal,
        openSelectProductCard,

        filterAside,
        createProduct,
        fileInput,
    }
}
