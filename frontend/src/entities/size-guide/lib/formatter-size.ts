import { ref } from "vue";
import type { Product, SizeGuide } from "@/shared";

import { productSpecific } from "@/entities/product-form/model/product-specific";

const { outerWear, underWear, outerwearSizeGuide, underWearSizeGuide, shoesSizeGuide } =
    productSpecific();

export const unit = ref<string>("CM");

const convertSizeToInches = (sizes: SizeGuide[]) => {
    return sizes.map((size) => ({
        ...size,
        values: size.values.map((value) => Math.round(Number(value) / 2.54)),
    }));
};

export const formatterSizeGuide = (product: Product) => {
    const category = product.category;

    const isOuterWear = outerWear.includes(category);
    const isUnderWear = underWear.includes(category);

    if (isOuterWear) {
        return unit.value === "IN" ? convertSizeToInches(outerwearSizeGuide) : outerwearSizeGuide;
    } else if (isUnderWear) {
        return unit.value === "IN" ? convertSizeToInches(underWearSizeGuide) : underWearSizeGuide;
    }
    return unit.value === "IN" ? convertSizeToInches(shoesSizeGuide) : shoesSizeGuide;
};
