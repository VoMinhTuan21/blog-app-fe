<script setup lang="ts">
import MenuPost from './MenuPost.vue'
import MenuCategoryList from './MenuCategoryList.vue'
</script>

<template>
    <div :class="[$style.container]">
        <h2 :class="[$style.subTitle]">what's hot</h2>
        <h1 :class="[$style.title]">Most Popular</h1>
        <MenuPost :with-image="false" />

        <h2 :class="[$style.subTitle]">Discover by topic</h2>
        <h1 :class="[$style.title]">Categories</h1>
        <MenuCategoryList />


        <h2 :class="[$style.subTitle]">Chosen by editor</h2>
        <h1 :class="[$style.title]">Editors Pick</h1>
        <MenuPost :with-image="true" />
    </div>
</template>

<style module>
.container {
    flex: 2;
    margin-top: 60px;
}

.subTitle {
    color: gray;
    font-size: 16px;
    font-weight: 400;
}

.title {
    font-size: 28px;
}

@media screen and (max-width: 1024px) {
    .container {
        display: none;
    }
}
</style>