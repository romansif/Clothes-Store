import { useMutation, useQueryClient } from "@tanstack/vue-query";

import router from "@/app/router";
import { clearProductForm } from "@/features/product-form/lib/clear-product-form";
import {
    createProductForm,
    createProductFormErrorMessages,
    moreCreateItemForm,
    moreCreateItemFormErrorMessages,
} from "@/entities/product-form/model/product-forms";
import {
    createProductSchema,
    moreCreateItemsSchema,
} from "@/entities/product-form/model/product-schemas";
import { handler } from "@/shared/api/http";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { imageFiles } from "@/shared/lib/product-helper";
import { useBaseModals } from "@/shared/lib/use-notify";

const { openNotify } = useBaseModals();

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");

    const {
        mutateAsync: createProduct,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: async () => {
            const result1 = createProductSchema.safeParse(createProductForm.value);
            const result2 = moreCreateItemsSchema.safeParse(moreCreateItemForm);

            if (!result1.success) {
                applyZodErrors(result1.error, createProductFormErrorMessages);
            }
            if (!result2.success) {
                applyZodErrors(result2.error, moreCreateItemFormErrorMessages);
            }
            if (!result1.success || !result2.success) {
                throw new Error("Ошибка валидации создания товара");
            }

            const formData = new FormData();

            const productData = {
                userId: userId,
                title: createProductForm.value.title,
                collection: createProductForm.value.collections,
                category: createProductForm.value.category,
                material: createProductForm.value.material,
                gender: createProductForm.value.gender,
                sku: createProductForm.value.sku,
                price: createProductForm.value.price,
                description: createProductForm.value.description,
                sizes: moreCreateItemForm.sizes,
                colors: moreCreateItemForm.colors,
                variants: moreCreateItemForm.variants,
                status: "Availability",
            };

            formData.append("product", JSON.stringify(productData));

            imageFiles.value.forEach((file) => {
                if (file) {
                    formData.append("images", file);
                } else {
                    console.log("Фото товара не добавлено");
                }
            });

            return await handler("/products", {
                method: "POST",
                body: formData,
            });
        },

        onSuccess: async () => {
            await Promise.all([
                await queryClient.invalidateQueries({ queryKey: ["products"] }),
                await queryClient.invalidateQueries({ queryKey: ["myProducts"] }),
                await queryClient.invalidateQueries({ queryKey: ["filteredProducts"] }),
            ]);

            await openNotify(
                "You have successfully created a new product card",
                "Now, if you go to the products page, your product will be there, and on the useProfile page as well",
            );
            await router.push({ name: "my/products" });

            clearProductForm();
        },

        onError: (err) => {
            applyErrors(err, createProductFormErrorMessages);
            applyErrors(err, moreCreateItemFormErrorMessages);

            throw new Error(`Ошибка при создании товара`, err);
        },
    });

    return {
        createProduct,
        isPending,
        isError,
    };
};
