import { ref } from "vue";

export const filterAside = ref<boolean>(false);

export const toggleFilterAside = () => {
    filterAside.value = !filterAside.value;
};
