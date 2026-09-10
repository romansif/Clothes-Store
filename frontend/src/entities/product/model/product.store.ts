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
    Catalog
} from "@/entities/product/model/product.types.ts";

import xs from '@/assets/icons/size/xs.svg';
import s from '@/assets/icons/size/s.svg';
import m from '@/assets/icons/size/m.svg';
import l from '@/assets/icons/size/l.svg';
import xl from '@/assets/icons/size/xl.svg';
import xxl from '@/assets/icons/size/xxl.svg';

import autumn_slide from '@/assets/photos/home-slides/autumn_slide.png';
import classic_slide from '@/assets/photos/home-slides/classic_slide.png';
import winter_slide from '@/assets/photos/main-slides/winter_slide.png';
import month_slide from '@/assets/photos/main-slides/month-slide.png';
import archive_slide from '@/assets/photos/home-slides/archive_slide.png';

import spring_catalog from '@/assets/photos/main-catalogs/spring_catalog.png';
import summer_catalog from '@/assets/photos/main-catalogs/summer_catalog.png';
import autumn_catalog from '@/assets/photos/main-catalogs/autumn_catalog.png';
import winter_catalog from '@/assets/photos/main-catalogs/winter_catalog.png';

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
    {isActive: false, name: 'XS', url: xs, class: 'border-2 border-[#A3A3A3]'},
    {isActive: false, name: 'S', url: s, class: 'border-2 border-[#A3A3A3]'},
    {isActive: false, name: 'M', url: m, class: 'border-2 border-[#A3A3A3]'},
    {isActive: false, name: 'L', url: l, class: 'border-2 border-[#A3A3A3]'} ,
    {isActive: false, name: 'XL', url: xl, class: 'border-2 border-[#A3A3A3]'},
    {isActive: false, name: 'XXL', url: xxl, class: 'border-2 border-[#A3A3A3]'},
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
        text:`The new season has arrived. Timeless pieces designed for colder days.`,
        routeText: 'Discover autumn selection',
        routeName: 'shop/autumn-catalog',
        url: autumn_slide
    },
    {
        id: 2,
        title: 'CLASSIC',
        title1: 'SERIES',
        text:`Timeless pieces from our previous collections. Minimalist designs that never go out of style.`,
        routeText: 'Explore classics',
        routeName: 'shop/new-collections',
        url: classic_slide
    },
    {
        id: 3,
        title: 'PAST',
        title1: 'HERITAGE',
        text:`Explore selected pieces from our previous collections. Some pieces may not return.`,
        routeText: 'Shop past heritage',
        routeName: 'shop',
        url: archive_slide
    },
];

const mainSlides: Slide[] = [
    {
        id: 1,
        title: `THIS MONTH'S DROP`,
        text:`Fresh arrivals crafted with modern silhouettes for your everyday rotation.`,
        url: month_slide
    },
    {
        id: 2,
        title: `WINTER PRELUDE`,
        text:`Temperatures are dropping. Gear up for the cold season with warmth from The Noir.`,
        url: winter_slide
    },
    {
        id: 3,
        title: `ARCHIVE`,
        text:`Explore selected pieces from previous collections. Once gone, they will not return.`,
        url: archive_slide
    },
];

const seasonsCatalog: Catalog[] = [
    {
        id: '01',
        name: 'Spring',
        title: `SPRING`,
        text: `Light layers, fresh colors and new energy.`,
        slogan: 'LIGHT LAYERS',
        route: 'shop/spring-catalog',
        url: spring_catalog,
    },
    {
        id: '02',
        name: 'Summer',
        title: `SUMMER`,
        text: `Breathable fabrics and minimal designs.`,
        slogan: 'BREATHABLE',
        route: 'shop/summer-catalog',
        url: summer_catalog,
    },
    {
        id: '03',
        name: 'Autumn',
        title: `AUTUMN`,
        text: `Warm tones, rich textures and effortless style.`,
        slogan: 'WARM TONES',
        route: 'shop/autumn-catalog',
        url: autumn_catalog,
    },
    {
        id: '04',
        name: 'Winter',
        title: `WINTER`,
        text: `Maximum warmth. Minimal effort.`,
        slogan: 'MINIMAL EFFORT',
        route: 'shop/winter-catalog',
        url: winter_catalog,
    }
];

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

const springCatalog = ref<Product[]>([]);
const summerCatalog = ref<Product[]>([]);
const autumnCatalog = ref<Product[]>([]);
const winterCatalog = ref<Product[]>([]);

const product = ref<Product>(JSON.parse(localStorage.getItem('product')!))

const productId = ref<string>(localStorage.getItem("productId") || '');

const activeProductImg = ref<string>('');
const activeIndex = ref<number>();

const productFiles = ref<(File | null)[]>([null, null, null, null, null]);
const productsPreview = ref<string[]>([]);
const currentFile = ref<(number | null)>(null);

const unit = ref<string>('CM')
const countMode = ref<string>('SAME')

const skuMask = {
    mask: '***-**-***',
    definitions: {
        '*': /[a-zA-Z0-9]/
    }
};

export const productStore = () => {
    return {
        allProducts,
        products,
        product,

        productsWeek,
        productsYear,

        springCatalog,
        summerCatalog,
        autumnCatalog,
        winterCatalog,

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
        seasonsCatalog,

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

        unit,
        countMode,
        skuMask
    }
}