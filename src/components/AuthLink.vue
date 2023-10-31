<script setup lang="ts">
const status = 'authenticated'
</script>

<template>
    <a v-if="status === 'notAuthenticated'" href="/login">Login</a>
    <template v-else>
        <a href="/write">Write</a>
        <span :class="[$style.link]">Logout</span>
    </template>
</template>

<style module>
.link {
    cursor: pointer;
}
</style>