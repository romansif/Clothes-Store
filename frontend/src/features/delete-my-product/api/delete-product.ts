import { handler } from "@/shared/api/http";
import { useGetProducts } from "@/features/products/api/get-product";

const { getFilteredProducts } = useGetProducts();

export const deleteProduct = async (id: string) => {
    try{
        await handler(`/products/${id}`, {
            method: "DELETE",
        });
        await getFilteredProducts('ALL', 'ALL');
    }catch(err){
        console.error(`Failed to delete the product:`, err);
    }
};

