<script setup lang="ts">
import { ref } from 'vue';

const status = 'authenticated'
const open = ref(false)
</script>

<template>
    <a v-if="status === 'authenticated'" href="/login" :class="[$style.link]">Login</a>
    <template v-else>
        <a href="/write" :class="[$style.link]">Write</a>
        <span :class="[$style.link]">Logout</span>
    </template>
    <div :class="[$style.burger]" @click="() => { open = !open }">
        <div :class="[$style.line]"></div>
        <div :class="[$style.line]"></div>
        <div :class="[$style.line]"></div>
    </div>
    <div v-if="open" :class="[$style.responsiveMenu]">
        <a href="/">Homepage</a>
        <a href="/">Contact</a>
        <a href="/">About</a>
        <a v-if="status === 'authenticated'" href="/login">Login</a>
        <template v-else>
            <a href="/write">Write</a>
            <span :class="[$style.link]">Logout</span>
        </template>
    </div>
</template>

<style module>
.link {
    cursor: pointer;
}

.burger {
    width: 20px;
    height: 16px;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
}

.line {
    width: 100%;
    height: 2px;
    background-color: var(--textColor);
}

.responsiveMenu {
    position: absolute;
    top: 100px;
    left: 0px;
    background-color: var(--bg);
    height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    font-size: 36px;
}

@media screen and (max-width:640px) {
    .burger {
        display: flex;
    }

    .link {
        display: none;
    }
}
</style>