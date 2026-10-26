import { ref } from "vue";

export const fullDescription = ref<boolean>(false);

export const toggleReadMore = () => {
    fullDescription.value = !fullDescription.value;
}