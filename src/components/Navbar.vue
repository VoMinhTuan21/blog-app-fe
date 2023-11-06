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
            <RouterLink to="/" :class="[$style.link]">Homepage</RouterLink>
            <RouterLink to="/contact" :class="[$style.link]">Contact</RouterLink>
            <RouterLink to="/about" :class="[$style.link]">About</RouterLink>
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
    align-items: center;
    flex: 1;
    font-size: 20px;
}

@media screen and (max-width: 1280px) {
    .logo {
        font-size: 32px;
    }

    .links {
        font-style: 18px;
        gap: 15px;
    }
}

@media screen and (max-width: 1024px) {
    .social {
        display: none;
    }

    .logo {
        text-align: left;
    }
}

@media screen and (max-width: 768px) {
    .logo {
        font-size: 24px;
    }
}

@media screen and (max-width: 640px) {
    .links {
        justify-content: flex-end;
    }

    .link {
        display: none;
    }
}
</style>