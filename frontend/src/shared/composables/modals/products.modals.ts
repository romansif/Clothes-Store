import { ref } from "vue";
import { productsStore } from "../stores/products.store";

const filterAside = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);

const { currentFile } = productsStore();

export const useProductsModals = () => {
    const toggleFilterAside = () => {
        filterAside.value = !filterAside.value;
    }


    const openSelectProductCard = (index: number) => {
        currentFile.value = index;
        fileInput.value?.click();
    };

    return {
        toggleFilterAside,
        openSelectProductCard,

        filterAside,
        fileInput,
    }
}
