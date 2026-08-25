import { ref } from "vue";
import { productStore } from "@/entities/product/model/product.store.ts";

const filterAside = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);
const guideModel = ref<boolean>(false);

const { currentFile } = productStore();

export const useProductsModals = () => {
    const toggleFilterAside = () => {
        filterAside.value = !filterAside.value;
    };

    const openSelectProductCard = (index: number) => {
        currentFile.value = index;
        fileInput.value?.click();
    };

    const toggleSizeGuide = () => {
        guideModel.value = !guideModel.value;
    }

    return {
        toggleFilterAside,
        openSelectProductCard,
        toggleSizeGuide,

        filterAside,
        fileInput,
        guideModel,
    }
}
