import empty_state from "@/assets/icons/list-state/empty-state.svg";
import error_state from "@/assets/icons/list-state/error-state.svg";

import type { EmptyStateMessageProps, PageVariant } from "@/widgets/state";

export const errorImage = error_state;
export const emptyImage = empty_state;

export const stateRouteMessage: Record<PageVariant, string> = {
  product: "",
  user: "",
  "my-products": "state.route.myProducts",
  "season-list": "state.route.seasonList",
  "week-list": "state.route.weekList",
  "year-list": "state.route.yearList",
  products: "",
  cart: "state.route.cart",
  favorite: "state.route.favorite",
  reviews: "",
  orders: "state.route.orders",
  addresses: "",
  payments: "",
};

export const stateRoute: Record<PageVariant, string> = {
  product: "",
  user: "",
  "my-products": "create/product",
  "season-list": "shop",
  "week-list": "shop",
  "year-list": "shop",
  products: "",
  cart: "shop",
  favorite: "shop",
  reviews: "",
  orders: "shop",
  addresses: "",
  payments: "",
};

export const errorStateMessage: Record<PageVariant, EmptyStateMessageProps> = {
  product: { title: "", text: "" },
  user: { title: "state.error.user.title", text: "state.error.user.text" },
  "my-products": { title: "state.error.myProducts.title", text: "state.error.myProducts.text" },
  "season-list": { title: "state.error.seasonList.title", text: "state.error.seasonList.text" },
  "week-list": { title: "state.error.weekList.title", text: "state.error.weekList.text" },
  "year-list": { title: "state.error.yearList.title", text: "state.error.yearList.text" },
  products: { title: "state.error.products.title", text: "state.error.products.text" },
  cart: { title: "state.error.cart.title", text: "state.error.cart.text" },
  favorite: { title: "state.error.favorite.title", text: "state.error.favorite.text" },
  reviews: { title: "state.error.reviews.title", text: "state.error.reviews.text" },
  orders: { title: "state.error.orders.title", text: "state.error.orders.text" },
  addresses: { title: "state.error.addresses.title", text: "state.error.addresses.text" },
  payments: { title: "state.error.payments.title", text: "state.error.payments.text" },
};

export const emptyStateMessage: Record<PageVariant, EmptyStateMessageProps> = {
  product: { title: "", text: "" },
  user: { title: "state.empty.user.title", text: "state.empty.user.text" },
  "my-products": { title: "state.empty.myProducts.title", text: "state.empty.myProducts.text" },
  "season-list": { title: "state.empty.seasonList.title", text: "state.empty.seasonList.text" },
  "week-list": { title: "state.empty.weekList.title", text: "state.empty.weekList.text" },
  "year-list": { title: "state.empty.yearList.title", text: "state.empty.yearList.text" },
  products: { title: "state.empty.products.title", text: "state.empty.products.text" },
  cart: { title: "state.empty.cart.title", text: "state.empty.cart.text" },
  favorite: { title: "state.empty.favorite.title", text: "state.empty.favorite.text" },
  reviews: { title: "state.empty.reviews.title", text: "state.empty.reviews.text" },
  orders: { title: "state.empty.orders.title", text: "state.empty.orders.text" },
  addresses: { title: "state.empty.addresses.title", text: "state.empty.addresses.text" },
  payments: { title: "state.empty.payments.title", text: "state.empty.payments.text" },
};
