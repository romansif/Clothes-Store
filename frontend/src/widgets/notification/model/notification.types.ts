export type NotificationState = 'success' | 'error'

export type NotificationVariants =
    | "login"
    | "OAuth"
    | "register"
    | "logout"
    | "delete-user"
    | "create-product"
    | "edit-product"
    | "profile"
    | "password"
    | "delete-product"
    | "add-to-cart"
    | "add-to-favorite"
    | "information"
    | "shipping"
    | "payment"
    | "add-review"
    | "replace-order";

export interface NotificationMessage {
    title: string,
    text: string
}

export interface NotificationProps {
    variant: NotificationVariants
    state: NotificationState
}