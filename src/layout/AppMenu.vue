<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        icon: 'pi pi-home',
        items: [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                to: '/'
            },
            {
                label: 'Task List',
                icon: 'pi pi-fw pi-check-square',
                to: '/apps/tasklist'
            },
            {
                label: 'AI',
                icon: 'pi pi-fw pi-comments',
                to: '/apps/chat'
            },
            {
                label: 'Test AI Chat',
                icon: 'pi pi-fw pi-comment',
                to: '/apps/test-chat'
            },
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <AppMenuItem :item="item" root :index="i" />
            <li class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
