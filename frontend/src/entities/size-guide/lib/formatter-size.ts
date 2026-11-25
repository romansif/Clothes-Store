import { computed, ref } from "vue";
import type { Product, SizeGuide } from "@/shared";

import { productSpecific } from "@/entities/product-form/model/product-specific";

const {
  OUTER_WEAR,
  UNDER_WEAR,
  OUTER_WEAR_SIZE_GUIDE,
  WOMAN_OUTER_WEAR_SIZE_GUIDE,
  UNDER_WEAR_SIZE_GUIDE,
  WOMAN_UNDER_WEAR_SIZE_GUIDE,
  SIZES_SHOES,
  SHOES_SIZE_GUIDE,
  WOMAN_SIZES_SHOES,
  WOMAN_SHOES_SIZE_GUIDE,
} = productSpecific();

export const unit = ref<string>("CM");

const convertSizeToInches = (sizes: SizeGuide[]) => {
  return sizes.map((size) => ({
    ...size,
    values: size.values.map((value) => Math.round(Number(value) / 2.54)),
  }));
};

export const formatterSizeGuide = (product: Product) => {
  const category = product.category;
  const isWomen = product.gender === "Woman";

  const isOuterWear = OUTER_WEAR.includes(category);
  const isUnderWear = UNDER_WEAR.includes(category);

  let guide: SizeGuide[];

  if (isOuterWear) {
    guide = isWomen ? WOMAN_OUTER_WEAR_SIZE_GUIDE : OUTER_WEAR_SIZE_GUIDE;
  } else if (isUnderWear) {
    guide = isWomen ? WOMAN_UNDER_WEAR_SIZE_GUIDE : UNDER_WEAR_SIZE_GUIDE;
  } else {
    guide = isWomen ? WOMAN_SHOES_SIZE_GUIDE : SHOES_SIZE_GUIDE;
  }

  return unit.value === "IN" ? convertSizeToInches(guide) : guide;
};

export const shoesSizes = (product: Product) => {
  return computed(() => (product.gender === "Woman" ? WOMAN_SIZES_SHOES : SIZES_SHOES));
};
