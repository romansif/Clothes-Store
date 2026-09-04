import { handler } from "@/shared/api/http.ts";
import type {CartItem} from "@/entities/cart/model/cart.types.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { cartStore } from "@/entities/cart/model/cart.store.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts"
import { useDeleteCart } from "@/features/use-cart/api/delete-cart.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";

const { cart } = cartStore();
const { userData } = userStore();
const { orderItems } = orderStore();
const { getCartProducts } = useGetCart();
const { openNotify } = useBaseModals();
const { getAllProducts } = useGetProduct();
const { deleteProductCart } = useDeleteCart();
const { allProducts, products } = productStore();

export const useUpdateCart = () => {
    const checkCartItem = async (id: string, product: CartItem) => {
        try{
            const productCart = cart.value?.find(
                c => c.id === id);
            if(productCart){
                if(!productCart?.checked){
                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: true
                        })
                    });
                }else{
                    await handler(`/cart/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: false
                        })
                    });
                }

                const index = orderItems.value.findIndex(
                    item => item.id === product.id);
                if(index === -1) {
                    orderItems.value.push(product);
                    localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
                }else{
                    orderItems.value.splice(index, 1);
                    localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
                }
            }
            await getCartProducts();
        }catch(err){
            console.error(`Failed to add the product to order:`, err);
        }
    };

    const updateCartItem = async (type: string, id: string, status: string) => {
        try{
            const productCart = cart.value?.find(
                c => c.id === id);
            const product = products.value?.find(
                p => p.id === productCart?.productId
            );

            if(!productCart || !product) {
                console.log('Товар в корзине или в каталоге не найден')
                return
            }

            const basePrice =  Number(product?.price)
            const currentPrice = Number(productCart?.price);

            const currentItem = productCart?.variants.find(
                p => p.count !== undefined);
            const currentQuantity = Number(currentItem?.count);

            const stockItem = product?.variants.find(
                p => p.hex === currentItem?.hex && p.size === currentItem?.size)
            const stock = Number(stockItem?.count);

            if(status === 'Availability'){
                if(type === 'add'){
                    if(currentQuantity < stock){
                        const newPrice = currentPrice + basePrice;
                        const newQuantity = currentQuantity + 1;

                        await handler(`/cart/${id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                price: newPrice,
                                variants: productCart?.variants.map(item => ({
                                    ...item,
                                    count: newQuantity,
                                })),
                            })
                        });
                    }else{
                        console.warn('Достигнуто максимальное количество товара на складе.');
                        await openNotify('The item is no longer in stock.',
                            'The maximum stock level for the item has been reached.', 'cart')
                        return;
                    }
                }else if(type === 'away') {
                    if(currentQuantity <= 1){
                        await deleteProductCart(id);
                    }else{
                        const newPrice = currentPrice - basePrice;
                        const newQuantity = currentQuantity - 1;

                        await handler(`/cart/${id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                price: newPrice,
                                variants: productCart?.variants.map(item => ({
                                    ...item,
                                    count: newQuantity,
                                })),
                            })
                        });
                    }
                }
            }
            await getCartProducts();
        }catch(err){
            console.error(`Failed to update the cart product variants:`, err);
        }
    };

    const updateCartChecked = async () => {
        try{
            const allCartItems = await handler(`/cart/${userData.id}`, {
                method: "GET"
            });
            for(const item of allCartItems) {
                await handler(`/cart/${item.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        checked: false
                    })
                })
            }
            orderItems.value = [];

            await getCartProducts();
        }catch(err){
            console.error(`Failed to remove the products to status false:`, err);
        }
    };

    const updateCheckedQuantity = async () => {
        await getCartProducts();
        await getAllProducts();

        const checkedItems = cart.value.filter(item => item.checked).map(item => ({ ...item }));

        if (!checkedItems.length) {
            console.log('Нет выбранных (checked) товаров в корзине!', checkedItems);
            return;
        }

        try {
            for(const item of checkedItems){
                await deleteProductCart(item.id);

                const product = allProducts.value?.find(
                    p => p.id === item.productId);
                if (!product) {
                    console.log(`Товар в корзине c id=${item.productId} или в каталоге не найден`);
                    continue;
                }

                const cartObj = item?.variants?.find(
                    p => p.count !== undefined);
                if (!cartObj) {
                    console.log(`У товара ${item.productId} в корзине нет данных о варианте`, item);
                    continue;
                }

                const cartQuantity = Number(cartObj.count);

                const newQuantityArr = product.variants.map(
                    v => {
                        const isSame = v.hex === cartObj.hex && String(v.size) === String(cartObj.size);
                        if (!isSame) return { ...v };

                        return {...v, count: Math.max(0, Number(v.count) - cartQuantity)};
                    }
                );

                const isExhausted = newQuantityArr.every(v => Number(v.count) <= 0);

                const updatedData = {
                    variants: newQuantityArr,
                    status: isExhausted ? 'Exhausted' : product.status
                };

                await handler(`/products/${product.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(updatedData)
                });

                await handler(`/favorites/${product.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(updatedData)
                })
            }

            localStorage.removeItem("ordersItem");
        } catch (err) {
            console.error(`Failed to update the status or variants:`, err);
        }
    };

    return {
        checkCartItem,
        updateCartItem,
        updateCartChecked,
        updateCheckedQuantity
    }
}