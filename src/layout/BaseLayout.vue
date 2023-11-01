<script setup lang="ts">
import ThemeContext from '../context/ThemeContext.vue'
import ThemeProvider from "../providers/ThemeProvider.vue"
</script>

<template>
    <ThemeContext>
        <ThemeProvider>
            <slot></slot>
        </ThemeProvider>
    </ThemeContext>
</template>