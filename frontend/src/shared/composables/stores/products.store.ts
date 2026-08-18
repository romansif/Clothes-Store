import { ref } from 'vue'

import xs from '../../../app/assets/icons/size/xs.svg';
import s from '../../../app/assets/icons/size/s.svg';
import m from '../../../app/assets/icons/size/m.svg';
import l from '../../../app/assets/icons/size/l.svg';
import xl from '../../../app/assets/icons/size/xl.svg';
import xxl from '../../../app/assets/icons/size/xxl.svg';

export interface ColorItem {
    hex: string,
    colorName: string,
}

export interface ImageItem {
    url: string,
}

export interface Product {
    product: any;
    id: string,
    userId: string,
    productId: string,
    title: string,
    category: string,
    material: string,
    description: string,
    images: ImageItem[],
    price: number,
    colors: ColorItem[],
    sizes: string,
    gender: string,
    quantity: number,
    status: string,
    favorite: boolean,
    checked: boolean,
    collections: string,
    created_at: string,
}

interface Orders {
    id: string,
    userId: string,
    productId: string,
    orderItems: Product[],
    orderTotal: number,
    delivery: string,
    created_at: string,
    date_created_at: string,
    time_created_at: string,
    cancelled_at: string,
    date_cancelled_at: string,
    time_cancelled_at: string,
    status: string
}

interface Sizes {
    isActive?: boolean,
    name: string,
    url: string,
    class: string,
}

interface Category {
    category: string,
}

interface Material {
    material: string,
}

interface Gender {
    gender: string,
}

const sizes = ref<Sizes[]>([
    {isActive: false, name: 'XS', url: xs, class: 'border-3 border-[#A3A3A3]'},
    {isActive: false, name: 'S', url: s, class: 'border-3 border-[#A3A3A3]'},
    {isActive: false, name: 'M', url: m, class: 'border-3 border-[#A3A3A3]'},
    {isActive: false, name: 'L', url: l, class: 'border-3 border-[#A3A3A3]'} ,
    {isActive: false, name: 'XL', url: xl, class: 'border-3 border-[#A3A3A3]'},
    {isActive: false, name: 'XXL', url: xxl, class: 'border-3 border-[#A3A3A3]'},
]);

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

const myProducts = ref<Product[]>([]);

const productsWeek = ref<Product[]>([]);
const productsYear = ref<Product[]>([]);

const cart = ref<Product[]>([]);

const favorite = ref<Product[]>([]);

const orders = ref<Orders[]>([]);

const orderItems = ref<Product[]>([]);

const product = ref<Product>({} as Product);
const productId = ref<string>(localStorage.getItem("productId") || '');
const items = ref<Product[]>(JSON.parse(localStorage.getItem('orderItems') || '[]'));

const activeProductImg = ref<string>('');
const activeIndex = ref<number>();

const productFiles = ref<(File | null)[]>([null, null, null, null, null]);
const productsPreview = ref<string[]>([]);
const currentFile = ref<(number | null)>(null);

const unreadCount = ref<number>(0);
const deliveryPrice = ref<number>(0);

export const productsStore = () => {
    return {
        allProducts,
        product,

        productsWeek,
        productsYear,

        myProducts,

        productId,
        items,

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
        activeIndex,
        productFiles,
        productsPreview,
        currentFile,

        unreadCount,
        deliveryPrice,
    }
}