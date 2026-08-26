import { ref } from "vue";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { productStore } from "@/entities/product/model/product.store.ts";

const { sizes } = productStore();
const { getFilteredProducts, getWeekProducts, getYearProducts, getNewCollections } = productApi();

export const filterProduct = () => {
    const selectedGender = ref<string>('ALL');

    const activeSlide = ref<number>(0);

    const collections = ref<Record<string, boolean>>({
        Raw: false,
        Mono: false,
        Grid: false,
        Void: false,
        Draft: false,
        Static: false,
        Essence: false,
        Silence: false,
        Blueprint: false,
        'Chapter |': false,
    });


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
        Khaki: false,
        Black: false,
        Mazarine: false,
        Beige: false,
        Burgundy: false,
    })

    const category = ref<Record<string, boolean>>({
        ALL: true,
    })

    const categories = ref<Record<string, boolean>>({
        Shirts: false,
        Shoes: false,
        Jeans: false,
        Jackets: false,
        'T-shirts': false,
        'Polo shirts': false,
        'Best sellers': false,
    })

    const setActiveKey = (targetObj: Record<string, boolean>, selectedKey: string) => {
        Object.keys(targetObj).forEach(key => {
            targetObj[key] = key === selectedKey
        });
    }

    const clearActiveKey = () => {
        setActiveKey(collections.value, '');
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
        if(categoryGroup === 'COLLECTION'){
            clearActiveKey();
            setActiveKey(collections.value, value);
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

        if(categoryGroup === 'COLLECTION') {
            await getNewCollections(value)
        }else{
            await getFilteredProducts(categoryGroup, value);
            await getWeekProducts(categoryGroup, value)
            await getYearProducts(categoryGroup, value)
        }

        sizes.value.forEach(s => {
            s.isActive = false
        })
    };

    const selectGender = async (type: string, filter: string) => {
        selectedGender.value = filter;

        console.log(selectedGender.value)

        await getYearProducts(type, filter);
    }

    const toggleSize = async (categoryGroup: string, value: string) => {
        sizes.value.forEach(s => {
            s.isActive = s.name === value;
        })
        clearActiveKey();
        await getFilteredProducts(categoryGroup, value);
    }

    return {
        selectedGender,
        activeSlide,

        toggleFilter,
        selectGender,
        toggleSize,

        collections,
        category,
        categories,
        stackProducts,
        genders,
        colors
    }
}