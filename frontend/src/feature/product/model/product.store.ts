import { ref } from 'vue'
import type { Product, Collection, Gender, Sizes, Material, Category } from "@/entities/products/product.types.ts";

import xs from '@/assets/icons/size/xs.svg';
import s from '@/assets/icons/size/s.svg';
import m from '@/assets/icons/size/m.svg';
import l from '@/assets/icons/size/l.svg';
import xl from '@/assets/icons/size/xl.svg';
import xxl from '@/assets/icons/size/xxl.svg';

const collections: Collection[] = [
    {collection: 'Essence'},
    {collection: 'Silence'},
    {collection: 'Blueprint'},
    {collection: 'Chapter |'},
    {collection: 'Raw'},
    {collection: 'Mono'},
    {collection: 'Grid'},
    {collection: 'Draft'},
    {collection: 'Void'},
    {collection: 'Static'},
]

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

const sizes = ref<Sizes[]>([
    {isActive: false, name: 'XS', url: xs, class: 'border-3 border-[#A3A3A3]'},
    {isActive: false, name: 'S', url: s, class: 'border-3 border-[#A3A3A3]'},
    {isActive: false, name: 'M', url: m, class: 'border-3 border-[#A3A3A3]'},
    {isActive: false, name: 'L', url: l, class: 'border-3 border-[#A3A3A3]'} ,
    {isActive: false, name: 'XL', url: xl, class: 'border-3 border-[#A3A3A3]'},
    {isActive: false, name: 'XXL', url: xxl, class: 'border-3 border-[#A3A3A3]'},
]);

const allProducts = ref<Product[]>([]);
const products = ref<Product[]>([]);

const myProducts = ref<Product[]>([]);

const productsWeek = ref<Product[]>([]);
const productsYear = ref<Product[]>([]);

const newCollections = ref<Product[]>([]);

const product = ref<Product>({} as Product);
const productId = ref<string>(localStorage.getItem("productId") || '');

const activeProductImg = ref<string>('');
const activeIndex = ref<number>();

const productFiles = ref<(File | null)[]>([null, null, null, null, null]);
const productsPreview = ref<string[]>([]);
const currentFile = ref<(number | null)>(null);

export const productStore = () => {
    return {
        allProducts,
        products,
        product,

        productsWeek,
        productsYear,

        newCollections,

        myProducts,

        productId,

        collections,
        categories,
        materials,
        genders,
        sizes,

        activeProductImg,
        activeIndex,
        productFiles,
        productsPreview,
        currentFile
    }
}