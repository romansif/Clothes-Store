export type PageVariant =
    | "product"
    | "user"
    | "season-list"
    | "week-list"
    | "year-list"
    | "products"
    | "my-products"
    | "cart"
    | "favorite"
    | "reviews"
    | "orders"
    | "addresses"
    | "payments";

export interface EmptyStateMessageProps {
    title: string;
    text: string;
}
