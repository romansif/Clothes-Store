import type { RouteRecordRaw } from 'vue-router'

import RegisterPage  from "@/pages/auth/RegisterPage.vue";
import LoginPage  from "@/pages/auth/LoginPage.vue";

import HomePage from "@/pages/home/HomePage.vue";

import ProductsPage from "@/pages/products/ProductsPage.vue";
import CollectionPage from "@/pages/collections/CollectionPage.vue";
import SeasonsCatalogPage from "@/pages/collections/SeasonsCatalogPage.vue";
import WinterSeasonPage from "@/pages/collections/WinterSeasonPage.vue";
import SpringSeasonPage from "@/pages/collections/SpringSeasonPage.vue";
import SummerSeasonPage from "@/pages/collections/SummerSeasonPage.vue";
import AutumnSeasonPage from "@/pages/collections/AutumnSeasonPage.vue";
import ProductDetailPage from "@/pages/products/ProductDetailPage.vue";
import CartPage from "@/pages/cart/CartPage.vue";
import FavoritePage from "@/pages/favorite/FavoritePage.vue";

import ProfilePage from "@/pages/profile/ProfilePage.vue";
import MyProductsPage from "@/pages/products/MyProductsPage.vue";

import CreateProductPage from "@/pages/product-form/CreateProductPage.vue";
import EditProductPage from "@/pages/product-form/EditProductPage.vue";

import InformationPage from "@/pages/checkout/InformationPage.vue";
import ShippingPage from "@/pages/checkout/ShippingPage.vue";
import PaymentPage from "@/pages/checkout/PaymentPage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/auth',
        component: () => import('@/app/layouts/AuthLayout.vue'),
        children: [
            {
                path: 'signUp',
                name: 'signUp',
                component: RegisterPage
            },
            {
                path: 'signIn',
                name: 'signIn',
                component: LoginPage
            },
        ]
    },
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/',
        component: () => import('@/app/layouts/MainLayout.vue'),
        children: [
            {
                path: 'shop',
                name: 'shop',
                component: ProductsPage
            },
            {
                path: 'shop/new-collections',
                name: 'shop/new-collections',
                component: CollectionPage
            },
            {
                path: 'shop/seasons-catalog',
                name: 'shop/seasons-catalog',
                component: SeasonsCatalogPage
            },
            {
                path: 'shop/winter-catalog',
                name: 'shop/winter-catalog',
                component: WinterSeasonPage
            },
            {
                path: 'shop/spring-catalog',
                name: 'shop/spring-catalog',
                component: SpringSeasonPage
            },
            {
                path: 'shop/summer-catalog',
                name: 'shop/summer-catalog',
                component: SummerSeasonPage
            },
            {
                path: 'shop/autumn-catalog',
                name: 'shop/autumn-catalog',
                component: AutumnSeasonPage
            },
            {
                path: 'shop/product/info/:id',
                name: 'product/info',
                component: ProductDetailPage
            },
            {
                path: 'shop/my-cart',
                name: 'cart',
                component: CartPage
            },
            {
                path: 'shop/my-favorite',
                name: 'favorite',
                component: FavoritePage
            },
        ]
    },
    {
        path: '/',
        component: () => import('@/app/layouts/ProfileLayout.vue'),
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: ProfilePage
            },
            {
                path: 'my-products',
                name: 'my/products',
                component: MyProductsPage

            },
        ]
    },
    {
        path: '/',
        component: () => import('@/app/layouts/ProductFormLayout.vue'),
        children: [
            {
                path: 'create-product',
                name: 'create/product',
                component: CreateProductPage

            },
            {
                path: 'edit-product/:id',
                name: 'edit/product',
                component: EditProductPage
            },
        ]
    },
    {
        path: '/checkout',
        component: () => import('@/app/layouts/CheckoutLayout.vue'),
        children: [
            {
                path: 'information',
                name: 'information',
                component: InformationPage
            },
            {
                path: 'shipping',
                name: 'shipping',
                component: ShippingPage
            },
            {
                path: 'payment',
                name: 'payment',
                component: PaymentPage
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue'),
    }
]

export default routes