import { SIZES } from "@/shared/model";

export const sizeUrl = (sizeName: string) => {
  const target = SIZES.value.find((s) => s.name === sizeName);
  return target ? target.url : "bg-transparent";
};

export const sizeClass = (sizeName: string) => {
  const target = SIZES.value.find((s) => s.name === sizeName);
  return target ? target.class : "bg-transparent";
};
