import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/app/layouts/AuthLayout.vue'),
        children: [
            {
                path: 'signUp',
                name: 'signUp',
                component: () => import('@/pages/auth/RegisterPage.vue'),
            },
            {
                path: 'signIn',
                name: 'signIn',
                component: () => import('@/pages/auth/LoginPage.vue'),
            },
        ]
    },
    {
        path: '/',
        component: () => import('@/app/layouts/MainLayout.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/pages/home/HomePage.vue'),
            },
            {
                path: 'shop',
                name: 'shop',
                component: () => import('@/pages/products/ProductsPage.vue'),
            },
            {
                path: 'shop/new-collections',
                name: 'shop/new-collections',
                component: () => import('@/pages/products/NewCollectionsPage.vue'),
            },
            {
                path: 'shop/seasonal-collections',
                name: 'shop/seasonal-collections',
                component: () => import('@/pages/products/NewCollectionsPage.vue'),
            },
            {
                path: 'product/info',
                name: 'product/info',
                component: () => import('@/pages/product/ProductDetailPage.vue'),
            },
            {
                path: 'cart',
                name: 'cart',
                component: () => import('@/pages/cart/CartPage.vue')
            },
            {
                path: 'favorite',
                name: 'favorite',
                component: () => import('@/pages/favorite/FavoritePage.vue')
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
                component: () => import('@/pages/profile/ProfilePage.vue'),
            },
            {
                path: 'my/products',
                name: 'my/products',
                component: () => import('@/pages/products/MyProductsPage.vue'),

            },
            {
                path: 'create/product',
                name: 'create/product',
                component: () => import('@/pages/profile/CreateProductPage.vue'),

            },
            {
                path: 'edit/product',
                name: 'edit/product',
                component: () => import('@/pages/profile/EditProductPage.vue'),

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
                component: () => import('@/pages/checkout/InformationPage.vue'),
            },
            {
                path: 'shipping',
                name: 'shipping',
                component: () => import('@/pages/checkout/ShippingPage.vue'),
            },
            {
                path: 'payment',
                name: 'payment',
                component: () => import('@/pages/checkout/PaymentPage.vue'),
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