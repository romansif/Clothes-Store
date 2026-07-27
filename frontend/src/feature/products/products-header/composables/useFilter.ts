import { ref } from "vue";
import { useGetProducts } from "../../composables/getProducts.ts";

const { getFilteredProducts } = useGetProducts();

export const useFilter = () => {
    const stackProducts = ref<Record<string, boolean>>({
        Availability: true,
        Exhausted: false,
    })

    const genders = ref<Record<string, boolean>>({
        Man: false,
        Woman: false,
        Kids: false,
    })

    const colors = ref<Record<string, boolean>>({
        White: false,
        Black: false,
        Rose: false,
        Red: false,
        Green: false,
        Blue: false,
    })

    const category = ref<Record<string, boolean>>({
        Availability: true,
    })

    const categories = ref<Record<string, boolean>>({
        Shirts: false,
        'Polo shirts': false,
        Shoes: false,
        'Best sellers': false,
        'T-shirts': false,
        Jeans: false,
        Jackets: false,
    })

    const setActiveKey = (targetObj: Record<string, boolean>, selectedKey: string) => {
        Object.keys(targetObj).forEach(key => {
            targetObj[key] = key === selectedKey
        });
    }

    const clearActiveKey = () => {
        setActiveKey(colors.value, '');
        setActiveKey(genders.value, '');
        setActiveKey(stackProducts.value, '');
        setActiveKey(categories.value, '');
        setActiveKey(category.value, '');
    }

    const toggleFilter = async (categoryGroup: string, value: string) => {
        if(categoryGroup === "ALL") {
            clearActiveKey();
            setActiveKey(category.value, value);
        }
        if(categoryGroup === 'CATEGORY') {
            clearActiveKey();
            setActiveKey(categories.value, value);
        }
        if(categoryGroup === 'STATUS') {
            clearActiveKey()
            setActiveKey(stackProducts.value, value)
        }else if(categoryGroup === 'GENDER') {
            clearActiveKey()
            setActiveKey(genders.value, value)
        }else if(categoryGroup === 'COLOR') {
            clearActiveKey()
            setActiveKey(colors.value, value)
        }
        await getFilteredProducts(categoryGroup, value)
    };

    const toggleSize = async (categoryGroup: string, value: string) => {
        clearActiveKey()
        await getFilteredProducts(categoryGroup, value)
    }

    return {
        toggleFilter,
        toggleSize,

        category,
        categories,
        stackProducts,
        genders,
        colors
    }
}