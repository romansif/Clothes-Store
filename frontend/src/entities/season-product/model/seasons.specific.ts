import type {Catalog} from "@/shared/model/product.types.ts";

import spring_catalog from '@/assets/photos/main-catalogs/spring_catalog.png';
import summer_catalog from '@/assets/photos/main-catalogs/summer_catalog.png';
import autumn_catalog from '@/assets/photos/main-catalogs/autumn_catalog.png';
import winter_catalog from '@/assets/photos/main-catalogs/winter_catalog.png';

export const seasonsCatalog: Catalog[] = [
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