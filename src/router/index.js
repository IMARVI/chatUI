import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'dashboard-banking',
                component: () => import('@/views/dashboards/Banking.vue')
            },
            {
                path: '/apps/chat',
                name: 'chat',
                component: () => import('@/views/apps/chat/Index.vue')
            },
            {
                path: '/apps/tasklist',
                name: 'tasklist',
                component: () => import('@/views/apps/tasklist/Index.vue')
            },
        ]
    },];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    }
});

export default router;
