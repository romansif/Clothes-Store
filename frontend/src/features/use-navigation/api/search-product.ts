import { computed, type Ref } from 'vue';
import { refDebounced } from "@vueuse/core";
import { handler } from "@/shared/api/http";
import { searchProductForm } from "@/features/use-navigation/lib/search.form";
import type { Product } from "@/shared";

export const search = computed(() => searchProductForm.value.search);
export const debouncedSearch = refDebounced(search, 700);

export const getSearchedProducts = async (products: Ref<Product[]>) => {
    try{
        const res = await handler(`/searched?search=${searchProductForm.value.search}`, {
            method: 'GET',
        })

        products.value = res;
    }catch(err){
        console.log('Не удалось получить данные по всем товарам', err);
    }
};

