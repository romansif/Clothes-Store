import { handler } from "@/shared/api/http.ts";
import { useGetProducts } from "@/features/use-all-product/api/get-product.ts";

const { getFilteredProducts } = useGetProducts();

export const useDeleteProduct = () => {
    const deleteProduct = async (id: string) => {
        try{
            await handler(`/products/${id}`, {
                method: "DELETE",
            });
            await getFilteredProducts('ALL', 'ALL');
            window.location.reload();
        }catch(err){
            console.error(`Failed to delete the product:`, err);
        }
    };

    return {
        deleteProduct,
    }
}