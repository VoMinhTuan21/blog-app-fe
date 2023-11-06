<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '../stores/user';
import { useRouter } from 'vue-router';

const userStore = useUser()
const router = useRouter()
const open = ref(false)
</script>

<template>
    <RouterLink v-if="!userStore.isAuthenticated" to="/login" :class="[$style.link]">Login</RouterLink>
    <template v-else>
        <RouterLink to="/write" :class="[$style.link]">Write</RouterLink>
        <span :class="[$style.link]" @click="() => {
            userStore.logout();
            router.push('/')
        }">Logout</span>
    </template>
    <div :class="[$style.burger]" @click="() => { open = !open }">
        <div :class="[$style.line]"></div>
        <div :class="[$style.line]"></div>
        <div :class="[$style.line]"></div>
    </div>
    <div v-if="open" :class="[$style.responsiveMenu]">
        <RouterLink to="/">Homepage</RouterLink>
        <RouterLink to="/">Contact</RouterLink>
        <RouterLink to="/">About</RouterLink>
        <RouterLink v-if="!userStore.isAuthenticated" to="/login">Login</RouterLink>
        <template v-else>
            <RouterLink to="/write">Write</RouterLink>
            <span :class="[$style.link]" @click="() => {
                    userStore.logout();
                    router.push('/')
                }
                ">Logout</span>
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