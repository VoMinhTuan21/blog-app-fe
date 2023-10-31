<script setup lang="ts">
import AuthLink from './AuthLink.vue';
import ThemeToggle from './ThemeToggle.vue'

const basePath = import.meta.env.BASE_URL


</script>

<template>
    <div :class="[$style.container]">
        <div :class="[$style.social]">
            <img :src="`${basePath}facebook.png`" width="24" />
            <img :src="`${basePath}instagram.png`" width="24" />
            <img :src="`${basePath}tiktok.png`" width="24" />
            <img :src="`${basePath}youtube.png`" width="24" />
        </div>
        <div :class="[$style.logo]">Niva Blog</div>
        <div :class="[$style.links]">
            <ThemeToggle />
            <a href="/">Homepage</a>
            <a href="/">Contact</a>
            <a href="/">About</a>
            <AuthLink />
        </div>
    </div>
</template>

<style module>
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
}

.social {
    display: flex;
    gap: 10px;
    flex: 1;
}

.logo {
    flex: 1;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
}

.links {
    display: flex;
    gap: 10px;
    flex: 1;
    font-size: 20px;
}
</style>