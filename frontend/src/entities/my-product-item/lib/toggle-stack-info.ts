import { ref } from "vue";

export const stackInfo = ref<boolean>(false);

export const toggleStackInfo = () => {
    stackInfo.value = !stackInfo.value;
}