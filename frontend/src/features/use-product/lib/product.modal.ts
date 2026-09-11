import { ref } from "vue";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { productStore } from "@/features/use-product/model/product.store.ts";
import type { Product } from "@/features/use-product/model/product.types.ts";

const filterAside = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);
const guideModel = ref<boolean>(false);
const stackInfo = ref<boolean>(false);

const { product } = useGetProduct();
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

    const toggleStackInfo = (obj: Product) => {
        product.value = obj;
        stackInfo.value = !stackInfo.value;
    }

    return {
        toggleFilterAside,
        openSelectProductCard,
        toggleSizeGuide,
        toggleStackInfo,

        filterAside,
        fileInput,
        guideModel,
        stackInfo,
    }
}
