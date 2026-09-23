import type {Slide} from "@/shared/model/product.types.ts";

import autumn_slide from "@/assets/photos/home-slides/autumn_slide.png";
import classic_slide from "@/assets/photos/home-slides/classic_slide.png";
import archive_slide from "@/assets/photos/home-slides/archive_slide.png";
import month_slide from "@/assets/photos/main-slides/month-slide.png";
import winter_slide from "@/assets/photos/main-slides/winter_slide.png";

export const homeSlides: Slide[] = [
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

export const mainSlides: Slide[] = [
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
