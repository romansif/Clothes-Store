export type StateVariant = 'empty' | 'error'
export type PageVariant =
    'user' |
    'season-list' |
    'week-list' |
    'year-list' |
    'products' |
    'my-products' |
    'cart' |
    'favorite' |
    'reviews' |
    'orders' |
    'addresses' |
    'payments'

export interface StateVariantProps {
    state: StateVariant
    variant: PageVariant
}

export interface EmptyStateMessageProps {
    title: string;
    text: string
}