<script setup>
import AppSidebar from '@/layout/AppSidebar.vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutState, isHorizontal, toggleMenu } = useLayout();

function onTopbarItemClick() {
    document.body.click();
}
</script>

<template>
    <div class="layout-topbar-menu-section">
        <AppSidebar></AppSidebar>
    </div>
</template>
