<script setup lang="ts">
import { provide, ref, type InjectionKey } from 'vue';
import type { Theme } from '../types';
import { ThemeKey } from '../symbols'


const getFromLocalStorage = () => {
    if (typeof window !== undefined) {
        const value = localStorage.getItem('theme')
        return value || 'light'
    }
    return "light"
};

const saveToLocalStorage = (value: string) => {
    localStorage.setItem('theme', value);
};

const theme = ref(getFromLocalStorage());

const toggleTheme = () => {
    if (theme.value === 'dark') {
        theme.value = "light"
    } else {
        theme.value = 'dark'
    }
    saveToLocalStorage(theme.value);
}

provide(ThemeKey, {
    value: theme,
    toggleTheme
})

</script>

<template>
    <slot></slot>
</template>