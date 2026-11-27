import { computed, toValue, type MaybeRefOrGetter } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

import type { ProductVariants } from "@/shared/model";

export const MODES: { code: ProductVariants }[] = [{ code: "SAME" }, { code: "DIFFERENT" }];

export const useProductForm = (countMode: MaybeRefOrGetter<string>) => {
  const GAP = "0.5rem";

  const activeIndex = computed(() =>
    Math.max(
      0,
      MODES.findIndex((m) => m.code === toValue(countMode)),
    ),
  );

  const indicatorStyle = computed(() => ({
    width: `calc((100% - 0.5rem - ${GAP} * ${MODES.length - 1}) / ${MODES.length})`,
    transform: `translateX(calc(${activeIndex.value} * (100% + ${GAP})))`,
  }));

  return {
    indicatorStyle,
    isCreate,
  };
};

export const isCreate = (route: RouteLocationNormalizedLoaded) => {
  return computed(() => route.name === "create/product");
};
