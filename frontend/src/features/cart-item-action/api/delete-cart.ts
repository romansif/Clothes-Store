import { handler } from "@/shared/api/http";
import { getCartProducts } from "@/widgets/cart-list/api/get-cart";

export const deleteProductCart = async (id: string) => {
    try{
        await handler(`/cart/${id}`, {
                method: "DELETE",
        });
        await getCartProducts();
    }catch(err){
        console.error(`Failed to delete the cart product:`, err);
    }
};


