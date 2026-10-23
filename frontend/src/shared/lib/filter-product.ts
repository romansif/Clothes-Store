import { ref } from "vue";
import { sizes } from "@/shared/model/product-sizes";
import { useGetProducts } from "@/features/products/api/get-product";
import { useGetWeekProduct } from "@/widgets/week-list/api/get-week-product";
import { useGetYearProduct } from "@/widgets/year-list/api/get-year-product";
import { useGetSeasonProducts } from "@/widgets/season-list/api/get-season-product";

const { allProducts } = useGetProducts();
const { getFilteredProducts } = useGetProducts();
const { getWeekProducts } = useGetWeekProduct();
const { getYearProducts } = useGetYearProduct();
const { getSeasonal } = useGetSeasonProducts();

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
            await getSeasonal(value)
        }else{
            await getFilteredProducts(categoryGroup, value);
            await getWeekProducts(categoryGroup, value)
            await getYearProducts(categoryGroup, value)
        }

        sizes.value.forEach(s => {
            s.isActive = false
        })
    };

    const getStackCount = (stackName: string) => {
        if (stackName === 'Availability') {
            return allProducts.value.filter(p =>
                p.variants.some(v => v.count > 0)).length;
        }

        if (stackName === 'Exhausted') {
            return allProducts.value.filter(p =>
                p.variants.every(v => v.count === 0)).length;
        }
    };

    const selectGender = async (type: string, filter: string) => {
        selectedGender.value = filter;
        clearActiveKey();
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
        getStackCount,
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