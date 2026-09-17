import { handler } from "@/shared/api/http.ts";
import type {CartItem} from "@/features/use-cart/model/cart.types.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetProducts } from "@/features/use-main-product/api/get-product.ts"
import { useDeleteCart } from "@/features/use-cart/api/delete-cart.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { isAgreeFormError } from "@/features/use-product/model/add.to.cart.form.ts";

const { cart } = cartStore();
const { userData } = userStore();
const { orderItems } = orderStore();
const { openNotify } = useBaseModals();
const { getCartProducts } = useGetCart();
const { deleteProductCart } = useDeleteCart();
const { getAllProducts, allProducts } = useGetProducts();

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
            }
            addToOrder(product);

            await getCartProducts();
        }catch(err){
            console.error(`Failed to add the product to order:`, err);
        }
    };

    const addToOrder = (product: CartItem) => {
        const index = orderItems.value.findIndex(
            item => item.id === product.id);
        if(index === -1) {
            orderItems.value.push(product);
            isAgreeFormError.value.agreeMessage = false
            localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
        }else{
            orderItems.value.splice(index, 1);
            localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
        }
    }

    const updateCartItem = async (type: string, id: string) => {
        await getCartProducts();
        await getAllProducts();

        if(!id) return;

        try{
            const product = allProducts.value.find(
                p => p.id === id
            )
            if(!product) {
                console.log('Товар в каталоге не найден')
                return
            }

            const cartItem = cart.value.find(
                c => c.productId === id);
            if(!cartItem) {
                console.log('Товар в корзине не найден')
                return
            }

            const basePrice =  Number(product.price)
            const currentPrice = Number(cartItem.price);

            const currentItem = cartItem.variants[0]
            if(!currentItem) {
                console.log('Варианты товара в корзине не найден')
                return
            }

            const currentQuantity = Number(currentItem.count);

            const stockItem = product.variants.find(
                v => v.hex === currentItem.hex && v.size === currentItem.size)
            if(!stockItem) {
                console.log('Варианты товара каталоге не найден')
                return
            }

            const stock = Number(stockItem.count);

            if(type === 'add'){
                if(currentQuantity < stock){
                    const newPrice = currentPrice + basePrice;
                    const newQuantity = currentQuantity + 1;

                    await handler(`/cart/${product.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            price: newPrice,
                            variants: cartItem.variants.map(item => ({
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
                    await deleteProductCart(cartItem.id);
                }else{
                    const newPrice = currentPrice - basePrice;
                    const newQuantity = currentQuantity - 1;

                    await handler(`/cart/${cartItem.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            price: newPrice,
                            variants: cartItem.variants.map(item => ({
                                ...item,
                                count: newQuantity,
                            })),
                        })
                    });
                }
            }
            await getCartProducts();
        }catch(err){
            console.error(`Failed to update the cart product variants:`, err);
        }
    };

    const updateCartChecked = async () => {
        if(!userData.value) return

        try{
            const allCartItems = await handler(`/cart/${userData.value.id}`, {
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

        const checkedItems = cart.value.filter(
            item => item.checked).map(item => ({ ...item }));

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

                const updatedData = {
                    variants: newQuantityArr,
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