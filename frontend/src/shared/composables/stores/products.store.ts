import { ref } from 'vue'

import xs from '../../../app/assets/icons/size/xs.svg';
import s from '../../../app/assets/icons/size/s.svg';
import m from '../../../app/assets/icons/size/m.svg';
import l from '../../../app/assets/icons/size/l.svg';
import xl from '../../../app/assets/icons/size/xl.svg';
import xxl from '../../../app/assets/icons/size/xxl.svg';

export interface Product {
    id: string,
    userId: string,
    productId: string,
    title: string,
    category: string,
    material: string,
    description: string,
    images: object,
    price: number,
    color: string,
    size: string,
    gender: string,
    quantity: number,
    status: string,
    favorite: boolean,
    checked: boolean,
};

interface Orders {
    id: string,
    userId: string,
    productId: string,
    orderItems: Product[],
    orderTotal: number,
    dateCreatedOrder: string,
    timeCreatedOrder: string,
    status: string
};

interface Sizes {
    name: string,
    url: string,
    class: string,
};

interface Colors {
    name: string,
    color: string,
};

interface Category {
    category: string,
};

interface Material {
    material: string,
};

interface Gender {
    gender: string,
};

const sizes: Sizes[] = [
    {name: 'XS', url: xs, class: 'border-3 border-[#A3A3A3]'},
    {name: 'S', url: s, class: 'border-3 border-[#A3A3A3]'},
    {name: 'M', url: m,class: 'border-3 border-[#A3A3A3]'},
    {name: 'L', url: l, class: 'border-3 border-[#A3A3A3]'} ,
    {name: 'XL', url: xl, class: 'border-3 border-[#A3A3A3]'},
    {name: 'XXL', url: xxl, class: 'border-3 border-[#A3A3A3]'},
];
const colors: Colors[] = [
    {name: 'Black', color: 'bg-black'},
    {name: 'Rose', color: 'bg-rose-950'},
    {name: 'Lime', color: 'bg-lime-900'},
    {name: 'Taupe', color: 'bg-taupe-700'},
    {name: 'Mauve', color: 'bg-mauve-700'},
    {name: 'Olive', color: 'bg-olive-700'},
    {name: 'Violet', color: 'bg-violet-700'},
    {name: 'Red', color: 'bg-red-600'},
    {name: 'Blue', color: 'bg-blue-600'},
    {name: 'Mist', color: 'bg-mist-500'},
    {name: 'Green', color: 'bg-green-500'},
    {name: 'White', color: 'bg-white'},
];
const categories: Category[] = [
    {category: 'Shoes'},
    {category: 'Underpants'},
    {category: 'Shorts'},
    {category: 'Jeans'},
    {category: 'Pants'},
    {category: 'Shirts'},
    {category: 'T-shirts'},
    {category: 'Tank top'},
    {category: 'Sweaters'},
];
const materials: Material[] = [
    {material: 'Cotton'},
    {material: 'Synthetics'},
    {material: 'Wool'},
    {material: 'Flax'},
    {material: 'Polyester'},
    {material: 'Nylon'},
    {material: 'Acrylic'},
    {material: 'Viscose'},
];
const genders: Gender[] = [
    {gender: 'Man'},
    {gender: 'Woman'},
    {gender: 'Kids'},
];

const allProducts = ref<Product[]>([]);
const products = ref<Product[]>([]);
const cart = ref<Product[]>([]);
const favorite = ref<Product[]>([]);
const orders = ref<Orders[]>([]);

const orderItems = ref<Product[]>([]);

const product = ref<Product>({} as Product);
const stack = ref<Product[]>([]);
const outOfStack = ref<Product[]>([]);
const productId = ref<string>(localStorage.getItem("productId") || '');
const items = ref<Product[]>(JSON.parse(localStorage.getItem('orderItems') || '[]'));

const activeProductImg = ref<string>('');

const productFiles = ref<(File | null)[]>([null, null, null, null, null]);
const productsPreview = ref<string[]>([]);
const currentFile = ref<(number | null)>(null);

const unreadCount = ref<number>(0);
const deliveryPrice = ref<number>(0);

export const productsStore = () => {
    return {
        allProducts,
        product,
        stack,
        outOfStack,
        productId,
        items,

        colors,
        sizes,
        categories,
        materials,
        genders,

        products,
        cart,
        favorite,
        orders,

        orderItems,

        activeProductImg,
        productFiles,
        productsPreview,
        currentFile,

        unreadCount,
        deliveryPrice,
    }
}