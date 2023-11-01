<script setup lang="ts">
import Pagination from './Pagination.vue';
import Card from './Card.vue'

</script>

<template>
    <div :class="[$style.container]">
        <h1 :class="[$style.title]">Recent Posts</h1>
        <div :class="[$style.posts]">
            <Card />
            <Card />
            <Card />
        </div>
        <Pagination />
    </div>
</template>

<style module>
.container {
    flex: 5
}

.title {
    margin: 50px 0px;
}

.posts {}
</style>