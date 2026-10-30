import { useMutation, useQueryClient } from "@tanstack/vue-query";
import namer from "color-namer";

import router from "@/app/router";
import type {
    EditColorsPayload,
    EditImagesPayload,
    EditQuantityPayload,
} from "@/features/product-edit-form/model/edit-product.types";
import { createProductForm } from "@/entities/product-form/model/product-forms";
import { handler } from "@/shared/api/http";
import { currentFile } from "@/shared/lib/product-helper";
import { useBaseModals } from "@/shared/lib/use-notify";
import type { Product } from "@/shared/model/product.types";

const { openNotify } = useBaseModals();

export const useEditProductImages = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: editProductImages,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["editProductImages"],
        mutationFn: async ({ product, event }: EditImagesPayload) => {
            if (!product) {
                throw new Error("Товар не найден");
            }

            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file || currentFile.value === null) {
                return;
            }

            const formData = new FormData();
            formData.append(`images`, file);

            return await handler(`/products/${product.id}/${currentFile.value}/images`, {
                method: "PATCH",
                body: formData,
            });
        },

        onSuccess: async () => {
            await Promise.all([
                await queryClient.invalidateQueries({ queryKey: ["products"] }),
                await queryClient.invalidateQueries({ queryKey: ["myProducts"] }),
                await queryClient.invalidateQueries({ queryKey: ["filteredProducts"] }),
            ]);
        },

        onError: async (err) => {
            await openNotify(`You haven't entered anything to change.`, "");

            throw new Error(`Ошибка при изменении фото карточек товара`, err);
        },
    });

    return {
        editProductImages,
        isPending,
        isError,
    };
};

export const useEditProductInfo = () => {
    const {
        mutateAsync: editProductInfo,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["editProductInfo"],
        mutationFn: async (product: Product | null) => {
            if (!product) {
                throw new Error("Товар не найден");
            }

            return await handler(`/products/${product.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    collections: createProductForm.value.collections,
                    title: createProductForm.value.title,
                    category: createProductForm.value.category,
                    material: createProductForm.value.material,
                    gender: createProductForm.value.gender,
                    price: createProductForm.value.price,
                    description: createProductForm.value.description,
                }),
            });
        },

        onSuccess: async () => {
            await openNotify(
                "You have successfully changed the product card description",
                "Now, if you go to the my products page, your product will be there, and on the useProfile page as well",
            );
            await router.push({ name: "my/products" });
        },

        onError: async (err) => {
            await openNotify(`You haven't entered anything to change.`, "");

            throw new Error(`Ошибка при изменении информации о товаре`, err);
        },
    });

    return {
        editProductInfo,
        isPending,
        isError,
    };
};

export const useEditProductQuantity = () => {
    const {
        mutateAsync: editProductQuantity,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["editProductQuantity"],
        mutationFn: async ({ product, color, size, count }: EditQuantityPayload) => {
            if (!product || !color || !size || !count) {
                console.log("Вы не добавили никаких значений дл изменения");
                return;
            }

            const variant = product?.variants.find((v) => v.hex === color.hex && v.size === size);
            if (!variant) {
                console.log("Variant not found");
                return;
            }

            variant.count = Number(count);

            return await handler(`/products/${product?.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    variants: product?.variants,
                }),
            });
        },

        onError: async (err) => {
            await openNotify(`You haven't entered anything to change.`, "");

            throw new Error(`Failed to edit the variants product cover:`, err);
        },
    });

    return {
        editProductQuantity,
        isPending,
        isError,
    };
};

export const useEditProductColors = () => {
    const {
        mutateAsync: editProductColors,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["editProductColors"],
        mutationFn: async ({ product, index, eventOrColor }: EditColorsPayload) => {
            if (!product) {
                console.log("Такого продукта не существует");
                return;
            }

            if (
                typeof eventOrColor === "object" &&
                eventOrColor !== null &&
                "target" in eventOrColor
            ) {
                let hexColor = "";

                const target = eventOrColor.target as HTMLInputElement;
                hexColor = target?.value || "";

                const names = namer(hexColor);
                const colorName = names.ntc[0].name;

                product.colors[index] = {
                    ...product?.colors[index],
                    hex: hexColor,
                    colorName: colorName,
                };

                return await handler(`/products/${product?.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        colors: product?.colors,
                    }),
                });
            }
        },

        onError: async (err) => {
            await openNotify(`You haven't entered anything to change.`, "");

            throw new Error(`Failed to edit the colors product cover:`, err);
        },
    });

    return {
        editProductColors,
        isPending,
        isError,
    };
};
