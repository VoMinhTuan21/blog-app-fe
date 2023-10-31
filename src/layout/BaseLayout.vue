<script setup lang="ts">
import ThemeContext from '../context/ThemeContext.vue'
</script>

<template>
    <ThemeContext>
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </ThemeContext>
</template>