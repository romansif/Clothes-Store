import {ref} from "vue";

export const sizeGuideModel = ref<boolean>(false);

export const toggleSizeGuide = () => {
    sizeGuideModel.value = !sizeGuideModel.value;
}