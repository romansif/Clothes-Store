import { ref } from 'vue'
import type {Size} from "@/shared/model/product.types.ts";

import xs from "@/assets/icons/size/xs.svg";
import s from "@/assets/icons/size/s.svg";
import m from "@/assets/icons/size/m.svg";
import l from "@/assets/icons/size/l.svg";
import xl from "@/assets/icons/size/xl.svg";
import xxl from "@/assets/icons/size/xxl.svg";

const sizes = ref<Size[]>([
    {isActive: false, name: 'XS', url: xs, class: 'border-2 border-[#A3A3A3]'},
    {isActive: false, name: 'S', url: s, class: 'border-2 border-[#A3A3A3]'},
    {isActive: false, name: 'M', url: m, class: 'border-2 border-[#A3A3A3]'},
    {isActive: false, name: 'L', url: l, class: 'border-2 border-[#A3A3A3]'} ,
    {isActive: false, name: 'XL', url: xl, class: 'border-2 border-[#A3A3A3]'},
    {isActive: false, name: 'XXL', url: xxl, class: 'border-2 border-[#A3A3A3]'},
]);

const productId = ref<string>(localStorage.getItem("productId") || '');


export const productStore = () => {
    return {
        sizes,
        productId,
    }
}