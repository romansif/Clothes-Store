export interface ColorItem {
    hex: string,
    colorName: string,
}

export interface ImageItem {
    url: string,
}

export interface Product {
    id: string,
    userId: string,
    productId: string,
    title: string,
    category: string,
    material: string,
    description: string,
    images: ImageItem[],
    price: number,
    colors: ColorItem[],
    sizes: string,
    gender: string,
    quantity: number,
    status: string,
    checked: boolean,
    collection: string,
    created_at: string,
}

export interface Collection {
    collection: string,
}

export interface Category {
    category: string,
}

export interface Material {
    material: string,
}

export interface Gender {
    gender: string,
}

export interface Sizes {
    isActive: boolean,
    name: string,
    url: string,
    class: string,
}