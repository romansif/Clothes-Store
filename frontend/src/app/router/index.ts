import routes from "@/shared/routes/routes";
import { createRouter, createWebHistory } from "vue-router";
import { checkoutSession } from "@/entities/checkout-session";
import { orderStore } from "@/shared/model/order.store";

declare module "vue-router" {
    interface RouteMeta {
        requiresAuth?: boolean;
        guestOnly?: boolean;
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

const isLoggedIn = () => Boolean(localStorage.getItem("userId"));

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        return {
            name: "signIn",
            query: { redirect: to.fullPath }
        };
    }

    if (to.meta.guestOnly && isLoggedIn()) {
        return {
            name: "home"
        };
    }

    const isCheckoutStep = ["information", "shipping", "payment"].includes(String(to.name));

    if (isCheckoutStep) {
        const { orderItems } = orderStore();
        if (!orderItems.value.length) return {
            name: "cart",
            query: { reset: "1" }
        };
    }

    if (to.name === "cart" && from.path.startsWith("/checkout") && !to.query.reset) {
        return { ...to, query: { ...to.query, reset: "1" } };
    }


    if (to.name === "shipping" || to.name === "payment") {
        if (!checkoutSession.contactId || !checkoutSession.addressId) {
            return { name: "information" };
        }
    }

    if (to.name === "payment" && !checkoutSession.delivery) {
        return { name: "shipping" };
    }
});

export default router;