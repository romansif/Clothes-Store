import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

const springCatalog = ref<Product[]>([]);
const summerCatalog = ref<Product[]>([]);
const autumnCatalog = ref<Product[]>([]);
const winterCatalog = ref<Product[]>([]);

export const useGetSeasonProducts = () => {
    const getSeasonal = async (collection: string) => {
        try{
            const res = await handler(`/products/collections/${collection}`, {
                method: 'GET',
            })

            switch (collection) {
                case "Spring":
                    springCatalog.value = res;
                    break;
                case "Summer":
                    summerCatalog.value = res;
                    break;
                case "Autumn":
                    autumnCatalog.value = res;
                    break;
                case "Winter":
                    winterCatalog.value = res;
                    break;
            }

            console.log(autumnCatalog.value);
        }catch(err){
            console.error(`Failed to get the season products:`, err);
        }
    };

    return {
        getSeasonal,
        springCatalog,
        summerCatalog,
        autumnCatalog,
        winterCatalog,
    }
}