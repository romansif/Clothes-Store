import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/app/layouts/auth-layouts/AuthLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/pages/home/HomePage.vue'),
            },
            {
                path: 'signUp',
                name: 'signUp',
                component: () => import('@/pages/auth/Register.vue'),
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
        component: () => import('@/app/layouts/main-layouts/MainLayout.vue'),
        children: [
            {
                path: 'products',
                name: 'products',
                component: () => import('@/pages/products/ProductsPage.vue'),
            },
            {
                path: 'product/info',
                name: 'product/info',
                component: () => import('@/pages/products/ProductsInfoPage.vue'),
            },
            {
                path: 'cart',
                name: 'cart',
                component: () => import('@/pages/profile/profile-products/ProductsCartPage.vue')
            },
            {
                path: 'favorite',
                name: 'favorite',
                component: () => import('@/pages/profile/profile-products/FavoriteProductsPage.vue')
            },
            {
                path: 'profile',
                component: () => import('@/app/layouts/main-layouts/ProfileLayout.vue'),
                children: [
                    {
                        path: '',
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
                        component: () => import('@/pages/products/update-pages/CreateProductPage.vue'),

                    },
                    {
                        path: 'edit/product',
                        name: 'edit/product',
                        component: () => import('@/pages/products/update-pages/EditProductPage.vue'),

                    },
                ]
            },
            {
                path: 'checkout',
                component: () => import('@/app/layouts/main-layouts/CheckoutLayout.vue'),
                children: [
                    {
                        path: 'information',
                        name: 'information',
                        component: () => import('@/pages/checkout/InformationPage.vue'),
                        children: [
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
                    }
                ]
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue'),
    }
]

export default routes