<script setup lang="ts">
import { inject } from 'vue';
import { ThemeKey } from '../symbols';

const basePath = import.meta.env.BASE_URL

const { theme, toggleTheme } = inject(ThemeKey)

</script>

<template>
    <div :class="[$style.container]">
        <img :src="`${basePath}moon.png`" width="14" height="14" />
        <div :class="[$style.ball]"></div>
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
    background-color: black;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    left: 1px;
}
</style>