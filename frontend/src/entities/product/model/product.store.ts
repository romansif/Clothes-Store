import {ref} from 'vue'
import type {
    Product,
    Collection,
    Gender,
    Size,
    Material,
    Category,
    SizeGuide,
    SizesShoes,
    Slide,
} from "@/entities/product/model/product.types.ts";

import xs from '@/assets/icons/size/xs.svg';
import s from '@/assets/icons/size/s.svg';
import m from '@/assets/icons/size/m.svg';
import l from '@/assets/icons/size/l.svg';
import xl from '@/assets/icons/size/xl.svg';
import xxl from '@/assets/icons/size/xxl.svg';

import autumn from '@/assets/photos/home-slides/autumn.jpg';
import classic from '@/assets/photos/home-slides/classic.jpg';
import winter from '@/assets/photos/main-slides/winter.png';
import month from '@/assets/photos/main-slides/month.png';
import archive from '@/assets/photos/main-slides/archive.png';

const collections: Collection[] = [
    {season: 'Spring', condition: 'New', name: 'Essence'},
    {season: 'Autumn', condition: 'Old', name: 'Silence'},
    {season: 'Summer', condition: 'New', name: 'Blueprint'},
    {season: 'Autumn', condition: 'Old', name: 'Chapter |'},
    {season: 'Summer', condition: 'New', name: 'Raw'},
    {season: 'Winter', condition: 'Old', name: 'Mono'},
    {season: 'Spring', condition: 'New', name: 'Grid'},
    {season: 'Autumn', condition: 'Old', name: 'Draft'},
    {season: 'Winter', condition: 'Old', name: 'Void'},
    {season: 'Spring', condition: 'New', name: 'Static'},
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
    {gender: 'Unisex'},
    {gender: 'Man'},
    {gender: 'Woman'},
    {gender: 'Kids'},
];

const sizes = ref<Size[]>([
    {isActive: false, name: 'XS', url: xs, class: 'border-3 border-[#A3A3A3] rounded-full'},
    {isActive: false, name: 'S', url: s, class: 'border-3 border-[#A3A3A3] rounded-full'},
    {isActive: false, name: 'M', url: m, class: 'border-3 border-[#A3A3A3] rounded-full'},
    {isActive: false, name: 'L', url: l, class: 'border-3 border-[#A3A3A3] rounded-full'} ,
    {isActive: false, name: 'XL', url: xl, class: 'border-3 border-[#A3A3A3] rounded-full'},
    {isActive: false, name: 'XXL', url: xxl, class: 'border-3 border-[#A3A3A3] rounded-full'},
]);

const sizesShoes: SizesShoes[] = [
    {name: '39'},
    {name: '40'},
    {name: '41'},
    {name: '42'},
    {name: '43'},
    {name: '44'},
    {name: '45'},
    {name: '46'},
];

const outerwearSizeGuide: SizeGuide[] = [
    {name: 'Heigh', values: ['163', '168', '173', '178', '183', '188']},
    {name: 'Chest', values: ['86', '92', '98', '104', '110', '116']},
    {name: 'Waist', values: ['68', '72', '78', '84', '90', '96']},
    {name: 'Length', values: ['64', '66', '68', '70', '72', '74']},
];

const underWearSizeGuide: SizeGuide[] = [
    {name: 'Heigh', values: ['163', '168', '173', '178', '183', '188']},
    {name: 'Waist', values: ['66', '70', '76', '81', '87', '94']},
    {name: 'Hips', values: ['90', '94', '99', '105', '111', '119']},
    {name: 'Waist', values: ['77', '80', '82', '84', '86', '88']},
];

const shoesSizeGuide: SizeGuide[] = [
    {name: 'Length', values: ['25', '25.7', '26.3', '27', '27.7', '28.3', '29', '29.7']}
];

const homeSlides: Slide[] = [
    {
        id: 1,
        title: 'AUTUMN',
        title1: 'SELECTION',
        text:`The new season has arrived. 
        Timeless pieces designed for colder days.`,
        routeText: 'Discover autumn selection',
        routeName: 'shop/seasonal-collections',
        url: autumn
    },
    {
        id: 2,
        title: 'CLASSIC',
        title1: 'SERIES',
        text:`Timeless pieces from our previous collections.
        Minimalist designs that never go out of style.`,
        routeText: 'Explore classics',
        routeName: 'shop/new-collections',
        url: classic
    },
    {
        id: 3,
        title: 'PAST',
        title1: 'HERITAGE',
        text:`Explore selected pieces from our previous collections.
        Some pieces may not return.`,
        routeText: 'Shop past heritage',
        routeName: 'shop',
        url: archive
    },
];

const mainSlides: Slide[] = [
    {
        id: 1,
        title: `THIS MONTH'S DROP`,
        text:`Fresh arrivals crafted with modern silhouettes for your everyday rotation.`,
        url: month
    },
    {
        id: 2,
        title: `WINTER PRELUDE`,
        text:`Temperatures are dropping. Gear up for the cold season with warmth from The Noir.`,
        url: winter
    },
    {
        id: 3,
        title: `ARCHIVE`,
        text:`Explore selected pieces from previous collections. Once gone, they will not return.`,
        url: archive
    },
]

const outerWear = [
    'Shirts',
    'T-shirts',
    'Tank top',
    'Sweaters',
];

const underWear = [
    'Underpants',
    'Shorts',
    'Jeans',
    'Pants',
];

const allProducts = ref<Product[]>([]);
const products = ref<Product[]>([]);

const myProducts = ref<Product[]>([]);

const productsWeek = ref<Product[]>([]);
const productsYear = ref<Product[]>([]);

const seasonalSelections = ref<Product[]>([]);

const product = ref<Product>(JSON.parse(localStorage.getItem('product')!))

const productId = ref<string>(localStorage.getItem("productId") || '');

const activeProductImg = ref<string>('');
const activeIndex = ref<number>();

const productFiles = ref<(File | null)[]>([null, null, null, null, null]);
const productsPreview = ref<string[]>([]);
const currentFile = ref<(number | null)>(null);

const unit = ref<string>('CM')

export const productStore = () => {
    return {
        allProducts,
        products,
        product,

        productsWeek,
        productsYear,

        seasonalSelections,

        myProducts,

        productId,

        collections,
        categories,
        materials,
        genders,
        sizes,
        sizesShoes,

        homeSlides,
        mainSlides,

        outerwearSizeGuide,
        underWearSizeGuide,
        shoesSizeGuide,

        outerWear,
        underWear,

        activeProductImg,
        activeIndex,
        productFiles,
        productsPreview,
        currentFile,

        unit
    }
}