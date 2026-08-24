import { ref } from "vue";
import { productStore } from "@/feature/product/model/product.store.ts";

const filterAside = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);

const { currentFile } = productStore();

export const useProductsModals = () => {
    const toggleFilterAside = () => {
        filterAside.value = !filterAside.value;
    };

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
