export interface ColorItem {
    hex: string,
    colorName: string,
}

export interface ImageItem {
    url: string,
}

export interface Variant {
    hex?: string,
    colorName?: string,
    size?: string,
    count?: number,
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
    variants: Variant[],
    sku: string,
    status: string,
    checked: boolean,
    collection: Collection,
    created_at: string,
}

export interface Collection {
    season: string,
    condition: string,
    name: string,
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

export interface Size {
    isActive: boolean,
    name: string,
    url: string,
    class: string,
}

export interface SizesShoes {
    name: string,
}

export interface SizeGuide {
    name: string,
    values: string[],
}

export interface Slide {
    id: number,
    title: string,
    title1?: string,
    text: string,
    routeText?: string,
    routeName?: string,
    url: string,
}
