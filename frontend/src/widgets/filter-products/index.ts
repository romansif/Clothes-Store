export { default as AsideFilter } from "./ui/AsideFilter.vue";
export { default as FilterProducts } from "./ui/FilterProducts.vue";
export { default as HeaderFilter } from "./ui/HeaderFilter.vue";

export { activeFilter, yearFilter } from "./model/active-filter";
export { showAvailability, showCategory, showColor, showGender, showPrice } from "./model/filter.refs";
export {
  filterSizeClass,
  filterClass,
  categoryAndCollectionClass,
  sidebarCategoryClass,
  selectedCategoryAndCollectionClass,
  selectedFilterAndSizeClass,
} from "./model/filter-item.variants";
export { filterLabelKey, filterProduct } from "./lib/filter-product";
export { filterAside, toggleFilterAside } from "./lib/product-modal";
export {
  toggleAvailabilityFilter,
  toggleCategoryFilter,
  toggleColorFilter,
  toggleGenderFilter,
  togglePriceFilter,
} from "./lib/show-filter";
