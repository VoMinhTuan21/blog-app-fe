<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import AuthRespository from '../repositories/authRepository';
import { toast } from "@steveyuowo/vue-hot-toast";
import type { IResponseError } from '../types/global';
import { useUser } from '../stores/user';

const route = useRoute();
const router = useRouter();
const userStore = useUser()


try {
    if (route.query.code) {
        if (route.path.includes('google-redirect')) {
            const data = await AuthRespository.loginGoogle({
                code: route.query.code as string,
                redirectURL: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT
            })

            localStorage.setItem('blog-app-access-token', data.data.accessToken)
            localStorage.setItem('blog-app-refresh-token', data.data.refreshToken)

            userStore.setLogined()
            router.push('/')

        } else if (route.path.includes('facebook-redirect')) {
            const data = await AuthRespository.loginFacebook({
                code: route.query.code as string,
                redirectURL: import.meta.env.VITE_FB_REDIRECT
            })

            localStorage.setItem('blog-app-access-token', data.data.accessToken)
            localStorage.setItem('blog-app-refresh-token', data.data.refreshToken)

            userStore.setLogined()
            router.push('/')
        }

    }
} catch (error) {
    toast.error((error as IResponseError).error)
}

</script>

<template>
    <div :class="[$style.container]">
        <div :class="[$style.content]">
            <p>
                Authenticating
            </p>
            <div :class="[$style['dot-flashing']]"></div>
        </div>
    </div>
</template>

<style module>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--textColor);
    height: 70vh;
    font-size: 32px;
}

.content {
    display: flex;
    gap: 15px;
    align-items: baseline;
}

.dot-flashing {
    position: relative;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: var(--textColor);
    color: var(--textColor);
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
}

.dot-flashing::before {
    left: -12px;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: var(--textColor);
    color: var(--textColor);
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
}

.dot-flashing::after {
    left: 12px;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: var(--textColor);
    color: var(--textColor);
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
}

@keyframes dot-flashing {
    0% {
        background-color: var(--textColor);
    }

    50%,
    100% {
        background-color: rgba(152, 128, 255, 0.2);
    }
}
</style>