const routes = [
    {
        path: '/',
        component: () => import('../layouts/auth-layouts/AuthLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../../pages/home/HomePage.vue'),
            },
            {
                path: 'auth/login',
                name: 'login',
                component: () => import('../../pages/auth/LoginPage.vue'),
                meta: { guestOnly: true },
            },

            {
                path: 'auth/register',
                name: 'register',
                component: () => import('../../pages/auth/RegisterPage.vue'),
                meta: { guestOnly: true },
            }
        ]
    },
]

export default routes;