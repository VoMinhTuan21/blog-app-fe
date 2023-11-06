<script setup lang="ts">
import { onMounted } from 'vue';
import ThemeContext from '../context/ThemeContext.vue'
import ThemeProvider from "../providers/ThemeProvider.vue"
import { Toaster } from "@steveyuowo/vue-hot-toast";
import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";
import UserRepository from '../repositories/userRepository';
import { useUser } from '../stores/user';

const userStore = useUser()

onMounted(() => {
    const accessToken = localStorage.getItem('blog-app-access-token');
    if (accessToken) {
        UserRepository.getUserInfo().then(data => {
            userStore.setUserData(data.data);
            userStore.setLogined()
        })
    }
})

</script>

<template>
    <ThemeContext>
        <ThemeProvider>
            <Suspense>
                <slot></slot>
            </Suspense>
        </ThemeProvider>
    </ThemeContext>
    <Toaster />
</template>