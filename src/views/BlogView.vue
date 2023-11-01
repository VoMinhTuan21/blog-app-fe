<script setup lang="ts">
import CardList from '../components/CardList.vue'
import Menu from '../components/Menu.vue'
</script>

<template>
    <div :class="[$style.container]">
        <h1 :class="[$style.title]">Style Blog</h1>
        <div :class="[$style.content]">
            <CardList />
            <Menu />
        </div>
    </div>
</template>

<style module>
.container {}

.title {
    background-color: coral;
    color: white;
    padding: 5px 10px;
    text-align: center;
}

.content {
    display: flex;
    gap: 50px;
}
</style>