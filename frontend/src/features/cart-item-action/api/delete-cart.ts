import { handler } from "@/shared/api/http";

export const deleteProductCart = async (id: string) => {
    try{
        await handler(`/cart/${id}`, {
                method: "DELETE",
        });
    }catch(err){
        console.error(`Failed to delete the cart product:`, err);
    }
};


