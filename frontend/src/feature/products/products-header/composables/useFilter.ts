import {computed, ref} from "vue";
import { useGetProducts } from "../../composables/getProducts.ts";
import { productsStore } from "../../../../shared/composables/stores/products.store.ts";

const { allProducts } = productsStore();
const { getFilteredProducts } = useGetProducts();

export const useFilter = () => {
    const isAvailability = ref<boolean>(true);
    const isOutOfStack = ref<boolean>(false);

    const isMan = ref<boolean>(false);
    const isWoman = ref<boolean>(false);
    const isKids = ref<boolean>(false);

    const isWhite = ref<boolean>(false);
    const isBlack = ref<boolean>(false);
    const isBurgundy = ref<boolean>(false);
    const isRed = ref<boolean>(false);
    const isGreen = ref<boolean>(false);
    const isBlue = ref<boolean>(false);

    const toggleAvailability = async (type: string) => {
        switch (type) {
            case "Availability":
                isAvailability.value = true;
                isOutOfStack.value = false;
                break;
            case "Out Of Stack":
                isAvailability.value = false;
                isOutOfStack.value = true;
                break;
        }
        isWhite.value = false;
        isBlack.value = false;
        isBurgundy.value = false;
        isRed.value = false;
        isBlue.value = false;
        isGreen.value = false;
        isMan.value = false;
        isWoman.value = false;
        isKids.value = false;
        await getFilteredProducts('ALL', type);
    };

    const toggleGender = async (type: string) => {
        switch (type) {
            case "Man":
                isMan.value = true;
                isWoman.value = false;
                isKids.value = false;
                break;
            case "Woman":
                isMan.value = false;
                isWoman.value = true;
                isKids.value = false;
                break;
            case "Kids":
                isMan.value = false;
                isWoman.value = false;
                isKids.value = true;
                break;
        }
        isWhite.value = false;
        isBlack.value = false;
        isBurgundy.value = false;
        isRed.value = false;
        isBlue.value = false;
        isGreen.value = false;
        isAvailability.value = false;
        isOutOfStack.value = false;
        await getFilteredProducts('GENDER', type);
    };

    const toggleColor = async (type: string) => {
        switch (type) {
            case "White":
                isWhite.value = true;
                isBlack.value = false;
                isBurgundy.value = false;
                isRed.value = false;
                isBlue.value = false;
                isGreen.value = false;
                break;
            case "Black":
                isWhite.value = false;
                isBlack.value = true;
                isBurgundy.value = false;
                isRed.value = false;
                isBlue.value = false;
                isGreen.value = false;
                break;
            case "Rose":
                isWhite.value = false;
                isBlack.value = false;
                isBurgundy.value = true;
                isRed.value = false;
                isBlue.value = false;
                isGreen.value = false;
                break;
            case "Red":
                isWhite.value = false;
                isBlack.value = false;
                isBurgundy.value = false;
                isRed.value = true;
                isBlue.value = false;
                isGreen.value = false;
                break;
            case "Blue":
                isWhite.value = false;
                isBlack.value = false;
                isBurgundy.value = false;
                isRed.value = false;
                isBlue.value = true;
                isGreen.value = false;
                break;
            case "Green":
                isWhite.value = false;
                isBlack.value = false;
                isBurgundy.value = false;
                isRed.value = false;
                isBlue.value = false;
                isGreen.value = true;
                break;
        }
        isMan.value = false;
        isWoman.value = false;
        isKids.value = false;
        isAvailability.value = false;
        isOutOfStack.value = false;
        await getFilteredProducts('COLOR', type);
    }

    const inStackCount = computed(() => {
        return allProducts.value.filter(product => product.status === 'Availability')
    });
    const outOfStackCount = computed(() => {
        return allProducts.value.filter(product => product.status === 'Out Of Stack')
    });
    const inMan = computed(() => {
        return allProducts.value.filter(product => product.gender === 'Man')
    });
    const inWoman = computed(() => {
        return allProducts.value.filter(product => product.gender === 'Woman')
    });
    const inKids = computed(() => {
        return allProducts.value.filter(product => product.gender === 'Kids')
    });

    return {
        toggleAvailability,
        toggleGender,
        toggleColor,

        isAvailability,
        isOutOfStack,
        isMan,
        isWoman,
        isKids,

        inStackCount,
        outOfStackCount,
        inMan,
        inWoman,
        inKids,

        isWhite,
        isBlack,
        isBurgundy,
        isRed,
        isBlue,
        isGreen,
    }
}