<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppMenu from './AppMenu.vue';

const { layoutState } = useLayout();

let timeout = null;

function onMouseEnter() {
    if (!layoutState.anchored) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        layoutState.sidebarActive = true;
    }
}

function onMouseLeave() {
    if (!layoutState.anchored) {
        if (!timeout) {
            timeout = setTimeout(() => (layoutState.sidebarActive = false), 300);
        }
    }
}

</script>

<template>
    <div class="layout-sidebar" @mouseenter="onMouseEnter()" @mouseleave="onMouseLeave()">
        <div ref="menuContainer" class="layout-menu-container">
            <AppMenu></AppMenu>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
