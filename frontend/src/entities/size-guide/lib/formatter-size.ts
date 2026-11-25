import { computed, ref } from "vue";
import type { Product, SizeGuide } from "@/shared";

import { productSpecific } from "@/entities/product-form/model/product-specific";

const {
  outerWear,
  underWear,
  outerwearSizeGuide,
  womenOuterwearSizeGuide,
  underWearSizeGuide,
  womenUnderWearSizeGuide,
  sizesShoes,
  shoesSizeGuide,
  womenSizesShoes,
  womenShoesSizeGuide,
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
  const isWomen = product.gender === "women";

  const isOuterWear = outerWear.includes(category);
  const isUnderWear = underWear.includes(category);

  let guide: SizeGuide[];

  if (isOuterWear) {
    guide = isWomen ? womenOuterwearSizeGuide : outerwearSizeGuide;
  } else if (isUnderWear) {
    guide = isWomen ? womenUnderWearSizeGuide : underWearSizeGuide;
  } else {
    guide = isWomen ? womenShoesSizeGuide : shoesSizeGuide;
  }

  return unit.value === "IN" ? convertSizeToInches(guide) : guide;
};

export const shoesSizes = (product: Product) => {
  return computed(() => (product.gender === "women" ? womenSizesShoes : sizesShoes));
};
