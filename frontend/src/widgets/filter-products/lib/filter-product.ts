import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { activeFilter, yearFilter } from "@/widgets/filter-products/model/active-filter";
import { clearSearchProductForm } from "@/features/search-product/lib/clear-search";
import { sizes } from "@/shared/model/product-sizes";
import type { Product } from "@/shared";

const FILTER_LABEL_KEYS: Record<string, string> = {
  Man: "genders.man",
  Woman: "genders.woman",
  Kids: "genders.kids",
  White: "colors.white",
  Khaki: "colors.khaki",
  Black: "colors.black",
  Mazarine: "colors.mazarine",
  Beige: "colors.beige",
  Burgundy: "colors.burgundy",
  Shirts: "categories.shirts",
  Shoes: "categories.shoes",
  Jeans: "categories.jeans",
  Jackets: "categories.jackets",
  "T-shirts": "categories.tShirts",
  "Polo shirts": "categories.poloShirts",
  "Best sellers": "categories.bestSellers",
  Availability: "stock.availability",
  Exhausted: "stock.exhausted",
};

const PRICE_RANGES: Record<string, { min?: number; max?: number }> = {
  "$ 200": { max: 200 },
  "$ 200 - 500": { min: 200, max: 500 },
  "$ 500 - 1000": { min: 500, max: 1000 },
  "$ 1000": { min: 1000 },
};

export const filterLabelKey = (name: string) => FILTER_LABEL_KEYS[name] ?? name;

export const filterProduct = () => {
  const { t } = useI18n()

  const priceLabels: Record<string, () => string> = {
    "$ 200": () => t("prices.toPrice", { price: `200 ${t("prices.sum")}` }),
    "$ 200 - 500": () => `${t("prices.from")} 200 ${t("prices.to")} 500 ${t("prices.sum")}`,
    "$ 500 - 1000": () => `${t("prices.from")} 500 ${t("prices.to")} 1000 ${t("prices.sum")}`,
    "$ 1000": () => t("prices.over", { price: `1000 ${t("prices.sum")}` }),
  };

  const priceLabel = (name: string) => priceLabels[name]?.() ?? name;

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

  const prices = ref<Record<string, boolean>>({
    '$ 200': false,
    '$ 200 - 500': false,
    '$ 500 - 1000': false,
    '$ 1000': false
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
      PRICE: prices.value
    };

    clearActiveKey();
    if (groups[categoryGroup]) setActiveKey(groups[categoryGroup], value);

    clearSearchProductForm();
    activeFilter.value = { type: categoryGroup, value };
    yearFilter.value = { type: categoryGroup, value };
    selectedGender.value = value;
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

    const range = PRICE_RANGES[stackName];
    if (range) {
      return products.filter(
          (p) =>
              (range.min === undefined || p.price >= range.min) &&
              (range.max === undefined || p.price <= range.max),
      ).length;
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
    priceLabel,

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
    prices
  };
};
