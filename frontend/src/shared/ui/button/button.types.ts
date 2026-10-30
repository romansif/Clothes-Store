export type ButtonVariant =
    | "login"
    | "register"
    | "changeRegister"
    | "useProduct"
    | "addToCart"
    | "addToOrder"
    | "checkOut"
    | "profileForm"
    | "toggleAvatar"
    | "useOrder"
    | "replaceAndReview"
    | "outOfStack"
    | "exitClose"
    | "cancel"
    | "confirm"
    | "refresh"
    | "stackInfo"
    | "loadReviews"
    | "profileMenu"
    | "reload"
    | "catalog"
    | "paymentSuccess"
    | "viewMyOrders"

export interface ButtonProps {
    name: string;
    variant: ButtonVariant;
    type?: "button" | "submit" | "reset";
}
