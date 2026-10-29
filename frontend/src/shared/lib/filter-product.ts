import { ref } from "vue";
import { sizes } from "@/shared/model/product-sizes";
import { activeFilter, yearFilter } from "@/features/filter-products/model/active-filter";
import { clearSearchProductForm } from "@/features/search-product/lib/clear-search";
import type { Product } from "@/shared";

export const filterProduct = () => {
    const selectedGender = ref<string>("ALL");

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
        "Chapter |": false,
    });

    const stackProducts = ref<Record<string, boolean>>({
        Availability: false,
        Exhausted: false,
    });

    const genders = ref<Record<string, boolean>>({
        Man: false,
        Woman: false,
        Kids: false,
    });

    const colors = ref<Record<string, boolean>>({
        White: false,
        Khaki: false,
        Black: false,
        Mazarine: false,
        Beige: false,
        Burgundy: false,
    });

    const category = ref<Record<string, boolean>>({
        ALL: true,
    });

    const categories = ref<Record<string, boolean>>({
        Shirts: false,
        Shoes: false,
        Jeans: false,
        Jackets: false,
        "T-shirts": false,
        "Polo shirts": false,
        "Best sellers": false,
    });

    const setActiveKey = (targetObj: Record<string, boolean>, selectedKey: string) => {
        Object.keys(targetObj).forEach((key) => {
            targetObj[key] = key === selectedKey;
        });
    };

    const clearActiveKey = () => {
        setActiveKey(collections.value, "");
        setActiveKey(colors.value, "");
        setActiveKey(genders.value, "");
        setActiveKey(category.value, "");
        setActiveKey(categories.value, "");
        setActiveKey(stackProducts.value, "");
    };

    const toggleFilter = (categoryGroup: string, value: string) => {
        const groups: Record<string, Record<string, boolean>> = {
            ALL: category.value,
            COLLECTION: collections.value,
            CATEGORY: categories.value,
            STATUS: stackProducts.value,
            GENDER: genders.value,
            COLOR: colors.value,
        };

        clearActiveKey();
        if (groups[categoryGroup]) setActiveKey(groups[categoryGroup], value);

        clearSearchProductForm();
        activeFilter.value = { type: categoryGroup, value };
        yearFilter.value = { type: categoryGroup, value };
        sizes.value.forEach((s) => {
            s.isActive = false;
        });
    };

    const getStackCount = (products: Product[], stackName: string) => {
        if (stackName === "Availability") {
            return products.filter((p) => p.variants.some((v) => v.count > 0)).length;
        }

        if (stackName === "Exhausted") {
            return products.filter((p) => p.variants.every((v) => v.count === 0)).length;
        }
    };

    const selectGender = (type: string, filter: string) => {
        selectedGender.value = filter;
        clearActiveKey();
        yearFilter.value = { type, value: filter };
    };

    const toggleSize = (categoryGroup: string, value: string) => {
        sizes.value.forEach((s) => {
            s.isActive = s.name === value;
        });
        clearActiveKey();
        clearSearchProductForm();
        activeFilter.value = { type: categoryGroup, value };
    };

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
        colors,
    };
};
