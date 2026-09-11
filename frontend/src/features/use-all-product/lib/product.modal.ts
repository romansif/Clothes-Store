import { ref } from "vue";

const filterAside = ref<boolean>(false);

export const useProductsModals = () => {
    const toggleFilterAside = () => {
        filterAside.value = !filterAside.value;
    };

    return {
        toggleFilterAside,
        filterAside,

    }
}
