<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { Toaster } from "@steveyuowo/vue-hot-toast";
import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";
import UserRepository from '../repositories/userRepository';
import { useUser } from '../stores/user';
import CategoryRepository from '../repositories/categoryRepository';
import { useCategory } from '../stores/category';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

const userStore = useUser();
const categoryStore = useCategory()

onMounted(() => {
    const accessToken = localStorage.getItem('blog-app-access-token');
    if (accessToken) {
        UserRepository.getUserInfo().then(data => {
            userStore.setUserData(data.data);
            userStore.setLogined()
        })
    }

    if (categoryStore.categories.length === 0) {
        CategoryRepository.getAll().then(data => {
            categoryStore.setCategories(data.data)
        })
    }
})

</script>

<template>
    <Navbar />
    <slot></slot>
    <Footer />
    <Toaster />
</template>