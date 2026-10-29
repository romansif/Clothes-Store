import type { EmptyStateMessageProps, PageVariant } from "@/widgets/state";
import error_state from "@/assets/icons/products/error-state.svg";
import empty_state from "@/assets/icons/products/empty-state.svg"

export const errorImage = error_state
export const emptyImage = empty_state

export const stateRouteMessage: Record<PageVariant, string> = {
    user: '',
    'my-products': 'create product',
    'season-list': 'go to shop',
    'week-list': 'go to shop',
    'year-list': 'go to shop',
    products: '',
    cart: 'go to shop',
    favorite: 'go to shop',
    reviews: '',
    orders: 'go to shop',
    addresses: '',
    payments: '',
}

export const stateRoute: Record<PageVariant, string> = {
    user: '',
    'my-products': 'create/product',
    'season-list': 'shop',
    'week-list': 'shop',
    'year-list': 'shop',
    products: '',
    cart: 'shop',
    favorite: 'shop',
    reviews: '',
    orders: 'shop',
    addresses: '',
    payments: '',
}

export const emptyStateMessage: Record<PageVariant, EmptyStateMessageProps> = {
    user: {
        title: 'No profile information yet',
        text: 'Your details will appear here once you add them',
    },
    'my-products': {
        title: "You haven't added any products yet",
        text: 'Create your first product and it will appear here',
    },
    'season-list': {
        title: 'No seasonal collection yet',
        text: "We're still putting together this season's picks. Check back soon",
    },
    'week-list': {
        title: 'No weekly collection yet',
        text: "This week's picks haven't been added yet. Check back soon",
    },
    'year-list': {
        title: 'No yearly collection yet',
        text: "This year's collection is empty for now. Check back later",
    },
    products: {
        title: 'No products found',
        text: 'Try adjusting your filters or searching for something else',
    },
    cart: {
        title: 'Your cart is empty',
        text: "Add items you like and they'll show up here",
    },
    favorite: {
        title: 'No favorites yet',
        text: 'Tap the heart on any product to save it for later',
    },
    reviews: {
        title: 'No reviews yet',
        text: 'Be the first to share your thoughts on this product',
    },
    orders: {
        title: 'No orders yet',
        text: "Once you place your first order, it'll appear here",
    },
    addresses: {
        title: 'No addresses yet',
        text: 'Add a delivery address to check out faster',
    },
    payments: {
        title: 'No saved payment methods',
        text: 'Add a card to pay for your purchases in one click',
    },
};