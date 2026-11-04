import archive_slide from "@/assets/photos/home-slides/archive_slide.png";
import autumn_slide from "@/assets/photos/home-slides/autumn_slide.png";
import classic_slide from "@/assets/photos/home-slides/classic_slide.png";
import month_slide from "@/assets/photos/main-slides/month-slide.png";
import winter_slide from "@/assets/photos/main-slides/winter_slide.png";
import type { Slide } from "@/shared";

export const homeSlides: Slide[] = [
  {
    id: 1,
    title: "home.slides.autumn.title",
    title1: "home.slides.autumn.title1",
    text: "home.slides.autumn.text",
    routeText: "home.slides.autumn.route",
    routeName: "shop/autumn-catalog",
    url: autumn_slide,
  },
  {
    id: 2,
    title: "home.slides.classic.title",
    title1: "home.slides.classic.title1",
    text: "home.slides.classic.text",
    routeText: "home.slides.classic.route",
    routeName: "shop/new-collections",
    url: classic_slide,
  },
  {
    id: 3,
    title: "home.slides.past.title",
    title1: "home.slides.past.title1",
    text: "home.slides.past.text",
    routeText: "home.slides.past.route",
    routeName: "shop",
    url: archive_slide,
  },
];

export const mainSlides: Slide[] = [
  {
    id: 1,
    title: "home.slides.month.title",
    text: "home.slides.month.text",
    url: month_slide,
  },
  {
    id: 2,
    title: "home.slides.winter.title",
    text: "home.slides.winter.text",
    url: winter_slide,
  },
  {
    id: 3,
    title: "home.slides.archive.title",
    text: "home.slides.archive.text",
    url: archive_slide,
  },
];