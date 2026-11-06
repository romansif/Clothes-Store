import { computed, toValue, type MaybeRefOrGetter } from "vue";

import type { ProductVariants } from "@/shared/model/variants-mode";

export const modes: { code: ProductVariants }[] = [{ code: "SAME" }, { code: "DIFFERENT" }];

export const useProductForm = (countMode: MaybeRefOrGetter<string>) => {
  const GAP = "0.5rem";

  const activeIndex = computed(() =>
    Math.max(
      0,
      modes.findIndex((m) => m.code === toValue(countMode)),
    ),
  );

  const indicatorStyle = computed(() => ({
    width: `calc((100% - 0.5rem - ${GAP} * ${modes.length - 1}) / ${modes.length})`,
    transform: `translateX(calc(${activeIndex.value} * (100% + ${GAP})))`,
  }));

  return {
    indicatorStyle,
  };
};
