import type { NotificationMessage, NotificationVariants } from "@/widgets/notification";

export const notifyMessages: Record<NotificationVariants, NotificationMessage> = {
    login: {
        title: "You have successfully sign in",
        text: "You will now be taken to your profile page",
    },
    OAuth: {
        title: "You have successfully sign in",
        text: "You will now be taken to your profile page",
    },
    register: {
        title: "You have successfully sign up",
        text: "You will now be taken to your profile page",
    },
    logout: {
        title: "You have successfully logged out",
        text: "You will now be taken to sign in page",
    },
    "delete-user": {
        title: "You have successfully delete account",
        text: "You will now be taken to sign in page",
    },
    "create-product": {
        title: "You have successfully created a new product card",
        text: "Now, if you go to the products page, your product will be there, and on the useProfile page as well",
    },
    "edit-product": {
        title: "You have successfully changed the product card description",
        text: "Now, if you go to the my products page, your product will be there, and on the useProfile page as well",
    },
    profile: {
        title: "You have successfully updated your profile",
        text: "",
    },
    password: {
        title: "You have successfully changed your password.",
        text: "",
    },
    "delete-product": {
        title: "You have successfully deleted the product",
        text: "",
    },
    "add-to-cart": {
        title: "You have successfully added the item to your cart",
        text: 'You will now be redirected to the "Cart" page',
    },
    "add-to-favorite": {
        title: "You have successfully added the item to your favorite",
        text: 'You will now be redirected to the "Favorite" page',
    },
    information: {
        title: "You have successfully added the shipping address",
        text: "You will now be redirected to the shipping method selection page",
    },
    shipping: {
        title: "You have successfully added the shipping method",
        text: "You will now be redirected to the payment method selection page",
    },
    payment: {
        title: "Your order has been placed",
        text: "You will now be redirected to the receipt page",
    },
    "add-review": {
        title: "You have successfully added a review for this product",
        text: "Thank you for your feedback. It helps other customers make the right choice.",
    },
    "replace-order": {
        title: "You have successfully cancelled the order.",
        text: "Thank you for providing us with this information, it helps us improve our service.",
    },
};

export const notifyErrorMessages: Record<NotificationVariants, NotificationMessage> = {
    login: {
        title: "You were unable to sign in",
        text: "Please check your email and password and try again",
    },
    OAuth: {
        title: "You were unable to login with google",
        text: "Please try again or sign in with your email",
    },
    register: {
        title: "You were unable to sign up",
        text: "Please check the entered data and try again",
    },
    logout: {
        title: "You were unable to log out",
        text: "Please try again",
    },
    "delete-user": {
        title: "You were unable to delete your account",
        text: "Please try again later",
    },
    "create-product": {
        title: "You were unable to create the product",
        text: "Please check the form and try again",
    },
    "edit-product": {
        title: "You haven't entered anything to change.",
        text: "Change at least one field and try again",
    },
    profile: {
        title: "You were unable to update your profile",
        text: "Please check the entered data and try again",
    },
    password: {
        title: "You were unable to change your password",
        text: "Please check your current password and try again",
    },
    "delete-product": {
        title: "You were unable to delete the product",
        text: "Please try again later",
    },
    "add-to-cart": {
        title: "The item is no longer in stock",
        text: "The maximum stock level for the item has been reached",
    },
    "add-to-favorite": {
        title: "You were unable to update your favorites",
        text: "Please try again later",
    },
    information: {
        title: "You must choose",
        text: "Choose a saved contact and a shipping address.",
    },
    shipping: {
        title: "You must choose a shipping method",
        text: "Choose a delivery method to continue",
    },
    payment: {
        title: "Could not place the order",
        text: "Please check your payment details and try again",
    },
    "add-review": {
        title: "You were unable to add a review",
        text: "Please check the form and try again",
    },
    "replace-order": {
        title: "You were unable to cancel the order",
        text: "Please try again later",
    },
};