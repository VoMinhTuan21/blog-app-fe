<script setup lang="ts">
const basePath = import.meta.env.BASE_URL
</script>

<template>
    <div :class="[$style.container]">
        <div :class="[$style.info]">
            <div :class="[$style.logo]">
                <img :src="`${basePath}logo.png`" alt="image" :class="[$style.image]" width="50" height="50" />
                <h1 :class="[$style.logoText]">Nivablogs</h1>
            </div>
            <p :class="[$style.desc]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia temporibus ex saepe
                veniam magnam, esse
                voluptates aperiam delectus nostrum distinctio architecto numquam maiores, impedit ea ut expedita minima
                quaerat repellat.</p>
            <div :class="[$style.icons]">
                <img :src="`${basePath}facebook.png`" width="18" height="18" />
                <img :src="`${basePath}instagram.png`" width="18" height="18" />
                <img :src="`${basePath}tiktok.png`" width="18" height="18" />
                <img :src="`${basePath}youtube.png`" width="18" height="18" />
            </div>
        </div>
        <div :class="[$style.links]">
            <div :class="[$style.list]">
                <span :class="[$style.listTitle]">Links</span>
                <a href="/">Homepage</a>
                <a href="/">Blog</a>
                <a href="/">About</a>
                <a href="/">Contact</a>
            </div>
            <div :class="[$style.list]">
                <span :class="[$style.listTitle]">Tags</span>
                <a href="/">Style</a>
                <a href="/">Fashion</a>
                <a href="/">Coding</a>
                <a href="/">Travel</a>
            </div>
            <div :class="[$style.list]">
                <span :class="[$style.listTitle]">Social</span>
                <a href="/">Facebook</a>
                <a href="/">Instagram</a>
                <a href="/">Youtube</a>
                <a href="/">Tiktok</a>
            </div>
        </div>
    </div>
</template>

<style module>
.container {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--softTextColor);
    padding: 20px 0;
}

.info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.links {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 100px;
}

.logoText {
    font-size: 28px;
}

.desc {
    font-weight: 300;
}

.icons {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: 300;
}

.listTitle {
    font-weight: bold;
}

@media screen and (max-width:1024px) {
    .links {
        gap: 50px;
    }
}

@media screen and (max-width:768px) {
    .container {
        flex-direction: column;
        gap: 50px;
    }

    .links {
        width: 100%;
        justify-content: space-between;
    }
}

@media screen and (max-width:640px) {
    .links {
        font-size: 14px;
    }
}
</style>