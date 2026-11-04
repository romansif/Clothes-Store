import autumn_catalog from "@/assets/photos/season-catalogs/autumn_catalog.png";
import spring_catalog from "@/assets/photos/season-catalogs/spring_catalog.png";
import summer_catalog from "@/assets/photos/season-catalogs/summer_catalog.png";
import winter_catalog from "@/assets/photos/season-catalogs/winter_catalog.png";
import type { Catalog } from "@/shared";

export const seasonsCatalog: Catalog[] = [
  {
    id: "seasons.spring.id",
    name: "seasons.spring.name",
    title: "seasons.spring.title",
    text: "seasons.spring.text",
    slogan: "seasons.spring.slogan",
    route: "shop/spring-catalog",
    url: spring_catalog,
  },
  {
    id: "seasons.summer.id",
    name: "seasons.summer.name",
    title: "seasons.summer.title",
    text: "seasons.summer.text",
    slogan: "seasons.summer.slogan",
    route: "shop/summer-catalog",
    url: summer_catalog,
  },
  {
    id: "seasons.autumn.id",
    name: "seasons.autumn.name",
    title: "seasons.autumn.title",
    text: "seasons.autumn.text",
    slogan: "seasons.autumn.slogan",
    route: "shop/autumn-catalog",
    url: autumn_catalog,
  },
  {
    id: "seasons.winter.id",
    name: "seasons.winter.name",
    title: "seasons.winter.title",
    text: "seasons.winter.text",
    slogan: "seasons.winter.slogan",
    route: "shop/winter-catalog",
    url: winter_catalog,
  },
];
