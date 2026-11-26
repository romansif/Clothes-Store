import type { ColorItem, Product } from "@/shared/model";

export type EditImagesPayload = {
  product: Product | null;
  event: Event;
};

export type EditQuantityPayload = {
  product: Product | null;
  color: ColorItem;
  size: string;
  count: string;
};

export type EditColorsPayload = {
  product: Product | null;
  index: number;
  eventOrColor: Event | string;
};
