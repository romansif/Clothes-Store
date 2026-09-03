import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";
import { clearAddToCartForm } from "@/features/use-cart/lib/clear.cart.ts";
import { cartStore } from "@/entities/cart/model/cart.store.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import type {CartItem} from "@/entities/cart/model/cart.types.ts";

const { userData } = userStore();
const { orderItems } = orderStore();
const { cartForm } = addToCartForm();
const { openNotify } = useBaseModals();
const { getAllProducts } = productApi();
const { cart, unreadCount } = cartStore();
const { addToCartErrors } = useFormsErrors();
const { clearCartForm } = clearAddToCartForm();
const { allProducts, products, product } = productStore();

export const cartApi = () => {
    const getCartProducts = async () => {
        try{
            const res = await handler(`/cart/${userData.id}`, {
                method: 'GET',
            })
            console.log(res);
            cart.value = res;
        }catch(err){
            console.error(`Failed to get the cart products:`, err);
        }
    };

    const addToCart = async () => {
        try{
            const currentProduct = product.value;
            const currentQuantity = product.value.quantity.find(
                q => q.hex === cartForm.value.colors.hex);

            const newProductCart = await handler(`/cart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
                    productId: currentProduct.id,
                    images: currentProduct.images,
                    title: currentProduct.title,
                    category: currentProduct.category,
                    material: currentProduct.material,
                    price: currentProduct.price,
                    description: currentProduct.description,
                    colors: [{
                        hex: cartForm.value.colors.hex,
                        colorName: cartForm.value.colors.colorName
                    }],
                    sizes: cartForm.value.sizes,
                    gender: currentProduct.gender,
                    quantity: [{
                        hex: currentQuantity?.hex,
                        colorName: currentQuantity?.colorName,
                        size: cartForm.value.sizes,
                        count: 1
                    }],
                    status: currentProduct.status,
                    checked: false,
                })
            });
            console.log('New Cart item', newProductCart);
            cart.value = newProductCart;

            unreadCount.value += 1;

            await getCartProducts();

            clearCartForm();

            await openNotify('You have successfully added the item to your cart.',
                'You will now be redirected to the "Cart" page.');
        }catch(err){
            addToCartErrors(err);
            console.error(`Failed to add the cart:`, err);
        }
    };

    const checkCartItem = async (id: string, productId: string, product: CartItem) => {
        try{
            const productCart = cart.value?.find(
                c => c.id === id);
            if(productCart){
                if(!productCart?.checked){
                    await handler(`/cart/${productId}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            checked: true
                        })
                    });
                }else{
                    await handler(`/cart/${productId}`, {
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

            const currentItem = productCart?.quantity.find(
                p => p.count !== undefined);
            const currentQuantity = Number(currentItem?.count);

            const stockItem = product?.quantity.find(
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
                                quantity: productCart?.quantity.map(item => ({
                                    ...item,
                                    count: newQuantity,
                                })),
                            })
                        });
                    }else{
                        console.warn('Достигнуто максимальное количество товара на складе.');
                        await openNotify('The item is no longer in stock.',
                            'The maximum stock level for the item has been reached.')
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
                                quantity: productCart?.quantity.map(item => ({
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
            console.error(`Failed to update the cart product quantity:`, err);
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

                const cartObj = item?.quantity?.find(
                    p => p.count !== undefined);
                if (!cartObj) {
                    console.log(`У товара ${item.productId} в корзине нет данных о варианте`, item);
                    continue;
                }

                const cartQuantity = Number(cartObj.count);

                const newQuantityArr = product.quantity.map(
                    v => {
                        const isSame = v.hex === cartObj.hex && String(v.size) === String(cartObj.size);
                        if (!isSame) return { ...v };

                        return {...v, count: Math.max(0, Number(v.count) - cartQuantity)};
                    }
                );

                const isExhausted = newQuantityArr.every(v => Number(v.count) <= 0);

                const updatedData = {
                    quantity: newQuantityArr,
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
            console.error(`Failed to update the status or quantity:`, err);
        }
    };

    const deleteProductCart = async (id: string) => {
        try{
            await handler(`/cart/${id}`, {
                method: "DELETE",
            });
            await getCartProducts();
        }catch(err){
            console.error(`Failed to delete the cart product:`, err);
        }
    };

    return {
        getCartProducts,

        addToCart,

        checkCartItem,
        updateCartItem,
        updateCartChecked,
        updateCheckedQuantity,

        deleteProductCart
    }
}