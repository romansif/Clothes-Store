import { sizes } from "@/shared/model/product.sizes.ts";

export const sizeUrl = (sizeName: string) => {
    const target = sizes.value.find(s => s.name === sizeName);
    return target ? target.url : 'bg-transparent';
};

export const sizeClass = (sizeName: string) => {
    const target = sizes.value.find(s => s.name === sizeName);
    return target ? target.class : 'bg-transparent';
};