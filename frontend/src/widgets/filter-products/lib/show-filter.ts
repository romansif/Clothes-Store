import {
    showAvailability,
    showCategory,
    showColor,
    showGender,
} from "@/widgets/filter-products/model/filter.refs";

export const toggleAvailabilityFilter = () => {
    showAvailability.value = !showAvailability.value;
};

export const toggleGenderFilter = () => {
    showGender.value = !showGender.value;
};

export const toggleColorFilter = () => {
    showColor.value = !showColor.value;
};

export const toggleCategoryFilter = () => {
    showCategory.value = !showCategory.value;
};
