import {ref} from "vue";

export const sizeGuideModel = ref<boolean>(false);
export const fullDescription = ref<boolean>(false);

export const toggleSizeGuide = () => {
    sizeGuideModel.value = !sizeGuideModel.value;
}

export const toggleReadMore = () => {
    fullDescription.value = !fullDescription.value;
}