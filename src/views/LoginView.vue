<script setup lang="ts">
import { useRoute } from 'vue-router';
import { genURLGoogleLogin } from '../utils/google'
import { genURLFacebookLogin } from '../utils/facebook'

const router = useRoute();
console.log("router.query.code: ", router.query.code);
</script>

<template>
    <div :class="[$style.container]">
        <div :class="[$style.wrapper]">
            <a :class="[$style.socialButton]" :href="genURLGoogleLogin('login')">Sign in with Google</a>
            <a :class="[$style.socialButton]" :href="genURLFacebookLogin('login')">Sign in with Facebook</a>
            <a :class="[$style.socialButton]">Sign in with Github</a>
        </div>
    </div>
</template>

<style module>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
}

.wrapper {
    background-color: var(--softBg);
    padding: 150px 200px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    border-radius: 10px;
}

.socialButton {
    padding: 20px;
    border-radius: 5px;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
}

.socialButton:first-child {
    background-color: #ff5555;
}

.socialButton:nth-child(2) {
    background-color: #087bea;
}

.socialButton:last-child {
    background-color: black;
}

@media screen and (max-width:768px) {
    .wrapper {
        padding: 50px 100px;
    }
}

@media screen and (max-width:640px) {
    .wrapper {
        padding: 30px;
    }

    .socialButton {
        font-weight: 400;
        font-size: 14px;
    }
}
</style>