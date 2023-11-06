<script setup lang="ts">
import { inject } from 'vue';
import { ThemeKey } from '../symbols';
import type { Theme } from '../types';

const basePath = import.meta.env.BASE_URL

const { value, toggleTheme } = inject(ThemeKey) as Theme


</script>

<template>
    <div :class="[$style.container]" @click="toggleTheme">
        <img :src="`${basePath}moon.png`" width="14" height="14" />
        <div :class="[$style.ball, value === 'dark' ? $style.dark : $style.light]"></div>
        <img :src="`${basePath}sun.png`" width="14" height="14" />
    </div>
</template>

<style module>
.container {
    width: 40px;
    height: 20px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    background-color: var(--textColor);
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    transition: left 1s ease-in-out, right 1s ease-in-out;
}

.dark {
    left: 1px;
    right: auto;
    background-color: #0f172a;
}

.light {
    right: 1px;
    left: auto;
    background-color: white;
}
</style>../types/types