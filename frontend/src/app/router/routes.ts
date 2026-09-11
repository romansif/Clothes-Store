import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/auth',
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
        name: 'home',
        component: () => import('@/pages/home/HomePage.vue'),
    },
    {
        path: '/',
        component: () => import('@/app/layouts/MainLayout.vue'),
        children: [
            {
                path: 'shop',
                name: 'shop',
                component: () => import('@/pages/products/ProductsPage.vue'),
            },
            {
                path: 'shop/new-collections',
                name: 'shop/new-collections',
                component: () => import('@/pages/collections/CollectionPage.vue'),
            },
            {
                path: 'shop/seasons-catalog',
                name: 'shop/seasons-catalog',
                component: () => import('@/pages/collections/seasons/SeasonsCatalogPage.vue'),
            },
            {
                path: 'shop/winter-catalog',
                name: 'shop/winter-catalog',
                component: () => import('@/pages/collections/seasons/WinterSeasonPage.vue'),
            },
            {
                path: 'shop/spring-catalog',
                name: 'shop/spring-catalog',
                component: () => import('@/pages/collections/seasons/SpringSeasonPage.vue'),
            },
            {
                path: 'shop/summer-catalog',
                name: 'shop/summer-catalog',
                component: () => import('@/pages/collections/seasons/SummerSeasonPage.vue'),
            },
            {
                path: 'shop/autumn-catalog',
                name: 'shop/autumn-catalog',
                component: () => import('@/pages/collections/seasons/AutumnSeasonPage.vue'),
            },
            {
                path: 'shop/product/info/:id',
                name: 'product/info',
                component: () => import('@/pages/products/ProductDetailPage.vue'),
            },
            {
                path: 'shop/my-cart',
                name: 'cart',
                component: () => import('@/pages/cart/CartPage.vue')
            },
            {
                path: 'shop/my-favorite',
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
                path: 'my-products',
                name: 'my/products',
                component: () => import('@/pages/products/MyProductsPage.vue'),

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
                component: () => import('@/pages/profile/CreateProductPage.vue'),

            },
            {
                path: 'edit-product/:id',
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