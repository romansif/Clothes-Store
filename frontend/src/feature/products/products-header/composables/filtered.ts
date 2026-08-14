import { ref } from "vue";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";

const { getFilteredProducts } = useProducts();
const { sizes } = productsStore();

export const filtered = () => {
    const selectedGender = ref<string>('ALL');

    const stackProducts = ref<Record<string, boolean>>({
        Availability: false,
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
        ALL: true,
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
        setActiveKey(category.value, '');
        setActiveKey(categories.value, '');
        setActiveKey(stackProducts.value, '');
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
            clearActiveKey();
            setActiveKey(stackProducts.value, value)
        }else if(categoryGroup === 'GENDER') {
            clearActiveKey()
            setActiveKey(genders.value, value)
        }else if(categoryGroup === 'COLOR') {
            clearActiveKey();
            setActiveKey(colors.value, value)
        }
        await getFilteredProducts(categoryGroup, value);

        sizes.value.forEach(s => {
            s.isActive = false
        })
    };

    const toggleSize = async (categoryGroup: string, value: string) => {
        sizes.value.forEach(s => {
            s.isActive = s.name === value;
        })
        clearActiveKey();
        await getFilteredProducts(categoryGroup, value);
    }

    return {
        selectedGender,

        toggleFilter,
        toggleSize,

        category,
        categories,
        stackProducts,
        genders,
        colors
    }
}